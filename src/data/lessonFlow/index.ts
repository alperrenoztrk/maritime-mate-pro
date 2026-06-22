import type { LessonFlow } from "./types";
import { navigationLessonFlows } from "./navigation";
import { meteorologyLessonFlows } from "./meteorology";

export type { LessonFlow, LessonBlock, RecapQuestion } from "./types";

/** Tüm rehberli akışlar (beta). Seyir + Meteoroloji doludur. */
const ALL_FLOWS: LessonFlow[] = [...navigationLessonFlows, ...meteorologyLessonFlows];

/** Bir kategoriye (topicKey) ait tüm rehberli akışları döndürür. */
export const getLessonFlowsByTopic = (topicKey?: string): LessonFlow[] =>
  topicKey ? ALL_FLOWS.filter((f) => f.topicKey === topicKey) : [];

/** Belirli bir alt konunun rehberli akışını döndürür (yoksa undefined). */
export const getLessonFlow = (
  topicKey: string | undefined,
  topicTitle: string | undefined,
): LessonFlow | undefined =>
  ALL_FLOWS.find((f) => f.topicKey === topicKey && f.topicTitle === topicTitle);

/** Bu alt konunun Duolingo akışı var mı? */
export const hasLessonFlow = (topicKey?: string, topicTitle?: string): boolean =>
  !!getLessonFlow(topicKey, topicTitle);
