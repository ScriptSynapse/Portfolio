import { ArrowLeft, Download, ExternalLink, Globe, Mail, MapPin, Printer } from "lucide-react";
import { useEffect } from "react";
import { achievements, certifications } from "../../data/credentials";
import { careerTimeline, leadership } from "../../data/experience";
import { personal } from "../../data/personal";
import { sortedProjects } from "../../data/projects";
import { arsenal } from "../../data/skills";
import { goToSection, navigate } from "../../lib/router";
import { setPageMeta } from "../../lib/seo";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-10 border-b border-line pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent first:mt-0">{children}</h2>;
}

/**
 * Recruiter mode — the whole profile on one quiet page: no globe, no motion,
 * contact and resume download at the top. Same data as the main site.
 */
export function RecruiterView() {
  useEffect(() => {
    setPageMeta({ title: "Recruiter summary — Paulson Alex Fernandes", description: "One-page summary of Paulson Alex Fernandes: projects, internship, leadership, achievements, skills and contact details.", path: "/recruiter" });
    window.scrollTo({ top: 0 });
  }, []);

  const contact = [
    { href: `mailto:${personal.email}`, label: personal.email, Icon: Mail, ext: false },
    { href: personal.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon, ext: true },
    { href: personal.githubUrl, label: `github.com/${personal.githubHandle}`, Icon: GithubIcon, ext: true },
    ...(personal.websiteUrl ? [{ href: personal.websiteUrl, label: personal.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""), Icon: Globe, ext: true }] : []),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => goToSection("home")} className="inline-flex items-center gap-2 text-sm text-text-2 hover:text-accent">
          <ArrowLeft size={16} /> Full portfolio
        </button>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-sm text-text hover:border-accent">
            <Printer size={15} /> Print
          </button>
          <a href={personal.resumeUrl} download={personal.resumeFileName} className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink">
            <Download size={15} /> Download resume (PDF)
          </a>
        </div>
      </div>

      <article className="print-sheet rounded-2xl border border-line bg-card p-6 text-[14.5px] leading-relaxed sm:p-10" aria-labelledby="rec-name">
        <header>
          <p className="label-mono text-text-3">Recruiter summary</p>
          <h1 id="rec-name" className="font-display mt-2 text-3xl font-bold text-text sm:text-4xl">
            {personal.fullName}
          </h1>
          <p className="mt-1 text-[15px] text-accent">{personal.designation}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-text-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} aria-hidden="true" /> {personal.location}
            </span>
            <span>{personal.availability}</span>
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {contact.map(({ href, label, Icon, ext }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-[13px] text-text hover:border-accent/50"
                >
                  <Icon size={14} className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <H>Summary</H>
        <p className="text-text-2">{personal.summary}</p>
        <dl className="mt-4 grid gap-2 sm:grid-cols-[9rem_1fr]">
          <dt className="font-semibold text-text">Education</dt>
          <dd className="text-text-2">{personal.education}</dd>
          <dt className="font-semibold text-text">Focus</dt>
          <dd className="text-text-2">{personal.currentFocus}</dd>
          <dt className="font-semibold text-text">Languages</dt>
          <dd className="text-text-2">{personal.languages.join(" · ")}</dd>
        </dl>

        <H>Projects</H>
        <ul className="grid gap-4">
          {sortedProjects.map((p) => (
            <li key={p.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-text">
                  {p.shortTitle} <span className="font-normal text-text-3">· {p.domain}</span>
                </h3>
                <span className="no-print flex gap-3 text-[12px]">
                  <button type="button" onClick={() => navigate(`/projects/${p.id}`)} className="text-accent hover:underline">
                    Case study
                  </button>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                    GitHub <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </span>
              </div>
              <p className="mt-0.5 text-text-2">{p.tagline}</p>
              <p className="mt-0.5 font-mono text-[11.5px] text-text-3">{p.technologies.join(" · ")}</p>
            </li>
          ))}
        </ul>

        <H>Experience</H>
        {careerTimeline.map((t) => (
          <section key={t.id} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-text">
                {t.role} · {t.organisation} <span className="font-normal text-text-3">(internship)</span>
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

        <H>Leadership — university events</H>
        {leadership.map((t) => (
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

        <H>Achievements</H>
        <ul className="list-disc space-y-1 pl-5 text-text-2">
          {achievements.map((a) => (
            <li key={a.id}>
              <span className="text-text">{a.title}</span>
              {a.date ? ` (${a.date})` : ""} — {a.description}
            </li>
          ))}
        </ul>

        <H>Skills</H>
        <dl className="grid gap-1.5">
          {arsenal.map((c) => (
            <div key={c.id} className="grid gap-x-4 sm:grid-cols-[13rem_1fr]">
              <dt className="font-semibold text-text">{c.label}</dt>
              <dd className="text-text-2">{c.items.map((i) => i.name).join(", ")}</dd>
            </div>
          ))}
        </dl>

        <H>Certifications</H>
        <ul className="list-disc space-y-0.5 pl-5 text-text-2">
          {certifications.map((c) => (
            <li key={c.id}>
              {c.issuer}: {c.name}
              {c.date ? ` (${c.date})` : ""}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
