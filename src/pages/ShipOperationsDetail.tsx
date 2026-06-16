import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Anchor,
  Wrench,
  Target,
  ListChecks,
  ScrollText,
  ShieldAlert,
  ClipboardList,
} from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId } from "@/data/shipOperationsData";
import { cn } from "@/lib/utils";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const [activeDept, setActiveDept] = useState<DepartmentId>("guverte");

  const ship = shipType ? shipTypeMap[shipType] : undefined;

  if (!ship) {
    return (
      <MobileLayout>
        <div className="relative min-h-screen bg-background px-4 pb-24 pt-6 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">Gemi tipi bulunamadı.</p>
        </div>
      </MobileLayout>
    );
  }

  const currentDept = ship.departments.find((d) => d.id === activeDept);

  return (
    <MobileLayout>
      <div className="relative min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/30">
                <img
                  src={ship.image}
                  alt={`${ship.label} gemisi`}
                  className="h-full w-full object-cover"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br mix-blend-overlay",
                    ship.color
                  )}
                />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-foreground truncate">
                {ship.label} Operasyonları
              </h1>
            </div>
          </div>

          {/* Department tabs */}
          <div className="flex rounded-xl border border-border/30 bg-card/60 p-1 gap-1">
            {ship.departments.map((dept) => {
              const isActive = dept.id === activeDept;
              const Icon = dept.id === "guverte" ? Anchor : Wrench;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
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
              <p className="text-[11px] text-muted-foreground">
                {currentDept.operations.length} operasyon
              </p>
              <Accordion
                type="multiple"
                className="rounded-xl border border-border/20 bg-card/60 overflow-hidden divide-y divide-border/20"
              >
                {currentDept.operations.map((op, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`op-${idx}`}
                    className="border-0 px-4"
                  >
                    <AccordionTrigger className="py-3 text-left text-sm leading-snug text-foreground hover:no-underline gap-3">
                      <span className="flex-1">{op.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="flex flex-col gap-4 pt-1 text-xs leading-relaxed text-muted-foreground">
                        <Section
                          icon={<Target className="h-3.5 w-3.5" />}
                          label="Amaç"
                        >
                          <p className="text-foreground/90">{op.purpose}</p>
                        </Section>

                        <Section
                          icon={<ListChecks className="h-3.5 w-3.5" />}
                          label="Prosedür"
                        >
                          <ol className="list-decimal space-y-1.5 pl-4 marker:text-primary/60">
                            {op.procedure.map((step, i) => (
                              <li key={i} className="text-foreground/85">
                                {step}
                              </li>
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
                                <span
                                  key={i}
                                  className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] text-primary/90"
                                >
                                  {reg}
                                </span>
                              ))}
                            </div>
                          </Section>
                        )}

                        {op.safety && op.safety.length > 0 && (
                          <Section
                            icon={
                              <ShieldAlert className="h-3.5 w-3.5 text-destructive/80" />
                            }
                            label="Güvenlik & Risk"
                          >
                            <ul className="space-y-1 pl-3.5">
                              {op.safety.map((s, i) => (
                                <li
                                  key={i}
                                  className="relative text-foreground/85 before:absolute before:-left-3 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-destructive/60"
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
                                  className="relative text-foreground/85 before:absolute before:-left-3 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-primary/60"
                                >
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </Section>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
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
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
        <span className="text-primary/70">{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}
