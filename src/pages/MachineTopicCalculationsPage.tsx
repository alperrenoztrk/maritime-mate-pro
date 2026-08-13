import { useState } from "react";
import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { ArrowRight, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCourseTopic } from "@/data/courseContent";
import { CourseTopicHeader } from "@/components/courseContent/CourseTopicHeader";
import { CalculatorList } from "@/components/courseContent/CalculatorList";
import { CalculationQualityBanner } from "@/components/courseContent/CalculationQualityBanner";

interface CalcTool {
  name: string;
  description: string;
  inputs: { key: string; label: string; unit: string; placeholder?: string }[];
  calculate: (vals: Record<string, number>) => { label: string; value: string }[];
}

const topicCalculations: Record<string, CalcTool[]> = {
  thermodynamics: [
    {
      name: "Carnot Efficiency",
      description: "Sıcak ve soğuk kaynak sıcaklıkları ile Carnot çevrim verimini hesaplar.",
      inputs: [
        { key: "th", label: "Hot Reservoir (TH)", unit: "°C", placeholder: "500" },
        { key: "tl", label: "Cold Reservoir (TL)", unit: "°C", placeholder: "30" },
      ],
      calculate: (v) => {
        const TH = v.th + 273.15;
        const TL = v.tl + 273.15;
        const eta = (1 - TL / TH) * 100;
        return [{ label: "Carnot Efficiency (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "LMTD Hesabı",
      description: "Isı eşanjöründe logaritmik ortalama sıcaklık farkını hesaplar (karşı akış).",
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
      name: "Heat Exchanger Area",
      description: "Q = U × A × LMTD formülünden gerekli ısı transfer alanını hesaplar.",
      inputs: [
        { key: "q", label: "Heat Load (Q)", unit: "kW", placeholder: "500" },
        { key: "u", label: "Overall Heat Transfer Coefficient (U)", unit: "W/m²·K", placeholder: "2500" },
        { key: "lmtd", label: "LMTD", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        const area = (v.q * 1000) / (v.u * v.lmtd);
        return [{ label: "Required Area (A)", value: `${area.toFixed(2)} m²` }];
      },
    },
    {
      name: "Diesel Cycle Efficiency",
      description: "Sıkıştırma oranı ve kesme oranından Diesel çevrim verimini hesaplar.",
      inputs: [
        { key: "r", label: "Compression Ratio (r)", unit: "", placeholder: "18" },
        { key: "rc", label: "Cut-off Ratio (ρ)", unit: "", placeholder: "2.5" },
        { key: "gamma", label: "Specific Heat Ratio (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - (1 / Math.pow(v.r, v.gamma - 1)) * ((Math.pow(v.rc, v.gamma) - 1) / (v.gamma * (v.rc - 1)))) * 100;
        return [{ label: "Diesel Cycle Efficiency (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Otto Çevrim Verimi",
      description: "Sıkıştırma oranından Otto çevrim verimini hesaplar.",
      inputs: [
        { key: "r", label: "Compression Ratio (r)", unit: "", placeholder: "10" },
        { key: "gamma", label: "Specific Heat Ratio (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - 1 / Math.pow(v.r, v.gamma - 1)) * 100;
        return [{ label: "Otto Cycle Efficiency (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Isı Miktarı Hesabı",
      description: "Q = m × c × ΔT formülüyle ısı miktarını hesaplar.",
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
      name: "Entropy Change",
      description: "ΔS = Q/T formülüyle entropi değişimini hesaplar.",
      inputs: [
        { key: "q", label: "Heat Quantity (Q)", unit: "kJ", placeholder: "500" },
        { key: "t", label: "Temperature (T)", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        const ds = v.q / tK;
        return [{ label: "Entropy Change (ΔS)", value: `${ds.toFixed(4)} kJ/K` }];
      },
    },
    {
      name: "Polytropic Process",
      description: "P₁V₁ⁿ = P₂V₂ⁿ ile son basınç ve işi hesaplar.",
      inputs: [
        { key: "p1", label: "Initial Pressure (P₁)", unit: "bar", placeholder: "1" },
        { key: "v1", label: "Initial Volume (V₁)", unit: "m³", placeholder: "0.5" },
        { key: "v2", label: "Final Volume (V₂)", unit: "m³", placeholder: "0.05" },
        { key: "n", label: "Polytropic Index (n)", unit: "", placeholder: "1.3" },
      ],
      calculate: (v) => {
        const p2 = v.p1 * Math.pow(v.v1 / v.v2, v.n);
        const work = (v.p1 * 1e5 * v.v1 - p2 * 1e5 * v.v2) / (v.n - 1);
        return [
          { label: "Final Pressure (P₂)", value: `${p2.toFixed(2)} bar` },
          { label: "Work (W)", value: `${(work / 1000).toFixed(2)} kJ` },
        ];
      },
    },
    {
      name: "Isı İletimi (Fourier)",
      description: "Q = k × A × ΔT / L ile düz duvar ısı iletimini hesaplar.",
      inputs: [
        { key: "k", label: "Thermal Conductivity (k)", unit: "W/m·K", placeholder: "50" },
        { key: "a", label: "Area (A)", unit: "m²", placeholder: "2" },
        { key: "dt", label: "Temperature Difference (ΔT)", unit: "°C", placeholder: "80" },
        { key: "l", label: "Wall Thickness (L)", unit: "m", placeholder: "0.05" },
      ],
      calculate: (v) => {
        const q = (v.k * v.a * v.dt) / v.l;
        return [{ label: "Isı Akısı (Q)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
  ],
  "fluid-mechanics": [
    {
      name: "Reynolds Number",
      description: "Akış rejimini belirlemek için Reynolds sayısını hesaplar.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
        { key: "v", label: "Velocity (v)", unit: "m/s", placeholder: "2" },
        { key: "d", label: "Diameter (D)", unit: "m", placeholder: "0.1" },
        { key: "mu", label: "Dynamic Viscosity (μ)", unit: "Pa·s", placeholder: "0.001" },
      ],
      calculate: (vals) => {
        const re = (vals.rho * vals.v * vals.d) / vals.mu;
        const regime = re < 2300 ? "Laminer" : re < 4000 ? "transition" : "Turbulent";
        return [
          { label: "Reynolds Number", value: re.toFixed(0) },
          { label: "Flow Regime", value: regime },
        ];
      },
    },
    {
      name: "Pump Power",
      description: "Santrifüj pompa gücünü hesaplar.",
      inputs: [
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "q", label: "Flow Rate (Q)", unit: "m³/h", placeholder: "100" },
        { key: "h", label: "Head (H)", unit: "m", placeholder: "30" },
        { key: "eta", label: "Efficiency (η)", unit: "%", placeholder: "75" },
      ],
      calculate: (vals) => {
        const qm3s = vals.q / 3600;
        const power = (vals.rho * 9.81 * qm3s * vals.h) / (vals.eta / 100);
        return [{ label: "Pump Power", value: `${(power / 1000).toFixed(2)} kW` }];
      },
    },
    {
      name: "Bernoulli Equation",
      description: "İki nokta arasında Bernoulli denklemini uygulayarak basınç veya hız hesaplar.",
      inputs: [
        { key: "p1", label: "P₁ (Pressure)", unit: "kPa", placeholder: "200" },
        { key: "v1", label: "v₁ (Velocity)", unit: "m/s", placeholder: "2" },
        { key: "z1", label: "z₁ (Elevation)", unit: "m", placeholder: "5" },
        { key: "z2", label: "z₂ (Elevation)", unit: "m", placeholder: "0" },
        { key: "v2", label: "v₂ (Velocity)", unit: "m/s", placeholder: "4" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const p2 = v.p1 * 1000 + 0.5 * v.rho * (v.v1 * v.v1 - v.v2 * v.v2) + v.rho * 9.81 * (v.z1 - v.z2);
        return [{ label: "P₂ (Pressure)", value: `${(p2 / 1000).toFixed(2)} kPa` }];
      },
    },
    {
      name: "Darcy-Weisbach Basınç Kaybı",
      description: "Boru hattında sürtünme kaynaklı basınç kaybını hesaplar.",
      inputs: [
        { key: "f", label: "Friction Factor (f)", unit: "", placeholder: "0.02" },
        { key: "l", label: "Pipe Length (L)", unit: "m", placeholder: "50" },
        { key: "d", label: "Pipe Diameter (D)", unit: "m", placeholder: "0.1" },
        { key: "v", label: "Flow Velocity (v)", unit: "m/s", placeholder: "3" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (vals) => {
        const hf = vals.f * (vals.l / vals.d) * (vals.v * vals.v) / (2 * 9.81);
        const dp = vals.rho * 9.81 * hf;
        return [
          { label: "Head Loss (hf)", value: `${hf.toFixed(2)} m` },
          { label: "Pressure Loss (ΔP)", value: `${(dp / 1000).toFixed(2)} kPa` },
        ];
      },
    },
    {
      name: "NPSH Hesabı",
      description: "Pompa emişinde mevcut NPSH değerini hesaplar.",
      inputs: [
        { key: "pa", label: "Atmospheric Pressure", unit: "kPa", placeholder: "101.325" },
        { key: "pv", label: "Vapour Pressure", unit: "kPa", placeholder: "2.34" },
        { key: "hs", label: "Suction Lift (+/−)", unit: "m", placeholder: "3" },
        { key: "hf", label: "Suction Line Loss", unit: "m", placeholder: "0.5" },
        { key: "rho", label: "Density (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const npsha = (v.pa - v.pv) * 1000 / (v.rho * 9.81) + v.hs - v.hf;
        return [{ label: "NPSHA", value: `${npsha.toFixed(2)} m` }];
      },
    },
    {
      name: "Devamlılık Denklemi",
      description: "A₁V₁ = A₂V₂ ile boru daraltma/genişletmede hız hesabı.",
      inputs: [
        { key: "d1", label: "Diameter 1 (D₁)", unit: "m", placeholder: "0.2" },
        { key: "v1", label: "Velocity 1 (V₁)", unit: "m/s", placeholder: "2" },
        { key: "d2", label: "Diameter 2 (D₂)", unit: "m", placeholder: "0.1" },
      ],
      calculate: (v) => {
        const a1 = Math.PI * Math.pow(v.d1, 2) / 4;
        const a2 = Math.PI * Math.pow(v.d2, 2) / 4;
        const v2 = (a1 * v.v1) / a2;
        const q = a1 * v.v1;
        return [
          { label: "V₂ (Velocity)", value: `${v2.toFixed(2)} m/s` },
          { label: "Flow Rate (Q)", value: `${(q * 3600).toFixed(1)} m³/h` },
        ];
      },
    },
    {
      name: "Affinity Laws",
      description: "Pompa/fan hız değişiminde debi, basınç ve güç ilişkisini hesaplar.",
      inputs: [
        { key: "n1", label: "Current Speed (n₁)", unit: "rpm", placeholder: "1450" },
        { key: "n2", label: "New Speed (n₂)", unit: "rpm", placeholder: "1200" },
        { key: "q1", label: "Current Flow Rate (Q₁)", unit: "m³/h", placeholder: "100" },
        { key: "h1", label: "Current Head (H₁)", unit: "m", placeholder: "30" },
        { key: "p1", label: "Current Power (P₁)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const ratio = v.n2 / v.n1;
        const q2 = v.q1 * ratio;
        const h2 = v.h1 * Math.pow(ratio, 2);
        const p2 = v.p1 * Math.pow(ratio, 3);
        return [
          { label: "New Flow Rate (Q₂)", value: `${q2.toFixed(1)} m³/h` },
          { label: "New Head (H₂)", value: `${h2.toFixed(1)} m` },
          { label: "New Power (P₂)", value: `${p2.toFixed(2)} kW` },
        ];
      },
    },
  ],
  "diesel-engines": [
    {
      name: "Indicated Power (IHP)",
      description: "Ana makinenin indike gücünü hesaplar. P = (Pmi × L × A × n × k) / 60",
      inputs: [
        { key: "pmi", label: "Mean Indicated Pressure (Pmi)", unit: "bar", placeholder: "18" },
        { key: "l", label: "Stroke (L)", unit: "m", placeholder: "2.5" },
        { key: "a", label: "Piston Area (A)", unit: "m²", placeholder: "0.35" },
        { key: "n", label: "Speed (n)", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Number of Cylinders (k)", unit: "units", placeholder: "6" },
      ],
      calculate: (v) => {
        // P_mi (bar) * 10^5 (Pa) * L * A * n * k / 60 → Watt → /1000 → kW
        const ihp = (v.pmi * 1e5 * v.l * v.a * v.n * v.k) / (60 * 1000);
        return [{ label: "Indicated Power (IHP)", value: `${ihp.toFixed(1)} kW` }];
      },
    },
    {
      name: "SFOC Hesabı",
      description: "Özgül yakıt tüketimini hesaplar.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "kg/hour", placeholder: "5000" },
        { key: "bhp", label: "Brake Power (BHP)", unit: "kW", placeholder: "25000" },
      ],
      calculate: (v) => {
        const sfoc = (v.fc / v.bhp) * 1000;
        return [{ label: "SFOC", value: `${sfoc.toFixed(1)} g/kW·h` }];
      },
    },
    {
      name: "Brake Power (BHP)",
      description: "İndike güçten fren gücünü hesaplar: BHP = IHP × ηmek",
      inputs: [
        { key: "ihp", label: "Indicated Power (IHP)", unit: "kW", placeholder: "12000" },
        { key: "eta", label: "Mechanical Efficiency (η_mech)", unit: "%", placeholder: "90" },
      ],
      calculate: (v) => {
        const bhp = v.ihp * (v.eta / 100);
        const loss = v.ihp - bhp;
        return [
          { label: "Brake Power (BHP)", value: `${bhp.toFixed(1)} kW` },
          { label: "Mechanical Loss", value: `${loss.toFixed(1)} kW` },
        ];
      },
    },
    {
      name: "Termal Verim",
      description: "Motor termal verimini hesaplar: η = (BHP × 3600) / (ṁf × LCV)",
      inputs: [
        { key: "bhp", label: "Brake Power (BHP)", unit: "kW", placeholder: "10000" },
        { key: "fc", label: "Fuel Consumption (ṁf)", unit: "kg/hour", placeholder: "1850" },
        { key: "lcv", label: "Lower Calorific Value (LCV)", unit: "kJ/kg", placeholder: "42700" },
      ],
      calculate: (v) => {
        const eta = (v.bhp * 3600) / (v.fc * v.lcv) * 100;
        return [{ label: "Thermal Efficiency (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Mean Effective Pressure (MEP)",
      description: "BMEP veya IMEP hesabı: MEP = (P × 60) / (Vs × n × k)",
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "10000" },
        { key: "bore", label: "Cylinder Bore", unit: "m", placeholder: "0.5" },
        { key: "stroke", label: "Stroke", unit: "m", placeholder: "2.0" },
        { key: "n", label: "Speed", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Number of Cylinders", unit: "units", placeholder: "6" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore, 2) / 4 * v.stroke; // m³
        const mep = (v.p * 1000 * 60) / (vs * v.n * v.k); // Pa
        return [
          { label: "MEP", value: `${(mep / 1e5).toFixed(2)} bar` },
          { label: "Cylinder Volume (Vs)", value: `${(vs * 1000).toFixed(1)} litres` },
        ];
      },
    },
    {
      name: "Admiralty Coefficient",
      description: "Hız-güç ilişkisini belirler: C = (Δ^(2/3) × V³) / P",
      inputs: [
        { key: "delta", label: "Displacement (Δ)", unit: "tonnes", placeholder: "50000" },
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "14" },
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "10000" },
      ],
      calculate: (v) => {
        const c = (Math.pow(v.delta, 2 / 3) * Math.pow(v.v, 3)) / v.p;
        return [{ label: "Admiralty Coefficient (C)", value: c.toFixed(1) }];
      },
    },
    {
      name: "Compression Ratio",
      description: "Silindir geometrisinden sıkıştırma oranını hesaplar.",
      inputs: [
        { key: "bore", label: "Cylinder Bore", unit: "mm", placeholder: "500" },
        { key: "stroke", label: "Stroke", unit: "mm", placeholder: "2000" },
        { key: "vc", label: "Clearance Volume (Vc)", unit: "litres", placeholder: "15" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000) * 1000; // litre
        const cr = (vs + v.vc) / v.vc;
        return [
          { label: "Swept Volume (Vs)", value: `${vs.toFixed(1)} litres` },
          { label: "Compression Ratio (r)", value: `${cr.toFixed(1)}:1` },
        ];
      },
    },
    {
      name: "Excess Air Ratio (λ)",
      description: "Gerçek hava/yakıt oranını stokiyometrik orana bölerek λ hesaplar.",
      inputs: [
        { key: "afr", label: "Actual Air/Fuel Ratio", unit: "kg/kg", placeholder: "42" },
        { key: "stoich", label: "Stoichiometric Ratio", unit: "kg/kg", placeholder: "14.7" },
      ],
      calculate: (v) => {
        const lambda = v.afr / v.stoich;
        const status = lambda < 1 ? "Rich Mixture" : lambda > 1.5 ? "Lean Mixture" : "Normal Range";
        return [
          { label: "Excess Air Ratio (λ)", value: lambda.toFixed(2) },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
  "ship-systems": [
    {
      name: "Fuel Consumption",
      description: "Seyir süresine göre toplam yakıt tüketimini hesaplar.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "bhp", label: "BHP", unit: "kW", placeholder: "15000" },
        { key: "t", label: "Duration", unit: "clock", placeholder: "240" },
      ],
      calculate: (v) => {
        const fc = (v.sfoc * v.bhp * v.t) / 1e6;
        return [{ label: "Total Fuel", value: `${fc.toFixed(1)} tonnes` }];
      },
    },
    {
      name: "Rudder Torque",
      description: "Joessel formülüyle dümen torkunu hesaplar.",
      inputs: [
        { key: "a", label: "Rudder Area (A)", unit: "m²", placeholder: "12" },
        { key: "v", label: "Vessel Speed (V)", unit: "knot", placeholder: "15" },
        { key: "alpha", label: "Rudder Angle (α)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const vMs = v.v * 0.5144;
        const alphaRad = v.alpha * Math.PI / 180;
        // Joessel: F = 577 × A × V² × sin(α) (N)
        const force = 577 * v.a * vMs * vMs * Math.sin(alphaRad);
        // Tork = F × d (d ≈ 0.35 × kord uzunluğu, tahmini olarak alan/yükseklik)
        const torque = force * 0.35 * Math.sqrt(v.a);
        return [
          { label: "Rudder Force", value: `${(force / 1000).toFixed(1)} kN` },
          { label: "Rudder Torque", value: `${(torque / 1000).toFixed(1)} kN·m` },
        ];
      },
    },
    {
      name: "Propeller Thrust",
      description: "Pervane tarafından üretilen itme kuvvetini hesaplar.",
      inputs: [
        { key: "rho", label: "Sea Water Density", unit: "kg/m³", placeholder: "1025" },
        { key: "d", label: "Propeller Diameter", unit: "m", placeholder: "6" },
        { key: "n", label: "Speed", unit: "rps", placeholder: "2" },
        { key: "kt", label: "Thrust Coefficient (KT)", unit: "", placeholder: "0.18" },
      ],
      calculate: (v) => {
        // T = K_T × ρ × n² × D⁴
        const thrust = v.kt * v.rho * v.n * v.n * Math.pow(v.d, 4);
        return [{ label: "Thrust (T)", value: `${(thrust / 1000).toFixed(1)} kN` }];
      },
    },
    {
      name: "Hydraulic Cylinder Force",
      description: "Basınç ve piston alanından silindir kuvvetini hesaplar.",
      inputs: [
        { key: "p", label: "Pressure", unit: "bar", placeholder: "200" },
        { key: "d", label: "Piston Diameter", unit: "mm", placeholder: "150" },
      ],
      calculate: (v) => {
        const areaM2 = Math.PI * Math.pow(v.d / 1000, 2) / 4;
        const force = v.p * 1e5 * areaM2;
        return [
          { label: "Piston Area", value: `${(areaM2 * 1e4).toFixed(2)} cm²` },
          { label: "Cylinder Force", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
    {
      name: "Walther Viskozite-Sıcaklık",
      description: "Walther denklemiyle farklı sıcaklıktaki viskoziteyi tahmin eder.",
      inputs: [
        { key: "v1", label: "Viscosity @T₁", unit: "cSt", placeholder: "380" },
        { key: "t1", label: "Temperature T₁", unit: "°C", placeholder: "50" },
        { key: "v2", label: "Viscosity @T₂", unit: "cSt", placeholder: "15" },
        { key: "t2", label: "Temperature T₂", unit: "°C", placeholder: "130" },
        { key: "tx", label: "Target Temperature Tx", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        // Walther equation: log(log(ν+0.7)) = A - B × log(T+273.15)
        const w1 = Math.log10(Math.log10(v.v1 + 0.7));
        const w2 = Math.log10(Math.log10(v.v2 + 0.7));
        const lt1 = Math.log10(v.t1 + 273.15);
        const lt2 = Math.log10(v.t2 + 273.15);
        const B = (w1 - w2) / (lt2 - lt1);
        const A = w1 + B * lt1;
        const ltx = Math.log10(v.tx + 273.15);
        const wx = A - B * ltx;
        const vx = Math.pow(10, Math.pow(10, wx)) - 0.7;
        return [{ label: `Viscosity @${v.tx} °C`, value: `${vx.toFixed(1)} cSt` }];
      },
    },
    {
      name: "Oil Film Thickness",
      description: "Sommerfeld sayısı ile minimum yağ film kalınlığını tahmin eder.",
      inputs: [
        { key: "mu", label: "Oil Viscosity (μ)", unit: "Pa·s", placeholder: "0.05" },
        { key: "n", label: "Speed (n)", unit: "rps", placeholder: "5" },
        { key: "p", label: "Unit Load (P)", unit: "MPa", placeholder: "3" },
        { key: "c", label: "Bearing Clearance (c)", unit: "mm", placeholder: "0.1" },
        { key: "r", label: "Shaft Radius (r)", unit: "mm", placeholder: "100" },
      ],
      calculate: (v) => {
        // Sommerfeld number: S = (μ × n / P) × (r/c)²
        const S = (v.mu * v.n / (v.p * 1e6)) * Math.pow((v.r / v.c), 2);
        const hMin = v.c * (1 - 1 / (1 + 2 * S)); // Approximate
        return [
          { label: "Sommerfeld Number (S)", value: S.toFixed(3) },
          { label: "Min. Film Thickness", value: `${(hMin * 1000).toFixed(1)} µm` },
        ];
      },
    },
  ],
  auxiliary: [
    {
      name: "Generator Power (3 Phase)",
      description: "Üç fazlı jeneratör elektrik gücünü hesaplar.",
      inputs: [
        { key: "v", label: "Line Voltage (V)", unit: "V", placeholder: "440" },
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
      name: "Boiler Steam Production",
      description: "Kazan buhar üretim kapasitesini hesaplar.",
      inputs: [
        { key: "q", label: "Fuel Heat Input", unit: "kW", placeholder: "2000" },
        { key: "eta", label: "Boiler Efficiency", unit: "%", placeholder: "85" },
        { key: "hfg", label: "Heat of Evaporation", unit: "kJ/kg", placeholder: "2257" },
      ],
      calculate: (v) => {
        const steam = (v.q * (v.eta / 100) * 3600) / (v.hfg);
        return [{ label: "Steam Production", value: `${steam.toFixed(0)} kg/hour` }];
      },
    },
    {
      name: "Separator Capacity",
      description: "Santrifüj separatör akış kapasitesini hesaplar.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "litres/h", placeholder: "3000" },
        { key: "factor", label: "Safety Factor", unit: "", placeholder: "1.2" },
        { key: "hours", label: "Operating Time", unit: "hours/day", placeholder: "20" },
      ],
      calculate: (v) => {
        const capacity = (v.fc * 24 * v.factor) / v.hours;
        return [{ label: "Required Capacity", value: `${capacity.toFixed(0)} litres/h` }];
      },
    },
    {
      name: "Compressor Volumetric Flow Rate",
      description: "Pistonlu kompresör hacimsel debisini hesaplar.",
      inputs: [
        { key: "bore", label: "Cylinder Bore", unit: "mm", placeholder: "250" },
        { key: "stroke", label: "Stroke", unit: "mm", placeholder: "200" },
        { key: "n", label: "Speed", unit: "rpm", placeholder: "1000" },
        { key: "k", label: "Number of Cylinders", unit: "", placeholder: "2" },
        { key: "etav", label: "Volumetric Efficiency", unit: "%", placeholder: "85" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000);
        const qTheory = vs * v.n * v.k; // m³/min
        const qActual = qTheory * (v.etav / 100);
        return [
          { label: "Theoretical Flow Rate", value: `${(qTheory * 60).toFixed(2)} m³/hour` },
          { label: "Actual Flow Rate", value: `${(qActual * 60).toFixed(2)} m³/hour` },
        ];
      },
    },
    {
      name: "Fresh Water Production (Evaporator)",
      description: "Vakumlu evaporatör ile tatlı su üretim miktarını hesaplar.",
      inputs: [
        { key: "qAvail", label: "Available Heat", unit: "kW", placeholder: "300" },
        { key: "hfg", label: "Heat of Evaporation (under vacuum)", unit: "kJ/kg", placeholder: "2400" },
        { key: "eta", label: "Evaporator Efficiency", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const production = (v.qAvail * (v.eta / 100) * 3600) / v.hfg;
        return [
          { label: "Water Production", value: `${production.toFixed(0)} kg/hour` },
          { label: "Daily Production", value: `${(production * 24 / 1000).toFixed(1)} tons/day` },
        ];
      },
    },
  ],
  electrical: [
    {
      name: "Voltage Drop",
      description: "Kablo gerilim düşümünü hesaplar.",
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
      name: "Generator Frequency",
      description: "f = (n × P) / 120 formülüyle jeneratör frekansını hesaplar.",
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
      name: "Short Circuit Current",
      description: "Kısa devre akımı hesabı: Isc = V / Z",
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
      name: "Transformer Turns Ratio",
      description: "Transformatör dönüşüm oranı ve ikincil değerleri hesaplar.",
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
      name: "Insulation Resistance",
      description: "Minimum izolasyon direnci kontrolü. IR = Vtest / Ikaçak",
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
    {
      name: "Reactive Power",
      description: "Aktif güç ve güç faktöründen reaktif gücü hesaplar.",
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
  ],
  "cooling-hvac": [
    {
      name: "COP Hesabı",
      description: "Soğutma sistemi performans katsayısını hesaplar.",
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
      name: "Refrigerant Flow Rate",
      description: "Soğutucu akışkan kütle debisini hesaplar: ṁ = QL / (h₁ - h₄)",
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
      name: "Soğutma Yükü Hesabı",
      description: "Soğuk hava deposu soğutma yükünü hesaplar.",
      inputs: [
        { key: "vol", label: "Store Volume", unit: "m³", placeholder: "200" },
        { key: "tout", label: "Outside Temperature", unit: "°C", placeholder: "35" },
        { key: "tin", label: "Inside Temperature", unit: "°C", placeholder: "-18" },
        { key: "u", label: "Wall U Value", unit: "W/m²·K", placeholder: "0.3" },
        { key: "area", label: "Total Wall Area", unit: "m²", placeholder: "180" },
      ],
      calculate: (v) => {
        const qTransmission = v.u * v.area * (v.tout - v.tin);
        const qTotal = qTransmission * 1.25; // %25 güvenlik payı
        return [
          { label: "Conduction Load", value: `${(qTransmission / 1000).toFixed(2)} kW` },
          { label: "Total Load (25% margin)", value: `${(qTotal / 1000).toFixed(2)} kW` },
        ];
      },
    },
    {
      name: "Carnot COP (Refrigeration)",
      description: "İdeal Carnot soğutma COP değerini hesaplar.",
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
      name: "Compressor Work",
      description: "Soğutma kompresörünün iş değerini hesaplar: W = ṁ × (h₂ - h₁)",
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
      name: "Dehumidification Capacity",
      description: "Klima sisteminde nem alma kapasitesini hesaplar.",
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
          { label: "Dehumidification Capacity", value: `${(moisture * 3600).toFixed(2)} kg/hour` },
          { label: "Latent Load", value: `${(moisture * 2450).toFixed(1)} kW` },
        ];
      },
    },
  ],
  "fuel-technology": [
    {
      name: "CCAI Hesabı",
      description: "Yakıt aromatiklik indeksini hesaplar (ISO 8217).",
      inputs: [
        { key: "d", label: "Density at 15 °C (D)", unit: "kg/m³", placeholder: "991" },
        { key: "v", label: "Viscosity at 50 °C (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (vals) => {
        const ccai = vals.d - 81.703 * Math.log10(Math.log10(vals.v + 0.85)) - 483.5;
        const quality = ccai < 840 ? "good" : ccai < 870 ? "Acceptable" : "Poor ignition quality";
        return [
          { label: "CCAI", value: ccai.toFixed(0) },
          { label: "Kalite", value: quality },
        ];
      },
    },
    {
      name: "Fuel Heating Temperature",
      description: "HFO enjeksiyon viskozitesi için gerekli ısıtma sıcaklığını tahmin eder.",
      inputs: [
        { key: "v50", label: "Viscosity @50 °C", unit: "cSt", placeholder: "380" },
        { key: "vTarget", label: "Target Viscosity", unit: "cSt", placeholder: "15" },
      ],
      calculate: (v) => {
        // Walther denklemi yaklaşık çözümü
        const t = 50 + (Math.log(v.v50 / v.vTarget) / Math.log(1.055)) * 1;
        return [{ label: "Estimated Heating Temperature", value: `${t.toFixed(0)} °C` }];
      },
    },
    {
      name: "Fuel Density Correction",
      description: "Sıcaklık farkına göre yakıt yoğunluğunu düzeltir.",
      inputs: [
        { key: "d15", label: "Density @15 °C", unit: "kg/m³", placeholder: "991" },
        { key: "t", label: "Current Temperature", unit: "°C", placeholder: "130" },
      ],
      calculate: (v) => {
        // Yaklaşık düzeltme katsayısı: 0.00065 per °C (HFO için)
        const dT = v.d15 - 0.00065 * v.d15 * (v.t - 15);
        return [{ label: "Corrected Density", value: `${dT.toFixed(1)} kg/m³` }];
      },
    },
    {
      name: "Bunker Quantity Calculation",
      description: "Seyir süresi ve tüketime göre bunker ihtiyacını hesaplar.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "185" },
        { key: "p", label: "Engine Power", unit: "kW", placeholder: "10000" },
        { key: "days", label: "Passage Time", unit: "days", placeholder: "15" },
        { key: "margin", label: "Safety Margin", unit: "%", placeholder: "10" },
      ],
      calculate: (v) => {
        const daily = (v.sfoc * v.p * 24) / 1e6;
        const total = daily * v.days;
        const withMargin = total * (1 + v.margin / 100);
        return [
          { label: "Daily Consumption", value: `${daily.toFixed(1)} tons/day` },
          { label: "Total Requirement", value: `${total.toFixed(1)} tonnes` },
          { label: "Including Safety Margin", value: `${withMargin.toFixed(1)} tonnes` },
        ];
      },
    },
  ],
  maintenance: [
    {
      name: "MTBF and Availability",
      description: "Ekipman güvenilirlik ve kullanılabilirlik hesabı.",
      inputs: [
        { key: "hours", label: "Total Running Time", unit: "clock", placeholder: "8760" },
        { key: "failures", label: "Number of Failures", unit: "units", placeholder: "3" },
        { key: "repair", label: "Total Repair Time", unit: "clock", placeholder: "72" },
      ],
      calculate: (v) => {
        if (v.failures === 0) return [{ label: "MTBF", value: "No failures — infinite" }];
        const mtbf = v.hours / v.failures;
        const mttr = v.repair / v.failures;
        const avail = mtbf / (mtbf + mttr) * 100;
        return [
          { label: "MTBF", value: `${mtbf.toFixed(0)} clock` },
          { label: "MTTR", value: `${mttr.toFixed(1)} clock` },
          { label: "Availability", value: `${avail.toFixed(1)}%` },
        ];
      },
    },
    {
      name: "Liner Wear Rate",
      description: "Silindir layneri aşınma oranını hesaplar.",
      inputs: [
        { key: "d0", label: "Original Diameter", unit: "mm", placeholder: "500" },
        { key: "d1", label: "Measured Diameter", unit: "mm", placeholder: "500.8" },
        { key: "hours", label: "Running Hours", unit: "clock", placeholder: "20000" },
      ],
      calculate: (v) => {
        const wear = v.d1 - v.d0;
        const rate = wear / (v.hours / 1000);
        const maxWear = v.d0 * 0.01; // Genel kural: çapın %1'i
        const remainingLife = ((maxWear - wear) / rate) * 1000;
        return [
          { label: "Total Wear", value: `${wear.toFixed(2)} mm` },
          { label: "Wear Rate", value: `${rate.toFixed(3)} mm/1000 h` },
          { label: "Estimated Remaining Life", value: `${remainingLife > 0 ? remainingLife.toFixed(0) : 0} clock` },
        ];
      },
    },
    {
      name: "Oil Analysis Trend",
      description: "Yağ metal partikül trendinden bakım ihtiyacını değerlendirir.",
      inputs: [
        { key: "fe", label: "Iron (Fe)", unit: "ppm", placeholder: "45" },
        { key: "cu", label: "Copper (Cu)", unit: "ppm", placeholder: "12" },
        { key: "sn", label: "Kalay (Sn)", unit: "ppm", placeholder: "5" },
        { key: "tbn", label: "TBN", unit: "mg KOH/g", placeholder: "25" },
      ],
      calculate: (v) => {
        const feStatus = v.fe < 50 ? "Normal" : v.fe < 100 ? "Caution" : "Kritik";
        const tbnStatus = v.tbn > 20 ? "Normal" : v.tbn > 10 ? "Caution" : "Replace";
        return [
          { label: "Fe Status", value: `${v.fe} ppm → ${feStatus}` },
          { label: "Cu Status", value: `${v.cu} ppm → ${v.cu < 15 ? "Normal" : "Caution"}` },
          { label: "TBN Status", value: `${v.tbn} → ${tbnStatus}` },
        ];
      },
    },
    {
      name: "Reliability R(t)",
      description: "Üstel dağılım ile zaman bazlı güvenilirlik hesabı: R(t) = e^(-t/MTBF)",
      inputs: [
        { key: "mtbf", label: "MTBF", unit: "clock", placeholder: "5000" },
        { key: "t", label: "Target Time (t)", unit: "clock", placeholder: "1000" },
      ],
      calculate: (v) => {
        const lambda = 1 / v.mtbf;
        const rt = Math.exp(-lambda * v.t) * 100;
        return [
          { label: "Failure Rate (λ)", value: `${(lambda * 1e6).toFixed(1)} × 10⁻⁶ /h` },
          { label: `R(${v.t}) Reliability`, value: `${rt.toFixed(2)}%` },
        ];
      },
    },
  ],
  "energy-efficiency": [
    {
      name: "CII Hesabı (AER)",
      description: "Yıllık karbon yoğunluğu göstergesini hesaplar.",
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
      name: "EEDI Hesabı",
      description: "Enerji Verimlilik Tasarım İndeksini hesaplar.",
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
      name: "EEOI Hesabı",
      description: "Enerji Verimlilik Operasyonel Göstergesini hesaplar.",
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
      name: "Hız Azaltma ile Yakıt Tasarrufu",
      description: "Hız azaltmanın yakıt tüketimine etkisi (Küp Kuralı).",
      inputs: [
        { key: "v1", label: "Current Speed", unit: "knot", placeholder: "14" },
        { key: "v2", label: "New Speed", unit: "knot", placeholder: "12" },
        { key: "fc1", label: "Current Consumption", unit: "tons/day", placeholder: "35" },
      ],
      calculate: (v) => {
        const fc2 = v.fc1 * Math.pow(v.v2 / v.v1, 3);
        const saving = ((v.fc1 - fc2) / v.fc1) * 100;
        return [
          { label: "New Consumption", value: `${fc2.toFixed(1)} tons/day` },
          { label: "Saving", value: `${saving.toFixed(1)}%` },
        ];
      },
    },
    {
      name: "EEXI Hesabı",
      description: "Mevcut gemiler için Enerji Verimlilik İndeksini hesaplar.",
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
      name: "Waste Heat Recovery (WHRS)",
      description: "Egzoz gazından geri kazanılabilir enerjiyi hesaplar.",
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
  ],
  "environment-machine": [
    {
      name: "CO₂ Emisyon Hesabı",
      description: "Yakıt tüketiminden CO₂ emisyonunu hesaplar.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "tonnes", placeholder: "100" },
        { key: "cf", label: "Carbon Factor (Cf)", unit: "t CO₂/t fuel", placeholder: "3.114" },
      ],
      calculate: (v) => {
        return [{ label: "CO₂ Emission", value: `${(v.fc * v.cf).toFixed(1)} tonnes CO₂` }];
      },
    },
    {
      name: "SOx Emisyon Hesabı",
      description: "Yakıt kükürt içeriğinden SOx emisyonunu hesaplar.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "tonnes", placeholder: "100" },
        { key: "s", label: "Sulphur Content", unit: "%", placeholder: "0.5" },
      ],
      calculate: (v) => {
        // SO₂ = 2 × S% × FC (kütle oranı: S→SO₂ çarpan ≈ 2)
        const sox = 2 * (v.s / 100) * v.fc;
        const limit = v.s <= 0.1 ? "ECA Compliant" : v.s <= 0.5 ? "Globally Compliant" : "Uyumsuz";
        return [
          { label: "SOx Emission", value: `${sox.toFixed(2)} tonnes SO₂` },
          { label: "MARPOL Status", value: limit },
        ];
      },
    },
    {
      name: "Yağlı Su Separator (OWS) Kapasite",
      description: "15 ppm OWS gerekli debi ve tank kapasitesini hesaplar.",
      inputs: [
        { key: "bilge", label: "Daily Bilge Water Generation", unit: "m³/day", placeholder: "5" },
        { key: "hours", label: "OWS Operating Time", unit: "hours/day", placeholder: "8" },
      ],
      calculate: (v) => {
        const requiredCapacity = v.bilge / v.hours;
        return [
          { label: "Required OWS Capacity", value: `${requiredCapacity.toFixed(2)} m³/hour` },
          { label: "Weekly Bilge Water", value: `${(v.bilge * 7).toFixed(1)} m³` },
        ];
      },
    },
    {
      name: "Ballast Water Treatment Capacity",
      description: "D-2 standardına uygun arıtma kapasitesini hesaplar.",
      inputs: [
        { key: "tankVol", label: "Total Ballast Volume", unit: "m³", placeholder: "15000" },
        { key: "pumpRate", label: "Ballast Pump Flow Rate", unit: "m³/hour", placeholder: "500" },
      ],
      calculate: (v) => {
        const treatmentRate = v.pumpRate;
        const totalTime = v.tankVol / v.pumpRate;
        return [
          { label: "Required Treatment Capacity", value: `${treatmentRate.toFixed(0)} m³/hour` },
          { label: "Total Time", value: `${totalTime.toFixed(1)} clock` },
        ];
      },
    },
  ],
  "engine-room-safety": [
    {
      name: "CO₂ Miktar Hesabı",
      description: "Sabit CO₂ söndürme sistemi için gerekli miktarı hesaplar (SOLAS Ch. II-2).",
      inputs: [
        { key: "vol", label: "Protected Volume", unit: "m³", placeholder: "2000" },
        { key: "factor", label: "Yoğunluk Faktörü", unit: "kg/m³", placeholder: "0.56" },
      ],
      calculate: (v) => {
        const mass = v.vol * v.factor;
        const bottles = Math.ceil(mass / 45); // 45 kg standart tüp
        return [
          { label: "Required CO₂ Quantity", value: `${mass.toFixed(0)} kg` },
          { label: "Required Number of Cylinders (45 kg)", value: `${bottles} cylinders` },
        ];
      },
    },
    {
      name: "Ventilation Flow Rate",
      description: "Makine dairesi havalandırma gereksinimini hesaplar.",
      inputs: [
        { key: "p", label: "Total Engine Power", unit: "kW", placeholder: "15000" },
        { key: "vol", label: "Machinery Space Volume", unit: "m³", placeholder: "2500" },
      ],
      calculate: (v) => {
        // Yaklaşık: motor başına ~2.5 m³/kW·h hava gereksinimi
        const airForCombustion = v.p * 2.5; // m³/saat
        const ventChanges = airForCombustion / v.vol;
        return [
          { label: "Combustion Air Requirement", value: `${airForCombustion.toFixed(0)} m³/hour` },
          { label: "Air Change Rate", value: `${ventChanges.toFixed(1)} /h` },
        ];
      },
    },
    {
      name: "Kapalı Alan Oksijen Hesabı",
      description: "Kapalı alana giriş öncesi oksijen yeterliliğini kontrol eder.",
      inputs: [
        { key: "o2", label: "Measured O₂", unit: "%", placeholder: "20.8" },
        { key: "h2s", label: "H₂S", unit: "ppm", placeholder: "0" },
        { key: "co", label: "CO", unit: "ppm", placeholder: "5" },
        { key: "lel", label: "LEL", unit: "%", placeholder: "0" },
      ],
      calculate: (v) => {
        const o2Ok = v.o2 >= 20.9;
        const h2sOk = v.h2s < 10;
        const coOk = v.co < 25;
        const lelOk = v.lel < 1;
        const safe = o2Ok && h2sOk && coOk && lelOk;
        return [
          { label: "O₂ Status", value: `${v.o2}% → ${o2Ok ? "Acceptable" : "INSUFFICIENT"}` },
          { label: "H₂S Status", value: `${v.h2s} ppm → ${h2sOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "CO Status", value: `${v.co} ppm → ${coOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "LEL Status", value: `${v.lel}% → ${lelOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "General Evaluation", value: safe ? "ENTRY PERMITTED" : "ENTRY NOT PERMITTED" },
        ];
      },
    },
  ],
  erm: [
    {
      name: "Risk Assessment",
      description: "Olasılık × Şiddet ile risk seviyesini hesaplar.",
      inputs: [
        { key: "prob", label: "Likelihood (1–5)", unit: "", placeholder: "3" },
        { key: "sev", label: "Severity (1–5)", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.prob * v.sev;
        const level = risk <= 4 ? "Low" : risk <= 9 ? "Orta" : risk <= 15 ? "High" : "Very High";
        const color = risk <= 4 ? "Green" : risk <= 9 ? "Yellow" : risk <= 15 ? "Turuncu" : "Red";
        return [
          { label: "Risk Score", value: `${risk}` },
          { label: "Risk Level", value: level },
          { label: "Risk Colour", value: color },
        ];
      },
    },
    {
      name: "Accident Frequency Rate (LTIF)",
      description: "Lost Time Injury Frequency oranını hesaplar.",
      inputs: [
        { key: "lti", label: "Number of Lost Time Injuries", unit: "", placeholder: "2" },
        { key: "hours", label: "Total Hours Worked", unit: "clock", placeholder: "500000" },
      ],
      calculate: (v) => {
        const ltif = (v.lti / v.hours) * 1e6;
        const status = ltif < 1 ? "Very Good" : ltif < 3 ? "good" : ltif < 5 ? "Orta" : "bad";
        return [
          { label: "LTIF", value: ltif.toFixed(2) },
          { label: "Assessment", value: status },
        ];
      },
    },
    {
      name: "Fatigue Index",
      description: "IMO yorgunluk yönetimi için çalışma/dinlenme saatlerini değerlendirir.",
      inputs: [
        { key: "workHours", label: "Daily Work", unit: "clock", placeholder: "14" },
        { key: "restHours", label: "Daily Rest", unit: "clock", placeholder: "10" },
        { key: "days", label: "Consecutive Days Worked", unit: "days", placeholder: "14" },
      ],
      calculate: (v) => {
        const ratio = v.workHours / v.restHours;
        const fatigue = Math.min(100, ratio * v.days * 3);
        const status = fatigue < 30 ? "Low" : fatigue < 60 ? "Orta" : fatigue < 80 ? "High" : "Kritik";
        const mclCompliant = v.workHours <= 14 && v.restHours >= 10;
        return [
          { label: "Fatigue Index", value: `${fatigue.toFixed(0)}%` },
          { label: "Risk Level", value: status },
          { label: "MLC Compliance", value: mclCompliant ? "Compliant" : "UYUMSUZ" },
        ];
      },
    },
    {
      name: "Watchkeeping Effectiveness",
      description: "Vardiya düzeninin operasyonel etkinliğini değerlendirir.",
      inputs: [
        { key: "crew", label: "Engine Room Personnel", unit: "persons", placeholder: "8" },
        { key: "watchHours", label: "Watch Duration", unit: "clock", placeholder: "4" },
        { key: "tasks", label: "Daily Routine Tasks", unit: "units", placeholder: "25" },
        { key: "incidents", label: "Monthly Incidents", unit: "units", placeholder: "2" },
      ],
      calculate: (v) => {
        const watchesPerDay = 24 / v.watchHours;
        const crewPerWatch = v.crew / (watchesPerDay > 2 ? 3 : 2);
        const taskLoad = v.tasks / v.crew;
        const effectiveness = Math.max(0, 100 - v.incidents * 10 - Math.max(0, taskLoad - 4) * 5);
        return [
          { label: "Watches per Day", value: `${watchesPerDay.toFixed(0)}` },
          { label: "Crew per Watch", value: `${crewPerWatch.toFixed(1)}` },
          { label: "Task Load per Person", value: `${taskLoad.toFixed(1)} tasks/person` },
          { label: "Effectiveness Score", value: `${effectiveness.toFixed(0)}%` },
        ];
      },
    },
  ],
  "machine-elements": [
    {
      name: "Shaft Diameter (Torsion)",
      description: "Belirli tork ve izin verilen kayma gerilmesi için minimum mil çapını hesaplar.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "50000" },
        { key: "tau", label: "Allowable τ", unit: "MPa", placeholder: "60" },
      ],
      calculate: (v) => {
        // τ = 16T / (πd³) → d = ∛(16T / πτ)
        const d = Math.pow((16 * v.t) / (Math.PI * v.tau * 1e6), 1 / 3) * 1000;
        return [{ label: "Minimum Diameter", value: `${d.toFixed(1)} mm` }];
      },
    },
    {
      name: "Bearing Life (L₁₀)",
      description: "Rulman temel ömür hesabı: L₁₀ = (C/P)^p × 10⁶ devir",
      inputs: [
        { key: "c", label: "Dynamic Load Rating (C)", unit: "kN", placeholder: "120" },
        { key: "p", label: "Equivalent Load (P)", unit: "kN", placeholder: "30" },
        { key: "n", label: "Speed", unit: "rpm", placeholder: "1500" },
        { key: "type", label: "Type (3 = ball, 10/3 = roller)", unit: "", placeholder: "3" },
      ],
      calculate: (v) => {
        const l10Rev = Math.pow(v.c / v.p, v.type) * 1e6;
        const l10Hours = l10Rev / (v.n * 60);
        return [
          { label: "L₁₀ (revolutions)", value: `${(l10Rev / 1e6).toFixed(1)} × 10⁶` },
          { label: "L₁₀ (hours)", value: `${l10Hours.toFixed(0)} clock` },
        ];
      },
    },
    {
      name: "Gear Speed Ratio",
      description: "Dişli çark devir ve tork aktarımını hesaplar.",
      inputs: [
        { key: "z1", label: "Driving Tooth Count (Z₁)", unit: "", placeholder: "20" },
        { key: "z2", label: "Driven Tooth Count (Z₂)", unit: "", placeholder: "60" },
        { key: "n1", label: "Driving Speed (n₁)", unit: "rpm", placeholder: "1500" },
        { key: "t1", label: "Driving Torque (T₁)", unit: "N·m", placeholder: "100" },
      ],
      calculate: (v) => {
        const ratio = v.z2 / v.z1;
        const n2 = v.n1 / ratio;
        const t2 = v.t1 * ratio * 0.97; // ~%3 kayıp
        return [
          { label: "Gear Ratio (i)", value: `${ratio.toFixed(2)}:1` },
          { label: "Output Speed (n₂)", value: `${n2.toFixed(0)} rpm` },
          { label: "Output Torque (T₂)", value: `${t2.toFixed(1)} N·m` },
        ];
      },
    },
    {
      name: "Weld Seam Stress",
      description: "Alın ve köşe kaynağı gerilme kontrolü.",
      inputs: [
        { key: "f", label: "Applied Force (F)", unit: "kN", placeholder: "200" },
        { key: "l", label: "Weld Length (L)", unit: "mm", placeholder: "200" },
        { key: "a", label: "Weld Throat Thickness (a)", unit: "mm", placeholder: "6" },
      ],
      calculate: (v) => {
        const area = v.l * v.a; // mm²
        const stress = (v.f * 1000) / area; // N/mm² = MPa
        const status = stress < 100 ? "Compliant" : stress < 160 ? "Caution" : "Excessive";
        return [
          { label: "Weld Stress", value: `${stress.toFixed(1)} MPa` },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
  automation: [
    {
      name: "4-20 mA Conversion",
      description: "Ölçüm değerini 4-20 mA sinyaline dönüştürür.",
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
    {
      name: "RTD Sıcaklık Hesabı",
      description: "Pt100 RTD direncinden sıcaklık hesabı: Rt = R₀(1 + αΔT)",
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
      name: "PID Controller Output",
      description: "PID kontrolör çıkış sinyalini hesaplar.",
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
      name: "Thermocouple EMF → Sıcaklık",
      description: "K-tipi thermocouple EMF değerinden sıcaklığı tahmin eder.",
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
      name: "Accuracy / Error Calculation",
      description: "Ölçüm cihazı doğruluğunu ve hata yüzdesini hesaplar.",
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
  ],
  "engine-room-ops": [
    {
      name: "Remaining Fuel Endurance",
      description: "Mevcut yakıt stokuyla tahmini çalışma süresini hesaplar.",
      inputs: [
        { key: "stock", label: "Fuel Stock", unit: "tonnes", placeholder: "500" },
        { key: "rate", label: "Consumption Rate", unit: "tons/day", placeholder: "30" },
      ],
      calculate: (v) => {
        const days = v.stock / v.rate;
        return [
          { label: "Estimated Range", value: `${days.toFixed(1)} days` },
          { label: "Time", value: `${(days * 24).toFixed(0)} clock` },
        ];
      },
    },
    {
      name: "Seyire Hazırlık Kontrol Listesi Süresi",
      description: "Seyir hazırlığı için tahmini süreyi hesaplar.",
      inputs: [
        { key: "engines", label: "Number of Engines", unit: "", placeholder: "2" },
        { key: "gens", label: "Number of Generators", unit: "", placeholder: "3" },
        { key: "preHeat", label: "Pre-heating Time", unit: "min", placeholder: "60" },
        { key: "loCirc", label: "LO Circulation", unit: "min", placeholder: "30" },
      ],
      calculate: (v) => {
        const totalPreheat = Math.max(v.preHeat, v.loCirc);
        const startupTime = v.engines * 15 + v.gens * 10; // dakika
        const total = totalPreheat + startupTime + 30; // +30 dk kontrol
        return [
          { label: "Preparation", value: `${totalPreheat} min` },
          { label: "Start-up", value: `${startupTime} min` },
          { label: "Total Time", value: `${total} min` },
        ];
      },
    },
    {
      name: "Lubricating Oil Consumption Monitoring",
      description: "Silindir ve sistem yağı tüketimini hesaplar.",
      inputs: [
        { key: "cylOil", label: "Cylinder Oil Consumption", unit: "g/kW·h", placeholder: "0.7" },
        { key: "bhp", label: "Engine Power", unit: "kW", placeholder: "15000" },
        { key: "hours", label: "Operating Time", unit: "clock", placeholder: "720" },
      ],
      calculate: (v) => {
        const consumption = (v.cylOil * v.bhp * v.hours) / 1e6; // ton
        const dailyRate = consumption / (v.hours / 24);
        return [
          { label: "Total Cylinder Oil", value: `${(consumption * 1000).toFixed(0)} kg` },
          { label: "Daily Consumption", value: `${(dailyRate * 1000).toFixed(1)} kg/day` },
        ];
      },
    },
    {
      name: "Engine Warm-up Time",
      description: "Soğuk motorun servis sıcaklığına ulaşma süresini tahmin eder.",
      inputs: [
        { key: "mass", label: "Engine Block Mass", unit: "tonnes", placeholder: "200" },
        { key: "cp", label: "Specific Heat (steel)", unit: "kJ/kg·K", placeholder: "0.5" },
        { key: "tStart", label: "Initial Temperature", unit: "°C", placeholder: "20" },
        { key: "tTarget", label: "Target Temperature", unit: "°C", placeholder: "60" },
        { key: "qHeater", label: "Heater Power", unit: "kW", placeholder: "150" },
      ],
      calculate: (v) => {
        const energy = v.mass * 1000 * v.cp * (v.tTarget - v.tStart);
        const timeH = energy / (v.qHeater * 3600);
        return [
          { label: "Required Energy", value: `${(energy / 3600).toFixed(0)} kWh` },
          { label: "Estimated Warm-up Time", value: `${(timeH * 60).toFixed(0)} min` },
        ];
      },
    },
    {
      name: "Yağ Basınç Kontrol",
      description: "Motor yağ basıncının kabul edilebilir aralıkta olup olmadığını kontrol eder.",
      inputs: [
        { key: "pMeasured", label: "Measured Pressure", unit: "bar", placeholder: "4.2" },
        { key: "pMin", label: "Minimum Allowable", unit: "bar", placeholder: "2.5" },
        { key: "pMax", label: "Maximum Allowable", unit: "bar", placeholder: "6.0" },
        { key: "pAlarm", label: "Alarm Value", unit: "bar", placeholder: "2.0" },
      ],
      calculate: (v) => {
        const status = v.pMeasured < v.pAlarm ? "ALARM" : v.pMeasured < v.pMin ? "Low" : v.pMeasured > v.pMax ? "High" : "Normal";
        const margin = ((v.pMeasured - v.pAlarm) / v.pAlarm) * 100;
        return [
          { label: "Durum", value: status },
          { label: "Alarm Margin", value: `${margin.toFixed(1)}%` },
          { label: "Range", value: `${v.pMin}–${v.pMax} bar` },
        ];
      },
    },
  ],
};

function CalcToolCard({ tool }: { tool: CalcTool }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: string }[] | null>(null);

  const handleCalc = () => {
    const numVals: Record<string, number> = {};
    for (const inp of tool.inputs) {
      const v = parseFloat(vals[inp.key] || "0");
      if (isNaN(v)) return;
      numVals[inp.key] = v;
    }
    const r = tool.calculate(numVals);
    setResults(Array.isArray(r) ? r : [r]);
  };

  return (
    <Card className="bg-card/80 border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{tool.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {tool.inputs.map((inp) => (
            <div key={inp.key} className="space-y-1">
              <Label className="text-xs">{inp.label} {inp.unit && <span className="text-muted-foreground">({inp.unit})</span>}</Label>
              <Input
                type="number"
                placeholder={inp.placeholder}
                value={vals[inp.key] || ""}
                onChange={(e) => setVals((p) => ({ ...p, [inp.key]: e.target.value }))}
                className="h-9"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleCalc} size="sm" className="w-full gap-2">
          <Calculator className="h-4 w-4" /> Calculate
        </Button>
        {results && (
          <div className="bg-primary/5 rounded-lg p-3 space-y-1">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-semibold text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MachineTopicCalculationsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();

  // Use the unified design when the single source registry has the topic; otherwise fall back to the legacy static data.
  const courseTopic = getCourseTopic(topicSlug);
  if (courseTopic) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto max-w-4xl space-y-6 p-4">
          <CourseTopicHeader topic={courseTopic} section="calculations" />
          <CalculationQualityBanner />
          <CalculatorList topic={courseTopic} />
        </div>
      </div>
    );
  }

  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const calcs = topicSlug ? topicCalculations[topicSlug] : null;

  if (!topic || !calcs || calcs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Hesaplama aracı bulunamadı</p>
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
                <Calculator className="h-3.5 w-3.5" /> Hesaplamalar
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-4">
          {calcs.map((tool, idx) => (
            <CalcToolCard key={idx} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
