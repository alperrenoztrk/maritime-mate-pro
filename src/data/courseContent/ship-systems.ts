import { Wrench } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Gemi Makine Sistemleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const shipSystems: CourseTopic = {
  key: "ship-systems",
  title: "Gemi Makine Sistemleri",
  icon: Wrench,
  accent: "from-blue-600 via-indigo-600 to-violet-600",
  group: "machine",
  intro:
    "Yakıt, yağlama, soğutma sistemleri ile dümen, pervane ve hidrolik hesapları. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "fuel-consumption",
      name: "Yakıt Tüketimi",
      group: "Yakıt Sistemi",
      formula: "FC = SFOC × BHP × t / 10⁶",
      variables: [
        { symbol: "SFOC", label: "Özgül yakıt tüketimi", unit: "g/kW·h" },
        { symbol: "BHP", label: "Fren gücü", unit: "kW" },
        { symbol: "t", label: "Süre", unit: "saat" },
        { symbol: "FC", label: "Toplam tüketim", unit: "ton" },
      ],
      source: { code: "Yakıt yönetimi — seyir tüketim balansı" },
      note: "Sonuç g cinsinden çıkar, /10⁶ ile tona çevrilir.",
      inputs: [
        { key: "sfoc", label: "SFOC", unit: "g/kW·h", placeholder: "175" },
        { key: "bhp", label: "BHP", unit: "kW", placeholder: "15000" },
        { key: "t", label: "Süre", unit: "saat", placeholder: "240" },
      ],
      calculate: (v) => {
        const fc = (v.sfoc * v.bhp * v.t) / 1e6;
        return [{ label: "Toplam Yakıt", value: `${fc.toFixed(1)} ton` }];
      },
    },
    {
      id: "walther-viscosity",
      name: "Viskozite-Sıcaklık (Walther)",
      group: "Yakıt Sistemi",
      formula: "log(log(ν + 0,7)) = A − B·log(T)",
      variables: [
        { symbol: "ν", label: "Kinematik viskozite", unit: "cSt" },
        { symbol: "T", label: "Mutlak sıcaklık", unit: "K" },
        { symbol: "A", label: "Walther sabiti" },
        { symbol: "B", label: "Walther eğim sabiti" },
      ],
      source: { code: "Walther denklemi (ASTM D341) — viskozite-sıcaklık bağıntısı" },
      note: "Sıcaklıklar °C girilir, hesapta K'ye (T + 273,15) çevrilir.",
      inputs: [
        { key: "v1", label: "Viskozite @T₁", unit: "cSt", placeholder: "380" },
        { key: "t1", label: "Sıcaklık T₁", unit: "°C", placeholder: "50" },
        { key: "v2", label: "Viskozite @T₂", unit: "cSt", placeholder: "15" },
        { key: "t2", label: "Sıcaklık T₂", unit: "°C", placeholder: "130" },
        { key: "tx", label: "Hedef Sıcaklık T_x", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        // Walther equation: log(log(ν+0.7)) = A - B × log(T+273.15)
        const w1 = Math.log10(Math.log10(v.v1 + 0.7));
        const w2 = Math.log10(Math.log10(v.v2 + 0.7));
        const lt1 = Math.log10(v.t1 + 273.15);
        const lt2 = Math.log10(v.t2 + 273.15);
        const B = (w1 - w2) / (lt2 - lt1);
        const A = w1 + B * lt1;
        const ltx = Math.log10(v.tx + 273.15);
        const wx = A - B * ltx;
        const vx = Math.pow(10, Math.pow(10, wx)) - 0.7;
        return [{ label: `Viskozite @${v.tx}°C`, value: `${vx.toFixed(1)} cSt` }];
      },
    },
    {
      id: "lube-oil-flow",
      name: "Yağ Debisi",
      group: "Yağlama Sistemi",
      formula: "Q = (BHP × SLOC) / (ρ × 10³)",
      variables: [
        { symbol: "BHP", label: "Fren gücü", unit: "kW" },
        { symbol: "SLOC", label: "Özgül yağ tüketimi", unit: "g/kW·h" },
        { symbol: "ρ", label: "Yağ yoğunluğu", unit: "kg/m³" },
      ],
      source: { code: "Yağlama sistemi — yağ tüketim debisi bağıntısı" },
      note: "BHP × SLOC = g/saat; yoğunluğa bölünerek hacimsel debi (L/saat, m³/saat) bulunur.",
      inputs: [
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "15000" },
        { key: "sloc", label: "Özgül Yağ Tüketimi (SLOC)", unit: "g/kW·h", placeholder: "0.8" },
        { key: "rho", label: "Yağ Yoğunluğu (ρ)", unit: "kg/m³", placeholder: "900" },
      ],
      calculate: (v) => {
        if (v.rho <= 0) return [{ label: "Hata", value: "Yoğunluk pozitif olmalı" }];
        const m3h = (v.bhp * v.sloc) / (v.rho * 1000);
        return [
          { label: "Yağ Debisi", value: `${(m3h * 1000).toFixed(1)} L/saat` },
          { label: "Yağ Debisi", value: `${m3h.toFixed(3)} m³/saat` },
        ];
      },
    },
    {
      id: "oil-film-thickness",
      name: "Yağ Film Kalınlığı",
      group: "Yağlama Sistemi",
      formula: "S = (μ·n / P)·(r/c)²",
      variables: [
        { symbol: "μ", label: "Yağ viskozitesi", unit: "Pa·s" },
        { symbol: "n", label: "Devir", unit: "rps" },
        { symbol: "P", label: "Birim yük", unit: "MPa" },
        { symbol: "c", label: "Yatak boşluğu", unit: "mm" },
        { symbol: "r", label: "Mil yarıçapı", unit: "mm" },
      ],
      source: { code: "Hidrodinamik yağlama — Sommerfeld sayısı ve minimum film kalınlığı" },
      note: "Birim yük MPa girilir, hesapta Pa'ya (×10⁶) çevrilir; film kalınlığı µm verilir.",
      inputs: [
        { key: "mu", label: "Yağ Viskozitesi (μ)", unit: "Pa·s", placeholder: "0.05" },
        { key: "n", label: "Devir (n)", unit: "rps", placeholder: "5" },
        { key: "p", label: "Birim Yük (P)", unit: "MPa", placeholder: "3" },
        { key: "c", label: "Yatak Boşluğu (c)", unit: "mm", placeholder: "0.1" },
        { key: "r", label: "Mil Yarıçapı (r)", unit: "mm", placeholder: "100" },
      ],
      calculate: (v) => {
        // Sommerfeld number: S = (μ × n / P) × (r/c)²
        const S = (v.mu * v.n / (v.p * 1e6)) * Math.pow((v.r / v.c), 2);
        const hMin = v.c * (1 - 1 / (1 + 2 * S)); // Approximate
        return [
          { label: "Sommerfeld Sayısı (S)", value: S.toFixed(3) },
          { label: "Min. Film Kalınlığı", value: `${(hMin * 1000).toFixed(1)} µm` },
        ];
      },
    },
    {
      id: "heat-rejection",
      name: "Isı Atım Miktarı",
      group: "Soğutma Sistemi",
      formula: "Q̇ = ṁ·cp·ΔT",
      variables: [
        { symbol: "ṁ", label: "Kütle debisi", unit: "kg/s" },
        { symbol: "cp", label: "Özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
      ],
      source: { code: "Soğutma sistemi — duyulur ısı atım balansı" },
      note: "Kütle debisi kg/s girilir; atılan ısı Q̇ = ṁ·cp·ΔT (kW) hesaplanır.",
      inputs: [
        { key: "mdot", label: "Kütle Debisi (ṁ)", unit: "kg/s", placeholder: "30" },
        { key: "cp", label: "Özgül Isı (cp)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "K", placeholder: "8" },
      ],
      calculate: (v) => {
        const q = v.mdot * v.cp * v.dt;
        return [{ label: "Atılan Isı (Q̇)", value: `${q.toFixed(1)} kW` }];
      },
    },
    {
      id: "cooling-water-flow",
      name: "Soğutma Suyu Debisi",
      group: "Soğutma Sistemi",
      formula: "ṁ = Q̇ / (cp × ΔT)",
      variables: [
        { symbol: "Q̇", label: "Atılan ısı", unit: "kW" },
        { symbol: "cp", label: "Özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık farkı (HT 5–8°C, LT 10–15°C)", unit: "K" },
      ],
      source: { code: "Soğutma sistemi — soğutma suyu debisi (ısı balansından)" },
      note: "Isı yükü kW girilir; gerekli debi ṁ = Q̇/(cp·ΔT) (kg/s). Su için ≈ m³/saat = kg/s × 3,6.",
      inputs: [
        { key: "q", label: "Atılan Isı (Q̇)", unit: "kW", placeholder: "1000" },
        { key: "cp", label: "Özgül Isı (cp)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "K", placeholder: "8" },
      ],
      calculate: (v) => {
        const denom = v.cp * v.dt;
        if (denom <= 0) return [{ label: "Hata", value: "cp ve ΔT pozitif olmalı" }];
        const mdot = v.q / denom;
        return [
          { label: "Kütle Debisi (ṁ)", value: `${mdot.toFixed(2)} kg/s` },
          { label: "Hacimsel Debi (su)", value: `${(mdot * 3.6).toFixed(1)} m³/saat` },
        ];
      },
    },
    {
      id: "rudder-torque",
      name: "Dümen Torku (Joessel)",
      group: "Dümen ve Sevk",
      formula: "F = 577 × A × V² × sin(α)",
      variables: [
        { symbol: "A", label: "Dümen alanı", unit: "m²" },
        { symbol: "V", label: "Gemi hızı", unit: "m/s" },
        { symbol: "α", label: "Dümen açısı", unit: "°" },
      ],
      source: { code: "Joessel formülü — dümen kuvveti ve torku" },
      note: "Hız knot girilir, m/s'ye (×0,5144) çevrilir; tork ≈ F × 0,35 × √A.",
      inputs: [
        { key: "a", label: "Dümen Alanı (A)", unit: "m²", placeholder: "12" },
        { key: "v", label: "Gemi Hızı (V)", unit: "knot", placeholder: "15" },
        { key: "alpha", label: "Dümen Açısı (α)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const vMs = v.v * 0.5144;
        const alphaRad = v.alpha * Math.PI / 180;
        // Joessel: F = 577 × A × V² × sin(α) (N)
        const force = 577 * v.a * vMs * vMs * Math.sin(alphaRad);
        // Tork = F × d (d ≈ 0.35 × kord uzunluğu, tahmini olarak alan/yükseklik)
        const torque = force * 0.35 * Math.sqrt(v.a);
        return [
          { label: "Dümen Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
          { label: "Dümen Torku", value: `${(torque / 1000).toFixed(1)} kN·m` },
        ];
      },
    },
    {
      id: "propeller-thrust",
      name: "Pervane İtme Kuvveti",
      group: "Dümen ve Sevk",
      formula: "T = KT × ρ × n² × D⁴",
      variables: [
        { symbol: "KT", label: "İtme katsayısı" },
        { symbol: "ρ", label: "Deniz suyu yoğunluğu", unit: "kg/m³" },
        { symbol: "n", label: "Devir", unit: "rps" },
        { symbol: "D", label: "Pervane çapı", unit: "m" },
      ],
      source: { code: "Pervane teorisi — boyutsuz itme katsayısı (K_T) bağıntısı" },
      inputs: [
        { key: "rho", label: "Deniz Suyu Yoğunluğu", unit: "kg/m³", placeholder: "1025" },
        { key: "d", label: "Pervane Çapı", unit: "m", placeholder: "6" },
        { key: "n", label: "Devir", unit: "rps", placeholder: "2" },
        { key: "kt", label: "İtme Katsayısı (K_T)", unit: "", placeholder: "0.18" },
      ],
      calculate: (v) => {
        // T = K_T × ρ × n² × D⁴
        const thrust = v.kt * v.rho * v.n * v.n * Math.pow(v.d, 4);
        return [{ label: "İtme Kuvveti (T)", value: `${(thrust / 1000).toFixed(1)} kN` }];
      },
    },
    {
      id: "hydraulic-cylinder-force",
      name: "Hidrolik Silindir Kuvveti",
      group: "Hidrolik Sistem",
      formula: "F = P × A = P × π·D²/4",
      variables: [
        { symbol: "P", label: "Basınç", unit: "bar" },
        { symbol: "D", label: "Piston çapı", unit: "mm" },
        { symbol: "A", label: "Piston alanı", unit: "m²" },
      ],
      source: { code: "Hidrolik — Pascal ilkesi (basınç × alan = kuvvet)" },
      note: "Basınç bar girilir, hesapta 10⁵ Pa'ya çevrilir; çap mm girilir.",
      inputs: [
        { key: "p", label: "Basınç", unit: "bar", placeholder: "200" },
        { key: "d", label: "Piston Çapı", unit: "mm", placeholder: "150" },
      ],
      calculate: (v) => {
        const areaM2 = Math.PI * Math.pow(v.d / 1000, 2) / 4;
        const force = v.p * 1e5 * areaM2;
        return [
          { label: "Piston Alanı", value: `${(areaM2 * 1e4).toFixed(2)} cm²` },
          { label: "Silindir Kuvveti", value: `${(force / 1000).toFixed(1)} kN` },
        ];
      },
    },
  ],
};
