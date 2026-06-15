import { TrendingUp } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Deniz İşletmeciliğinde Ticari Operasyonlar — tek kaynak ders içeriği.
 * TCE, demurrage/despatch, bunker maliyeti ve sefer ekonomisi için gerçek
 * ticari denizcilik bağıntıları; her formül bağlı hesaplayıcıyla.
 */
export const economics: CourseTopic = {
  key: "economics",
  title: "Deniz İşletmeciliğinde Ticari Operasyonlar",
  icon: TrendingUp,
  accent: "from-amber-400 via-yellow-500 to-orange-600",
  group: "deck",
  intro:
    "Sefer süresi, navlun geliri, bunker maliyeti, TCE ve demurrage/despatch. " +
    "Her formülün altında onu hesaplayan araç yer alır.",
  entries: [
    {
      id: "voyage-duration",
      name: "Sefer Süresi",
      group: "Sefer Planı",
      formula: "Süre (gün) = Mesafe / (Hız × 24)",
      variables: [
        { symbol: "Mesafe", label: "Sefer mesafesi", unit: "deniz mili" },
        { symbol: "Hız", label: "Ortalama hız", unit: "kn" },
      ],
      source: { code: "Sefer planı — mesafe/hız bağıntısı" },
      inputs: [
        { key: "dist", label: "Mesafe", unit: "n.mil", placeholder: "5000" },
        { key: "speed", label: "Hız", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Hata", value: "Hız pozitif olmalı" }];
        const days = v.dist / (v.speed * 24);
        return [
          { label: "Sefer Süresi", value: `${days.toFixed(2)} gün` },
          { label: "Sefer Süresi", value: `${(days * 24).toFixed(1)} saat` },
        ];
      },
    },
    {
      id: "bunker-cost",
      name: "Bunker (Yakıt) Maliyeti",
      group: "Maliyetler",
      formula: "Maliyet = Tüketim (t/gün) × Gün × Fiyat",
      variables: [
        { symbol: "Tüketim", label: "Günlük yakıt tüketimi", unit: "t/gün" },
        { symbol: "Gün", label: "Sefer süresi", unit: "gün" },
        { symbol: "Fiyat", label: "Yakıt birim fiyatı", unit: "$/t" },
      ],
      source: { code: "Sefer gideri — bunker maliyeti" },
      inputs: [
        { key: "cons", label: "Tüketim", unit: "t/gün", placeholder: "30" },
        { key: "days", label: "Gün", unit: "gün", placeholder: "15" },
        { key: "price", label: "Fiyat", unit: "$/t", placeholder: "600" },
      ],
      calculate: (v) => [{ label: "Bunker Maliyeti", value: `$${(v.cons * v.days * v.price).toLocaleString("en-US")}` }],
    },
    {
      id: "freight-revenue",
      name: "Navlun Geliri",
      group: "Gelir",
      formula: "Gelir = Yük Miktarı × Navlun Oranı",
      variables: [
        { symbol: "Yük", label: "Taşınan yük", unit: "t" },
        { symbol: "Navlun Oranı", label: "Birim navlun", unit: "$/t" },
      ],
      source: { code: "Navlun geliri (freight revenue)" },
      inputs: [
        { key: "cargo", label: "Yük Miktarı", unit: "t", placeholder: "50000" },
        { key: "rate", label: "Navlun Oranı", unit: "$/t", placeholder: "25" },
      ],
      calculate: (v) => [{ label: "Navlun Geliri", value: `$${(v.cargo * v.rate).toLocaleString("en-US")}` }],
    },
    {
      id: "tce",
      name: "TCE (Time Charter Equivalent)",
      group: "Karlılık",
      formula: "TCE = (Sefer Geliri − Sefer Giderleri) / Sefer Süresi",
      variables: [
        { symbol: "Sefer Geliri", label: "Brüt navlun geliri", unit: "$" },
        { symbol: "Sefer Giderleri", label: "Voyage cost (bunker, liman, kanal)", unit: "$" },
        { symbol: "Sefer Süresi", label: "Toplam sefer süresi", unit: "gün" },
      ],
      source: { code: "TCE — kuru yük/tanker getiri ölçütü" },
      inputs: [
        { key: "revenue", label: "Sefer Geliri", unit: "$", placeholder: "1250000" },
        { key: "cost", label: "Sefer Giderleri", unit: "$", placeholder: "450000" },
        { key: "days", label: "Sefer Süresi", unit: "gün", placeholder: "30" },
      ],
      calculate: (v) => {
        if (v.days <= 0) return [{ label: "Hata", value: "Sefer süresi pozitif olmalı" }];
        return [{ label: "TCE", value: `$${((v.revenue - v.cost) / v.days).toFixed(0)} / gün` }];
      },
    },
    {
      id: "laytime",
      name: "Laytime (İzin Verilen Süre)",
      group: "Charter Party",
      formula: "Laytime (gün) = Yük Miktarı / Yükleme-Tahliye Oranı",
      variables: [
        { symbol: "Yük", label: "Yük miktarı", unit: "t" },
        { symbol: "Oran", label: "Yükleme/tahliye oranı", unit: "t/gün" },
      ],
      source: { code: "Charter Party — laytime hesabı" },
      inputs: [
        { key: "cargo", label: "Yük Miktarı", unit: "t", placeholder: "50000" },
        { key: "rate", label: "Yük/Tahliye Oranı", unit: "t/gün", placeholder: "10000" },
      ],
      calculate: (v) => {
        if (v.rate <= 0) return [{ label: "Hata", value: "Oran pozitif olmalı" }];
        return [{ label: "Laytime", value: `${(v.cargo / v.rate).toFixed(2)} gün` }];
      },
    },
    {
      id: "demurrage",
      name: "Demurrage (Sürastarya)",
      group: "Charter Party",
      formula: "Demurrage = (Kullanılan Süre − Laytime) × Oran",
      variables: [
        { symbol: "Kullanılan Süre", label: "Limanda geçen süre", unit: "gün" },
        { symbol: "Laytime", label: "İzin verilen süre", unit: "gün" },
        { symbol: "Oran", label: "Günlük demurrage oranı", unit: "$/gün" },
      ],
      source: { code: "Charter Party — demurrage" },
      note: "Sonuç negatifse despatch (kazanılan süre) söz konusudur.",
      inputs: [
        { key: "used", label: "Kullanılan Süre", unit: "gün", placeholder: "7" },
        { key: "laytime", label: "Laytime", unit: "gün", placeholder: "5" },
        { key: "rate", label: "Demurrage Oranı", unit: "$/gün", placeholder: "15000" },
      ],
      calculate: (v) => {
        const diff = v.used - v.laytime;
        const amount = diff * v.rate;
        if (diff <= 0) return [{ label: "Sonuç", value: "Demurrage yok (despatch durumu)" }];
        return [{ label: "Demurrage", value: `$${amount.toLocaleString("en-US")}` }];
      },
    },
    {
      id: "despatch",
      name: "Despatch (Sürdespeç)",
      group: "Charter Party",
      formula: "Despatch = Kazanılan Süre × Oran",
      variables: [
        { symbol: "Kazanılan Süre", label: "Laytime'dan tasarruf edilen süre", unit: "gün" },
        { symbol: "Oran", label: "Despatch oranı (genellikle demurrage/2)", unit: "$/gün" },
      ],
      source: { code: "Charter Party — despatch (demurrage'ın yarısı)" },
      inputs: [
        { key: "saved", label: "Kazanılan Süre", unit: "gün", placeholder: "2" },
        { key: "rate", label: "Despatch Oranı", unit: "$/gün", placeholder: "7500" },
      ],
      calculate: (v) => [{ label: "Despatch", value: `$${(v.saved * v.rate).toLocaleString("en-US")}` }],
    },
    {
      id: "break-even-freight",
      name: "Başabaş Navlun Oranı",
      group: "Karlılık",
      formula: "Başabaş Oran = Toplam Sefer Gideri / Yük Miktarı",
      variables: [
        { symbol: "Toplam Gider", label: "Toplam sefer gideri", unit: "$" },
        { symbol: "Yük", label: "Yük miktarı", unit: "t" },
      ],
      source: { code: "Başabaş (break-even) navlun analizi" },
      inputs: [
        { key: "cost", label: "Toplam Sefer Gideri", unit: "$", placeholder: "450000" },
        { key: "cargo", label: "Yük Miktarı", unit: "t", placeholder: "50000" },
      ],
      calculate: (v) => {
        if (v.cargo <= 0) return [{ label: "Hata", value: "Yük pozitif olmalı" }];
        return [{ label: "Başabaş Navlun", value: `$${(v.cost / v.cargo).toFixed(2)} / t` }];
      },
    },
  ],
};
