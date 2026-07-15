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
  Printer,
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
import { BookSheet } from "@/components/book/BookSheet";

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
      "border-emerald-500/30 bg-[rgba(120,80,20,.12)] text-emerald-700 dark:text-emerald-300",
  },
  "master-order": {
    label: "Kaptan emri",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  "ship-specific": {
    label: "Gemiye özel işaret",
    className:
      "border-amber-500/30 bg-amber-500/10 text-[#8f1f1f]",
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
    <BookSheet title="ROLE CETVELİ">
      <div className="flex flex-col gap-5 print:gap-4">
        <p className="bs-muted -mt-1 text-center text-[11px] italic">Muster List / Role Cetveli</p>

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
                className={`group flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-sm border p-2 text-center transition ${
                  isActive
                    ? "border-[#4a3113] bg-[#4a3113] text-[#f3e7c9]"
                    : "border-dotted border-[rgba(120,80,20,.55)] text-[#4a3113]"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold leading-tight">
                  {emergency.shortTitle}
                </span>
              </button>
            );
          })}
        </nav>

        <section className="break-inside-avoid print:bg-white">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-[#3f2a0e]">{activeEmergency.title}</h2>
                <span className="bs-chip">{signalMeta.label}</span>
              </div>
              <p className="max-w-4xl text-xs leading-relaxed text-[rgba(90,61,20,.72)] sm:text-sm">
                {activeEmergency.description}
              </p>
            </div>
            <span className="bs-chip text-[rgba(90,61,20,.72)]">
              {activeEmergency.reference}
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="bs-callout">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#7a5c1a]">
                <Bell className="h-4 w-4" />
                {activeEmergency.signalLabel}
              </div>
              <p className="text-sm leading-relaxed text-[#4a3113]">
                {activeEmergency.signal}
              </p>
              <div className="bs-callout mt-3 flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8f1f1f]" />
                <p className="text-xs leading-relaxed text-[#4a3113]">
                  {activeEmergency.caution}
                </p>
              </div>
            </div>

            <div className="bs-callout">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#3f2a0e]">
                <ClipboardCheck className="h-4 w-4 text-[#7a5c1a]" />
                İlk hareketler
              </div>
              <ol className="space-y-2.5">
                {activeEmergency.firstActions.map((action, index) => (
                  <li key={action} className="flex gap-2.5 text-xs leading-relaxed text-[#4a3113]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(120,80,20,.12)] text-[10px] font-bold text-[#7a5c1a]">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="break-inside-avoid print:bg-white">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(120,80,20,.12)] text-[#7a5c1a]">
                <CalendarClock className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-[#3f2a0e]">SOLAS / ISPS Talim Başlıkları</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-[rgba(90,61,20,.72)]">
                  Periyodik zorunlu adlandırmalar; “Genel Talim” bir SOLAS talim başlığı değildir.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
            {solasDrills.map((drill) => (
              <article
                key={drill.id}
                className="rounded-sm border border-dotted border-[rgba(120,80,20,.45)] p-3"
              >
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-[rgba(120,80,20,.4)] bg-[rgba(120,80,20,.07)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#7a5c1a]">
                    {drill.classification}
                  </span>
                  {!drill.isStandalone && (
                    <span className="rounded-full border border-[rgba(120,80,20,.4)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#8f1f1f]">
                      Ayrı talim değildir
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xs font-bold leading-snug text-[#3f2a0e]">{drill.title}</h3>
                <p className="mt-0.5 text-[10px] font-medium text-[rgba(90,61,20,.72)]">
                  {drill.englishTitle}
                </p>
                <dl className="mt-3 space-y-2 text-[11px] leading-relaxed">
                  <div>
                    <dt className="font-bold text-[#3f2a0e]">Kapsam</dt>
                    <dd className="text-[rgba(90,61,20,.72)]">{drill.applicability}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#3f2a0e]">Periyot</dt>
                    <dd className="text-[rgba(90,61,20,.72)]">{drill.frequency}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-dotted border-[rgba(120,80,20,.4)] pt-2 text-[10px] font-semibold text-[#7a5c1a]">
                  {drill.reference}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-4 border-t border-dotted border-[rgba(120,80,20,.4)] pt-3 text-[10px] leading-relaxed text-[rgba(90,61,20,.72)]">
            {solasDrillScopeNote}
          </p>
        </section>

        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <label className="relative block w-full sm:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(90,61,20,.72)]" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Rütbe, ekip, görev yeri veya ekipman ara…"
              className="bs-input h-11 pl-9 pr-3 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={() => window.print()}
            className="bs-btn--ghost h-11 px-4 text-xs"
          >
            <Printer className="h-4 w-4" />
            Yazdır
          </button>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[rgba(90,61,20,.72)]">
          <span>
            <strong className="text-[#3f2a0e]">{visibleAssignments}</strong> personel rütbesi ·{" "}
            <strong className="text-[#3f2a0e]">{groups.length}</strong> acil durum ekibi
          </span>
          <span className="print:hidden">Kartlardaki rütbe bağlantıları mevcut görev detaylarını açar.</span>
        </div>

        {groups.length > 0 ? (
          <div className="space-y-5">
            {groups.map((group) => (
              <section
                key={group.team}
                className="break-inside-avoid print:bg-white"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-dotted border-[rgba(120,80,20,.4)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(120,80,20,.12)] text-[#7a5c1a]">
                      <Users className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#3f2a0e]">{group.team}</h2>
                      <p className="text-[11px] text-[rgba(90,61,20,.72)]">
                        {group.rows.length} görev pozisyonu
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {group.rows.map(({ assignment, duty }) => (
                    <article
                      key={assignment.id}
                      className="break-inside-avoid rounded-sm border border-dotted border-[rgba(120,80,20,.45)] p-4 print:border-slate-300 print:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/crew/${assignment.roleSlug}`}
                            className="group inline-flex items-center gap-1.5 font-bold text-[#3f2a0e] transition hover:text-[#7a5c1a] print:text-black"
                          >
                            <span>{assignment.rank}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 print:hidden" />
                          </Link>
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a5c1a]">
                            {assignment.billet}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                        <div className="rounded-sm border border-dotted border-[rgba(120,80,20,.4)] p-2.5">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[rgba(90,61,20,.72)]">
                            <MapPin className="h-3 w-3" />
                            İlk istasyon
                          </dt>
                          <dd className="font-medium leading-relaxed text-[#3f2a0e]">
                            {assignment.initialStation}
                          </dd>
                        </div>
                        <div className="rounded-sm border border-dotted border-[rgba(120,80,20,.4)] p-2.5">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[rgba(90,61,20,.72)]">
                            <ShieldAlert className="h-3 w-3" />
                            Operasyon yeri
                          </dt>
                          <dd className="font-medium leading-relaxed text-[#3f2a0e]">
                            {duty.station}
                          </dd>
                        </div>
                        <div className="rounded-sm border border-dotted border-[rgba(120,80,20,.4)] p-2.5 sm:col-span-2">
                          <dt className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[rgba(90,61,20,.72)]">
                            <Radio className="h-3 w-3" />
                            Rapor verir
                          </dt>
                          <dd className="font-medium leading-relaxed text-[#3f2a0e]">
                            {duty.reportsTo}
                          </dd>
                        </div>
                      </dl>

                      {assignment.roleNote && (
                        <p className="bs-callout mt-3 text-[11px]">
                          {assignment.roleNote}
                        </p>
                      )}

                      <div className="mt-4">
                        <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgba(90,61,20,.72)]">
                          Görev sırası
                        </h3>
                        <ol className="space-y-2.5">
                          {duty.actions.map((action, index) => (
                            <li key={action} className="flex gap-2.5 text-xs leading-relaxed text-[#4a3113]">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(120,80,20,.12)] text-[10px] font-bold text-[#7a5c1a]">
                                {index + 1}
                              </span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {duty.equipment && duty.equipment.length > 0 && (
                        <div className="mt-4 border-t border-dotted border-[rgba(120,80,20,.4)] pt-3">
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgba(90,61,20,.72)]">
                            Atanmış donanım
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {duty.equipment.map((equipment) => (
                              <span
                                key={equipment}
                                className="bs-chip"
                              >
                                {equipment}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(assignment.substitute || assignment.readinessResponsibility) && (
                        <div className="mt-4 space-y-2 border-t border-dotted border-[rgba(120,80,20,.4)] pt-3 text-[11px] leading-relaxed">
                          {assignment.substitute && (
                            <p className="text-[#4a3113]">
                              <span className="font-bold text-[#3f2a0e]">Kritik görev yedeği:</span>{" "}
                              {assignment.substitute}
                            </p>
                          )}
                          {assignment.readinessResponsibility && (
                            <p className="text-[#4a3113]">
                              <span className="font-bold text-[#3f2a0e]">Hazır bulundurma:</span>{" "}
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
          <div className="rounded-sm border border-dashed border-[rgba(120,80,20,.5)] p-8 text-center">
            <Search className="mx-auto h-6 w-6 text-[rgba(90,61,20,.72)]" />
            <p className="mt-3 text-sm font-semibold text-[#3f2a0e]">Eşleşen görev bulunamadı</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs font-semibold text-[#7a5c1a] hover:underline"
            >
              Aramayı temizle
            </button>
          </div>
        )}

        <section className="break-inside-avoid print:bg-white">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(120,80,20,.12)] text-[#7a5c1a]">
              <ClipboardCheck className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#3f2a0e]">Gerçek gemi cetveli kontrolü</h2>
              <p className="text-[11px] text-[rgba(90,61,20,.72)]">
                Kaptan onayı öncesi temel SOLAS kapsamı
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
            {musterComplianceChecklist.map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-dotted border-[rgba(120,80,20,.45)] p-3"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7a5c1a]" />
                  <div>
                    <h3 className="text-xs font-bold text-[#3f2a0e]">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[rgba(90,61,20,.72)]">
                      {item.detail}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold text-[#7a5c1a]">{item.reference}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-dotted border-[rgba(120,80,20,.4)] pt-3 text-[11px] text-[rgba(90,61,20,.72)] print:border-slate-300 print:bg-white">
          <p className="font-semibold text-[#3f2a0e]">Başlıca dayanaklar</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {musterReferences.map((reference) => (
              <li key={reference} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{reference}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-dotted border-[rgba(120,80,20,.4)] pt-3 leading-relaxed">
            Eğitim örneği; yayımlanmış gemi role cetveli, Fire Control Plan, LSA Plan, Damage
            Control Plan, SOPEP/SMPEP ve şirket SMS'i her zaman önceliklidir.
          </p>
        </footer>
      </div>
    </BookSheet>
  );
}
