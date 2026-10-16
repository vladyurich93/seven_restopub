"use client";

import { useState } from "react";
import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import type { BookingLocationId } from "@/data/bookingConfig";
import { siteConfig } from "@/data/siteConfig";
import { formatPhone, phoneHref } from "@/data/phone";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { BookingButton } from "./BookingModal";
import { ImageFrame } from "./ImageFrame";

const bookingIds: Record<string, BookingLocationId> = {
  "lviv-vv": "vv", "lviv-rynok": "rynok", khimichna: "khimichna", zaporizhzhia: "zp",
};

export function HomeLocations({ headingLevel: Heading = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [selected, setSelected] = useState(0);
  const { t, tv, language } = useLanguage();
  const location = siteConfig.locations[selected];

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label={t.common.chooseVenue}>
        {siteConfig.locations.map((venue, index) => (
          <button
            key={venue.id}
            type="button"
            aria-pressed={selected === index}
            aria-controls="home-venue-details"
            onClick={() => setSelected(index)}
            className={`min-h-16 rounded-lg border px-3 py-3 text-left transition-colors duration-200 ${selected === index ? "border-seven-green bg-seven-green/10 text-seven-green" : "border-white/15 text-seven-muted hover:border-white/40 hover:text-white"}`}
          >
            <span className="block text-[10px] uppercase tracking-wider">{tv(venue.city)}</span>
            <span className="mt-1 block text-sm font-semibold leading-5">{tv(venue.name).replace("Seven Restopub ", "")}</span>
          </button>
        ))}
      </div>
      <article id="home-venue-details" className="grid overflow-hidden rounded-xl border border-white/10 bg-white/[.025] md:grid-cols-2" aria-label={tv(location.name)}>
        <ImageFrame key={location.image} src={location.image} alt={tv(location.name)} className="aspect-[2/1] md:aspect-auto md:min-h-[360px]" sizes="(min-width:768px) 45vw, 92vw" />
        <div className="p-5 md:p-8">
          <p className="text-xs uppercase tracking-widest text-seven-green">{tv(location.city)}</p>
          <Heading className="mt-2 font-display text-3xl leading-tight md:text-4xl">{tv(location.name).replace("Seven Restopub ", "")}</Heading>
          <p className="mt-2 text-sm leading-6 text-seven-muted">{tv(location.address)}</p>
          <p className="mt-3 text-sm leading-6 text-seven-cream">{location.features.map(tv).join(" · ")}</p>
          <p className="mt-3 text-xs text-seven-muted">{tv(location.workingHours)}</p>
          <a href={phoneHref(location.phone)} className="mt-3 inline-flex items-center gap-2 whitespace-nowrap font-semibold hover:text-seven-green" onClick={() => trackEvent("phone_click", { location_id: location.id, phone: location.phone })}><Phone size={16} />{formatPhone(location.phone)}</a>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <BookingButton locationId={bookingIds[location.id]} label={t.common.book} className="!px-5 !text-xs" />
            <a href={location.menuLink} target="_blank" rel="noreferrer" className="seven-text-link" onClick={() => trackEvent("menu_open", { location_id: location.id, link_url: location.menuLink ?? "" })}>{t.common.menu}<ArrowUpRight size={16} /></a>
            <a href={location.googleMaps} target="_blank" rel="noreferrer" className="seven-text-link" aria-label={`${t.common.route}: ${tv(location.name)}`}><MapPin size={16} />{t.common.route}</a>
            <a href={location.instagram} target="_blank" rel="noreferrer" className="seven-text-link" aria-label={`Instagram: ${tv(location.name)}`} onClick={() => trackEvent("instagram_click", { location_id: location.id, link_url: location.instagram })}><Instagram size={16} />Instagram</a>
          </div>
          <p className="sr-only" aria-live="polite">{language === "en" ? "Selected venue:" : "Обраний заклад:"} {tv(location.name)}</p>
        </div>
      </article>
    </div>
  );
}
