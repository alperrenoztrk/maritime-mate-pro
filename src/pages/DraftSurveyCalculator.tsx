import { useState } from "react";
import { Calculator, FileText, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cargoBetweenSurveys, differenceAgainst } from "@/lib/calc/draftSurvey";
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

export default function DraftSurveyCalculator() {
  const [ship, setShip] = useStoredForm("ship", emptyShip);
  const [initial, setInitial] = useStoredForm("initial", emptyStage());
  const [final, setFinal] = useStoredForm("final", emptyStage());
  const [billOfLading, setBillOfLading] = useStoredForm("bill-of-lading", { value: "" });
  const [tab, setTab] = useState("initial");

  const initialResult = computeStage(ship, initial).result;
  const finalResult = computeStage(ship, final).result;
  const bl = parseNumber(billOfLading.value);

  let summary: ResultRow[] | null = null;
  if (initialResult && finalResult) {
    const cargo = cargoBetweenSurveys(initialResult.netDisplacement, finalResult.netDisplacement);
    summary = [
      { label: "Initial net displacement", value: `${fmt(initialResult.netDisplacement, 1)} t` },
      { label: "Final net displacement", value: `${fmt(finalResult.netDisplacement, 1)} t` },
      {
        label: finalResult.netDisplacement >= initialResult.netDisplacement ? "Cargo loaded" : "Cargo discharged",
        value: `${fmt(cargo, 1)} t`,
        emphasis: true,
      },
    ];
    if (Number.isFinite(bl) && bl > 0) {
      const diff = differenceAgainst(bl, cargo);
      summary.push({ label: "Difference against bill of lading", value: `${signed(diff.tonnes, 1)} t (${signed(diff.percent, 2)} %)` });
    }
  }

  return (
    <ToolPage title="Draft Survey" icon={Scale}>
      <DraftSurveyDisclaimer />
      <ShipParticularsSection form={ship} setForm={setShip} />

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-2">
          <TabsTrigger value="initial" className="py-2">Initial survey</TabsTrigger>
          <TabsTrigger value="final" className="py-2">Final survey</TabsTrigger>
        </TabsList>
        <TabsContent value="initial" className="mt-0">
          <SurveyStageSection title="Initial survey" idPrefix="initial" shipForm={ship} form={initial} setForm={setInitial} />
        </TabsContent>
        <TabsContent value="final" className="mt-0">
          <SurveyStageSection title="Final survey" idPrefix="final" shipForm={ship} form={final} setForm={setFinal} />
        </TabsContent>
      </Tabs>

      <ToolSection title="Cargo quantity" icon={FileText} description="Cargo is the difference between the net displacements of the initial and final surveys.">
        <FormulaLine>Cargo = |Net Δ final − Net Δ initial|</FormulaLine>
        <NumberField
          id="bill-of-lading"
          label="Bill of lading / shore figure (optional)"
          unit="t"
          value={billOfLading.value}
          onChange={(value) => setBillOfLading({ value })}
          placeholder="35000"
        />
        {summary ? (
          <ResultTable title="Draft survey result" rows={summary} copyText={rowsToText("Draft survey result", summary)} />
        ) : (
          <ToolNotice>Complete both the initial and the final survey to obtain the cargo quantity.</ToolNotice>
        )}
      </ToolSection>

      <QuickDraftChangeEstimate />
    </ToolPage>
  );
}

/** Small-change cross-check only: parallel sinkage with a constant TPC. */
function QuickDraftChangeEstimate() {
  const [vals, setVals] = useState({ before: "", after: "", tpc: "" });
  const before = parseNumber(vals.before);
  const after = parseNumber(vals.after);
  const tpc = parseNumber(vals.tpc);
  const ready = [before, after, tpc].every(Number.isFinite) && tpc > 0;
  const change = ready ? (after - before) * 100 * tpc : Number.NaN;
  const set = (key: keyof typeof vals) => (value: string) => setVals((prev) => ({ ...prev, [key]: value }));

  return (
    <ToolSection
      title="Quick estimate: weight from mean draft change"
      icon={Calculator}
      description="Rough cross-check for small changes (parallel sinkage, TPC taken constant). Use the full survey above for cargo figures."
    >
      <FormulaLine>w = (T₂ − T₁) × 100 × TPC</FormulaLine>
      <FieldGrid columns={3}>
        <NumberField id="quick-before" label="Mean draft before" unit="m" value={vals.before} onChange={set("before")} placeholder="8.50" />
        <NumberField id="quick-after" label="Mean draft after" unit="m" value={vals.after} onChange={set("after")} placeholder="8.62" />
        <NumberField id="quick-tpc" label="TPC" unit="t/cm" value={vals.tpc} onChange={set("tpc")} placeholder="25.5" />
      </FieldGrid>
      {ready && (
        <ResultTable
          title="Estimate"
          rows={[{ label: change >= 0 ? "Weight added" : "Weight removed", value: `${fmt(Math.abs(change), 1)} t`, emphasis: true }]}
        />
      )}
    </ToolSection>
  );
}
