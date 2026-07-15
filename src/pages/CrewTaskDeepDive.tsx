import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, AlertTriangle, BookMarked, Lightbulb, Scale, FileText, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails } from "@/data/crewRoleDetails";
import { loadCrewTaskLongForm, type CrewTaskLongForm, type CrewTaskCallout } from "@/data/crewTasks/types";
import { BookSheet } from "@/components/book/BookSheet";

const calloutMeta: Record<CrewTaskCallout["type"], { Icon: typeof AlertTriangle; cls: string; label: string }> = {
  warning:    { Icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200", label: "Uyarı" },
  reference:  { Icon: BookMarked,    cls: "border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200", label: "Referans" },
  tip:        { Icon: Lightbulb,     cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200", label: "İpucu" },
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Örnek" },
  regulation: { Icon: Scale,         cls: "border-primary/40 bg-primary/10 text-foreground", label: "Mevzuat" },
};

export default function CrewTaskDeepDive() {
  const { roleSlug, taskIndex } = useParams<{ roleSlug: string; taskIndex: string }>();
  const idx = Number(taskIndex);
  const role = roleSlug ? crewRoleMap[roleSlug] : undefined;
  const taskMeta = roleSlug ? crewRoleDetails[roleSlug]?.tasks[idx] : undefined;

  const [content, setContent] = useState<CrewTaskLongForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    if (!roleSlug || Number.isNaN(idx)) return;
    setLoading(true);
    loadCrewTaskLongForm(roleSlug, idx)
      .then((c) => setContent(c))
      .finally(() => setLoading(false));
  }, [roleSlug, idx]);

  if (!role || !taskMeta) {
    return (
      <BookSheet title="GEMİ PERSONELİ">
        <p className="bs-muted py-10 text-center text-sm italic">Görev bulunamadı</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="GEMİ PERSONELİ">
      <div className="flex flex-col gap-4">
        {content && (
          <div className="flex justify-end">
            <span className="bs-chip">
              ~{content.estimatedPages} sayfa
            </span>
          </div>
        )}

        <header className="">
          <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[rgba(90,61,20,.7)]">
            <BookOpen className="h-4 w-4" /> Detaylı Anlatım
          </div>
          <h1 className="bs-h2">{taskMeta.title}</h1>
        </header>

        {loading && (
          <div className="bs-muted flex items-center justify-center gap-2 p-8 text-sm italic">
            <Loader2 className="h-4 w-4 animate-spin" /> İçerik yükleniyor…
          </div>
        )}

        {!loading && !content && (
          <div className="bs-callout text-center">
            <p className="text-sm font-semibold">Bu görev için detaylı anlatım hazırlanıyor.</p>
            <p className="bs-muted mt-2 text-xs">
              Şimdilik özet açıklama ile yetinmeniz gerekiyor. Yakında 20-30 sayfalık tam anlatım yayımlanacak.
            </p>
            <p className="mt-4 border-t border-dotted border-[rgba(120,80,20,.4)] pt-3 text-left text-sm leading-relaxed">
              {taskMeta.description}
            </p>
          </div>
        )}

        {content && (
          <>
            {/* Chapter chips */}
            <nav className="bs-sticky -mx-1 overflow-x-auto px-1">
              <div className="flex gap-1.5">
                {content.chapters.map((ch, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChapter(i)}
                    className={`shrink-0 whitespace-nowrap ${activeChapter === i ? "bs-chip bs-chip--on" : "bs-chip"}`}
                  >
                    {i + 1}. {ch.heading.replace(/^\d+\.\s*/, "")}
                  </button>
                ))}
              </div>
            </nav>

            {/* Active chapter */}
            <article className="">
              {(() => {
                const ch = content.chapters[activeChapter];
                return (
                  <>
                    <h2 className="bs-h2 mb-3">{ch.heading}</h2>
                    {ch.lead && (
                      <p className="bs-callout mb-5 text-sm italic">
                        {ch.lead}
                      </p>
                    )}
                    {ch.sections.map((sec, si) => (
                      <section key={si} className="bs-prose mb-6">
                        <h3 className="mb-2 text-base font-semibold">{sec.subheading}</h3>
                        {sec.paragraphs.map((p, pi) => (
                          <p key={pi} className="mb-3 text-sm leading-relaxed">
                            {p}
                          </p>
                        ))}
                        {sec.bullets && (
                          <ul className="mb-3 space-y-1.5 pl-5">
                            {sec.bullets.map((b, bi) => (
                              <li key={bi} className="list-disc text-sm leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                        {sec.table && (
                          <div className="bs-table-wrap">
                            {sec.table.caption && (
                              <div className="bs-muted px-1 py-1 text-xs font-semibold italic">
                                {sec.table.caption}
                              </div>
                            )}
                            <table className="bs-table">
                              <thead>
                                <tr>
                                  {sec.table.headers.map((h, hi) => (
                                    <th key={hi} className="">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {sec.table.rows.map((row, ri) => (
                                  <tr key={ri} className="">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="">
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
                            <div key={ci} className={"bs-callout my-4"}>
                              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[rgba(90,61,20,.7)]">
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
              <div className="mt-6 flex items-center justify-between border-t border-dotted border-[rgba(120,80,20,.4)] pt-4">
                <button
                  onClick={() => setActiveChapter((v) => Math.max(0, v - 1))}
                  disabled={activeChapter === 0}
                  className="bs-btn--ghost text-xs"
                >
                  <ChevronLeft className="h-4 w-4" /> Önceki
                </button>
                <span className="bs-muted text-xs">
                  {activeChapter + 1} / {content.chapters.length}
                </span>
                <button
                  onClick={() => setActiveChapter((v) => Math.min(content.chapters.length - 1, v + 1))}
                  disabled={activeChapter === content.chapters.length - 1}
                  className="bs-btn--ghost text-xs"
                >
                  Sonraki <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </article>

            {content.sources && content.sources.length > 0 && (
              <aside className="rounded-2xl border border-border/40 bg-card/60 p-5 bs-muted text-xs">
                <div className="bs-section">Kaynaklar</div>
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
    </BookSheet>
  );
}
