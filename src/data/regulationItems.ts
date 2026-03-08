// Re-export types and all regulation items from category-based files
export type { RegulationCategory, RegulationItem, RegulationAmendment, RegulationKeyArticle } from "./regulations/types";
export type { RegulationCategory as RegulationCategoryType } from "./regulations/types";

import { imoConventions } from "./regulations/imoConventions";
import { safetyCodes } from "./regulations/safetyCodes";
import { environmentalRegulations } from "./regulations/environmental";
import { surveyRegulations, certificateRegulations } from "./regulations/surveyAndCertificates";
import { regionalRegulations } from "./regulations/regional";
import type { RegulationItem } from "./regulations/types";

export const regulationItems: RegulationItem[] = [
  ...imoConventions,
  ...safetyCodes,
  ...environmentalRegulations,
  ...surveyRegulations,
  ...certificateRegulations,
  ...regionalRegulations,
];

export const regulationItemMap: Record<string, RegulationItem> = Object.fromEntries(
  regulationItems.map((item) => [item.slug, item])
);
