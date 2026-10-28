import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/site/sections";
import { container, PageHeader, Stars } from "@/components/site/ui";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "What homeowners, hoteliers and collectors say about working with Maison Aurelle.",
};

export default function TestimonialsPage() {
  const [lead, ...rest] = site.testimonials;
  const leadProject = site.projects.find((p) => p.title === lead.project);

  return (
    <>
      <PageHeader
        eyebrow="Client words"
        title="In their own words"
        intro="Our clients rarely publish their homes, but many are generous enough to share how it felt to make one with us."
        accent={["own"]}
      />

      {/* Featured testimonial */}
      <section className="bg-deep text-bone">
        <div className="grid lg:grid-cols-12">
          <Parallax className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[40rem]" range={60}>
            {leadProject && <Image src={leadProject.hero} alt={leadProject.heroAlt} fill loading="eager" sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />}
          </Parallax>
          <Reveal className="flex flex-col justify-center px-5 py-20 sm:px-12 lg:col-span-7 lg:px-20">
            <Stars count={lead.rating} />
            <blockquote className="mt-8 font-serif text-[clamp(1.8rem,3.6vw,3.2rem)] font-light italic leading-[1.2]">“{lead.quote}”</blockquote>
            <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.3em] text-champagne">{lead.name}</p>
            <p className="mt-2 font-sans text-sm font-light text-bone/60">
              {lead.role} ·{" "}
              {leadProject ? (
                <Link href={`${site.base}/projects/${leadProject.slug}`} className="underline decoration-gold underline-offset-4 hover:text-bone">{lead.project}</Link>
              ) : (
                lead.project
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className={`${container} py-24 sm:py-32`}>
        <Stagger as="ul" className="columns-1 gap-8 sm:columns-2 lg:columns-3" stagger={0.08}>
          {rest.map((t, i) => {
            const project = site.projects.find((p) => p.title === t.project);
            return (
              <StaggerItem as="li" key={t.name} className="mb-8 break-inside-avoid">
                <figure className={`group border border-bone/10 p-8 transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_30px_60px_-30px_rgba(28,27,25,0.25)] sm:p-10 ${i % 3 === 1 ? "bg-raised" : "bg-base"}`}>
                  <span aria-hidden className="block font-serif text-6xl leading-[0.5] text-gold transition-transform duration-700 group-hover:-translate-y-1">“</span>
                  <blockquote className="mt-6 font-serif text-[1.45rem] font-light leading-snug text-bone">{t.quote}</blockquote>
                  <figcaption className="mt-8 border-t border-bone/10 pt-6">
                    <Stars count={t.rating} />
                    <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.26em] text-bone">{t.name}</p>
                    <p className="mt-1 font-sans text-xs font-light text-mute">
                      {t.role} —{" "}
                      {project ? (
                        <Link href={`${site.base}/projects/${project.slug}`} className="underline decoration-gold/60 underline-offset-4 hover:text-bone">{t.project}</Link>
                      ) : (
                        t.project
                      )}
                    </p>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <CtaBand title="Become our next story" />
    </>
  );
}
