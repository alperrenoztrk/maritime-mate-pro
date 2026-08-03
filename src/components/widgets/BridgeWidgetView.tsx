import { Component, Suspense, lazy, type ReactNode } from "react";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import type { HomeWidgetNodes } from "@/components/widgets/homeWidgetNodes";

/**
 * Köprüüstü görünümünün kapısı: 3B sahneyi ayrı bir parçaya ayırır ve
 * başlatılamazsa sessizce ızgaraya döner.
 *
 * three.js + drei ana sayfa paketine girmesin diye sahne tembel yükleniyor;
 * WebGL'i olmayan (ya da bağlamı kaybolan) cihazlarda hata sınırı devreye
 * girip aynı widget'ları düz ızgarada gösteriyor — hiçbir okuma kaybolmuyor.
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

interface BridgeWidgetViewProps {
  nodes: HomeWidgetNodes;
  enabled: HomeWidgetId[];
  /** 3B başlatılamazsa gösterilecek düz ızgara. */
  fallback: ReactNode;
}

export function BridgeWidgetView({ nodes, enabled, fallback }: BridgeWidgetViewProps) {
  return (
    <div className="px-4">
      <div className="relative h-[46svh] min-h-[280px] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-[0_18px_40px_rgba(0,0,0,.45)]">
        <BridgeErrorBoundary fallback={<div className="h-full overflow-y-auto p-3">{fallback}</div>}>
          <Suspense fallback={<SceneLoading />}>
            <BridgeScene3D nodes={nodes} enabled={enabled} />
          </Suspense>
        </BridgeErrorBoundary>

        <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white/75 backdrop-blur-sm">
          Sürükle · yakınlaştır
        </p>
      </div>
    </div>
  );
}

export default BridgeWidgetView;
