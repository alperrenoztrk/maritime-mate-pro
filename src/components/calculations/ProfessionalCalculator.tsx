import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, Calculator, Check, ClipboardCopy, RotateCcw, Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LibraryPageShell } from "@/components/library/LibraryInterface";

/** Shared presentation AND input contract for the professional calculator family. */
export interface ProfessionalField {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
  defaultValue?: string;
  help?: string;
  min?: number;
  max?: number;
}
export interface ProfessionalGroup {
  title: string;
  description?: string;
  fields: ProfessionalField[];
}
export interface ProfessionalResult {
  label: string;
  value: string;
  primary?: boolean;
}
export interface ProfessionalOutput {
  results: ProfessionalResult[];
  steps: string[];
  notices?: string[];
}
export interface ProfessionalCalculatorProps {
  title: string;
  description: ReactNode;
  icon: LucideIcon;
  groups: ProfessionalGroup[];
  formula: string;
  limitations: ReactNode;
  solve: (values: Record<string, number>) => ProfessionalOutput;
  resultTitle?: string;
}

export function parseProfessionalFields(
  groups: ProfessionalGroup[],
  raw: Record<string, string>,
): { values: Record<string, number>; errors: Record<string, string> } {
  const values: Record<string, number> = {};
  const errors: Record<string, string> = {};
  for (const field of groups.flatMap((group) => group.fields)) {
    const original = (raw[field.key] ?? "").trim().replace(",", ".");
    if (!original) {
      errors[field.key] = "Required field.";
      continue;
    }
    // Number('') becomes 0 and parseFloat('12text') becomes 12: both must fail.
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(original)) {
      errors[field.key] = "Enter a valid number.";
      continue;
    }
    const value = Number(original);
    if (!Number.isFinite(value)) {
      errors[field.key] = "Number is outside the supported range.";
    } else if (field.min !== undefined && value < field.min) {
      errors[field.key] = `Minimum: ${field.min}${field.unit ? ` ${field.unit}` : ""}.`;
    } else if (field.max !== undefined && value > field.max) {
      errors[field.key] = `Maximum: ${field.max}${field.unit ? ` ${field.unit}` : ""}.`;
    } else {
      values[field.key] = value;
    }
  }
  return { values, errors };
}

