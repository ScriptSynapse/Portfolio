import { sections } from "../../data/navigation";

interface TelemetryHUDProps {
  activeIndex: number;
  progress: number;
  drsActive: boolean;
}

export function TelemetryHUD({ activeIndex, progress, drsActive }: TelemetryHUDProps) {
  return (
    <div
      className="fixed right-5 top-24 z-30 hidden xl:flex flex-col gap-1.5 rounded-sm border border-line bg-surface/70 backdrop-blur-md px-4 py-3 text-mono text-[10px] tracking-[0.15em] w-40"
      aria-hidden="true"
    >
      <Row label="SESSION" value="PORTFOLIO" />
      <Row label="STATUS" value="LIVE" valueClass="text-online" />
      <Row label="SYSTEM" value="ONLINE" />
      <Row label="LAP" value={`${String(activeIndex + 1).padStart(2, "0")} / ${String(sections.length).padStart(2, "0")}`} />
      <Row label="SECTOR" value={sections[activeIndex]?.lapLabel.toUpperCase() ?? ""} />
      <Row label="SCROLL" value={`${Math.round(progress)}%`} />
      {drsActive && <Row label="DRS" value="ENABLED" valueClass="text-red" />}
    </div>
  );
}

function Row({ label, value, valueClass = "text-ink" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-grey-dim">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
