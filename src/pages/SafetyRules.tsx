import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield, Flame, LifeBuoy } from "lucide-react";

const safetyRules = [
  {
    title: "SOLAS Bölüm II-2 - Yangın Güvenliği",
    icon: Flame,
    rules: [
      "Fire detection and alarm systems are mandatory.",
      "Fire fighting appliances (FFA) must be complete.",
      "Fire doors and divisions must be checked regularly.",
      "Fire plans must be posted in visible locations.",
      "Fire extinguishers must be serviced regularly."
    ]
  },
  {
    title: "LSA Kodu - Can Kurtarma Donanımları",
    icon: LifeBuoy,
    rules: [
      "Liferafts and lifeboats must be serviced regularly.",
      "Lifejackets must be available for all crew.",
      "EPIRB and SART devices must be in working order.",
      "Emergency position indicating beacons (EPIRB) must be registered.",
      "Immersion suits and thermal protective aids must be carried in sufficient numbers."
    ]
  },
  {
    title: "ISM Kodu",
    icon: Shield,
    rules: [
      "The DOC (Document of Compliance) must be valid for the company.",
      "The SMC (Safety Management Certificate) must be valid for the ship.",
      "A DPA (Designated Person Ashore) must be appointed.",
      "Emergency procedures must be documented.",
      "Internal audits must be carried out annually."
    ]
  },
  {
    title: "ISPS Kodu - Güvenlik",
    icon: Scale,
    rules: [
      "The ISSC (International Ship Security Certificate) must be valid.",
      "The SSP (Ship Security Plan) must be approved and implemented.",
      "An SSO (Ship Security Officer) must be appointed.",
      "Security drills must be held regularly.",
      "Access controls and visitor records must be kept."
    ]
  }
];

export default function SafetyRulesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Emniyet Kuralları
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
            Emniyet Kuralları
          </h1>
        </div>

        <div className="grid gap-6">
          {safetyRules.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-rose-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-rose-500 mt-1">▸</span>
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
