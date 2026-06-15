import { Cog } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Makine Elemanları ve Malzeme Bilgisi — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const machineElements: CourseTopic = {
  key: "machine-elements",
  title: "Makine Elemanları ve Malzeme Bilgisi",
  icon: Cog,
  accent: "from-zinc-500 via-slate-500 to-gray-600",
  group: "machine",
  intro:
    "Mukavemet, gerilme analizi, mil-yatak hesapları ve malzeme bilgisi. " +
    "Her formül, ilgili büyüklüğü standart mukavemet bağıntılarıyla tanımlar.",
  entries: [
    {
      id: "tensile-stress",
      name: "Çekme/Basma Gerilmesi",
      group: "Mukavemet ve Gerilme",
      formula: "σ = F / A",
      variables: [
        { symbol: "F", label: "Kuvvet", unit: "N" },
        { symbol: "A", label: "Kesit alanı", unit: "m²" },
      ],
      source: { code: "Mukavemet — normal (çekme/basma) gerilmesi tanımı" },
    },
    {
      id: "shear-stress",
      name: "Kayma Gerilmesi",
      group: "Mukavemet ve Gerilme",
      formula: "τ = F / A",
      variables: [
        { symbol: "F", label: "Kayma kuvveti", unit: "N" },
        { symbol: "A", label: "Kayma alanı", unit: "m²" },
      ],
      source: { code: "Mukavemet — kayma gerilmesi tanımı" },
    },
    {
      id: "bending-stress",
      name: "Eğilme Gerilmesi",
      group: "Mukavemet ve Gerilme",
      formula: "σ = M·y / I",
      variables: [
        { symbol: "M", label: "Eğilme momenti", unit: "N·m" },
        { symbol: "y", label: "Nötr eksenden uzaklık", unit: "m" },
        { symbol: "I", label: "Atalet momenti", unit: "m⁴" },
      ],
      source: { code: "Mukavemet — eğilme (flexure) formülü" },
    },
    {
      id: "torsional-stress",
      name: "Burulma Gerilmesi",
      group: "Mukavemet ve Gerilme",
      formula: "τ = T·r / J",
      variables: [
        { symbol: "T", label: "Tork", unit: "N·m" },
        { symbol: "r", label: "Yarıçap", unit: "m" },
        { symbol: "J", label: "Polar atalet momenti", unit: "m⁴" },
      ],
      source: { code: "Mukavemet — burulma (torsiyon) formülü" },
    },
    {
      id: "shaft-diameter-torsion",
      name: "Mil Çapı (Burulma)",
      group: "Mil ve Yatak",
      formula: "d = ∛(16T / π·τizin)",
      variables: [
        { symbol: "T", label: "Tork", unit: "N·m" },
        { symbol: "τizin", label: "İzin verilen kayma gerilmesi", unit: "Pa" },
      ],
      source: { code: "Mil tasarımı — dolu dairesel mil burulma boyutlandırması" },
      note: "İzin verilen gerilme MPa girilir, hesapta Pa'ya çevrilir; sonuç mm olarak verilir.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "50000" },
        { key: "tau", label: "İzin Verilen τ", unit: "MPa", placeholder: "60" },
      ],
      calculate: (v) => {
        // τ = 16T / (πd³) → d = ∛(16T / πτ)
        const d = Math.pow((16 * v.t) / (Math.PI * v.tau * 1e6), 1 / 3) * 1000;
        return [{ label: "Minimum Çap", value: `${d.toFixed(1)} mm` }];
      },
    },
    {
      id: "critical-speed",
      name: "Kritik Devir",
      group: "Mil ve Yatak",
      formula: "ncr = (60/2π)·√(g/δst)",
      variables: [
        { symbol: "δst", label: "Statik sehim", unit: "m" },
        { symbol: "g", label: "Yerçekimi", unit: "m/s²" },
      ],
      source: { code: "Rotor dinamiği — kritik devir (Dunkerley/Rayleigh yaklaşımı)" },
    },
    {
      id: "bearing-life-l10",
      name: "Yatak Ömrü (L₁₀)",
      group: "Mil ve Yatak",
      formula: "L₁₀ = (C/P)^p × 10⁶ devir",
      variables: [
        { symbol: "C", label: "Dinamik yük kapasitesi", unit: "N" },
        { symbol: "P", label: "Eşdeğer yük", unit: "N" },
        { symbol: "p", label: "Üs (bilyalı=3, makaralı=10/3)" },
        { symbol: "n", label: "Devir", unit: "rpm" },
      ],
      source: { code: "Rulman ömrü — temel dinamik yük denklemi (ISO 281)" },
      note: "C ve P kN girilebilir (oran boyutsuz olduğundan etkilemez); saat ömrü için devir (rpm) kullanılır.",
      inputs: [
        { key: "c", label: "Dinamik Yük Kapasitesi (C)", unit: "kN", placeholder: "120" },
        { key: "p", label: "Eşdeğer Yük (P)", unit: "kN", placeholder: "30" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "1500" },
        { key: "type", label: "Tip (3=bilyalı, 10/3=makaralı)", unit: "", placeholder: "3" },
      ],
      calculate: (v) => {
        const l10Rev = Math.pow(v.c / v.p, v.type) * 1e6;
        const l10Hours = l10Rev / (v.n * 60);
        return [
          { label: "L₁₀ (devir)", value: `${(l10Rev / 1e6).toFixed(1)} × 10⁶` },
          { label: "L₁₀ (saat)", value: `${l10Hours.toFixed(0)} saat` },
        ];
      },
    },
    {
      id: "gear-ratio",
      name: "Dişli Çark Hız Oranı",
      group: "Mil ve Yatak",
      formula: "i = Z₂/Z₁ = n₁/n₂",
      variables: [
        { symbol: "Z₁", label: "Tahrik diş sayısı" },
        { symbol: "Z₂", label: "Çıkış diş sayısı" },
        { symbol: "n₁", label: "Tahrik devri", unit: "rpm" },
        { symbol: "n₂", label: "Çıkış devri", unit: "rpm" },
        { symbol: "T₁", label: "Tahrik torku", unit: "N·m" },
      ],
      source: { code: "Dişli kinematiği — çevrim oranı ve tork aktarımı" },
      note: "Çıkış torku ~%3 dişli kaybıyla (×0,97) hesaplanır.",
      inputs: [
        { key: "z1", label: "Tahrik Diş Sayısı (Z₁)", unit: "", placeholder: "20" },
        { key: "z2", label: "Çıkış Diş Sayısı (Z₂)", unit: "", placeholder: "60" },
        { key: "n1", label: "Tahrik Devri (n₁)", unit: "rpm", placeholder: "1500" },
        { key: "t1", label: "Tahrik Torku (T₁)", unit: "N·m", placeholder: "100" },
      ],
      calculate: (v) => {
        const ratio = v.z2 / v.z1;
        const n2 = v.n1 / ratio;
        const t2 = v.t1 * ratio * 0.97; // ~%3 kayıp
        return [
          { label: "Dişli Oranı (i)", value: `${ratio.toFixed(2)}:1` },
          { label: "Çıkış Devri (n₂)", value: `${n2.toFixed(0)} rpm` },
          { label: "Çıkış Torku (T₂)", value: `${t2.toFixed(1)} N·m` },
        ];
      },
    },
    {
      id: "weld-stress",
      name: "Kaynak Dikişi Gerilmesi",
      group: "Mil ve Yatak",
      formula: "σ = F / (L·a)",
      variables: [
        { symbol: "F", label: "Uygulanan kuvvet", unit: "N" },
        { symbol: "L", label: "Kaynak uzunluğu", unit: "mm" },
        { symbol: "a", label: "Kaynak (boğaz) kalınlığı", unit: "mm" },
      ],
      source: { code: "Kaynak bağlantısı mukavemeti — dikiş gerilmesi kontrolü" },
      note: "Kuvvet kN girilir, hesapta N'ye çevrilir; sonuç MPa (N/mm²) olarak verilir.",
      inputs: [
        { key: "f", label: "Uygulanan Kuvvet (F)", unit: "kN", placeholder: "200" },
        { key: "l", label: "Kaynak Uzunluğu (L)", unit: "mm", placeholder: "200" },
        { key: "a", label: "Kaynak Kalınlığı (a)", unit: "mm", placeholder: "6" },
      ],
      calculate: (v) => {
        const area = v.l * v.a; // mm²
        const stress = (v.f * 1000) / area; // N/mm² = MPa
        const status = stress < 100 ? "Uygun" : stress < 160 ? "Dikkat" : "Aşırı";
        return [
          { label: "Kaynak Gerilmesi", value: `${stress.toFixed(1)} MPa` },
          { label: "Durum", value: status },
        ];
      },
    },
  ],
};
