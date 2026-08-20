import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Anchor,
  ChevronRight,
  FileText,
  AlertTriangle,
  Waves,
  Scale,
  Ship,
  Gauge,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  Weight,
  BarChart3,
  Ruler,
  Settings,
  Activity,
  Target,
  Zap,
  BookMarked,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Stabilite diyagramları (public/diagrams altındaki vektör çizimler)
const metacenterDiagram = "/diagrams/stability/metasantr-gm.svg";
const gzCurveDiagram = "/diagrams/stability/gz-egrisi.svg";
const freeSurfaceEffect = "/diagrams/stability/serbest-yuzey.svg";
const rightingMomentDiagram = "/diagrams/dogrultma-kolu.svg";
const trimDiagram = "/diagrams/stability/trim.svg";
const damageStabilityDiagram = "/diagrams/stability/yara-stabilitesi.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

// =====================================
// YENİ 14 BAŞLIKLI STABİLİTE MÜFREDATİ
// =====================================

interface StabilitySubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface StabilityMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: StabilitySubTopic[];
}

const stabilityTopics: StabilityMainTopic[] = [
  {
    id: "intro",
    number: 1,
    title: "Introduction to Stability and Basic Concepts",
    icon: BookOpen,
    subtopics: [
      { id: "stability-definition", title: "Definition of stability", hasContent: true },
      { id: "balance-concepts", title: "Concepts of balance, tipping and straightening", hasContent: true },
      { id: "static-stability", title: "Static stability", hasContent: true },
      { id: "dynamic-stability-intro", title: "Dynamic stability", hasContent: true },
      { id: "initial-stability", title: "First concept of stability", hasContent: true },
      { id: "stability-safety", title: "Relationship between stability and navigational safety", hasContent: true },
    ],
  },
  {
    id: "weight-buoyancy",
    number: 2,
    title: "Weight, Buoyant Force and Buoyancy",
    icon: Weight,
    subtopics: [
      { id: "weight-w", title: "Weight (W)", hasContent: true },
      { id: "center-of-gravity", title: "Center of gravity (G)", hasContent: true },
      { id: "buoyancy-force", title: "Buoyancy", hasContent: true },
      { id: "center-of-buoyancy", title: "Lift center (B)", hasContent: true },
      { id: "floatation-condition", title: "Buoyancy condition", hasContent: true },
      { id: "equilibrium-states", title: "Equilibrium states (stable, unstable, neutral equilibrium)", hasContent: true },
    ],
  },
  {
    id: "metacentric",
    number: 3,
    title: "Metacentric Concepts and Initial Stability",
    icon: Target,
    subtopics: [
      { id: "metacenter-m", title: "Concept of metacentre (M)", hasContent: true },
      { id: "metacentric-height-gm", title: "Metacentric height (GM)", hasContent: true },
      { id: "kb-bm-kg-relation", title: "Relationship between KB, BM and KG", hasContent: true },
      { id: "positive-gm", title: "Positive GM", hasContent: true },
      { id: "negative-gm", title: "Negative GM", hasContent: true },
      { id: "gm-ship-movements", title: "GM's impact on ship movements", hasContent: true },
    ],
  },
  {
    id: "cog-shift",
    number: 4,
    title: "Displacement of the Center of Gravity",
    icon: Settings,
    subtopics: [
      { id: "weight-addition", title: "Adding weight", hasContent: true },
      { id: "weight-removal", title: "Weight removal", hasContent: true },
      { id: "weight-shift", title: "Weight shifting", hasContent: true },
      { id: "vertical-weight-movement", title: "Vertical weight movements", hasContent: true },
      { id: "transverse-weight-movement", title: "Transverse weight movements", hasContent: true },
      { id: "longitudinal-weight-movement", title: "Longitudinal weight movements", hasContent: true },
    ],
  },
  {
    id: "transverse-stability",
    number: 5,
    title: "Transverse Stability Calculations",
    icon: Scale,
    subtopics: [
      { id: "righting-moment", title: "Righting moment", hasContent: true },
      { id: "heeling-moment", title: "Heeling moment", hasContent: true },
      { id: "angle-of-equilibrium", title: "Equilibrium angle", hasContent: true },
      { id: "heel-from-weight-shift", title: "Lying down due to weight shift", hasContent: true },
      { id: "small-angle-stability", title: "Stability for small angles", hasContent: true },
      { id: "large-angle-stability", title: "Stability for large angles", hasContent: true },
    ],
  },
  {
    id: "free-surface",
    number: 6,
    title: "Free Surface Effect",
    icon: Waves,
    subtopics: [
      { id: "free-surface-concept", title: "Free surface concept", hasContent: true },
      { id: "fse-gm-effect", title: "Effect of free surface on GM", hasContent: true },
      { id: "fsm", title: "Free Surface Moment (FSM)", hasContent: true },
      { id: "fse-calc", title: "Free Surface Effect (FSE)", hasContent: true },
      { id: "tank-geometry-effect", title: "Effect of tank geometry", hasContent: true },
      { id: "multiple-tanks-effect", title: "Effect of multiple tanks", hasContent: true },
    ],
  },
  {
    id: "longitudinal-stability",
    number: 7,
    title: "Longitudinal Stability and Trim",
    icon: Anchor,
    subtopics: [
      { id: "lcg", title: "Longitudinal center of gravity (LCG)", hasContent: true },
      { id: "lcb", title: "Center of buoyancy (LCB)", hasContent: true },
      { id: "trim-concept", title: "Trim concept", hasContent: true },
      { id: "mct", title: "MCT (Moment to Change Trim)", hasContent: true },
      { id: "trim-calculations", title: "Trim calculations", hasContent: true },
      { id: "trim-control", title: "Trim control during loading and unloading", hasContent: true },
    ],
  },
  {
    id: "hydrostatic-data",
    number: 8,
    title: "Hydrostatic Data and Stability Tables",
    icon: BarChart3,
    subtopics: [
      { id: "displacement", title: "Displacement", hasContent: true },
      { id: "draft", title: "Draft", hasContent: true },
      { id: "draft-displacement-relation", title: "Draft–away relationship", hasContent: true },
      { id: "tpc", title: "TPC (Ton Per Centimeter)", hasContent: true },
      { id: "km-values", title: "KM values", hasContent: true },
      { id: "hydrostatic-tables-usage", title: "Use of hydrostatic tables", hasContent: true },
      { id: "inclining-experiment", title: "Inclining Experiment", hasContent: true },
    ],
  },
  {
    id: "gz-curve",
    number: 9,
    title: "Righting arms and Stability Curves (GZ Curve)",
    icon: Activity,
    subtopics: [
      { id: "gz-righting-lever", title: "Righting arm (GZ)", hasContent: true },
      { id: "gz-curve-generation", title: "Obtaining the GZ curve", hasContent: true },
      { id: "max-gz", title: "Maximum GZ", hasContent: true },
      { id: "stability-area", title: "Stability area", hasContent: true },
      { id: "capsizing-angle", title: "Tipping angle", hasContent: true },
      { id: "gz-curve-interpretation", title: "Interpretation of the GZ curve", hasContent: true },
    ],
  },
  {
    id: "dynamic-stability",
    number: 10,
    title: "Dynamic Stability",
    icon: Zap,
    subtopics: [
      { id: "dynamic-righting-moment", title: "Dynamic righting moment", hasContent: true },
      { id: "area-concept", title: "Concept of space", hasContent: true },
      { id: "static-vs-dynamic", title: "Static and dynamic stability difference", hasContent: true },
      { id: "wave-effect", title: "Wave effect", hasContent: true },
      { id: "wind-effect", title: "Wind effect", hasContent: true },
    ],
  },
  {
    id: "damage-stability",
    number: 11,
    title: "Damage Stability",
    icon: AlertTriangle,
    subtopics: [
      { id: "post-damage-floatation", title: "Buoyancy after damage", hasContent: true },
      { id: "flooding-concept", title: "Flooding concept", hasContent: true },
      { id: "reserve-buoyancy", title: "Reserve buoyancy", hasContent: true },
      { id: "asymmetric-flooding", title: "Asymmetric flooding", hasContent: true },
      { id: "progressive-flooding", title: "Progressive flooding", hasContent: true },
      { id: "damaged-gm-gz", title: "Damaged GM and GZ", hasContent: true },
      { id: "probabilistic-damage-stability", title: "Probabilistic damage stability (deterministic vs probabilistic)", hasContent: true },
    ],
  },
  {
    id: "special-stability",
    number: 12,
    title: "Special Stability Cases",
    icon: Ship,
    subtopics: [
      { id: "heavy-lift", title: "Heavy lift operations", hasContent: true },
      { id: "deck-cargo", title: "Deck loads", hasContent: true },
      { id: "suspended-weight", title: "Suspended load effect", hasContent: true },
      { id: "ballast-operations", title: "Ballast operations", hasContent: true },
      { id: "cargo-shift", title: "Cargo shift", hasContent: true },
      { id: "icing-effect", title: "Frosting effect", hasContent: true },
      { id: "drydocking-stability", title: "Drydocking stability", hasContent: true },
    ],
  },
  {
    id: "stability-criteria",
    number: 13,
    title: "Stability Criteria and International Rules",
    icon: Shield,
    subtopics: [
      { id: "imo-stability-criteria", title: "IMO stability criteria", hasContent: true },
      { id: "intact-stability-code", title: "Intact Stability Code", hasContent: true },
      { id: "wind-criteria", title: "Wind criteria", hasContent: true },
      { id: "wave-criteria", title: "Wave criteria", hasContent: true },
      { id: "min-gm-requirements", title: "Minimum GM requirements", hasContent: true },
      { id: "operational-limits", title: "Operational limits", hasContent: true },
    ],
  },
  {
    id: "stability-accidents",
    number: 14,
    title: "Stability Accidents and Operational Consequences",
    icon: BookMarked,
    subtopics: [
      { id: "loading-errors", title: "Loading errors", hasContent: true },
      { id: "fse-accidents", title: "Free surface accidents", hasContent: true },
      { id: "wrong-gm-interpretation", title: "Incorrect GM comments", hasContent: true },
      { id: "trim-operation-errors", title: "Operation errors caused by trim", hasContent: true },
      { id: "psc-findings", title: "Stability-related PSC findings", hasContent: true },
    ],
  },
];

