"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MapPinned, Navigation, Phone, X } from "lucide-react";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";

const LOCATION_PICKER_ROOT = "seven-location-picker-root";

type LocationPickerContextValue = {
  openPicker: () => void;
};

type LocationPickerProviderProps = {
  children: ReactNode;
};

type LocationPickerButtonProps = {
  className?: string;
  label?: string;
  onOpen?: () => void;
};

const LocationPickerContext = createContext<LocationPickerContextValue | null>(null);

export function LocationPickerProvider({ children }: LocationPickerProviderProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const removeStaleLocationPickerRoots = useCallback(() => {
    document.querySelectorAll(`[data-modal-root="${LOCATION_PICKER_ROOT}"]`).forEach((node) => {
      node.remove();
    });
  }, []);
  const openPicker = useCallback(() => {
    if (open) {
      return;
    }

    removeStaleLocationPickerRoots();
    if (process.env.NODE_ENV === "development") {
      console.log("[LocationPicker] modal open");
    }
    setOpen(true);
  }, [open, removeStaleLocationPickerRoots]);
  const closePicker = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[LocationPicker] modal close");
    }
    setOpen(false);
  }, []);
  const contextValue = useMemo(() => ({ openPicker }), [openPicker]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[LocationPickerProvider] mount");
    }
    setMounted(true);

    return () => {
      if (process.env.NODE_ENV === "development") {
        console.log("[LocationPickerProvider] unmount");
      }
      removeStaleLocationPickerRoots();
    };
  }, [removeStaleLocationPickerRoots]);

  useEffect(() => {
    if (!open) {
      removeStaleLocationPickerRoots();
    }
  }, [open, removeStaleLocationPickerRoots]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePicker();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [closePicker, open]);

  return (
    <LocationPickerContext.Provider value={contextValue}>
      {children}
      {mounted ? <LocationPicker open={open} onClose={closePicker} /> : null}
    </LocationPickerContext.Provider>
  );
}

function LocationPicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[LocationPicker] mount");
    }

    return () => {
      if (process.env.NODE_ENV === "development") {
        console.log("[LocationPicker] unmount");
      }
    };
  }, []);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      data-modal-root={LOCATION_PICKER_ROOT}
      className="fixed inset-0 z-[140] flex items-end justify-center bg-black/72 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-picker-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-h-[90dvh] w-full max-w-5xl touch-pan-y overflow-y-auto overscroll-contain rounded-[8px] bg-seven-background premium-border shadow-2xl shadow-black/70 [-webkit-overflow-scrolling:touch]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 border-b border-white/10 bg-seven-background/95 px-5 pb-5 pt-7 backdrop-blur-xl md:px-7 md:pb-6 md:pt-7">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-seven-green">Locations</p>
          <h2 id="location-picker-title" className="max-w-[calc(100%-68px)] font-display text-4xl font-black leading-none text-white md:max-w-none md:text-5xl">
            Оберіть Seven
          </h2>
          <button
            type="button"
            className="absolute right-4 top-6 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-seven-terracotta text-white shadow-lg shadow-black/30 transition duration-300 hover:bg-seven-cream hover:text-seven-background active:scale-95 md:right-7 md:top-7 md:h-12 md:w-12"
            onClick={onClose}
            aria-label="Закрити"
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid gap-4 p-4 pb-6 md:grid-cols-3 md:p-7">
          {siteConfig.locations.map((location) => (
            <article key={location.id} className="flex min-h-full flex-col rounded-[8px] bg-seven-card p-5 premium-border transition-colors duration-300 hover:border-seven-terracotta/50">
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-seven-green">
                <MapPinned size={17} />
                Seven {location.name.replace("Seven Restopub ", "")}
              </p>
              <p className="min-h-12 text-sm leading-6 text-seven-muted">{location.address}</p>
              <a className="mt-5 flex items-center gap-3 font-display text-3xl font-black text-white transition hover:text-seven-cream" href={phoneHref(location.phone)}>
                <Phone size={24} className="text-seven-oak" />
                {location.phone}
              </a>
              <div className="mt-auto grid gap-3 pt-6">
                <a
                  href={phoneHref(location.phone)}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-terracotta px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-seven-cream hover:text-seven-background"
                >
                  <Phone size={17} />
                  Зателефонувати
                </a>
                <a
                  href={location.menuLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-seven-cream px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-seven-background transition duration-300 hover:bg-white"
                >
                  Меню
                </a>
                <a
                  href={location.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-border transition duration-300 hover:bg-seven-green hover:text-seven-background"
                >
                  <Navigation size={17} />
                  Побудувати маршрут
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function LocationPickerButton({ className = "", label = "Обрати заклад", onOpen }: LocationPickerButtonProps) {
  const picker = useContext(LocationPickerContext);

  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_36px_rgba(201,113,74,0.22)] premium-lift hover:bg-seven-cream hover:text-seven-background active:translate-y-0 ${className}`}
      onClick={() => {
        onOpen?.();
        picker?.openPicker();
      }}
    >
      {label}
    </button>
  );
}
