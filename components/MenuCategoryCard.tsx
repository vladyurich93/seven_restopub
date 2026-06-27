import type { MenuCategory } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";

type MenuCategoryCardProps = {
  category: MenuCategory;
  index: number;
};

export function MenuCategoryCard({ category, index }: MenuCategoryCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[8px] bg-seven-card premium-border premium-lift hover:border-seven-terracotta/70 hover:shadow-glow">
      <ImageFrame src={category.image} alt={category.title} className="aspect-[16/10] shrink-0" />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="mb-4 font-display text-5xl font-black text-seven-terracotta">0{index + 1}</p>
        <h3 className="font-display text-5xl font-black uppercase leading-none">{category.title}</h3>
        <p className="mt-4 max-w-xl text-sm font-semibold uppercase tracking-[0.08em] text-seven-muted">{category.description}</p>
      </div>
    </article>
  );
}
