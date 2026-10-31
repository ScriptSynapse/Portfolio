import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { safeUrl } from "../../lib/url";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_8px_30px_-10px_var(--glow)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_var(--glow)] active:translate-y-0",
  secondary:
    "border border-line-strong bg-card/60 text-text backdrop-blur hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-text-2 hover:text-text hover:bg-card",
};

export function Button({
  variant = "secondary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

/** Link-styled button. External links are validated and open in a new tab. */
export function LinkButton({
  variant = "secondary",
  className = "",
  href,
  external,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; external?: boolean }) {
  const url = safeUrl(href);
  if (!url) return null;
  const ext = external ?? /^https?:/.test(url);
  return (
    <a
      href={url}
      className={`${base} ${variants[variant]} ${className}`}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Tag({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "green" | "orange";
  className?: string;
}) {
  const tones = {
    neutral: "border-line text-text-2 bg-bg-2/40",
    accent: "border-accent/30 text-accent bg-accent-soft",
    green: "border-accent-2/30 text-accent-2 bg-accent-2-soft",
    orange: "border-accent-3/30 text-accent-3 bg-accent-3-soft",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "green", pulse = true }: { tone?: "green" | "accent" | "orange"; pulse?: boolean }) {
  const color = tone === "green" ? "bg-accent-2 text-accent-2" : tone === "accent" ? "bg-accent text-accent" : "bg-accent-3 text-accent-3";
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${color} ${pulse ? "animate-pulse-dot" : ""}`}
    />
  );
}

/** Dashboard panel with a mono header strip and corner ticks. */
export function Panel({
  title,
  meta,
  children,
  className = "",
  bodyClassName = "p-5",
  as: As = "div",
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "div" | "section" | "article" | "aside";
}) {
  return (
    <As className={`panel relative overflow-hidden ${className}`}>
      <Corners />
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <span className="label-mono text-text-3">{title}</span>
          {meta && <span className="label-mono text-text-3">{meta}</span>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </As>
  );
}

export function Corners({ className = "border-accent/50" }: { className?: string }) {
  const c = `pointer-events-none absolute h-2.5 w-2.5 ${className}`;
  return (
    <>
      <span aria-hidden="true" className={`${c} left-0 top-0 rounded-tl-[14px] border-l border-t`} />
      <span aria-hidden="true" className={`${c} right-0 top-0 rounded-tr-[14px] border-r border-t`} />
      <span aria-hidden="true" className={`${c} bottom-0 left-0 rounded-bl-[14px] border-b border-l`} />
      <span aria-hidden="true" className={`${c} bottom-0 right-0 rounded-br-[14px] border-b border-r`} />
    </>
  );
}

/** Splits a plain-string title into words that rise in one by one. */
function WordReveal({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
              {"\u00a0"}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );
}

export function SectionHeader({
  code,
  eyebrow,
  title,
  description,
  id,
  action,
}: {
  code: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  action?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <div ref={ref} className="relative mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <motion.span
        aria-hidden="true"
        style={{ y: numY }}
        className="font-display text-outline pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-bold leading-none opacity-70 sm:-top-14 sm:text-[11rem] lg:text-[13rem]"
      >
        {code}
      </motion.span>
      <div className="relative max-w-3xl">
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-accent">
            <span className="text-text-3">{code}</span>
            <motion.span aria-hidden="true" style={{ scaleX: lineScale }} className="h-px w-10 origin-left bg-accent/70" />
            {eyebrow}
          </p>
        </Reveal>
        <h2 id={id} className="font-display mt-4 text-3xl font-semibold leading-[1.05] text-text sm:text-4xl lg:text-5xl">
          {typeof title === "string" ? <WordReveal text={title} /> : <Reveal delay={0.05}>{title}</Reveal>}
        </h2>
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-2">{description}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.12}>{action}</Reveal>}
    </div>
  );
}

/** Scroll-triggered fade/slide. Framer's MotionConfig handles reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative scroll-mt-24 py-20 outline-none sm:py-28 ${className}`}>
      {/* entry beam: a light sweeps across the section's top edge as it scrolls in */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: [0, 1, 0.35] }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
