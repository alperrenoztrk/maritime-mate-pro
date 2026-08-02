import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  Flame,
  LifeBuoy,
  MapPin,
  Radio,
  Search,
  ShieldAlert,
  Users,
  Waves,
} from "lucide-react";
import {
  musterAssignments,
  musterComplianceChecklist,
  musterEmergencies,
  musterReferences,
  type MusterAssignment,
  type MusterDuty,
  type MusterEmergencyId,
  type MusterSignalClass,
} from "@/data/musterList";
import { solasDrills, solasDrillScopeNote } from "@/data/solasDrills";

const EMERGENCY_ICON: Record<MusterEmergencyId, typeof Bell> = {
  general: Bell,
  fire: Flame,
  abandon: LifeBuoy,
  mob: Users,
  flooding: Waves,
  "enclosed-space": ShieldAlert,
  pollution: Droplets,
};

const EMERGENCY_ACCENT: Record<MusterEmergencyId, string> = {
  general: "from-amber-500 to-orange-600",
  fire: "from-red-500 to-rose-600",
  abandon: "from-sky-500 to-blue-600",
  mob: "from-cyan-500 to-teal-600",
  flooding: "from-blue-600 to-indigo-700",
  "enclosed-space": "from-violet-500 to-purple-700",
  pollution: "from-emerald-500 to-green-700",
};

const SIGNAL_META: Record<
  MusterSignalClass,
  { label: string; className: string }
