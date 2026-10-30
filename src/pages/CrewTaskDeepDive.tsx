import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, AlertTriangle, BookMarked, Lightbulb, Scale, FileText, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails } from "@/data/crewRoleDetails";
import { loadCrewTaskLongForm, type CrewTaskLongForm, type CrewTaskCallout } from "@/data/crewTasks/types";
import { scrollToTop } from "@/lib/scrollToTop";

const calloutMeta: Record<CrewTaskCallout["type"], { Icon: typeof AlertTriangle; cls: string; label: string }> = {
  warning:    { Icon: AlertTriangle, cls: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200", label: "Warning" },
  reference:  { Icon: BookMarked,    cls: "border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-200", label: "Reference" },
  tip:        { Icon: Lightbulb,     cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200", label: "hint" },
  example:    { Icon: FileText,      cls: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-200", label: "Examples" },
  regulation: { Icon: Scale,         cls: "border-primary/40 bg-primary/10 text-foreground", label: "Legislation" },
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

  // Each chapter is its own page ("2 / 8"), so Önceki/Sonraki and the chapter
  // chips have to start at the top instead of dropping the reader halfway
  // down the new chapter at the previous one's scroll offset.
  useEffect(() => {
    scrollToTop();
  }, [activeChapter]);

  if (!role || !taskMeta) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-bold">Task not found</h1>
      </div>
    );
  }

  const pages: ReadingPage[] = [
    {id:"summary",title:taskMeta.title,section:"Introduction",
      content:<div className="space-y-4">
        <p>{taskMeta.description}</p>
        {!content && <p className="text-sm text-muted-foreground">Long-form chapters are not available for this task yet.</p>}
      </div>},
    ...((content?.chapters ?? []).map((ch,index)=>({
      id:`chapter-${index}`,title:ch.heading,section:`Chapter ${index+1} / ${content!.chapters.length}`,
      content:<div className="space-y-5"><h2 className="mb-3 text-xl font-bold text-foreground">{ch.heading}</h2>
                    {ch.lead && (
                      <p className="mb-5 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-3 text-sm italic leading-relaxed text-foreground/90">
                        {ch.lead}
                      </p>
                    )}
                    {ch.sections.map((sec, si) => (
                      <section key={si} className="mb-7">
                        <h3 className="mb-2 text-base font-semibold text-foreground">{sec.subheading}</h3>
                        {sec.paragraphs.map((p, pi) => (
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
    }))),
    ...(content?.sources?.length ? [{
      id:"sources",title:"Source references",section:"References",
      content:<ul className="list-disc space-y-3 pl-5">{content.sources.map((v,i)=><li key={i}>{v}</li>)}</ul>,
    }] : []),
  ];
  return loading
    ? <p className="p-6 text-sm text-muted-foreground">Loading crew task lesson…</p>
    : <PagedReadingSurface key={`${roleSlug}:${taskIndex}`} title={taskMeta.title}
      subtitle={role.title} pages={pages}
      storageKey={`mariners-book:crew-task:${roleSlug}:${taskIndex}`} />;
}
