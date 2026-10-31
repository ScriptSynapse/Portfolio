import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Crosshair, Download, MapPin, Radar, UserCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { personal } from "../../data/personal";
import { goToSection, navigate } from "../../lib/router";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { useBooted } from "../../lib/boot-context";
import { useMagneticHover } from "../../hooks/useMagneticHover";
import { Marquee } from "../ui/Marquee";
import { ScrambleText } from "../ui/ScrambleText";
import { StatusDot } from "../ui/primitives";
import { GlobeStage } from "./GlobeStage";
import { RoleTyper } from "./RoleTyper";
import { OperatorMetrics, SystemStatusPanel } from "./StatusPanels";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const facts = [
  { label: "Location", value: personal.location, Icon: MapPin },
  { label: "Primary focus", value: personal.currentFocus, Icon: Crosshair },
  { label: "Areas of interest", value: personal.interests.join(" · "), Icon: Radar },
  { label: "Availability", value: personal.availability, Icon: UserCheck },
];

function LocalClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return <time dateTime={now.toISOString()}>{now.toLocaleTimeString("en-GB", { hour12: false })}</time>;
}

export function Hero() {
  const booted = useBooted();
  const { ref: magnetRef, style: magnetStyle, onMouseMove, onMouseLeave } = useMagneticHover<HTMLButtonElement>(0.18);
  const state = booted ? "show" : "hidden";
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textFade = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 outline-none sm:pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-x-6 gap-y-8 px-4 sm:px-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:px-8">
        {/* ---- Identity ---- */}
        <motion.div style={{ y: textY, opacity: textFade }} className="relative z-10 lg:col-span-5">
        <motion.div variants={container} initial="hidden" animate={state}>
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent-2/30 bg-accent-2-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2"
          >
            <StatusDot />
            Portfolio system online
          </motion.p>

          <motion.h1 variants={item} id="hero-title" className="font-display mt-6 font-bold leading-[0.88] tracking-[-0.035em] text-text">
            <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
              <ScrambleText text="PAULSON" start={booted} duration={900} className="block text-[clamp(3rem,13vw,5.6rem)] lg:text-[clamp(4rem,6.6vw,5.6rem)]" />
              <ScrambleText
                text="ALEX"
                start={booted}
                duration={800}
                delay={80}
                className="block text-[clamp(3rem,13vw,5.6rem)] text-transparent [-webkit-text-stroke:1.5px_var(--accent)] lg:text-[clamp(4rem,6.6vw,5.6rem)]"
              />
            </span>
            <ScrambleText
              text="FERNANDES"
              start={booted}
              duration={1100}
              delay={160}
              className="text-gradient block text-[clamp(3rem,13vw,5.6rem)] lg:text-[clamp(4rem,6.6vw,5.6rem)]"
            />
          </motion.h1>

          <motion.p variants={item} className="mt-6 flex h-6 items-center gap-2 font-mono text-[13px] text-text-2">
            <span className="text-accent-2">➜</span>
            <span className="text-text-3">focus:</span>
            <span className="text-accent">
              <RoleTyper words={personal.disciplines} start={booted} />
            </span>
          </motion.p>

          <motion.p variants={item} className="font-display mt-5 text-2xl font-medium leading-snug text-text sm:text-[1.7rem]">
            Securing Systems. <span className="text-text-2">Investigating Threats.</span> <span className="text-accent">Building Intelligence.</span>
          </motion.p>
          <motion.p variants={item} className="mt-4 hidden max-w-xl text-[15px] leading-relaxed text-text-2 sm:block">
            {personal.summary}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2.5">
            <motion.button
              ref={magnetRef}
              style={magnetStyle}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              type="button"
              onClick={() => goToSection("projects")}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-ink shadow-[0_12px_40px_-10px_var(--glow)]"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Explore Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </motion.button>
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName}
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-card/60 px-5 py-3.5 text-sm font-medium text-text backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" className="inline-flex h-[50px] w-[46px] items-center justify-center rounded-xl border border-line-strong bg-card/60 text-text-2 transition-colors hover:border-accent hover:text-accent">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="inline-flex h-[50px] w-[46px] items-center justify-center rounded-xl border border-line-strong bg-card/60 text-text-2 transition-colors hover:border-accent hover:text-accent">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-[13px] text-text-3">
            Short on time?{" "}
            <a
              href="/recruiter"
              onClick={(e) => {
                e.preventDefault();
                navigate("/recruiter");
              }}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Open the one-page recruiter summary →
            </a>
          </motion.p>

          <motion.p variants={item} className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-text-2 sm:hidden">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} className="text-accent" aria-hidden="true" />
              {personal.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserCheck size={12} className="text-accent-2" aria-hidden="true" />
              {personal.availability}
            </span>
          </motion.p>
        </motion.div>
        </motion.div>

        {/* ---- Globe with HUD ---- */}
        <motion.div style={{ y: globeY, scale: globeScale }} className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={booted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="hud-frame relative mx-auto w-full max-w-[460px] p-3 sm:max-w-[600px] lg:col-span-7 lg:max-w-none lg:p-6"
        >
          <div className="pointer-events-none absolute inset-x-4 top-3 z-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 lg:inset-x-7 lg:top-5">
            <span>
              <span className="text-accent">NET-VIS</span> // 01 · decorative · not live data
            </span>
            <span className="hidden sm:inline">
              Local <LocalClock />
            </span>
          </div>
          <GlobeStage />
          <div className="pointer-events-none absolute inset-x-4 bottom-3 z-10 hidden justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 sm:flex lg:inset-x-7 lg:bottom-5">
            <span>
              <span className="text-accent-3">●</span> Home node · 18.52°N 73.86°E
            </span>
            <span className="hidden [@media(hover:hover)]:inline">Drag to orbit</span>
          </div>
        </motion.div>
        </motion.div>
      </div>

      {/* ---- Dashboard strip ---- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="mx-auto mt-8 grid w-full max-w-7xl gap-4 px-4 sm:px-6 lg:mt-2 lg:grid-cols-[1fr_1.6fr] lg:px-8"
      >
        <SystemStatusPanel />
        <div className="grid gap-4">
          <OperatorMetrics wide />
          <dl className="hidden gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid sm:grid-cols-2 xl:grid-cols-4">
            {facts.map(({ label, value, Icon }) => (
              <div key={label} className="bg-card/90 p-3.5">
                <dt className="label-mono flex items-center gap-1.5 text-text-3">
                  <Icon size={12} className="text-accent" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-text">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <Marquee className="mt-14" />
    </section>
  );
}
