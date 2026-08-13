import { Droplets } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Akışkanlar Mekaniği — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const fluidMechanics: CourseTopic = {
  key: "fluid-mechanics",
  title: "Fluid Mechanics",
  icon: Droplets,
  accent: "from-cyan-500 via-blue-500 to-indigo-500",
  group: "machine",
  intro:
    "Fluid statics and dynamics; pipelines, pumps and flow regimes. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "bernoulli",
      name: "Bernoulli Denklemi",
      group: "Fundamental Fluid Equations",
      formula: "P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂",
      variables: [
        { symbol: "P", label: "Pressure" },
        { symbol: "ρ", label: "Density" },
        { symbol: "v", label: "Speed" },
        { symbol: "z", label: "Height" },
        { symbol: "g", label: "Gravity" },
      ],
      source: { code: "Bernoulli equation (conservation of energy, frictionless flow)" },
      note: "The inlet pressure is taken in kPa and converted to Pa in the calculation; the result is given back in kPa.",
      inputs: [
        { key: "p1", label: "P₁ (Pressure)", unit: "kPa", placeholder: "200" },
        { key: "v1", label: "v₁ (Velocity)", unit: "m/s", placeholder: "2" },
        { key: "z1", label: "z₁ (Elevation)", unit: "m", placeholder: "5" },
        { key: "z2", label: "z₂ (Elevation)", unit: "m", placeholder: "0" },
        { key: "v2", label: "v₂ (Velocity)", unit: "m/s", placeholder: "4" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const p2 = v.p1 * 1000 + 0.5 * v.rho * (v.v1 * v.v1 - v.v2 * v.v2) + v.rho * 9.81 * (v.z1 - v.z2);
        return [{ label: "P₂ (Pressure)", value: `${(p2 / 1000).toFixed(2)} kPa` }];
      },
    },
    {
      id: "continuity",
      name: "Continuity Equation",
      group: "Fundamental Fluid Equations",
      formula: "A₁·v₁ = A₂·v₂",
      variables: [
        { symbol: "A", label: "Cross-sectional area", unit: "m²" },
        { symbol: "v", label: "Flow velocity", unit: "m/s" },
      ],
      source: { code: "Continuity equation (conservation of mass)" },
      note: "The cross-sectional areas are calculated from the diameters as A = π·D²/4.",
      inputs: [
        { key: "d1", label: "Diameter 1 (D₁)", unit: "m", placeholder: "0.2" },
        { key: "v1", label: "Velocity 1 (V₁)", unit: "m/s", placeholder: "2" },
        { key: "d2", label: "Diameter 2 (D₂)", unit: "m", placeholder: "0.1" },
      ],
      calculate: (v) => {
        const a1 = Math.PI * Math.pow(v.d1, 2) / 4;
        const a2 = Math.PI * Math.pow(v.d2, 2) / 4;
        const v2 = (a1 * v.v1) / a2;
        const q = a1 * v.v1;
        return [
          { label: "V₂ (Velocity)", value: `${v2.toFixed(2)} m/s` },
          { label: "Debi (Q)", value: `${(q * 3600).toFixed(1)} m³/h` },
        ];
      },
    },
    {
      id: "reynolds-number",
      name: "Reynolds Number",
      group: "Fundamental Fluid Equations",
      formula: "Re = ρ·v·D / μ",
      variables: [
        { symbol: "ρ", label: "Density", unit: "kg/m³" },
        { symbol: "v", label: "Speed", unit: "m/s" },
        { symbol: "D", label: "Diameter", unit: "m" },
        { symbol: "μ", label: "Dinamik viskozite", unit: "Pa·s" },
      ],
      source: { code: "Reynolds number (flow regime: Re < 2300 laminar, > 4000 turbulent)" },
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
        { key: "v", label: "Velocity (v)", unit: "m/s", placeholder: "2" },
        { key: "d", label: "Diameter (D)", unit: "m", placeholder: "0.1" },
        { key: "mu", label: "Dinamik Viskozite (μ)", unit: "Pa·s", placeholder: "0.001" },
      ],
      calculate: (vals) => {
        const re = (vals.rho * vals.v * vals.d) / vals.mu;
        const regime = re < 2300 ? "Laminer" : re < 4000 ? "Transitional" : "Turbulent";
        return [
          { label: "Reynolds Number", value: re.toFixed(0) },
          { label: "Flow Regime", value: regime },
        ];
      },
    },
    {
      id: "darcy-weisbach",
      name: "Darcy-Weisbach (Pipe Loss)",
      group: "Fundamental Fluid Equations",
      formula: "hf = f·(L/D)·(v²/2g)",
      variables: [
        { symbol: "f", label: "Friction factor" },
        { symbol: "L", label: "Pipe length", unit: "m" },
        { symbol: "D", label: "Diameter", unit: "m" },
        { symbol: "v", label: "Flow velocity", unit: "m/s" },
        { symbol: "g", label: "Gravity", unit: "m/s²" },
      ],
      source: { code: "Darcy-Weisbach equation (pipe friction loss)" },
      inputs: [
        { key: "f", label: "Friction Factor (f)", unit: "", placeholder: "0.02" },
        { key: "l", label: "Pipe Length (L)", unit: "m", placeholder: "50" },
        { key: "d", label: "Pipe Diameter (D)", unit: "m", placeholder: "0.1" },
        { key: "v", label: "Flow Velocity (v)", unit: "m/s", placeholder: "3" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (vals) => {
        const hf = vals.f * (vals.l / vals.d) * (vals.v * vals.v) / (2 * 9.81);
        const dp = vals.rho * 9.81 * hf;
        return [
          { label: "Head Loss (hf)", value: `${hf.toFixed(2)} m` },
          { label: "Pressure Loss (ΔP)", value: `${(dp / 1000).toFixed(2)} kPa` },
        ];
      },
    },
    {
      id: "pump-power",
      name: "Pump Power",
      group: "Pump Calculations",
      formula: "P = ρ·g·Q·H / η",
      variables: [
        { symbol: "ρ", label: "Density", unit: "kg/m³" },
        { symbol: "g", label: "Gravity", unit: "m/s²" },
        { symbol: "Q", label: "Debi", unit: "m³/s" },
        { symbol: "H", label: "Total head", unit: "m" },
        { symbol: "η", label: "Verim" },
      ],
      source: { code: "Centrifugal pump hydraulic power relation" },
      note: "The flow rate is entered in m³/h and converted to m³/s in the calculation; the efficiency is entered as a percentage.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "q", label: "Debi (Q)", unit: "m³/h", placeholder: "100" },
        { key: "h", label: "Head (H)", unit: "m", placeholder: "30" },
        { key: "eta", label: "Verim (η)", unit: "%", placeholder: "75" },
      ],
      calculate: (vals) => {
        const qm3s = vals.q / 3600;
        const power = (vals.rho * 9.81 * qm3s * vals.h) / (vals.eta / 100);
        return [{ label: "Pump Power", value: `${(power / 1000).toFixed(2)} kW` }];
      },
    },
    {
      id: "npsh",
      name: "NPSH (Net Positive Suction Head)",
      group: "Pump Calculations",
      formula: "NPSHa = (Patm − Pvap) / (ρ·g) + zs − hf",
      variables: [
        { symbol: "Patm", label: "Atmospheric pressure" },
        { symbol: "Pvap", label: "Vapour pressure" },
        { symbol: "ρ", label: "Density", unit: "kg/m³" },
        { symbol: "g", label: "Gravity", unit: "m/s²" },
        { symbol: "zs", label: "Suction lift", unit: "m" },
        { symbol: "hf", label: "Suction line loss", unit: "m" },
      ],
      source: { code: "NPSH (cavitation prevention — net positive suction head)" },
      note: "The pressures are entered in kPa and converted to Pa in the calculation.",
      inputs: [
        { key: "pa", label: "Atmospheric Pressure", unit: "kPa", placeholder: "101.325" },
        { key: "pv", label: "Vapour Pressure", unit: "kPa", placeholder: "2.34" },
        { key: "hs", label: "Suction Lift (+/−)", unit: "m", placeholder: "3" },
        { key: "hf", label: "Suction Line Loss", unit: "m", placeholder: "0.5" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const npsha = (v.pa - v.pv) * 1000 / (v.rho * 9.81) + v.hs - v.hf;
        return [{ label: "NPSHA", value: `${npsha.toFixed(2)} m` }];
      },
    },
    {
      id: "affinity-laws",
      name: "Affinity Laws",
      group: "Pump Calculations",
      formula: "Q₂/Q₁ = n₂/n₁ ; H₂/H₁ = (n₂/n₁)² ; P₂/P₁ = (n₂/n₁)³",
      variables: [
        { symbol: "Q", label: "Debi" },
        { symbol: "H", label: "Head" },
        { symbol: "P", label: "Power" },
        { symbol: "n", label: "Devir", unit: "rpm" },
      ],
      source: { code: "Pump/fan affinity laws" },
      inputs: [
        { key: "n1", label: "Mevcut Devir (n₁)", unit: "rpm", placeholder: "1450" },
        { key: "n2", label: "Yeni Devir (n₂)", unit: "rpm", placeholder: "1200" },
        { key: "q1", label: "Mevcut Debi (Q₁)", unit: "m³/h", placeholder: "100" },
        { key: "h1", label: "Current Head (H₁)", unit: "m", placeholder: "30" },
        { key: "p1", label: "Current Power (P₁)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const ratio = v.n2 / v.n1;
        const q2 = v.q1 * ratio;
        const h2 = v.h1 * Math.pow(ratio, 2);
        const p2 = v.p1 * Math.pow(ratio, 3);
        return [
          { label: "Yeni Debi (Q₂)", value: `${q2.toFixed(1)} m³/h` },
          { label: "New Head (H₂)", value: `${h2.toFixed(1)} m` },
          { label: "New Power (P₂)", value: `${p2.toFixed(2)} kW` },
        ];
      },
    },
    {
      id: "hydrostatic-pressure",
      name: "Hydrostatic Pressure",
      group: "Hidrostatik",
      formula: "P = P₀ + ρ·g·h",
      variables: [
        { symbol: "P", label: "Total (absolute) pressure", unit: "Pa" },
        { symbol: "P₀", label: "Pressure at the surface (atmospheric)", unit: "Pa" },
        { symbol: "ρ", label: "Fluid density", unit: "kg/m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9,81 m/s²" },
        { symbol: "h", label: "Derinlik", unit: "m" },
      ],
      source: { code: "Hidrostatik temel denklem (Pascal)" },
      note: "Sea water ρ ≈ 1025 kg/m³, fresh water 1000 kg/m³. For atmospheric conditions P₀ ≈ 101325 Pa; enter P₀ = 0 if only the gauge pressure is required.",
      inputs: [
        { key: "p0", label: "Surface Pressure (P₀)", unit: "Pa", placeholder: "101325" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "h", label: "Derinlik (h)", unit: "m", placeholder: "10" },
      ],
      calculate: (v) => {
        if (v.h < 0 || v.rho <= 0) return [{ label: "Hata", value: "The density must be positive and the depth ≥ 0" }];
        const p = v.p0 + v.rho * 9.81 * v.h;
        return [
          { label: "Pressure (P)", value: `${(p / 1000).toFixed(2)} kPa` },
          { label: "Pressure", value: `${(p / 1e5).toFixed(3)} bar` },
        ];
      },
    },
    {
      id: "hydrostatic-force",
      name: "Hydrostatic Force (Plane Surface)",
      group: "Hidrostatik",
      formula: "F = ρ·g·hc·A",
      variables: [
        { symbol: "F", label: "Resultant hydrostatic force", unit: "N" },
        { symbol: "ρ", label: "Fluid density", unit: "kg/m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9,81 m/s²" },
        { symbol: "hc", label: "Depth of the centroid of the surface", unit: "m" },
        { symbol: "A", label: "Wetted surface area", unit: "m²" },
      ],
      source: { code: "Hydrostatic force acting on a plane surface" },
      note: "hc is the depth of the centroid of the surface below the liquid surface (gauge pressure is used). It is used in hatch cover, bulkhead and tank wall calculations.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "hc", label: "Centroid Depth (hc)", unit: "m", placeholder: "3" },
        { key: "a", label: "Surface Area (A)", unit: "m²", placeholder: "2" },
      ],
      calculate: (v) => {
        if (v.rho <= 0 || v.hc < 0 || v.a <= 0) return [{ label: "Hata", value: "ρ and A must be positive and hc ≥ 0" }];
        const f = v.rho * 9.81 * v.hc * v.a;
        return [
          { label: "Hidrostatik Kuvvet (F)", value: `${(f / 1000).toFixed(2)} kN` },
          { label: "Kuvvet", value: `${f.toFixed(0)} N` },
        ];
      },
    },
  ],
};
