import { Settings } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Deniz Dizel Makineleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const dieselEngines: CourseTopic = {
  key: "diesel-engines",
  title: "Deniz Dizel Makineleri",
  icon: Settings,
  accent: "from-slate-600 via-zinc-700 to-slate-800",
  group: "machine",
  intro:
    "Diesel engine performance, combustion, injection and power calculations. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "indicated-power",
      name: "Indicated Power (IHP)",
      group: "Motor Performans",
      formula: "IHP = (Pmi × L × A × n × k) / 60000",
      variables: [
        { symbol: "Pmi", label: "Mean indicated pressure", unit: "bar" },
        { symbol: "L", label: "Strok", unit: "m" },
        { symbol: "A", label: "Piston area", unit: "m²" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Number of cylinders" },
      ],
      source: { code: "Engine theory — indicated power relation" },
      note: "Pmi is entered in bar and converted to 10⁵ Pa in the calculation; the result is given in kW.",
      inputs: [
        { key: "pmi", label: "Mean Indicated Pressure (Pmi)", unit: "bar", placeholder: "18" },
        { key: "l", label: "Strok (L)", unit: "m", placeholder: "2.5" },
        { key: "a", label: "Piston Area (A)", unit: "m²", placeholder: "0.35" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Number of Cylinders (k)", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        // P_mi (bar) * 10^5 (Pa) * L * A * n * k / 60 → Watt → /1000 → kW
        const ihp = (v.pmi * 1e5 * v.l * v.a * v.n * v.k) / (60 * 1000);
        return [{ label: "Indicated Power (IHP)", value: `${ihp.toFixed(1)} kW` }];
      },
    },
    {
      id: "brake-power",
      name: "Brake Power (BHP)",
      group: "Motor Performans",
      formula: "BHP = IHP × ηmech",
      variables: [
        { symbol: "IHP", label: "Indicated power", unit: "kW" },
        { symbol: "ηmech", label: "Mekanik verim (0,85–0,92)" },
      ],
      source: { code: "Engine theory — mechanical efficiency and brake power" },
      note: "Mekanik verim % girilir.",
      inputs: [
        { key: "ihp", label: "Indicated Power (IHP)", unit: "kW", placeholder: "12000" },
        { key: "eta", label: "Mekanik Verim (ηmek)", unit: "%", placeholder: "90" },
      ],
      calculate: (v) => {
        const bhp = v.ihp * (v.eta / 100);
        const loss = v.ihp - bhp;
        return [
          { label: "Brake Power (BHP)", value: `${bhp.toFixed(1)} kW` },
          { label: "Mechanical Loss", value: `${loss.toFixed(1)} kW` },
        ];
      },
    },
    {
      id: "sfoc",
      name: "SFOC (Specific Fuel Oil Consumption)",
      group: "Motor Performans",
      formula: "SFOC = Fuel consumption (g/h) / BHP (kW)",
      variables: [
        { symbol: "FC", label: "Fuel consumption", unit: "kg/saat" },
        { symbol: "BHP", label: "Brake power", unit: "kW" },
      ],
      source: { code: "Engine theory — specific fuel consumption (a lower value is more efficient)" },
      note: "The fuel consumption is entered in kg/hour and converted to g by ×1000; the result is in g/kW·h.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "kg/saat", placeholder: "5000" },
        { key: "bhp", label: "Brake Power (BHP)", unit: "kW", placeholder: "25000" },
      ],
      calculate: (v) => {
        const sfoc = (v.fc / v.bhp) * 1000;
        return [{ label: "SFOC", value: `${sfoc.toFixed(1)} g/kW·h` }];
      },
    },
    {
      id: "mep",
      name: "Mean Effective Pressure (MEP)",
      group: "Motor Performans",
      formula: "MEP = (P × 60) / (Vs × n × k)",
      variables: [
        { symbol: "P", label: "Power", unit: "kW" },
        { symbol: "Vs", label: "Swept volume (per cylinder)", unit: "m³" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Number of cylinders" },
      ],
      source: { code: "Engine theory — mean effective pressure (BMEP/IMEP)" },
      note: "Vs is calculated as π·D²/4·L; the result is converted from Pa to bar.",
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "10000" },
        { key: "bore", label: "Cylinder Bore", unit: "m", placeholder: "0.5" },
        { key: "stroke", label: "Strok", unit: "m", placeholder: "2.0" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Number of Cylinders", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore, 2) / 4 * v.stroke; // m³
        const mep = (v.p * 1000 * 60) / (vs * v.n * v.k); // Pa
        return [
          { label: "MEP", value: `${(mep / 1e5).toFixed(2)} bar` },
          { label: "Silindir Hacmi (Vs)", value: `${(vs * 1000).toFixed(1)} litre` },
        ];
      },
    },
    {
      id: "compression-ratio",
      name: "Compression Ratio",
      group: "Motor Performans",
      formula: "r = (Vs + Vc) / Vc",
      variables: [
        { symbol: "Vs", label: "Strok hacmi", unit: "litre" },
        { symbol: "Vc", label: "Clearance volume", unit: "litre" },
      ],
      source: { code: "Engine theory — geometric compression ratio (Vmax/Vmin)" },
      note: "The bore and stroke are entered in mm and the swept volume is converted to litres.",
      inputs: [
        { key: "bore", label: "Cylinder Bore", unit: "mm", placeholder: "500" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "2000" },
        { key: "vc", label: "Clearance Volume (Vc)", unit: "litre", placeholder: "15" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000) * 1000; // litre
        const cr = (vs + v.vc) / v.vc;
        return [
          { label: "Strok Hacmi (Vs)", value: `${vs.toFixed(1)} litre` },
          { label: "Compression Ratio (r)", value: `${cr.toFixed(1)}:1` },
        ];
      },
    },
    {
      id: "admiralty-coefficient",
      name: "Admiralty Coefficient",
      group: "Motor Performans",
      formula: "C = (Δ^(2/3) × V³) / P",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "ton" },
        { symbol: "V", label: "Speed", unit: "knot" },
        { symbol: "P", label: "Power", unit: "kW" },
      ],
      source: { code: "Ship propulsion — Admiralty (displacement) coefficient, speed-power relation" },
      inputs: [
        { key: "delta", label: "Deplasman (Δ)", unit: "ton", placeholder: "50000" },
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "14" },
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "10000" },
      ],
      calculate: (v) => {
        const c = (Math.pow(v.delta, 2 / 3) * Math.pow(v.v, 3)) / v.p;
        return [{ label: "Admiralty Coefficient (C)", value: c.toFixed(1) }];
      },
    },
    {
      id: "excess-air-ratio",
      name: "Excess Air Ratio (λ)",
      group: "Yanma ve Enjeksiyon",
      formula: "λ = m_air,actual / m_air,stoichiometric",
      variables: [
        { symbol: "m_air,actual", label: "Actual air/fuel ratio", unit: "kg/kg" },
        { symbol: "mhava,stok", label: "Stoichiometric air/fuel ratio", unit: "kg/kg" },
      ],
      source: { code: "Combustion theory — excess air ratio (diesel λ ≈ 1.5–2.5)" },
      inputs: [
        { key: "afr", label: "Actual Air/Fuel Ratio", unit: "kg/kg", placeholder: "42" },
        { key: "stoich", label: "Stokiyometrik Oran", unit: "kg/kg", placeholder: "14.7" },
      ],
      calculate: (v) => {
        const lambda = v.afr / v.stoich;
        const status = lambda < 1 ? "Rich Mixture" : lambda > 1.5 ? "Lean Mixture" : "Normal Range";
        return [
          { label: "Excess Air Ratio (λ)", value: lambda.toFixed(2) },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      id: "injection-pressure",
      name: "Injection Pressure",
      group: "Yanma ve Enjeksiyon",
      formula: "Pinj = F_spring / A_needle + P_cylinder",
      variables: [
        { symbol: "Fyay", label: "Yay kuvveti", unit: "N" },
        { symbol: "A_needle", label: "Needle cross-sectional area", unit: "m²" },
        { symbol: "Psilindir", label: "Cylinder pressure", unit: "Pa" },
      ],
      source: { code: "Fuel injection system (300–1000 bar mechanical, 1500–2500 bar common rail)" },
      note: "The spring force is entered in N, the needle area in mm² and the cylinder pressure in bar; the opening pressure is given in bar.",
      inputs: [
        { key: "fspring", label: "Yay Kuvveti (Fyay)", unit: "N", placeholder: "4000" },
        { key: "area", label: "Needle Cross-sectional Area (A)", unit: "mm²", placeholder: "20" },
        { key: "pcyl", label: "Cylinder Pressure (P_cylinder)", unit: "bar", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.area <= 0) return [{ label: "Hata", value: "The needle area must be positive" }];
        const pSpringBar = v.fspring / (v.area * 1e-6) / 1e5;
        const pInj = pSpringBar + v.pcyl;
        return [{ label: "Injection Pressure (Pinj)", value: `${pInj.toFixed(0)} bar` }];
      },
    },
    {
      id: "thermal-efficiency",
      name: "Thermal Efficiency",
      group: "Yanma ve Enjeksiyon",
      formula: "ηth = (BHP × 3600) / (ṁ_fuel × Hu)",
      variables: [
        { symbol: "BHP", label: "Brake power", unit: "kW" },
        { symbol: "ṁ_fuel", label: "Fuel consumption", unit: "kg/saat" },
        { symbol: "Hu", label: "Lower calorific value (LCV)", unit: "kJ/kg" },
      ],
      source: { code: "Engine theory — brake thermal efficiency" },
      note: "BHP (kW) × 3600 converts to hourly energy; the fuel is entered in kg/hour.",
      inputs: [
        { key: "bhp", label: "Brake Power (BHP)", unit: "kW", placeholder: "10000" },
        { key: "fc", label: "Fuel Consumption (ṁf)", unit: "kg/saat", placeholder: "1850" },
        { key: "lcv", label: "Lower Calorific Value (LCV)", unit: "kJ/kg", placeholder: "42700" },
      ],
      calculate: (v) => {
        const eta = (v.bhp * 3600) / (v.fc * v.lcv) * 100;
        return [{ label: "Termal Verim (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
  ],
};
