import type { Question, SubjectData } from "../types";

export type ValidationIssue = { path: string; message: string };

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validateQuestion(raw: unknown): Question | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const o = raw as Record<string, unknown>;
  if (!isNonEmptyString(o["text"])) return null;
  const options = o["options"];
  if (!Array.isArray(options) || options.length < 2) return null;
  if (!options.every((x) => typeof x === "string" && x.trim().length > 0)) {
    return null;
  }
  const answer = o["answer"];
  if (!Array.isArray(answer) || answer.length < 1) return null;
  if (!answer.every((x) => Number.isInteger(x))) return null;
  const optLen = options.length;
  for (const idx of answer as number[]) {
    if (idx < 0 || idx >= optLen) return null;
  }
  const ex = o["explanation"];
  const explanation =
    typeof ex === "string" && ex.trim().length > 0 ? ex.trim() : undefined;
  return {
    text: o["text"] as string,
    options: options as string[],
    answer: answer as number[],
    ...(explanation ? {explanation} : {}),
  };
}

export function validateSubjectModule(params: {
  module: unknown;
  sourcePath: string;
  id: string;
}): { subject: SubjectData | null; issues: ValidationIssue[] } {
  const { module, sourcePath, id } = params;
  const issues: ValidationIssue[] = [];

  if (!module || typeof module !== "object") {
    issues.push({ path: sourcePath, message: "Module is not an object" });
    return { subject: null, issues };
  }

  const m = module as Record<string, unknown>;
  const nameRaw = m["SUBJECT_NAME"];
  const questionsRaw = m["ALL_QUESTIONS"];

  if (!isNonEmptyString(nameRaw)) {
    issues.push({
      path: `${sourcePath} → SUBJECT_NAME`,
      message: "SUBJECT_NAME must be a non-empty string",
    });
    return { subject: null, issues };
  }

  if (!Array.isArray(questionsRaw)) {
    issues.push({
      path: `${sourcePath} → ALL_QUESTIONS`,
      message: "ALL_QUESTIONS must be an array",
    });
    return { subject: null, issues };
  }

  const questions: Question[] = [];
  for (const q of questionsRaw) {
    const v = validateQuestion(q);
    if (v) questions.push(v);
  }

  if (questions.length === 0) {
    issues.push({
      path: `${sourcePath} → ALL_QUESTIONS`,
      message: "No valid questions found (each needs text, options (≥2 strings), answer (valid indexes))",
    });
  }

  if (questions.length === 0) {
    return { subject: null, issues };
  }

  return {
    subject: {
      id,
      name: (nameRaw as string).trim(),
      questions,
      sourcePath,
    },
    issues: [],
  };
}
