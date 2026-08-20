import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Fuel, Wrench, AlertTriangle, ClipboardCheck } from "lucide-react";

const ruleCategories = [
  {
    title: "MARPOL Annex VI — Air Pollution",
    icon: Fuel,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    rules: [
      {
        subtitle: "Sulfur Limits",
        content: [
          "Global sulphur limit: 0.50% m/m (from 1 January 2020)",
          "In ECAs: 0.10% m/m",
          "Use of compatible fuel or scrubber is mandatory",
          "BDN and fuel sample should be kept for 3 years",
        ],
      },
      {
        subtitle: "NOx Requirements",
        content: [
          "Tier I: for ships built before 2000",
          "Tier II: Ships built between 2011 and 2016",
          "Tier III: Post-2016 ships in ECA regions",
          "EIAPP certification required",
        ],
      },
      {
        subtitle: "Energy Efficiency",
        content: [
          "EEDI: Mandatory for new ships",
          "SEEMP: Mandatory for all ships",
          "EEXI: For existing ships (2023)",
          "CII: Annual carbon intensity assessment",
        ],
      },
    ],
  },
  {
    title: "ISM Code - Security Management",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    rules: [
      {
        subtitle: "Maintenance Requirements",
        content: [
          "Planned maintenance system (PMS) implementation is mandatory",
          "Critical equipment list should be defined",
          "Maintenance records should be kept and preserved",
          "There should be a spare parts management procedure",
        ],
      },
      {
        subtitle: "Operational Controls",
        content: [
          "Engine room daily checklists",
          "Parameter recording and trend analysis",
          "Fault reporting and tracking system",
          "Corrective and preventive actions",
        ],
      },
      {
        subtitle: "Training and Competence",
        content: [
          "Machine personnel competency requirements",
          "Emergency drills (fire, abandonment, etc.)",
          "Familiarization procedures",
          "Continuing education records",
        ],
      },
    ],
  },
  {
    title: "SOLAS - Machinery Requirements",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    rules: [
      {
        subtitle: "Propulsion and Rudder",
        content: [
          "Backup steering system requirement",
          "Rudder test procedures (each takeoff)",
          "Emergency steering operation training",
          "Main engine maneuverability requirements",
        ],
      },
      {
        subtitle: "Electrical Systems",
        content: [
          "Emergency generator requirements",
          "UPS and battery capacities",
          "Electrical panel protection requirements",
          "Insulation monitoring systems",
        ],
      },
      {
        subtitle: "Fire Safety",
        content: [
          "Engine room fire extinguishing systems",
          "Automatic detection and alarm",
          "Quick closing valves",
          "Emergency fuel cut-off systems",
        ],
      },
    ],
  },
  {
    title: "Class Rules",
    icon: ClipboardCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    rules: [
      {
        subtitle: "Periodic Surveys",
        content: [
          "Annual survey requirements",
          "Intermediate survey (2.5 years)",
          "Special survey (5 years)",
          "Docking survey requirements",
        ],
      },
      {
        subtitle: "Machinery Surveys",
        content: [
          "Main engine part lives and controls",
          "Auxiliary machinery survey intervals",
          "Shaft line and propeller controls",
          "Boiler and pressure vessel inspections",
        ],
      },
      {
        subtitle: "CMS (Condition Monitoring)",
        content: [
          "Continuous monitoring alternatives",
          "Vibration analysis requirements",
          "Oil analysis programs",
          "Performance monitoring systems",
        ],
      },
    ],
  },
  {
    title: "Bunker Procedures",
    icon: Fuel,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
    rules: [
      {
        subtitle: "Before Bunker",
        content: [
          "Bunker plan should be prepared",
          "Tank calculations should be made",
          "Security checklist must be completed",
          "Communication procedures should be determined",
        ],
      },
      {
        subtitle: "Bunker Row",
        content: [
          "Flow rate control",
          "Tank level tracking",
          "Leak check",
          "Emergency stop preparation",
        ],
      },
      {
        subtitle: "Post Bunker",
        content: [
          "BDN check and signature",
          "Sampling (MARPOL requirement)",
          "Quantity verification",
          "Registration and documentation",
        ],
      },
    ],
  },
  {
    title: "Emergency Procedures",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    rules: [
      {
        subtitle: "Engine Room Fire",
        content: [
          "Alarm and evacuation procedure",
          "Ventilation shutdown",
          "Fuel cut-off procedure",
          "CO2/FM200 release procedure",
        ],
      },
      {
        subtitle: "Blackout",
        content: [
          "Emergency generator commissioning",
          "Prioritization of critical systems",
          "Host restart procedure",
          "Controls after blackout",
        ],
      },
      {
        subtitle: "Other Emergencies",
        content: [
          "Rudder malfunction procedure",
          "Main engine failure",
          "Overboard spill procedure",
          "Crankcase explosion",
        ],
      },
    ],
  },
];

export default function MachineRules() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-600 via-zinc-600 to-slate-800 bg-clip-text text-transparent mb-3">
            Machine Rules
          </h1>
        </div>

        <div className="space-y-6">
          {ruleCategories.map((category) => (
            <Card key={category.title} className="bg-white/80 dark:bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 ${category.bgColor} rounded-lg`}>
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {category.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                        {rule.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {rule.content.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                          >
                            <span className="text-slate-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
