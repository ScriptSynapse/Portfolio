import type { Project } from "../types/portfolio";

/**
 * EDIT ME — add, remove, or update projects here.
 * Set `demoUrl` to undefined when a live demo does not exist —
 * the UI hides that action automatically.
 */
export const projects: Project[] = [
  {
    id: "ai-malware-detector",
    title: "AI Malware Detection System",
    tagline: "Static PE analysis + ensemble ML — no execution required.",
    description:
      "Detects malicious Windows executables without running them, by combining static Portable Executable analysis with Random Forest and XGBoost models over 50+ structural, entropy, import/export, and section-level features. Includes a Flask dashboard with automatic best-model selection, feature-importance explainability, scan history, and downloadable PDF security reports.",
    category: ["AI", "SECURITY"],
    engineClass: "Malware Analysis",
    engine: "Python / Flask",
    intelligence: "Random Forest / XGBoost",
    status: "active",
    technologies: ["Python", "Flask", "Random Forest", "XGBoost", "SQLite", "ReportLab"],
    githubUrl: "https://github.com/ScriptSynapse/AI-Malware-Detector",
    featured: true,
  },
  {
    id: "honeywatch",
    title: "HoneyWatch — SSH Threat Intelligence Honeypot",
    tagline: "A production-grade SSH honeypot with live attacker analytics.",
    description:
      "A production-grade SSH honeypot with stateful fake-shell emulation and canary credentials, GeoIP enrichment, attack-pattern detection, and malware capture. Ships with a real-time WebSocket dashboard and a world-map visualisation of attacker origins, backed by a SQLite event store.",
    category: ["SECURITY"],
    engineClass: "Threat Intelligence",
    engine: "Python",
    status: "active",
    technologies: ["Python", "Paramiko", "aiohttp", "SQLite", "WebSockets", "GeoIP"],
    githubUrl: "https://github.com/ScriptSynapse/HoneyWatch-SSH-Threat-Intelligence-Honeypot-",
    featured: true,
  },
  {
    id: "secure-password-generator",
    title: "VaultX — Secure Password Manager",
    tagline: "Browser-based password vault, encrypted client-side.",
    description:
      "A browser-based password generator and vault that encrypts every entry with AES-256-GCM, using a key derived from a user-chosen master password via PBKDF2 (250,000 iterations) — nothing that could reconstruct the key ever touches storage. Includes a cryptographically random password generator, an entropy-based strength meter, auto-lock, and JSON/Excel/CSV import & export.",
    category: ["SECURITY", "SOFTWARE"],
    engineClass: "Applied Cryptography",
    engine: "JavaScript",
    status: "active",
    technologies: ["JavaScript", "Web Crypto API", "AES-256-GCM", "PBKDF2"],
    githubUrl: "https://github.com/ScriptSynapse/Secure-Password-Generator",
  },

];
