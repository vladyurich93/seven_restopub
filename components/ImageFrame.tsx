"use client";

import { useState } from "react";

type ImageFrameProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ImageFrame({ src, alt, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority = false }: ImageFrameProps) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative overflow-hidden bg-seven-card ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_25%_20%,rgba(201,113,74,0.25),transparent_35%),linear-gradient(135deg,#1a1714,#111111)] p-6 text-center">
          <div>
            <p className="font-display text-3xl font-black uppercase tracking-[0.16em] text-white">Seven</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-seven-cream">Restopub</p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="image-frame-img absolute inset-0 block h-full w-full object-cover"
        />
      )}
    </div>
  );
}
