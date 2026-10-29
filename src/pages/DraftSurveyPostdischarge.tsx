import { useState } from "react";
import { PackageCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { differenceAgainst } from "@/lib/calc/draftSurvey";
import {
  FieldGrid,
  FormulaLine,
  NumberField,
  ResultTable,
  ToolNotice,
  ToolPage,
  ToolSection,
  type ResultRow,
} from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { DraftSurveyDisclaimer, ShipParticularsSection, SurveyStageSection } from "@/components/draftSurvey/DraftSurveySections";
import { computeStage, emptyShip, emptyStage, rowsToText, useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

export default function DraftSurveyPostdischarge() {
  const [ship, setShip] = useStoredForm("ship", emptyShip);
  const [arrival, setArrival] = useStoredForm("discharge-arrival", emptyStage());
  const [final, setFinal] = useStoredForm("discharge-final", emptyStage());
  const [figures, setFigures] = useStoredForm("discharge-figures", { billOfLading: "", rob: "" });
  const [tab, setTab] = useState("arrival");

  const arrivalResult = computeStage(ship, arrival).result;
  const finalResult = computeStage(ship, final).result;
  const bl = parseNumber(figures.billOfLading);
  const rob = parseNumber(figures.rob);

  let rows: ResultRow[] | null = null;
  if (arrivalResult && finalResult) {
    const discharged = arrivalResult.netDisplacement - finalResult.netDisplacement;
    rows = [
      { label: "Arrival net displacement", value: `${fmt(arrivalResult.netDisplacement, 1)} t` },
      { label: "Final net displacement", value: `${fmt(finalResult.netDisplacement, 1)} t` },
      { label: "Cargo discharged (outturn)", value: `${fmt(discharged, 1)} t`, emphasis: true },
    ];
    if (Number.isFinite(bl) && bl > 0) {
      const diff = differenceAgainst(bl, discharged);
      rows.push({ label: "Outturn against bill of lading", value: `${signed(diff.tonnes, 1)} t (${signed(diff.percent, 2)} %)` });
      if (Number.isFinite(rob) && rob >= 0) {
        rows.push({ label: "Unaccounted (B/L − outturn − ROB)", value: `${signed(bl - discharged - rob, 1)} t` });
      }
    }
    if (discharged < 0) rows.push({ label: "Check", value: "Final Δ above arrival Δ" });
  }

  return (
    <ToolPage title="Post-Discharge Survey" icon={PackageCheck}>
      <DraftSurveyDisclaimer />
      <ShipParticularsSection form={ship} setForm={setShip} />

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-2">
          <TabsTrigger value="arrival" className="py-2">Arrival survey (loaded)</TabsTrigger>
          <TabsTrigger value="final" className="py-2">Final survey (light)</TabsTrigger>
        </TabsList>
        <TabsContent value="arrival" className="mt-0">
          <SurveyStageSection title="Arrival survey" idPrefix="discharge-arrival" shipForm={ship} form={arrival} setForm={setArrival} />
        </TabsContent>
        <TabsContent value="final" className="mt-0">
          <SurveyStageSection title="Final survey" idPrefix="discharge-final" shipForm={ship} form={final} setForm={setFinal} />
        </TabsContent>
      </Tabs>

      <ToolSection title="Outturn" icon={PackageCheck} description="Compare the draft survey outturn with the bill of lading and the cargo remaining on board.">
        <FormulaLine>Outturn = Net Δ arrival − Net Δ final</FormulaLine>
        <FieldGrid>
          <NumberField id="pd-bl" label="Bill of lading quantity" unit="t" value={figures.billOfLading} onChange={(value) => setFigures((prev) => ({ ...prev, billOfLading: value }))} placeholder="35000" />
          <NumberField id="pd-rob" label="Cargo remaining on board (ROB)" unit="t" value={figures.rob} onChange={(value) => setFigures((prev) => ({ ...prev, rob: value }))} placeholder="0" help="From hold inspection; 0 if the holds are clean." />
        </FieldGrid>
        {rows ? (
          <ResultTable title="Discharge result" rows={rows} copyText={rowsToText("Post-discharge survey", rows)} />
        ) : (
          <ToolNotice>Complete the arrival and the final survey to see the outturn.</ToolNotice>
        )}
      </ToolSection>
    </ToolPage>
  );
}
