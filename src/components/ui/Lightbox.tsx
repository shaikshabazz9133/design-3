"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

type Img = { src: string; alt: string };

type Props = {
  images: Img[];
  index: number | null;
  onChange: (index: number | null) => void;
  backdropClassName?: string;
  controlClassName?: string;
  captionClassName?: string;
};

/** Full-screen image viewer: Esc closes, arrow keys page, focus returns to the opener. */
export function Lightbox({ images, index, onChange, backdropClassName, controlClassName, captionClassName }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);
  const isOpen = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onChange]);

  const current = index !== null ? images[index] : null;
  const btn = `grid h-12 w-12 place-items-center rounded-full transition-colors ${controlClassName ?? ""}`;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          className={`fixed inset-0 z-[100] flex flex-col ${backdropClassName ?? "bg-black/90"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <p className={`text-sm ${captionClassName ?? ""}`} aria-live="polite">
              {index! + 1} / {images.length}
            </p>
            <button ref={closeRef} type="button" onClick={() => onChange(null)} className={btn} aria-label="Close gallery">
              <X size={20} />
            </button>
          </div>

          <div className="relative flex-1 px-4 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.src}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className={`${btn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-6`}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className={`${btn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-6`}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
          <p className={`p-4 text-center text-sm sm:p-6 ${captionClassName ?? ""}`} onClick={(e) => e.stopPropagation()}>
            {current.alt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
