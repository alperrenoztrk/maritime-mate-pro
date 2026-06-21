import { Snowflake } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Soğutma ve Klima Sistemleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const coolingHvac: CourseTopic = {
  key: "cooling-hvac",
  title: "Soğutma ve Klima Sistemleri",
  icon: Snowflake,
  accent: "from-sky-500 via-cyan-500 to-teal-500",
  group: "machine",
  intro:
    "Soğutma çevrimi, COP, soğutucu akışkan debisi ve klima (HVAC) yük hesapları. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "cop-cooling",
      name: "COP (Soğutma)",
      group: "Soğutma Çevrimi",
      formula: "COP = Q_L / W_comp",
      variables: [
        { symbol: "Q_L", label: "Soğutma kapasitesi", unit: "kW" },
        { symbol: "W_comp", label: "Kompresör işi", unit: "kW" },
      ],
      source: { code: "Soğutma çevrimi performans katsayısı (COP) tanımı" },
      note: "Isı atımı Q_H = Q_L + W_comp (enerji korunumu).",
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
      id: "cop-heat-pump",
      name: "COP (Isı Pompası)",
      group: "Soğutma Çevrimi",
      formula: "COP_HP = Q_H / W_comp = COP_soğutma + 1",
      variables: [
        { symbol: "Q_H", label: "Isıtma kapasitesi", unit: "kW" },
        { symbol: "W_comp", label: "Kompresör işi", unit: "kW" },
      ],
      source: { code: "Isı pompası performans katsayısı tanımı" },
      note: "Isıtma kapasitesi ve kompresör gücü girilir; COP_HP = Q_H/W ve COP_soğutma = COP_HP − 1.",
      inputs: [
        { key: "qh", label: "Isıtma Kapasitesi (Q_H)", unit: "kW", placeholder: "65" },
        { key: "wc", label: "Kompresör Gücü (W)", unit: "kW", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.wc <= 0) return [{ label: "Hata", value: "Kompresör gücü pozitif olmalı" }];
        const cop = v.qh / v.wc;
        return [
          { label: "COP (Isı Pompası)", value: cop.toFixed(2) },
          { label: "COP (Soğutma)", value: (cop - 1).toFixed(2) },
        ];
      },
    },
    {
      id: "carnot-cop-cooling",
      name: "Carnot COP (Soğutma)",
      group: "Soğutma Çevrimi",
      formula: "COP_Carnot = T_L / (T_H − T_L)",
      variables: [
        { symbol: "T_L", label: "Soğuk ortam mutlak sıcaklığı", unit: "K" },
        { symbol: "T_H", label: "Sıcak ortam mutlak sıcaklığı", unit: "K" },
      ],
      source: { code: "Ters Carnot çevrimi (ideal soğutma COP)" },
      note: "Girişler °C alınır, hesaplamada mutlak sıcaklığa (K) çevrilir: T(K) = T(°C) + 273,15.",
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
      id: "cooling-capacity",
      name: "Soğutma Kapasitesi",
      group: "Soğutma Çevrimi",
      formula: "Q̇ = ṁ × (h₁ − h₄)",
      variables: [
        { symbol: "ṁ", label: "Soğutucu akışkan debisi", unit: "kg/s" },
        { symbol: "h₁", label: "Evaporatör çıkışı entalpi", unit: "kJ/kg" },
        { symbol: "h₄", label: "Evaporatör girişi entalpi", unit: "kJ/kg" },
      ],
      source: { code: "Evaporatör enerji dengesi (soğutma etkisi)" },
      note: "Akışkan debisi kg/s girilir; soğutma kapasitesi Q̇ = ṁ × (h₁ − h₄) (kW).",
      inputs: [
        { key: "mdot", label: "Akışkan Debisi (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "h1", label: "Evaporatör Çıkışı (h₁)", unit: "kJ/kg", placeholder: "400" },
        { key: "h4", label: "Evaporatör Girişi (h₄)", unit: "kJ/kg", placeholder: "250" },
      ],
      calculate: (v) => {
        const q = v.mdot * (v.h1 - v.h4);
        return [{ label: "Soğutma Kapasitesi (Q̇)", value: `${q.toFixed(2)} kW` }];
      },
    },
    {
      id: "refrigerant-mass-flow",
      name: "Soğutucu Akışkan Debisi",
      group: "Soğutma Çevrimi",
      formula: "ṁ = Q_L / (h₁ − h₄)",
      variables: [
        { symbol: "Q_L", label: "Soğutma kapasitesi", unit: "kW" },
        { symbol: "h₁", label: "Evaporatör çıkışı entalpi", unit: "kJ/kg" },
        { symbol: "h₄", label: "Evaporatör girişi entalpi", unit: "kJ/kg" },
      ],
      source: { code: "Evaporatör enerji dengesinden kütle debisi" },
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
      id: "compressor-work",
      name: "Kompresör İşi",
      group: "Soğutma Çevrimi",
      formula: "W = ṁ × (h₂ − h₁)",
      variables: [
        { symbol: "ṁ", label: "Soğutucu akışkan debisi", unit: "kg/s" },
        { symbol: "h₂", label: "Kompresör çıkışı entalpi", unit: "kJ/kg" },
        { symbol: "h₁", label: "Kompresör girişi entalpi", unit: "kJ/kg" },
      ],
      source: { code: "Kompresör enerji dengesi (izentropik iş)" },
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
      id: "cooling-load",
      name: "Soğutma Yükü",
      group: "Klima Hesapları",
      formula: "Q = U·A·ΔT + Q_hava + Q_iç",
      variables: [
        { symbol: "U", label: "Isı geçiş katsayısı", unit: "W/m²·K" },
        { symbol: "A", label: "Duvar alanı", unit: "m²" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
        { symbol: "Q_hava", label: "Taze hava yükü", unit: "kW" },
        { symbol: "Q_iç", label: "İç ısı kaynakları", unit: "kW" },
      ],
      source: { code: "Soğutma yükü hesabı (iletim + güvenlik payı)" },
      note: "Bu hesaplayıcı iletim yükünü U·A·ΔT ile bulur ve %25 güvenlik payı ekler.",
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
      id: "dehumidification",
      name: "Nem Alma Kapasitesi",
      group: "Klima Hesapları",
      formula: "ṁ_w = ṁ_a × (ω₁ − ω₂)",
      variables: [
        { symbol: "ṁ_a", label: "Hava kütle debisi", unit: "kg/s" },
        { symbol: "ω₁", label: "Giriş özgül nem", unit: "g/kg" },
        { symbol: "ω₂", label: "Çıkış özgül nem", unit: "g/kg" },
      ],
      source: { code: "Psikrometrik kütle dengesi (nem alma)" },
      note: "Hava debisi m³/h girilir; ṁ_a = Q × ρ / 3600 (kg/s). Nem g/kg → kg/kg için ÷1000. Latent yük ≈ ṁ_w × 2450 kJ/kg.",
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
};
