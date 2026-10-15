"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: "event", event: string, params?: Record<string, unknown>) => void;
  }
}

export const trackEvent = (event: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  if (["phone_click", "menu_open", "booking_success"].includes(event)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      seven_action: {
        location_id: params?.location_id || "not_selected",
        link_url: params?.link_url || "",
        source: params?.source || "website",
      },
    });
    return;
  }

  if (window.gtag) {
    window.gtag("event", event, params);
  }
};

export const getAnalyticsEventForHref = (href: string) => {
  if (href.startsWith("tel:")) {
    return "phone_click";
  }

  if (href.includes("instagram.com")) {
    return "instagram_click";
  }

  if (href.includes("t.me") || href.includes("telegram")) {
    return "telegram_click";
  }

  if (href.includes("choiceqr.com")) {
    return "menu_open";
  }

  if (href.includes("maps.google") || href.includes("google.com/maps")) {
    return "route_click";
  }

  return null;
};
