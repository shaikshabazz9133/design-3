import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { CtaBand } from "@/components/site/sections";
import { container, Heading, PageHeader } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Consultation, planning, concept, material selection, execution and handover — how Maison Aurelle delivers a commission.",
};

const stepImages = [
  { src: unsplash("1533090161767-e6ffed986c88"), alt: "Quiet desk with a lamp and clock, set for a first meeting" },
  { src: unsplash("1600607687644-c7171b42498f"), alt: "Bedroom planned with clear circulation around the bed" },
  { src: unsplash("1600210491369-e753d80a41f3"), alt: "Living room concept with gallery wall and cream sofa" },
  { src: unsplash("1565538810643-b5bdb714032a"), alt: "Stone worktop and brass tap chosen during material selection" },
  { src: unsplash("1600566753086-00f18fb6b3ea"), alt: "Double-height living room completed on site" },
  { src: unsplash("1600585154084-4e5fe7c39198"), alt: "Finished, styled living room ready for handover" },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our process"
        title="Measured, transparent, unhurried"
        intro="Six stages, each with clear deliverables and a fixed review point, so you always know where your project stands and what comes next."
        accent={["transparent,"]}
      />

      <ol className={`${container} pb-24 sm:pb-32`}>
        {site.process.map((step, i) => (
          <li key={step.title} className="grid gap-8 border-t border-bone/15 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <span className="block font-serif text-[clamp(4rem,9vw,7.5rem)] font-light italic leading-none text-champagne">0{i + 1}</span>
                  <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">{step.duration}</span>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.02] text-bone">{step.title}</h2>
                <p className="mt-6 max-w-lg font-sans text-[15px] font-light leading-[1.85] text-mute">{step.description}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.3em] text-mute">You receive</p>
                <ul className="mt-4 space-y-3">
                  {step.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-4 font-serif text-xl text-bone">
                      <span aria-hidden className="h-px w-6 bg-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <ImageReveal className="relative aspect-[4/3] bg-raised lg:col-span-5" direction={i % 2 ? "left" : "right"}>
              <Image src={stepImages[i].src} alt={stepImages[i].alt} fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </ImageReveal>
          </li>
        ))}
      </ol>

      <section className="bg-raised py-24 sm:py-32">
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <Heading eyebrow="Practicalities" title="Fees, timing & working together" accent={["together"]} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion
              items={site.faqs}
              defaultOpen={1}
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

      <CtaBand title="Start with stage one" text="Our first consultation is the start of every project. Tell us about your space and we'll arrange a visit." />
    </>
  );
}
