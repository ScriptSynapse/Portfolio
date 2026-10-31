export interface NavSection {
  id: string;
  label: string;
  /** Shown in the primary navigation bar. */
  inNav: boolean;
  code: string;
}

/** Page sections in document order. Ids double as URL paths (/projects etc.). */
export const sections: NavSection[] = [
  { id: "home", label: "Home", inNav: true, code: "00" },
  { id: "about", label: "About", inNav: true, code: "01" },
  { id: "projects", label: "Projects", inNav: true, code: "02" },
  { id: "skills", label: "Skills", inNav: true, code: "03" },
  { id: "graph", label: "Graph", inNav: false, code: "04" },
  { id: "experience", label: "Experience", inNav: true, code: "05" },
  { id: "achievements", label: "Achievements", inNav: true, code: "06" },
  { id: "contact", label: "Contact", inNav: true, code: "07" },
];

/** Section number shown in headings, taken from the order above. */
export const codeOf = (id: string) => sections.find((s) => s.id === id)?.code ?? "00";

export const navSections = sections.filter((s) => s.inNav);
