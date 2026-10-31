import { useState } from "react";
import type { Project } from "../../types/portfolio";

const kindColor: Record<string, string> = {
  client: "var(--accent-2)",
  service: "var(--accent)",
  data: "var(--accent-3)",
  external: "var(--text-3)",
  worker: "var(--accent)",
};

const kindLabel: Record<string, string> = {
  client: "Client",
  service: "Service",
  data: "Data store",
  external: "External",
  worker: "Worker",
};

const NW = 15.5;
const NH = 8;

/** Interactive architecture diagram rendered from project data. */
export function ArchitectureDiagram({ architecture }: { architecture: NonNullable<Project["architecture"]> }) {
  const { nodes, edges, caption } = architecture;
  const [active, setActive] = useState(nodes[1]?.id ?? nodes[0].id);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const sel = byId.get(active)!;
  const linked = new Set(edges.filter((e) => e.from === active || e.to === active).flatMap((e) => [e.from, e.to]));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="panel overflow-x-auto p-3 sm:p-5">
        <svg viewBox="0 0 100 60" className="h-auto w-full min-w-[640px]" role="group" aria-label={`Architecture diagram. ${caption}`}>
          <defs>
            <marker id="arch-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--text-3)" />
            </marker>
            <marker id="arch-arrow-active" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--accent)" />
            </marker>
          </defs>
          {edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const on = e.from === active || e.to === active;
            // Clip the line to the node rectangles.
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const clip = (t: number) => {
              const tx = Math.abs(dx) > 0 ? (NW / 2 + 0.6) / Math.abs(dx) : Infinity;
              const ty = Math.abs(dy) > 0 ? (NH / 2 + 0.6) / Math.abs(dy) : Infinity;
              return Math.min(tx, ty, t);
            };
            const s = clip(0.5);
            const x1 = a.x + dx * s;
            const y1 = a.y + dy * s;
            const x2 = b.x - dx * s;
            const y2 = b.y - dy * s;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={on ? "var(--accent)" : "var(--line-strong)"}
                  strokeWidth={on ? 0.35 : 0.25}
                  strokeDasharray={on ? "1 0.8" : undefined}
                  markerEnd={`url(#${on ? "arch-arrow-active" : "arch-arrow"})`}
                >
                  {on && <animate attributeName="stroke-dashoffset" from="1.8" to="0" dur="0.8s" repeatCount="indefinite" />}
                </line>
                {e.label && (
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 0.9} textAnchor="middle" fontSize="1.9" fill="var(--text-3)" fontFamily="var(--font-mono)">
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map((n) => {
            const isActive = n.id === active;
            const dim = !isActive && !linked.has(n.id);
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - NW / 2},${n.y - NH / 2})`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${n.label}: ${n.detail}`}
                onClick={() => setActive(n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(n.id);
                  }
                }}
                className="cursor-pointer outline-none"
                style={{ opacity: dim ? 0.55 : 1, transition: "opacity 0.2s" }}
              >
                <rect
                  width={NW}
                  height={NH}
                  rx="1.4"
                  fill={isActive ? "var(--accent-soft)" : "var(--card)"}
                  stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
                  strokeWidth={isActive ? 0.4 : 0.25}
                />
                <rect x="0" y="0" width="0.8" height={NH} rx="0.4" fill={kindColor[n.kind ?? "service"]} />
                <text x={NW / 2 + 0.3} y={NH / 2 - 0.2} textAnchor="middle" fontSize="2.25" fontWeight="600" fill="var(--text)" fontFamily="var(--font-sans)">
                  {n.label}
                </text>
                <text x={NW / 2 + 0.3} y={NH / 2 + 2.4} textAnchor="middle" fontSize="1.55" fill="var(--text-3)" fontFamily="var(--font-mono)">
                  {kindLabel[n.kind ?? "service"].toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="panel p-5" aria-live="polite">
        <p className="label-mono" style={{ color: kindColor[sel.kind ?? "service"] }}>
          {kindLabel[sel.kind ?? "service"]}
        </p>
        <h4 className="font-display mt-2 text-lg font-semibold text-text">{sel.label}</h4>
        <p className="mt-2 text-sm leading-relaxed text-text-2">{sel.detail}</p>
        <p className="label-mono mt-5 text-text-3">Connections</p>
        <ul className="mt-2 grid gap-1.5">
          {edges
            .filter((e) => e.from === active || e.to === active)
            .map((e) => {
              const other = byId.get(e.from === active ? e.to : e.from)!;
              return (
                <li key={`${e.from}-${e.to}`}>
                  <button type="button" onClick={() => setActive(other.id)} className="flex w-full items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-left text-[12.5px] text-text-2 transition-colors hover:border-accent/40 hover:text-text">
                    <span className="font-mono text-text-3">{e.from === active ? "→" : "←"}</span>
                    {other.label}
                    {e.label && <span className="ml-auto font-mono text-[10px] text-text-3">{e.label}</span>}
                  </button>
                </li>
              );
            })}
        </ul>
        <p className="mt-5 text-[12px] text-text-3">{caption}</p>
      </aside>
    </div>
  );
}
