import { motion } from "framer-motion";

export function QuestionNavigator({
  total,
  currentIndex,
  answers,
  onSelect,
}: {
  total: number;
  currentIndex: number;
  answers: Record<number, number[]>;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="navigation" aria-label="Question navigator">
      {Array.from({ length: total }, (_, i) => {
        const answered = (answers[i]?.length ?? 0) > 0;
        const active = i === currentIndex;
        return (
          <motion.button
            key={i}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(i)}
            aria-current={active ? "step" : undefined}
            className={[
              "flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/25"
                : answered
                  ? "bg-success-muted text-foreground ring-1 ring-success-border/45 hover:bg-success-muted/90"
                  : "bg-card text-muted-foreground ring-1 ring-border/90 hover:bg-muted hover:text-foreground",
            ].join(" ")}
          >
            {i + 1}
          </motion.button>
        );
      })}
    </div>
  );
}
