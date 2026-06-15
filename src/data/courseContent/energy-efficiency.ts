import { TrendingUp } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Enerji Verimliliği — tek kaynak ders içeriği.
 * Enerji verimliliği göstergeleri (EEDI, EEXI, CII, EEOI) ve atık ısı geri
 * kazanımı formülleri ilgili hesaplayıcılarla TEK listede birleştirildi;
 * `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const energyEfficiency: CourseTopic = {
  key: "energy-efficiency",
  title: "Enerji Verimliliği",
  icon: TrendingUp,
  accent: "from-lime-500 via-green-500 to-emerald-500",
  group: "machine",
  intro:
    "IMO enerji verimliliği rejimi: tasarım (EEDI/EEXI) ve operasyonel (CII/EEOI) " +
    "göstergeleri ile atık ısı geri kazanımı ve hız optimizasyonu. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "eedi",
      name: "EEDI (Enerji Verimlilik Tasarım İndeksi)",
      group: "Enerji Verimliliği Göstergeleri",
      formula: "EEDI = (P_ME × SFOC × C_f) / (DWT × V_ref)",
      variables: [
        { symbol: "P_ME", label: "Ana makine gücü", unit: "kW" },
        { symbol: "SFOC", label: "Özgül yakıt tüketimi", unit: "g/kW·h" },
        { symbol: "C_f", label: "CO₂ dönüşüm faktörü" },
        { symbol: "DWT", label: "Dedveyt (kapasite)", unit: "ton" },
        { symbol: "V_ref", label: "Referans hız", unit: "knot" },
      ],
      source: { code: "MARPOL Annex VI Reg.21 — EEDI (yeni gemiler için zorunlu üst sınır)" },
      note: "Sonuç g CO₂/(ton·NM) cinsindendir.",
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
      id: "eexi",
      name: "EEXI (Mevcut Gemi Enerji Verimlilik İndeksi)",
      group: "Enerji Verimliliği Göstergeleri",
      formula: "EEXI = (P_ME × SFOC_ME × C_f + P_AE × SFOC_AE × C_f) / (DWT × V_ref)",
      variables: [
        { symbol: "P_ME", label: "Ana makine gücü", unit: "kW" },
        { symbol: "SFOC_ME", label: "Ana makine özgül yakıt tüketimi", unit: "g/kW·h" },
        { symbol: "P_AE", label: "Yardımcı makine gücü", unit: "kW" },
        { symbol: "SFOC_AE", label: "Yardımcı makine özgül yakıt tüketimi", unit: "g/kW·h" },
        { symbol: "C_f", label: "CO₂ dönüşüm faktörü" },
        { symbol: "DWT", label: "Dedveyt (kapasite)", unit: "ton" },
        { symbol: "V_ref", label: "Referans hız", unit: "knot" },
      ],
      source: { code: "EEXI — MEPC.328(76) (2023'ten itibaren mevcut gemiler için zorunlu)" },
      note: "Sonuç g CO₂/(ton·NM) cinsindendir.",
      inputs: [
        { key: "pme", label: "Ana Motor Gücü (P_ME)", unit: "kW", placeholder: "15000" },
        { key: "sfocMe", label: "Ana Motor SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "pae", label: "Yardımcı Motor Gücü (P_AE)", unit: "kW", placeholder: "750" },
        { key: "sfocAe", label: "Yardımcı SFOC", unit: "g/kW·h", placeholder: "215" },
        { key: "cf", label: "CO₂ Faktörü", unit: "", placeholder: "3.114" },
        { key: "dwt", label: "DWT", unit: "ton", placeholder: "50000" },
        { key: "vref", label: "Referans Hız", unit: "knot", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const eexi = ((v.pme * v.sfocMe * v.cf) + (v.pae * v.sfocAe * v.cf)) / (v.dwt * v.vref);
        return [{ label: "EEXI", value: `${eexi.toFixed(2)} g CO₂/(ton·NM)` }];
      },
    },
    {
      id: "cii-aer",
      name: "CII / AER (Yıllık Karbon Yoğunluğu)",
      group: "Enerji Verimliliği Göstergeleri",
      formula: "CII (AER) = (CO₂_toplam × 10⁶) / (DWT × D_toplam)",
      variables: [
        { symbol: "CO₂_toplam", label: "Yıllık toplam CO₂ emisyonu", unit: "ton" },
        { symbol: "DWT", label: "Dedveyt (kapasite)", unit: "ton" },
        { symbol: "D_toplam", label: "Yıllık toplam seyir mesafesi", unit: "NM" },
      ],
      source: { code: "CII/AER — MEPC.328(76) (yıllık derecelendirme A–E)" },
      note: "Toplam CO₂ ton girilir, 10⁶ ile g'a çevrilir; sonuç g CO₂/(DWT·NM). AER, CII hesabında kullanılan göstergedir.",
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
      id: "eeoi",
      name: "EEOI (Enerji Verimlilik Operasyonel Göstergesi)",
      group: "Enerji Verimliliği Göstergeleri",
      formula: "EEOI = (FC × C_f × 10⁶) / (Yük × D)",
      variables: [
        { symbol: "FC", label: "Yakıt tüketimi", unit: "ton" },
        { symbol: "C_f", label: "CO₂ dönüşüm faktörü" },
        { symbol: "Yük", label: "Taşınan yük", unit: "ton" },
        { symbol: "D", label: "Mesafe", unit: "NM" },
      ],
      source: { code: "EEOI — MEPC.1/Circ.684 (gönüllü operasyonel gösterge)" },
      note: "Yakıt tüketimi ton girilir, 10⁶ ile g'a çevrilir; sonuç g CO₂/(ton·NM).",
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
      id: "speed-reduction-fuel-saving",
      name: "Hız Azaltma ile Yakıt Tasarrufu (Küp Kuralı)",
      group: "Atık Isı Geri Kazanım",
      formula: "FC₂ = FC₁ × (V₂ / V₁)³",
      variables: [
        { symbol: "V₁", label: "Mevcut hız", unit: "knot" },
        { symbol: "V₂", label: "Yeni hız", unit: "knot" },
        { symbol: "FC₁", label: "Mevcut yakıt tüketimi", unit: "ton/gün" },
        { symbol: "FC₂", label: "Yeni yakıt tüketimi", unit: "ton/gün" },
      ],
      source: { code: "SEEMP — hız optimizasyonu (gemi direnci ∝ hızın küpü)" },
      note: "Sevk gücü ve yakıt tüketimi hızın küpüyle orantılıdır; tasarruf (%) = (FC₁ − FC₂)/FC₁ × 100.",
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
    {
      id: "whr-power",
      name: "Atık Isı Geri Kazanım (WHRS)",
      group: "Atık Isı Geri Kazanım",
      formula: "P_WHR = ṁ_egzoz × c_p × ΔT × η",
      variables: [
        { symbol: "ṁ_egzoz", label: "Egzoz gazı debisi", unit: "kg/s" },
        { symbol: "c_p", label: "Özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Egzoz sıcaklık düşüşü", unit: "K" },
        { symbol: "η", label: "WHR sistem verimi" },
      ],
      source: { code: "Atık ısı geri kazanım sistemi (WHRS) — egzoz enerji bilançosu" },
      note: "ΔT = T_giriş − T_çıkış (K = °C farkı); verim % girilir, hesapta orana çevrilir.",
      inputs: [
        { key: "mexh", label: "Egzoz Debisi", unit: "kg/s", placeholder: "30" },
        { key: "texhIn", label: "Egzoz Giriş Sıcaklığı", unit: "°C", placeholder: "350" },
        { key: "texhOut", label: "Egzoz Çıkış Sıcaklığı", unit: "°C", placeholder: "180" },
        { key: "cp", label: "Özgül Isı (c_p)", unit: "kJ/kg·K", placeholder: "1.05" },
        { key: "eta", label: "Sistem Verimi", unit: "%", placeholder: "70" },
      ],
      calculate: (v) => {
        const qAvail = v.mexh * v.cp * (v.texhIn - v.texhOut);
        const qRecovered = qAvail * (v.eta / 100);
        return [
          { label: "Kullanılabilir Isı", value: `${qAvail.toFixed(0)} kW` },
          { label: "Geri Kazanılan Enerji", value: `${qRecovered.toFixed(0)} kW` },
        ];
      },
    },
    {
      id: "seemp-saving",
      name: "SEEMP Tasarruf",
      group: "Atık Isı Geri Kazanım",
      formula: "Tasarruf (%) = (FC_öncesi − FC_sonrası) / FC_öncesi × 100",
      variables: [
        { symbol: "FC_öncesi", label: "Önlem öncesi yakıt tüketimi", unit: "ton" },
        { symbol: "FC_sonrası", label: "Önlem sonrası yakıt tüketimi", unit: "ton" },
      ],
      source: { code: "SEEMP — Ship Energy Efficiency Management Plan (MARPOL Annex VI Reg.22)" },
    },
  ],
};
