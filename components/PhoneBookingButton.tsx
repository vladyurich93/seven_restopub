import { Phone } from "lucide-react";
import type { Location } from "@/data/siteConfig";
import { phoneHref } from "@/data/phone";

type PhoneBookingButtonProps = {
  location: Pick<Location, "phone" | "name">;
  label?: string;
  className?: string;
};

export function PhoneBookingButton({ location, label = "Подзвонити", className = "" }: PhoneBookingButtonProps) {
  return (
    <a
      href={phoneHref(location.phone)}
      aria-label={`${label}: ${location.name}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-seven-cream px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-seven-background shadow-[0_14px_36px_rgba(246,236,221,0.08)] premium-lift hover:bg-seven-terracotta hover:text-white active:translate-y-0 ${className}`}
    >
      <Phone size={18} />
      <span>{label}</span>
    </a>
  );
}
