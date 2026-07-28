import { useEffect, useState } from "react";
import { sections } from "../data/navigation";

interface ScrollTelemetry {
  progress: number; // 0 - 100
  activeIndex: number;
  activeId: string;
}

export function useScrollTelemetry(): ScrollTelemetry {
  const [state, setState] = useState<ScrollTelemetry>({
    progress: 0,
    activeIndex: 0,
    activeId: sections[0].id,
  });

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;

      let activeIndex = 0;
      const viewportAnchor = window.innerHeight * 0.35;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportAnchor) {
          activeIndex = i;
        }
      }

      setState({ progress, activeIndex, activeId: sections[activeIndex].id });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
