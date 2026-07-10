"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarCheck, MapPin } from "lucide-react";
import { type BookingLocationId } from "@/data/bookingConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { useBookingModal } from "./BookingModal";
import { useLocationPicker } from "./LocationPicker";

const bookingLocationIds = ["rynok", "vv", "zp"] as const;

function isBookingLocationId(value: string | null): value is BookingLocationId {
  return bookingLocationIds.includes(value as BookingLocationId);
}

function inferLocationId(pathname: string, searchLocation: string | null): BookingLocationId | undefined {
  if (isBookingLocationId(searchLocation)) {
    return searchLocation;
  }

  const path = pathname.toLowerCase();

  if (path.includes("rynok") || path.includes("square")) {
    return "rynok";
  }

  if (path.includes("vv") || path.includes("velykoho") || path.includes("volodymyra")) {
    return "vv";
  }

  if (path.includes("zp") || path.includes("zaporizhzhia") || path.includes("zaporizhzhya")) {
    return "zp";
  }

  return undefined;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  const { openPicker } = useLocationPicker();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  const locationId = useMemo(
    () => inferLocationId(pathname, searchLocation),
    [pathname, searchLocation],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchLocation(params.get("location") ?? params.get("venue"));
  }, [pathname]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < 8) {
        return;
      }

      setVisible(delta < 0 || currentScrollY < 80);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateModalState = () => {
      setModalOpen(document.body.dataset.sevenModalOpen === "true");
    };
    const observer = new MutationObserver(updateModalState);

    updateModalState();
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-seven-modal-open"] });

    return () => observer.disconnect();
  }, []);

  const handleLocations = () => {
    trackEvent("route_click", { source: "mobile_bottom_nav", action: "open_location_selector" });
    openPicker();
  };

  const handleReserve = () => {
    trackEvent("book_table", {
      source: "mobile_bottom_nav",
      location_id: locationId ?? "not_selected",
    });

    openBookingModal(locationId);
  };

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-[120] px-3 pt-3 md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible && !modalOpen ? "translate-y-0" : "translate-y-[calc(100%+12px)]"
      }`}
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
      aria-label="Mobile primary actions"
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-t-[24px] border border-white/10 border-b-0 bg-black/78 p-2 shadow-[0_-18px_60px_rgba(0,0,0,0.48)] backdrop-blur-xl">
        <button
          type="button"
          className="inline-flex h-[60px] w-[35%] items-center justify-center gap-1.5 rounded-[18px] bg-white/[0.07] px-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white transition duration-300 active:scale-[0.98]"
          onClick={handleLocations}
        >
          <MapPin size={17} className="text-seven-green" />
          <span>{t.nav.locations}</span>
        </button>
        <button
          type="button"
          className="inline-flex h-[60px] w-[65%] items-center justify-center gap-2 rounded-[18px] bg-seven-green px-4 text-center text-sm font-black uppercase tracking-[0.13em] text-seven-background shadow-[0_14px_34px_rgba(181,255,77,0.22)] transition duration-300 active:scale-[0.98]"
          onClick={handleReserve}
        >
          <CalendarCheck size={18} />
          <span>{t.common.reserveTable}</span>
        </button>
      </div>
    </nav>
  );
}
