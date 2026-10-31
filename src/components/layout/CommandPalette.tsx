import {
  ArrowRight,
  Award,
  Briefcase,
  Download,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Monitor,
  Moon,
  Network,
  Search,
  Sun,
  TerminalSquare,
  User,
  Wrench,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { personal } from "../../data/personal";
import { sortedProjects } from "../../data/projects";
import { goToSection, navigate, scrollToId } from "../../lib/router";
import { useTheme } from "../../lib/theme-context";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { Modal } from "../ui/Modal";

interface PaletteItem {
  id: string;
  label: string;
  group: "Navigate" | "Projects" | "Actions" | "Links";
  icon: ReactNode;
  keywords?: string;
  run: () => void;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = personal.resumeUrl;
  a.download = personal.resumeFileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setPreference } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const items = useMemo<PaletteItem[]>(() => {
    const s = (id: string, label: string, icon: ReactNode, keywords?: string): PaletteItem => ({
      id: `nav-${id}`,
      label,
      group: "Navigate",
      icon,
      keywords,
      run: () => goToSection(id),
    });
    return [
      s("home", "Home", <Home size={16} />, "start top hero"),
      s("about", "About", <User size={16} />, "profile bio education"),
      s("projects", "Projects", <FolderGit2 size={16} />, "work portfolio github"),
      s("skills", "Technical Skills", <Wrench size={16} />, "skills tools stack arsenal"),
      s("graph", "Intelligence Graph", <Network size={16} />, "relationships map"),
      s("experience", "Experience & Leadership", <Briefcase size={16} />, "internship leadership sih ciphathon core team"),
      s("achievements", "Certifications & Achievements", <Award size={16} />, "certificates credentials sih"),
      s("contact", "Contact", <Mail size={16} />, "message email hire"),
      ...sortedProjects.map<PaletteItem>((p) => ({
        id: `project-${p.id}`,
        label: p.shortTitle,
        group: "Projects",
        icon: <ArrowRight size={16} />,
        keywords: `${p.title} ${p.domain} ${p.technologies.join(" ")}`,
        run: () => navigate(`/projects/${p.id}`),
      })),
      { id: "recruiter", label: "Recruiter mode (1-page summary)", group: "Actions", icon: <Briefcase size={16} />, keywords: "hire recruiter summary cv", run: () => navigate("/recruiter") },
      { id: "resume-view", label: "View resume", group: "Actions", icon: <FileText size={16} />, keywords: "cv", run: () => navigate("/resume") },
      { id: "resume-dl", label: "Download resume (PDF)", group: "Actions", icon: <Download size={16} />, keywords: "cv pdf", run: downloadResume },
      {
        id: "terminal",
        label: "Open terminal",
        group: "Actions",
        icon: <TerminalSquare size={16} />,
        keywords: "shell console cli",
        run: () => {
          goToSection("about");
          window.setTimeout(() => {
            scrollToId("terminal");
            document.getElementById("terminal-input")?.focus({ preventScroll: true });
          }, 500);
        },
      },
      { id: "theme-dark", label: "Theme: Dark", group: "Actions", icon: <Moon size={16} />, run: () => setPreference("dark") },
      { id: "theme-light", label: "Theme: Light", group: "Actions", icon: <Sun size={16} />, run: () => setPreference("light") },
      { id: "theme-system", label: "Theme: System", group: "Actions", icon: <Monitor size={16} />, run: () => setPreference("system") },
      { id: "gh", label: "GitHub", group: "Links", icon: <GithubIcon className="h-4 w-4" />, run: () => openExternal(personal.githubUrl) },
      { id: "li", label: "LinkedIn", group: "Links", icon: <LinkedinIcon className="h-4 w-4" />, run: () => openExternal(personal.linkedinUrl) },
      { id: "mail", label: `Email ${personal.email}`, group: "Links", icon: <Mail size={16} />, run: () => (window.location.href = `mailto:${personal.email}`) },
    ];
  }, [setPreference]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const terms = q.split(/\s+/);
    return items.filter((i) => {
      const hay = `${i.label} ${i.group} ${i.keywords ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, query]);

  const close = () => {
    onClose();
    setQuery("");
    setIndex(0);
  };

  const runItem = (item: PaletteItem) => {
    close();
    window.setTimeout(item.run, 30);
  };

  const active = filtered[Math.min(index, filtered.length - 1)];
  let lastGroup = "";

  return (
    <Modal open={open} onClose={close} label="Command palette" position="top" className="max-w-xl">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={16} className="text-text-3" aria-hidden="true" />
        <input
          data-autofocus
          id="palette-input"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={active ? `pal-${active.id}` : undefined}
          aria-autocomplete="list"
          aria-label="Search sections, projects and actions"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
            } else if (e.key === "Enter" && active) {
              e.preventDefault();
              runItem(active);
            }
          }}
          placeholder="Search sections, projects, actions…"
          className="h-14 w-full bg-transparent text-[15px] text-text outline-none placeholder:text-text-3"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-3">ESC</kbd>
      </div>
      <ul id="palette-list" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-text-3">No matches for “{query}”.</li>}
        {filtered.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          const selected = item === active;
          return (
            <li key={item.id} role="presentation">
              {header && <div className="label-mono px-3 pb-1.5 pt-3 text-text-3">{header}</div>}
              <div
                id={`pal-${item.id}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setIndex(i)}
                onClick={() => runItem(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  selected ? "bg-accent-soft text-text" : "text-text-2"
                }`}
              >
                <span className={selected ? "text-accent" : "text-text-3"}>{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {selected && <span className="font-mono text-[10px] text-text-3">↵</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-text-3">
        <span>↑↓ navigate · ↵ select</span>
        <span>OPERATOR // PORTFOLIO OS</span>
      </div>
    </Modal>
  );
}
