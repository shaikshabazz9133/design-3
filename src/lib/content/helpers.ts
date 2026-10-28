import type { Post, Project, SiteContent } from "@/lib/types";

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export function projectCategories(projects: Project[]) {
  return Array.from(new Set(projects.map((p) => p.category)));
}

export function postCategories(posts: Post[]) {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function findProject(site: SiteContent, slug: string) {
  return site.projects.find((p) => p.slug === slug);
}

export function findPost(site: SiteContent, slug: string) {
  return site.posts.find((p) => p.slug === slug);
}

/** Same-category projects first, then the rest, excluding the current one. */
export function relatedProjects(site: SiteContent, current: Project, count = 3) {
  const others = site.projects.filter((p) => p.slug !== current.slug);
  return [...others.filter((p) => p.category === current.category), ...others.filter((p) => p.category !== current.category)].slice(0, count);
}

export function relatedPosts(site: SiteContent, current: Post, count = 3) {
  const others = site.posts.filter((p) => p.slug !== current.slug);
  return [...others.filter((p) => p.category === current.category), ...others.filter((p) => p.category !== current.category)].slice(0, count);
}

export function nextProject(site: SiteContent, current: Project) {
  const i = site.projects.findIndex((p) => p.slug === current.slug);
  return site.projects[(i + 1) % site.projects.length];
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
