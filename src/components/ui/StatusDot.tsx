import type { SystemStatus } from "../../types/portfolio";

const statusConfig: Record<SystemStatus, { color: string; label: string }> = {
  online: { color: "bg-online", label: "AVAILABLE" },
  active: { color: "bg-online", label: "ACTIVE" },
  development: { color: "bg-warning", label: "DEVELOPMENT" },
  learning: { color: "bg-dev", label: "LEARNING" },
  planned: { color: "bg-grey-dim", label: "PLANNED" },
};

interface StatusDotProps {
  status: SystemStatus;
  label?: string;
  className?: string;
}

export function StatusDot({ status, label, className = "" }: StatusDotProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-2 text-mono text-xs tracking-wider ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${config.color} animate-pulse-soft`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.color}`} />
      </span>
      {label ?? config.label}
    </span>
  );
}
