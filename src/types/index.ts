export type Question = {
  text: string;
  options: string[];
  answer: number[];
};

export type SubjectData = {
  id: string;
  name: string;
  questions: Question[];
  /** Original file path from glob (for debugging) */
  sourcePath: string;
};

export type QuizConfig = {
  subjectId: string;
  questionCount: number;
  /** seconds, 0 = no limit */
  timeLimitSeconds: number;
};

export type UserAnswer = {
  questionIndex: number;
  selectedIndexes: number[];
};

export type QuizSession = {
  config: QuizConfig;
  subjectName: string;
  /** Questions in quiz order */
  questions: Question[];
  /** Selected option indexes per question index in this quiz (0 .. length-1) */
  answers: Record<number, number[]>;
  startedAt: number;
  /** wall clock when quiz ends if timed */
  deadlineAt: number | null;
  currentIndex: number;
};

export type QuestionResult = {
  question: Question;
  questionIndex: number;
  userSelected: number[];
  correctIndexes: number[];
  isCorrect: boolean;
};

export type QuizResult = {
  subjectId: string;
  subjectName: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  percentCorrect: number;
  timeUsedMs: number;
  results: QuestionResult[];
};
