"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useCareersModal } from "./CareersModal";
import { LocationPickerButton } from "./LocationPicker";

type NavItem = {
  href?: string;
  label: string;
  action?: "careers";
};

const navItems: NavItem[] = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Локації" },
  { href: "/menu", label: "Меню" },
  { label: "Кар'єра", action: "careers" },
  { href: "/events", label: "Події" },
  { href: "/banquets", label: "Банкети" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCareersModal } = useCareersModal();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 border-b transition duration-700 ease-premium ${scrolled || open ? "is-scrolled border-white/10 bg-seven-background/94 shadow-[0_18px_58px_rgba(0,0,0,0.24)]" : "border-transparent bg-gradient-to-b from-black/55 to-transparent"}`}>
      <div className="container-shell flex h-20 items-center justify-between gap-4 md:h-[88px] lg:h-24 min-[1200px]:h-28">
        <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.brandName}>
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={260} height={124} loading="eager" className="h-auto w-36 md:w-44 lg:w-48 min-[1200px]:w-52 xl:w-60" />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 min-[1200px]:flex min-[1281px]:gap-5 xl:gap-6">
          {navItems.map((item) => {
            const active = item.href ? (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) : false;

            return item.action === "careers" ? (
              <button
                key={item.label}
                type="button"
                className="nav-link whitespace-nowrap text-[13px] font-semibold text-seven-muted transition min-[1281px]:text-sm"
                onClick={openCareersModal}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.href} href={item.href ?? "/"} aria-current={active ? "page" : undefined} className={`nav-link whitespace-nowrap text-[13px] font-semibold transition min-[1281px]:text-sm ${active ? "is-active text-seven-cream" : "text-seven-muted"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden min-[1200px]:block">
          <LocationPickerButton />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 min-[1200px]:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Відкрити меню"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`fixed inset-0 top-0 z-[70] bg-black/55 transition min-[1200px]:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <aside className={`fixed top-0 z-[80] flex h-dvh w-[min(380px,calc(100vw-28px))] flex-col bg-seven-background shadow-2xl shadow-black/60 premium-border transition-[right] duration-300 min-[1200px]:hidden ${open ? "right-0" : "-right-[410px]"}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <img src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={180} height={86} loading="eager" className="h-auto w-36" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setOpen(false)}
            aria-label="Закрити меню"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="grid gap-1 p-5">
          {navItems.map((item) => (
            item.action === "careers" ? (
              <button
                key={item.label}
                type="button"
                className="rounded-[8px] px-4 py-3 text-left font-display text-2xl font-black uppercase text-white transition hover:bg-seven-terracotta hover:text-white"
                onClick={() => {
                  setOpen(false);
                  openCareersModal();
                }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className="rounded-[8px] px-4 py-3 font-display text-2xl font-black uppercase text-white transition hover:bg-seven-terracotta hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 p-5">
          <LocationPickerButton className="w-full" onOpen={() => setOpen(false)} />
        </div>
      </aside>
    </header>
  );
}
