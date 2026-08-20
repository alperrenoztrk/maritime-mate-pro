import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  ChevronRight,
  FileText,
  AlertTriangle,
  Anchor,
  Scale,
  Ship,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  Boxes,
  BarChart3,
  Ruler,
  Settings,
  Thermometer,
  Droplets,
  Container,
  BookMarked,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface CargoSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface CargoMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: CargoSubTopic[];
}

const cargoTopics: CargoMainTopic[] = [
  {
    id: "cargo-intro",
    number: 1,
    title: "Cargo Handling Fundamentals",
    icon: Package,
    subtopics: [
      { id: "cargo-handling-def", title: "Definition and importance of cargo handling", hasContent: true },
      { id: "cargo-types", title: "Cargo types and classification", hasContent: true },
      { id: "cargo-planning", title: "Load planning principles", hasContent: true },
      { id: "cargo-docs", title: "Freight documents and documentation", hasContent: true },
      { id: "cargo-safety-general", title: "Safety in loading operations", hasContent: true },
      { id: "cargo-gear-swl", title: "Ship cargo equipment, crane/derrick and SWL", hasContent: true },
    ],
  },
  {
    id: "stowage",
    number: 2,
    title: "Stacking Principles",
    icon: Boxes,
    subtopics: [
      { id: "stowage-principles", title: "General stowing principles", hasContent: true },
      { id: "stowage-factor", title: "Stowage Factor", hasContent: true },
      { id: "broken-stowage", title: "Concept of Broken Stowage", hasContent: true },
      { id: "cargo-compatibility", title: "Load compatibility table", hasContent: true },
      { id: "ventilation", title: "Cargo hold ventilation", hasContent: true },
      { id: "dunnage", title: "Dunnage use", hasContent: true },
    ],
  },
  {
    id: "lashing-securing",
    number: 3,
    title: "Load Lashing & Securing",
    icon: Anchor,
    subtopics: [
      { id: "lashing-principles", title: "Cargo securing principles and forces", hasContent: true },
      { id: "css-code", title: "CSS Code requirements", hasContent: true },
      { id: "lashing-equipment", title: "Tying equipment", hasContent: true },
      { id: "lashing-calc", title: "Cargo securing force calculations", hasContent: true },
      { id: "container-lashing", title: "Containercargo security systems", hasContent: true },
      { id: "heavy-lift-lashing", title: "Heavy cargo securing", hasContent: true },
    ],
  },
  {
    id: "draft-survey",
    number: 4,
    title: "Draft survey",
    icon: Ruler,
    subtopics: [
      { id: "draft-survey-intro", title: "Purpose and principle of draft survey", hasContent: true },
      { id: "draft-reading", title: "Draft reading techniques", hasContent: true },
      { id: "mean-draft", title: "Average draft calculation", hasContent: true },
      { id: "trim-correction", title: "Trim fixes", hasContent: true },
      { id: "density-correction", title: "Density correction", hasContent: true },
      { id: "deductibles", title: "Deductibles", hasContent: true },
    ],
  },
  {
    id: "bulk-cargo",
    number: 5,
    title: "Bulk Cargoes and IMSBC Code",
    icon: BarChart3,
    subtopics: [
      { id: "bulk-types", title: "Bulk cargo types", hasContent: true },
      { id: "imsbc-code", title: "IMSBC Code general structure", hasContent: true },
      { id: "tml-fmp", title: "TML and FMP concepts", hasContent: true },
      { id: "group-a-cargoes", title: "Group A loads (liquefiable)", hasContent: true },
      { id: "group-b-cargoes", title: "Group B loads (chemical hazard)", hasContent: true },
      { id: "trimming-bulk", title: "Bulk cargo trimming", hasContent: true },
      { id: "blu-code", title: "BLU Code: bulk cargo loading/unloading and ship-shore control", hasContent: true },
      { id: "hold-preparation", title: "Cargo hold preparation and cleaning", hasContent: true },
    ],
  },
  {
    id: "dangerous-goods",
    number: 6,
    title: "Dangerous Cargoes and IMDG Code",
    icon: AlertTriangle,
    subtopics: [
      { id: "imdg-classes", title: "IMDG classes and subclasses", hasContent: true },
      { id: "imdg-labeling", title: "Labeling and marking", hasContent: true },
      { id: "imdg-segregation", title: "Segregation Table", hasContent: true },
      { id: "imdg-stowage", title: "Dangerous cargo stowing rules", hasContent: true },
      { id: "imdg-docs", title: "Dangerous cargo documents", hasContent: true },
      { id: "imdg-emergency", title: "Dangerous cargo emergency response", hasContent: true },
    ],
  },
  {
    id: "container-ops",
    number: 7,
    title: "Container Operations",
    icon: Container,
    subtopics: [
      { id: "container-types", title: "Container types and sizes", hasContent: true },
      { id: "container-weight", title: "VGM (Verified Gross Mass)", hasContent: true },
      { id: "container-stowage-plan", title: "Bay plan and stowing plan", hasContent: true },
      { id: "reefer-containers", title: "Reefer containers", hasContent: true },
      { id: "oog-cargo", title: "Installs OOG (Out of Gauge)", hasContent: true },
      { id: "container-inspection", title: "Container inspection and control", hasContent: true },
    ],
  },
  {
    id: "tanker-ops",
    number: 8,
    title: "Tanker Operations",
    icon: Droplets,
    subtopics: [
      { id: "tanker-types", title: "Tanker types", hasContent: true },
      { id: "loading-discharging", title: "Loading and unloading operation", hasContent: true },
      { id: "ullage-sounding", title: "Ullage and sounding measurements", hasContent: true },
      { id: "cargo-calc-tanker", title: "Tanker load calculations", hasContent: true },
      { id: "tank-cleaning", title: "Tank cleaning and COW", hasContent: true },
      { id: "ig-system", title: "Inert gas system", hasContent: true },
      { id: "gas-carrier-igc", title: "Gas carriers and IGC Code (LNG/LPG)", hasContent: true },
      { id: "isgott-tanker-safety", title: "ISGOTT and tanker safety (static electricity, gas, ship-shore checklist)", hasContent: true },
    ],
  },
  {
    id: "grain-cargo",
    number: 9,
    title: "Grain Loads and Grain Code",
    icon: Scale,
    subtopics: [
      { id: "grain-code-intro", title: "International Grain Code structure", hasContent: true },
      { id: "grain-shift", title: "Grain shifting and surface effect", hasContent: true },
      { id: "grain-heeling-moment", title: "Volumetric Heeling Moment", hasContent: true },
      { id: "grain-stability-criteria", title: "Grain stability criteria", hasContent: true },
      { id: "grain-securing", title: "Securing the grain load", hasContent: true },
      { id: "grain-loading-plan", title: "Preparation of grain loading plan", hasContent: true },
    ],
  },
  {
    id: "special-cargoes",
    number: 10,
    title: "Special Loads",
    icon: Ship,
    subtopics: [
      { id: "timber-deck", title: "Timber deck loads", hasContent: true },
      { id: "load-line-marks", title: "Load line markings (TF/F/T/S/W/WNA)", hasContent: true },
      { id: "livestock", title: "Live animal transportation", hasContent: true },
      { id: "ro-ro-cargo", title: "Ro-Ro cargo operations", hasContent: true },
      { id: "steel-cargo", title: "Steel and heavy load handling", hasContent: true },
      { id: "project-cargo", title: "Project loads", hasContent: true },
    ],
  },
  {
    id: "cargo-care",
    number: 11,
    title: "Cargo Maintenance and Damage Prevention",
    icon: Shield,
    subtopics: [
      { id: "cargo-damage-types", title: "Load damage types", hasContent: true },
      { id: "sweat-damage", title: "Sweat damage (Ship vs Cargo Sweat)", hasContent: true },
      { id: "moisture-control", title: "Humidity control and dew point", hasContent: true },
      { id: "cargo-claims", title: "Cargo damage claims and liability", hasContent: true },
      { id: "hague-visby", title: "Hague-Visby rules", hasContent: true },
    ],
  },
  {
    id: "cargo-safety-regs",
    number: 12,
    title: "Cargo securing and International Rules",
    icon: BookMarked,
    subtopics: [
      { id: "solas-cargo", title: "SOLAS Chapters VI and VII", hasContent: true },
      { id: "marpol-cargo", title: "MARPOL and cargo operations", hasContent: true },
      { id: "psc-cargo-findings", title: "PSC load inspections and findings", hasContent: true },
      { id: "ism-cargo", title: "ISM Code and cargo operations", hasContent: true },
      { id: "cargo-incidents", title: "Cargo accidents and lessons learned", hasContent: true },
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
  // BÖLÜM 1 - YÜK ELLEÇLEME TEMELLERİ
  // =====================================================
  "cargo-handling-def": {
    title: "Definition and Importance of Cargo Handling",
    introduction: "Cargo handling is a maritime operation that covers the entire process of taking the cargo on board, stowing, transporting and unloading it.",
    content: `Cargo handling is the fundamental operational process of sea transport. It covers every stage from the cargo's origin to the ship, its carriage on board and its discharge at the destination.

The main aims of cargo handling:
1. Carrying the cargo without damage
2. Preserving the ship's stability
3. Conducting the operation safely
4. Efficiency in time and cost

The main stages of the handling process:
- Pre-stowage planning
- The loading operation
- Cargo care at sea
- The discharging operation

The master is responsible overall for cargo operations. The chief officer manages the day-to-day cargo operations and prepares the loading plan.

Three fundamental constraints are considered in cargo operations: the ship's structural strength, its stability and its trim. All three parameters must be kept within safe limits at the same time.`,
    bulletPoints: [
      "Cargo handling = the entire process of loading + transport + unloading",
      "The Master has overall responsibility, the chief officer has operational responsibility",
      "Structural strength, stability and trim are checked simultaneously",
      "Cargo plan is prepared for each voyage",
    ],
    keyPoints: [
      "The loading plan must be completed before starting the operation",
      "Stability calculations should be checked in every intermediate loading situation.",
      "Cargo operations are subject to international rules (SOLAS, IMDG, IMSBC)",
    ],
  },
  "cargo-types": {
    title: "Load Types and Classification",
    introduction: "Cargoes transported by sea are classified according to their physical properties, mode of transportation and hazard classes.",
    content: `BY PHYSICAL PROPERTIES:
1. General cargo: cargo in pieces, packaged or bundled. Cases, drums, pallets.
2. Dry bulk: granular, unpackaged. Grain, coal, ore, cement.
3. Liquid bulk: liquids carried in tanks. Crude oil, chemicals, vegetable oils.
4. Gas cargoes: LNG, LPG, ammonia.

BY METHOD OF CARRIAGE:
- Containerised cargo (FCL/LCL)
- Ro-Ro cargo (wheeled vehicles)
- Heavy lift
- Project cargo
- Refrigerated cargo (reefer cargo)

BY HAZARD CLASS (IMDG):
- Class 1: Explosives
- Class 2: Gases
- Class 3: Flammable liquids
- Class 4: Flammable solids
- Class 5: Oxidizers
- Class 6: Toxic substances
- Class 7: Radioactive material
- Class 8: Corrosives
- Class 9: Miscellaneous dangerous substances`,
    bulletPoints: [
      "Bulk dry, bulk liquid, general cargo and gas are the main categories",
      "IMDG Code defines 9 hazard classes",
      "Mode of transport determines ship type",
      "Each type of cargo has its own specific handling procedure",
    ],
    keyPoints: [
      "Load classification is critical for correct equipment and procedure selection",
      "Dangerous loads are subject to special labeling and separation rules",
      "Load characteristic directly affects stowing plan",
    ],
  },
  "cargo-planning": {
    title: "Load Planning Principles",
    introduction: "Load planning is the systematic preparation process to ensure safe and efficient loading of the ship.",
    content: `Cargo planning takes the following factors into account:

1. SHIP CAPACITY:
- Deadweight capacity (DWT)
- Hold volumes (bale/grain capacity)
- Deck cargo capacity
- Tank capacities

2. STABILITY REQUIREMENTS:
- The minimum GM value
- Maximum KG limits
- Trim limits
- The FSE calculation

3. STRUCTURAL STRENGTH:
- The tank top load density limit (t/m²)
- Deck load limits
- Hatch cover strength
- Longitudinal strength (SF and BM)

4. DISCHARGE SEQUENCE:
- On a multi-port rotation, stowing cargo from the bottom up and from aft forward
- The "first in, last out" principle
- Stability checks at intermediate ports

5. COMPATIBILITY:
- Compatibility of the cargoes with each other
- The dangerous goods segregation table
- The risk of sweat and contamination`,
    bulletPoints: [
      "Cargo plan is prepared according to DWT, volume, stability and structural limits",
      "Evacuation order is taken into account",
      "Load compatibility is checked",
      "All stages are calculated, including intermediate states",
    ],
    keyPoints: [
      "Loading plan is not implemented without Master's approval",
      "Stability must be within safe limits in every loading situation",
      "Longitudinal strength (shear force and bending moment) should be checked",
    ],
    warnings: [
      "Exceeding the structural limits can break the ship's back",
      "Loading must not begin before a stability check has been made",
    ],
  },
  "cargo-docs": {
    title: "Cargo Documents and Documentation",
    introduction: "Documents used in cargo operations are mandatory for legal, commercial and operational tracking of the cargo.",
    content: `THE PRINCIPAL CARGO DOCUMENTS:

1. BILL OF LADING (B/L):
The formal document evidencing that the cargo has been taken on board, and constituting the contract of carriage. It has three functions: a receipt for the cargo, evidence of the contract of carriage and a document of title.

2. CARGO PLAN / STOWAGE PLAN:
The technical drawing showing where the cargoes are stowed on the ship. It shows the distribution of cargo by hold, deck and tank.

3. CARGO MANIFEST:
The list of all the cargo on board. It contains the load port, discharge port, type and quantity of cargo and the bill of lading number.

4. DG MANIFEST:
The list of dangerous goods, with the IMDG class, UN number and stowage position.

5. DRAFT SURVEY REPORT:
The calculation of the cargo quantity from the draft readings before and after loading.

6. TALLY SHEET:
The count of break-bulk cargo during loading and discharging.

7. MATE'S RECEIPT:
The first receipt evidencing that the cargo has been taken on board and its condition.

8. LETTER OF PROTEST:
The letter of objection issued when cargo is received damaged, or in circumstances such as bad weather.`,
    bulletPoints: [
      "Bill of lading is the most important legal document of transportation.",
      "The loading plan is an operational reference document",
      "DG Manifest is mandatory on all ships carrying dangerous cargo",
      "Letter of Protest must be prepared and signed on time",
    ],
    keyPoints: [
      "Documents must be ready prior to upload",
      "Freight descriptions on the bill of lading should be checked carefully",
      "In case of damage, Letter of Protest must be issued immediately",
    ],
  },
  "cargo-safety-general": {
    title: "Safety in Loading Operations",
    introduction: "Loading and unloading operations are high-risk processes and require strict safety procedures.",
    content: `SAFETY BEFORE THE OPERATION:
- Checking the cleanliness of the holds and deck
- Checking the ventilation system
- The maintenance condition of cranes and equipment
- Testing the communication systems
- Reviewing the emergency plan

SAFETY DURING THE OPERATION:
- Hooking cargo and using slings
- Keeping personnel from standing under the load
- Not exceeding the safe working load (SWL)
- Observing wind speed limits
- Safety barriers at the hatch edge

PERSONAL PROTECTIVE EQUIPMENT (PPE):
- Helmet, safety shoes, gloves
- Safety harness for work at height
- Mask and protective clothing for dangerous cargoes

SOLAS REQUIREMENTS:
- Watchkeeping arrangements during cargo operations
- The permit-to-enter procedure (hold entry)
- Oxygen measurement (enclosed space)
- The fire patrol programme`,
    bulletPoints: [
      "SWL should not be exceeded, crane safety systems should be kept active",
      "Atmosphere measurement is mandatory at the entrance of closed areas",
      "Never stand under load",
      "Operation must be stopped when wind limits are exceeded",
    ],
    keyPoints: [
      "Safety always comes before operational efficiency",
      "Entry to closed areas is subject to permit procedure",
      "Constant communication between crane operator and slinger is essential",
    ],
    warnings: [
      "The risk of loss of life in enclosed space entry is high",
      "Exceeding the SWL can break the equipment and cause death",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - İSTİFLEME PRENSİPLERİ
  // =====================================================
  "stowage-principles": {
    title: "General Stacking Principles",
    introduction: "Stowage is the placement of cargo in a way that ensures safe, efficient and damage-free transportation on the ship.",
    content: `THE GOLDEN RULES OF STOWAGE:

1. SAFETY: the cargo must not shift throughout the voyage. Lashing and securing must be adequate.

2. STRUCTURAL PROTECTION: the tank top and deck load density limits must not be exceeded.

3. STABILITY: the vertical and horizontal distribution of the cargo must not adversely affect the ship's stability.

4. CARGO PROTECTION: cargoes must not damage each other or the ship's structure. Incompatible cargoes must be separated.

5. ACCESSIBILITY: cargo to be discharged at intermediate ports must be accessible.

6. EFFICIENCY: the hold volume and the deadweight capacity must be used to best advantage.

STOWAGE ORDER:
- Heavy cargo at the bottom, light cargo on top
- Fragile cargo at the very top
- Wet and dry cargoes separated
- Odorous cargoes kept away from the others

Stowing heavy cargo low down gives a low KG and therefore good stability.`,
    bulletPoints: [
      "Heavy loads are placed at the bottom, light loads at the top",
      "Incompatible loads must be separated from each other",
      "Structural load limits should never be exceeded",
      "Discharge order determines stowing plan",
    ],
    keyPoints: [
      "Stacking balances safety, stability and efficiency",
      "Appropriate dunnage should be placed under each load.",
      "Stowage plan is subject to Master approval",
    ],
  },
  "stowage-factor": {
    title: "Stowage Factor",
    introduction: "Stowage factor refers to the volume occupied by one ton of cargo on the ship and is the basic parameter of cargo planning.",
    content: `The stowage factor (SF) is the volume one tonne of cargo occupies on board.

Unit: m³/t or ft³/ton

CALCULATION:
Hold volume required = Cargo quantity (tonnes) × SF

EXAMPLE SF VALUES:
- Iron ore: 0.35 – 0.56 m³/t
- Coal: 1.10 – 1.40 m³/t
- Grain (wheat): 1.30 – 1.50 m³/t
- Grain (barley): 1.60 – 1.80 m³/t
- Timber: 1.80 – 3.00 m³/t
- Baled cotton: 1.80 – 2.50 m³/t
- Cement (bagged): 0.75 – 0.85 m³/t
- General cargo (average): 1.30 – 1.80 m³/t

A low SF = heavy cargo; the deadweight fills before the volume (deadweight cargo)
A high SF = bulky cargo; the volume fills before the deadweight (measurement cargo)

Whether the cargo will fit is checked by comparing this against the ship's bale/grain capacity.`,
    bulletPoints: [
      "SF = Volume occupied by one ton of cargo (m³/t)",
      "Low SF: Heavy load, deadweight limiting",
      "High SF: Bulky load, capacity limiting",
      "Required volume = Cargo quantity × SF",
    ],
    formula: {
      name: "Required Cargo hold Volume",
      expression: "V = W × SF",
      description: "V: Required volume (m³), W: Cargo quantity (ton), SF: Stacking factor (m³/t)",
    },
    examples: [
      {
        problem: "3,000 tonnes of wheat (SF = 1.40 m³/t) is to be loaded. What hold volume is required?",
        solution: "V = 3000 × 1.40 = 4200 m³ ambar hacmi gereklidir.",
      },
    ],
    keyPoints: [
      "SF varies depending on the packaging status of the cargo",
      "Bale capacity is used for packaged loads, grain capacity is used for bulk loads.",
      "Actual volume is found by adding Broken Stowage to SF calculation.",
    ],
  },
  "broken-stowage": {
    title: "Concept of Broken Stowage",
    introduction: "Broken stowage refers to the cargo hold volume that cannot be used due to the shape of the cargo and the cargo hold geometry.",
    content: `Broken stowage is the space unavoidably left between cargoes, and between the cargo and the hold boundaries, inside a hold.

WHY IT ARISES:
- The irregular shape of the cargo
- The corners and curvature of the hold
- Dunnage and stowage materials
- Ventilation spaces

TYPICAL BROKEN STOWAGE VALUES:
- Grain (in bulk): 2% – 5%
- Bagged cargo: 10% – 15%
- Cased cargo: 15% – 25%
- Drums: 20% – 30%
- Irregularly shaped cargo: 25% – 40%

CALCULATION:
Usable volume = Hold volume × (1 – broken stowage %)

The higher the broken stowage, the less cargo fits into the same hold. This loss must always be allowed for in the cargo plan.`,
    bulletPoints: [
      "Broken stowage = unusable space in the cargo hold",
      "2-5% for bulk cargo, 15-25% for cased cargo",
      "Available volume = Cargo hold volume × (1 – BS%)",
      "Broken stowage must be calculated in load planning.",
    ],
    formula: {
      name: "Available Volume",
      expression: "Vnet = Vambar × (1 − BS)",
      description: "Vnet: Available volume, Vambar: Cargo hold gross volume, BS: Broken stowage rate (decimal)",
    },
    examples: [
      {
        problem: "Cased cargo is to be loaded into a hold volume of 5,000 m³ (BS = 20%). What is the usable volume?",
        solution: "Vnet = 5000 × (1 – 0.20) = 5000 × 0.80 = 4000 m³",
      },
    ],
  },
  "cargo-compatibility": {
    title: "Load Compatibility Table",
    introduction: "The transport of different loads in the same cargo hold or in adjacent cargo holds is subject to compatibility rules.",
    content: `REASONS FOR CARGO INCOMPATIBILITY:
- Transfer of odour (taint)
- The effect of moisture and sweat
- Chemical reaction
- Differences in temperature

EXAMPLES OF INCOMPATIBLE CARGOES:
- Tea and rubber (odour transfer)
- Cement and sugar (moisture and dust)
- Grain and chemicals (contamination)
- Fruit and onions (odour)

LEVELS OF SEGREGATION:
1. The same hold: compatible cargoes can be loaded side by side
2. Different holds: incompatible cargoes are put in separate holds
3. Separate compartments: separated by a deck or a bulkhead
4. A different ship: must never be carried on the same ship

For dangerous goods the IMDG Code segregation table applies.`,
    bulletPoints: [
      "Odor, moisture and chemical compatibility should be checked",
      "Incompatible loads are placed in separate cargo holds",
      "IMDG separation table is mandatory for dangerous cargoes",
      "Food loads should be kept away from chemicals",
    ],
    keyPoints: [
      "Load compatibility is the key parameter of the loading plan",
      "Contamination damage could make the ship financially liable",
      "The chief officer must check the compatibility table",
    ],
  },
  "ventilation": {
    title: "Cargo hold Ventilation",
    introduction: "Hold ventilation is the procedure implemented to prevent cargo sweating damage and maintain a safe atmosphere.",
    content: `THE PURPOSE OF VENTILATION:
1. To prevent sweat damage
2. To remove carbon dioxide, methane and other gases
3. Temperature control
4. To slow deterioration in grain and organic cargoes

TYPES OF VENTILATION:
- Natural ventilation: wind ventilators
- Mechanical ventilation: forced air circulation by fans

THE THREE-RULE SYSTEM:
The decision is made by comparing dew points:

Rule 1: Outside air dew point < cargo temperature → ventilate
Rule 2: Outside air dew point > cargo temperature → do not ventilate
Rule 3: Sailing from a warm region to a cold one → ventilate; from cold to warm → ventilation may be shut down

SHIP SWEAT:
When the ship's steel structure cools, the moist hold air condenses on the shell plating. It drips onto the cargo below.

CARGO SWEAT:
Warm moist air condenses on a cold cargo surface.`,
    bulletPoints: [
      "Dew point comparison determines ventilation decision",
      "Ship sweating: Occurs when the steel structure cools",
      "Load transpiration: Occurs when hot air comes into contact with cold load",
      "Ventilation is of particular importance in grain loads",
    ],
    keyPoints: [
      "A ventilation log should be kept and recorded.",
      "Ventilation closes in rainy weather",
      "Dew point measurements should be made regularly",
    ],
  },
  "dunnage": {
    title: "Dunnage Usage",
    introduction: "Dunnage is the protective material used to separate cargo from the cargo hold floor, walls and other cargo.",
    content: `TYPES OF DUNNAGE:
- Wooden boards and pieces of timber
- Polythene sheeting
- Kraft paper
- Air bags / dunnage bags
- Rubber mats

THE PURPOSES OF DUNNAGE:
1. Protection from moisture: separating the cargo from tank top sweat
2. Ventilation: providing air circulation under the cargo
3. Load distribution: spreading the weight evenly
4. Separation: keeping different cargoes apart
5. Friction: preventing the cargo from sliding

RULES OF APPLICATION:
- Dunnage must be clean and dry
- Timber of at least 25 mm thickness is used
- Dunnage must not obstruct the flow of cargo
- Cross-laying improves air circulation
- Thicker dunnage is used under heavy cargoes`,
    bulletPoints: [
      "Dunnage protects the load from moisture, friction and damage",
      "Minimum 25 mm thick wood is used",
      "Cross flooring provides air circulation",
      "Clean and dry materials should be used",
    ],
    keyPoints: [
      "Dunnage cost is much lower than cargo damage compensation",
      "Adequate dunnage stock should be checked before each loading.",
      "The use of appropriate dunnage is important for insurance",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - LASHING & SECURING
  // =====================================================
  "lashing-principles": {
    title: "Binding Principles and Forces",
    introduction: "Load lashing is the procedure applied to keep the load constant against the acceleration forces acting on the load in sea conditions.",
    content: `THE FORCES ACTING ON CARGO AT SEA:
The motion of the ship subjects the cargo to acceleration forces in three directions:

1. TRANSVERSE FORCES:
Caused by rolling. These are the largest forces.
Typical value: 0.5g – 0.8g (depending on the ship's length and loading condition)

2. LONGITUDINAL FORCES:
Caused by pitching and wave impact.
Typical value: 0.3g – 0.5g

3. VERTICAL FORCES:
Caused by heaving.
Typical value: 0.2g – 0.5g

THE SECURING PRINCIPLE:
The total holding force of the securing equipment must be greater than the sliding forces acting on the cargo.

Safety factor: minimum 1.5

Friction also helps to resist the cargo sliding. The coefficient of friction between steel and steel is about 0.3.`,
    bulletPoints: [
      "Transverse forces create the greatest clamping requirement",
      "The binding force should be 1.5 times the sliding force",
      "The coefficient of friction is included in the calculation",
      "CSS Code determines calculation methods",
    ],
    keyPoints: [
      "Binding calculation must be made before the operation",
      "It is mandatory to check the moorings while sailing.",
      "Additional tying can be done before bad weather",
    ],
    warnings: [
      "Inadequate securing leads to the cargo shifting and toppling",
      "The SWL of the securing equipment must not be exceeded",
    ],
  },
  "css-code": {
    title: "CSS Code Requirements",
    introduction: "CSS Code (Code of Safe Practice for Cargo Stowage and Securing) is the cargo stowing and lashing safety rules published by IMO.",
    content: `THE STRUCTURE OF THE CSS CODE:
A code of practice adopted by IMO Resolution A.714(17) and updated regularly.

THE BASIC REQUIREMENTS:
1. Cargo Securing Manual (CSM): a mandatory document on every ship. It defines the securing arrangements specific to the ship.
2. Securing points: the capacities of the securing elements on the ship, such as D-rings, pad eyes and bollards, must be documented.
3. Securing equipment: the MSL (Maximum Securing Load) values of chains, wire ropes, turnbuckles and lashing bars are recorded.

ANNEXES TO THE CSS CODE:
- Annex 1: principles of safe stowage
- Annex 5: securing semi-standardised cargo
- Annex 12: container safety
- Annex 13: the method for calculating securing forces (the advanced calculation)

THE ANNEX 13 CALCULATION METHOD:
It compares the effect of the acceleration forces on the cargo with the capacity of the securing equipment to resist them.`,
    bulletPoints: [
      "Cargo Securing Manual (CSM) is mandatory on every ship",
      "The capacities of the mooring points must be documented",
      "MSL values must be stated on the equipment",
      "Annex 13 defines forward linking calculations",
    ],
    keyPoints: [
      "CSM is prepared specifically for the ship and requires class approval.",
      "CSM and its application are checked in PSC inspections",
      "CSM must be updated whenever new equipment is added",
    ],
  },
  "lashing-equipment": {
    title: "Securing Equipment",
    introduction: "Cargo lashing equipment are materials that each have a certain capacity (MSL) and secure the cargo to the ship.",
    content: `THE PRINCIPAL SECURING EQUIPMENT:

1. LASHING CHAIN:
- High-strength steel
- Grade 80 or Grade 100
- MSL: 50% of the breaking load

2. WIRE ROPE:
- 6×19 or 6×37 construction
- MSL: 80% of the breaking load (with a turnbuckle)
- Usually for heavy lift cargoes

3. WEBBING STRAP:
- Polyester or polypropylene
- MSL: stated on the label
- Light and medium weight cargoes

4. TURNBUCKLE:
- The means of tensioning the lashing
- The bottle screw type is common
- Requires periodic maintenance

5. LASHING BAR / ROD:
- Steel bar lashing
- Common in container securing

6. SECURING POINTS:
- D-ring, pad eye, cleat
- The SWL values are shown on the ship's plan
- Regular inspection and maintenance are mandatory`,
    bulletPoints: [
      "Chain MSL: 50% of breaking load",
      "Wire rope MSL: 80% of breaking load",
      "The MSL label of each equipment must be read",
      "Damaged equipment should not be used",
    ],
    keyPoints: [
      "MSL values are determined according to CSS Code",
      "Equipment maintenance and certification is mandatory",
      "The clamping angle reduces the effective force (force = MSL × cos θ)",
    ],
  },
  "lashing-calc": {
    title: "Binding Force Calculations",
    introduction: "Lashing force calculation compares the shear forces acting on the load and the resisting capacity of the lashing equipment.",
    content: `THE BASIC CALCULATION PRINCIPLE:

Total securing capacity ≥ Safety factor × Sliding force

SLIDING FORCE:
Fsliding = m × a − μ × m × g × cos θ

where:
m: mass of the cargo (tonnes)
a: acceleration (m/s²) – from the CSS Code tables
μ: coefficient of friction
g: acceleration due to gravity (9.81 m/s²)
θ: deck inclination

EFFECTIVE SECURING FORCE:
This depends on the angle the lashing makes with the horizontal.
Feffective = MSL × cos α

α: the lashing angle (to the horizontal)
A small angle = a high effective force
A large angle = a low effective force

The ideal lashing angle: between 30° and 60°`,
    bulletPoints: [
      "Binding capacity should be 1.5 times the sliding force",
      "Clamping angle directly affects the effective force",
      "Frictional force reduces the need for fastening",
      "The ideal tying angle is between 30°–60°",
    ],
    formula: {
      name: "Effective Binding Force",
      expression: "Fetkin = MSL × cos α",
      description: "Fetkin: Effective horizontal force, MSL: Maximum fastening load, α: Fastening angle",
    },
    examples: [
      {
        problem: "A lashing strap with an MSL of 100 kN is applied at an angle of 45°. What is the effective force?",
        solution: "Fetkin = 100 × cos 45° = 100 × 0.707 = 70.7 kN",
      },
    ],
    keyPoints: [
      "As the clamping angle decreases, the effective force increases",
      "The binding on both sides must be symmetrical",
      "Calculation results must be recorded in CSM",
    ],
  },
  "container-lashing": {
    title: "Container Lashing Systems",
    introduction: "Container lashing is performed with standard equipment such as twist lock, lashing bar and stacking cone.",
    content: `CONTAINER SECURING EQUIPMENT:

1. TWIST LOCK (manual & automatic):
The locking mechanism that secures containers to each other and to the hatch cover. A "base twist lock" is used on the bottom container and "intermediate twist locks" on those above.

2. LASHING BAR AND TURNBUCKLE:
The cross-lashing system applied to containers on deck. It is usually applied up to the 2nd and 3rd tier.

3. STACKING CONE:
Provides alignment and location when containers are stacked.

4. BRIDGE FITTING:
A bridge-type securing element placed between two containers.

HEIGHT LIMITS:
- In the hold: usually 5-9 tiers
- On deck: 4-6 tiers (depending on the ship type)
- Weight limits apply to the upper tiers

Heavy containers are stowed low and light ones high.
Reefer containers are kept in positions where the power connections are accessible.`,
    bulletPoints: [
      "Twist lock is the most basic container fastening element",
      "Above deck 2nd–3rd. Lashing bar is applied up to",
      "Heavy containers are placed at the bottom, light ones are placed at the top",
      "Reefer containers are positioned close to the electrical connection",
    ],
    keyPoints: [
      "Automatic twist lock speeds up operation",
      "The certificate of Lashing bars should be checked",
      "VGM (Verified Gross Mass) information is used in the stowing plan",
    ],
  },
  "heavy-lift-lashing": {
    title: "Heavy Load Lashing",
    introduction: "Heavy loads (heavy lifts) are loads that require special calculations and equipment beyond standard fastening methods.",
    content: `DEFINITION OF HEAVY LIFT:
Generally cargoes weighing more than 50 tonnes as a single piece. Transformers, generators, industrial equipment and cranes fall into this category.

DECK STRENGTH:
The first check for a heavy lift is the strength of the deck or the tank top.
Load per unit area: cargo weight / base area ≤ the permissible load density (t/m²)

Spreader plates are placed under the cargo if necessary.

SECURING CALCULATION:
For heavy lifts the detailed calculation method of CSS Code Annex 13 is applied.

The sliding forces are calculated in three directions (transverse, longitudinal and vertical) and the securing arrangement is designed accordingly.

SECURING ARRANGEMENT:
- Lashings from at least 4 corners
- Welded pads may be used
- A chain plus turnbuckle combination is common
- Regular checks at sea after securing

STOPPERS AND CHOCKS:
Steel stoppers or wooden chocks are fitted to prevent the cargo sliding.`,
    bulletPoints: [
      "Deck strength is the first check point",
      "Spreader plate provides load distribution",
      "CSS Code Annex 13 calculation method is applied",
      "Stopper and chock are used to prevent slipping",
    ],
    keyPoints: [
      "Stability in heavy cargo operations must be calculated in advance",
      "Use of welding pad may be subject to class approval",
      "The mooring order is determined by the coordination of the Master and the terminal.",
    ],
    warnings: [
      "If the deck strength is exceeded there is a risk of structural damage",
      "GM can fall to a critical level during a heavy lift",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - DRAFT SURVEY
  // =====================================================
  "draft-survey-intro": {
    title: "Draft Survey Purpose and Principle",
    introduction: "Draft survey is a method of calculating the amount of cargo loaded or unloaded based on the change in draft of the ship.",
    content: `A draft survey is based on Archimedes' principle:

The weight of the water a body displaces is equal to the weight of that body.

THE PRINCIPLE:
The ship's displacement is calculated before and after loading. The difference gives the quantity of cargo.

Cargo quantity = Displacement (after) − Displacement (before) − the difference in the deductibles

STEPS:
1. Initial draft readings: forward, aft and midships
2. Calculating the mean draft from the readings
3. Trim and hogging/sagging corrections
4. Reading the displacement from the hydrostatic tables
5. Density correction
6. Deductibles such as ballast, fuel and fresh water
7. Final draft readings and a repeat of the same calculations
8. Calculating the net cargo quantity

The draft survey is the most common method of establishing the commercial quantity of bulk cargoes.`,
    bulletPoints: [
      "Draft survey is based on Archimedes principle",
      "Load = Final displacement − Initial displacement − Deductions",
      "6 points are read: proof, pupa and middle.",
      "It is the standard quantity determination method in bulk cargo trade.",
    ],
    keyPoints: [
      "Draft survey can be done by an independent surveyor",
      "It is a reference document in commercial disputes",
      "Accuracy is within ±0.5% (under good conditions)",
    ],
  },
  "draft-reading": {
    title: "Draft Reading Techniques",
    introduction: "Draft readings are the draft measurements made from the starboard and port side of the ship at the bow (head), stern and midpoints.",
    content: `READING POINTS:
The draft is read at 6 points:
- Forward starboard (FS), forward port (FP)
- Midships starboard (MS), midships port (MP)
- Aft starboard (AS), aft port (AP)

MEANS:
dF = (FS + FP) / 2
dM = (MS + MP) / 2
dA = (AS + AP) / 2

READING RULES (METRIC SYSTEM):
- The bottom edge of the figure: the value of the figure
- The middle of the figure: the figure + 5 cm
- The top edge of the figure: the figure + 10 cm

READING DIFFICULTIES:
- Averaging in waves and swell
- Night readings (lighting required)
- Marine growth and blistered paint
- Parallax error (the observer's angle)

It is important that the readings are taken at the same time. Readings must not be taken while ballast transfer or loading is in progress.`,
    bulletPoints: [
      "Simultaneous reading is made from 6 points",
      "The net value is found by averaging the wave",
      "Metric and imperial reading rules are different",
      "Reading should not be taken during ballast transfer",
    ],
    keyPoints: [
      "Accurate reading is the basis of correct calculation",
      "Adequate lighting should be provided for night readings.",
      "Every reading should be recorded",
    ],
  },
  "mean-draft": {
    title: "Average Draft Calculation",
    introduction: "Average draft aims to arrive at a single representative draft value, taking into account the ship's trim and pitch.",
    content: `THREE MEAN METHODS:

1. MEAN OF MEANS:
dmean = (dF + dM + dA) / 3
Used only where the ship is upright and without deflection.

2. QUARTER MEAN DRAFT:
dQM = (dF + 6 × dM + dA) / 8
Gives a more accurate result where there is hogging or sagging.

3. THE CORRECTED MEAN:
The draft value after the trim correction has been applied.

DETECTING HOGGING AND SAGGING:
- Hogging: (dF + dA) / 2 > dM → the ship is arched upwards amidships
- Sagging: (dF + dA) / 2 < dM → the ship is dished downwards amidships

The quarter mean draft gives a more accurate displacement, particularly where there is marked hogging or sagging.`,
    bulletPoints: [
      "In the straight case the arithmetic mean is used",
      "If there is hogging/sagging, QM draft is preferred",
      "QM = (dF + 6×dM + dA) / 8",
      "Hogging: Middle up, Sagging: Middle down",
    ],
    formula: {
      name: "Quarter Mean Draft",
      expression: "dQM = (dF + 6 × dM + dA) / 8",
      description: "dQM: Quarter mean draft, dF: Bow draft, dM: Medium draft, dA: Stern draft",
    },
    examples: [
      {
        problem: "dF = 6.20 m, dM = 6.50 m, dA = 7.00 m. Quarter mean draft?",
        solution: "dQM = (6.20 + 6×6.50 + 7.00) / 8 = (6.20 + 39.00 + 7.00) / 8 = 52.20 / 8 = 6.525 m",
      },
    ],
  },
  "trim-correction": {
    title: "Trim Fixes",
    introduction: "Trim corrections are applied to bring the displacement read from the hydrostatic tables to the correct value when the ship is trimmed.",
    content: `TRIM:
Trim = dA − dF

TWO CORRECTIONS ARE APPLIED:

1. THE FIRST TRIM CORRECTION (Δ₁):
It arises from the difference between the LCF (the longitudinal position of the centre of flotation) and midships.

Δ₁ = (Trim × LCFmid × TPC × 100) / LBP

It can be positive or negative.

2. THE SECOND TRIM CORRECTION (Δ₂):
The correction arising from the change in the shape of the waterplane when the ship is trimmed.

Δ₂ = (Trim² × ΔMCT × 50) / LBP

It is always positive (it increases the displacement).

TOTAL DISPLACEMENT:
Δcorrected = Δtable + Δ₁ + Δ₂

The trim corrections make a significant difference particularly at large trims (more than 1 metre).`,
    bulletPoints: [
      "The first correction comes from the LCF position",
      "The second correction is always positive",
      "Total displacement = Table value + Δ₁ + Δ₂",
      "Corrections are critical on large trims",
    ],
    formula: {
      name: "First Trim Correction",
      expression: "Δ₁ = (Trim × LCF × TPC × 100) / LBP",
      description: "LCF: Distance from center of buoyancy, TPC: Ton/cm, LBP: Length between two perpendicles",
    },
  },
  "density-correction": {
    title: "Density Correction",
    introduction: "Hydrostatic tables are prepared for salty seawater (1.025 t/m³); Correction is required for water of different densities.",
    content: `The hydrostatic tables are drawn up for a density of 1.025 t/m³.

Dock water can be of a different density:
- Fresh water: 1.000 t/m³
- River estuary: 1.000 – 1.020 t/m³
- Sea water: 1.020 – 1.030 t/m³

DENSITY CORRECTION:
Δcorrected = Δtable × (ρdock / 1.025)

where:
ρdock: the density of the dock water (t/m³)

Measuring the density:
- Measured with a hydrometer
- The sample is taken from sea level
- A temperature correction may be applied

In water of lower density the ship floats deeper (reads a greater draft) but the displacement does not change.`,
    bulletPoints: [
      "Tables are prepared for 1.025 t/m³",
      "Correction of different intensity is mandatory",
      "Δflat = Δtable × (ρdock / 1.025)",
      "Density is measured with a hydrometer",
    ],
    formula: {
      name: "Density Correction",
      expression: "Δcorrected = Δtable × (ρdock / 1.025)",
      description: "ρdock: Port water density (t/m³). At low density, displacement is reduced.",
    },
    examples: [
      {
        problem: "The displacement read from the table is 15,000 tonnes and the dock water density is 1.010 t/m³. What is the corrected displacement?",
        solution: "Δ = 15000 × (1.010 / 1.025) = 15000 × 0.9854 = 14780.5 ton",
      },
    ],
  },
  "deductibles": {
    title: "Deductibles",
    introduction: "The net cargo quantity is calculated by deducting the weight of ballast, fuel, fresh water and other liquids from the displacements calculated as a result of the draft survey.",
    content: `The net cargo calculation:
Cargo = (Δfinal − Δinitial) − (deductibles_final − deductibles_initial)

THE DEDUCTIBLE ITEMS:
1. BALLAST WATER:
Each tank is sounded or ullaged. The volume is read from the tank calibration tables and multiplied by the density to give the weight.

2. FUEL (HFO, MGO, MDO):
Each fuel tank is sounded. A density correction is applied for temperature.

3. FRESH WATER:
The level in the fresh water tanks is measured.

4. SLOP / SLUDGE:
The waste oil and slop tanks.

5. OTHER:
The constant (fixed weight): crew, provisions, paint, spare parts, etc. Generally taken as constant at every survey.

MEASUREMENT ACCURACY:
- Every tank is measured separately
- Temperature corrections are applied
- Ballast tanks are kept full or empty where possible
- The ballast remaining on board (ROB) is calculated carefully`,
    bulletPoints: [
      "Ballast, fuel, fresh water and fixed items are deducted",
      "Each tank is measured separately",
      "Temperature correction is mandatory for fuel",
      "Constant value is generally considered constant",
    ],
    keyPoints: [
      "Deductibles error directly affects the cargo quantity",
      "It should be checked that ballast tanks are empty",
      "Fuel density must be corrected for temperature",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - DÖKME YÜKLER VE IMSBC CODE
  // =====================================================
  "bulk-types": {
    title: "Bulk Cargo Types",
    introduction: "Bulk cargoes are solid materials that have a granular structure and are loaded directly into the holds of the ship without packaging.",
    content: `THE PRINCIPAL BULK CARGOES:

1. ORES:
- Iron ore: SF ≈ 0.35–0.56 m³/t
- Bauxite, manganese, nickel
- Very heavy, deadweight limiting

2. COAL:
- SF ≈ 1.10–1.40 m³/t
- Risk of spontaneous combustion
- Emission of methane gas

3. GRAINS:
- Wheat, maize, barley, soya
- SF ≈ 1.30–1.80 m³/t
- Risk of shifting (the Grain Code applies)

4. CEMENT:
- Bagged or in bulk
- Moisture sensitive, watertight packaging

5. FERTILISER:
- Urea, ammonium nitrate
- Some fall under the IMDG Code

6. MINERALS:
- Sand, gravel, limestone
- Low SF, structural strength must be checked

The IMSBC Code divides all bulk cargoes into three groups:
- Group A: cargoes that may liquefy
- Group B: cargoes with a chemical hazard
- Group C: cargoes that fall into neither Group A nor Group B`,
    bulletPoints: [
      "Ores are very heavy (low SF), grains are bulky (high SF)",
      "Coal poses risk of spontaneous combustion and methane",
      "IMSBC Code divides bulk cargo into groups A, B, C",
      "Group A loads carry the risk of liquefaction",
    ],
    keyPoints: [
      "The data sheet of each bulk cargo in the IMSBC Code should be checked",
      "The moisture content of the cargo must be determined before loading.",
      "TML and FMP certificates are mandatory for Group A loads",
    ],
  },
  "imsbc-code": {
    title: "IMSBC Code General Structure",
    introduction: "IMSBC Code (International Maritime Solid Bulk Cargoes Code) is the mandatory international code that regulates the safe transportation of bulk solid cargo.",
    content: `THE STRUCTURE OF THE IMSBC CODE:

Mandatory under SOLAS Chapter VI, this code sets out the rules for the safe carriage of solid bulk cargoes.

SECTIONS:
1. General provisions and definitions
2. General precautions before loading
3. Carriage and points to watch
4. Assessment of bulk cargo hazards
5. Trimming
6. Individual schedules for each cargo

CARGO GROUPS:
- Group A: cargoes that may liquefy (nickel ore, iron ore fines, etc.)
- Group B: chemical hazard (DRI, sulphur, coal, etc.)
- Group C: the others (sand, stone, etc.)
- Some cargoes fall into more than one group (A and B)

EACH CARGO HAS A DATA SHEET CONTAINING:
- A description of the cargo and its properties
- The hazard class
- Stowage and segregation rules
- Loading limits
- Precautions during carriage
- Emergency procedures`,
    bulletPoints: [
      "Required by SOLAS Chapter VI",
      "Each load has its own data sheet",
      "Loads are divided into groups A, B and C",
      "The code is updated regularly (amendments)",
    ],
    keyPoints: [
      "The IMSBC data sheet must be examined before loading.",
      "Flag state permit is required for cargo not covered by the code",
      "IMSBC compliance is checked during PSC inspections",
    ],
  },
  "tml-fmp": {
    title: "TML and FMP Concepts",
    introduction: "TML (Transportable Moisture Limit) and FMP (Flow Moisture Point) are critical parameters used to evaluate the liquefaction risk of bulk cargoes.",
    content: `WHAT IS LIQUEFACTION?
Some bulk cargoes (fine-grained minerals and ores) can begin to behave like a liquid under the vibration and motion of the ship. This causes the cargo to shift to one side and the ship to capsize.

FMP (Flow Moisture Point):
The moisture content at which the cargo begins to flow like a liquid.
It is determined by laboratory tests.

TML (Transportable Moisture Limit):
The maximum moisture content at which the cargo can be carried safely.
TML = FMP × 0.9 (90% of the FMP)

THE CONTROL MECHANISM:
1. The shipper provides the moisture content of the cargo and the TML certificate
2. The actual moisture content of the cargo must be ≤ TML
3. If the moisture content exceeds the TML the cargo is rejected or dried

THE CAN TEST (a practical test):
A can is half filled with the cargo and struck on a table 25 times. If free moisture appears on the surface the cargo must not be loaded.`,
    bulletPoints: [
      "Liquefaction = Bulk cargo acting like a liquid",
      "TML = FMP × 0.9",
      "Moisture content must be ≤ TML",
      "Life test is a practical control method",
    ],
    formula: {
      name: "Portable Humidity Limit",
      expression: "TML = FMP × 0.9",
      description: "TML: Portable humidity limit (%), FMP: Fluid humidity point (%).",
    },
    keyPoints: [
      "TML certificate must be obtained before loading",
      "Can test is a simple but effective control method",
      "Installing under rain can increase humidity",
    ],
    warnings: [
      "Cargo with a moisture content above the TML must never be loaded",
      "Liquefaction happens suddenly and can capsize the ship",
    ],
  },
  "group-a-cargoes": {
    title: "Group A Loads (Liquefiable)",
    introduction: "Group A cargoes are bulk cargoes that pose a risk of liquefaction above a certain humidity level and must be transported with special precautions.",
    content: `EXAMPLES OF GROUP A CARGOES:
- Nickel ore
- Iron ore fines
- Bauxite (some types)
- Fluorspar
- Certain concentrates (copper, zinc, lead)

CHECKS BEFORE LOADING:
1. The shipper's declaration
2. The TML certificate (from an accredited laboratory)
3. The moisture content test result
4. Visual and tactile inspection of the cargo
5. Carrying out the can test

PRECAUTIONS DURING THE VOYAGE:
- Keeping the hold ventilation closed
- Checking the cargo surface regularly (where possible)
- Keeping the bilge pumps operational
- Changing route according to the weather

PAST CASUALTIES:
The capsizing of ships loaded with nickel ore led to the Group A cargo rules in the IMSBC Code being tightened.`,
    bulletPoints: [
      "Nickel ore and fine iron ore are the riskiest Group A cargoes",
      "TML certification and moisture test are mandatory",
      "Life test should be applied before loading",
      "Past accidents have led to tightening of rules",
    ],
    keyPoints: [
      "The Master has the right to refuse the cargo",
      "Loading in the rain should be avoided",
      "Cargo hold bilge pump system should be checked",
    ],
    warnings: [
      "The liquefaction of Group A cargoes has caused the most fatal cargo casualties worldwide",
      "Loading must NEVER take place when the moisture limit is exceeded",
    ],
  },
  "group-b-cargoes": {
    title: "Group B Cargoes (Chemical Hazard)",
    introduction: "Group B loads are bulk solid loads that pose chemical hazards and are subject to special transportation rules.",
    content: `EXAMPLES OF GROUP B CARGOES AND THEIR HAZARDS:

1. COAL:
- Emission of methane gas (risk of explosion)
- Self-heating (spontaneous combustion)
- Oxygen depletion (enclosed space hazard)

2. DRI (Direct Reduced Iron):
- Produces hydrogen on contact with water
- Risk of spontaneous combustion

3. SULPHUR:
- Formation of combustible dust
- Emission of SO₂ gas
- Risk of static electricity

4. FERTILISERS:
- Ammonium nitrate: explosive potential
- Urea: moisture sensitive

COMMON PRECAUTIONS:
- Hold inspection before loading
- Preparing the gas measuring instruments
- The enclosed space procedure for hold entry
- Fire prevention measures
- Compliance with the ventilation rules`,
    bulletPoints: [
      "Coal: Risk of methane, self-heating and oxygen depletion",
      "DRI: Produces hydrogen on contact with water",
      "Sulfur: Risk of flammable dust and SO₂",
      "Gas measuring devices should be kept ready",
    ],
    keyPoints: [
      "The IMSBC data sheet for Group B loads should be read carefully",
      "Confined space entry procedure must be followed",
      "Fire detectors should be kept active",
    ],
    warnings: [
      "The oxygen level in a coal hold can fall; entry can be fatal",
      "If water reaches DRI cargo there is a risk of explosion",
    ],
  },
  "trimming-bulk": {
    title: "Bulk Cargo Trimming",
    introduction: "Trimming is the leveling process performed to ensure proper distribution of bulk cargo within the cargo hold.",
    content: `THE PURPOSE OF TRIMMING:
Bulk cargo piles up in a cone. A heap forms under the loading conveyor and the sides of the hold are left empty. This:
- Increases the risk of the cargo shifting
- Can cause local structural overloading
- Prevents the full capacity of the hold being used

THE SOLAS REQUIREMENT:
SOLAS Chapter VI, Regulation 6: bulk cargoes must be trimmed reasonably level to the boundaries of the hold.

METHODS OF TRIMMING:
1. Mechanical trimming: with a bulldozer or a bucket
2. Conveyor movement: moving the loading conveyor
3. Levelling with a grab: levelling with the crane grab

WHY IT MATTERS:
Untrimmed cargo can shift at sea and, even if it does not capsize the ship, can cause a dangerous list.

Trimming is particularly critical for grain cargoes; the Grain Code sets specific trimming requirements.`,
    bulletPoints: [
      "Bulk cargo is stacked conically and leveled by trimming",
      "SOLAS requires trimming",
      "Made by mechanical, conveyor or grab",
      "Untrimmed load poses a risk of slipping",
    ],
    keyPoints: [
      "Trimming cost is much lower than stability accident",
      "Grain Code trimming rules apply to grain loads",
      "The degree of trimming is stated in the IMSBC data sheet",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - TEHLİKELİ YÜKLER VE IMDG CODE
  // =====================================================
  "imdg-classes": {
    title: "IMDG Classes and Subclasses",
    introduction: "IMDG Code divides dangerous cargo into 9 main classes. Each class has its own hazard characteristics, stowing and tying rules.",
    content: `IMDG HAZARD CLASSES:

Class 1: EXPLOSIVES
1.1 – Mass explosion hazard
1.2 – Projection hazard
1.3 – Fire hazard
1.4 – Minor explosion hazard
1.5 – Very insensitive explosives
1.6 – Extremely insensitive

Class 2: GASES
2.1 – Flammable gases
2.2 – Non-flammable, non-toxic gases
2.3 – Toxic gases

Class 3: FLAMMABLE LIQUIDS
No subdivisions. The packing group is determined by the flash point.

Class 4: FLAMMABLE SOLIDS
4.1 – Flammable solids
4.2 – Substances liable to spontaneous combustion
4.3 – Substances which emit flammable gases on contact with water

Class 5: OXIDIZERS
5.1 – Oxidizing substances
5.2 – Organic peroxides

Class 6: TOXIC SUBSTANCES
6.1 – Toxic
6.2 – Infectious

Class 7: RADIOACTIVE MATERIAL

Class 8: CORROSIVE SUBSTANCES

Class 9: MISCELLANEOUS DANGEROUS SUBSTANCES`,
    bulletPoints: [
      "9 main classes and many subclasses available",
      "Every substance has a UN number",
      "Packaging group (PG I, II, III) indicates the hazard level",
      "Detailed information can be obtained from the UN number and IMDG Code.",
    ],
    keyPoints: [
      "UN number is the dangerous cargo identification key",
      "Even substances in the same class may be subject to different rules",
      "IMDG Code is updated every two years",
    ],
  },
  "imdg-labeling": {
    title: "Labeling and Marking",
    introduction: "Correct labeling and marking of dangerous cargo is mandatory for safe handling and emergency response.",
    content: `LABELLING REQUIREMENTS:

1. HAZARD LABELS:
A hazard label appropriate to the class is affixed to every package.
- Label size: minimum 100 × 100 mm
- A square set on a point (diamond) shape
- A colour and symbol specific to the class

2. PLACARDS:
Affixed to containers and tanks.
- Size: minimum 250 × 250 mm
- On all four sides of the container

3. UN NUMBER:
The four-digit identification number of every dangerous substance.
Example: UN 1203 = Gasoline

4. PROPER SHIPPING NAME:
The substance's official transport name in the IMDG Code.

5. MARKS:
- The marine pollutant mark
- Orientation arrows (this way up)
- Limited/excepted quantity marks`,
    bulletPoints: [
      "Hazard label minimum size 100×100 mm",
      "Container placard is pasted on four sides",
      "UN number must be visible on every package",
      "Proper Shipping Name is written according to IMDG Code",
    ],
    keyPoints: [
      "Incomplete or incorrect labeling is a reason for PSC detention",
      "Emergency response team recognizes danger from the tag",
      "Marine pollutant sign indicates environmental risk",
    ],
  },
  "imdg-segregation": {
    title: "Segregation Table",
    introduction: "IMDG Code segregation table determines the minimum distance between different classes of dangerous cargo on the ship.",
    image: "/diagrams/seamanship/imdg-ayrim.svg",
    content: `SEGREGATION LEVELS (from the lowest to the highest):

1. "AWAY FROM":
In different holds, or 3 m apart horizontally in the same hold.

2. "SEPARATED FROM":
In different holds or compartments. A minimum of 6 m horizontal separation on deck.

3. "SEPARATED BY A COMPLETE COMPARTMENT":
There must be at least one complete compartment (hold) between them.

4. "SEPARATED LONGITUDINALLY":
Separated by at least one intervening hold plus a deck, OR a minimum of 24 m horizontal separation.

USING THE SEGREGATION TABLE:
The IMDG classes appear in the rows and columns.
The symbol in the intersecting cell gives the level of segregation.

X = see the segregation rules (special cases)
1 = Away from
2 = Separated from
3 = Separated by a complete compartment
4 = Separated longitudinally`,
    bulletPoints: [
      "4 discrimination levels available (1 lowest, 4 highest)",
      "The table is read according to the intersection of IMDG classes",
      "Different rules may apply for above and below deck",
      "X sign requires exception check",
    ],
    keyPoints: [
      "The separation table is the basic reference of the loading plan",
      "Incorrect discrimination is a cause of PSC detention and insurance violation",
      "The table should be checked from the current IMDG Code version",
    ],
    warnings: [
      "Stowing incompatible dangerous goods close together can cause fire and explosion",
      "Breaching the segregation rules has serious legal consequences",
    ],
  },
  "imdg-stowage": {
    title: "Dangerous Cargo Stacking Rules",
    introduction: "Stowing of dangerous cargo is subject to special rules determined by the IMDG Code, and placement above or below deck is determined according to the class.",
    content: `STOWAGE CATEGORIES:

The IMDG Code assigns a stowage category to every substance:

Category A: on or under deck (no restriction)
Category B: on or under deck (subject to conditions)
Category C: on deck only
Category D: on deck only (special conditions)
Category E: on or under deck (special conditions)

GENERAL STOWAGE RULES:
1. A minimum distance from the accommodation must be maintained
2. It must not be stowed close to foodstuffs
3. It must be kept away from heat sources
4. It must not be exposed to sunlight (some classes)
5. Access to the fire fighting equipment must be preserved
6. The ventilation requirements must be met

ON CONTAINER SHIPS:
DG containers are marked specially on the bay plan.
Segregation distances are calculated in container lengths (TEU).`,
    bulletPoints: [
      "Stacking category varies from A to E",
      "Distance from living quarters and food is mandatory",
      "Access to fire-fighting equipment must be protected",
      "DG containers are marked on the bay plan",
    ],
    keyPoints: [
      "The stowing category of each DG substance in the IMDG Code must be checked",
      "Stacking category and separation table are applied together",
      "Loading will not be done without the Master approving the DG Manifest.",
    ],
  },
  "imdg-docs": {
    title: "Dangerous Cargo Documents",
    introduction: "Accurate and complete documentation in dangerous cargo transportation is both a legal obligation and a safety requirement.",
    content: `MANDATORY DOCUMENTS:

1. DG DECLARATION:
Prepared by the shipper. It contains the UN number, proper shipping name, class, packing group and emergency response information.

2. DG MANIFEST / LIST:
The list of all dangerous goods on board, with the stowage positions.
Mandatory under SOLAS Chapter VII.

3. CONTAINER / VEHICLE PACKING CERTIFICATE:
Certifies that the container has been packed in accordance with the IMDG rules.

4. EmS (Emergency Schedule):
The emergency response procedure for each DG substance.
Taken from the EmS Guide.

5. MFAG (Medical First Aid Guide):
The first aid guide for contact with dangerous substances.

6. SPECIAL LIST / STOWAGE PLAN:
The plan showing the positions of the DG cargoes on board.
Provided to the port authority.`,
    bulletPoints: [
      "DG Declaration is the responsibility of the installer",
      "DG Manifest is mandatory according to SOLAS",
      "EmS and MFAG are emergency guides",
      "DG stowage plan is given to port authority",
    ],
    keyPoints: [
      "Lack of documentation leads to loading rejection",
      "The installer who makes a false declaration is legally responsible",
      "Documents must be kept in an accessible place on board",
    ],
  },
  "imdg-emergency": {
    title: "Dangerous Cargo Emergency Response",
    introduction: "Correct and rapid intervention in dangerous cargo accidents is critical to prevent loss of life and property.",
    content: `TYPES OF EMERGENCY:
1. Fire (the most common)
2. Leakage / spillage
3. Chemical exposure
4. Risk of explosion

USING EmS:
Every dangerous substance has a two-part EmS code:
- F (Fire): the fire fighting procedure
- S (Spillage): the spillage response procedure

Example: EmS F-A, S-A

RESPONSE PRINCIPLES:
1. Crew safety comes before everything else
2. Stay upwind
3. Appropriate PPE must be worn
4. Contaminated water must be prevented from running into the sea (MARPOL)
5. The regional MRCC must be informed

THE MUSTER LIST:
A special allocation of duties for DG emergencies must appear in the muster list.

DRILLS:
DG emergency drills must be held regularly.`,
    bulletPoints: [
      "The EmS code consists of parts F (fire) and S (spill)",
      "Crew safety is top priority",
      "Stay above wind and wear appropriate PPE",
      "MRCC must be notified immediately",
    ],
    keyPoints: [
      "EmS Guide and MFAG should be kept ready on the bridge",
      "DG emergency drills should be held regularly",
      "In case of pollution to the sea, MARPOL notification is mandatory.",
    ],
    warnings: [
      "Using the wrong extinguishing agent can make the situation worse",
      "Responding to a DG incident in an enclosed space can be fatal",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - KONTEYNER OPERASYONLARI
  // =====================================================
  "container-types": {
    title: "Container Types and Dimensions",
    introduction: "Containers are produced according to ISO standards and are designed in different types according to the characteristics of the load to be transported.",
    content: `STANDARD DIMENSIONS:

20' container (1 TEU):
- External dimensions: 6.058 × 2.438 × 2.591 m
- Internal volume: ~33.2 m³
- Maximum gross weight: 30,480 kg
- Tare: ~2,300 kg

40' container (2 TEU):
- External dimensions: 12.192 × 2.438 × 2.591 m
- Internal volume: ~67.7 m³
- Maximum gross weight: 30,480 kg

40' High Cube (HC):
- Height: 2.896 m (30 cm higher than standard)
- Internal volume: ~76.3 m³

CONTAINER TYPES:
- Dry (standard): general dry cargo
- Reefer: refrigerated, temperature controlled
- Open Top: open topped, for high cargo
- Flat Rack: without sides, for wide/heavy cargo
- Tank Container: liquid cargo
- Ventilated: ventilated (coffee, cocoa, etc.)
- Bulk Container: for solid bulk cargo
- Platform: base only`,
    bulletPoints: [
      "20' = 1 TEU, 40' = 2 TEU",
      "Standard and High Cube are the most common types",
      "Reefer containers require constant electricity",
      "Flat rack and open top are for special loads",
    ],
    keyPoints: [
      "Maximum gross weight is 30,480 kg (ISO)",
      "VGM verification is mandatory (SOLAS)",
      "Container CSC plate validity date should be checked",
    ],
  },
  "container-weight": {
    title: "VGM (Verified Gross Mass)",
    introduction: "VGM is the verified gross weight of each container before loading, as required by SOLAS obligation.",
    content: `WHAT IS THE VGM?
Mandatory since 2016 under SOLAS Chapter VI, Regulation 2. The actual gross mass of every container must be verified before loading.

TWO METHODS OF VERIFICATION:

Method 1: WEIGHING
The whole packed container is weighed on calibrated scales.

Method 2: CALCULATION
The container's tare weight plus the sum of the weighed weights of all its contents.

A container without a VGM is not loaded on board.

RESPONSIBILITY FOR THE VGM:
The shipper is responsible for verifying the VGM.
The terminal passes the VGM information to the ship planner.
The master must reject any container without a VGM.

WHY THE VGM MATTERS:
Incorrect weight information leads to:
- The container stack toppling
- The ship taking an unexpected list
- The crane capacity being exceeded
- The stability calculation being wrong`,
    bulletPoints: [
      "VGM is mandatory with SOLAS since 2016",
      "Determined by weighing or calculation method",
      "Without VGM the container will not be loaded",
      "The installer is responsible for VGM",
    ],
    keyPoints: [
      "VGM deficiency is the cause of PSC detention",
      "Incorrect VGM leads to stability accidents",
      "The Master has the right to reject the container without VGM",
    ],
  },
  "container-stowage-plan": {
    title: "Bay Plan and Stacking Plan",
    introduction: "Bay plan is the standard stowing plan that shows the three-dimensional placement position of each container on a container ship.",
    content: `THE BAY PLAN NUMBERING SYSTEM:

A six-digit position code: BAY – ROW – TIER

BAY (longitudinal position):
- Odd numbers: 20' container positions (01, 03, 05...)
- Even numbers: 40' container positions (02, 06, 10...)
- Increasing from forward to aft

ROW (transverse position):
- Centreline: 00
- Starboard: 01, 03, 05... (odd)
- Port: 02, 04, 06... (even)

TIER (vertical position):
- In the hold: 02, 04, 06... (from the bottom up)
- On deck: 82, 84, 86... (from the bottom up)

EXAMPLE: 140682
Bay 14, Row 06 (third row to port), Tier 82 (first tier on deck)

PLANNING CRITERIA:
- Weight distribution (heavy at the bottom)
- Discharge sequence (the top ones come out first)
- DG segregation rules
- Reefer power connections
- Stability and trim optimisation`,
    bulletPoints: [
      "Bay-Row-Tier is a three-dimensional location system",
      "An odd bay = 20', an even bay = 40'",
      "Starboard side receives odd row number, port side receives even row number.",
      "Inside the hold starts at tier 02, above deck at tier 82",
    ],
    keyPoints: [
      "Bay plan is the basic tool of stowage planning",
      "Planning software performs stability checks",
      "A separate loading/unloading plan is prepared for each port.",
    ],
  },
  "reefer-containers": {
    title: "Reefer Containers",
    introduction: "Reefer containers are special containers with cooling units designed to carry temperature-controlled cargo.",
    content: `REEFER CONTAINER FEATURES:
- An integral refrigeration/heating unit
- Temperature range: -30°C to +30°C
- Power supply: 380/440V, 3 phase, 50/60 Hz
- A digital temperature control panel
- Ventilation damper control

CARGOES CARRIED:
- Fruit and vegetables
- Meat and fish products
- Dairy products
- Pharmaceuticals
- Flowers
- Certain chemicals

TYPICAL CARRIAGE TEMPERATURES (approximate; the shipper's instructions govern):
- Bananas: +13°C to +14°C (chilling injury below 12°C)
- Apples, pears: 0°C to +1°C
- Citrus: +4°C to +8°C
- Fresh (chilled) meat: -1°C to +2°C
- Frozen meat/fish: -18°C and below (deep frozen -25°C)
- Fresh fish: 0°C to +2°C
- Dairy products: +2°C to +4°C
- Ice cream: -25°C
- Cut flowers: +2°C to +8°C
- Pharmaceuticals/vaccines: +2°C to +8°C (some at -20°C)
- Chocolate: +12°C to +18°C

Note: with a controlled/modified atmosphere (CA/MA) the O₂ and CO₂ levels are adjusted to extend the shelf life of fruit and vegetables. The distinction between "chilled" (above freezing point) and "frozen" is critical.

OPERATIONAL CHECKS:
1. Before loading: the PTI (Pre-Trip Inspection) check
2. Temperature setting: according to the cargo specification
3. Ventilation: open for fruit/vegetables, closed for meat
4. During the voyage: temperature checks at least twice a day
5. In the event of a breakdown: a spare container or a cold room

POSITIONING:
- A position where the power connection is accessible
- Sufficient clearance for air circulation
- On deck or in dedicated reefer bays`,
    bulletPoints: [
      "Temperature range -30°C to +30°C",
      "380/440V, 3 phase electricity supply required",
      "Temperature checks are made at least twice a day",
      "PTI check is mandatory before loading",
    ],
    keyPoints: [
      "Reefer failure can lead to loss of entire load",
      "Backup electrical connection must be planned",
      "Ventilation adjustment is made according to load type",
    ],
  },
  "oog-cargo": {
    title: "OOG (Out of Gauge) Loads",
    introduction: "OOG loads are loads that exceed standard container dimensions and require special planning.",
    content: `TYPES OF OOG:
- Over-height
- Over-width
- Over-length
- Overweight

METHODS OF CARRIAGE:
1. Open Top container: cargo overhanging at the top
2. Flat Rack: cargo overhanging at the sides
3. Platform: cargo overhanging in all directions
4. As break-bulk: stowed directly, outside a container

STOWAGE RULES:
- No other container is placed on top of an OOG container
- The overhang must not affect the adjacent bays
- Securing requires a special calculation
- Wind loading must be taken into account

PLANNING:
OOG cargo is marked specially on the bay plan.
The overhang dimensions must be declared to the nearest centimetre.
The crane capacity must be checked.`,
    bulletPoints: [
      "OOG loads exceed standard dimensions",
      "Flat rack and open top are the most common transportation vehicles",
      "No other containers can be placed on top",
      "Overflow dimensions must be reported precisely",
    ],
    keyPoints: [
      "OOG loads require additional freight",
      "Linking calculation is made according to CSS Code",
      "Coordination with the terminal is essential during the planning phase",
    ],
  },
  "container-inspection": {
    title: "Container Inspection and Control",
    introduction: "Container inspection includes checks before and during loading for safe transportation and legal compliance.",
    content: `CHECKING THE CSC PLATE:
Every container must have a CSC (Container Safety Convention) approval plate.
What to check:
- The approval date and validity
- The ACEP (Approved Continuous Examination Programme) number
- The maximum gross weight
- The stacking weight

PHYSICAL INSPECTION:
1. STRUCTURE: deformation, cracks, corrosion
2. FLOOR: rot, breaks, holes
3. DOORS: the condition of the seals, the locking mechanism
4. ROOF: holes, water leaks
5. CORNER CASTINGS: deformation, cracked welds

PACKING CHECK:
- Securing of the cargo inside the container
- Use of dunnage and air bags
- Balanced weight distribution
- Correctness of the DG labels

REJECTION CRITERIA:
A container with structural damage, a missing CSC plate, water leaks or an identified safety risk is rejected.`,
    bulletPoints: [
      "CSC plate must be on every container",
      "Physical inspection covers the structure, floor, door and roof",
      "Damaged container should be rejected",
      "Packaging control is critical for load safety",
    ],
    keyPoints: [
      "Containers without CSC plate cannot be transported",
      "Container damage leads to cargo claims",
      "Examination findings should be recorded",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - TANKER OPERASYONLARI
  // =====================================================
  "tanker-types": {
    title: "Tanker Types",
    introduction: "Tankers are built in different types depending on the characteristics of the liquid cargo they carry, and each type has its own operational rules.",
    content: `TANKER TYPES:

1. CRUDE OIL TANKERS:
- VLCC (Very Large Crude Carrier): 200,000+ DWT
- Suezmax: 120,000 – 200,000 DWT
- Aframax: 80,000 – 120,000 DWT
- Panamax: 60,000 – 80,000 DWT

2. PRODUCT TANKERS:
- Refined petroleum products (petrol, diesel, jet fuel)
- Coated tanks (epoxy coating)
- Able to carry more than one grade

3. CHEMICAL TANKERS:
- IMO Type 1: the most hazardous chemicals
- IMO Type 2: moderately hazardous
- IMO Type 3: less hazardous
- Covered by the IBC Code

4. LNG CARRIERS:
- Liquefied natural gas (-162°C)
- Membrane or Moss type tanks
- Covered by the IGC Code

5. LPG CARRIERS:
- Pressurised or semi-refrigerated
- Carrying propane and butane

GAS CARRIER TANK TYPES (IGC Code):
On gas carriers the type of cargo containment system determines the requirement for a secondary barrier. Cargoes carried below -10°C require a secondary barrier.

- Independent Type A: prismatic, designed to ship structural standards. A FULL secondary barrier is mandatory. Design vapour pressure < 0.7 bar. Carries fully refrigerated LPG/ethylene.
- Independent Type B: designed using advanced analysis (fatigue, crack propagation) and model testing; only a PARTIAL secondary barrier (drip tray) is required. The classic example is the spherical Moss tank; also the prismatic SPB. Design pressure < 0.7 bar.
- Independent Type C: a pressure vessel (cylindrical/spherical); design vapour pressure generally ≥ 2 bar. NO SECONDARY BARRIER IS REQUIRED. Used on small and medium gas carriers carrying fully pressurised/semi-pressurised LPG and ethylene.
- Membrane tanks: a thin steel/invar membrane (the primary barrier) supported by insulation; it includes a FULL secondary barrier. Common on LNG carriers (GTT Mark III, NO96). The design pressure is low (< 0.25 bar).`,
    bulletPoints: [
      "Crude oil, product, chemical, LNG and LPG are the main tanker types",
      "VLCC is the largest tanker over 200,000 DWT",
      "Chemical tankers are classified as IMO Type 1, 2 and 3",
      "LNG tankers carry cargo at -162°C",
      "IGC tank types: A (full secondary barrier), B (partial), C (pressurized, no barrier), membrane (LNG)",
    ],
    keyPoints: [
      "Each tanker type is subject to different international codes",
      "Tank coatings determine load compatibility",
      "Tanker personnel must receive special training (STCW)",
      "Type C does not require a secondary barrier; Type A requires full barrier, Type B requires partial barrier",
    ],
  },
  "loading-discharging": {
    title: "Loading and Unloading Operation",
    introduction: "Tanker loading and unloading operations involve high risk and are carried out according to systematic procedures.",
    content: `BEFORE LOADING:
1. The Ship/Shore Safety Checklist is completed
2. The manifold connections are checked
3. Tank preparation (gas-free or inerted)
4. Communications and emergency procedures
5. The loading plan and rate are agreed

THE LOADING OPERATION:
- Starting at a low rate (to confirm the line-up to the shore tank)
- Increasing the rate in stages
- Regular ullage/sounding measurement
- Trim and stability monitoring
- Static electricity precautions (the first 30 minutes of loading)
- Topping off (the final stage, at a low rate)

THE DISCHARGE OPERATION:
- Discharge with the cargo pumps
- Stripping (clearing the remaining cargo)
- The tank emptying sequence set by stability
- Crude Oil Washing (COW)
- Taking ballast (into SBT or the emptied tanks)

SOLAS REQUIREMENTS:
- The permit-to-enter procedure
- Gas measurements
- Fire prevention measures`,
    bulletPoints: [
      "Ship/Shore Safety Checklist is mandatory",
      "Initially loaded with low flow rate",
      "Flow rate is reduced during the topping off phase",
      "Ballast removal during evacuation is necessary for stability.",
    ],
    keyPoints: [
      "Static electricity is most dangerous in the first 30 minutes",
      "Tank emptying order is determined by stability",
      "Ship/Shore communication must be kept open at all times",
    ],
    warnings: [
      "A manifold leak can cause a fire and an environmental disaster",
      "Overfilling a tank has serious consequences",
    ],
  },
  "ullage-sounding": {
    title: "Ullage and Sounding Measurements",
    introduction: "Ullage and sounding are two basic measurement methods used to determine the liquid level in tanks.",
    content: `ULLAGE:
The empty distance from the top of the tank to the liquid surface.
Ullage = tank depth − liquid level

SOUNDING:
The filled distance from the bottom of the tank to the liquid surface.
Sounding = liquid level

THE RELATIONSHIP:
Ullage + Sounding = tank depth

MEASUREMENT METHODS:
1. Manual: with a steel ullage tape
2. Automatic: with a radar or ultrasonic level sensor

VOLUME CALCULATION:
1. The liquid level is measured (ullage or sounding)
2. The volume is read from the tank calibration table
3. A temperature correction is applied
4. The weight is found by multiplying by the density

Weight = Volume × Density

TRIM CORRECTION:
The ship being trimmed affects the liquid level. The tank calibration tables include a trim correction.`,
    bulletPoints: [
      "Ullage = Empty distance (from above), Sounding = Full distance (from below)",
      "Ullage + Sounding = Tank height",
      "Volume is read from tank calibration table",
      "Temperature and trim corrections are applied",
    ],
    formula: {
      name: "Load Weight",
      expression: "W = V × ρ",
      description: "W: Load weight (ton), V: Corrected volume (m³), ρ: Density (t/m³)",
    },
  },
  "cargo-calc-tanker": {
    title: "Tanker Load Calculations",
    introduction: "The tanker load quantity is calculated using liquid level measurements, temperature corrections and density data.",
    content: `CALCULATION STEPS:

1. ULLAGE/SOUNDING MEASUREMENT:
An independent measurement is taken in each tank.

2. GROSS OBSERVED VOLUME (GOV):
The volume corresponding to the liquid level is read from the tank tables.

3. NET OBSERVED VOLUME (NOV):
GOV − free water and sediment

4. CONVERSION TO STANDARD VOLUME (GSV):
A temperature correction is applied.
GSV = GOV × VCF (Volume Correction Factor)
The VCF is found using the ASTM tables (Table 54).

5. WEIGHT CALCULATION:
Weight (metric tonnes) = GSV × density (at 15°C, in vacuum)
or
Weight (in air) = GSV × density (at 15°C, in air)

ASTM TABLES:
- Table 54: the temperature correction factor
- Table 56: density conversion
- Table 6: API gravity conversion`,
    bulletPoints: [
      "GOV → NOV → GSV → Weight order is followed",
      "VCF is the temperature correction factor (ASTM Table 54)",
      "Density is used at a reference temperature of 15°C",
      "ASTM tables are standard calculation reference",
    ],
    formula: {
      name: "Standard Volume",
      expression: "GSV = GOV × VCF",
      description: "GSV: Standard volume, GOV: Observed volume, VCF: Volume correction factor (ASTM Table 54)",
    },
  },
  "tank-cleaning": {
    title: "Tank Cleaning and COW",
    introduction: "Tank cleaning is the process of washing and degassing tanks in preparation for the next load or for repair.",
    content: `CLEANING METHODS:

1. COW (Crude Oil Washing):
The method applied on crude oil tankers during discharge.
Part of the crude oil loaded is sprayed at high pressure onto the tank walls.
Mandatory under MARPOL Annex I (on ships where it is practicable).

2. HOT SEA WATER WASHING:
Tank washing with water at 60-80°C.
Effective for heavy residues.

3. COLD SEA WATER WASHING:
Sufficient after light products.

4. CHEMICAL CLEANING:
On chemical tankers when changing grade.
Selecting the right cleaning agent is critical.

5. GAS-FREEING:
Making the tanks safe against explosion.
LEL must be < 1% and O₂ > 21%.

THE WALL WASH TEST:
After cleaning, a sample taken from the tank wall is used to check that the cleaning is adequate.`,
    bulletPoints: [
      "COW is a MARPOL requirement for crude oil tankers",
      "Gasfree: LEL < 1% and O₂ > 21%",
      "Wall wash test verifies cleanliness",
      "Appropriate agent selection is critical in chemical tankers",
    ],
    keyPoints: [
      "Confined space procedure is applied during tank cleaning",
      "COW is done under inert atmosphere",
      "Cleaning water is disposed of according to MARPOL rules",
    ],
    warnings: [
      "Entering a tank that has not been gas-freed is fatal",
      "There is a risk of static electricity and explosion during COW",
    ],
  },
  "ig-system": {
    title: "Inert Gas System",
    introduction: "The inert gas system is a safety system that eliminates the risk of explosion by reducing the oxygen in the tank atmosphere.",
    content: `PURPOSE:
To prevent flammable hydrocarbon vapours exploding by reducing the oxygen content of the tank atmosphere below 8%.

PRINCIPLE OF OPERATION:
Exhaust gas from the boiler or the IG generator is cooled, scrubbed and delivered to the tanks.
IG composition: ~83% N₂, ~14% CO₂, ~3% other

IG APPLICATIONS:
1. INERTING: filling the tank with inert gas (O₂ < 8%)
2. PURGING: replacing the gas in the tank with clean IG
3. GAS-FREEING: replacing the IG in the tank with fresh air
4. TOPPING UP: making up a falling pressure with IG

WHERE IT IS MANDATORY:
- Crude oil tankers (over 20,000 DWT): mandatory
- Product tankers (some): mandatory
- Chemical tankers: depending on the cargo

SYSTEM COMPONENTS:
- The IG producer (boiler or generator)
- Scrubber (washing tower)
- Blower (fan)
- Deck seal (water seal)
- P/V valve and breaker
- The IG distribution line`,
    bulletPoints: [
      "IG reduces oxygen below 8%",
      "It has inerting, purging, gas-freeing and topping up applications.",
      "Mandatory on 20,000+ DWT crude oil tankers",
      "Deck seal prevents IG line backflow",
    ],
    keyPoints: [
      "IG system is mandatory according to SOLAS and MARPOL",
      "In case of system failure, operation must be stopped",
      "O₂ measurement should be done continuously",
    ],
    warnings: [
      "Tank operations must not be carried out while the IG system is out of service",
      "A dry deck seal allows gas to flow back and can cause an explosion",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - TAHIL YÜKLERİ VE GRAIN CODE
  // =====================================================
  "grain-code-intro": {
    title: "International Grain Code Structure",
    introduction: "International Grain Code is the international code that regulates the safe transportation of grain cargo at sea and is mandatory under SOLAS.",
    content: `The Grain Code, made mandatory under SOLAS Chapter VI, sets out the rules for the safe carriage of grain cargoes.

SCOPE:
Grain cargo: wheat, maize, oats, barley, rice, millet and similar granular cargoes.

MAIN SUBJECTS:
1. The shifting characteristics of grain cargo
2. Heeling moment calculations
3. Stability criteria
4. Hold filling levels
5. Securing the cargo
6. Documentation requirements

THE GRAIN LOADING BOOKLET:
The document that must be carried on every ship authorised to load grain.
It contains:
- The ship's grain carriage approval
- The grain/bale capacities of the holds
- VHM (Volumetric Heeling Moment) tables
- Allowable heeling moment tables
- Stability calculation forms

Approval by the flag State or an authorised classification society is mandatory.`,
    bulletPoints: [
      "Mandatory under SOLAS Chapter VI",
      "Grain Loading Booklet should be available on every ship",
      "VHM tables are used for heeling moment calculation",
      "Flag state or class approval is mandatory",
    ],
    keyPoints: [
      "A ship without approval to carry grain cannot load grain.",
      "Grain Code's updated supplements should be followed",
      "Stability criteria differ from general cargo ships",
    ],
  },
  "grain-shift": {
    title: "Grain Shift and Surface Effect",
    introduction: "The grain cargo may slide and gather to one side during the ship's oscillation, creating a hazardous list.",
    content: `THE SHIFTING MECHANISM:
Grain particles are not firmly bound to each other. As the ship rolls:
1. The particles flow towards the low side
2. The cargo surface becomes inclined
3. The cargo does not return when the ship comes upright
4. Repeated rolling increases the one-sided accumulation

This effect is similar to the free surface effect, but it is different. Grain does not flow back, so the effect is cumulative.

THE CONDITION OF THE CARGO SURFACE:
- A full hold (filled): minimum risk of shifting
- A partly filled hold: maximum risk of shifting

THE ANGLE OF REPOSE:
The natural angle of repose of grain is about 25°-30°.
When the ship heels the cargo surface tries to reach this angle.

PRECAUTIONS:
1. Filling holds completely (trimmed, filled)
2. Using shifting boards or feeders in partly filled holds
3. Trimming the cargo surface and overstowing it with bagged grain`,
    bulletPoints: [
      "Grain does not flow back, sliding effect is cumulative",
      "Fully filled cargo hold minimizes the risk of slipping",
      "Partially full cargo hold is the most dangerous situation",
      "Fixation is done with shifting board or silo",
    ],
    keyPoints: [
      "Grain shifting is a major cause of capsize risk",
      "The number of partially filled cargo holds should be minimized",
      "The load surface must be trimmed",
    ],
    warnings: [
      "A partly filled hold presents the greatest risk of grain shifting",
      "Inadequate securing can lead to the ship capsizing",
    ],
  },
  "grain-heeling-moment": {
    title: "Volumetric Heeling Moment",
    introduction: "VHM (Volumetric Heeling Moment) is the calculation parameter that expresses the heeling moment resulting from the shifting of the grain load.",
    content: `The VHM calculation is made with data taken from the Grain Loading Booklet.

The VHM is calculated separately for each hold and the values are added together.

A FULL HOLD:
The VHM value is read from the Grain Loading Booklet table.
The VHM is low in full holds.

A PARTLY FILLED HOLD:
The VHM value is much greater, depending on the filling level.
The Grain Code provides separate tables for these holds.

TOTAL VHM:
The VHM values of all the holds are added together to give the ship's total VHM.

THE GHM CALCULATION:
GHM (Grain Heeling Moment) = total VHM ÷ SF (stowage factor, m³/t)
Unit check: VHM (m⁴) ÷ SF (m³/t) = t·m (an actual weight moment).
Alternatively the GHM is used directly where it has already been calculated.

THE CHECK:
GHM must be ≤ the allowable heeling moment.
The allowable heeling moment is determined by the ship's stability condition.`,
    bulletPoints: [
      "VHM is calculated separately for each cargo hold",
      "Fully full cargo hold VHM is low, partially full cargo hold VHM is high",
      "Total VHM is the sum of all cargo holds",
      "GHM must be ≤ Allowable Heeling Moment",
    ],
    formula: {
      name: "Grain Lying Angle",
      expression: "θ = (57.3 × GHM) / (Δ × GM)",
      description: "θ: Angle of heel (°), GHM: Grain Heeling Moment (t-m), Δ: Displacement (tons), GM: Metacentric height (m)",
    },
  },
  "grain-stability-criteria": {
    title: "Grain Stability Criteria",
    introduction: "The Grain Code establishes specific criteria for grain-carrying ships that are more stringent than the general stability criteria.",
    content: `GRAIN CODE STABILITY CRITERIA:

1. ANGLE OF HEEL:
The angle of list due to grain shifting must not exceed 12° or 40% of the angle of deck edge immersion, whichever is the less.

2. RESIDUAL AREA:
The area between the GZ curve and the heeling moment curve (residual dynamic stability):
Minimum 0.075 m-rad

3. GM0 (initial GM):
Minimum GM ≥ 0.30 m (after the free surface correction)

THE CHECKING PROCESS:
1. The loading plan is prepared
2. The VHM/GHM is calculated for each hold
3. The total GHM is found
4. The GZ curve is drawn
5. The heeling moment curve is added
6. The residual area is calculated
7. It is confirmed that all the criteria are met

If the stability criteria are not met the loading plan must be revised.`,
    bulletPoints: [
      "List angle ≤ 12° (or 40% of deck penetration angle)",
      "Residual area ≥ 0.075 m-rad",
      "GM₀ ≥ 0.30 m (after FSE correction)",
      "Three criteria must be met together",
    ],
    keyPoints: [
      "Grain Code criteria differ from general IMO criteria",
      "If the loading plan does not meet the criteria, it should be revised",
      "Grain Loading Booklet is the essential reference for calculations",
    ],
  },
  "grain-securing": {
    title: "Securing the Grain Load",
    introduction: "The grain load is secured within the cargo hold by various methods to reduce the risk of shifting.",
    content: `SECURING METHODS:

1. SHIFTING BOARDS:
Wooden or steel panels fitted vertically on the centreline along the length of the hold.
They physically prevent the grain shifting to one side.

2. LONGITUDINAL DIVISIONS (feeders/silos):
Permanent structures dividing the hold longitudinally in two.
They reduce the effective VHM considerably.

3. BUNDLING / BAGGING:
Placing bagged grain on the cargo surface of a partly filled hold.
Covering the surface with a minimum of 16 bags (150 mm thickness).

4. STRAPPING:
Securing the cargo surface with polyester strapping.

A FULL HOLD:
Filled to the top of the hold and trimmed.
The hatchway area must also be filled.

A PARTLY FILLED HOLD:
No more than two holds may be partly filled (a Grain Code restriction).
Shifting boards or bagging are mandatory in these holds.`,
    bulletPoints: [
      "Shifting board mechanically prevents grain from shifting",
      "Longitudinal division reduces VHM",
      "Bagging minimum 150 mm in partially filled cargo holds",
      "A maximum of two cargo holds can be partially full",
    ],
    keyPoints: [
      "The fixing method is specified in the Grain Loading Booklet",
      "Shifting board strength must be calculated",
      "The number of partially filled cargo holds should be minimized",
    ],
  },
  "grain-loading-plan": {
    title: "Preparation of Grain Loading Plan",
    introduction: "The grain loading plan is prepared systematically to ensure the stability of the ship and the Grain Code criteria.",
    content: `STEPS IN PREPARING THE PLAN:

1. SHIP DATA:
- Lightship weight and KG
- Hold grain/bale capacities
- Hydrostatic data
- The Grain Loading Booklet

2. CARGO INFORMATION:
- Type of grain and its SF
- Total cargo quantity
- Load/discharge ports

3. STOWAGE PLAN:
- How much cargo in which holds
- Full and partly filled holds
- Securing methods

4. STABILITY CALCULATION:
- The KG calculation (including all weights)
- The GM calculation (corrected for FSE)
- The VHM / GHM calculation
- Checking the angle of heel
- Checking the residual area

5. APPROVAL:
- The master's approval
- Port authority / surveyor approval
- Completing the Grain Code form

The plan must also cover all the intermediate loading conditions.`,
    bulletPoints: [
      "Light ship weight and hold capacities are basic data",
      "Full and partially full cargo hold decision is made based on stability",
      "Grain Code form is filled and approved",
      "All stages are checked, including intermediate states",
    ],
    keyPoints: [
      "The loading plan is not implemented without the approval of the Master and surveyor.",
      "Grain Code criteria must be met at every stage",
      "Calculations are renewed in case of plan change",
    ],
  },

  // =====================================================
  // BÖLÜM 10-12 ANA KONULAR (Özet içerikler)
  // =====================================================
  "timber-deck": {
    title: "Timber Deck Loads",
    introduction: "Timber deck loads are loads that are subject to special stowage and lashing rules and significantly affect the stability of the ship.",
    content: `THE TIMBER CODE (Code of Safe Practice for Ships Carrying Timber Deck Cargoes):

STOWAGE RULES:
- The cargo must be stowed compactly (with minimum voids)
- The height must not exceed one third of the ship's breadth
- The freeing ports must be kept clear
- Safe access ways must be preserved

SECURING:
- Securing with wire rope or chain
- Lashings at least every 3 metres
- The use of uprights (stanchions)
- Checking the lashings during the voyage

STABILITY EFFECT:
- Deck cargo raises the KG
- Timber taking up water increases the weight → GM falls
- Water absorption can be of the order of 15-25%
- Icing adds further weight

FREEBOARD:
The timber load line differs from the normal load line.
Ships carrying timber deck cargo are permitted a deeper loading (additional reserve buoyancy).`,
    bulletPoints: [
      "Height should not exceed 1/3 of the ship's width",
      "Tie-downs are mandatory every 3 metres.",
      "Wetted lumber weight can increase by 15-25%",
      "Timber Load Line allows deeper loading",
    ],
    keyPoints: [
      "GM can drop to dangerous levels when timber gets wet",
      "Mooring should be checked frequently while sailing",
      "Safe passageways must be maintained",
    ],
  },
  "load-line-marks": {
    title: "Load Line Markings (TF/F/T/S/W/WNA)",
    introduction: "Load line (Plimsoll) marks indicate the maximum loading draft (minimum freeboard) of the ship in different regions and seasons in accordance with the International Load Line Convention (1966 / 1988 Protocol).",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    content: `THE LOAD LINE MARK:
The disc (ring) on the ship's side amidships, with the horizontal line through its centre, shows the Summer (S) line. The initials of the assigning classification society appear beside the disc. The horizontal "comb" lines forward of the vertical line attached to the disc are the seasonal/zonal load lines.

THE LINES (from the top down):
- TF — Tropical Fresh: the deepest loading.
- F — Fresh
- T — Tropical
- S — Summer: the reference line, passing through the centre of the disc.
- W — Winter
- WNA — Winter North Atlantic: the shallowest loading.

THE INTERVALS:
- T is above S and W is below S: each by 1/48 of the summer draft.
- F = S + FWA (the fresh water allowance); TF = T + FWA.
- WNA = W − 50 mm (on ships of 100 m or less in length).
- FWA (mm) = Displacement / (4 × TPC).

THE DECK LINE AND FREEBOARD:
The vertical distance between the deck line and the summer (S) line is the summer freeboard. The load lines are used together with the seasonal zones on the world chart (tropical, summer, winter, seasonal areas); the ship must not exceed the line appropriate to the zone and season it is in.`,
    bulletPoints: [
      "The S (Write) line is the reference and passes through the center of the disk",
      "TF is the deepest, WNA is the shallowest loading line",
      "T and W are 1/48th of the summer draft away from S",
      "FWA = Displacement / (4 × TPC); In fresh water, draft increases by FWA",
    ],
    keyPoints: [
      "Covered by the Load Line Convention 1966/1988 Protocol",
      "Letters next to the disk indicate the assigning class organization",
      "The ship cannot exceed the loading line for its region and season.",
      "Sufficient freeboard = sufficient reserve buoyancy",
    ],
  },
  "livestock": {
    title: "Live Animal Transportation",
    introduction: "Transport of live animals is subject to special regulations for animal welfare and ship safety.",
    content: `The carriage of live animals is governed by the WOAH (World Organisation for Animal Health) and by national legislation.

REQUIREMENTS:
- Adequate ventilation and shade
- Supply of clean water and feed
- A waste management system (drainage)
- Access to veterinary care
- Adequate space and a space calculation (m² per animal)

STABILITY EFFECT:
- The free movement of animals is similar to a free surface effect
- The risk of a mass shift if the animals panic
- Changes in the weight of the water and feed tanks

PENNING:
The animals are divided into pens to prevent a mass shift.
The size of the pens is determined by the species.`,
    bulletPoints: [
      "Adequate ventilation, water and feed are mandatory",
      "Animal movement affects stability",
      "Compartmentalization reduces the risk of mass slides",
      "Veterinary care should be provided",
    ],
    keyPoints: [
      "Animal welfare is subject to international regulations",
      "Animal movement must be taken into calculation in stability calculations",
      "Drainage system is critical for hygiene",
    ],
  },
  "ro-ro-cargo": {
    title: "Ro-Ro Cargo operations",
    introduction: "On Ro-Ro ships, cargo is taken on and off the ship as wheeled vehicles; Requires specialcargo securing and stability control.",
    content: `RO-RO LOADING:
Cargo is driven on board over a ramp on its own wheels or by a tug master.

TYPES OF CARGO:
- Cars
- Trucks and articulated lorries
- Construction machinery
- Project cargo (on a wheeled platform)

SECURING:
Every vehicle is secured to the deck with lashing straps.
- Car: minimum 4 points
- Truck: minimum 8 points (depending on weight)
- The CSS Code securing calculations are applied

STABILITY:
Ro-Ro ships carry the risk of a high KG:
- Vehicles on the deck (a high centre of gravity)
- Large open deck areas (an effect similar to free surface)
- The risk of water ingress (bow/stern doors)

SAFETY:
- Ventilation (exhaust gases)
- Fire detection and extinguishing systems
- Keeping the watertight doors closed`,
    bulletPoints: [
      "Vehicles are loaded/unloaded via ramp",
      "Each vehicle is connected from a minimum of 4 points",
      "High KG and open deck areas pose a stability risk",
      "Watertight doors must be kept closed while underway",
    ],
    keyPoints: [
      "Ro-Ro ships are particularly vulnerable to damaged stability",
      "Herald of Free Enterprise accident has tightened Ro-Ro safety rules",
      "Cruising does not start until the bow/stern door is closed.",
    ],
    warnings: [
      "Sailing with the bow door open has had fatal consequences",
      "Vehicle lashings must be checked in bad weather",
    ],
  },
  "steel-cargo": {
    title: "Steel and Heavy Load Transport",
    introduction: "Steel products are high-intensity loads and require special attention in terms of stowing, lashing and structural strength.",
    content: `TYPES OF STEEL PRODUCT:
- Steel coil
- Steel plate
- Steel pipe
- Steel billet/slab
- Rebar

STOWAGE:
- Steel coils: eye down or eye to side
- Dunnage: wooden cradles or V-blocks
- Weight distribution: checking the tank top limit
- Anti-shifting: wooden chocks and stoppers

SECURING:
- Securing with wire rope or chain
- Every coil must be secured independently
- The securing force is calculated according to the CSS Code

STRUCTURAL STRENGTH:
Because steel has a high density (SF ~ 0.3–0.5 m³/t):
- The tank top load density limit is checked
- It is compared against the tank top strength
- The load is spread with dunnage where necessary`,
    bulletPoints: [
      "Steel coil is stowage eye down or eye to side",
      "Each coil must be connected independently",
      "Cargo hold floor load density limit should be checked",
      "Load distribution is achieved with Dunnage",
    ],
    keyPoints: [
      "Steel is heavy load with low SF, deadweight is decisive",
      "Risk of slipping is high, cargo securing is critical",
      "Spreader or dunnage provides load distribution",
    ],
  },
  "project-cargo": {
    title: "Project Loads",
    introduction: "Project loads are individual loads that are non-standard in size and weight and require special planning and handling.",
    content: `EXAMPLES OF PROJECT CARGO:
- Wind turbine blades
- Oil platform modules
- Large transformers
- Industrial equipment
- Bridge sections

PLANNING:
1. Analysis of the cargo dimensions and weight
2. Checking the crane capacity
3. Deck strength calculation
4. Stability analysis (during the lift)
5. Design of the securing arrangement
6. The route and the weather
7. Insurance and legal requirements

OPERATIONAL RISKS:
- Loss of stability during the lift
- Wind effect (a large surface area)
- Damage to the deck
- Inadequate securing

Every project cargo is unique and requires individual planning.`,
    bulletPoints: [
      "Each project load is unique, there is no standard procedure",
      "Crane capacity and deck strength are checked",
      "Stability is critical during lifting",
      "Wind effect should be calculated for loads with large surface areas",
    ],
    keyPoints: [
      "Project load planning starts weeks/months in advance",
      "Marine warranty surveyor approval may be required",
      "Stability must be checked at every stage",
    ],
  },
  "cargo-damage-types": {
    title: "Load Damage Types",
    introduction: "In maritime transportation, cargo may be damaged for various reasons and these damages lead to commercial losses.",
    content: `THE PRINCIPAL TYPES OF DAMAGE:

1. PHYSICAL DAMAGE:
- Crushing (shifting within the hold)
- Breakage (inadequate packaging)
- Deformation (overstowing)
- Scratching and impact

2. MOISTURE DAMAGE:
- Ship sweat
- Cargo sweat
- Ingress of rain water
- Sea water leakage

3. CONTAMINATION:
- Odour transfer (taint)
- Dust contamination
- Chemical contamination
- Residues of a previous cargo

4. TEMPERATURE DAMAGE:
- Overheating (self-heating)
- Freezing (passages through cold regions)
- Temperature fluctuations

5. BIOLOGICAL DAMAGE:
- Mould and fungus
- Insect infestation
- Decay (organic cargoes)

PREVENTING DAMAGE:
Correct stowage, suitable dunnage, ventilation control and cargo care.`,
    bulletPoints: [
      "Physical, moisture, contamination, temperature and biological damage are the main categories",
      "Moisture damage is the most common type of damage",
      "Correct stowing and dunnage prevents damage",
      "Ventilation control prevents sweating",
    ],
    keyPoints: [
      "The cost of loss prevention is much lower than the cost of compensation",
      "The load status should be recorded during loading",
      "Letter of Protest must be issued when damage is detected",
    ],
  },
  "sweat-damage": {
    title: "Sweat Damage (Ship vs Cargo Sweat)",
    introduction: "Sweating is moisture condensation on the cargo hold or cargo surface due to temperature differences and is a common cause of cargo damage.",
    content: `TWO TYPES OF SWEAT:

1. SHIP SWEAT:
Occurs on a passage from a warm region to a cold one.
The ship's structure (the steel shell) cools from outside.
The moist air in the hold condenses on the cold steel surfaces.
The condensed droplets drip onto the cargo.

Condition: outside air temperature < the dew point of the hold air

2. CARGO SWEAT:
Occurs on a passage from a cold region to a warm one.
Warm moist outside air enters the hold.
Moisture condenses on the cold cargo surface.

Condition: outside air dew point > the cargo surface temperature

PREVENTION:
- Dew point measurement and a ventilation decision
- Ship sweat: ventilate when entering a cold region
- Cargo sweat: do not ventilate when entering a warm region
- Use of desiccants (silica gel, calcium chloride)`,
    bulletPoints: [
      "Ship sweating: Occurs when sailing from hot to cold",
      "Cargo sweating: Occurs when traveling from cold to hot",
      "Dew point measurement determines ventilation decision",
      "Moisture-wicking material provides additional protection",
    ],
    keyPoints: [
      "A ventilation log should be kept",
      "Dew point measuring device must be on board",
      "Wrong ventilation decision can increase sweating",
    ],
  },
  "moisture-control": {
    title: "Humidity Control and Dew Point",
    introduction: "Humidity control is the management process based on dew point measurement of the cargo hold atmosphere to prevent cargo damage.",
    content: `DEW POINT:
The temperature at which air of a given humidity begins to condense when it is cooled.

MEASUREMENT:
Hold and outside air measurements are taken with a psychrometer or an electronic dew point meter.

DECISION TABLE:
Outside air dew point < cargo temperature → ventilate (moisture is carried out)
Outside air dew point > cargo temperature → keep closed (moisture would condense)

RECORDS:
A dew point measurement must be taken every watch and entered in the log book.
These records are evidence in the event of a damage claim.`,
    bulletPoints: [
      "Dew point = The temperature at which moisture begins to condense",
      "Measured with a psychrometer or electronic device",
      "Outdoor dew point < Load temperature → Ventilate",
      "Measurement and recording are evidence in damage claims.",
    ],
    keyPoints: [
      "Measurements should be taken every watch",
      "Records are critical in litigation",
      "Ventilation decisions should be based on scientific data",
    ],
  },
  "cargo-claims": {
    title: "Cargo Damage Claims and Liability",
    introduction: "Cargo damage claims are evaluated according to international rules that determine the carrier's liability and liability for compensation.",
    content: `THE BASIS OF LIABILITY:

Under the Hague-Visby Rules the carrier is bound:
- To keep the ship seaworthy
- To load, stow, carry and discharge the cargo carefully

THE CARRIER'S EXCEPTIONS:
- Perils of the sea (act of God)
- War, piracy
- Quarantine
- Damage arising from the nature of the cargo (inherent vice)
- Insufficient packing
- Latent defect

THE SHIP'S STAFF RESPONSIBILITIES:
1. Hold inspection before loading
2. Recording the condition of the cargo (Mate's Receipt)
3. A Letter of Protest for damaged cargo
4. Ventilation records
5. Cargo care during the voyage

DOCUMENTATION:
Good documentation protects the carrier. Photographs, records and letters of protest are critically important.`,
    bulletPoints: [
      "Hague-Visby Rules determine carrier liability",
      "The carrier is obliged to keep the ship seaworthy",
      "In some cases the carrier gains exemption",
      "Documentation is critical in determining liability",
    ],
    keyPoints: [
      "Letter of Protest must be issued in time",
      "Photographs and recordings are used as case evidence",
      "The Master has the right to object to the loading conditions",
    ],
  },
  "hague-visby": {
    title: "Hague-Visby Rules",
    introduction: "Hague-Visby Rules is the basic international agreement that regulates the rights and responsibilities of the carrier in sea freight transportation.",
    content: `THE BASIC PRINCIPLES:

1. APPLICATION:
They apply to international carriage of goods under any bill of lading.
They apply to charter parties where a bill of lading is issued.

2. THE CARRIER'S OBLIGATIONS:
- To exercise due diligence to make the ship seaworthy
- To prepare the holds fit for the cargo
- To load, stow and carry the cargo carefully

3. LIMIT OF LIABILITY:
- Per package or per kilo (whichever is the higher)
- 666.67 SDR per package or 2 SDR per kg

4. PERIOD:
- From the moment of loading to the moment of discharge
- Time bar for suit: 1 year

5. EXCEPTIONS:
17 excepted perils are listed (error in navigation, fire, act of God, etc.)

The Rotterdam Rules and the Hamburg Rules are alternative conventions, but Hague-Visby is the most widely accepted.`,
    bulletPoints: [
      "Valid for international transportation carried by bill of lading",
      "Liability limit 666.67 SDR/pack or 2 SDR/kg",
      "Time to file a lawsuit: 1 year",
      "17 exemption reasons identified",
    ],
    keyPoints: [
      "Hague-Visby is the most widely accepted maritime transport contract",
      "Due diligence obligation is critical",
      "Navigation error exemption is a controversial clause",
    ],
  },
  "solas-cargo": {
    title: "SOLAS Chapters VI and VII",
    introduction: "SOLAS (Safety of Life at Sea) Chapter VI regulates general cargo transport and Chapter VII regulates dangerous cargo transport.",
    content: `CHAPTER VI – CARRIAGE OF CARGOES:

Regulation 1: Application
Regulation 2: Cargo information (the shipper's responsibilities)
Regulation 3: Oxygen depletion and gas emission
Regulation 5: Stowage and securing
Regulation 6: Additional requirements for bulk cargoes
Regulation 7: Loading grain (reference to the Grain Code)

CHAPTER VII – CARRIAGE OF DANGEROUS GOODS:

Part A: Dangerous goods in packaged form (the IMDG Code)
Part A-1: Dangerous goods in solid form in bulk (the IMSBC Code)
Part B: Chemical tankers (the IBC Code)
Part C: Gas carriers (the IGC Code)
Part D: The INF Code (radioactive cargoes)

IMPORTANT REQUIREMENTS:
- The VGM requirement (container weight verification)
- The Cargo Securing Manual
- The dangerous goods declaration and manifest
- Hold entry procedures`,
    bulletPoints: [
      "Chapter VI contains rules for general cargo, Chapter VII contains rules for dangerous cargo",
      "VGM obligation falls under Chapter VI",
      "Packaged DG: IMDG Code, Bulk DG: IMSBC Code",
      "Cargo Securing Manual is mandatory on all ships",
    ],
    keyPoints: [
      "SOLAS is the basic legal framework for freight transport",
      "The loader is obliged to provide accurate load information.",
      "The Master has the right to reject unsafe cargo",
    ],
  },
  "marpol-cargo": {
    title: "MARPOL and Cargo operations",
    introduction: "MARPOL is the international convention that aims to prevent marine pollution caused by cargo operations.",
    content: `THE MARPOL ANNEXES AND CARGO:

ANNEX I – OIL POLLUTION:
- Rules for discharging tanker cargo tank washings
- The requirement for Crude Oil Washing (COW)
- Slop tank management
- Oil Record Book entries

ANNEX II – NOXIOUS LIQUID SUBSTANCES (NLS):
- Chemical tanker cargo residues; every substance is assigned to a category in the IBC Code.
- Categories: X (major hazard — discharge into the sea prohibited, prewash mandatory and residues delivered to a reception facility), Y (hazard — limited discharge), Z (minor hazard — less restricted), OS (Other Substances — evaluated and falling outside Annex II; no pollution risk).
- General discharge conditions: the ship under way (≥7 knots self-propelled), ≥12 nautical miles from land, water depth ≥25 m, discharged below the waterline.
- For Category X a prewash and verification of the residue concentration are required.
- Tank washing requirements and the Cargo Record Book entry.

ANNEX III – HARMFUL SUBSTANCES IN PACKAGED FORM:
- The Marine Pollutant mark
- Stowage and labelling rules
- Reporting in the event of loss

ANNEX V – GARBAGE:
- Cargo wastes (dunnage, packaging)
- Discharge restrictions
- The Garbage Management Plan`,
    bulletPoints: [
      "Annex I petroleum, Annex II chemicals, Annex III packaged harmful substances",
      "COW is a MARPOL requirement for tankers",
      "Oil/Cargo Record Book must be kept",
      "The Marine Pollutant mark is included in Annex III",
    ],
    keyPoints: [
      "Violation of MARPOL requires severe criminal sanctions",
      "Logbooks are checked during PSC inspections",
      "Port waste reception facilities should be used",
    ],
  },
  "psc-cargo-findings": {
    title: "PSC Load Inspections and Findings",
    introduction: "Port State Control (PSC) inspections detect deficiencies in cargo security and may detain the ship in cases of serious findings.",
    content: `PSC INSPECTION AREAS:

1. DOCUMENT CHECKS:
- The Cargo Securing Manual
- The DG Manifest and documents
- Stability calculations
- Loading computer approval
- The Grain Loading Booklet (grain ships)

2. PHYSICAL CHECKS:
- The condition of the cargo securing
- DG labelling and segregation
- Hatch cover weathertightness
- Hold ventilation
- Fire safety equipment

3. COMMON FINDINGS:
- Inadequate lashing
- Breaches of DG segregation
- An out-of-date CSM
- Missing stability calculations
- Leaking hatch covers
- No VGM

4. DETENTION:
Where the ship is found to present a safety risk it is not given clearance to sail.
The ship stays in port until the deficiencies are rectified.`,
    bulletPoints: [
      "Document and physical checks are carried out simultaneously",
      "Inadequate lashing and DG discrimination violation are common findings",
      "CSM update is checked",
      "Eclipse leads to operational and financial loss",
    ],
    keyPoints: [
      "Regular internal audit prevents PSC findings",
      "CSM and DG documents must be kept up to date",
      "Securing equipment must be certified",
    ],
  },
  "ism-cargo": {
    title: "ISM Code and Cargo Operations",
    introduction: "The ISM Code defines procedures and responsibilities for the systematic and safe conduct of cargo operations.",
    content: `THE ISM CODE AND CARGO:

The ISM Code (International Safety Management Code) requires all shipboard operations to be managed through systematic procedures.

THE ELEMENTS RELATING TO CARGO OPERATIONS:

1. POLICY:
The company's safety and environmental protection policy covers cargo operations.

2. RESPONSIBILITIES:
- The master: overall responsibility for cargo safety
- The DPA: the link between the company and the ship
- The chief officer: day-to-day cargo operations

3. PROCEDURES:
- The procedure for preparing the loading plan
- The DG loading procedure
- The hold entry procedure
- Emergency procedures (cargo shift, fire)

4. RECORDS:
All cargo operations are recorded.
The records are retained for audit and investigation.

5. TRAINING:
Personnel taking part in cargo operations must be trained.
Drills must be held regularly.`,
    bulletPoints: [
      "ISM Code imposes procedural requirements for cargo operations",
      "The Master is the general responsible for cargo security.",
      "All operations are recorded",
      "Staff training and drills are mandatory",
    ],
    keyPoints: [
      "ISM procedures are part of company SMS",
      "Procedure violation leads to ISM audit finding",
      "The principle of continuous improvement is applied",
    ],
  },
  "cargo-incidents": {
    title: "Freight Accidents and Lessons Learned",
    introduction: "Historical freight accidents have been decisive in establishing current safety rules and have revealed important lessons.",
    content: `MAJOR CARGO CASUALTIES:

1. MV DERBYSHIRE (1980):
- A bulk carrier loaded with ore
- Foundered during a typhoon (44 crew lost)
- Outcome: hatch cover strength standards were strengthened

2. HERALD OF FREE ENTERPRISE (1987):
- A Ro-Ro passenger ferry
- Sailed with the bow door open
- 193 people lost their lives
- Outcome: the creation of the ISM Code

3. MV STELLAR DAISY (2017):
- A VLOC (Very Large Ore Carrier)
- Foundered in the South Atlantic (22 lost)
- Structural fatigue and liquefaction of the ore

4. THE NICKEL ORE CASUALTIES:
- Several bulk carriers foundered after loading nickel ore in the Philippines
- Outcome: the IMSBC Code Group A rules were tightened

5. MSC FLAMINIA (2012):
- A DG-related fire on a container ship
- Drifted at sea for months
- Outcome: the DG container stowage rules were updated`,
    bulletPoints: [
      "MV Derbyshire: Changed hatch cover standards",
      "Herald of Free Enterprise: gave rise to the ISM Code",
      "Nickel ore accidents: IMSBC tightens rules",
      "MSC Flaminia: DG updates stowage rules",
    ],
    keyPoints: [
      "Every major accident has led to international rule changes",
      "Accident analysis is the basis of safety culture",
      "Sharing lessons learned prevents repetition",
    ],
    warnings: [
      "The safety rules were written after lives were lost",
      "Complying with the rules saves lives",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "cargo-gear-swl": {
    title: "Ship Cargo Rig, Crane/Derrick and SWL",
    introduction: "Ship cargo equipment; It consists of cranes, derricks and their accessories (rope, pulley, hook, shackle). The load that each piece of equipment can safely handle is limited by SWL (Safe Working Load) and recorded.",
    content: `SWL (SAFE WORKING LOAD):

The SWL is the maximum load a lifting appliance can safely carry in normal use. It is set by applying a safety factor to the breaking load of the gear and is marked legibly on the appliance.

COMPONENTS OF THE CARGO GEAR:

- Crane / derrick: the main appliance that lifts the load.
- Wires/ropes, blocks, shackles, hooks: the accessories; each has its own SWL.
- The weakest element determines the capacity of the whole system.

THE CARGO GEAR REGISTER:

All the lifting appliances and loose gear on board are recorded, together with their certificates, in a Cargo Gear Register (Register of Lifting Appliances). These records are checked in PSC inspections under ILO Convention 152 and the SOLAS requirements.

TESTING AND EXAMINATION:

- Proof load test: the gear is tested with a load above its SWL (at a proportion determined by the SWL). Normally repeated every 5 years.
- Annual thorough examination: carried out by a competent person.
- Visual check: the condition of the ropes, hooks and shackles is checked before every use.

SAFE USE:

The SWL must not be exceeded; no one must stand under a suspended load; shock loading must be avoided; the increase in leg forces in an angled lift must be taken into account.`,
    bulletPoints: [
      "SWL is the maximum load that the equipment can safely handle and is marked.",
      "The weakest element determines the capacity of the system.",
      "All equipment is registered as certified in the Cargo Gear Register.",
      "Proof load testing is done ~every 5 years, detailed inspection is done annually.",
    ],
    keyPoints: [
      "SWL is impenetrable; A factor of safety is applied to the breaking load.",
      "ILO 152 and SOLAS require registration and testing of lifting equipment.",
      "Leg strength increases in angled lifting.",
    ],
    warnings: [
      "Never stand under a suspended load; a shock load can part the gear",
      "Uncertificated/untested gear must not be used",
    ],
  },
  "blu-code": {
    title: "BLU Code: Bulk Cargo Loading/Unloading and Ship-Shore Control",
    introduction: "BLU Code (Code of Practice for the Safe Loading and Unloading of Bulk Carriers) regulates the safe loading/unloading practice between the ship and the terminal to prevent structural damage and sinking accidents caused by excessive/unbalanced loading on bulk carriers.",
    content: `PURPOSE:

On bulk carriers, rapid and unbalanced loading can create excessive shear force and bending moment, straining the hull structure and even breaking the ship's back. The BLU Code standardises ship/terminal coordination in order to manage these risks.

THE LOADING/UNLOADING PLAN:

The master and the terminal representative prepare an agreed loading/unloading plan: the quantity for each hold, the sequence, the loading rate and the coordination of deballasting. The plan keeps the ship within the shear force/bending moment limits permitted by the loading computer.

THE SHIP/SHORE SAFETY CHECKLIST:

The Ship/Shore Safety Checklist is completed; the method of communication, the emergency stop signal, the loading rate and the means of contact are clearly agreed.

LOADING SEQUENCE AND STRESS CONTROL:

- The holds are filled in a defined sequence and in a balanced way (the alternate hold loading restrictions are observed).
- Deballasting is carried out in step with the loading rate.
- Draft, trim, shear force and bending moment are monitored at every stage with the loading computer.
- The loading rate is set so as not to exceed the deballasting capacity.

LESSONS FROM CASUALTIES:

Many bulk carrier losses have been caused by an incorrect loading sequence and excessive local loading; the BLU Code grew out of that experience.`,
    bulletPoints: [
      "Rapid/unbalanced loading creates excessive shear force and bending moment.",
      "The ship-terminal prepares the agreed upon loading plan.",
      "Ship-Shore Safety Checklist and clear communication are mandatory.",
      "Stress limits are constantly monitored with the loading computer.",
    ],
    keyPoints: [
      "BLU Code targets structural safety in bulk cargo loading/unloading.",
      "Loading speed is synchronized with deballasting capacity.",
      "Alternate hold loading restrictions must be followed.",
    ],
    warnings: [
      "Unplanned or excessive local loading can permanently deform the hull or break the ship's back",
      "The emergency stop signal and the means of communication must be agreed beforehand",
    ],
  },
  "hold-preparation": {
    title: "Cargo hold Preparation and Cleaning",
    introduction: "Cargo hold preparation before new load; It is the basis for preventing cargo damage, contamination and cargo claims. The required standard of cleaning is determined by the load to be transported and the previous load.",
    content: `CLEANLINESS STANDARDS:

- Hospital clean (grain clean): the highest standard; the hold completely clean, dry, odour-free and free of rust and residues of the previous cargo. Required for grain and sensitive cargoes.
- Normal clean: swept, with the residues of the previous cargo removed; sufficient for similar cargoes.
- Load on top (shovel clean): a rough clean; may be sufficient between certain bulk cargoes.

PREPARATION STEPS:

1. Complete removal of the previous cargo residues (sweeping/washing).
2. Washing with fresh/sea water if required, followed by drying (salt residues cause problems with some cargoes).
3. Cleaning and testing the bilge wells and checking the strum boxes.
4. Checking the hold paint/rust condition; repairs if required.
5. Ventilation and odour control.
6. Hatch cover weathertightness testing.

INSPECTION AND APPROVAL:

For some cargoes (particularly grain) an independent surveyor inspects the hold and passes it. Inadequate preparation leads to serious claims for cargo damage and contamination.`,
    bulletPoints: [
      "Standards: hospital/grain clean > normal clean > shovel clean.",
      "Previous load residue, salt and moisture cause damage to sensitive loads.",
      "Bilge wells and strainers are cleaned and tested.",
      "Hatch cover tightness is checked.",
    ],
    keyPoints: [
      "The required cleaning standard is determined by the new load.",
      "Surveyor approval may be required for grain/sensitive loads.",
      "Inadequate preparation will result in cargo damage and compensation claims.",
    ],
  },
  "gas-carrier-igc": {
    title: "Gas Carriers and IGC Code (LNG/LPG)",
    introduction: "Liquefied gas carriers (LNG/LPG) transport gas in liquid form at low temperature and/or high pressure. These ships are subject to the requirements of the IGC Code (International Code for the Construction and Equipment of Ships Carrying Liquefied Gases in Bulk).",
    content: `CARGO CONDITIONS:

- Fully pressurised: the gas at ambient temperature in high-pressure tanks (usually small LPG carriers).
- Semi-pressurised/semi-refrigerated: moderate pressure plus partial refrigeration.
- Fully refrigerated: at atmospheric pressure and very low temperature (LNG ≈ -163 °C; LPG ≈ -42 °C).

TANK TYPES (containment):

- Independent tanks Type A, B and C (C: a pressurised cylindrical/spherical vessel).
- Membrane systems: particularly on large LNG carriers, a thin steel membrane plus insulation.
- The secondary barrier: protects the hull from low temperature in the event of a leak.

BOIL-OFF AND RELIQUEFACTION:

In refrigerated carriage some of the gas evaporates because of heat ingress (boil-off gas, BOG). On LPG carriers a reliquefaction plant returns the BOG to liquid; on LNG carriers the BOG is mostly used as fuel in the machinery.

HAZARDS AND SAFETY:

- Flammability and explosion (flammable vapour); gas detection and ventilation are critical.
- Very low temperature (cryogenic): the risk of skin burns and brittle fracture of steel.
- Asphyxiation: the gas displaces oxygen.
- An ESD (Emergency Shutdown) system, gas detectors and special PPE are mandatory.`,
    bulletPoints: [
      "Conditions: fully pressurized / half pressurized / fully cooled.",
      "Tank types: Type A/B/C and membrane; secondary barrier is essential.",
      "Boil-off: Reliquefaction in LPG, use as fuel in LNG.",
      "IGC Code determines structure and hardware requirements.",
    ],
    keyPoints: [
      "LNG is carried at ≈ -163°C, LPG at ≈ -42°C.",
      "Main hazards: flammability, cryogenic cold, suffocation.",
      "ESD, gas detection and special PPE are mandatory.",
    ],
    warnings: [
      "Contact with a cryogenic liquid causes severe burns and brittle fracture in steel",
      "An accumulation of gas creates a risk of explosion and asphyxiation",
    ],
  },
  "isgott-tanker-safety": {
    title: "ISGOTT and Tanker Safety",
    introduction: "ISGOTT (International Safety Guide for Oil Tankers and Terminals) is the industry standard guide to safe operation on oil tankers and terminals. It manages risks arising from static electricity, flammable vapor and ship-shore interface.",
    content: `THE STATIC ELECTRICITY HAZARD:

The movement of the liquid inside pipes and tanks builds up a static charge. If the accumulated charge discharges as a spark in a flammable vapour atmosphere it can cause ignition. Precautions: limiting the loading rate at the start (initial slow loading), preventing free fall and splashing, static-safe use of measuring equipment (sounding) and appropriate relaxation times.

FLAMMABLE ATMOSPHERE AND INERT GAS:

The tank atmosphere must not be within the flammable range. The inert gas system (IGS) makes the atmosphere non-combustible by reducing the oxygen in the tank (generally below 8% by volume); this is the basis of ISGOTT operations.

THE SHIP/SHORE SAFETY CHECK LIST:

The Ship/Shore Safety Check List is completed: the integrity of the manifold connections, emergency shutdown (ESD), communications, fire fighting readiness, the ban on smoking/naked lights, enclosed space rules and hot work control.

OPERATIONAL PRECAUTIONS:

- No smoking / control of naked lights and sources of sparks.
- Bonding/earthing and proper hose/manifold connections.
- Gas measurement and enclosed space entry permits.
- Preventing overflow and spillage; drip trays and scupper plugs.
- A continuous deck watch and readiness to respond quickly.`,
    bulletPoints: [
      "Accumulation of static electricity creates a risk of ignition in a flammable environment.",
      "Inert gas prevents combustion by reducing tank oxygen (ISGOTT basis).",
      "Ship/Shore Safety Check List is filled out before the operation.",
      "Initial loading is done slowly (initial slow loading).",
    ],
    keyPoints: [
      "ISGOTT is the industry guide to oil tanker/terminal operations.",
      "Static, flammable vapor and ship-shore interface are the main risks.",
      "Inert gas and gas measurement are the basis of safety.",
    ],
    warnings: [
      "Flammable vapour + a spark = an explosion; sources of ignition are strictly controlled",
      "Breaching the inert gas/enclosed space rules is fatal",
    ],
  },
};

export default function CargoTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent) {
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
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cargo Handling and Stacking</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {cargoTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-amber-500/5 cursor-pointer"
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

            {/* Quick Links */}
            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Load Calculations", href: "/cargo/calculations" },
                  { title: "Draft Survey Formulas", href: "/cargo/formulas" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-amber-500/40 hover:bg-background"
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

      {/* Full Screen Content Modal */}
      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            {/* Modal Header */}
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

            {/* Modal Content */}
            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                {/* Introduction */}
                <div className="bg-amber-500/10 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                {/* Topic Image/Diagram */}
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

                {/* Main Content */}
                <StructuredLessonText text={currentContent.content} />

                {/* Bullet Points */}
                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formula */}
                {currentContent.formula && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentContent.formula.name}
                    </h3>
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-amber-600 dark:text-amber-400 mb-2">
                      {currentContent.formula.expression}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {/* Examples */}
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

                {/* Key Points */}
                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-amber-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      Key Information
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{index + 1}.</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {currentContent.warnings && currentContent.warnings.length > 0 && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-destructive">⚠</span>
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
