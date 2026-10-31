import { codeOf } from "../../data/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Brain, Cloud, Code2, Database, Fingerprint, Layers, Monitor, Network, Radar } from "lucide-react";
import { useMemo, useState } from "react";
import { arsenal, levelLabel, skillCount } from "../../data/skills";
import { getProject, projects } from "../../data/projects";
import { navigate } from "../../lib/router";
import type { ArsenalCategory, ArsenalItem } from "../../types/portfolio";
import { Reveal, Section, SectionHeader } from "../ui/primitives";

const icons: Record<ArsenalCategory["icon"], typeof Code2> = {
  code: Code2,
  radar: Radar,
  activity: Activity,
  fingerprint: Fingerprint,
  brain: Brain,
  network: Network,
  layers: Layers,
  database: Database,
  monitor: Monitor,
  cloud: Cloud,
};

function openProject(id: string) {
  navigate(`/projects/${id}`);
  window.scrollTo({ top: 0 });
}

function ProjectChip({ id }: { id: string }) {
  const p = getProject(id);
  if (!p) return null;
  return (
    <button
      type="button"
      onClick={() => openProject(id)}
      className="rounded-md border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10.5px] text-accent transition-colors hover:bg-accent hover:text-accent-ink"
    >
      {p.shortTitle}
    </button>
  );
}

/** 1 — Most-used tools, ranked by how many projects actually use them. */
function MostUsed() {
  const top = useMemo(() => {
    const all: (ArsenalItem & { cat: string })[] = arsenal.flatMap((c) => c.items.map((i) => ({ ...i, cat: c.label })));
    return all
      .filter((i) => (i.projects?.length ?? 0) >= 2)
      .sort((a, b) => (b.projects?.length ?? 0) - (a.projects?.length ?? 0))
      .slice(0, 6);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {top.map((t, i) => {
        const n = t.projects?.length ?? 0;
        return (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="panel p-4"
          >
            <p className="font-display text-lg font-semibold text-text">{t.name}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-text-3">{t.cat}</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="font-display text-3xl font-bold tabular-nums text-accent">{n}</span>
              <span className="pb-1 text-[11px] text-text-3">
                of {projects.length} projects
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                initial={{ width: 0 }}
                whileInView={{ width: `${(n / projects.length) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/** 2 — Every tool on one screen, grouped by domain. */
function AtAGlance({ onPick }: { onPick: (catId: string) => void }) {
  return (
    <div className="panel divide-y divide-line overflow-hidden">
      {arsenal.map((cat, ci) => {
        const Icon = icons[cat.icon];
        return (
          <div key={cat.id} className="grid gap-3 px-5 py-4 md:grid-cols-[15rem_1fr] md:items-center">
            <button type="button" onClick={() => onPick(cat.id)} className="group flex items-center gap-3 text-left">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft text-accent transition-transform group-hover:scale-110">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text group-hover:text-accent">{cat.label}</span>
                <span className="block font-mono text-[10px] text-text-3">{cat.items.length} tools · view proof ↓</span>
              </span>
            </button>
            <ul className="flex flex-wrap gap-1.5">
              {cat.items.map((item, i) => {
                const proven = (item.projects?.length ?? 0) > 0;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 22, delay: ci * 0.04 + i * 0.03 }}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12.5px] ${
                      proven ? "border-accent/35 bg-accent-soft text-text" : "border-line bg-bg-2/40 text-text-2"
                    }`}
                  >
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${proven ? "bg-accent" : "border border-text-3"}`} />
                    {item.name}
                    {proven && <span className="sr-only"> (used in a project)</span>}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-4 bg-bg-2/40 px-5 py-3 text-[11px] text-text-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Used in a project
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full border border-text-3" /> Internship, coursework or listed skill
        </span>
      </div>
    </div>
  );
}

/** 3 — Tabbed proof table: what, how, where. */
function ProofTable({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const cat = arsenal.find((c) => c.id === active) ?? arsenal[0];
  return (
    <div id="arsenal-proof" className="panel scroll-mt-28 overflow-hidden">
      <div role="tablist" aria-label="Skill domains" className="flex flex-wrap gap-1.5 border-b border-line bg-bg-2/30 p-3">
        {arsenal.map((c) => {
          const Icon = icons[c.icon];
          const on = c.id === cat.id;
          return (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls="arsenal-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = arsenal.findIndex((x) => x.id === c.id);
                const next = arsenal[(i + (e.key === "ArrowRight" ? 1 : arsenal.length - 1)) % arsenal.length];
                setActive(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }}
              className={`relative isolate inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors ${
                on ? "border-accent/45 text-text" : "border-line text-text-2 hover:border-line-strong hover:text-text"
              }`}
            >
              <Icon size={14} aria-hidden="true" className={on ? "text-accent" : ""} />
              {c.label}
              <span className="font-mono text-[10px] text-text-3">{c.items.length}</span>
              {on && <motion.span layoutId="arsenal-tab" className="absolute inset-0 -z-10 rounded-lg bg-accent-soft" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            </button>
          );
        })}
      </div>

      <div id="arsenal-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`}>
        <div className="hidden grid-cols-[13rem_1fr_15rem] gap-6 border-b border-line bg-bg-2/40 px-6 py-2.5 md:grid">
          <span className="label-mono text-text-3">Tool</span>
          <span className="label-mono text-text-3">How I used it</span>
          <span className="label-mono text-text-3">Proof</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.ul
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="divide-y divide-line"
          >
            {cat.items.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-2 px-6 py-4 transition-colors hover:bg-accent-soft/40 md:grid-cols-[13rem_1fr_15rem] md:items-center md:gap-6"
              >
                <div className="flex items-center justify-between gap-2 md:block">
                  <p className="text-[15px] font-semibold text-text">{item.name}</p>
                  {item.level && <p className="font-mono text-[9.5px] uppercase tracking-wider text-text-3 md:mt-0.5">{levelLabel[item.level]}</p>}
                </div>
                <p className="text-sm leading-relaxed text-text-2">{item.usage}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.projects?.map((pid) => <ProjectChip key={pid} id={pid} />)}
                  {item.evidence?.map((e) => (
                    <span key={e} className="rounded-md border border-line px-2 py-0.5 font-mono text-[10.5px] text-text-2">
                      {e}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Arsenal() {
  const [active, setActive] = useState(arsenal[0].id);
  const pick = (id: string) => {
    setActive(id);
    document.getElementById("arsenal-proof")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section id="skills" labelledBy="skills-title" className="bg-bg-2/30">
      <SectionHeader
        id="skills-title"
        code={codeOf("skills")}
        eyebrow="Technical arsenal"
        title="Tools I have actually used — and where."
        description={`${skillCount} tools across ${arsenal.length} domains. Scan the overview, then open any domain to see exactly where each tool was used — every claim links to a project, the internship or coursework.`}
      />

      <Reveal>
        <p className="label-mono mb-3 text-text-3">01 · Most used across projects</p>
      </Reveal>
      <MostUsed />

      <Reveal className="mt-10">
        <p className="label-mono mb-3 text-text-3">02 · Everything at a glance</p>
        <AtAGlance onPick={pick} />
      </Reveal>

      <Reveal className="mt-10">
        <p className="label-mono mb-3 text-text-3">03 · Proof of use</p>
        <ProofTable active={active} setActive={setActive} />
      </Reveal>
    </Section>
  );
}
