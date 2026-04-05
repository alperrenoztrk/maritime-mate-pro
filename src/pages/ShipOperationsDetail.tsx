import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Anchor, Wrench, CheckCircle2 } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { BottomNavigation } from "@/components/BottomNavigation";
import { shipTypeMap } from "@/data/shipOperationsData";
import type { DepartmentId } from "@/data/shipOperationsData";
import { cn } from "@/lib/utils";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const [activeDept, setActiveDept] = useState<DepartmentId>('guverte');

  const ship = shipType ? shipTypeMap[shipType] : undefined;

  if (!ship) {
    return (
      <MobileLayout>
        <div className="relative min-h-screen bg-background px-4 pb-24 pt-6 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">Gemi tipi bulunamadı.</p>
          <Link
            to="/ship-operations"
            className="flex items-center gap-1.5 text-xs text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Geri dön
          </Link>
        </div>
        <BottomNavigation />
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
            <Link
              to="/ship-operations"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/30 bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-2xl">{ship.emoji}</span>
              <h1 className="text-lg font-bold tracking-tight text-foreground truncate">
                {ship.label} Operasyonları
              </h1>
            </div>
          </div>

          {/* Department tabs */}
          <div className="flex rounded-xl border border-border/30 bg-card/60 p-1 gap-1">
            {ship.departments.map((dept) => {
              const isActive = dept.id === activeDept;
              const Icon = dept.id === 'guverte' ? Anchor : Wrench;
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
                  <Icon className="h-3.5 w-3.5" strokeWidth={isActive ? 2.2 : 1.6} />
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
              <div className="rounded-xl border border-border/20 bg-card/60 overflow-hidden">
                {currentDept.operations.map((op, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3",
                      idx !== 0 && "border-t border-border/20"
                    )}
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary/60"
                      strokeWidth={1.6}
                    />
                    <span className="text-sm leading-snug text-foreground">{op}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileLayout>
  );
}
