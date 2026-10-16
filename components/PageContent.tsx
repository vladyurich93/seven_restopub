"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ImageFrame } from "@/components/ImageFrame";
import { HomeLocations } from "@/components/HomeLocations";
import { VenueActionCards } from "@/components/VenueActionCards";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";

export function LocationsPageContent() {
  const { t, tv, language } = useLanguage();
  const en = language === "en";
  const guides = [
    { feature: "Дитяча кімната", title: en ? "With children" : "З дітьми" },
    { feature: "Велика тераса", title: en ? "On the terrace" : "На терасу" },
    { feature: "Банкетна зала", title: en ? "A banquet hall" : "Банкетна зала" },
  ];

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.locationsEyebrow} title={en ? "Find your Seven." : "Знайди свій Seven."} description={en ? "Four venues in Lviv and Zaporizhzhia. Choose a place to see its features, hours, menu and directions." : "Чотири заклади у Львові та Запоріжжі. Оберіть локацію, щоб переглянути її особливості, графік, меню та маршрут."} />
        <div className="mt-8 md:mt-10"><HomeLocations headingLevel="h2" /></div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "A place for your plans" : "Заклад під ваші плани"}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <div key={guide.feature} className="border-l border-seven-green/50 pl-4">
                <h3 className="font-semibold text-seven-green">{guide.title}</h3>
                <p className="mt-2 text-sm leading-7 text-seven-muted">{siteConfig.locations.filter((location) => (location.features as readonly string[]).includes(guide.feature)).map((location) => tv(location.name).replace("Seven Restopub ", "")).join(" · ")}</p>
              </div>
            ))}
          </div>
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
  const { t, tv, language } = useLanguage();
  const en = language === "en";
  const rules = siteConfig.banquetRules;
  const steps = en ? [
    ["Choose a venue", "Tell the administrator your preferred date and number of guests."],
    ["Agree the details", "Discuss the menu, seating, deposit, service fee and any drinks you plan to bring."],
    ["Confirm the arrangements", "Confirm availability and the agreed terms directly with the venue."],
  ] : [
    ["Оберіть заклад", "Повідомте адміністратору бажану дату та кількість гостей."],
    ["Узгодьте деталі", "Обговоріть меню, розміщення гостей, депозит, сервісний збір і напої, які плануєте принести."],
    ["Підтвердьте домовленості", "Погодьте наявність місць та остаточні умови безпосередньо із закладом."],
  ];

  return (
    <section className="seven-inner-page bg-seven-background">
      <AnimatedSection className="container-shell">
        <SectionTitle as="h1" eyebrow={t.pages.banquetsEyebrow} title={tv(rules.title)} description={t.pages.banquetsDescription} />
        <div className="stagger-reveal mt-8 grid gap-4 md:mt-10 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-5 md:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-seven-muted">{t.banquets.deposit}</h2>
            <p className="mt-4 font-display text-3xl leading-tight text-seven-green">{tv(rules.deposit)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-5 md:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-seven-muted">{t.banquets.serviceFee}</h2>
            <p className="mt-4 font-display text-3xl leading-tight text-seven-green">{rules.serviceFee}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.025] p-5 md:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-seven-muted">{t.banquets.corkFee}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-white">{rules.corkFee.map((item) => <li key={item}>{tv(item)}</li>)}</ul>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-6 text-seven-muted">{en ? "Ask the administrator which drinks fall under categories A and B and how the deposit and fees apply to your celebration." : "Уточніть в адміністратора, які напої належать до категорій А та Б і як депозит та збори застосовуються до вашого святкування."}</p>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[.65fr_1fr] md:gap-14">
          <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "Three steps to your celebration" : "Три кроки до святкування"}</h2>
          <ol className="space-y-6">{steps.map(([title, description], index) => <li key={title} className="flex gap-4"><span className="pt-1 text-xs text-seven-green">0{index + 1}</span><div><h3 className="font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-seven-muted">{description}</p></div></li>)}</ol>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "Discuss your celebration" : "Обговоріть ваше свято"}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-seven-muted">{en ? "Choose a venue below to call its team directly. Banquet arrangements are agreed with the administrator." : "Оберіть заклад нижче, щоб зателефонувати його команді. Умови банкету погоджуються з адміністратором."}</p>
          <div className="mt-6"><VenueActionCards kind="banquet" /></div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function AboutPageContent() {
  const { t, tv, language } = useLanguage();
  const about = siteConfig.about;
  const en = language === "en";
  const dates = ["2024-04-16", "2025-03-29", "2026-02-21", "2026-08-14"];

  return (
    <section className="seven-inner-page bg-seven-background">
      <div className="container-shell">
        <AnimatedSection className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center lg:gap-14">
          <div>
            <SectionTitle as="h1" eyebrow={t.pages.aboutEyebrow} title={t.pages.aboutTitle} description={t.pages.aboutDescription} />
            <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-5">
              {[["4", en ? "venues" : "заклади"], ["2", en ? "cities" : "міста"], ["2024", en ? "our first opening" : "перше відкриття"]].map(([value, label]) => <div key={label}><dt className="text-xs text-seven-muted">{label}</dt><dd className="mt-1 font-display text-4xl text-seven-green">{value}</dd></div>)}
            </dl>
          </div>
          <ImageFrame src="/images/locations/khimichna/professional/khimichna-hero.jpg" alt={en ? "Interior of Seven on Khimichna, Lviv" : "Інтер’єр Seven на Хімічній у Львові"} className="aspect-[16/10] rounded-xl lg:aspect-[4/3]" sizes="(min-width:1024px) 42vw, 92vw" />
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[.65fr_1fr] md:gap-14">
          <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "How Seven grew" : "Як зростав Seven"}</h2>
          <ol className="stagger-reveal space-y-7">
            {about.notes.map((note, index) => {
              const [date, ...description] = tv(note).split(" — ");
              return (
                <li key={note} className="relative border-l border-seven-green/40 pl-6 before:absolute before:-left-[4px] before:top-1.5 before:h-[7px] before:w-[7px] before:rounded-full before:bg-seven-green">
                  <time dateTime={dates[index]} className="text-xs font-semibold uppercase tracking-wider text-seven-green">{date}</time>
                  <p className="mt-3 text-base leading-7 text-seven-cream">{description.join(" — ")}</p>
                </li>
              );
            })}
          </ol>
        </AnimatedSection>

        <AnimatedSection className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-display text-3xl text-white md:text-4xl">{en ? "What brings us together" : "Що нас об’єднує"}</h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-seven-muted">{about.expandedWith.map((item) => <li key={item}>{tv(item)}</li>)}</ul>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/locations" className="seven-primary inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold">{t.common.chooseVenue}<ArrowUpRight size={16} /></Link>
            <Link href="/menu" className="seven-text-link">{t.common.menu}<ArrowUpRight size={16} /></Link>
          </div>
        </AnimatedSection>
      </div>
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
