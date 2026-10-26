import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { calculationFormulas } from "@/data/formulas/calculationFormulas";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { PageHeader } from "@/components/layout/PageHeader";

export type CalculationListItem = {
  id?: string;
  title: string;
  icon: LucideIcon;
  to?: string;
  href?: string;
  disabled?: boolean;
};

export function CalculationList({ items, className }: { items: CalculationListItem[]; className?: string }) {
  return (
    <InsetGroupedList className={className}>
      {items.map((item) => <CalculationRow key={item.id ?? item.title} {...item} />)}
    </InsetGroupedList>
  );
}

function CalculationRow({ id, title, icon: Icon, to, href, disabled }: CalculationListItem) {
  const reference = id ? calculationFormulas[id] : undefined;
  const content = (
    <>
      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <span className="min-w-0 flex-1 break-words text-base font-medium leading-snug text-foreground">{title}</span>
      {!disabled && (to || href) && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
    </>
  );
  const rowClass = "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left [hyphens:none]";
  return (
    <div className={cn("ios-list-row", disabled && "opacity-60")}>
      {to && !disabled ? (
        <Link className={rowClass} to={to}>{content}</Link>
      ) : href && !disabled ? (
        <a className={rowClass} href={href} target="_blank" rel="noreferrer">{content}</a>
      ) : (
        <div className={rowClass} aria-disabled={disabled || undefined}>{content}</div>
      )}
      {reference && (
        <details className="px-4 pb-3 text-sm text-muted-foreground">
          <summary className="cursor-pointer py-2 text-primary">Formula</summary>
          <div className="space-y-2 pb-2 pt-1">
            <p translate="no" className="notranslate overflow-x-auto font-mono">{reference.formula}</p>
            <p>
              <span className="font-medium">Source: </span>
              {reference.sourceUrl ? (
                <a href={reference.sourceUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                  {reference.source}<ExternalLink className="ml-1 inline h-3 w-3" aria-hidden="true" />
                </a>
              ) : reference.source}
            </p>
            <p className="text-caption">Edition / reference year: {reference.edition} / {reference.referenceYear}</p>
            <p className="text-caption">Last updated: {reference.lastUpdated}</p>
          </div>
        </details>
      )}
    </div>
  );
}

/** Content-only layout: the route and MobileLayout own the viewport and insets. */
export function CalculationPage({ title, items, children, actions }: {
  title: string;
  items?: CalculationListItem[];
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="calculation-page mx-auto w-full min-w-0 max-w-5xl space-y-5">
      <PageHeader title={title} actions={actions} />
      {children ?? <CalculationList items={items ?? []} />}
    </section>
  );
}
