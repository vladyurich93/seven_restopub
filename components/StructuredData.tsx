import { siteConfig, type Location } from "@/data/siteConfig";

const absoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();
const iconUrl = `${siteConfig.siteUrl}/android-chrome-512x512.png`;
const socialLinks = Array.from(
  new Set([
    siteConfig.tiktok,
    ...siteConfig.locations.map((location) => location.instagram),
  ]),
);
const locations = siteConfig.locations as readonly Location[];
const organizationDescription =
  "Seven Restopub — мережа сучасних рестопабів України: піца, бургери, крафтове пиво, коктейлі, кальяни, спортивні трансляції, дитячі кімнати та літні тераси.";

const addressParts: Record<string, { city: string; streetAddress: string }> = {
  "lviv-vv": {
    city: "Львів",
    streetAddress: "вул. Володимира Великого, 18",
  },
  "lviv-rynok": {
    city: "Львів",
    streetAddress: "площа Ринок, 25",
  },
  zaporizhzhia: {
    city: "Запоріжжя",
    streetAddress: "вул. Сталеварів, 30",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      logo: iconUrl,
      image: absoluteUrl(siteConfig.ogImage),
      sameAs: socialLinks,
      description: organizationDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: siteConfig.siteUrl,
      name: siteConfig.brandName,
      description: siteConfig.description,
      inLanguage: "uk-UA",
      publisher: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.siteUrl}/#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Головна", item: `${siteConfig.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Меню", item: `${siteConfig.siteUrl}/menu` },
        { "@type": "ListItem", position: 3, name: "Локації", item: `${siteConfig.siteUrl}/locations` },
        { "@type": "ListItem", position: 4, name: "Події", item: `${siteConfig.siteUrl}/events` },
        { "@type": "ListItem", position: 5, name: "Банкети", item: `${siteConfig.siteUrl}/banquets` },
        { "@type": "ListItem", position: 6, name: "Контакти", item: `${siteConfig.siteUrl}/contacts` },
      ],
    },
    {
      "@type": "Restaurant",
      "@id": `${siteConfig.siteUrl}/#restaurant`,
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      logo: iconUrl,
      image: absoluteUrl(siteConfig.ogImage),
      description: siteConfig.description,
      servesCuisine: ["Українська кухня", "Pub food", "Comfort food"],
      priceRange: "$$",
      sameAs: socialLinks,
      hasMenu: siteConfig.locations.map((location) => location.menuLink),
      branchOf: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
      department: siteConfig.locations.map((location) => ({
        "@id": `${siteConfig.siteUrl}/#${location.id}`,
      })),
    },
    {
      "@type": "Menu",
      "@id": `${siteConfig.siteUrl}/menu#menu`,
      name: "Меню Seven Restopub",
      url: `${siteConfig.siteUrl}/menu`,
      hasMenuSection: siteConfig.menuCategories.map((category) => ({
        "@type": "MenuSection",
        name: category.title,
        description: category.description,
        image: absoluteUrl(category.image),
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Який графік роботи Seven Restopub?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Усі діючі заклади Seven Restopub працюють щодня з 12:00 до 23:00.",
          },
        },
        {
          "@type": "Question",
          name: "Чи можна забронювати столик?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Так, столик можна забронювати через форму на сайті або телефоном обраного закладу.",
          },
        },
        {
          "@type": "Question",
          name: "Чи можна провести банкет?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Так, банкети доступні від 10 гостей. Депозит 1500 грн з людини, сервісний збір 10%, cork fee: 300 грн для вина та ігристого, 500 грн для міцного алкоголю.",
          },
        },
        {
          "@type": "Question",
          name: "Де є дитяча кімната?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Дитяча кімната є у Seven Restopub Володимира Великого та Seven Restopub Площа Ринок у Львові.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.siteUrl}/events#event-formats`,
      name: "Формати подій Seven Restopub",
      itemListElement: siteConfig.events.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          "@id": `${siteConfig.siteUrl}/events#${event.id}`,
          name: event.title,
          description: event.description,
          image: absoluteUrl(event.image),
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@id": `${siteConfig.siteUrl}/#restaurant`,
          },
          organizer: {
            "@id": `${siteConfig.siteUrl}/#organization`,
          },
        },
      })),
    },
    ...locations.map((location) => ({
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": `${siteConfig.siteUrl}/#${location.id}`,
      name: location.name,
      url: `${siteConfig.siteUrl}/locations`,
      image: absoluteUrl(location.image),
      logo: iconUrl,
      description: `${location.name} — частина мережі Seven Restopub. ${location.features.join(", ")}.`,
      telephone: location.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: addressParts[location.id]?.streetAddress ?? location.address,
        addressLocality: addressParts[location.id]?.city ?? location.city,
        addressCountry: "UA",
      },
      ...(location.geo
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.geo.latitude,
              longitude: location.geo.longitude,
            },
          }
        : {}),
      openingHours: "Mo-Su 12:00-23:00",
      servesCuisine: ["Українська кухня", "Pub food", "Comfort food"],
      priceRange: "$$",
      sameAs: [location.instagram],
      hasMap: location.googleMaps,
      hasMenu: location.menuLink,
      parentOrganization: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
    })),
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
