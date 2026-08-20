import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, AlertTriangle, FileText, Ship } from "lucide-react";

const cargoRules = [
  {
    title: "IMSBC Code",
    icon: FileText,
    rules: [
      "Transportable Moisture Limit (TML) and Flow Moisture Point (FMP) checks are mandatory.",
      "Cargo classification (groups A, B, C) must be done correctly.",
      "Special carriage conditions and hazardous properties must be taken into account.",
      "The Shipper's Declaration and the certificates must be complete."
    ]
  },
  {
    title: "International Grain Code",
    icon: Ship,
    rules: [
      "Grain Stability: GM ≥ 0.30 m (corrected)",
      "Heeling angle ≤ 12° (statik)",
      "Area under the GZ curve ≥ 0.075 m·rad",
      "Free surface corrections must be applied."
    ]
  },
  {
    title: "ISGOTT & Terminal Procedures",
    icon: AlertTriangle,
    rules: [
      "Gas measurements must be taken before the manifold is opened.",
      "Hot work permits must be issued in coordination with the terminal.",
      "Manifold connections and safety equipment must be checked.",
      "Emergency shutdown procedures must be ready."
    ]
  },
  {
    title: "SOLAS Requirements",
    icon: Scale,
    rules: [
      "VGM (Verified Gross Mass) is mandatory for container loading.",
      "The Cargo Securing Manual requirements must be met.",
      "The stability booklet limits must not be exceeded.",
      "Dangerous goods declarations must be complete."
    ]
  }
];

export default function CargoRulesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Shipping Rules
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            Cargo Handling and Stacking Rules
          </h1>
        </div>

        <div className="grid gap-6">
          {cargoRules.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-amber-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-500 mt-1">▸</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
