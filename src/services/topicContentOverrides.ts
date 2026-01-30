export interface TopicContentOverride {
  content: string;
  updatedAt: string;
}

export type TopicContentOverrides = Record<string, TopicContentOverride>;

export const TOPIC_CONTENT_OVERRIDES_KEY = "marineExpert.topicContentOverrides";
export const TOPIC_CONTENT_OVERRIDES_EVENT = "marineExpert:topicContentOverridesUpdated";

export const buildNavigationSectionKey = (topicTitle: string, sectionTitle: string) =>
  `navigation:${topicTitle}::${sectionTitle}`;

const safeParseOverrides = (raw: string | null): TopicContentOverrides => {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as TopicContentOverrides;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const getTopicContentOverrides = (): TopicContentOverrides =>
  safeParseOverrides(localStorage.getItem(TOPIC_CONTENT_OVERRIDES_KEY));

export const getTopicContentOverride = (key: string): TopicContentOverride | undefined =>
  getTopicContentOverrides()[key];

export const setTopicContentOverride = (key: string, override: TopicContentOverride) => {
  const overrides = getTopicContentOverrides();
  const nextOverrides = {
    ...overrides,
    [key]: override,
  };
  localStorage.setItem(TOPIC_CONTENT_OVERRIDES_KEY, JSON.stringify(nextOverrides));
  window.dispatchEvent(new CustomEvent(TOPIC_CONTENT_OVERRIDES_EVENT));
};
