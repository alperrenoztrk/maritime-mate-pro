import { Link } from "react-router-dom";
import { Clock3, Gauge } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cargoBetweenSurveys } from "@/lib/calc/draftSurvey";
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
import { fmt, parseNumber } from "@/components/tools/format";
import { DraftSurveyDisclaimer, ShipParticularsSection, SurveyStageSection } from "@/components/draftSurvey/DraftSurveySections";
import { computeStage, emptyShip, emptyStage, rowsToText, useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

const formatDateTime = (date: Date) =>
  date.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });

export default function DraftSurveyIntermediate() {
  const [ship, setShip] = useStoredForm("ship", emptyShip);
  const [initial] = useStoredForm("initial", emptyStage());
  const [current, setCurrent] = useStoredForm("intermediate", emptyStage());
  const [progress, setProgress] = useStoredForm("intermediate-progress", { plannedCargo: "", initialTime: "", currentTime: "" });

  const initialResult = computeStage(ship, initial).result;
  const currentResult = computeStage(ship, current).result;
  const planned = parseNumber(progress.plannedCargo);
  const start = progress.initialTime ? new Date(progress.initialTime) : null;
  const now = progress.currentTime ? new Date(progress.currentTime) : null;

  let rows: ResultRow[] | null = null;
  let timeWarning = "";
  if (initialResult && currentResult) {
    const handled = cargoBetweenSurveys(initialResult.netDisplacement, currentResult.netDisplacement);
    rows = [
      { label: "Initial net displacement", value: `${fmt(initialResult.netDisplacement, 1)} t` },
      { label: "Current net displacement", value: `${fmt(currentResult.netDisplacement, 1)} t` },
      { label: "Cargo handled so far", value: `${fmt(handled, 1)} t`, emphasis: true },
    ];
    if (Number.isFinite(planned) && planned > 0) {
      const remaining = planned - handled;
      rows.push({ label: "Remaining to planned quantity", value: `${fmt(remaining, 1)} t` });
      if (start && now && Number.isFinite(start.getTime()) && Number.isFinite(now.getTime())) {
        const hours = (now.getTime() - start.getTime()) / 3_600_000;
        if (hours <= 0) {
          timeWarning = "The current survey time must be after the initial survey time.";
        } else {
          const rate = handled / hours;
          rows.push({ label: "Average handling rate", value: `${fmt(rate, 0)} t/h` });
          if (rate > 0 && remaining > 0) {
            const finish = new Date(now.getTime() + (remaining / rate) * 3_600_000);
            rows.push({ label: "Estimated completion at this rate", value: formatDateTime(finish), emphasis: true });
          }
        }
      }
    }
  }

  return (
    <ToolPage title="Intermediate Survey" icon={Gauge}>
      <DraftSurveyDisclaimer />
      <ShipParticularsSection form={ship} setForm={setShip} />
      {!initialResult && (
        <ToolNotice tone="warning">
          No completed initial survey on this device. Complete it on the{" "}
          <Link to="/cargo/calculations/draft-survey" className="font-semibold text-primary underline">Draft Survey</Link> page first.
        </ToolNotice>
      )}
      <SurveyStageSection title="Intermediate survey" idPrefix="intermediate" shipForm={ship} form={current} setForm={setCurrent} />

      <ToolSection title="Progress" icon={Clock3} description="Provisional figures to monitor the loading or discharging rate and to plan trimming.">
        <FormulaLine>Rate = Cargo handled / Elapsed time</FormulaLine>
        <NumberField
          id="planned-cargo"
          label="Planned cargo quantity"
          unit="t"
          value={progress.plannedCargo}
          onChange={(value) => setProgress((prev) => ({ ...prev, plannedCargo: value }))}
          placeholder="35000"
        />
        <FieldGrid>
          <div className="space-y-1">
            <Label htmlFor="initial-time" className="text-xs">Initial survey completed</Label>
            <Input id="initial-time" type="datetime-local" className="h-9" value={progress.initialTime} onChange={(e) => setProgress((prev) => ({ ...prev, initialTime: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current-time" className="text-xs">Intermediate survey completed</Label>
            <Input id="current-time" type="datetime-local" className="h-9" value={progress.currentTime} onChange={(e) => setProgress((prev) => ({ ...prev, currentTime: e.target.value }))} />
          </div>
        </FieldGrid>
        {timeWarning && <ToolNotice tone="warning">{timeWarning}</ToolNotice>}
        {rows ? (
          <ResultTable title="Intermediate result" rows={rows} copyText={rowsToText("Intermediate survey", rows)} />
        ) : (
          <ToolNotice>Complete the initial and the intermediate survey to see the progress.</ToolNotice>
        )}
        <ToolNotice>
          The rate includes stoppages between the two surveys. Final trimming quantities should be planned on the
          last intermediate survey with the actual drafts.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
