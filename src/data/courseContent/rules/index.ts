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
 * Birleşik kural registry'si. Makine konuları mevcut `machineTopicRules`
 * (slug anahtarlı) üzerinden; güverte konuları kendi veri dosyalarından gelir.
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
