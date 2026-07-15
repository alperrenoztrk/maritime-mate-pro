import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Flame,
  LifeBuoy,
  MapPin,
  Radio,
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

const SIGNAL_LABEL: Record<MusterSignalClass, string> = {
  solas: "Standart SOLAS alarmı",
  "master-order": "Kaptan emri",
  "ship-specific": "Gemiye özel işaret",
};

type TeamGroup = {
  team: string;
  rows: { assignment: MusterAssignment; duty: MusterDuty }[];
};

function groupAssignments(emergencyId: MusterEmergencyId): TeamGroup[] {
  const groups = new Map<string, TeamGroup>();
  musterAssignments.forEach((assignment) => {
    const duty = assignment.duties[emergencyId];
    const group = groups.get(duty.team) ?? { team: duty.team, rows: [] };
    group.rows.push({ assignment, duty });
    groups.set(duty.team, group);
  });
  return Array.from(groups.values());
}

export default function MusterListPage() {
  return (
    <BookSheet title="ROLE CETVELİ">
      <header className="text-center">
        <h1 className="bs-h2" style={{ borderBottom: "none" }}>Role Cetveli</h1>
        <p className="bs-muted text-[11px] italic">Muster List — tüm acil durumlar açık okuma düzeninde</p>
        <div className="bs-fleuron" aria-hidden="true">❦</div>
      </header>

      <div className="bs-open-sections">
        {musterEmergencies.map((emergency, emergencyIndex) => {
          const Icon = EMERGENCY_ICON[emergency.id];
          const groups = groupAssignments(emergency.id);
          return (
            <article key={emergency.id} className="bs-reading-section break-inside-avoid">
              <header className="bs-reading-heading">
                <span className="bs-reading-number">{emergencyIndex + 1}</span>
                <Icon className="h-5 w-5" aria-hidden="true" />
                <div className="flex-1">
                  <h2>{emergency.title}</h2>
                  <p className="bs-muted text-[11px]">{emergency.description}</p>
                </div>
                <span className="bs-note">{emergency.reference}</span>
              </header>

              <div className="grid gap-3 lg:grid-cols-2">
                <section className="bs-callout">
                  <span className="bs-callout-label inline-flex items-center gap-1">
                    <Bell className="h-3.5 w-3.5" /> {emergency.signalLabel}
                  </span>
                  <p>{emergency.signal}</p>
                  <p className="mt-2 flex items-start gap-2 text-xs">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8f1f1f]" />
                    {emergency.caution}
                  </p>
                  <p className="bs-note mt-2">{SIGNAL_LABEL[emergency.signalClass]}</p>
                </section>

                <section className="bs-callout">
                  <span className="bs-callout-label">İlk hareketler</span>
                  <ol>
                    {emergency.firstActions.map((action, index) => <li key={action}>{index + 1}. {action}</li>)}
                  </ol>
                </section>
              </div>

              {groups.map((group) => (
                <section key={group.team} className="mt-4">
                  <h3 className="bs-section inline-flex items-center gap-2">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {group.team} · {group.rows.length} görev pozisyonu
                  </h3>
                  <div className="grid gap-3 lg:grid-cols-2">
                    {group.rows.map(({ assignment, duty }) => (
                      <article key={assignment.id} className="bs-topic-article break-inside-avoid">
                        <Link to={`/crew/${assignment.roleSlug}`} className="bs-entry px-0">
                          <strong className="bs-entry-label">{assignment.rank}</strong>
                          <span className="bs-leader" aria-hidden="true" />
                          <span className="bs-anchor" aria-hidden="true">↗</span>
                        </Link>
                        <p className="bs-topic-kicker">{assignment.billet}</p>

                        <dl className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                          <div>
                            <dt className="bs-callout-label inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> İlk istasyon</dt>
                            <dd>{assignment.initialStation}</dd>
                          </div>
                          <div>
                            <dt className="bs-callout-label inline-flex items-center gap-1"><ShieldAlert className="h-3 w-3" /> Operasyon yeri</dt>
                            <dd>{duty.station}</dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="bs-callout-label inline-flex items-center gap-1"><Radio className="h-3 w-3" /> Rapor verir</dt>
                            <dd>{duty.reportsTo}</dd>
                          </div>
                        </dl>

                        {assignment.roleNote && <p className="bs-callout text-[11px]">{assignment.roleNote}</p>}

                        <h4 className="bs-callout-label mt-3">Görev sırası</h4>
                        <ol className="bs-prose">
                          {duty.actions.map((action, index) => <li key={action}>{index + 1}. {action}</li>)}
                        </ol>

                        {duty.equipment && duty.equipment.length > 0 && (
                          <p className="mt-3 text-xs">
                            <strong>Atanmış donanım:</strong> {duty.equipment.join(" · ")}
                          </p>
                        )}
                        {assignment.substitute && <p className="mt-2 text-xs"><strong>Kritik görev yedeği:</strong> {assignment.substitute}</p>}
                        {assignment.readinessResponsibility && <p className="mt-1 text-xs"><strong>Hazır bulundurma:</strong> {assignment.readinessResponsibility}</p>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          );
        })}
      </div>

      <section className="bs-reading-section">
        <h2 className="bs-reading-heading">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          SOLAS / ISPS Talim Başlıkları
        </h2>
        <p className="bs-muted text-xs">Periyodik zorunlu adlandırmalar; “Genel Talim” bir SOLAS talim başlığı değildir.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {solasDrills.map((drill) => (
            <article key={drill.id} className="bs-topic-article">
              <p className="bs-topic-kicker">{drill.classification}{!drill.isStandalone ? " · ayrı talim değildir" : ""}</p>
              <h3>{drill.title}</h3>
              <p className="bs-muted text-xs">{drill.englishTitle}</p>
              <p className="mt-2 text-xs"><strong>Kapsam:</strong> {drill.applicability}</p>
              <p className="mt-1 text-xs"><strong>Periyot:</strong> {drill.frequency}</p>
              <p className="bs-note mt-2">{drill.reference}</p>
            </article>
          ))}
        </div>
        <p className="bs-muted mt-3 text-xs">{solasDrillScopeNote}</p>
      </section>

      <section className="bs-reading-section">
        <h2 className="bs-reading-heading">
          <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
          Gerçek gemi cetveli kontrolü
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {musterComplianceChecklist.map((item) => (
            <article key={item.title} className="bs-topic-article">
              <h3 className="inline-flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {item.title}
              </h3>
              <p className="text-xs">{item.detail}</p>
              <p className="bs-note mt-2">{item.reference}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bs-reading-resources text-xs">
        <h2 className="bs-section">Başlıca Dayanaklar</h2>
        <ul>{musterReferences.map((reference) => <li key={reference}>{reference}</li>)}</ul>
        <p className="bs-muted mt-3">
          Eğitim örneği; yayımlanmış gemi role cetveli, Fire Control Plan, LSA Plan, Damage Control Plan,
          SOPEP/SMPEP ve şirket SMS’i her zaman önceliklidir.
        </p>
      </footer>
    </BookSheet>
  );
}
