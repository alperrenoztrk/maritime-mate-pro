import { useEffect, useMemo, useState } from "react";
import { CalendarSearch, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultTable, ToolNotice, ToolSection } from "@/components/tools/ToolKit";
import { fmt } from "@/components/tools/format";
import { predictExtremes, predictHeight, searchStations, surroundingEvents, type TidePack, type TideStation } from "@/lib/calc/tidePrediction";
import { fmtLat, fmtLon, fmtUtc, parseUtc } from "./navFormat";
import { useNavForm } from "./useNavForm";

let packPromise: Promise<TidePack> | null = null;
const loadPack = () => {
  packPromise ??= fetch("/data/tides/noaa-stations.json").then((r) => {
    if (!r.ok) throw new Error("The station list could not be loaded.");
    return r.json() as Promise<TidePack>;
  });
  packPromise.catch(() => {
    packPromise = null;
  });
  return packPromise;
};

const toLocalInput = (d: Date) => d.toISOString().slice(0, 16);
const standardTime = (d: Date, tz: number) =>
  `${new Date(d.getTime() + tz * 3600_000).toISOString().slice(11, 16)} (UTC${tz >= 0 ? "+" : "−"}${Math.abs(tz)})`;

/**
 * Offline astronomical tide predictions for NOAA harmonic stations. Filling
 * the height-of-tide fields below happens only when the user asks for it.
 */
export function TidePredictionSection({
  queryUtc,
  onUse,
}: {
  queryUtc: string;
  onUse: (values: { lwTime: string; lwHeight: string; hwTime: string; hwHeight: string }) => void;
}) {
  const { form, set } = useNavForm("tide-prediction", { query: "", stationId: "", date: "" });
  const [pack, setPack] = useState<TidePack | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let alive = true;
    loadPack()
      .then((p) => alive && setPack(p))
      .catch((e: unknown) => alive && setLoadError(e instanceof Error ? e.message : "The station list could not be loaded."));
    return () => {
      alive = false;
    };
  }, []);

  const matches = useMemo(() => (pack ? searchStations(pack.stations, form.query) : []), [pack, form.query]);
  const station: TideStation | undefined = pack?.stations.find((s) => s.id === form.stationId);
  const day = form.date ? new Date(`${form.date}T00:00:00Z`) : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  const events = useMemo(
    () => (station && Number.isFinite(day.getTime()) ? predictExtremes(station, day, new Date(day.getTime() + 48 * 3600_000)) : []),
    [station, day.getTime()], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const q = parseUtc(queryUtc);
  const atQuery = station && Number.isFinite(q.getTime()) ? predictHeight(station, q) : null;

  const use = () => {
    if (!station) return;
    const around = surroundingEvents(station, Number.isFinite(q.getTime()) ? q : new Date(day.getTime() + 12 * 3600_000));
    if (!around) return;
    const low = around.before.type === "low" ? around.before : around.after;
    const high = around.before.type === "high" ? around.before : around.after;
    onUse({
      lwTime: toLocalInput(low.timeUtc),
      lwHeight: low.heightM.toFixed(2),
      hwTime: toLocalInput(high.timeUtc),
      hwHeight: high.heightM.toFixed(2),
    });
  };

  return (
    <ToolSection
      title="Tide prediction (NOAA stations)"
      icon={CalendarSearch}
      description="Astronomical prediction from NOAA harmonic constants, offline. US coasts, Alaska, Hawaii, the Caribbean and Pacific islands."
    >
      {loadError && <ToolNotice tone="warning">{loadError}</ToolNotice>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="tp-q" className="text-xs">Station</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="tp-q" value={form.query} onChange={(e) => set("query")(e.target.value)} placeholder="Name, state or station number" className="h-9 pl-9" />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="tp-d" className="text-xs">
            Date <span className="text-muted-foreground">(UTC)</span>
          </Label>
          <Input id="tp-d" type="date" value={form.date} onChange={(e) => set("date")(e.target.value)} className="h-9" />
        </div>
      </div>

      {form.query.trim() && !station && pack && (
        matches.length ? (
          <ul className="divide-y divide-border/40 rounded-lg border border-border/40">
            {matches.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => set("stationId")(s.id)} className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted/50">
                  <span className="font-medium">{s.name}</span>
                  <span translate="no" className="notranslate shrink-0 text-xs text-muted-foreground">{s.state} · {s.id}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ToolNotice>No NOAA station matches. Outside US waters use the Admiralty Tide Tables or TotalTide.</ToolNotice>
        )
      )}

      {station && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs">
            <span>
              <span className="font-semibold text-foreground">{station.name}</span>{" "}
              <span translate="no" className="notranslate text-muted-foreground">
                {station.state} · {station.id} · {fmtLat(station.lat)} {fmtLon(station.lon)}
              </span>
            </span>
            <Button type="button" variant="ghost" size="sm" className="h-7" onClick={() => set("stationId")("")}>
              Change station
            </Button>
          </div>
          <ResultTable
            title="High and low waters (48 h)"
            rows={[
              ...events.map((e) => ({
                label: `${e.type === "high" ? "HW" : "LW"} · ${fmtUtc(e.timeUtc)}`,
                value: `${fmt(e.heightM, 2)} m`,
                hint: `Station standard time ${standardTime(e.timeUtc, station.tz)}`,
              })),
              ...(atQuery !== null ? [{ label: `Height at the time required (${fmtUtc(q)})`, value: `${fmt(atQuery, 2)} m`, emphasis: true }] : []),
            ]}
            copyText={[station.name, ...events.map((e) => `${e.type === "high" ? "HW" : "LW"} ${fmtUtc(e.timeUtc)} ${fmt(e.heightM, 2)} m`)].join("\n")}
          />
          <Button type="button" variant="secondary" size="sm" onClick={use}>
            Use the tides around the time required below
          </Button>
          <ToolNotice>
            Heights above MLLW, the chart datum of US charts. Predictions are astronomical: wind, pressure and river flow
            are not included. Each station was checked against NOAA&apos;s published predictions (largest difference{" "}
            {fmt(station.checkedMaxErrorM ?? Number.NaN, 3)} m).
          </ToolNotice>
        </>
      )}

      <ToolNotice>
        Turkish coasts: the tidal range is only a few centimetres and the sea level is driven by wind and pressure, so no
        prediction is given. For the observed sea level see TUDES (tudes.harita.gov.tr). Other areas: Admiralty Tide Tables
        or TotalTide.
      </ToolNotice>
    </ToolSection>
  );
}
