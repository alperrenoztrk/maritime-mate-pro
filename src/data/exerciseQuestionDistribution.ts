import { getBetaModules, getBetaTopic } from "@/data/betaLessons";
import { getTopicQuiz } from "@/data/courseContent/quiz";
import type { QuizQuestion } from "@/types/quiz";

export interface ExerciseQuestionDistribution {
  questionsByTopic: Map<string, QuizQuestion[]>;
  totalQuestions: number;
  assignedQuestions: number;
}

interface SearchableTopic {
  id: string;
  order: number;
  coreText: string;
  contextText: string;
  coreTokens: Set<string>;
  contextTokens: Set<string>;
}

interface QuestionSearchText {
  category: string;
  prompt: string;
  support: string;
  categoryTokens: Set<string>;
  promptTokens: Set<string>;
  supportTokens: Set<string>;
}

const distributionCache = new Map<string, ExerciseQuestionDistribution>();

const STOP_WORDS = new Set([
  "acaba",
  "ancak",
  "ayrica",
  "biri",
  "bir",
  "buna",
  "bunu",
  "bu",
  "daha",
  "dogru",
  "gibi",
  "gore",
  "hangi",
  "hangisi",
  "icin",
  "ile",
  "ise",
  "kac",
  "kadar",
  "kullanilir",
  "mi",
  "midir",
  "nasil",
  "neden",
  "nedir",
  "neyi",
  "ne",
  "olarak",
  "oldugunda",
  "olmalidir",
  "olur",
  "olan",
  "veya",
  "ve",
  "yanlis",
  "yaklasik",
  "the",
  "what",
  "which",
  "when",
  "where",
  "with",
  "from",
  "into",
]);

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenKey = (token: string) => (token.length >= 6 ? token.slice(0, 6) : token);

const tokenSet = (value: string) =>
  new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length >= 2 && !STOP_WORDS.has(token))
      .map(tokenKey),
  );

const overlapScore = (
  query: Set<string>,
  target: Set<string>,
  weight: number,
  maximum: number,
) => {
  let matches = 0;
  for (const token of query) {
    if (target.has(token)) matches += 1;
  }
  return Math.min(matches * weight, maximum);
};

const toCourseKey = (categoryId: string) =>
  categoryId.startsWith("machine-") ? categoryId.slice("machine-".length) : categoryId;

const makeQuestionSearchText = (question: QuizQuestion): QuestionSearchText => {
  const category = normalize(question.category);
  const prompt = normalize(question.question);
  const support = normalize(`${question.options.join(" ")} ${question.explanation}`);

  return {
    category,
    prompt,
    support,
    categoryTokens: tokenSet(category),
    promptTokens: tokenSet(prompt),
    supportTokens: tokenSet(support),
  };
};

const scoreTopic = (search: QuestionSearchText, topic: SearchableTopic) => {
  let score = 0;

  if (search.category.length >= 4) {
    if (topic.coreText.includes(search.category)) score += 180;
    else if (topic.contextText.includes(search.category)) score += 90;
  }

  score += overlapScore(search.categoryTokens, topic.coreTokens, 28, 168);
  score += overlapScore(search.categoryTokens, topic.contextTokens, 12, 96);
  score += overlapScore(search.promptTokens, topic.coreTokens, 18, 144);
  score += overlapScore(search.promptTokens, topic.contextTokens, 6, 120);
  score += overlapScore(search.supportTokens, topic.coreTokens, 8, 64);
  score += overlapScore(search.supportTokens, topic.contextTokens, 2, 48);

  return score;
};

const buildSearchableTopics = (categoryId: string): SearchableTopic[] => {
  let order = 0;

  return getBetaModules(categoryId).flatMap((module) =>
    module.topics.map((topic) => {
      const content = getBetaTopic(categoryId, topic.id);
      const core = [topic.title, topic.sourceTitle, module.title].join(" ");
      const context = [
        module.description,
        content?.introduction,
        ...(content?.sections.flatMap((section) => [
          section.title,
          section.sourceTitle,
          section.content,
          ...(section.bulletPoints ?? []),
          section.formula?.text,
          section.formula?.description,
          section.example?.problem,
          section.example?.solution,
          section.example?.result,
        ]) ?? []),
        ...(content?.keyPoints ?? []),
      ]
        .filter(Boolean)
        .join(" ");

      return {
        id: topic.id,
        order: order++,
        coreText: normalize(core),
        contextText: normalize(context),
        coreTokens: tokenSet(core),
        contextTokens: tokenSet(context),
      };
    }),
  );
};

