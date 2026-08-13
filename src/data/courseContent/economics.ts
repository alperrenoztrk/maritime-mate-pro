import { TrendingUp } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Commercial Operations in Shipping — single source course content.
 * Real commercial shipping relations for TCE, demurrage/despatch, bunker cost
 * and voyage economics; every formula has a linked calculator.
 */
export const economics: CourseTopic = {
  key: "economics",
  title: "Commercial Operations in Shipping",
  icon: TrendingUp,
  accent: "from-amber-400 via-yellow-500 to-orange-600",
  group: "deck",
  intro:
    "Voyage time, freight revenue, bunker cost, TCE and demurrage/despatch. " +
    "Each formula is followed by the tool that calculates it.",
  entries: [
    {
      id: "voyage-duration",
      name: "Voyage Time",
      group: "Voyage Plan",
      formula: "Time (days) = Distance / (Speed × 24)",
      variables: [
        { symbol: "Distance", label: "Voyage distance", unit: "NM" },
        { symbol: "Speed", label: "Average speed", unit: "kn" },
      ],
      source: { code: "Voyage plan — distance/speed relation" },
      inputs: [
        { key: "dist", label: "Distance", unit: "NM", placeholder: "5000" },
        { key: "speed", label: "Speed", unit: "kn", placeholder: "14" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Error", value: "The speed must be positive" }];
        const days = v.dist / (v.speed * 24);
        return [
          { label: "Voyage Time", value: `${days.toFixed(2)} days` },
          { label: "Voyage Time", value: `${(days * 24).toFixed(1)} h` },
        ];
      },
    },
    {
      id: "bunker-cost",
      name: "Bunker (Fuel) Cost",
      group: "Maliyetler",
      formula: "Cost = Consumption (t/day) × Days × Price",
      variables: [
        { symbol: "Consumption", label: "Daily fuel consumption", unit: "t/day" },
        { symbol: "Days", label: "Voyage time", unit: "days" },
        { symbol: "Fiyat", label: "Fuel unit price", unit: "$/t" },
      ],
      source: { code: "Voyage cost — bunker cost" },
      inputs: [
        { key: "cons", label: "Consumption", unit: "t/day", placeholder: "30" },
        { key: "days", label: "Days", unit: "days", placeholder: "15" },
        { key: "price", label: "Fiyat", unit: "$/t", placeholder: "600" },
      ],
      calculate: (v) => [{ label: "Bunker Cost", value: `$${(v.cons * v.days * v.price).toLocaleString("en-US")}` }],
    },
    {
      id: "freight-revenue",
      name: "Freight Revenue",
      group: "Gelir",
      formula: "Revenue = Cargo Quantity × Freight Rate",
      variables: [
        { symbol: "Cargo", label: "Cargo carried", unit: "t" },
        { symbol: "Freight Rate", label: "Freight rate per unit", unit: "$/t" },
      ],
      source: { code: "Freight revenue" },
      inputs: [
        { key: "cargo", label: "Cargo Quantity", unit: "t", placeholder: "50000" },
        { key: "rate", label: "Freight Rate", unit: "$/t", placeholder: "25" },
      ],
      calculate: (v) => [{ label: "Freight Revenue", value: `$${(v.cargo * v.rate).toLocaleString("en-US")}` }],
    },
    {
      id: "tce",
      name: "TCE (Time Charter Equivalent)",
      group: "Profitability",
      formula: "TCE = (Voyage Revenue − Voyage Costs) / Voyage Time",
      variables: [
        { symbol: "Voyage Revenue", label: "Gross freight revenue", unit: "$" },
        { symbol: "Voyage Costs", label: "Voyage cost (bunkers, port, canal)", unit: "$" },
        { symbol: "Voyage Time", label: "Total voyage time", unit: "days" },
      ],
      source: { code: "TCE — dry cargo/tanker earnings measure" },
      inputs: [
        { key: "revenue", label: "Voyage Revenue", unit: "$", placeholder: "1250000" },
        { key: "cost", label: "Voyage Costs", unit: "$", placeholder: "450000" },
        { key: "days", label: "Voyage Time", unit: "days", placeholder: "30" },
      ],
      calculate: (v) => {
        if (v.days <= 0) return [{ label: "Error", value: "The voyage time must be positive" }];
        return [{ label: "TCE", value: `$${((v.revenue - v.cost) / v.days).toFixed(0)} / day` }];
      },
    },
    {
      id: "laytime",
      name: "Laytime (Allowed Time)",
      group: "Charter Party",
      formula: "Laytime (days) = Cargo Quantity / Load-Discharge Rate",
      variables: [
        { symbol: "Cargo", label: "Cargo quantity", unit: "t" },
        { symbol: "Ratio", label: "Loading/discharge rate", unit: "t/day" },
      ],
      source: { code: "Charter Party — laytime calculation" },
      inputs: [
        { key: "cargo", label: "Cargo Quantity", unit: "t", placeholder: "50000" },
        { key: "rate", label: "Load/Discharge Rate", unit: "t/day", placeholder: "10000" },
      ],
      calculate: (v) => {
        if (v.rate <= 0) return [{ label: "Error", value: "The rate must be positive" }];
        return [{ label: "Laytime", value: `${(v.cargo / v.rate).toFixed(2)} days` }];
      },
    },
    {
      id: "demurrage",
      name: "Demurrage",
      group: "Charter Party",
      formula: "Demurrage = (Time Used − Laytime) × Rate",
      variables: [
        { symbol: "Time Used", label: "Time spent in port", unit: "days" },
        { symbol: "Laytime", label: "Allowed time", unit: "days" },
        { symbol: "Ratio", label: "Daily demurrage rate", unit: "$/day" },
      ],
      source: { code: "Charter Party — demurrage" },
      note: "A negative result means despatch (time saved) applies.",
      inputs: [
        { key: "used", label: "Time Used", unit: "days", placeholder: "7" },
        { key: "laytime", label: "Laytime", unit: "days", placeholder: "5" },
        { key: "rate", label: "Demurrage Rate", unit: "$/day", placeholder: "15000" },
      ],
      calculate: (v) => {
        const diff = v.used - v.laytime;
        const amount = diff * v.rate;
        if (diff <= 0) return [{ label: "Result", value: "No demurrage (despatch applies)" }];
        return [{ label: "Demurrage", value: `$${amount.toLocaleString("en-US")}` }];
      },
    },
    {
      id: "despatch",
      name: "Despatch",
      group: "Charter Party",
      formula: "Despatch = Time Saved × Rate",
      variables: [
        { symbol: "Time Saved", label: "Time saved from the laytime", unit: "days" },
        { symbol: "Ratio", label: "Despatch rate (usually demurrage/2)", unit: "$/day" },
      ],
      source: { code: "Charter Party — despatch (half of the demurrage)" },
      inputs: [
        { key: "saved", label: "Time Saved", unit: "days", placeholder: "2" },
        { key: "rate", label: "Despatch Rate", unit: "$/day", placeholder: "7500" },
      ],
      calculate: (v) => [{ label: "Despatch", value: `$${(v.saved * v.rate).toLocaleString("en-US")}` }],
    },
    {
      id: "break-even-freight",
      name: "Break-even Freight Rate",
      group: "Profitability",
      formula: "Break-even Rate = Total Voyage Cost / Cargo Quantity",
      variables: [
        { symbol: "Total Cost", label: "Total voyage cost", unit: "$" },
        { symbol: "Cargo", label: "Cargo quantity", unit: "t" },
      ],
      source: { code: "Break-even freight analysis" },
      inputs: [
        { key: "cost", label: "Total Voyage Cost", unit: "$", placeholder: "450000" },
        { key: "cargo", label: "Cargo Quantity", unit: "t", placeholder: "50000" },
      ],
      calculate: (v) => {
        if (v.cargo <= 0) return [{ label: "Error", value: "The cargo must be positive" }];
        return [{ label: "Break-even Freight", value: `$${(v.cost / v.cargo).toFixed(2)} / t` }];
      },
    },
  ],
};
