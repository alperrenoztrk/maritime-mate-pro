/**
 * Regulation Matrix — Mariner's Mate
 * --------------------------------------
 * Canonical mapping between in-app curriculum modules and the
 * currently in-force international maritime regulations.
 *
 * Sources:
 *  - IMO SOLAS Consolidated Edition 2020 + 2022/2024 amendments (MSC.496(105), MSC.521(106))
 *  - IMO MARPOL Consolidated Edition 2022 + Annex VI 2020 sulphur cap, MEPC.328(76), MEPC.336(76), MEPC.377(80)
 *  - IMO COLREG 1972 (consolidated)
 *  - STCW 1978 as amended (Manila 2010 + 2023 EDH amendments)
 *  - MLC 2006 (2014/2016/2018/2022 amendments)
 *  - Load Lines 1966 / Protocol 1988
 *  - IS Code 2008 (Resolution MSC.267(85)) — Intact Stability
 *  - IAMSAR Manual 2022 edition
 *  - IMDG Code (Amdt 41-22), IBC Code, IGC Code
 *  - ISM Code (Resolution A.741(18) as amended)
 *  - ISPS Code (SOLAS XI-2)
 *  - BWM Convention 2004 (entered into force 2017)
 *  - Hong Kong Convention (entered into force 26 June 2025)
 *
 * Use this matrix as the single source of truth when validating
 * curriculum, quiz answers, formulas and rule listings.
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
  /** Plain language summary of the requirement */
  summary: string;
  /** Latest in-force amendment relevant to this rule */
  inForce: string;
  /** Optional canonical numeric/quantitative value enforced by the rule */
  value?: string;
}

