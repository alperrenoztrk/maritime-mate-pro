import { Leaf } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Çevre ve MARPOL – Makine — tek kaynak ders içeriği.
 * Emisyon ve atık yönetimi formülleri ilgili hesaplayıcılarla TEK listede
 * birleştirildi; `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar
 * sayfasında görünür.
 */
export const environmentMachine: CourseTopic = {
  key: "environment-machine",
  title: "Çevre ve MARPOL – Makine",
  icon: Leaf,
  accent: "from-green-500 via-emerald-500 to-teal-500",
  group: "machine",
  intro:
    "Gemi makine dairesinden kaynaklanan emisyonlar (CO₂, SOx, NOx) ve atık " +
    "yönetimi (sintine, atık su, balast) — MARPOL ekleri çerçevesinde. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "co2-emission",
      name: "CO₂ Emisyonu",
      group: "Emisyon Hesapları",
      formula: "E_CO₂ = FC × C_f",
      variables: [
        { symbol: "FC", label: "Yakıt tüketimi", unit: "ton" },
        { symbol: "C_f", label: "Karbon faktörü (HFO: 3,114, MDO: 3,206)", unit: "t-CO₂/t-yakıt" },
      ],
      source: { code: "MARPOL Annex VI (IMO DCS / karbon faktörü)" },
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "ton", placeholder: "100" },
        { key: "cf", label: "Karbon Faktörü (C_f)", unit: "t-CO₂/t-yakıt", placeholder: "3.114" },
      ],
      calculate: (v) => {
        return [{ label: "CO₂ Emisyonu", value: `${(v.fc * v.cf).toFixed(1)} ton CO₂` }];
      },
    },
    {
      id: "sox-emission",
      name: "SOx Emisyonu",
      group: "Emisyon Hesapları",
      formula: "E_SOx = 2 × (S / 100) × FC",
      variables: [
        { symbol: "FC", label: "Yakıt tüketimi", unit: "ton" },
        { symbol: "S", label: "Yakıt kükürt oranı", unit: "%, m/m" },
      ],
      source: { code: "MARPOL Annex VI Reg.14 (kükürt sınırı: ECA %0,10, global %0,50)" },
      note: "S→SO₂ kütle dönüşüm çarpanı ≈ 2; kükürt oranı yüzde olarak girilir.",
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
      id: "nox-emission",
      name: "NOx Emisyonu",
      group: "Emisyon Hesapları",
      formula: "E_NOx = f(T_yanma, λ, t_yanma)",
      variables: [
        { symbol: "T_yanma", label: "Yanma sıcaklığı", unit: "K" },
        { symbol: "λ", label: "Hava fazlalık katsayısı" },
        { symbol: "t_yanma", label: "Yanma süresi", unit: "s" },
      ],
      source: { code: "MARPOL Annex VI Reg.13 (NOx Tier I/II/III sınırları)" },
      note: "NOx oluşumu yanma sıcaklığı, hava fazlalığı ve yanma süresiyle orantılıdır; kapalı analitik bağıntı yoktur (NOx Technical Code test çevrimi ile ölçülür).",
    },
    {
      id: "ows-capacity",
      name: "Yağlı Su Separatörü (OWS) Kapasitesi",
      group: "Atık Yönetimi",
      formula: "Q_OWS = V_sintine / t",
      variables: [
        { symbol: "V_sintine", label: "Günlük sintine üretimi", unit: "m³/gün" },
        { symbol: "t", label: "OWS çalışma süresi", unit: "saat/gün" },
        { symbol: "Q_OWS", label: "Gerekli OWS debisi", unit: "m³/saat" },
      ],
      source: { code: "MARPOL Annex I Reg.14 (sintine suyu yağ içeriği ≤ 15 ppm)" },
      note: "OWS çıkış yağ konsantrasyonu ≤ 15 ppm olmalıdır (15 ppm alarm + otomatik durdurma).",
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
      id: "sewage-treatment",
      name: "Atık Su (Sewage) Arıtma",
      group: "Atık Yönetimi",
      formula: "BOD₅ çıkış ≤ 25 mg/L",
      variables: [
        { symbol: "BOD₅", label: "5 günlük biyokimyasal oksijen ihtiyacı (çıkış)", unit: "mg/L" },
      ],
      source: { code: "MARPOL Annex IV (onaylı arıtma tesisi çıkış kalitesi)" },
      note: "Onaylı sewage arıtma tesisi çıkışı için tipik kalite kriteri; deşarj limitleri MEPC.227(64) ile belirlenir.",
    },
    {
      id: "ballast-treatment-capacity",
      name: "Balast Su Arıtma Kapasitesi",
      group: "Atık Yönetimi",
      formula: "t = V_balast / Q_pompa",
      variables: [
        { symbol: "V_balast", label: "Toplam balast hacmi", unit: "m³" },
        { symbol: "Q_pompa", label: "Balast pompa debisi", unit: "m³/saat" },
        { symbol: "t", label: "Toplam arıtma süresi", unit: "saat" },
      ],
      source: { code: "Ballast Water Management Convention (BWMC) D-2 standardı" },
      note: "Arıtma sistemi (BWTS) en az balast pompa debisi kadar (TRC) kapasiteli olmalıdır.",
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
};
