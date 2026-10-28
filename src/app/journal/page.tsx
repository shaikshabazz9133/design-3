import type { Metadata } from "next";
import { JournalExplorer } from "@/components/site/JournalExplorer";
import { CtaBand, PostCard } from "@/components/site/sections";
import { container, PageHeader } from "@/components/site/ui";
import { Reveal } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { postCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Journal",
  description: "Essays on materials, lighting, kitchens and the art of quiet luxury from the Maison Aurelle studio.",
};

export default function JournalPage() {
  const featured = site.posts.find((p) => p.featured) ?? site.posts[0];
  const rest = site.posts.filter((p) => p !== featured);

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from the studio"
        intro="Essays on materials, light and the craft of making a home — written by the designers who practise it."
        accent={["studio"]}
      />

      <section className={`${container} pb-20`} aria-label="Featured article">
        <Reveal>
          <PostCard post={featured} base={site.base} large />
        </Reveal>
      </section>

      <section className={`${container} pb-24 sm:pb-36`} aria-label="All articles">
        <JournalExplorer posts={rest} categories={postCategories(rest)} base={site.base} />
      </section>

      <CtaBand />
    </>
  );
}
