"use client";

import { Instagram, MapPinned, Phone } from "lucide-react";
import { useState } from "react";
import type { BookingLocationId } from "@/data/bookingConfig";
import { phoneHref } from "@/data/phone";
import type { Location } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { Button } from "./Button";
import { BookingButton } from "./BookingModal";
import { ImageFrame } from "./ImageFrame";
import { PhoneBookingButton } from "./PhoneBookingButton";

type LocationCardProps = {
  location: Location;
};

const bookingLocationBySiteLocationId: Record<string, BookingLocationId> = {
  "lviv-vv": "vv",
  "lviv-rynok": "rynok",
  khimichna: "khimichna",
  zaporizhzhia: "zp",
};

export function LocationCard({ location }: LocationCardProps) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const { language, t, tv } = useLanguage();
  const bookingLocationId = bookingLocationBySiteLocationId[location.id];
  const visibleFeatures = location.features.slice(0, 3);
  const hiddenFeatures = location.features.slice(3);
  const hiddenFeaturesCount = hiddenFeatures.length;

  return (
    <article className="location-card group flex h-full min-h-[560px] min-w-0 flex-col overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_38%),#1b1b1b] shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow md:min-h-[660px] min-[900px]:min-h-[640px] min-[1201px]:min-h-[620px] min-[1281px]:min-h-0">
      <ImageFrame src={location.image} alt={location.name} className="aspect-[4/3] md:aspect-[5/4] min-[900px]:aspect-[16/11] min-[1201px]:aspect-[5/4] min-[1281px]:aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-6 md:p-6 min-[1201px]:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-seven-terracotta">{tv(location.city)}</p>
        <h3 className="mt-3 font-display text-3xl font-black leading-tight md:min-h-[76px] min-[900px]:text-[1.9rem] min-[1201px]:min-h-[84px] min-[1201px]:text-3xl min-[1281px]:min-h-[72px]">{tv(location.name)}</h3>
        <p className="mt-4 flex min-h-12 gap-3 text-sm leading-6 text-seven-muted">
          <MapPinned className="mt-1 shrink-0 text-seven-oak" size={20} />
          {tv(location.address)}
        </p>
        <a
          className="mt-5 flex items-center gap-3 font-display text-3xl font-black text-white transition hover:text-seven-cream min-[900px]:text-[1.85rem] min-[1201px]:text-3xl"
          href={phoneHref(location.phone)}
          onClick={() => trackEvent("phone_click", { location_id: location.id, phone: location.phone })}
        >
          <Phone className="shrink-0 text-seven-oak" size={24} />
          {location.phone}
        </a>
        <div
          className="relative mt-6 flex content-start gap-1.5 md:min-h-[74px] min-[1201px]:min-h-[62px]"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFeaturesOpen(false);
            }
          }}
          onMouseLeave={() => setFeaturesOpen(false)}
        >
          <div className="flex flex-wrap content-start gap-1.5">
            {visibleFeatures.map((feature) => (
              <span key={feature} className="rounded-full bg-seven-green/12 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-seven-green premium-border">
                {tv(feature)}
              </span>
            ))}
            {hiddenFeaturesCount > 0 ? (
              <button
                type="button"
                className="rounded-full bg-white/[0.055] px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-seven-cream transition hover:border-seven-green/45 hover:bg-seven-green/12 hover:text-seven-green focus:outline-none focus:ring-2 focus:ring-seven-green/45 premium-border"
                onClick={() => setFeaturesOpen((value) => !value)}
              onFocus={() => setFeaturesOpen(true)}
              onMouseEnter={() => setFeaturesOpen(true)}
                aria-expanded={featuresOpen}
                aria-label={`${language === "en" ? "Show more features" : "Показати більше переваг"}: ${tv(location.name)}`}
              >
                +{hiddenFeaturesCount} {language === "en" ? "more" : "ще"}
              </button>
            ) : null}
          </div>

          {featuresOpen && hiddenFeaturesCount > 0 ? (
            <div
              className="absolute left-0 top-[calc(100%+8px)] z-20 grid max-w-[min(280px,100%)] gap-1.5 rounded-[8px] bg-seven-card/98 p-3 shadow-[0_18px_48px_rgba(0,0,0,0.42)] premium-border"
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              {hiddenFeatures.map((feature) => (
                <span key={feature} className="rounded-full bg-seven-green/12 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-seven-green premium-border">
                  {tv(feature)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-seven-muted">{tv(location.workingHours)}</p>
        <div className="mt-auto grid gap-3 pt-7">
          {bookingLocationId ? (
            <BookingButton
              locationId={bookingLocationId}
              label={t.common.bookTable}
              className="min-h-14 w-full text-base shadow-[0_18px_48px_rgba(201,113,74,0.26)]"
            />
          ) : null}
          <PhoneBookingButton location={location} label={t.locationCard.call} className="min-h-14 text-base" />
          {location.menuLink ? (
            <Button href={location.menuLink} variant="secondary" className="min-h-14 text-base">{t.locationCard.menu}</Button>
          ) : null}
          {location.googleMaps ? (
            <Button href={location.googleMaps} variant="ghost" className="min-h-14 text-base">{t.locationCard.route}</Button>
          ) : null}
          <a
            href={location.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/[0.035] px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-seven-muted transition hover:border-seven-terracotta/45 hover:bg-white/[0.075] hover:text-seven-cream focus:outline-none focus:ring-2 focus:ring-seven-green/45 premium-border"
            onClick={() => trackEvent("instagram_click", { location_id: location.id, link_url: location.instagram })}
          >
            <Instagram size={16} />
            {t.common.instagram}
          </a>
        </div>
      </div>
    </article>
  );
}
