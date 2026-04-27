
import { useParams, Link } from "react-router-dom";
import { BookOpen, Shield, ClipboardCheck, Lightbulb, Users, Scale } from "lucide-react";
import { getShipTaskBySlug } from "@/data/shipTaskDetailData";
import { BackButton } from "@/components/BackButton";

export default function ShipTaskDetailPage() {
  const { taskSlug } = useParams<{ taskSlug: string }>();
  const task = taskSlug ? getShipTaskBySlug(taskSlug) : undefined;

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-foreground">İş bulunamadı</h1>
          <BackButton to="/ship-tasks" variant="pill" label="Geri Dön" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      {/* Background blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            {task.categoryIcon} {task.category}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
          <div className="flex justify-center">
            <BackButton to="/ship-tasks" variant="pill" label="Tüm İşler" />
          </div>
        </header>

        {/* Definition & Importance */}
        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              Tanım
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{task.definition}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Önem
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{task.importance}</p>
          </div>
        </section>

        {/* Procedures */}
        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Prosedür Adımları
          </div>
          <div className="space-y-3">
            {task.procedures.map((p) => (
              <div key={p.step} className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {p.step}
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-foreground">{p.title}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibility Matrix */}
        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Users className="h-4 w-4 text-primary" />
            Sorumluluk Matrisi
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-left">
                  <th className="py-2 pr-4 font-semibold text-foreground">Pozisyon</th>
                  <th className="py-2 font-semibold text-primary">Görevler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {task.responsibilities.map((r) => (
                  <tr key={r.role}>
                    <td className="py-2 pr-4 font-medium text-foreground whitespace-nowrap">{r.role}</td>
                    <td className="py-2 text-muted-foreground">{r.duties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Regulations */}
        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Scale className="h-4 w-4 text-primary" />
            İlgili Mevzuat
          </div>
          <ul className="space-y-1.5">
            {task.regulations.map((reg) => (
              <li key={reg} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {reg}
              </li>
            ))}
          </ul>
        </section>

        {/* Checklist */}
        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Kontrol Listesi
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-left">
                  <th className="py-2 pr-4 font-semibold text-foreground">Madde</th>
                  <th className="py-2 font-semibold text-primary">Sorumlu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {task.checklist.map((c) => (
                  <tr key={c.item}>
                    <td className="py-1.5 pr-4 text-foreground">{c.item}</td>
                    <td className="py-1.5 text-primary whitespace-nowrap">{c.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical Tip */}
        <section className="rounded-2xl border border-amber-500/30 bg-amber-50/50 p-5 shadow-sm backdrop-blur dark:border-amber-500/20 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Pratik İpucu
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{task.practicalTip}</p>
        </section>
      </div>
    </div>
  );
}
