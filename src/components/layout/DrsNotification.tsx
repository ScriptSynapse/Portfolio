import { AnimatePresence, motion } from "framer-motion";

export function DrsNotification({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] rounded-sm border border-red bg-surface/90 backdrop-blur-md px-5 py-2.5"
          role="status"
        >
          <span className="text-mono text-xs tracking-[0.3em] text-red">DRS ENABLED</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
