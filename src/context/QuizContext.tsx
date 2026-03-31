import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { QuizConfig, QuizMode, QuizResult, QuizSession, SubjectData } from "../types";
import { pickRandomUnique } from "../lib/shuffle";
import { buildQuizResult } from "../lib/score";
import {
  appendAttempt,
  bumpPracticeCount,
  clearSessionDraft,
  saveQuizDefaults,
  saveSessionDraft,
} from "../lib/storage";

type QuizContextValue = {
  subjects: SubjectData[];
  session: QuizSession | null;
  result: QuizResult | null;
  startQuiz: (subject: SubjectData, config: QuizConfig, mode?: QuizMode) => void;
  resumeSession: (session: QuizSession) => void;
  updateAnswer: (
    questionIndex: number,
    selected: number[],
    options?: { revealPractice?: boolean }
  ) => void;
  revealPracticeQuestion: (questionIndex: number) => void;
  setCurrentIndex: (i: number) => void;
  submitQuiz: () => void;
  abandonQuiz: () => void;
  clearResult: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

function persistDraft(s: QuizSession): void {
  saveSessionDraft(s.config, {
    subjectName: s.subjectName,
    questions: s.questions,
    answers: s.answers,
    startedAt: s.startedAt,
    deadlineAt: s.deadlineAt,
    currentIndex: s.currentIndex,
    mode: s.mode,
    practiceRevealed: s.practiceRevealed,
  });
}

export function QuizProvider({
  subjects,
  children,
}: {
  subjects: SubjectData[];
  children: ReactNode;
}) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const sessionRef = useRef<QuizSession | null>(null);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const startQuiz = useCallback((subject: SubjectData, config: QuizConfig, mode: QuizMode = "test") => {
    const n = Math.min(config.questionCount, subject.questions.length);
    const picked = pickRandomUnique(subject.questions, n);
    const now = Date.now();
    const deadline =
      config.timeLimitSeconds > 0 ? now + config.timeLimitSeconds * 1000 : null;
    setResult(null);
    const newSession: QuizSession = {
      config,
      subjectName: subject.name,
      questions: picked,
      answers: {},
      startedAt: now,
      deadlineAt: deadline,
      currentIndex: 0,
      mode,
      practiceRevealed: {},
    };
    setSession(newSession);
    bumpPracticeCount(config.subjectId);
    saveQuizDefaults({
      questionCount: config.questionCount,
      timeLimitSeconds: config.timeLimitSeconds,
    });
    persistDraft(newSession);
  }, []);

  const resumeSession = useCallback((s: QuizSession) => {
    setResult(null);
    setSession(s);
    persistDraft(s);
  }, []);

  const updateAnswer = useCallback(
    (questionIndex: number, selected: number[], options?: { revealPractice?: boolean }) => {
      setSession((prev) => {
        if (!prev) return prev;
        const practiceRevealed: Record<number, true> =
          options?.revealPractice === true
            ? { ...prev.practiceRevealed, [questionIndex]: true as const }
            : prev.practiceRevealed;
        const next: QuizSession = {
          ...prev,
          answers: { ...prev.answers, [questionIndex]: [...selected] },
          practiceRevealed,
        };
        persistDraft(next);
        return next;
      });
    },
    []
  );

  const revealPracticeQuestion = useCallback((questionIndex: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next: QuizSession = {
        ...prev,
        practiceRevealed: { ...prev.practiceRevealed, [questionIndex]: true },
      };
      persistDraft(next);
      return next;
    });
  }, []);

  const setCurrentIndex = useCallback((i: number) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next = { ...prev, currentIndex: i };
      persistDraft(next);
      return next;
    });
  }, []);

  const submitQuiz = useCallback(() => {
    const prev = sessionRef.current;
    if (!prev) return;
    const finishedAt = Date.now();
    const res = buildQuizResult({
      subjectId: prev.config.subjectId,
      subjectName: prev.subjectName,
      questions: prev.questions,
      answers: prev.answers,
      startedAt: prev.startedAt,
      finishedAt,
    });
    appendAttempt({
      subjectId: prev.config.subjectId,
      subjectName: prev.subjectName,
      percentCorrect: res.percentCorrect,
      at: finishedAt,
    });
    clearSessionDraft();
    setSession(null);
    setResult(res);
  }, []);

  const abandonQuiz = useCallback(() => {
    clearSessionDraft();
    setSession(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  const value = useMemo(
    () => ({
      subjects,
      session,
      result,
      startQuiz,
      resumeSession,
      updateAnswer,
      revealPracticeQuestion,
      setCurrentIndex,
      submitQuiz,
      abandonQuiz,
      clearResult,
    }),
    [
      subjects,
      session,
      result,
      startQuiz,
      resumeSession,
      updateAnswer,
      revealPracticeQuestion,
      setCurrentIndex,
      submitQuiz,
      abandonQuiz,
      clearResult,
    ]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
