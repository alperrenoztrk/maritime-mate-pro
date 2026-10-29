import { Waves } from "lucide-react";
import { fsmRectangular } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { fmt, parseNumber } from "@/components/tools/format";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { savedLoadingResult, useStabilityForm } from "@/components/stability/stabilityForms";

const tank = (name: string): TableRow => ({ name, length: "", breadth: "", density: "1.025", fsm: "" });

export default function StabilityFreeSurface() {
  const loading = savedLoadingResult();
  const [form, setForm] = useStabilityForm("free-surface", {
    displacement: loading ? loading.displacement.toFixed(1) : "",
    gmSolid: loading ? loading.gmSolid.toFixed(3) : "",
    tanks: [tank("No.2 DB P"), tank("No.2 DB S")],
  });

  const tankRows: ResultRow[] = [];
  let total = 0;
  form.tanks.forEach((t) => {
    const table = parseNumber(t.fsm);
    const l = parseNumber(t.length);
    const b = parseNumber(t.breadth);
    const rho = parseNumber(t.density);
    const fsm = Number.isFinite(table) ? table : l > 0 && b > 0 && rho > 0 ? fsmRectangular(l, b, rho) : Number.NaN;
    if (!Number.isFinite(fsm)) return;
    total += fsm;
    tankRows.push({ label: t.name || "Tank", value: `${fmt(fsm, 1)} t·m`, hint: Number.isFinite(table) ? "From the tank table" : "Rectangular tank" });
  });

  const disp = parseNumber(form.displacement);
  const gmSolid = parseNumber(form.gmSolid);
  const rows: ResultRow[] = [...tankRows, { label: "Total free surface moment ΣFSM", value: `${fmt(total, 1)} t·m`, emphasis: true }];
  if (disp > 0) {
    rows.push({ label: "Free surface correction ΣFSM / Δ", value: `${fmt(total / disp, 3)} m` });
    if (Number.isFinite(gmSolid)) rows.push({ label: "GM fluid", value: `${fmt(gmSolid - total / disp, 3)} m`, emphasis: true });
  }

  return (
    <ToolPage title="Free Surface Effect" icon={Waves}>
      <StabilityDisclaimer />
      <ToolSection
        title="Slack tanks"
        icon={Waves}
        description="Enter the FSM from the ship's tank tables where available; otherwise the rectangular-tank formula is used with the tank's length and breadth."
      >
        <FormulaLine>FSM = ρ · l · b³ / 12 · FSC = ΣFSM / Δ</FormulaLine>
        <EditableTable
          caption="Slack tanks"
          columns={[
            { key: "name", label: "Tank", text: true },
            { key: "length", label: "Length l", unit: "m" },
            { key: "breadth", label: "Breadth b", unit: "m" },
            { key: "density", label: "ρ", unit: "t/m³" },
            { key: "fsm", label: "FSM (table)", unit: "t·m" },
          ]}
          rows={form.tanks}
          onChange={(tanks) => setForm((prev) => ({ ...prev, tanks }))}
          newRow={() => tank("")}
          addLabel="Add tank"
        />
        <FieldGrid>
          <NumberField id="fs-disp" label="Displacement (Δ)" unit="t" value={form.displacement} onChange={(v) => setForm((p) => ({ ...p, displacement: v }))} placeholder="28350" />
          <NumberField id="fs-gm" label="GM solid (optional)" unit="m" value={form.gmSolid} onChange={(v) => setForm((p) => ({ ...p, gmSolid: v }))} placeholder="2.70" />
        </FieldGrid>
        {tankRows.length > 0 ? (
          <ResultTable title="Free surface" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />
        ) : (
          <ToolNotice>Enter at least one slack tank.</ToolNotice>
        )}
        <ToolNotice>
          Only slack tanks count; full and empty tanks have no free surface. A longitudinal division halves b and so
          reduces the FSM of a rectangular tank to one quarter.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
