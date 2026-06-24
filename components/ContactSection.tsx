import { Instagram, MapPinned, Phone } from "lucide-react";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "./Button";
import { PhoneBookingButton } from "./PhoneBookingButton";

export function ContactSection() {
  return (
    <section className="bg-black py-20">
      <div className="container-shell">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-seven-terracotta">Contacts</p>
          <h2 className="font-display text-4xl font-black leading-tight md:text-6xl">Оберіть свій Seven.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {siteConfig.locations.map((location) => (
            <article key={location.id} className="flex h-full flex-col rounded-[8px] bg-seven-card p-6 premium-border">
              <h3 className="font-display text-2xl font-black">{location.name}</h3>
              <div className="mt-5 space-y-3 text-seven-muted">
                <p className="flex gap-3"><MapPinned className="mt-1 shrink-0 text-seven-oak" size={18} />{location.address}</p>
                <a className="flex gap-3 transition hover:text-white" href={phoneHref(location.phone)}>
                  <Phone className="mt-1 shrink-0 text-seven-oak" size={18} />{location.phone}
                </a>
                <a className="flex gap-3 transition hover:text-white" href={location.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="mt-1 shrink-0 text-seven-oak" size={18} />Instagram
                </a>
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
          <Button href={siteConfig.instagram} variant="ghost">Instagram</Button>
          <Button href={siteConfig.tiktok} variant="ghost">TikTok</Button>
        </div>
      </div>
    </section>
  );
}
