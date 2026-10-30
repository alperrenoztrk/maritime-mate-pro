/** Authored, topic-specific professional case studies for the core deck curriculum.
 * Each case is deliberately keyed by a stable topic ID; never apply a generic case to unrelated lessons.
 * Examples explain decision logic; vessel-approved manuals and current regulation prevail.
 */
import type { BetaSection } from "./betaLessons";

export const professionalCaseStudies: Record<string, BetaSection> = {
  "navigation-crossing": {
    "id": "navigation-crossing-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "COLREG Rule 15 identifies a crossing encounter between two power-driven vessels in sight. Risk assessment still depends on bearing trend, range, visual observation and all available sensors, not a single ARPA number.\n\nCommon error: Do not treat AIS-reported COG alone as sufficient collision-risk evidence.",
    "example": {
      "problem": "A contact remains on a near-constant starboard relative bearing while its range decreases.",
      "steps": [
        "Verify target motion visually and with radar plotting; check whether Rule 15 applies.",
        "As the give-way vessel, take early, substantial action under Rule 16, avoiding a succession of small course changes.",
        "Monitor the developing CPA and continue assessing whether the vessels are finally past and clear."
      ],
      "result": "Determine the responsibility and act in ample time; exact manoeuvre is constrained by traffic, depth and sea room."
    },
    "references": [
      {
        "title": "IMO COLREGs — navigation and collision avoidance",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-ecdis": {
    "id": "navigation-ecdis-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "ECDIS safety settings depend on the actual maximum draught, available chart depth and tide, squat, survey quality and company UKC policy. Safety contour and safety depth serve different presentation and alert functions.\n\nCommon error: Do not assume a clear ECDIS display proves safe clearance.",
    "example": {
      "problem": "A ship's draught increases after loading but its ECDIS settings still reflect the previous ballast passage.",
      "steps": [
        "Recalculate the required safety depth and UKC allowance for the loaded condition.",
        "Select a defensible safety contour supported by the available ENC depth contours; account for ECDIS contour selection behavior.",
        "Inspect the route for newly highlighted dangers and cross-check with chart detail, radar and independent position sources."
      ],
      "result": "A previously approved route can require a fresh safety assessment after draught changes."
    },
    "references": [
      {
        "title": "IMO COLREGs — navigation and collision avoidance",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-ukc-ve-squat": {
    "id": "navigation-ukc-ve-squat-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Under-keel clearance is a dynamic margin, not merely charted depth minus draught. Water level, vessel draught, heel, squat and uncertainty in soundings and position contribute to the passage decision.\n\nCommon error: Never insert a universal squat formula or minimum UKC percentage without checking approved ship-specific criteria.",
    "example": {
      "problem": "Charted depth is 12.0 m, tide height is +1.2 m above chart datum and static draught is 11.0 m.",
      "steps": [
        "Compute static UKC as 12.0 + 1.2 − 11.0 = 2.2 m.",
        "Subtract the vessel-specific squat estimate, heel effect and applicable uncertainty margins.",
        "Compare the result with the approved UKC policy and tidal window before proceeding."
      ],
      "result": "The 2.2 m figure is only static UKC, not an operational clearance guarantee."
    },
    "references": [
      {
        "title": "IMO COLREGs — navigation and collision avoidance",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "meteorology-gercek-ruzgar-ve-gorunen-ruzgar": {
    "id": "meteorology-gercek-ruzgar-ve-gorunen-ruzgar-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Apparent wind is the true wind vector relative to the ship's movement through the relevant reference frame. Direction and reference source matter: ship heading, ground track and sensor corrections must not be confused.\n\nCommon error: Do not add the wind and ship speeds as scalars when the vectors are oblique.",
    "example": {
      "problem": "A ship makes 10 kn directly into a 20 kn true headwind; ignore current and wind-sensor offsets for this illustration.",
      "steps": [
        "Draw the true wind as a vector towards the stern relative to the ship's heading.",
        "Subtract the ship velocity vector from the true-wind vector.",
        "The apparent wind speed becomes 30 kn, still coming from ahead, in this simplified collinear case."
      ],
      "result": "An anemometer's higher apparent reading does not by itself mean the ambient true wind increased."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "meteorology-swell-ve-wind-sea-ayrimi": {
    "id": "meteorology-swell-ve-wind-sea-ayrimi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Locally generated wind sea typically tracks the local wind field, whereas swell may travel long distances from a remote storm. Multiple wave trains can produce uncomfortable rolling despite moderate measured wind.\n\nCommon error: Do not equate Beaufort force with a unique significant wave height.",
    "example": {
      "problem": "The wind falls to Beaufort force 3 but long-period waves continue to arrive from a different direction.",
      "steps": [
        "Compare wind and wave directions, heights and periods rather than inferring sea state from the local wind alone.",
        "Check forecast swell components against heading, roll response and cargo restrictions.",
        "Adjust speed and heading within safe navigational and operational limits, and record the change."
      ],
      "result": "The residual long-period component is consistent with swell; falling local wind need not remove wave risk."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "meteorology-kisitli-goruste-seyir-kurallari": {
    "id": "meteorology-kisitli-goruste-seyir-kurallari-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "In restricted visibility the officer must assess risk with a proper lookout, safe speed and radar as applicable; COLREG Rule 19 is not a simple right-of-way chart copied from vessels in sight.\n\nCommon error: Do not apply Rule 15 mechanically to a radar-only contact in fog.",
    "example": {
      "problem": "A radar target appears ahead in dense fog, but no visual contact has been made.",
      "steps": [
        "Determine whether a close-quarters situation or risk of collision exists with systematic plotting.",
        "Apply Rule 19 and the ship's standing orders, using the required fog signals and a safe speed.",
        "When avoiding by course alteration alone, account for Rule 19's cautions concerning port alterations for vessels forward of the beam."
      ],
      "result": "Keep Rule 19 distinct from crossing/head-on responsibilities premised on visual contact."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "communication-vhf-dsc-operasyonlari": {
    "id": "communication-vhf-dsc-operasyonlari-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A VHF DSC distress alert on Channel 70 is a digital alert, not the subsequent spoken distress message. Radiotelephony distress traffic normally uses Channel 16 unless the situation and instructions dictate otherwise.\n\nCommon error: Never use a live DSC distress alert to demonstrate a training exercise; follow the device's approved test function.",
    "example": {
      "problem": "An emergency requires a distress alert and follow-up voice communication.",
      "steps": [
        "Confirm the nature of distress, vessel position and time available under the ship's emergency plan.",
        "Transmit the distress alert using the approved DSC equipment and follow its on-screen procedure.",
        "Follow with MAYDAY voice information, monitor acknowledgements and record the alert sequence as practicable."
      ],
      "result": "Digital alerting and voice coordination are complementary stages of the same response."
    },
    "references": [
      {
        "title": "IMO — STCW competency framework",
        "url": "https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx"
      }
    ]
  },
  "communication-navtex-safetynet-ve-msi": {
    "id": "communication-navtex-safetynet-ve-msi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Maritime Safety Information is selected by coverage area, transmission schedules and message category. NAVTEX at 518 kHz normally carries English MSI; regional or national-language services may use different frequencies.\n\nCommon error: Do not assume NAVTEX alone covers every ocean area or that all MSI channels are interchangeable.",
    "example": {
      "problem": "A vessel departs a NAVTEX coastal service area while a weather warning is in force.",
      "steps": [
        "Review the receiver's station and message-category selections and verify required warnings are being retained.",
        "Identify the next relevant MSI broadcast arrangement along the route, including recognised satellite services where carried.",
        "Brief the bridge team on warnings with a direct navigational consequence and document their use in passage planning."
      ],
      "result": "A receiver that is powered on but configured to ignore the relevant station is not a reliable MSI watch."
    },
    "references": [
      {
        "title": "IMO — STCW competency framework",
        "url": "https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx"
      }
    ]
  },
  "communication-telsiz-nobeti-ve-radyo-log-defteri": {
    "id": "communication-telsiz-nobeti-ve-radyo-log-defteri-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "The radio log should distinguish equipment checks, received warnings, tests, actual distress communications and periods when a required watch could not be maintained. Required entries depend on flag, sea area and the vessel's radio arrangements.\n\nCommon error: Never record a fictional 'test satisfactory' or distress call for a check that did not happen.",
    "example": {
      "problem": "A GMDSS equipment test cannot be completed because the unit is unavailable during port maintenance.",
      "steps": [
        "Record the actual equipment state, maintenance period and reason the check was not completed, following the ship's log procedure.",
        "Notify the designated officer and confirm whether alternative required communication arrangements are available.",
        "Recheck functionality after maintenance and enter the actual test result, without backdating or implying the earlier test took place."
      ],
      "result": "Accurate exception reporting supports both safety and auditability."
    },
    "references": [
      {
        "title": "IMO — STCW competency framework",
        "url": "https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx"
      }
    ]
  },
  "stability-7-2-serbest-yuzeyin-gm-ye-etkisi-2": {
    "id": "stability-7-2-serbest-yuzeyin-gm-ye-etkisi-2-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Liquid free surfaces shift the effective centre of gravity during heel; their stability-booklet free-surface moment produces a virtual rise in G. The correction depends on tank geometry, filling state and the approved calculation basis.\n\nCommon error: Do not apply free-surface data from a full or empty tank indiscriminately to slack-tank conditions.",
    "example": {
      "problem": "A loading condition has uncorrected GM = 0.85 m, displacement = 12,000 t and summed free-surface moments = 720 t·m.",
      "steps": [
        "Calculate free-surface correction as 720 / 12,000 = 0.06 m.",
        "Subtract the correction from uncorrected GM to obtain corrected GM = 0.79 m.",
        "Recheck all intact-stability criteria, tank states and free-surface moments in the approved loading system."
      ],
      "result": "Corrected GM is 0.79 m in this simplified example; it does not by itself certify compliance."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability instruments",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "stability-6-2-gz-egrisinin-yorumlanmasi-2": {
    "id": "stability-6-2-gz-egrisinin-yorumlanmasi-2-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "The GZ curve describes righting lever over heel angle; the area under the curve represents dynamic stability only under the relevant assumptions. Peak GZ, range and downflooding angle require separate interpretation.\n\nCommon error: A visually larger curve is not proof of compliance without the relevant criteria and limiting openings.",
    "example": {
      "problem": "Two loading states have similar initial GM, but one GZ curve reaches zero at a much smaller heel angle.",
      "steps": [
        "Compare positive range, maximum GZ and the area under the approved curves.",
        "Locate downflooding openings and check whether immersion invalidates the assumed watertight envelope.",
        "Review the applicable intact-stability criteria, not only the initial slope near zero heel."
      ],
      "result": "Matching GM values do not imply matching large-angle reserve stability."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability instruments",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "stability-8-4-trim-hesaplamalari-4": {
    "id": "stability-8-4-trim-hesaplamalari-4-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A longitudinal moment moves the vessel away from its initial trim and can be estimated using MCT 1 cm when the loading instrument's assumptions are respected. Signs and draft distribution require LCF and vessel-specific data.\n\nCommon error: Do not confuse total trim change with aft-draught increase.",
    "example": {
      "problem": "A cargo move generates a 800 t·m trimming moment and the approved hydrostatic data specify MCT 1 cm = 200 t·m/cm.",
      "steps": [
        "Divide moment by MCT 1 cm: 800 / 200 = 4 cm total change of trim.",
        "Use the actual moment direction and ship's sign convention to identify trim by stern or head.",
        "Distribute the change of draught about LCF and check local limits and longitudinal strength."
      ],
      "result": "Four centimetres is a change in trim, not a universal four-centimetre change at each draught mark."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability instruments",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "cargo-yuk-baglama-ve-sikistirma-css-code": {
    "id": "cargo-yuk-baglama-ve-sikistirma-css-code-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Cargo restraint is designed for accelerations produced by ship motions. A simple mass-times-acceleration estimate illustrates load, but selecting lashings also requires angles, friction, securing-point capacity and the ship's approved Cargo Securing Manual.\n\nCommon error: Never divide this force by an individual lashing's marked capacity without accounting for angles, friction and safety factors.",
    "example": {
      "problem": "A 10-tonne deck unit is subject to an illustrative transverse acceleration of 0.3 g.",
      "steps": [
        "Estimate transverse inertia load: 10,000 kg × 0.3 × 9.81 m/s² ≈ 29.4 kN.",
        "Identify the actual restraint paths, directional lashing components and approved lashing points.",
        "Use the applicable shipboard securing calculation and inspect pretension, chafe protection and deck foundations."
      ],
      "result": "The 29.4 kN figure is a simplified force component, not a required number of lashings."
    },
    "references": [
      {
        "title": "IMO — Cargo Securing and Stowage (CSS Code)",
        "url": "https://www.imo.org/en/ourwork/safety/pages/css-code.aspx"
      }
    ]
  },
  "cargo-tehlikeli-yukler-ve-imdg-code": {
    "id": "cargo-tehlikeli-yukler-ve-imdg-code-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Dangerous goods transport combines accurate classification and declaration with package condition, documentation, stowage, segregation and emergency response. An identical UN number does not remove the need to check packing group and special provisions.\n\nCommon error: Do not infer compatibility from matching hazard pictograms alone.",
    "example": {
      "problem": "An IMDG booking requests adjacent stowage of two declared dangerous-goods packages.",
      "steps": [
        "Verify UN numbers, proper shipping names, classes, subsidiary risks and the edition of the applicable IMDG Code.",
        "Check segregation provisions, ship-specific stowage constraints and actual packaging before authorising the plan.",
        "Document the decision and resolve any mismatch between booking data, container placards and manifest."
      ],
      "result": "Accept or reject the arrangement based on the correct cargo-specific provisions, not visual similarity of labels."
    },
    "references": [
      {
        "title": "IMO — Cargo Securing and Stowage (CSS Code)",
        "url": "https://www.imo.org/en/ourwork/safety/pages/css-code.aspx"
      }
    ]
  },
  "cargo-draft-survey-ile-yuk-hesabi": {
    "id": "cargo-draft-survey-ile-yuk-hesabi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A draft survey derives displacement changes from corrected drafts and hydrostatics, then adjusts for non-cargo weights such as ballast, freshwater, fuel and stores. Water density changes the interpretation of tabulated displacement.\n\nCommon error: Do not use observed density in kg/m³ as if it were t/m³.",
    "example": {
      "problem": "Departure and arrival displacement figures differ while ballast was discharged during the operation.",
      "steps": [
        "Correct drafts for list, trim and the vessel's reference positions per approved survey procedure.",
        "Apply observed water density consistently with the hydrostatic-table density basis.",
        "Reconcile the weight change with tank soundings, consumables and ballast movements before assigning the difference to cargo."
      ],
      "result": "The displacement difference alone is not the shipped cargo quantity."
    },
    "references": [
      {
        "title": "IMO — Cargo Securing and Stowage (CSS Code)",
        "url": "https://www.imo.org/en/ourwork/safety/pages/css-code.aspx"
      }
    ]
  },
  "safety-kapali-mahal-girisi": {
    "id": "safety-kapali-mahal-girisi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Enclosed spaces can contain oxygen-deficient, toxic or flammable atmospheres despite looking clean. An entry permit and gas test are control measures, not guarantees that the atmosphere will stay safe.\n\nCommon error: Never equate an ordinary dust mask with breathing apparatus for an oxygen-deficient atmosphere.",
    "example": {
      "problem": "A seafarer collapses inside an unventilated void space.",
      "steps": [
        "Raise the alarm, establish communication and activate the vessel's enclosed-space rescue response.",
        "Do not attempt an unplanned entry; prepare trained rescue personnel, suitable breathing apparatus and retrieval arrangements under command.",
        "Control ventilation and atmosphere testing, isolate hazards and arrange medical response in accordance with the emergency plan."
      ],
      "result": "Avoid a second casualty: rescue entry requires a planned, protected team response."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "safety-yangin-algilama-ve-sabit-sondurme-sistemleri": {
    "id": "safety-yangin-algilama-ve-sabit-sondurme-sistemleri-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A fixed CO₂ installation suppresses fire by displacing oxygen and can be lethal to anyone in the protected space. Release decisions require proper command, evacuation checks and strict access control.\n\nCommon error: Do not use a fixed-system release as a first unsupervised response to a small, accessible fire.",
    "example": {
      "problem": "A machinery-space fire prompts consideration of the fixed CO₂ system.",
      "steps": [
        "Follow the ship's emergency organisation: isolate ventilation, dampers, fuel and relevant machinery according to the approved plan.",
        "Account for people and confirm evacuation and the protected-space boundaries before any release.",
        "Use only the approved release sequence under the authorised command, secure access and monitor boundary temperatures."
      ],
      "result": "Re-entry cannot be assumed safe immediately after extinguishment; atmosphere must be verified."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "safety-acil-durum-hazirligi-ve-talimler": {
    "id": "safety-acil-durum-hazirligi-ve-talimler-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A drill is meaningful when crew actions, timing, communication, access and equipment limitations are observed. Completion of a checklist is not evidence that the response would work under real failure conditions.\n\nCommon error: Do not activate real distress transmissions during a drill.",
    "example": {
      "problem": "During an abandon-ship drill, the SART is located but nobody can explain its deployment and activation.",
      "steps": [
        "Pause the relevant training step and use the actual equipment instructions to demonstrate safe handling.",
        "Confirm the assigned crew know the muster responsibilities, liferaft embarkation and radio/SAR equipment roles.",
        "Record the identified training gap, corrective action and subsequent verification."
      ],
      "result": "A finding from the drill becomes a tracked corrective action rather than a paper-only completion."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "environment-marpol-ek-i-petrol-kirliligi": {
    "id": "environment-marpol-ek-i-petrol-kirliligi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Machinery-space bilge water discharge requires compliance with the vessel's approved oil-filtering equipment arrangements, 15-ppm monitoring where applicable and additional operational, area and port restrictions. A ppm readout alone is not authorisation.\n\nCommon error: Never bypass a 15-ppm alarm or treat its threshold as unrestricted permission.",
    "example": {
      "problem": "An engineer proposes pumping bilge water overboard because the displayed monitor value is below 15 ppm.",
      "steps": [
        "Identify the bilge source and confirm the discharge is permitted for the vessel, area and voyage condition.",
        "Verify the approved OWS, monitor, automatic stopping arrangement and valve lineup; consult the applicable procedures.",
        "Make truthful Oil Record Book entries for the operation actually carried out or retain wastes for reception facilities."
      ],
      "result": "Discharge must satisfy all applicable conditions; retain aboard when conditions are not met."
    },
    "references": [
      {
        "title": "IMO — MARPOL convention",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx"
      }
    ]
  },
  "environment-marpol-ek-v-cop-garbage": {
    "id": "environment-marpol-ek-v-cop-garbage-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "MARPOL Annex V imposes different disposal requirements by garbage category, area and distance from land. Plastics are prohibited from discharge into the sea; garbage segregation and record keeping remain operational controls.\n\nCommon error: Do not assume biodegradable labelling makes plastic acceptable for overboard disposal.",
    "example": {
      "problem": "A mixed bag contains plastic packaging, food waste and cleaning materials on passage.",
      "steps": [
        "Segregate the contents before assigning a permitted disposal route.",
        "Check category-specific MARPOL and special-area requirements rather than applying one distance rule to the bag.",
        "Retain prohibited material aboard and enter disposal or landing records as required by the vessel's Garbage Management Plan."
      ],
      "result": "The presence of food waste does not legalise discharge of a mixed plastic-containing bag."
    },
    "references": [
      {
        "title": "IMO — MARPOL convention",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx"
      }
    ]
  },
  "environment-balast-suyu-yonetimi-bwm": {
    "id": "environment-balast-suyu-yonetimi-bwm-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Ballast treatment and exchange are different compliance approaches. Operational decisions depend on the ship's approved Ballast Water Management Plan, treatment limitations, log entries and local port requirements.\n\nCommon error: Do not change treatment settings or bypass the system without manufacturer- and authority-compliant procedures.",
    "example": {
      "problem": "A ballast-water treatment alarm occurs shortly before arrival.",
      "steps": [
        "Identify whether the alarm affects an approved treatment critical limit or treatment availability.",
        "Notify the responsible officer and evaluate compliant retention, contingency or reception arrangements under the approved plan.",
        "Record the alarm, corrective action and actual ballast operation before any discharge decision."
      ],
      "result": "An equipment alarm is not permission to discharge untreated ballast."
    },
    "references": [
      {
        "title": "IMO — MARPOL convention",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx"
      }
    ]
  },
  "seamanship-baglama-mooring-operasyonlari": {
    "id": "seamanship-baglama-mooring-operasyonlari-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A tensioned mooring line stores energy throughout its length; a failed rope, fitting or line of pull can sweep a large area. Painted snap-back zones cannot represent every real failure path.\n\nCommon error: Never stand inside a bight or straddle a tensioned mooring line.",
    "example": {
      "problem": "A breast line begins to surge under load as the vessel moves off the berth.",
      "steps": [
        "Communicate the developing load to the bridge and mooring team and suspend unsafe handling.",
        "Keep personnel clear of lines under tension, bights and likely recoil paths; reassess the entire deck layout.",
        "Adjust mooring configuration only under coordinated command and within the equipment's safe working limitations."
      ],
      "result": "Personnel positioning must be based on actual line geometry and load, not a fixed painted box."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "seamanship-pilot-transferi-ve-pilot-merdiveni": {
    "id": "seamanship-pilot-transferi-ve-pilot-merdiveni-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Pilot transfer safety depends on approved pilot ladder construction, correct rigging and securing, suitable deck lighting and trained supervision. A ladder's age or appearance alone does not establish safe condition.\n\nCommon error: Do not secure a pilot ladder only to deck handrails or improvised fittings.",
    "example": {
      "problem": "The pilot requests a change in combination ladder height during approach.",
      "steps": [
        "Confirm the new freeboard and pilot-station requirements with bridge and the pilot boat.",
        "Have competent crew verify securing points, spreaders, manropes where required and the exact arrangement against SOLAS V/23 and approved guidance.",
        "Recheck the arrangement before use and maintain direct communication throughout transfer."
      ],
      "result": "The arrangement must be reverified after adjustment rather than assuming the previous inspection still applies."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "seamanship-ileri-demirleme-ve-anchor-watch": {
    "id": "seamanship-ileri-demirleme-ve-anchor-watch-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Anchor watch combines movement monitoring with depth, tide, weather, chain direction and nearby traffic. GNSS position alarms must account for vessel swing and the location of the antenna relative to the anchor.\n\nCommon error: Do not choose an arbitrary fixed anchor alarm radius without calculating vessel-specific swing.",
    "example": {
      "problem": "The vessel changes heading through 150° while at anchor but remains within its expected swinging circle.",
      "steps": [
        "Compare the position trend with the expected swing geometry and changes in wind/current.",
        "Cross-check radar ranges or transits, chain lead, depth and nearby traffic rather than treating heading change as dragging.",
        "Escalate any persistent position movement outside the expected arc, abnormal chain loading or reduced clearance."
      ],
      "result": "Heading change alone is not proof of anchor dragging; independent evidence is essential."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices 2026",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "economics-time-charter-equivalent-tce-ve-sefer-ekonomisi": {
    "id": "economics-time-charter-equivalent-tce-ve-sefer-ekonomisi-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Time Charter Equivalent is a comparative voyage earnings measure: voyage revenue less voyage-variable expenses, divided by voyage days on the chosen accounting basis. It is not necessarily the owner's net profit.\n\nCommon error: Do not compare TCEs based on inconsistent voyage-day definitions.",
    "example": {
      "problem": "A voyage earns $600,000 freight and incurs $180,000 voyage costs across 30 voyage days.",
      "steps": [
        "Determine net voyage contribution: $600,000 − $180,000 = $420,000.",
        "Divide by 30 days to obtain a TCE of $14,000/day.",
        "Clarify which waiting, ballast and port days and which expense classes the comparison includes."
      ],
      "result": "The illustrative TCE is $14,000/day; owner operating costs and financing still matter."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator (voyage planning context)",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "economics-laytime-demurrage-ve-despatch": {
    "id": "economics-laytime-demurrage-ve-despatch-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "Laytime calculations depend on the specific charter party: notice of readiness, commencement clauses, exceptions, reversible time and agreed treatment of weather or port delays. Demurrage/despatch is contractual, not a universal hourly rule.\n\nCommon error: Do not assume 'once on demurrage, always on demurrage' resolves every negotiated exception.",
    "example": {
      "problem": "A vessel tenders notice of readiness, then loading is interrupted by rain.",
      "steps": [
        "Check whether the notice is valid and when laytime actually starts under the signed charter.",
        "Classify each delay against agreed exceptions and any separate demurrage provisions.",
        "Produce a time sheet with timestamps, supporting records and a transparent calculation."
      ],
      "result": "The rain period's treatment cannot be decided without the charter wording."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator (voyage planning context)",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "economics-konsimento-ve-tasima-belgeleri": {
    "id": "economics-konsimento-ve-tasima-belgeleri-professional-application",
    "title": "Operational reasoning and worked case",
    "content": "A bill of lading may evidence receipt, contract terms and title-related rights. The person signing must be authorised and must not knowingly certify an inaccurate cargo description or condition.\n\nCommon error: Never sign a clean bill of lading merely to avoid a commercial delay.",
    "example": {
      "problem": "Mate's receipts record torn packaging, but a shipper asks for a clean bill of lading.",
      "steps": [
        "Preserve the contemporaneous cargo-condition observations and supporting photographs or surveys.",
        "Report the discrepancy to the master and check signing authority and documentary procedures.",
        "Use accurate clauses or obtain instructions and legal/commercial advice; do not conceal the observed defect."
      ],
      "result": "Documentation accuracy protects cargo interests and the vessel's evidential position."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator (voyage planning context)",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "machine-thermodynamics-termodinamik-yasalar-birinci-yasa-enerji-korunumu-1": {
    "id": "machine-thermodynamics-termodinamik-yasalar-birinci-yasa-enerji-korunumu-1-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "The first law tracks energy crossing a defined system boundary as heat and work, plus changes in stored energy. An engine efficiency statement without a clear boundary can omit auxiliaries, exhaust and cooling losses.\n\nCommon error: Do not label a difference as thermal loss without checking energy transferred in other forms.",
    "example": {
      "problem": "A steady-state unit receives 100 kW as input energy and delivers 60 kW useful output.",
      "steps": [
        "State the control volume and steady-state assumption with no unmeasured flows.",
        "Account for the remaining 40 kW as losses or other energy outputs, not vanished energy.",
        "Compare with measured exhaust, cooling and electrical parasitics before drawing equipment-specific conclusions."
      ],
      "result": "The simplified energy balance closes at 100 kW; real plant boundaries need measured terms."
    },
    "references": [
      {
        "title": "DOE: Thermodynamics fundamentals",
        "url": "https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1012-92_VOL1.pdf"
      }
    ]
  },
  "machine-fluid-mechanics-akiskan-statigi-hidrostatik-basinc-denklemleri-2": {
    "id": "machine-fluid-mechanics-akiskan-statigi-hidrostatik-basinc-denklemleri-2-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Hydrostatic gauge pressure increases with liquid density and vertical depth below a free surface. In a ventilated tank, p = ρgh applies to the column, not to vessel roll, acceleration or an air-pressurised space.\n\nCommon error: Do not confuse gauge pressure with absolute pressure or treat inclined tank geometry as irrelevant during motion.",
    "example": {
      "problem": "An open seawater tank has liquid density 1,025 kg/m³ and a pressure tap 8.0 m below the surface.",
      "steps": [
        "Use SI units: ρ = 1,025 kg/m³, g = 9.81 m/s², h = 8.0 m.",
        "Gauge pressure ≈ 1,025 × 9.81 × 8 = 80,442 Pa, or 80.4 kPa.",
        "Check vent status, sensor elevation and ship motion before comparing the estimate with an actual reading."
      ],
      "result": "About 80.4 kPa gauge is the static head component, not necessarily the instrument's full observed pressure."
    },
    "references": [
      {
        "title": "DOE: Fluid flow fundamentals",
        "url": "https://www.energy.gov/documents/doe-hdbk-1012-92vol3"
      }
    ]
  },
  "machine-machine-elements-malzeme-bilgisi-korozyon-direnci-ve-korozyon-tipleri-4": {
    "id": "machine-machine-elements-malzeme-bilgisi-korozyon-direnci-ve-korozyon-tipleri-4-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Corrosion morphology can indicate different mechanisms: galvanic corrosion depends on coupled dissimilar metals and electrolyte, while crevice corrosion may concentrate inside poorly ventilated gaps. Surface coating alone is not diagnosis.\n\nCommon error: Do not install an unapproved metal-to-metal bridge that unintentionally creates galvanic coupling.",
    "example": {
      "problem": "Rapid metal loss appears near a stainless-steel fitting attached to a carbon-steel deck support.",
      "steps": [
        "Check material pairing, electrical continuity, coating breakdown and water retention at the connection.",
        "Inspect the actual location and severity of attack, not only its colour or apparent rust area.",
        "Select repair, material isolation and coating measures within approved engineering practice and corrosion-control plans."
      ],
      "result": "Investigate the mechanism before choosing protection; wrong remedies can worsen local damage."
    },
    "references": [
      {
        "title": "DOE: Material science fundamentals",
        "url": "https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1017-93_VOL1.pdf"
      }
    ]
  },
  "machine-diesel-engines-dizel-motor-temelleri-iki-zamanli-motor-calisma-prensibi-2": {
    "id": "machine-diesel-engines-dizel-motor-temelleri-iki-zamanli-motor-calisma-prensibi-2-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Low-speed two-stroke marine diesel engines rely on efficient scavenge-air supply while exhaust gas is being displaced. One power stroke per revolution does not guarantee adequate fresh air at every load.\n\nCommon error: Do not open scavenge-space doors or make fuel adjustments without the approved safety procedure.",
    "example": {
      "problem": "A two-stroke engine experiences rising exhaust temperatures and declining scavenge pressure while load is unchanged.",
      "steps": [
        "Inspect scavenge pressure, air-cooler condition and auxiliary blower operation in the maker's diagnostic order.",
        "Compare cylinder exhaust-temperature patterns with fuel-injection evidence before blaming the fuel rack.",
        "Follow approved response and load-reduction guidance if deteriorating conditions indicate combustion or scavenge risk."
      ],
      "result": "An air-system defect may raise thermal stress without any increase in commanded fuel."
    },
    "references": [
      {
        "title": "DOE: Mechanical science handbook overview",
        "url": "https://www.energy.gov/documents/doe-hdbk-1018-93vol2"
      }
    ]
  },
  "machine-ship-systems-dumen-donanimi-yedek-dumen-sistemi-6": {
    "id": "machine-ship-systems-dumen-donanimi-yedek-dumen-sistemi-6-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Steering redundancy is meaningful only if the backup control path, power availability, local control, communication and changeover procedures work together. The arrangement is installation-specific.\n\nCommon error: Do not assume two pump motors mean every steering failure is automatically covered.",
    "example": {
      "problem": "Bridge steering control indication is lost shortly before pilotage.",
      "steps": [
        "Identify whether rudder movement, position feedback, or only one display has failed using independent indicators.",
        "Inform bridge and engine teams, test alternative controls only under the vessel's procedures, and establish clear communication.",
        "Apply the company's and Master's restrictions before continuing or resuming manoeuvring."
      ],
      "result": "A redundant power unit does not guarantee an independent steering control or position-feedback path."
    },
    "references": [
      {
        "title": "MCA: Code of Safe Working Practices, 2026 edition",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-auxiliary-dizel-jeneratorler-paralel-baglama-synchronizing-3": {
    "id": "machine-auxiliary-dizel-jeneratorler-paralel-baglama-synchronizing-3-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "AC generators must meet prescribed voltage, frequency, phase sequence and phase-angle conditions for parallel connection. A closing error can produce damaging transients, torque and reverse-power events.\n\nCommon error: Never defeat a synch-check or reverse-power protection to force a breaker closed.",
    "example": {
      "problem": "An incoming generator approaches the live bus but the synchronising indication repeatedly passes the closing point.",
      "steps": [
        "Check the approved automatic synchronising mode, interlocks and both units' frequency and voltage indications.",
        "Review governor, AVR and breaker readiness without defeating protective relays.",
        "Escalate repeated failures; do not attempt improvised manual synchronisation outside the maker's operating procedure."
      ],
      "result": "Safe synchronisation is a matched electrical state, not simply matching two displayed frequencies."
    },
    "references": [
      {
        "title": "DOE: Mechanical science handbook overview",
        "url": "https://www.energy.gov/documents/doe-hdbk-1018-93vol2"
      }
    ]
  },
  "machine-fuel-technology-deniz-yakit-turleri-vlsfo-very-low-sulphur-fuel-oil-2": {
    "id": "machine-fuel-technology-deniz-yakit-turleri-vlsfo-very-low-sulphur-fuel-oil-2-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "VLSFO compliance is not only a sulphur number. Different fuel blends may exhibit compatibility and stability problems; viscosity and heating arrangements affect service conditions.\n\nCommon error: Do not infer compatibility from a similar density or low sulphur declaration alone.",
    "example": {
      "problem": "The ship plans to mix a newly bunkered VLSFO parcel with residual fuel in a settling tank.",
      "steps": [
        "Review bunker documents, fuel specifications and any compatibility test information.",
        "Plan tank segregation, changeover temperatures and purifier settings against the engine maker's requirements.",
        "Trend pressure drop, filter condition and temperatures during a controlled changeover."
      ],
      "result": "Sulphur compliance does not automatically prove blends can be mixed safely."
    },
    "references": [
      {
        "title": "IMO: MARPOL Annex VI guidance and instruments",
        "url": "https://www.imo.org/en/ourwork/environment/pages/index-of-mepc-resolutions-and-guidelines-related-to-marpol-annex-vi.aspx"
      }
    ]
  },
  "machine-cooling-hvac-sogutma-cevrimi-temelleri-cop-performans-katsayisi-hesabi-6": {
    "id": "machine-cooling-hvac-sogutma-cevrimi-temelleri-cop-performans-katsayisi-hesabi-6-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Refrigeration coefficient of performance relates heat removed at the evaporator to the work input over an agreed measurement boundary. It can exceed one because the system transports heat rather than converting work directly into cooling.\n\nCommon error: Do not treat COP 3.2 as 320% thermodynamic engine efficiency.",
    "example": {
      "problem": "A refrigeration unit removes 80 kW of heat and consumes 25 kW compressor electrical power.",
      "steps": [
        "Calculate COP = 80 / 25 = 3.2 at the stated operating condition.",
        "Check whether fans, pumps and other auxiliaries are excluded from the electrical figure.",
        "Compare only like-for-like duty, ambient and suction/condensing conditions."
      ],
      "result": "COP = 3.2 applies to this simplified compressor-only boundary."
    },
    "references": [
      {
        "title": "DOE: Mechanical science handbook overview",
        "url": "https://www.energy.gov/documents/doe-hdbk-1018-93vol2"
      }
    ]
  },
  "machine-electrical-elektrik-uretim-sistemi-frekans-ve-yuk-kontrolu-3": {
    "id": "machine-electrical-elektrik-uretim-sistemi-frekans-ve-yuk-kontrolu-3-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "For a conventional synchronous alternator, system frequency tracks shaft rotational speed and pole count; the governor regulates speed/real-power sharing while the AVR predominantly controls voltage/reactive-power behaviour.\n\nCommon error: Do not change AVR settings to correct a prime-mover speed problem.",
    "example": {
      "problem": "A shipboard generator begins to fall in frequency as electrical load increases.",
      "steps": [
        "Compare measured frequency and engine rpm with the governor's reference and the load trend.",
        "Check for overload, fuel or air-supply restrictions and load-sharing anomalies without guessing an AVR fault.",
        "Coordinate load management or load shedding using approved PMS priorities and response procedures."
      ],
      "result": "The frequency symptom primarily demands speed and real-power investigation, not indiscriminate voltage adjustment."
    },
    "references": [
      {
        "title": "DOE: Electrical science fundamentals",
        "url": "https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1011-92_VOL3.pdf"
      }
    ]
  },
  "machine-automation-olcme-ve-enstrumantasyon-sinyal-donusturuculer-4-20-ma-0-10v-6": {
    "id": "machine-automation-olcme-ve-enstrumantasyon-sinyal-donusturuculer-4-20-ma-0-10v-6-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "A 4–20 mA live-zero loop represents zero span at 4 mA and full span at 20 mA. Current below normal range may indicate a fault; transmitter scaling and loop wiring must be verified.\n\nCommon error: Do not normalise against 20 mA as if the lower endpoint were zero current.",
    "example": {
      "problem": "A level transmitter is calibrated 0–100% over 4–20 mA and measures 12 mA.",
      "steps": [
        "Compute usable span: 12 − 4 = 8 mA out of 16 mA.",
        "The indicated level is 8 / 16 × 100 = 50% of the calibrated range.",
        "Check source tag, transmitter range and control-system scaling before trusting the displayed level."
      ],
      "result": "A 12 mA reading represents 50%, not 60% or 75%."
    },
    "references": [
      {
        "title": "DOE: Instrumentation and control fundamentals",
        "url": "https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1013-92-VOL2.pdf"
      }
    ]
  },
  "machine-engine-room-ops-makine-vardiyasi-makine-vardiyasi-devir-teslim-1": {
    "id": "machine-engine-room-ops-makine-vardiyasi-makine-vardiyasi-devir-teslim-1-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Engine-room handover is a transfer of operational risk awareness, not merely a signature. It should communicate plant status, isolations, alarms, planned work, temporary arrangements and escalation triggers.\n\nCommon error: Do not silently return the equipment to automatic mode without understanding why it was changed.",
    "example": {
      "problem": "An incoming watchkeeper finds an auxiliary pump running in manual mode without an entry in the handover.",
      "steps": [
        "Confirm the reason for the manual override and identify which automatic protections or standby changeovers might be affected.",
        "Check the control-panel state, relevant log entries and permits with the off-going watchkeeper.",
        "Document the agreed operating condition and make the bridge/chief engineer aware if reliability is reduced."
      ],
      "result": "The handover is incomplete until deviations and risks are understood and recorded."
    },
    "references": [
      {
        "title": "MCA: Code of Safe Working Practices, 2026 edition",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-maintenance-planli-bakim-sistemi-pms-kritik-ekipman-tanimlamasi-4": {
    "id": "machine-maintenance-planli-bakim-sistemi-pms-kritik-ekipman-tanimlamasi-4-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Critical-equipment identification considers consequence of failure, available redundancy, detection and restoration time, not simply purchase price or physical size.\n\nCommon error: Do not defer critical maintenance solely because the equipment is rarely started.",
    "example": {
      "problem": "An emergency generator has low running hours and the PMS proposes postponing functional testing.",
      "steps": [
        "Assess the essential service it supports and the consequences of failure on demand.",
        "Review statutory/class intervals, maker instructions and prior defects, independent of the small accumulated running hours.",
        "Plan authorised inspection and testing with safeguards for electrical-system continuity."
      ],
      "result": "Low usage does not eliminate hidden standby failures or justify skipping mandatory checks."
    },
    "references": [
      {
        "title": "MCA: Code of Safe Working Practices, 2026 edition",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-engine-room-safety-yangin-guvenligi-hizli-kapatma-vanasi-quick-closing-valve-5": {
    "id": "machine-engine-room-safety-yangin-guvenligi-hizli-kapatma-vanasi-quick-closing-valve-5-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Remote quick-closing valves are intended to isolate fuel supply rapidly during a fire, typically without requiring entry to the affected space. Testing and resetting may have serious operational consequences.\n\nCommon error: Never pull an unidentified live fuel emergency shut-off as a demonstration.",
    "example": {
      "problem": "A safety drill calls for demonstrating remote shut-off of fuel to machinery.",
      "steps": [
        "Identify the correct vessel-specific valve group, protected area and consequences for running equipment.",
        "Use the approved drill method, notifications and safe isolation requirements; simulate where live activation is unsafe.",
        "Verify reset, valve status and restoration before returning the plant to normal operating condition."
      ],
      "result": "The drill should teach purpose, location and safe sequence without creating an avoidable blackout."
    },
    "references": [
      {
        "title": "MCA: Code of Safe Working Practices, 2026 edition",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-environment-machine-yag-kirliligi-onleme-annex-i-yag-su-ayirici-ows-15-ppm-standardi-1": {
    "id": "machine-environment-machine-yag-kirliligi-onleme-annex-i-yag-su-ayirici-ows-15-ppm-standardi-1-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "A 15 ppm bilge alarm and stopping device are part of an approved oily-water separation arrangement, but equipment approval never overrides MARPOL discharge conditions or local restrictions.\n\nCommon error: Never bypass a 15 ppm monitor or log a discharge that did not take place.",
    "example": {
      "problem": "A bilge alarm reports 8 ppm while the proposed discharge route is in a restricted port area.",
      "steps": [
        "Confirm vessel/area discharge permission and any local or port restrictions before looking at the number.",
        "Verify the piping arrangement and discharge controls without manipulating the sampling or alarm system.",
        "Retain wastes aboard or transfer to approved reception facilities if discharge is restricted."
      ],
      "result": "An 8 ppm indication alone is not authority to discharge."
    },
    "references": [
      {
        "title": "IMO: MARPOL convention and annexes",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx"
      },
      {
        "title": "IMO: Implementing the Ballast Water Management Convention",
        "url": "https://www.imo.org/en/mediacentre/hottopics/pages/implementing-the-bwm-convention.aspx"
      }
    ]
  },
  "machine-erm-liderlik-ve-iletisim-kapali-dongu-iletisim-closed-loop-3": {
    "id": "machine-erm-liderlik-ve-iletisim-kapali-dongu-iletisim-closed-loop-3-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "Closed-loop communication requires a precise instruction, correct read-back and explicit confirmation. The loop is especially important when similar machinery numbers or valve designations can be confused.\n\nCommon error: A nod or 'okay' is not a reliable read-back for critical plant operations.",
    "example": {
      "problem": "An engineer orders a ballast pump to stop, but the watchkeeper repeats a different pump number.",
      "steps": [
        "Stop the action before the valve or pump is operated and clarify the equipment identifier.",
        "Require an exact read-back and confirm the intended plant item against the P&ID or tagging.",
        "Verify the plant's actual state after execution and report completion."
      ],
      "result": "A missing or inaccurate read-back is an operational discrepancy to resolve before action."
    },
    "references": [
      {
        "title": "IMO: STCW convention and competence framework",
        "url": "https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx"
      },
      {
        "title": "MCA: Code of Safe Working Practices, 2026 edition",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-energy-efficiency-enerji-verimliligi-cercevesi-cii-karbon-yogunlugu-gostergesi-4": {
    "id": "machine-energy-efficiency-enerji-verimliligi-cercevesi-cii-karbon-yogunlugu-gostergesi-4-professional-application",
    "title": "Engineering reasoning and worked case",
    "content": "CII is an operational carbon-intensity indicator based on emissions and transport-work-related activity under a specified methodology. Lower total fuel consumption in isolation does not guarantee a better intensity indicator.\n\nCommon error: Do not substitute a voyage-level fuel-per-hour number for the formal attained CII.",
    "example": {
      "problem": "A ship reduces speed but experiences prolonged waiting time and cargo carried changes substantially.",
      "steps": [
        "Identify the regulation's applicable attained-CII calculation and verified activity data for the year.",
        "Compare changes in fuel emissions, distance and the relevant capacity/transport-work denominator.",
        "Evaluate operational measures, including weather routing and hull condition, without claiming one speed reduction guarantees a rating improvement."
      ],
      "result": "The compliance outcome depends on the full calculation and the applicable year's requirements."
    },
    "references": [
      {
        "title": "IMO: EEXI and CII explained",
        "url": "https://www.imo.org/en/mediacentre/hottopics/pages/eexi-cii-faq.aspx"
      },
      {
        "title": "European Commission: Maritime EU ETS questions and answers",
        "url": "https://climate.ec.europa.eu/areas-action/transport-decarbonisation/reducing-emissions-shipping-sector/faq-maritime-transport-eu-emissions-trading-system-ets_en"
      }
    ]
  },
  "navigation-overtaking": {
    "id": "navigation-overtaking-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "COLREG Rule 13 obliges the overtaking vessel to keep out of the way until finally past and clear. An approaching vessel more than 22.5° abaft another's beam is overtaking; doubt must be resolved conservatively.\n\nCommon error: Do not reclassify an ongoing overtaking situation as crossing to transfer the give-way responsibility.",
    "example": {
      "problem": "At night the approaching bridge sees only the sternlight of a vessel ahead, with decreasing range.",
      "steps": [
        "Evaluate the relative approach and confirm whether the vessel is overtaking rather than crossing.",
        "Maintain safe separation by early, substantial action while considering traffic, bank effects and available sea room.",
        "Keep responsibility until finally past and clear; monitor radar, bearings and the other ship's movements."
      ],
      "result": "The overtaking vessel's duty does not end merely because the relative bearing changes during the manoeuvre."
    },
    "references": [
      {
        "title": "IMO — COLREGs",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-head-on": {
    "id": "navigation-head-on-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "In a head-on encounter between two power-driven vessels in sight and involving collision risk, Rule 14 requires each to alter course to starboard so that they pass port-to-port. Rules 5–8 still govern lookout, assessment and effective action.\n\nCommon error: Do not apply an automatic 10° alteration to every apparent near-head-on target.",
    "example": {
      "problem": "A target is nearly ahead on a reciprocal course; the other ship's masthead lights align and both sidelights are visible.",
      "steps": [
        "Establish risk of collision with visual bearing/range trends and available radar information.",
        "Confirm Rule 14 applies and act early with a substantial course alteration to starboard.",
        "Continue monitoring CPA and the other vessel; do not stop assessing once the initial alteration is made."
      ],
      "result": "Both power-driven vessels have a Rule 14 obligation, subject to the conditions and hierarchy of the Rules."
    },
    "references": [
      {
        "title": "IMO — COLREGs",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-restricted-visibility": {
    "id": "navigation-restricted-visibility-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "When vessels are not in sight of one another in or near restricted visibility, Rule 19 applies instead of the sight-based head-on and crossing allocation. Safe speed and assessment of radar contacts are central.\n\nCommon error: Do not call a radar-only fog contact a Rule 15 crossing vessel.",
    "example": {
      "problem": "In dense fog a radar-only contact appears forward of the beam and its calculated CPA reduces.",
      "steps": [
        "Use appropriate radar plotting and proper lookout to determine risk and close-quarters development.",
        "Apply the Rule 19 precautions, including special care with course alterations to port for vessels forward of the beam.",
        "Reduce speed as required by conditions and standing orders, and continue sound-signal and bridge-team measures."
      ],
      "result": "The decision is based on restricted-visibility behaviour and available information, not visual stand-on/give-way geometry."
    },
    "references": [
      {
        "title": "IMO — COLREGs",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-hdop": {
    "id": "navigation-hdop-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "HDOP describes how satellite geometry amplifies horizontal ranging uncertainty. It is dimensionless and is not itself a position error in metres; receiver quality, interference, corrections and multipath also matter.\n\nCommon error: Never translate HDOP 0.9 directly into an error radius of 0.9 metres.",
    "example": {
      "problem": "Two GNSS receivers each display a reported HDOP of 0.9 while one has obvious position jumps near a steel structure.",
      "steps": [
        "Check independent fixes, chart/radar ranges and the receiver's actual integrity/status indications.",
        "Identify whether local multipath, interference or signal obstruction explains the position fluctuations.",
        "Use an independent position source and report the discrepancy rather than relying on HDOP alone."
      ],
      "result": "A low HDOP supports favourable geometry but does not prove the fix is correct."
    },
    "references": [
      {
        "title": "IMO — COLREGs",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-bridge-resource-management-brm": {
    "id": "navigation-bridge-resource-management-brm-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Bridge Resource Management uses challenge-response, explicit task allocation and shared situational awareness; alarms are prompts to investigate, not replacements for human cross-checks.\n\nCommon error: Do not continue a planned turn merely because the waypoint advancement occurred.",
    "example": {
      "problem": "During a coastal turn, the helmsman acknowledges a new heading but ECDIS cross-track error continues rising.",
      "steps": [
        "Call out the discrepancy and compare heading, rate of turn, COG and independent position indications.",
        "Confirm the ordered helm mode, steering response and the watch team's understanding.",
        "If navigation safety is threatened, use approved contingency and Master-calling procedures without delay."
      ],
      "result": "A successful verbal acknowledgment does not guarantee the vessel is following the intended track."
    },
    "references": [
      {
        "title": "IMO — COLREGs",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      },
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "meteorology-cephe-tipleri-ve-gecis-etkileri": {
    "id": "meteorology-cephe-tipleri-ve-gecis-etkileri-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "A cold-front passage can involve rapid wind veer/backing, pressure changes and convective weather; warm fronts often bring more layered cloud and extensive precipitation. Actual weather depends on the system and locality.\n\nCommon error: Never infer squall onset time from a single pressure reading.",
    "example": {
      "problem": "A surface analysis shows an approaching cold front while barometer trend falls and cumulonimbus develop ahead.",
      "steps": [
        "Identify the front and movement from official synoptic updates, not cloud appearance alone.",
        "Compare forecast passage time with observed pressure trend, wind shifts, visibility and squall warnings.",
        "Secure exposed deck operations, monitor the approach and update the passage risk assessment."
      ],
      "result": "The front symbol represents an analysed boundary and does not by itself specify a safe deck-work window."
    },
    "references": [
      {
        "title": "WMO — Marine services",
        "url": "https://wmo.int/activities/marine-services"
      }
    ]
  },
  "meteorology-siklonun-gozu-eye-ve-eyewall": {
    "id": "meteorology-siklonun-gozu-eye-ve-eyewall-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "In tropical cyclones, the eye may be comparatively calmer while the eyewall contains intense winds and heavy rain. A temporary lull does not imply that the storm has passed.\n\nCommon error: Do not send deck crews to work simply because wind temporarily eases.",
    "example": {
      "problem": "Wind decreases sharply on a ship already facing cyclone conditions.",
      "steps": [
        "Compare recent forecast positions, pressure tendency and wind-direction changes.",
        "Check whether the lull could be associated with the eye and whether another eyewall passage is possible.",
        "Maintain heavy-weather precautions and follow the approved avoidance and bridge-management plan."
      ],
      "result": "Conditions may worsen again rapidly; use official cyclone advisories and ship-specific operating limits."
    },
    "references": [
      {
        "title": "WMO — Marine services",
        "url": "https://wmo.int/activities/marine-services"
      }
    ]
  },
  "meteorology-dalga-yuksekligi-ve-periyot": {
    "id": "meteorology-dalga-yuksekligi-ve-periyot-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Significant wave height is a statistical measure, commonly the average of the highest third of waves, not a ceiling on individual waves. Wave period and direction strongly influence ship motions.\n\nCommon error: Do not tell crew that a 4 m Hs forecast means no waves higher than 4 m.",
    "example": {
      "problem": "A forecast indicates significant wave height 4 m and a long dominant period, while the watch observes some higher waves.",
      "steps": [
        "Distinguish Hs from individual heights and evaluate forecast uncertainty and swell components.",
        "Compare encounter period, heading and speed with the ship's roll/pitch response and cargo securing state.",
        "Use ship-specific motion limits and forecast updates to choose a prudent operating window."
      ],
      "result": "Individual waves can exceed the stated significant wave height; a single number never describes the full sea state."
    },
    "references": [
      {
        "title": "WMO — Marine services",
        "url": "https://wmo.int/activities/marine-services"
      }
    ]
  },
  "communication-gmdss-mimarisi-ve-deniz-alanlari": {
    "id": "communication-gmdss-mimarisi-ve-deniz-alanlari-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Since the 2024 GMDSS modernization, A3 is defined relative to the coverage of a recognized mobile satellite service supported by the ship earth station fitted on board, outside A1 and A2. A4 is everything outside that ship's applicable A1/A2/A3 coverage.\n\nCommon error: Do not define A3 permanently as Inmarsat's approximate 70° latitude footprint or A4 as only polar regions.",
    "example": {
      "problem": "Two ships follow the same high-latitude route: one carries a compatible recognized global satellite service and the other has a different certified arrangement.",
      "steps": [
        "Read each vessel's Safety Radio Certificate and Record of Equipment, identifying the recognized mobile satellite service and sea-area notation.",
        "Compare the actual service coverage and terrestrial DSC areas for the planned track.",
        "Confirm equipment carriage and watchkeeping under the applicable SOLAS IV requirements, rather than applying a fixed latitude boundary to both ships."
      ],
      "result": "The same position can be within one ship's certified A3 service coverage and outside another's; flag approval matters."
    },
    "references": [
      {
        "title": "IMO — Radiocommunications / GMDSS",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMSO — GMDSS and sea areas",
        "url": "https://imso.org/our-work/gmdss/what-is-the-gmdss/"
      }
    ]
  },
  "communication-ssas-gemi-guvenlik-alarm-sistemi": {
    "id": "communication-ssas-gemi-guvenlik-alarm-sistemi-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "The Ship Security Alert System is a covert security alerting means under ISPS/SOLAS XI-2 arrangements, not the radio distress alert route used by EPIRB or DSC. Recipients and test procedures are governed by the ship security plan.\n\nCommon error: Never activate live SSAS or distress transmission as an informal demonstration.",
    "example": {
      "problem": "A crew member confuses the SSAS activation point with the bridge's DSC distress alert control.",
      "steps": [
        "Differentiate maritime security escalation from a life-threatening distress radio procedure.",
        "Identify the approved ship security plan and restricted SSAS operation/test instructions without exposing protected details.",
        "Conduct only authorised tests with advance coordination with the required recipient and company security officer."
      ],
      "result": "A security alert has different handling and visibility from a routine GMDSS MAYDAY broadcast."
    },
    "references": [
      {
        "title": "IMO — Radiocommunications / GMDSS",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMSO — GMDSS and sea areas",
        "url": "https://imso.org/our-work/gmdss/what-is-the-gmdss/"
      }
    ]
  },
  "communication-cospas-sarsat-ve-meosar-uydu-tespit-sistemi": {
    "id": "communication-cospas-sarsat-ve-meosar-uydu-tespit-sistemi-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Cospas-Sarsat 406 MHz alerts are processed through the satellite segment and ground network, then forwarded through LUT/MCC arrangements to responsible SAR coordination authorities. The beacon's GNSS position and independent satellite-derived location are not identical data sources.\n\nCommon error: Do not assert that every first satellite message already contains an accurate GNSS fix.",
    "example": {
      "problem": "An EPIRB distress report initially has beacon identity but no recent encoded GNSS coordinate.",
      "steps": [
        "Check that the HEX identification identifies the beacon and its registration; do not mistake an absent coordinate for an absent alert.",
        "Understand how compatible satellite processing can contribute location estimation as observations accumulate.",
        "Forward verified ship position and survival-craft information through proper distress communication channels when able."
      ],
      "result": "An initially missing encoded GNSS coordinate is not proof that the beacon cannot alert SAR."
    },
    "references": [
      {
        "title": "IMO — Radiocommunications / GMDSS",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMSO — GMDSS and sea areas",
        "url": "https://imso.org/our-work/gmdss/what-is-the-gmdss/"
      }
    ]
  },
  "communication-iamsar-sar-coordination": {
    "id": "communication-iamsar-sar-coordination-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "SAR communications separate alert receipt, on-scene coordination, search planning and rescue execution. The duty to assist and the authority of designated coordinators depend on the actual situation and governing plans.\n\nCommon error: Do not assume the first ship arriving becomes the permanent coordinator without agreement.",
    "example": {
      "problem": "A merchant vessel is assigned to assist a search while several craft are in the area.",
      "steps": [
        "Clarify the coordinating authority and any On-Scene Coordinator designation using the agreed working channel.",
        "Exchange own position, manoeuvring constraints, search capability and observed contacts in clear standard phrases.",
        "Record tasking, changes and any survivor recovery actions, and preserve safe navigation and crew exposure controls."
      ],
      "result": "Radio discipline and shared search geometry prevent duplicative or unsafe movements."
    },
    "references": [
      {
        "title": "IMO — Radiocommunications / GMDSS",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMSO — GMDSS and sea areas",
        "url": "https://imso.org/our-work/gmdss/what-is-the-gmdss/"
      }
    ]
  },
  "safety-can-kurtarma-araclari-lsa": {
    "id": "safety-can-kurtarma-araclari-lsa-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "A lifeboat is a survival craft, while a rescue boat is intended for recovering persons and marshalling survival craft; some installations may meet both roles. Launching procedures are equipment-specific and require trained crew.\n\nCommon error: Never improvise hook, painter or release sequences from another vessel's equipment.",
    "example": {
      "problem": "During a drill, the designated crew can locate the rescue boat but cannot explain its release arrangement.",
      "steps": [
        "Identify the craft type, capacity placards and the maker-approved launch/recovery instructions.",
        "Trace hazards such as falls, hooks, access to embarkation stations and communication with the bridge.",
        "Conduct an authorised dry or live drill suited to weather and vessel conditions, then document deficiencies."
      ],
      "result": "A boat in the correct cradle does not demonstrate that its crew can operate it safely."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "safety-yanginla-mucadele-ve-sonduruculer": {
    "id": "safety-yanginla-mucadele-ve-sonduruculer-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Portable extinguishers must be matched to the fuel, fire class and electrical risk, and their availability does not replace alarm raising or escape-route assessment. Fire class terminology may vary by jurisdiction.\n\nCommon error: Do not direct an unapproved water jet into live electrical equipment.",
    "example": {
      "problem": "A small burning spill occurs near energised electrical equipment in a machinery workshop.",
      "steps": [
        "Raise the alarm and assess the escape path and safe isolation opportunity.",
        "Identify the burning fuel and electrical exposure before selecting an approved extinguisher suitable for both.",
        "If safe first attack cannot be maintained, withdraw, close access as directed and support organised response."
      ],
      "result": "Correct agent selection depends on the fuel and exposure; an electrical supply is not itself a fuel class."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "safety-flooding-hasar-kontrolu-ve-yara-savunma": {
    "id": "safety-flooding-hasar-kontrolu-ve-yara-savunma-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Flooding response combines watertight integrity, source identification, stability awareness, tank soundings and boundary integrity. Pump capacity can be exceeded by rising ingress even if a bilge alarm is acknowledged.\n\nCommon error: Never open a watertight boundary or start counter-flooding without the approved damage-stability assessment.",
    "example": {
      "problem": "After a heavy impact, one compartment's level rises despite a bilge pump running.",
      "steps": [
        "Raise the emergency response and establish compartment boundaries and personnel accountability.",
        "Check soundings, flooding rate, heel/trim, pump status and watertight-door/valve lineups.",
        "Use the approved damage-control plan, stability assessment and command instructions rather than opening unassessed boundaries."
      ],
      "result": "Pump operation alone is not evidence that flooding is under control."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "safety-gemide-tibbi-ilk-yardim-ve-tmas": {
    "id": "safety-gemide-tibbi-ilk-yardim-ve-tmas-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "TMAS provides medical advice at sea; the bridge team must send precise observations and follow qualified medical direction. Initial emergency response should follow the vessel's trained first-aid protocols.\n\nCommon error: Never delay immediate trained first aid solely to complete paperwork.",
    "example": {
      "problem": "A crew member collapses, is breathing but unresponsive, and has recently worked in a hot machinery space.",
      "steps": [
        "Establish scene safety, summon trained medical responders and immediately assess breathing and responsiveness under first-aid training.",
        "Contact TMAS using the appropriate communication route with position, age if known, observations, medications and vitals when safely available.",
        "Record times and medical instructions, monitor deterioration, and coordinate evacuation capability as directed."
      ],
      "result": "Accurate observations and early escalation assist diagnosis without an untrained crew member prescribing treatment."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "stability-3-4-tpc-ve-paralel-batma-4": {
    "id": "stability-3-4-tpc-ve-paralel-batma-4-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "TPC is the approximate mass necessary to change mean draught by 1 cm near the stated waterline, derived from waterplane area and water density. It varies with draught and loading condition.\n\nCommon error: Do not treat TPC as constant over large draught changes.",
    "example": {
      "problem": "A vessel has a tabulated TPC of 22 t/cm at the present draught and takes on 110 tonnes distributed without appreciable trim.",
      "steps": [
        "Estimate parallel sinkage: 110 / 22 = 5 cm.",
        "Confirm that the added weight is nearly longitudinally balanced so trim change is negligible.",
        "Repeat using updated hydrostatics, water density and actual weight distribution for an operational result."
      ],
      "result": "Five centimetres is a local approximation, not guaranteed aft or forward draft change."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "stability-2-7-dogrultma-kolu-gz-8": {
    "id": "stability-2-7-dogrultma-kolu-gz-8-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "GZ is the horizontal lever between weight and buoyancy lines of action at a given angle of heel. Righting moment equals displacement weight multiplied by GZ under the corresponding units and assumptions.\n\nCommon error: Do not use the small-angle GM approximation as an unrestricted large-angle GZ formula.",
    "example": {
      "problem": "A ship has displacement 15,000 tonnes and a GZ of 0.4 m at a specific angle.",
      "steps": [
        "Express the mass displacement as weight when calculating SI righting moment: 15,000,000 kg × 9.81 m/s².",
        "Multiply by the righting lever: 15,000,000 × 9.81 × 0.4 ≈ 58.9 MN·m.",
        "Interpret the result at that heel only, then compare with the full approved GZ curve and downflooding limits."
      ],
      "result": "About 58.9 MN·m is the illustrative righting moment at the stated heel, not the dynamic stability area."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "stability-7-7-serbest-yuzey-duzeltmesi-hesaplamalari-7": {
    "id": "stability-7-7-serbest-yuzey-duzeltmesi-hesaplamalari-7-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "The free-surface correction can be represented as a virtual rise of G for applicable tanks. Approved stability-booklet tables, density and actual slack-tank states must replace oversimplified constant corrections.\n\nCommon error: Do not add separate tank corrections to a stability output already corrected for free surface.",
    "example": {
      "problem": "Two slack tanks have tabulated free-surface moments 250 and 350 t·m; ship displacement is 10,000 t and initial GM is 0.80 m.",
      "steps": [
        "Sum the applicable FSMs: 250 + 350 = 600 t·m.",
        "Compute virtual correction 600 / 10,000 = 0.06 m and corrected GM = 0.74 m.",
        "Reassess actual tank contents, free-surface assumptions and all stability criteria on the approved loading instrument."
      ],
      "result": "The example yields corrected GM 0.74 m only under the stated table conventions."
    },
    "references": [
      {
        "title": "IMO — Cargoes and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      }
    ]
  },
  "cargo-kati-dokme-yukler-ve-imsbc-code": {
    "id": "cargo-kati-dokme-yukler-ve-imsbc-code-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "IMSBC Group A includes cargoes liable to liquefy or dynamically separate under relevant moisture conditions. Shipper documents and sampling arrangements matter; the master should not rely on the cargo looking dry.\n\nCommon error: Never accept a wet Group A cargo simply because the hatch cover can be closed quickly.",
    "example": {
      "problem": "A Group A cargo declaration reports a moisture content near the stated Transportable Moisture Limit (TML), but heavy rain follows sampling.",
      "steps": [
        "Check the current IMSBC schedule, signed TML and moisture certificates/declarations and their sample dates.",
        "Evaluate the impact of subsequent rainfall and cargo-stockpile condition, requiring reassessment or testing under the relevant provisions.",
        "Do not commence or continue loading unless moisture controls and shipper evidence satisfy the applicable Code."
      ],
      "result": "Moisture content must be less than the applicable TML with valid controls; visual dryness is not an accepted test."
    },
    "references": [
      {
        "title": "IMO — Cargoes",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "UK Government — IMSBC Code amendments",
        "url": "https://assets.publishing.service.gov.uk/media/68b0502ace0a11bb78a4f16f/TS_50.2025_Amendments_Solid_Bulk_Cargoes_Convention_Safety_of_Life_at_Sea_Vol_I.pdf"
      }
    ]
  },
  "cargo-tahil-yukleri-ve-tahil-stabilitesi": {
    "id": "cargo-tahil-yukleri-ve-tahil-stabilitesi-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Grain cargo can shift in partly filled spaces and create heeling moments, so grain-stability requirements and approved loading conditions differ from ordinary solid bulk treatment.\n\nCommon error: Do not use an ordinary bulk-cargo stability calculation in place of grain-shift criteria.",
    "example": {
      "problem": "A plan proposes leaving one grain hold slack, relying on the ship's positive GM alone.",
      "steps": [
        "Locate the grain loading information, approved grain heeling moments and filling/securement assumptions.",
        "Model the actual partly filled hold and any shifting risk using the approved grain stability calculation.",
        "Verify compliance with all applicable grain stability criteria before accepting the loading plan."
      ],
      "result": "Positive GM by itself does not establish grain loading compliance."
    },
    "references": [
      {
        "title": "IMO — Cargoes",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "UK Government — IMSBC Code amendments",
        "url": "https://assets.publishing.service.gov.uk/media/68b0502ace0a11bb78a4f16f/TS_50.2025_Amendments_Solid_Bulk_Cargoes_Convention_Safety_of_Life_at_Sea_Vol_I.pdf"
      }
    ]
  },
  "cargo-lpg-ve-lng-yuk-operasyonlari": {
    "id": "cargo-lpg-ve-lng-yuk-operasyonlari-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Liquefied-gas cargo operations involve temperature, pressure, cargo compatibility and hazardous-area controls. Cargo transfer procedures depend on tank type and the vessel's approved cargo system and terminal interface.\n\nCommon error: Never bypass an ESD or manifold alarm to keep cargo operations on schedule.",
    "example": {
      "problem": "Before LNG transfer, ship and shore pressure monitoring disagree and one manifold alarm is not responding.",
      "steps": [
        "Pause transfer readiness and compare agreed ship/shore checklists, measurement points and alarm-system state.",
        "Escalate to the cargo officer, terminal and responsible engineers to identify instrumentation or communication failure.",
        "Proceed only after testing and authorising the agreed transfer limits and emergency shutdown interfaces."
      ],
      "result": "A signed checklist cannot compensate for a nonfunctional transfer-critical protection."
    },
    "references": [
      {
        "title": "IMO — Cargoes",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "UK Government — IMSBC Code amendments",
        "url": "https://assets.publishing.service.gov.uk/media/68b0502ace0a11bb78a4f16f/TS_50.2025_Amendments_Solid_Bulk_Cargoes_Convention_Safety_of_Life_at_Sea_Vol_I.pdf"
      }
    ]
  },
  "seamanship-yedekleme-towing-operasyonlari": {
    "id": "seamanship-yedekleme-towing-operasyonlari-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "Towline tension reflects dynamic loads, vessel motions and relative movement, not only bollard-pull rating. Towing arrangements also require compatible fittings, release capability and agreed communications.\n\nCommon error: Never use an unverified deck fitting simply because it is reachable.",
    "example": {
      "problem": "A tug approaches a disabled vessel in freshening weather while the tow connection point is uncertain.",
      "steps": [
        "Confirm towing plan, rated strong points and release systems for both vessels.",
        "Establish communications, relative approach and safe exclusion zones away from potential towline recoil.",
        "Do not transfer the tow or put crew at the connection until all parties approve the method and weather limits."
      ],
      "result": "The tug's rated bollard pull is not the working load limit of every connected fitting."
    },
    "references": [
      {
        "title": "MCA — Merchant seafarer safe working practices",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "environment-marpol-ek-iv-pis-su-sewage": {
    "id": "environment-marpol-ek-iv-pis-su-sewage-professional-application",
    "title": "Operational reasoning and verified scenario",
    "content": "MARPOL Annex IV sewage requirements vary by plant approval, comminution/disinfection status, distance from nearest land and special provisions. Retention is the safe option when discharge conditions are uncertain.\n\nCommon error: Do not invent a universal overboard discharge distance for every sewage type and operating condition.",
    "example": {
      "problem": "An engineer proposes releasing untreated sewage close to shore on the basis that the holding tank is nearly full.",
      "steps": [
        "Identify the treatment arrangement, applicable area and distance limits under the ship's approved plan and local requirements.",
        "Verify remaining holding capacity, any permitted discharge route and shore-reception availability.",
        "Document the actual disposal or retention decision under the vessel's procedures."
      ],
      "result": "Tank capacity pressure does not create an exemption from sewage-discharge restrictions."
    },
    "references": [
      {
        "title": "IMO — MARPOL overview",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx"
      }
    ]
  },
  "navigation-cografi-koordinat-sistemi": {
    "id": "navigation-cografi-koordinat-sistemi-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Position coordinates must identify latitude and longitude hemispheres together with the chart datum; a coordinate without N/S or E/W can produce a gross position error.\n\nCommon error: Do not silently assume N/E or WGS 84 for coordinates copied from a different source.",
    "example": {
      "problem": "A waypoint is passed to another watch with latitude 36°12.5′ and longitude 029°45.0′ but no hemisphere or datum.",
      "steps": [
        "Specify degrees, decimal minutes, hemisphere and applicable datum in the waypoint exchange.",
        "Cross-check the plotted position against the planned chart region and nearby hazards.",
        "Compare the plotted mark with the GNSS/ECDIS reference and independent observation before activating the route."
      ],
      "result": "A waypoint handover is not complete unless its coordinate format, hemispheres and datum are unambiguous."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-manyetik-kuzey": {
    "id": "navigation-manyetik-kuzey-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Magnetic variation is the angular difference between true and magnetic north, varying by area and time; compass deviation is the error associated with the individual ship's compass heading.\n\nCommon error: Do not apply both corrections as positive just because each is given as a magnitude.",
    "example": {
      "problem": "A chart shows a westerly variation of 4° and the ship's deviation card gives 2° east on the selected course; true bearing is 080°.",
      "steps": [
        "Apply the ship's signed variation/deviation convention explicitly (for example, True = Compass + deviation + variation when east is positive).",
        "With deviation +2° and variation −4°, the compass bearing is 080° −2° +4° = 082° under that convention.",
        "Compare with a known transit or a reliable gyro bearing and the compass correction card."
      ],
      "result": "The example compass bearing is 082°; onboard sign convention and current variation must be checked."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-cayro-pusula-ve-hatalari": {
    "id": "navigation-cayro-pusula-ve-hatalari-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Gyrocompass and magnetic compass provide distinct heading references. Gyro error changes with instrument state, speed/latitude influences, installation and sensor failures; it should not be treated as zero because it is electronic.\n\nCommon error: Do not assume the radar heading line is independent when it is fed by the same gyro.",
    "example": {
      "problem": "The gyro repeater shows 091° while a checked celestial or terrestrial azimuth suggests true heading 088°.",
      "steps": [
        "Confirm that the reference observation and timestamp are valid and compare master/repeater readings.",
        "Determine gyro error with the vessel's gyro-error sign convention and log the finding.",
        "Verify heading sensors feeding radar, ECDIS and autopilot, and inform the Master if the discrepancy is outside limits."
      ],
      "result": "A 3° heading discrepancy can propagate to bearings and track predictions; classify the source before correction."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-harita-duzeltmeleri-notice-to-mariners": {
    "id": "navigation-harita-duzeltmeleri-notice-to-mariners-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Navigational warnings and permanent chart corrections address different timescales. An ECDIS update status or a paper chart edition does not necessarily incorporate temporary hazards communicated by MSI.\n\nCommon error: Do not dismiss an active warning because the obstruction is absent from the ENC.",
    "example": {
      "problem": "Before coastal passage, a navigation warning reports a new obstruction near a waypoint that is not on the base chart.",
      "steps": [
        "Record the warning identifier, position, depth and validity as provided.",
        "Plot or encode the hazard with the approved procedure while preserving datum and coordinates.",
        "Recheck route legs, cross-track limits, ECDIS safety settings and bridge-team briefing."
      ],
      "result": "The route must be assessed against current MSI as well as the chart/update record."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-chart-datum-lat": {
    "id": "navigation-chart-datum-lat-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Chart Datum is the reference surface from which charted depths are normally measured. Tide heights above the applicable chart datum may be combined with chart depths for a static depth estimate, but LAT is not a synonym for every national chart datum.\n\nCommon error: Never combine depth on one datum with a tide prediction referenced to another without conversion.",
    "example": {
      "problem": "A berth shows 9.0 m charted depth and the official tidal prediction is 1.1 m above the chart's datum.",
      "steps": [
        "Identify the actual datum and tide station correction for the berth.",
        "Compute illustrative depth: 9.0 + 1.1 = 10.1 m, before local changes and error allowances.",
        "Compare with the vessel's draught, trim, squat, manoeuvring requirements and UKC policy."
      ],
      "result": "The estimate 10.1 m is a static depth under the stated datum assumptions, not an under-keel clearance."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "navigation-mesafe-olcumu": {
    "id": "navigation-mesafe-olcumu-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "On a Mercator navigation chart, distance should be taken from the latitude scale near the route, where one minute of latitude is approximately one nautical mile; paper chart distortion varies with latitude.\n\nCommon error: Do not measure route distance from a fixed map-scale ruler without confirming projection and local scale.",
    "example": {
      "problem": "A student transfers the length of a 12′ north-south leg on a coastal chart using the longitude scale.",
      "steps": [
        "Check the leg and place dividers against the local latitude graduation.",
        "Read 12 minutes of latitude as approximately 12 NM for the meridional distance.",
        "On a non-meridional leg, use the actual chart geometry and appropriate navigation calculation."
      ],
      "result": "The longitude scale is not a universal miles ruler on a Mercator chart."
    },
    "references": [
      {
        "title": "NGA — American Practical Navigator",
        "url": "https://msi.nga.mil/Publications/APN"
      }
    ]
  },
  "safety-solas-ve-emniyet-yonetimi-ism": {
    "id": "safety-solas-ve-emniyet-yonetimi-ism-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "SOLAS prescribes safety requirements and ISM implements a company and shipboard Safety Management System. Equipment presence, valid certificates and personnel competence each require separate evidence.\n\nCommon error: Do not sign a test record for a function that the responsible crew could not complete.",
    "example": {
      "problem": "During PSC preparation, an emergency fire pump is present, but the crew report inconsistent starting instructions.",
      "steps": [
        "Review the approved SMS procedure, drawings and relevant SOLAS/flag requirements.",
        "Arrange a controlled functional demonstration by authorised crew, recording defects and corrective action.",
        "Confirm that the actual drill instructions, PMS status and familiarisation match the equipment's installation."
      ],
      "result": "Paper compliance does not replace demonstrated operational readiness."
    },
    "references": [
      {
        "title": "IMO — lifeboat and safety management framework",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventionofaccidentsinvolvinglifeboats-default.aspx"
      }
    ]
  },
  "safety-yangin-onleme-ve-yapisal-koruma": {
    "id": "safety-yangin-onleme-ve-yapisal-koruma-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Fire integrity depends on A/B class divisions, penetrations, dampers, fire doors and detection zones as actually approved for the vessel. Fire ratings are not the same as a guarantee of unlimited fire resistance.\n\nCommon error: Do not fill a rated bulkhead penetration with arbitrary foam or sealant.",
    "example": {
      "problem": "A cable penetration has been opened through an A-class boundary during maintenance.",
      "steps": [
        "Identify the division's approved classification and approved penetration sealing method.",
        "Protect the worksite under the appropriate permit and restore using an approved material/system.",
        "Inspect and record reinstatement; check the corresponding fire control plan and alteration approvals."
      ],
      "result": "An apparently closed opening is not compliant unless the penetration seal maintains the required class."
    },
    "references": [
      {
        "title": "IMO — lifeboat and safety management framework",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventionofaccidentsinvolvinglifeboats-default.aspx"
      }
    ]
  },
  "safety-denizcilikte-siber-guvenlik": {
    "id": "safety-denizcilikte-siber-guvenlik-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Maritime cyber risk can affect GNSS, ECDIS updates, PMS and cargo systems; operational safety requires segregation, trusted change management and a fallback when electronic inputs are questionable.\n\nCommon error: Do not connect an unknown USB drive directly to a safety-critical navigation console.",
    "example": {
      "problem": "A removable drive is offered for an urgent ECDIS chart update from an unrecognised source.",
      "steps": [
        "Check the provenance and update path against the company's cyber security and ECDIS maintenance procedures.",
        "Reject unverified software/media; isolate suspected compromised devices and notify the authorised personnel.",
        "Preserve safe navigation using verified chart data and approved backup arrangements while assessing the incident."
      ],
      "result": "Urgency does not excuse bypassing approved update integrity and cybersecurity controls."
    },
    "references": [
      {
        "title": "IMO — lifeboat and safety management framework",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventionofaccidentsinvolvinglifeboats-default.aspx"
      }
    ]
  },
  "communication-epirb-sart-ve-arama-kurtarma-entegrasyonu": {
    "id": "communication-epirb-sart-ve-arama-kurtarma-entegrasyonu-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "A 406 MHz EPIRB alerts Cospas-Sarsat through the satellite/ground network; 121.5 MHz aids local homing. A 9 GHz radar-SART responds to X-band radar, while AIS-SART or AIS-equipped EPIRBs may appear on suitable AIS displays.\n\nCommon error: Never use a live distress alert or a radar-SART response as an unplanned test.",
    "example": {
      "problem": "During an abandon-ship briefing someone says the EPIRB will make twelve dots on radar.",
      "steps": [
        "Separate the 406 MHz distress alert, 121.5 MHz homing and AIS transmissions where equipped.",
        "Explain the radar-SART's characteristic response to a compatible X-band interrogating radar.",
        "Check actual onboard device types, battery dates and safe test procedure without activating distress transmission."
      ],
      "result": "A standard EPIRB does not produce radar-SART twelve-dot trails."
    },
    "references": [
      {
        "title": "IMO — GMDSS radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      }
    ]
  },
  "communication-mf-hf-telsiz-ve-dalga-yayilimi": {
    "id": "communication-mf-hf-telsiz-ve-dalga-yayilimi-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "MF/HF communications depend on propagation, chosen frequencies, antenna tuning, equipment status and the DSC watch arrangement. A nominal station range is not a reliable operational coverage guarantee.\n\nCommon error: Do not disable required DSC watch facilities while experimenting with voice channels.",
    "example": {
      "problem": "The bridge fails to obtain a daytime HF contact on a frequency previously reliable overnight.",
      "steps": [
        "Check propagation, day/night frequency suitability and a second appropriate working channel.",
        "Check radio and antenna-tuner alarms, power supply and connection status under the maker's guidance.",
        "Use another approved GMDSS communication path and log any equipment discrepancy affecting required watchkeeping."
      ],
      "result": "Different ionospheric conditions may require a different operating band; verify equipment before assuming it is propagation alone."
    },
    "references": [
      {
        "title": "IMO — GMDSS radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      }
    ]
  },
  "communication-ais-otomatik-tanimlama-sistemi": {
    "id": "communication-ais-otomatik-tanimlama-sistemi-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "AIS supplies transmitted identity and movement data but is not an independent collision avoidance sensor. GNSS input failures, erroneous static data and human edits can mislead the bridge.\n\nCommon error: Never use AIS alone to establish safe passing arrangements.",
    "example": {
      "problem": "AIS lists a target with CPA 0.2 NM, but visual lookout reports a different ship bearing from the one on the ECDIS overlay.",
      "steps": [
        "Correlate the displayed AIS target with radar, visual bearings and the ship's sensor timestamps.",
        "Check target association, own-ship GNSS and heading sources, and AIS data age.",
        "Make the collision avoidance decision using all available means and COLREG risk assessment."
      ],
      "result": "AIS target association errors require investigation before relying on displayed CPA."
    },
    "references": [
      {
        "title": "IMO — GMDSS radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      }
    ]
  },
  "machine-auxiliary-buhar-kazanlari-ates-borulu-ve-su-borulu-kazanlar-1": {
    "id": "machine-auxiliary-buhar-kazanlari-ates-borulu-ve-su-borulu-kazanlar-1-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Fire-tube boilers route hot combustion products through tubes surrounded by water, while water-tube designs circulate water/steam inside tubes exposed to hot gases. Both require correctly set water-level safeguards and blowdown plans.\n\nCommon error: Never feed large quantities of cold water into a potentially overheated dry boiler without approved expert instructions.",
    "example": {
      "problem": "A boiler's sight glass suggests low water while an electronic level indication reads normal.",
      "steps": [
        "Treat the discrepancy as a serious protective-control abnormality and follow the maker's safe shutdown/verification procedure.",
        "Cross-check independent indications and control/protection status without bypassing low-water interlocks.",
        "Investigate water treatment, level sensing and causes only once the boiler is safe and appropriately isolated."
      ],
      "result": "The correct response is not to keep firing solely on the more reassuring indication."
    },
    "references": [
      {
        "title": "MCA — Safe working practices for merchant seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-auxiliary-tatli-su-uretimi-ters-ozmoz-ro-sistemi-2": {
    "id": "machine-auxiliary-tatli-su-uretimi-ters-ozmoz-ro-sistemi-2-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "Reverse osmosis drives seawater through semipermeable membranes at pressure above osmotic pressure. Product-water quality, filter differential pressure and membrane limits must all be managed.\n\nCommon error: Do not route high-conductivity product water into drinking-water tanks to avoid a production interruption.",
    "example": {
      "problem": "A shipboard RO unit has normal feed pressure but conductivity of product water rises beyond the configured alarm.",
      "steps": [
        "Confirm which conductivity sensor and temperature compensation are used, and take the unit out of domestic-water supply if quality is uncertain.",
        "Check pretreatment, membrane integrity, reject/brine flow and cleaning history following the approved maker procedure.",
        "Restore only after verified test results demonstrate water quality meets the designated use."
      ],
      "result": "Stable pressure alone does not prove a membrane is producing acceptable water."
    },
    "references": [
      {
        "title": "MCA — Safe working practices for merchant seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-electrical-high-voltage-safety": {
    "id": "machine-electrical-high-voltage-safety-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "High-voltage marine electrical systems require authorised switching, isolation, testing for dead and earthing where specified. The correct safe state is established by the vessel's approved procedures and equipment ratings.\n\nCommon error: Never use ordinary low-voltage tools or unapproved access to establish HV isolation.",
    "example": {
      "problem": "An HV feeder breaker is open but an electrician reports voltage still indicated on an outgoing cable.",
      "steps": [
        "Stop work and treat the cable as energised until proven otherwise by authorised personnel.",
        "Verify the actual source configuration, backfeeds, isolation points, permits and rated test equipment under the vessel's switching plan.",
        "Complete lockout, test-for-dead, discharge/earthing and access controls as required before any work."
      ],
      "result": "An open breaker handle or dashboard icon alone is not proof of zero energy."
    },
    "references": [
      {
        "title": "MCA — Safe working practices for merchant seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-electrical-elektrik-uretim-sistemi-shore-connection-kiyi-baglantisi-6": {
    "id": "machine-electrical-elektrik-uretim-sistemi-shore-connection-kiyi-baglantisi-6-professional-application",
    "title": "Practical procedure, reasoning and limitations",
    "content": "High-voltage shore connection must coordinate voltage, frequency, phase sequence, grounding and protections between ship and terminal under an approved transfer plan. Galvanic and fault-current hazards are separate considerations.\n\nCommon error: Never force-synchronise an incompatible shore feed or bypass interlocks to meet departure schedule.",
    "example": {
      "problem": "A ship is ready to connect shore power but the terminal's available frequency differs from the shipboard electrical bus.",
      "steps": [
        "Review compatibility, conversion arrangements and ship/shore interlocks under the approved shore-connection procedure.",
        "Confirm earthing, communication, breaker status and load transfer readiness with qualified parties.",
        "Do not energise until the voltage/frequency/phase and protection criteria are satisfied and authorisation is documented."
      ],
      "result": "The physical connector fitting does not prove electrical compatibility."
    },
    "references": [
      {
        "title": "MCA — Safe working practices for merchant seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "navigation-radar-ile-mevki-tayini": {
    "id": "navigation-radar-ile-mevki-tayini-professional-application",
    "title": "Operational application and error analysis",
    "content": "Radar range measurements can establish an independent position fix when suitable land features and geometric intersection are available. Radar bearings may be less accurate than ranges depending on beamwidth and gyro-heading errors; chart and radar must use a consistent datum.\n\nCommon error: Do not accept an ARPA-moving target or the nearest unidentified echo as a charted fixed landmark.",
    "example": {
      "problem": "A GNSS position becomes unstable close to a coastline but two distinct charted headlands are detectable by radar.",
      "steps": [
        "Choose two identifiable fixed radar targets whose charted features correspond to their detectable echoes, avoiding ambiguous shorelines.",
        "Measure two ranges at nearly the same instant, plot range arcs on the correct chart projection and cross-check their intersection with a third bearing/range when available.",
        "Compare the independent fix to the ECDIS own ship position, tide/clearance margins and the predicted track; report any unexplained discrepancy."
      ],
      "result": "A crossed-range fix can support independent navigation, but two almost tangent arcs will produce an ill-conditioned position."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-radar-prensibi": {
    "id": "navigation-radar-prensibi-professional-application",
    "title": "Operational application and error analysis",
    "content": "Marine radar estimates target range from the round-trip time of radio pulses. X- and S-band radars have different propagation/rain and resolution characteristics; echo strength also depends on target geometry, shadowing and sea clutter.\n\nCommon error: Aggressive clutter suppression can erase small craft and buoys.",
    "example": {
      "problem": "A small vessel appears on X-band radar but its echo intermittently disappears when precipitation increases.",
      "steps": [
        "Check the actual target visually and with the second radar band if fitted; do not infer absence from an intermittent echo.",
        "Adjust range scale, gain and sea/rain clutter controls according to maker instructions, observing how they affect small target detection.",
        "Verify radar performance monitoring and collision-risk assessment with all available means."
      ],
      "result": "Radar coverage changes with clutter settings, propagation and target cross-section; no single gain setting guarantees detection."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-paralel-indeks-radar": {
    "id": "navigation-paralel-indeks-radar-professional-application",
    "title": "Operational application and error analysis",
    "content": "Parallel indexing (PI) provides a radar-based monitoring line offset from the planned track to help maintain a safe passing distance from fixed charted features. It is not an independent position fix or a substitute for lookout.\n\nCommon error: Do not create a PI on a moving vessel or rely on it without checking the correct target identity.",
    "example": {
      "problem": "A planned track passes 0.7 NM off an isolated headland in moderate visibility.",
      "steps": [
        "Select and chart-check a fixed, radar-conspicuous feature corresponding to the planned offset.",
        "Set the PI line consistently with the course and relevant charted clearance; validate initial echo alignment with a reliable fix.",
        "Monitor changes and take action under the passage plan; cross-check GNSS/radar position and under-keel margins."
      ],
      "result": "The echo should remain consistently related to the PI reference when the vessel follows the intended track, subject to target geometry and measurement uncertainty."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-gps-sinirlamalari-ve-operasyonel-riskler": {
    "id": "navigation-gps-sinirlamalari-ve-operasyonel-riskler-professional-application",
    "title": "Operational application and error analysis",
    "content": "GNSS reliability can be affected by spoofing, jamming, multipath, antenna failure and shared sensor feeds. Multiple screens agreeing is not independent corroboration if they use the same receiver or antenna.\n\nCommon error: A low HDOP or a healthy satellite count does not exclude spoofing.",
    "example": {
      "problem": "ECDIS, AIS own-ship and a portable plotter all show a sudden offshore position jump, while radar ranges and coastline remain unchanged.",
      "steps": [
        "Check the data-source chain for all three displays; determine whether they share GNSS inputs.",
        "Use radar ranges, visual bearings, dead reckoning and approved backup positioning arrangements to establish likely position.",
        "Notify bridge team/Master, mark suspect sensor information and preserve a timed log of discrepancies and mitigation."
      ],
      "result": "Correlation across displays is not proof of independent position integrity when sensors share a common source."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-elektronik-seyirde-capraz-kontrol": {
    "id": "navigation-elektronik-seyirde-capraz-kontrol-professional-application",
    "title": "Operational application and error analysis",
    "content": "ECDIS, radar and AIS are complementary but can share common heading, log and position errors. Independent cross-checks are based on distinct principles, not just different display brands.\n\nCommon error: Never treat radar overlay alignment as a guarantee that every sensor is correct.",
    "example": {
      "problem": "An ECDIS charted buoy is displayed on the same bearing as a radar contact, but its range differs materially.",
      "steps": [
        "Confirm radar target identification, chart datum, chart updates, and antenna/ship reference point offsets.",
        "Check tide, buoy swing and radar range corrections while comparing alternative shore ranges or visual fixes.",
        "Re-evaluate the vessel position and passage plan before navigating by an inconsistent overlay."
      ],
      "result": "A mismatch requires source diagnosis rather than blindly moving the displayed own-ship position."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-seyir-fenerleri-yay-ve-menzil": {
    "id": "navigation-seyir-fenerleri-yay-ve-menzil-professional-application",
    "title": "Operational application and error analysis",
    "content": "COLREG navigation lights have defined sectors, colours and minimum ranges based on vessel class and size. Geographical detection distance also depends on meteorological visibility and height of eye; a light's legal nominal range is not the distance at which every observer will see it.\n\nCommon error: Do not infer that a vessel is absent because a particular light is not yet visible at an assumed range.",
    "example": {
      "problem": "At night an approaching vessel's starboard sidelight becomes visible but its masthead light is briefly obscured by coastal background lights.",
      "steps": [
        "Use a continuous sight/hearing lookout and radar plot to assess target motion; verify identification of the observed light.",
        "Apply the actual light sector and vessel orientation information rather than equating one light with a precise heading.",
        "Keep collision risk assessment under Rules 5–8 and record/communicate uncertainty until the contact is reliably identified."
      ],
      "result": "A single sighting can constrain possible target orientation but cannot by itself establish precise course, risk or stand-on status."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-colreg-temel-prensipleri": {
    "id": "navigation-colreg-temel-prensipleri-professional-application",
    "title": "Operational application and error analysis",
    "content": "COLREG Rules 5–8 apply across the routine collision-avoidance decision chain: effective lookout, safe speed, risk assessment with all available means, and timely substantial action. Later encounter rules do not replace those fundamentals.\n\nCommon error: Do not assume an apparently acceptable predicted CPA proves there is no risk of collision.",
    "example": {
      "problem": "In a busy traffic area a junior watchkeeper sees a target closing but reports that AIS CPA is just above the company's preferred limit.",
      "steps": [
        "Verify risk through systematic visual bearing trends, radar plotting and all available independent information.",
        "Review safe speed and available manoeuvring room; do not treat an arbitrary company CPA target as the only legal test.",
        "Take or propose appropriate early substantial action under the applicable encounter rules and reassess until clear."
      ],
      "result": "Risk assessment is dynamic: CPA numbers alone cannot replace lookout, safe speed and relative-motion analysis."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-seyir-cihazi-arizalari-ve-yedek-seyir": {
    "id": "navigation-seyir-cihazi-arizalari-ve-yedek-seyir-professional-application",
    "title": "Operational application and error analysis",
    "content": "Failure management must distinguish display, transducer, data bus and electrical supply faults. Backup navigation is only credible if equipment independence and competent procedures have been verified.\n\nCommon error: Do not conceal an active sensor alarm just to silence a navigation display.",
    "example": {
      "problem": "Both ECDIS units display an identical erroneous ship position after a GNSS source alarm.",
      "steps": [
        "Trace the position source on each ECDIS and check whether both use the same failed GNSS sensor.",
        "Switch to an approved alternate sensor or backup navigation arrangement in accordance with bridge procedures.",
        "Increase independent position-fix frequency, update the passage-risk assessment and report the fault to the Master."
      ],
      "result": "Two ECDIS consoles are not independent if both derive position from one failed upstream source."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "navigation-psc-bakis-acisi": {
    "id": "navigation-psc-bakis-acisi-professional-application",
    "title": "Operational application and error analysis",
    "content": "Port State Control may examine whether charts/publications are adequate and updated, critical alarms are functional and crew are familiar with approved procedures. Demonstrated operation and actual records are stronger evidence than generic compliance claims.\n\nCommon error: Never fabricate an equipment-test entry or silently change a documented route after the inspector has identified a discrepancy.",
    "example": {
      "problem": "A surveyor asks the watch officer to demonstrate how to identify chart warnings relevant to the next port approach.",
      "steps": [
        "Present the current passage plan, correction/MSI process and traceable records, including any open restrictions.",
        "Demonstrate the correct approved navigation equipment without simulating a successful alarm/test when it failed.",
        "Escalate genuine deficiencies through SMS corrective action and ensure records distinguish due from completed work."
      ],
      "result": "A credible inspection response is factual, traceable and based on the ship's actual configuration."
    },
    "references": [
      {
        "title": "IMO — COLREG",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      },
      {
        "title": "IMO — ECDIS guidance",
        "url": "https://www.imo.org/en/ourwork/safety/pages/electroniccharts.aspx"
      }
    ]
  },
  "meteorology-radar-ve-ses-isaretleri": {
    "id": "meteorology-radar-ve-ses-isaretleri-professional-application",
    "title": "Operational application and error analysis",
    "content": "In restricted visibility, COLREG Rule 19 requires safe speed and risk assessment using all available means; fog signals are separate from radar target detection and must follow the vessel's actual navigational condition.\n\nCommon error: Do not ignore a sound signal because ARPA has no matching tracked target.",
    "example": {
      "problem": "A cargo vessel hears a prolonged blast forward in dense fog but no confirmed corresponding radar echo is visible.",
      "steps": [
        "Evaluate the direction and likely range cautiously; notify the Master under standing orders and maintain attentive auditory/visual lookout.",
        "Apply Rule 19's precautions and, when required by its conditions, reduce speed to the minimum at which course can be kept and take all way off if necessary.",
        "Continue the correct statutory sound signal for the vessel's condition and avoid unsupported conclusions based on absent radar echo."
      ],
      "result": "An uncorrelated fog signal can still indicate nearby traffic requiring immediate caution."
    },
    "references": [
      {
        "title": "IMO — COLREG restricted visibility",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      }
    ]
  },
  "meteorology-sis-olusum-turleri": {
    "id": "meteorology-sis-olusum-turleri-professional-application",
    "title": "Operational application and error analysis",
    "content": "Advection fog forms when warm moist air moves over a colder surface, cooling below its dew point. Radiation fog typically arises through nocturnal cooling; sea visibility reductions need not coincide with precipitation.\n\nCommon error: Do not assume visibility remains safe simply because rainfall has stopped.",
    "example": {
      "problem": "The bridge records sea temperature 8°C, air temperature 12°C and humid winds moving across colder coastal water, followed by rapid reduction in visibility.",
      "steps": [
        "Compare air/sea temperatures, dew point, wind direction and recent marine forecast observations.",
        "Treat advection fog as a plausible mechanism, but confirm the actual visibility and traffic conditions rather than classifying fog solely by two temperatures.",
        "Implement COLREG restricted-visibility precautions and communicate changed operational limits."
      ],
      "result": "Warm moist air passing over colder water is consistent with advection fog; the exact onset depends on moisture and mixing."
    },
    "references": [
      {
        "title": "IMO — COLREG restricted visibility",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      }
    ]
  },
  "communication-gmdss-modernizasyonu-ve-e-navigasyon": {
    "id": "communication-gmdss-modernizasyonu-ve-e-navigasyon-professional-application",
    "title": "Operational application and error analysis",
    "content": "The modernized SOLAS IV GMDSS arrangements recognise applicable mobile satellite services beyond the older Inmarsat-only framing; the ship's certificate and approved equipment determine its actual A3 coverage. GMDSS and e-navigation have related but distinct purposes.\n\nCommon error: Do not copy obsolete fixed Inmarsat A3 latitude limits onto every modern GMDSS installation.",
    "example": {
      "problem": "A coastal voyage plan is extended to higher latitudes; the ship carries a recognised mobile satellite terminal and MF/HF arrangements.",
      "steps": [
        "Read the Safety Radio Certificate and Record of Equipment, verifying service type, capabilities and sea-area certification.",
        "Overlay planned route against the actual recognised mobile satellite service footprint and relevant terrestrial DSC coverage.",
        "Confirm distress-watch and backup requirements and document the bridge/radio readiness review before departure."
      ],
      "result": "Higher latitude alone does not define the vessel's A4 area; required capabilities depend on its installed, approved service."
    },
    "references": [
      {
        "title": "IMO — SOLAS IV radiocommunications",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "communication-tehlike-aciliyet-ve-emniyet-haberlesmesi": {
    "id": "communication-tehlike-aciliyet-ve-emniyet-haberlesmesi-professional-application",
    "title": "Operational application and error analysis",
    "content": "Distress (MAYDAY), urgency (PAN PAN) and safety (SECURITE) communications represent different priorities and procedures. DSC alerting and follow-up radiotelephony use the relevant equipment and working channels; actual distress calls must never be used for drills.\n\nCommon error: Do not trigger a live DSC distress alert merely to obtain attention for a routine medical consultation.",
    "example": {
      "problem": "A man overboard is recovered, but medical evacuation may become urgent while the ship remains operational and not in imminent danger.",
      "steps": [
        "Assess whether the facts meet distress or urgency criteria under the Master's command and onboard emergency plan.",
        "Prepare a concise position, patient-condition and requested-assistance message; use the applicable GMDSS urgency communication procedure.",
        "Log actual transmissions, contact medical/radio authorities as appropriate and reassess if the situation deteriorates to distress."
      ],
      "result": "Urgency may be appropriate for a serious medical situation not meeting the imminent-danger threshold; classification depends on actual circumstances."
    },
    "references": [
      {
        "title": "IMO — SOLAS IV radiocommunications",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "safety-is-sagligi-guvenligi-ve-kkd": {
    "id": "safety-is-sagligi-guvenligi-ve-kkd-professional-application",
    "title": "Operational application and error analysis",
    "content": "PPE is the last layer after elimination, isolation and engineered safeguards. A Job Safety Analysis must consider dynamic energy sources, work interfaces, simultaneous operations and a stop-work trigger.\n\nCommon error: Never cite a hard hat as sufficient control for a loaded line's snap-back zone.",
    "example": {
      "problem": "Deck crew are asked to work near a loaded mooring line while wearing hard hats and gloves.",
      "steps": [
        "Stop the exposure and review whether the task can be carried out with the line unloaded or the vessel repositioned.",
        "Reassess line-of-fire and recoil paths, communications and exclusion zones under the approved mooring arrangement.",
        "Only restart when responsible personnel agree that higher-order controls are in place; choose PPE for remaining hazards."
      ],
      "result": "Correct PPE cannot protect against all high-energy line failures."
    },
    "references": [
      {
        "title": "IMO — SOLAS Safety of Life at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      },
      {
        "title": "IMO — Revised recommendations on entering enclosed spaces, MSC.581(110)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.581%28110%29.pdf"
      }
    ]
  },
  "safety-catisma-sonrasi-acil-mudahale": {
    "id": "safety-catisma-sonrasi-acil-mudahale-professional-application",
    "title": "Operational application and error analysis",
    "content": "Post-collision response prioritises personnel safety, watertight integrity, pollution control and accurate contact with authorities and neighbouring vessels. Liability arguments should not displace emergency checks.\n\nCommon error: Do not resume full speed before evaluating hull integrity and required reporting actions.",
    "example": {
      "problem": "A ship experiences a low-speed contact with another vessel and reports no immediate flooding on its first soundings.",
      "steps": [
        "Account for personnel, establish communications and assess injuries, watertight compartments, trim/list and potential pollution.",
        "Monitor tank soundings and boundaries over time, review propulsion/steering condition and prepare response resources.",
        "Record times, positions, statements and damage evidence factually, and notify authorities and company under SMS."
      ],
      "result": "An initial negative sounding does not rule out progressive flooding or structural damage."
    },
    "references": [
      {
        "title": "IMO — SOLAS Safety of Life at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      },
      {
        "title": "IMO — Revised recommendations on entering enclosed spaces, MSC.581(110)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.581%28110%29.pdf"
      }
    ]
  },
  "safety-karaya-oturma-ve-yeniden-yuzdurme-emniyeti": {
    "id": "safety-karaya-oturma-ve-yeniden-yuzdurme-emniyeti-professional-application",
    "title": "Operational application and error analysis",
    "content": "Grounding creates local loads and potential hull damage; refloating plans depend on verified bathymetry, tidal state, hull condition, stability and environmental consequences. Immediate full-astern power can worsen damage.\n\nCommon error: Do not use high propulsion thrust before verifying contact and hull consequences.",
    "example": {
      "problem": "A vessel runs aground on a shoal at low tide, and the bridge proposes hard astern propulsion immediately.",
      "steps": [
        "Stop unsafe movement, sound tanks and bilges, assess people, machinery and possible release of pollutants.",
        "Determine ground contact, tide, draught/trim, stability and available supporting survey information.",
        "Develop a refloating decision with the Master, company, authorities and specialised assistance if required; do not apply uncontrolled propulsion."
      ],
      "result": "A safe refloat must account for structural loads and ongoing ingress, not simply the next high tide."
    },
    "references": [
      {
        "title": "IMO — SOLAS Safety of Life at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      },
      {
        "title": "IMO — Revised recommendations on entering enclosed spaces, MSC.581(110)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.581%28110%29.pdf"
      }
    ]
  },
  "safety-acil-durum-komuta-raporlama-ve-delil-yonetimi": {
    "id": "safety-acil-durum-komuta-raporlama-ve-delil-yonetimi-professional-application",
    "title": "Operational application and error analysis",
    "content": "Emergency logs should preserve observed facts, communications and ordered actions with timestamps. Estimates and assumptions must be identified; accurate records support coordination and later investigation without delaying life-saving work.\n\nCommon error: Never record a simulated CO2 release as an actual discharge.",
    "example": {
      "problem": "After a machinery-space fire drill, the bridge log lists a CO2 release even though only the release procedure was rehearsed.",
      "steps": [
        "Correct the draft entry through the approved log amendment process, maintaining the integrity of original records.",
        "State explicitly what was simulated and what equipment was actually operated, including alarms and muster times.",
        "Track the training deficiency and verify corrective actions without creating fictitious operational evidence."
      ],
      "result": "A drill can be evaluated without falsely recording the discharge of a fixed firefighting agent."
    },
    "references": [
      {
        "title": "IMO — SOLAS Safety of Life at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      },
      {
        "title": "IMO — Revised recommendations on entering enclosed spaces, MSC.581(110)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.581%28110%29.pdf"
      }
    ]
  },
  "seamanship-kopruustu-vardiyasi-ve-gozculuk": {
    "id": "seamanship-kopruustu-vardiyasi-ve-gozculuk-professional-application",
    "title": "Operational application and error analysis",
    "content": "A dedicated lookout supports detection by sight and hearing under Rule 5 and must report changes clearly; helm, chart and radar duties can impede an effective lookout when workload rises.\n\nCommon error: Do not rely on a single person simultaneously performing time-consuming administration and full collision lookout.",
    "example": {
      "problem": "A bridge watchkeeper is updating charts while a fishing fleet enters restricted visibility ahead.",
      "steps": [
        "Reassess safe manning and lookout allocation under STCW/standing orders, requesting additional assistance when needed.",
        "Establish shared observations and target reports with relative bearing, range trend and uncertainty.",
        "Review speed, radar plotting and COLREG Rule 19 precautions while maintaining dedicated situational awareness."
      ],
      "result": "A clear radar picture does not replace maintaining an appropriate lookout by sight and hearing."
    },
    "references": [
      {
        "title": "IMO — COLREG Rules 5, 7 and 8",
        "url": "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx"
      }
    ]
  },
  "cargo-yuk-ellecleme-ekipmani-ve-guvenli-calisma": {
    "id": "cargo-yuk-ellecleme-ekipmani-ve-guvenli-calisma-professional-application",
    "title": "Operational application and error analysis",
    "content": "Crane Safe Working Load and rigging capacities apply under stated configurations and load paths. Sling angles increase tension as the angle to horizontal decreases, while dynamic effects and actual equipment limits remain critical.\n\nCommon error: Do not assume each leg carries half the load independent of sling angle.",
    "example": {
      "problem": "A symmetric two-leg sling lifts a 12-tonne load with each leg at 30° above horizontal, ignoring acceleration for the teaching calculation.",
      "steps": [
        "Compute the vertical weight equivalent: 12 tonnes-force in this simplified static example.",
        "For symmetric legs, tension per leg = 12 / (2 × sin 30°) = 12 tonnes-force; clarify this is not a complete design verification.",
        "Verify sling WLL, angle limits, shackles, crane chart and dynamic loading before any real lift."
      ],
      "result": "At 30° to the horizontal, each sling bears approximately the entire static suspended load; a shallower angle is not benign."
    },
    "references": [
      {
        "title": "IMO — SOLAS overview",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "machine-automation-kontrol-teorisi-acik-ve-kapali-dongu-kontrol-1": {
    "id": "machine-automation-kontrol-teorisi-acik-ve-kapali-dongu-kontrol-1-professional-application",
    "title": "Operational application and error analysis",
    "content": "An open-loop control output does not automatically correct for deviation, while closed-loop feedback compares a measured variable with a setpoint and adjusts the actuator. Sensor fault can defeat feedback despite normal controller operation.\n\nCommon error: Do not increase controller gain to 'fix' a level sensor wiring or scaling failure.",
    "example": {
      "problem": "A ballast level controller commands a pump although the independent sight glass shows the tank already full.",
      "steps": [
        "Check whether the automatic controller is responding to a faulty level signal or an actuator/valve fault.",
        "Prevent overflow using the approved stop/isolation controls and notify responsible personnel.",
        "Test sensor calibration and control logic under authorised maintenance before returning to automatic mode."
      ],
      "result": "A running closed-loop controller cannot compensate for a sensor that reports the wrong process value."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-erm-kaza-analizi-ve-dersler-kapali-alan-kazalari-3": {
    "id": "machine-erm-kaza-analizi-ve-dersler-kapali-alan-kazalari-3-professional-application",
    "title": "Operational application and error analysis",
    "content": "Enclosed-space casualty response requires stopping a second uncontrolled entry, making a rescue plan and ensuring suitable atmosphere assessment and breathing protection. IMO revised enclosed-space recommendations stress additional permits for energy isolation and task-specific hazards.\n\nCommon error: A dust mask or ordinary cartridge respirator does not supply oxygen to an oxygen-deficient space.",
    "example": {
      "problem": "A maintenance worker becomes unresponsive inside a poorly ventilated ballast tank; a colleague starts climbing down without breathing apparatus.",
      "steps": [
        "Raise the alarm and prevent spontaneous entry, establish personnel accountability and notify the rescue team.",
        "Use the vessel's enclosed-space rescue plan, trained entrants, suitable BA, lifting/retrieval arrangements and continuous communications.",
        "Control ventilation, gas testing and hazards under the approved rescue operation, then arrange medical care."
      ],
      "result": "An improvised unprotected rescue can produce more victims than the initial event."
    },
    "references": [
      {
        "title": "IMO — Revised enclosed-space recommendations MSC.581(110)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.581%28110%29.pdf"
      }
    ]
  },
  "machine-fuel-alternative-fuel-safety": {
    "id": "machine-fuel-alternative-fuel-safety-professional-application",
    "title": "Operational application and error analysis",
    "content": "Marine LNG, methanol and other alternative fuels have different flammability, toxicity, cryogenic and atmosphere-management hazards. Equipment-specific procedures, IGF/IGC requirements where applicable and crew training govern transfers.\n\nCommon error: Do not assume LNG cryogenic gloves or a diesel-fuel spill kit alone are suitable for every alternative fuel.",
    "example": {
      "problem": "During preparation for methanol transfer, the deck reports a minor uncontained spill near an unverified ignition source.",
      "steps": [
        "Stop the operation and isolate ignition sources through approved emergency controls; keep crew outside the hazard area.",
        "Use the vessel's fuel-specific emergency plan and appropriate PPE, spill response and ventilation provisions.",
        "Notify responsible personnel and verify leak control and atmosphere safety before restoring transfer readiness."
      ],
      "result": "The response must reflect the fuel's actual toxic/flammable properties, not a generic petroleum-spill checklist."
    },
    "references": [
      {
        "title": "IMO — SOLAS safety requirements overview",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "stability-2-0-kaldirma-kuvveti-buoyancy-force-1": {
    "id": "stability-2-0-kaldirma-kuvveti-buoyancy-force-1-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Buoyancy equals the weight of displaced water in equilibrium; displacement volume must be multiplied by the actual water density. Different seawater and dockwater densities give different immersed volumes for the same floating mass.\n\nCommon error: Do not use 1.000 t/m³ as a universal seawater density.",
    "example": {
      "problem": "A hull displaces 10,000 m³ in water of density 1.025 t/m³.",
      "steps": [
        "Multiply 10,000 × 1.025 to obtain 10,250 tonnes displaced mass.",
        "Check that 10,000 m³ is the actual immersed hull volume, not gross vessel volume.",
        "Recalculate using measured water density if a draught survey is made in brackish water."
      ],
      "result": "The displacement is 10,250 t under the stated conditions."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-2-1-agirlik-merkezi-g-2": {
    "id": "stability-2-1-agirlik-merkezi-g-2-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "KG changes as a moment-weighted average when weights are added, shifted or removed. The final displacement changes with added mass, but not with movement of existing mass. Free-surface correction is considered separately.\n\nCommon error: Never divide final moments by the vessel's old displacement.",
    "example": {
      "problem": "Initial displacement is 8,000 t with KG 6.0 m; 200 t cargo with KG 15.0 m is loaded.",
      "steps": [
        "Original moment: 8,000 × 6 = 48,000 t·m.",
        "Add 200 × 15 = 3,000 t·m, and use new displacement 8,200 t.",
        "New KG = 51,000 / 8,200 ≈ 6.22 m; assess actual GM and GZ limits."
      ],
      "result": "The higher cargo raises KG by about 0.22 m in this example."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-2-5-metasentrik-nokta-ve-metasentrik-yukseklik-6": {
    "id": "stability-2-5-metasentrik-nokta-ve-metasentrik-yukseklik-6-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Initial metacentric height GM = KM minus KG at the loading draught. Free-surface correction lowers effective GM; small-angle positive GM alone cannot certify the entire righting-arm or damage-stability behaviour.\n\nCommon error: Never deduct free-surface correction again if the loader already applied it.",
    "example": {
      "problem": "A condition has KM 7.60 m, KG 6.80 m and free-surface correction 0.25 m.",
      "steps": [
        "Uncorrected GM = 7.60 − 6.80 = 0.80 m.",
        "Corrected GM = 0.80 − 0.25 = 0.55 m.",
        "Check the approved GZ curve, downflooding points and any special loading limits."
      ],
      "result": "Corrected initial GM is 0.55 m, not an all-criteria pass."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-5-4-parametrik-yalpa-parametric-rolling-4": {
    "id": "stability-5-4-parametrik-yalpa-parametric-rolling-4-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Parametric rolling arises from periodic stability variation as waves encounter the hull. It can grow in head or following seas, depending on ship geometry, wave encounter period, natural rolling and speed, and threatens deck cargo securing.\n\nCommon error: Do not prescribe one universal alteration that may increase another wave-motion hazard.",
    "example": {
      "problem": "A container vessel in nearly head seas develops rapidly increasing alternating roll amplitudes.",
      "steps": [
        "Evaluate actual roll trend, encounter period, sea direction and course/speed against ship-specific guidance.",
        "Notify the Master, secure exposed operations and assess lashings and crew safety.",
        "Apply the vessel-approved heavy weather speed/course mitigation and monitor effects continuously."
      ],
      "result": "Increasing roll in head seas can be a warning of parametric rolling rather than ordinary beam-sea response."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-6-1-gz-egrisi-nedir-1": {
    "id": "stability-6-1-gz-egrisi-nedir-1-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "The GZ curve describes righting lever versus heel for a specific loading condition. Its peak, positive range, integral and downflooding limits each convey different stability information; identical GM does not imply identical reserve stability.\n\nCommon error: Do not extrapolate GZ = GM × sin(heel) across all heel angles.",
    "example": {
      "problem": "Two cargo conditions have equal initial GM but different downflooding angles and curve maxima.",
      "steps": [
        "Compare complete righting-arm curves over the relevant heel interval.",
        "Read peak GZ, location of peak, range of positive stability and first downflooding angle.",
        "Evaluate required GZ areas and angle criteria for the actual ship and stability booklet."
      ],
      "result": "Equal initial GM cannot establish equivalent large-angle or reserve stability."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-6-3-dinamik-stabilite-ve-enerji-yaklasimi-3": {
    "id": "stability-6-3-dinamik-stabilite-ve-enerji-yaklasimi-3-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "The integral of GZ over heel angle represents the quasi-static dynamic-stability area, expressed in m·rad. Displacement weight times this integral approximates work against heel; it is not a prediction of ship motions in random seas.\n\nCommon error: Never label an integral over degrees as m·rad.",
    "example": {
      "problem": "An approved GZ curve has area 0.080 m·rad between zero and 30° heel; displacement is 10,000 t.",
      "steps": [
        "Confirm the angle integration uses radians, not degrees.",
        "Calculate 10,000,000 kg × 9.81 m/s² × 0.080 m ≈ 7.85 MJ.",
        "Evaluate the applicable area criteria and downflooding restrictions in the approved stability record."
      ],
      "result": "The 7.85 MJ result is a quasi-static illustration, not a universal capsize energy threshold."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-7-4-tank-geometrisinin-etkisi-4": {
    "id": "stability-7-4-tank-geometrisinin-etkisi-4-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "In an ideal rectangular slack tank, transverse free-surface moment scales with length times breadth cubed; actual tank shape, fill, baffles and liquid density modify the approved tabulated moment. Volume alone is insufficient.\n\nCommon error: Do not assign identical FSM to equal-volume tanks with different breadth.",
    "example": {
      "problem": "Two equal-length rectangular tanks of width 4 m and 8 m contain slack liquid of the same density.",
      "steps": [
        "Hold density and tank length constant in the simplified comparison.",
        "Free-surface scaling ratio = (8 / 4)³ = 8.",
        "Replace this estimate with approved tank-specific FSM tables for operational stability."
      ],
      "result": "Doubling tank breadth raises idealised free-surface moment eightfold."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-8-5-yukleme-planlamasi-ve-trim-optimizasyonu-5": {
    "id": "stability-8-5-yukleme-planlamasi-ve-trim-optimizasyonu-5-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Longitudinal weight movement creates a trimming moment and changes trim, with the response governed by hydrostatic MCT 1 cm and LCF. A simple estimate does not provide the individual forward and aft draught changes.\n\nCommon error: Never ignore LCF position, free surface or strength criteria.",
    "example": {
      "problem": "MCT 1 cm is 180 t·m/cm at the current draught; 90 t is moved 20 m forward.",
      "steps": [
        "Compute trimming moment 90 × 20 = 1,800 t·m forward.",
        "Estimate trim change magnitude 1,800 / 180 = 10 cm toward the added forward moment.",
        "Use LCF and approved loader hydrostatics to assess both end draughts and longitudinal strength."
      ],
      "result": "Approximately 10 cm overall trim change, not 10 cm at the bow alone."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-9-5-progressive-flooding-ardisik-su-basmasi-5": {
    "id": "stability-9-5-progressive-flooding-ardisik-su-basmasi-5-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Progressive flooding develops when initial water ingress spreads through additional boundaries such as ducts, penetrations, doors and vents. Initial dry soundings do not rule out later loss of residual stability.\n\nCommon error: Do not assume subdivision integrity from one early sounding.",
    "example": {
      "problem": "A collision floods a void space, while a neighbouring space is dry but has a compromised access-door seal.",
      "steps": [
        "Account for people and preserve watertight boundaries without opening a pressurised door.",
        "Trace all connected spaces, vents and penetrations using the damage control plan.",
        "Monitor sequential soundings, heel and trim and run the approved damage-stability assessment."
      ],
      "result": "A neighbouring space may flood later even if initially dry."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-10-1-imo-intact-stability-code-2008-is-code-1": {
    "id": "stability-10-1-imo-intact-stability-code-2008-is-code-1-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "The 2008 IS Code combines mandatory and recommended criteria, with ship-specific limitations and approved information. Positive initial GM is only one component of the intact stability assessment; the complete righting-arm curve matters.\n\nCommon error: Do not mistake a generic training calculator for a certified shipboard loading system.",
    "example": {
      "problem": "A training spreadsheet reports 'pass' because GM exceeds a single chosen threshold.",
      "steps": [
        "Confirm the ship's actual approved booklet and governing criteria.",
        "Review GZ areas, peak and angle, downflooding points, operational and weather limits as appropriate.",
        "Recalculate the final load case using the ship-approved stability instrument before authorising departure."
      ],
      "result": "One green GM cell cannot demonstrate all IMO intact-stability criteria."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "stability-9-4-hasar-kontrol-ve-mudahale-4": {
    "id": "stability-9-4-hasar-kontrol-ve-mudahale-4-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "Damage control requires monitored ingress rates, boundary integrity and stability throughout the response. Pump operation, intentional transfers and counterflooding can affect free-surface and longitudinal stability in unexpected ways.\n\nCommon error: Never open cross-connections or counterflood without assessing the ship's residual stability.",
    "example": {
      "problem": "A damaged compartment continues flooding and list increases despite a bilge pump running.",
      "steps": [
        "Account for personnel, identify damaged boundaries and avoid unassessed access.",
        "Take repeated soundings; compare ingress and pump performance, heel and trim trends.",
        "Escalate to the Master and damage-control team for approved modelling and pumping decisions."
      ],
      "result": "A pump running is not evidence that flooding has been controlled."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "pre-departure-checklist": {
    "id": "pre-departure-checklist-professional-application",
    "title": "Technical calculation and shipboard interpretation",
    "content": "A final departure stability check must use actual cargo, fuel, water, ballast, free-surface states and shipboard draughts. A previously approved loadcase can become invalid after any substantial late shift of a high or longitudinally displaced weight.\n\nCommon error: Never take a stale loading-condition report as the departure calculation.",
    "example": {
      "problem": "The loading instrument shows approved but a 150 t deck load was moved after the condition was saved.",
      "steps": [
        "Correct the cargo centre of gravity and longitudinal position, ballast and tank states in the loading instrument.",
        "Verify final GM/GZ compliance, trim/draught, shear and bending limits using the approved book and instrument.",
        "Record the validated final condition and inform the Master before unmooring."
      ],
      "result": "A saved green status is not proof that the actual final condition remains approved."
    },
    "references": [
      {
        "title": "IMO 2008 IS Code — MSC.267(85)",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.267%2885%29.pdf"
      },
      {
        "title": "IMO ship design and stability",
        "url": "https://www.imo.org/en/ourwork/safety/pages/shipdesignandstability-default.aspx"
      }
    ]
  },
  "navigation-rota-planlama": {
    "id": "navigation-rota-planlama-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Passage planning is a berth-to-berth process of appraisal, planning, execution and monitoring. A route drawn through an ENC is only one part: safety depth/contour, squat, tidal margins, prohibited areas, MSI and contingency actions need evaluation.\n\nCommon error: Do not treat ECDIS route validation as proof of charted depth, squat and local tide adequacy.",
    "example": {
      "problem": "The preliminary ECDIS route passes a shallow approach with a sounding close to the vessel's anticipated draught.",
      "steps": [
        "Gather current charts, notices/MSI, ship draught/trim and tidal data for the appraisal.",
        "Calculate a ship-specific UKC envelope with squat and uncertainties; set relevant ECDIS safety parameters, inspect the entire route.",
        "Conduct an independent route check and Master's approval, documenting abort points and monitoring method."
      ],
      "result": "The route is not ready merely because ECDIS displays no route-check alarms."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-appraisal": {
    "id": "navigation-appraisal-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Appraisal precedes detailed route design: chart coverage and quality, weather, tidal stream, services, machinery constraints and reporting requirements determine whether a proposed passage is feasible.\n\nCommon error: Do not treat an arrival time as feasible without assessing its tidal and weather context.",
    "example": {
      "problem": "A pilot-book estimate suggests a destination is reachable, but the required high-water window overlaps forecast gale-force conditions.",
      "steps": [
        "Compile primary charts, tide predictions, weather advisories, notices and port entry requirements.",
        "Identify the conflict between arrival and metocean window, plus any refuge or delay options.",
        "Present safe alternative arrival plans to the Master before committing to detailed waypoints."
      ],
      "result": "Feasibility may require delaying the passage rather than drawing a nominally shorter route."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-xte": {
    "id": "navigation-xte-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Cross-track error (XTE) is the lateral displacement from the active intended route leg, not a replacement for position uncertainty or danger-clearance limits. Turns, antenna offsets and chart accuracy also affect the interpretation.\n\nCommon error: Never correct XTE automatically by making a large unassessed heading change near shoals.",
    "example": {
      "problem": "XTE shows 0.18 NM to starboard on a narrow-waterway route where the planned maximum corridor is 0.10 NM.",
      "steps": [
        "Verify own-ship position and whether the active leg/waypoint sequence is correct.",
        "Evaluate the actual obstacle clearance, tidal/current effects and route corridor rather than blindly steering to eliminate the number.",
        "Notify the Master under standing orders and navigate by approved safe manoeuvre and independent fixes."
      ],
      "result": "The 0.18 NM XTE exceeds the hypothetical 0.10 NM corridor but does not give the remaining water depth."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-planning": {
    "id": "navigation-planning-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "The planning phase converts appraisal evidence into waypoints and cross-track limits. The plan must account for manoeuvring radius, wheel-over positions, depth constraints, VTS reporting and contingency manoeuvres.\n\nCommon error: Do not use charted waypoint positions alone to judge whether the turn is safe.",
    "example": {
      "problem": "A planned course change at a pilot station has an abrupt 70° turn next to restricted waters.",
      "steps": [
        "Read ship manoeuvring data, under-keel envelope, traffic scheme and pilotage rules.",
        "Insert feasible turn geometry and check all intermediate swept paths and course alterations, not merely waypoint locations.",
        "Record alternates and no-go boundaries, then obtain the required independent review and approval."
      ],
      "result": "A geometric line joining valid waypoints can still demand an impossible ship manoeuvre."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-monitoring": {
    "id": "navigation-monitoring-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Passage monitoring continuously verifies progress against the approved plan through independent fixes, guard zones, wheel-over confirmation and updates for actual traffic and environment.\n\nCommon error: Do not rely on repeated screenshots of the same GNSS source as an independent position check.",
    "example": {
      "problem": "A coastal leg remains within XTE tolerance, but repeated radar ranges are progressively inconsistent with the GNSS track.",
      "steps": [
        "Correlate radar targets and check whether sensor errors, wrong chart datum or gyro offsets explain the trend.",
        "Increase independent fix frequency and monitor clearance to hazards, not only XTE.",
        "Notify the Master, review safe speed and adjust/abort passage as approved if the discrepancy persists."
      ],
      "result": "A small displayed XTE does not demonstrate a safe absolute position when the position input is suspect."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-emniyetli-hiz-kural-6": {
    "id": "navigation-emniyetli-hiz-kural-6-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "COLREG Rule 6 requires safe speed appropriate to conditions, including visibility, density of traffic, manoeuvrability, background light, weather and proximity of navigational hazards. There is no universally lawful fixed speed for restricted visibility.\n\nCommon error: Never treat the port's maximum speed as a minimum safe-speed target.",
    "example": {
      "problem": "Visibility falls to 0.25 NM in a trafficked coastal approach while the ship still makes 13 kn.",
      "steps": [
        "Evaluate stopping distance and manoeuvrability against current visibility and traffic density.",
        "Check radar detection limitations and additional Rule 6 factors; brief the Master and post appropriate lookout.",
        "Set a safe speed under standing orders and keep reassessing as conditions change."
      ],
      "result": "The required speed is a risk-based operational decision, not automatically a prescribed 6 knots or similar constant."
    },
    "references": [
      {
        "title": "IMO — Convention on the International Regulations for Preventing Collisions at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      }
    ]
  },
  "navigation-catismadan-kacinma-manevrasi-kural-8": {
    "id": "navigation-catismadan-kacinma-manevrasi-kural-8-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Rule 8 avoidance action should be positive, made in ample time and with due regard to good seamanship. A succession of small adjustments may obscure intent and fail to achieve adequate separation.\n\nCommon error: Do not assume a large alteration is automatically safe when shoals and multiple targets are present.",
    "example": {
      "problem": "Radar plots a closing target while the OOW makes successive 2° course changes rather than a clear early manoeuvre.",
      "steps": [
        "Assess encounter classification, all available CPA/trend evidence, sea room and nearby traffic.",
        "Agree an early, readily apparent and substantial action appropriate to the applicable Rules.",
        "Check its effectiveness until the other vessel is finally past and clear, adjusting safely if necessary."
      ],
      "result": "Effective action is judged by separation and clarity, not just that some helm order was given."
    },
    "references": [
      {
        "title": "IMO — Convention on the International Regulations for Preventing Collisions at Sea",
        "url": "https://www.imo.org/en/about/conventions/pages/colreg.aspx"
      }
    ]
  },
  "navigation-echo-sounder-iskandil": {
    "id": "navigation-echo-sounder-iskandil-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "An echo sounder measures acoustic travel time to a reflecting surface; depth readout may be below the transducer or adjusted to a different reference. Draft, squat, offset, sound speed and seabed shape affect clearance.\n\nCommon error: Never add draught to a depth-below-transducer reading without verifying what is being measured.",
    "example": {
      "problem": "The echo sounder shows 5.0 m below transducer, whose face is 1.5 m above the keel, while charted depth is 7.0 m.",
      "steps": [
        "Read the actual sounder reference setting and transducer offset from equipment configuration.",
        "If reading is 5.0 m below a transducer 1.5 m above the keel, geometric clearance below keel is approximately 3.5 m, before motion/accuracy allowances.",
        "Cross-check with approved UKC assessment, tide and independent sounding/position information."
      ],
      "result": "A 5.0 m sounder reading cannot be labelled UKC without the instrument's datum and sensor location."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-kopruustu-vardiyasi-standing-orders-ve-kaptani-cagirma": {
    "id": "navigation-kopruustu-vardiyasi-standing-orders-ve-kaptani-cagirma-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Standing orders and Master's night orders define bridge watch escalation triggers. Calling the Master is an additional safety measure and never transfers the watch officer's immediate duty to avoid danger.\n\nCommon error: Do not delay collision-avoidance action until the Master reaches the bridge.",
    "example": {
      "problem": "An OOW encounters unforecast squalls and deteriorating visibility close to a pilotage sector; written orders require calling the Master when visibility worsens.",
      "steps": [
        "Call the Master promptly with position, visibility, traffic, speed and immediate risks.",
        "Maintain continuous lookout, assess COLREG and navigational needs, and take timely action rather than awaiting a reply.",
        "Log key events and confirm the bridge-team allocation when additional officers arrive."
      ],
      "result": "The Master call and the OOW's independent safety response proceed in parallel."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-master-pilot-exchange-ve-pilotaj-vardiyasi": {
    "id": "navigation-master-pilot-exchange-ve-pilotaj-vardiyasi-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Pilotage does not relieve the Master or officer in charge of the navigational watch of their safety duties. The master–pilot exchange must cover vessel handling limits, communication, route, tugs and any agreed abort decisions.\n\nCommon error: Never interpret pilot boarding as transfer of all navigational accountability.",
    "example": {
      "problem": "The pilot proposes a turn at a speed outside the vessel's manoeuvring booklet for that waterway.",
      "steps": [
        "State the ship's turning/stopping limitations and seek a clear explanation of the pilot's plan.",
        "Compare actual speed, depth, traffic and available tug assistance with approved manoeuvring limits.",
        "Escalate clearly to the Master, challenge unsafe orders and maintain independent bridge navigation monitoring."
      ],
      "result": "A pilot's local knowledge complements, but does not replace, ship-specific manoeuvring limitations."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-tidal-window-liman-giris-zamani": {
    "id": "navigation-tidal-window-liman-giris-zamani-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "A tidal window is the period when actual depth and operational restrictions permit passage. It depends on chart datum, forecast tide, squat, uncertainty and required UKC, which may change with speed and sea state.\n\nCommon error: Do not consider a charted depth safe simply because it is greater than ship's draught.",
    "example": {
      "problem": "Charted channel depth is 8.2 m, draught is 8.0 m and a simplified required clearance allowance is 1.0 m; the predicted tide height is 0.6 m.",
      "steps": [
        "Calculate static predicted depth: 8.2 + 0.6 = 8.8 m above the assumed chart datum.",
        "Compare with required draught-plus-allowance 8.0 + 1.0 = 9.0 m; shortfall is 0.2 m before further corrections.",
        "Delay entry or revise the authorised plan using validated local tide, speed/squat and port rules."
      ],
      "result": "This simplified condition is unsuitable at that predicted tide under the stated 1.0 m clearance requirement."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "navigation-demirleme-ve-demir-tarama-hesaplari": {
    "id": "navigation-demirleme-ve-demir-tarama-hesaplari-professional-application",
    "title": "Bridge-watch calculation and decision",
    "content": "Anchor watch uses planned swinging circle, actual chain length, fixing uncertainty and observed trends. Radius is not simply the number of shackles paid out: chain catenary, depth, hull length and weather affect the envelope.\n\nCommon error: Do not mistake normal swinging due to wind shift for dragging without checking changing fixed references.",
    "example": {
      "problem": "A vessel anchors in 25 m water, pays out 6 shackles of 27.5 m (165 m), and has a nearby shoal.",
      "steps": [
        "Check holding ground, wind/current, safe depth and planned cable length against the anchoring plan.",
        "Estimate conservative swinging envelope using ship length, possible horizontal chain reach and position fixing errors.",
        "Plot anchor position and monitor reliable fixed bearings, radar ranges and GNSS alarm as a supplementary trend."
      ],
      "result": "An initial anchor drop coordinate and a single GNSS circle are insufficient for a reliable dragging assessment."
    },
    "references": [
      {
        "title": "IMO A.893(21) Guidelines for voyage planning",
        "url": "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.893%2821%29.pdf"
      }
    ]
  },
  "communication-arama-kurtarma-haberlesmesi-ve-olay-yeri-koordinasyonu": {
    "id": "communication-arama-kurtarma-haberlesmesi-ve-olay-yeri-koordinasyonu-professional-application",
    "title": "GMDSS communications and coordination case",
    "content": "Search and rescue communication distinguishes the MRCC, an appointed On-Scene Coordinator and individual assisting units. A first-arriving merchant ship must not assume unrestricted command authority.\n\nCommon error: Do not independently order other SAR units to change search patterns without agreed coordination.",
    "example": {
      "problem": "A merchant vessel joins two ships and a helicopter searching near the last reported EPIRB position.",
      "steps": [
        "Transmit own position, limitations, recovery capability and observations to the designated coordination authority.",
        "Confirm assigned search sector, the responsible OSC, frequency and relevant position datum before manoeuvring.",
        "Log and communicate new sightings, drift estimates and rescue actions while maintaining safe bridge watch."
      ],
      "result": "Coordinated sector assignments improve the search while respecting uncertainty in the original EPIRB datum."
    },
    "references": [
      {
        "title": "IMO — GMDSS and radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMO — GMDSS circulars",
        "url": "https://www.imo.org/en/ourwork/safety/pages/imo-circulars-related-to-the-gmdss.aspx"
      }
    ]
  },
  "communication-inmarsat-ve-uydu-haberlesme-sistemleri": {
    "id": "communication-inmarsat-ve-uydu-haberlesme-sistemleri-professional-application",
    "title": "GMDSS communications and coordination case",
    "content": "GMDSS-approved mobile satellite terminals carry defined distress and safety functions within their recognised coverage. A vessel's commercial satellite internet access is not automatically a certified GMDSS alerting route.\n\nCommon error: Do not assume every commercial Inmarsat or Iridium device is approved for the same GMDSS functions.",
    "example": {
      "problem": "A ship sailing toward high latitudes has broadband satellite internet and a separate older GMDSS terminal.",
      "steps": [
        "Check the Safety Radio Certificate and Record of Equipment to identify the recognised service and terminal model.",
        "Compare its actual approved coverage and distress/MSI capabilities with the entire passage route.",
        "Verify reserve supply, registration and backup radio arrangements; escalate any coverage or equipment gaps."
      ],
      "result": "The vessel's certified satellite-service coverage, not generic broadband availability, governs the relevant GMDSS assessment."
    },
    "references": [
      {
        "title": "IMO — GMDSS and radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMO — GMDSS circulars",
        "url": "https://www.imo.org/en/ourwork/safety/pages/imo-circulars-related-to-the-gmdss.aspx"
      }
    ]
  },
  "communication-telsiz-anten-sistemleri-ve-acil-guc-kaynaklari": {
    "id": "communication-telsiz-anten-sistemleri-ve-acil-guc-kaynaklari-professional-application",
    "title": "GMDSS communications and coordination case",
    "content": "Reserve GMDSS power must sustain required radio functions through approved supply arrangements and maintained batteries. Battery open-circuit voltage does not establish usable capacity under load.\n\nCommon error: Do not disconnect a live reserve battery or interrupt required DSC watches for an ad hoc test.",
    "example": {
      "problem": "At a survey the radio backup battery shows nominal voltage but collapses quickly under its approved load test.",
      "steps": [
        "Identify the reserve supply architecture and all connected required radio consumers in ship drawings.",
        "Conduct authorised battery testing while protecting continuous distress-watch capability.",
        "Record battery condition and restore compliant reserve capacity with approved replacement and documentation."
      ],
      "result": "A normal resting voltage cannot compensate for inadequate capacity during emergency radiocommunications."
    },
    "references": [
      {
        "title": "IMO — GMDSS and radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMO — GMDSS circulars",
        "url": "https://www.imo.org/en/ourwork/safety/pages/imo-circulars-related-to-the-gmdss.aspx"
      }
    ]
  },
  "communication-smcp-standart-deniz-haberlesme-ifadeleri": {
    "id": "communication-smcp-standart-deniz-haberlesme-ifadeleri-professional-application",
    "title": "GMDSS communications and coordination case",
    "content": "Standard Marine Communication Phrases minimise misunderstandings between VTS, pilots, bridge teams and ships. Course, speed, distance and urgency must be spoken and read back without ambiguity.\n\nCommon error: Never treat uncertain radio instructions as permission to disregard collision regulations or ship handling limits.",
    "example": {
      "problem": "In poor radio reception the bridge hears a VTS transmission referring to heading 270 but not whether it is advice or an instruction.",
      "steps": [
        "Read back the intended heading using clear numbers and ask the station to clarify the nature of the message.",
        "Cross-check target traffic, charted hazards and COLREG responsibilities before any non-emergency alteration.",
        "Record the agreed understanding and brief the Master or pilot when the change affects passage safety."
      ],
      "result": "Read-back and clarification detect a potentially dangerous ambiguity before the helm is altered."
    },
    "references": [
      {
        "title": "IMO — GMDSS and radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMO — GMDSS circulars",
        "url": "https://www.imo.org/en/ourwork/safety/pages/imo-circulars-related-to-the-gmdss.aspx"
      }
    ]
  },
  "communication-vts-ve-gemi-raporlama-sistemleri": {
    "id": "communication-vts-ve-gemi-raporlama-sistemleri-professional-application",
    "title": "GMDSS communications and coordination case",
    "content": "VTS provides local traffic information and may issue instructions under local rules, but participation does not remove the Master's safe-navigation responsibilities or COLREG duties.\n\nCommon error: Do not follow an ambiguous reporting instruction into an immediate navigational hazard.",
    "example": {
      "problem": "A vessel reaches a mandatory reporting point at the same time as close-quarters fishing traffic develops.",
      "steps": [
        "Prioritise lookout, safe speed and collision avoidance, requesting the Master's support if needed.",
        "Report the verified ship position, speed, traffic concern and manoeuvring intentions on the published channel.",
        "Clarify any conflicting VTS instruction and document the exchange while maintaining safe navigation."
      ],
      "result": "Traffic reporting and collision avoidance must be coordinated, not treated as competing substitutes."
    },
    "references": [
      {
        "title": "IMO — GMDSS and radiocommunications",
        "url": "https://www.imo.org/en/ourwork/safety/pages/radiocommunications-default.aspx"
      },
      {
        "title": "IMO — GMDSS circulars",
        "url": "https://www.imo.org/en/ourwork/safety/pages/imo-circulars-related-to-the-gmdss.aspx"
      }
    ]
  },
  "safety-isps-gemi-guvenligi-ve-korsanlik": {
    "id": "safety-isps-gemi-guvenligi-ve-korsanlik-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Ship Security Assessment, approved Ship Security Plan and security levels determine authorised access and incident response. SSAS security alerts must not be confused with DSC or EPIRB distress broadcasts.\n\nCommon error: Do not publish SSAS locations, protected access credentials or ship-specific security weaknesses.",
    "example": {
      "problem": "A visitor tries to board outside the controlled gangway while the vessel is operating under enhanced security measures.",
      "steps": [
        "Prevent unsafe access without physical confrontation; alert the watch and preserve crew safety.",
        "Escalate to the Ship Security Officer and port security contacts using restricted plan procedures.",
        "Document the attempt factually and verify approved visitor-control measures without exposing protected information."
      ],
      "result": "A controlled security response protects personnel and preserves incident evidence without releasing sensitive plan details."
    },
    "references": [
      {
        "title": "IMO — SOLAS safety management and ISPS Code",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "safety-violence-harassment-prevention": {
    "id": "safety-violence-harassment-prevention-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Prevention of harassment and violence requires safe reporting, protection from retaliation and a fair, authorised investigation. Immediate safeguarding is distinct from the later determination of facts.\n\nCommon error: Never promise absolute confidentiality when necessary restricted reporting or safeguarding obligations apply.",
    "example": {
      "problem": "An engine-room trainee reports repeated threats by someone senior in their direct watchkeeping chain.",
      "steps": [
        "Assess immediate safety and ensure a safe place and appropriate watch arrangements away from immediate risk.",
        "Provide a confidential company or designated reporting route that does not require approaching the alleged offender.",
        "Preserve timestamps, factual messages and witnesses; escalate to the authorised investigator and monitor retaliation risks."
      ],
      "result": "A victim-sensitive yet procedurally fair response enables protection and evidence-based investigation."
    },
    "references": [
      {
        "title": "IMO — SOLAS safety management and ISPS Code",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "machine-electrical-elektrik-uretim-sistemi-paralel-jenerator-baglama-4": {
    "id": "machine-electrical-elektrik-uretim-sistemi-paralel-jenerator-baglama-4-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "AC synchronising requires compatible voltage, frequency, phase sequence and phase angle before a generator breaker closes on a live bus. Out-of-phase closing may cause damaging torque and currents.\n\nCommon error: Never force-close the breaker to compensate for a synchronisation fault.",
    "example": {
      "problem": "A standby generator has near-matching bus voltage but its frequency differs by 1.5 Hz from the running bus.",
      "steps": [
        "Keep the generator breaker open; check synchronising permissives and appropriate generator frequency control.",
        "Verify voltage, phase sequence and changing phase angle using the fitted synchronising equipment and maker's limits.",
        "Only an authorised engineer closes under approved procedure, then checks active/reactive power sharing and protection status."
      ],
      "result": "Matched voltage alone does not justify connecting a machine to an energised busbar."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-electrical-elektrik-dagitim-sistemi-insulasyon-direnci-olcumu-ve-izleme-5": {
    "id": "machine-electrical-elektrik-dagitim-sistemi-insulasyon-direnci-olcumu-ve-izleme-5-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Insulation monitoring detects deterioration on certain marine insulated distribution systems. An alarm may occur without immediate breaker operation, so controlled investigation and electronic equipment protection are essential.\n\nCommon error: Do not apply a megohmmeter to live electronic circuits without approved isolation.",
    "example": {
      "problem": "Insulation resistance trends downward on a machinery distribution panel, but all essential consumers still appear to function.",
      "steps": [
        "Identify the affected system, alarms and actual earthing scheme from the ship's electrical drawings.",
        "Plan authorised sectional isolation or testing while maintaining required essential services and protecting electronics.",
        "Repair the fault and document insulation testing performed with suitable equipment only after appropriate de-energisation."
      ],
      "result": "A low insulation trend demands diagnosis even when the circuit remains energised and functional."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-electrical-battery-thermal-runaway": {
    "id": "machine-electrical-battery-thermal-runaway-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Battery thermal runaway can spread between cells while producing heat, flammable gases and toxic decomposition products. Chemistry-specific maker instructions and installed detection/suppression systems govern response.\n\nCommon error: Do not treat a battery pack as an ordinary electrical cabinet fire or assume that extinguishing flame ends the event.",
    "example": {
      "problem": "The ship's battery energy storage enclosure reports rapidly rising temperature and abnormal off-gas alarms.",
      "steps": [
        "Activate the installation-approved isolation and emergency response without entering or opening the enclosure casually.",
        "Notify fire and engineering command and assess gas accumulation, propagation and re-ignition risk from safe positions.",
        "Maintain exclusion, atmosphere monitoring and maker-approved post-event controls until specialists establish safe recovery."
      ],
      "result": "The event may remain hazardous after visible flame or alarm indications reduce."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-automation-plc-ve-otomasyon-sistemleri-alarm-ve-izleme-sistemi-ams-3": {
    "id": "machine-automation-plc-ve-otomasyon-sistemleri-alarm-ve-izleme-sistemi-ams-3-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Alarm Monitoring Systems observe sensor and control signals, but alarm acknowledgement is not fault rectification. A single high-level alarm may arise from real flooding, bad sensors, wiring or data transport.\n\nCommon error: Never bypass or inhibit a protective alarm solely to remove nuisance indications.",
    "example": {
      "problem": "A machinery bilge high-high alarm is acknowledged and clears intermittently, yet local sighting still shows rising level.",
      "steps": [
        "Confirm the physical level and inspect process flow from a safe location, without assuming the panel is correct.",
        "Check pump, valves, leakage and independent alarms against the approved bilge and flooding response procedures.",
        "Record the recurrence, investigate the measurement path and restore tested alarm protection after authorised maintenance."
      ],
      "result": "The abnormal water level remains a safety issue regardless of whether the screen is showing an acknowledged alarm."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "machine-automation-ot-cybersecurity": {
    "id": "machine-automation-ot-cybersecurity-professional-application",
    "title": "Practical machinery and shipboard risk analysis",
    "content": "Operational technology runs critical propulsion, power and cargo systems and requires controlled changes, validated firmware and secure vendor access. A legitimate-looking USB drive may introduce unsafe software.\n\nCommon error: Do not equate a vendor logo or urgent maintenance request with software trustworthiness.",
    "example": {
      "problem": "A technician offers an unverified USB drive to update a propulsion PLC while the plant is operating.",
      "steps": [
        "Do not connect the media; confirm vendor identity, update provenance and company cyber-change approval.",
        "Review backups, maintenance windows, recovery plan and potential operational impact with authorised engineers.",
        "Perform only a verified, approved update under controlled conditions and report suspicious access attempts."
      ],
      "result": "A traceable maintenance change protects critical plant continuity better than an unscheduled update."
    },
    "references": [
      {
        "title": "MCA — Code of Safe Working Practices for Merchant Seafarers",
        "url": "https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition"
      }
    ]
  },
  "seamanship-halatlar-knot-ve-baglama-teknikleri": {
    "id": "seamanship-halatlar-knot-ve-baglama-teknikleri-professional-application",
    "title": "Deck operation worked case",
    "content": "Knot suitability depends on intended load, rope construction, bend radius, slip resistance and approved use. A correctly tied demonstration knot is not necessarily a certified cargo-lifting termination.\n\nCommon error: Do not infer SWL from the appearance of a correctly tied knot.",
    "example": {
      "problem": "A deck crew member proposes a bowline as a lifting sling termination for an unmarked synthetic rope.",
      "steps": [
        "Check the rope's identification, manufacturer's limits and approved lifting/rigging plan.",
        "Distinguish seamanship knots for securing from certified lifting attachments and select approved rigging.",
        "Inspect rope condition and protect against abrasion and shock loading before authorised use."
      ],
      "result": "Ordinary seamanship knots must not replace certified lifting terminations without approved evidence."
    },
    "references": [
      {
        "title": "IMO — safe mooring",
        "url": "https://www.imo.org/en/ourwork/safety/pages/safemooring.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "seamanship-demir-ve-demirleme": {
    "id": "seamanship-demir-ve-demirleme-professional-application",
    "title": "Deck operation worked case",
    "content": "Anchoring must consider holding ground, water depth, current, weather, planned swinging room and actual cable condition. The planned paid-out chain length is not the same as the vessel's distance from the anchor.\n\nCommon error: Never treat the number of shackles paid out as the horizontal swinging radius.",
    "example": {
      "problem": "A vessel intends to anchor in 30 m of water close to another ship's anticipated swing circle.",
      "steps": [
        "Review permitted anchorage, seabed conditions, forecast and vessel-specific minimum holding provisions.",
        "Plan anchor drop and cable scope while checking conservative swing envelopes and possible vessel interactions.",
        "Monitor fixed references and alarm boundaries while keeping machinery and anchor watch ready for dragging."
      ],
      "result": "Safe anchoring is a spatial and weather decision, not a universal shackles-per-depth formula."
    },
    "references": [
      {
        "title": "IMO — safe mooring",
        "url": "https://www.imo.org/en/ourwork/safety/pages/safemooring.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "seamanship-ileri-mooring-ve-halat-yonetimi": {
    "id": "seamanship-ileri-mooring-ve-halat-yonetimi-professional-application",
    "title": "Deck operation worked case",
    "content": "Mooring hazards include stored elastic energy, poor lead angles, mixed-line elasticity and damaged fittings. Snap-back paths vary with the actual line and hardware arrangement, not solely marked deck zones.\n\nCommon error: Do not assume every snap-back trajectory can be captured by a permanent painted polygon.",
    "example": {
      "problem": "A spring line develops a large lead angle across a fairlead while personnel stand near its presumed safe marked zone.",
      "steps": [
        "Identify rope MBL, condition, fitting SWL and the approved mooring plan rather than relying on painted floor markings.",
        "Reassess potential recoil paths, high-energy bights, equipment interference and crew positions.",
        "Stop the operation until a safe lead, communications and exclusion arrangement is established."
      ],
      "result": "An apparently marked safe spot may still be in the line of fire for a particular lead."
    },
    "references": [
      {
        "title": "IMO — safe mooring",
        "url": "https://www.imo.org/en/ourwork/safety/pages/safemooring.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "seamanship-romorkor-kullanimi-ve-yanasma-plani": {
    "id": "seamanship-romorkor-kullanimi-ve-yanasma-plani-professional-application",
    "title": "Deck operation worked case",
    "content": "A tug's useful force depends on thrust direction, towline geometry and safe connection arrangements; rated bollard pull is not automatically available as lateral force at the ship's hull.\n\nCommon error: Never use a tug's published pull rating as proof a shipboard fairlead can sustain that tow.",
    "example": {
      "problem": "A 60 t bollard-pull tug is proposed for a stern-quarter line that cannot act perpendicular to the ship.",
      "steps": [
        "Review the tug arrangement, towline lead, available thrusters, weather and interaction with the vessel's propeller/rudder.",
        "Evaluate likely resultant force direction and connection/fitting ratings rather than multiplying the nominal bollard pull by one assumed lever.",
        "Discuss the manoeuvre, communications, abort points and emergency release with Master, pilot and tug before approach."
      ],
      "result": "Nominal bollard pull does not equal the effective controlled sideways thrust in every arrangement."
    },
    "references": [
      {
        "title": "IMO — safe mooring",
        "url": "https://www.imo.org/en/ourwork/safety/pages/safemooring.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "cargo-yuk-plani-ve-agirlik-dagilimi": {
    "id": "cargo-yuk-plani-ve-agirlik-dagilimi-professional-application",
    "title": "Deck operation worked case",
    "content": "Cargo plans must satisfy local structural loading, longitudinal strength, trim and intact stability as well as deck-space geometry. Two cargo plans with the same total mass can impose very different bending and shear forces.\n\nCommon error: Do not approve a revised stowage arrangement based on total tonnes alone.",
    "example": {
      "problem": "A 500 t load is shifted from a central hold to a far-forward position while overall cargo weight is unchanged.",
      "steps": [
        "Update longitudinal and vertical centres for the revised location and check deck/hold permissible loading.",
        "Re-run shear force, bending moment, draught and stability calculations on the approved instrument.",
        "Review lashing strength, access and any deck machinery restrictions before endorsing the final plan."
      ],
      "result": "Unchanged total cargo mass does not imply unchanged hull loads or trim."
    },
    "references": [
      {
        "title": "IMO — cargoes and cargo securing",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "cargo-konteyner-yukleme-ve-bay-plani": {
    "id": "cargo-konteyner-yukleme-ve-bay-plani-professional-application",
    "title": "Deck operation worked case",
    "content": "Bay-row-tier slot codes locate containers in the stowage plan; load distribution, GM, stack-weight limits, lashing loads and verified gross mass are separate checks.\n\nCommon error: Do not treat a correct slot address as approval of weight and lashing limits.",
    "example": {
      "problem": "A heavy 40-foot container with a valid VGM is planned on a high outboard tier to save turnaround time.",
      "steps": [
        "Check the true bay/row/tier allocation, gross weight and container type against the verified bay plan.",
        "Review allowable stack loads, lashing forces, local structure and stability under approved stowage calculations.",
        "Confirm dangerous goods segregation and access requirements before the load is accepted."
      ],
      "result": "Valid VGM establishes declared weight but cannot prove the selected position is structurally and dynamically safe."
    },
    "references": [
      {
        "title": "IMO — cargoes and cargo securing",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "cargo-cargo-care-terleme-ve-ambar-havalandirmasi": {
    "id": "cargo-cargo-care-terleme-ve-ambar-havalandirmasi-professional-application",
    "title": "Deck operation worked case",
    "content": "Cargo sweat and ship sweat arise from differing temperature and moisture conditions. The decision to ventilate depends on cargo properties, external air dew point and measured hold conditions, not simply on outside relative humidity.\n\nCommon error: Never use a blanket rule to ventilate all cargoes whenever outdoor humidity is lower.",
    "example": {
      "problem": "A warm loaded hold is entering cold weather; the watch proposes opening all vents because the outside humidity reads 60%.",
      "steps": [
        "Identify cargo susceptibility, current cargo/hold temperatures and dew points of inside and outside air.",
        "Evaluate whether ventilation would remove moisture or promote condensation on cargo or steel surfaces.",
        "Follow the cargo-specific ventilation plan, monitor condensation and record actual measurements."
      ],
      "result": "Relative humidity alone, without temperature, is insufficient to establish the condensation risk."
    },
    "references": [
      {
        "title": "IMO — cargoes and cargo securing",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  },
  "cargo-lost-containers-danger-message": {
    "id": "cargo-lost-containers-danger-message-professional-application",
    "title": "Deck operation worked case",
    "content": "Lost containers can create a navigation hazard and may also pose pollution or dangerous-goods risks. Immediate response must follow the ship's emergency and reporting procedures while preserving safe navigation and evidence.\n\nCommon error: Do not delay navigational danger reporting while waiting for a complete commercial claim file.",
    "example": {
      "problem": "After heavy weather a ship finds two overboard containers missing from an outboard bay, one marked with dangerous goods labels.",
      "steps": [
        "Account for personnel, assess structural/lashing damage and stabilise the ship's motion before further deck exposure.",
        "Record last known position, time, number, cargo details and likely drift, and notify relevant coastal/traffic authorities using prescribed danger-report procedures.",
        "Preserve stowage, VGM, dangerous-goods and event records for the investigation while monitoring additional stack risks."
      ],
      "result": "A missing container remains a hazard even if no vessel is visually nearby."
    },
    "references": [
      {
        "title": "IMO — cargoes and cargo securing",
        "url": "https://www.imo.org/en/ourwork/safety/pages/cargoes.aspx"
      },
      {
        "title": "IMO — SOLAS safety framework",
        "url": "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-%28solas%29%2C-1974.aspx"
      }
    ]
  }
};
