import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { CtaBand, PostCard } from "@/components/site/sections";
import { DetailSkeleton } from "@/components/site/Skeletons";
import { container, Eyebrow, Heading } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";
import { ShareButton } from "@/components/ui/ShareButton";
import { site } from "@/lib/content/site";
import { findPost, formatDate, relatedPosts } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt, openGraph: { type: "article", publishedTime: post.date, authors: [post.author] } };
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) notFound();
  const related = relatedPosts(site, post);
  const dropCapIndex = post.body.findIndex((b) => b.type === "p");

  return (
    <article>
      <header className={`${container} pb-14 pt-32 sm:pt-44`}>
        <Link href={`${site.base}/journal`} className="group inline-flex min-h-11 items-center gap-3 font-sans text-[11px] uppercase tracking-[0.24em] text-mute transition-colors hover:text-bone">
          <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform group-hover:-translate-x-1" aria-hidden />
          Journal
        </Link>
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <Reveal y={10}>
            <Eyebrow className="justify-center">{post.category}</Eyebrow>
          </Reveal>
          <h1 className="mt-8 font-serif text-[clamp(2.4rem,6vw,5.25rem)] font-light leading-[1.02] tracking-[-0.01em] text-bone">
            <SplitText text={post.title} immediate delay={0.1} stagger={0.04} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-8 font-sans text-xs uppercase tracking-[0.22em] text-mute">
              By <span className="text-bone">{post.author}</span> · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
            </p>
          </Reveal>
        </div>
      </header>

      <ImageReveal className="relative mx-auto aspect-[16/10] max-w-[1440px] bg-raised sm:aspect-[21/9]" immediate delay={0.3}>
        <Image src={post.image} alt={post.imageAlt} fill preload sizes="100vw" className="object-cover" />
      </ImageReveal>

      <div className={`${container} py-20 sm:py-28`}>
        <div className="mx-auto max-w-2xl">
          {post.body.map((block, i) => {
            switch (block.type) {
              case "p": {
                const drop = i === dropCapIndex;
                return (
                  <Reveal key={i} y={16}>
                    <p className={`mb-7 font-sans text-[17px] font-light leading-[1.95] text-bone ${drop ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold" : ""}`}>
                      {block.text}
                    </p>
                  </Reveal>
                );
              }
              case "h2":
                return (
                  <Reveal key={i} y={16}>
                    <h2 className="mb-6 mt-14 font-serif text-[2.1rem] font-light leading-tight text-bone">{block.text}</h2>
                  </Reveal>
                );
              case "quote":
                return (
                  <Reveal key={i}>
                    <figure className="my-14 border-l border-gold pl-8">
                      <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light italic leading-snug text-bone">“{block.text}”</blockquote>
                      {block.cite && <figcaption className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">— {block.cite}</figcaption>}
                    </figure>
                  </Reveal>
                );
              case "list":
                return (
                  <Reveal key={i} y={16}>
                    <ul className="mb-8 space-y-3 border-y border-bone/10 py-6">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-4 font-sans text-base font-light leading-7 text-bone">
                          <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              case "image":
                return (
                  <figure key={i} className="my-12">
                    <ImageReveal className="relative aspect-[4/3] bg-raised">
                      <Image src={block.src} alt={block.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
                    </ImageReveal>
                    {block.caption && <figcaption className="mt-3 font-sans text-xs text-mute">{block.caption}</figcaption>}
                  </figure>
                );
            }
          })}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-bone/15 pt-8">
            <p className="font-sans text-sm font-light text-mute">
              Written by <span className="font-serif text-lg text-bone">{post.author}</span>
            </p>
            <ShareButton title={post.title} className="font-sans text-[11px] uppercase tracking-[0.22em] text-bone hover:text-gold-soft" />
          </div>
        </div>
      </div>

      <section className="bg-raised py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="Keep reading" title="More from the journal" />
          <div className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} base={site.base} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </article>
  );
}
