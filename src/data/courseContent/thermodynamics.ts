import { Flame } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Termodinamik ve Isı Tekniği — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const thermodynamics: CourseTopic = {
  key: "thermodynamics",
  title: "Termodinamik ve Isı Tekniği",
  icon: Flame,
  accent: "from-red-500 via-orange-500 to-amber-500",
  group: "machine",
  intro:
    "Isı, iş ve enerji dönüşümleri; termodinamik çevrimler ve ısı transferi. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "first-law",
      name: "Birinci Yasa (Kapalı Sistem)",
      group: "Termodinamik Yasaları",
      formula: "Q = ΔU + W",
      variables: [
        { symbol: "Q", label: "Sisteme verilen ısı", unit: "kJ" },
        { symbol: "ΔU", label: "İç enerji değişimi", unit: "kJ" },
        { symbol: "W", label: "Sistemin yaptığı iş", unit: "kJ" },
      ],
      source: { code: "Termodinamiğin Birinci Yasası (enerjinin korunumu)" },
    },
    {
      id: "carnot-efficiency",
      name: "Carnot Verimi",
      group: "Termodinamik Yasaları",
      formula: "η = 1 − (T_L / T_H)",
      variables: [
        { symbol: "T_H", label: "Sıcak kaynak sıcaklığı", unit: "K" },
        { symbol: "T_L", label: "Soğuk kaynak sıcaklığı", unit: "K" },
      ],
      source: { code: "Termodinamiğin İkinci Yasası (Carnot teoremi)" },
      note: "Girişler °C alınır, hesaplamada mutlak sıcaklığa (K) çevrilir: T(K) = T(°C) + 273,15.",
      inputs: [
        { key: "th", label: "Sıcak Kaynak (T_H)", unit: "°C", placeholder: "500" },
        { key: "tl", label: "Soğuk Kaynak (T_L)", unit: "°C", placeholder: "30" },
      ],
      calculate: (v) => {
        const TH = v.th + 273.15;
        const TL = v.tl + 273.15;
        if (TH <= 0) return [{ label: "Hata", value: "T_H mutlak sıfırın üstünde olmalı" }];
        const eta = (1 - TL / TH) * 100;
        return [{ label: "Carnot Verimi (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "entropy-change",
      name: "Entropi Değişimi",
      group: "Termodinamik Yasaları",
      formula: "ΔS = Q_rev / T",
      variables: [
        { symbol: "Q_rev", label: "Tersinir ısı geçişi", unit: "kJ" },
        { symbol: "T", label: "Mutlak sıcaklık", unit: "K" },
      ],
      source: { code: "Termodinamiğin İkinci Yasası (Clausius eşitliği)" },
      note: "Sıcaklık °C girilir, hesapta K'ye çevrilir.",
      inputs: [
        { key: "q", label: "Isı Miktarı (Q)", unit: "kJ", placeholder: "500" },
        { key: "t", label: "Sıcaklık (T)", unit: "°C", placeholder: "100" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Hata", value: "Sıcaklık mutlak sıfırın üstünde olmalı" }];
        const ds = v.q / tK;
        return [{ label: "Entropi Değişimi (ΔS)", value: `${ds.toFixed(4)} kJ/K` }];
      },
    },
    {
      id: "ideal-gas",
      name: "İdeal Gaz Denklemi",
      group: "Termodinamik Yasaları",
      formula: "P·V = n·R·T",
      variables: [
        { symbol: "P", label: "Basınç", unit: "Pa" },
        { symbol: "V", label: "Hacim", unit: "m³" },
        { symbol: "n", label: "Mol sayısı", unit: "mol" },
        { symbol: "R", label: "Evrensel gaz sabiti", unit: "8,314 J/(mol·K)" },
        { symbol: "T", label: "Mutlak sıcaklık", unit: "K" },
      ],
      source: { code: "İdeal gaz hal denklemi" },
    },
    {
      id: "sensible-heat",
      name: "Isı Miktarı (Duyulur Isı)",
      group: "Termodinamik Yasaları",
      formula: "Q = m · c · ΔT",
      variables: [
        { symbol: "m", label: "Kütle", unit: "kg" },
        { symbol: "c", label: "Özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
      ],
      source: { code: "Kalorimetri — duyulur ısı bağıntısı" },
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "1000" },
        { key: "c", label: "Özgül Isı (c)", unit: "kJ/kg·K", placeholder: "4.18" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "°C", placeholder: "20" },
      ],
      calculate: (v) => {
        const q = v.m * v.c * v.dt;
        return [
          { label: "Isı Miktarı (Q)", value: `${q.toFixed(1)} kJ` },
          { label: "Isı Miktarı", value: `${(q / 3600).toFixed(2)} kWh` },
        ];
      },
    },
    {
      id: "otto-efficiency",
      name: "Otto Çevrimi Verimi",
      group: "Çevrimler",
      formula: "η = 1 − 1 / r^(γ−1)",
      variables: [
        { symbol: "r", label: "Sıkıştırma oranı" },
        { symbol: "γ", label: "Özgül ısı oranı (cp/cv)" },
      ],
      source: { code: "Hava standardı Otto çevrimi" },
      inputs: [
        { key: "r", label: "Sıkıştırma Oranı (r)", unit: "", placeholder: "10" },
        { key: "gamma", label: "Özgül Isı Oranı (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        const eta = (1 - 1 / Math.pow(v.r, v.gamma - 1)) * 100;
        return [{ label: "Otto Çevrim Verimi (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "diesel-efficiency",
      name: "Diesel Çevrim Verimi",
      group: "Çevrimler",
      formula: "η = 1 − (1 / r^(γ−1)) · [(ρ^γ − 1) / (γ · (ρ − 1))]",
      variables: [
        { symbol: "r", label: "Sıkıştırma oranı" },
        { symbol: "ρ", label: "Kesme (cut-off) oranı" },
        { symbol: "γ", label: "Özgül ısı oranı" },
      ],
      source: { code: "Hava standardı Diesel çevrimi" },
      inputs: [
        { key: "r", label: "Sıkıştırma Oranı (r)", unit: "", placeholder: "18" },
        { key: "rc", label: "Kesme Oranı (ρ)", unit: "", placeholder: "2.5" },
        { key: "gamma", label: "Özgül Isı Oranı (γ)", unit: "", placeholder: "1.4" },
      ],
      calculate: (v) => {
        if (v.rc <= 1) return [{ label: "Hata", value: "Kesme oranı 1'den büyük olmalı" }];
        const eta =
          (1 - (1 / Math.pow(v.r, v.gamma - 1)) * ((Math.pow(v.rc, v.gamma) - 1) / (v.gamma * (v.rc - 1)))) * 100;
        return [{ label: "Diesel Çevrim Verimi (η)", value: `${eta.toFixed(2)} %` }];
      },
    },
    {
      id: "polytropic",
      name: "Politropik Süreç",
      group: "Çevrimler",
      formula: "P₁·V₁ⁿ = P₂·V₂ⁿ",
      variables: [
        { symbol: "P", label: "Basınç", unit: "bar" },
        { symbol: "V", label: "Hacim", unit: "m³" },
        { symbol: "n", label: "Politropik indeks (izotermik n=1, adyabatik n=γ)" },
      ],
      source: { code: "Politropik hal değişimi" },
      inputs: [
        { key: "p1", label: "Başlangıç Basıncı (P₁)", unit: "bar", placeholder: "1" },
        { key: "v1", label: "Başlangıç Hacmi (V₁)", unit: "m³", placeholder: "0.5" },
        { key: "v2", label: "Son Hacim (V₂)", unit: "m³", placeholder: "0.05" },
        { key: "n", label: "Politropik İndeks (n)", unit: "", placeholder: "1.3" },
      ],
      calculate: (v) => {
        if (v.n === 1) return [{ label: "Uyarı", value: "n=1 için izotermik bağıntı kullanın" }];
        const p2 = v.p1 * Math.pow(v.v1 / v.v2, v.n);
        const work = (v.p1 * 1e5 * v.v1 - p2 * 1e5 * v.v2) / (v.n - 1);
        return [
          { label: "Son Basınç (P₂)", value: `${p2.toFixed(2)} bar` },
          { label: "İş (W)", value: `${(work / 1000).toFixed(2)} kJ` },
        ];
      },
    },
    {
      id: "fourier-conduction",
      name: "İletim (Fourier Yasası)",
      group: "Isı Transferi",
      formula: "Q̇ = k · A · ΔT / L",
      variables: [
        { symbol: "k", label: "Isıl iletkenlik", unit: "W/m·K" },
        { symbol: "A", label: "Alan", unit: "m²" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
        { symbol: "L", label: "Duvar kalınlığı", unit: "m" },
      ],
      source: { code: "Fourier ısı iletim yasası" },
      inputs: [
        { key: "k", label: "Isı İletim Katsayısı (k)", unit: "W/m·K", placeholder: "50" },
        { key: "a", label: "Alan (A)", unit: "m²", placeholder: "2" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "°C", placeholder: "80" },
        { key: "l", label: "Duvar Kalınlığı (L)", unit: "m", placeholder: "0.05" },
      ],
      calculate: (v) => {
        if (v.l <= 0) return [{ label: "Hata", value: "Kalınlık pozitif olmalı" }];
        const q = (v.k * v.a * v.dt) / v.l;
        return [{ label: "Isı Akısı (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
    },
    {
      id: "newton-convection",
      name: "Taşınım (Newton Soğuma Yasası)",
      group: "Isı Transferi",
      formula: "Q̇ = h · A · ΔT",
      variables: [
        { symbol: "h", label: "Taşınım katsayısı", unit: "W/m²·K" },
        { symbol: "A", label: "Yüzey alanı", unit: "m²" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
      ],
      source: { code: "Newton soğuma yasası" },
    },
    {
      id: "stefan-boltzmann",
      name: "Işınım (Stefan-Boltzmann)",
      group: "Isı Transferi",
      formula: "Q̇ = ε · σ · A · T⁴",
      variables: [
        { symbol: "ε", label: "Yayma katsayısı (emissivite)" },
        { symbol: "σ", label: "Stefan-Boltzmann sabiti", unit: "5,67×10⁻⁸ W/m²·K⁴" },
        { symbol: "A", label: "Yüzey alanı", unit: "m²" },
        { symbol: "T", label: "Mutlak sıcaklık", unit: "K" },
      ],
      source: { code: "Stefan-Boltzmann ışınım yasası" },
    },
    {
      id: "lmtd",
      name: "LMTD (Logaritmik Ortalama Sıcaklık Farkı)",
      group: "Isı Transferi",
      formula: "LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁ / ΔT₂)",
      variables: [
        { symbol: "ΔT₁", label: "Bir uçtaki sıcaklık farkı", unit: "°C" },
        { symbol: "ΔT₂", label: "Diğer uçtaki sıcaklık farkı", unit: "°C" },
      ],
      source: { code: "Isı eşanjörü tasarımı (karşı akış)" },
      note: "Karşı akış: ΔT₁ = T_sıcak,giriş − T_soğuk,çıkış ; ΔT₂ = T_sıcak,çıkış − T_soğuk,giriş.",
      inputs: [
        { key: "t1i", label: "Sıcak Giriş", unit: "°C", placeholder: "90" },
        { key: "t1o", label: "Sıcak Çıkış", unit: "°C", placeholder: "60" },
        { key: "t2i", label: "Soğuk Giriş", unit: "°C", placeholder: "20" },
        { key: "t2o", label: "Soğuk Çıkış", unit: "°C", placeholder: "50" },
      ],
      calculate: (v) => {
        const dt1 = v.t1i - v.t2o;
        const dt2 = v.t1o - v.t2i;
        if (dt1 <= 0 || dt2 <= 0) return [{ label: "Hata", value: "Sıcaklık farkları pozitif olmalı" }];
        const lmtd = Math.abs(dt1 - dt2) < 0.01 ? dt1 : (dt1 - dt2) / Math.log(dt1 / dt2);
        return [{ label: "LMTD", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
    {
      id: "hx-area",
      name: "Isı Eşanjörü Alanı",
      group: "Isı Transferi",
      formula: "Q̇ = U · A · LMTD",
      variables: [
        { symbol: "Q̇", label: "Isı yükü", unit: "kW" },
        { symbol: "U", label: "Toplam ısı geçiş katsayısı", unit: "W/m²·K" },
        { symbol: "A", label: "Isı transfer alanı", unit: "m²" },
        { symbol: "LMTD", label: "Logaritmik ortalama sıcaklık farkı", unit: "°C" },
      ],
      source: { code: "Isı eşanjörü temel tasarım denklemi" },
      inputs: [
        { key: "q", label: "Isı Yükü (Q)", unit: "kW", placeholder: "500" },
        { key: "u", label: "Toplam Isı Transfer Katsayısı (U)", unit: "W/m²·K", placeholder: "2500" },
        { key: "lmtd", label: "LMTD", unit: "°C", placeholder: "35" },
      ],
      calculate: (v) => {
        if (v.u <= 0 || v.lmtd <= 0) return [{ label: "Hata", value: "U ve LMTD pozitif olmalı" }];
        const area = (v.q * 1000) / (v.u * v.lmtd);
        return [{ label: "Gerekli Alan (A)", value: `${area.toFixed(2)} m²` }];
      },
    },
  ],
};
