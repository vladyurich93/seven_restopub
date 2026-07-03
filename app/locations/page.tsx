import type { Metadata } from "next";
import { LocationsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Локації",
  description: "Локації Seven Restopub у Львові та Запоріжжі: телефони, адреси, Instagram, маршрути та графік роботи.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Локації Seven Restopub",
    description: "Оберіть найближчий Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.locations[0].image }],
  },
};

export default function LocationsPage() {
  return (
    <LocationsPageContent />
  );
}
