import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Scale, AlertTriangle, CheckCircle, Info } from "lucide-react";

const rules = [
  {
    title: "MARPOL Annex VI — Air Pollution",
    icon: Scale,
    sections: [
      {
        subtitle: "Sulphur Limits (SOx)",
        rules: [
          "Global sulphur limit: 0.50% m/m (from 1 January 2020)",
          "In ECAs: 0.10% m/m",
          "Alternative: the use of an approved exhaust gas cleaning system (scrubber)",
          "Fuel changeover procedure: records must be kept when entering and leaving an ECA"
        ]
      },
      {
        subtitle: "NOx Emission Levels",
        rules: [
          "Tier I: ships built before 2000",
          "Tier II: ships built after 2011 (global standard)",
          "Tier III: ships built after 2016, mandatory in NECAs",
          "Tier III must be at least 80% below the Tier I value"
        ]
      },
      {
        subtitle: "Energy Efficiency",
        rules: [
          "EEDI: mandatory for new ships (2013 onwards)",
          "EEXI: mandatory for existing ships (2023 onwards)",
          "CII: annual operational rating (A-E), mandatory from 2023",
          "SEEMP: a ship energy efficiency management plan for all ships"
        ]
      }
    ]
  },
  {
    title: "BWM Convention — Ballast Water",
    icon: Scale,
    sections: [
      {
        subtitle: "D-1 Standard (Exchange)",
        rules: [
          "At least 200 nautical miles from the nearest land",
          "The water depth must be at least 200 metres",
          "At least 95% of the ballast water must be exchanged",
          "Methods: sequential, flow-through or dilution"
        ]
      },
      {
        subtitle: "D-2 Standard (Treatment)",
        rules: [
          "Viable organism limits: <10 organisms ≥50 μm per m³",
          "In the 10-50 μm range: <10 organisms per ml",
          "The system must hold IMO type approval",
          "A Ballast Water Record Book must be maintained"
        ]
      }
    ]
  },
  {
    title: "MARPOL Annex I — Oil Pollution",
    icon: Scale,
    sections: [
      {
        subtitle: "Bilge Water Discharge",
        rules: [
          "The oil content must be less than 15 ppm",
          "Approved oil filtering equipment must be used",
          "The automatic stopping device must be active",
          "Zero discharge in special areas (Mediterranean, Baltic etc.)"
        ]
      },
      {
        subtitle: "Cargo Tank Washing",
        rules: [
          "COW (Crude Oil Washing) procedures",
          "Slop tank management",
          "Load-on-top procedure",
          "Oil Record Book Part II entries"
        ]
      }
    ]
  },
  {
    title: "MARPOL Annex V — Garbage",
    icon: Scale,
    sections: [
      {
        subtitle: "Discharge Prohibitions",
        rules: [
          "Plastics: discharge into the sea is PROHIBITED everywhere",
          "Food waste: more than 12 nm from land (comminuted: more than 3 nm)",
          "Cargo residues: more than 12 nm from land (non-harmful substances)",
          "In special areas: zero discharge for most waste"
        ]
      },
      {
        subtitle: "Records and Reporting",
        rules: [
          "A Garbage Record Book is mandatory (ships of 400 GT and above)",
          "A garbage management plan must be in place",
          "Receipts for delivery to port reception facilities must be retained",
          "Records must be kept for two years"
        ]
      }
    ]
  },
  {
    title: "IMO DCS and Regional MRV",
    icon: Scale,
    sections: [
      {
        subtitle: "IMO DCS (Data Collection System)",
        rules: [
          "Mandatory for ships of 5000 GT and above",
          "Annual fuel consumption reporting",
          "Distance travelled and hours under way",
          "SEEMP Part II documentation"
        ]
      },
      {
        subtitle: "EU MRV Regulation",
        rules: [
          "Ships of 5000 GT and above calling at EU ports",
          "CO₂ emissions, fuel consumption and distance",
          "Annual verification and reporting",
          "Publicly available emission data"
        ]
      }
    ]
  }
];

const warnings = [
  {
    type: "critical",
    text: "Ships rated CII D or E must submit a corrective action plan within three years."
  },
  {
    type: "critical",
    text: "Ships without an EEXI certificate may not trade from 2023 onwards."
  },
  {
    type: "warning",
    text: "The fuel changeover procedure must be completed before the ECA boundary and recorded."
  },
  {
    type: "info",
    text: "For the wash water discharge limits of ships using scrubbers, see IMO resolution MEPC.259(68)."
  }
];

export default function EmissionRules() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <Scale className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Çevre Kuralları
          </h1>
        </div>

        {/* Warnings */}
        <div className="space-y-3 mb-8">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                warning.type === "critical" 
                  ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" 
                  : warning.type === "warning"
                  ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                  : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              }`}
            >
              {warning.type === "critical" ? (
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              ) : warning.type === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${
                warning.type === "critical" 
                  ? "text-red-700 dark:text-red-300" 
                  : warning.type === "warning"
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-blue-700 dark:text-blue-300"
              }`}>
                {warning.text}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {rules.map((rule, index) => (
            <Card 
              key={index} 
              className="border-border/60 bg-card/85 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  {rule.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {rule.sections.map((section, sIndex) => (
                  <div key={sIndex}>
                    <h4 className="font-semibold text-foreground mb-3">{section.subtitle}</h4>
                    <ul className="space-y-2">
                      {section.rules.map((item, iIndex) => (
                        <li key={iIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
