"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE_OUT, markBooted } from "./primitives";

type Phase = "initial" | "loading" | "idle";

/**
 * Drives the page loader: shown on first load, then on every navigation to a
 * new path (link clicks and back/forward), and held for at least `minMs` so
 * the animation never flickers. Reduced motion skips it entirely.
 */
export function useRouteLoader({ initialMs = 1300, minMs = 650 } = {}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("initial");
  const startedAt = useRef(0);
  const target = useRef<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      markBooted();
      setPhase((p) => (p === "initial" ? "idle" : p));
    }, reduce ? 0 : initialMs);
    return () => clearTimeout(t);
  }, [reduce, initialMs]);

  useEffect(() => {
    if (reduce) return;
    const start = (path: string) => {
      startedAt.current = performance.now();
      target.current = path;
      setPhase("loading");
    };
    // Capture phase: next/link calls preventDefault in its own handler.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      start(url.pathname);
    };
    const onPop = () => start(window.location.pathname);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, [reduce]);

  useEffect(() => {
    if (phase !== "loading") return;
    // Safety net: never leave the loader up if a navigation is abandoned.
    const bail = setTimeout(() => setPhase("idle"), 8000);
    if (pathname !== target.current) return () => clearTimeout(bail);
    const wait = Math.max(0, minMs - (performance.now() - startedAt.current));
    const done = setTimeout(() => setPhase("idle"), wait);
    return () => {
      clearTimeout(bail);
      clearTimeout(done);
    };
  }, [pathname, phase, minMs]);

  return phase;
}

/** Wraps a design's loader artwork; mounts it while loading and plays its exit. */
export function RouteLoader({
  children,
  className,
  exit = { clipPath: "inset(0% 0% 100% 0%)" },
  enter = { clipPath: "inset(100% 0% 0% 0%)" },
}: {
  children: ReactNode;
  className?: string;
  exit?: Record<string, string | number>;
  enter?: Record<string, string | number>;
}) {
  const phase = useRouteLoader();
  const settled = phase === "initial" ? {} : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="route-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
          // The initial loader is in the server HTML; CSS hides it if scripts never run.
          className={`fixed inset-0 z-[90] ${phase === "initial" ? "loader-initial" : ""} ${className ?? ""}`}
          // First load is already covered by the server HTML, so skip the entrance there only.
          initial={phase === "initial" ? false : enter}
          animate={settled}
          exit={{ ...exit, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Thin bar along the top of the viewport that tracks reading progress. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX }} className={`pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left ${className ?? ""}`} />;
}

/**
 * A soft ring that trails the pointer and swells over links and buttons.
 * Mouse/trackpad only; the native cursor stays visible.
 */
export function CursorFollower({ className, activeClassName }: { className?: string; activeClassName?: string }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setActive(!!(e.target as Element | null)?.closest?.("a, button, [role='button'], input, select, textarea, label"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[95]">
      <motion.div
        className={`-ml-4 -mt-4 h-8 w-8 rounded-full ${active ? activeClassName ?? "" : className ?? ""}`}
        animate={{ scale: active ? 1.9 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      />
    </motion.div>
  );
}

/** Appears after scrolling; the ring around the arrow fills with page progress. */
export function BackToTop({ className, ringClassName }: { className?: string; ringClassName?: string }) {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => scrollY.on("change", (v) => setShow(v > 700)), [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className={`fixed bottom-5 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full shadow-lg sm:bottom-8 sm:right-8 ${className ?? ""}`}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
            <motion.circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className={ringClassName} style={{ pathLength: scrollYProgress }} />
          </svg>
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Large wordmark whose letters rise one by one when scrolled into view. */
export function LetterReveal({ text, className, letterClassName }: { text: string; className?: string; letterClassName?: string }) {
  return (
    <motion.span
      aria-label={text}
      role="text"
      className={`inline-flex overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.06 }}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block whitespace-pre ${letterClassName ?? ""}`}
          variants={{ hidden: { y: "105%", rotate: 6 }, show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE_OUT } } }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Endless scrolling band; every other item takes `accentClassName`. Pauses on hover. */
export function MarqueeBand({
  items,
  className,
  accentClassName,
  separator,
}: {
  items: string[];
  className?: string;
  accentClassName?: string;
  separator: ReactNode;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((w, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className={`px-6 sm:px-10 ${i % 2 ? accentClassName ?? "" : ""}`}>{w}</span>
          {separator}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group overflow-hidden ${className ?? ""}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
