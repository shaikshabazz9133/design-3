import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
  base: string;
  aspect?: string;
  sizes?: string;
  index?: number;
  reveal?: boolean;
  eager?: boolean;
};

/** Editorial project tile: clip-reveal image, slow zoom on hover, caption beneath. */
export function ProjectCard({ project, base, aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 40vw, 100vw", index, reveal = true, eager }: Props) {
  const image = (
    <Image
      src={project.hero}
      alt={project.heroAlt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.06]"
    />
  );

  return (
    <Link href={`${base}/projects/${project.slug}`} className="group block">
      <div className={`relative ${aspect} overflow-hidden bg-raised`}>
        {reveal ? <ImageReveal className="absolute inset-0">{image}</ImageReveal> : image}
        <div aria-hidden className="absolute inset-0 bg-deep/0 transition-colors duration-700 group-hover:bg-deep/30" />
        <span
          aria-hidden
          className="absolute bottom-5 right-5 grid h-14 w-14 scale-75 place-items-center rounded-full bg-base font-sans text-[9px] uppercase tracking-[0.2em] text-bone opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100"
        >
          View
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">
            {index !== undefined && <span className="mr-3 text-mute">{String(index + 1).padStart(2, "0")}</span>}
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 font-serif text-[1.75rem] font-light leading-tight text-bone transition-colors group-hover:text-gold-soft">
            {project.title}
          </h3>
        </div>
        <p className="shrink-0 pt-1 font-sans text-xs font-light text-mute">{project.location}</p>
      </div>
    </Link>
  );
}
