import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Navigation rules and operational guidance.
 *
 * Regulatory statements are kept at principle level. Numerical limits that are
 * vessel-, port-, Administration- or SMS-specific are deliberately not presented
 * as universal IMO requirements.
 */
export const navigationRules: RuleGroup[] = [
  {
    title: "COLREG — International Regulations for Preventing Collisions at Sea",
    source: {
      code: "IMO COLREGs 1972",
      detail: "Consolidated requirements — always apply the full rule and its conditions",
    },
    rules: [
      {
        subtitle: "Steering and Sailing Rules (Part B)",
        content: [
          "Rule 5 — Look-out: every vessel must at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate to the prevailing circumstances and conditions.",
          "Rule 6 — Safe Speed: every vessel must proceed at a safe speed so that proper and effective action can be taken to avoid collision and the vessel can be stopped within a distance appropriate to the prevailing circumstances and conditions.",
          "Rule 7 — Risk of Collision: every vessel must use all available means appropriate to determine whether risk of collision exists. If there is any doubt, such risk is deemed to exist. Compass bearing is one indicator, not the sole test.",
          "Rule 8 — Action to Avoid Collision: action must be positive, made in ample time and with due regard to good seamanship. Alterations should be large enough to be readily apparent and their effectiveness must be checked until the other vessel is finally past and clear.",
          "Rule 9 — Narrow Channels: a vessel proceeding along a narrow channel or fairway must keep as near to the outer limit of the channel or fairway on her starboard side as is safe and practicable.",
          "Rule 10 — Traffic Separation Schemes (TSS): a vessel using a TSS must proceed in the appropriate traffic lane in the general direction of traffic flow and comply with the complete requirements of Rule 10.",
        ],
      },
      {
        subtitle: "Responsibilities between Vessels",
        content: [
          "Rule 12 — Sailing Vessels: when two sailing vessels are approaching one another so as to involve risk of collision, the vessel with the wind on the port side normally keeps out of the way of the vessel with the wind on the starboard side; the full rule also covers windward/leeward situations.",
          "Rule 13 — Overtaking: any vessel overtaking another must keep out of the way of the vessel being overtaken. If in doubt whether a vessel is overtaking, assume that she is and act accordingly.",
          "Rule 14 — Head-on Situation: when two power-driven vessels are meeting on reciprocal or nearly reciprocal courses so as to involve risk of collision, each must alter course to starboard so that they pass port-to-port.",
          "Rule 15 — Crossing Situation: when two power-driven vessels are crossing so as to involve risk of collision, the vessel which has the other on her own starboard side must keep out of the way and, if circumstances admit, avoid crossing ahead.",
          "Rule 16 — Action by the Give-way Vessel: the give-way vessel must, so far as possible, take early and substantial action to keep well clear.",
          "Rule 17 — Action by the Stand-on Vessel: the stand-on vessel initially keeps course and speed, may take action when it becomes apparent that the give-way vessel is not taking appropriate action, and must act when collision cannot be avoided by the give-way vessel alone.",
          "Rule 18 — Responsibilities between Vessels: apply the complete hierarchy subject to Rules 9, 10 and 13. A power-driven vessel underway generally keeps out of the way of NUC, RAM, fishing and sailing vessels; additional responsibilities apply to sailing and fishing vessels. A vessel constrained by her draught is treated in accordance with Rule 18(d), not as an unconditional stand-on category.",
          "Rule 19 — Restricted Visibility: Rule 19 applies to vessels not in sight of one another when navigating in or near restricted visibility. Proceed at a safe speed with engines ready for immediate manoeuvre and take avoiding action in accordance with the complete radar-contact provisions of the rule.",
        ],
      },
    ],
  },
  {
    title: "Navigation Lights and Shapes",
    source: {
      code: "COLREG Part C",
      detail: "Lights and Shapes — check vessel length, status and operation before applying a summary",
    },
    rules: [
      {
        subtitle: "Common Configurations",
        content: [
          "Power-driven vessel underway: masthead light or lights as required by vessel length, sidelights and sternlight.",
          "Power-driven vessels of 50 m and over normally exhibit two masthead lights, with the after masthead light higher than the forward one.",
          "Sailing vessel underway: sidelights and sternlight; additional optional red-over-green all-round lights may be shown where permitted by Rule 25.",
          "Vessel at anchor: lights and shapes depend on vessel length and the requirements of Rule 30.",
          "Towing operation: towing lights and shapes depend on tow length, vessel type and operation; three masthead lights in a vertical line are required when the length of the tow exceeds 200 m.",
          "Restricted in ability to manoeuvre (RAM): red-white-red all-round lights in a vertical line, or ball-diamond-ball by day, together with additional lights/shapes required by the vessel's operation and movement status.",
          "Not under command (NUC): two all-round red lights in a vertical line, or two black balls by day; when making way, sidelights and sternlight are also shown.",
          "Fishing vessel: trawling — green over white; fishing other than trawling — red over white, with additional requirements depending on whether the vessel is making way and whether gear extends more than 150 m horizontally.",
          "Pilot vessel engaged on pilotage duty: white over red all-round lights, plus the additional lights required by Rule 29 according to whether underway or at anchor.",
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
          "Lateral marks (Region A): port hand — red can, starboard hand — green cone when following the conventional direction of buoyage.",
          "Lateral marks (Region B): colours are reversed; port hand — green, starboard hand — red when following the conventional direction of buoyage.",
        ],
      },
      {
        subtitle: "Cardinal Marks",
        content: [
          "Cardinal marks use black/yellow colour patterns, black cone topmarks and characteristic white-light rhythms to indicate the safe side of a danger.",
          "North cardinal: black above yellow; two cones pointing up. Pass to the north of the danger.",
          "South cardinal: yellow above black; two cones pointing down. Pass to the south of the danger.",
          "East cardinal: black-yellow-black; two cones base to base. Pass to the east.",
          "West cardinal: yellow-black-yellow; two cones point to point. Pass to the west.",
        ],
      },
      {
        subtitle: "Other Marks",
        content: [
          "Isolated danger mark: black with one or more broad red horizontal bands; topmark of two black spheres.",
          "Safe water mark: red and white vertical stripes; topmark of a single red sphere where fitted.",
          "Special mark: yellow; topmark is a single yellow X where fitted. Its exact purpose must be established from the chart/publication rather than assumed from colour alone.",
        ],
      },
    ],
  },
  {
    title: "Distress and Safety Signals",
    source: {
      code: "SOLAS Chapter IV / GMDSS / COLREG Annex IV",
    },
    rules: [
      {
        subtitle: "Sound and Radio Signals",
        content: [
          "MAYDAY: used for distress when a ship, aircraft, other vehicle or person is threatened by grave and imminent danger and requires immediate assistance. DSC distress alerting is followed by distress traffic on the appropriate radiotelephony frequency/channel.",
          "PAN-PAN: urgency signal for a very urgent message concerning the safety of a ship, aircraft, other vehicle or person where distress priority is not justified.",
          "SÉCURITÉ: safety signal used for important navigational or meteorological warnings and other safety communications.",
          "Recognized visual distress signals include red rockets/flares, orange smoke and other signals listed in COLREG Annex IV. Do not use distress signals except for indicating distress and need of assistance.",
        ],
      },
      {
        subtitle: "Emergency Equipment",
        content: [
          "EPIRB: 406 MHz distress beacon used with the Cospas-Sarsat system; carriage, float-free arrangement, registration, testing and maintenance must match SOLAS/GMDSS and the approved equipment documentation.",
          "Radar SART operates in the 9 GHz X-band and produces a characteristic response on interrogating radar. AIS-SART is a separate locating device that transmits AIS search-and-rescue information.",
        ],
      },
    ],
  },
  {
    title: "Passage Planning Rules",
    source: {
      code: "SOLAS V/34",
      detail: "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    },
    rules: [
      {
        subtitle: "Stages of the Passage Plan",
        content: [
          "The voyage or passage plan must cover the entire voyage from berth to berth, including areas where a pilot will be used.",
          "Appraisal: gather and assess all information relevant to the intended voyage, including ship condition and limitations, charts/publications, warnings, tides, weather, traffic, pilotage and port information.",
          "Planning: plot the intended route and define the safety-critical elements needed for the passage, including safe speed, clearances, course alteration points, position-fixing methods and contingencies.",
          "Execution: execute the approved plan while considering equipment reliability, tide, weather, visibility and traffic; changes are made when circumstances require them.",
          "Monitoring: continuously monitor progress against the plan using appropriate primary and independent/secondary means where available.",
        ],
      },
      {
        subtitle: "Under Keel Clearance and Squat",
        content: [
          "UKC (Under Keel Clearance): IMO Resolution A.893(21) requires the passage plan to establish the minimum clearance required under the keel in critical restricted-depth areas; it does not prescribe a universal '10% of draft or 0.6 m' minimum.",
          "The required UKC must be determined from the ship's approved procedures/SMS and applicable Administration, company, port, terminal, VTS or pilotage requirements, taking account of charted depth and survey reliability, tide/water level, draught, squat, heel/list, trim, water density, waves and other relevant allowances.",
          "Squat and dynamic draught increase must be considered in restricted or shallow water and, where necessary, controlled by speed and route selection.",
        ],
      },
    ],
  },
  {
    title: "Compass and Position Fixing Rules",
    source: {
      code: "SOLAS Chapter V / STCW Code Section A-VIII/2",
      detail: "Apply bridge procedures, Master's standing orders and company SMS",
    },
    rules: [
      {
        subtitle: "Compass and Position Verification",
        content: [
          "Magnetic and gyro-compass errors should be determined sufficiently frequently and whenever circumstances require, using suitable means; observed errors must be allowed for and records kept in accordance with the ship's procedures.",
          "Do not present 'gyro error every watch' as a universal SOLAS interval: the practical frequency is governed by STCW watchkeeping principles together with the Master's orders and company SMS.",
          "GNSS positions should be cross-checked by independent means whenever practicable and especially where position accuracy is safety-critical.",
          "ECDIS/ENCs or paper charts and associated nautical publications must be kept appropriately up to date for the intended voyage.",
          "AIS information supports situational awareness but must not be used as the sole basis for collision-avoidance or navigational decisions.",
        ],
      },
    ],
  },
];
