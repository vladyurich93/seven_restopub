"use client";

import { CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { ImageFrame } from "@/components/ImageFrame";
import { LocationCard } from "@/components/LocationCard";
import { LocationPickerButton } from "@/components/LocationPicker";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";

export function LocationsPageContent() {
  const { t } = useLanguage();

  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle eyebrow={t.pages.locationsEyebrow} title={t.pages.locationsTitle} description={t.pages.locationsDescription} />
        <div className="stagger-reveal mt-12 grid items-stretch gap-7 md:grid-cols-2 min-[1201px]:grid-cols-3">
          {siteConfig.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

export function MenuPageContent() {
  const { t, tv } = useLanguage();

  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle eyebrow={t.pages.menuEyebrow} title={t.pages.menuTitle} description={t.pages.menuDescription} />
        <div className="stagger-reveal mt-12 grid items-stretch gap-5 md:grid-cols-1 min-[900px]:grid-cols-2 min-[1281px]:grid-cols-3">
          {siteConfig.locations.filter((location) => location.menuLink).map((location) => (
            <article key={location.id} className="flex h-full min-h-[344px] min-w-0 flex-col rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] p-6 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow md:min-h-[262px] min-[900px]:min-h-[300px] min-[1281px]:min-h-0">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-seven-green">{tv(location.city)}</p>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none text-white min-[900px]:min-h-20">{tv(location.name).replace("Seven Restopub ", "Seven ")}</h2>
              <p className="mt-4 min-h-12 text-sm leading-6 text-seven-muted">{tv(location.address)}</p>
              <div className="mt-auto pt-6">
                <Button href={location.menuLink ?? "#"} className="min-h-14 w-full text-base">{t.common.openMenu}</Button>
              </div>
            </article>
          ))}
        </div>
        <div className="stagger-reveal mt-12 grid gap-7 md:grid-cols-2">
          {siteConfig.menuCategories.map((category, index) => (
            <MenuCategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

export function EventsPageContent() {
  const { t } = useLanguage();

  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle eyebrow={t.pages.eventsEyebrow} title={t.pages.eventsTitle} description={t.pages.eventsDescription} />
        <div className="stagger-reveal mt-12 grid items-stretch gap-7 md:grid-cols-2">
          {siteConfig.events.map((event, index) => (
            <div key={event.id} className={index === 0 ? "h-full md:col-span-2" : "h-full"}>
              <EventCard event={event} featured={index === 0} />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

export function BanquetsPageContent() {
  const { t, tv } = useLanguage();
  const rules = siteConfig.banquetRules;

  return (
    <section className="bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell grid gap-10 min-[1201px]:grid-cols-[0.9fr_1.1fr] min-[1201px]:items-start">
        <SectionTitle eyebrow={t.pages.banquetsEyebrow} title={tv(rules.title)} description={t.pages.banquetsDescription} />
        <div className="rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] p-7 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow md:p-10">
          <div className="stagger-reveal grid gap-5 sm:grid-cols-2">
            <div className="rounded-[8px] bg-black/35 p-6 premium-border premium-lift">
              <p className="text-sm uppercase tracking-[0.24em] text-seven-muted">{t.banquets.deposit}</p>
              <p className="mt-3 font-display text-4xl font-black text-seven-accent">{tv(rules.deposit)}</p>
            </div>
            <div className="rounded-[8px] bg-black/35 p-6 premium-border premium-lift">
              <p className="text-sm uppercase tracking-[0.24em] text-seven-muted">{t.banquets.serviceFee}</p>
              <p className="mt-3 font-display text-4xl font-black text-seven-accent">{rules.serviceFee}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">{t.banquets.corkFee}</p>
            <div className="space-y-3 text-lg text-white">
              {rules.corkFee.map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-seven-accent" />
                  {tv(item)}
                </p>
              ))}
            </div>
          </div>
          <LocationPickerButton label={t.banquets.discuss} className="mt-8 min-h-14 w-full text-base" />
        </div>
      </AnimatedSection>
    </section>
  );
}

export function AboutPageContent() {
  const { t, tv } = useLanguage();
  const about = siteConfig.about;
  const photos = ["/images/gallery/gallery-11.jpg", "/images/gallery/gallery-01.jpg", "/images/gallery/gallery-10.jpg"];

  return (
    <section className="wood-grain bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle eyebrow={t.pages.aboutEyebrow} title={t.pages.aboutTitle} description={t.pages.aboutDescription} />
        <div className="stagger-reveal mt-12 grid gap-7">
          {about.notes.map((text, index) => (
            <article key={text} className="grid overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0)_40%),#1b1b1b] shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border premium-lift hover:shadow-glow min-[1201px]:grid-cols-[0.9fr_1.1fr]">
              <ImageFrame src={photos[index]} alt={tv(text)} className="min-h-[320px]" />
              <div className="flex flex-col justify-end p-7 md:p-10">
                <p className="mb-8 font-display text-6xl font-black text-seven-terracotta">0{index + 1}</p>
                <p className="font-display text-4xl font-black leading-tight text-white md:text-5xl">{tv(text)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[8px] bg-black p-7 shadow-[0_18px_54px_rgba(0,0,0,0.22)] premium-border md:p-10">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-seven-terracotta">{t.pages.atmosphere}</p>
          <div className="stagger-reveal grid gap-3 sm:grid-cols-2 min-[1201px]:grid-cols-3">
            {about.expandedWith.map((item) => (
              <div key={item} className="rounded-full bg-seven-green/12 px-5 py-3 text-lg font-semibold text-seven-green premium-border">
                {tv(item)}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function ContactsPageContent() {
  const { t } = useLanguage();

  return (
    <section className="bg-seven-background pb-16 pt-32 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle eyebrow={t.pages.contactsEyebrow} title={t.pages.contactsTitle} description={t.pages.contactsDescription} />
      </AnimatedSection>
    </section>
  );
}
