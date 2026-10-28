"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

let booted = false;

/**
 * How long on-mount animations should wait so they play as the page loader
 * lifts: longer on the very first page view, shorter after a navigation.
 */
export function pageEntranceDelay() {
  if (typeof window === "undefined") return 0;
  return booted ? 0.75 : 1.4;
}

export function markBooted() {
  booted = true;
}

/** Honours the OS "reduce motion" setting for every motion component below it. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  figure: motion.figure,
} as const;

type RevealProps = {
  children?: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  amount?: number;
};

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.9,
  amount = 0.25,
}: RevealProps) {
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

type StaggerProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
};

export function Stagger({ children, as = "div", className, stagger = 0.1, delay = 0, amount = 0.15 }: StaggerProps) {
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
  variants = itemVariants,
}: {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  variants?: Variants;
}) {
  const Comp = tags[as];
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (heroes) instead of when scrolled into view. */
  immediate?: boolean;
  /** Words to render in an accent style, matched case-insensitively. */
  accentWords?: string[];
  accentClassName?: string;
};

/** Reveals a line word by word from behind a mask. Screen readers get the plain string. */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
  accentWords = [],
  accentClassName,
}: SplitTextProps) {
  const [entrance] = useState(pageEntranceDelay);
  const words = text.split(" ");
  const accents = accentWords.map((w) => w.toLowerCase());
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      {...trigger}
      variants={groupVariants(stagger, delay + (immediate ? entrance : 0))}
    >
      {words.map((word, i) => {
        const isAccent = accents.includes(word.replace(/[^\p{L}'-]/gu, "").toLowerCase());
        return (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block will-change-transform ${wordClassName ?? ""} ${isAccent ? accentClassName ?? "" : ""}`}
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </motion.span>
  );
}

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  immediate?: boolean;
};

const clipFrom = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Uncovers an image with a clip-path wipe while it settles from a slight zoom. */
export function ImageReveal({ children, className, direction = "up", delay: baseDelay = 0, immediate = false }: ImageRevealProps) {
  const [entrance] = useState(pageEntranceDelay);
  const delay = baseDelay + (immediate ? entrance : 0);
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.2 } };
  // The in-view trigger sits on an unclipped wrapper: a fully clipped element
  // has no visible area, so IntersectionObserver would never report it.
  return (
    <motion.div className={className} initial="hidden" {...trigger}>
      <motion.div
        className="relative h-full w-full overflow-hidden"
        variants={{
          hidden: { clipPath: clipFrom[direction] },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, delay, ease: EASE_OUT } },
        }}
      >
        <motion.div
          className="relative h-full w-full"
          variants={{
            hidden: { scale: 1.18 },
            show: { scale: 1, transition: { duration: 1.6, delay, ease: EASE_OUT } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Moves its children against the scroll direction. Disabled for reduced motion. */
export function Parallax({
  children,
  className,
  range = 60,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-range, range]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, height: `calc(100% + ${range * 2}px)`, top: -range }} className="relative w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Counts up to `value` once visible. Renders the final value for no-JS and reduced motion. */
export function Counter({
  value,
  suffix = "",
  duration = 2,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  // Server HTML carries the final figure; once hydrated, park at zero until seen.
  useEffect(() => {
    if (!reduce && ref.current && !inView) ref.current.textContent = `0${suffix}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v).toLocaleString("en-GB")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${value.toLocaleString("en-GB")}${suffix}`}
    </span>
  );
}

/** A scroll-linked progress bar; pass the element whose progress it should follow. */
export function useSectionProgress(offset: ["start end" | "start center" | "start start", "end end" | "end center" | "end start"] = ["start center", "end center"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { ref, progress: scrollYProgress };
}
