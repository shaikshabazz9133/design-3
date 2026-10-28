import Link from "next/link";
import { site } from "@/lib/content/site";
import { LetterReveal } from "@/components/motion/extras";
import { Reveal } from "@/components/motion/primitives";
import { container } from "./ui";

const { brand, base } = site;

const columns = [
  {
    title: "Studio",
    links: [
      { href: `${base}/about`, label: "About us" },
      { href: `${base}/process`, label: "Our process" },
      { href: `${base}/testimonials`, label: "Client words" },
      { href: `${base}/journal`, label: "Journal" },
    ],
  },
  {
    title: "Expertise",
    links: site.services.slice(0, 5).map((s) => ({ href: `${base}/services#${s.slug}`, label: s.title })),
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-bone">
      <div className={`${container} pt-20 lg:pt-28`}>
        <div className="grid gap-14 border-b border-bone/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05]">
                Considered rooms for <em className="text-gold">considered lives.</em>
              </p>
            </Reveal>
            <Link
              href={`${base}/contact`}
              className="group mt-10 inline-flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-gold"
            >
              <span className="h-px w-10 bg-gold transition-all duration-500 ease-luxe group-hover:w-16" />
              Begin a commission
            </Link>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/45">{col.title}</p>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-sans text-sm font-light text-bone/80 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/45">Visit</p>
            <address className="mt-6 not-italic font-sans text-sm font-light leading-7 text-bone/80">
              {brand.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <a href={`tel:${brand.phoneHref}`} className="mt-4 block transition-colors hover:text-gold">{brand.phone}</a>
              <a href={`mailto:${brand.email}`} className="block break-all transition-colors hover:text-gold">{brand.email}</a>
            </address>
          </div>
        </div>

        <p aria-hidden className="select-none overflow-hidden py-6 text-center font-serif text-[clamp(3.5rem,17vw,16rem)] font-light uppercase leading-[0.85] tracking-[0.08em] text-bone/[0.07]">
          <LetterReveal text="Aurelle" className="justify-center" />
        </p>

        <div className="flex flex-col gap-4 border-t border-bone/10 py-8 font-sans text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.founded}–2026 {brand.name}. Demonstration concept.</p>
          <ul className="flex gap-6">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
