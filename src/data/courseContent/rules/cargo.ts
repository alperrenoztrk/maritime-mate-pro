import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Yük elleçleme ve istifleme kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - IMSBC Code (Uluslararası Denizyolu Katı Dökme Yük Kodu)
 *  - International Grain Code
 *  - IMDG Code (tehlikeli yükler)
 *  - CSS Code / Annex 13 (yük emniyeti, bağlama)
 *  - ISGOTT ve terminal prosedürleri
 *  - SOLAS gereklilikleri (VGM, CSM)
 *  - MARPOL Annex I/II/V (yük artıkları)
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const cargoRules: RuleGroup[] = [
  {
    title: "IMSBC Code — Solid Bulk Cargoes",
    source: {
      code: "IMSBC Code",
      detail: "International Maritime Solid Bulk Cargoes Code (SOLAS VI/VII)",
    },
    rules: [
      {
        subtitle: "Carriage Requirements and Declarations",
        content: [
          "Transportable Moisture Limit (TML) ve Flow Moisture Point (FMP) kontrolleri zorunludur.",
          "The cargo must be classified correctly (Group A: may liquefy, Group B: chemical hazard, Group C: neither A nor B).",
          "The shipper's declaration and the certificates (TML, moisture content) must be complete.",
          "The special carriage requirements and hazardous properties (BCSN — Bulk Cargo Shipping Name) must be taken into account.",
        ],
      },
      {
        subtitle: "Liquefaction Risk",
        content: [
          "For Group A cargoes the actual moisture content must be below the TML; otherwise the cargo must not be loaded.",
          "The can test may be used on board as a quick check of the tendency to liquefy.",
          "A liquefied cargo behaves like a free surface and can cause a sudden shift and capsize; loading must be refused.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code — Grain Cargoes",
    source: {
      code: "International Grain Code",
      detail: "SOLAS Chapter VI, Part C",
    },
    rules: [
      {
        subtitle: "Grain Stability Criteria",
        content: [
          "Corrected GM (GM_corr) ≥ 0.30 m (including free surface and grain shift).",
          "The angle of heel due to grain shift must be ≤ 12° (or the deck edge immersion angle, whichever is less).",
          "The residual area under the GZ curve must be ≥ 0.075 m·rad.",
        ],
      },
      {
        subtitle: "Loading, Trimming and Documentation",
        content: [
          "The Document of Authorization (DOA) and the approved Grain Loading Manual must be carried on board.",
          "Trimming and heeling moment calculations must be carried out for both filled and partly filled holds.",
          "The void spaces and shifting moments are taken from the tables in the regulation.",
        ],
      },
    ],
  },
  {
    title: "IMDG Code — Dangerous Goods",
    source: {
      code: "IMDG Code",
      detail: "International Maritime Dangerous Goods Code (SOLAS VII / MARPOL Annex III)",
    },
    rules: [
      {
        subtitle: "Classification and Documentation",
        content: [
          "Dangerous goods are divided into 9 classes and identified by a UN number and a Proper Shipping Name.",
          "The Dangerous Goods Declaration and the Container/Vehicle Packing Certificate must be complete.",
          "The marking, labelling and placarding requirements must be met.",
        ],
      },
      {
        subtitle: "Stowage and Segregation",
        content: [
          "The stowage and segregation tables (away from / separated from) must be complied with.",
          "The manifest/Dangerous Goods List and the stowage plan must be available on board.",
          "The EmS (Emergency Schedules) and the MFAG must be carried for emergency response to fire and spillage.",
        ],
      },
    ],
  },
  {
    title: "Cargo Securing — CSS Code and CSM",
    source: {
      code: "CSS Code / Annex 13",
      detail: "Cargo Stowage and Securing; Cargo Securing Manual (SOLAS VI/5, VII/5)",
    },
    rules: [
      {
        subtitle: "Principles of Lashing Calculations",
        content: [
          "The acceleration factors (longitudinal, transverse, vertical) are selected from the Annex 13 tables according to the ship's length and service speed.",
          "The MSL (Maximum Securing Load) and the friction coefficients (steel/steel ≈ 0.10, steel/timber ≈ 0.30) are taken into account.",
          "The methods and equipment set out in the approved Cargo Securing Manual must be used.",
        ],
      },
      {
        subtitle: "VGM and Container Cargoes",
        content: [
          "The VGM (Verified Gross Mass) is mandatory for container shipments (SOLAS VI/2).",
          "The stowage plan must not exceed the stack weight and lashing limits.",
          "The stability booklet limits and the line of sight requirements (SOLAS V/22) must be maintained.",
        ],
      },
    ],
  },
  {
    title: "Tanker ve Terminal — ISGOTT",
    source: {
      code: "ISGOTT",
      detail: "International Safety Guide for Oil Tankers and Terminals",
    },
    rules: [
      {
        subtitle: "Ship/Shore Interface and Safety Checks",
        content: [
          "The Ship/Shore Safety Checklist must be completed before loading/discharging.",
          "Gas measurements must be taken before the manifold is opened.",
          "Hot work permits must be issued in coordination with the terminal.",
          "The Emergency Shutdown (ESD) procedures must be ready.",
        ],
      },
      {
        subtitle: "Statik Elektrik ve Inert Gaz",
        content: [
          "The tank atmosphere must be kept at O₂ ≤ 8% by volume with the inert gas system.",
          "A low initial loading rate is used at the start of loading because of the static accumulation risk.",
          "The bonding/earthing rules and the prevention of splash filling must be observed.",
        ],
      },
    ],
  },
  {
    title: "Cargo Residues — MARPOL",
    source: {
      code: "MARPOL Annex I / II / V",
      detail: "Discharge rules for oil, noxious liquid substances and solid waste",
    },
    rules: [
      {
        subtitle: "Discharge and Record Keeping",
        content: [
          "The discharge criteria for oily cargo residues (Annex I) and NLS residues (Annex II) must be complied with.",
          "The Cargo Record Book / Oil Record Book Part II entries must be maintained.",
          "A Garbage Record Book and proper disposal are required for solid cargo residues (Annex V).",
        ],
      },
    ],
  },
];
