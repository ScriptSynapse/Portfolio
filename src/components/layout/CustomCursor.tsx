import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    document.documentElement.classList.add("custom-cursor");

    let ringX = 0, ringY = 0;
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      ringX = e.clientX;
      ringY = e.clientY;

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor-hover]");
      const projectCard = target?.closest("[data-cursor-view]");
      setHoverLabel(projectCard ? "VIEW" : interactive ? "" : null);
    };

    let raf: number;
    const render = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red hidden md:block"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-150 ease-out hidden md:flex items-center justify-center ${
          hoverLabel ? "h-14 w-14 border-red bg-red/10" : "h-8 w-8 border-ink/40"
        }`}
      >
        {hoverLabel && (
          <span className="text-mono text-[9px] tracking-[0.2em] text-ink">{hoverLabel}</span>
        )}
      </div>
    </>
  );
}
