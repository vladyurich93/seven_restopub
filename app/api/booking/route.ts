import { NextResponse } from "next/server";
import { clean, bookingError } from "@/lib/formValidation";
import { oncePerRequest, telegramSend } from "@/lib/formDelivery";
import { bookingLocationById, type BookingLocationId } from "@/data/bookingConfig";
const getBookingRouteConfig = (id: string) => Object.hasOwn(bookingLocationById, id) ? bookingLocationById[id as BookingLocationId] : null;

const friendlyError = "Бронювання поки не відправилось. Будь ласка, зателефонуйте в заклад.";
const formatValue = (value?: string) => (value?.trim() || "-").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const bookingZoneLabels: Record<string, string> = { non_smoking: "Некуряща зона", smoking: "Зона для гостей, які курять", rooftop: "Rooftop", no_preference: "Неважливо" };
export async function POST(request: Request) {
  if (process.env.VERCEL_ENV === "preview" || process.env.SEVEN_PREVIEW_MODE === "1") return NextResponse.json({ ok: false, preview: true, message: "Це попередній перегляд. Реальну заявку не надіслано." }, { status: 409 });
  let raw: Record<string, unknown>;
  try { raw = await request.json(); if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error(); }
  catch { return NextResponse.json({ ok: false, message: "Некоректні дані бронювання." }, { status: 400 }); }
  const payload = Object.fromEntries(["location","locationId","locationName","name","phone","guests","zone","date","time","comment","source"].map(key => [key, clean(raw[key])]));
  const error = bookingError(payload);
  if (error) return NextResponse.json({ ok: false, message: error }, { status: 400 });
  const locationConfig = getBookingRouteConfig(payload.location)!;
  const botToken = process.env.TELEGRAM_BOOKING_BOT_TOKEN?.trim();
  const chatId = process.env[locationConfig.envKey]?.trim();
  if (!botToken || !chatId || !/^-\d+$/.test(chatId)) return NextResponse.json({ ok: false, message: friendlyError }, { status: 503 });
  const result = await oncePerRequest("booking", clean(raw.requestId), JSON.stringify(payload), async () => {
    const text = [
      "🍽 <b>НОВЕ БРОНЮВАННЯ</b>",
      "",
      "📍 <b>Заклад:</b>",
      formatValue(locationConfig.displayName),
      "",
      "👤 <b>Імʼя:</b>",
      formatValue(payload.name),
      "",
      "📞 <b>Телефон:</b>",
      formatValue(payload.phone),
      "",
      "👥 <b>Гостей:</b>",
      formatValue(payload.guests),
      "",
      "🪑 <b>Зона:</b>",
      formatValue(bookingZoneLabels[payload.zone]),
      "",
      "📅 <b>Дата:</b>",
      formatValue(payload.date),
      "",
      "🕒 <b>Час:</b>",
      formatValue(payload.time),
      "",
      "💬 <b>Коментар:</b>",
      formatValue(payload.comment || "-"),
      "",
      "🌐 <b>Джерело:</b>",
      formatValue(payload.source),
    ].join("\n");


    const delivered = await telegramSend(botToken, "sendMessage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }) });
    return delivered ? { body: { ok: true, message: "Дякуємо! Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами." }, status: 200 } : { body: { ok: false, message: friendlyError }, status: 502 };
  });
  return NextResponse.json(result.body, { status: result.status });
}
