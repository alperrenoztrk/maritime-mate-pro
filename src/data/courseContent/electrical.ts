import { Zap } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Gemi Elektrik Sistemleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const electrical: CourseTopic = {
  key: "electrical",
  title: "Gemi Elektrik Sistemleri",
  icon: Zap,
  accent: "from-yellow-500 via-amber-500 to-orange-500",
  group: "machine",
  intro:
    "Temel elektrik bağıntıları, üç fazlı güç, koruma ve kablo hesapları. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "ohms-law",
      name: "Ohm Yasası",
      group: "Elektrik Temel",
      formula: "V = I × R",
      variables: [
        { symbol: "V", label: "Gerilim", unit: "V" },
        { symbol: "I", label: "Akım", unit: "A" },
        { symbol: "R", label: "Direnç", unit: "Ω" },
      ],
      source: { code: "Ohm yasası" },
    },
    {
      id: "three-phase-power",
      name: "Üç Fazlı Güç",
      group: "Elektrik Temel",
      formula: "P = √3 × V_L × I_L × cos(φ)",
      variables: [
        { symbol: "V_L", label: "Hat gerilimi", unit: "V" },
        { symbol: "I_L", label: "Hat akımı", unit: "A" },
        { symbol: "cos(φ)", label: "Güç faktörü" },
      ],
      source: { code: "Üç fazlı aktif güç bağıntısı" },
    },
    {
      id: "reactive-power",
      name: "Reaktif Güç",
      group: "Elektrik Temel",
      formula: "Q = √3 × V_L × I_L × sin(φ)",
      variables: [
        { symbol: "P", label: "Aktif güç", unit: "kW" },
        { symbol: "cos(φ)", label: "Güç faktörü" },
        { symbol: "Q", label: "Reaktif güç", unit: "kVAR" },
        { symbol: "S", label: "Görünür güç", unit: "kVA" },
      ],
      source: { code: "Üç fazlı reaktif güç (güç üçgeni)" },
      note: "Hesaplayıcı P ve cos(φ) ile φ = arccos(pf), Q = P·tan(φ), S = P/pf hesaplar.",
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
    {
      id: "apparent-power",
      name: "Görünür Güç",
      group: "Elektrik Temel",
      formula: "S = √(P² + Q²) = √3 × V_L × I_L",
      variables: [
        { symbol: "P", label: "Aktif güç", unit: "kW" },
        { symbol: "Q", label: "Reaktif güç", unit: "kVAR" },
        { symbol: "S", label: "Görünür güç", unit: "kVA" },
      ],
      source: { code: "Güç üçgeni (görünür güç)" },
    },
    {
      id: "generator-frequency",
      name: "Jeneratör Frekansı",
      group: "Elektrik Temel",
      formula: "f = (n × P) / 120",
      variables: [
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "P", label: "Kutup sayısı" },
        { symbol: "f", label: "Frekans", unit: "Hz" },
      ],
      source: { code: "Senkron jeneratör frekans-devir bağıntısı" },
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
      id: "short-circuit-current",
      name: "Kısa Devre Akımı",
      group: "Koruma ve Kablo",
      formula: "I_sc = V / (√3 × Z)",
      variables: [
        { symbol: "V", label: "Hat gerilimi", unit: "V" },
        { symbol: "Z", label: "Toplam empedans", unit: "Ω" },
      ],
      source: { code: "Üç fazlı kısa devre akımı (empedans yöntemi)" },
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
      id: "voltage-drop",
      name: "Gerilim Düşümü",
      group: "Koruma ve Kablo",
      formula: "ΔV = 2 × I × R × L × cos(φ)",
      variables: [
        { symbol: "I", label: "Akım", unit: "A" },
        { symbol: "R", label: "Birim direnç", unit: "Ω/km" },
        { symbol: "L", label: "Kablo uzunluğu", unit: "m" },
        { symbol: "cos(φ)", label: "Güç faktörü" },
      ],
      source: { code: "Kablo gerilim düşümü (gidiş-dönüş, IEC 60092)" },
      note: "Birim direnç Ω/km girilir, hesapta Ω/m'ye çevrilir (÷1000). Düşüm oranı 440 V referansına göre verilir.",
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
      id: "transformer-ratio",
      name: "Trafo Dönüşüm Oranı",
      group: "Koruma ve Kablo",
      formula: "a = V₁ / V₂ = I₂ / I₁",
      variables: [
        { symbol: "V₁", label: "Primer gerilim", unit: "V" },
        { symbol: "V₂", label: "Sekonder gerilim", unit: "V" },
        { symbol: "I₁", label: "Primer akım", unit: "A" },
        { symbol: "I₂", label: "Sekonder akım", unit: "A" },
      ],
      source: { code: "İdeal transformatör dönüşüm oranı" },
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
      id: "insulation-resistance",
      name: "İzolasyon Direnci",
      group: "Koruma ve Kablo",
      formula: "R_iz = V_test / I_kaçak",
      variables: [
        { symbol: "V_test", label: "Test gerilimi", unit: "V" },
        { symbol: "I_kaçak", label: "Kaçak akım", unit: "mA" },
        { symbol: "R_iz", label: "İzolasyon direnci", unit: "MΩ" },
      ],
      source: { code: "İzolasyon direnci ölçümü (SOLAS/IEC 60092, min 1 MΩ)" },
      note: "Kaçak akım mA, test gerilimi V girilir; R = V/I (kΩ) ÷1000 ile MΩ verilir.",
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
  ],
};
