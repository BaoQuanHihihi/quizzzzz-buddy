import { motion } from "framer-motion";
import type { Question } from "../types";
import { isMultipleAnswer } from "../lib/questionUtils";

type Props = {
  question: Question;
  questionIndex: number;
  selected: number[];
  onChange: (next: number[]) => void;
};

export function AnswerOptions({ question, questionIndex, selected, onChange }: Props) {
  const multi = isMultipleAnswer(question);

  const toggleMulti = (idx: number) => {
    const set = new Set(selected);
    if (set.has(idx)) set.delete(idx);
    else set.add(idx);
    onChange([...set].sort((a, b) => a - b));
  };

  const setSingle = (idx: number) => {
    onChange([idx]);
  };

  return (
    <div className="space-y-3">
      {multi && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          This question may have multiple correct answers.
        </p>
      )}
      <ul className="space-y-2.5">
        {question.options.map((label, idx) => {
          const isOn = selected.includes(idx);
          const base =
            "flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background";
          const idle = isOn
            ? "border-primary/45 bg-brand-soft shadow-sm ring-1 ring-primary/15 dark:border-primary/35 dark:bg-primary-muted/85 dark:ring-primary/25"
            : "border-border/90 bg-card/90 hover:border-border hover:bg-muted/55 dark:border-border/80 dark:bg-card/80 dark:hover:border-muted-foreground/35 dark:hover:bg-muted/50";

          const controlClass =
            "mt-0.5 h-4 w-4 border-input bg-background text-primary shadow-sm transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

          if (multi) {
            return (
              <motion.li key={idx} layout initial={false}>
                <label className={`${base} ${idle}`}>
                  <input
                    type="checkbox"
                    className={`${controlClass} rounded`}
                    checked={isOn}
                    onChange={() => toggleMulti(idx)}
                  />
                  <span className="text-sm font-medium leading-relaxed text-foreground">
                    {label}
                  </span>
                </label>
              </motion.li>
            );
          }

          return (
            <motion.li key={idx} layout initial={false}>
              <label className={`${base} ${idle}`}>
                <input
                  type="radio"
                  className={`${controlClass} rounded-full`}
                  checked={isOn}
                  onChange={() => setSingle(idx)}
                  name={`mcq-${questionIndex}`}
                />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {label}
                </span>
              </label>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
