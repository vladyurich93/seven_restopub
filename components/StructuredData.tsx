import { siteConfig, type Location } from "@/data/siteConfig";
import { canonicalSiteUrl, absoluteSiteUrl, publicPages, type PublicPagePath } from "@/lib/seo";

const absoluteUrl = (path: string) => absoluteSiteUrl(path);
const iconUrl = `${canonicalSiteUrl}/android-chrome-512x512.png`;
const socialLinks = Array.from(
  new Set([
    siteConfig.tiktok,
    ...siteConfig.locations.map((location) => location.instagram),
  ]),
);
const locations = siteConfig.locations as readonly Location[];
const organizationDescription = siteConfig.description;

const addressParts: Record<string, { city: string; streetAddress: string }> = {
  "lviv-vv": {
    city: "Львів",
    streetAddress: "вул. Володимира Великого, 18",
  },
  "lviv-rynok": {
    city: "Львів",
    streetAddress: "площа Ринок, 25",
  },
  khimichna: {
    city: "Львів",
    streetAddress: "вул. Хімічна, 4",
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
      "@id": `${canonicalSiteUrl}/#organization`,
      name: siteConfig.brandName,
      url: canonicalSiteUrl,
      logo: iconUrl,
      image: absoluteUrl(siteConfig.ogImage),
      sameAs: socialLinks,
      description: organizationDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${canonicalSiteUrl}/#website`,
      url: canonicalSiteUrl,
      name: siteConfig.brandName,
      description: siteConfig.description,
      inLanguage: "uk-UA",
      publisher: {
        "@id": `${canonicalSiteUrl}/#organization`,
      },
    },
    {
      "@type": "Restaurant",
      "@id": `${canonicalSiteUrl}/#restaurant`,
      name: siteConfig.brandName,
      url: canonicalSiteUrl,
      logo: iconUrl,
      image: absoluteUrl(siteConfig.ogImage),
      description: siteConfig.description,
      servesCuisine: ["Українська кухня", "Pub food", "Comfort food"],
      priceRange: "$$",
      sameAs: socialLinks,
      hasMenu: siteConfig.locations.map((location) => location.menuLink).filter(Boolean),
      branchOf: {
        "@id": `${canonicalSiteUrl}/#organization`,
      },
      department: siteConfig.locations.map((location) => ({
        "@id": `${canonicalSiteUrl}/#${location.id}`,
      })),
    },
    ...locations.map((location) => ({
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": `${canonicalSiteUrl}/#${location.id}`,
      name: location.name,
      url: `${canonicalSiteUrl}/locations`,
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
      ...(location.googleMaps ? { hasMap: location.googleMaps } : {}),
      ...(location.menuLink ? { hasMenu: location.menuLink } : {}),
      parentOrganization: {
        "@id": `${canonicalSiteUrl}/#organization`,
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


/** Breadcrumbs describe this document's ancestry, never the global navigation. */
export function PageStructuredData({ path }: { path: PublicPagePath }) {
  const page = publicPages.find((entry) => entry.path === path)!;
  const graph: object[] = [{
    "@type": "WebPage", "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path), name: `${page.name} | ${siteConfig.brandName}`,
    isPartOf: { "@id": `${canonicalSiteUrl}/#website` }, inLanguage: "uk-UA",
    ...(path === "/" ? {} : { breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumbs` } }),
  }];
  if (path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${absoluteUrl(path)}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: page.name, item: absoluteUrl(path) },
    ],
  });
  if (path === "/menu") graph.push({
    "@type": "Menu", "@id": `${absoluteUrl(path)}#menu`, name: "Меню Seven Restopub", url: absoluteUrl(path),
    hasMenuSection: siteConfig.menuCategories.map((category) => ({
      "@type": "MenuSection", name: category.title, description: category.description, image: absoluteUrl(category.image),
    })),
  });
  // Formats have no confirmed dates: they are editorial content, not scheduled Events.
  if (path === "/events") graph.push({
    "@type": "ItemList", name: "Формати подій Seven Restopub",
    itemListElement: siteConfig.events.map((event, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "CreativeWork", name: event.title, description: event.description, image: absoluteUrl(event.image) },
    })),
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
