import { useSearchParams } from "react-router-dom";
import { Navigation, ShieldAlert, Users, Wrench } from "lucide-react";
import { crewHierarchy } from "@/data/crewHierarchy";
import {
  LibraryBookCard,
  LibraryEntryCard,
  LibraryPageShell,
} from "@/components/library/LibraryInterface";

const departmentMeta = [
  { icon: Navigation, accent: "from-blue-500 via-indigo-500 to-blue-700" },
  { icon: Wrench, accent: "from-slate-600 via-zinc-700 to-slate-900" },
  { icon: Users, accent: "from-cyan-500 via-blue-600 to-indigo-700" },
];

export default function CrewHierarchyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const departmentParam = searchParams.get("department");
  const requestedDepartment = departmentParam === null ? Number.NaN : Number(departmentParam);
  const activeDepartment = Number.isInteger(requestedDepartment)
    ? crewHierarchy[requestedDepartment] ?? null
    : null;
  const activeIndex = activeDepartment ? requestedDepartment : -1;
  const activeMeta = activeDepartment
    ? departmentMeta[activeIndex] ?? departmentMeta[departmentMeta.length - 1]
    : null;

  if (activeDepartment && activeMeta) {
    return (
      <LibraryPageShell
        title={activeDepartment.department}
        icon={activeMeta.icon}
        onBack={() => setSearchParams({})}
        backLabel="Personel ana ekranına dön"
      >
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {activeDepartment.roles.map((role) => (
            <LibraryBookCard
              key={role.slug}
              to={`/crew/${role.slug}`}
              title={role.rank}
              accent={activeMeta.accent}
            />
          ))}
        </section>
      </LibraryPageShell>
    );
  }

  return (
    <LibraryPageShell title="Gemi Personeli" icon={Users}>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LibraryEntryCard
          title="Muster List"
          icon={ShieldAlert}
          accent="from-rose-500 via-red-600 to-red-800"
          to="/crew/muster-list"
        />
        {crewHierarchy.map((group, index) => {
          const meta = departmentMeta[index] ?? departmentMeta[departmentMeta.length - 1];
          return (
            <LibraryEntryCard
              key={group.department}
              title={group.department}
              icon={meta.icon}
              accent={meta.accent}
              badge={group.roles.length}
              onClick={() => setSearchParams({ department: String(index) })}
            />
          );
        })}
      </section>
    </LibraryPageShell>
  );
}
