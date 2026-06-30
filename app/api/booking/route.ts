import { NextResponse } from "next/server";
import { bookingLocationById, type BookingLocationId } from "@/data/bookingConfig";

type BookingPayload = {
  location: string;
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  comment: string;
};

const friendlyError = "Бронювання поки не відправилось. Будь ласка, зателефонуйте в заклад.";

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatValue = (value?: string) => escapeHtml(value?.trim() || "-");

const isValidUkrainianPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 && digits.startsWith("0")) || (digits.length === 12 && digits.startsWith("380"));
};

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));

const parseTelegramResponse = async (response: Response) => {
  const text = await response.text();

  try {
    return { text, body: JSON.parse(text) as unknown };
  } catch (error) {
    console.error("[Booking] Failed to parse Telegram response", error);
    return { text, body: text };
  }
};

const getTelegramDescription = (body: unknown) =>
  typeof body === "object" && body !== null && "description" in body && typeof body.description === "string"
    ? body.description
    : friendlyError;

const isBookingLocationId = (value: string): value is BookingLocationId => value in bookingLocationById;

const devDetails = (details: Record<string, unknown>) => (process.env.NODE_ENV !== "production" ? details : {});

export async function POST(request: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || "";

    console.log("[Booking] Environment status", {
      TELEGRAM_BOT_TOKEN_EXISTS: Boolean(botToken),
      TELEGRAM_BOOKING_CHAT_RYNOK_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_RYNOK?.trim()),
      TELEGRAM_BOOKING_CHAT_W_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_W?.trim()),
      TELEGRAM_BOOKING_CHAT_ZP_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_ZP?.trim()),
    });

    if (!botToken) {
      console.error("[Booking] Missing TELEGRAM_BOT_TOKEN");
      return NextResponse.json({ ok: false, message: friendlyError }, { status: 503 });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      console.error("[Booking] Invalid JSON payload", error);
      return NextResponse.json({ ok: false, message: "Некоректні дані бронювання." }, { status: 400 });
    }

    const raw = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
    const payload: BookingPayload = {
      location: clean(raw.location).toLowerCase(),
      name: clean(raw.name),
      phone: clean(raw.phone),
      guests: clean(raw.guests),
      date: clean(raw.date),
      time: clean(raw.time),
      comment: clean(raw.comment),
    };

    const missingFields = Object.entries({
      location: payload.location,
      name: payload.name,
      phone: payload.phone,
      guests: payload.guests,
      date: payload.date,
      time: payload.time,
    })
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { ok: false, message: "Заповніть усі обовʼязкові поля бронювання.", missingFields },
        { status: 400 },
      );
    }

    if (!isValidUkrainianPhone(payload.phone)) {
      return NextResponse.json({ ok: false, message: "Вкажіть коректний український номер телефону." }, { status: 400 });
    }

    const guestsCount = Number(payload.guests);

    if (!Number.isFinite(guestsCount) || guestsCount < 1) {
      return NextResponse.json({ ok: false, message: "Вкажіть коректну кількість гостей." }, { status: 400 });
    }

    console.log("[booking] location key:", payload.location);

    if (!isBookingLocationId(payload.location)) {
      console.error("[Booking] Unknown booking location", { location: payload.location });
      return NextResponse.json(
        { ok: false, message: "Оберіть коректний заклад для бронювання.", ...devDetails({ location: payload.location }) },
        { status: 400 },
      );
    }

    const locationConfig = bookingLocationById[payload.location];
    const chatId = process.env[locationConfig.envKey]?.trim() || "";

    console.log("[booking] env variable:", locationConfig.envKey);
    console.log("[booking] has chat id:", Boolean(chatId));

    console.log("[Booking] Resolved booking chat env", {
      location: payload.location,
      chatEnv: locationConfig.envKey,
      chatEnvExists: Boolean(chatId),
    });

    if (!chatId) {
      console.error(`Missing booking chat env for location: ${payload.location}`, {
        missingEnv: locationConfig.envKey,
        displayName: locationConfig.displayName,
      });
      return NextResponse.json(
        { ok: false, message: friendlyError, ...devDetails({ location: payload.location, missingEnv: locationConfig.envKey }) },
        { status: 503 },
      );
    }

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
      "📅 <b>Дата:</b>",
      formatValue(payload.date),
      "",
      "🕒 <b>Час:</b>",
      formatValue(payload.time),
      "",
      "💬 <b>Коментар:</b>",
      formatValue(payload.comment || "-"),
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

    console.log("[Booking] Telegram sendMessage response", {
      ok: telegramResponse.ok,
      status: telegramResponse.status,
      statusText: telegramResponse.statusText,
      location: locationConfig.displayName,
      chatEnv: locationConfig.envKey,
      body: telegramBody.body,
    });

    if (!telegramResponse.ok) {
      console.error("[Booking] Telegram API failed", {
        status: telegramResponse.status,
        body: telegramBody.body,
      });
      return NextResponse.json(
        {
          ok: false,
          message: friendlyError,
          ...devDetails({
            telegramError: getTelegramDescription(telegramBody.body),
            telegramResponse: telegramBody.body,
          }),
        },
        { status: telegramResponse.status },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Дякуємо! Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами.",
    });
  } catch (error) {
    console.error("[Booking] Unhandled route error", error);
    return NextResponse.json(
      { ok: false, message: friendlyError, error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
