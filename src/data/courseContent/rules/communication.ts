import type { RuleGroup } from "@/data/courseContent/types";

/**
 * GMDSS / radio communication rules.
 *
 * The content is based on real, cited regulations:
 *  - SOLAS Chapter IV (Global Maritime Distress and Safety System — GMDSS)
 *  - ITU Radio Regulations
 *  - IMO standart muhabere usulleri
 *
 * No invented rules; the statements are at principle level and accurate.
 */
export const communicationRules: RuleGroup[] = [
  {
    title: "GMDSS Sea Areas and Carriage Requirements",
    source: {
      code: "SOLAS Chapter IV",
      detail: "Global Maritime Distress and Safety System (GMDSS)",
      url: "https://www.imo.org/en/OurWork/Safety/Pages/RadiocommunicationsAndSearchAndRescue.aspx",
    },
    rules: [
      {
        subtitle: "Definition of the Sea Areas",
        content: [
          "A1: the area within the DSC (Digital Selective Calling) coverage of at least one VHF coast station; generally about 20-30 nautical miles from the coast.",
          "A2: the area, excluding A1, within the DSC coverage of at least one MF coast station; typically about 100-150 nautical miles from the coast.",
          "A3: the area, excluding A1 and A2, within the coverage of Inmarsat geostationary satellites (roughly between 70°N and 70°S).",
          "A4: the areas outside A1, A2 and A3, essentially the polar regions. HF communication is mandatory there.",
        ],
      },
      {
        subtitle: "Minimum Equipment Carriage by Sea Area",
        content: [
          "All ships carry VHF DSC, a NAVTEX receiver (in areas where the NAVTEX service is provided), a SART, portable VHF sets and a satellite EPIRB.",
          "A1: VHF DSC may be sufficient; ships proceeding beyond A1 additionally require MF or satellite equipment.",
          "A2: VHF + MF DSC equipment.",
          "A3: VHF + MF/HF, or a combination of VHF + MF + Inmarsat (satellite).",
          "A4: VHF + MF/HF DSC (HF is mandatory as there is no satellite coverage).",
        ],
      },
      {
        subtitle: "Basic GMDSS Functions",
        content: [
          "Transmission of distress alerts ship to shore, shore to ship and ship to ship.",
          "Arama-kurtarma (SAR) koordinasyon ve sahada (on-scene) muhabere.",
          "Locating signals (homing — SART, AIS-SART).",
          "Broadcast of Maritime Safety Information (MSI) and general communications.",
          "Bridge-to-bridge communications.",
        ],
      },
    ],
  },
  {
    title: "Distress, Urgency and Safety Communications",
    source: {
      code: "ITU Radio Regulations",
      detail: "Articles 32-33: distress, urgency and safety priorities",
    },
    rules: [
      {
        subtitle: "Order of Priority and Signal Words",
        content: [
          "MAYDAY (distress): indicates that a vessel or person is in grave and imminent danger and requires immediate assistance; it has the highest priority.",
          "PAN-PAN (urgency): indicates a very urgent message concerning the safety of a vessel or person without imminent danger (e.g. medical assistance, steering failure).",
          "SÉCURITÉ (safety): indicates messages concerning navigational safety or important meteorological warnings.",
          "The signal word is repeated three times at the start of the call.",
        ],
      },
      {
        subtitle: "MAYDAY Call Format",
        content: [
          "\"MAYDAY\" is spoken three times.",
          "\"THIS IS\" followed by the vessel's name/call sign/MMSI is repeated three times.",
          "The position of the vessel in distress is given (latitude/longitude, or a bearing and distance from a prominent point).",
          "The nature of the distress (fire, sinking, collision etc.) and the kind of assistance required are stated.",
          "The number of persons on board and any other useful information may be added; the message ends with \"OVER\".",
        ],
      },
      {
        subtitle: "Distress Frequencies",
        content: [
          "VHF Channel 16 (156.8 MHz): the radiotelephone distress, safety and calling frequency.",
          "VHF Channel 70 (156.525 MHz): used only for VHF DSC distress and safety calls; no voice communication.",
          "MF 2182 kHz: the radiotelephone distress frequency; MF 2187.5 kHz: the DSC distress frequency.",
          "Distress traffic control is normally exercised by the station coordinating the incident (RCC/CRS).",
        ],
      },
    ],
  },
  {
    title: "DSC, MSI ve NAVTEX",
    source: {
      code: "ITU Radio Regulations",
      detail: "The DSC system; IMO NAVTEX/MSI principles",
    },
    rules: [
      {
        subtitle: "Digital Selective Calling (DSC)",
        content: [
          "DSC is used to send distress alerts and establish calls with predefined digital messages; every station has a unique 9-digit MMSI number.",
          "After a distress alert is sent, communications are moved to an appropriate working frequency (VHF 16 or MF 2182 kHz).",
          "Where possible, the nature of the distress and the vessel's position should be entered manually; otherwise the system sends an \"undesignated\" alert.",
        ],
      },
      {
        subtitle: "NAVTEX and Maritime Safety Information (MSI)",
        content: [
          "NAVTEX is an automatic narrow band direct printing (NBDP) service on 518 kHz (international, in English) and 490 kHz (in the national language).",
          "Typical coverage is about 200-400 nautical miles from the coast; messages with the identifiers A, B, C, D and L (navigational/meteorological warnings, SAR information) cannot be rejected and are always printed.",
          "Offshore MSI is provided in areas A3/A4 by the satellite based Enhanced Group Call (EGC / SafetyNET) service.",
        ],
      },
    ],
  },
  {
    title: "EPIRB / SART, the Radio Log and False Alerts",
    source: {
      code: "SOLAS Chapter IV",
      detail: "Regulations 15-17: maintenance, watchkeeping and records; ITU procedures",
    },
    rules: [
      {
        subtitle: "EPIRB and SART Carriage and Testing",
        content: [
          "The satellite EPIRB operates through the 406 MHz Cospas-Sarsat system; it is buoyant, fitted with a float-free arrangement and activates automatically when immersed.",
          "The SART (Search and Rescue Transponder) shows the position of the liferaft/vessel as a line of dots on a 9 GHz (X-band) radar display; an AIS-SART instead broadcasts the position over AIS.",
          "The EPIRB and SART are tested regularly using the built-in test function; the battery expiry date and the release mechanism are checked periodically.",
        ],
      },
      {
        subtitle: "Radio Watchkeeping and the Log",
        content: [
          "While at sea, ships maintain a continuous watch on VHF Channel 70, on MF/HF DSC 2187.5 kHz in the relevant areas, and on satellite EGC.",
          "GMDSS related events are entered in the Radio Log: summaries of distress/urgency/safety traffic, equipment tests, battery checks and significant incidents.",
          "To keep the equipment operational, the appropriate method is chosen from at-sea repair, shore-based maintenance or duplication of equipment.",
        ],
      },
      {
        subtitle: "Cancelling a False Distress Alert",
        content: [
          "If a distress alert is transmitted inadvertently it must be cancelled immediately; the alert must never be ignored.",
          "A false DSC alert is cancelled by voice on the relevant frequency (e.g. VHF 16), giving the vessel's name, call sign/MMSI and the words \"cancel my distress alert\".",
          "False alerts sent via Inmarsat or an EPIRB are cancelled by notifying the relevant coast control station/RCC.",
        ],
      },
    ],
  },
];
