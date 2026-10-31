import { arsenal } from "../../data/skills";

/** Endless ticker of every tool in the arsenal (decorative duplicate of real data). */
export function Marquee({ className = "" }: { className?: string }) {
  const items = arsenal.flatMap((c) => c.items.map((i) => i.name));
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.18em] text-text-3">
          {t}
          <span className="h-1 w-1 rotate-45 bg-accent/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className={`marquee relative overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
