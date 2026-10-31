import type { PersonalInfo } from "../types/portfolio";

/**
 * EDIT ME — single source of truth for identity content.
 * Every value here was taken from the previous portfolio data or from
 * public/Paulson_Alex_Fernandes_Resume.pdf. Change values here, not in components.
 *
 * LinkedIn URL copied from the live profile by owner (31 Oct 2026).
 * NOTE: the resume PDF lists a different email (paulsonfernandes.dev@gmail.com)
 * than the value below, which was kept from the previous site. Pick one and update.
 */
export const personal: PersonalInfo = {
  name: "Paulson Alex Fernandes",
  fullName: "Paulson Alex Fernandes",
  firstName: "Paulson",
  lastName: "Fernandes",
  role: "Computer Science Student",
  designation: "Cybersecurity & Digital Forensics Student · AI Security Enthusiast",
  tagline: "Securing Systems. Investigating Threats. Building Intelligence.",
  disciplines: ["Cybersecurity", "Digital Forensics", "AI / ML", "Software Engineering"],
  interests: ["Threat intelligence", "Malware analysis", "Digital forensics", "Applied cryptography"],
  location: "Pune, India",
  education:
    "B.Tech in Computer Science and Engineering (Cybersecurity and Forensics), MIT World Peace University — 2025–2029",
  currentFocus: "AI-assisted security tooling & cloud security",
  // Shown in the hero and status panel. Edit to match what you are looking for.
  availability: "Open to internships & collaboration",
  summary:
    "Computer Science undergraduate specializing in Cybersecurity and Digital Forensics, with hands-on experience in software development and security analysis. Developed practical projects in malware detection, network security, digital forensics, and database management.",
  bio:
    "Computer Science student building at the intersection of cybersecurity, artificial intelligence and software engineering. Focused on cloud security posture, threat detection, and practical tools that help teams find and fix risk faster — from penetration-testing labs to AI copilots that explain findings in plain language. Comfortable moving between offense (CTFs, network analysis) and defense (SIEM, monitoring, remediation), with a growing interest in applying machine learning to anomaly and threat detection.",
  email: "paulsonfernandes.dev@gmail.com",
  githubUrl: "https://github.com/ScriptSynapse",
  githubHandle: "ScriptSynapse",
  linkedinUrl: "https://www.linkedin.com/in/paulson-alex-fernandes-754710378",
  websiteUrl: "https://portfolio.paulsonfernandes.tech/",
  resumeUrl: "/Paulson_Alex_Fernandes_Resume.pdf",
  resumeFileName: "Paulson_Alex_Fernandes_Resume.pdf",
  photoUrl: "/profile.jpg",
  languages: ["English (Full Professional)", "Hindi (Native)", "Konkani (Native)"],
  // From the v3.0 brief (owner-stated interests — shown as interests, not skills).
  technicalInterests: [
    "Cybersecurity & information security",
    "Digital forensics & incident response",
    "Threat intelligence",
    "Security operations (SOC)",
    "AI/ML-powered security",
    "Network security",
    "Malware analysis",
    "Cloud security",
  ],
  careerObjectives: [
    "Cybersecurity internships",
    "Security engineering opportunities",
    "Digital forensics work",
    "AI-driven security research and R&D",
  ],
};