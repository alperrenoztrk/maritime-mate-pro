import { Link, useParams } from "react-router-dom";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails, type CrewRoleDetail } from "@/data/crewRoleDetails";
import { ShieldCheck, Sparkles, Wrench, AlertTriangle, CheckCircle2, Anchor } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function CrewRoleDetailPage() {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const role = roleSlug ? crewRoleMap[roleSlug] : undefined;
  const detail = roleSlug ? crewRoleDetails[roleSlug] : undefined;

  if (!role) {
    return (
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Kayıt bulunamadı
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Görev detayı yüklenemedi</h1>
          <p className="text-sm text-muted-foreground">
            İstediğiniz personel kaydı bulunamadı. Lütfen listeden geçerli bir rol seçin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 pb-24 py-10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-16 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        {/* Header Card */}
        <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur dark:border-border/40 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Rol Detayı</p>
              <h1 className="text-3xl font-black leading-tight text-foreground">{role.rank}</h1>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <div className="text-sm font-semibold">
                Üstü: <span className="text-foreground dark:text-white">{role.reportsTo}</span>
              </div>
            </div>
          </div>
        </div>

        {detail ? (
          <DetailedContent detail={detail} />
        ) : (
          <BasicContent role={role} />
        )}

      </div>
    </div>
  );
}

/* ─── Detailed Content (new rich format) ─── */
function DetailedContent({ detail }: { detail: CrewRoleDetail }) {
  const [activeTab, setActiveTab] = useState<"tasks" | "equipment">("tasks");

  return (
    <>
      {/* Intro Card */}
      <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-md backdrop-blur dark:bg-slate-900/60">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
            <Anchor className="h-4.5 w-4.5" />
          </div>
          <h2 className="text-base font-bold text-foreground">Genel Bakış</h2>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90 dark:text-slate-200">
          {detail.intro}
        </p>
      </div>

      {/* Core Summary */}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Çekirdek Tanım</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground dark:text-slate-100">
          {detail.coreSummary}
        </p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${
            activeTab === "tasks"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "border-border/40 bg-card/60 text-muted-foreground hover:bg-card"
          }`}
        >
          <ShieldCheck className="mr-2 inline h-4 w-4" />
          A) İşler ({detail.tasks.length})
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition ${
            activeTab === "equipment"
              ? "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400"
              : "border-border/40 bg-card/60 text-muted-foreground hover:bg-card"
          }`}
        >
          <Wrench className="mr-2 inline h-4 w-4" />
          B) Ekipmanlar ({detail.equipment.length})
        </button>
      </div>

      {/* Tasks Section */}
      {activeTab === "tasks" && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-md backdrop-blur dark:bg-slate-900/60">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Sorumluluk Alanları ve İşler</h2>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {detail.tasks.map((task, i) => (
              <AccordionItem
                key={i}
                value={`task-${i}`}
                className="rounded-xl border border-border/40 bg-background/80 px-4 data-[state=open]:bg-emerald-500/5"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{task.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-10 text-sm leading-relaxed text-foreground/85 dark:text-slate-300">
                    {task.description}
                  </p>
                  <Link
                    to={`/crew/${detail.slug}/task/${i}`}
                    className="ml-10 mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20"
                  >
                    Detaylı Anlatımı Aç (20-30 sayfa) →
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Equipment Section */}
      {activeTab === "equipment" && (
        <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-md backdrop-blur dark:bg-slate-900/60">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Ekipman ve Kontrol Listeleri</h2>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {detail.equipment.map((eq, i) => (
              <AccordionItem
                key={i}
                value={`eq-${i}`}
                className="rounded-xl border border-border/40 bg-background/80 px-4 data-[state=open]:bg-blue-500/5"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{eq.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pl-10">
                    {eq.checkpoints.map((cp, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                        <span className="leading-relaxed text-foreground/85 dark:text-slate-300">{cp}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Critical Notes */}
      {detail.criticalNotes && detail.criticalNotes.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-md dark:border-amber-500/20">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Kritik Pratik Uyarılar</h2>
            </div>
          </div>
          <ul className="space-y-3">
            {detail.criticalNotes.map((note, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-400">
                  !
                </span>
                <span className="leading-relaxed text-foreground/90 dark:text-slate-200">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/* ─── Basic Content (fallback for roles without detailed data) ─── */
function BasicContent({ role }: { role: typeof crewRoleMap[string] }) {
  return (
    <section className="rounded-xl border border-border/50 bg-background/80 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-blue-500 to-indigo-600 text-white shadow">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Görevler</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border/40 bg-card/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </span>
            Her Durumda Temel Sorumluluklar
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {role.alwaysDuties.map((duty) => (
              <li key={duty} className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
                <span className="leading-relaxed text-foreground dark:text-slate-200">{duty}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border/40 bg-card/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
            </span>
            Genel Görevler
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {role.generalTasks.map((task) => (
              <li key={task} className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                <span className="leading-relaxed text-foreground dark:text-slate-200">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
