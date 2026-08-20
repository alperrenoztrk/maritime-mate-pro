export type RegulationCategory =
  | "IMO Conventions"
  | "Safety Codes"
  | "Environmental Regulations"
  | "Inspection & Survey"
  | "Ship Certificates"
  | "Regional Regulations";

export type RegulationAmendment = {
  year: string;
  description: string;
};

export type RegulationKeyArticle = {
  id: string;
  title: string;
  summary: string;
};

export type RegulationDetailedSection = {
  heading: string;
  body: string;
};

export type RegulationOperationalRequirement = {
  title: string;
  regulatoryBasis: string;
  requirement: string;
  rationale: string;
  onboardEvidence: string[];
  responsibleRoles: string[];
  verification: string[];
  commonFailure: string;
};

export type RegulationComplianceStage = {
  stage: string;
  objective: string;
  activities: string[];
  outputs: string[];
};

export type RegulationInspectionQuestion = {
  question: string;
  expectedAnswer: string;
  evidence: string[];
  redFlags: string[];
};

export type RegulationTerm = {
  term: string;
  definition: string;
  practicalNote?: string;
};

export type RegulationSourceStatus = {
  reviewedThrough: string;
  officialSources: { label: string; href: string }[];
  caution: string;
};

export type RegulationNarrativeScenario = {
  title: string;
  situation: string;
  analysis: string;
  correctApproach: string;
};

export type RegulationNarrativeSection = {
  heading: string;
  paragraphs: string[];
  references?: string[];
  shipboardMeaning?: string;
  commonMistakes?: string[];
  scenario?: RegulationNarrativeScenario;
};

export type RegulationNarrativeChapter = {
  id: string;
  title: string;
  introduction: string;
  sections: RegulationNarrativeSection[];
  chapterTakeaways?: string[];
};

export type RegulationItem = {
  slug: string;
  label: string;
  category: RegulationCategory;
  overview: string;
  essentials: string[];
  actions: string[];
  resources?: { label: string; href: string }[];
  history?: string;
  applicability?: string[];
  amendments?: RegulationAmendment[];
  keyArticles?: RegulationKeyArticle[];
  penalties?: string[];
  relatedSlugs?: string[];
  detailedSections?: RegulationDetailedSection[];
  learningObjectives?: string[];
  operationalRequirements?: RegulationOperationalRequirement[];
  complianceStages?: RegulationComplianceStage[];
  inspectionQuestions?: RegulationInspectionQuestion[];
  terms?: RegulationTerm[];
  sourceStatus?: RegulationSourceStatus;
  narrativeChapters?: RegulationNarrativeChapter[];
};
