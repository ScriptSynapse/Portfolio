import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { machineSystems } from "../../data/systems";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const bootSequence = [
  "ENGINE........ONLINE",
  "ECU...........ONLINE",
  "TELEMETRY.....ONLINE",
  "DEFENCE.......ONLINE",
];

export function TechSystems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(machineSystems[0].id);

  const active = machineSystems.find((s) => s.id === activeId) ?? machineSystems[0];
  const cx = 50, cy = 50;

  return (
    <section className="relative py-24 sm:py-32 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 04B" title="MACHINE ARCHITECTURE" subtitle="An abstract systems blueprint of how the parts fit together." />

        <div ref={ref} className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div className="relative aspect-square w-full border border-line bg-carbon">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {/* Abstract chassis outline */}
              <motion.path
                d="M50 6 L62 22 L58 40 L50 50 L42 40 L38 22 Z M50 50 L22 45 M50 50 L78 45 M50 50 L50 55 L22 72 M50 55 L78 72 M50 55 L50 88"
                fill="none"
                stroke="#E30613"
                strokeWidth="0.4"
                strokeOpacity="0.55"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
              {machineSystems.map((s, i) => (
                <motion.line
                  key={s.id}
                  x1={cx}
                  y1={cy}
                  x2={s.x}
                  y2={s.y}
                  stroke="#F4F4F1"
                  strokeOpacity="0.15"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1 * i, ease: [0.65, 0, 0.35, 1] }}
                />
              ))}
            </svg>

            {machineSystems.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                data-cursor-hover
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                aria-pressed={activeId === s.id}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full border transition-colors duration-150 ${
                    activeId === s.id ? "bg-red border-red" : "bg-carbon border-line-strong group-hover:border-red"
                  }`}
                />
                <span
                  className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-mono text-[9px] tracking-[0.15em] transition-colors ${
                    activeId === s.id ? "text-red" : "text-grey-dim group-hover:text-ink"
                  }`}
                >
                  {s.label.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="border border-line p-5 text-mono text-[11px] tracking-[0.15em] text-grey">
              <div className="text-grey-dim mb-2">SYSTEM INITIALISATION</div>
              <div className="space-y-1">
                {bootSequence.map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: reduced ? 0 : 1 + i * 0.15, duration: 0.3 }}
                    className="text-online"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="border border-line-strong p-6"
            >
              <div className="text-mono text-[10px] tracking-[0.25em] text-red mb-1">{active.label.toUpperCase()}</div>
              <div className="text-display text-2xl font-semibold text-ink mb-4">{active.mapsTo}</div>
              <div className="flex flex-wrap gap-2">
                {active.technologies.map((t) => (
                  <span key={t} className="text-mono text-[10px] tracking-wider border border-line px-2.5 py-1 text-grey">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
