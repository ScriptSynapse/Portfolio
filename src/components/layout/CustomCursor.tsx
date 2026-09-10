import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  // Softer spring for the ring gives it a premium, weighted trailing feel
  // versus the dot, which tracks the raw cursor position instantly.
  const ringSpringX = useSpring(ringX, { stiffness: 260, damping: 22, mass: 0.4 });
  const ringSpringY = useSpring(ringY, { stiffness: 260, damping: 22, mass: 0.4 });

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor-hover]");
      const projectCard = target?.closest("[data-cursor-view]");
      setHoverLabel(projectCard ? "VIEW" : interactive ? "" : null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
      <>
        <motion.div
            style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
            className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red hidden md:block"
        />
        <motion.div
            style={{ x: ringSpringX, y: ringSpringY, opacity: visible ? 1 : 0 }}
            className={`pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out hidden md:flex items-center justify-center backdrop-blur-[1px] ${
                hoverLabel ? "h-14 w-14 border-red bg-red/10" : "h-8 w-8 border-ink/40"
            }`}
        >
          {hoverLabel && (
              <span className="text-mono text-[9px] tracking-[0.2em] text-ink">{hoverLabel}</span>
          )}
        </motion.div>
      </>
  );
}