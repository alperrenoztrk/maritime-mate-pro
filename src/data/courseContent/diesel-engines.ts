import { Settings } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Deniz Dizel Makineleri — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const dieselEngines: CourseTopic = {
  key: "diesel-engines",
  title: "Deniz Dizel Makineleri",
  icon: Settings,
  accent: "from-slate-600 via-zinc-700 to-slate-800",
  group: "machine",
  intro:
    "Dizel motor performansı, yanma, enjeksiyon ve güç hesapları. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "indicated-power",
      name: "İndike Güç (IHP)",
      group: "Motor Performans",
      formula: "IHP = (Pmi × L × A × n × k) / 60000",
      variables: [
        { symbol: "Pmi", label: "Ortalama indike basınç", unit: "bar" },
        { symbol: "L", label: "Strok", unit: "m" },
        { symbol: "A", label: "Piston alanı", unit: "m²" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Silindir sayısı" },
      ],
      source: { code: "Motor teorisi — indike güç bağıntısı" },
      note: "Pmi bar girilir, hesapta 10⁵ Pa'ya çevrilir; sonuç kW olarak verilir.",
      inputs: [
        { key: "pmi", label: "Ortalama İndike Basınç (P_mi)", unit: "bar", placeholder: "18" },
        { key: "l", label: "Strok (L)", unit: "m", placeholder: "2.5" },
        { key: "a", label: "Piston Alanı (A)", unit: "m²", placeholder: "0.35" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Silindir Sayısı (k)", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        // P_mi (bar) * 10^5 (Pa) * L * A * n * k / 60 → Watt → /1000 → kW
        const ihp = (v.pmi * 1e5 * v.l * v.a * v.n * v.k) / (60 * 1000);
        return [{ label: "İndike Güç (IHP)", value: `${ihp.toFixed(1)} kW` }];
      },
    },
    {
      id: "brake-power",
      name: "Fren Gücü (BHP)",
      group: "Motor Performans",
      formula: "BHP = IHP × ηmech",
      variables: [
        { symbol: "IHP", label: "İndike güç", unit: "kW" },
        { symbol: "ηmech", label: "Mekanik verim (0,85–0,92)" },
      ],
      source: { code: "Motor teorisi — mekanik verim ve fren gücü" },
      note: "Mekanik verim % girilir.",
      inputs: [
        { key: "ihp", label: "İndike Güç (IHP)", unit: "kW", placeholder: "12000" },
        { key: "eta", label: "Mekanik Verim (η_mek)", unit: "%", placeholder: "90" },
      ],
      calculate: (v) => {
        const bhp = v.ihp * (v.eta / 100);
        const loss = v.ihp - bhp;
        return [
          { label: "Fren Gücü (BHP)", value: `${bhp.toFixed(1)} kW` },
          { label: "Mekanik Kayıp", value: `${loss.toFixed(1)} kW` },
        ];
      },
    },
    {
      id: "sfoc",
      name: "SFOC (Özgül Yakıt Tüketimi)",
      group: "Motor Performans",
      formula: "SFOC = Yakıt tüketimi (g/h) / BHP (kW)",
      variables: [
        { symbol: "FC", label: "Yakıt tüketimi", unit: "kg/saat" },
        { symbol: "BHP", label: "Fren gücü", unit: "kW" },
      ],
      source: { code: "Motor teorisi — özgül yakıt tüketimi (düşük değer daha verimli)" },
      note: "Yakıt tüketimi kg/saat girilir, ×1000 ile g'ye çevrilir; sonuç g/kW·h.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "kg/saat", placeholder: "5000" },
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "25000" },
      ],
      calculate: (v) => {
        const sfoc = (v.fc / v.bhp) * 1000;
        return [{ label: "SFOC", value: `${sfoc.toFixed(1)} g/kW·h` }];
      },
    },
    {
      id: "mep",
      name: "Ortalama Efektif Basınç (MEP)",
      group: "Motor Performans",
      formula: "MEP = (P × 60) / (Vs × n × k)",
      variables: [
        { symbol: "P", label: "Güç", unit: "kW" },
        { symbol: "Vs", label: "Strok hacmi (silindir başına)", unit: "m³" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Silindir sayısı" },
      ],
      source: { code: "Motor teorisi — ortalama efektif basınç (BMEP/IMEP)" },
      note: "Vs = π·D²/4·L olarak hesaplanır; sonuç Pa'dan bar'a çevrilir.",
      inputs: [
        { key: "p", label: "Güç (P)", unit: "kW", placeholder: "10000" },
        { key: "bore", label: "Silindir Çapı", unit: "m", placeholder: "0.5" },
        { key: "stroke", label: "Strok", unit: "m", placeholder: "2.0" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "100" },
        { key: "k", label: "Silindir Sayısı", unit: "adet", placeholder: "6" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore, 2) / 4 * v.stroke; // m³
        const mep = (v.p * 1000 * 60) / (vs * v.n * v.k); // Pa
        return [
          { label: "MEP", value: `${(mep / 1e5).toFixed(2)} bar` },
          { label: "Silindir Hacmi (V_s)", value: `${(vs * 1000).toFixed(1)} litre` },
        ];
      },
    },
    {
      id: "compression-ratio",
      name: "Sıkıştırma Oranı",
      group: "Motor Performans",
      formula: "r = (Vs + Vc) / Vc",
      variables: [
        { symbol: "Vs", label: "Strok hacmi", unit: "litre" },
        { symbol: "Vc", label: "Ölü (clearance) hacim", unit: "litre" },
      ],
      source: { code: "Motor teorisi — geometrik sıkıştırma oranı (Vmax/Vmin)" },
      note: "Çap ve strok mm girilir, strok hacmi litreye çevrilir.",
      inputs: [
        { key: "bore", label: "Silindir Çapı", unit: "mm", placeholder: "500" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "2000" },
        { key: "vc", label: "Ölü Hacim (V_c)", unit: "litre", placeholder: "15" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000) * 1000; // litre
        const cr = (vs + v.vc) / v.vc;
        return [
          { label: "Strok Hacmi (V_s)", value: `${vs.toFixed(1)} litre` },
          { label: "Sıkıştırma Oranı (r)", value: `${cr.toFixed(1)}:1` },
        ];
      },
    },
    {
      id: "admiralty-coefficient",
      name: "Admiralty Katsayısı",
      group: "Motor Performans",
      formula: "C = (Δ^(2/3) × V³) / P",
      variables: [
        { symbol: "Δ", label: "Deplasman", unit: "ton" },
        { symbol: "V", label: "Hız", unit: "knot" },
        { symbol: "P", label: "Güç", unit: "kW" },
      ],
      source: { code: "Gemi sevki — Admiralty (deplasman) katsayısı, hız-güç ilişkisi" },
      inputs: [
        { key: "delta", label: "Deplasman (Δ)", unit: "ton", placeholder: "50000" },
        { key: "v", label: "Hız (V)", unit: "knot", placeholder: "14" },
        { key: "p", label: "Güç (P)", unit: "kW", placeholder: "10000" },
      ],
      calculate: (v) => {
        const c = (Math.pow(v.delta, 2 / 3) * Math.pow(v.v, 3)) / v.p;
        return [{ label: "Admiralty Katsayısı (C)", value: c.toFixed(1) }];
      },
    },
    {
      id: "excess-air-ratio",
      name: "Hava Fazlalık Katsayısı (λ)",
      group: "Yanma ve Enjeksiyon",
      formula: "λ = mhava,gerçek / mhava,stokiyometrik",
      variables: [
        { symbol: "mhava,gerçek", label: "Gerçek hava/yakıt oranı", unit: "kg/kg" },
        { symbol: "mhava,stok", label: "Stokiyometrik hava/yakıt oranı", unit: "kg/kg" },
      ],
      source: { code: "Yanma teorisi — hava fazlalık katsayısı (dizel λ ≈ 1,5–2,5)" },
      inputs: [
        { key: "afr", label: "Gerçek Hava/Yakıt Oranı", unit: "kg/kg", placeholder: "42" },
        { key: "stoich", label: "Stokiyometrik Oran", unit: "kg/kg", placeholder: "14.7" },
      ],
      calculate: (v) => {
        const lambda = v.afr / v.stoich;
        const status = lambda < 1 ? "Zengin Karışım" : lambda > 1.5 ? "Fakir Karışım" : "Normal Aralık";
        return [
          { label: "Hava Fazlalık Katsayısı (λ)", value: lambda.toFixed(2) },
          { label: "Durum", value: status },
        ];
      },
    },
    {
      id: "injection-pressure",
      name: "Enjeksiyon Basıncı",
      group: "Yanma ve Enjeksiyon",
      formula: "Pinj = Fyay / Aiğne + Psilindir",
      variables: [
        { symbol: "Fyay", label: "Yay kuvveti", unit: "N" },
        { symbol: "Aiğne", label: "İğne kesit alanı", unit: "m²" },
        { symbol: "Psilindir", label: "Silindir basıncı", unit: "Pa" },
      ],
      source: { code: "Yakıt enjeksiyon sistemi (300–1000 bar mekanik, 1500–2500 bar common rail)" },
    },
    {
      id: "thermal-efficiency",
      name: "Isıl Verim",
      group: "Yanma ve Enjeksiyon",
      formula: "ηth = (BHP × 3600) / (ṁyakıt × Hu)",
      variables: [
        { symbol: "BHP", label: "Fren gücü", unit: "kW" },
        { symbol: "ṁyakıt", label: "Yakıt tüketimi", unit: "kg/saat" },
        { symbol: "Hu", label: "Alt ısıl değer (LCV)", unit: "kJ/kg" },
      ],
      source: { code: "Motor teorisi — efektif (fren) ısıl verim" },
      note: "BHP (kW) × 3600 ile saatlik enerjiye çevrilir; yakıt kg/saat girilir.",
      inputs: [
        { key: "bhp", label: "Fren Gücü (BHP)", unit: "kW", placeholder: "10000" },
        { key: "fc", label: "Yakıt Tüketimi (ṁ_f)", unit: "kg/saat", placeholder: "1850" },
        { key: "lcv", label: "Alt Isıl Değer (LCV)", unit: "kJ/kg", placeholder: "42700" },
      ],
      calculate: (v) => {
        const eta = (v.bhp * 3600) / (v.fc * v.lcv) * 100;
        return [{ label: "Termal Verim (η)", value: `${eta.toFixed(2)}%` }];
      },
    },
  ],
};
