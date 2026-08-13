import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Fuel, Thermometer, Gauge, Zap, Droplets } from "lucide-react";

const formulaCategories = [
  {
    title: "Power Calculations",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    formulas: [
      {
        name: "Indicated Power (IHP)",
        formula: "IHP = (Pm × L × A × n × k) / 60000",
        variables: "Pm: mean effective pressure (bar), L: stroke (m), A: piston area (m²), n: speed (rpm), k: number of cylinders",
      },
      {
        name: "Brake Power (BHP)",
        formula: "BHP = IHP × ηmech",
        variables: "ηmech: mekanik verim (0.85-0.92)",
      },
      {
        name: "Shaft Power (SHP)",
        formula: "SHP = BHP × ηtrans",
        variables: "ηtrans: transmisyon verimi (0.97-0.99)",
      },
      {
        name: "Effective Power (EHP)",
        formula: "EHP = R × V",
        variables: "R: total resistance (N), V: vessel speed (m/s)",
      },
      {
        name: "Propeller Power",
        formula: "DHP = SHP × ηprop",
        variables: "ηprop: pervane verimi (0.55-0.70)",
      },
      {
        name: "Tork",
        formula: "T = (P × 60) / (2π × n)",
        variables: "P: power (W), n: speed (rpm)",
      },
    ],
  },
  {
    title: "Fuel Calculations",
    icon: Fuel,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    formulas: [
      {
        name: "Specific Fuel Oil Consumption (SFOC)",
        formula: "SFOC = FC / P",
        variables: "FC: fuel consumption (g/h), P: power (kW) — unit: g/kWh",
      },
      {
        name: "Daily Fuel Consumption",
        formula: "Daily FC = P × SFOC × 24 / 1000000",
        variables: "Result: tonnes/day",
      },
      {
        name: "Voyage Fuel Consumption",
        formula: "Voyage FC = Daily FC × Voyage Duration",
        variables: "Voyage duration: days",
      },
      {
        name: "Fuel Heating Temperature",
        formula: "T = 50 + (V50 - 10) × 2",
        variables: "V50: 50°C'deki viskozite (cSt)",
      },
      {
        name: "Fuel Volume Correction",
        formula: "V15 = Vt × [1 - 0.00064 × (T - 15)]",
        variables: "V15: volume at 15 °C, Vt: measured volume, T: temperature (°C)",
      },
    ],
  },
  {
    title: "Cooling System",
    icon: Thermometer,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    formulas: [
      {
        name: "Heat Load",
        formula: "Q = m × cp × ΔT",
        variables: "m: mass flow rate (kg/s), cp: specific heat (kJ/kg·K), ΔT: temperature difference (K)",
      },
      {
        name: "LMTD",
        formula: "LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁/ΔT₂)",
        variables: "ΔT₁, ΔT₂: the inlet and outlet temperature differences",
      },
      {
        name: "Heat Exchanger Area",
        formula: "A = Q / (U × LMTD)",
        variables: "U: overall heat transfer coefficient (W/m²·K)",
      },
      {
        name: "Cooling Water Flow Rate",
        formula: "m = Q / (cp × ΔT)",
        variables: "Q: heat load (kW)",
      },
      {
        name: "NTU (Transfer Birimi)",
        formula: "NTU = U × A / (m × cp)",
        variables: "For the heat exchanger effectiveness",
      },
    ],
  },
  {
    title: "Lubrication System",
    icon: Droplets,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
    formulas: [
      {
        name: "Cylinder Oil Consumption",
        formula: "CLO = BHP × Feed Rate / 1000",
        variables: "Feed Rate: g/kWh (tipik: 0.7-1.2)",
      },
      {
        name: "System Oil Consumption",
        formula: "SLO = 0.05 × BHP / 1000",
        variables: "Approximately kg/day",
      },
      {
        name: "Oil Filter ΔP",
        formula: "ΔP = (8 × μ × Q × L) / (π × r⁴)",
        variables: "μ: viscosity, Q: flow rate, L: length, r: radius",
      },
      {
        name: "BN Consumption",
        formula: "BN loss = Fuel S% × Neutralization Factor",
        variables: "Neutralization Factor ≈ 28-32",
      },
    ],
  },
  {
    title: "Compressed Air",
    icon: Gauge,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
    formulas: [
      {
        name: "Compressor Power",
        formula: "P = (p₂/p₁)^((k-1)/(n×k)) - 1) × (n×k)/(k-1) × p₁×V₁",
        variables: "n: number of stages, k: specific heat ratio",
      },
      {
        name: "Air Receiver Capacity",
        formula: "V = (N × Vswept × pstart) / pbottle",
        variables: "N: number of starts, V_swept: swept volume",
      },
      {
        name: "Ideal Gas Equation",
        formula: "p × V = m × R × T",
        variables: "R: gas constant (287 J/kg·K for air)",
      },
      {
        name: "Charging Time",
        formula: "t = (V × (p₂ - p₁)) / (Q × patm)",
        variables: "Q: compressor capacity (m³/min)",
      },
    ],
  },
  {
    title: "Verimlilik",
    icon: Calculator,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    formulas: [
      {
        name: "Termal Verimlilik",
        formula: "ηth = P / (FC × LCV)",
        variables: "LCV: lower calorific value (kJ/kg)",
      },
      {
        name: "Mekanik Verimlilik",
        formula: "ηmech = BHP / IHP",
        variables: "Typical value: 0.85-0.92",
      },
      {
        name: "Pervane Verimi",
        formula: "ηprop = EHP / DHP",
        variables: "Typical value: 0.55-0.70",
      },
      {
        name: "Genel Verimlilik",
        formula: "ηtotal = EHP / (FC × LCV)",
        variables: "Including all losses",
      },
      {
        name: "EEOI",
        formula: "EEOI = CO₂ / (Cargo × Distance)",
        variables: "g CO₂ / ton-mil",
      },
    ],
  },
];

export default function MachineFormulas() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-600 via-zinc-600 to-slate-800 bg-clip-text text-transparent mb-3">
            Machine Formulas
          </h1>
        </div>

        <div className="space-y-8">
          {formulaCategories.map((category) => (
            <Card key={category.title} className="bg-white/80 dark:bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 ${category.bgColor} rounded-lg`}>
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {category.formulas.map((formula, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {formula.name}
                      </h4>
                      <code className="block bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded text-sm font-mono text-slate-700 dark:text-slate-300 mb-2">
                        {formula.formula}
                      </code>
                      <p className="text-xs text-muted-foreground">{formula.variables}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
