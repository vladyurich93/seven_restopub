"use client";

import Link from "next/link";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";
import { InstagramPicker } from "./InstagramPicker";
import { TikTokIcon } from "./TikTokIcon";

export function Footer() {
  const { t, tv } = useLanguage();

  return (
    <footer className="wood-grain border-t border-white/10 bg-black py-12 md:py-14">
      <div className="container-shell grid gap-10 md:grid-cols-[1.15fr_1fr_1fr] lg:gap-14">
        <div className="space-y-5">
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={220} height={106} loading="eager" className="h-auto w-44 md:w-48" />
          <p className="max-w-sm text-sm leading-7 text-seven-muted md:text-base">{t.hero.title}</p>
        </div>

        <div className="md:pt-3">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">{t.footer.locations}</p>
          <div className="space-y-3 text-sm leading-6 text-seven-muted">
            {siteConfig.locations.map((location) => (
              <p key={location.id}>{tv(location.address)}</p>
            ))}
          </div>
        </div>

        <div className="md:pt-3">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">{t.footer.contact}</p>
          <div className="space-y-3 text-sm leading-6 text-seven-muted">
            {siteConfig.phones.map((phone) => (
              <a key={phone} href={phoneHref(phone)} className="block transition duration-300 hover:text-white">
                {phone}
              </a>
            ))}

            <div className="pt-2">
              <InstagramPicker className="flex items-center gap-2 text-seven-muted hover:text-white [&>svg]:text-seven-oak" />
            </div>
            <Link href={siteConfig.tiktok} className="flex items-center gap-2 text-seven-muted transition duration-300 hover:text-white" target="_blank" rel="noreferrer">
              <TikTokIcon className="shrink-0 text-seven-oak" />
              TikTok
            </Link>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-seven-muted">
        © {new Date().getFullYear()} {siteConfig.brandName}. {t.footer.rights}
      </div>
    </footer>
  );
}
