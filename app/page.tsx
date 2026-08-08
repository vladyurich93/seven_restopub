"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AtmosphereCarousel } from "@/components/AtmosphereCarousel";
import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { Hero } from "@/components/Hero";
import { HRSection } from "@/components/HRSection";
import { ImageFrame } from "@/components/ImageFrame";
import { LocationCard } from "@/components/LocationCard";
import { MenuCategoryCard } from "@/components/MenuCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const snookball = siteConfig.snookball;
  const { t, tv } = useLanguage();

  return (
    <>
      <Hero />

      <section className="bg-black py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow={t.home.locationsEyebrow} title={t.home.locationsTitle} description={t.home.locationsDescription} />
            <Link href="/locations" className="inline-flex items-center gap-2 font-semibold text-seven-accent transition hover:text-white">
              {t.common.allLocations} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="stagger-reveal grid items-stretch gap-7 md:grid-cols-2">
            {siteConfig.locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <HRSection />

      <section className="wood-grain bg-seven-background py-24 md:py-28 min-[1281px]:py-32">
        <AnimatedSection className="container-shell grid gap-14 min-[1201px]:grid-cols-[1.05fr_0.95fr] min-[1201px]:items-center">
          <div className="group overflow-hidden rounded-[8px] premium-border">
            <ImageFrame src="/images/gallery/gallery-03.jpg" alt="Вечірня атмосфера Seven Restopub" className="aspect-[4/5] md:aspect-[16/11] min-[1201px]:aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <SectionTitle
              eyebrow={t.home.aboutEyebrow}
              title={t.home.aboutTitle}
              description={t.home.aboutDescription}
            />
            <div className="stagger-reveal mt-8 grid gap-3 sm:grid-cols-2 min-[1201px]:grid-cols-4">
              {t.home.aboutFacts.map((item) => (
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
            <SectionTitle eyebrow={t.home.menuEyebrow} title={t.home.menuTitle} description={t.home.menuDescription} />
            <Link href="/menu" className="inline-flex items-center gap-2 font-semibold text-seven-accent transition hover:text-white">
              {t.common.menu} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="stagger-reveal grid gap-6 md:grid-cols-2 min-[1201px]:grid-cols-4">
            {siteConfig.menuCategories.map((category, index) => (
              <MenuCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-black py-24 md:py-28">
        <AnimatedSection className="container-shell">
          <SectionTitle eyebrow={t.home.eventsEyebrow} title={t.home.eventsTitle} description={t.home.eventsDescription} />
          <div className="stagger-reveal mt-12 grid items-stretch gap-6 md:grid-cols-2 min-[1281px]:grid-cols-5">
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
                  {tv(snookball.badge)}
                </span>
                <span className="rounded-full bg-seven-terracotta/20 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white premium-border">
                  {tv(snookball.bookingBadge)}
                </span>
              </div>
              <h2 className="mt-7 font-display text-5xl font-black leading-[0.92] text-white md:text-7xl">
                {tv(snookball.title)}
              </h2>
              <p className="mt-5 text-2xl font-semibold leading-8 text-seven-green">
                {tv(snookball.subtitle)}
              </p>
              <p className="mt-6 text-lg leading-8 text-seven-muted">
                {tv(snookball.text)}
              </p>
              <p className="mt-5 text-sm leading-6 text-seven-muted">
                {tv(snookball.seoText)}
              </p>
              <div className="mt-8">
                <Button href={phoneHref(snookball.phone)} className="min-h-14 px-8 text-base">
                  {tv(snookball.ctaLabel)}
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-seven-background py-24 md:py-28">
        <AnimatedSection className="container-shell">
          <SectionTitle eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} description={t.home.galleryDescription} />
          <div className="mt-10">
            <AtmosphereCarousel images={siteConfig.galleryImages} />
          </div>
        </AnimatedSection>
      </section>

    </>
  );
}
