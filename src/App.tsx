import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { useSubjects } from "./hooks/useSubjects";
import { HomePage } from "./pages/HomePage";
import { QuizSetupPage } from "./pages/QuizSetupPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultsPage } from "./pages/ResultsPage";

export default function App() {
  const subjects = useSubjects();
  return (
    <QuizProvider subjects={subjects}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:id/setup" element={<QuizSetupPage />} />
          <Route path="/subject/:id/quiz" element={<QuizPage />} />
          <Route path="/subject/:id/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </QuizProvider>
  );
}
