import { siteConfig } from "@/data/siteConfig";

export const sevenAssistantData = {
  brand: {
    name: siteConfig.brandName,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
  },
  venues: siteConfig.locations.map((location) => ({
    name: location.name,
    city: location.city,
    address: location.address,
    phone: location.phone,
    workingHours: location.workingHours,
    menu: location.menuLink,
    route: location.googleMaps,
    instagram: location.instagram,
    features: location.features,
  })),
  social: {
    instagramByVenue: siteConfig.locations.map((location) => ({
      venue: location.name,
      instagram: location.instagram,
    })),
    tiktok: siteConfig.tiktok,
  },
  menuCategories: siteConfig.menuCategories.map((category) => ({
    title: category.title,
    description: category.description,
  })),
  events: siteConfig.events.map((event) => ({
    title: event.title,
    category: event.category,
    description: event.description,
    date: event.date,
  })),
  banquetRules: siteConfig.banquetRules,
  snookball: siteConfig.snookball,
  hr: {
    title: "Стати частиною команди Seven",
    telegram: "https://t.me/Hrsevengroup",
    note: "Для вакансій гість може заповнити HR-анкету на сайті або написати HR у Telegram.",
    positions: ["Офіціант", "Бармен", "Кухар", "Кальянщик", "Адміністратор", "Інше"],
  },
  bookingPolicy: "Для бронювання столу, банкету або Snookball потрібно телефонувати у вибрану локацію.",
  missingInfoMessage: "Точної інформації зараз немає, краще уточнити у закладі.",
} as const;

export function getSevenAssistantContext() {
  return JSON.stringify(sevenAssistantData, null, 2);
}
