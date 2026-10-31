import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { useRef } from "react";
import { careerTimeline as experienceEntries, leadership } from "../../data/experience";
import { codeOf } from "../../data/navigation";
import type { TimelineEntry } from "../../types/portfolio";
import { Corners, Section, SectionHeader, Tag } from "../ui/primitives";
import { LeadershipCard } from "./Leadership";

function SubHeading({ index, title, count }: { index: string; title: string; count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6 flex items-center gap-4"
    >
      <span className="font-mono text-[11px] text-accent">{index}</span>
      <h3 className="font-display text-xl font-semibold text-text sm:text-2xl">{title}</h3>
      <motion.span
        aria-hidden="true"
        className="h-px flex-1 origin-left bg-gradient-to-r from-line-strong to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <span className="font-mono text-[11px] text-text-3">{String(count).padStart(2, "0")}</span>
    </motion.div>
  );
}

function ExperienceCard({ entry }: { entry: TimelineEntry }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="panel relative grid overflow-hidden md:grid-cols-[260px_1fr]"
      aria-labelledby={`exp-${entry.id}`}
    >
      <Corners />
      {/* left rail */}
      <div className="relative border-b border-line bg-bg-2/40 p-6 md:border-b-0 md:border-r sm:p-8">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent"
        >
          <Briefcase size={24} aria-hidden="true" />
        </motion.span>
        <p className="label-mono mt-6 text-accent">Experience</p>
        <ul className="mt-3 grid gap-2 font-mono text-[12px] text-text-2">
          <li className="flex items-center gap-2">
            <CalendarDays size={13} className="text-text-3" aria-hidden="true" />
            {entry.period}
          </li>
          {entry.location && (
            <li className="flex items-center gap-2">
              <MapPin size={13} className="text-text-3" aria-hidden="true" />
              {entry.location}
            </li>
          )}
        </ul>
        {/* scroll-drawn progress line */}
        <div aria-hidden="true" className="absolute bottom-6 left-8 top-[11.5rem] hidden w-px bg-line md:block">
          <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2" />
        </div>
      </div>

      {/* content */}
      <div className="p-6 sm:p-8">
        <h4 id={`exp-${entry.id}`} className="font-display text-2xl font-semibold leading-tight text-text sm:text-3xl">
          {entry.role}
        </h4>
        <p className="mt-1 text-[15px] font-medium text-accent">{entry.organisation}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-text-2">{entry.description}</p>
        <ol className="mt-6 grid gap-3">
          {entry.responsibilities.map((r, i) => (
            <motion.li
              key={r}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 rounded-xl border border-line bg-card/50 p-4 text-[14.5px] leading-relaxed text-text-2 transition-colors hover:border-accent/30"
            >
              <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              {r}
            </motion.li>
          ))}
        </ol>
        {entry.technologies && (
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tools used">
            {entry.technologies.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.3 + i * 0.04 }}
              >
                <Tag>{t}</Tag>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title" className="bg-bg-2/30">
      <SectionHeader
        id="experience-title"
        code={codeOf("experience")}
        eyebrow="Experience & leadership"
        title="Hands-on security work and leading teams."
        description="A security internship spanning incident investigation and offensive testing, plus organising roles at college hackathons."
      />

      <SubHeading index="A" title="Professional experience" count={experienceEntries.length} />
      <div className="grid gap-6">
        {experienceEntries.map((e) => (
          <ExperienceCard key={e.id} entry={e} />
        ))}
      </div>

      <div id="leadership" className="mt-16 scroll-mt-28">
        <SubHeading index="B" title="Leadership" count={leadership.length} />
        <div className="grid gap-6 lg:grid-cols-2">
          {leadership.map((entry, i) => (
            <LeadershipCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
