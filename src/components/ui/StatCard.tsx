import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import type { StatItem } from "../../types/portfolio";

export function StatCard({ label, value, suffix }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, inView);

  return (
    <div ref={ref} className="border border-line bg-surface/50 px-5 py-4">
      <div className="text-display text-4xl font-bold text-ink tabular-nums">
        {count}
        {suffix ?? "+"}
      </div>
      <div className="mt-1 text-mono text-[10px] tracking-[0.2em] text-grey">{label.toUpperCase()}</div>
    </div>
  );
}
