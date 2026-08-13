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
    "Engine room resource management: risk assessment, fatigue management " +
    "and watchkeeping effectiveness. Each formula is followed by the calculator " +
    "that uses the same formula.",
  entries: [
    {
      id: "risk-level",
      name: "Risk Level",
      group: "Risk Assessment",
      formula: "Risk = Likelihood × Severity",
      variables: [
        { symbol: "Likelihood", label: "Likelihood of occurrence (1–5)" },
        { symbol: "Severity", label: "Severity of the consequence (1–5)" },
      ],
      source: { code: "5×5 risk matrix: Low (1–4), Medium (5–9), High (10–15), Very High (16–25)" },
      inputs: [
        { key: "prob", label: "Likelihood (1–5)", unit: "", placeholder: "3" },
        { key: "sev", label: "Severity (1–5)", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        const risk = v.prob * v.sev;
        const level = risk <= 4 ? "Low" : risk <= 9 ? "Orta" : risk <= 15 ? "High" : "Very High";
        const color = risk <= 4 ? "Green" : risk <= 9 ? "Yellow" : risk <= 15 ? "Turuncu" : "Red";
        return [
          { label: "Risk Score", value: `${risk}` },
          { label: "Risk Level", value: level },
          { label: "Risk Colour", value: color },
        ];
      },
    },
    {
      id: "risk-reduction-factor",
      name: "Risk Reduction Factor",
      group: "Risk Assessment",
      formula: "RRF = Risk_before / Risk_after",
      variables: [
        { symbol: "Risk_before", label: "Risk score before the control measure" },
        { symbol: "Risk_after", label: "Risk score after the control measure" },
      ],
      source: { code: "Risk reduction assessment (RRF > 1: the control measure is effective)" },
      note: "The risk scores before and after the control measure are entered; the measure is effective when RRF > 1.",
      inputs: [
        { key: "before", label: "Risk Score Before", unit: "", placeholder: "16" },
        { key: "after", label: "Risk Score After", unit: "", placeholder: "4" },
      ],
      calculate: (v) => {
        if (v.after <= 0) return [{ label: "Error", value: "The risk score after must be positive" }];
        const rrf = v.before / v.after;
        const redux = ((v.before - v.after) / v.before) * 100;
        return [
          { label: "Risk Reduction Factor (RRF)", value: rrf.toFixed(2) },
          { label: "Risk Reduction", value: `${redux.toFixed(0)} %` },
          { label: "Assessment", value: rrf > 1 ? "The control measure is effective" : "The control measure is insufficient" },
        ];
      },
    },
    {
      id: "ltif",
      name: "Accident Frequency Rate (LTIF)",
      group: "Risk Assessment",
      formula: "LTIF = (Lost time injuries / Total hours worked) × 10⁶",
      variables: [
        { symbol: "LTI", label: "Number of lost time injuries" },
        { symbol: "H", label: "Total hours worked", unit: "h" },
      ],
      source: { code: "Lost Time Injury Frequency (per million hours worked)" },
      note: "The formula is derived from the relation in the calculator: LTIF = (LTI / H) × 1,000,000.",
      inputs: [
        { key: "lti", label: "Number of Lost Time Injuries", unit: "", placeholder: "2" },
        { key: "hours", label: "Total Hours Worked", unit: "h", placeholder: "500000" },
      ],
      calculate: (v) => {
        const ltif = (v.lti / v.hours) * 1e6;
        const status = ltif < 1 ? "Very Good" : ltif < 3 ? "Good" : ltif < 5 ? "Orta" : "Poor";
        return [
          { label: "LTIF", value: ltif.toFixed(2) },
          { label: "Assessment", value: status },
        ];
      },
    },
    {
      id: "fatigue-index",
      name: "Fatigue Index",
      group: "Human Factors",
      formula: "FI = min(100, (Work / Rest) × Days × 3)",
      variables: [
        { symbol: "Work", label: "Daily hours of work", unit: "h" },
        { symbol: "Dinlenme", label: "Daily hours of rest", unit: "h" },
        { symbol: "Days", label: "Consecutive days worked", unit: "days" },
      ],
      source: { code: "STCW / MLC rest hours: min 10 hours per 24 hours, min 77 hours per 7 days" },
      note: "The index relation is derived from the calculator; for MLC compliance the work must be ≤ 14 hours and the rest ≥ 10 hours.",
      inputs: [
        { key: "workHours", label: "Daily Work", unit: "h", placeholder: "14" },
        { key: "restHours", label: "Daily Rest", unit: "h", placeholder: "10" },
        { key: "days", label: "Consecutive Days Worked", unit: "days", placeholder: "14" },
      ],
      calculate: (v) => {
        const ratio = v.workHours / v.restHours;
        const fatigue = Math.min(100, ratio * v.days * 3);
        const status = fatigue < 30 ? "Low" : fatigue < 60 ? "Orta" : fatigue < 80 ? "High" : "Kritik";
        const mclCompliant = v.workHours <= 14 && v.restHours >= 10;
        return [
          { label: "Fatigue Index", value: `${fatigue.toFixed(0)}%` },
          { label: "Risk Level", value: status },
          { label: "MLC Compliance", value: mclCompliant ? "Compliant" : "UYUMSUZ" },
        ];
      },
    },
    {
      id: "watch-effectiveness",
      name: "Watchkeeping Effectiveness",
      group: "Human Factors",
      formula: "η_watch = max(0, 100 − Incidents × 10 − max(0, Task load − 4) × 5)",
      variables: [
        { symbol: "Personel", label: "Engine room personnel", unit: "persons" },
        { symbol: "Watch", label: "Watch duration", unit: "h" },
        { symbol: "Tasks", label: "Daily routine tasks", unit: "units" },
        { symbol: "Olay", label: "Monthly number of incidents", unit: "units" },
        { symbol: "Task load", label: "Task load per person (= Tasks / Crew)", unit: "tasks/person" },
      ],
      source: { code: "STCW watchkeeping principles (Chapter VIII) — operational effectiveness indicator" },
      note: "The effectiveness score relation is derived from the calculator; the task load per person = tasks / crew.",
      inputs: [
        { key: "crew", label: "Engine Room Personnel", unit: "persons", placeholder: "8" },
        { key: "watchHours", label: "Watch Duration", unit: "h", placeholder: "4" },
        { key: "tasks", label: "Daily Routine Tasks", unit: "units", placeholder: "25" },
        { key: "incidents", label: "Monthly Incidents", unit: "units", placeholder: "2" },
      ],
      calculate: (v) => {
        const watchesPerDay = 24 / v.watchHours;
        const crewPerWatch = v.crew / (watchesPerDay > 2 ? 3 : 2);
        const taskLoad = v.tasks / v.crew;
        const effectiveness = Math.max(0, 100 - v.incidents * 10 - Math.max(0, taskLoad - 4) * 5);
        return [
          { label: "Watches per Day", value: `${watchesPerDay.toFixed(0)}` },
          { label: "Crew per Watch", value: `${crewPerWatch.toFixed(1)}` },
          { label: "Task Load per Person", value: `${taskLoad.toFixed(1)} tasks/person` },
          { label: "Effectiveness Score", value: `${effectiveness.toFixed(0)}%` },
        ];
      },
    },
  ],
};
