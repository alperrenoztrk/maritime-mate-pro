import { Cog } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Machine Elements and Materials — single source course content.
 * Formulas and calculators are merged into a SINGLE list; entries carrying
 * `calculate` appear on both the Formulas and the Calculations page.
 */
export const machineElements: CourseTopic = {
  key: "machine-elements",
  title: "Machine Elements and Materials",
  icon: Cog,
  accent: "from-zinc-500 via-slate-500 to-gray-600",
  group: "machine",
  intro:
    "Strength of materials, stress analysis, shaft-bearing calculations and materials knowledge. " +
    "Each formula defines the relevant quantity with standard strength relations.",
  entries: [
    {
      id: "tensile-stress",
      name: "Tensile/Compressive Stress",
      group: "Strength and Stress",
      formula: "σ = F / A",
      variables: [
        { symbol: "F", label: "Force", unit: "N" },
        { symbol: "A", label: "Cross-sectional area", unit: "m²" },
      ],
      source: { code: "Strength of materials — definition of normal (tensile/compressive) stress" },
      note: "The force is entered in kN and the area in mm²; the result is given in MPa (N/mm²).",
      inputs: [
        { key: "f", label: "Force (F)", unit: "kN", placeholder: "150" },
        { key: "a", label: "Cross-sectional Area (A)", unit: "mm²", placeholder: "1200" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Error", value: "The area must be positive" }];
        const sigma = (v.f * 1000) / v.a;
        return [{ label: "Stress (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
    },
    {
      id: "shear-stress",
      name: "Shear Stress",
      group: "Strength and Stress",
      formula: "τ = F / A",
      variables: [
        { symbol: "F", label: "Shear force", unit: "N" },
        { symbol: "A", label: "Shear area", unit: "m²" },
      ],
      source: { code: "Strength of materials — definition of shear stress" },
      note: "The force is entered in kN and the area in mm²; the result is given in MPa (N/mm²).",
      inputs: [
        { key: "f", label: "Shear Force (F)", unit: "kN", placeholder: "80" },
        { key: "a", label: "Shear Area (A)", unit: "mm²", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Error", value: "The area must be positive" }];
        const tau = (v.f * 1000) / v.a;
        return [{ label: "Shear Stress (τ)", value: `${tau.toFixed(1)} MPa` }];
      },
    },
    {
      id: "bending-stress",
      name: "Bending Stress",
      group: "Strength and Stress",
      formula: "σ = M·y / I",
      variables: [
        { symbol: "M", label: "Bending moment", unit: "N·m" },
        { symbol: "y", label: "Distance from the neutral axis", unit: "m" },
        { symbol: "I", label: "Moment of inertia", unit: "m⁴" },
      ],
      source: { code: "Strength of materials — flexure formula" },
      note: "The moment is entered in N·m, y in mm and the moment of inertia in mm⁴; the result is given in MPa.",
      inputs: [
        { key: "m", label: "Bending Moment (M)", unit: "N·m", placeholder: "5000" },
        { key: "y", label: "Distance from the Neutral Axis (y)", unit: "mm", placeholder: "50" },
        { key: "i", label: "Moment of Inertia (I)", unit: "mm⁴", placeholder: "2000000" },
      ],
      calculate: (v) => {
        if (v.i <= 0) return [{ label: "Error", value: "The moment of inertia must be positive" }];
        const sigma = (v.m * 1000 * v.y) / v.i;
        return [{ label: "Bending Stress (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
    },
    {
      id: "torsional-stress",
      name: "Torsional Stress",
      group: "Strength and Stress",
      formula: "τ = T·r / J",
      variables: [
        { symbol: "T", label: "Tork", unit: "N·m" },
        { symbol: "r", label: "Radius", unit: "m" },
        { symbol: "J", label: "Polar moment of inertia", unit: "m⁴" },
      ],
      source: { code: "Strength of materials — torsion formula" },
      note: "The torque is entered in N·m, the radius in mm and the polar moment of inertia in mm⁴; the result is given in MPa.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "8000" },
        { key: "r", label: "Radius (r)", unit: "mm", placeholder: "40" },
        { key: "j", label: "Polar Moment of Inertia (J)", unit: "mm⁴", placeholder: "4000000" },
      ],
      calculate: (v) => {
        if (v.j <= 0) return [{ label: "Error", value: "The polar moment of inertia must be positive" }];
        const tau = (v.t * 1000 * v.r) / v.j;
        return [{ label: "Torsional Stress (τ)", value: `${tau.toFixed(1)} MPa` }];
      },
    },
    {
      id: "shaft-diameter-torsion",
      name: "Shaft Diameter (Torsion)",
      group: "Shaft and Bearing",
      formula: "d = ∛(16T / π·τizin)",
      variables: [
        { symbol: "T", label: "Tork", unit: "N·m" },
        { symbol: "τizin", label: "Allowable shear stress", unit: "Pa" },
      ],
      source: { code: "Shaft design — torsional sizing of a solid circular shaft" },
      note: "The allowable stress is entered in MPa and converted to Pa in the calculation; the result is given in mm.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "50000" },
        { key: "tau", label: "Allowable τ", unit: "MPa", placeholder: "60" },
      ],
      calculate: (v) => {
        // τ = 16T / (πd³) → d = ∛(16T / πτ)
        const d = Math.pow((16 * v.t) / (Math.PI * v.tau * 1e6), 1 / 3) * 1000;
        return [{ label: "Minimum Diameter", value: `${d.toFixed(1)} mm` }];
      },
    },
    {
      id: "critical-speed",
      name: "Critical Speed",
      group: "Shaft and Bearing",
      formula: "ncr = (60/2π)·√(g/δst)",
      variables: [
        { symbol: "δst", label: "Static deflection", unit: "m" },
        { symbol: "g", label: "Gravity", unit: "m/s²" },
      ],
      source: { code: "Rotor dynamics — critical speed (Dunkerley/Rayleigh approximation)" },
      note: "The static deflection is entered in mm and converted to m in the calculation (g = 9.81 m/s²). The result is given in rpm.",
      inputs: [
        { key: "delta", label: "Static Deflection (δst)", unit: "mm", placeholder: "0.5" },
      ],
      calculate: (v) => {
        const deltaM = v.delta / 1000;
        if (deltaM <= 0) return [{ label: "Error", value: "The deflection must be positive" }];
        const ncr = (60 / (2 * Math.PI)) * Math.sqrt(9.81 / deltaM);
        return [{ label: "Critical Speed (ncr)", value: `${ncr.toFixed(0)} rpm` }];
      },
    },
    {
      id: "bearing-life-l10",
      name: "Bearing Life (L₁₀)",
      group: "Shaft and Bearing",
      formula: "L₁₀ = (C/P)^p × 10⁶ revolutions",
      variables: [
        { symbol: "C", label: "Dynamic load rating", unit: "N" },
        { symbol: "P", label: "Equivalent load", unit: "N" },
        { symbol: "p", label: "Exponent (ball = 3, roller = 10/3)" },
        { symbol: "n", label: "Speed", unit: "rpm" },
      ],
      source: { code: "Bearing life — basic dynamic load equation (ISO 281)" },
      note: "C and P may be entered in kN (the ratio is dimensionless, so it makes no difference); the speed (rpm) is used for the life in hours.",
      inputs: [
        { key: "c", label: "Dynamic Load Rating (C)", unit: "kN", placeholder: "120" },
        { key: "p", label: "Equivalent Load (P)", unit: "kN", placeholder: "30" },
        { key: "n", label: "Speed", unit: "rpm", placeholder: "1500" },
        { key: "type", label: "Type (3 = ball, 10/3 = roller)", unit: "", placeholder: "3" },
      ],
      calculate: (v) => {
        const l10Rev = Math.pow(v.c / v.p, v.type) * 1e6;
        const l10Hours = l10Rev / (v.n * 60);
        return [
          { label: "L₁₀ (revolutions)", value: `${(l10Rev / 1e6).toFixed(1)} × 10⁶` },
          { label: "L₁₀ (hours)", value: `${l10Hours.toFixed(0)} h` },
        ];
      },
    },
    {
      id: "gear-ratio",
      name: "Gear Speed Ratio",
      group: "Shaft and Bearing",
      formula: "i = Z₂/Z₁ = n₁/n₂",
      variables: [
        { symbol: "Z₁", label: "Driving tooth count" },
        { symbol: "Z₂", label: "Driven tooth count" },
        { symbol: "n₁", label: "Driving speed", unit: "rpm" },
        { symbol: "n₂", label: "Output speed", unit: "rpm" },
        { symbol: "T₁", label: "Driving torque", unit: "N·m" },
      ],
      source: { code: "Gear kinematics — gear ratio and torque transmission" },
      note: "The output torque is calculated with ~3% gear loss (×0.97).",
      inputs: [
        { key: "z1", label: "Driving Tooth Count (Z₁)", unit: "", placeholder: "20" },
        { key: "z2", label: "Driven Tooth Count (Z₂)", unit: "", placeholder: "60" },
        { key: "n1", label: "Driving Speed (n₁)", unit: "rpm", placeholder: "1500" },
        { key: "t1", label: "Driving Torque (T₁)", unit: "N·m", placeholder: "100" },
      ],
      calculate: (v) => {
        const ratio = v.z2 / v.z1;
        const n2 = v.n1 / ratio;
        const t2 = v.t1 * ratio * 0.97; // ~3% loss
        return [
          { label: "Gear Ratio (i)", value: `${ratio.toFixed(2)}:1` },
          { label: "Output Speed (n₂)", value: `${n2.toFixed(0)} rpm` },
          { label: "Output Torque (T₂)", value: `${t2.toFixed(1)} N·m` },
        ];
      },
    },
    {
      id: "weld-stress",
      name: "Weld Seam Stress",
      group: "Shaft and Bearing",
      formula: "σ = F / (L·a)",
      variables: [
        { symbol: "F", label: "Applied force", unit: "N" },
        { symbol: "L", label: "Weld length", unit: "mm" },
        { symbol: "a", label: "Weld throat thickness", unit: "mm" },
      ],
      source: { code: "Welded joint strength — weld seam stress check" },
      note: "The force is entered in kN and converted to N in the calculation; the result is given in MPa (N/mm²).",
      inputs: [
        { key: "f", label: "Applied Force (F)", unit: "kN", placeholder: "200" },
        { key: "l", label: "Weld Length (L)", unit: "mm", placeholder: "200" },
        { key: "a", label: "Weld Throat Thickness (a)", unit: "mm", placeholder: "6" },
      ],
      calculate: (v) => {
        const area = v.l * v.a; // mm²
        const stress = (v.f * 1000) / area; // N/mm² = MPa
        const status = stress < 100 ? "Compliant" : stress < 160 ? "Caution" : "Excessive";
        return [
          { label: "Weld Stress", value: `${stress.toFixed(1)} MPa` },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      id: "youngs-modulus",
      name: "Hooke's Law / Modulus of Elasticity",
      group: "Strength and Stress",
      formula: "σ = E·ε    →    E = σ / ε ,  ε = ΔL / L₀",
      variables: [
        { symbol: "σ", label: "Stress", unit: "MPa" },
        { symbol: "E", label: "Modulus of elasticity (Young's modulus)", unit: "MPa" },
        { symbol: "ε", label: "Strain (elongation)" },
        { symbol: "ΔL", label: "Elongation", unit: "mm" },
        { symbol: "L₀", label: "Original length", unit: "mm" },
      ],
      source: { code: "Strength of materials — Hooke's law (elastic region)" },
      note: "Valid in the elastic region. For steel E ≈ 210000 MPa. The strain ε = ΔL/L₀ is dimensionless.",
      inputs: [
        { key: "sigma", label: "Stress (σ)", unit: "MPa", placeholder: "150" },
        { key: "dl", label: "Elongation (ΔL)", unit: "mm", placeholder: "1.5" },
        { key: "l0", label: "Original Length (L₀)", unit: "mm", placeholder: "2000" },
      ],
      calculate: (v) => {
        if (v.l0 <= 0) return [{ label: "Error", value: "The original length must be positive" }];
        const eps = v.dl / v.l0;
        if (eps === 0) return [{ label: "Error", value: "The elongation cannot be zero" }];
        const e = v.sigma / eps;
        return [
          { label: "Strain (ε)", value: `${eps.toExponential(3)}` },
          { label: "Modulus of Elasticity (E)", value: `${(e / 1000).toFixed(0)} GPa` },
        ];
      },
    },
    {
      id: "lewis-gear-stress",
      name: "Lewis Gear Bending Stress",
      group: "Shaft and Bearing",
      formula: "σ = Ft / (b·m·Y)",
      variables: [
        { symbol: "σ", label: "Tooth root bending stress", unit: "MPa" },
        { symbol: "Ft", label: "Tangential force", unit: "N" },
        { symbol: "b", label: "Face width", unit: "mm" },
        { symbol: "m", label: "Module", unit: "mm" },
        { symbol: "Y", label: "Lewis form factor" },
      ],
      source: { code: "Gear strength — Lewis bending equation" },
      note: "Y is the form factor depending on the tooth count (typically 0.3–0.45). Ft can be obtained from Ft = 2T/d.",
      inputs: [
        { key: "ft", label: "Tangential Force (Ft)", unit: "N", placeholder: "3000" },
        { key: "b", label: "Face Width (b)", unit: "mm", placeholder: "40" },
        { key: "m", label: "Module (m)", unit: "mm", placeholder: "4" },
        { key: "y", label: "Lewis Factor (Y)", unit: "", placeholder: "0.38" },
      ],
      calculate: (v) => {
        if (v.b <= 0 || v.m <= 0 || v.y <= 0) return [{ label: "Error", value: "b, m and Y must be positive" }];
        const sigma = v.ft / (v.b * v.m * v.y);
        return [{ label: "Bending Stress (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
    },
  ],
};
