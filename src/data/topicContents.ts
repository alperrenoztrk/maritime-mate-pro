import { meteorologyTopicContents } from "@/data/meteorologyTopicContents";
import { navigationTopicContents, type TopicDetailContent } from "@/data/navigationTopicContents";

export const topicContentsByCategory: Record<string, Record<string, TopicDetailContent>> = {
  navigation: navigationTopicContents,
  meteorology: meteorologyTopicContents,
};

export const getTopicContentsByCategory = (categoryId?: string) =>
  (categoryId ? topicContentsByCategory[categoryId] : undefined) ?? {};

export const getTopicContentTitlesByCategory = (categoryId?: string) =>
  new Set(Object.keys(getTopicContentsByCategory(categoryId)));
