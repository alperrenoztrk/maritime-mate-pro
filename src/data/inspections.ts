import type { ChecklistCategory } from "@/utils/pscChecklist";

export interface InspectionType {
  id: string;
  title: string;
  /** Who carries out the inspection / which ships it applies to. */
  scope: string;
  storageKey: string;
  categories: ChecklistCategory[];
}

const c = (id: string, title: string, items: [string, string, string][]): ChecklistCategory => ({
  id,
  title,
  items: items.map(([iid, t, ref]) => ({ id: iid, title: t, ref })),
});

/** Preparation checklists. Items are original preparation points, not official forms. */
export const INSPECTIONS: InspectionType[] = [
  {
    id: "psc",
    title: "Port State Control",
    scope: "Paris / Tokyo MoU inspection areas",
    storageKey: "beta-psc-checklist-v1",
    categories: [
      c("certificates", "Certificates and Documents", [
        ["cert-class", "Class certificate and survey status up to date", "SOLAS / Class"],
        ["cert-safety-construction", "Cargo Ship Safety Construction Certificate valid", "SOLAS I/12"],
        ["cert-safety-equipment", "Cargo Ship Safety Equipment Certificate with Form E", "SOLAS I/12"],
        ["cert-safety-radio", "Cargo Ship Safety Radio Certificate valid", "SOLAS I/12"],
        ["cert-load-line", "International Load Line Certificate valid", "ILLC 1966"],
        ["cert-iopp", "IOPP Certificate and Supplement up to date", "MARPOL Annex I"],
        ["cert-doc-smc", "Copy of DOC and valid SMC on board", "ISM Code"],
        ["cert-issc", "ISSC valid", "ISPS Code"],
        ["cert-mlc", "Maritime Labour Certificate with DMLC Part I and II", "MLC 2006"],
        ["cert-minimum-manning", "Minimum Safe Manning Document on board and complied with", "SOLAS V/14"],
      ]),
      c("lsa", "Life-Saving Appliances", [
        ["lsa-lifeboat", "Lifeboats and davits operational, service dates valid", "SOLAS III/20"],
        ["lsa-release-gear", "Lifeboat release gear maintained and marked", "MSC.1/Circ.1392"],
        ["lsa-liferaft", "Liferaft service dates valid, HRU fitted", "SOLAS III/20"],
        ["lsa-lifejacket", "Sufficient lifejackets, lights and whistles working", "SOLAS III/7"],
        ["lsa-immersion", "Immersion suits available and in good condition", "SOLAS III/32"],
        ["lsa-epirb", "EPIRB battery and HRU dates valid, test recorded", "SOLAS IV/7"],
        ["lsa-pyrotechnics", "Pyrotechnics within expiry date", "SOLAS III/35"],
      ]),
      c("fire", "Fire Safety", [
        ["fire-extinguishers", "Portable fire extinguishers charged and serviced", "SOLAS II-2/10"],
        ["fire-fixed-system", "Fixed fire-extinguishing system (CO2/foam) pressure and test records", "SOLAS II-2/10"],
        ["fire-dampers", "Fire dampers and ventilation shut-offs operational", "SOLAS II-2/5"],
        ["fire-doors", "Fire doors self-closing and marked", "SOLAS II-2/9"],
        ["fire-pumps", "Fire pumps and emergency fire pump tested", "SOLAS II-2/10"],
        ["fire-fireman-outfit", "Fireman's outfits complete, SCBA cylinders charged", "SOLAS II-2/10"],
        ["fire-plan", "Fire control plan posted and copy stored outside deckhouse", "SOLAS II-2/15"],
      ]),
      c("navigation", "Navigation and Bridge", [
        ["nav-charts", "Charts / ECDIS up to date and corrected", "SOLAS V/19, V/27"],
        ["nav-publications", "Nautical publications (List of Lights, Sailing Directions) up to date", "SOLAS V/27"],
        ["nav-lights-shapes", "Navigation lights, shapes and sound signals working", "COLREG"],
        ["nav-gmdss", "GMDSS equipment working, battery tests recorded", "SOLAS IV"],
        ["nav-magnetic-compass", "Magnetic compass deviation card up to date", "SOLAS V/19"],
        ["nav-bnwas", "BNWAS fitted and operational", "SOLAS V/19"],
        ["nav-voyage-plan", "Berth-to-berth passage plan prepared and approved", "SOLAS V/34"],
      ]),
      c("marpol", "Environment / MARPOL", [
        ["marpol-orb", "Oil Record Book Part I/II up to date and correct", "MARPOL Annex I"],
        ["marpol-ows", "15 ppm oily water separator and alarm working", "MARPOL Annex I"],
        ["marpol-garbage", "Garbage Record Book and Garbage Management Plan up to date", "MARPOL Annex V"],
        ["marpol-sewage", "Sewage treatment plant working", "MARPOL Annex IV"],
        ["marpol-sopep", "SOPEP, equipment and records available", "MARPOL Annex I/37"],
        ["marpol-bunker", "Bunker delivery notes and fuel sulphur compliance", "MARPOL Annex VI"],
        ["marpol-bwms", "Ballast Water Management Plan and Record Book up to date", "BWM Convention"],
      ]),
      c("mlc", "MLC and Crew", [
        ["mlc-sea", "Signed seafarers' employment agreement for all crew", "MLC A2.1"],
        ["mlc-hours", "Hours of work / rest records compliant and signed", "MLC A2.3 / STCW"],
        ["mlc-wages", "Wage accounts up to date and paid", "MLC A2.2"],
        ["mlc-food", "Food and drinking water sufficient, galley hygienic", "MLC A3.2"],
        ["mlc-accommodation", "Crew accommodation clean and maintained", "MLC A3.1"],
        ["mlc-medical", "Hospital, medicine chest and medical certificates up to date", "MLC A4.1"],
        ["mlc-complaint", "On-board complaint procedure posted", "MLC A5.1.5"],
      ]),
      c("ism", "ISM / Operations", [
        ["ism-drills", "Fire and abandon ship drills recorded and regular", "SOLAS III/19"],
        ["ism-familiarization", "Familiarization records for newly joined crew", "ISM 6"],
        ["ism-muster-list", "Muster list up to date and posted", "SOLAS III/8"],
        ["ism-nonconformity", "Non-conformities and corrective actions closed", "ISM 9"],
        ["ism-pms", "Planned maintenance system up to date", "ISM 10"],
        ["ism-isps-drills", "Security drills carried out and recorded", "ISPS / SOLAS XI-2"],
      ]),
    ],
  },
  {
    id: "sire",
    title: "SIRE 2.0 (OCIMF)",
    scope: "Oil tanker vetting, grouped by VIQ chapter",
    storageKey: "inspection-sire-v1",
    categories: [
      c("sire-cert", "Certification and Documentation", [
        ["sire-cert-1", "Statutory and class certificates valid, no overdue conditions", "VIQ Ch. 2"],
        ["sire-cert-2", "Previous PSC and vetting findings closed out", "VIQ Ch. 2"],
      ]),
      c("sire-crew", "Crew Management", [
        ["sire-crew-1", "STCW certificates, endorsements and tanker training for all officers", "VIQ Ch. 3 / STCW V/1-1"],
        ["sire-crew-2", "Hours of rest records match actual work patterns", "VIQ Ch. 3 / MLC A2.3"],
        ["sire-crew-3", "Officers can explain company procedures for their own tasks", "VIQ Ch. 3"],
      ]),
      c("sire-nav", "Navigation and Communications", [
        ["sire-nav-1", "Passage plan covers berth to berth with no-go areas and UKC", "VIQ Ch. 4 / SOLAS V/34"],
        ["sire-nav-2", "Bridge team follows master's standing and night orders", "VIQ Ch. 4"],
        ["sire-nav-3", "ECDIS settings (safety contour, alarms) appropriate to the voyage", "VIQ Ch. 4"],
      ]),
      c("sire-safety", "Safety Management", [
        ["sire-safety-1", "Permit to work and enclosed space entry procedures followed", "VIQ Ch. 5 / SOLAS XI-1/7"],
        ["sire-safety-2", "Gas detectors calibrated, calibration records available", "VIQ Ch. 5"],
        ["sire-safety-3", "Drills realistic and recorded with lessons learned", "VIQ Ch. 5"],
      ]),
      c("sire-pollution", "Pollution Prevention", [
        ["sire-poll-1", "Deck scuppers plugged and spill kit ready during cargo/bunker ops", "VIQ Ch. 6"],
        ["sire-poll-2", "ODME operational and records complete", "VIQ Ch. 6 / MARPOL Annex I"],
      ]),
      c("sire-security", "Maritime Security", [
        ["sire-sec-1", "Access control at gangway in line with SSP security level", "VIQ Ch. 7 / ISPS"],
      ]),
      c("sire-cargo", "Cargo and Ballast Systems", [
        ["sire-cargo-1", "Cargo and ballast plans prepared and signed by officers", "VIQ Ch. 8"],
        ["sire-cargo-2", "Inert gas system oxygen content and pressure monitored", "VIQ Ch. 8 / SOLAS II-2/4"],
        ["sire-cargo-3", "Overfill alarms and high level alarms tested", "VIQ Ch. 8"],
        ["sire-cargo-4", "Cargo hoses and manifold reducers tested and marked", "VIQ Ch. 8"],
      ]),
      c("sire-mooring", "Mooring and Anchoring", [
        ["sire-moor-1", "Mooring lines and winch brakes in good condition, brake tests recorded", "VIQ Ch. 9"],
        ["sire-moor-2", "Mooring system management plan available", "VIQ Ch. 9 / OCIMF MEG4"],
      ]),
      c("sire-engine", "Machinery Spaces", [
        ["sire-eng-1", "Engine room clean, no leaks, emergency equipment tested", "VIQ Ch. 10"],
        ["sire-eng-2", "Emergency generator and steering gear tests recorded", "VIQ Ch. 10 / SOLAS V/26"],
      ]),
      c("sire-general", "General Appearance and Condition", [
        ["sire-gen-1", "Hull, deck and superstructure free of significant corrosion", "VIQ Ch. 11"],
      ]),
    ],
  },
  {
    id: "cdi",
    title: "CDI",
    scope: "Chemical and gas tanker inspection",
    storageKey: "inspection-cdi-v1",
    categories: [
      c("cdi-docs", "Documents", [
        ["cdi-doc-1", "Certificate of Fitness (IBC / IGC) valid and products listed", "IBC 1.5 / IGC 1.4"],
        ["cdi-doc-2", "Procedures and Arrangements Manual approved", "MARPOL Annex II"],
        ["cdi-doc-3", "Cargo Record Book up to date", "MARPOL Annex II"],
      ]),
      c("cdi-cargo", "Cargo Operations", [
        ["cdi-cargo-1", "Cargo data sheets (SDS) available for all cargoes on board", "SOLAS VI/5-1"],
        ["cdi-cargo-2", "Cargo compatibility checked, segregation plan prepared", "IBC Ch. 15-17"],
        ["cdi-cargo-3", "Tank cleaning and prewash records complete", "MARPOL Annex II"],
        ["cdi-cargo-4", "Vapour return and high level alarms tested", "IBC 15.19"],
      ]),
      c("cdi-safety", "Safety and Personal Protection", [
        ["cdi-safety-1", "Protective equipment suitable for cargoes carried", "IBC 14 / IGC 14"],
        ["cdi-safety-2", "Decontamination showers and eyewash stations working", "IBC 14.4"],
        ["cdi-safety-3", "Toxic and flammable gas detectors calibrated", "IBC 13.2"],
      ]),
    ],
  },
  {
    id: "flag",
    title: "Flag State Inspection",
    scope: "Annual inspection on behalf of the flag Administration",
    storageKey: "inspection-flag-v1",
    categories: [
      c("flag-docs", "Registry and Documents", [
        ["flag-doc-1", "Certificate of Registry and Continuous Synopsis Record up to date", "SOLAS XI-1/5"],
        ["flag-doc-2", "Ship radio station licence valid", "ITU Radio Regulations"],
        ["flag-doc-3", "Crew certificates and flag endorsements valid", "STCW I/10"],
        ["flag-doc-4", "Official log book maintained", "Flag requirement"],
      ]),
      c("flag-safety", "Safety Equipment", [
        ["flag-safety-1", "LSA and FFA in line with Safety Equipment Certificate", "SOLAS III, II-2"],
        ["flag-safety-2", "Emergency steering drills carried out every three months", "SOLAS V/26"],
      ]),
      c("flag-crew", "Crew and Living Conditions", [
        ["flag-crew-1", "Manning matches Minimum Safe Manning Document", "SOLAS V/14"],
        ["flag-crew-2", "Accommodation, food and medical care comply with MLC", "MLC Title 3, 4"],
      ]),
    ],
  },
  {
    id: "class",
    title: "Class Annual Survey",
    scope: "Hull, machinery and equipment survey by the classification society",
    storageKey: "inspection-class-v1",
    categories: [
      c("class-hull", "Hull", [
        ["class-hull-1", "Load line marks and deck line clearly visible", "ILLC 1966"],
        ["class-hull-2", "Hatch covers, coamings and securing devices weathertight", "ILLC 1966 / Class rules"],
        ["class-hull-3", "Air pipes, ventilators and closing appliances in good condition", "ILLC 1966"],
        ["class-hull-4", "Watertight doors operational and indicators working", "SOLAS II-1/13"],
      ]),
      c("class-machinery", "Machinery", [
        ["class-mach-1", "Main and auxiliary engines run without abnormal condition", "Class rules"],
        ["class-mach-2", "Steering gear, including emergency means, tested", "SOLAS II-1/29"],
        ["class-mach-3", "Bilge pumping system and alarms working", "SOLAS II-1/35-1"],
        ["class-mach-4", "Emergency source of power tested", "SOLAS II-1/43"],
      ]),
      c("class-records", "Records", [
        ["class-rec-1", "No overdue conditions of class or recommendations", "Class rules"],
        ["class-rec-2", "Continuous survey items and PMS records available", "Class rules"],
      ]),
    ],
  },
  {
    id: "ism",
    title: "ISM Audit",
    scope: "Internal and external audit of the Safety Management System",
    storageKey: "inspection-ism-v1",
    categories: [
      c("ism-policy", "Policy and Company Responsibilities", [
        ["ism-a-1", "Safety and environmental protection policy posted and understood", "ISM 2"],
        ["ism-a-2", "Crew know the Designated Person Ashore and how to contact", "ISM 4"],
        ["ism-a-3", "Master's overriding authority stated in SMS", "ISM 5"],
      ]),
      c("ism-ops", "Resources and Shipboard Operations", [
        ["ism-b-1", "Familiarization and training records complete", "ISM 6"],
        ["ism-b-2", "Key shipboard operations covered by checklists and instructions", "ISM 7"],
        ["ism-b-3", "Emergency preparedness drills carried out as programmed", "ISM 8"],
      ]),
      c("ism-records", "Reports, Maintenance and Documentation", [
        ["ism-c-1", "Accidents, near misses and non-conformities reported and analysed", "ISM 9"],
        ["ism-c-2", "Maintenance carried out, critical equipment identified and tested", "ISM 10"],
        ["ism-c-3", "SMS documents current, obsolete versions removed", "ISM 11"],
        ["ism-c-4", "Master's review of SMS sent to company", "ISM 12"],
      ]),
    ],
  },
  {
    id: "isps",
    title: "ISPS Audit",
    scope: "Ship security verification",
    storageKey: "inspection-isps-v1",
    categories: [
      c("isps-plan", "Ship Security Plan", [
        ["isps-1", "Approved SSP on board and protected from unauthorised access", "ISPS A/9"],
        ["isps-2", "Ship Security Officer designated and trained", "ISPS A/12"],
        ["isps-3", "Ship Security Alert System tested, activation points known", "SOLAS XI-2/6"],
      ]),
      c("isps-ops", "Security Measures", [
        ["isps-4", "Access control and visitor log at gangway", "ISPS A/7"],
        ["isps-5", "Restricted areas marked and secured", "ISPS A/7"],
        ["isps-6", "Declarations of Security kept where required", "ISPS A/5"],
      ]),
      c("isps-records", "Drills and Records", [
        ["isps-7", "Security drills at least every three months", "ISPS B/13.6"],
        ["isps-8", "Records of security activities kept", "ISPS A/10"],
      ]),
    ],
  },
  {
    id: "mlc",
    title: "MLC 2006 Inspection",
    scope: "Living and working conditions of seafarers",
    storageKey: "inspection-mlc-v1",
    categories: [
      c("mlc-t1", "Minimum Requirements", [
        ["mlc-i-1", "No seafarer under minimum age", "MLC A1.1"],
        ["mlc-i-2", "Valid medical certificates for all crew", "MLC A1.2"],
      ]),
      c("mlc-t2", "Conditions of Employment", [
        ["mlc-i-3", "Seafarers' employment agreements signed and available", "MLC A2.1"],
        ["mlc-i-4", "Wages paid at least monthly with account statement", "MLC A2.2"],
        ["mlc-i-5", "Table of shipboard working arrangements posted", "MLC A2.3"],
        ["mlc-i-6", "Hours of rest records compliant", "MLC A2.3"],
      ]),
      c("mlc-t3", "Accommodation, Food and Catering", [
        ["mlc-i-7", "Cabins, sanitary facilities and ventilation in good condition", "MLC A3.1"],
        ["mlc-i-8", "Galley and provision store inspections recorded", "MLC A3.2"],
      ]),
      c("mlc-t4", "Health, Welfare and Complaints", [
        ["mlc-i-9", "Medicine chest and medical guide on board", "MLC A4.1"],
        ["mlc-i-10", "Financial security certificates (repatriation, liability) posted", "MLC A2.5.2 / A4.2.1"],
        ["mlc-i-11", "On-board complaint procedure known by crew", "MLC A5.1.5"],
      ]),
    ],
  },
  {
    id: "rightship",
    title: "RightShip Inspection",
    scope: "Dry bulk vetting inspection",
    storageKey: "inspection-rightship-v1",
    categories: [
      c("rs-docs", "Documents and Crew", [
        ["rs-1", "Certificates valid and PSC deficiencies closed", "SOLAS I"],
        ["rs-2", "Crew certificates and hours of rest compliant", "STCW / MLC"],
      ]),
      c("rs-cargo", "Cargo Holds and Hatches", [
        ["rs-3", "Hatch covers weathertight, hose test or ultrasonic test recorded", "ILLC 1966"],
        ["rs-4", "Cargo hold structure free of serious corrosion and damage", "Class rules"],
        ["rs-5", "Loading instrument approved and tested", "SOLAS XII/11"],
        ["rs-6", "Water ingress alarms in holds tested", "SOLAS XII/12"],
      ]),
      c("rs-safety", "Safety and Navigation", [
        ["rs-7", "LSA and FFA in good condition and maintained", "SOLAS III, II-2"],
        ["rs-8", "Enclosed space entry procedure and drills", "SOLAS III/19"],
        ["rs-9", "Passage plan and charts up to date", "SOLAS V/34"],
      ]),
      c("rs-engine", "Machinery and Pollution Prevention", [
        ["rs-10", "Engine room clean, OWS and records in order", "MARPOL Annex I"],
        ["rs-11", "Garbage and ballast water records complete", "MARPOL Annex V / BWM"],
      ]),
    ],
  },
  {
    id: "terminal",
    title: "Terminal Inspection",
    scope: "Ship / shore safety before cargo operations",
    storageKey: "inspection-terminal-v1",
    categories: [
      c("term-mooring", "Mooring and Access", [
        ["term-1", "Ship securely moored, lines tended", "ISGOTT SSSCL"],
        ["term-2", "Safe access between ship and shore, safety net rigged", "ISGOTT SSSCL"],
        ["term-3", "Emergency towing-off pennants rigged where required", "ISGOTT SSSCL"],
      ]),
      c("term-comms", "Communication and Emergency", [
        ["term-4", "Agreed ship/shore communication system working", "ISGOTT SSSCL"],
        ["term-5", "Emergency stop procedure agreed", "ISGOTT SSSCL"],
        ["term-6", "Fire hoses and fire-fighting equipment ready", "ISGOTT SSSCL"],
      ]),
      c("term-cargo", "Cargo Operations", [
        ["term-7", "Cargo transfer plan and rates agreed", "ISGOTT SSSCL"],
        ["term-8", "Unused cargo and bunker connections blanked", "ISGOTT SSSCL"],
        ["term-9", "Scuppers plugged, drip trays in position", "ISGOTT SSSCL"],
        ["term-10", "Smoking and naked light restrictions observed", "ISGOTT SSSCL"],
      ]),
    ],
  },
];

export function getInspection(id: string | null | undefined): InspectionType {
  return INSPECTIONS.find((i) => i.id === id) ?? INSPECTIONS[0];
}
