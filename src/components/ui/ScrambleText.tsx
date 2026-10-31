import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/<>[]{}_=+";

/** Text that "decrypts" from random glyphs into its real value. */
export function ScrambleText({
  text,
  start = true,
  duration = 1000,
  delay = 0,
  className,
}: {
  text: string;
  start?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  // Start from the real text so layout never collapses (and no-JS / slow devices read correctly).
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduced || !start) return;
    const resolveAt = Array.from(text, (_, i) => delay + (i / text.length) * duration * 0.65 + Math.random() * duration * 0.35);
    let raf = 0;
    let tick = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = now - t0;
      tick++;
      if (tick % 2 === 0 || t >= delay + duration) {
        setOut(
          Array.from(text, (ch, i) => {
            if (ch === " ") return " ";
            if (t >= resolveAt[i]) return ch;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }).join("")
        );
      }
      if (t < delay + duration) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    // Background tabs pause rAF — guarantee the real text lands regardless.
    const done = window.setTimeout(() => setOut(text), delay + duration + 80);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [text, start, duration, delay, reduced]);

  const shown = reduced ? text : out;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
