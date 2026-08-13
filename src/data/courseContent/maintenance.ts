import { HardHat } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Bakım ve Tutum — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const maintenance: CourseTopic = {
  key: "maintenance",
  title: "Maintenance and Upkeep",
  icon: HardHat,
  accent: "from-stone-500 via-amber-600 to-yellow-600",
  group: "machine",
  intro:
    "Reliability indicators (MTBF/MTTR), availability and oil analysis for " +
    "maintenance planning. Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "mtbf-availability",
      name: "MTBF and Availability",
      group: "Maintenance Planning",
      formula: "MTBF = Total running time / Number of failures ; A = MTBF / (MTBF + MTTR)",
      variables: [
        { symbol: "MTBF", label: "Mean time between failures", unit: "saat" },
        { symbol: "MTTR", label: "Mean time to repair", unit: "saat" },
        { symbol: "A", label: "Availability" },
      ],
      source: { code: "Reliability engineering (MTBF/MTTR/availability)", detail: "Hedef A ≥ 0,95" },
      inputs: [
        { key: "hours", label: "Total Running Time", unit: "saat", placeholder: "8760" },
        { key: "failures", label: "Number of Failures", unit: "adet", placeholder: "3" },
        { key: "repair", label: "Total Repair Time", unit: "saat", placeholder: "72" },
      ],
      calculate: (v) => {
        if (v.failures === 0) return [{ label: "MTBF", value: "No failures — infinite" }];
        const mtbf = v.hours / v.failures;
        const mttr = v.repair / v.failures;
        const avail = mtbf / (mtbf + mttr) * 100;
        return [
          { label: "MTBF", value: `${mtbf.toFixed(0)} saat` },
          { label: "MTTR", value: `${mttr.toFixed(1)} saat` },
          { label: "Availability", value: `${avail.toFixed(1)}%` },
        ];
      },
    },
    {
      id: "reliability-rt",
      name: "Reliability R(t)",
      group: "Maintenance Planning",
      formula: "R(t) = e^(−t / MTBF)",
      variables: [
        { symbol: "R(t)", label: "Probability of failure-free operation over the time t" },
        { symbol: "t", label: "Target time", unit: "saat" },
        { symbol: "MTBF", label: "Mean time between failures", unit: "saat" },
      ],
      source: { code: "Reliability — exponential failure distribution" },
      inputs: [
        { key: "mtbf", label: "MTBF", unit: "saat", placeholder: "5000" },
        { key: "t", label: "Target Time (t)", unit: "saat", placeholder: "1000" },
      ],
      calculate: (v) => {
        const lambda = 1 / v.mtbf;
        const rt = Math.exp(-lambda * v.t) * 100;
        return [
          { label: "Failure Rate (λ)", value: `${(lambda * 1e6).toFixed(1)} × 10⁻⁶ /saat` },
          { label: `R(${v.t}) Reliability`, value: `${rt.toFixed(2)}%` },
        ];
      },
    },
    {
      id: "liner-wear-rate",
      name: "Liner Wear Rate",
      group: "Maintenance Planning",
      formula: "Wear Rate = (d₁ − d₀) / (Running hours / 1000)",
      variables: [
        { symbol: "d₀", label: "Original diameter", unit: "mm" },
        { symbol: "d₁", label: "Measured diameter", unit: "mm" },
        { symbol: "Wear Rate", label: "Wear rate", unit: "mm/1000 saat" },
      ],
      source: { code: "Cylinder liner wear monitoring", detail: "General limit: a maximum wear of 1% of the diameter" },
      inputs: [
        { key: "d0", label: "Original Diameter", unit: "mm", placeholder: "500" },
        { key: "d1", label: "Measured Diameter", unit: "mm", placeholder: "500.8" },
        { key: "hours", label: "Running Hours", unit: "saat", placeholder: "20000" },
      ],
      calculate: (v) => {
        const wear = v.d1 - v.d0;
        const rate = wear / (v.hours / 1000);
        const maxWear = v.d0 * 0.01; // Genel kural: çapın %1'i
        const remainingLife = ((maxWear - wear) / rate) * 1000;
        return [
          { label: "Total Wear", value: `${wear.toFixed(2)} mm` },
          { label: "Wear Rate", value: `${rate.toFixed(3)} mm/1000 saat` },
          { label: "Estimated Remaining Life", value: `${remainingLife > 0 ? remainingLife.toFixed(0) : 0} saat` },
        ];
      },
    },
    {
      id: "oil-analysis-trend",
      name: "Oil Analysis Trend",
      group: "Oil Analysis",
      formula: "Fe ≤ 100 ppm (normal wear) ; TBN ≥ 20 mg KOH/g (typical)",
      variables: [
        { symbol: "Fe", label: "Demir konsantrasyonu", unit: "ppm" },
        { symbol: "Cu", label: "Copper concentration", unit: "ppm" },
        { symbol: "Sn", label: "Kalay konsantrasyonu", unit: "ppm" },
        { symbol: "TBN", label: "Total base number", unit: "mg KOH/g" },
      ],
      source: { code: "Oil analysis — metal particle and TBN trend monitoring", detail: "Fe > 150 ppm: abnormal wear; low TBN: reduced acid neutralisation" },
      inputs: [
        { key: "fe", label: "Demir (Fe)", unit: "ppm", placeholder: "45" },
        { key: "cu", label: "Copper (Cu)", unit: "ppm", placeholder: "12" },
        { key: "sn", label: "Kalay (Sn)", unit: "ppm", placeholder: "5" },
        { key: "tbn", label: "TBN", unit: "mg KOH/g", placeholder: "25" },
      ],
      calculate: (v) => {
        const feStatus = v.fe < 50 ? "Normal" : v.fe < 100 ? "Dikkat" : "Kritik";
        const tbnStatus = v.tbn > 20 ? "Normal" : v.tbn > 10 ? "Dikkat" : "Replace";
        return [
          { label: "Fe Durumu", value: `${v.fe} ppm → ${feStatus}` },
          { label: "Cu Durumu", value: `${v.cu} ppm → ${v.cu < 15 ? "Normal" : "Dikkat"}` },
          { label: "TBN Durumu", value: `${v.tbn} → ${tbnStatus}` },
        ];
      },
    },
  ],
};
