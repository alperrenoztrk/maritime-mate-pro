import { Anchor } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Gemicilik — tek kaynak ders içeriği.
 * Formüller mevcut SeamanshipFormulas sayfasındaki gerçek ifadelerden alınmış,
 * hesaplayıcılar bu ifadeleri birebir uygular.
 */
export const seamanship: CourseTopic = {
  key: "seamanship",
  title: "Gemicilik",
  icon: Anchor,
  accent: "from-emerald-500 via-teal-500 to-blue-500",
  group: "deck",
  intro:
    "Mooring load, wind force, chain catenary, anchor holding power and " +
    "tug calculations. Each formula is followed by the tool that calculates it.",
  advancedTool: { label: "Advanced Seamanship Tools", href: "/seamanship/calculations" },
  entries: [
    {
      id: "working-load",
      name: "Safe Working Load (SWL)",
      group: "Mooring and Ropes",
      formula: "SWL (kN) = Breaking Load / (Safety Factor × 1000)",
      variables: [
        { symbol: "Breaking Load", label: "Rope/gear minimum breaking load (MBL)", unit: "N" },
        { symbol: "Safety Factor", label: "Safety factor" },
      ],
      source: { code: "Safe working load of rope/gear: SWL = MBL / SF" },
      note: "SWL = Breaking Load (MBL) / Safety Factor. The input is in N and the result in kN (÷1000).",
      inputs: [
        { key: "mbl", label: "Breaking Load (MBL)", unit: "N", placeholder: "300000" },
        { key: "sf", label: "Safety Factor", unit: "", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.sf <= 0) return [{ label: "Error", value: "The safety factor must be positive" }];
        return [{ label: "Safe Working Load (SWL)", value: `${(v.mbl / (v.sf * 1000)).toFixed(2)} kN` }];
      },
    },
    {
      id: "wind-force",
      name: "Wind Force",
      group: "Wind and Current",
      formula: "F = 0.613 × Cd × A × V²",
      variables: [
        { symbol: "Cd", label: "Drag coefficient" },
        { symbol: "A", label: "Area exposed to the wind", unit: "m²" },
        { symbol: "V", label: "Wind speed", unit: "m/s" },
      ],
      source: { code: "Wind pressure / drag force relation" },
      note: "The result is in newtons (N); 0.613 = ½·ρ_air (≈1.226 kg/m³).",
      inputs: [
        { key: "cd", label: "Cd", unit: "", placeholder: "1.0" },
        { key: "a", label: "Area (A)", unit: "m²", placeholder: "500" },
        { key: "v", label: "Wind Speed (V)", unit: "m/s", placeholder: "20" },
      ],
      calculate: (v) => [{ label: "Force (F)", value: `${(0.613 * v.cd * v.a * v.v * v.v).toFixed(0)} N` }],
    },
    {
      id: "catenary-tension",
      name: "Chain Catenary Tension",
      group: "Demirleme",
      formula: "T = W × sinh(s / a)",
      variables: [
        { symbol: "W", label: "Weight per unit length parameter", unit: "kN" },
        { symbol: "s", label: "Horizontal span parameter", unit: "m" },
        { symbol: "a", label: "Catenary parameter", unit: "m" },
      ],
      source: { code: "Catenary (chain curve) equation" },
      inputs: [
        { key: "w", label: "W", unit: "kN", placeholder: "50" },
        { key: "s", label: "s", unit: "m", placeholder: "60" },
        { key: "a", label: "a", unit: "m", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.a === 0) return [{ label: "Error", value: "a cannot be zero" }];
        return [{ label: "Tension (T)", value: `${(v.w * Math.sinh(v.s / v.a)).toFixed(2)} kN` }];
      },
    },
    {
      id: "anchor-holding",
      name: "Anchor Holding Power",
      group: "Demirleme",
      formula: "Holding Power = Anchor Weight × Holding Coefficient",
      variables: [
        { symbol: "Anchor Weight", label: "Anchor weight", unit: "t" },
        { symbol: "Holding Coeff.", label: "Holding coefficient (by seabed type)" },
      ],
      source: { code: "Anchor holding power relation" },
      inputs: [
        { key: "weight", label: "Anchor Weight", unit: "t", placeholder: "5" },
        { key: "coeff", label: "Holding Coefficient", unit: "", placeholder: "4" },
      ],
      calculate: (v) => [{ label: "Holding Power", value: `${(v.weight * v.coeff).toFixed(2)} t` }],
    },
    {
      id: "scope",
      name: "Anchor Cable Scope",
      group: "Demirleme",
      formula: "Scope = Cable Length / Water Depth",
      variables: [
        { symbol: "Cable", label: "Length of cable veered", unit: "m" },
        { symbol: "Depth", label: "Water depth", unit: "m" },
      ],
      source: { code: "Anchoring scope ratio (usually 5–7)" },
      inputs: [
        { key: "chain", label: "Cable Length", unit: "m", placeholder: "150" },
        { key: "depth", label: "Water Depth", unit: "m", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.depth <= 0) return [{ label: "Error", value: "The depth must be positive" }];
        const scope = v.chain / v.depth;
        return [
          { label: "Scope", value: `${scope.toFixed(1)} : 1` },
          { label: "Assessment", value: scope >= 5 ? "Adequate" : "Inadequate (<5)" },
        ];
      },
    },
    {
      id: "bollard-pull",
      name: "Required Bollard Pull (Tug)",
      group: "Towage",
      formula: "Required BP = (Δ × V²) / K",
      variables: [
        { symbol: "Δ", label: "Vessel displacement", unit: "t" },
        { symbol: "V", label: "Speed", unit: "kn" },
        { symbol: "K", label: "Empirical coefficient" },
      ],
      source: { code: "Tug bollard pull estimate (empirical)" },
      inputs: [
        { key: "disp", label: "Displacement (Δ)", unit: "t", placeholder: "50000" },
        { key: "v", label: "Speed (V)", unit: "kn", placeholder: "2" },
        { key: "k", label: "Coefficient (K)", unit: "", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.k === 0) return [{ label: "Error", value: "K cannot be zero" }];
        return [{ label: "Required BP", value: `${((v.disp * v.v * v.v) / v.k).toFixed(1)} t` }];
      },
    },
    {
      id: "tackle-mechanical-advantage",
      name: "Tackle Mechanical Advantage",
      group: "Mooring and Ropes",
      formula: "MA = n  ;  F = W / (MA × η)",
      variables: [
        { symbol: "MA", label: "Mechanical advantage (number of supporting parts)" },
        { symbol: "n", label: "Number of parts at the moving block" },
        { symbol: "W", label: "Load to be lifted", unit: "kN" },
        { symbol: "η", label: "Tackle efficiency (friction)" },
        { symbol: "F", label: "Required hauling force", unit: "kN" },
      ],
      source: { code: "Tackle mechanical advantage" },
      note: "The ideal MA equals the number of parts supporting the load. The efficiency η accounts for friction losses (typically ~4% per sheave).",
      inputs: [
        { key: "n", label: "Number of Supporting Parts (n)", unit: "", placeholder: "4" },
        { key: "w", label: "Load (W)", unit: "kN", placeholder: "20" },
        { key: "eta", label: "Efficiency (η)", unit: "", placeholder: "0.9" },
      ],
      calculate: (v) => {
        if (v.n <= 0) return [{ label: "Error", value: "The number of parts must be positive" }];
        const eta = v.eta > 0 ? v.eta : 1;
        const force = v.w / (v.n * eta);
        return [
          { label: "Mechanical Advantage (MA)", value: `${v.n.toFixed(0)} : 1` },
          { label: "Required Hauling Force (F)", value: `${force.toFixed(2)} kN` },
        ];
      },
    },
    {
      id: "current-force",
      name: "Current Force",
      group: "Wind and Current",
      formula: "F = ½ · ρ · Cd · A · V²",
      variables: [
        { symbol: "ρ", label: "Sea water density", unit: "kg/m³" },
        { symbol: "Cd", label: "Drag coefficient" },
        { symbol: "A", label: "Underwater (wetted) profile area", unit: "m²" },
        { symbol: "V", label: "Current speed", unit: "m/s" },
      ],
      source: { code: "Hydrodynamic drag force relation" },
      note: "Sea water ρ ≈ 1025 kg/m³. The current speed is entered in m/s (1 kn ≈ 0.514 m/s). Used together with the wind force in anchoring/mooring load analysis.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "cd", label: "Cd", unit: "", placeholder: "1.0" },
        { key: "a", label: "Wetted Area (A)", unit: "m²", placeholder: "300" },
        { key: "v", label: "Current Speed (V)", unit: "m/s", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.rho <= 0 || v.a <= 0) return [{ label: "Error", value: "ρ and A must be positive" }];
        const f = 0.5 * v.rho * v.cd * v.a * v.v * v.v;
        return [
          { label: "Current Force (F)", value: `${(f / 1000).toFixed(1)} kN` },
          { label: "Force", value: `${f.toFixed(0)} N` },
        ];
      },
    },
    {
      id: "required-cable-length",
      name: "Required Cable Length",
      group: "Demirleme",
      formula: "Cable = Scope × Water Depth",
      variables: [
        { symbol: "Scope", label: "Target scope ratio (typically 5–7)" },
        { symbol: "Depth", label: "Water depth (including tide)", unit: "m" },
        { symbol: "Cable", label: "Required cable length", unit: "m" },
      ],
      source: { code: "Anchoring planning — required cable length" },
      note: "The forecastle freeboard is added to the water depth and the sum is multiplied by the scope. 1 shackle ≈ 27.5 m.",
      inputs: [
        { key: "scope", label: "Target Scope", unit: "", placeholder: "6" },
        { key: "depth", label: "Water Depth", unit: "m", placeholder: "25" },
        { key: "freeboard", label: "Forecastle Freeboard", unit: "m", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.scope <= 0) return [{ label: "Error", value: "The scope must be positive" }];
        const totalDepth = v.depth + (v.freeboard > 0 ? v.freeboard : 0);
        const length = v.scope * totalDepth;
        return [
          { label: "Required Cable Length", value: `${length.toFixed(1)} m` },
          { label: "Approximate Number of Shackles", value: `${(length / 27.5).toFixed(1)} shackles` },
        ];
      },
    },
  ],
};
