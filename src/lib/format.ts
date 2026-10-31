export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
