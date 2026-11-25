import { createHash } from "node:crypto";
// Best-effort, instance-local protection. Serverless restarts/other instances do not share it.
// Ambiguous delivery remains cached: retrying the same token must not resend automatically.
type Result = { body: Record<string, unknown>; status: number };
const entries = new Map<string, { fingerprint: string; expires: number; result: Promise<Result> }>();
export async function oncePerRequest(scope: string, token: string, payload: string, run: () => Promise<Result>): Promise<Result> {
  if (!/^[a-zA-Z0-9-]{16,100}$/.test(token)) return { body: { ok: false, message: "Оновіть сторінку й спробуйте ще раз." }, status: 400 };
  const now = Date.now();
  for (const [key, entry] of entries) if (entry.expires < now) entries.delete(key);
  const key = `${scope}:${token}`;
  const fingerprint = createHash("sha256").update(payload).digest("hex");
  const existing = entries.get(key);
  if (existing) return existing.fingerprint === fingerprint ? existing.result : { body: { ok: false, message: "Дані змінилися. Перевірте форму й повторіть." }, status: 409 };
  if (entries.size >= 1000) return { body: { ok: false, message: "Сервіс зайнятий. Спробуйте пізніше." }, status: 503 };
  const result = Promise.resolve().then(run).catch(() => ({ body: { ok: false, deliveryUnknown: true, message: "Не вдалося підтвердити доставку заявки. Вона могла надійти. Уточніть у закладі перед повторним надсиланням." }, status: 504 }));
  entries.set(key, { fingerprint, expires: now + 30 * 60 * 1000, result });
  return result;
}
export async function telegramSend(token: string, method: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, { ...init, signal: controller.signal });
    const body: unknown = await response.json();
    return response.ok && typeof body === "object" && body !== null && "ok" in body && body.ok === true;
  } finally { clearTimeout(timeout); }
}
