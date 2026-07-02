import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Flame, LifeBuoy, Waves, Bell, MapPin, Users } from "lucide-react";
import { crewHierarchy } from "@/data/crewHierarchy";
import {
  musterEmergencies,
  musterAssignments,
  type MusterEmergencyId,
} from "@/data/musterList";

const EMERGENCY_ICON: Record<MusterEmergencyId, typeof Bell> = {
  general: Bell,
  fire: Flame,
  abandon: LifeBuoy,
  mob: Waves,
};

const EMERGENCY_ACCENT: Record<MusterEmergencyId, string> = {
  general: "from-amber-500 to-orange-600",
  fire: "from-red-500 to-rose-600",
  abandon: "from-sky-500 to-blue-600",
  mob: "from-cyan-500 to-teal-600",
};

export default function MusterListPage() {
  const [active, setActive] = useState<MusterEmergencyId>("general");
  const activeEmergency = musterEmergencies.find((e) => e.id === active)!;

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  // crewHierarchy sırasını koruyarak departman bazlı gruplama
  const groups = crewHierarchy
    .map((group) => ({
      department: group.department,
      rows: group.roles
        .map((role) => musterAssignments.find((a) => a.roleSlug === role.slug))
        .filter((a): a is NonNullable<typeof a> => Boolean(a)),
    }))
    .filter((g) => g.rows.length > 0);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 pb-24 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-3">
          <Link
            to="/crew"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Personel
          </Link>
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <ShieldAlert className="h-3.5 w-3.5" />
              Rol Cetveli / Muster List
            </div>
            <h1 className="text-2xl font-bold text-foreground">Acil Durum Rol Cetveli</h1>
          </div>
        </header>

        {/* Acil durum tipi seçici */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {musterEmergencies.map((emergency) => {
            const Icon = EMERGENCY_ICON[emergency.id];
            const isActive = emergency.id === active;
            return (
              <button
                key={emergency.id}
                type="button"
                onClick={() => setActive(emergency.id)}
                aria-pressed={isActive}
                className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${
                  isActive
                    ? "border-primary/50 bg-card shadow-md"
                    : "border-border/50 bg-card/60 hover:border-primary/30 hover:bg-card"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${EMERGENCY_ACCENT[emergency.id]} ${
                    isActive ? "" : "opacity-80 group-hover:opacity-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold leading-tight text-foreground">
                  {emergency.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Seçili acil durumun işareti / açıklaması */}
        <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Alarm İşareti
            </span>
            <span className="text-sm font-medium text-foreground">{activeEmergency.signal}</span>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Toplanma kuralı:</span> Alarm
              duyulduğunda tüm personel can yeleğiyle{" "}
              <span className="font-semibold text-foreground">Muster (toplanma) İstasyonunda</span>{" "}
              toplanır; yoklama alındıktan sonra ekipler görev yerlerine (köprüüstü, makine
              dairesi, olay yeri, filika istasyonu) yönlendirilir. Yalnızca köprüüstü komuta/seyir
              ekibi doğrudan köprüüstünde toplanır.
            </p>
          </div>
        </div>

        {/* Departman bazlı rol görevleri */}
        <div className="space-y-5">
          {groups.map((group) => (
            <section
              key={group.department}
              className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur"
            >
              <h2 className="text-sm font-semibold text-foreground">{group.department}</h2>
              <div className="grid gap-2.5 md:grid-cols-2">
                {group.rows.map((assignment) => {
                  const duty =
                    assignment.duties.find((d) => d.emergencyId === active)?.duty ?? "—";
                  return (
                    <Link
                      key={assignment.roleSlug}
                      to={`/crew/${assignment.roleSlug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-border/40 bg-background/80 p-3 shadow-xs transition hover:border-primary/40 hover:bg-card"
                    >
                      <div className="font-semibold text-foreground">{assignment.rank}</div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {assignment.musterStation}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                          <Users className="h-3 w-3 shrink-0" />
                          {assignment.emergencyTeam}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{duty}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