> = {
  solas: {
    label: "Standart SOLAS alarmı",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  "master-order": {
    label: "Kaptan emri",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  "ship-specific": {
    label: "Gemiye özel işaret",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
};

type TeamGroup = {
  team: string;
  rows: { assignment: MusterAssignment; duty: MusterDuty }[];
};

const normalize = (value: string) => value.toLocaleLowerCase("tr-TR").trim();

const assignmentMatches = (
  assignment: MusterAssignment,
  duty: MusterDuty,
  query: string,
) => {
  if (!query) return true;

  return normalize(
    [
      assignment.rank,
      assignment.billet,
      assignment.initialStation,
      assignment.roleNote ?? "",
      assignment.substitute ?? "",
      assignment.readinessResponsibility ?? "",
      duty.station,
      duty.team,
      duty.reportsTo,
      ...duty.actions,
      ...(duty.equipment ?? []),
    ].join(" "),
  ).includes(query);
};

export default function MusterListPage() {
  const [active, setActive] = useState<MusterEmergencyId>("general");
  const [searchQuery, setSearchQuery] = useState("");
  const activeEmergency = musterEmergencies.find((emergency) => emergency.id === active)!;
  const normalizedQuery = normalize(searchQuery);

  const groups = useMemo<TeamGroup[]>(() => {
    const grouped = new Map<string, TeamGroup>();

    musterAssignments.forEach((assignment) => {
      const duty = assignment.duties[active];
      if (!assignmentMatches(assignment, duty, normalizedQuery)) return;

      const group = grouped.get(duty.team) ?? { team: duty.team, rows: [] };
      group.rows.push({ assignment, duty });
      grouped.set(duty.team, group);
    });

    return Array.from(grouped.values());
  }, [active, normalizedQuery]);

  const visibleAssignments = groups.reduce((total, group) => total + group.rows.length, 0);
  const signalMeta = SIGNAL_META[activeEmergency.signalClass];

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 print:bg-white print:px-0 print:py-0 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0 print:hidden">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 print:max-w-none print:gap-4">
        <header className="space-y-4">

          <h1 className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <ShieldAlert className="h-3.5 w-3.5" />
            Muster List / Role Cetveli
          </h1>
        </header>

        <nav
          aria-label="Acil durum türü"
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7 print:hidden"
        >
          {musterEmergencies.map((emergency) => {
            const Icon = EMERGENCY_ICON[emergency.id];
            const isActive = emergency.id === active;

            return (
              <button
                key={emergency.id}
                type="button"
                onClick={() => setActive(emergency.id)}
                aria-pressed={isActive}
                className={`group flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition ${
                  isActive
                    ? "border-primary/50 bg-card shadow-md ring-1 ring-primary/20"
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
                  {emergency.shortTitle}
                </span>
              </button>
            );
          })}
        </nav>

        <section className="break-inside-avoid rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur print:bg-white print:shadow-none sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">{activeEmergency.title}</h2>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${signalMeta.className}`}
                >
                  {signalMeta.label}
                </span>
              </div>
              <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {activeEmergency.description}
              </p>
            </div>
            <span className="rounded-lg border border-border/50 bg-background/70 px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
              {activeEmergency.reference}
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                <Bell className="h-4 w-4" />
                {activeEmergency.signalLabel}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {activeEmergency.signal}
              </p>
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                <p className="text-xs leading-relaxed text-foreground/85">
                  {activeEmergency.caution}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-background/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                İlk hareketler
              </div>
              <ol className="space-y-2.5">
                {activeEmergency.firstActions.map((action, index) => (
                  <li key={action} className="flex gap-2.5 text-xs leading-relaxed text-foreground/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="break-inside-avoid rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur print:bg-white print:shadow-none sm:p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarClock className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">SOLAS / ISPS Talim Başlıkları</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Periyodik zorunlu adlandırmalar; “Genel Talim” bir SOLAS talim başlığı değildir.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
            {solasDrills.map((drill) => (
              <article
                key={drill.id}
                className="rounded-xl border border-border/40 bg-background/70 p-3"
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                    {drill.classification}
                  </span>
                  {!drill.isStandalone && (
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                      Ayrı talim değildir
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xs font-bold leading-snug text-foreground">{drill.title}</h3>
                <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">
                  {drill.englishTitle}
                </p>
                <dl className="mt-3 space-y-2 text-[11px] leading-relaxed">
                  <div>
                    <dt className="font-bold text-foreground">Kapsam</dt>
                    <dd className="text-muted-foreground">{drill.applicability}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foreground">Periyot</dt>
                    <dd className="text-muted-foreground">{drill.frequency}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-border/40 pt-2 text-[10px] font-semibold text-primary">
                  {drill.reference}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-4 border-t border-border/40 pt-3 text-[10px] leading-relaxed text-muted-foreground">
            {solasDrillScopeNote}
          </p>
        </section>

        <section className="print:hidden">
          <label className="relative block w-full sm:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Rütbe, ekip, görev yeri veya ekipman ara…"
              className="h-11 w-full rounded-xl border border-border/60 bg-card/85 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{visibleAssignments}</strong> personel rütbesi ·{" "}
            <strong className="text-foreground">{groups.length}</strong> acil durum ekibi
          </span>
          <span className="print:hidden">Kartlardaki rütbe bağlantıları mevcut görev detaylarını açar.</span>
        </div>

        {groups.length > 0 ? (
          <div className="space-y-5">
            {groups.map((group) => (
              <section
                key={group.team}
                className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur print:border-slate-300 print:bg-white print:shadow-none sm:p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-foreground">{group.team}</h2>
                      <p className="text-[11px] text-muted-foreground">
                        {group.rows.length} görev pozisyonu
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {group.rows.map(({ assignment, duty }) => (
                    <article
                      key={assignment.id}
                      className="break-inside-avoid rounded-xl border border-border/50 bg-background/80 p-4 shadow-xs print:border-slate-300 print:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/crew/${assignment.roleSlug}`}
                            className="group inline-flex items-center gap-1.5 font-bold text-foreground transition hover:text-primary print:text-black"
                          >
                            <span>{assignment.rank}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 print:hidden" />
                          </Link>
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                            {assignment.billet}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                        <div className="rounded-lg border border-border/40 bg-card/60 p-2.5">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            İlk istasyon
                          </dt>
                          <dd className="font-medium leading-relaxed text-foreground">
                            {assignment.initialStation}
                          </dd>
                        </div>
                        <div className="rounded-lg border border-border/40 bg-card/60 p-2.5">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <ShieldAlert className="h-3 w-3" />
                            Operasyon yeri
                          </dt>
                          <dd className="font-medium leading-relaxed text-foreground">
                            {duty.station}
                          </dd>
                        </div>
                        <div className="rounded-lg border border-border/40 bg-card/60 p-2.5 sm:col-span-2">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Radio className="h-3 w-3" />
                            Rapor verir
                          </dt>
                          <dd className="font-medium leading-relaxed text-foreground">
                            {duty.reportsTo}
                          </dd>
                        </div>
                      </dl>

                      {assignment.roleNote && (
                        <p className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 text-[11px] leading-relaxed text-foreground/80">
                          {assignment.roleNote}
                        </p>
                      )}

                      <div className="mt-4">
                        <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Görev sırası
                        </h3>
                        <ol className="space-y-2.5">
                          {duty.actions.map((action, index) => (
                            <li key={action} className="flex gap-2.5 text-xs leading-relaxed text-foreground/85">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                {index + 1}
                              </span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {duty.equipment && duty.equipment.length > 0 && (
                        <div className="mt-4 border-t border-border/40 pt-3">
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                            Atanmış donanım
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {duty.equipment.map((equipment) => (
                              <span
                                key={equipment}
                                className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-foreground/80"
                              >
                                {equipment}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(assignment.substitute || assignment.readinessResponsibility) && (
                        <div className="mt-4 space-y-2 border-t border-border/40 pt-3 text-[11px] leading-relaxed">
                          {assignment.substitute && (
                            <p className="text-foreground/80">
                              <span className="font-bold text-foreground">Kritik görev yedeği:</span>{" "}
                              {assignment.substitute}
                            </p>
                          )}
                          {assignment.readinessResponsibility && (
                            <p className="text-foreground/80">
                              <span className="font-bold text-foreground">Hazır bulundurma:</span>{" "}
                              {assignment.readinessResponsibility}
                            </p>
                          )}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
            <Search className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold text-foreground">Eşleşen görev bulunamadı</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs font-semibold text-primary hover:underline"
            >
              Aramayı temizle
            </button>
          </div>
        )}

        <section className="break-inside-avoid rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm print:border-slate-300 print:bg-white print:shadow-none sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <ClipboardCheck className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-foreground">Gerçek gemi cetveli kontrolü</h2>
              <p className="text-[11px] text-muted-foreground">
                Kaptan onayı öncesi temel SOLAS kapsamı
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
            {musterComplianceChecklist.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/40 bg-background/70 p-3"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold text-primary">{item.reference}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="rounded-2xl border border-border/50 bg-card/60 p-4 text-[11px] text-muted-foreground print:border-slate-300 print:bg-white">
          <p className="font-semibold text-foreground">Başlıca dayanaklar</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {musterReferences.map((reference) => (
              <li key={reference} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{reference}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-border/40 pt-3 leading-relaxed">
            Eğitim örneği; yayımlanmış gemi role cetveli, Fire Control Plan, LSA Plan, Damage
            Control Plan, SOPEP/SMPEP ve şirket SMS'i her zaman önceliklidir.
          </p>
        </footer>
      </div>
    </div>
  );
}
