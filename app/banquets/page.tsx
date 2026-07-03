import type { Metadata } from "next";
import { BanquetsPageContent } from "@/components/PageContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Банкети",
  description: "Банкети від 10 гостей у Seven Restopub: депозит, сервісний збір і cork fee.",
  path: "/banquets",
  image: "/images/gallery/gallery-01.jpg",
});

export default function BanquetsPage() {
  return (
    <BanquetsPageContent />
  );
}
