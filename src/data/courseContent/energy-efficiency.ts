import { TrendingUp } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Enerji Verimliliği — tek kaynak ders içeriği.
 * Enerji verimliliği göstergeleri (EEDI, EEXI, CII, EEOI) ve atık ısı geri
 * kazanımı formülleri ilgili hesaplayıcılarla TEK listede birleştirildi;
 * `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const energyEfficiency: CourseTopic = {
  key: "energy-efficiency",
  title: "Energy Efficiency",
  icon: TrendingUp,
  accent: "from-lime-500 via-green-500 to-emerald-500",
  group: "machine",
  intro:
    "The IMO energy efficiency regime: design (EEDI/EEXI) and operational (CII/EEOI) " +
    "indicators together with waste heat recovery and speed optimisation. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "eedi",
      name: "EEDI (Energy Efficiency Design Index)",
      group: "Energy Efficiency Indicators",
      formula: "EEDI = (PME × SFOC × Cf) / (DWT × Vref)",
      variables: [
        { symbol: "PME", label: "Main engine power", unit: "kW" },
        { symbol: "SFOC", label: "Specific fuel consumption", unit: "g/kW·h" },
        { symbol: "Cf", label: "CO₂ conversion factor" },
        { symbol: "DWT", label: "Deadweight (capacity)", unit: "tonnes" },
        { symbol: "Vref", label: "Reference speed", unit: "knot" },
      ],
      source: { code: "MARPOL Annex VI Reg.21 — EEDI (mandatory upper limit for new ships)" },
      note: "The result is in g CO₂/(tonne·NM).",
      inputs: [
        { key: "p", label: "Engine Power (PME)", unit: "kW", placeholder: "15000" },
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "cf", label: "CO₂ Factor (Cf)", unit: "", placeholder: "3.114" },
        { key: "dwt", label: "DWT", unit: "tonnes", placeholder: "50000" },
        { key: "vref", label: "Reference Speed", unit: "knot", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const eedi = (v.p * v.sfoc * v.cf) / (v.dwt * v.vref);
        return [{ label: "EEDI", value: `${eedi.toFixed(2)} g CO₂/(tonne·NM)` }];
      },
    },
    {
      id: "eexi",
      name: "EEXI (Energy Efficiency Existing Ship Index)",
      group: "Energy Efficiency Indicators",
      formula: "EEXI = (PME × SFOCME × Cf + PAE × SFOCAE × Cf) / (DWT × Vref)",
      variables: [
        { symbol: "PME", label: "Main engine power", unit: "kW" },
        { symbol: "SFOCME", label: "Main engine specific fuel consumption", unit: "g/kW·h" },
        { symbol: "PAE", label: "Auxiliary engine power", unit: "kW" },
        { symbol: "SFOCAE", label: "Auxiliary engine specific fuel consumption", unit: "g/kW·h" },
        { symbol: "Cf", label: "CO₂ conversion factor" },
        { symbol: "DWT", label: "Deadweight (capacity)", unit: "tonnes" },
        { symbol: "Vref", label: "Reference speed", unit: "knot" },
      ],
      source: { code: "EEXI — MEPC.328(76) (mandatory for existing ships from 2023)" },
      note: "The result is in g CO₂/(tonne·NM).",
      inputs: [
        { key: "pme", label: "Main Engine Power (PME)", unit: "kW", placeholder: "15000" },
        { key: "sfocMe", label: "Main Engine SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "pae", label: "Auxiliary Engine Power (PAE)", unit: "kW", placeholder: "750" },
        { key: "sfocAe", label: "Auxiliary SFOC", unit: "g/kW·h", placeholder: "215" },
        { key: "cf", label: "CO₂ Factor", unit: "", placeholder: "3.114" },
        { key: "dwt", label: "DWT", unit: "tonnes", placeholder: "50000" },
        { key: "vref", label: "Reference Speed", unit: "knot", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const eexi = ((v.pme * v.sfocMe * v.cf) + (v.pae * v.sfocAe * v.cf)) / (v.dwt * v.vref);
        return [{ label: "EEXI", value: `${eexi.toFixed(2)} g CO₂/(tonne·NM)` }];
      },
    },
    {
      id: "cii-aer",
      name: "CII / AER (Annual Carbon Intensity)",
      group: "Energy Efficiency Indicators",
      formula: "CII (AER) = (CO₂_total × 10⁶) / (DWT × D_total)",
      variables: [
        { symbol: "CO₂_total", label: "Total annual CO₂ emissions", unit: "tonnes" },
        { symbol: "DWT", label: "Deadweight (capacity)", unit: "tonnes" },
        { symbol: "Dtoplam", label: "Total annual distance sailed", unit: "NM" },
      ],
      source: { code: "CII/AER — MEPC.328(76) (annual rating A–E)" },
      note: "The total CO₂ is entered in tonnes and converted to g by 10⁶; the result is in g CO₂/(DWT·NM). The AER is the indicator used in the CII calculation.",
      inputs: [
        { key: "co2", label: "Total CO₂ Emission", unit: "tonnes", placeholder: "25000" },
        { key: "dwt", label: "DWT", unit: "tonnes", placeholder: "50000" },
        { key: "dist", label: "Total Distance", unit: "NM", placeholder: "80000" },
      ],
      calculate: (v) => {
        const cii = (v.co2 * 1e6) / (v.dwt * v.dist);
        return [{ label: "CII (AER)", value: `${cii.toFixed(2)} g CO₂/(DWT·NM)` }];
      },
    },
    {
      id: "eeoi",
      name: "EEOI (Energy Efficiency Operational Indicator)",
      group: "Energy Efficiency Indicators",
      formula: "EEOI = (FC × Cf × 10⁶) / (Cargo × D)",
      variables: [
        { symbol: "FC", label: "Fuel consumption", unit: "tonnes" },
        { symbol: "Cf", label: "CO₂ conversion factor" },
        { symbol: "Cargo", label: "Cargo carried", unit: "tonnes" },
        { symbol: "D", label: "Distance", unit: "NM" },
      ],
      source: { code: "EEOI — MEPC.1/Circ.684 (voluntary operational indicator)" },
      note: "The fuel consumption is entered in tonnes and converted to g by 10⁶; the result is in g CO₂/(tonne·NM).",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "tonnes", placeholder: "500" },
        { key: "cf", label: "CO₂ Factor", unit: "", placeholder: "3.114" },
        { key: "cargo", label: "Cargo Carried", unit: "tonnes", placeholder: "40000" },
        { key: "dist", label: "Distance", unit: "NM", placeholder: "5000" },
      ],
      calculate: (v) => {
        const eeoi = (v.fc * v.cf * 1e6) / (v.cargo * v.dist);
        return [{ label: "EEOI", value: `${eeoi.toFixed(2)} g CO₂/(tonne·NM)` }];
      },
    },
    {
      id: "speed-reduction-fuel-saving",
      name: "Fuel Saving from Speed Reduction (Cube Rule)",
      group: "Waste Heat Recovery",
      formula: "FC₂ = FC₁ × (V₂ / V₁)³",
      variables: [
        { symbol: "V₁", label: "Current speed", unit: "knot" },
        { symbol: "V₂", label: "New speed", unit: "knot" },
        { symbol: "FC₁", label: "Current fuel consumption", unit: "tonnes/day" },
        { symbol: "FC₂", label: "New fuel consumption", unit: "tonnes/day" },
      ],
      source: { code: "SEEMP — speed optimisation (ship resistance ∝ the cube of the speed)" },
      note: "The propulsion power and the fuel consumption are proportional to the cube of the speed; saving (%) = (FC₁ − FC₂)/FC₁ × 100.",
      inputs: [
        { key: "v1", label: "Current Speed", unit: "knot", placeholder: "14" },
        { key: "v2", label: "New Speed", unit: "knot", placeholder: "12" },
        { key: "fc1", label: "Current Consumption", unit: "tonnes/day", placeholder: "35" },
      ],
      calculate: (v) => {
        const fc2 = v.fc1 * Math.pow(v.v2 / v.v1, 3);
        const saving = ((v.fc1 - fc2) / v.fc1) * 100;
        return [
          { label: "New Consumption", value: `${fc2.toFixed(1)} tonnes/day` },
          { label: "Saving", value: `${saving.toFixed(1)}%` },
        ];
      },
    },
    {
      id: "whr-power",
      name: "Waste Heat Recovery (WHRS)",
      group: "Waste Heat Recovery",
      formula: "PWHR = ṁegzoz × cp × ΔT × η",
      variables: [
        { symbol: "ṁegzoz", label: "Exhaust gas flow rate", unit: "kg/s" },
        { symbol: "cp", label: "Specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Exhaust temperature drop", unit: "K" },
        { symbol: "η", label: "WHR system efficiency" },
      ],
      source: { code: "Waste heat recovery system (WHRS) — exhaust energy balance" },
      note: "ΔT = T_in − T_out (a difference in K equals a difference in °C); the efficiency is entered as a percentage and converted to a ratio in the calculation.",
      inputs: [
        { key: "mexh", label: "Exhaust Flow Rate", unit: "kg/s", placeholder: "30" },
        { key: "texhIn", label: "Exhaust Inlet Temperature", unit: "°C", placeholder: "350" },
        { key: "texhOut", label: "Exhaust Outlet Temperature", unit: "°C", placeholder: "180" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "1.05" },
        { key: "eta", label: "System Efficiency", unit: "%", placeholder: "70" },
      ],
      calculate: (v) => {
        const qAvail = v.mexh * v.cp * (v.texhIn - v.texhOut);
        const qRecovered = qAvail * (v.eta / 100);
        return [
          { label: "Available Heat", value: `${qAvail.toFixed(0)} kW` },
          { label: "Recovered Energy", value: `${qRecovered.toFixed(0)} kW` },
        ];
      },
    },
    {
      id: "seemp-saving",
      name: "SEEMP Saving",
      group: "Waste Heat Recovery",
      formula: "Saving (%) = (FC_before − FC_after) / FC_before × 100",
      variables: [
        { symbol: "FC_before", label: "Fuel consumption before the measure", unit: "tonnes" },
        { symbol: "FC_after", label: "Fuel consumption after the measure", unit: "tonnes" },
      ],
      source: { code: "SEEMP — Ship Energy Efficiency Management Plan (MARPOL Annex VI Reg.22)" },
      note: "The fuel consumption before and after the measure is entered; the percentage and absolute savings are calculated.",
      inputs: [
        { key: "before", label: "Before (FC_before)", unit: "tonnes", placeholder: "1000" },
        { key: "after", label: "After (FC_after)", unit: "tonnes", placeholder: "920" },
      ],
      calculate: (v) => {
        if (v.before <= 0) return [{ label: "Error", value: "The consumption before must be positive" }];
        const saving = ((v.before - v.after) / v.before) * 100;
        return [
          { label: "Saving", value: `${saving.toFixed(1)} %` },
          { label: "Absolute Saving", value: `${(v.before - v.after).toFixed(1)} tonnes` },
        ];
      },
    },
  ],
};
