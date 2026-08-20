import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  FileCheck2,
  Sigma,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CalculationRecord } from "@/utils/calculationRecord";
import { calculationRecordToText } from "@/utils/calculationRecord";

const formatUtc = (iso: string) => iso.replace("T", " ").replace(".000Z", " UTC").replace("Z", " UTC");

export function CalculationRecordPanel({ record }: { record: CalculationRecord }) {
  const [copied, setCopied] = useState(false);
  const hasWarning = record.checks.some((check) => check.status !== "pass");

  const copyRecord = async () => {
    try {
      await navigator.clipboard.writeText(calculationRecordToText(record));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-3 rounded-xl border border-primary/20 bg-primary/[0.035] p-3" aria-label="account statement">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileCheck2 className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Professional Account Statement</p>
        </div>
        <Button type="button" size="sm" variant="outline" className="h-8 gap-1.5" onClick={copyRecord}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy Dump"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" className="gap-1 bg-background/70">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {record.inputs.length} girdi
        </Badge>
        <Badge variant="outline" className="gap-1 bg-background/70">
          <Sigma className="h-3 w-3 text-blue-500" /> formula trace
        </Badge>
        <Badge variant="outline" className="gap-1 bg-background/70">
          <Clock3 className="h-3 w-3 text-muted-foreground" /> {formatUtc(record.computedAtUtc)}
        </Badge>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="min-w-0 rounded-lg border border-border/40 bg-background/65 p-3">
          <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-muted-foreground">Verified entries</p>
          <dl className="space-y-1.5">
            {record.inputs.map((input) => (
              <div key={input.key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs">
                <dt className="truncate text-muted-foreground" title={input.label}>{input.label}</dt>
                <dd className="font-mono font-semibold text-foreground">
                  {input.value}{input.unit ? ` ${input.unit}` : ""}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.055] p-3">
          <p className="mb-2 text-micro font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">final results</p>
          <dl className="space-y-1.5">
            {record.results.map((result, index) => (
              <div key={`${result.label}-${index}`} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs">
                <dt className="truncate text-muted-foreground" title={result.label}>{result.label}</dt>
                <dd className="text-right font-mono font-bold text-foreground">{result.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="space-y-2 rounded-lg border border-border/40 bg-background/65 p-3 text-xs">
        <div>
          <p className="text-micro font-semibold uppercase tracking-wide text-muted-foreground">Relation used</p>
          <p translate="no" className="notranslate mt-1 break-words font-mono text-primary">{record.formula}</p>
        </div>
        {record.note && (
          <div>
            <p className="text-micro font-semibold uppercase tracking-wide text-muted-foreground">Scope/assumption</p>
            <p className="mt-1 text-muted-foreground">{record.note}</p>
          </div>
        )}
        <div>
          <p className="text-micro font-semibold uppercase tracking-wide text-muted-foreground">Weld trace</p>
          <p className="mt-1 text-muted-foreground">
            {record.source?.code ?? "Source not specified"}
            {record.source?.detail ? ` — ${record.source.detail}` : ""}
          </p>
        </div>
      </div>

      {hasWarning && (
        <div className="space-y-1.5 rounded-lg border border-amber-500/25 bg-amber-500/[0.07] p-3">
          {record.checks.filter((check) => check.status !== "pass").map((check) => (
            <div key={check.label} className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p><span className="font-semibold">{check.label}:</span> {check.detail}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-micro leading-relaxed text-muted-foreground">
        This transcript is for training and cross-checking. Stability booklet, loading computer, navigational publications,
        Class/manufacturer data and ship-specific approved documents have priority in required operations.
      </p>
    </section>
  );
}
