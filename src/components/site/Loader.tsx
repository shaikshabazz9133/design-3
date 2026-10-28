"use client";

import { motion } from "motion/react";
import { RouteLoader } from "@/components/motion/extras";
import { EASE_OUT } from "@/components/motion/primitives";

const word = "Aurelle";

/** Espresso curtain: the wordmark writes itself in brass while a hairline fills. */
export function Loader() {
  return (
    <RouteLoader className="grid place-items-center bg-deep text-bone">
      <div className="flex flex-col items-center">
        <p aria-hidden className="flex font-serif text-6xl italic text-champagne sm:text-8xl">
          {Array.from(word).map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE_OUT }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
        <div aria-hidden className="mt-7 h-px w-48 overflow-hidden bg-gold/20 sm:w-64">
          <motion.div className="h-full origin-left bg-gold" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: EASE_OUT }} />
        </div>
        <motion.p
          className="mt-5 font-sans text-[10px] uppercase tracking-[0.5em] text-mute"
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
        >
          Maison · London
        </motion.p>
      </div>
    </RouteLoader>
  );
}
