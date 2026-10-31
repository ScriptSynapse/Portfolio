import { codeOf } from "../../data/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Download, Loader2, Mail, MapPin, Send, TriangleAlert } from "lucide-react";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { personal } from "../../data/personal";
import { saveContactMessage } from "../../lib/firebase";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { Corners, Reveal, Section, SectionHeader } from "../ui/primitives";

/**
 * Contact form.
 * Delivery order: Firestore (when VITE_FIREBASE_* is configured) → form endpoint
 * (Formspree by default, override with VITE_FORM_ENDPOINT). Spam protection:
 * hidden honeypot field, minimum fill time, client-side cooldown and length
 * limits. Server-side rules (Firestore security rules / Formspree settings)
 * remain the real enforcement — see README.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "https://formspree.io/f/mnjewjyp";
const COOLDOWN_MS = 60_000;
const MIN_FILL_MS = 3_000;
const LAST_SENT_KEY = "pf-contact-last";

type Status = "idle" | "sending" | "sent" | "error" | "cooldown";

interface Values {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const LIMITS = { name: [2, 80], email: [5, 120], subject: [3, 120], message: [10, 2000] } as const;

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  const name = v.name.trim();
  if (name.length < LIMITS.name[0]) e.name = "Please enter your name.";
  else if (name.length > LIMITS.name[1]) e.name = `Keep the name under ${LIMITS.name[1]} characters.`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()) || v.email.length > LIMITS.email[1]) e.email = "Enter a valid email address.";
  const subject = v.subject.trim();
  if (subject.length < LIMITS.subject[0]) e.subject = "Add a short subject.";
  else if (subject.length > LIMITS.subject[1]) e.subject = `Keep the subject under ${LIMITS.subject[1]} characters.`;
  const message = v.message.trim();
  if (message.length < LIMITS.message[0]) e.message = `Message should be at least ${LIMITS.message[0]} characters.`;
  else if (message.length > LIMITS.message[1]) e.message = `Message should be under ${LIMITS.message[1]} characters.`;
  return e;
}

function readLastSent(): number {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY) ?? 0);
  } catch {
    return 0;
  }
}

function sendViaFirestore(v: Values): Promise<boolean> {
  return saveContactMessage({
    name: v.name.trim(),
    email: v.email.trim(),
    subject: v.subject.trim(),
    message: v.message.trim(),
  });
}

async function sendViaEndpoint(v: Values): Promise<boolean> {
  if (!FORM_ENDPOINT) return false;
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name: v.name.trim(), email: v.email.trim(), subject: v.subject.trim(), message: v.message.trim(), _subject: `[Portfolio] ${v.subject.trim()}` }),
  });
  return res.ok;
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="label-mono text-text-3">
          {label}
        </label>
        {hint && <span className="font-mono text-[10px] text-text-3">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-accent-3">
          <TriangleAlert size={12} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const uid = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstError = (Object.keys(found) as (keyof Values)[])[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${firstError}`)}`)?.focus();
      return;
    }
    // Bots: honeypot filled or submitted implausibly fast → pretend success, send nothing.
    if (trap || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }
    if (Date.now() - readLastSent() < COOLDOWN_MS) {
      setStatus("cooldown");
      return;
    }
    setStatus("sending");
    try {
      let ok = false;
      try {
        ok = await sendViaFirestore(values);
      } catch {
        ok = false;
      }
      if (!ok) ok = await sendViaEndpoint(values);
      if (!ok) throw new Error("delivery failed");
      try {
        localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const input =
    "mt-2 w-full rounded-lg border bg-bg-2/50 px-3.5 py-3 text-sm text-text placeholder:text-text-3 outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]";
  const border = (k: keyof Values) => (errors[k] ? "border-accent-3/70" : "border-line");
  const aria = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    "aria-invalid": Boolean(errors[k]) || undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-error` : undefined,
  });

  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeader
        id="contact-title"
        code={codeOf("contact")}
        eyebrow="Secure communication"
        title={
          <>
            Open a channel. <span className="text-accent">Let’s talk.</span>
          </>
        }
        description="Internships, collaborations or a question about one of the projects — messages reach me directly."
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="panel relative h-full overflow-hidden p-6 sm:p-7">
            <Corners />
            <p className="label-mono text-text-3">Direct lines</p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a href={`mailto:${personal.email}`} className="group flex items-center gap-3 rounded-xl border border-line p-3.5 transition-colors hover:border-accent/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Mail size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-text-3">Email</span>
                    <span className="block truncate text-sm font-medium text-text">{personal.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-line p-3.5 transition-colors hover:border-accent/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <GithubIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-text-3">GitHub</span>
                    <span className="block text-sm font-medium text-text">@{personal.githubHandle}</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-line p-3.5 transition-colors hover:border-accent/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <LinkedinIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-text-3">LinkedIn</span>
                    <span className="block text-sm font-medium text-text">{personal.fullName}</span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={personal.resumeUrl} download={personal.resumeFileName} className="flex items-center gap-3 rounded-xl border border-line p-3.5 transition-colors hover:border-accent/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Download size={17} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-text-3">Resume</span>
                    <span className="block text-sm font-medium text-text">Download PDF</span>
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-text-3">
              <MapPin size={14} aria-hidden="true" /> {personal.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form ref={formRef} onSubmit={onSubmit} noValidate className="panel relative grid gap-5 p-6 sm:p-7" aria-labelledby="contact-title">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="label-mono text-text-3">New transmission</span>
              <span className="label-mono inline-flex items-center gap-1.5 text-accent-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" /> Channel ready
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Name" error={errors.name}>
                <input {...aria("name")} name="name" autoComplete="name" maxLength={LIMITS.name[1]} value={values.name} onChange={set("name")} className={`${input} ${border("name")}`} placeholder="Your name" required />
              </Field>
              <Field id={`${uid}-email`} label="Email" error={errors.email}>
                <input {...aria("email")} name="email" type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email[1]} value={values.email} onChange={set("email")} className={`${input} ${border("email")}`} placeholder="you@company.com" required />
              </Field>
            </div>
            <Field id={`${uid}-subject`} label="Subject" error={errors.subject}>
              <input {...aria("subject")} name="subject" maxLength={LIMITS.subject[1]} value={values.subject} onChange={set("subject")} className={`${input} ${border("subject")}`} placeholder="Internship opportunity, project question…" required />
            </Field>
            <Field id={`${uid}-message`} label="Message" error={errors.message} hint={`${values.message.length}/${LIMITS.message[1]}`}>
              <textarea {...aria("message")} name="message" rows={6} maxLength={LIMITS.message[1]} value={values.message} onChange={set("message")} className={`${input} ${border("message")} min-h-36 resize-y`} placeholder="What would you like to discuss?" required />
            </Field>

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${uid}-website`}>Website</label>
              <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-ink shadow-[0_10px_30px_-10px_var(--glow)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
              >
                {status === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />}
                {status === "sending" ? "Transmitting…" : "Initiate transmission"}
              </button>
              <p className="text-[12px] text-text-3">Sent over HTTPS. Your details are used only to reply.</p>
            </div>

            <div aria-live="polite" role="status">
              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.p key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-lg border border-accent-2/30 bg-accent-2-soft p-3 text-sm text-accent-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> Transmission received — thank you. I’ll reply by email.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p key="error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-lg border border-accent-3/30 bg-accent-3-soft p-3 text-sm text-accent-3">
                    <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Transmission failed. Please try again or email{" "}
                      <a className="underline" href={`mailto:${personal.email}`}>
                        {personal.email}
                      </a>{" "}
                      directly.
                    </span>
                  </motion.p>
                )}
                {status === "cooldown" && (
                  <motion.p key="cool" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-lg border border-line p-3 text-sm text-text-2">
                    A message was just sent from this browser. Please wait a minute before sending another.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
