import { ShieldAlert } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Makine Dairesi Güvenliği — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const engineRoomSafety: CourseTopic = {
  key: "engine-room-safety",
  title: "Makine Dairesi Güvenliği",
  icon: ShieldAlert,
  accent: "from-rose-500 via-red-500 to-orange-500",
  group: "machine",
  intro:
    "Yangın ve patlama riski, sabit CO₂ söndürme, havalandırma ve kapalı alan " +
    "girişi güvenliği. Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "fire-triangle",
      name: "Yangın Üçgeni",
      group: "Yangın Güvenliği",
      formula: "Yakıt + Oksijen + Isı = Yangın",
      variables: [
        { symbol: "Yakıt", label: "Yanıcı madde" },
        { symbol: "Oksijen", label: "Yükseltgen (hava)" },
        { symbol: "Isı", label: "Tutuşma enerjisi" },
      ],
      source: { code: "Yangın üçgeni — yanma prensibi", detail: "Bir elemanın kaldırılması yangını söndürür" },
      note: "Üç elemanın varlığı 1 (var) / 0 (yok) olarak girilir; oksijen ortam yüzdesi alınır. Üçü birden mevcutsa yangın riski oluşur.",
      inputs: [
        { key: "fuel", label: "Yanıcı Madde (1=var, 0=yok)", unit: "", placeholder: "1" },
        { key: "o2", label: "Oksijen Oranı", unit: "%", placeholder: "20.9" },
        { key: "heat", label: "Tutuşma Kaynağı (1=var, 0=yok)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        const fuelOk = v.fuel >= 1;
        const oxyOk = v.o2 >= 15; // ~%15 altında çoğu yanma sürmez
        const heatOk = v.heat >= 1;
        const risk = fuelOk && oxyOk && heatOk;
        const present = [fuelOk && "Yakıt", oxyOk && "Oksijen", heatOk && "Isı"].filter(Boolean).join(" + ") || "—";
        return [
          { label: "Mevcut Elemanlar", value: present },
          { label: "Yangın Riski", value: risk ? "VAR (üçgen tamam)" : "Yok (eleman eksik)" },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Miktarı (Hacme Göre)",
      group: "Yangın Güvenliği",
      formula: "mCO₂ = (Vhacim × %40) / 0,56 m³/kg",
      variables: [
        { symbol: "Vhacim", label: "Korunan hacim", unit: "m³" },
        { symbol: "%40", label: "Minimum serbest CO₂ hacim oranı", unit: "—" },
        { symbol: "0,56", label: "CO₂ özgül hacmi", unit: "m³/kg" },
        { symbol: "mCO₂", label: "Gerekli CO₂ kütlesi", unit: "kg" },
      ],
      source: { code: "Sabit CO₂ söndürme sistemi (SOLAS Ch. II-2 / FSS Code)" },
      note: "Makine dairesi için serbest CO₂ hacmi ≥ brüt hacmin %40'ı; CO₂ özgül hacmi 0,56 m³/kg. Standart tüp kapasitesi 45 kg alınır; tüp sayısı yukarı yuvarlanır.",
      inputs: [
        { key: "vol", label: "Korunan Hacim", unit: "m³", placeholder: "2000" },
        { key: "ratio", label: "Serbest CO₂ Hacim Oranı", unit: "%", placeholder: "40" },
      ],
      calculate: (v) => {
        const mass = (v.vol * (v.ratio / 100)) / 0.56;
        const bottles = Math.ceil(mass / 45); // 45 kg standart tüp
        return [
          { label: "Gerekli CO₂ Miktarı", value: `${mass.toFixed(0)} kg` },
          { label: "Gerekli Tüp Sayısı (45 kg)", value: `${bottles} adet` },
        ];
      },
    },
    {
      id: "foam-quantity",
      name: "Köpük Miktarı",
      group: "Yangın Güvenliği",
      formula: "Vköpük = A × t × applicationrate",
      variables: [
        { symbol: "A", label: "Korunan alan", unit: "m²" },
        { symbol: "t", label: "Application time", unit: "dk" },
        { symbol: "applicationrate", label: "Uygulama debisi", unit: "L/m²·dk" },
      ],
      source: { code: "Sabit köpük söndürme sistemi tasarımı (SOLAS / FSS Code)" },
      note: "Köpük solüsyonu hacmi = alan × süre × uygulama debisi (L olarak verilir; ÷1000 = m³).",
      inputs: [
        { key: "a", label: "Korunan Alan (A)", unit: "m²", placeholder: "300" },
        { key: "t", label: "Uygulama Süresi (t)", unit: "dk", placeholder: "5" },
        { key: "rate", label: "Uygulama Debisi", unit: "L/m²·dk", placeholder: "6.5" },
      ],
      calculate: (v) => {
        const vol = v.a * v.t * v.rate;
        return [
          { label: "Köpük Solüsyonu", value: `${vol.toFixed(0)} L` },
          { label: "Köpük Solüsyonu", value: `${(vol / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "engine-room-ventilation",
      name: "Havalandırma Debisi",
      group: "Yangın Güvenliği",
      formula: "Q̇hava = Pmotor × 2,5 ; Hava Değişimi = Q̇hava / Vhacim",
      variables: [
        { symbol: "Pmotor", label: "Motor toplam gücü", unit: "kW" },
        { symbol: "Vhacim", label: "Makine dairesi hacmi", unit: "m³" },
        { symbol: "Q̇hava", label: "Yanma havası ihtiyacı", unit: "m³/saat" },
      ],
      source: { code: "Makine dairesi havalandırma — yanma havası gereksinimi", detail: "Yaklaşık ~2,5 m³/kW·saat hava ihtiyacı" },
      note: "Hesap yaklaşıktır; üretici/klas kuralları esas alınmalıdır.",
      inputs: [
        { key: "p", label: "Motor Toplam Gücü", unit: "kW", placeholder: "15000" },
        { key: "vol", label: "Makine Dairesi Hacmi", unit: "m³", placeholder: "2500" },
      ],
      calculate: (v) => {
        // Yaklaşık: motor başına ~2.5 m³/kW·h hava gereksinimi
        const airForCombustion = v.p * 2.5; // m³/saat
        const ventChanges = airForCombustion / v.vol;
        return [
          { label: "Yanma Havası İhtiyacı", value: `${airForCombustion.toFixed(0)} m³/saat` },
          { label: "Hava Değişim Sayısı", value: `${ventChanges.toFixed(1)} /saat` },
        ];
      },
    },
    {
      id: "lel-uel",
      name: "LEL / UEL (Patlama Aralığı)",
      group: "Patlama Riski",
      formula: "LEL < konsantrasyon < UEL",
      variables: [
        { symbol: "LEL", label: "Alt patlama sınırı (yakıt buharı ~%1)", unit: "% hacim" },
        { symbol: "UEL", label: "Üst patlama sınırı (yakıt buharı ~%6)", unit: "% hacim" },
      ],
      source: { code: "Patlama sınırları (LEL/UEL) — yanıcı buhar konsantrasyonu" },
      note: "Ölçülen buhar konsantrasyonu LEL ile UEL arasında ise patlayıcı (tehlikeli) karışım vardır.",
      inputs: [
        { key: "conc", label: "Ölçülen Konsantrasyon", unit: "% hacim", placeholder: "3" },
        { key: "lel", label: "Alt Patlama Sınırı (LEL)", unit: "% hacim", placeholder: "1" },
        { key: "uel", label: "Üst Patlama Sınırı (UEL)", unit: "% hacim", placeholder: "6" },
      ],
      calculate: (v) => {
        let status: string;
        if (v.conc < v.lel) status = "Fakir (LEL altı) — tutuşmaz";
        else if (v.conc > v.uel) status = "Zengin (UEL üstü) — tutuşmaz";
        else status = "PATLAYICI ARALIK — TEHLİKELİ";
        return [
          { label: "Konsantrasyon", value: `${v.conc} % hacim` },
          { label: "Değerlendirme", value: status },
        ];
      },
    },
    {
      id: "flash-point",
      name: "Parlama Noktası",
      group: "Patlama Riski",
      formula: "Tflash ≥ 60°C (SOLAS gereği yakıt)",
      variables: [
        { symbol: "Tflash", label: "Parlama noktası", unit: "°C" },
      ],
      source: { code: "Yakıt parlama noktası gerekliliği (SOLAS II-2/Reg.4)", detail: "HFO: ~65°C, MGO: ~60°C (minimum gereksinim)" },
      note: "Yakıt parlama noktası ≥ 60°C olmalıdır (acil jeneratör gibi istisnalar ≥ 43°C). Ölçülen değerin sınıra marjı hesaplanır.",
      inputs: [
        { key: "tflash", label: "Ölçülen Parlama Noktası", unit: "°C", placeholder: "65" },
        { key: "limit", label: "Gereken Minimum", unit: "°C", placeholder: "60" },
      ],
      calculate: (v) => {
        const margin = v.tflash - v.limit;
        return [
          { label: "Sınıra Marj", value: `${margin.toFixed(1)} °C` },
          { label: "Uygunluk", value: margin >= 0 ? "UYGUN" : "UYGUNSUZ (sınır altı)" },
        ];
      },
    },
    {
      id: "enclosed-space-oxygen",
      name: "Kapalı Alan Oksijen / Gaz Kontrolü",
      group: "Patlama Riski",
      formula: "O₂ ≥ 20,9% ; H₂S < 10 ppm ; CO < 25 ppm ; LEL < %1",
      variables: [
        { symbol: "O₂", label: "Oksijen oranı", unit: "%" },
        { symbol: "H₂S", label: "Hidrojen sülfür", unit: "ppm" },
        { symbol: "CO", label: "Karbon monoksit", unit: "ppm" },
        { symbol: "LEL", label: "Alt patlama sınırı yüzdesi", unit: "%" },
      ],
      source: { code: "Kapalı alana giriş — atmosfer ölçüm limitleri (SOLAS / IMO Res.A.1050)" },
      note: "Tüm limitler sağlanmadan kapalı alana giriş yapılmamalıdır.",
      inputs: [
        { key: "o2", label: "Ölçülen O₂", unit: "%", placeholder: "20.8" },
        { key: "h2s", label: "H₂S", unit: "ppm", placeholder: "0" },
        { key: "co", label: "CO", unit: "ppm", placeholder: "5" },
        { key: "lel", label: "LEL", unit: "%", placeholder: "0" },
      ],
      calculate: (v) => {
        const o2Ok = v.o2 >= 20.9;
        const h2sOk = v.h2s < 10;
        const coOk = v.co < 25;
        const lelOk = v.lel < 1;
        const safe = o2Ok && h2sOk && coOk && lelOk;
        return [
          { label: "O₂ Durumu", value: `${v.o2}% → ${o2Ok ? "Uygun" : "YETERSİZ"}` },
          { label: "H₂S Durumu", value: `${v.h2s} ppm → ${h2sOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "CO Durumu", value: `${v.co} ppm → ${coOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "LEL Durumu", value: `${v.lel}% → ${lelOk ? "Uygun" : "TEHLİKELİ"}` },
          { label: "Genel Değerlendirme", value: safe ? "GİRİLEBİLİR" : "GİRİLEMEZ" },
        ];
      },
    },
  ],
};
