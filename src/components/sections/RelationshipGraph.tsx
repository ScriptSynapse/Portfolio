import { codeOf } from "../../data/navigation";
import { useMemo, useState } from "react";
import { categoryLabel, sortedProjects } from "../../data/projects";
import { arsenal } from "../../data/skills";
import { navigate } from "../../lib/router";
import type { ProjectCategory } from "../../types/portfolio";
import { Reveal, Section, SectionHeader } from "../ui/primitives";

type Kind = "tech" | "project" | "domain";

interface GNode {
  id: string;
  label: string;
  kind: Kind;
  detail: string;
  x: number;
  y: number;
}

/** Technology nodes and the project technology names that map onto them. */
const TECH: { label: string; match: string[] }[] = [
  { label: "Python", match: ["Python"] },
  { label: "JavaScript", match: ["JavaScript"] },
  { label: "Flask", match: ["Flask"] },
  { label: "FastAPI", match: ["FastAPI"] },
  { label: "React", match: ["React"] },
  { label: "WebSockets", match: ["WebSockets", "aiohttp"] },
  { label: "MySQL", match: ["MySQL"] },
  { label: "SQLite", match: ["SQLite"] },
  { label: "Random Forest", match: ["Random Forest"] },
  { label: "XGBoost", match: ["XGBoost"] },
  { label: "Scikit-learn", match: ["Scikit-learn"] },
  { label: "YARA", match: ["YARA", "YARA-X"] },
  { label: "Web Crypto", match: ["Web Crypto API", "AES-256-GCM", "PBKDF2"] },
  { label: "Wireshark / Scapy", match: ["Wireshark", "Scapy"] },
  { label: "Docker", match: ["Docker"] },
];

const DOMAINS: ProjectCategory[] = ["cybersecurity", "forensics", "ai-ml", "software"];

const W = 1000;
const H = 640;

function usageFor(label: string): string | undefined {
  for (const cat of arsenal) {
    const hit = cat.items.find((i) => i.name.toLowerCase().startsWith(label.toLowerCase().split(" ")[0]));
    if (hit) return hit.usage;
  }
  return undefined;
}

function buildGraph() {
  const nodes: GNode[] = [];
  const edges: [string, string][] = [];

  const col = (items: number, i: number, top = 40, bottom = H - 40) =>
    items === 1 ? H / 2 : top + (i * (bottom - top)) / (items - 1);

  TECH.forEach((t, i) =>
    nodes.push({ id: `t:${t.label}`, label: t.label, kind: "tech", detail: usageFor(t.label) ?? "Technology used in the linked projects.", x: 150, y: col(TECH.length, i) })
  );
  sortedProjects.forEach((p, i) =>
    nodes.push({ id: `p:${p.id}`, label: p.shortTitle, kind: "project", detail: p.tagline, x: 500, y: col(sortedProjects.length, i, 90, H - 90) })
  );
  DOMAINS.forEach((d, i) => {
    const y = col(DOMAINS.length, i, 110, H - 110);
    const n = sortedProjects.filter((p) => p.categories.includes(d)).length;
    nodes.push({ id: `d:${d}`, label: categoryLabel[d], kind: "domain", detail: `${n} project${n === 1 ? "" : "s"} in this domain.`, x: 850, y });
  });

  sortedProjects.forEach((p) => {
    TECH.forEach((t) => {
      if (t.match.some((m) => p.technologies.includes(m))) edges.push([`t:${t.label}`, `p:${p.id}`]);
    });
    p.categories.forEach((c) => edges.push([`p:${p.id}`, `d:${c}`]));
  });

  // Drop technology nodes that ended up with no project edge.
  const used = new Set(edges.flat());
  return { nodes: nodes.filter((n) => n.kind !== "tech" || used.has(n.id)), edges };
}

const kindStyle: Record<Kind, { fill: string; label: string }> = {
  tech: { fill: "var(--accent)", label: "Technology" },
  project: { fill: "var(--accent-3)", label: "Project" },
  domain: { fill: "var(--accent-2)", label: "Domain" },
};

