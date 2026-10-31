import type { Achievement, Certification } from "../types/portfolio";

/**
 * EDIT ME — verified certifications only.
 * Add certificate images to /public/certification-images and set `image`;
 * add `credentialUrl` when a verification link exists.
 */
export const certifications: Certification[] = [
  {
    id: "hackerrank-software-engineer-intern",
    image: "/certification-images/hackerrank-software-engineer-intern.webp",
    thumb: "/certification-images/hackerrank-software-engineer-intern-thumb.webp",
    credentialId: "AA56F729E937",
    // HackerRank public verification page for this ID — click once to confirm it opens.
    credentialUrl: "https://www.hackerrank.com/certificates/aa56f729e937",
    name: "Software Engineer Intern",
    issuer: "HackerRank",
    date: "September 10, 2026",
    skills: ["Software Engineering"],
  },
  {
    id: "paloalto-network-security-fundamentals",
    image: "/certification-images/paloalto-network-security-fundamentals.webp",
    thumb: "/certification-images/paloalto-network-security-fundamentals-thumb.webp",
    name: "Network Security Fundamentals",
    issuer: "Palo Alto Networks Academy",
    date: "April 16, 2026",
    skills: ["Network Security"],
  },
  {
    id: "hackerrank-python-basic",
    image: "/certification-images/hackerrank-python-basic.webp",
    thumb: "/certification-images/hackerrank-python-basic-thumb.webp",
    credentialId: "E23ABF8D5045",
    // HackerRank public verification page for this ID — click once to confirm it opens.
    credentialUrl: "https://www.hackerrank.com/certificates/e23abf8d5045",
    name: "Python (Basic)",
    issuer: "HackerRank",
    date: "November 28, 2025",
    skills: ["Python"],
  },
  {
    id: "paloalto-cybersecurity-fundamentals",
    image: "/certification-images/paloalto-cybersecurity-fundamentals.webp",
    thumb: "/certification-images/paloalto-cybersecurity-fundamentals-thumb.webp",
    name: "Cybersecurity Fundamentals",
    issuer: "Palo Alto Networks Academy",
    date: "November 20, 2025",
    skills: ["Cybersecurity Fundamentals"],
  },
  {
    id: "hackerrank-problem-solving-basic",
    image: "/certification-images/hackerrank-problem-solving-basic.webp",
    thumb: "/certification-images/hackerrank-problem-solving-basic-thumb.webp",
    credentialId: "F4D4A3F6AB10",
    // HackerRank public verification page for this ID — click once to confirm it opens.
    credentialUrl: "https://www.hackerrank.com/certificates/f4d4a3f6ab10",
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "November 3, 2025",
    skills: ["Problem Solving"],
  },
  {
    // From the resume / certificate (no date printed on it). Issued with KSHITIJ techno-management fest.
    id: "launched-global-cyber-mentorship",
    image: "/certification-images/launched-global-cyber-mentorship.webp",
    thumb: "/certification-images/launched-global-cyber-mentorship-thumb.webp",
    credentialId: "LEDCC8777",
    name: "Cyber Security Mentorship Program",
    issuer: "Launched Global",
    skills: ["Cybersecurity"],
  },
];

/**
 * EDIT ME — achievements and recognitions.
 * Leadership roles (SIH core team, CIPHATHON 26) now live in the Leadership
 * section — see experience.ts.
 */
export const achievements: Achievement[] = [
  {
    id: "sih-first-in-college",
    title: "Smart India Hackathon — 1st Place in College",
    organisation: "Smart India Hackathon · MIT World Peace University",
    // Add the SIH edition/year, team name, problem statement and a link when available.
    category: "hackathon",
    description: "Our team was placed first in our college for Smart India Hackathon.",
    highlights: ["1st place in college", "Team achievement"],
    rank: "1st",
  },
  {
    id: "hackx-zero-day-award",
    title: "Zero-Day Award — Hack-X Club",
    organisation: "Hack-X Club",
    // Add the date when available.
    category: "recognition",
    description:
      "Presented in recognition of an exceptional contribution that created immediate impact and strengthened the mission of Hack-X.",
    highlights: ["Exceptional contribution", "Immediate impact", "Presented by the Hack-X Club President"],
    rank: "0-Day",
  },
];
