/**
 * Ders slaytlarında kalınan yer (localStorage).
 *
 * `topicContentOverrides.ts` deseni: sabit anahtar + CustomEvent. Video benzeri
 * akışta kullanıcı dersi yarıda bırakabildiği için kaldığı slayttan devam
 * edebilmesi gerekir. Sunucu tarafı gerekmez.
 */

export interface LessonProgressEntry {
  slideIndex: number;
  totalSlides: number;
  updatedAt: string;
  completedAt?: string;
}

export type LessonProgressMap = Record<string, LessonProgressEntry>;

export const LESSON_PROGRESS_KEY = "marineExpert.lessonProgress";
export const LESSON_PROGRESS_EVENT = "marineExpert:lessonProgressUpdated";

/**
 * Ders ve Alıştırma aynı konu için FARKLI desteler üretir (alıştırmada araya
 * quiz slaytları girer), bu yüzden slayt indeksleri birbirine karışmasın diye
 * anahtar `variant` ile ayrılır.
 */
export const buildProgressKey = (categoryId: string, topicTitle: string, variant = "lesson") =>
  `${categoryId}|${topicTitle}|${variant}`;

export const getLessonProgressMap = (): LessonProgressMap => {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as LessonProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const getLessonProgress = (
  categoryId?: string,
  topicTitle?: string,
  variant?: string,
): LessonProgressEntry | undefined => {
  if (!categoryId || !topicTitle) return undefined;
  return getLessonProgressMap()[buildProgressKey(categoryId, topicTitle, variant)];
};

export const setLessonProgress = (
  categoryId: string,
  topicTitle: string,
  entry: Omit<LessonProgressEntry, "updatedAt">,
  variant?: string,
) => {
  const map = getLessonProgressMap();
  const key = buildProgressKey(categoryId, topicTitle, variant);
  const previous = map[key];
  map[key] = {
    ...entry,
    // Bir kez tamamlanan ders tamamlanmış kalır.
    completedAt: entry.completedAt ?? previous?.completedAt,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(map));
  } catch {
    // Kota dolu / private mode: ilerleme kaydedilemese de ders çalışmaya devam eder.
  }
  window.dispatchEvent(new CustomEvent(LESSON_PROGRESS_EVENT, { detail: { key } }));
};

export const isLessonCompleted = (
  categoryId?: string,
  topicTitle?: string,
  variant?: string,
): boolean => !!getLessonProgress(categoryId, topicTitle, variant)?.completedAt;
