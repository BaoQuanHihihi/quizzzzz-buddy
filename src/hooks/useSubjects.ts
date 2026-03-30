import { useMemo } from "react";
import { loadAllSubjects } from "../lib/loadSubjects";

/** Singleton load per page lifetime — glob is eager so this is cheap after first call */
export function useSubjects() {
  return useMemo(() => loadAllSubjects(), []);
}
