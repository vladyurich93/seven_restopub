export const bookingTimes = Array.from({ length: 20 }, (_, i) => `${String(12 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
export const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
export const validPhone = (value: string) => /^0\d{9}$|^380\d{9}$/.test(value.replace(/[\s()+-]/g, ""));
export function kyivDateTime(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Kyiv", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}
export function validBookingDate(date: string, time: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !bookingTimes.includes(time)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  const current = kyivDateTime(now);
  return date > current.date || (date === current.date && time > current.time);
}
export function bookingError(p: Record<string, string>, now = new Date()): string | null {
  if (!["rynok", "vv", "khimichna", "zp"].includes(p.location)) return "Оберіть коректний заклад для бронювання.";
  if (p.locationId && p.locationId !== p.location) return "Оберіть коректний заклад для бронювання.";
  if (!p.name || p.name.length > 100 || !validPhone(p.phone)) return "Вкажіть імʼя та коректний український номер телефону.";
  if (!/^\d+$/.test(p.guests) || Number(p.guests) < 1 || Number(p.guests) > 40) return "Вкажіть цілу кількість гостей від 1 до 40.";
  if (!["non_smoking", "smoking", "rooftop", "no_preference"].includes(p.zone) || (p.zone === "rooftop" && p.location !== "khimichna")) return "Оберіть коректну зону для бронювання.";
  if (!validBookingDate(p.date, p.time, now)) return "Оберіть майбутню дату й доступний час бронювання.";
  if (p.comment.length > 1500 || p.source.length > 100) return "Скоротіть коментар до 1500 символів.";
  return null;
}
