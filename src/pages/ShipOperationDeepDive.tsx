import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  AlertTriangle,
  BookMarked,
  ClipboardList,
  Lightbulb,
  ListChecks,
  Scale,
  ScrollText,
  ShieldAlert,
  Target,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId, ShipOperation } from "@/data/shipOperationsData";
import { loadShipOpLongForm, type ShipOpLongForm, type ShipOpCallout } from "@/data/shipOperations/longform/types";
import { scrollToTop } from "@/lib/scrollToTop";

const calloutMeta: Record<ShipOpCallout["type"], { Icon: typeof AlertTriangle; cls: string; label: string }> = {
  warning:    { Icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200", label: "Warning" },
  reference:  { Icon: BookMarked,    cls: "border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200", label: "Reference" },
  tip:        { Icon: Lightbulb,     cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200", label: "hint" },
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Examples" },
  regulation: { Icon: Scale,         cls: "border-primary/40 bg-primary/10 text-foreground", label: "Legislation" },
};

export default function ShipOperationDeepDive() {
  const { shipType, dept, opIndex } = useParams<{ shipType: string; dept: string; opIndex: string }>();
  const idx = Number(opIndex);
  const ship = shipType ? shipTypeMap[shipType] : undefined;
  const department = ship?.departments.find((d) => d.id === (dept as DepartmentId));
  const opMeta = department?.operations[idx];

  const [content, setContent] = useState<ShipOpLongForm | null>(null);
  const [loading, setLoading] = useState(true);
  // 0 = operasyon özeti (eski liste ekranındaki amaç/prosedür/mevzuat blokları),
  // 1..n = uzun-form bölümleri. Özet artık anlatımın ilk sayfasıdır.
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (!shipType || !dept || Number.isNaN(idx)) return;
    setLoading(true);
    setActivePage(0);
    loadShipOpLongForm(shipType, dept, idx)
      .then((c) => setContent(c))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, [shipType, dept, idx]);

  // Each chapter is its own page ("2 / 8"), so Önceki/Sonraki and the chapter
  // chips have to start at the top instead of dropping the reader halfway
  // down the new chapter at the previous one's scroll offset.
  useEffect(() => {
    scrollToTop();
  }, [activePage]);

  if (!ship || !opMeta) {
    return (
      <MobileLayout>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-xl font-bold">Operation not found</h1>
        </div>
      </MobileLayout>
    );
  }

  const chapters = content?.chapters ?? [];
  const totalPages = chapters.length + 1;
  const chapter = activePage > 0 ? chapters[activePage - 1] : undefined;

  const pages: ReadingPage[] = [
    {id:"summary",title:"Operation summary",section:department?.label ?? "Operations",
      content:<OperationSummary operation={opMeta} longFormMissing={!content} />},
    ...chapters.map((ch,index)=>({
      id:`chapter-${index}`,title:ch.heading,section:`Section ${index+1} / ${chapters.length}`,
      content:<div className="space-y-5"><h2 className="mb-3 text-xl font-bold text-foreground">{ch.heading}</h2>
                    {ch.lead && (
                      <p className="mb-5 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-3 text-sm italic leading-relaxed text-foreground/90">
                        {ch.lead}
                      </p>
                    )}
                    {ch.sections.map((sec, si) => (
                      <section key={si} className="mb-7">
                        <h3 className="mb-2 text-base font-semibold text-foreground">{sec.subheading}</h3>
                        {sec.paragraphs?.map((p, pi) => (
                          <p key={pi} className="mb-3 text-sm leading-relaxed text-foreground/85 dark:text-slate-300">
                            {p}
                          </p>
                        ))}
                        {sec.bullets && (
                          <ul className="mb-3 space-y-1.5 pl-5">
                            {sec.bullets.map((b, bi) => (
                              <li key={bi} className="list-disc text-sm leading-relaxed text-foreground/85 marker:text-primary/60">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        {sec.table && (
                          <div className="my-4 overflow-x-auto rounded-lg border border-border/40">
                            {sec.table.caption && (
                              <div className="bg-muted/40 px-3 py-2 text-xs font-semibold text-muted-foreground">
                                {sec.table.caption}
                              </div>
                            )}
                            <table className="w-full text-xs">
                              <thead className="bg-muted/30">
                                <tr>
                                  {sec.table.headers.map((h, hi) => (
                                    <th key={hi} className="px-3 py-2 text-left font-semibold text-foreground">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sec.table.rows.map((row, ri) => (
                                  <tr key={ri} className="border-t border-border/30">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="px-3 py-2 text-foreground/85">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {sec.callouts?.map((co, ci) => {
                          const meta = calloutMeta[co.type];
                          const Icon = meta.Icon;
                          return (
                            <div key={ci} className={`my-4 rounded-lg border p-3 ${meta.cls}`}>
                              <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                <Icon className="h-3.5 w-3.5" />
                                {co.title ?? meta.label}
                              </div>
                              <p className="text-sm leading-relaxed">{co.text}</p>
                            </div>
                          );
                        })}
                      </section>
                    ))}
</div>,
    })),
    ...(content?.sources?.length ? [{
      id:"sources",title:"Source references",section:"Further reading",
      content:<ul className="list-disc space-y-3 pl-5">{content.sources.map((v,i)=><li key={i}>{v}</li>)}</ul>,
    }] : []),
  ];
  return (
    <MobileLayout>
      {loading ? <p className="p-6 text-sm text-muted-foreground">Loading operation lesson…</p> :
        <PagedReadingSurface key={`${shipType}:${dept}:${opIndex}`} title={opMeta.title}
          subtitle={`${ship.label} · ${department?.label ?? ""}`} pages={pages}
          storageKey={`mariners-book:ship-operation:${shipType}:${dept}:${opIndex}`} />}
    </MobileLayout>
  );
}

/**
 * Operasyon listesinden taşınan özet blokları.
 * Amaç, prosedür, mevzuat, risk ve kayıt başlıkları liste ekranında değil,
 * anlatımın ilk sayfasında tek kaynaktan okunur.
 */
function OperationSummary({
  operation,
  longFormMissing,
}: {
  operation: ShipOperation;
  longFormMissing: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Operation Summary</h2>

      {longFormMissing && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs leading-relaxed text-muted-foreground">
          A chapter-by-chapter long-form write-up of this operation is being prepared. The summary below shows the complete verified operation data.
        </p>
      )}

      <ContentSection icon={Target} title="Purpose">
        <p className="text-sm leading-relaxed text-foreground/85">{operation.purpose}</p>
      </ContentSection>

      <ContentSection icon={ListChecks} title="Procedure">
        <ol className="space-y-2">
          {operation.procedure.map((step, stepIndex) => (
            <li key={`${stepIndex}-${step}`} className="flex items-start gap-3 text-sm text-foreground/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {stepIndex + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </ContentSection>

      {operation.regulations && operation.regulations.length > 0 && (
        <ContentSection icon={ScrollText} title="Relevant Legislation">
          <div className="flex flex-wrap gap-2">
            {operation.regulations.map((regulation) => (
              <span key={regulation} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                {regulation}
              </span>
            ))}
          </div>
        </ContentSection>
      )}

      {operation.safety && operation.safety.length > 0 && (
        <ContentSection icon={ShieldAlert} title="Safety and Risk">
          <ul className="space-y-2">
            {operation.safety.map((item) => (
              <li key={item} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-sm leading-relaxed text-foreground/85">
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>
      )}

      {operation.records && operation.records.length > 0 && (
        <ContentSection icon={ClipboardList} title="Registration and Checklist">
          <ul className="grid gap-2 sm:grid-cols-2">
            {operation.records.map((record) => (
              <li key={record} className="rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 text-sm text-foreground/85">
                {record}
              </li>
            ))}
          </ul>
        </ContentSection>
      )}
    </div>
  );
}

function ContentSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h3>
      {children}
    </section>
  );
}
