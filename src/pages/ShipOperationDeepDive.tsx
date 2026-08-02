import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, AlertTriangle, BookMarked, Lightbulb, Scale, FileText, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId } from "@/data/shipOperationsData";
import { loadShipOpLongForm, type ShipOpLongForm, type ShipOpCallout } from "@/data/shipOperations/longform/types";
import { scrollToTop } from "@/lib/scrollToTop";

const calloutMeta: Record<ShipOpCallout["type"], { Icon: typeof AlertTriangle; cls: string; label: string }> = {
  warning:    { Icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200", label: "Uyarı" },
  reference:  { Icon: BookMarked,    cls: "border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200", label: "Referans" },
  tip:        { Icon: Lightbulb,     cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200", label: "İpucu" },
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Örnek" },
  regulation: { Icon: Scale,         cls: "border-primary/40 bg-primary/10 text-foreground", label: "Mevzuat" },
};

export default function ShipOperationDeepDive() {
  const { shipType, dept, opIndex } = useParams<{ shipType: string; dept: string; opIndex: string }>();
  const idx = Number(opIndex);
  const ship = shipType ? shipTypeMap[shipType] : undefined;
  const department = ship?.departments.find((d) => d.id === (dept as DepartmentId));
  const opMeta = department?.operations[idx];

  const [content, setContent] = useState<ShipOpLongForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    if (!shipType || !dept || Number.isNaN(idx)) return;
    setLoading(true);
    setActiveChapter(0);
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
  }, [activeChapter]);

  if (!ship || !opMeta) {
    return (
      <MobileLayout>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-xl font-bold">Operasyon bulunamadı</h1>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 pb-32 py-8 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5">
          <header className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md backdrop-blur dark:bg-slate-900/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <BookOpen className="h-4 w-4" /> Detaylı Anlatım
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              {ship.label} · {department?.label}
            </p>
            <h1 className="text-2xl font-black leading-tight text-foreground">{opMeta.title}</h1>
          </header>

          {loading && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card/60 p-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> İçerik yükleniyor…
            </div>
          )}

          {!loading && !content && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center">
              <p className="text-sm font-semibold text-foreground">Bu operasyon için detaylı anlatım hazırlanıyor.</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Şimdilik özet açıklama ile yetinmeniz gerekiyor. Yakında tam anlatım yayımlanacak.
              </p>
              <p className="mt-4 rounded-lg border border-border/40 bg-background/60 p-4 text-left text-sm leading-relaxed">
                {opMeta.purpose}
              </p>
              {opMeta.procedure.length > 0 && (
                <ol className="mt-3 list-decimal space-y-1.5 rounded-lg border border-border/40 bg-background/60 p-4 pl-8 text-left text-sm leading-relaxed marker:text-primary/60">
                  {opMeta.procedure.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {content && (
            <>
              {/* Chapter chips */}
              <nav className="sticky top-2 z-20 -mx-1 overflow-x-auto rounded-xl border border-border/40 bg-card/80 p-2 backdrop-blur">
                <div className="flex gap-1.5">
                  {content.chapters.map((ch, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveChapter(i)}
                      className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        activeChapter === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {i + 1}. {ch.heading.replace(/^\d+\.\s*/, "")}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Active chapter */}
              <article className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-md backdrop-blur dark:bg-slate-900/60">
                {(() => {
                  const ch = content.chapters[activeChapter];
                  return (
                    <>
                      <h2 className="mb-3 text-xl font-bold text-foreground">{ch.heading}</h2>
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
                    </>
                  );
                })()}

                {/* Prev/Next */}
                <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4">
                  <button
                    onClick={() => setActiveChapter((v) => Math.max(0, v - 1))}
                    disabled={activeChapter === 0}
                    className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" /> Önceki
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {activeChapter + 1} / {content.chapters.length}
                  </span>
                  <button
                    onClick={() => setActiveChapter((v) => Math.min(content.chapters.length - 1, v + 1))}
                    disabled={activeChapter === content.chapters.length - 1}
                    className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
                  >
                    Sonraki <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>

              {content.sources && content.sources.length > 0 && (
                <aside className="rounded-2xl border border-border/40 bg-card/60 p-5 text-xs text-muted-foreground">
                  <div className="mb-2 font-semibold text-foreground">Kaynaklar</div>
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
