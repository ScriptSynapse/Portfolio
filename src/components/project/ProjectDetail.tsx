import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Compass, TriangleAlert, ExternalLink, ImageOff, Lightbulb, Maximize2, Target, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { categoryLabel, getProject, sortedProjects } from "../../data/projects";
import { goToSection, navigate } from "../../lib/router";
import { safeUrl } from "../../lib/url";
import { setPageMeta } from "../../lib/seo";
import type { ProjectFigure } from "../../types/portfolio";
import { GithubIcon } from "../ui/BrandIcons";
import { Modal, ModalClose } from "../ui/Modal";
import { ProjectIcon } from "../ui/ProjectIcon";
import { ProjectVisual } from "../ui/ProjectVisual";
import { Corners, Reveal, StatusDot, Tag } from "../ui/primitives";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function Block({ id, code, title, children }: { id: string; code: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 sm:py-12">
      <Reveal>
        <p className="label-mono text-text-3">{code}</p>
        <h2 id={id} className="font-display mt-2 text-2xl font-semibold text-text sm:text-3xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

export function ProjectDetail({ id }: { id: string }) {
  const project = getProject(id)!;
  const [figure, setFigure] = useState<ProjectFigure | null>(null);
  const idx = sortedProjects.findIndex((p) => p.id === id);
  const next = sortedProjects[(idx + 1) % sortedProjects.length];
  const demo = safeUrl(project.demoUrl);

  useEffect(() => {
    setPageMeta({ title: `${project.shortTitle} — case study · Paulson Alex Fernandes`, description: `${project.tagline} ${project.problem}`.slice(0, 300), path: `/projects/${project.id}` });
    window.scrollTo({ top: 0 });
    document.getElementById("detail-title")?.focus({ preventScroll: true });
  }, [project]);

  return (
    <article className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <a
        href="/projects"
        onClick={(e) => {
          e.preventDefault();
          goToSection("projects");
        }}
        className="inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} /> All projects
      </a>

      <header className="panel relative mt-6 overflow-hidden">
        <Corners />
        <ProjectVisual icon={project.icon} className="h-40 border-b border-line sm:h-52" />
        <div className="relative p-6 sm:p-10">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
              <ProjectIcon icon={project.icon} size={22} />
            </span>
            <span className="label-mono text-text-3">
              Case study · {project.domain}
            </span>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-2/25 bg-accent-2-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-2">
                <StatusDot pulse={false} /> {project.status}
              </span>
            )}
          </div>
          <h1 id="detail-title" tabIndex={-1} className="font-display mt-6 text-3xl font-bold leading-tight text-text outline-none focus-visible:outline-none sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-accent">{project.tagline}</p>
          <p className="mt-5 max-w-3xl leading-relaxed text-text-2">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <Tag key={c} tone="accent">
                {categoryLabel[c]}
              </Tag>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink">
              <GithubIcon className="h-4 w-4" /> GitHub repository
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-text hover:border-accent">
                <ExternalLink size={16} /> Live demonstration
                {project.demoNote && <span className="text-text-3">· {project.demoNote}</span>}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        </div>
      </header>

      <div className="mt-10">
        <Block id="d-problem" code="01 / Problem → Solution" title="Problem statement & proposed solution">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-5">
              <p className="label-mono flex items-center gap-2 text-accent-3">
                <Target size={13} aria-hidden="true" /> Problem
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-2">{project.problem}</p>
            </div>
            <div className="panel p-5">
              <p className="label-mono flex items-center gap-2 text-accent-2">
                <Lightbulb size={13} aria-hidden="true" /> Solution
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-2">{project.solution}</p>
            </div>
          </div>
        </Block>

        {project.architecture && (
          <Block id="d-arch" code="02 / Architecture" title="System architecture">
            <p className="mb-5 text-sm text-text-2">Select a component to inspect its role and connections.</p>
            <ArchitectureDiagram architecture={project.architecture} />
          </Block>
        )}

        <Block id="d-impl" code="03 / Implementation" title="Technical implementation">
          <ol className="grid gap-3">
            {project.implementation.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-xl border border-line bg-card/60 p-4">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-relaxed text-text-2">{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="d-features" code="04 / Capabilities" title="Features & technologies">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
            <ul className="grid gap-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-text-2">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-2" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="panel p-5">
              <p className="label-mono flex items-center gap-2 text-text-3">
                <Wrench size={13} aria-hidden="true" /> Technologies used
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>

        <Block id="d-shots" code="05 / Visuals" title="Screenshots & figures">
          {project.figures?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.figures.map((f) => (
                <figure key={f.src} className="panel overflow-hidden">
                  <button type="button" onClick={() => setFigure(f)} className="group relative block w-full bg-white" aria-label={`Enlarge: ${f.caption}`}>
                    <img src={f.src} alt={f.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-contain p-2" />
                    <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 size={14} aria-hidden="true" />
                    </span>
                  </button>
                  <figcaption className="border-t border-line px-4 py-3 text-[13px] text-text-2">{f.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-line p-5 text-sm text-text-3">
              <ImageOff size={18} aria-hidden="true" />
              No screenshots have been published for this project yet — see the GitHub repository for setup and a full walkthrough.
            </div>
          )}
        </Block>

        <Block id="d-challenges" code="06 / Lessons" title="Challenges encountered">
          <ul className="grid gap-3">
            {project.challenges.map((c) => (
              <li key={c} className="rounded-xl border-l-2 border-accent-3 bg-card/60 py-3 pl-4 pr-4 text-[15px] leading-relaxed text-text-2">
                {c}
              </li>
            ))}
          </ul>
        </Block>

        {project.results && project.results.length > 0 && (
          <Block id="d-results" code="07 / Evidence" title="Results & evidence">
            <ul className="grid gap-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 rounded-xl border border-accent-2/25 bg-accent-2-soft/40 p-4 text-[15px] leading-relaxed text-text-2">
                  <BarChart3 size={17} className="mt-0.5 shrink-0 text-accent-2" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {((project.limitations && project.limitations.length > 0) || (project.future && project.future.length > 0)) && (
          <Block id="d-scope" code="08 / Scope" title="Limitations & future improvements">
            <div className="grid gap-5 md:grid-cols-2">
              {project.limitations && project.limitations.length > 0 && (
                <div className="panel p-5">
                  <p className="label-mono flex items-center gap-2 text-accent-3">
                    <TriangleAlert size={13} aria-hidden="true" /> Not implemented / known limits
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {project.limitations.map((l) => (
                      <li key={l} className="text-[14.5px] leading-relaxed text-text-2">• {l}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.future && project.future.length > 0 && (
                <div className="panel p-5">
                  <p className="label-mono flex items-center gap-2 text-accent">
                    <Compass size={13} aria-hidden="true" /> Planned — not yet built
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {project.future.map((f) => (
                      <li key={f} className="text-[14.5px] leading-relaxed text-text-2">• {f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Block>
        )}
      </div>

      <nav aria-label="Next project" className="mt-6 border-t border-line pt-8">
        <a
          href={`/projects/${next.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/projects/${next.id}`);
          }}
          className="panel group flex items-center justify-between gap-4 p-5 transition-colors hover:border-accent/40"
        >
          <span>
            <span className="label-mono block text-text-3">Next case study</span>
            <span className="font-display mt-1 block text-xl font-semibold text-text">{next.shortTitle}</span>
          </span>
          <ArrowRight className="text-text-3 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
        </a>
      </nav>

      <Modal open={Boolean(figure)} onClose={() => setFigure(null)} label={figure?.caption ?? "Figure"} className="max-w-4xl">
        <ModalClose onClose={() => setFigure(null)} />
        {figure && (
          <figure>
            <img src={figure.src} alt={figure.alt} className="max-h-[78vh] w-full bg-white object-contain p-4" />
            <figcaption className="border-t border-line px-5 py-3 text-sm text-text-2">{figure.caption}</figcaption>
          </figure>
        )}
      </Modal>
    </article>
  );
}
