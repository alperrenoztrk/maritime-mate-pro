import { ClipboardCheck } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Makine Dairesi Operasyonları — tek kaynak ders içeriği.
 * Formüller ve hesaplayıcılar TEK listede birleştirildi; `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür.
 */
export const engineRoomOps: CourseTopic = {
  key: "engine-room-ops",
  title: "Engine Room Operations",
  icon: ClipboardCheck,
  accent: "from-emerald-500 via-teal-500 to-cyan-500",
  group: "machine",
  intro:
    "Fuel and lubricating oil consumption monitoring, start-up and operating parameters. " +
    "Each formula is followed by the calculator that uses the same formula.",
  entries: [
    {
      id: "fuel-consumption-rate",
      name: "Fuel Consumption Rate",
      group: "Operating Parameters",
      formula: "FCrate = FCtotal / Voyage time",
      variables: [
        { symbol: "FCtoplam", label: "Total fuel consumption", unit: "tonnes" },
        { symbol: "Voyage time", label: "Elapsed time", unit: "days or hours" },
        { symbol: "FCrate", label: "Consumption rate", unit: "tonnes/day or tonnes/hour" },
      ],
      source: { code: "Operational fuel consumption monitoring" },
      note: "The total consumption is entered in tonnes and the time in days; the daily and hourly consumption rates are calculated.",
      inputs: [
        { key: "total", label: "Total Fuel (FCtotal)", unit: "tonnes", placeholder: "180" },
        { key: "days", label: "Passage Time", unit: "days", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.days <= 0) return [{ label: "Error", value: "The time must be positive" }];
        const perDay = v.total / v.days;
        return [
          { label: "Daily Consumption", value: `${perDay.toFixed(2)} tonnes/day` },
          { label: "Hourly Consumption", value: `${(perDay / 24).toFixed(3)} tonnes/h` },
        ];
      },
    },
    {
      id: "remaining-fuel-range",
      name: "Remaining Fuel Endurance",
      group: "Operating Parameters",
      formula: "Endurance = Fuel stock / FCrate",
      variables: [
        { symbol: "Fuel_stock", label: "Available fuel stock", unit: "tonnes" },
        { symbol: "FCrate", label: "Consumption rate", unit: "tonnes/day" },
        { symbol: "Range", label: "Estimated operating time", unit: "days" },
      ],
      source: { code: "Operational fuel planning" },
      inputs: [
        { key: "stock", label: "Fuel Stock", unit: "tonnes", placeholder: "500" },
        { key: "rate", label: "Consumption Rate", unit: "tonnes/day", placeholder: "30" },
      ],
      calculate: (v) => {
        const days = v.stock / v.rate;
        return [
          { label: "Estimated Range", value: `${days.toFixed(1)} days` },
          { label: "Hours", value: `${(days * 24).toFixed(0)} h` },
        ];
      },
    },
    {
      id: "lube-oil-consumption",
      name: "Lubricating Oil Consumption Monitoring",
      group: "Operating Parameters",
      formula: "Oil_consumption = SLOC × BHP × t",
      variables: [
        { symbol: "SLOC", label: "Specific lubricating oil consumption", unit: "g/kW·h" },
        { symbol: "BHP", label: "Engine power", unit: "kW" },
        { symbol: "t", label: "Running time", unit: "h" },
        { symbol: "Oil_consumption", label: "Total oil consumption", unit: "g (→ kg/tonne)" },
      ],
      source: { code: "Specific lubricating oil consumption (SLOC) monitoring", detail: "Normal: 0,6–1,2 g/kW·h" },
      inputs: [
        { key: "cylOil", label: "Cylinder Oil Consumption", unit: "g/kW·h", placeholder: "0.7" },
        { key: "bhp", label: "Engine Power", unit: "kW", placeholder: "15000" },
        { key: "hours", label: "Operating Time", unit: "h", placeholder: "720" },
      ],
      calculate: (v) => {
        const consumption = (v.cylOil * v.bhp * v.hours) / 1e6; // ton
        const dailyRate = consumption / (v.hours / 24);
        return [
          { label: "Total Cylinder Oil", value: `${(consumption * 1000).toFixed(0)} kg` },
          { label: "Daily Consumption", value: `${(dailyRate * 1000).toFixed(1)} kg/day` },
        ];
      },
    },
    {
      id: "startup-checklist-time",
      name: "Time to Prepare for Sea",
      group: "Start-up",
      formula: "t_total = max(t_preheat, t_LO) + (n_engine·15 + n_gen·10) + 30 min",
      variables: [
        { symbol: "t_preheat", label: "Pre-heating time", unit: "dk" },
        { symbol: "tLO", label: "LO circulation time", unit: "dk" },
        { symbol: "nmotor", label: "Number of engines" },
        { symbol: "njen", label: "Number of generators" },
      ],
      source: { code: "Engine room procedure for preparing for sea" },
      note: "The start-up time is approximate: 15 min per engine, 10 min per generator, plus 30 min for checks.",
      inputs: [
        { key: "engines", label: "Number of Engines", unit: "", placeholder: "2" },
        { key: "gens", label: "Number of Generators", unit: "", placeholder: "3" },
        { key: "preHeat", label: "Pre-heating Time", unit: "min", placeholder: "60" },
        { key: "loCirc", label: "LO Circulation", unit: "min", placeholder: "30" },
      ],
      calculate: (v) => {
        const totalPreheat = Math.max(v.preHeat, v.loCirc);
        const startupTime = v.engines * 15 + v.gens * 10; // dakika
        const total = totalPreheat + startupTime + 30; // +30 dk kontrol
        return [
          { label: "Preparation", value: `${totalPreheat} min` },
          { label: "Start-up", value: `${startupTime} min` },
          { label: "Total Time", value: `${total} min` },
        ];
      },
    },
    {
      id: "engine-warmup-time",
      name: "Engine Warm-up Time",
      group: "Start-up",
      formula: "t = (m · cp · ΔT) / Q̇_heater",
      variables: [
        { symbol: "m", label: "Engine block mass", unit: "kg" },
        { symbol: "cp", label: "Specific heat (steel)", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature rise", unit: "K" },
        { symbol: "Q̇_heater", label: "Heater power", unit: "kW" },
      ],
      source: { code: "Sensible heat relation — main engine pre-heating", detail: "Turning gear: min 1 hour; jacket water → 60 °C" },
      note: "The mass is entered in tonnes and converted to kg in the calculation (×1000).",
      inputs: [
        { key: "mass", label: "Engine Block Mass", unit: "tonnes", placeholder: "200" },
        { key: "cp", label: "Specific Heat (steel)", unit: "kJ/kg·K", placeholder: "0.5" },
        { key: "tStart", label: "Initial Temperature", unit: "°C", placeholder: "20" },
        { key: "tTarget", label: "Target Temperature", unit: "°C", placeholder: "60" },
        { key: "qHeater", label: "Heater Power", unit: "kW", placeholder: "150" },
      ],
      calculate: (v) => {
        const energy = v.mass * 1000 * v.cp * (v.tTarget - v.tStart);
        const timeH = energy / (v.qHeater * 3600);
        return [
          { label: "Required Energy", value: `${(energy / 3600).toFixed(0)} kWh` },
          { label: "Estimated Warm-up Time", value: `${(timeH * 60).toFixed(0)} min` },
        ];
      },
    },
    {
      id: "lube-oil-pressure-check",
      name: "Lubricating Oil Pressure Check",
      group: "Start-up",
      formula: "P_oil ≥ P_min (manufacturer's value)",
      variables: [
        { symbol: "P_oil", label: "Measured oil pressure", unit: "bar" },
        { symbol: "Pmin", label: "Minimum allowable pressure", unit: "bar" },
        { symbol: "Palarm", label: "Alarm pressure", unit: "bar" },
      ],
      source: { code: "Manufacturer's lubrication system limits", detail: "Typical: 3–5 bar (at low speed), 5–8 bar (at full load)" },
      inputs: [
        { key: "pMeasured", label: "Measured Pressure", unit: "bar", placeholder: "4.2" },
        { key: "pMin", label: "Minimum Allowable", unit: "bar", placeholder: "2.5" },
        { key: "pMax", label: "Maximum Allowable", unit: "bar", placeholder: "6.0" },
        { key: "pAlarm", label: "Alarm Value", unit: "bar", placeholder: "2.0" },
      ],
      calculate: (v) => {
        const status = v.pMeasured < v.pAlarm ? "ALARM" : v.pMeasured < v.pMin ? "Low" : v.pMeasured > v.pMax ? "High" : "Normal";
        const margin = ((v.pMeasured - v.pAlarm) / v.pAlarm) * 100;
        return [
          { label: "Durum", value: status },
          { label: "Alarm Margin", value: `${margin.toFixed(1)}%` },
          { label: "Range", value: `${v.pMin}–${v.pMax} bar` },
        ];
      },
    },
  ],
};
