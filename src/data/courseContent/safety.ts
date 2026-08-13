import { Shield } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Denizde Güvenlik — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi. Buradaki formüller ve
 * hesaplamalar mevcut Emniyet Formülleri ve Güvenlik Hesaplamaları sayfalarındaki
 * GERÇEK formüllerden birebir alınmıştır (yangın söndürme, can kurtarma vb.).
 * `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const safety: CourseTopic = {
  key: "safety",
  title: "Safety at Sea",
  icon: Shield,
  accent: "from-rose-500 via-orange-500 to-amber-500",
  group: "deck",
  intro:
    "Fire fighting (foam, CO₂, water mist), life saving appliances, escape and risk " +
    "assessment. Each formula is followed by the calculator that uses it.",
  advancedTool: { label: "Advanced Safety Tools", href: "/safety" },
  entries: [
    {
      id: "foam-solution",
      name: "Foam Solution Quantity",
      group: "Fire Fighting",
      formula: "Q = Application Rate × Area × Duration",
      variables: [
        { symbol: "Q", label: "Required foam quantity", unit: "L" },
        { symbol: "Application Rate", label: "6.5 L/m²/min (machinery space), 4.0 L/m²/min (deck)", unit: "L/m²/dk" },
        { symbol: "Alan", label: "Korunan alan", unit: "m²" },
        { symbol: "Duration", label: "Application time", unit: "dk" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Minimum application times" },
      note: "The result is also given in m³ (1000 L = 1 m³).",
      inputs: [
        { key: "rate", label: "Application Rate", unit: "L/m²/dk", placeholder: "6.5" },
        { key: "area", label: "Korunan Alan", unit: "m²", placeholder: "500" },
        { key: "time", label: "Application Time", unit: "dk", placeholder: "15" },
      ],
      calculate: (v) => {
        const liters = v.rate * v.area * v.time;
        return [
          { label: "Required Foam", value: `${liters.toFixed(0)} L` },
          { label: "Required Foam", value: `${(liters / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Quantity (Protected Volume)",
      group: "Fire Fighting",
      formula: "M = V × f × 1.5",
      variables: [
        { symbol: "M", label: "Required CO₂ quantity", unit: "kg" },
        { symbol: "V", label: "Korunan hacim", unit: "m³" },
        { symbol: "f", label: "Filling factor (machinery space 0.40)" },
        { symbol: "1.5", label: "CO₂ density coefficient (≈ 1/0.56 m³/kg)", unit: "kg/m³" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Fixed CO₂ extinguishing system" },
      note: "SOLAS: the free CO₂ gas volume must be ≥ 40% of the protected volume. 1.5 kg/m³ ≈ 1/0.56 m³/kg specific volume.",
      inputs: [
        { key: "vol", label: "Korunan Hacim (V)", unit: "m³", placeholder: "2000" },
        { key: "factor", label: "Filling Factor (f)", unit: "", placeholder: "0.40" },
      ],
      calculate: (v) => {
        if (v.vol <= 0) return [{ label: "Hata", value: "The volume must be positive" }];
        const m = v.vol * v.factor * 1.5;
        return [{ label: "Gerekli CO₂ (M)", value: `${m.toFixed(1)} kg` }];
      },
    },
    {
      id: "water-mist-flow",
      name: "Su Sisi Nozul Debisi",
      group: "Fire Fighting",
      formula: "Q = K × √P",
      variables: [
        { symbol: "Q", label: "Debi", unit: "L/dk" },
        { symbol: "K", label: "Nozzle factor (manufacturer's catalogue)" },
        { symbol: "P", label: "Pressure", unit: "bar" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Su sisi / sprinkler nozul" },
      note: "The K value is taken from the manufacturer's catalogue for the nozzle type.",
      inputs: [
        { key: "k", label: "Nozzle Coefficient (K)", unit: "", placeholder: "0.07" },
        { key: "p", label: "Pressure (P)", unit: "bar", placeholder: "100" },
      ],
      calculate: (v) => {
        if (v.p < 0) return [{ label: "Hata", value: "The pressure cannot be negative" }];
        const q = v.k * Math.sqrt(v.p);
        return [{ label: "Nozul Debisi (Q)", value: `${q.toFixed(3)} L/dk` }];
      },
    },
    {
      id: "fire-water-capacity",
      name: "Fire Water Capacity",
      group: "Fire Fighting",
      formula: "Kapasite = Q × t × n",
      variables: [
        { symbol: "Q", label: "Her bir hidrant/pompa debisi", unit: "m³/h" },
        { symbol: "t", label: "Minimum operating time", unit: "saat" },
        { symbol: "n", label: "Number of hydrants/pumps operating simultaneously" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Main fire line requirements" },
      note: "The time is entered in minutes; the capacity is calculated in m³ (Q is converted to minutes).",
      inputs: [
        { key: "q", label: "Pompa Debisi (Q)", unit: "m³/h", placeholder: "150" },
        { key: "time", label: "Operating Time (t)", unit: "dk", placeholder: "60" },
        { key: "n", label: "Number of Pumps (n)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const capacity = (v.q / 60) * v.time * v.n;
        return [{ label: "Toplam Kapasite", value: `${capacity.toFixed(1)} m³` }];
      },
    },
    {
      id: "escape-time",
      name: "Escape Time",
      group: "Evacuation and Escape",
      formula: "t = L / v",
      variables: [
        { symbol: "t", label: "Escape time", unit: "dk" },
        { symbol: "L", label: "Escape route length", unit: "m" },
        { symbol: "v", label: "Walking speed (typically 1.2)", unit: "m/s" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Escape route analysis" },
      note: "v is entered in m/s; the result is converted to minutes (÷60). The speed is reduced for personnel with impaired mobility.",
      inputs: [
        { key: "length", label: "Escape Route Length (L)", unit: "m", placeholder: "120" },
        { key: "speed", label: "Walking Speed (v)", unit: "m/s", placeholder: "1.2" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Hata", value: "The speed must be positive" }];
        const t = v.length / v.speed / 60;
        const durum = t > 30 ? "Exceeds the SOLAS 30 min limit" : "Within the limit (≤30 min)";
        return [
          { label: "Escape Time (t)", value: `${t.toFixed(1)} dk` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "risk-matrix",
      name: "Risk Matrisi Skoru",
      group: "Risk Assessment",
      formula: "Risk = Likelihood × Severity",
      variables: [
        { symbol: "Likelihood", label: "1-5 (Rare – Very Frequent)" },
        { symbol: "Severity", label: "1-5 (Negligible – Catastrophic)" },
        { symbol: "Risk", label: "Risk skoru (1-25)" },
      ],
      source: { code: "ISM Code / risk assessment matrix" },
      note: "15+ = High Risk, 8-14 = Medium Risk, 1-7 = Low Risk.",
      inputs: [
        { key: "p", label: "Likelihood", unit: "1-5", placeholder: "3" },
        { key: "s", label: "Severity", unit: "1-5", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.p * v.s;
        const seviye = risk >= 15 ? "High Risk" : risk >= 8 ? "Orta Risk" : "Low Risk";
        return [
          { label: "Risk Skoru", value: `${risk.toFixed(0)}` },
          { label: "Seviye", value: seviye },
        ];
      },
    },
    {
      id: "lsa-capacity",
      name: "Toplam Can Kurtarma Kapasitesi (LSA)",
      group: "Life Saving Appliances",
      formula: "Capacity = (Number of Boats × Boat Capacity) + (Number of Rafts × Raft Capacity)",
      variables: [
        { symbol: "Bot Kapasitesi", label: "Persons per lifeboat", unit: "persons" },
        { symbol: "Number of Boats", label: "Can botu adedi" },
        { symbol: "Sal Kapasitesi", label: "Persons per liferaft", unit: "persons" },
        { symbol: "Number of Rafts", label: "Number of liferafts" },
      ],
      source: { code: "SOLAS III / LSA Code", detail: "Life saving appliance capacity" },
      note: "SOLAS compliance check: total capacity ≥ the number of persons on board.",
      inputs: [
        { key: "boatCap", label: "Can Botu Kapasitesi", unit: "persons", placeholder: "65" },
        { key: "boatCount", label: "Number of Lifeboats", unit: "", placeholder: "4" },
        { key: "raftCap", label: "Liferaft Capacity", unit: "persons", placeholder: "25" },
        { key: "raftCount", label: "Number of Liferafts", unit: "", placeholder: "6" },
        { key: "pob", label: "Persons on Board", unit: "persons", placeholder: "24" },
      ],
      calculate: (v) => {
        const boatTotal = v.boatCap * v.boatCount;
        const raftTotal = v.raftCap * v.raftCount;
        const total = boatTotal + raftTotal;
        const uygun = total >= v.pob ? "UYGUN" : "NOT COMPLIANT";
        return [
          { label: "Toplam Can Botu Kapasitesi", value: `${boatTotal.toFixed(0)} persons` },
          { label: "Total Liferaft Capacity", value: `${raftTotal.toFixed(0)} persons` },
          { label: "Toplam LSA Kapasitesi", value: `${total.toFixed(0)} persons` },
          { label: "SOLAS Compliance", value: uygun },
        ];
      },
    },
    {
      id: "evacuation-time",
      name: "Evacuation Time Estimate",
      group: "Life Saving Appliances",
      formula: "t = max(15, Number of Persons / 4)",
      variables: [
        { symbol: "Number of Persons", label: "Total persons on board", unit: "persons" },
        { symbol: "4", label: "Average evacuation rate", unit: "persons/min" },
      ],
      source: { code: "SOLAS III / LSA Code", detail: "Maximum evacuation time 30 min" },
      note: "Rough estimate; assumes ~4 persons per minute and a minimum of 15 min.",
      inputs: [
        { key: "pob", label: "Persons on Board", unit: "persons", placeholder: "24" },
      ],
      calculate: (v) => {
        const t = Math.max(15, v.pob / 4);
        const durum = t <= 30 ? "Within the limit (≤30 min)" : "Exceeds the 30 min limit";
        return [
          { label: "Estimated Evacuation Time", value: `${t.toFixed(0)} dk` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "fire-water-flow",
      name: "Fire Water Flow Rate (Pump)",
      group: "Fire Fighting",
      formula: "Q = Pompa Kapasitesi (m³/h) × 1000 / 60",
      variables: [
        { symbol: "Q", label: "Su debisi", unit: "L/dk" },
        { symbol: "Pompa Kapasitesi", label: "Fire pump capacity", unit: "m³/h" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Main fire pump flow rate" },
      note: "Conversion from m³/h to L/min: × 1000 ÷ 60.",
      inputs: [
        { key: "cap", label: "Pompa Kapasitesi", unit: "m³/h", placeholder: "150" },
      ],
      calculate: (v) => {
        const q = (v.cap * 1000) / 60;
        return [{ label: "Fire Water Flow Rate (Q)", value: `${q.toFixed(0)} L/dk` }];
      },
    },
    {
      id: "mooring-line-load",
      name: "Load per Line (Mooring)",
      group: "Anchoring and Mooring",
      formula: "Line Load = Total Force / Number of Lines ;  SF = WLL / Line Load",
      variables: [
        { symbol: "Toplam Kuvvet", label: "Total environmental/displacement force", unit: "t" },
        { symbol: "Number of Lines", label: "Number of mooring lines" },
        { symbol: "WLL", label: "Working load limit of the line", unit: "t" },
      ],
      source: { code: "OCIMF MEG4 / good seamanship practice" },
      note: "SF ≥ 2.0 is considered safe.",
      inputs: [
        { key: "force", label: "Toplam Kuvvet", unit: "t", placeholder: "25000" },
        { key: "lines", label: "Number of Lines", unit: "", placeholder: "6" },
        { key: "wll", label: "Working Load Limit (WLL)", unit: "t", placeholder: "17" },
      ],
      calculate: (v) => {
        if (v.lines <= 0) return [{ label: "Hata", value: "The number of lines must be positive" }];
        const load = v.force / v.lines;
        const sf = load > 0 ? v.wll / load : 0;
        const durum = sf >= 2.0 ? "Safe (SF ≥ 2.0)" : "Overloaded";
        return [
          { label: "Load per Line", value: `${load.toFixed(2)} t` },
          { label: "Safety Factor (SF)", value: sf.toFixed(2) },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "freeboard-check",
      name: "Freeboard Check",
      group: "Load Line and Freeboard",
      formula: "Actual Freeboard = Depth − Draft",
      variables: [
        { symbol: "Derinlik", label: "Vessel depth (D)", unit: "m" },
        { symbol: "Draft", label: "Summer draft (T)", unit: "m" },
      ],
      source: { code: "Load Line Convention (ICLL 1966)", detail: "Freeboard compliance" },
      note: "The result is given in mm (× 1000).",
      inputs: [
        { key: "depth", label: "Vessel Depth (D)", unit: "m", placeholder: "18" },
        { key: "draft", label: "Summer Draft (T)", unit: "m", placeholder: "8.5" },
      ],
      calculate: (v) => {
        const fb = (v.depth - v.draft) * 1000;
        return [{ label: "Mevcut Freeboard", value: `${fb.toFixed(0)} mm` }];
      },
    },
    {
      id: "fire-fighting-categories",
      name: "Fire Classes (Extinguisher Selection)",
      group: "Risk Assessment",
      formula: "A: solids, B: liquids, C: gases, D: metals, F/K: cooking oil",
      variables: [
        { symbol: "A", label: "Solid combustibles (wood, paper, textiles)" },
        { symbol: "B", label: "Flammable liquids (fuel, oil, paint)" },
        { symbol: "C", label: "Flammable gases / electrical equipment" },
        { symbol: "D", label: "Combustible metals" },
        { symbol: "F/K", label: "Cooking oils (galley)" },
      ],
      source: { code: "SOLAS II-2 / FSS Code", detail: "Portable extinguisher types" },
      note: "Select the fire class (1 = A solids, 2 = B liquids, 3 = C gas/electrical, 4 = D metals, 5 = F/K cooking oil); the suitable extinguisher is recommended.",
      inputs: [
        { key: "cls", label: "Fire Class (1=A, 2=B, 3=C, 4=D, 5=F/K)", unit: "", placeholder: "2" },
      ],
      calculate: (v) => {
        const map: Record<number, { name: string; agent: string }> = {
          1: { name: "A — Solids (wood, paper, textiles)", agent: "Water, foam, ABC dry powder" },
          2: { name: "B — Flammable liquids (fuel, oil, paint)", agent: "Foam, CO₂, ABC/BC dry powder" },
          3: { name: "C — Gaz / elektrikli ekipman", agent: "CO₂, kuru kimyevi (SU KULLANMA)" },
          4: { name: "D — Combustible metals", agent: "Special class D powder (sand/graphite); water/CO₂ PROHIBITED" },
          5: { name: "F/K — Cooking oil (galley)", agent: "Islak kimyevi (wet chemical); su YASAK" },
        };
        const sel = map[Math.round(v.cls)];
        if (!sel) return [{ label: "Hata", value: "The class must be between 1 and 5" }];
        return [
          { label: "Fire Class", value: sel.name },
          { label: "Recommended Extinguisher", value: sel.agent },
        ];
      },
    },
  ],
};
