import { Radio } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Denizde Haberleşme — tek kaynak ders içeriği.
 * GMDSS/telsiz için gerçek RF/ITU bağıntıları; her formül bağlı hesaplayıcıyla.
 */
export const communication: CourseTopic = {
  key: "communication",
  title: "Denizde Haberleşme",
  icon: Radio,
  accent: "from-cyan-500 via-blue-500 to-indigo-500",
  group: "deck",
  intro:
    "Dalga boyu, telsiz ufku, kazanç (dB), serbest uzay yol kaybı ve Doppler. " +
    "Each formula is followed by the tool that calculates it.",
  entries: [
    {
      id: "wavelength",
      name: "Dalga Boyu",
      group: "Dalga Temelleri",
      formula: "λ = c / f",
      variables: [
        { symbol: "c", label: "Işık hızı", unit: "3×10⁸ m/s" },
        { symbol: "f", label: "Frekans", unit: "Hz" },
      ],
      source: { code: "Elektromanyetik dalga bağıntısı" },
      note: "Frekans MHz girilir; hesapta Hz'e çevrilir (×10⁶).",
      inputs: [{ key: "f", label: "Frekans (f)", unit: "MHz", placeholder: "156.8" }],
      calculate: (v) => {
        if (v.f <= 0) return [{ label: "Hata", value: "Frekans pozitif olmalı" }];
        const lambda = 3e8 / (v.f * 1e6);
        return [{ label: "Dalga Boyu (λ)", value: `${lambda.toFixed(3)} m` }];
      },
    },
    {
      id: "period-frequency",
      name: "Periyot–Frekans",
      group: "Dalga Temelleri",
      formula: "T = 1 / f",
      variables: [
        { symbol: "T", label: "Periyot", unit: "s" },
        { symbol: "f", label: "Frekans", unit: "Hz" },
      ],
      source: { code: "Periyot-frekans tanımı" },
      note: "Frekans MHz girilir; sonuç mikrosaniye (µs).",
      inputs: [{ key: "f", label: "Frekans (f)", unit: "MHz", placeholder: "2.182" }],
      calculate: (v) => {
        if (v.f <= 0) return [{ label: "Hata", value: "Frekans pozitif olmalı" }];
        const tUs = 1 / (v.f * 1e6) * 1e6;
        return [{ label: "Periyot (T)", value: `${tUs.toFixed(4)} µs` }];
      },
    },
    {
      id: "radio-horizon",
      name: "Telsiz Ufku (VHF Menzili)",
      group: "Kapsama ve Menzil",
      formula: "d (NM) ≈ 2.23 × (√htx + √hrx)",
      variables: [
        { symbol: "htx", label: "Verici anten yüksekliği", unit: "m" },
        { symbol: "hrx", label: "Alıcı anten yüksekliği", unit: "m" },
      ],
      source: { code: "Telsiz ufku (radio horizon) yaklaşımı" },
      note: "Optik ufkun ~%15 fazlası; sonuç deniz mili (NM). h metre girilir.",
      inputs: [
        { key: "htx", label: "Verici Yüksekliği", unit: "m", placeholder: "15" },
        { key: "hrx", label: "Alıcı Yüksekliği", unit: "m", placeholder: "9" },
      ],
      calculate: (v) => {
        if (v.htx < 0 || v.hrx < 0) return [{ label: "Hata", value: "The height cannot be negative" }];
        const d = 2.23 * (Math.sqrt(v.htx) + Math.sqrt(v.hrx));
        return [{ label: "Menzil (d)", value: `${d.toFixed(1)} NM` }];
      },
    },
    {
      id: "decibel-gain",
      name: "Kazanç / Zayıflama (dB)",
      group: "Sinyal Seviyesi",
      formula: "G (dB) = 10 · log₁₀(Pçıkış / Pgiriş)",
      variables: [
        { symbol: "Pçıkış", label: "Çıkış gücü", unit: "W" },
        { symbol: "Pgiriş", label: "Giriş gücü", unit: "W" },
      ],
      source: { code: "Desibel (güç oranı) tanımı" },
      inputs: [
        { key: "pout", label: "Çıkış Gücü", unit: "W", placeholder: "25" },
        { key: "pin", label: "Giriş Gücü", unit: "W", placeholder: "1" },
      ],
      calculate: (v) => {
        if (v.pin <= 0 || v.pout <= 0) return [{ label: "Hata", value: "Güçler pozitif olmalı" }];
        const db = 10 * Math.log10(v.pout / v.pin);
        return [{ label: "Kazanç", value: `${db.toFixed(2)} dB` }];
      },
    },
    {
      id: "fspl",
      name: "Serbest Uzay Yol Kaybı (FSPL)",
      group: "Sinyal Seviyesi",
      formula: "FSPL (dB) = 20·log₁₀(d) + 20·log₁₀(f) + 32.44",
      variables: [
        { symbol: "d", label: "Mesafe", unit: "km" },
        { symbol: "f", label: "Frekans", unit: "MHz" },
      ],
      source: { code: "Friis — serbest uzay yol kaybı (d: km, f: MHz)" },
      inputs: [
        { key: "d", label: "Mesafe (d)", unit: "km", placeholder: "30" },
        { key: "f", label: "Frekans (f)", unit: "MHz", placeholder: "156.8" },
      ],
      calculate: (v) => {
        if (v.d <= 0 || v.f <= 0) return [{ label: "Hata", value: "d ve f pozitif olmalı" }];
        const fspl = 20 * Math.log10(v.d) + 20 * Math.log10(v.f) + 32.44;
        return [{ label: "FSPL", value: `${fspl.toFixed(2)} dB` }];
      },
    },
    {
      id: "eirp",
      name: "EIRP (Etkin Yayılan Güç)",
      group: "Sinyal Seviyesi",
      formula: "EIRP (dBW) = Pverici + Ganten − Lkayıp",
      variables: [
        { symbol: "Pverici", label: "Verici gücü", unit: "dBW" },
        { symbol: "Ganten", label: "Anten kazancı", unit: "dBi" },
        { symbol: "Lkayıp", label: "Hat/konnektör kaybı", unit: "dB" },
      ],
      source: { code: "EIRP tanımı (anten link bütçesi)" },
      inputs: [
        { key: "ptx", label: "Verici Gücü", unit: "dBW", placeholder: "14" },
        { key: "g", label: "Anten Kazancı", unit: "dBi", placeholder: "6" },
        { key: "l", label: "Loss", unit: "dB", placeholder: "2" },
      ],
      calculate: (v) => [{ label: "EIRP", value: `${(v.ptx + v.g - v.l).toFixed(2)} dBW` }],
    },
    {
      id: "doppler-shift",
      name: "Doppler Kayması",
      group: "Dalga Temelleri",
      formula: "Δf = (v / c) × f",
      variables: [
        { symbol: "v", label: "Bağıl hız", unit: "m/s" },
        { symbol: "c", label: "Işık hızı", unit: "3×10⁸ m/s" },
        { symbol: "f", label: "Taşıyıcı frekans", unit: "Hz" },
      ],
      source: { code: "Doppler etkisi (radyo dalgaları)" },
      note: "Frekans MHz girilir; sonuç Hz.",
      inputs: [
        { key: "v", label: "Bağıl Hız (v)", unit: "m/s", placeholder: "10" },
        { key: "f", label: "Frekans (f)", unit: "MHz", placeholder: "9400" },
      ],
      calculate: (v) => {
        const df = (v.v / 3e8) * (v.f * 1e6);
        return [{ label: "Doppler Kayması (Δf)", value: `${df.toFixed(2)} Hz` }];
      },
    },
  ],
};
