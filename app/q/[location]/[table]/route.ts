import { getQrTable } from "@/data/qrTables";

export const dynamic = "force-dynamic";

const htmlEscape = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

export async function GET(
  _request: Request,
  context: { params: Promise<{ location: string; table: string }> },
) {
  const { location, table } = await context.params;
  const config = getQrTable(location, table);

  if (!config) {
    return new Response("QR-код не знайдено", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  const payload = JSON.stringify(config).replace(/</g, "\\u003c");
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-B89HZRMLGS";
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
  const marketingEnabled = process.env.MARKETING_TRACKING_ENABLED === "true";
  const destination = htmlEscape(config.destination);

  return new Response(`<!doctype html>
<html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><title>SEVEN — відкриваємо меню</title><style>
*{box-sizing:border-box}html,body{height:100%;margin:0}body{display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 30%,#bd542f 0,#96351f 48%,#6f201a 100%);color:#fff;font-family:Arial,sans-serif}.wrap{text-align:center;padding:24px}.logo{font-size:clamp(54px,19vw,94px);font-style:italic;font-weight:900;letter-spacing:-.09em;line-height:.9;animation:enter .55s cubic-bezier(.2,.8,.2,1) both}.restopub{margin-top:8px;font-size:10px;letter-spacing:.44em;opacity:.8}.message{margin-top:30px;font-size:14px;font-weight:700;letter-spacing:.12em}.dots{margin-top:18px}.dot{display:inline-block;width:6px;height:6px;margin:0 4px;border-radius:50%;background:#fff;animation:pulse .65s infinite alternate}.dot:nth-child(2){animation-delay:.12s}.dot:nth-child(3){animation-delay:.24s}.fallback{display:block;margin-top:28px;color:#fff;font-size:12px;opacity:.65;text-underline-offset:3px}@keyframes enter{from{opacity:0;transform:scale(.82) translateY(8px)}to{opacity:1;transform:none}}@keyframes pulse{to{opacity:.25;transform:translateY(-4px)}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body><main class="wrap"><div class="logo">SEVEN</div><div class="restopub">RESTOPUB</div><div class="message">ВІДКРИВАЄМО МЕНЮ</div><div class="dots"><i class="dot"></i><i class="dot"></i><i class="dot"></i></div><a class="fallback" href="${destination}">Відкрити вручну</a></main><script>
const q=${payload};const eventId=(crypto.randomUUID?.()||Date.now().toString(36));
navigator.sendBeacon?.('/api/qr-scan',new Blob([JSON.stringify({locationId:q.locationId,tableId:q.tableId,eventId})],{type:'application/json'}));
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{send_page_view:false});gtag('event','menu_scan',{location_id:q.locationId,table_id:q.tableId,event_id:eventId,transport_type:'beacon'});
const gs=document.createElement('script');gs.async=true;gs.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(${JSON.stringify(gaId)});document.head.appendChild(gs);
if(${JSON.stringify(marketingEnabled)}&&${JSON.stringify(Boolean(metaPixelId))}){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(metaPixelId)});fbq('trackCustom','MenuScan',{location:q.locationId,table:q.tableId},{eventID:eventId})}
setTimeout(()=>location.replace(q.destination),1100);
</script></body></html>`, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
