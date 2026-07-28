import type { Certification, DevelopmentItem, MachineSystem } from "../types/portfolio";

export const machineSystems: MachineSystem[] = [
  {
    id: "engine",
    label: "Engine",
    mapsTo: "Programming",
    technologies: ["Python", "C++", "JavaScript", "SQL"],
    x: 50,
    y: 12,
  },
  {
    id: "ecu",
    label: "ECU",
    mapsTo: "AI / Machine Learning",
    technologies: ["Scikit-learn", "XGBoost", "Random Forest", "Anomaly Detection"],
    x: 50,
    y: 32,
  },
  {
    id: "aero",
    label: "Aerodynamics",
    mapsTo: "Frontend",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    x: 22,
    y: 45,
  },
  {
    id: "pitwall",
    label: "Pit Wall",
    mapsTo: "Backend",
    technologies: ["Node.js", "SQL", "APIs", "Cloud Infra"],
    x: 78,
    y: 45,
  },
  {
    id: "telemetry",
    label: "Telemetry",
    mapsTo: "Data Analysis",
    technologies: ["Python", "Pandas", "SQL", "Data Visualisation"],
    x: 50,
    y: 55,
  },
  {
    id: "defence",
    label: "Defence Systems",
    mapsTo: "Cybersecurity",
    technologies: ["Wireshark", "Splunk", "Zeek", "Linux", "Cloud Security", "Threat Detection"],
    x: 22,
    y: 72,
  },
  {
    id: "radio",
    label: "Radio",
    mapsTo: "APIs / Networking",
    technologies: ["REST APIs", "WebSockets", "Networking Fundamentals"],
    x: 78,
    y: 72,
  },
  {
    id: "garage",
    label: "Garage",
    mapsTo: "DevOps / Git",
    technologies: ["Git", "GitHub Actions", "Linux", "Docker"],
    x: 50,
    y: 88,
  },
];

/**
 * EDIT ME — verified certifications only.
 */
export const certifications: Certification[] = [
  {
    id: "paloalto-cybersecurity-fundamentals",
    name: "Cybersecurity Fundamentals",
    issuer: "Palo Alto Networks Academy",
    date: "November 20, 2025",
    skills: ["Cybersecurity Fundamentals"],
  },
  {
    id: "paloalto-network-security-fundamentals",
    name: "Network Security Fundamentals",
    issuer: "Palo Alto Networks Academy",
    date: "April 16, 2026",
    skills: ["Network Security"],
  },
];
export const developmentItems: DevelopmentItem[] = [
  { id: "dev-1", title: "AI Security Copilot", status: "development", phase: "Prototype" },
  { id: "dev-2", title: "Cloud Security", status: "learning" },
  { id: "dev-3", title: "CTF Training", status: "active" },
];
