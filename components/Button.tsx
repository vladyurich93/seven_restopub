import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-seven-terracotta text-white shadow-[var(--shadow-button)] hover:bg-seven-cream hover:text-seven-background hover:shadow-[0_22px_58px_rgba(246,236,221,0.16)]",
  secondary: "bg-seven-cream text-seven-background premium-border shadow-[0_14px_38px_rgba(246,236,221,0.09)] hover:bg-white hover:shadow-[0_22px_54px_rgba(246,236,221,0.14)]",
  ghost: "bg-white/[0.04] text-white premium-border hover:border-seven-terracotta/45 hover:bg-white/[0.085] hover:text-seven-cream",
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em] premium-lift button-press focus:outline-none focus:ring-2 focus:ring-seven-green/45 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
