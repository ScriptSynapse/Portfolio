import { ArrowLeft, Download, ExternalLink, Printer } from "lucide-react";
import { useEffect } from "react";
import { personal } from "../../data/personal";
import { sortedProjects } from "../../data/projects";
import { timeline } from "../../data/experience";
import { arsenal } from "../../data/skills";
import { achievements, certifications } from "../../data/credentials";
import { goToSection } from "../../lib/router";
import { setPageMeta } from "../../lib/seo";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 mt-8 border-b border-line pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent first:mt-0">{children}</h2>;
}

/** Clean, printable resume generated from the same data as the site. */
export function ResumeView() {
  useEffect(() => {
    setPageMeta({ title: "Resume — Paulson Alex Fernandes", description: "Printable resume of Paulson Alex Fernandes with a PDF download.", path: "/resume" });
    window.scrollTo({ top: 0 });
  }, []);

  const work = timeline.filter((t) => t.kind === "experience");
  const lead = timeline.filter((t) => t.kind === "leadership");

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => goToSection("home")} className="inline-flex items-center gap-2 text-sm text-text-2 hover:text-accent">
          <ArrowLeft size={16} /> Back to portfolio
        </button>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-sm text-text hover:border-accent">
            <Printer size={15} /> Print
          </button>
          <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-sm text-text hover:border-accent">
            <ExternalLink size={15} /> Open PDF
          </a>
          <a href={personal.resumeUrl} download={personal.resumeFileName} className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink">
            <Download size={15} /> Download PDF
          </a>
        </div>
      </div>

      <article className="print-sheet panel bg-card p-6 text-[14px] leading-relaxed sm:p-10" aria-label="Resume">
        <header>
          <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">{personal.fullName}</h1>
          <p className="mt-1 text-text-2">{personal.designation}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-text-2">
            <span>{personal.location}</span>
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={personal.githubUrl}>github.com/{personal.githubHandle}</a>
            <a href={personal.linkedinUrl}>LinkedIn</a>
          </p>
        </header>

        <H>Summary</H>
        <p className="text-text-2">{personal.summary}</p>

        <H>Experience</H>
        {work.map((t) => (
          <section key={t.id} className="mb-4 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-text">
                {t.role} · {t.organisation}
              </h3>
              <span className="font-mono text-[12px] text-text-3">
                {t.period}
                {t.location ? ` · ${t.location}` : ""}
              </span>
            </div>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-text-2">
              {t.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Projects</H>
        {sortedProjects.map((p) => (
          <section key={p.id} className="mb-3.5 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-text">{p.title}</h3>
              <a href={p.githubUrl} className="font-mono text-[11px] text-text-3">
                {p.githubUrl.replace("https://github.com/", "github/")}
              </a>
            </div>
            <p className="mt-1 text-text-2">{p.description}</p>
            <p className="mt-1 font-mono text-[11.5px] text-text-3">{p.technologies.join(" · ")}</p>
          </section>
        ))}

        <H>Skills</H>
        <dl className="grid gap-1.5">
          {arsenal.map((c) => (
            <div key={c.id} className="grid gap-x-4 sm:grid-cols-[13rem_1fr]">
              <dt className="font-semibold text-text">{c.label}</dt>
              <dd className="text-text-2">{c.items.map((i) => i.name).join(", ")}</dd>
            </div>
          ))}
        </dl>

        <H>Education</H>
        <p className="text-text-2">{personal.education}</p>

        <H>Certifications</H>
        <ul className="list-disc space-y-0.5 pl-5 text-text-2">
          {certifications.map((c) => (
            <li key={c.id}>
              {c.issuer}: {c.name}
              {c.date ? ` (${c.date})` : ""}
            </li>
          ))}
        </ul>

        <H>Achievements</H>
        <ul className="list-disc space-y-0.5 pl-5 text-text-2">
          {achievements.map((a) => (
            <li key={a.id}>
              {a.title}
              {a.date ? ` (${a.date})` : ""}
            </li>
          ))}
        </ul>

        <H>Leadership</H>
        {lead.map((t) => (
          <section key={t.id} className="mb-3 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-text">
                {t.role} · {t.organisation}
              </h3>
              <span className="font-mono text-[12px] text-text-3">{t.period}</span>
            </div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-text-2">
              {t.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Languages</H>
        <p className="text-text-2">{personal.languages.join(" · ")}</p>
      </article>
    </div>
  );
}
