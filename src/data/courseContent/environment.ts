import { Leaf } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Denizcilik ve Çevre Koruma — tek kaynak ders içeriği.
 * Formüller mevcut EmissionFormulas sayfasındaki gerçek ifadelerden alınmış,
 * hesaplayıcılar bu ifadeleri birebir uygular.
 */
export const environment: CourseTopic = {
  key: "environment",
  title: "Denizcilik ve Çevre Koruma",
  icon: Leaf,
  accent: "from-emerald-600 via-green-600 to-teal-700",
  group: "deck",
  intro:
    "Emisyon hesapları (CO₂, SOx, NOx, PM) ve enerji verimliliği göstergeleri " +
    "(EEDI, EEXI, CII, AER). Her formülün altında onu hesaplayan araç yer alır.",
  advancedTool: { label: "Gelişmiş Emisyon Araçları", href: "/environment/calculations" },
  entries: [
    {
      id: "co2-emission",
      name: "CO₂ Emisyonu",
      group: "Emisyonlar",
      formula: "CO₂ (ton) = Yakıt (ton) × CF",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "CF", label: "Karbon faktörü", unit: "t CO₂/t yakıt" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "MEPC.245(66) — CF değerleri" },
      note: "CF: HFO 3,114 · MDO/MGO 3,206 · LNG 2,750 (t CO₂/t yakıt).",
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "cf", label: "Karbon Faktörü (CF)", unit: "", placeholder: "3.114" },
      ],
      calculate: (v) => [{ label: "CO₂", value: `${(v.fuel * v.cf).toFixed(1)} ton` }],
    },
    {
      id: "sox-emission",
      name: "SOx Emisyonu",
      group: "Emisyonlar",
      formula: "SOx (kg) = Yakıt (ton) × S% × 20",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "S%", label: "Yakıt kükürt oranı", unit: "% m/m" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Kural 14 — kükürt limiti" },
      note: "20 katsayısı, S kütlesinin SO₂'ye dönüşümünü içerir (1 t yakıt = 10 kg/%S × 2).",
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "s", label: "Kükürt (S%)", unit: "%", placeholder: "0.5" },
      ],
      calculate: (v) => [{ label: "SOx", value: `${(v.fuel * v.s * 20).toFixed(1)} kg` }],
    },
    {
      id: "nox-emission",
      name: "NOx Emisyonu",
      group: "Emisyonlar",
      formula: "NOx (kg) = P (kW) × t (h) × EF / 1000",
      variables: [
        { symbol: "P", label: "Makine gücü", unit: "kW" },
        { symbol: "t", label: "Running time", unit: "h" },
        { symbol: "EF", label: "Emisyon faktörü", unit: "g/kWh" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Kural 13 — NOx Tier limitleri" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "t", label: "Süre (t)", unit: "h", placeholder: "24" },
        { key: "ef", label: "Emisyon Faktörü (EF)", unit: "g/kWh", placeholder: "14" },
      ],
      calculate: (v) => [{ label: "NOx", value: `${((v.p * v.t * v.ef) / 1000).toFixed(1)} kg` }],
    },
    {
      id: "pm-emission",
      name: "Partikül Madde (PM)",
      group: "Emisyonlar",
      formula: "PM (kg) = Yakıt (ton) × EFPM",
      variables: [
        { symbol: "Fuel", label: "Fuel consumption", unit: "t" },
        { symbol: "EFPM", label: "PM emisyon faktörü", unit: "kg/t" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "Partikül madde emisyonu" },
      inputs: [
        { key: "fuel", label: "Fuel", unit: "t", placeholder: "1000" },
        { key: "efpm", label: "EFPM", unit: "kg/t", placeholder: "7.6" },
      ],
      calculate: (v) => [{ label: "PM", value: `${(v.fuel * v.efpm).toFixed(1)} kg` }],
    },
    {
      id: "eexi",
      name: "EEXI",
      group: "Energy Efficiency",
      formula: "EEXI = (P × CF × SFC) / (Capacity × Vref)",
      variables: [
        { symbol: "P", label: "Main engine power", unit: "kW" },
        { symbol: "CF", label: "Karbon faktörü", unit: "t CO₂/t" },
        { symbol: "SFC", label: "Specific fuel consumption", unit: "g/kWh" },
        { symbol: "Capacity", label: "Kapasite (DWT)", unit: "t" },
        { symbol: "Vref", label: "Reference speed", unit: "kn" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "EEXI — MEPC.333(76)" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "cf", label: "CF", unit: "", placeholder: "3.114" },
        { key: "sfc", label: "SFC", unit: "g/kWh", placeholder: "180" },
        { key: "cap", label: "Kapasite", unit: "t", placeholder: "50000" },
        { key: "vref", label: "Vref", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        const denom = v.cap * v.vref;
        if (denom <= 0) return [{ label: "Hata", value: "Kapasite ve Vref pozitif olmalı" }];
        return [{ label: "EEXI", value: `${((v.p * v.cf * v.sfc) / denom).toFixed(2)} g CO₂/t·mil` }];
      },
    },
    {
      id: "cii",
      name: "CII (Karbon Yoğunluğu Göstergesi)",
      group: "Energy Efficiency",
      formula: "CII = Yıllık CO₂ / (Capacity × Distance)",
      variables: [
        { symbol: "Yıllık CO₂", label: "Yıllık toplam CO₂", unit: "g" },
        { symbol: "Capacity", label: "Kapasite (DWT)", unit: "t" },
        { symbol: "Distance", label: "Yıllık mesafe", unit: "deniz mili" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "CII — MEPC.336(76); derece A–E" },
      inputs: [
        { key: "co2", label: "Yıllık CO₂", unit: "g", placeholder: "300000000000" },
        { key: "cap", label: "Kapasite", unit: "t", placeholder: "50000" },
        { key: "dist", label: "Mesafe", unit: "n.mil", placeholder: "60000" },
      ],
      calculate: (v) => {
        const denom = v.cap * v.dist;
        if (denom <= 0) return [{ label: "Hata", value: "Kapasite ve mesafe pozitif olmalı" }];
        return [{ label: "CII", value: `${(v.co2 / denom).toFixed(3)} g CO₂/t·mil` }];
      },
    },
    {
      id: "aer",
      name: "AER (Yıllık Verimlilik Oranı)",
      group: "Energy Efficiency",
      formula: "AER = ∑CO₂ / (DWT × ∑Distance)",
      variables: [
        { symbol: "∑CO₂", label: "Yıllık toplam CO₂", unit: "g" },
        { symbol: "DWT", label: "Taşıma kapasitesi", unit: "t" },
        { symbol: "∑Distance", label: "Yıllık toplam mesafe", unit: "deniz mili" },
      ],
      source: { code: "IMO — AER (CII hesabında kullanılır)" },
      inputs: [
        { key: "co2", label: "∑CO₂", unit: "g", placeholder: "300000000000" },
        { key: "dwt", label: "DWT", unit: "t", placeholder: "50000" },
        { key: "dist", label: "∑Distance", unit: "n.mil", placeholder: "60000" },
      ],
      calculate: (v) => {
        const denom = v.dwt * v.dist;
        if (denom <= 0) return [{ label: "Hata", value: "DWT ve mesafe pozitif olmalı" }];
        return [{ label: "AER", value: `${(v.co2 / denom).toFixed(3)} g CO₂/t·mil` }];
      },
    },
    {
      id: "foc",
      name: "Günlük Yakıt Tüketimi (FOC)",
      group: "Yakıt ve Enerji",
      formula: "FOC (ton/gün) = P (kW) × SFOC (g/kWh) × 24 / 10⁶",
      variables: [
        { symbol: "P", label: "Makine gücü", unit: "kW" },
        { symbol: "SFOC", label: "Specific fuel consumption", unit: "g/kWh" },
      ],
      source: { code: "Yakıt tüketimi — SFOC bağıntısı" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "sfoc", label: "SFOC", unit: "g/kWh", placeholder: "180" },
      ],
      calculate: (v) => [{ label: "FOC", value: `${((v.p * v.sfoc * 24) / 1e6).toFixed(2)} ton/gün` }],
    },
    {
      id: "shaft-energy",
      name: "Şaft Enerjisi",
      group: "Yakıt ve Enerji",
      formula: "E = P (kW) × t (h)",
      variables: [
        { symbol: "P", label: "Power", unit: "kW" },
        { symbol: "t", label: "Duration", unit: "h" },
      ],
      source: { code: "Enerji = güç × süre" },
      inputs: [
        { key: "p", label: "Power (P)", unit: "kW", placeholder: "8000" },
        { key: "t", label: "Süre (t)", unit: "h", placeholder: "24" },
      ],
      calculate: (v) => [{ label: "Enerji (E)", value: `${(v.p * v.t).toFixed(0)} kWh` }],
    },
    {
      id: "eedi",
      name: "EEDI",
      group: "Energy Efficiency",
      formula: "EEDI = (∑P × CF × SFC) / (fi × Capacity × Vref)",
      variables: [
        { symbol: "∑P", label: "Toplam makine gücü", unit: "kW" },
        { symbol: "CF", label: "Karbon faktörü" },
        { symbol: "SFC", label: "Specific fuel consumption", unit: "g/kWh" },
        { symbol: "fi", label: "Kapasite düzeltme faktörü" },
        { symbol: "Capacity", label: "Kapasite (DWT)", unit: "t" },
        { symbol: "Vref", label: "Reference speed", unit: "kn" },
      ],
      source: { code: "IMO MARPOL Annex VI", detail: "EEDI — MEPC.245(66)" },
      inputs: [
        { key: "p", label: "∑Güç", unit: "kW", placeholder: "8000" },
        { key: "cf", label: "CF", unit: "", placeholder: "3.114" },
        { key: "sfc", label: "SFC", unit: "g/kWh", placeholder: "180" },
        { key: "fi", label: "fi", unit: "", placeholder: "1" },
        { key: "cap", label: "Kapasite", unit: "t", placeholder: "50000" },
        { key: "vref", label: "Vref", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        const denom = v.fi * v.cap * v.vref;
        if (denom <= 0) return [{ label: "Hata", value: "fi, kapasite, Vref pozitif olmalı" }];
        return [{ label: "EEDI", value: `${((v.p * v.cf * v.sfc) / denom).toFixed(2)} g CO₂/t·mil` }];
      },
    },
  ],
};
