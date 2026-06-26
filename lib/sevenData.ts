import { siteConfig } from "@/data/siteConfig";

export const sevenKnowledgeBase = {
  company: {
    name: "Seven Restopub",
    description: "Seven Restopub — сучасна українська мережа restopub.",
    slogan: siteConfig.slogan,
    mainFocus: [
      "крафтове пиво",
      "їжа",
      "коктейлі",
      "футбол",
      "тераса",
      "кальян",
      "події",
      "банкети",
      "командна атмосфера",
    ],
    bookingPolicy: "Для бронювання столу, банкету або Snookball потрібно телефонувати у вибрану локацію.",
  },
  locations: [
    {
      id: "lviv-vv",
      name: "Seven Володимира Великого",
      fullName: "Seven Restopub Володимира Великого",
      city: "Львів",
      address: "м. Львів, вул. Володимира Великого, 18",
      phone: "0 (98) 711 77 71",
      workingHours: "щодня 12:00–23:00",
      features: ["дитяча кімната", "тераса", "кальян", "крафтове пиво", "комфорт-фуд", "бізнес-ланчі"],
      menu: "https://seven-restopub-lviv.choiceqr.com/menu",
      instagram: siteConfig.locations[0].instagram,
      mapsLink: siteConfig.locations[0].googleMaps,
    },
    {
      id: "lviv-rynok",
      name: "Seven Площа Ринок",
      fullName: "Seven Restopub Площа Ринок",
      city: "Львів",
      address: "м. Львів, площа Ринок, 25",
      phone: "0 (97) 777 73 25",
      workingHours: "щодня 12:00–23:00",
      features: ["центр Львова", "крафтове пиво", "кухня", "кальян", "туристична локація"],
      menu: "https://mytsi.choiceqr.com/",
      instagram: siteConfig.locations[1].instagram,
      mapsLink: siteConfig.locations[1].googleMaps,
    },
    {
      id: "zaporizhzhia",
      name: "Seven Запоріжжя",
      fullName: "Seven Restopub Запоріжжя",
      city: "Запоріжжя",
      address: "м. Запоріжжя, вул. Сталеварів, 30",
      phone: "0 (68) 711 77 71",
      workingHours: "щодня 12:00–23:00",
      features: ["крафтове пиво", "закуски", "спорт", "атмосфера restopub"],
      menu: "https://seven-restopub.choiceqr.com/",
      instagram: siteConfig.locations[2].instagram,
      mapsLink: siteConfig.locations[2].googleMaps,
    },
  ],
  menu: {
    note: "Seven не дублює повне меню в чаті. Актуальне меню відкривається за посиланням конкретної локації.",
    categories: siteConfig.menuCategories.map((category) => ({
      title: category.title,
      description: category.description,
    })),
    menuLinks: siteConfig.locations.map((location) => ({
      venue: location.name,
      link: location.menuLink,
    })),
  },
  banquets: {
    title: "Банкети у Seven",
    fromPeople: "від 10 людей",
    deposit: "1500 UAH / людина",
    serviceCharge: "+10% service charge",
    corkFee: ["300 UAH — вино або ігристе за пляшку", "500 UAH — міцний алкоголь за пляшку"],
    preOrderRequired: "Для банкетів 10+ людей потрібне попереднє замовлення.",
    booking: "Щоб обговорити банкет, потрібно обрати локацію і зателефонувати.",
  },
  faq: [
    {
      question: "Як забронювати стіл?",
      answer: "Оберіть потрібну локацію Seven і зателефонуйте напряму в заклад.",
    },
    {
      question: "Де подивитися актуальне меню?",
      answer: "Актуальне меню відкривається за ChoiceQR-посиланням конкретної локації.",
    },
    {
      question: "Чи можна дізнатися точну афішу подій у чаті?",
      answer: "Чат підкаже типи подій, але точну афішу краще уточнити в Instagram локації або телефоном.",
    },
  ],
  hr: {
    title: "Стати частиною команди Seven",
    note: "Кандидати можуть подати заявку через HR-форму на сайті. CV / резюме можна прикріпити опційно. Заявки надходять HR-команді в Telegram.",
    telegram: "https://t.me/Hrsevengroup",
    cvUpload: "CV upload is optional.",
    applicationsDestination: "Telegram HR",
    positions: ["Офіціант", "Бармен", "Кухар", "Кальянщик", "Адміністратор", "Інше"],
  },
  contacts: {
    phones: siteConfig.locations.map((location) => ({
      venue: location.name,
      phone: location.phone,
    })),
    instagramByVenue: siteConfig.locations.map((location) => ({
      venue: location.name,
      instagram: location.instagram,
    })),
    mainInstagram: siteConfig.instagram,
    tiktok: siteConfig.tiktok,
  },
  events: {
    note: "У Seven є спортивні трансляції, жива музика, DJ-вечори, стендап та спеціальні події.",
    items: siteConfig.events.map((event) => ({
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
    })),
    snookball: siteConfig.snookball,
  },
  children: {
    note: "Дитяча кімната є у Seven Володимира Великого та Seven Площа Ринок.",
    venues: ["Seven Володимира Великого", "Seven Площа Ринок"],
    familyFocus: "Seven підходить для сімейних вечорів: є комфорт-фуд, тераса і простір для відпочинку.",
  },
  hookah: {
    note: "Кальян є частиною вечірнього відпочинку у Seven.",
    venues: ["Seven Володимира Великого", "Seven Площа Ринок"],
    recommendation: "Щоб уточнити наявність, смаки або бронювання кальяну, краще зателефонувати у вибрану локацію.",
  },
} as const;

