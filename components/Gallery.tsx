import type { GalleryImage } from "@/data/siteConfig";
import { ImageFrame } from "./ImageFrame";

type GalleryProps = {
  images: readonly GalleryImage[];
};

export function Gallery({ images }: GalleryProps) {
  const featuredImages = images.slice(0, 4);

  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {featuredImages.map((image, index) => (
        <div key={`${image.src}-${index}`} className={`group overflow-hidden rounded-[8px] premium-border ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
          <ImageFrame
            src={image.src}
            alt={image.alt}
            className={index === 0 ? "aspect-[4/3] rounded-[8px] lg:h-full lg:min-h-[620px]" : "aspect-[4/3] rounded-[8px]"}
            sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
          />
        </div>
      ))}
    </div>
  );
}
