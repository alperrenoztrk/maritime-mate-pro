import { ClipboardCheck } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Makine Dairesi Operasyonları — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const engineRoomOps: CourseTopic = {
  key: "engine-room-ops",
  title: "Makine Dairesi Operasyonları",
  icon: ClipboardCheck,
  accent: "from-emerald-500 via-teal-500 to-cyan-500",
  group: "machine",
  intro:
    "Yakıt ve yağ tüketim takibi, devreye alma ve operasyon parametreleri. " +
    "Her formülün altında, aynı formülü kullanan hesaplayıcı yer alır.",
  entries: [
    {
      id: "fuel-consumption-rate",
      name: "Yakıt Tüketim Oranı",
      group: "Operasyon Parametreleri",
      formula: "FCrate = FCtoplam / Seyir süresi",
      variables: [
        { symbol: "FCtoplam", label: "Toplam yakıt tüketimi", unit: "ton" },
        { symbol: "Seyir süresi", label: "Geçen süre", unit: "gün veya saat" },
        { symbol: "FCrate", label: "Tüketim hızı", unit: "ton/gün veya ton/saat" },
      ],
      source: { code: "Operasyonel yakıt tüketim takibi" },
    },
    {
      id: "remaining-fuel-range",
      name: "Kalan Yakıt Menzili",
      group: "Operasyon Parametreleri",
      formula: "Menzil = Yakıtstok / FCrate",
      variables: [
        { symbol: "Yakıtstok", label: "Mevcut yakıt stoku", unit: "ton" },
        { symbol: "FCrate", label: "Tüketim hızı", unit: "ton/gün" },
        { symbol: "Menzil", label: "Tahmini çalışma süresi", unit: "gün" },
      ],
      source: { code: "Operasyonel yakıt planlaması" },
      inputs: [
        { key: "stock", label: "Yakıt Stoku", unit: "ton", placeholder: "500" },
        { key: "rate", label: "Tüketim Hızı", unit: "ton/gün", placeholder: "30" },
      ],
      calculate: (v) => {
        const days = v.stock / v.rate;
        return [
          { label: "Tahmini Menzil", value: `${days.toFixed(1)} gün` },
          { label: "Saat", value: `${(days * 24).toFixed(0)} saat` },
        ];
      },
    },
    {
      id: "lube-oil-consumption",
      name: "Yağ Tüketimi Takibi",
      group: "Operasyon Parametreleri",
      formula: "SLOC = Yağ tüketimi (g/h) / BHP (kW)",
      variables: [
        { symbol: "SLOC", label: "Özgül yağ tüketimi", unit: "g/kW·h" },
        { symbol: "BHP", label: "Motor gücü", unit: "kW" },
        { symbol: "t", label: "Çalışma süresi", unit: "saat" },
      ],
      source: { code: "Özgül yağ tüketimi (SLOC) takibi", detail: "Normal: 0,6–1,2 g/kW·h" },
      inputs: [
        { key: "cylOil", label: "Silindir Yağı Tüketimi", unit: "g/kW·h", placeholder: "0.7" },
        { key: "bhp", label: "Motor Gücü", unit: "kW", placeholder: "15000" },
        { key: "hours", label: "Çalışma Süresi", unit: "saat", placeholder: "720" },
      ],
      calculate: (v) => {
        const consumption = (v.cylOil * v.bhp * v.hours) / 1e6; // ton
        const dailyRate = consumption / (v.hours / 24);
        return [
          { label: "Toplam Silindir Yağı", value: `${(consumption * 1000).toFixed(0)} kg` },
          { label: "Günlük Tüketim", value: `${(dailyRate * 1000).toFixed(1)} kg/gün` },
        ];
      },
    },
    {
      id: "startup-checklist-time",
      name: "Seyire Hazırlık Süresi",
      group: "Devreye Alma",
      formula: "tToplam = max(tönısıtma, tLO) + (nmotor·15 + njen·10) + 30 dk",
      variables: [
        { symbol: "tönısıtma", label: "Ön ısıtma süresi", unit: "dk" },
        { symbol: "tLO", label: "LO sirkülasyon süresi", unit: "dk" },
        { symbol: "nmotor", label: "Motor sayısı" },
        { symbol: "njen", label: "Jeneratör sayısı" },
      ],
      source: { code: "Makine dairesi seyire hazırlık prosedürü" },
      note: "Devreye alma süresi yaklaşıktır: motor başına 15 dk, jeneratör başına 10 dk, +30 dk kontrol.",
      inputs: [
        { key: "engines", label: "Motor Sayısı", unit: "", placeholder: "2" },
        { key: "gens", label: "Jeneratör Sayısı", unit: "", placeholder: "3" },
        { key: "preHeat", label: "Ön Isıtma Süresi", unit: "dakika", placeholder: "60" },
        { key: "loCirc", label: "LO Sirkülasyon", unit: "dakika", placeholder: "30" },
      ],
      calculate: (v) => {
        const totalPreheat = Math.max(v.preHeat, v.loCirc);
        const startupTime = v.engines * 15 + v.gens * 10; // dakika
        const total = totalPreheat + startupTime + 30; // +30 dk kontrol
        return [
          { label: "Ön Hazırlık", value: `${totalPreheat} dakika` },
          { label: "Start-up", value: `${startupTime} dakika` },
          { label: "Toplam Süre", value: `${total} dakika` },
        ];
      },
    },
    {
      id: "engine-warmup-time",
      name: "Motor Isınma Süresi",
      group: "Devreye Alma",
      formula: "t = (m · cp · ΔT) / Q̇ısıtıcı",
      variables: [
        { symbol: "m", label: "Motor blok kütlesi", unit: "kg" },
        { symbol: "cp", label: "Özgül ısı (çelik)", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Sıcaklık artışı", unit: "K" },
        { symbol: "Q̇ısıtıcı", label: "Isıtıcı gücü", unit: "kW" },
      ],
      source: { code: "Duyulur ısı bağıntısı — ana makine ön ısıtma", detail: "Turning gear: min 1 saat; jacket water → 60°C" },
      note: "Kütle ton girilir, hesapta kg'ye çevrilir (×1000).",
      inputs: [
        { key: "mass", label: "Motor Blok Kütlesi", unit: "ton", placeholder: "200" },
        { key: "cp", label: "Özgül Isı (çelik)", unit: "kJ/kg·K", placeholder: "0.5" },
        { key: "tStart", label: "Başlangıç Sıcaklığı", unit: "°C", placeholder: "20" },
        { key: "tTarget", label: "Hedef Sıcaklık", unit: "°C", placeholder: "60" },
        { key: "qHeater", label: "Isıtıcı Gücü", unit: "kW", placeholder: "150" },
      ],
      calculate: (v) => {
        const energy = v.mass * 1000 * v.cp * (v.tTarget - v.tStart);
        const timeH = energy / (v.qHeater * 3600);
        return [
          { label: "Gerekli Enerji", value: `${(energy / 3600).toFixed(0)} kWh` },
          { label: "Tahmini Isınma Süresi", value: `${(timeH * 60).toFixed(0)} dakika` },
        ];
      },
    },
    {
      id: "lube-oil-pressure-check",
      name: "Yağ Basıncı Kontrolü",
      group: "Devreye Alma",
      formula: "Pyağ ≥ Pmin (üretici değeri)",
      variables: [
        { symbol: "Pyağ", label: "Ölçülen yağ basıncı", unit: "bar" },
        { symbol: "Pmin", label: "Minimum izin verilen basınç", unit: "bar" },
        { symbol: "Palarm", label: "Alarm basıncı", unit: "bar" },
      ],
      source: { code: "Üretici yağlama sistemi limitleri", detail: "Tipik: 3–5 bar (düşük devirde), 5–8 bar (tam yükte)" },
      inputs: [
        { key: "pMeasured", label: "Ölçülen Basınç", unit: "bar", placeholder: "4.2" },
        { key: "pMin", label: "Minimum İzin", unit: "bar", placeholder: "2.5" },
        { key: "pMax", label: "Maksimum İzin", unit: "bar", placeholder: "6.0" },
        { key: "pAlarm", label: "Alarm Değeri", unit: "bar", placeholder: "2.0" },
      ],
      calculate: (v) => {
        const status = v.pMeasured < v.pAlarm ? "ALARM" : v.pMeasured < v.pMin ? "Düşük" : v.pMeasured > v.pMax ? "Yüksek" : "Normal";
        const margin = ((v.pMeasured - v.pAlarm) / v.pAlarm) * 100;
        return [
          { label: "Durum", value: status },
          { label: "Alarm Marjı", value: `${margin.toFixed(1)}%` },
          { label: "Aralık", value: `${v.pMin}–${v.pMax} bar` },
        ];
      },
    },
  ],
};
