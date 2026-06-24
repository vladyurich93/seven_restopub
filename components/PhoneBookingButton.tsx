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
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-seven-cream px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-seven-background transition duration-300 hover:-translate-y-0.5 hover:bg-seven-terracotta hover:text-white ${className}`}
    >
      <Phone size={18} />
      <span>{label}</span>
    </a>
  );
}
