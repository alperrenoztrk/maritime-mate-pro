import type { ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { HomeWidgetId } from "@/hooks/useHomeWidgets";
import { getFixtureLabelTexture } from "./bridgeTextures";
import { INSTRUMENT_MOUNTS, MOUNT_PX, htmlScaleFor, type InstrumentMount } from "./bridgeLayout";

/**
 * Widget'ları köprüüstündeki asıl yerlerine oturtan montaj katmanı.
 *
 * Widget'lar 3D'ye kopyalanmıyor: ana sayfadaki bileşenlerin ta kendisi
 * `<Html transform>` ile cihazın yüzeyine perspektif içinde yerleştiriliyor.
 * Böylece saat işlemeye, rüzgâr kadranı dönmeye, GPS'in "elle konum gir"
 * düğmesi çalışmaya devam ediyor — köprüüstü onları çerçeveliyor, taklit
 * etmiyor.
 *
 * Ölçek zinciri: widget sabit MOUNT_PX genişliğinde çizilir, grup
 * htmlScaleFor() ile metreye çevrilir (bkz. bridgeLayout → HTML_PX_PER_METER).
 * Böylece montaj genişliği layout dosyasında metre cinsinden okunur kalır.
 */

/** Cihazın etrafındaki koyu bezel — widget'ın arkasında görünen çerçeve. */
function Bezel({ mount }: { mount: InstrumentMount }) {
  const h = mount.width / mount.aspect;
  return (
    <>
      <mesh position={[0, 0, -0.012]} castShadow receiveShadow>
        <boxGeometry args={[mount.width + 0.045, h + 0.045, 0.03]} />
        <meshStandardMaterial color="#101315" roughness={0.55} metalness={0.3} />
      </mesh>
      {/* Montaj vidaları */}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([sx, sy], i) => (
        <mesh
          key={i}
          position={[(sx * (mount.width + 0.045)) / 2 - sx * 0.012, (sy * (h + 0.045)) / 2 - sy * 0.012, 0.004]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.0055, 0.0055, 0.006, 8]} />
          <meshStandardMaterial color="#6d747a" roughness={0.35} metalness={0.85} />
        </mesh>
      ))}
    </>
  );
}

/** Kapalı widget'ın yuvası: sökülmüş cihazın kör kapağı, üstünde künyesi. */
function EmptyFixture({ mount }: { mount: InstrumentMount }) {
  const h = mount.width / mount.aspect;
  return (
    <mesh position={[0, 0, 0.006]}>
      <planeGeometry args={[mount.width, h]} />
      <meshStandardMaterial map={getFixtureLabelTexture(mount.fixture)} roughness={0.85} metalness={0.1} />
    </mesh>
  );
}

interface BridgeInstrumentMountsProps {
  /** Her widget kimliği için ana sayfadaki bileşenin kendisi. */
  nodes: Partial<Record<HomeWidgetId, ReactNode>>;
  /** Ayarlarda açık olan widget'lar; kapalı olanların yuvası boş kalır. */
  enabled: HomeWidgetId[];
}

export function BridgeInstrumentMounts({ nodes, enabled }: BridgeInstrumentMountsProps) {
  return (
    <>
      {INSTRUMENT_MOUNTS.map((mount) => {
        const node = enabled.includes(mount.id) ? nodes[mount.id] : null;
        return (
          <group key={mount.id} position={mount.position} rotation={[0, mount.yaw, 0]}>
            <group rotation={[mount.tilt, 0, 0]}>
              <Bezel mount={mount} />
              {node ? (
                <Html
                  transform
                  scale={htmlScaleFor(mount.width, MOUNT_PX)}
                  position={[0, 0, 0.008]}
                  zIndexRange={[20, 0]}
                  // Sabit piksel genişliği: 3B'deki boyutu yukarıdaki scale
                  // belirler, DOM tarafı her montajda aynı çözünürlükte çizilir.
                  style={{ width: MOUNT_PX, pointerEvents: "auto" }}
                >
                  <div className="bridge-mount">
                    {node}
                    {/* Cam yansıması: DOM 3D'nin üstünde çizildiği için parlama
                        da DOM tarafında olmak zorunda. */}
                    <span className="bridge-mount-glare" aria-hidden="true" />
                  </div>
                </Html>
              ) : (
                <EmptyFixture mount={mount} />
              )}
            </group>
          </group>
        );
      })}
    </>
  );
}

/** Montaj yüzeyinin ortak CSS'i — sahne başına bir kez basılır. */
export function BridgeMountStyles() {
  return (
    <style>{`
      .bridge-mount{
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(0,0,0,.55);
        /* Cihazın üstünde de yakınlaştırılabilsin: bırakılsaydı iki parmak
           tarayıcının kendi sayfa yakınlaştırmasına gider, çimdik daha
           başlamadan olay akışı kesilirdi (bkz. BridgeZoom). */
        touch-action: none;
      }
      /* Köprüüstü camından gelen ışığın cihaz camındaki köşegen izi. */
      .bridge-mount-glare{
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(118deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.04) 24%, transparent 44%),
          radial-gradient(120% 90% at 78% 8%, rgba(214,235,255,.12) 0%, transparent 55%);
      }
    `}</style>
  );
}

export default BridgeInstrumentMounts;
