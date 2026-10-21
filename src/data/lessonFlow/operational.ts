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
      }
    ]
  }
];
