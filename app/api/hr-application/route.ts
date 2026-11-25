import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { validPhone } from "@/lib/formValidation";
import { oncePerRequest, telegramSend } from "@/lib/formDelivery";

type HRApplicationPayload = {
  name: string;
  phone: string;
  city: string;
  location: string;
  position: string;
  contactMethod: string;
  experience: string;
  startDate: string;
  comment: string;
  source: string;
  language: string;
  timestamp: string;
  consent: string;
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

const isValidUkrainianPhone = validPhone;

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

const getPayload = (formData: FormData): HRApplicationPayload => ({
  name: clean(formData.get("name")),
  phone: clean(formData.get("phone")),
  city: clean(formData.get("city")),
  location: clean(formData.get("location")),
  position: clean(formData.get("position")),
  contactMethod: clean(formData.get("contactMethod")),
  experience: clean(formData.get("experience")),
  startDate: clean(formData.get("startDate")),
  comment: clean(formData.get("comment")),
  source: clean(formData.get("source")),
  language: clean(formData.get("language")),
  timestamp: clean(formData.get("timestamp")),
  consent: clean(formData.get("consent")),
});


export async function POST(request: Request) {
  if (process.env.VERCEL_ENV === "preview" || process.env.SEVEN_PREVIEW_MODE === "1") return NextResponse.json({ ok: false, preview: true, message: "Це попередній перегляд. Реальну заявку не надіслано." }, { status: 409 });
  let formData: FormData;
  try { formData = await request.formData(); } catch { return NextResponse.json({ ok: false, message: "Некоректні дані анкети." }, { status: 400 }); }
  const payload = getPayload(formData);
  const cvEntry = formData.get("cv");
  const cvFile = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null;
  if (!payload.name || payload.name.length > 100 || !isValidUkrainianPhone(payload.phone)) return NextResponse.json({ ok: false, message: "Вкажіть імʼя та коректний український номер телефону." }, { status: 400 });
  if (payload.consent !== "accepted") return NextResponse.json({ ok: false, message: "Потрібна згода на обробку персональних даних." }, { status: 400 });
  if (Object.values(payload).some(value => value.length > 1500)) return NextResponse.json({ ok: false, message: "Скоротіть текст анкети до 1500 символів у кожному полі." }, { status: 400 });
  const locations: Record<string, string> = Object.fromEntries(siteConfig.locations.map(venue => [venue.name, venue.city]));
  if ((payload.city && !["Львів", "Запоріжжя"].includes(payload.city)) || (payload.location && payload.location !== "Неважливо / готовий працювати в будь-якій локації" && (!locations[payload.location] || (payload.city && locations[payload.location] !== payload.city)))) return NextResponse.json({ ok: false, message: "Перевірте місто та заклад." }, { status: 400 });
  if (cvFile && (!allowedCvTypes.includes(cvFile.type) || cvFile.size > maxCvSizeBytes)) return NextResponse.json({ ok: false, message: "CV має бути PDF, DOC, DOCX, JPG або PNG до 10 MB." }, { status: 400 });
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const hrChatId = process.env.TELEGRAM_HR_CHAT_ID?.trim() || process.env.TELEGRAM_CHAT_ID?.trim();
  if (!botToken || !hrChatId) return NextResponse.json({ ok: false, message: fallbackMessage }, { status: 503 });
  const cvHash = cvFile ? await crypto.subtle.digest("SHA-256", await cvFile.arrayBuffer()).then(buffer => Array.from(new Uint8Array(buffer), value => value.toString(16).padStart(2, "0")).join("")) : "";
  const result = await oncePerRequest("hr", clean(formData.get("requestId")), JSON.stringify({ ...payload, timestamp: "", cvHash }), async () => {
    const text = [
      "🟢 <b>Нова HR заявка</b>",
      "",
      `👤 <b>Ім'я:</b> ${formatValue(payload.name)}`,
      `📞 <b>Телефон:</b> ${formatValue(payload.phone)}`,
      `🏙 <b>Місто:</b> ${formatValue(payload.city)}`,
      `📍 <b>Заклад:</b> ${formatValue(payload.location)}`,
      `💼 <b>Посада:</b> ${formatValue(payload.position)}`,
      `📲 <b>Зручний спосіб зв'язку:</b> ${formatValue(payload.contactMethod)}`,
      `📅 <b>Досвід:</b> ${formatValue(payload.experience)}`,
      `⏰ <b>Готовий почати:</b> ${formatValue(payload.startDate)}`,
      `💬 <b>Коментар:</b> ${formatValue(payload.comment)}`,
      "",
      `🔎 <b>Source:</b> ${formatValue(payload.source)}`,
      `🌐 <b>Language:</b> ${formatValue(payload.language)}`,
      `📎 <b>CV:</b> ${cvFile ? formatValue(cvFile.name) : "Не додано"}`,
      `✅ <b>Згода на обробку даних:</b> ${formatValue(payload.consent)}`,
      "🌐 sevenrestopub",
      `🕒 ${formatValue(formatTimestamp())}`,
    ].join("\n");


    const sent = await telegramSend(botToken, "sendMessage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: hrChatId, text, parse_mode: "HTML", disable_web_page_preview: true }) });
    if (!sent) return { body: { ok: false, message: fallbackMessage }, status: 502 };
    if (cvFile) {
      const documentData = new FormData();
      documentData.append("chat_id", hrChatId);
      documentData.append("caption", `📎 CV / Резюме кандидата: ${payload.name}`);
      documentData.append("document", cvFile, cvFile.name);
      try {
        if (!await telegramSend(botToken, "sendDocument", { method: "POST", body: documentData })) return { body: { ok: true, cvWarning: true, message: cvWarningMessage }, status: 200 };
      } catch { return { body: { ok: true, cvWarning: true, message: cvWarningMessage }, status: 200 }; }
    }
    return { body: { ok: true, message: successMessage }, status: 200 };
  });
  return NextResponse.json(result.body, { status: result.status });
}
