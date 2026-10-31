import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { personal } from "../../data/personal";
import { sortedProjects, getProject, categoryLabel } from "../../data/projects";
import { arsenal } from "../../data/skills";
import { timeline } from "../../data/experience";
import { certifications, achievements } from "../../data/credentials";
import { sections } from "../../data/navigation";
import { goToSection, navigate } from "../../lib/router";
import { useTheme, type ThemePreference } from "../../lib/theme-context";

type Line = { id: number; kind: "in" | "out" | "err"; body: ReactNode };

const COMMANDS: Record<string, string> = {
  help: "List available commands",
  whoami: "Who is the operator?",
  about: "Profile summary",
  projects: "List projects · `projects <id>` for details",
  skills: "Technical arsenal by category",
  experience: "Experience & leadership timeline",
  certifications: "Certifications and achievements",
  contact: "Ways to get in touch",
  resume: "Download the resume PDF",
  goto: "Jump to a section · `goto projects`",
  theme: "Switch theme · `theme dark|light|system`",
  clear: "Clear the screen",
};

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-accent underline-offset-2 hover:underline">
    {children}
  </a>
);

const Row = ({ k, children }: { k: string; children: ReactNode }) => (
  <div className="grid grid-cols-[8.5rem_1fr] gap-2 sm:grid-cols-[10rem_1fr]">
    <span className="text-text-3">{k}</span>
    <span className="min-w-0">{children}</span>
  </div>
);

let nextId = 0;