export interface CurriculumComplianceEntry {
  /** Curriculum topic slug or quiz topic id */
  topic: string;
  /** Module the topic belongs to */
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
  /** Authoritative regulation references for this topic */
  refs: RegulationRef[];
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  CANONICAL VALUES — quoted directly by quiz/explanations and formulas   */
/* ──────────────────────────────────────────────────────────────────────── */

export const CANONICAL_VALUES = {
  // MARPOL Annex VI (in force 2020-01-01 / ECA 2015-01-01)
  SULPHUR_GLOBAL_CAP_PCT: 0.5,
  SULPHUR_ECA_CAP_PCT: 0.1,
  // MARPOL Annex I — Reg. 14 / 15
  OWS_DISCHARGE_LIMIT_PPM: 15,
  ODMCS_OIL_LIMIT_PPM: 15,
  // MARPOL Annex IV — Reg. 11
  SEWAGE_BOD_LIMIT_MG_L: 25,
  // SOLAS II-2 / Reg. 10 — fixed CO2 systems for machinery spaces
  CO2_DENSITY_FACTOR_KG_M3: 0.56, // 40% net volume design factor
  // STCW A-VIII/1 (Manila 2010)
  REST_HOURS_PER_24H: 10,
  REST_HOURS_PER_7D: 77,
  // MLC 2006 — Reg. 2.3 (alternative)
  WORK_HOURS_PER_24H_MAX: 14,
  WORK_HOURS_PER_7D_MAX: 72,
  // IS Code 2008 — General criteria (A.749(18) as amended)
  GM_MIN_M: 0.15,
  GZ_AT_30DEG_MIN_M: 0.20,
  GZ_MAX_ANGLE_MIN_DEG: 25,
  AREA_0_TO_30_MIN_M_RAD: 0.055,
  AREA_0_TO_40_MIN_M_RAD: 0.090,
  AREA_30_TO_40_MIN_M_RAD: 0.030,
  // SOLAS V/19 — carriage requirements (BNWAS, ECDIS phase-in completed 2018)
  // SOLAS III — drills
  ABANDON_SHIP_DRILL_INTERVAL_DAYS: 30, // monthly + within 24h of >25% crew change
  FIRE_DRILL_INTERVAL_DAYS: 30,
  // EEDI / EEXI / CII (MEPC.328(76), MEPC.336(76))
  CARBON_FACTOR_HFO: 3.114,
  CARBON_FACTOR_MDO: 3.206,
  CARBON_FACTOR_LNG: 2.750,
} as const;

/* ──────────────────────────────────────────────────────────────────────── */
/*  REGULATION REFERENCE LIBRARY                                           */
/* ──────────────────────────────────────────────────────────────────────── */

export const REGULATION_REFS: Record<string, RegulationRef> = {
  // ── COLREG ────────────────────────────────────────────────────────────
  "COLREG/5": {
    citation: "COLREG Rule 5",
    source: "COLREG",
    summary: "Proper look-out by sight, hearing and all available means at all times.",
    inForce: "1972 (consolidated 2003)",
  },
  "COLREG/6": {
    citation: "COLREG Rule 6",
    source: "COLREG",
    summary: "Safe speed considering visibility, traffic, manoeuvrability and radar limitations.",
    inForce: "1972 (consolidated 2003)",
  },
  "COLREG/7": {
    citation: "COLREG Rule 7",
    source: "COLREG",
    summary: "Risk of collision must be determined; assume risk if in doubt.",
    inForce: "1972",
  },
  "COLREG/13-18": {
    citation: "COLREG Rules 13–18",
    source: "COLREG",
    summary: "Conduct in sight of one another: overtaking, head-on, crossing, give-way, stand-on, responsibilities between vessels.",
    inForce: "1972",
  },
  "COLREG/19": {
    citation: "COLREG Rule 19",
    source: "COLREG",
    summary: "Conduct of vessels in restricted visibility — safe speed, early action, avoidance to port to be avoided for vessel forward of the beam.",
    inForce: "1972",
  },

  // ── SOLAS ─────────────────────────────────────────────────────────────
  "SOLAS/II-1": {
    citation: "SOLAS II-1",
    source: "SOLAS",
    summary: "Construction — subdivision and stability, machinery and electrical installations.",
    inForce: "2020 amendments (damage stability) — MSC.421(98)",
  },
  "SOLAS/II-2/10": {
    citation: "SOLAS II-2 Reg. 10",
    source: "SOLAS",
    summary: "Fire fighting — fixed gas (CO₂) and foam systems for machinery spaces.",
    inForce: "Consolidated 2020",
    value: "CO₂ design: 40% gross volume of largest machinery space; mass = V × 0.56 kg/m³",
  },
  "SOLAS/III/19": {
    citation: "SOLAS III Reg. 19",
    source: "SOLAS",
    summary: "Emergency training and drills — abandon-ship and fire drills monthly; within 24h if >25% crew changed.",
    inForce: "Consolidated 2020",
  },
  "SOLAS/V/19": {
    citation: "SOLAS V Reg. 19",
    source: "SOLAS",
    summary: "Carriage requirements for shipborne navigational systems and equipment (radar, ECDIS, AIS, BNWAS, gyro, magnetic compass).",
    inForce: "Consolidated 2020 (ECDIS phase-in completed 2018)",
  },
  "SOLAS/V/22": {
    citation: "SOLAS V Reg. 22",
    source: "SOLAS",
    summary: "Navigation bridge visibility requirements.",
    inForce: "Consolidated 2020",
  },
  "SOLAS/XI-2": {
    citation: "SOLAS XI-2 / ISPS",
    source: "ISPS",
    summary: "Special measures to enhance maritime security — ISPS Code Parts A & B.",
    inForce: "2004",
  },

  // ── MARPOL ────────────────────────────────────────────────────────────
  "MARPOL/I/15": {
    citation: "MARPOL Annex I Reg. 15",
    source: "MARPOL",
    summary: "Control of oil discharge — 15 ppm bilge separator and ODMCS for tankers.",
    inForce: "Consolidated 2022",
    value: "≤ 15 ppm",
  },
  "MARPOL/IV/11": {
    citation: "MARPOL Annex IV Reg. 11",
    source: "MARPOL",
    summary: "Sewage discharge standards from approved treatment plant.",
    inForce: "Consolidated 2022",
    value: "BOD₅ ≤ 25 mg/L; TSS ≤ 35 mg/L",
  },
  "MARPOL/V": {
    citation: "MARPOL Annex V",
    source: "MARPOL",
    summary: "Garbage management — discharge prohibitions, garbage record book, MARPOL placards.",
    inForce: "2018 amendments (HME cargo residues)",
  },
  "MARPOL/VI/14": {
    citation: "MARPOL Annex VI Reg. 14",
    source: "MARPOL",
    summary: "Fuel oil sulphur content — global cap and ECA cap.",
    inForce: "Global 0.50% m/m from 2020-01-01; ECA 0.10% m/m from 2015-01-01",
    value: "Global ≤ 0.50%; ECA ≤ 0.10%",
  },
  "MARPOL/VI/13": {
    citation: "MARPOL Annex VI Reg. 13",
    source: "MARPOL",
    summary: "NOx emission control — Tier I/II/III based on engine RPM and keel-laid date / NECA.",
    inForce: "Tier III in NECAs from 2016/2021",
  },
  "MEPC/EEXI": {
    citation: "MEPC.328(76) — EEXI",
    source: "MEPC",
    summary: "Energy Efficiency Existing Ship Index — mandatory for existing ships ≥ 400 GT from first survey on/after 2023-01-01.",
    inForce: "2023-01-01",
  },
  "MEPC/CII": {
    citation: "MEPC.336(76) — CII",
    source: "MEPC",
    summary: "Carbon Intensity Indicator — annual operational rating A–E for ships ≥ 5 000 GT.",
    inForce: "2023-01-01 (first ratings 2024)",
  },
  "MEPC/SEEMP": {
    citation: "MEPC.346(78) — SEEMP Part III",
    source: "MEPC",
    summary: "Ship Energy Efficiency Management Plan Part III — implementation plan to achieve required CII.",
    inForce: "2023-01-01",
  },

  // ── STCW / MLC ────────────────────────────────────────────────────────
  "STCW/A-VIII/1": {
    citation: "STCW A-VIII/1 (Manila 2010)",
    source: "STCW",
    summary: "Fitness for duty — minimum hours of rest.",
    inForce: "Manila 2010 amendments",
    value: "≥ 10 h in any 24 h; ≥ 77 h in any 7-day period",
  },
  "MLC/2.3": {
    citation: "MLC 2006 Reg. 2.3",
    source: "MLC",
    summary: "Hours of work or hours of rest — alternative limits.",
    inForce: "2006 (2014/2016/2018/2022 amendments)",
  },

  // ── IS Code / Load Lines ──────────────────────────────────────────────
  "IS_CODE/2008/A": {
    citation: "IS Code 2008 Part A",
    source: "IS_CODE",
    summary: "Mandatory intact stability criteria — GM, GZ, areas under GZ curve.",
    inForce: "MSC.267(85), 2010-07-01",
    value: "GM₀ ≥ 0.15 m; GZ@30° ≥ 0.20 m; angle of GZmax ≥ 25°",
  },
  "IS_CODE/2008/WEATHER": {
    citation: "IS Code 2008 Part A § 2.3",
    source: "IS_CODE",
    summary: "Severe wind and rolling criterion (weather criterion).",
    inForce: "MSC.267(85)",
  },
  "LL/1988": {
    citation: "Load Lines Protocol 1988",
    source: "LOAD_LINES",
    summary: "Freeboard assignment, seasonal zones, load line marks (TF, F, T, S, W, WNA).",
    inForce: "2005 amendments",
  },

  // ── IAMSAR / Cargo codes ──────────────────────────────────────────────
  "IAMSAR/III": {
    citation: "IAMSAR Manual Vol. III",
    source: "IAMSAR",
    summary: "Mobile facilities — SAR procedures for ships and aircraft.",
    inForce: "2022 edition",
  },
  "IMDG": {
    citation: "IMDG Code Amdt 41-22",
    source: "IMDG",
    summary: "Carriage of dangerous goods in packaged form.",
    inForce: "Mandatory 2024-01-01",
  },
  "IBC": {
    citation: "IBC Code",
    source: "IBC",
    summary: "Construction & equipment of ships carrying dangerous chemicals in bulk.",
    inForce: "2020 amendments — MEPC.318(74)",
  },
  "IGC": {
    citation: "IGC Code",
    source: "IGC",
    summary: "Construction & equipment of ships carrying liquefied gases in bulk.",
    inForce: "2016 edition (MSC.370(93))",
  },

  // ── ISM / BWM / HKC ───────────────────────────────────────────────────
  "ISM": {
    citation: "ISM Code",
    source: "ISM",
    summary: "Safety management system — DOC, SMC, designated person ashore.",
    inForce: "Consolidated 2018",
  },
  "BWM": {
    citation: "BWM Convention",
    source: "BWM",
    summary: "Ballast water management — D-1 exchange, D-2 performance standard.",
    inForce: "2017-09-08; D-2 full compliance from 2024-09-08",
  },
  "HKC": {
    citation: "Hong Kong Convention",
    source: "HKC",
    summary: "Safe and environmentally sound recycling of ships — IHM mandatory.",
    inForce: "2025-06-26",
  },
};

/* ──────────────────────────────────────────────────────────────────────── */
/*  TOPIC → REGULATION MAP                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

export const CURRICULUM_COMPLIANCE: CurriculumComplianceEntry[] = [
  // Navigation
  { topic: "colreg", module: "navigation", refs: [REGULATION_REFS["COLREG/5"], REGULATION_REFS["COLREG/6"], REGULATION_REFS["COLREG/7"], REGULATION_REFS["COLREG/13-18"], REGULATION_REFS["COLREG/19"]] },
  { topic: "bridge-equipment", module: "navigation", refs: [REGULATION_REFS["SOLAS/V/19"], REGULATION_REFS["SOLAS/V/22"]] },
  { topic: "watchkeeping", module: "navigation", refs: [REGULATION_REFS["STCW/A-VIII/1"], REGULATION_REFS["COLREG/5"]] },

  // Seamanship
  { topic: "anchoring", module: "seamanship", refs: [REGULATION_REFS["SOLAS/V/19"]] },
  { topic: "mooring", module: "seamanship", refs: [REGULATION_REFS["SOLAS/II-1"]] },

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
