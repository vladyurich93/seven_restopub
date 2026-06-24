import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-seven-terracotta text-white shadow-[0_14px_36px_rgba(201,113,74,0.22)] hover:bg-seven-cream hover:text-seven-background hover:shadow-[0_20px_46px_rgba(246,236,221,0.14)] active:translate-y-0",
  secondary: "bg-seven-cream text-seven-background premium-border shadow-[0_14px_36px_rgba(246,236,221,0.08)] hover:bg-white active:translate-y-0",
  ghost: "bg-white/[0.03] text-white premium-border hover:bg-white/10 active:translate-y-0",
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em] premium-lift ${variants[variant]} ${className}`;

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
