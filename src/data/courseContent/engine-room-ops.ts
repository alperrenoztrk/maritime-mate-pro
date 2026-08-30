import { ClipboardCheck } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Engine Room Operations — educational/reference calculations.
 *
 * Operational limits, start-up sequences, warm-up targets, alarm values and
 * preparation lead-times are engine-/ship-specific. Maker manuals, PMS, chief
 * engineer's standing orders and the vessel SMS remain authoritative.
 */
export const engineRoomOps: CourseTopic = {
  key: "engine-room-ops",
  title: "Engine Room Operations",
  icon: ClipboardCheck,
  accent: "from-emerald-500 via-teal-500 to-cyan-500",
  group: "machine",
  intro:
    "Fuel and lubricating-oil consumption monitoring, start-up planning and operating-parameter reference tools. " +
    "Vessel and manufacturer limits must be used for operational decisions.",
  entries: [
    {
      id: "fuel-consumption-rate",
      name: "Fuel Consumption Rate",
      group: "Operating Parameters",
      formula: "FCrate = FCtotal / elapsed time",
      variables: [
        { symbol: "FCtotal", label: "Total fuel consumption", unit: "tonnes" },
        { symbol: "time", label: "Elapsed time", unit: "days" },
        { symbol: "FCrate", label: "Average consumption rate", unit: "tonnes/day" },
      ],
      source: { code: "Operational fuel-consumption arithmetic" },
      note: "Average historical rate only. Fuel planning must also account for machinery configuration, weather, speed/load profile, fuel changeover, unusable quantities, reserve policy and voyage contingency.",
      inputs: [
        { key: "total", label: "Total Fuel Consumed", unit: "tonnes", placeholder: "180" },
        { key: "days", label: "Elapsed Time", unit: "days", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.days <= 0) return [{ label: "Error", value: "The time must be positive" }];
        const perDay = v.total / v.days;
        return [
          { label: "Average Daily Consumption", value: `${perDay.toFixed(2)} tonnes/day` },
          { label: "Average Hourly Consumption", value: `${(perDay / 24).toFixed(3)} tonnes/h` },
        ];
      },
    },
    {
      id: "remaining-fuel-range",
      name: "Fuel Endurance from Entered Average Rate",
      group: "Operating Parameters",
      formula: "Endurance = usable fuel stock / assumed average rate",
      variables: [
        { symbol: "Fuel stock", label: "Usable fuel quantity entered for the estimate", unit: "tonnes" },
        { symbol: "Rate", label: "Assumed average consumption rate", unit: "tonnes/day" },
      ],
      source: { code: "Operational planning estimate" },
      note: "This is not a bunker-reserve or voyage-sufficiency determination. Use tank soundings/ROB, unusable quantities, all consumers, fuel grades, reserve policy and expected operating profile.",
      inputs: [
        { key: "stock", label: "Usable Fuel Stock Entered", unit: "tonnes", placeholder: "500" },
        { key: "rate", label: "Assumed Consumption Rate", unit: "tonnes/day", placeholder: "30" },
      ],
      calculate: (v) => {
        if (v.rate <= 0) return [{ label: "Error", value: "The consumption rate must be positive" }];
        const days = v.stock / v.rate;
        return [
          { label: "Estimated Endurance", value: `${days.toFixed(1)} days` },
          { label: "Estimated Hours", value: `${(days * 24).toFixed(0)} h` },
          { label: "Status", value: "Planning estimate only" },
        ];
      },
    },
    {
      id: "lube-oil-consumption",
      name: "Lubricating Oil Consumption Monitoring",
      group: "Operating Parameters",
      formula: "Oil consumption = SLOC × power × running time",
      variables: [
        { symbol: "SLOC", label: "Specific lubricating-oil consumption from maker/operational data", unit: "g/kW·h" },
        { symbol: "P", label: "Average applicable engine power", unit: "kW" },
        { symbol: "t", label: "Running time", unit: "h" },
      ],
      source: { code: "Specific lubricating-oil consumption arithmetic", detail: "Expected SLOC is engine, oil-feed strategy and maker specific" },
      note: "Do not use a generic 'normal' SLOC band. Compare calculated/observed consumption with the engine maker's guidance, feed-rate strategy and vessel trend data.",
      inputs: [
        { key: "cylOil", label: "Specific Oil Consumption", unit: "g/kW·h", placeholder: "0.7" },
        { key: "bhp", label: "Average Applicable Power", unit: "kW", placeholder: "15000" },
        { key: "hours", label: "Operating Time", unit: "h", placeholder: "720" },
      ],
      calculate: (v) => {
        if (v.hours <= 0) return [{ label: "Error", value: "Operating time must be positive" }];
        const consumptionTonnes = (v.cylOil * v.bhp * v.hours) / 1e6;
        const dailyTonnes = consumptionTonnes / (v.hours / 24);
        return [
          { label: "Calculated Oil Consumption", value: `${(consumptionTonnes * 1000).toFixed(0)} kg` },
          { label: "Average Daily Consumption", value: `${(dailyTonnes * 1000).toFixed(1)} kg/day` },
        ];
      },
    },
    {
      id: "startup-checklist-time",
      name: "Prepare-for-Sea Lead-Time Planner",
      group: "Start-up",
      formula: "Required lead time = vessel-specific sequence and parallel/serial task durations",
      variables: [
        { symbol: "t_preheat", label: "Required pre-heating duration from ship/maker procedure", unit: "min" },
        { symbol: "t_LO", label: "Required lubricating-oil circulation duration", unit: "min" },
        { symbol: "t_checks", label: "Other vessel-specific preparation/check duration", unit: "min" },
      ],
      source: { code: "Vessel-specific engine-room prepare-for-sea procedure" },
      note: "The former formula added invented 15 min/engine, 10 min/generator and a fixed 30 min check allowance. There is no universal maritime standard for those times. Enter only durations required by the installed machinery procedures and actual work plan.",
      inputs: [
        { key: "preHeat", label: "Required Pre-heating", unit: "min", placeholder: "60" },
        { key: "loCirc", label: "Required LO Circulation", unit: "min", placeholder: "30" },
        { key: "other", label: "Other Sequential Checks/Tasks", unit: "min", placeholder: "30" },
      ],
      calculate: (v) => {
        if (v.preHeat < 0 || v.loCirc < 0 || v.other < 0) {
          return [{ label: "Error", value: "Durations cannot be negative" }];
        }
        const parallelPreparation = Math.max(v.preHeat, v.loCirc);
        const total = parallelPreparation + v.other;
        return [
          { label: "Parallel Pre-conditions", value: `${parallelPreparation.toFixed(0)} min` },
          { label: "Other Sequential Tasks", value: `${v.other.toFixed(0)} min` },
          { label: "Planned Lead Time", value: `${total.toFixed(0)} min` },
          { label: "Operational Authority", value: "Verify sequence/timing against maker manuals, PMS and vessel procedure" },
        ];
      },
    },
    {
      id: "engine-warmup-time",
      name: "Idealized Thermal Warm-up Estimate",
      group: "Start-up",
      formula: "t = (m × cp × ΔT) / heater power",
      variables: [
        { symbol: "m", label: "Effective heated mass assumed by the model", unit: "kg" },
        { symbol: "cp", label: "Assumed effective specific heat", unit: "kJ/kg·K" },
        { symbol: "ΔT", label: "Temperature rise", unit: "K" },
        { symbol: "Q̇", label: "Effective heat input", unit: "kW" },
      ],
      source: { code: "Sensible-heat engineering estimate", detail: "Not a maker start-permission calculation" },
      note: "Real machinery warm-up is a transient heat-transfer process involving cooling-water/oil circuits, heat losses, component gradients and maker limits. No universal 'turning gear 1 hour' or 'jacket water 60 °C' limit is asserted here.",
      inputs: [
        { key: "mass", label: "Effective Heated Mass", unit: "tonnes", placeholder: "200" },
        { key: "cp", label: "Effective Specific Heat", unit: "kJ/kg·K", placeholder: "0.5" },
        { key: "tStart", label: "Initial Temperature", unit: "°C", placeholder: "20" },
        { key: "tTarget", label: "Target Temperature from Procedure", unit: "°C", placeholder: "60" },
        { key: "qHeater", label: "Effective Heater Power", unit: "kW", placeholder: "150" },
      ],
      calculate: (v) => {
        if (v.qHeater <= 0) return [{ label: "Error", value: "Heater power must be positive" }];
        if (v.tTarget < v.tStart) return [{ label: "Error", value: "Target temperature must not be below initial temperature for a warm-up estimate" }];
        const energyKJ = v.mass * 1000 * v.cp * (v.tTarget - v.tStart);
        const timeH = energyKJ / (v.qHeater * 3600);
        return [
          { label: "Idealized Heat Requirement", value: `${(energyKJ / 3600).toFixed(0)} kWh` },
          { label: "Idealized Warm-up Time", value: `${(timeH * 60).toFixed(0)} min` },
          { label: "Status", value: "Thermal estimate only — maker start conditions govern" },
        ];
      },
    },
    {
      id: "lube-oil-pressure-check",
      name: "Lubricating Oil Pressure Check against Entered Maker Limits",
      group: "Start-up",
      formula: "Compare measured pressure with maker/SMS alarm and operating limits",
      variables: [
        { symbol: "P_oil", label: "Measured oil pressure", unit: "bar" },
        { symbol: "Pmin", label: "Minimum operating pressure from maker/ship data", unit: "bar" },
        { symbol: "Pmax", label: "Maximum operating pressure from maker/ship data", unit: "bar" },
        { symbol: "Palarm", label: "Low-pressure alarm/set point from approved data", unit: "bar" },
      ],
      source: { code: "Installed-engine manufacturer manual / alarm list / vessel procedure" },
      note: "No generic 3–5 or 5–8 bar range is assumed. Enter only limits verified for the installed engine and operating condition.",
      inputs: [
        { key: "pMeasured", label: "Measured Pressure", unit: "bar", placeholder: "4.2" },
        { key: "pMin", label: "Verified Minimum Operating", unit: "bar", placeholder: "2.5" },
        { key: "pMax", label: "Verified Maximum Operating", unit: "bar", placeholder: "6.0" },
        { key: "pAlarm", label: "Verified Low Alarm", unit: "bar", placeholder: "2.0" },
      ],
      calculate: (v) => {
        if (v.pAlarm <= 0) return [{ label: "Error", value: "Entered alarm pressure must be positive" }];
        const status = v.pMeasured < v.pAlarm
          ? "Below entered alarm set-point"
          : v.pMeasured < v.pMin
            ? "Below entered operating minimum"
            : v.pMeasured > v.pMax
              ? "Above entered operating maximum"
              : "Within entered operating range";
        const margin = ((v.pMeasured - v.pAlarm) / v.pAlarm) * 100;
        return [
          { label: "Comparison", value: status },
          { label: "Margin above Entered Low Alarm", value: `${margin.toFixed(1)}%` },
          { label: "Entered Operating Range", value: `${v.pMin}–${v.pMax} bar` },
          { label: "Operational Status", value: "Confirm with actual machinery alarms, trends and maker procedure" },
        ];
      },
    },
  ],
};
