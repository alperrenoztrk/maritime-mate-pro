import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  AlertTriangle,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  LifeBuoy,
  Flame,
  Heart,
  Radio,
  Anchor,
  Users,
  BookMarked,
  Eye,
  Siren,
  HardHat,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface SafetySubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface SafetyMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: SafetySubTopic[];
}

const safetyTopics: SafetyMainTopic[] = [
  {
    id: "solas-general",
    number: 1,
    title: "SOLAS Convention General",
    icon: Shield,
    subtopics: [
      { id: "solas-history", title: "SOLAS history and development", hasContent: true },
      { id: "solas-structure", title: "SOLAS structure and divisions", hasContent: true },
      { id: "solas-certificates", title: "SOLAS certificates", hasContent: true },
      { id: "solas-surveys", title: "Surveys and inspections", hasContent: true },
      { id: "solas-amendments", title: "Current changes and applications", hasContent: true },
    ],
  },
  {
    id: "fire-safety",
    number: 2,
    title: "Fire Safety",
    icon: Flame,
    subtopics: [
      { id: "fire-theory", title: "Fire theory and combustion chemistry", hasContent: true },
      { id: "fire-classes", title: "Fire classes and extinguishing methods", hasContent: true },
      { id: "fire-detection", title: "Fire detection and alarm systems", hasContent: true },
      { id: "portable-extinguishers", title: "Portable extinguishers", hasContent: true },
      { id: "fixed-fire-systems", title: "Fixed extinguishing systems", hasContent: true },
      { id: "fire-fighting-proc", title: "Fire fighting procedures", hasContent: true },
      { id: "engine-room-fire", title: "Engine room fires", hasContent: true },
      { id: "fire-drills", title: "Fire drills and SOLAS requirements", hasContent: true },
      { id: "eebd", title: "EEBD – Emergency Escape Breathing Device", hasContent: true },
      { id: "scba", title: "SCBA – Self-contained Breathing Apparatus", hasContent: true },
      { id: "firemans-outfit", title: "Fireman's Outfit", hasContent: true },
      { id: "fire-fighting-equipment", title: "Fire circuit, hydrant, hose and nozzles", hasContent: true },
      { id: "structural-fire-protection", title: "Structural fire protection (class A/B/C partitions)", hasContent: true },
      { id: "fire-control-plan", title: "Fire control plan", hasContent: true },
    ],
  },
  {
    id: "life-saving",
    number: 3,
    title: "Life-saving Appliances (LSA)",
    icon: LifeBuoy,
    subtopics: [
      { id: "lsa-overview", title: "LSA Code general structure", hasContent: true },
      { id: "lifeboats", title: "Lifeboat types and equipment", hasContent: true },
      { id: "liferafts", title: "Life rafts and SOLAS requirements", hasContent: true },
      { id: "rescue-boats", title: "Rescue boats", hasContent: true },
      { id: "personal-lsa", title: "Personal lifesaving equipment", hasContent: true },
      { id: "pyrotechnics", title: "Pyrotechnic sign tools", hasContent: true },
      { id: "lsa-maintenance", title: "LSA maintenance and inspection", hasContent: true },
      { id: "immersion-suit-tpa", title: "Immersion suit and thermal protector (TPA)", hasContent: true },
      { id: "mes", title: "Marine evacuation system (MES)", hasContent: true },
      { id: "line-throwing", title: "Line-Throwing Appliance", hasContent: true },
    ],
  },
  {
    id: "abandon-ship",
    number: 4,
    title: "Don't Abandon Ship",
    icon: Anchor,
    subtopics: [
      { id: "abandon-decision", title: "Abandonment decision and chain of authority", hasContent: true },
      { id: "muster-stations", title: "Assembly stations and task distribution", hasContent: true },
      { id: "abandon-procedure", title: "Abandon ship procedure", hasContent: true },
      { id: "launching-boats", title: "Boat and raft launching techniques", hasContent: true },
      { id: "survival-at-sea", title: "Survival at sea", hasContent: true },
      { id: "hypothermia", title: "Hypothermia and cold water shock", hasContent: true },
    ],
  },
  {
    id: "first-aid",
    number: 5,
    title: "First Aid and Medical Care",
    icon: Heart,
    subtopics: [
      { id: "first-aid-basics", title: "Basic first aid principles", hasContent: true },
      { id: "cpr-procedure", title: "CPR and basic life support", hasContent: true },
      { id: "bleeding-fractures", title: "Bleeding control and fracture intervention", hasContent: true },
      { id: "burns-treatment", title: "Burn treatment", hasContent: true },
      { id: "medical-chest", title: "Ship health chest (Medical Chest)", hasContent: true },
      { id: "telemedical", title: "Tele-medical consultancy (TMAS)", hasContent: true },
    ],
  },
  {
    id: "sar-operations",
    number: 6,
    title: "Search and Rescue (SAR)",
    icon: Eye,
    subtopics: [
      { id: "sar-system", title: "SAR system and IAMSAR Manual", hasContent: true },
      { id: "sar-patterns", title: "Search patterns", hasContent: true },
      { id: "on-scene-coordinator", title: "On-scene coordinator (OSC)", hasContent: true },
      { id: "person-overboard", title: "Overboard and MOB procedure", hasContent: true },
      { id: "helicopter-ops", title: "Helicopter operations", hasContent: true },
    ],
  },
  {
    id: "gmdss",
    number: 7,
    title: "GMDSS",
    icon: Radio,
    subtopics: [
      { id: "gmdss-overview", title: "GMDSS general structure and sea areas", hasContent: true },
      { id: "epirb-sart", title: "EPIRB, SART and AIS-SART", hasContent: true },
      { id: "dsc-vhf", title: "DSC and VHF communication", hasContent: true },
      { id: "inmarsat", title: "INMARSAT and satellite systems", hasContent: true },
      { id: "navtex", title: "NAVTEX and safety information", hasContent: true },
      { id: "distress-comm", title: "Distress, urgency and safety communications", hasContent: true },
    ],
  },
  {
    id: "ism-isps",
    number: 8,
    title: "ISM Code and ISPS Code",
    icon: BookMarked,
    subtopics: [
      { id: "ism-code", title: "ISM Code structure and requirements", hasContent: true },
      { id: "sms-system", title: "SMS (Safety Management System)", hasContent: true },
      { id: "isps-code", title: "ISPS Code and security levels", hasContent: true },
      { id: "sso-cso", title: "SSO, CSO and PFSO roles", hasContent: true },
      { id: "security-assessment", title: "Ship security assessment (SSA)", hasContent: true },
    ],
  },
  {
    id: "survival-techniques",
    number: 9,
    title: "Sea Survival Techniques",
    icon: Users,
    subtopics: [
      { id: "water-entry", title: "Water entry techniques", hasContent: true },
      { id: "flotation-aids", title: "Swimming and buoyancy techniques", hasContent: true },
      { id: "raft-survival", title: "Survival on raft", hasContent: true },
      { id: "signaling-rescue", title: "Signaling and rescue", hasContent: true },
      { id: "food-water-survival", title: "Food and water management", hasContent: true },
    ],
  },
  {
    id: "enclosed-spaces",
    number: 10,
    title: "Confined Space Security",
    icon: AlertTriangle,
    subtopics: [
      { id: "enclosed-space-risks", title: "Confined space risks and hazardous atmosphere", hasContent: true },
      { id: "entry-permit", title: "Entry permission system (Entry Permit)", hasContent: true },
      { id: "atmosphere-testing", title: "Atmosphere testing and measuring equipment", hasContent: true },
      { id: "rescue-from-enclosed", title: "Confined space rescue procedure", hasContent: true },
    ],
  },
  {
    id: "occupational-safety",
    number: 11,
    title: "Occupational Health and Safety",
    icon: HardHat,
    subtopics: [
      { id: "ppe", title: "Personal protective equipment (PPE)", hasContent: true },
      { id: "permit-to-work", title: "Work permit system and hot work permit", hasContent: true },
      { id: "risk-assessment", title: "Risk assessment and JSA", hasContent: true },
      { id: "damage-control", title: "Damage control and waterproof integrity", hasContent: true },
      { id: "mooring-safety-snapback", title: "Binding security and snap-back areas", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  image?: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - SOLAS GENEL
  // =====================================================
  "solas-history": {
    title: "SOLAS History and Development",
    introduction: "SOLAS (Safety of Life at Sea) is the most comprehensive international agreement to ensure the safety of life at sea.",
    content: `THE BIRTH OF THE SOLAS CONVENTION:

The sinking of RMS Titanic on 15 April 1912 brought about fundamental change in the maritime world. 1,514 of the 2,224 passengers and crew lost their lives, and this disaster made the need for international regulation of safety of life at sea plainly clear.

The first SOLAS convention was adopted in 1914. It could not enter into force, however, because of the First World War.

VERSIONS OF THE SOLAS CONVENTION:

SOLAS 1914: the first attempt after the Titanic disaster. It required a sufficient number of lifeboats, a radio watch and an ice patrol service.

SOLAS 1929: the first comprehensive provisions on fire safety.

SOLAS 1948: updated in the light of the experience of the Second World War. It formed part of the process leading to the establishment of the IMO (then called IMCO).

SOLAS 1960: the IMO's first major achievement. The technical standards were set out in detail.

SOLAS 1974: the version still in force. The "tacit acceptance" procedure allowed amendments to enter into force far more quickly.

The 1988 Protocol: introduced the harmonized system of survey and certification.

THE TACIT ACCEPTANCE PROCEDURE:

The most important innovation of SOLAS 1974 is the tacit acceptance procedure. Under this system an adopted amendment enters into force automatically on a given date unless a sufficient number of States object. This mechanism removed the delays of decades that amendments suffered under the earlier versions.`,
    keyPoints: [
      "The first SOLAS convention was adopted after the Titanic disaster in 1914.",
      "The version in force is SOLAS 1974",
      "Tacit acceptance procedure ensures rapid implementation of changes",
      "SOLAS continues to be updated regularly",
    ],
  },
  "solas-structure": {
    title: "SOLAS Structure and Sections",
    introduction: "The SOLAS convention has a comprehensive structure covering all safety aspects of maritime transport.",
    content: `THE STRUCTURE OF SOLAS CHAPTERS:

Chapter I – General Provisions: the scope of the convention and the survey and certification rules.

Chapter II-1 – Construction: requirements for ship structure, subdivision, stability, machinery and electrical installations. The damage stability calculations are found here. The probabilistic damage stability approach became mandatory with the SOLAS 2009 amendments.

Chapter II-2 – Fire Safety: fire prevention, detection and extinction. The FSS Code (Fire Safety Systems Code) is an integral part of this chapter. Structural fire protection, escape routes and control of ventilation systems in a fire.

Chapter III – Life-Saving Appliances: applied together with the LSA Code (Life-Saving Appliances Code). Requirements for lifeboats and liferafts, pyrotechnic signals and personal protective equipment.

Chapter IV – Radiocommunications: the GMDSS requirements. Sea areas (A1-A4) and the mandatory equipment.

Chapter V – Safety of Navigation: navigational equipment, routeing services, ship reporting systems, VDR, AIS and ECDIS requirements.

Chapter VI – Carriage of Cargoes: cargo safety, solid bulk cargoes (the IMSBC Code) and the verified gross mass of containers (VGM).

Chapter VII – Carriage of Dangerous Goods: the IMDG Code, the INF Code.

Chapter VIII – Nuclear Ships.

Chapter IX – Management for the Safe Operation of Ships: the ISM Code requirement.

Chapter X – Safety Measures for High-Speed Craft: the HSC Code.

Chapter XI-1 – Special Measures to Enhance Maritime Safety: the enhanced survey programme, the ship identification number (IMO Number).

Chapter XI-2 – Special Measures to Enhance Maritime Security: the ISPS Code requirement.

Chapter XII – Additional Safety Measures for Bulk Carriers.

Chapter XIII – Verification of Compliance: the IMO Member State Audit Scheme (IMSAS).

Chapter XIV – Safety Measures for Ships Operating in Polar Waters: the Polar Code requirement.`,
    keyPoints: [
      "SOLAS consists of 14 parts and covers all security issues",
      "Section II-1 regulates structure, II-2 fire, III lifesaving, IV radio, V navigation safety.",
      "ISM Code (Part IX) and ISPS Code (Part XI-2) are mandatory",
      "Each section is supported with its own subcodes (FSS, LSA, HSC)",
    ],
  },
  "solas-certificates": {
    title: "SOLAS Certificates",
    introduction: "Within the scope of SOLAS, various certificates are issued to ships and their validity is verified through regular surveys.",
    content: `THE PRINCIPAL SOLAS CERTIFICATES:

1. Passenger Ship Safety Certificate: certifies that a passenger ship complies with the SOLAS requirements. It is valid for 12 months.

2. Cargo Ship Safety Construction Certificate: certifies that a cargo ship complies with the structural standards. Valid for 5 years, subject to annual survey.

3. Cargo Ship Safety Equipment Certificate: certifies the compliance of the life-saving, fire fighting and navigational equipment. Valid for 5 years.

4. Cargo Ship Safety Radio Certificate: certifies the compliance of the GMDSS equipment. Valid for 5 years.

5. ISSC (International Ship Security Certificate): certifies compliance with the ISPS Code. Valid for 5 years.

6. SMC (Safety Management Certificate): certifies the ship's compliance with the SMS under the ISM Code. Valid for 5 years.

7. DOC (Document of Compliance): certifies the company's compliance under the ISM Code.

TYPES OF SURVEY:

Initial Survey: the first survey, carried out before the ship enters service.
Annual Survey: the yearly inspection; mandatory for the certificate to remain valid.
Intermediate Survey: the survey carried out within the 5-year period (in the 2nd or 3rd year).
Renewal Survey: the comprehensive survey carried out to renew the certificate.
Additional Survey: the extra survey carried out after a repair, alteration or damage.`,
    keyPoints: [
      "Passenger ship certificates are valid for 12 months, cargo ship certificates are valid for 5 years",
      "Annual survey is mandatory to maintain certificate validity",
      "SMC is given to the ship, DOC is given to the company",
      "ISSC certifies ISPS Code compliance",
    ],
  },
  "solas-surveys": {
    title: "Surveys and Inspections",
    introduction: "The validity of ship safety certificates is maintained by surveys carried out at regular intervals.",
    content: `THE SURVEY SYSTEM:

The harmonized system of survey and certification (HSSC) aligns all the mandatory survey dates. Under this system the surveys for the ship's various certificates are combined as far as possible, keeping operational interruption to a minimum.

FLAG STATE INSPECTION:

The flag State is responsible for ensuring that its ships comply with the international standards. It carries out these inspections directly or through authorised classification societies (ROs – Recognized Organizations).

PORT STATE CONTROL (PSC):

Port State Control covers the inspection of foreign-flagged ships in port. It is applied within the framework of regional agreements such as the Paris MoU and the Tokyo MoU.

The main matters checked in a PSC inspection:
- The validity and currency of the certificates
- Crew competence and watchkeeping arrangements
- That the life-saving and fire fighting equipment is in working order
- The condition of the navigational equipment
- Compliance with the ISM and ISPS Codes
- Environmental requirements (MARPOL)

DETENTION:

If a "clearly hazardous" deficiency is found on board the ship is detained. Detention causes serious financial and reputational loss to the ship operator. Detention rates directly affect the targeting profile of the company and the flag State.

CERTIFICATE EXTENSION:

Where unavoidable, a certificate may be extended by a maximum of 3 months. Extension is applied in exceptional circumstances and is not regarded as normal practice.`,
    keyPoints: [
      "Harmonized survey system reduces operational disruptions",
      "PSC detention has serious consequences",
      "Flag state may authorize classification societies (RO)",
      "The certificate period can be extended by a maximum of 3 months",
    ],
  },
  "solas-amendments": {
    title: "Current Changes and Applications",
    introduction: "The SOLAS convention is constantly updated depending on developments in maritime technology and lessons learned from accidents.",
    content: `RECENT MAJOR AMENDMENTS:

VGM (Verified Gross Mass) – 2016: the amendment to SOLAS Chapter VI, Regulation 2 made the declaration of a verified gross mass for containers mandatory. The MSC Flaminia and other container ship casualties triggered this regulation.

ECDIS requirement: under SOLAS Chapter V, Regulation 19.2 the use of ECDIS became mandatory on new ships in stages. Paper charts may continue to be carried as a back-up.

The Polar Code – 2017: SOLAS Chapter XIV set structural, operational and environmental requirements for ships operating in polar waters.

The IGF Code – 2017: safety requirements for ships using natural gas or other low-flashpoint fuels.

SOLAS III/17.1 (lifeboat maintenance): the requirements for the periodic maintenance and servicing of lifeboats were updated. Servicing by a maker-approved station became mandatory.

Cyber security – MSC.428(98): the integration of cyber risk management into the SMS became mandatory under the ISM Code (from 1 January 2021).

SOLAS II-1/3-12 (Goal-Based Standards – GBS): the requirement that the structural design of new tankers and bulk carriers complies with goal-based standards.`,
    keyPoints: [
      "VGM (2016): Verification of container gross weights is mandatory",
      "Polar Code (2017): Additional requirements for ships sailing in polar regions",
      "Cybersecurity risks should be integrated into ISM/SMS",
      "SOLAS is a living convention that is constantly updated",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - YANGIN GÜVENLİĞİ
  // =====================================================
  "fire-theory": {
    title: "Fire Theory and Combustion Chemistry",
    introduction: "Fire is an uncontrolled combustion reaction that begins with the presence of flammable material, oxygen and ignition energy.",
    content: `COMBUSTION THEORY:

Combustion is the exothermic (heat-releasing) reaction of a substance with oxygen. Three elements must be present at the same time for this reaction to start:

1. Fuel: it may be solid, liquid or gas. Liquid fuels do not burn directly; the vapours evaporating from their surface burn.

2. Oxygen: present in the atmosphere at 21% by volume. A minimum oxygen concentration of 16% is needed for combustion. Below 16% most combustible substances will not burn.

3. Ignition energy (heat): the energy source that raises the fuel to its ignition temperature. Sources such as a spark, a hot surface, an electrical arc or friction.

THE FOUR-ELEMENT MODEL:

Modern fire theory adds a fourth element, the "chain chemical reaction", to the triangle. This four-element model is called the fire tetrahedron. Extinguishing agents such as halon put a fire out by breaking the chemical reaction.

IGNITION TEMPERATURE AND FLASH POINT:

Flash Point: the lowest temperature at which a liquid fuel gives off enough vapour from its surface to flash momentarily on contact with an external source of ignition. It is >60°C for HFO and -43°C for petrol.

Fire Point: the temperature at which sustained burning begins. It is a few degrees above the flash point.

Auto-Ignition Temperature: the temperature at which a substance ignites spontaneously without an external source of ignition. It is about 210°C for diesel oil.

PRODUCTS OF COMBUSTION:

Complete combustion: CO₂ + H₂O + heat. Sufficient oxygen is present.
Incomplete combustion: CO (carbon monoxide) + soot + toxic gases. It occurs where oxygen is insufficient. More than 75% of fire deaths at sea are caused by smoke inhalation.`,
    keyPoints: [
      "Fire triangle: fuel + oxygen + heat; quadrilateral: + chain reaction",
      "Minimum 16% O₂ concentration required, inerting reduces it to below 5%",
      "Flash point: short flare; fire point: continuous burning temperature",
      "More than 75% of fire deaths are caused by smoke inhalation",
    ],
  },
  "fire-classes": {
    title: "Fire Classes and Extinguishing Methods",
    introduction: "Fires are classified according to the burning substance, and the appropriate extinguishing method is different for each class.",
    content: `CLASSES OF FIRE:

Class A – Solid materials: fires in organic solids such as wood, cloth, paper and plastic. Extinguished by cooling. Water is the most effective agent. Embers can remain and there is a risk of re-ignition.

Class B – Flammable liquids: fires in flammable liquids such as fuel, oil, paint and solvents. Extinguished by smothering. Foam, CO₂ and dry chemical powder are used. Not extinguished with water; water can spread the fire by splashing.

Class C – Flammable gases: fires in gases such as LPG, LNG and acetylene. The fire is not extinguished until the gas flow has been shut off, otherwise there is a risk of explosion. Dry chemical powder, CO₂.

Class D – Combustible metals: aluminium, magnesium, titanium, sodium. Special dry powder extinguishers are needed. Water must never be used; it can react violently.

Class E/F – Electrical / cooking oils: in an electrical fire the power is isolated first, then CO₂ or dry powder is used. Wet chemical extinguishers are used for cooking oil fires.

FIRE RISK AREAS ON BOARD:

Engine room: the highest fire risk. Fuel leaking onto a hot surface is the main cause. A fixed CO₂ or FM-200 system is fitted.
Galley: the risk of a cooking oil fire. A fixed extinguishing system is mandatory.
Cargo holds: bulk cargo fires and container fires. CO₂ inerting or water spray.
Paint store: flammable paints and solvents. The ventilation and storage rules are critical.
Accommodation: smoking, electrical faults. Smoke detectors and a sprinkler system.`,
    keyPoints: [
      "Never use water on Class B fires – it will splash and spread",
      "Class C fires cannot be extinguished without stopping the gas flow.",
      "The engine room is the area with the highest fire risk on the ship.",
      "In case of electrical fire, first the power is cut off and then intervention is made.",
    ],
  },
  "fire-detection": {
    title: "Fire Detection and Alarm Systems",
    introduction: "Early detection of fire is the basic condition for effective intervention and preventing loss of life.",
    content: `DETECTION PRINCIPLES:

Smoke detectors:
- Ionisation type: uses a radioactive source (Americium-241). Smoke particles disturb the ionisation current and raise the alarm. Effective in fast-burning fires that produce little smoke.
- Photoelectric (optical) type: based on the principle of light scattering. When smoke particles scatter the light the photosensor raises the alarm. More sensitive to fires producing dense smoke.
- Laser type: the most sensitive. It can detect smoke at a very early stage.

Heat detectors:
- Fixed temperature type: raises the alarm when a set temperature (usually 57°C or 72°C) is reached.
- Rate-of-rise type: raises the alarm when the rate of temperature increase exceeds a set threshold. Normally 8-10°C/minute.
- Combined type: combines both principles.

Flame detectors:
- UV (ultraviolet) sensor: detects the UV radiation emitted by a flame.
- IR (infrared) sensor: detects the IR radiation emitted by a flame.
- Combined UV/IR: reduces the false alarm rate.

THE FIRE ALARM SYSTEM:

The fire alarm panel is on the bridge. It provides a zonal alarm display. The alarm status of each zone is monitored separately. Under SOLAS II-2 the fire detection and alarm system must be continuously monitored. The back-up power supply must have a capacity of at least 36 hours.

SAMPLE SMOKE DETECTION SYSTEM:

An aspirating type system used in cargo holds. Air samples are drawn from each compartment through a pipeline and analysed at a central detector. Common on container ships and Ro-Ro vehicle decks.`,
    keyPoints: [
      "Ionization detector is effective in fast burning fires, optical detector is effective in fires with dense smoke",
      "The fire alarm panel is located on the bridge and provides regional indication",
      "The backup power supply must be capable of at least 36 hours",
      "Smoke sampling (aspiration) system is used in cargo holds",
    ],
  },
  "portable-extinguishers": {
    title: "Portable Extinguishers",
    introduction: "Portable fire extinguishers are the first line of defense used to intervene in the initial stages of a fire.",
    content: `TYPES OF EXTINGUISHER:

Water extinguisher (9 litres): used on Class A fires. Works by cooling. Not used on electrical or liquid fires.

Foam extinguisher (9 litres): used on Class A and B fires. Works by blanketing the surface and cooling. AFFF (Aqueous Film Forming Foam) is the typical foam type.

Dry chemical powder extinguisher (9 kg): can be used on all classes of fire (ABC type). Works by breaking the chemical reaction. It does not prevent re-ignition; its cooling effect is low.

CO₂ extinguisher (5 kg): used on Class B and electrical fires. Works by smothering. It leaves no residue and is preferred in areas with electronic and mechanical equipment. There is a risk of asphyxiation if it is used in an enclosed space.

TECHNIQUE OF USE (THE PASS METHOD):

P – Pull: pull the pin.
A – Aim: aim the nozzle at the base of the fire.
S – Squeeze: squeeze the lever.
S – Sweep: extinguish by sweeping across the base of the fire.

SITING RULES:

Under SOLAS II-2 portable extinguishers must be sited at defined intervals in accessible positions. There must be at least one foam extinguisher in the engine room. A cooking oil extinguisher is mandatory in the galley. Extinguishers are subject to annual maintenance and periodic pressure testing.`,
    keyPoints: [
      "CO₂ extinguisher leaves no residue and is preferred in electronic areas",
      "PASS technique: Pull – Aim – Squeeze – Sweep",
      "Dry chemical powder can be used in all classes, but its cooling effect is low",
      "Extinguishers are subject to annual maintenance and periodic pressure testing",
    ],
  },
  "fixed-fire-systems": {
    title: "Fixed Extinguishing Systems",
    introduction: "Fixed fire extinguishing systems are especially used to combat fires in large compartments such as engine rooms and cargo holds.",
    content: `THE FIXED CO₂ SYSTEM:

Used in the engine room and cargo holds. It extinguishes the fire by reducing the oxygen concentration. All personnel must be evacuated from the space before release – CO₂ is fatal.

CO₂ system components: high-pressure CO₂ cylinders (usually in the CO₂ room), a pilot cylinder, the main valve, the alarm system, distribution pipes and nozzles. A 20-second audible and visual pre-alarm is given before release into the engine room.

Calculating the quantity of CO₂ (FSS Code Chapter 5): for the engine room, 40% of the gross volume of the largest machinery space (excluding the casing) or 35% of the total volume (including the casing) — whichever is the greater; for cargo holds, CO₂ equal to 30% of the gross volume of the largest hold is required. In a machinery space 85% of the required gas must be capable of being released within the first 2 minutes.

THE FOAM SYSTEM:

Used on tanker decks and in the engine room. It works by blanketing the surface and cooling.

Low expansion foam (expansion ratio <20): used for tanker deck fire fighting.
Medium expansion foam (20-200): engine rooms and enclosed spaces.
High expansion foam (>200): used in large enclosed volumes.

THE WATER SPRINKLER SYSTEM:

Mandatory in the accommodation areas of passenger ships. It works automatically; the sprinkler heads activate at a set temperature (usually 68°C or 79°C). They are triggered by a glass bulb or a fusible link.

THE WATER MIST SYSTEM:

Fine water droplets create a large cooling surface. Low water consumption. Used in engine rooms and accommodation spaces. Developed as an alternative to halon.

FM-200 (HFC-227ea):

A clean extinguishing gas. The environmentally friendly alternative to Halon 1301. It works by breaking the chemical reaction and by cooling. It leaves no residue. Used in control rooms and areas with electronic equipment.`,
    keyPoints: [
      "A 20-second pre-alarm is mandatory before evacuating the CO₂ system",
      "CO₂ is fatal, all personnel in the compartment must be evacuated",
      "Engine room CO₂ capacity: minimum 35% of volume",
      "Water mist is becoming more common as a halon alternative.",
    ],
    warnings: [
      "Before releasing CO₂ you must be CERTAIN that there is nobody in the space",
      "The procedures for entering the CO₂ room must be applied strictly",
    ],
  },
  "fire-fighting-proc": {
    title: "Fire Fighting Procedures",
    introduction: "Effective firefighting on board requires organized teamwork and the application of standard procedures.",
    content: `THE FIRE ALARM PROCEDURE:

1. Whoever discovers the fire raises the alarm at once and informs the bridge.
2. The location, type and size of the fire are reported.
3. The general alarm is sounded (7 short blasts + 1 prolonged blast).
4. The crew go to their fire stations and take up the positions set out in the muster list.

BOUNDARY COOLING:

To prevent the fire spreading to adjacent compartments, the boundaries (bulkheads, decks) of the compartment on fire are cooled with water from outside. This is critical to preserving structural integrity.

AN ENGINE ROOM FIRE:

1. Close the fuel valves (quick closing valves).
2. Stop the ventilation and close the dampers.
3. Evacuate all personnel from the space.
4. Release the fixed extinguishing system (CO₂ or FM-200).
5. Apply boundary cooling.
6. Do not open the space until you are sure the fire is out.

FIRE TEAM ORGANISATION:

Team No. 1 (attack): responds in full fire fighting outfit with SCBA (breathing apparatus) and a fire hose.
Team No. 2 (back-up/support): the back-up team for Team No. 1. Boundary cooling and logistic support.
Team No. 3 (technical): ventilation control, valve operations, pump control.
Medical team: first aid.

USING SCBA:

Self-Contained Breathing Apparatus is a closed-circuit breathing set. Personnel fighting a fire must wear SCBA. The cylinder capacity is usually 30 minutes. The cylinder pressure is checked before entry. The buddy system (working in pairs) is mandatory.`,
    keyPoints: [
      "General fire alarm: 7 short + 1 long whistle",
      "In case of engine room fire, fuel valves are closed first.",
      "SCBA use is mandatory, buddy system is applied",
      "Boundary cooling is critical to prevent fire spread",
    ],
    warnings: [
      "The space must not be opened until you are sure the fire is out – the risk of flashback",
      "SCBA olmadan duman dolu alana girilmez",
    ],
  },
  "engine-room-fire": {
    title: "Engine Room Fires",
    introduction: "The engine room is the area with the highest fire risk on the ship. Fuel leaks, hot surfaces and electrical malfunctions are the main causes of fire.",
    content: `THE MAIN CAUSES:

1. Fuel leakage: fuel reaching a hot surface (exhaust manifold, turbocharger casing) after a failure of a high-pressure fuel line, a flange leak or a gasket leak. When a hot surface exceeds 220°C, HFO is already well past its flash point.

2. Oil leakage: a leak of lubricating oil or hydraulic oil.

3. Electrical fault: breakdown of cable insulation, loose connections, overload.

4. Economizer fire: a fire inside the economizer caused by a build-up of soot.

5. Scavenge fire: a fire caused by a build-up of oil and carbon in the scavenge air trunk.

PREVENTIVE MEASURES:

Fuel line lagging (thermal insulation): lagging hot surfaces delays fuel reaching them in the event of a leak.
Drip trays: leakage collection trays; they catch fuel and oil leaks.
Quick closing valves: remotely operated valves; they cut off the fuel flow in a fire.
Regular maintenance: periodic checks of flanges, gaskets, hoses and connections.
Cleanliness: regular removal of oil accumulations.

EMERGENCY RESPONSE:

1. Close the quick closing valves
2. Stop the fuel pumps
3. Stop the ventilation fans and close the fire dampers
4. Evacuate personnel
5. Release the CO₂ or FM-200 system
6. Start boundary cooling
7. Isolate the machinery completely

THE RISK OF RE-IGNITION:

If the space is opened after the fire has been extinguished but before the hot surfaces have cooled, the fresh air can cause re-ignition. The space must be kept closed for at least 24 hours and temperature readings must be taken.`,
    keyPoints: [
      "90% of engine room fires are caused by fuel/oil leaks",
      "HFO ignition risk is high if hot surface temperature is >220°C",
      "The compartment should not be opened for at least 24 hours after the fire is extinguished.",
      "Quick closing valves should be tested regularly",
    ],
    warnings: [
      "The space must not be opened early because of the risk of re-ignition after extinguishing",
      "Damaged lagging (insulation) must be repaired immediately",
    ],
  },
  "fire-drills": {
    title: "Fire Drills and SOLAS Requirements",
    introduction: "In accordance with SOLAS III/19.3, fire drills should be held at regular intervals and the participation of the entire crew should be ensured.",
    content: `FREQUENCY OF DRILLS:

SOLAS Chapter III, Regulation 19.3.2: every crew member must take part in at least one fire drill each month. If more than 25% of the crew did not take part in the drills on that ship in the previous month, a drill must be held within 24 hours of the ship leaving port.

THE MANDATORY DRILL SCHEDULE (SOLAS III/19.3; III/30.2 on passenger ships):
- Abandon ship drill: at least once a month on cargo ships; weekly on passenger ships.
- Fire drill: at least once a month on cargo ships; weekly on passenger ships.
- Every lifeboat must be launched and manoeuvred in the water: at least once every 3 months (III/19.3.4.3).
- The rescue boat must be launched and manoeuvred: monthly where practicable, and in any case at least once every 3 months (III/19.3.4.4).
- Free-fall lifeboat: an actual or simulated launching drill at least once every 6 months.
- Enclosed space entry and rescue drill: at least once every 2 months (SOLAS III/19.3.3).
- Every crew member must take part in an abandon ship drill within one month.

DRILL CONTENT:

1. Sounding the general alarm and mustering the crew at their fire stations
2. Preparing the fire teams in full outfit
3. Use and checking of SCBA
4. Running out, connecting and using a fire hose
5. Checking the fire pump and the fixed extinguishing system
6. Ventilation and fire damper control
7. Operating the quick closing valves
8. Applying boundary cooling
9. Checking the emergency escape routes
10. First aid response

RECORDS AND DOCUMENTATION:

All drills are entered in the Official Log Book. The date, duration, scenario details, participants and any deficiencies found are recorded. Drill records are checked in PSC inspections. A shortcoming may be treated as a detainable deficiency.

SCENARIOS:

Drills must be run with different scenarios: an engine room fire, a galley fire, an accommodation fire, a cargo hold fire. Different extinguishing methods and team coordination must be practised for each scenario.`,
    keyPoints: [
      "Fire drills should be held at least once a month (SOLAS III/19.3)",
      "If 25% of the crew changes, drilling is mandatory within 24 hours",
      "Drills are recorded in the Official Log Book",
      "Diversity should be provided with different scenarios and locations",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - CAN KURTARMA ARAÇLARI (LSA)
  // =====================================================
  "lsa-overview": {
    title: "LSA Code General Structure",
    introduction: "The LSA Code (Life-Saving Appliances Code) sets the technical standards for the implementation of SOLAS Part III.",
    content: `THE STRUCTURE OF THE LSA CODE:

The LSA Code covers the design, performance and testing requirements for life-saving appliances. It defines the technical specifications of all the life-saving equipment required by the SOLAS Chapter III regulations.

THE MAIN SECTIONS:

Chapter I – General: scope and definitions.
Chapter II – Personal life-saving appliances: lifejackets, lifebuoys, immersion suits and thermal protective aids (TPA).
Chapter III – Visual signals: pyrotechnics (rocket parachute flares, hand flares, smoke signals).
Chapter IV – Survival craft: requirements for lifeboats and liferafts.
Chapter V – Launching and embarkation appliances: davits, winches and launching systems.
Chapter VI – Other appliances: line-throwing appliances.

GENERAL REQUIREMENTS:

All life-saving appliances must be resistant to the marine environment, UV radiation, temperature variation and rainwater. They must be fitted with retro-reflective tape. All personal life-saving appliances must be IMO approved and records of periodic maintenance/testing must be kept.`,
    keyPoints: [
      "LSA Code is the application standard of SOLAS III",
      "All LSA equipment must be IMO approved and have retroreflective tape.",
      "Periodic maintenance and test records should be kept",
      "Includes personal, visual and public survival aids",
    ],
  },
  "lifeboats": {
    title: "Lifeboat Types and Equipment",
    introduction: "Lifeboats are enclosed or semi-enclosed boats designed to accommodate all crew and passengers in the event of abandoning ship.",
    content: `TYPES OF LIFEBOAT:

Totally Enclosed Lifeboat (TELB): the standard type on cargo ships under SOLAS. It is self-righting if it capsizes. It has an engine, a water spray pump, ventilation, first aid equipment and food/water.

Partially enclosed lifeboat: may be found on passenger ships.

Free-fall lifeboat: mounted on the after deck of tankers and bulk carriers. It is launched into the sea by free fall from a given height. Minimum free-fall capability of 1.0g. The crew are secured in special seats with harnesses.

LIFEBOAT EQUIPMENT:

The mandatory equipment list (in part):
- Engine (capable of 6 knots)
- Hand and mechanical steering
- Compass and chart
- Food (10,000 kJ per person) and fresh water (3 litres per person)
- First aid kit
- Pyrotechnic signals (4 rocket parachute flares, 6 hand flares, 2 buoyant smoke signals — LSA Code 4.4.8)
- Radar reflector or SART
- Torch and batteries
- Signalling flares (2)
- Oars, buoyant lifelines
- Sea anchor
- Survival manual

CAPACITY CALCULATION:

On cargo ships: there must be lifeboat capacity for the whole crew on each side. The total lifeboat capacity is therefore twice the number of crew.

On passenger ships: different requirements apply; the total capacity is provided by a combination of lifeboats and liferafts.`,
    keyPoints: [
      "On cargo ships, a dinghy with full crew capacity is mandatory on each side.",
      "Free fall boat is preferred in tankers and bulk carriers",
      "TELB can right itself in case of tipping over",
      "The dinghy equipment is defined in detail by SOLAS and LSA Code",
    ],
  },
  "liferafts": {
    title: "Life Rafts and SOLAS Requirements",
    introduction: "Life rafts are inflatable lifesaving devices used when lifeboats cannot be used or additional capacity is required.",
    content: `TYPES OF LIFERAFT:

SOLAS Type A (davit-launched): a raft launched by davit. Found on passenger ships and large cargo ships. The launching speed is controlled.

SOLAS Type B (throw-overboard): a raft thrown into the sea from the ship's side and inflated. It is fitted with an automatic inflation mechanism. If the ship founders, the hydrostatic release unit (HRU) frees it automatically and it inflates.

THE HYDROSTATIC RELEASE UNIT (HRU):

The HRU is activated automatically by water pressure when the ship sinks to a depth of 2-4 metres. It releases the securing strap, the raft floats to the surface and inflates automatically as the painter comes taut. The liferaft is serviced at an approved station every 12 months; the HRU is a disposable item that is not serviced and is renewed by the expiry date marked on it, normally every 2 years.

LIFERAFT EQUIPMENT:

The mandatory equipment is divided into SOLAS Pack A or Pack B:
Pack A (for voyages over 24 hours): water, food, paddles, sea anchor, first aid, pyrotechnics, repair kit, pump, torch.
Pack B (for voyages up to 24 hours): less food/water, basic pyrotechnics and equipment.

MAINTENANCE AND SERVICING:

Inflatable liferafts must be serviced at an approved service station every 12 months. A full test every 5 years. The HRU is replaced periodically. Servicing must be carried out by certified personnel.`,
    keyPoints: [
      "HRU automatically releases the raft when the ship sinks to a depth of 2-4 m",
      "The liferaft is serviced every 12 months; HRU is a disposable part and is normally renewed every 2 years.",
      "Rafts must be maintained at an authorized service every 12 months.",
      "SOLAS Pack A: 24+ hours, Pack B: up to 24 hours survival gear",
    ],
  },
  "rescue-boats": {
    title: "Rescue Boats",
    introduction: "Rescue boats are fast and maneuverable boats designed to collect people who have fallen into the sea or lifesaving vehicles adrift in the sea.",
    content: `RESCUE BOAT REQUIREMENTS:

Under SOLAS III/17.1 every ship must carry at least one rescue boat. A rescue boat may also count as a lifeboat; in that case the lifeboat capacity is arranged accordingly.

TECHNICAL CHARACTERISTICS:

A minimum speed of 6 knots. Capacity for at least 5 persons (with room for one casualty lying down). A rigid or inflated hull. Self-righting capability. A towing hook and a lifeline. Engine: outboard or inboard.

USES:

1. Recovering a person overboard (MOB)
2. Collecting liferafts drifting at sea
3. Inshore search operations
4. SAR support operations
5. Pilot transfer (together with the pilot ladder)

LAUNCHING AND RELEASE:

The rescue boat must be capable of being launched quickly by its davit system. SOLAS requires it to be launched and made ready within 5 minutes. When the man overboard alarm is given the rescue boat crew must prepare immediately.`,
    keyPoints: [
      "At least one rescue boat is mandatory on every ship (SOLAS III/17.1)",
      "Must be able to be launched within 5 minutes",
      "Minimum 6 knots speed and 5 person capacity",
      "Used in MOB, SAR and raft collection operations",
    ],
  },
  "personal-lsa": {
    title: "Personal Lifesaving Equipment",
    introduction: "Personal lifesaving equipment is equipment that increases an individual's chance of survival in the event of falling overboard or abandoning the ship.",
    content: `LIFEJACKET:

SOLAS requires a lifejacket for every person on board, plus additional jackets at the watch positions. Children's lifejackets are also mandatory on passenger ships.

Performance requirements: it must turn an unconscious person into a safe face-up position with the mouth clear of the water within 5 seconds. At least 15.5 kg of buoyancy. It must be fitted with a whistle, a light (1 cd, 8 hours) and retro-reflective tape.

LIFEBUOY:

The minimum number of lifebuoys is set by the length of the ship. At least 2 on each side, stowed so that they can be released quickly. At least half must be fitted with a man-overboard (MOB) light and at least 2 also with an automatic smoke signal; at least 1 must have a 30-metre buoyant line.

Minimum numbers (SOLAS III):
- Cargo ships (Regulation 32): <100 m = 8; 100-150 m = 10; 150-200 m = 12; ≥200 m = 14.
- Passenger ships (Regulation 22): <60 m = 8; 60-120 m = 12; 120-180 m = 18; 180-240 m = 24; ≥240 m = 30.

PYROTECHNIC SIGNALS (ship level):
At least 12 rocket parachute flares are carried on or near the bridge (SOLAS III/6.3). These are separate from the pyrotechnics carried in each lifeboat (4 rocket parachute flares, 6 hand flares, 2 buoyant smoke signals).

IMMERSION SUIT:

Designed to preserve body heat when abandoning ship in cold water. A close-fitting watertight suit. It keeps the fall in body temperature below 2°C for 6 hours. It provides 70 N of buoyancy without a lifejacket. Mandatory under SOLAS on ships operating in cold waters.

THERMAL PROTECTIVE AID (TPA):

A waterproof, windproof bag-shaped garment. Used in a liferaft or lifeboat by persons without an immersion suit. It slows the loss of body heat.`,
    keyPoints: [
      "One life jacket for each person + additional vest is mandatory in watch positions",
      "The life jacket must provide prone position within 5 seconds",
      "At least 2 life preservers must be equipped with MOB lights and smoke signals",
      "Immersion suit preserves body temperature for 6 hours",
    ],
  },
  "pyrotechnics": {
    title: "Pyrotechnic Signal Tools",
    introduction: "Pyrotechnic signaling devices are used to guide rescue operations by giving a visual signal in case of distress at sea.",
    content: `TYPES OF PYROTECHNIC:

ROCKET PARACHUTE FLARE: fired to a height of at least 300 metres. It descends by parachute, burning red at a minimum of 30,000 candela for at least 40 seconds. Visible by day and night. It can be seen from 40 km. It is fired at a slight angle into the wind.

HAND FLARE: a red flare held in the hand. It burns at 15,000 candela for at least 1 minute. Used for marking a position at short range. Effective for showing your position to a rescue helicopter or ship.

BUOYANT SMOKE SIGNAL: emits orange smoke. Effective for at least 3 minutes. Used in daylight. It is put into the water and the smoke drifts downwind.

RULES OF USE:

Pyrotechnics are marked with a serial number and an expiry date. They must not be used after the expiry date (although they may be kept on board as spares). The wind direction must be watched when using them. A rocket parachute flare must be fired to leeward so that it does not fall burning onto the ship.

STCW REQUIREMENTS:

All seafarers must be trained in the use of pyrotechnics. Expired pyrotechnics may be used for practice during drills.`,
    keyPoints: [
      "Parachute flare is launched to a height of 300 m, burns for 40+ seconds",
      "Hand torch is used for close range, parachute cartridge is used for long distance.",
      "Smoke sign is only effective during daylight hours",
      "Expired pyrotechnics should not be used",
    ],
  },
  "lsa-maintenance": {
    title: "LSA Maintenance and Inspection",
    introduction: "The reliability of lifesaving equipment is ensured by regular maintenance, inspection and testing. SOLAS III/20 defines maintenance requirements.",
    content: `WEEKLY CHECKS:

All life-saving appliances and launching gear are inspected visually every week. The lifeboat engines are run (at least 3 minutes). The quick closing valves, falls and hooks are checked. The results are entered in the log book.

MONTHLY CHECKS:

Lifejackets, lifebuoys and pyrotechnic stocks are checked. The EPIRB and SART are tested. The radio equipment is tested. The emergency lighting is checked.

ANNUAL CHECKS:

Load testing of davits and winches (every 5 years). Inspection of the wire ropes and the record of renewal. Full functional testing of the lifeboats (engine, equipment, watertightness).

LIFEBOAT MAINTENANCE:

Weekly engine running. Monthly equipment check. Annual maker-approved servicing. Greasing the davit winch and inspecting the wires. Testing the on-load and off-load release gear.

IMPORTANT NOTE: under MSC.1/Circ.1206 lifeboats must be serviced by maker-authorised service stations. Unauthorised servicing creates a safety risk and is a SOLAS breach.`,
    keyPoints: [
      "Weekly engine start-up and monthly equipment check are mandatory.",
      "Sandal maintenance should be done by the manufacturer's authorized service stations.",
      "Wire ropes are inspected regularly and damaged ones are replaced.",
      "All maintenance and testing records must be documented",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - GEMİYİ TERK ETME
  // =====================================================
  "abandon-decision": {
    title: "Abandonment Decision and Chain of Authority",
    introduction: "The decision to abandon ship is made as a last resort and is solely within the authority of the ship's Master.",
    content: `THE DECISION PROCESS:

The decision to abandon ship is taken when the ship can no longer provide for the safety of the crew and passengers. The master takes this decision after weighing all the alternatives. The basic rule: "the ship is a bigger lifeboat than the lifeboat" – staying on board is always preferable and abandoning ship is the last resort.

WHEN THE DECISION TO ABANDON IS TAKEN:

1. An uncontrollable fire
2. Extensive flooding and the risk of foundering
3. Structural integrity seriously in doubt
4. An uncontrollable gas leak or chemical hazard

THE CHAIN OF AUTHORITY:

The decision to abandon ship is taken by the master alone. If the master is absent or unable to act, the chief officer assumes this authority. The order to abandon is announced throughout the ship by the general alarm and the PA system.`,
    keyPoints: [
      "The decision to abandon ship is made only by the Master",
      "The ship is the ultimate lifeboat – abandonment is the last resort",
      "In the absence of the Master, the chief Master assumes authority.",
      "Risk of uncontrolled fire or sinking is grounds for abandonment",
    ],
  },
  "muster-stations": {
    title: "Assembly Stations and Task Distribution",
    introduction: "Emergency assembly stations and crew duty distribution are determined by the Muster List (Emergency Station Bill).",
    content: `THE MUSTER LIST:

Under SOLAS III/8 every ship must have a muster list. The allocation of duties is drawn up against the crew list and every person's duty is clearly defined. The muster list must be posted on the bridge, in the engine control room and in the crew accommodation.

DUTY GROUPS:

1. Bridge team: communications, alarm control, safety of navigation
2. Engine room team: shutting off fuel, ventilation control, pump operation
3. Survival craft team: preparing and launching the boats/rafts
4. Fire team: fire fighting
5. Medical team: first aid, medical response
6. Passenger guidance team (on passenger ships): directing passengers to the muster stations

MUSTER STATIONS:

Every muster station must be clearly marked and lit. IMO symbols are used. Access from the muster station to the embarkation point must be easy.

ALARM SIGNALS:

General alarm: 7 short blasts + 1 prolonged blast
Fire alarm: a continuously ringing bell/whistle
Abandon ship: the general alarm plus the order to abandon over the PA`,
    keyPoints: [
      "Muster List (Emergency Duty List) is mandatory on every ship",
      "General alarm: 7 short + 1 long blasts",
      "Each crew member's duty and assembly point must be determined.",
      "Assembly points should be marked with IMO symbols",
    ],
  },
  "abandon-procedure": {
    title: "Abandon Ship Procedure",
    introduction: "The abandon ship procedure is a vital process that begins with the Master's order and is carried out through standard steps.",
    content: `THE ABANDON SHIP PROCEDURE, STEP BY STEP:

1. PREPARATION: the master gives the order to abandon and the general alarm is sounded. A MAYDAY call is made. The EPIRB is activated. The SART is made ready.

2. MUSTERING: crew and passengers go to the muster stations. Lifejackets are put on. A roll call is taken. Whether to don immersion suits is assessed.

3. EMBARKATION: the boat/raft crews go to their stations. The davit systems are prepared. The embarkation ladder or ramp is used. Priority: the injured, children, women, the elderly.

4. LAUNCHING: controlled lowering by davit. The hooks are released when the boat reaches the water (on-load release). Rafts are launched (thrown overboard or lowered by davit). For a free-fall lifeboat the release mechanism is activated.

5. CLEARING THE SHIP: the boats and rafts move at least 200 metres away from the ship (suction effect and the risk of explosion). The rafts and boats gather together. The sea anchor is streamed. Survival procedures begin.

IMPORTANT PRINCIPLES:

Jumping into the sea from the ship is a last resort. If you must jump: the lifejacket is secured tightly, the mouth and nose are covered with one hand, the feet are held together and the jump is from no more than 5 metres. Jump from the lee side.`,
    keyPoints: [
      "MAYDAY call and EPIRB activation are the first steps",
      "Must stay at least 200 meters away from the ship",
      "Jumping into the sea is a last resort",
      "Order of priority: injured, children, women, elderly",
    ],
  },
  "launching-boats": {
    title: "Boat and Raft Landing Techniques",
    introduction: "Launching lifeboats and rafts safely and quickly is a critical skill that requires regular training and drill.",
    content: `LAUNCHING A LIFEBOAT (BY DAVIT):

1. The boat cover is removed and the gripes are released.
2. Embarkation takes place. The crew board fully equipped.
3. The davit arm is turned to swing the boat outboard.
4. The wire brake is checked and the boat is lowered to the water under control.
5. The hooks are released at the water surface (on-load release).
6. The painter is cut.
7. The engine is started and the boat clears the ship.

THE FREE-FALL LIFEBOAT:

1. The crew sit in the special seats and fasten their harnesses.
2. The master confirms the order to abandon.
3. The release mechanism is activated.
4. The boat slides down the ramp and enters the water in free fall.
5. The impact with the water is absorbed.
6. The engine is started and the boat clears the ship.

LAUNCHING A LIFERAFT:

Throw-overboard raft: the container securing is released, the raft is thrown into the sea and inflated by pulling the painter. Automatic release by HRU is also possible.
Davit-launched raft: lowered under control by davit, with embarkation at deck level.

IMPORTANT: the on-load release mechanism allows the boat to be released from the hooks under load while it is in the water. The correct operation of this mechanism is vital. Regular testing and maintenance are mandatory.`,
    keyPoints: [
      "It is vital that the on-load release mechanism works properly",
      "It is mandatory to wear a seat belt in a free fall boat.",
      "Painter rope is cut after the raft is inflated",
      "Boat/raft launching drills should be carried out regularly",
    ],
  },
  "survival-at-sea": {
    title: "Sea Survival",
    introduction: "Survival from leaving the ship until rescue requires physical and psychological preparation.",
    content: `SURVIVAL PRIORITIES:

1. PROTECTION: protection from hypothermia, sunstroke and injury. Use of an immersion suit or TPA. Closing the raft canopy.
2. LOCATION: EPIRB, SART, pyrotechnics, a heliograph mirror, a whistle.
3. WATER: managing the fresh water is the most critical element. An adult can survive on a minimum of 0.5 litres of water a day. No water is drunk in the first 24 hours (the body's reserves are sufficient).
4. FOOD: emergency food rations. Because digesting protein increases water consumption, fish must not be eaten when water is short.

HYPOTHERMIA:

Hypothermia is a fall in the body's core temperature below 35°C. Water conducts heat 25 times faster than air. A person in water at 15°C can survive for 4-6 hours in a lifejacket and 12+ hours in an immersion suit.

The HELP position: the legs are drawn up to the chest and the arms wrapped around the body. It reduces heat loss by 50%.
The HUDDLE position: huddling together as a group. It reduces heat loss still further.

PSYCHOLOGICAL FACTORS:

Leadership: one person is appointed leader in the boat/raft.
Allocation of duties: watchkeeping, water distribution, lookout.
Morale: the will to survive is the single most important factor. Regular activity and communication are maintained to keep despair at bay.`,
    keyPoints: [
      "HEAT position reduces heat loss by 50%",
      "Water management is the most critical survival factor",
      "Do not drink water for the first 24 hours, use body water.",
      "Leadership and delegation keep morale high",
    ],
  },
  "hypothermia": {
    title: "Hypothermia and Cold Water Shock",
    introduction: "Hypothermia is one of the most important causes of loss of life at sea. It is defined as body core temperature falling below 35°C.",
    content: `STAGES OF HYPOTHERMIA:

Mild hypothermia (35-32°C): shivering, loss of manual dexterity, muscle stiffness. The person is conscious but their judgement is impaired.

Moderate hypothermia (32-28°C): shivering stops, severe muscle rigidity, confusion, drowsiness. Cardiac arrhythmias may begin.

Severe hypothermia (below 28°C): loss of consciousness, irregular heartbeat, slowed breathing. The risk of death is very high.

COLD SHOCK RESPONSE:

Sudden immersion in cold water causes cold shock in the first 1-3 minutes: an involuntary gasp reflex, hyperventilation and a sudden rise in heart rate. The risk of drowning is highest during this period. A lifejacket saves lives at this stage.

SURVIVAL TIMES (approximate):

Water temperature → average survival time with a lifejacket:
0-2°C → 15-45 minutes
2-4°C → 30-90 minutes
4-10°C → 1-3 hours
10-15°C → 2-6 hours
15-20°C → 6-12 hours
Above 20°C → indefinite (a long time)

FIRST AID:

1. The person is lifted from the water slowly (the risk of rescue collapse)
2. Wet clothing is removed and they are wrapped in a dry cover/blanket
3. Passive rewarming is applied (the body warms with its own heat)
4. A warm sweet drink may be given (if conscious)
5. Active external rewarming is not applied (the risk of afterdrop)
6. Chest compressions and CPR are given only if all signs of life have gone

RESCUE COLLAPSE:

The risk of a drop in blood pressure and cardiac arrest in the first minutes after recovery from the water. The person must be lifted horizontally and sudden movement avoided.`,
    keyPoints: [
      "Cold water shock creates a risk of drowning in the first 1-3 minutes",
      "Life jacket saves lives during cold water shock",
      "HEAT position reduces heat loss by 50%",
      "Rescue collapse: risk of cardiac arrest when exiting water – remove in horizontal position",
    ],
    warnings: [
      "Never give alcohol to a hypothermic casualty – vasodilation increases heat loss",
      "Active external rewarming (hot water bottles, etc.) is dangerous because of the risk of afterdrop",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - İLK YARDIM
  // =====================================================
  "first-aid-basics": {
    title: "Basic First Aid Principles",
    introduction: "First aid at sea covers first aid to injuries and illnesses in an environment where access to medical assistance is limited.",
    content: `THE DR ABC PRINCIPLE:

D – Danger: assess the safety of the scene. Your own safety comes first.
R – Response: check the casualty's level of consciousness. Shake the shoulders gently and call out for a response.
A – Airway: make sure the airway is open. Head back, chin up.
B – Breathing: check for breathing. Look, listen and feel (10 seconds).
C – Circulation: check the pulse. Apply pressure to any major bleeding.

TRIAGE:

Where there is more than one casualty, priorities are set:
Red (immediate): life-threatening, treat at once
Yellow (delayed): serious injury, stable
Green (minor): walking wounded
Black: no signs of life

MEDICAL ORGANISATION ON BOARD:

The master is responsible for medical care on board (MLC 2006, STCW). A trained first-aider must be carried. The Ship Captain's Medical Guide is the reference book. Telemedical advice (TMAS) is available 24 hours a day.`,
    keyPoints: [
      "DR ABC: Distress → Response → Airway → Respiration → Circulation",
      "Triage: Red (urgent), Yellow (delayable), Green (mild)",
      "The Master is responsible for medical attention on the ship",
      "TMAS provides 24-hour tele-medical consultancy services",
    ],
  },
  "cpr-procedure": {
    title: "CPR and Basic Life Support",
    introduction: "CPR (Cardiopulmonary Resuscitation) is a basic life support practice that saves lives in case of cardiac arrest.",
    content: `THE CPR PROCEDURE (ADULT):

1. Check for danger, look for a response.
2. If there is no response, call for help and have an AED (if available) brought.
3. Open the airway (head back, chin up).
4. Check for breathing (10 seconds). If breathing is not normal, start CPR.
5. Give 30 chest compressions:
   - The heel of the hand on the lower half of the breastbone
   - Compress to a depth of 5-6 cm
   - At a rate of 100-120 compressions a minute
6. Give 2 rescue breaths.
7. Continue at a ratio of 30:2.
8. Use the AED as soon as it arrives.

AED (AUTOMATED EXTERNAL DEFIBRILLATOR):

Under SOLAS an AED must be carried on certain ships. The device guides the user with voice prompts. The electrode pads are placed on the chest. The device analyses the heart rhythm and advises a shock if required.

IMPORTANT NOTES:

Once started, CPR is continued until medical help arrives or the casualty starts breathing. Change over with another person when you tire. The quality of CPR (depth and rate) is the most important factor. The chest must be allowed to recoil fully between compressions.`,
    keyPoints: [
      "CPR rate: 30 compressions + 2 breaths",
      "Compression depth 5-6 cm, speed 100-120 per minute",
      "AED should be used immediately upon arrival.",
      "CPR quality (depth + speed) determines the chance of survival",
    ],
  },
  "bleeding-fractures": {
    title: "Bleeding Control and Fracture Management",
    introduction: "Serious bleeding and fractures are common types of injuries on board, and correct first aid treatment is vital.",
    content: `CONTROLLING BLEEDING:

Direct pressure: press firmly on the wound with a clean dressing. This is the most effective method.
Elevation: raise the bleeding limb above the level of the heart.
Pressure points: press on the arterial pressure points (brachial, femoral artery).
Tourniquet: applied as a last resort for life-threatening limb bleeding. The time of application is recorded.

TREATING FRACTURES:

Open fracture: the bone protrudes or the wound is open. Cover with a sterile dressing and apply a splint. Do not try to push the bone back.
Closed fracture: no external wound. Swelling, pain, deformity. Immobilise with a splint.

Rules for applying a splint: immobilise so as to include the joints above and below the fracture. Check the circulation (pulse, colour, sensation). Immobilise before moving the casualty.

SPECIAL CASES:

Suspected spinal injury: do not move the casualty. Keep the head, neck and body in line. Move using the log-roll technique.
Pelvic fracture: bind the legs together and keep the casualty still.
Rib fracture: lay the casualty on the injured side and support it.`,
    keyPoints: [
      "Direct pressure is the most effective method of bleeding control",
      "Tourniquet is applied as a last resort, time is saved",
      "The splint should include the upper and lower joints of the fracture",
      "If spinal injury is suspected, the person should not be moved.",
    ],
  },
  "burns-treatment": {
    title: "Burn Treatment",
    introduction: "Burns are a type of injury frequently encountered in engine room, galley and chemical operations on ships.",
    content: `DEGREES OF BURN:

1st degree: superficial redness and pain. Only the epidermis is affected. Like sunburn.
2nd degree: blistering and severe pain. Damage extending into the dermis. Risk of infection.
3rd degree: full-thickness damage to the skin. White/black in colour, no pain (the nerve endings are destroyed).

FIRST AID:

1. Remove the casualty from the source of danger.
2. Put out burning clothing (stop-drop-roll).
3. Cool the burn with cool (tepid) water for at least 20 minutes. Do not apply ice.
4. Remove jewellery and tight clothing (before swelling starts).
5. Cover with a sterile, non-adherent dressing. Cling film may be used.
6. Do not burst blisters.
7. Do not apply ointment, oil or cream.

CALCULATING THE BURN AREA (Wallace's Rule of Nines):

Head and neck: 9%
Each arm: 9%
Chest (front): 18%
Back: 18%
Each leg: 18%
Perineum: 1%

Adults with burns over 15% of the body surface (10% in children) need fluid replacement. IV fluids must be started. TMAS must be contacted.

CHEMICAL BURNS:

Wash the chemical off with plenty of water (at least 20 minutes). Remove contaminated clothing. Do not try to neutralise it. Check the material safety data sheet (MSDS/SDS).`,
    keyPoints: [
      "The burn should be cooled with cold water for at least 20 minutes.",
      "If the burn area exceeds 15%, IV fluid replacement is required",
      "Wallace's Rule of 9s is used to calculate burn area",
      "For chemical burns, wash with water for at least 20 minutes.",
    ],
  },
  "medical-chest": {
    title: "Ship Medical Chest",
    introduction: "It is mandatory to have medical supplies and medicines in accordance with ILO/WHO standards on every commercial ship.",
    content: `THE LEGAL BASIS:

Under MLC 2006 (the Maritime Labour Convention), Standard A4.1, every ship must carry adequate medical supplies. The contents of the ship's medical chest are determined by the ship's trading area, the number of crew and the length of the voyage.

CLASSIFICATION:

Category A: ships making long voyages far from the coast. The most comprehensive list of medicines and equipment.
Category B: coastal voyages. A medium level of supplies.
Category C: short distance, close to port. Basic supplies.

EXAMPLES OF CONTENTS:

Medicines: analgesics, antibiotics, anti-emetics, antihistamines, adrenaline, cardiac medication, eye/ear drops, antimalarials.
Supplies: bandages, splints, dressings, sterile gauze, IV sets, catheters, syringes, suture sets, oxygen sets.
Instruments: sphygmomanometer, stethoscope, thermometer, oximeter, AED.

CHECKING AND REPLENISHMENT:

The expiry dates of the medicines are checked regularly. Items used are replaced as soon as possible. The medical chest is subject to periodic PSC and flag State inspection.`,
    keyPoints: [
      "According to MLC 2006, medical equipment is mandatory on every ship.",
      "Classified as Category A, B, C according to navigation area",
      "Drug expiration dates should be checked regularly",
      "Health fund is checked under PSC supervision",
    ],
  },
  "telemedical": {
    title: "Tele-Medical Consultation (TMAS)",
    introduction: "TMAS (Telemedical Maritime Assistance Service) is a system that provides 24-hour remote medical consultancy services to ships.",
    content: `THE TMAS SYSTEM:

TMAS is a service through which shore-based medical professionals provide remote diagnosis, treatment and evacuation decisions for sick or injured crew on board. The service is free and available 24/7.

COMMUNICATION CHANNELS:

Contact can be made by VHF, MF/HF radio, INMARSAT satellite telephone or email. Medical forms are transmitted in a standard format.

WHAT TO REPORT:

The patient's age, sex and rank
Complaints and symptoms
Vital signs (pulse, blood pressure, temperature, respiratory rate)
The first aid given
Current medication and allergies
The ship's position and distance to the nearest port

TMAS DECISIONS:

1. Treatment can continue on board
2. A change of route to put into port is recommended
3. Evacuation by helicopter (MEDEVAC) is required
4. Medical support is obtained from another ship at sea

THE MEDEVAC DECISION:

The decision to evacuate is taken on the recommendation of the TMAS doctor and with the master's approval. For a helicopter evacuation the ship's position, the weather and the helicopter's range are assessed. Coordination with the coastguard is arranged.`,
    keyPoints: [
      "TMAS offers 24-hour free medical consultation",
      "Medical reports are transmitted in standard format",
      "MEDEVAC decision is made with the coordination of TMAS and the Master",
      "Communication: Can be established via VHF, INMARSAT or email",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - SAR
  // =====================================================
  "sar-system": {
    title: "SAR System and IAMSAR Manual",
    introduction: "SAR (Search and Rescue) is an internationally coordinated operation for the search and rescue of persons in distress at sea.",
    content: `THE LEGAL FRAMEWORK:

The SAR Convention (1979): provides for the organisation of search and rescue services at sea. The world's seas are divided into SAR regions and each coastal State is responsible for SAR coordination in its own region.

SOLAS V/33.1: sets out ships' obligations towards persons in distress at sea. Every master is obliged to respond to a distress call.

THE IAMSAR MANUAL:

IAMSAR (the International Aeronautical and Maritime Search and Rescue Manual) is in three volumes:
Volume I: Organization and Management (for States)
Volume II: Mission Co-ordination (for RCCs/MRCCs)
Volume III: Mobile Facilities (for ships and aircraft). It must be carried on every merchant ship.

SAR ORGANISATION:

MRCC (Maritime Rescue Coordination Centre): the coastal State's SAR coordination centre.
SMC (SAR Mission Coordinator): the overall coordinator of the operation (at the MRCC).
OSC (On-Scene Coordinator): the coordinator at the scene (usually the master of the first ship to arrive).
SRU (Search and Rescue Unit): a search and rescue unit.`,
    keyPoints: [
      "IAMSAR Volume III is mandatory on every commercial ship",
      "MRCC is the coastal state's SAR coordination center",
      "All ships are obliged to respond to distress calls",
      "OSC is usually the Master of the first ship to arrive on scene",
    ],
  },
  "sar-patterns": {
    title: "Search Patterns",
    introduction: "Search patterns used in SAR operations are selected based on the possible location of the missing person or object, the width of the search area, and the available tools.",
    image: "/diagrams/seamanship/arama-desenleri.svg",
    content: `SEARCH PATTERNS:

EXPANDING SQUARE SEARCH (SS): used when searching with a single unit. Effective where the position of the casualty is known relatively accurately. The search starts at a datum point and spirals outwards in progressively larger squares.

SECTOR SEARCH (VS): used where the position of the casualty is well known and the search area is small. The search runs outwards from a datum point on different headings.

PARALLEL TRACK SEARCH (PS): used to search a large area with several units. The units run on parallel tracks. It is the most widely used pattern for large areas.

CREEPING LINE AHEAD (CS): a search of a long, narrow area with a single unit, along the direction of the current or wind. The parallel legs are run at right angles to the direction of the current.

TRACK LINE SEARCH: a search along the known route of the missing ship. The track is swept on outward and return legs.

SWEEP WIDTH:

The sweep width is set by the weather, visibility, wave height and the size of the object being sought. Sweep width tables are given in IAMSAR Volume III.`,
    keyPoints: [
      "Expanding Square: single vehicle, precise location estimate",
      "Parallel Track: large area, multi-vehicle",
      "Sector Search: small area, precise location",
      "Sweep width varies depending on weather conditions and target size",
    ],
  },
  "on-scene-coordinator": {
    title: "Crime Scene Coordinator (OSC)",
    introduction: "The OSC (On-Scene Coordinator) is the Master of the ship who is the first to arrive at the SAR scene or is appointed by the MRCC and coordinates all vehicles on scene.",
    content: `THE OSC'S DUTIES:

1. Defining the search area and allocating the units
2. Choosing and applying the search pattern
3. Coordinating the rescue of persons found
4. Passing situation reports to the SMC
5. Setting up the communications plan
6. Care and transfer of the survivors

APPOINTING THE OSC:

The master of the first ship to arrive on scene usually acts as OSC. The MRCC may hand the OSC role over when a more suitable ship arrives. A naval or coastguard vessel is appointed OSC in preference.

OSC REPORTING:

The OSC reports the progress of the search to the MRCC at regular intervals. The SITREP (Situation Report) format is used. The report covers: the search area, the number of persons found, the weather, the fuel situation and the status of the other units.

TERMINATING THE SEARCH:

The decision to terminate the search is taken by the MRCC. The OSC does not terminate the search without the MRCC's approval. All units terminate the search at the same time.`,
    keyPoints: [
      "OSC coordinates all vehicles on scene",
      "OSC is usually the Master of the first ship to arrive",
      "Regular reporting is made in SITREP format",
      "Search termination decision is made by MRCC",
    ],
  },
  "person-overboard": {
    title: "Overboard and MOB Procedure",
    introduction: "Falling overboard (Man Overboard – MOB) is one of the situations requiring the most urgent intervention on a ship.",
    content: `IMMEDIATE ACTIONS:

1. Shout "Man overboard!"
2. Throw a lifebuoy (with MOB light and smoke signal)
3. Inform the bridge
4. Press the MOB button (it records the GPS position)
5. Post a lookout – do not lose sight of the person in the water

MANOEUVRES:

WILLIAMSON TURN: the most commonly used MOB manoeuvre. The helm is put hard over to one side and, when the ship has turned 60°, hard over to the other side. The ship turns onto the exact reciprocal of the original course and returns along the same track. Effective in restricted visibility.

ANDERSON TURN: the helm is put hard over to one side and the ship turns through 270°. It gives the fastest return. Preferred in good visibility.

SCHARNOW TURN: the helm is put over to one side and, when the ship has turned 240° from the original course, over to the other side. It gives the most accurate approach to the position on large ships.

RECOVERY:

Approach the person from downwind. Put the engine to neutral (the risk of propeller injury). Launch the rescue boat, or pass a line or ladder. Lift a hypothermic casualty out horizontally.`,
    keyPoints: [
      "Save GPS position by immediately pressing the MOB button",
      "Williamson Turn: the most effective maneuver in limited visibility",
      "Anderson Turn: quick turnaround in good visibility",
      "The person is approached from downwind and the propeller is put in stop position.",
    ],
  },
  "helicopter-ops": {
    title: "Helicopter Operations",
    introduction: "Helicopter operations are carried out for medical evacuation (MEDEVAC) and transfer of persons at sea within the scope of SAR.",
    content: `PREPARATION:

1. The deck is prepared for the helicopter operation: loose gear is secured and aerials are lowered.
2. Fire fighting equipment is kept ready.
3. The wind direction and speed are established.
4. The ship steers so as to take the wind on the port bow/quarter as instructed.
5. The communication channel is agreed (usually VHF Ch. 16 or a SAR channel).

THE HI-LINE PROCEDURE:

The guide line (hi-line) sent down from the helicopter is lowered to the deck. It is taken in hand on board – IT IS NEVER MADE FAST TO THE SHIP (allow the static charge to discharge). The winch hook is guided down along the line. The person is lifted into the helicopter by the winch.

DOUBLE LIFT:

A rescue crew member is lowered from the helicopter, secures the casualty in a stretcher and is lifted with them.

SAFETY RULES:

The minimum approach distance to the helicopter rotors is 5 metres.
The helicopter pilot's instructions are followed.
The landing area must be a clear space of at least 5 x 5 metres.
For night operations the landing area is lit but the pilot must not be dazzled.
The hi-line is never made fast to the ship or led through a winch.`,
    keyPoints: [
      "Hi-line does not connect to ship – risk of static electricity",
      "Sailing is done with the wind off the bow shoulder.",
      "A minimum distance of 5 m must be maintained from helicopter blades",
      "The pilot should not be dazzled during night operations",
    ],
    warnings: [
      "The hi-line must never be made fast to a winch or a bitt",
      "The line is first touched to the water or the deck to discharge the static charge",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - GMDSS
  // =====================================================
  "gmdss-overview": {
    title: "GMDSS General Structure and Marine Areas",
    introduction: "GMDSS (Global Maritime Distress and Safety System) is the system that secures maritime distress and safety communications on a global scale.",
    content: `THE DEVELOPMENT OF GMDSS:

GMDSS came fully into force on 1 February 1999. It is mandatory under SOLAS Chapter IV. It replaced the earlier Morse and radiotelephone based system. The basic principle is to guarantee that a distress alert reaches shore stations and nearby ships automatically.

SEA AREAS:

Area A1: within the coverage of at least one VHF coast station with DSC. Typically 20-30 nautical miles from the coast.

Area A2: outside VHF coverage but within the coverage of at least one MF coast station with DSC. Typically 100-150 nautical miles from the coast.

Area A3: outside A1 and A2 but within the coverage of an INMARSAT geostationary satellite. Approximately all seas between latitudes 70°N and 70°S.

Area A4: outside A1, A2 and A3. The polar regions. HF radio is mandatory.

MANDATORY EQUIPMENT:

All SOLAS ships: VHF (DSC, Ch.16, Ch.70), NAVTEX, EPIRB (406 MHz), SART or AIS-SART, two-way VHF radios (at least 3, waterproof).

A1 additionally: VHF DSC is sufficient.
A1+A2 additionally: MF DSC (2187.5 kHz).
A1+A2+A3 additionally: INMARSAT-C or HF DSC.
A4 additionally: MF/HF DSC is mandatory.`,
    keyPoints: [
      "GMDSS came into full force on 1 February 1999",
      "A1: VHF (20-30 nm), A2: MF (100-150 nm), A3: INMARSAT, A4: HF (polar)",
      "EPIRB, SART, NAVTEX are mandatory on all SOLAS ships",
      "GMDSS guarantees automatic distress call transmission",
    ],
  },
  "epirb-sart": {
    title: "EPIRB, SART and AIS-SART",
    introduction: "EPIRB and SART are critical GMDSS components that provide location notification and search marking in the event of distress at sea.",
    content: `EPIRB (Emergency Position Indicating Radio Beacon):

Operates on 406 MHz. It transmits a distress signal through the COSPAS-SARSAT satellite system. It is activated manually or automatically (by HRU). Position information is provided by an internal GPS (accuracy ~100 m). Battery life: a minimum of 48 hours of continuous transmission.

Registration: every EPIRB must be registered with the national maritime authority. The registration details: ship's name, call sign, MMSI and emergency contact details.

EPIRB with HRU: when the ship sinks to a depth of 2-4 m the HRU releases the EPIRB automatically. The EPIRB floats to the surface and activates automatically.

SART (Search and Rescue Transponder):

It responds to a 9 GHz (X-band) radar signal. It appears on the rescue vessel's radar as 12 evenly spaced dots (which become arcs as the vessel closes). Battery: 96 hours on standby plus 8 hours transmitting.

AIS-SART:

It transmits position information over the AIS system. It appears with a special symbol on ECDIS and AIS displays. It is accepted as an alternative to the traditional SART. It is advantageous on ships fitted with S-band radar.

MAINTENANCE:

EPIRB: annual maintenance, battery replacement (as recommended by the maker, usually every 5 years), HRU replacement (every 2 years).
SART: monthly test (in test mode), annual maintenance.`,
    keyPoints: [
      "EPIRB sends signals to COSPAS-SARSAT satellites at 406 MHz",
      "SART appears as 12 dots on radar",
      "EPIRB HRU is automatically activated at a depth of 2-4 m",
      "EPIRB battery life minimum 48 hours, SART 96 hours standby",
    ],
  },
  "dsc-vhf": {
    title: "DSC and VHF Communication",
    introduction: "DSC (Digital Selective Calling) is an automatic digital calling system as the core component of GMDSS.",
    content: `THE DSC SYSTEM:

DSC is used to call a particular station or all stations digitally. There are distress, urgency, safety and routine call categories.

VHF DSC: sends an automatic distress alert on Channel 70. The MMSI, position, nature of distress and time are included in the alert. When an alert is received an audible and visual alarm is given.

THE DISTRESS ALERT PROCEDURE:

1. Lift the cover of the DSC distress button
2. Select the nature of the distress (fire, sinking, abandoning ship, etc.)
3. Hold the button down for 5 seconds
4. The DSC alert is transmitted automatically on Ch.70
5. The alert repeats automatically every 4 minutes
6. When it is acknowledged, switch to VHF Ch.16 and pass the spoken MAYDAY message

THE MAYDAY MESSAGE FORMAT:

"MAYDAY MAYDAY MAYDAY, this is [ship's name] [ship's name] [ship's name], MAYDAY [ship's name], MMSI [number], my position is [latitude/longitude], I am [nature of distress], I require [assistance required], [number of crew] persons on board, over."

VHF CHANNELS:

Ch.16 (156.800 MHz): the international distress, urgency and safety channel
Ch.70: the DSC calling channel
Ch.13: bridge-to-bridge manoeuvring communications
Ch.06: ship-to-ship communications`,
    keyPoints: [
      "VHF Ch.70: DSC digital call channel, Ch.16: voice distress channel",
      "DSC distress call includes MMSI, position and distress type",
      "Call automatically repeats every 4 minutes",
      "MAYDAY message is given in standard format",
    ],
  },
  "inmarsat": {
    title: "INMARSAT and Satellite Systems",
    introduction: "INMARSAT is a global satellite system that provides maritime satellite communications services and is the A3 area component of GMDSS.",
    content: `THE INMARSAT SYSTEM:

Four geostationary satellites provide continuous coverage between 70°N and 70°S. It offers voice, data, fax and distress alerting services.

INMARSAT-C:

Text-based communication (store and forward). Two-way messaging and distress alerting. SafetyNET information is received through EGC (Enhanced Group Call). It is sufficient for GMDSS Area A3. Compact and low cost.

INMARSAT Fleet Broadband:

High-speed data, voice and video communication. Combined with a GMDSS function. It provides broadband internet access.

SafetyNET:

It broadcasts MSI (Maritime Safety Information) over INMARSAT-C. Meteorological warnings, NAVAREA navigational warnings, SAR information and piracy warnings are transmitted. It is mandatory in areas outside NAVTEX coverage.

OTHER SATELLITE SYSTEMS:

COSPAS-SARSAT: the distress satellite system that receives EPIRB signals. Global coverage using LEO (low earth orbit) and MEO satellites.
Iridium: global coverage including the poles with 66 LEO satellites. Approved as part of the modernisation of GMDSS.`,
    keyPoints: [
      "INMARSAT provides coverage between 70°N – 70°S",
      "INMARSAT-C text based, GMDSS A3 sufficient",
      "Get MSI (marine safety information) with SafetyNET",
      "Iridium provides global coverage including the poles",
    ],
  },
  "navtex": {
    title: "NAVTEX and Safety Information",
    introduction: "NAVTEX (Navigational Telex) is the GMDSS component that automatically receives navigation and meteorological alerts from shore stations.",
    content: `THE NAVTEX SYSTEM:

It broadcasts on 518 kHz (international, in English) and 490 kHz (national language). It receives and prints automatically. Coverage: approximately 300-400 nautical miles from the coast (the limit of Area A2).

MESSAGE FORMAT:

Every NAVTEX message is identified by a 4-character header:
1st character: the transmitting station identity (A-Z)
2nd character: the message category
3rd-4th characters: the message serial number (01-99)

MESSAGE CATEGORIES:

A – Navigational warnings
B – Meteorological warnings
C – Ice reports
D – SAR information
E – Meteorological forecasts
F – Pilot service messages
G-Z – Other

RECEIVER SETTINGS:

The user can select which stations and which categories to receive. But categories A (navigational warnings), B (meteorological warnings), D (SAR) and L (additional navigational warnings) cannot be switched off – they are always received.

WWNWS (World Wide Navigational Warning Service):

The world is divided into 21 NAVAREAs. Each NAVAREA coordinator issues the navigational warnings for its region. NAVTEX is the coastal means of distributing these warnings.`,
    keyPoints: [
      "NAVTEX operates at frequencies 518 kHz (English) and 490 kHz (national language)",
      "Categories A, B, D and L cannot be turned off – always taken",
      "Coverage approximately 300-400 nautical miles",
      "Navigation warnings are issued in 21 NAVAREA regions",
    ],
  },
  "distress-comm": {
    title: "Danger, Urgency and Safety Communication",
    introduction: "Three priority levels are defined in maritime communications: distress, urgency and safety.",
    content: `DISTRESS – MAYDAY:

The highest priority. A ship or person is in grave and imminent danger and requires immediate assistance.
Procedure: a DSC distress alert on Ch.70 plus a MAYDAY message on VHF Ch.16.
All stations are obliged to listen out for and respond to a MAYDAY call.

Types of distress: sinking, fire, abandoning ship, grounding, collision, drifting, piracy attack.

URGENCY – PAN PAN:

The second priority. The safety of a ship or person is at risk but immediate danger has not yet arisen.
"PAN PAN PAN PAN PAN PAN, all stations, this is [ship's name]..."
Examples: machinery breakdown (the risk of drifting), a person overboard, the need for urgent medical assistance.

SAFETY – SECURITE:

The third priority. The transmission of navigational or meteorological safety information.
"SECURITE SECURITE SECURITE, all stations..."
Examples: an ice warning, a drifting container, a light out of order, a storm warning.

MAYDAY RELAY:

If the ship in distress cannot transmit for herself, another ship transmits a MAYDAY Relay on her behalf:
"MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY, this is [relaying ship's name], following received from [ship in distress]..."

FALSE DISTRESS ALERTS:

A distress alert sent by mistake must be cancelled at once. On VHF Ch.16: "All stations, this is [ship's name], cancel my distress alert of [date/time], MMSI [number]."`,
    keyPoints: [
      "MAYDAY: serious and imminent danger, highest priority",
      "PAN PAN: safety is in danger but there is no immediate danger",
      "SECURITE: navigation/meteorology security information",
      "False distress call must be canceled immediately",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - ISM & ISPS
  // =====================================================
  "ism-code": {
    title: "ISM Code Structure and Requirements",
    introduction: "ISM Code (International Safety Management Code) creates a systematic management framework for the safe operation of ships and the prevention of marine pollution.",
    content: `THE PURPOSE OF THE ISM CODE:

Mandatory under SOLAS Chapter IX. It structures the company's management system so as to ensure safe ship operation and prevent marine pollution.

THE STRUCTURE OF THE ISM CODE (16 sections):

1. General: purpose, application, definitions.
2. Safety and environmental protection policy.
3. Company responsibilities and authority.
4. Designated Person Ashore (DPA): the person ashore who provides the safety link between the ship and the management.
5. Master's responsibility and authority.
6. Resources and personnel: training, competence, drills.
7. Development of plans for shipboard operations.
8. Emergency preparedness.
9. Reports and analysis of non-conformities, accidents and hazardous occurrences.
10. Maintenance of the ship and equipment.
11. Documentation.
12. Company verification, review and evaluation.

CERTIFICATES:

DOC (Document of Compliance): certifies that the company has established an SMS (Safety Management System) complying with the ISM Code. Valid for 5 years, with annual verification.
SMC (Safety Management Certificate): certifies that the ship is operated in accordance with the SMS. Valid for 5 years, with an intermediate verification.`,
    keyPoints: [
      "Mandatory with ISM Code SOLAS IX",
      "DPA: security link between company and ship",
      "DOC is given to the company, SMC is given to the ship",
      "Non-conformity reporting and analysis is mandatory (Chapter 9)",
    ],
  },
  "sms-system": {
    title: "SMS (Safety Management System)",
    introduction: "SMS is the safety management system required by the ISM Code and is a documented management framework covering all of the company's maritime operations.",
    content: `COMPONENTS OF THE SMS:

Safety and environmental policy: states the company's safety commitment.
Procedures and instructions: operational procedures, emergency plans, maintenance procedures.
Risk assessment: analysing the risk before an operation.
Internal audit: evaluating the effectiveness of the SMS at regular intervals.
Management review: senior management's evaluation of SMS performance.

IMPLEMENTATION ON BOARD:

Master's review: the master evaluates the effectiveness of the SMS at regular intervals and reports to the company.
Shipboard drills: drills are carried out in accordance with the SMS procedures.
Near-miss reporting: reporting near misses is a sign of a healthy safety culture.
Non-conformity follow-up: non-conformities found are closed out with corrective action.

DOCUMENT MANAGEMENT:

SMS documents are classified as controlled and uncontrolled. The documents on board must be kept up to date. Superseded versions must be removed. Electronic SMS systems are becoming widespread.`,
    keyPoints: [
      "SMS covers all operational procedures and emergency plans",
      "Near miss reporting is a key indicator of security culture",
      "Master's Review: Master's evaluation of SMS effectiveness",
      "Corrective action is mandatory when non-conformity is detected",
    ],
  },
  "isps-code": {
    title: "ISPS Code and Security Levels",
    introduction: "ISPS Code (International Ship and Port Facility Security Code) is an international security framework created after September 11, 2001 to ensure the security of ships and port facilities.",
    content: `THE STRUCTURE OF THE ISPS CODE:

Mandatory under SOLAS Chapter XI-2. It entered into force on 1 July 2004. It consists of two parts: Part A (mandatory) and Part B (recommendatory).

SECURITY LEVELS:

Security Level 1 (normal): normal operational security measures. The ship and the port facility apply their day-to-day security procedures.

Security Level 2 (heightened): applied where the security threat has increased. Additional security measures are taken: increased access control, extra patrols, strengthened protection of restricted areas.

Security Level 3 (exceptional): a probable or imminent security incident. Maximum security measures. Action is taken under the direction of the government authorities.

MANDATORY DOCUMENTS:

SSP (Ship Security Plan): defines the procedures to be applied at every security level.
SSA (Ship Security Assessment): the analysis of risks and vulnerabilities.
ISSC (International Ship Security Certificate): certifies the ship's compliance with the ISPS Code.

APPOINTED PERSONS:

SSO (Ship Security Officer): usually the chief officer.
CSO (Company Security Officer).
PFSO (Port Facility Security Officer).`,
    keyPoints: [
      "Three security levels: Level 1 (normal), Level 2 (increased), Level 3 (extraordinary)",
      "SSP (Ship Security Plan) covers all levels",
      "SSO is usually undertaken by the chief Master",
      "The ISPS Code came into force on 1 July 2004",
    ],
  },
  "sso-cso": {
    title: "SSO, CSO and PFSO Duties",
    introduction: "Within the scope of the ISPS Code, security responsibility is distributed to individuals appointed at the ship, company and port facility level.",
    content: `SSO (Ship Security Officer):

The duties of the ship security officer:
1. Implementing and maintaining the SSP (Ship Security Plan)
2. Keeping the ship security assessment up to date
3. Arranging security training and drills
4. Reporting security incidents
5. Supervising access control
6. Regular communication with the CSO
7. Implementing changes of security level

CSO (Company Security Officer):

The duties of the company security officer:
1. Having the SSAs carried out and updated
2. Preparing the SSPs and having them approved
3. Appointing and training the SSOs
4. Conducting internal audits
5. Notifying the ships of changes of security level
6. Security liaison with the flag State and the port State

PFSO (Port Facility Security Officer):

The duties of the port facility security officer:
1. Implementing the port facility security plan (PFSP)
2. Coordinating security at the ship/port interface
3. Completing the Declaration of Security (DoS)
4. Arranging security drills

THE DECLARATION OF SECURITY (DoS):

A written declaration recording the division of security responsibilities between the ship and the port facility. It is completed where the security levels differ or for high-risk operations.`,
    keyPoints: [
      "SSO implements SSP onboard, CSO coordinates company-wide",
      "DoS documents ship-to-port security responsibilities",
      "Security level change is notified to ships by CSO",
      "SSO, CSO and PFSO must receive training in accordance with the ISPS Code",
    ],
  },
  "security-assessment": {
    title: "Ship Security Assessment (SSA)",
    introduction: "SSA (Ship Security Assessment) forms the basis of the security plan with the systematic analysis of the ship's security weaknesses and possible threats.",
    content: `THE SSA PROCESS:

1. PRELIMINARY ASSESSMENT: identifying the existing security measures, the ship's physical structure and its operational profile.

2. THREAT ANALYSIS: the security threats possible for the ship's trading area and cargo type: piracy/armed robbery, terrorism, stowaways, smuggling, sabotage, cyber attack.

3. VULNERABILITY ANALYSIS: access points, the condition of the security equipment, surveillance systems, lighting, communications capability, the level of crew training.

4. RISK ASSESSMENT: probability of the threat × its impact = the level of risk. Priority areas are identified with a risk matrix.

5. COUNTERMEASURES: appropriate security measures are proposed for each risk and included in the SSP.

OUTPUTS OF THE SSA:

The results of the SSA are used directly in creating and updating the SSP (Ship Security Plan). The SSA is a confidential document and is not shown to unauthorised persons. The SSA is updated regularly (particularly when the ship's trade or trading area changes).`,
    keyPoints: [
      "SSA: threat analysis + vulnerability analysis + risk assessment",
      "SSA is a confidential document, it will not be shown to unauthorized persons",
      "SSA is updated when navigation area or trade changes",
      "SSA results form the basis of SSP",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - HAYATTA KALMA TEKNİKLERİ
  // =====================================================
  "water-entry": {
    title: "Water Entry Techniques",
    introduction: "Safe entry into the water when abandoning the ship requires applying correct technique to reduce the risk of injury and drowning in the first moments.",
    content: `METHODS OF ENTERING THE WATER:

1. EMBARKATION LADDER/RAMP: the safest method. Boarding a lifeboat or liferaft directly. Watch for wet hands and slippery surfaces.

2. JUMPING (a last resort): from no more than 5 metres. The lifejacket must be firmly secured. Cover the mouth and nose with one hand. Hold the lifejacket down with the other hand. Keep the feet together. Jump upright. Jump from the lee side. Jump at least 3 metres clear of the ship (suction effect).

3. CLIMBING DOWN: a controlled descent by rope or ladder. Gloves improve the grip.

CLEARING THE SHIP:

Once in the water you must get clear of the ship at once because of:
- The suction effect (as she sinks)
- The risk of explosion (fuel tanks)
- The risk of falling debris
Get at least 200 metres clear.

SWIMMING IN A LIFEJACKET:

The lifejacket is put on and secured before entering the water. In the water, adopt a face-up position in the lifejacket. Do not swim unnecessarily, to conserve energy. The HELP position (legs drawn up to the chest, arms wrapped around the body) slows heat loss.`,
    keyPoints: [
      "As a last resort, jumping is done from leeward, from a maximum of 5 meters.",
      "Must stay at least 200 meters away from the ship",
      "The life jacket must be put on and tied tightly before entering the water.",
      "HEAT position reduces heat loss by 50%",
    ],
  },
  "flotation-aids": {
    title: "Swimming and Buoyancy Techniques",
    introduction: "Buoyancy techniques can save lives if stranded in water without a life jacket or with a damaged life jacket.",
    content: `THE DROWNPROOFING TECHNIQUE:

An energy-saving floating technique used where there is no lifejacket or it is damaged:
1. Take a deep breath and put your face in the water
2. Relax the arms and legs (the starfish position)
3. When you run out of air, lift your head and breathe
4. Repeat

This technique makes it possible to stay in the water for hours because it minimises energy expenditure.

TREADING WATER:

Staying upright in the water. The legs make a cycling movement and the hands describe small horizontal circles. It uses more energy but keeps the head clear of the water.

GROUP TECHNIQUES:

HUDDLE: huddling together as a group. Used with at least 3 people. Children and weak swimmers are placed in the centre. It reduces heat loss considerably.

USING CLOTHING FOR BUOYANCY:

Trousers: knot the legs, fill them with air and use them around the neck as a temporary flotation aid.
Shirt: fasten the buttons and fill it with air.`,
    keyPoints: [
      "Drownproofing: an energy-saving technique to stay in water for hours",
      "HUDDLE: group warm-up, weaker swimmers are placed in the center",
      "Clothing can be used as temporary flotation devices",
      "Unnecessary swimming causes energy and heat loss",
    ],
  },
  "raft-survival": {
    title: "Raft Survival",
    introduction: "Following an organized survival plan after boarding the life raft increases the chances of survival until rescue.",
    content: `FIRST ACTIONS:

1. CHECK FOR INJURIES: give first aid to the injured.
2. WATER MANAGEMENT: draw up a water distribution plan. Do not drink water in the first 24 hours (the body's reserves are sufficient).
3. CHECK THE RAFT: check the buoyancy chambers, keep the raft floor dry, stream the sea anchor and close the canopy.
4. LOOKOUT: keep a continuous lookout. Use pyrotechnics only when a rescue unit is sighted.
5. LEADERSHIP: appoint a leader, allocate duties, keep morale up.

WATER RATIONING:

Minimum daily water requirement: 0.5 litres (for survival). Normal requirement: 2-3 litres. A rainwater collection system is set up. Sea water must not be drunk – it accelerates dehydration. A desalination kit is used if one is carried.

FOOD MANAGEMENT:

Emergency rations are shared out equally. If water is short, protein (fish) must not be eaten – digesting protein increases water consumption. Carbohydrates are preferred.

PROTECTION:

Protection from sunstroke: keep the canopy closed, cool down with a wet cloth.
Protection from the cold: TPA (Thermal Protective Aid), remove wet clothing, group warming.
Salt water sores: wash wounds that have been in contact with sea water with fresh water.`,
    keyPoints: [
      "Do not drink water for the first 24 hours, then at least 0.5 liters per day.",
      "Never drink sea water – it accelerates dehydration",
      "Fish cannot be eaten if water is limited – protein digestion consumes water",
      "Leadership and delegation keep morale high",
    ],
  },
  "signaling-rescue": {
    title: "Signaling and Rescue",
    introduction: "To be rescued at sea, effective signaling techniques and preparation for the rescue operation are vital.",
    content: `MEANS OF SIGNALLING:

1. SART/AIS-SART: an automatic response to a radar signal. The most effective electronic means of signalling.
2. EPIRB: position notification by satellite. When activated, the SAR coordination centre is informed.
3. Rocket parachute flare: visible by day and night at long range (40+ km).
4. Hand flare: shows the rescue unit your position at short range.
5. Smoke signal: orange smoke, for daylight use.
6. Heliograph (mirror): signals to an aircraft/ship by reflecting sunlight.
7. Whistle: an audible signal at short range.
8. Torch: at night, the SOS signal (... --- ...).

PREPARING FOR RESCUE:

As the helicopter approaches: do not use pyrotechnics – the rotor downwash can capsize the raft. Follow the hi-line instructions. Be lifted by the winch in turn. The injured first.

As a ship approaches: the raft is brought to the lee side. Board by ladder or scrambling net. Those who cannot climb unaided are helped.

AFTER RESCUE:

Hypothermic casualties are moved carefully (the risk of rescue collapse). Fluids and food are given slowly. A medical assessment is made.`,
    keyPoints: [
      "SART and EPIRB are the most effective electronic signaling tools",
      "Heliograph is very effective in signaling aircraft on sunny days",
      "Pyrotechnics are not used when the helicopter approaches",
      "Attention should be paid to the risk of rescue collapse after rescue",
    ],
  },
  "food-water-survival": {
    title: "Food and Water Management",
    introduction: "The most critical determinant of survival at sea is water management. The human body can survive 3-5 days without water and 3-4 weeks without food.",
    content: `WATER MANAGEMENT:

The first 24 hours: no water is issued (the body's reserves are sufficient and there is a risk of nausea and vomiting).
Days 2-4: 0.5 litres a day (the survival ration).
Day 4 onwards: may be increased as circumstances allow (if rainwater is collected).

Rules for conserving water:
- Reduce unnecessary talking
- Limit physical activity
- Stay in the shade in the middle of the day
- Do not drink sea water (it accelerates kidney failure)
- Do not drink urine (the concentration of toxic waste products increases)

COLLECTING RAINWATER:

The raft canopy has a rainwater collection system. Wait a few minutes before collecting the first rain so that the salt layer is washed off. The water collected is stored in containers and plastic bags.

FOOD MANAGEMENT:

Emergency rations are shared out equally. Carbohydrate-rich foods are preferred (they do not increase water consumption). Raw fish can be eaten, but if water is short, digesting protein increases water consumption.

DESALINATING SEA WATER:

Solar still: producing fresh water by evaporation and condensation using solar energy. Desalination kit: removing salt by a chemical or mechanical method.`,
    keyPoints: [
      "No water is given for the first 24 hours, then a minimum of 0.5 liters per day.",
      "Sea water and urine are strictly not drinkable.",
      "The first rain in rainwater is skipped for salt washing",
      "If water is limited, protein (fish) consumption is limited",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - KAPALI ALAN
  // =====================================================
  "enclosed-space-risks": {
    title: "Confined Space Risks and Hazardous Atmosphere",
    introduction: "Enclosed space accidents are one of the most common causes of death in the maritime industry. Lack of oxygen, toxic gas or explosive atmosphere poses a danger to life.",
    content: `DEFINITION OF AN ENCLOSED SPACE:

A closed compartment with limited means of entry and exit, not designed for continuous occupancy, in which a hazardous atmosphere may develop. Examples: ballast tanks, fuel tanks, cargo tanks, cofferdams, void spaces, the chain locker and the paint store.

HAZARDOUS ATMOSPHERES:

Oxygen deficiency: normal is 20.9% O₂. Hazardous: <19.5%. Fatal: <16%. Rusting, decomposition of organic matter and inert gas consume oxygen.

Oxygen enrichment: >23.5% O₂. The risk of combustible materials igniting increases.

Toxic gases:
- H₂S (hydrogen sulphide): produced by decomposition. >10 ppm hazardous, >100 ppm fatal. At high concentrations its smell cannot be detected (olfactory paralysis).
- CO (carbon monoxide): a product of incomplete combustion. >35 ppm hazardous.
- CO₂ (carbon dioxide): fermentation, inert gas residues. >0.5% hazardous.
- SO₂ (sulphur dioxide): a combustion product of sulphur-bearing fuel.

Explosive atmosphere: a flammable gas concentration between the LEL (Lower Explosive Limit) and the UEL (Upper Explosive Limit).

STATISTICS:

According to IMO data, most deaths in enclosed space accidents occur during rescue attempts. An untrained and unequipped attempt to rescue the first casualty produces a second and a third.`,
    keyPoints: [
      "O₂ < 19.5% is dangerous, < 16% is fatal",
      "H₂S in high concentrations destroys the perception of smell",
      "Most confined space deaths occur in untrained rescue attempts",
      "Ballast tanks, fuel tanks, cofferdams are examples of closed spaces",
    ],
    warnings: [
      "NEVER attempt a rescue untrained and without equipment",
      "Never enter an enclosed space without testing the atmosphere",
    ],
  },
  "entry-permit": {
    title: "Entry Permit System",
    introduction: "Entry into the confined space is controlled by a systematic permit procedure. Entry Permit is mandatory in accordance with the ISM Code and company SMS procedures.",
    content: `THE ENTRY PERMIT PROCEDURE:

1. A risk assessment is made (who is entering, why and when).
2. The space is ventilated (at least 24 hours, or long enough).
3. The atmosphere is tested: O₂, LEL, H₂S and CO measurements.
4. If the test results are "safe", an entry permit is issued.
5. The permit is authorised by a responsible person (the master or chief officer).
6. The persons entering and the standby person are named.
7. A means of communication (VHF or hard-wired) is provided.
8. Rescue equipment (SCBA, harness, tripod) is made ready.

CONTENTS OF THE ENTRY PERMIT:

The name and location of the space
The purpose of entry and the estimated duration
The atmosphere test results (O₂, LEL, H₂S, CO)
The ventilation status
The names of those entering
The name of the standby person
The status of the rescue equipment
The authorisation and time stamp

CANCELLATION:

The space is evacuated immediately if there is any suspicion of a change in the atmosphere, an interruption of ventilation, an emergency alarm, or if the permit expires.`,
    keyPoints: [
      "Entry into a closed area without atmospheric testing is strictly prohibited.",
      "A standby person must be present at the compartment entrance at all times.",
      "Entry Permit requires Master/chief officer approval",
      "In case of ventilation interruption, the compartment is abandoned immediately",
    ],
  },
  "atmosphere-testing": {
    title: "Atmosphere Testing and Measurement Devices",
    introduction: "It is mandatory to perform an atmospheric test before entering a closed area. Correct measuring device use and calibration is critical.",
    content: `PARAMETERS MEASURED:

1. Oxygen (O₂): safe range: 20.9% (±1%). Minimum safe: 19.5%.
2. Flammable gas (LEL): safe: <1% LEL. Warning: >10% LEL.
3. Hydrogen sulphide (H₂S): safe: <5 ppm. TWA: 10 ppm. STEL: 15 ppm.
4. Carbon monoxide (CO): safe: <25 ppm. TWA: 35 ppm.

MEASURING INSTRUMENTS:

Multi-gas detector (4 gas): measures O₂, LEL, H₂S and CO at the same time. The most commonly used instrument. Personal portable and pump-operated remote sampling types are available.

Pump type: an atmosphere sample is drawn through a long hose without entering the space. It is required for pre-entry testing.

Personal detector: an instrument carried by the person entering, measuring continuously and alarming.

CALIBRATION:

Instruments must be calibrated regularly as recommended by the maker (usually every 6 months or before use). They are verified with calibration gases. Calibration records are kept.

TEST PROCEDURE:

1. Stop the ventilation (to measure the true atmosphere).
2. Take readings at the top, middle and bottom of the space with the pump instrument (H₂S collects high up, heavy gases at the bottom).
3. Record the results on the entry permit.
4. Monitor continuously with a personal detector while inside.`,
    keyPoints: [
      "Testing should be done from the upper, middle and lower levels of the chamber",
      "The actual atmosphere should be measured with ventilation stopped",
      "Multi-gas detector requires regular calibration",
      "Continuous monitoring should be done with a personal detector during entry.",
    ],
  },
  "rescue-from-enclosed": {
    title: "Confined Space Rescue Procedure",
    introduction: "In case of loss of consciousness or accident in a confined space, the rescue operation should be carried out in accordance with the procedures planned in advance and reinforced by drill.",
    content: `RESCUE PRINCIPLES:

1. RAISE THE ALARM: the standby person raises the alarm at once and informs the bridge.
2. DO NOT GO IN YOURSELF: NEVER attempt a rescue untrained and without SCBA. The risk of becoming the second casualty is very high.
3. A TRAINED TEAM: the rescue team is equipped with SCBA.
4. HARNESS AND LINE: a harness is fitted to the casualty and they are lifted out with a tripod or davit.

RESCUE EQUIPMENT:

SCBA (Self-Contained Breathing Apparatus): a 30-minute breathing set.
EEBD (Emergency Escape Breathing Device): a 10-15 minute escape device. It is inadequate for rescue; it is only for escape.
Tripod and winch: for lifting a person out of a space with vertical access (a tank manhole).
Stretcher: for carrying a casualty.
Communications: a continuous communication link.

DRILLS:

Under SOLAS an enclosed space rescue drill must be held at least once every 2 months. The drill is run with a realistic scenario. Use of SCBA, fitting a harness and use of a tripod are practised.

IN PSC INSPECTIONS:

The enclosed space entry procedure, the condition of the equipment and the drill records are checked in PSC inspections. Shortcomings can be detainable deficiencies.`,
    keyPoints: [
      "NO rescue attempt should be made without SCBA – risk of second victim",
      "Confined space rescue drill should be done at least every 2 months",
      "EEBD is for escape only, SCBA is used for rescue",
      "Tripod and harness are mandatory in vertical access bays",
    ],
    warnings: [
      "An untrained rescue attempt is the most frequent cause of death",
      "An EEBD is NEVER adequate for a rescue operation",
    ],
  },

  // =====================================================
  // BÖLÜM 2/3 EKİ - YANGIN VE LSA EKİPMANLARI
  // =====================================================
  "eebd": {
    title: "EEBD – Emergency Escape Breathing Device",
    introduction: "EEBD (Emergency Escape Breathing Device) is a portable device that provides short-term breathing air, used for ESCAPE to a SAFE area from a place filled with smoke or toxic gas. NOT used for firefighting or rescue.",
    content: `WHAT IS AN EEBD?

An EEBD provides breathing air while a person escapes from a hazardous atmosphere (smoke, hot gases, oxygen deficiency). It normally consists of an air/oxygen supply and a hood covering the whole head, or a face mask. The hood protects the eyes and face from smoke.

THE LEGAL BASIS:

SOLAS Chapter II-2, Regulation 13 (means of escape) and FSS Code Chapter 3 set out the EEBD requirements. EEBDs must provide at least 10 minutes of use.

CARRIAGE REQUIREMENTS:

- EEBDs are carried in the accommodation for emergency escape.
- At least two EEBDs are carried in machinery spaces, close to the normal working stations and on the escape routes.
- The location of every EEBD is marked on the fire control plan.
- A separate training unit is carried; the actual devices are not used in drills so that their service life is not consumed.

PRINCIPLES OF USE:

1. Don the hood and start the air flow.
2. Keeping low, make for a safe area by the shortest escape route.
3. The duration is limited (≈10-15 min); do not waste time.
4. Remove the device once you reach a safe area.

THE DIFFERENCE BETWEEN AN EEBD AND SCBA:

An EEBD is for ESCAPE only; it is NOT USED to ENTER an enclosed or oxygen-deficient space, to fight fire or for a rescue operation. SCBA (self-contained breathing apparatus) is required for those tasks. The duration and protection of an EEBD are inadequate for them.

MAINTENANCE AND CHECKS:

The EEBD pressure gauge (where fitted) is checked regularly, the seal is inspected and the expiry/service date is monitored. If the seal is broken or the pressure is low the device is marked "out of service" and replaced.`,
    keyPoints: [
      "EEBD is for ESCAPE only – not for firefighting/rescue use",
      "Provides breathing air for at least 10 minutes (FSS Code Part 3)",
      "There are at least 2 in machinery spaces and on escape routes.",
      "A separate training unit is used for training; real device is not consumed in drill",
    ],
    warnings: [
      "NEVER enter an oxygen-deficient or enclosed space with an EEBD – that is a job for SCBA",
      "An EEBD with a broken seal or low pressure must be replaced immediately",
    ],
  },
  "scba": {
    title: "SCBA – Self-contained Breathing Apparatus",
    introduction: "SCBA (Self-Contained Breathing Apparatus) is a fully protected breathing apparatus used for fire extinguishing and entry into closed/dangerous areas, where the user breathes compressed air independently of the ambient air.",
    content: `SCBA COMPONENTS:

- A high-pressure air cylinder (usually 6-9 litres at 200-300 bar).
- A pressure-reducing regulator and a demand valve.
- A full face mask.
- A carrying system (harness and back plate).
- A pressure gauge and a low-pressure warning whistle.

CAPACITY AND DURATION:

Under FSS Code Chapter 3 an SCBA must have a capacity of at least 1200 litres of free air or 30 minutes of use. The actual duration varies with the workload, breathing rate and the individual; under heavy exertion it is significantly shorter.

PART OF THE FIREMAN'S OUTFIT:

SCBA is a mandatory part of the fireman's outfit. Sufficient spare charges/cylinders are carried for each outfit (at least 2 spare charged cylinders on board, or a charging compressor).

PRINCIPLES OF USE:

1. Check the cylinder pressure and the mask seal before entry.
2. Know the pressure at which the low-pressure whistle sounds (the time left to return).
3. The buddy system (working in pairs) is mandatory; the team is monitored from outside.
4. Plan to turn back before the air is half used (the air used going in = the air needed to come out).
5. Recharge the cylinder after use and clean/disinfect the mask and regulator.

MAINTENANCE:

Cylinders are subject to periodic hydrostatic testing (usually every 5 years). The mask, regulator and whistle are checked before and after every use. Records are kept.`,
    keyPoints: [
      "SCBA must have a capacity of at least 1200 L air / 30 min (FSS Code Part 3)",
      "It is an essential part of firefighter equipment; spare refill is kept",
      "Buddy system and low pressure whistle are the basis of safety",
      "Tubes are subject to periodic hydrostatic testing",
    ],
    warnings: [
      "Start back before the air is half used – you need as much air to come out as to go in",
      "Never enter a hazardous atmosphere without carrying out a mask seal check",
    ],
  },
  "firemans-outfit": {
    title: "Fireman's Outfit",
    introduction: "Firefighter equipment is a mandatory set consisting of personal protective clothing and a breathing apparatus that protects firefighting personnel from heat, flame and smoke (SOLAS II-2 / FSS Code Part 3).",
    content: `COMPONENTS OF THE OUTFIT:

A) Personal equipment:
- Protective clothing resistant to heat and smoke (it limits heat conduction from the surface and has a waterproof outer layer).
- Boots and gloves (electrically insulating, heat resistant).
- A helmet protecting the head, neck and sides.
- An electric safety lamp with a burning period of at least 3 hours.
- A fireman's axe with an electrically insulated handle.

B) Breathing apparatus:
- SCBA (self-contained compressed air breathing apparatus).

C) Lifeline:
- Fire resistant, at least 30 m long, capable of being attached to the outfit by a hook; used for communication with the team and for withdrawal.

NUMBERS TO BE CARRIED:

SOLAS II-2 Regulation 10.10 sets the minimum number of outfits by ship type and size. Cargo ships generally carry at least 2 fireman's outfits; on passenger ships the number increases with the spaces and length. Additional outfits may be required on tankers.

STOWAGE AND ACCESS:

The outfits are stowed apart from each other in readily accessible, marked positions; they are distributed so that if one becomes inaccessible in a fire the other can still be used. Their positions are shown on the fire control plan.

MAINTENANCE AND CHECKS:

The integrity of the clothing, gloves, boots and helmet; the charge and duration of the lamp; and the SCBA cylinder pressure and mask condition are checked regularly and recorded.`,
    keyPoints: [
      "Set = protective clothing + boots/gloves + helmet + safety lamp (≥3 hours) + ax + SCBA + lifeline",
      "SOLAS II-2/10.10 specifies the minimum number; on cargo ship usually ≥2",
      "Equipment is stored in marked locations, far apart from each other",
      "Lifeline is fireproof and used for crew retrieval",
    ],
  },
  "fire-fighting-equipment": {
    title: "Fire Circuit, Hydrant, Hose and Nozzles",
    introduction: "Fixed fire water circuit (fire main) on the ship; It consists of pumps, main pipeline, hydrants, hoses and nozzles and the international shore connection and provides the basis for water fire intervention (SOLAS II-2 Rule 10).",
    content: `FIRE PUMPS:

- Main fire pumps: the number and capacity are set by ship type; they provide the required flow and hydrant pressure.
- Emergency fire pump: located outside the machinery space, in a separate compartment with an independent power source, so that water can be supplied even if the machinery space is out of action.

THE FIRE MAIN:

The pressurised water line running along the decks, supplied by the pumps. Isolating valves allow a damaged section to be cut out while the main keeps working.

HYDRANTS:

Hydrants are sited so that at least two jets of water can reach any part of the ship (one from a single length of hose). The required minimum pressure must be available at every hydrant.

HOSES AND NOZZLES:

- Fire hoses are kept ready for connection beside every hydrant. Their lengths are standardised for the space.
- Nozzles are dual-purpose: jet and spray/fog. The standard nozzle sizes are about 12 mm, 16 mm and 19 mm. They have a shut-off facility.

THE INTERNATIONAL SHORE CONNECTION:

A standard-dimension connecting flange that allows water to be supplied to the ship's fire main from ashore or from another ship. At least one is carried on every ship. The standard dimensions (outside diameter 178 mm, bolt circle diameter 132 mm, etc.) are the same worldwide, so that port/fire brigade equipment can be connected to the ship.

CHECKS AND MAINTENANCE:

The pumps, isolating valves, hydrant valves, hose gaskets and nozzles are checked weekly/monthly. Leaks, cracks or corrosion are reported as defects.`,
    keyPoints: [
      "Emergency fire pump has independent power source outside the engine room",
      "At least two water jets must reach each point (SOLAS II-2/10)",
      "Nozzles are dual-purpose (jet + spray) and shut-off feature",
      "International shore connection is standard gauge; at least 1 on board",
    ],
  },
  "structural-fire-protection": {
    title: "Structural Fire Protection (Class A/B/C Partitions)",
    introduction: "Structural fire protection is based on the principle of classifying and insulating the ship's bulkheads and decks in a way that delays the spread of fire (SOLAS II-2). The aim is to limit the fire at its source and protect escape routes.",
    content: `DIVISION CLASSES:

CLASS A divisions:
- Constructed of steel or equivalent material, suitably stiffened.
- They prevent the passage of smoke and flame for 60 minutes of the standard fire test (integrity).
- They are subdivided by level of insulation: A-60, A-30, A-15, A-0. The number is the number of MINUTES for which the division delays the average temperature on the unexposed side rising by 140°C (or by 180°C at any one point) from the start of the test. A-0 has no insulation requirement (integrity only).

CLASS B divisions:
- Constructed of non-combustible materials; they prevent the passage of flame for 30 minutes.
- Subdivided by insulation into B-15 and B-0.

CLASS C divisions:
- Constructed of non-combustible materials; there is no requirement for a period of heat or flame resistance.

MAIN VERTICAL ZONES:

The ship is divided into main vertical fire zones by Class A divisions (there are length and area limits on passenger ships). A fire in one zone therefore cannot spread easily to the adjacent zones.

FIRE DOORS AND DAMPERS:

- Fire doors: at openings in Class A/B divisions, of the self-closing type and capable of being closed remotely from the bridge.
- Fire dampers: in ventilation ducts where they pass through a fire boundary, to prevent fire spreading through the duct.

PROTECTING THE ESCAPE ROUTES:

Stairway enclosures and escape routes are protected by fire divisions to provide safe evacuation from smoke and flame.`,
    keyPoints: [
      "Class A: steel, 60 min integrity; A-60/A-30/A-15/A-0 according to heat transfer time",
      "Class B: 30 min, B-15/B-0; Class C: fireproof, no time requirement",
      "Main vertical zones are separated by class A partitions",
      "Fire doors self-close, dampers prevent duct expansion",
    ],
  },
  "fire-control-plan": {
    title: "Fire Control Plan",
    introduction: "The fire control plan is a diagram on permanent display for each deck showing the fire safety arrangement of the ship. Provides guidance to the crew and ground firefighters in an emergency (SOLAS II-2 Rule 15).",
    content: `WHAT THE PLAN SHOWS:

- Control stations.
- The fire sections separated by Class A and B divisions.
- Fire detection and alarm systems.
- Sprinkler and fixed extinguishing systems (CO₂, foam, etc.).
- Portable extinguishers, hydrants, hoses and the international shore connection.
- Escape routes, stairway enclosures and muster stations.
- Ventilation systems, fan controls and the positions of the fire dampers.
- The positions of the EEBDs, SCBA and fireman's outfits.

SYMBOLS:

The plan is drawn using the graphical symbols standardised by the IMO (IMO Resolution A.952(23)), so that firefighters of any nationality can read it.

A COPY FOR THE SHORE FIRE BRIGADE:

Under SOLAS II-2/15.2.4 a copy of the plan is kept outside the deckhouse in a prominently marked weathertight enclosure. A shore fire team can therefore reach the plan without boarding the ship.

KEEPING IT UP TO DATE:

The plan must be kept up to date as changes are made on board (equipment added or removed). An out-of-date or incorrect plan is a finding in an inspection and is misleading in an emergency.

USE:

During familiarisation, new crew members are shown the fire stations, escape routes and equipment positions on the plan.`,
    keyPoints: [
      "The fire control plan is on permanent display on each deck (SOLAS II-2/15)",
      "IMO A.952(23) standard symbols are used",
      "An external copy is kept in a weathertight box for land fire brigade (15.2.4)",
      "Must be kept up to date with changes; used in familiarization",
    ],
  },
  "immersion-suit-tpa": {
    title: "Diving Suit and Thermal Protector (TPA)",
    introduction: "Immersion suit and thermal protector (TPA) are personal heat protection tools that prolong survival by delaying hypothermia in cold water (LSA Code Part 2).",
    content: `IMMERSION SUIT:

A waterproof, thermally insulated one-piece suit covering the whole body (including hands and feet). It preserves body heat in cold water.

Performance requirements (LSA Code 2.3):
- It must be capable of being donned unassisted within 2 minutes.
- Once donned, it must be possible to jump into the water from a height of 5 metres without water entering.
- It must be possible to swim in it and to board a liferaft.
- Insulated type: in water of 0-2°C it must prevent the body core temperature falling by more than 2°C over 1 hour.
- An uninsulated (waterproof only) type may also require a suitable lifejacket; an insulated type may provide sufficient buoyancy on its own.

Carriage: SOLAS generally requires an immersion suit for every person on board, plus additional suits for watch/remote working stations.

THERMAL PROTECTIVE AID (TPA):

A bag or suit made of waterproof material with low thermal conductivity, covering the whole body except the head. In a liferaft or lifeboat it reduces the heat loss of a dry survivor by convection and evaporation.

Characteristics (LSA Code 2.5):
- It must be usable in air temperatures from -30°C to +20°C.
- A defined number are carried in the liferaft/lifeboat equipment list.
- It does not replace an immersion suit; a TPA is primarily for a survivor who is out of the water.

THE DIFFERENCE:

An immersion suit protects IN the water; a TPA reduces heat loss for a person who is out of the water (in a raft/boat).`,
    keyPoints: [
      "The diving suit must be able to be put on without assistance in 2 minutes (LSA Code 2.3)",
      "Insulated type: Internal temperature drop in 1 hour in 0-2°C water <2°C",
      "TPA is a waterproof cover; Reduces heat loss in dry raft survivors",
      "Does not replace TPA immersion suit",
    ],
    warnings: [
      "A TPA alone is not enough for a wet survivor; they must first be dried/the water drained",
    ],
  },
  "mes": {
    title: "Marine Evacuation System (MES)",
    introduction: "MES (Marine Evacuation System) is an evacuation system consisting of a slide or evacuation channel (chute) and platform/liferafts, which allows a large number of people to descend from the ship to liferafts quickly and safely (LSA Code Section 6). It is especially used in high freeboard passenger ships.",
    content: `WHAT IS AN MES?

On ships with a high freeboard it is difficult for people to get down directly into liferafts. An MES sets up a slide or an enclosed chute between the ship and the sea; people descend by this route to a platform, or directly into large-capacity liferafts.

TYPES:

- Slide system: people descend to the platform/raft down an inflatable slide.
- Chute system: a controlled descent inside a vertical, enclosed flexible chute; preferred where the freeboard is high.

PERFORMANCE:

LSA Code 6.2 requires the MES to evacuate the required number of persons within a set time, to work in a seaway, and sets inflation/deployment times. The system must be capable of being deployed quickly from the bridge/deck.

HOW IT IS USED:

1. Passengers are directed at the muster station.
2. The MES is deployed; the platform/rafts inflate and take up position.
3. People descend by slide/chute to the platform/raft.
4. Once full, the rafts cast off from the ship.

MAINTENANCE:

The MES is subject to periodic servicing and testing (annual checks, including a 5-yearly load test). Servicing is carried out by approved stations; records are kept.

THE ADVANTAGE:

It evacuates a large number of people in a short time without the need to launch lifeboats; it is critically important on large passenger ships.`,
    keyPoints: [
      "MES = slide/channel + platform/liferaft; on high freeboard passenger ships",
      "There are slide and chute types; chute is preferred on high board",
      "LSA Code Chapter 6 stipulates evacuation time and performance",
      "Subject to annual service and 5-year load test",
    ],
  },
  "line-throwing": {
    title: "Line-Throwing Appliance",
    introduction: "A rope throwing device is a rescue device that delivers a thin rope (rope) to a ship, person or shore in distress and then enables a thicker rope/tow connection to be established (LSA Code Chapter 7).",
    content: `PURPOSE:

It gets a first light line to the target, which is then used to haul across a heavier line or a towing/transfer line. It is used for ship-to-ship or ship-to-shore connection, towing and rescue operations.

REQUIREMENTS (LSA Code 7.1):

- Throwing range: it must be capable of throwing a line at least 230 metres with reasonable accuracy in calm weather.
- Equipment: at least 4 projectiles/rockets and 4 lines are carried.
- The lines must have adequate breaking strength and be protected from damp.
- It is stored in a watertight container; the instructions for use must be on the pack and legible.

TYPES:

- Rocket-type pyrotechnic appliances are common.
- Some types use a pistol-like launcher.

SAFETY:

- Because it contains pyrotechnics, only trained personnel may use it.
- There must be no person or flammable material in the line of fire.
- The expiry date is monitored; expired units are disposed of properly.

MAINTENANCE:

The integrity of the watertight packaging, the expiry date and the number carried are verified periodically (in the LSA inventory check).`,
    keyPoints: [
      "Must be able to rope at least 230 m in calm weather (LSA Code 7.1)",
      "At least 4 rockets/projectiles and 4 ropes are kept",
      "Thin rope is pulled first, then thick rope/pulling line",
      "Contains pyrotechnics; Used only by trained personnel",
    ],
    warnings: [
      "There must be no person or flammable material in the line of fire",
      "Expired units must be disposed of safely",
    ],
  },

  // =====================================================
  // BÖLÜM 11 - İŞ SAĞLIĞI VE GÜVENLİĞİ
  // =====================================================
  "ppe": {
    title: "Personal Protective Equipment (PPE)",
    introduction: "Personal protective equipment (PPE) is the last line of defense against workplace accidents. It protects the person when the danger cannot be eliminated at its source; but it is never a substitute for engineering/managerial measures.",
    content: `PPE CATEGORIES:

- Head protection: helmet – falling objects, impact.
- Foot protection: steel toe-capped safety shoes/boots – crushing, slipping, puncture.
- Hand protection: gloves – cuts, heat, chemicals, vibration (the type suited to the job).
- Eye/face protection: goggles, face shield – sparks, swarf, chemical splash.
- Hearing protection: ear plugs/defenders – in noise above 85 dBA (engine room).
- Respiratory protection: dust mask, half/full face mask, SCBA (according to the hazard).
- Body protection: overalls/working clothes, flame-retardant clothing, chemical suit.
- Work at height: full body harness and lanyard.
- Visibility: high-visibility vest (deck/port operations).
- Work over water: lifejacket / work vest.

ITS PLACE IN THE HIERARCHY OF CONTROL:

The order of risk control: 1) eliminate the hazard, 2) substitute, 3) engineering controls, 4) administrative controls, 5) PPE. PPE comes LAST; it is not regarded as sufficient on its own.

THE LEGAL/SYSTEM BASIS:

The safety management system (SMS) under the ISM Code and MLC 2006 require suitable PPE to be provided, together with training in its use. PPE is provided free of charge.

CORRECT USE:

- The type is chosen to suit the job and the hazard (e.g. a welding mask plus flame-retardant clothing for welding).
- Correct size/fit; damaged PPE is not used but replaced.
- Maintenance, cleaning and storage follow the instructions.
- Its use is reinforced through toolbox talks and familiarisation.`,
    keyPoints: [
      "PPE is the LAST measure in the control hierarchy; alone is not enough",
      "The type appropriate to the task is selected; Damaged PPE is not used",
      "ISM/SMS and MLC 2006 require appropriate PPE to be provided",
      "Hearing protection in >85 dBA environment, harness is mandatory when working at heights",
    ],
  },
  "permit-to-work": {
    title: "Work Permit System and Hot Work Permit",
    introduction: "The permit-to-work system is an official control mechanism that ensures that high-risk work is carried out only after the hazards are evaluated and taken under control, with written permission and the approval of those responsible.",
    content: `THE MAIN WORK REQUIRING A PERMIT:

- Hot work: welding, grinding, cutting – work producing sparks/flame.
- Enclosed space/tank entry.
- Working aloft and overside.
- Electrical work and energy isolation (Lock-Out/Tag-Out – LOTO).
- Work on refrigerant/chemical lines and on pressurised systems.

THE HOT WORK PERMIT:

- A permit is required for all hot work outside a designated workshop.
- On tankers and in spaces with a risk of a flammable atmosphere, gas measurement (gas-free/gas testing) is mandatory; a gas-free certificate is obtained.
- Flammable materials in the vicinity are removed, and a fire watch and an extinguisher are on hand.
- The area is checked on completion; a waiting period is applied for smouldering.

THE PERMIT PROCESS:

1. The person doing the work applies for a permit.
2. The hazards and controls (risk assessment) are identified.
3. A responsible person (usually the relevant officer with the master's approval) verifies the controls and issues the permit.
4. The permit is limited in time and scope; it is cancelled if the conditions change.
5. When the work is finished the permit is closed out and recorded.

ENERGY ISOLATION (LOTO):

Before maintenance the machinery/electrical supply is isolated, locked and tagged so that it cannot be started inadvertently. When the work is finished only the person who applied the isolation removes the lock.

THE SHIP/SHORE INTERFACE:

The permit system is operated in line with the ISM/SMS procedures and PSC inspections; the records are audited.`,
    keyPoints: [
      "Permit-to-work controls high-risk jobs with written permission and approval",
      "Permit + gas test (gas-free in tankers) is mandatory for hot work outside the workshop",
      "Fire watch and extinguisher ready; waiting for after-work secret ignition",
      "Energy isolation is done with LOTO; Only the one who uses the lock can open it.",
    ],
    warnings: [
      "Hot work or enclosed space entry without a permit is a serious cause of accidents and deaths",
      "If conditions change the permit must be cancelled immediately",
    ],
  },
  "risk-assessment": {
    title: "Risk Assessment and JSA",
    introduction: "Risk assessment is a systematic process to identify hazards in a job in advance, evaluate them according to their probability and severity, and take appropriate control measures. ISM Code requires risk assessment on ships.",
    content: `BASIC CONCEPTS:

- Hazard: a source or situation with the potential to cause harm (e.g. a rotating part, high pressure, a slippery deck).
- Risk: the combination of the likelihood of harm occurring and its severity (Risk = Likelihood × Severity).

RISK ASSESSMENT STEPS:

1. Identify the hazards.
2. Identify who or what may be harmed.
3. Evaluate the risk (likelihood × severity; a risk matrix is used).
4. Decide the control measures (the hierarchy of control).
5. Record the findings and implement them.
6. Review and update (when conditions change).

THE HIERARCHY OF CONTROL:

1) Eliminate the hazard → 2) Substitute → 3) Engineering controls (guarding, ventilation) → 4) Administrative controls (procedure, training, permit) → 5) PPE. The measures higher up the list are preferred.

JSA / JHA (Job Safety/Hazard Analysis):

A practical method that breaks a particular job into steps and examines the hazard and the control at each step. It is usually completed by the team concerned immediately before the work.

TOOLBOX TALK:

A short safety briefing held with the team before starting work; the results of the JSA, the permits and any special hazards are shared.

THE ISM LINK:

The ISM Code requires the company and the ship to assess the risks of their activities and take precautions. Risk assessment records are part of the SMS and are audited.`,
    keyPoints: [
      "Risk = Probability × Severity; evaluated with the risk matrix",
      "Control hierarchy: eliminate > substitute > engineering > managerial > PPE",
      "JSA breaks the work down into steps; toolbox talk gives briefing before work",
      "The ISM Code requires risk assessment; records are part of SMS",
    ],
  },
  "damage-control": {
    title: "Damage Control and Waterproof Integrity",
    introduction: "Damage control includes activities to maintain watertight integrity and limit the ingress of water to ensure that the ship remains unsinked or overturned after a collision, grounding or flooding (SOLAS Chapter II-1).",
    content: `WATERTIGHT INTEGRITY:

The ship is divided into compartments by watertight bulkheads. Even if one compartment floods the others stay dry and the ship stays afloat (reserve buoyancy).

- Collision bulkhead: the first watertight bulkhead forward; it limits the ingress of water in a head-on collision.
- Watertight doors: they can be closed remotely from the bridge; the position indicator is on the bridge. They must be kept closed at sea.

FLOTATION SAFETY CONCEPTS:

- Reserve buoyancy: the watertight volume above the waterline; it delays foundering when water is taken in.
- Subdivision and damage stability: the ship is designed to stay afloat with a defined number of compartments flooded.
- Cross-flooding: an arrangement for reducing the list when water is taken in on one side, by admitting water in a controlled way to the compartment on the other side.

THE DAMAGE CONTROL PLAN AND BOOKLET:

Under SOLAS II-1 Regulation 19 a damage control plan and booklet are carried on board. They show the watertight boundaries, the openings, the closing arrangements and the bilge/ballast arrangements.

RESPONSE ACTIONS:

1. Locate and limit the ingress of water (closing, shoring, a temporary plug/patch).
2. Close the watertight doors and openings.
3. Pump out and balance the water with the bilge and ballast pumps.
4. Monitor stability and trim; inform the competent authority/the company if necessary.

THE BILGE SYSTEM:

The bilge system drains water that collects in the compartments; the alarms and pumps are tested regularly.`,
    keyPoints: [
      "Watertight compartmentation + reserve buoyancy prevents sinking (SOLAS II-1)",
      "Crash bulkhead limits water entry in bow crash",
      "Watertight doors kept closed at sea, viewed from bridge",
      "Damage control plan/manual (SOLAS II-1/19) is kept on board",
    ],
    warnings: [
      "A watertight door left open leads to progressive flooding and rapid foundering",
    ],
  },
  "mooring-safety-snapback": {
    title: "Tethering Security and Snap-Back Zones",
    introduction: "Mooring operations are one of the jobs where serious injuries occur most frequently on a ship. Snap-back of the tensioned line and equipment under high tension can lead to fatal accidents. OCIMF MEG4 is the reference manual in this field.",
    content: `WHAT IS SNAP-BACK?

When a mooring line under tension parts, the stored elastic energy is released and the ends of the line whip back (snap-back). This whipping can be fatal. Synthetic ropes store a great deal of energy; wire ropes stretch less but are still dangerous when they part.

SNAP-BACK ZONES:

These are the dangerous areas into which a parted line could whip, determined by the geometry of the line (rollers/fairleads, the line of the capstan/winch). No one stands in these areas. Note: the modern approach (MEG4) treats the WHOLE deck as a potential danger area; the old painted "snap-back zone" markings can be misleading, so general awareness is what matters.

SAFETY PRINCIPLES:

- Never stand in the bight of a line under tension or in line with it.
- Keep hands and feet away from a line under load; watch for gloves being drawn in.
- The winch brake must be correctly set; it must be tested so that it renders at the designed slip point.
- The condition of the line and the tail is checked; worn/fatigued line is replaced.
- Appropriate PPE: helmet, safety shoes, gloves, high-visibility vest.

COMMUNICATION AND ORGANISATION:

- Clear communication (radio) between the forward/aft stations and the bridge.
- A toolbox talk before the operation: roles, danger areas, escape routes.
- Sufficient and rested personnel; the operation is never rushed.

EQUIPMENT:

Bitts, fairleads, rollers, winches, stoppers and rope tails are regularly checked and maintained; certified equipment is used.`,
    keyPoints: [
      "Snap-back: the fatal blow back of a broken taut rope",
      "In the MEG4 approach, the entire deck is considered a danger area – no standing in the bight",
      "Winch brake is adjusted correctly and tested regularly",
      "Clear communication, toolbox talk and appropriate PPE are essential",
    ],
    warnings: [
      "Standing in line with, or in the bight of, a line under tension is fatal",
      "Worn/fatigued line and an incorrectly set brake increase the risk of parting",
    ],
  },
};

export default function SafetyTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent && topicContents[subtopicId]) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  // Back tuşu açık bir yazıyı asla kapatmaz: konu anlatımı ekrandayken
  // geri tuşu yutulur, yazı ancak kendi kapatma düğmesiyle kapanır.
  useArticleBackGuard(Boolean(currentContent));

  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Security at Sea</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {safetyTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <span className="font-semibold text-foreground text-sm leading-tight">
                          {topic.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-1 mt-2">
                        {topic.subtopics.map((subtopic) => (
                          <motion.button
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic.id, subtopic.hasContent)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                              subtopic.hasContent && topicContents[subtopic.id]
                                ? "hover:bg-red-500/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            <span className="text-sm text-foreground">{subtopic.title}</span>
                            {subtopic.hasContent && topicContents[subtopic.id] && (
                              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Security Calculations", href: "/safety" },
                  { title: "Security Formulas", href: "/safety/formulas" },
                  { title: "All Lessons", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-red-500/40 hover:bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{resource.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="relative z-10 bg-background/95 border-b border-border">
              <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-foreground truncate pr-4">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                <div className="bg-red-500/10 rounded-xl p-4 border-l-4 border-red-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                {currentContent.image && (
                  <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border/40 bg-muted/20">
                    <img
                      src={currentContent.image}
                      alt={currentContent.title}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.formula && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentContent.formula.name}
                    </h3>
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-red-600 dark:text-red-400 mb-2">
                      {currentContent.formula.expression}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {currentContent.examples && currentContent.examples.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-foreground mb-2">Numerical Example</h3>
                    {currentContent.examples.map((example, index) => (
                      <div key={index} className="text-sm text-foreground">
                        <p className="font-medium">Question: {example.problem}</p>
                        <p className="text-muted-foreground mt-1">Solution: {example.solution}</p>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-red-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      Key Information
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-600 dark:text-red-400 font-bold">{index + 1}.</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentContent.warnings && currentContent.warnings.length > 0 && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-destructive font-bold">!</span>
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
