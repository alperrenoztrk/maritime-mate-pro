import { Shield } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Safety at Sea — educational/reference calculations.
 *
 * These tools perform transparent arithmetic but do not issue statutory or
 * operational safety clearance. SOLAS/LSA/FSS applicability, vessel SMS,
 * approved plans/manuals, manufacturer data and the responsible officer remain
 * the authority for onboard decisions.
 */
export const safety: CourseTopic = {
  key: "safety",
  title: "Safety at Sea",
  icon: Shield,
  accent: "from-rose-500 via-orange-500 to-amber-500",
  group: "deck",
  intro:
    "Fire fighting, life-saving appliances, evacuation and risk-assessment reference tools. " +
    "Results must be checked against the ship's approved documentation and SMS before operational use.",
  advancedTool: { label: "Advanced Safety Tools", href: "/safety" },
  entries: [
    {
      id: "foam-solution",
      name: "Foam Solution Quantity from Selected Rate",
      group: "Fire Fighting",
      formula: "Q = Application Rate × Area × Duration",
      variables: [
        { symbol: "Q", label: "Calculated foam-solution quantity", unit: "L" },
        { symbol: "Application Rate", label: "Rate selected from the applicable approved system requirement", unit: "L/m²/min" },
        { symbol: "Area", label: "Protected area used by the applicable method", unit: "m²" },
        { symbol: "Duration", label: "Application duration required by the applicable method", unit: "min" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Fixed foam systems — exact rate and duration depend on system/application" },
      note: "Arithmetic only. Do not assume a universal application rate or duration from this calculator; use the values required by the approved system, FSS Code provision and manufacturer documentation.",
      inputs: [
        { key: "rate", label: "Approved/Selected Application Rate", unit: "L/m²/min", placeholder: "6.5" },
        { key: "area", label: "Applicable Protected Area", unit: "m²", placeholder: "500" },
        { key: "time", label: "Applicable Duration", unit: "min", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.rate <= 0 || v.area <= 0 || v.time <= 0) {
          return [{ label: "Error", value: "Rate, area and duration must be positive" }];
        }
        const liters = v.rate * v.area * v.time;
        return [
          { label: "Calculated Foam Solution", value: `${liters.toFixed(0)} L` },
          { label: "Calculated Foam Solution", value: `${(liters / 1000).toFixed(2)} m³` },
          { label: "Status", value: "Reference result — not a system compliance determination" },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Mass from Selected Free-Gas Ratio",
      group: "Fire Fighting",
      formula: "M = (V × f) / 0.56",
      variables: [
        { symbol: "M", label: "Calculated CO₂ mass", unit: "kg" },
        { symbol: "V", label: "Volume used by the selected approved design method", unit: "m³" },
        { symbol: "f", label: "Selected free-gas volume ratio", unit: "decimal" },
        { symbol: "0.56", label: "Free CO₂ specific volume used by the FSS Code calculation", unit: "m³/kg" },
      ],
      source: { code: "SOLAS II-2 / FSS Code Chapter 5", detail: "Fixed gas fire-extinguishing systems" },
      note: "The previous 1.5 kg/m³ coefficient was inconsistent with 1/0.56 and understated the result. This corrected arithmetic still does not determine which FSS Code machinery-space volume/ratio method applies; verify against the approved fixed CO₂ system documentation.",
      inputs: [
        { key: "vol", label: "Applicable Design Volume (V)", unit: "m³", placeholder: "2000" },
        { key: "factor", label: "Selected Free-Gas Ratio (f)", unit: "", placeholder: "0.40" },
      ],
      calculate: (v) => {
        if (v.vol <= 0 || v.factor <= 0) {
          return [{ label: "Error", value: "Volume and selected ratio must be positive" }];
        }
        const m = (v.vol * v.factor) / 0.56;
        return [
          { label: "Calculated CO₂ Mass", value: `${m.toFixed(1)} kg` },
          { label: "Status", value: "Reference only — verify against the approved CO₂ system" },
        ];
      },
    },
    {
      id: "water-mist-flow",
      name: "Water Mist Nozzle Flow Rate",
      group: "Fire Fighting",
      formula: "Q = K × √P",
      variables: [
        { symbol: "Q", label: "Flow rate", unit: "manufacturer-specified unit" },
        { symbol: "K", label: "Nozzle coefficient from the approved manufacturer data" },
        { symbol: "P", label: "Pressure in the unit required by that K-factor", unit: "manufacturer-specified" },
      ],
      source: { code: "Approved water-mist/sprinkler system documentation", detail: "K-factor units and operating range are manufacturer/system specific" },
      note: "Use K and pressure units exactly as specified for the installed nozzle/system. This generic relation is not a substitute for the approved design flow or minimum operating pressure.",
      inputs: [
        { key: "k", label: "Nozzle Coefficient (K)", unit: "", placeholder: "0.07" },
        { key: "p", label: "Pressure (matching K units)", unit: "", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.p < 0) return [{ label: "Error", value: "The pressure cannot be negative" }];
        const q = v.k * Math.sqrt(v.p);
        return [
          { label: "Calculated Flow (Q)", value: q.toFixed(3) },
          { label: "Status", value: "Verify units and operating limits in the manufacturer data" },
        ];
      },
    },
    {
      id: "fire-water-capacity",
      name: "Fire-Water Volume from Entered Flow and Time",
      group: "Fire Fighting",
      formula: "Volume = Q × t × n",
      variables: [
        { symbol: "Q", label: "Entered flow rate per selected pump/stream", unit: "m³/h" },
        { symbol: "t", label: "Entered operating time", unit: "h" },
        { symbol: "n", label: "Number of equal flows included" },
      ],
      source: { code: "SOLAS II-2 / approved fire-main documentation", detail: "Required pump/hydrant capacities are ship-specific" },
      note: "This is a volume conversion, not a SOLAS fire-pump sizing calculation. Required simultaneous jets, pressures and capacities must be taken from the applicable regulation and approved fire-control/system documentation.",
      inputs: [
        { key: "q", label: "Entered Flow Rate (Q)", unit: "m³/h", placeholder: "150" },
        { key: "time", label: "Operating Time (t)", unit: "min", placeholder: "60" },
        { key: "n", label: "Number of Equal Flows (n)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const capacity = (v.q / 60) * v.time * v.n;
        return [
          { label: "Calculated Water Volume", value: `${capacity.toFixed(1)} m³` },
          { label: "Status", value: "Reference conversion — not a fire-main compliance result" },
        ];
      },
    },
    {
      id: "escape-time",
      name: "Walking-Time Estimate for an Escape Route",
      group: "Evacuation and Escape",
      formula: "t = L / v",
      variables: [
        { symbol: "t", label: "Idealized walking time", unit: "min" },
        { symbol: "L", label: "Route length", unit: "m" },
        { symbol: "v", label: "Assumed walking speed", unit: "m/s" },
      ],
      source: { code: "Training estimate", detail: "Not a SOLAS evacuation-analysis compliance method" },
      note: "A simple length/speed result omits congestion, doors/ladders, smoke, heel, PPE, mobility, route capacity and many other factors. It must not be compared with a universal 'SOLAS 30 min' limit.",
      inputs: [
        { key: "length", label: "Escape Route Length (L)", unit: "m", placeholder: "120" },
        { key: "speed", label: "Assumed Walking Speed (v)", unit: "m/s", placeholder: "1.2" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Error", value: "The speed must be positive" }];
        const t = v.length / v.speed / 60;
        return [
          { label: "Idealized Walking Time", value: `${t.toFixed(1)} min` },
          { label: "Status", value: "Planning estimate only — no SOLAS compliance conclusion" },
        ];
      },
    },
    {
      id: "risk-matrix",
      name: "Risk Matrix Score",
      group: "Risk Assessment",
      formula: "Risk Score = Likelihood × Severity",
      variables: [
        { symbol: "Likelihood", label: "Entered likelihood rating" },
        { symbol: "Severity", label: "Entered consequence/severity rating" },
        { symbol: "Risk Score", label: "Product of the two entered ratings" },
      ],
      source: { code: "ISM/SMS risk assessment practice", detail: "Matrix scales and acceptance thresholds are defined by the company SMS" },
      note: "The ISM Code does not impose one universal 5×5 matrix or universal 15/8 thresholds. Compare the calculated score only with the matrix and control requirements in the vessel/company SMS.",
      inputs: [
        { key: "p", label: "Likelihood Rating", unit: "SMS scale", placeholder: "3" },
        { key: "s", label: "Severity Rating", unit: "SMS scale", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.p * v.s;
        return [
          { label: "Risk Score", value: `${risk.toFixed(0)}` },
          { label: "Risk Level", value: "Determine from the vessel/company SMS matrix" },
        ];
      },
    },
    {
      id: "lsa-capacity",
      name: "Nominal LSA Capacity Sum",
      group: "Life Saving Appliances",
      formula: "Nominal Sum = (Boat Count × Boat Capacity) + (Raft Count × Raft Capacity)",
      variables: [
        { symbol: "Boat Capacity", label: "Approved persons per entered lifeboat", unit: "persons" },
        { symbol: "Number of Boats", label: "Number included in the arithmetic" },
        { symbol: "Raft Capacity", label: "Approved persons per entered liferaft", unit: "persons" },
        { symbol: "Number of Rafts", label: "Number included in the arithmetic" },
      ],
      source: { code: "SOLAS Chapter III / LSA Code", detail: "Actual carriage arrangements depend on ship type, voyage, arrangement and applicable regulations" },
      note: "Adding nominal capacities does not prove SOLAS compliance. Distribution by side, launching arrangements, survival-craft type, float-free arrangements, rescue boat requirements, persons on board and ship-specific applicability must all be checked.",
      inputs: [
        { key: "boatCap", label: "Lifeboat Capacity", unit: "persons", placeholder: "65" },
        { key: "boatCount", label: "Number of Lifeboats", unit: "", placeholder: "4" },
        { key: "raftCap", label: "Liferaft Capacity", unit: "persons", placeholder: "25" },
        { key: "raftCount", label: "Number of Liferafts", unit: "", placeholder: "6" },
        { key: "pob", label: "Persons on Board", unit: "persons", placeholder: "24" },
      ],
      calculate: (v) => {
        const boatTotal = v.boatCap * v.boatCount;
        const raftTotal = v.raftCap * v.raftCount;
        const total = boatTotal + raftTotal;
        return [
          { label: "Nominal Lifeboat Capacity", value: `${boatTotal.toFixed(0)} persons` },
          { label: "Nominal Liferaft Capacity", value: `${raftTotal.toFixed(0)} persons` },
          { label: "Nominal Capacity Sum", value: `${total.toFixed(0)} persons` },
          { label: "Compared with POB", value: total >= v.pob ? "Nominal sum is at least POB" : "Nominal sum is below POB" },
          { label: "SOLAS Compliance", value: "Not determined by nominal capacity sum alone" },
        ];
      },
    },
    {
      id: "evacuation-time",
      name: "Illustrative Evacuation Throughput Estimate",
      group: "Life Saving Appliances",
      formula: "t = Persons / assumed throughput",
      variables: [
        { symbol: "Persons", label: "Persons included in the estimate", unit: "persons" },
        { symbol: "Throughput", label: "Illustrative assumed rate used by this training example", unit: "persons/min" },
      ],
      source: { code: "Training estimate", detail: "Not a SOLAS/LSA Code compliance formula" },
      note: "The fixed 4 persons/min assumption is only an illustration. Real evacuation performance depends on the approved arrangement, route capacity, embarkation/launching appliances, drill conditions and ship type.",
      inputs: [
        { key: "pob", label: "Persons Included", unit: "persons", placeholder: "24" },
      ],
      calculate: (v) => {
        const assumedRate = 4;
        const t = v.pob / assumedRate;
        return [
          { label: "Illustrative Time at 4 persons/min", value: `${t.toFixed(1)} min` },
          { label: "Status", value: "Training estimate — no regulatory pass/fail conclusion" },
        ];
      },
    },
    {
      id: "fire-water-flow",
      name: "Fire-Water Flow Unit Conversion",
      group: "Fire Fighting",
      formula: "Q(L/min) = Pump Capacity(m³/h) × 1000 / 60",
      variables: [
        { symbol: "Q", label: "Converted water flow rate", unit: "L/min" },
        { symbol: "Pump Capacity", label: "Entered pump capacity", unit: "m³/h" },
      ],
      source: { code: "Unit conversion", detail: "Approved pump performance and fire-main requirements govern" },
      note: "This converts units only. It does not establish whether the pump meets the required capacity or pressure for the vessel.",
      inputs: [
        { key: "cap", label: "Pump Capacity", unit: "m³/h", placeholder: "150" },
      ],
      calculate: (v) => {
        const q = (v.cap * 1000) / 60;
        return [
          { label: "Converted Flow Rate", value: `${q.toFixed(0)} L/min` },
          { label: "Status", value: "Unit conversion only" },
        ];
      },
    },
    {
      id: "mooring-line-load",
      name: "Illustrative Equal-Share Mooring Load",
      group: "Anchoring and Mooring",
      formula: "Illustrative Share = Entered Total Force / Number of Lines",
      variables: [
        { symbol: "Total Force", label: "Entered total force for the illustration", unit: "t" },
        { symbol: "Number of Lines", label: "Number of lines assumed to share load equally" },
        { symbol: "WLL", label: "Entered line working/load limit reference", unit: "t" },
      ],
      source: { code: "Mooring training example", detail: "Operational mooring analysis must follow the ship's mooring arrangement/management plan and applicable industry guidance" },
      note: "Real mooring loads are not shared equally between lines. Lead angle, elasticity, pretension, line type, winch brake setting, environmental loads, geometry and line condition all matter. The result must never be used to declare a mooring arrangement 'safe'.",
      inputs: [
        { key: "force", label: "Illustrative Total Force", unit: "t", placeholder: "100" },
        { key: "lines", label: "Number of Lines", unit: "", placeholder: "6" },
        { key: "wll", label: "Entered Line Limit Reference", unit: "t", placeholder: "17" },
      ],
      calculate: (v) => {
        if (v.lines <= 0) return [{ label: "Error", value: "The number of lines must be positive" }];
        const load = v.force / v.lines;
        const ratio = load > 0 ? v.wll / load : 0;
        return [
          { label: "Equal-Share Illustration", value: `${load.toFixed(2)} t/line` },
          { label: "Entered Limit / Share Ratio", value: ratio.toFixed(2) },
          { label: "Operational Status", value: "Not determined — use vessel-specific mooring analysis" },
        ];
      },
    },
    {
      id: "freeboard-check",
      name: "Depth − Draft Geometric Difference",
      group: "Load Line and Freeboard",
      formula: "Geometric Difference = Entered Depth − Entered Draft",
      variables: [
        { symbol: "Depth", label: "Entered vessel depth reference", unit: "m" },
        { symbol: "Draft", label: "Entered draft reference", unit: "m" },
      ],
      source: { code: "Geometry only", detail: "ICLL assigned freeboard is not established by this subtraction alone" },
      note: "Depth minus draft can be useful as a simple geometric check only when reference points are consistent. Statutory assigned freeboard is defined by the Load Line Convention and the ship's Load Line Certificate/marks, corrections and reference lines.",
      inputs: [
        { key: "depth", label: "Entered Depth", unit: "m", placeholder: "18" },
        { key: "draft", label: "Entered Draft", unit: "m", placeholder: "8.5" },
      ],
      calculate: (v) => {
        const fb = (v.depth - v.draft) * 1000;
        return [
          { label: "Depth − Draft Difference", value: `${fb.toFixed(0)} mm` },
          { label: "Load Line Compliance", value: "Not determined by this subtraction" },
        ];
      },
    },
    {
      id: "fire-fighting-categories",
      name: "Fire Class Reference",
      group: "Risk Assessment",
      formula: "A: solids, B: liquids, C: gases, D: metals, F: cooking oils/fats",
      variables: [
        { symbol: "A", label: "Solid combustibles" },
        { symbol: "B", label: "Flammable liquids" },
        { symbol: "C", label: "Flammable gases" },
        { symbol: "D", label: "Combustible metals" },
        { symbol: "F", label: "Cooking oils and fats" },
      ],
      source: { code: "Approved extinguisher/fire-control documentation", detail: "Classification and agent suitability must match the extinguisher approval/label and ship arrangement" },
      note: "Electrical equipment is an ignition/electrical hazard, not automatically 'Class C' under the common A/B/C/D/F classification. For energized electrical equipment use only an extinguishing agent/equipment approved as suitable and follow the vessel's fire-control procedures.",
      inputs: [
        { key: "cls", label: "Fire Class (1=A, 2=B, 3=C, 4=D, 5=F)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const map: Record<number, { name: string; guidance: string }> = {
          1: { name: "A — Solid combustibles", guidance: "Use only an extinguisher approved/labeled for Class A and the specific location" },
          2: { name: "B — Flammable liquids", guidance: "Use only an extinguisher approved/labeled for Class B and the specific liquid/location" },
          3: { name: "C — Flammable gases", guidance: "Gas-supply isolation is critical; use the vessel's approved agent/procedure" },
          4: { name: "D — Combustible metals", guidance: "Requires a metal-specific approved extinguishing medium/procedure" },
          5: { name: "F — Cooking oils/fats", guidance: "Use the approved galley cooking-oil extinguishing medium/system" },
        };
        const sel = map[Math.round(v.cls)];
        if (!sel) return [{ label: "Error", value: "The class must be between 1 and 5" }];
        return [
          { label: "Fire Class", value: sel.name },
          { label: "Operational Guidance", value: sel.guidance },
        ];
      },
    },
  ],
};
