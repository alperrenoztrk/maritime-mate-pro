import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield, FileText, Anchor } from "lucide-react";

const seamanshipRules = [
  {
    title: "COLREG Part B - Rules of Maneuvering",
    icon: Anchor,
    rules: [
      "Rule 5: a proper look-out must be maintained at all times.",
      "Rule 6: the vessel must proceed at a safe speed.",
      "Rule 7: the risk of collision must be assessed correctly.",
      "Rule 8: action to avoid collision must be timely and readily apparent.",
      "Rules 15-17: right of way and manoeuvring obligations must be applied clearly."
    ]
  },
  {
    title: "ISM Code",
    icon: FileText,
    rules: [
      "A Safety Management System (SMS) must be implemented.",
      "An operational risk assessment is mandatory.",
      "All operations must be documented.",
      "A near-miss reporting system must be active.",
      "Regular internal audits must be carried out."
    ]
  },
  {
    title: "ISPS Code",
    icon: Shield,
    rules: [
      "The security levels (1, 2, 3) must be monitored.",
      "A Ship Security Plan (SSP) must be in place.",
      "Deck access controls must be applied.",
      "Visitor and cargo checks must be carried out.",
      "A Declaration of Security (DOS) must be completed when required."
    ]
  },
  {
    title: "Port and Terminal Instructions",
    icon: Scale,
    rules: [
      "Port Information Book kontrol edilmelidir.",
      "Local pilotage and towage requirements must be complied with.",
      "Terminal procedures and safety rules must be followed.",
      "VTS raporlama gereklilikleri yerine getirilmelidir.",
      "Environmental restrictions must be taken into account."
    ]
  }
];

export default function SeamanshipRulesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Seamanship Rules
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            Seamanship Rules
          </h1>
        </div>

        <div className="grid gap-6">
          {seamanshipRules.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-emerald-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">▸</span>
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
