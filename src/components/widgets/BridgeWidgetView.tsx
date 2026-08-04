import { Component, Suspense, lazy, type ReactNode } from "react";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import type { BridgeConditions, HomeWidgetNodes } from "@/components/widgets/homeWidgetNodes";
import { useVoyage } from "@/components/widgets/bridge/useVoyage";
import { useMarineConditions } from "@/components/widgets/bridge/useMarineConditions";
import { beaufortLabel, compassName, douglasLabel } from "@/components/widgets/bridge/marineConditions";
import type { MarineConditions } from "@/components/widgets/bridge/marineConditions";
import type { VoyageState } from "@/components/widgets/bridge/voyage";

/**
 * Köprüüstü görünümünün kapısı: 3B sahneyi ayrı bir parçaya ayırır ve
 * başlatılamazsa sessizce ızgaraya döner.
 *
 * three.js + drei ana sayfa paketine girmesin diye sahne tembel yükleniyor;
 * WebGL'i olmayan (ya da bağlamı kaybolan) cihazlarda hata sınırı devreye
 * girip aynı widget'ları düz ızgarada gösteriyor — hiçbir okuma kaybolmuyor.
 *
 * Seferin kendisi burada kuruluyor, sahnenin içinde değil: 3B başlatılamasa
 * bile gemi yoluna devam etsin, altındaki şerit nereden nereye gidildiğini ve
 * denizin hâlini yazsın diye. Kancalar da böylece tek yerde kalıyor.
 */

const BridgeScene3D = lazy(() => import("./bridge/BridgeScene3D"));

class BridgeErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.warn("Köprüüstü sahnesi başlatılamadı, ızgaraya dönülüyor:", error?.message);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function SceneLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-sky-300 border-t-transparent" />
        <p className="text-xs text-white/70">Köprüüstü hazırlanıyor…</p>
      </div>
    </div>
  );
}

/** Seferin ve denizin tek satırlık özeti — kadrajın altındaki şerit. */
function VoyageStrip({ voyage, marine }: { voyage: VoyageState | null; marine: MarineConditions | null }) {
  if (!voyage) {
    return (
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white/75 backdrop-blur-sm">
        Sürükle · yakınlaştır
      </p>
    );
  }

  const sea = marine
    ? `Deniz ${Math.round(marine.douglas)} ${douglasLabel(marine.douglas)} · ${marine.waveHeightM.toFixed(1)} m`
    : "Deniz —";
  const wind = marine
    ? `${compassName(marine.windFromDeg)} ${Math.round(marine.windKt)} kn ${beaufortLabel(marine.beaufort)}`
    : "Rüzgâr —";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-5">
      <div className="flex items-baseline justify-between gap-2 text-[11px] text-white/90">
        <span className="truncate font-semibold">
          {voyage.route.from.name} → {voyage.route.to.name}
        </span>
        <span className="shrink-0 tabular-nums text-white/75">
          {/* Limanda "0.0 kn · 0 NM" yazmak widget'ı bozuk gösteriyordu. */}
          {voyage.arrived
            ? "Limanda · kalkış hazırlığı"
            : `${voyage.sogKt.toFixed(1)} kn · ${voyage.toGoNm.toFixed(0)} NM`}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2 text-[10px] text-white/60">
        <span className="truncate">
          {sea} · {wind}
        </span>
        <span className="shrink-0">Sürükle · yakınlaştır</span>
      </div>
    </div>
  );
}

interface BridgeWidgetViewProps {
  nodes: HomeWidgetNodes;
  enabled: HomeWidgetId[];
  /** Camın dışını kuran canlı veri: güneş, rüzgâr, hava kodu. */
  conditions?: BridgeConditions;
  /** 3B başlatılamazsa gösterilecek düz ızgara. */
  fallback: ReactNode;
}

export function BridgeWidgetView({ nodes, enabled, conditions, fallback }: BridgeWidgetViewProps) {
  const voyage = useVoyage();
  const marine = useMarineConditions(voyage?.lat ?? null, voyage?.lon ?? null);

  return (
    <div className="px-4">
      <div className="relative h-[46svh] min-h-[280px] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-[0_18px_40px_rgba(0,0,0,.45)]">
        <BridgeErrorBoundary fallback={<div className="h-full overflow-y-auto p-3">{fallback}</div>}>
          <Suspense fallback={<SceneLoading />}>
            <BridgeScene3D
              nodes={nodes}
              enabled={enabled}
              conditions={conditions}
              voyage={voyage}
              marine={marine}
            />
          </Suspense>
        </BridgeErrorBoundary>

        <VoyageStrip voyage={voyage} marine={marine} />
      </div>
    </div>
  );
}

export default BridgeWidgetView;
