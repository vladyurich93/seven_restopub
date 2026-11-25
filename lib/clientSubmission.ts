"use client";
/** Reuse the same identity for retries of identical form data. Never persist personal data. */
export function submissionIdentity(previous: { key: string; id: string } | null, key: string) {
  return previous?.key === key ? previous : { key, id: crypto.randomUUID() };
}
export async function fetchForm(url: string, options: RequestInit) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 30000);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  finally { window.clearTimeout(timer); }
}
