import { ArrowLeftRight, Construction, PackagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { heelFromShift, kgAfterWeight, shiftOfG } from "@/lib/calc/stability";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { savedLoadingResult, useStabilityForm } from "@/components/stability/stabilityForms";

const heelText = (deg: number) =>
  Number.isFinite(deg) ? `${fmt(Math.abs(deg), 2)}° ${deg > 0 ? "to starboard" : deg < 0 ? "to port" : ""}` : "— (GM ≤ 0)";

export default function StabilityWeightShiftPage() {
  const loading = savedLoadingResult();
  const prefill = loading
    ? { disp: fmt(loading.displacement, 1).replace(/,/g, ""), kg: loading.kg.toFixed(3), km: loading.km.toFixed(3), fsc: loading.fsc.toFixed(3) }
    : { disp: "", kg: "", km: "", fsc: "0" };
  const [base, setBase] = useStabilityForm("weights-base", prefill);
  const [shift, setShift] = useStabilityForm("weights-shift", { w: "", vertical: "0", transverse: "0", longitudinal: "0", mctc: "" });
  const [load, setLoad] = useStabilityForm("weights-load", { w: "", kg: "", tcg: "0", kmNew: "", tpc: "" });
  const [lift, setLift] = useStabilityForm("weights-lift", { w: "", head: "", outreach: "", kgStowed: "", fromQuay: true });

  const disp = parseNumber(base.disp);
  const kg = parseNumber(base.kg);
  const km = parseNumber(base.km);
  const fsc = parseNumber(base.fsc) || 0;
  const baseReady = disp > 0 && Number.isFinite(kg) && Number.isFinite(km);
  const gm = km - kg - fsc;

  // 1. Shift
  let shiftRows: ResultRow[] | null = null;
  const sw = parseNumber(shift.w);
  if (baseReady && sw > 0) {
    const gv = shiftOfG(sw, parseNumber(shift.vertical) || 0, disp);
    const gmNew = gm - gv;
    shiftRows = [
      { label: "Vertical shift of G (GG₁)", value: `${signed(gv, 3)} m` },
      { label: "GM fluid after the shift", value: `${fmt(gmNew, 3)} m`, emphasis: true },
      { label: "Transverse shift of G", value: `${signed(shiftOfG(sw, parseNumber(shift.transverse) || 0, disp), 3)} m` },
      { label: "Heel", value: heelText(heelFromShift(sw, parseNumber(shift.transverse) || 0, disp, gmNew)) },
    ];
    const mctc = parseNumber(shift.mctc);
    if (mctc > 0) shiftRows.push({ label: "Change of trim (+ by the stern)", value: `${signed(-(sw * (parseNumber(shift.longitudinal) || 0)) / mctc, 1)} cm` });
  }

  // 2. Load / discharge
  let loadRows: ResultRow[] | null = null;
  const lw = parseNumber(load.w);
  const lkg = parseNumber(load.kg);
  if (baseReady && Number.isFinite(lw) && lw !== 0 && Number.isFinite(lkg)) {
    try {
      const after = kgAfterWeight(disp, kg, lw, lkg);
      const kmNew = parseNumber(load.kmNew);
      const kmUse = Number.isFinite(kmNew) ? kmNew : km;
      const fscNew = (fsc * disp) / after.displacement;
      const gmNew = kmUse - after.kg - fscNew;
      loadRows = [
        { label: "New displacement", value: `${fmt(after.displacement, 1)} t` },
        { label: "New KG (solid)", value: `${fmt(after.kg, 3)} m` },
        { label: Number.isFinite(kmNew) ? "GM fluid (new KM)" : "GM fluid (KM unchanged — enter the new KM)", value: `${fmt(gmNew, 3)} m`, emphasis: true },
        { label: "Heel from the off-centre weight", value: heelText(heelFromShift(lw, parseNumber(load.tcg) || 0, after.displacement, gmNew)) },
      ];
      const tpc = parseNumber(load.tpc);
      if (tpc > 0) loadRows.push({ label: lw > 0 ? "Parallel sinkage" : "Parallel rise", value: `${fmt(Math.abs(lw) / tpc, 1)} cm` });
    } catch (e) {
      loadRows = [{ label: "Error", value: e instanceof Error ? e.message : "Check the entries" }];
    }
  }

  // 3. Heavy lift with ship's gear
  let liftRows: ResultRow[] | null = null;
  const hw = parseNumber(lift.w);
  const head = parseNumber(lift.head);
  if (baseReady && hw > 0 && Number.isFinite(head)) {
    // From the quay the weight is added at the derrick head; from on board it moves from its stowage KG to the head.
    const dispLift = lift.fromQuay ? disp + hw : disp;
    const kgLift = lift.fromQuay ? kgAfterWeight(disp, kg, hw, head).kg : kg + shiftOfG(hw, head - parseNumber(lift.kgStowed), disp);
    const gmLift = km - kgLift - (fsc * disp) / dispLift;
    const heel = heelFromShift(hw, parseNumber(lift.outreach) || 0, dispLift, gmLift);
    liftRows = Number.isFinite(kgLift)
      ? [
          { label: "KG with the weight on the hook", value: `${fmt(kgLift, 3)} m` },
          { label: "GM fluid during the lift", value: `${fmt(gmLift, 3)} m`, emphasis: true },
          { label: "Heel with the weight at full outreach", value: heelText(heel), emphasis: true },
        ]
      : null;
  }

  const setB = (k: keyof typeof base) => (v: string) => setBase((p) => ({ ...p, [k]: v }));
  const setS = (k: keyof typeof shift) => (v: string) => setShift((p) => ({ ...p, [k]: v }));
  const setL = (k: keyof typeof load) => (v: string) => setLoad((p) => ({ ...p, [k]: v }));
  const setH = (k: "w" | "head" | "outreach" | "kgStowed") => (v: string) => setLift((p) => ({ ...p, [k]: v }));

  return (
    <ToolPage title="Weight Changes" icon={ArrowLeftRight}>
      <StabilityDisclaimer />
      <ToolSection title="Initial condition" icon={ArrowLeftRight} description={loading ? "Prefilled from the saved loading condition; change if needed." : "Displacement, KG and KM before the change."}>
        <FieldGrid>
          <NumberField id="wb-disp" label="Displacement (Δ)" unit="t" value={base.disp} onChange={setB("disp")} placeholder="28350" />
          <NumberField id="wb-kg" label="KG (solid)" unit="m" value={base.kg} onChange={setB("kg")} placeholder="8.30" />
          <NumberField id="wb-km" label="KM" unit="m" value={base.km} onChange={setB("km")} placeholder="11.00" />
          <NumberField id="wb-fsc" label="Free surface correction" unit="m" value={base.fsc} onChange={setB("fsc")} placeholder="0.04" />
        </FieldGrid>
        {baseReady && <p className="text-xs text-muted-foreground">GM fluid = {fmt(gm, 3)} m</p>}
      </ToolSection>

      <ToolSection title="Shift a weight on board" icon={ArrowLeftRight}>
        <FormulaLine>GG₁ = w·d / Δ · tan θ = GG₁ (transverse) / GM · δt = w·l / MCTC (cm)</FormulaLine>
        <FieldGrid>
          <NumberField id="ws-w" label="Weight" unit="t" value={shift.w} onChange={setS("w")} placeholder="150" />
          <NumberField id="ws-v" label="Vertical shift (+ up)" unit="m" value={shift.vertical} onChange={setS("vertical")} placeholder="0" />
          <NumberField id="ws-t" label="Transverse shift (+ to starboard)" unit="m" value={shift.transverse} onChange={setS("transverse")} placeholder="8" />
          <NumberField id="ws-l" label="Longitudinal shift (+ forward)" unit="m" value={shift.longitudinal} onChange={setS("longitudinal")} placeholder="0" />
          <NumberField id="ws-mctc" label="MCTC (optional)" unit="t·m/cm" value={shift.mctc} onChange={setS("mctc")} placeholder="420" />
        </FieldGrid>
        {shiftRows && <ResultTable title="After the shift" rows={shiftRows} />}
      </ToolSection>

      <ToolSection title="Load or discharge a weight" icon={PackagePlus}>
        <FormulaLine>KG₁ = (Δ·KG + w·kg) / (Δ + w) · sinkage = w / TPC</FormulaLine>
        <FieldGrid>
          <NumberField id="wl-w" label="Weight (− to discharge)" unit="t" value={load.w} onChange={setL("w")} placeholder="500" />
          <NumberField id="wl-kg" label="KG of the weight" unit="m" value={load.kg} onChange={setL("kg")} placeholder="12.0" />
          <NumberField id="wl-tcg" label="TCG of the weight (+ stbd)" unit="m" value={load.tcg} onChange={setL("tcg")} placeholder="0" />
          <NumberField id="wl-km" label="KM at the new displacement" unit="m" value={load.kmNew} onChange={setL("kmNew")} placeholder="" />
          <NumberField id="wl-tpc" label="TPC (optional)" unit="t/cm" value={load.tpc} onChange={setL("tpc")} placeholder="40" />
        </FieldGrid>
        {loadRows && <ResultTable title="After loading / discharging" rows={loadRows} />}
      </ToolSection>

      <ToolSection title="Heavy lift with ship's gear" icon={Construction} description="The weight acts at the derrick or crane head as soon as it leaves its support.">
        <FormulaLine>KG rise = w·(h head − kg) / Δ · tan θ = w·outreach / (Δ·GM)</FormulaLine>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background/65 p-3">
          <Label htmlFor="lift-quay" className="text-xs">Lifting from the quay (weight not yet on board)</Label>
          <Switch id="lift-quay" checked={lift.fromQuay} onCheckedChange={(checked) => setLift((p) => ({ ...p, fromQuay: checked }))} />
        </div>
        <FieldGrid>
          <NumberField id="lh-w" label="Weight of the lift" unit="t" value={lift.w} onChange={setH("w")} placeholder="120" />
          <NumberField id="lh-head" label="Head of the derrick above keel" unit="m" value={lift.head} onChange={setH("head")} placeholder="32" />
          <NumberField id="lh-out" label="Outreach from the centreline (+ stbd)" unit="m" value={lift.outreach} onChange={setH("outreach")} placeholder="18" />
          {!lift.fromQuay && <NumberField id="lh-kg" label="KG of the weight in stowage" unit="m" value={lift.kgStowed} onChange={setH("kgStowed")} placeholder="6.0" />}
        </FieldGrid>
        {liftRows && <ResultTable title="During the lift" rows={liftRows} />}
        <ToolNotice>Check the heel against the limit in the gear's manual and the ship's heavy-lift instructions; ballast to counter-heel before the lift if needed.</ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
