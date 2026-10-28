"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { useState } from "react";
import { ImageReveal } from "@/components/motion/primitives";
import { Lightbox } from "@/components/ui/Lightbox";

type Img = { src: string; alt: string };

const layouts = ["sm:col-span-2 aspect-[16/9]", "aspect-[4/5]", "aspect-[4/5] sm:mt-24", "sm:col-span-2 aspect-[16/9]"];

/** Editorial gallery; any image opens the full-screen viewer. */
export function ProjectGallery({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {images.map((img, i) => (
          <li key={img.src} className={layouts[i % layouts.length]}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block h-full w-full overflow-hidden bg-raised"
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
            >
              <ImageReveal className="absolute inset-0">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
              </ImageReveal>
              <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-base/90 text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={16} strokeWidth={1.4} aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={index}
        onChange={setIndex}
        backdropClassName="bg-deep/95 text-bone"
        controlClassName="border border-bone/25 text-bone hover:bg-gold hover:border-gold hover:text-base"
        captionClassName="font-sans font-light text-bone/70"
      />
    </>
  );
}
