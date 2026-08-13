import { Fuel } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yardımcı Makineler — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const auxiliary: CourseTopic = {
  key: "auxiliary",
  title: "Auxiliary Machinery",
  icon: Fuel,
  accent: "from-amber-500 via-orange-500 to-red-500",
  group: "machine",
  intro:
    "Generators, boilers, separators, compressors and fresh water generators. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "generator-power",
      name: "Generator Power (3 Phase)",
      group: "Generator Calculations",
      formula: "P = √3 × V × I × cos(φ)",
      variables: [
        { symbol: "V", label: "Hat gerilimi", unit: "V" },
        { symbol: "I", label: "Line current", unit: "A" },
        { symbol: "cos(φ)", label: "Power factor" },
      ],
      source: { code: "Three phase active power relation" },
      note: "The result is in W and converted to kW (÷1000). The apparent power is S = √3 × V × I.",
      inputs: [
        { key: "v", label: "Hat Gerilimi (V)", unit: "V", placeholder: "440" },
        { key: "i", label: "Line Current (I)", unit: "A", placeholder: "500" },
        { key: "pf", label: "Power Factor (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (vals) => {
        const p = Math.sqrt(3) * vals.v * vals.i * vals.pf;
        return [
          { label: "Active Power (P)", value: `${(p / 1000).toFixed(1)} kW` },
          { label: "Apparent Power (S)", value: `${(Math.sqrt(3) * vals.v * vals.i / 1000).toFixed(1)} kVA` },
        ];
      },
    },
    {
      id: "frequency-speed",
      name: "Frequency-Speed Relation",
      group: "Generator Calculations",
      formula: "f = (p × n) / 60",
      variables: [
        { symbol: "f", label: "Frekans", unit: "Hz" },
        { symbol: "p", label: "Number of pole pairs" },
        { symbol: "n", label: "Devir", unit: "rpm" },
      ],
      source: { code: "Synchronous machine frequency-speed relation" },
      note: "Enter the number of pole pairs and the speed; the frequency is calculated as f = (p × n) / 60.",
      inputs: [
        { key: "p", label: "Number of Pole Pairs (p)", unit: "", placeholder: "2" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "1800" },
      ],
      calculate: (v) => {
        const f = (v.p * v.n) / 60;
        return [{ label: "Frekans (f)", value: `${f.toFixed(2)} Hz` }];
      },
    },
    {
      id: "generator-efficiency",
      name: "Generator Efficiency",
      group: "Generator Calculations",
      formula: "η = Pelektrik / Pmekanik",
      variables: [
        { symbol: "Pelektrik", label: "Electrical output power", unit: "kW" },
        { symbol: "Pmekanik", label: "Mechanical input power", unit: "kW" },
      ],
      source: { code: "Electrical machine efficiency definition (typically 92–96%)" },
      note: "Enter the electrical output and mechanical input power (kW); the efficiency and the loss are calculated.",
      inputs: [
        { key: "pe", label: "Electrical Output (P_electrical)", unit: "kW", placeholder: "920" },
        { key: "pm", label: "Mechanical Input (P_mechanical)", unit: "kW", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.pm <= 0) return [{ label: "Hata", value: "The mechanical input power must be positive" }];
        const eta = (v.pe / v.pm) * 100;
        return [
          { label: "Verim (η)", value: `${eta.toFixed(1)} %` },
          { label: "Loss", value: `${(v.pm - v.pe).toFixed(1)} kW` },
        ];
      },
    },
    {
      id: "boiler-steam-production",
      name: "Boiler Steam Production",
      group: "Boiler Calculations",
      formula: "ṁbuhar = (Q̇ × η) / Δh",
      variables: [
        { symbol: "Q̇", label: "Fuel heat input", unit: "kW" },
        { symbol: "η", label: "Kazan verimi" },
        { symbol: "Δh", label: "Enthalpy of evaporation (hfg)", unit: "kJ/kg" },
      ],
      source: { code: "Boiler energy balance (steam production)" },
      note: "The efficiency is entered as a percentage and converted to a ratio in the calculation. Multiply by 3600 for kg/hour.",
      inputs: [
        { key: "q", label: "Fuel Heat Input", unit: "kW", placeholder: "2000" },
        { key: "eta", label: "Kazan Verimi", unit: "%", placeholder: "85" },
        { key: "hfg", label: "Heat of Evaporation", unit: "kJ/kg", placeholder: "2257" },
      ],
      calculate: (v) => {
        const steam = (v.q * (v.eta / 100) * 3600) / (v.hfg);
        return [{ label: "Steam Production", value: `${steam.toFixed(0)} kg/saat` }];
      },
    },
    {
      id: "boiler-efficiency",
      name: "Kazan Verimi",
      group: "Boiler Calculations",
      formula: "η = (ṁ_steam × Δh) / (ṁ_fuel × Hu)",
      variables: [
        { symbol: "ṁbuhar", label: "Buhar debisi", unit: "kg/s" },
        { symbol: "Δh", label: "Enthalpy difference", unit: "kJ/kg" },
        { symbol: "ṁ_fuel", label: "Fuel flow rate", unit: "kg/s" },
        { symbol: "Hu", label: "Lower calorific value of the fuel", unit: "kJ/kg" },
      ],
      source: { code: "Boiler efficiency (direct/input-output method)" },
      note: "The steam and fuel flow rates are entered in kg/s; efficiency = (ṁ_steam × Δh) / (ṁ_fuel × Hu).",
      inputs: [
        { key: "ms", label: "Buhar Debisi (ṁbuhar)", unit: "kg/s", placeholder: "1.2" },
        { key: "dh", label: "Enthalpy Difference (Δh)", unit: "kJ/kg", placeholder: "2600" },
        { key: "mf", label: "Fuel Flow Rate (ṁ_fuel)", unit: "kg/s", placeholder: "0.09" },
        { key: "hu", label: "Lower Calorific Value (Hu)", unit: "kJ/kg", placeholder: "40000" },
      ],
      calculate: (v) => {
        const denom = v.mf * v.hu;
        if (denom <= 0) return [{ label: "Hata", value: "The fuel flow rate and the calorific value must be positive" }];
        const eta = ((v.ms * v.dh) / denom) * 100;
        return [{ label: "Kazan Verimi (η)", value: `${eta.toFixed(1)} %` }];
      },
    },
    {
      id: "separator-capacity",
      name: "Separator Capacity",
      group: "Separator",
      formula: "Q = (FC × 24 × k) / t",
      variables: [
        { symbol: "FC", label: "Fuel consumption", unit: "litre/saat" },
        { symbol: "k", label: "Safety factor" },
        { symbol: "t", label: "Daily operating time", unit: "hours/day" },
      ],
      source: { code: "Centrifugal separator sizing (based on daily consumption)" },
      note: "The daily consumption (FC × 24) is multiplied by the safety factor and divided by the operating time.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "litre/saat", placeholder: "3000" },
        { key: "factor", label: "Safety Factor", unit: "", placeholder: "1.2" },
        { key: "hours", label: "Operating Time", unit: "hours/day", placeholder: "20" },
      ],
      calculate: (v) => {
        const capacity = (v.fc * 24 * v.factor) / v.hours;
        return [{ label: "Gerekli Kapasite", value: `${capacity.toFixed(0)} litre/saat` }];
      },
    },
    {
      id: "stokes-law",
      name: "Stokes' Law (Separation Velocity)",
      group: "Separator",
      formula: "v = d²·(ρw − ρo)·g / (18·μ)",
      variables: [
        { symbol: "d", label: "Particle diameter", unit: "m" },
        { symbol: "ρw", label: "Water density", unit: "kg/m³" },
        { symbol: "ρo", label: "Oil density", unit: "kg/m³" },
        { symbol: "g", label: "Gravitational acceleration", unit: "9,81 m/s²" },
        { symbol: "μ", label: "Dinamik viskozite", unit: "Pa·s" },
      ],
      source: { code: "Stokes' law (laminar settling velocity)" },
      note: "The particle diameter is entered in µm and converted to m in the calculation (g = 9.81 m/s²). The result is given in mm/s.",
      inputs: [
        { key: "d", label: "Particle Diameter (d)", unit: "µm", placeholder: "30" },
        { key: "rw", label: "Water Density (ρw)", unit: "kg/m³", placeholder: "1025" },
        { key: "ro", label: "Oil Density (ρo)", unit: "kg/m³", placeholder: "900" },
        { key: "mu", label: "Dinamik Viskozite (μ)", unit: "Pa·s", placeholder: "0.5" },
      ],
      calculate: (v) => {
        if (v.mu <= 0) return [{ label: "Hata", value: "The viscosity must be positive" }];
        const dM = v.d * 1e-6;
        const vel = (dM * dM * (v.rw - v.ro) * 9.81) / (18 * v.mu);
        return [
          { label: "Separation Velocity (v)", value: `${(vel * 1000).toFixed(4)} mm/s` },
        ];
      },
    },
    {
      id: "compressor-volume-flow",
      name: "Compressor Volumetric Flow Rate",
      group: "Compressor",
      formula: "Q = (π·D²/4)·L·n·k·ηv",
      variables: [
        { symbol: "D", label: "Cylinder bore", unit: "mm" },
        { symbol: "L", label: "Strok", unit: "mm" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Number of cylinders" },
        { symbol: "ηv", label: "Hacimsel verim" },
      ],
      source: { code: "Swept volume flow rate of a reciprocating compressor" },
      note: "The bore and stroke are entered in mm and converted to m in the calculation (÷1000). The result is in m³/min → multiply by 60 for m³/hour.",
      inputs: [
        { key: "bore", label: "Cylinder Bore", unit: "mm", placeholder: "250" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "200" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "1000" },
        { key: "k", label: "Number of Cylinders", unit: "", placeholder: "2" },
        { key: "etav", label: "Hacimsel Verim", unit: "%", placeholder: "85" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000);
        const qTheory = vs * v.n * v.k; // m³/min
        const qActual = qTheory * (v.etav / 100);
        return [
          { label: "Teorik Debi", value: `${(qTheory * 60).toFixed(2)} m³/saat` },
          { label: "Actual Flow Rate", value: `${(qActual * 60).toFixed(2)} m³/saat` },
        ];
      },
    },
    {
      id: "fresh-water-generator",
      name: "Fresh Water Production (Evaporator)",
      group: "Fresh Water Generator",
      formula: "ṁsu = (Q̇ × η) / hfg",
      variables: [
        { symbol: "Q̇", label: "Available heat", unit: "kW" },
        { symbol: "η", label: "Evaporator efficiency" },
        { symbol: "hfg", label: "Heat of evaporation (under vacuum)", unit: "kJ/kg" },
      ],
      source: { code: "Vacuum evaporator energy balance" },
      note: "The efficiency is entered as a percentage and converted to a ratio. Multiply by 3600 for hourly production and by 24/1000 for tonnes per day.",
      inputs: [
        { key: "qAvail", label: "Available Heat", unit: "kW", placeholder: "300" },
        { key: "hfg", label: "Heat of Evaporation (under vacuum)", unit: "kJ/kg", placeholder: "2400" },
        { key: "eta", label: "Evaporator Efficiency", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const production = (v.qAvail * (v.eta / 100) * 3600) / v.hfg;
        return [
          { label: "Water Production", value: `${production.toFixed(0)} kg/saat` },
          { label: "Daily Production", value: `${(production * 24 / 1000).toFixed(1)} tonnes/day` },
        ];
      },
    },
    {
      id: "heat-exchanger-lmtd",
      name: "Log Mean Temperature Difference (LMTD)",
      group: "Heat Exchanger",
      formula: "ΔTlm = (ΔT1 − ΔT2) / ln(ΔT1 / ΔT2)",
      variables: [
        { symbol: "ΔT1", label: "Hot end temperature difference", unit: "°C" },
        { symbol: "ΔT2", label: "Cold end temperature difference", unit: "°C" },
      ],
      source: { code: "Heat exchanger LMTD method (counter/parallel flow)" },
      note: "ΔT1 and ΔT2 are the hot-cold fluid temperature differences at the two ends of the exchanger. When ΔT1 = ΔT2, ΔTlm = ΔT1 is used.",
      inputs: [
        { key: "dt1", label: "Hot End Difference (ΔT1)", unit: "°C", placeholder: "40" },
        { key: "dt2", label: "Cold End Difference (ΔT2)", unit: "°C", placeholder: "10" },
      ],
      calculate: (v) => {
        if (v.dt1 <= 0 || v.dt2 <= 0) return [{ label: "Hata", value: "The temperature differences must be positive" }];
        const lmtd = Math.abs(v.dt1 - v.dt2) < 1e-9 ? v.dt1 : (v.dt1 - v.dt2) / Math.log(v.dt1 / v.dt2);
        return [{ label: "LMTD (ΔTlm)", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
    {
      id: "heat-exchanger-duty",
      name: "Heat Exchanger Heat Transfer Rate",
      group: "Heat Exchanger",
      formula: "Q = U × A × ΔTlm",
      variables: [
        { symbol: "U", label: "Overall heat transfer coefficient", unit: "W/m²·K" },
        { symbol: "A", label: "Heat transfer surface area", unit: "m²" },
        { symbol: "ΔTlm", label: "Log mean temperature difference", unit: "K" },
      ],
      source: { code: "Heat transfer equation (exchanger capacity)" },
      note: "The result is in W and converted to kW (÷1000). The LMTD calculation is used for ΔTlm.",
      inputs: [
        { key: "u", label: "Heat Transfer Coefficient (U)", unit: "W/m²·K", placeholder: "3000" },
        { key: "a", label: "Surface Area (A)", unit: "m²", placeholder: "8" },
        { key: "dtlm", label: "LMTD (ΔTlm)", unit: "K", placeholder: "15" },
      ],
      calculate: (v) => {
        const q = v.u * v.a * v.dtlm;
        return [
          { label: "Heat Transfer Rate (Q)", value: `${(q / 1000).toFixed(1)} kW` },
          { label: "Q (W)", value: `${q.toFixed(0)} W` },
        ];
      },
    },
    {
      id: "incinerator-heat-capacity",
      name: "Incinerator Thermal Capacity",
      group: "Incinerator",
      formula: "Q̇ = (ṁ × Hu) / 3600",
      variables: [
        { symbol: "ṁ", label: "Sludge/waste feed rate", unit: "kg/saat" },
        { symbol: "Hu", label: "Lower calorific value of the waste", unit: "kJ/kg" },
      ],
      source: { code: "IMO MEPC.244(66) — incinerator thermal capacity (mass × calorific value)" },
      note: "ṁ (kg/hour) × Hu (kJ/kg) = kJ/hour; divide by 3600 for kW. Water-bearing sludge has a low calorific value (~10,000–30,000 kJ/kg).",
      inputs: [
        { key: "m", label: "Besleme Debisi (ṁ)", unit: "kg/saat", placeholder: "50" },
        { key: "hu", label: "Lower Calorific Value (Hu)", unit: "kJ/kg", placeholder: "30000" },
      ],
      calculate: (v) => {
        const qkw = (v.m * v.hu) / 3600;
        return [
          { label: "Incineration Heat Rate (Q̇)", value: `${qkw.toFixed(1)} kW` },
          { label: "Hourly Heat", value: `${(v.m * v.hu / 1000).toFixed(0)} MJ/saat` },
        ];
      },
    },
    {
      id: "sewage-holding-tank",
      name: "Sewage Holding Tank Volume",
      group: "Sewage Treatment",
      formula: "V = N × q × d",
      variables: [
        { symbol: "N", label: "Number of persons" },
        { symbol: "q", label: "Daily sewage per person", unit: "litres/person·day" },
        { symbol: "d", label: "Retention time", unit: "days" },
      ],
      source: { code: "MARPOL Annex IV / MEPC.227(64) — sizing based on sewage generation" },
      note: "q is typically taken as ~30 litres/person·day for black water only and ~70 for black + grey water. The result is given in litres and m³.",
      inputs: [
        { key: "n", label: "Number of Persons (N)", unit: "persons", placeholder: "20" },
        { key: "q", label: "Sewage per Person (q)", unit: "litres/person·day", placeholder: "70" },
        { key: "d", label: "Retention Time (d)", unit: "days", placeholder: "3" },
      ],
      calculate: (v) => {
        const liters = v.n * v.q * v.d;
        return [
          { label: "Gerekli Hacim", value: `${liters.toFixed(0)} litre` },
          { label: "m³ cinsinden", value: `${(liters / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "ows-discharge-time",
      name: "Bilge Separator (OWS) Discharge Time",
      group: "Bilge Separator (OWS)",
      formula: "t = V / Q",
      variables: [
        { symbol: "V", label: "Sintine (bilge) hacmi", unit: "m³" },
        { symbol: "Q", label: "OWS kapasitesi", unit: "m³/saat" },
      ],
      source: { code: "OWS sizing (volume/flow rate relation)" },
      note: "The time required to process the oily water volume in the bilge tank at the rated OWS capacity.",
      inputs: [
        { key: "v", label: "Sintine Hacmi (V)", unit: "m³", placeholder: "10" },
        { key: "q", label: "OWS Kapasitesi (Q)", unit: "m³/saat", placeholder: "2.5" },
      ],
      calculate: (v) => {
        if (v.q <= 0) return [{ label: "Hata", value: "The capacity must be positive" }];
        const t = v.v / v.q;
        return [{ label: "Discharge Time", value: `${t.toFixed(1)} saat` }];
      },
    },
    {
      id: "refrigeration-pulldown-load",
      name: "Cold Store Cooling Load (Pull-down)",
      group: "Refrigeration (Provision)",
      formula: "Q = (m × cp × ΔT) / (t × 3600)",
      variables: [
        { symbol: "m", label: "Mass to be cooled", unit: "kg" },
        { symbol: "cp", label: "Specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature drop", unit: "K" },
        { symbol: "t", label: "Pull-down time", unit: "saat" },
      ],
      source: { code: "Cooling load energy balance (sensible heat)" },
      note: "Typical cp: fresh produce ~3.3; frozen ~1.7 kJ/kg·K. The result is in kW (cooling power). The time is entered in hours and converted to seconds by ×3600.",
      inputs: [
        { key: "m", label: "Mass (m)", unit: "kg", placeholder: "500" },
        { key: "cp", label: "Specific Heat (cp)", unit: "kJ/kg·K", placeholder: "3.3" },
        { key: "dt", label: "Temperature Drop (ΔT)", unit: "K", placeholder: "25" },
        { key: "t", label: "Pull-down Time (t)", unit: "saat", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.t <= 0) return [{ label: "Hata", value: "The time must be positive" }];
        const q = (v.m * v.cp * v.dt) / (v.t * 3600);
        return [{ label: "Cooling Load (Q)", value: `${q.toFixed(2)} kW` }];
      },
    },
    {
      id: "refrigeration-cop",
      name: "Refrigeration Cycle Coefficient of Performance (COP)",
      group: "Refrigeration (Provision)",
      formula: "COP = Q₀ / W",
      variables: [
        { symbol: "Q₀", label: "Cooling capacity (evaporator)", unit: "kW" },
        { symbol: "W", label: "Compressor input power", unit: "kW" },
      ],
      source: { code: "Refrigeration cycle coefficient of performance (COP) definition" },
      note: "The COP is the cooling power obtained per unit of compressor power; typically ~2–4 in provision systems.",
      inputs: [
        { key: "q0", label: "Cooling Capacity (Q₀)", unit: "kW", placeholder: "12" },
        { key: "w", label: "Compressor Power (W)", unit: "kW", placeholder: "4" },
      ],
      calculate: (v) => {
        if (v.w <= 0) return [{ label: "Hata", value: "The compressor power must be positive" }];
        const cop = v.q0 / v.w;
        return [{ label: "COP", value: cop.toFixed(2) }];
      },
    },
  ],
};
