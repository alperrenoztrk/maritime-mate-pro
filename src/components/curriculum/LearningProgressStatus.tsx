import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuthContext";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { LEARNING_PROGRESS_EVENT, mergeLearningProgress, readLearningProgress, saveLearningProgress } from "@/utils/learningProgress";
import { getLearningSyncStatus, LEARNING_SYNC_EVENT } from "@/utils/learningProgressSync";
export function LearningProgressStatus() {
  const { user } = useAuth();
  const userId = user?.id;
  const progress = useLearningProgress();
  const [status, setStatus] = useState(getLearningSyncStatus);
  const [imported, setImported] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const refresh = () => setStatus(getLearningSyncStatus());
    window.addEventListener(LEARNING_SYNC_EVENT, refresh); refresh();
    return () => window.removeEventListener(LEARNING_SYNC_EVENT, refresh);
  }, []);
  useEffect(() => {
    try { setImported(!!userId && localStorage.getItem(`learning-progress-imported:${userId}`) === "yes"); }
    catch { setImported(false); }
  }, [userId]);
  const hasDeviceProgress = userId && !imported && Object.keys(readLearningProgress(null)).length > 0;
  return <section aria-label="Learning progress" className="space-y-2 rounded-xl border p-4 text-sm">
    <p role="status">{!userId ? "Progress is saved on this device." : status === "synced" ? "Progress is synced with your account." : status === "syncing" ? "Syncing your learning progress…" : "Progress is saved on this device. Account sync is pending; it will retry when available."}</p>
    <p className="text-muted-foreground">Topics reviewed: {Object.values(progress).filter((item) => item.reviewedAt).length}</p>
    {userId && status === "pending" && <button type="button" className="min-h-11 font-semibold text-primary underline" onClick={() => window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT))}>Retry sync</button>}
    {hasDeviceProgress && <div className="space-y-2">
      <p>Earlier device progress is separate from your account. Import it only if it belongs to you; newer account results will be kept.</p>
      <button type="button" className="min-h-11 font-semibold text-primary underline" onClick={() => {
        const saved = saveLearningProgress(mergeLearningProgress(readLearningProgress(null), readLearningProgress(userId)), userId);
        setError(!saved);
        if (saved) { setImported(true); try { localStorage.setItem(`learning-progress-imported:${userId}`, "yes"); } catch { /* Progress is already saved. */ } }
      }}>Import my earlier device progress</button>
    </div>}
    {error && <p role="alert">Your browser could not save progress. Please try again.</p>}
  </section>;
}
