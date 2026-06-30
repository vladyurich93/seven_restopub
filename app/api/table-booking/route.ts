import { NextResponse } from "next/server";
import { bookingLocationById, type BookingLocationId } from "@/data/bookingConfig";

type BookingPayload = {
  locationId: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  comment: string;
};

const fallbackMessage = "Бронювання поки не відправилось. Будь ласка, зателефонуйте в заклад.";

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatValue = (value?: string) => escapeHtml(value?.trim() || "Не вказано");

const isValidUkrainianPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 && digits.startsWith("0")) || (digits.length === 12 && digits.startsWith("380"));
};

const formatTimestamp = () =>
  new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const parseTelegramResponse = async (response: Response) => {
  const text = await response.text();
  let body: unknown = text;

  try {
    body = JSON.parse(text) as unknown;
  } catch (error) {
    console.error("[Table booking] Failed to parse Telegram API response as JSON", error);
  }

  return { text, body };
};

const getTelegramDescription = (body: unknown, fallback: string) =>
  typeof body === "object" && body !== null && "description" in body && typeof body.description === "string"
    ? body.description
    : fallback;

export async function POST(request: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || "";

    console.log("[Table booking] Environment status", {
      TELEGRAM_BOT_TOKEN_EXISTS: Boolean(botToken),
      TELEGRAM_BOOKING_CHAT_RYNOK_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_RYNOK?.trim()),
      TELEGRAM_BOOKING_CHAT_VV_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_VV?.trim()),
      TELEGRAM_BOOKING_CHAT_ZP_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_ZP?.trim()),
    });

    if (!botToken) {
      const message = "Telegram не налаштований. Відсутня env variable: TELEGRAM_BOT_TOKEN.";
      console.error("[Table booking] Missing bot token", { message });
      return NextResponse.json({ message }, { status: 503 });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      console.error("[Table booking] Invalid JSON payload", error);
      return NextResponse.json({ message: `Некоректні дані бронювання: ${getErrorMessage(error)}` }, { status: 400 });
    }

    const raw = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
    const payload: BookingPayload = {
      locationId: clean(raw.locationId),
      date: clean(raw.date),
      time: clean(raw.time),
      guests: clean(raw.guests),
      name: clean(raw.name),
      phone: clean(raw.phone),
      comment: clean(raw.comment),
    };
    const location = bookingLocationById[payload.locationId as BookingLocationId];

    if (!location) {
      return NextResponse.json({ message: "Оберіть коректний заклад для бронювання." }, { status: 400 });
    }

    if (!payload.date || !payload.time || !payload.guests || !payload.name || !payload.phone) {
      return NextResponse.json({ message: "Заповніть усі обовʼязкові поля бронювання." }, { status: 400 });
    }

    if (!isValidUkrainianPhone(payload.phone)) {
      return NextResponse.json({ message: "Вкажіть коректний український номер телефону." }, { status: 400 });
    }

    const chatId = process.env[location.envKey]?.trim() || "";

    if (!chatId) {
      const message = fallbackMessage;
      console.error("[Table booking] Missing booking chat id", { location, missingEnv: location.envKey, message });
      return NextResponse.json({ message }, { status: 503 });
    }

    const text = [
      "🍺 <b>НОВЕ БРОНЮВАННЯ</b>",
      "",
      "📍 <b>Локація:</b>",
      formatValue(location.displayName),
      "",
      "📅 <b>Дата:</b>",
      formatValue(payload.date),
      "",
      "🕒 <b>Час:</b>",
      formatValue(payload.time),
      "",
      "👥 <b>Гостей:</b>",
      formatValue(payload.guests),
      "",
      "👤 <b>Імʼя:</b>",
      formatValue(payload.name),
      "",
      "📞 <b>Телефон:</b>",
      formatValue(payload.phone),
      "",
      "💬 <b>Коментар:</b>",
      formatValue(payload.comment),
      "",
      "🌐 sevenrestopub",
      `🕒 ${formatTimestamp()}`,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const telegramBody = await parseTelegramResponse(telegramResponse);
    const logPayload = {
      locationId: payload.locationId,
      chatEnv: location.envKey,
      ok: telegramResponse.ok,
      status: telegramResponse.status,
      statusText: telegramResponse.statusText,
      body: telegramBody.body,
    };

    if (!telegramResponse.ok) {
      console.error("[Table booking] Telegram sendMessage response", logPayload);
      return NextResponse.json(
        { message: `Telegram API error: ${getTelegramDescription(telegramBody.body, telegramBody.text || fallbackMessage)}` },
        { status: telegramResponse.status },
      );
    }

    console.log("[Table booking] Telegram sendMessage response", logPayload);

    return NextResponse.json({
      ok: true,
      message: "Дякуємо! Ми отримали ваше бронювання. Адміністратор Seven звʼяжеться з вами для підтвердження.",
    });
  } catch (error) {
    console.error("[Table booking] Unhandled route error", error);
    return NextResponse.json({ message: `Table booking route failed: ${getErrorMessage(error)}` }, { status: 500 });
  }
}
