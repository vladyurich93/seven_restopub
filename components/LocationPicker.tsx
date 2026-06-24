"use client";

import { MapPinned, Navigation, Phone, X } from "lucide-react";
import { useState } from "react";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";

type LocationPickerProps = {
  className?: string;
  label?: string;
};

export function LocationPicker({ className = "", label = "Обрати заклад" }: LocationPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-seven-cream hover:text-seven-background ${className}`}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="location-picker-title">
          <div className="w-full max-w-5xl overflow-hidden rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between border-b border-white/10 p-5 md:p-7">
              <h2 id="location-picker-title" className="font-display text-3xl font-black text-white md:text-5xl">Оберіть Seven</h2>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
              >
                <X size={22} />
              </button>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-3 md:p-7">
              {siteConfig.locations.map((location) => (
                <article key={location.id} className="rounded-[8px] bg-seven-card p-5 premium-border">
                  <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-seven-green">
                    <MapPinned size={17} />
                    Seven {location.name.replace("Seven Restopub ", "")}
                  </p>
                  <p className="min-h-12 text-sm leading-6 text-seven-muted">{location.address}</p>
                  <a className="mt-5 flex items-center gap-3 font-display text-3xl font-black text-white transition hover:text-seven-cream" href={phoneHref(location.phone)}>
                    <Phone size={24} className="text-seven-oak" />
                    {location.phone}
                  </a>
                  <div className="mt-6 grid gap-3">
                    <a
                      href={phoneHref(location.phone)}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-terracotta px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-seven-cream hover:text-seven-background"
                    >
                      <Phone size={17} />
                      Зателефонувати
                    </a>
                    <a
                      href={location.menuLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-cream px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-seven-background transition hover:bg-white"
                    >
                      Меню
                    </a>
                    <a
                      href={location.googleMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-border transition hover:bg-seven-green hover:text-seven-background"
                    >
                      <Navigation size={17} />
                      Побудувати маршрут
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
