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
    // ---- Konu anlatımından eklenen hesaplayıcılar ----
    {
      id: "km",
      name: "Metasentr Yüksekliği (KM)",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "KM = KB + BM",
      variables: [
        { symbol: "KB", label: "Omurgadan sephiye merkezine yükseklik", unit: "m" },
        { symbol: "BM", label: "Metasentr yarıçapı (BM = I/∇)", unit: "m" },
      ],
      source: { code: "Gemi hidrostatiği — metasentr yüksekliği" },
      inputs: [
        { key: "kb", label: "KB", unit: "m", placeholder: "4.3" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.2" },
      ],
      calculate: (v) => {
        const km = v.kb + v.bm;
        return [{ label: "KM", value: `${km.toFixed(3)} m` }];
      },
    },
    {
      id: "tpc",
      name: "Santimetre Başına Ton (TPC)",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "TPC = A_wp × ρ / 100",
      variables: [
        { symbol: "A_wp", label: "Su hattı düzlemi alanı", unit: "m²" },
        { symbol: "ρ", label: "Su yoğunluğu", unit: "t/m³" },
      ],
      source: { code: "Gemi hidrostatiği — TPC tanımı" },
      note: "1 cm draft değişimi için gereken ton miktarı.",
      inputs: [
        { key: "awp", label: "Su Hattı Alanı (A_wp)", unit: "m²", placeholder: "2400" },
        { key: "rho", label: "Su Yoğunluğu (ρ)", unit: "t/m³", placeholder: "1.025" },
      ],
      calculate: (v) => {
        const tpc = (v.awp * v.rho) / 100;
        return [{ label: "TPC", value: `${tpc.toFixed(2)} t/cm` }];
      },
    },
    {
      id: "dwa",
      name: "Dok Suyu Payı (DWA)",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "DWA = FWA × (1025 − ρ) / 25",
      variables: [
        { symbol: "FWA", label: "Tatlı su payı", unit: "mm" },
        { symbol: "ρ", label: "Liman/dok suyu yoğunluğu", unit: "kg/m³" },
      ],
      source: { code: "Load Line — dok suyu düzeltmesi" },
      note: "ρ kg/m³ girilir (1000–1025). Sonuç mm cinsindedir.",
      inputs: [
        { key: "fwa", label: "FWA", unit: "mm", placeholder: "200" },
        { key: "rho", label: "Dok Suyu Yoğunluğu (ρ)", unit: "kg/m³", placeholder: "1012" },
      ],
      calculate: (v) => {
        const dwa = (v.fwa * (1025 - v.rho)) / 25;
        return [{ label: "DWA", value: `${dwa.toFixed(1)} mm` }];
      },
    },
    {
      id: "volume-displacement",
      name: "Hacimsel Deplasman ve Sephiye Kuvveti",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "∇ = Δ / ρ ;  Y = ρ × g × ∇",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "ρ", label: "Su yoğunluğu", unit: "t/m³" },
        { symbol: "g", label: "Yer çekimi ivmesi", unit: "9.81 m/s²" },
      ],
      source: { code: "Arşimet prensibi" },
      note: "Sephiye kuvveti kN cinsinden verilir (Y = ρ·g·∇, g = 9.81 m/s²).",
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "rho", label: "Su Yoğunluğu (ρ)", unit: "t/m³", placeholder: "1.025" },
      ],
      calculate: (v) => {
        if (v.rho <= 0) return [{ label: "Hata", value: "Yoğunluk pozitif olmalı" }];
        const vol = v.disp / v.rho;
        const buoyancy = v.rho * 9.81 * vol; // t·m/s² = kN
        return [
          { label: "Su Altı Hacim (∇)", value: `${vol.toFixed(1)} m³` },
          { label: "Sephiye Kuvveti (Y)", value: `${buoyancy.toFixed(0)} kN` },
        ];
      },
    },
    {
      id: "fresh-water-disp",
      name: "Tatlı Suda Deplasman",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "Δ_tatlı = Δ_deniz × (ρ_deniz / ρ_tatlı)",
      variables: [
        { symbol: "Δ_deniz", label: "Deniz suyu deplasmanı", unit: "t" },
        { symbol: "ρ_deniz", label: "Deniz suyu yoğunluğu", unit: "t/m³" },
        { symbol: "ρ_tatlı", label: "Tatlı su yoğunluğu", unit: "t/m³" },
      ],
      source: { code: "Gemi hidrostatiği — yoğunluk dönüşümü" },
      inputs: [
        { key: "disp", label: "Deniz Suyu Deplasmanı", unit: "t", placeholder: "12000" },
        { key: "rhosea", label: "Deniz Suyu Yoğunluğu", unit: "t/m³", placeholder: "1.025" },
        { key: "rhofresh", label: "Tatlı Su Yoğunluğu", unit: "t/m³", placeholder: "1.000" },
      ],
      calculate: (v) => {
        if (v.rhofresh <= 0) return [{ label: "Hata", value: "Tatlı su yoğunluğu pozitif olmalı" }];
        const disp = v.disp * (v.rhosea / v.rhofresh);
        return [{ label: "Tatlı Su Deplasmanı", value: `${disp.toFixed(0)} t` }];
      },
    },
    {
      id: "righting-moment",
      name: "Doğrultma Momenti",
      group: "Enine Denge",
      formula: "M_R = Δ × GZ",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GZ", label: "Doğrultma kolu", unit: "m" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Doğrultma momenti" },
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gz", label: "Doğrultma Kolu (GZ)", unit: "m", placeholder: "0.35" },
      ],
      calculate: (v) => {
        const mr = v.disp * v.gz;
        return [{ label: "Doğrultma Momenti (M_R)", value: `${mr.toFixed(0)} t·m` }];
      },
    },
    {
      id: "wall-sided-gz",
      name: "Geniş Açı GZ (Wall-sided Formülü)",
      group: "Enine Denge",
      formula: "GZ = sin θ × (GM + ½ × BM × tan²θ)",
      variables: [
        { symbol: "GM", label: "Metasentrik yükseklik", unit: "m" },
        { symbol: "BM", label: "Metasentr yarıçapı", unit: "m" },
        { symbol: "θ", label: "Meyil açısı", unit: "°" },
      ],
      source: { code: "Gemi stabilitesi — wall-sided formülü" },
      note: "Düşey kenarlı (wall-sided) gövde varsayımı; orta açılarda küçük açı yaklaşımını genişletir.",
      inputs: [
        { key: "gm", label: "GM", unit: "m", placeholder: "1.2" },
        { key: "bm", label: "BM", unit: "m", placeholder: "4.2" },
        { key: "theta", label: "Meyil Açısı (θ)", unit: "°", placeholder: "20" },
      ],
      calculate: (v) => {
        const r = (v.theta * Math.PI) / 180;
        const gz = Math.sin(r) * (v.gm + 0.5 * v.bm * Math.tan(r) ** 2);
        return [{ label: "GZ", value: `${gz.toFixed(3)} m` }];
      },
    },
    {
      id: "new-kg-loading",
      name: "Yükleme Sonrası Yeni KG",
      group: "Enine Denge",
      formula: "KG₁ = (Δ₀ × KG₀ + w × kg) / (Δ₀ + w)",
      variables: [
        { symbol: "Δ₀", label: "Başlangıç deplasmanı", unit: "t" },
        { symbol: "KG₀", label: "Başlangıç KG", unit: "m" },
        { symbol: "w", label: "Alınan ağırlık (− verilen)", unit: "t" },
        { symbol: "kg", label: "Ağırlığın KG'si", unit: "m" },
      ],
      source: { code: "Gemi stabilitesi — moment yöntemi (KG)" },
      note: "Ağırlık tahliyesi için w negatif girilir.",
      inputs: [
        { key: "disp0", label: "Başlangıç Deplasmanı (Δ₀)", unit: "t", placeholder: "10000" },
        { key: "kg0", label: "Başlangıç KG (KG₀)", unit: "m", placeholder: "7.2" },
        { key: "w", label: "Ağırlık (w)", unit: "t", placeholder: "500" },
        { key: "kg", label: "Ağırlığın KG'si (kg)", unit: "m", placeholder: "2.0" },
      ],
      calculate: (v) => {
        const newDisp = v.disp0 + v.w;
        if (newDisp <= 0) return [{ label: "Hata", value: "Yeni deplasman pozitif olmalı" }];
        const newKg = (v.disp0 * v.kg0 + v.w * v.kg) / newDisp;
        return [
          { label: "Yeni Deplasman (Δ₁)", value: `${newDisp.toFixed(0)} t` },
          { label: "Yeni KG (KG₁)", value: `${newKg.toFixed(3)} m` },
        ];
      },
    },
    {
      id: "gml",
      name: "Boyuna Metasentrik Yükseklik (GML)",
      group: "Boyuna Denge",
      formula: "GML = KML − KG",
      variables: [
        { symbol: "KML", label: "Omurgadan boyuna metasentre yükseklik", unit: "m" },
        { symbol: "KG", label: "Ağırlık merkezi yüksekliği", unit: "m" },
      ],
      source: { code: "Gemi hidrostatiği — boyuna metasentr" },
      inputs: [
        { key: "kml", label: "KML", unit: "m", placeholder: "180" },
        { key: "kg", label: "KG", unit: "m", placeholder: "7.2" },
      ],
      calculate: (v) => {
        const gml = v.kml - v.kg;
        return [{ label: "GML", value: `${gml.toFixed(2)} m` }];
      },
    },
    {
      id: "bml",
      name: "Boyuna Metasentr Yarıçapı (BML)",
      group: "Boyuna Denge",
      formula: "BML = I_L / ∇",
      variables: [
        { symbol: "I_L", label: "Su hattı alanının boyuna atalet momenti", unit: "m⁴" },
        { symbol: "∇", label: "Su altı hacim", unit: "m³" },
      ],
      source: { code: "Gemi hidrostatiği — boyuna metasentr yarıçapı" },
      inputs: [
        { key: "il", label: "Boyuna Atalet Momenti (I_L)", unit: "m⁴", placeholder: "2100000" },
        { key: "vol", label: "Su Altı Hacim (∇)", unit: "m³", placeholder: "11700" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Hata", value: "Hacim pozitif olmalı" }];
        const bml = v.il / v.vol;
        return [{ label: "BML", value: `${bml.toFixed(2)} m` }];
      },
    },
    {
      id: "mct",
      name: "1 cm Trim Momenti (MCT1cm)",
      group: "Boyuna Denge",
      formula: "MCT1cm = (Δ × GML) / (100 × L)",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "GML", label: "Boyuna metasentrik yükseklik", unit: "m" },
        { symbol: "L", label: "Tekne boyu (LBP)", unit: "m" },
      ],
      source: { code: "Gemi hidrostatiği — MCT1cm" },
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "gml", label: "GML", unit: "m", placeholder: "172" },
        { key: "l", label: "Tekne Boyu (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Hata", value: "Boy pozitif olmalı" }];
        const mct = (v.disp * v.gml) / (100 * v.l);
        return [{ label: "MCT1cm", value: `${mct.toFixed(1)} t·m/cm` }];
      },
    },
    {
      id: "trim-from-lcg",
      name: "LCG/LCB'den Trim",
      group: "Boyuna Denge",
      formula: "Trimming moment = Δ × (LCG − LCB) ;  Trim = Moment / MCT1cm",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "LCG", label: "Boyuna ağırlık merkezi (kıçtan)", unit: "m" },
        { symbol: "LCB", label: "Boyuna sephiye merkezi (kıçtan)", unit: "m" },
        { symbol: "MCT", label: "1 cm trim momenti", unit: "t·m/cm" },
      ],
      source: { code: "Gemi hidrostatiği — trim hesabı" },
      note: "Pozitif sonuç başa trim, negatif sonuç kıça trim anlamındadır.",
      inputs: [
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
        { key: "lcg", label: "LCG", unit: "m", placeholder: "75.5" },
        { key: "lcb", label: "LCB", unit: "m", placeholder: "75.0" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
      ],
      calculate: (v) => {
        if (v.mct <= 0) return [{ label: "Hata", value: "MCT pozitif olmalı" }];
        const moment = v.disp * (v.lcg - v.lcb);
        const trimCm = moment / v.mct;
        return [
          { label: "Trim Momenti", value: `${moment.toFixed(0)} t·m` },
          { label: "Trim", value: `${trimCm.toFixed(1)} cm (${(trimCm / 100).toFixed(3)} m)` },
        ];
      },
    },
    {
      id: "trim-distribution",
      name: "Trim Dağılımı (Baş/Kıç Draft Değişimi)",
      group: "Boyuna Denge",
      formula: "ΔT_F = ΔTrim × d_a/L ;  ΔT_A = ΔTrim × d_f/L",
      variables: [
        { symbol: "ΔTrim", label: "Toplam trim değişimi", unit: "cm" },
        { symbol: "d_f", label: "LCF'nin baş perpendikülerine uzaklığı", unit: "m" },
        { symbol: "d_a", label: "LCF'nin kıç perpendikülerine uzaklığı", unit: "m" },
        { symbol: "L", label: "Tekne boyu (LBP)", unit: "m" },
      ],
      source: { code: "Gemi hidrostatiği — trim dağılımı (LCF)" },
      note: "Trim değişimi LCF etrafında baş/kıç draftlara dağıtılır.",
      inputs: [
        { key: "dtrim", label: "Trim Değişimi (ΔTrim)", unit: "cm", placeholder: "30" },
        { key: "df", label: "LCF–Baş Mesafesi (d_f)", unit: "m", placeholder: "72" },
        { key: "da", label: "LCF–Kıç Mesafesi (d_a)", unit: "m", placeholder: "78" },
        { key: "l", label: "Tekne Boyu (L)", unit: "m", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Hata", value: "Boy pozitif olmalı" }];
        const dtf = (v.dtrim * v.da) / v.l;
        const dta = (v.dtrim * v.df) / v.l;
        return [
          { label: "Baş Draft Değişimi (ΔT_F)", value: `${dtf.toFixed(2)} cm` },
          { label: "Kıç Draft Değişimi (ΔT_A)", value: `${dta.toFixed(2)} cm` },
        ];
      },
    },
    {
      id: "weight-for-trim",
      name: "İstenen Trim için Ağırlık",
      group: "Boyuna Denge",
      formula: "w = (ΔTrim × MCT1cm) / d",
      variables: [
        { symbol: "ΔTrim", label: "İstenen trim değişimi", unit: "cm" },
        { symbol: "MCT", label: "1 cm trim momenti", unit: "t·m/cm" },
        { symbol: "d", label: "Ağırlığın LCF'ye boyuna uzaklığı", unit: "m" },
      ],
      source: { code: "Gemi hidrostatiği — trim için ağırlık kaydırma" },
      inputs: [
        { key: "dtrim", label: "İstenen Trim (ΔTrim)", unit: "cm", placeholder: "20" },
        { key: "mct", label: "MCT (1 cm)", unit: "t·m/cm", placeholder: "120" },
        { key: "d", label: "Mesafe (d)", unit: "m", placeholder: "40" },
      ],
      calculate: (v) => {
        if (v.d <= 0) return [{ label: "Hata", value: "Mesafe pozitif olmalı" }];
        const w = (v.dtrim * v.mct) / v.d;
        return [{ label: "Kaydırılacak/Alınacak Ağırlık (w)", value: `${w.toFixed(1)} t` }];
      },
    },
    {
      id: "gm-from-roll",
      name: "Yalpa Periyodundan GM",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "GM ≈ (C × B / T)²",
      variables: [
        { symbol: "C", label: "Katsayı (≈0,7–0,8)" },
        { symbol: "B", label: "Genişlik", unit: "m" },
        { symbol: "T", label: "Yalpa periyodu", unit: "s" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Yalpa periyodu bağıntısının tersi" },
      note: "Gözlenen yalpa periyodundan yaklaşık GM kestirimi (yalpa testi).",
      inputs: [
        { key: "c", label: "Katsayı (C)", unit: "", placeholder: "0.7" },
        { key: "b", label: "Genişlik (B)", unit: "m", placeholder: "22" },
        { key: "t", label: "Yalpa Periyodu (T)", unit: "s", placeholder: "14" },
      ],
      calculate: (v) => {
        if (v.t <= 0) return [{ label: "Hata", value: "Periyot pozitif olmalı" }];
        const gm = ((v.c * v.b) / v.t) ** 2;
        return [{ label: "Yaklaşık GM", value: `${gm.toFixed(3)} m` }];
      },
    },
    {
      id: "log-decrement",
      name: "Logaritmik Azalım ve Sönüm Oranı",
      group: "Serbest Yüzey ve Hidrostatik",
      formula: "δ = ln(θ₁ / θ₂) ;  ζ ≈ δ / (2π)",
      variables: [
        { symbol: "θ₁", label: "Ardışık ilk yalpa genliği", unit: "°" },
        { symbol: "θ₂", label: "Bir sonraki yalpa genliği", unit: "°" },
      ],
      source: { code: "Yalpa sönümü — logaritmik azalım" },
      inputs: [
        { key: "a1", label: "İlk Genlik (θ₁)", unit: "°", placeholder: "12" },
        { key: "a2", label: "Sonraki Genlik (θ₂)", unit: "°", placeholder: "9" },
      ],
      calculate: (v) => {
        if (v.a1 <= 0 || v.a2 <= 0) return [{ label: "Hata", value: "Genlikler pozitif olmalı" }];
        const delta = Math.log(v.a1 / v.a2);
        const zeta = delta / (2 * Math.PI);
        return [
          { label: "Logaritmik Azalım (δ)", value: delta.toFixed(4) },
          { label: "Sönüm Oranı (ζ)", value: zeta.toFixed(4) },
        ];
      },
    },
    {
      id: "weather-criterion",
      name: "Hava Kriteri Rüzgâr Meyil Kolları",
      group: "SOLAS Kriterleri",
      formula: "lw1 = (P × A × Z) / (1000 × g × Δ) ;  lw2 = 1.5 × lw1",
      variables: [
        { symbol: "P", label: "Rüzgâr basıncı (≈504 Pa)", unit: "Pa" },
        { symbol: "A", label: "Yanal rüzgâr alanı", unit: "m²" },
        { symbol: "Z", label: "Alan ağırlık merkezi ile ½ draft arası düşey mesafe", unit: "m" },
        { symbol: "Δ", label: "Deplasman", unit: "t" },
        { symbol: "g", label: "Yer çekimi ivmesi", unit: "9.81 m/s²" },
      ],
      source: { code: "IMO IS Code 2008", detail: "Hava kriteri (weather criterion), 2.3" },
      note: "lw1 sabit rüzgâr meyil kolu, lw2 ani rüzgâr (gust) meyil koludur.",
      inputs: [
        { key: "p", label: "Rüzgâr Basıncı (P)", unit: "Pa", placeholder: "504" },
        { key: "a", label: "Yanal Alan (A)", unit: "m²", placeholder: "1200" },
        { key: "z", label: "Düşey Mesafe (Z)", unit: "m", placeholder: "6" },
        { key: "disp", label: "Deplasman (Δ)", unit: "t", placeholder: "12000" },
      ],
      calculate: (v) => {
        if (v.disp <= 0) return [{ label: "Hata", value: "Deplasman pozitif olmalı" }];
        const lw1 = (v.p * v.a * v.z) / (1000 * 9.81 * v.disp);
        const lw2 = 1.5 * lw1;
        return [
          { label: "Sabit Rüzgâr Kolu (lw1)", value: `${lw1.toFixed(4)} m` },
          { label: "Ani Rüzgâr Kolu (lw2)", value: `${lw2.toFixed(4)} m` },
        ];
      },
    },
    {
      id: "flooding-rate",
      name: "Yaralı Bölmeye Su Dolma Hızı ve Süresi",
      group: "SOLAS Kriterleri",
      formula: "Q = A × C × √(2gh) ;  t = V / Q",
      variables: [
        { symbol: "A", label: "Delik/açıklık alanı", unit: "m²" },
        { symbol: "C", label: "Debi katsayısı (≈0,6)" },
        { symbol: "h", label: "Su yükü (basınç başı)", unit: "m" },
        { symbol: "V", label: "Dolacak hacim", unit: "m³" },
        { symbol: "g", label: "Yer çekimi ivmesi", unit: "9.81 m/s²" },
      ],
      source: { code: "Hasar stabilitesi — Torricelli akış bağıntısı" },
      inputs: [
        { key: "a", label: "Açıklık Alanı (A)", unit: "m²", placeholder: "0.5" },
        { key: "c", label: "Debi Katsayısı (C)", unit: "", placeholder: "0.6" },
        { key: "h", label: "Su Yükü (h)", unit: "m", placeholder: "4" },
        { key: "vol", label: "Dolacak Hacim (V)", unit: "m³", placeholder: "300" },
      ],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Hata", value: "Su yükü negatif olamaz" }];
        const q = v.a * v.c * Math.sqrt(2 * 9.81 * v.h);
        if (q <= 0) return [{ label: "Hata", value: "Akış debisi sıfır" }];
        const t = v.vol / q;
        return [
          { label: "Dolma Debisi (Q)", value: `${q.toFixed(3)} m³/s` },
          { label: "Dolma Süresi (t)", value: `${t.toFixed(0)} s (${(t / 60).toFixed(1)} dk)` },
        ];
      },
    },
  ],
};
