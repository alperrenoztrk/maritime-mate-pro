// Re-export types and all regulation items from category-based files.
export type {
  RegulationCategory,
  RegulationItem,
  RegulationAmendment,
  RegulationKeyArticle,
  RegulationDetailedSection,
  RegulationOperationalRequirement,
  RegulationComplianceStage,
  RegulationInspectionQuestion,
  RegulationTerm,
  RegulationSourceStatus,
} from "./regulations/types";
export type { RegulationCategory as RegulationCategoryType } from "./regulations/types";

import { imoConventions } from "./regulations/imoConventions";
import { safetyCodes } from "./regulations/safetyCodes";
import { environmentalRegulations } from "./regulations/environmental";
import { surveyRegulations, certificateRegulations } from "./regulations/surveyAndCertificates";
import { regionalRegulations } from "./regulations/regional";
import { enrichRegulation, mergeDuplicateRegulations } from "./regulations/regulationEnhancements";
import type { RegulationItem } from "./regulations/types";

const rawRegulationItems: RegulationItem[] = [
  ...imoConventions,
  ...safetyCodes,
  ...environmentalRegulations,
  ...surveyRegulations,
  ...certificateRegulations,
  ...regionalRegulations,
];

// A regulation may be relevant to more than one source category. The old list
// contained duplicate slugs (notably BWM), so the detail route could silently
// show a different record than the card the user selected. Merge those records
// first, then add the operational learning layer to every unique regulation.
export const regulationItems: RegulationItem[] = mergeDuplicateRegulations(rawRegulationItems).map(
  enrichRegulation,
);

export const regulationItemMap: Record<string, RegulationItem> = Object.fromEntries(
  regulationItems.map((item) => [item.slug, item]),
);
