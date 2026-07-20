import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { crewHierarchy } from "@/data/crewHierarchy";

export default function CrewHierarchyPage() {
  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 pb-24 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3 text-center">
          <h1 className="text-2xl font-bold text-foreground">Gemi Personeli</h1>
        </header>

        <Link
          to="/crew/muster-list"
          className="group flex items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-sky-50/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md dark:via-card dark:to-slate-900/40"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">Role Cetveli / Muster List</h2>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
          <div className="grid gap-3 md:grid-cols-3">
            {crewHierarchy.map((group) => (
              <div
                key={group.department}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-white/60 via-card to-slate-50/70 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:from-background dark:via-card dark:to-slate-900/40"
              >
                <div className="space-y-2">
                  {group.roles.map((role) => (
                    <Link
                      key={role.slug}
                      to={`/crew/${role.slug}`}
                      className="group block rounded-lg border border-border/40 bg-background/80 px-3 py-2 text-sm shadow-xs transition hover:border-primary/40 hover:bg-card"
                    >
                      <div className="font-semibold text-foreground">{role.rank}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

