import { motion } from "framer-motion";
import type { ThemePreference } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M8 20h8" />
    </svg>
  );
}

const modes: { value: ThemePreference; label: string; Icon: typeof SunIcon }[] = [
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
  { value: "system", label: "Match system", Icon: MonitorIcon },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  return (
    <div
      className="inline-flex rounded-xl border border-border bg-muted/60 p-1 shadow-sm backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10"
      role="group"
      aria-label="Color theme"
    >
      {modes.map(({ value, label, Icon }) => {
        const active = preference === value;
        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => setPreference(value)}
            aria-pressed={active}
            title={label}
            whileTap={{ scale: 0.96 }}
            className={[
              "relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:bg-card/70 hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="shrink-0" />
            <span className="sr-only">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
