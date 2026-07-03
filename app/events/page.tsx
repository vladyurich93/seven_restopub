import type { Metadata } from "next";
import { EventsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Події",
  description: "Спортивні трансляції, жива музика, стендап, імпровізація та DJ-вечори в Seven Restopub.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Події Seven Restopub",
    description: "Актуальні події Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.events[0].image }],
  },
};

export default function EventsPage() {
  return (
    <EventsPageContent />
  );
}
