import type { LessonFlow } from "./types";

/** Authored checks for the operational and supplementary lessons. */
export const operationalLessonFlows: LessonFlow[] = [
  {
    "topicKey": "navigation",
    "topicTitle": "DR, EP ve Set-Drift ile Mevki İlerletme",
    "blocks": [
      {
        "sectionTitles": [
          "DR ve EP Arasındaki Operasyonel Ayrım"
        ]
      },
      {
        "sectionTitles": [
          "Set ve Driftin Bulunması"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "DR ve EP Arasındaki Operasyonel Ayrım",
        "category": "DR, EP ve Set-Drift ile Mevki İlerletme",
        "question": "What distinguishes an estimated position (EP) from a dead-reckoning position (DR)?",
        "options": [
          "EP includes estimated external effects such as current and leeway.",
          "DR already includes every external effect.",
          "EP is always a satellite fix.",
          "DR and EP are identical."
        ],
        "correctAnswer": 0,
        "explanation": "DR advances the last position using course, speed through the water and time. EP adds estimated external effects; neither is a substitute for an independently verified fix."
      },
      {
        "id": 2,
        "sectionRef": "Set ve Driftin Bulunması",
        "category": "DR, EP ve Set-Drift ile Mevki İlerletme",
        "question": "After one hour, a reliable fix is 2 nautical miles east of the DR position. What current estimate follows if other errors are negligible?",
        "options": [
          "Set 270°, drift 2 knots.",
          "Set 090°, drift 2 knots.",
          "Set 090°, drift 0.5 knots.",
          "The difference proves a compass error."
        ],
        "correctAnswer": 1,
        "explanation": "The displacement runs from DR to the fix: 2 nautical miles east in one hour gives an easterly set of 090° and drift of 2 knots. Check steering, speed, time and fix uncertainty before attributing the whole difference to current."
      }
    ]
  },
  {
    "topicKey": "navigation",
    "topicTitle": "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma",
    "blocks": [
      {
        "sectionTitles": [
          "Vardiyayı Devralmadan Önce"
        ]
      },
      {
        "sectionTitles": [
          "Kaptanı Derhâl Çağırma Kriterleri"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Vardiyayı Devralmadan Önce",
        "category": "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma",
        "question": "What should the relieving watch officer do before accepting the watch?",
        "options": [
          "Accept the watch solely from a verbal statement.",
          "Personally verify the position, traffic, equipment state, passage plan and standing orders.",
          "Reset all alarms to their default settings.",
          "Wait until after a critical manoeuvre to ask about the plan."
        ],
        "correctAnswer": 1,
        "explanation": "The opening section treats handover as a verified assessment of the ship and situation, not just a transfer of responsibility by the clock."
      },
      {
        "id": 2,
        "sectionRef": "Kaptanı Derhâl Çağırma Kriterleri",
        "category": "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma",
        "question": "Visibility falls below the limit in the master's standing orders. What should the OOW do?",
        "options": [
          "Wait for the master before taking any safety action.",
          "Call the master promptly and take the immediate safe actions required by the situation.",
          "Continue unchanged until another vessel appears.",
          "Call only at the next scheduled position fix."
        ],
        "correctAnswer": 1,
        "explanation": "Calling the master does not suspend the OOW's responsibility. Apply appropriate lookout, safe speed, navigation and collision-avoidance measures while giving a concise report and maintaining the watch until properly relieved."
      }
    ]
  },
  {
    "topicKey": "navigation",
    "topicTitle": "Master-Pilot Exchange ve Pilotaj Vardiyası",
    "blocks": [
      {
        "sectionTitles": [
          "Pilot Gelmeden Önce Hazırlık"
        ]
      },
      {
        "sectionTitles": [
          "Pilotla Anlaşmazlık ve Müdahale"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Pilot Gelmeden Önce Hazırlık",
        "category": "Master-Pilot Exchange ve Pilotaj Vardiyası",
        "question": "Which information should be ready before the pilot boards?",
        "options": [
          "Only the destination berth name.",
          "Only the latest position from AIS.",
          "Pilot card, manoeuvring information, drafts, UKC assessment and equipment limitations.",
          "Only the cargo manifest."
        ],
        "correctAnswer": 2,
        "explanation": "The bridge team prepares the ship information and divides monitoring, communications and recording duties before the pilot arrives."
      },
      {
        "id": 2,
        "sectionRef": "Pilotla Anlaşmazlık ve Müdahale",
        "category": "Master-Pilot Exchange ve Pilotaj Vardiyası",
        "question": "A pilot's proposed alteration appears to conflict with the agreed passage plan. What is the bridge team's best response?",
        "options": [
          "Challenge and clarify the instruction, involve the master and monitor the resulting manoeuvre.",
          "Execute it without question because the pilot has local knowledge.",
          "Silently substitute a different order.",
          "Stop monitoring because the pilot has the con."
        ],
        "correctAnswer": 0,
        "explanation": "Pilotage relies on a shared plan and active monitoring. A doubtful instruction should be clarified promptly through the command structure; the pilot's presence does not remove the bridge team's responsibility to identify and manage developing danger."
      }
    ]
  },
  {
    "topicKey": "navigation",
    "topicTitle": "Seyir Cihazı Arızaları ve Yedek Seyir",
    "blocks": [
      {
        "sectionTitles": [
          "GNSS Kaybı, Jamming ve Spoofing"
        ]
      },
      {
        "sectionTitles": [
          "GNSS Kaybı, Jamming ve Spoofing"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "GNSS Kaybı, Jamming ve Spoofing",
        "category": "Seyir Cihazı Arızaları ve Yedek Seyir",
        "question": "An electronic position suddenly jumps and disagrees with radar observations. What is the appropriate interpretation?",
        "options": [
          "Assume the electronic position must be correct.",
          "Hide the discrepancy by changing the chart datum.",
          "Follow the new position without checking the source.",
          "Treat the position as suspect, cross-check independently and inform the Master."
        ],
        "correctAnswer": 3,
        "explanation": "The lesson identifies position jumps and disagreement between independent sources as signs requiring verification and a safe backup arrangement."
      },
      {
        "id": 2,
        "sectionRef": "GNSS Kaybı, Jamming ve Spoofing",
        "category": "Seyir Cihazı Arızaları ve Yedek Seyir",
        "question": "Two navigation displays show the same position after a GNSS warning. Does their agreement independently confirm the fix?",
        "options": [
          "No; check their sensor sources and obtain a genuinely independent position check.",
          "Yes; two screens always mean two independent fixes.",
          "Yes, if both show many decimal places.",
          "Only the larger display can be trusted."
        ],
        "correctAnswer": 0,
        "explanation": "Displays may repeat data from one receiver or share the same failure. Check sensor integrity and use appropriate independent observations, such as radar or visual fixes, while assessing position uncertainty and the safety of the passage."
      }
    ]
  },
  {
    "topicKey": "navigation",
    "topicTitle": "Ağır Havada Seyir ve Gemi Kullanma",
    "blocks": [
      {
        "sectionTitles": [
          "Ağır Hava Öncesi Hazırlık"
        ]
      },
      {
        "sectionTitles": [
          "Parametric ve Synchronous Rolling"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Ağır Hava Öncesi Hazırlık",
        "category": "Ağır Havada Seyir ve Gemi Kullanma",
        "question": "Which preparation is relevant before heavy weather?",
        "options": [
          "Secure openings and loose equipment, assess tank conditions and coordinate with the Master and engine room.",
          "Open all weather doors for ventilation.",
          "Increase speed without reviewing wave conditions.",
          "Suspend all bridge observations."
        ],
        "correctAnswer": 0,
        "explanation": "Heavy-weather preparation combines weather assessment, securing the ship, tank and stability checks, machinery readiness and control of exposure on deck."
      },
      {
        "id": 2,
        "sectionRef": "Parametric ve Synchronous Rolling",
        "category": "Ağır Havada Seyir ve Gemi Kullanma",
        "question": "Rolling increases rapidly in heavy weather. Which response best follows sound operational assessment?",
        "options": [
          "Always alter exactly 40° to starboard.",
          "Assess the encounter conditions and use ship-specific guidance to select a safe course or speed change.",
          "Immediately fill every ballast tank.",
          "Maintain speed because faster ships cannot roll dangerously."
        ],
        "correctAnswer": 1,
        "explanation": "Dangerous rolling depends on wave encounter, stability, loading and ship characteristics. Course and speed changes require an assessment of surrounding hazards; ballast changes require approved stability and strength checks, including intermediate states and free-surface effects."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Petrol Tankeri Yük Operasyonları",
    "blocks": [
      {
        "sectionTitles": [
          "Yükleme Öncesi Plan ve Ship/Shore Toplantısı"
        ]
      },
      {
        "sectionTitles": [
          "Line-up, Manifold ve Basınç Kontrolü"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Yükleme Öncesi Plan ve Ship/Shore Toplantısı",
        "category": "Petrol Tankeri Yük Operasyonları",
        "question": "What should be agreed before an oil tanker cargo transfer starts?",
        "options": [
          "Only the final cargo quantity.",
          "The cargo plan, communication method, transfer limits and emergency-stop arrangements.",
          "An unrestricted loading rate for the whole operation.",
          "That remote valve indications never need checking."
        ],
        "correctAnswer": 1,
        "explanation": "The ship/shore meeting and checklist establish an agreed plan and critical limits before valves are lined up and transfer begins."
      },
      {
        "id": 2,
        "sectionRef": "Line-up, Manifold ve Basınç Kontrolü",
        "category": "Petrol Tankeri Yük Operasyonları",
        "question": "Transfer pressure rises unexpectedly during a tanker cargo operation. What is the sound response?",
        "options": [
          "Open an unverified spare valve immediately.",
          "Communicate with the terminal, take the agreed safe stopping action and verify the line-up and cause.",
          "Increase the pump speed to overcome the pressure.",
          "Ignore the rise if the average rate remains normal."
        ],
        "correctAnswer": 1,
        "explanation": "Unexpected pressure may indicate a restriction, a valve error or another unsafe condition. Use the agreed ship-shore communication and stopping arrangements, avoiding uncoordinated actions that may worsen a pressure surge, and establish the cause before restarting."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Kimyasal Tanker Yük Operasyonları",
    "blocks": [
      {
        "sectionTitles": [
          "Ürün Bilgisi ve Uyumluluk"
        ]
      },
      {
        "sectionTitles": [
          "Ürün Bilgisi ve Uyumluluk"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Ürün Bilgisi ve Uyumluluk",
        "category": "Kimyasal Tanker Yük Operasyonları",
        "question": "Where can chemical incompatibility create a risk?",
        "options": [
          "Only in the cargo tank itself.",
          "Only after discharge is complete.",
          "In tanks, shared cargo lines, vents, slop arrangements and cleaning systems.",
          "Only in the cargo documents."
        ],
        "correctAnswer": 2,
        "explanation": "Chemical segregation considers all possible contact paths, alongside product information, the tank coating and the ship-specific approved arrangements."
      },
      {
        "id": 2,
        "sectionRef": "Ürün Bilgisi ve Uyumluluk",
        "category": "Kimyasal Tanker Yük Operasyonları",
        "question": "A chemical product name is similar to a cargo carried previously. What must be established before accepting it?",
        "options": [
          "That similar spelling means identical hazards.",
          "That any stainless-steel tank is suitable.",
          "That the previous cargo certificate covers every chemical.",
          "The exact product identity, compatibility and applicable carriage requirements."
        ],
        "correctAnswer": 3,
        "explanation": "Small differences in product identity can change toxicity, reactivity and carriage conditions. Confirm the declared product and documentation against the ship's approved capability and the applicable cargo instructions before deciding on tanks, segregation or handling arrangements."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "LPG ve LNG Yük Operasyonları",
    "blocks": [
      {
        "sectionTitles": [
          "Containment ve Yük Özellikleri"
        ]
      },
      {
        "sectionTitles": [
          "ESD ve Ship-Shore Link"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Containment ve Yük Özellikleri",
        "category": "LPG ve LNG Yük Operasyonları",
        "question": "Why must the cargo containment system be identified before a gas-carrier operation?",
        "options": [
          "All gas cargo tanks have identical limits.",
          "Containment affects only the paint colour.",
          "The cargo name alone determines every limit.",
          "Its design pressure, temperature and material limits determine the operating envelope."
        ],
        "correctAnswer": 3,
        "explanation": "The opening section connects cargo properties, containment design, pressure and temperature limits, thermal effects and boil-off behaviour."
      },
      {
        "id": 2,
        "sectionRef": "ESD ve Ship-Shore Link",
        "category": "LPG ve LNG Yük Operasyonları",
        "question": "The ship-shore ESD link fails its agreed pre-transfer test. What should happen next?",
        "options": [
          "Resolve the failure and demonstrate the required protective arrangements before transfer.",
          "Start at full rate because the test itself is optional.",
          "Bypass the link without an agreed assessment.",
          "Use a radio check as automatic proof that the ESD system works."
        ],
        "correctAnswer": 0,
        "explanation": "A successful communication check does not prove emergency shutdown performance. Treat the failed protective function as a readiness defect, coordinate with the terminal and verify the required arrangements under the approved procedure before starting transfer."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Cargo Care, Terleme ve Ambar Havalandırması",
    "blocks": [
      {
        "sectionTitles": [
          "Cargo Sweat ve Ship Sweat"
        ]
      },
      {
        "sectionTitles": [
          "Dew Point ve 3-Degree Rule"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Cargo Sweat ve Ship Sweat",
        "category": "Cargo Care, Terleme ve Ambar Havalandırması",
        "question": "What is the difference between cargo sweat and ship sweat?",
        "options": [
          "Cargo sweat forms on the cargo; ship sweat forms on the ship structure and may drip onto cargo.",
          "Both names mean rain entering an open hatch.",
          "Cargo sweat forms only on the hull exterior.",
          "Ship sweat occurs only inside ballast tanks."
        ],
        "correctAnswer": 0,
        "explanation": "Condensation depends on surface temperature and the dew point of the contacting air. Ventilation must be assessed for the cargo and conditions."
      },
      {
        "id": 2,
        "sectionRef": "Dew Point ve 3-Degree Rule",
        "category": "Cargo Care, Terleme ve Ambar Havalandırması",
        "question": "Outside air has a higher dew point than the air in a loaded hold. Is ventilation automatically beneficial because outside air is cooler?",
        "options": [
          "No; assess condensation risk and the cargo-specific ventilation criteria.",
          "Yes; cooler outside air always dries cargo.",
          "Yes; dew point has no relevance to cargo sweat.",
          "No cargo should ever be ventilated at sea."
        ],
        "correctAnswer": 0,
        "explanation": "Air temperature alone does not show how much moisture air may deposit on a cold surface. Compare the relevant dew points and surface conditions and apply the cargo's instructions; indiscriminate ventilation can introduce moisture and worsen condensation."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları",
    "blocks": [
      {
        "sectionTitles": [
          "Steel Coil ve Çelik Yükler"
        ]
      },
      {
        "sectionTitles": [
          "Heavy Lift ve Project Cargo"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Steel Coil ve Çelik Yükler",
        "category": "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları",
        "question": "Why must steel-coil stowage be checked against tank-top loading?",
        "options": [
          "The total cargo weight alone describes every local load.",
          "The concentrated contact loads can exceed local structural capacity.",
          "Dunnage removes all structural limits.",
          "Coil orientation has no effect on securing."
        ],
        "correctAnswer": 1,
        "explanation": "Coils require a suitable supporting and securing arrangement, with attention to point loads, geometry, movement and cargo condition records."
      },
      {
        "id": 2,
        "sectionRef": "Heavy Lift ve Project Cargo",
        "category": "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları",
        "question": "A heavy item is suspended from the ship's crane. Where is its weight treated as acting for the stability assessment?",
        "options": [
          "At the point of suspension, with the lifting stages and approved limits assessed.",
          "Always at its original position on the quay.",
          "At the ship's keel throughout the lift.",
          "At its eventual stowage position before landing."
        ],
        "correctAnswer": 0,
        "explanation": "A suspended weight acts at its suspension point for stability purposes and may raise the effective centre of gravity. Assess the most demanding intermediate condition, heel, outreach, crane capacity and local loading before relying on the final stowed condition."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi",
    "blocks": [
      {
        "sectionTitles": [
          "Mate's Receipt ve Bill of Lading Remarks"
        ]
      },
      {
        "sectionTitles": [
          "Mate's Receipt ve Bill of Lading Remarks"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Mate's Receipt ve Bill of Lading Remarks",
        "category": "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi",
        "question": "What is the purpose of accurate remarks on a Mate’s Receipt?",
        "options": [
          "To guarantee the hidden condition of every package.",
          "To erase visible defects before a clean bill is issued.",
          "To record the cargo’s apparent condition and relevant quantity qualifications when received.",
          "To replace all photographic evidence."
        ],
        "correctAnswer": 2,
        "explanation": "Remarks should be specific, factual and supported by observations. Pressure to remove justified remarks is escalated through the Master and company."
      },
      {
        "id": 2,
        "sectionRef": "Mate's Receipt ve Bill of Lading Remarks",
        "category": "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi",
        "question": "Cargo is visibly damaged but a clean receipt is requested. What should the officer do?",
        "options": [
          "Sign cleanly because a protest can always erase the receipt later.",
          "Conceal the damage until sailing.",
          "Record accurate observations and preserve evidence through the approved documentation process.",
          "Invent a quantity of damage to ensure a claim succeeds."
        ],
        "correctAnswer": 2,
        "explanation": "Cargo documents must reflect the observed condition within the signer's responsibility. Record appropriate remarks, notify the responsible parties and preserve evidence; neither commercial pressure nor uncertainty justifies knowingly making a false statement."
      }
    ]
  },
  {
    "topicKey": "cargo",
    "topicTitle": "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
    "blocks": [
      {
        "sectionTitles": [
          "İlk Operasyonel Tedbirler"
        ]
      },
      {
        "sectionTitles": [
          "Tehlike Mesajı ve Resmî Bildirim"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "İlk Operasyonel Tedbirler",
        "category": "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
        "question": "What is an immediate priority after containers are lost overboard?",
        "options": [
          "Send personnel onto a damaged stack without a risk assessment.",
          "Assume the remaining lashings are intact.",
          "Continue unchanged until the next port.",
          "Inform the Master and assess further loss, ship damage, personnel exposure and dangerous-cargo risks."
        ],
        "correctAnswer": 3,
        "explanation": "The lesson starts with command notification, verification of the ship’s situation and control of further hazards before reporting and evidence collection."
      },
      {
        "id": 2,
        "sectionRef": "Tehlike Mesajı ve Resmî Bildirim",
        "category": "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
        "question": "Containers are lost overboard but their exact number is still being checked. What is the best reporting approach?",
        "options": [
          "Wait for a complete commercial claim file.",
          "Send the essential verified danger information promptly and follow with corrections or updates.",
          "Report an invented exact count.",
          "Notify only the ship's insurer."
        ],
        "correctAnswer": 1,
        "explanation": "A navigational danger report loses value if delayed for nonessential detail. Provide the known position, time and nature of the hazard, clearly mark estimates and unknowns, and update the relevant authorities through the required reporting channels."
      }
    ]
  },
  {
    "topicKey": "seamanship",
    "topicTitle": "İleri Demirleme ve Anchor Watch",
    "blocks": [
      {
        "sectionTitles": [
          "Let Go ve Walk Back Yöntemleri"
        ]
      },
      {
        "sectionTitles": [
          "Anchor Watch ve Dragging Tespiti"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Let Go ve Walk Back Yöntemleri",
        "category": "İleri Demirleme ve Anchor Watch",
        "question": "How do letting go and walking back an anchor differ?",
        "options": [
          "Walking back controls the anchor’s descent with the windlass; letting go involves controlled release using the brake.",
          "Both methods require uncontrolled free fall.",
          "Walking back means moving the ship astern without using the anchor.",
          "The methods are interchangeable without considering depth or equipment."
        ],
        "correctAnswer": 0,
        "explanation": "The method is selected with the depth, ground, ship motion and windlass or brake limitations in mind."
      },
      {
        "id": 2,
        "sectionRef": "Anchor Watch ve Dragging Tespiti",
        "category": "İleri Demirleme ve Anchor Watch",
        "question": "The ship's position appears outside the expected anchor swinging area. What should the watch do?",
        "options": [
          "Verify the position with independent information, assess dragging and alert the master as required.",
          "Assume any movement is normal swinging.",
          "Reset the alarm to include the new position.",
          "Wait until the cable is visibly vertical."
        ],
        "correctAnswer": 0,
        "explanation": "An alarm is a prompt to investigate, not a diagnosis to dismiss or accept blindly. Compare position, bearings, environmental conditions and anchor behaviour; report promptly and prepare the actions required by the ship's anchor-watch plan."
      }
    ]
  },
  {
    "topicKey": "seamanship",
    "topicTitle": "İleri Mooring ve Halat Yönetimi",
    "blocks": [
      {
        "sectionTitles": [
          "Ship Design MBL ve Line Selection"
        ]
      },
      {
        "sectionTitles": [
          "Mixed Mooring ve Yük Paylaşımı"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Ship Design MBL ve Line Selection",
        "category": "İleri Mooring ve Halat Yönetimi",
        "question": "Why is Ship Design MBL relevant when selecting mooring lines?",
        "options": [
          "The strongest available line is always the correct choice.",
          "The line system must remain compatible with the ship’s designed mooring arrangement and equipment limits.",
          "Line properties do not affect winch or fitting loads.",
          "Only the colour of the rope needs to match."
        ],
        "correctAnswer": 1,
        "explanation": "Mooring safety depends on the interaction of line properties, fittings, winch settings and the ship’s line-management arrangements."
      },
      {
        "id": 2,
        "sectionRef": "Mixed Mooring ve Yük Paylaşımı",
        "category": "İleri Mooring ve Halat Yönetimi",
        "question": "Two mooring lines have different stiffness. Can their loads be assumed equal because their lengths look similar?",
        "options": [
          "No; load sharing depends on stiffness, geometry and the complete mooring arrangement.",
          "Yes; every line at a berth carries identical tension.",
          "Yes, if their colours match.",
          "Only their purchase dates affect load sharing."
        ],
        "correctAnswer": 0,
        "explanation": "Unequal stiffness and geometry can concentrate loads in particular lines. Use the approved mooring arrangement, compatible equipment and controlled tending; visual similarity is not a basis for assuming equal tension or safe reserve capacity."
      }
    ]
  },
  {
    "topicKey": "seamanship",
    "topicTitle": "Römorkör Kullanımı ve Yanaşma Planı",
    "blocks": [
      {
        "sectionTitles": [
          "Tug Type ve Bollard Pull"
        ]
      },
      {
        "sectionTitles": [
          "Tug Failure ve Abort Planı"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Tug Type ve Bollard Pull",
        "category": "Römorkör Kullanımı ve Yanaşma Planı",
        "question": "Why should tug type and bollard pull both be considered in a berthing plan?",
        "options": [
          "Bollard pull alone guarantees the same force at every speed and angle.",
          "Every tug has identical handling characteristics.",
          "Available force and how it can be applied depend on the tug’s design, position and operating conditions.",
          "Tug position is irrelevant once a line is connected."
        ],
        "correctAnswer": 2,
        "explanation": "The plan must consider tug capability, connection, force direction, ship movement and an agreed communication and release arrangement."
      },
      {
        "id": 2,
        "sectionRef": "Tug Failure ve Abort Planı",
        "category": "Römorkör Kullanımı ve Yanaşma Planı",
        "question": "A planned tug becomes unavailable immediately before berthing. What should the bridge team do?",
        "options": [
          "Proceed unchanged because the berth is already booked.",
          "Compensate with an arbitrary increase in approach speed.",
          "Reassess the manoeuvre, remaining assistance and abort criteria before proceeding.",
          "Remove the abort point from the plan."
        ],
        "correctAnswer": 2,
        "explanation": "The plan depended on a stated level of assistance. A change requires a new assessment of environmental forces, ship capability, communication and escape options with the relevant parties; schedule pressure does not restore the missing capability."
      }
    ]
  },
  {
    "topicKey": "seamanship",
    "topicTitle": "İleri Gemi Manevrası ve Pervane Etkileri",
    "blocks": [
      {
        "sectionTitles": [
          "Tek Pervaneli Gemide Transverse Thrust"
        ]
      },
      {
        "sectionTitles": [
          "Pivot Point ve Kuvvet Kolu"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Tek Pervaneli Gemide Transverse Thrust",
        "category": "İleri Gemi Manevrası ve Pervane Etkileri",
        "question": "Why should transverse thrust be considered during a single-screw ship manoeuvre?",
        "options": [
          "It guarantees identical motion on every ship.",
          "It eliminates the need for rudder or tug assessment.",
          "It is the same as current drift.",
          "Propeller action can produce a sideways tendency that changes with the propulsion arrangement and operating condition."
        ],
        "correctAnswer": 3,
        "explanation": "The lesson relates propeller effects to the ship’s own behaviour, pivot point and manoeuvring conditions rather than a universal direction rule."
      },
      {
        "id": 2,
        "sectionRef": "Pivot Point ve Kuvvet Kolu",
        "category": "İleri Gemi Manevrası ve Pervane Etkileri",
        "question": "The same transverse force acts farther from the ship's effective pivot point. What happens to its turning moment in this simplified comparison?",
        "options": [
          "The moment decreases solely because distance increases.",
          "The moment remains unchanged for every force location.",
          "The ship's pivot point is permanently fixed at midships.",
          "The moment increases with the perpendicular lever arm."
        ],
        "correctAnswer": 3,
        "explanation": "Moment equals force multiplied by the perpendicular lever arm. In actual manoeuvring the effective pivot point and hydrodynamic forces change with motion and conditions, so the simplified comparison supports reasoning rather than a universal berthing rule."
      }
    ]
  },
  {
    "topicKey": "seamanship",
    "topicTitle": "Gemi Yapısı ve Tekne Mukavemeti",
    "blocks": [
      {
        "sectionTitles": [
          "Ana Yapısal Elemanlar"
        ]
      },
      {
        "sectionTitles": [
          "Yerel Yükler ve Point Load"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Ana Yapısal Elemanlar",
        "category": "Gemi Yapısı ve Tekne Mukavemeti",
        "question": "Why distinguish longitudinal and transverse structural members?",
        "options": [
          "They carry different load paths and together maintain hull strength and shape.",
          "Only the outer shell carries any load.",
          "Structural members exist only to support paint.",
          "Their arrangement has no effect on local or global strength."
        ],
        "correctAnswer": 0,
        "explanation": "Understanding the load path helps relate floors, frames, longitudinals, decks and bulkheads to stress, damage and inspection."
      },
      {
        "id": 2,
        "sectionRef": "Yerel Yükler ve Point Load",
        "category": "Gemi Yapısı ve Tekne Mukavemeti",
        "question": "The ship is within total deadweight limits but a heavy item is concentrated on a small deck area. What additional check is essential?",
        "options": [
          "Only the total cargo mass.",
          "Local deck loading and the approved load distribution and securing arrangements.",
          "Only the colour of the deck coating.",
          "No check is needed below maximum deadweight."
        ],
        "correctAnswer": 1,
        "explanation": "Overall displacement compliance does not demonstrate local structural adequacy. Check allowable deck or tank-top loads, bearing area, supporting structure and the approved distribution and securing plan, including the relevant loading and transport stages."
      }
    ]
  },
  {
    "topicKey": "communication",
    "topicTitle": "IAMSAR ve Arama Kurtarma Koordinasyonu",
    "blocks": [
      {
        "sectionTitles": [
          "İlk İhbar ve İlk Değerlendirme"
        ]
      },
      {
        "sectionTitles": [
          "Arama Alanı ve Arama Düzenleri"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "İlk İhbar ve İlk Değerlendirme",
        "category": "IAMSAR ve Arama Kurtarma Koordinasyonu",
        "question": "What should an initial search-and-rescue report establish?",
        "options": [
          "Only the reporting ship’s destination.",
          "Who is in distress, where and when, the nature of the emergency and the assistance needed.",
          "A precise casualty count even when it is unknown.",
          "Only the name of the nearest harbour."
        ],
        "correctAnswer": 1,
        "explanation": "An initial report gives the coordination authority the best available facts, identifies uncertainty and is updated when new information is confirmed."
      },
      {
        "id": 2,
        "sectionRef": "Arama Alanı ve Arama Düzenleri",
        "category": "IAMSAR ve Arama Kurtarma Koordinasyonu",
        "question": "A search starts from a position reported several hours earlier. What must be considered when establishing the search datum?",
        "options": [
          "Only the original reported coordinates.",
          "The nearest port's position.",
          "A fixed search circle that never changes.",
          "Elapsed time, estimated drift and uncertainty in the reported position and motion."
        ],
        "correctAnswer": 3,
        "explanation": "A last known position is an observation at a stated time, not necessarily the present search location. Drift and uncertainty grow with time; pass updates to the coordinating authority and revise the search plan as reliable information arrives."
      }
    ]
  },
  {
    "topicKey": "communication",
    "topicTitle": "Operasyonel Maritime English ve Köprüüstü İletişimi",
    "blocks": [
      {
        "sectionTitles": [
          "Kapalı Döngü Haberleşme"
        ]
      },
      {
        "sectionTitles": [
          "Kapalı Döngü Haberleşme"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Kapalı Döngü Haberleşme",
        "category": "Operasyonel Maritime English ve Köprüüstü İletişimi",
        "question": "What completes a closed-loop communication?",
        "options": [
          "The sender speaks louder without waiting.",
          "The receiver silently assumes the meaning.",
          "The receiver repeats the instruction, and the sender confirms or corrects the repeat-back.",
          "The message is transmitted once without acknowledgement."
        ],
        "correctAnswer": 2,
        "explanation": "Closed-loop communication checks both reception and shared understanding, especially for headings, speeds, distances and manoeuvring orders."
      },
      {
        "id": 2,
        "sectionRef": "Kapalı Döngü Haberleşme",
        "category": "Operasyonel Maritime English ve Köprüüstü İletişimi",
        "question": "A helm order is repeated back incorrectly. What should the officer do?",
        "options": [
          "Assume the helmsman intended the right order.",
          "Issue several additional orders rapidly.",
          "Correct the misunderstanding and obtain an accurate repeat-back before execution.",
          "Wait until the ship's heading changes."
        ],
        "correctAnswer": 2,
        "explanation": "Closed-loop communication checks the message before action. Correct the specific error using clear standard wording, confirm the repeat-back and then monitor execution; acknowledgement alone is not evidence that the intended manoeuvre occurred."
      }
    ]
  },
  {
    "topicKey": "communication",
    "topicTitle": "Acil Durum İngilizcesi ve Standart Durum Raporları",
    "blocks": [
      {
        "sectionTitles": [
          "MAYDAY ve PAN-PAN Sonrası Güncelleme"
        ]
      },
      {
        "sectionTitles": [
          "Flooding ve Damage Control Raporları"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "MAYDAY ve PAN-PAN Sonrası Güncelleme",
        "category": "Acil Durum İngilizcesi ve Standart Durum Raporları",
        "question": "Why send an update after an initial distress or urgency message?",
        "options": [
          "The first message prevents any further communication.",
          "Updates should replace facts with guesses.",
          "Only routine cargo information may be updated.",
          "The condition, position, assistance required or number of persons at risk may have changed."
        ],
        "correctAnswer": 3,
        "explanation": "Emergency updates maintain a shared and current picture; known facts and uncertainties should remain distinguishable."
      },
      {
        "id": 2,
        "sectionRef": "Flooding ve Damage Control Raporları",
        "category": "Acil Durum İngilizcesi ve Standart Durum Raporları",
        "question": "A crew member reports only 'water coming in'. What information would make the report operationally useful?",
        "options": [
          "An assumed cause stated as a certainty.",
          "Only the crew member's opinion of the weather.",
          "The compartment, observed level or rate, boundary condition and actions already taken.",
          "A complete investigation before alerting anyone."
        ],
        "correctAnswer": 2,
        "explanation": "Initial reports should be prompt and specific. Location, observations, changes and actions help the command team assess the emergency. Separate verified facts from estimates and update the report rather than delaying the first warning for perfect information."
      }
    ]
  },
  {
    "topicKey": "communication",
    "topicTitle": "Logbook, Statement ve Profesyonel Rapor Yazımı",
    "blocks": [
      {
        "sectionTitles": [
          "Deck Logbook Kayıt İlkeleri"
        ]
      },
      {
        "sectionTitles": [
          "Incident Statement"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Deck Logbook Kayıt İlkeleri",
        "category": "Logbook, Statement ve Profesyonel Rapor Yazımı",
        "question": "Which approach supports a reliable deck logbook entry?",
        "options": [
          "Record events, times and observations factually and distinguish what was observed from an interpretation.",
          "Backfill an uncertain time as if it were exact.",
          "Erase an event because it may be inconvenient.",
          "Write unsupported blame as an established fact."
        ],
        "correctAnswer": 0,
        "explanation": "Professional records preserve chronology, sources and uncertainty. Statements should describe facts the writer can support."
      },
      {
        "id": 2,
        "sectionRef": "Incident Statement",
        "category": "Logbook, Statement ve Profesyonel Rapor Yazımı",
        "question": "An officer records damage that another crew member reported but the officer did not see. How should the entry be written?",
        "options": [
          "Describe the damage as personally observed.",
          "Identify the source and distinguish the report from personal observations.",
          "Omit the event because it was reported orally.",
          "Rewrite earlier entries to make the timeline appear consistent."
        ],
        "correctAnswer": 1,
        "explanation": "Professional records distinguish observations, reports and interpretations. Identify who supplied the information and the relevant times, preserve the original record and follow the ship's correction procedure if later evidence changes the account."
      }
    ]
  },
  {
    "topicKey": "communication",
    "topicTitle": "Denetim, Surveyor ve PSC ile Mesleki İletişim",
    "blocks": [
      {
        "sectionTitles": [
          "Ekipmanı Göstererek Açıklama"
        ]
      },
      {
        "sectionTitles": [
          "Bilmediğinde Doğru Cevap"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Ekipmanı Göstererek Açıklama",
        "category": "Denetim, Surveyor ve PSC ile Mesleki İletişim",
        "question": "When an inspector asks about equipment, what demonstrates understanding?",
        "options": [
          "Recite a generic answer without knowing the equipment.",
          "Explain its purpose, show its location and controls, and relate checks and limitations to the ship’s arrangement.",
          "Operate unfamiliar controls without authorisation.",
          "Assume a certificate proves every item is ready."
        ],
        "correctAnswer": 1,
        "explanation": "The lesson connects the actual equipment with its operating procedure, condition, records and the crew member’s responsibilities."
      },
      {
        "id": 2,
        "sectionRef": "Bilmediğinde Doğru Cevap",
        "category": "Denetim, Surveyor ve PSC ile Mesleki İletişim",
        "question": "A surveyor asks an officer to demonstrate an unfamiliar equipment test. What is the appropriate response?",
        "options": [
          "Improvise the test to avoid appearing uncertain.",
          "Explain the limit of personal knowledge and obtain the approved procedure and responsible officer.",
          "Claim that the test was completed earlier.",
          "Disable the protective system so the test will pass."
        ],
        "correctAnswer": 1,
        "explanation": "Accurate communication includes acknowledging uncertainty. Use the responsible person and approved instructions, understand the operational consequences and agree a safe demonstration; invented evidence or an improvised test can create both safety and compliance failures."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
    "blocks": [
      {
        "sectionTitles": [
          "Uygunsuz Davranışın Tanınması"
        ]
      },
      {
        "sectionTitles": [
          "Bildirim, Kayıt ve Gizlilik"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Uygunsuz Davranışın Tanınması",
        "category": "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
        "question": "Which situation should be recognised as a workplace safety concern?",
        "options": [
          "Only physical injuries after they occur.",
          "Any disagreement, regardless of its nature.",
          "Threats, humiliation, harassment or repeated bullying, including behaviour presented as a joke.",
          "Only behaviour reported by a senior officer."
        ],
        "correctAnswer": 2,
        "explanation": "The lesson recognises physical, verbal, psychological and sexual misconduct and the need for appropriate reporting and protection."
      },
      {
        "id": 2,
        "sectionRef": "Bildirim, Kayıt ve Gizlilik",
        "category": "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
        "question": "A crew member fears retaliation after reporting harassment. What response supports a safe reporting process?",
        "options": [
          "Use the designated confidential process, provide protection and follow up appropriately.",
          "Publish the complaint to the whole crew.",
          "Promise absolute secrecy that the process cannot guarantee.",
          "Require the person to confront the alleged harasser alone."
        ],
        "correctAnswer": 0,
        "explanation": "Reporting arrangements should protect people from retaliation and explain how information will be handled. Use the designated support and investigation channels, limit disclosure appropriately and address immediate safety needs without prejudging the facts."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Gemide Tıbbi İlk Yardım ve TMAS",
    "blocks": [
      {
        "sectionTitles": [
          "Olay Yeri Güvenliği ve ABCDE Yaklaşımı"
        ]
      },
      {
        "sectionTitles": [
          "TMAS, Radio Medical Advice ve Tahliye"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Olay Yeri Güvenliği ve ABCDE Yaklaşımı",
        "category": "Gemide Tıbbi İlk Yardım ve TMAS",
        "question": "What comes before approaching a casualty to provide first aid?",
        "options": [
          "Enter immediately even if the atmosphere may be hazardous.",
          "Move every casualty before assessing the scene.",
          "Delay calling for help until treatment is finished.",
          "Assess the scene for danger to the casualty and the rescuer, and call for appropriate assistance."
        ],
        "correctAnswer": 3,
        "explanation": "First aid starts with scene safety and assistance. The subsequent structured assessment does not remove the need to protect the rescuer."
      },
      {
        "id": 2,
        "sectionRef": "TMAS, Radio Medical Advice ve Tahliye",
        "category": "Gemide Tıbbi İlk Yardım ve TMAS",
        "question": "What belongs in a follow-up report to TMAS after initial advice?",
        "options": [
          "Timed observations, changes in condition and the treatment actually given.",
          "A diagnosis invented to make the report sound complete.",
          "Only the patient's job title.",
          "A copy of the first report without later changes."
        ],
        "correctAnswer": 0,
        "explanation": "Medical advice depends on reliable updates. Report observed signs and their times, response to treatment and practical limitations; distinguish facts from assumptions and follow the medical advice and shipboard emergency procedures within the crew's competence."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "ISPS, Gemi Güvenliği ve Korsanlık",
    "blocks": [
      {
        "sectionTitles": [
          "Security Level 1, 2 ve 3"
        ]
      },
      {
        "sectionTitles": [
          "Erişim Kontrolü ve Restricted Areas"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Security Level 1, 2 ve 3",
        "category": "ISPS, Gemi Güvenliği ve Korsanlık",
        "question": "How should ship security levels be understood?",
        "options": [
          "They indicate different security conditions and associated measures under the approved security arrangements.",
          "They are three fire alarm tones.",
          "The watch officer may ignore a raised level without consultation.",
          "They describe cargo loading rates."
        ],
        "correctAnswer": 0,
        "explanation": "Security levels relate to deliberate threats and the measures implemented under the ship’s security plan and command arrangements."
      },
      {
        "id": 2,
        "sectionRef": "Erişim Kontrolü ve Restricted Areas",
        "category": "ISPS, Gemi Güvenliği ve Korsanlık",
        "question": "An unexpected visitor presents a convincing contractor badge. What should the gangway watch do?",
        "options": [
          "Allow entry because the badge looks professional.",
          "Assume a familiar company logo is sufficient.",
          "Leave the access point unattended to locate a colleague.",
          "Verify identity and authorisation under the ship's access-control procedure."
        ],
        "correctAnswer": 3,
        "explanation": "A badge alone does not establish authority to board. Check the visit and required permissions, apply the current security arrangements and escalate uncertainty while maintaining access control; avoid improvising exceptions for apparent urgency or status."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Denizcilikte Siber Güvenlik",
    "blocks": [
      {
        "sectionTitles": [
          "Köprüüstü ve OT Sistemlerinin Riskleri"
        ]
      },
      {
        "sectionTitles": [
          "Olay Anında İzolasyon ve İş Sürekliliği"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Köprüüstü ve OT Sistemlerinin Riskleri",
        "category": "Denizcilikte Siber Güvenlik",
        "question": "Why do cyber risks extend beyond office computers on a ship?",
        "options": [
          "Equipment without a keyboard cannot be affected.",
          "Operational technology and bridge systems can also be affected through connections, media, access or compromised data.",
          "A familiar USB device is always safe.",
          "Only email systems require access control."
        ],
        "correctAnswer": 1,
        "explanation": "The lesson considers navigation, machinery and operational systems, including shared dependencies and the risk of unverified changes."
      },
      {
        "id": 2,
        "sectionRef": "Olay Anında İzolasyon ve İş Sürekliliği",
        "category": "Denizcilikte Siber Güvenlik",
        "question": "A navigation workstation behaves abnormally after an unknown USB device was used. What is the best first approach?",
        "options": [
          "Immediately erase every device on the network.",
          "Reconnect the USB to other computers for comparison.",
          "Activate the incident process, preserve evidence and assess safe containment and operational continuity.",
          "Assume antivirus software makes an incident impossible."
        ],
        "correctAnswer": 2,
        "explanation": "Cyber containment must consider the safety of ship operations. Report the event, avoid spreading the suspect media, preserve relevant evidence and use the approved incident plan to decide isolation and continuity measures with the responsible personnel."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Çatışma Sonrası Acil Müdahale",
    "blocks": [
      {
        "sectionTitles": [
          "İlk Dakikalar"
        ]
      },
      {
        "sectionTitles": [
          "Hasar ve Stabilite Değerlendirmesi"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "İlk Dakikalar",
        "category": "Çatışma Sonrası Acil Müdahale",
        "question": "What should the bridge team establish immediately after a collision?",
        "options": [
          "Resume the voyage before assessing damage.",
          "Send an unprotected person into a flooding space.",
          "Raise the alarm, notify the Master and assess injuries, flooding, fire and the ship’s condition.",
          "Assume damage is confined to the visible contact point."
        ],
        "correctAnswer": 2,
        "explanation": "Immediate response establishes command and the state of people and ship, then supports containment, assistance and reporting."
      },
      {
        "id": 2,
        "sectionRef": "Hasar ve Stabilite Değerlendirmesi",
        "category": "Çatışma Sonrası Acil Müdahale",
        "question": "After a collision, no external oil or water leakage is visible. What conclusion is justified?",
        "options": [
          "There can be no hull damage.",
          "Internal damage and progressive flooding still require assessment.",
          "The vessel may resume normal speed without checks.",
          "Only cosmetic damage is possible."
        ],
        "correctAnswer": 1,
        "explanation": "External appearance cannot establish the condition of internal compartments or boundaries. Follow the emergency organisation to assess damage, personnel, flooding, stability and pollution risk, using safe inspections and repeated measurements where conditions permit."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Karaya Oturma ve Yeniden Yüzdürme Emniyeti",
    "blocks": [
      {
        "sectionTitles": [
          "İlk Eylemler"
        ]
      },
      {
        "sectionTitles": [
          "Refloating Planı"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "İlk Eylemler",
        "category": "Karaya Oturma ve Yeniden Yüzdürme Emniyeti",
        "question": "Why should refloating after grounding not be attempted without assessment?",
        "options": [
          "Any rise of tide guarantees a safe refloating.",
          "Full astern is always the first action.",
          "The absence of visible water proves the hull is intact.",
          "Damage, stability, hull loads, tide and pollution risks can make an unplanned attempt worsen the casualty."
        ],
        "correctAnswer": 3,
        "explanation": "The lesson starts with notification, position and damage assessment. Refloating requires a considered plan and appropriate expert support."
      },
      {
        "id": 2,
        "sectionRef": "Refloating Planı",
        "category": "Karaya Oturma ve Yeniden Yüzdürme Emniyeti",
        "question": "A grounded ship will soon have more water at high tide. Is immediate refloating automatically safe?",
        "options": [
          "Yes; increased water depth removes all grounding risks.",
          "Yes, if full astern power is available.",
          "Only the tide height matters.",
          "No; assess damage, ground reaction, stability, strength and pollution risks before the plan is authorised."
        ],
        "correctAnswer": 3,
        "explanation": "The ground may support or mask damage, and refloating can open leakage paths or change stability and stresses. A controlled plan considers the vessel's condition, assistance, environmental conditions and contingencies; propulsion alone is not a substitute for assessment."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Flooding, Hasar Kontrolü ve Yara Savunma",
    "blocks": [
      {
        "sectionTitles": [
          "Flooding Kaynağının Belirlenmesi"
        ]
      },
      {
        "sectionTitles": [
          "Pompalama, Cross-Flooding ve Stabilite"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Flooding Kaynağının Belirlenmesi",
        "category": "Flooding, Hasar Kontrolü ve Yara Savunma",
        "question": "What information helps locate and assess flooding?",
        "options": [
          "Soundings, bilge alarms, tank or space status, draft and list changes, and safe reports from the affected area.",
          "Only the last charted depth.",
          "A single alarm proves the exact source.",
          "A closed hatch guarantees all connected spaces are dry."
        ],
        "correctAnswer": 0,
        "explanation": "Flooding assessment combines independent indications and the compartment layout while avoiding unsafe entry."
      },
      {
        "id": 2,
        "sectionRef": "Pompalama, Cross-Flooding ve Stabilite",
        "category": "Flooding, Hasar Kontrolü ve Yara Savunma",
        "question": "The water level falls in one compartment but rises in another. What should the team investigate?",
        "options": [
          "Possible progressive flooding through connected spaces or failed boundaries.",
          "Proof that the original damage has repaired itself.",
          "Only the accuracy of the first sounding.",
          "Whether all damage-control efforts can stop."
        ],
        "correctAnswer": 0,
        "explanation": "A lower level in one space may reflect transfer rather than successful removal from the vessel. Compare timed observations, compartment connections and boundary status, then reassess the damage-control plan and stability with the responsible command team."
      }
    ]
  },
  {
    "topicKey": "safety",
    "topicTitle": "Acil Durum Komuta, Raporlama ve Delil Yönetimi",
    "blocks": [
      {
        "sectionTitles": [
          "Komuta Zinciri ve Ortak Durum Resmi"
        ]
      },
      {
        "sectionTitles": [
          "Log, VDR ve Elektronik Delil"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Komuta Zinciri ve Ortak Durum Resmi",
        "category": "Acil Durum Komuta, Raporlama ve Delil Yönetimi",
        "question": "Why establish a common situation picture during an emergency?",
        "options": [
          "It replaces the need to assign responsibilities.",
          "It lets the command team coordinate actions from consistent, updated information.",
          "It means every team must act independently.",
          "It requires uncertain information to be reported as confirmed."
        ],
        "correctAnswer": 1,
        "explanation": "Command coordination depends on roles, communication, verified facts and updates, with uncertainty clearly stated."
      },
      {
        "id": 2,
        "sectionRef": "Log, VDR ve Elektronik Delil",
        "category": "Acil Durum Komuta, Raporlama ve Delil Yönetimi",
        "question": "An incident recorder is approaching its overwrite period. What should the team do?",
        "options": [
          "Wait until a formal claim is received.",
          "Edit the original recording to remove irrelevant sections.",
          "Promptly preserve the relevant records using the approved procedure and maintain their integrity.",
          "Share unverified extracts publicly."
        ],
        "correctAnswer": 2,
        "explanation": "Evidence can be lost through routine system operation. Preserve relevant recordings, logs and timelines promptly without altering the original evidence, document handling and follow the ship's reporting and access arrangements."
      }
    ]
  },
  {
    "topicKey": "machine-fuel-technology",
    "topicTitle": "Alternatif Yakıtların Operasyonel Emniyeti",
    "blocks": [
      {
        "sectionTitles": [
          "Yakıt Tehlikelerinin Ayrıştırılması"
        ]
      },
      {
        "sectionTitles": [
          "Yakıt Tehlikelerinin Ayrıştırılması"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Yakıt Tehlikelerinin Ayrıştırılması",
        "category": "Alternatif Yakıtların Operasyonel Emniyeti",
        "question": "Why must alternative fuels be assessed individually?",
        "options": [
          "Every alternative fuel has the same hazards as conventional fuel oil.",
          "A low carbon content removes all handling hazards.",
          "Flammability, toxicity, cryogenic conditions and other hazards differ between fuels.",
          "One generic gas detector is suitable for every fuel."
        ],
        "correctAnswer": 2,
        "explanation": "Fuel-specific hazards determine competence, detection, ventilation, isolation and emergency arrangements; the fuel name alone is not an operating procedure."
      },
      {
        "id": 2,
        "sectionRef": "Yakıt Tehlikelerinin Ayrıştırılması",
        "category": "Alternatif Yakıtların Operasyonel Emniyeti",
        "question": "Can an LNG emergency response be copied unchanged for a methanol fuel installation?",
        "options": [
          "Yes; all low-carbon fuels have identical hazards.",
          "Yes; only the fuel price changes.",
          "No emergency plan is needed for alternative fuels.",
          "No; identify the fuel-specific hazards, installation and approved response arrangements."
        ],
        "correctAnswer": 3,
        "explanation": "Different fuels have different flammability, toxicity, temperature and detection characteristics. Training and response arrangements must match the actual fuel and installation; familiar procedures provide a starting point for questions, not proof of equivalence."
      }
    ]
  },
  {
    "topicKey": "machine-electrical",
    "topicTitle": "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
    "blocks": [
      {
        "sectionTitles": [
          "Yetkilendirme ve Switching Programı"
        ]
      },
      {
        "sectionTitles": [
          "İzolasyon, LOTO ve Gerilimsizlik Doğrulaması"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Yetkilendirme ve Switching Programı",
        "category": "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
        "question": "What is essential before high-voltage switching work?",
        "options": [
          "Assuming a remote indication alone proves isolation.",
          "Applying a generic sequence from another ship.",
          "Working without a defined communication arrangement.",
          "Authorised personnel and an approved switching and isolation plan for the actual installation."
        ],
        "correctAnswer": 3,
        "explanation": "High-voltage work requires installation-specific authorisation, switching, isolation, verification and control of arc-flash exposure."
      },
      {
        "id": 2,
        "sectionRef": "İzolasyon, LOTO ve Gerilimsizlik Doğrulaması",
        "category": "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
        "question": "A high-voltage breaker is shown as open on a control screen. Does that prove the equipment is safe to touch?",
        "options": [
          "No; authorised isolation, verification and required earthing must follow the approved procedure.",
          "Yes; an open symbol proves absence of voltage everywhere.",
          "Yes; insulated gloves replace isolation.",
          "Only the screen colour matters."
        ],
        "correctAnswer": 0,
        "explanation": "A display indicates a reported state, not a complete electrical safety condition. Stored energy, backfeeds and indication faults remain possible. High-voltage work requires competent authorised personnel and the full isolation and verification arrangements for that installation."
      }
    ]
  },
  {
    "topicKey": "machine-electrical",
    "topicTitle": "Batarya Enerji Depolama ve Termal Kaçak",
    "blocks": [
      {
        "sectionTitles": [
          "BMS ve Normal Operasyon"
        ]
      },
      {
        "sectionTitles": [
          "İzolasyon ve Yangın Müdahalesi"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "BMS ve Normal Operasyon",
        "category": "Batarya Enerji Depolama ve Termal Kaçak",
        "question": "What is the role of a battery management system (BMS)?",
        "options": [
          "Monitor battery condition and support protective actions within the approved battery installation.",
          "Guarantee that thermal runaway is impossible.",
          "Replace every ventilation and emergency arrangement.",
          "Permit operation outside the maker’s limits."
        ],
        "correctAnswer": 0,
        "explanation": "The BMS monitors conditions such as cell voltage and temperature, but protection also depends on the system design and approved procedures."
      },
      {
        "id": 2,
        "sectionRef": "İzolasyon ve Yangın Müdahalesi",
        "category": "Batarya Enerji Depolama ve Termal Kaçak",
        "question": "A battery affected by thermal runaway has cooled externally. Can monitoring stop immediately?",
        "options": [
          "Yes; a cool casing proves all cells are safe.",
          "No; assess continuing gas, propagation and reignition hazards under the emergency plan.",
          "Yes; remove all ventilation without assessment.",
          "Only the state-of-charge display needs checking."
        ],
        "correctAnswer": 1,
        "explanation": "Surface temperature alone cannot establish internal cell condition or eliminate delayed hazards. Maintain the monitoring, exclusion and response arrangements required by the battery installation and emergency plan, with specialist support where appropriate."
      }
    ]
  },
  {
    "topicKey": "machine-automation",
    "topicTitle": "Makine Otomasyonu ve OT Siber Güvenliği",
    "blocks": [
      {
        "sectionTitles": [
          "IT ve OT Ayrımı"
        ]
      },
      {
        "sectionTitles": [
          "Servis Laptopu, USB ve Uzaktan Erişim"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "IT ve OT Ayrımı",
        "category": "Makine Otomasyonu ve OT Siber Güvenliği",
        "question": "What distinguishes OT cybersecurity from ordinary office IT protection?",
        "options": [
          "OT systems do not use data or access controls.",
          "OT protection must consider the safety and availability of physical processes as well as information.",
          "A software update may always be installed without operational review.",
          "An office backup alone restores every machinery control function."
        ],
        "correctAnswer": 1,
        "explanation": "Changes affecting control systems need an assessment of process consequences, authorisation and a suitable recovery arrangement."
      },
      {
        "id": 2,
        "sectionRef": "Servis Laptopu, USB ve Uzaktan Erişim",
        "category": "Makine Otomasyonu ve OT Siber Güvenliği",
        "question": "A contractor wants to connect a laptop to the machinery control network. What must happen first?",
        "options": [
          "Authorise the access and apply the ship's OT security and change-control process.",
          "Connect it because the contractor is familiar with the equipment.",
          "Disable all logging to improve connection speed.",
          "Treat the control network exactly like a public guest network."
        ],
        "correctAnswer": 0,
        "explanation": "Maintenance access can introduce malware, configuration changes or availability failures. Verify the purpose, equipment and permissions, control the connection and plan recovery and operational coordination before making changes to a safety-relevant system."
      }
    ]
  },
  {
    "topicKey": "machine-maintenance",
    "topicTitle": "Havuzlama ve Teknik Survey Hazırlığı",
    "blocks": [
      {
        "sectionTitles": [
          "İş Kapsamı ve Survey Planı"
        ]
      },
      {
        "sectionTitles": [
          "Yeniden Devreye Alma ve Deniz Tecrübesi"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "İş Kapsamı ve Survey Planı",
        "category": "Havuzlama ve Teknik Survey Hazırlığı",
        "question": "What should a dry-docking and technical-survey work scope connect?",
        "options": [
          "Only the paint colour.",
          "Only the date the ship enters the dock.",
          "The required inspections, equipment condition, repair work, resources and verification plan.",
          "Only the number of contractors."
        ],
        "correctAnswer": 2,
        "explanation": "Planning brings survey requirements and condition evidence into an agreed work scope with isolation, responsibilities and completion criteria."
      },
      {
        "id": 2,
        "sectionRef": "Yeniden Devreye Alma ve Deniz Tecrübesi",
        "category": "Havuzlama ve Teknik Survey Hazırlığı",
        "question": "A repaired component passed its workshop test. What is still required before the shipboard system is returned to service?",
        "options": [
          "Nothing; a workshop certificate proves the entire installed system works.",
          "Approved onboard recommissioning, including interfaces and required protective functions.",
          "Only repainting the component.",
          "Disabling alarms during the next voyage."
        ],
        "correctAnswer": 1,
        "explanation": "A workshop test may cover the component but not its installed connections, settings or interaction with other equipment. Recommission under the approved procedure, confirm the required functional and protective tests and document the return to service."
      }
    ]
  },
  {
    "topicKey": "machine-erm",
    "topicTitle": "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
    "blocks": [
      {
        "sectionTitles": [
          "Otorite Gradyanı ve Konuşma Hakkı"
        ]
      },
      {
        "sectionTitles": [
          "Otorite Gradyanı ve Konuşma Hakkı"
        ]
      }
    ],
    "questions": [
      {
        "id": 1,
        "sectionRef": "Otorite Gradyanı ve Konuşma Hakkı",
        "category": "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
        "question": "How does psychological safety support an engine-room team?",
        "options": [
          "It removes the need for command responsibility.",
          "It means technical concerns should stay unreported.",
          "It guarantees that no mistakes occur.",
          "Team members can raise concerns and uncertainty early without humiliation or retaliation."
        ],
        "correctAnswer": 3,
        "explanation": "A safe speaking-up culture helps detect threats and misunderstandings early while preserving clear responsibilities and escalation routes."
      },
      {
        "id": 2,
        "sectionRef": "Otorite Gradyanı ve Konuşma Hakkı",
        "category": "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
        "question": "A junior engineer questions a planned action. How should the responsible engineer respond?",
        "options": [
          "Silence the concern because rank settles technical facts.",
          "Transfer command without discussing the concern.",
          "Invite a clear statement of the concern, verify it and communicate the decision.",
          "Ignore the concern unless an alarm has already sounded."
        ],
        "correctAnswer": 2,
        "explanation": "Psychological safety helps teams expose assumptions and detect threats early. Respectful challenge works with clear authority: listen, establish the facts and explain the decision or escalation so that the team shares an accurate understanding."
      }
    ]
  }
];
