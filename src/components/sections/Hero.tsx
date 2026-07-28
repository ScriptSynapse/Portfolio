import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { personal } from "../../data/personal";
import { TechnicalBackground } from "../ui/TechnicalBackground";
import { StatusDot } from "../ui/StatusDot";

const easeMech = [0.65, 0, 0.35, 1] as const;

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 pb-16">
      <TechnicalBackground />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-mono text-xs tracking-[0.3em] text-grey mb-4"
          >
            SESSION: PORTFOLIO — DRIVER {personal.driverNumber}
          </motion.div>

          <h1 className="text-display font-bold leading-[0.88] text-ink">
            <motion.span
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeMech, delay: 0.2 }}
              className="block text-[15vw] sm:text-[11vw] lg:text-[7.5vw]"
            >
              {personal.firstName.toUpperCase()}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeMech, delay: 0.32 }}
              className="block text-[15vw] sm:text-[11vw] lg:text-[7.5vw] text-red"
            >
              {personal.lastName.toUpperCase()}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeMech, delay: 0.55 }}
            className="mt-6 text-mono text-xs sm:text-sm tracking-[0.2em] text-grey flex flex-wrap gap-x-2"
          >
            {personal.disciplines.map((d, i) => (
              <span key={d} className="flex items-center gap-2">
                <span className={i === 0 ? "text-red" : "text-ink"}>{d.toUpperCase()}</span>
                {i < personal.disciplines.length - 1 && <span className="text-grey-dim">×</span>}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeMech, delay: 0.65 }}
            className="mt-5 max-w-xl text-grey text-base sm:text-lg"
          >
            Computer Science student focused on cybersecurity, AI-powered security systems,
            cloud security, threat detection, and software development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeMech, delay: 0.75 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-red text-ink px-6 py-3 text-mono text-xs tracking-[0.2em]"
            >
              <span className="absolute inset-0 bg-ink translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 ease-out" />
              <span className="relative z-10 group-hover:text-bg transition-colors duration-200">VIEW PROJECTS</span>
              <ArrowRight size={14} className="relative z-10 group-hover:text-bg group-hover:translate-x-1 transition-all duration-200" />
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="group relative inline-flex items-center gap-2 border border-line-strong px-6 py-3 text-mono text-xs tracking-[0.2em] text-ink hover:border-red transition-colors duration-200"
            >
              DOWNLOAD RESUME
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeMech, delay: 0.9 }}
          className="w-full lg:w-72 border border-line bg-surface/60 backdrop-blur-sm p-5 text-mono text-xs tracking-wider"
        >
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <span className="text-grey-dim">DRIVER</span>
            <span className="text-display text-2xl font-bold text-red">{personal.driverNumber}</span>
          </div>
          <div className="py-3 border-b border-line space-y-1">
            <div className="text-ink text-sm">{personal.name.toUpperCase()}</div>
          </div>
          <div className="py-3 border-b border-line flex items-center justify-between">
            <span className="text-grey-dim">DISCIPLINE</span>
            <span className="text-ink">{personal.disciplines[0].toUpperCase()}</span>
          </div>
          <div className="py-3 border-b border-line flex items-center justify-between">
            <span className="text-grey-dim">SECONDARY</span>
            <span className="text-ink">{personal.disciplines.slice(1).join(" / ").toUpperCase()}</span>
          </div>
          <div className="pt-3 flex items-center justify-between">
            <span className="text-grey-dim">STATUS</span>
            <StatusDot status={personal.status} />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