const preferredTopicByQuestionCategory = (
  questions: QuizQuestion[],
  topics: SearchableTopic[],
) => {
  const grouped = new Map<string, QuizQuestion[]>();

  for (const question of questions) {
    const items = grouped.get(question.category) ?? [];
    items.push(question);
    grouped.set(question.category, items);
  }

  const preferred = new Map<string, string>();

  for (const [category, items] of grouped) {
    const aggregate: QuizQuestion = {
      id: 0,
      category,
      question: items.map((item) => item.question).join(" "),
      options: items.flatMap((item) => item.options),
      correctAnswer: 0,
      explanation: items.map((item) => item.explanation).join(" "),
    };
    const search = makeQuestionSearchText(aggregate);
    const ranked = topics
      .map((topic) => ({ topic, score: scoreTopic(search, topic) }))
      .sort((left, right) => right.score - left.score || left.topic.order - right.topic.order);

    if (ranked[0]) preferred.set(category, ranked[0].topic.id);
  }

  return preferred;
};

export function getExerciseQuestionDistribution(
  categoryId?: string,
): ExerciseQuestionDistribution {
  if (!categoryId) {
    return { questionsByTopic: new Map(), totalQuestions: 0, assignedQuestions: 0 };
  }

  const cached = distributionCache.get(categoryId);
  if (cached) return cached;

  const questions = getTopicQuiz(toCourseKey(categoryId));
  const topics = buildSearchableTopics(categoryId);
  const questionsByTopic = new Map<string, QuizQuestion[]>(
    topics.map((topic) => [topic.id, []]),
  );

  if (questions.length === 0 || topics.length === 0) {
    const empty = {
      questionsByTopic,
      totalQuestions: questions.length,
      assignedQuestions: 0,
    };
    distributionCache.set(categoryId, empty);
    return empty;
  }

  const preferredByCategory = preferredTopicByQuestionCategory(questions, topics);

  for (const question of questions) {
    const search = makeQuestionSearchText(question);
    const preferredTopicId = preferredByCategory.get(question.category);
    const ranked = topics
      .map((topic) => ({ topic, score: scoreTopic(search, topic) }))
      .sort((left, right) => {
        const scoreDifference = right.score - left.score;
        if (scoreDifference !== 0) return scoreDifference;

        const preferredDifference =
          Number(right.topic.id === preferredTopicId) -
          Number(left.topic.id === preferredTopicId);
        if (preferredDifference !== 0) return preferredDifference;

        return left.topic.order - right.topic.order;
      });

    const bestIndividualMatch = ranked[0];
    const categoryFallback = topics.find((topic) => topic.id === preferredTopicId);
    const target =
      bestIndividualMatch && bestIndividualMatch.score > 0
        ? bestIndividualMatch.topic
        : categoryFallback ?? topics[(question.id - 1) % topics.length];
    questionsByTopic.get(target.id)?.push(question);
  }

  const assignedQuestions = [...questionsByTopic.values()].reduce(
    (total, items) => total + items.length,
    0,
  );

  if (assignedQuestions !== questions.length) {
    throw new Error(
      `Alıştırma soru dağıtımı eksik: ${categoryId} için ${questions.length} sorudan ${assignedQuestions} tanesi atandı.`,
    );
  }

  const distribution = {
    questionsByTopic,
    totalQuestions: questions.length,
    assignedQuestions,
  };
  distributionCache.set(categoryId, distribution);
  return distribution;
}

export function getExerciseQuestionsForTopic(categoryId?: string, topicId?: string) {
  if (!categoryId || !topicId) return [];
  return getExerciseQuestionDistribution(categoryId).questionsByTopic.get(topicId) ?? [];
}
