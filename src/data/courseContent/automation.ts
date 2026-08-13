import { Cpu } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Elektronik, Ölçme ve Otomasyon — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const automation: CourseTopic = {
  key: "automation",
  title: "Elektronik, Ölçme ve Otomasyon",
  icon: Cpu,
  accent: "from-violet-500 via-purple-500 to-fuchsia-500",
  group: "machine",
  intro:
    "Sensörler, ölçme cihazları ve PID kontrol sistemleri; sinyal dönüşümü ve " +
    "ölçüm doğruluğu. Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "measurement-accuracy",
      name: "Doğruluk / Hata Hesabı",
      group: "Ölçme ve Sensörler",
      formula: "Hata (%) = ((Ölçülen − Gerçek) / Gerçek) × 100",
      variables: [
        { symbol: "Ölçülen", label: "Cihazın gösterdiği değer" },
        { symbol: "Gerçek", label: "Referans (gerçek) değer" },
        { symbol: "Span", label: "Ölçüm aralığı (tam skala)" },
      ],
      source: { code: "Ölçme tekniği — doğruluk/hata tanımı", detail: "Kabul: ±0,5% (sıcaklık), ±1% (basınç), ±2% (debi)" },
      inputs: [
        { key: "measured", label: "Ölçülen Değer", unit: "", placeholder: "102" },
        { key: "actual", label: "Gerçek Değer", unit: "", placeholder: "100" },
        { key: "span", label: "Ölçüm Aralığı (Span)", unit: "", placeholder: "200" },
      ],
      calculate: (v) => {
        const absError = Math.abs(v.measured - v.actual);
        const relError = (absError / v.actual) * 100;
        const spanError = (absError / v.span) * 100;
        return [
          { label: "Mutlak Hata", value: `${absError.toFixed(3)}` },
          { label: "Bağıl Hata", value: `${relError.toFixed(2)}%` },
          { label: "Span Hatası", value: `${spanError.toFixed(2)}%` },
        ];
      },
    },
    {
      id: "thermocouple-emf",
      name: "Termokupl EMF → Sıcaklık",
      group: "Ölçme ve Sensörler",
      formula: "V = S × ΔT",
      variables: [
        { symbol: "V", label: "Termokupl gerilimi (EMF)", unit: "mV" },
        { symbol: "S", label: "Seebeck katsayısı", unit: "μV/°C" },
        { symbol: "ΔT", label: "Temperature difference", unit: "°C" },
      ],
      source: { code: "Seebeck etkisi — termokupl ölçümü", detail: "K-tipi termokupl ≈ 40,7 µV/°C" },
      note: "K-tipi yaklaşık lineer kabul edilir: ΔT = EMF (mV) / 0,0407 (mV/°C).",
      inputs: [
        { key: "emf", label: "Ölçülen EMF", unit: "mV", placeholder: "12.2" },
      ],
      calculate: (v) => {
        // K-tipi yaklaşık lineer: ~40.7 µV/°C → 0.0407 mV/°C → T ≈ EMF / 0.0407
        const temp = v.emf / 0.0407;
        return [{ label: "Tahmini Sıcaklık", value: `${temp.toFixed(0)} °C` }];
      },
    },
    {
      id: "rtd-resistance",
      name: "RTD Sıcaklık Hesabı (Pt100)",
      group: "Ölçme ve Sensörler",
      formula: "R(T) = R₀ × (1 + α·T)",
      variables: [
        { symbol: "R(T)", label: "Ölçülen direnç", unit: "Ω" },
        { symbol: "R₀", label: "0°C direnci (Pt100 → 100Ω)", unit: "Ω" },
        { symbol: "α", label: "Sıcaklık katsayısı", unit: "1/°C" },
        { symbol: "T", label: "Sıcaklık", unit: "°C" },
      ],
      source: { code: "RTD/Pt100 direnç-sıcaklık bağıntısı (IEC 60751)", detail: "α = 0,00385 1/°C (standart Pt100)" },
      inputs: [
        { key: "rt", label: "Ölçülen Direnç (Rt)", unit: "Ω", placeholder: "138.5" },
        { key: "r0", label: "R₀ (0°C direnci)", unit: "Ω", placeholder: "100" },
        { key: "alpha", label: "α katsayısı", unit: "1/°C", placeholder: "0.00385" },
      ],
      calculate: (v) => {
        const dt = (v.rt / v.r0 - 1) / v.alpha;
        return [{ label: "Sıcaklık", value: `${dt.toFixed(1)} °C` }];
      },
    },
    {
      id: "pid-output",
      name: "PID Kontrolör Çıkışı",
      group: "Kontrol Sistemleri",
      formula: "u(t) = Kp·e + Ki·∫e·dt + Kd·de/dt",
      variables: [
        { symbol: "e", label: "Hata (SP − PV)" },
        { symbol: "Kp", label: "Oransal kazanç" },
        { symbol: "Ki", label: "İntegral kazanç" },
        { symbol: "Kd", label: "Türevsel kazanç" },
      ],
      source: { code: "PID kontrol teorisi (oransal-integral-türevsel)" },
      note: "Hesapta bias %50 alınır ve çıkış 0–100% aralığına sınırlanır.",
      inputs: [
        { key: "sp", label: "Set Değeri (SP)", unit: "", placeholder: "50" },
        { key: "pv", label: "Proses Değeri (PV)", unit: "", placeholder: "45" },
        { key: "kp", label: "Oransal Kazanç (Kp)", unit: "", placeholder: "2" },
        { key: "ki", label: "İntegral Kazanç (Ki)", unit: "", placeholder: "0.5" },
        { key: "dt", label: "Örnekleme Süresi", unit: "s", placeholder: "1" },
      ],
      calculate: (v) => {
        const error = v.sp - v.pv;
        const pOut = v.kp * error;
        const iOut = v.ki * error * v.dt;
        const total = Math.min(100, Math.max(0, 50 + pOut + iOut)); // Bias = %50
        return [
          { label: "Hata (e)", value: `${error.toFixed(2)}` },
          { label: "P Çıkışı", value: `${pOut.toFixed(2)}` },
          { label: "Kontrolör Çıkışı", value: `${total.toFixed(1)}%` },
        ];
      },
    },
    {
      id: "current-loop-4-20ma",
      name: "4-20 mA Dönüşüm",
      group: "Kontrol Sistemleri",
      formula: "I = 4 + (16 × (X − Xmin) / (Xmax − Xmin))",
      variables: [
        { symbol: "X", label: "Ölçülen değer" },
        { symbol: "Xmin", label: "Aralık alt sınırı" },
        { symbol: "Xmax", label: "Aralık üst sınırı" },
        { symbol: "I", label: "Çıkış akımı", unit: "mA" },
      ],
      source: { code: "Endüstriyel 4-20 mA akım döngüsü standardı" },
      inputs: [
        { key: "x", label: "Ölçülen Değer", unit: "", placeholder: "75" },
        { key: "xmin", label: "Aralık Min", unit: "", placeholder: "0" },
        { key: "xmax", label: "Aralık Max", unit: "", placeholder: "100" },
      ],
      calculate: (v) => {
        const i = 4 + (16 * (v.x - v.xmin) / (v.xmax - v.xmin));
        const percent = ((v.x - v.xmin) / (v.xmax - v.xmin)) * 100;
        return [
          { label: "Çıkış Akımı", value: `${i.toFixed(2)} mA` },
          { label: "Yüzde", value: `${percent.toFixed(1)}%` },
        ];
      },
    },
  ],
};
