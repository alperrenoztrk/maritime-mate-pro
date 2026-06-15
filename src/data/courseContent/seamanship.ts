import { Anchor } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Gemicilik — tek kaynak ders içeriği.
 * Formüller mevcut SeamanshipFormulas sayfasındaki gerçek ifadelerden alınmış,
 * hesaplayıcılar bu ifadeleri birebir uygular.
 */
export const seamanship: CourseTopic = {
  key: "seamanship",
  title: "Gemicilik",
  icon: Anchor,
  accent: "from-emerald-500 via-teal-500 to-blue-500",
  group: "deck",
  intro:
    "Palamar yükü, rüzgâr kuvveti, zincir katenary, demir tutma gücü ve " +
    "römorkör hesapları. Her formülün altında onu hesaplayan araç yer alır.",
  advancedTool: { label: "Gelişmiş Gemicilik Araçları", href: "/seamanship/calculations" },
  entries: [
    {
      id: "working-load",
      name: "Çalışma Yükü (SWL)",
      group: "Palamar ve Halat",
      formula: "SWL (kN) = Kırılma Yükü / (Güvenlik Katsayısı × 1000)",
      variables: [
        { symbol: "Kırılma Yükü", label: "Halat/donanım kırılma yükü (MBL)", unit: "N" },
        { symbol: "Güvenlik Kat.", label: "Güvenlik katsayısı" },
      ],
      source: { code: "Halat/donanım güvenli çalışma yükü: SWL = MBL / SF" },
      note: "SWL = Kırılma Yükü (MBL) / Güvenlik Katsayısı. Girdi N, sonuç kN (÷1000).",
      inputs: [
        { key: "mbl", label: "Kırılma Yükü (MBL)", unit: "N", placeholder: "300000" },
        { key: "sf", label: "Güvenlik Katsayısı", unit: "", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.sf <= 0) return [{ label: "Hata", value: "Güvenlik katsayısı pozitif olmalı" }];
        return [{ label: "Güvenli Çalışma Yükü (SWL)", value: `${(v.mbl / (v.sf * 1000)).toFixed(2)} kN` }];
      },
    },
    {
      id: "wind-force",
      name: "Rüzgâr Kuvveti",
      group: "Rüzgâr ve Akıntı",
      formula: "F = 0.613 × Cd × A × V²",
      variables: [
        { symbol: "Cd", label: "Sürükleme katsayısı" },
        { symbol: "A", label: "Rüzgâra maruz alan", unit: "m²" },
        { symbol: "V", label: "Rüzgâr hızı", unit: "m/s" },
      ],
      source: { code: "Rüzgâr basıncı / sürükleme kuvveti bağıntısı" },
      note: "Sonuç Newton (N) cinsindedir; 0,613 = ½·ρ_hava (≈1,226 kg/m³).",
      inputs: [
        { key: "cd", label: "Cd", unit: "", placeholder: "1.0" },
        { key: "a", label: "Alan (A)", unit: "m²", placeholder: "500" },
        { key: "v", label: "Rüzgâr Hızı (V)", unit: "m/s", placeholder: "20" },
      ],
      calculate: (v) => [{ label: "Kuvvet (F)", value: `${(0.613 * v.cd * v.a * v.v * v.v).toFixed(0)} N` }],
    },
    {
      id: "catenary-tension",
      name: "Zincir Katenary Gerilimi",
      group: "Demirleme",
      formula: "T = W × sinh(s / a)",
      variables: [
        { symbol: "W", label: "Birim boy ağırlığı parametresi", unit: "kN" },
        { symbol: "s", label: "Yatay açıklık parametresi", unit: "m" },
        { symbol: "a", label: "Katenary parametresi", unit: "m" },
      ],
      source: { code: "Katenary (zincir eğrisi) denklemi" },
      inputs: [
        { key: "w", label: "W", unit: "kN", placeholder: "50" },
        { key: "s", label: "s", unit: "m", placeholder: "60" },
        { key: "a", label: "a", unit: "m", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.a === 0) return [{ label: "Hata", value: "a sıfır olamaz" }];
        return [{ label: "Gerilim (T)", value: `${(v.w * Math.sinh(v.s / v.a)).toFixed(2)} kN` }];
      },
    },
    {
      id: "anchor-holding",
      name: "Demir Tutma Gücü",
      group: "Demirleme",
      formula: "Holding Power = Demir Ağırlığı × Tutma Katsayısı",
      variables: [
        { symbol: "Demir Ağırlığı", label: "Demir ağırlığı", unit: "t" },
        { symbol: "Tutma Kat.", label: "Tutma katsayısı (zemine göre)" },
      ],
      source: { code: "Demir tutma gücü (holding power) bağıntısı" },
      inputs: [
        { key: "weight", label: "Demir Ağırlığı", unit: "t", placeholder: "5" },
        { key: "coeff", label: "Tutma Katsayısı", unit: "", placeholder: "4" },
      ],
      calculate: (v) => [{ label: "Tutma Gücü", value: `${(v.weight * v.coeff).toFixed(2)} t` }],
    },
    {
      id: "scope",
      name: "Kaloma Oranı (Scope)",
      group: "Demirleme",
      formula: "Scope = Zincir Uzunluğu / Su Derinliği",
      variables: [
        { symbol: "Zincir", label: "Verilen zincir uzunluğu", unit: "m" },
        { symbol: "Derinlik", label: "Su derinliği", unit: "m" },
      ],
      source: { code: "Demirleme kaloma oranı (genellikle 5–7)" },
      inputs: [
        { key: "chain", label: "Zincir Uzunluğu", unit: "m", placeholder: "150" },
        { key: "depth", label: "Su Derinliği", unit: "m", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.depth <= 0) return [{ label: "Hata", value: "Derinlik pozitif olmalı" }];
        const scope = v.chain / v.depth;
        return [
          { label: "Scope", value: `${scope.toFixed(1)} : 1` },
          { label: "Değerlendirme", value: scope >= 5 ? "Yeterli" : "Yetersiz (<5)" },
        ];
      },
    },
    {
      id: "bollard-pull",
      name: "Gerekli Bollard Pull (Römorkör)",
      group: "Römorkaj",
      formula: "Gerekli BP = (Δ × V²) / K",
      variables: [
        { symbol: "Δ", label: "Gemi deplasmanı", unit: "t" },
        { symbol: "V", label: "Hız", unit: "kn" },
        { symbol: "K", label: "Ampirik katsayı" },
      ],
      source: { code: "Römorkör bollard pull tahmini (ampirik)" },
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "50000" },
        { key: "v", label: "Hız (V)", unit: "kn", placeholder: "2" },
        { key: "k", label: "Katsayı (K)", unit: "", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.k === 0) return [{ label: "Hata", value: "K sıfır olamaz" }];
        return [{ label: "Gerekli BP", value: `${((v.disp * v.v * v.v) / v.k).toFixed(1)} t` }];
      },
    },
  ],
};
