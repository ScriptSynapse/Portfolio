import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Purely decorative, original SVG geometry: coordinate ticks, a racing-line
 * style path, and data markers. No copyrighted track maps or team assets.
 */
export function TechnicalBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-grid opacity-[0.35]" aria-hidden="true">
      <svg
        className="absolute -top-10 left-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-50 650 L200 650 L280 480 L420 480 L520 620 L700 620 L780 300 L980 300 L1050 420 L1300 420"
          stroke="#E30613"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          className={reduced ? "" : "animate-[scan_18s_linear_infinite]"}
        />
        <path
          d="M-50 200 L150 200 L230 340 L500 340 L560 150 L860 150 L920 260 L1300 260"
          stroke="#F4F4F1"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {[
          [200, 650], [420, 480], [700, 620], [980, 300], [150, 200], [560, 150],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="#F4F4F1" fillOpacity={0.6} />
        ))}
      </svg>
    </div>
  );
}
