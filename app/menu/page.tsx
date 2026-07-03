import type { Metadata } from "next";
import { MenuPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Меню",
  description: "Огляд категорій меню Seven Restopub: крафт, закуски, бургери, піца, основні страви, авторські напої, димний формат і бізнес-ланчі.",
  path: "/menu",
  image: siteConfig.menuCategories[0].image,
});

export default function MenuPage() {
  return (
    <MenuPageContent />
  );
}
