import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Navigation rules.
 *
 * The content is taken verbatim from the real, cited regulations on the
 * src/pages/NavigationRules.tsx page:
 *  - COLREG 1972 (International Regulations for Preventing Collisions at Sea)
 *  - IALA Maritime Buoyage System
 *  - SOLAS Chapters IV / V, GMDSS
 *
 * No invented rules; the references (rule numbers) have been preserved.
 */
export const navigationRules: RuleGroup[] = [
  {
    title: "COLREG — International Regulations for Preventing Collisions at Sea",
    source: {
      code: "IMO COLREGs 1972",
      detail: "Consolidated Edition",
    },
    rules: [
      {
        subtitle: "Steering and Sailing Rules (Part B)",
        content: [
          "Rule 5 — Look-out: every vessel must at all times maintain a proper look-out by sight and hearing.",
          "Rule 6 — Safe Speed: every vessel must proceed at a safe speed that allows proper and effective action to be taken to avoid collision.",
          "Rule 7 — Risk of Collision: all available means must be used to determine whether a risk of collision exists; if the compass bearing does not appreciably change, a risk of collision is deemed to exist.",
          "Rule 8 — Action to Avoid Collision: any alteration of course and/or speed must be made in ample time, in accordance with good seamanship and be readily apparent.",
          "Rule 9 — Narrow Channels: vessels must keep as near to the starboard side of a narrow channel or fairway as is safe and practicable.",
          "Rule 10 — Traffic Separation Schemes (TSS): vessels must proceed in the appropriate traffic lane in the general direction of traffic flow.",
        ],
      },
      {
        subtitle: "Right of Way and Responsibilities",
        content: [
          "Rule 12 — Sailing Vessels: the vessel with the wind on the port side must keep out of the way of the vessel with the wind on the starboard side.",
          "Rule 13 — Overtaking: a vessel overtaking another must keep out of the way of the vessel being overtaken. A vessel approaching another from more than 22.5° abaft her beam (at night, from a position where only the sternlight is visible) is deemed to be overtaking.",
          "Rule 14 — Head-on Situation: when two power-driven vessels are meeting on reciprocal or nearly reciprocal courses, each must alter course to starboard.",
          "Rule 15 — Crossing Situation: when two power-driven vessels are crossing, the vessel which has the other on her own starboard side must keep out of the way.",
          "Rule 16 — Action by the Give-way Vessel: the give-way vessel must keep well clear of the other vessel, taking early and substantial action.",
          "Rule 17 — Action by the Stand-on Vessel: the stand-on vessel must keep her course and speed, but must take avoiding action herself if the give-way vessel is not taking appropriate action.",
          "Rule 18 — Responsibilities between Vessels: a power-driven vessel must keep out of the way of sailing vessels, vessels engaged in fishing, vessels restricted in their ability to manoeuvre and vessels constrained by their draught.",
          "Rule 19 — Conduct in Restricted Visibility: speed must be reduced to a safe speed; for a vessel detected by radar alone and forward of the beam, an alteration of course to port must be avoided (other than for a vessel being overtaken), as must an alteration of course towards a vessel abeam or abaft the beam.",
        ],
      },
    ],
  },
  {
    title: "Navigation Lights and Shapes",
    source: {
      code: "COLREG Part C",
      detail: "Lights and Shapes",
    },
    rules: [
      {
        subtitle: "Lights by Vessel Type",
        content: [
          "Power-driven vessel: masthead light, sidelights and sternlight.",
          "Vessels of 50 m and over: two masthead lights (fore and main), the lower one forward and the higher one aft.",
          "Sailing vessel: sidelights and sternlight only. Optional: red over green all-round lights at the masthead.",
          "Vessel at anchor: an all-round white light forward; vessels over 50 m also show an additional white light aft.",
          "Towing operation: additional masthead lights in a vertical line; three when the length of the tow exceeds 200 m.",
          "Restricted in ability to manoeuvre (RAM): red-white-red lights in a vertical line (or ball-diamond-ball by day).",
          "Not under command (NUC): two red lights in a vertical line (or two black balls by day).",
          "Fishing vessel: trawling — green over white in a vertical line; other fishing — red over white in a vertical line.",
          "Pilot vessel: white over red lights in a vertical line.",
        ],
      },
    ],
  },
  {
    title: "IALA Maritime Buoyage System",
    source: {
      code: "IALA Maritime Buoyage System",
    },
    rules: [
      {
        subtitle: "Lateral Marks",
        content: [
          "Lateral marks (Region A): port hand — red can, starboard hand — green cone.",
          "Lateral marks (Region B): the colours are reversed; port hand — green, starboard hand — red.",
        ],
      },
      {
        subtitle: "Cardinal Marks",
        content: [
          "Cardinal marks: black and yellow colouring and topmarks according to the quadrant (N-E-S-W) in which the danger lies.",
          "North cardinal: black above yellow; two cones pointing up. Pass to the north of the danger.",
          "South cardinal: yellow above black; two cones pointing down. Pass to the south of the danger.",
          "East cardinal: black-yellow-black; two cones base to base. Pass to the east.",
          "West cardinal: yellow-black-yellow; two cones point to point. Pass to the west.",
        ],
      },
      {
        subtitle: "Special Marks",
        content: [
          "Isolated danger mark: black with a red horizontal band; topmark of two black spheres.",
          "Safe water mark: red and white vertical stripes; topmark of a single red sphere. Mid-channel / landfall.",
          "Special marks: yellow with a yellow 'X' topmark. Military exercise areas, pipelines, cables etc.",
        ],
      },
    ],
  },
  {
    title: "Distress and Safety Signals",
    source: {
      code: "SOLAS Chapter IV, GMDSS, COLREG Annex IV",
    },
    rules: [
      {
        subtitle: "Sound and Radio Signals",
        content: [
          "MAYDAY: life and vessel in danger — transmitted on VHF Ch 16, 2182 kHz or with the DSC distress button.",
          "PAN PAN: an urgency situation without immediate danger — broadcast on VHF Ch 16.",
          "SECURITÉ: a navigational safety or meteorological warning — addressed to all stations.",
          "Distress signals: red flare, orange smoke, SOS (· · · — — — · · ·), continuous sounding of a whistle, flags N over C.",
        ],
      },
      {
        subtitle: "Emergency Equipment",
        content: [
          "EPIRB: 406 MHz emergency position indicating radio beacon, minimum 48 hour battery life, float-free.",
          "SART: 9 GHz radar transponder; appears as a line of 12 dots on the radar, range ~5 NM.",
        ],
      },
    ],
  },
  {
    title: "Passage Planning Rules",
    source: {
      code: "SOLAS V/34",
      detail: "IMO Resolution A.893(21)",
    },
    rules: [
      {
        subtitle: "Stages of the Passage Plan",
        content: [
          "The passage plan must cover the entire route from berth to berth.",
          "Appraisal: charts, navigational warnings, tides, weather and draft restrictions are reviewed.",
          "Planning: waypoints, no-go areas, abort points and turning circles are marked.",
          "Execution: the plan is carried out with the master's approval and updated when circumstances change.",
          "Monitoring: the position is continuously checked and the ETA, fuel and weather updates are made.",
        ],
      },
      {
        subtitle: "Under Keel Clearance and Squat",
        content: [
          "UKC (Under Keel Clearance): a minimum clearance of 10% of the draft or 0.6 m, whichever is greater, must be maintained. Port requirements may differ.",
          "Squat effect: the sinkage of the vessel in shallow water must be taken into account and the speed reduced if necessary.",
        ],
      },
    ],
  },
  {
    title: "Compass and Position Fixing Rules",
    source: {
      code: "SOLAS V/19",
      detail: "IMO Resolution A.382(X)",
    },
    rules: [
      {
        subtitle: "Compass and Position Verification",
        content: [
          "The magnetic compass deviation must be checked regularly and the deviation card kept up to date.",
          "The gyro compass error must be verified every watch and on entering/leaving port by celestial or terrestrial bearings.",
          "GPS fixes must be verified by independent means (radar, visual bearings).",
          "Charts (ECDIS or paper) must be kept up to date and the Notices to Mariners (NtM) corrections applied.",
          "AIS information must not be relied upon alone for navigational decisions.",
        ],
      },
    ],
  },
];
