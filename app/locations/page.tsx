import type { Metadata } from "next";
import { BrandWord } from "@/components/BrandWord";
import { LocationCard } from "@/components/LocationCard";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Локації",
  description: "Локації Seven Restopub у Львові та Запоріжжі: телефони, адреси, Instagram, маршрути та графік роботи.",
  openGraph: {
    title: "Локації Seven Restopub",
    description: "Оберіть найближчий Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.locations[0].image }],
  },
};

export default function LocationsPage() {
  return (
    <section className="bg-seven-background pb-20 pt-36">
      <div className="container-shell">
        <SectionTitle eyebrow="Locations" title={<>Оберіть <BrandWord tone="cream" /></>} description="Три заклади, три настрої, одна атмосфера Seven." />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {siteConfig.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}
