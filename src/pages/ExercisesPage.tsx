import { Link } from "react-router-dom";
import { getBetaCategories, type BetaCategory } from "@/data/betaLessons";
import { BookSheet } from "@/components/book/BookSheet";

/**
 * "Alıştırmalar" giriş sayfası — kitap yaprağı düzeninde.
 *
 * Orijinal "Dersler"e dokunmadan, tüm güverte ve makine kategorilerini listeler.
 * İçeriği olan kategoriler açılabilir; konu anlatımı henüz olmayanlar "yakında".
 */
export default function ExercisesPage() {
  const categories = getBetaCategories();
  const deck = categories.filter((c) => c.group === "deck");
  const machine = categories.filter((c) => c.group === "machine");

  const renderCategory = (category: BetaCategory) =>
    category.enabled ? (
      <Link key={category.key} to={`/exercises/${category.key}/topics`} className="bs-entry">
        <span className="bs-entry-label">{category.title}</span>
        <span className="bs-leader" aria-hidden="true" />
        <span className="bs-anchor" aria-hidden="true">⚓</span>
      </Link>
    ) : (
      <div key={category.key} className="bs-entry opacity-50">
        <span className="bs-entry-label">{category.title}</span>
        <span className="bs-leader" aria-hidden="true" />
        <span className="bs-note">yakında</span>
      </div>
    );

  return (
    <BookSheet title="ALIŞTIRMALAR">
      <p className="bs-muted mb-2 text-center text-[11px] italic">
        Beta — çözümlü alıştırmalar ve rehberli dersler
      </p>

      <div className="bs-chapter">GÜVERTE</div>
      <div className="bs-chapter-rule" />
      <div className="pb-2">{deck.map(renderCategory)}</div>

      <div className="bs-chapter">MAKİNE</div>
      <div className="bs-chapter-rule" />
      <div className="pb-2">{machine.map(renderCategory)}</div>
    </BookSheet>
  );
}
