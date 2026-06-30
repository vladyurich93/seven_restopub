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

const getTelegramEnvKeys = () => Object.keys(process.env).filter((key) => key.startsWith("TELEGRAM_")).sort();

const getBookingEnvStatus = () => ({
  TELEGRAM_BOT_TOKEN_EXISTS: Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()),
  TELEGRAM_BOOKING_CHAT_VV_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_VV?.trim()),
  TELEGRAM_BOOKING_CHAT_RYNOK_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_RYNOK?.trim()),
  TELEGRAM_BOOKING_CHAT_ZP_EXISTS: Boolean(process.env.TELEGRAM_BOOKING_CHAT_ZP?.trim()),
});

const maskChatId = (value: string) => {
  if (!value) return "";

  const prefix = value.startsWith("-") ? "-" : "";
  const normalized = prefix ? value.slice(1) : value;

  if (normalized.length <= 7) {
    return `${prefix}${normalized.slice(0, 2)}***${normalized.slice(-2)}`;
  }

  return `${prefix}${normalized.slice(0, 5)}******${normalized.slice(-3)}`;
};

const isNumericTelegramChatId = (value: string) => /^-?\d+$/.test(value);

const getBookingChatDebugStatus = () => ({
  TELEGRAM_BOOKING_CHAT_VV: {
    maskedChatId: maskChatId(process.env.TELEGRAM_BOOKING_CHAT_VV?.trim() || ""),
    isNumeric: isNumericTelegramChatId(process.env.TELEGRAM_BOOKING_CHAT_VV?.trim() || ""),
  },
  TELEGRAM_BOOKING_CHAT_RYNOK: {
    maskedChatId: maskChatId(process.env.TELEGRAM_BOOKING_CHAT_RYNOK?.trim() || ""),
    isNumeric: isNumericTelegramChatId(process.env.TELEGRAM_BOOKING_CHAT_RYNOK?.trim() || ""),
  },
  TELEGRAM_BOOKING_CHAT_ZP: {
    maskedChatId: maskChatId(process.env.TELEGRAM_BOOKING_CHAT_ZP?.trim() || ""),
    isNumeric: isNumericTelegramChatId(process.env.TELEGRAM_BOOKING_CHAT_ZP?.trim() || ""),
  },
});

export async function POST(request: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || "";

    if (!botToken) {
      console.error("[Booking] Missing TELEGRAM_BOT_TOKEN", {
        telegramEnvKeys: getTelegramEnvKeys(),
        envStatus: getBookingEnvStatus(),
      });
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

    if (!isBookingLocationId(payload.location)) {
      console.error("[Booking] Unknown booking location", { location: payload.location });
      return NextResponse.json(
        { ok: false, message: "Оберіть коректний заклад для бронювання.", ...devDetails({ location: payload.location }) },
        { status: 400 },
      );
    }

    const locationConfig = bookingLocationById[payload.location];
    const chatId = process.env[locationConfig.envKey]?.trim() || "";

    console.error("[Booking] Telegram booking chat debug", {
      selectedLocation: payload.location,
      selectedEnv: locationConfig.envKey,
      selectedMaskedChatId: maskChatId(chatId),
      selectedChatIdIsNumeric: isNumericTelegramChatId(chatId),
      bookingChats: getBookingChatDebugStatus(),
    });

    if (!chatId) {
      console.error(`Missing booking chat env for location: ${payload.location}`, {
        missingEnv: locationConfig.envKey,
        displayName: locationConfig.displayName,
        telegramEnvKeys: getTelegramEnvKeys(),
        envStatus: getBookingEnvStatus(),
      });
      return NextResponse.json(
        { ok: false, message: friendlyError, ...devDetails({ location: payload.location, missingEnv: locationConfig.envKey }) },
        { status: 503 },
      );
    }

    if (!isNumericTelegramChatId(chatId)) {
      console.error("[Booking] Booking chat id must be numeric, not username", {
        location: payload.location,
        chatEnv: locationConfig.envKey,
        maskedChatId: maskChatId(chatId),
        startsWithAt: chatId.startsWith("@"),
      });
      return NextResponse.json(
        {
          ok: false,
          message: friendlyError,
          ...devDetails({
            location: payload.location,
            chatEnv: locationConfig.envKey,
            reason: "Booking chat id must be numeric, not @username.",
          }),
        },
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

    if (!telegramResponse.ok) {
      console.error("[Booking] Telegram API failed", {
        status: telegramResponse.status,
        statusText: telegramResponse.statusText,
        location: locationConfig.displayName,
        chatEnv: locationConfig.envKey,
        maskedChatId: maskChatId(chatId),
        chatIdIsNumeric: isNumericTelegramChatId(chatId),
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
