import assert from "node:assert/strict";
import test from "node:test";
import { LEARNING_PROGRESS_KEY, LEARNING_PROGRESS_EVENT, learningProgressStorageKey, mergeLearningProgress, parseLearningProgress, readLearningProgress, saveLearningProgress, setLearningProgressAccount, updateTopicProgress } from "./learningProgress";
import { getLearningSyncStatus, startLearningProgressSync } from "./learningProgressSync";

const storage = new Map<string, string>();
let failStorage = false;
const target = new EventTarget();
Object.assign(globalThis, { window: Object.assign(target, { localStorage: {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => { if (failStorage) throw new Error("quota"); storage.set(key, value); },
} }) });
Object.defineProperty(globalThis, "navigator", { configurable: true, value: { onLine: true } });
const t1 = "2026-10-21T10:00:00.000Z", t2 = "2026-10-21T11:00:00.000Z";
const practice = { correct: 1, total: 3, completedAt: t2, weakSections: ["reasoning"] };
const tick = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

test("malformed progress cannot introduce invalid scores or unsafe topic identifiers", () => {
  assert.deepEqual(parseLearningProgress("broken"), {});
  assert.deepEqual(parseLearningProgress('{"__proto__":{"reviewedAt":"2026-01-01"}}'), {});
  assert.deepEqual(parseLearningProgress(JSON.stringify({ topic: { practice: { ...practice, correct: 4 } } })), {});
  assert.equal(parseLearningProgress(JSON.stringify({ topic: { reviewedAt: t1, practice: { ...practice, correct: -1 } } })).topic.practice, undefined);
  assert.deepEqual(parseLearningProgress(JSON.stringify({ topic: { practice: { ...practice, weakSections: [42, "valid"] } } })).topic.practice?.weakSections, ["valid"]);
});
test("account scope never adopts shared guest progress automatically", () => {
  storage.clear(); setLearningProgressAccount(null);
  updateTopicProgress("guest", { reviewedAt: t1 });
  setLearningProgressAccount("account-a"); assert.deepEqual(readLearningProgress(), {});
  updateTopicProgress("private", { reviewedAt: t2 });
  setLearningProgressAccount("account-b"); assert.deepEqual(readLearningProgress(), {});
  assert(storage.has(LEARNING_PROGRESS_KEY)); assert(storage.has(learningProgressStorageKey("account-a")));
  setLearningProgressAccount("account-a"); assert(readLearningProgress().private); assert(!readLearningProgress().guest);
});
test("review and practice merge independently; unread tombstones survive stale devices", () => {
  const local = parseLearningProgress(JSON.stringify({ topic: { reviewedAt: t1, reviewUpdatedAt: t1, practice } }));
  const remote = parseLearningProgress(JSON.stringify({ topic: { reviewedAt: null, reviewUpdatedAt: t2, practice: { ...practice, correct: 3, completedAt: t1 } } }));
  const merged = mergeLearningProgress(local, remote);
  assert.equal(merged.topic.reviewedAt, undefined); assert.equal(merged.topic.practice?.correct, 1);
  assert.equal(mergeLearningProgress(merged, local).topic.reviewedAt, undefined);
});
test("local writes report failure and consecutive edits have monotonic timestamps", () => {
  storage.clear(); setLearningProgressAccount("account-a");
  updateTopicProgress("topic", { reviewedAt: t1, practice }); const first = readLearningProgress().topic;
  updateTopicProgress("topic", { reviewedAt: undefined, practice }); const second = readLearningProgress().topic;
  assert(second.reviewUpdatedAt! > first.reviewUpdatedAt!); assert(second.practice!.completedAt > first.practice!.completedAt);
  failStorage = true;
  assert.equal(updateTopicProgress("topic", { reviewedAt: t2 }), false);
  failStorage = false;
});
test("an old account response cannot update the next account", async () => {
  storage.clear(); setLearningProgressAccount("account-a");
  let finish!: (value: unknown) => void; let signal!: AbortSignal;
  const stop = startLearningProgressSync("account-a", (_, incomingSignal) => { signal = incomingSignal; return new Promise((resolve) => { finish = resolve; }); });
  try { await tick(); setLearningProgressAccount("account-b"); stop(); assert(signal.aborted);
    finish({ topic: { reviewedAt: t2 } }); await tick(); assert.deepEqual(readLearningProgress(), {});
  } finally { stop(); }
});
test("edits made while a request is in flight survive and are uploaded again", async () => {
  storage.clear(); setLearningProgressAccount("account-a");
  saveLearningProgress({ topic: { reviewedAt: t1, reviewUpdatedAt: t1 } });
  let finish!: (value: unknown) => void; const uploads: unknown[] = [];
  const stop = startLearningProgressSync("account-a", async (sent) => { uploads.push(sent); if (uploads.length === 1) return new Promise((resolve) => { finish = resolve; }); return sent; });
  try { await tick(); updateTopicProgress("topic", { practice }); const updated = readLearningProgress().topic.practice;
    finish({ topic: { reviewedAt: t1, reviewUpdatedAt: t1 } }); await tick(550);
    assert.equal(uploads.length, 2); assert.deepEqual(readLearningProgress().topic.practice, updated); assert.equal(getLearningSyncStatus(), "synced");
  } finally { stop(); }
});
test("offline work remains local and resumes on connectivity; failed transport remains pending", async () => {
  storage.clear(); setLearningProgressAccount("account-a");
  Object.assign(navigator, { onLine: false }); let calls = 0;
  const stop = startLearningProgressSync("account-a", async (sent) => { calls++; if (calls === 1) throw new Error("network"); return sent; });
  try { updateTopicProgress("topic", { reviewedAt: t1 }); await tick(450);
    assert.equal(calls, 0); assert.equal(getLearningSyncStatus(), "pending");
    Object.assign(navigator, { onLine: true }); window.dispatchEvent(new Event("online")); await tick();
    assert.equal(getLearningSyncStatus(), "pending"); assert(readLearningProgress().topic);
    window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT)); await tick(450); assert.equal(getLearningSyncStatus(), "synced");
  } finally { stop(); Object.assign(navigator, { onLine: true }); }
});
