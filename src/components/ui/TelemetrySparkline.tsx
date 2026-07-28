export function TelemetrySparkline({ seed = 0 }: { seed?: number }) {
    const base = [6, 20, 12, 28, 18, 34, 24, 38, 30, 40];
    const points = base.map((v, i) => Math.min(38, v + (((i + seed) * 7) % 6)));
    const step = 100 / (points.length - 1);

    const toPath = (vals: number[]) =>
        vals.map((y, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(40 - y).toFixed(1)}`).join(" ");

    const redPath = toPath(points);
    const greenPath = toPath(points.map((y) => y * 0.4 + 3));

    return (
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-20 w-full" aria-hidden="true">
            <path d={greenPath} stroke="var(--color-online)" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.55" />
            <path d={redPath} stroke="var(--color-red)" strokeWidth="1.5" fill="none" />
        </svg>
    );
}
