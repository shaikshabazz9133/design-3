import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { CtaBand } from "@/components/site/sections";
import { Button, container, Heading, PageHeader } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Residential and commercial interiors, bespoke kitchens, bedrooms, living rooms, renovation and design consultation from Maison Aurelle.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every discipline, under one roof"
        intro="From a single consultation to a complete residence, each service is led by a partner and delivered by the same team from first sketch to handover."
        accent={["one"]}
      />

      {/* Index of services */}
      <nav aria-label="Services on this page" className={`${container} pb-16`}>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {site.services.map((s, i) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="group inline-flex min-h-11 items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-mute transition-colors hover:text-bone">
                <span className="text-gold-soft">0{i + 1}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${container} space-y-24 pb-24 sm:space-y-36 sm:pb-36`}>
        {site.services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16" aria-labelledby={`${s.slug}-title`}>
              <ImageReveal className={`relative aspect-[4/3] bg-raised lg:col-span-7 ${flip ? "lg:order-2" : ""}`} direction={flip ? "left" : "right"}>
                <Image src={s.image} alt={s.imageAlt} fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </ImageReveal>
              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <Reveal>
                  <p className="font-serif text-6xl font-light italic text-champagne">0{i + 1}</p>
                  <h2 id={`${s.slug}-title`} className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-light leading-[1.05] text-bone">{s.title}</h2>
                  <p className="mt-6 font-sans text-[15px] font-light leading-[1.85] text-mute">{s.description}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="mt-8 border-t border-bone/15">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-4 border-b border-bone/15 py-3.5 font-sans text-sm font-light text-bone">
                        <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-mute">
                      Typical timeline <span className="ml-2 text-bone">{s.timeline}</span>
                    </p>
                    <Button href="/contact" variant="outline-dark">Enquire</Button>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-raised py-24 sm:py-32" aria-labelledby="faq">
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4" id="faq">
            <Heading eyebrow="Questions" title="Often asked" intro="If your question isn't here, our studio manager will gladly answer it." accent={["asked"]} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion
              items={site.faqs}
              className="border-t border-bone/15"
              itemClassName="border-b border-bone/15"
              buttonClassName="min-h-16 py-6 text-bone"
              questionClassName="font-serif text-[1.6rem] font-light leading-tight"
              panelClassName="max-w-2xl pb-8 font-sans text-[15px] font-light leading-[1.85] text-mute"
              icon={<Plus size={16} strokeWidth={1.4} />}
              iconClassName="grid h-10 w-10 place-items-center rounded-full border border-bone/20 transition-all duration-500 ease-luxe"
              iconOpenClassName="rotate-45 border-gold! bg-gold text-base"
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
