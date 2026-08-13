import { Leaf } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Çevre ve MARPOL – Makine — tek kaynak ders içeriği.
 * Emisyon ve atık yönetimi formülleri ilgili hesaplayıcılarla TEK listede
 * birleştirildi; `calculate` taşıyan girdiler hem Formüller hem Hesaplamalar
 * sayfasında görünür.
 */
export const environmentMachine: CourseTopic = {
  key: "environment-machine",
  title: "Environment and MARPOL – Machinery",
  icon: Leaf,
  accent: "from-green-500 via-emerald-500 to-teal-500",
  group: "machine",
  intro:
    "Emissions from the ship's machinery space (CO₂, SOx, NOx) and waste " +
    "management (bilge, sewage, ballast) within the framework of the MARPOL annexes. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "co2-emission",
      name: "CO₂ Emisyonu",
      group: "Emission Calculations",
      formula: "ECO₂ = FC × Cf",
      variables: [
        { symbol: "FC", label: "Fuel consumption", unit: "ton" },
        { symbol: "Cf", label: "Carbon factor (HFO: 3.114, MDO: 3.206)", unit: "t CO₂/t fuel" },
      ],
      source: { code: "MARPOL Annex VI (IMO DCS / carbon factor)" },
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "ton", placeholder: "100" },
        { key: "cf", label: "Carbon Factor (Cf)", unit: "t CO₂/t fuel", placeholder: "3.114" },
      ],
      calculate: (v) => {
        return [{ label: "CO₂ Emisyonu", value: `${(v.fc * v.cf).toFixed(1)} ton CO₂` }];
      },
    },
    {
      id: "sox-emission",
      name: "SOx Emisyonu",
      group: "Emission Calculations",
      formula: "ESOx = 2 × (S / 100) × FC",
      variables: [
        { symbol: "FC", label: "Fuel consumption", unit: "ton" },
        { symbol: "S", label: "Fuel sulphur content", unit: "%, m/m" },
      ],
      source: { code: "MARPOL Annex VI Reg.14 (sulphur limit: ECA 0.10%, global 0.50%)" },
      note: "The S→SO₂ mass conversion factor is ≈ 2; the sulphur content is entered as a percentage.",
      inputs: [
        { key: "fc", label: "Fuel Consumption", unit: "ton", placeholder: "100" },
        { key: "s", label: "Sulphur Content", unit: "%", placeholder: "0.5" },
      ],
      calculate: (v) => {
        // SO₂ = 2 × S% × FC (kütle oranı: S→SO₂ çarpan ≈ 2)
        const sox = 2 * (v.s / 100) * v.fc;
        const limit = v.s <= 0.1 ? "ECA Uyumlu" : v.s <= 0.5 ? "Global Uyumlu" : "Uyumsuz";
        return [
          { label: "SOx Emisyonu", value: `${sox.toFixed(2)} ton SO₂` },
          { label: "MARPOL Durumu", value: limit },
        ];
      },
    },
    {
      id: "nox-emission",
      name: "NOx Emission (Tier Limits)",
      group: "Emission Calculations",
      formula: "Tier II: 44·n⁻⁰·²³  (130 ≤ n < 2000 rpm)",
      variables: [
        { symbol: "n", label: "Motor anma devri", unit: "rpm" },
        { symbol: "Tier I", label: "n<130:17,0 · 130–2000:45·n⁻⁰·² · n≥2000:9,8", unit: "g/kWh" },
        { symbol: "Tier II", label: "n<130:14,4 · 130–2000:44·n⁻⁰·²³ · n≥2000:7,7", unit: "g/kWh" },
        { symbol: "Tier III", label: "n<130:3,4 · 130–2000:9·n⁻⁰·² · n≥2000:2,0 (ECA)", unit: "g/kWh" },
      ],
      source: { code: "MARPOL Annex VI Reg.13 (NOx Tier I/II/III limits)" },
      note: "NOx formation is not obtained from a closed analytical relation; compliance is determined by comparing the weighted NOx value measured over the NOx Technical Code test cycle with the speed-dependent Tier limit.",
      inputs: [
        { key: "n", label: "Motor Anma Devri (n)", unit: "rpm", placeholder: "500" },
        { key: "measured", label: "Measured NOx (optional)", unit: "g/kWh", placeholder: "10" },
      ],
      calculate: (v) => {
        const limit = (a: number, b: number, c: number) =>
          v.n < 130 ? a : v.n < 2000 ? b * Math.pow(v.n, -0.23) : c;
        const t1 = v.n < 130 ? 17.0 : v.n < 2000 ? 45 * Math.pow(v.n, -0.2) : 9.8;
        const t2 = limit(14.4, 44, 7.7);
        const t3 = v.n < 130 ? 3.4 : v.n < 2000 ? 9 * Math.pow(v.n, -0.2) : 2.0;
        const out = [
          { label: "Tier I Limit", value: `${t1.toFixed(2)} g/kWh` },
          { label: "Tier II Limit", value: `${t2.toFixed(2)} g/kWh` },
          { label: "Tier III Limit (ECA)", value: `${t3.toFixed(2)} g/kWh` },
        ];
        if (v.measured > 0) {
          out.push({ label: "Tier II Compliance", value: v.measured <= t2 ? "UYGUN" : "EXCEEDED" });
        }
        return out;
      },
    },
    {
      id: "ows-capacity",
      name: "Oily Water Separator (OWS) Capacity",
      group: "Waste Management",
      formula: "QOWS = Vsintine / t",
      variables: [
        { symbol: "Vsintine", label: "Daily bilge water generation", unit: "m³/day" },
        { symbol: "t", label: "OWS operating time", unit: "hours/day" },
        { symbol: "QOWS", label: "Gerekli OWS debisi", unit: "m³/saat" },
      ],
      source: { code: "MARPOL Annex I Reg.14 (bilge water oil content ≤ 15 ppm)" },
      note: "The OWS discharge oil concentration must be ≤ 15 ppm (15 ppm alarm + automatic stopping device).",
      inputs: [
        { key: "bilge", label: "Daily Bilge Water Generation", unit: "m³/day", placeholder: "5" },
        { key: "hours", label: "OWS Operating Time", unit: "hours/day", placeholder: "8" },
      ],
      calculate: (v) => {
        const requiredCapacity = v.bilge / v.hours;
        return [
          { label: "Gerekli OWS Kapasitesi", value: `${requiredCapacity.toFixed(2)} m³/saat` },
          { label: "Weekly Bilge Water", value: `${(v.bilge * 7).toFixed(1)} m³` },
        ];
      },
    },
    {
      id: "sewage-treatment",
      name: "Sewage Treatment",
      group: "Waste Management",
      formula: "BOD₅ effluent ≤ 25 mg/L",
      variables: [
        { symbol: "BOD₅", label: "Five day biochemical oxygen demand (effluent)", unit: "mg/L" },
      ],
      source: { code: "MARPOL Annex IV (effluent quality of an approved treatment plant)" },
      note: "MEPC.227(64) effluent criteria: BOD₅ ≤ 25 mg/L, TSS ≤ 35 mg/L, thermotolerant coliform ≤ 100/100 mL. The measured values are entered and compliance is assessed.",
      inputs: [
        { key: "bod", label: "BOD₅ (effluent)", unit: "mg/L", placeholder: "20" },
        { key: "tss", label: "Total Suspended Solids (TSS)", unit: "mg/L", placeholder: "30" },
        { key: "coli", label: "Termotolerant Koliform", unit: "/100 mL", placeholder: "80" },
      ],
      calculate: (v) => {
        const bodOk = v.bod <= 25;
        const tssOk = v.tss <= 35;
        const coliOk = v.coli <= 100;
        const ok = bodOk && tssOk && coliOk;
        return [
          { label: "BOD₅", value: `${v.bod} mg/L → ${bodOk ? "Compliant" : "EXCEEDED"}` },
          { label: "TSS", value: `${v.tss} mg/L → ${tssOk ? "Compliant" : "EXCEEDED"}` },
          { label: "Koliform", value: `${v.coli}/100 mL → ${coliOk ? "Compliant" : "EXCEEDED"}` },
          { label: "Genel", value: ok ? "SUITABLE FOR DISCHARGE" : "NOT SUITABLE FOR DISCHARGE" },
        ];
      },
    },
    {
      id: "ballast-treatment-capacity",
      name: "Ballast Water Treatment Capacity",
      group: "Waste Management",
      formula: "t = Vbalast / Qpompa",
      variables: [
        { symbol: "Vbalast", label: "Toplam balast hacmi", unit: "m³" },
        { symbol: "Qpompa", label: "Balast pompa debisi", unit: "m³/saat" },
        { symbol: "t", label: "Total treatment time", unit: "saat" },
      ],
      source: { code: "Ballast Water Management Convention (BWMC) D-2 standard" },
      note: "The treatment system (BWTS) must have a rated capacity (TRC) at least equal to the ballast pump flow rate.",
      inputs: [
        { key: "tankVol", label: "Toplam Balast Hacmi", unit: "m³", placeholder: "15000" },
        { key: "pumpRate", label: "Balast Pompa Debisi", unit: "m³/saat", placeholder: "500" },
      ],
      calculate: (v) => {
        const treatmentRate = v.pumpRate;
        const totalTime = v.tankVol / v.pumpRate;
        return [
          { label: "Required Treatment Capacity", value: `${treatmentRate.toFixed(0)} m³/saat` },
          { label: "Total Time", value: `${totalTime.toFixed(1)} saat` },
        ];
      },
    },
  ],
};
