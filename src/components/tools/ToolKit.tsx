import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, AlertTriangle, Check, Clipboard, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LibraryPageShell } from "@/components/library/LibraryInterface";

/**
 * Shared building blocks for the Tools pages. They follow the same visual
 * language as the course CalculatorCard (src/components/courseContent) so a
 * multi-step tool (draft survey, loading condition, GZ curve) looks like the
 * single-formula calculators.
 */

export function ToolPage({ title, icon, children }: { title: string; icon?: LucideIcon; children: ReactNode }) {
  return (
    <LibraryPageShell title={title} icon={icon} maxWidth="max-w-4xl">
      {children}
    </LibraryPageShell>
  );
}

export function ToolSection({
  title,
  description,
  icon: Icon,
  aside,
  children,
}: {
  title: string;
  description?: ReactNode;
  icon?: LucideIcon;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="border-border/40 bg-card/80">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {Icon && <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
            {title}
          </CardTitle>
          {aside}
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

export function FieldGrid({ children, columns = 2 }: { children: ReactNode; columns?: 2 | 3 }) {
  return <div className={`grid gap-3 ${columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}>{children}</div>;
}

export function NumberField({
  id,
  label,
  unit,
  value,
  onChange,
  placeholder,
  help,
  error,
}: {
  id: string;
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  help?: string;
  error?: string;
}) {
  const describedBy = error ? `${id}-error` : help ? `${id}-help` : undefined;
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs">
        {label} {unit && <span className="text-muted-foreground">({unit})</span>}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="h-9"
      />
      {help && !error && (
        <p id={`${id}-help`} className="text-micro text-muted-foreground">{help}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-micro text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export interface ResultRow {
  label: string;
  value: string;
  /** Highlights a final figure. */
  emphasis?: boolean;
  hint?: string;
}

export function ResultTable({ title, rows, copyText }: { title: string; rows: ResultRow[]; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="space-y-2 rounded-xl border border-primary/20 bg-primary/[0.035] p-3" aria-label={title}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        {copyText && (
          <Button type="button" size="sm" variant="outline" className="h-8 gap-1.5" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>
      <dl className="divide-y divide-border/40 rounded-lg border border-border/40 bg-background/65">
        {rows.map((row, index) => (
          <div key={`${row.label}-${index}`} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-2 text-xs ${row.emphasis ? "bg-primary/[0.06]" : ""}`}>
            <dt className={row.emphasis ? "font-semibold text-foreground" : "text-muted-foreground"}>
              {row.label}
              {row.hint && <span className="block text-micro text-muted-foreground">{row.hint}</span>}
            </dt>
            <dd translate="no" className={`notranslate text-right font-mono ${row.emphasis ? "text-sm font-bold text-foreground" : "font-semibold text-foreground"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ToolNotice({ tone = "info", children }: { tone?: "info" | "warning"; children: ReactNode }) {
  const Icon = tone === "warning" ? AlertTriangle : Info;
  const toneClass =
    tone === "warning"
      ? "border-amber-500/25 bg-amber-500/[0.07] text-amber-800 dark:text-amber-200"
      : "border-border/50 bg-muted/40 text-muted-foreground";
  return (
    <div role={tone === "warning" ? "alert" : "note"} className={`flex items-start gap-2 rounded-lg border p-3 text-xs ${toneClass}`}>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function FormulaLine({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg bg-background p-2 text-center font-mono text-sm text-primary">
      <span translate="no" className="notranslate">{children}</span>
    </div>
  );
}
