import { motion } from "framer-motion";
import type { Question } from "../types";
import { isMultipleAnswer } from "../lib/questionUtils";

type Props = {
  question: Question;
  questionIndex: number;
  selected: number[];
  onChange: (next: number[]) => void;
  /** Practice mode: show correct / incorrect styling and lock inputs */
  revealed?: boolean;
};

export function AnswerOptions({
  question,
  questionIndex,
  selected,
  onChange,
  revealed = false,
}: Props) {
  const multi = isMultipleAnswer(question);
  const correctSet = new Set(question.answer);
  const inputLocked = revealed;

  const toggleMulti = (idx: number) => {
    if (inputLocked) return;
    const set = new Set(selected);
    if (set.has(idx)) set.delete(idx);
    else set.add(idx);
    onChange([...set].sort((a, b) => a - b));
  };

  const setSingle = (idx: number) => {
    if (inputLocked) return;
    onChange([idx]);
  };

  const optionClasses = (idx: number): string => {
    const isOn = selected.includes(idx);
    const isCorrectOption = correctSet.has(idx);
    const base =
      "flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background";

    if (!revealed) {
      const idle = isOn
        ? "border-primary/45 bg-brand-soft shadow-sm ring-1 ring-primary/15 dark:border-primary/35 dark:bg-primary-muted/85 dark:ring-primary/25"
        : "border-border/90 bg-card/90 hover:border-border hover:bg-muted/55 dark:border-border/80 dark:bg-card/80 dark:hover:border-muted-foreground/35 dark:hover:bg-muted/50";
      return `${base} ${idle}`;
    }

    if (isCorrectOption && isOn) {
      return `${base} border-review-correct-border/80 bg-review-correct-bg shadow-sm ring-1 ring-review-correct-border/35`;
    }
    if (isCorrectOption && !isOn) {
      return `${base} border-review-correct-border/70 bg-review-correct-bg/75 ring-1 ring-review-correct-border/30 opacity-95`;
    }
    if (!isCorrectOption && isOn) {
      return `${base} border-review-wrong-border/85 bg-review-wrong-bg shadow-sm ring-1 ring-review-wrong-border/35`;
    }
    return `${base} border-border/70 bg-muted/40 opacity-80`;
  };

  return (
    <div className="space-y-3">
      {multi && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Câu này có thể có nhiều hơn một đáp án đúng.
        </p>
      )}
      <ul className="space-y-2.5">
        {question.options.map((label, idx) => {
          const isOn = selected.includes(idx);
          const controlClass =
            "mt-0.5 h-4 w-4 border-input bg-background text-primary shadow-sm transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

          if (multi) {
            return (
              <motion.li key={idx} layout initial={false}>
                <label
                  className={`${optionClasses(idx)} ${inputLocked ? "cursor-default" : ""}`}
                >
                  <input
                    type="checkbox"
                    className={`${controlClass} rounded`}
                    checked={isOn}
                    disabled={inputLocked}
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
              <label
                className={`${optionClasses(idx)} ${inputLocked ? "cursor-default" : ""}`}
              >
                <input
                  type="radio"
                  className={`${controlClass} rounded-full`}
                  checked={isOn}
                  disabled={inputLocked}
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
