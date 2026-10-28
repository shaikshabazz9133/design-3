"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { EASE_OUT } from "@/components/motion/primitives";

type Item = { slug: string; title: string; short: string; image: string; imageAlt: string };

/**
 * Numbered service rows. On pointer devices a preview image follows the cursor;
 * on touch screens each row shows a small thumbnail instead.
 */
export function ServicesList({ items, base }: { items: Item[]; base: string }) {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const onMove = (e: MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div className="relative">
      <ul ref={listRef} onMouseMove={onMove} onMouseLeave={() => setActive(null)} className="border-t border-bone/15">
        {items.map((item, i) => (
          <motion.li
            key={item.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: EASE_OUT }}
            className="border-b border-bone/15"
            onMouseEnter={() => setActive(i)}
          >
            <Link
              href={`${base}/services#${item.slug}`}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-6 sm:gap-10 sm:py-8"
            >
              <span className="font-sans text-[11px] tracking-[0.2em] text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden min-[360px]:block md:hidden">
                  <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[clamp(1.6rem,3.6vw,3rem)] font-light leading-tight transition-all duration-700 ease-luxe group-hover:translate-x-3 group-hover:italic">
                    {item.title}
                  </span>
                  <span className="mt-1 block max-w-md font-sans text-[13px] font-light leading-6 text-mute">{item.short}</span>
                </span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/20 transition-all duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-base">
                <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden />
                <span className="sr-only">View {item.title}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="relative -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              {items.map((item, i) => (
                <Image
                  key={item.slug}
                  src={item.image}
                  alt=""
                  fill
                  sizes="300px"
                  className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
