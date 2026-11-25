"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { getAnalyticsEventForHref, trackEvent } from "@/lib/analytics";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-seven-green text-seven-background hover:bg-seven-cream",
  secondary: "bg-seven-cream text-seven-background premium-border shadow-[0_14px_38px_rgba(246,236,221,0.09)] hover:bg-white hover:shadow-[0_22px_54px_rgba(246,236,221,0.14)]",
  ghost: "bg-white/[0.04] text-white premium-border hover:border-seven-terracotta/45 hover:bg-white/[0.085] hover:text-seven-cream",
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.02em] button-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seven-green ${variants[variant]} ${className}`;
  const analyticsEvent = getAnalyticsEventForHref(href);
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    if (analyticsEvent) {
      trackEvent(analyticsEvent, { link_url: href });
    }

    props.onClick?.(event);
  };

  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} {...props} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
