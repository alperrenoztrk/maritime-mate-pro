import { courseHref } from "./learningGuide";

/**
 * Editorial reading paths aligned to broad STCW Code competence areas.
 * Not a complete transcription, accredited syllabus or competency assessment.
 */
export interface StcwStudyStep {
  id: string;
  focus: string;
  courseKey: string;
  reason: string;
}

export interface StcwStudyPath {
  id: "deck-oow" | "engine-oew";
  title: string;
  standard: string;
  audience: string;
  steps: StcwStudyStep[];
}

export const STCW_STUDY_PATHS: readonly StcwStudyPath[] = [
  {
    id: "deck-oow",
    title: "Deck officer of the watch",
    standard: "STCW Code Table A-II/1",
    audience: "Support reading for operational-level deck watchkeeping.",
    steps: [
      { id: "seamanship", focus: "Shipboard seamanship", courseKey: "seamanship", reason: "Start with deck equipment, safe working practices and basic ship handling." },
      { id: "navigation", focus: "Plan and conduct a passage", courseKey: "navigation", reason: "Study chartwork, position fixing, voyage planning and ECDIS limitations." },
      { id: "meteorology", focus: "Understand the marine environment", courseKey: "meteorology", reason: "Interpret forecasts and observations when assessing a passage." },
      { id: "communication", focus: "Maintain safe communications", courseKey: "communication", reason: "Connect GMDSS procedures to routine and distress communication." },
      { id: "stability", focus: "Stability and loading fundamentals", courseKey: "stability", reason: "Understand displacement, GM, free surface and ship-specific limits." },
      { id: "cargo", focus: "Cargo handling awareness", courseKey: "cargo", reason: "Review cargo care, securing and safe loading principles." },
      { id: "safety", focus: "Emergency response and pollution prevention", courseKey: "safety", reason: "Link emergency duties, survival equipment and safe watchkeeping." }
    ]
  },
  {
    id: "engine-oew",
    title: "Engineer officer of the watch",
    standard: "STCW Code Table A-III/1",
    audience: "Support reading for operational-level engine-room watchkeeping.",
    steps: [
      { id: "engine-room-ops", focus: "Safe engineering watch", courseKey: "machine-engine-room-ops", reason: "Understand handovers, operating checks and watchkeeping communication." },
      { id: "diesel", focus: "Main propulsion machinery", courseKey: "machine-diesel-engines", reason: "Learn combustion, lubrication, cooling and engine operating principles." },
      { id: "auxiliary", focus: "Auxiliary machinery", courseKey: "machine-auxiliary", reason: "Follow pumps, purifiers, compressed air, steam and other supporting services." },
      { id: "electrical", focus: "Electrical systems", courseKey: "machine-electrical", reason: "Understand generation, distribution, protective devices and safe isolation." },
      { id: "automation", focus: "Monitoring and control", courseKey: "machine-automation", reason: "Distinguish measurements, alarms, automatic control and their limitations." },
      { id: "maintenance", focus: "Maintenance and repair", courseKey: "machine-maintenance", reason: "Review work preparation, fault-finding and safe verification." },
      { id: "safety", focus: "Engine-room safety", courseKey: "machine-engine-room-safety", reason: "Learn permit-to-work, hazardous energy and emergency response." },
      { id: "environment", focus: "Pollution prevention", courseKey: "machine-environment-machine", reason: "Connect bilge, waste and emissions control to records and procedures." }
    ]
  }
];

export const stcwStudyHref = (courseKey: string) => courseHref(courseKey);
