import type { RuleGroup } from "../types";
import { machineTopicRules } from "@/pages/MachineTopicRulesPage";
import { stabilityRules } from "./stability";
import { navigationRules } from "./navigation";
import { cargoRules } from "./cargo";
import { meteorologyRules } from "./meteorology";
import { seamanshipRules } from "./seamanship";
import { safetyRules } from "./safety";
import { environmentRules } from "./environment";
import { communicationRules } from "./communication";
import { economicsRules } from "./economics";

/**
 * Unified rules registry. Machine topics come from the existing `machineTopicRules`
 * (keyed by slug); deck topics come from their own data files.
 */
const deckRules: Record<string, RuleGroup[]> = {
  stability: stabilityRules,
  navigation: navigationRules,
  cargo: cargoRules,
  meteorology: meteorologyRules,
  seamanship: seamanshipRules,
  safety: safetyRules,
  environment: environmentRules,
  communication: communicationRules,
  economics: economicsRules,
};

export function getTopicRules(key?: string): RuleGroup[] {
  if (!key) return [];
  return deckRules[key] ?? machineTopicRules[key] ?? [];
}

export function hasTopicRules(key?: string): boolean {
  return getTopicRules(key).length > 0;
}
