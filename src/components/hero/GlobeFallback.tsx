/** Lightweight SVG globe used when WebGL is unavailable or data-saver is on. */
export function GlobeFallback() {
  const lats = [-60, -30, 0, 30, 60];
  const lons = [0, 30, 60, 90, 120, 150];
  const nodes = [
    { x: 228, y: 176, home: true },
    { x: 290, y: 214 },
    { x: 150, y: 140 },
    { x: 316, y: 150 },
    { x: 190, y: 250 },
    { x: 120, y: 205 },
    { x: 262, y: 118 },
  ];
  const home = nodes[0];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="gf-fill" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="var(--card-2)" />
          <stop offset="100%" stopColor="var(--bg)" />
        </radialGradient>
        <radialGradient id="gf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#gf-glow)" />
      <circle cx="200" cy="200" r="128" fill="url(#gf-fill)" stroke="var(--accent)" strokeOpacity="0.35" />
      <g fill="none" stroke="var(--accent)" strokeOpacity="0.16">
        {lats.map((l) => {
          const y = 200 - 128 * Math.sin((l * Math.PI) / 180);
          const rx = 128 * Math.cos((l * Math.PI) / 180);
          return <ellipse key={l} cx="200" cy={y} rx={rx} ry={rx * 0.12} />;
        })}
        {lons.map((l) => (
          <ellipse key={l} cx="200" cy="200" rx={Math.abs(128 * Math.cos((l * Math.PI) / 180))} ry="128" />
        ))}
      </g>
      <g fill="none" strokeWidth="1.2">
        {nodes.slice(1).map((n, i) => (
          <path
            key={i}
            d={`M${home.x},${home.y} Q${(home.x + n.x) / 2},${Math.min(home.y, n.y) - 40} ${n.x},${n.y}`}
            stroke={i % 2 ? "var(--accent)" : "var(--accent-3)"}
            strokeOpacity="0.55"
            strokeDasharray="3 4"
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.home ? 5 : 3} fill={n.home ? "var(--accent-3)" : "var(--accent)"} />
      ))}
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        <ellipse cx="200" cy="200" rx="170" ry="44" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeDasharray="2 6" />
      </g>
      <ellipse cx="200" cy="200" rx="186" ry="60" fill="none" stroke="var(--accent-3)" strokeOpacity="0.2" transform="rotate(-18 200 200)" />
    </svg>
  );
}
