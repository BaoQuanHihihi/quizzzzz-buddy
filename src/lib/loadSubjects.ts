import type { SubjectData } from "../types";
import { validateSubjectModule } from "./validateSubject";

const globModules = import.meta.glob("../data/subjects/*.js", { eager: true }) as Record<
  string,
  { default?: unknown } & Record<string, unknown>
>;

function warnInvalid(path: string, detail: string): void {
  console.warn(`[quiz-practice] Skipped invalid subject file: ${path}\n  ${detail}`);
}

function stableIdFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.js$/i, "") || path;
}

function resolveExportedObject(exp: Record<string, unknown>): Record<string, unknown> {
  const hasNamed =
    typeof exp["SUBJECT_NAME"] === "string" || Array.isArray(exp["ALL_QUESTIONS"]);
  if (hasNamed) return exp;
  const d = exp["default"];
  if (d && typeof d === "object") return d as Record<string, unknown>;
  return exp;
}

/**
 * Loads all subject modules from `src/data/subjects/*.js` via Vite's import.meta.glob.
 * Invalid files are skipped with console warnings; valid subjects are returned.
 */
export function loadAllSubjects(): SubjectData[] {
  const subjects: SubjectData[] = [];

  for (const [path, mod] of Object.entries(globModules)) {
    const exports = mod && typeof mod === "object" ? (mod as Record<string, unknown>) : {};
    const body = resolveExportedObject(exports);

    const { subject, issues } = validateSubjectModule({
      module: body,
      sourcePath: path,
      id: stableIdFromPath(path),
    });

    if (subject) {
      subjects.push(subject);
      continue;
    }

    const msg =
      issues.length > 0
        ? issues.map((i) => `${i.path}: ${i.message}`).join("\n  ")
        : "Unknown validation failure";
    warnInvalid(path, msg);
  }

  subjects.sort((a, b) => a.name.localeCompare(b.name));
  return subjects;
}
