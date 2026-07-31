import { ClipboardList, Ship } from "lucide-react";
import { shipTypes } from "@/data/shipOperationsData";
import { LibraryBookCard, LibraryPageShell } from "@/components/library/LibraryInterface";

export default function ShipOperationsPage() {
  return (
    <LibraryPageShell title="Gemi Operasyonları" icon={ClipboardList}>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shipTypes.map((ship) => (
          <LibraryBookCard
            key={ship.id}
            to={`/ship-operations/${ship.id}`}
            title={ship.label}
            icon={Ship}
            accent={ship.color}
            image={ship.image}
          />
        ))}
      </section>
    </LibraryPageShell>
  );
}
