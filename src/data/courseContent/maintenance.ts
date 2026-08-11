import { HardHat } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Bakım ve Tutum — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const maintenance: CourseTopic = {
  key: "maintenance",
  title: "Bakım ve Tutum",
  icon: HardHat,
  accent: "from-stone-500 via-amber-600 to-yellow-600",
  group: "machine",
  intro:
    "Güvenilirlik göstergeleri (MTBF/MTTR), kullanılabilirlik ve yağ analizi ile " +
    "bakım planlama. Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "mtbf-availability",
      name: "MTBF ve Kullanılabilirlik",
      group: "Bakım Planlama",
      formula: "MTBF = Toplam çalışma süresi / Arıza sayısı ; A = MTBF / (MTBF + MTTR)",
      variables: [
        { symbol: "MTBF", label: "Ortalama arızalar arası süre", unit: "saat" },
        { symbol: "MTTR", label: "Ortalama onarım süresi", unit: "saat" },
        { symbol: "A", label: "Kullanılabilirlik (availability)" },
      ],
      source: { code: "Güvenilirlik mühendisliği (MTBF/MTTR/availability)", detail: "Hedef A ≥ 0,95" },
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
      id: "reliability-rt",
      name: "Güvenilirlik R(t)",
      group: "Bakım Planlama",
      formula: "R(t) = e^(−t / MTBF)",
      variables: [
        { symbol: "R(t)", label: "t süresinde arızasız çalışma olasılığı" },
        { symbol: "t", label: "Hedef süre", unit: "saat" },
        { symbol: "MTBF", label: "Ortalama arızalar arası süre", unit: "saat" },
      ],
      source: { code: "Güvenilirlik — üstel arıza dağılımı" },
      inputs: [
        { key: "mtbf", label: "MTBF", unit: "saat", placeholder: "5000" },
        { key: "t", label: "Hedef Süre (t)", unit: "saat", placeholder: "1000" },
      ],
      calculate: (v) => {
        const lambda = 1 / v.mtbf;
        const rt = Math.exp(-lambda * v.t) * 100;
        return [
          { label: "Arıza Oranı (λ)", value: `${(lambda * 1e6).toFixed(1)} × 10⁻⁶ /saat` },
          { label: `R(${v.t}) Reliability`, value: `${rt.toFixed(2)}%` },
        ];
      },
    },
    {
      id: "liner-wear-rate",
      name: "Liner Aşınma Oranı",
      group: "Bakım Planlama",
      formula: "Aşınma Oranı = (d₁ − d₀) / (Çalışma saati / 1000)",
      variables: [
        { symbol: "d₀", label: "Orijinal çap", unit: "mm" },
        { symbol: "d₁", label: "Ölçülen çap", unit: "mm" },
        { symbol: "Aşınma Oranı", label: "Aşınma hızı", unit: "mm/1000 saat" },
      ],
      source: { code: "Silindir layner aşınma izleme", detail: "Genel limit: çapın %1'i kadar maksimum aşınma" },
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
      id: "oil-analysis-trend",
      name: "Yağ Analizi Trend",
      group: "Yağ Analizi",
      formula: "Fe ≤ 100 ppm (normal aşınma) ; TBN ≥ 20 mg KOH/g (tipik)",
      variables: [
        { symbol: "Fe", label: "Demir konsantrasyonu", unit: "ppm" },
        { symbol: "Cu", label: "Bakır konsantrasyonu", unit: "ppm" },
        { symbol: "Sn", label: "Kalay konsantrasyonu", unit: "ppm" },
        { symbol: "TBN", label: "Toplam baz sayısı", unit: "mg KOH/g" },
      ],
      source: { code: "Yağ analizi — metal partikül ve TBN trend izleme", detail: "Fe > 150 ppm: anormal aşınma; düşük TBN: asit nötralizasyonu azalmış" },
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
  ],
};
