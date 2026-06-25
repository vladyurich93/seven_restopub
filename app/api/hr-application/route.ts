import { NextResponse } from "next/server";

type HRApplicationPayload = {
  name?: string;
  phone?: string;
  telegram?: string;
  city?: string;
  position?: string;
  experience?: string;
  comment?: string;
};

const fallbackMessage = "Заявка поки не відправилась. Спробуйте написати нам у Telegram.";

const clean = (value?: string) => value?.trim() || "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const messageLine = (label: string, value?: string) => {
  const normalized = clean(value);
  return normalized ? `<b>${label}:</b> ${escapeHtml(normalized)}` : null;
};

export async function POST(request: Request) {
  let payload: HRApplicationPayload;

  try {
    payload = (await request.json()) as HRApplicationPayload;
  } catch {
    return NextResponse.json({ message: "Некоректні дані анкети." }, { status: 400 });
  }

  const name = clean(payload.name);
  const phone = clean(payload.phone);
  const position = clean(payload.position);

  if (!name || !phone || !position) {
    return NextResponse.json({ message: "Заповніть імʼя, телефон і бажану посаду." }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const hrChatId = process.env.TELEGRAM_HR_CHAT_ID;
  const vladChatId = process.env.TELEGRAM_VLAD_CHAT_ID;

  if (!botToken || !hrChatId || !vladChatId) {
    return NextResponse.json({ message: fallbackMessage }, { status: 503 });
  }

  const text = [
    "<b>Нова HR-анкета Seven</b>",
    "",
    messageLine("Імʼя", name),
    messageLine("Телефон", phone),
    messageLine("Telegram", payload.telegram),
    messageLine("Місто", payload.city),
    messageLine("Бажана посада", position),
    messageLine("Досвід роботи", payload.experience),
    messageLine("Коментар", payload.comment),
  ]
    .filter(Boolean)
    .join("\n");

  const chatIds = [hrChatId, vladChatId];
  const responses = await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }),
    ),
  );

  const hasFailedDelivery = responses.some((response) => response.status === "rejected" || !response.value.ok);

  if (hasFailedDelivery) {
    return NextResponse.json({ message: fallbackMessage }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
