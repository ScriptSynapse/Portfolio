import { Activity } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { personal } from "../../data/personal";
import { sections } from "../../data/navigation";
import { buildDate, metrics, site } from "../../data/site";
import { formatDate, pad2 } from "../../lib/format";
import { goToSection } from "../../lib/router";
import { useTheme } from "../../lib/theme-context";
import { useCountUp } from "../../hooks/useCountUp";
import { Panel, StatusDot } from "../ui/primitives";


export function SystemStatusPanel() {
  const { preference, resolved } = useTheme();
  const modules = sections.filter((s) => s.id !== "home");
  const rows: [string, React.ReactNode][] = [
    [
      "Portfolio OS",
      <span key="os" className="inline-flex items-center gap-2 text-accent-2">
        <StatusDot /> Online
      </span>,
    ],
    ["Last updated", <time key="upd" dateTime={buildDate.toISOString()}>{formatDate(buildDate)}</time>],
    ["Modules", `${pad2(site.moduleCount)} available`],
    ["Display theme", <span key="theme" className="capitalize">{preference === "system" ? `System · ${resolved}` : resolved}</span>],
    ["Availability", personal.availability],
  ];
  return (
    <Panel title="System status" meta={<Activity size={12} className="text-accent" aria-hidden="true" />} bodyClassName="px-5 py-3">
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label-mono text-text-3">{k}</dt>
            <dd className="text-right text-[13px] font-medium text-text">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-1.5 border-t border-line pb-2 pt-3">
        {modules.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => goToSection(m.id)}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-3 transition-colors hover:border-accent/50 hover:text-accent"
          >
            {m.code} {m.label}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function MetricTile({ label, value, detail }: { label: string; value: number; detail: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const n = useCountUp(value, inView, 900);
  return (
    <div ref={ref} className="rounded-lg border border-line bg-bg-2/40 p-3.5">
      <div className="font-display text-3xl font-semibold tabular-nums text-text">
        {pad2(n)}
        <span className="sr-only"> {label}</span>
      </div>
      <div className="mt-1 text-[12px] font-medium text-text-2" aria-hidden="true">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-text-3">{detail}</div>
    </div>
  );
}

export function OperatorMetrics({ wide = false }: { wide?: boolean }) {
  return (
    <Panel title="Operator metrics" meta="derived from portfolio data" bodyClassName="p-3">
      <div className={`grid grid-cols-2 gap-2.5 ${wide ? "md:grid-cols-4" : ""}`}>
        {metrics.map((m) => (
          <MetricTile key={m.label} {...m} />
        ))}
      </div>
    </Panel>
  );
}
