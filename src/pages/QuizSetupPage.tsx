import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { useQuiz } from "../context/QuizContext";
import { QUIZ_MODE_LABEL_VI } from "../lib/quizMode";
import { tryRestoreSessionFromDraft } from "../lib/restoreDraft";
import { loadQuizDefaults, loadSessionDraft } from "../lib/storage";
import type { QuizMode } from "../types";

export function QuizSetupPage() {
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : "";
  const { subjects, startQuiz, resumeSession } = useQuiz();
  const navigate = useNavigate();
  const subject = useMemo(() => subjects.find((s) => s.id === id), [subjects, id]);

  const maxQ = subject?.questions.length ?? 0;
  const [count, setCount] = useState(10);
  const [timeMin, setTimeMin] = useState(0);
  const [mode, setMode] = useState<QuizMode>("test");

  useEffect(() => {
    const d = loadQuizDefaults();
    const cap = Math.max(1, maxQ || 1);
    setCount(Math.min(d?.questionCount ?? 10, cap));
    setTimeMin(d && d.timeLimitSeconds > 0 ? Math.ceil(d.timeLimitSeconds / 60) : 0);
  }, [id, maxQ]);

  const draft = useMemo(() => loadSessionDraft(), [id]);
  const resumable = useMemo(
    () => (subject ? tryRestoreSessionFromDraft({ subjectId: subject.id, draft }) : null),
    [subject, draft]
  );

  if (!subject) {
    return (
      <PageShell>
        <p className="text-muted-foreground">Subject not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          Back home
        </Link>
      </PageShell>
    );
  }

  const cappedCount = Math.min(Math.max(1, count || 10), subject.questions.length);
  const timeSeconds = Math.max(0, Math.floor(timeMin * 60));

  const handleStart = () => {
    startQuiz(
      subject,
      {
        subjectId: subject.id,
        questionCount: cappedCount,
        timeLimitSeconds: timeSeconds,
      },
      mode
    );
    navigate(`/subject/${encodeURIComponent(subject.id)}/quiz`);
  };

  const handleResume = () => {
    if (resumable) {
      resumeSession(resumable);
      navigate(`/subject/${encodeURIComponent(subject.id)}/quiz`);
    }
  };

  return (
    <PageShell>
      <nav className="pr-14 text-sm text-muted-foreground sm:pr-0">
        <Link
          to="/"
          className="font-medium text-primary hover:text-primary-hover hover:underline"
        >
          ← Trang chủ
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-border/80 bg-card/95 p-6 shadow-card sm:p-8 dark:bg-card/90"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">{subject.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {subject.questions.length} question{subject.questions.length === 1 ? "" : "s"} available
        </p>

        {resumable && (
          <div className="mt-6 rounded-xl border border-warning-border/45 bg-warning-muted px-4 py-3 text-sm shadow-sm ring-1 ring-warning-border/20">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-foreground">Bài của bạn đang làm dở :3</p>
              <span className="inline-flex rounded-full bg-card/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground ring-1 ring-border/80">
                {QUIZ_MODE_LABEL_VI[resumable.mode]}
              </span>
            </div>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              Bạn có thể tiếp tục bài làm dở trước đó với cùng số lượng câu hỏi và thời gian còn lại, hoặc bắt đầu một bài mới từ đầu.
            </p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handleResume}
              className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
            >
              Tiếp tục
            </motion.button>
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Questions
            </span>
            <input
              type="number"
              min={1}
              max={subject.questions.length}
              value={Number.isNaN(count) ? "" : count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary/45 focus:outline-none focus:ring-2 focus:ring-ring/35"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Giới hạn là {subject.questions.length} câu hỏi.
            </p>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Time limit (phút)
            </span>
            <input
              type="number"
              min={0}
              value={Number.isNaN(timeMin) ? "" : timeMin}
              onChange={(e) => setTimeMin(parseInt(e.target.value, 10) || 0)}
              className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary/45 focus:outline-none focus:ring-2 focus:ring-ring/35"
            />
            <p className="mt-1 text-xs text-muted-foreground">Để là 0 nếu không muốn giới hạn thời gian.</p>
          </label>
        </div>

        <div className="mt-8 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Chế độ
          </span>
          <div className="flex rounded-xl border border-border/90 bg-muted/35 p-1 dark:bg-muted/25">
            <button
              type="button"
              onClick={() => setMode("practice")}
              className={[
                "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                mode === "practice"
                  ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/25"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {QUIZ_MODE_LABEL_VI.practice}
            </button>
            <button
              type="button"
              onClick={() => setMode("test")}
              className={[
                "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                mode === "test"
                  ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/25"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {QUIZ_MODE_LABEL_VI.test}
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {mode === "practice"
              ? "Xem đáp án ngay sau mỗi câu."
              : "Làm liên tục và chấm điểm sau khi nộp bài."}
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.99 }}
          onClick={handleStart}
          disabled={subject.questions.length === 0}
          className="mt-8 w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Bắt đầu
        </motion.button>
      </motion.div>
    </PageShell>
  );
}
