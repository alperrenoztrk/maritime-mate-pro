import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { Sigma } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { FormulaList } from "@/components/courseContent/FormulaList";

interface FormulaItem {
  name: string;
  formula: string;
  variables: string;
}

interface FormulaCategory {
  title: string;
  formulas: FormulaItem[];
}

const topicFormulas: Record<string, FormulaCategory[]> = {
  thermodynamics: [
    {
      title: "Laws of Thermodynamics",
      formulas: [
        { name: "First Law (Closed System)", formula: "Q = ΔU + W", variables: "Q: heat (kJ), ΔU: internal energy change (kJ), W: work (kJ)" },
        { name: "Carnot Efficiency", formula: "ηCarnot = 1 − (TL / TH)", variables: "TL: low temperature reservoir (K), TH: high temperature reservoir (K)" },
        { name: "Entropy Change", formula: "ΔS = Qrev / T", variables: "Qrev: reversible heat (kJ), T: absolute temperature (K)" },
        { name: "Ideal Gas Equation", formula: "PV = nRT", variables: "P: pressure (Pa), V: volume (m³), n: number of moles, R: 8.314 J/(mol·K), T: temperature (K)" },
        { name: "Polytropic Process", formula: "P₁V₁ⁿ = P₂V₂ⁿ", variables: "n: politropik indeks (izotermik n=1, adyabatik n=γ)" },
        { name: "Otto Cycle Efficiency", formula: "ηOtto = 1 − (1 / r^(γ−1))", variables: "r: compression ratio, γ: specific heat ratio (cp/cv)" },
      ],
    },
    {
      title: "Heat Transfer",
      formulas: [
        { name: "Conduction (Fourier)", formula: "Q̇ = −k·A·(dT/dx)", variables: "k: thermal conductivity (W/m·K), A: area (m²), dT/dx: temperature gradient" },
        { name: "Convection (Newton)", formula: "Q̇ = h·A·ΔT", variables: "h: convection coefficient (W/m²·K), A: surface area, ΔT: temperature difference" },
        { name: "Radiation (Stefan-Boltzmann)", formula: "Q̇ = ε·σ·A·T⁴", variables: "ε: emissivity, σ: 5.67×10⁻⁸ W/m²·K⁴" },
        { name: "LMTD (Heat Exchanger)", formula: "Q̇ = U·A·LMTD", variables: "U: overall heat transfer coefficient (W/m²·K), LMTD: log mean temperature difference" },
      ],
    },
  ],
  "fluid-mechanics": [
    {
      title: "Fundamental Fluid Equations",
      formulas: [
        { name: "Bernoulli Equation", formula: "P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂", variables: "P: pressure, ρ: density, v: velocity, z: elevation, g: gravity" },
        { name: "Continuity Equation", formula: "A₁·v₁ = A₂·v₂", variables: "A: cross-sectional area (m²), v: flow velocity (m/s)" },
        { name: "Reynolds Number", formula: "Re = ρ·v·D / μ", variables: "ρ: density, v: velocity, D: diameter, μ: dynamic viscosity" },
        { name: "Darcy-Weisbach (Pipe Loss)", formula: "hf = f·(L/D)·(v²/2g)", variables: "f: friction factor, L: pipe length, D: diameter" },
      ],
    },
    {
      title: "Pump Calculations",
      formulas: [
        { name: "Pump Power", formula: "P = ρ·g·Q·H / η", variables: "Q: flow rate (m³/s), H: total head (m), η: efficiency" },
        { name: "NPSH (Net Positive Suction Head)", formula: "NPSHa = (Patm − Pvap) / (ρ·g) + zs − hf", variables: "Patm: atmospheric pressure, Pvap: vapour pressure, zs: suction lift" },
        { name: "Affinity Laws (Flow Rate)", formula: "Q₂/Q₁ = n₂/n₁", variables: "Q: debi, n: devir" },
        { name: "Affinity Laws (Power)", formula: "P₂/P₁ = (n₂/n₁)³", variables: "P: power, n: speed" },
      ],
    },
  ],
  "machine-elements": [
    {
      title: "Strength and Stress",
      formulas: [
        { name: "Tensile/Compressive Stress", formula: "σ = F / A", variables: "F: force (N), A: cross-sectional area (m²)" },
        { name: "Shear Stress", formula: "τ = F / A", variables: "F: shear force, A: shear area" },
        { name: "Bending Stress", formula: "σ = M·y / I", variables: "M: bending moment, y: distance from the neutral axis, I: moment of inertia" },
        { name: "Torsional Stress", formula: "τ = T·r / J", variables: "T: torque, r: radius, J: polar moment of inertia" },
      ],
    },
    {
      title: "Shaft and Bearing",
      formulas: [
        { name: "Shaft Diameter (Torsion)", formula: "d = ∛(16T / π·τizin)", variables: "T: tork (N·m), τizin: izin verilen kayma gerilmesi (Pa)" },
        { name: "Critical Speed", formula: "ncr = (60/2π)·√(g/δst)", variables: "δst: static deflection (m), g: gravity" },
        { name: "Bearing Life (L₁₀)", formula: "L₁₀ = (C/P)^p × 10⁶ revolutions", variables: "C: dynamic load rating, P: equivalent load, p: 3 (ball) or 10/3 (roller)" },
      ],
    },
  ],
  "diesel-engines": [
    {
      title: "Engine Performance",
      formulas: [
        { name: "Indicated Power (IHP)", formula: "IHP = (Pmi × L × A × n × k) / 60000", variables: "Pmi: mean indicated pressure (bar), L: stroke (m), A: piston area (m²), n: speed (rpm), k: number of cylinders" },
        { name: "Brake Power (BHP)", formula: "BHP = IHP × ηmech", variables: "ηmech: mekanik verim (0,85–0,92)" },
        { name: "SFOC", formula: "SFOC = Fuel consumption (g/h) / BHP (kW)", variables: "Result: g/kW·h — a lower value is more efficient" },
        { name: "Mean Effective Pressure", formula: "MEP = (Wnet) / Vd", variables: "Wnet: net work per cycle, Vd: swept volume" },
        { name: "Compression Ratio", formula: "r = Vmax / Vmin", variables: "Vmax: volume at bottom dead centre, Vmin: volume at top dead centre" },
      ],
    },
    {
      title: "Combustion and Injection",
      formulas: [
        { name: "Excess Air Ratio", formula: "λ = m_air,actual / m_air,stoichiometric", variables: "λ > 1: lean mixture (typical diesel λ = 1.5–2.5)" },
        { name: "Injection Pressure", formula: "Pinj = F_spring / A_needle + P_cylinder", variables: "Tipik: 300–1.000 bar (mekanik), 1.500–2.500 bar (common rail)" },
        { name: "Thermal Efficiency", formula: "ηth = BHP / (ṁ_fuel × Hu)", variables: "ṁ_fuel: fuel flow rate (kg/s), Hu: lower calorific value (kJ/kg)" },
      ],
    },
  ],
  "ship-systems": [
    {
      title: "Fuel System",
      formulas: [
        { name: "Fuel Consumption", formula: "FC = SFOC × BHP × t / 10⁶", variables: "FC: consumption (tonnes), SFOC (g/kW·h), BHP (kW), t: time (hours)" },
        { name: "Viscosity-Temperature", formula: "log(log(ν + 0,7)) = A − B·log(T)", variables: "Walther equation; ν: kinematic viscosity (cSt), T: temperature (K)" },
      ],
    },
    {
      title: "Lubrication System",
      formulas: [
        { name: "Oil Flow Rate", formula: "Q = (BHP × SLOC) / (ρ × 10⁶)", variables: "SLOC: specific lubricating oil consumption (g/kW·h), ρ: oil density (kg/m³)" },
        { name: "Oil Film Thickness", formula: "hmin = f(μ, N, W, R)", variables: "μ: viscosity, N: speed, W: load, R: radius" },
      ],
    },
    {
      title: "Cooling System",
      formulas: [
        { name: "Heat Rejection", formula: "Q̇ = ṁ·cp·ΔT", variables: "ṁ: mass flow rate (kg/s), cp: specific heat (kJ/kg·K), ΔT: temperature difference" },
        { name: "Cooling Water Flow Rate", formula: "ṁ = Q̇ / (cp × ΔT)", variables: "Tipik ΔT: HT devresi 5–8°C, LT devresi 10–15°C" },
      ],
    },
  ],
  auxiliary: [
    {
      title: "Generator Calculations",
      formulas: [
        { name: "Electric Power", formula: "P = √3 × V × I × cos(φ)", variables: "V: line voltage (V), I: line current (A), cos(φ): power factor" },
        { name: "Frequency-Speed Relation", formula: "f = (p × n) / 60", variables: "f: frequency (Hz), p: number of pole pairs, n: speed (rpm)" },
        { name: "Generator Efficiency", formula: "η = Pelektrik / Pmekanik", variables: "Tipik: %92–96" },
      ],
    },
    {
      title: "Boiler Calculations",
      formulas: [
        { name: "Boiler Efficiency", formula: "η = (ṁ_steam × Δh) / (ṁ_fuel × Hu)", variables: "Δh: enthalpy difference (kJ/kg), Hu: lower calorific value of the fuel" },
        { name: "Steam Production", formula: "ṁbuhar = Q̇ / Δh", variables: "Q̇: heat input to the boiler (kW), Δh: enthalpy of evaporation" },
      ],
    },
    {
      title: "Separator",
      formulas: [
        { name: "Stokes' Law (Separation Velocity)", formula: "v = d²·(ρw − ρo)·g / (18·μ)", variables: "d: particle diameter, ρ: densities, μ: viscosity" },
        { name: "Separator Capacity", formula: "Q = K × n² × r²", variables: "K: constant, n: speed, r: disc radius" },
      ],
    },
  ],
  "fuel-technology": [
    {
      title: "Fuel Properties",
      formulas: [
        { name: "CCAI (Calculated Carbon Aromaticity Index)", formula: "CCAI = D − 81,703·log(log(ν₅₀ + 0,85)) − 483,5", variables: "D: density at 15 °C (kg/m³), ν₅₀: kinematic viscosity at 50 °C (cSt)" },
        { name: "Fuel Calorific Value", formula: "Hu ≈ 46,704 − 8,802·d² + 3,167·d", variables: "d: density at 15 °C (kg/L); the result is in MJ/kg" },
        { name: "Viscosity Conversion", formula: "1 cSt = 1 mm²/s", variables: "Redwood No.1 (s) ≈ 4.05 × cSt (approximate)" },
      ],
    },
    {
      title: "Fuel Treatment",
      formulas: [
        { name: "Heating Power", formula: "Q̇ = ṁ·cp·ΔT", variables: "ṁ: fuel flow rate, cp: specific heat (~2 kJ/kg·K for HFO), ΔT: temperature rise" },
        { name: "Settling Tank Time", formula: "t ≥ 24 hours (ISO 8217)", variables: "Tank temperature: 70 °C (HFO), gravity settling of water and solids" },
      ],
    },
  ],
  "cooling-hvac": [
    {
      title: "Refrigeration Cycle",
      formulas: [
        { name: "COP (Refrigeration)", formula: "COP = QL / Wcomp", variables: "QL: cooling capacity (kW), Wcomp: compressor work (kW)" },
        { name: "COP (Heat Pump)", formula: "COP_HP = QH / Wcomp = COP_cooling + 1", variables: "QH: heating capacity" },
        { name: "Cooling Capacity", formula: "Q̇ = ṁ × (h₁ − h₄)", variables: "ṁ: refrigerant flow rate, h: enthalpy values (kJ/kg)" },
        { name: "Compressor Work", formula: "W = ṁ × (h₂ − h₁)", variables: "h₂: enthalpy at the compressor outlet, h₁: enthalpy at the compressor inlet" },
      ],
    },
    {
      title: "Air Conditioning Calculations",
      formulas: [
        { name: "Cooling Load", formula: "Q = U·A·ΔT + Q_air + Q_internal", variables: "U: heat transfer coefficient, Q_air: fresh air load, Q_internal: internal heat sources" },
        { name: "Dehumidification Capacity", formula: "ṁw = ṁa × (ω₁ − ω₂)", variables: "ṁa: air flow rate, ω: humidity ratio (kg of water per kg of dry air)" },
      ],
    },
  ],
  electrical: [
    {
      title: "Electrical Fundamentals",
      formulas: [
        { name: "Ohm's Law", formula: "V = I × R", variables: "V: voltage (V), I: current (A), R: resistance (Ω)" },
        { name: "Three Phase Power", formula: "P = √3 × VL × IL × cos(φ)", variables: "VL: line voltage, IL: line current, cos(φ): power factor" },
        { name: "Reactive Power", formula: "Q = √3 × VL × IL × sin(φ)", variables: "Unit: VAR (Volt-Ampere Reactive)" },
        { name: "Apparent Power", formula: "S = √(P² + Q²) = √3 × VL × IL", variables: "Birim: VA (Volt-Amper)" },
      ],
    },
    {
      title: "Protection and Cabling",
      formulas: [
        { name: "Short Circuit Current", formula: "Isc = V / Ztoplam", variables: "Z: empedans (primer+trafo+kablo)" },
        { name: "Voltage Drop", formula: "ΔV = I × (R·cos(φ) + X·sin(φ)) × L × 2", variables: "R: resistance per unit length (Ω/m), X: reactance per unit length, L: cable length" },
        { name: "Insulation Resistance", formula: "Riz ≥ (Vnominal + 1000) / 1000 MΩ", variables: "Minimum: 1 MΩ (SOLAS/IEC 60092)" },
      ],
    },
  ],
  automation: [
    {
      title: "Measurement and Sensors",
      formulas: [
        { name: "Accuracy", formula: "Error (%) = ((Measured − True) / True) × 100", variables: "Acceptable: ±0.5% (temperature), ±1% (pressure), ±2% (flow)" },
        { name: "Thermocouple EMF", formula: "V = S × ΔT", variables: "S: Seebeck coefficient (μV/°C), ΔT: temperature difference" },
        { name: "RTD Resistance", formula: "R(T) = R₀ × (1 + αT)", variables: "R₀: resistance at 0 °C (Pt100 → 100 Ω), α: temperature coefficient" },
      ],
    },
    {
      title: "Control Systems",
      formulas: [
        { name: "PID Output", formula: "u(t) = Kp·e + Ki·∫e·dt + Kd·de/dt", variables: "e: error, Kp: proportional gain, Ki: integral gain, Kd: derivative gain" },
        { name: "4-20 mA Conversion", formula: "I = 4 + (16 × (X − Xmin) / (Xmax − Xmin))", variables: "X: measured value, I: output current (mA)" },
      ],
    },
  ],
  "engine-room-ops": [
    {
      title: "Operating Parameters",
      formulas: [
        { name: "Fuel Consumption Rate", formula: "FCrate = FCtotal / Voyage time", variables: "Unit: tonnes/day or tonnes/hour" },
        { name: "Remaining Fuel Estimate", formula: "Endurance (hours) = Fuel stock / FCrate", variables: "FCrate: hourly consumption (tonnes/hour)" },
        { name: "Lubricating Oil Consumption", formula: "SLOC = Oil consumption (g/h) / BHP (kW)", variables: "Birim: g/kW·h, normal: 0,6–1,2 g/kW·h" },
      ],
    },
    {
      title: "Start-up",
      formulas: [
        { name: "Warm-up Time (Main Engine)", formula: "t_warm-up ≥ 30 min (jacket water → 60 °C)", variables: "Turning gear: must be turned for at least 1 hour" },
        { name: "Lubricating Oil Pressure Check", formula: "P_oil ≥ P_min (manufacturer's value)", variables: "Typical: 3–5 bar (at low speed), 5–8 bar (at full load)" },
      ],
    },
  ],
  maintenance: [
    {
      title: "Maintenance Planning",
      formulas: [
        { name: "MTBF", formula: "MTBF = Total running time / Number of failures", variables: "Unit: hours — a higher value is more reliable" },
        { name: "MTTR", formula: "MTTR = Total repair time / Number of repairs", variables: "Unit: hours — a lower value indicates better maintenance" },
        { name: "Availability", formula: "A = MTBF / (MTBF + MTTR)", variables: "A: availability ratio (0–1); target ≥ 0.95" },
        { name: "Reliability", formula: "R(t) = e^(−t/MTBF)", variables: "R: the probability of failure-free operation over the time t" },
      ],
    },
    {
      title: "Oil Analysis",
      formulas: [
        { name: "TBN (Total Base Number)", formula: "TBN limit = the manufacturer's recommendation (usually min 20 mg KOH/g)", variables: "Low TBN: reduced acid neutralisation capacity" },
        { name: "Iron (Fe) Concentration", formula: "Fe limit ≤ 100 ppm (normal wear)", variables: "> 150 ppm: abnormal wear, investigation required" },
      ],
    },
  ],
  "engine-room-safety": [
    {
      title: "Fire Safety",
      formulas: [
        { name: "Fire Triangle", formula: "Fuel + Oxygen + Heat = Fire", variables: "Removing one element extinguishes the fire" },
        { name: "CO₂ Quantity (by Volume)", formula: "mCO₂ = Vhacim × 0,56 kg/m³ (min %40)", variables: "V: korunan hacim (m³), SOLAS II-2/Reg.10" },
        { name: "Foam Quantity", formula: "V_foam = A × t × application rate", variables: "A: area (m²), t: time (min), rate: L/m²·min" },
      ],
    },
    {
      title: "Explosion Risk",
      formulas: [
        { name: "LEL/UEL", formula: "Explosive range: LEL < concentration < UEL", variables: "Fuel vapour: LEL ~1%, UEL ~6% by volume" },
        { name: "Flash point", formula: "T_flash ≥ 60 °C (fuel required by SOLAS)", variables: "HFO: ~65 °C, MGO: ~60 °C (minimum requirement)" },
      ],
    },
  ],
  "environment-machine": [
    {
      title: "Emission Calculations",
      formulas: [
        { name: "CO₂ Emission", formula: "ECO₂ = FC × Cf", variables: "FC: fuel consumption (tonnes), Cf: carbon factor (HFO: 3.114, MDO: 3.206 t CO₂/t fuel)" },
        { name: "SOx Emission", formula: "ESOx ∝ S_fuel × FC", variables: "S_fuel: fuel sulphur content (%, m/m)" },
        { name: "NOx Emission", formula: "ENOx = f(Tyanma, λ, tyanma)", variables: "Proportional to the combustion temperature, the excess air and the combustion duration" },
      ],
    },
    {
      title: "Waste Management",
      formulas: [
        { name: "OWS Discharge Limit", formula: "Oil concentration ≤ 15 ppm", variables: "MARPOL Annex I: the oily water separator discharge standard" },
        { name: "Sewage Treatment", formula: "BOD₅ effluent ≤ 25 mg/L", variables: "MARPOL Annex IV: the sewage treatment effluent quality" },
      ],
    },
  ],
  erm: [
    {
      title: "Risk Assessment",
      formulas: [
        { name: "Risk Level", formula: "Risk = Likelihood × Severity", variables: "5×5 matrix: Low (1–4), Medium (5–12), High (15–25)" },
        { name: "Risk Reduction Factor", formula: "RRF = Risk_before / Risk_after", variables: "RRF > 1: the risk reduction measure is effective" },
      ],
    },
    {
      title: "Human Factors",
      formulas: [
        { name: "Fatigue Index", formula: "FI = f(hours of work, rest, sleep quality)", variables: "STCW: min 10 hours of rest per 24 hours, min 77 hours per 7 days" },
        { name: "Watchkeeping Effectiveness", formula: "η_watch = Tasks completed / Tasks planned", variables: "A low ratio indicates an unbalanced workload or a lack of competence" },
      ],
    },
  ],
  "energy-efficiency": [
    {
      title: "Energy Efficiency Indicators",
      formulas: [
        { name: "EEDI", formula: "EEDI = (CO₂ emission) / (Capacity × Speed)", variables: "Unit: g CO₂/(tonne·mile); a mandatory upper limit for new ships" },
        { name: "EEXI", formula: "EEXI = (PME × Cf × SFCME) / (DWT × Vref)", variables: "For existing ships (mandatory from 2023)" },
        { name: "CII (Annual)", formula: "CII = CO₂total / (DWT × Dtotal)", variables: "D: total annual distance sailed (nautical miles); rating: A–E" },
        { name: "AER", formula: "AER = CO₂ / (DWT × Distance)", variables: "Annual Efficiency Ratio — used in the CII calculation" },
      ],
    },
    {
      title: "Waste Heat Recovery",
      formulas: [
        { name: "WHR Power", formula: "PWHR = ṁegzoz × cp × ΔT × η", variables: "ṁ_exhaust: exhaust flow rate, ΔT: temperature drop, η: WHR efficiency" },
        { name: "SEEMP Saving", formula: "Saving (%) = (FC_before − FC_after) / FC_before × 100", variables: "SEEMP: Ship Energy Efficiency Management Plan" },
      ],
    },
  ],
};

export default function MachineTopicFormulasPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();

  // Use the unified design when the single source registry has the topic; otherwise fall back to the legacy static data.
  const courseTopic = getCourseTopic(topicSlug);
  if (courseTopic) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-4xl space-y-6 p-4">
          <CourseTopicHeader topic={courseTopic} section="formulas" />
          <FormulaList
            entries={courseTopic.entries}
            calcHref={`/lessons/${courseTopic.key}/calculations`}
          />
        </div>
      </div>
    );
  }

  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const formulas = topicSlug ? topicFormulas[topicSlug] : null;

  if (!topic || !formulas) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  const TopicIcon = topic.icon;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}>
              <TopicIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sigma className="h-3.5 w-3.5" /> Formulas
              </p>
            </div>
          </div>
        </header>

        {formulas.map((category, catIdx) => (
          <section key={catIdx} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            <div className="grid gap-3">
              {category.formulas.map((f, fIdx) => (
                <Card key={fIdx} className="bg-card/80 border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">{f.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="bg-background rounded-lg p-3 font-mono text-base text-center text-primary">
                      {f.formula}
                    </div>
                    <p className="text-xs text-muted-foreground">{f.variables}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
