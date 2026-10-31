import { codeOf } from "../../data/navigation";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Eye, ExternalLink, ImageOff, Maximize2, Medal, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { achievements, certifications } from "../../data/credentials";
import { safeUrl } from "../../lib/url";
import type { Achievement, Certification } from "../../types/portfolio";
import { Modal, ModalClose } from "../ui/Modal";
import { Reveal, Section, SectionHeader, Tag } from "../ui/primitives";

const achIcon: Record<Achievement["category"], typeof Award> = {
  hackathon: Trophy,
  leadership: Users,
  recognition: Medal,
  workshop: Award,
};

function initialsOf(s: string) {
  return s
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

type PreviewImage = { src: string; alt: string; caption: string };

function CertCard({ cert, onOpen }: { cert: Certification; onOpen: (c: Certification) => void }) {
  const verify = safeUrl(cert.credentialUrl);
  return (
    <article className="panel group relative flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/35" aria-labelledby={`cert-${cert.id}`}>
      <button
        type="button"
        onClick={() => onOpen(cert)}
        aria-label={`Open ${cert.name} certificate from ${cert.issuer}`}
        className="relative block aspect-[7/5] w-full overflow-hidden border-b border-line bg-bg-2/60 text-left"
      >
        <span className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
        {cert.image ? (
          <img
            src={cert.thumb ?? cert.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-between px-5">
            <span className="font-display text-5xl font-bold text-text/10" aria-hidden="true">
              {initialsOf(cert.issuer)}
            </span>
            <BadgeCheck size={30} className="text-accent/70 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          </span>
        )}
        <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
            <Maximize2 size={12} aria-hidden="true" /> Click to expand
          </span>
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="label-mono text-text-3">{cert.issuer}</p>
        <h3 id={`cert-${cert.id}`} className="font-display mt-1.5 text-lg font-semibold leading-snug text-text">
          {cert.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-text-3">{cert.date ?? "Date not listed"}</p>
        {cert.credentialId && <p className="mt-0.5 font-mono text-[11px] text-text-3">ID {cert.credentialId}</p>}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills">
          {cert.skills.map((sk) => (
            <li key={sk}>
              <Tag tone="accent">{sk}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-4">
          <button type="button" onClick={() => onOpen(cert)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12px] text-text-2 hover:border-accent/40 hover:text-text">
            <Eye size={13} /> View
          </button>
          {verify && (
            <a href={verify} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12px] text-text-2 hover:text-text">
              <ExternalLink size={13} /> Verify
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Credentials() {
  const [preview, setPreview] = useState<PreviewImage | null>(null);
  const [openCert, setOpenCert] = useState<Certification | null>(null);
  return (
    <Section id="achievements" labelledBy="achievements-title" className="bg-bg-2/30">
      <SectionHeader
        id="achievements-title"
        code={codeOf("achievements")}
        eyebrow="Credentials vault"
        title="Certifications & achievements."
        description="Recognitions and certifications. Verification links and certificate images appear wherever they are available."
      />

      <p className="label-mono mb-4 text-text-3">Achievements · {achievements.length}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = achIcon[a.category];
          const verify = safeUrl(a.verificationUrl);
          return (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="panel group relative overflow-hidden p-6 sm:p-8"
              aria-labelledby={`ach-${a.id}`}
            >
              <span aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-3-soft blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <motion.span
                  initial={{ rotate: -20, scale: 0.6 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.2 + i * 0.12 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-3/30 bg-accent-3-soft text-accent-3 transition-transform duration-500 group-hover:-translate-y-1"
                >
                  <Icon size={26} aria-hidden="true" />
                </motion.span>
                {a.rank && (
                  <span className="font-display bg-gradient-to-br from-accent-3 to-accent bg-clip-text text-5xl font-bold leading-none text-transparent sm:text-6xl">
                    {a.rank}
                  </span>
                )}
              </div>
              <p className="label-mono relative mt-6 text-accent-3">{a.organisation}</p>
              <h3 id={`ach-${a.id}`} className="font-display relative mt-2 text-2xl font-semibold leading-snug text-text">
                {a.title}
              </h3>
              {a.date && <p className="relative mt-1 font-mono text-[11px] text-text-3">{a.date}</p>}
              <p className="relative mt-3 text-[15px] leading-relaxed text-text-2">{a.description}</p>
              {a.highlights.length > 0 && (
                <ul className="relative mt-4 flex flex-wrap gap-1.5">
                  {a.highlights.map((h) => (
                    <li key={h}>
                      <Tag tone="orange">{h}</Tag>
                    </li>
                  ))}
                </ul>
              )}
              {a.image && (
                <button
                  type="button"
                  onClick={() => setPreview({ src: a.image!, alt: `${a.title} certificate`, caption: a.title })}
                  className="group/img relative mt-5 flex w-full items-center gap-4 overflow-hidden rounded-xl border border-line bg-bg-2/60 p-2 pr-4 text-left transition-colors hover:border-accent-3/50"
                >
                  <img src={a.image} alt="" loading="lazy" decoding="async" className="h-20 w-16 shrink-0 rounded-lg object-cover object-top transition-transform duration-500 group-hover/img:scale-105" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text">View award certificate</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-text-3">Opens a full-size preview</span>
                  </span>
                  <Eye size={16} className="ml-auto shrink-0 text-accent-3" aria-hidden="true" />
                </button>
              )}
              {verify && (
                <a href={verify} target="_blank" rel="noopener noreferrer" className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] text-accent">
                  <ExternalLink size={13} /> Verify
                </a>
              )}
            </motion.article>
          );
        })}
      </div>

      <p className="label-mono mb-4 mt-12 text-text-3">Certifications · {certifications.length}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.05} className="h-full">
            <CertCard cert={c} onOpen={setOpenCert} />
          </Reveal>
        ))}
      </div>

      <Modal open={Boolean(preview)} onClose={() => setPreview(null)} label={preview?.caption ?? "Certificate"} className="max-w-3xl">
        <ModalClose onClose={() => setPreview(null)} />
        {preview && (
          <figure>
            <img src={preview.src} alt={preview.alt} className="max-h-[78vh] w-full bg-bg-2 object-contain" />
            <figcaption className="border-t border-line px-5 py-3 text-sm text-text-2">{preview.caption}</figcaption>
          </figure>
        )}
      </Modal>

      <Modal open={Boolean(openCert)} onClose={() => setOpenCert(null)} label={openCert ? `${openCert.name} certificate` : "Certificate"} className="max-w-4xl">
        <ModalClose onClose={() => setOpenCert(null)} />
        {openCert && (
          <figure>
            {openCert.image ? (
              <a href={openCert.image} target="_blank" rel="noopener noreferrer" title="Open full-size image in a new tab" className="block bg-bg-2">
                <img src={openCert.image} alt={`${openCert.name} certificate issued by ${openCert.issuer}`} className="max-h-[72vh] w-full object-contain" />
              </a>
            ) : (
              <div className="flex h-56 flex-col items-center justify-center gap-3 bg-bg-2 text-text-3">
                <ImageOff size={28} aria-hidden="true" />
                <span className="text-sm">Certificate image not added yet.</span>
              </div>
            )}
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <span>
                <span className="block font-semibold text-text">{openCert.name}</span>
                <span className="block text-sm text-text-2">
                  {openCert.issuer}
                  {openCert.date ? ` · ${openCert.date}` : ""}
                  {openCert.credentialId ? ` · ID ${openCert.credentialId}` : ""}
                </span>
              </span>
              {safeUrl(openCert.credentialUrl) && (
                <a href={safeUrl(openCert.credentialUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-[13px] font-semibold text-accent-ink">
                  <ExternalLink size={14} /> Verify credential
                </a>
              )}
            </figcaption>
          </figure>
        )}
      </Modal>
    </Section>
  );
}
