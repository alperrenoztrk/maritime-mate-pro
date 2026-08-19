import { Fragment, useCallback, useState } from "react";
import { type HomeWidgetId, useHomeWidgets } from "@/hooks/useHomeWidgets";
import { ManualLocationDialog } from "@/components/widgets/ManualLocationDialog";
import { InstrumentStyles } from "@/components/widgets/instruments/InstrumentStyles";
import { InstrumentDefs } from "@/components/widgets/instruments/InstrumentDefs";
import { useHomeWidgetNodes } from "@/components/widgets/homeWidgetNodes";

/**
 * Ana sayfanın widget sayfası: canlı enstrümanlar düz ızgarada gösterilir.
 * Hangi widget'ların açık olduğu ve sıraları Ayarlar → Ana Sayfa Widget'ları
 * tarafında saklanır (useHomeWidgets).
 */
export function HomeWidgetGrid() {
  const { enabled } = useHomeWidgets();
  const [manualOpen, setManualOpen] = useState(false);
  const { nodes } = useHomeWidgetNodes(useCallback(() => setManualOpen(true), []));

  return (
    <>
      <InstrumentStyles />
      <InstrumentDefs />

      <section aria-labelledby="home-widgets-title" className="space-y-3">
        <div className="px-1">
          <h2 id="home-widgets-title" className="text-xl font-semibold tracking-[-0.02em] text-foreground">
            Canlı Widget&rsquo;lar
          </h2>
        </div>
        <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-4">
          {enabled.map((id: HomeWidgetId) => (
            <Fragment key={id}>{nodes[id]}</Fragment>
          ))}
        </div>
      </section>

      <ManualLocationDialog open={manualOpen} onOpenChange={setManualOpen} />
    </>
  );
}
