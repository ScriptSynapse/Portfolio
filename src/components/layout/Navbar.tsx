import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Command, Download, Menu, TerminalSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navSections } from "../../data/navigation";
import { personal } from "../../data/personal";
import { goToSection, navigate } from "../../lib/router";
import { isMac } from "../../hooks/useHotkeys";
import { BrandMark, GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  activeId: string;
  scrolled: boolean;
  progress: number;
  onOpenPalette: () => void;
  onHome: boolean;
}

export function Navbar({ activeId, scrolled, progress, onOpenPalette, onHome }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const solid = scrolled || !onHome || open;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goToSection(id);
  };

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-line bg-[var(--nav-bg)] backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" onClick={go("home")} className="flex min-w-0 items-center gap-3" aria-label={`${personal.name} — home`}>
            <BrandMark />
            <span className="hidden min-w-0 shrink-0 flex-col leading-tight sm:flex lg:hidden xl:flex">
              <span className="truncate text-sm font-semibold text-text">{personal.name}</span>
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-text-3">Cybersecurity Portfolio OS</span>
            </span>
          </a>

          <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
            {navSections.map((s) => {
              const active = onHome && activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={s.id === "home" ? "/" : `/${s.id}`}
                    onClick={go(s.id)}
                    aria-current={active ? "location" : undefined}
                    className={`relative block whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
                      active ? "text-text" : "text-text-2 hover:text-text"
                    }`}
                  >
                    {s.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full bg-accent shadow-[0_0_12px_var(--glow)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-lg border border-line bg-card/70 px-2.5 py-1.5 text-xs text-text-3 transition-colors hover:border-line-strong hover:text-text md:inline-flex"
              aria-label="Open command palette"
              aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
            >
              <Command size={13} />
              <span className="hidden 2xl:inline">Search</span>
              <kbd className="whitespace-nowrap rounded border border-line px-1.5 font-mono text-[10px] text-text-3">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href="/recruiter"
              onClick={(e) => {
                e.preventDefault();
                navigate("/recruiter");
              }}
              title="Recruiter mode — one-page summary"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-card/70 px-2.5 text-xs font-medium text-text-2 transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              <Briefcase size={14} aria-hidden="true" />
              <span className="hidden 2xl:inline">Recruiter</span>
              <span className="sr-only 2xl:hidden">Recruiter mode</span>
            </a>
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName}
              className="hidden items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-ink shadow-[0_8px_24px_-12px_var(--glow)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              type="button"
              onClick={onOpenPalette}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text-2 md:hidden"
              aria-label="Open command palette"
            >
              <Command size={16} />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {onHome && (
          <div className="h-px w-full bg-transparent" aria-hidden="true">
            <div className="h-px origin-left bg-accent/70" style={{ transform: `scaleX(${progress})` }} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
              <ul className="grid gap-1">
                {navSections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={s.id === "home" ? "/" : `/${s.id}`}
                      onClick={go(s.id)}
                      aria-current={onHome && activeId === s.id ? "location" : undefined}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-base font-medium transition-colors ${
                        onHome && activeId === s.id ? "border-accent/40 bg-accent-soft text-text" : "border-line bg-card/60 text-text-2"
                      }`}
                    >
                      {s.label}
                      <span className="font-mono text-[11px] text-text-3">{String(i).padStart(2, "0")}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ThemeToggle />
                <div className="flex items-center gap-2">
                  <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2">
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-text-2">
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <a
                href="/recruiter"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  navigate("/recruiter");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm font-medium text-accent"
              >
                <Briefcase size={16} /> Recruiter mode — one-page summary
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={personal.resumeUrl} download={personal.resumeFileName} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-ink">
                  <Download size={16} /> Resume
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    goToSection("about");
                    window.setTimeout(() => document.getElementById("terminal-input")?.focus({ preventScroll: true }), 600);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong px-4 py-3 text-sm font-medium text-text"
                >
                  <TerminalSquare size={16} /> Terminal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
