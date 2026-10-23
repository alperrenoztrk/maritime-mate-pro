import { LEARNING_PROGRESS_EVENT, getLearningProgressAccount, isLearningProgressKey, mergeLearningProgress, parseLearningProgress, readLearningProgress, saveLearningProgress, type LearningProgress } from "./learningProgress";
export const LEARNING_SYNC_EVENT = "mariners-book:learning-sync";
export type LearningSyncStatus = "device" | "syncing" | "synced" | "pending";
let status: LearningSyncStatus = "device";
export const getLearningSyncStatus = () => status;
const publish = (value: LearningSyncStatus) => { status = value; window.dispatchEvent(new Event(LEARNING_SYNC_EVENT)); };
export type ProgressTransport = (progress: LearningProgress, signal: AbortSignal) => Promise<unknown>;
/** Local state is the durable retry queue; responses are bound to their initiating account. */
export function startLearningProgressSync(userId: string, transport: ProgressTransport) {
  let stopped = false, running = false, rerun = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let controller: AbortController | undefined;
  const active = () => !stopped && getLearningProgressAccount() === userId;
  const schedule = (delay = 400) => { if (active()) { clearTimeout(timer); timer = setTimeout(() => { void sync(); }, delay); } };
  const sync = async () => {
    if (!active()) return;
    if (running) { rerun = true; return; }
    if (!navigator.onLine) { publish("pending"); return; }
    running = true; publish("syncing"); controller = new AbortController();
    const deadline = setTimeout(() => controller?.abort(), 12000);
    try {
      const sent = readLearningProgress(userId);
      const data = await transport(sent, controller.signal);
      if (!active()) return;
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid progress response");
      const received = parseLearningProgress(JSON.stringify(data));
      const current = readLearningProgress(userId);
      const merged = mergeLearningProgress(current, received);
      if (!saveLearningProgress(merged, userId, false)) throw new Error("Local storage unavailable");
      window.dispatchEvent(new CustomEvent(LEARNING_PROGRESS_EVENT, { detail: { synced: true } }));
      if (JSON.stringify(current) !== JSON.stringify(sent)) rerun = true;
      publish(rerun ? "pending" : "synced");
    } catch { if (active()) { publish("pending"); schedule(30000); } }
    finally { clearTimeout(deadline); running = false; if (active() && rerun) { rerun = false; schedule(); } }
  };
  const changed = (event: Event) => { if (!(event instanceof CustomEvent && event.detail?.synced)) schedule(); };
  const storage = (event: StorageEvent) => { if (isLearningProgressKey(event.key)) schedule(); };
  const retry = () => schedule(0);
  window.addEventListener(LEARNING_PROGRESS_EVENT, changed); window.addEventListener("storage", storage);
  window.addEventListener("online", retry); window.addEventListener("focus", retry); schedule(0);
  return () => {
    stopped = true; clearTimeout(timer); controller?.abort();
    window.removeEventListener(LEARNING_PROGRESS_EVENT, changed); window.removeEventListener("storage", storage);
    window.removeEventListener("online", retry); window.removeEventListener("focus", retry); publish("device");
  };
}
