import { Cpu } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Elektronik, Ölçme ve Otomasyon — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const automation: CourseTopic = {
  key: "automation",
  title: "Electronics, Measurement and Automation",
  icon: Cpu,
  accent: "from-violet-500 via-purple-500 to-fuchsia-500",
  group: "machine",
  intro:
    "Sensors, measuring instruments and PID control systems; signal conversion and " +
    "measurement accuracy. Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "measurement-accuracy",
      name: "Accuracy / Error Calculation",
      group: "Measurement and Sensors",
      formula: "Error (%) = ((Measured − True) / True) × 100",
      variables: [
        { symbol: "Measured", label: "The value indicated by the instrument" },
        { symbol: "True", label: "Reference (true) value" },
        { symbol: "Span", label: "Measuring range (full scale)" },
      ],
      source: { code: "Measurement technique — accuracy/error definition", detail: "Acceptable: ±0.5% (temperature), ±1% (pressure), ±2% (flow)" },
      inputs: [
        { key: "measured", label: "Measured Value", unit: "", placeholder: "102" },
        { key: "actual", label: "True Value", unit: "", placeholder: "100" },
        { key: "span", label: "Measuring Range (Span)", unit: "", placeholder: "200" },
      ],
      calculate: (v) => {
        const absError = Math.abs(v.measured - v.actual);
        const relError = (absError / v.actual) * 100;
        const spanError = (absError / v.span) * 100;
        return [
          { label: "Absolute Error", value: `${absError.toFixed(3)}` },
          { label: "Relative Error", value: `${relError.toFixed(2)}%` },
          { label: "Span Error", value: `${spanError.toFixed(2)}%` },
        ];
      },
    },
    {
      id: "thermocouple-emf",
      name: "Thermocouple EMF → Temperature",
      group: "Measurement and Sensors",
      formula: "V = S × ΔT",
      variables: [
        { symbol: "V", label: "Thermocouple voltage (EMF)", unit: "mV" },
        { symbol: "S", label: "Seebeck coefficient", unit: "μV/°C" },
        { symbol: "ΔT", label: "Temperature difference", unit: "°C" },
      ],
      source: { code: "Seebeck effect — thermocouple measurement", detail: "Type K thermocouple ≈ 40.7 µV/°C" },
      note: "A type K thermocouple is assumed approximately linear: ΔT = EMF (mV) / 0.0407 (mV/°C).",
      inputs: [
        { key: "emf", label: "Measured EMF", unit: "mV", placeholder: "12.2" },
      ],
      calculate: (v) => {
        // K-tipi yaklaşık lineer: ~40.7 µV/°C → 0.0407 mV/°C → T ≈ EMF / 0.0407
        const temp = v.emf / 0.0407;
        return [{ label: "Estimated Temperature", value: `${temp.toFixed(0)} °C` }];
      },
    },
    {
      id: "rtd-resistance",
      name: "RTD Temperature Calculation (Pt100)",
      group: "Measurement and Sensors",
      formula: "R(T) = R₀ × (1 + α·T)",
      variables: [
        { symbol: "R(T)", label: "Measured resistance", unit: "Ω" },
        { symbol: "R₀", label: "0°C direnci (Pt100 → 100Ω)", unit: "Ω" },
        { symbol: "α", label: "Temperature coefficient", unit: "1/°C" },
        { symbol: "T", label: "Temperature", unit: "°C" },
      ],
      source: { code: "RTD/Pt100 resistance-temperature relation (IEC 60751)", detail: "α = 0,00385 1/°C (standart Pt100)" },
      inputs: [
        { key: "rt", label: "Measured Resistance (Rt)", unit: "Ω", placeholder: "138.5" },
        { key: "r0", label: "R₀ (0°C direnci)", unit: "Ω", placeholder: "100" },
        { key: "alpha", label: "α coefficient", unit: "1/°C", placeholder: "0.00385" },
      ],
      calculate: (v) => {
        const dt = (v.rt / v.r0 - 1) / v.alpha;
        return [{ label: "Temperature", value: `${dt.toFixed(1)} °C` }];
      },
    },
    {
      id: "pid-output",
      name: "PID Controller Output",
      group: "Control Systems",
      formula: "u(t) = Kp·e + Ki·∫e·dt + Kd·de/dt",
      variables: [
        { symbol: "e", label: "Error (SP − PV)" },
        { symbol: "Kp", label: "Proportional gain" },
        { symbol: "Ki", label: "Integral gain" },
        { symbol: "Kd", label: "Derivative gain" },
      ],
      source: { code: "PID control theory (proportional-integral-derivative)" },
      note: "A bias of 50% is used in the calculation and the output is clamped to the 0–100% range.",
      inputs: [
        { key: "sp", label: "Setpoint (SP)", unit: "", placeholder: "50" },
        { key: "pv", label: "Process Value (PV)", unit: "", placeholder: "45" },
        { key: "kp", label: "Proportional Gain (Kp)", unit: "", placeholder: "2" },
        { key: "ki", label: "Integral Gain (Ki)", unit: "", placeholder: "0.5" },
        { key: "dt", label: "Sampling Time", unit: "s", placeholder: "1" },
      ],
      calculate: (v) => {
        const error = v.sp - v.pv;
        const pOut = v.kp * error;
        const iOut = v.ki * error * v.dt;
        const total = Math.min(100, Math.max(0, 50 + pOut + iOut)); // Bias = %50
        return [
          { label: "Error (e)", value: `${error.toFixed(2)}` },
          { label: "P Output", value: `${pOut.toFixed(2)}` },
          { label: "Controller Output", value: `${total.toFixed(1)}%` },
        ];
      },
    },
    {
      id: "current-loop-4-20ma",
      name: "4-20 mA Conversion",
      group: "Control Systems",
      formula: "I = 4 + (16 × (X − Xmin) / (Xmax − Xmin))",
      variables: [
        { symbol: "X", label: "Measured value" },
        { symbol: "Xmin", label: "Lower range limit" },
        { symbol: "Xmax", label: "Upper range limit" },
        { symbol: "I", label: "Output current", unit: "mA" },
      ],
      source: { code: "Industrial 4-20 mA current loop standard" },
      inputs: [
        { key: "x", label: "Measured Value", unit: "", placeholder: "75" },
        { key: "xmin", label: "Range Min", unit: "", placeholder: "0" },
        { key: "xmax", label: "Range Max", unit: "", placeholder: "100" },
      ],
      calculate: (v) => {
        const i = 4 + (16 * (v.x - v.xmin) / (v.xmax - v.xmin));
        const percent = ((v.x - v.xmin) / (v.xmax - v.xmin)) * 100;
        return [
          { label: "Output Current", value: `${i.toFixed(2)} mA` },
          { label: "Percentage", value: `${percent.toFixed(1)}%` },
        ];
      },
    },
  ],
};
