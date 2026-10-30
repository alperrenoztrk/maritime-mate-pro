import { ArrowRightLeft, Droplets, FlaskConical, MapPin, RefreshCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ballastTransfer, d2Check, exchangeLocation, exchangePlan, D2_LIMITS, type D2Sample, type ExchangeMethod } from "@/lib/calc/ballast";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { EditableTable, type TableRow } from "@/components/tools/EditableTable";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { useStoredState } from "@/components/tools/useStoredState";
import { savedLoadingResult } from "@/components/stability/stabilityForms";

const KEY = "marine-expert-ballast-ops:";
const tank = (name = ""): TableRow => ({ name, capacity: "", volume: "", lcg: "", tcg: "", vcg: "" });

interface ParsedTank {
  name: string;
  capacity: number;
  volume: number;
  lcg: number;
  tcg: number;
  vcg: number;
}

export default function Ballast() {
  const [tanks, setTanks] = useStoredState(KEY + "tanks", { density: "1.025", rows: [tank(), tank(), tank()] });
  const density = parseNumber(tanks.density);
  const parsed: ParsedTank[] = tanks.rows
    .map((r, i) => ({
      name: r.name || `Tank ${i + 1}`,
      capacity: parseNumber(r.capacity),
      volume: parseNumber(r.volume),
      lcg: parseNumber(r.lcg),
      tcg: parseNumber(r.tcg),
      vcg: parseNumber(r.vcg),
    }))
    .filter((t) => Number.isFinite(t.volume));

  const totalVolume = parsed.reduce((s, t) => s + t.volume, 0);
  const totalWeight = density > 0 ? totalVolume * density : Number.NaN;
  const centre = (pick: (t: ParsedTank) => number) =>
    parsed.every((t) => Number.isFinite(pick(t))) && totalVolume > 0 ? parsed.reduce((s, t) => s + t.volume * pick(t), 0) / totalVolume : Number.NaN;
  const summary: ResultRow[] = [
    ...parsed.map((t) => ({
      label: t.name,
      value: `${fmt(t.volume, 1)} m³${t.capacity > 0 ? ` (${fmt((t.volume / t.capacity) * 100, 0)} %)` : ""} · ${fmt(t.volume * density, 1)} t`,
    })),
    { label: "Total ballast", value: `${fmt(totalVolume, 1)} m³ · ${fmt(totalWeight, 1)} t`, emphasis: true },
    ...(Number.isFinite(centre((t) => t.vcg)) ? [{ label: "Centres VCG / LCG / TCG", value: `${fmt(centre((t) => t.vcg), 2)} / ${fmt(centre((t) => t.lcg), 2)} / ${signed(centre((t) => t.tcg), 2)} m` }] : []),
  ];

  return (
    <ToolPage title="Ballast Operations" icon={Droplets}>
      <ToolNotice>
        Plan ballast operations with the ship's Ballast Water Management Plan and record them in the Ballast Water
        Record Book. Volumes come from the calibration tables (Tank Sounding).
      </ToolNotice>

      <ToolSection title="Ballast tanks" icon={Droplets} description="Positions from the tank capacity plan: LCG forward of the AP, TCG + to starboard.">
        <NumberField id="bo-rho" label="Ballast water density" unit="t/m³" value={tanks.density} onChange={(v) => setTanks((p) => ({ ...p, density: v }))} placeholder="1.025" />
        <EditableTable
          caption="Ballast tanks"
          columns={[
            { key: "name", label: "Tank", text: true },
            { key: "capacity", label: "Capacity", unit: "m³" },
            { key: "volume", label: "Volume", unit: "m³" },
            { key: "lcg", label: "LCG", unit: "m" },
            { key: "tcg", label: "TCG", unit: "m" },
            { key: "vcg", label: "VCG", unit: "m" },
          ]}
          rows={tanks.rows}
          onChange={(rows) => setTanks((p) => ({ ...p, rows }))}
          newRow={() => tank()}
          addLabel="Add tank"
        />
        {parsed.length > 0 && density > 0 && <ResultTable title="Ballast on board" rows={summary} copyText={summary.map((r) => `${r.label}: ${r.value}`).join("\n")} />}
      </ToolSection>

      <TransferSection tanks={parsed} density={density} />
      <ExchangeSection tanks={parsed} />
      <D2Section />
    </ToolPage>
  );
}

