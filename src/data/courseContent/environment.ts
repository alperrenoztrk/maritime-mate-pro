import { Leaf } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Shipping and Environmental Protection — single source course content.
 * The formulas are taken verbatim from the existing EmissionFormulas page and
 * the calculators apply exactly those expressions.
 */
export const environment: CourseTopic = {
  key: "environment",
  title: "Shipping and Environmental Protection",
  icon: Leaf,
  accent: "from-emerald-600 via-green-600 to-teal-700",
  group: "deck",
  intro:
    "Emission calculations (CO₂, SOx, NOx, PM) and energy efficiency indicators " +
    "(EEDI, EEXI, CII, AER). Each formula is followed by the tool that calculates it.",
  advancedTool: { label: "Advanced Emission Tools", href: "/environment/calculations" },
  entries: [
    {
      id: "co2-emission",
      name: "CO₂ Emission",
      group: "Emisyonlar",
      formula: "CO₂ (tonnes) = Fuel (tonnes) × CF",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "CF", label: "Carbon factor", unit: "t CO₂/t fuel" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "MEPC.245(66) — CF values" },
      note: "CF: HFO 3.114 · MDO/MGO 3.206 · LNG 2.750 (t CO₂/t fuel).",
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "cf", label: "Carbon Factor (CF)", unit: "", placeholder: "3.114" },
      ],
      calculate: (v) => [{ label: "CO₂", value: `${(v.fuel * v.cf).toFixed(1)} tonnes` }],
    },
    {
      id: "sox-emission",
      name: "SOx Emission",
      group: "Emisyonlar",
      formula: "SOx (kg) = Fuel (tonnes) × S% × 20",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "S%", label: "Fuel sulphur content", unit: "% m/m" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Regulation 14 — sulphur limit" },
      note: "The factor 20 includes the conversion of the sulphur mass to SO₂ (1 t of fuel = 10 kg per %S × 2).",
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "s", label: "Sulphur (S%)", unit: "%", placeholder: "0.5" },
      ],
      calculate: (v) => [{ label: "SOx", value: `${(v.fuel * v.s * 20).toFixed(1)} kg` }],
    },
    {
      id: "nox-emission",
      name: "NOx Emission",
      group: "Emisyonlar",
      formula: "NOx (kg) = P (kW) × t (h) × EF / 1000",
      variables: [
        { symbol: "P", label: "Engine power", unit: "kW" },
        { symbol: "t", label: "Running time", unit: "h" },
        { symbol: "EF", label: "Emission factor", unit: "g/kWh" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Regulation 13 — NOx Tier limits" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "t", label: "Time (t)", unit: "h", placeholder: "24" },
        { key: "ef", label: "Emission Factor (EF)", unit: "g/kWh", placeholder: "14" },
      ],
      calculate: (v) => [{ label: "NOx", value: `${((v.p * v.t * v.ef) / 1000).toFixed(1)} kg` }],
    },
    {
      id: "pm-emission",
      name: "Particulate Matter (PM)",
      group: "Emisyonlar",
      formula: "PM (kg) = Fuel (tonnes) × EF_PM",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "EFPM", label: "PM emission factor", unit: "kg/t" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Particulate matter emission" },
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "efpm", label: "EFPM", unit: "kg/t", placeholder: "7.6" },
      ],
      calculate: (v) => [{ label: "PM", value: `${(v.fuel * v.efpm).toFixed(1)} kg` }],
    },
    {
      id: "eexi",
      name: "EEXI",
      group: "Energy Efficiency",
      formula: "EEXI = (P × CF × SFC) / (Capacity × Vref)",
      variables: [
        { symbol: "P", label: "Main engine power", unit: "kW" },
        { symbol: "CF", label: "Carbon factor", unit: "t CO₂/t" },
        { symbol: "SFC", label: "Specific fuel consumption", unit: "g/kWh" },
        { symbol: "Capacity", label: "Capacity (DWT)", unit: "t" },
        { symbol: "Vref", label: "Reference speed", unit: "kn" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "EEXI — MEPC.333(76)" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "cf", label: "CF", unit: "", placeholder: "3.114" },
        { key: "sfc", label: "SFC", unit: "g/kWh", placeholder: "180" },
        { key: "cap", label: "Capacity", unit: "t", placeholder: "50000" },
        { key: "vref", label: "Vref", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        const denom = v.cap * v.vref;
        if (denom <= 0) return [{ label: "Error", value: "The capacity and Vref must be positive" }];
        return [{ label: "EEXI", value: `${((v.p * v.cf * v.sfc) / denom).toFixed(2)} g CO₂/t·NM` }];
      },
    },
    {
      id: "cii",
      name: "CII (Carbon Intensity Indicator)",
      group: "Energy Efficiency",
      formula: "CII = Annual CO₂ / (Capacity × Distance)",
      variables: [
        { symbol: "Annual CO₂", label: "Total annual CO₂", unit: "g" },
        { symbol: "Capacity", label: "Capacity (DWT)", unit: "t" },
        { symbol: "Distance", label: "Annual distance", unit: "NM" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "CII — MEPC.336(76); derece A–E" },
      inputs: [
        { key: "co2", label: "Annual CO₂", unit: "g", placeholder: "300000000000" },
        { key: "cap", label: "Capacity", unit: "t", placeholder: "50000" },
        { key: "dist", label: "Distance", unit: "NM", placeholder: "60000" },
      ],
      calculate: (v) => {
        const denom = v.cap * v.dist;
        if (denom <= 0) return [{ label: "Error", value: "The capacity and the distance must be positive" }];
        return [{ label: "CII", value: `${(v.co2 / denom).toFixed(3)} g CO₂/t·NM` }];
      },
    },
    {
      id: "aer",
      name: "AER (Annual Efficiency Ratio)",
      group: "Energy Efficiency",
      formula: "AER = ∑CO₂ / (DWT × ∑Distance)",
      variables: [
        { symbol: "∑CO₂", label: "Total annual CO₂", unit: "g" },
        { symbol: "DWT", label: "Transport capacity", unit: "t" },
        { symbol: "∑Distance", label: "Total annual distance", unit: "NM" },
      ],
      source: { code: "IMO — AER (used in the CII calculation)" },
      inputs: [
        { key: "co2", label: "∑CO₂", unit: "g", placeholder: "300000000000" },
        { key: "dwt", label: "DWT", unit: "t", placeholder: "50000" },
        { key: "dist", label: "∑Distance", unit: "NM", placeholder: "60000" },
      ],
      calculate: (v) => {
        const denom = v.dwt * v.dist;
        if (denom <= 0) return [{ label: "Error", value: "The DWT and the distance must be positive" }];
        return [{ label: "AER", value: `${(v.co2 / denom).toFixed(3)} g CO₂/t·NM` }];
      },
    },
    {
      id: "foc",
      name: "Daily Fuel Oil Consumption (FOC)",
      group: "Fuel and Energy",
      formula: "FOC (tonnes/day) = P (kW) × SFOC (g/kWh) × 24 / 10⁶",
      variables: [
        { symbol: "P", label: "Engine power", unit: "kW" },
        { symbol: "SFOC", label: "Specific fuel consumption", unit: "g/kWh" },
      ],
      source: { code: "Fuel consumption — SFOC relation" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "sfoc", label: "SFOC", unit: "g/kWh", placeholder: "180" },
      ],
      calculate: (v) => [{ label: "FOC", value: `${((v.p * v.sfoc * 24) / 1e6).toFixed(2)} tonnes/day` }],
    },
    {
      id: "shaft-energy",
      name: "Shaft Energy",
      group: "Fuel and Energy",
      formula: "E = P (kW) × t (h)",
      variables: [
        { symbol: "P", label: "Power", unit: "kW" },
        { symbol: "t", label: "Duration", unit: "h" },
      ],
      source: { code: "Energy = power × time" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "t", label: "Time (t)", unit: "h", placeholder: "24" },
      ],
      calculate: (v) => [{ label: "Enerji (E)", value: `${(v.p * v.t).toFixed(0)} kWh` }],
    },
    {
      id: "eedi",
      name: "EEDI",
      group: "Energy Efficiency",
      formula: "EEDI = (∑P × CF × SFC) / (fi × Capacity × Vref)",
      variables: [
        { symbol: "∑P", label: "Total engine power", unit: "kW" },
        { symbol: "CF", label: "Carbon factor" },
        { symbol: "SFC", label: "Specific fuel consumption", unit: "g/kWh" },
        { symbol: "fi", label: "Capacity correction factor" },
        { symbol: "Capacity", label: "Capacity (DWT)", unit: "t" },
        { symbol: "Vref", label: "Reference speed", unit: "kn" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "EEDI — MEPC.245(66)" },
      inputs: [
        { key: "p", label: "∑Power", unit: "kW", placeholder: "8000" },
        { key: "cf", label: "CF", unit: "", placeholder: "3.114" },
        { key: "sfc", label: "SFC", unit: "g/kWh", placeholder: "180" },
        { key: "fi", label: "fi", unit: "", placeholder: "1" },
        { key: "cap", label: "Capacity", unit: "t", placeholder: "50000" },
        { key: "vref", label: "Vref", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        const denom = v.fi * v.cap * v.vref;
        if (denom <= 0) return [{ label: "Error", value: "fi, the capacity and Vref must be positive" }];
        return [{ label: "EEDI", value: `${((v.p * v.cf * v.sfc) / denom).toFixed(2)} g CO₂/t·NM` }];
      },
    },
  ],
};
