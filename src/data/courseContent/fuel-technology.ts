import { Thermometer } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yakıt Teknolojisi ve Yönetimi — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const fuelTechnology: CourseTopic = {
  key: "fuel-technology",
  title: "Yakıt Teknolojisi ve Yönetimi",
  icon: Thermometer,
  accent: "from-orange-600 via-red-600 to-rose-600",
  group: "machine",
  intro:
    "Yakıt özellikleri, kalite indeksleri, arıtma ve bunker yönetimi. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "ccai",
      name: "CCAI (Aromatiklik İndeksi)",
      group: "Yakıt Özellikleri",
      formula: "CCAI = D − 140,7·log(log(ν₅₀ + 0,85)) − 80,6",
      variables: [
        { symbol: "D", label: "Yoğunluk 15°C", unit: "kg/m³" },
        { symbol: "ν₅₀", label: "50°C kinematik viskozite", unit: "cSt" },
      ],
      source: { code: "ISO 8217 — CCAI hesaplanmış aromatiklik indeksi" },
      inputs: [
        { key: "d", label: "Yoğunluk 15°C (D)", unit: "kg/m³", placeholder: "991" },
        { key: "v", label: "Viskozite 50°C (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (vals) => {
        const ccai = vals.d - 140.7 * Math.log10(Math.log10(vals.v + 0.85)) - 80.6;
        const quality = ccai < 840 ? "İyi" : ccai < 870 ? "Kabul edilebilir" : "Zayıf tutuşma";
        return [
          { label: "CCAI", value: ccai.toFixed(0) },
          { label: "Kalite", value: quality },
        ];
      },
    },
    {
      id: "fuel-heating-value",
      name: "Yakıt Isıl Değeri",
      group: "Yakıt Özellikleri",
      formula: "Hu ≈ 46,704 − 8,802·d² + 3,167·d",
      variables: [
        { symbol: "d", label: "15°C yoğunluk", unit: "kg/L" },
        { symbol: "Hu", label: "Alt ısıl değer", unit: "MJ/kg" },
      ],
      source: { code: "ISO 8217 — yoğunluk bazlı alt ısıl değer yaklaşımı" },
      note: "Yoğunluk kg/L (örn. 0,991) girilir; alt ısıl değer Hu MJ/kg olarak tahmin edilir.",
      inputs: [
        { key: "d", label: "Yoğunluk @15°C (d)", unit: "kg/L", placeholder: "0.991" },
      ],
      calculate: (v) => {
        const hu = 46.704 - 8.802 * v.d * v.d + 3.167 * v.d;
        return [
          { label: "Alt Isıl Değer (Hu)", value: `${hu.toFixed(2)} MJ/kg` },
          { label: "Alt Isıl Değer", value: `${(hu * 1000).toFixed(0)} kJ/kg` },
        ];
      },
    },
    {
      id: "viscosity-conversion",
      name: "Viskozite Dönüşümü",
      group: "Yakıt Özellikleri",
      formula: "1 cSt = 1 mm²/s",
      variables: [
        { symbol: "ν", label: "Kinematik viskozite", unit: "cSt = mm²/s" },
      ],
      source: { code: "Kinematik viskozite birim eşitliği (Redwood No.1 ≈ 4,05 × cSt)" },
      note: "1 cSt = 1 mm²/s. Yaklaşık dönüşümler: Redwood No.1 ≈ 4,05 × cSt; Saybolt Universal (SSU) ≈ 4,635 × cSt.",
      inputs: [
        { key: "v", label: "Kinematik Viskozite (ν)", unit: "cSt", placeholder: "380" },
      ],
      calculate: (v) => {
        return [
          { label: "mm²/s", value: `${v.v.toFixed(1)} mm²/s` },
          { label: "Redwood No.1 (≈)", value: `${(v.v * 4.05).toFixed(0)} s` },
          { label: "Saybolt SSU (≈)", value: `${(v.v * 4.635).toFixed(0)} s` },
        ];
      },
    },
    {
      id: "fuel-heating-temperature",
      name: "Yakıt Isıtma Sıcaklığı",
      group: "Yakıt Arıtma",
      formula: "T = 50 + (ln(ν₅₀ / ν_hedef) / ln(1,055))",
      variables: [
        { symbol: "ν₅₀", label: "50°C viskozite", unit: "cSt" },
        { symbol: "ν_hedef", label: "Hedef (enjeksiyon) viskozite", unit: "cSt" },
        { symbol: "T", label: "Tahmini ısıtma sıcaklığı", unit: "°C" },
      ],
      source: { code: "Walther viskozite-sıcaklık bağıntısı (yaklaşık çözüm)" },
      note: "HFO enjeksiyon viskozitesine ulaşmak için gerekli ısıtma sıcaklığını tahmin eder.",
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
      id: "fuel-density-correction",
      name: "Yakıt Yoğunluk Düzeltmesi",
      group: "Yakıt Arıtma",
      formula: "ρ_T = ρ₁₅ − 0,00065·ρ₁₅·(T − 15)",
      variables: [
        { symbol: "ρ₁₅", label: "15°C yoğunluk", unit: "kg/m³" },
        { symbol: "T", label: "Mevcut sıcaklık", unit: "°C" },
        { symbol: "ρ_T", label: "Düzeltilmiş yoğunluk", unit: "kg/m³" },
      ],
      source: { code: "ASTM D1250 / yoğunluk-sıcaklık düzeltmesi (HFO yaklaşık katsayısı)" },
      note: "HFO için yaklaşık düzeltme katsayısı: 0,00065 /°C.",
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
      id: "heating-power",
      name: "Isıtma Gücü",
      group: "Yakıt Arıtma",
      formula: "Q̇ = ṁ·c_p·ΔT",
      variables: [
        { symbol: "ṁ", label: "Yakıt debisi", unit: "kg/s" },
        { symbol: "c_p", label: "Özgül ısı (~2 kJ/kg·K HFO)", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık artışı", unit: "K" },
      ],
      source: { code: "Duyulur ısı bağıntısı (yakıt ön ısıtma)" },
      note: "Yakıt debisi kg/s girilir; gerekli ısıtma gücü Q̇ = ṁ·c_p·ΔT (kW) hesaplanır.",
      inputs: [
        { key: "mdot", label: "Yakıt Debisi (ṁ)", unit: "kg/s", placeholder: "0.5" },
        { key: "cp", label: "Özgül Isı (c_p)", unit: "kJ/kg·K", placeholder: "2.0" },
        { key: "dt", label: "Sıcaklık Artışı (ΔT)", unit: "K", placeholder: "90" },
      ],
      calculate: (v) => {
        const q = v.mdot * v.cp * v.dt;
        return [{ label: "Isıtma Gücü (Q̇)", value: `${q.toFixed(1)} kW` }];
      },
    },
    {
      id: "settling-tank-time",
      name: "Settling Tank Süresi",
      group: "Yakıt Arıtma",
      formula: "t ≥ 24 saat",
      variables: [
        { symbol: "t", label: "Çökeltme süresi", unit: "saat" },
      ],
      source: { code: "ISO 8217 — settling tank uygulaması (HFO 70°C, yerçekimiyle çökme)" },
      note: "HFO için önerilen çökeltme süresi ≥ 24 saattir. Planlanan süre girilir; sınıra göre uygunluk değerlendirilir.",
      inputs: [
        { key: "t", label: "Planlanan Çökeltme Süresi", unit: "saat", placeholder: "24" },
      ],
      calculate: (v) => {
        const margin = v.t - 24;
        return [
          { label: "Sınıra Marj", value: `${margin.toFixed(1)} saat` },
          { label: "Uygunluk", value: margin >= 0 ? "UYGUN (≥24 saat)" : "YETERSİZ (<24 saat)" },
        ];
      },
    },
    {
      id: "bunker-quantity",
      name: "Bunker Miktar Hesabı",
      group: "Bunker Yönetimi",
      formula: "Bunker = (SFOC × P × 24 / 10⁶) × gün × (1 + pay/100)",
      variables: [
        { symbol: "SFOC", label: "Özgül yakıt tüketimi", unit: "g/kW·h" },
        { symbol: "P", label: "Motor gücü", unit: "kW" },
        { symbol: "gün", label: "Seyir süresi", unit: "gün" },
        { symbol: "pay", label: "Güvenlik payı", unit: "%" },
      ],
      source: { code: "Bunker planlama (SFOC × güç × süre + güvenlik payı)" },
      note: "SFOC g/kW·h'tir; günlük ton için ×24/10⁶. Güvenlik payı % olarak eklenir.",
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
};
