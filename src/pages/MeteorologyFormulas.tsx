import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Wind, Waves, Thermometer, CloudRain } from "lucide-react";

const meteorologyFormulas = [
  {
    title: "True Wind Speed",
    icon: Wind,
    formula: "V⃗t = V⃗a + V⃗g  ⇒  |Vt| = √(Va² + Vg² + 2·Va·Vg·cos(θ))",
    variables: [
      "Va: apparent wind speed",
      "Vg: vessel speed",
      "θ: the angle between the Va vector and the vessel velocity vector"
    ],
    note: "Note: the definitions must be vectorial. If θ is measured against a different reference, such as the direction the relative wind comes from, the sign can change; the safest approach is to use the vector relation V⃗t = V⃗a + V⃗g."
  },
  {
    title: "Air Density",
    icon: Thermometer,
    formula: "ρ = P / (R · T)",
    variables: [
      "ρ: air density (kg/m³)",
      "P: atmospheric pressure (Pa)",
      "R: specific gas constant = 287 J/kg·K",
      "T: absolute temperature (kelvin)"
    ],
    note: "Under standard conditions (15 °C, 1013.25 hPa) ρ ≈ 1.225 kg/m³"
  },
  {
    title: "Derin Su Dalgaboyu",
    icon: Waves,
    formula: "L = (g · T²) / (2π)",
    variables: [
      "L: Dalgaboyu (m)",
      "g: gravitational acceleration = 9.81 m/s²",
      "T: Dalga periyodu (s)",
      "π ≈ 3.14159"
    ],
    note: "Derin su: Derinlik > L/2"
  },
  {
    title: "Wave Speed (Deep Water)",
    icon: Waves,
    formula: "C = L / T = (g · T) / (2π) ≈ 1.56 · T",
    variables: [
      "C: wave speed (m/s)",
      "L: Dalgaboyu (m)",
      "T: Dalga periyodu (s)"
    ],
    note: "Knot cinsinden: C (kn) ≈ 3.03 · T"
  },
  {
    title: "Beaufort Wind Speed",
    icon: Wind,
    formula: "V = 0.836 · B^1.5",
    variables: [
      "V: wind speed (m/s)",
      "B: Beaufort number (0-12)"
    ],
    note: "Approximate formula. Beaufort 8 (gale) ≈ 34-40 knots"
  },
  {
    title: "Dew Point Temperature",
    icon: CloudRain,
    formula: "Td ≈ T - ((100 - RH) / 5)",
    variables: [
      "Td: dew point temperature (°C)",
      "T: air temperature (°C)",
      "RH: relative humidity (%)"
    ],
    note: "Simple approximation formula. Fog risk: T − Td < 2.5 °C"
  },
  {
    title: "Pressure Reduced to Sea Level",
    icon: Thermometer,
    formula: "P₀ = P · e^( (g·h) / (R·T̄) )",
    variables: [
      "P₀: sea level pressure",
      "P: measured pressure",
      "h: height (m)",
      "T̄: mean temperature (K)"
    ],
    note: "Approximately a 1 hPa drop for every 8 m of height"
  }
];

export default function MeteorologyFormulasPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Sigma className="h-4 w-4" />
            Meteorology Formulas
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Meteorology Formulas
          </h1>
        </div>

        <div className="grid gap-6">
          {meteorologyFormulas.map((formula, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <formula.icon className="h-5 w-5 text-sky-600" />
                  {formula.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <pre className="font-mono text-sm sm:text-lg text-left whitespace-pre-wrap break-words leading-relaxed">
                    {formula.formula}
                  </pre>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Variables:</p>
                  <ul className="space-y-1">
                    {formula.variables.map((variable, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-sky-500 mt-1">•</span>
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
