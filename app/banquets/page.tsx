import type { Metadata } from "next";
import { BanquetsPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Банкети",
  description: "Банкети від 10 гостей у Seven Restopub: депозит, сервісний збір і cork fee.",
  alternates: {
    canonical: "/banquets",
  },
  openGraph: {
    title: "Банкети Seven Restopub",
    description: "Обговоріть банкет у Seven Restopub.",
    type: "website",
    images: [{ url: "/images/gallery/gallery-01.jpg" }],
  },
};

export default function BanquetsPage() {
  return (
    <BanquetsPageContent />
  );
}
