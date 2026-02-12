import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { ArrowLeft, Sigma } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormulaItem {
  name: string;
  formula: string;
  variables: string;
}

interface FormulaCategory {
  title: string;
  formulas: FormulaItem[];
}

const topicFormulas: Record<string, FormulaCategory[]> = {
  thermodynamics: [
    {
      title: "Termodinamik Yasaları",
      formulas: [
        { name: "Birinci Yasa (Kapalı Sistem)", formula: "Q = ΔU + W", variables: "Q: ısı (kJ), ΔU: iç enerji değişimi (kJ), W: iş (kJ)" },
        { name: "Carnot Verimi", formula: "η_Carnot = 1 − (T_L / T_H)", variables: "T_L: düşük sıcaklık kaynağı (K), T_H: yüksek sıcaklık kaynağı (K)" },
        { name: "Entropi Değişimi", formula: "ΔS = Q_rev / T", variables: "Q_rev: tersinir ısı (kJ), T: mutlak sıcaklık (K)" },
        { name: "İdeal Gaz Denklemi", formula: "PV = nRT", variables: "P: basınç (Pa), V: hacim (m³), n: mol sayısı, R: 8,314 J/(mol·K), T: sıcaklık (K)" },
        { name: "Politropik Süreç", formula: "P₁V₁ⁿ = P₂V₂ⁿ", variables: "n: politropik indeks (izotermik n=1, adyabatik n=γ)" },
        { name: "Otto Çevrimi Verimi", formula: "η_Otto = 1 − (1 / r^(γ−1))", variables: "r: sıkıştırma oranı, γ: özgül ısı oranı (c_p/c_v)" },
      ],
    },
    {
      title: "Isı Transferi",
      formulas: [
        { name: "İletim (Fourier)", formula: "Q̇ = −k·A·(dT/dx)", variables: "k: ısıl iletkenlik (W/m·K), A: alan (m²), dT/dx: sıcaklık gradyanı" },
        { name: "Taşınım (Newton)", formula: "Q̇ = h·A·ΔT", variables: "h: taşınım katsayısı (W/m²·K), A: yüzey alanı, ΔT: sıcaklık farkı" },
        { name: "Işınım (Stefan-Boltzmann)", formula: "Q̇ = ε·σ·A·T⁴", variables: "ε: yayma katsayısı, σ: 5,67×10⁻⁸ W/m²·K⁴" },
        { name: "LMTD (Isı Eşanjörü)", formula: "Q̇ = U·A·LMTD", variables: "U: toplam ısı geçiş katsayısı (W/m²·K), LMTD: logaritmik ortalama sıcaklık farkı" },
      ],
    },
  ],
  "fluid-mechanics": [
    {
      title: "Temel Akışkan Denklemleri",
      formulas: [
        { name: "Bernoulli Denklemi", formula: "P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂", variables: "P: basınç, ρ: yoğunluk, v: hız, z: yükseklik, g: yerçekimi" },
        { name: "Süreklilik Denklemi", formula: "A₁·v₁ = A₂·v₂", variables: "A: kesit alanı (m²), v: akış hızı (m/s)" },
        { name: "Reynolds Sayısı", formula: "Re = ρ·v·D / μ", variables: "ρ: yoğunluk, v: hız, D: çap, μ: dinamik viskozite" },
        { name: "Darcy-Weisbach (Boru Kaybı)", formula: "h_f = f·(L/D)·(v²/2g)", variables: "f: sürtünme faktörü, L: boru uzunluğu, D: çap" },
      ],
    },
    {
      title: "Pompa Hesapları",
      formulas: [
        { name: "Pompa Gücü", formula: "P = ρ·g·Q·H / η", variables: "Q: debi (m³/s), H: toplam basma yüksekliği (m), η: verim" },
        { name: "NPSH (Net Pozitif Emme Yüksekliği)", formula: "NPSH_a = (P_atm − P_vap) / (ρ·g) + z_s − h_f", variables: "P_atm: atmosfer basıncı, P_vap: buhar basıncı, z_s: emme yüksekliği" },
        { name: "Afinite Kuralları (Debi)", formula: "Q₂/Q₁ = n₂/n₁", variables: "Q: debi, n: devir" },
        { name: "Afinite Kuralları (Güç)", formula: "P₂/P₁ = (n₂/n₁)³", variables: "P: güç, n: devir" },
      ],
    },
  ],
  "machine-elements": [
    {
      title: "Mukavemet ve Gerilme",
      formulas: [
        { name: "Çekme/Basma Gerilmesi", formula: "σ = F / A", variables: "F: kuvvet (N), A: kesit alanı (m²)" },
        { name: "Kayma Gerilmesi", formula: "τ = F / A", variables: "F: kayma kuvveti, A: kayma alanı" },
        { name: "Eğilme Gerilmesi", formula: "σ = M·y / I", variables: "M: eğilme momenti, y: nötr eksenden uzaklık, I: atalet momenti" },
        { name: "Burulma Gerilmesi", formula: "τ = T·r / J", variables: "T: tork, r: yarıçap, J: polar atalet momenti" },
      ],
    },
    {
      title: "Mil ve Yatak",
      formulas: [
        { name: "Mil Çapı (Burulma)", formula: "d = ∛(16T / π·τ_izin)", variables: "T: tork (N·m), τ_izin: izin verilen kayma gerilmesi (Pa)" },
        { name: "Kritik Devir", formula: "n_cr = (60/2π)·√(g/δ_st)", variables: "δ_st: statik sehim (m), g: yerçekimi" },
        { name: "Yatak Ömrü (L₁₀)", formula: "L₁₀ = (C/P)^p × 10⁶ devir", variables: "C: dinamik yük kapasitesi, P: eşdeğer yük, p: 3 (bilyalı) veya 10/3 (makaralı)" },
      ],
    },
  ],
  "diesel-engines": [
    {
      title: "Motor Performans",
      formulas: [
        { name: "İndike Güç (IHP)", formula: "IHP = (P_mi × L × A × n × k) / 60000", variables: "P_mi: ortalama indike basınç (bar), L: strok (m), A: piston alanı (m²), n: devir (rpm), k: silindir sayısı" },
        { name: "Fren Gücü (BHP)", formula: "BHP = IHP × η_mech", variables: "η_mech: mekanik verim (0,85–0,92)" },
        { name: "SFOC", formula: "SFOC = Yakıt tüketimi (g/h) / BHP (kW)", variables: "Sonuç: g/kW·h — düşük olan daha verimli" },
        { name: "Ortalama Efektif Basınç", formula: "MEP = (W_net) / V_d", variables: "W_net: çevrim başına net iş, V_d: strok hacmi" },
        { name: "Sıkıştırma Oranı", formula: "r = V_max / V_min", variables: "V_max: alt ölü nokta hacmi, V_min: üst ölü nokta hacmi" },
      ],
    },
    {
      title: "Yanma ve Enjeksiyon",
      formulas: [
        { name: "Hava Fazlalık Katsayısı", formula: "λ = m_hava,gerçek / m_hava,stokiyometrik", variables: "λ > 1: fakir karışım (dizel tipik λ = 1,5–2,5)" },
        { name: "Enjeksiyon Basıncı", formula: "P_inj = F_yay / A_iğne + P_silindir", variables: "Tipik: 300–1.000 bar (mekanik), 1.500–2.500 bar (common rail)" },
        { name: "Isıl Verim", formula: "η_th = BHP / (ṁ_yakıt × H_u)", variables: "ṁ_yakıt: yakıt debisi (kg/s), H_u: alt ısıl değer (kJ/kg)" },
      ],
    },
  ],
  "ship-systems": [
    {
      title: "Yakıt Sistemi",
      formulas: [
        { name: "Yakıt Tüketimi", formula: "FC = SFOC × BHP × t / 10⁶", variables: "FC: tüketim (ton), SFOC (g/kW·h), BHP (kW), t: süre (saat)" },
        { name: "Viskozite-Sıcaklık", formula: "log(log(ν + 0,7)) = A − B·log(T)", variables: "Walther denklemi; ν: kinematik viskozite (cSt), T: sıcaklık (K)" },
      ],
    },
    {
      title: "Yağlama Sistemi",
      formulas: [
        { name: "Yağ Debisi", formula: "Q = (BHP × SLOC) / (ρ × 10⁶)", variables: "SLOC: özgül yağ tüketimi (g/kW·h), ρ: yağ yoğunluğu (kg/m³)" },
        { name: "Yağ Film Kalınlığı", formula: "h_min = f(μ, N, W, R)", variables: "μ: viskozite, N: devir, W: yük, R: yarıçap" },
      ],
    },
    {
      title: "Soğutma Sistemi",
      formulas: [
        { name: "Isı Atım Miktarı", formula: "Q̇ = ṁ·c_p·ΔT", variables: "ṁ: kütle debisi (kg/s), c_p: özgül ısı (kJ/kg·K), ΔT: sıcaklık farkı" },
        { name: "Soğutma Suyu Debisi", formula: "ṁ = Q̇ / (c_p × ΔT)", variables: "Tipik ΔT: HT devresi 5–8°C, LT devresi 10–15°C" },
      ],
    },
  ],
  auxiliary: [
    {
      title: "Jeneratör Hesapları",
      formulas: [
        { name: "Elektrik Gücü", formula: "P = √3 × V × I × cos(φ)", variables: "V: hat gerilimi (V), I: hat akımı (A), cos(φ): güç faktörü" },
        { name: "Frekans-Devir İlişkisi", formula: "f = (p × n) / 60", variables: "f: frekans (Hz), p: kutup çifti sayısı, n: devir (rpm)" },
        { name: "Jeneratör Verimi", formula: "η = P_elektrik / P_mekanik", variables: "Tipik: %92–96" },
      ],
    },
    {
      title: "Kazan Hesapları",
      formulas: [
        { name: "Kazan Verimi", formula: "η = (ṁ_buhar × Δh) / (ṁ_yakıt × H_u)", variables: "Δh: entalpi farkı (kJ/kg), H_u: yakıtın alt ısıl değeri" },
        { name: "Buhar Üretimi", formula: "ṁ_buhar = Q̇ / Δh", variables: "Q̇: kazana verilen ısı (kW), Δh: buharlaşma entalpisi" },
      ],
    },
    {
      title: "Separatör",
      formulas: [
        { name: "Stokes Yasası (Ayrışma Hızı)", formula: "v = d²·(ρ_w − ρ_o)·g / (18·μ)", variables: "d: parçacık çapı, ρ: yoğunluklar, μ: viskozite" },
        { name: "Separatör Kapasitesi", formula: "Q = K × n² × r²", variables: "K: sabit, n: devir, r: disk yarıçapı" },
      ],
    },
  ],
  "fuel-technology": [
    {
      title: "Yakıt Özellikleri",
      formulas: [
        { name: "CCAI (Aromatiklik İndeksi)", formula: "CCAI = D − 81,703·log(log(ν₅₀ + 0,85)) − 483,5", variables: "D: yoğunluk 15°C (kg/m³), ν₅₀: 50°C kinematik viskozite (cSt)" },
        { name: "Yakıt Isıl Değeri", formula: "H_u ≈ 46,704 − 8,802·d² + 3,167·d", variables: "d: 15°C yoğunluk (kg/L), sonuç MJ/kg" },
        { name: "Viskozite Dönüşümü", formula: "1 cSt = 1 mm²/s", variables: "Redwood No.1 (s) ≈ 4,05 × cSt (yaklaşık)" },
      ],
    },
    {
      title: "Yakıt Arıtma",
      formulas: [
        { name: "Isıtma Gücü", formula: "Q̇ = ṁ·c_p·ΔT", variables: "ṁ: yakıt debisi, c_p: özgül ısı (~2 kJ/kg·K HFO), ΔT: sıcaklık artışı" },
        { name: "Settling Tank Süresi", formula: "t ≥ 24 saat (ISO 8217)", variables: "Tank sıcaklığı: 70°C (HFO), yerçekimiyle su/katı çökmesi" },
      ],
    },
  ],
  "cooling-hvac": [
    {
      title: "Soğutma Çevrimi",
      formulas: [
        { name: "COP (Soğutma)", formula: "COP = Q_L / W_comp", variables: "Q_L: soğutma kapasitesi (kW), W_comp: kompresör işi (kW)" },
        { name: "COP (Isı Pompası)", formula: "COP_HP = Q_H / W_comp = COP_soğutma + 1", variables: "Q_H: ısıtma kapasitesi" },
        { name: "Soğutma Kapasitesi", formula: "Q̇ = ṁ × (h₁ − h₄)", variables: "ṁ: soğutucu akışkan debisi, h: entalpi değerleri (kJ/kg)" },
        { name: "Kompresör İşi", formula: "W = ṁ × (h₂ − h₁)", variables: "h₂: kompresör çıkışı, h₁: kompresör girişi entalpi" },
      ],
    },
    {
      title: "Klima Hesapları",
      formulas: [
        { name: "Soğutma Yükü", formula: "Q = U·A·ΔT + Q_hava + Q_iç", variables: "U: ısı geçiş katsayısı, Q_hava: taze hava yükü, Q_iç: iç ısı kaynakları" },
        { name: "Nem Alma Kapasitesi", formula: "ṁ_w = ṁ_a × (ω₁ − ω₂)", variables: "ṁ_a: hava debisi, ω: özgül nem (kg_su/kg_kuru_hava)" },
      ],
    },
  ],
  electrical: [
    {
      title: "Elektrik Temel",
      formulas: [
        { name: "Ohm Yasası", formula: "V = I × R", variables: "V: gerilim (V), I: akım (A), R: direnç (Ω)" },
        { name: "Üç Fazlı Güç", formula: "P = √3 × V_L × I_L × cos(φ)", variables: "V_L: hat gerilimi, I_L: hat akımı, cos(φ): güç faktörü" },
        { name: "Reaktif Güç", formula: "Q = √3 × V_L × I_L × sin(φ)", variables: "Birim: VAR (Volt-Amper Reaktif)" },
        { name: "Görünür Güç", formula: "S = √(P² + Q²) = √3 × V_L × I_L", variables: "Birim: VA (Volt-Amper)" },
      ],
    },
    {
      title: "Koruma ve Kablo",
      formulas: [
        { name: "Kısa Devre Akımı", formula: "I_sc = V / Z_toplam", variables: "Z: empedans (primer+trafo+kablo)" },
        { name: "Gerilim Düşümü", formula: "ΔV = I × (R·cos(φ) + X·sin(φ)) × L × 2", variables: "R: birim direnç (Ω/m), X: birim reaktans, L: kablo uzunluğu" },
        { name: "İzolasyon Direnci", formula: "R_iz ≥ (V_nominal + 1000) / 1000 MΩ", variables: "Minimum: 1 MΩ (SOLAS/IEC 60092)" },
      ],
    },
  ],
  automation: [
    {
      title: "Ölçme ve Sensörler",
      formulas: [
        { name: "Doğruluk", formula: "Hata (%) = ((Ölçülen − Gerçek) / Gerçek) × 100", variables: "Kabul: ±0,5% (sıcaklık), ±1% (basınç), ±2% (debi)" },
        { name: "Termokupl EMF", formula: "V = S × ΔT", variables: "S: Seebeck katsayısı (μV/°C), ΔT: sıcaklık farkı" },
        { name: "RTD Direnci", formula: "R(T) = R₀ × (1 + αT)", variables: "R₀: 0°C direnci (Pt100 → 100Ω), α: sıcaklık katsayısı" },
      ],
    },
    {
      title: "Kontrol Sistemleri",
      formulas: [
        { name: "PID Çıkışı", formula: "u(t) = Kp·e + Ki·∫e·dt + Kd·de/dt", variables: "e: hata, Kp: oransal, Ki: integral, Kd: türevsel kazanç" },
        { name: "4-20 mA Dönüşüm", formula: "I = 4 + (16 × (X − X_min) / (X_max − X_min))", variables: "X: ölçülen değer, I: çıkış akımı (mA)" },
      ],
    },
  ],
  "engine-room-ops": [
    {
      title: "Operasyon Parametreleri",
      formulas: [
        { name: "Yakıt Tüketim Oranı", formula: "FC_rate = FC_toplam / Seyir süresi", variables: "Birim: ton/gün veya ton/saat" },
        { name: "Kalan Yakıt Tahmini", formula: "Menzil (saat) = Yakıt_stok / FC_rate", variables: "FC_rate: saatlik tüketim (ton/saat)" },
        { name: "Yağ Tüketimi", formula: "SLOC = Yağ tüketimi (g/h) / BHP (kW)", variables: "Birim: g/kW·h, normal: 0,6–1,2 g/kW·h" },
      ],
    },
    {
      title: "Devreye Alma",
      formulas: [
        { name: "Isınma Süresi (Ana Makine)", formula: "t_ısınma ≥ 30 dk (Jacket water → 60°C)", variables: "Turning gear: min 1 saat döndürülmeli" },
        { name: "Yağ Basıncı Kontrolü", formula: "P_yağ ≥ P_min (üretici değeri)", variables: "Tipik: 3–5 bar (düşük devirde), 5–8 bar (tam yükte)" },
      ],
    },
  ],
  maintenance: [
    {
      title: "Bakım Planlama",
      formulas: [
        { name: "MTBF", formula: "MTBF = Toplam çalışma süresi / Arıza sayısı", variables: "Birim: saat — yüksek olan daha güvenilir" },
        { name: "MTTR", formula: "MTTR = Toplam onarım süresi / Onarım sayısı", variables: "Birim: saat — düşük olan daha iyi bakım göstergesi" },
        { name: "Kullanılabilirlik", formula: "A = MTBF / (MTBF + MTTR)", variables: "A: availability oranı (0–1); hedef ≥ 0,95" },
        { name: "Güvenilirlik", formula: "R(t) = e^(−t/MTBF)", variables: "R: t süresinde arızasız çalışma olasılığı" },
      ],
    },
    {
      title: "Yağ Analizi",
      formulas: [
        { name: "TBN (Total Base Number)", formula: "TBN limiti = üretici tavsiyesi (genellikle min 20 mg KOH/g)", variables: "Düşük TBN: asit nötralizasyon kapasitesi azalmış" },
        { name: "Demir (Fe) Konsantrasyonu", formula: "Fe_limit ≤ 100 ppm (normal aşınma)", variables: "> 150 ppm: anormal aşınma, kontrol gerekli" },
      ],
    },
  ],
  "engine-room-safety": [
    {
      title: "Yangın Güvenliği",
      formulas: [
        { name: "Yangın Üçgeni", formula: "Yakıt + Oksijen + Isı = Yangın", variables: "Bir elemanın kaldırılması yangını söndürür" },
        { name: "CO₂ Miktarı (Hacimlere Göre)", formula: "m_CO₂ = V_hacim × 0,56 kg/m³ (min %40)", variables: "V: korunan hacim (m³), SOLAS II-2/Reg.10" },
        { name: "Köpük Miktarı", formula: "V_köpük = A × t × application_rate", variables: "A: alan (m²), t: süre (dk), rate: L/m²·dk" },
      ],
    },
    {
      title: "Patlama Riski",
      formulas: [
        { name: "LEL/UEL", formula: "Patlama Aralığı: LEL < konsantrasyon < UEL", variables: "Yakıt buharı: LEL ~%1, UEL ~%6 (hacimce)" },
        { name: "Parlama Noktası", formula: "T_flash ≥ 60°C (SOLAS gereği yakıt)", variables: "HFO: ~65°C, MGO: ~60°C (minimum gereksinim)" },
      ],
    },
  ],
  "environment-machine": [
    {
      title: "Emisyon Hesapları",
      formulas: [
        { name: "CO₂ Emisyonu", formula: "E_CO₂ = FC × C_f", variables: "FC: yakıt tüketimi (ton), C_f: karbon faktörü (HFO: 3,114, MDO: 3,206 t-CO₂/t-yakıt)" },
        { name: "SOx Emisyonu", formula: "E_SOx ∝ S_yakıt × FC", variables: "S_yakıt: yakıt kükürt oranı (%, m/m)" },
        { name: "NOx Emisyonu", formula: "E_NOx = f(T_yanma, λ, t_yanma)", variables: "Yanma sıcaklığı, hava fazlalığı ve yanma süresiyle orantılı" },
      ],
    },
    {
      title: "Atık Yönetimi",
      formulas: [
        { name: "OWS Çıkış Limiti", formula: "Yağ konsantrasyonu ≤ 15 ppm", variables: "MARPOL Annex I: Oily Water Separator çıkış standardı" },
        { name: "Sewage Arıtma", formula: "BOD₅ çıkış ≤ 25 mg/L", variables: "MARPOL Annex IV: atık su arıtma çıkış kalitesi" },
      ],
    },
  ],
  erm: [
    {
      title: "Risk Değerlendirme",
      formulas: [
        { name: "Risk Seviyesi", formula: "Risk = Olasılık × Şiddet", variables: "5×5 matris: Düşük (1–4), Orta (5–12), Yüksek (15–25)" },
        { name: "Risk Azaltma Faktörü", formula: "RRF = Risk_öncesi / Risk_sonrası", variables: "RRF > 1: risk azaltma önlemi etkili" },
      ],
    },
    {
      title: "İnsan Faktörü",
      formulas: [
        { name: "Yorgunluk İndeksi", formula: "FI = f(çalışma saatleri, dinlenme, uyku kalitesi)", variables: "STCW: min 10 saat dinlenme/24 saat, min 77 saat/7 gün" },
        { name: "Vardiya Etkinliği", formula: "η_vardiya = Tamamlanan görev / Planlanan görev", variables: "Düşük oran: iş yükü dengesizliği veya yetkinlik eksikliği" },
      ],
    },
  ],
  "energy-efficiency": [
    {
      title: "Enerji Verimliliği Göstergeleri",
      formulas: [
        { name: "EEDI", formula: "EEDI = (CO₂ emisyonu) / (Kapasite × Hız)", variables: "Birim: g CO₂/(ton·mil), yeni gemiler için zorunlu üst limit" },
        { name: "EEXI", formula: "EEXI = (P_ME × C_f × SFC_ME) / (DWT × V_ref)", variables: "Mevcut gemiler için (2023 sonrası zorunlu)" },
        { name: "CII (Yıllık)", formula: "CII = CO₂_toplam / (DWT × D_toplam)", variables: "D: yıllık toplam seyir mesafesi (deniz mili), Derecelendirme: A–E" },
        { name: "AER", formula: "AER = CO₂ / (DWT × Distance)", variables: "Annual Efficiency Ratio — CII hesabında kullanılır" },
      ],
    },
    {
      title: "Atık Isı Geri Kazanım",
      formulas: [
        { name: "WHR Gücü", formula: "P_WHR = ṁ_egzoz × c_p × ΔT × η", variables: "ṁ_egzoz: egzoz debisi, ΔT: sıcaklık düşüşü, η: WHR verimi" },
        { name: "SEEMP Tasarruf", formula: "Tasarruf (%) = (FC_öncesi − FC_sonrası) / FC_öncesi × 100", variables: "SEEMP: Ship Energy Efficiency Management Plan" },
      ],
    },
  ],
};

export default function MachineTopicFormulasPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const formulas = topicSlug ? topicFormulas[topicSlug] : null;

  if (!topic || !formulas) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = topic.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Derslere Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}>
              <TopicIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sigma className="h-3.5 w-3.5" /> Formüller
              </p>
            </div>
          </div>
        </header>

        {formulas.map((category, catIdx) => (
          <section key={catIdx} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            <div className="grid gap-3">
              {category.formulas.map((f, fIdx) => (
                <Card key={fIdx} className="bg-card/80 backdrop-blur border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">{f.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="bg-background rounded-lg p-3 font-mono text-base text-center text-primary">
                      {f.formula}
                    </div>
                    <p className="text-xs text-muted-foreground">{f.variables}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <div className="flex justify-center pt-4">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
