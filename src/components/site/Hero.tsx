"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { EASE_OUT, pageEntranceDelay, SplitText } from "@/components/motion/primitives";
import { Button, container } from "./ui";

type Props = {
  image: string;
  imageAlt: string;
  featured: { title: string; href: string };
};

/**
 * Editorial hero: oversized Bodoni type on espresso, beside an arched "window"
 * onto the photograph. Brass outline arches drift at a different scroll speed.
 */
export function Hero({ image, imageAlt, featured }: Props) {
  const [delay] = useState(pageEntranceDelay);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 120]);
  const archY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -60]);

  return (
    <section className="relative overflow-hidden bg-base pb-16 pt-28 text-bone sm:pt-32 lg:min-h-[100svh] lg:pb-10">
      {/* Soft brass glow behind the arch */}
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[10%] h-[42rem] w-[42rem] rounded-full bg-gold/10 blur-[120px]" />

      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8`}>
        <div className="lg:col-span-7">
          <motion.p
            className="flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-gold-soft"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay, ease: EASE_OUT }}
          >
            <span aria-hidden className="h-px w-12 bg-gold" />
            Interior architecture · London
          </motion.p>

          <h1 className="mt-8 font-serif text-[clamp(3.1rem,8.6vw,8.75rem)] font-normal leading-[0.9] tracking-[-0.035em]">
            <SplitText
              text="Quiet luxury, composed for the way you live."
              immediate
              delay={0.1}
              stagger={0.07}
              accentWords={["composed"]}
              accentClassName="italic text-gold"
            />
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: delay + 0.7, ease: EASE_OUT }}>
            <p className="mt-9 max-w-md font-sans text-[15px] font-light leading-[1.9] text-mute">
              Residences, suites and private spaces of rare calm — drawn, made and delivered by one studio since 2008.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/projects">Explore projects</Button>
              <Button href="/contact" variant="outline-light">Book a consultation</Button>
            </div>
          </motion.div>
        </div>

        {/* Arched window */}
        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
          <motion.div aria-hidden style={{ y: archY }} className="absolute -inset-x-4 -top-4 bottom-10 rounded-t-full border border-gold/40 sm:-inset-x-6 sm:-top-6" />
          <motion.div aria-hidden style={{ y: archY }} className="absolute inset-x-6 top-6 -bottom-6 rounded-t-full border border-gold/20 sm:inset-x-10 sm:top-10 sm:-bottom-10" />
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-raised"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: EASE_OUT }}
          >
            <motion.div style={{ y: imageY }} className="absolute -inset-y-16 inset-x-0">
              <motion.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.4, delay: delay + 0.2, ease: EASE_OUT }}>
                <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
              </motion.div>
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: delay + 1.1, ease: EASE_OUT }}>
            <Link
              href={featured.href}
              className="group absolute -bottom-6 left-0 block max-w-[17rem] border border-gold/30 bg-base/90 p-5 backdrop-blur sm:-left-10"
            >
              <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">Featured residence</span>
              <span className="mt-2 block font-serif text-2xl italic text-bone transition-colors group-hover:text-gold">{featured.title} →</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Vertical signature */}
      <motion.p
        aria-hidden
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 font-sans text-[10px] uppercase tracking-[0.5em] text-mute [writing-mode:vertical-rl] xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: delay + 1.2 }}
      >
        Maison Aurelle — Mayfair — MMVIII
      </motion.p>
    </section>
  );
}
