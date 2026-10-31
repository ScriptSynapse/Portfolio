import { Bug, Fingerprint, KeyRound, Network, Radar } from "lucide-react";
import type { Project } from "../../types/portfolio";

const icons = { honeypot: Radar, forensics: Fingerprint, malware: Bug, vault: KeyRound, vpn: Network } as const;

export function ProjectIcon({ icon, size = 20 }: { icon: Project["icon"]; size?: number }) {
  const Icon = icons[icon];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
