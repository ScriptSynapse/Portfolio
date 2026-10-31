import { useEffect, useState } from "react";

export type VisualQuality = "high" | "low" | "fallback";

interface NavigatorWithHints extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides how heavy the hero visualisation may be:
 *  - fallback: no WebGL or data-saver on → static SVG globe
 *  - low:      small screens / low-end hardware → reduced 3D scene
 *  - high:     everything else
 */
export function computeQuality(): VisualQuality {
  if (typeof window === "undefined") return "fallback";
  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) return "fallback";
  if (!supportsWebGL()) return "fallback";
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowCpu = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMem = (nav.deviceMemory ?? 8) <= 4;
  if (small || (coarse && (lowCpu || lowMem)) || lowCpu) return "low";
  return "high";
}

export function useVisualQuality(): VisualQuality {
  const [quality, setQuality] = useState<VisualQuality>(computeQuality);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setQuality(computeQuality());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return quality;
}
