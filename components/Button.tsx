import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-seven-terracotta text-white hover:bg-seven-cream hover:text-seven-background",
  secondary: "bg-seven-cream text-seven-background hover:bg-white premium-border",
  ghost: "bg-transparent text-white hover:bg-white/10 premium-border",
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

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
