import { useState } from "react";
import { ArrowLeftRight, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { convertMaritimeUnit, MARITIME_UNIT_CATEGORIES } from "@/lib/maritimeUnits";

function parseDecimal(text: string): number | null {
  const normalized = text.trim().replace(",", ".");
  // Unlike parseFloat, reject partially valid strings (e.g. "12abc").
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export default function ConverterPage() {
  const [categoryId, setCategoryId] = useState("distance");
  const [fromId, setFromId] = useState("nm");
  const [toId, setToId] = useState("km");
  const [value, setValue] = useState("");
  const category = MARITIME_UNIT_CATEGORIES.find((item) => item.id === categoryId)!;
  const from = category.units.find((unit) => unit.id === fromId)!;
  const to = category.units.find((unit) => unit.id === toId)!;
  const parsed = parseDecimal(value);
  let converted: number | null = null;
  let error = "";
  if (value.trim() && parsed === null) {
    error = "Enter a valid numeric value.";
  } else if (parsed !== null) {
    try {
      converted = convertMaritimeUnit(categoryId, fromId, toId, parsed);
    } catch (e) {
      error = e instanceof Error ? e.message : "Conversion failed.";
    }
  }
  const chooseCategory = (id: string) => {
    const next = MARITIME_UNIT_CATEGORIES.find((item) => item.id === id);
    if (!next) return;
    setCategoryId(id);
    setFromId(next.units[0].id);
    setToId(next.units[1].id);
    setValue("");
  };
  const swap = () => {
    // Preserve the underlying measurement, not the old numeric input.
    if (converted !== null) setValue(String(Number(converted.toPrecision(12))));
    setFromId(toId);
    setToId(fromId);
  };
  return (
    <LibraryPageShell title="Unit Converter" icon={Ruler} maxWidth="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        Convert maritime and engineering units with consistent SI definitions.
      </p>
      <nav aria-label="Conversion categories" className="flex gap-2 overflow-x-auto pb-2">
        {MARITIME_UNIT_CATEGORIES.map((item) => (
          <button type="button" key={item.id}
            onClick={() => chooseCategory(item.id)}
            aria-pressed={categoryId === item.id}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-control focus-visible:outline-2 focus-visible:outline-primary ${categoryId === item.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 bg-card text-foreground hover:bg-muted"}`}>
            {item.label}
          </button>
        ))}
      </nav>
      <Card className="surface-2 rounded-2xl border-border/60 shadow-none">
        <CardHeader><CardTitle className="text-base">{category.label}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="unit-from">From</Label>
            <Select value={fromId} onValueChange={setFromId}>
              <SelectTrigger id="unit-from" className="min-h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {category.units.map((unit) =>
                  <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}
              </SelectContent>
            </Select>
            <Label htmlFor="converter-input">Value</Label>
            <Input id="converter-input" type="text" inputMode="decimal"
              value={value} placeholder="Enter a value"
              onChange={(event) => setValue(event.target.value)} />
          </div>
          <Button type="button" onClick={swap} variant="outline" className="w-full gap-2">
            <ArrowLeftRight className="h-4 w-4" aria-hidden /> Swap units
          </Button>
          <div className="grid gap-2">
            <Label htmlFor="unit-to">To</Label>
            <Select value={toId} onValueChange={setToId}>
              <SelectTrigger id="unit-to" className="min-h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {category.units.map((unit) =>
                  <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}
              </SelectContent>
            </Select>
            <div aria-live="polite" className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs text-muted-foreground">Converted value</p>
              <p className="mt-1 break-words text-xl font-semibold tabular-nums text-foreground">
                {converted !== null
                  ? `${Number(converted.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 10 })} ${to.symbol}`
                  : "—"}
              </p>
              {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs leading-relaxed text-muted-foreground">
        1 NM = 1,852 m; 1 kn = 1 NM/h; 1 cable = 0.1 NM.
        Temperature conversions are absolute temperatures, not temperature differences.
        For contractual cargo and bunker quantities, follow the designated measurement standard.
      </p>
    </LibraryPageShell>
  );
}
