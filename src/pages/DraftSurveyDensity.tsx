import { ArrowDownUp, Droplets } from "lucide-react";
import { densitySinkageCm, displacementInDensity } from "@/lib/calc/draftSurvey";
import {
  FieldGrid,
  FormulaLine,
  NumberField,
  ResultTable,
  ToolNotice,
  ToolPage,
  ToolSection,
} from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

const inDensityRange = (value: number) => Number.isFinite(value) && value >= 0.99 && value <= 1.04;
const RANGE_ERROR = "Expected 0.990 – 1.040 t/m³";

export default function DraftSurveyDensity() {
  const [corr, setCorr] = useStoredForm("density-correction", { displacement: "", tableDensity: "1.025", dockDensity: "" });
  const [sink, setSink] = useStoredForm("density-sinkage", { displacement: "", tpc: "", fromDensity: "1.025", toDensity: "1.000" });

  const disp = parseNumber(corr.displacement);
  const rhoTable = parseNumber(corr.tableDensity);
  const rhoDock = parseNumber(corr.dockDensity);
  const corrReady = Number.isFinite(disp) && disp > 0 && inDensityRange(rhoTable) && inDensityRange(rhoDock);
  const corrected = corrReady ? displacementInDensity(disp, rhoTable, rhoDock) : Number.NaN;

  const sDisp = parseNumber(sink.displacement);
  const tpc = parseNumber(sink.tpc);
  const rho1 = parseNumber(sink.fromDensity);
  const rho2 = parseNumber(sink.toDensity);
  const sinkReady = Number.isFinite(sDisp) && sDisp > 0 && Number.isFinite(tpc) && tpc > 0 && inDensityRange(rho1) && inDensityRange(rho2);
  const sinkage = sinkReady ? densitySinkageCm(sDisp, tpc, rho1, rho2) : Number.NaN;

  return (
    <ToolPage title="Density Correction" icon={Droplets}>
      <ToolSection
        title="Displacement in dock water"
        icon={Droplets}
        description="Hydrostatic tables give displacement for one density (usually 1.025 t/m³). Convert it to the density measured at the marks."
      >
        <FormulaLine>Δ dock = Δ table × ρ dock / ρ table</FormulaLine>
        <FieldGrid columns={3}>
          <NumberField id="dc-disp" label="Δ from table (trim corrected)" unit="t" value={corr.displacement} onChange={(v) => setCorr((p) => ({ ...p, displacement: v }))} placeholder="30058" />
          <NumberField id="dc-table" label="Table density" unit="t/m³" value={corr.tableDensity} onChange={(v) => setCorr((p) => ({ ...p, tableDensity: v }))} placeholder="1.025" error={corr.tableDensity && !inDensityRange(rhoTable) ? RANGE_ERROR : undefined} />
          <NumberField id="dc-dock" label="Dock water density" unit="t/m³" value={corr.dockDensity} onChange={(v) => setCorr((p) => ({ ...p, dockDensity: v }))} placeholder="1.018" error={corr.dockDensity && !inDensityRange(rhoDock) ? RANGE_ERROR : undefined} />
        </FieldGrid>
        {corrReady && (
          <ResultTable
            title="Density correction"
            rows={[
              { label: "Correction", value: `${signed(corrected - disp, 1)} t` },
              { label: "Δ in dock water", value: `${fmt(corrected, 1)} t`, emphasis: true },
            ]}
          />
        )}
        <ToolNotice>Take samples at several depths near the forward, midship and aft marks and use the average.</ToolNotice>
      </ToolSection>

      <ToolSection
        title="Draft change between densities"
        icon={ArrowDownUp}
        description="Mean sinkage (+) or rise (−) when the ship passes from one water density into another, displacement unchanged."
      >
        <FormulaLine>δT = Δ (ρ₁ − ρ₂) / (ρ₂ × TPC₁)</FormulaLine>
        <FieldGrid>
          <NumberField id="ds-disp" label="Displacement" unit="t" value={sink.displacement} onChange={(v) => setSink((p) => ({ ...p, displacement: v }))} placeholder="20000" />
          <NumberField id="ds-tpc" label="TPC in the first water" unit="t/cm" value={sink.tpc} onChange={(v) => setSink((p) => ({ ...p, tpc: v }))} placeholder="25.0" />
          <NumberField id="ds-from" label="From density ρ₁" unit="t/m³" value={sink.fromDensity} onChange={(v) => setSink((p) => ({ ...p, fromDensity: v }))} placeholder="1.025" error={sink.fromDensity && !inDensityRange(rho1) ? RANGE_ERROR : undefined} />
          <NumberField id="ds-to" label="To density ρ₂" unit="t/m³" value={sink.toDensity} onChange={(v) => setSink((p) => ({ ...p, toDensity: v }))} placeholder="1.000" error={sink.toDensity && !inDensityRange(rho2) ? RANGE_ERROR : undefined} />
        </FieldGrid>
        {sinkReady && (
          <ResultTable
            title="Draft change"
            rows={[{ label: sinkage >= 0 ? "Mean sinkage" : "Mean rise", value: `${fmt(Math.abs(sinkage), 1)} cm`, emphasis: true }]}
          />
        )}
        <ToolNotice>From sea water (1.025) into fresh water (1.000) this equals the Fresh Water Allowance, FWA = Δ / (40 × TPC).</ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
