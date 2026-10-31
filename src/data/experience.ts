import type { TimelineEntry } from "../types/portfolio";

/**
 * EDIT ME — verified information only (previous site data + resume PDF).
 * Newest first is handled by `timeline` below via sortKey.
 */
const entries: TimelineEntry[] = [
  {
    id: "sih-core-team",
    kind: "leadership",
    period: "August 2026",
    sortKey: "2026-08",
    role: "Core Team Member",
    // Confirmed by owner (31 Oct 2026). The resume PDF still says "SIH 2025 (Internal)" — update the PDF to match.
    organisation: "Smart India Hackathon 2026 — Internal Round",
    description: "Core organising team for the university's internal round of Smart India Hackathon 2026.",
    responsibilities: [
      "Served as a Core Team Member, coordinating technical operations and managing events.",
      "Facilitated team coordination, evaluations, and the execution of events.",
    ],
    highlights: ["Technical operations", "Event management", "Team coordination", "Evaluations"],
  },
  {
    id: "ciphathon-26",
    kind: "leadership",
    period: "March 2026",
    sortKey: "2026-03",
    role: "Student Co-ordinator",
    organisation: "CIPHATHON 26",
    description: "Student co-ordinator for the CIPHATHON 26 event.",
    responsibilities: [
      "Assisted in event planning, coordination, and technical operations for CIPHATHON 26.",
      "Facilitated smooth execution and collaboration among participants and the organizing team.",
    ],
    highlights: ["Event planning", "Coordination", "Technical operations", "Participant collaboration"],
  },
  {
    id: "btech-walleh-2025",
    kind: "experience",
    period: "August 2025",
    sortKey: "2025-08",
    role: "Cybersecurity Intern",
    organisation: "Btech Walleh",
    location: "Remote",
    description:
      "Hands-on security internship spanning incident investigation, offensive testing, and network threat analysis.",
    responsibilities: [
      "Investigated a Conti ransomware incident with Splunk — uncovering persistence, credential theft, and exploited CVEs, and recommending remediation.",
      "Performed penetration testing on Windows using Metasploit (EternalBlue), achieving SYSTEM access and cracking password hashes.",
      "Analysed a Lumma Stealer campaign with Wireshark & Zeek — identifying malicious domains, C2 activity, and exfiltration IOCs for SIEM integration.",
      "Simulated ARP poisoning and configured Windows Firewall rules to demonstrate the risks of unencrypted traffic and enforce endpoint security.",
    ],
    technologies: [
      "Splunk",
      "Wireshark",
      "Zeek",
      "Metasploit",
      "Nmap",
      "John the Ripper",
      "Cain & Abel",
      "Ettercap",
      "Windows Firewall",
    ],
  },
  {
    id: "mitwpu-btech",
    kind: "education",
    period: "July 2025 – Present",
    sortKey: "2025-07",
    role: "B.Tech, Computer Science & Engineering (Cybersecurity and Forensics)",
    organisation: "MIT World Peace University",
    location: "Pune",
    description: "Undergraduate programme, 2025–2029.",
    responsibilities: [
      "Specialisation in Cybersecurity and Digital Forensics.",
      "Coursework foundations in Object-Oriented Programming, Data Structures, Algorithms and Database Management Systems.",
      "FORGE-X was built as the DBMS academic project.",
    ],
  },
];

/** Every milestone, newest first (terminal, resume, boot log). */
export const timeline = [...entries].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

/** Work experience only — the Experience section. Education is shown in About and the resume. */
export const careerTimeline = timeline.filter((e) => e.kind === "experience");

/** Leadership roles — the Leadership section. */
export const leadership = timeline.filter((e) => e.kind === "leadership");

export const leadershipCount = leadership.length;
