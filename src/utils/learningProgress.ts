/** Legacy progress stays on the device until its owner explicitly imports it. */
export const LEARNING_PROGRESS_KEY = "mariners-book.learning-progress.v1";
export const LEARNING_PROGRESS_EVENT = "mariners-book:learning-progress";
const ACCOUNT_PREFIX = "mariners-book.learning-progress.v2:";
let account: string | null = null;
export interface TopicProgress {
  reviewedAt?: string;
  reviewUpdatedAt?: string;
  practice?: { correct: number; total: number; completedAt: string; weakSections: string[] };
}
export type LearningProgress = Record<string, TopicProgress>;
const date = (value: unknown) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : undefined;
export function parseLearningProgress(raw: string | null): LearningProgress {
  try {
    const value = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const result: LearningProgress = {};
    for (const [id, entry] of Object.entries(value).slice(-2000)) {
      if (!/^[a-z0-9-]{1,240}$/.test(id) || !entry || typeof entry !== "object") continue;
      const item = entry as TopicProgress;
      const reviewedAt = date(item.reviewedAt);
      const reviewUpdatedAt = date(item.reviewUpdatedAt) ?? reviewedAt;
      const p = item.practice;
      const valid = p && Number.isInteger(p.correct) && Number.isInteger(p.total) && p.total > 0 && p.total <= 10000 && p.correct >= 0 && p.correct <= p.total && date(p.completedAt) && Array.isArray(p.weakSections);
      if (!reviewUpdatedAt && !valid) continue;
      result[id] = { ...(reviewUpdatedAt ? { reviewedAt, reviewUpdatedAt } : {}), ...(valid ? { practice: { correct: p.correct, total: p.total, completedAt: date(p.completedAt)!, weakSections: p.weakSections.filter((s) => typeof s === "string" && s.length <= 300).slice(0, 100) } } : {}) };
    }
    return result;
  } catch { return {}; }
}
export const learningProgressStorageKey = (userId: string | null = account) => userId ? ACCOUNT_PREFIX + userId : LEARNING_PROGRESS_KEY;
export const getLearningProgressAccount = () => account;
export const isLearningProgressKey = (key: string | null) => key === null || key === learningProgressStorageKey();
export function setLearningProgressAccount(userId: string | null) {
  if (account === userId) return;
  account = userId; window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
}
export function readLearningProgress(userId: string | null = account): LearningProgress {
  try { return parseLearningProgress(window.localStorage.getItem(learningProgressStorageKey(userId))); }
  catch { return {}; }
}
/** Merge fields separately. The remote value wins equal timestamps. */
export function mergeLearningProgress(local: LearningProgress, remote: LearningProgress): LearningProgress {
  const merged = { ...local };
  for (const [id, incoming] of Object.entries(remote)) {
    const previous = merged[id] ?? {};
    merged[id] = { ...previous,
      ...((incoming.reviewUpdatedAt ?? "") >= (previous.reviewUpdatedAt ?? "") && incoming.reviewUpdatedAt ? { reviewedAt: incoming.reviewedAt, reviewUpdatedAt: incoming.reviewUpdatedAt } : {}),
      ...(incoming.practice && incoming.practice.completedAt >= (previous.practice?.completedAt ?? "") ? { practice: incoming.practice } : {}),
    };
  }
  return merged;
}
export function saveLearningProgress(progress: LearningProgress, userId: string | null = account, notify = true): boolean {
  try {
    window.localStorage.setItem(learningProgressStorageKey(userId), JSON.stringify(progress));
    if (notify) window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT));
    return true;
  } catch { return false; }
}
export function updateTopicProgress(id: string, update: Partial<TopicProgress>): boolean {
  if (!/^[a-z0-9-]{1,240}$/.test(id)) return false;
  const progress = readLearningProgress();
  const previous = progress[id];
  const next = { ...previous, ...update };
  if (Object.prototype.hasOwnProperty.call(update, "reviewedAt")) next.reviewUpdatedAt = new Date(Math.max(Date.now(), Date.parse(previous?.reviewUpdatedAt ?? "") + 1 || 0)).toISOString();
  if (update.practice) next.practice = { ...update.practice, completedAt: new Date(Math.max(Date.now(), Date.parse(previous?.practice?.completedAt ?? "") + 1 || 0)).toISOString() };
  return saveLearningProgress(parseLearningProgress(JSON.stringify({ ...progress, [id]: next })));
}
