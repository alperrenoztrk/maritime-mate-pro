import type { RuleGroup } from "@/data/courseContent/types";

export const stabilityRules: RuleGroup[] = [
  {
    title: "2008 IS Code — Intact Stability",
    source: { code: "IMO 2008 IS Code (MSC.267(85))", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Kriterler",
        content: [
          "Area under the GZ curve: 0°–30° ≥ 0.055 m·rad; 0°–40° (or up to the downflooding angle) ≥ 0.090 m·rad; 30°–40° ≥ 0.030 m·rad.",
          "Maximum GZ ≥ 0.20 m occurring at an angle θ ≥ 30°.",
          "Initial GM (GM0) ≥ 0.15 m (typical minimum for steel dry cargo, general cargo vessels etc.).",
          "The range of positive stability must be at least 30°; the deck edge should preferably immerse beyond 30°.",
          "Weather Criterion: in a 26–40 m/s wind the angle of equilibrium θw ≤ 16° or 80% of θ_deck, whichever is less.",
          "Weather Criterion: the residual GZ area up to the same limiting angle must show a margin of at least 40% against the wind heeling energy.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code — Grain Cargoes",
    source: { code: "International Grain Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Grain Stability Requirements",
        content: [
          "Corrected GM (GM_corr) ≥ 0.30 m (including free surface and grain shift corrections).",
          "The angle of heel due to grain shift must be θ ≤ 12°, or the deck edge immersion angle, whichever is less.",
          "The criteria in the approved Grain Loading Manual must be verified for every loading condition and the Document of Authorization (DOA) must be carried on board.",
        ],
      },
    ],
  },
  {
    title: "SOLAS II‑1 — Probabilistic Damage Stability",
    source: { code: "SOLAS 1974, Chapter II‑1", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Probabilistic Method and Criteria",
        content: [
          "Probabilistic method: A = Σ(s × p), where s is the probability of survival after the damage and p is the probability of that damage occurring (depending on the length and position of the compartment).",
          "R is the \"required\" value given in the regulation's tables as a function of the ship's length.",
          "Criterion: A ≥ R must be satisfied; otherwise the subdivision/stability is considered inadequate.",
          "In the final damaged condition, including free surface and trim effects, the conditions for launching liferafts and for access must remain satisfied.",
          "The Damage Control Plan/Booklet must be on board; watertight doors, their remote controls and the sounding points must be shown on the plan.",
        ],
      },
    ],
  },
  {
    title: "Timber Deck Cargo Code — Deck Timber",
    source: { code: "2011 Timber Deck Cargo Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Deck Timber Cargo Requirements",
        content: [
          "The stack height/slope and the securing arrangements (stanchions, wires, hoops) must be verified by MSL based calculations.",
          "Operating instructions for heavy weather: deck drainage, deck access and visibility conditions must be maintained.",
          "For the sample loading conditions an additional safety margin over the IS Code criteria must be maintained.",
        ],
      },
    ],
  },
  {
    title: "IBC/IGC — Kimyasal ve Gaz Tankerleri",
    source: { code: "IBC Code / IGC Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Stability Requirements",
        content: [
          "The intact and damage stability requirements (survival capability) applicable to the cargo type must be satisfied.",
          "Every approved loading condition must be verified with the stability instrument; the model/verification certificates must be up to date.",
        ],
      },
      {
        subtitle: "Eklenebilecekler",
        content: [
          "Leakage scenarios: sensitivity analyses covering the free surface, KG change and heeling moment effects in the event of a cargo leak.",
          "Evaporation effects: methods that account for the effect of evaporation on mass/density and KG for volatile cargoes.",
        ],
      },
      {
        subtitle: "Items Requiring Update",
        content: [
          "Cargo types: additional stability requirements to be added for new chemical and gas cargo types (in line with the latest IBC/IGC amendments).",
        ],
      },
    ],
  },
  {
    title: "Polar Code — Polar Waters Operations",
    source: { code: "Polar Code (MSC.385(94))", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Polar Waters Requirements",
        content: [
          "The KG rise due to icing must be retained and an adequate GM and GZ margin maintained.",
          "The operational limitations and emergency procedures set out in the PWOM must be applied.",
        ],
      },
    ],
  },
  {
    title: "CSS Code (Annex 13) — Values Underlying CSM Lashing Calculations",
    source: { code: "CSS Code, Annex 13", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Lashing Calculation Values",
        content: [
          "Typical friction coefficients: steel/steel μ ≈ 0.10; steel/timber μ ≈ 0.30; timber/timber μ ≈ 0.40; rubber/steel μ ≈ 0.60 (assuming dry, grease-free surfaces).",
          "The MSL (Maximum Securing Load) and the acceleration factors (longitudinal, transverse, vertical) are selected from the Annex 13 tables according to the ship's length and service speed.",
        ],
      },
    ],
  },
  {
    title: "Stockholm Agreement — Ro‑Ro Passenger Ships (Regional Additional Requirements)",
    source: { code: "Stockholm Agreement (Ro‑Ro Passenger Ships)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Additional Damage Stability Requirements",
        content: [
          "Effect of water accumulation on the vehicle deck: typically taken into account with a water height of 0.50 m (according to the tables in the instrument) and an appropriate permeability.",
          "The condition A ≥ R must be maintained in the damage stability assessment including water accumulation; the liferaft/evacuation conditions must remain satisfied.",
        ],
      },
    ],
  },
  {
    title: "Fishing Vessels — Safety Code (2005/2012) and the Cape Town Agreement",
    source: { code: "FAO/ILO/IMO Code of Safety for Fishermen & Fishing Vessels (2005/2012); Cape Town Agreement (2012)", url: "https://www.imo.org/en/OurWork/Safety/Pages/CTA.aspx" },
    rules: [
      {
        subtitle: "Fishing Vessel Stability Requirements",
        content: [
          "The typical minimum initial GM (GM0) is ≥ 0.35 m (the Administration's instructions, which depend on length and design, govern).",
          "The GZ area criteria are largely consistent with the IS Code (e.g. 0°–30° ≥ 0.055 m·rad).",
          "An additional GM margin and operational limitations must be applied for low freeboard and icing risk.",
        ],
      },
    ],
  },
  {
    title: "OSV / SPS — Offshore Supply ve Special Purpose Ships",
    source: { code: "OSV Code (2006/2020); SPS Code (2008)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "OSV/SPS Stability Requirements",
        content: [
          "The IS Code criteria form the baseline; depending on the cargo and personnel density, Administrations generally require a minimum GM ≥ 0.15 m.",
          "Additional margins and operational limits are applied for cargo deck free surface and high KG effects.",
        ],
      },
    ],
  },
  {
    title: "HSC Code — High Speed Craft",
    source: { code: "HSC Code (1994/2000)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "High Speed Craft Requirements",
        content: [
          "Under the passenger crowding/turning test the static heel angle is typically limited to ≤ 10°.",
          "The minimum GM is ≥ 0.15 m in most configurations, but specific stability tests are applied depending on the speed, hull type and seakeeping requirements.",
        ],
      },
    ],
  },
  {
    title: "MODU Code — Mobile Offshore Drilling Units",
    source: { code: "MODU Code (2009)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "MODU Stability Requirements",
        content: [
          "Wind speeds: typically 36 m/s for the operating condition and an equivalent 51.5 m/s for the storm/survival condition; the heeling moment is taken accordingly.",
          "An adequate safety margin is demonstrated by comparing the righting and heeling moment curves; the range of positive stability and the air gap are checked.",
        ],
      },
    ],
  },
  {
    title: "Load Line (LL) — Links to the Load Line Convention",
    source: { code: "International Load Line Convention (1966/1988)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Freeboard and Downflooding Angle Links",
        content: [
          "The minimum freeboard and the integrity of hatches/superstructures, the downflooding angles and the possible paths of water ingress are limiting factors in the stability analysis.",
          "The downflooding angle in the stability booklet must be consistent with the ship's integrity conditions and must not conflict with the Load Line markings.",
        ],
      },
    ],
  },
];
