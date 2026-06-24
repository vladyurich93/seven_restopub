import Link from "next/link";
import Image from "next/image";
import { phoneHref } from "@/data/phone";
import { siteConfig } from "@/data/siteConfig";
import { InstagramPicker } from "./InstagramPicker";

export function Footer() {
  return (
    <footer className="wood-grain border-t border-white/10 bg-black py-12">
      <div className="container-shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={220} height={106} className="h-auto w-48" />
          <p className="mt-5 font-display text-2xl font-black uppercase tracking-[0.18em]">{siteConfig.brandName}</p>
          <p className="mt-4 max-w-sm text-seven-muted">{siteConfig.slogan}</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">Локації</p>
          <div className="space-y-2 text-seven-muted">
            {siteConfig.locations.map((location) => (
              <p key={location.id}>{location.address}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-seven-accent">Зв'язок</p>
          <div className="space-y-2 text-seven-muted">
            {siteConfig.phones.map((phone) => (
              <a key={phone} href={phoneHref(phone)} className="block transition hover:text-white">
                {phone}
              </a>
            ))}
            <InstagramPicker className="block text-seven-muted hover:text-white [&>svg]:hidden" />
            <Link href={siteConfig.tiktok} className="block transition hover:text-white" target="_blank">
              TikTok
            </Link>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-white/10 pt-6 text-sm text-seven-muted">
        © {new Date().getFullYear()} {siteConfig.brandName}. Всі права захищені.
      </div>
    </footer>
  );
}
