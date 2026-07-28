import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { personal, stats } from "../../data/personal";

const fields: { label: string; value: string }[] = [
  { label: "Location", value: personal.location },
  { label: "Education", value: personal.education },
  { label: "Current Focus", value: personal.currentFocus },
];

export function DriverProfile() {
  return (
    <section id="driver" className="relative py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading sector="SECTOR 01" title="DRIVER PROFILE" />

        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
          <div>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm mb-8">
              <div>
                <dt className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">NAME</dt>
                <dd className="text-ink mt-1">{personal.name}</dd>
              </div>
              <div>
                <dt className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">ROLE</dt>
                <dd className="text-ink mt-1">{personal.role}</dd>
              </div>
              <div>
                <dt className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">SPECIALISATION</dt>
                <dd className="text-ink mt-1">{personal.disciplines[0]}</dd>
              </div>
              <div>
                <dt className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">FOCUS</dt>
                <dd className="text-ink mt-1">{personal.disciplines.join(" × ")}</dd>
              </div>
              {fields.map((f) => (
                <div key={f.label}>
                  <dt className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">{f.label.toUpperCase()}</dt>
                  <dd className="text-ink mt-1">{f.value}</dd>
                </div>
              ))}
            </dl>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="text-grey leading-relaxed"
            >
              {personal.bio}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
