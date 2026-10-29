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
  }
};
