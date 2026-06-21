import { Ship } from "lucide-react";
import { HydrostaticCalculations } from "@/services/hydrostaticCalculations";
import type { CourseTopic } from "./types";

/**
 * Stabilite — tek kaynak ders içeriği.
 * Gerçek formüller (IMO IS Code / SOLAS / Grain Code) ve bunlara BAĞLI
 * hesaplayıcılar tek listede. Hesaplayıcılar, mümkün olduğunda mevcut
 * `HydrostaticCalculations` servis metotlarına delege eder; böylece formül
 * metni ile hesaplama birebir aynı matematiği kullanır.
 */
export const stability: CourseTopic = {
  key: "stability",
  title: "Stabilite",
  icon: Ship,
  accent: "from-blue-500 via-indigo-500 to-blue-600",
  group: "deck",
  intro:
    "Enine/boyuna denge, serbest yüzey etkisi ve IMO stabilite kriterleri. " +
    "Her formülün altında onu hesaplayan araç yer alır.",
  advancedTool: { label: "Gelişmiş Stabilite Araçları", href: "/stability/calculations" },
  entries: [
    {
      id: "gm",
      name: "Metasentrik Yükseklik (GM)",
      group: "Enine Denge",
      formula: "GM = KM − KG",
      variables: [
        { symbol: "KM", label: "Omurgadan metasentre yükseklik", unit: "m" },
        { symbol: "KG", label: "Omurgadan ağırlık merkezine yükseklik", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "MSC.267(85), Part A" },
      inputs: [
        { key: "km", label: "KM", unit: "m", placeholder: "8.5" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
      ],
      calculate: (v) => {
        const gm = v.km - v.kg;
        const durum = gm > 0.15 ? "Yeterli (≥0,15 m)" : gm > 0 ? "Düşük" : "NEGATİF — kararsız";
        return [
          { label: "GM", value: `${gm.toFixed(3)} m` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "gz-small",
      name: "Doğrultma Kolu (Küçük Açı)",
      group: "Enine Denge",
      formula: "GZ = GM · sin θ",
      variables: [
        { symbol: "GM", label: "Metasentrik yükseklik", unit: "m" },
        { symbol: "θ", label: "Meyil açısı (< ~15°)", unit: "°" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Küçük açı yaklaşımı" },
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "theta", label: "Meyil Açısı (θ)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const gz = v.gm * Math.sin((v.theta * Math.PI) / 180);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "gz-kn",
      name: "Doğrultma Kolu (KN Eğrileri)",
      group: "Enine Denge",
      formula: "GZ = KN − KG · sin θ",
      variables: [
        { symbol: "KN", label: "Çapraz eğri (cross curve) değeri", unit: "m" },
        { symbol: "KG", label: "Ağırlık merkezi yüksekliği", unit: "m" },
        { symbol: "θ", label: "Meyil açısı", unit: "°" },
      ],
      source: { code: "IMO IS Code 2008", detail: "MSC.267(85), 2.2" },
      inputs: [
        { key: "kn", label: "KN", unit: "m", placeholder: "3.2" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
        { key: "theta", label: "Meyil Açısı (θ)", unit: "°", placeholder: "30" },
      ],
      calculate: (v) => {
        const gz = HydrostaticCalculations.calculateGZFromKN(v.kn, v.kg, v.theta);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "gm-shift",
      name: "Ağırlık Kaydırma ile GM Değişimi",
      group: "Enine Denge",
      formula: "ΔGM = (w × d) / Δ",
      variables: [
        { symbol: "w", label: "Kaydırılan ağırlık", unit: "t" },
        { symbol: "d", label: "Düşey kayma mesafesi", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Ağırlık hareketi etkisi" },
      inputs: [
        { key: "w", label: "Ağırlık (w)", unit: "t", placeholder: "50" },
        { key: "d", label: "Kayma Mesafesi (d)", unit: "m", placeholder: "4" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dgm = HydrostaticCalculations.calculateGG1(v.w, v.d, v.disp);
        return [{ label: "ΔGM (GG₁)", value: `${dgm.toFixed(4)} m` }];
      },
    },
    {
      id: "list-shift",
      name: "Enine Kaydırmadan Meyil Açısı",
      group: "Enine Denge",
      formula: "tan θ = (w × y) / (Δ × GM)",
      variables: [
        { symbol: "w", label: "Kaydırılan ağırlık", unit: "t" },
        { symbol: "y", label: "Enine kayma mesafesi", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Metasentrik yükseklik", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Sabit ağırlık meyil bağıntısı" },
      inputs: [
        { key: "w", label: "Ağırlık (w)", unit: "t", placeholder: "80" },
        { key: "y", label: "Enine Mesafe (y)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const theta = HydrostaticCalculations.calculateListAngleFromShift(v.w, v.y, v.disp, v.gm);
        return [{ label: "Meyil Açısı (θ)", value: `${theta.toFixed(2)} °` }];
      },
    },
    {
      id: "crane-gm",
      name: "Bumba/Kreyn ile Düşey KG Değişimi",
      group: "Enine Denge",
      formula: "GG₁ = w × (h_cunda − h_yük) / Δ",
      variables: [
        { symbol: "w", label: "Kaldırılan yük", unit: "t" },
        { symbol: "h_cunda", label: "Matafora/cunda yüksekliği", unit: "m" },
        { symbol: "h_yük", label: "Yükün ilk yüksekliği", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Yük kaldırma etkisi (KG yükselmesi)" },
      inputs: [
        { key: "w", label: "Yük (w)", unit: "t", placeholder: "20" },
        { key: "hhook", label: "Cunda Yüksekliği", unit: "m", placeholder: "18" },
        { key: "hload", label: "Yük Yüksekliği", unit: "m", placeholder: "2" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const dkg = HydrostaticCalculations.calculateCraneDeltaKG(v.w, v.hhook, v.hload, v.disp);
        return [{ label: "GG₁ (KG artışı)", value: `${dkg.toFixed(4)} m` }];
      },
    },
    {
      id: "angle-of-loll",
      name: "Loll Açısı",
      group: "Enine Denge",
      formula: "φ_loll = arccos(KG / KM)",
      variables: [
        { symbol: "KG", label: "Ağırlık merkezi yüksekliği", unit: "m" },
        { symbol: "KM", label: "Metasenter yüksekliği", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Negatif/sıfıra yakın başlangıç GM" },
      note: "Sadece KG ≥ KM (negatif başlangıç GM) durumunda anlamlıdır.",
      inputs: [
        { key: "kg", label: "KG", unit: "m", placeholder: "8.6" },
        { key: "km", label: "KM", unit: "m", placeholder: "8.5" },
      ],
      calculate: (v) => {
        const loll = HydrostaticCalculations.calculateAngleOfLoll(v.kg, v.km);
        if (loll <= 0) return [{ label: "Sonuç", value: "Gemi kararlı (KG < KM), loll yok" }];
        return [{ label: "Loll Açısı", value: `${loll.toFixed(2)} °` }];
      },
    },
    {
      id: "trim-change",
      name: "Trim Değişimi",
      group: "Boyuna Denge",
      formula: "ΔTrim (cm) = Toplam Moment / MCT",
      variables: [
        { symbol: "Moment", label: "Trim oluşturan boyuna moment", unit: "t·m" },
        { symbol: "MCT", label: "1 cm trim için moment", unit: "t·m/cm" },
      ],
      source: { code: "Hidrostatik — trim hesabı" },
      inputs: [
        { key: "moment", label: "Trim Momenti", unit: "t·m", placeholder: "1500" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Hata", value: "MCT pozitif olmalı" }];
        const trimCm = v.moment / v.mct;
        return [
          { label: "Trim Değişimi", value: `${trimCm.toFixed(1)} cm` },
          { label: "Trim Değişimi", value: `${(trimCm / 100).toFixed(3)} m` },
        ];
      },
    },
    {
      id: "parallel-sinkage",
      name: "Paralel Batma/Çıkma",
      group: "Boyuna Denge",
      formula: "Batma (cm) = w / TPC",
      variables: [
        { symbol: "w", label: "Alınan/verilen ağırlık", unit: "t" },
        { symbol: "TPC", label: "1 cm için ton", unit: "t/cm" },
      ],
      source: { code: "Hidrostatik — TPC bağıntısı" },
      inputs: [
        { key: "w", label: "Ağırlık (w)", unit: "t", placeholder: "200" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.tpc <= 0) return [{ label: "Hata", value: "TPC pozitif olmalı" }];
        const cm = v.w / v.tpc;
        return [{ label: "Paralel Batma", value: `${cm.toFixed(1)} cm` }];
      },
    },
    {
      id: "dock-reaction",
      name: "Havuzlamada Tekne Tepki Kuvveti (P)",
      group: "Boyuna Denge",
      formula: "P = MCT × Trim(cm) / l",
      variables: [
        { symbol: "MCT", label: "1 cm trim momenti", unit: "t·m/cm" },
        { symbol: "Trim", label: "Başlangıç trimi", unit: "cm" },
        { symbol: "l", label: "LCF ile kıç bodoslama arası mesafe", unit: "m" },
      ],
      source: { code: "Hidrostatik — havuzlama (docking) analizi" },
      inputs: [
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
        { key: "trim", label: "Trim", unit: "cm", placeholder: "40" },
        { key: "l", label: "Mesafe (l)", unit: "m", placeholder: "60" },
      ],
      calculate: (v) => {
        const p = HydrostaticCalculations.calculateDockReactionP(v.mct, v.trim, v.l);
        return [{ label: "Tepki Kuvveti (P)", value: `${p.toFixed(1)} t` }];
      },
    },
    {
      id: "fsm",
      name: "Serbest Yüzey Etkisi (Dikdörtgen Tank)",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "FSM = (L × B³ / 12) × ρ ;  ΔGM = FSM / Δ",
      variables: [
        { symbol: "L", label: "Tank boyu", unit: "m" },
        { symbol: "B", label: "Tank eni", unit: "m" },
        { symbol: "ρ", label: "Sıvı yoğunluğu", unit: "t/m³" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Serbest yüzey düzeltmesi (FSC)" },
      inputs: [
        { key: "l", label: "Tank Boyu (L)", unit: "m", placeholder: "12" },
        { key: "b", label: "Tank Eni (B)", unit: "m", placeholder: "10" },
        { key: "rho", label: "Sıvı Yoğunluğu (ρ)", unit: "t/m³", placeholder: "1.0" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const fsm = HydrostaticCalculations.calculateFSMRectangularTank(v.l, v.b, v.rho);
        const dgm = HydrostaticCalculations.calculateDeltaKGFromFSM(fsm, v.disp);
        return [
          { label: "FSM", value: `${fsm.toFixed(1)} t·m` },
          { label: "GM Kaybı (ΔGM)", value: `${dgm.toFixed(4)} m` },
        ];
      },
    },
    {
      id: "displacement",
      name: "Deplasman",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "Δ = ρ × ∇",
      variables: [
        { symbol: "ρ", label: "Su yoğunluğu", unit: "t/m³" },
        { symbol: "∇", label: "Su altı hacim", unit: "m³" },
      ],
      source: { code: "Arşimet prensibi" },
      inputs: [
        { key: "rho", label: "Su Yoğunluğu (ρ)", unit: "t/m³", placeholder: "1.025" },
        { key: "vol", label: "Su Altı Hacim (∇)", unit: "m³", placeholder: "11700" },
      ],
      calculate: (v) => {
        const disp = v.rho * v.vol;
        return [{ label: "Deplasman (Δ)", value: `${disp.toFixed(0)} t` }];
      },
    },
    {
      id: "block-coeff",
      name: "Blok Katsayısı",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "C_b = ∇ / (L × B × T)",
      variables: [
        { symbol: "∇", label: "Su altı hacim", unit: "m³" },
        { symbol: "L", label: "Su hattı boyu", unit: "m" },
        { symbol: "B", label: "Genişlik", unit: "m" },
        { symbol: "T", label: "Draft", unit: "m" },
      ],
      source: { code: "Gemi formu — blok katsayısı tanımı" },
      inputs: [
        { key: "vol", label: "Hacim (∇)", unit: "m³", placeholder: "11700" },
        { key: "l", label: "Boy (L)", unit: "m", placeholder: "150" },
        { key: "b", label: "En (B)", unit: "m", placeholder: "22" },
        { key: "t", label: "Draft (T)", unit: "m", placeholder: "8" },
      ],
      calculate: (v) => {
        const denom = v.l * v.b * v.t;
        if (denom <= 0) return [{ label: "Hata", value: "L, B, T pozitif olmalı" }];
        const cb = v.vol / denom;
        return [{ label: "Blok Katsayısı (C_b)", value: cb.toFixed(3) }];
      },
    },
    {
      id: "fwa",
      name: "Tatlı Su Yüksekliği (FWA)",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "FWA (mm) = Δ / (4 × TPC)",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "TPC", label: "1 cm için ton (tuzlu su)", unit: "t/cm" },
      ],
      source: { code: "Load Line / hidrostatik — FWA" },
      note: "Sonuç mm cinsindedir (klasik FWA bağıntısı).",
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "tpc", label: "TPC", unit: "t/cm", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.tpc <= 0) return [{ label: "Hata", value: "TPC pozitif olmalı" }];
        const fwa = v.disp / (4 * v.tpc);
        return [{ label: "FWA", value: `${fwa.toFixed(1)} mm` }];
      },
    },
    {
      id: "roll-period",
      name: "Yalpa Periyodu",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "T = C × B / √GM",
      variables: [
        { symbol: "C", label: "Katsayı (Cb'ye bağlı, ≈0,7)" },
        { symbol: "B", label: "Genişlik", unit: "m" },
        { symbol: "GM", label: "Metasentrik yükseklik", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Hava kriteri — yalpa periyodu" },
      inputs: [
        { key: "cb", label: "Blok Katsayısı (C_b)", unit: "", placeholder: "0.7" },
        { key: "b", label: "Genişlik (B)", unit: "m", placeholder: "22" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
      ],
      calculate: (v) => {
        const t = HydrostaticCalculations.calculateRollPeriodSimplified(v.cb, v.b, v.gm);
        if (t <= 0) return [{ label: "Hata", value: "GM ve B pozitif olmalı" }];
        return [{ label: "Yalpa Periyodu (T)", value: `${t.toFixed(1)} s` }];
      },
    },
    {
      id: "mmm-draft",
      name: "MMM Draft (Draft Survey)",
      group: "Draft Survey",
      formula: "MMM = (dF + dA + 6 × dM) / 8",
      variables: [
        { symbol: "dF", label: "Baş draft", unit: "m" },
        { symbol: "dA", label: "Kıç draft", unit: "m" },
        { symbol: "dM", label: "Vasat draft", unit: "m" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Mean of means (quarter mean)" },
      inputs: [
        { key: "df", label: "Baş Draft (dF)", unit: "m", placeholder: "7.80" },
        { key: "da", label: "Kıç Draft (dA)", unit: "m", placeholder: "8.20" },
        { key: "dm", label: "Vasat Draft (dM)", unit: "m", placeholder: "8.00" },
      ],
      calculate: (v) => {
        const mmm = (v.df + v.da + 6 * v.dm) / 8;
        return [{ label: "MMM Draft", value: `${mmm.toFixed(3)} m` }];
      },
    },
    {
      id: "density-correction",
      name: "Yoğunluk Düzeltmesi",
      group: "Draft Survey",
      formula: "Δρ = ((ρ / 1.025) − 1) × Δ",
      variables: [
        { symbol: "ρ", label: "Liman suyu yoğunluğu", unit: "t/m³" },
        { symbol: "Δ", label: "Tuzlu su deplasmanı", unit: "t" },
      ],
      source: { code: "UN ECE Draft Survey Code", detail: "Yoğunluk düzeltmesi" },
      inputs: [
        { key: "rho", label: "Su Yoğunluğu (ρ)", unit: "t/m³", placeholder: "1.012" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        const corr = (v.rho / 1.025 - 1) * v.disp;
        return [{ label: "Yoğunluk Düzeltmesi (Δρ)", value: `${corr.toFixed(1)} t` }];
      },
    },
    {
      id: "grain-heel",
      name: "Tahıl Kümelenme Açısı",
      group: "SOLAS Kriterleri",
      formula: "θ = (57.3 × GHM) / (Δ × GM)",
      variables: [
        { symbol: "GHM", label: "Tahıl kayma momenti", unit: "t·m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GM", label: "Düzeltilmiş GM", unit: "m" },
      ],
      source: { code: "International Grain Code", detail: "SOLAS Bölüm VI" },
      note: "Yaklaşık kümelenme açısı; Kod limiti ≤ 12°.",
      inputs: [
        { key: "ghm", label: "Tahıl Kayma Momenti (GHM)", unit: "t·m", placeholder: "800" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gm", label: "GM", unit: "m", placeholder: "1.5" },
      ],
      calculate: (v) => {
        if (v.disp <= 0 || v.gm <= 0) return [{ label: "Hata", value: "Δ ve GM pozitif olmalı" }];
        const theta = (57.3 * v.ghm) / (v.disp * v.gm);
        const durum = theta <= 12 ? "Uygun (≤12°)" : "Limit aşıldı (>12°)";
        return [
          { label: "Kümelenme Açısı (θ)", value: `${theta.toFixed(2)} °` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "simpson-area",
      name: "Simpson Kuralı ile Alan",
      group: "SOLAS Kriterleri",
      formula: "A = (h/3) · (y₀ + 4y₁ + 2y₂ + … + yₙ)",
      variables: [
        { symbol: "h", label: "Ordinatlar arası eşit aralık" },
        { symbol: "yᵢ", label: "Ordinat değerleri (örn. GZ)" },
      ],
      source: { code: "Sayısal integrasyon (GZ eğrisi altı alan)" },
      note: "Simpson 1. kuralı, 5 eşit aralıklı ordinat (y₀…y₄) ile: A = (h/3)·(y₀ + 4y₁ + 2y₂ + 4y₃ + y₄).",
      inputs: [
        { key: "h", label: "Aralık (h)", unit: "", placeholder: "0.2" },
        { key: "y0", label: "Ordinat y₀", unit: "", placeholder: "0" },
        { key: "y1", label: "Ordinat y₁", unit: "", placeholder: "0.15" },
        { key: "y2", label: "Ordinat y₂", unit: "", placeholder: "0.28" },
        { key: "y3", label: "Ordinat y₃", unit: "", placeholder: "0.33" },
        { key: "y4", label: "Ordinat y₄", unit: "", placeholder: "0.30" },
      ],
      calculate: (v) => {
        if (v.h <= 0) return [{ label: "Hata", value: "Aralık (h) pozitif olmalı" }];
        const area = (v.h / 3) * (v.y0 + 4 * v.y1 + 2 * v.y2 + 4 * v.y3 + v.y4);
        return [{ label: "Alan (A)", value: area.toFixed(4) }];
      },
    },
  ],
};
