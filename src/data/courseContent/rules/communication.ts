import type { RuleGroup } from "@/data/courseContent/types";

/**
 * GMDSS / radio communication rules.
 *
 * Sea-area definitions and watchkeeping wording reflect the modernized GMDSS
 * framework in force from 1 January 2024. Exact carriage and duplication
 * arrangements depend on SOLAS chapter IV applicability and the ship's approved
 * radio installation.
 */
export const communicationRules: RuleGroup[] = [
  {
    title: "GMDSS Sea Areas and Carriage Requirements",
    source: {
      code: "SOLAS Chapter IV",
      detail: "Modernized GMDSS; see current IMO GMDSS guidance and COMSAR.1/Circ.32/Rev.3",
      url: "https://www.imo.org/en/OurWork/Safety/Pages/RadiocommunicationsAndSearchAndRescue.aspx",
    },
    rules: [
      {
        subtitle: "Definition of the Sea Areas",
        content: [
          "A1: an area within the radiotelephone coverage of at least one VHF coast station in which continuous DSC alerting is available, as defined by a Contracting Government.",
          "A2: an area, excluding A1, within the radiotelephone coverage of at least one MF coast station in which continuous DSC alerting is available, as defined by a Contracting Government.",
          "A3: an area, excluding A1 and A2, within the coverage of a recognized mobile satellite service supported by the ship earth station carried on board, in which continuous alerting is available.",
          "A4: an area outside A1, A2 and A3.",
          "Do not define A3 solely as 'Inmarsat coverage between about 70°N and 70°S'. IMO recognizes more than one mobile satellite system for GMDSS and the operational A3 area depends on the recognized service supported by the ship earth station carried.",
        ],
      },
      {
        subtitle: "Carriage Principle by Sea Area",
        content: [
          "All SOLAS ships to which chapter IV applies carry the GMDSS equipment required by the applicable sea area and regulations, including VHF DSC capability, distress locating equipment, portable survival-craft communications and means to receive Maritime Safety Information (MSI) and SAR-related information.",
          "A1 operation relies on VHF DSC/radiotelephony together with the other chapter IV equipment applicable to the ship.",
          "A2 operation additionally requires the applicable MF DSC/radiotelephony capability or another arrangement permitted by current SOLAS chapter IV.",
          "A3 operation requires a recognized mobile satellite service ship earth station and/or other radio installation as permitted by the current SOLAS chapter IV carriage options and duplication requirements.",
          "A4 operation requires MF/HF capability with the applicable DSC watchkeeping arrangements because the ship is outside A1, A2 and the supported A3 recognized mobile satellite service coverage.",
          "The exact primary/duplicate equipment arrangement must be checked against the ship's sea-area certificate, approved radio installation and current SOLAS chapter IV requirements; this summary is not a carriage compliance checklist.",
        ],
      },
      {
        subtitle: "Basic GMDSS Functions",
        content: [
          "Transmission and reception of distress alerts by the methods required for the sea area and equipment fitted.",
          "Search-and-rescue (SAR) coordinating communications and on-scene communications.",
          "Locating and homing functions using approved search-and-rescue locating devices such as radar SART or AIS-SART, as fitted.",
          "Reception of Maritime Safety Information (MSI) and SAR-related information.",
          "General radiocommunications and bridge-to-bridge communications.",
        ],
      },
    ],
  },
  {
    title: "Distress, Urgency and Safety Communications",
    source: {
      code: "ITU Radio Regulations",
      detail: "Distress, urgency and safety priorities and procedures",
    },
    rules: [
      {
        subtitle: "Order of Priority and Signal Words",
        content: [
          "MAYDAY (distress): indicates grave and imminent danger to a ship, aircraft, other vehicle or person and a requirement for immediate assistance; distress has the highest priority.",
          "PAN-PAN (urgency): indicates a very urgent message concerning the safety of a ship, aircraft, other vehicle or person where distress priority is not justified.",
          "SÉCURITÉ (safety): indicates an important navigational or meteorological warning or another safety communication.",
          "The spoken signal word is normally repeated three times at the start of the radiotelephony call in accordance with the applicable procedure.",
        ],
      },
      {
        subtitle: "MAYDAY Message Content",
        content: [
          "A radiotelephony distress call/message identifies the distress priority, the station in distress and its position, then states the nature of distress and assistance required.",
          "Include persons on board and other information useful to SAR when relevant and available.",
          "Where a DSC distress alert has been transmitted, the subsequent distress traffic is conducted on the associated radiotelephony frequency/channel or other frequency directed by the coordinating station.",
        ],
      },
      {
        subtitle: "Common Distress and Calling Frequencies",
        content: [
          "VHF Channel 70 (156.525 MHz): DSC only; voice traffic is not permitted on Channel 70.",
          "VHF Channel 16 (156.8 MHz): radiotelephony distress, urgency, safety and calling in accordance with the Radio Regulations and local requirements.",
          "MF 2187.5 kHz: DSC distress and safety frequency; MF 2182 kHz: associated radiotelephony distress and safety frequency.",
          "MF/HF GMDSS uses additional DSC and radiotelephony frequencies. The frequencies watched and used depend on sea area, time, position, equipment and the current GMDSS watchkeeping requirements.",
        ],
      },
    ],
  },
  {
    title: "DSC, MSI and NAVTEX",
    source: {
      code: "ITU Radio Regulations / IMO NAVTEX Manual",
      detail: "DSC procedures; MSI reception; NAVTEX Manual 2023 framework",
    },
    rules: [
      {
        subtitle: "Digital Selective Calling (DSC)",
        content: [
          "DSC is used for automated alerting and call establishment for distress, urgency, safety and routine communications as applicable. Maritime stations are identified by an MMSI.",
          "A DSC distress alert is followed by distress communications on the appropriate associated frequency/channel unless another working frequency is directed.",
          "Position and time should be supplied automatically from the ship's navigation source where required and verified; nature of distress is selected when time and circumstances permit.",
        ],
      },
      {
        subtitle: "NAVTEX and Maritime Safety Information (MSI)",
        content: [
          "NAVTEX is an automatic service for promulgation of MSI and SAR-related information. International NAVTEX normally uses 518 kHz in English; other frequencies/services may be used for national NAVTEX.",
          "NAVTEX subject indicator characters A (navigational warnings), B (meteorological warnings), D (SAR information and piracy/armed-attack warnings) and L (additional navigational warnings) cannot be deselected on compliant receivers.",
          "Subject indicator C (ice reports) is not one of the mandatory non-deselectable categories; it may be deselected where the receiver and operational requirements permit.",
          "Outside NAVTEX coverage, MSI and SAR-related information may be received through the recognized mobile satellite service or other approved means fitted for the ship and sea area (for example SafetyNET/SafetyCast services as applicable).",
        ],
      },
    ],
  },
  {
    title: "EPIRB / SART, Radio Watchkeeping and False Alerts",
    source: {
      code: "SOLAS Chapter IV / ITU Radio Regulations",
      detail: "Current GMDSS watchkeeping, records, maintenance and false-alert procedures",
    },
    rules: [
      {
        subtitle: "EPIRB and Search-and-Rescue Locating Devices",
        content: [
          "406 MHz satellite EPIRBs operate through the Cospas-Sarsat system and must be registered, maintained and tested in accordance with the approved equipment instructions and applicable SOLAS requirements.",
          "Radar SART responds to 9 GHz X-band radar interrogation. AIS-SART is a different device and transmits search-and-rescue locating information over AIS.",
          "Built-in tests must be performed only in the approved test mode. Battery and float-free/release arrangements are checked against their marked expiry/service dates and the ship's maintenance schedule.",
        ],
      },
      {
        subtitle: "Radio Watchkeeping and the Log",
        content: [
          "At sea, maintain the radio watches required by SOLAS chapter IV for the equipment and sea area. VHF DSC watch on Channel 70 is a core requirement for SOLAS GMDSS ships.",
          "Where MF DSC watch is required, 2187.5 kHz is monitored. For A4 MF/HF installations, continuous DSC watch includes 2187.5 kHz and 8414.5 kHz and, depending on time of day and geographical position, at least one of 4207.5, 6312, 12577 or 16804.5 kHz, in accordance with current GMDSS requirements.",
          "Maintain the required means of receiving MSI and SAR-related information for the area in which the ship is navigating.",
          "Enter distress, urgency and safety communications and other records required by SOLAS/Radio Regulations/ship procedures in the radio log, including relevant equipment tests and defects.",
          "Maintenance availability is achieved by the methods applicable to the ship, such as duplication of equipment, shore-based maintenance and/or at-sea electronic maintenance as required by the regulations and sea area.",
        ],
      },
      {
        subtitle: "Cancelling a False Distress Alert",
        content: [
          "An inadvertently transmitted distress alert must be cancelled promptly using the procedure applicable to the equipment and service; it must not simply be ignored.",
          "For a VHF/MF/HF DSC false alert, reset the equipment as appropriate and broadcast a cancellation on the associated distress radiotelephony frequency/channel, identifying the ship and the false alert in accordance with the prescribed procedure.",
          "For satellite or EPIRB false alerts, notify the appropriate coast station, service provider and/or RCC using the approved cancellation procedure as soon as possible.",
        ],
      },
    ],
  },
];
