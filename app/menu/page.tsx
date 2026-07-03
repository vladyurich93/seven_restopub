import type { Metadata } from "next";
import { MenuPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Меню",
  description: "Огляд категорій меню Seven Restopub: крафтове пиво, закуски, бургери, піца, основні страви, коктейлі, кальян і бізнес-ланчі.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Меню Seven Restopub",
    description: "Візуальні категорії меню Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.menuCategories[0].image }],
  },
};

export default function MenuPage() {
  return (
    <MenuPageContent />
  );
}
