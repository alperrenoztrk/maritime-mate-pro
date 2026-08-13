import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Anchor, ChevronRight, ClipboardList, Wrench } from "lucide-react";
import { shipTypeMap, type DepartmentId } from "@/data/shipOperationsData";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { accentGradient } from "@/components/library/libraryAccent";

export default function ShipOperationsDetail() {
  const { shipType } = useParams<{ shipType: string }>();
  const ship = shipType ? shipTypeMap[shipType] : undefined;
  const [activeDepartment, setActiveDepartment] = useState<DepartmentId>("guverte");

  if (!ship) {
    return (
      <LibraryPageShell title="Gemi tipi bulunamadı" backHref="/ship-operations"><p className="text-muted-foreground">Aradığınız gemi tipi bulunamadı.</p></LibraryPageShell>
    );
  }

  const currentDepartment = ship.departments.find(
    (department) => department.id === activeDepartment,
  );

  return (
    <LibraryPageShell
      title={`${ship.label} Operations`}
      icon={ClipboardList}
      backHref="/ship-operations"
      backLabel="Back to the ship operations library"
      maxWidth="max-w-5xl"
    >
      <section className="overflow-hidden rounded-3xl border border-white/20 bg-card/75 shadow-lg">
        <div className="grid grid-cols-2 gap-1 p-1.5">
          {ship.departments.map((department) => {
            const active = department.id === activeDepartment;
            const Icon = department.id === "guverte" ? Anchor : Wrench;
            return (
              <button
                key={department.id}
                type="button"
                onClick={() => setActiveDepartment(department.id)}
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
          {/* Liste yalnız başlık taşır: amaç, prosedür, mevzuat, risk ve kayıt
              başlıkları operasyonun detaylı anlatımındaki "Summary" bölümünde
              tek kaynaktan okunur. */}
          {currentDepartment.operations.map((operation, index) => (
            <Link
              key={`${activeDepartment}-${operation.title}`}
              to={`/ship-operations/${shipType}/${activeDepartment}/${index}`}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm transition hover:bg-muted/40"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ship.color} text-sm font-bold text-white`}
                style={accentGradient("145deg")}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 font-semibold leading-snug text-foreground">
                {operation.title}
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </section>
      )}
    </LibraryPageShell>
  );
}
