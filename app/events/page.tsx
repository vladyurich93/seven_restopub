import type { Metadata } from "next";
import { EventsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Події",
  description: "Спортивні трансляції, жива музика, стендап, імпровізація та DJ-вечори в Seven Restopub.",
  path: "/events",
  image: siteConfig.events[0].image,
});

export default function EventsPage() {
  return (
    <EventsPageContent />
  );
}
