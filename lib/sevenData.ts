import { siteConfig } from "@/data/siteConfig";

export const sevenKnowledgeBase = {
  company: {
    name: "Seven Restopub",
    description: "Seven Restopub — сучасна українська мережа restopub.",
    atmosphere: "Крафтове пиво, їжа, коктейлі, футбол, тераса, кальян, події, банкети та жива командна енергія.",
    tone: "Дружній, впевнений, неформальний.",
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
      notes: "Локація для сімейних вечорів, тераси, бізнес-ланчів, кальяну, крафтового пива і комфорт-фуду. Тут також є Snookball на терасі.",
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
      notes: "Локація в центрі Львова на площі Ринок. Підходить для гостей міста, коктейлів, кальяну, кухні та вечора в туристичному серці Львова.",
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
      notes: "Перший Seven у Запоріжжі з класичною restopub атмосферою, крафтовим пивом, закусками та спортивними трансляціями.",
    },
  ],
  menu: {
    note: "Seven не дублює повне меню в чаті. Актуальне меню відкривається за посиланням конкретної локації.",
    categories: [
      "craft beer",
      "burgers",
      "pizza",
      "snacks",
      "soups",
      "salads",
      "comfort food",
      "cocktails",
      "hookah",
      "business lunches",
      ...siteConfig.menuCategories.map((category) => category.title),
    ],
    categoryDetails: siteConfig.menuCategories.map((category) => ({
      title: category.title,
      description: category.description,
    })),
    pricePolicy: "Не називати точні ціни, якщо їх немає в базі знань.",
    menuLinks: siteConfig.locations.map((location) => ({
      venue: location.name,
      link: location.menuLink,
    })),
  },
  banquets: {
    title: "Банкети у Seven",
    available: "Банкети доступні у Seven.",
    fromPeople: "від 10 людей",
    deposit: "1500 UAH / людина",
    serviceCharge: "+10% service charge",
    corkFee: ["300 UAH — вино або ігристе за пляшку", "500 UAH — міцний алкоголь за пляшку"],
    preOrderRequired: "Для банкетів 10+ людей потрібне попереднє замовлення.",
    booking: "Щоб обговорити банкет, потрібно обрати локацію і зателефонувати.",
  },
  faq: [
    {
      question: "Чи є дитяча кімната?",
      answer: "Так. Дитяча кімната є у Seven Володимира Великого та Seven Площа Ринок.",
    },
    {
      question: "Чи є кальян?",
      answer: "Так. Кальян є у Seven Володимира Великого та Seven Площа Ринок. Для деталей краще зателефонувати у вибрану локацію.",
    },
    {
      question: "Як забронювати стіл?",
      answer: "Оберіть потрібну локацію Seven і зателефонуйте напряму в заклад.",
    },
    {
      question: "Чи можна провести банкет?",
      answer: "Так. Банкети доступні від 10 людей: депозит 1500 UAH / людина, +10% service charge, cork fee за правилами закладу. Для бронювання потрібно зателефонувати у вибрану локацію.",
    },
    {
      question: "Чи можна зі своїм алкоголем?",
      answer: "Так, за cork fee: 300 UAH за пляшку вина або ігристого, 500 UAH за пляшку міцного алкоголю.",
    },
    {
      question: "Де подивитися актуальне меню?",
      answer: "Актуальне меню відкривається за ChoiceQR-посиланням конкретної локації.",
    },
    {
      question: "Як подати заявку на роботу?",
      answer: "Заповніть HR-форму на сайті. CV можна прикріпити опційно. Також можна написати HR у Telegram: https://t.me/Hrsevengroup.",
    },
    {
      question: "Який графік роботи?",
      answer: "Усі три локації працюють щодня 12:00–23:00.",
    },
    {
      question: "Які є локації?",
      answer: "Є Seven Володимира Великого у Львові, Seven Площа Ринок у Львові та Seven Запоріжжя.",
    },
    {
      question: "Чи є тераса?",
      answer: "Так. Тераса є у Seven Володимира Великого.",
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
    positions: ["Кухар", "Офіціант", "Бармен", "Адміністратор", "Кальянщик", "Менеджер", "Інше"],
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
    note: "У Seven є футбольні трансляції, жива музика, standup / comedy та seasonal events. Якщо точної дати немає, потрібно перевірити Instagram або зателефонувати у заклад.",
    items: siteConfig.events.map((event) => ({
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
    })),
    snookball: siteConfig.snookball,
  },
  children: {
    note: "У Seven є дві дитячі кімнати: у Seven Restopub Володимира Великого та Seven Restopub Площа Ринок. У Seven Restopub Запоріжжя дитячої кімнати немає.",
    expectedLocationAnswer: [
      "Дитяча кімната є у двох закладах:",
      "• Seven Restopub Львів — вул. Володимира Великого, 18",
      "• Seven Restopub Львів — площа Ринок, 25",
      "У Seven Restopub Запоріжжя дитячої кімнати немає.",
    ],
    expectedPriceAnswer: [
      "У Seven є дві дитячі кімнати.",
      "📍 Seven Restopub Володимира Великого",
      "• 1 година — 100 грн",
      "• Безліміт на день — 200 грн",
      "📍 Seven Restopub Площа Ринок",
      "• користування безкоштовне.",
    ],
    venuesWithKidsRoom: [
      {
        name: "Seven Restopub Володимира Великого",
        city: "Львів",
        address: "м. Львів, вул. Володимира Великого, 18",
        hasKidsRoom: true,
        price: {
          oneHour: "100 грн",
          dayUnlimited: "200 грн",
          note: "1 година — 100 грн. Безліміт на день — 200 грн.",
        },
      },
      {
        name: "Seven Restopub Площа Ринок",
        city: "Львів",
        address: "м. Львів, площа Ринок, 25",
        hasKidsRoom: true,
        price: {
          use: "безкоштовно",
          note: "Користування дитячою кімнатою безкоштовне.",
        },
      },
    ],
    venuesWithoutKidsRoom: [
      {
        name: "Seven Restopub Запоріжжя",
        city: "Запоріжжя",
        address: "м. Запоріжжя, вул. Сталеварів, 30",
        hasKidsRoom: false,
      },
    ],
    familyFocus: "З дитиною можна приходити в Seven. Дитяча кімната є тільки у двох львівських локаціях: Володимира Великого та Площа Ринок.",
  },
  hookah: {
    note: "Кальян є частиною вечірнього відпочинку у Seven.",
    venues: ["Seven Володимира Великого", "Seven Площа Ринок"],
    recommendation: "Щоб уточнити наявність, смаки або бронювання кальяну, краще зателефонувати у вибрану локацію.",
  },
  assistantRules: {
    defaultLanguage: "Українська",
    answerStyle: "Коротко, дружньо, корисно, без офіційного тону.",
    whenDataExists: "Якщо відповідь є в sevenKnowledgeBase, відповідати впевнено і не казати, що точної інформації немає.",
    whenDetailMissing: "Якщо бракує конкретної ціни, дати, позиції меню або іншої деталі, сказати: Точної інформації зараз немає, краще уточнити у закладі.",
    nextAction: "Наприкінці давати корисну наступну дію: зателефонувати в локацію, відкрити меню, заповнити HR-форму, написати HR або обрати локацію.",
    restriction: "Відповідати тільки на питання про Seven Restopub.",
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
  children: [
    "дит",
    "дитяча",
    "дитяча кімната",
    "ціна дитячої кімнати",
    "вартість",
    "скільки коштує",
    "скільки коштує дитяча",
    "кімната для дітей",
    "діти",
    "kids",
    "kids room",
    "play room",
    "можна з дитиною",
    "family",
    "сім",
    "сімей",
    "родин",
  ],
  hookah: ["кальян", "дим", "hookah"],
  assistantRules: ["правил", "інструкц"],
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
  const sectionsWithRules = Array.from(new Set([...sections, "assistantRules" as const]));

  const context = sectionsWithRules.reduce(
    (result, section) => ({
      ...result,
      [section]: sevenKnowledgeBase[section],
    }),
    {} as Partial<typeof sevenKnowledgeBase>,
  );

  return {
    sections: sectionsWithRules,
    context,
    contextText: JSON.stringify(context, null, 2),
  };
}
