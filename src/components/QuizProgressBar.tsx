import { motion } from "framer-motion";

export function QuizProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.min(100, ((current + 1) / total) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted ring-1 ring-border/60">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent shadow-sm dark:shadow-[0_0_12px_rgb(var(--primary)/0.35)]"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
