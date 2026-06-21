import { Shield } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Denizde Güvenlik — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi. Buradaki formüller ve
 * hesaplamalar mevcut Emniyet Formülleri ve Güvenlik Hesaplamaları sayfalarındaki
 * GERÇEK formüllerden birebir alınmıştır (yangın söndürme, can kurtarma vb.).
 * `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const safety: CourseTopic = {
  key: "safety",
  title: "Denizde Güvenlik",
  icon: Shield,
  accent: "from-rose-500 via-orange-500 to-amber-500",
  group: "deck",
  intro:
    "Yangın söndürme (köpük, CO₂, su sisi), can kurtarma araçları, kaçış ve risk " +
    "değerlendirmesi. Her formülün altında onu kullanan hesaplayıcı yer alır.",
  advancedTool: { label: "Gelişmiş Güvenlik Araçları", href: "/safety" },
  entries: [
    {
      id: "foam-solution",
      name: "Köpük Çözeltisi Miktarı",
      group: "Yangın Söndürme",
      formula: "Q = Uygulama Hızı × Alan × Süre",
      variables: [
        { symbol: "Q", label: "Gerekli köpük miktarı", unit: "L" },
        { symbol: "Uygulama Hızı", label: "6,5 L/m²/dk (makine dairesi), 4,0 L/m²/dk (güverte)", unit: "L/m²/dk" },
        { symbol: "Alan", label: "Korunan alan", unit: "m²" },
        { symbol: "Süre", label: "Uygulama süresi", unit: "dk" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Minimum uygulama süreleri" },
      note: "Sonuç ayrıca m³ olarak verilir (1000 L = 1 m³).",
      inputs: [
        { key: "rate", label: "Uygulama Hızı", unit: "L/m²/dk", placeholder: "6.5" },
        { key: "area", label: "Korunan Alan", unit: "m²", placeholder: "500" },
        { key: "time", label: "Uygulama Süresi", unit: "dk", placeholder: "15" },
      ],
      calculate: (v) => {
        const liters = v.rate * v.area * v.time;
        return [
          { label: "Gerekli Köpük", value: `${liters.toFixed(0)} L` },
          { label: "Gerekli Köpük", value: `${(liters / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Miktarı (Korunan Hacim)",
      group: "Yangın Söndürme",
      formula: "M = V × f × 1.5",
      variables: [
        { symbol: "M", label: "Gerekli CO₂ miktarı", unit: "kg" },
        { symbol: "V", label: "Korunan hacim", unit: "m³" },
        { symbol: "f", label: "Doldurma faktörü (makine dairesi 0,40)" },
        { symbol: "1.5", label: "CO₂ yoğunluk katsayısı (≈ 1/0,56 m³/kg)", unit: "kg/m³" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Sabit CO₂ söndürme sistemi" },
      note: "SOLAS: serbest CO₂ gazı hacmi ≥ korunan hacmin %40'ı. 1,5 kg/m³ ≈ 1/0,56 m³/kg özgül hacim.",
      inputs: [
        { key: "vol", label: "Korunan Hacim (V)", unit: "m³", placeholder: "2000" },
        { key: "factor", label: "Doldurma Faktörü (f)", unit: "", placeholder: "0.40" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Hata", value: "Hacim pozitif olmalı" }];
        const m = v.vol * v.factor * 1.5;
        return [{ label: "Gerekli CO₂ (M)", value: `${m.toFixed(1)} kg` }];
      },
    },
    {
      id: "water-mist-flow",
      name: "Su Sisi Nozul Debisi",
      group: "Yangın Söndürme",
      formula: "Q = K × √P",
      variables: [
        { symbol: "Q", label: "Debi", unit: "L/dk" },
        { symbol: "K", label: "Nozul faktörü (üretici kataloğu)" },
        { symbol: "P", label: "Basınç", unit: "bar" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Su sisi / sprinkler nozul" },
      note: "K değeri nozul tipine göre üretici kataloglarından alınır.",
      inputs: [
        { key: "k", label: "Nozul Katsayısı (K)", unit: "", placeholder: "0.07" },
        { key: "p", label: "Basınç (P)", unit: "bar", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.p < 0) return [{ label: "Hata", value: "Basınç negatif olamaz" }];
        const q = v.k * Math.sqrt(v.p);
        return [{ label: "Nozul Debisi (Q)", value: `${q.toFixed(3)} L/dk` }];
      },
    },
    {
      id: "fire-water-capacity",
      name: "Yangın Suyu Kapasitesi",
      group: "Yangın Söndürme",
      formula: "Kapasite = Q × t × n",
      variables: [
        { symbol: "Q", label: "Her bir hidrant/pompa debisi", unit: "m³/h" },
        { symbol: "t", label: "Minimum çalışma süresi", unit: "saat" },
        { symbol: "n", label: "Eşzamanlı çalışan hidrant/pompa sayısı" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Ana yangın devresi gereklilikleri" },
      note: "Süre girişi dakika olarak alınır; kapasite m³ olarak hesaplanır (Q dakikaya çevrilir).",
      inputs: [
        { key: "q", label: "Pompa Debisi (Q)", unit: "m³/h", placeholder: "150" },
        { key: "time", label: "Çalışma Süresi (t)", unit: "dk", placeholder: "60" },
        { key: "n", label: "Pompa Sayısı (n)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const capacity = (v.q / 60) * v.time * v.n;
        return [{ label: "Toplam Kapasite", value: `${capacity.toFixed(1)} m³` }];
      },
    },
    {
      id: "escape-time",
      name: "Kaçış Süresi",
      group: "Tahliye ve Kaçış",
      formula: "t = L / v",
      variables: [
        { symbol: "t", label: "Kaçış süresi", unit: "dk" },
        { symbol: "L", label: "Kaçış yolu uzunluğu", unit: "m" },
        { symbol: "v", label: "Yürüyüş hızı (tipik 1,2)", unit: "m/s" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Kaçış yolları analizi" },
      note: "v m/s girilir; sonuç dakikaya çevrilir (÷60). Engelli personel için hız düşürülür.",
      inputs: [
        { key: "length", label: "Kaçış Yolu Uzunluğu (L)", unit: "m", placeholder: "120" },
        { key: "speed", label: "Yürüme Hızı (v)", unit: "m/s", placeholder: "1.2" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Hata", value: "Hız pozitif olmalı" }];
        const t = v.length / v.speed / 60;
        const durum = t > 30 ? "SOLAS 30 dk limitini aşıyor" : "Limit içinde (≤30 dk)";
        return [
          { label: "Kaçış Süresi (t)", value: `${t.toFixed(1)} dk` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "risk-matrix",
      name: "Risk Matrisi Skoru",
      group: "Risk Değerlendirmesi",
      formula: "Risk = Olasılık × Şiddet",
      variables: [
        { symbol: "Olasılık", label: "1-5 (Nadir – Çok Sık)" },
        { symbol: "Şiddet", label: "1-5 (Önemsiz – Felaket)" },
        { symbol: "Risk", label: "Risk skoru (1-25)" },
      ],
      source: { code: "ISM Code / Risk değerlendirme matrisi" },
      note: "15+ = Yüksek Risk, 8-14 = Orta Risk, 1-7 = Düşük Risk.",
      inputs: [
        { key: "p", label: "Olasılık", unit: "1-5", placeholder: "3" },
        { key: "s", label: "Şiddet", unit: "1-5", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.p * v.s;
        const seviye = risk >= 15 ? "Yüksek Risk" : risk >= 8 ? "Orta Risk" : "Düşük Risk";
        return [
          { label: "Risk Skoru", value: `${risk.toFixed(0)}` },
          { label: "Seviye", value: seviye },
        ];
      },
    },
    {
      id: "lsa-capacity",
      name: "Toplam Can Kurtarma Kapasitesi (LSA)",
      group: "Can Kurtarma Araçları",
      formula: "Kapasite = (Bot Sayısı × Bot Kapasitesi) + (Sal Sayısı × Sal Kapasitesi)",
      variables: [
        { symbol: "Bot Kapasitesi", label: "Can botu başına kişi", unit: "kişi" },
        { symbol: "Bot Sayısı", label: "Can botu adedi" },
        { symbol: "Sal Kapasitesi", label: "Can salı başına kişi", unit: "kişi" },
        { symbol: "Sal Sayısı", label: "Can salı adedi" },
      ],
      source: { code: "SOLAS III / LSA Code", detail: "Can kurtarma araçları kapasitesi" },
      note: "SOLAS uygunluk kontrolü: toplam kapasite ≥ gemideki kişi sayısı.",
      inputs: [
        { key: "boatCap", label: "Can Botu Kapasitesi", unit: "kişi", placeholder: "65" },
        { key: "boatCount", label: "Can Botu Sayısı", unit: "", placeholder: "4" },
        { key: "raftCap", label: "Can Salı Kapasitesi", unit: "kişi", placeholder: "25" },
        { key: "raftCount", label: "Can Salı Sayısı", unit: "", placeholder: "6" },
        { key: "pob", label: "Gemideki Kişi Sayısı", unit: "kişi", placeholder: "24" },
      ],
      calculate: (v) => {
        const boatTotal = v.boatCap * v.boatCount;
        const raftTotal = v.raftCap * v.raftCount;
        const total = boatTotal + raftTotal;
        const uygun = total >= v.pob ? "UYGUN" : "UYGUN DEĞİL";
        return [
          { label: "Toplam Can Botu Kapasitesi", value: `${boatTotal.toFixed(0)} kişi` },
          { label: "Toplam Can Salı Kapasitesi", value: `${raftTotal.toFixed(0)} kişi` },
          { label: "Toplam LSA Kapasitesi", value: `${total.toFixed(0)} kişi` },
          { label: "SOLAS Uygunluğu", value: uygun },
        ];
      },
    },
    {
      id: "evacuation-time",
      name: "Tahliye Süresi Tahmini",
      group: "Can Kurtarma Araçları",
      formula: "t = max(15, Kişi Sayısı / 4)",
      variables: [
        { symbol: "Kişi Sayısı", label: "Gemideki toplam kişi", unit: "kişi" },
        { symbol: "4", label: "Ortalama tahliye hızı", unit: "kişi/dk" },
      ],
      source: { code: "SOLAS III / LSA Code", detail: "Maksimum tahliye süresi 30 dk" },
      note: "Yaklaşık tahmin; dakikada ~4 kişi ve en az 15 dk varsayımı ile.",
      inputs: [
        { key: "pob", label: "Gemideki Kişi Sayısı", unit: "kişi", placeholder: "24" },
      ],
      calculate: (v) => {
        const t = Math.max(15, v.pob / 4);
        const durum = t <= 30 ? "Limit içinde (≤30 dk)" : "30 dk limitini aşıyor";
        return [
          { label: "Tahmini Tahliye Süresi", value: `${t.toFixed(0)} dk` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "fire-water-flow",
      name: "Yangın Suyu Debisi (Pompa)",
      group: "Yangın Söndürme",
      formula: "Q = Pompa Kapasitesi (m³/h) × 1000 / 60",
      variables: [
        { symbol: "Q", label: "Su debisi", unit: "L/dk" },
        { symbol: "Pompa Kapasitesi", label: "Yangın pompası kapasitesi", unit: "m³/h" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Ana yangın pompası debisi" },
      note: "m³/h'tan L/dk'ya dönüşüm: × 1000 ÷ 60.",
      inputs: [
        { key: "cap", label: "Pompa Kapasitesi", unit: "m³/h", placeholder: "150" },
      ],
      calculate: (v) => {
        const q = (v.cap * 1000) / 60;
        return [{ label: "Yangın Suyu Debisi (Q)", value: `${q.toFixed(0)} L/dk` }];
      },
    },
    {
      id: "mooring-line-load",
      name: "Halat Başına Yük (Bağlama)",
      group: "Demir ve Bağlama",
      formula: "Hat Yükü = Toplam Kuvvet / Hat Sayısı ;  SF = WLL / Hat Yükü",
      variables: [
        { symbol: "Toplam Kuvvet", label: "Toplam çevresel/deplasman kuvveti", unit: "t" },
        { symbol: "Hat Sayısı", label: "Bağlama halatı adedi" },
        { symbol: "WLL", label: "Halat çalışma yük limiti", unit: "t" },
      ],
      source: { code: "OCIMF MEG4 / İyi denizcilik uygulaması" },
      note: "SF ≥ 2,0 güvenli kabul edilir.",
      inputs: [
        { key: "force", label: "Toplam Kuvvet", unit: "t", placeholder: "25000" },
        { key: "lines", label: "Hat Sayısı", unit: "", placeholder: "6" },
        { key: "wll", label: "Çalışma Yük Limiti (WLL)", unit: "t", placeholder: "17" },
      ],
      calculate: (v) => {
        if (v.lines <= 0) return [{ label: "Hata", value: "Hat sayısı pozitif olmalı" }];
        const load = v.force / v.lines;
        const sf = load > 0 ? v.wll / load : 0;
        const durum = sf >= 2.0 ? "Güvenli (SF≥2,0)" : "Aşırı yüklü";
        return [
          { label: "Hat Başına Yük", value: `${load.toFixed(2)} t` },
          { label: "Emniyet Faktörü (SF)", value: sf.toFixed(2) },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "freeboard-check",
      name: "Freeboard Kontrolü",
      group: "Yük Hattı ve Freeboard",
      formula: "Mevcut Freeboard = Derinlik − Su Çekimi",
      variables: [
        { symbol: "Derinlik", label: "Gemi derinliği (D)", unit: "m" },
        { symbol: "Su Çekimi", label: "Yaz su çekimi (T)", unit: "m" },
      ],
      source: { code: "Load Line Convention (ICLL 1966)", detail: "Freeboard uygunluğu" },
      note: "Sonuç mm cinsinden verilir (× 1000).",
      inputs: [
        { key: "depth", label: "Gemi Derinliği (D)", unit: "m", placeholder: "18" },
        { key: "draft", label: "Yaz Su Çekimi (T)", unit: "m", placeholder: "8.5" },
      ],
      calculate: (v) => {
        const fb = (v.depth - v.draft) * 1000;
        return [{ label: "Mevcut Freeboard", value: `${fb.toFixed(0)} mm` }];
      },
    },
    {
      id: "fire-fighting-categories",
      name: "Yangın Sınıfları (Söndürücü Seçimi)",
      group: "Risk Değerlendirmesi",
      formula: "A: katı, B: sıvı, C: gaz, D: metal, F/K: yağ",
      variables: [
        { symbol: "A", label: "Katı yanıcılar (ahşap, kâğıt, kumaş)" },
        { symbol: "B", label: "Yanıcı sıvılar (yakıt, yağ, boya)" },
        { symbol: "C", label: "Yanıcı gazlar / elektrikli ekipman" },
        { symbol: "D", label: "Yanıcı metaller" },
        { symbol: "F/K", label: "Pişirme yağları (mutfak)" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Taşınabilir söndürücü tipleri" },
      note: "Yangın sınıfı seçilir (1=A katı, 2=B sıvı, 3=C gaz/elektrik, 4=D metal, 5=F/K yağ); uygun söndürücü önerilir.",
      inputs: [
        { key: "cls", label: "Yangın Sınıfı (1=A,2=B,3=C,4=D,5=F/K)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const map: Record<number, { name: string; agent: string }> = {
          1: { name: "A — Katı (ahşap, kâğıt, kumaş)", agent: "Su, köpük, ABC kuru kimyevi" },
          2: { name: "B — Yanıcı sıvı (yakıt, yağ, boya)", agent: "Köpük, CO₂, ABC/BC kuru kimyevi" },
          3: { name: "C — Gaz / elektrikli ekipman", agent: "CO₂, kuru kimyevi (SU KULLANMA)" },
          4: { name: "D — Yanıcı metal", agent: "Özel D tozu (kum/grafit); su/CO₂ YASAK" },
          5: { name: "F/K — Pişirme yağı (mutfak)", agent: "Islak kimyevi (wet chemical); su YASAK" },
        };
        const sel = map[Math.round(v.cls)];
        if (!sel) return [{ label: "Hata", value: "Sınıf 1–5 arasında olmalı" }];
        return [
          { label: "Yangın Sınıfı", value: sel.name },
          { label: "Önerilen Söndürücü", value: sel.agent },
        ];
      },
    },
  ],
};
