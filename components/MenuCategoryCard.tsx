"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MenuCategory } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";
import { ImageFrame } from "./ImageFrame";

type MenuCategoryCardProps = {
  category: MenuCategory;
  index?: number;
  href?: string;
};

export function MenuCategoryCard({ category, href }: MenuCategoryCardProps) {
  const { tv, language } = useLanguage();
  const content = (
    <article className="menu-category-card flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[.025]">
      <ImageFrame src={category.image} alt={tv(category.title)} className="aspect-[4/3] shrink-0" sizes="(min-width:1200px) 23vw, 46vw" />
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="menu-category-title font-display font-semibold leading-tight">{tv(category.title)}</h3>
        <p className="mt-2 text-xs leading-5 text-seven-muted sm:text-sm">{tv(category.description)}</p>
        {href ? <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-semibold text-seven-green">{language === "en" ? "Choose a venue" : "Обрати заклад"}<ArrowUpRight size={14} className="shrink-0" /></span> : null}
      </div>
    </article>
  );
  return href ? <Link href={href} className="group block min-w-0 rounded-lg transition-colors hover:bg-white/5" aria-label={`${tv(category.title)} — ${language === "en" ? "choose a venue and menu" : "обрати заклад і меню"}`}>{content}</Link> : content;
}
