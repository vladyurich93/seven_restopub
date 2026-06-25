import { NextResponse } from "next/server";

type HRApplicationPayload = {
  name?: string;
  phone?: string;
  city?: string;
  location?: string;
  position?: string;
  experience?: string;
  startDate?: string;
  comment?: string;
};

const fallbackMessage = "Заявку не вдалося відправити. Спробуйте ще раз або напишіть нам у Telegram.";

const clean = (value?: string) => value?.trim() || "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isValidUkrainianPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 10 && digits.startsWith("0")) || (digits.length === 12 && digits.startsWith("380"));
};

const formatValue = (value?: string) => escapeHtml(clean(value) || "Не вказано");

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

export async function POST(request: Request) {
  let payload: HRApplicationPayload;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const hrChatId = process.env.TELEGRAM_HR_CHAT_ID;
  const envStatus = {
    TELEGRAM_BOT_TOKEN_EXISTS: Boolean(botToken),
    TELEGRAM_HR_CHAT_ID_EXISTS: Boolean(hrChatId),
  };

  console.log("[HR application] Environment status", envStatus);

  try {
    payload = (await request.json()) as HRApplicationPayload;
  } catch (error) {
    console.error("[HR application] Invalid request JSON", error);
    return NextResponse.json({ message: `Некоректні дані анкети: ${getErrorMessage(error)}` }, { status: 400 });
  }

  const name = clean(payload.name);
  const phone = clean(payload.phone);

  if (!name || !phone) {
    return NextResponse.json({ message: "Заповніть імʼя та телефон." }, { status: 400 });
  }

  if (!isValidUkrainianPhone(phone)) {
    return NextResponse.json({ message: "Вкажіть коректний український номер телефону." }, { status: 400 });
  }

  if (!botToken || !hrChatId) {
    const missingVariables = [
      !botToken ? "TELEGRAM_BOT_TOKEN" : null,
      !hrChatId ? "TELEGRAM_HR_CHAT_ID" : null,
    ].filter(Boolean);
    const message = `Telegram не налаштований. Відсутні env variables: ${missingVariables.join(", ")}.`;

    console.error("[HR application] Missing Telegram environment variables", {
      ...envStatus,
      missingVariables,
      message,
    });

    return NextResponse.json({ message }, { status: 503 });
  }

  const text = [
    "🟢 <b>Нова HR заявка</b>",
    "",
    `👤 <b>Ім'я:</b> ${formatValue(name)}`,
    `📞 <b>Телефон:</b> ${formatValue(phone)}`,
    `🏙 <b>Місто:</b> ${formatValue(payload.city)}`,
    `📍 <b>Заклад:</b> ${formatValue(payload.location)}`,
    `💼 <b>Посада:</b> ${formatValue(payload.position)}`,
    `📅 <b>Досвід:</b> ${formatValue(payload.experience)}`,
    `⏰ <b>Готовий почати:</b> ${formatValue(payload.startDate)}`,
    `💬 <b>Коментар:</b> ${formatValue(payload.comment)}`,
    "",
    "🌐 sevenrestopub",
    `🕒 ${formatTimestamp()}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: hrChatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const telegramResponseText = await response.text();
    let telegramResponseBody: unknown = telegramResponseText;

    try {
      telegramResponseBody = JSON.parse(telegramResponseText) as unknown;
    } catch (error) {
      console.error("[HR application] Failed to parse Telegram API response as JSON", error);
      // Telegram normally returns JSON, but keep the raw response for diagnostics if it does not.
    }

    const telegramLogPayload = {
      ...envStatus,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      body: telegramResponseBody,
    };

    if (!response.ok) {
      console.error("[HR application] Telegram API response", telegramLogPayload);

      const telegramDescription =
        typeof telegramResponseBody === "object" &&
        telegramResponseBody !== null &&
        "description" in telegramResponseBody &&
        typeof telegramResponseBody.description === "string"
          ? telegramResponseBody.description
          : telegramResponseText || fallbackMessage;

      return NextResponse.json({ message: `Telegram API error: ${telegramDescription}` }, { status: response.status });
    }

    console.log("[HR application] Telegram API response", telegramLogPayload);
  } catch (error) {
    console.error("[HR application] Telegram request failed", error);
    return NextResponse.json({ message: `Telegram request failed: ${getErrorMessage(error)}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
