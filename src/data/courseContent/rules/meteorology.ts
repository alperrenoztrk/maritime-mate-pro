import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Meteoroloji kuralları.
 *
 * İçerik gerçek, kaynak gösterilmiş düzenlemelerden alınmıştır:
 *  - SOLAS V/34 (Voyage Planning) ve V/5 (Meteorological services)
 *  - IMO Weather Routing Guidelines
 *  - STCW VIII/2 (Watchkeeping)
 *  - WMO No.471 / GMDSS MSI (NAVTEX, SafetyNET)
 *  - Beaufort ölçeği ve tropik siklon kaçınma uygulamaları
 *
 * Uydurma kural yoktur; atıflar korunmuştur.
 */
export const meteorologyRules: RuleGroup[] = [
  {
    title: "SOLAS V — Passage Planning and Meteorological Services",
    source: {
      code: "SOLAS V/34 & V/5",
      detail: "Voyage Planning; Meteorological services and warnings",
    },
    rules: [
      {
        subtitle: "Meteorology in the Passage Plan",
        content: [
          "Current meteorological data must be used when preparing the passage plan.",
          "Weather forecasts and routeing recommendations must be taken into account.",
          "Alternative routes must be planned for severe weather conditions.",
          "Meteorological data and forecasts must be kept in the voyage plan file.",
        ],
      },
      {
        subtitle: "Observation and Reporting Obligations",
        content: [
          "A danger message must be broadcast when dangerous weather (storm, ice, tropical cyclone) is encountered (SOLAS V/31-32).",
          "Meteorological observations must be transmitted under the Voluntary Observing Ship (VOS) scheme.",
          "The barometer/barograph must be calibrated regularly and the pressure tendency monitored.",
        ],
      },
    ],
  },
  {
    title: "IMO Weather Routing Guidelines",
    source: {
      code: "IMO Weather Routing Guidelines",
      detail: "MSC/Circ. — weather routeing guidance",
    },
    rules: [
      {
        subtitle: "Weather Routeing",
        content: [
          "An avoidance plan is essential on routes where severe weather is expected.",
          "Weather routeing services should be used.",
          "Cargo safety and fuel economy must be balanced when selecting the route.",
        ],
      },
      {
        subtitle: "Tropical Cyclone Avoidance",
        content: [
          "The 1-2-3 rule: the danger circle is drawn by adding the 24/48/72 hour forecast error margin (100/200/300 nm).",
          "A distinction must be made between the dangerous semicircle and the navigable semicircle.",
          "The direction of the low pressure centre is determined by Buys Ballot's law (in the northern hemisphere, with the wind at your back the centre lies to the left).",
        ],
      },
    ],
  },
  {
    title: "STCW VIII/2 — Watchkeeping and Weather Monitoring",
    source: {
      code: "STCW VIII/2",
      detail: "Watchkeeping principles",
    },
    rules: [
      {
        subtitle: "Watchkeeping and Weather Monitoring",
        content: [
          "Bridge watchkeeping officers must continuously assess the meteorological data.",
          "Changes in the weather must be recorded in the deck log book.",
          "The master must be kept regularly informed of the weather conditions.",
          "Appropriate measures (speed, fog signals, radar) must be taken when the visibility falls.",
        ],
      },
    ],
  },
  {
    title: "MSI — NAVTEX, SafetyNET and Warnings",
    source: {
      code: "WMO No.471 / GMDSS MSI",
      detail: "Maritime Safety Information; WMO marine services",
    },
    rules: [
      {
        subtitle: "Meteorological Warnings and Notices",
        content: [
          "NAVTEX (518 kHz) warnings must be monitored.",
          "Gale (≥ Bf 8), storm and hurricane force warnings must be taken seriously.",
          "METAREA bulletins and Inmarsat SafetyNET broadcasts must be checked.",
          "Synoptic charts and analysis/forecast charts must be interpreted.",
        ],
      },
      {
        subtitle: "Beaufort Scale and Sea State",
        content: [
          "The wind force is reported on the Beaufort scale 0–12 and the sea state on the Douglas scale.",
          "Bf 8 (gale) ≈ 34–40 knot; Bf 10 (storm) ≈ 48–55 knot.",
          "Visibility codes and weather symbols are recorded using the standard WMO code.",
        ],
      },
    ],
  },
];
