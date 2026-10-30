import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const chapters = [
  {
    id: "I",
    title: "General Provisions",
    summary: "Scope of application, flag state responsibilities and certification requirements.",
    checkpoints: [
      "Confirm that the ship falls within the scope of SOLAS",
      "Check the surveyor reports and the validity dates of the certificates",
      "Make sure any alterations carried out have been reported to the administration"
    ],
  },
  {
    id: "II-1",
    title: "Structure, Compartmentation and Stability",
    summary: "Ship strength, watertight compartments, engine room safety and electrical installations.",
    checkpoints: [
      "Damage stability calculations are up to date and class-approved",
      "Remote and local controls of the watertight doors have been tested",
      "Machinery safety systems (LOP, high-temperature alarms) have been recorded"
    ],
  },
  {
    id: "II-2",
    title: "Fire Safety",
    summary: "Fire compartmentation, detection/notification systems and fixed-extinguishing equipment.",
    checkpoints: [
      "The fire zone plan and equipment locations on the bridge are up to date",
      "The latest test dates of the sprinkler, drencher and fixed CO₂ systems are recorded",
      "Fire doors close automatically and the hold-back devices are approved"
    ],
  },
  {
    id: "III",
    title: "Lifesaving Vehicles",
    summary: "Liferaft, lifeboat, davit and mustering arrangements.",
    checkpoints: [
      "Minimum lifeboat capacity = ship's complement × 1.25",
      "The latest load test and certificate is available for each lifeboat",
      "Muster lists, duty allocations and the public address system are up to date"
    ],
  },
  {
    id: "V",
    title: "Navigational Safety",
    summary: "Navigation receivers, electronic systems, recording devices and operating procedures.",
    checkpoints: [
      "The Voyage Data Recorder (VDR) function test has been carried out",
      "E-NP, digital nautical publications and paper charts are up to date",
      "The Bridge Navigational Watch Alarm System (BNWAS) is active and recording"
    ],
  },
];

const SOLASRegulationsPage = () => {
  const pages: ReadingPage[] = chapters.map((chapter,index)=>({
    id: String(chapter.id), title: chapter.title,
    section: `Reference ${index+1} / ${chapters.length}`,
    content: (<Card key={chapter.id} className="border border-blue-100/60 shadow-lg shadow-blue-500/10">
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl">{chapter.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-sm tracking-wide">
                    Section {chapter.id}
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
                  <strong>Audit Note:</strong> When records, test reports and photos showing equipment condition are prepared, inspection time is shortened by 30%.
                </p>
              </CardContent>
            </Card>),
  }));
  return <PagedReadingSurface title="SOLAS Chapters" subtitle="SOLAS reference library"
    pages={pages} storageKey="mariners-book:solas-book:SOLASRegulations" />;
};

export default SOLASRegulationsPage;
