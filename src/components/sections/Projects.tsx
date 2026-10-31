import { codeOf } from "../../data/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryLabel, projectCategories, sortedProjects } from "../../data/projects";
import { navigate } from "../../lib/router";
import { safeUrl } from "../../lib/url";
import type { Project, ProjectCategory } from "../../types/portfolio";
import { GithubIcon } from "../ui/BrandIcons";
import { ProjectIcon } from "../ui/ProjectIcon";
import { ProjectVisual } from "../ui/ProjectVisual";
import { useTilt } from "../../hooks/useTilt";
import { Section, SectionHeader, StatusDot, Tag } from "../ui/primitives";

type Filter = ProjectCategory | "all";

function openProject(id: string) {
  navigate(`/projects/${id}`);
  window.scrollTo({ top: 0 });
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const shown = project.technologies.slice(0, wide ? 7 : 5);
  const extra = project.technologies.length - shown.length;
  const demo = safeUrl(project.demoUrl);
  const tilt = useTilt(wide ? 2.5 : 4);
  return (
    <motion.article
      layout
      style={tilt.style}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group panel relative flex flex-col overflow-hidden transition-[border-color,transform,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_30px_70px_-35px_var(--glow)] ${
        wide ? "md:col-span-2" : ""
      }`}
      aria-labelledby={`proj-${project.id}`}
    >
      {/* scan line on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <ProjectVisual icon={project.icon} className={`border-b border-line transition-[filter] duration-500 group-hover:brightness-125 ${wide ? "h-44" : "h-36"}`} />
      <div className="flex items-start justify-between gap-4 p-5 pb-0 sm:p-6 sm:pb-0">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-105">
            <ProjectIcon icon={project.icon} />
          </span>
          <div>
            <p className="label-mono text-text-3">{project.domain}</p>
            <p className="mt-0.5 font-mono text-[11px] text-text-3">{project.categories.map((c) => categoryLabel[c]).join(" · ")}</p>
          </div>
        </div>
        {project.status && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-2/25 bg-accent-2-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-2">
            <StatusDot pulse={false} />
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={`proj-${project.id}`} className="font-display text-xl font-semibold leading-tight text-text sm:text-2xl">
          <a
            href={`/projects/${project.id}`}
            onClick={(e) => {
              e.preventDefault();
              openProject(project.id);
            }}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {project.shortTitle}
          </a>
        </h3>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className={`mt-3 text-sm leading-relaxed text-text-2 ${wide ? "line-clamp-4" : "line-clamp-3"}`}>{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {shown.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Tag tone="accent">+{extra}</Tag>
            </li>
          )}
        </ul>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => openProject(project.id)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent hover:text-accent-ink"
          >
            <Layers size={14} /> Case study
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] text-text-2 transition-colors hover:border-line-strong hover:text-text"
          >
            <GithubIcon className="h-3.5 w-3.5" /> Source
            <span className="sr-only"> for {project.shortTitle} on GitHub (opens in a new tab)</span>
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] text-text-2 transition-colors hover:border-line-strong hover:text-text"
            >
              <ExternalLink size={14} /> Live demo
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="ml-auto text-text-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(
    () => (filter === "all" ? sortedProjects : sortedProjects.filter((p) => p.categories.includes(filter))),
    [filter]
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: sortedProjects.length };
    sortedProjects.forEach((p) => p.categories.forEach((x) => (c[x] = (c[x] ?? 0) + 1)));
    return c;
  }, []);

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeader
        id="projects-title"
        code={codeOf("projects")}
        eyebrow="Project intelligence"
        title="Security tools, built end to end."
        description="Every project below is open source. Open a case study for the problem, architecture, implementation details and the trade-offs behind it."
      />

      <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {projectCategories.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`relative isolate shrink-0 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                active ? "border-accent/50 text-text" : "border-line text-text-2 hover:border-line-strong hover:text-text"
              }`}
            >
              {active && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-lg bg-accent-soft" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              {c.label}
              <span className="ml-2 font-mono text-[11px] text-text-3">{counts[c.id] ?? 0}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} wide={filter === "all" && i === 0} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
