import type { SkillCategory } from "../types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    id: "security",
    label: "Security",
    skills: [
      { name: "Penetration Testing", level: "PROFICIENT" },
      { name: "Network Security", level: "PROFICIENT" },
      { name: "SIEM", level: "WORKING KNOWLEDGE" },
      { name: "Threat Analysis", level: "PROFICIENT" },
      { name: "Cloud Security", level: "WORKING KNOWLEDGE" },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    skills: [
      { name: "Python", level: "ADVANCED" },
      { name: "C++", level: "PROFICIENT" },
      { name: "JavaScript", level: "WORKING KNOWLEDGE" },
      { name: "SQL", level: "PROFICIENT" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      { name: "Scikit-learn", level: "PROFICIENT" },
      { name: "XGBoost", level: "WORKING KNOWLEDGE" },
      { name: "Random Forest", level: "WORKING KNOWLEDGE" },
      { name: "Anomaly Detection", level: "WORKING KNOWLEDGE" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Wireshark", level: "PROFICIENT" },
      { name: "Splunk", level: "WORKING KNOWLEDGE" },
      { name: "Zeek", level: "WORKING KNOWLEDGE" },
      { name: "Git", level: "ADVANCED" },
      { name: "Linux", level: "PROFICIENT" },
    ],
  },
];
