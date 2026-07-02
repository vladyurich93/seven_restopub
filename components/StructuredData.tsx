import { siteConfig } from "@/data/siteConfig";

const absoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();

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
      logo: absoluteUrl(siteConfig.logo),
      image: absoluteUrl(siteConfig.ogImage),
      sameAs: [siteConfig.instagram, siteConfig.tiktok],
      description: siteConfig.description,
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
      "@type": "Restaurant",
      "@id": `${siteConfig.siteUrl}/#restaurant`,
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      logo: absoluteUrl(siteConfig.logo),
      image: absoluteUrl(siteConfig.ogImage),
      description: siteConfig.description,
      servesCuisine: ["Українська кухня", "Pub food", "Comfort food"],
      priceRange: "$$",
      sameAs: [siteConfig.instagram, siteConfig.tiktok],
      hasMenu: siteConfig.locations.map((location) => location.menuLink),
      branchOf: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
      department: siteConfig.locations.map((location) => ({
        "@id": `${siteConfig.siteUrl}/#${location.id}`,
      })),
    },
    ...siteConfig.locations.map((location) => ({
      "@type": "LocalBusiness",
      "@id": `${siteConfig.siteUrl}/#${location.id}`,
      name: location.name,
      url: `${siteConfig.siteUrl}/locations`,
      image: absoluteUrl(location.image),
      telephone: location.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: addressParts[location.id]?.streetAddress ?? location.address,
        addressLocality: addressParts[location.id]?.city ?? location.city,
        addressCountry: "UA",
      },
      openingHours: "Mo-Su 12:00-23:00",
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
