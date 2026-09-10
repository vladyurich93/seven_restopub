import { getQrTable } from "@/data/qrTables";

export const runtime = "nodejs";

const clean = (value: unknown) => String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const locationId = clean(body.locationId);
  const tableId = clean(body.tableId);
  const eventId = clean(body.eventId);

  if (!getQrTable(locationId, tableId)) {
    return new Response(null, { status: 400 });
  }

  const event = { event: "menu_scan", locationId, tableId, eventId, occurredAt: new Date().toISOString() };
  console.info(JSON.stringify(event));

  if (process.env.QR_ANALYTICS_WEBHOOK_URL) {
    await fetch(process.env.QR_ANALYTICS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.QR_ANALYTICS_WEBHOOK_SECRET
          ? { authorization: `Bearer ${process.env.QR_ANALYTICS_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(700),
    }).catch(() => undefined);
  }

  return new Response(null, { status: 204 });
}
