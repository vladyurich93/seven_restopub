export function normalizedPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("0") ? `+38${digits}` : `+${digits}`;
}

export function formatPhone(phone: string) {
  const normalized = normalizedPhone(phone);
  return normalized.replace(/^(\+380)(\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5");
}

export function phoneHref(phone: string) {
  return `tel:${normalizedPhone(phone)}`;
}
