"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type AnimatedSectionProps = { children: ReactNode; className?: string };

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(node.children).flatMap((child) =>
      child.classList.contains("stagger-reveal") ? Array.from(child.children) : [child],
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-reveal", "visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });

    targets.forEach((target) => {
      // Never hide content already reached by a deep link or restored scroll position.
      target.setAttribute("data-reveal", target.getBoundingClientRect().top < window.innerHeight - 32 ? "visible" : "pending");
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach((target) => target.removeAttribute("data-reveal"));
    };
  }, []);

  return <div ref={sectionRef} className={`motion-group ${className}`}>{children}</div>;
}
