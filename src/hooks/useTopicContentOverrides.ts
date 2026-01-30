import { useEffect, useState } from "react";
import {
  getTopicContentOverrides,
  TOPIC_CONTENT_OVERRIDES_EVENT,
  TOPIC_CONTENT_OVERRIDES_KEY,
  type TopicContentOverrides,
} from "@/services/topicContentOverrides";

export const useTopicContentOverrides = () => {
  const [overrides, setOverrides] = useState<TopicContentOverrides>(() =>
    getTopicContentOverrides()
  );

  useEffect(() => {
    const refresh = () => setOverrides(getTopicContentOverrides());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === TOPIC_CONTENT_OVERRIDES_KEY) {
        refresh();
      }
    };

    window.addEventListener(TOPIC_CONTENT_OVERRIDES_EVENT, refresh);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(TOPIC_CONTENT_OVERRIDES_EVENT, refresh);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return overrides;
};
