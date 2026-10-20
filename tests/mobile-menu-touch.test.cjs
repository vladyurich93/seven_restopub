const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const moduleScope = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(require('node:path').join(__dirname,'../lib/mobileMenuTouch.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:moduleScope.exports});
const {beginMenuTouch,moveMenuTouch,suppressMenuTouchClick}=moduleScope.exports;
const point=(x,y,id=1)=>({identifier:id,clientX:x,clientY:y});
test('short tap allows native link activation and small finger jitter',()=>{
 const g=beginMenuTouch(point(20,40),1,'home');
 assert.ok(moveMenuTouch(g,[point(23,44)],'home'));
 assert.equal(suppressMenuTouchClick(g,1),false);
});
test('slide between items highlights final point but cannot navigate on release',()=>{
 const g=beginMenuTouch(point(20,40),1,'home');
 assert.equal(moveMenuTouch(g,[point(20,100)],'menu').clientY,100);
 assert.equal(suppressMenuTouchClick(g,1),true);
 // Returning to the original item does not turn a swipe into a tap.
 moveMenuTouch(g,[point(20,40)],'home');
 assert.equal(suppressMenuTouchClick(g,1),true);
 assert.equal(suppressMenuTouchClick(g,0),false);
});
test('crossing a small item boundary also cancels activation',()=>{
 const g=beginMenuTouch(point(20,40),1,'home');moveMenuTouch(g,[point(20,45)],'menu');
 assert.equal(suppressMenuTouchClick(g,1),true);
});
test('leaving menu items and multi-touch cancel selection',()=>{
 const g=beginMenuTouch(point(20,40),1,'home');moveMenuTouch(g,[point(20,44)],null);
 assert.equal(suppressMenuTouchClick(g,1),true);
 assert.equal(moveMenuTouch(g,[point(20,50),point(40,50,2)],'home'),null);
 assert.equal(g.tracking,false);
});
test('new tap after a cancelled gesture works; mouse and keyboard remain native',()=>{
 const cancelled=beginMenuTouch(point(1,1),2,null);assert.equal(suppressMenuTouchClick(cancelled,1),true);
 const next=beginMenuTouch(point(20,40),1,'menu');assert.equal(suppressMenuTouchClick(next,1),false);
 assert.equal(suppressMenuTouchClick(null,1),false);assert.equal(suppressMenuTouchClick(cancelled,0),false);
});
