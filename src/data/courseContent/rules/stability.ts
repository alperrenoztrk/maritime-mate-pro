import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Stability regulatory reference.
 *
 * General criteria are shown only where they are broadly applicable. Ship-type,
 * construction-date, cargo and Administration-specific criteria must be checked
 * against the approved stability information/loading instrument and the current
 * applicable IMO instrument.
 */
export const stabilityRules: RuleGroup[] = [
  {
    title: "2008 IS Code — Intact Stability",
    source: {
      code: "IMO 2008 IS Code (MSC.267(85), as amended)",
      url: "https://www.imo.org/en/OurWork/Safety/Pages/ShipDesignAndStability-default.aspx",
    },
    rules: [
      {
        subtitle: "General Criteria — Use with the Approved Stability Information",
        content: [
          "For ships to which the general 2008 IS Code criteria apply, the area under the GZ curve should not be less than 0.055 m·rad up to 30° and 0.090 m·rad up to 40°, or the downflooding angle if that angle is less than 40°; the area between 30° and 40° (or the downflooding angle if less than 40°) should not be less than 0.030 m·rad.",
          "The righting lever (GZ) should be at least 0.20 m at an angle of heel equal to or greater than 30° where this general criterion is applicable.",
          "The initial transverse metacentric height GM₀ should not be less than 0.15 m under the general criterion, but meeting GM alone never proves that a loading condition is compliant.",
          "The maximum righting-lever angle and any alternative criteria must be checked against the current amended 2008 IS Code and the ship's approved stability documentation; do not infer compliance from one isolated GZ/GM value.",
          "Downflooding openings, free-surface corrections, trim, loading condition, icing where applicable and any ship-type-specific criteria must be included exactly as required by the approved stability booklet/loading computer.",
        ],
      },
      {
        subtitle: "Severe Wind and Rolling Criterion (Weather Criterion)",
        content: [
          "The weather criterion evaluates the combined effects of steady beam wind, rolling to windward and a gust wind heeling lever; it is not a generic 'wind speed 26–40 m/s' check.",
          "Under the criterion, the steady-wind equilibrium angle φ₀ should not exceed 16° or 80% of the deck-edge immersion angle, whichever is less, subject to the full Code method and any applicable Administration provisions.",
          "The energy-area requirement is expressed by the Code as area b being equal to or greater than area a on the prescribed GZ/heeling-lever construction; it is not a universal '40% residual margin' rule.",
          "Use the ship's approved stability software/booklet for weather-criterion compliance. A simplified calculator without the complete approved inputs must not return 'compliant'.",
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
          "For grain cargoes, verify the loading condition against the International Grain Code and the ship's approved grain loading information/Document of Authorization where required.",
          "The corrected initial GM, heel caused by assumed grain shift and residual stability area must satisfy the applicable Grain Code criteria after all required free-surface and grain-shift corrections.",
          "Do not use a generic GM value alone as proof of grain compliance; the complete approved grain calculation and loading condition govern.",
        ],
      },
    ],
  },
  {
    title: "SOLAS II-1 — Subdivision and Damage Stability",
    source: { code: "SOLAS 1974, Chapter II-1", url: "https://www.imo.org/en/OurWork/Safety/Pages/ShipDesignAndStability-default.aspx" },
    rules: [
      {
        subtitle: "Probabilistic Damage Stability",
        content: [
          "For ships subject to the probabilistic subdivision and damage-stability framework, the attained subdivision index A must be not less than the required subdivision index R, using the calculation method applicable to the ship.",
          "Damage-stability verification includes the relevant survival factors, flooding stages, permeability, free-surface effects, trim, heel, watertight integrity and other conditions prescribed by SOLAS II-1 and the approved damage-stability information.",
          "A and R are not practical stand-alone onboard hand-calculation criteria; use the ship's approved stability documentation/instrument and the correct construction-date applicability.",
          "Damage Control Plan/Booklet information and watertight closing arrangements must remain consistent with the approved subdivision and damage-control documentation.",
        ],
      },
    ],
  },
  {
    title: "Timber Deck Cargo Code",
    source: { code: "2011 Timber Deck Cargo Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Deck Timber Cargo",
        content: [
          "Timber deck cargo introduces loading, securing, visibility, access, drainage, windage and stability considerations that must be assessed under the Timber Deck Cargo Code and the ship's approved Cargo Securing Manual/stability information.",
          "Do not apply generic stack-height, lashing or stability-margin values without the vessel-specific approved arrangement and the Code provisions applicable to the voyage and cargo.",
        ],
      },
    ],
  },
  {
    title: "IBC / IGC — Chemical and Gas Tankers",
    source: { code: "IBC Code / IGC Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Stability Requirements",
        content: [
          "Chemical and gas tankers must satisfy the intact and damage-stability requirements applicable to the ship and products carried under the relevant IBC/IGC Code provisions and SOLAS.",
          "Verify each operational loading condition with the approved loading/stability instrument and the vessel's approved loading manual; cargo density, free surface, filling restrictions and damage assumptions are product/ship specific.",
          "Do not introduce generic leakage or evaporation formulas as regulatory stability criteria unless they are part of the ship's approved design or loading method.",
        ],
      },
    ],
  },
  {
    title: "Polar Code — Polar Waters Operations",
    source: { code: "International Code for Ships Operating in Polar Waters (Polar Code)", url: "https://www.imo.org/en/OurWork/Safety/Pages/polar-code.aspx" },
    rules: [
      {
        subtitle: "Polar Stability Considerations",
        content: [
          "Where icing allowances or other polar operational limitations apply, include them in stability assessment exactly as required by the applicable Polar Code provisions, Administration requirements and the ship's approved Polar Water Operational Manual (PWOM).",
          "Operational limitations in the PWOM and stability documentation take precedence over generic icing/GM assumptions.",
        ],
      },
    ],
  },
  {
    title: "CSS Code / Cargo Securing Manual",
    source: { code: "Code of Safe Practice for Cargo Stowage and Securing (CSS Code)", url: "https://www.imo.org/en/OurWork/Safety/Pages/CSS-Code.aspx" },
    rules: [
      {
        subtitle: "Securing Calculations",
        content: [
          "Use the securing method, acceleration assumptions, friction coefficients, MSL/CS values and safety factors prescribed by the applicable CSS Code method and the ship's approved Cargo Securing Manual.",
          "Friction coefficients and securing capacities are condition- and material-dependent; a generic coefficient must not be presented as universally valid for all surfaces, contamination states or securing arrangements.",
        ],
      },
    ],
  },
  {
    title: "Ro-Ro Passenger Ships — Regional/Additional Damage Stability",
    source: { code: "SOLAS / applicable regional instruments such as the Stockholm Agreement", url: "https://www.imo.org/en/OurWork/Safety/Pages/ShipDesignAndStability-default.aspx" },
    rules: [
      {
        subtitle: "Additional Requirements",
        content: [
          "Ro-ro passenger ships may be subject to additional regional damage-stability requirements, including assessment of water accumulation on the ro-ro deck. Applicability depends on ship, service and regional instrument.",
          "Do not apply a single assumed water height or A/R statement outside the exact method and applicability of the governing instrument and approved stability information.",
        ],
      },
    ],
  },
  {
    title: "Fishing Vessels",
    source: { code: "Applicable fishing-vessel safety instrument / Administration requirements", url: "https://www.imo.org/en/OurWork/Safety/Pages/FishingVessels-default.aspx" },
    rules: [
      {
        subtitle: "Fishing Vessel Stability",
        content: [
          "Fishing-vessel stability criteria depend on vessel length, design, operating area and the instrument or Administration requirements applicable to that vessel.",
          "Do not present a generic GM ≥ 0.35 m as a universal fishing-vessel rule. Use the approved stability information and the exact flag/Administration criteria.",
        ],
      },
    ],
  },
  {
    title: "OSV / SPS — Offshore Supply and Special Purpose Ships",
    source: { code: "Applicable OSV/SPS/IS Code requirements", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "OSV/SPS Stability",
        content: [
          "Offshore supply and special-purpose ships require stability assessment against the exact IMO/Administration code applicable to the vessel, including any criteria associated with deck cargo, liquids carried in bulk, personnel and special operations.",
          "Do not treat GM ≥ 0.15 m as a universal OSV/SPS operational acceptance criterion; the approved stability booklet/loading computer and vessel-specific limitations govern.",
        ],
      },
    ],
  },
  {
    title: "HSC Code — High-Speed Craft",
    source: { code: "1994/2000 HSC Code as applicable", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "High-Speed Craft",
        content: [
          "High-speed craft use dedicated HSC Code intact/damage-stability and operational criteria that depend on craft type and design.",
          "Do not use a generic GM or heel-angle number as a substitute for the approved HSC stability assessment and operating limitations.",
        ],
      },
    ],
  },
  {
    title: "MODU Code — Mobile Offshore Drilling Units",
    source: { code: "2009 MODU Code as applicable", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "MODU Stability",
        content: [
          "MODU stability is evaluated using unit-specific righting/heeling characteristics, environmental criteria, operating/survival conditions and approved operating manuals under the applicable MODU Code and coastal/flag requirements.",
          "Generic wind speeds or air-gap statements must not be used as universal operational limits outside the exact approved MODU criteria.",
        ],
      },
    ],
  },
  {
    title: "Load Line Convention — Freeboard and Downflooding",
    source: { code: "International Convention on Load Lines, 1966 / 1988 Protocol, as amended", url: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Load-Lines.aspx" },
    rules: [
      {
        subtitle: "Links to Stability",
        content: [
          "Freeboard, closing appliances, weathertight/watertight integrity and downflooding points interact directly with the assumptions used in the approved stability assessment.",
          "Use the downflooding angle and integrity conditions defined by the approved stability information; do not infer them from deck-edge immersion or Load Line marks alone.",
        ],
      },
    ],
  },
];
