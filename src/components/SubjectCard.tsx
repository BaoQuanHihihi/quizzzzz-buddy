import { motion } from "framer-motion";
import type { SubjectData } from "../types";
import { getPracticeCount } from "../lib/storage";

export function SubjectCard({
  subject,
  index,
  onStart,
}: {
  subject: SubjectData;
  index: number;
  onStart: () => void;
}) {
  const practiced = getPracticeCount(subject.id);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-border/80 bg-card/95 p-5 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:border-border hover:shadow-lift dark:hover:shadow-glow"
    >
      <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
        {subject.name}
      </h3>
      <p className="mt-2 text-sm leading-snug text-muted-foreground">
        {subject.questions.length} question{subject.questions.length === 1 ? "" : "s"}
        {practiced > 0 ? ` · Practiced ${practiced} time${practiced === 1 ? "" : "s"}` : ""}
      </p>
      <div className="mt-5 flex flex-1 items-end">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-colors hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Start
        </motion.button>
      </div>
    </motion.article>
  );
}
