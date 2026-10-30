import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResultTable, ToolNotice, type ResultRow } from "@/components/tools/ToolKit";
import { copyRows, type PositionInput } from "./navFormat";

/** Latitude or longitude as degrees, decimal minutes and N/S or E/W, as read off the chart. */
export function PositionField({
  id,
  label,
  kind,
  value,
  onChange,
}: {
  id: string;
  label: string;
  kind: "lat" | "lon";
  value: PositionInput;
  onChange: (value: PositionInput) => void;
}) {
  const hemis = kind === "lat" ? ["N", "S"] : ["E", "W"];
  return (
    <fieldset className="space-y-1">
      <legend className="text-xs font-medium">{label}</legend>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_4.5rem] gap-2">
        <div className="relative">
          <Input
            id={`${id}-deg`}
            aria-label={`${label} degrees`}
            type="number"
            inputMode="numeric"
            min={0}
            max={kind === "lat" ? 90 : 180}
            value={value.deg}
            placeholder={kind === "lat" ? "40" : "029"}
            onChange={(e) => onChange({ ...value, deg: e.target.value })}
            className="h-9 pr-5"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">°</span>
        </div>
        <div className="relative">
          <Input
            id={`${id}-min`}
            aria-label={`${label} minutes`}
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={59.99}
            value={value.min}
            placeholder="12.5"
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            className="h-9 pr-5"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">′</span>
        </div>
        <Select value={value.hemi} onValueChange={(hemi) => onChange({ ...value, hemi })}>
          <SelectTrigger className="h-9" aria-label={`${label} ${kind === "lat" ? "N or S" : "E or W"}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {hemis.map((h) => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </fieldset>
  );
}

/** Date and time in UTC (stored as the datetime-local string). */
export function UtcField({ id, label, value, onChange, help }: { id: string; label: string; value: string; onChange: (value: string) => void; help?: string }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs">
        {label} <span className="text-muted-foreground">(UTC)</span>
      </Label>
      <Input id={id} type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} className="h-9" />
      {help && <p className="text-micro text-muted-foreground">{help}</p>}
    </div>
  );
}

export function ChoiceField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger id={id} className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Result of a tool: the error, the result table, or a hint while inputs are missing. */
export function Outcome({ title, rows, error, empty = "Enter the values above." }: { title: string; rows?: ResultRow[] | null; error?: string; empty?: string }) {
  if (error) return <ToolNotice tone="warning">{error}</ToolNotice>;
  if (!rows || rows.length === 0) return <ToolNotice>{empty}</ToolNotice>;
  return <ResultTable title={title} rows={rows} copyText={copyRows(rows)} />;
}
