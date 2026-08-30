import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Seamanship and operational reference.
 *
 * Company SMS, Master/Pilot orders, approved mooring/DP documentation and local
 * port/terminal requirements remain the operational authority. Industry guidance
 * is not converted into universal statutory limits.
 */
export const seamanshipRules: RuleGroup[] = [
  {
    title: "COLREG Part B — Steering and Sailing Rules",
    classification: "REGULATORY",
    source: {
      code: "COLREG 1972",
      detail: "Part B — Steering and Sailing Rules; apply the full rules and their interactions",
      authority: ["IMO"],
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "In Any Condition of Visibility (Rules 4–10)",
        content: [
          "Rule 5: maintain a proper look-out by sight and hearing as well as by all available means appropriate to the prevailing circumstances and conditions.",
          "Rule 6: proceed at a safe speed determined from all factors required by the rule; no single numeric speed is universally safe.",
          "Rule 7: use all available means appropriate to determine risk of collision. If there is any doubt, such risk is deemed to exist.",
          "Rule 8: action to avoid collision must be positive, made in ample time and with due regard to good seamanship; its effectiveness must be checked until the other vessel is finally past and clear.",
          "Rules 9 and 10: apply the complete narrow-channel/fairway and traffic-separation-scheme requirements where applicable.",
        ],
      },
      {
        subtitle: "Vessels in Sight of One Another (Rules 11–18)",
        content: [
          "Rule 13: any vessel overtaking another keeps out of the way of the vessel being overtaken; if in doubt whether overtaking, assume that it is.",
          "Rule 14: when two power-driven vessels meet on reciprocal or nearly reciprocal courses so as to involve risk of collision, each alters course to starboard so that they pass port-to-port.",
          "Rule 15: when two power-driven vessels cross so as to involve risk of collision, the vessel having the other on her starboard side keeps out of the way and, if circumstances admit, avoids crossing ahead.",
          "Rules 16–17: the give-way vessel must take early and substantial action; the stand-on vessel's rights and duties change as the situation develops, so Rule 17 must be applied in full rather than reduced to 'maintain course and speed'.",
          "Rule 18 responsibilities are subject to the interactions with Rules 9, 10 and 13 and must not be treated as an unconditional hierarchy in every encounter.",
        ],
      },
    ],
  },
  {
    title: "COLREG Parts C/D — Lights, Shapes and Sound Signals",
    classification: "REGULATORY",
    source: {
      code: "COLREG 1972",
      detail: "Parts C and D — use vessel length, status and operation before applying a summary",
      authority: ["IMO"],
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "Lights and Shapes",
        content: [
          "Navigation-light sectors, ranges and combinations depend on vessel length, type, status and activity. Verify the complete applicable rule before identifying or displaying a configuration.",
          "Restricted-in-ability-to-manoeuvre (RAM), not-under-command (NUC), towing, fishing, pilotage, anchoring and aground conditions each carry distinct combinations and additional requirements when making way.",
          "Day shapes such as ball, cone, cylinder and diamond have defined meanings and arrangements; do not infer vessel status from one isolated shape without the complete configuration.",
        ],
      },
      {
        subtitle: "Sound and Light Signals",
        content: [
          "Rule 34 manoeuvring signals apply in the circumstances defined by the rule: one short blast indicates 'I am altering my course to starboard' and two short blasts indicate 'I am altering my course to port'.",
          "At least five short and rapid blasts are the doubt/danger signal when vessels in sight are approaching and one vessel fails to understand the other's intentions/actions or doubts whether sufficient action is being taken.",
          "Rule 35 restricted-visibility signals depend on vessel status and movement and are sounded at the intervals prescribed by the rule; do not reduce the rule to one generic fog signal.",
        ],
      },
    ],
  },
  {
    title: "Anchoring and Mooring — Vessel-Specific Good Seamanship",
    classification: "OPERATIONAL",
    source: {
      code: "OCIMF MEG4 / vessel SMS / approved mooring documentation",
      detail: "Mooring arrangements and line management are vessel-, berth- and condition-specific",
      authority: ["OCIMF", "Company SMS", "Vessel approved documentation"],
      applicability: {
        summary: "Apply the vessel's mooring arrangement, line management plan and port/terminal requirements to the actual berth and environmental conditions.",
      },
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "Anchoring",
        content: [
          "Anchor-cable scope is not a universal '5–7 times water depth' rule. Required scope depends on water depth, available swinging room, holding ground, anchor/cable characteristics, wind/current/waves, expected weather, vessel condition and the Master's/company procedures.",
          "Select the anchorage using charted hazards, depth/UKC, swinging circle, traffic, subsea infrastructure, prohibited areas, local/VTS requirements and contingency options.",
          "After anchoring, establish position and monitor for dragging using independent methods appropriate to the situation, including visual/radar bearings, GNSS/ECDIS monitoring, depth/trend and other available means.",
          "If dragging is suspected or confirmed, follow the Master's standing orders and vessel contingency procedure promptly; do not rely on an app alarm threshold as the sole trigger for action.",
        ],
      },
      {
        subtitle: "Mooring",
        content: [
          "Use the ship's Mooring System Management Plan, Line Management Plan and approved arrangement where applicable. Line type, MBL/MBLsd, winch brake settings, leads, fittings and condition must match the vessel's system design and management process.",
          "Do not mark or treat small fixed 'snap-back zones' as the only danger areas. Current OCIMF guidance emphasizes that snap-back can be complex and recommends managing the mooring deck as a broader danger zone rather than creating a false sense of safety from permanent zone markings.",
          "Keep personnel out of the line of fire and unnecessary mooring-deck exposure. Positioning must account for likely line movement/failure paths, bights, leads, winches, fairleads and changing load direction.",
          "Different line materials/elasticities can produce unequal load sharing. Mixed arrangements require management under the vessel's approved mooring design/SMS; do not use a simple equal-load assumption to declare the arrangement safe.",
          "Monitor line loads, environmental conditions, berth movement and winch/line condition throughout the stay and adjust only in accordance with safe mooring practice and the vessel/terminal plan.",
        ],
      },
    ],
  },
  {
    title: "Dynamic Positioning (DP) and Offshore Operations",
    classification: "OPERATIONAL",
    source: {
      code: "IMO MSC.1/Circ.1580 / IMCA M182, M220, M140, M166",
      detail: "DP design/operation, OSV guidance, activity-specific operational planning, capability plots and FMEA",
      url: "https://www.imca-int.com/product/guidance-for-developing-and-conducting-dp-annual-trials-programmes/",
      authority: ["IMO", "IMCA", "Company SMS", "Vessel FMEA/DP documentation"],
      applicability: {
        summary: "DP vessels/units and offshore activities; exact requirements depend on DP equipment class, vessel approval basis, FMEA, activity, client/installation rules and company procedures.",
      },
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "DP System, Class and Approved Basis",
        content: [
          "DP equipment class describes a design/failure-tolerance concept and required redundancy philosophy; it is not a guarantee that the vessel can maintain position in every environmental condition or after every failure.",
          "For vessels/units within its applicability, IMO MSC.1/Circ.1580 provides the current DP-system guideline framework; earlier vessels may remain approved against MSC/Circ.645 or another Administration-approved basis. Always identify the vessel's actual approval basis and DP verification documentation.",
          "The vessel's DP FMEA and proving trials, annual trials/test programme, DP operations manuals, maintenance/defect status and DP verification/acceptance documentation define the tested redundancy and failure-response basis for that vessel.",
          "Worst Case Failure Design Intent (WCFDI) / worst-case failure considerations must be understood before configuring power, thrusters and auxiliaries for critical activity. A configuration that appears redundant on the mimic may still contain common-mode vulnerabilities identified by the FMEA.",
        ],
      },
      {
        subtitle: "Position Reference Systems and Sensors",
        content: [
          "For DP equipment classes 2 and 3, guidance calls for at least three independent position reference systems to be installed/available as applicable; where multiple systems are required, avoid dependence on a single measurement principle or common failure mode.",
          "Select and weight position reference systems for the actual operation and environment. GNSS/DGNSS, hydroacoustic, laser/optical and other systems have different failure modes, geometry, range and interference vulnerabilities.",
          "Treat common-mode threats explicitly: GNSS jamming/spoofing/interference, blocked or moving optical targets, acoustic interference/multipath, erroneous target selection, poor geometry and shared power/data paths can defeat apparent redundancy.",
          "Gyro, motion-reference, wind and other environmental/sensor inputs must be monitored for disagreement, plausibility and alarms according to the installed DP system, FMEA and vessel procedures; do not hard-code a generic voting rule that may not match the vessel.",
        ],
      },
      {
        subtitle: "ASOG, CAM/TAM and Activity-Specific Planning",
        content: [
          "Use an Activity Specific Operating Guideline (ASOG) or equivalent decision-support tool where required by company/client/project practice. It should reflect the actual activity, failure tolerance, equipment configuration, environmental limits and agreed actions rather than being copied unchanged from another operation.",
          "Critical Activity Mode (CAM) is used where the activity requires the vessel to maintain the intended failure tolerance and configuration. Task Appropriate Mode (TAM) may be used only where the risk assessment and approved framework determine that the consequences of a loss of position are tolerable for that task.",
          "The ASOG should define the status/action logic used by the operation (for example normal/advisory/degraded/abort states), including what changes configuration, stops the task or requires the vessel to move clear. Company/client terminology may differ.",
          "Capability plots, FMEA/WCFDI, trials, known defects, SIMOPS interfaces and the actual weather/current/wave forecast should inform the operating envelope. An ASOG limit must not be invented solely from generic app guidance.",
        ],
      },
      {
        subtitle: "Approach, Close-Proximity Work and Watch Handover",
        content: [
          "Before close approach or commencing a DP-dependent offshore activity, complete the vessel/activity-specific DP checklist and toolbox/risk-assessment process, verify communications and escape/abort routes, and confirm power generation, thrusters, reference systems, sensors and redundancy status against the ASOG.",
          "Account for installation interaction hazards such as thruster wash, current/wind shadowing, acoustic/laser obstruction, moving targets, cranes, hoses/umbilicals, personnel transfer and other simultaneous operations.",
          "A DP watch handover should communicate at least the operational phase, position/heading and set-point/mode, ASOG status, power/thruster configuration, PRS/sensor status and weighting, alarms/defects/inhibitions, environmental trends, station-keeping footprint, communications, ongoing transfers/tasks and contingency/abort readiness.",
          "The incoming DPO must have adequate time to build situational awareness; the handover is not complete merely because the control chair has changed occupants.",
        ],
      },
      {
        subtitle: "Loss of Position, Drive-Off/Drift-Off and Capability",
        content: [
          "Drive-off, drift-off or degrading station keeping requires immediate action under the vessel's ASOG/DP emergency procedures and the specific activity's contingency/abort plan. Notify the installation/project interfaces and stop, disconnect or move clear as prescribed by the actual operation; no universal distance or single manoeuvre is suitable for every case.",
          "A DP capability plot is a planning/verification tool, not a live guarantee of station keeping. Actual capability changes with draught/trim/windage, thruster availability/derating, power configuration, interaction losses, current/waves, water depth and the failure condition being assessed.",
          "Monitor position/heading error, thruster demand, power reserve, environmental sensors, reference-system residuals and the station-keeping footprint/trend for degradation before a formal loss-of-position alarm occurs.",
          "Record and report DP incidents, undesired events, failures and relevant operational lessons in accordance with the vessel/company/client reporting process so that FMEA, procedures and training can be improved where necessary.",
        ],
      },
    ],
  },
  {
    title: "ISM Code — Safe Operation and Work Control",
    classification: "REGULATORY",
    source: {
      code: "ISM Code",
      detail: "International Safety Management Code — implemented through the company SMS",
      authority: ["IMO", "Company SMS"],
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "Safe Operation Management",
        content: [
          "Implement the vessel's Safety Management System (SMS), including the procedures and instructions needed for safe ship operation and protection of the environment.",
          "Risk assessment and permit-to-work requirements are determined by the company SMS and the hazards of the task. Do not state that every routine shipboard operation universally requires a permit to work.",
          "Hazardous work such as enclosed-space entry, hot work, work aloft/overside, electrical isolation or other activities identified by the SMS must use the required permit, isolation, risk-assessment and control process before work starts.",
          "Report accidents, hazardous occurrences/non-conformities and relevant near misses according to the SMS so corrective/preventive actions can be developed and verified.",
          "Internal audits and management reviews are performed at the intervals and scope required by the ISM/SMS framework; 'regularly' must be translated into the actual company schedule rather than an invented app interval.",
        ],
      },
    ],
  },
  {
    title: "ISPS Code — Ship Security",
    classification: "REGULATORY",
    source: {
      code: "SOLAS XI-2 / ISPS Code",
      detail: "Ship and port facility security; apply the approved Ship Security Plan (SSP)",
      authority: ["IMO", "Flag Administration", "Company SSP"],
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "Ship Security Requirements",
        content: [
          "Implement the security measures required for the security level set by the Contracting Government/Administration and the approved Ship Security Plan.",
          "Access control, restricted areas, stores/cargo monitoring, communications and security duties must follow the SSP; generic app text must not expose restricted SSP details or replace them.",
          "A Declaration of Security (DoS) is completed when required by the applicable ISPS circumstances and authority/ship-port interface, not automatically for every port call.",
        ],
      },
    ],
  },
  {
    title: "Port, VTS and Pilotage",
    classification: "OPERATIONAL",
    source: {
      code: "SOLAS V/11-12 / IMO Resolution A.1158(32)",
      detail: "Revised Guidelines for Vessel Traffic Services; local port, VTS, pilotage and terminal regulations remain controlling",
      authority: ["IMO", "Coastal State", "Port/VTS", "Company SMS"],
      reviewStatus: "VERIFIED",
      lastReviewed: "2026-08-30",
    },
    rules: [
      {
        subtitle: "Port Operations and Reporting",
        content: [
          "Check current port, terminal, pilotage and VTS information before arrival/departure, including reporting points, channels, traffic restrictions, UKC/tidal limits and local environmental requirements.",
          "Conduct the Master-Pilot Information Exchange using the vessel's pilot card/passage plan and discuss intended route, manoeuvre, tug use, limitations, contingencies and communication expectations; the pilot's presence does not relieve the master or bridge team of their duties for safe navigation.",
          "Comply with the reporting requirements of the VTS actually established for the area. IMO Resolution A.1158(32) is the current general VTS guideline framework; the older A.857(20) should not be cited as the current guideline.",
          "Monitor execution of the agreed pilotage plan and challenge/clarify deviations or unclear intentions using BRM/closed-loop communication rather than passively transferring navigation responsibility.",
        ],
      },
    ],
  },
];
