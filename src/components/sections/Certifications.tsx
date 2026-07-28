import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { certifications } from "../../data/systems";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 05" title="TROPHY CABINET" />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.65, 0, 0.35, 1] }}
              className="group relative border border-line hover:border-line-strong transition-colors duration-200 p-6"
            >
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-red group-hover:w-full transition-[width] duration-300 ease-out" />

              <div className="flex items-start justify-between mb-4">
                <Award size={20} className="text-red" />
                <span className="text-mono text-[10px] tracking-[0.15em] text-grey-dim">{cert.date}</span>
              </div>

              <h3 className="text-display text-xl font-semibold text-ink leading-tight">{cert.name}</h3>
              <div className="text-mono text-xs tracking-wider text-grey mt-1">{cert.issuer}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((s) => (
                  <span key={s} className="text-mono text-[10px] tracking-wider border border-line px-2 py-1 text-grey">
                    {s}
                  </span>
                ))}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-mono text-[11px] tracking-[0.15em] text-grey group-hover:text-red transition-colors"
                >
                  VIEW CREDENTIAL <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
