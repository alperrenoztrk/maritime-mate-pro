import type { LucideIcon } from "lucide-react";

/**
 * Content authority classification.
 *
 * LEARN       → educational theory/example
 * REFERENCE   → quick factual lookup
 * OPERATIONAL → practical guidance that still requires vessel/SMS verification
 * REGULATORY  → regulation/code content with explicit applicability/source
 * VESSEL_SPECIFIC / MANUFACTURER_SPECIFIC → must never be generalized as an IMO limit
 */
export type ContentClassification =
  | "LEARN"
  | "REFERENCE"
  | "OPERATIONAL"
  | "REGULATORY"
  | "VESSEL_SPECIFIC"
  | "MANUFACTURER_SPECIFIC";

export type ReviewStatus = "VERIFIED" | "NEEDS_REVIEW" | "VESSEL_SPECIFIC" | "MANUFACTURER_SPECIFIC";

export interface ApplicabilityRef {
  /** Human-readable applicability statement; required before treating a rule as operational/regulatory. */
  summary: string;
  /** Optional structured hints used by future applicability filters. */
  shipTypes?: string[];
  minGT?: number;
  maxGT?: number;
  constructionDateFrom?: string;
  constructionDateTo?: string;
  seaAreas?: string[];
  cargoes?: string[];
  equipment?: string[];
}

export interface FormulaVariable {
  symbol: string;
  label: string;
  unit?: string;
}

export interface CalcInput {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
  /** Optional numeric bounds; the shared calculator applies them in the UI and in validation. */
  min?: number;
  max?: number;
  step?: number | "any";
  /** Defaults to true. Use false only for fields that are genuinely optional. */
  required?: boolean;
  /** Short operational help for the source of the input or its sign/unit convention. */
  help?: string;
}

export interface CalcResult {
  label: string;
  value: string;
}

export interface CalcStep {
  title: string;
  expression?: string;
  result?: string;
  hint?: string;
}

/**
 * Real source reference used to prevent invented rules and formulas.
 *
 * Safety-critical regulatory entries should progressively populate edition,
 * amendment/effective-date and applicability instead of relying on a code name
 * alone. The official current instrument remains authoritative.
 */
export interface SourceRef {
  code: string;
  detail?: string;
  url?: string;
  edition?: string;
  amendment?: string;
  effectiveDate?: string;
  applicability?: ApplicabilityRef;
  /** ISO date of the last source-level content review. */
  lastReviewed?: string;
  reviewStatus?: ReviewStatus;
  /** e.g. IMO, ILO, Flag Administration, Class, Company SMS, Manufacturer. */
  authority?: string[];
}

export interface CourseEntry {
  /** Stable slug, e.g. "carnot-efficiency". */
  id: string;
  name: string;
  /** Formula group heading, e.g. "Laws of Thermodynamics". */
  group: string;
  /** Display expression, e.g. "η = 1 − (T_L / T_H)". */
  formula: string;
  variables: FormulaVariable[];
  source?: SourceRef;
  note?: string;
  /** Information-authority class. Legacy entries may omit it while migration is in progress. */
  classification?: ContentClassification;
  /** Entry-level applicability override when narrower than the source. */
  applicability?: ApplicabilityRef;
  /** Inputs of the linked calculator (provided together with calculate). */
  inputs?: CalcInput[];
  calculate?: (vals: Record<string, number>) => CalcResult[];
  /**
   * OPTIONAL step-by-step solution generator. It works from the same inputs as
   * `calculate` and always produces the same quantity in the same unit.
   */
  steps?: (vals: Record<string, number>) => CalcStep[];
}

/** The subtitle and bullet list of a rule group. */
export interface RuleSection {
  subtitle: string;
  content: string[];
}

/** Rule category (compatible with the existing machine RuleCategory shape). */
export interface RuleGroup {
  title: string;
  source?: SourceRef;
  rules: RuleSection[];
  classification?: ContentClassification;
  applicability?: ApplicabilityRef;
}

export interface CourseTopic {
  /** Unified registry key: machine = slug, deck = category id. */
  key: string;
  title: string;
  icon: LucideIcon;
  /** Tailwind gradient class (the same as in the existing config). */
  accent: string;
  group: "deck" | "machine";
  intro?: string;
  entries: CourseEntry[];
  /** Optional default classification inherited conceptually by entries. */
  defaultClassification?: ContentClassification;
  /** Optional: a link to the advanced/legacy tool page. */
  advancedTool?: { label: string; href: string };
}
