import { useState } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId } from "@/data/shipOperationsData";
import { cn } from "@/lib/utils";
import { BookSheet } from "@/components/book/BookSheet";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const [activeDept, setActiveDept] = useState<DepartmentId>("guverte");

  const ship = shipType ? shipTypeMap[shipType] : undefined;

  if (!ship) {
    return (
      <BookSheet title="OPERASYONLAR">
        <p className="bs-muted py-10 text-center text-sm italic">Gemi tipi bulunamadı.</p>
      </BookSheet>
    );
  }

  const currentDept = ship.departments.find((d) => d.id === activeDept);

  return (
    <BookSheet title="OPERASYONLAR">
      <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bs-photo relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
                <img
                  src={ship.image}
                  alt={`${ship.label} gemisi`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="bs-h2 truncate" style={{ margin: 0 }}>
                {ship.label} Operasyonları
              </h1>
            </div>
          </div>

          {/* Department tabs */}
          <div className="flex gap-2">
            {ship.departments.map((dept) => {
              const isActive = dept.id === activeDept;
              const Icon = dept.id === "guverte" ? Anchor : Wrench;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={cn("flex-1", isActive ? "bs-btn" : "bs-btn--ghost")}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    strokeWidth={isActive ? 2.2 : 1.6}
                  />
                  {dept.label}
                </button>
              );
            })}
          </div>

          {/* Operations list */}
          {currentDept && (
            <div className="flex flex-col gap-2">
              <p className="bs-muted text-[11px] italic">
                {currentDept.operations.length} operasyon
              </p>
              <Accordion type="multiple">
                {currentDept.operations.map((op, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`op-${idx}`}
                    className="border-b border-dotted border-[rgba(120,80,20,.35)] px-1"
                  >
                    <AccordionTrigger className="py-3 text-left text-sm font-semibold leading-snug hover:no-underline gap-3" style={{ color: "#3f2a0e" }}>
                      <span className="flex-1">{op.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="bs-prose flex flex-col gap-4 pt-1 text-xs leading-relaxed">
                        <Section
                          icon={<Target className="h-3.5 w-3.5" />}
                          label="Amaç"
                        >
                          <p>{op.purpose}</p>
                        </Section>

                        <Section
                          icon={<ListChecks className="h-3.5 w-3.5" />}
                          label="Prosedür"
                        >
                          <ol className="list-decimal space-y-1.5 pl-4">
                            {op.procedure.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </Section>

                        {op.regulations && op.regulations.length > 0 && (
                          <Section
                            icon={<ScrollText className="h-3.5 w-3.5" />}
                            label="İlgili Mevzuat"
                          >
                            <div className="flex flex-wrap gap-1.5">
                              {op.regulations.map((reg, i) => (
                                <span key={i} className="bs-chip">{reg}</span>
                              ))}
                            </div>
                          </Section>
                        )}

                        {op.safety && op.safety.length > 0 && (
                          <Section
                            icon={
                              <ShieldAlert className="h-3.5 w-3.5 text-[#8f1f1f]" />
                            }
                            label="Güvenlik & Risk"
                          >
                            <ul className="space-y-1 pl-3.5">
                              {op.safety.map((s, i) => (
                                <li
                                  key={i}
                                  className="relative before:absolute before:-left-3 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-[#8f1f1f]"
                                >
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </Section>
                        )}

                        {op.records && op.records.length > 0 && (
                          <Section
                            icon={<ClipboardList className="h-3.5 w-3.5" />}
                            label="Kayıt / Checklist"
                          >
                            <ul className="space-y-1 pl-3.5">
                              {op.records.map((r, i) => (
                                <li
                                  key={i}
                                  className="relative before:absolute before:-left-3 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-[rgba(120,80,20,.6)]"
                                >
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </Section>
                        )}

                        <Link
                          to={`/ship-operations/${shipType}/${activeDept}/${idx}`}
                          className="bs-btn--ghost mt-1 self-start"
                        >
                          Detaylı Anlatımı Aç →
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
      </div>
    </BookSheet>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
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
