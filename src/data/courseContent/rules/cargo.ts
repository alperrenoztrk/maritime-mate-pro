import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Cargo handling and stowage reference.
 *
 * Apply the exact cargo schedule, shipper documentation, approved Cargo Securing
 * Manual/Grain Loading Manual, vessel limitations and current statutory edition.
 * Summaries below are not cargo-acceptance certificates or loading permission.
 */
export const cargoRules: RuleGroup[] = [
  {
    title: "IMSBC Code — Solid Bulk Cargoes",
    source: {
      code: "IMSBC Code",
      detail: "International Maritime Solid Bulk Cargoes Code (SOLAS Chapters VI/VII) — use the current applicable schedule/amendments",
    },
    rules: [
      {
        subtitle: "Cargo Information and Classification",
        content: [
          "Before loading, the master must receive the cargo information required by SOLAS/IMSBC in sufficient time to take necessary precautions for proper stowage and safe carriage.",
          "Use the exact Bulk Cargo Shipping Name (BCSN), cargo group and individual schedule. Group A cargoes present a liquefaction/dynamic-separation hazard; Group B cargoes possess chemical hazards; Group C cargoes are neither Group A nor Group B under the Code classification.",
          "TML/FMP documentation is not universally required for every bulk cargo. Moisture-content and TML requirements apply to relevant Group A cargoes in accordance with the Code and the cargo's schedule.",
          "Required test certificates, sampling dates, moisture declarations and other shipper information must meet the Code's timing/method requirements for the specific cargo.",
        ],
      },
      {
        subtitle: "Liquefaction / Dynamic Separation Risk",
        content: [
          "Where the Code requires TML control, cargo must not be accepted for loading when the certified moisture content exceeds the applicable TML, except where an alternative carriage provision expressly permitted by the Code applies.",
          "An onboard 'can test' is only a supplementary indication of possible excess moisture. It does not replace the shipper's valid certificates, laboratory testing or the master's obligations under the IMSBC Code.",
          "If visual observations, can-test indications, weather exposure or cargo condition create doubt about the validity of the declared moisture condition, stop/withhold acceptance and resolve the concern through the Code/SMS process before continuing.",
          "Liquefaction or dynamic separation can cause rapid cargo shift and severe loss of stability. Response must follow the cargo schedule, vessel SMS and master's authority; a simplified app calculation must not authorize loading.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code — Grain in Bulk",
    source: {
      code: "International Grain Code",
      detail: "SOLAS Chapter VI, Part C — use approved ship-specific grain information",
    },
    rules: [
      {
        subtitle: "Stability Criteria",
        content: [
          "For a loading condition subject to the Grain Code, the corrected initial GM after applicable free-surface effects must be at least 0.30 m.",
          "The angle of heel due to the assumed grain-shift moment must not exceed 12° or, where less, the angle at which the deck edge is immersed.",
          "The residual area between the heeling-arm and righting-arm curves, up to the prescribed limiting angle, must be at least 0.075 m·rad.",
          "All criteria are applied together using the approved grain-heeling moments and ship stability data; meeting one number alone does not establish compliance.",
        ],
      },
      {
        subtitle: "Loading and Documentation",
        content: [
          "Use the ship's approved grain loading information and Document of Authorization where required by the Code/Administration.",
          "Filled and partly filled compartments must be assessed using the applicable assumed volumetric heeling moments and required securing/trimming arrangements.",
          "Any exemptions, specially suitable compartments or alternative arrangements must be supported by the exact approved documentation; they must not be inferred from a generic summary.",
        ],
      },
    ],
  },
  {
    title: "IMDG Code — Dangerous Goods in Packaged Form",
    source: {
      code: "IMDG Code 2024 Edition (Amendment 42-24)",
      detail: "Mandatory from 1 January 2026 (SOLAS VII / MARPOL Annex III)",
    },
    rules: [
      {
        subtitle: "Classification and Documentation",
        content: [
          "Dangerous goods must be classified, identified and documented using the applicable UN number, Proper Shipping Name, class/division, packing group where assigned, marine-pollutant status and other particulars required by the current IMDG Code.",
          "Packages, IBCs, tanks, freight containers and cargo transport units must meet the applicable packing, marking, labelling, placarding and certification requirements.",
          "Dangerous-goods transport documentation and, where applicable, the container/vehicle packing certificate must be complete and consistent with the actual cargo.",
        ],
      },
      {
        subtitle: "Stowage, Segregation and Emergency Information",
        content: [
          "Apply the individual Dangerous Goods List entry plus the current stowage and segregation provisions; generic phrases such as 'away from' or 'separated from' are not interchangeable and have defined meanings.",
          "The special list/manifest or stowage plan required by SOLAS must identify dangerous goods and their location on board and be available for emergency use.",
          "Use the current IMDG Code Supplement emergency information, including EmS and MFAG where applicable, together with the vessel's emergency procedures.",
        ],
      },
    ],
  },
  {
    title: "Cargo Securing — CSS Code and Approved CSM",
    source: {
      code: "CSS Code / Cargo Securing Manual",
      detail: "SOLAS Chapters VI/VII and the ship's approved Cargo Securing Manual",
    },
    rules: [
      {
        subtitle: "Securing Principles",
        content: [
          "Cargo must be stowed and secured throughout the voyage in accordance with the ship's approved Cargo Securing Manual (CSM) and the requirements applicable to the cargo and securing arrangement.",
          "When a CSS Code calculation method is used, acceleration factors, MSL/CS values, friction coefficients, geometry and safety factors must come from the applicable method/approved CSM and the actual materials/conditions.",
          "Do not treat generic friction coefficients such as steel/steel 0.10 or steel/timber 0.30 as universally valid; surface condition, dunnage material, contamination and the approved calculation method govern.",
        ],
      },
      {
        subtitle: "Packed Containers and VGM",
        content: [
          "A packed container subject to SOLAS VI/2 must have a verified gross mass (VGM) obtained by an approved method before it is loaded, subject to the regulation's defined scope/exceptions.",
          "Container stack weights, lashing forces, permissible positions and any operational restrictions must remain within the approved loading/securing system limits.",
          "Cargo stowage must also preserve applicable stability, visibility, access, fire-safety and dangerous-goods requirements.",
        ],
      },
    ],
  },
  {
    title: "Oil Tanker / Terminal Interface — ISGOTT and Ship/Terminal Procedures",
    source: {
      code: "ISGOTT / applicable SOLAS, MARPOL and terminal requirements",
      detail: "Industry guidance must be used together with statutory and ship/terminal procedures",
    },
    rules: [
      {
        subtitle: "Ship/Shore Interface",
        content: [
          "Complete the applicable ship/shore safety checklist and establish agreed communications, transfer rates/pressures, tank plan, emergency-stop arrangements and responsibilities before cargo transfer.",
          "Atmosphere testing, line-up, valve status, scupper/containment arrangements and pollution-prevention readiness must be completed as required by the cargo operation, terminal rules and vessel SMS.",
          "Hot work or other incompatible simultaneous operations require the applicable permit, risk assessment and ship/terminal authorization; a generic checklist item is not permission to proceed.",
          "Emergency shutdown/stop actions must match the actual ship/shore system and agreed procedure; ESD capability and terminology vary by tanker/terminal installation.",
        ],
      },
      {
        subtitle: "Inert Gas and Static-Electricity Controls",
        content: [
          "For tanks/ships to which SOLAS inert-gas requirements apply, maintain the cargo-tank atmosphere and inert-gas supply within the applicable statutory and vessel-system oxygen/pressure limits; the commonly cited ≤8% tank oxygen criterion is not a universal rule for every tanker operation or vessel.",
          "Initial loading rates, splash-filling precautions, settling times, sampling/gauging restrictions and static-electricity controls depend on cargo conductivity, tank condition, operation and ISGOTT/terminal procedures.",
          "Electrical isolation/continuity arrangements at the ship/shore connection must follow the approved terminal/ship interface practice; do not improvise bonding or earthing arrangements from a generic app statement.",
        ],
      },
    ],
  },
  {
    title: "Cargo Residues — MARPOL",
    source: {
      code: "MARPOL Annexes I / II / V",
      detail: "Use the annex, cargo/product category, ship type, voyage area and approved procedures applicable to the residue",
    },
    rules: [
      {
        subtitle: "Discharge and Record Keeping",
        content: [
          "Oil cargo residues/slops, noxious liquid substance residues and solid-bulk cargo residues are governed by different MARPOL annexes and conditions; do not apply one discharge rule across cargo types.",
          "Make Oil Record Book Part II and/or Cargo Record Book entries exactly when required for the ship and operation, using the approved procedures and correct operation codes.",
          "Annex V cargo-residue discharge depends on factors including whether the residue is harmful to the marine environment (HME), cleaning agents/additives, special-area status and the complete Annex V conditions.",
        ],
      },
    ],
  },
];
