import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  X,
  Leaf,
  Droplets,
  Wind,
  Trash2,
  Ship,
  Waves,
  Shield,
  Gauge,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface EnvironmentSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface EnvironmentMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: EnvironmentSubTopic[];
}

const environmentTopics: EnvironmentMainTopic[] = [
  {
    id: "marpol-general",
    number: 1,
    title: "MARPOL Convention General",
    icon: Shield,
    subtopics: [
      { id: "marpol-history", title: "MARPOL history and development", hasContent: true },
      { id: "marpol-structure", title: "MARPOL structure and annexes", hasContent: true },
      { id: "marpol-certificates", title: "MARPOL certificates", hasContent: true },
      { id: "marpol-surveys", title: "Surveys and inspections", hasContent: true },
      { id: "port-reception", title: "Port waste reception facilities (Port Reception Facilities)", hasContent: true },
    ],
  },
  {
    id: "annex-i",
    number: 2,
    title: "Annex I – Oil Pollution",
    icon: Droplets,
    subtopics: [
      { id: "annex1-overview", title: "General structure and scope of Annex I", hasContent: true },
      { id: "oily-water-separator", title: "Oily water separator (OWS) and the 15 ppm rule", hasContent: true },
      { id: "oil-record-book", title: "Oil Record Book (ORB) Part I and II", hasContent: true },
      { id: "special-areas-annex1", title: "Special areas and discharge rules", hasContent: true },
      { id: "sopep", title: "SOPEP (Shipboard Oil Pollution Emergency Plan)", hasContent: true },
      { id: "crude-oil-washing", title: "Crude oil washing (COW) system", hasContent: true },
    ],
  },
  {
    id: "annex-ii",
    number: 3,
    title: "Annex II – Toxic Liquid Substances",
    icon: AlertTriangle,
    subtopics: [
      { id: "annex2-categories", title: "NLS categories (X, Y, Z, OS)", hasContent: true },
      { id: "annex2-discharge", title: "Discharge standards and prewash", hasContent: true },
      { id: "annex2-ppap", title: "P&A Manual and Cargo Record Book", hasContent: true },
    ],
  },
  {
    id: "annex-iii",
    number: 4,
    title: "Annex III – Packaged Harmful Substances",
    icon: Trash2,
    subtopics: [
      { id: "annex3-imdg", title: "IMDG Code and classification", hasContent: true },
      { id: "annex3-marking", title: "Labeling, marking and stowing", hasContent: true },
      { id: "annex3-documentation", title: "Dangerous goods declaration", hasContent: true },
    ],
  },
  {
    id: "annex-iv",
    number: 5,
    title: "Annex IV – Sewage",
    icon: Waves,
    subtopics: [
      { id: "annex4-overview", title: "Annex IV requirements and application", hasContent: true },
      { id: "sewage-treatment", title: "Waste water treatment plant and standards", hasContent: true },
      { id: "sewage-discharge", title: "Discharge rules and distance limits", hasContent: true },
    ],
  },
  {
    id: "annex-v",
    number: 6,
    title: "Annex V – Garbage Management",
    icon: Trash2,
    subtopics: [
      { id: "annex5-categories", title: "Garbage categories and discharge rules", hasContent: true },
      { id: "garbage-management", title: "Garbage management plan and logbook", hasContent: true },
      { id: "annex5-special-areas", title: "Special areas and Antarctic rules", hasContent: true },
    ],
  },
  {
    id: "annex-vi",
    number: 7,
    title: "Annex VI – Air Pollution",
    icon: Wind,
    subtopics: [
      { id: "sox-regulations", title: "SOx limits and fuel sulfur rates", hasContent: true },
      { id: "nox-tiers", title: "NOx Tier I, II, III standards", hasContent: true },
      { id: "eca-seca", title: "ECA/SECA regions and requirements", hasContent: true },
      { id: "ods-regulations", title: "Substances that deplete the ozone layer", hasContent: true },
      { id: "voc-regulations", title: "VOC (Volatile Organic Compounds) control", hasContent: true },
      { id: "scrubber-egcs", title: "Exhaust gas cleaning systems (Scrubber/EGCS)", hasContent: true },
      { id: "incinerator", title: "Shipboard incinerator and Annex VI", hasContent: true },
    ],
  },
  {
    id: "energy-efficiency",
    number: 8,
    title: "Energy Efficiency and Carbon",
    icon: Gauge,
    subtopics: [
      { id: "eedi-eexi", title: "EEDI and EEXI calculation and requirements", hasContent: true },
      { id: "cii-rating", title: "CII rating (A-E) and calculation", hasContent: true },
      { id: "seemp", title: "SEEMP (Ship Energy Efficiency Management Plan)", hasContent: true },
      { id: "eu-ets", title: "EU ETS and FuelEU Maritime", hasContent: true },
      { id: "alternative-fuels", title: "Alternative fuels (LNG, methanol, ammonia)", hasContent: true },
      { id: "imo-ghg-strategy", title: "IMO Greenhouse Gas (GHG) Strategy and net-zero targets", hasContent: true },
    ],
  },
  {
    id: "ballast-water",
    number: 9,
    title: "Ballast Water Management",
    icon: Ship,
    subtopics: [
      { id: "bwm-convention", title: "BWM Convention and its history", hasContent: true },
      { id: "ballast-exchange", title: "Ballast water exchange methods (D-1)", hasContent: true },
      { id: "ballast-treatment", title: "Ballast water treatment systems (D-2)", hasContent: true },
      { id: "ballast-management-plan", title: "Ballast water management plan and log book", hasContent: true },
    ],
  },
  {
    id: "anti-fouling",
    number: 10,
    title: "Biodiversity and Others",
    icon: Leaf,
    subtopics: [
      { id: "afs-convention", title: "AFS Convention (Anti-fouling systems)", hasContent: true },
      { id: "biofouling-management", title: "Biofouling management", hasContent: true },
      { id: "ship-recycling", title: "Hong Kong Convention (ship recycling)", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - MARPOL GENEL
  // =====================================================
  "marpol-history": {
    title: "MARPOL History and Development",
    introduction: "MARPOL 73/78 (International Convention for the Prevention of Pollution from Ships) is the most comprehensive international convention for the prevention of marine pollution from ships.",
    content: `HISTORICAL DEVELOPMENT:

1954 – The OILPOL Convention: the first international marine pollution convention. It regulated oil discharges only. It prohibited oil discharges in certain areas, but enforcement was weak.

1967 – The Torrey Canyon casualty: 119,000 tonnes of crude oil were spilled off the coast of England. This disaster demonstrated the need for far wider regulation.

1973 – The MARPOL Convention was adopted: adopted by the IMO in London, the convention covered not only oil but all marine pollutants. It could not enter into force, however, because it did not attract enough ratifications.

1978 – The MARPOL Protocol: the 1978 Protocol was adopted following the tanker casualties of 1976-77 (Argo Merchant, Amoco Cadiz). It absorbed the 1973 Convention; the combined text is known as MARPOL 73/78.

1983 – MARPOL 73/78 entered into force: Annexes I and II entered into force as mandatory annexes on 2 October 1983.

MARPOL today has 6 annexes, of which Annexes I and II are mandatory; Annexes III, IV, V and VI are subject to optional ratification. In practice, however, all the major maritime states have ratified all six annexes.`,
    bulletPoints: [
      "MARPOL 73/78: Combined text of the 1973 Convention + 1978 Protocol",
      "Annex I and Annex II are mandatory; other attachments are optional",
      "It entered into force on October 2, 1983",
      "Torrey Canyon (1967) and Amoco Cadiz (1978) accidents accelerated regulations",
    ],
    keyPoints: [
      "MARPOL covers ALL types of pollution from ships (not just oil)",
      "6 additions: Oil, NLS, Packaged harmful substances, Sewage, Garbage, Air pollution",
      "It is IMO's most important environmental protection tool",
    ],
  },
  "marpol-structure": {
    title: "MARPOL Structure and Annexes",
    introduction: "MARPOL 73/78 consists of the main contract text, two protocols and six technical annexes; each supplement regulates a different source of pollution.",
    content: `THE MAIN STRUCTURE:

The MARPOL convention has a three-layer structure:

1. The main convention text (Articles): sets out the general obligations, definitions and the principles of application and enforcement.

2. Protocols:
   Protocol I: Reporting of incidents involving harmful substances (the reporting obligation in Regulation 8.8).
   Protocol II: Arbitration (dispute resolution).

3. Technical Annexes:
   Annex I – Regulations for the prevention of pollution by oil (in force: 1983)
   Annex II – Control of pollution by noxious liquid substances in bulk (NLS) (in force: 1983)
   Annex III – Prevention of pollution by harmful substances carried by sea in packaged form (in force: 1992)
   Annex IV – Prevention of pollution by sewage from ships (in force: 2003)
   Annex V – Prevention of pollution by garbage from ships (in force: 1988)
   Annex VI – Prevention of air pollution from ships (in force: 2005)

THE AMENDMENT PROCEDURE:

MARPOL amendments enter into force by "tacit acceptance". The IMO adopts the amendment and, if one third of the member states do not object within a defined period, the amendment enters into force automatically. This method allows the convention to be updated quickly.`,
    bulletPoints: [
      "Annexes I and II are mandatory; Annexes III-VI are subject to voluntary approval",
      "Tacit acceptance: Changes take effect automatically if not objected.",
      "Protocol I: Incident reporting, Protocol II: Arbitration",
    ],
    keyPoints: [
      "6 annexes regulate different types of pollution separately",
      "Tacit acceptance procedure ensures rapid implementation of changes",
      "Each attachment has its own certificate, registry and custom field definition",
    ],
  },
  "marpol-certificates": {
    title: "MARPOL Certificates",
    introduction: "Each annex to the MARPOL convention requires separate certificates certifying the compliance of ships; These certificates are issued by the flag state or authorized organization.",
    content: `THE PRINCIPAL MARPOL CERTIFICATES:

1. IOPP Certificate (International Oil Pollution Prevention Certificate):
   Mandatory under Annex I for ships of 400 GT and above.
   Validity: 5 years (with annual/intermediate surveys).
   Scope: oily water separator, slop tank, monitoring system (ODME), SBT/CBT arrangements.

2. ISPP Certificate (International Sewage Pollution Prevention Certificate):
   Mandatory under Annex IV for ships of 400 GT and above, or carrying more than 15 persons.
   Scope: sewage treatment plant, disinfection system, holding tank.

3. IAPP Certificate (International Air Pollution Prevention Certificate):
   Mandatory under Annex VI for ships of 400 GT and above.
   Scope: engine emissions (NOx technical file), fuel sulphur content, ODS inventory.

4. IEE Certificate (International Energy Efficiency Certificate):
   Documents the EEDI/EEXI value and the SEEMP.
   Mandatory for all ships from 2023.

5. Fitness Certificate (Annex II):
   The mandatory certificate of fitness for ships carrying NLS.

6. BWM Certificate (International Ballast Water Management Certificate):
   Issued under the BWM Convention.

FOR EVERY CERTIFICATE:
Validity: 5 years
Surveys: initial, annual, intermediate, renewal and additional surveys
Issued by: the flag State administration or an authorised classification society`,
    bulletPoints: [
      "IOPP: Annex I (oil), ISPP: Annex IV (sewage), IAPP: Annex VI (air pollution)",
      "IEE certification mandatory from 2023",
      "All certificates valid for 5 years, require annual/intermediate survey",
    ],
    keyPoints: [
      "Ships of 400 GT and above must have IOPP, IAPP certificates",
      "PSC auditors check MARPOL certificates and logbooks together",
      "Lack of certificate: cause for detention",
    ],
  },
  "marpol-surveys": {
    title: "Surveys and Inspections",
    introduction: "MARPOL compliance is checked through regular surveys and port state inspections (PSC).",
    content: `TYPES OF SURVEY:

1. Initial Survey: carried out before the ship enters service or before a MARPOL certificate is issued for the first time. It verifies that all equipment, systems and documents comply with the MARPOL requirements.

2. Annual Survey: carried out every year during the life of the certificate. It checks that the equipment is in working order and that the records are properly kept.

3. Intermediate Survey: carried out in the 2nd or 3rd year of the 5-year certificate period. It is more comprehensive than the annual survey.

4. Renewal Survey: carried out before the 5-year certificate expires. It has the same scope as the initial survey.

5. Additional Survey: required after an incident, a failure or a repair.

PSC INSPECTIONS:

Port State Control inspectors check the ship's certificates, record books, equipment condition and crew knowledge. Regional agreements such as the Paris MoU and the Tokyo MoU set the inspection standards.

The MARPOL deficiencies most frequently found in PSC:
- OWS failure or suspicion of bypass
- Errors in the Oil Record Book entries
- A missing garbage management plan
- A mismatch between the IAPP certificate and the engine NOx technical file`,
    bulletPoints: [
      "5 survey types: initial, annual, interim, renewal, extraordinary",
      "PSC auditors check certificate + registry + hardware",
      "OWS failure and ORB errors are the most frequently detected deficiencies",
    ],
    keyPoints: [
      "Intermediate survey takes place in the 2nd or 3rd year and is more comprehensive than annual",
      "Risk of PSC detention: missing certificate, faulty hardware or incorrect registration",
      "High-risk ships are inspected more frequently in the Paris MoU area",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - EK I – PETROL KİRLİLİĞİ
  // =====================================================
  "annex1-overview": {
    title: "Annex I General Structure and Scope",
    introduction: "MARPOL Annex I contains rules for the prevention of oil pollution from ships and applies to all ships.",
    content: `THE SCOPE OF ANNEX I:

Annex I regulates the discharge of oil and oily mixtures from ships into the sea. It covers both engine room bilge water and cargo tank residues (for tankers).

THE MAIN REGULATIONS:

Regulation 15 – Engine room discharge (all ships):
Ships of 400 GT and above must be fitted with an oily water separator (OWS). The oil content of the water discharged must not exceed 15 ppm. The ODME (Oil Discharge Monitoring Equipment) must monitor continuously and stop the discharge automatically when 15 ppm is exceeded.

Regulation 34 – Discharge in special areas:
The Mediterranean, Baltic, Black Sea, Red Sea, Gulfs area, Antarctic, North West European waters and the Oman Sea area are defined as special areas. In special areas engine room bilge water may only be discharged through the OWS (below 15 ppm) and while the ship is under way. The discharge of cargo residues is prohibited in special areas.

Regulation 20 – Double hull tankers:
A double hull is mandatory for oil tankers of 5,000 DWT and above. Existing single hull tankers have been phased out.

SBT AND CBT:
SBT (Segregated Ballast Tanks): tanks dedicated to ballast water only. They never come into contact with cargo.
CBT (Clean Ballast Tanks): tanks cleaned after carrying cargo and then used for ballast water (no longer current).`,
    bulletPoints: [
      "15 ppm rule: oil content limit of water discharged on all ships",
      "Residual discharge is completely prohibited in private areas",
      "Double hull requirement for 5,000 DWT+ tankers",
    ],
    keyPoints: [
      "OWS + ODME system is mandatory on all 400 GT+ ships",
      "Rule 15: engine room, Rule 34: special areas, Rule 20: tanker structure",
      "SBT tanks do not come into contact with the load; for ballast only",
    ],
  },
  "oily-water-separator": {
    title: "Oily Water Separator (OWS) and the 15 ppm Rule",
    introduction: "The Oil Water Separator is a critical MARPOL equipment that separates the oil in the engine room bilge water and brings it to a level that can be discharged into the sea.",
    content: `PRINCIPLE OF OPERATION:

An OWS performs separation in three stages:

1. Gravity separation (1st stage): the difference in density brings large oil droplets to the surface, where they are drawn off to a separate tank. This stage reduces the oil content to about 100 ppm.

2. Coalescer/filter stage (2nd stage): special filter elements bring small oil droplets together (coalescing) to form larger droplets. This stage reduces the oil content below 15 ppm.

3. Monitoring and automatic control: the ODME (Oil Discharge Monitoring Equipment) or OCM (Oil Content Monitor) continuously measures the oil content of the discharged water. When 15 ppm is exceeded, a three-way valve automatically diverts the water to the recirculation line.

THE 15 PPM RULE:

Under MARPOL Annex I Regulation 15, the oil content of bilge water discharged into the sea must not exceed 15 ppm. This rule:
- Applies in all sea areas (there is no special area distinction)
- Requires the ship to be under way
- Requires the discharge to be made below the waterline

BYPASSING THE OWS:

Bypassing the OWS (the "magic pipe" and similar) attracts severe criminal sanctions. Bypass cases detected in US waters have resulted in fines of millions of dollars and prison sentences.`,
    bulletPoints: [
      "3 stages: gravity separation → coalescer filter → automatic tracking",
      "The 15 ppm limit applies to all sea areas",
      "Automatic reversal should be active when 15 ppm is exceeded",
    ],
    keyPoints: [
      "OWS bypass (magic pipe) is subject to heavy criminal sanctions",
      "OCM calibration should be done regularly; Controlled in PSC",
      "It is mandatory to run OWS when the bilge tank is full; Pumping directly into the sea is prohibited",
    ],
    warnings: [
      "An attempted OWS bypass brings fines of millions of dollars and imprisonment in the USA",
      "A ship whose OCM has not been calibrated can be detained in PSC",
    ],
  },
  "oil-record-book": {
    title: "Oil Record Book (ORB) Part I and II",
    introduction: "The Oil Record Book is the official document in which all oil operations on the ship are legally recorded and is the most examined record in PSC inspections.",
    content: `ORB PART I – MACHINERY SPACE OPERATIONS:

All ships of 400 GT and above must keep ORB Part I. The operations recorded are:

(A) Ballasting or cleaning of oil fuel tanks
(B) Discharge from oil fuel tanks or the engine room bilge well
(C) Disposal of oil residues in slop tanks
(D) Discharge of bilge water through the OWS
(E) Bunkering and oil fuel transfers
(F) Accidental discharge of oil
(G) Delivery to a reception facility in port

ORB PART II – CARGO AND BALLAST OPERATIONS (Tankers):

Oil tankers of 150 GT and above keep ORB Part II. The operations recorded are:

(A) Loading of cargo
(B) Internal transfer
(C) Discharge of cargo
(D) Tank cleaning (including COW)
(E) Ballasting/deballasting
(F) Slop tank operations
(G) Discharge of residues

RECORDING RULES:

Each entry is made against the operation code. The officer in charge signs and the master endorses every page. The ORB is retained on board for 3 years. Entries are made in English, French or Spanish (or in the flag State language plus an English translation).`,
    bulletPoints: [
      "Part I: 400 GT+ all ships, Part II: 150 GT+ oil tankers",
      "ORB is kept on board for 3 years",
      "Each entry requires signature of officer in charge + master approval",
    ],
    keyPoints: [
      "ORB is the most examined document in PSC inspections",
      "Registration errors, inconsistencies or missing entries are grounds for detention",
      "Code system: The type of operation is indicated by the letters A-G",
    ],
    warnings: [
      "If the quantities recorded in the ORB do not tally with the tank soundings, PSC moves to an expanded inspection",
    ],
  },
  "special-areas-annex1": {
    title: "Special Areas and Discharge Rules",
    introduction: "MARPOL defines ecologically sensitive marine areas as 'special areas' and imposes stricter discharge rules in these areas.",
    content: `ANNEX I SPECIAL AREAS:

The Mediterranean, the Baltic Sea, the Black Sea, the Red Sea, the Gulfs area (Persian Gulf), the Gulf of Aden, the Antarctic area, North-West European waters, the Oman Sea area and Southern African waters.

RULES IN SPECIAL AREAS:

Engine room discharge:
- Permitted through the OWS, below 15 ppm and while the ship is under way (the same as in normal areas)

Cargo residue discharge (tankers):
- Completely PROHIBITED in special areas
- Must be retained in the slop tank and delivered to a reception facility in port

PSSA (Particularly Sensitive Sea Areas):
Unlike special areas, PSSAs are areas designated by the IMO in which additional protective measures (routeing systems, speed limits, etc.) apply. Examples: the Great Barrier Reef, Galápagos, the Baltic, the Canary Islands.`,
    bulletPoints: [
      "Discharge of tanker cargo residue is completely prohibited in private areas",
      "Engine room 15 ppm rule is the same in private areas",
      "PSSA differs from private areas; Protected by additional measures by IMO",
    ],
    keyPoints: [
      "Mediterranean, Baltic, Black Sea: Annex I special areas",
      "Private area = stricter discharge rules; PSSA = additional protective measures",
      "Load surplus: in special areas → slop + receiving facility mandatory",
    ],
  },
  "sopep": {
    title: "SOPEP (Shipboard Oil Pollution Emergency Plan)",
    introduction: "SOPEP is a mandatory plan that includes emergency response procedures to be followed by the crew in the event of an oil leak or spill on board.",
    content: `THE SOPEP REQUIREMENT:

Under MARPOL Annex I Regulation 37, all ships of 400 GT and above must carry a SOPEP. For tankers it may also be combined with the SMPEP (Shipboard Marine Pollution Emergency Plan).

CONTENTS OF THE SOPEP:

1. Reporting procedure: the details of the report required by MARPOL Protocol I. To whom, when and how the report is to be made.

2. Contact list: contact details for the coastal State administration, the port authority, the P&I club, the company DPA (Designated Person Ashore) and the classification society.

3. Response procedures:
   - Spill on deck: use of absorbent material, closing the scuppers
   - Tank overflow: stopping the transfer, diverting to the slop tank
   - Pipeline failure: closing the isolating valve, emergency pump stop
   - Leakage after collision/grounding: damage assessment, tank transfer

4. Coordination: the procedure for coordinating with the coastal State SAR/pollution response centre.

SOPEP DRILLS:

IMO recommendation: at least one SOPEP drill should be held each year. The drill assesses the reporting chain, the use of the equipment and the response time.`,
    bulletPoints: [
      "SOPEP is mandatory on all ships of 400 GT+",
      "Covers reporting, notification list, response procedure and coordination",
      "At least one SOPEP drill per year is recommended",
    ],
    keyPoints: [
      "SOPEP must be approved by the flag state",
      "The notification list must be kept up to date; Controlled in PSC",
      "Can be combined with SMPEP for tankers",
    ],
  },
  "crude-oil-washing": {
    title: "Crude Oil Washing (COW) System",
    introduction: "COW (Crude Oil Washing) is a method that minimizes the amount of residue in crude oil tankers by washing the cargo tanks with the crude oil itself during unloading.",
    content: `THE PRINCIPLE OF COW:

In traditional water washing the wash water is collected in the slop tank and disposed of; this process generates a large quantity of oily water. With a COW system, part of the crude oil is sprayed into the tanks by the cargo pumps through high-pressure nozzles (tank cleaning machines) during discharge. The crude oil dissolves and washes away the waxy deposits clinging to the tank walls, so that the quantity of residue is reduced to a very low level.

ADVANTAGES OF COW:

1. The residue falls below 0.1% (0.3-1.0% with water washing)
2. More cargo is delivered → a commercial advantage
3. Less slop → a lower risk of discharge into the sea
4. Water consumption is reduced

COW REQUIREMENTS (MARPOL Annex I Regulation 33):

COW is mandatory on crude oil tankers of 20,000 DWT and above. The system is operated in accordance with a COW Manual approved by the flag State administration.

It must be operated together with an inert gas system (IGS); during COW the tank atmosphere must be kept below 8% O₂ with inert gas.

At least 2 tanks must be washed during COW, and the tanks washed at each port must be recorded in ORB Part II.`,
    formula: {
      name: "COW Pressure Requirement",
      expression: "Tank cleaning machine pressure: 8-10 bar (typical)",
      description: "Crude oil is sprayed onto the tank walls at high pressure, thus dissolving wax and sediment.",
    },
    bulletPoints: [
      "COW is mandatory on 20,000 DWT+ crude oil tankers",
      "It now drops below 0.1%; 0.3-1.0% in water washing",
      "It is mandatory to work with IGS (O₂ < 8%)",
    ],
    keyPoints: [
      "COW = tank washing with crude oil → residual is reduced to a minimum",
      "COW Manual must be approved by the flag state",
      "Every COW operation is recorded in ORB Part II",
    ],
    warnings: [
      "There is a risk of explosion if inert gas is not used during COW",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - EK II
  // =====================================================
  "annex2-categories": {
    title: "NLS Categories (X, Y, Z, OS)",
    introduction: "MARPOL Annex II classifies Noxious Liquid Substances (NLS) carried in bulk into four categories according to their degree of danger.",
    content: `CATEGORIES:

Category X – Major hazard: substances which, if discharged into the sea, present a major hazard to marine resources or human health. Discharge into the sea is completely PROHIBITED. Tank washing residues must be delivered to a reception facility. Examples: carbon tetrachloride, certain pesticides.

Category Y – Hazard: substances which, if discharged, present a hazard to marine resources or human health or cause harm to the marine environment. Discharge is permitted under limited conditions (prewash plus a reception facility are mandatory). Examples: phenol, cresol, certain solvents.

Category Z – Minor hazard: substances which, if discharged, present a minor hazard to marine resources or human health. Discharge is permitted under defined conditions. Examples: phosphate esters, certain acids.

OS (Other Substances): substances which do not fall into the above categories. Their discharge is unrestricted. Operations must nevertheless comply with the P&A Manual.

THE PREWASH REQUIREMENT:

A prewash is mandatory after carrying Category X and Y substances. The prewash water must be delivered to a reception facility. For Category Z a prewash is required only under certain conditions.`,
    bulletPoints: [
      "X: discharge prohibited, Y: prewash + receiving facility, Z: conditional discharge, OS: free",
      "Prewash is mandatory after Categories X and Y",
      "The category of each substance is listed in the IBC Code",
    ],
    keyPoints: [
      "As the NLS category increases (X→OS), the degree of danger decreases",
      "After prewashing, the water should be given to the receiving facility; Discharge into the sea is prohibited",
      "P&A Manual organizes all NLS operations",
    ],
  },
  "annex2-discharge": {
    title: "Discharge Standards and Prewash",
    introduction: "MARPOL Annex II regulates the tank washing and discharge operations of ships carrying NLS according to the hazard category of the substance.",
    content: `DISCHARGE CONDITIONS:

General rules (Regulation 13):
- The ship must be under way
- Speed at least 7 knots
- The discharge must be made below the waterline
- At least 12 nautical miles from the nearest land
- Water depth at least 25 metres

RULES BY CATEGORY:

Category X: completely prohibited. Prewash mandatory, prewash water to a reception facility.
Category Y: prewash mandatory. After the prewash the residual water may be discharged into the sea subject to the discharge conditions. Additional restrictions apply in special areas.
Category Z: a prewash is generally not required. It may be discharged subject to the discharge conditions.
OS: no restrictions.

THE PREWASH PROCEDURE:

1. Discharge is completed and stripping is carried out
2. During the prewash the tank is washed with a defined quantity of water
3. The wash water is transferred to the slop tank or directly to a reception facility
4. Once the prewash is complete the approval of a surveyor or port official is obtained
5. An entry is made in the Cargo Record Book`,
    bulletPoints: [
      "Discharge: 7 knots speed, 12 miles offshore, 25 m depth",
      "Category X: discharge completely prohibited; Y: prewash + conditional discharge",
      "Prewash operation is recorded in Cargo Record Book",
    ],
    keyPoints: [
      "Prewash ensures tank reaches acceptable residue level",
      "Surveyor approval confirms prewashing has been done correctly",
      "Cargo Record Book = ORB equivalent of Annex II",
    ],
  },
  "annex2-ppap": {
    title: "P&A Manual and Cargo Record Book",
    introduction: "The P&A Manual (Procedures and Arrangements Manual) is the mandatory document defining the operational procedures of chemical tankers carrying NLS.",
    content: `THE P&A MANUAL:

Under MARPOL Annex II Regulation 14, every ship carrying NLS must have a P&A Manual on board. The manual is approved by the flag State.

CONTENTS:
1. Tank washing procedures (for each tank)
2. Stripping system capacity and operation
3. Prewash requirements (by category)
4. Slop tank operation
5. Discharge connections and arrangements
6. Compatibility tables (which substances may be carried in the same tank)

THE CARGO RECORD BOOK:

All operations under Annex II are recorded in the Cargo Record Book. It is the NLS equivalent of ORB Part II.

The operations recorded:
- Loading and discharging of cargo
- Tank washing and prewash
- Ballast operations
- Slop transfer
- Discharge of residues
- Delivery to a reception facility

The Cargo Record Book is retained on board for 3 years. It is checked together with the P&A Manual during PSC inspections.`,
    bulletPoints: [
      "P&A Manual must be flag state approved",
      "Cargo Record Book records all NLS operations",
      "Both documents are kept on board for 3 years",
    ],
    keyPoints: [
      "P&A Manual includes separate washing procedure for each tank",
      "Cargo Record Book = ORB equivalent of Annex II",
      "PSC: P&A Manual + Cargo Record Book + tank condition are evaluated together",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - EK III
  // =====================================================
  "annex3-imdg": {
    title: "IMDG Code and Classification",
    introduction: "IMDG Code (International Maritime Dangerous Goods Code) is the international standard that regulates the safe transportation of packaged dangerous goods by sea.",
    content: `THE STRUCTURE OF THE IMDG CODE:

The IMDG Code is a mandatory code that supports MARPOL Annex III and is referenced in SOLAS Chapter VII. It is updated every 2 years.

CLASSES OF DANGEROUS GOODS:

Class 1 – Explosives (divisions 1.1-1.6)
Class 2 – Gases (2.1 flammable, 2.2 non-flammable, 2.3 toxic)
Class 3 – Flammable liquids (flash point ≤ 60°C closed cup)
Class 4 – Flammable solids (4.1 flammable solid, 4.2 spontaneously combustible, 4.3 dangerous when wet)
Class 5 – Oxidizers and organic peroxides (5.1, 5.2)
Class 6 – Toxic and infectious substances (6.1, 6.2)
Class 7 – Radioactive material
Class 8 – Corrosives
Class 9 – Miscellaneous dangerous substances

UN NUMBER AND PROPER SHIPPING NAME:

Every dangerous substance is identified by a four-digit UN number and a Proper Shipping Name (PSN). Example: UN 1203 – GASOLINE, Class 3.

For each UN number the IMDG Code gives the packing group (PG I: great danger, PG II: medium, PG III: minor), the stowage rules and the list of incompatible substances.`,
    bulletPoints: [
      "9 main classes: explosive, gas, flammable liquid/solid, oxidizing, toxic, radioactive, corrosive",
      "Each substance is identified by its UN number + PSN",
      "Packaging Group: PG I (most hazardous) → PG III (least hazardous)",
    ],
    keyPoints: [
      "IMDG Code is updated every 2 years; It is mandatory to have the current version on board",
      "Class 3 flammable liquids: flash point ≤ 60°C (closed cup test)",
      "Loading of incompatible substances in the same container/cargo hold is prohibited",
    ],
  },
  "annex3-marking": {
    title: "Labeling, Marking and Stacking",
    introduction: "Packaged dangerous goods must be identified with labels, signs and placards in accordance with the IMDG Code and stowage according to compliance rules.",
    content: `LABELLING:

On every package of dangerous goods:
1. The UN number (a 4-digit number prefixed by UN)
2. The Proper Shipping Name
3. The hazard label (diamond-shaped): colour and symbol according to class
   - Class 1: orange/exploding bomb symbol
   - Class 2.1: red/flame
   - Class 3: red/flame
   - Class 6.1: white/skull and crossbones
   - Class 8: black and white/liquid drops

4. The subsidiary hazard label (where applicable)

MARKING:
On the container: the placard and the UN number are displayed so as to be clearly visible.

STOWAGE & SEGREGATION:

The IMDG Code defines a four-level system for keeping incompatible substances apart:

1. "Away from": a different compartment/hold or at least 3 m horizontal separation
2. "Separated from": a different compartment, or at least one full compartment apart
3. "Separated by a complete compartment"
4. "Separated longitudinally by an intervening complete compartment"

The stowage rules on deck and under deck are different; Part 7 of the IMDG Code gives the details.`,
    bulletPoints: [
      "Package: UN number + PSN + hazard label is mandatory",
      "Container: placard + UN number must be visible",
      "4 levels of separation: away from → longitudinal compartment separation",
    ],
    keyPoints: [
      "Incompatible substances cannot be transported in the same container/cargo hold",
      "Segregation table is located in IMDG Code Section 7.2",
      "Hazard label is diamond (square rotated)",
    ],
  },
  "annex3-documentation": {
    title: "Dangerous Goods Declaration",
    introduction: "Ships carrying dangerous goods must have correct declaration and documentation in accordance with SOLAS and MARPOL.",
    content: `MANDATORY DOCUMENTS:

1. Dangerous Goods Declaration:
   Prepared by the shipper. It states the UN number, PSN, class, packing group, quantity and emergency response information.

2. Container/Vehicle Packing Certificate:
   The document by which the party packing the container certifies that the packing has been carried out in accordance with the IMDG Code.

3. Dangerous Goods Manifest or Stowage Plan:
   The list showing the location, quantity and class of all dangerous goods on board. It must be given to the shore authorities if the ship is abandoned.

4. EmS (Emergency Schedules):
   Contains the emergency response procedures for each class. Found in the IMDG Code Supplement.

5. MFAG (Medical First Aid Guide):
   First aid procedures following contact with dangerous goods. Found in the IMDG Code Supplement.

RESPONSIBILITIES:

Shipper: correct declaration, labelling and packing
Ship: stowage, segregation, document check, emergency response plan
Port: pre-loading approval (in some ports)`,
    bulletPoints: [
      "Dangerous Goods Declaration is prepared by the uploader",
      "Manifest or stowage plan must be available on board",
      "Includes EmS and MFAG emergency and first aid procedures",
    ],
    keyPoints: [
      "If documents are missing, the ship cannot load dangerous goods.",
      "Container Packing Certificate documents responsibility for loading",
      "Dangerous Goods Manifest given to coastal authority in case of abandonment",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - EK IV
  // =====================================================
  "annex4-overview": {
    title: "Annex IV Requirements and Application",
    introduction: "MARPOL Annex IV regulates the discharge of sewage from ships into the sea and applies to ships over 400 GT or carrying more than 15 personnel.",
    content: `SCOPE:

MARPOL Annex IV entered into force on 27 September 2003.

Application:
- Ships of 400 GT and above engaged on international voyages
- Ships of less than 400 GT carrying more than 15 persons

DEFINITION OF SEWAGE:

Sewage covers the following sources:
1. Drainage from toilets and urinals
2. Drainage from medical spaces (washbasins and drains)
3. Drainage from spaces containing live animals
4. Other waste waters mixed with the above

SYSTEMS REQUIRED ON BOARD:

- A sewage treatment plant (STP) and/or
- A comminuting and disinfecting system and/or
- A holding tank

At least one of the three options must be fitted. Modern ships usually prefer a combination of STP plus holding tank.`,
    bulletPoints: [
      "Mandatory on ships carrying 400 GT+ or 15+ people",
      "Sewage: includes toilet, medical department and animal drainage",
      "STP, disinfection system or holding tank required",
    ],
    keyPoints: [
      "Annex IV came into force in 2003",
      "ISPP certification compliance documents",
      "The Baltic Sea is an Annex IV special area; Additional rules apply for cruise ships",
    ],
  },
  "sewage-treatment": {
    title: "Waste Water Treatment Plant and Standards",
    introduction: "Sewage treatment plants (STP) on ships purify wastewater using biological, chemical or physical methods and bring it to a quality that can be discharged into the sea.",
    content: `TREATMENT METHODS:

1. Biological treatment: aerobic bacteria break down the organic matter. This is the most common method. Activated sludge or a membrane bioreactor (MBR) is used.

2. Chemical treatment: pathogenic micro-organisms are destroyed by chlorine or UV disinfection.

3. Electrochemical treatment: breakdown and disinfection by electrolysis. Used in some modern systems.

IMO STANDARDS (MEPC.227(64)):

Quality standards for the treated effluent:
- BOD₅ (Biochemical Oxygen Demand): ≤ 25 mg/L
- COD (Chemical Oxygen Demand): ≤ 125 mg/L
- TSS (Total Suspended Solids): ≤ 35 mg/L
- Coliform bacteria: ≤ 100 CFU/100 mL
- pH: 6-8.5

These standards apply to ships built on or after 1 January 2010 and to passenger ships operating in the Baltic special area.`,
    formula: {
      name: "STP Quality Standards",
      expression: "BOD₅ ≤ 25 mg/L | TSS ≤ 35 mg/L | Koliform ≤ 100 CFU/100mL",
      description: "MEPC.227(64) standard. Mandatory for ships built after 2010 and Baltic cruise ships.",
    },
    bulletPoints: [
      "Biological treatment (activated sludge/MBR) is the most common method",
      "MEPC.227(64): modern STP quality standard",
      "BOD₅ ≤ 25, TSS ≤ 35, coliform ≤ 100 limits",
    ],
    keyPoints: [
      "STP performance should be tested regularly; Controlled in PSC",
      "MBR systems provide higher purification quality",
      "STP failure → holding tank should be used → transfer to receiving facility at port",
    ],
  },
  "sewage-discharge": {
    title: "Discharge Rules and Distance Limits",
    introduction: "Sewage discharge is subject to different rules depending on the treatment status, specific area definition and distance from the coast.",
    content: `DISCHARGE CONDITIONS:

1. Treated sewage (STP effluent):
   - If it meets the MEPC.227(64) standard: it may be discharged without restriction
   - If it meets the earlier standards: discharge more than 3 nautical miles from the nearest land

2. Comminuted and disinfected sewage:
   - At least 3 nautical miles from the nearest land
   - The ship under way, speed at least 4 knots

3. Untreated sewage:
   - At least 12 nautical miles from the nearest land
   - The ship under way, speed at least 4 knots
   - Instantaneous rate of discharge: the rate must comply with the formula set by the IMO

SPECIAL AREA – THE BALTIC SEA:

The Baltic Sea is designated an Annex IV special area. Additional rules for passenger ships:
- New passenger ships (keel laid after 1 June 2019): the STP must meet the MEPC.227(64) standard
- Existing passenger ships: compliance mandatory from 1 June 2021

The general rules apply to cargo ships in the Baltic.`,
    bulletPoints: [
      "Purified (MEPC.227): unrestricted; disinfect: 3 miles; unrefined: 12 mil",
      "During discharge, the ship is sailing at a speed of at least 4 knots.",
      "The Baltic Sea is an Annex IV special area; Additional rules for cruise ships",
    ],
    keyPoints: [
      "12 mile rule: minimum distance for untreated sewage",
      "3 mile rule: minimum distance for disinfected sewage",
      "Modern STP (MEPC.227): no distance restrictions",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - EK V
  // =====================================================
  "annex5-categories": {
    title: "Garbage Categories and Discharge Rules",
    introduction: "MARPOL Annex V mostly prohibits the dumping of garbage from ships into the sea; it only defines limited exceptions in certain categories.",
    content: `GARBAGE CATEGORIES (Annex V Regulations 4-6):

Category A – Plastics: discharge into the sea is completely PROHIBITED. There are no exceptions.

Category B – Food waste:
- Normal areas: more than 3 miles offshore, comminuted (below 25 mm)
- Special areas: more than 12 miles offshore, comminuted

Category C – Domestic wastes, packaging, paper, rags:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category D – Cooking oil:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category E – Incinerator ashes:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category F – Operational wastes (including cargo residues):
- Normal areas: more than 12 miles offshore, if not harmful to the environment
- Special areas: PROHIBITED (with some exceptions for cargo residues)

GENERAL RULE: the discharge of all synthetic materials including plastics into the sea is prohibited in all circumstances.`,
    bulletPoints: [
      "Disposal of plastic into the sea: BANNED completely and everywhere",
      "Leftovers: 3 mil (normal), 12 mil (custom area), shredded",
      "Most other categories: 12 mph (regular), restricted (private area)",
    ],
    keyPoints: [
      "Rules were tightened with the 2013 revision",
      "Only leftovers (12 mils, shredded) may be allowed in designated areas",
      "Plastic = absolute ban; there are no exceptions",
    ],
  },
  "garbage-management": {
    title: "Garbage Management Plan and Logbook",
    introduction: "Ships of 100 GT and above and fixed platforms carrying 15 or more people must have a Garbage Management Plan.",
    content: `THE GARBAGE MANAGEMENT PLAN:

Under Regulation 10.2, ships of 100 GT and above must carry a written Garbage Management Plan. The plan must be written in a language the crew understands and must cover:

1. Collection procedures: segregation by garbage category
2. Storage: separate containers by category on deck or in the garbage room
3. Processing: incinerator, compactor, comminuter
4. Discharge: the categories which may and may not be discharged into the sea
5. Delivery to a reception facility: the procedure for disposing of garbage in port

THE GARBAGE RECORD BOOK:

Mandatory for ships of 400 GT and above and for fixed platforms carrying 15 or more persons.

The information recorded:
- Type of garbage (category code)
- Estimated quantity (m³)
- Method of disposal (discharge to sea / incineration / delivery to a reception facility)
- Date, time and position

The record book is retained on board for 2 years.

INCINERATOR RULES:

What may be incinerated on board:
- Paper, rags, oily wastes, food waste
What is prohibited:
- Cargo residues covered by Annexes I, II and III
- Plastics containing PVC (risk of dioxins)`,
    bulletPoints: [
      "Garbage Management Plan is mandatory on 100 GT+ ships",
      "Garbage Log Book is mandatory on 400 GT+ ships",
      "The logbook is kept on board for 2 years",
    ],
    keyPoints: [
      "Garbage should be separated into 7 categories (plastic, food, paper, etc.)",
      "It is forbidden to burn PVC; Risk of dioxin and furan emissions",
      "Incinerator must meet MEPC.244(66) standard",
    ],
  },
  "annex5-special-areas": {
    title: "Special Areas and Antarctica Rules",
    introduction: "Many marine areas are designated as special areas within the scope of MARPOL Annex V, and garbage discharge rules in these areas are much more restrictive than in normal areas.",
    content: `ANNEX V SPECIAL AREAS:

The Mediterranean, the Baltic Sea, the Black Sea, the Red Sea, the Gulfs area, the North Sea, the Antarctic area (south of 60°S) and the Wider Caribbean Region.

RULES IN SPECIAL AREAS:

Plastics: PROHIBITED (as in normal areas)
Food waste: more than 12 nautical miles offshore, comminuted (below 25 mm), the ship under way
All other categories: PROHIBITED (must be delivered to a reception facility in port)

THE ANTARCTIC AREA (SOUTH OF 60°S):

The Antarctic area is subject to the strictest rules:
- The discharge of all types of garbage into the sea is PROHIBITED
- No garbage at all, including food waste, may be discharged
- Use of the incinerator: certain restrictions apply under the Environmental Protocol to the Antarctic Treaty
- All garbage must be stored on board and taken out of the Antarctic area

Ships operating in the Antarctic must also comply with the local environmental legislation (the Antarctic Treaty System).`,
    bulletPoints: [
      "Only food residues (12 mil, shredded) can be discharged in special areas",
      "Antarctica: ALL garbage, including food scraps, is prohibited",
      "8 regions are designated as Annex V special areas",
    ],
    keyPoints: [
      "Antarctica = strictest litter rules; no discharge permit",
      "Paper, plastic, packaging in special areas → compulsory to the receiving facility at the port",
      "Mediterranean, Baltic, Black Sea, North Sea: have special area status",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - EK VI
  // =====================================================
  "sox-regulations": {
    title: "SOx Limits and Fuel Sulfur Rates",
    introduction: "MARPOL Annex VI controls sulfur oxide (SOx) emissions from ships through fuel sulfur limits.",
    content: `GLOBAL SULPHUR LIMITS:

Since 1 January 2020 the global sulphur limit has been 0.50% m/m (by mass). This regulation is known as "IMO 2020".

HISTORICAL DEVELOPMENT:
- Before 2012: 4.50% (effectively unlimited)
- 2012-2020: 3.50%
- After 2020: 0.50%

ECA/SECA AREAS:

Within Emission Control Areas (ECA) or Sulphur Emission Control Areas (SECA) the limit is 0.10% m/m (since 2015).

Existing ECAs: the Baltic Sea, the North Sea, North America (US and Canadian coasts, 200 miles), the US Caribbean, and the Mediterranean (from 2025).

METHODS OF COMPLIANCE:

1. Low sulphur fuel (VLSFO/ULSFO): the most common method. Using fuel compliant with 0.50% (global) or 0.10% (ECA).
2. Scrubber (Exhaust Gas Cleaning System – EGCS): washes SO₂ out of the exhaust gas while continuing to burn HFO. Open-loop, closed-loop or hybrid types.
3. LNG: when natural gas is used as fuel, SOx emissions are close to zero.
4. Methanol and other alternative fuels.`,
    bulletPoints: [
      "Global limit after 2020: 0.50% m/m sulfur",
      "ECA/SECA limit: 0.10% m/m (from 2015)",
      "Compatibility: low sulfur fuel, scrubber or LNG",
    ],
    keyPoints: [
      "IMO 2020 = global sulfur limit reduction from 3.50% to 0.50%",
      "0.10% limit on ECAs has been in effect since 2015",
      "Ships using scrubbers can burn HFO (3.50%), but scrubber output must be monitored",
    ],
    warnings: [
      "The fuel changeover before entering an ECA must be completed at least 1 hour in advance",
      "Use of non-compliant fuel: PSC detention plus heavy fines",
    ],
  },
  "nox-tiers": {
    title: "NOx Tier I, II, III Standards",
    introduction: "MARPOL Annex VI limits nitrogen oxide (NOx) emissions from marine diesel engines to three-stage standards based on engine speed.",
    content: `NOx STANDARDS:

The NOx limits are set according to the engine speed (n = rpm):

Tier I (ships built between 2000 and 2011):
- n < 130 rpm: 17.0 g/kWh
- 130 ≤ n < 2000 rpm: 45 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 9.8 g/kWh

Tier II (ships built after 2011):
- n < 130 rpm: 14.4 g/kWh
- 130 ≤ n < 2000 rpm: 44 × n⁻⁰·²³ g/kWh
- n ≥ 2000 rpm: 7.7 g/kWh

Tier III (after 2016, inside a NOx ECA):
- n < 130 rpm: 3.4 g/kWh
- 130 ≤ n < 2000 rpm: 9 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 2.0 g/kWh

METHODS OF TIER III COMPLIANCE:

1. SCR (Selective Catalytic Reduction): a urea solution is injected into the exhaust gas to reduce NOx. 80-90% efficiency.
2. EGR (Exhaust Gas Recirculation): part of the exhaust gas is returned to the combustion chamber, lowering the combustion temperature.
3. LNG: gas-fuelled engines meet Tier III naturally.

NOx ECAs: North America and the US Caribbean. The Baltic and the North Sea became NOx ECAs in 2021.`,
    formula: {
      name: "Tier II NOx Limit (between 130-2000 rpm)",
      expression: "NOx ≤ 44 × n⁻⁰·²³ g/kWh",
      description: "n: engine speed (rpm). It is valid for engines of ships built after 2011.",
    },
    bulletPoints: [
      "Tier I: 2000-2011, Tier II: 2011+, Tier III: 2016+ (inside NOx ECA)",
      "Tier III requires ~80% lower emissions than Tier I",
      "SCR and EGR are the most common Tier III compliance technologies",
    ],
    keyPoints: [
      "NOx limits are calculated by formula based on engine RPM",
      "Tier III applies only within NOx ECA; Outside ECA, Tier II is sufficient",
      "EIAPP certification documents the NOx compliance of each engine",
    ],
  },
  "eca-seca": {
    title: "ECA/SECA Regions and Requirements",
    introduction: "Emission Control Areas (ECA) are areas determined by IMO where stricter emission standards than normal marine areas are applied.",
    content: `THE EXISTING ECAs:

1. Baltic Sea SECA: SOx control only. In force since 2006.
2. North Sea SECA: SOx control only. In force since 2007.
3. North American ECA: SOx + NOx + PM control. Since 2012. 200 nautical miles from the US and Canadian coasts.
4. US Caribbean ECA: SOx + NOx + PM. Since 2014. Around Puerto Rico and the US Virgin Islands.
5. Baltic and North Sea NOx ECA: from 1 January 2021 (Tier III compliance).
6. Mediterranean SOx ECA: enters into force in 2025.

REQUIREMENTS:

SOx ECA:
- Fuel sulphur content ≤ 0.10% m/m or an equivalent scrubber
- Fuel changeover procedure and record

NOx ECA:
- Engines of ships built after 2016/2021 must meet Tier III
- SCR, EGR or LNG technology

ENTERING/LEAVING AN ECA:

The ship must change over to low sulphur fuel before crossing the ECA boundary. Sufficient low sulphur fuel must be available in the tanks throughout the changeover. The time and date of the changeover and the tank volumes are recorded in the log book.`,
    bulletPoints: [
      "SOx ECA: 0.10% sulfur limit; NOx ECA: Tier III mandatory",
      "North America: SOx + NOx + PM control (most comprehensive)",
      "Akdeniz SOx ECA will enter into force in 2025",
    ],
    keyPoints: [
      "ECA = strict limits for SOx and/or NOx and/or PM",
      "Fuel changeover must be completed before entering the ECA limit",
      "Tier III: only valid for NOx ECAs",
    ],
  },
  "ods-regulations": {
    title: "Substances that Deplete the Ozone Layer",
    introduction: "MARPOL Annex VI Regulation 12 controls the use of ozone depleting substances (ODS) on ships.",
    content: `SCOPE:

Ozone Depleting Substances (ODS) are chemicals brought under control by the Montreal Protocol.

The most common uses of ODS on board:
- Refrigeration systems (air conditioning, provision cooling, cargo refrigeration)
- Fire extinguishing systems (halon)
- Insulation foams

MARPOL ANNEX VI REGULATION 12:

1. Prohibition of new installations: new installations of refrigeration and fire extinguishing systems containing CFCs (chlorofluorocarbons) are prohibited (all ships).

2. New installations of substances such as Halon 1211, 1301 and CFC-12 (R-12) are prohibited.

3. HCFC (hydrochlorofluorocarbon) restriction: from 1 January 2020 new installations containing HCFCs (including R-22) are prohibited. Existing systems may continue in use but may not be recharged.

4. ODS Record Book: all systems containing ODS must be recorded, and leakages and recharge quantities must be tracked.

ALTERNATIVES:

HFC (hydrofluorocarbon) refrigerants such as R-134a, R-404A and R-407C are not ODS, but they are being phased down under the Kigali Amendment because of their greenhouse effect.`,
    bulletPoints: [
      "CFC and Halon new installation is completely prohibited",
      "HCFC (R-22): New installation prohibited from 2020; Filling is not possible in the current system",
      "ODS Record Book must be kept on board",
    ],
    keyPoints: [
      "ODS control is provided by Montreal Protocol + MARPOL Annex VI Regulation 12",
      "R-22 is still available on some older ships; but filling is prohibited",
      "HFCs are not ODS but will be reduced by the Kigali Amendment",
    ],
  },
  "voc-regulations": {
    title: "VOC (Volatile Organic Compounds) Control",
    introduction: "MARPOL Annex VI Regulation 15 regulates the control of volatile organic compound (VOC) emissions from tanker operations.",
    content: `WHAT ARE VOCs?

VOCs (Volatile Organic Compounds) are volatile hydrocarbons released into the atmosphere from tanker cargo tanks. They arise from the evaporation of cargoes such as crude oil and petrol. They contribute to the formation of ozone and have an adverse effect on air quality.

REGULATION 15 REQUIREMENTS:

1. VOC Management Plan (VOCSMP): crude oil tankers must prepare a VOC Management Plan.

2. Vapour Emission Control System (VECS): some ports and terminals require VOC emissions to be collected during loading. The ship must have the equipment to connect to this system.

3. Vapour Recovery Unit (VRU): the vapours collected are condensed and recovered or safely burned.

APPLICATION:

VOC control is applied mainly at terminals. The ship's responsibility is to:
- Carry a VECS connection manifold
- Comply with the VOC management plan
- Control the tank vents during loading

Some coastal States, such as Norway, apply additional VOC control requirements within their territorial waters.`,
    bulletPoints: [
      "VOC: volatile hydrocarbons emitted from tanker cargo tanks",
      "Crude oil tankers must have a VOC Management Plan",
      "VECS connection is used during loading at terminals",
    ],
    keyPoints: [
      "VOC emissions contribute to ozone formation",
      "Standard manifold required for terminal-to-ship connection",
      "Countries such as Norway impose additional VOC rules at the national level",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - ENERJİ VERİMLİLİĞİ
  // =====================================================
  "eedi-eexi": {
    title: "EEDI and EEXI Calculation and Requirements",
    introduction: "EEDI (Energy Efficiency Design Index) for new ships and EEXI (Energy Efficiency Existing Ship Index) are mandatory indices that measure carbon efficiency for existing ships.",
    content: `EEDI (NEW SHIPS):

The EEDI measures the CO₂ emission per ton-mile at the design stage of the ship. It has been mandatory for new ships since 2013 under MARPOL Annex VI Regulation 21.

Calculation (simplified):
EEDI = (CO₂ emission) / (carrying capacity × speed)

Unit: g CO₂ / (tonne × nautical mile)

EEDI reduction targets (against the baseline):
- Phase 0 (2013-2015): 0% (reference)
- Phase 1 (2015-2020): 10% reduction
- Phase 2 (2020-2025): 20% reduction
- Phase 3 (2025+): 30-50% reduction (depending on ship type)

EEXI (EXISTING SHIPS):

From 1 January 2023 existing ships must calculate their EEXI and achieve the required energy efficiency index.

The EEXI is the EEDI applied to existing ships.

Methods of EEXI compliance:
1. Engine Power Limitation (EPL): the most common method
2. Energy saving technologies (waste heat recovery, air lubrication)
3. Conversion to alternative fuel`,
    formula: {
      name: "EEDI Calculation (Simplified)",
      expression: "EEDI = (P × SFC × CF) / (Capacity × Vref)",
      description: "P: Engine power (kW), SFC: Specific fuel consumption (g/kWh), CF: CO₂ conversion factor, Capacity: DWT, Vref: Reference speed (knots).",
    },
    bulletPoints: [
      "EEDI: 2013+ new ships, EEXI: 2023+ existing ships",
      "Phase 3 (2025+): 30-50% reduction target",
      "EPL (engine power limitation) is the most common EEXI compliance method",
    ],
    keyPoints: [
      "EEDI/EEXI measures the ship's design efficiency; not operational",
      "IEE certification documents the EEDI/EEXI value",
      "EEXI compliance is mandatory from 1 January 2023",
    ],
  },
  "cii-rating": {
    title: "CII Rating (A-E) and Calculation",
    introduction: "CII (Carbon Intensity Indicator) measures the annual operational carbon intensity of the ship and gives a rating from A-E.",
    content: `WHAT IS THE CII?

The CII relates the CO₂ a ship actually emits in a year to its carrying capacity and the distance it sails. Unlike the EEDI/EEXI, the CII measures operational performance.

CALCULATION:

CII = Annual CO₂ emission / (Capacity × Distance)

Unit: g CO₂ / (tonne × nautical mile)

Annual CO₂ = Total fuel consumption × CF (CO₂ conversion factor)

RATING:

A: Superior – well below the reference line
B: Good – below the reference line
C: Moderate – around the reference line
D: Inferior – above the reference line
E: Poor – well above the reference line

Ships rated D for three consecutive years or E for one year must prepare a corrective action plan.

CII REDUCTION TARGETS:

2023: reference year
2024: 2% reduction
2025: 3% reduction
2026: 4% reduction
Beyond that: to be set by the IMO

METHODS OF IMPROVEMENT:

1. Speed optimisation (slow steaming)
2. Route optimisation
3. Hull maintenance (anti-fouling)
4. Propeller polishing
5. Trim optimisation
6. Use of alternative fuels`,
    formula: {
      name: "CII Calculation",
      expression: "CII = (ΣFCⱼ × CFⱼ) / (Capacity × D)",
      description: "FCⱼ: type j fuel consumption (tonnes), CFⱼ: CO₂ conversion factor, Capacity: DWT or GT, D: total distance traveled (nautical miles).",
    },
    bulletPoints: [
      "CII measures operational carbon intensity; EEDI/EEXI is the design index",
      "A-E rating: ships receiving D or E corrective action required",
      "Annual reduction target: 2-4% (2024-2026)",
    ],
    keyPoints: [
      "3 years D or 1 year E = corrective action plan mandatory",
      "Slow steaming is the most effective CII improvement method",
      "CII reference lines differ depending on ship type",
    ],
  },
  "seemp": {
    title: "SEEMP (Ship Energy Efficiency Management Plan)",
    introduction: "SEEMP is a mandatory management plan that contains the necessary procedures to monitor and improve the energy efficiency of the ship.",
    content: `THE STRUCTURE OF THE SEEMP:

Since 2023 the SEEMP has consisted of two parts:

SEEMP Part I: the Energy Efficiency Management Plan
- Ship-specific energy efficiency measures
- Fuel consumption monitoring procedures
- Crew training
- Mandatory for all ships

SEEMP Part II: CII monitoring and reporting
- Mandatory for ships of 5,000 GT and above
- Collection of fuel consumption data (DCS – Data Collection System)
- Annual CII calculation
- Corrective action plan (if a D or E rating is received)

ENERGY EFFICIENCY MEASURES:

Improvement measures that may be included in the SEEMP:
1. Voyage optimisation: passage planning, allowing for currents and weather
2. Speed management: determining the optimum economical speed
3. Trim optimisation: reducing resistance by adjusting the static trim
4. Machinery maintenance: engine tune-up, propeller polishing
5. Hull maintenance: application of anti-fouling paint
6. Waste heat recovery
7. LED lighting and energy efficient equipment

DCS (Data Collection System):

Ships of 5,000 GT and above report their annual fuel consumption data to the flag State. The data is collated in the IMO DCS database.`,
    bulletPoints: [
      "SEEMP Part I: all ships; Part II: 5,000 GT+ ships",
      "Part II includes CII monitoring and annual reporting",
      "With DCS, annual fuel consumption data is reported to IMO",
    ],
    keyPoints: [
      "SEEMP is an integral part of the IEE certification",
      "At a D or E rating, the corrective action plan is added to Part II",
      "Trim optimization can save 2-5% fuel",
    ],
  },
  "eu-ets": {
    title: "EU ETS and FuelEU Maritime",
    introduction: "The EU has included the maritime sector in the Emission Trading System (EU ETS) starting from 2024 and has set greenhouse gas intensity targets with the FuelEU Maritime regulation.",
    content: `EU ETS FOR SHIPPING:

Since 1 January 2024 the CO₂ emissions of ships of 5,000 GT and above have been included in the EU Emissions Trading System.

SCOPE:
- Voyages between EU ports: 100% of emissions
- Voyages between an EU port and a non-EU port: 50% of emissions
- While at berth in an EU port: 100% of emissions

PHASE-IN:
2024: allowances to be surrendered for 40% of emissions
2025: 70%
2026: 100%

The ship operator must buy enough EUAs (EU Allowances) to cover its emissions. 1 EUA = 1 tonne of CO₂.

FUELEU MARITIME (2025):

From 1 January 2025 ships must meet targets for reducing the greenhouse gas intensity of their fuel:
2025: −2% (against the 2020 reference)
2030: −6%
2035: −14.5%
2040: −31%
2045: −62%
2050: −80%

GHG intensity is calculated on a Well-to-Wake basis; it covers the emissions from production, transport and combustion.

Fines apply in the event of non-compliance.`,
    bulletPoints: [
      "EU ETS: Including 5,000 GT+ ships from 2024",
      "EU-EU trips: 100%, EU-third country: 50% emissions coverage",
      "FuelEU Maritime: Phased GHG reduction targets 2025-2050",
    ],
    keyPoints: [
      "1 EUA = 1 tonne of CO₂; The operator must purchase allowances for emissions",
      "FuelEU Maritime is Well-to-Wake based (not just stack emissions)",
      "2050 target: 80% GHG intensity reduction",
    ],
  },
  "alternative-fuels": {
    title: "Alternative Fuels (LNG, Methanol, Ammonia)",
    introduction: "Various alternative fuel options to traditional petroleum-based fuels are being developed to meet the decarbonization targets of the shipping industry.",
    content: `LNG (LIQUEFIED NATURAL GAS):

Advantages: SOx emissions close to zero, NOx down by 85%, CO₂ down by 20-25%, PM (particulate matter) down by 95%.
Disadvantages: methane slip (unburned methane) offsets the greenhouse benefit; high investment cost; limited bunkering infrastructure.
IGF Code: the safety requirements for gas-fuelled ships.

METHANOL:

Advantages: zero SOx, low NOx, liquid at ambient temperature (easy to store), can be carbon neutral as biomethanol or e-methanol.
Disadvantages: low energy density (half that of HFO), toxic (invisible flame, skin contact).
Maersk brought methanol-fuelled container ships into service in 2024.

AMMONIA:

Advantages: contains no carbon (produces no CO₂ on combustion), high energy density, existing LPG carriage technology can be adapted.
Disadvantages: extremely toxic (TLV: 25 ppm), corrosive, low flame speed, can produce NOx.
Commercial use is expected during the 2030s.

HYDROGEN:

Green hydrogen (from electrolysis) is the cleanest fuel, but its marine application is still limited by the difficulty of storage (high pressure or cryogenic), its low volumetric energy density and its production cost.

COMPARISON (HFO = 100 reference):

Fuel / Energy density / CO₂ reduction / Cost
HFO: 100 / reference / low
LNG: 75 / 20-25% / medium
Methanol: 50 / 0-100%* / high
Ammonia: 55 / 100% (tank-to-wake) / high
*A 100% reduction is possible with biomethanol or e-methanol`,
    bulletPoints: [
      "LNG: SOx ≈ 0, CO₂ 20-25% reduction; methane slip disadvantage",
      "Methanol: liquid at room temperature, 100% reduction possible with e-methanol",
      "Ammonia: contains no carbon but is extremely toxic (TLV: 25 ppm)",
    ],
    keyPoints: [
      "LNG is currently the most mature alternative fuel technology",
      "Methanol is being adopted by major operators such as Maersk",
      "E-methanol or green ammonia critical for 2050 net-zero target",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - BALAST SUYU
  // =====================================================
  "bwm-convention": {
    title: "BWM Contract and History",
    introduction: "The Ballast Water Management (BWM) Convention is the international regulation to prevent ships from carrying foreign marine organisms through ballast water.",
    content: `THE BWM CONVENTION:

Adopted by the IMO in 2004, it entered into force on 8 September 2017.

THE PROBLEM: ships take on ballast water in one region to maintain their stability and discharge it in another. The alien organisms carried with the ballast water (invasive species) pose a serious threat to local ecosystems.

IMPORTANT EXAMPLES:
- The zebra mussel (Dreissena polymorpha): carried from the Caspian Sea to the Great Lakes; billions of dollars of damage to water infrastructure.
- The cholera bacterium: found to have been carried to South America in ballast water.
- The comb jelly (Mnemiopsis leidyi): from the western Atlantic to the Black Sea; a devastating effect on fisheries.

IMPLEMENTATION TIMETABLE:

D-1 Standard (ballast water exchange): a transitional measure. Exchange of ballast water in mid-ocean.
D-2 Standard (ballast water treatment): the final goal. Destruction of the organisms by an approved treatment system (BWTS).

All ships are due to have moved to the D-2 standard by 2024 (on a transition timetable based on the age of the ship).`,
    bulletPoints: [
      "BWM Convention was accepted in 2004 and entered into force in 2017.",
      "Invasive species could cause billions of dollars in economic damage",
      "D-1: water exchange (temporary), D-2: purification system (final)",
    ],
    keyPoints: [
      "All ships are gradually transitioning to the D-2 standard",
      "BWM certificate must be present on board",
      "Ballast water is the largest vector of invasive species transfer",
    ],
  },
  "ballast-exchange": {
    title: "Ballast Water Exchange Methods (D-1)",
    introduction: "The D-1 standard requires the ship to remove coastal organisms by displacing ballast water in offshore open ocean waters.",
    content: `D-1 STANDARD REQUIREMENTS:

- At least 200 nautical miles from the nearest land
- Water depth at least 200 metres
- 95% volumetric exchange

If the 200-mile condition cannot be met: at least 50 miles offshore in a depth of 200 m.

METHODS OF EXCHANGE:

1. Sequential Method:
   The tank is emptied completely and then refilled with ocean water.
   Advantage: close to 100% exchange
   Disadvantage: stability problems (the moment the tank is empty); structural stress

2. Flow-through Method:
   Ocean water is pumped into the full tank from the bottom or the top and the water leaves by overflow.
   Rule: at least 3 times the tank volume must be pumped through (95% exchange).
   Advantage: stability is maintained
   Disadvantage: wet decks, takes a long time

3. Dilution Method:
   Clean water enters at the top of the tank while the same rate is discharged from the bottom.
   Rule: 3 times the volume must be pumped through.
   Advantage: a controlled operation
   Disadvantage: requires special pipework

STABILITY CONSIDERATIONS:

With the sequential method the order in which tanks are emptied and filled must be consistent with the stability calculation. The free surface effect and the change of trim must be monitored.`,
    bulletPoints: [
      "200 miles + 200 m depth; or 50 miles + 200 m depth",
      "3 methods: sequential, trickle, dilution; They all aim for 95% change",
      "In the pouring method, 3 times the tank volume of water must be passed.",
    ],
    keyPoints: [
      "D-1 is a transitional standard; D-2 is the ultimate goal",
      "Stability risk is highest in the sequential method",
      "Ballast water change is recorded in the Ballast Water Logbook",
    ],
    warnings: [
      "With the sequential method stability can be lost while a tank is empty; a stability calculation is essential",
    ],
  },
  "ballast-treatment": {
    title: "Ballast Water Treatment Systems (D-2)",
    introduction: "The D-2 standard requires that living organisms in ballast water be reduced below certain limits by an approved treatment system (BWTS).",
    content: `D-2 STANDARD LIMITS:

Viable organisms (≥50 µm): < 10 individuals/m³
Viable organisms (10-50 µm): < 10 individuals/mL
Vibrio cholerae: < 1 CFU/100 mL
E. coli: < 250 CFU/100 mL
Intestinal enterococci: < 100 CFU/100 mL

TREATMENT TECHNOLOGIES:

1. UV (Ultraviolet) treatment:
   UV-C light damages the DNA of the organisms so that they cannot reproduce.
   Advantage: no chemicals used, leaves no residue
   Disadvantage: effectiveness falls in turbid water; pre-filtration is needed

2. Electrochlorination:
   Sodium hypochlorite (NaOCl) is produced by electrolysis of seawater and dosed into the ballast water.
   Advantage: produced in situ, effective
   Disadvantage: TRO (Total Residual Oxidant) must be controlled; risk of corrosion

3. Ozonation:
   Disinfection with ozone (O₃) gas.
   Advantage: a very powerful oxidant
   Disadvantage: energy intensive; risk of bromate formation

4. Filtration plus UV:
   The most common commercial system. A pre-filter (40-50 µm) plus a UV chamber.

IMO TYPE APPROVAL:

All BWTS must be type approved under the IMO G8 guidelines or the BWMS Code.`,
    bulletPoints: [
      "D-2: organisms ≥50 µm < 10/m³; organisms 10–50 µm < 10/mL",
      "UV, electrochlorination and ozone are the main purification technologies",
      "Filtration + UV is the most common commercial combination",
    ],
    keyPoints: [
      "BWTS must be IMO type approved (BWMS Code)",
      "Turbid water reduces effectiveness in UV systems; Pre-filtration is a must",
      "TRO control and neutralization are required in electrochlorination",
    ],
  },
  "ballast-management-plan": {
    title: "Ballast Water Management Plan and Record Book",
    introduction: "Every ship must have a management plan governing ballast water operations and a logbook recording all operations.",
    content: `THE BALLAST WATER MANAGEMENT PLAN:

Under Regulation B-1 of the BWM Convention every ship must have a Ballast Water Management Plan (BWMP). The plan is approved by the flag State.

CONTENTS:
1. Safety procedures for ballast water operations
2. A ship-specific description of the ballast system (tank arrangement, pump capacities)
3. The method of compliance with the D-1 or D-2 standard
4. BWTS operating and maintenance procedures
5. Sediment management
6. Crew duties and responsibilities
7. Assessment of the areas from which ballast water is to be taken

THE BALLAST WATER RECORD BOOK:

Under Regulation B-2 every ship must carry a Ballast Water Record Book.

The information recorded:
- Ballast water uptake: date, time, position, tank number, quantity
- Ballast water discharge: the same details
- Ballast water exchange (D-1): method, start/finish position
- Treatment by BWTS (D-2): start/stop times
- Delivery to a reception facility
- Accidental or exceptional discharge

The record book is retained on board for at least 2 years and is produced during PSC inspections.`,
    bulletPoints: [
      "BWMP must be approved by the flag state",
      "Logbook records all ballast operations with date, time and location",
      "The logbook is kept on board for 2 years",
    ],
    keyPoints: [
      "BWMP explains in detail the method of compliance with the D-1 or D-2 standard",
      "PSC inspection checks BWMP + registry + BWTS operating status",
      "Sediment management is an integral part of the plan",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - BİYOLOJİK ÇEŞİTLİLİK
  // =====================================================
  "afs-convention": {
    title: "AFS Agreement (Anti-fouling Systems)",
    introduction: "The AFS Convention (International Convention on the Control of Harmful Anti-fouling Systems on Ships) prohibits harmful chemicals used in ship hull paints.",
    content: `HISTORY:

The anti-fouling paints used to stop marine organisms (biofouling) attaching to ships' hulls contained tributyltin (TBT) compounds for many years. The AFS Convention was drawn up once the devastating effect of TBT on marine ecosystems (reproductive disorders in mussels and snails) became apparent.

THE AFS CONVENTION:

Adopted in 2001, it entered into force on 17 September 2008.

THE MAIN REQUIREMENTS:
1. The application of anti-fouling paints containing TBT has been prohibited since 1 January 2003.
2. From 1 January 2008 ships with TBT coatings may not operate unless the coating is sealed (sealer coat).
3. Other potentially harmful substances such as cybutryne are under review.

THE AFS CERTIFICATE:

Ships of 400 GT and above engaged on international voyages must carry an International Anti-fouling System Certificate or a Declaration.

CURRENT ALTERNATIVES:

- Copper-based paints (the most common)
- Silicone-based foul-release coatings (a slippery surface)
- Ultrasonic anti-fouling systems
- Non-biocidal coatings`,
    bulletPoints: [
      "Application of TBT dyes has been prohibited since 2003 and possession since 2008.",
      "AFS certification is mandatory on 400 GT+ international ships",
      "Copper-based and silicone-based paints are current alternatives",
    ],
    keyPoints: [
      "TBT caused reproductive disorders in marine ecosystems",
      "AFS Convention was accepted in 2001 and entered into force in 2008.",
      "Sibutryn and other substances still under review",
    ],
  },
  "biofouling-management": {
    title: "Biofouling Management",
    introduction: "Biofouling is the adhesion of marine organisms to the ship's hull, which increases fuel consumption and may lead to the transfer of invasive species.",
    content: `THE EFFECTS OF BIOFOULING:

1. Increased fuel consumption: heavy biofouling can increase frictional resistance by up to 40%, which means a 10-40% increase in fuel consumption.

2. Transfer of invasive species: organisms attached to the hull are carried from one region to another. After ballast water this is the largest vector for invasive species.

3. Increased emissions: higher fuel consumption directly increases CO₂, SOx and NOx emissions. It has an adverse effect on the CII rating.

THE IMO BIOFOULING GUIDELINES (2011/2023):

The IMO has published voluntary guidelines on biofouling management (MEPC.207(62), revised in 2023). They cover:

1. A Biofouling Management Plan:
   - Selection of the anti-fouling system and the maintenance programme
   - The underwater inspection schedule
   - Maintenance of niche areas (sea water inlets, rudder, propeller)

2. A Biofouling Record Book:
   - Applications of anti-fouling paint
   - Underwater cleaning and inspections
   - Drydocking dates
   - Niche area maintenance

NICHE AREAS:

The parts of the hull most susceptible to biofouling: sea water inlet gratings (sea chests), the rudder, the propeller, the bow thruster tunnel, anode protection areas and sea valves.`,
    bulletPoints: [
      "Biofouling can increase fuel consumption by 10-40%",
      "IMO volunteer guide: management plan + logbook",
      "Niche areas: sea chest, rudder, propeller are the most critical areas",
    ],
    keyPoints: [
      "Biofouling is the largest invasive species vector after ballast water",
      "Underwater cleaning provides both fuel savings and CII improvement",
      "Some regions (Australia, New Zealand) impose underwater cleaning rules",
    ],
  },
  "ship-recycling": {
    title: "Hong Kong Convention (Ship Recycling)",
    introduction: "The Hong Kong Convention (2009) is an international regulation that aims to protect human health and the environment during the dismantling/recycling process of ships.",
    content: `THE HONG KONG CONVENTION:

Adopted in 2009, it enters into force on 26 June 2025 (sufficient ratifications have been achieved).

PURPOSE: during the ship recycling process:
- To protect worker health and safety
- To prevent environmental pollution
- To manage hazardous materials under control

THE MAIN REQUIREMENTS:

1. IHM (Inventory of Hazardous Materials):
   An inventory of the hazardous materials present on each ship. It will be mandatory for ships of 500 GT and above.
   Three parts:
   - Part I: hazardous materials in the ship's structure and equipment (asbestos, PCBs, TBT, ODS, etc.)
   - Part II: operationally generated wastes
   - Part III: stores (stock materials)

2. Ship Recycling Plan:
   Prepared specifically for each ship by the recycling facility.

3. Authorisation of the recycling facility:
   Facilities must be authorised by the national authority.

THE EU REGULATION (EU SRR):

Without waiting for the Hong Kong Convention, the EU brought its own Ship Recycling Regulation (EU 1257/2013) into force. EU-flagged ships may only be recycled at EU-approved facilities.`,
    bulletPoints: [
      "The Hong Kong Convention was adopted in 2009 and will enter into force in 2025.",
      "IHM (Harmful Substance Inventory) will be mandatory on 500 GT+ ships",
      "EU: Implements its own recycling regulation with EU SRR",
    ],
    keyPoints: [
      "IHM Part I: structural hazardous substances (asbestos, PCB, TBT, ODS, etc.)",
      "Recycling facilities must be approved by the competent authority",
      "Beaching method is controversial due to environmental and worker safety risks",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "port-reception": {
    title: "Port Waste Reception Facilities",
    introduction: "MARPOL requires port states to provide adequate waste reception facilities (Port Reception Facility - PRF) so that ships can safely deliver waste (oily waste, slop, garbage, sewage, cargo residue) that they cannot discharge to land.",
    content: `WHY ARE THEY NEEDED?

The MARPOL annexes prohibit or strictly limit the discharge of many wastes into the sea. The ship must collect these wastes (bilge oil, slops, sludge, garbage, sewage, cargo washing residues) and land them ashore. Port reception facilities (PRF) are the port infrastructure that makes this possible; without PRF, MARPOL compliance cannot be achieved in practice.

THE SHIP'S RESPONSIBILITY:

- To enter the wastes in the record book for the relevant annex (ORB, Garbage Record Book, etc.).
- To obtain and keep a waste delivery receipt on delivery to the PRF.
- To comply with the waste management plans (Garbage Management Plan, etc.).

THE PORT STATE'S RESPONSIBILITY:

States Parties are obliged to provide PRF of adequate capacity without causing undue delay to ships. Inadequate PRF is a serious compliance gap because it encourages illegal discharge into the sea.

THE EU POSITION:

In the EU the PRF Directive requires ships to deliver their wastes to the port and requires the waste fee to be included in the port dues (in order to reduce the incentive to discharge at sea).`,
    bulletPoints: [
      "PRF enables ships to safely deliver MARPOL waste to land.",
      "On delivery, waste delivery receipt is received and stored.",
      "The port state is obliged to provide adequate PRF.",
      "Insufficient PRF encourages illegal discharge.",
    ],
    keyPoints: [
      "Without PRF, MARPOL compliance is practically not possible.",
      "The delivery receipt is proof of compliance and will be questioned during the audit.",
      "The EU PRF Directive includes the waste fee in the port fee.",
    ],
  },
  "scrubber-egcs": {
    title: "Exhaust Gas Cleaning Systems (Scrubber/EGCS)",
    introduction: "EGCS (Exhaust Gas Cleaning System / scrubber) is used to scrub away sulfur oxides (SOx) in exhaust gas and allows the use of high sulfur fuel (HSFO) as an 'equivalent measure' to the MARPOL Annex VI sulfur limit.",
    content: `PRINCIPLE OF OPERATION:

A scrubber washes the exhaust gas with water (usually seawater); the SOx dissolves in the water and is separated from the gas. The SOx leaving the funnel is thereby brought below the limit as if low sulphur fuel had been used. Compliance is monitored continuously by measuring the equivalent SO2/CO2 ratio.

TYPES:

- Open loop: washes with the natural alkalinity of seawater; after monitoring, the washwater is discharged into the sea.
- Closed loop: washes with fresh water plus an alkali (caustic); the washwater is recirculated and the sludge is landed ashore. Suitable for areas with discharge restrictions.
- Hybrid: can operate in either mode.

WASHWATER AND RESTRICTIONS:

For open-loop discharge water the MARPOL Annex VI criteria (pH, PAH, turbidity, nitrate) are monitored. Some ports/regions prohibit open-loop washwater discharge; the system is then switched to closed loop.

COMPLIANCE AND THE OTHER ROUTES:

Along with low sulphur fuel (VLSFO/MGO) and LNG, the scrubber is one of the three main routes to Annex VI sulphur compliance. Continuous monitoring data and the approval documents (SECC/approved SO2/CO2 ratio) are retained.`,
    bulletPoints: [
      "Scrubber removes SOx from the exhaust by washing it with water.",
      "There are open circuit (sea water), closed circuit (fresh water + alkaline) and hybrid types.",
      "Washwater is monitored according to MARPOL Annex VI criteria (pH/PAH/turbidity).",
      "Some regions prohibit open circuit discharge.",
    ],
    keyPoints: [
      "The scrubber complies with HSFO equivalent to the Annex VI sulfur limit.",
      "Compliance is proven by continuous monitoring of the SO2/CO2 ratio.",
      "Closed circuit is used in discharge restricted areas.",
    ],
  },
  "incinerator": {
    title: "Shipboard Incinerator and Annex VI",
    introduction: "Ship incinerator; It reduces the volume of waste oil (sludge), oily rags, certain garbage and solid waste by burning them. MARPOL Annex VI regulates incineration on board and prohibits the incineration of certain substances.",
    content: `PURPOSE:

Combustible wastes accumulated on board (oily sludge, oil residues, some garbage) are burned in the incinerator to reduce their volume; this lowers the quantity of waste that has to be landed ashore.

MARPOL ANNEX VI REQUIREMENTS:

- An approved type of incinerator (meeting the IMO standard) must be used; the combustion chamber temperature must be monitored.
- The incineration on board of certain substances is PROHIBITED: for example certain residues covered by the MARPOL annexes, materials containing PCBs, garbage containing heavy metals and halogenated compounds.
- Incineration in port or in inland waters is mostly prohibited or restricted; the port rules take precedence.

OPERATION AND SAFETY:

- Incineration records (type/quantity of waste burned) are entered in the Garbage Record Book or the relevant records.
- The combustion temperature and the funnel emissions are monitored.
- Correct feeding and maintenance are required because of the risk of fire and explosion.

THE ALTERNATIVE:

Wastes that cannot or must not be incinerated are delivered to port reception facilities (PRF).`,
    bulletPoints: [
      "The incinerator reduces the volume of combustible waste (sludge, some garbage).",
      "Approved type incinerator and temperature monitoring required (Annex VI).",
      "It is forbidden to burn some PCB/heavy metal/halogenated substances.",
      "Burning records are recorded in the logbook.",
    ],
    keyPoints: [
      "Annex VI regulates shipboard incineration and prohibits certain substances.",
      "Burning is mostly restricted/prohibited in port/inland waters.",
      "Waste that cannot be burned is delivered to PRF.",
    ],
    warnings: [
      "Incinerating prohibited materials carries severe sanctions",
      "Incorrect feeding/maintenance creates a risk of fire and explosion",
    ],
  },
  "imo-ghg-strategy": {
    title: "IMO Greenhouse Gas (GHG) Strategy and Net-Zero Targets",
    introduction: "IMO's seamanship greenhouse gas strategy sets targets and measures to reduce GHG emissions from international seamanship. Tools such as EEDI/CII are the implementation mechanisms of this strategy.",
    content: `THE FRAMEWORK OF THE STRATEGY:

The IMO's revised GHG Strategy (2023) aims to bring the emissions of international shipping to net zero by around 2050 and defines indicative checkpoints along the way; it also aims to increase the share of low/zero carbon fuels.

TYPES OF MEASURE:

- Technical measures: rules limiting the carbon intensity of fuels (e.g. a fuel standard) and ship efficiency requirements.
- Economic measures: market-based mechanisms such as carbon pricing/levies (still under development).

THE IMPLEMENTING INSTRUMENTS (existing):

- EEDI/EEXI: the design/existing ship efficiency indices.
- CII: the operational carbon intensity rating (A-E).
- SEEMP: the ship energy efficiency management plan.
These are the concrete instruments through which the strategy is implemented.

INTERACTION WITH REGIONAL RULES:

The EU's EU ETS and FuelEU Maritime regulations create parallel and additional pressure alongside the IMO framework. Ship operators have to manage both the global (IMO) and the regional (EU) requirements together.

OPERATIONAL IMPACT:

Speed optimisation (slow steaming), route/trim optimisation, energy saving devices and alternative fuels are the main operational levers for meeting the targets.`,
    bulletPoints: [
      "Revised IMO GHG Strategy (2023) targets net-zero by ~2050.",
      "It includes technical (fuel/efficiency) and economic (carbon price) measures.",
      "Application tools: EEDI/EEXI, CII, SEEMP.",
      "EU ETS / FuelEU Maritime prints regionally in parallel.",
    ],
    keyPoints: [
      "The strategy defines the framework that takes shipping to net-zero.",
      "EEDI/CII/SEEMP are concrete tools of the strategy.",
      "Slow steaming and alternative fuels are the main mitigation levers.",
    ],
  },
};

export default function EnvironmentTopicsPage() {
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
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Environmental Protection (MARPOL)</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {environmentTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-emerald-500/5 cursor-pointer"
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
                <Lightbulb className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Emission Calculations", href: "/environment/calculations" },
                  { title: "Emission Formulas", href: "/environment/formulas" },
                  { title: "All Lessons", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-emerald-500/40 hover:bg-background"
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
                <div className="bg-emerald-500/10 rounded-xl p-4 border-l-4 border-emerald-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-emerald-600 dark:text-emerald-400 mb-2">
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
                  <div className="bg-emerald-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Key Information
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}.</span>
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
