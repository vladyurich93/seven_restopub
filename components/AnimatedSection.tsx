"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type AnimatedSectionProps = { children: ReactNode; className?: string };

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || !("IntersectionObserver" in window) || motion.matches) return;

    // Observe cards inside nested grids, while leaving their large wrappers visible.
    const grids = Array.from(node.querySelectorAll(".stagger-reveal"))
      .filter((grid) => grid.closest(".motion-group") === node);
    const directTargets = Array.from(node.children)
      .filter((child) => !child.matches(".stagger-reveal") && !child.querySelector(".stagger-reveal"));
    const targets = [...new Set([...directTargets, ...grids.flatMap((grid) => Array.from(grid.children))])];
    const reveal = (target: Element, delay = 0) => {
      (target as HTMLElement).style.setProperty("--reveal-delay", `${delay}ms`);
      target.setAttribute("data-reveal", "visible");
    };
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach((entry, index) => {
          reveal(entry.target, Math.min(index, 3) * 70);
          observer.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    targets.forEach((target) => {
      // Deep links and restored scroll positions must never start with hidden content.
      if (target.getBoundingClientRect().top < window.innerHeight - 24) reveal(target);
      else {
        target.setAttribute("data-reveal", "pending");
        observer.observe(target);
      }
    });
    const onFocus = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest('[data-reveal="pending"]') : null;
      if (target) { reveal(target); observer.unobserve(target); }
    };
    const onMotionChange = () => {
      if (motion.matches) { targets.forEach((target) => reveal(target)); observer.disconnect(); }
    };
    node.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      node.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onMotionChange);
      targets.forEach((target) => {
        target.removeAttribute("data-reveal");
        (target as HTMLElement).style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return <div ref={sectionRef} className={`motion-group ${className}`}>{children}</div>;
}
