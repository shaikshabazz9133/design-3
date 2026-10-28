import Image from "next/image";
import { MarqueeBand } from "@/components/motion/extras";
import { Hero } from "@/components/site/Hero";
import { ProcessLine } from "@/components/site/ProcessLine";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaBand, PostCard, StatsRow } from "@/components/site/sections";
import { ServicesList } from "@/components/site/ServicesList";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { Button, container, Eyebrow, Heading, TextLink } from "@/components/site/ui";
import { ImageReveal, Parallax, Reveal, SplitText } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

const { base } = site;

export default function Design1Home() {
  const featured = site.projects.filter((p) => p.featured);
  const [a, b, c] = featured;

  return (
    <>
      <Hero
        image={unsplash("1606744824163-985d376605aa")}
        imageAlt="Grey wingback chair and a reading lamp beneath a dark, arched alcove"
        featured={{ title: a.title, href: `${base}/projects/${a.slug}` }}
      />

      <MarqueeBand
        items={["Residences", "Hotel suites", "Bespoke joinery", "Listed restoration", "Lighting design", "Art curation", "Private kitchens"]}
        className="border-y border-gold/15 bg-raised py-6 font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] text-bone"
        accentClassName="italic text-gold"
        separator={<span aria-hidden className="h-2 w-2 rotate-45 bg-gold" />}
      />

      {/* Introduction */}
      <section className={`${container} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <Eyebrow>The studio</Eyebrow>
            </Reveal>
            <p className="mt-8 font-serif text-[clamp(1.85rem,3.6vw,3.25rem)] font-light leading-[1.18] text-bone">
              <SplitText
                text="For eighteen years we have designed homes that feel inevitable — rooms in which nothing is superfluous, everything is considered, and the light always falls just so."
                stagger={0.025}
                accentWords={["inevitable"]}
                accentClassName="italic text-gold-soft"
              />
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ImageReveal className="relative aspect-[4/5] bg-raised">
              <Image src={unsplash("1600210491369-e753d80a41f3")} alt="Reading corner with a cream sofa and framed equestrian prints" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </ImageReveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-sans text-[15px] font-light leading-[1.85] text-mute">
                From a Mayfair studio and our own joinery workshop, a team of twenty-four architects, designers and makers deliver residences, suites and private spaces across Europe and the Gulf.
              </p>
              <TextLink href={`${base}/about`} className="mt-8 text-bone">Meet the studio</TextLink>
            </Reveal>
          </div>
        </div>
        <div className="mt-24">
          <StatsRow stats={site.stats} />
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-raised py-24 sm:py-32 lg:py-40" aria-labelledby="featured">
        <div className={container}>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div id="featured">
              <Heading eyebrow="Selected work" title="Residences & private spaces" accent={["private"]} />
            </div>
            <Reveal>
              <TextLink href={`${base}/projects`} className="text-bone">All projects</TextLink>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
            <div className="lg:col-span-7">
              <ProjectCard project={a} base={base} index={0} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:mt-48">
              <ProjectCard project={b} base={base} index={1} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 32vw, 100vw" />
              <Reveal delay={0.2}>
                <p className="mt-12 hidden max-w-xs font-serif text-2xl font-light italic leading-snug text-mute lg:block">
                  “Every project begins with a single question: how should this place make you feel?”
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 lg:col-start-3">
              <ProjectCard project={c} base={base} index={2} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 65vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`${container} py-24 sm:py-32 lg:py-40`} aria-labelledby="services">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4" id="services">
            <div className="lg:sticky lg:top-32">
              <Heading eyebrow="Expertise" title="One studio, every detail" intro="Architecture, interiors, joinery, lighting and art — designed together so nothing is lost between disciplines." accent={["every"]} />
              <Reveal delay={0.3}>
                <TextLink href={`${base}/services`} className="mt-10 text-bone">All services</TextLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ServicesList base={base} items={site.services.map(({ slug, title, short, image, imageAlt }) => ({ slug, title, short, image, imageAlt }))} />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="overflow-hidden bg-deep text-bone" aria-labelledby="philosophy">
        <div className="grid lg:grid-cols-2">
          <Parallax className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[52rem]" range={90}>
            <Image src={unsplash("1616594039964-ae9021a400a0")} alt="Charcoal-walled bedroom with an ivory channel-tufted headboard and brass chandelier" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Parallax>
          <div className="flex flex-col justify-center px-5 py-24 sm:px-12 lg:px-20 xl:px-28">
            <Reveal y={12}>
              <Eyebrow light>Philosophy</Eyebrow>
            </Reveal>
            <h2 id="philosophy" className="mt-8 font-serif text-[clamp(2.25rem,4.4vw,4rem)] font-light leading-[1.05]">
              <SplitText text="We design for the hours you’ll actually live there." accentWords={["live"]} accentClassName="italic text-gold" />
            </h2>
            <div className="mt-14 space-y-10">
              {[
                { t: "Proportion first", d: "We draw every room in elevation before choosing a single fabric. Correct the bones and the rest follows." },
                { t: "Few materials, used well", d: "Five or six natural materials repeated throughout give a home its calm, coherent character." },
                { t: "Light as a material", d: "Each room is planned around how daylight moves through it, then lit in layers for the evening." },
              ].map((p, i) => (
                <Reveal key={p.t} delay={i * 0.12} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-bone/10 pt-8">
                  <span className="font-serif text-2xl italic text-gold">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-normal">{p.t}</h3>
                    <p className="mt-2 font-sans text-sm font-light leading-7 text-bone/65">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`${container} py-24 sm:py-32 lg:py-40`} aria-labelledby="process">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div id="process">
            <Heading eyebrow="How we work" title="Six measured steps from brief to keys" accent={["measured"]} />
          </div>
          <Reveal>
            <TextLink href={`${base}/process`} className="text-bone">Our full process</TextLink>
          </Reveal>
        </div>
        <div className="mt-20">
          <ProcessLine steps={site.process} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-raised py-24 sm:py-32" aria-label="Client testimonials">
        <div className={container}>
          <TestimonialCarousel items={site.testimonials} />
          <Reveal className="mt-14 text-center">
            <TextLink href={`${base}/testimonials`} className="text-champagne">Read more client stories</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className={`${container} py-24 sm:py-32 lg:py-40`} aria-labelledby="journal">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div id="journal">
            <Heading eyebrow="Journal" title="Notes on living well" accent={["well"]} />
          </div>
          <Reveal>
            <Button href={`${base}/journal`} variant="outline-dark">Read the journal</Button>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {site.posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <PostCard post={post} base={base} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
