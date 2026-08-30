import { Anchor } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Seamanship — educational/reference calculations.
 *
 * Mooring, anchoring and towage are strongly vessel/berth/environment dependent.
 * These tools perform transparent arithmetic only and must not issue an
 * operational SAFE/UNSAFE decision. Approved mooring/anchoring plans, line data,
 * tug plans, Master/Pilot orders, terminal rules and the vessel SMS govern.
 */
export const seamanship: CourseTopic = {
  key: "seamanship",
  title: "Gemicilik",
  icon: Anchor,
  accent: "from-emerald-500 via-teal-500 to-blue-500",
  group: "deck",
  defaultClassification: "REFERENCE",
  intro:
    "Mooring, wind/current loads, anchoring geometry, tackle and towage reference calculations. " +
    "Operational limits must be taken from the vessel's approved procedures and equipment data.",
  advancedTool: { label: "Advanced Seamanship Tools", href: "/seamanship/calculations" },
  entries: [
    {
      id: "working-load",
      name: "Illustrative MBL-to-Working-Load Conversion",
      group: "Mooring and Ropes",
      formula: "Illustrative working load = MBL / selected factor",
      variables: [
        { symbol: "MBL", label: "Entered minimum breaking load", unit: "kN" },
        { symbol: "Factor", label: "Selected divisor from the applicable equipment/rope standard" },
      ],
      classification: "REFERENCE",
      source: {
        code: "Equipment/rope manufacturer data and applicable standard",
        detail: "Mooring-line design terminology and allowable loads are system-specific; do not derive a vessel mooring limit from a generic factor",
        authority: ["Manufacturer", "Class", "Company SMS"],
        reviewStatus: "VERIFIED",
        lastReviewed: "2026-08-30",
      },
      note: "The former calculator labelled MBL ÷ a user-entered factor as universal 'SWL'. For mooring systems use the terminology and limits in the approved mooring documentation (for example MBL/MBLsd, line design break force, winch/fitting limits as applicable). This calculator is only a generic ratio conversion.",
      inputs: [
        { key: "mbl", label: "Entered MBL", unit: "kN", placeholder: "300" },
        { key: "sf", label: "Selected Divisor", unit: "", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.mbl <= 0 || v.sf <= 0) return [{ label: "Error", value: "MBL and divisor must be positive" }];
        return [
          { label: "Calculated Ratio Result", value: `${(v.mbl / v.sf).toFixed(2)} kN` },
          { label: "Operational Limit", value: "Not determined — use approved equipment/mooring data" },
        ];
      },
    },
    {
      id: "wind-force",
      name: "Wind Drag Force Estimate",
      group: "Wind and Current",
      formula: "F = ½ρair × Cd × A × V²",
      variables: [
        { symbol: "ρair", label: "Air density used by the estimate", unit: "kg/m³" },
        { symbol: "Cd", label: "Selected drag coefficient" },
        { symbol: "A", label: "Projected area exposed to wind", unit: "m²" },
        { symbol: "V", label: "Wind speed", unit: "m/s" },
      ],
      classification: "LEARN",
      source: { code: "Aerodynamic drag relation", detail: "Actual coefficients and projected areas depend on vessel geometry and wind direction" },
      note: "The default 1.225 kg/m³ is a standard-atmosphere approximation. A generic drag estimate is not a mooring analysis or DP capability calculation.",
      inputs: [
        { key: "rho", label: "Air Density (ρair)", unit: "kg/m³", placeholder: "1.225" },
        { key: "cd", label: "Selected Cd", unit: "", placeholder: "1.0" },
        { key: "a", label: "Projected Area (A)", unit: "m²", placeholder: "500" },
        { key: "v", label: "Wind Speed (V)", unit: "m/s", placeholder: "20" },
      ],
      calculate: (v) => {
        if (v.rho <= 0 || v.cd < 0 || v.a < 0 || v.v < 0) return [{ label: "Error", value: "Inputs must be physically valid" }];
        const f = 0.5 * v.rho * v.cd * v.a * v.v * v.v;
        return [
          { label: "Estimated Wind Force", value: `${(f / 1000).toFixed(1)} kN` },
          { label: "Status", value: "Engineering estimate — not a mooring/DP acceptance result" },
        ];
      },
    },
    {
      id: "catenary-tension",
      name: "Catenary Hyperbolic-Term Calculator",
      group: "Anchoring",
      formula: "Tterm = w × a × sinh(x/a)",
      variables: [
        { symbol: "w", label: "Submerged line/chain weight per unit length", unit: "kN/m" },
        { symbol: "x", label: "Horizontal-coordinate term used by the selected catenary model", unit: "m" },
        { symbol: "a", label: "Catenary parameter H/w", unit: "m" },
      ],
      classification: "LEARN",
      source: { code: "Classical catenary relation", detail: "A complete anchor-chain solution requires boundary conditions, geometry, submerged weight and seabed/contact assumptions" },
      note: "This is a mathematical catenary term, not total anchor-system tension or proof of holding capability. The previous formula omitted the required dimensional factor and labelled W ambiguously.",
      inputs: [
        { key: "w", label: "Submerged Weight per Length (w)", unit: "kN/m", placeholder: "0.5" },
        { key: "x", label: "Horizontal Coordinate (x)", unit: "m", placeholder: "60" },
        { key: "a", label: "Catenary Parameter (a)", unit: "m", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.w < 0 || v.a <= 0) return [{ label: "Error", value: "w must be non-negative and a must be positive" }];
        const term = v.w * v.a * Math.sinh(v.x / v.a);
        return [
          { label: "Catenary Term", value: `${term.toFixed(2)} kN` },
          { label: "Anchor-System Status", value: "Not determined by this term alone" },
        ];
      },
    },
    {
      id: "anchor-holding",
      name: "Anchor Holding-Factor Illustration",
      group: "Anchoring",
      formula: "Illustrative holding value = anchor weight × entered factor",
      variables: [
        { symbol: "Anchor Weight", label: "Anchor mass", unit: "t" },
        { symbol: "Factor", label: "User-entered factor from a verified design/reference source" },
      ],
      classification: "LEARN",
      source: { code: "Anchoring training illustration", detail: "Real holding capacity depends on anchor type, soil/penetration, chain geometry, scope and environmental loading" },
      note: "Do not select a generic seabed coefficient from the app and use the result as an allowable environmental load. Manufacturer/class data and the vessel's anchoring procedure govern.",
      inputs: [
        { key: "weight", label: "Anchor Weight", unit: "t", placeholder: "5" },
        { key: "coeff", label: "Verified/Selected Factor", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        if (v.weight <= 0 || v.coeff <= 0) return [{ label: "Error", value: "Inputs must be positive" }];
        return [
          { label: "Illustrative Product", value: `${(v.weight * v.coeff).toFixed(2)} t-force equivalent` },
          { label: "Holding Capability", value: "Not established by this simple product" },
        ];
      },
    },
    {
      id: "scope",
      name: "Anchor Cable Scope Ratio",
      group: "Anchoring",
      formula: "Scope ratio = cable length / vertical distance from hawse to seabed",
      variables: [
        { symbol: "Cable", label: "Cable length veered", unit: "m" },
        { symbol: "Vertical Distance", label: "Water depth plus hawse/freeboard allowance as applicable", unit: "m" },
      ],
      classification: "REFERENCE",
      source: {
        code: "Vessel anchoring procedure / good seamanship",
        detail: "No universal 5:1 or 7:1 pass/fail threshold applies to every ship and anchorage",
        authority: ["Company SMS", "Master", "Vessel documentation"],
        reviewStatus: "VERIFIED",
        lastReviewed: "2026-08-30",
      },
      note: "The ratio is descriptive only. Required cable depends on anchor/chain, depth, holding ground, swinging room, weather/current/waves and vessel procedure.",
      inputs: [
        { key: "chain", label: "Cable Length", unit: "m", placeholder: "150" },
        { key: "vertical", label: "Vertical Hawse-to-Seabed Distance", unit: "m", placeholder: "33" },
      ],
      calculate: (v) => {
        if (v.vertical <= 0 || v.chain < 0) return [{ label: "Error", value: "Vertical distance must be positive and cable length non-negative" }];
        const scope = v.chain / v.vertical;
        return [
          { label: "Calculated Scope", value: `${scope.toFixed(1)} : 1` },
          { label: "Adequacy", value: "Determine from the actual anchoring plan and conditions" },
        ];
      },
    },
    {
      id: "bollard-pull",
      name: "Tug Bollard-Pull Scenario Input",
      group: "Towage",
      formula: "Required tug force must be derived from the approved manoeuvring/towage assessment",
      variables: [
        { symbol: "Environmental Force", label: "Verified combined force demand from the selected assessment", unit: "kN" },
        { symbol: "Utilization", label: "Selected usable bollard-pull fraction/derating from the towage plan" },
      ],
      classification: "OPERATIONAL",
      source: {
        code: "Port/towage plan, tug provider data and Master-Pilot/Tug Master planning",
        detail: "The previous Δ×V²/K formula was an unsupported generic estimator and has been removed",
        authority: ["Port/Pilotage", "Tug Provider", "Company SMS"],
        reviewStatus: "VERIFIED",
        lastReviewed: "2026-08-30",
      },
      note: "Tug requirement depends on vessel windage/underwater area, wind/current, manoeuvre, berth geometry, tug type/position, indirect/direct mode, available propulsion and local port requirements. This tool only converts an already assessed force demand to an equivalent nominal BP using an entered utilization factor.",
      inputs: [
        { key: "force", label: "Assessed Required Usable Tug Force", unit: "kN", placeholder: "500" },
        { key: "util", label: "Selected Usable Fraction", unit: "0–1", placeholder: "0.8" },
      ],
      calculate: (v) => {
        if (v.force < 0 || v.util <= 0 || v.util > 1) return [{ label: "Error", value: "Force must be non-negative and usable fraction in (0,1]" }];
        const nominalKn = v.force / v.util;
        const nominalTf = nominalKn / 9.80665;
        return [
          { label: "Equivalent Nominal BP from Entered Assumptions", value: `${nominalKn.toFixed(0)} kN (${nominalTf.toFixed(1)} tf)` },
          { label: "Tug Requirement", value: "Not established unless the force demand and derating come from the approved towage assessment" },
        ];
      },
    },
    {
      id: "tackle-mechanical-advantage",
      name: "Tackle Mechanical Advantage",
      group: "Mooring and Ropes",
      formula: "Ideal MA = n ; hauling force ≈ W / (n × η)",
      variables: [
        { symbol: "n", label: "Number of rope parts supporting the moving block" },
        { symbol: "W", label: "Static load", unit: "kN" },
        { symbol: "η", label: "Entered overall efficiency" },
      ],
      classification: "LEARN",
      source: { code: "Elementary tackle mechanics", detail: "Actual equipment SWL/WLL, sheave/rope condition and dynamic factors govern lifting use" },
      note: "Mechanical-advantage arithmetic does not authorize a lift. Verify all blocks, shackles, ropes/wires, padeyes and lifting appliances against certified limits and the lifting plan.",
      inputs: [
        { key: "n", label: "Supporting Parts (n)", unit: "", placeholder: "4" },
        { key: "w", label: "Static Load (W)", unit: "kN", placeholder: "20" },
        { key: "eta", label: "Entered Overall Efficiency (η)", unit: "0–1", placeholder: "0.9" },
      ],
      calculate: (v) => {
        if (v.n <= 0 || v.w < 0 || v.eta <= 0 || v.eta > 1) return [{ label: "Error", value: "Use positive n, non-negative load and efficiency in (0,1]" }];
        const force = v.w / (v.n * v.eta);
        return [
          { label: "Ideal Mechanical Advantage", value: `${v.n.toFixed(0)} : 1` },
          { label: "Estimated Hauling Force", value: `${force.toFixed(2)} kN` },
          { label: "Lift Authorization", value: "Not determined by this calculation" },
        ];
      },
    },
    {
      id: "current-force",
      name: "Current Drag Force Estimate",
      group: "Wind and Current",
      formula: "F = ½ρwater × Cd × A × V²",
      variables: [
        { symbol: "ρwater", label: "Water density", unit: "kg/m³" },
        { symbol: "Cd", label: "Selected hydrodynamic drag coefficient" },
        { symbol: "A", label: "Projected underwater area normal to the current", unit: "m²" },
        { symbol: "V", label: "Current speed relative to vessel", unit: "m/s" },
      ],
      classification: "LEARN",
      source: { code: "Hydrodynamic drag relation", detail: "Actual coefficient and projected area vary with hull geometry, draught, heading and flow" },
      note: "Use as an engineering illustration only. Current loading for mooring, anchoring or DP must be assessed with the applicable vessel/berth model and environmental criteria.",
      inputs: [
        { key: "rho", label: "Water Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "cd", label: "Selected Cd", unit: "", placeholder: "1.0" },
        { key: "a", label: "Projected Underwater Area (A)", unit: "m²", placeholder: "300" },
        { key: "v", label: "Relative Current Speed (V)", unit: "m/s", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.rho <= 0 || v.cd < 0 || v.a < 0 || v.v < 0) return [{ label: "Error", value: "Inputs must be physically valid" }];
        const f = 0.5 * v.rho * v.cd * v.a * v.v * v.v;
        return [
          { label: "Estimated Current Force", value: `${(f / 1000).toFixed(1)} kN` },
          { label: "Status", value: "Engineering estimate — not an operational acceptance result" },
        ];
      },
    },
    {
      id: "required-cable-length",
      name: "Cable Length from a Selected Scope",
      group: "Anchoring",
      formula: "Cable length = selected scope ratio × hawse-to-seabed vertical distance",
      variables: [
        { symbol: "Scope", label: "Scope selected from the vessel's anchoring plan/procedure" },
        { symbol: "Vertical Distance", label: "Water depth plus hawse/freeboard allowance", unit: "m" },
      ],
      classification: "REFERENCE",
      source: { code: "Anchoring geometry", detail: "Selected scope is an operational input, not a universal recommendation from the app" },
      note: "1 standard joining shackle/shot is commonly about 27.5 m, but verify actual cable markings/lengths on board. Required scope must come from the real anchoring assessment.",
      inputs: [
        { key: "scope", label: "Selected Scope Ratio", unit: "", placeholder: "6" },
        { key: "depth", label: "Water Depth", unit: "m", placeholder: "25" },
        { key: "freeboard", label: "Hawse Height / Freeboard Allowance", unit: "m", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.scope <= 0 || v.depth < 0 || v.freeboard < 0) return [{ label: "Error", value: "Scope must be positive; distances cannot be negative" }];
        const vertical = v.depth + v.freeboard;
        if (vertical <= 0) return [{ label: "Error", value: "Total vertical distance must be positive" }];
        const length = v.scope * vertical;
        return [
          { label: "Calculated Cable Length", value: `${length.toFixed(1)} m` },
          { label: "Approximate 27.5 m Shackles", value: `${(length / 27.5).toFixed(1)}` },
          { label: "Adequacy", value: "Depends on the selected scope being valid for the actual anchorage" },
        ];
      },
    },
  ],
};
