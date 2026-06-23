import { meteorologyTopicContents } from "@/data/meteorologyTopicContents";
import { navigationTopicContents, type TopicDetailContent } from "@/data/navigationTopicContents";
import { communicationTopicContents } from "@/data/communicationTopicContents";
import { cargoTopicContents } from "@/data/cargoTopicContents";
import { safetyTopicContents } from "@/data/safetyTopicContents";
import { environmentTopicContents } from "@/data/environmentTopicContents";
import { seamanshipTopicContents } from "@/data/seamanshipTopicContents";

export const topicContentsByCategory: Record<string, Record<string, TopicDetailContent>> = {
  navigation: navigationTopicContents,
  meteorology: meteorologyTopicContents,
  communication: communicationTopicContents,
  cargo: cargoTopicContents,
  safety: safetyTopicContents,
  environment: environmentTopicContents,
  seamanship: seamanshipTopicContents,
};

export const getTopicContentsByCategory = (categoryId?: string) =>
  (categoryId ? topicContentsByCategory[categoryId] : undefined) ?? {};

export const getTopicContentTitlesByCategory = (categoryId?: string) =>
  new Set(Object.keys(getTopicContentsByCategory(categoryId)));
