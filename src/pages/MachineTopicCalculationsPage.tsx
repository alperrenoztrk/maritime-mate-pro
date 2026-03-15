import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { ArrowLeft, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CalcTool {
  name: string;
  description: string;
  inputs: { key: string; label: string; unit: string; placeholder?: string }[];
  calculate: (vals: Record<string, number>) => { label: string; value: string }[];
}

const topicCalculations: Record<string, CalcTool[]> = {
  thermodynamics: [
    {
      name: "Carnot Verimi",
      description: "Sıcak ve soğuk kaynak sıcaklıkları ile Carnot çevrim verimini hesaplar.",
      inputs: [
        { key: "th", label: "Sıcak Kaynak (T_H)", unit: "°C", placeholder: "500" },
        { key: "tl", label: "Soğuk Kaynak (T_L)", unit: "°C", placeholder: "30" },
      ],
      calculate: (v) => {
        const TH = v.th + 273.15;
        const TL = v.tl + 273.15;
        const eta = (1 - TL / TH) * 100;
        return [{ label: "Carnot Verimi (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "LMTD Hesabı",
      description: "Isı eşanjöründe logaritmik ortalama sıcaklık farkını hesaplar (karşı akış).",
      inputs: [
        { key: "t1i", label: "Sıcak Giriş", unit: "°C", placeholder: "90" },
        { key: "t1o", label: "Sıcak Çıkış", unit: "°C", placeholder: "60" },
        { key: "t2i", label: "Soğuk Giriş", unit: "°C", placeholder: "20" },
        { key: "t2o", label: "Soğuk Çıkış", unit: "°C", placeholder: "50" },
      ],
      calculate: (v) => {
        const dt1 = v.t1i - v.t2o;
        const dt2 = v.t1o - v.t2i;
        if (dt1 <= 0 || dt2 <= 0) return [{ label: "Hata", value: "Sıcaklık farkları pozitif olmalı" }];
        const lmtd = Math.abs(dt1 - dt2) < 0.01 ? dt1 : (dt1 - dt2) / Math.log(dt1 / dt2);
        return [{ label: "LMTD", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
    {
      name: "Isı Eşanjörü Alanı",
      description: "Q = U × A × LMTD formülünden gerekli ısı transfer alanını hesaplar.",
      inputs: [
        { key: "q", label: "Isı Yükü (Q)", unit: "kW", placeholder: "500" },
        { key: "u", label: "Toplam Isı Transfer Katsayısı (U)", unit: "W/m²·K", placeholder: "2500" },
        { key: "lmtd", label: "LMTD", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        const area = (v.q * 1000) / (v.u * v.lmtd);
        return [{ label: "Gerekli Alan (A)", value: `${area.toFixed(2)} m²` }];
      },
    },
    {
      name: "Diesel Çevrim Verimi",
      description: "Sıkıştırma oranı ve kesme oranından Diesel çevrim verimini hesaplar.",
      inputs: [
        { key: "r", label: "Sıkıştırma Oranı (r)", unit: "", placeholder: "18" },
        { key: "rc", label: "Kesme Oranı (ρ)", unit: "", placeholder: "2.5" },
        { key: "gamma", label: "Özgül Isı Oranı (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - (1 / Math.pow(v.r, v.gamma - 1)) * ((Math.pow(v.rc, v.gamma) - 1) / (v.gamma * (v.rc - 1)))) * 100;
        return [{ label: "Diesel Çevrim Verimi (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Otto Çevrim Verimi",
      description: "Sıkıştırma oranından Otto çevrim verimini hesaplar.",
      inputs: [
        { key: "r", label: "Sıkıştırma Oranı (r)", unit: "", placeholder: "10" },
        { key: "gamma", label: "Özgül Isı Oranı (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - 1 / Math.pow(v.r, v.gamma - 1)) * 100;
        return [{ label: "Otto Çevrim Verimi (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Isı Miktarı Hesabı",
      description: "Q = m × c × ΔT formülüyle ısı miktarını hesaplar.",
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "1000" },
        { key: "c", label: "Özgül Isı (c)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "°C", placeholder: "20" },
      ],
      calculate: (v) => {
        const q = v.m * v.c * v.dt;
        return [
          { label: "Isı Miktarı (Q)", value: `${q.toFixed(1)} kJ` },
          { label: "Isı Miktarı", value: `${(q / 3600).toFixed(2)} kWh` },
        ];
      },
    },
    {
      name: "Entropi Değişimi",
      description: "ΔS = Q/T formülüyle entropi değişimini hesaplar.",
      inputs: [
        { key: "q", label: "Isı Miktarı (Q)", unit: "kJ", placeholder: "500" },
        { key: "t", label: "Sıcaklık (T)", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        const ds = v.q / tK;
        return [{ label: "Entropi Değişimi (ΔS)", value: `${ds.toFixed(4)} kJ/K` }];
      },
    },
    {
      name: "Politropik Süreç",
      description: "P₁V₁ⁿ = P₂V₂ⁿ ile son basınç ve işi hesaplar.",
      inputs: [
        { key: "p1", label: "Başlangıç Basıncı (P₁)", unit: "bar", placeholder: "1" },
        { key: "v1", label: "Başlangıç Hacmi (V₁)", unit: "m³", placeholder: "0.5" },
        { key: "v2", label: "Son Hacim (V₂)", unit: "m³", placeholder: "0.05" },
        { key: "n", label: "Politropik İndeks (n)", unit: "", placeholder: "1.3" },
      ],
      calculate: (v) => {
        const p2 = v.p1 * Math.pow(v.v1 / v.v2, v.n);
        const work = (v.p1 * 1e5 * v.v1 - p2 * 1e5 * v.v2) / (v.n - 1);
        return [
          { label: "Son Basınç (P₂)", value: `${p2.toFixed(2)} bar` },
          { label: "İş (W)", value: `${(work / 1000).toFixed(2)} kJ` },
        ];
      },
    },
    {
      name: "Isı İletimi (Fourier)",
      description: "Q = k × A × ΔT / L ile düz duvar ısı iletimini hesaplar.",
      inputs: [
        { key: "k", label: "Isı İletim Katsayısı (k)", unit: "W/m·K", placeholder: "50" },
        { key: "a", label: "Alan (A)", unit: "m²", placeholder: "2" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "°C", placeholder: "80" },
        { key: "l", label: "Duvar Kalınlığı (L)", unit: "m", placeholder: "0.05" },
      ],
      calculate: (v) => {
        const q = (v.k * v.a * v.dt) / v.l;
        return [{ label: "Isı Akısı (Q)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
  ],
  "fluid-mechanics": [
    {
      name: "Reynolds Sayısı",
      description: "Akış rejimini belirlemek için Reynolds sayısını hesaplar.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
        { key: "v", label: "Hız (v)", unit: "m/s", placeholder: "2" },
        { key: "d", label: "Çap (D)", unit: "m", placeholder: "0.1" },
        { key: "mu", label: "Dinamik Viskozite (μ)", unit: "Pa·s", placeholder: "0.001" },
      ],
      calculate: (vals) => {
        const re = (vals.rho * vals.v * vals.d) / vals.mu;
        const regime = re < 2300 ? "Laminer" : re < 4000 ? "Geçiş" : "Türbülanslı";
        return [
          { label: "Reynolds Sayısı", value: re.toFixed(0) },
          { label: "Akış Rejimi", value: regime },
        ];
      },
    },
    {
      name: "Pompa Gücü",
      description: "Santrifüj pompa gücünü hesaplar.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "q", label: "Debi (Q)", unit: "m³/h", placeholder: "100" },
        { key: "h", label: "Basma Yüksekliği (H)", unit: "m", placeholder: "30" },
        { key: "eta", label: "Verim (η)", unit: "%", placeholder: "75" },
      ],
      calculate: (vals) => {
        const qm3s = vals.q / 3600;
        const power = (vals.rho * 9.81 * qm3s * vals.h) / (vals.eta / 100);
        return [{ label: "Pompa Gücü", value: `${(power / 1000).toFixed(2)} kW` }];
      },
    },
    {
      name: "Bernoulli Denklemi",
      description: "İki nokta arasında Bernoulli denklemini uygulayarak basınç veya hız hesaplar.",
      inputs: [
        { key: "p1", label: "P₁ (Basınç)", unit: "kPa", placeholder: "200" },
        { key: "v1", label: "v₁ (Hız)", unit: "m/s", placeholder: "2" },
        { key: "z1", label: "z₁ (Yükseklik)", unit: "m", placeholder: "5" },
        { key: "z2", label: "z₂ (Yükseklik)", unit: "m", placeholder: "0" },
        { key: "v2", label: "v₂ (Hız)", unit: "m/s", placeholder: "4" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const p2 = v.p1 * 1000 + 0.5 * v.rho * (v.v1 * v.v1 - v.v2 * v.v2) + v.rho * 9.81 * (v.z1 - v.z2);
        return [{ label: "P₂ (Basınç)", value: `${(p2 / 1000).toFixed(2)} kPa` }];
      },
    },
    {
      name: "Darcy-Weisbach Basınç Kaybı",
      description: "Boru hattında sürtünme kaynaklı basınç kaybını hesaplar.",
      inputs: [
        { key: "f", label: "Sürtünme Faktörü (f)", unit: "", placeholder: "0.02" },
        { key: "l", label: "Boru Uzunluğu (L)", unit: "m", placeholder: "50" },
        { key: "d", label: "Boru Çapı (D)", unit: "m", placeholder: "0.1" },
        { key: "v", label: "Akış Hızı (v)", unit: "m/s", placeholder: "3" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (vals) => {
        const hf = vals.f * (vals.l / vals.d) * (vals.v * vals.v) / (2 * 9.81);
        const dp = vals.rho * 9.81 * hf;
        return [
          { label: "Yük Kaybı (h_f)", value: `${hf.toFixed(2)} m` },
          { label: "Basınç Kaybı (ΔP)", value: `${(dp / 1000).toFixed(2)} kPa` },
        ];
      },
    },
    {
      name: "NPSH Hesabı",
      description: "Pompa emişinde mevcut NPSH değerini hesaplar.",
      inputs: [
        { key: "pa", label: "Atmosfer Basıncı", unit: "kPa", placeholder: "101.325" },
        { key: "pv", label: "Buhar Basıncı", unit: "kPa", placeholder: "2.34" },
        { key: "hs", label: "Emiş Yüksekliği (+/-)", unit: "m", placeholder: "3" },
        { key: "hf", label: "Emiş Hattı Kaybı", unit: "m", placeholder: "0.5" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const npsha = (v.pa - v.pv) * 1000 / (v.rho * 9.81) + v.hs - v.hf;
        return [{ label: "NPSH_A", value: `${npsha.toFixed(2)} m` }];
      },
    },
    {
      name: "Devamlılık Denklemi",
      description: "A₁V₁ = A₂V₂ ile boru daraltma/genişletmede hız hesabı.",
      inputs: [
        { key: "d1", label: "Çap 1 (D₁)", unit: "m", placeholder: "0.2" },
        { key: "v1", label: "Hız 1 (V₁)", unit: "m/s", placeholder: "2" },
        { key: "d2", label: "Çap 2 (D₂)", unit: "m", placeholder: "0.1" },
      ],
      calculate: (v) => {
        const a1 = Math.PI * Math.pow(v.d1, 2) / 4;
        const a2 = Math.PI * Math.pow(v.d2, 2) / 4;
        const v2 = (a1 * v.v1) / a2;
        const q = a1 * v.v1;
        return [
          { label: "V₂ (Hız)", value: `${v2.toFixed(2)} m/s` },
          { label: "Debi (Q)", value: `${(q * 3600).toFixed(1)} m³/h` },
        ];
      },
    },
    {
      name: "Afinite Kuralları",
      description: "Pompa/fan hız değişiminde debi, basınç ve güç ilişkisini hesaplar.",
      inputs: [
        { key: "n1", label: "Mevcut Devir (n₁)", unit: "rpm", placeholder: "1450" },
        { key: "n2", label: "Yeni Devir (n₂)", unit: "rpm", placeholder: "1200" },
        { key: "q1", label: "Mevcut Debi (Q₁)", unit: "m³/h", placeholder: "100" },
        { key: "h1", label: "Mevcut Basma Yük. (H₁)", unit: "m", placeholder: "30" },
        { key: "p1", label: "Mevcut Güç (P₁)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const ratio = v.n2 / v.n1;
        const q2 = v.q1 * ratio;
        const h2 = v.h1 * Math.pow(ratio, 2);
        const p2 = v.p1 * Math.pow(ratio, 3);
        return [
          { label: "Yeni Debi (Q₂)", value: `${q2.toFixed(1)} m³/h` },
          { label: "Yeni Basma Yük. (H₂)", value: `${h2.toFixed(1)} m` },
          { label: "Yeni Güç (P₂)", value: `${p2.toFixed(2)} kW` },
        ];
      },
    },
  ],
  "diesel-engines": [
    {
      name: "İndike Güç (IHP)",
      description: "Ana makinenin indike gücünü hesaplar. P = (Pmi × L × A × n × k) / 60",
      inputs: [
        { key: "pmi", label: "Ortalama İndike Basınç (P_mi)", unit: "bar", placeholder: "18" },
        { key: "l", label: "Strok (L)", unit: "m", placeholder: "2.5" },
        { key: "a", label: "Piston Alanı (A)", unit: "m²", placeholder: "0.35" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Silindir Sayısı (k)", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        // P_mi (bar) * 10^5 (Pa) * L * A * n * k / 60 → Watt → /1000 → kW
        const ihp = (v.pmi * 1e5 * v.l * v.a * v.n * v.k) / (60 * 1000);
        return [{ label: "İndike Güç (IHP)", value: `${ihp.toFixed(1)} kW` }];
      },
    },
    {
      name: "SFOC Hesabı",
      description: "Özgül yakıt tüketimini hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "kg/saat", placeholder: "5000" },
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "25000" },
      ],
      calculate: (v) => {
        const sfoc = (v.fc / v.bhp) * 1000;
        return [{ label: "SFOC", value: `${sfoc.toFixed(1)} g/kW·h` }];
      },
    },
    {
      name: "Fren Gücü (BHP)",
      description: "İndike güçten fren gücünü hesaplar: BHP = IHP × η_mek",
      inputs: [
        { key: "ihp", label: "İndike Güç (IHP)", unit: "kW", placeholder: "12000" },
        { key: "eta", label: "Mekanik Verim (η_mek)", unit: "%", placeholder: "90" },
      ],
      calculate: (v) => {
        const bhp = v.ihp * (v.eta / 100);
        const loss = v.ihp - bhp;
        return [
          { label: "Fren Gücü (BHP)", value: `${bhp.toFixed(1)} kW` },
          { label: "Mekanik Kayıp", value: `${loss.toFixed(1)} kW` },
        ];
      },
    },
    {
      name: "Termal Verim",
      description: "Motor termal verimini hesaplar: η = (BHP × 3600) / (ṁ_f × LCV)",
      inputs: [
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "10000" },
        { key: "fc", label: "Yakıt Tüketimi (ṁ_f)", unit: "kg/saat", placeholder: "1850" },
        { key: "lcv", label: "Alt Isıl Değer (LCV)", unit: "kJ/kg", placeholder: "42700" },
      ],
      calculate: (v) => {
        const eta = (v.bhp * 3600) / (v.fc * v.lcv) * 100;
        return [{ label: "Termal Verim (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
    {
      name: "Ortalama Efektif Basınç (MEP)",
      description: "BMEP veya IMEP hesabı: MEP = (P × 60) / (V_s × n × k)",
      inputs: [
        { key: "p", label: "Güç (P)", unit: "kW", placeholder: "10000" },
        { key: "bore", label: "Silindir Çapı", unit: "m", placeholder: "0.5" },
        { key: "stroke", label: "Strok", unit: "m", placeholder: "2.0" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Silindir Sayısı", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore, 2) / 4 * v.stroke; // m³
        const mep = (v.p * 1000 * 60) / (vs * v.n * v.k); // Pa
        return [
          { label: "MEP", value: `${(mep / 1e5).toFixed(2)} bar` },
          { label: "Silindir Hacmi (V_s)", value: `${(vs * 1000).toFixed(1)} litre` },
        ];
      },
    },
    {
      name: "Admiralty Katsayısı",
      description: "Hız-güç ilişkisini belirler: C = (Δ^(2/3) × V³) / P",
      inputs: [
        { key: "delta", label: "Deplasman (Δ)", unit: "ton", placeholder: "50000" },
        { key: "v", label: "Hız (V)", unit: "knot", placeholder: "14" },
        { key: "p", label: "Güç (P)", unit: "kW", placeholder: "10000" },
      ],
      calculate: (v) => {
        const c = (Math.pow(v.delta, 2 / 3) * Math.pow(v.v, 3)) / v.p;
        return [{ label: "Admiralty Katsayısı (C)", value: c.toFixed(1) }];
      },
    },
    {
      name: "Sıkıştırma Oranı",
      description: "Silindir geometrisinden sıkıştırma oranını hesaplar.",
      inputs: [
        { key: "bore", label: "Silindir Çapı", unit: "mm", placeholder: "500" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "2000" },
        { key: "vc", label: "Ölü Hacim (V_c)", unit: "litre", placeholder: "15" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000) * 1000; // litre
        const cr = (vs + v.vc) / v.vc;
        return [
          { label: "Strok Hacmi (V_s)", value: `${vs.toFixed(1)} litre` },
          { label: "Sıkıştırma Oranı (r)", value: `${cr.toFixed(1)}:1` },
        ];
      },
    },
    {
      name: "Hava Fazlalık Katsayısı (λ)",
      description: "Gerçek hava/yakıt oranını stokiyometrik orana bölerek λ hesaplar.",
      inputs: [
        { key: "afr", label: "Gerçek Hava/Yakıt Oranı", unit: "kg/kg", placeholder: "42" },
        { key: "stoich", label: "Stokiyometrik Oran", unit: "kg/kg", placeholder: "14.7" },
      ],
      calculate: (v) => {
        const lambda = v.afr / v.stoich;
        const status = lambda < 1 ? "Zengin Karışım" : lambda > 1.5 ? "Fakir Karışım" : "Normal Aralık";
        return [
          { label: "Hava Fazlalık Katsayısı (λ)", value: lambda.toFixed(2) },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
  "ship-systems": [
    {
      name: "Yakıt Tüketimi",
      description: "Seyir süresine göre toplam yakıt tüketimini hesaplar.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "bhp", label: "BHP", unit: "kW", placeholder: "15000" },
        { key: "t", label: "Süre", unit: "saat", placeholder: "240" },
      ],
      calculate: (v) => {
        const fc = (v.sfoc * v.bhp * v.t) / 1e6;
        return [{ label: "Toplam Yakıt", value: `${fc.toFixed(1)} ton` }];
      },
    },
    {
      name: "Dümen Torku",
      description: "Joessel formülüyle dümen torkunu hesaplar.",
      inputs: [
        { key: "a", label: "Dümen Alanı (A)", unit: "m²", placeholder: "12" },
        { key: "v", label: "Gemi Hızı (V)", unit: "knot", placeholder: "15" },
        { key: "alpha", label: "Dümen Açısı (α)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const vMs = v.v * 0.5144;
        const alphaRad = v.alpha * Math.PI / 180;
        // Joessel: F = 577 × A × V² × sin(α) (N)
        const force = 577 * v.a * vMs * vMs * Math.sin(alphaRad);
        // Tork = F × d (d ≈ 0.35 × kord uzunluğu, tahmini olarak alan/yükseklik)
        const torque = force * 0.35 * Math.sqrt(v.a);
        return [
          { label: "Dümen Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
          { label: "Dümen Torku", value: `${(torque / 1000).toFixed(1)} kN·m` },
        ];
      },
    },
    {
      name: "Pervane İtme Kuvveti",
      description: "Pervane tarafından üretilen itme kuvvetini hesaplar.",
      inputs: [
        { key: "rho", label: "Deniz Suyu Yoğunluğu", unit: "kg/m³", placeholder: "1025" },
        { key: "d", label: "Pervane Çapı", unit: "m", placeholder: "6" },
        { key: "n", label: "Devir", unit: "rps", placeholder: "2" },
        { key: "kt", label: "İtme Katsayısı (K_T)", unit: "", placeholder: "0.18" },
      ],
      calculate: (v) => {
        // T = K_T × ρ × n² × D⁴
        const thrust = v.kt * v.rho * v.n * v.n * Math.pow(v.d, 4);
        return [{ label: "İtme Kuvveti (T)", value: `${(thrust / 1000).toFixed(1)} kN` }];
      },
    },
    {
      name: "Hidrolik Silindir Kuvveti",
      description: "Basınç ve piston alanından silindir kuvvetini hesaplar.",
      inputs: [
        { key: "p", label: "Basınç", unit: "bar", placeholder: "200" },
        { key: "d", label: "Piston Çapı", unit: "mm", placeholder: "150" },
      ],
      calculate: (v) => {
        const areaM2 = Math.PI * Math.pow(v.d / 1000, 2) / 4;
        const force = v.p * 1e5 * areaM2;
        return [
          { label: "Piston Alanı", value: `${(areaM2 * 1e4).toFixed(2)} cm²` },
          { label: "Silindir Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
    {
      name: "Walther Viskozite-Sıcaklık",
      description: "Walther denklemiyle farklı sıcaklıktaki viskoziteyi tahmin eder.",
      inputs: [
        { key: "v1", label: "Viskozite @T₁", unit: "cSt", placeholder: "380" },
        { key: "t1", label: "Sıcaklık T₁", unit: "°C", placeholder: "50" },
        { key: "v2", label: "Viskozite @T₂", unit: "cSt", placeholder: "15" },
        { key: "t2", label: "Sıcaklık T₂", unit: "°C", placeholder: "130" },
        { key: "tx", label: "Hedef Sıcaklık T_x", unit: "°C", placeholder: "100" },
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
        return [{ label: `Viskozite @${v.tx}°C`, value: `${vx.toFixed(1)} cSt` }];
      },
    },
    {
      name: "Yağ Film Kalınlığı",
      description: "Sommerfeld sayısı ile minimum yağ film kalınlığını tahmin eder.",
      inputs: [
        { key: "mu", label: "Yağ Viskozitesi (μ)", unit: "Pa·s", placeholder: "0.05" },
        { key: "n", label: "Devir (n)", unit: "rps", placeholder: "5" },
        { key: "p", label: "Birim Yük (P)", unit: "MPa", placeholder: "3" },
        { key: "c", label: "Yatak Boşluğu (c)", unit: "mm", placeholder: "0.1" },
        { key: "r", label: "Mil Yarıçapı (r)", unit: "mm", placeholder: "100" },
      ],
      calculate: (v) => {
        // Sommerfeld number: S = (μ × n / P) × (r/c)²
        const S = (v.mu * v.n / (v.p * 1e6)) * Math.pow((v.r / v.c), 2);
        const hMin = v.c * (1 - 1 / (1 + 2 * S)); // Approximate
        return [
          { label: "Sommerfeld Sayısı (S)", value: S.toFixed(3) },
          { label: "Min. Film Kalınlığı", value: `${(hMin * 1000).toFixed(1)} µm` },
        ];
      },
    },
  ],
  auxiliary: [
    {
      name: "Jeneratör Gücü (3 Faz)",
      description: "Üç fazlı jeneratör elektrik gücünü hesaplar.",
      inputs: [
        { key: "v", label: "Hat Gerilimi (V)", unit: "V", placeholder: "440" },
        { key: "i", label: "Hat Akımı (I)", unit: "A", placeholder: "500" },
        { key: "pf", label: "Güç Faktörü (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (vals) => {
        const p = Math.sqrt(3) * vals.v * vals.i * vals.pf;
        return [
          { label: "Aktif Güç (P)", value: `${(p / 1000).toFixed(1)} kW` },
          { label: "Görünür Güç (S)", value: `${(Math.sqrt(3) * vals.v * vals.i / 1000).toFixed(1)} kVA` },
        ];
      },
    },
    {
      name: "Kazan Buhar Üretimi",
      description: "Kazan buhar üretim kapasitesini hesaplar.",
      inputs: [
        { key: "q", label: "Yakıt Isıl Gücü", unit: "kW", placeholder: "2000" },
        { key: "eta", label: "Kazan Verimi", unit: "%", placeholder: "85" },
        { key: "hfg", label: "Buharlaşma Isısı", unit: "kJ/kg", placeholder: "2257" },
      ],
      calculate: (v) => {
        const steam = (v.q * (v.eta / 100) * 3600) / (v.hfg);
        return [{ label: "Buhar Üretimi", value: `${steam.toFixed(0)} kg/saat` }];
      },
    },
    {
      name: "Separatör Kapasitesi",
      description: "Santrifüj separatör akış kapasitesini hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "litre/saat", placeholder: "3000" },
        { key: "factor", label: "Güvenlik Faktörü", unit: "", placeholder: "1.2" },
        { key: "hours", label: "Çalışma Süresi", unit: "saat/gün", placeholder: "20" },
      ],
      calculate: (v) => {
        const capacity = (v.fc * 24 * v.factor) / v.hours;
        return [{ label: "Gerekli Kapasite", value: `${capacity.toFixed(0)} litre/saat` }];
      },
    },
    {
      name: "Kompresör Hacimsel Debisi",
      description: "Pistonlu kompresör hacimsel debisini hesaplar.",
      inputs: [
        { key: "bore", label: "Silindir Çapı", unit: "mm", placeholder: "250" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "200" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "1000" },
        { key: "k", label: "Silindir Sayısı", unit: "", placeholder: "2" },
        { key: "etav", label: "Hacimsel Verim", unit: "%", placeholder: "85" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000);
        const qTheory = vs * v.n * v.k; // m³/min
        const qActual = qTheory * (v.etav / 100);
        return [
          { label: "Teorik Debi", value: `${(qTheory * 60).toFixed(2)} m³/saat` },
          { label: "Gerçek Debi", value: `${(qActual * 60).toFixed(2)} m³/saat` },
        ];
      },
    },
    {
      name: "Tatlı Su Üretimi (Evaporatör)",
      description: "Vakumlu evaporatör ile tatlı su üretim miktarını hesaplar.",
      inputs: [
        { key: "qAvail", label: "Kullanılabilir Isı", unit: "kW", placeholder: "300" },
        { key: "hfg", label: "Buharlaşma Isısı (vakumda)", unit: "kJ/kg", placeholder: "2400" },
        { key: "eta", label: "Evaporatör Verimi", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const production = (v.qAvail * (v.eta / 100) * 3600) / v.hfg;
        return [
          { label: "Su Üretimi", value: `${production.toFixed(0)} kg/saat` },
          { label: "Günlük Üretim", value: `${(production * 24 / 1000).toFixed(1)} ton/gün` },
        ];
      },
    },
  ],
  electrical: [
    {
      name: "Gerilim Düşümü",
      description: "Kablo gerilim düşümünü hesaplar.",
      inputs: [
        { key: "i", label: "Akım (I)", unit: "A", placeholder: "100" },
        { key: "r", label: "Birim Direnç (R)", unit: "Ω/km", placeholder: "0.5" },
        { key: "l", label: "Kablo Uzunluğu (L)", unit: "m", placeholder: "50" },
        { key: "pf", label: "Güç Faktörü", unit: "", placeholder: "0.85" },
      ],
      calculate: (v) => {
        const drop = 2 * v.i * (v.r / 1000) * v.l * v.pf;
        const dropPercent = (drop / 440) * 100;
        return [
          { label: "Gerilim Düşümü", value: `${drop.toFixed(2)} V` },
          { label: "Düşüm Oranı (440V'a göre)", value: `${dropPercent.toFixed(2)}%` },
        ];
      },
    },
    {
      name: "Jeneratör Frekansı",
      description: "f = (n × P) / 120 formülüyle jeneratör frekansını hesaplar.",
      inputs: [
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "720" },
        { key: "p", label: "Kutup Sayısı (P)", unit: "", placeholder: "10" },
      ],
      calculate: (v) => {
        const f = (v.n * v.p) / 120;
        return [{ label: "Frekans (f)", value: `${f.toFixed(1)} Hz` }];
      },
    },
    {
      name: "Kısa Devre Akımı",
      description: "Kısa devre akımı hesabı: I_sc = V / Z",
      inputs: [
        { key: "v", label: "Hat Gerilimi", unit: "V", placeholder: "440" },
        { key: "z", label: "Empedans (Z)", unit: "Ω", placeholder: "0.05" },
      ],
      calculate: (v) => {
        const isc = v.v / (Math.sqrt(3) * v.z);
        return [{ label: "Kısa Devre Akımı", value: `${isc.toFixed(0)} A` }];
      },
    },
    {
      name: "Trafo Dönüşüm Oranı",
      description: "Transformatör dönüşüm oranı ve ikincil değerleri hesaplar.",
      inputs: [
        { key: "v1", label: "Primer Gerilim (V₁)", unit: "V", placeholder: "440" },
        { key: "v2", label: "Sekonder Gerilim (V₂)", unit: "V", placeholder: "220" },
        { key: "i1", label: "Primer Akım (I₁)", unit: "A", placeholder: "50" },
      ],
      calculate: (v) => {
        const ratio = v.v1 / v.v2;
        const i2 = v.i1 * ratio;
        return [
          { label: "Dönüşüm Oranı", value: `${ratio.toFixed(2)}:1` },
          { label: "Sekonder Akım (I₂)", value: `${i2.toFixed(1)} A` },
        ];
      },
    },
    {
      name: "İzolasyon Direnci",
      description: "Minimum izolasyon direnci kontrolü. IR = V_test / I_kaçak",
      inputs: [
        { key: "vtest", label: "Test Gerilimi", unit: "V", placeholder: "500" },
        { key: "ileak", label: "Kaçak Akım", unit: "mA", placeholder: "0.5" },
      ],
      calculate: (v) => {
        const ir = v.vtest / v.ileak; // kΩ → MΩ
        const status = ir >= 1000 ? "Uygun (≥1 MΩ)" : ir >= 100 ? "Dikkat (100kΩ–1MΩ)" : "Tehlikeli (<100kΩ)";
        return [
          { label: "İzolasyon Direnci", value: `${(ir / 1000).toFixed(2)} MΩ` },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      name: "Reaktif Güç",
      description: "Aktif güç ve güç faktöründen reaktif gücü hesaplar.",
      inputs: [
        { key: "p", label: "Aktif Güç (P)", unit: "kW", placeholder: "300" },
        { key: "pf", label: "Güç Faktörü (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const phi = Math.acos(v.pf);
        const q = v.p * Math.tan(phi);
        const s = v.p / v.pf;
        return [
          { label: "Reaktif Güç (Q)", value: `${q.toFixed(1)} kVAR` },
          { label: "Görünür Güç (S)", value: `${s.toFixed(1)} kVA` },
          { label: "Faz Açısı (φ)", value: `${(phi * 180 / Math.PI).toFixed(1)}°` },
        ];
      },
    },
  ],
  "cooling-hvac": [
    {
      name: "COP Hesabı",
      description: "Soğutma sistemi performans katsayısını hesaplar.",
      inputs: [
        { key: "ql", label: "Soğutma Kapasitesi (Q_L)", unit: "kW", placeholder: "50" },
        { key: "wc", label: "Kompresör Gücü (W)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        const cop = v.ql / v.wc;
        const qh = v.ql + v.wc;
        return [
          { label: "COP", value: cop.toFixed(2) },
          { label: "Isı Atımı (Q_H)", value: `${qh.toFixed(1)} kW` },
        ];
      },
    },
    {
      name: "Soğutucu Akışkan Debisi",
      description: "Soğutucu akışkan kütle debisini hesaplar: ṁ = Q_L / (h₁ - h₄)",
      inputs: [
        { key: "ql", label: "Soğutma Kapasitesi (Q_L)", unit: "kW", placeholder: "50" },
        { key: "h1", label: "Evaporatör Çıkışı (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h4", label: "Evaporatör Girişi (h₄)", unit: "kJ/kg", placeholder: "250" },
      ],
      calculate: (v) => {
        const mdot = v.ql / (v.h1 - v.h4);
        return [{ label: "Kütle Debisi (ṁ)", value: `${mdot.toFixed(3)} kg/s` }];
      },
    },
    {
      name: "Soğutma Yükü Hesabı",
      description: "Soğuk hava deposu soğutma yükünü hesaplar.",
      inputs: [
        { key: "vol", label: "Depo Hacmi", unit: "m³", placeholder: "200" },
        { key: "tout", label: "Dış Sıcaklık", unit: "°C", placeholder: "35" },
        { key: "tin", label: "İç Sıcaklık", unit: "°C", placeholder: "-18" },
        { key: "u", label: "Duvar U Değeri", unit: "W/m²·K", placeholder: "0.3" },
        { key: "area", label: "Toplam Duvar Alanı", unit: "m²", placeholder: "180" },
      ],
      calculate: (v) => {
        const qTransmission = v.u * v.area * (v.tout - v.tin);
        const qTotal = qTransmission * 1.25; // %25 güvenlik payı
        return [
          { label: "İletim Yükü", value: `${(qTransmission / 1000).toFixed(2)} kW` },
          { label: "Toplam Yük (%25 pay)", value: `${(qTotal / 1000).toFixed(2)} kW` },
        ];
      },
    },
    {
      name: "Carnot COP (Soğutma)",
      description: "İdeal Carnot soğutma COP değerini hesaplar.",
      inputs: [
        { key: "tl", label: "Soğuk Ortam (T_L)", unit: "°C", placeholder: "-18" },
        { key: "th", label: "Sıcak Ortam (T_H)", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        const TL = v.tl + 273.15;
        const TH = v.th + 273.15;
        const copCarnot = TL / (TH - TL);
        return [{ label: "Carnot COP", value: copCarnot.toFixed(2) }];
      },
    },
    {
      name: "Kompresör İşi",
      description: "Soğutma kompresörünün iş değerini hesaplar: W = ṁ × (h₂ - h₁)",
      inputs: [
        { key: "mdot", label: "Kütle Debisi (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "h1", label: "Kompresör Girişi (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h2", label: "Kompresör Çıkışı (h₂)", unit: "kJ/kg", placeholder: "450" },
      ],
      calculate: (v) => {
        const w = v.mdot * (v.h2 - v.h1);
        return [{ label: "Kompresör Gücü (W)", value: `${w.toFixed(2)} kW` }];
      },
    },
    {
      name: "Nem Alma Kapasitesi",
      description: "Klima sisteminde nem alma kapasitesini hesaplar.",
      inputs: [
        { key: "q", label: "Hava Debisi", unit: "m³/h", placeholder: "5000" },
        { key: "w1", label: "Giriş Nem Oranı (W₁)", unit: "g/kg", placeholder: "14" },
        { key: "w2", label: "Çıkış Nem Oranı (W₂)", unit: "g/kg", placeholder: "8" },
        { key: "rho", label: "Hava Yoğunluğu (ρ)", unit: "kg/m³", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const mAir = v.q * v.rho / 3600; // kg/s
        const moisture = mAir * (v.w1 - v.w2) / 1000; // kg/s water removed
        return [
          { label: "Nem Alma Kapasitesi", value: `${(moisture * 3600).toFixed(2)} kg/saat` },
          { label: "Latent Yük", value: `${(moisture * 2450).toFixed(1)} kW` },
        ];
      },
    },
  ],
  "fuel-technology": [
    {
      name: "CCAI Hesabı",
      description: "Yakıt aromatiklik indeksini hesaplar (ISO 8217).",
      inputs: [
        { key: "d", label: "Yoğunluk 15°C (D)", unit: "kg/m³", placeholder: "991" },
        { key: "v", label: "Viskozite 50°C (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (vals) => {
        const ccai = vals.d - 81.703 * Math.log10(Math.log10(vals.v + 0.85)) - 483.5;
        const quality = ccai < 840 ? "İyi" : ccai < 870 ? "Kabul edilebilir" : "Zayıf tutuşma";
        return [
          { label: "CCAI", value: ccai.toFixed(0) },
          { label: "Kalite", value: quality },
        ];
      },
    },
    {
      name: "Yakıt Isıtma Sıcaklığı",
      description: "HFO enjeksiyon viskozitesi için gerekli ısıtma sıcaklığını tahmin eder.",
      inputs: [
        { key: "v50", label: "Viskozite @50°C", unit: "cSt", placeholder: "380" },
        { key: "vTarget", label: "Hedef Viskozite", unit: "cSt", placeholder: "15" },
      ],
      calculate: (v) => {
        // Walther denklemi yaklaşık çözümü
        const t = 50 + (Math.log(v.v50 / v.vTarget) / Math.log(1.055)) * 1;
        return [{ label: "Tahmini Isıtma Sıcaklığı", value: `${t.toFixed(0)} °C` }];
      },
    },
    {
      name: "Yakıt Yoğunluk Düzeltmesi",
      description: "Sıcaklık farkına göre yakıt yoğunluğunu düzeltir.",
      inputs: [
        { key: "d15", label: "Yoğunluk @15°C", unit: "kg/m³", placeholder: "991" },
        { key: "t", label: "Mevcut Sıcaklık", unit: "°C", placeholder: "130" },
      ],
      calculate: (v) => {
        // Yaklaşık düzeltme katsayısı: 0.00065 per °C (HFO için)
        const dT = v.d15 - 0.00065 * v.d15 * (v.t - 15);
        return [{ label: "Düzeltilmiş Yoğunluk", value: `${dT.toFixed(1)} kg/m³` }];
      },
    },
    {
      name: "Bunker Miktar Hesabı",
      description: "Seyir süresi ve tüketime göre bunker ihtiyacını hesaplar.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "185" },
        { key: "p", label: "Motor Gücü", unit: "kW", placeholder: "10000" },
        { key: "days", label: "Seyir Süresi", unit: "gün", placeholder: "15" },
        { key: "margin", label: "Güvenlik Payı", unit: "%", placeholder: "10" },
      ],
      calculate: (v) => {
        const daily = (v.sfoc * v.p * 24) / 1e6;
        const total = daily * v.days;
        const withMargin = total * (1 + v.margin / 100);
        return [
          { label: "Günlük Tüketim", value: `${daily.toFixed(1)} ton/gün` },
          { label: "Toplam İhtiyaç", value: `${total.toFixed(1)} ton` },
          { label: "Güvenlik Payı Dahil", value: `${withMargin.toFixed(1)} ton` },
        ];
      },
    },
  ],
  maintenance: [
    {
      name: "MTBF ve Kullanılabilirlik",
      description: "Ekipman güvenilirlik ve kullanılabilirlik hesabı.",
      inputs: [
        { key: "hours", label: "Toplam Çalışma Süresi", unit: "saat", placeholder: "8760" },
        { key: "failures", label: "Arıza Sayısı", unit: "adet", placeholder: "3" },
        { key: "repair", label: "Toplam Onarım Süresi", unit: "saat", placeholder: "72" },
      ],
      calculate: (v) => {
        if (v.failures === 0) return [{ label: "MTBF", value: "Arıza yok — sonsuz" }];
        const mtbf = v.hours / v.failures;
        const mttr = v.repair / v.failures;
        const avail = mtbf / (mtbf + mttr) * 100;
        return [
          { label: "MTBF", value: `${mtbf.toFixed(0)} saat` },
          { label: "MTTR", value: `${mttr.toFixed(1)} saat` },
          { label: "Kullanılabilirlik", value: `${avail.toFixed(1)}%` },
        ];
      },
    },
    {
      name: "Liner Aşınma Oranı",
      description: "Silindir layneri aşınma oranını hesaplar.",
      inputs: [
        { key: "d0", label: "Orijinal Çap", unit: "mm", placeholder: "500" },
        { key: "d1", label: "Ölçülen Çap", unit: "mm", placeholder: "500.8" },
        { key: "hours", label: "Çalışma Saati", unit: "saat", placeholder: "20000" },
      ],
      calculate: (v) => {
        const wear = v.d1 - v.d0;
        const rate = wear / (v.hours / 1000);
        const maxWear = v.d0 * 0.01; // Genel kural: çapın %1'i
        const remainingLife = ((maxWear - wear) / rate) * 1000;
        return [
          { label: "Toplam Aşınma", value: `${wear.toFixed(2)} mm` },
          { label: "Aşınma Oranı", value: `${rate.toFixed(3)} mm/1000 saat` },
          { label: "Tahmini Kalan Ömür", value: `${remainingLife > 0 ? remainingLife.toFixed(0) : 0} saat` },
        ];
      },
    },
    {
      name: "Yağ Analizi Trend",
      description: "Yağ metal partikül trendinden bakım ihtiyacını değerlendirir.",
      inputs: [
        { key: "fe", label: "Demir (Fe)", unit: "ppm", placeholder: "45" },
        { key: "cu", label: "Bakır (Cu)", unit: "ppm", placeholder: "12" },
        { key: "sn", label: "Kalay (Sn)", unit: "ppm", placeholder: "5" },
        { key: "tbn", label: "TBN", unit: "mg KOH/g", placeholder: "25" },
      ],
      calculate: (v) => {
        const feStatus = v.fe < 50 ? "Normal" : v.fe < 100 ? "Dikkat" : "Kritik";
        const tbnStatus = v.tbn > 20 ? "Normal" : v.tbn > 10 ? "Dikkat" : "Değiştir";
        return [
          { label: "Fe Durumu", value: `${v.fe} ppm → ${feStatus}` },
          { label: "Cu Durumu", value: `${v.cu} ppm → ${v.cu < 15 ? "Normal" : "Dikkat"}` },
          { label: "TBN Durumu", value: `${v.tbn} → ${tbnStatus}` },
        ];
      },
    },
    {
      name: "Güvenilirlik R(t)",
      description: "Üstel dağılım ile zaman bazlı güvenilirlik hesabı: R(t) = e^(-t/MTBF)",
      inputs: [
        { key: "mtbf", label: "MTBF", unit: "saat", placeholder: "5000" },
        { key: "t", label: "Hedef Süre (t)", unit: "saat", placeholder: "1000" },
      ],
      calculate: (v) => {
        const lambda = 1 / v.mtbf;
        const rt = Math.exp(-lambda * v.t) * 100;
        return [
          { label: "Arıza Oranı (λ)", value: `${(lambda * 1e6).toFixed(1)} × 10⁻⁶ /saat` },
          { label: `R(${v.t}) Güvenilirlik`, value: `${rt.toFixed(2)}%` },
        ];
      },
    },
  ],
  "energy-efficiency": [
    {
      name: "CII Hesabı (AER)",
      description: "Yıllık karbon yoğunluğu göstergesini hesaplar.",
      inputs: [
        { key: "co2", label: "Toplam CO₂ Emisyonu", unit: "ton", placeholder: "25000" },
        { key: "dwt", label: "DWT", unit: "ton", placeholder: "50000" },
        { key: "dist", label: "Toplam Mesafe", unit: "NM", placeholder: "80000" },
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
        { key: "p", label: "Motor Gücü (P_ME)", unit: "kW", placeholder: "15000" },
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "cf", label: "CO₂ Faktörü (C_f)", unit: "", placeholder: "3.114" },
        { key: "dwt", label: "DWT", unit: "ton", placeholder: "50000" },
        { key: "vref", label: "Referans Hız", unit: "knot", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const eedi = (v.p * v.sfoc * v.cf) / (v.dwt * v.vref);
        return [{ label: "EEDI", value: `${eedi.toFixed(2)} g CO₂/(ton·NM)` }];
      },
    },
    {
      name: "EEOI Hesabı",
      description: "Enerji Verimlilik Operasyonel Göstergesini hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "ton", placeholder: "500" },
        { key: "cf", label: "CO₂ Faktörü", unit: "", placeholder: "3.114" },
        { key: "cargo", label: "Taşınan Yük", unit: "ton", placeholder: "40000" },
        { key: "dist", label: "Mesafe", unit: "NM", placeholder: "5000" },
      ],
      calculate: (v) => {
        const eeoi = (v.fc * v.cf * 1e6) / (v.cargo * v.dist);
        return [{ label: "EEOI", value: `${eeoi.toFixed(2)} g CO₂/(ton·NM)` }];
      },
    },
    {
      name: "Hız Azaltma ile Yakıt Tasarrufu",
      description: "Hız azaltmanın yakıt tüketimine etkisi (Küp Kuralı).",
      inputs: [
        { key: "v1", label: "Mevcut Hız", unit: "knot", placeholder: "14" },
        { key: "v2", label: "Yeni Hız", unit: "knot", placeholder: "12" },
        { key: "fc1", label: "Mevcut Tüketim", unit: "ton/gün", placeholder: "35" },
      ],
      calculate: (v) => {
        const fc2 = v.fc1 * Math.pow(v.v2 / v.v1, 3);
        const saving = ((v.fc1 - fc2) / v.fc1) * 100;
        return [
          { label: "Yeni Tüketim", value: `${fc2.toFixed(1)} ton/gün` },
          { label: "Tasarruf", value: `${saving.toFixed(1)}%` },
        ];
      },
    },
  ],
  "environment-machine": [
    {
      name: "CO₂ Emisyon Hesabı",
      description: "Yakıt tüketiminden CO₂ emisyonunu hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "ton", placeholder: "100" },
        { key: "cf", label: "Karbon Faktörü (C_f)", unit: "t-CO₂/t-yakıt", placeholder: "3.114" },
      ],
      calculate: (v) => {
        return [{ label: "CO₂ Emisyonu", value: `${(v.fc * v.cf).toFixed(1)} ton CO₂` }];
      },
    },
    {
      name: "SOx Emisyon Hesabı",
      description: "Yakıt kükürt içeriğinden SOx emisyonunu hesaplar.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "ton", placeholder: "100" },
        { key: "s", label: "Kükürt İçeriği", unit: "%", placeholder: "0.5" },
      ],
      calculate: (v) => {
        // SO₂ = 2 × S% × FC (kütle oranı: S→SO₂ çarpan ≈ 2)
        const sox = 2 * (v.s / 100) * v.fc;
        const limit = v.s <= 0.1 ? "ECA Uyumlu" : v.s <= 0.5 ? "Global Uyumlu" : "Uyumsuz";
        return [
          { label: "SOx Emisyonu", value: `${sox.toFixed(2)} ton SO₂` },
          { label: "MARPOL Durumu", value: limit },
        ];
      },
    },
    {
      name: "Yağlı Su Separator (OWS) Kapasite",
      description: "15 ppm OWS gerekli debi ve tank kapasitesini hesaplar.",
      inputs: [
        { key: "bilge", label: "Günlük Sintine Üretimi", unit: "m³/gün", placeholder: "5" },
        { key: "hours", label: "OWS Çalışma Süresi", unit: "saat/gün", placeholder: "8" },
      ],
      calculate: (v) => {
        const requiredCapacity = v.bilge / v.hours;
        return [
          { label: "Gerekli OWS Kapasitesi", value: `${requiredCapacity.toFixed(2)} m³/saat` },
          { label: "Haftalık Sintine", value: `${(v.bilge * 7).toFixed(1)} m³` },
        ];
      },
    },
    {
      name: "Balast Su Arıtma Kapasitesi",
      description: "D-2 standardına uygun arıtma kapasitesini hesaplar.",
      inputs: [
        { key: "tankVol", label: "Toplam Balast Hacmi", unit: "m³", placeholder: "15000" },
        { key: "pumpRate", label: "Balast Pompa Debisi", unit: "m³/saat", placeholder: "500" },
      ],
      calculate: (v) => {
        const treatmentRate = v.pumpRate;
        const totalTime = v.tankVol / v.pumpRate;
        return [
          { label: "Gerekli Arıtma Kapasitesi", value: `${treatmentRate.toFixed(0)} m³/saat` },
          { label: "Toplam Süre", value: `${totalTime.toFixed(1)} saat` },
        ];
      },
    },
  ],
  "engine-room-safety": [
    {
      name: "CO₂ Miktar Hesabı",
      description: "Sabit CO₂ söndürme sistemi için gerekli miktarı hesaplar (SOLAS Ch. II-2).",
      inputs: [
        { key: "vol", label: "Korunan Hacim", unit: "m³", placeholder: "2000" },
        { key: "factor", label: "Yoğunluk Faktörü", unit: "kg/m³", placeholder: "0.56" },
      ],
      calculate: (v) => {
        const mass = v.vol * v.factor;
        const bottles = Math.ceil(mass / 45); // 45 kg standart tüp
        return [
          { label: "Gerekli CO₂ Miktarı", value: `${mass.toFixed(0)} kg` },
          { label: "Gerekli Tüp Sayısı (45 kg)", value: `${bottles} adet` },
        ];
      },
    },
    {
      name: "Havalandırma Debisi",
      description: "Makine dairesi havalandırma gereksinimini hesaplar.",
      inputs: [
        { key: "p", label: "Motor Toplam Gücü", unit: "kW", placeholder: "15000" },
        { key: "vol", label: "Makine Dairesi Hacmi", unit: "m³", placeholder: "2500" },
      ],
      calculate: (v) => {
        // Yaklaşık: motor başına ~2.5 m³/kW·h hava gereksinimi
        const airForCombustion = v.p * 2.5; // m³/saat
        const ventChanges = airForCombustion / v.vol;
        return [
          { label: "Yanma Havası İhtiyacı", value: `${airForCombustion.toFixed(0)} m³/saat` },
          { label: "Hava Değişim Sayısı", value: `${ventChanges.toFixed(1)} /saat` },
        ];
      },
    },
    {
      name: "Kapalı Alan Oksijen Hesabı",
      description: "Kapalı alana giriş öncesi oksijen yeterliliğini kontrol eder.",
      inputs: [
        { key: "o2", label: "Ölçülen O₂", unit: "%", placeholder: "20.8" },
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
          { label: "O₂ Durumu", value: `${v.o2}% → ${o2Ok ? "Uygun" : "YETERSİZ"}` },
          { label: "H₂S Durumu", value: `${v.h2s} ppm → ${h2sOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "CO Durumu", value: `${v.co} ppm → ${coOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "LEL Durumu", value: `${v.lel}% → ${lelOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "Genel Değerlendirme", value: safe ? "GİRİLEBİLİR" : "GİRİLEMEZ" },
        ];
      },
    },
  ],
  erm: [
    {
      name: "Risk Değerlendirmesi",
      description: "Olasılık × Şiddet ile risk seviyesini hesaplar.",
      inputs: [
        { key: "prob", label: "Olasılık (1–5)", unit: "", placeholder: "3" },
        { key: "sev", label: "Şiddet (1–5)", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.prob * v.sev;
        const level = risk <= 4 ? "Düşük" : risk <= 9 ? "Orta" : risk <= 15 ? "Yüksek" : "Çok Yüksek";
        const color = risk <= 4 ? "Yeşil" : risk <= 9 ? "Sarı" : risk <= 15 ? "Turuncu" : "Kırmızı";
        return [
          { label: "Risk Puanı", value: `${risk}` },
          { label: "Risk Seviyesi", value: level },
          { label: "Risk Rengi", value: color },
        ];
      },
    },
    {
      name: "Kaza Frekans Oranı (LTIF)",
      description: "Lost Time Injury Frequency oranını hesaplar.",
      inputs: [
        { key: "lti", label: "Kayıp Zamanlı Kaza Sayısı", unit: "", placeholder: "2" },
        { key: "hours", label: "Toplam Çalışma Saati", unit: "saat", placeholder: "500000" },
      ],
      calculate: (v) => {
        const ltif = (v.lti / v.hours) * 1e6;
        const status = ltif < 1 ? "Çok İyi" : ltif < 3 ? "İyi" : ltif < 5 ? "Orta" : "Kötü";
        return [
          { label: "LTIF", value: ltif.toFixed(2) },
          { label: "Değerlendirme", value: status },
        ];
      },
    },
  ],
  "machine-elements": [
    {
      name: "Mil Çapı (Burulma)",
      description: "Belirli tork ve izin verilen kayma gerilmesi için minimum mil çapını hesaplar.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "50000" },
        { key: "tau", label: "İzin Verilen τ", unit: "MPa", placeholder: "60" },
      ],
      calculate: (v) => {
        // τ = 16T / (πd³) → d = ∛(16T / πτ)
        const d = Math.pow((16 * v.t) / (Math.PI * v.tau * 1e6), 1 / 3) * 1000;
        return [{ label: "Minimum Çap", value: `${d.toFixed(1)} mm` }];
      },
    },
    {
      name: "Yatak Ömrü (L₁₀)",
      description: "Rulman temel ömür hesabı: L₁₀ = (C/P)^p × 10⁶ devir",
      inputs: [
        { key: "c", label: "Dinamik Yük Kapasitesi (C)", unit: "kN", placeholder: "120" },
        { key: "p", label: "Eşdeğer Yük (P)", unit: "kN", placeholder: "30" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "1500" },
        { key: "type", label: "Tip (3=bilyalı, 10/3=makaralı)", unit: "", placeholder: "3" },
      ],
      calculate: (v) => {
        const l10Rev = Math.pow(v.c / v.p, v.type) * 1e6;
        const l10Hours = l10Rev / (v.n * 60);
        return [
          { label: "L₁₀ (devir)", value: `${(l10Rev / 1e6).toFixed(1)} × 10⁶` },
          { label: "L₁₀ (saat)", value: `${l10Hours.toFixed(0)} saat` },
        ];
      },
    },
    {
      name: "Dişli Çark Hız Oranı",
      description: "Dişli çark devir ve tork aktarımını hesaplar.",
      inputs: [
        { key: "z1", label: "Tahrik Diş Sayısı (Z₁)", unit: "", placeholder: "20" },
        { key: "z2", label: "Çıkış Diş Sayısı (Z₂)", unit: "", placeholder: "60" },
        { key: "n1", label: "Tahrik Devri (n₁)", unit: "rpm", placeholder: "1500" },
        { key: "t1", label: "Tahrik Torku (T₁)", unit: "N·m", placeholder: "100" },
      ],
      calculate: (v) => {
        const ratio = v.z2 / v.z1;
        const n2 = v.n1 / ratio;
        const t2 = v.t1 * ratio * 0.97; // ~%3 kayıp
        return [
          { label: "Dişli Oranı (i)", value: `${ratio.toFixed(2)}:1` },
          { label: "Çıkış Devri (n₂)", value: `${n2.toFixed(0)} rpm` },
          { label: "Çıkış Torku (T₂)", value: `${t2.toFixed(1)} N·m` },
        ];
      },
    },
    {
      name: "Kaynak Dikişi Gerilmesi",
      description: "Alın ve köşe kaynağı gerilme kontrolü.",
      inputs: [
        { key: "f", label: "Uygulanan Kuvvet (F)", unit: "kN", placeholder: "200" },
        { key: "l", label: "Kaynak Uzunluğu (L)", unit: "mm", placeholder: "200" },
        { key: "a", label: "Kaynak Kalınlığı (a)", unit: "mm", placeholder: "6" },
      ],
      calculate: (v) => {
        const area = v.l * v.a; // mm²
        const stress = (v.f * 1000) / area; // N/mm² = MPa
        const status = stress < 100 ? "Uygun" : stress < 160 ? "Dikkat" : "Aşırı";
        return [
          { label: "Kaynak Gerilmesi", value: `${stress.toFixed(1)} MPa` },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
  automation: [
    {
      name: "4-20 mA Dönüşüm",
      description: "Ölçüm değerini 4-20 mA sinyaline dönüştürür.",
      inputs: [
        { key: "x", label: "Ölçülen Değer", unit: "", placeholder: "75" },
        { key: "xmin", label: "Aralık Min", unit: "", placeholder: "0" },
        { key: "xmax", label: "Aralık Max", unit: "", placeholder: "100" },
      ],
      calculate: (v) => {
        const i = 4 + (16 * (v.x - v.xmin) / (v.xmax - v.xmin));
        const percent = ((v.x - v.xmin) / (v.xmax - v.xmin)) * 100;
        return [
          { label: "Çıkış Akımı", value: `${i.toFixed(2)} mA` },
          { label: "Yüzde", value: `${percent.toFixed(1)}%` },
        ];
      },
    },
    {
      name: "RTD Sıcaklık Hesabı",
      description: "Pt100 RTD direncinden sıcaklık hesabı: R_t = R₀(1 + αΔT)",
      inputs: [
        { key: "rt", label: "Ölçülen Direnç (R_t)", unit: "Ω", placeholder: "138.5" },
        { key: "r0", label: "R₀ (0°C direnci)", unit: "Ω", placeholder: "100" },
        { key: "alpha", label: "α katsayısı", unit: "1/°C", placeholder: "0.00385" },
      ],
      calculate: (v) => {
        const dt = (v.rt / v.r0 - 1) / v.alpha;
        return [{ label: "Sıcaklık", value: `${dt.toFixed(1)} °C` }];
      },
    },
    {
      name: "PID Kontrolör Çıkışı",
      description: "PID kontrolör çıkış sinyalini hesaplar.",
      inputs: [
        { key: "sp", label: "Set Değeri (SP)", unit: "", placeholder: "50" },
        { key: "pv", label: "Proses Değeri (PV)", unit: "", placeholder: "45" },
        { key: "kp", label: "Oransal Kazanç (Kp)", unit: "", placeholder: "2" },
        { key: "ki", label: "İntegral Kazanç (Ki)", unit: "", placeholder: "0.5" },
        { key: "dt", label: "Örnekleme Süresi", unit: "s", placeholder: "1" },
      ],
      calculate: (v) => {
        const error = v.sp - v.pv;
        const pOut = v.kp * error;
        const iOut = v.ki * error * v.dt;
        const total = Math.min(100, Math.max(0, 50 + pOut + iOut)); // Bias = %50
        return [
          { label: "Hata (e)", value: `${error.toFixed(2)}` },
          { label: "P Çıkışı", value: `${pOut.toFixed(2)}` },
          { label: "Kontrolör Çıkışı", value: `${total.toFixed(1)}%` },
        ];
      },
    },
    {
      name: "Thermocouple EMF → Sıcaklık",
      description: "K-tipi thermocouple EMF değerinden sıcaklığı tahmin eder.",
      inputs: [
        { key: "emf", label: "Ölçülen EMF", unit: "mV", placeholder: "12.2" },
      ],
      calculate: (v) => {
        // K-tipi yaklaşık lineer: ~40.7 µV/°C → 0.0407 mV/°C → T ≈ EMF / 0.0407
        const temp = v.emf / 0.0407;
        return [{ label: "Tahmini Sıcaklık", value: `${temp.toFixed(0)} °C` }];
      },
    },
  ],
  "engine-room-ops": [
    {
      name: "Kalan Yakıt Menzili",
      description: "Mevcut yakıt stokuyla tahmini çalışma süresini hesaplar.",
      inputs: [
        { key: "stock", label: "Yakıt Stoku", unit: "ton", placeholder: "500" },
        { key: "rate", label: "Tüketim Hızı", unit: "ton/gün", placeholder: "30" },
      ],
      calculate: (v) => {
        const days = v.stock / v.rate;
        return [
          { label: "Tahmini Menzil", value: `${days.toFixed(1)} gün` },
          { label: "Saat", value: `${(days * 24).toFixed(0)} saat` },
        ];
      },
    },
    {
      name: "Seyire Hazırlık Kontrol Listesi Süresi",
      description: "Seyir hazırlığı için tahmini süreyi hesaplar.",
      inputs: [
        { key: "engines", label: "Motor Sayısı", unit: "", placeholder: "2" },
        { key: "gens", label: "Jeneratör Sayısı", unit: "", placeholder: "3" },
        { key: "preHeat", label: "Ön Isıtma Süresi", unit: "dakika", placeholder: "60" },
        { key: "loCirc", label: "LO Sirkülasyon", unit: "dakika", placeholder: "30" },
      ],
      calculate: (v) => {
        const totalPreheat = Math.max(v.preHeat, v.loCirc);
        const startupTime = v.engines * 15 + v.gens * 10; // dakika
        const total = totalPreheat + startupTime + 30; // +30 dk kontrol
        return [
          { label: "Ön Hazırlık", value: `${totalPreheat} dakika` },
          { label: "Start-up", value: `${startupTime} dakika` },
          { label: "Toplam Süre", value: `${total} dakika` },
        ];
      },
    },
    {
      name: "Yağ Tüketimi Takibi",
      description: "Silindir ve sistem yağı tüketimini hesaplar.",
      inputs: [
        { key: "cylOil", label: "Silindir Yağı Tüketimi", unit: "g/kW·h", placeholder: "0.7" },
        { key: "bhp", label: "Motor Gücü", unit: "kW", placeholder: "15000" },
        { key: "hours", label: "Çalışma Süresi", unit: "saat", placeholder: "720" },
      ],
      calculate: (v) => {
        const consumption = (v.cylOil * v.bhp * v.hours) / 1e6; // ton
        const dailyRate = consumption / (v.hours / 24);
        return [
          { label: "Toplam Silindir Yağı", value: `${(consumption * 1000).toFixed(0)} kg` },
          { label: "Günlük Tüketim", value: `${(dailyRate * 1000).toFixed(1)} kg/gün` },
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
    <Card className="bg-card/80 backdrop-blur border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{tool.name}</CardTitle>
        <p className="text-xs text-muted-foreground">{tool.description}</p>
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
          <Calculator className="h-4 w-4" /> Hesapla
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <Link to="/lessons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Derslere Dön
          </Link>
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

        <div className="flex justify-center pt-4">
          <Link to="/lessons" className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground">
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
