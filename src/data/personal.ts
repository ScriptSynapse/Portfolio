import type { PersonalInfo, StatItem } from "../types/portfolio";

/**
 * EDIT ME
 * ----------------------------------------------------------------
 * This is the single source of truth for personal / identity content.
 * Update the fields below to change what appears across the site —
 * no component files need to be touched.
 * ----------------------------------------------------------------
 */
export const personal: PersonalInfo = {
  name: "Paulson Alex Fernandes",
  firstName: "Paulson Alex",
  lastName: "Fernandes",
  driverNumber: "25",
  role: "CyberSecurity and Forensics",
  disciplines: ["Cybersecurity", "Software Engineering", "AI"],
  location: "Pune, India",
  education: "B.Tech in Computer Science and Engineering(CyberSecurity an Forensics) at MIT-World Peace University, Pune, India",
  currentFocus: "AI-assisted security tooling & cloud security",
  bio:
    "Computer Science student building at the intersection of cybersecurity, artificial intelligence and software engineering. Focused on cloud security posture, threat detection, and practical tools that help teams find and fix risk faster — from penetration-testing labs to AI copilots that explain findings in plain language. Comfortable moving between offense (CTFs, network analysis) and defense (SIEM, monitoring, remediation), with a growing interest in applying machine learning to anomaly and threat detection.",
  email: "paulsonfernandes.dev@gmail.com",
  githubUrl: "https://github.com/ScriptSynapse",
  linkedinUrl: "[ADD LINKEDIN URL]",
  resumeUrl:  "/Paulson Resume.pdf",
  status: "online",
};

export const stats: StatItem[] = [
  { label: "Projects", value: 3 },
  { label: "Certifications", value: 4 },
  { label: "Technologies", value: 18 },
  { label: "CTFs / Labs", value: 12 },
];
