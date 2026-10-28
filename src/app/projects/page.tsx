import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/site/ProjectsExplorer";
import { CtaBand } from "@/components/site/sections";
import { container, PageHeader } from "@/components/site/ui";
import { site } from "@/lib/content/site";
import { projectCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Projects",
  description: "Residences, suites, kitchens and bedrooms by Maison Aurelle — London townhouses, Thames penthouses and boutique hotels.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Rooms we have had the privilege to shape"
        intro="A selection of recent residential and commercial commissions. Many more remain private at our clients' request."
        accent={["privilege"]}
      />
      <section className={`${container} pb-24 sm:pb-36`}>
        <ProjectsExplorer projects={site.projects} categories={projectCategories(site.projects)} base={site.base} />
      </section>
      <CtaBand title="Have a space in mind?" />
    </>
  );
}
