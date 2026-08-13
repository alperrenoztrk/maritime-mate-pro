import { Flame } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Thermodynamics and Heat Engineering — single source course content.
 * Formulas and calculators are merged into a SINGLE list; entries carrying
 * `calculate` appear on both the Formulas and the Calculations page.
 */
export const thermodynamics: CourseTopic = {
  key: "thermodynamics",
  title: "Thermodynamics and Heat Engineering",
  icon: Flame,
  accent: "from-red-500 via-orange-500 to-amber-500",
  group: "machine",
  intro:
    "Heat, work and energy conversions; thermodynamic cycles and heat transfer. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "first-law",
      name: "First Law (Closed System)",
      group: "Laws of Thermodynamics",
      formula: "Q = ΔU + W",
      variables: [
        { symbol: "Q", label: "Heat added to the system", unit: "kJ" },
        { symbol: "ΔU", label: "Internal energy change", unit: "kJ" },
        { symbol: "W", label: "Work done by the system", unit: "kJ" },
      ],
      source: { code: "First Law of Thermodynamics (conservation of energy)" },
      note: "Enter the internal energy change and the work done; the heat added to the system is calculated as Q = ΔU + W.",
      inputs: [
        { key: "du", label: "Internal Energy Change (ΔU)", unit: "kJ", placeholder: "300" },
        { key: "w", label: "Work Done (W)", unit: "kJ", placeholder: "120" },
      ],
      calculate: (v) => {
        const q = v.du + v.w;
        return [{ label: "Heat Added to the System (Q)", value: `${q.toFixed(2)} kJ` }];
      },
    },
    {
      id: "carnot-efficiency",
      name: "Carnot Efficiency",
      group: "Laws of Thermodynamics",
      formula: "η = 1 − (TL / TH)",
      variables: [
        { symbol: "TH", label: "Hot reservoir temperature", unit: "K" },
        { symbol: "TL", label: "Cold reservoir temperature", unit: "K" },
      ],
      source: { code: "Second Law of Thermodynamics (Carnot theorem)" },
      note: "Inputs are taken in °C and converted to absolute temperature (K) in the calculation: T(K) = T(°C) + 273.15.",
      inputs: [
        { key: "th", label: "Hot Reservoir (TH)", unit: "°C", placeholder: "500" },
        { key: "tl", label: "Cold Reservoir (TL)", unit: "°C", placeholder: "30" },
      ],
      calculate: (v) => {
        const TH = v.th + 273.15;
        const TL = v.tl + 273.15;
        if (TH <= 0) return [{ label: "Error", value: "TH must be above absolute zero" }];
        const eta = (1 - TL / TH) * 100;
        return [{ label: "Carnot Efficiency (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "entropy-change",
      name: "Entropy Change",
      group: "Laws of Thermodynamics",
      formula: "ΔS = Qrev / T",
      variables: [
        { symbol: "Qrev", label: "Reversible heat transfer", unit: "kJ" },
        { symbol: "T", label: "Absolute temperature", unit: "K" },
      ],
      source: { code: "Second Law of Thermodynamics (Clausius equality)" },
      note: "The temperature is entered in °C and converted to K in the calculation.",
      inputs: [
        { key: "q", label: "Heat Quantity (Q)", unit: "kJ", placeholder: "500" },
        { key: "t", label: "Temperature (T)", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Error", value: "The temperature must be above absolute zero" }];
        const ds = v.q / tK;
        return [{ label: "Entropy Change (ΔS)", value: `${ds.toFixed(4)} kJ/K` }];
      },
    },
    {
      id: "ideal-gas",
      name: "Ideal Gas Equation",
      group: "Laws of Thermodynamics",
      formula: "P·V = n·R·T",
      variables: [
        { symbol: "P", label: "Pressure", unit: "Pa" },
        { symbol: "V", label: "Volume", unit: "m³" },
        { symbol: "n", label: "Number of moles", unit: "mol" },
        { symbol: "R", label: "Universal gas constant", unit: "8,314 J/(mol·K)" },
        { symbol: "T", label: "Absolute temperature", unit: "K" },
      ],
      source: { code: "Ideal gas equation of state" },
      note: "The temperature is entered in °C and converted to K in the calculation (R = 8.314 J/mol·K). The pressure is calculated as P = n·R·T / V.",
      inputs: [
        { key: "n", label: "Number of Moles (n)", unit: "mol", placeholder: "100" },
        { key: "vol", label: "Volume (V)", unit: "m³", placeholder: "2" },
        { key: "t", label: "Temperature (T)", unit: "°C", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Error", value: "The volume must be positive" }];
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Error", value: "The temperature must be above absolute zero" }];
        const pPa = (v.n * 8.314 * tK) / v.vol;
        return [
          { label: "Pressure (P)", value: `${(pPa / 1000).toFixed(2)} kPa` },
          { label: "Pressure", value: `${(pPa / 1e5).toFixed(3)} bar` },
        ];
      },
    },
    {
      id: "sensible-heat",
      name: "Heat Quantity (Sensible Heat)",
      group: "Laws of Thermodynamics",
      formula: "Q = m · c · ΔT",
      variables: [
        { symbol: "m", label: "Mass", unit: "kg" },
        { symbol: "c", label: "Specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
      ],
      source: { code: "Calorimetry — sensible heat relation" },
      inputs: [
        { key: "m", label: "Mass (m)", unit: "kg", placeholder: "1000" },
        { key: "c", label: "Specific Heat (c)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "°C", placeholder: "20" },
      ],
      calculate: (v) => {
        const q = v.m * v.c * v.dt;
        return [
          { label: "Heat Quantity (Q)", value: `${q.toFixed(1)} kJ` },
          { label: "Heat Quantity", value: `${(q / 3600).toFixed(2)} kWh` },
        ];
      },
    },
    {
      id: "otto-efficiency",
      name: "Otto Cycle Efficiency",
      group: "Cycles",
      formula: "η = 1 − 1 / r^(γ−1)",
      variables: [
        { symbol: "r", label: "Compression ratio" },
        { symbol: "γ", label: "Specific heat ratio (cp/cv)" },
      ],
      source: { code: "Air standard Otto cycle" },
      inputs: [
        { key: "r", label: "Compression Ratio (r)", unit: "", placeholder: "10" },
        { key: "gamma", label: "Specific Heat Ratio (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - 1 / Math.pow(v.r, v.gamma - 1)) * 100;
        return [{ label: "Otto Cycle Efficiency (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "diesel-efficiency",
      name: "Diesel Cycle Efficiency",
      group: "Cycles",
      formula: "η = 1 − (1 / r^(γ−1)) · [(ρ^γ − 1) / (γ · (ρ − 1))]",
      variables: [
        { symbol: "r", label: "Compression ratio" },
        { symbol: "ρ", label: "Cut-off ratio" },
        { symbol: "γ", label: "Specific heat ratio" },
      ],
      source: { code: "Air standard Diesel cycle" },
      inputs: [
        { key: "r", label: "Compression Ratio (r)", unit: "", placeholder: "18" },
        { key: "rc", label: "Cut-off Ratio (ρ)", unit: "", placeholder: "2.5" },
        { key: "gamma", label: "Specific Heat Ratio (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        if (v.rc <= 1) return [{ label: "Error", value: "The cut-off ratio must be greater than 1" }];
        const eta =
          (1 - (1 / Math.pow(v.r, v.gamma - 1)) * ((Math.pow(v.rc, v.gamma) - 1) / (v.gamma * (v.rc - 1)))) * 100;
        return [{ label: "Diesel Cycle Efficiency (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "polytropic",
      name: "Polytropic Process",
      group: "Cycles",
      formula: "P₁·V₁ⁿ = P₂·V₂ⁿ",
      variables: [
        { symbol: "P", label: "Pressure", unit: "bar" },
        { symbol: "V", label: "Volume", unit: "m³" },
        { symbol: "n", label: "Polytropic index (isothermal n = 1, adiabatic n = γ)" },
      ],
      source: { code: "Polytropic change of state" },
      inputs: [
        { key: "p1", label: "Initial Pressure (P₁)", unit: "bar", placeholder: "1" },
        { key: "v1", label: "Initial Volume (V₁)", unit: "m³", placeholder: "0.5" },
        { key: "v2", label: "Final Volume (V₂)", unit: "m³", placeholder: "0.05" },
        { key: "n", label: "Polytropic Index (n)", unit: "", placeholder: "1.3" },
      ],
      calculate: (v) => {
        if (v.n === 1) return [{ label: "Warning", value: "Use the isothermal relation for n = 1" }];
        const p2 = v.p1 * Math.pow(v.v1 / v.v2, v.n);
        const work = (v.p1 * 1e5 * v.v1 - p2 * 1e5 * v.v2) / (v.n - 1);
        return [
          { label: "Final Pressure (P₂)", value: `${p2.toFixed(2)} bar` },
          { label: "Work (W)", value: `${(work / 1000).toFixed(2)} kJ` },
        ];
      },
    },
    {
      id: "fourier-conduction",
      name: "Conduction (Fourier's Law)",
      group: "Heat Transfer",
      formula: "Q̇ = k · A · ΔT / L",
      variables: [
        { symbol: "k", label: "Thermal conductivity", unit: "W/m·K" },
        { symbol: "A", label: "Area", unit: "m²" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
        { symbol: "L", label: "Wall thickness", unit: "m" },
      ],
      source: { code: "Fourier's law of heat conduction" },
      inputs: [
        { key: "k", label: "Thermal Conductivity (k)", unit: "W/m·K", placeholder: "50" },
        { key: "a", label: "Area (A)", unit: "m²", placeholder: "2" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "°C", placeholder: "80" },
        { key: "l", label: "Wall Thickness (L)", unit: "m", placeholder: "0.05" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Error", value: "The thickness must be positive" }];
        const q = (v.k * v.a * v.dt) / v.l;
        return [{ label: "Heat Flow (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
    {
      id: "newton-convection",
      name: "Convection (Newton's Law of Cooling)",
      group: "Heat Transfer",
      formula: "Q̇ = h · A · ΔT",
      variables: [
        { symbol: "h", label: "Convection coefficient", unit: "W/m²·K" },
        { symbol: "A", label: "Surface area", unit: "m²" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
      ],
      source: { code: "Newton's law of cooling" },
      inputs: [
        { key: "h", label: "Convection Coefficient (h)", unit: "W/m²·K", placeholder: "150" },
        { key: "a", label: "Surface Area (A)", unit: "m²", placeholder: "3" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "°C", placeholder: "40" },
      ],
      calculate: (v) => {
        const q = v.h * v.a * v.dt;
        return [{ label: "Heat Flow (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
    {
      id: "stefan-boltzmann",
      name: "Radiation (Stefan-Boltzmann)",
      group: "Heat Transfer",
      formula: "Q̇ = ε · σ · A · T⁴",
      variables: [
        { symbol: "ε", label: "Emissivity" },
        { symbol: "σ", label: "Stefan-Boltzmann constant", unit: "5,67×10⁻⁸ W/m²·K⁴" },
        { symbol: "A", label: "Surface area", unit: "m²" },
        { symbol: "T", label: "Absolute temperature", unit: "K" },
      ],
      source: { code: "Stefan-Boltzmann law of radiation" },
      note: "σ = 5.67×10⁻⁸ W/m²·K⁴. The temperature is entered in °C and converted to K in the calculation.",
      inputs: [
        { key: "eps", label: "Emissivity (ε)", unit: "", placeholder: "0.85" },
        { key: "a", label: "Surface Area (A)", unit: "m²", placeholder: "2" },
        { key: "t", label: "Surface Temperature (T)", unit: "°C", placeholder: "400" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Error", value: "The temperature must be above absolute zero" }];
        const q = v.eps * 5.67e-8 * v.a * Math.pow(tK, 4);
        return [{ label: "Radiated Power (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
    {
      id: "lmtd",
      name: "LMTD (Log Mean Temperature Difference)",
      group: "Heat Transfer",
      formula: "LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁ / ΔT₂)",
      variables: [
        { symbol: "ΔT₁", label: "Temperature difference at one end", unit: "°C" },
        { symbol: "ΔT₂", label: "Temperature difference at the other end", unit: "°C" },
      ],
      source: { code: "Heat exchanger design (counter flow)" },
      note: "Counter flow: ΔT₁ = T_hot,in − T_cold,out ; ΔT₂ = T_hot,out − T_cold,in.",
      inputs: [
        { key: "t1i", label: "Hot Inlet", unit: "°C", placeholder: "90" },
        { key: "t1o", label: "Hot Outlet", unit: "°C", placeholder: "60" },
        { key: "t2i", label: "Cold Inlet", unit: "°C", placeholder: "20" },
        { key: "t2o", label: "Cold Outlet", unit: "°C", placeholder: "50" },
      ],
      calculate: (v) => {
        const dt1 = v.t1i - v.t2o;
        const dt2 = v.t1o - v.t2i;
        if (dt1 <= 0 || dt2 <= 0) return [{ label: "Error", value: "The temperature differences must be positive" }];
        const lmtd = Math.abs(dt1 - dt2) < 0.01 ? dt1 : (dt1 - dt2) / Math.log(dt1 / dt2);
        return [{ label: "LMTD", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
    {
      id: "hx-area",
      name: "Heat Exchanger Area",
      group: "Heat Transfer",
      formula: "Q̇ = U · A · LMTD",
      variables: [
        { symbol: "Q̇", label: "Heat load", unit: "kW" },
        { symbol: "U", label: "Overall heat transfer coefficient", unit: "W/m²·K" },
        { symbol: "A", label: "Heat transfer area", unit: "m²" },
        { symbol: "LMTD", label: "Log mean temperature difference", unit: "°C" },
      ],
      source: { code: "Basic heat exchanger design equation" },
      inputs: [
        { key: "q", label: "Heat Load (Q)", unit: "kW", placeholder: "500" },
        { key: "u", label: "Overall Heat Transfer Coefficient (U)", unit: "W/m²·K", placeholder: "2500" },
        { key: "lmtd", label: "LMTD", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        if (v.u <= 0 || v.lmtd <= 0) return [{ label: "Error", value: "U and LMTD must be positive" }];
        const area = (v.q * 1000) / (v.u * v.lmtd);
        return [{ label: "Required Area (A)", value: `${area.toFixed(2)} m²` }];
      },
    },
    {
      id: "absolute-pressure",
      name: "Absolute Pressure",
      group: "Fundamental Concepts",
      formula: "Pabs = Pgauge + Patm",
      variables: [
        { symbol: "Pabs", label: "Absolute pressure", unit: "bar" },
        { symbol: "Pgauge", label: "Gauge (manometer) pressure", unit: "bar" },
        { symbol: "Patm", label: "Atmospheric pressure", unit: "bar" },
      ],
      source: { code: "Absolute/gauge pressure definition" },
      note: "At sea level Patm ≈ 1.013 bar. Under vacuum the gauge pressure is entered as negative.",
      inputs: [
        { key: "pg", label: "Gauge Pressure (Pgauge)", unit: "bar", placeholder: "6" },
        { key: "patm", label: "Atmospheric Pressure (Patm)", unit: "bar", placeholder: "1.013" },
      ],
      calculate: (v) => {
        const pabs = v.pg + v.patm;
        return [
          { label: "Absolute Pressure (Pabs)", value: `${pabs.toFixed(3)} bar` },
          { label: "Absolute Pressure", value: `${(pabs * 100).toFixed(1)} kPa` },
        ];
      },
    },
    {
      id: "specific-volume",
      name: "Specific Volume",
      group: "Fundamental Concepts",
      formula: "v = V / m = 1 / ρ",
      variables: [
        { symbol: "v", label: "Specific volume", unit: "m³/kg" },
        { symbol: "V", label: "Volume", unit: "m³" },
        { symbol: "m", label: "Mass", unit: "kg" },
        { symbol: "ρ", label: "Density", unit: "kg/m³" },
      ],
      source: { code: "Specific volume definition (the reciprocal of density)" },
      note: "If the density is known, v = 1/ρ; if the mass and volume are known, v = V/m. When the density is entered, the volume/mass fields may be left blank.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1.2" },
        { key: "vol", label: "Volume (V) — optional", unit: "m³", placeholder: "0" },
        { key: "m", label: "Mass (m) — optional", unit: "kg", placeholder: "0" },
      ],
      calculate: (v) => {
        if (v.vol > 0 && v.m > 0) {
          return [{ label: "Specific Volume (v)", value: `${(v.vol / v.m).toFixed(5)} m³/kg` }];
        }
        if (v.rho > 0) {
          return [{ label: "Specific Volume (v)", value: `${(1 / v.rho).toFixed(5)} m³/kg` }];
        }
        return [{ label: "Error", value: "Either the density or the volume + mass must be entered as positive" }];
      },
    },
    {
      id: "internal-energy",
      name: "Internal Energy Change",
      group: "Laws of Thermodynamics",
      formula: "ΔU = m · cv · ΔT",
      variables: [
        { symbol: "m", label: "Mass", unit: "kg" },
        { symbol: "cv", label: "Specific heat at constant volume", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
      ],
      source: { code: "Ideal gas internal energy change" },
      note: "For air cv ≈ 0.718 kJ/kg·K. ΔT = T₂ − T₁.",
      inputs: [
        { key: "m", label: "Mass (m)", unit: "kg", placeholder: "2" },
        { key: "cv", label: "Specific Heat (cv)", unit: "kJ/kg·K", placeholder: "0.718" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "K", placeholder: "150" },
      ],
      calculate: (v) => {
        const du = v.m * v.cv * v.dt;
        return [{ label: "Internal Energy Change (ΔU)", value: `${du.toFixed(2)} kJ` }];
      },
    },
    {
      id: "enthalpy-change",
      name: "Enthalpy Change",
      group: "Laws of Thermodynamics",
      formula: "ΔH = m · cp · ΔT",
      variables: [
        { symbol: "m", label: "Mass", unit: "kg" },
        { symbol: "cp", label: "Specific heat at constant pressure", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature difference", unit: "K" },
      ],
      source: { code: "Ideal gas enthalpy change" },
      note: "For air cp ≈ 1.005 kJ/kg·K. ΔT = T₂ − T₁.",
      inputs: [
        { key: "m", label: "Mass (m)", unit: "kg", placeholder: "2" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "1.005" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "K", placeholder: "150" },
      ],
      calculate: (v) => {
        const dh = v.m * v.cp * v.dt;
        return [{ label: "Enthalpy Change (ΔH)", value: `${dh.toFixed(2)} kJ` }];
      },
    },
    {
      id: "gas-constant-relation",
      name: "Specific Heats Relation (Mayer)",
      group: "Laws of Thermodynamics",
      formula: "cp − cv = R    ;    γ = cp / cv",
      variables: [
        { symbol: "cp", label: "Specific heat at constant pressure", unit: "kJ/kg·K" },
        { symbol: "cv", label: "Specific heat at constant volume", unit: "kJ/kg·K" },
        { symbol: "R", label: "Specific gas constant", unit: "kJ/kg·K" },
        { symbol: "γ", label: "Specific heat ratio (adiabatic index)" },
      ],
      source: { code: "Mayer relation (ideal gas)" },
      note: "For air cp ≈ 1.005 ; cv ≈ 0.718 ; R ≈ 0.287 kJ/kg·K ; γ ≈ 1.4.",
      inputs: [
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "1.005" },
        { key: "cv", label: "Specific Heat (cv)", unit: "kJ/kg·K", placeholder: "0.718" },
      ],
      calculate: (v) => {
        if (v.cv <= 0) return [{ label: "Error", value: "cv must be positive" }];
        const r = v.cp - v.cv;
        const gamma = v.cp / v.cv;
        return [
          { label: "Gas Constant (R)", value: `${r.toFixed(4)} kJ/kg·K` },
          { label: "Specific Heat Ratio (γ)", value: `${gamma.toFixed(3)}` },
        ];
      },
    },
    {
      id: "exergy",
      name: "Exergy (Available Energy)",
      group: "Laws of Thermodynamics",
      formula: "Ex = (H − H₀) − T₀ · (S − S₀)",
      variables: [
        { symbol: "Ex", label: "Flow exergy", unit: "kJ" },
        { symbol: "H − H₀", label: "Enthalpy difference (relative to the dead state)", unit: "kJ" },
        { symbol: "T₀", label: "Ambient (dead state) temperature", unit: "K" },
        { symbol: "S − S₀", label: "Entropy difference (relative to the dead state)", unit: "kJ/K" },
      ],
      source: { code: "Second Law of Thermodynamics (exergy analysis)" },
      note: "T₀ is the ambient temperature; it is entered in °C and converted to K in the calculation. The dead state is the condition in equilibrium with the environment.",
      inputs: [
        { key: "dh", label: "Enthalpy Difference (H − H₀)", unit: "kJ", placeholder: "500" },
        { key: "t0", label: "Ambient Temperature (T₀)", unit: "°C", placeholder: "25" },
        { key: "ds", label: "Entropy Difference (S − S₀)", unit: "kJ/K", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const t0K = v.t0 + 273.15;
        const ex = v.dh - t0K * v.ds;
        return [{ label: "Ekserji (Ex)", value: `${ex.toFixed(2)} kJ` }];
      },
    },
    {
      id: "isothermal-work",
      name: "Isothermal Work (Ideal Gas)",
      group: "Cycles",
      formula: "W = m · R · T · ln(V₂ / V₁)",
      variables: [
        { symbol: "W", label: "Work done", unit: "kJ" },
        { symbol: "m", label: "Mass", unit: "kg" },
        { symbol: "R", label: "Specific gas constant", unit: "kJ/kg·K" },
        { symbol: "T", label: "Absolute temperature (constant)", unit: "K" },
        { symbol: "V₂/V₁", label: "Volume ratio" },
      ],
      source: { code: "Work of an isothermal change of state (ideal gas)" },
      note: "The temperature is constant; it is entered in °C and converted to K in the calculation. For air R ≈ 0.287 kJ/kg·K. During expansion (V₂>V₁) the work is positive.",
      inputs: [
        { key: "m", label: "Mass (m)", unit: "kg", placeholder: "1" },
        { key: "r", label: "Gas Constant (R)", unit: "kJ/kg·K", placeholder: "0.287" },
        { key: "t", label: "Temperature (T)", unit: "°C", placeholder: "300" },
        { key: "v1", label: "Initial Volume (V₁)", unit: "m³", placeholder: "0.1" },
        { key: "v2", label: "Final Volume (V₂)", unit: "m³", placeholder: "0.3" },
      ],
      calculate: (v) => {
        if (v.v1 <= 0 || v.v2 <= 0) return [{ label: "Error", value: "The volumes must be positive" }];
        const tK = v.t + 273.15;
        const w = v.m * v.r * tK * Math.log(v.v2 / v.v1);
        return [{ label: "Isothermal Work (W)", value: `${w.toFixed(2)} kJ` }];
      },
    },
    {
      id: "cylindrical-conduction",
      name: "Cylindrical Conduction (Pipe/Wall)",
      group: "Heat Transfer",
      formula: "Q̇ = 2π·k·L·(T₁ − T₂) / ln(r₂ / r₁)",
      variables: [
        { symbol: "k", label: "Thermal conductivity", unit: "W/m·K" },
        { symbol: "L", label: "Cylinder (pipe) length", unit: "m" },
        { symbol: "T₁ − T₂", label: "Inner-outer temperature difference", unit: "K" },
        { symbol: "r₁, r₂", label: "Inner and outer radius", unit: "m" },
      ],
      source: { code: "Fourier heat conduction in cylindrical coordinates" },
      note: "Radial heat loss in insulated pipes/cylindrical walls. r₂ > r₁ is required.",
      inputs: [
        { key: "k", label: "Thermal Conductivity (k)", unit: "W/m·K", placeholder: "0.04" },
        { key: "l", label: "Length (L)", unit: "m", placeholder: "10" },
        { key: "dt", label: "Temperature Difference (T₁−T₂)", unit: "°C", placeholder: "120" },
        { key: "r1", label: "Inner Radius (r₁)", unit: "m", placeholder: "0.05" },
        { key: "r2", label: "Outer Radius (r₂)", unit: "m", placeholder: "0.08" },
      ],
      calculate: (v) => {
        if (v.r1 <= 0 || v.r2 <= v.r1) return [{ label: "Error", value: "r₂ > r₁ > 0 is required" }];
        const q = (2 * Math.PI * v.k * v.l * v.dt) / Math.log(v.r2 / v.r1);
        return [
          { label: "Heat Flow (Q̇)", value: `${q.toFixed(1)} W` },
          { label: "Heat Flow", value: `${(q / 1000).toFixed(3)} kW` },
        ];
      },
    },
    {
      id: "overall-heat-transfer",
      name: "Overall Heat Transfer Coefficient (U)",
      group: "Heat Transfer",
      formula: "1/U = 1/h₁ + L/k + 1/h₂",
      variables: [
        { symbol: "U", label: "Overall heat transfer coefficient", unit: "W/m²·K" },
        { symbol: "h₁, h₂", label: "Inner-outer convection coefficients", unit: "W/m²·K" },
        { symbol: "L", label: "Wall thickness", unit: "m" },
        { symbol: "k", label: "Wall thermal conductivity", unit: "W/m·K" },
      ],
      source: { code: "Thermal resistances in series (plane wall)" },
      note: "The reciprocal of the total thermal resistance. Used together with Q̇ = U·A·ΔT in exchanger/wall analysis.",
      inputs: [
        { key: "h1", label: "Inner Convection Coefficient (h₁)", unit: "W/m²·K", placeholder: "500" },
        { key: "l", label: "Wall Thickness (L)", unit: "m", placeholder: "0.01" },
        { key: "k", label: "Wall Conductivity (k)", unit: "W/m·K", placeholder: "50" },
        { key: "h2", label: "Outer Convection Coefficient (h₂)", unit: "W/m²·K", placeholder: "2000" },
      ],
      calculate: (v) => {
        if (v.h1 <= 0 || v.h2 <= 0 || v.k <= 0) return [{ label: "Error", value: "h₁, h₂ and k must be positive" }];
        const rTotal = 1 / v.h1 + v.l / v.k + 1 / v.h2;
        const u = 1 / rTotal;
        return [{ label: "Overall Coefficient (U)", value: `${u.toFixed(2)} W/m²·K` }];
      },
    },
    {
      id: "hx-effectiveness",
      name: "Exchanger Effectiveness (ε-NTU)",
      group: "Heat Transfer",
      formula: "ε = Q / Qmax = Q / [Cmin · (Th,in − Tc,in)]",
      variables: [
        { symbol: "ε", label: "Exchanger effectiveness (0-1)" },
        { symbol: "Q", label: "Actual heat transfer", unit: "kW" },
        { symbol: "Cmin", label: "Minimum heat capacity rate (ṁ·cp)", unit: "kW/K" },
        { symbol: "Th,in − Tc,in", label: "Inlet temperature difference", unit: "K" },
      ],
      source: { code: "Heat exchanger effectiveness-NTU method" },
      note: "Qmax = Cmin·(T_hot,in − T_cold,in). The effectiveness lies in the 0-1 range.",
      inputs: [
        { key: "q", label: "Actual Heat Transfer (Q)", unit: "kW", placeholder: "300" },
        { key: "cmin", label: "Cmin (ṁ·cp)", unit: "kW/K", placeholder: "12" },
        { key: "thi", label: "Hot Fluid Inlet", unit: "°C", placeholder: "90" },
        { key: "tci", label: "Cold Fluid Inlet", unit: "°C", placeholder: "20" },
      ],
      calculate: (v) => {
        const dt = v.thi - v.tci;
        if (v.cmin <= 0 || dt <= 0) return [{ label: "Error", value: "Cmin and the inlet difference must be positive" }];
        const qmax = v.cmin * dt;
        const eps = v.q / qmax;
        return [
          { label: "Qmax", value: `${qmax.toFixed(1)} kW` },
          { label: "Etkinlik (ε)", value: `${eps.toFixed(3)}  (${(eps * 100).toFixed(1)} %)` },
        ];
      },
    },
  ],
};
