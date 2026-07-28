import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { experience } from "../../data/experience";

export function ExperienceTimeline() {
  return (
      <section id="experience" className="relative py-24 sm:py-32 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading sector="SECTOR 03" title="RACE HISTORY" subtitle="Every season, a new circuit." />

          <div className="relative mt-14 pl-8 sm:pl-10">
            <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />

            <ol className="space-y-8">
              {experience.map((exp, i) => (
                  <motion.li
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
                      className="relative"
                  >
                    <span className="absolute -left-8 sm:-left-10 top-6 h-2.5 w-2.5 rounded-full bg-red ring-4 ring-red/15" />

                    <div className="border border-line hover:border-line-strong transition-colors duration-200 bg-carbon p-6">
                      <div className="text-mono text-xs tracking-[0.25em] text-red mb-3">{exp.season}</div>

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <h3 className="text-display text-xl sm:text-2xl font-bold text-ink">{exp.role}</h3>
                        <span className="text-mono text-xs tracking-wider text-grey-dim shrink-0">{exp.organisation}</span>
                      </div>

                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                        {exp.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2.5 text-sm text-grey leading-relaxed">
                              <span className="h-[3px] w-3 bg-red shrink-0 mt-[9px]" />
                              <span>{r}</span>
                            </li>
                        ))}
                      </ul>

                      {exp.technologies.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((t) => (
                                <span key={t} className="text-mono text-[10px] tracking-wider border border-line px-2 py-1 text-grey-dim">
                          {t}
                        </span>
                            ))}
                          </div>
                      ) : null}

                      <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-line">
                    <span className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">
                      {"ROUND " + String(i + 1).padStart(2, "0")}
                    </span>
                        <div className="flex-1 h-px bg-line" />
                        <span className="text-mono text-[10px] tracking-[0.2em] text-red">FASTEST LAP</span>
                      </div>
                    </div>
                  </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
  );
}
