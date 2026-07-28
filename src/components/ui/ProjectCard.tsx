import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../../types/portfolio";
import { StatusDot } from "./StatusDot";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
      data-cursor-view
      onClick={() => setOpen((v) => !v)}
      className="group relative border border-line bg-surface/50 hover:border-line-strong transition-colors duration-200 p-6 flex flex-col cursor-pointer md:cursor-none"
    >
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-red group-hover:w-full transition-[width] duration-300 ease-out" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-display text-2xl font-semibold text-ink">{project.title}</h3>
        <StatusDot status={project.status} />
      </div>

      <p className="mt-2 text-sm text-grey">{project.tagline}</p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-mono text-[10px] tracking-[0.15em]">
        <div>
          <div className="text-grey-dim">CLASS</div>
          <div className="text-ink mt-1">{project.engineClass}</div>
        </div>
        <div>
          <div className="text-grey-dim">ENGINE</div>
          <div className="text-ink mt-1">{project.engine}</div>
        </div>
        {project.intelligence && (
          <div>
            <div className="text-grey-dim">INTELLIGENCE</div>
            <div className="text-ink mt-1">{project.intelligence}</div>
          </div>
        )}
      </div>

      <div
        className={`grid transition-all duration-300 ease-out overflow-hidden ${
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-hover:mt-5"
        }`}
      >
        <div className="min-h-0">
          <p className="text-sm text-grey leading-relaxed pb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 pb-4">
            {project.technologies.map((t) => (
              <span key={t} className="text-mono text-[10px] tracking-wider border border-line px-2 py-1 text-grey">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 flex items-center gap-5 border-t border-line">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-mono text-[11px] tracking-[0.15em] text-grey hover:text-ink transition-colors"
          >
            <GithubIcon className="h-[14px] w-[14px]" /> GITHUB
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-mono text-[11px] tracking-[0.15em] text-red hover:text-red-glow transition-colors"
          >
            <ExternalLink size={14} /> LIVE DEMO
          </a>
        )}
      </div>
    </motion.article>
  );
}
