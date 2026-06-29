import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Меню",
  description: "Огляд категорій меню Seven Restopub: крафтове пиво, закуски, бургери, піца, основні страви, коктейлі, кальян і бізнес-ланчі.",
  openGraph: {
    title: "Меню Seven Restopub",
    description: "Візуальні категорії меню Seven Restopub.",
    type: "website",
    images: [{ url: siteConfig.menuCategories[0].image }],
  },
};

export default function MenuPage() {
  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <div className="container-shell">
        <SectionTitle eyebrow="Menu" title="Меню настрою" description="Крафт, закуски, бургери, піца, коктейлі, кальян і ланчі для вечора в Seven." />
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-1 min-[900px]:grid-cols-2 min-[1281px]:grid-cols-3">
          {siteConfig.locations.map((location) => (
            <article key={location.id} className="flex h-full min-h-[344px] min-w-0 flex-col rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] p-6 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow md:min-h-[262px] min-[900px]:min-h-[300px] min-[1281px]:min-h-0">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-seven-green">{location.city}</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-white min-[900px]:min-h-20">{location.name.replace("Seven Restopub ", "Seven ")}</h2>
              <p className="mt-4 min-h-12 text-sm leading-6 text-seven-muted">{location.address}</p>
              <div className="mt-auto pt-6">
                <Button href={location.menuLink} className="min-h-14 w-full text-base">Відкрити меню</Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {siteConfig.menuCategories.map((category, index) => (
            <MenuCategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
