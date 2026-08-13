import { Zap } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Ship Electrical Systems — single source course content.
 * Formulas and calculators are merged into a SINGLE list; entries carrying
 * `calculate` appear on both the Formulas and the Calculations page.
 */
export const electrical: CourseTopic = {
  key: "electrical",
  title: "Ship Electrical Systems",
  icon: Zap,
  accent: "from-yellow-500 via-amber-500 to-orange-500",
  group: "machine",
  intro:
    "Basic electrical relations, three phase power, protection and cable calculations. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "ohms-law",
      name: "Ohm's Law",
      group: "Electrical Fundamentals",
      formula: "V = I × R",
      variables: [
        { symbol: "V", label: "Voltage", unit: "V" },
        { symbol: "I", label: "Current", unit: "A" },
        { symbol: "R", label: "Resistance", unit: "Ω" },
      ],
      source: { code: "Ohm's law" },
      note: "The current and the resistance are entered; the voltage V = I × R and the power P = V × I are calculated.",
      inputs: [
        { key: "i", label: "Current (I)", unit: "A", placeholder: "10" },
        { key: "r", label: "Resistance (R)", unit: "Ω", placeholder: "22" },
      ],
      calculate: (v) => {
        const volt = v.i * v.r;
        return [
          { label: "Voltage (V)", value: `${volt.toFixed(2)} V` },
          { label: "Power (P = V·I)", value: `${(volt * v.i).toFixed(1)} W` },
        ];
      },
    },
    {
      id: "three-phase-power",
      name: "Three Phase Power",
      group: "Electrical Fundamentals",
      formula: "P = √3 × VL × IL × cos(φ)",
      variables: [
        { symbol: "VL", label: "Line voltage", unit: "V" },
        { symbol: "IL", label: "Line current", unit: "A" },
        { symbol: "cos(φ)", label: "Power factor" },
      ],
      source: { code: "Three phase active power relation" },
      note: "The result is in W and converted to kW. The apparent power is S = √3 × VL × IL.",
      inputs: [
        { key: "v", label: "Line Voltage (VL)", unit: "V", placeholder: "440" },
        { key: "i", label: "Line Current (IL)", unit: "A", placeholder: "200" },
        { key: "pf", label: "Power Factor (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const p = Math.sqrt(3) * v.v * v.i * v.pf;
        const s = Math.sqrt(3) * v.v * v.i;
        return [
          { label: "Active Power (P)", value: `${(p / 1000).toFixed(1)} kW` },
          { label: "Apparent Power (S)", value: `${(s / 1000).toFixed(1)} kVA` },
        ];
      },
    },
    {
      id: "reactive-power",
      name: "Reactive Power",
      group: "Electrical Fundamentals",
      formula: "Q = P × tan(φ),  S = P / cos(φ)",
      variables: [
        { symbol: "P", label: "Active power", unit: "kW" },
        { symbol: "cos(φ)", label: "Power factor" },
        { symbol: "tan(φ)", label: "Reactive/active ratio" },
        { symbol: "Q", label: "Reactive power", unit: "kVAR" },
        { symbol: "S", label: "Apparent power", unit: "kVA" },
      ],
      source: { code: "Three phase reactive power (power triangle)" },
      note: "From P and cos(φ) the calculator obtains φ = arccos(pf), Q = P·tan(φ) and S = P/pf.",
      inputs: [
        { key: "p", label: "Active Power (P)", unit: "kW", placeholder: "300" },
        { key: "pf", label: "Power Factor (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const phi = Math.acos(v.pf);
        const q = v.p * Math.tan(phi);
        const s = v.p / v.pf;
        return [
          { label: "Reactive Power (Q)", value: `${q.toFixed(1)} kVAR` },
          { label: "Apparent Power (S)", value: `${s.toFixed(1)} kVA` },
          { label: "Phase Angle (φ)", value: `${(phi * 180 / Math.PI).toFixed(1)}°` },
        ];
      },
    },
    {
      id: "apparent-power",
      name: "Apparent Power",
      group: "Electrical Fundamentals",
      formula: "S = √(P² + Q²) = √3 × VL × IL",
      variables: [
        { symbol: "P", label: "Active power", unit: "kW" },
        { symbol: "Q", label: "Reactive power", unit: "kVAR" },
        { symbol: "S", label: "Apparent power", unit: "kVA" },
      ],
      source: { code: "Power triangle (apparent power)" },
      note: "The active and reactive power are entered; the apparent power S = √(P² + Q²) and the power factor cos(φ) = P/S are calculated.",
      inputs: [
        { key: "p", label: "Active Power (P)", unit: "kW", placeholder: "240" },
        { key: "q", label: "Reactive Power (Q)", unit: "kVAR", placeholder: "180" },
      ],
      calculate: (v) => {
        const s = Math.sqrt(v.p * v.p + v.q * v.q);
        const pf = s > 0 ? v.p / s : 0;
        return [
          { label: "Apparent Power (S)", value: `${s.toFixed(1)} kVA` },
          { label: "Power Factor (cos φ)", value: pf.toFixed(3) },
        ];
      },
    },
    {
      id: "generator-frequency",
      name: "Generator Frequency",
      group: "Electrical Fundamentals",
      formula: "f = (n × P) / 120",
      variables: [
        { symbol: "n", label: "Speed", unit: "rpm" },
        { symbol: "P", label: "Number of poles" },
        { symbol: "f", label: "Frequency", unit: "Hz" },
      ],
      source: { code: "Synchronous generator frequency-speed relation" },
      inputs: [
        { key: "n", label: "Speed (n)", unit: "rpm", placeholder: "720" },
        { key: "p", label: "Number of Poles (P)", unit: "", placeholder: "10" },
      ],
      calculate: (v) => {
        const f = (v.n * v.p) / 120;
        return [{ label: "Frequency (f)", value: `${f.toFixed(1)} Hz` }];
      },
    },
    {
      id: "short-circuit-current",
      name: "Short Circuit Current",
      group: "Protection and Cabling",
      formula: "Isc = V / (√3 × Z)",
      variables: [
        { symbol: "V", label: "Line voltage", unit: "V" },
        { symbol: "Z", label: "Total impedance", unit: "Ω" },
      ],
      source: { code: "Three phase short circuit current (impedance method)" },
      inputs: [
        { key: "v", label: "Line Voltage", unit: "V", placeholder: "440" },
        { key: "z", label: "Empedans (Z)", unit: "Ω", placeholder: "0.05" },
      ],
      calculate: (v) => {
        const isc = v.v / (Math.sqrt(3) * v.z);
        return [{ label: "Short Circuit Current", value: `${isc.toFixed(0)} A` }];
      },
    },
    {
      id: "voltage-drop",
      name: "Voltage Drop",
      group: "Protection and Cabling",
      formula: "ΔV = 2 × I × R × L × cos(φ)",
      variables: [
        { symbol: "I", label: "Current", unit: "A" },
        { symbol: "R", label: "Resistance per unit length", unit: "Ω/km" },
        { symbol: "L", label: "Cable length", unit: "m" },
        { symbol: "cos(φ)", label: "Power factor" },
      ],
      source: { code: "Cable voltage drop (out and return, IEC 60092)" },
      note: "The resistance per unit length is entered in Ω/km and converted to Ω/m in the calculation (÷1000). The drop ratio is given relative to a 440 V reference.",
      inputs: [
        { key: "i", label: "Current (I)", unit: "A", placeholder: "100" },
        { key: "r", label: "Resistance per Unit Length (R)", unit: "Ω/km", placeholder: "0.5" },
        { key: "l", label: "Cable Length (L)", unit: "m", placeholder: "50" },
        { key: "pf", label: "Power Factor", unit: "", placeholder: "0.85" },
      ],
      calculate: (v) => {
        const drop = 2 * v.i * (v.r / 1000) * v.l * v.pf;
        const dropPercent = (drop / 440) * 100;
        return [
          { label: "Voltage Drop", value: `${drop.toFixed(2)} V` },
          { label: "Drop Ratio (relative to 440 V)", value: `${dropPercent.toFixed(2)}%` },
        ];
      },
    },
    {
      id: "transformer-ratio",
      name: "Transformer Turns Ratio",
      group: "Protection and Cabling",
      formula: "a = V₁ / V₂ = I₂ / I₁",
      variables: [
        { symbol: "V₁", label: "Primary voltage", unit: "V" },
        { symbol: "V₂", label: "Secondary voltage", unit: "V" },
        { symbol: "I₁", label: "Primary current", unit: "A" },
        { symbol: "I₂", label: "Secondary current", unit: "A" },
      ],
      source: { code: "Ideal transformer turns ratio" },
      inputs: [
        { key: "v1", label: "Primary Voltage (V₁)", unit: "V", placeholder: "440" },
        { key: "v2", label: "Secondary Voltage (V₂)", unit: "V", placeholder: "220" },
        { key: "i1", label: "Primary Current (I₁)", unit: "A", placeholder: "50" },
      ],
      calculate: (v) => {
        const ratio = v.v1 / v.v2;
        const i2 = v.i1 * ratio;
        return [
          { label: "Turns Ratio", value: `${ratio.toFixed(2)}:1` },
          { label: "Secondary Current (I₂)", value: `${i2.toFixed(1)} A` },
        ];
      },
    },
    {
      id: "insulation-resistance",
      name: "Insulation Resistance",
      group: "Protection and Cabling",
      formula: "R_ins = V_test / I_leakage",
      variables: [
        { symbol: "Vtest", label: "Test voltage", unit: "V" },
        { symbol: "I_leakage", label: "Leakage current", unit: "mA" },
        { symbol: "Riz", label: "Insulation resistance", unit: "MΩ" },
      ],
      source: { code: "Insulation resistance measurement (SOLAS/IEC 60092, min 1 MΩ)" },
      note: "The leakage current is entered in mA and the test voltage in V; R = V/I (kΩ) is divided by 1000 to give MΩ.",
      inputs: [
        { key: "vtest", label: "Test Voltage", unit: "V", placeholder: "500" },
        { key: "ileak", label: "Leakage Current", unit: "mA", placeholder: "0.5" },
      ],
      calculate: (v) => {
        const ir = v.vtest / v.ileak; // kΩ → MΩ
        const status = ir >= 1000 ? "Compliant (≥1 MΩ)" : ir >= 100 ? "Caution (100 kΩ–1 MΩ)" : "Tehlikeli (<100kΩ)";
        return [
          { label: "Insulation Resistance", value: `${(ir / 1000).toFixed(2)} MΩ` },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
};
