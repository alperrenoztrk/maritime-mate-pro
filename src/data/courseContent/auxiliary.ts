import { Fuel } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Yardımcı Makineler — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const auxiliary: CourseTopic = {
  key: "auxiliary",
  title: "Yardımcı Makineler",
  icon: Fuel,
  accent: "from-amber-500 via-orange-500 to-red-500",
  group: "machine",
  intro:
    "Jeneratörler, kazanlar, separatörler, kompresörler ve tatlı su üreticileri. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "generator-power",
      name: "Jeneratör Gücü (3 Faz)",
      group: "Jeneratör Hesapları",
      formula: "P = √3 × V × I × cos(φ)",
      variables: [
        { symbol: "V", label: "Hat gerilimi", unit: "V" },
        { symbol: "I", label: "Hat akımı", unit: "A" },
        { symbol: "cos(φ)", label: "Güç faktörü" },
      ],
      source: { code: "Üç fazlı aktif güç bağıntısı" },
      note: "Sonuç W cinsinden çıkar, kW'a çevrilir (÷1000). Görünür güç S = √3 × V × I.",
      inputs: [
        { key: "v", label: "Hat Gerilimi (V)", unit: "V", placeholder: "440" },
        { key: "i", label: "Hat Akımı (I)", unit: "A", placeholder: "500" },
        { key: "pf", label: "Güç Faktörü (cos φ)", unit: "", placeholder: "0.8" },
      ],
      calculate: (vals) => {
        const p = Math.sqrt(3) * vals.v * vals.i * vals.pf;
        return [
          { label: "Aktif Güç (P)", value: `${(p / 1000).toFixed(1)} kW` },
          { label: "Görünür Güç (S)", value: `${(Math.sqrt(3) * vals.v * vals.i / 1000).toFixed(1)} kVA` },
        ];
      },
    },
    {
      id: "frequency-speed",
      name: "Frekans-Devir İlişkisi",
      group: "Jeneratör Hesapları",
      formula: "f = (p × n) / 60",
      variables: [
        { symbol: "f", label: "Frekans", unit: "Hz" },
        { symbol: "p", label: "Kutup çifti sayısı" },
        { symbol: "n", label: "Devir", unit: "rpm" },
      ],
      source: { code: "Senkron makine frekans-devir bağıntısı" },
      note: "Kutup çifti sayısı ve devir girilir; frekans f = (p × n) / 60 hesaplanır.",
      inputs: [
        { key: "p", label: "Kutup Çifti Sayısı (p)", unit: "", placeholder: "2" },
        { key: "n", label: "Devir (n)", unit: "rpm", placeholder: "1800" },
      ],
      calculate: (v) => {
        const f = (v.p * v.n) / 60;
        return [{ label: "Frekans (f)", value: `${f.toFixed(2)} Hz` }];
      },
    },
    {
      id: "generator-efficiency",
      name: "Jeneratör Verimi",
      group: "Jeneratör Hesapları",
      formula: "η = Pelektrik / Pmekanik",
      variables: [
        { symbol: "Pelektrik", label: "Elektriksel çıkış gücü", unit: "kW" },
        { symbol: "Pmekanik", label: "Mekanik giriş gücü", unit: "kW" },
      ],
      source: { code: "Elektrik makinesi verim tanımı (tipik %92–96)" },
      note: "Elektriksel çıkış ve mekanik giriş gücü (kW) girilir; verim ve kayıp hesaplanır.",
      inputs: [
        { key: "pe", label: "Elektriksel Çıkış (Pelektrik)", unit: "kW", placeholder: "920" },
        { key: "pm", label: "Mekanik Giriş (Pmekanik)", unit: "kW", placeholder: "1000" },
      ],
      calculate: (v) => {
        if (v.pm <= 0) return [{ label: "Hata", value: "Mekanik giriş gücü pozitif olmalı" }];
        const eta = (v.pe / v.pm) * 100;
        return [
          { label: "Verim (η)", value: `${eta.toFixed(1)} %` },
          { label: "Kayıp", value: `${(v.pm - v.pe).toFixed(1)} kW` },
        ];
      },
    },
    {
      id: "boiler-steam-production",
      name: "Kazan Buhar Üretimi",
      group: "Kazan Hesapları",
      formula: "ṁbuhar = (Q̇ × η) / Δh",
      variables: [
        { symbol: "Q̇", label: "Yakıt ısıl gücü", unit: "kW" },
        { symbol: "η", label: "Kazan verimi" },
        { symbol: "Δh", label: "Buharlaşma entalpisi (hfg)", unit: "kJ/kg" },
      ],
      source: { code: "Kazan enerji dengesi (buhar üretimi)" },
      note: "Verim % girilir, hesapta orana çevrilir. Sonuç kg/saat için ×3600.",
      inputs: [
        { key: "q", label: "Yakıt Isıl Gücü", unit: "kW", placeholder: "2000" },
        { key: "eta", label: "Kazan Verimi", unit: "%", placeholder: "85" },
        { key: "hfg", label: "Buharlaşma Isısı", unit: "kJ/kg", placeholder: "2257" },
      ],
      calculate: (v) => {
        const steam = (v.q * (v.eta / 100) * 3600) / (v.hfg);
        return [{ label: "Buhar Üretimi", value: `${steam.toFixed(0)} kg/saat` }];
      },
    },
    {
      id: "boiler-efficiency",
      name: "Kazan Verimi",
      group: "Kazan Hesapları",
      formula: "η = (ṁbuhar × Δh) / (ṁyakıt × Hu)",
      variables: [
        { symbol: "ṁbuhar", label: "Buhar debisi", unit: "kg/s" },
        { symbol: "Δh", label: "Entalpi farkı", unit: "kJ/kg" },
        { symbol: "ṁyakıt", label: "Yakıt debisi", unit: "kg/s" },
        { symbol: "Hu", label: "Yakıtın alt ısıl değeri", unit: "kJ/kg" },
      ],
      source: { code: "Kazan verimi (doğrudan/girdi-çıktı yöntemi)" },
      note: "Buhar ve yakıt debileri kg/s girilir; verim = (ṁbuhar × Δh) / (ṁyakıt × Hu).",
      inputs: [
        { key: "ms", label: "Buhar Debisi (ṁbuhar)", unit: "kg/s", placeholder: "1.2" },
        { key: "dh", label: "Entalpi Farkı (Δh)", unit: "kJ/kg", placeholder: "2600" },
        { key: "mf", label: "Yakıt Debisi (ṁyakıt)", unit: "kg/s", placeholder: "0.09" },
        { key: "hu", label: "Alt Isıl Değer (Hu)", unit: "kJ/kg", placeholder: "40000" },
      ],
      calculate: (v) => {
        const denom = v.mf * v.hu;
        if (denom <= 0) return [{ label: "Hata", value: "Yakıt debisi ve ısıl değer pozitif olmalı" }];
        const eta = ((v.ms * v.dh) / denom) * 100;
        return [{ label: "Kazan Verimi (η)", value: `${eta.toFixed(1)} %` }];
      },
    },
    {
      id: "separator-capacity",
      name: "Separatör Kapasitesi",
      group: "Separatör",
      formula: "Q = (FC × 24 × k) / t",
      variables: [
        { symbol: "FC", label: "Yakıt tüketimi", unit: "litre/saat" },
        { symbol: "k", label: "Güvenlik faktörü" },
        { symbol: "t", label: "Günlük çalışma süresi", unit: "saat/gün" },
      ],
      source: { code: "Santrifüj separatör boyutlandırma (günlük tüketim bazlı)" },
      note: "Günlük tüketim (FC × 24) güvenlik faktörüyle çarpılıp çalışma süresine bölünür.",
      inputs: [
        { key: "fc", label: "Yakıt Tüketimi", unit: "litre/saat", placeholder: "3000" },
        { key: "factor", label: "Güvenlik Faktörü", unit: "", placeholder: "1.2" },
        { key: "hours", label: "Çalışma Süresi", unit: "saat/gün", placeholder: "20" },
      ],
      calculate: (v) => {
        const capacity = (v.fc * 24 * v.factor) / v.hours;
        return [{ label: "Gerekli Kapasite", value: `${capacity.toFixed(0)} litre/saat` }];
      },
    },
    {
      id: "stokes-law",
      name: "Stokes Yasası (Ayrışma Hızı)",
      group: "Separatör",
      formula: "v = d²·(ρw − ρo)·g / (18·μ)",
      variables: [
        { symbol: "d", label: "Parçacık çapı", unit: "m" },
        { symbol: "ρw", label: "Su yoğunluğu", unit: "kg/m³" },
        { symbol: "ρo", label: "Yağ yoğunluğu", unit: "kg/m³" },
        { symbol: "g", label: "Yerçekimi ivmesi", unit: "9,81 m/s²" },
        { symbol: "μ", label: "Dinamik viskozite", unit: "Pa·s" },
      ],
      source: { code: "Stokes yasası (laminer çökelme hızı)" },
      note: "Parçacık çapı µm girilir, hesapta m'ye çevrilir (g = 9,81 m/s²). Sonuç mm/s olarak verilir.",
      inputs: [
        { key: "d", label: "Parçacık Çapı (d)", unit: "µm", placeholder: "30" },
        { key: "rw", label: "Su Yoğunluğu (ρw)", unit: "kg/m³", placeholder: "1025" },
        { key: "ro", label: "Yağ Yoğunluğu (ρo)", unit: "kg/m³", placeholder: "900" },
        { key: "mu", label: "Dinamik Viskozite (μ)", unit: "Pa·s", placeholder: "0.5" },
      ],
      calculate: (v) => {
        if (v.mu <= 0) return [{ label: "Hata", value: "Viskozite pozitif olmalı" }];
        const dM = v.d * 1e-6;
        const vel = (dM * dM * (v.rw - v.ro) * 9.81) / (18 * v.mu);
        return [
          { label: "Ayrışma Hızı (v)", value: `${(vel * 1000).toFixed(4)} mm/s` },
        ];
      },
    },
    {
      id: "compressor-volume-flow",
      name: "Kompresör Hacimsel Debisi",
      group: "Kompresör",
      formula: "Q = (π·D²/4)·L·n·k·ηv",
      variables: [
        { symbol: "D", label: "Silindir çapı", unit: "mm" },
        { symbol: "L", label: "Strok", unit: "mm" },
        { symbol: "n", label: "Devir", unit: "rpm" },
        { symbol: "k", label: "Silindir sayısı" },
        { symbol: "ηv", label: "Hacimsel verim" },
      ],
      source: { code: "Pistonlu kompresör süpürme hacmi debisi" },
      note: "Çap ve strok mm girilir, hesapta m'ye çevrilir (÷1000). Sonuç m³/dk → m³/saat için ×60.",
      inputs: [
        { key: "bore", label: "Silindir Çapı", unit: "mm", placeholder: "250" },
        { key: "stroke", label: "Strok", unit: "mm", placeholder: "200" },
        { key: "n", label: "Devir", unit: "rpm", placeholder: "1000" },
        { key: "k", label: "Silindir Sayısı", unit: "", placeholder: "2" },
        { key: "etav", label: "Hacimsel Verim", unit: "%", placeholder: "85" },
      ],
      calculate: (v) => {
        const vs = Math.PI * Math.pow(v.bore / 1000, 2) / 4 * (v.stroke / 1000);
        const qTheory = vs * v.n * v.k; // m³/min
        const qActual = qTheory * (v.etav / 100);
        return [
          { label: "Teorik Debi", value: `${(qTheory * 60).toFixed(2)} m³/saat` },
          { label: "Gerçek Debi", value: `${(qActual * 60).toFixed(2)} m³/saat` },
        ];
      },
    },
    {
      id: "fresh-water-generator",
      name: "Tatlı Su Üretimi (Evaporatör)",
      group: "Tatlı Su Üreteci",
      formula: "ṁsu = (Q̇ × η) / hfg",
      variables: [
        { symbol: "Q̇", label: "Kullanılabilir ısı", unit: "kW" },
        { symbol: "η", label: "Evaporatör verimi" },
        { symbol: "hfg", label: "Buharlaşma ısısı (vakumda)", unit: "kJ/kg" },
      ],
      source: { code: "Vakumlu evaporatör enerji dengesi" },
      note: "Verim % girilir, orana çevrilir. Saatlik üretim için ×3600; günlük ton için ×24/1000.",
      inputs: [
        { key: "qAvail", label: "Kullanılabilir Isı", unit: "kW", placeholder: "300" },
        { key: "hfg", label: "Buharlaşma Isısı (vakumda)", unit: "kJ/kg", placeholder: "2400" },
        { key: "eta", label: "Evaporatör Verimi", unit: "%", placeholder: "80" },
      ],
      calculate: (v) => {
        const production = (v.qAvail * (v.eta / 100) * 3600) / v.hfg;
        return [
          { label: "Su Üretimi", value: `${production.toFixed(0)} kg/saat` },
          { label: "Günlük Üretim", value: `${(production * 24 / 1000).toFixed(1)} ton/gün` },
        ];
      },
    },
    {
      id: "heat-exchanger-lmtd",
      name: "Logaritmik Ortalama Sıcaklık Farkı (LMTD)",
      group: "Isı Değiştirici",
      formula: "ΔTlm = (ΔT1 − ΔT2) / ln(ΔT1 / ΔT2)",
      variables: [
        { symbol: "ΔT1", label: "Sıcak uç sıcaklık farkı", unit: "°C" },
        { symbol: "ΔT2", label: "Soğuk uç sıcaklık farkı", unit: "°C" },
      ],
      source: { code: "Isı değiştirici LMTD yöntemi (zıt/paralel akış)" },
      note: "ΔT1 ve ΔT2, eşanjörün iki ucundaki sıcak-soğuk akışkan sıcaklık farklarıdır. ΔT1 = ΔT2 ise ΔTlm = ΔT1 alınır.",
      inputs: [
        { key: "dt1", label: "Sıcak Uç Farkı (ΔT1)", unit: "°C", placeholder: "40" },
        { key: "dt2", label: "Soğuk Uç Farkı (ΔT2)", unit: "°C", placeholder: "10" },
      ],
      calculate: (v) => {
        if (v.dt1 <= 0 || v.dt2 <= 0) return [{ label: "Hata", value: "Sıcaklık farkları pozitif olmalı" }];
        const lmtd = Math.abs(v.dt1 - v.dt2) < 1e-9 ? v.dt1 : (v.dt1 - v.dt2) / Math.log(v.dt1 / v.dt2);
        return [{ label: "LMTD (ΔTlm)", value: `${lmtd.toFixed(2)} °C` }];
      },
    },
    {
      id: "heat-exchanger-duty",
      name: "Isı Değiştirici Isı Transfer Hızı",
      group: "Isı Değiştirici",
      formula: "Q = U × A × ΔTlm",
      variables: [
        { symbol: "U", label: "Toplam ısı transfer katsayısı", unit: "W/m²·K" },
        { symbol: "A", label: "Isı transfer yüzey alanı", unit: "m²" },
        { symbol: "ΔTlm", label: "Log. ortalama sıcaklık farkı", unit: "K" },
      ],
      source: { code: "Isı transfer denklemi (eşanjör kapasitesi)" },
      note: "Sonuç W cinsinden çıkar, kW'a çevrilir (÷1000). ΔTlm için LMTD hesabı kullanılır.",
      inputs: [
        { key: "u", label: "Isı Transfer Katsayısı (U)", unit: "W/m²·K", placeholder: "3000" },
        { key: "a", label: "Yüzey Alanı (A)", unit: "m²", placeholder: "8" },
        { key: "dtlm", label: "LMTD (ΔTlm)", unit: "K", placeholder: "15" },
      ],
      calculate: (v) => {
        const q = v.u * v.a * v.dtlm;
        return [
          { label: "Isı Transfer Hızı (Q)", value: `${(q / 1000).toFixed(1)} kW` },
          { label: "Q (W)", value: `${q.toFixed(0)} W` },
        ];
      },
    },
    {
      id: "incinerator-heat-capacity",
      name: "İnsinerator Yakma Isıl Gücü",
      group: "İnsinerator",
      formula: "Q̇ = (ṁ × Hu) / 3600",
      variables: [
        { symbol: "ṁ", label: "Sludge/atık besleme debisi", unit: "kg/saat" },
        { symbol: "Hu", label: "Atığın alt ısıl değeri", unit: "kJ/kg" },
      ],
      source: { code: "IMO MEPC.244(66) — insinerator ısıl kapasite (kütle × ısıl değer)" },
      note: "ṁ (kg/saat) × Hu (kJ/kg) = kJ/saat; kW için ÷3600. Su içeren sludge'ın ısıl değeri düşüktür (~10.000–30.000 kJ/kg).",
      inputs: [
        { key: "m", label: "Besleme Debisi (ṁ)", unit: "kg/saat", placeholder: "50" },
        { key: "hu", label: "Alt Isıl Değer (Hu)", unit: "kJ/kg", placeholder: "30000" },
      ],
      calculate: (v) => {
        const qkw = (v.m * v.hu) / 3600;
        return [
          { label: "Yakma Isıl Gücü (Q̇)", value: `${qkw.toFixed(1)} kW` },
          { label: "Saatlik Isı", value: `${(v.m * v.hu / 1000).toFixed(0)} MJ/saat` },
        ];
      },
    },
    {
      id: "sewage-holding-tank",
      name: "Atık Su (Sewage) Toplama Tankı Hacmi",
      group: "Atık Su Arıtma (Sewage)",
      formula: "V = N × q × d",
      variables: [
        { symbol: "N", label: "Personel sayısı" },
        { symbol: "q", label: "Kişi başı günlük atık su", unit: "litre/kişi·gün" },
        { symbol: "d", label: "Bekletme süresi", unit: "gün" },
      ],
      source: { code: "MARPOL Annex IV / MEPC.227(64) — sewage üretim bazlı boyutlandırma" },
      note: "q tipik olarak sadece black water için ~30, black+grey için ~70 litre/kişi·gün alınır. Sonuç litre ve m³ verilir.",
      inputs: [
        { key: "n", label: "Personel Sayısı (N)", unit: "kişi", placeholder: "20" },
        { key: "q", label: "Kişi Başı Atık Su (q)", unit: "litre/kişi·gün", placeholder: "70" },
        { key: "d", label: "Bekletme Süresi (d)", unit: "gün", placeholder: "3" },
      ],
      calculate: (v) => {
        const liters = v.n * v.q * v.d;
        return [
          { label: "Gerekli Hacim", value: `${liters.toFixed(0)} litre` },
          { label: "m³ cinsinden", value: `${(liters / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "ows-discharge-time",
      name: "Sintine Separatörü (OWS) Boşaltma Süresi",
      group: "Sintine Separatörü (OWS)",
      formula: "t = V / Q",
      variables: [
        { symbol: "V", label: "Sintine (bilge) hacmi", unit: "m³" },
        { symbol: "Q", label: "OWS kapasitesi", unit: "m³/saat" },
      ],
      source: { code: "OWS boyutlandırma (hacim/debi ilişkisi)" },
      note: "Sintine tankındaki yağlı su hacminin, OWS anma kapasitesiyle işlenmesi için gereken süre.",
      inputs: [
        { key: "v", label: "Sintine Hacmi (V)", unit: "m³", placeholder: "10" },
        { key: "q", label: "OWS Kapasitesi (Q)", unit: "m³/saat", placeholder: "2.5" },
      ],
      calculate: (v) => {
        if (v.q <= 0) return [{ label: "Hata", value: "Kapasite pozitif olmalı" }];
        const t = v.v / v.q;
        return [{ label: "Boşaltma Süresi", value: `${t.toFixed(1)} saat` }];
      },
    },
    {
      id: "refrigeration-pulldown-load",
      name: "Soğuk Depo Soğutma Yükü (Pull-down)",
      group: "Soğutma (Provision)",
      formula: "Q = (m × cp × ΔT) / (t × 3600)",
      variables: [
        { symbol: "m", label: "Soğutulacak kütle", unit: "kg" },
        { symbol: "cp", label: "Özgül ısı", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık düşüşü", unit: "K" },
        { symbol: "t", label: "Pull-down süresi", unit: "saat" },
      ],
      source: { code: "Soğutma yükü enerji dengesi (duyulur ısı)" },
      note: "cp tipik: taze gıda ~3,3; donmuş ~1,7 kJ/kg·K. Sonuç kW (soğutma gücü). Süre saat girilir, ×3600 ile saniyeye çevrilir.",
      inputs: [
        { key: "m", label: "Kütle (m)", unit: "kg", placeholder: "500" },
        { key: "cp", label: "Özgül Isı (cp)", unit: "kJ/kg·K", placeholder: "3.3" },
        { key: "dt", label: "Sıcaklık Düşüşü (ΔT)", unit: "K", placeholder: "25" },
        { key: "t", label: "Pull-down Süresi (t)", unit: "saat", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.t <= 0) return [{ label: "Hata", value: "Süre pozitif olmalı" }];
        const q = (v.m * v.cp * v.dt) / (v.t * 3600);
        return [{ label: "Soğutma Yükü (Q)", value: `${q.toFixed(2)} kW` }];
      },
    },
    {
      id: "refrigeration-cop",
      name: "Soğutma Çevrimi Performans Katsayısı (COP)",
      group: "Soğutma (Provision)",
      formula: "COP = Q₀ / W",
      variables: [
        { symbol: "Q₀", label: "Soğutma kapasitesi (evaporatör)", unit: "kW" },
        { symbol: "W", label: "Kompresör giriş gücü", unit: "kW" },
      ],
      source: { code: "Soğutma çevrimi performans katsayısı (COP) tanımı" },
      note: "COP, birim kompresör gücü başına elde edilen soğutma gücüdür; tipik provision sistemlerde ~2–4.",
      inputs: [
        { key: "q0", label: "Soğutma Kapasitesi (Q₀)", unit: "kW", placeholder: "12" },
        { key: "w", label: "Kompresör Gücü (W)", unit: "kW", placeholder: "4" },
      ],
      calculate: (v) => {
        if (v.w <= 0) return [{ label: "Hata", value: "Kompresör gücü pozitif olmalı" }];
        const cop = v.q0 / v.w;
        return [{ label: "COP", value: cop.toFixed(2) }];
      },
    },
  ],
};
