import { getBetaModules, type BetaModule } from "@/data/betaLessons";
import { getLessonFlow } from "@/data/lessonFlow";
import { getTopicQuiz } from "@/data/courseContent/quiz";
import type { QuizQuestion } from "@/types/quiz";

export interface ExerciseQuestionDistribution {
  questionsByTopic: Map<string, QuizQuestion[]>;
  totalQuestions: number;
  assignedQuestions: number;
  courseBankQuestions: number;
}

const distributionCache = new Map<string, ExerciseQuestionDistribution>();

/** Only authored topic ownership assigns a question to a lesson. The complete
 * general bank remains available in the course quiz; it is not forced into
 * unrelated topics merely to fill every row. */
export function getExerciseQuestionDistribution(categoryId?: string): ExerciseQuestionDistribution {
  if (!categoryId) return { questionsByTopic: new Map(), totalQuestions: 0, assignedQuestions: 0, courseBankQuestions: 0 };
  const cached = distributionCache.get(categoryId);
  if (cached) return cached;
  const questionsByTopic = new Map<string, QuizQuestion[]>();
  for (const module of getBetaModules(categoryId)) {
    for (const topic of module.topics) {
      const flow = getLessonFlow(categoryId, topic.sourceTitle);
      const seen = new Set<string>();
      const questions = (flow?.questions ?? []).filter((question) => {
        const key = question.question.trim().toLocaleLowerCase("en");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      questionsByTopic.set(topic.id, questions);
    }
  }
  const totalQuestions = [...questionsByTopic.values()].reduce((sum, questions) => sum + questions.length, 0);
  const courseKey = categoryId.replace(/^machine-/, "");
  const distribution = { questionsByTopic, totalQuestions, assignedQuestions: totalQuestions, courseBankQuestions: getTopicQuiz(courseKey).length };
  distributionCache.set(categoryId, distribution);
  return distribution;
}

export function getExerciseQuestionsForTopic(categoryId?: string, topicId?: string) {
  if (!categoryId || !topicId) return [];
  return getExerciseQuestionDistribution(categoryId).questionsByTopic.get(topicId) ?? [];
}

export function hasExerciseQuestions(categoryId?: string, topicId?: string) {
  return getExerciseQuestionsForTopic(categoryId, topicId).length > 0;
}

/** Exercises lists only topics that own questions; modules left empty are hidden. */
export function getExerciseModules(categoryId?: string): BetaModule[] {
  return getBetaModules(categoryId)
    .map((module) => {
      const topics = module.topics.filter((topic) => hasExerciseQuestions(categoryId, topic.id));
      return { ...module, topics, topicCount: topics.length };
    })
    .filter((module) => module.topics.length > 0);
}
