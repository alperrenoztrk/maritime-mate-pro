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
  coreTokens: Set<string>;
  contextTokens: Set<string>;
}

interface QuestionSearchText {
  category: string;
  categoryTokens: Set<string>;
  promptTokens: Set<string>;
  supportTokens: Set<string>;
  /**
   * Kategorinin bankayı ne kadar ayırt ettiği (0..1). Bankanın tamamı tek
   * kategorideyse 0'a yaklaşır: o kategori hiçbir soruyu diğerinden ayırmaz,
   * dolayısıyla konu seçimini sorunun kendi metni belirlemelidir.
   */
  categorySalience: number;
}

interface ScoringContext {
  /** Token -> ters belge frekansı; çok sayıda konuda geçen token'ları söndürür. */
  inverseDocumentFrequency: Map<string, number>;
  averageContextSize: number;
}

/**
 * Bir konunun alabileceği soru sayısı, eşit dağılımın kaç katıyla sınırlı.
 * Konu gerçekten baskın olsa bile tek başlığın bankayı yutmasını engeller.
 */
const CAPACITY_SPREAD = 2;

/**
 * Konu başına ulaşılmaya çalışılan asgari soru sayısı. Havuz yetmiyorsa eşit
 * paylaşım tavanı (floor(soru/konu)) uygulanır; yani hedef, havuzun izin
 * verdiği ölçüde geçerlidir.
 */
const MIN_QUESTIONS_PER_TOPIC = 8;

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

/** Türkçe ekleri kabaca budar; fazla kısaltmak farklı kelimeleri çakıştırır. */
const tokenKey = (token: string) => (token.length >= 8 ? token.slice(0, 8) : token);

const tokenSet = (value: string) =>
  new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length >= 2 && !STOP_WORDS.has(token))
      .map(tokenKey),
  );

/**
 * Sorgu token'larının hedefte ne kadarının karşılandığını 0..1 aralığında verir.
 * Ham eşleşme sayısı yerine oran kullanılır; böylece uzun metinli konular
 * sırf token sayısı fazla olduğu için öne geçemez. Ağırlıklar IDF'ten gelir,
 * yani her konuda geçen genel terimler skora katkı yapmaz.
 */
const coverage = (query: Set<string>, target: Set<string>, idf: Map<string, number>) => {
  let matched = 0;
  let total = 0;

  for (const token of query) {
    const weight = idf.get(token) ?? 0;
    total += weight;
    if (target.has(token)) matched += weight;
  }

  return total > 0 ? matched / total : 0;
};

/**
 * İçerik metni uzadıkça token kümesi büyür ve rastgele eşleşme olasılığı artar.
 * Ortalama uzunluğa göre normalize eder: ortalama boyutta 1, daha büyükte < 1.
 */
const lengthNormalizer = (size: number, averageSize: number) =>
  averageSize > 0 ? (2 * averageSize) / (averageSize + size) : 1;

const toCourseKey = (categoryId: string) =>
  categoryId.startsWith("machine-") ? categoryId.slice("machine-".length) : categoryId;

const makeQuestionSearchText = (
  question: QuizQuestion,
  categorySalience: number,
): QuestionSearchText => ({
  category: normalize(question.category),
  categoryTokens: tokenSet(question.category),
  promptTokens: tokenSet(question.question),
  supportTokens: tokenSet(`${question.options.join(" ")} ${question.explanation}`),
  categorySalience,
});

/**
 * Her kategori için ayırt edicilik katsayısı üretir. Bir kategori bankanın ne
 * kadar büyük bölümünü kaplıyorsa o kadar az bilgi taşır; tek kategorili
 * bankalarda katsayı 0 olur ve eşleştirme tamamen soru metnine dayanır.
 */
const buildCategorySalience = (questions: QuizQuestion[]) => {
  const counts = new Map<string, number>();
  for (const question of questions) {
    counts.set(question.category, (counts.get(question.category) ?? 0) + 1);
  }

  const salience = new Map<string, number>();
  for (const [category, count] of counts) {
    salience.set(category, 1 - count / questions.length);
  }

  return salience;
};

const scoreTopic = (
  search: QuestionSearchText,
  topic: SearchableTopic,
  context: ScoringContext,
) => {
  const { inverseDocumentFrequency: idf } = context;
  const categoryWeight = search.categorySalience;
  let score = 0;

  if (search.category.length >= 4 && topic.coreText.includes(search.category)) {
    score += 1.5 * categoryWeight;
  }

  score += 3 * categoryWeight * coverage(search.categoryTokens, topic.coreTokens, idf);
  score += 2 * coverage(search.promptTokens, topic.coreTokens, idf);
  score += 0.8 * coverage(search.supportTokens, topic.coreTokens, idf);

  const contextWeight = lengthNormalizer(topic.contextTokens.size, context.averageContextSize);
  score +=
    contextWeight *
    (1 * categoryWeight * coverage(search.categoryTokens, topic.contextTokens, idf) +
      0.6 * coverage(search.promptTokens, topic.contextTokens, idf) +
      0.2 * coverage(search.supportTokens, topic.contextTokens, idf));

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
        coreTokens: tokenSet(core),
        contextTokens: tokenSet(context),
      };
    }),
  );
};

