import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BarChart3 } from "lucide-react";
import { ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { fmt, parseNumber } from "@/components/tools/format";
import { useStabilityForm } from "@/components/stability/stabilityForms";

const point = (frame: string): TableRow => ({ frame, sf: "", sfLimit: "", bm: "", bmLimit: "" });

/**
 * Longitudinal strength check: shear forces and bending moments from the
 * approved loading instrument or loading manual, compared with the permissible
 * values at each check point.
 */
export default function StabilityShearingBendingPage() {
  const [form, setForm] = useStabilityForm("strength", { seagoing: true, points: ["Fr 40", "Fr 80", "Fr 120", "Fr 160", "Fr 200"].map(point) });

  const rows: ResultRow[] = [];
  let worst = { label: "", pct: 0 };
  form.points.forEach((p) => {
    const parts: string[] = [];
    const pairs: Array<[string, number, number]> = [
      ["SF", parseNumber(p.sf), parseNumber(p.sfLimit)],
      ["BM", parseNumber(p.bm), parseNumber(p.bmLimit)],
    ];
    for (const [name, value, limit] of pairs) {
      if (!Number.isFinite(value) || !(limit > 0)) continue;
      const pct = (Math.abs(value) / limit) * 100;
      parts.push(`${name} ${fmt(pct, 0)} %`);
      if (pct > worst.pct) worst = { label: `${name} at ${p.frame || "point"}`, pct };
    }
    if (parts.length > 0) rows.push({ label: p.frame || "Point", value: parts.join(" · ") });
  });
  if (rows.length > 0) {
    rows.push({ label: "Highest", value: `${worst.label}: ${fmt(worst.pct, 0)} % of permissible`, emphasis: true });
  }

  return (
    <ToolPage title="Shear Force and Bending Moment" icon={BarChart3}>
      <ToolNotice>
        Values come from the ship's approved loading instrument or loading manual for the actual condition, including
        intermediate stages. This page only compares them with the permissible values; it does not compute them.
      </ToolNotice>
      <ToolSection title="Check points" icon={BarChart3} description="Use the same units for the value and its limit (e.g. t or kN; t·m or kN·m).">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background/65 p-3">
          <Label htmlFor="sb-sea" className="text-xs">
            Seagoing limits
            <span className="block text-micro font-normal text-muted-foreground">Off: harbour limits (during loading and discharging).</span>
          </Label>
          <Switch id="sb-sea" checked={form.seagoing} onCheckedChange={(checked) => setForm((p) => ({ ...p, seagoing: checked }))} />
        </div>
        <EditableTable
          caption="Shear force and bending moment"
          columns={[
            { key: "frame", label: "Point", text: true },
            { key: "sf", label: "SF" },
            { key: "sfLimit", label: form.seagoing ? "SF sea limit" : "SF harbour limit" },
            { key: "bm", label: "BM" },
            { key: "bmLimit", label: form.seagoing ? "BM sea limit" : "BM harbour limit" },
          ]}
          rows={form.points}
          onChange={(points) => setForm((p) => ({ ...p, points }))}
          newRow={() => point("")}
          addLabel="Add point"
        />
        {rows.length > 0 ? (
          <>
            <ResultTable title="Percentage of permissible" rows={rows} copyText={rows.map((r) => `${r.label}: ${r.value}`).join("\n")} />
            {worst.pct > 100 && <ToolNotice tone="warning">A value exceeds the permissible limit: change the loading or ballast sequence before continuing.</ToolNotice>}
          </>
        ) : (
          <ToolNotice>Enter at least one value with its limit.</ToolNotice>
        )}
      </ToolSection>
    </ToolPage>
  );
}
