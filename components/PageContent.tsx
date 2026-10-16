"use client";

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
