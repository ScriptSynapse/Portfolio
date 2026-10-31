/**
 * EDIT ME — blog posts.
 * Only publish articles you have actually written. While this array is empty
 * the Blog section, its route and its palette entry stay hidden.
 *
 * Example:
 * {
 *   slug: "ssh-honeypot-first-week",
 *   title: "What one week of SSH honeypot traffic looks like",
 *   date: "2026-11-15",
 *   category: "Threat intelligence",
 *   summary: "One-paragraph teaser shown on the card.",
 *   relatedProjects: ["honeywatch"],
 *   blocks: [
 *     { type: "p", text: "Intro paragraph…" },
 *     { type: "h2", text: "Setup" },
 *     { type: "code", lang: "bash", text: "python honeypot.py" },
 *     { type: "list", items: ["Point one", "Point two"] },
 *   ],
 * }
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-15". */
  date: string;
  category: string;
  summary: string;
  /** Optional cover image in /public. */
  cover?: string;
  relatedProjects?: string[];
  blocks: BlogBlock[];
}

export const posts: BlogPost[] = [];

export function readingMinutes(post: BlogPost): number {
  const words = post.blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
