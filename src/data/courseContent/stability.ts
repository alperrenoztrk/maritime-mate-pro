import { Ship } from "lucide-react";
import {
  angleOfLoll,
  dockingUpthrust,
  fsmRectangular,
  gzFromKn,
  heelFromShift,
  rollingPeriodIsCode,
  shiftOfG,
  suspendedWeightRise,
} from "@/lib/calc/stability";
import type { CourseTopic } from "./types";

/**
 * Stability — single source course content.
 * Real formulas (IMO IS Code / SOLAS / Grain Code) and the calculators LINKED to
 * them in a single list. The calculators delegate to the tested engine in
 * `src/lib/calc/stability.ts`, so the formula text, these cards and the Tools
 * pages use exactly the same mathematics.
 */
export const stability: CourseTopic = {
  key: "stability",
  title: "Stabilite",
  icon: Ship,
  accent: "from-blue-500 via-indigo-500 to-blue-600",
  group: "deck",
  intro:
    "Transverse/longitudinal equilibrium, free surface effect and IMO stability criteria. " +
    "Each formula is followed by the tool that calculates it.",
  advancedTool: { label: "Advanced Stability Tools", href: "/stability/calculations" },
  entries: [
    {
      id: "gm",
      name: "Metacentric Height (GM)",
      group: "Transverse Equilibrium",
      formula: "GM = KM − KG",
      variables: [
        { symbol: "KM", label: "Height from keel to metacentre", unit: "m" },
        { symbol: "KG", label: "Height from keel to centre of gravity, corrected for free surface", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "MSC.267(85), Part A 2.2.4" },
      inputs: [
        { key: "km", label: "KM", unit: "m", placeholder: "8.5" },
        { key: "kg", label: "KG (fluid)", unit: "m", placeholder: "7.2", help: "KG corrected for free surface (KG + ΣFSM/Δ)." },
      ],
      calculate: (v) => {
        const gm = v.km - v.kg;
        const status = gm >= 0.15 ? "Meets IS Code minimum GM0 (≥ 0.15 m)" : gm > 0 ? "Below IS Code minimum GM0 (0.15 m)" : gm === 0 ? "Zero GM — neutral equilibrium" : "Negative GM — unstable when upright";
        return [
          { label: "GM", value: `${gm.toFixed(3)} m` },
          { label: "Status", value: status },
        ];
      },
    },
    {
      id: "gz-small",
      name: "Righting Lever (Small Angle)",
      group: "Transverse Equilibrium",
      formula: "GZ = GM · sin θ",
      variables: [
        { symbol: "GM", label: "Metacentric height", unit: "m" },
        { symbol: "θ", label: "Heel angle (< ~15°)", unit: "°" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Small angle approximation" },
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const gz = v.gm * Math.sin((v.theta * Math.PI) / 180);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "gz-kn",
      name: "Righting Lever (KN Curves)",
      group: "Transverse Equilibrium",
      formula: "GZ = KN − KG · sin θ",
      variables: [
        { symbol: "KN", label: "Cross curve value", unit: "m" },
        { symbol: "KG", label: "Height of centre of gravity", unit: "m" },
        { symbol: "θ", label: "Heel angle", unit: "°" },
      ],
      source: { code: "IMO IS Code 2008", detail: "MSC.267(85), 2.2" },
      inputs: [
        { key: "kn", label: "KN", unit: "m", placeholder: "3.2" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "30" },
      ],
      calculate: (v) => {
        const gz = gzFromKn(v.kn, v.kg, v.theta);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "gm-shift",
      name: "GM Change from Weight Shift",
      group: "Transverse Equilibrium",
      formula: "ΔGM = (w × d) / Δ",
      variables: [
        { symbol: "w", label: "Shifted weight", unit: "t" },
        { symbol: "d", label: "Vertical shift distance", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Weight movement effect" },
      inputs: [
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "50" },
        { key: "d", label: "Shift Distance (d)", unit: "m", placeholder: "4" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dgm = shiftOfG(v.w, v.d, v.disp);
        return [{ label: "ΔGM (GG₁)", value: `${dgm.toFixed(4)} m` }];
      },
    },
    {
      id: "list-shift",
      name: "Heel Angle from Transverse Shift",
      group: "Transverse Equilibrium",
      formula: "tan θ = (w × y) / (Δ × GM)",
      variables: [
        { symbol: "w", label: "Shifted weight", unit: "t" },
        { symbol: "y", label: "Transverse shift distance", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GM", label: "Metacentric height", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Fixed weight heel relation" },
      inputs: [
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "80" },
        { key: "y", label: "Transverse Distance (y)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        if (v.gm <= 0) return [{ label: "Error", value: "GM must be positive for this relation" }];
        const theta = heelFromShift(v.w, v.y, v.disp, v.gm);
        return [{ label: "Heel Angle (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
    {
      id: "crane-gm",
      name: "Vertical KG Change with Derrick/Crane",
      group: "Transverse Equilibrium",
      formula: "GG₁ = w × (h_head − h_load) / Δ",
      variables: [
        { symbol: "w", label: "Lifted load", unit: "t" },
        { symbol: "h_head", label: "Derrick head height above keel", unit: "m" },
        { symbol: "h_load", label: "Initial height of the load", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Load lifting effect (KG rise)" },
      inputs: [
        { key: "w", label: "Load (w)", unit: "t", placeholder: "20" },
        { key: "hhook", label: "Derrick Head Height", unit: "m", placeholder: "18" },
        { key: "hload", label: "Load Height", unit: "m", placeholder: "2" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dkg = suspendedWeightRise(v.w, v.hhook, v.hload, v.disp);
        return [{ label: "GG₁ (KG rise)", value: `${dkg.toFixed(4)} m` }];
      },
    },
    {
      id: "angle-of-loll",
      name: "Angle of Loll",
      group: "Transverse Equilibrium",
      formula: "tan φloll = √(2 × |GM| / BM)",
      variables: [
        { symbol: "GM", label: "Initial metacentric height (negative)", unit: "m" },
        { symbol: "BM", label: "Transverse metacentric radius", unit: "m" },
      ],
      source: { code: "Ship stability — wall-sided formula", detail: "GZ = sin φ (GM + ½ BM tan² φ) = 0" },
      note: "Meaningful only when the initial GM is negative; assumes a wall-sided hull in the range.",
      inputs: [
        { key: "gm", label: "GM (negative)", unit: "m", placeholder: "-0.10" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.0", min: 0 },
      ],
      calculate: (v) => {
        if (v.gm >= 0) return [{ label: "Result", value: "GM is not negative: the ship is not at an angle of loll" }];
        if (v.bm <= 0) return [{ label: "Error", value: "BM must be positive" }];
        const loll = angleOfLoll(v.gm, v.bm);
        return [{ label: "Angle of Loll", value: `${loll.toFixed(2)} °` }];
      },
    },
    {
      id: "trim-change",
      name: "Trim Change",
      group: "Longitudinal Equilibrium",
      formula: "ΔTrim (cm) = Total Moment / MCTC",
      variables: [
        { symbol: "Moment", label: "Longitudinal moment causing trim", unit: "t·m" },
        { symbol: "MCTC", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
      ],
      source: { code: "Hydrostatics — trim calculation" },
      inputs: [
        { key: "moment", label: "Trimming Moment", unit: "t·m", placeholder: "1500" },
        { key: "mct", label: "MCTC", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Error", value: "MCTC must be positive" }];
        const trimCm = v.moment / v.mct;
        return [
          { label: "Trim Change", value: `${trimCm.toFixed(1)} cm` },
          { label: "Trim Change", value: `${(trimCm / 100).toFixed(3)} m` },
        ];
      },
    },
    {
      id: "parallel-sinkage",
      name: "Parallel Sinkage/Rise",
      group: "Longitudinal Equilibrium",
      formula: "Sinkage (cm) = w / TPC",
      variables: [
        { symbol: "w", label: "Weight loaded/discharged", unit: "t" },
        { symbol: "TPC", label: "Tonnes per centimetre", unit: "t/cm" },
      ],
      source: { code: "Hydrostatics — TPC relation" },
      inputs: [
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "200" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.tpc <= 0) return [{ label: "Error", value: "TPC must be positive" }];
        const cm = v.w / v.tpc;
        return [{ label: "Parallel Sinkage", value: `${cm.toFixed(1)} cm` }];
      },
    },
    {
      id: "dock-reaction",
      name: "Dry-docking Upthrust (P)",
      group: "Longitudinal Equilibrium",
      formula: "P = MCTC × Trim(cm) / l",
      variables: [
        { symbol: "MCTC", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
        { symbol: "Trim", label: "Initial trim", unit: "cm" },
        { symbol: "l", label: "Distance from the LCF to the after point of contact on the blocks", unit: "m" },
      ],
      source: { code: "Hydrostatics — docking analysis" },
      inputs: [
        { key: "mct", label: "MCTC", unit: "t·m/cm", placeholder: "120" },
        { key: "trim", label: "Trim", unit: "cm", placeholder: "40" },
        { key: "l", label: "Distance (l)", unit: "m", placeholder: "60" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The distance must be positive" }];
        const p = dockingUpthrust(v.mct, v.trim, v.l);
        return [{ label: "Upthrust (P)", value: `${p.toFixed(1)} t` }];
      },
    },
    {
      id: "fsm",
      name: "Free Surface Effect (Rectangular Tank)",
      group: "Free Surface and Hydrostatics",
      formula: "FSM = (L × B³ / 12) × ρ ;  ΔGM = FSM / Δ",
      variables: [
        { symbol: "L", label: "Tank length", unit: "m" },
        { symbol: "B", label: "Tank breadth", unit: "m" },
        { symbol: "ρ", label: "Liquid density", unit: "t/m³" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Free surface correction (FSC)" },
      inputs: [
        { key: "l", label: "Tank Length (L)", unit: "m", placeholder: "12" },
        { key: "b", label: "Tank Breadth (B)", unit: "m", placeholder: "10" },
        { key: "rho", label: "Liquid Density (ρ)", unit: "t/m³", placeholder: "1.0" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        if (v.disp <= 0) return [{ label: "Error", value: "The displacement must be positive" }];
        const fsm = fsmRectangular(v.l, v.b, v.rho);
        const dgm = fsm / v.disp;
        return [
          { label: "FSM", value: `${fsm.toFixed(1)} t·m` },
          { label: "GM Loss (ΔGM)", value: `${dgm.toFixed(4)} m` },
        ];
      },
    },
    {
      id: "displacement",
      name: "Displacement",
      group: "Free Surface and Hydrostatics",
      formula: "Δ = ρ × ∇",
      variables: [
        { symbol: "ρ", label: "Water density", unit: "t/m³" },
        { symbol: "∇", label: "Underwater volume", unit: "m³" },
      ],
      source: { code: "Archimedes' principle" },
      inputs: [
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.025" },
        { key: "vol", label: "Underwater Volume (∇)", unit: "m³", placeholder: "11700" },
      ],
      calculate: (v) => {
        const disp = v.rho * v.vol;
        return [{ label: "Displacement (Δ)", value: `${disp.toFixed(0)} t` }];
      },
    },
    {
      id: "block-coeff",
      name: "Block Coefficient",
      group: "Free Surface and Hydrostatics",
      formula: "Cb = ∇ / (L × B × T)",
      variables: [
        { symbol: "∇", label: "Underwater volume", unit: "m³" },
        { symbol: "L", label: "Waterline length", unit: "m" },
        { symbol: "B", label: "Breadth", unit: "m" },
        { symbol: "T", label: "Draft", unit: "m" },
      ],
      source: { code: "Hull form — block coefficient definition" },
      inputs: [
        { key: "vol", label: "Volume (∇)", unit: "m³", placeholder: "11700" },
        { key: "l", label: "Length (L)", unit: "m", placeholder: "150" },
        { key: "b", label: "Breadth (B)", unit: "m", placeholder: "22" },
        { key: "t", label: "Draft (T)", unit: "m", placeholder: "8" },
      ],
      calculate: (v) => {
        const denom = v.l * v.b * v.t;
        if (denom <= 0) return [{ label: "Error", value: "L, B and T must be positive" }];
        const cb = v.vol / denom;
        return [{ label: "Block Coefficient (Cb)", value: cb.toFixed(3) }];
      },
    },
    {
      id: "fwa",
      name: "Fresh Water Allowance (FWA)",
      group: "Free Surface and Hydrostatics",
      formula: "FWA (mm) = Δ / (4 × TPC)",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "TPC", label: "Tonnes per centimetre (salt water)", unit: "t/cm" },
      ],
      source: { code: "Load Line / hydrostatics — FWA" },
      note: "The result is in mm (classic FWA relation).",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.tpc <= 0) return [{ label: "Error", value: "TPC must be positive" }];
        const fwa = v.disp / (4 * v.tpc);
        return [{ label: "FWA", value: `${fwa.toFixed(1)} mm` }];
      },
    },
    {
      id: "roll-period",
      name: "Rolling Period",
      group: "Free Surface and Hydrostatics",
      formula: "T = 2 × C × B / √GM ;  C = 0.373 + 0.023 (B/d) − 0.043 (Lwl/100)",
      variables: [
        { symbol: "B", label: "Moulded breadth", unit: "m" },
        { symbol: "d", label: "Mean moulded draft", unit: "m" },
        { symbol: "Lwl", label: "Waterline length", unit: "m" },
        { symbol: "GM", label: "Metacentric height corrected for free surface", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "MSC.267(85), Part A 2.3.4" },
      inputs: [
        { key: "b", label: "Breadth (B)", unit: "m", placeholder: "22", min: 0 },
        { key: "d", label: "Mean Draft (d)", unit: "m", placeholder: "8", min: 0 },
        { key: "lwl", label: "Waterline Length (Lwl)", unit: "m", placeholder: "150", min: 0 },
        { key: "gm", label: "GM (fluid)", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        if (v.gm <= 0 || v.b <= 0 || v.d <= 0) return [{ label: "Error", value: "GM, B and d must be positive" }];
        const { c, period } = rollingPeriodIsCode(v.b, v.d, v.lwl, v.gm);
        return [
          { label: "Coefficient (C)", value: c.toFixed(4) },
          { label: "Rolling Period (T)", value: `${period.toFixed(1)} s` },
        ];
      },
    },
    {
      id: "mmm-draft",
      name: "MMM Draft (Draft Survey)",
      group: "Draft Survey",
      formula: "MMM = (dF + dA + 6 × dM) / 8",
      variables: [
        { symbol: "dF", label: "Forward draft", unit: "m" },
        { symbol: "dA", label: "Aft draft", unit: "m" },
        { symbol: "dM", label: "Midships draft", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Mean of means (quarter mean)" },
      inputs: [
        { key: "df", label: "Forward Draft (dF)", unit: "m", placeholder: "7.80" },
        { key: "da", label: "Aft Draft (dA)", unit: "m", placeholder: "8.20" },
        { key: "dm", label: "Midships Draft (dM)", unit: "m", placeholder: "8.00" },
      ],
      calculate: (v) => {
        const mmm = (v.df + v.da + 6 * v.dm) / 8;
        return [{ label: "MMM Draft", value: `${mmm.toFixed(3)} m` }];
      },
    },
    {
      id: "density-correction",
      name: "Density Correction",
      group: "Draft Survey",
      formula: "Δρ = ((ρ / 1.025) − 1) × Δ",
      variables: [
        { symbol: "ρ", label: "Dock water density", unit: "t/m³" },
        { symbol: "Δ", label: "Salt water displacement", unit: "t" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Density correction" },
      inputs: [
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.012" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const corr = (v.rho / 1.025 - 1) * v.disp;
        return [{ label: "Density Correction (Δρ)", value: `${corr.toFixed(1)} t` }];
      },
    },
    {
      id: "grain-heel",
      name: "Grain Heeling Angle",
      group: "SOLAS Criteria",
      formula: "θ = (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Grain heeling moment", unit: "t·m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GM", label: "Corrected GM", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "SOLAS Chapter VI" },
      note: "Small-angle estimate only. Compliance with Grain Code A 7 (heel ≤ 12° or deck edge, residual area, GM) must be checked on the GZ curve — use Tools → Grain Stability.",
      inputs: [
        { key: "ghm", label: "Grain Heeling Moment (GHM)", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Error", value: "Δ and GM must be positive" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        return [{ label: "Approximate Heeling Angle (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
    {
      id: "simpson-area",
      name: "Area by Simpson's Rule",
      group: "SOLAS Criteria",
      formula: "A = (h/3) · (y₀ + 4y₁ + 2y₂ + … + yₙ)",
      variables: [
        { symbol: "h", label: "Equal spacing between ordinates" },
        { symbol: "yᵢ", label: "Ordinate values (e.g. GZ)" },
      ],
      source: { code: "Numerical integration (area under the GZ curve)" },
      note: "Simpson's first rule with 5 equally spaced ordinates (y₀…y₄): A = (h/3)·(y₀ + 4y₁ + 2y₂ + 4y₃ + y₄).",
      inputs: [
        { key: "h", label: "Spacing (h)", unit: "", placeholder: "0.2" },
        { key: "y0", label: "Ordinate y₀", unit: "", placeholder: "0" },
        { key: "y1", label: "Ordinate y₁", unit: "", placeholder: "0.15" },
        { key: "y2", label: "Ordinate y₂", unit: "", placeholder: "0.28" },
        { key: "y3", label: "Ordinate y₃", unit: "", placeholder: "0.33" },
        { key: "y4", label: "Ordinate y₄", unit: "", placeholder: "0.30" },
      ],
      calculate: (v) => {
        if (v.h <= 0) return [{ label: "Error", value: "Spacing (h) must be positive" }];
        const area = (v.h / 3) * (v.y0 + 4 * v.y1 + 2 * v.y2 + 4 * v.y3 + v.y4);
        return [{ label: "Area (A)", value: area.toFixed(4) }];
      },
    },
    // ---- Calculators added from the topic text ----
    {
      id: "km",
      name: "Metacentre Height (KM)",
      group: "Free Surface and Hydrostatics",
      formula: "KM = KB + BM",
      variables: [
        { symbol: "KB", label: "Height from keel to centre of buoyancy", unit: "m" },
        { symbol: "BM", label: "Metacentric radius (BM = I/∇)", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — metacentre height" },
      inputs: [
        { key: "kb", label: "KB", unit: "m", placeholder: "4.3" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.2" },
      ],
      calculate: (v) => {
        const km = v.kb + v.bm;
        return [{ label: "KM", value: `${km.toFixed(3)} m` }];
      },
    },
    {
      id: "tpc",
      name: "Tonnes Per Centimetre (TPC)",
      group: "Free Surface and Hydrostatics",
      formula: "TPC = Awp × ρ / 100",
      variables: [
        { symbol: "Awp", label: "Waterplane area", unit: "m²" },
        { symbol: "ρ", label: "Water density", unit: "t/m³" },
      ],
      source: { code: "Ship hydrostatics — TPC definition" },
      note: "The tonnage required for a 1 cm change of draft.",
      inputs: [
        { key: "awp", label: "Waterplane Area (Awp)", unit: "m²", placeholder: "2400" },
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.025" },
      ],
      calculate: (v) => {
        const tpc = (v.awp * v.rho) / 100;
        return [{ label: "TPC", value: `${tpc.toFixed(2)} t/cm` }];
      },
    },
    {
      id: "dwa",
      name: "Dock Water Allowance (DWA)",
      group: "Free Surface and Hydrostatics",
      formula: "DWA = FWA × (1025 − ρ) / 25",
      variables: [
        { symbol: "FWA", label: "Fresh water allowance", unit: "mm" },
        { symbol: "ρ", label: "Harbour/dock water density", unit: "kg/m³" },
      ],
      source: { code: "Load Line — dock water correction" },
      note: "ρ is entered in kg/m³ (1000–1025). The result is in mm.",
      inputs: [
        { key: "fwa", label: "FWA", unit: "mm", placeholder: "200" },
        { key: "rho", label: "Dock Water Density (ρ)", unit: "kg/m³", placeholder: "1012" },
      ],
      calculate: (v) => {
        const dwa = (v.fwa * (1025 - v.rho)) / 25;
        return [{ label: "DWA", value: `${dwa.toFixed(1)} mm` }];
      },
    },
    {
      id: "volume-displacement",
      name: "Volumetric Displacement and Buoyancy Force",
      group: "Free Surface and Hydrostatics",
      formula: "∇ = Δ / ρ ;  Y = ρ × g × ∇",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "ρ", label: "Water density", unit: "t/m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "Archimedes' principle" },
      note: "The buoyancy force is given in kN (Y = ρ·g·∇, g = 9.81 m/s²).",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.025" },
      ],
      calculate: (v) => {
        if (v.rho <= 0) return [{ label: "Error", value: "Density must be positive" }];
        const vol = v.disp / v.rho;
        const buoyancy = v.rho * 9.81 * vol; // t·m/s² = kN
        return [
          { label: "Underwater Volume (∇)", value: `${vol.toFixed(1)} m³` },
          { label: "Buoyancy Force (Y)", value: `${buoyancy.toFixed(0)} kN` },
        ];
      },
    },
    {
      id: "fresh-water-disp",
      name: "Displacement at the Same Draft in Fresh Water",
      group: "Free Surface and Hydrostatics",
      formula: "Δfresh = Δsea × (ρfresh / ρsea)",
      variables: [
        { symbol: "Δ_sea", label: "Displacement in sea water at this draft", unit: "t" },
        { symbol: "ρ_sea", label: "Sea water density", unit: "t/m³" },
        { symbol: "ρfresh", label: "Fresh water density", unit: "t/m³" },
      ],
      source: { code: "Ship hydrostatics — density conversion" },
      inputs: [
        { key: "disp", label: "Sea Water Displacement", unit: "t", placeholder: "12000" },
        { key: "rhosea", label: "Sea Water Density", unit: "t/m³", placeholder: "1.025" },
        { key: "rhofresh", label: "Fresh Water Density", unit: "t/m³", placeholder: "1.000" },
      ],
      calculate: (v) => {
        if (v.rhosea <= 0) return [{ label: "Error", value: "Sea water density must be positive" }];
        const disp = v.disp * (v.rhofresh / v.rhosea);
        return [{ label: "Fresh Water Displacement", value: `${disp.toFixed(0)} t` }];
      },
    },
    {
      id: "righting-moment",
      name: "Righting Moment",
      group: "Transverse Equilibrium",
      formula: "MR = Δ × GZ",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GZ", label: "Righting lever", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Righting moment" },
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gz", label: "Righting Lever (GZ)", unit: "m", placeholder: "0.35" },
      ],
      calculate: (v) => {
        const mr = v.disp * v.gz;
        return [{ label: "Righting Moment (MR)", value: `${mr.toFixed(0)} t·m` }];
      },
    },
    {
      id: "wall-sided-gz",
      name: "Large Angle GZ (Wall-sided Formula)",
      group: "Transverse Equilibrium",
      formula: "GZ = sin θ × (GM + ½ × BM × tan²θ)",
      variables: [
        { symbol: "GM", label: "Metacentric height", unit: "m" },
        { symbol: "BM", label: "Metacentric radius", unit: "m" },
        { symbol: "θ", label: "Heel angle", unit: "°" },
      ],
      source: { code: "Ship stability — wall-sided formula" },
      note: "Assumes a wall-sided hull; extends the small angle approximation to moderate angles.",
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "20" },
      ],
      calculate: (v) => {
        const r = (v.theta * Math.PI) / 180;
        const gz = Math.sin(r) * (v.gm + 0.5 * v.bm * Math.tan(r) ** 2);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "new-kg-loading",
      name: "New KG After Loading",
      group: "Transverse Equilibrium",
      formula: "KG₁ = (Δ₀ × KG₀ + w × kg) / (Δ₀ + w)",
      variables: [
        { symbol: "Δ₀", label: "Initial displacement", unit: "t" },
        { symbol: "KG₀", label: "Initial KG", unit: "m" },
        { symbol: "w", label: "Weight loaded (− discharged)", unit: "t" },
        { symbol: "kg", label: "KG of the weight", unit: "m" },
      ],
      source: { code: "Ship stability — moment method (KG)" },
      note: "Enter w as negative when discharging weight.",
      inputs: [
        { key: "disp0", label: "Initial Displacement (Δ₀)", unit: "t", placeholder: "10000" },
        { key: "kg0", label: "Initial KG (KG₀)", unit: "m", placeholder: "7.2" },
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "500" },
        { key: "kg", label: "KG of the Weight (kg)", unit: "m", placeholder: "2.0" },
      ],
      calculate: (v) => {
        const newDisp = v.disp0 + v.w;
        if (newDisp <= 0) return [{ label: "Error", value: "The new displacement must be positive" }];
        const newKg = (v.disp0 * v.kg0 + v.w * v.kg) / newDisp;
        return [
          { label: "New Displacement (Δ₁)", value: `${newDisp.toFixed(0)} t` },
          { label: "New KG (KG₁)", value: `${newKg.toFixed(3)} m` },
        ];
      },
    },
    {
      id: "gml",
      name: "Longitudinal Metacentric Height (GML)",
      group: "Longitudinal Equilibrium",
      formula: "GML = KML − KG",
      variables: [
        { symbol: "KML", label: "Height from keel to the longitudinal metacentre", unit: "m" },
        { symbol: "KG", label: "Height of centre of gravity", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — longitudinal metacentre" },
      inputs: [
        { key: "kml", label: "KML", unit: "m", placeholder: "180" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
      ],
      calculate: (v) => {
        const gml = v.kml - v.kg;
        return [{ label: "GML", value: `${gml.toFixed(2)} m` }];
      },
    },
    {
      id: "bml",
      name: "Longitudinal Metacentric Radius (BML)",
      group: "Longitudinal Equilibrium",
      formula: "BML = IL / ∇",
      variables: [
        { symbol: "IL", label: "Longitudinal moment of inertia of the waterplane area", unit: "m⁴" },
        { symbol: "∇", label: "Underwater volume", unit: "m³" },
      ],
      source: { code: "Ship hydrostatics — longitudinal metacentric radius" },
      inputs: [
        { key: "il", label: "Longitudinal Moment of Inertia (IL)", unit: "m⁴", placeholder: "2100000" },
        { key: "vol", label: "Underwater Volume (∇)", unit: "m³", placeholder: "11700" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Error", value: "The volume must be positive" }];
        const bml = v.il / v.vol;
        return [{ label: "BML", value: `${bml.toFixed(2)} m` }];
      },
    },
    {
      id: "mct",
      name: "Moment to Change Trim 1 cm (MCTC)",
      group: "Longitudinal Equilibrium",
      formula: "MCTC = (Δ × GML) / (100 × L)",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GML", label: "Longitudinal metacentric height", unit: "m" },
        { symbol: "L", label: "Hull length (LBP)", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — MCTC" },
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gml", label: "GML", unit: "m", placeholder: "172" },
        { key: "l", label: "Hull Length (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The length must be positive" }];
        const mct = (v.disp * v.gml) / (100 * v.l);
        return [{ label: "MCTC", value: `${mct.toFixed(1)} t·m/cm` }];
      },
    },
    {
      id: "trim-from-lcg",
      name: "Trim from LCG/LCB",
      group: "Longitudinal Equilibrium",
      formula: "Trimming moment = Δ × (LCG − LCB) ;  Trim = Moment / MCTC",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "LCG", label: "Longitudinal centre of gravity (from aft)", unit: "m" },
        { symbol: "LCB", label: "Longitudinal centre of buoyancy (from aft)", unit: "m" },
        { symbol: "MCTC", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
      ],
      source: { code: "Ship hydrostatics — trim calculation" },
      note: "A positive result means trim by the head, a negative result means trim by the stern.",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "lcg", label: "LCG", unit: "m", placeholder: "75.5" },
        { key: "lcb", label: "LCB", unit: "m", placeholder: "75.0" },
        { key: "mct", label: "MCTC", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Error", value: "MCTC must be positive" }];
        const moment = v.disp * (v.lcg - v.lcb);
        const trimCm = moment / v.mct;
        return [
          { label: "Trimming Moment", value: `${moment.toFixed(0)} t·m` },
          { label: "Trim", value: `${trimCm.toFixed(1)} cm (${(trimCm / 100).toFixed(3)} m)` },
        ];
      },
    },
    {
      id: "trim-distribution",
      name: "Trim Distribution (Forward/Aft Draft Change)",
      group: "Longitudinal Equilibrium",
      formula: "ΔTA = ΔTrim × da/L ;  ΔTF = ΔTrim × df/L",
      variables: [
        { symbol: "ΔTrim", label: "Total trim change", unit: "cm" },
        { symbol: "df", label: "Distance from the LCF to the forward perpendicular", unit: "m" },
        { symbol: "da", label: "Distance from the LCF to the aft perpendicular", unit: "m" },
        { symbol: "L", label: "Hull length (LBP)", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — trim distribution (LCF)" },
      note: "The trim change is distributed to the forward/aft drafts about the LCF.",
      inputs: [
        { key: "dtrim", label: "Trim Change (ΔTrim)", unit: "cm", placeholder: "30" },
        { key: "df", label: "LCF–Forward Distance (df)", unit: "m", placeholder: "72" },
        { key: "da", label: "LCF–Aft Distance (da)", unit: "m", placeholder: "78" },
        { key: "l", label: "Hull Length (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The length must be positive" }];
        const dtf = (v.dtrim * v.df) / v.l;
        const dta = (v.dtrim * v.da) / v.l;
        return [
          { label: "Forward Draft Change (ΔTF)", value: `${dtf.toFixed(2)} cm` },
          { label: "Aft Draft Change (ΔTA)", value: `${dta.toFixed(2)} cm` },
        ];
      },
    },
    {
      id: "weight-for-trim",
      name: "Weight Required for a Desired Trim",
      group: "Longitudinal Equilibrium",
      formula: "w = (ΔTrim × MCTC) / d",
      variables: [
        { symbol: "ΔTrim", label: "Desired trim change", unit: "cm" },
        { symbol: "MCTC", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
        { symbol: "d", label: "Longitudinal distance from the weight to the LCF", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — weight shift for trim" },
      inputs: [
        { key: "dtrim", label: "Desired Trim (ΔTrim)", unit: "cm", placeholder: "20" },
        { key: "mct", label: "MCTC", unit: "t·m/cm", placeholder: "120" },
        { key: "d", label: "Distance (d)", unit: "m", placeholder: "40" },
      ],
      calculate: (v) => {
        if (v.d <= 0) return [{ label: "Error", value: "The distance must be positive" }];
        const w = (v.dtrim * v.mct) / v.d;
        return [{ label: "Weight to Shift/Load (w)", value: `${w.toFixed(1)} t` }];
      },
    },
    {
      id: "gm-from-roll",
      name: "GM from the Rolling Period",
      group: "Free Surface and Hydrostatics",
      formula: "GM ≈ (f × B / T)²",
      variables: [
        { symbol: "f", label: "Rolling coefficient (≈0.7–0.8, equals 2C of the IS Code)" },
        { symbol: "B", label: "Breadth", unit: "m" },
        { symbol: "T", label: "Rolling period", unit: "s" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Inverse of T = 2CB/√GM (2C ≈ 0.7–0.8)" },
      note: "Approximate GM estimate from the observed rolling period (rolling test).",
      inputs: [
        { key: "c", label: "Rolling Coefficient (f)", unit: "", placeholder: "0.7" },
        { key: "b", label: "Breadth (B)", unit: "m", placeholder: "22" },
        { key: "t", label: "Rolling Period (T)", unit: "s", placeholder: "14" },
      ],
      calculate: (v) => {
        if (v.t <= 0) return [{ label: "Error", value: "The period must be positive" }];
        const gm = ((v.c * v.b) / v.t) ** 2;
        return [{ label: "Approximate GM", value: `${gm.toFixed(3)} m` }];
      },
    },
    {
      id: "log-decrement",
      name: "Logarithmic Decrement and Damping Ratio",
      group: "Free Surface and Hydrostatics",
      formula: "δ = ln(θ₁ / θ₂) ;  ζ ≈ δ / (2π)",
      variables: [
        { symbol: "θ₁", label: "First of the successive roll amplitudes", unit: "°" },
        { symbol: "θ₂", label: "Next roll amplitude", unit: "°" },
      ],
      source: { code: "Roll damping — logarithmic decrement" },
      inputs: [
        { key: "a1", label: "First Amplitude (θ₁)", unit: "°", placeholder: "12" },
        { key: "a2", label: "Next Amplitude (θ₂)", unit: "°", placeholder: "9" },
      ],
      calculate: (v) => {
        if (v.a1 <= 0 || v.a2 <= 0) return [{ label: "Error", value: "The amplitudes must be positive" }];
        const delta = Math.log(v.a1 / v.a2);
        const zeta = delta / (2 * Math.PI);
        return [
          { label: "Logarithmic Decrement (δ)", value: delta.toFixed(4) },
          { label: "Damping Ratio (ζ)", value: zeta.toFixed(4) },
        ];
      },
    },
    {
      id: "weather-criterion",
      name: "Weather Criterion Wind Heeling Levers",
      group: "SOLAS Criteria",
      formula: "lw1 = (P × A × Z) / (1000 × g × Δ) ;  lw2 = 1.5 × lw1",
      variables: [
        { symbol: "P", label: "Wind pressure (≈504 Pa)", unit: "Pa" },
        { symbol: "A", label: "Lateral windage area", unit: "m²" },
        { symbol: "Z", label: "Vertical distance between the centroid of the area and ½ draft", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Weather criterion, 2.3" },
      note: "lw1 is the steady wind heeling lever, lw2 is the gust heeling lever.",
      inputs: [
        { key: "p", label: "Wind Pressure (P)", unit: "Pa", placeholder: "504" },
        { key: "a", label: "Lateral Area (A)", unit: "m²", placeholder: "1200" },
        { key: "z", label: "Vertical Distance (Z)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        if (v.disp <= 0) return [{ label: "Error", value: "The displacement must be positive" }];
        const lw1 = (v.p * v.a * v.z) / (1000 * 9.81 * v.disp);
        const lw2 = 1.5 * lw1;
        return [
          { label: "Steady Wind Lever (lw1)", value: `${lw1.toFixed(4)} m` },
          { label: "Gust Wind Lever (lw2)", value: `${lw2.toFixed(4)} m` },
        ];
      },
    },
    {
      id: "flooding-rate",
      name: "Flooding Rate and Time for a Damaged Compartment",
      group: "SOLAS Criteria",
      formula: "Q = A × C × √(2gh) ;  t = V / Q",
      variables: [
        { symbol: "A", label: "Hole/opening area", unit: "m²" },
        { symbol: "C", label: "Discharge coefficient (≈0.6)" },
        { symbol: "h", label: "Water head (pressure head)", unit: "m" },
        { symbol: "V", label: "Volume to be flooded", unit: "m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "Damage stability — Torricelli flow relation" },
      inputs: [
        { key: "a", label: "Opening Area (A)", unit: "m²", placeholder: "0.5" },
        { key: "c", label: "Discharge Coefficient (C)", unit: "", placeholder: "0.6" },
        { key: "h", label: "Water Head (h)", unit: "m", placeholder: "4" },
        { key: "vol", label: "Volume to be Flooded (V)", unit: "m³", placeholder: "300" },
      ],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Error", value: "The water head cannot be negative" }];
        const q = v.a * v.c * Math.sqrt(2 * 9.81 * v.h);
        if (q <= 0) return [{ label: "Error", value: "Flow rate is zero" }];
        const t = v.vol / q;
        return [
          { label: "Flooding Rate (Q)", value: `${q.toFixed(3)} m³/s` },
          { label: "Flooding Time (t)", value: `${t.toFixed(0)} s (${(t / 60).toFixed(1)} min)` },
        ];
      },
    },
  ],
};
