import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Anchor } from "lucide-react";

const requirementGroups = [
  {
    title: "Yapısal & Stabilite",
    badge: "Bölüm II-1",
    description: "Bölmelendirme, su alma senaryoları ve hasar stabilitesi gereklilikleri.",
    items: [
      "Watertight subdivision lines and door plans must be available digitally",
      "The Damage Control Booklet must be kept up to date on the bridge",
      "The computer-based stability program must be approved by class",
    ],
    readiness: 82,
  },
  {
    title: "Fire Safety",
    badge: "Chapter II-2",
    description: "Yangın bölmeleri, sprinkler/ drencher sistemleri, sabit gazlı söndürme ve algılama ekipmanları.",
    items: [
      "A copy of the Fire Control Plan for each zone and glow-in-the-dark cards",
      "CO₂ room access, locking and counting systems are in working order",
      "Test records of the engine room heat sensors and high-fog systems",
    ],
    readiness: 76,
  },
  {
    title: "Can Kurtarma & Tahliye",
    badge: "Bölüm III",
    description: "Filikalar, can salları, MES sistemleri ve muster düzenlemeleri.",
    items: [
      "Five-yearly load test certificates for the lifeboats and davits are on file",
      "MES deployment drill videos and checklists are retained",
      "The muster list and duty cards are up to date for every watch",
    ],
    readiness: 88,
  },
  {
    title: "Seyir ve Haberleşme",
    badge: "Bölüm V",
    description: "Navigasyon ekipmanları, kayıt cihazları, seyir defterleri ve GMDSS prosedürleri.",
    items: [
      "BNWAS, VDR and ECDIS function test reports within 90 days",
      "The passage plan templates have been revised to SOLAS requirements",
      "GMDSS confirmation messages and test logs are signed monthly",
    ],
    readiness: 90,
  },
];

const SOLASShipRequirementsPage = () => {
  return (
          <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Anchor className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-300">Teknik Gereklilikler</p>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                SOLAS Gemi Gereksinimleri
              </h1>
            </div>
          </div>
        </div>

        {/* Requirement Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirementGroups.map((group) => (
            <Card key={group.title} className="border border-indigo-100/60 shadow-md shadow-indigo-500/10">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{group.badge}</Badge>
                  <span className="text-xs text-muted-foreground">Hazırlık: %{group.readiness}</span>
                </div>
                <CardTitle>{group.title}</CardTitle>
                <Progress value={group.readiness} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOLASShipRequirementsPage;
