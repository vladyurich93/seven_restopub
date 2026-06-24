"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { GalleryImage } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";

type AtmosphereCarouselProps = {
  images: readonly GalleryImage[];
};

export function AtmosphereCarousel({ images }: AtmosphereCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 20 : track.clientWidth;

    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Галерея атмосфери Seven"
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
              priority={index < 4}
            />
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white premium-border premium-lift hover:bg-seven-terracotta"
          onClick={() => scroll("prev")}
          aria-label="Попередні фото"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-seven-terracotta text-white premium-lift hover:bg-seven-cream hover:text-seven-background"
          onClick={() => scroll("next")}
          aria-label="Наступні фото"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
