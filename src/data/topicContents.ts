import { meteorologyTopicContents } from "@/data/meteorologyTopicContents";
import { navigationTopicContents, type TopicDetailContent } from "@/data/navigationTopicContents";
import { communicationTopicContents } from "@/data/communicationTopicContents";
import { cargoTopicContents } from "@/data/cargoTopicContents";
import { safetyTopicContents } from "@/data/safetyTopicContents";
import { environmentTopicContents } from "@/data/environmentTopicContents";
import { seamanshipTopicContents } from "@/data/seamanshipTopicContents";
import { economicsTopicContents } from "@/data/economicsTopicContents";
import { operationalNavigationTopicContents } from "@/data/operationalNavigationTopicContents";
import { operationalSafetyTopicContents } from "@/data/operationalSafetyTopicContents";
import { operationalCargoTopicContents } from "@/data/operationalCargoTopicContents";
import { operationalSeamanshipTopicContents } from "@/data/operationalSeamanshipTopicContents";
import { operationalCommunicationTopicContents } from "@/data/operationalCommunicationTopicContents";

export const topicContentsByCategory: Record<string, Record<string, TopicDetailContent>> = {
  navigation: {
    ...navigationTopicContents,
    ...operationalNavigationTopicContents,
  },
  meteorology: meteorologyTopicContents,
  communication: {
    ...communicationTopicContents,
    ...operationalCommunicationTopicContents,
  },
  cargo: {
    ...cargoTopicContents,
    ...operationalCargoTopicContents,
  },
  safety: {
    ...safetyTopicContents,
    ...operationalSafetyTopicContents,
  },
  environment: environmentTopicContents,
  seamanship: {
    ...seamanshipTopicContents,
    ...operationalSeamanshipTopicContents,
  },
  economics: economicsTopicContents,
};

export const getTopicContentsByCategory = (categoryId?: string) =>
  (categoryId ? topicContentsByCategory[categoryId] : undefined) ?? {};

export const getTopicContentTitlesByCategory = (categoryId?: string) =>
  new Set(Object.keys(getTopicContentsByCategory(categoryId)));
