"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPhone, phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { AnimatedSection } from "./AnimatedSection";
import { InstagramPicker } from "./InstagramPicker";
import { TikTokIcon } from "./TikTokIcon";

export function Footer() {
  const { t, tv } = useLanguage();

  return (
    <footer className="wood-grain overflow-hidden border-t border-white/10 bg-black py-12 md:py-14">
      <AnimatedSection className="container-shell">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.8fr] lg:gap-14">
          <div className="space-y-5">
            <Image src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={220} height={106} className="seven-footer-logo" />
            <p className="max-w-sm text-sm leading-7 text-seven-muted md:text-base">{t.hero.title}</p>
          </div>

          <div className="md:pt-3">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-seven-green">{t.footer.locations}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {siteConfig.locations.map((location) => (
                <div key={location.id} className="border-t border-white/10 pt-4 text-sm leading-6">
                  <p className="text-seven-muted">{tv(location.address)}</p>
                  <a href={phoneHref(location.phone)} className="mt-2 inline-block whitespace-nowrap text-lg font-semibold text-white transition hover:text-seven-green" onClick={() => trackEvent("phone_click", { location_id: location.id, phone: location.phone })}>{formatPhone(location.phone)}</a>
                  <p className="mt-1 text-xs text-seven-muted">{tv(location.workingHours)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div className="pt-2">
                <InstagramPicker className="flex items-center gap-2 text-seven-muted hover:text-white [&>svg]:text-seven-oak" />
              </div>
              <Link
                href={siteConfig.tiktok}
                className="flex items-center gap-2 text-seven-muted transition duration-300 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <TikTokIcon className="shrink-0 text-seven-oak" />
                {t.common.tiktok}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-seven-muted">
          © {new Date().getFullYear()} {siteConfig.brandName}. {t.footer.rights}
        </div>
      </AnimatedSection>
    </footer>
  );
}
