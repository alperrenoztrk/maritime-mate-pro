import { Link } from "react-router-dom";
import { GitCompareArrows } from "lucide-react";
import type { DraftSurveyResult } from "@/lib/calc/draftSurvey";
import {
  ToolNotice,
  ToolPage,
  ToolSection,
} from "@/components/tools/ToolKit";
import { fmt, signed } from "@/components/tools/format";
import { DraftSurveyDisclaimer, ShipParticularsSection } from "@/components/draftSurvey/DraftSurveySections";
import { computeStage, emptyShip, readStoredStage, useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

const STAGES = [
  { key: "initial", label: "Initial", page: "/cargo/calculations/draft-survey" },
  { key: "intermediate", label: "Intermediate", page: "/cargo/calculations/intermediate" },
  { key: "final", label: "Final", page: "/cargo/calculations/draft-survey" },
  { key: "discharge-arrival", label: "Arrival (discharge)", page: "/cargo/calculations/postdischarge" },
  { key: "discharge-final", label: "Final (discharge)", page: "/cargo/calculations/postdischarge" },
] as const;

const METRICS: Array<{ label: string; value: (r: DraftSurveyResult) => string }> = [
  { label: "Mean of means (m)", value: (r) => fmt(r.meanOfMeans, 3) },
  { label: "Trim (m, + stern)", value: (r) => signed(r.trim, 3) },
  { label: "Hog (−) / sag (+) (cm)", value: (r) => signed(r.deflection * 100, 1) },
  { label: "Δ corrected for trim (t)", value: (r) => fmt(r.displacementCorrectedForTrim, 1) },
  { label: "Δ in dock water (t)", value: (r) => fmt(r.displacementInDockWater, 1) },
  { label: "Deductibles (t)", value: (r) => fmt(r.totalDeductibles, 1) },
  { label: "Net displacement (t)", value: (r) => fmt(r.netDisplacement, 1) },
];

export default function DraftSurveyComparative() {
  const [ship, setShip] = useStoredForm("ship", emptyShip);
  const columns = STAGES.map((stage) => {
    const form = readStoredStage(stage.key);
    return { ...stage, result: form ? computeStage(ship, form).result : undefined };
  }).filter((column): column is (typeof column) & { result: DraftSurveyResult } => Boolean(column.result));

  return (
    <ToolPage title="Survey Comparison" icon={GitCompareArrows}>
      <DraftSurveyDisclaimer />
      <ShipParticularsSection form={ship} setForm={setShip} />
      <ToolSection
        title="Saved surveys"
        icon={GitCompareArrows}
        description="Every completed survey saved on this device, side by side. Change between consecutive columns shows cargo or ballast moved."
      >
        {columns.length === 0 ? (
          <ToolNotice>
            No completed survey yet. Start on the{" "}
            <Link to="/cargo/calculations/draft-survey" className="font-semibold text-primary underline">Draft Survey</Link> page.
          </ToolNotice>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border/40 bg-background/65">
            <table className="w-full min-w-[32rem] text-xs">
              <thead>
                <tr className="border-b border-border/40 text-left">
                  <th className="px-3 py-2 font-semibold text-muted-foreground">Figure</th>
                  {columns.map((column) => (
                    <th key={column.key} className="px-3 py-2 text-right font-semibold">
                      <Link to={column.page} className="text-primary">{column.label}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody translate="no" className="notranslate">
                {METRICS.map((metric) => (
                  <tr key={metric.label} className="border-b border-border/30 last:border-0">
                    <td className="px-3 py-2 text-muted-foreground">{metric.label}</td>
                    {columns.map((column) => (
                      <td key={column.key} className="px-3 py-2 text-right font-mono font-semibold">{metric.value(column.result)}</td>
                    ))}
                  </tr>
                ))}
                {columns.length > 1 && (
                  <tr className="bg-primary/[0.06]">
                    <td className="px-3 py-2 font-semibold">Change from previous (t)</td>
                    {columns.map((column, index) => (
                      <td key={column.key} className="px-3 py-2 text-right font-mono font-bold">
                        {index === 0 ? "—" : signed(column.result.netDisplacement - columns[index - 1].result.netDisplacement, 1)}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </ToolSection>
    </ToolPage>
  );
}
