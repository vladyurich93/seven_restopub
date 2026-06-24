"use client";

import { MapPinned, Navigation, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";

type LocationPickerProps = {
  className?: string;
  label?: string;
};

export function LocationPicker({ className = "", label = "Обрати заклад" }: LocationPickerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

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
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-picker-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] max-h-[90dvh] w-full max-w-5xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-seven-background/95 p-4 backdrop-blur-xl md:p-7">
              <h2 id="location-picker-title" className="pr-4 font-display text-3xl font-black text-white md:text-5xl">Оберіть Seven</h2>
              <button
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white shadow-lg shadow-black/30 transition hover:bg-seven-cream hover:text-seven-background"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid gap-4 p-4 pb-6 md:grid-cols-3 md:p-7">
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
