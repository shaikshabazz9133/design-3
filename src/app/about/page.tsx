import type { Metadata } from "next";
import Image from "next/image";
import { MarqueeBand } from "@/components/motion/extras";
import { CtaBand, StatsRow } from "@/components/site/sections";
import { container, Eyebrow, Heading, PageHeader } from "@/components/site/ui";
import { ImageReveal, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Founded in Mayfair in 2008, Maison Aurelle is a team of architects, designers and makers creating quietly luxurious interiors.",
};

const values = [
  { title: "Discretion", text: "Most of our clients never appear in a magazine. We protect privacy as carefully as we detail joinery." },
  { title: "Craft", text: "Our Hackney Wick workshop makes beds, tables and cabinetry by hand, so we control quality to the millimetre." },
  { title: "Longevity", text: "We design rooms to look better in ten years than on the day of handover — natural materials, honest construction." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title="A house of quiet craft since 2008"
        intro="Maison Aurelle is an interior architecture studio of twenty-four architects, designers and makers, working from Mount Street in Mayfair and our own joinery workshop in East London."
        accent={["quiet"]}
      />

      <section className={`${container} pb-24 sm:pb-32`}>
        <div className="grid gap-6 sm:grid-cols-12">
          <ImageReveal className="relative aspect-[4/5] bg-raised sm:col-span-7 sm:aspect-[5/4]">
            <Image src={unsplash("1600210491892-03d54c0aaf87")} alt="Drawing room with arched windows and timber beams" fill preload sizes="(min-width: 640px) 58vw, 100vw" className="object-cover" />
          </ImageReveal>
          <ImageReveal className="relative aspect-[4/5] bg-raised sm:col-span-5 sm:mt-32" delay={0.15}>
            <Image src={unsplash("1598928506311-c55ded91a20c")} alt="Sitting room with coffered ceiling and built-in bookcases" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
          </ImageReveal>
        </div>
      </section>

      {/* Story */}
      <section className={`${container} pb-24 sm:pb-32`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading eyebrow="Our story" title="Begun at a single drawing table" accent={["single"]} />
          </div>
          <div className="space-y-6 font-sans text-[15px] font-light leading-[1.9] text-mute lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="font-serif text-2xl font-light leading-snug text-bone">
                Isabelle Laurent opened the studio with two designers and one conviction: that a home should feel calm before it feels impressive.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Eighteen years later the conviction hasn&apos;t changed, though the studio has. We now lead projects from early architectural planning through to the last object placed on a shelf — townhouses in Belgravia, penthouses on the Thames, chalets in Verbier and hotel suites in Edinburgh.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Because we design and make, nothing is lost between drawing and delivery. The same team that sketches your joinery visits the workshop to check it, and is on site the day it is installed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-raised py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="Milestones" title="Eighteen years, five chapters" accent={["five"]} />
          <ol className="mt-16 border-t border-bone/15">
            {site.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.05} className="grid gap-3 border-b border-bone/15 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
                <span className="font-serif text-5xl font-light italic text-gold sm:col-span-2">{m.year}</span>
                <h3 className="font-serif text-2xl font-normal text-bone sm:col-span-4 sm:pt-2">{m.title}</h3>
                <p className="font-sans text-sm font-light leading-7 text-mute sm:col-span-6 sm:pt-3">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MarqueeBand
        items={["Discretion", "Craft", "Longevity", "Proportion", "Light", "Material honesty"]}
        className="border-y border-gold/15 bg-raised py-6 font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] text-bone"
        accentClassName="italic text-gold"
        separator={<span aria-hidden className="h-2 w-2 rotate-45 bg-gold" />}
      />

      {/* Values */}
      <section className="overflow-hidden bg-deep py-24 text-bone sm:py-32">
        <div className={`${container} grid gap-16 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <Heading eyebrow="What we hold to" title="Three principles, unchanged" light accent={["unchanged"]} />
            <Parallax className="relative mt-12 hidden aspect-[4/5] lg:block" range={50}>
              <Image src={unsplash("1606744824163-985d376605aa")} alt="Grey wingback chair beneath a dark arch" fill sizes="35vw" className="object-cover" />
            </Parallax>
          </div>
          <Stagger className="space-y-12 lg:col-span-6 lg:col-start-7 lg:pt-32">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="border-t border-bone/15 pt-8">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">Principle 0{i + 1}</p>
                <h3 className="mt-4 font-serif text-4xl font-light">{v.title}</h3>
                <p className="mt-4 max-w-md font-sans text-sm font-light leading-7 text-bone/65">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className={`${container} py-24 sm:py-32`}>
        <Heading eyebrow="The partners" title="The people you'll work with" intro="Every commission is led personally by one of our partners, from first meeting to handover." accent={["you'll"]} />
        <Stagger as="ul" className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {site.team.map((m) => (
            <StaggerItem as="li" key={m.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-raised">
                <Image src={m.image} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale transition-all duration-[1.2s] ease-luxe group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal text-bone">{m.name}</h3>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.26em] text-gold-soft">{m.role}</p>
              <p className="mt-4 font-sans text-sm font-light leading-7 text-mute">{m.bio}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={`${container} pb-24 sm:pb-32`}>
        <Reveal y={12}>
          <Eyebrow>In numbers</Eyebrow>
        </Reveal>
        <div className="mt-10">
          <StatsRow stats={site.stats} />
        </div>
      </section>

      <CtaBand title="Let's begin with a conversation" />
    </>
  );
}
