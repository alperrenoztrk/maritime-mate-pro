import { Thermometer } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yakıt Teknolojisi ve Yönetimi — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const fuelTechnology: CourseTopic = {
  key: "fuel-technology",
  title: "Fuel Technology and Management",
  icon: Thermometer,
  accent: "from-orange-600 via-red-600 to-rose-600",
  group: "machine",
  intro:
    "Fuel properties, quality indices, treatment and bunker management. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "ccai",
      name: "CCAI (Calculated Carbon Aromaticity Index)",
      group: "Fuel Properties",
      formula: "CCAI = D − 140,7·log(log(ν₅₀ + 0,85)) − 80,6",
      variables: [
        { symbol: "D", label: "Density at 15 °C", unit: "kg/m³" },
        { symbol: "ν₅₀", label: "Kinematic viscosity at 50 °C", unit: "cSt" },
      ],
      source: { code: "ISO 8217 — calculated carbon aromaticity index (CCAI)" },
      inputs: [
        { key: "d", label: "Density at 15 °C (D)", unit: "kg/m³", placeholder: "991" },
        { key: "v", label: "Viscosity at 50 °C (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (vals) => {
        const ccai = vals.d - 140.7 * Math.log10(Math.log10(vals.v + 0.85)) - 80.6;
        const quality = ccai < 840 ? "Good" : ccai < 870 ? "Acceptable" : "Poor ignition quality";
        return [
          { label: "CCAI", value: ccai.toFixed(0) },
          { label: "Kalite", value: quality },
        ];
      },
    },
    {
      id: "fuel-heating-value",
      name: "Fuel Calorific Value",
      group: "Fuel Properties",
      formula: "Hu ≈ 46,704 − 8,802·d² + 3,167·d",
      variables: [
        { symbol: "d", label: "Density at 15 °C", unit: "kg/L" },
        { symbol: "Hu", label: "Lower calorific value", unit: "MJ/kg" },
      ],
      source: { code: "ISO 8217 — density based lower calorific value approximation" },
      note: "The density is entered in kg/L (e.g. 0.991); the lower calorific value Hu is estimated in MJ/kg.",
      inputs: [
        { key: "d", label: "Density @15 °C (d)", unit: "kg/L", placeholder: "0.991" },
      ],
      calculate: (v) => {
        const hu = 46.704 - 8.802 * v.d * v.d + 3.167 * v.d;
        return [
          { label: "Lower Calorific Value (Hu)", value: `${hu.toFixed(2)} MJ/kg` },
          { label: "Lower Calorific Value", value: `${(hu * 1000).toFixed(0)} kJ/kg` },
        ];
      },
    },
    {
      id: "viscosity-conversion",
      name: "Viscosity Conversion",
      group: "Fuel Properties",
      formula: "1 cSt = 1 mm²/s",
      variables: [
        { symbol: "ν", label: "Kinematic viscosity", unit: "cSt = mm²/s" },
      ],
      source: { code: "Kinematic viscosity unit equivalence (Redwood No.1 ≈ 4.05 × cSt)" },
      note: "1 cSt = 1 mm²/s. Approximate conversions: Redwood No.1 ≈ 4.05 × cSt; Saybolt Universal (SSU) ≈ 4.635 × cSt.",
      inputs: [
        { key: "v", label: "Kinematic Viscosity (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (v) => {
        return [
          { label: "mm²/s", value: `${v.v.toFixed(1)} mm²/s` },
          { label: "Redwood No.1 (≈)", value: `${(v.v * 4.05).toFixed(0)} s` },
          { label: "Saybolt SSU (≈)", value: `${(v.v * 4.635).toFixed(0)} s` },
        ];
      },
    },
    {
      id: "fuel-heating-temperature",
      name: "Fuel Heating Temperature",
      group: "Fuel Treatment",
      formula: "T = 50 + (ln(ν₅₀ / ν_target) / ln(1.055))",
      variables: [
        { symbol: "ν₅₀", label: "Viscosity at 50 °C", unit: "cSt" },
        { symbol: "ν_target", label: "Target (injection) viscosity", unit: "cSt" },
        { symbol: "T", label: "Estimated heating temperature", unit: "°C" },
      ],
      source: { code: "Walther viscosity-temperature relation (approximate solution)" },
      note: "Estimates the heating temperature required to reach the HFO injection viscosity.",
      inputs: [
        { key: "v50", label: "Viscosity @50 °C", unit: "cSt", placeholder: "380" },
        { key: "vTarget", label: "Target Viscosity", unit: "cSt", placeholder: "15" },
      ],
      calculate: (v) => {
        // Walther denklemi yaklaşık çözümü
        const t = 50 + (Math.log(v.v50 / v.vTarget) / Math.log(1.055)) * 1;
        return [{ label: "Estimated Heating Temperature", value: `${t.toFixed(0)} °C` }];
      },
    },
    {
      id: "fuel-density-correction",
      name: "Fuel Density Correction",
      group: "Fuel Treatment",
      formula: "ρT = ρ₁₅ − 0,00065·ρ₁₅·(T − 15)",
      variables: [
        { symbol: "ρ₁₅", label: "Density at 15 °C", unit: "kg/m³" },
        { symbol: "T", label: "Current temperature", unit: "°C" },
        { symbol: "ρT", label: "Corrected density", unit: "kg/m³" },
      ],
      source: { code: "ASTM D1250 / density-temperature correction (approximate HFO coefficient)" },
      note: "Approximate correction coefficient for HFO: 0.00065 /°C.",
      inputs: [
        { key: "d15", label: "Density @15 °C", unit: "kg/m³", placeholder: "991" },
        { key: "t", label: "Current Temperature", unit: "°C", placeholder: "130" },
      ],
      calculate: (v) => {
        // Yaklaşık düzeltme katsayısı: 0.00065 per °C (HFO için)
        const dT = v.d15 - 0.00065 * v.d15 * (v.t - 15);
        return [{ label: "Corrected Density", value: `${dT.toFixed(1)} kg/m³` }];
      },
    },
    {
      id: "heating-power",
      name: "Heating Power",
      group: "Fuel Treatment",
      formula: "Q̇ = ṁ·cp·ΔT",
      variables: [
        { symbol: "ṁ", label: "Fuel flow rate", unit: "kg/s" },
        { symbol: "cp", label: "Specific heat (~2 kJ/kg·K for HFO)", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature rise", unit: "K" },
      ],
      source: { code: "Sensible heat relation (fuel pre-heating)" },
      note: "The fuel flow rate is entered in kg/s; the required heating power is calculated as Q̇ = ṁ·cp·ΔT (kW).",
      inputs: [
        { key: "mdot", label: "Fuel Flow Rate (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "2.0" },
        { key: "dt", label: "Temperature Rise (ΔT)", unit: "K", placeholder: "90" },
      ],
      calculate: (v) => {
        const q = v.mdot * v.cp * v.dt;
        return [{ label: "Heating Power (Q̇)", value: `${q.toFixed(1)} kW` }];
      },
    },
    {
      id: "settling-tank-time",
      name: "Settling Tank Time",
      group: "Fuel Treatment",
      formula: "t ≥ 24 hours",
      variables: [
        { symbol: "t", label: "Settling time", unit: "h" },
      ],
      source: { code: "ISO 8217 — settling tank practice (HFO at 70 °C, gravity settling)" },
      note: "The recommended settling time for HFO is ≥ 24 hours. The planned time is entered and assessed against the limit.",
      inputs: [
        { key: "t", label: "Planned Settling Time", unit: "h", placeholder: "24" },
      ],
      calculate: (v) => {
        const margin = v.t - 24;
        return [
          { label: "Margin to the Limit", value: `${margin.toFixed(1)} h` },
          { label: "Uygunluk", value: margin >= 0 ? "COMPLIANT (≥24 hours)" : "INSUFFICIENT (<24 hours)" },
        ];
      },
    },
    {
      id: "bunker-quantity",
      name: "Bunker Quantity Calculation",
      group: "Bunker Management",
      formula: "Bunker = (SFOC × P × 24 / 10⁶) × days × (1 + margin/100)",
      variables: [
        { symbol: "SFOC", label: "Specific fuel consumption", unit: "g/kW·h" },
        { symbol: "P", label: "Engine power", unit: "kW" },
        { symbol: "days", label: "Voyage time", unit: "days" },
        { symbol: "pay", label: "Safety margin", unit: "%" },
      ],
      source: { code: "Bunker planning (SFOC × power × time + safety margin)" },
      note: "SFOC is in g/kW·h; multiply by 24/10⁶ for tonnes per day. The safety margin is added as a percentage.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "185" },
        { key: "p", label: "Engine Power", unit: "kW", placeholder: "10000" },
        { key: "days", label: "Passage Time", unit: "days", placeholder: "15" },
        { key: "margin", label: "Safety Margin", unit: "%", placeholder: "10" },
      ],
      calculate: (v) => {
        const daily = (v.sfoc * v.p * 24) / 1e6;
        const total = daily * v.days;
        const withMargin = total * (1 + v.margin / 100);
        return [
          { label: "Daily Consumption", value: `${daily.toFixed(1)} tonnes/day` },
          { label: "Total Requirement", value: `${total.toFixed(1)} tonnes` },
          { label: "Including Safety Margin", value: `${withMargin.toFixed(1)} tonnes` },
        ];
      },
    },
  ],
};
