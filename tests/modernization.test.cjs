const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
/** Actual handlers in an isolated module graph. Never reads real env or performs network I/O. */
function sandbox(env = {}, fetchImpl) {
  const cache = new Map(); let calls = 0;
  const context = vm.createContext({ console: { log(){}, error(){} }, process: { env: { NODE_ENV:'production', TELEGRAM_BOOKING_BOT_TOKEN:'TEST_ONLY_FAKE_TOKEN', TELEGRAM_BOOKING_CHAT_VV:'-123', TELEGRAM_BOOKING_CHAT_RYNOK:'-123', TELEGRAM_BOOKING_CHAT_KHIMICHNA:'-123', TELEGRAM_BOOKING_CHAT_ZP:'-123', TELEGRAM_BOT_TOKEN:'TEST_ONLY_FAKE_TOKEN', TELEGRAM_HR_CHAT_ID:'-123', ...env } }, FormData, File, Response, Request, URL, AbortController, setTimeout, clearTimeout, crypto:require('node:crypto').webcrypto, fetch:async (...args)=>{ calls++; return fetchImpl ? fetchImpl(...args) : new Response(JSON.stringify({ok:true}), {status:200}); } });
  function load(file) {
    file = path.resolve(root, file);
    if (!path.extname(file)) file += fs.existsSync(file+'.ts') ? '.ts' : '.tsx';
    if(cache.has(file)) return cache.get(file).exports;
    const mod={exports:{}}; cache.set(file,mod);
    const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
    const req=name=>name==='next/server'?{NextResponse:{json:(body,opts={})=>({status:opts.status||200,body})}}:name.startsWith('@/')?load(name.slice(2)):name.startsWith('.')?load(path.relative(root,path.resolve(path.dirname(file),name))):require(name);
    vm.runInContext(`(function(require,module,exports){${js}\n})`,context,{filename:file})(req,mod,mod.exports);
    return mod.exports;
  }
  return {load,calls:()=>calls};
}
const base={requestId:'test-request-000001',location:'vv',locationId:'vv',name:'SYNTHETIC TEST',phone:'0500000000',guests:'2',zone:'non_smoking',date:'2099-01-01',time:'18:00',comment:'',source:'offline_test'};
const request=payload=>({json:async()=>payload});
for(const [name,patch] of Object.entries({ 'missing name':{name:''}, 'invalid phone':{phone:'letters0500000000'}, 'fractional guests':{guests:'1.5'}, 'guests over existing UI maximum':{guests:'41'}, 'zero guests':{guests:'0'}, 'invalid date':{date:'2099-99-99'}, 'past date':{date:'2000-01-01'}, 'invalid time':{time:'99:99'}, 'time outside existing slots':{time:'22:00'}, 'invalid venue':{location:'invalid'}, 'mismatched venue IDs':{locationId:'zp'}, 'wrong rooftop venue':{zone:'rooftop'}, 'overlong comment':{comment:'x'.repeat(1501)} })) test(`booking rejects ${name} without delivery`,async()=>{
  const s=sandbox(),r=await s.load('app/api/booking/route.ts').POST(request({...base,...patch})); assert.equal(r.status,400);assert.equal(s.calls(),0);
});
test('valid request, concurrent retry, and edited payload use one delivery',async()=>{
  const s=sandbox(),post=s.load('app/api/booking/route.ts').POST;
  const result=await Promise.all([post(request(base)),post(request(base))]);assert.deepEqual(result.map(r=>r.status),[200,200]);assert.equal(s.calls(),1);
  assert.equal((await post(request({...base,guests:'3'}))).status,409);assert.equal(s.calls(),1);
});
for(const venue of ['rynok','vv','khimichna','zp']) test(`existing venue routing ${venue} remains valid`,async()=>{
  const s=sandbox(),r=await s.load('app/api/booking/route.ts').POST(request({...base,location:venue,locationId:venue,zone:venue==='khimichna'?'rooftop':'non_smoking'}));assert.equal(r.status,200);assert.equal(s.calls(),1);
});
test('unknown delivery outcome is not silently resent',async()=>{
 const s=sandbox({},async()=>{throw new Error('simulated network loss')});const post=s.load('app/api/booking/route.ts').POST;
 assert.equal((await post(request(base))).status,504);const retry=await post(request(base));assert.equal(retry.body.deliveryUnknown,true);assert.equal(s.calls(),1);assert.ok(!JSON.stringify(retry).includes('TEST_ONLY_FAKE_TOKEN'));
});
test('Telegram body failure is not treated as success',async()=>{const s=sandbox({},async()=>new Response(JSON.stringify({ok:false}),{status:200}));assert.equal((await s.load('app/api/booking/route.ts').POST(request(base))).status,502)});
test('Kyiv date and calendar validation are deterministic',()=>{const v=sandbox().load('lib/formValidation.ts');const now=new Date('2026-10-19T21:30:00Z');assert.equal(v.kyivDateTime(now).date,'2026-10-20');assert.equal(v.validBookingDate('2026-02-29','18:00',new Date('2026-01-01')),false);assert.equal(v.validBookingDate('2028-02-29','18:00',now),true)});
function hrForm(consent=true){const f=new FormData();for(const [k,v] of Object.entries({requestId:'test-hr-request-0001',name:'SYNTHETIC TEST',phone:'0500000000',city:'Львів',location:'Seven Restopub Хімічна',...(consent?{consent:'accepted'}:{})}))f.set(k,v);return f}
test('HR requires consent on server',async()=>{const s=sandbox();assert.equal((await s.load('app/api/hr-application/route.ts').POST({formData:async()=>hrForm(false)})).status,400);assert.equal(s.calls(),0)});
test('HR city mismatch and file type are rejected',async()=>{for(const f of [hrForm(),hrForm()]){const s=sandbox();if(f===undefined)continue;f.set('city','Запоріжжя');assert.equal((await s.load('app/api/hr-application/route.ts').POST({formData:async()=>f})).status,400);assert.equal(s.calls(),0)}const s=sandbox(),f=hrForm();f.set('cv',new File(['test'], 'test.exe',{type:'application/octet-stream'}));assert.equal((await s.load('app/api/hr-application/route.ts').POST({formData:async()=>f})).status,400)});
test('HR repeat sends once',async()=>{const s=sandbox(),post=s.load('app/api/hr-application/route.ts').POST;assert.equal((await post({formData:async()=>hrForm()})).status,200);assert.equal((await post({formData:async()=>hrForm()})).status,200);assert.equal(s.calls(),1)});
for(const env of [{SEVEN_PREVIEW_MODE:'1'},{VERCEL_ENV:'preview'}])test(`preview cannot send either form: ${Object.keys(env)[0]}`,async()=>{const s=sandbox(env);for(const file of ['booking','hr-application']){const r=await s.load(`app/api/${file}/route.ts`).POST(request(base));assert.equal(r.status,409);assert.equal(r.body.preview,true)}assert.equal(s.calls(),0);assert.equal(s.load('lib/seo.ts').shouldIndexSite,false)});
test('canonical and sitemap use existing final www destination',()=>{const s=sandbox(),seo=s.load('lib/seo.ts');for(const {path:p} of seo.publicPages)assert.equal(seo.createPageMetadata({title:'Test',description:'Test',path:p}).alternates.canonical,'https://www.sevenrestopub.com.ua'+(p==='/'?'/':p));const list=s.load('app/sitemap.ts').default();assert.equal(list.length,7);assert.ok(list.every(x=>!('lastModified'in x)))});
test('schema has actual ancestry, no fake scheduled events or hidden FAQ',()=>{const s=sandbox(),schema=s.load('components/StructuredData.tsx');const parse=e=>JSON.parse(e.props.dangerouslySetInnerHTML.__html)['@graph'];assert.ok(!parse(schema.StructuredData()).some(x=>['FAQPage','Event','BreadcrumbList'].includes(x['@type'])));const page=parse(schema.PageStructuredData({path:'/events'}));assert.equal(page.find(x=>x['@type']==='BreadcrumbList').itemListElement.length,2);assert.ok(!JSON.stringify(page).includes('EventScheduled'))});
