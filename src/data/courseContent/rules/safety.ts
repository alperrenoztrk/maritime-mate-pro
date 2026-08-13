import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Safety rules.
 *
 * The content is taken from real, cited regulations:
 *  - SOLAS Chapter II-2 (fire safety) and III (life saving)
 *  - LSA Code (life saving appliances)
 *  - FSS Code (fire safety systems)
 *  - ISM Code (DOC, SMC, DPA)
 *  - ISPS Code (ISSC, SSP, SSO)
 *  - MLC 2006 (work / health and safety)
 *
 * No invented rules; the references have been preserved.
 */
export const safetyRules: RuleGroup[] = [
  {
    title: "SOLAS Chapter II-2 — Fire Safety",
    source: {
      code: "SOLAS Chapter II-2 / FSS Code",
      detail: "Fire Protection, Fire Detection and Fire Extinction",
    },
    rules: [
      {
        subtitle: "Fire Detection and Extinguishing",
        content: [
          "Fire detection and alarm systems are mandatory.",
          "The fixed fire fighting appliances (FFA) must be complete and certified.",
          "Fire doors and class A/B divisions must be inspected regularly.",
          "The Fire Control Plan must be displayed in visible locations and kept in a container outside the ship.",
        ],
      },
      {
        subtitle: "Structural Fire Protection",
        content: [
          "The A-60 / A-0 division classes are applied according to the fire integrity tables.",
          "The means of escape must be marked and kept unobstructed.",
          "Quick-closing valves and remote ventilation shutdown must be provided for the machinery space.",
        ],
      },
    ],
  },
  {
    title: "SOLAS III & LSA — Life Saving",
    source: {
      code: "SOLAS III / LSA Code",
      detail: "International Life-Saving Appliance Code",
    },
    rules: [
      {
        subtitle: "Life Saving Appliances",
        content: [
          "Liferafts and lifeboats must be maintained in accordance with the annual servicing and davit/launching test requirements.",
          "Lifejackets and immersion suits must be provided in sufficient numbers for all personnel plus spares.",
          "EPIRB and SART units must be registered and in working order.",
          "The expiry dates of the pyrotechnics and the line-throwing apparatus must be monitored.",
        ],
      },
      {
        subtitle: "Muster ve Tatbikatlar",
        content: [
          "Abandon ship and fire drills must be held at least once a month (more frequently on passenger ships).",
          "The muster list and emergency instructions must be posted in the cabins and in conspicuous places.",
          "A lifeboat lowering drill must be carried out every three months.",
        ],
      },
    ],
  },
  {
    title: "ISM Code — Safe Operation",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code (SOLAS IX)",
    },
    rules: [
      {
        subtitle: "Certification and Management",
        content: [
          "The DOC (Document of Compliance) must be valid for the company and the SMC (Safety Management Certificate) for the ship.",
          "A DPA (Designated Person Ashore) must be appointed.",
          "Emergency procedures must be documented and internal audits carried out annually.",
        ],
      },
      {
        subtitle: "Risk ve Raporlama",
        content: [
          "A risk assessment and permit-to-work system must be implemented.",
          "Accidents, non-conformities and near misses must be reported and a root cause analysis carried out.",
        ],
      },
    ],
  },
  {
    title: "ISPS Code — Security",
    source: {
      code: "ISPS Code",
      detail: "International Ship and Port Facility Security Code (SOLAS XI-2)",
    },
    rules: [
      {
        subtitle: "Ship Security Documentation and Drills",
        content: [
          "The ISSC (International Ship Security Certificate) must be valid.",
          "The SSP (Ship Security Plan) must be approved and implemented, and an SSO appointed.",
          "The security levels (1/2/3) must be monitored, and access control and visitor records maintained.",
          "Security drills and exercises must be held regularly.",
        ],
      },
    ],
  },
  {
    title: "MLC 2006 — Occupational Health and Safety",
    source: {
      code: "MLC 2006",
      detail: "Maritime Labour Convention, Title 4 (health, safety and accident prevention)",
    },
    rules: [
      {
        subtitle: "Working Environment and Protection",
        content: [
          "Personal protective equipment (PPE) must be provided and its use supervised.",
          "Hours of work and rest (and their limits) must be recorded.",
          "An on-board safety committee must be established and regular safety meetings held.",
        ],
      },
    ],
  },
];
