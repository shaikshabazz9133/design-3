"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/primitives";

/** Route entrance: a gold hairline sweeps across while the page settles in. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.9, ease: EASE_OUT }, opacity: { delay: 0.7, duration: 0.4 } }}
      />
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_OUT }}>
        {children}
      </motion.div>
    </>
  );
}

/** Lightweight fade for nested routes (index ⇄ detail) so transitions don't stack. */
export function SubTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}
