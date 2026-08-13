import { useSearchParams } from "react-router-dom";
import { Navigation, ShieldAlert, Users, Wrench } from "lucide-react";
import { crewHierarchy } from "@/data/crewHierarchy";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import {
  LibraryBookCard,
  LibraryEntryCard,
  LibraryPageShell,
} from "@/components/library/LibraryInterface";

const departmentMeta = [
  { icon: Navigation, accent: "accent-ocean" },
  { icon: Wrench, accent: "accent-slate" },
  { icon: Users, accent: "accent-teal" },
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
        backLabel="Back to the crew home screen"
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
      <InsetGroupedList columns={2}>
        <LibraryEntryCard
          title="Muster List"
          icon={ShieldAlert}
          accent="accent-amber"
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
              
              onClick={() => setSearchParams({ department: String(index) })}
            />
          );
        })}
      </InsetGroupedList>
    </LibraryPageShell>
  );
}
