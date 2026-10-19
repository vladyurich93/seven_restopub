"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AtmosphereCarousel } from "@/components/AtmosphereCarousel";
import { Hero } from "@/components/Hero";
import { HomeLocations } from "@/components/HomeLocations";
import { BookingButton } from "@/components/BookingModal";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";

const gallery = [0, 5, 11, 16, 57, 68].map((index) => siteConfig.galleryImages[index]);

export default function HomePage() {
  const { language, t, tv } = useLanguage();
  const en = language === "en";
  const faq = en ? [
    ["How do I book a table?", "Choose a venue and submit a request with your date, time and number of guests. The administrator will confirm your booking."],
    ["Which Seven is good for families?", "Children’s rooms are listed at Volodymyra Velykoho, Rynok Square and Khimichna. Contact your chosen venue to discuss your visit."],
    ["Is the menu the same everywhere?", "Each venue has its own menu link. Choose your Seven to see the current dishes and prices."],
    ["Where can I check upcoming events?", "Contact the venue or check its Instagram for the latest programme and availability."],
  ] : [
    ["Як забронювати стіл?", "Оберіть заклад і залиште заявку з датою, часом та кількістю гостей. Адміністратор підтвердить бронювання."],
    ["Який Seven обрати для візиту з дітьми?", "Дитячі кімнати є серед переваг закладів на Володимира Великого, площі Ринок і Хімічній. Деталі візиту уточнюйте у вибраному закладі."],
    ["У всіх закладах однакове меню?", "Кожен заклад має окреме посилання на меню. Оберіть свій Seven, щоб переглянути актуальні страви та ціни."],
    ["Де дізнатися про найближчі події?", "Актуальну програму та наявність місць уточнюйте у закладі або в його Instagram."],
  ];

  return (
    <>
      <Hero />
      <section id="venues" className="seven-section scroll-mt-24 bg-black">
        <AnimatedSection className="container-shell">
          <div className="seven-section-heading">
            <SectionTitle eyebrow={t.home.locationsEyebrow} title={t.home.locationsTitle} description={en ? "A family dinner, a table in the city centre or an evening on the terrace. Choose what feels like you." : "Сімейна вечеря, зустріч у центрі чи вечір на терасі. Обирайте те, що ближче вам."} />
            <Link href="/locations" className="seven-text-link">{t.common.allLocations}<ArrowUpRight size={18} /></Link>
          </div>
          <HomeLocations />
        </AnimatedSection>
      </section>

      <section aria-labelledby="kids-rooms-title" className="seven-section border-y border-white/10 bg-seven-background">
        <AnimatedSection className="container-shell grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[4/5] md:max-h-[520px]">
              <Image src="/images/gallery/gallery-12.jpg" alt={en ? "Play area in the kids room at Seven on Volodymyra Velykoho" : "Ігровий простір дитячої кімнати Seven на Володимира Великого"} fill sizes="(min-width:1440px) 630px, (min-width:768px) 45vw, 92vw" quality={75} className="object-cover" />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-seven-muted">{en ? "Kids room at Seven on Volodymyra Velykoho" : "Дитяча кімната Seven на Володимира Великого"}</figcaption>
          </figure>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-seven-green">{en ? "For family visits" : "Для сімейних зустрічей"}</p>
            <h2 id="kids-rooms-title" className="font-display text-4xl leading-tight md:text-5xl">{en ? "Kids rooms at Seven." : "Дитячі кімнати у Seven."}</h2>
            <p className="mt-5 text-base leading-7 text-seven-muted">{en ? "Coming with children? Our Lviv venues on Volodymyra Velykoho, Rynok Square and Khimichna have kids rooms." : "Плануєте візит із дітьми? У наших львівських закладах на Володимира Великого, площі Ринок та Хімічній є дитячі кімнати."}</p>
            <p className="mt-4 text-sm leading-6 text-seven-muted">{en ? "Mention that you’re bringing children when booking. Ask your venue about the kids room’s visiting arrangements." : "Під час бронювання вкажіть, що будете з дітьми. Умови відвідування дитячої кімнати уточнюйте у вибраному закладі."}</p>
            <p className="mb-3 mt-7 text-sm font-semibold">{en ? "Book at your venue:" : "Забронювати у закладі:"}</p>
            <div className="flex flex-wrap gap-3">
              <BookingButton locationId="vv" label={en ? "Volodymyra Velykoho" : "Володимира Великого"} className="seven-primary !px-4 !py-3 !text-xs !tracking-normal" />
              <BookingButton locationId="rynok" label={en ? "Rynok Square" : "Площа Ринок"} className="seven-primary !px-4 !py-3 !text-xs !tracking-normal" />
              <BookingButton locationId="khimichna" label={en ? "Khimichna" : "Хімічна"} className="seven-primary !px-4 !py-3 !text-xs !tracking-normal" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="seven-section bg-seven-background">
        <AnimatedSection className="container-shell">
          <div className="seven-section-heading"><SectionTitle eyebrow={t.home.menuEyebrow} title={en ? "Made to share." : "Смакує разом."} description={en ? "Burgers, pizza, snacks and Ukrainian craft. Current dishes and prices are in your venue’s menu." : "Бургери, піца, закуски й український крафт. Актуальні страви та ціни — у меню вашого закладу."} /><Link href="/menu" className="seven-text-link">{en ? "Full menu" : "Усе меню"}<ArrowUpRight size={18} /></Link></div>
          <aside aria-labelledby="kitchen-update-title" className="relative isolate mb-8 overflow-hidden rounded-xl border border-white/15 bg-black">
            <Image src="/images/menu/menu-main-01.jpg" alt="" fill sizes="(min-width:1440px) 1320px, 94vw" quality={75} className="-z-20 object-cover object-[center_45%]" aria-hidden="true" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.55)),linear-gradient(0deg,rgba(0,0,0,.45),transparent)]" />
            <div className="grid min-h-[340px] content-end gap-6 p-6 md:min-h-[360px] md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:p-10">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-seven-green">{en ? "Coming very soon" : "Вже зовсім скоро"}</p>
              <h2 id="kitchen-update-title" className="max-w-2xl font-display text-3xl leading-tight text-white md:text-5xl">{en ? "A big kitchen menu update is on the way." : "Готуємо велике оновлення меню кухні."}</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/80">{en ? "We’ll share all the details soon. Stay tuned." : "Незабаром розповімо всі подробиці. Стежте за новинами."}</p>
            </div>
          </aside>
          <div className="stagger-reveal grid grid-cols-2 gap-4 lg:grid-cols-4">{siteConfig.menuCategories.slice(0, 4).map((category, index) => <MenuCategoryCard key={category.title} category={category} index={index} href="/menu" />)}</div>
        </AnimatedSection>
      </section>

      <section className="seven-section border-y border-white/10 bg-black">
        <AnimatedSection className="container-shell grid gap-12 md:grid-cols-2 md:gap-20">
          <div><SectionTitle eyebrow={t.home.eventsEyebrow} title={en ? "A reason to meet." : "Привід зустрітися."} description={en ? "Football, live music, DJ nights and stand-up. Ask your venue about the next event before planning your evening." : "Футбол, жива музика, DJ-вечори та стендап. Перед візитом уточніть найближчу подію у своєму закладі."} /><Link href="/events" className="seven-text-link mt-7">{en ? "Event formats" : "Формати подій"}<ArrowUpRight size={18} /></Link></div>
          <div className="divide-y divide-white/10">{siteConfig.events.slice(0, 4).map((event, index) => <div key={event.id} className="flex gap-5 py-5 first:pt-0"><span className="pt-2 text-xs text-seven-green">0{index + 1}</span><div><h3 className="font-display text-3xl">{tv(event.title)}</h3><p className="mt-2 text-sm leading-6 text-seven-muted">{tv(event.description)}</p></div></div>)}</div>
        </AnimatedSection>
      </section>

      <section className="seven-section bg-seven-background">
        <AnimatedSection className="container-shell grid gap-10 md:grid-cols-[.7fr_1fr] md:items-center">
          <p className="seven-statement font-display text-seven-green">{en ? <>Your occasion.<br />Our place.</> : <>Ваша нагода.<br />Наш простір.</>}</p>
          <div><SectionTitle eyebrow={en ? "Celebrations at Seven" : "Святкування у Seven"} title={en ? "Bring your people together." : "Зберіть своїх за одним столом."} description={en ? "A birthday, a team gathering or a family celebration. Choose a venue and discuss the number of guests, menu and arrangements with the administrator." : "День народження, зустріч команди чи сімейне свято. Оберіть заклад і погодьте з адміністратором кількість гостей, меню та умови."} /><Link href="/banquets" className="seven-text-link mt-7">{en ? "Banquet details" : "Умови банкетів"}<ArrowUpRight size={18} /></Link></div>
        </AnimatedSection>
      </section>

      <section className="seven-section bg-black"><AnimatedSection className="container-shell"><SectionTitle eyebrow={t.home.galleryEyebrow} title={en ? "Feel Seven." : "Відчуй Seven."} description={en ? "A few moments from our places." : "Кілька моментів із наших закладів."} /><div className="mt-9"><AtmosphereCarousel images={gallery} /></div></AnimatedSection></section>

      <section className="seven-section bg-seven-background"><AnimatedSection className="container-shell grid gap-10 md:grid-cols-[.7fr_1fr]"><SectionTitle eyebrow={en ? "Before your visit" : "Перед візитом"} title={en ? "Good to know." : "Варто знати."} /><div className="divide-y divide-white/15">{faq.map(([question, answer]) => <details key={question} className="seven-faq group py-5 first:pt-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold md:text-lg">{question}<span className="text-2xl font-normal text-seven-green transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-4 max-w-xl text-sm leading-7 text-seven-muted">{answer}</p></details>)}</div></AnimatedSection></section>
    </>
  );
}
