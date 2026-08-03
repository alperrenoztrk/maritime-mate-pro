import { Fragment, useCallback, useEffect, useState } from "react";
import { LayoutGrid, Ship } from "lucide-react";
import { type HomeWidgetId, useHomeWidgets } from "@/hooks/useHomeWidgets";
import { ManualLocationDialog } from "@/components/widgets/ManualLocationDialog";
import { InstrumentStyles } from "@/components/widgets/instruments/InstrumentStyles";
import { InstrumentDefs } from "@/components/widgets/instruments/InstrumentDefs";
import { InstrumentCredits } from "@/components/widgets/instruments/InstrumentCredits";
import { useHomeWidgetNodes } from "@/components/widgets/homeWidgetNodes";
import { BridgeWidgetView } from "@/components/widgets/BridgeWidgetView";

/**
 * Ana sayfanın widget sayfası. Aynı canlı enstrümanlar iki türlü gösterilir:
 *
 *   • Köprüüstü — cihazlar gemideki asıl yerlerinde (saat panosu, dümen
 *     konsolu, iskele/sancak konsolları, borda perdesi).
 *   • Izgara    — dar ekranlarda ve WebGL yoksa devreye giren düz liste.
 *
 * Hangi widget'ların açık olduğu ve sıraları Ayarlar → Ana Sayfa Widget'ları
 * tarafında saklanır (useHomeWidgets); iki görünüm de aynı listeyi okur.
 */

type WidgetView = "bridge" | "grid";

const VIEW_KEY = "marine-home-widget-view-v1";

function readView(): WidgetView {
  try {
    return localStorage.getItem(VIEW_KEY) === "grid" ? "grid" : "bridge";
  } catch {
    return "bridge";
  }
}

export function HomeWidgetGrid() {
  // Which widgets are shown, and in what order, comes from Ayarlar → Ana Sayfa Widget'ları.
  const { enabled } = useHomeWidgets();
  const [manualOpen, setManualOpen] = useState(false);
  const [view, setView] = useState<WidgetView>(readView);

  // Aynı hook hem widget bileşenlerini hem de köprüüstünün dışarısını besleyen
  // ham veriyi veriyor; ızgara görünümü ikincisini kullanmıyor.
  const { nodes, conditions } = useHomeWidgetNodes(useCallback(() => setManualOpen(true), []));

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_KEY, view);
    } catch {
      /* ignore */
    }
  }, [view]);

  // Widget'lar doğrudan ızgara çocuğu kalır: sütun genişliğini .iw-small /
  // .iw-medium sınıfları veriyor (bkz. InstrumentStyles).
  const grid = (
    <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-4">
      {enabled.map((id: HomeWidgetId) => (
        <Fragment key={id}>{nodes[id]}</Fragment>
      ))}
    </div>
  );

  return (
    <>
      <InstrumentStyles />
      <InstrumentDefs />

      <div className="mb-3 flex justify-center px-4">
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-xl">
          {([
            { id: "bridge" as const, label: "Köprüüstü", Icon: Ship },
            { id: "grid" as const, label: "Izgara", Icon: LayoutGrid },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-pressed={view === id}
              className={
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200 " +
                (view === id ? "bg-white text-slate-900 shadow" : "text-white/80 hover:bg-white/10")
              }
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "bridge" ? (
        <BridgeWidgetView nodes={nodes} enabled={enabled} conditions={conditions} fallback={grid} />
      ) : (
        <div className="px-4">{grid}</div>
      )}

      <InstrumentCredits />
      <ManualLocationDialog open={manualOpen} onOpenChange={setManualOpen} />
    </>
  );
}
