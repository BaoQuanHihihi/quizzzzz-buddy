import type { Question, QuestionResult, QuizResult } from "../types";
import { answersMatch } from "./questionUtils";

export function evaluateQuestion(
  question: Question,
  questionIndex: number,
  userSelected: number[]
): QuestionResult {
  const correctIndexes = [...question.answer].sort((a, b) => a - b);
  const isCorrect = answersMatch(userSelected, question.answer);
  return {
    question,
    questionIndex,
    userSelected: [...userSelected].sort((a, b) => a - b),
    correctIndexes,
    isCorrect,
  };
}

export function buildQuizResult(params: {
  subjectId: string;
  subjectName: string;
  questions: Question[];
  answers: Record<number, number[]>;
  startedAt: number;
  finishedAt: number;
}): QuizResult {
  const { subjectId, subjectName, questions, answers, startedAt, finishedAt } = params;
  const results: QuestionResult[] = questions.map((q, i) =>
    evaluateQuestion(q, i, answers[i] ?? [])
  );
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalQuestions = questions.length;
  const wrongCount = totalQuestions - correctCount;
  const percentCorrect =
    totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 1000) / 10;

  return {
    subjectId,
    subjectName,
    totalQuestions,
    correctCount,
    wrongCount,
    percentCorrect,
    timeUsedMs: Math.max(0, finishedAt - startedAt),
    results,
  };
}

export function evaluationMessage(percentCorrect: number): string {
  if (percentCorrect >= 90) return "Đỉnh theee";
  if (percentCorrect >= 70) return "Ổn áp";
  if (percentCorrect >= 50) return "Không tệ";
  return "Cần luyện tập nhiều hơn";
}
