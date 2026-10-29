import { Wind } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { smoothCurve, weatherCriterion, type BilgeType, type WeatherResult } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { GzChart } from "@/components/tools/GzChart";
import { fmt, parseNumber } from "@/components/tools/format";
import { GzInputsSection } from "@/components/stability/GzInputs";
import { useGzInputs } from "@/components/stability/useGzInputs";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { useStabilityForm } from "@/components/stability/stabilityForms";

const initial = {
  windArea: "",
  windLever: "",
  breadth: "",
  meanDraft: "",
  lwl: "",
  cb: "",
  bilge: "bilge-keels" as BilgeType,
  bilgeKeelArea: "",
  downflooding: "",
  deckEdge: "",
  rollingPeriod: "",
};

const BILGES: Array<{ value: BilgeType; label: string }> = [
  { value: "bilge-keels", label: "Bilge keels and/or bar keel" },
  { value: "round-no-keels", label: "Round bilge, no bilge or bar keels (k = 1.0)" },
  { value: "sharp", label: "Sharp bilges (k = 0.7)" },
];

export default function StabilityWindWeatherPage() {
  const inputs = useGzInputs();
  const [form, setForm] = useStabilityForm("weather", initial);
  const set = (key: keyof typeof initial) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const n = (key: keyof typeof initial) => parseNumber(form[key] as string);

  const required: Array<keyof typeof initial> = ["windArea", "windLever", "breadth", "meanDraft", "lwl", "cb"];
  if (form.bilge === "bilge-keels") required.push("bilgeKeelArea");
  const missing = required.filter((k) => !(n(k) > 0));
  const top = inputs.gz.length ? Math.max(...inputs.gz.map((p) => p.angle)) : 0;

  let result: WeatherResult | null = null;
  let error = "";
  if (inputs.gz.length > 0 && missing.length === 0) {
    if (top < 50) error = "The KN table must extend to at least 50° for the weather criterion.";
    else {
      try {
        result = weatherCriterion({
          gz: inputs.gz,
          displacement: inputs.displacement,
          windArea: n("windArea"),
          windLever: n("windLever"),
          breadth: n("breadth"),
          meanDraft: n("meanDraft"),
          lwl: n("lwl"),
          blockCoefficient: n("cb"),
          kg: inputs.kgFluid,
          gmFluid: inputs.gmFluid,
          bilge: form.bilge,
          bilgeKeelArea: n("bilgeKeelArea"),
          downfloodingAngle: n("downflooding") > 0 ? n("downflooding") : undefined,
          deckEdgeAngle: n("deckEdge") > 0 ? n("deckEdge") : undefined,
          rollingPeriod: n("rollingPeriod") > 0 ? n("rollingPeriod") : undefined,
        });
      } catch (e) {
        error = e instanceof Error ? e.message : "The criterion could not be evaluated.";
      }
    }
  }

  const curve = inputs.gz.length ? smoothCurve(inputs.gz) : null;

  return (
    <ToolPage title="Weather Criterion" icon={Wind}>
      <StabilityDisclaimer />
      <GzInputsSection inputs={inputs} />

      <ToolSection title="Wind and roll data" icon={Wind} description="IMO 2008 IS Code Part A 2.3, severe wind and rolling criterion.">
        <FormulaLine>lw1 = P·A·Z / (1000·g·Δ), P = 504 Pa · lw2 = 1.5 lw1 · θ1 = 109·k·X1·X2·√(r·s)</FormulaLine>
        <FieldGrid>
          <NumberField id="w-area" label="Windage area A" unit="m²" value={form.windArea} onChange={set("windArea")} placeholder="3200" help="Projected lateral area above the waterline, deck cargo included." />
          <NumberField id="w-lever" label="Wind lever Z" unit="m" value={form.windLever} onChange={set("windLever")} placeholder="16.5" help="Centre of A to centre of underwater lateral area (≈ half draft)." />
          <NumberField id="w-b" label="Moulded breadth B" unit="m" value={form.breadth} onChange={set("breadth")} placeholder="32.26" />
          <NumberField id="w-d" label="Mean moulded draft d" unit="m" value={form.meanDraft} onChange={set("meanDraft")} placeholder="12.0" />
          <NumberField id="w-lwl" label="Waterline length Lwl" unit="m" value={form.lwl} onChange={set("lwl")} placeholder="222" />
          <NumberField id="w-cb" label="Block coefficient CB" value={form.cb} onChange={set("cb")} placeholder="0.84" />
          <div className="space-y-1">
            <Label className="text-xs">Bilge</Label>
            <Select value={form.bilge} onValueChange={(value) => setForm((prev) => ({ ...prev, bilge: value as BilgeType }))}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{BILGES.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {form.bilge === "bilge-keels" && (
            <NumberField id="w-ak" label="Bilge keel / bar keel area Ak" unit="m²" value={form.bilgeKeelArea} onChange={set("bilgeKeelArea")} placeholder="60" help="Total area, both sides." />
          )}
          <NumberField id="w-thetaf" label="Downflooding angle θf" unit="°" value={form.downflooding} onChange={set("downflooding")} placeholder="45" help="θ2 is the least of θf, 50° and the second lw2 intercept." />
          <NumberField id="w-deck" label="Deck edge immersion angle" unit="°" value={form.deckEdge} onChange={set("deckEdge")} placeholder="18" help="θ0 must not exceed 16° or 80 % of this angle." />
          <NumberField id="w-period" label="Rolling period T (optional)" unit="s" value={form.rollingPeriod} onChange={set("rollingPeriod")} placeholder="" help="Empty: T = 2·C·B / √GM is used." />
        </FieldGrid>
        {missing.length > 0 && inputs.gz.length > 0 && <ToolNotice>Complete the wind and roll data.</ToolNotice>}
        {error && <ToolNotice tone="warning">{error}</ToolNotice>}
        {result && curve && (
          <>
            <GzChart
              title="Weather criterion"
              from={Math.floor(Math.max(-40, result.theta0 - result.theta1))}
              to={Math.min(top, Math.ceil(result.theta2 + 5))}
              lines={[
                { key: "gz", label: "GZ", value: (a) => (a >= 0 ? curve(a) : -curve(-a)), kind: "righting" },
                { key: "lw1", label: "lw1 steady wind", value: () => result!.lw1, kind: "heeling" },
                { key: "lw2", label: "lw2 gust", value: () => result!.lw2, kind: "heeling" },
              ]}
              markers={[
                { angle: Math.round((result.theta0 - result.theta1) * 10) / 10, label: "θ0−θ1" },
                { angle: Math.round(result.theta2 * 10) / 10, label: "θ2" },
              ]}
            />
            <CriteriaTable title="IS Code 2008 Part A 2.3" criteria={result.criteria} />
            {result.rangeWarnings.map((w) => <ToolNotice key={w} tone="warning">{w}</ToolNotice>)}
            <ResultTable
              title="Working"
              rows={[
                { label: "lw1 / lw2", value: `${fmt(result.lw1, 4)} / ${fmt(result.lw2, 4)} m` },
                { label: "θ0 (steady wind heel)", value: `${fmt(result.theta0, 2)}°` },
                { label: "X1 · X2 · k", value: `${fmt(result.factors.x1, 3)} · ${fmt(result.factors.x2, 3)} · ${fmt(result.factors.k, 3)}` },
                { label: "r · s · T", value: `${fmt(result.factors.r, 3)} · ${fmt(result.factors.s, 4)} · ${fmt(result.factors.period, 1)} s` },
                { label: "θ1 (roll to windward)", value: `${fmt(result.theta1, 2)}°` },
                { label: "θ2", value: `${fmt(result.theta2, 1)}°` },
                { label: "Area a / area b", value: `${fmt(result.areaA, 4)} / ${fmt(result.areaB, 4)} m·rad`, emphasis: true },
              ]}
            />
            <ToolNotice>r = 0.73 + 0.6·OG/d is evaluated with KG fluid. Tables 2.3.4-1…4 are interpolated linearly and held at their end rows.</ToolNotice>
          </>
        )}
      </ToolSection>
    </ToolPage>
  );
}
