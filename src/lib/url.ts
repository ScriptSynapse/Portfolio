/** Allow only https:, mailto: and same-site paths in rendered links. */
export function safeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const u = new URL(url);
    if (u.protocol === "https:" || u.protocol === "mailto:") return u.toString();
  } catch {
    /* invalid */
  }
  return undefined;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