export function Terminal() {
  const { setPreference } = useTheme();
  const [lines, setLines] = useState<Line[]>(() => [
    {
      id: nextId++,
      kind: "out",
      body: (
        <>
          <span className="text-accent-2">OPERATOR // PORTFOLIO OS</span> — interactive shell.
          <br />
          Type <span className="text-accent">help</span> to list commands. Tab completes, ↑/↓ recall history.
        </>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const userTouched = useRef(false);
  const submitRef = useRef<(v: string) => void>(() => {});

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = (kind: Line["kind"], body: ReactNode) => setLines((l) => [...l, { id: nextId++, kind, body }]);

  const run = (raw: string): void => {
    const input = raw.trim();
    if (!input) return;
    const [cmd, ...args] = input.split(/\s+/);
    const c = cmd.toLowerCase();
    switch (c) {
      case "help":
        return print(
          "out",
          <div className="grid gap-0.5">
            {Object.entries(COMMANDS).map(([k, v]) => (
              <Row key={k} k={k}>
                {v}
              </Row>
            ))}
          </div>
        );
      case "whoami":
        return print(
          "out",
          <>
            <span className="text-text">{personal.fullName}</span> — {personal.designation}
            <br />
            {personal.tagline}
          </>
        );
      case "about":
        return print(
          "out",
          <div className="grid gap-0.5">
            <Row k="name">{personal.fullName}</Row>
            <Row k="location">{personal.location}</Row>
            <Row k="education">{personal.education}</Row>
            <Row k="focus">{personal.currentFocus}</Row>
            <Row k="disciplines">{personal.disciplines.join(" · ")}</Row>
            <Row k="languages">{personal.languages.join(" · ")}</Row>
          </div>
        );
      case "projects": {
        if (args[0]) {
          const p = getProject(args[0].toLowerCase()) ?? sortedProjects.find((x) => x.shortTitle.toLowerCase().startsWith(args.join(" ").toLowerCase()));
          if (!p) return print("err", `projects: no project "${args.join(" ")}". Try \`projects\` to list ids.`);
          return print(
            "out",
            <div className="grid gap-0.5">
              <span className="text-text">{p.title}</span>
              <span>{p.description}</span>
              <Row k="stack">{p.technologies.join(", ")}</Row>
              <Row k="source">
                <A href={p.githubUrl}>{p.githubUrl.replace("https://", "")}</A>
              </Row>
              <Row k="details">
                <button type="button" className="text-accent hover:underline" onClick={() => navigate(`/projects/${p.id}`)}>
                  open case study →
                </button>
              </Row>
            </div>
          );
        }
        return print(
          "out",
          <div className="grid gap-0.5">
            {sortedProjects.map((p) => (
              <Row key={p.id} k={p.id}>
                {p.shortTitle} <span className="text-text-3">— {p.categories.map((x) => categoryLabel[x]).join(", ")}</span>
              </Row>
            ))}
          </div>
        );
      }
      case "skills":
        return print(
          "out",
          <div className="grid gap-0.5">
            {arsenal.map((cat) => (
              <Row key={cat.id} k={cat.label.toLowerCase().split(" ")[0]}>
                {cat.items.map((i) => i.name).join(", ")}
              </Row>
            ))}
          </div>
        );
      case "experience":
        return print(
          "out",
          <div className="grid gap-0.5">
            {timeline.map((t) => (
              <Row key={t.id} k={t.period}>
                {t.role} — <span className="text-text">{t.organisation}</span>
              </Row>
            ))}
          </div>
        );
      case "certifications":
      case "certs":
      case "achievements":
        return print(
          "out",
          <div className="grid gap-0.5">
            {certifications.map((x) => (
              <Row key={x.id} k={x.issuer.split(" ")[0]}>
                {x.name}
                {x.date && <span className="text-text-3"> · {x.date}</span>}
              </Row>
            ))}
            {achievements.map((a) => (
              <Row key={a.id} k="achievement">
                {a.title}
              </Row>
            ))}
          </div>
        );
      case "contact":
        return print(
          "out",
          <div className="grid gap-0.5">
            <Row k="email">
              <A href={`mailto:${personal.email}`}>{personal.email}</A>
            </Row>
            <Row k="github">
              <A href={personal.githubUrl}>github.com/{personal.githubHandle}</A>
            </Row>
            <Row k="linkedin">
              <A href={personal.linkedinUrl}>LinkedIn profile</A>
            </Row>
            <Row k="form">
              <button type="button" className="text-accent hover:underline" onClick={() => goToSection("contact")}>
                open secure contact form →
              </button>
            </Row>
          </div>
        );
      case "resume": {
        const a = document.createElement("a");
        a.href = personal.resumeUrl;
        a.download = personal.resumeFileName;
        a.click();
        return print(
          "out",
          <>
            Downloading <span className="text-text">{personal.resumeFileName}</span>… or{" "}
            <button type="button" className="text-accent hover:underline" onClick={() => navigate("/resume")}>
              view it in resume mode
            </button>
            .
          </>
        );
      }
      case "goto":
      case "cd": {
        const target = (args[0] ?? "").toLowerCase().replace(/^\//, "");
        const s = sections.find((x) => x.id === target || x.label.toLowerCase() === target);
        if (!s) return print("err", `goto: unknown section. Try one of: ${sections.map((x) => x.id).join(", ")}`);
        goToSection(s.id);
        return print("out", `→ ${s.label}`);
      }
      case "theme": {
        const mode = (args[0] ?? "").toLowerCase() as ThemePreference;
        if (!["dark", "light", "system"].includes(mode)) return print("err", "theme: expected dark, light or system");
        setPreference(mode);
        return print("out", `Theme set to ${mode}.`);
      }
      case "clear":
      case "cls":
        setLines([]);
        return;
      case "sudo":
        return print("err", "Permission denied: this shell is read-only. Nice try though.");
      case "ls":
        return print("out", sections.map((s) => s.id).join("  "));
      default:
        return print("err", `${c}: command not found. Type \`help\` for the list of commands.`);
    }
  };

  const complete = () => {
    const v = value.trimStart();
    const parts = v.split(/\s+/);
    if (parts.length === 1) {
      const options = Object.keys(COMMANDS).filter((k) => k.startsWith(parts[0].toLowerCase()));
      if (options.length === 1) setValue(options[0] + " ");
      else if (options.length > 1) print("out", options.join("  "));
    } else if (parts[0] === "projects" || parts[0] === "goto") {
      const pool = parts[0] === "projects" ? sortedProjects.map((p) => p.id) : sections.map((s) => s.id);
      const options = pool.filter((k) => k.startsWith(parts[1].toLowerCase()));
      if (options.length === 1) setValue(`${parts[0]} ${options[0]}`);
      else if (options.length > 1) print("out", options.join("  "));
    }
  };

  const submit = (v: string) => {
    print("in", v);
    if (v.trim()) setHistory((h) => [...h.slice(-49), v.trim()]);
    setCursor(-1);
    setValue("");
    run(v);
  };

  useEffect(() => {
    submitRef.current = submit;
  });

  // Self-typing demo: the first time the terminal scrolls into view, it types
  // `whoami` and runs it — unless the visitor has already started typing.
  useEffect(() => {
    if (!inView || reduced) return;
    const cmd = "whoami";
    const timers: number[] = [];
    for (let i = 1; i <= cmd.length; i++) {
      timers.push(window.setTimeout(() => !userTouched.current && setValue(cmd.slice(0, i)), 500 + i * 90));
    }
    timers.push(
      window.setTimeout(() => {
        if (!userTouched.current) submitRef.current(cmd);
      }, 500 + cmd.length * 90 + 450)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduced]);

  return (
    <div ref={rootRef} id="terminal" className="panel scroll-mt-28 overflow-hidden font-mono text-[12.5px] leading-relaxed">
      <div className="flex items-center gap-2 border-b border-line bg-bg-2/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-3/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" aria-hidden="true" />
        <span className="ml-2 text-[11px] text-text-3">operator@portfolio-os: ~</span>
      </div>
      <div
        ref={scrollRef}
        className="term-scroll h-72 overflow-y-auto px-4 py-3 text-text-2 sm:h-80"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((l) => (
          <div key={l.id} className={`mb-1.5 break-words ${l.kind === "err" ? "text-accent-3" : l.kind === "in" ? "text-text" : ""}`}>
            {l.kind === "in" ? (
              <>
                <span className="text-accent-2">➜</span> <span className="text-accent">~</span> {l.body}
              </>
            ) : (
              l.body
            )}
          </div>
        ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="terminal-input" className="shrink-0">
            <span className="text-accent-2">➜</span> <span className="text-accent">~</span>
            <span className="sr-only">Terminal command</span>
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={value}
            onChange={(e) => {
              userTouched.current = true;
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                complete();
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!history.length) return;
                const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
                setCursor(next);
                setValue(history[next]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (cursor < 0) return;
                const next = cursor + 1;
                if (next >= history.length) {
                  setCursor(-1);
                  setValue("");
                } else {
                  setCursor(next);
                  setValue(history[next]);
                }
              } else if (e.key === "l" && e.ctrlKey) {
                e.preventDefault();
                setLines([]);
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-text caret-accent outline-none"
            placeholder="type help"
          />
        </form>
      </div>
    </div>
  );
}
