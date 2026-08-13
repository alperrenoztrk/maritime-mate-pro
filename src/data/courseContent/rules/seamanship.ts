import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Seamanship rules.
 *
 * The content is taken from real, cited regulations:
 *  - COLREG 1972 Part B (steering and sailing rules) and Parts C/D (lights, shapes)
 *  - Anchoring and mooring (good seamanship, OCIMF MEG4)
 *  - ISM Code (safety management)
 *  - ISPS Code (ship and port facility security)
 *  - Port and terminal instructions, VTS
 *
 * No invented rules; the references have been preserved.
 */
export const seamanshipRules: RuleGroup[] = [
  {
    title: "COLREG Part B — Steering and Sailing Rules",
    source: {
      code: "COLREG 1972",
      detail: "Part B — Steering and Sailing Rules",
    },
    rules: [
      {
        subtitle: "In Any Condition of Visibility (Rules 4-10)",
        content: [
          "Rule 5: a proper look-out must be maintained at all times.",
          "Rule 6: the vessel must proceed at a safe speed.",
          "Rule 7: the risk of collision must be properly assessed (if in doubt, such risk is deemed to exist).",
          "Rule 8: action to avoid collision must be timely, apparent and substantial.",
          "Rules 9-10: the rules for narrow channels and traffic separation schemes (TSS) must be observed.",
        ],
      },
      {
        subtitle: "Vessels in Sight of One Another (Rules 11-18)",
        content: [
          "Rule 13: the overtaking vessel keeps out of the way.",
          "Rule 14: in a head-on situation both vessels alter course to starboard.",
          "Rule 15: in a crossing situation the vessel which has the other on her starboard side gives way.",
          "Rules 16-17: the obligations of the give-way and stand-on vessels must be applied clearly.",
        ],
      },
    ],
  },
  {
    title: "COLREG Parts C/D — Lights, Shapes and Sound Signals",
    source: {
      code: "COLREG 1972",
      detail: "Part C (Lights and Shapes), Part D (Sound and Light Signals)",
    },
    rules: [
      {
        subtitle: "Lights and Shapes",
        content: [
          "The visibility ranges and sectors of the navigation lights (Rules 21-22) must be complied with.",
          "The signals for vessels restricted in their ability to manoeuvre and not under command (Rule 27) must be displayed correctly.",
          "The day shapes (ball, cone, cylinder, diamond) must be used appropriately.",
        ],
      },
      {
        subtitle: "Sound and Light Signals",
        content: [
          "Manoeuvring and warning signals (Rule 34): one short blast = altering to starboard, two short = altering to port, five short = doubt/warning.",
          "Sound signals in restricted visibility (Rule 35) must be given at regular intervals.",
        ],
      },
    ],
  },
  {
    title: "Anchoring and Mooring — Good Seamanship",
    source: {
      code: "OCIMF MEG4 / Good Seamanship",
      detail: "Mooring Equipment Guidelines; anchoring and mooring practice",
    },
    rules: [
      {
        subtitle: "Demirleme",
        content: [
          "The anchor cable is normally veered to 5–7 times the water depth (increased for weather and current).",
          "Anchor dragging must be monitored and action taken when the alarm is raised.",
          "A suitable anchorage must be selected taking the swinging circle and the traffic into account.",
        ],
      },
      {
        subtitle: "Mooring",
        content: [
          "Lines must be selected in accordance with the MBL/SWL and the line management plan (MEG4).",
          "Snap-back zones must be marked and personnel kept clear of them.",
          "Mixed mooring (lines of different elasticity used together) must be avoided.",
        ],
      },
    ],
  },
  {
    title: "ISM Code — Safe Operation",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code",
    },
    rules: [
      {
        subtitle: "Safe Operation Management",
        content: [
          "The Safety Management System (SMS) and the operational procedures must be implemented.",
          "A pre-operation risk assessment and a permit to work are mandatory.",
          "Near miss reporting and internal audits must be carried out regularly.",
        ],
      },
    ],
  },
  {
    title: "ISPS Code",
    source: {
      code: "ISPS Code",
      detail: "International Ship and Port Facility Security Code",
    },
    rules: [
      {
        subtitle: "Ship Security Requirements",
        content: [
          "The security levels (1, 2, 3) must be monitored.",
          "The Ship Security Plan (SSP) and deck access controls must be implemented.",
          "A Declaration of Security (DOS) must be completed when required.",
        ],
      },
    ],
  },
  {
    title: "Port, VTS and Pilotage",
    source: {
      code: "SOLAS V/11-12; IMO VTS Guidelines",
      detail: "Res. A.857(20); port and terminal regulations",
    },
    rules: [
      {
        subtitle: "Port Operations and Reporting",
        content: [
          "The Port Information Book and the local regulations must be checked.",
          "The pilotage and towage requirements must be complied with and a pilot/master exchange carried out.",
          "The VTS reporting requirements (entry/exit, position) must be fulfilled.",
          "Environmental restrictions (discharges, ballast) must be taken into account.",
        ],
      },
    ],
  },
];
