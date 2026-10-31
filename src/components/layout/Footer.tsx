import { ArrowUp, Mail } from "lucide-react";
import { personal } from "../../data/personal";
import { buildDate, site } from "../../data/site";
import { formatDate } from "../../lib/format";
import { goToSection, navigate } from "../../lib/router";
import { BrandMark, GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

export function Footer() {
  return (
    <footer className="no-print relative border-t border-line bg-bg-2/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <BrandMark />
            <div>
              <p className="font-display text-lg font-semibold text-text">{personal.fullName}</p>
              <p className="mt-1 max-w-sm text-sm text-text-2">{personal.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2 transition-colors hover:border-accent hover:text-accent">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2 transition-colors hover:border-accent hover:text-accent">
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2 transition-colors hover:border-accent hover:text-accent">
              <Mail size={16} />
            </a>
            <a
              href="/resume"
              onClick={(e) => {
                e.preventDefault();
                navigate("/resume");
                window.scrollTo({ top: 0 });
              }}
              className="ml-2 rounded-lg border border-line px-3 py-2 text-sm text-text-2 transition-colors hover:text-text"
            >
              Resume view
            </a>
            <button
              type="button"
              onClick={() => goToSection("home")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2 transition-colors hover:text-text"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {buildDate.getFullYear()} {personal.fullName} · {site.product}
          </span>
          <span>Build {formatDate(buildDate)} · React · TypeScript · Three.js</span>
        </div>
      </div>
    </footer>
  );
}
