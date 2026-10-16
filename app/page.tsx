"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AtmosphereCarousel } from "@/components/AtmosphereCarousel";
import { Hero } from "@/components/Hero";
import { HomeLocations } from "@/components/HomeLocations";
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

      <section className="seven-section bg-seven-background">
        <AnimatedSection className="container-shell">
          <div className="seven-section-heading"><SectionTitle eyebrow={t.home.menuEyebrow} title={en ? "Made to share." : "Смакує разом."} description={en ? "Burgers, pizza, snacks and Ukrainian craft. Current dishes and prices are in your venue’s menu." : "Бургери, піца, закуски й український крафт. Актуальні страви та ціни — у меню вашого закладу."} /><Link href="/menu" className="seven-text-link">{en ? "Full menu" : "Усе меню"}<ArrowUpRight size={18} /></Link></div>
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
