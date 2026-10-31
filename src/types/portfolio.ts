/**
 * Shared content types for OPERATOR // PORTFOLIO OS.
 * All content lives in src/data/* — components only render it.
 * Optional fields are hidden by the UI when empty, so never fill them
 * with placeholder or unverified information.
 */

export interface PersonalInfo {
  name: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  designation: string;
  tagline: string;
  disciplines: string[];
  interests: string[];
  location: string;
  education: string;
  currentFocus: string;
  availability: string;
  summary: string;
  bio: string;
  email: string;
  githubUrl: string;
  githubHandle: string;
  linkedinUrl: string;
  websiteUrl?: string;
  resumeUrl: string;
  resumeFileName: string;
  photoUrl?: string;
  languages: string[];
  /** Areas of interest (not claimed expertise). */
  technicalInterests: string[];
  /** What you are looking for next. */
  careerObjectives: string[];
}

export type ProjectCategory = "cybersecurity" | "forensics" | "ai-ml" | "software";

export type ProjectStatus = "active" | "maintained" | "prototype" | "archived";

export interface ArchitectureNode {
  id: string;
  label: string;
  detail: string;
  /** Position in a 100 × 60 viewBox. */
  x: number;
  y: number;
  kind?: "client" | "service" | "data" | "external" | "worker";
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  /** Primary discipline shown on the card. */
  domain: string;
  icon: "honeypot" | "forensics" | "malware" | "vault" | "vpn";
  /** Only set when verified. */
  status?: ProjectStatus;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  /** Short note shown next to the demo link, e.g. "sample data only". */
  demoNote?: string;
  featured?: boolean;
  priority: number;
  problem: string;
  solution: string;
  implementation: string[];
  features: string[];
  challenges: string[];
  /** Measured outcomes taken from the project's own docs or tests. */
  results?: string[];
  /** What is not (yet) implemented — stated, never hidden. */
  limitations?: string[];
  /** Planned work. Never presented as an existing capability. */
  future?: string[];
  architecture?: {
    caption: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  figures?: ProjectFigure[];
}

export type TimelineKind = "education" | "experience" | "leadership";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  period: string;
  /** ISO-ish sortable date (YYYY-MM). */
  sortKey: string;
  role: string;
  organisation: string;
  location?: string;
  description: string;
  responsibilities: string[];
  technologies?: string[];
  /** Short impact tags shown on leadership cards. */
  highlights?: string[];
}

export interface ArsenalItem {
  name: string;
  usage: string;
  /** Project ids this skill is demonstrated in. */
  projects?: string[];
  /** Non-project evidence, e.g. "Internship", "Coursework". */
  evidence?: string[];
  level?: "FAMILIAR" | "WORKING KNOWLEDGE" | "PROFICIENT";
}

export interface ArsenalCategory {
  id: string;
  label: string;
  icon: "code" | "radar" | "activity" | "fingerprint" | "brain" | "network" | "layers" | "database" | "monitor" | "cloud";
  description: string;
  items: ArsenalItem[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  skills: string[];
  /** Full-size image inside /public, e.g. "/certification-images/paloalto-csf.webp". */
  image?: string;
  /** Small card thumbnail (falls back to `image`). */
  thumb?: string;
  /** Credential / certificate ID printed on the certificate. */
  credentialId?: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organisation: string;
  date?: string;
  category: "hackathon" | "leadership" | "recognition" | "workshop";
  description: string;
  highlights: string[];
  /** Short rank badge, e.g. "1st" or "Top 10". */
  rank?: string;
  /** Award / certificate image in /public, shown with a preview modal. */
  image?: string;
  verificationUrl?: string;
}

