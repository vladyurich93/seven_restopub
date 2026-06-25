import { NextResponse } from "next/server";

type HRApplicationPayload = {
  name: string;
  phone: string;
  city: string;
  location: string;
  position: string;
  experience: string;
  startDate: string;
  comment: string;
};

const fallbackMessage = "Заявку не вдалося відправити. Спробуйте ще раз або напишіть нам у Telegram.";
const cvWarningMessage = "Заявку отримано, але файл CV не вдалося прикріпити.";
const successMessage = "Дякуємо! Ми отримали вашу заявку. HR Seven звʼяжеться з вами найближчим часом.";
const maxCvSizeBytes = 10 * 1024 * 1024;
const allowedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const clean = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

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

const formatValue = (value?: string) => escapeHtml(value?.trim() || "Не вказано");

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

const getEnvValue = (...names: string[]) => {
  for (const name of names) {
    const value = process.env[name]?.trim();

    if (value) {
      return { name, value };
    }
  }

  return { name: names[0], value: "" };
};

const parseTelegramResponse = async (response: Response) => {
  const text = await response.text();
  let body: unknown = text;

  try {
    body = JSON.parse(text) as unknown;
  } catch (error) {
    console.error("[HR application] Failed to parse Telegram API response as JSON", error);
  }

  return { text, body };
};

const getTelegramDescription = (body: unknown, fallback: string) =>
  typeof body === "object" && body !== null && "description" in body && typeof body.description === "string"
    ? body.description
    : fallback;

const getPayload = (formData: FormData): HRApplicationPayload => ({
  name: clean(formData.get("name")),
  phone: clean(formData.get("phone")),
  city: clean(formData.get("city")),
  location: clean(formData.get("location")),
  position: clean(formData.get("position")),
  experience: clean(formData.get("experience")),
  startDate: clean(formData.get("startDate")),
  comment: clean(formData.get("comment")),
});

export async function POST(request: Request) {
  try {
    const botTokenEnv = getEnvValue("TELEGRAM_BOT_TOKEN");
    const hrChatIdEnv = getEnvValue("TELEGRAM_HR_CHAT_ID", "TELEGRAM_CHAT_ID");
    const botToken = botTokenEnv.value;
    const hrChatId = hrChatIdEnv.value;
    const envStatus = {
      TELEGRAM_BOT_TOKEN_EXISTS: Boolean(botToken),
      TELEGRAM_HR_CHAT_ID_EXISTS: Boolean(process.env.TELEGRAM_HR_CHAT_ID?.trim()),
      TELEGRAM_CHAT_ID_EXISTS: Boolean(process.env.TELEGRAM_CHAT_ID?.trim()),
      TELEGRAM_BOT_TOKEN_SOURCE: botToken ? botTokenEnv.name : null,
      TELEGRAM_HR_CHAT_ID_SOURCE: hrChatId ? hrChatIdEnv.name : null,
    };

    console.log("[HR application] Environment status", envStatus);

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

    let formData: FormData;

    try {
      formData = await request.formData();
    } catch (error) {
      console.error("[HR application] Invalid multipart form data", error);
      return NextResponse.json({ message: `Некоректні дані анкети: ${getErrorMessage(error)}` }, { status: 400 });
    }

    const payload = getPayload(formData);
    const cvEntry = formData.get("cv");
    const cvFile = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null;

    if (!payload.name || !payload.phone) {
      return NextResponse.json({ message: "Заповніть імʼя та телефон." }, { status: 400 });
    }

    if (!isValidUkrainianPhone(payload.phone)) {
      return NextResponse.json({ message: "Вкажіть коректний український номер телефону." }, { status: 400 });
    }

    if (cvFile && (!allowedCvTypes.includes(cvFile.type) || cvFile.size > maxCvSizeBytes)) {
      return NextResponse.json({ message: "CV має бути PDF, DOC, DOCX, JPG або PNG до 10 MB." }, { status: 400 });
    }

    const text = [
      "🟢 <b>Нова HR заявка</b>",
      "",
      `👤 <b>Ім'я:</b> ${formatValue(payload.name)}`,
      `📞 <b>Телефон:</b> ${formatValue(payload.phone)}`,
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

    const messageResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: hrChatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const messageTelegramResponse = await parseTelegramResponse(messageResponse);
    const messageLogPayload = {
      ...envStatus,
      ok: messageResponse.ok,
      status: messageResponse.status,
      statusText: messageResponse.statusText,
      body: messageTelegramResponse.body,
    };

    if (!messageResponse.ok) {
      console.error("[HR application] Telegram sendMessage response", messageLogPayload);
      return NextResponse.json(
        { message: `Telegram API error: ${getTelegramDescription(messageTelegramResponse.body, messageTelegramResponse.text || fallbackMessage)}` },
        { status: messageResponse.status },
      );
    }

    console.log("[HR application] Telegram sendMessage response", messageLogPayload);

    if (cvFile) {
      const documentFormData = new FormData();
      documentFormData.append("chat_id", hrChatId);
      documentFormData.append("caption", `📎 CV / Резюме кандидата: ${payload.name}`);
      documentFormData.append("document", cvFile, cvFile.name);

      try {
        const documentResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
          method: "POST",
          body: documentFormData,
        });
        const documentTelegramResponse = await parseTelegramResponse(documentResponse);
        const documentLogPayload = {
          ...envStatus,
          ok: documentResponse.ok,
          status: documentResponse.status,
          statusText: documentResponse.statusText,
          body: documentTelegramResponse.body,
        };

        if (!documentResponse.ok) {
          console.error("[HR application] Telegram sendDocument response", documentLogPayload);
          return NextResponse.json({ ok: true, cvWarning: true, message: cvWarningMessage }, { status: 200 });
        }

        console.log("[HR application] Telegram sendDocument response", documentLogPayload);
      } catch (error) {
        console.error("[HR application] Telegram sendDocument failed", error);
        return NextResponse.json({ ok: true, cvWarning: true, message: cvWarningMessage }, { status: 200 });
      }
    }

    return NextResponse.json({ ok: true, message: successMessage });
  } catch (error) {
    console.error("[HR application] Unhandled route error", error);
    return NextResponse.json({ message: `HR application route failed: ${getErrorMessage(error)}` }, { status: 500 });
  }
}
