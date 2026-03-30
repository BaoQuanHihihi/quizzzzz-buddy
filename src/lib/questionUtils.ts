import type { Question } from "../types";

export function isMultipleAnswer(question: Question): boolean {
  return question.answer.length > 1;
}

export function normalizeIndexes(indexes: number[]): number[] {
  return [...new Set(indexes)].sort((a, b) => a - b);
}

export function answersMatch(user: number[], correct: number[]): boolean {
  const u = normalizeIndexes(user);
  const c = normalizeIndexes(correct);
  if (u.length !== c.length) return false;
  return u.every((v, i) => v === c[i]);
}
