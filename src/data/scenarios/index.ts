import type { Scenario } from "./types";
import { navigationScenarios } from "./navigation";
import { meteorologyScenarios } from "./meteorology";

export type { Scenario, ScenarioStep, ScenarioChoice, ChoiceOutcome } from "./types";

/** Tüm senaryolar (beta). Seyir + Meteoroloji doludur. */
const ALL_SCENARIOS: Scenario[] = [...navigationScenarios, ...meteorologyScenarios];

/** Bir kategoriye (topicKey) ait senaryolar. */
export const getScenariosByTopic = (topicKey?: string): Scenario[] =>
  topicKey ? ALL_SCENARIOS.filter((s) => s.topicKey === topicKey) : [];

/** Tek bir senaryo (id ile). */
export const getScenarioById = (id?: string): Scenario | undefined =>
  ALL_SCENARIOS.find((s) => s.id === id);

/** Bu kategorinin senaryosu var mı? */
export const hasScenarios = (topicKey?: string): boolean =>
  getScenariosByTopic(topicKey).length > 0;
