import { MapPinned, Phone } from "lucide-react";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "./Button";
import { InstagramPicker } from "./InstagramPicker";
import { PhoneBookingButton } from "./PhoneBookingButton";
import { TikTokIcon } from "./TikTokIcon";

export function ContactSection() {
  return (
    <section className="bg-black py-24 md:py-28">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-seven-terracotta">Contacts</p>
          <h2 className="font-display text-[clamp(2.65rem,8.5vw,4.85rem)] font-black leading-[0.9] text-white">Оберіть свій Seven.</h2>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-1 min-[900px]:grid-cols-2 min-[1281px]:grid-cols-3">
          {siteConfig.locations.map((location) => (
            <article key={location.id} className="flex h-full min-w-0 flex-col rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] p-6 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow">
              <h3 className="font-display text-2xl font-black">{location.name}</h3>
              <div className="mt-5 space-y-3 text-seven-muted">
                <p className="flex gap-3"><MapPinned className="mt-1 shrink-0 text-seven-oak" size={18} />{location.address}</p>
                <a className="flex gap-3 transition hover:text-white" href={phoneHref(location.phone)}>
                  <Phone className="mt-1 shrink-0 text-seven-oak" size={18} />{location.phone}
                </a>
                <InstagramPicker className="flex gap-3 text-seven-muted hover:text-white [&>svg]:mt-1" label="Instagram" />
              </div>
              <p className="mt-5 text-sm leading-6 text-seven-muted">{location.workingHours}</p>
              <div className="mt-auto grid gap-3 pt-6">
                <PhoneBookingButton location={location} label="Подзвонити" />
                <Button href={location.menuLink} variant="secondary">Меню</Button>
                <Button href={location.googleMaps} variant="ghost">Маршрут</Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <InstagramPicker className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-lift hover:bg-seven-green hover:text-seven-background [&>svg]:text-seven-oak" />
          <Button href={siteConfig.tiktok} variant="ghost" className="gap-2">
            <TikTokIcon className="shrink-0 text-seven-oak" />
            TikTok
          </Button>
        </div>
      </div>
    </section>
  );
}
