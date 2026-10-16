"use client";

import { CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ImageFrame } from "@/components/ImageFrame";
import { LocationCard } from "@/components/LocationCard";
import { LocationPickerButton } from "@/components/LocationPicker";
import { VenueActionCards } from "@/components/VenueActionCards";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";

export function LocationsPageContent() {
  const { t } = useLanguage();

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.locationsEyebrow} title={t.pages.locationsTitle} description={t.pages.locationsDescription} />
        <div className="stagger-reveal mt-12 grid items-stretch gap-7 md:grid-cols-2">
          {siteConfig.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

export function MenuPageContent() {
  const { t, tv, language } = useLanguage();
  const en = language === "en";

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.menuEyebrow} title={en ? "Choose your Seven.\nExplore the menu." : "Обери свій Seven.\nВідкрий меню."} description={en ? "Each venue has its own menu. Choose a location to see current dishes, drinks and prices on ChoiceQR." : "Кожен заклад має своє меню. Оберіть локацію, щоб переглянути актуальні страви, напої та ціни на ChoiceQR."} />
        <div className="mt-8 md:mt-10"><VenueActionCards kind="menu" /></div>
        <div className="mt-10 border-t border-white/10 pt-7">
          <h2 className="text-sm font-semibold text-seven-cream">{en ? "Explore our food and drinks" : "Що є в меню Seven"}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-seven-muted">
            {siteConfig.menuCategories.map((category) => <li key={category.title}>{tv(category.title)}</li>)}
          </ul>
          <p className="mt-4 max-w-xl text-xs leading-6 text-seven-muted">{en ? "Availability and prices may differ between venues. The links above open each venue’s menu in a new tab." : "Асортимент і ціни можуть відрізнятися між закладами. Посилання вище відкривають меню кожної локації в новій вкладці."}</p>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function EventsPageContent() {
  const { t, tv, language } = useLanguage();
  const en = language === "en";

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.eventsEyebrow} title={en ? "Plan your next evening." : "Плануй наступний вечір."} description={en ? "Find the latest announcements on your venue’s Instagram. Confirm the date, time and available tables with the venue before your visit." : "Свіжі анонси — в Instagram вашого закладу. Перед візитом уточніть дату, час і наявність столиків у вибраній локації."} />
        <div className="mt-8 md:mt-10"><VenueActionCards kind="events" /></div>
        <div className="mt-12 grid gap-7 border-t border-white/10 pt-8 md:grid-cols-[.65fr_1fr] md:gap-14">
          <div>
            <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "What happens at Seven" : "Що відбувається у Seven"}</h2>
            <p className="mt-3 text-sm leading-7 text-seven-muted">{en ? "These are event formats, rather than a dated programme. Check the announcements for your chosen venue." : "Це формати наших подій. Конкретні анонси та розклад дивіться на сторінці вибраного закладу."}</p>
          </div>
          <div className="divide-y divide-white/10">
            {siteConfig.events.map((event) => (
              <details key={event.id} className="seven-faq group py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl text-white">{tv(event.title)}<span className="text-2xl text-seven-green transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
                <p className="mt-3 text-sm leading-7 text-seven-muted">{tv(event.description)}</p>
              </details>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function BanquetsPageContent() {
  const { t, tv } = useLanguage();
  const rules = siteConfig.banquetRules;

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell grid gap-10 min-[1201px]:grid-cols-[0.9fr_1.1fr] min-[1201px]:items-start">
        <SectionTitle as="h1" eyebrow={t.pages.banquetsEyebrow} title={tv(rules.title)} description={t.pages.banquetsDescription} />
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
  const photos = [
    "/images/gallery/gallery-11.jpg",
    "/images/gallery/gallery-01.jpg",
    "/images/gallery/gallery-10.jpg",
    "/images/locations/khimichna/professional/khimichna-hero.jpg",
  ];

  return (
    <section className="wood-grain bg-seven-background pb-24 pt-32 md:pb-28 md:pt-40">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.aboutEyebrow} title={t.pages.aboutTitle} description={t.pages.aboutDescription} />
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
        <SectionTitle as="h1" eyebrow={t.pages.contactsEyebrow} title={t.pages.contactsTitle} description={t.pages.contactsDescription} />
      </AnimatedSection>
    </section>
  );
}
