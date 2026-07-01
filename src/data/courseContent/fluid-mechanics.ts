import { Droplets } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Akışkanlar Mekaniği — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const fluidMechanics: CourseTopic = {
  key: "fluid-mechanics",
  title: "Akışkanlar Mekaniği",
  icon: Droplets,
  accent: "from-cyan-500 via-blue-500 to-indigo-500",
  group: "machine",
  intro:
    "Akışkan statiği ve dinamiği; boru hatları, pompalar ve akış rejimleri. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "bernoulli",
      name: "Bernoulli Denklemi",
      group: "Temel Akışkan Denklemleri",
      formula: "P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂",
      variables: [
        { symbol: "P", label: "Basınç" },
        { symbol: "ρ", label: "Yoğunluk" },
        { symbol: "v", label: "Hız" },
        { symbol: "z", label: "Yükseklik" },
        { symbol: "g", label: "Yerçekimi" },
      ],
      source: { code: "Bernoulli denklemi (enerjinin korunumu, sürtünmesiz akış)" },
      note: "Giriş basıncı kPa alınır, hesapta Pa'ya çevrilir; sonuç tekrar kPa olarak verilir.",
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
      id: "continuity",
      name: "Süreklilik Denklemi",
      group: "Temel Akışkan Denklemleri",
      formula: "A₁·v₁ = A₂·v₂",
      variables: [
        { symbol: "A", label: "Kesit alanı", unit: "m²" },
        { symbol: "v", label: "Akış hızı", unit: "m/s" },
      ],
      source: { code: "Süreklilik denklemi (kütlenin korunumu)" },
      note: "Çaplardan kesit alanları A = π·D²/4 ile hesaplanır.",
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
      id: "reynolds-number",
      name: "Reynolds Sayısı",
      group: "Temel Akışkan Denklemleri",
      formula: "Re = ρ·v·D / μ",
      variables: [
        { symbol: "ρ", label: "Yoğunluk", unit: "kg/m³" },
        { symbol: "v", label: "Hız", unit: "m/s" },
        { symbol: "D", label: "Çap", unit: "m" },
        { symbol: "μ", label: "Dinamik viskozite", unit: "Pa·s" },
      ],
      source: { code: "Reynolds sayısı (akış rejimi: Re<2300 laminer, >4000 türbülanslı)" },
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
      id: "darcy-weisbach",
      name: "Darcy-Weisbach (Boru Kaybı)",
      group: "Temel Akışkan Denklemleri",
      formula: "hf = f·(L/D)·(v²/2g)",
      variables: [
        { symbol: "f", label: "Sürtünme faktörü" },
        { symbol: "L", label: "Boru uzunluğu", unit: "m" },
        { symbol: "D", label: "Çap", unit: "m" },
        { symbol: "v", label: "Akış hızı", unit: "m/s" },
        { symbol: "g", label: "Yerçekimi", unit: "m/s²" },
      ],
      source: { code: "Darcy-Weisbach denklemi (boru sürtünme kaybı)" },
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
          { label: "Yük Kaybı (hf)", value: `${hf.toFixed(2)} m` },
          { label: "Basınç Kaybı (ΔP)", value: `${(dp / 1000).toFixed(2)} kPa` },
        ];
      },
    },
    {
      id: "pump-power",
      name: "Pompa Gücü",
      group: "Pompa Hesapları",
      formula: "P = ρ·g·Q·H / η",
      variables: [
        { symbol: "ρ", label: "Yoğunluk", unit: "kg/m³" },
        { symbol: "g", label: "Yerçekimi", unit: "m/s²" },
        { symbol: "Q", label: "Debi", unit: "m³/s" },
        { symbol: "H", label: "Toplam basma yüksekliği", unit: "m" },
        { symbol: "η", label: "Verim" },
      ],
      source: { code: "Santrifüj pompa hidrolik güç bağıntısı" },
      note: "Debi m³/h girilir, hesapta m³/s'ye çevrilir; verim % girilir.",
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
      id: "npsh",
      name: "NPSH (Net Pozitif Emme Yüksekliği)",
      group: "Pompa Hesapları",
      formula: "NPSHa = (Patm − Pvap) / (ρ·g) + zs − hf",
      variables: [
        { symbol: "Patm", label: "Atmosfer basıncı" },
        { symbol: "Pvap", label: "Buhar basıncı" },
        { symbol: "ρ", label: "Yoğunluk", unit: "kg/m³" },
        { symbol: "g", label: "Yerçekimi", unit: "m/s²" },
        { symbol: "zs", label: "Emiş yüksekliği", unit: "m" },
        { symbol: "hf", label: "Emiş hattı kaybı", unit: "m" },
      ],
      source: { code: "NPSH (kavitasyon önleme — net pozitif emme yüksekliği)" },
      note: "Basınçlar kPa girilir, hesapta Pa'ya çevrilir.",
      inputs: [
        { key: "pa", label: "Atmosfer Basıncı", unit: "kPa", placeholder: "101.325" },
        { key: "pv", label: "Buhar Basıncı", unit: "kPa", placeholder: "2.34" },
        { key: "hs", label: "Emiş Yüksekliği (+/-)", unit: "m", placeholder: "3" },
        { key: "hf", label: "Emiş Hattı Kaybı", unit: "m", placeholder: "0.5" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1000" },
      ],
      calculate: (v) => {
        const npsha = (v.pa - v.pv) * 1000 / (v.rho * 9.81) + v.hs - v.hf;
        return [{ label: "NPSHA", value: `${npsha.toFixed(2)} m` }];
      },
    },
    {
      id: "affinity-laws",
      name: "Afinite Kuralları",
      group: "Pompa Hesapları",
      formula: "Q₂/Q₁ = n₂/n₁ ; H₂/H₁ = (n₂/n₁)² ; P₂/P₁ = (n₂/n₁)³",
      variables: [
        { symbol: "Q", label: "Debi" },
        { symbol: "H", label: "Basma yüksekliği" },
        { symbol: "P", label: "Güç" },
        { symbol: "n", label: "Devir", unit: "rpm" },
      ],
      source: { code: "Pompa/fan afinite (benzeşim) kuralları" },
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
    {
      id: "hydrostatic-pressure",
      name: "Hidrostatik Basınç",
      group: "Hidrostatik",
      formula: "P = P₀ + ρ·g·h",
      variables: [
        { symbol: "P", label: "Toplam (mutlak) basınç", unit: "Pa" },
        { symbol: "P₀", label: "Yüzeydeki basınç (atmosfer)", unit: "Pa" },
        { symbol: "ρ", label: "Akışkan yoğunluğu", unit: "kg/m³" },
        { symbol: "g", label: "Yerçekimi ivmesi", unit: "9,81 m/s²" },
        { symbol: "h", label: "Derinlik", unit: "m" },
      ],
      source: { code: "Hidrostatik temel denklem (Pascal)" },
      note: "Deniz suyu ρ ≈ 1025 kg/m³, tatlı su 1000 kg/m³. P₀ atmosfer için ≈ 101325 Pa; yalnızca gösterge basıncı isteniyorsa P₀ = 0 girin.",
      inputs: [
        { key: "p0", label: "Yüzey Basıncı (P₀)", unit: "Pa", placeholder: "101325" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "h", label: "Derinlik (h)", unit: "m", placeholder: "10" },
      ],
      calculate: (v) => {
        if (v.h < 0 || v.rho <= 0) return [{ label: "Hata", value: "Yoğunluk pozitif, derinlik ≥ 0 olmalı" }];
        const p = v.p0 + v.rho * 9.81 * v.h;
        return [
          { label: "Basınç (P)", value: `${(p / 1000).toFixed(2)} kPa` },
          { label: "Basınç", value: `${(p / 1e5).toFixed(3)} bar` },
        ];
      },
    },
    {
      id: "hydrostatic-force",
      name: "Hidrostatik Kuvvet (Düzlem Yüzey)",
      group: "Hidrostatik",
      formula: "F = ρ·g·hc·A",
      variables: [
        { symbol: "F", label: "Bileşke hidrostatik kuvvet", unit: "N" },
        { symbol: "ρ", label: "Akışkan yoğunluğu", unit: "kg/m³" },
        { symbol: "g", label: "Yerçekimi ivmesi", unit: "9,81 m/s²" },
        { symbol: "hc", label: "Yüzey ağırlık merkezinin derinliği", unit: "m" },
        { symbol: "A", label: "Islak yüzey alanı", unit: "m²" },
      ],
      source: { code: "Düzlem yüzeye etkiyen hidrostatik kuvvet" },
      note: "hc, yüzeyin geometrik merkezinin sıvı yüzeyinden derinliğidir (gösterge basıncı esas alınır). Kapak/perde/tank cidarı hesaplarında kullanılır.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1025" },
        { key: "hc", label: "Merkez Derinliği (hc)", unit: "m", placeholder: "3" },
        { key: "a", label: "Yüzey Alanı (A)", unit: "m²", placeholder: "2" },
      ],
      calculate: (v) => {
        if (v.rho <= 0 || v.hc < 0 || v.a <= 0) return [{ label: "Hata", value: "ρ ve A pozitif, hc ≥ 0 olmalı" }];
        const f = v.rho * 9.81 * v.hc * v.a;
        return [
          { label: "Hidrostatik Kuvvet (F)", value: `${(f / 1000).toFixed(2)} kN` },
          { label: "Kuvvet", value: `${f.toFixed(0)} N` },
        ];
      },
    },
  ],
};
