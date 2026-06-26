import { CalendarDays } from "lucide-react";
import type { EventItem } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";

type EventCardProps = {
  event: EventItem;
  featured?: boolean;
};

export function EventCard({ event, featured = false }: EventCardProps) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-[8px] bg-seven-card premium-border premium-lift hover:shadow-glow ${featured ? "md:grid md:grid-cols-[1.2fr_0.8fr] md:items-stretch" : ""}`}>
      <ImageFrame src={event.image} alt={event.title} className={featured ? "min-h-[360px] md:h-full" : "aspect-[16/11]"} />
      <div className={featured ? "flex h-full flex-col justify-end p-7 md:p-10" : "flex flex-1 flex-col p-6"}>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-seven-green">{event.category}</p>
        <h3 className={`mt-3 font-display font-black ${featured ? "text-5xl md:text-6xl" : "text-3xl"}`}>{event.title}</h3>
        <p className="mt-4 max-w-xl leading-7 text-seven-muted">{event.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-5 text-sm font-black uppercase tracking-[0.12em] text-white">
          <CalendarDays size={18} className="text-seven-terracotta" />
          {event.date}
        </p>
      </div>
    </article>
  );
}
