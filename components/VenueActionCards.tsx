"use client";

import { ArrowUpRight, Instagram, Utensils } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

type VenueActionCardsProps = { kind: "menu" | "events" };

export function VenueActionCards({ kind }: VenueActionCardsProps) {
  const { language, tv } = useLanguage();
  const menu = kind === "menu";
  const label = language === "en"
    ? menu ? "Open venue menu" : "Events on Instagram"
    : menu ? "Відкрити меню закладу" : "Афіша в Instagram";
  const Icon = menu ? Utensils : Instagram;

  return (
    <div className="stagger-reveal grid gap-3 sm:grid-cols-2">
      {siteConfig.locations.map((location) => {
        const href = menu ? location.menuLink : location.instagram;
        if (!href) return null;
        return (
          <a
            key={location.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tv(location.name)} — ${label}`}
            className="venue-action-card group flex min-w-0 gap-4 rounded-xl border border-white/15 bg-white/[.025] p-5 transition-colors duration-200 hover:border-seven-green/60 hover:bg-seven-green/5 sm:p-6"
            onClick={() => trackEvent(menu ? "menu_open" : "instagram_click", { location_id: location.id, link_url: href })}
          >
            <Icon size={21} className="mt-1 shrink-0 text-seven-green" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[.18em] text-seven-muted">{tv(location.city)}</p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">{tv(location.name).replace("Seven Restopub ", "")}</h2>
              <p className="mt-2 text-xs leading-5 text-seven-muted">{tv(location.address)}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-seven-green">{label}<ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
