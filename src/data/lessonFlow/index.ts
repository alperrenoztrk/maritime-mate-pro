import learningCaseStudies from "../learningCaseStudies.json";
import { operationalLessonFlows } from "./operational";
import type { LessonFlow } from "./types";
import { navigationLessonFlows } from "./navigation";
import { meteorologyLessonFlows } from "./meteorology";
import { machineLessonFlows } from "./machine";
import { communicationLessonFlows } from "./communication";
import { stabilityLessonFlows } from "./stability";
import { cargoLessonFlows } from "./cargo";
import { safetyLessonFlows } from "./safety";
import { environmentLessonFlows } from "./environment";
import { seamanshipLessonFlows } from "./seamanship";
import { economicsLessonFlows } from "./economics";

export type { LessonFlow, LessonBlock, RecapQuestion } from "./types";

/** Tüm rehberli akışlar (beta). Güverte (Seyir, Meteoroloji, Haberleşme, Stabilite, Yük, Emniyet, Çevre, Gemicilik, Ticari Operasyonlar) + Makine. */
const ALL_FLOWS: LessonFlow[] = [
  ...operationalLessonFlows,
  ...navigationLessonFlows,
  ...meteorologyLessonFlows,
  ...machineLessonFlows,
  ...communicationLessonFlows,
  ...stabilityLessonFlows,
  ...cargoLessonFlows,
  ...safetyLessonFlows,
  ...environmentLessonFlows,
  ...seamanshipLessonFlows,
  ...economicsLessonFlows,
].map((flow) => {
  const workedCase = learningCaseStudies.find((entry) => entry.topicKey === flow.topicKey && entry.topicTitle === flow.topicTitle);
  return workedCase ? { ...flow, blocks: [...flow.blocks, { sectionTitles: [workedCase.section.id] }], questions: [...flow.questions, workedCase.question] } : flow;
});

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