// İçerik veritabanı - her alt konu için detaylı içerik
interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  examples?: {
    problem: string;
    solution: string;
  }[];
  formula?: {
    name: string;
    expression: string;
    description: string;
  };
  keyPoints?: string[];
  warnings?: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const topicContents: Record<string, TopicContent> = {
  "stability-definition": {
    title: "Definition of Stability",
    introduction: "Stability is the ability of a ship to maintain its balance under external forces and to return to its original state when the balance is disturbed.",
    content: `Ship stability is one of the most critical subjects in marine engineering. A ship must have adequate stability if it is to make a safe passage.

The concept of stability essentially answers this question: "Will the ship return upright when it heels?"

The stability of a body is determined by how it responds when it is moved from its equilibrium position. If the body tries to return to its former position it is stable; if it moves further away it is unstable.

On ships, stability changes continuously with the loading condition, the level of the tanks, the weather and the operations being carried out. A stability calculation must therefore be made for every loading condition.`,
    bulletPoints: [
      "Stability = Ability to maintain balance + return to balance",
      "Insufficient stability = risk of tipping over",
      "Excessive stability = Harsh oscillation, load damage",
      "Optimum stability = Safe and comfortable sailing",
    ],
    keyPoints: [
      "Stability is the most important safety parameter of the ship",
      "Must be checked in every loading case",
      "IMO criteria determine minimum requirements",
    ],
  },
  "balance-concepts": {
    title: "Concepts of Balance, Tilting and Straightening",
    introduction: "Equilibrium in ships is the state in which the forces acting on them are in balance. Overturning is the disruption of this balance, and straightening is the restoration of the balance.",
    content: `Two fundamental forces act on a ship in equilibrium:
1. The weight force (W) – acting downwards through the centre of gravity (G)
2. The buoyancy force (B) – acting upwards through the centre of buoyancy (B)

In equilibrium: W = B, and G and B lie on the same vertical line.

CAPSIZING:
When the ship heels, G stays where it is while B moves towards the low side. This creates a moment.

RIGHTING:
If the moment created tries to bring the ship upright, it is a "righting moment" and the ship is stable.
If the moment tries to heel the ship further, the ship is unstable.`,
    bulletPoints: [
      "Equilibrium: W = B, G and B are in the same vertical line",
      "Lying: Point B shifts to the lying side",
      "Righting moment: The moment that brings the ship to an upright position.",
      "Overturning moment: The moment that tilts the ship more.",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = W × GZ",
      description: "RM: Righting moment (t-m), W: Displacement (ton), GZ: Righting arm (m)",
    },
    keyPoints: [
      "Equilibrium means that the forces are equal and the moments are zero.",
      "Rollover is a dangerous disruption of balance",
      "Righting is the ship's ability to right itself",
    ],
  },
  "static-stability": {
    title: "Static Stability",
    introduction: "Static stability is the type of stability analyzed when the ship remains stationary at a certain angle of heel and does not move.",
    content: `Static stability examines the equilibrium of the ship at a given angle of heel. The analysis is made for a condition in which there is no motion, that is, in which the ship is treated as "frozen" at that angle.

The basic question in static stability is: "Will the ship stay heeled at a given angle, or will it return upright?"

Static stability analysis is carried out using the GZ (righting lever) curve. This curve shows how much righting moment the ship produces at different angles of heel.

A positive GZ value shows that at that angle the ship tends to return upright.
A negative GZ value shows that the ship tends to heel further.`,
    bulletPoints: [
      "Static = No movement, instantaneous balance analysis",
      "GZ curve is the basic tool of static stability",
      "Positive GZ = Ship will return to upright position",
      "Negative GZ = Ship will list more",
    ],
    keyPoints: [
      "Static stability examines the state of equilibrium at a particular moment",
      "GZ curve provides stability information for all lean angles",
      "IMO criteria are based on static stability",
    ],
  },
  "dynamic-stability-intro": {
    title: "Dynamic Stability",
    introduction: "Dynamic stability is the stability behavior of the ship while it is in motion and exposed to external forces.",
    content: `Dynamic stability examines the behaviour of the ship in real sea conditions. Unlike static stability, here the motion of the ship and the energy balance are taken into account.

External forces such as waves, wind and manoeuvring transfer energy to the ship. This energy is converted into heeling motion. The ship must be able to absorb this energy and keep its equilibrium without capsizing.

Dynamic stability is measured by the area under the GZ curve. This area represents the amount of energy the ship can absorb up to a given angle.

A large area = more energy absorbing capacity = better dynamic stability`,
    bulletPoints: [
      "Dynamic = There is movement, energy balance analysis",
      "External forces transfer energy to the ship",
      "Area under curve GZ = Energy capacity",
      "IMO criteria determine space requirements",
    ],
    formula: {
      name: "Dynamic Stability",
      expression: "E = ∫ Δ × GZ × dθ",
      description: "E: Energy (t-m-rad), Δ: Displacement (tons), GZ: Righting arm (m), θ: Angle (rad)",
    },
    keyPoints: [
      "Dynamic stability reflects real sea conditions",
      "Energy balance is critical",
      "Field criteria are mandated by IMO",
    ],
  },
  "initial-stability": {
    title: "First Concept of Stability",
    introduction: "Initial stability defines the stability behavior of the ship at small heel angles (0-10°) and is expressed as the GM value.",
    content: `Initial stability is the stability of the ship at small angles of heel from upright (generally up to 10°). Within this range the metacentre (M) is taken as fixed.

The measure of initial stability is the metacentric height GM:
GM = KM - KG

Where:
- KM: the distance from the keel to the metacentre (from the hydrostatic tables)
- KG: the distance from the keel to the centre of gravity (from the loading calculation)

Large GM = a stiff ship, rapid rolling
Small GM = a tender ship, slow rolling
Negative GM = an unstable ship, danger!`,
    bulletPoints: [
      "Initial stability applies to small angles (0-10°)",
      "GM value is a measure of initial stability",
      "Calculated with the formula GM = KM - KG",
      "GM must be positive (minimum 0.15 m)",
    ],
    formula: {
      name: "Metacentric Height",
      expression: "GM = KM - KG",
      description: "GM: Metacentric height (m), KM: Keel to metacentric (m), KG: Keel to center of gravity (m)",
    },
    keyPoints: [
      "GM must be positive - negative GM is dangerous",
      "Too large GM causes harsh oscillation",
      "Too small GM means slow response and risk",
    ],
    warnings: [
      "If GM is negative the ship cannot stay upright and rests at an angle of loll",
      "The minimum GM value is set by the IMO according to ship type",
    ],
  },
  "metacenter-m": {
    title: "Concept of metacentre (M)",
    introduction: "The metacentre is the point where the curve followed by the center of lift intersects with the vertical axis when the ship is tilted at small angles and is the geometric basis of initial stability.",
    content: `The metacentre (M) is the point at which the vertical drawn through the new position of the centre of buoyancy (B), when the ship heels through a very small angle, intersects the ship's centreline. This point determines whether or not a righting moment is produced at small angles.

The position of the metacentre is determined by the distance BM, calculated from the waterplane moment of inertia and the immersed volume. BM is the vertical distance between B and M and is sensitive to the shape of the waterplane.`,
    images: [
      {
        src: metacenterDiagram,
        alt: "Metacentre and GM diagram",
        caption: "Figure: the points K, B, G and M in a midship section, and the GM distance",
      },
    ],
    bulletPoints: [
      "Point M is considered fixed at small angles of repose",
      "BM distance depends on waterline geometry",
      "Metacentre is the geometric reference point of initial stability",
    ],
    formula: {
      name: "Metacentric Radius",
      expression: "BM = I / ∇; KM = KB + BM",
      description: "BM: Metacentric radius (m), I: Waterline moment of inertia (m⁴), ∇: Submerged volume (m³), KB: Keel to buoyancy center (m)",
    },
    examples: [
      {
        problem: "If I = 3,200 m⁴, ∇ = 6,400 m³ and KB = 3.2 m, what are BM and KM in metres?",
        solution: "1) BM = I / ∇ = 3,200 / 6,400 = 0.5 m. 2) KM = KB + BM = 3.2 + 0.5 = 3.7 m. Result: the metacentre is 3.7 m above the keel.",
      },
    ],
    keyPoints: [
      "As the BM grows, the metacenter rises",
      "As the waterline widens, I increases and BM becomes larger",
      "Metacentre position is the key input to initial stability",
    ],
  },
  "metacentric-height-gm": {
    title: "Metacentric height (GM)",
    introduction: "Metacentric height GM is the vertical distance between the metacentre and the center of gravity and is a numerical measure of initial stability.",
    content: `GM shows how quickly the ship will produce a righting moment at small angles of heel. If GM is positive the ship tends to return upright; if GM is negative the ship is unstable.

The GM value is the difference between the KM taken from the hydrostatic tables and the KG produced by the loading calculation. As GM increases the ship becomes stiffer and the rolling period shortens.

Diagram: a sketch showing KB, G and M on the same vertical line above the keel, with the GM interval highlighted.`,
    bulletPoints: [
      "GM is the main indicator of initial stability",
      "GM must be positive",
      "KM comes from hydrostatic data, KG comes from loading calculation",
    ],
    formula: {
      name: "Metacentric Height",
      expression: "GM = KM - KG",
      description: "GM: Metacentric height (m), KM: Keel to metacentric (m), KG: Keel to center of gravity (m)",
    },
    examples: [
      {
        problem: "If KM = 7.2 m and KG = 6.6 m, what is GM in metres?",
        solution: "1) GM = KM - KG. 2) GM = 7.2 - 6.6 = 0.6 m. Result: since GM is positive the ship is stable at small angles.",
      },
    ],
    keyPoints: [
      "As GM increases, the righting moment increases.",
      "As the GM becomes smaller, the ship becomes softer and its tendency to list increases.",
      "If GM is negative the ship moves to loll angle",
    ],
  },
  "kb-bm-kg-relation": {
    title: "Relationship between KB, BM and KG",
    introduction: "The relationship between KB, BM and KG is the basic geometric chain that determines metacentric height and initial stability.",
    content: `KB is the distance from the keel to the centre of buoyancy and depends on the immersed shape. BM is the ratio of the waterplane moment of inertia to the immersed volume. KG is the height of the centre of gravity above the keel.

When these three quantities are brought together, KM is calculated first and then GM is found. This chain is the most fundamental geometric relationship used in the stability calculation.

Diagram: the keel, KB, BM and KG points on a transverse section of the ship, with the KM and GM intervals shown by dimension lines.`,
    bulletPoints: [
      "KB comes from the hydrostatic table",
      "BM is sensitive to waterline shape",
      "KG depends on loading condition",
    ],
    formula: {
      name: "Geometric Relationships",
      expression: "KM = KB + BM; GM = KM - KG",
      description: "KM: From keel to metacenter (m), KB: From keel to center of gravity (m), BM: Metacentric radius (m), KG: From keel to center of gravity (m)",
    },
    examples: [
      {
        problem: "If KB = 4.0 m, BM = 1.2 m and KG = 4.6 m, what are KM and GM in metres?",
        solution: "1) KM = KB + BM = 4.0 + 1.2 = 5.2 m. 2) GM = KM - KG = 5.2 - 4.6 = 0.6 m. Result: GM is positive, so the initial stability is adequate.",
      },
    ],
    keyPoints: [
      "As KG increases, GM decreases",
      "BM depends on waterline width and form",
      "KB and BM should be supported by hydrostatic tables",
    ],
  },
  "positive-gm": {
    title: "Positive GM",
    introduction: "Positive GM indicates that the center of gravity is below the metacenter and the ship is capable of producing a righting moment at small angles.",
    content: `When GM is positive and the ship heels through a small angle, a righting lever GZ is created and the ship tends to return upright. In this condition the righting moment acts in the positive direction.

For small angles GZ is taken as GM multiplied by the sine of the angle. This simple relationship is used in initial stability calculations.

Diagram: G below M, the ship heeled through a small angle, with the GZ lever and the righting moment arrows shown.`,
    bulletPoints: [
      "Positive GM indicates the presence of initial stability",
      "GZ righting arm becomes positive",
      "Righting moment makes the ship upright",
    ],
    formula: {
      name: "Small Angle Rectification Relationship",
      expression: "GZ ≈ GM × sin θ; RM = Δ × GZ",
      description: "GZ: Righting arm (m), GM: Metacentric height (m), θ: Angle of heel (degrees), RM: Righting moment (t m), Δ: Displacement (tons)",
    },
    examples: [
      {
        problem: "If GM = 0.8 m, θ = 10° and Δ = 5,000 tonnes, what are GZ and RM?",
        solution: "1) sin 10° ≈ 0.174. 2) GZ ≈ 0.8 × 0.174 = 0.139 m. 3) RM = Δ × GZ = 5,000 × 0.139 = 695 t m. Result: the righting moment is positive and the ship tends to return upright.",
      },
    ],
    keyPoints: [
      "Positive GM provides safe initial stability",
      "GZ and RM values increase with angle",
      "Small angles approach valid up to 10 degrees",
    ],
  },
  "negative-gm": {
    title: "Negative GM",
    introduction: "Negative GM indicates that the center of gravity is above the metacenter and the ship is unstable at small angles.",
    content: `When GM is negative and the ship heels through a small angle, the righting lever GZ becomes negative. The moment then heels the ship further and the ship behaves unstably.

A negative GM can cause the ship to come to rest at an angle of loll. This condition is operationally dangerous and the loading must be corrected immediately.

Diagram: G above M, the ship heeled through a small angle, with the GZ lever and the moment arrows shown in the capsizing direction.`,
    bulletPoints: [
      "Negative GM indicates imbalance",
      "GZ becomes negative and an overturning moment occurs",
      "Loll angle may occur and operational risk arises",
    ],
    formula: {
      name: "Negative GM Status",
      expression: "GZ ≈ GM × sin θ; RM = Δ × GZ",
      description: "If GM is negative, GZ and RM are also negative and the moment is in the direction of overturning.",
    },
    examples: [
      {
        problem: "If GM = -0.3 m, θ = 8° and Δ = 5,000 tonnes, what are GZ and RM?",
        solution: "1) sin 8° ≈ 0.139. 2) GZ ≈ -0.3 × 0.139 = -0.042 m. 3) RM = 5,000 × -0.042 = -210 t m. Result: the negative moment heels the ship further.",
      },
    ],
    keyPoints: [
      "Negative GM requires immediate correction",
      "Loll angle is the seemingly stable but risky position of the ship.",
      "Loading and ballast layout should be reviewed",
    ],
  },
  "gm-ship-movements": {
    title: "GM's impact on ship movements",
    introduction: "GM determines the roll period and movement character of the ship; Large GM causes hard movements, small GM causes soft movements.",
    content: `As GM increases the ship's righting moment increases and the rolling period shortens. This makes the ship stiff and increases the dynamic forces on the cargo.

As GM decreases the rolling period lengthens, the ship rolls slowly and passenger comfort may improve; but the margin of stability is reduced. The GM value must therefore be weighed carefully between safety and comfort.

Diagram: a comparison of the rolling period curve and the amplitude of roll for different GM values.`,
    bulletPoints: [
      "Big GM = Short period, hard action",
      "Small GM = long period, smooth action",
      "Balance required between comfort and safety",
    ],
    formula: {
      name: "Rolling Period",
      expression: "T = 2π × √(k² / (g × GM))",
      description: "T: Roll period (s), k: Inertia radius (m), g: Gravitational acceleration (9.81 m s²), GM: Metacentric height (m)",
    },
    examples: [
      {
        problem: "For k = 4.5 m and GM = 0.6 m, what is the rolling period in seconds?",
        solution: "1) k² = 4.5 × 4.5 = 20.25. 2) g × GM = 9.81 × 0.6 = 5.886. 3) 20.25 / 5.886 = 3.44. 4) √3.44 = 1.855. 5) T = 2π × 1.855 = 11.65 s. Result: the rolling period is about 11.6 seconds.",
      },
    ],
    keyPoints: [
      "GM increase reduces period",
      "Excessive GM creates impact effect on load and equipment",
      "GM target range should be determined for operational comfort",
    ],
  },
  "stability-safety": {
    title: "Relationship Between Stability and Navigational Safety",
    introduction: "Stability is the pillar of navigational safety. Inadequate stability can lead to loss of life, loss of ship and environmental disasters.",
    content: `Many tragic casualties in maritime history have been caused by inadequate stability. These casualties have led to the stability rules being updated and tightened continuously.

The relationship between stability and safety:
1. Crew safety: capsizing causes loss of life
2. Passenger safety: thousands of people are at risk on passenger ships
3. Environmental safety: fuel and cargo can leak into the sea
4. Economic safety: the loss of ship and cargo causes major financial damage

The ISM (International Safety Management) Code makes stability management mandatory. The master must verify that stability is adequate in every loading condition.`,
    bulletPoints: [
      "Insufficient stability = risk of loss of life",
      "ISM Code mandates stability management",
      "The Master bears responsibility for stability",
      "Stability calculation is essential for every loading",
    ],
    keyPoints: [
      "Stability is the most critical safety parameter",
      "Historical accidents have shaped legislation",
      "Loading computers are used in stability control",
    ],
    warnings: [
      "Inadequate stability can cause the ship to founder",
      "The limits in the stability booklet must be complied with",
    ],
  },
  "weight-addition": {
    title: "Adding weight",
    introduction: "When a new weight is added to the ship, the total displacement increases and the center of gravity shifts towards the location of the added load.",
    content: `Adding weight covers operations such as loading cargo, taking bunkers/ballast and installing equipment. Because the added weight increases the total weight, the ship's draft increases and the KG, LCG and TCG values change.

The new centre of gravity is calculated by the method of moments. The vertical (kg), transverse (tcg) and longitudinal (lcg) positions of the added weight are each assessed separately. This is essential at every loading step in order to stay within the limits of the stability book.

Diagram: the added weight on the ship, with the vector along which G moves towards the weight and the moment arm shown.`,
    bulletPoints: [
      "Displacement increases, draft increases",
      "Point G approaches the position of the added load",
      "KG, LCG and TCG are updated separately",
    ],
    formula: {
      name: "New KG with Adding Weight",
      expression: "KG₁ = (Δ × KG₀ + w × kg) / (Δ + w)",
      description: "Δ: initial displacement (t), KG₀: initial KG (m), w: added weight (t), kg: vertical position of added load (m)",
    },
    examples: [
      {
        problem: "Δ = 5,000 t, KG₀ = 6.2 m, and a weight of w = 200 t is added at kg = 9.0 m. What is the new KG in metres?",
        solution: "KG₁ = (5,000×6.2 + 200×9.0) / 5,200 = (31,000 + 1,800) / 5,200 = 6.31 m. Result: KG rises and GM falls.",
      },
    ],
    keyPoints: [
      "If load is added above, KG increases, stability decreases",
      "If the load is added below, KG decreases, stability increases",
      "The new G position must be calculated for each insertion step",
    ],
  },
  "weight-removal": {
    title: "Weight removal",
    introduction: "When the weight is removed, the displacement decreases and the center of gravity shifts in the opposite direction of the removed load.",
    content: `Removing weight occurs through operations such as discharging cargo, consuming fuel or discharging ballast. The ship becomes lighter, the draft decreases and G moves in the opposite direction to the position of the weight removed.

If the weight removed was high up, KG decreases and stability may improve; if weight is removed from low down, KG rises and stability decreases. The consumption and discharge plan must therefore be watched carefully from the stability point of view.

Diagram: the movement of G in the opposite direction after the weight is removed, with the moment arm shown.`,
    bulletPoints: [
      "Displacement decreases, draft decreases",
      "Point G shifts in the opposite direction of the removed load",
      "Lifting weights at altitude improves stability",
    ],
    formula: {
      name: "New KG with Weight Subtraction",
      expression: "KG₁ = (Δ × KG₀ - w × kg) / (Δ - w)",
      description: "Δ: initial displacement (t), KG₀: initial KG (m), w: removed weight (t), kg: vertical position of removed load (m)",
    },
    examples: [
      {
        problem: "Δ = 4,800 t, KG₀ = 5.9 m, and a weight of w = 150 t is removed from kg = 10 m. What is the new KG in metres?",
        solution: "KG₁ = (4,800×5.9 - 150×10) / 4,650 = (28,320 - 1,500) / 4,650 = 5.77 m. Result: KG falls and stability improves.",
      },
    ],
    keyPoints: [
      "Removing weight from the top increases GM",
      "Removing weight from the bottom reduces GM",
      "Fuel consumption must be monitored in the stability plan",
    ],
  },
  "weight-shift": {
    title: "Weight shifting",
    introduction: "Weight shifting causes the center of gravity to change direction without changing displacement and can create list/trim.",
    content: `Shifting weight means moving a weight from one position to another within the ship. The total displacement does not change in this operation, but G moves in the direction in which the weight is moved.

A transverse shift causes list and a longitudinal shift causes a change of trim. A vertical shift affects GM directly. The effect of shifting weight must therefore always be calculated during crane operations, container moves and ballast transfers.

Diagram: the weight moved to its new position, with the vector of the shift of G and the resulting moment arm shown.`,
    bulletPoints: [
      "Displacement remains constant, point G moves",
      "Creates a cross-scrolling list",
      "Longitudinal shift changes trim",
    ],
    formula: {
      name: "G Change with Weight Shift",
      expression: "GG₁ = (w × d) / Δ",
      description: "GG₁: shifting amount of G (m), w: shifted weight (t), d: shifting distance (m), Δ: displacement (t)",
    },
    examples: [
      {
        problem: "Δ = 6,000 t and a weight of w = 120 t is shifted 6 m transversely. How far does G move?",
        solution: "GG₁ = (120×6) / 6,000 = 0.12 m. Result: G moves 12 cm and a list is created.",
      },
    ],
    keyPoints: [
      "G shift directly creates list/trim",
      "Shift effect is critical in crane operations",
      "Even short distances can create a big list",
    ],
  },
  "vertical-weight-movement": {
    title: "Vertical weight movements",
    introduction: "Vertical transportation of weight changes the KG and directly affects the initial stability of the ship.",
    content: `In vertical weight movements, KG increases if the weight is moved up and decreases if it is moved down. This operation does not change the displacement but has a strong effect on GM.

Lifting a weight with a crane, placing equipment on deck or transferring ballast to the bottom tanks are all vertical weight movements. In particular, when a weight is suspended the effective position of its centre of gravity is taken as having moved to the point of suspension.

Diagram: the weight moved up/down, with the new position of KG and the change in GM shown.`,
    bulletPoints: [
      "Moving up increases KG, decreases GM",
      "Moving down reduces KG, increases GM",
      "The suspended load moves the center of gravity to the suspension point",
    ],
    formula: {
      name: "KG Change with Vertical Transport",
      expression: "ΔKG = (w × d) / Δ",
      description: "ΔKG: KG change (m), w: weight carried (t), d: vertical carrying distance (m), Δ: displacement (t)",
    },
    examples: [
      {
        problem: "Δ = 7,200 t and a weight of w = 80 t is moved 4 m upwards. By how much does KG increase?",
        solution: "ΔKG = (80×4) / 7,200 = 0.044 m. Result: KG increases by about 4.4 cm and GM falls.",
      },
    ],
    keyPoints: [
      "Vertical movements have the fastest effect on the GM",
      "Stability decreases while the load is suspended",
      "Allowed KG limits should be checked in critical operations",
    ],
  },
  "transverse-weight-movement": {
    title: "Transverse weight movements",
    introduction: "Transverse weight movements change the TCG and create list (heeling) on the ship.",
    content: `A transverse shift is the movement of a weight from port to starboard or from starboard to port. G moves towards the low side and the ship comes to an angle of equilibrium.

For small angles the list calculation is based on the principle of balancing the righting moment against the heeling moment. Because transverse shifts are frequent in port operations, they must always be calculated in the loading plan.

Diagram: the transverse movement of the weight, the shift of TCG and the resulting angle of list.`,
    bulletPoints: [
      "TCG shift creates list",
      "For small angles the tan θ approximation is used",
      "Container and pallet relocations can create lists",
    ],
    formula: {
      name: "List Angle in Transverse Scroll",
      expression: "tan θ = (w × d) / (Δ × GM)",
      description: "θ: list angle (rad), w: weight carried (t), d: transverse carrying distance (m), Δ: displacement (t), GM: metacentric height (m)",
    },
    examples: [
      {
        problem: "Δ = 5,500 t, GM = 0.9 m, and a weight of w = 60 t is shifted 5 m transversely. What is the approximate angle of list in degrees?",
        solution: "tan θ = (60×5) / (5,500×0.9) = 300 / 4,950 = 0.0606. θ ≈ 3.47°. Result: a list of about 3.5° is created.",
      },
    ],
    keyPoints: [
      "As GM gets smaller, list angle gets bigger",
      "Transverse handling operations must be carried out within limits",
      "Loads should be placed symmetrically and the list should be followed.",
    ],
  },
  "longitudinal-weight-movement": {
    title: "Longitudinal weight movements",
    introduction: "Longitudinal weight movements change the LCG and affect the trim of the ship.",
    content: `Weights moved longitudinally change the fore-and-aft balance of the ship. This change is expressed as a shift of LCG and causes trim.

The key quantity in the trim calculation is the MCT (Moment to Change Trim). The change of trim is found by comparing the longitudinal shifting moment (w × d) with the MCT. This analysis is critical for the loading plan and for preparing for sea.

Diagram: the weight shifted forward/aft, the shift of LCG and the resulting direction of trim.`,
    bulletPoints: [
      "LCG shift changes trim",
      "MCT is used in trim calculation",
      "Fore-aft imbalance affects performance",
    ],
    formula: {
      name: "Trim Change in Longitudinal Shift",
      expression: "Trim = (w × d) / MCT",
      description: "Trim: trim change (m or cm), w: weight carried (t), d: longitudinal transport distance (m), MCT: trim change moment (t·m/cm or t·m/m)",
    },
    examples: [
      {
        problem: "A weight of w = 200 t is shifted 12 m forward. If MCT = 400 t·m/cm, what is the change of trim in cm?",
        solution: "Trim = (200×12) / 400 = 2,400 / 400 = 6 cm. Result: the trim by the head increases by about 6 cm.",
      },
    ],
    keyPoints: [
      "Trim change affects fuel consumption and speed",
      "LCB compliance should be checked with LCG drift",
      "MCT value is taken from hydrostatic tables",
    ],
  },
  // Diğer konular için içerikler...
  "weight-w": {
    title: "Weight (W)",
    introduction: "The total weight of the ship is called the displacement and determines the buoyancy required for the ship to float.",
    content: `The weight of the ship (W or Δ) is the total weight of all its components:

W = Lightship weight + Cargo + Fuel + Fresh water + Provisions + Crew + ...

This total weight is expressed in tonnes (t) and is called the "displacement".

By Archimedes' principle a floating body displaces water equal to its own weight. Therefore:
Displacement = the weight of the water displaced

Displacement is the basis of stability calculations. The righting moment is the displacement multiplied by GZ.`,
    bulletPoints: [
      "Displacement = Total weight of the ship",
      "Displacement = Weight of water displaced",
      "Unit: ton (t) or metric ton",
      "As draft increases, displacement increases",
    ],
    formula: {
      name: "Displacement Calculation",
      expression: "Δ = ∇ × ρ",
      description: "Δ: Displacement (tons), ∇: Submerged volume (m³), ρ: Seawater density (1.025 t/m³)",
    },
    examples: [
      {
        problem: "If lightship = 3,500 t, cargo = 1,200 t, fuel = 300 t and fresh water = 50 t, what is the displacement in tonnes?",
        solution: "Δ = 3.500 + 1.200 + 300 + 50 = 5.050 ton",
      },
    ],
    keyPoints: [
      "Displacement is the key input to stability",
      "Displacement changes with loading",
      "Draft-displacement relationship is read from hydrostatic tables",
    ],
  },
  "center-of-gravity": {
    title: "Center of Gravity (G)",
    introduction: "The center of gravity (G) is the point where the entire weight of the ship is assumed to be concentrated at a single point and is the most critical parameter of stability.",
    content: `The centre of gravity G is the resultant point of all the weights on the ship, calculated by the method of moments.

The position of G is defined in three dimensions:
- KG: the vertical distance from the keel to G (the most critical)
- LCG: the longitudinal centre of gravity (important for trim)
- TCG: the transverse centre of gravity (important for list)

The KG value is the fundamental determinant of stability:
- If KG rises → GM falls → stability weakens
- If KG falls → GM rises → stability improves

Every movement of weight changes the position of G.`,
    bulletPoints: [
      "G = Resultant point of all weights",
      "KG height directly affects stability",
      "Adding/removing load moves G",
      "Load transport shifts G in the direction carried",
    ],
    formula: {
      name: "KG Calculation",
      expression: "KG = Σ(wᵢ × kgᵢ) / Σwᵢ",
      description: "Sum of moments of each weight / total weight",
    },
    examples: [
      {
        problem: "If 100 t of cargo is at KG = 6 m and 200 t at KG = 3 m, what is the combined KG in metres?",
        solution: "KG = (100×6 + 200×3) / 300 = (600 + 600) / 300 = 4.0 m",
      },
    ],
    keyPoints: [
      "The lower the KG the better the stability",
      "KG must be recalculated with each loading process",
      "G changes instantaneously as load transport begins",
    ],
  },
  "buoyancy-force": {
    title: "Buoyant force",
    introduction: "Buoyancy is the primary force that keeps a ship afloat and is equal to the weight of the water it displaces.",
    content: `The buoyancy force is equal to the weight of the water displaced by the immersed volume of the ship. It acts upwards through the centre of buoyancy (B) and keeps the ship afloat by balancing its weight.

The buoyancy force depends on the density of the water. A ship therefore floats deeper in fresh water and higher in sea water.

In stability calculations the buoyancy force is taken as equal to the ship's displacement:
B = W = Δ`,
    bulletPoints: [
      "The buoyant force is upward and acts at point B.",
      "On a floating ship there is an equilibrium Y = W",
      "As the density of water changes, the buoyant force changes.",
    ],
    formula: {
      name: "Buoyant force",
      expression: "Y = ρ × g × ∇",
      description: "Y: Buoyancy force (kN), ρ: Density (t/m³), g: 9.81 m/s², ∇: Submerged volume (m³)",
    },
    examples: [
      {
        problem: "For a ship with ∇ = 3,000 m³ in water of ρ = 1.025 t/m³, what is the buoyancy force in kN?",
        solution: "Y = 1.025 × 9.81 × 3.000 ≈ 30 166 kN",
      },
    ],
    keyPoints: [
      "Buoyant force equals the weight of the ship",
      "Density change affects draft",
      "As point B changes, a righting moment occurs",
    ],
  },
  "center-of-buoyancy": {
    title: "Lift Center (B)",
    introduction: "The center of buoyancy (B) is the geometric center of gravity of the submerged volume and the point of action of the buoyant force.",
    content: `The centre of buoyancy (B) is the geometric centre of the ship's immersed volume. This point moves when the ship heels because the shape of the immersed volume changes.

As the ship begins to heel, B moves towards the low side. This movement creates a moment arm relative to the centre of gravity and a righting moment is produced.

For simple prismatic shapes B lies at the centre of the immersed volume and, in the upright condition, is T/2 above the keel.`,
    bulletPoints: [
      "B is the geometric center of the submerged volume",
      "When the ship is heeling, B slides to the leaning side",
      "The slip of B is the basis of the righting moment",
    ],
    formula: {
      name: "Lift Center Height",
      expression: "KB = (∫ z · d∇) / ∇",
      description: "KB: Vertical distance from keel to center of lift, z: depth coordinate",
    },
    examples: [
      {
        problem: "For a ship of rectangular section at a draft of T = 4 m, what is KB approximately in metres?",
        solution: "For a rectangular section KB ≈ T/2 = 2.0 m",
      },
    ],
    keyPoints: [
      "KB value is taken from hydrostatic tables",
      "Movement of B creates arm GZ",
      "The position of B changes as the shape changes",
    ],
  },
  "gz-righting-lever": {
    title: "Righting Lever (GZ)",
    introduction: "GZ refers to the horizontal distance between the gravity force and the buoyancy force when the ship is tilted and is the basis of the righting moment.",
    content: `GZ (the righting lever) is the horizontal distance between the centre of gravity (G) and the line of action of the buoyancy force when the ship is heeled through a given angle. This lever produces the righting moment and shows the ship's tendency to return upright.

At small angles GZ is taken as approximately GM × sinθ. This relationship provides a quick check in initial stability assessments. When GZ is positive the righting moment brings the ship upright; when GZ is negative the ship tends to heel further.`,
    bulletPoints: [
      "GZ is the arm of the righting moment",
      "Positive GZ: the ship tends to steepen",
      "Negative GZ: tendency to tip over",
      "At small angles GZ ≈ GM × sinθ",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = Δ × GZ",
      description: "RM: Righting moment (t·m), Δ: Displacement (tons), GZ: Righting arm (m)",
    },
    keyPoints: [
      "GZ curve gives the ship's stability profile for all heel angles",
      "GZ size is a direct indicator of stability quality",
      "Loading changes significantly affect GZ",
    ],
  },
  "gz-curve-generation": {
    title: "Obtaining the GZ Curve",
    introduction: "GZ curve is the stability curve created by calculating the ship's righting arms at different leaning angles.",
    content: `The GZ curve is obtained by calculating the GZ values for a range of angles of heel (usually 0°-90°, and further if required). These calculations are based on the geometry and hydrostatic properties of the ship in a given loading condition.

The classical method involves the following steps:
1) The waterline and immersed volume are calculated for the chosen angle of heel.
2) The new position of the centre of buoyancy (B) is found.
3) The horizontal distance between G and B (GZ) is determined.
4) The process is repeated for all angles to build the curve.

In modern practice this process is carried out automatically by stability software; but the results must be consistent with the stability booklet and the hydrostatic tables.`,
    images: [
      {
        src: gzCurveDiagram,
        alt: "GZ curve diagram",
        caption: "Figure: a typical GZ curve - righting lever against angle of heel",
      },
    ],
    bulletPoints: [
      "GZ curve is calculated separately for each loading case",
      "Hydrostatic tables and stability software are used",
      "GZ curve is the basic input of IMO criteria",
    ],
    keyPoints: [
      "Correct KG and displacement are essential for the correct GZ curve",
      "Free surface corrections must be included",
      "The curve is additionally created for damage stability",
    ],
  },
  "max-gz": {
    title: "Maximum GZ",
    introduction: "Maximum GZ is the angle at which the righting arm reaches its maximum value and is an important indicator of the ship's stability capacity.",
    content: `The GZ curve rises up to a certain angle and then falls away towards zero. The peak of the curve shows the ship's greatest righting capacity.

Criteria such as the IMO 2008 IS Code require the maximum GZ value and the angle at which it occurs to meet defined minima. For general cargo ships, for example, GZmax ≥ 0.20 m is required and this maximum is expected to occur at around at least 25°-30° (this varies with ship type).

A very low maximum GZ, or one that occurs at a small angle, can indicate inadequate stability.`,
    bulletPoints: [
      "Maximum GZ is the peak of stability capability",
      "Maximum GZ at extremely small angle is risky",
      "There are minimum GZmax criteria according to ship type",
    ],
    keyPoints: [
      "GZmax represents large angle behavior independent of GM",
      "Increasing top weights decreases GZmax",
      "GZmax value is controlled by loading plan",
    ],
    warnings: [
      "If the GZmax criterion is not met, the safety of the voyage is at risk",
      "Deck cargo and the free surface effect can reduce GZmax rapidly",
    ],
  },
  "stability-area": {
    title: "Stability Area",
    introduction: "The stability area refers to the area under the GZ curve and shows the dynamic stability energy capacity of the ship.",
    content: `The area under the GZ curve over a given range of angles represents the ship's capacity to absorb the energy of external forces. The larger this area, the better the ship can meet the effects of waves and wind.

The IMO criteria define minimum area values for different ranges of angle (e.g. 0°-30°, 0°-40° and 30°-40°). These values can vary with ship type.

In practice the area is calculated by numerical integration or with stability software.`,
    bulletPoints: [
      "Area = Energy capacity indicator",
      "IMO criteria determine area minimums",
      "Area criteria are more critical in damaged stability",
    ],
    formula: {
      name: "Dynamic Stability Area",
      expression: "A = ∫ GZ · dθ",
      description: "A: Area (m rad), GZ: righting arm (m), θ: angle of heel (rad)",
    },
    keyPoints: [
      "As the area increases, the risk of tipping decreases",
      "Area values depend on the shape of the GZ curve",
      "Free surface and top loads reduce the area",
    ],
  },
  "capsizing-angle": {
    title: "Vanishing Stability Angle",
    introduction: "Angle of Vanishing Stability (AVS) is the angle at which the GZ curve leaves the positive region and falls back to zero and the ship stops producing a righting moment. After this angle, GZ becomes negative and the ship cannot turn around (overturns).",
    content: `AVS AND THE RANGE OF STABILITY:
After its peak the GZ curve falls and reaches zero at a certain angle; this angle is the AVS. The range from the origin to the AVS is called the "range of positive stability". The wider the range, the greater the angle from which the ship can return.

WHAT IT DEPENDS ON:
- A rise in KG and free surface lower the GZ curve → the AVS decreases.
- High freeboard and watertight enclosed superstructure → the AVS increases (the curve reaches zero later).
- In a damaged (flooded) condition the curve falls → the AVS decreases markedly.

THE DOWNFLOODING ANGLE (θf) — THE PRACTICAL LIMIT:
Openings on the ship that cannot be closed (air vents, fan intakes, doors) become immersed at a certain angle of heel; this is the downflooding angle (θf). Once water begins to enter, the ship loses stability rapidly. The PRACTICAL safe range is therefore not the AVS but WHICHEVER IS SMALLER of the AVS and θf. The IMO area/range criteria are most often cut off at θf.`,
    bulletPoints: [
      "AVS: Angle at which GZ returns to zero; post negative (tipping)",
      "Positive stability range = origin to AVS",
      "KG↑/FSE reduces AVS; Increases freeboard/closed superstructure",
      "Practical limit = min(AVS, downflooding angle θf)",
    ],
    keyPoints: [
      "Large positive range = ability to bounce back from big leans.",
      "The downflooding angle often precedes the AVS and is the true limit.",
      "In damaged stability, AVS shrinks significantly.",
    ],
    warnings: [
      "The immersion of openings (θf) lowers the capsizing angle in practice",
      "Once downflooding starts, stability is lost rapidly",
    ],
  },
  "gz-curve-interpretation": {
    title: "Interpretation of the GZ Curve",
    introduction: "The GZ curve (static stability curve) shows the righting arm (GZ) of the ship at different heeling angles and summarizes the entire stability character of the ship in a single graph. GM, maximum GZ, stability range and dynamic stability are read from the curve together.",
    content: `THE MAIN QUANTITIES READ FROM THE CURVE:

1) THE INITIAL SLOPE → GM: the tangent to the curve at the origin gives GM. If the tangent is extended to an abscissa of 1 radian (57.3°), the GZ value it cuts is numerically equal to GM. At small angles GZ ≈ GM · sinθ.

2) MAXIMUM GZ AND ITS ANGLE: the peak of the curve is the largest righting lever the ship produces. The IMO requires GZmax to occur preferably at ≥30° (at least 25°).

3) DECK EDGE IMMERSION: when the deck edge becomes immersed the breadth of the waterplane decreases, BM falls and the slope of the curve changes (usually an inflection/turning point). Beyond this point GZ increases more slowly or begins to fall.

4) RANGE OF STABILITY: the range of angles over which the curve is positive; the angle at which it returns to zero is the AVS (the angle of vanishing stability).

5) AREA → DYNAMIC STABILITY: the area under the curve represents the righting energy (dynamic stability); the IMO area criteria are based on it.

WHAT CHANGES THE CURVE:
An increase in weight high up (KG↑) and free surface (FSE) pull the curve down and reduce the initial slope (GM); greater beam and a lower KG lift the curve; freeboard and enclosed superstructure extend the range of stability.`,
    bulletPoints: [
      "The origin tangent gives GM at 57.3°; at small angle GZ ≈ GM·sinθ",
      "Peak = maximum GZ (preferably at ≥30°)",
      "Deck edge immersion creates an inflection point in the curve",
      "Area under the curve = dynamic stability (energy)",
    ],
    formula: {
      name: "GZ and GM relationship (small angle / tangent)",
      expression: "GZ ≈ GM · sinθ  ;  GM = the value of the tangent at the origin read at 57.3°",
      description: "The initial slope gives GM; The entire curve shows large angle behavior.",
    },
    keyPoints: [
      "The entire shape of the curve should be read, not a single value.",
      "GM (slope), GZmax, range and area are evaluated together.",
      "KG↑ and FSE lower the curve; It extends the freeboard range.",
      "The GZ curve is the basis of IMO criteria and operational limits.",
    ],
  },
  // =====================================================
  // BÖLÜM 2 - EKSİK İÇERİKLER
  // =====================================================
  "floatation-condition": {
    title: "Buoyancy Condition",
    introduction: "In order for an object to remain afloat, its total weight must be equal to or less than the weight of the water displaced by its submerged volume.",
    content: `By Archimedes' principle a body receives a buoyancy force equal to the weight of the fluid it displaces. The condition for flotation is derived from this principle.

The flotation condition:
W ≤ ρ × g × ∇max

where ∇max is the volume of the body when fully immersed. If W exceeds this value the body sinks.

The flotation condition must always be satisfied on ships. Even in the light condition the ship has sufficient immersed volume. As loading increases the draft rises and the immersed volume increases. Danger arises, however, if the freeboard limit is exceeded.

Flotation is necessary for static equilibrium but not sufficient. A floating body may not be stable.`,
    bulletPoints: [
      "The equation W = ρ × ∇ defines the equilibrium condition",
      "Submerged volume must ≤ total volume",
      "Freeboard is a visual indicator of buoyancy",
      "Stability for swimming must also be ensured",
    ],
    formula: {
      name: "Buoyancy Equation",
      expression: "W = ρ × g × ∇; or Δ = ρ × ∇",
      description: "W: Weight (kN), ρ: Density of water (t/m³), ∇: Submerged volume (m³), Δ: Displacement (tons)",
    },
    examples: [
      {
        problem: "If a ship's immersed volume is ∇ = 4,800 m³ and the sea water density is ρ = 1.025 t/m³, what is the maximum displacement in tonnes?",
        solution: "Δ = ρ × ∇ = 1.025 × 4,800 = 4,920 tonnes. Result: the ship can be loaded up to 4,920 tonnes.",
      },
    ],
    keyPoints: [
      "The buoyancy condition is a basic physics rule.",
      "Increased draft increases submerged volume",
      "Freeboard limit should not be exceeded",
    ],
  },
  "equilibrium-states": {
    title: "Equilibrium States",
    introduction: "A floating object can exist in three different states of equilibrium: stable, unstable, and neutral.",
    content: `States of equilibrium are classified by how a body responds when it is moved from its equilibrium position.

STABLE EQUILIBRIUM:
The body tends to return when it is moved from its equilibrium position. On ships a positive GM provides this condition. G lies below M.

UNSTABLE EQUILIBRIUM:
The body tends to move further away when it is displaced from its equilibrium position. A negative GM causes this condition. G lies above M.

NEUTRAL EQUILIBRIUM:
The body stays in its new position; it neither returns nor moves further. This occurs when GM = 0. G and M coincide.

A ship must be in stable equilibrium if it is to make a safe passage.`,
    bulletPoints: [
      "Stable equilibrium: Positive GM, M under G",
      "Unstable balance: Negative GM, M on G",
      "Neutral balance: GM = 0, G and M coincide",
      "Safety of navigation requires stable equilibrium",
    ],
    examples: [
      {
        problem: "If KM = 6.5 m and KG = 6.5 m, in what state of equilibrium is the ship?",
        solution: "GM = KM - KG = 6.5 - 6.5 = 0 m. Result: neutral equilibrium. The ship can rest at any angle, which is a dangerous condition.",
      },
    ],
    keyPoints: [
      "Stable equilibrium is mandatory for navigation",
      "Unstable balance is a risk of tipping over",
      "Neutral balance is operationally unacceptable",
    ],
    warnings: [
      "A ship must not proceed to sea with GM zero or negative",
      "The loading must be corrected immediately",
    ],
  },
  // =====================================================
  // BÖLÜM 5 - ENİNE STABİLİTE HESAPLARI
  // =====================================================
  "righting-moment": {
    title: "Righting Moment",
    introduction: "The righting moment is the moment created by the weight and buoyancy forces when the ship is tilted and tries to return the ship to an upright position.",
    content: `When the ship is heeled through a given angle, the weight force acts downwards through G and the buoyancy force acts upwards through B. The horizontal distance between these two forces is called GZ (the righting lever).

The righting moment (RM) is the displacement multiplied by GZ:
RM = Δ × GZ

When this moment is positive it acts to bring the ship upright. When it is negative it increases the heel.

The righting moment is the fundamental measure of a ship's stability. The IMO criteria require a minimum righting capacity at defined angles.`,
    images: [
      {
        src: rightingMomentDiagram,
        alt: "Righting moment diagram",
        caption: "Figure: the points G and B and the righting lever GZ in a heeled ship",
      },
    ],
    bulletPoints: [
      "Calculated with the formula RM = Δ × GZ",
      "Positive RM straightens the ship",
      "Negative RM increases lying down",
      "RM size indicates stability capacity",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = Δ × GZ",
      description: "RM: Righting moment (t·m), Δ: Displacement (tons), GZ: Righting arm (m)",
    },
    examples: [
      {
        problem: "If Δ = 8,000 tonnes and GZ = 0.35 m, what is the righting moment in t·m?",
        solution: "RM = 8,000 × 0.35 = 2,800 t·m. Result: the ship produces a righting moment of 2,800 t·m.",
      },
    ],
    keyPoints: [
      "RM is the main output of the stability calculation",
      "GZ curve shows RM profile",
      "Loading changes directly affect RM",
    ],
  },
  "heeling-moment": {
    title: "Listing Moment",
    introduction: "The heeling moment is the moment created by external forces that tilt the ship and is balanced by the righting moment.",
    content: `The heeling moment (HM) arises from external effects such as wind, waves, a shift of weight, a turning manoeuvre or a suspended load.

When the ship comes to equilibrium at a given angle:
HM = RM

This point of balance is called the angle of equilibrium.

If the heeling moment exceeds the righting moment the ship capsizes. The sources of heeling moment must therefore be calculated in advance and limited.`,
    bulletPoints: [
      "HM is the exogenous reclining effect",
      "Wind, wave, weight shift create HM",
      "Denge: HM = RM",
      "If HM > RMmax, there is a risk of tipping over",
    ],
    formula: {
      name: "Heeling Moment (Wind)",
      expression: "HM = P × A × h",
      description: "HM: Heeling moment (t·m), P: Wind pressure (t/m²), A: Area exposed to wind (m²), h: Lift arm (m)",
    },
    examples: [
      {
        problem: "If the wind pressure is P = 0.05 t/m², A = 400 m² and h = 6 m, what is HM in t·m?",
        solution: "HM = 0.05 × 400 × 6 = 120 t·m. Result: the wind creates a heeling moment of 120 t·m.",
      },
    ],
    keyPoints: [
      "HM resources must be calculated in advance",
      "Operational limits are determined according to HM",
      "IMO wind criterion is based on HM calculation",
    ],
  },
  "angle-of-equilibrium": {
    title: "Equilibrium angle",
    introduction: "The stability angle is the angle of heel at which the heeling moment and the righting moment are equal and the ship remains stationary at this angle.",
    content: `When an external force applies a heeling moment to the ship, the ship produces a righting moment. When the two moments are equal the ship reaches equilibrium at a given angle.

On the GZ curve this angle is the point at which the heeling moment line cuts the curve.

The size of the angle of equilibrium depends on:
- The size of the heeling moment
- The ship's GM value
- The shape of the GZ curve

For small angles the approximation tan θ ≈ HM / (Δ × GM) can be used.`,
    bulletPoints: [
      "Equilibrium angle: angle where HM = RM",
      "Located graphically on the GZ curve",
      "If GM is large, the equilibrium angle will be small",
      "If GM is small, equilibrium angle will be large",
    ],
    formula: {
      name: "Small Angle Balance Formula",
      expression: "tan θ = HM / (Δ × GM)",
      description: "θ: Equilibrium angle, HM: Heeling moment (t·m), Δ: Displacement (tons), GM: Metacentric height (m)",
    },
    examples: [
      {
        problem: "If HM = 200 t·m, Δ = 5,000 tonnes and GM = 0.8 m, what is the approximate angle of equilibrium in degrees?",
        solution: "tan θ = 200 / (5,000 × 0.8) = 200 / 4,000 = 0.05. θ ≈ 2.86°. Result: the ship settles at an angle of heel of about 3°.",
      },
    ],
    keyPoints: [
      "Equilibrium angle determines operational limits",
      "Large equilibrium angle can lead to load shifts",
      "Comfort limits apply on cruise ships",
    ],
  },
  "heel-from-weight-shift": {
    title: "Lying Due to Weight Shift",
    introduction: "The transverse shift of a weight on the ship creates a list by shifting the center of gravity.",
    content: `A shift of weight moves G transversely without changing the displacement. This shift is equivalent to a heeling moment.

The heeling moment created:
HM = w × d

where w is the weight shifted and d is the distance it is shifted.

The angle of equilibrium:
tan θ = (w × d) / (Δ × GM)

A cargo shift, a ballast transfer or crane operations can cause this kind of heel.`,
    bulletPoints: [
      "Transverse weight shift creates list",
      "The formula HM = w × d is applied",
      "If GM is small, the same shift creates a larger angle",
      "Cargo safety ties prevent slipping",
    ],
    formula: {
      name: "Lying With Weight Shift",
      expression: "tan θ = (w × d) / (Δ × GM)",
      description: "θ: Angle of heel, w: Shifted weight (ton), d: Shift distance (m), Δ: Displacement (ton), GM: Metacentric height (m)",
    },
    examples: [
      {
        problem: "60 tonnes of cargo has shifted 4 m transversely. Δ = 6,000 tonnes, GM = 0.6 m. What is the angle of list in degrees?",
        solution: "tan θ = (60 × 4) / (6,000 × 0.6) = 240 / 3,600 = 0.0667. θ ≈ 3.8°. Result: a list of about 4° is created.",
      },
    ],
    keyPoints: [
      "Cargo shifting is one of the important causes of accidents",
      "Lashing and securing procedures are critical",
      "Slippage must be monitored while driving",
    ],
    warnings: [
      "With large shifts the list can increase rapidly",
      "Asymmetric flooding has a similar effect",
    ],
  },
  "small-angle-stability": {
    title: "Stability for Small Angles",
    introduction: "At small angles of repose (up to about 10°) the metacenter is considered constant and simplified formulas are used.",
    content: `Small-angle stability examines the ship's behaviour close to upright. In this range the metacentre (M) is taken as fixed and GZ increases linearly.

The basic relationship:
GZ ≈ GM × sin θ

This approximation allows a quick calculation in initial stability assessments.

The small-angle approximation can also be written as sin θ ≈ θ (in radians). Above 10°, however, this approximation becomes inaccurate and a full GZ calculation is required.`,
    bulletPoints: [
      "Small angle: 0°–10° range",
      "M is considered a constant",
      "The relationship GZ ≈ GM × sin θ applies",
      "More than 10° requires full calculation",
    ],
    formula: {
      name: "Small Angle GZ Formula",
      expression: "GZ ≈ GM × sin θ",
      description: "GZ: Righting arm (m), GM: Metacentric height (m), θ: Angle of heel (degrees)",
    },
    examples: [
      {
        problem: "If GM = 0.7 m and θ = 8°, what is GZ in metres?",
        solution: "sin 8° = 0.139. GZ ≈ 0.7 × 0.139 = 0.097 m. Result: GZ is about 10 cm.",
      },
    ],
    keyPoints: [
      "Small angle formulas enable quick evaluation",
      "GM value is decisive in this range",
      "GZ curve should be used at large angles",
    ],
  },
  "large-angle-stability": {
    title: "Stability for Large Angles",
    introduction: "At repose angles above approximately 10°, the metacenter (M) does not remain constant and the small angle approximation GZ = GM·sinθ becomes invalid. Large angle stability is examined directly from the GZ curve, taking into account the actual movement of the center of lift (B).",
    content: `WHY THE SMALL-ANGLE APPROXIMATION BREAKS DOWN:
At small angles M is almost fixed and GZ ≈ GM·sinθ can be used. As the angle increases the shape of the immersed volume (and so the position of B) changes markedly; M moves down and GZ departs from the simple sine relationship.

THE WALL-SIDED FORMULA:
Before the deck edge is immersed and before the keel emerges, and assuming a wall-sided hull, GZ is calculated approximately as:

GZ = sinθ · ( GM + ½ · BM · tan²θ )

The term ½·BM·tan²θ is the additional contribution to the righting lever at large angles (the form effect) and can make the ship appear more "stable" than the small-angle estimate suggests.

DECK EDGE IMMERSION:
Once the deck edge is immersed the waterplane area narrows, BM falls and the increase in GZ slows or stops; the curve peaks and begins to fall.

IMO LARGE-ANGLE CRITERIA:
- GZ ≥ 0.20 m (usually at ≥30°)
- The angle of GZmax ≥ 25° (preferably ≥30°)
- The 0-30°, 0-40° and 30-40° area criteria (IS Code).`,
    bulletPoints: [
      "Above 10° GZ = GM·sinθ is insufficient; full GZ analysis required",
      "Wall-sided: GZ = sinθ·(GM + ½·BM·tan²θ)",
      "GZ increase slows down after deck edge immersion",
      "IMO: GZ≥0.20 m, GZmax angle ≥25°",
    ],
    formula: {
      name: "Wall-sided GZ formula",
      expression: "GZ = sinθ · (GM + ½ · BM · tan²θ)",
      description: "Approximate large angle equation valid for a vertical-sided hull without the deck edge entering the water.",
    },
    keyPoints: [
      "At the large angle M is not constant; The actual movement of B is essential.",
      "Form stability (½·BM·tan²θ) contributes to GZ at large angles.",
      "The GZ curve must be created for each loading case.",
      "In the damaged condition, large angle stability is more critical.",
    ],
  },
  // =====================================================
  // BÖLÜM 6 - SERBEST YÜZEY ETKİSİ
  // =====================================================
  "free-surface-concept": {
    title: "Concept of Free Surface",
    introduction: "Free surface refers to the free movement of liquid in a partially filled tank and negatively affects stability.",
    content: `When a tank is completely full or completely empty the liquid inside it cannot move. But if the tank is partly full, the liquid runs to the low side when the ship heels and shifts the centre of gravity.

This movement creates a virtual rise in KG and reduces GM. The phenomenon is called the Free Surface Effect (FSE).

The free surface effect:
- The wider the tank, the greater the effect
- A higher liquid density increases the effect
- Tank subdivisions (longitudinal or transverse) reduce the effect

Every partly filled tank creates a free surface effect: fuel, ballast, fresh water, cargo oil.`,
    images: [
      {
        src: freeSurfaceEffect,
        alt: "Free surface effect diagram",
        caption: "Figure: liquid shifting in a partially filled tank and the virtual rise of KG",
      },
    ],
    bulletPoints: [
      "Partially full tank = Free surface effect",
      "Fluid movement virtually raises KG",
      "GM decreases, stability weakens",
      "Tank partitions reduce impact",
    ],
    keyPoints: [
      "The free surface effect exists in every partially filled tank",
      "Effect is proportional to the cube of the tank width",
      "It must be included in the stability calculation",
    ],
    warnings: [
      "Several tanks with free surfaces can multiply the effect",
      "Tank conditions must be monitored during the passage",
    ],
  },
  "fse-gm-effect": {
    title: "Effect of Free Surface on GM",
    introduction: "The free surface weakens the initial stability of the ship by reducing the effective GM value.",
    content: `The free surface effect causes a virtual rise of the centre of gravity (GG' or the virtual rise of G). This rise reduces GM directly.

The corrected GM:
GMfluid = GMsolid - GG'

where GG' is the free surface correction, calculated as FSM/Δ.

If the effective GM (GMfluid) becomes negative the ship becomes unstable. The free surface correction is therefore always applied in stability calculations.`,
    bulletPoints: [
      "Free surface virtually increases KG",
      "GMfluid = GMsolid - GG'",
      "GG' = FSM / Δ",
      "Effect is critical on low GM ships",
    ],
    formula: {
      name: "Free Surface Correction",
      expression: "GMfluid = GMsolid - (FSM / Δ)",
      description: "GMfluid: Corrected GM (m), GMsolid: Solid calculated GM (m), FSM: Free surface moment (t·m), Δ: Displacement (tons)",
    },
    examples: [
      {
        problem: "If GMsolid = 0.80 m, FSM = 400 t·m and Δ = 8,000 tonnes, what is GMfluid in metres?",
        solution: "GG' = FSM / Δ = 400 / 8,000 = 0.05 m. GMfluid = 0.80 - 0.05 = 0.75 m. Result: free surface reduces GM by 5 cm.",
      },
    ],
    keyPoints: [
      "Stability calculation should always use GMfluid",
      "FSM values are taken from tank tables",
      "FSMs are collected for multiple tanks",
    ],
  },
  "fsm": {
    title: "Free Surface Moment (FSM)",
    introduction: "Free Surface Moment is the value that expresses the magnitude of the free surface effect of a tank and is used in stability calculation.",
    content: `The FSM depends on the geometry of the tank and the density of the liquid in it.

FSM = ρ × I

where ρ is the density of the liquid and I is the moment of inertia of the tank's liquid surface about the longitudinal axis.

For a tank of rectangular section:
I = (L × B³) / 12

FSM values are usually given in the tank tables. There may be different FSM values for different filling levels.`,
    bulletPoints: [
      "Calculated with the formula FSM = ρ × I",
      "I is the moment of inertia of the water surface",
      "Width is proportional to the cube of (B)",
      "Tank tables give FSM values",
    ],
    formula: {
      name: "Free Surface Moment",
      expression: "FSM = ρ × I = ρ × (L × B³) / 12",
      description: "FSM: Free surface moment (t·m), ρ: Liquid density (t/m³), L: Tank length (m), B: Tank width (m)",
    },
    examples: [
      {
        problem: "If the tank dimensions are L = 10 m and B = 6 m and the fuel density is ρ = 0.85 t/m³, what is the FSM in t·m?",
        solution: "I = (10 × 6³) / 12 = (10 × 216) / 12 = 180 m⁴. FSM = 0.85 × 180 = 153 t·m. Result: the tank creates a free surface moment of 153 t·m.",
      },
    ],
    keyPoints: [
      "FSM is very sensitive to tank width (B³)",
      "Baffled tanks significantly reduce FSM",
      "Separate FSM is calculated for each tank",
    ],
  },
  "fse-calc": {
    title: "Free Surface Effect (FSE)",
    introduction: "Free Surface Effect is the virtual lift value found by dividing the free surface moment by the displacement and added to the KG.",
    content: `The FSE (or GG') shows how far the free surface raises the centre of gravity virtually.

FSE = FSM / Δ

This value is added to KG to give the effective KG:
KGfluid = KGsolid + FSE

Or it is deducted directly from GM:
GMfluid = GMsolid - FSE

If there are several tanks with free surfaces, all the FSMs are added together and the total FSE is calculated.`,
    bulletPoints: [
      "The formula FSE = FSM / Δ is used",
      "FSE is added to KG or subtracted from GM",
      "FSMs are collected for multiple tanks",
      "As displacement increases, FSE decreases",
    ],
    formula: {
      name: "Free Surface Effect Calculation",
      expression: "FSE = Σ(FSM) / Δ; KGfluid = KGsolid + FSE",
      description: "FSE: Free surface effect (m), FSM: Free surface moment (t·m), Δ: Displacement (tons)",
    },
    examples: [
      {
        problem: "If the total FSM of 3 tanks is 600 t·m and Δ = 10,000 tonnes, what is the FSE in metres?",
        solution: "FSE = 600 / 10,000 = 0.06 m. Result: KG rises virtually by 6 cm.",
      },
    ],
    keyPoints: [
      "FSE calculation is mandatory in stability control",
      "High displacement makes FSE smaller",
      "FSE should be monitored in critical operations",
    ],
  },
  "tank-geometry-effect": {
    title: "Effect of Tank Geometry",
    introduction: "Tank shape and subdivision directly affect the free surface moment; larger tanks produce larger FSM.",
    content: `In the FSM calculation the moment of inertia (I) is proportional to the cube of the tank's breadth. Wide tanks therefore create a far greater free surface effect.

Longitudinal subdivision:
Dividing a tank longitudinally down the middle reduces the total FSM to a quarter (2 × (B/2)³ / 2 = B³/4).

Transverse subdivision:
Transverse divisions do not change the FSM; they only restrict the flow of the liquid.

Tank shape:
In curved or tapered tanks the FSM calculation is more complex and the tank tables are used.`,
    bulletPoints: [
      "FSM is proportional to B³",
      "Longitudinal division reduces FSM to 1/4",
      "Transverse division does not change FSM",
      "Table is used for complex geometries",
    ],
    formula: {
      name: "Split Tank FSM",
      expression: "FSMsubdivided = FSMfull / n²",
      description: "n: Number of longitudinal divisions (FSM becomes 1/4 for 2 divisions)",
    },
    examples: [
      {
        problem: "The FSM of a tank 12 m wide is 800 t·m. If the tank is divided longitudinally down the middle, what is the new FSM in t·m?",
        solution: "The number of divisions is n = 2. FSMnew = 800 / 2² = 800 / 4 = 200 t·m. Result: the FSM falls to a quarter.",
      },
    ],
    keyPoints: [
      "Partitions must be considered in large tanks.",
      "Longitudinal partitions are very effective in stability",
      "Tank design is evaluated along with stability",
    ],
  },
  "multiple-tanks-effect": {
    title: "Effect of Multiple Tanks",
    introduction: "If there is more than one partially filled tank, the total effect is calculated by adding the free surface moment of each tank.",
    content: `There are usually several partly filled tanks on board: fuel tanks, ballast tanks, fresh water tanks and cargo oil tanks.

The FSM of each tank is calculated separately or taken from the tank tables. The total free surface moment:
Σ(FSM) = FSM₁ + FSM₂ + FSM₃ + ...

The total FSE:
FSE = Σ(FSM) / Δ

Tanks that are completely full or completely empty are not included in the FSM calculation.`,
    bulletPoints: [
      "Each partially filled tank produces FSM",
      "FSMs are summed, single FSE is calculated",
      "Fully filled or empty tanks are not included",
      "Loading plan affects FSM total",
    ],
    examples: [
      {
        problem: "3 tanks: FSM₁ = 150 t·m, FSM₂ = 200 t·m, FSM₃ = 100 t·m. Δ = 7,500 tonnes. What is the total FSE in metres?",
        solution: "Σ(FSM) = 150 + 200 + 100 = 450 t·m. FSE = 450 / 7,500 = 0.06 m. Result: the total free surface effect is 6 cm.",
      },
    ],
    keyPoints: [
      "FSE may increase as the number of tanks increases",
      "Fully filling or emptying the tanks resets the FSE",
      "FSM minimization is targeted in the loading plan",
    ],
    warnings: [
      "A large number of partly filled tanks can create a critical FSE",
      "Tank conditions must be reviewed before critical passages",
    ],
  },
  // =====================================================
  // BÖLÜM 7 - BOYUNA STABİLİTE VE TRİM
  // =====================================================
  "lcg": {
    title: "Longitudinal Center of Gravity (LCG)",
    introduction: "LCG refers to the longitudinal position of the ship's center of gravity and is the basic input of trim calculations.",
    content: `The LCG (Longitudinal Centre of Gravity) is the longitudinal resultant of all the weights on the ship, calculated by the method of moments.

The reference point is usually:
- The after perpendicular (AP)
- Midship
- The forward perpendicular (FP)

The LCG calculation:
LCG = Σ(wᵢ × lcgᵢ) / Σwᵢ

The difference between LCG and LCB determines the trim.`,
    bulletPoints: [
      "LCG is the longitudinal center of gravity",
      "Calculated by the method of moments",
      "Reference point can be AP, Midship or FP",
      "LCG - LCB difference creates trim",
    ],
    formula: {
      name: "LCG Calculation",
      expression: "LCG = Σ(wᵢ × lcgᵢ) / Δ",
      description: "LCG: Longitudinal center of gravity (m), wᵢ: Each weight (ton), lcgᵢ: Longitudinal position of each weight (m)",
    },
    examples: [
      {
        problem: "If 500 t of cargo is 80 m from the AP and 300 t is 40 m from the AP, what is the LCG in metres?",
        solution: "LCG = (500 × 80 + 300 × 40) / 800 = (40,000 + 12,000) / 800 = 65 m. Result: the LCG is 65 m from the AP.",
      },
    ],
    keyPoints: [
      "LCG varies with loading",
      "LCG calculation is required for trim control",
      "Load placement directly affects LCG",
    ],
  },
  "lcb": {
    title: "Center for Buoyancy (LCB)",
    introduction: "LCB is the longitudinal geometric center of the ship's submerged volume and is compared to LCG in trim calculations.",
    content: `The LCB (Longitudinal Centre of Buoyancy) is the longitudinal centre of the immersed volume. The buoyancy force acts upwards through this point.

The position of the LCB:
- Depends on the draft and the trim
- Is read from the hydrostatic tables
- Is sensitive to the form and block coefficient of the ship

In equilibrium the LCG and LCB must lie on the same vertical line. Otherwise a longitudinal moment arises and the ship trims.`,
    bulletPoints: [
      "LCB is the longitudinal center of the submerged volume",
      "Taken from hydrostatic tables",
      "If LCG = LCB the trim is zero",
      "If LCG ≠ LCB, trim occurs",
    ],
    formula: {
      name: "Trimming Moment",
      expression: "Trim Moment = Δ × (LCG - LCB)",
      description: "Trim Moment: Longitudinal moment (t·m), Δ: Displacement (tons), LCG - LCB: Difference (m)",
    },
    examples: [
      {
        problem: "Δ = 6,000 tonnes, LCG = 70 m (from the AP), LCB = 68 m (from the AP). What is the trimming moment in t·m?",
        solution: "Trimming Moment = 6,000 × (70 - 68) = 6,000 × 2 = 12,000 t·m. Result: a trimming moment by the head is created.",
      },
    ],
    keyPoints: [
      "LCB changes with draft",
      "LCB-LCG difference determines trim direction",
      "Trim correction is made by shifting the LCG",
    ],
  },
  "trim-concept": {
    title: "Trim Concept",
    introduction: "Trim refers to the difference between the fore and aft drafts of the ship and indicates longitudinal stability.",
    content: `Trim is the longitudinal inclination of the ship and is expressed in two ways:
1. As a difference: Trim = Taft - Tfwd
2. As an angle: θ = arctan(Trim / LBP)

If the trim is positive: trim by the stern
If the trim is negative: trim by the head
If the trim is 0: even keel

Trim affects the ship's performance, propeller efficiency and deck wetness. Optimum trim values are established in commercial operations.`,
    images: [
      {
        src: trimDiagram,
        alt: "Trim diagram",
        caption: "Figure: ship in profile - forward and aft drafts and the resulting trim",
      },
    ],
    bulletPoints: [
      "Trim = T aft - T fore",
      "Positive trim = Aft trim",
      "Negative trim = Head trim",
      "Optimum trim increases fuel efficiency",
    ],
    formula: {
      name: "Trim Calculation",
      expression: "Trim = T aft - T fore",
      description: "Trim: Fore-aft draft difference (m), Tstern: Aft draft (m), Tfore: Fore draft (m)",
    },
    examples: [
      {
        problem: "If Taft = 7.2 m and Tfwd = 6.8 m, what is the trim condition?",
        solution: "Trim = 7.2 - 6.8 = 0.4 m. Result: there is 40 cm of trim by the stern.",
      },
    ],
    keyPoints: [
      "Trim affects navigation performance",
      "Excessive bow trim causes deck wetness",
      "Propeller depth is related to aft trim",
    ],
  },
  "mct": {
    title: "MCT (Moment to Change Trim)",
    introduction: "MCT expresses the moment required to change the trim by 1 cm and is the basic quantity in trim calculations.",
    content: `The MCT (Moment to Change Trim 1 cm) is the measure of a ship's longitudinal stability. It is taken from the hydrostatic tables and varies with draft.

The MCT calculation:
MCT = (Δ × GML) / (100 × LBP)

where GML is the longitudinal metacentric height and LBP the length between perpendiculars.

The change of trim:
Trim = (w × d) / MCT

where w is the weight and d the longitudinal distance it is moved.`,
    bulletPoints: [
      "MCT is the moment that changes trim by 1 cm",
      "Read from hydrostatic tables",
      "Varies with draft",
      "Trim = Torque / MCT formula is used",
    ],
    formula: {
      name: "MCT Formula",
      expression: "MCT = (Δ × GML) / (100 × LBP); Trim = (w × d) / MCT",
      description: "MCT: Trim changing moment (t·m/cm), GML: Longitudinal metacentric height (m), LBP: Between two struts (m)",
    },
    examples: [
      {
        problem: "MCT = 350 t·m/cm and 140 tonnes is shifted 15 m forward. What is the change of trim in cm?",
        solution: "Moment = 140 × 15 = 2,100 t·m. Trim = 2,100 / 350 = 6 cm. Result: the trim by the head increases by 6 cm.",
      },
    ],
    keyPoints: [
      "MCT is higher on larger ships",
      "Trim calculation is part of the loading plan",
      "MCT value varies with draft",
    ],
  },
  "trim-calculations": {
    title: "Trim Calculations",
    introduction: "Trim calculations determine the effects of load movements and weight changes on fore and aft drafts.",
    content: `The trim calculation covers two basic cases:
1. A shift of weight (the moment w × d)
2. Adding/removing weight (a change of LCG)

The change of trim:
ΔTrim = (w × d) / MCT

The changes in the forward and after drafts:
ΔTfwd = (ΔTrim × LCF) / LBP
ΔTaft = ΔTrim - ΔTfwd

The LCF (Longitudinal Centre of Flotation) is the longitudinal position of the centre of flotation.`,
    bulletPoints: [
      "Trim change = Torque / MCT",
      "LCF determines draft distribution",
      "Fore and aft drafts are calculated separately",
      "Trim calculation is mandatory in the loading plan",
    ],
    formula: {
      name: "Trim and Draft Change",
      expression: "ΔTrim = (w × d) / MCT; ΔTfwd = ΔTrim × (LBP - LCF) / LBP",
      description: "ΔTrim: Trim change (cm), LCF: Distance from the center of buoyancy to the stern (m)",
    },
    examples: [
      {
        problem: "w = 200 t, d = 20 m forward, MCT = 400 t·m/cm, LBP = 120 m, LCF = 55 m (from aft). What are the changes in draft?",
        solution: "ΔTrim = (200 × 20) / 400 = 10 cm by the head. ΔTaft = 10 × 55 / 120 = 4.58 cm decrease. ΔTfwd = 10 - 4.58 = 5.42 cm increase. Result: the bow sinks 5.4 cm and the stern rises 4.6 cm.",
      },
    ],
    keyPoints: [
      "If the LCF is not in the middle section, the drafts do not change equally",
      "Trim calculation is done together with freeboard control.",
      "Excessive trim causes operational problems",
    ],
  },
  "trim-control": {
    title: "Trim Control in Loading and Unloading",
    introduction: "Trim control ensures that the ship remains at optimum trim values during loading operations.",
    content: `Trim changes continuously during loading and discharging. Optimum trim values affect:
- Fuel consumption
- Propeller efficiency
- Deck wetness
- Manoeuvring in port

Methods of trim control:
1. The cargo distribution plan
2. Ballast transfer
3. Fuel transfer
4. Optimising the loading sequence

Stability computers simulate the trim and propose an optimum loading plan.`,
    bulletPoints: [
      "Optimum trim saves fuel",
      "Ballast transfer is used in trim correction",
      "Loading order affects trim control",
      "Stability software simulates trim",
    ],
    keyPoints: [
      "Trim control is part of the loading plan",
      "Excessive trim causes operational problems",
      "Optimum trim varies with ship type",
    ],
  },
  // =====================================================
  // BÖLÜM 8 - HİDROSTATİK VERİLER VE TABLOLAR
  // =====================================================
  "displacement": {
    title: "Displacement",
    introduction: "Displacement is the total weight of the ship and the weight of the water it displaces; is the fundamental magnitude of stability.",
    content: `The displacement (Δ) is equal to the weight of the water the ship displaces when floating. By Archimedes' principle this value is equal to the total weight of the ship.

Δ = ∇ × ρ

where ∇ is the immersed volume (m³) and ρ is the density of the water (1.025 t/m³ for sea water).

The displacement value:
- Is an input to the stability calculations
- Is used in the righting moment calculation
- Is related to draft through the hydrostatic tables`,
    bulletPoints: [
      "Δ = Total weight of the ship",
      "Δ = the weight of water displaced",
      "Calculated with the formula Δ = ∇ × ρ",
      "As draft increases, displacement increases",
    ],
    formula: {
      name: "Displacement Calculation",
      expression: "Δ = ∇ × ρ",
      description: "Δ: Displacement (tons), ∇: Submerged volume (m³), ρ: Water density (t/m³, 1.025 for seawater)",
    },
    examples: [
      {
        problem: "If the immersed volume is ∇ = 5,000 m³ and the sea water density is ρ = 1.025 t/m³, what is the displacement in tonnes?",
        solution: "Δ = 5,000 × 1.025 = 5,125 tonnes. Result: the ship weighs 5,125 tonnes.",
      },
    ],
    keyPoints: [
      "Displacement is the main input to stability",
      "Density change affects displacement",
      "Lightship + deadweight = Displacement",
    ],
  },
  "draft": {
    title: "Draft",
    introduction: "Draft is the vertical distance from the ship's keel to the waterline and is indicative of the loading condition.",
    content: `The draft shows how deep the ship is immersed. It is measured at three positions:
1. Forward draft
2. Aft draft
3. Mean draft

Mean draft = (Tfwd + Taft) / 2

As the draft increases:
- The displacement increases
- The freeboard decreases
- The immersed volume grows

Reading the draft is the starting point of the loading calculation.`,
    bulletPoints: [
      "Draft is the distance from the keel to the waterline",
      "Fore, aft and mid draft are measured separately",
      "Increase in draft means increase in displacement",
      "Freeboard limits determine the draft limit",
    ],
    formula: {
      name: "Medium Draft",
      expression: "Tmean = (Tfwd + Taft) / 2",
      description: "Tmean: Middle draft (m), Thead: Fore draft (m), Tstern: Aft draft (m)",
    },
    examples: [
      {
        problem: "If Tfwd = 6.4 m and Taft = 7.0 m, what is the mean draft in metres?",
        solution: "Tmean = (6.4 + 7.0) / 2 = 6.7 m. Result: the mean draft is 6.7 metres.",
      },
    ],
    keyPoints: [
      "Draft reading is the beginning of the operation",
      "Freeboard = Summer Load Line - Draft",
      "Minimum freeboard limit must not be exceeded",
    ],
  },
  "draft-displacement-relation": {
    title: "Draft-Away Relationship",
    introduction: "The relationship between draft and displacement is defined by hydrostatic curves and used in loading calculations.",
    content: `As the draft increases the immersed volume, and therefore the displacement, increases. This relationship is not linear; it depends on the form of the ship.

The hydrostatic tables or curves show this relationship:
- Draft (m) vs Displacement (tonnes)
- Draft (m) vs Immersed volume (m³)

These tables are calculated when the ship is built and are given in the stability booklet.

During loading the displacement is found by measuring the draft, or conversely the expected draft is checked against the displacement calculation.`,
    bulletPoints: [
      "Draft-displacement relationship is non-linear",
      "Read from hydrostatic tables",
      "Depends on ship form",
      "It is the basic tool of loading control",
    ],
    keyPoints: [
      "Hydrostatic data are ship specific",
      "Trim status affects draft readings",
      "Hydrostatic tables contain trim corrections",
    ],
  },
  "tpc": {
    title: "TPC (Ton Per Centimeter)",
    introduction: "TPC indicates the weight required to increase draft by 1 cm and is used in rapid loading calculations.",
    content: `The TPC (Tonnes Per Centimetre Immersion) is related to the ship's waterplane area.

TPC = (A × ρ) / 100

where A is the waterplane area (m²) and ρ is the water density (t/m³).

Using the TPC:
- Weight to be loaded / TPC = increase in draft (cm)
- Change of draft × TPC = change in weight (tonnes)

The TPC value varies with draft; it is read from the hydrostatic tables.`,
    bulletPoints: [
      "TPC is the tone required to sink 1 cm",
      "Depends on waterline area",
      "Read from hydrostatic tables",
      "Used in fast loading calculation",
    ],
    formula: {
      name: "TPC Calculation",
      expression: "TPC = (A × ρ) / 100; ΔT = w / TPC",
      description: "TPC: Ton per cm (ton/cm), A: Waterline area (m²), ρ: Density (t/m³), ΔT: Draft change (cm), w: Weight (ton)",
    },
    examples: [
      {
        problem: "TPC = 25 tonnes/cm and 500 tonnes is to be loaded. By how many cm does the draft increase?",
        solution: "ΔT = 500 / 25 = 20 cm. Result: the draft increases by 20 cm.",
      },
    ],
    keyPoints: [
      "TPC is larger on wide ships",
      "TPC changes as the draft changes",
      "Frequently used in port operations",
    ],
  },
  "km-values": {
    title: "KM Values",
    introduction: "KM is the distance from the keel to the metacenter and is the basic input of the GM calculation.",
    content: `KM (Keel to Metacentre) is the height of the metacentre above the keel.

KM = KB + BM

where KB is the distance from the keel to the centre of buoyancy and BM is the metacentric radius.

The KM value:
- Varies with draft
- Is read from the hydrostatic tables
- Is used in the GM calculation: GM = KM - KG

The KM value depends on the geometry of the ship and does not change with loading (it changes only with a change of draft).`,
    bulletPoints: [
      "The formula KM = KB + BM applies",
      "Taken from hydrostatic tables",
      "Varies with draft",
      "Used in the calculation GM = KM - KG",
    ],
    formula: {
      name: "KM and GM Relationship",
      expression: "KM = KB + BM; GM = KM - KG",
      description: "KM: From keel to metacenter (m), KB: From keel to center of gravity (m), BM: Metacentric radius (m), KG: From keel to center of gravity (m)",
    },
    examples: [
      {
        problem: "From the hydrostatic table, KM = 7.8 m is read for T = 6.5 m. If KG = 7.2 m, what is GM in metres?",
        solution: "GM = KM - KG = 7.8 - 7.2 = 0.6 m. Result: GM is 60 cm and the initial stability is adequate.",
      },
    ],
    keyPoints: [
      "KM is ship-specific hydrostatic data",
      "KM generally decreases as draft increases",
      "KM must be read correctly in stability calculation",
    ],
  },
  "hydrostatic-tables-usage": {
    title: "Use of Hydrostatic Tables",
    introduction: "Hydrostatic tables are the basic reference that gives stability parameters according to the draft and trim status of the ship.",
    content: `Hydrostatic tables generally contain the following data:
- Draft vs Displacement
- Draft vs TPC
- Draft vs KM (KMt and KMl)
- Draft vs KB
- Draft vs LCB
- Draft vs LCF
- Draft vs MCT

The tables are prepared for an even keel. A correction may be needed when the ship is trimmed.

Modern stability computers use these tables automatically; but the tables must be understood for manual checking.`,
    bulletPoints: [
      "All stability parameters are read from tables",
      "Draft is the main input value",
      "Trim corrections may be required",
      "Stability software uses tables automatically",
    ],
    keyPoints: [
      "Tables are ship specific and cannot be changed",
      "Interpolation must be done correctly",
      "Special tables can be found for trim corrections",
    ],
  },
  // =====================================================
  // BÖLÜM 10 - DİNAMİK STABİLİTE
  // =====================================================
  "dynamic-righting-moment": {
    title: "Dynamic Righting Moment",
    introduction: "Dynamic righting moment is the total righting capacity produced by the ship against external forces while in motion.",
    content: `Dynamic stability expresses the amount of energy a ship can absorb up to a given angle. This capacity is measured by the area under the GZ curve.

The dynamic righting moment:
DRM = Δ × ∫GZ dθ

This integral is the area under the GZ curve from the initial angle up to a given angle.

The difference from static stability:
- Static: instantaneous equilibrium at a given angle
- Dynamic: the energy balance throughout the motion`,
    bulletPoints: [
      "Dynamic stability is the energy capacity",
      "Measured by the area under the GZ curve",
      "Absorbs wave and wind energy",
      "IMO field criteria check dynamic stability",
    ],
    formula: {
      name: "Dynamic Stability",
      expression: "E = Δ × ∫(0 to θ) GZ dθ",
      description: "E: Dynamic stability energy (t·m·rad), Δ: Displacement (ton), GZ: Righting arm (m), θ: Angle (rad)",
    },
    keyPoints: [
      "Dynamic stability reflects sea conditions",
      "Area size is a measure of security",
      "IMO criteria determine minimum areas",
    ],
  },
  "area-concept": {
    title: "Concept of Area",
    introduction: "The area under the GZ curve indicates the ship's dynamic stability capacity and ability to resist external forces.",
    content: `The area under the GZ curve expresses how much energy the ship can absorb up to a given angle.

The IMO criteria define the following areas:
- A₁: the area from 0° to 30° ≥ 0.055 m·rad
- A₂: the area from 0° to 40° ≥ 0.090 m·rad
- A₃: the area from 30° to 40° ≥ 0.030 m·rad

These areas guarantee that the ship has an adequate energy reserve in various heeling scenarios.

The area is calculated by numerical integration or the trapezoidal rule.`,
    bulletPoints: [
      "Area = Energy capacity",
      "IMO defines minimum space criteria",
      "0-30°, 0-40° and 30-40° areas are checked",
      "Calculated by numerical integration",
    ],
    formula: {
      name: "Area Calculation (Trapezoid Rule)",
      expression: "A = Σ [(GZₙ + GZₙ₊₁) / 2] × Δθ",
      description: "A: Area (m rad), GZ: Righting arm (m), Δθ: Angle range (rad)",
    },
    examples: [
      {
        problem: "The area calculated between 0° and 30° is A₁ = 0.048 m·rad. Is the IMO criterion met?",
        solution: "The IMO criterion: A₁ ≥ 0.055 m·rad. 0.048 < 0.055. Result: the criterion is not met and the stability is inadequate.",
      },
    ],
    keyPoints: [
      "All field criteria must be satisfied at the same time",
      "Loading changes affect fields",
      "Area control is mandatory for critical installations",
    ],
  },
  "static-vs-dynamic": {
    title: "Difference Between Static and Dynamic Stability",
    introduction: "Static stability examines the instantaneous righting force (TZ/moment) at a given angle of heel. Dynamic stability examines the WORK (energy) required to tilt the ship to that angle and is measured by the area under the GZ curve. The two measure different things and should be considered together.",
    content: `STATIC STABILITY:
- Instantaneous equilibrium at a given angle: the righting lever GZ and the righting moment (Δ·GZ).
- Assessed by GM at small angles and by the GZ curve at large angles.
- The question: "How strongly does the ship right itself at this angle?"

DYNAMIC STABILITY (ENERGY):
- The work required to heel the ship from 0 to an angle θ is the area under the GZ curve.
- Dynamic stability = Δ × (the area under the GZ curve); the unit is tonne·metre·radian (energy).
- The question: "How much ENERGY is needed to capsize the ship / how much energy reserve is there?"

WHY BOTH ARE NEEDED:
A squall or a wave transfers WORK (energy) to the ship. If the ship does not have enough "reserve dynamic stability" (area under the curve) to meet that energy, it can capsize even though the instantaneous GZ is positive. The IMO weather criterion checks precisely this energy (area) balance (b ≥ a). Meeting the static criteria alone is therefore not sufficient.`,
    bulletPoints: [
      "Statics: instantaneous force/moment (GZ, Δ·GZ).",
      "Dynamic: work/energy = area under the curve.",
      "Dynamic stability = Δ × (area under the GZ curve).",
      "Wind/wave transfers energy to the ship; The reserve area must cover this.",
    ],
    formula: {
      name: "Dynamic stability (energy)",
      expression: "Dynamic stability = Δ × ∫₀^θ GZ dθ  (the area under the curve)",
      description: "The area under the GZ curve gives the work (energy reserve) done to tilt the ship to that angle.",
    },
    keyPoints: [
      "Static = force, dynamic = energy; The two measure different things.",
      "Dynamic stability is measured by the area under the GZ curve.",
      "Weather criterion (b≥a) is a dynamic/energy criterion.",
      "Static adequacy does not guarantee dynamic security.",
    ],
  },
  "wave-effect": {
    title: "Wave Effect",
    introduction: "Waves transfer energy to the ship, creating a rolling motion and testing dynamic stability.",
    content: `Waves act on a ship in several ways:

1. Wave slope: when the ship lies on a wave the effective angle of heel increases.

2. Wave moment: the wave height and period determine the heeling moment.

3. Resonance: dangerous oscillations arise when the wave period approaches the rolling period.

4. Parametric rolling: in head/following seas the changing waterplane breadth alters the stability periodically.

The IMO wind and wave criteria take these effects into account.`,
    bulletPoints: [
      "Waves transfer lying energy",
      "The wave period and the roll period may resonate",
      "There is a risk of parametric yawing in fore and aft waves",
      "Stability areas absorb wave energy",
    ],
    keyPoints: [
      "Wave conditions are critical in stability assessment",
      "Course and speed are adjusted for resonance prevention",
      "Parametric roll is important on container ships",
    ],
    warnings: [
      "Under resonant conditions the amplitude of roll can reach dangerous levels",
      "A change of course or a reduction of speed may be necessary",
    ],
  },
  "wind-effect": {
    title: "Wind Effect",
    introduction: "Wind affects the superstructures of the ship, creating a heeling moment and straining stability.",
    content: `The effect of wind depends on the surface area exposed to it and on the wind speed.

The wind heeling moment:
HMwind = 0.5 × ρair × V² × A × h

where ρair is the air density, V the wind speed, A the exposed area and h the lever.

The IMO weather criterion is the stability check that guarantees the ship will not capsize under a sudden gust. This criterion is applied graphically on the GZ curve.`,
    bulletPoints: [
      "Wind heeling moment depends on superstructure area",
      "It is proportional to the square of the wind speed",
      "IMO Weather Criterion tests wind safety",
      "High freeboard and superstructure increase wind effect",
    ],
    formula: {
      name: "Wind Heeling Moment",
      expression: "HM = P × A × h; P = 0.5 × ρ × V²",
      description: "HM: Heeling moment (N·m), P: Wind pressure (Pa), A: Exposed area (m²), h: Lift arm (m), V: Wind speed (m/s)",
    },
    keyPoints: [
      "Wind criterion is mandatory for all ships",
      "Sudden wind (gust) is taken into account",
      "Angle of heel limits are checked",
    ],
  },
  // =====================================================
  // BÖLÜM 11 - HASARLI STABİLİTE (DAMAGE STABILITY)
  // =====================================================
  "post-damage-floatation": {
    title: "Buoyancy After Damage",
    introduction: "Post-damage buoyancy determines whether the ship can continue to float if one or more compartments fill with water.",
    content: `Preserving buoyancy when the ship is damaged is critical for the safety of life and property.

Buoyancy after damage depends on two factors:
1. The volume and position of the damaged compartment
2. The ship's available reserve buoyancy

Reserve buoyancy is the watertight volume above the waterline. If the water entering the damaged compartment exceeds this volume the ship founders.

The permeability factor (μ) shows how much of the compartment can fill with water:
- Engine room: μ = 0.85
- Cargo hold (general cargo): μ = 0.60
- Passenger spaces: μ = 0.95
- Empty tanks: μ = 0.95

Flooded volume = Actual volume × μ`,
    images: [
      {
        src: damageStabilityDiagram,
        alt: "Damage stability diagram",
        caption: "Figure: a damaged compartment, water ingress and the resulting list",
      },
    ],
    bulletPoints: [
      "Reserve buoyancy = Water-resistant volume above the waterline",
      "Permeability (μ) varies by compartment",
      "Damaged volume = Volume × μ",
      "Subdivision increases the ship's resistance to sinking",
    ],
    formula: {
      name: "Damaged Volume Calculation",
      expression: "Vflooded = Vcompartment × μ",
      description: "Vflooded: Filled volume (m³), Vcompartment: Compartment volume (m³), μ: Permeability coefficient",
    },
    examples: [
      {
        problem: "A cargo hold of 500 m³ is damaged. If the permeability is μ = 0.60, how much water enters?",
        solution: "Vflooded = 500 × 0.60 = 300 m³. Result: 300 m³ of water enters the hold.",
      },
    ],
    keyPoints: [
      "Permeability values are determined by SOLAS",
      "High permeability = More water filling",
      "Damage resistance increases as the number of compartments increases",
    ],
  },
  "flooding-concept": {
    title: "Flooding Concept",
    introduction: "Flooding is the uncontrolled filling of a compartment of the ship with water and is analyzed by two methods: lost buoyancy and added weight.",
    content: `Flooding is analysed in two ways:

1. THE LOST BUOYANCY METHOD:
The flooded compartment no longer produces buoyancy. The ship sinks deeper to restore equilibrium. In this method the displacement is taken as unchanged.

2. THE ADDED WEIGHT METHOD:
The water that enters is treated as a weight. The displacement increases and the ship sinks. This method also takes the free surface effect into account.

Both methods give the same final draft and trim; only the logic of the calculation differs.

Modern stability computers generally use the added weight method.`,
    bulletPoints: [
      "Lost buoyancy: Bulkhead does not produce buoyancy",
      "Added weight: Water is added as a weight",
      "Both methods give the same result",
      "Added weight takes into account free surface",
    ],
    formula: {
      name: "Added Weight Calculation",
      expression: "wadded = Vflooded × ρwater",
      description: "wadded: Weight of added water (tons), Vflooded: Volume filled (m³), ρwater: Density of water (t/m³)",
    },
    examples: [
      {
        problem: "If 400 m³ of sea water (ρ = 1.025 t/m³) enters a compartment, what is the weight added?",
        solution: "wadded = 400 × 1.025 = 410 tonnes. Result: 410 tonnes of weight is added.",
      },
    ],
    keyPoints: [
      "Flooding analysis is the basis of damage stability",
      "Free surface effect is critical in case of flooding",
      "Stability software simulates flooding",
    ],
  },
  "reserve-buoyancy": {
    title: "Reserve Buoyancy",
    introduction: "Reserve buoyancy is the water-resistant volume of the ship above the waterline and forms the safety margin against sinking in case of damage.",
    content: `Reserve buoyancy is the volume formed by the ship's freeboard and enclosed superstructures. This volume provides additional buoyancy in a damaged condition.

Factors in reserve buoyancy:
- The height of the freeboard
- The volume of the enclosed superstructures
- Watertight subdivision
- The condition of doors and openings

SOLAS requirements:
- Minimum freeboard values
- Limits on compartment length
- Watertight door standards

The reserve buoyancy calculation:
RB = Vsuperstructure + Vfreeboard

Adequate reserve buoyancy keeps the ship afloat even in a damaged condition.`,
    bulletPoints: [
      "Reserve buoyancy = Freeboard + Closed superstructures",
      "As freeboard decreases, reserve buoyancy decreases.",
      "Watertight compartmentation maintains reserve buoyancy",
      "SOLAS establishes minimum freeboard values",
    ],
    formula: {
      name: "Reserve Buoyancy",
      expression: "RB = WPA × Freeboard + Vsuperstructure",
      description: "RB: Reserve buoyancy (m³), WPA: Waterline area (m²), Freeboard: Freeboard (m)",
    },
    keyPoints: [
      "Reserve buoyancy is the margin of safety",
      "Overloading reduces reserve buoyancy",
      "Closed doors maintain reserve buoyancy",
    ],
    warnings: [
      "Open hatches and doors reduce reserve buoyancy to zero",
      "The freeboard line must not be exceeded",
    ],
  },
  "asymmetric-flooding": {
    title: "Asymmetric Flooding",
    introduction: "Asymmetric flooding is when water fills one side of the ship, causing a dangerous list angle.",
    content: `Asymmetric flooding occurs when the damage is on one side. If water enters only one side the ship heels to that side.

The dangers of asymmetric flooding:
1. A sudden and large angle of list
2. Immersion of the deck edge
3. Additional water entering through open deck openings
4. The risk of capsizing

Cross-flooding:
Deliberately filling the tanks on the opposite side to reduce the list. This operation:
- Is required by SOLAS
- Must be completed within a maximum of 15 minutes
- Reduces the list to an acceptable value

The cross-flooding capacity is determined in the design of the ship.`,
    bulletPoints: [
      "Asymmetric flooding creates a dangerous list",
      "Cross sync list reduces",
      "SOLAS allows a maximum cross synchronization time of 15 minutes",
      "Deck edge sinking causes tipping",
    ],
    formula: {
      name: "List Angle Estimation",
      expression: "tan(θ) ≈ (w × y) / (Δ × GM)",
      description: "θ: List angle, w: Weight of filled water (tons), y: Transverse distance of water (m), GM: Metacentric height (m)",
    },
    examples: [
      {
        problem: "200 tonnes of water collects 5 m off the centreline. If Δ = 10,000 tonnes and GM = 1.0 m, what is the angle of list?",
        solution: "tan(θ) = (200 × 5) / (10,000 × 1.0) = 0.1. θ = arctan(0.1) ≈ 5.7°. Result: the angle of list is about 6°.",
      },
    ],
    keyPoints: [
      "Asymmetric flooding is the most dangerous damage situation",
      "Cross-syncing systems are critical",
      "List angle should not exceed 15°",
    ],
  },
  "progressive-flooding": {
    title: "Progressive Flooding",
    introduction: "Progressive flooding is the uncontrolled spread of water from one compartment to another, increasing the risk of ship sinking.",
    content: `Progressive flooding is the spread of water from the damaged compartment into other compartments through:
- Open doors
- Damaged compartment boundaries
- Ventilation ducts
- Pipelines

This rapidly worsens the ship's condition after the initial damage.

Methods of prevention:
1. Closing the watertight doors
2. Closing the ventilation dampers
3. Checking the pipeline valves
4. Isolating the damaged compartment

SOLAS assesses the duration of progressive flooding and the final condition of the ship.`,
    bulletPoints: [
      "Water spreads through open passages to other compartments",
      "Ship condition deteriorates rapidly",
      "Watertight doors prevent spreading",
      "SOLAS tests progressive flooding scenarios",
    ],
    keyPoints: [
      "The condition of doors and dampers is critical",
      "Regular waterproofing checks should be carried out",
      "Crew training is important",
    ],
    warnings: [
      "Doors left open can lead to disaster",
      "Watertight doors must be kept closed at sea",
    ],
  },
  "damaged-gm-gz": {
    title: "Damaged GM and GZ",
    introduction: "GM and GZ values change after damage; This change determines the ship's survivability.",
    content: `Changes in stability after flooding:

CHANGE IN GM:
1. Change in KG: the water that enters raises or lowers the centre of gravity
2. Change in KM: the new draft and trim affect KM
3. Free surface: a free surface effect arises in the flooded compartment

Damaged GM = Intact GM + change in KM - change in KG - FSE

CHANGE IN THE GZ CURVE:
- The curve shifts horizontally (the angle of list)
- The maximum GZ decreases
- The area of stability shrinks
- The angle of vanishing stability decreases

SOLAS defines minimum GZ and area values for the damaged condition.`,
    bulletPoints: [
      "Damaged GM usually decreases",
      "Free surface further reduces GM",
      "GZ curve shifts towards list",
      "Stability margins narrow",
    ],
    formula: {
      name: "Damaged GM Estimate",
      expression: "GMdamaged = GMintact - ΔFSE - ΔKG + ΔKM",
      description: "Each parameter is calculated according to the flooding situation",
    },
    keyPoints: [
      "Damaged stability calculation is mandatory",
      "SOLAS sets minimum values",
      "Stability computers simulate damage scenarios",
    ],
  },
  // =====================================================
  // BÖLÜM 12 - ÖZEL STABİLİTE DURUMLARI
  // =====================================================
  "heavy-lift": {
    title: "Heavy Lift Operations",
    introduction: "Heavy lift operations critically affect the stability of the ship when lifting heavy loads by crane.",
    content: `Changes in stability during a heavy lift:

1. VIRTUAL RISE OF KG:
Once the weight leaves the ground its centre of gravity behaves as if it had moved to the head of the derrick.
KGnew = KG + (w × h) / Δ
h: the height of lift

2. PENDULUM EFFECT:
The suspended weight behaves like a pendulum and reduces GM.
GMreduced = GM - (w × l²) / (Δ × GM)
l: the length of the sling

3. FORMATION OF LIST:
A transverse moment arises when the boom is swung outboard.

Safety precautions:
- A stability calculation before the lift
- Ballast prepared
- Continuous monitoring during the lift
- Checking the wind and sea state`,
    bulletPoints: [
      "KG increases virtually when the load is removed",
      "Suspended load creates pendulum effect",
      "GM decreases during lifting",
      "Stability calculation should be made before the operation",
    ],
    formula: {
      name: "Virtual KG Elevation",
      expression: "ΔKG = (w × h) / Δ",
      description: "ΔKG: KG gain (m), w: Load weight (ton), h: Lifting height (m), Δ: Displacement (ton)",
    },
    examples: [
      {
        problem: "A 50-tonne weight is lifted to a height of 10 m. If Δ = 5,000 tonnes, by how much does KG increase?",
        solution: "ΔKG = (50 × 10) / 5,000 = 0.10 m. Result: KG rises virtually by 10 cm.",
      },
    ],
    keyPoints: [
      "Stability check is performed before each lift.",
      "Wind lifting is dangerous",
      "Suspended load acts as a free surface",
    ],
  },
  "deck-cargo": {
    title: "Deck Loads",
    introduction: "Deck loads reduce GM by increasing KG and adversely affect stability by increasing wind area.",
    content: `The stability effects of deck cargo:

1. RISE IN KG:
Cargo carried on deck has a high KG.
KGnew = Σ(wᵢ × KGᵢ) / Σwᵢ

2. REDUCTION IN GM:
A higher KG lowers GM.
GM = KM - KG

3. INCREASED WINDAGE AREA:
Deck containers or timber stacks increase the area exposed to the wind.

4. TRANSVERSE MOMENT:
A list arises if the cargo is stowed unevenly.

Limits on deck cargo:
- Maximum cargo weight (structural)
- Stability requirements
- Visibility requirements
- Lashing capacity`,
    bulletPoints: [
      "Deck load increases KG",
      "Wind exposure area increases",
      "Balanced loading is required to avoid lists.",
      "Binding security is critical",
    ],
    formula: {
      name: "KG with Deck Load",
      expression: "KGnew = (Δold × KGold + wdeck × KGdeck) / Δnew",
      description: "New KG is calculated with the weight-moment method",
    },
    keyPoints: [
      "Deck load limits must not be exceeded",
      "Stability calculation must include deck load",
      "A bonding plan must be prepared",
    ],
  },
  "suspended-weight": {
    title: "Suspended Load Effect",
    introduction: "Suspended loads virtually move the center of gravity to the suspension point and reduce stability.",
    content: `A suspended weight is any weight free to swing:
- A crane load
- Cargo in a sling
- Freely swinging equipment

VIRTUAL RISE OF KG:
The centre of gravity of a suspended weight is taken as having moved to the point of suspension.
GG' = (w × d) / Δ
d: the distance between the actual KG of the weight and the point of suspension

THE PENDULUM EFFECT:
A suspended weight swings outboard when the ship heels and increases the heel. This effect is similar to free surface.

GM with a suspended weight:
GMeffective = GM - (w × l²) / (Δ × GM)
l: the length of the sling`,
    bulletPoints: [
      "Suspended load virtually raises KG",
      "Swing effect reduces stability",
      "Creates a free surface-like effect",
      "Critical in lifting operations",
    ],
    formula: {
      name: "Suspended Load KG Rise",
      expression: "GG' = (w × d) / Δ",
      description: "GG': Virtual KG rise (m), w: Suspended weight (ton), d: Suspension point distance (m)",
    },
    examples: [
      {
        problem: "A 30-tonne weight is suspended from a point 8 m above its KG. If Δ = 6,000 tonnes, what is the virtual rise of KG?",
        solution: "GG' = (30 × 8) / 6,000 = 0.04 m. Result: KG rises virtually by 4 cm.",
      },
    ],
    keyPoints: [
      "Suspended load acts as a free surface",
      "Long straps increase the effect",
      "Monitoring required during operation",
    ],
  },
  "ballast-operations": {
    title: "Ballast Operations",
    introduction: "Ballast operations are used to control the ship's stability, draft and trim values.",
    content: `Ballast water management is the principal tool of stability control.

THE FUNCTIONS OF BALLAST:
1. Adjusting stability (GM control)
2. Correcting trim
3. Correcting list
4. Achieving a minimum draft
5. Managing stresses

STABILITY EFFECTS:
Ballast tanks are generally in the lower part of the ship.
- Taking ballast: KG falls and GM increases
- Discharging ballast: KG rises and GM decreases

FREE SURFACE:
Partly filled ballast tanks create a free surface effect. During critical operations tanks must be kept either full or empty.

The sequence of ballast operations matters — stability must not fall below critical values at any stage.`,
    bulletPoints: [
      "Ballast provides stability, draft and trim control",
      "Low tanks reduce KG",
      "Partially full tanks create FSE",
      "Order of change affects stability",
    ],
    formula: {
      name: "KG Change with Ballast",
      expression: "KGnew = (Δ × KG + wballast × KGtank) / (Δ + wballast)",
      description: "New KG is calculated when ballast is purchased",
    },
    keyPoints: [
      "Ballast operation plan should be prepared",
      "Free surface effect should be monitored",
      "Intermediate states must be checked",
    ],
  },
  "cargo-shift": {
    title: "Cargo Shift",
    introduction: "Cargo drift is the displacement of cargo by the movement of the ship and can lead to sudden collapse or rollover.",
    content: `A cargo shift is one of the most dangerous causes of stability casualties.

TYPES OF SHIFT:
1. Bulk cargo shift (grain, ore, coal)
2. Packaged cargo shift (lashings parting)
3. Liquid cargo sloshing (within the tank)
4. Vehicle movement (Ro-Ro ships)

LIST CALCULATION:
tan(θ) = (w × d) / (Δ × GM)
w: the weight of cargo that shifts
d: the distance it shifts

PRECAUTIONS:
- Proper stowage and lashing
- Use of shifting boards for grain
- Checking tank filling levels
- Lashing vehicles on Ro-Ro ships

SOLAS and the Grain Code make anti-shifting measures mandatory.`,
    bulletPoints: [
      "Cargo shifting creates dangerous list",
      "Cast cargo carries special risks",
      "Tie breakage may cause tipping",
      "IMO load safety rules are mandatory",
    ],
    formula: {
      name: "Cargo Shift List Angle",
      expression: "tan(θ) = (w × d) / (Δ × GM)",
      description: "θ: List angle, w: Sliding weight (ton), d: Sliding distance (m)",
    },
    examples: [
      {
        problem: "500 tonnes of cargo shifts 2 m to one side. If Δ = 15,000 tonnes and GM = 1.0 m, what is the angle of list?",
        solution: "tan(θ) = (500 × 2) / (15,000 × 1.0) = 0.067. θ = arctan(0.067) ≈ 3.8°. Result: a list of around 4° is created.",
      },
    ],
    keyPoints: [
      "Load security is an integral part of the operation",
      "Load control should be done while driving",
      "Bindings should be checked before bad weather",
    ],
  },
  "icing-effect": {
    title: "Icing Effect",
    introduction: "Icing dangerously reduces stability by increasing KG as ice accumulates on the ship's superstructures.",
    content: `Icing is a serious stability hazard for ships operating in cold regions.

ICE ACCRETION:
- Air temperature below -2°C
- Sea water temperature below +8°C
- Wind and sea spray

WEIGHT OF ICE:
Ice builds up on superstructures, equipment and the deck.
- Moderate icing: 30 kg/m²
- Severe icing: 50+ kg/m²

STABILITY EFFECT:
Ice has a high KG.
ΔKG = (wice × KGice) / (Δ + wice)

GM falls rapidly and the risk of capsizing increases.

Removing ice is critically important.`,
    bulletPoints: [
      "Icing increases KG",
      "GM decreases, stability deteriorates",
      "There is a risk of tipping over in severe icing",
      "Ice cleaning should be done regularly",
    ],
    formula: {
      name: "KG Change with Ice Weight",
      expression: "ΔKG = (mice × hice) / Δ",
      description: "ΔKG: KG increase (m), mice: Mass of ice (tons), hice: Average height of ice (m)",
    },
    examples: [
      {
        problem: "50 tonnes of ice builds up on the superstructures at a mean KG of 15 m. If Δ = 5,000 tonnes and the existing KG = 7 m, what is the new KG?",
        solution: "KGnew = (5,000 × 7 + 50 × 15) / 5,050 = (35,000 + 750) / 5,050 = 7.08 m. Result: KG rises by 8 cm.",
      },
    ],
    keyPoints: [
      "Icing is observed during cold region cruises.",
      "Ice cleaning is the priority operation",
      "Icing rate is very high in severe conditions",
    ],
    warnings: [
      "Icing can reach a critical level in a very short time",
      "A change of course may be necessary",
    ],
  },
  // =====================================================
  // BÖLÜM 13 - STABİLİTE KRİTERLERİ VE ULUSLARARASI KURALLAR
  // =====================================================
  "imo-stability-criteria": {
    title: "IMO Stability Criteria",
    introduction: "IMO stability criteria define the minimum safety requirements of ships and are mandatory for all commercial ships.",
    content: `The IMO (International Maritime Organization) stability criteria are set out in the MSC.267(85) Intact Stability Code.

THE BASIC CRITERIA:

1. AREA CRITERIA:
- The area from 0° to 30° ≥ 0.055 m·rad
- The area from 0° to 40° ≥ 0.090 m·rad
- The area from 30° to 40° ≥ 0.030 m·rad

2. GZ CRITERIA:
- Maximum GZ ≥ 0.20 m
- The maximum GZ must occur at an angle of at least 25°
- Preferably at 30° or above

3. GM CRITERION:
- Initial GM ≥ 0.15 m
- Higher values for some ship types

These criteria are for intact stability. Damage stability criteria are defined separately.`,
    bulletPoints: [
      "Field criteria control dynamic stability",
      "GZ criteria guarantee adequate righting arm",
      "GM criterion provides initial stability",
      "All criteria must be met at the same time",
    ],
    formula: {
      name: "IMO Field Criteria",
      expression: "A₁ ≥ 0.055; A₂ ≥ 0.090; A₃ ≥ 0.030 (m·rad)",
      description: "A₁: 0-30° field, A₂: 0-40° field, A₃: 30-40° field",
    },
    keyPoints: [
      "Criteria must be met for all loading cases",
      "Stability booklet lists approved states",
      "Non-criteria work is prohibited",
    ],
  },
  "intact-stability-code": {
    title: "Intact Stability Code",
    introduction: "The Intact Stability Code (IS Code) contains comprehensive stability requirements and calculation methods for undamaged ships. It is accepted by the 2008 IS Code (MSC.267(85)) and is mandatory under SOLAS and the Load Line Agreement.",
    content: `The Intact Stability Code (the 2008 IS Code) was adopted by resolution MSC.267(85).

STRUCTURE:
Part A (mandatory): the general criteria and the criteria for particular ship types.
Part B (recommendatory): additional measures and guidance.

GENERAL CRITERIA (Part A, 2.2 – for all ships):
Minimum requirements for the areas under the GZ curve and for the GZ values:
- The area under the GZ curve from 0° to 30° ≥ 0.055 m·rad
- The area from 0° to 40° (or 0° to θf if the downflooding angle θf is smaller) ≥ 0.090 m·rad
- The area from 30° to 40° (or 30° to θf) ≥ 0.030 m·rad
- The righting lever GZ must be ≥ 0.20 m at an angle of 30° or more
- The maximum GZ should preferably occur at an angle greater than 30° (at least 25°)
- The initial metacentric height GM₀ ≥ 0.15 m

THE WEATHER CRITERION (Part A 2.3):
The ship must have sufficient energy reserve against capsizing under a steady beam wind (lever arm lw1) with a superimposed roll and gust (lw2). The area resisting the wind moment (b) must be greater than or equal to the area applied by the wind moment (a), i.e. b ≥ a.

PARTICULAR SHIP TYPES:
Additional or special criteria are defined for passenger ships (passenger crowding and turning moment criteria), grain carriers (the Grain Code), timber deck cargoes, high-speed craft, offshore units and others.

APPLICATION:
Every loading condition is checked against these criteria in the ship's approved Stability Booklet; the flag State and PSC verify compliance.`,
    bulletPoints: [
      "General criterion: 0-30° area ≥0.055; 0-40° ≥0.090; 30-40° ≥0.030 m·rad",
      "GZ ≥ 0.20 m at ≥30°; GZ max at ≥25–30°; GM₀ ≥ 0.15 m",
      "Weather criterion: b ≥ a (energy balance) under wind+roll",
      "There are special criteria for grain, passenger, timber, HSC",
    ],
    formula: {
      name: "Weather Criterion",
      expression: "b ≥ a",
      description: "The GZ area (b) that resists overturning must be greater than/equal to the area (a) applied by the wind + yawing moment.",
    },
    keyPoints: [
      "It is the basis of the IS Code stability booklet criteria.",
      "General criteria set numerical limits for area, GZ and GM₀.",
      "Weather criterion secures energy reserves under wind/roll.",
      "The flag state and PSC monitor compliance.",
    ],
  },
  "wind-criteria": {
    title: "Wind Criteria",
    introduction: "Wind criteria (Weather Criterion) ensure that the ship does not overturn in heavy wind and wave conditions.",
    content: `The weather criterion tests the ship's survival under a combination of a sudden gust and waves.

THE SCENARIO:
1. A steady wind heels the ship to angle θ₁
2. Wave action rolls the ship to windward to angle θ₂
3. A gust pushes the ship back to leeward

THE CRITERION:
b ≥ a (areas on the GZ curve)
- a: the area between the wind moment and the GZ curve
- b: the area on the righting side

WIND PRESSURE:
P = 504 N/m² (the standard value)
Correction factors are applied.

This criterion is particularly critical for ships with a large superstructure.`,
    bulletPoints: [
      "Weather Criterion is a worst-case scenario test",
      "The combination of sudden wind and waves is evaluated",
      "Area comparison is made on the GZ curve",
      "Displayed graphically in the stability booklet",
    ],
    formula: {
      name: "Weather Criterion",
      expression: "b ≥ a; P = 504 N/m² (standart)",
      description: "a: Wind tilt area, b: Straightening reserve area",
    },
    keyPoints: [
      "Weather Criterion is mandatory for all ships",
      "High freeboard makes this criterion difficult",
      "Must be taken into account in design",
    ],
  },
  "wave-criteria": {
    title: "Wave Criteria",
    introduction: "Wave criteria evaluate the risks of parametric roll and excessive oscillation of the ship under wave influence.",
    content: `Assessing stability in a seaway:

PARAMETRIC ROLLING:
In head or following seas the breadth of the waterplane changes periodically. This changes GM periodically and, under resonant conditions, leads to dangerous rolling.

Container ships and RoPax vessels are particularly susceptible.

SURF-RIDING AND BROACHING:
In following seas the ship can be carried along with the wave and fall into an uncontrolled turn.

IMO RECOMMENDATIONS:
- MSC.1/Circ.1228: parametric rolling
- MSC.1/Circ.707: avoiding dangerous situations

Operational measures: a change of course and speed.`,
    bulletPoints: [
      "Parametric roll is caused by GM variation",
      "In resonance conditions, oscillation reaches dangerous levels",
      "Container ships are vulnerable",
      "Avoided by route and speed adjustment",
    ],
    keyPoints: [
      "The relationship between wave period and roll period is critical",
      "Operational awareness is required",
      "Simulation tools are used in risk assessment",
    ],
    warnings: [
      "Parametric rolling can be sudden and violent",
      "Heavy weather routeing is vitally important",
    ],
  },
  "min-gm-requirements": {
    title: "Minimum GM Requirements",
    introduction: "Minimum GM values are derived from the IMO IS Code criteria and are operationally insurmountable lower limits specified in the stability booklet according to the ship type and loading situation. But GM isn't just 'the bigger the better'; Very high GM is also dangerous.",
    content: `THE ORIGIN OF THE MINIMUM GM:
The IS Code requires GM₀ ≥ 0.15 m for the initial metacentric height. In practice the minimum GM required for each loading condition is given in the booklet by the KG limit curve (the maximum KG / minimum GM curve); this curve represents the boundary at which all the IMO criteria (area, GZ, weather criterion) are met simultaneously.

BY SHIP TYPE:
- General cargo ship: GM₀ ≥ 0.15 m (plus the KG limit curve).
- Passenger ships: additional turning/passenger crowding criteria.
- Tankers: generally a higher GM in the ballast condition.
- Container ships: a calculation specific to the loading condition because of the risk of parametric rolling.

STIFF AND TENDER SHIPS:
GM and the rolling period are inversely related. A very high GM → a short period and stiff, violent rolling → damage to cargo and equipment and loss of comfort; and if the short period approaches the wave period, resonance. A very low GM → a long, sluggish roll, a small margin of safety and danger in a following sea. The aim is therefore a GM that meets the criteria without being excessively high.`,
    bulletPoints: [
      "GM₀ ≥ 0.15 m (IS Code) + KG limit curve gives limit for each loading",
      "Stiff (high GM): short/hard roll, risk of damage and resonance",
      "Tender (low GM): long roll, small safety margin",
      "Additional attention for parametric roll in container ships",
    ],
    formula: {
      name: "Roll period – GM relationship",
      expression: "Troll = 2π · k / √(g · GM)",
      description: "k: gyration radius. As GM increases, the period becomes shorter (the ship becomes harder); As GM decreases, the period becomes longer.",
    },
    keyPoints: [
      "The minimum GM comes from the KG limit curve that satisfies the IMO criteria.",
      "Both too low and too high GM are dangerous.",
      "The roll period is the practical indicator of GM (T = 2πk/√(gGM)).",
      "Calculation should be made before GM reducing operation.",
    ],
    warnings: [
      "Sailing below the minimum GM carries a risk of capsizing",
      "An excessively high GM can cause cargo to shift and be damaged through violent rolling",
    ],
  },
  "operational-limits": {
    title: "Operational Limits",
    introduction: "Operational limits define the safe operating conditions of the ship and are prohibited from being exceeded.",
    content: `The operational limits are defined in the stability booklet:

CARGO LIMITS:
- Maximum deadweight
- Hold and deck cargo capacities
- Limits on cargo distribution

STABILITY LIMITS:
- Minimum GM values
- Maximum KG values (the KG limit curve)
- Trim limits

ENVIRONMENTAL LIMITS:
- Wind speed limits (for certain operations)
- Wave height limits
- Temperature limits (icing)

EXCEEDING THE LIMITS:
Exceeding the stability limits:
- Affects the validity of the insurance
- Leads to detention in PSC inspections
- Creates liability in the event of a casualty`,
    bulletPoints: [
      "Stability booklet defines all limits",
      "KG limit curve is frequently used",
      "Exceeding the limit has legal consequences",
      "Every upload is checked against limits",
    ],
    keyPoints: [
      "Limits are the limits of safe operation",
      "The Master is responsible for the limits",
      "Caution is required in limit approaches",
    ],
  },
  // =====================================================
  // BÖLÜM 14 - STABİLİTE KAZALARI VE OPERASYONEL SONUÇLAR
  // =====================================================
  "loading-errors": {
    title: "Loading Errors",
    introduction: "Loading errors are the most common cause of stability accidents and can be prevented with careful planning.",
    content: `Common loading errors:

1. INCORRECT WEIGHT INFORMATION:
- A difference between the declared and the actual weight
- Deviations in container weights
- Measurement errors on bulk cargo

2. INCORRECT STOWAGE:
- Heavy weights stowed high up
- Asymmetric weight distribution
- Incorrect assessment of broken stowage

3. CALCULATION ERRORS:
- An incorrect KG calculation
- Neglecting the FSE
- Errors in the trim calculation

4. LACK OF PLANNING:
- Intermediate conditions not checked
- The effect of fuel consumption
- Inadequate ballast arrangement

These errors are prevented by careful use of the stability booklet.`,
    bulletPoints: [
      "Incorrect weight information is a common problem",
      "High placement lowers GM",
      "Calculation errors have critical consequences",
      "Careful planning prevents accidents",
    ],
    keyPoints: [
      "Freight information must be verified",
      "Calculations should be double checked",
      "Intermediate situations should be reviewed",
    ],
    warnings: [
      "Container weights are frequently misdeclared",
      "The IMO VGM (Verified Gross Mass) requirement is in force",
    ],
  },
  "fse-accidents": {
    title: "Free Surface Accidents",
    introduction: "Neglecting or miscalculating the free surface effect has led to serious stability accidents.",
    content: `The common features of free surface casualties:

1. A LARGE NUMBER OF PARTLY FILLED TANKS:
Several partly filled tanks raise the total FSE to a critical level.

2. NEGLECTING THE FSE CALCULATION:
Failing to apply the free surface correction in the GM calculation.

3. A SUDDEN LOSS OF GM:
A sudden increase in FSE during a cargo or ballast operation.

EXAMPLE CASUALTIES:
- A bulk carrier capsizing (several partly filled holds)
- A tanker capsizing (transfer of liquid between compartments)
- A fishing vessel foundering (holds left open)

The remedy: keep tanks either full or empty and monitor the FSE continuously.`,
    bulletPoints: [
      "Too many partially filled tanks are dangerous",
      "FSE calculation should not be neglected",
      "Sudden loss of GM leads to rollover",
      "Tank condition must be constantly monitored",
    ],
    keyPoints: [
      "FSE must be included in every stability calculation",
      "The number of tanks should be reduced in critical operations",
      "Calculation should be made before the operation",
    ],
  },
  "wrong-gm-interpretation": {
    title: "Incorrect GM Comments",
    introduction: "Incorrect interpretation of the GM value can cause operational errors and accidents.",
    content: `Errors in interpreting GM:

1. THE FALLACY THAT A VERY HIGH GM IS GOOD:
A very high GM leads to violent rolling (a stiff ship):
- A short rolling period
- The risk of cargo damage
- Discomfort for the crew
- Structural stress

2. THE FALLACY THAT AN EVEN KEEL IS ALWAYS BEST:
On some ships an optimum trim improves fuel efficiency.

3. FAILING TO RECOGNISE A NEGATIVE GM:
An angle of loll (unstable equilibrium) can be misinterpreted:
- It is taken for the effect of the wind
- An attempt to correct it makes the situation worse

4. CONFUSING STATIC AND DYNAMIC STABILITY:
An adequate GM does not mean adequate dynamic stability.`,
    bulletPoints: [
      "Too high GM is also problematic",
      "Creates negative GM loll angle",
      "Static and dynamic stability are different",
      "Optimum GM value should be sought",
    ],
    keyPoints: [
      "GM should be kept at a balanced value",
      "Loll angle is a dangerous warning",
      "Field criteria should also be checked",
    ],
    warnings: [
      "Ballast must not be taken into the low side when the ship is at an angle of loll",
      "Water must first be taken into the lowest tanks",
    ],
  },
  "trim-operation-errors": {
    title: "Trim-Related Operation Errors",
    introduction: "Incorrect trim values negatively affect propeller efficiency, maneuverability and safety.",
    content: `Operational errors caused by trim:

1. EXCESSIVE TRIM BY THE HEAD:
- Deck wetness
- Reduced visibility
- The risk of shipping seas forward
- Loss of propeller efficiency

2. EXCESSIVE TRIM BY THE STERN:
- Reduced rudder effect
- Inefficient bow thruster
- Difficulty manoeuvring in port
- Increased hull friction

3. TRIM CALCULATION ERRORS:
- Incorrect use of the LCF
- Taking the wrong MCT value
- Neglecting intermediate conditions

4. THE EFFECT OF FUEL CONSUMPTION:
Fuel consumption during the passage changes the trim.`,
    bulletPoints: [
      "Excessive bow trim causes deck wetness",
      "Excessive aft trim reduces maneuverability",
      "Optimum trim saves fuel",
      "Trim changes while cruising",
    ],
    keyPoints: [
      "Trim values must be constantly monitored",
      "Optimum trim is specific to the ship",
      "Trim can be corrected by fuel transfer",
    ],
  },
  "psc-findings": {
    title: "PSC Findings Related to Stability",
    introduction: "Port State Control inspections detect stability deficiencies and may lead to ship detention.",
    content: `A PSC (Port State Control) stability inspection focuses on:

DOCUMENT CHECKS:
- Whether the stability booklet is up to date
- Approval of the loading computer
- Training records
- Stability calculations

PHYSICAL CHECKS:
- Comparing the draft readings against the calculation
- Agreement between the tank condition and the calculation
- The condition of the watertight doors
- The lashing equipment

COMMON FINDINGS:
- The stability calculation is not up to date
- The drafts do not agree with the calculation
- Watertight doors left open
- Incomplete cargo lashing
- The FSE not included in the calculation

Detention: the ship is not allowed to sail where critical findings arise.`,
    bulletPoints: [
      "Stability booklet must be up to date",
      "Calculations must be consistent with the actual situation",
      "Watertight doors must be in working order",
      "Load lashing should be sufficient",
    ],
    keyPoints: [
      "PSC inspection can be at every port",
      "Critical finding leads to vessel detention",
      "Regular internal audit is recommended",
    ],
    warnings: [
      "Detention means financial and operational loss",
      "Preventive procedures must be applied as required by the ISM Code",
    ],
  },

  "inclining-experiment": {
    title: "Inclining Experiment",
    introduction: "The heeling test is a controlled test to experimentally determine the lightship's center of gravity height (KG) and empty ship displacement. The KG value on which all stability calculations are based is obtained with this test.",
    content: `PURPOSE:

A ship's stability calculations cannot be made without knowing the lightship weight and the height of its centre of gravity (KG). The inclining experiment measures KG directly by heeling the ship in a controlled way with known weights. It is mandatory for newly built ships and for ships that have undergone major alterations.

METHOD:

A known weight (w) on deck is shifted transversely through a known distance (d). This applies a heeling moment to the ship and the ship heels through a small angle (θ). The heel is measured with a plumb line (pendulum) or a U-tube manometer. The ship's metacentric height (GM) is calculated from the measured heel; since KM is known from the hydrostatic tables, KG = KM − GM.

FORMULA:

Heeling moment = w × d. This moment is related to GM and the angle of heel.

EXPERIMENT CONDITIONS (FOR ACCURACY):

- The ship should be as light as possible and "as nearly complete as possible".
- Liquid tanks should be either completely full or empty (to eliminate the free surface effect), or a free surface correction must be applied.
- Wind, current and mooring line tension must be minimal; the ship must be free to heel.
- The experiment is repeated with several different weights and in both directions, and the results are averaged.
- Unknown weights (remaining cargo, water, waste) are recorded and corrected for.

RESULT:

The lightship displacement and KG obtained from the experiment are entered in the ship's Stability Booklet; the stability calculations for all loading conditions are based on these fundamental values.`,
    formula: {
      name: "Metacentric Height (inclining experiment)",
      expression: "GM = (w × d) / (W × tan θ)   →   KG = KM − GM",
      description: "w: shifted weight, d: shifting distance, W: total displacement, θ: heel angle, KM: from hydrostatic table.",
    },
    bulletPoints: [
      "Lightship determines displacement and KG experimentally.",
      "The known weight is shifted transversely, the heel is measured by the pendulum/U-tube.",
      "GM is measured, since KM is known, KG = KM − GM.",
      "Free surface and external influences are minimized; The average is taken repeatedly.",
    ],
    keyPoints: [
      "The basis for all stability calculations is KG; The heel test gives the KG.",
      "Required after new construction/major renovation.",
      "Tank free surface and external forces directly affect accuracy.",
    ],
    warnings: [
      "Tanks with free surfaces or tension in the mooring lines distort the result seriously",
      "An incorrect KG makes all the loading stability calculations unreliable",
    ],
  },

  "probabilistic-damage-stability": {
    title: "Probabilistic Damage Stability",
    introduction: "There are two approaches to assessing damage stability: deterministic (based on specific damage scenarios) and probabilistic (based on the statistical probability of damage). SOLAS is based on probabilistic damage stability in dry cargo and passenger ships.",
    content: `TWO APPROACHES:

THE DETERMINISTIC METHOD:
Defined damage scenarios (for example the flooding of one or two compartments) are considered and the ship must meet defined criteria in each scenario. The "one-compartment/two-compartment standard" is the classic expression of this logic. It is easy to understand but does not fully reflect the variety of real damage.

THE PROBABILISTIC METHOD (SOLAS II-1):
It is based on real collision/damage statistics. It takes account of the probabilities that damage may occur anywhere along the ship and be of various extents and depths. The basic measure is that the Attained Subdivision Index (A) must be greater than or equal to the Required Subdivision Index (R).

THE A AND R INDICES:

- R (Required Index): the minimum level of subdivision that must be achieved, determined by the type and size of the ship (number of passengers, length).
- A (Attained Index): the value calculated from the ship's actual subdivision arrangement, reflecting the probability of survival after damage. A is calculated as the sum of the products of the probability of damage (p) for each compartment or group of compartments and the probability of surviving that damage (s).

THE MEASURE:

A ≥ R must be achieved. Certain partial indices and worst-case conditions are also checked.

WHY IT MATTERS AT SEA:

The probabilistic approach gives the designer flexibility in subdivision while aiming to produce statistically safer ships. What matters to the officer is knowing that the ship's approved loading/damage conditions are defined in the Stability Booklet and the damage control information, and that they must be complied with.`,
    formula: {
      name: "Achieved Segmentation Index",
      expression: "A = Σ (pᵢ × sᵢ) ≥ R",
      description: "pᵢ: probability of damage to region i, sᵢ: probability of surviving after that damage, R: required index.",
    },
    bulletPoints: [
      "Deterministic: specific scenarios (one/two compartment standard).",
      "Probabilistic: based on damage statistics; It is based on SOLAS II-1.",
      "Criterion: Attained Index A ≥ Required Index R.",
      "A = Σ(p×s); p is the probability of damage, s is the probability of survival.",
    ],
    keyPoints: [
      "SOLAS uses the probabilistic method on dry bulk/passenger ships.",
      "A ≥ R must be satisfied.",
      "It is the officer's responsibility to comply with approved loading/damage conditions.",
    ],
  },

  "drydocking-stability": {
    title: "Drydocking Stability",
    introduction: "When the ship begins to settle on dry dock blocks during docking, the upward reaction force exerted by the blocks reduces the effective stability of the ship. The most critical moment is when the aft keel first contacts the blocks.",
    content: `WHAT HAPPENS:

When a ship is taken into a dry dock the water is pumped out; the ship comes down and (usually because of trim) the after end of the keel touches the blocks first. At this point of contact the blocks apply an upward reaction force (P). This force amounts to support acting upwards from a point below the keel line and REDUCES the ship's metacentric height (GM); that is, it behaves as though KG had risen.

THE CRITICAL MOMENT:

The most dangerous moment is the transition just before the ship lands fully, when part of the weight is still carried by buoyancy and part by the blocks. If GM is inadequate at that moment the ship can capsize in the dock or slip off the blocks. Adequate initial GM and a suitable trim must therefore be arranged before docking.

THE FORCE P AND THE LOSS OF GM:

The reaction force P applied by the blocks increases as the water level falls. The virtual rise of KG (and the loss of GM) caused by P is assessed as proportional to P × KM / W. Therefore:
- The ship enters the dock with a small trim by the stern (so that contact is controlled).
- Excessive trim creates a large P at a single point and increases the risk.
- Adequate initial GM is essential.

PRECAUTIONS:

- A suitable trim and adequate GM are arranged before docking by adjusting the loading/ballast.
- Side/bilge blocks and shores come into play as the ship lands.
- Stability is monitored until the whole weight of the ship is on the blocks (fully landed); once fully landed the ship is stable.`,
    formula: {
      name: "GM Loss in Docking (approximately)",
      expression: "Loss of GM ≈ (P × KM) / W",
      description: "P: upward reaction force of the blocks, KM: metacentric height, W: displacement. As P increases, effective GM decreases.",
    },
    bulletPoints: [
      "The upward reaction force (P) on contact with the blocks reduces the effective GM.",
      "The most critical moment: the transition moment when the aft keel begins to settle.",
      "Dry-docking is done with a small stern trim + adequate initial GM.",
      "Once fully landed, the ship is stable again.",
    ],
    keyPoints: [
      "Docking temporarily reduces active stability.",
      "Over trim large P at one point → more GM loss.",
      "Side blocks and struts provide support while sitting.",
    ],
    warnings: [
      "Docking with inadequate GM or excessive trim can cause the ship to slip off the blocks or capsize",
      "Stability must be monitored continuously during the transition",
    ],
  },
};

export default function StabilityTopicsPage() {
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
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Ship Stability</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {stabilityTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-primary/5 cursor-pointer"
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
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Stability Calculations", href: "/stability/calculations" },
                  { title: "Stability Formulas", href: "/stability/formulas" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-primary/40 hover:bg-background"
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
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                {/* Images/Diagrams */}
                {currentContent.images && currentContent.images.length > 0 && (
                  <div className="space-y-4">
                    {currentContent.images.map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden border border-border/40 bg-muted/30">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-48 object-contain bg-muted/30"
                        />
                        {image.caption && (
                          <p className="text-xs text-muted-foreground text-center py-2 px-4">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
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
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-primary mb-2">
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
                        <p className="text-muted-foreground">Solution: {example.solution}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Points */}
                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-primary/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Key Information
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="text-primary font-bold">{index + 1}.</span>
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
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
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
