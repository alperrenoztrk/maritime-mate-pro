import { Radio } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Denizde Haberleşme — tek kaynak ders içeriği.
 * GMDSS/telsiz için gerçek RF/ITU bağıntıları; her formül bağlı hesaplayıcıyla.
 */
export const communication: CourseTopic = {
  key: "communication",
  title: "Maritime Communications",
  icon: Radio,
  accent: "from-cyan-500 via-blue-500 to-indigo-500",
  group: "deck",
  intro:
    "Wavelength, radio horizon, gain (dB), free space path loss and Doppler. " +
    "Each formula is followed by the tool that calculates it.",
  entries: [
    {
      id: "wavelength",
      name: "Wavelength",
      group: "Wave Fundamentals",
      formula: "λ = c / f",
      variables: [
        { symbol: "c", label: "Speed of light", unit: "3×10⁸ m/s" },
        { symbol: "f", label: "Frequency", unit: "Hz" },
      ],
      source: { code: "Electromagnetic wave relation" },
      note: "The frequency is entered in MHz and converted to Hz in the calculation (×10⁶).",
      inputs: [{ key: "f", label: "Frequency (f)", unit: "MHz", placeholder: "156.8" }],
      calculate: (v) => {
        if (v.f <= 0) return [{ label: "Error", value: "The frequency must be positive" }];
        const lambda = 3e8 / (v.f * 1e6);
        return [{ label: "Wavelength (λ)", value: `${lambda.toFixed(3)} m` }];
      },
    },
    {
      id: "period-frequency",
      name: "Period–Frequency",
      group: "Wave Fundamentals",
      formula: "T = 1 / f",
      variables: [
        { symbol: "T", label: "Period", unit: "s" },
        { symbol: "f", label: "Frequency", unit: "Hz" },
      ],
      source: { code: "Period-frequency definition" },
      note: "The frequency is entered in MHz; the result is in microseconds (µs).",
      inputs: [{ key: "f", label: "Frequency (f)", unit: "MHz", placeholder: "2.182" }],
      calculate: (v) => {
        if (v.f <= 0) return [{ label: "Error", value: "The frequency must be positive" }];
        const tUs = 1 / (v.f * 1e6) * 1e6;
        return [{ label: "Period (T)", value: `${tUs.toFixed(4)} µs` }];
      },
    },
    {
      id: "radio-horizon",
      name: "Radio Horizon (VHF Range)",
      group: "Coverage and Range",
      formula: "d (NM) ≈ 2.23 × (√htx + √hrx)",
      variables: [
        { symbol: "htx", label: "Transmitter antenna height", unit: "m" },
        { symbol: "hrx", label: "Receiver antenna height", unit: "m" },
      ],
      source: { code: "Radio horizon approximation" },
      note: "About 15% beyond the optical horizon; the result is in nautical miles (NM). h is entered in metres.",
      inputs: [
        { key: "htx", label: "Transmitter Height", unit: "m", placeholder: "15" },
        { key: "hrx", label: "Receiver Height", unit: "m", placeholder: "9" },
      ],
      calculate: (v) => {
        if (v.htx < 0 || v.hrx < 0) return [{ label: "Error", value: "The height cannot be negative" }];
        const d = 2.23 * (Math.sqrt(v.htx) + Math.sqrt(v.hrx));
        return [{ label: "Range (d)", value: `${d.toFixed(1)} NM` }];
      },
    },
    {
      id: "decibel-gain",
      name: "Gain / Attenuation (dB)",
      group: "Signal Level",
      formula: "G (dB) = 10 · log₁₀(P_out / P_in)",
      variables: [
        { symbol: "P_out", label: "Output power", unit: "W" },
        { symbol: "P_in", label: "Input power", unit: "W" },
      ],
      source: { code: "Decibel (power ratio) definition" },
      inputs: [
        { key: "pout", label: "Output Power", unit: "W", placeholder: "25" },
        { key: "pin", label: "Input Power", unit: "W", placeholder: "1" },
      ],
      calculate: (v) => {
        if (v.pin <= 0 || v.pout <= 0) return [{ label: "Error", value: "The powers must be positive" }];
        const db = 10 * Math.log10(v.pout / v.pin);
        return [{ label: "Gain", value: `${db.toFixed(2)} dB` }];
      },
    },
    {
      id: "fspl",
      name: "Free Space Path Loss (FSPL)",
      group: "Signal Level",
      formula: "FSPL (dB) = 20·log₁₀(d) + 20·log₁₀(f) + 32.44",
      variables: [
        { symbol: "d", label: "Distance", unit: "km" },
        { symbol: "f", label: "Frequency", unit: "MHz" },
      ],
      source: { code: "Friis — free space path loss (d: km, f: MHz)" },
      inputs: [
        { key: "d", label: "Distance (d)", unit: "km", placeholder: "30" },
        { key: "f", label: "Frequency (f)", unit: "MHz", placeholder: "156.8" },
      ],
      calculate: (v) => {
        if (v.d <= 0 || v.f <= 0) return [{ label: "Error", value: "d and f must be positive" }];
        const fspl = 20 * Math.log10(v.d) + 20 * Math.log10(v.f) + 32.44;
        return [{ label: "FSPL", value: `${fspl.toFixed(2)} dB` }];
      },
    },
    {
      id: "eirp",
      name: "EIRP (Effective Isotropic Radiated Power)",
      group: "Signal Level",
      formula: "EIRP (dBW) = P_tx + G_antenna − L_loss",
      variables: [
        { symbol: "Pverici", label: "Transmitter power", unit: "dBW" },
        { symbol: "Ganten", label: "Antenna gain", unit: "dBi" },
        { symbol: "L_loss", label: "Line/connector loss", unit: "dB" },
      ],
      source: { code: "EIRP definition (antenna link budget)" },
      inputs: [
        { key: "ptx", label: "Transmitter Power", unit: "dBW", placeholder: "14" },
        { key: "g", label: "Antenna Gain", unit: "dBi", placeholder: "6" },
        { key: "l", label: "Loss", unit: "dB", placeholder: "2" },
      ],
      calculate: (v) => [{ label: "EIRP", value: `${(v.ptx + v.g - v.l).toFixed(2)} dBW` }],
    },
    {
      id: "doppler-shift",
      name: "Doppler Shift",
      group: "Wave Fundamentals",
      formula: "Δf = (v / c) × f",
      variables: [
        { symbol: "v", label: "Relative speed", unit: "m/s" },
        { symbol: "c", label: "Speed of light", unit: "3×10⁸ m/s" },
        { symbol: "f", label: "Carrier frequency", unit: "Hz" },
      ],
      source: { code: "Doppler effect (radio waves)" },
      note: "The frequency is entered in MHz; the result is in Hz.",
      inputs: [
        { key: "v", label: "Relative Speed (v)", unit: "m/s", placeholder: "10" },
        { key: "f", label: "Frequency (f)", unit: "MHz", placeholder: "9400" },
      ],
      calculate: (v) => {
        const df = (v.v / 3e8) * (v.f * 1e6);
        return [{ label: "Doppler Shift (Δf)", value: `${df.toFixed(2)} Hz` }];
      },
    },
  ],
};
