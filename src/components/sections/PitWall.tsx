import { motion } from "framer-motion";
import { developmentItems } from "../../data/systems";
import { StatusDot } from "../ui/StatusDot";

export function PitWall() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-line bg-carbon">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 bg-red" />
          <span className="text-mono text-xs tracking-[0.3em] text-red">PIT WALL</span>
        </div>
        <h2 className="text-display font-bold text-3xl sm:text-4xl text-ink mb-12">CURRENT DEVELOPMENT</h2>

        <div className="divide-y divide-line border-y border-line">
          {developmentItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.65, 0, 0.35, 1] }}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="flex items-center gap-4">
                <span className="relative h-8 w-8 shrink-0 hidden sm:flex items-center justify-center">
                  <span className="absolute h-full w-full rounded-full border border-line" />
                  <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse-soft" />
                </span>
                <div>
                  <div className="text-ink text-base sm:text-lg font-medium">{item.title}</div>
                  {item.phase && (
                    <div className="text-mono text-[10px] tracking-[0.2em] text-grey-dim mt-1">
                      PHASE — {item.phase.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <StatusDot status={item.status} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
