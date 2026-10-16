"use client";

import { ArrowUpRight, Instagram, Phone, Utensils } from "lucide-react";
import { formatPhone, phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

type VenueActionCardsProps = { kind: "menu" | "events" | "banquet" };

export function VenueActionCards({ kind }: VenueActionCardsProps) {
  const { language, tv } = useLanguage();
  const menu = kind === "menu";
  const banquet = kind === "banquet";
  const label = language === "en"
    ? banquet ? "Discuss a banquet by phone" : menu ? "Open venue menu" : "Events on Instagram"
    : banquet ? "Обговорити банкет телефоном" : menu ? "Відкрити меню закладу" : "Афіша в Instagram";
  const Icon = banquet ? Phone : menu ? Utensils : Instagram;

  return (
    <div className="stagger-reveal grid gap-3 sm:grid-cols-2">
      {siteConfig.locations.map((location) => {
        const href = banquet ? phoneHref(location.phone) : menu ? location.menuLink : location.instagram;
        if (!href) return null;
        return (
          <a
            key={location.id}
            href={href}
            target={banquet ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={`${tv(location.name)} — ${label}`}
            className="venue-action-card group flex min-w-0 gap-4 rounded-xl border border-white/15 bg-white/[.025] p-5 transition-colors duration-200 hover:border-seven-green/60 hover:bg-seven-green/5 sm:p-6"
            onClick={() => trackEvent(banquet ? "phone_click" : menu ? "menu_open" : "instagram_click", { location_id: location.id, link_url: href, ...(banquet ? { phone: location.phone } : {}) })}
          >
            <Icon size={21} className="mt-1 shrink-0 text-seven-green" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[.18em] text-seven-muted">{tv(location.city)}</p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">{tv(location.name).replace("Seven Restopub ", "")}</h2>
              <p className="mt-2 text-xs leading-5 text-seven-muted">{tv(location.address)}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-seven-green">{banquet ? formatPhone(location.phone) : label}<ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
