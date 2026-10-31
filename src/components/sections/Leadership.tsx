import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Flag, Users } from "lucide-react";
import { useTilt } from "../../hooks/useTilt";
import type { TimelineEntry } from "../../types/portfolio";
import { Corners } from "../ui/primitives";

const icons = [Flag, Users];

export function LeadershipCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const tilt = useTilt(3);
  const Icon = icons[index % icons.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={tilt.style}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="panel group relative flex h-full flex-col overflow-hidden p-6 sm:p-8"
      aria-labelledby={`lead-${entry.id}`}
    >
      <Corners className="border-accent-3/60" />
      {/* animated top beam */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent-3 via-accent to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-3-soft blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent-3/30 bg-accent-3-soft text-accent-3 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-text-2">
          <CalendarDays size={12} aria-hidden="true" />
          {entry.period}
        </span>
      </div>

      <p className="label-mono relative mt-6 text-accent-3">Leadership · Role {String(index + 1).padStart(2, "0")}</p>
      <h3 id={`lead-${entry.id}`} className="font-display relative mt-2 text-2xl font-semibold leading-tight text-text sm:text-[1.75rem]">
        {entry.role}
      </h3>
      <p className="relative mt-1 text-[15px] font-medium text-accent">{entry.organisation}</p>

      <ul className="relative mt-6 grid gap-3">
        {entry.responsibilities.map((r, i) => (
          <motion.li
            key={r}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 + index * 0.12 + i * 0.1 }}
            className="flex gap-3 text-[15px] leading-relaxed text-text-2"
          >
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-2" aria-hidden="true" />
            {r}
          </motion.li>
        ))}
      </ul>

      {entry.highlights && (
        <ul className="relative mt-auto flex flex-wrap gap-2 pt-7" aria-label="Focus areas">
          {entry.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 + index * 0.12 + i * 0.06 }}
              className="rounded-md border border-accent-3/30 bg-accent-3-soft px-2.5 py-1 font-mono text-[11px] text-accent-3"
            >
              {h}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
