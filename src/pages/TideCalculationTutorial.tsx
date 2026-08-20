import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Waves } from "lucide-react";

const TideCalculationTutorial = () => {
  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Waves className="h-4 w-4" /> Tide Calculation — Making the Calculation
        </div>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Step-by-step guide to calculating tides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-6">
            <div className="space-y-2">
              <p>
                This page explains the tide calculation step by step, using the methods applied in the field and in training scenarios. The aim is to find the tidal height at the required time from the HW/LW time-height data, then add it to the charted depth to assess the safe depth.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-base font-semibold">1) Collect necessary data</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>HW (High Water) and LW (Low Water) times and altitudes for the selected port.</li>
                <li>Reference date and time zone (UTC/GMT or local) in the tide table.</li>
                <li>Chart depth (Charted Depth) and reference datum (CD) information.</li>
                <li>Secondary port corrections (time/height corrections), if necessary.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">2) Determine port type and apply corrections</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Standard port:</strong> HW/LW values are used directly.</li>
                <li><strong>Secondary port:</strong> time/altitude corrections given in tables or notes are added.</li>
                <li>After the correction, rewrite the HW/LW values and calculate the range.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">3) Tide height for the desired time in the standard port</h3>
              <p>
                The standard approach is to divide the HW-LW interval into 6 equal hours and use the hourly rise/fall percentage from the “Rule of Twelfths”. Alternatively, on a tidal curve you can join the LW and HW points, draw the tidal height line and read the height at the required time off the graph.
              </p>
              <div className="rounded border bg-muted/30 p-3">
                <div className="font-semibold">Rule of Twelfths — hourly contributions</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2">
                  <div>1st hour: 1/12</div>
                  <div>2nd hour: 2/12</div>
                  <div>3rd hour: 3/12</div>
                  <div>4th hour: 3/12</div>
                  <div>5th hour: 2/12</div>
                  <div>6th hour: 1/12</div>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Find out what time it is from LW.</li>
                <li>Calculate tide height by Range × (total rate).</li>
                <li>Add to LW height to get desired clock height.</li>
                <li>If the range is close to spring/near values, select the chart curve accordingly.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">4) Time for desired tide height in standard port</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Calculate the difference between the desired height and LW.</li>
                <li>Find the percentage of this difference in Range.</li>
                <li>Determine the approximate time zone according to Rule of Twelfths levels.</li>
                <li>If necessary, take a more precise reading using the graphical method (tide curve).</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">5) Time and altitude correction in secondary port</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>First, extract the HW/LW values of the connected standard port.</li>
                <li>Apply time and elevation corrections to secondary port tables.</li>
                <li>Follow standard port steps exactly with corrected HW/LW.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">6) Transition time and UKC evaluation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Total depth</strong> = Harita derinliği + Gelgit yüksekliği.</li>
                <li><strong>Safe depth</strong> = Toplam derinlik − Draft − Squat − Emniyet payı.</li>
                <li>If there is a negative result, the time or route for the passage/operation is replanned.</li>
              </ul>
              <div className="rounded border bg-muted/30 p-3 text-xs">
                Harita derinliği + Gelgit yüksekliği = Gemi draftı + Omurga altı emniyet payı
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold">7) Tidal current calculation (tidal stream)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Select the closest letter box from the tidal current chart of that area.</li>
                <li>Read the speed and direction value according to the clock offset before/after HW in the table.</li>
                <li>Find the current set and speed using the appropriate table row for the desired time.</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-base font-semibold">Application example — standard port</h3>
              <p>
                Tidal height calculation for desired time with sample data set:
              </p>
              <div className="rounded border bg-muted/30 p-3 space-y-2">
                <div><strong>Date:</strong> 20 April</div>
                <div><strong>HW:</strong> 11:38 — 5.5m</div>
                <div><strong>LW:</strong> 18:25 — 1.0 m</div>
                <div><strong>Requested time:</strong> 15:00</div>
              </div>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Mark points HW and LW on the chart, creating the tidal height line.</li>
                <li>Fill in the hourly intervals on the hour axis, starting from the HW hour.</li>
                <li>15:00’dan dik çık; gelgit eğrisiyle kesişimden gelgit doğrusuna paralel çiz.</li>
                <li>Go up from the intersection and read the height on the “HW Hts m” scale.</li>
                <li>Range, spring değerine yakınsa düz eğri; neap’e yakınsa kesik eğri kullan.</li>
              </ol>
              <p className="text-xs text-muted-foreground">
                With this method, the approximate tide height for 15:00 is found and added to the chart depth.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-base font-semibold">Checklist (quick verification)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Is there time zone confusion? (UTC/GMT etc. local)</li>
                <li>Is it based on LW or HW, correct?</li>
                <li>Secondary port fix forgotten?</li>
                <li>Are range and sign (+/−) consistent?</li>
                <li>Is there a safety margin added for UKC?</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default TideCalculationTutorial;
