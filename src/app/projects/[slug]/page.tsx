import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { CtaBand } from "@/components/site/sections";
import { DetailSkeleton } from "@/components/site/Skeletons";
import { container, Eyebrow, Heading, TextLink } from "@/components/site/ui";
import { Parallax, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { site } from "@/lib/content/site";
import { findProject, nextProject, relatedProjects } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(site, slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [{ url: `${project.hero}?w=1200&q=75&auto=format&fit=crop` }] },
  };
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<DetailSkeleton dark />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(site, slug);
  if (!project) notFound();

  const next = nextProject(site, project);
  const related = relatedProjects(site, project, 2);
  const facts = [
    { k: "Location", v: project.location },
    { k: "Year", v: String(project.year) },
    { k: "Area", v: project.area },
    { k: "Duration", v: project.duration },
    { k: "Client", v: project.client },
  ];

  return (
    <article>
      {/* Full-bleed hero */}
      <header className="relative h-[92svh] min-h-[560px] overflow-hidden bg-deep text-bone">
        <Parallax className="absolute inset-0" range={100}>
          <Image src={project.hero} alt={project.heroAlt} fill preload sizes="100vw" className="object-cover" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-deep/40" />
        <div className={`${container} relative flex h-full flex-col justify-end pb-14 sm:pb-20`}>
          <Link href={`${site.base}/projects`} className="group mb-auto mt-28 inline-flex min-h-11 items-center gap-3 self-start font-sans text-[11px] uppercase tracking-[0.24em] text-bone/80 transition-colors hover:text-bone">
            <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform group-hover:-translate-x-1" aria-hidden />
            All projects
          </Link>
          <Reveal y={10}>
            <Eyebrow light>{project.category} · {project.year}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.75rem,8vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
            <SplitText text={project.title} immediate delay={0.2} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-xl font-sans text-[15px] font-light leading-[1.85] text-bone/80">{project.summary}</p>
          </Reveal>
        </div>
      </header>

      {/* Facts */}
      <section className="border-b border-bone/10 bg-raised">
        <Stagger as="ul" className={`${container} grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-5`} stagger={0.06}>
          {facts.map((f) => (
            <StaggerItem as="li" key={f.k}>
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-mute">{f.k}</p>
              <p className="mt-2 font-serif text-xl text-bone">{f.v}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Overview & concept */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading eyebrow="Overview" title="The brief" />
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <li key={s} className="border border-bone/15 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-mute">{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="space-y-6 font-sans text-[15px] font-light leading-[1.9] text-mute lg:col-span-6 lg:col-start-7">
            {project.overview.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? "font-serif text-2xl leading-snug text-bone" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-bone/15 pt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">Design concept</h2>
            <p className="mt-6 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] font-light italic leading-snug text-bone">{project.concept}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">The challenge</h2>
            <p className="mt-6 font-sans text-[15px] font-light leading-[1.9] text-mute">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${container} pb-24 sm:pb-32`} aria-label="Project gallery">
        <ProjectGallery images={project.gallery} />
      </section>

      {/* Before / after */}
      {project.beforeAfter && (
        <section className="bg-deep py-24 text-bone sm:py-32">
          <div className={container}>
            <Heading eyebrow="Transformation" title="Before & after" intro="Drag the handle — or use your arrow keys — to compare the space at survey and at handover." light />
            <Reveal delay={0.2} className="mt-14">
              <BeforeAfter
                {...project.beforeAfter}
                className="aspect-[4/3] sm:aspect-[16/9]"
                labelClassName="bg-deep/70 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.26em] text-bone backdrop-blur"
                handleClassName="h-14 w-14 rounded-full bg-base text-bone shadow-lg"
                lineClassName="bg-bone"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Materials */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading eyebrow="Material palette" title="Chosen by hand" intro="Every finish was selected in person with our client, from stone yard to weaving mill." accent={["hand"]} />
          </div>
          <Stagger as="ul" className="grid gap-px bg-bone/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {project.materials.map((m) => (
              <StaggerItem as="li" key={m.name} className="flex items-center gap-5 bg-base p-6">
                <span aria-hidden className="h-16 w-16 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" style={{ background: m.swatch }} />
                <div>
                  <p className="font-serif text-xl text-bone">{m.name}</p>
                  <p className="mt-1 font-sans text-xs font-light text-mute">{m.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Next & related */}
      <section className="bg-raised py-24 sm:py-32">
        <div className={container}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Heading eyebrow="Continue" title="Related projects" />
            <Reveal>
              <TextLink href={`${site.base}/projects/${next.slug}`} className="text-bone">Next: {next.title}</TextLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-14 sm:grid-cols-2 sm:gap-8">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} base={site.base} aspect={i === 0 ? "aspect-[4/3]" : "aspect-[4/3] sm:mt-20"} sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Imagine your own" image={project.gallery[0]?.src} />
    </article>
  );
}
