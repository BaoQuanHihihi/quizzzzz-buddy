import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { useQuiz } from "../context/QuizContext";
import { formatOptionLabels } from "../lib/questionUtils";
import { evaluationMessage, sortResultsForReview } from "../lib/score";
import { formatDuration } from "../lib/timerFormat";

export function ResultsPage() {
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : "";
  const navigate = useNavigate();
  const { result, clearResult } = useQuiz();

  if (!result || result.subjectId !== id) {
    navigate(`/subject/${encodeURIComponent(id)}/setup`, { replace: true });
    return null;
  }

  const msg = evaluationMessage(result.percentCorrect);
  const reviewOrder = sortResultsForReview(result.results);

  return (
    <PageShell>
      <nav className="pr-14 text-sm text-muted-foreground sm:pr-0">
        <Link
          to="/"
          className="font-medium text-primary hover:text-primary-hover hover:underline"
        >
          ← Home
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-border/80 bg-card/95 p-6 shadow-card sm:p-8 dark:bg-card/90"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Results
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground">
          {result.subjectName}
        </h1>
        <p className="mt-3 inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/15">
          {msg}
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-muted/60 px-4 py-3">
            <dt className="text-xs font-medium text-muted-foreground">Score</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">
              {result.correctCount}/{result.totalQuestions}
            </dd>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/60 px-4 py-3">
            <dt className="text-xs font-medium text-muted-foreground">Correct / Wrong</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              <span className="text-success">{result.correctCount}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-danger">{result.wrongCount}</span>
            </dd>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/60 px-4 py-3">
            <dt className="text-xs font-medium text-muted-foreground">Percentage</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">
              {result.percentCorrect}%
            </dd>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/60 px-4 py-3 sm:col-span-2 lg:col-span-3">
            <dt className="text-xs font-medium text-muted-foreground">Time used</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-foreground">
              {formatDuration(result.timeUsedMs)}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              clearResult();
              navigate(`/subject/${encodeURIComponent(id)}/setup`);
            }}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
          >
            Làm lại khôm :3
          </motion.button>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-muted"
          >
            Trang chủ
          </Link>
        </div>
      </motion.div>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-foreground">Review</h2>
        <ul className="mt-4 space-y-4">
          {reviewOrder.map((r, i) => (
            <motion.li
              key={r.questionIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={[
                "rounded-2xl border px-5 py-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5",
                r.isCorrect
                  ? "border-review-correct-border/80 bg-review-correct-bg"
                  : "border-review-wrong-border/80 bg-review-wrong-bg",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-relaxed text-foreground">
                  Câu {r.questionIndex + 1}. {r.question.text}
                </p>
                <span
                  className={[
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold",
                    r.isCorrect
                      ? "bg-review-correct-badge text-review-correct-label"
                      : "bg-review-wrong-badge text-review-wrong-label",
                  ].join(" ")}
                >
                  {r.isCorrect ? "✔ Chính xác" : "✖ Chưa chính xác"}
                </span>
              </div>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Your answer: </span>
                  {(r.userSelected?.length ?? 0) === 0
                    ? "—"
                    : formatOptionLabels(r.question, r.userSelected)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Correct: </span>
                  {formatOptionLabels(r.question, r.correctIndexes)}
                </p>
                {r.question.explanation ? (
                  <p className="mt-2 border-t border-border/50 pt-2 text-foreground">
                    {r.question.explanation}
                  </p>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