export function CalculatorPanel({ title, description, children, icon: Icon }: {
  title: string; description?: ReactNode; children: ReactNode; icon?: LucideIcon;
}) {
  return (
    <Card className="surface-2 overflow-hidden rounded-2xl border-border/60 shadow-none">
      <CardHeader className="space-y-1 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          {Icon && <Icon className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />}
          {title}
        </CardTitle>
        {description && <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function CalculatorNumberField({ id, label, unit, value, onChange, placeholder, help, error, min, max }: {
  id: string;
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  help?: string;
  error?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <Label htmlFor={id} className="block text-xs font-medium leading-snug text-foreground">
        {label}{unit && <span className="ml-1 font-normal text-muted-foreground">({unit})</span>}
      </Label>
      <Input id={id} type="text" inputMode="decimal" autoComplete="off"
        value={value} placeholder={placeholder ?? "—"}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className="h-11 rounded-xl bg-background/80 font-mono tabular-nums"
      />
      {error
        ? <p id={`${id}-error`} role="alert" className="flex items-start gap-1 text-xs text-destructive">
            <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />{error}
          </p>
        : help
          ? <p id={`${id}-help`} className="text-xs leading-relaxed text-muted-foreground">{help}</p>
          : null}
      {/* HTML keyboard hints are not validation; min/max are checked by the parent parser. */}
      {min !== undefined || max !== undefined ? <span className="sr-only">
        {min !== undefined && `Minimum ${min}.`}{max !== undefined && ` Maximum ${max}.`}
      </span> : null}
    </div>
  );
}

export function buildProfessionalReport(
  title: string,
  fields: ProfessionalGroup[],
  values: Record<string, number>,
  output: ProfessionalOutput,
  formula: string,
  timestamp: string,
): string {
  return [
    title,
    `UTC: ${timestamp}`,
    "TRAINING / CROSS-CHECK ONLY — NOT VESSEL-APPROVED",
    "",
    "INPUTS",
    ...fields.flatMap((group) => [
      `[${group.title}]`,
      ...group.fields.map((field) =>
        `${field.label}: ${values[field.key]}${field.unit ? ` ${field.unit}` : ""}`),
    ]),
    "",
    `METHOD: ${formula}`,
    "",
    "RESULTS",
    ...output.results.map((result) => `${result.label}: ${result.value}`),
    "",
    "WORKING",
    ...output.steps.map((step, index) => `${index + 1}. ${step}`),
    ...(output.notices?.length ? ["", "NOTES", ...output.notices] : []),
  ].join("\n");
}

export function CalculatorResultPanel({ title = "Calculation Results", results, steps = [], formula, notices = [], onCopy, copyStatus }: {
  title?: string;
  results: ProfessionalResult[];
  steps?: string[];
  formula?: string;
  notices?: string[];
  onCopy?: () => void;
  copyStatus?: string;
}) {
  return (
    <section aria-label={title} aria-live="polite" className="space-y-3">
      <CalculatorPanel title={title} icon={Calculator}>
        <div className="grid gap-2 sm:grid-cols-2">
          {results.map((item, index) => (
            <div key={`${item.label}-${index}`} className="min-w-0 rounded-xl border border-border/50 bg-background/70 p-3">
              <p className="text-xs leading-snug text-muted-foreground">{item.label}</p>
              <p className={`mt-1 break-words font-mono font-semibold tabular-nums text-foreground ${item.primary ? "text-2xl" : "text-base"}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </CalculatorPanel>
      {(steps.length > 0 || formula) && (
        <details className="surface-2 group rounded-2xl border border-border/60 p-3">
          <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 text-sm font-semibold text-foreground">
            <Sigma className="h-4 w-4 text-primary" aria-hidden /> Step-by-step solution
            <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">Show</span>
            <span className="ml-auto hidden text-xs font-normal text-muted-foreground group-open:inline">Hide</span>
          </summary>
          {formula && <p translate="no" className="notranslate mt-2 break-words rounded-lg bg-background/70 p-2 font-mono text-xs text-muted-foreground">{formula}</p>}
          {steps.length > 0 && <ol className="mt-3 space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-2 text-sm leading-relaxed">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                <span className="min-w-0 break-words">{step}</span>
              </li>
            ))}
          </ol>}
        </details>
      )}
      {notices.length > 0 && (
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3 text-sm leading-relaxed" role="note">
          {notices.map((notice, index) => <p key={index} className="mb-1 last:mb-0">{notice}</p>)}
        </div>
      )}
      {onCopy && (
        <div className="flex items-center justify-end gap-2">
          {copyStatus && <span role="status" className="text-xs text-muted-foreground">{copyStatus}</span>}
          <Button type="button" size="sm" variant="outline" className="min-h-10 gap-2" onClick={onCopy}>
            {copyStatus === "Copied" ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
            Copy calculation
          </Button>
        </div>
      )}
    </section>
  );
}

export function ProfessionalCalculator({
  title, description, icon, groups, formula, limitations, solve, resultTitle,
}: ProfessionalCalculatorProps) {
  const defaults = () => Object.fromEntries(groups.flatMap((group) =>
    group.fields.map((field) => [field.key, field.defaultValue ?? ""])));
  const [raw, setRaw] = useState<Record<string, string>>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snapshot, setSnapshot] = useState<{
    output: ProfessionalOutput;
    values: Record<string, number>;
    atUtc: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const update = (key: string, value: string) => {
    setRaw((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setSnapshot(null);
    setMessage("");
    setCopyStatus("");
  };
  const calculate = () => {
    const validation = parseProfessionalFields(groups, raw);
    setErrors(validation.errors);
    setSnapshot(null);
    setCopyStatus("");
    if (Object.keys(validation.errors).length > 0) {
      setMessage("Review the highlighted fields before calculating.");
      return;
    }
    try {
      const output = solve(validation.values);
      if (!output.results.length || output.results.some((result) =>
        !result.value.trim() || /\b(?:NaN|Infinity|undefined)\b/i.test(result.value))) {
        throw new Error("Calculation returned an invalid result.");
      }
      setMessage("");
      setSnapshot({ output, values: validation.values, atUtc: new Date().toISOString() });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to calculate.");
    }
  };
  const reset = () => {
    setRaw(defaults());
    setSnapshot(null);
    setErrors({});
    setMessage("");
    setCopyStatus("");
  };
  const copy = async () => {
    if (!snapshot) return;
    try {
      await navigator.clipboard.writeText(buildProfessionalReport(
        title, groups, snapshot.values, snapshot.output, formula, snapshot.atUtc));
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy unavailable on this device.");
    }
  };

  return (
    <LibraryPageShell title={title} icon={icon} maxWidth="max-w-3xl">
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="space-y-3">
        {groups.map((group, index) => (
          <CalculatorPanel key={group.title} title={group.title} description={group.description}>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((field) => (
                <CalculatorNumberField key={field.key} id={`calc-${index}-${field.key}`}
                  label={field.label} unit={field.unit} value={raw[field.key] ?? ""}
                  onChange={(value) => update(field.key, value)}
                  error={errors[field.key]} help={field.help}
                  min={field.min} max={field.max} placeholder={field.placeholder} />
              ))}
            </div>
          </CalculatorPanel>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Button type="button" size="lg" className="min-h-12 gap-2 rounded-xl" onClick={calculate}>
          <Calculator className="h-4 w-4" aria-hidden /> Calculate
        </Button>
        <Button type="button" size="lg" variant="outline" className="min-h-12 gap-2 rounded-xl" onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset
        </Button>
      </div>
      {message && <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />{message}
      </p>}
      {snapshot && (
        <CalculatorResultPanel title={resultTitle} results={snapshot.output.results}
          steps={snapshot.output.steps} formula={formula} notices={snapshot.output.notices}
          onCopy={copy} copyStatus={copyStatus} />
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        <strong>Scope and limitations:</strong> {limitations}
      </p>
    </LibraryPageShell>
  );
}
