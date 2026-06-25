"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition duration-500 ${scrolled || open ? "border-white/10 bg-seven-background/90 shadow-2xl shadow-black/30 backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-black/55 to-transparent"}`}>
      <div className="container-shell flex h-20 items-center justify-between gap-4 md:h-24 lg:h-28">
        <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.brandName}>
          <Image src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={260} height={124} className="h-auto w-36 md:w-48 lg:w-56 xl:w-60" priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-5">
          {navItems.map((item) => (
            item.action === "careers" ? (
              <button
                key={item.label}
                type="button"
                className="whitespace-nowrap text-xs font-semibold text-seven-muted transition hover:text-seven-cream xl:text-sm"
                onClick={openCareersModal}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.href} href={item.href ?? "/"} className="whitespace-nowrap text-xs font-semibold text-seven-muted transition hover:text-seven-cream xl:text-sm">
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden lg:block">
          <LocationPickerButton />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Відкрити меню"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`fixed inset-0 top-0 z-[70] bg-black/45 backdrop-blur-sm transition lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <aside className={`fixed right-0 top-0 z-[80] flex h-dvh w-[min(360px,calc(100vw-28px))] flex-col bg-seven-background shadow-2xl shadow-black/60 premium-border transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <Image src={siteConfig.logo} alt={`${siteConfig.brandName} logo`} width={180} height={86} className="h-auto w-36" priority />
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
