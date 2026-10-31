import { useMotionValue, useSpring, useTransform } from "framer-motion";
import type React from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Subtle 3D tilt that follows the pointer. Off for touch and reduced motion. */
export function useTilt(max = 5) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };
  return { style: reduced ? {} : { rotateX, rotateY, transformPerspective: 1100 }, onPointerMove, onPointerLeave };
}
