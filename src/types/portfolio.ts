export type SystemStatus = "online" | "development" | "learning" | "active" | "planned";

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  driverNumber: string;
  role: string;
  disciplines: string[];
  location: string;
  education: string;
  currentFocus: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  status: SystemStatus;
}

export type ProjectCategory = "SECURITY" | "AI" | "CLOUD" | "SOFTWARE";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory[];
  image?: string;
  engineClass: string; // "CLASS" label
  engine: string; // primary language/runtime
  intelligence?: string; // AI/ML descriptor
  status: SystemStatus;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface ExperienceEntry {
  id: string;
  season: string; // e.g. "2025 SEASON"
  role: string;
  organisation: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export type SkillLevel = "LEARNING" | "WORKING KNOWLEDGE" | "PROFICIENT" | "ADVANCED";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export interface DevelopmentItem {
  id: string;
  title: string;
  status: SystemStatus;
  phase?: string;
}

export interface MachineSystem {
  id: string;
  label: string; // e.g. ENGINE
  mapsTo: string; // e.g. Programming
  technologies: string[];
  // position on the blueprint, in percent (0-100) for x/y
  x: number;
  y: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}
