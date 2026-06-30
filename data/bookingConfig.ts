export type BookingLocationId = "rynok" | "vv" | "zp";

export type BookingLocation = {
  id: BookingLocationId;
  label: string;
  displayName: string;
  city: string;
  envKey: "TELEGRAM_BOOKING_CHAT_RYNOK" | "TELEGRAM_BOOKING_CHAT_W" | "TELEGRAM_BOOKING_CHAT_ZP";
};

export const bookingLocations = [
  {
    id: "rynok",
    label: "Lviv – Rynok Square",
    displayName: "Seven Restopub Львів – Площа Ринок",
    city: "Львів",
    envKey: "TELEGRAM_BOOKING_CHAT_RYNOK",
  },
  {
    id: "vv",
    label: "Lviv – Volodymyra Velykoho",
    displayName: "Seven Restopub Львів – Володимира Великого",
    city: "Львів",
    envKey: "TELEGRAM_BOOKING_CHAT_W",
  },
  {
    id: "zp",
    label: "Zaporizhzhia",
    displayName: "Seven Restopub Запоріжжя",
    city: "Запоріжжя",
    envKey: "TELEGRAM_BOOKING_CHAT_ZP",
  },
] as const satisfies readonly BookingLocation[];

export const bookingLocationById = Object.fromEntries(
  bookingLocations.map((location) => [location.id, location]),
) as Record<BookingLocationId, BookingLocation>;
