import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AtmosphereCarousel } from "@/components/AtmosphereCarousel";
import { Button } from "@/components/Button";
import { ContactSection } from "@/components/ContactSection";
import { EventCard } from "@/components/EventCard";
import { Hero } from "@/components/Hero";
import { HRSection } from "@/components/HRSection";
import { ImageFrame } from "@/components/ImageFrame";
import { LocationCard } from "@/components/LocationCard";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  const upcomingLocation = siteConfig.upcomingLocation;
  const snookball = siteConfig.snookball;

  return (
    <>
      <Hero />

      <section className="bg-black py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Locations" title="Три Seven — три настрої" description="Тераса, центр Львова або перший Seven у Запоріжжі — оберіть простір під свій вечір." />
            <Link href="/locations" className="inline-flex items-center gap-2 font-semibold text-seven-accent transition hover:text-white">
              Всі локації <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid items-stretch gap-7 md:grid-cols-1 min-[900px]:grid-cols-2 min-[1281px]:grid-cols-3">
            {siteConfig.locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-seven-background py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell">
          <div className="relative overflow-hidden rounded-[8px] bg-black premium-border">
            <ImageFrame src={upcomingLocation.image} alt={upcomingLocation.title} className="absolute inset-0 h-full w-full" sizes="100vw" />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(183,225,77,0.24),transparent_30%),radial-gradient(circle_at_86%_78%,rgba(201,113,74,0.32),transparent_34%)]" />
            <div className="relative z-10 grid gap-10 p-6 md:p-10 min-[1201px]:grid-cols-[1.05fr_0.95fr] min-[1201px]:p-16">
              <div>
                <p className="mb-6 inline-flex rounded-full bg-seven-green/15 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-seven-green premium-border">
                  {upcomingLocation.badge}
                </p>
                <h2 className="max-w-3xl font-display text-[clamp(3rem,12vw,5.2rem)] font-black leading-[0.9] text-white md:leading-[0.86]">
                  Готуємо найбільший Seven у Львові
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-seven-muted md:text-xl">
                  {upcomingLocation.text}
                </p>
                <div className="mt-8 inline-flex flex-col gap-1 rounded-[8px] bg-black/45 p-5 premium-border sm:min-w-80">
                  <span className="text-sm font-black uppercase tracking-[0.22em] text-seven-terracotta">{upcomingLocation.address}</span>
                  <span className="font-display text-5xl font-black text-seven-green md:text-6xl">{upcomingLocation.area}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {upcomingLocation.counters.map((counter) => (
                    <span key={counter} className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white premium-border">
                      {counter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div className="grid gap-3 sm:grid-cols-2">
                  {upcomingLocation.features.map((feature) => (
                    <article key={feature.title} className="rounded-[8px] bg-seven-card/85 p-5 premium-border premium-lift hover:shadow-glow">
                      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-seven-terracotta/20 text-2xl">{feature.icon}</span>
                      <h3 className="font-display text-3xl font-black leading-none text-white">{feature.title}</h3>
                    </article>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href={upcomingLocation.ctaLink} className="min-h-14 px-8 text-base">{upcomingLocation.ctaLabel}</Button>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-seven-green">{upcomingLocation.note}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="wood-grain bg-seven-background py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell grid gap-14 min-[1201px]:grid-cols-[1.05fr_0.95fr] min-[1201px]:items-center">
          <div className="group overflow-hidden rounded-[8px] premium-border">
            <ImageFrame src="/images/gallery/gallery-03.jpg" alt="Вечірня атмосфера Seven Restopub" className="aspect-[4/5] md:aspect-[16/11] min-[1201px]:aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <SectionTitle
              eyebrow="About Seven"
              title="Вечір, у який хочеться повернутися"
              description="Seven — це місце для вечорів, які не хочеться завершувати. Тут дивляться футбол, зустрічаються з друзями, пробують український крафт, вечеряють сім’ями, слухають живу музику і залишаються довше, ніж планували."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 min-[1201px]:grid-cols-4">
              {["4 локації", "Крафтове пиво", "Події щотижня", "Атмосфера restopub"].map((item) => (
                <div key={item} className="rounded-full bg-seven-green/12 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-seven-green premium-border">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-seven-background py-24 md:py-28">
        <AnimatedSection className="container-shell">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Menu" title="Що знайдеться у нас" description="Крафт, закуски, бургери, піца, коктейлі, кальян і ланчі — усе для вечора без зайвих планів." />
            <Link href="/menu" className="inline-flex items-center gap-2 font-semibold text-seven-accent transition hover:text-white">
              Меню <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 min-[1201px]:grid-cols-4">
            {siteConfig.menuCategories.map((category, index) => (
              <MenuCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-black py-24 md:py-28">
        <AnimatedSection className="container-shell">
          <SectionTitle eyebrow="Events" title="Живі вечори Seven" description="Футбол, музика, DJ, стендап і спеціальні події — коротко, гучно, по-Seven." />
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 min-[1281px]:grid-cols-5">
            {siteConfig.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-seven-background py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell">
          <div className="grid overflow-hidden rounded-[8px] bg-seven-card premium-border min-[1201px]:grid-cols-[1.05fr_0.95fr]">
            <div className="group relative min-h-[420px] overflow-hidden md:min-h-[520px] min-[1201px]:min-h-[560px]">
              <ImageFrame src={snookball.images[0]} alt={snookball.title} className="absolute inset-0 h-full w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-[8px] premium-border md:left-auto md:w-52">
                <ImageFrame src={snookball.images[1]} alt="Snookball на терасі Seven" className="aspect-[4/5]" sizes="220px" />
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10 min-[1201px]:p-12">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-seven-green/12 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-seven-green premium-border">
                  {snookball.badge}
                </span>
                <span className="rounded-full bg-seven-terracotta/20 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white premium-border">
                  {snookball.bookingBadge}
                </span>
              </div>
              <h2 className="mt-7 font-display text-5xl font-black leading-[0.92] text-white md:text-7xl">
                {snookball.title}
              </h2>
              <p className="mt-5 text-2xl font-semibold leading-8 text-seven-green">
                {snookball.subtitle}
              </p>
              <p className="mt-6 text-lg leading-8 text-seven-muted">
                {snookball.text}
              </p>
              <p className="mt-5 text-sm leading-6 text-seven-muted">
                {snookball.seoText}
              </p>
              <div className="mt-8">
                <Button href={phoneHref(snookball.phone)} className="min-h-14 px-8 text-base">
                  {snookball.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-seven-background py-24 md:py-28">
        <AnimatedSection className="container-shell">
          <SectionTitle eyebrow="Gallery" title="Атмосфера Seven" description="Футбол на екранах, крафтове пиво, друзі за великим столом, тераса, музика і вечори, які хочеться повторити." />
          <div className="mt-10">
            <AtmosphereCarousel images={siteConfig.galleryImages} />
          </div>
        </AnimatedSection>
      </section>

      <ContactSection />
      <HRSection />
    </>
  );
}
