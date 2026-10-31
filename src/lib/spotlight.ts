/**
 * Cursor spotlight for `.panel` cards: one passive, rAF-throttled listener
 * writes the pointer position into CSS variables on the hovered card.
 * Skipped on touch-only devices.
 */
export function installSpotlight(): () => void {
  if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return () => {};
  let frame = 0;
  let last: PointerEvent | null = null;
  const apply = () => {
    frame = 0;
    if (!last) return;
    const root = document.documentElement.style;
    root.setProperty("--cx", `${last.clientX}px`);
    root.setProperty("--cy", `${last.clientY}px`);
    const el = (last.target as Element | null)?.closest?.(".panel") as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${last.clientX - r.left}px`);
    el.style.setProperty("--my", `${last.clientY - r.top}px`);
  };
  const onMove = (e: PointerEvent) => {
    last = e;
    if (!frame) frame = requestAnimationFrame(apply);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    cancelAnimationFrame(frame);
  };
}
