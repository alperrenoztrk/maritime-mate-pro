import type { QuizQuestion } from "@/types/quiz";

/**
 * Duolingo tarzı rehberli ders akışı modeli ("Dersler Beta").
 *
 * Mantık: ÖNCE ANLAT → SONRA ANLATILANI KARIŞIK SOR.
 * - Anlatım metinleri YENİDEN YAZILMAZ; mevcut `navigationTopicContents` (vb.)
 *   `TopicDetailContent.sections` içeriği read-only okunur. Buradaki `blocks`
 *   yalnızca o bölüm başlıklarına ATIF yapar (öğretim sırası/gruplaması).
 * - `questions`, az önce anlatılan bölümlere dair recap sorularıdır; her soru
 *   `sectionRef` ile hangi anlatımdan geldiğine etiketlenir. Oturumda blok bazında
 *   karıştırılarak (Fisher-Yates) sorulur, yanlışlar sonda tekrar gelir.
 *
 * Orijinal "Dersler"e dokunulmaz; bu katman tamamen beta'ya özeldir.
 */

export interface RecapQuestion extends QuizQuestion {
  /** Sorunun dayandığı bölüm başlığı (TopicSection.title ile birebir eşleşir). */
  sectionRef: string;
}

export interface LessonBlock {
  /** Bu blokta öğretilecek bölüm başlıkları (TopicDetailContent.sections sırası). */
  sectionTitles: string[];
}

export interface LessonFlow {
  /** Birleşik registry anahtarı / kategori id (örn. "navigation"). */
  topicKey: string;
  /** Alt konu başlığı — `getTopicContentsByCategory(topicKey)` anahtarıyla aynı. */
  topicTitle: string;
  /** Öğretim blokları: her blok birkaç bölümü öğretip ardından soru sorar. */
  blocks: LessonBlock[];
  /** Karıştırılıp blok bazında dağıtılacak recap soru havuzu. */
  questions: RecapQuestion[];
}
