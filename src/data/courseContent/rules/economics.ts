import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Deniz ticareti / ekonomi kuralları.
 *
 * Bu dosyada bağlı bir bespoke sayfa YOKTUR; içerik gerçek ticari deniz hukuku
 * ve standart formlardan ilke düzeyinde derlenmiştir. Uydurma sayısal eşik
 * verilmemiş, atıflar (Hague-Visby, Incoterms 2020, BIMCO formları vb.)
 * korunmuştur.
 */
export const economicsRules: RuleGroup[] = [
  {
    title: "Types of Charter Party",
    source: {
      code: "Charter Party Contracts",
      detail: "BIMCO / standard shipping practice",
    },
    rules: [
      {
        subtitle: "Main Types of Charter",
        content: [
          "Voyage charter: the owner undertakes to carry a specified cargo from one port to another; the freight is paid per unit of cargo or as a lumpsum.",
          "Time charter: the vessel is hired for a fixed period; the charterer directs the voyages and the hire is normally paid daily in advance.",
          "Bareboat / demise charter: the charterer takes the vessel without a crew and assumes full responsibility for her operation and navigation.",
          "Contract of Affreightment (COA): a framework contract for carrying a total quantity of cargo in consecutive voyages over a given period.",
        ],
      },
      {
        subtitle: "Key Charter Party Clauses",
        content: [
          "Safe port / safe berth: the charterer is obliged to nominate a port and berth the vessel can reach and leave safely.",
          "Off-hire clause: hire ceases when the vessel cannot render service because of breakdown, dry-docking or other causes not attributable to the charterer.",
          "Ice clause / war risk clause: governs the rights and obligations of the parties in cases of ice and war risk.",
          "Cancelling date: the charterer may cancel the contract if the vessel is not ready at the loading port by the stated date.",
        ],
      },
    ],
  },
  {
    title: "Laytime, Demuraj ve Despatch",
    source: {
      code: "Laytime / Demurrage",
      detail: "Laytime Definitions for Charter Parties (BIMCO et al.)",
    },
    rules: [
      {
        subtitle: "Laytime (Loading/Discharging Time)",
        content: [
          "Laytime is the period allowed to the charterer for cargo handling and included in the freight.",
          "The period is normally defined on the basis of running days, weather working days or SHINC/SHEX (Sundays and holidays included/excluded).",
          "As a rule, laytime starts to run once a valid Notice of Readiness (NOR) has been tendered and accepted.",
        ],
      },
      {
        subtitle: "Demuraj ve Despatch",
        content: [
          "Demurrage: the agreed daily compensation paid by the charterer to the owner when the laytime is exceeded (the principle \"once on demurrage, always on demurrage\" applies).",
          "Despatch money: the premium paid by the owner to the charterer when the work is completed before the laytime expires, typically half the demurrage rate.",
          "Detention: a separate claim for time lost outside the scope of laytime and demurrage.",
        ],
      },
    ],
  },
  {
    title: "Notice of Readiness (NOR)",
    source: {
      code: "NOR",
      detail: "Notice of Readiness — charter party practice",
    },
    rules: [
      {
        subtitle: "Conditions for a Valid NOR",
        content: [
          "The vessel must be ready in all respects, both physically and legally, to load or discharge.",
          "The vessel must have become an \"arrived ship\" under the contract (according to whether it is a berth or a port charter).",
          "The NOR must be tendered at the place, time and in the manner stated in the contract (within office hours and by the specified method).",
          "An invalid NOR does not start the laytime, which can lead to disputes in demurrage calculations.",
        ],
      },
    ],
  },
  {
    title: "Bill of Lading and the Hague-Visby Rules",
    source: {
      code: "Hague-Visby Rules",
      detail: "Hague Rules 1924 / Visby Protocol 1968",
    },
    rules: [
      {
        subtitle: "Functions of the Bill of Lading",
        content: [
          "It acts as a receipt for the goods taken into charge.",
          "It is evidence of the contract of carriage.",
          "It is a document of title representing the goods and is transferable by endorsement.",
        ],
      },
      {
        subtitle: "Carrier's Liabilities and Exemptions",
        content: [
          "The carrier must exercise due diligence to make the vessel seaworthy at the commencement of the voyage.",
          "The limit of liability is expressed in SDR per package/unit or per gross kilogramme (the \"package or kilo\" limit introduced by Visby).",
          "The carrier may be exonerated in certain cases such as nautical fault (errors in navigation or management) and fire.",
          "The Hamburg Rules and the Rotterdam Rules provide alternative regimes to Hague-Visby with a different balance of liability.",
        ],
      },
    ],
  },
  {
    title: "Incoterms 2020 Temelleri",
    source: {
      code: "Incoterms 2020",
      detail: "ICC International Commercial Terms",
    },
    rules: [
      {
        subtitle: "Any Mode of Transport",
        content: [
          "EXW (Ex Works): the seller makes the goods available at its own premises; the risk and cost fall largely on the buyer.",
          "FCA (Free Carrier): the seller delivers the goods to the carrier at the named place.",
          "CPT / CIP: the seller pays the freight (and, under CIP, the insurance); the risk passes to the buyer on delivery to the first carrier.",
          "DAP / DPU / DDP: delivery takes place at the destination; under DDP the customs duties and import taxes are for the seller's account.",
        ],
      },
      {
        subtitle: "Sea and Inland Waterway Transport Only",
        content: [
          "FAS (Free Alongside Ship): the goods are delivered alongside the vessel at the port of loading.",
          "FOB (Free On Board): the risk passes to the buyer when the goods are loaded on board.",
          "CFR (Cost and Freight): the seller pays the freight; the risk passes on loading on board.",
          "CIF (Cost, Insurance and Freight): in addition to CFR, the seller also provides minimum marine insurance cover.",
        ],
      },
    ],
  },
  {
    title: "BIMCO Standard Forms",
    source: {
      code: "BIMCO",
      detail: "Baltic and International Maritime Council standard forms",
    },
    rules: [
      {
        subtitle: "Common Standard Forms",
        content: [
          "GENCON: the general purpose voyage charter form.",
          "NYPE / BALTIME: time charter forms.",
          "BARECON: the bareboat charter form.",
          "CONGENBILL: the bill of lading form compatible with GENCON.",
          "SUPPLYTIME: the time charter form for offshore support vessels.",
        ],
      },
    ],
  },
  {
    title: "Fundamentals of P&I and H&M Insurance",
    source: {
      code: "Marine Insurance",
      detail: "P&I Clubs / Hull & Machinery practice",
    },
    rules: [
      {
        subtitle: "Main Types of Cover",
        content: [
          "H&M (Hull & Machinery): property insurance covering damage to the hull and machinery, part of the collision liability and general average.",
          "P&I (Protection & Indemnity): cover provided by mutual insurance clubs for third party liabilities (cargo damage, pollution, crew and passenger claims).",
          "FD&D (Freight, Demurrage & Defence): additional cover for legal costs and advice in commercial disputes.",
        ],
      },
      {
        subtitle: "Basic Principles",
        content: [
          "General average: the apportionment among the interests, under the York-Antwerp Rules, of the sacrifices and expenses made to save the ship and cargo in a common maritime adventure.",
          "Particular average: a partial loss borne solely by the interest concerned; it is not apportioned.",
          "Under the principle of uberrimae fidei (utmost good faith) the assured must disclose to the insurer all material facts relating to the risk.",
        ],
      },
    ],
  },
];
