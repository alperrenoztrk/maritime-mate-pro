import { Link } from "react-router-dom";
import { crewHierarchy } from "@/data/crewHierarchy";
import { BookSheet } from "@/components/book/BookSheet";

export default function CrewHierarchyPage() {
  return (
    <BookSheet title="GEMİ PERSONELİ">
      <Link to="/crew/muster-list" className="bs-entry">
        <span className="bs-entry-label">Role Cetveli / Muster List</span>
        <span className="bs-leader" aria-hidden="true" />
        <span className="bs-anchor" aria-hidden="true">⚓</span>
      </Link>

      {crewHierarchy.map((group) => (
        <section key={group.department}>
          <div className="bs-section">{group.department}</div>
          {group.roles.map((role) => (
            <Link key={role.slug} to={`/crew/${role.slug}`} className="bs-entry">
              <span className="bs-entry-label">{role.rank}</span>
              <span className="bs-leader" aria-hidden="true" />
              <span className="bs-anchor" aria-hidden="true">⚓</span>
            </Link>
          ))}
        </section>
      ))}
    </BookSheet>
  );
}
