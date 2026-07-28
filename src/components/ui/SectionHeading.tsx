import { motion } from "framer-motion";

interface SectionHeadingProps {
  sector: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ sector, title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.div
        initial={{ opacity: 0, x: align === "center" ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className={`flex items-center gap-3 mb-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-red" />
        <span className="text-mono text-xs tracking-[0.3em] text-red">{sector}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
        className="text-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
          className={`mt-4 max-w-xl text-grey text-base md:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
