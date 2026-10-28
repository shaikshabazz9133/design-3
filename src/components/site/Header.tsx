"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/primitives";
import { isActivePath, useMobileMenu, useScrollHeader } from "@/components/ui/hooks";
import type { Brand } from "@/lib/types";
import { container } from "./ui";

const base = "";
const left = [
  { href: `${base}/projects`, label: "Projects" },
  { href: `${base}/services`, label: "Services" },
  { href: `${base}/about`, label: "Studio" },
  { href: `${base}/process`, label: "Process" },
];
const right = [
  { href: `${base}/journal`, label: "Journal" },
  { href: `${base}/testimonials`, label: "Clients" },
];
const all = [{ href: "/", label: "Home" }, ...left, ...right, { href: `${base}/contact`, label: "Contact" }];

export function Header({ brand }: { brand: Pick<Brand, "address" | "phone" | "phoneHref" | "email"> }) {
  const { open, setOpen, toggle, pathname } = useMobileMenu();
  const { scrolled, hidden } = useScrollHeader();


  const navLink = (item: { href: string; label: string }) => {
    const active = isActivePath(pathname, item.href);
    return (
      <li key={item.href} className="relative">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className="group relative inline-block py-2 font-sans text-[11px] font-medium uppercase tracking-[0.24em]"
        >
          {item.label}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-luxe group-hover:origin-left group-hover:scale-x-100"
          />
          {active && (
            <motion.span
              layoutId="nav-active"
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
              transition={{ duration: 0.6, ease: EASE_OUT }}
            />
          )}
        </Link>
      </li>
    );
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-deep px-4 py-3 font-sans text-xs uppercase tracking-[0.2em] text-bone transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-700 ease-luxe ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } text-bone ${
          scrolled && !open ? "bg-base/85 shadow-[0_1px_0_rgba(239,231,218,0.08)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className={`${container} grid h-20 grid-cols-[1fr_auto_1fr] items-center lg:h-24`}>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-8 xl:gap-10">{left.map(navLink)}</ul>
          </nav>

          <Link href="/" className="col-start-1 justify-self-start text-left lg:col-start-2 lg:justify-self-center lg:text-center" aria-label="Maison Aurelle — home">
            <span className="block font-serif text-[24px] font-normal italic leading-none tracking-[0.02em] sm:text-[30px]">Aurelle</span>
            <span className="mt-1.5 block font-sans text-[9px] uppercase tracking-[0.45em] opacity-70">Maison · London</span>
          </Link>

          <div className="col-start-3 flex items-center justify-end gap-8 xl:gap-10">
            <nav aria-label="Secondary" className="hidden lg:block">
              <ul className="flex gap-8 xl:gap-10">{right.map(navLink)}</ul>
            </nav>
            <Link
              href={`${base}/contact`}
              className="hidden border border-gold/60 px-5 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-gold-soft transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-base lg:inline-block"
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex min-h-11 items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] lg:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-luxe ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ease-luxe ${open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-deep pt-24 text-bone lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <nav aria-label="Mobile" className={`${container} flex-1 overflow-y-auto`}>
              <ul className="divide-y divide-bone/10 border-y border-bone/10">
                {all.map((item, i) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE_OUT }}
                    >
                      <Link
                        href={item.href}
                        onNavigate={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-5 py-3.5"
                      >
                        <span className="w-6 font-sans text-[10px] tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`font-serif text-[clamp(1.9rem,8vw,2.6rem)] font-light leading-none ${active ? "italic text-gold" : ""}`}>
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              className={`${container} grid grid-cols-2 gap-4 py-8 font-sans text-xs leading-relaxed text-bone/60`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <p className="mb-1 uppercase tracking-[0.2em] text-gold">Studio</p>
                {brand.address.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
              <div>
                <p className="mb-1 uppercase tracking-[0.2em] text-gold">Contact</p>
                <a href={`tel:${brand.phoneHref}`} className="block min-h-6">{brand.phone}</a>
                <a href={`mailto:${brand.email}`} className="block break-all">{brand.email}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
