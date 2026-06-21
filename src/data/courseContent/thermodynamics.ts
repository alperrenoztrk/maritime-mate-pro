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
      note: "İç enerji değişimi ve yapılan iş girilir; sisteme verilen ısı Q = ΔU + W hesaplanır.",
      inputs: [
        { key: "du", label: "İç Enerji Değişimi (ΔU)", unit: "kJ", placeholder: "300" },
        { key: "w", label: "Yapılan İş (W)", unit: "kJ", placeholder: "120" },
      ],
      calculate: (v) => {
        const q = v.du + v.w;
        return [{ label: "Sisteme Verilen Isı (Q)", value: `${q.toFixed(2)} kJ` }];
      },
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
      note: "Sıcaklık °C girilir, hesapta K'ye çevrilir (R = 8,314 J/mol·K). Basınç P = n·R·T / V hesaplanır.",
      inputs: [
        { key: "n", label: "Mol Sayısı (n)", unit: "mol", placeholder: "100" },
        { key: "vol", label: "Hacim (V)", unit: "m³", placeholder: "2" },
        { key: "t", label: "Sıcaklık (T)", unit: "°C", placeholder: "25" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Hata", value: "Hacim pozitif olmalı" }];
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Hata", value: "Sıcaklık mutlak sıfırın üstünde olmalı" }];
        const pPa = (v.n * 8.314 * tK) / v.vol;
        return [
          { label: "Basınç (P)", value: `${(pPa / 1000).toFixed(2)} kPa` },
          { label: "Basınç", value: `${(pPa / 1e5).toFixed(3)} bar` },
        ];
      },
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
      inputs: [
        { key: "h", label: "Taşınım Katsayısı (h)", unit: "W/m²·K", placeholder: "150" },
        { key: "a", label: "Yüzey Alanı (A)", unit: "m²", placeholder: "3" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "°C", placeholder: "40" },
      ],
      calculate: (v) => {
        const q = v.h * v.a * v.dt;
        return [{ label: "Isı Akısı (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
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
      note: "σ = 5,67×10⁻⁸ W/m²·K⁴. Sıcaklık °C girilir, hesapta K'ye çevrilir.",
      inputs: [
        { key: "eps", label: "Yayma Katsayısı (ε)", unit: "", placeholder: "0.85" },
        { key: "a", label: "Yüzey Alanı (A)", unit: "m²", placeholder: "2" },
        { key: "t", label: "Yüzey Sıcaklığı (T)", unit: "°C", placeholder: "400" },
      ],
      calculate: (v) => {
        const tK = v.t + 273.15;
        if (tK <= 0) return [{ label: "Hata", value: "Sıcaklık mutlak sıfırın üstünde olmalı" }];
        const q = v.eps * 5.67e-8 * v.a * Math.pow(tK, 4);
        return [{ label: "Işınım Gücü (Q̇)", value: `${(q / 1000).toFixed(2)} kW` }];
      },
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
    {
      id: "absolute-pressure",
      name: "Mutlak Basınç",
      group: "Temel Kavramlar",
      formula: "P_abs = P_gauge + P_atm",
      variables: [
        { symbol: "P_abs", label: "Mutlak basınç", unit: "bar" },
        { symbol: "P_gauge", label: "Gösterge (manometre) basıncı", unit: "bar" },
        { symbol: "P_atm", label: "Atmosfer basıncı", unit: "bar" },
      ],
      source: { code: "Mutlak/gösterge basınç tanımı" },
      note: "Deniz seviyesinde P_atm ≈ 1,013 bar. Vakum durumunda gösterge basıncı negatif girilir.",
      inputs: [
        { key: "pg", label: "Gösterge Basıncı (P_gauge)", unit: "bar", placeholder: "6" },
        { key: "patm", label: "Atmosfer Basıncı (P_atm)", unit: "bar", placeholder: "1.013" },
      ],
      calculate: (v) => {
        const pabs = v.pg + v.patm;
        return [
          { label: "Mutlak Basınç (P_abs)", value: `${pabs.toFixed(3)} bar` },
          { label: "Mutlak Basınç", value: `${(pabs * 100).toFixed(1)} kPa` },
        ];
      },
    },
    {
      id: "specific-volume",
      name: "Özgül Hacim",
      group: "Temel Kavramlar",
      formula: "v = V / m = 1 / ρ",
      variables: [
        { symbol: "v", label: "Özgül hacim", unit: "m³/kg" },
        { symbol: "V", label: "Hacim", unit: "m³" },
        { symbol: "m", label: "Kütle", unit: "kg" },
        { symbol: "ρ", label: "Yoğunluk", unit: "kg/m³" },
      ],
      source: { code: "Özgül hacim tanımı (yoğunluğun tersi)" },
      note: "Yoğunluk biliniyorsa v = 1/ρ; kütle ve hacim biliniyorsa v = V/m. Yoğunluk girilirse hacim/kütle alanları boş bırakılabilir.",
      inputs: [
        { key: "rho", label: "Yoğunluk (ρ)", unit: "kg/m³", placeholder: "1.2" },
        { key: "vol", label: "Hacim (V) — opsiyonel", unit: "m³", placeholder: "0" },
        { key: "m", label: "Kütle (m) — opsiyonel", unit: "kg", placeholder: "0" },
      ],
      calculate: (v) => {
        if (v.vol > 0 && v.m > 0) {
          return [{ label: "Özgül Hacim (v)", value: `${(v.vol / v.m).toFixed(5)} m³/kg` }];
        }
        if (v.rho > 0) {
          return [{ label: "Özgül Hacim (v)", value: `${(1 / v.rho).toFixed(5)} m³/kg` }];
        }
        return [{ label: "Hata", value: "Yoğunluk veya hacim+kütle pozitif girilmeli" }];
      },
    },
    {
      id: "internal-energy",
      name: "İç Enerji Değişimi",
      group: "Termodinamik Yasaları",
      formula: "ΔU = m · cv · ΔT",
      variables: [
        { symbol: "m", label: "Kütle", unit: "kg" },
        { symbol: "cv", label: "Sabit hacimde özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
      ],
      source: { code: "İdeal gaz iç enerji değişimi" },
      note: "Hava için cv ≈ 0,718 kJ/kg·K. ΔT = T₂ − T₁.",
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "2" },
        { key: "cv", label: "Özgül Isı (cv)", unit: "kJ/kg·K", placeholder: "0.718" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "K", placeholder: "150" },
      ],
      calculate: (v) => {
        const du = v.m * v.cv * v.dt;
        return [{ label: "İç Enerji Değişimi (ΔU)", value: `${du.toFixed(2)} kJ` }];
      },
    },
    {
      id: "enthalpy-change",
      name: "Entalpi Değişimi",
      group: "Termodinamik Yasaları",
      formula: "ΔH = m · cp · ΔT",
      variables: [
        { symbol: "m", label: "Kütle", unit: "kg" },
        { symbol: "cp", label: "Sabit basınçta özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık farkı", unit: "K" },
      ],
      source: { code: "İdeal gaz entalpi değişimi" },
      note: "Hava için cp ≈ 1,005 kJ/kg·K. ΔT = T₂ − T₁.",
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "2" },
        { key: "cp", label: "Özgül Isı (cp)", unit: "kJ/kg·K", placeholder: "1.005" },
        { key: "dt", label: "Sıcaklık Farkı (ΔT)", unit: "K", placeholder: "150" },
      ],
      calculate: (v) => {
        const dh = v.m * v.cp * v.dt;
        return [{ label: "Entalpi Değişimi (ΔH)", value: `${dh.toFixed(2)} kJ` }];
      },
    },
    {
      id: "gas-constant-relation",
      name: "Özgül Isılar İlişkisi (Mayer)",
      group: "Termodinamik Yasaları",
      formula: "cp − cv = R    ;    γ = cp / cv",
      variables: [
        { symbol: "cp", label: "Sabit basınçta özgül ısı", unit: "kJ/kg·K" },
        { symbol: "cv", label: "Sabit hacimde özgül ısı", unit: "kJ/kg·K" },
        { symbol: "R", label: "Özgül gaz sabiti", unit: "kJ/kg·K" },
        { symbol: "γ", label: "Özgül ısı oranı (adyabatik üs)" },
      ],
      source: { code: "Mayer bağıntısı (ideal gaz)" },
      note: "Hava için cp ≈ 1,005 ; cv ≈ 0,718 ; R ≈ 0,287 kJ/kg·K ; γ ≈ 1,4.",
      inputs: [
        { key: "cp", label: "Özgül Isı (cp)", unit: "kJ/kg·K", placeholder: "1.005" },
        { key: "cv", label: "Özgül Isı (cv)", unit: "kJ/kg·K", placeholder: "0.718" },
      ],
      calculate: (v) => {
        if (v.cv <= 0) return [{ label: "Hata", value: "cv pozitif olmalı" }];
        const r = v.cp - v.cv;
        const gamma = v.cp / v.cv;
        return [
          { label: "Gaz Sabiti (R)", value: `${r.toFixed(4)} kJ/kg·K` },
          { label: "Özgül Isı Oranı (γ)", value: `${gamma.toFixed(3)}` },
        ];
      },
    },
    {
      id: "exergy",
      name: "Ekserji (Kullanılabilir Enerji)",
      group: "Termodinamik Yasaları",
      formula: "Ex = (H − H₀) − T₀ · (S − S₀)",
      variables: [
        { symbol: "Ex", label: "Akış ekserjisi", unit: "kJ" },
        { symbol: "H − H₀", label: "Entalpi farkı (ölü hale göre)", unit: "kJ" },
        { symbol: "T₀", label: "Çevre (ölü hal) sıcaklığı", unit: "K" },
        { symbol: "S − S₀", label: "Entropi farkı (ölü hale göre)", unit: "kJ/K" },
      ],
      source: { code: "Termodinamiğin İkinci Yasası (ekserji analizi)" },
      note: "T₀ çevre sıcaklığıdır; °C girilir, hesapta K'ye çevrilir. Ölü hal = çevre ile dengedeki durum.",
      inputs: [
        { key: "dh", label: "Entalpi Farkı (H − H₀)", unit: "kJ", placeholder: "500" },
        { key: "t0", label: "Çevre Sıcaklığı (T₀)", unit: "°C", placeholder: "25" },
        { key: "ds", label: "Entropi Farkı (S − S₀)", unit: "kJ/K", placeholder: "0.8" },
      ],
      calculate: (v) => {
        const t0K = v.t0 + 273.15;
        const ex = v.dh - t0K * v.ds;
        return [{ label: "Ekserji (Ex)", value: `${ex.toFixed(2)} kJ` }];
      },
    },
    {
      id: "isothermal-work",
      name: "İzotermal İş (İdeal Gaz)",
      group: "Çevrimler",
      formula: "W = m · R · T · ln(V₂ / V₁)",
      variables: [
        { symbol: "W", label: "Yapılan iş", unit: "kJ" },
        { symbol: "m", label: "Kütle", unit: "kg" },
        { symbol: "R", label: "Özgül gaz sabiti", unit: "kJ/kg·K" },
        { symbol: "T", label: "Mutlak sıcaklık (sabit)", unit: "K" },
        { symbol: "V₂/V₁", label: "Hacim oranı" },
      ],
      source: { code: "İzotermal hal değişimi işi (ideal gaz)" },
      note: "Sıcaklık sabittir; °C girilir, hesapta K'ye çevrilir. Hava için R ≈ 0,287 kJ/kg·K. Genleşmede (V₂>V₁) iş pozitiftir.",
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "1" },
        { key: "r", label: "Gaz Sabiti (R)", unit: "kJ/kg·K", placeholder: "0.287" },
        { key: "t", label: "Sıcaklık (T)", unit: "°C", placeholder: "300" },
        { key: "v1", label: "Başlangıç Hacmi (V₁)", unit: "m³", placeholder: "0.1" },
        { key: "v2", label: "Son Hacim (V₂)", unit: "m³", placeholder: "0.3" },
      ],
      calculate: (v) => {
        if (v.v1 <= 0 || v.v2 <= 0) return [{ label: "Hata", value: "Hacimler pozitif olmalı" }];
        const tK = v.t + 273.15;
        const w = v.m * v.r * tK * Math.log(v.v2 / v.v1);
        return [{ label: "İzotermal İş (W)", value: `${w.toFixed(2)} kJ` }];
      },
    },
    {
      id: "cylindrical-conduction",
      name: "Silindirik İletim (Boru/Duvar)",
      group: "Isı Transferi",
      formula: "Q̇ = 2π·k·L·(T₁ − T₂) / ln(r₂ / r₁)",
      variables: [
        { symbol: "k", label: "Isıl iletkenlik", unit: "W/m·K" },
        { symbol: "L", label: "Silindir (boru) uzunluğu", unit: "m" },
        { symbol: "T₁ − T₂", label: "İç-dış sıcaklık farkı", unit: "K" },
        { symbol: "r₁, r₂", label: "İç ve dış yarıçap", unit: "m" },
      ],
      source: { code: "Silindirik koordinatlarda Fourier ısı iletimi" },
      note: "İzole borularda/silindir cidarlarda radyal ısı kaybı. r₂ > r₁ olmalıdır.",
      inputs: [
        { key: "k", label: "Isıl İletkenlik (k)", unit: "W/m·K", placeholder: "0.04" },
        { key: "l", label: "Uzunluk (L)", unit: "m", placeholder: "10" },
        { key: "dt", label: "Sıcaklık Farkı (T₁−T₂)", unit: "°C", placeholder: "120" },
        { key: "r1", label: "İç Yarıçap (r₁)", unit: "m", placeholder: "0.05" },
        { key: "r2", label: "Dış Yarıçap (r₂)", unit: "m", placeholder: "0.08" },
      ],
      calculate: (v) => {
        if (v.r1 <= 0 || v.r2 <= v.r1) return [{ label: "Hata", value: "r₂ > r₁ > 0 olmalı" }];
        const q = (2 * Math.PI * v.k * v.l * v.dt) / Math.log(v.r2 / v.r1);
        return [
          { label: "Isı Akısı (Q̇)", value: `${q.toFixed(1)} W` },
          { label: "Isı Akısı", value: `${(q / 1000).toFixed(3)} kW` },
        ];
      },
    },
    {
      id: "overall-heat-transfer",
      name: "Toplam Isı Transfer Katsayısı (U)",
      group: "Isı Transferi",
      formula: "1/U = 1/h₁ + L/k + 1/h₂",
      variables: [
        { symbol: "U", label: "Toplam ısı geçiş katsayısı", unit: "W/m²·K" },
        { symbol: "h₁, h₂", label: "İç-dış taşınım katsayıları", unit: "W/m²·K" },
        { symbol: "L", label: "Duvar kalınlığı", unit: "m" },
        { symbol: "k", label: "Duvar ısıl iletkenliği", unit: "W/m·K" },
      ],
      source: { code: "Seri ısıl dirençler (düzlem duvar)" },
      note: "Toplam ısıl direncin tersi. Eşanjör/cidar analizinde Q̇ = U·A·ΔT ile birlikte kullanılır.",
      inputs: [
        { key: "h1", label: "İç Taşınım Katsayısı (h₁)", unit: "W/m²·K", placeholder: "500" },
        { key: "l", label: "Duvar Kalınlığı (L)", unit: "m", placeholder: "0.01" },
        { key: "k", label: "Duvar İletkenliği (k)", unit: "W/m·K", placeholder: "50" },
        { key: "h2", label: "Dış Taşınım Katsayısı (h₂)", unit: "W/m²·K", placeholder: "2000" },
      ],
      calculate: (v) => {
        if (v.h1 <= 0 || v.h2 <= 0 || v.k <= 0) return [{ label: "Hata", value: "h₁, h₂, k pozitif olmalı" }];
        const rTotal = 1 / v.h1 + v.l / v.k + 1 / v.h2;
        const u = 1 / rTotal;
        return [{ label: "Toplam Katsayı (U)", value: `${u.toFixed(2)} W/m²·K` }];
      },
    },
    {
      id: "hx-effectiveness",
      name: "Eşanjör Etkinliği (ε-NTU)",
      group: "Isı Transferi",
      formula: "ε = Q / Q_max = Q / [C_min · (T_h,in − T_c,in)]",
      variables: [
        { symbol: "ε", label: "Eşanjör etkinliği (0-1)" },
        { symbol: "Q", label: "Gerçek ısı transferi", unit: "kW" },
        { symbol: "C_min", label: "Küçük ısı kapasite debisi (ṁ·cp)", unit: "kW/K" },
        { symbol: "T_h,in − T_c,in", label: "Giriş sıcaklık farkı", unit: "K" },
      ],
      source: { code: "Isı eşanjörü etkinlik-NTU yöntemi" },
      note: "Q_max = C_min·(T_sıcak,giriş − T_soğuk,giriş). Etkinlik 0-1 aralığındadır.",
      inputs: [
        { key: "q", label: "Gerçek Isı Transferi (Q)", unit: "kW", placeholder: "300" },
        { key: "cmin", label: "C_min (ṁ·cp)", unit: "kW/K", placeholder: "12" },
        { key: "thi", label: "Sıcak Akışkan Giriş", unit: "°C", placeholder: "90" },
        { key: "tci", label: "Soğuk Akışkan Giriş", unit: "°C", placeholder: "20" },
      ],
      calculate: (v) => {
        const dt = v.thi - v.tci;
        if (v.cmin <= 0 || dt <= 0) return [{ label: "Hata", value: "C_min ve giriş farkı pozitif olmalı" }];
        const qmax = v.cmin * dt;
        const eps = v.q / qmax;
        return [
          { label: "Q_max", value: `${qmax.toFixed(1)} kW` },
          { label: "Etkinlik (ε)", value: `${eps.toFixed(3)}  (${(eps * 100).toFixed(1)} %)` },
        ];
      },
    },
  ],
};
