import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, CloudSun } from "lucide-react";

const meteorologyRules = [
  {
    title: "SOLAS V/34 - Voyage Planning",
    icon: FileText,
    rules: [
      "Current meteorological data must be used when preparing the passage plan.",
      "Weather forecasts and routeing recommendations must be taken into account.",
      "Alternative routes must be planned for severe weather conditions.",
      "Meteorological data and forecasts must be kept in the voyage plan file."
    ]
  },
  {
    title: "IMO Weather Routing Guidelines",
    icon: CloudSun,
    rules: [
      "An avoidance plan is essential on routes where severe weather is expected.",
      "Weather routeing services should be used.",
      "Cargo safety and fuel economy must be balanced when selecting the route.",
      "500 nm kuralı: Tropik siklon 500 nm içindeyse rota değişikliği değerlendirilmelidir."
    ]
  },
  {
    title: "STCW VIII/2 - Watchkeeping",
    icon: Shield,
    rules: [
      "Bridge watchkeeping officers must continuously assess the meteorological data.",
      "Changes in the weather must be recorded in the deck log book.",
      "The master must be kept regularly informed of the weather conditions.",
      "Görüş mesafesi azaldığında uygun önlemler alınmalıdır."
    ]
  },
  {
    title: "WMO Denizcilik Servisleri",
    icon: Scale,
    rules: [
      "NAVTEX uyarıları takip edilmelidir.",
      "Gale warnings ve storm warnings ciddiye alınmalıdır.",
      "Meteorolojik NAVAREA bildirileri kontrol edilmelidir.",
      "Synoptic haritalar ve analiz grafikleri yorumlanmalıdır."
    ]
  }
];

export default function MeteorologyRulesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
<div className="text-sm text-muted-foreground flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Meteoroloji Kuralları
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Meteoroloji Kuralları
          </h1>
        </div>

        <div className="grid gap-6">
          {meteorologyRules.map((section, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-sky-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-sky-500 mt-1">▸</span>
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
