import { useParams, Link } from "react-router-dom";
import {
  Anchor,
  Wrench,
  Target,
  ListChecks,
  ScrollText,
  ShieldAlert,
  ClipboardList,
} from "lucide-react";
import { shipTypeMap } from "@/data/shipOperationsData";
import { BookSheet } from "@/components/book/BookSheet";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const ship = shipType ? shipTypeMap[shipType] : undefined;

  if (!ship) {
    return (
      <BookSheet title="OPERASYONLAR">
        <p className="bs-muted py-10 text-center text-sm italic">Gemi tipi bulunamadı.</p>
      </BookSheet>
    );
  }

  return (
    <BookSheet title="OPERASYONLAR">
      <div className="flex flex-col gap-5">
        <header className="flex items-center gap-3">
          <div className="bs-photo relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
            <img src={ship.image} alt={`${ship.label} gemisi`} className="h-full w-full object-cover" />
          </div>
          <h1 className="bs-h2" style={{ margin: 0 }}>{ship.label} Operasyonları</h1>
        </header>

        {ship.departments.map((department) => {
          const DepartmentIcon = department.id === "guverte" ? Anchor : Wrench;
          return (
            <section key={department.id} className="bs-reading-section">
              <header className="bs-reading-heading">
                <DepartmentIcon className="h-4 w-4" aria-hidden="true" />
                <h2>{department.label}</h2>
                <span className="bs-note">{department.operations.length} operasyon</span>
              </header>

              {department.operations.map((operation, index) => (
                <article key={index} className="bs-topic-article">
                  <h3>{index + 1}. {operation.title}</h3>
                  <div className="bs-prose flex flex-col gap-4 pt-1 text-xs leading-relaxed">
                    <Section icon={<Target className="h-3.5 w-3.5" />} label="Amaç">
                      <p>{operation.purpose}</p>
                    </Section>

                    <Section icon={<ListChecks className="h-3.5 w-3.5" />} label="Prosedür">
                      <ol className="list-decimal space-y-1.5 pl-4">
                        {operation.procedure.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}
                      </ol>
                    </Section>

                    {operation.regulations && operation.regulations.length > 0 && (
                      <Section icon={<ScrollText className="h-3.5 w-3.5" />} label="İlgili Mevzuat">
                        <p>{operation.regulations.join(" · ")}</p>
                      </Section>
                    )}

                    {operation.safety && operation.safety.length > 0 && (
                      <Section icon={<ShieldAlert className="h-3.5 w-3.5" />} label="Güvenlik ve Risk">
                        <ul>{operation.safety.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>
                      </Section>
                    )}

                    {operation.records && operation.records.length > 0 && (
                      <Section icon={<ClipboardList className="h-3.5 w-3.5" />} label="Kayıt ve Checklist">
                        <ul>{operation.records.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>
                      </Section>
                    )}

                    <Link to={`/ship-operations/${shipType}/${department.id}/${index}`} className="bs-entry">
                      <span className="bs-entry-label">Detaylı anlatım</span>
                      <span className="bs-leader" aria-hidden="true" />
                      <span className="bs-anchor" aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          );
        })}
      </div>
    </BookSheet>
  );
}

function Section({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-[rgba(90,61,20,.75)]">
        <span className="text-[#7a5c1a]">{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}
