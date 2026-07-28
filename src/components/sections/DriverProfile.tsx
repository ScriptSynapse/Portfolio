import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Crosshair, ShieldCheck, MapPin, GraduationCap, Radar, Radio } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { personal, stats } from "../../data/personal";

interface IdentityField {
  label: string;
  value: string;
  icon: LucideIcon;
}

const fields: IdentityField[] = [
  { label: "Name", value: personal.name, icon: Crosshair },
  { label: "Role", value: personal.role, icon: ShieldCheck },
  { label: "Location", value: personal.location, icon: MapPin },
  { label: "Education", value: personal.education, icon: GraduationCap },
  { label: "Specialisation", value: personal.disciplines.join(" × "), icon: Radar },
  { label: "Current Focus", value: personal.currentFocus, icon: Radio },
];

export function DriverProfile() {
  return (
      <section id="driver" className="relative py-24 sm:py-32 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading sector="SECTOR 01" title="DRIVER PROFILE" />

          <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
            <div>
              <div className="relative p-3">
                {/* corner brackets */}
                <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-red" />
                <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-red" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-red" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-red" />

                <dl className="grid sm:grid-cols-2 gap-3">
                  {fields.map((f, i) => (
                      <motion.div
                          key={f.label}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.65, 0, 0.35, 1] }}
                          className="group border border-line hover:border-line-strong transition-colors duration-200 bg-carbon p-5"
                      >
                        <dt className="flex items-center gap-2 text-mono text-[10px] tracking-[0.2em] text-grey-dim">
                          <f.icon size={13} className="text-red shrink-0" />
                          {f.label.toUpperCase()}
                        </dt>
                        <dd className="text-ink font-semibold text-[15px] mt-2 leading-snug">{f.value}</dd>
                      </motion.div>
                  ))}
                </dl>
              </div>

              <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  className="text-grey leading-relaxed mt-8"
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
