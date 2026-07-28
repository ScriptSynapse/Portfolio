import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { experience } from "../../data/experience";

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 03" title="RACE HISTORY" />

        <div ref={containerRef} className="relative mt-16 pl-10 sm:pl-14">
          <div className="absolute left-[7px] sm:left-[11px] top-1 bottom-1 w-px bg-line" aria-hidden="true" />
          <motion.div
            className="absolute left-[7px] sm:left-[11px] top-1 w-px bg-red origin-top"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          <ol className="space-y-14">
            {experience.map((exp) => (
              <li key={exp.id} className="relative">
                <span className="absolute -left-10 sm:-left-14 top-1.5 h-3.5 w-3.5 rounded-full bg-bg border-2 border-red" />

                <div className="text-mono text-xs tracking-[0.25em] text-red mb-2">{exp.season}</div>
                <h3 className="text-display text-2xl sm:text-3xl font-semibold text-ink">{exp.role}</h3>
                <div className="text-mono text-sm tracking-wide text-grey mt-1">{exp.organisation}</div>
                <p className="mt-3 max-w-2xl text-grey leading-relaxed">{exp.description}</p>

                <ul className="mt-4 space-y-2 max-w-2xl">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm text-grey leading-relaxed">
                      <span className="text-red mt-[3px] shrink-0">▸</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-mono text-[10px] tracking-wider text-grey-dim">
                  {exp.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
