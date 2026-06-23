import type { Scenario } from "./types";
import { navigationScenarios } from "./navigation";
import { meteorologyScenarios } from "./meteorology";
import { stabilityScenarios } from "./stability";
import { communicationScenarios } from "./communication";
import { cargoScenarios } from "./cargo";
import { safetyScenarios } from "./safety";
import { environmentScenarios } from "./environment";
import { seamanshipScenarios } from "./seamanship";
import { economicsScenarios } from "./economics";
import { machineScenarios } from "./machine";

export type { Scenario, ScenarioStep, ScenarioChoice, ChoiceOutcome } from "./types";

/**
 * Tüm senaryolar (beta). Güverte (Seyir, Meteoroloji, Stabilite, Haberleşme,
 * Yük, Emniyet, Çevre, Gemicilik, Ticari Operasyonlar) + Makine (16 kategori).
 */
const ALL_SCENARIOS: Scenario[] = [
  ...navigationScenarios,
  ...meteorologyScenarios,
  ...stabilityScenarios,
  ...communicationScenarios,
  ...cargoScenarios,
  ...safetyScenarios,
  ...environmentScenarios,
  ...seamanshipScenarios,
  ...economicsScenarios,
  ...machineScenarios,
];

/** Bir kategoriye (topicKey) ait senaryolar. */
export const getScenariosByTopic = (topicKey?: string): Scenario[] =>
  topicKey ? ALL_SCENARIOS.filter((s) => s.topicKey === topicKey) : [];

/** Tek bir senaryo (id ile). */
export const getScenarioById = (id?: string): Scenario | undefined =>
  ALL_SCENARIOS.find((s) => s.id === id);

/** Bu kategorinin senaryosu var mı? */
export const hasScenarios = (topicKey?: string): boolean =>
  getScenariosByTopic(topicKey).length > 0;
