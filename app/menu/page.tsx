import type { Metadata } from "next";
import { MenuPageContent } from "@/components/PageContent";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Меню",
  description: "Огляд категорій меню Seven Restopub: крафтове пиво, закуски, бургери, піца, основні страви, коктейлі, кальян і бізнес-ланчі.",
  path: "/menu",
  image: siteConfig.menuCategories[0].image,
});

export default function MenuPage() {
  return (
    <MenuPageContent />
  );
}
