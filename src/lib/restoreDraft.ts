import type { Question, QuizConfig, QuizSession } from "../types";

function isQuestionArray(v: unknown): v is Question[] {
  if (!Array.isArray(v)) return false;
  return v.every(
    (q) =>
      q &&
      typeof q === "object" &&
      typeof (q as Question).text === "string" &&
      Array.isArray((q as Question).options) &&
      Array.isArray((q as Question).answer)
  );
}

export function tryRestoreSessionFromDraft(params: {
  subjectId: string;
  draft: { config: QuizConfig; payload: unknown } | null;
}): QuizSession | null {
  const { subjectId, draft } = params;
  if (!draft || draft.config.subjectId !== subjectId) return null;
  const p = draft.payload as Record<string, unknown>;
  if (typeof p["subjectName"] !== "string" || !isQuestionArray(p["questions"])) {
    return null;
  }
  const answers = p["answers"];
  if (!answers || typeof answers !== "object") return null;
  const startedAt = p["startedAt"];
  const deadlineAt = p["deadlineAt"];
  const currentIndex = p["currentIndex"];
  if (typeof startedAt !== "number") return null;
  if (deadlineAt != null && typeof deadlineAt !== "number") return null;
  if (typeof currentIndex !== "number" || currentIndex < 0) return null;

  return {
    config: draft.config,
    subjectName: p["subjectName"] as string,
    questions: p["questions"] as Question[],
    answers: answers as Record<number, number[]>,
    startedAt,
    deadlineAt: deadlineAt == null ? null : (deadlineAt as number),
    currentIndex,
  };
}
