import { codeOf } from "../../data/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Languages, MapPin, Radar, ShieldCheck, Target } from "lucide-react";
import { useState } from "react";
import { personal } from "../../data/personal";
import { Terminal } from "../features/Terminal";
import { Corners, Reveal, Section, SectionHeader, Tag } from "../ui/primitives";

export function About() {
  const [photoOk, setPhotoOk] = useState(Boolean(personal.photoUrl));
  const initials = `${personal.firstName[0]}${personal.lastName[0]}`;
  const rows = [
    { Icon: GraduationCap, label: "Education", value: personal.education },
    { Icon: MapPin, label: "Location", value: personal.location },
    { Icon: ShieldCheck, label: "Role", value: personal.role },
    { Icon: Languages, label: "Languages", value: personal.languages.join(" · ") },
  ];

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeader
        id="about-title"
        code={codeOf("about")}
        eyebrow="Operator profile"
        title={
          <>
            Defence, investigation and <span className="text-accent">engineering</span> — in one toolkit.
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid content-start gap-6">
          <Reveal>
            <div className="panel relative overflow-hidden">
              <Corners />
              <div className="flex items-center gap-4 border-b border-line p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line-strong bg-bg-2">
                  {photoOk ? (
                    <img
                      src={personal.photoUrl}
                      alt={`Portrait of ${personal.fullName}`}
                      width={160}
                      height={160}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoOk(false)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display flex h-full w-full items-center justify-center text-2xl font-bold text-text-3">{initials}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl font-semibold text-text">{personal.fullName}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{personal.designation}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {personal.disciplines.map((d) => (
                      <Tag key={d}>{d}</Tag>
                    ))}
                  </div>
                </div>
              </div>
              <dl className="divide-y divide-line">
                {rows.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-3 px-5 py-3.5">
                    <Icon size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <dt className="label-mono text-text-3">{label}</dt>
                      <dd className="mt-1 text-sm leading-snug text-text">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="grid content-start gap-6">
          <Reveal delay={0.05}>
            <p className="text-lg leading-relaxed text-text-2">{personal.bio}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
              <div className="panel p-5">
                <p className="label-mono flex items-center gap-2 text-text-3">
                  <Radar size={13} className="text-accent" aria-hidden="true" /> Technical interests
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {personal.technicalInterests.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 320, damping: 22, delay: i * 0.04 }}
                    >
                      <Tag tone="accent">{t}</Tag>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="panel p-5">
                <p className="label-mono flex items-center gap-2 text-text-3">
                  <Target size={13} className="text-accent-2" aria-hidden="true" /> Looking for
                </p>
                <ul className="mt-3 grid gap-2 text-[14px] text-text-2">
                  {personal.careerObjectives.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-mono mb-3 text-text-3">Interactive shell · try “projects”, “skills” or “contact”</p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
