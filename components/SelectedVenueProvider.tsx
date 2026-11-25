"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { BookingLocationId } from "@/data/bookingConfig";

export const venueBookingIds = { "lviv-vv": "vv", "lviv-rynok": "rynok", khimichna: "khimichna", zaporizhzhia: "zp" } as const;
export type VenueId = keyof typeof venueBookingIds;
export function toBookingLocationId(id: string | null): BookingLocationId | undefined {
  return id && Object.hasOwn(venueBookingIds, id) ? venueBookingIds[id as VenueId] : undefined;
}
export function toSiteLocationId(id: BookingLocationId): VenueId {
  return (Object.keys(venueBookingIds) as VenueId[]).find((key) => venueBookingIds[key] === id)!;
}
const Context = createContext<{ selectedVenueId: VenueId | null; selectVenue: (id: string) => void }>({ selectedVenueId: null, selectVenue: () => undefined });
const storageKey = "seven-selected-venue";
export function SelectedVenueProvider({ children }: { children: ReactNode }) {
  const [selectedVenueId, setSelected] = useState<VenueId | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && Object.hasOwn(venueBookingIds, saved)) setSelected(saved as VenueId);
    } catch { /* A private browser still supports venue selection for this visit. */ }
  }, []);
  const selectVenue = (id: string) => {
    if (!Object.hasOwn(venueBookingIds, id)) return;
    setSelected(id as VenueId);
    try { localStorage.setItem(storageKey, id); } catch { /* Storage is optional. */ }
  };
  return <Context.Provider value={{ selectedVenueId, selectVenue }}>{children}</Context.Provider>;
}
export function useSelectedVenue() { return useContext(Context); }
