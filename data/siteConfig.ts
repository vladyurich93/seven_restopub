export type Location = {
  id: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  googleMaps: string;
  instagram: string;
  menuLink: string;
  workingHours: string;
  image: string;
  features: string[];
};

export type EventItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  image: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type MenuCategory = {
  title: string;
  description: string;
  image: string;
};

export const siteConfig = {
  brandName: "Seven Restopub",
  siteUrl: "https://seven-restopub.vercel.app",
  slogan: "Місце для зустрічей, смаку та живих емоцій",
  description: "Крафтове пиво, комфорт-фуд, спортивні трансляції, кальяни, жива музика та атмосфера справжнього відпочинку.",
  logo: "/images/logo/seven-logo.svg",
  favicon: "/images/logo/seven-logo.svg",
  ogImage: "/images/hero/hero-02.jpg",
  instagram: "https://www.instagram.com/seven.restopub.zp?igsh=Z2RlbGQ2bWFscG02",
  tiktok: "https://www.tiktok.com/@seven_restopub",
  heroImages: [
    "/images/hero/hero-02.jpg",
    "/images/hero/hero-01.jpg",
    "/images/hero/hero-03.jpg",
    "/images/hero/hero-04.jpg",
    "/images/hero/hero-05.jpg",
  ],
  phones: ["0 (98) 711 77 71", "0 (97) 777 73 25", "0 (68) 711 77 71"],
  addresses: [
    "м. Львів, вул. Володимира Великого, 18",
    "м. Львів, площа Ринок, 25",
    "м. Запоріжжя, вул. Сталеварів, 30",
  ],
  workingHours: {
    default: "Пн-Чт: 12:00-23:00, Пт-Нд: 12:00-01:00",
    banquet: "За попереднім дзвінком",
  },
  googleMapsLinks: [
    "https://maps.google.com/?q=Seven+Restopub+Volodymyra+Velykoho+18+Lviv",
    "https://maps.google.com/?q=Seven+Restopub+Rynok+Square+25+Lviv",
    "https://maps.google.com/?q=Seven+Restopub+Zaporizhzhia+Stalevariv+30",
  ],
  locations: [
    {
      id: "lviv-vv",
      name: "Seven Restopub Володимира Великого",
      city: "Львів",
      phone: "0 (98) 711 77 71",
      address: "м. Львів, вул. Володимира Великого, 18",
      googleMaps: "https://maps.google.com/?q=Seven+Restopub+Volodymyra+Velykoho+18+Lviv",
      instagram: "https://www.instagram.com/seven.vv18?igsh=MW1kdjFoaDZ1NXNvdg==",
      menuLink: "https://seven-restopub-lviv.choiceqr.com/menu",
      workingHours: "Щодня з 12:00 до 23:00",
      image: "/images/locations/location-vv-01.jpg",
      features: ["Дитяча кімната", "Велика тераса", "Бізнес-ланчі", "Жива музика", "⚽ Snookball"],
    },
    {
      id: "lviv-rynok",
      name: "Seven Restopub Площа Ринок",
      city: "Львів",
      phone: "0 (97) 777 73 25",
      address: "м. Львів, площа Ринок, 25",
      googleMaps: "https://maps.google.com/?q=Seven+Restopub+Rynok+Square+25+Lviv",
      instagram: "https://www.instagram.com/seven.square25?igsh=MXF5cGthdXdsd3Vvbg==",
      menuLink: "https://mytsi.choiceqr.com/",
      workingHours: "Щодня з 12:00 до 23:00",
      image: "/images/locations/location-rynok-01.jpg",
      features: ["Центр Львова", "Кальян", "Коктейлі", "Дитяча кімната", "Туристична локація"],
    },
    {
      id: "zaporizhzhia",
      name: "Seven Restopub Запоріжжя",
      city: "Запоріжжя",
      phone: "0 (68) 711 77 71",
      address: "м. Запоріжжя, вул. Сталеварів, 30",
      googleMaps: "https://maps.google.com/?q=Seven+Restopub+Zaporizhzhia+Stalevariv+30",
      instagram: "https://www.instagram.com/seven.restopub.zp?igsh=Z2RlbGQ2bWFscG02",
      menuLink: "https://seven-restopub.choiceqr.com/",
      workingHours: "Щодня з 12:00 до 23:00",
      image: "/images/locations/location-zaporizhzhia-01.jpg",
      features: ["Перший Seven", "Великий вибір крафтового пива", "Спортивні трансляції", "Класична пабна атмосфера"],
    },
  ] satisfies Location[],
  upcomingLocation: {
    badge: "Скоро відкриття",
    title: "Готуємо найбільший Seven у Львові",
    text: "Ми відкриваємо новий Seven на вул. Хімічна, 4. Новий простір для зустрічей, сімейного відпочинку, подій та довгих вечорів з друзями.",
    address: "м. Львів, вул. Хімічна, 4",
    image: "/images/gallery/gallery-29.jpg",
    area: "1200 м² простору",
    note: "Відкриття вже незабаром.",
    ctaLabel: "Слідкувати за відкриттям",
    ctaLink: "https://www.tiktok.com/@seven_restopub",
    counters: ["4 локації Seven", "3 працюють зараз", "1 відкривається незабаром"],
    features: [
      { icon: "👨‍👩‍👧", title: "Дитяча кімната" },
      { icon: "🌿", title: "Велика літня тераса" },
      { icon: "🎉", title: "Окрема зала для подій" },
      { icon: "🍺", title: "Усе найкраще від Seven" },
    ],
  },
  snookball: {
    badge: "Лише у Seven Володимира Великого",
    bookingBadge: "За попереднім записом",
    title: "⚽ Snookball у Seven",
    subtitle: "Футбол чи більярд? Тепер не потрібно обирати.",
    text: "На терасі Seven Володимира Великого з'явився Snookball — гра, яка поєднує футбол та більярд. Збирайте друзів, бронюйте час та влаштовуйте власний турнір.",
    seoText: "Snookball у Львові. Футбольний більярд на терасі Seven Restopub на Володимира Великого.",
    ctaLabel: "Забронювати гру",
    phone: "+38 (098) 711 77 71",
    images: ["/images/snookball/snookball-01.jpg", "/images/snookball/snookball-02.jpg"],
  },
  menuCategories: [
    {
      title: "Крафтове пиво",
      description: "Український крафт і ротація кранів.",
      image: "/images/menu/menu-beer-01.jpg",
    },
    {
      title: "Закуски до пива",
      description: "Для великого столу й пива.",
      image: "/images/menu/menu-snacks-01.jpg",
    },
    {
      title: "Бургери",
      description: "Соковито, щедро, без компромісів.",
      image: "/images/menu/menu-burger-01.jpg",
    },
    {
      title: "Піца",
      description: "Для футболу, друзів і вечора.",
      image: "/images/menu/menu-pizza-01.jpg",
    },
    {
      title: "Основні страви",
      description: "Comfort food у стилі Seven.",
      image: "/images/menu/menu-main-01.jpg",
    },
    {
      title: "Коктейлі",
      description: "Класика й авторські мікси.",
      image: "/images/menu/menu-cocktail-01.jpg",
    },
    {
      title: "Кальян",
      description: "Вечірній ритуал після матчу.",
      image: "/images/menu/menu-hookah-01.jpg",
    },
    {
      title: "Бізнес-ланчі",
      description: "Ситно й швидко у будні.",
      image: "/images/menu/menu-business-lunch-01.jpg",
    },
  ] satisfies MenuCategory[],
  events: [
    {
      id: "sports",
      title: "Спортивні трансляції",
      category: "Футбол",
      description: "Великі матчі, крафт на столі й зал, який живе грою.",
      date: "Щотижня",
      image: "/images/events/event-football-01.jpg",
    },
    {
      id: "live-music",
      title: "Жива музика",
      category: "Live",
      description: "Живий звук, тепле світло і вечори без поспіху.",
      date: "П'ятниця та субота",
      image: "/images/events/event-live-music-04.jpg",
    },
    {
      id: "dj",
      title: "DJ вечори",
      category: "Weekend",
      description: "Ритм вихідних, коктейлі й міська енергія.",
      date: "За афішею",
      image: "/images/events/event-dj-02.jpg",
    },
    {
      id: "standup",
      title: "Стендап",
      category: "Comedy",
      description: "Сміх, імпровізація і легкий вечір з друзями.",
      date: "За афішею",
      image: "/images/events/event-standup-03.jpg",
    },
    {
      id: "special",
      title: "Спеціальні події",
      category: "Weekend Events",
      description: "Тематичні вечори та формати для великих компаній.",
      date: "За попереднім бронюванням",
      image: "/images/events/event-special-03.jpg",
    },
  ] satisfies EventItem[],
  galleryImages: [
    { src: "/images/gallery/gallery-01.jpg", alt: "Тераса Seven Restopub на Володимира Великого" },
    { src: "/images/gallery/gallery-02.jpg", alt: "Атмосферна зона Seven Restopub на площі Ринок" },
    { src: "/images/gallery/gallery-03.jpg", alt: "Гості та кальян на терасі Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-04.jpg", alt: "Бар Seven Restopub на Володимира Великого" },
    { src: "/images/gallery/gallery-05.jpg", alt: "Крафтові крани Seven Restopub" },
    { src: "/images/gallery/gallery-06.jpg", alt: "Піца Seven Restopub для компанії" },
    { src: "/images/gallery/gallery-07.jpg", alt: "Бургер Seven Restopub крупним планом" },
    { src: "/images/gallery/gallery-08.jpg", alt: "Авторський коктейль Seven Restopub" },
    { src: "/images/gallery/gallery-09.jpg", alt: "Крафтове пиво Seven Restopub у келихах" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Фасад Seven Restopub на площі Ринок" },
    { src: "/images/gallery/gallery-11.jpg", alt: "Затишна зона Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-12.jpg", alt: "Дитяча кімната Seven Restopub Володимира Великого" },
    { src: "/images/gallery/gallery-13.jpg", alt: "Дитяча кімната Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-14.jpg", alt: "Закуски до пива Seven Restopub" },
    { src: "/images/gallery/gallery-15.jpg", alt: "Коктейлі на терасі Seven Restopub" },
    { src: "/images/gallery/gallery-16.jpg", alt: "Футбольна трансляція Seven Restopub Володимира Великого" },
    { src: "/images/gallery/gallery-17.jpg", alt: "Кам’яний зал Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-18.jpg", alt: "Теплий куток Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-19.jpg", alt: "Світлий зал Seven Restopub Володимира Великого" },
    { src: "/images/gallery/gallery-20.jpg", alt: "Дегустаційний сет пива Seven Restopub" },
    { src: "/images/gallery/gallery-21.jpg", alt: "Курка з орзо Seven Restopub" },
    { src: "/images/gallery/gallery-22.jpg", alt: "Комфорт-фуд Seven Restopub" },
    { src: "/images/gallery/gallery-23.jpg", alt: "Пиво у фірмових келихах Seven Restopub" },
    { src: "/images/gallery/gallery-24.jpg", alt: "Лаунж-зона Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-25.jpg", alt: "Футбольна трансляція Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-26.jpg", alt: "Зелень та дерев’яні столи Seven Restopub" },
    { src: "/images/gallery/gallery-27.jpg", alt: "Пара коктейлів Seven Restopub" },
    { src: "/images/gallery/gallery-28.jpg", alt: "Основна страва Seven Restopub" },
    { src: "/images/gallery/gallery-29.jpg", alt: "Велика тераса Seven Restopub Володимира Великого" },
    { src: "/images/gallery/gallery-30.jpg", alt: "Зелений зал Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-31.jpg", alt: "Настінна вивіска Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-32.jpg", alt: "Цитрусовий sour Seven Restopub" },
    { src: "/images/gallery/gallery-33.jpg", alt: "Коктейль з чорницею Seven Restopub" },
    { src: "/images/gallery/gallery-34.jpg", alt: "Страва з креветками Seven Restopub" },
    { src: "/images/gallery/gallery-35.jpg", alt: "Риба з орзо Seven Restopub" },
    { src: "/images/gallery/gallery-36.jpg", alt: "Класичний коктейль Seven Restopub" },
    { src: "/images/gallery/gallery-37.jpg", alt: "Світлова інсталяція Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-38.jpg", alt: "Посадка біля вікон Seven Restopub" },
    { src: "/images/gallery/gallery-39.jpg", alt: "Бургер з картоплею Seven Restopub" },
    { src: "/images/gallery/gallery-40.jpg", alt: "Коктейль з м’ятою Seven Restopub" },
    { src: "/images/gallery/gallery-41.jpg", alt: "Зелений коктейль Seven Restopub" },
    { src: "/images/gallery/gallery-42.jpg", alt: "Футбольна трансляція Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-43.jpg", alt: "Денна посадка Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-44.jpg", alt: "Столики на терасі Seven Restopub" },
    { src: "/images/gallery/gallery-45.jpg", alt: "Коктейль з лаймом Seven Restopub" },
    { src: "/images/gallery/gallery-46.jpg", alt: "Spritz Seven Restopub" },
    { src: "/images/gallery/gallery-47.jpg", alt: "Червоний коктейль Seven Restopub" },
    { src: "/images/gallery/gallery-48.jpg", alt: "Коктейль з квіткою Seven Restopub" },
    { src: "/images/gallery/gallery-49.jpg", alt: "Металева вивіска Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-50.jpg", alt: "Подача бургерів Seven Restopub" },
    { src: "/images/gallery/gallery-51.jpg", alt: "Налив пива Seven Restopub" },
    { src: "/images/gallery/gallery-52.jpg", alt: "Довгий дерев’яний стіл Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-53.jpg", alt: "Зал з футболом Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-54.jpg", alt: "Вечірній футбол Seven Restopub Запоріжжя" },
    { src: "/images/gallery/gallery-55.jpg", alt: "Сонячний інтер’єр Seven Restopub" },
    { src: "/images/gallery/gallery-56.jpg", alt: "Стіна Seven Restopub Площа Ринок" },
    { src: "/images/gallery/gallery-57.jpg", alt: "Живий виступ на терасі Seven Restopub" },
    { src: "/images/gallery/gallery-58.jpg", alt: "Вокалістка на події Seven Restopub" },
    { src: "/images/gallery/gallery-59.jpg", alt: "Жива музика з клавішами Seven Restopub" },
    { src: "/images/gallery/gallery-60.jpg", alt: "Атмосфера живого вечора Seven Restopub" },
    { src: "/images/gallery/gallery-61.jpg", alt: "Музичний виступ Seven Restopub" },
    { src: "/images/gallery/gallery-62.jpg", alt: "DJ вечір Seven Restopub" },
    { src: "/images/gallery/gallery-63.jpg", alt: "Стендап на терасі Seven Restopub" },
    { src: "/images/gallery/gallery-64.jpg", alt: "Комедійний вечір Seven Restopub" },
    { src: "/images/gallery/gallery-65.jpg", alt: "Сервірування для спеціальної події Seven Restopub" },
    { src: "/images/gallery/gallery-66.jpg", alt: "Банкетний стіл на терасі Seven Restopub" },
    { src: "/images/gallery/gallery-67.jpg", alt: "Оформлення спеціальної події Seven Restopub" },
    { src: "/images/gallery/gallery-68.jpg", alt: "Snookball на терасі Seven Restopub Володимира Великого" },
    { src: "/images/gallery/gallery-69.jpg", alt: "Футбольний більярд Snookball у Seven Restopub Львів" },
  ] satisfies GalleryImage[],
  eventImages: [
    "/images/events/event-football-01.jpg",
    "/images/events/event-live-music-01.jpg",
    "/images/events/event-live-music-02.jpg",
    "/images/events/event-live-music-03.jpg",
    "/images/events/event-live-music-04.jpg",
    "/images/events/event-live-music-05.jpg",
    "/images/events/event-live-music-06.jpg",
    "/images/events/event-dj-01.jpg",
    "/images/events/event-dj-02.jpg",
    "/images/events/event-standup-01.jpg",
    "/images/events/event-standup-02.jpg",
    "/images/events/event-standup-03.jpg",
    "/images/events/event-special-01.jpg",
    "/images/events/event-special-02.jpg",
    "/images/events/event-special-03.jpg",
    "/images/events/event-special-04.jpg",
  ],
  banquetRules: {
    title: "Банкети від 10 людей",
    deposit: "1500 грн / людина",
    serviceFee: "10%",
    corkFee: ["300 грн — вино та ігристе", "500 грн — міцний алкоголь"],
  },
  about: {
    title: "Seven — це вечір, у який хочеться повернутися",
    description: "Ми створюємо місце для друзів, футболу, сімейних вечорів, тераси, живої музики й тих емоцій, заради яких люди обирають не просто заклад, а свою атмосферу.",
    notes: [
      "2024 — відкрився перший Seven у Запоріжжі.",
      "2025 — відкрився Seven на Володимира Великого.",
      "2026 — відкрився Seven на Площі Ринок.",
    ],
    expandedWith: ["Крафтове пиво", "Спортивні трансляції", "Кальян", "Жива музика", "Тераса", "Сімейний відпочинок"],
  },
} as const;

export type SiteConfig = typeof siteConfig;
