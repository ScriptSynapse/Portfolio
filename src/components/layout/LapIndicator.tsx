import { motion } from "framer-motion";
import { sections, totalLaps } from "../../data/navigation";

interface LapIndicatorProps {
  activeIndex: number;
  progress: number;
}

export function LapIndicator({ activeIndex, progress }: LapIndicatorProps) {
  const lapNumber = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(totalLaps).padStart(2, "0");

  return (
    <div
      className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-3"
      aria-hidden="true"
    >
      <div className="text-mono text-[10px] tracking-[0.25em] text-grey">LAP</div>
      <div className="text-display text-2xl font-semibold text-ink leading-none">
        {lapNumber}
        <span className="text-grey-dim"> / {totalLabel}</span>
      </div>
      <motion.div
        key={sections[activeIndex]?.id}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="text-mono text-[10px] tracking-[0.2em] text-red"
      >
        {sections[activeIndex]?.lapLabel.toUpperCase()}
      </motion.div>
      <div className="h-24 w-px bg-line relative mt-1">
        <div
          className="absolute top-0 left-0 w-px bg-red transition-[height] duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function MobileLapIndicator({ activeIndex, progress }: LapIndicatorProps) {
  const lapNumber = String(activeIndex + 1).padStart(2, "0");
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" aria-hidden="true">
      <div className="h-[2px] w-full bg-line">
        <div className="h-full bg-red transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between items-center px-4 py-1.5 bg-bg/80 backdrop-blur-sm text-mono text-[9px] tracking-[0.2em] text-grey">
        <span>LAP {lapNumber} / {String(totalLaps).padStart(2, "0")}</span>
        <span className="text-red">{sections[activeIndex]?.lapLabel.toUpperCase()}</span>
      </div>
    </div>
  );
}
