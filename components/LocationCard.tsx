import { MapPinned, Phone } from "lucide-react";
import { phoneHref } from "@/data/phone";
import type { Location } from "@/data/siteConfig";
import { Button } from "./Button";
import { ImageFrame } from "./ImageFrame";
import { PhoneBookingButton } from "./PhoneBookingButton";

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="location-card group flex h-full min-h-[560px] min-w-0 flex-col overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_38%),#1b1b1b] shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow md:min-h-[660px] min-[900px]:min-h-[640px] min-[1201px]:min-h-[620px] min-[1281px]:min-h-0">
      <ImageFrame src={location.image} alt={location.name} className="aspect-[4/3] md:aspect-[5/4] min-[900px]:aspect-[16/11] min-[1201px]:aspect-[5/4] min-[1281px]:aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-6 md:p-6 min-[1201px]:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-seven-terracotta">{location.city}</p>
        <h3 className="mt-3 font-display text-3xl font-black leading-tight min-[900px]:text-[1.9rem] min-[1201px]:text-3xl">{location.name}</h3>
        <p className="mt-4 flex min-h-12 gap-3 text-sm leading-6 text-seven-muted">
          <MapPinned className="mt-1 shrink-0 text-seven-oak" size={20} />
          {location.address}
        </p>
        <a className="mt-5 flex items-center gap-3 font-display text-3xl font-black text-white transition hover:text-seven-cream min-[900px]:text-[1.85rem] min-[1201px]:text-3xl" href={phoneHref(location.phone)}>
          <Phone className="shrink-0 text-seven-oak" size={24} />
          {location.phone}
        </a>
        <div className="mt-6 flex min-h-[112px] flex-wrap content-start gap-2 min-[1201px]:min-h-[88px]">
          {location.features.map((feature) => (
            <span key={feature} className="rounded-full bg-seven-green/12 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-seven-green premium-border">
              {feature}
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-seven-muted">{location.workingHours}</p>
        <div className="mt-auto grid gap-3 pt-7">
          <PhoneBookingButton location={location} label="Подзвонити" className="min-h-14 text-base" />
          <Button href={location.menuLink} variant="secondary" className="min-h-14 text-base">Меню</Button>
          <Button href={location.googleMaps} variant="ghost" className="min-h-14 text-base">Маршрут</Button>
        </div>
      </div>
    </article>
  );
}
