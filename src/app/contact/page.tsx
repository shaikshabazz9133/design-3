import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { container, Eyebrow, PageHeader } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { directionsHref, MapEmbed } from "@/components/ui/MapEmbed";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Contact & Consultations",
  description: "Book a private consultation with Maison Aurelle at our Mayfair studio or at your home.",
};

export default function ContactPage() {
  const { brand } = site;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Begin with a conversation"
        intro="Share a little about your project and a senior designer will reply within two working days to arrange a first meeting."
        accent={["conversation"]}
      />

      <section className={`${container} pb-24 sm:pb-32`}>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm email={brand.email} />
          </div>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <Eyebrow>The studio</Eyebrow>
              <address className="mt-6 not-italic font-serif text-2xl font-light leading-snug text-bone">
                {brand.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <a href={directionsHref(brand.map.lat, brand.map.lon)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] text-gold-soft hover:text-bone">
                Get directions <ArrowUpRight size={14} aria-hidden />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>Direct</Eyebrow>
              <a href={`tel:${brand.phoneHref}`} className="mt-6 block font-serif text-2xl font-light text-bone hover:text-gold-soft">{brand.phone}</a>
              <a href={`mailto:${brand.email}`} className="mt-1 block break-all font-sans text-sm font-light text-mute hover:text-bone">{brand.email}</a>
            </Reveal>
            <Reveal delay={0.2}>
              <Eyebrow>Studio hours</Eyebrow>
              <dl className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
                {brand.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-3 font-sans text-sm font-light">
                    <dt className="text-mute">{h.days}</dt>
                    <dd className="text-bone">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Location */}
      <section className="bg-raised" aria-labelledby="location">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[34rem]">
            <MapEmbed {...brand.map} className="absolute inset-0 grayscale-[85%] sepia-[15%]" />
          </div>
          <div className="flex flex-col justify-center px-5 py-20 sm:px-12 lg:px-20">
            <Eyebrow>Location</Eyebrow>
            <h2 id="location" className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] text-bone">
              A townhouse studio on Mount Street
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] font-light leading-[1.85] text-mute">
              Five minutes&apos; walk from Bond Street and Green Park stations. Our material library is on the first floor — visits are by appointment so a designer can give you their full attention.
            </p>
            <ImageReveal className="relative mt-10 aspect-[16/9] max-w-md bg-champagne">
              <Image src={unsplash("1600566753086-00f18fb6b3ea")} alt="Bright double-height interior with oak staircase" fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Consultation band */}
      <section className="bg-deep py-20 text-bone">
        <div className={`${container} flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between`}>
          <div>
            <Eyebrow light>Design consultation</Eyebrow>
            <p className="mt-5 max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-snug">
              Two hours with a senior designer, a material palette and written recommendations — the fee is credited if you commission us.
            </p>
          </div>
          <a href="#contact-name" className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start border border-gold px-7 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold hover:text-base lg:self-auto">
            Request a consultation <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </section>
    </>
  );
}
