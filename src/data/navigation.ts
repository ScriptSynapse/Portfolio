export interface NavSection {
  id: string;
  navLabel: string;
  lapLabel: string;
}

export const sections: NavSection[] = [
  { id: "home", navLabel: "Home", lapLabel: "Home" },
  { id: "driver", navLabel: "Driver", lapLabel: "Driver" },
  { id: "projects", navLabel: "Projects", lapLabel: "Projects" },
  { id: "experience", navLabel: "Experience", lapLabel: "Experience" },
  { id: "skills", navLabel: "Skills", lapLabel: "Skills" },
  { id: "certifications", navLabel: "Certifications", lapLabel: "Certifications" },
  { id: "contact", navLabel: "Contact", lapLabel: "Contact" },
];

export const totalLaps = sections.length;
