"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ua" | "en";

const storageKey = "seven-language";

export const dictionary = {
  ua: {
    common: {
      book: "Забронювати",
      bookTable: "Забронювати стіл",
      chooseVenue: "Обрати заклад",
      call: "Подзвонити",
      menu: "Меню",
      route: "Маршрут",
      allLocations: "Всі локації",
      openMenu: "Відкрити меню",
      followOpening: "Слідкувати за відкриттям",
      selected: "Обрано",
    },
    nav: {
      home: "Головна",
      locations: "Локації",
      menu: "Меню",
      careers: "Кар'єра",
      events: "Події",
      banquets: "Банкети",
      about: "Про нас",
      contacts: "Контакти",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
    },
    hero: {
      eyebrow: "Modern Ukrainian Restopub",
      title: "Місце для зустрічей, смаку та живих емоцій",
      description: "Друзі, футбол, український крафт, comfort food, коктейлі, тераса, музика і теплі вечори без зайвого приводу.",
      tags: ["Крафт", "Футбол", "Бургери", "Коктейлі", "Кальян", "Тераса"],
      terraceAlt: "Гості на терасі Seven Restopub",
    },
    home: {
      locationsEyebrow: "Locations",
      locationsTitle: "Три Seven — три настрої",
      locationsDescription: "Тераса, центр Львова або перший Seven у Запоріжжі — оберіть простір під свій вечір.",
      aboutEyebrow: "About Seven",
      aboutTitle: "Вечір, у який хочеться повернутися",
      aboutDescription: "Seven — це місце для вечорів, які не хочеться завершувати. Тут дивляться футбол, зустрічаються з друзями, пробують український крафт, вечеряють сім’ями, слухають живу музику і залишаються довше, ніж планували.",
      aboutFacts: ["4 локації", "Крафтове пиво", "Події щотижня", "Атмосфера restopub"],
      menuEyebrow: "Menu",
      menuTitle: "Що знайдеться у нас",
      menuDescription: "Крафт, закуски, бургери, піца, коктейлі, кальян і ланчі — усе для вечора без зайвих планів.",
      eventsEyebrow: "Events",
      eventsTitle: "Живі вечори Seven",
      eventsDescription: "Футбол, музика, DJ, стендап і спеціальні події — коротко, гучно, по-Seven.",
      galleryEyebrow: "Gallery",
      galleryTitle: "Атмосфера Seven",
      galleryDescription: "Футбол на екранах, крафтове пиво, друзі за великим столом, тераса, музика і вечори, які хочеться повторити.",
    },
    footer: {
      locations: "Локації",
      contact: "Зв'язок",
      rights: "Всі права захищені.",
    },
    locationCard: {
      call: "Подзвонити",
      menu: "Меню",
      route: "Маршрут",
    },
    contact: {
      title: "Оберіть свій Seven.",
      description: "Телефони, маршрути і меню для кожної локації.",
    },
    hr: {
      eyebrow: "Команда Seven",
      title: "Стати частиною команди Seven",
      description: "Шукаємо людей, які люблять сервіс, атмосферу і живу енергію закладу.",
      button: "Заповнити анкету",
    },
    forms: {
      close: "Закрити",
      successTitle: "Дякуємо!",
      bookingSuccess: "Ваше бронювання вже отримав адміністратор. Ми скоро звʼяжемося з вами.",
      sendingBooking: "Надсилаємо бронювання...",
      location: "Локація",
      details: "Деталі",
      contacts: "Контакти",
    },
  },
  en: {
    common: {
      book: "Book",
      bookTable: "Book a table",
      chooseVenue: "Choose a venue",
      call: "Call",
      menu: "Menu",
      route: "Directions",
      allLocations: "All locations",
      openMenu: "Open menu",
      followOpening: "Follow the opening",
      selected: "Selected",
    },
    nav: {
      home: "Home",
      locations: "Locations",
      menu: "Menu",
      careers: "Careers",
      events: "Events",
      banquets: "Banquets",
      about: "About",
      contacts: "Contacts",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      eyebrow: "Modern Ukrainian Restopub",
      title: "A place for meetings, flavor and live emotions",
      description: "Friends, football, Ukrainian craft beer, comfort food, cocktails, terrace, music and warm evenings without needing a special occasion.",
      tags: ["Craft", "Football", "Burgers", "Cocktails", "Hookah", "Terrace"],
      terraceAlt: "Guests on the Seven Restopub terrace",
    },
    home: {
      locationsEyebrow: "Locations",
      locationsTitle: "Three Seven venues, three moods",
      locationsDescription: "A terrace, the heart of Lviv or the first Seven in Zaporizhzhia — choose the space for your evening.",
      aboutEyebrow: "About Seven",
      aboutTitle: "An evening you want to return to",
      aboutDescription: "Seven is a place for evenings you do not want to end. Here people watch football, meet friends, taste Ukrainian craft beer, dine with family, listen to live music and stay longer than planned.",
      aboutFacts: ["4 locations", "Craft beer", "Weekly events", "Restopub atmosphere"],
      menuEyebrow: "Menu",
      menuTitle: "What you will find here",
      menuDescription: "Craft beer, snacks, burgers, pizza, cocktails, hookah and lunches — everything for an evening without overplanning.",
      eventsEyebrow: "Events",
      eventsTitle: "Live evenings at Seven",
      eventsDescription: "Football, music, DJs, stand-up and special events — short, loud and unmistakably Seven.",
      galleryEyebrow: "Gallery",
      galleryTitle: "Seven atmosphere",
      galleryDescription: "Football on screens, craft beer, friends around a big table, terrace, music and evenings worth repeating.",
    },
    footer: {
      locations: "Locations",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    locationCard: {
      call: "Call",
      menu: "Menu",
      route: "Directions",
    },
    contact: {
      title: "Choose your Seven.",
      description: "Phones, directions and menus for every location.",
    },
    hr: {
      eyebrow: "Seven team",
      title: "Become part of the Seven team",
      description: "We are looking for people who love service, atmosphere and the live energy of a venue.",
      button: "Apply",
    },
    forms: {
      close: "Close",
      successTitle: "Thank you!",
      bookingSuccess: "Your booking has already reached the administrator. We will contact you soon.",
      sendingBooking: "Sending booking...",
      location: "Location",
      details: "Details",
      contacts: "Contacts",
    },
  },
} as const;

type Dictionary = (typeof dictionary)[Language];

const valueTranslations: Record<string, string> = {
  "Seven Restopub Володимира Великого": "Seven Restopub Volodymyra Velykoho",
  "Seven Restopub Площа Ринок": "Seven Restopub Rynok Square",
  "Seven Restopub Запоріжжя": "Seven Restopub Zaporizhzhia",
  "Seven Площа Ринок": "Seven Rynok Square",
  "Seven Володимира Великого": "Seven Volodymyra Velykoho",
  "Seven Запоріжжя": "Seven Zaporizhzhia",
  "Seven Restopub Львів — Площа Ринок": "Seven Restopub Lviv — Rynok Square",
  "Seven Restopub Львів — Володимира Великого": "Seven Restopub Lviv — Volodymyra Velykoho",
  "Львів": "Lviv",
  "Запоріжжя": "Zaporizhzhia",
  "м. Львів, вул. Володимира Великого, 18": "Lviv, 18 Volodymyra Velykoho St.",
  "м. Львів, площа Ринок, 25": "Lviv, 25 Rynok Square",
  "м. Запоріжжя, вул. Сталеварів, 30": "Zaporizhzhia, 30 Stalevariv St.",
  "Щодня з 12:00 до 23:00": "Daily 12:00-23:00",
  "Дитяча кімната": "Kids room",
  "Велика тераса": "Large terrace",
  "Бізнес-ланчі": "Business lunches",
  "Жива музика": "Live music",
  "⚽ Snookball": "⚽ Snookball",
  "Центр Львова": "Lviv city center",
  "Кальян": "Hookah",
  "Коктейлі": "Cocktails",
  "Туристична локація": "Tourist location",
  "Перший Seven": "The first Seven",
  "Великий вибір крафтового пива": "Large craft beer selection",
  "Спортивні трансляції": "Sports broadcasts",
  "Класична пабна атмосфера": "Classic pub atmosphere",
  "Скоро відкриття": "Opening soon",
  "Готуємо найбільший Seven у Львові": "Preparing the largest Seven in Lviv",
  "Ми відкриваємо новий Seven на вул. Хімічна, 4. Новий простір для зустрічей, сімейного відпочинку, подій та довгих вечорів з друзями.": "We are opening a new Seven at 4 Khimichna St. A new space for meetings, family time, events and long evenings with friends.",
  "м. Львів, вул. Хімічна, 4": "Lviv, 4 Khimichna St.",
  "1200 м² простору": "1200 m² of space",
  "Відкриття вже незабаром.": "Opening soon.",
  "4 локації Seven": "4 Seven locations",
  "3 працюють зараз": "3 open now",
  "1 відкривається незабаром": "1 opening soon",
  "Окрема зала для подій": "Separate event hall",
  "Усе найкраще від Seven": "The best of Seven",
  "Лише у Seven Володимира Великого": "Only at Seven Volodymyra Velykoho",
  "За попереднім записом": "By reservation",
  "⚽ Snookball у Seven": "⚽ Snookball at Seven",
  "Футбол чи більярд? Тепер не потрібно обирати.": "Football or billiards? Now you do not have to choose.",
  "На терасі Seven Володимира Великого з'явився Snookball — гра, яка поєднує футбол та більярд. Збирайте друзів, бронюйте час та влаштовуйте власний турнір.": "Snookball has arrived on the Seven Volodymyra Velykoho terrace — a game that combines football and billiards. Gather friends, book a time and host your own tournament.",
  "Snookball у Львові. Футбольний більярд на терасі Seven Restopub на Володимира Великого.": "Snookball in Lviv. Football billiards on the terrace of Seven Restopub on Volodymyra Velykoho.",
  "Забронювати гру": "Book a game",
  "Крафтове пиво": "Craft beer",
  "Український крафт і ротація кранів.": "Ukrainian craft beer and rotating taps.",
  "Закуски до пива": "Beer snacks",
  "Для великого столу й пива.": "For a big table and beer.",
  "Бургери": "Burgers",
  "Соковито, щедро, без компромісів.": "Juicy, generous, no compromises.",
  "Піца": "Pizza",
  "Для футболу, друзів і вечора.": "For football, friends and the evening.",
  "Основні страви": "Main dishes",
  "Comfort food у стилі Seven.": "Comfort food in Seven style.",
  "Класика й авторські мікси.": "Classics and signature mixes.",
  "Вечірній ритуал після матчу.": "An evening ritual after the match.",
  "Ситно й швидко у будні.": "Hearty and quick on weekdays.",
  "Футбол": "Football",
  "Великі матчі, крафт на столі й зал, який живе грою.": "Big matches, craft beer on the table and a room that lives the game.",
  "Щотижня": "Weekly",
  "Live": "Live",
  "Живий звук, тепле світло і вечори без поспіху.": "Live sound, warm light and evenings without rush.",
  "П'ятниця та субота": "Friday and Saturday",
  "Weekend": "Weekend",
  "Ритм вихідних, коктейлі й міська енергія.": "Weekend rhythm, cocktails and city energy.",
  "За афішею": "See schedule",
  "Стендап": "Stand-up",
  "Comedy": "Comedy",
  "Сміх, імпровізація і легкий вечір з друзями.": "Laughter, improvisation and an easy evening with friends.",
  "Спеціальні події": "Special events",
  "Weekend Events": "Weekend Events",
  "Тематичні вечори та формати для великих компаній.": "Theme evenings and formats for larger groups.",
  "За попереднім бронюванням": "By prior booking",
  "Банкети від 10 людей": "Banquets from 10 guests",
  "1500 грн / людина": "1500 UAH / person",
  "300 грн — вино та ігристе": "300 UAH — wine and sparkling wine",
  "500 грн — міцний алкоголь": "500 UAH — strong alcohol",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  tv: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ua");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "ua" || stored === "en") {
      setLanguageState(stored);
      document.documentElement.lang = stored === "ua" ? "uk" : "en";
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage === "ua" ? "uk" : "en";
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: dictionary[language],
    tv: (text: string) => (language === "en" ? valueTranslations[text] ?? text : text),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-full bg-black/30 p-1 premium-border ${className}`} aria-label="Language switcher">
      {(["ua", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] transition duration-300 ${language === item ? "bg-seven-terracotta text-white shadow-[0_8px_24px_rgba(201,113,74,0.28)]" : "text-seven-muted hover:text-white"}`}
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
