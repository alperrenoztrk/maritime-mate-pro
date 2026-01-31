export interface TopicContentOverride {
  content: string;
  updatedAt: string;
}

export type TopicContentOverrides = Record<string, TopicContentOverride>;

export const TOPIC_CONTENT_OVERRIDES_KEY = "marineExpert.topicContentOverrides";
export const TOPIC_CONTENT_OVERRIDES_EVENT = "marineExpert:topicContentOverridesUpdated";

// Category prefixes for building keys
export type ContentCategory = "navigation" | "stability" | "cargo" | "meteorology" | "safety" | "seamanship" | "machine";

export const buildSectionKey = (category: ContentCategory, topicTitle: string, sectionTitle: string) =>
  `${category}:${topicTitle}::${sectionTitle}`;

// Legacy function for backward compatibility
export const buildNavigationSectionKey = (topicTitle: string, sectionTitle: string) =>
  buildSectionKey("navigation", topicTitle, sectionTitle);

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

export const setMultipleTopicContentOverrides = (updates: Record<string, TopicContentOverride>) => {
  const overrides = getTopicContentOverrides();
  const nextOverrides = { ...overrides, ...updates };
  localStorage.setItem(TOPIC_CONTENT_OVERRIDES_KEY, JSON.stringify(nextOverrides));
  window.dispatchEvent(new CustomEvent(TOPIC_CONTENT_OVERRIDES_EVENT));
};

export const getOverridesByCategory = (category: ContentCategory): TopicContentOverrides => {
  const all = getTopicContentOverrides();
  const prefix = `${category}:`;
  return Object.fromEntries(
    Object.entries(all).filter(([key]) => key.startsWith(prefix))
  );
};
