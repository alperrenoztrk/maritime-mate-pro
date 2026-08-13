import { Snowflake } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Refrigeration and Air Conditioning Systems — single source course content.
 * Formulas and calculators are merged into a SINGLE list; entries carrying
 * `calculate` appear on both the Formulas and the Calculations page.
 */
export const coolingHvac: CourseTopic = {
  key: "cooling-hvac",
  title: "Refrigeration and Air Conditioning Systems",
  icon: Snowflake,
  accent: "from-sky-500 via-cyan-500 to-teal-500",
  group: "machine",
  intro:
    "Refrigeration cycle, COP, refrigerant flow rate and HVAC load calculations. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "cop-cooling",
      name: "COP (Refrigeration)",
      group: "Refrigeration Cycle",
      formula: "COP = QL / Wcomp",
      variables: [
        { symbol: "QL", label: "Cooling capacity", unit: "kW" },
        { symbol: "Wcomp", label: "Compressor work", unit: "kW" },
      ],
      source: { code: "Refrigeration cycle coefficient of performance (COP) definition" },
      note: "Heat rejection QH = QL + Wcomp (conservation of energy).",
      inputs: [
        { key: "ql", label: "Cooling Capacity (QL)", unit: "kW", placeholder: "50" },
        { key: "wc", label: "Compressor Power (W)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const cop = v.ql / v.wc;
        const qh = v.ql + v.wc;
        return [
          { label: "COP", value: cop.toFixed(2) },
          { label: "Heat Rejection (QH)", value: `${qh.toFixed(1)} kW` },
        ];
      },
    },
    {
      id: "cop-heat-pump",
      name: "COP (Heat Pump)",
      group: "Refrigeration Cycle",
      formula: "COP_HP = QH / Wcomp = COP_cooling + 1",
      variables: [
        { symbol: "QH", label: "Heating capacity", unit: "kW" },
        { symbol: "Wcomp", label: "Compressor work", unit: "kW" },
      ],
      source: { code: "Heat pump coefficient of performance definition" },
      note: "The heating capacity and the compressor power are entered; COP_HP = QH/W and COP_cooling = COP_HP − 1.",
      inputs: [
        { key: "qh", label: "Heating Capacity (QH)", unit: "kW", placeholder: "65" },
        { key: "wc", label: "Compressor Power (W)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.wc <= 0) return [{ label: "Error", value: "The compressor power must be positive" }];
        const cop = v.qh / v.wc;
        return [
          { label: "COP (Heat Pump)", value: cop.toFixed(2) },
          { label: "COP (Refrigeration)", value: (cop - 1).toFixed(2) },
        ];
      },
    },
    {
      id: "carnot-cop-cooling",
      name: "Carnot COP (Refrigeration)",
      group: "Refrigeration Cycle",
      formula: "COPCarnot = TL / (TH − TL)",
      variables: [
        { symbol: "TL", label: "Absolute temperature of the cold space", unit: "K" },
        { symbol: "TH", label: "Absolute temperature of the hot space", unit: "K" },
      ],
      source: { code: "Reversed Carnot cycle (ideal refrigeration COP)" },
      note: "Inputs are taken in °C and converted to absolute temperature (K) in the calculation: T(K) = T(°C) + 273.15.",
      inputs: [
        { key: "tl", label: "Cold Space (TL)", unit: "°C", placeholder: "-18" },
        { key: "th", label: "Hot Space (TH)", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        const TL = v.tl + 273.15;
        const TH = v.th + 273.15;
        const copCarnot = TL / (TH - TL);
        return [{ label: "Carnot COP", value: copCarnot.toFixed(2) }];
      },
    },
    {
      id: "cooling-capacity",
      name: "Cooling Capacity",
      group: "Refrigeration Cycle",
      formula: "Q̇ = ṁ × (h₁ − h₄)",
      variables: [
        { symbol: "ṁ", label: "Refrigerant flow rate", unit: "kg/s" },
        { symbol: "h₁", label: "Enthalpy at the evaporator outlet", unit: "kJ/kg" },
        { symbol: "h₄", label: "Enthalpy at the evaporator inlet", unit: "kJ/kg" },
      ],
      source: { code: "Evaporator energy balance (refrigerating effect)" },
      note: "The refrigerant flow rate is entered in kg/s; the cooling capacity is Q̇ = ṁ × (h₁ − h₄) (kW).",
      inputs: [
        { key: "mdot", label: "Refrigerant Flow Rate (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "h1", label: "Evaporator Outlet (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h4", label: "Evaporator Inlet (h₄)", unit: "kJ/kg", placeholder: "250" },
      ],
      calculate: (v) => {
        const q = v.mdot * (v.h1 - v.h4);
        return [{ label: "Cooling Capacity (Q̇)", value: `${q.toFixed(2)} kW` }];
      },
    },
    {
      id: "refrigerant-mass-flow",
      name: "Refrigerant Flow Rate",
      group: "Refrigeration Cycle",
      formula: "ṁ = QL / (h₁ − h₄)",
      variables: [
        { symbol: "QL", label: "Cooling capacity", unit: "kW" },
        { symbol: "h₁", label: "Enthalpy at the evaporator outlet", unit: "kJ/kg" },
        { symbol: "h₄", label: "Enthalpy at the evaporator inlet", unit: "kJ/kg" },
      ],
      source: { code: "Mass flow rate from the evaporator energy balance" },
      inputs: [
        { key: "ql", label: "Cooling Capacity (QL)", unit: "kW", placeholder: "50" },
        { key: "h1", label: "Evaporator Outlet (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h4", label: "Evaporator Inlet (h₄)", unit: "kJ/kg", placeholder: "250" },
      ],
      calculate: (v) => {
        const mdot = v.ql / (v.h1 - v.h4);
        return [{ label: "Mass Flow Rate (ṁ)", value: `${mdot.toFixed(3)} kg/s` }];
      },
    },
    {
      id: "compressor-work",
      name: "Compressor Work",
      group: "Refrigeration Cycle",
      formula: "W = ṁ × (h₂ − h₁)",
      variables: [
        { symbol: "ṁ", label: "Refrigerant flow rate", unit: "kg/s" },
        { symbol: "h₂", label: "Enthalpy at the compressor outlet", unit: "kJ/kg" },
        { symbol: "h₁", label: "Enthalpy at the compressor inlet", unit: "kJ/kg" },
      ],
      source: { code: "Compressor energy balance (isentropic work)" },
      inputs: [
        { key: "mdot", label: "Mass Flow Rate (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "h1", label: "Compressor Inlet (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h2", label: "Compressor Outlet (h₂)", unit: "kJ/kg", placeholder: "450" },
      ],
      calculate: (v) => {
        const w = v.mdot * (v.h2 - v.h1);
        return [{ label: "Compressor Power (W)", value: `${w.toFixed(2)} kW` }];
      },
    },
    {
      id: "cooling-load",
      name: "Cooling Load",
      group: "Air Conditioning Calculations",
      formula: "Q = U·A·ΔT + Q_air + Q_internal",
      variables: [
        { symbol: "U", label: "Heat transfer coefficient", unit: "W/m²·K" },
        { symbol: "A", label: "Wall area", unit: "m²" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
        { symbol: "Qhava", label: "Fresh air load", unit: "kW" },
        { symbol: "Q_internal", label: "Internal heat sources", unit: "kW" },
      ],
      source: { code: "Cooling load calculation (conduction + safety margin)" },
      note: "This calculator obtains the conduction load from U·A·ΔT and adds a 25% safety margin.",
      inputs: [
        { key: "vol", label: "Store Volume", unit: "m³", placeholder: "200" },
        { key: "tout", label: "Outside Temperature", unit: "°C", placeholder: "35" },
        { key: "tin", label: "Inside Temperature", unit: "°C", placeholder: "-18" },
        { key: "u", label: "Wall U Value", unit: "W/m²·K", placeholder: "0.3" },
        { key: "area", label: "Total Wall Area", unit: "m²", placeholder: "180" },
      ],
      calculate: (v) => {
        const qTransmission = v.u * v.area * (v.tout - v.tin);
        const qTotal = qTransmission * 1.25; // 25% safety margin
        return [
          { label: "Conduction Load", value: `${(qTransmission / 1000).toFixed(2)} kW` },
          { label: "Total Load (25% margin)", value: `${(qTotal / 1000).toFixed(2)} kW` },
        ];
      },
    },
    {
      id: "dehumidification",
      name: "Dehumidification Capacity",
      group: "Air Conditioning Calculations",
      formula: "ṁw = ṁa × (ω₁ − ω₂)",
      variables: [
        { symbol: "ṁa", label: "Air mass flow rate", unit: "kg/s" },
        { symbol: "ω₁", label: "Inlet humidity ratio", unit: "g/kg" },
        { symbol: "ω₂", label: "Outlet humidity ratio", unit: "g/kg" },
      ],
      source: { code: "Psychrometric mass balance (dehumidification)" },
      note: "The air flow rate is entered in m³/h; ṁa = Q × ρ / 3600 (kg/s). Divide the humidity ratio by 1000 to convert g/kg → kg/kg. The latent load ≈ ṁw × 2450 kJ/kg.",
      inputs: [
        { key: "q", label: "Air Flow Rate", unit: "m³/h", placeholder: "5000" },
        { key: "w1", label: "Inlet Humidity Ratio (W₁)", unit: "g/kg", placeholder: "14" },
        { key: "w2", label: "Outlet Humidity Ratio (W₂)", unit: "g/kg", placeholder: "8" },
        { key: "rho", label: "Air Density (ρ)", unit: "kg/m³", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const mAir = v.q * v.rho / 3600; // kg/s
        const moisture = mAir * (v.w1 - v.w2) / 1000; // kg/s water removed
        return [
          { label: "Dehumidification Capacity", value: `${(moisture * 3600).toFixed(2)} kg/h` },
          { label: "Latent Load", value: `${(moisture * 2450).toFixed(1)} kW` },
        ];
      },
    },
  ],
};
