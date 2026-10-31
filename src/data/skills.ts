import type { ArsenalCategory } from "../types/portfolio";

/**
 * EDIT ME — Technical skills, grouped into the ten v3.0 categories.
 *
 * Rules:
 *  - Only tools backed by evidence: a project README (`projects`), the
 *    internship record, coursework or the resume (`evidence`).
 *  - `level` uses only Familiar / Working Knowledge / Proficient and is set
 *    only where you previously stated it. Leave it out rather than guess.
 *  - Sysmon, Elasticsearch and Kibana are NOT listed: no project, resume or
 *    internship evidence was found. Add them once there is some.
 */
export const arsenal: ArsenalCategory[] = [
  {
    id: "programming",
    label: "Programming Languages",
    icon: "code",
    description: "Languages used across coursework and shipped projects.",
    items: [
      { name: "Python", level: "PROFICIENT", usage: "Primary language for the honeypot, forensics platform, malware detector and VPN analyzer.", projects: ["honeywatch", "forge-x", "ai-malware-detector", "ipsec-vpn-analyzer"] },
      { name: "JavaScript", level: "WORKING KNOWLEDGE", usage: "VaultX's client-side vault and crypto layer.", projects: ["vaultx"] },
      { name: "SQL", evidence: ["Coursework"], level: "PROFICIENT", usage: "Triggers, views, stored procedures and transactions in FORGE-X.", projects: ["forge-x"] },
      { name: "C++", evidence: ["Coursework"], level: "PROFICIENT", usage: "Object-oriented programming and data structures coursework." },
      { name: "C", evidence: ["Coursework"], usage: "Data structures and systems-level coursework." },
    ],
  },
  {
    id: "security-tools",
    label: "Cybersecurity Tools",
    icon: "radar",
    description: "Traffic analysis and controlled offensive testing.",
    items: [
      { name: "Wireshark", evidence: ["Internship"], level: "PROFICIENT", usage: "Lumma Stealer C2 and exfiltration analysis; IKE decoding for the VPN analyzer.", projects: ["ipsec-vpn-analyzer"] },
      { name: "Metasploit", evidence: ["Internship"], usage: "Controlled Windows penetration test using EternalBlue, including privilege escalation." },
      { name: "Nmap", evidence: ["Internship"], usage: "Part of the internship toolset for network and penetration-testing labs." },
      { name: "John the Ripper", evidence: ["Internship"], usage: "Cracking password hashes recovered during a controlled lab test." },
      { name: "Ettercap", evidence: ["Internship"], usage: "ARP-poisoning simulation to demonstrate the risk of unencrypted traffic." },
      { name: "Cain & Abel", evidence: ["Internship"], usage: "Listed in the internship toolset for credential and network testing labs." },
    ],
  },
  {
    id: "secops",
    label: "Security Operations",
    icon: "activity",
    description: "Detection, investigation and endpoint hardening.",
    items: [
      { name: "Splunk", evidence: ["Internship"], level: "WORKING KNOWLEDGE", usage: "Conti ransomware investigation: persistence, credential theft and exploited CVEs." },
      { name: "Zeek", evidence: ["Internship"], level: "WORKING KNOWLEDGE", usage: "Network logs for identifying malicious domains and C2 activity." },
      { name: "Microsoft Sentinel", evidence: ["Listed skill"], usage: "Listed in tools & platforms on the resume." },
      { name: "Microsoft Defender", evidence: ["Listed skill"], usage: "Listed in tools & platforms on the resume." },
      { name: "Windows Firewall", evidence: ["Internship"], usage: "Configured rules to enforce endpoint security during the internship." },
    ],
  },
  {
    id: "forensics",
    label: "Digital Forensics",
    icon: "fingerprint",
    description: "Evidence handling, integrity and static analysis.",
    items: [
      { name: "Evidence integrity (SHA-256)", usage: "Reference hashes on arrival and append-only verification history in FORGE-X.", projects: ["forge-x"] },
      { name: "Chain of custody", usage: "Append-only custody entries with linked corrections; every transfer is one transaction.", projects: ["forge-x"] },
      { name: "YARA", usage: "Rule-based scanning in FORGE-X (YARA-X, isolated worker) and the malware detector.", projects: ["forge-x", "ai-malware-detector"] },
      { name: "Static malware analysis", usage: "Format-specific analyzers for PE, ELF, Mach-O, PDF and Office files — nothing is executed.", projects: ["ai-malware-detector"] },
    ],
  },
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    icon: "brain",
    description: "Classical ML applied to security data, with explainability.",
    items: [
      { name: "Scikit-learn", level: "PROFICIENT", usage: "Model training and evaluation for encrypted-traffic classification.", projects: ["ipsec-vpn-analyzer"] },
      { name: "Random Forest", level: "WORKING KNOWLEDGE", usage: "Malware classification and ESP traffic classification.", projects: ["ai-malware-detector", "ipsec-vpn-analyzer"] },
      { name: "XGBoost", level: "WORKING KNOWLEDGE", usage: "Gradient-boosted malware classifier with per-prediction explanations.", projects: ["ai-malware-detector"] },
      { name: "TreeSHAP explainability", usage: "Per-prediction explanations so model output is never an opaque score.", projects: ["ai-malware-detector"] },
      { name: "Anomaly Detection", evidence: ["Learning"], level: "WORKING KNOWLEDGE", usage: "Growing interest area for threat detection." },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "network",
    description: "Protocols and traffic, from packets to encrypted tunnels.",
    items: [
      { name: "IPsec / IKE analysis", usage: "Extracting negotiation parameters and scoring VPN cryptographic configuration.", projects: ["ipsec-vpn-analyzer"] },
      { name: "SSH (Paramiko)", usage: "A fake SSH server with stateful shell emulation and credential capture.", projects: ["honeywatch"] },
      { name: "Scapy", usage: "Packet handling in the IPsec VPN Analyzer.", projects: ["ipsec-vpn-analyzer"] },
      { name: "ARP & network attack simulation", evidence: ["Internship"], usage: "ARP poisoning to demonstrate the risk of unencrypted traffic." },
    ],
  },
  {
    id: "development",
    label: "Frameworks & Development",
    icon: "layers",
    description: "Web frameworks, APIs and front-end tooling used to ship projects.",
    items: [
      { name: "Flask", usage: "Web apps for FORGE-X and the malware detector.", projects: ["forge-x", "ai-malware-detector"] },
      { name: "FastAPI", usage: "Backend for the IPsec VPN Analyzer.", projects: ["ipsec-vpn-analyzer"] },
      { name: "React", usage: "VPN analyzer dashboard and this portfolio.", projects: ["ipsec-vpn-analyzer"] },
      { name: "aiohttp / WebSockets", usage: "Live API and event feed for HoneyWatch.", projects: ["honeywatch"] },
      { name: "Web Crypto API", usage: "AES-256-GCM and PBKDF2 in VaultX.", projects: ["vaultx"] },
      { name: "HTML & CSS", usage: "Hand-built interfaces for VaultX and FORGE-X.", projects: ["vaultx", "forge-x"] },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    description: "Relational design from schema to triggers.",
    items: [
      { name: "MySQL", usage: "33-table normalized schema with triggers, views and procedures.", projects: ["forge-x", "ai-malware-detector"] },
      { name: "SQLite", usage: "Event store for HoneyWatch and storage for the VPN analyzer.", projects: ["honeywatch", "ipsec-vpn-analyzer"] },
    ],
  },
  {
    id: "os",
    label: "Operating Systems",
    icon: "monitor",
    description: "Where the tools run and where the testing happens.",
    items: [
      { name: "Linux", evidence: ["Labs & deployments"], level: "PROFICIENT", usage: "Lab environments, sandboxed analysis workers and server deployments." },
      { name: "Windows", evidence: ["Internship"], usage: "Penetration-testing target, firewall hardening and Docker Desktop development." },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    icon: "cloud",
    description: "Packaging, CI and deployment.",
    items: [
      { name: "Docker", usage: "Compose deployments for FORGE-X and the malware detector.", projects: ["forge-x", "ai-malware-detector"] },
      { name: "Git & GitHub Actions", evidence: ["All projects"], level: "PROFICIENT", usage: "Version control across every project; GitHub Actions CI in FORGE-X.", projects: ["forge-x"] },
      { name: "S3 / MinIO", usage: "Optional object storage for evidence files, with hash-verified migration.", projects: ["forge-x"] },
      { name: "Vercel", usage: "Static dashboard and serverless sample-data API for HoneyWatch.", projects: ["honeywatch"] },
    ],
  },
];

export const skillCount = arsenal.reduce((n, c) => n + c.items.length, 0);

export const levelLabel = {
  FAMILIAR: "Familiar",
  "WORKING KNOWLEDGE": "Working knowledge",
  PROFICIENT: "Proficient",
} as const;
