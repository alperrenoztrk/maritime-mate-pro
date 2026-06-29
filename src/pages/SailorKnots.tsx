import React from 'react';
import KnotMediaPlayer from '@/components/lessons/KnotMediaPlayer';
import { KNOT_TYING_ANIMATIONS } from '@/data/knotTyingAnimations';

export default function SailorKnotsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8" data-no-translate>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Gemici Bağları</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Temel denizci bağlarını adım adım inceleyin. Önceki/Sonraki butonları, çubuk veya ok
          tuşlarıyla kendi hızınızda ilerleyin — adımlar kendiliğinden geçmez.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KNOT_TYING_ANIMATIONS.map((knot) => (
            <KnotMediaPlayer key={knot.id} knotId={knot.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
