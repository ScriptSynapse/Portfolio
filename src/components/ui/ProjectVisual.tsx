import type { Project } from "../../types/portfolio";

/**
 * Abstract animated illustration for each project (not a screenshot).
 * Pure SVG + CSS animation, so prefers-reduced-motion freezes it.
 */

const W = 400;
const H = 160;

function Radar() {
  const blips = [
    [236, 52],
    [286, 104],
    [168, 112],
    [214, 128],
  ];
  return (
    <g>
      {[22, 44, 66, 88].map((r) => (
        <circle key={r} cx="220" cy="80" r={r} fill="none" stroke="var(--accent)" strokeOpacity="0.22" />
      ))}
      <line x1="120" y1="80" x2="320" y2="80" stroke="var(--accent)" strokeOpacity="0.15" />
      <line x1="220" y1="-10" x2="220" y2="170" stroke="var(--accent)" strokeOpacity="0.15" />
      <g className="ill-spin" style={{ transformOrigin: "220px 80px", transformBox: "view-box", animationDuration: "4.5s" }}>
        <path d="M220,80 L308,80 A88,88 0 0,0 282,18 Z" fill="url(#sweep)" />
        <line x1="220" y1="80" x2="308" y2="80" stroke="var(--accent)" strokeWidth="1.5" />
      </g>
      {blips.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill={i === 1 ? "var(--accent-3)" : "var(--accent)"} className="ill-blip" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      <text x="20" y="150" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)">
        SSH · fake shell · canary creds
      </text>
    </g>
  );
}

function Fingerprint() {
  const arcs = Array.from({ length: 9 }, (_, i) => 10 + i * 8);
  return (
    <g>
      <g transform="translate(220 86)">
        {arcs.map((r, i) => (
          <path
            key={r}
            d={`M${-r},${4} A${r},${r * 1.15} 0 1,1 ${r},${4}`}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.25 + i * 0.05}
            strokeWidth="1.4"
            strokeDasharray={i % 3 === 0 ? "6 4" : undefined}
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="ill-scan" style={{ animationDuration: "2.6s" }}>
        <rect x="130" y="0" width="180" height="2" fill="var(--accent-2)" opacity="0.9" />
        <rect x="130" y="-18" width="180" height="18" fill="url(#scanfade)" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(30 ${34 + i * 22})`}>
          <rect width="72" height="12" rx="3" fill="var(--card-2)" stroke="var(--line-strong)" />
          <rect width={24 + i * 12} height="12" rx="3" fill="var(--accent-soft)" />
        </g>
      ))}
      <text x="318" y="140" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)">
        chain of custody
      </text>
    </g>
  );
}

function HexDump() {
  // "4D 5A" is the real "MZ" magic number that starts every Windows PE file.
  const bytes = "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00 50 45 00 00 4C 01 03 00".split(" ");
  const rows = Array.from({ length: 12 }, (_, r) => bytes.slice((r * 8) % 40, ((r * 8) % 40) + 8));
  return (
    <g>
      <clipPath id="hexclip">
        <rect x="0" y="0" width={W} height={H} />
      </clipPath>
      <g clipPath="url(#hexclip)">
        <g className="ill-scroll" style={{ animationDuration: "10s" }}>
          {[...rows, ...rows].map((row, r) => (
            <text key={r} x="34" y={18 + r * 16} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1">
              <tspan fill="var(--text-3)">{(r * 16).toString(16).padStart(6, "0")}  </tspan>
              {row.map((b, i) => (
                <tspan key={i} fill={(r % 12 === 0 && i < 2) || (r % 12 === 4 && i < 2) ? "var(--accent-3)" : r % 3 === 1 && i === 5 ? "var(--accent)" : "var(--text-2)"}>
                  {b}{" "}
                </tspan>
              ))}
            </text>
          ))}
        </g>
      </g>
      <rect x="300" y="44" width="76" height="72" rx="10" fill="var(--card)" stroke="var(--accent)" strokeOpacity="0.5" />
      <text x="338" y="76" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--text)">
        RF · XGB
      </text>
      <text x="338" y="96" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">
        static only
      </text>
      <path d="M270,80 L298,80" stroke="var(--accent)" strokeDasharray="4 4" className="ill-dash" />
    </g>
  );
}

function Vault() {
  return (
    <g>
      <g className="ill-spin-slow" style={{ transformOrigin: "220px 80px", transformBox: "view-box" }}>
        <circle cx="220" cy="80" r="62" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="3 7" />
      </g>
      <g className="ill-spin" style={{ transformOrigin: "220px 80px", transformBox: "view-box", animationDuration: "12s", animationDirection: "reverse" }}>
        <circle cx="220" cy="80" r="48" fill="none" stroke="var(--accent-3)" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="40 22" />
      </g>
      <rect x="200" y="74" width="40" height="32" rx="6" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.6" />
      <path d="M208,74 v-9 a12,12 0 0,1 24,0 v9" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
      <circle cx="220" cy="88" r="3.5" fill="var(--accent)" />
      <rect x="219" y="89" width="2" height="8" fill="var(--accent)" />
      {["AES-256-GCM", "PBKDF2 · 250k", "local only"].map((t, i) => (
        <text key={t} x="30" y={52 + i * 22} fontFamily="var(--font-mono)" fontSize="10.5" fill={i === 0 ? "var(--accent)" : "var(--text-3)"}>
          {t}
        </text>
      ))}
    </g>
  );
}

function Tunnel() {
  return (
    <g>
      <rect x="40" y="58" width="40" height="44" rx="8" fill="var(--card)" stroke="var(--accent)" strokeOpacity="0.6" />
      <rect x="320" y="58" width="40" height="44" rx="8" fill="var(--card)" stroke="var(--accent)" strokeOpacity="0.6" />
      <text x="60" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-2)">
        PEER
      </text>
      <text x="340" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-2)">
        PEER
      </text>
      <path d="M80,66 C150,50 250,50 320,66" fill="none" stroke="var(--line-strong)" />
      <path d="M80,94 C150,110 250,110 320,94" fill="none" stroke="var(--line-strong)" />
      <path d="M80,80 L320,80" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="2 6" className="ill-dash" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="84"
          y={76 - (i % 2) * 3}
          width={10 + (i % 3) * 6}
          height="8"
          rx="2"
          fill={i === 2 ? "var(--accent-3)" : "var(--accent)"}
          className="ill-travel"
          style={{ ["--travel" as string]: "220px", animationDelay: `${i * 0.7}s` } as React.CSSProperties}
        />
      ))}
      <text x="200" y="134" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)">
        ESP · encrypted payload · observable metadata
      </text>
      <text x="200" y="36" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">
        IKE negotiation
      </text>
    </g>
  );
}

const motifs: Record<Project["icon"], () => React.ReactElement> = {
  honeypot: Radar,
  forensics: Fingerprint,
  malware: HexDump,
  vault: Vault,
  vpn: Tunnel,
};

export function ProjectVisual({ icon, className = "" }: { icon: Project["icon"]; className?: string }) {
  const Motif = motifs[icon];
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-bg-2/70 ${className}`}>
      <div className="grid-bg absolute inset-0 opacity-80" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 55% 50%, var(--accent-soft), transparent 70%)" }} />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="relative h-full w-full">
        <defs>
          <linearGradient id="sweep" x1="0" y1="1" x2="0.4" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scanfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <Motif />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
    </div>
  );
}
