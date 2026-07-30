"use client";

import { ArrowRight, BriefcaseBusiness, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { careerPositionOptions, useCareersModal } from "./CareersModal";
import { ImageFrame } from "./ImageFrame";

export function HRSection() {
  const { openCareersModal } = useCareersModal();
  const { language, t, tv } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          trackEvent("homepage_hr_section_view", { source: "homepage_hr_section", language });
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [language]);

  const scrollToVacancies = () => {
    trackEvent("homepage_hr_vacancies_click", { source: "homepage_hr_section", language });
    document.getElementById("careers-vacancies")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openApplication = () => {
    trackEvent("homepage_hr_apply_click", { source: "homepage_hr_section", language });
    openCareersModal("homepage_hr_section");
  };

  return (
    <section ref={sectionRef} id="careers" className="scroll-mt-28 bg-black py-20 md:py-24" aria-labelledby="careers-title">
      <div className="container-shell">
        <div className="grid overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,rgba(201,113,74,0.16),rgba(183,225,77,0.07),rgba(255,255,255,0.025)),#1b1b1b] shadow-[0_26px_80px_rgba(0,0,0,0.36)] premium-border min-[1024px]:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center p-6 md:p-9 min-[1201px]:p-12">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-seven-green/12 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-seven-green premium-border">
              <BriefcaseBusiness size={15} />
              {t.hr.eyebrow}
            </p>
            <h2 id="careers-title" className="max-w-2xl font-display text-[clamp(3rem,8vw,5.35rem)] font-black leading-[0.92] text-white">
              {t.hr.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-seven-muted md:text-lg md:leading-8">
              {t.hr.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#careers-vacancies"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-seven-terracotta px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-button)] premium-lift button-press hover:bg-seven-cream hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToVacancies();
                }}
              >
                {t.hr.vacanciesButton}
                <ArrowRight size={17} />
              </a>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white premium-border premium-lift button-press hover:bg-seven-green hover:text-seven-background focus:outline-none focus:ring-2 focus:ring-seven-green/50"
                onClick={openApplication}
              >
                <Send size={17} />
                {t.hr.applyButton}
              </button>
            </div>

            <div id="careers-vacancies" className="mt-8 scroll-mt-32" aria-label={t.hr.vacanciesLabel}>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-seven-terracotta">{t.hr.vacanciesLabel}</p>
              <div className="flex flex-wrap gap-2">
                {careerPositionOptions.map((position) => (
                  <button
                    key={position}
                    type="button"
                    className="rounded-full bg-seven-green/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-seven-green transition hover:border-seven-terracotta/50 hover:bg-seven-terracotta/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-seven-green/50 premium-border"
                    onClick={() => {
                      trackEvent("homepage_hr_apply_click", {
                        source: "homepage_hr_section",
                        position,
                        language,
                      });
                      openCareersModal("homepage_hr_section");
                    }}
                  >
                    {tv(position)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden md:min-h-[430px] min-[1024px]:min-h-full">
            <ImageFrame
              src="/images/gallery/gallery-29.jpg"
              alt={t.hr.imageAlt}
              className="absolute inset-0 h-full w-full"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] bg-black/45 p-4 premium-border md:bottom-7 md:left-7 md:right-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-seven-green">{t.hr.growthLabel}</p>
              <p className="mt-2 text-sm leading-6 text-seven-cream md:text-base">{t.hr.growthText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
