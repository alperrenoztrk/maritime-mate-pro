import { Wrench } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Gemi Makine Sistemleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const shipSystems: CourseTopic = {
  key: "ship-systems",
  title: "Gemi Makine Sistemleri",
  icon: Wrench,
  accent: "from-blue-600 via-indigo-600 to-violet-600",
  group: "machine",
  intro:
    "Fuel, lubrication and cooling systems together with steering, propeller and hydraulic calculations. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "fuel-consumption",
      name: "Fuel Consumption",
      group: "Fuel System",
      formula: "FC = SFOC × BHP × t / 10⁶",
      variables: [
        { symbol: "SFOC", label: "Specific fuel consumption", unit: "g/kW·h" },
        { symbol: "BHP", label: "Brake power", unit: "kW" },
        { symbol: "t", label: "Duration", unit: "saat" },
        { symbol: "FC", label: "Total consumption", unit: "ton" },
      ],
      source: { code: "Fuel management — voyage consumption balance" },
      note: "The result is in g and converted to tonnes by dividing by 10⁶.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "bhp", label: "BHP", unit: "kW", placeholder: "15000" },
        { key: "t", label: "Duration", unit: "saat", placeholder: "240" },
      ],
      calculate: (v) => {
        const fc = (v.sfoc * v.bhp * v.t) / 1e6;
        return [{ label: "Total Fuel", value: `${fc.toFixed(1)} ton` }];
      },
    },
    {
      id: "walther-viscosity",
      name: "Viscosity-Temperature (Walther)",
      group: "Fuel System",
      formula: "log(log(ν + 0,7)) = A − B·log(T)",
      variables: [
        { symbol: "ν", label: "Kinematik viskozite", unit: "cSt" },
        { symbol: "T", label: "Absolute temperature", unit: "K" },
        { symbol: "A", label: "Walther sabiti" },
        { symbol: "B", label: "Walther slope constant" },
      ],
      source: { code: "Walther equation (ASTM D341) — viscosity-temperature relation" },
      note: "The temperatures are entered in °C and converted to K (T + 273.15) in the calculation.",
      inputs: [
        { key: "v1", label: "Viskozite @T₁", unit: "cSt", placeholder: "380" },
        { key: "t1", label: "Temperature T₁", unit: "°C", placeholder: "50" },
        { key: "v2", label: "Viskozite @T₂", unit: "cSt", placeholder: "15" },
        { key: "t2", label: "Temperature T₂", unit: "°C", placeholder: "130" },
        { key: "tx", label: "Target Temperature Tx", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        // Walther equation: log(log(ν+0.7)) = A - B × log(T+273.15)
        const w1 = Math.log10(Math.log10(v.v1 + 0.7));
        const w2 = Math.log10(Math.log10(v.v2 + 0.7));
        const lt1 = Math.log10(v.t1 + 273.15);
        const lt2 = Math.log10(v.t2 + 273.15);
        const B = (w1 - w2) / (lt2 - lt1);
        const A = w1 + B * lt1;
        const ltx = Math.log10(v.tx + 273.15);
        const wx = A - B * ltx;
        const vx = Math.pow(10, Math.pow(10, wx)) - 0.7;
        return [{ label: `Viskozite @${v.tx}°C`, value: `${vx.toFixed(1)} cSt` }];
      },
    },
    {
      id: "lube-oil-flow",
      name: "Oil Flow Rate",
      group: "Lubrication System",
      formula: "Q = (BHP × SLOC) / (ρ × 10³)",
      variables: [
        { symbol: "BHP", label: "Brake power", unit: "kW" },
        { symbol: "SLOC", label: "Specific lubricating oil consumption", unit: "g/kW·h" },
        { symbol: "ρ", label: "Oil density", unit: "kg/m³" },
      ],
      source: { code: "Lubrication system — oil consumption rate relation" },
      note: "BHP × SLOC = g/hour; dividing by the density gives the volumetric flow rate (L/hour, m³/hour).",
      inputs: [
        { key: "bhp", label: "Brake Power (BHP)", unit: "kW", placeholder: "15000" },
        { key: "sloc", label: "Specific Lubricating Oil Consumption (SLOC)", unit: "g/kW·h", placeholder: "0.8" },
        { key: "rho", label: "Oil Density (ρ)", unit: "kg/m³", placeholder: "900" },
      ],
      calculate: (v) => {
        if (v.rho <= 0) return [{ label: "Hata", value: "Density must be positive" }];
        const m3h = (v.bhp * v.sloc) / (v.rho * 1000);
        return [
          { label: "Oil Flow Rate", value: `${(m3h * 1000).toFixed(1)} L/saat` },
          { label: "Oil Flow Rate", value: `${m3h.toFixed(3)} m³/saat` },
        ];
      },
    },
    {
      id: "oil-film-thickness",
      name: "Oil Film Thickness",
      group: "Lubrication System",
      formula: "S = (μ·n / P)·(r/c)²",
      variables: [
        { symbol: "μ", label: "Oil viscosity", unit: "Pa·s" },
        { symbol: "n", label: "Devir", unit: "rps" },
        { symbol: "P", label: "Unit load", unit: "MPa" },
        { symbol: "c", label: "Bearing clearance", unit: "mm" },
        { symbol: "r", label: "Shaft radius", unit: "mm" },
      ],
      source: { code: "Hydrodynamic lubrication — Sommerfeld number and minimum film thickness" },
      note: "The unit load is entered in MPa and converted to Pa (×10⁶) in the calculation; the film thickness is given in µm.",
      inputs: [
        { key: "mu", label: "Oil Viscosity (μ)", unit: "Pa·s", placeholder: "0.05" },
        { key: "n", label: "Devir (n)", unit: "rps", placeholder: "5" },
        { key: "p", label: "Unit Load (P)", unit: "MPa", placeholder: "3" },
        { key: "c", label: "Bearing Clearance (c)", unit: "mm", placeholder: "0.1" },
        { key: "r", label: "Shaft Radius (r)", unit: "mm", placeholder: "100" },
      ],
      calculate: (v) => {
        // Sommerfeld number: S = (μ × n / P) × (r/c)²
        const S = (v.mu * v.n / (v.p * 1e6)) * Math.pow((v.r / v.c), 2);
        const hMin = v.c * (1 - 1 / (1 + 2 * S)); // Approximate
        return [
          { label: "Sommerfeld Number (S)", value: S.toFixed(3) },
          { label: "Min. Film Thickness", value: `${(hMin * 1000).toFixed(1)} µm` },
        ];
      },
    },
    {
      id: "heat-rejection",
      name: "Heat Rejection",
      group: "Cooling System",
      formula: "Q̇ = ṁ·cp·ΔT",
      variables: [
        { symbol: "ṁ", label: "Mass flow rate", unit: "kg/s" },
        { symbol: "cp", label: "Specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
      ],
      source: { code: "Cooling system — sensible heat rejection balance" },
      note: "The mass flow rate is entered in kg/s; the rejected heat is calculated as Q̇ = ṁ·cp·ΔT (kW).",
      inputs: [
        { key: "mdot", label: "Mass Flow Rate (ṁ)", unit: "kg/s", placeholder: "30" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "K", placeholder: "8" },
      ],
      calculate: (v) => {
        const q = v.mdot * v.cp * v.dt;
        return [{ label: "Rejected Heat (Q̇)", value: `${q.toFixed(1)} kW` }];
      },
    },
    {
      id: "cooling-water-flow",
      name: "Cooling Water Flow Rate",
      group: "Cooling System",
      formula: "ṁ = Q̇ / (cp × ΔT)",
      variables: [
        { symbol: "Q̇", label: "Rejected heat", unit: "kW" },
        { symbol: "cp", label: "Specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature difference (HT 5–8 °C, LT 10–15 °C)", unit: "K" },
      ],
      source: { code: "Cooling system — cooling water flow rate (from the heat balance)" },
      note: "The heat load is entered in kW; the required flow rate is ṁ = Q̇/(cp·ΔT) (kg/s). For water, m³/hour ≈ kg/s × 3.6.",
      inputs: [
        { key: "q", label: "Rejected Heat (Q̇)", unit: "kW", placeholder: "1000" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "K", placeholder: "8" },
      ],
      calculate: (v) => {
        const denom = v.cp * v.dt;
        if (denom <= 0) return [{ label: "Hata", value: "cp and ΔT must be positive" }];
        const mdot = v.q / denom;
        return [
          { label: "Mass Flow Rate (ṁ)", value: `${mdot.toFixed(2)} kg/s` },
          { label: "Hacimsel Debi (su)", value: `${(mdot * 3.6).toFixed(1)} m³/saat` },
        ];
      },
    },
    {
      id: "rudder-torque",
      name: "Rudder Torque (Joessel)",
      group: "Steering and Propulsion",
      formula: "F = 577 × A × V² × sin(α)",
      variables: [
        { symbol: "A", label: "Rudder area", unit: "m²" },
        { symbol: "V", label: "Vessel speed", unit: "m/s" },
        { symbol: "α", label: "Rudder angle", unit: "°" },
      ],
      source: { code: "Joessel formula — rudder force and torque" },
      note: "The speed is entered in knots and converted to m/s (×0.5144); the torque ≈ F × 0.35 × √A.",
      inputs: [
        { key: "a", label: "Rudder Area (A)", unit: "m²", placeholder: "12" },
        { key: "v", label: "Vessel Speed (V)", unit: "knot", placeholder: "15" },
        { key: "alpha", label: "Rudder Angle (α)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const vMs = v.v * 0.5144;
        const alphaRad = v.alpha * Math.PI / 180;
        // Joessel: F = 577 × A × V² × sin(α) (N)
        const force = 577 * v.a * vMs * vMs * Math.sin(alphaRad);
        // Tork = F × d (d ≈ 0.35 × kord uzunluğu, tahmini olarak alan/yükseklik)
        const torque = force * 0.35 * Math.sqrt(v.a);
        return [
          { label: "Rudder Force", value: `${(force / 1000).toFixed(1)} kN` },
          { label: "Rudder Torque", value: `${(torque / 1000).toFixed(1)} kN·m` },
        ];
      },
    },
    {
      id: "propeller-thrust",
      name: "Propeller Thrust",
      group: "Steering and Propulsion",
      formula: "T = KT × ρ × n² × D⁴",
      variables: [
        { symbol: "KT", label: "Thrust coefficient" },
        { symbol: "ρ", label: "Sea water density", unit: "kg/m³" },
        { symbol: "n", label: "Devir", unit: "rps" },
        { symbol: "D", label: "Propeller diameter", unit: "m" },
      ],
      source: { code: "Propeller theory — non-dimensional thrust coefficient (KT) relation" },
      inputs: [
        { key: "rho", label: "Sea Water Density", unit: "kg/m³", placeholder: "1025" },
        { key: "d", label: "Propeller Diameter", unit: "m", placeholder: "6" },
        { key: "n", label: "Devir", unit: "rps", placeholder: "2" },
        { key: "kt", label: "Thrust Coefficient (KT)", unit: "", placeholder: "0.18" },
      ],
      calculate: (v) => {
        // T = K_T × ρ × n² × D⁴
        const thrust = v.kt * v.rho * v.n * v.n * Math.pow(v.d, 4);
        return [{ label: "Thrust (T)", value: `${(thrust / 1000).toFixed(1)} kN` }];
      },
    },
    {
      id: "hydraulic-cylinder-force",
      name: "Hidrolik Silindir Kuvveti",
      group: "Hidrolik Sistem",
      formula: "F = P × A = P × π·D²/4",
      variables: [
        { symbol: "P", label: "Pressure", unit: "bar" },
        { symbol: "D", label: "Piston diameter", unit: "mm" },
        { symbol: "A", label: "Piston area", unit: "m²" },
      ],
      source: { code: "Hydraulics — Pascal's principle (pressure × area = force)" },
      note: "The pressure is entered in bar and converted to 10⁵ Pa in the calculation; the diameter is entered in mm.",
      inputs: [
        { key: "p", label: "Pressure", unit: "bar", placeholder: "200" },
        { key: "d", label: "Piston Diameter", unit: "mm", placeholder: "150" },
      ],
      calculate: (v) => {
        const areaM2 = Math.PI * Math.pow(v.d / 1000, 2) / 4;
        const force = v.p * 1e5 * areaM2;
        return [
          { label: "Piston Area", value: `${(areaM2 * 1e4).toFixed(2)} cm²` },
          { label: "Silindir Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
    {
      id: "propulsive-efficiency",
      name: "Propulsif (Pervane) Verim",
      group: "Steering and Propulsion",
      formula: "ηD = η₀ · ηH · ηR",
      variables: [
        { symbol: "ηD", label: "Toplam propulsif (quasi-propulsive) verim" },
        { symbol: "η₀", label: "Open water propeller efficiency" },
        { symbol: "ηH", label: "Tekne (hull) verimi" },
        { symbol: "ηR", label: "Relative rotative efficiency" },
      ],
      source: { code: "Propulsion theory — propulsive efficiency components" },
      note: "Typical ranges: η₀ ≈ 0.55–0.70 ; ηH ≈ 1.0–1.15 ; ηR ≈ 0.98–1.02. If required, the delivered power is obtained from the effective power (PE) as PD = PE/ηD.",
      inputs: [
        { key: "eta0", label: "Open Water Efficiency (η₀)", unit: "", placeholder: "0.65" },
        { key: "etah", label: "Tekne Verimi (ηH)", unit: "", placeholder: "1.05" },
        { key: "etar", label: "Relative Rotative Efficiency (ηR)", unit: "", placeholder: "1.0" },
        { key: "pe", label: "Effective Power (PE) — optional", unit: "kW", placeholder: "0" },
      ],
      calculate: (v) => {
        const etaD = v.eta0 * v.etah * v.etar;
        const out = [
          { label: "Propulsif Verim (ηD)", value: `${etaD.toFixed(3)}  (${(etaD * 100).toFixed(1)} %)` },
        ];
        if (v.pe > 0 && etaD > 0) {
          out.push({ label: "Delivered Power (PD = PE/ηD)", value: `${(v.pe / etaD).toFixed(0)} kW` });
        }
        return out;
      },
    },
  ],
};
