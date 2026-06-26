"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteImageRepaint() {
  const pathname = usePathname();

  useEffect(() => {
    const repaint = () => {
      document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        const previousVisibility = image.style.visibility;

        image.style.visibility = "hidden";
        void image.offsetHeight;
        image.style.visibility = previousVisibility;
      });
    };

    const frame = window.requestAnimationFrame(repaint);
    const timeout = window.setTimeout(repaint, 160);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
