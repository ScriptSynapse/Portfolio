import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
          <SectionHeading sector="SECTOR 02" title="THE GARAGE" subtitle="Engineered projects" />

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-mono text-[11px] tracking-[0.2em] px-4 py-2 border transition-colors duration-150 ${
                  active === f
                    ? "border-red text-ink bg-red/10"
                    : "border-line text-grey hover:border-line-strong hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
