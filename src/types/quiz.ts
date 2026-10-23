export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  sectionRef?: string;
  /** Feedback aligned with the authored options. */
  optionExplanations?: string[];
}

