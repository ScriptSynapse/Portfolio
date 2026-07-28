import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { personal } from "../../data/personal";
import { totalLaps } from "../../data/navigation";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setComplete(true);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-line bg-carbon py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 pb-10 border-b border-line">
          <div>
            <div className="text-display text-2xl font-bold text-ink">{personal.name.toUpperCase()}</div>
            <div className="text-mono text-xs tracking-[0.25em] text-grey mt-2">
              {personal.disciplines.join(" × ").toUpperCase()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-grey hover:text-ink transition-colors">
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-grey hover:text-ink transition-colors">
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email" className="text-grey hover:text-ink transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8">
          <span className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">ENGINEERED WITH PRECISION.</span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: complete ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-mono text-[10px] tracking-[0.3em] text-red flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            SESSION COMPLETE — LAP {String(totalLaps).padStart(2, "0")} / {String(totalLaps).padStart(2, "0")}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
