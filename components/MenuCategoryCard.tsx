"use client";

import type { MenuCategory } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";
import { ImageFrame } from "./ImageFrame";

type MenuCategoryCardProps = {
  category: MenuCategory;
  index: number;
};

export function MenuCategoryCard({ category, index }: MenuCategoryCardProps) {
  const { tv } = useLanguage();

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:border-seven-terracotta/70 hover:shadow-glow">
      <ImageFrame src={category.image} alt={tv(category.title)} className="aspect-[16/10] shrink-0" />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="mb-4 font-display text-5xl font-black text-seven-terracotta">0{index + 1}</p>
        <h3 className="font-display text-5xl font-black uppercase leading-none">{tv(category.title)}</h3>
        <p className="mt-4 max-w-xl text-sm font-semibold uppercase tracking-[0.08em] text-seven-muted">{tv(category.description)}</p>
      </div>
    </article>
  );
}
