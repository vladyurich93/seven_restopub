"use client";

import { Instagram, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

type InstagramPickerProps = {
  className?: string;
  label?: string;
};

export function InstagramPicker({ className = "", label = "Instagram" }: InstagramPickerProps) {
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
        className={`inline-flex items-center gap-2 text-left transition duration-500 hover:text-white ${className}`}
        onClick={() => setOpen(true)}
      >
        <Instagram size={18} className="shrink-0 text-seven-oak" />
        {label}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/78 p-3 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="instagram-picker-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] max-h-[90dvh] w-full max-w-xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-seven-background p-4 md:p-6">
              <h2 id="instagram-picker-title" className="pr-4 font-display text-3xl font-black text-white md:text-4xl">
                Оберіть Instagram локації
              </h2>
              <button
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white shadow-lg shadow-black/30 transition duration-500 hover:bg-seven-cream hover:text-seven-background"
                onClick={() => setOpen(false)}
                aria-label="Закрити"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid gap-3 p-4 pb-6 md:p-6">
              {siteConfig.locations.map((location) => (
                <a
                  key={location.id}
                  href={location.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[8px] bg-seven-card p-5 premium-border premium-lift hover:border-seven-terracotta/70 hover:shadow-glow"
                >
                  <span className="mb-3 inline-flex rounded-full bg-seven-green/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-seven-green">
                    Instagram
                  </span>
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-3xl font-black leading-none text-white">
                      Seven {location.name.replace("Seven Restopub ", "")}
                    </span>
                    <Instagram className="shrink-0 text-seven-terracotta transition group-hover:text-seven-green" size={24} />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-seven-muted">{location.address}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
