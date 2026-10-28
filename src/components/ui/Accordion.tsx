"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/primitives";

type Item = { q: string; a: string };

type Props = {
  items: Item[];
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  questionClassName?: string;
  panelClassName?: string;
  /** Rendered inside a span that receives `iconClassName` plus `iconOpenClassName` when open. */
  icon: ReactNode;
  iconClassName?: string;
  iconOpenClassName?: string;
  defaultOpen?: number | null;
};

/** Single-open accordion with height animation; styling is supplied by each design. */
export function Accordion({
  items,
  className,
  itemClassName,
  buttonClassName,
  questionClassName,
  panelClassName,
  icon,
  iconClassName,
  iconOpenClassName,
  defaultOpen = 0,
}: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.q} className={itemClassName} data-open={isOpen || undefined}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-center justify-between gap-6 text-left ${buttonClassName ?? ""}`}
              >
                <span className={questionClassName}>{item.q}</span>
                <span aria-hidden className={`shrink-0 ${iconClassName ?? ""} ${isOpen ? iconOpenClassName ?? "" : ""}`}>
                  {icon}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className={panelClassName}>{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
