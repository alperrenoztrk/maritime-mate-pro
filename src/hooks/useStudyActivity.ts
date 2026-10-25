import { useEffect, useState } from "react";
import { getRecent, getSaved, STUDY_EVENT, type StudyItem } from "@/lib/studyActivity";

/** Live view of recent and saved study pages. */
export function useStudyActivity() {
  const [state, setState] = useState<{ recent: StudyItem[]; saved: StudyItem[] }>(() => ({
    recent: getRecent(),
    saved: getSaved(),
  }));
  useEffect(() => {
    const sync = () => setState({ recent: getRecent(), saved: getSaved() });
    window.addEventListener(STUDY_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STUDY_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}
