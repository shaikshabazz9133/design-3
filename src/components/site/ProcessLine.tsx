"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { ProcessStep } from "@/lib/types";

/** Six steps on a hairline that draws itself as the section scrolls past. */
export function ProcessLine({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      <div aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-bone/15 sm:hidden lg:block lg:left-0 lg:top-[7px] lg:h-px lg:w-full" />
      <motion.div
        aria-hidden
        style={{ scaleY: scale }}
        className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gold sm:hidden"
      />
      <motion.div aria-hidden style={{ scaleX: scale }} className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-gold lg:block" />
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          className="relative pl-10 lg:pl-0 lg:pt-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_OUT }}
        >
          <span aria-hidden className="absolute left-0 top-0 grid h-[15px] w-[15px] place-items-center rounded-full border border-gold bg-base">
            <span className="h-[5px] w-[5px] rounded-full bg-gold" />
          </span>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">
            {String(i + 1).padStart(2, "0")} · {step.duration}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-normal leading-tight text-bone">{step.title}</h3>
          <p className="mt-3 font-sans text-[13px] font-light leading-6 text-mute">{step.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}
