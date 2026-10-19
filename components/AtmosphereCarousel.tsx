"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/data/siteConfig";
import { useLanguage } from "@/lib/i18n";
import { ImageFrame } from "./ImageFrame";

type AtmosphereCarouselProps = {
  images: readonly GalleryImage[];
};

export function AtmosphereCarousel({ images }: AtmosphereCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const { t } = useLanguage();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      const position = Math.max(0, Math.min(maximum, track.scrollLeft));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${maximum ? position / maximum : 1})`;
      const start = position < 2;
      const end = maximum - position < 2;
      setEdges((current) => current.start === start && current.end === end ? current : { start, end });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    track.addEventListener("scroll", schedule, { passive: true });
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resize?.observe(track);
    window.addEventListener("resize", schedule);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [images.length]);

  const scroll = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 20 : track.clientWidth;

    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={t.home.galleryTitle}
      >
        {images.map((image, index) => (
          <article
            key={`${image.src}-${index}`}
            data-carousel-card
            className="group min-w-[86%] snap-start overflow-hidden rounded-[8px] bg-seven-card premium-border premium-lift hover:shadow-glow sm:min-w-[48%] lg:min-w-[31%] xl:min-w-[24%]"
          >
            <ImageFrame
              src={image.src}
              alt={image.alt}
              className="aspect-[4/5] rounded-[8px] md:aspect-[3/4]"
              sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 86vw"
            />
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="mr-auto h-px flex-1 overflow-hidden bg-white/15" aria-hidden="true"><div ref={progressRef} className="seven-gallery-progress h-full origin-left bg-seven-green" style={{ transform: "scaleX(0)" }} /></div>
        <button
          type="button"
          className="seven-gallery-control inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white premium-border premium-lift hover:bg-seven-terracotta"
          disabled={edges.start}
          onClick={() => scroll("prev")}
          aria-label={t.common.previousPhotos}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="seven-gallery-control inline-flex h-12 w-12 items-center justify-center rounded-full bg-seven-terracotta text-white premium-lift hover:bg-seven-cream hover:text-seven-background"
          disabled={edges.end}
          onClick={() => scroll("next")}
          aria-label={t.common.nextPhotos}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
