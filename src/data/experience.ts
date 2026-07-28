import type { ExperienceEntry } from "../types/portfolio";

/**
 * EDIT ME — verified information only.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "btech-walleh-2025",
    season: "AUGUST 2025",
    role: "Cybersecurity Intern",
    organisation: "Btech Walleh",
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
];
