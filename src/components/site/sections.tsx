import Image from "next/image";
import Link from "next/link";
import { Counter, ImageReveal, Parallax, Reveal, SplitText } from "@/components/motion/primitives";
import { formatDate } from "@/lib/content/helpers";
import type { Post, Stat } from "@/lib/types";
import { Button, container, Eyebrow } from "./ui";

/** Closing call to action used at the foot of most pages. */
export function CtaBand({
  title = "Begin your commission",
  text = "Tell us about your home. A senior designer will reply within two working days to arrange a first conversation.",
  image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
}: {
  title?: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deep text-bone">
      <Parallax className="absolute inset-0" range={80}>
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-45" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-deep via-deep/70 to-deep/20" />
      <div className={`${container} relative py-28 sm:py-36`}>
        <Reveal y={12}>
          <Eyebrow light>Private consultations</Eyebrow>
        </Reveal>
        <h2 className="mt-8 max-w-3xl font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.98]">
          <SplitText text={title} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg font-sans text-[15px] font-light leading-[1.85] text-bone/75">{text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="/contact">Book a consultation</Button>
            <Button href="/projects" variant="outline-light">See our work</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StatsRow({ stats, light }: { stats: Stat[]; light?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 gap-y-10 border-t pt-10 lg:grid-cols-4 ${light ? "border-bone/15" : "border-bone/15"}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className={`${i % 2 ? "pl-6" : ""} lg:pl-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${light ? "lg:border-bone/15" : "lg:border-bone/15"}`}>
          <dt className={`font-sans text-[10px] uppercase tracking-[0.3em] ${light ? "text-champagne" : "text-mute"}`}>{s.label}</dt>
          <dd className={`mt-3 font-serif text-[clamp(3rem,6vw,5rem)] font-light leading-none ${light ? "text-bone" : "text-bone"}`}>
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function PostCard({ post, base, large }: { post: Post; base: string; large?: boolean }) {
  // The large variant is the featured article at the top of the journal.
  return (
    <Link href={`${base}/journal/${post.slug}`} className="group block">
      <ImageReveal className={`relative ${large ? "aspect-[16/10]" : "aspect-[4/3]"} bg-raised`}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          loading={large ? "eager" : undefined}
          className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
        />
      </ImageReveal>
      <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">
        {post.category} <span className="mx-2 text-mute/50">·</span> <time dateTime={post.date} className="text-mute">{formatDate(post.date)}</time>
      </p>
      <h3 className={`mt-3 font-serif font-light leading-[1.1] text-bone ${large ? "text-[clamp(2rem,3.5vw,3rem)]" : "text-[1.7rem]"}`}>
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-700 ease-luxe group-hover:bg-[length:100%_1px]">
          {post.title}
        </span>
      </h3>
      <p className="mt-3 max-w-xl font-sans text-sm font-light leading-7 text-mute">{post.excerpt}</p>
    </Link>
  );
}
