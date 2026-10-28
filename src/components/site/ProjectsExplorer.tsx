"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

/** Category tabs with a sliding indicator and an animated, re-flowing grid. */
export function ProjectsExplorer({ projects, categories, base }: { projects: Project[]; categories: string[]; base: string }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", ...categories];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <LayoutGroup id="filter">
          <div role="group" aria-label="Filter projects by category" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((tab) => {
              const active = tab === filter;
              const count = tab === "All" ? projects.length : projects.filter((p) => p.category === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab)}
                  className={`relative min-h-11 shrink-0 px-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${active ? "text-bone" : "text-mute hover:text-bone"}`}
                >
                  {tab}
                  <sup className="ml-1 text-[9px] text-gold-soft">{count}</sup>
                  {active && (
                    <motion.span layoutId="filter-line" className="absolute inset-x-4 bottom-1.5 h-px bg-gold" transition={{ duration: 0.5, ease: EASE_OUT }} />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="font-sans text-xs font-light text-mute" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl italic text-mute">No projects in this category yet — check back soon.</p>
      ) : (
        <motion.ul layout className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project, i) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_OUT }}
                className={i % 3 === 1 ? "lg:mt-20" : ""}
              >
                <ProjectCard project={project} base={base} index={projects.indexOf(project)} reveal={false} eager={i < 2} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
