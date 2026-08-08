export type BookingLocationId = "rynok" | "vv" | "khimichna" | "zp";

export type BookingLocation = {
  id: BookingLocationId;
  label: string;
  displayName: string;
  city: string;
  envKey:
    | "TELEGRAM_BOOKING_CHAT_RYNOK"
    | "TELEGRAM_BOOKING_CHAT_VV"
    | "TELEGRAM_BOOKING_CHAT_KHIMICHNA"
    | "TELEGRAM_BOOKING_CHAT_ZP";
};

const bookingLocationRynok = {
  id: "rynok",
  label: "Seven Площа Ринок",
  displayName: "Seven Restopub Львів — Площа Ринок",
  city: "Львів",
  envKey: "TELEGRAM_BOOKING_CHAT_RYNOK",
} as const satisfies BookingLocation;

const bookingLocationVv = {
  id: "vv",
  label: "Seven Володимира Великого",
  displayName: "Seven Restopub Львів — Володимира Великого",
  city: "Львів",
  envKey: "TELEGRAM_BOOKING_CHAT_VV",
} as const satisfies BookingLocation;

const bookingLocationZp = {
  id: "zp",
  label: "Seven Запоріжжя",
  displayName: "Seven Restopub Запоріжжя",
  city: "Запоріжжя",
  envKey: "TELEGRAM_BOOKING_CHAT_ZP",
} as const satisfies BookingLocation;

const bookingLocationKhimichna = {
  id: "khimichna",
  label: "Seven Хімічна",
  displayName: "Seven Restopub Хімічна",
  city: "Львів",
  envKey: "TELEGRAM_BOOKING_CHAT_KHIMICHNA",
} as const satisfies BookingLocation;

export const bookingLocationById: Record<BookingLocationId, BookingLocation> = {
  rynok: bookingLocationRynok,
  vv: bookingLocationVv,
  khimichna: bookingLocationKhimichna,
  zp: bookingLocationZp,
};

export const bookingLocations = [
  bookingLocationRynok,
  bookingLocationVv,
  bookingLocationKhimichna,
  bookingLocationZp,
] as const satisfies readonly BookingLocation[];
