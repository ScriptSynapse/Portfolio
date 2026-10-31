import { motion } from "framer-motion";
import { sections } from "../../data/navigation";
import { goToSection } from "../../lib/router";

/** Fixed side tracker (wide screens): one dot per section, active one expands. */
export function SectionRail({ activeId }: { activeId: string }) {
  return (
    <nav aria-label="Section tracker" className="no-print fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
      <ol className="flex flex-col items-end gap-3">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goToSection(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={active ? "location" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                    active ? "translate-x-0 text-accent opacity-100" : "translate-x-2 text-text-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.code} {s.label}
                </span>
                <span className="relative flex h-3 w-6 items-center justify-end">
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={`block h-[3px] rounded-full ${active ? "w-6 bg-accent shadow-[0_0_10px_var(--glow)]" : "w-2.5 bg-line-strong group-hover:w-4 group-hover:bg-text-3"}`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
