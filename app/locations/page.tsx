import type { Metadata } from "next";
import { LocationsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Локації",
  description: "Локації Seven Restopub у Львові та Запоріжжі: телефони, адреси, Instagram, маршрути та графік роботи.",
  path: "/locations",
  image: siteConfig.locations[0].image,
});

export default function LocationsPage() {
  return (
    <LocationsPageContent />
  );
}
