"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Testimonial } from "@/lib/types";

/** One large quote at a time with fading transitions and manual controls. */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);
  const t = items[index];

  return (
    <div className="mx-auto max-w-4xl text-center" aria-roledescription="carousel" aria-label="Client testimonials">
      <span aria-hidden className="block font-serif text-[7rem] leading-[0.5] text-gold">“</span>
      <div className="relative mt-6 min-h-[16rem] sm:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            aria-live="polite"
          >
            <blockquote className="font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] font-light italic leading-[1.25] text-bone">
              {t.quote}
            </blockquote>
            <figcaption className="mt-10 font-sans text-[11px] uppercase tracking-[0.3em] text-champagne">
              {t.name}
              <span className="mx-3 text-bone/30">/</span>
              <span className="text-bone/60">{t.project}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:bg-gold hover:text-base">
          <ArrowLeft size={16} strokeWidth={1.4} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${items.length}`}
              onClick={() => setIndex(i)}
              className="grid h-8 place-items-center"
            >
              <span className={`block h-px transition-all duration-500 ease-luxe ${i === index ? "w-10 bg-gold" : "w-4 bg-bone/30"}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:bg-gold hover:text-base">
          <ArrowRight size={16} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
