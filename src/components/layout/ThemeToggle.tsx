import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "../../lib/theme-context";

const options: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "system", label: "Match system theme", Icon: Monitor },
];

export function ThemeToggle({ className = "inline-flex" }: { className?: string }) {
  const { preference, setPreference } = useTheme();
  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`items-center rounded-lg border border-line bg-card/70 p-0.5 ${className}`}
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const i = options.findIndex((o) => o.value === preference);
        const next = options[(i + (e.key === "ArrowRight" ? 1 : options.length - 1)) % options.length];
        setPreference(next.value);
        (e.currentTarget.querySelector(`[data-value="${next.value}"]`) as HTMLElement | null)?.focus();
      }}
    >
      {options.map(({ value, label, Icon }) => {
        const active = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            data-value={value}
            tabIndex={active ? 0 : -1}
            onClick={() => setPreference(value)}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              active ? "bg-accent-soft text-accent" : "text-text-3 hover:text-text"
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