const buildScoringContext = (topics: SearchableTopic[]): ScoringContext => {
  const documentFrequency = new Map<string, number>();

  for (const topic of topics) {
    for (const token of new Set([...topic.coreTokens, ...topic.contextTokens])) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
  }

  const inverseDocumentFrequency = new Map<string, number>();
  for (const [token, frequency] of documentFrequency) {
    inverseDocumentFrequency.set(token, Math.log(1 + topics.length / frequency));
  }

  const totalContextSize = topics.reduce((sum, topic) => sum + topic.contextTokens.size, 0);

  return {
    inverseDocumentFrequency,
    averageContextSize: totalContextSize / topics.length,
  };
};

/**
 * Soruları konulara dağıtır.
 *
 * Saf "en yüksek skor" ataması, içeriği zengin tek bir konunun bankanın
 * tamamını toplamasına yol açıyordu. Bunun yerine iki aşama uygulanır:
 * önce her konu en iyi eşleşen soruyu alır (boş konu kalmaz), ardından kalan
 * sorular kapasite sınırı gözetilerek en iyi konuya yerleşir.
 *
 * Dönen dizi, soru indeksi -> konu indeksi eşlemesidir.
 */
const assignQuestionsToTopics = (
  questions: QuizQuestion[],
  topics: SearchableTopic[],
  context: ScoringContext,
) => {
  const categorySalience = buildCategorySalience(questions);
  const scores = questions.map((question) => {
    const search = makeQuestionSearchText(
      question,
      categorySalience.get(question.category) ?? 1,
    );
    return topics.map((topic) => scoreTopic(search, topic, context));
  });

  const assignment = new Array<number>(questions.length).fill(-1);
  const counts = new Array<number>(topics.length).fill(0);

  /** Konuya, henüz atanmamış sorular arasından en iyi eşleşeni verir. */
  const claimBestQuestion = (topicIndex: number) => {
    let bestQuestion = -1;
    let bestScore = -Infinity;

    for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
      if (assignment[questionIndex] !== -1) continue;
      if (scores[questionIndex][topicIndex] > bestScore) {
        bestScore = scores[questionIndex][topicIndex];
        bestQuestion = questionIndex;
      }
    }

    if (bestQuestion === -1) return false;

    assignment[bestQuestion] = topicIndex;
    counts[topicIndex] += 1;
    return true;
  };

  // Havuzun izin verdiği asgari pay. Tek tur yeterli değil: sözcük örtüşmesi
  // zayıf konular tek soruda kalırken güçlü konular 2. aşamada kapasiteye
  // dayanıyordu. Turu bu sayıya kadar tekrarlamak minimumu yukarı çeker.
  const minPerTopic =
    topics.length > 0
      ? Math.min(MIN_QUESTIONS_PER_TOPIC, Math.floor(questions.length / topics.length))
      : 0;

  // 1. aşama: her konu sırayla en iyi eşleşen soruyu alır; tur, konu başına
  // asgari pay dolana kadar tekrarlanır. Soru kalmadığında turlar sonlanır.
  let exhausted = false;
  for (let round = 0; round < minPerTopic && !exhausted; round += 1) {
    for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
      if (counts[topicIndex] > round) continue;
      if (!claimBestQuestion(topicIndex)) {
        exhausted = true;
        break;
      }
    }
  }

  // 2. aşama: kalan sorular, kapasitesi dolmamış en iyi konuya yerleşir.
  // Kapasite asgari payın altına inemez, yoksa 1. aşamada dolan konular
  // 2. aşamada baştan dolu sayılırdı.
  const capacity = Math.max(
    1,
    minPerTopic,
    Math.ceil((questions.length / topics.length) * CAPACITY_SPREAD),
  );
  const topicOrder = topics.map((_, index) => index);

  for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
    if (assignment[questionIndex] !== -1) continue;

    const ranked = [...topicOrder].sort(
      (left, right) =>
        scores[questionIndex][right] - scores[questionIndex][left] ||
        topics[left].order - topics[right].order,
    );

    // Tüm konular doluysa en az yüklü olana düşer; hiçbir soru atanmadan kalmaz.
    const target =
      ranked.find((topicIndex) => counts[topicIndex] < capacity) ??
      ranked.reduce((best, topicIndex) => (counts[topicIndex] < counts[best] ? topicIndex : best));

    assignment[questionIndex] = target;
    counts[target] += 1;
  }

  return assignment;
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

  const context = buildScoringContext(topics);
  const assignment = assignQuestionsToTopics(questions, topics, context);

  // Soru sırası korunur; konu sayfalarında banka sırası bozulmaz.
  questions.forEach((question, index) => {
    questionsByTopic.get(topics[assignment[index]].id)?.push(question);
  });

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
