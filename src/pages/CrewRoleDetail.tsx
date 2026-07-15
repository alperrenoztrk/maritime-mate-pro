import { Link, useParams } from "react-router-dom";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails, type CrewRoleDetail } from "@/data/crewRoleDetails";
import { ShieldCheck, Wrench } from "lucide-react";
import { BookSheet } from "@/components/book/BookSheet";

export default function CrewRoleDetailPage() {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const role = roleSlug ? crewRoleMap[roleSlug] : undefined;
  const detail = roleSlug ? crewRoleDetails[roleSlug] : undefined;

  if (!role) {
    return (
      <BookSheet title="GEMİ PERSONELİ">
        <p className="bs-muted py-10 text-center text-sm italic">
          İstediğiniz personel kaydı bulunamadı. Lütfen listeden geçerli bir rol seçin.
        </p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="GEMİ PERSONELİ">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>{role.rank}</h1>
      <p className="bs-muted mb-1 text-center text-[11px] italic">Üstü: {role.reportsTo}</p>
      <div className="bs-fleuron" aria-hidden="true">❦</div>

      {detail ? <DetailedContent detail={detail} /> : <BasicContent role={role} />}
    </BookSheet>
  );
}

/* ─── Detailed Content (new rich format) ─── */
function DetailedContent({ detail }: { detail: CrewRoleDetail }) {
  return (
    <>
      <div className="bs-prose">
        <h2 className="bs-h2">Genel Bakış</h2>
        <p>{detail.intro}</p>
      </div>

      <div className="bs-callout mt-3">
        <span className="bs-callout-label">Çekirdek Tanım</span>
        {detail.coreSummary}
      </div>

      {/* Tasks Section */}
      <section className="bs-reading-section">
        <div className="bs-section inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Sorumluluk Alanları ve İşler
        </div>
        {detail.tasks.map((task, i) => (
          <article key={i} className="bs-topic-article">
            <h3>{i + 1}. {task.title}</h3>
            <p className="bs-prose">{task.description}</p>
            <Link to={`/crew/${detail.slug}/task/${i}`} className="bs-entry">
              <span className="bs-entry-label">Detaylı anlatım</span>
              <span className="bs-leader" aria-hidden="true" />
              <span className="bs-anchor" aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>

      {/* Equipment Section */}
      <section className="bs-reading-section">
        <div className="bs-section inline-flex items-center gap-2">
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Ekipman ve Kontrol Listeleri
        </div>
        {detail.equipment.map((eq, i) => (
          <article key={i} className="bs-topic-article">
            <h3>{i + 1}. {eq.title}</h3>
            <ul className="bs-prose ml-5 list-disc">
              {eq.checkpoints.map((cp, j) => <li key={j}>{cp}</li>)}
            </ul>
          </article>
        ))}
      </section>

      {/* Critical Notes */}
      {detail.criticalNotes && detail.criticalNotes.length > 0 && (
        <div className="bs-callout mt-3" style={{ borderLeftColor: "#8f1f1f" }}>
          <span className="bs-callout-label" style={{ color: "#8f1f1f" }}>Kritik Pratik Uyarılar</span>
          <ul className="ml-4 list-disc">
            {detail.criticalNotes.map((note, i) => (
              <li key={i} className="my-1 text-sm">{note}</li>
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
    <section className="bs-prose">
      <div className="bs-section">Her Durumda Temel Sorumluluklar</div>
      <ul className="ml-5 list-disc">
        {role.alwaysDuties.map((duty) => (
          <li key={duty}>{duty}</li>
        ))}
      </ul>
      <div className="bs-section">Genel Görevler</div>
      <ul className="ml-5 list-disc">
        {role.generalTasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </section>
  );
}
