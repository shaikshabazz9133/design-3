"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Post } from "@/lib/types";
import { PostCard } from "./sections";

/** Category filter + free-text search over the journal, with an empty state. */
export function JournalExplorer({ posts, categories, base }: { posts: Post[]; categories: string[]; base: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [posts, category, query]);

  return (
    <>
      <div className="flex flex-col gap-6 border-y border-bone/15 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
              className={`min-h-11 shrink-0 border px-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                c === category ? "border-gold bg-gold text-base" : "border-transparent text-mute hover:border-bone/30 hover:text-bone"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="journal-search" className="sr-only">Search articles</label>
          <Search size={16} strokeWidth={1.4} aria-hidden className="absolute left-0 top-1/2 -translate-y-1/2 text-mute" />
          <input
            id="journal-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the journal"
            className="h-11 w-full border-b border-bone/20 bg-transparent pl-7 pr-8 font-sans text-sm font-light text-bone placeholder:text-mute/70 focus:border-gold focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-mute hover:text-bone">
              <X size={15} aria-hidden />
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{results.length} articles found</p>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-28 text-center">
            <p className="font-serif text-3xl font-light italic text-bone">Nothing quite matches “{query || category}”.</p>
            <p className="mt-4 font-sans text-sm font-light text-mute">Try a broader word, or browse every article.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-8 min-h-11 border border-bone/30 px-6 font-sans text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-bone hover:text-base"
            >
              Show all articles
            </button>
          </motion.div>
        ) : (
          <motion.ul key={`${category}-${query}`} className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, i) => (
              <motion.li key={post.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT }}>
                <PostCard post={post} base={base} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
