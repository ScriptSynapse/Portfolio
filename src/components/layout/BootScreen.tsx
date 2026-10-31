import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { personal } from "../../data/personal";
import { sortedProjects } from "../../data/projects";
import { skillCount } from "../../data/skills";
import { certifications } from "../../data/credentials";
import { leadership, timeline } from "../../data/experience";
import { buildDate } from "../../data/site";
import { computeQuality } from "../../hooks/useDeviceProfile";
import { useTheme } from "../../lib/theme-context";
import { BOOT_SESSION_KEY } from "../../lib/boot-context";
import { ScrambleText } from "../ui/ScrambleText";

const MIN_MS = 2300;
const MAX_MS = 5000;

/**
 * "Portfolio OS" boot sequence. Every log line reports real data from src/data.
 * Progress tracks real work (fonts + 3D globe chunk) with a short minimum so the
 * sequence reads, and a hard cap so it never blocks. Any key / click skips it.
 * Shown once per browser session; never shown with prefers-reduced-motion.
 */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const { resolved } = useTheme();
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"boot" | "granted" | "exit">("boot");
  const ready = useRef(false);
  const finished = useRef(false);

  const quality = useRef(computeQuality()).current;
  const lines: [string, string][] = [
    ["Mounting operator identity", personal.fullName],
    ["Loading project index", `${sortedProjects.length} projects`],
    ["Indexing technical arsenal", `${skillCount} tools`],
    ["Verifying credentials", `${certifications.length} certificates`],
    ["Linking leadership records", `${leadership.length} roles`],
    ["Replaying career timeline", `${timeline.length} milestones`],
    ["Calibrating display", `${resolved} theme`],
    ["Spinning up network globe", quality === "fallback" ? "2D fallback" : quality === "high" ? "WebGL · high" : "WebGL · lite"],
  ];

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("exit");
  }, []);

  // Real readiness: fonts + globe chunk (preloaded so the hero appears instantly).
  useEffect(() => {
    const tasks: Promise<unknown>[] = [document.fonts?.ready ?? Promise.resolve()];
    if (quality !== "fallback") tasks.push(import("../hero/NetworkGlobe").catch(() => null));
    Promise.all(tasks).then(() => (ready.current = true));
  }, [quality]);

  // Progress + log timeline.
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const t = now - t0;
      const timeP = Math.min(1, t / MIN_MS);
      const cap = ready.current || t > MAX_MS ? 1 : 0.92;
      setProgress((p) => Math.max(p, Math.min(timeP, cap)));
      setVisibleLines(Math.min(lines.length, Math.floor((t / MIN_MS) * lines.length) + 1));
      if (timeP >= 1 && cap === 1) {
        setPhase("granted");
        window.setTimeout(finish, 450);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish]);

  // Skip on any key or click; lock scroll while booting.
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = overflow;
    };
  }, [finish]);

  const pct = Math.round(progress * 100);
  const R = 74;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== "exit" && (
        <motion.div
          key="boot"
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio, ${pct} percent`}
          onClick={finish}
          className="fixed inset-0 z-[100] flex cursor-pointer select-none flex-col overflow-hidden bg-bg text-text"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(50% 0% 50% 0%)", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* backdrop */}
          <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)" }}
          />
          <div aria-hidden="true" className="ill-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-accent/10 to-transparent" style={{ animationDuration: "2.4s" }} />

          {/* top bar */}
          <div className="relative flex items-center justify-between px-5 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3 sm:px-8 sm:pt-7">
            <span>
              Operator <span className="text-accent">//</span> Portfolio OS <span className="text-text-2">v2.0</span>
            </span>
            <span className="hidden sm:inline">Build {buildDate.toISOString().slice(0, 10)}</span>
          </div>

          {/* core */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-6">
            <div className="relative h-52 w-52 sm:h-60 sm:w-60">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g className="ill-spin-slow">
                  <circle cx="100" cy="100" r="94" fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" />
                </g>
                {Array.from({ length: 60 }, (_, i) => {
                  const a = (i / 60) * Math.PI * 2;
                  const lit = i / 60 <= progress;
                  const r1 = i % 5 === 0 ? 82 : 84;
                  return (
                    <line
                      key={i}
                      x1={100 + Math.cos(a - Math.PI / 2) * r1}
                      y1={100 + Math.sin(a - Math.PI / 2) * r1}
                      x2={100 + Math.cos(a - Math.PI / 2) * 88}
                      y2={100 + Math.sin(a - Math.PI / 2) * 88}
                      stroke={lit ? "var(--accent)" : "var(--line-strong)"}
                      strokeWidth={i % 5 === 0 ? 1.6 : 1}
                    />
                  );
                })}
                <circle cx="100" cy="100" r={R} fill="none" stroke="var(--line)" strokeWidth="2" />
                <circle
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  transform="rotate(-90 100 100)"
                  style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
                />
                <g className="ill-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }}>
                  <polygon points="100,46 147,73 147,127 100,154 53,127 53,73" fill="none" stroke="var(--accent-3)" strokeOpacity="0.55" strokeDasharray="10 8" />
                </g>
                <circle cx="100" cy="26" r="2.5" fill="var(--accent-2)" className="ill-blip" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  PF<span className="text-accent">//</span>
                </span>
                <span className="mt-1 font-mono text-[11px] tabular-nums text-text-3">{String(pct).padStart(3, "0")}%</span>
              </div>
            </div>

            <ScrambleText text={personal.fullName.toUpperCase()} duration={1300} className="font-display mt-8 text-center text-xl font-semibold tracking-[0.18em] sm:text-2xl" />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-text-3">{personal.tagline}</p>

            <div className="mt-6 h-6">
              <AnimatePresence>
                {phase === "granted" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6, letterSpacing: "0.5em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
                    className="font-mono text-[12px] font-semibold uppercase text-accent-2"
                  >
                    ● Access granted
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* log + skip */}
          <div className="relative flex items-end justify-between gap-6 px-5 pb-5 sm:px-8 sm:pb-7">
            <ol className="w-full max-w-md font-mono text-[10.5px] leading-[1.7] text-text-2 sm:text-[11px]">
              {lines.slice(0, visibleLines).map(([label, value], i) => (
                <motion.li key={label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }} className="flex gap-2">
                  <span className={`shrink-0 whitespace-pre ${i < visibleLines - 1 || phase !== "boot" ? "text-accent-2" : "text-accent-3"}`}>
                    {i < visibleLines - 1 || phase !== "boot" ? "[ OK ]" : "[ .. ]"}
                  </span>
                  <span className="truncate">{label}</span>
                  <span className="flex-1 overflow-hidden whitespace-nowrap text-text-3/60">{"·".repeat(40)}</span>
                  <span className="shrink-0 text-text">{value}</span>
                </motion.li>
              ))}
            </ol>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              className="hidden shrink-0 rounded-md border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3 transition-colors hover:border-accent hover:text-accent sm:block"
            >
              Skip · any key
            </button>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div className="h-px bg-accent shadow-[0_0_12px_var(--glow)]" style={{ width: `${pct}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
