import { useCallback, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { QuizProgressBar } from "../components/QuizProgressBar";
import { QuestionNavigator } from "../components/QuestionNavigator";
import { AnswerOptions } from "../components/AnswerOptions";
import { useQuiz } from "../context/QuizContext";
import { useQuizTimer } from "../hooks/useQuizTimer";
import { formatOptionLabels, isMultipleAnswer } from "../lib/questionUtils";
import { evaluateQuestion } from "../lib/score";
import { formatCountdown } from "../lib/timerFormat";

export function QuizPage() {
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : "";
  const navigate = useNavigate();
  const {
    session,
    result,
    submitQuiz,
    updateAnswer,
    revealPracticeQuestion,
    setCurrentIndex,
    abandonQuiz,
  } = useQuiz();

  const onExpire = useCallback(() => {
    submitQuiz();
    navigate(`/subject/${encodeURIComponent(id)}/results`);
  }, [submitQuiz, navigate, id]);

  const remaining = useQuizTimer(session?.deadlineAt ?? null, onExpire);

  useEffect(() => {
    if (result && result.subjectId !== id) {
      navigate(`/subject/${encodeURIComponent(id)}/setup`, { replace: true });
      return;
    }
    if (result) return;
    if (!session || session.config.subjectId !== id) {
      navigate(`/subject/${encodeURIComponent(id)}/setup`, { replace: true });
    }
  }, [session, result, id, navigate]);

  if (!session || session.config.subjectId !== id) {
    if (result && result.subjectId === id) {
      return (
        <Navigate to={`/subject/${encodeURIComponent(id)}/results`} replace />
      );
    }
    return null;
  }

  const total = session.questions.length;
  const idx = Math.min(session.currentIndex, total - 1);
  const q = session.questions[idx]!;
  const selected = session.answers[idx] ?? [];
  const isPractice = session.mode === "practice";
  const revealed = !!session.practiceRevealed[idx];
  const multi = isMultipleAnswer(q);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    setCurrentIndex(clamped);
  };

  const lowTime = remaining != null && remaining > 0 && remaining <= 60;
  const urgentTime = remaining != null && remaining > 0 && remaining <= 15;

  const handleSubmit = () => {
    submitQuiz();
    navigate(`/subject/${encodeURIComponent(id)}/results`);
  };

  const handleAnswerChange = (next: number[]) => {
    if (isPractice) {
      if (multi) {
        updateAnswer(idx, next);
        return;
      }
      updateAnswer(idx, next, { revealPractice: true });
      return;
    }
    updateAnswer(idx, next);
    if (!multi && idx < total - 1) {
      setCurrentIndex(idx + 1);
    }
  };

  const handlePracticeCheckMulti = () => {
    if (selected.length === 0) return;
    revealPracticeQuestion(idx);
  };

  const practiceEval = isPractice && revealed ? evaluateQuestion(q, idx, selected) : null;

  return (
    <PageShell>
      <nav className="flex flex-wrap items-center justify-between gap-3 pr-14 sm:pr-0">
        <Link
          to={`/subject/${encodeURIComponent(id)}/setup`}
          onClick={(e) => {
            if (
              !confirm("Leave quiz? Your progress is saved and you can resume from setup.")
            ) {
              e.preventDefault();
            }
          }}
          className="text-sm font-medium text-primary hover:text-primary-hover hover:underline"
        >
          ← Setup
        </Link>
        <button
          type="button"
          onClick={() => {
            if (confirm("End quiz and discard this attempt?")) {
              abandonQuiz();
              navigate("/", { replace: true });
            }
          }}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Exit
        </button>
      </nav>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Question{" "}
          <span className="tabular-nums text-foreground">
            {idx + 1} / {total}
          </span>
        </p>
        {remaining != null && (
          <motion.div
            animate={{
              scale: urgentTime ? [1, 1.04, 1] : 1,
            }}
            transition={{ repeat: urgentTime ? Infinity : 0, duration: 1 }}
            className={[
              "rounded-full px-3 py-1 text-xs font-bold tabular-nums transition-colors",
              urgentTime
                ? "bg-danger-muted text-danger ring-1 ring-danger-border/55"
                : lowTime
                  ? "bg-warning-muted text-warning ring-1 ring-warning-border/45"
                  : "bg-muted text-foreground ring-1 ring-border/80",
            ].join(" ")}
          >
            {formatCountdown(remaining)}
          </motion.div>
        )}
      </div>

      <div className="mt-3">
        <QuizProgressBar current={idx} total={total} />
      </div>

      <section className="mt-6 rounded-2xl border border-border/80 bg-card/95 p-5 shadow-card sm:p-7 dark:bg-card/90">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              {q.text}
            </h2>
            <div className="mt-6">
              <AnswerOptions
                question={q}
                questionIndex={idx}
                selected={selected}
                onChange={handleAnswerChange}
                revealed={isPractice && revealed}
              />
            </div>

            {isPractice && multi && !revealed && (
              <div className="mt-6">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePracticeCheckMulti}
                  disabled={selected.length === 0}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Kiểm tra đáp án
                </motion.button>
              </div>
            )}

            {practiceEval && (
              <div
                className={[
                  "mt-6 rounded-xl border px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 dark:ring-white/5",
                  practiceEval.isCorrect
                    ? "border-review-correct-border/80 bg-review-correct-bg"
                    : "border-review-wrong-border/80 bg-review-wrong-bg",
                ].join(" ")}
              >
                <p className="font-semibold text-foreground">
                  {practiceEval.isCorrect ? "Chính xác" : "Chưa chính xác"}
                </p>
                <div className="mt-2 space-y-1.5 leading-relaxed text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Bạn chọn: </span>
                    {(practiceEval.userSelected?.length ?? 0) === 0
                      ? "—"
                      : formatOptionLabels(q, practiceEval.userSelected)}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Đáp án đúng: </span>
                    {formatOptionLabels(q, practiceEval.correctIndexes)}
                  </p>
                  {q.explanation ? (
                    <p className="mt-2 border-t border-border/60 pt-2 text-foreground">
                      {q.explanation}
                    </p>
                  ) : null}
                </div>
              </div>
            )}

            {isPractice && revealed && (
              <div className="mt-6">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (idx >= total - 1) handleSubmit();
                    else go(idx + 1);
                  }}
                  className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover sm:w-auto"
                >
                  {idx >= total - 1 ? "Xem kết quả" : "Câu tiếp theo"}
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            className="rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Câu trước
          </motion.button>
          {!isPractice && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => go(idx + 1)}
              disabled={idx >= total - 1}
              className="rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              Câu tiếp theo
            </motion.button>
          )}
        </div>
      </section>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Navigator
        </p>
        <QuestionNavigator
          total={total}
          currentIndex={idx}
          answers={session.answers}
          onSelect={(i) => setCurrentIndex(i)}
        />
      </div>

      <div className="mt-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover sm:w-auto sm:min-w-[12rem]"
        >
          Submit
        </motion.button>
      </div>
    </PageShell>
  );
}
