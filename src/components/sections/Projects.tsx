import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "../../data/projects";
import type { ProjectCategory } from "../../types/portfolio";

const filters: ("ALL" | ProjectCategory)[] = ["ALL", "SECURITY", "AI", "CLOUD", "SOFTWARE"];

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("ALL");
  const visible = active === "ALL" ? projects : projects.filter((p) => p.category.includes(active));

  return (
      <section id="projects" className="relative py-24 sm:py-32 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <SectionHeading sector="SECTOR 02" title="THE GARAGE" subtitle="Engineered projects — shipped, in build, in research." />

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                  <button
                      key={f}
                      onClick={() => setActive(f)}
                      className={`text-mono text-[11px] tracking-[0.2em] px-4 py-2 border transition-colors duration-150 ${
                          active === f
                              ? "border-red bg-red text-bg font-semibold"
                              : "border-line text-grey hover:border-line-strong hover:text-ink"
                      }`}
                  >
                    {f}
                  </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p) => {
              const originalIndex = projects.findIndex((proj) => proj.id === p.id);
              return <ProjectCard key={p.id} project={p} index={originalIndex} />;
            })}
          </motion.div>
        </div>
      </section>
  );
}