function TankSelect({ id, label, value, onChange, tanks }: { id: string; label: string; value: string; onChange: (v: string) => void; tanks: ParsedTank[] }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="h-9"><SelectValue placeholder="Select a tank" /></SelectTrigger>
        <SelectContent>{tanks.map((t) => <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

function TransferSection({ tanks, density }: { tanks: ParsedTank[]; density: number }) {
  const loading = savedLoadingResult();
  const [f, setF] = useStoredState(KEY + "transfer", {
    from: "",
    to: "",
    volume: "",
    pumpRate: "",
    displacement: loading ? loading.displacement.toFixed(0) : "",
    gm: loading ? loading.gmFluid.toFixed(3) : "",
    mctc: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const from = tanks.find((t) => t.name === f.from);
  const to = tanks.find((t) => t.name === f.to);
  const n = (k: keyof typeof f) => parseNumber(f[k]);
  const positions = from && to && [from.lcg, from.tcg, from.vcg, to.lcg, to.tcg, to.vcg].every(Number.isFinite);
  let rows: ResultRow[] | null = null;
  if (from && to && positions && n("volume") > 0 && n("pumpRate") > 0 && n("displacement") > 0 && Number.isFinite(n("gm")) && n("mctc") > 0 && density > 0) {
    const r = ballastTransfer({ volume: n("volume"), density, pumpRate: n("pumpRate"), from, to, displacement: n("displacement"), gmFluid: n("gm"), mctc: n("mctc") });
    rows = [
      { label: "Weight transferred", value: `${fmt(r.weight, 1)} t` },
      { label: "Pumping time", value: `${fmt(r.hours, 2)} h` },
      { label: "Change of trim (+ by the stern)", value: `${signed(r.trimChangeCm, 1)} cm`, emphasis: true },
      { label: "Change of heel (+ to starboard)", value: Number.isFinite(r.heelChange) ? `${signed(r.heelChange, 2)}°` : "— (GM ≤ 0)", emphasis: true },
      { label: "Rise of G (solid)", value: `${signed(r.riseOfG, 3)} m` },
    ];
    if (to.capacity > 0 && to.volume + n("volume") > to.capacity) rows.push({ label: "Check", value: `${to.name} would overflow` });
    if (from.volume < n("volume")) rows.push({ label: "Check", value: `${from.name} holds only ${fmt(from.volume, 1)} m³` });
  }
  return (
    <ToolSection title="Internal transfer" icon={ArrowRightLeft} description="Effect of moving ballast between two tanks. Free surface of the slack tanks is not included.">
      <FormulaLine>δt = −w·(LCG to − LCG from)/MCTC · tan θ = w·(TCG to − TCG from)/(Δ·GM)</FormulaLine>
      <FieldGrid>
        <TankSelect id="bo-from" label="From tank" value={f.from} onChange={set("from")} tanks={tanks} />
        <TankSelect id="bo-to" label="To tank" value={f.to} onChange={set("to")} tanks={tanks} />
        <NumberField id="bo-vol" label="Volume to transfer" unit="m³" value={f.volume} onChange={set("volume")} placeholder="200" />
        <NumberField id="bo-rate" label="Pump rate" unit="m³/h" value={f.pumpRate} onChange={set("pumpRate")} placeholder="250" />
        <NumberField id="bo-disp" label="Displacement" unit="t" value={f.displacement} onChange={set("displacement")} placeholder="30000" />
        <NumberField id="bo-gm" label="GM fluid" unit="m" value={f.gm} onChange={set("gm")} placeholder="2.00" />
        <NumberField id="bo-mctc" label="MCTC" unit="t·m/cm" value={f.mctc} onChange={set("mctc")} placeholder="410" />
      </FieldGrid>
      {tanks.length < 2 ? <ToolNotice>Enter at least two tanks with volumes and positions above.</ToolNotice> : rows ? <ResultTable title="Transfer" rows={rows} /> : <ToolNotice>Select the tanks and complete the data.</ToolNotice>}
    </ToolSection>
  );
}

function ExchangeSection({ tanks }: { tanks: ParsedTank[] }) {
  const [f, setF] = useStoredState(KEY + "exchange", { tank: "", method: "flow-through" as ExchangeMethod, pumpRate: "", pumped: "", distance: "", depth: "" });
  const set = (k: "tank" | "pumpRate" | "pumped" | "distance" | "depth") => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const t = tanks.find((x) => x.name === f.tank);
  const volume = t ? (t.capacity > 0 ? t.capacity : t.volume) : Number.NaN;
  const rate = parseNumber(f.pumpRate);
  const pumped = parseNumber(f.pumped);
  const rows: ResultRow[] = [];
  if (volume > 0 && rate > 0) {
    const p = exchangePlan(f.method, volume, rate, f.method === "flow-through" && pumped > 0 ? pumped : undefined);
    rows.push(
      { label: "Volume to pump", value: `${fmt(p.volumePumped, 0)} m³${p.timesVolume ? ` (${fmt(p.timesVolume, 2)} × tank volume)` : ""}` },
      { label: "Time at this rate", value: `${fmt(p.hours, 1)} h`, emphasis: true },
      { label: "D-1 (95 % volumetric exchange)", value: p.deemedCompliant ? "Deemed met" : "Not deemed met: less than 3 × volume, 95 % exchange must be demonstrated" },
    );
  }
  const distance = parseNumber(f.distance);
  const depth = parseNumber(f.depth);
  const location = Number.isFinite(distance) && Number.isFinite(depth) ? exchangeLocation(distance, depth) : null;
  const locationText = {
    "b4-1-1": "Meets B-4.1.1 (≥ 200 nm from the nearest land, ≥ 200 m depth)",
    "b4-1-2": "Meets B-4.1.2 only when 200 nm is not possible (≥ 50 nm, ≥ 200 m)",
    "not-met": "Does not meet B-4.1 (unless in an area designated by the port State)",
  } as const;
  return (
    <ToolSection title="Ballast water exchange (D-1)" icon={RefreshCcw} description="BWM Convention 2004, regulations B-4 and D-1.">
      <FormulaLine>Sequential: empty and refill · Flow-through: 3 × tank volume deemed to meet 95 %</FormulaLine>
      <FieldGrid>
        <TankSelect id="ex-tank" label="Tank" value={f.tank} onChange={set("tank")} tanks={tanks} />
        <div className="space-y-1">
          <Label htmlFor="ex-method" className="text-xs">Method</Label>
          <Select value={f.method} onValueChange={(v) => setF((p) => ({ ...p, method: v as ExchangeMethod }))}>
            <SelectTrigger id="ex-method" className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="flow-through">Flow-through</SelectItem>
              <SelectItem value="sequential">Sequential (empty and refill)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <NumberField id="ex-rate" label="Pump rate" unit="m³/h" value={f.pumpRate} onChange={set("pumpRate")} placeholder="250" />
        {f.method === "flow-through" && <NumberField id="ex-pumped" label="Volume actually pumped (optional)" unit="m³" value={f.pumped} onChange={set("pumped")} placeholder="" />}
        <NumberField id="ex-dist" label="Distance from nearest land" unit="nm" value={f.distance} onChange={set("distance")} placeholder="210" />
        <NumberField id="ex-depth" label="Water depth" unit="m" value={f.depth} onChange={set("depth")} placeholder="3500" />
      </FieldGrid>
      {rows.length > 0 && <ResultTable title="Exchange plan" rows={rows} />}
      {location && <ToolNotice tone={location === "not-met" ? "warning" : "info"}><MapPin className="inline h-3.5 w-3.5" aria-hidden /> {locationText[location]}</ToolNotice>}
      <ToolNotice>
        Ships that must meet D-2 discharge through an approved ballast water management system; exchange alone is
        accepted only where the Convention's dates and the port State allow it. Check stability, strength and
        sloshing limits in the BWM Plan before an exchange at sea.
      </ToolNotice>
    </ToolSection>
  );
}

function D2Section() {
  const [f, setF] = useStoredState(KEY + "d2", { large: "", small: "", vibrio: "", ecoli: "", enterococci: "" });
  const sample: D2Sample = {};
  for (const l of D2_LIMITS) {
    const v = parseNumber(f[l.key]);
    if (Number.isFinite(v)) sample[l.key] = v;
  }
  const results = d2Check(sample);
  return (
    <ToolSection title="Discharge sample against D-2" icon={FlaskConical} description="BWM Convention regulation D-2 performance standard; every value must be below its limit.">
      <FieldGrid>
        {D2_LIMITS.map((l) => (
          <NumberField key={l.key} id={`d2-${l.key}`} label={`${l.label} (< ${l.limit})`} unit={l.unit} value={f[l.key]} onChange={(v) => setF((p) => ({ ...p, [l.key]: v }))} placeholder="" />
        ))}
      </FieldGrid>
      {results.length > 0 && (
        <CriteriaTable
          title="Regulation D-2"
          criteria={results.map((r) => ({ id: r.key, label: r.label, required: `< ${r.limit} ${r.unit}`, actual: `${r.value} ${r.unit}`, pass: r.pass }))}
        />
      )}
    </ToolSection>
  );
}
