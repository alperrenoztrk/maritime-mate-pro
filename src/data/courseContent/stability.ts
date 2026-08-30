import { Ship } from "lucide-react";
import { HydrostaticCalculations } from "@/services/hydrostaticCalculations";
import type { CourseTopic } from "./types";

/**
 * Stability — educational/reference course content.
 *
 * Formula tools support training and transparent arithmetic. They do not replace
 * the vessel's approved stability booklet/loading computer, Grain Loading Manual,
 * class/Administration requirements or the complete applicable IMO criteria.
 */
export const stability: CourseTopic = {
  key: "stability",
  title: "Stabilite",
  icon: Ship,
  accent: "from-blue-500 via-indigo-500 to-blue-600",
  group: "deck",
  intro:
    "Transverse/longitudinal equilibrium, free surface effect and IMO stability reference calculations. " +
    "Full loading-condition compliance must be verified with the vessel's approved stability information.",
  advancedTool: { label: "Advanced Stability Tools", href: "/stability/calculations" },
  entries: [
    {
      id: "gm",
      name: "Metacentric Height (GM)",
      group: "Transverse Equilibrium",
      formula: "GM = KM − KG",
      variables: [
        { symbol: "KM", label: "Height from keel to metacentre", unit: "m" },
        { symbol: "KG", label: "Height from keel to centre of gravity", unit: "m" },
      ],
      source: { code: "IMO 2008 IS Code", detail: "Initial GM is only one part of the applicable stability criteria" },
      note: "A positive or numerically large GM does not by itself establish a compliant or safe loading condition. GZ-area/lever criteria, downflooding, weather criterion, free-surface corrections and ship-specific approved limits must also be checked.",
      inputs: [
        { key: "km", label: "KM", unit: "m", placeholder: "8.5" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
      ],
      calculate: (v) => {
        const gm = v.km - v.kg;
        const indicator = gm <= 0
          ? "Non-positive initial GM indicated — investigate the loading condition immediately"
          : "Positive initial GM indicated — verify the complete approved stability criteria";
        return [
          { label: "GM", value: `${gm.toFixed(3)} m` },
          { label: "Initial GM Indicator", value: indicator },
          { label: "Compliance", value: "Not determined from GM alone" },
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
      source: { code: "Ship stability", detail: "Small-angle approximation" },
      note: "Small-angle approximation only. Use the vessel's approved GZ/KN data for actual stability assessment at larger angles.",
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const gz = v.gm * Math.sin((v.theta * Math.PI) / 180);
        return [{ label: "Approximate GZ", value: `${gz.toFixed(3)} m` }];
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
      source: { code: "Ship stability / approved cross curves", detail: "Use KN values applicable to the actual displacement/condition" },
      inputs: [
        { key: "kn", label: "KN", unit: "m", placeholder: "3.2" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "30" },
      ],
      calculate: (v) => {
        const gz = HydrostaticCalculations.calculateGZFromKN(v.kn, v.kg, v.theta);
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
      source: { code: "Ship stability", detail: "Vertical weight-shift moment relation" },
      inputs: [
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "50" },
        { key: "d", label: "Shift Distance (d)", unit: "m", placeholder: "4" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dgm = HydrostaticCalculations.calculateGG1(v.w, v.d, v.disp);
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
      source: { code: "Ship stability", detail: "Small-angle fixed-weight heel relation" },
      note: "This relation is a simplified small-angle calculation. Use approved stability data for operational loading decisions.",
      inputs: [
        { key: "w", label: "Weight (w)", unit: "t", placeholder: "80" },
        { key: "y", label: "Transverse Distance (y)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const theta = HydrostaticCalculations.calculateListAngleFromShift(v.w, v.y, v.disp, v.gm);
        return [{ label: "Approximate Heel Angle (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
    {
      id: "crane-gm",
      name: "Vertical KG Change with Derrick/Crane",
      group: "Transverse Equilibrium",
      formula: "GG₁ = w × (h_head − h_load) / Δ",
      variables: [
        { symbol: "w", label: "Lifted load", unit: "t" },
        { symbol: "h_head", label: "Davit/derrick head height", unit: "m" },
        { symbol: "h_load", label: "Initial height of the load", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
      ],
      source: { code: "Ship stability", detail: "Suspended-weight effect" },
      note: "When a weight is suspended, treat its effective centre as the point of suspension for the applicable stability calculation. Verify crane/lifting limits and approved loading data separately.",
      inputs: [
        { key: "w", label: "Load (w)", unit: "t", placeholder: "20" },
        { key: "hhook", label: "Derrick Head Height", unit: "m", placeholder: "18" },
        { key: "hload", label: "Load Height", unit: "m", placeholder: "2" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dkg = HydrostaticCalculations.calculateCraneDeltaKG(v.w, v.hhook, v.hload, v.disp);
        return [{ label: "GG₁ (KG rise)", value: `${dkg.toFixed(4)} m` }];
      },
    },
    {
      id: "angle-of-loll",
      name: "Angle of Loll — Vessel-Specific Determination",
      group: "Transverse Equilibrium",
      formula: "Determine from the actual GZ / cross-curve relationship for the negative-initial-GM condition",
      variables: [
        { symbol: "KG", label: "Height of centre of gravity", unit: "m" },
        { symbol: "KM", label: "Initial transverse metacentre height at the condition", unit: "m" },
      ],
      source: { code: "Ship stability", detail: "Angle of loll occurs after negative initial GM until the hull develops a positive righting lever" },
      note: "There is no general φ = arccos(KG/KM) angle-of-loll formula. KG and KM alone cannot determine the loll angle because KM/GZ varies with heel and hull geometry. Use the vessel's actual GZ/KN/cross-curve data or approved stability software.",
      inputs: [
        { key: "kg", label: "KG", unit: "m", placeholder: "8.6" },
        { key: "km", label: "Initial KM", unit: "m", placeholder: "8.5" },
      ],
      calculate: (v) => {
        const gm = v.km - v.kg;
        if (gm >= 0) {
          return [
            { label: "Initial GM", value: `${gm.toFixed(3)} m` },
            { label: "Assessment", value: "Negative initial GM is not indicated by the entered KG/KM values" },
          ];
        }
        return [
          { label: "Initial GM", value: `${gm.toFixed(3)} m` },
          { label: "Assessment", value: "Negative initial GM indicated" },
          { label: "Angle of Loll", value: "Cannot be calculated from KG and KM alone — use actual GZ/KN data" },
        ];
      },
    },
    {
      id: "trim-change",
      name: "Trim Change",
      group: "Longitudinal Equilibrium",
      formula: "ΔTrim (cm) = Total Moment / MCT",
      variables: [
        { symbol: "Moment", label: "Longitudinal moment causing trim", unit: "t·m" },
        { symbol: "MCT", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
      ],
      source: { code: "Ship hydrostatics — trim calculation" },
      inputs: [
        { key: "moment", label: "Trimming Moment", unit: "t·m", placeholder: "1500" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Error", value: "MCT must be positive" }];
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
      formula: "Draft change (cm) = w / TPC",
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
        return [{ label: "Parallel Draft Change", value: `${cm.toFixed(1)} cm` }];
      },
    },
    {
      id: "dock-reaction",
      name: "Docking Reaction Force on the Hull (P)",
      group: "Longitudinal Equilibrium",
      formula: "P = MCT × Trim(cm) / l",
      variables: [
        { symbol: "MCT", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
        { symbol: "Trim", label: "Initial trim", unit: "cm" },
        { symbol: "l", label: "Distance between LCF and the relevant support/reference point", unit: "m" },
      ],
      source: { code: "Docking hydrostatics", detail: "Simplified initial reaction estimate" },
      note: "Docking is vessel- and dock-plan-specific. Use the approved docking plan and detailed reaction/strength calculations for real operations.",
      inputs: [
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
        { key: "trim", label: "Trim", unit: "cm", placeholder: "40" },
        { key: "l", label: "Distance (l)", unit: "m", placeholder: "60" },
      ],
      calculate: (v) => {
        const p = HydrostaticCalculations.calculateDockReactionP(v.mct, v.trim, v.l);
        return [{ label: "Illustrative Reaction Force (P)", value: `${p.toFixed(1)} t` }];
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
      source: { code: "Ship stability", detail: "Ideal rectangular-tank free-surface moment" },
      note: "Ideal rectangular-tank calculation. For actual loading conditions use the tank's approved free-surface moment/correction data from the stability booklet/loading computer.",
      inputs: [
        { key: "l", label: "Tank Length (L)", unit: "m", placeholder: "12" },
        { key: "b", label: "Tank Breadth (B)", unit: "m", placeholder: "10" },
        { key: "rho", label: "Liquid Density (ρ)", unit: "t/m³", placeholder: "1.0" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const fsm = HydrostaticCalculations.calculateFSMRectangularTank(v.l, v.b, v.rho);
        const dgm = HydrostaticCalculations.calculateDeltaKGFromFSM(fsm, v.disp);
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
        { symbol: "Δ", label: "Displacement at summer load waterline", unit: "t" },
        { symbol: "TPC", label: "Tonnes per centimetre at summer load waterline in salt water", unit: "t/cm" },
      ],
      source: { code: "International Convention on Load Lines / hydrostatics", detail: "Classic FWA relation with the applicable load-line references" },
      note: "Use the vessel's approved hydrostatic/load-line data for statutory loading decisions.",
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
      name: "Rolling Period Estimate",
      group: "Free Surface and Hydrostatics",
      formula: "T ≈ C × B / √GM",
      variables: [
        { symbol: "C", label: "Empirical coefficient/model input" },
        { symbol: "B", label: "Breadth", unit: "m" },
        { symbol: "GM", label: "Metacentric height", unit: "m" },
      ],
      source: { code: "Empirical stability relation", detail: "Coefficient depends on vessel characteristics/method" },
      note: "Approximate teaching/diagnostic relation only. Do not infer statutory GM or stability compliance from roll period alone.",
      inputs: [
        { key: "cb", label: "Coefficient Input", unit: "", placeholder: "0.7" },
        { key: "b", label: "Breadth (B)", unit: "m", placeholder: "22" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const t = HydrostaticCalculations.calculateRollPeriodSimplified(v.cb, v.b, v.gm);
        if (t <= 0) return [{ label: "Error", value: "GM and B must be positive" }];
        return [{ label: "Estimated Rolling Period (T)", value: `${t.toFixed(1)} s` }];
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
      source: { code: "Draft-survey practice", detail: "Mean-of-means approximation; apply actual mark corrections and approved hydrostatics" },
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
      name: "Illustrative Density Effect",
      group: "Draft Survey",
      formula: "Entered relation: Δρ = ((ρ / 1.025) − 1) × Δ",
      variables: [
        { symbol: "ρ", label: "Dock water density", unit: "t/m³" },
        { symbol: "Δ", label: "Reference salt-water displacement", unit: "t" },
      ],
      source: { code: "Draft-survey reference", detail: "Actual displacement correction uses vessel hydrostatics and measured water density" },
      note: "Use the vessel's hydrostatic tables/curves and the accepted draft-survey method for cargo quantity determination; this simplified relation is not a substitute.",
      inputs: [
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.012" },
        { key: "disp", label: "Reference Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const corr = (v.rho / 1.025 - 1) * v.disp;
        return [{ label: "Illustrative Density Difference", value: `${corr.toFixed(1)} t` }];
      },
    },
    {
      id: "grain-heel",
      name: "Approximate Grain Heeling Angle",
      group: "SOLAS Criteria",
      formula: "θ ≈ (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Assumed grain heeling moment", unit: "t·m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GM", label: "Corrected GM used for the approximation", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "Approximation only; approved Grain Loading Manual governs" },
      note: "The Grain Code heel criterion is not the only requirement. The allowable heel is limited by the Code and deck-edge immersion as applicable, and corrected GM plus residual dynamic stability must also be verified using the approved grain calculation.",
      inputs: [
        { key: "ghm", label: "Grain Heeling Moment (GHM)", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "Corrected GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Error", value: "Δ and GM must be positive" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        return [
          { label: "Approximate Heeling Angle (θ)", value: `${theta.toFixed(2)} °` },
          { label: "Grain Compliance", value: "Not determined by this angle estimate alone" },
        ];
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
      source: { code: "Numerical integration", detail: "Area under an equally spaced ordinate set" },
      note: "Simpson's first rule with 5 equally spaced ordinates (y₀…y₄): A = (h/3)·(y₀ + 4y₁ + 2y₂ + 4y₃ + y₄). If integrating a GZ curve using degrees, convert angular spacing to radians before comparing with m·rad stability criteria.",
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
      note: "For actual loading/draft calculations use TPC applicable to the ship's actual draft from approved hydrostatic data where available.",
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
        { symbol: "ρ", label: "Dock water density", unit: "kg/m³" },
      ],
      source: { code: "Load Line / hydrostatics", detail: "Dock-water correction relation" },
      note: "Use the ship's assigned FWA and applicable load-line references for statutory loading decisions.",
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
      formula: "∇ = Δ / ρ ;  F = Δ × g",
      variables: [
        { symbol: "Δ", label: "Displacement mass", unit: "t" },
        { symbol: "ρ", label: "Water density", unit: "t/m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "Archimedes' principle" },
      note: "At static equilibrium buoyancy force equals vessel weight. A tonne-force conversion is represented here as approximately 9.81 kN per tonne.",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "rho", label: "Water Density (ρ)", unit: "t/m³", placeholder: "1.025" },
      ],
      calculate: (v) => {
        if (v.rho <= 0) return [{ label: "Error", value: "Density must be positive" }];
        const vol = v.disp / v.rho;
        const buoyancy = v.disp * 9.81;
        return [
          { label: "Underwater Volume (∇)", value: `${vol.toFixed(1)} m³` },
          { label: "Buoyancy Force", value: `${buoyancy.toFixed(0)} kN` },
        ];
      },
    },
    {
      id: "fresh-water-disp",
      name: "Same Vessel Mass in Different Water Density",
      group: "Free Surface and Hydrostatics",
      formula: "For a fixed ship loading condition, displacement mass remains constant; displaced volume changes as ∇ = Δ / ρ",
      variables: [
        { symbol: "Δ", label: "Ship displacement mass", unit: "t" },
        { symbol: "ρ", label: "Water density", unit: "t/m³" },
      ],
      source: { code: "Archimedes' principle" },
      note: "A ship's mass/displacement in tonnes does not increase simply because it moves from salt water to fresh water. The displaced volume and draft increase in lower-density water. The previous density-ratio formula incorrectly changed vessel mass.",
      inputs: [
        { key: "disp", label: "Ship Displacement Mass", unit: "t", placeholder: "12000" },
        { key: "rhosea", label: "Reference Water Density", unit: "t/m³", placeholder: "1.025" },
        { key: "rhofresh", label: "New Water Density", unit: "t/m³", placeholder: "1.000" },
      ],
      calculate: (v) => {
        if (v.rhosea <= 0 || v.rhofresh <= 0) return [{ label: "Error", value: "Water densities must be positive" }];
        const referenceVolume = v.disp / v.rhosea;
        const newVolume = v.disp / v.rhofresh;
        return [
          { label: "Displacement Mass", value: `${v.disp.toFixed(0)} t (unchanged)` },
          { label: "Reference Displaced Volume", value: `${referenceVolume.toFixed(1)} m³` },
          { label: "New Displaced Volume", value: `${newVolume.toFixed(1)} m³` },
        ];
      },
    },
    {
      id: "righting-moment",
      name: "Righting Moment",
      group: "Transverse Equilibrium",
      formula: "MR = Δ × GZ",
      variables: [
        { symbol: "Δ", label: "Displacement mass", unit: "t" },
        { symbol: "GZ", label: "Righting lever", unit: "m" },
      ],
      source: { code: "Ship stability", detail: "Often expressed as t·m for stability calculations; multiply by g for force-moment units" },
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gz", label: "Righting Lever (GZ)", unit: "m", placeholder: "0.35" },
      ],
      calculate: (v) => {
        const mr = v.disp * v.gz;
        return [{ label: "Righting Moment", value: `${mr.toFixed(0)} t·m` }];
      },
    },
    {
      id: "wall-sided-gz",
      name: "Wall-Sided GZ Approximation",
      group: "Transverse Equilibrium",
      formula: "GZ = sin θ × (GM + ½ × BM × tan²θ)",
      variables: [
        { symbol: "GM", label: "Metacentric height", unit: "m" },
        { symbol: "BM", label: "Metacentric radius", unit: "m" },
        { symbol: "θ", label: "Heel angle", unit: "°" },
      ],
      source: { code: "Ship stability — wall-sided approximation" },
      note: "Valid only where the wall-sided approximation is appropriate. Use approved KN/GZ data rather than this approximation for compliance assessment.",
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.2" },
        { key: "theta", label: "Heel Angle (θ)", unit: "°", placeholder: "20" },
      ],
      calculate: (v) => {
        const r = (v.theta * Math.PI) / 180;
        const gz = Math.sin(r) * (v.gm + 0.5 * v.bm * Math.tan(r) ** 2);
        return [{ label: "Approximate GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "new-kg-loading",
      name: "New KG After Loading/Discharging",
      group: "Transverse Equilibrium",
      formula: "KG₁ = (Δ₀ × KG₀ + w × kg) / (Δ₀ + w)",
      variables: [
        { symbol: "Δ₀", label: "Initial displacement", unit: "t" },
        { symbol: "KG₀", label: "Initial KG", unit: "m" },
        { symbol: "w", label: "Weight loaded (negative if discharged)", unit: "t" },
        { symbol: "kg", label: "KG of the weight", unit: "m" },
      ],
      source: { code: "Ship stability — vertical moment method" },
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
      name: "Moment to Change Trim 1 cm (MCT1cm)",
      group: "Longitudinal Equilibrium",
      formula: "MCT1cm = (Δ × GML) / (100 × L)",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "GML", label: "Longitudinal metacentric height", unit: "m" },
        { symbol: "L", label: "Length between perpendiculars/reference length", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — MCT1cm" },
      note: "For real loading calculations use MCT1cm from the vessel's approved hydrostatic data at the relevant displacement/draft where available.",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "gml", label: "GML", unit: "m", placeholder: "172" },
        { key: "l", label: "Reference Length (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The length must be positive" }];
        const mct = (v.disp * v.gml) / (100 * v.l);
        return [{ label: "MCT1cm", value: `${mct.toFixed(1)} t·m/cm` }];
      },
    },
    {
      id: "trim-from-lcg",
      name: "Trim from LCG/LCB",
      group: "Longitudinal Equilibrium",
      formula: "Trimming moment = Δ × (LCG − LCB) ; Trim = Moment / MCT1cm",
      variables: [
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "LCG", label: "Longitudinal centre of gravity", unit: "m" },
        { symbol: "LCB", label: "Longitudinal centre of buoyancy", unit: "m" },
        { symbol: "MCT", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
      ],
      source: { code: "Ship hydrostatics — trim calculation" },
      note: "Sign convention depends on the selected longitudinal reference and convention. Keep LCG/LCB references consistent with the vessel's hydrostatic data.",
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
        { key: "lcg", label: "LCG", unit: "m", placeholder: "75.5" },
        { key: "lcb", label: "LCB", unit: "m", placeholder: "75.0" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Error", value: "MCT must be positive" }];
        const moment = v.disp * (v.lcg - v.lcb);
        const trimCm = moment / v.mct;
        return [
          { label: "Trimming Moment", value: `${moment.toFixed(0)} t·m` },
          { label: "Trim Change by Entered Convention", value: `${trimCm.toFixed(1)} cm (${(trimCm / 100).toFixed(3)} m)` },
        ];
      },
    },
    {
      id: "trim-distribution",
      name: "Trim Distribution (Forward/Aft Draft Change)",
      group: "Longitudinal Equilibrium",
      formula: "ΔTF = ΔTrim × da/L ; ΔTA = ΔTrim × df/L",
      variables: [
        { symbol: "ΔTrim", label: "Total trim change", unit: "cm" },
        { symbol: "df", label: "Distance from LCF to forward perpendicular", unit: "m" },
        { symbol: "da", label: "Distance from LCF to aft perpendicular", unit: "m" },
        { symbol: "L", label: "Length between perpendiculars", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — trim distribution about LCF" },
      note: "The magnitude is distributed about the LCF; apply the correct sign convention for trim by bow/stern when converting to actual forward/aft drafts.",
      inputs: [
        { key: "dtrim", label: "Trim Change (ΔTrim)", unit: "cm", placeholder: "30" },
        { key: "df", label: "LCF–Forward Distance (df)", unit: "m", placeholder: "72" },
        { key: "da", label: "LCF–Aft Distance (da)", unit: "m", placeholder: "78" },
        { key: "l", label: "LBP (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The length must be positive" }];
        const dtf = (v.dtrim * v.da) / v.l;
        const dta = (v.dtrim * v.df) / v.l;
        return [
          { label: "Forward Share Magnitude", value: `${dtf.toFixed(2)} cm` },
          { label: "Aft Share Magnitude", value: `${dta.toFixed(2)} cm` },
        ];
      },
    },
    {
      id: "weight-for-trim",
      name: "Weight Shift Required for a Desired Trim Change",
      group: "Longitudinal Equilibrium",
      formula: "w = (ΔTrim × MCT1cm) / d",
      variables: [
        { symbol: "ΔTrim", label: "Desired trim change", unit: "cm" },
        { symbol: "MCT", label: "Moment to change trim by 1 cm", unit: "t·m/cm" },
        { symbol: "d", label: "Longitudinal distance through which the weight is shifted", unit: "m" },
      ],
      source: { code: "Ship hydrostatics — weight shift for trim" },
      note: "This relation is for shifting an existing weight longitudinally by distance d. Loading/discharging a weight is a different calculation because it also changes displacement and parallel sinkage/rise.",
      inputs: [
        { key: "dtrim", label: "Desired Trim Change", unit: "cm", placeholder: "20" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
        { key: "d", label: "Shift Distance (d)", unit: "m", placeholder: "40" },
      ],
      calculate: (v) => {
        if (v.d <= 0) return [{ label: "Error", value: "The distance must be positive" }];
        const w = (v.dtrim * v.mct) / v.d;
        return [{ label: "Weight to Shift (w)", value: `${w.toFixed(1)} t` }];
      },
    },
    {
      id: "gm-from-roll",
      name: "Approximate GM from Rolling Period",
      group: "Free Surface and Hydrostatics",
      formula: "GM ≈ (C × B / T)²",
      variables: [
        { symbol: "C", label: "Empirical vessel/method coefficient" },
        { symbol: "B", label: "Breadth", unit: "m" },
        { symbol: "T", label: "Observed rolling period", unit: "s" },
      ],
      source: { code: "Empirical rolling-period method", detail: "Use the coefficient prescribed for the vessel/method if this estimate is used" },
      note: "Approximate indication only. It must not replace an approved inclining/stability calculation or loading-computer result and must not produce a compliance conclusion.",
      inputs: [
        { key: "c", label: "Coefficient (C)", unit: "", placeholder: "0.7" },
        { key: "b", label: "Breadth (B)", unit: "m", placeholder: "22" },
        { key: "t", label: "Rolling Period (T)", unit: "s", placeholder: "14" },
      ],
      calculate: (v) => {
        if (v.t <= 0) return [{ label: "Error", value: "The period must be positive" }];
        const gm = ((v.c * v.b) / v.t) ** 2;
        return [
          { label: "Approximate GM", value: `${gm.toFixed(3)} m` },
          { label: "Status", value: "Empirical estimate only" },
        ];
      },
    },
    {
      id: "log-decrement",
      name: "Logarithmic Decrement and Damping Ratio",
      group: "Free Surface and Hydrostatics",
      formula: "δ = ln(θ₁ / θ₂) ; ζ ≈ δ / (2π)",
      variables: [
        { symbol: "θ₁", label: "First of successive roll amplitudes", unit: "°" },
        { symbol: "θ₂", label: "Next roll amplitude", unit: "°" },
      ],
      source: { code: "Oscillation theory — logarithmic decrement", detail: "Small-damping approximation for ζ" },
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
          { label: "Approximate Damping Ratio (ζ)", value: zeta.toFixed(4) },
        ];
      },
    },
    {
      id: "weather-criterion",
      name: "Weather Criterion — Wind Heeling Lever Components",
      group: "SOLAS Criteria",
      formula: "lw1 = (P × A × Z) / (1000 × g × Δ) ; lw2 = 1.5 × lw1",
      variables: [
        { symbol: "P", label: "Wind pressure selected by the applicable IS Code method", unit: "Pa" },
        { symbol: "A", label: "Projected lateral windage area above waterline", unit: "m²" },
        { symbol: "Z", label: "Applicable vertical lever defined by the Code method", unit: "m" },
        { symbol: "Δ", label: "Displacement", unit: "t" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "IMO 2008 IS Code", detail: "Severe wind and rolling criterion — use the full current method" },
      note: "This computes only wind-heeling lever components from entered inputs. Full weather-criterion compliance additionally requires the prescribed equilibrium/roll angles and GZ/heeling-area comparison (area b ≥ area a), with all applicable corrections and approved ship data.",
      inputs: [
        { key: "p", label: "Applicable Wind Pressure (P)", unit: "Pa", placeholder: "504" },
        { key: "a", label: "Lateral Area (A)", unit: "m²", placeholder: "1200" },
        { key: "z", label: "Vertical Lever (Z)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        if (v.disp <= 0) return [{ label: "Error", value: "The displacement must be positive" }];
        const lw1 = (v.p * v.a * v.z) / (1000 * 9.81 * v.disp);
        const lw2 = 1.5 * lw1;
        return [
          { label: "Steady Wind Lever (lw1)", value: `${lw1.toFixed(4)} m` },
          { label: "Gust Wind Lever (lw2)", value: `${lw2.toFixed(4)} m` },
          { label: "Weather-Criterion Compliance", value: "Not determined by these two lever values alone" },
        ];
      },
    },
    {
      id: "flooding-rate",
      name: "Idealized Flooding Rate and Time",
      group: "SOLAS Criteria",
      formula: "Q = A × C × √(2gh) ; t = V / Q",
      variables: [
        { symbol: "A", label: "Opening area", unit: "m²" },
        { symbol: "C", label: "Assumed discharge coefficient" },
        { symbol: "h", label: "Assumed constant water head", unit: "m" },
        { symbol: "V", label: "Volume to be flooded", unit: "m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9.81 m/s²" },
      ],
      source: { code: "Torricelli/orifice-flow estimate", detail: "Not a SOLAS damage-stability flooding simulation" },
      note: "Idealized constant-head estimate only. Real progressive flooding depends on changing head, compartment geometry, permeability, air escape, cross-flooding, openings, trim/heel and structural damage. Do not use this value for damage-stability survival decisions.",
      inputs: [
        { key: "a", label: "Opening Area (A)", unit: "m²", placeholder: "0.5" },
        { key: "c", label: "Discharge Coefficient (C)", unit: "", placeholder: "0.6" },
        { key: "h", label: "Assumed Water Head (h)", unit: "m", placeholder: "4" },
        { key: "vol", label: "Volume (V)", unit: "m³", placeholder: "300" },
      ],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Error", value: "The water head cannot be negative" }];
        const q = v.a * v.c * Math.sqrt(2 * 9.81 * v.h);
        if (q <= 0) return [{ label: "Error", value: "Flow rate is zero" }];
        const t = v.vol / q;
        return [
          { label: "Idealized Flooding Rate (Q)", value: `${q.toFixed(3)} m³/s` },
          { label: "Idealized Time (t)", value: `${t.toFixed(0)} s (${(t / 60).toFixed(1)} min)` },
          { label: "Damage-Stability Status", value: "Not determined by this estimate" },
        ];
      },
    },
  ],
};
