import { ShieldAlert } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Makine Dairesi Güvenliği — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const engineRoomSafety: CourseTopic = {
  key: "engine-room-safety",
  title: "Engine Room Safety",
  icon: ShieldAlert,
  accent: "from-rose-500 via-red-500 to-orange-500",
  group: "machine",
  intro:
    "Fire and explosion risk, fixed CO₂ extinguishing, ventilation and enclosed space " +
    "entry safety. Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "fire-triangle",
      name: "Fire Triangle",
      group: "Fire Safety",
      formula: "Fuel + Oxygen + Heat = Fire",
      variables: [
        { symbol: "Fuel", label: "Combustible material" },
        { symbol: "Oksijen", label: "Oxidiser (air)" },
        { symbol: "Heat", label: "Ignition energy" },
      ],
      source: { code: "Fire triangle — principle of combustion", detail: "Removing one element extinguishes the fire" },
      note: "The presence of each element is entered as 1 (present) / 0 (absent); the oxygen is taken as the ambient percentage. Fire risk exists when all three are present.",
      inputs: [
        { key: "fuel", label: "Combustible Material (1 = present, 0 = absent)", unit: "", placeholder: "1" },
        { key: "o2", label: "Oxygen Content", unit: "%", placeholder: "20.9" },
        { key: "heat", label: "Ignition Source (1 = present, 0 = absent)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        const fuelOk = v.fuel >= 1;
        const oxyOk = v.o2 >= 15; // ~%15 altında çoğu yanma sürmez
        const heatOk = v.heat >= 1;
        const risk = fuelOk && oxyOk && heatOk;
        const present = [fuelOk && "Fuel", oxyOk && "Oksijen", heatOk && "Heat"].filter(Boolean).join(" + ") || "—";
        return [
          { label: "Elements Present", value: present },
          { label: "Fire Risk", value: risk ? "PRESENT (triangle complete)" : "Absent (an element is missing)" },
        ];
      },
    },
    {
      id: "co2-quantity",
      name: "CO₂ Quantity (by Volume)",
      group: "Fire Safety",
      formula: "mCO₂ = (Vhacim × %40) / 0,56 m³/kg",
      variables: [
        { symbol: "Vhacim", label: "Protected volume", unit: "m³" },
        { symbol: "%40", label: "Minimum free CO₂ volume ratio", unit: "—" },
        { symbol: "0,56", label: "CO₂ specific volume", unit: "m³/kg" },
        { symbol: "mCO₂", label: "Required CO₂ mass", unit: "kg" },
      ],
      source: { code: "Fixed CO₂ extinguishing system (SOLAS Ch. II-2 / FSS Code)" },
      note: "For machinery spaces the free CO₂ volume must be ≥ 40% of the gross volume; the CO₂ specific volume is 0.56 m³/kg. A standard cylinder capacity of 45 kg is assumed and the number of cylinders is rounded up.",
      inputs: [
        { key: "vol", label: "Protected Volume", unit: "m³", placeholder: "2000" },
        { key: "ratio", label: "Free CO₂ Volume Ratio", unit: "%", placeholder: "40" },
      ],
      calculate: (v) => {
        const mass = (v.vol * (v.ratio / 100)) / 0.56;
        const bottles = Math.ceil(mass / 45); // 45 kg standart tüp
        return [
          { label: "Required CO₂ Quantity", value: `${mass.toFixed(0)} kg` },
          { label: "Required Number of Cylinders (45 kg)", value: `${bottles} cylinders` },
        ];
      },
    },
    {
      id: "foam-quantity",
      name: "Foam Quantity",
      group: "Fire Safety",
      formula: "V_foam = A × t × application rate",
      variables: [
        { symbol: "A", label: "Protected area", unit: "m²" },
        { symbol: "t", label: "Application time", unit: "dk" },
        { symbol: "applicationrate", label: "Application rate", unit: "L/m²·dk" },
      ],
      source: { code: "Fixed foam extinguishing system design (SOLAS / FSS Code)" },
      note: "Foam solution volume = area × time × application rate (given in L; ÷1000 = m³).",
      inputs: [
        { key: "a", label: "Protected Area (A)", unit: "m²", placeholder: "300" },
        { key: "t", label: "Application Time (t)", unit: "dk", placeholder: "5" },
        { key: "rate", label: "Application Rate", unit: "L/m²·dk", placeholder: "6.5" },
      ],
      calculate: (v) => {
        const vol = v.a * v.t * v.rate;
        return [
          { label: "Foam Solution", value: `${vol.toFixed(0)} L` },
          { label: "Foam Solution", value: `${(vol / 1000).toFixed(2)} m³` },
        ];
      },
    },
    {
      id: "engine-room-ventilation",
      name: "Ventilation Flow Rate",
      group: "Fire Safety",
      formula: "Q̇_air = P_engine × 2.5 ; Air changes = Q̇_air / V_space",
      variables: [
        { symbol: "Pmotor", label: "Total engine power", unit: "kW" },
        { symbol: "Vhacim", label: "Machinery space volume", unit: "m³" },
        { symbol: "Q̇_air", label: "Combustion air requirement", unit: "m³/h" },
      ],
      source: { code: "Engine room ventilation — combustion air requirement", detail: "Approximately ~2.5 m³/kW·hour of air required" },
      note: "The calculation is approximate; the manufacturer's and class rules govern.",
      inputs: [
        { key: "p", label: "Total Engine Power", unit: "kW", placeholder: "15000" },
        { key: "vol", label: "Machinery Space Volume", unit: "m³", placeholder: "2500" },
      ],
      calculate: (v) => {
        // Yaklaşık: motor başına ~2.5 m³/kW·h hava gereksinimi
        const airForCombustion = v.p * 2.5; // m³/saat
        const ventChanges = airForCombustion / v.vol;
        return [
          { label: "Combustion Air Requirement", value: `${airForCombustion.toFixed(0)} m³/h` },
          { label: "Air Change Rate", value: `${ventChanges.toFixed(1)} /h` },
        ];
      },
    },
    {
      id: "lel-uel",
      name: "LEL / UEL (Explosive Range)",
      group: "Explosion Risk",
      formula: "LEL < konsantrasyon < UEL",
      variables: [
        { symbol: "LEL", label: "Lower explosive limit (fuel vapour ~1%)", unit: "% by volume" },
        { symbol: "UEL", label: "Upper explosive limit (fuel vapour ~6%)", unit: "% by volume" },
      ],
      source: { code: "Explosive limits (LEL/UEL) — flammable vapour concentration" },
      note: "If the measured vapour concentration lies between the LEL and the UEL, the mixture is explosive (dangerous).",
      inputs: [
        { key: "conc", label: "Measured Concentration", unit: "% by volume", placeholder: "3" },
        { key: "lel", label: "Lower Explosive Limit (LEL)", unit: "% by volume", placeholder: "1" },
        { key: "uel", label: "Upper Explosive Limit (UEL)", unit: "% by volume", placeholder: "6" },
      ],
      calculate: (v) => {
        let status: string;
        if (v.conc < v.lel) status = "Too lean (below the LEL) — will not ignite";
        else if (v.conc > v.uel) status = "Too rich (above the UEL) — will not ignite";
        else status = "EXPLOSIVE RANGE — DANGEROUS";
        return [
          { label: "Konsantrasyon", value: `${v.conc} % by volume` },
          { label: "Assessment", value: status },
        ];
      },
    },
    {
      id: "flash-point",
      name: "Flash Point",
      group: "Explosion Risk",
      formula: "T_flash ≥ 60 °C (fuel required by SOLAS)",
      variables: [
        { symbol: "Tflash", label: "Flash point", unit: "°C" },
      ],
      source: { code: "Fuel flash point requirement (SOLAS II-2/Reg.4)", detail: "HFO: ~65 °C, MGO: ~60 °C (minimum requirement)" },
      note: "The fuel flash point must be ≥ 60 °C (exceptions such as emergency generators ≥ 43 °C). The margin of the measured value to the limit is calculated.",
      inputs: [
        { key: "tflash", label: "Measured Flash Point", unit: "°C", placeholder: "65" },
        { key: "limit", label: "Required Minimum", unit: "°C", placeholder: "60" },
      ],
      calculate: (v) => {
        const margin = v.tflash - v.limit;
        return [
          { label: "Margin to the Limit", value: `${margin.toFixed(1)} °C` },
          { label: "Uygunluk", value: margin >= 0 ? "COMPLIANT" : "NON-COMPLIANT (below the limit)" },
        ];
      },
    },
    {
      id: "enclosed-space-oxygen",
      name: "Enclosed Space Oxygen / Gas Check",
      group: "Explosion Risk",
      formula: "O₂ ≥ 20,9% ; H₂S < 10 ppm ; CO < 25 ppm ; LEL < %1",
      variables: [
        { symbol: "O₂", label: "Oxygen content", unit: "%" },
        { symbol: "H₂S", label: "Hydrogen sulphide", unit: "ppm" },
        { symbol: "CO", label: "Carbon monoxide", unit: "ppm" },
        { symbol: "LEL", label: "Percentage of the lower explosive limit", unit: "%" },
      ],
      source: { code: "Enclosed space entry — atmosphere measurement limits (SOLAS / IMO Res.A.1050)" },
      note: "Entry into an enclosed space must not be made unless all the limits are met.",
      inputs: [
        { key: "o2", label: "Measured O₂", unit: "%", placeholder: "20.8" },
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
          { label: "O₂ Status", value: `${v.o2}% → ${o2Ok ? "Acceptable" : "INSUFFICIENT"}` },
          { label: "H₂S Status", value: `${v.h2s} ppm → ${h2sOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "CO Status", value: `${v.co} ppm → ${coOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "LEL Status", value: `${v.lel}% → ${lelOk ? "Acceptable" : "DANGEROUS"}` },
          { label: "Overall Assessment", value: safe ? "ENTRY PERMITTED" : "ENTRY NOT PERMITTED" },
        ];
      },
    },
  ],
};
