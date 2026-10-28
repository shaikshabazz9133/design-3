import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/primitives";

export const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "dark" | "outline-light" | "outline-dark";
  className?: string;
};

const buttonStyles = {
  gold: "bg-gold text-base border-gold",
  dark: "bg-bone text-base border-bone",
  "outline-light": "border-bone/45 text-bone",
  "outline-dark": "border-bone/30 text-bone",
};

const sweepStyles = {
  gold: "bg-bone",
  dark: "bg-gold",
  "outline-light": "bg-bone",
  "outline-dark": "bg-gold",
};

const sweepText = {
  gold: "group-hover:text-base",
  dark: "group-hover:text-base",
  "outline-light": "group-hover:text-base",
  "outline-dark": "group-hover:text-base",
};

/** A rectangular button whose fill sweeps in from the left on hover. */
export function Button({ href, children, variant = "gold", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden border px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.24em] ${buttonStyles[variant]} ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -translate-x-[101%] transition-transform duration-700 ease-luxe group-hover:translate-x-0 ${sweepStyles[variant]}`}
      />
      <span className={`relative transition-colors duration-500 ${sweepText[variant]}`}>{children}</span>
      <ArrowUpRight
        aria-hidden
        size={15}
        strokeWidth={1.5}
        className={`relative transition-all duration-500 group-hover:rotate-45 ${sweepText[variant]}`}
      />
    </Link>
  );
}

/** Inline text link with an underline that draws in from the left. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.24em] ${className ?? ""}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-500 ease-luxe group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p
      className={`flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-[0.3em] ${light ? "text-champagne" : "text-gold-soft"} ${className ?? ""}`}
    >
      <span aria-hidden className={`h-px w-10 ${light ? "bg-champagne/70" : "bg-gold"}`} />
      {children}
    </p>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  light?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  accent?: string[];
};

/** Section heading: eyebrow, serif title revealed word by word, optional intro. */
export function Heading({ eyebrow, title, intro, light, align = "left", as: Tag = "h2", className, accent }: HeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className ?? ""}`}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow light={light} className={centered ? "justify-center" : ""}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Tag
        className={`mt-6 font-serif text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-[1.02] tracking-[-0.01em] text-bone`}
      >
        <SplitText text={title} accentWords={accent} accentClassName="italic text-gold" />
      </Tag>
      {intro && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-xl font-sans text-[15px] font-light leading-[1.85] ${centered ? "mx-auto" : ""} ${light ? "text-bone/75" : "text-mute"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Inner-page header shared by About, Services, Projects and the rest. */
export function PageHeader({ eyebrow, title, intro, accent }: { eyebrow: string; title: string; intro: string; accent?: string[] }) {
  return (
    <header className={`${container} pb-16 pt-36 sm:pt-44 lg:pb-24`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-8 font-serif text-[clamp(2.75rem,7.5vw,7rem)] font-light leading-[0.95] tracking-[-0.02em] text-bone">
            <SplitText text={title} immediate delay={0.15} accentWords={accent} accentClassName="italic text-gold" />
          </h1>
        </div>
        <Reveal delay={0.5} className="lg:col-span-4 lg:pb-3">
          <p className="max-w-md font-sans text-[15px] font-light leading-[1.85] text-mute">{intro}</p>
        </Reveal>
      </div>
      <Reveal delay={0.7} y={0}>
        <div className="mt-14 h-px w-full origin-left bg-bone/15" />
      </Reveal>
    </header>
  );
}

export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className={`inline-flex gap-1 text-gold ${className ?? ""}`} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden width="12" height="12" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}
