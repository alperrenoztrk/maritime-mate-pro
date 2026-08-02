import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Anchor,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ListChecks,
  ScrollText,
  ShieldAlert,
  Target,
  Wrench,
} from "lucide-react";
import { shipTypeMap, type DepartmentId } from "@/data/shipOperationsData";
import { LibraryPageShell } from "@/components/library/LibraryInterface";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const ship = shipType ? shipTypeMap[shipType] : undefined;
  const [activeDepartment, setActiveDepartment] = useState<DepartmentId>("guverte");
  const [expandedOperation, setExpandedOperation] = useState<number | null>(null);

  if (!ship) {
    return (
      <LibraryPageShell title="Gemi tipi bulunamadı" backHref="/ship-operations" />
    );
  }

  const currentDepartment = ship.departments.find(
    (department) => department.id === activeDepartment,
  );

  const changeDepartment = (department: DepartmentId) => {
    setActiveDepartment(department);
    setExpandedOperation(null);
  };

  return (
    <LibraryPageShell
      title={`${ship.label} Operasyonları`}
      icon={ClipboardList}
      backHref="/ship-operations"
      backLabel="Gemi operasyonları kitaplığına dön"
      maxWidth="max-w-5xl"
    >
      <section className="overflow-hidden rounded-3xl border border-white/20 bg-card/75 shadow-lg backdrop-blur">
        <div className="relative h-44 overflow-hidden sm:h-56">
          <img src={ship.image} alt={`${ship.label} gemisi`} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${ship.color} opacity-65 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <h2 className="absolute bottom-5 left-5 right-5 text-2xl font-bold text-white">
            {ship.label}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-1 border-t border-border/40 p-1.5">
          {ship.departments.map((department) => {
            const active = department.id === activeDepartment;
            const Icon = department.id === "guverte" ? Anchor : Wrench;
            return (
              <button
                key={department.id}
                type="button"
                onClick={() => changeDepartment(department.id)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {department.label}
              </button>
            );
          })}
        </div>
      </section>

      {currentDepartment && (
        <section className="space-y-3">
          {currentDepartment.operations.map((operation, index) => {
            const expanded = expandedOperation === index;
            return (
              <article
                key={`${activeDepartment}-${operation.title}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setExpandedOperation(expanded ? null : index)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-muted/40"
                  aria-expanded={expanded}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ship.color} text-sm font-bold text-white`}>
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold leading-snug text-foreground">
                    {operation.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                {expanded && (
                  <div className="space-y-5 border-t border-border/40 bg-background/35 p-4 sm:p-5">
                    <ContentSection icon={Target} title="Amaç">
                      <p className="text-sm leading-relaxed text-foreground/85">{operation.purpose}</p>
                    </ContentSection>

                    <ContentSection icon={ListChecks} title="Prosedür">
                      <ol className="space-y-2">
                        {operation.procedure.map((step, stepIndex) => (
                          <li key={`${stepIndex}-${step}`} className="flex items-start gap-3 text-sm text-foreground/85">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                              {stepIndex + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </ContentSection>

                    {operation.regulations && operation.regulations.length > 0 && (
                      <ContentSection icon={ScrollText} title="İlgili Mevzuat">
                        <div className="flex flex-wrap gap-2">
                          {operation.regulations.map((regulation) => (
                            <span key={regulation} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                              {regulation}
                            </span>
                          ))}
                        </div>
                      </ContentSection>
                    )}

                    {operation.safety && operation.safety.length > 0 && (
                      <ContentSection icon={ShieldAlert} title="Güvenlik ve Risk">
                        <ul className="space-y-2">
                          {operation.safety.map((item) => (
                            <li key={item} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-sm leading-relaxed text-foreground/85">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </ContentSection>
                    )}

                    {operation.records && operation.records.length > 0 && (
                      <ContentSection icon={ClipboardList} title="Kayıt ve Checklist">
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {operation.records.map((record) => (
                            <li key={record} className="rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 text-sm text-foreground/85">
                              {record}
                            </li>
                          ))}
                        </ul>
                      </ContentSection>
                    )}

                    <Link
                      to={`/ship-operations/${shipType}/${activeDepartment}/${index}`}
                      className="group flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                      Detaylı Anlatımı Aç
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}
    </LibraryPageShell>
  );
}

function ContentSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h3>
      {children}
    </section>
  );
}