type KnowledgeSection = keyof typeof sevenKnowledgeBase;

const sectionKeywords: Record<KnowledgeSection, string[]> = {
  company: ["seven", "севен", "restopub", "рестопаб", "мереж", "концепц", "що таке"],
  locations: [
    "локац",
    "заклад",
    "адрес",
    "де знаход",
    "володимира",
    "великого",
    "ринок",
    "площа",
    "запор",
    "львів",
    "маршрут",
    "карта",
    "maps",
    "годин",
    "графік",
    "працю",
  ],
  menu: ["меню", "їжа", "страв", "бургер", "піца", "закуск", "пиво", "крафт", "коктей", "ланч", "обід"],
  banquets: ["банкет", "депозит", "cork", "корк", "збір", "сервіс", "людей", "свят", "подія", "зал"],
  faq: ["як", "можна", "питання", "підкаж", "брон", "заброн"],
  hr: ["робот", "ваканс", "кар'єр", "карʼєр", "анкета", "hr", "резюме", "cv", "офіціант", "бармен", "кухар"],
  contacts: ["контакт", "телефон", "подзвон", "дзвон", "instagram", "інст", "tiktok", "тікток", "соц"],
  events: ["поді", "афіш", "футбол", "трансляц", "dj", "дідж", "стендап", "музик", "концерт", "snookball"],
  children: ["дит", "дитяча", "діти", "сім", "сімей", "родин"],
  hookah: ["кальян", "дим", "hookah"],
};

function normalizeQuestion(question: string) {
  return question.toLowerCase().replace(/ё/g, "е").replace(/ʼ/g, "'").trim();
}

export function findRelevantContext(question: string) {
  const normalizedQuestion = normalizeQuestion(question);
  const matchedSections = (Object.keys(sectionKeywords) as KnowledgeSection[]).filter((section) =>
    sectionKeywords[section].some((keyword) => normalizedQuestion.includes(keyword)),
  );

  const sections = matchedSections.length ? Array.from(new Set(matchedSections)) : (["company", "faq"] satisfies KnowledgeSection[]);

  const context = sections.reduce(
    (result, section) => ({
      ...result,
      [section]: sevenKnowledgeBase[section],
    }),
    {} as Partial<typeof sevenKnowledgeBase>,
  );

  return {
    sections,
    context,
    contextText: JSON.stringify(context, null, 2),
  };
}
