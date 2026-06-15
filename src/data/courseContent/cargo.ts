import { Package } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yük Elleçleme ve İstifleme — tek kaynak ders içeriği.
 * Formüller mevcut CargoCalculations sayfasındaki gerçek ifadelerden alınmış,
 * hesaplayıcılar bu ifadeleri birebir uygular.
 */
export const cargo: CourseTopic = {
  key: "cargo",
  title: "Yük Elleçleme ve İstifleme",
  icon: Package,
  accent: "from-amber-500 via-orange-500 to-rose-500",
  group: "deck",
  intro:
    "İstif faktörü, draft survey, lashing ve tahıl stabilitesi. Her formülün " +
    "altında onu hesaplayan araç yer alır.",
  advancedTool: { label: "Gelişmiş Kargo Araçları", href: "/cargo/calculations" },
  entries: [
    {
      id: "stowage-volume",
      name: "İstif Hacmi",
      group: "İstifleme",
      formula: "V = W × SF",
      variables: [
        { symbol: "W", label: "Yük ağırlığı", unit: "t" },
        { symbol: "SF", label: "İstif faktörü", unit: "m³/t" },
      ],
      source: { code: "İstif faktörü (stowage factor) tanımı" },
      inputs: [
        { key: "w", label: "Ağırlık (W)", unit: "t", placeholder: "5000" },
        { key: "sf", label: "İstif Faktörü (SF)", unit: "m³/t", placeholder: "1.4" },
      ],
      calculate: (v) => [{ label: "Gerekli Hacim (V)", value: `${(v.w * v.sf).toFixed(1)} m³` }],
    },
    {
      id: "net-hold-volume",
      name: "Net Ambar Hacmi (Broken Stowage)",
      group: "İstifleme",
      formula: "V_net = V_ambar × (1 − BS)",
      variables: [
        { symbol: "V_ambar", label: "Brüt ambar hacmi", unit: "m³" },
        { symbol: "BS", label: "Kayıp istif oranı (broken stowage)", unit: "oran" },
      ],
      source: { code: "Broken stowage (kayıp istif) bağıntısı" },
      note: "BS yüzde olarak girilir (örn. 10 → %10).",
      inputs: [
        { key: "vol", label: "Ambar Hacmi", unit: "m³", placeholder: "8000" },
        { key: "bs", label: "Broken Stowage", unit: "%", placeholder: "10" },
      ],
      calculate: (v) => [{ label: "Net Hacim", value: `${(v.vol * (1 - v.bs / 100)).toFixed(1)} m³` }],
    },
    {
      id: "mass-from-volume",
      name: "Hacimden Kütle",
      group: "İstifleme",
      formula: "W = V × ρ",
      variables: [
        { symbol: "V", label: "Hacim", unit: "m³" },
        { symbol: "ρ", label: "Yoğunluk", unit: "t/m³" },
      ],
      source: { code: "Kütle-hacim-yoğunluk bağıntısı" },
      inputs: [
        { key: "vol", label: "Hacim (V)", unit: "m³", placeholder: "8000" },
        { key: "rho", label: "Yoğunluk (ρ)", unit: "t/m³", placeholder: "0.85" },
      ],
      calculate: (v) => [{ label: "Kütle (W)", value: `${(v.vol * v.rho).toFixed(1)} t` }],
    },
    {
      id: "effective-lashing",
      name: "Etkin Bağlama Kuvveti (MSL)",
      group: "Bağlama (Lashing)",
      formula: "F_etkin = MSL × cos α",
      variables: [
        { symbol: "MSL", label: "Maksimum güvenli bağlama yükü", unit: "kN" },
        { symbol: "α", label: "Bağ ile güverte arası açı", unit: "°" },
      ],
      source: { code: "CSS Code", detail: "Kargo bağlama (lashing) hesabı" },
      inputs: [
        { key: "msl", label: "MSL", unit: "kN", placeholder: "100" },
        { key: "alpha", label: "Açı (α)", unit: "°", placeholder: "30" },
      ],
      calculate: (v) => [
        { label: "Etkin Kuvvet", value: `${(v.msl * Math.cos((v.alpha * Math.PI) / 180)).toFixed(2)} kN` },
      ],
    },
    {
      id: "qm-draft",
      name: "Quarter Mean Draft",
      group: "Draft Survey",
      formula: "d_QM = (d_F + 6 × d_M + d_A) / 8",
      variables: [
        { symbol: "d_F", label: "Baş draft", unit: "m" },
        { symbol: "d_M", label: "Vasat draft", unit: "m" },
        { symbol: "d_A", label: "Kıç draft", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Quarter mean (MMM)" },
      inputs: [
        { key: "df", label: "Baş (d_F)", unit: "m", placeholder: "7.80" },
        { key: "dm", label: "Vasat (d_M)", unit: "m", placeholder: "8.00" },
        { key: "da", label: "Kıç (d_A)", unit: "m", placeholder: "8.20" },
      ],
      calculate: (v) => [{ label: "Quarter Mean", value: `${((v.df + 6 * v.dm + v.da) / 8).toFixed(3)} m` }],
    },
    {
      id: "trim-correction-1",
      name: "1. Trim Düzeltmesi",
      group: "Draft Survey",
      formula: "Δ₁ = (Trim × LCF × TPC × 100) / LBP",
      variables: [
        { symbol: "Trim", label: "Trim", unit: "m" },
        { symbol: "LCF", label: "Su hattı alan merkezi", unit: "m" },
        { symbol: "TPC", label: "1 cm için ton", unit: "t/cm" },
        { symbol: "LBP", label: "Dikmeler arası boy", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Birinci trim düzeltmesi" },
      inputs: [
        { key: "trim", label: "Trim", unit: "m", placeholder: "0.40" },
        { key: "lcf", label: "LCF", unit: "m", placeholder: "2.5" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
        { key: "lbp", label: "LBP", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.lbp <= 0) return [{ label: "Hata", value: "LBP pozitif olmalı" }];
        return [{ label: "Δ₁", value: `${((v.trim * v.lcf * v.tpc * 100) / v.lbp).toFixed(1)} t` }];
      },
    },
    {
      id: "density-correction",
      name: "Yoğunluk (Dock) Düzeltmesi",
      group: "Draft Survey",
      formula: "Δ_corrected = Δ_table × (ρ_dock / 1.025)",
      variables: [
        { symbol: "Δ_table", label: "Tablodan deplasman", unit: "t" },
        { symbol: "ρ_dock", label: "Liman suyu yoğunluğu", unit: "t/m³" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Yoğunluk düzeltmesi" },
      inputs: [
        { key: "disp", label: "Tablo Deplasmanı", unit: "t", placeholder: "12000" },
        { key: "rho", label: "Liman Suyu (ρ)", unit: "t/m³", placeholder: "1.012" },
      ],
      calculate: (v) => [{ label: "Düzeltilmiş Deplasman", value: `${(v.disp * (v.rho / 1.025)).toFixed(1)} t` }],
    },
    {
      id: "gsv",
      name: "Brüt Standart Hacim (GSV)",
      group: "Sıvı Yük",
      formula: "GSV = GOV × VCF",
      variables: [
        { symbol: "GOV", label: "Gözlenen brüt hacim", unit: "m³" },
        { symbol: "VCF", label: "Hacim düzeltme faktörü" },
      ],
      source: { code: "API/ASTM petrol ölçüm standardı" },
      inputs: [
        { key: "gov", label: "GOV", unit: "m³", placeholder: "5000" },
        { key: "vcf", label: "VCF", unit: "", placeholder: "0.985" },
      ],
      calculate: (v) => [{ label: "GSV", value: `${(v.gov * v.vcf).toFixed(2)} m³` }],
    },
    {
      id: "tml",
      name: "Taşınabilir Nem Limiti (TML)",
      group: "Katı Dökme Yük",
      formula: "TML = FMP × 0.9",
      variables: [{ symbol: "FMP", label: "Akış nem noktası (flow moisture point)", unit: "%" }],
      source: { code: "IMSBC Code", detail: "Grup A yükler — TML/FMP" },
      inputs: [{ key: "fmp", label: "FMP", unit: "%", placeholder: "15" }],
      calculate: (v) => [{ label: "TML", value: `${(v.fmp * 0.9).toFixed(2)} %` }],
    },
    {
      id: "grain-heel",
      name: "Tahıl Kümelenme Açısı",
      group: "Katı Dökme Yük",
      formula: "θ = (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Tahıl kayma momenti", unit: "t·m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Düzeltilmiş GM", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "Kümelenme açısı ≤ 12°" },
      inputs: [
        { key: "ghm", label: "GHM", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ ve GM pozitif olmalı" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        return [
          { label: "Kümelenme Açısı", value: `${theta.toFixed(2)} °` },
          { label: "Durum", value: theta <= 12 ? "Uygun (≤12°)" : "Limit aşıldı" },
        ];
      },
    },
  ],
};
