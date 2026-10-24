import { useEffect, useState } from "react";
import { LEARNING_PROGRESS_EVENT, isLearningProgressKey, readLearningProgress } from "@/utils/learningProgress";

export function useLearningProgress() {
  const [progress, setProgress] = useState(readLearningProgress);
  useEffect(() => {
    const refresh = () => setProgress(readLearningProgress());
    const storage = (event: StorageEvent) => {
      if (isLearningProgressKey(event.key)) refresh();
    };
    refresh();
    window.addEventListener(LEARNING_PROGRESS_EVENT, refresh);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", storage);
    };
  }, []);
  return progress;
}
