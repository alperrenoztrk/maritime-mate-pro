/**
 * Regulation Matrix — Mariner's Book
 * ----------------------------------
 * Curated mapping between in-app curriculum modules and international maritime
 * instruments. This file is an application reference baseline, NOT a legal
 * "single source of truth" and must not override the current official text,
 * flag/Administration requirements, class rules, company SMS or vessel-specific
 * approved documentation.
 *
 * Publication/reference baseline reviewed: 30 August 2026
 *  - SOLAS: 2024 consolidated edition; verify later amendments/supplements and
 *    construction-date applicability against current official IMO text
 *  - MARPOL: current consolidated/amended text; Annex-specific applicability
 *  - COLREG: Convention as amended; IMO 2026 publication available
 *  - STCW: Convention/Code as amended; verify current edition/amendments
 *  - MLC 2006 as amended
 *  - Load Lines 1966 / 1988 Protocol as amended
 *  - 2008 IS Code (MSC.267(85)) as amended
 *  - IAMSAR Manual 2025 edition; 2025 amendments applicable 1 January 2026
 *  - IMDG Code 2024 edition, Amendment 42-24; mandatory from 1 January 2026
 *  - IBC Code / IGC Code as amended
 *  - ISM Code / ISPS Code as amended
 *  - BWM Convention 2004 as amended
 *  - Hong Kong Convention; entered into force 26 June 2025
 *
 * Governance rule: every safety-critical numeric value must retain its exact
 * applicability and source context. A value that is correct for one ship/system
 * must not be promoted as a universal operational limit.
 */

export type RegulationSource =
  | "SOLAS"
  | "MARPOL"
  | "COLREG"
  | "STCW"
  | "MLC"
  | "LOAD_LINES"
  | "IS_CODE"
  | "IAMSAR"
  | "IMDG"
  | "IBC"
  | "IGC"
  | "ISM"
  | "ISPS"
  | "BWM"
  | "HKC"
  | "MEPC"
  | "MSC"
  | "ILO";

export interface RegulationRef {
  /** Short citation shown in the UI, e.g. "SOLAS V/19" */
  citation: string;
  /** Source body / convention */
  source: RegulationSource;
  /** Plain-language summary. The official instrument remains authoritative. */
  summary: string;
  /** Edition/effective-date context relevant to this app reference. */
  inForce: string;
  /** Optional quantitative value, only when applicability can be stated safely. */
  value?: string;
}

export interface CurriculumComplianceEntry {
  topic: string;
  module:
    | "navigation"
    | "seamanship"
    | "stability"
    | "safety"
    | "communication"
    | "cargo"
    | "meteorology"
    | "machine"
    | "regulations";
  refs: RegulationRef[];
}

/* ──────────────────────────────────────────────────────────────────────── */
/* REFERENCE CONSTANTS                                                     */
/* These are NOT universal pass/fail criteria unless applicability is known. */
/* ──────────────────────────────────────────────────────────────────────── */

export const CANONICAL_VALUES = {
  // MARPOL Annex VI Reg. 14 — subject to fuel/equivalent-compliance provisions.
  SULPHUR_GLOBAL_CAP_PCT: 0.5,
  SULPHUR_ECA_CAP_PCT: 0.1,

  // MARPOL Annex I Reg. 15 — machinery-space oily mixtures where applicable.
  OWS_DISCHARGE_LIMIT_PPM: 15,

  // FSS Code Chapter 5 uses 0.56 m³/kg when calculating free CO₂ volume.
  CO2_FREE_GAS_SPECIFIC_VOLUME_M3_KG: 0.56,
  // Backward-compatible reciprocal for older code paths. The previous comment
  // incorrectly described 0.56 as kg/m³.
  CO2_DENSITY_FACTOR_KG_M3: 1 / 0.56,

  // STCW Code A-VIII/1 — ordinary minimum rest requirements, subject to the
  // complete section including division of rest and permitted exceptions.
  REST_HOURS_PER_24H: 10,
  REST_HOURS_PER_7D: 77,

  // MLC 2006 Standard A2.3 work-hour maximum option, where that option applies.
  WORK_HOURS_PER_24H_MAX: 14,
  WORK_HOURS_PER_7D_MAX: 72,

  // 2008 IS Code general intact-stability criteria where applicable.
  GM_MIN_M: 0.15,
  GZ_AT_30DEG_MIN_M: 0.20,
  GZ_MAX_ANGLE_MIN_DEG: 25,
  AREA_0_TO_30_MIN_M_RAD: 0.055,
  AREA_0_TO_40_MIN_M_RAD: 0.090,
  AREA_30_TO_40_MIN_M_RAD: 0.030,

  // Carbon conversion factors used by applicable IMO GHG calculation methods.
  CARBON_FACTOR_HFO: 3.114,
  CARBON_FACTOR_MDO: 3.206,
  CARBON_FACTOR_LNG: 2.75,
} as const;

