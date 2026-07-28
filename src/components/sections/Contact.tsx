import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { FormField } from "../ui/FormField";
import { personal } from "../../data/personal";

type SubmitState = "idle" | "sending" | "sent" | "no-backend" | "error";

// Falls back to the configured Formspree endpoint. Override by setting
// VITE_FORM_ENDPOINT (e.g. for a different environment/endpoint) — see .env.example.
const FORM_ENDPOINT =
  (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || "https://formspree.io/f/mnjewjyp";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [state, setState] = useState<SubmitState>("idle");

  const validate = (): boolean => {
    const next: Partial<FormValues> = {};
    if (!values.name.trim()) next.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!FORM_ENDPOINT) {
      // No backend configured — be honest instead of faking delivery.
      setState("no-backend");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 07" title="TEAM RADIO" />

        <div className="mt-10 grid lg:grid-cols-2 gap-14">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="text-display text-2xl sm:text-3xl font-semibold text-ink leading-tight max-w-md"
            >
              LET'S BUILD SOMETHING FAST, SECURE AND USEFUL.
            </motion.h3>

            <div className="mt-8 flex flex-col gap-4 text-sm">
              <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-3 text-grey hover:text-ink transition-colors w-fit">
                <Mail size={16} /> {personal.email}
              </a>
              <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-grey hover:text-ink transition-colors w-fit">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-grey hover:text-ink transition-colors w-fit">
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <FormField
              label="Name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              error={errors.name}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              error={errors.email}
              required
            />
            <FormField
              as="textarea"
              label="Message"
              name="message"
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              error={errors.message}
              required
            />

            <button
              type="submit"
              disabled={state === "sending"}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-red text-ink px-6 py-3.5 text-mono text-xs tracking-[0.2em] disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-ink translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 ease-out" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-bg transition-colors duration-200">
                <Radio size={14} />
                {state === "sending" ? "SENDING TRANSMISSION..." : "SEND TRANSMISSION"}
              </span>
            </button>

            {state === "sent" && (
              <p className="text-mono text-xs tracking-wider text-online">TRANSMISSION RECEIVED ✓</p>
            )}
            {state === "error" && (
              <p className="text-mono text-xs tracking-wider text-red">
                TRANSMISSION FAILED — please email {personal.email} directly.
              </p>
            )}
            {state === "no-backend" && (
              <p className="text-mono text-xs tracking-wider text-warning">
                FORM DELIVERY NOT YET CONFIGURED — please email {personal.email} directly, or connect a
                Formspree / EmailJS / Web3Forms endpoint via VITE_FORM_ENDPOINT.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
