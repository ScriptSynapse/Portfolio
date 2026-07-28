import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { personal } from "../../data/personal";

const SESSION_KEY = "pf-intro-shown";

export function StartingSequence({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion();
  const [litCount, setLitCount] = useState(0);
  const [phase, setPhase] = useState<"init" | "lights" | "go" | "hidden">("init");
  const [skip, setSkip] = useState(false);

  // Read once, before the effect ever writes — captured via lazy initializer so
  // React StrictMode's dev-only double effect invocation can't see its own
  // write from the first pass and mistakenly think the intro already ran.
  const [wasAlreadyShown] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1"
  );

  useEffect(() => {
    if (wasAlreadyShown || reducedMotion) {
      setSkip(true);
      onDone();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const t1 = setTimeout(() => setPhase("lights"), 250);
    const timers = [0, 1, 2, 3, 4].map((i) =>
      setTimeout(() => setLitCount((c) => Math.max(c, i + 1)), 380 + i * 190)
    );
    const t2 = setTimeout(() => setPhase("go"), 380 + 5 * 190 + 160);
    const t3 = setTimeout(() => setPhase("hidden"), 380 + 5 * 190 + 160 + 420);
    const t4 = setTimeout(onDone, 380 + 5 * 190 + 160 + 420 + 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="bg-grid absolute inset-0 opacity-20" />

          <div className="relative flex flex-col items-center gap-8 text-center">
            <div className="text-mono text-xs tracking-[0.35em] text-grey">
              {phase === "init" && "INITIALISING SYSTEM..."}
              {(phase === "lights" || phase === "go") && (
                <div className="flex flex-col items-center gap-1">
                  <span>SESSION: PORTFOLIO</span>
                  <span>DRIVER: {personal.driverNumber}</span>
                  <span className="text-online">SYSTEM: ONLINE</span>
                </div>
              )}
            </div>

            {phase === "lights" && (
              <div className="flex gap-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: litCount > i ? 1 : 0.15 }}
                    transition={{ duration: 0.15 }}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red"
                    style={{ boxShadow: litCount > i ? "0 0 18px rgba(227,6,19,0.8)" : "none" }}
                  />
                ))}
              </div>
            )}

            {phase === "go" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                className="text-display text-6xl sm:text-7xl font-bold text-red"
              >
                GO
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