/* ──────────────────────────────────────────────────────────────────────── */
/* REGULATION REFERENCE LIBRARY                                            */
/* ──────────────────────────────────────────────────────────────────────── */

export const REGULATION_REFS: Record<string, RegulationRef> = {
  // ── COLREG ────────────────────────────────────────────────────────────
  "COLREG/5": {
    citation: "COLREG Rule 5",
    source: "COLREG",
    summary: "Maintain a proper look-out by sight and hearing as well as by all available means appropriate to the prevailing circumstances and conditions.",
    inForce: "COLREG 1972 as amended; current IMO 2026 publication available",
  },
  "COLREG/6": {
    citation: "COLREG Rule 6",
    source: "COLREG",
    summary: "Proceed at a safe speed determined from all factors required by Rule 6; no single numeric speed is universally safe.",
    inForce: "COLREG 1972 as amended; current IMO 2026 publication available",
  },
  "COLREG/7": {
    citation: "COLREG Rule 7",
    source: "COLREG",
    summary: "Use all available means appropriate to determine risk of collision; if there is any doubt, risk is deemed to exist.",
    inForce: "COLREG 1972 as amended",
  },
  "COLREG/13-18": {
    citation: "COLREG Rules 13–18",
    source: "COLREG",
    summary: "Conduct of vessels in sight of one another, including overtaking, head-on, crossing, give-way/stand-on actions and responsibilities between vessels; apply the complete rules and interactions with Rules 9, 10 and 13.",
    inForce: "COLREG 1972 as amended",
  },
  "COLREG/19": {
    citation: "COLREG Rule 19",
    source: "COLREG",
    summary: "Conduct of vessels not in sight of one another when navigating in or near restricted visibility; includes safe speed, engines ready and radar-contact avoiding-action provisions.",
    inForce: "COLREG 1972 as amended",
  },

  // ── SOLAS ─────────────────────────────────────────────────────────────
  "SOLAS/II-1": {
    citation: "SOLAS Chapter II-1",
    source: "SOLAS",
    summary: "Construction — subdivision and stability, machinery and electrical installations. Exact requirements depend on ship type, size and construction/conversion date.",
    inForce: "SOLAS 2024 consolidated edition baseline; verify subsequent in-force amendments",
  },
  "SOLAS/II-2/10": {
    citation: "SOLAS II-2 Reg. 10 / FSS Code Ch. 5",
    source: "SOLAS",
    summary: "Fire-fighting arrangements and fixed gas systems. Machinery-space CO₂ quantity is determined by the applicable FSS Code volume method and approved system design, not by one universal percentage input.",
    inForce: "SOLAS 2024 consolidated edition / FSS Code as amended",
    value: "FSS Code CO₂ free-gas conversion uses 0.56 m³/kg; apply the complete applicable protected-volume criteria",
  },
  "SOLAS/III/19": {
    citation: "SOLAS III Reg. 19",
    source: "SOLAS",
    summary: "Emergency training and drills. Crew participation is prescribed on a monthly basis with additional requirements following significant crew changes; treat 'monthly' as the regulation's calendar requirement, not a generic 30-day timer.",
    inForce: "SOLAS 2024 consolidated edition baseline; verify ship-specific applicability/amendments",
  },
  "SOLAS/V/19": {
    citation: "SOLAS V Reg. 19",
    source: "SOLAS",
    summary: "Carriage requirements for shipborne navigational systems and equipment. Applicability depends on ship type, size and construction date.",
    inForce: "SOLAS 2024 consolidated edition baseline",
  },
  "SOLAS/V/22": {
    citation: "SOLAS V Reg. 22",
    source: "SOLAS",
    summary: "Navigation-bridge visibility requirements subject to ship/construction-date applicability.",
    inForce: "SOLAS 2024 consolidated edition baseline",
  },
  "SOLAS/XI-2": {
    citation: "SOLAS XI-2 / ISPS Code",
    source: "ISPS",
    summary: "Special measures to enhance maritime security and mandatory ISPS Code Part A requirements, supported by Part B guidance as applicable.",
    inForce: "SOLAS XI-2 / ISPS Code as amended",
  },

  // ── MARPOL ────────────────────────────────────────────────────────────
  "MARPOL/I/15": {
    citation: "MARPOL Annex I Reg. 15",
    source: "MARPOL",
    summary: "Control of discharge of oil from machinery-space bilges, including the 15 ppm condition where the regulation applies. Do not conflate this with tanker cargo-area ODME/ODMCS discharge criteria.",
    inForce: "MARPOL Annex I as amended",
    value: "Machinery-space oily mixture: oil content without dilution ≤ 15 ppm where Reg. 15 discharge conditions apply",
  },
  "MARPOL/IV/11": {
    citation: "MARPOL Annex IV Reg. 11",
    source: "MARPOL",
    summary: "Controls discharge of sewage. Treatment-plant effluent performance standards come from the applicable approved sewage-treatment-plant standard/certification, not from a universal BOD/TSS value stated directly by Reg. 11.",
    inForce: "MARPOL Annex IV as amended",
  },
  "MARPOL/V": {
    citation: "MARPOL Annex V",
    source: "MARPOL",
    summary: "Prevention of pollution by garbage from ships, including discharge prohibitions/restrictions, management plans, placards and record requirements where applicable.",
    inForce: "MARPOL Annex V as amended",
  },
  "MARPOL/VI/14": {
    citation: "MARPOL Annex VI Reg. 14",
    source: "MARPOL",
    summary: "Controls sulphur oxides and particulate matter, including fuel-oil sulphur limits and permitted equivalent compliance methods.",
    inForce: "Global 0.50% m/m from 1 Jan 2020; ECA 0.10% m/m where applicable",
    value: "Global ≤ 0.50% m/m; ECA ≤ 0.10% m/m, subject to the complete regulation/equivalent-compliance provisions",
  },
  "MARPOL/VI/13": {
    citation: "MARPOL Annex VI Reg. 13",
    source: "MARPOL",
    summary: "NOx requirements for applicable marine diesel engines; Tier depends on ship construction date, engine characteristics and operation in designated NECAs.",
    inForce: "MARPOL Annex VI as amended",
  },
  "MEPC/EEXI": {
    citation: "MARPOL Annex VI Reg. 23 / EEXI framework",
    source: "MEPC",
    summary: "Attained/required EEXI requirements for ships within the regulation's applicability; verify amendments, ship type and survey timing.",
    inForce: "Requirements effective from 2023; verify current MARPOL Annex VI text/guidelines",
  },
  "MEPC/CII": {
    citation: "MARPOL Annex VI Regs. 26–28 / CII framework",
    source: "MEPC",
    summary: "Operational carbon-intensity requirements and annual rating for ships within the CII applicability threshold and ship-type scope.",
    inForce: "Requirements effective from 2023; verify current reduction factors/guidelines",
  },
  "MEPC/SEEMP": {
    citation: "MARPOL Annex VI Reg. 26 / SEEMP",
    source: "MEPC",
    summary: "Ship Energy Efficiency Management Plan requirements, including additional elements for ships within CII applicability.",
    inForce: "Current MARPOL Annex VI / associated MEPC guidelines",
  },

  // ── STCW / MLC ────────────────────────────────────────────────────────
  "STCW/A-VIII/1": {
    citation: "STCW Code A-VIII/1",
    source: "STCW",
    summary: "Fitness for duty and prevention of fatigue, including minimum rest requirements and rules for how rest may be divided/excepted.",
    inForce: "STCW Convention/Code as amended; Manila framework remains fundamental",
    value: "Ordinary minimum: ≥ 10 h rest in any 24 h and ≥ 77 h in any 7-day period; apply the complete section and permitted exceptions",
  },
  "MLC/2.3": {
    citation: "MLC 2006 Reg. 2.3 / Standard A2.3",
    source: "MLC",
    summary: "Hours of work or rest, including records and national implementation. Do not mix the work-hour and rest-hour alternatives when testing compliance.",
    inForce: "MLC 2006 as amended",
  },

  // ── IS Code / Load Lines ──────────────────────────────────────────────
  "IS_CODE/2008/A": {
    citation: "2008 IS Code Part A",
    source: "IS_CODE",
    summary: "Mandatory intact-stability criteria for ships within scope. General GM/GZ/area values must be applied together with all applicable criteria and approved stability information.",
    inForce: "MSC.267(85) as amended",
    value: "General criteria include GM₀ ≥ 0.15 m; GZ ≥ 0.20 m at heel ≥30°; max-GZ angle preferably >30° but not <25°; prescribed GZ areas also apply",
  },
  "IS_CODE/2008/WEATHER": {
    citation: "2008 IS Code Part A §2.3",
    source: "IS_CODE",
    summary: "Severe wind and rolling criterion using the complete steady-wind, roll and gust heeling/GZ area method; no one-value shortcut proves compliance.",
    inForce: "MSC.267(85) as amended",
  },
  "LL/1988": {
    citation: "International Convention on Load Lines, 1966 / 1988 Protocol",
    source: "LOAD_LINES",
    summary: "Freeboard assignment, load-line marks, conditions of assignment, zones/areas and related integrity requirements.",
    inForce: "Load Lines Convention/Protocol as amended; verify current applicable text",
  },

  // ── IAMSAR / Cargo codes ──────────────────────────────────────────────
  "IAMSAR/III": {
    citation: "IAMSAR Manual Vol. III, 2025 Edition",
    source: "IAMSAR",
    summary: "Mobile facilities — practical SAR guidance for vessels, aircraft and rescue units, including own emergencies and on-scene functions.",
    inForce: "2025 edition; amendments applicable from 1 Jan 2026",
  },
  "IMDG": {
    citation: "IMDG Code 2024 Edition (Amdt 42-24)",
    source: "IMDG",
    summary: "International Maritime Dangerous Goods Code for dangerous goods in packaged form, including classification, packing, marking/labelling, documentation, stowage and segregation requirements.",
    inForce: "Amendment 42-24 mandatory from 1 Jan 2026; previous 2022 edition obsolete",
  },
  "IBC": {
    citation: "IBC Code",
    source: "IBC",
    summary: "Construction and equipment requirements for ships carrying dangerous chemicals in bulk; product-specific requirements and current amendments govern.",
    inForce: "IBC Code as amended; current IMO 2020 publication baseline",
  },
  "IGC": {
    citation: "IGC Code",
    source: "IGC",
    summary: "Construction and equipment requirements for ships carrying liquefied gases in bulk; exact edition/applicability depends on ship construction date and amendments.",
    inForce: "IGC Code as amended; verify current official text and applicable edition",
  },

  // ── ISM / BWM / HKC ──────────────────────────────────────────────────
  "ISM": {
    citation: "ISM Code",
    source: "ISM",
    summary: "International Safety Management framework for safe operation and pollution prevention. Risk controls and matrices are implemented through the company's SMS; the Code does not prescribe one universal numeric risk matrix.",
    inForce: "ISM Code as amended",
  },
  "BWM": {
    citation: "BWM Convention",
    source: "BWM",
    summary: "Ballast-water management requirements including plans, records, surveys/certification and applicable D-1/D-2 standards.",
    inForce: "Entered into force 8 Sep 2017; current Convention/amendments govern",
  },
  "HKC": {
    citation: "Hong Kong Convention",
    source: "HKC",
    summary: "Safe and environmentally sound recycling of ships, including Inventory of Hazardous Materials requirements within the Convention's applicability.",
    inForce: "Entered into force 26 Jun 2025",
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/* TOPIC → REGULATION MAP                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

export const CURRICULUM_COMPLIANCE: CurriculumComplianceEntry[] = [
  // Navigation
  { topic: "colreg", module: "navigation", refs: [REGULATION_REFS["COLREG/5"], REGULATION_REFS["COLREG/6"], REGULATION_REFS["COLREG/7"], REGULATION_REFS["COLREG/13-18"], REGULATION_REFS["COLREG/19"]] },
  { topic: "bridge-equipment", module: "navigation", refs: [REGULATION_REFS["SOLAS/V/19"], REGULATION_REFS["SOLAS/V/22"]] },
  { topic: "watchkeeping", module: "navigation", refs: [REGULATION_REFS["STCW/A-VIII/1"], REGULATION_REFS["COLREG/5"]] },

  // Seamanship
  { topic: "anchoring", module: "seamanship", refs: [REGULATION_REFS["SOLAS/V/19"]] },
  { topic: "mooring", module: "seamanship", refs: [REGULATION_REFS["SOLAS/II-1"], REGULATION_REFS["ISM"]] },

  // Stability
  { topic: "intact-stability", module: "stability", refs: [REGULATION_REFS["IS_CODE/2008/A"], REGULATION_REFS["IS_CODE/2008/WEATHER"]] },
  { topic: "damage-stability", module: "stability", refs: [REGULATION_REFS["SOLAS/II-1"]] },
  { topic: "load-lines", module: "stability", refs: [REGULATION_REFS["LL/1988"]] },

  // Safety
  { topic: "fire-fighting", module: "safety", refs: [REGULATION_REFS["SOLAS/II-2/10"]] },
  { topic: "drills", module: "safety", refs: [REGULATION_REFS["SOLAS/III/19"]] },
  { topic: "sar", module: "safety", refs: [REGULATION_REFS["IAMSAR/III"]] },
  { topic: "security", module: "safety", refs: [REGULATION_REFS["SOLAS/XI-2"]] },

  // Cargo
  { topic: "dangerous-goods", module: "cargo", refs: [REGULATION_REFS["IMDG"]] },
  { topic: "chemical-tanker", module: "cargo", refs: [REGULATION_REFS["IBC"]] },
  { topic: "gas-tanker", module: "cargo", refs: [REGULATION_REFS["IGC"]] },

  // Machine
  { topic: "fuel-technology", module: "machine", refs: [REGULATION_REFS["MARPOL/VI/14"]] },
  { topic: "diesel-engines", module: "machine", refs: [REGULATION_REFS["MARPOL/VI/13"]] },
  { topic: "environment-machine", module: "machine", refs: [REGULATION_REFS["MARPOL/I/15"], REGULATION_REFS["MARPOL/IV/11"], REGULATION_REFS["MARPOL/V"]] },
  { topic: "engine-room-safety", module: "machine", refs: [REGULATION_REFS["SOLAS/II-2/10"]] },
  { topic: "energy-efficiency", module: "machine", refs: [REGULATION_REFS["MEPC/EEXI"], REGULATION_REFS["MEPC/CII"], REGULATION_REFS["MEPC/SEEMP"]] },
  { topic: "engine-room-ops", module: "machine", refs: [REGULATION_REFS["STCW/A-VIII/1"], REGULATION_REFS["ISM"]] },
];

export function getComplianceForTopic(topic: string): RegulationRef[] {
  return CURRICULUM_COMPLIANCE.find((c) => c.topic === topic)?.refs ?? [];
}

export function citationsForTopic(topic: string): string[] {
  return getComplianceForTopic(topic).map((r) => r.citation);
}
