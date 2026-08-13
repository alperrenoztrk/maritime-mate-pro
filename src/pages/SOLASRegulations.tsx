import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const chapters = [
  {
    id: "I",
    title: "Genel Hükümler",
    summary: "Uygulama kapsamı, bayrak devleti sorumlulukları ve sertifikasyon gereklilikleri.",
    checkpoints: [
      "Confirm that the ship falls within the scope of SOLAS",
      "Check the surveyor reports and the validity dates of the certificates",
      "Make sure any alterations carried out have been reported to the administration"
    ],
  },
  {
    id: "II-1",
    title: "Yapı, Bölmelendirme ve Stabilite",
    summary: "Gemi mukavemeti, su geçirmez bölmeler, makine dairesi güvenliği ve elektrik tesisatı.",
    checkpoints: [
      "Damage stability calculations are up to date and class-approved",
      "Remote and local controls of the watertight doors have been tested",
      "Machinery safety systems (LOP, high-temperature alarms) have been recorded"
    ],
  },
  {
    id: "II-2",
    title: "Fire Safety",
    summary: "Yangın bölmelendirmesi, algılama/ihbar sistemleri ve sabit-söndürme ekipmanları.",
    checkpoints: [
      "The fire zone plan and equipment locations on the bridge are up to date",
      "The latest test dates of the sprinkler, drencher and fixed CO₂ systems are recorded",
      "Fire doors close automatically and the hold-back devices are approved"
    ],
  },
  {
    id: "III",
    title: "Lifesaving Vehicles",
    summary: "Can salı, filika, davit ve mustering düzenlemeleri.",
    checkpoints: [
      "Minimum lifeboat capacity = ship's complement × 1.25",
      "The latest load test and certificate is available for each lifeboat",
      "Muster lists, duty allocations and the public address system are up to date"
    ],
  },
  {
    id: "V",
    title: "Seyir Güvenliği",
    summary: "Seyir almaçları, elektronik sistemler, kayıt cihazları ve operasyon prosedürleri.",
    checkpoints: [
      "The Voyage Data Recorder (VDR) function test has been carried out",
      "E-NP, digital nautical publications and paper charts are up to date",
      "The Bridge Navigational Watch Alarm System (BNWAS) is active and recording"
    ],
  },
];

const SOLASRegulationsPage = () => {
  return (
          <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-300">SOLAS</p>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Bölüm Özeti ve Denetim Kontrol Listesi
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="border border-blue-100/60 shadow-lg shadow-blue-500/10">
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl">{chapter.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-sm tracking-wide">
                    Bölüm {chapter.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-40 pr-2">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {chapter.checkpoints.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <Separator />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Denetim Notu:</strong> Kayıtlar, test raporları ve ekipman durumunu gösteren fotoğraflar hazırlanınca denetim süresi %30 kısalır.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="border-blue-200/70 shadow-xl shadow-blue-500/10">
          <CardHeader>
            <CardTitle>Uyum İpuçları</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="bg-white/70 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-50">
              <p className="font-semibold text-blue-700 mb-2">Dokümantasyon</p>
              <p className="text-muted-foreground">
                Plan, çizim ve sertifika revizyon numaraları dijital arşivde tutulmalı; köprüüstünde basılı acil durum versiyonları bulunmalı.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-50">
              <p className="font-semibold text-blue-700 mb-2">Periyodik Testler</p>
              <p className="text-muted-foreground">
                Fire drill, abandon ship drill ve GMDSS testleri için aylık takvim oluşturun, fotoğraf/ video kayıtlarını saklayın.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-50">
              <p className="font-semibold text-blue-700 mb-2">Kurum İletişimi</p>
              <p className="text-muted-foreground">
                Sınıf, bayrak ve PSC taleplerini tek ekranda izlemek için görev listesi hazırlayın, kritik maddeler için sorumlular atayın.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SOLASRegulationsPage;
