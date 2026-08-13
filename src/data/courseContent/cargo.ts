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
      formula: "Vnet = Vambar × (1 − BS)",
      variables: [
        { symbol: "Vambar", label: "Brüt ambar hacmi", unit: "m³" },
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
        { symbol: "ρ", label: "Density", unit: "t/m³" },
      ],
      source: { code: "Kütle-hacim-yoğunluk bağıntısı" },
      inputs: [
        { key: "vol", label: "Hacim (V)", unit: "m³", placeholder: "8000" },
        { key: "rho", label: "Density (ρ)", unit: "t/m³", placeholder: "0.85" },
      ],
      calculate: (v) => [{ label: "Kütle (W)", value: `${(v.vol * v.rho).toFixed(1)} t` }],
    },
    {
      id: "effective-lashing",
      name: "Etkin Bağlama Kuvveti (MSL)",
      group: "Bağlama (Lashing)",
      formula: "Fetkin = MSL × cos α",
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
      formula: "dQM = (dF + 6 × dM + dA) / 8",
      variables: [
        { symbol: "dF", label: "Forward draft", unit: "m" },
        { symbol: "dM", label: "Vasat draft", unit: "m" },
        { symbol: "dA", label: "Aft draft", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Quarter mean (MMM)" },
      inputs: [
        { key: "df", label: "Baş (dF)", unit: "m", placeholder: "7.80" },
        { key: "dm", label: "Vasat (dM)", unit: "m", placeholder: "8.00" },
        { key: "da", label: "Kıç (dA)", unit: "m", placeholder: "8.20" },
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
        { symbol: "TPC", label: "Tonnes per centimetre", unit: "t/cm" },
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
      formula: "Δcorrected = Δtable × (ρdock / 1.025)",
      variables: [
        { symbol: "Δtable", label: "Tablodan deplasman", unit: "t" },
        { symbol: "ρdock", label: "Dock water density", unit: "t/m³" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Density correction" },
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
      name: "Grain Heeling Angle",
      group: "Katı Dökme Yük",
      formula: "θ = (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Grain heeling moment", unit: "t·m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Corrected GM", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "Kümelenme açısı ≤ 12°" },
      inputs: [
        { key: "ghm", label: "GHM", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ and GM must be positive" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        return [
          { label: "Kümelenme Açısı", value: `${theta.toFixed(2)} °` },
          { label: "Durum", value: theta <= 12 ? "Uygun (≤12°)" : "Limit aşıldı" },
        ];
      },
    },
    {
      id: "cargo-deadweight",
      name: "Taşınabilir Yük (Deadweight Balansı)",
      group: "Yük Planlama",
      formula: "Yük = DWT − (Yakıt + Tatlı Su + Kumanya + Constant)",
      variables: [
        { symbol: "DWT", label: "Yaz deadweight (DWT)", unit: "t" },
        { symbol: "Fuel", label: "Yakıt + yağ (bunker)", unit: "t" },
        { symbol: "Tatlı Su", label: "Tatlı su", unit: "t" },
        { symbol: "Kumanya", label: "Kumanya + stores", unit: "t" },
        { symbol: "Constant", label: "Gemi sabiti (constant)", unit: "t" },
      ],
      source: { code: "Deadweight (DWT) balansı — yük kapasitesi" },
      note: "Maksimum yüklenebilecek kargo, yaz DWT'sinden tüm değişmez ağırlıkların (deadweight kalemleri) düşülmesiyle bulunur.",
      inputs: [
        { key: "dwt", label: "Yaz DWT", unit: "t", placeholder: "25000" },
        { key: "fuel", label: "Yakıt + Yağ", unit: "t", placeholder: "1200" },
        { key: "fw", label: "Tatlı Su", unit: "t", placeholder: "300" },
        { key: "stores", label: "Kumanya + Stores", unit: "t", placeholder: "100" },
        { key: "constant", label: "Constant", unit: "t", placeholder: "250" },
      ],
      calculate: (v) => {
        const cargo = v.dwt - (v.fuel + v.fw + v.stores + v.constant);
        return [
          { label: "Taşınabilir Yük", value: `${cargo.toFixed(0)} t` },
          { label: "Durum", value: cargo > 0 ? "Uygun" : "Deadweight aşıldı" },
        ];
      },
    },
    {
      id: "deck-load-intensity",
      name: "Güverte/Tank Top Yük Yoğunluğu",
      group: "Yük Planlama",
      formula: "p = W / A  (≤ izin verilen güverte yükü)",
      variables: [
        { symbol: "p", label: "Yük yoğunluğu", unit: "t/m²" },
        { symbol: "W", label: "Yük ağırlığı", unit: "t" },
        { symbol: "A", label: "Taban temas alanı", unit: "m²" },
      ],
      source: { code: "Güverte/tank top mukavemeti — izin verilen yük yoğunluğu" },
      note: "Hesaplanan yoğunluk, geminin izin verilen güverte/tank top yük limitini (t/m²) aşmamalıdır.",
      inputs: [
        { key: "w", label: "Yük Ağırlığı (W)", unit: "t", placeholder: "60" },
        { key: "a", label: "Temas Alanı (A)", unit: "m²", placeholder: "20" },
        { key: "limit", label: "İzin Verilen Yük", unit: "t/m²", placeholder: "5" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Hata", value: "The area must be positive" }];
        const p = v.w / v.a;
        const status = v.limit > 0 ? (p <= v.limit ? "Uygun" : "Limit aşıldı") : "—";
        return [
          { label: "Yük Yoğunluğu (p)", value: `${p.toFixed(2)} t/m²` },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      id: "cargo-shift-list",
      name: "Yük Kayması Meyil Açısı",
      group: "Yük Planlama",
      formula: "θ = (w × d) / (Δ × GM) × 57.3",
      variables: [
        { symbol: "θ", label: "Heel angle", unit: "°" },
        { symbol: "w", label: "Kayan/transfer edilen yük", unit: "t" },
        { symbol: "d", label: "Enine yer değiştirme mesafesi", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Corrected GM", unit: "m" },
      ],
      source: { code: "Stabilite — enine ağırlık kaymasından meyil" },
      note: "Küçük açı yaklaşımı (tan θ ≈ θ). Büyük açılarda tam çözüm gerekir.",
      inputs: [
        { key: "w", label: "Kayan Yük (w)", unit: "t", placeholder: "200" },
        { key: "d", label: "Enine Mesafe (d)", unit: "m", placeholder: "8" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ and GM must be positive" }];
        const theta = ((v.w * v.d) / (v.disp * v.gm)) * 57.3;
        return [{ label: "Heel Angle (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
  ],
};
