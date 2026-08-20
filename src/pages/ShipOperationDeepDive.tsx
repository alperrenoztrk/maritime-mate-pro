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
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Example" },
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

  return (
    <MobileLayout>
      <div className="relative min-h-screen px-4 pb-32 py-8">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5">
          <header className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md dark:bg-slate-900/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <BookOpen className="h-4 w-4" /> Detailed Explanation
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              {ship.label} · {department?.label}
            </p>
            <h1 className="text-2xl font-black leading-tight text-foreground">{opMeta.title}</h1>
          </header>

          {loading && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card/60 p-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Content loading…
            </div>
          )}

          {!loading && (
            <>
              {/* Chapter chips */}
              {chapters.length > 0 && (
                <nav className="sticky top-2 z-20 -mx-1 overflow-x-auto rounded-xl border border-border/40 bg-card/80 p-2">
                  <div className="flex gap-1.5">
                    {["Summary", ...chapters.map((ch) => ch.heading.replace(/^\d+\.\s*/, ""))].map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePage(i)}
                        className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          activePage === i
                            ? "bg-primary text-primary-foreground"
                            : "bg-background/60 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {i === 0 ? label : `${i}. ${label}`}
                      </button>
                    ))}
                  </div>
                </nav>
              )}

              <article className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md dark:bg-slate-900/60">
                {chapter ? (
                  <>
                    <h2 className="mb-3 text-xl font-bold text-foreground">{chapter.heading}</h2>
                    {chapter.lead && (
                      <p className="mb-5 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-3 text-sm italic leading-relaxed text-foreground/90">
                        {chapter.lead}
                      </p>
                    )}
                    {chapter.sections.map((sec, si) => (
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
                  </>
                ) : (
                  <OperationSummary operation={opMeta} longFormMissing={!content} />
                )}

                {/* Prev/Next */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4">
                    <button
                      onClick={() => setActivePage((v) => Math.max(0, v - 1))}
                      disabled={activePage === 0}
                      className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" /> Previous
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {activePage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setActivePage((v) => Math.min(totalPages - 1, v + 1))}
                      disabled={activePage === totalPages - 1}
                      className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </article>

              {content?.sources && content.sources.length > 0 && (
                <aside className="rounded-2xl border border-border/40 bg-card/60 p-5 text-xs text-muted-foreground">
                  <div className="mb-2 font-semibold text-foreground">Resources</div>
                  <ul className="list-disc space-y-1 pl-5">
                    {content.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </>
          )}
        </div>
      </div>
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
        <ContentSection icon={ShieldAlert} title="Security and Risk">
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
