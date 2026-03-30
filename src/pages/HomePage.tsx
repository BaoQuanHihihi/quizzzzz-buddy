import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { SubjectCard } from "../components/SubjectCard";
import { useQuiz } from "../context/QuizContext";

export function HomePage() {
  const { subjects } = useQuiz();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return subjects;
    return subjects.filter((sub) => sub.name.toLowerCase().includes(s));
  }, [subjects, q]);

  return (
    <PageShell>
      <header className="pr-14 text-center sm:pr-0 sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Khi mùa thi gõ cửa ...
        </motion.h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mx-0 sm:text-lg">
          Đây là nơi để mùa thi không chỉ là khoảng thời gian của áp lực và vội vàng, mà còn là lúc mình học cách tin vào chính mình nhiều hơn
        </p>
      </header>

      <section className="mt-10">
        <label className="block">
          <span className="sr-only">Tìm kiếm môn bạn muốn ôn tập</span>
          <input
            type="search"
            placeholder="Tìm kiếm môn bạn muốn ôn tập"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-xl border border-border/90 bg-card/90 px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/75 focus:border-primary/45 focus:outline-none focus:ring-2 focus:ring-ring/35 dark:bg-card/80"
          />
        </label>
      </section>

      {subjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-14 rounded-2xl border border-dashed border-border bg-card/70 p-10 text-center shadow-card"
        >
          <p className="font-display text-lg font-semibold text-foreground">No subjects yet</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Add JavaScript files under{" "}
            <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              src/data/subjects/
            </code>{" "}
            — they appear here automatically.
          </p>
        </motion.div>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No subjects match your search.
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {filtered.map((subject, index) => (
            <li key={subject.id}>
              <SubjectCard
                subject={subject}
                index={index}
                onStart={() => navigate(`/subject/${encodeURIComponent(subject.id)}/setup`)}
              />
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
