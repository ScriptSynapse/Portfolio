import type { Project, ProjectCategory } from "../types/portfolio";

/**
 * EDIT ME — projects.
 * Content is taken from the previous portfolio data, the resume PDF and each
 * project's own README on GitHub. Leave `demoUrl` undefined when no live demo
 * exists — the UI hides the action automatically.
 */
export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "forensics", label: "Digital Forensics" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "software", label: "Software Engineering" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  cybersecurity: "Cybersecurity",
  forensics: "Digital Forensics",
  "ai-ml": "AI / ML",
  software: "Software Engineering",
};

export const projects: Project[] = [
  {
    id: "honeywatch",
    title: "HoneyWatch — SSH Threat Intelligence Honeypot",
    shortTitle: "HoneyWatch",
    tagline: "A production-grade SSH honeypot with live attacker analytics.",
    description:
      "A production-grade SSH honeypot with stateful fake-shell emulation and canary credentials, GeoIP enrichment, attack-pattern detection, and malware capture. Ships with a real-time WebSocket dashboard and a world-map visualisation of attacker origins, backed by a SQLite event store.",
    categories: ["cybersecurity"],
    domain: "Threat Intelligence",
    icon: "honeypot",
    status: "active",
    technologies: ["Python", "Paramiko", "asyncio", "aiohttp", "SQLite", "WebSockets", "GeoIP"],
    // Fixed: the previous URL had a trailing hyphen and returned 404.
    githubUrl: "https://github.com/ScriptSynapse/HoneyWatch-SSH-Threat-Intelligence-Honeypot",
    featured: true,
    priority: 1,
    problem:
      "Brute-force and credential attacks against exposed SSH services are constant, but plain logs show little about what attackers actually try once they believe they are in.",
    solution:
      "A fake SSH server that logs everything an attacker does, enriches every connection with GeoIP and abuse-reputation data, and presents the result on a live dashboard with credential and command feeds, malware captures and downloadable PDF reports.",
    implementation: [
      "SSH server built on Paramiko with a stateful fake shell that tracks a working directory and serves realistic output for common commands.",
      "A virtual filesystem seeded with canary credentials (cloud keys, SSH keys, .env and config files) to reveal what attackers look for.",
      "Threat-intel module for GeoIP enrichment plus optional AbuseIPDB and Kaspersky OpenTIP reputation scoring.",
      "aiohttp API and WebSocket server that feeds the dashboard, with JWT sessions and spike alerting.",
      "SQLite store with indexed tables for sessions, auth attempts, commands, suspicious events, malware captures and IP reputation.",
    ],
    features: [
      "Stateful fake shell and canary/deception credentials",
      "Tarpit delays that slow automated brute-force tooling",
      "Malware capture: fetched payloads are SHA-256 hashed",
      "Attack-pattern classification (dictionary, targeted, credential stuffing, botnet sweep)",
      "Live dashboard with world map of attacker origins",
      "PDF reports and email / Discord / Slack / webhook alerts",
    ],
    challenges: [
      "Serverless hosting cannot hold an SSH socket or a long-lived WebSocket open, so the project is split: a static dashboard that works with sample data, and an always-on backend on a server you control.",
      "Real malware capture means the honeypot genuinely fetches attacker URLs — the host has to be isolated and its outbound traffic restricted so it cannot be used as a pivot.",
    ],
    architecture: {
      caption: "Request flow from an attacker's SSH session to the analyst dashboard.",
      nodes: [
        { id: "attacker", label: "Attacker", detail: "Any client attempting SSH logins against the exposed honeypot port (2222 by default).", x: 10, y: 30, kind: "external" },
        { id: "honeypot", label: "honeypot.py", detail: "Paramiko-based SSH server: fake shell, tarpit delays, credential logging and malware capture.", x: 31, y: 30, kind: "service" },
        { id: "fakefs", label: "fake_fs.py", detail: "Stateful virtual filesystem with planted canary credentials.", x: 31, y: 51, kind: "service" },
        { id: "intel", label: "threat_intel.py", detail: "GeoIP (ip-api.com), optional AbuseIPDB and Kaspersky OpenTIP lookups, attack classification.", x: 52, y: 9, kind: "external" },
        { id: "db", label: "SQLite", detail: "Sessions, auth attempts, commands, suspicious events, malware captures, IP reputation.", x: 52, y: 30, kind: "data" },
        { id: "alerts", label: "alerts.py", detail: "Spike monitor with email, Discord, Slack and webhook notifications.", x: 72, y: 51, kind: "worker" },
        { id: "reports", label: "report_gen.py", detail: "PDF threat reports generated with ReportLab.", x: 72, y: 9, kind: "worker" },
        { id: "ws", label: "ws_server.py", detail: "aiohttp REST API + WebSocket feed; also serves the dashboard and handles JWT auth.", x: 72, y: 30, kind: "service" },
        { id: "dashboard", label: "Dashboard", detail: "Browser UI: live map, credential and command feeds, malware captures, reports.", x: 90, y: 30, kind: "client" },
      ],
      edges: [
        { from: "attacker", to: "honeypot", label: "SSH" },
        { from: "honeypot", to: "fakefs" },
        { from: "honeypot", to: "intel" },
        { from: "honeypot", to: "db", label: "events" },
        { from: "intel", to: "db" },
        { from: "db", to: "ws" },
        { from: "db", to: "alerts" },
        { from: "ws", to: "reports" },
        { from: "ws", to: "dashboard", label: "WS" },
      ],
    },
  },
  {
    id: "forge-x",
    title: "FORGE-X — Digital Forensics Evidence Management System",
    shortTitle: "FORGE-X",
    tagline: "Secure. Track. Investigate. Maintain Integrity.",
    description:
      "A digital forensics lab platform for case management, evidence registration, and SHA-256 integrity verification with an append-only chain of custody. Enforces role-based access control with full audit logging, runs independently reviewed examinations, generates PDF forensic reports and investigation analytics, and scans evidence with YARA-X in an isolated worker — backed by MySQL triggers, views, and stored procedures.",
    categories: ["forensics", "software"],
    domain: "Digital Forensics",
    icon: "forensics",
    status: "active",
    technologies: ["Python", "Flask", "MySQL", "Bootstrap 5", "Chart.js", "ReportLab", "YARA-X", "Docker"],
    githubUrl: "https://github.com/ScriptSynapse/Forge-X",
    featured: true,
    priority: 2,
    problem:
      "A forensic lab has to prove that evidence and its history were never altered — custody entries, hashes, verifications and reports must be impossible to rewrite, even by a buggy application.",
    solution:
      "A web application that keeps cases, evidence, SHA-256 integrity checks, chain of custody, examinations, reports and the audit trail in one MySQL database, where history can be appended to but never edited or deleted. Built as a B.Tech DBMS academic project on synthetic data.",
    implementation: [
      "Flask blueprints call a service layer that runs every multi-step change as a single transaction — routes never contain SQL.",
      "Normalized MySQL schema (3NF/BCNF) with 33 tables, 41 triggers, 12 stored procedures, 8 views and 47 CHECK constraints.",
      "Integrity rules enforced twice: in Flask and again in MySQL, with a least-privilege database account that has no UPDATE or DELETE on append-only tables.",
      "YARA-X scans run in a separate worker process with time and memory limits and no secrets.",
      "Read-only REST API with personal tokens and rate limits; Docker Compose and GitHub Actions CI.",
    ],
    features: [
      "Case management with status workflow and append-only notes",
      "Evidence vault with write-once storage and SHA-256 on arrival",
      "Append-only chain of custody; every download is recorded",
      "Examinations and reports with independent review",
      "Four roles: Administrator, Investigator, Evidence Custodian, Auditor",
      "Relationship graph, analytics charts and full audit log",
    ],
    challenges: [
      "Making forensic history tamper-resistant: triggers reject UPDATE/DELETE on history tables and the app account lacks the privileges to try.",
      "Keeping reports honest — approval must come from someone other than the author, enforced by constraints rather than UI checks.",
    ],
    results: [
      "Automated test suite: about 330 tests pass (43 opt-in or data-dependent tests skipped), per the repository README.",
      "Database verification script ends with zero failed checks on a fresh install.",
    ],
    limitations: [
      "Academic project on synthetic data — not a certified forensic tool.",
      "Final phase (Docker + GitHub Actions) has passing tests; the first Docker run and CI run were still to be confirmed at the time of the README.",
    ],
    architecture: {
      caption: "Every change goes through a transactional service layer; history is protected by MySQL itself.",
      nodes: [
        { id: "browser", label: "Browser", detail: "Jinja2 + Bootstrap 5 UI for investigators, custodians, auditors and admins.", x: 11, y: 18, kind: "client" },
        { id: "api", label: "API clients", detail: "Scripts using the read-only /api/v1 with bearer tokens and rate limits.", x: 11, y: 44, kind: "client" },
        { id: "app", label: "Flask app", detail: "Blueprints + service layer under Waitress; CSRF, RBAC and audit logging on every route.", x: 38, y: 30, kind: "service" },
        { id: "mysql", label: "MySQL 8", detail: "33 tables, 41 triggers, 12 procedures, 8 views; append-only history; least-privilege account.", x: 66, y: 12, kind: "data" },
        { id: "files", label: "Evidence store", detail: "Write-once evidence files on local disk or S3/MinIO, referenced by SHA-256.", x: 66, y: 32, kind: "data" },
        { id: "yara", label: "YARA worker", detail: "Separate process with no secrets, time and memory limits, versioned rule library.", x: 66, y: 51, kind: "worker" },
        { id: "pdf", label: "PDF reports", detail: "Immutable report versions exported with ReportLab.", x: 89, y: 32, kind: "worker" },
      ],
      edges: [
        { from: "browser", to: "app", label: "HTTPS" },
        { from: "api", to: "app", label: "token" },
        { from: "app", to: "mysql" },
        { from: "app", to: "files" },
        { from: "app", to: "yara" },
        { from: "files", to: "pdf" },
      ],
    },
  },
  {
    id: "ai-malware-detector",
    title: "AI Malware Detection System",
    shortTitle: "AI Malware Detector",
    tagline: "Static analysis + ensemble ML — nothing is ever executed.",
    description:
      "An explainable static malware-analysis platform. Files are identified by content, parsed by format-specific analyzers in an isolated worker, matched against curated YARA rules and scored by Random Forest and XGBoost models — with every point of the risk score traced to a finding. Includes scan history, comparison and downloadable PDF security reports.",
    categories: ["ai-ml", "cybersecurity"],
    domain: "Malware Analysis",
    icon: "malware",
    status: "active",
    technologies: ["Python", "Flask", "Random Forest", "XGBoost", "MySQL", "YARA", "ReportLab", "Docker"],
    githubUrl: "https://github.com/ScriptSynapse/AI-Malware-Detector",
    featured: true,
    priority: 3,
    problem:
      "Analysts need a fast first opinion on a suspicious file without running it, and a single opaque ML score is not trustworthy enough to act on.",
    solution:
      "A static-analysis pipeline that combines structural, entropy and import/export features with YARA matches, optional hash-reputation lookups and ensemble models, and only ever reports evidence-backed verdicts: malicious, suspicious, no threats detected or inconclusive.",
    implementation: [
      "Content-signature detection for PE, ELF, Mach-O, PDF, Office, archives, scripts and more, with findings when a file's name disagrees with its content.",
      "Analyzer registry running in a resource-limited, network-isolated worker.",
      "Random Forest and XGBoost trained with de-duplication, group-aware splits, cross-validation and per-prediction explanations (TreeSHAP).",
      "30 curated YARA rules; opt-in MalwareBazaar and VirusTotal lookups that send only the SHA-256.",
      "Flask web app with Argon2id password hashing, roles, CSRF protection, rate limits and a full audit log.",
    ],
    features: [
      "50+ structural, entropy, import/export and section-level features",
      "Model comparison and feature-importance explainability",
      "Honest verdicts — unsupported or encrypted content is never called clean",
      "Scan history, comparison and evidence-backed PDF reports",
      "Admin, analyst and viewer roles",
    ],
    challenges: [
      "Generalisation: the selected model scores very highly on its held-out dataset but flagged 46% of 26 benign Windows tools from outside that dataset. The platform therefore never lets the model decide a verdict alone.",
      "Parsing hostile input safely — truncated headers, archive bombs and path traversal are handled inside a sandboxed worker.",
    ],
    results: [
      "Held-out test split of the Te-k dataset (27,608 samples): precision 99.58%, recall 99.61%, false-positive rate 0.98% — figures that describe that dataset only.",
      "External check on 26 benign Windows tools: 46% flagged as malicious, which is why verdicts never rely on the model alone.",
    ],
    architecture: {
      caption: "Uploads are quarantined and analysed by an isolated worker; MySQL holds every result and audit event.",
      nodes: [
        { id: "browser", label: "Analyst", detail: "Submits files, reviews findings, compares scans and downloads reports.", x: 10, y: 30, kind: "client" },
        { id: "web", label: "Flask web", detail: "Flask + gunicorn: auth, roles, uploads, reports, audit log.", x: 32, y: 30, kind: "service" },
        { id: "intel", label: "Hash reputation", detail: "Opt-in MalwareBazaar / VirusTotal lookups — only the SHA-256 leaves the system.", x: 56, y: 9, kind: "external" },
        { id: "mysql", label: "MySQL 8.4", detail: "Users, scans, findings, YARA matches, model versions, predictions, audit events.", x: 56, y: 30, kind: "data" },
        { id: "quarantine", label: "Quarantine", detail: "Volume holding uploaded samples, referenced from MySQL by path and SHA-256.", x: 56, y: 51, kind: "data" },
        { id: "worker", label: "Analysis worker", detail: "No internet; per-job sandboxed child process running analyzers, YARA and the ML models.", x: 82, y: 40, kind: "worker" },
      ],
      edges: [
        { from: "browser", to: "web", label: "HTTPS" },
        { from: "web", to: "intel" },
        { from: "web", to: "mysql" },
        { from: "web", to: "quarantine" },
        { from: "quarantine", to: "worker" },
        { from: "worker", to: "mysql", label: "results" },
      ],
    },
    figures: [
      {
        src: "/project-images/ai-malware-feature-importance.webp",
        alt: "Bar chart of the top 20 feature importances; ImportsNbOrdinal and SectionsMajVirtualsize rank highest.",
        caption: "Top-20 feature importances from the project repository (prototype model).",
      },
    ],
  },
  {
    id: "vaultx",
    title: "VaultX — Secure Password Manager",
    shortTitle: "VaultX",
    tagline: "Browser-based password vault, encrypted client-side.",
    description:
      "A browser-based password generator and vault that encrypts every entry with AES-256-GCM, using a key derived from a user-chosen master password via PBKDF2 (250,000 iterations) — nothing that could reconstruct the key ever touches storage. Includes a cryptographically random password generator, an entropy-based strength meter, auto-lock, and JSON/Excel/CSV import & export.",
    categories: ["cybersecurity", "software"],
    domain: "Applied Cryptography",
    icon: "vault",
    status: "active",
    technologies: ["JavaScript", "Web Crypto API", "AES-256-GCM", "PBKDF2"],
    githubUrl: "https://github.com/ScriptSynapse/Secure-Password-Generator",
    demoUrl: "https://scriptsynapse.github.io/Secure-Password-Generator/",
    demoNote: "Hosted on GitHub Pages",
    featured: true,
    priority: 4,
    problem:
      "Simple password tools often store secrets in plain text or hard-code a master password, so anyone with access to the browser storage can read the vault.",
    solution:
      "A local, single-device vault where the encryption key is derived in memory from the user's master password on every unlock and is never written anywhere.",
    implementation: [
      "AES-256-GCM encryption with a key derived via PBKDF2 (250,000 iterations) using the Web Crypto API.",
      "Password generator using crypto.getRandomValues with rejection sampling to avoid modulo bias.",
      "Entropy-based strength meter, search and filter, and auto-lock after 5 minutes of inactivity.",
      "Import and export in JSON, Excel and CSV.",
    ],
    features: [
      "Master password chosen by the user — nothing hard-coded",
      "Client-side AES-256-GCM encryption",
      "Cryptographically random password generator",
      "Auto-lock that discards the key from memory",
      "Responsive UI for desktop and mobile",
    ],
    challenges: [
      "No recovery by design: without the master password the vault cannot be decrypted by anyone, so the UI pushes users toward regular backups.",
      "Exports are plain text, so the documentation makes that trade-off explicit instead of hiding it.",
    ],
    architecture: {
      caption: "All cryptography happens in the browser; only ciphertext reaches storage.",
      nodes: [
        { id: "user", label: "User", detail: "Chooses a master password and manages credentials.", x: 10, y: 30, kind: "client" },
        { id: "kdf", label: "PBKDF2", detail: "250,000 iterations derive the vault key from the master password on every unlock.", x: 33, y: 13, kind: "service" },
        { id: "key", label: "AES-GCM key", detail: "256-bit key held in memory only; discarded on lock or auto-lock.", x: 57, y: 13, kind: "service" },
        { id: "gen", label: "Generator", detail: "crypto.getRandomValues with rejection sampling; entropy-based strength meter.", x: 33, y: 47, kind: "service" },
        { id: "vault", label: "Encrypted vault", detail: "AES-256-GCM ciphertext persisted in localStorage.", x: 80, y: 30, kind: "data" },
        { id: "export", label: "Export", detail: "JSON / Excel / CSV backups — plain text, documented as such.", x: 80, y: 51, kind: "external" },
      ],
      edges: [
        { from: "user", to: "kdf", label: "master pw" },
        { from: "kdf", to: "key" },
        { from: "key", to: "vault", label: "encrypt" },
        { from: "user", to: "gen" },
        { from: "gen", to: "vault", label: "save" },
        { from: "vault", to: "export" },
      ],
    },
  },
  {
    id: "ipsec-vpn-analyzer",
    title: "IPsec VPN Analyzer Dashboard",
    shortTitle: "IPsec VPN Analyzer",
    tagline: "What encrypted VPN traffic still reveals — without decrypting it.",
    description:
      "A cybersecurity analysis platform that inspects IPsec VPN packet captures, extracts IKE negotiation parameters and assesses cryptographic configuration security. Adds rule-based security scoring, threat findings and metadata-exposure analysis, plus a Random Forest classifier over ESP traffic patterns — all without decrypting payloads.",
    categories: ["cybersecurity", "ai-ml"],
    domain: "Network Security",
    icon: "vpn",
    technologies: ["Python", "FastAPI", "React", "Scikit-learn", "Random Forest", "Scapy", "Wireshark", "SQLite"],
    githubUrl: "https://github.com/ScriptSynapse/IPsec-VPN-Analyzer-Dashboard",
    priority: 5,
    problem:
      "IPsec encrypts payloads, but negotiation parameters, packet sizes, timing, bursts and peer patterns can still be observed — and weak configurations are easy to miss.",
    solution:
      "A pipeline that parses IKE/IPsec metadata from packet captures, scores the cryptographic configuration with traceable rules, classifies encrypted ESP flows with machine learning and profiles what an outside observer could still learn.",
    implementation: [
      "IKE parsing through TShark / Wireshark packet decoding — the VPN payload is never decrypted.",
      "Rule-based scoring of encryption, integrity, Diffie-Hellman group, PFS and policy compliance, producing a threat matrix of findings.",
      "ESP flow extraction and features (packet size, timing, burstiness, throughput, flow duration) feeding a Random Forest classifier.",
      "Observer profile covering traffic identifiability, padding exposure, temporal patterns, peer stability and volume signatures.",
      "FastAPI backend and React dashboard with scores, findings, flows, reports and topology.",
    ],
    features: [
      "IKE version, cipher, DH group and PFS extraction",
      "Overall, cryptographic-strength, compliance and key-management scores",
      "Threat matrix with severity, impact and recommendation",
      "Encrypted traffic classification with confidence and feature importance",
      "Metadata exposure (observer) profiles",
    ],
    challenges: [
      "Producing useful findings from encrypted traffic without ever touching payloads — every result comes from negotiation metadata and flow statistics.",
      "Keeping scores explainable: findings trace back to specific rules rather than a single opaque number.",
    ],
    architecture: {
      caption: "Three analysis tracks run over the same capture and meet in the dashboard.",
      nodes: [
        { id: "pcap", label: "PCAP", detail: "Packet capture of IPsec VPN traffic.", x: 9, y: 30, kind: "external" },
        { id: "api", label: "FastAPI", detail: "Backend that orchestrates parsing, scoring, ML and reporting.", x: 28, y: 30, kind: "service" },
        { id: "ike", label: "IKE parser", detail: "TShark/Wireshark decoding of negotiation parameters.", x: 49, y: 10, kind: "service" },
        { id: "esp", label: "ESP features", detail: "Packet size, timing, burst, throughput and flow statistics.", x: 49, y: 30, kind: "service" },
        { id: "obs", label: "Observer", detail: "Metadata observable by an outside party.", x: 49, y: 50, kind: "service" },
        { id: "score", label: "Scoring", detail: "Rule-based security score and threat matrix.", x: 70, y: 10, kind: "worker" },
        { id: "rf", label: "Random Forest", detail: "Encrypted traffic classification with confidence and feature importance.", x: 70, y: 30, kind: "worker" },
        { id: "meta", label: "Exposure", detail: "Identifiability, padding, temporal and volume-signature analysis.", x: 70, y: 50, kind: "worker" },
        { id: "ui", label: "React UI", detail: "Scores, findings, flows, reports, observer profiles and topology.", x: 90, y: 30, kind: "client" },
      ],
      edges: [
        { from: "pcap", to: "api" },
        { from: "api", to: "ike" },
        { from: "api", to: "esp" },
        { from: "api", to: "obs" },
        { from: "ike", to: "score" },
        { from: "esp", to: "rf" },
        { from: "obs", to: "meta" },
        { from: "score", to: "ui" },
        { from: "rf", to: "ui" },
        { from: "meta", to: "ui" },
      ],
    },
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
