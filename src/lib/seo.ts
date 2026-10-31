const ORIGIN = "https://portfolio.paulsonfernandes.tech";
const DEFAULT_DESC =
  "Portfolio of Paulson Alex Fernandes — Cybersecurity & Digital Forensics student at MIT World Peace University building threat-intelligence, forensics, malware-analysis and applied-cryptography tools.";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Per-route title, description, canonical and Open Graph tags (client-side). */
export function setPageMeta({ title, description = DEFAULT_DESC, path = "/" }: { title: string; description?: string; path?: string }) {
  const url = `${ORIGIN}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", url);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
}

export const HOME_TITLE = "Paulson Alex Fernandes — Cybersecurity & Digital Forensics Portfolio";
