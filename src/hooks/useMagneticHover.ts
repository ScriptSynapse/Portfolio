import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Attach the returned ref + motion style to a button/link for a subtle
 * "magnetic" pull toward the cursor on hover — a common premium-site touch.
 * Disabled automatically on touch devices and under reduced motion.
 */
export function useMagneticHover<T extends HTMLElement = HTMLElement>(strength = 0.35) {
    const ref = useRef<T>(null);
    const reduced = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

    const onMouseMove = (e: React.MouseEvent<T>) => {
        if (reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}