import { projects } from "./projects";
import { certifications, achievements } from "./credentials";
import { arsenal, skillCount } from "./skills";
import { leadershipCount } from "./experience";
import { sections } from "./navigation";


/** Set at build time (see vite.config.ts) so "last updated" is always real. */
export const buildDate: Date = (() => {
  try {
    return new Date(__BUILD_DATE__);
  } catch {
    return new Date();
  }
})();

export const site = {
  product: "OPERATOR // PORTFOLIO OS",
  shortProduct: "Portfolio OS",
  moduleCount: sections.length - 1,
};

export interface Metric {
  label: string;
  value: number;
  detail: string;
}

/** Every number is derived from the data files — nothing is typed in by hand. */
export const metrics: Metric[] = [
  { label: "Projects", value: projects.length, detail: "Open-source on GitHub" },
  { label: "Tools used", value: skillCount, detail: `Across ${arsenal.length} skill categories` },
  { label: "Certifications", value: certifications.length, detail: "Courses & assessments" },
  {
    label: "Leadership & awards",
    value: leadershipCount + achievements.length,
    detail: "Roles and recognitions",
  },
];
