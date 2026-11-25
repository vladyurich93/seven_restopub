"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

export function DeliveryAnnouncement() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <a
      href={siteConfig.delivery.url}
      className="block bg-[#6B3372] text-white transition-colors hover:bg-[#592860] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D4F75E]"
      aria-label={en ? "LEVEN Delivery is live — order delivery" : "LEVEN Delivery вже працює — замовити доставку"}
      onClick={() => trackEvent("delivery_click", { source: "launch_strip", link_url: siteConfig.delivery.url })}
    >
      <span className="container-shell flex h-14 items-center gap-3 md:gap-4">
        <Image src={siteConfig.delivery.logo} alt="LEVEN Delivery" width={48} height={48} priority className="h-12 w-12 shrink-0 object-contain" />
        <span className="min-w-0 flex-1 text-sm leading-5 md:text-base">
          <span className="font-semibold">{en ? "LEVEN Delivery is live" : "Запустили LEVEN Delivery"}</span>
          <span className="ml-3 hidden text-white/85 lg:inline">{en ? "Your Seven favourites, delivered in Lviv." : "Усе, що любиш у Seven, — з доставкою у Львові."}</span>
        </span>
        <span className="shrink-0 rounded-md bg-[#D4F75E] px-3 py-2 text-sm font-bold text-[#1D2122] md:px-5">{en ? "Order" : "Замовити"}</span>
      </span>
    </a>
  );
}
