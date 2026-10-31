import { lazy, Suspense, useState } from "react";
import { useTheme } from "../../lib/theme-context";
import { useVisualQuality } from "../../hooks/useDeviceProfile";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { GlobeNodeInfo } from "./NetworkGlobe";
import { GlobeFallback } from "./GlobeFallback";
import { ErrorBoundary } from "../layout/ErrorBoundary";

const NetworkGlobe = lazy(() => import("./NetworkGlobe"));

const LABELS = [
  { text: "Cybersecurity", pos: "left-[2%] top-[16%]", tone: "accent" },
  { text: "Digital Forensics", pos: "right-[0%] top-[26%]", tone: "orange" },
  { text: "AI / ML", pos: "left-[6%] bottom-[22%]", tone: "green" },
  { text: "Threat Intel", pos: "right-[6%] bottom-[14%]", tone: "accent" },
] as const;

const toneClass = {
  accent: "border-accent/30 text-accent",
  orange: "border-accent-3/30 text-accent-3",
  green: "border-accent-2/30 text-accent-2",
};

export function GlobeStage() {
  const { resolved } = useTheme();
  const quality = useVisualQuality();
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<GlobeNodeInfo | null>(null);
  const use3D = quality !== "fallback" && !failed;

  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[640px]" aria-label="Decorative network globe visualisation">
      {/* concentric HUD backdrop */}
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full border border-line" />
      <div aria-hidden="true" className="absolute inset-[16%] rounded-full border border-dashed border-line" />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 62%)" }}
      />

      <div className="absolute inset-0">
        {use3D ? (
          <ErrorBoundary fallback={<GlobeFallback />}>
          <Suspense fallback={<GlobeFallback />}>
            <NetworkGlobe
              theme={resolved}
              quality={quality === "high" ? "high" : "low"}
              reducedMotion={reduced}
              onHover={setHover}
              onFailure={() => setFailed(true)}
            />
          </Suspense>
          </ErrorBoundary>
        ) : (
          <GlobeFallback />
        )}
      </div>

      {LABELS.map((l, i) => (
        <span
          key={l.text}
          aria-hidden="true"
          className={`pointer-events-none absolute ${l.pos} hidden items-center gap-1.5 rounded-md border bg-[var(--nav-bg)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-md sm:inline-flex ${toneClass[l.tone]} animate-float`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          <span className="h-1 w-1 rounded-full bg-current" />
          {l.text}
        </span>
      ))}

      {hover && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-md border border-line-strong bg-elevated px-2.5 py-1.5 font-mono text-[11px] text-text shadow-lg"
          style={{ left: hover.x, top: hover.y }}
        >
          <span className={hover.home ? "text-accent-3" : "text-accent"}>{hover.home ? "● HOME NODE" : "● NODE"}</span> · {hover.name}
        </div>
      )}

      <figcaption className="sr-only">Decorative network visualisation — not live data.</figcaption>
    </figure>
  );
}
