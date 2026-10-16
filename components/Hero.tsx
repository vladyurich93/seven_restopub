"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { BookingButton } from "./BookingModal";

export function Hero() {
  const { language, t } = useLanguage();
  const en = language === "en";

  return (
    <section className="seven-hero relative isolate overflow-hidden bg-black">
      <div className="seven-hero-photo absolute inset-0 -z-20">
        <Image src="/images/hero/hero-02.jpg" alt={t.hero.terraceAlt} fill sizes="100vw" priority fetchPriority="high" quality={85} className="object-cover object-[60%_45%]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.85),rgba(0,0,0,.25)),linear-gradient(0deg,#080a07,transparent_60%)]" />
      <div className="container-shell relative flex min-h-[inherit] flex-col justify-end pb-12 pt-28 md:pb-16">
        <p className="seven-enter mb-5 text-[11px] font-semibold uppercase tracking-[.22em] text-seven-green md:text-sm">{en ? "Lviv · Zaporizhzhia / Four places to meet" : "Львів · Запоріжжя / Чотири місця для зустрічей"}</p>
        <h1 className="seven-enter seven-headline font-display font-black text-white">{en ? <>Your people.<br />Your Seven.</> : <>Свої люди.<br />Твій Seven.</>}</h1>
        <p className="seven-enter mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg md:leading-8">{en ? "Ukrainian craft, food to share and evenings together. Choose your place — we’ll take care of the table." : "Український крафт, їжа для компанії та вечори разом. Обирай свій заклад — подбаємо про твій стіл."}</p>
        <div className="seven-enter mt-8 flex flex-wrap items-center gap-5">
          <BookingButton label={t.common.bookTable} className="seven-primary min-h-14" />
          <Link href="/menu" className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-white transition hover:text-seven-green">{en ? "Explore the menu" : "Переглянути меню"}<ArrowUpRight size={18} /></Link>
        </div>
        <a href="#venues" className="seven-enter mt-8 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[.18em] text-white/65 md:mt-12"><ArrowDown size={16} />{en ? "Find your Seven" : "Знайди свій Seven"}</a>
      </div>
    </section>
  );
}
