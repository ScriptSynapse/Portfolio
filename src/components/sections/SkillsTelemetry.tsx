import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { skillCategories } from "../../data/skills";
import type { SkillLevel } from "../../types/portfolio";

const LEVELS: SkillLevel[] = ["LEARNING", "WORKING KNOWLEDGE", "PROFICIENT", "ADVANCED"];
const levelIndex = (level: SkillLevel) => LEVELS.indexOf(level) + 1;

function SkillBar({ name, level }: { name: string; level: SkillLevel }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const filled = levelIndex(level);

  return (
    <div ref={ref} className="py-3 border-b border-line last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ink">{name}</span>
        <span className="text-mono text-[10px] tracking-[0.15em] text-grey">{level}</span>
      </div>
      <div className="flex gap-1.5">
        {LEVELS.map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView && i < filled ? 1 : 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "left" }}
            className={`h-1.5 flex-1 origin-left ${i < filled ? "bg-red" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsTelemetry() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 04" title="SYSTEM TELEMETRY" />

        <div className="mt-14 grid sm:grid-cols-2 gap-x-12 gap-y-12">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-mono text-xs tracking-[0.3em] text-grey-dim mb-1">{cat.label.toUpperCase()}</h3>
              <div>
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
