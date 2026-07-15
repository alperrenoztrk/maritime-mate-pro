import { Link } from "react-router-dom";
import { shipTypes } from "@/data/shipOperationsData";
import { BookSheet } from "@/components/book/BookSheet";

export default function ShipOperationsPage() {
  return (
    <BookSheet title="OPERASYONLAR">
      <p className="bs-muted mb-2 text-center text-[11px] italic">
        Gemi tipine göre güverte ve makine operasyonları
      </p>

      {shipTypes.map((ship) => (
        <Link key={ship.id} to={`/ship-operations/${ship.id}`} className="bs-entry items-center">
          <span className="bs-photo mr-2 block h-9 w-12 shrink-0 self-center overflow-hidden rounded-sm">
            <img
              src={ship.image}
              alt={`${ship.label} gemisi`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="bs-entry-label font-semibold">{ship.label}</span>
          <span className="bs-leader" aria-hidden="true" />
          <span className="bs-anchor" aria-hidden="true">⚓</span>
        </Link>
      ))}
    </BookSheet>
  );
}
