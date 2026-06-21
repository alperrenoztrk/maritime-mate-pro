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
      note: "Kuvvet kN, alan mm² girilir; sonuç MPa (N/mm²) olarak verilir.",
      inputs: [
        { key: "f", label: "Kuvvet (F)", unit: "kN", placeholder: "150" },
        { key: "a", label: "Kesit Alanı (A)", unit: "mm²", placeholder: "1200" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Hata", value: "Alan pozitif olmalı" }];
        const sigma = (v.f * 1000) / v.a;
        return [{ label: "Gerilme (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
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
      note: "Kuvvet kN, alan mm² girilir; sonuç MPa (N/mm²) olarak verilir.",
      inputs: [
        { key: "f", label: "Kayma Kuvveti (F)", unit: "kN", placeholder: "80" },
        { key: "a", label: "Kayma Alanı (A)", unit: "mm²", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.a <= 0) return [{ label: "Hata", value: "Alan pozitif olmalı" }];
        const tau = (v.f * 1000) / v.a;
        return [{ label: "Kayma Gerilmesi (τ)", value: `${tau.toFixed(1)} MPa` }];
      },
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
      note: "Moment N·m, y mm, atalet momenti mm⁴ girilir; sonuç MPa olarak verilir.",
      inputs: [
        { key: "m", label: "Eğilme Momenti (M)", unit: "N·m", placeholder: "5000" },
        { key: "y", label: "Nötr Eksenden Uzaklık (y)", unit: "mm", placeholder: "50" },
        { key: "i", label: "Atalet Momenti (I)", unit: "mm⁴", placeholder: "2000000" },
      ],
      calculate: (v) => {
        if (v.i <= 0) return [{ label: "Hata", value: "Atalet momenti pozitif olmalı" }];
        const sigma = (v.m * 1000 * v.y) / v.i;
        return [{ label: "Eğilme Gerilmesi (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
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
      note: "Tork N·m, yarıçap mm, polar atalet momenti mm⁴ girilir; sonuç MPa olarak verilir.",
      inputs: [
        { key: "t", label: "Tork (T)", unit: "N·m", placeholder: "8000" },
        { key: "r", label: "Yarıçap (r)", unit: "mm", placeholder: "40" },
        { key: "j", label: "Polar Atalet Momenti (J)", unit: "mm⁴", placeholder: "4000000" },
      ],
      calculate: (v) => {
        if (v.j <= 0) return [{ label: "Hata", value: "Polar atalet momenti pozitif olmalı" }];
        const tau = (v.t * 1000 * v.r) / v.j;
        return [{ label: "Burulma Gerilmesi (τ)", value: `${tau.toFixed(1)} MPa` }];
      },
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
      note: "Statik sehim mm girilir, hesapta m'ye çevrilir (g = 9,81 m/s²). Sonuç rpm olarak verilir.",
      inputs: [
        { key: "delta", label: "Statik Sehim (δst)", unit: "mm", placeholder: "0.5" },
      ],
      calculate: (v) => {
        const deltaM = v.delta / 1000;
        if (deltaM <= 0) return [{ label: "Hata", value: "Sehim pozitif olmalı" }];
        const ncr = (60 / (2 * Math.PI)) * Math.sqrt(9.81 / deltaM);
        return [{ label: "Kritik Devir (ncr)", value: `${ncr.toFixed(0)} rpm` }];
      },
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
    {
      id: "youngs-modulus",
      name: "Hooke Yasası / Elastisite Modülü",
      group: "Mukavemet ve Gerilme",
      formula: "σ = E·ε    →    E = σ / ε ,  ε = ΔL / L₀",
      variables: [
        { symbol: "σ", label: "Gerilme", unit: "MPa" },
        { symbol: "E", label: "Elastisite (Young) modülü", unit: "MPa" },
        { symbol: "ε", label: "Birim şekil değişimi (uzama)" },
        { symbol: "ΔL", label: "Boy uzaması", unit: "mm" },
        { symbol: "L₀", label: "İlk boy", unit: "mm" },
      ],
      source: { code: "Mukavemet — Hooke yasası (elastik bölge)" },
      note: "Elastik bölgede geçerlidir. Çelik için E ≈ 210000 MPa. Birim şekil değişimi ε = ΔL/L₀ boyutsuzdur.",
      inputs: [
        { key: "sigma", label: "Gerilme (σ)", unit: "MPa", placeholder: "150" },
        { key: "dl", label: "Boy Uzaması (ΔL)", unit: "mm", placeholder: "1.5" },
        { key: "l0", label: "İlk Boy (L₀)", unit: "mm", placeholder: "2000" },
      ],
      calculate: (v) => {
        if (v.l0 <= 0) return [{ label: "Hata", value: "İlk boy pozitif olmalı" }];
        const eps = v.dl / v.l0;
        if (eps === 0) return [{ label: "Hata", value: "Uzama sıfır olamaz" }];
        const e = v.sigma / eps;
        return [
          { label: "Birim Şekil Değişimi (ε)", value: `${eps.toExponential(3)}` },
          { label: "Elastisite Modülü (E)", value: `${(e / 1000).toFixed(0)} GPa` },
        ];
      },
    },
    {
      id: "lewis-gear-stress",
      name: "Lewis Dişli Eğilme Gerilmesi",
      group: "Mil ve Yatak",
      formula: "σ = Ft / (b·m·Y)",
      variables: [
        { symbol: "σ", label: "Diş dibi eğilme gerilmesi", unit: "MPa" },
        { symbol: "Ft", label: "Teğetsel (çevresel) kuvvet", unit: "N" },
        { symbol: "b", label: "Diş genişliği", unit: "mm" },
        { symbol: "m", label: "Modül", unit: "mm" },
        { symbol: "Y", label: "Lewis form faktörü" },
      ],
      source: { code: "Dişli mukavemeti — Lewis eğilme denklemi" },
      note: "Y, diş sayısına bağlı form faktörüdür (tipik 0,3–0,45). Ft = 2T/d ile bulunabilir.",
      inputs: [
        { key: "ft", label: "Teğetsel Kuvvet (Ft)", unit: "N", placeholder: "3000" },
        { key: "b", label: "Diş Genişliği (b)", unit: "mm", placeholder: "40" },
        { key: "m", label: "Modül (m)", unit: "mm", placeholder: "4" },
        { key: "y", label: "Lewis Faktörü (Y)", unit: "", placeholder: "0.38" },
      ],
      calculate: (v) => {
        if (v.b <= 0 || v.m <= 0 || v.y <= 0) return [{ label: "Hata", value: "b, m, Y pozitif olmalı" }];
        const sigma = v.ft / (v.b * v.m * v.y);
        return [{ label: "Eğilme Gerilmesi (σ)", value: `${sigma.toFixed(1)} MPa` }];
      },
    },
  ],
};
