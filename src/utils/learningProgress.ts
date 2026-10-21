export const LEARNING_PROGRESS_KEY = "mariners-book.learning-progress.v1";
export const LEARNING_PROGRESS_EVENT = "mariners-book:learning-progress";
export interface TopicProgress {
  reviewedAt?: string;
  practice?: { correct: number; total: number; completedAt: string; weakSections: string[] };
}
export type LearningProgress = Record<string, TopicProgress>;

export function parseLearningProgress(raw: string | null): LearningProgress {
  try {
    const value = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const result: LearningProgress = {};
    for (const [id, entry] of Object.entries(value).slice(-2000)) {
      if (!/^[a-z0-9-]+$/.test(id) || !entry || typeof entry !== "object") continue;
      const item = entry as TopicProgress;
      const reviewedAt = typeof item.reviewedAt === "string" && Number.isFinite(Date.parse(item.reviewedAt)) ? item.reviewedAt : undefined;
      const p = item.practice;
      const valid = p && Number.isInteger(p.correct) && Number.isInteger(p.total) && p.total > 0 && p.correct >= 0 && p.correct <= p.total && typeof p.completedAt === "string" && Number.isFinite(Date.parse(p.completedAt)) && Array.isArray(p.weakSections);
      result[id] = { reviewedAt, practice: valid ? { ...p, weakSections: p.weakSections.filter((s) => typeof s === "string").slice(0, 100) } : undefined };
    }
    return result;
  } catch { return {}; }
}

export function readLearningProgress(): LearningProgress {
  try { return parseLearningProgress(window.localStorage.getItem(LEARNING_PROGRESS_KEY)); }
  catch { return {}; }
}

export function updateTopicProgress(id: string, update: Partial<TopicProgress>): boolean {
  try {
    const progress = readLearningProgress();
    const next = { ...progress[id], ...update };
    window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify({ ...progress, [id]: next }));
    window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
    return true;
  } catch { return false; }
}
