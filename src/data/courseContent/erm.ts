import { Users } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Engine Resource Management (ERM) — tek kaynak ders içeriği.
 * Risk değerlendirme ve insan faktörü (yorgunluk, vardiya) göstergeleri ilgili
 * hesaplayıcılarla TEK listede birleştirildi; `calculate` taşıyan girdiler hem
 * Formüller hem Hesaplamalar sayfasında görünür.
 */
export const erm: CourseTopic = {
  key: "erm",
  title: "Engine Resource Management",
  icon: Users,
  accent: "from-indigo-500 via-blue-500 to-cyan-500",
  group: "machine",
  intro:
    "Makine dairesinde kaynak yönetimi: risk değerlendirme, yorgunluk yönetimi " +
    "ve vardiya etkinliği. Her formülün altında, aynı formülü kullanan " +
    "hesaplayıcı yer alır.",
  entries: [
    {
      id: "risk-level",
      name: "Risk Seviyesi",
      group: "Risk Değerlendirme",
      formula: "Risk = Likelihood × Severity",
      variables: [
        { symbol: "Likelihood", label: "Olay olma olasılığı (1–5)" },
        { symbol: "Severity", label: "Olayın sonuç şiddeti (1–5)" },
      ],
      source: { code: "5×5 risk matrisi: Düşük (1–4), Orta (5–9), Yüksek (10–15), Çok Yüksek (16–25)" },
      inputs: [
        { key: "prob", label: "Olasılık (1–5)", unit: "", placeholder: "3" },
        { key: "sev", label: "Şiddet (1–5)", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.prob * v.sev;
        const level = risk <= 4 ? "Low" : risk <= 9 ? "Orta" : risk <= 15 ? "Yüksek" : "Çok Yüksek";
        const color = risk <= 4 ? "Yeşil" : risk <= 9 ? "Sarı" : risk <= 15 ? "Turuncu" : "Kırmızı";
        return [
          { label: "Risk Puanı", value: `${risk}` },
          { label: "Risk Seviyesi", value: level },
          { label: "Risk Rengi", value: color },
        ];
      },
    },
    {
      id: "risk-reduction-factor",
      name: "Risk Azaltma Faktörü",
      group: "Risk Değerlendirme",
      formula: "RRF = Risköncesi / Risksonrası",
      variables: [
        { symbol: "Risköncesi", label: "Önlem öncesi risk puanı" },
        { symbol: "Risksonrası", label: "Önlem sonrası risk puanı" },
      ],
      source: { code: "Risk azaltma değerlendirmesi (RRF > 1: önlem etkili)" },
      note: "Önlem öncesi ve sonrası risk puanı girilir; RRF > 1 ise önlem etkilidir.",
      inputs: [
        { key: "before", label: "Önce Risk Puanı", unit: "", placeholder: "16" },
        { key: "after", label: "Sonra Risk Puanı", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        if (v.after <= 0) return [{ label: "Hata", value: "Sonraki risk puanı pozitif olmalı" }];
        const rrf = v.before / v.after;
        const redux = ((v.before - v.after) / v.before) * 100;
        return [
          { label: "Risk Azaltma Faktörü (RRF)", value: rrf.toFixed(2) },
          { label: "Risk Azalması", value: `${redux.toFixed(0)} %` },
          { label: "Değerlendirme", value: rrf > 1 ? "Önlem etkili" : "Önlem yetersiz" },
        ];
      },
    },
    {
      id: "ltif",
      name: "Kaza Frekans Oranı (LTIF)",
      group: "Risk Değerlendirme",
      formula: "LTIF = (Kayıp zamanlı kaza / Toplam çalışma saati) × 10⁶",
      variables: [
        { symbol: "LTI", label: "Kayıp zamanlı kaza sayısı" },
        { symbol: "H", label: "Toplam çalışma saati", unit: "saat" },
      ],
      source: { code: "Lost Time Injury Frequency (1 milyon çalışma saati başına)" },
      note: "Formül, hesaplayıcıdaki bağıntıdan türetilmiştir: LTIF = (LTI / H) × 1.000.000.",
      inputs: [
        { key: "lti", label: "Kayıp Zamanlı Kaza Sayısı", unit: "", placeholder: "2" },
        { key: "hours", label: "Toplam Çalışma Saati", unit: "saat", placeholder: "500000" },
      ],
      calculate: (v) => {
        const ltif = (v.lti / v.hours) * 1e6;
        const status = ltif < 1 ? "Çok İyi" : ltif < 3 ? "İyi" : ltif < 5 ? "Orta" : "Kötü";
        return [
          { label: "LTIF", value: ltif.toFixed(2) },
          { label: "Değerlendirme", value: status },
        ];
      },
    },
    {
      id: "fatigue-index",
      name: "Yorgunluk İndeksi",
      group: "İnsan Faktörü",
      formula: "FI = min(100, (Çalışma / Dinlenme) × Gün × 3)",
      variables: [
        { symbol: "Çalışma", label: "Günlük çalışma saati", unit: "saat" },
        { symbol: "Dinlenme", label: "Günlük dinlenme saati", unit: "saat" },
        { symbol: "Gün", label: "Ardışık çalışma günü", unit: "days" },
      ],
      source: { code: "STCW / MLC dinlenme süresi: min 10 saat/24 saat, min 77 saat/7 gün" },
      note: "İndeks bağıntısı hesaplayıcıdan türetilmiştir; MLC uyumu için çalışma ≤ 14 saat ve dinlenme ≥ 10 saat olmalıdır.",
      inputs: [
        { key: "workHours", label: "Günlük Çalışma", unit: "saat", placeholder: "14" },
        { key: "restHours", label: "Günlük Dinlenme", unit: "saat", placeholder: "10" },
        { key: "days", label: "Ardışık Çalışma Günü", unit: "days", placeholder: "14" },
      ],
      calculate: (v) => {
        const ratio = v.workHours / v.restHours;
        const fatigue = Math.min(100, ratio * v.days * 3);
        const status = fatigue < 30 ? "Low" : fatigue < 60 ? "Orta" : fatigue < 80 ? "Yüksek" : "Kritik";
        const mclCompliant = v.workHours <= 14 && v.restHours >= 10;
        return [
          { label: "Yorgunluk İndeksi", value: `${fatigue.toFixed(0)}%` },
          { label: "Risk Seviyesi", value: status },
          { label: "MLC Uyumu", value: mclCompliant ? "Uygun" : "UYUMSUZ" },
        ];
      },
    },
    {
      id: "watch-effectiveness",
      name: "Vardiya Etkinliği",
      group: "İnsan Faktörü",
      formula: "ηvardiya = max(0, 100 − Olay × 10 − max(0, GörevYükü − 4) × 5)",
      variables: [
        { symbol: "Personel", label: "Makine personeli", unit: "persons" },
        { symbol: "Vardiya", label: "Vardiya süresi", unit: "saat" },
        { symbol: "Görev", label: "Günlük rutin görev", unit: "adet" },
        { symbol: "Olay", label: "Aylık olay sayısı", unit: "adet" },
        { symbol: "GörevYükü", label: "Kişi başı görev yükü (= Görev / Personel)", unit: "görev/kişi" },
      ],
      source: { code: "STCW vardiya tutma esasları (Bölüm VIII) — operasyonel etkinlik göstergesi" },
      note: "Etkinlik skoru bağıntısı hesaplayıcıdan türetilmiştir; kişi başı görev yükü = görev / personel.",
      inputs: [
        { key: "crew", label: "Makine Personeli", unit: "persons", placeholder: "8" },
        { key: "watchHours", label: "Vardiya Süresi", unit: "saat", placeholder: "4" },
        { key: "tasks", label: "Günlük Rutin Görev", unit: "adet", placeholder: "25" },
        { key: "incidents", label: "Aylık Olay Sayısı", unit: "adet", placeholder: "2" },
      ],
      calculate: (v) => {
        const watchesPerDay = 24 / v.watchHours;
        const crewPerWatch = v.crew / (watchesPerDay > 2 ? 3 : 2);
        const taskLoad = v.tasks / v.crew;
        const effectiveness = Math.max(0, 100 - v.incidents * 10 - Math.max(0, taskLoad - 4) * 5);
        return [
          { label: "Vardiya Sayısı/Gün", value: `${watchesPerDay.toFixed(0)}` },
          { label: "Vardiya Başına Kişi", value: `${crewPerWatch.toFixed(1)}` },
          { label: "Kişi Başı Görev Yükü", value: `${taskLoad.toFixed(1)} görev/kişi` },
          { label: "Etkinlik Skoru", value: `${effectiveness.toFixed(0)}%` },
        ];
      },
    },
  ],
};
