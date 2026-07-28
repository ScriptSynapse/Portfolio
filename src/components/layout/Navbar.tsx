import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { sections } from "../../data/navigation";
import { personal } from "../../data/personal";
import { StatusDot } from "../ui/StatusDot";

interface NavbarProps {
  activeId: string;
}

export function Navbar({ activeId }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled ? "bg-bg/90 border-line backdrop-blur-md" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4" aria-label="Primary">
        <button
          onClick={() => goTo("home")}
          className="text-display font-bold tracking-wide text-ink flex flex-col leading-none group"
        >
          <span className="text-xs text-grey group-hover:text-red transition-colors">PF</span>
          <span className="text-sm hidden sm:inline">{personal.name.toUpperCase()}</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1 text-mono text-xs tracking-[0.15em]">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              <button
                onClick={() => goTo(s.id)}
                className={`px-4 py-2 transition-colors ${
                  activeId === s.id ? "text-ink" : "text-grey hover:text-ink"
                }`}
              >
                {s.navLabel.toUpperCase()}
              </button>
              {activeId === s.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-red"
                  transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <StatusDot status={personal.status} />
          <a href={personal.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-grey hover:text-ink transition-colors">
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-grey hover:text-ink transition-colors">
            <LinkedinIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        <button
          className="lg:hidden text-ink p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-5 py-3 text-mono text-sm tracking-wider">
              {sections.map((s) => (
                <li key={s.id} className="border-b border-line/60 last:border-0">
                  <button
                    onClick={() => goTo(s.id)}
                    className={`w-full text-left py-3 flex items-center justify-between ${
                      activeId === s.id ? "text-red" : "text-grey"
                    }`}
                  >
                    {s.navLabel.toUpperCase()}
                    {activeId === s.id && <span className="h-1.5 w-1.5 rounded-full bg-red" />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between px-5 py-4 border-t border-line">
              <StatusDot status={personal.status} />
              <div className="flex gap-4">
                <a href={personal.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-grey">
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-grey">
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