export function RelationshipGraph() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [selected, setSelected] = useState<string>(`p:${sortedProjects[0].id}`);
  const [hover, setHover] = useState<string | null>(null);
  const focus = hover ?? selected;

  const neighbours = useMemo(() => {
    const set = new Set<string>([focus]);
    edges.forEach(([a, b]) => {
      if (a === focus) set.add(b);
      if (b === focus) set.add(a);
    });
    return set;
  }, [edges, focus]);

  const sel = byId.get(selected)!;
  const connections = edges
    .filter(([a, b]) => a === selected || b === selected)
    .map(([a, b]) => byId.get(a === selected ? b : a)!)
    .filter(Boolean);

  return (
    <Section id="graph" labelledBy="graph-title">
      <SectionHeader
        id="graph-title"
        code={codeOf("graph")}
        eyebrow="Intelligence graph"
        title="How the work connects."
        description="Technologies on the left, projects in the middle, domains on the right. Select any node to trace its relationships."
      />
      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="panel overflow-x-auto p-2 sm:p-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[720px]" role="group" aria-label="Relationship graph of technologies, projects and domains">
              <g fill="none">
                {edges.map(([a, b]) => {
                  const na = byId.get(a);
                  const nb = byId.get(b);
                  if (!na || !nb) return null;
                  const active = neighbours.has(a) && neighbours.has(b) && (a === focus || b === focus);
                  const mx = (na.x + nb.x) / 2;
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={`M${na.x},${na.y} C${mx},${na.y} ${mx},${nb.y} ${nb.x},${nb.y}`}
                      stroke={active ? "var(--accent)" : "var(--line-strong)"}
                      strokeOpacity={active ? 0.9 : 0.55}
                      strokeWidth={active ? 1.8 : 1}
                      style={{ transition: "stroke 0.25s, stroke-opacity 0.25s" }}
                    />
                  );
                })}
              </g>
              {nodes.map((n) => {
                const dim = !neighbours.has(n.id);
                const isSel = n.id === selected;
                const r = n.kind === "project" ? 9 : 6;
                const anchor = n.kind === "tech" ? "end" : n.kind === "project" ? "middle" : "start";
                const tx = n.kind === "tech" ? -14 : n.kind === "project" ? 0 : 14;
                const ty = n.kind === "project" ? -16 : 4;
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x},${n.y})`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSel}
                    aria-label={`${kindStyle[n.kind].label}: ${n.label}`}
                    onClick={() => setSelected(n.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(n.id);
                      }
                    }}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(n.id)}
                    onBlur={() => setHover(null)}
                    className="cursor-pointer outline-none"
                    style={{ opacity: dim ? 0.32 : 1, transition: "opacity 0.25s" }}
                  >
                    <circle r={r + 10} fill="transparent" />
                    {isSel && <circle r={r + 6} fill="none" stroke={kindStyle[n.kind].fill} strokeOpacity="0.5" />}
                    <circle r={r} fill={kindStyle[n.kind].fill} stroke="var(--bg)" strokeWidth="2" />
                    <text
                      x={tx}
                      y={ty}
                      textAnchor={anchor}
                      fill="var(--text)"
                      fontSize={n.kind === "project" ? 15 : 13}
                      fontWeight={n.kind === "project" ? 600 : 500}
                      fontFamily="var(--font-sans)"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <aside className="panel p-5" aria-live="polite">
            <p className="label-mono" style={{ color: kindStyle[sel.kind].fill }}>
              {kindStyle[sel.kind].label}
            </p>
            <h3 className="font-display mt-2 text-xl font-semibold text-text">{sel.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-2">{sel.detail}</p>
            {sel.kind === "project" && (
              <button
                type="button"
                onClick={() => {
                  navigate(`/projects/${sel.id.slice(2)}`);
                  window.scrollTo({ top: 0 });
                }}
                className="mt-4 inline-flex rounded-lg bg-accent-soft px-3 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Open case study →
              </button>
            )}
            <p className="label-mono mt-6 text-text-3">Connected to · {connections.length}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {connections.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(c.id)}
                    className="rounded-md border border-line px-2 py-1 text-[12px] text-text-2 transition-colors hover:border-accent/40 hover:text-text"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-4">
              {(["tech", "project", "domain"] as Kind[]).map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 text-[11px] text-text-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: kindStyle[k].fill }} />
                  {kindStyle[k].label}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Reveal>
    </Section>
  );
}
