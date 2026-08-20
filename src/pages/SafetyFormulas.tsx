import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Flame, Droplets, Wind } from "lucide-react";

const safetyFormulas = [
  {
    title: "Amount of Foam Solution",
    icon: Droplets,
    formula: "Q = Application Rate × Area × Duration",
    variables: [
      "Q: required foam quantity (litres)",
      "Application rate: 6.5 L/m²/min (machinery space)",
      "Application rate: 4.0 L/m²/min (deck)",
      "Alan: Korunan alan (m²)",
      "Duration: the application time (min)"
    ],
    note: "The minimum application times are set by SOLAS and the FSS Code."
  },
  {
    title: "CO₂ Quantity",
    icon: Wind,
    formula: "M = 1.5 × V × (ρgas / ρliq)",
    variables: [
      "M: required CO₂ quantity (kg)",
      "V: Korunan hacim (m³)",
      "ρgas ≈ 1.84 kg/m³ (20°C'de)",
      "ρliq ≈ 770 kg/m³ (15°C'de)"
    ],
    note: "In practice: 40% of the volume × 1.5 kg/m³ for a machinery space"
  },
  {
    title: "Water Mist Flow Rate",
    icon: Droplets,
    formula: "Q = K × √P",
    variables: [
      "Q: Debi (L/dk)",
      "K: nozzle factor",
      "P: pressure (bar)"
    ],
    note: "The K value is taken from the manufacturer's catalogue for the nozzle type."
  },
  {
    title: "Fire Water Capacity",
    icon: Flame,
    formula: "Capacity = Q × t × n",
    variables: [
      "Q: Flow rate of each hydrant (m³/h)",
      "t: minimum operating time (hours)",
      "n: number of hydrants operating simultaneously"
    ],
    note: "Calculated in accordance with the SOLAS II-2 requirements."
  },
  {
    title: "Escape Time Calculation",
    icon: Wind,
    formula: "t = L / v",
    variables: [
      "t: escape time (minutes)",
      "L: escape route length (m)",
      "v: walking speed (typically 1.2 m/s)"
    ],
    note: "The speed must be reduced for personnel with impaired mobility."
  },
  {
    title: "Risk Matrix Score",
    icon: Flame,
    formula: "Risk = Likelihood × Severity",
    variables: [
      "Likelihood: 1-5 (rare – very frequent)",
      "Severity: 1-5 (negligible – catastrophic)",
      "Risk Skoru: 1-25"
    ],
    note: "15+ = High Risk, 8-14 = Medium Risk, 1-7 = Low Risk"
  }
];

export default function SafetyFormulasPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Sigma className="h-4 w-4" />
            Safety Formulas
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
            Safety Formulas
          </h1>
        </div>

        <div className="grid gap-6">
          {safetyFormulas.map((formula, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <formula.icon className="h-5 w-5 text-rose-600" />
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
                        <span className="text-rose-500 mt-1">•</span>
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
