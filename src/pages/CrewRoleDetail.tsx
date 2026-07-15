import { Link, useParams } from "react-router-dom";
import { crewRoleMap } from "@/data/crewHierarchy";
import { crewRoleDetails, type CrewRoleDetail } from "@/data/crewRoleDetails";
import { ShieldCheck, Wrench } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<"tasks" | "equipment">("tasks");

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

      {/* Tab Toggle */}
      <div className="my-3 flex gap-2">
        <button
          onClick={() => setActiveTab("tasks")}
          className={activeTab === "tasks" ? "bs-btn flex-1" : "bs-btn--ghost flex-1"}
        >
          <ShieldCheck className="h-4 w-4" />
          İşler ({detail.tasks.length})
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          className={activeTab === "equipment" ? "bs-btn flex-1" : "bs-btn--ghost flex-1"}
        >
          <Wrench className="h-4 w-4" />
          Ekipmanlar ({detail.equipment.length})
        </button>
      </div>

      {/* Tasks Section */}
      {activeTab === "tasks" && (
        <section>
          <div className="bs-section">Sorumluluk Alanları ve İşler</div>
          <Accordion type="single" collapsible>
            {detail.tasks.map((task, i) => (
              <AccordionItem
                key={i}
                value={`task-${i}`}
                className="border-b border-dotted border-[rgba(120,80,20,.35)]"
              >
                <AccordionTrigger className="px-1 py-3 text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-baseline gap-2">
                    <span className="bs-muted shrink-0 font-bold">{i + 1}.</span>
                    <span style={{ color: "#3f2a0e" }}>{task.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="bs-prose pl-5">{task.description}</p>
                  <Link to={`/crew/${detail.slug}/task/${i}`} className="bs-btn--ghost ml-5 mt-3">
                    Detaylı Anlatımı Aç →
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Equipment Section */}
      {activeTab === "equipment" && (
        <section>
          <div className="bs-section">Ekipman ve Kontrol Listeleri</div>
          <Accordion type="single" collapsible>
            {detail.equipment.map((eq, i) => (
              <AccordionItem
                key={i}
                value={`eq-${i}`}
                className="border-b border-dotted border-[rgba(120,80,20,.35)]"
              >
                <AccordionTrigger className="px-1 py-3 text-left text-sm font-semibold hover:no-underline">
                  <span className="flex items-baseline gap-2">
                    <span className="bs-muted shrink-0 font-bold">{i + 1}.</span>
                    <span style={{ color: "#3f2a0e" }}>{eq.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="bs-prose ml-9 list-disc">
                    {eq.checkpoints.map((cp, j) => (
                      <li key={j}>{cp}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

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
