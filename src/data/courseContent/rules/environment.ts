import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Çevre kuralları.
 *
 * İçerik src/pages/EmissionRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden alınmıştır. Sayfadaki iç içe (nested) alt bölümler, her biri
 * ayrı bir RuleSection olacak şekilde korunmuştur:
 *  - MARPOL Annex VI (Hava Kirliliği — SOx, NOx, enerji verimliliği)
 *  - BWM Convention (Balast Suyu)
 *  - MARPOL Annex I (Petrol Kirliliği)
 *  - MARPOL Annex V (Çöp)
 *  - IMO DCS ve Bölgesel MRV
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const environmentRules: RuleGroup[] = [
  {
    title: "MARPOL Annex VI — Air Pollution",
    source: {
      code: "MARPOL Annex VI",
      detail: "Prevention of Air Pollution from Ships",
    },
    rules: [
      {
        subtitle: "Sulphur Limits (SOx)",
        content: [
          "Global sulphur limit: 0.50% m/m (from 1 January 2020)",
          "In ECAs: 0.10% m/m",
          "Alternative: the use of an approved exhaust gas cleaning system (scrubber)",
          "Fuel changeover procedure: records must be kept when entering and leaving an ECA",
        ],
      },
      {
        subtitle: "NOx Emisyon Seviyeleri",
        content: [
          "Tier I: ships built before 2000",
          "Tier II: ships built after 2011 (global standard)",
          "Tier III: ships built after 2016, mandatory in NECAs",
          "Tier III must be at least 80% below the Tier I value",
        ],
      },
      {
        subtitle: "Energy Efficiency",
        content: [
          "EEDI: mandatory for new ships (2013 onwards)",
          "EEXI: mandatory for existing ships (2023 onwards)",
          "CII: annual operational rating (A-E), mandatory from 2023",
          "SEEMP: a ship energy efficiency management plan for all ships",
        ],
      },
    ],
  },
  {
    title: "BWM Convention - Balast Suyu",
    source: {
      code: "BWM Convention",
      detail: "Ballast Water Management Convention",
    },
    rules: [
      {
        subtitle: "D-1 Standard (Exchange)",
        content: [
          "Karadan en az 200 deniz mili uzakta",
          "The water depth must be at least 200 metres",
          "At least 95% of the ballast water must be exchanged",
          "Methods: sequential, flow-through or dilution",
        ],
      },
      {
        subtitle: "D-2 Standard (Treatment)",
        content: [
          "Viable organism limits: <10 organisms ≥50 μm per m³",
          "In the 10-50 μm range: <10 organisms per ml",
          "The system must hold IMO type approval",
          "A Ballast Water Record Book must be maintained",
        ],
      },
    ],
  },
  {
    title: "MARPOL Annex I — Oil Pollution",
    source: {
      code: "MARPOL Annex I",
      detail: "Prevention of Pollution by Oil",
    },
    rules: [
      {
        subtitle: "Bilge Water Discharge",
        content: [
          "The oil content must be less than 15 ppm",
          "Approved oil filtering equipment must be used",
          "The automatic stopping device must be active",
          "Zero discharge in special areas (Mediterranean, Baltic etc.)",
        ],
      },
      {
        subtitle: "Cargo Tank Washing",
        content: [
          "COW (Crude Oil Washing) procedures",
          "Slop tank management",
          "Load-on-top procedure",
          "Oil Record Book Part II entries",
        ],
      },
    ],
  },
  {
    title: "MARPOL Annex V — Garbage",
    source: {
      code: "MARPOL Annex V",
      detail: "Prevention of Pollution by Garbage from Ships",
    },
    rules: [
      {
        subtitle: "Discharge Prohibitions",
        content: [
          "Plastics: discharge into the sea is PROHIBITED everywhere",
          "Food waste: more than 12 nm from land (comminuted: more than 3 nm)",
          "Cargo residues: more than 12 nm from land (non-harmful substances)",
          "In special areas: zero discharge for most waste",
        ],
      },
      {
        subtitle: "Records and Reporting",
        content: [
          "Garbage Record Book zorunlu (400 GT+ gemiler)",
          "A garbage management plan must be in place",
          "Receipts for delivery to port reception facilities must be retained",
          "Records must be kept for two years",
        ],
      },
    ],
  },
  {
    title: "IMO DCS and Regional MRV",
    source: {
      code: "IMO DCS / EU MRV",
      detail: "MARPOL Annex VI Reg. 22A; EU Regulation 2015/757",
    },
    rules: [
      {
        subtitle: "IMO DCS (Data Collection System)",
        content: [
          "Mandatory for ships of 5000 GT and above",
          "Annual fuel consumption reporting",
          "Distance travelled and hours under way",
          "SEEMP Part II documentation",
        ],
      },
      {
        subtitle: "EU MRV Regulation",
        content: [
          "Ships of 5000 GT and above calling at EU ports",
          "CO₂ emissions, fuel consumption and distance",
          "Annual verification and reporting",
          "Publicly available emission data",
        ],
      },
      {
        subtitle: "Warnings and Important Notes",
        content: [
          "Ships rated CII D or E must submit a corrective action plan within three years.",
          "Ships without an EEXI certificate may not trade from 2023 onwards.",
          "The fuel changeover procedure must be completed before the ECA boundary and recorded.",
          "For the wash water discharge limits of ships using scrubbers, see IMO resolution MEPC.259(68).",
        ],
      },
    ],
  },
];
