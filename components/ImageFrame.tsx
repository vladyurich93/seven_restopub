"use client";

import Image from "next/image";
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
      )}
    </div>
  );
}
