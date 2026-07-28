import { useEffect, useRef, useState } from "react";

const SEQUENCE = ["d", "r", "s"];
const ACTIVE_DURATION = 5000;

export function useDrsEasterEgg(disabled: boolean) {
  const [active, setActive] = useState(false);
  const bufferRef = useRef<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (disabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      bufferRef.current = [...bufferRef.current, key].slice(-SEQUENCE.length);

      if (bufferRef.current.join("") === SEQUENCE.join("")) {
        setActive(true);
        bufferRef.current = [];
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(false), ACTIVE_DURATION);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [disabled]);

  return active;
}
