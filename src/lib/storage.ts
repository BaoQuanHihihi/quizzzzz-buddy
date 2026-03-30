import type { QuizConfig } from "../types";

const SETTINGS_KEY = "quiz-practice:last-settings-v1";
const ATTEMPTS_KEY = "quiz-practice:attempts-v1";
const PRACTICE_KEY = "quiz-practice:practice-count-v1";

export type StoredQuizDefaults = {
  questionCount: number;
  timeLimitSeconds: number;
};

export function loadQuizDefaults(): StoredQuizDefaults | null {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<StoredQuizDefaults>;
    if (typeof v.questionCount !== "number" || typeof v.timeLimitSeconds !== "number")
      return null;
    return { questionCount: v.questionCount, timeLimitSeconds: v.timeLimitSeconds };
  } catch {
    return null;
  }
}

export function saveQuizDefaults(partial: Partial<StoredQuizDefaults>): void {
  try {
    const cur = loadQuizDefaults() ?? { questionCount: 10, timeLimitSeconds: 0 };
    const next = { ...cur, ...partial };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
}

export type AttemptSummary = {
  subjectId: string;
  subjectName: string;
  percentCorrect: number;
  at: number;
};

export function appendAttempt(summary: AttemptSummary): void {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    const list = raw ? (JSON.parse(raw) as AttemptSummary[]) : [];
    const next = [summary, ...list].slice(0, 12);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function bumpPracticeCount(subjectId: string): void {
  try {
    const raw = localStorage.getItem(PRACTICE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    map[subjectId] = (map[subjectId] ?? 0) + 1;
    localStorage.setItem(PRACTICE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getPracticeCount(subjectId: string): number {
  try {
    const raw = localStorage.getItem(PRACTICE_KEY);
    if (!raw) return 0;
    const map = JSON.parse(raw) as Record<string, number>;
    return map[subjectId] ?? 0;
  } catch {
    return 0;
  }
}

export function saveSessionDraft(config: QuizConfig, payload: unknown): void {
  try {
    localStorage.setItem("quiz-practice:draft-v1", JSON.stringify({ config, payload }));
  } catch {
    /* ignore */
  }
}

export function loadSessionDraft(): { config: QuizConfig; payload: unknown } | null {
  try {
    const raw = localStorage.getItem("quiz-practice:draft-v1");
    if (!raw) return null;
    return JSON.parse(raw) as { config: QuizConfig; payload: unknown };
  } catch {
    return null;
  }
}

export function clearSessionDraft(): void {
  try {
    localStorage.removeItem("quiz-practice:draft-v1");
  } catch {
    /* ignore */
  }
}
