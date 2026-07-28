import { ExternalLink } from "lucide-react";
import type { Project } from "../../types/portfolio";
import { GithubIcon } from "./BrandIcons";
import { TelemetrySparkline } from "./TelemetrySparkline";

const statusStyles: Record<Project["status"], string> = {
  online: "border-online/40 bg-online/10 text-online",
  active: "border-online/40 bg-online/10 text-online",
  development: "border-warning/40 bg-warning/10 text-warning",
  learning: "border-dev/40 bg-dev/10 text-dev",
  planned: "border-grey-dim/40 bg-grey-dim/10 text-grey",
};

const statusLabel: Record<Project["status"], string> = {
  online: "SHIPPED",
  active: "SHIPPED",
  development: "DEVELOPMENT",
  learning: "LEARNING",
  planned: "PLANNED",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const pfId = "PF-" + String(index + 1).padStart(3, "0");

  return (
      <article
          data-cursor-view
          className="group relative flex flex-col border border-line bg-carbon hover:border-line-strong transition-colors duration-200 md:cursor-none"
      >
        <div className="flex items-center justify-between gap-2 px-5 pt-5">
          <div className="flex items-center gap-2">
          <span className="text-mono text-[10px] tracking-wider border border-red/50 text-red px-2 py-0.5">
            {pfId}
          </span>
            <span className={"inline-flex items-center gap-1.5 text-mono text-[10px] tracking-wider border px-2 py-0.5 " + statusStyles[project.status]}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {statusLabel[project.status]}
          </span>
          </div>
          <span className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">{project.category[0]}</span>
        </div>

        <div className="px-3 mt-3">
          <TelemetrySparkline seed={index} />
        </div>

        <div className="border-t border-line mt-1 p-5 flex flex-col flex-1">
          <h3 className="text-display text-xl font-bold text-ink">{project.title}</h3>
          <p className="mt-2 text-sm text-grey leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="border border-line p-3">
              <div className="text-mono text-[9px] tracking-[0.2em] text-grey-dim">CLASS</div>
              <div className="text-ink text-sm font-semibold mt-1">{project.engineClass}</div>
            </div>
            <div className="border border-line p-3">
              <div className="text-mono text-[9px] tracking-[0.2em] text-grey-dim">ENGINE</div>
              <div className="text-ink text-sm font-semibold mt-1">{project.engine}</div>
            </div>
            {project.intelligence ? (
                <div className="border border-line p-3">
                  <div className="text-mono text-[9px] tracking-[0.2em] text-grey-dim">AI</div>
                  <div className="text-ink text-sm font-semibold mt-1">{project.intelligence}</div>
                </div>
            ) : null}
            <div className="border border-line p-3">
              <div className="text-mono text-[9px] tracking-[0.2em] text-grey-dim">STATUS</div>
              <div className={"text-sm font-semibold mt-1 " + statusStyles[project.status].split(" ").pop()}>
                {statusLabel[project.status]}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map(function (t) {
              return (
                  <span key={t} className="text-mono text-[10px] tracking-wider border border-line px-2 py-1 text-grey">
                {t}
              </span>
              );
            })}
          </div>

          <div className={"grid gap-3 mt-5 " + (project.demoUrl ? "grid-cols-2" : "grid-cols-1")}>
            {project.githubUrl ? (
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-line hover:border-line-strong px-4 py-2.5 text-mono text-[11px] tracking-[0.15em] text-ink transition-colors"
                >
                  <GithubIcon className="h-[14px] w-[14px]" />
                  {" GITHUB"}
                </a>
            ) : null}
            {project.demoUrl ? (
                <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-red text-red hover:bg-red/10 px-4 py-2.5 text-mono text-[11px] tracking-[0.15em] transition-colors"
                >
                  <ExternalLink size={14} />
                  {" LIVE"}
                </a>
            ) : null}
          </div>
        </div>
      </article>
  );
}
