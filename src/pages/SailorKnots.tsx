import { Anchor } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import KnotCard from '@/components/lessons/KnotCard';
import {
  KNOT_TYING_ANIMATIONS,
  KNOT_CATEGORY_ORDER,
  KNOT_CATEGORY_LABELS,
  type KnotCategory,
} from '@/data/knotTyingAnimations';

export default function SailorKnotsPage() {
  // Group the knots by category, preserving the curated order in the data file.
  const grouped = KNOT_CATEGORY_ORDER.map((category) => ({
    category: category as KnotCategory,
    knots: KNOT_TYING_ANIMATIONS.filter((k) => k.category === category),
  })).filter((g) => g.knots.length > 0);

  return (
    <div className="min-h-screen p-4 md:p-8" data-no-translate>
      <div className="max-w-4xl mx-auto">
        <div className="mb-2 flex items-center gap-2">
          <Anchor className="h-7 w-7 text-amber-500" />
          <h1 className="text-3xl md:text-4xl font-bold">Gemici Bağları</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Temel denizci bağları kategorilere ayrılmıştır. Bir bağı incelemek için başlığına dokunarak
          açın — fotoğraflı aşamalar ve adım adım açıklamalar görünür. Bağlar varsayılan olarak kapalıdır.
        </p>

        <div className="space-y-6">
          {grouped.map(({ category, knots }) => {
            const label = KNOT_CATEGORY_LABELS[category];
            return (
              <section
                key={category}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border/40 bg-muted/30">
                  <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{label.subtitle}</p>
                </div>

                <Accordion type="multiple" className="px-1">
                  {knots.map((knot) => (
                    <KnotCard key={knot.id} knotId={knot.id} />
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
