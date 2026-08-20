import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Anchor, Wind, Ship } from "lucide-react";

const seamanshipFormulas = [
  {
    title: "Mooring Working Load",
    icon: Anchor,
    formula: "Working Load (kN) = (SWL × Safety Factor) / 1000",
    variables: [
      "SWL: Safe Working Load (kg)",
      "Safety factor: 0.55 - 0.60 (standard)"
    ],
    note: "The approximation MBL (Minimum Breaking Load) = SWL / 0.55 may be used."
  },
  {
    title: "Wind Force",
    icon: Wind,
    formula: "F = 0.613 × Cd × A × V²",
    variables: [
      "F: Kuvvet (N)",
      "Cd: drag coefficient (typically 1.0-1.3)",
      "A: frontal area exposed to the wind (m²)",
      "V: wind speed (m/s)"
    ],
    note: "Divide the result by 1000 for kN."
  },
  {
    title: "Chain Catenary Slope",
    icon: Ship,
    formula: "T = W × sinh(s / a)",
    variables: [
      "T: Zincir gerilimi",
      "W: weight per unit length (kg/m)",
      "s: Yatay mesafe",
      "a: Katenary parametresi"
    ],
    note: "Catenary analysis requires complex calculation; Tables are used in practice."
  },
  {
    title: "Anchor Holding Force",
    icon: Anchor,
    formula: "Holding Power = Anchor Weight × Holding Coefficient",
    variables: [
      "Anchor weight: kg",
      "Holding coefficient: 2-12 (by seabed type)"
    ],
    note: "Mud: 2-4, sand: 5-8, clay: 6-12"
  },
  {
    title: "Tug Bollard Pull",
    icon: Ship,
    formula: "Required BP = (Δ × V²) / K",
    variables: [
      "Δ: vessel displacement (tonnes)",
      "V: required speed (knots)",
      "K: coefficient (approximately 1000-1500)"
    ],
    note: "Real calculations must also include the resistance."
  },
  {
    title: "Scope Ratio",
    icon: Anchor,
    formula: "Scope = Cable Length / Water Depth",
    variables: [
      "Normal conditions: 5:1 - 7:1",
      "Storm conditions: 10:1 or more"
    ],
    note: "Longer scope = better holding force"
  }
];

export default function SeamanshipFormulasPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Sigma className="h-4 w-4" />
            Seamanship Formulas
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            Seamanship Formulas
          </h1>
        </div>

        <div className="grid gap-6">
          {seamanshipFormulas.map((formula, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <formula.icon className="h-5 w-5 text-emerald-600" />
                  {formula.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <pre translate="no" className="notranslate font-mono text-sm sm:text-lg text-left whitespace-pre-wrap break-words leading-relaxed">
                    {formula.formula}
                  </pre>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Variables:</p>
                  <ul className="space-y-1">
                    {formula.variables.map((variable, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        {variable}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">{formula.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
