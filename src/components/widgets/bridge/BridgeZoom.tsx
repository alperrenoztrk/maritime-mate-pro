import { useCallback, useEffect, useMemo, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BRIDGE_VIEW, SCENE_SCALE } from "./bridgeLayout";

/**
 * Köprüüstünde "baktığın yere yakınlaş".
 *
 * OrbitControls'ün kendi yakınlaştırması kamerayı hep **hedef noktaya** doğru
 * sürer; hedef sabit olduğu için (konsolun ortası) ekranın neresine dokunursan
 * dokun aynı yere yaklaşılıyordu — iskele konsolundaki GPS'e ya da camdan
 * görünen gemiye yaklaşmanın yolu yoktu.
 *
 * Burada yakınlaştırmayı biz alıyoruz (OrbitControls'te `enableZoom={false}`)
 * ve iki şeyi birden yürütüyoruz:
 *
 *   1. Mesafe — tekerlek/parmak hareketi kadar kısalır ya da uzar.
 *   2. Hedef  — parmağın altındaki noktaya (odak) doğru kayar.
 *
 * Hedefin odağa ne kadar yaklaşacağını mesafe belirliyor: tam açıkken hedef
 * yuvasında (konsolun ortası) durur, tam yakınken odağın ta kendisidir. Bunun
 * iki faydası var — geri açıldıkça görüntü kendiliğinden yuvasına döner (kaçak
 * birikmez) ve yakınken dönüş, bakılan cihazın çevresinde olur.
 *
 * Dinleyiciler tuvalin değil, **kapsayıcının** üstünde: widget'lar 3B'nin
 * üstüne `<Html>` ile DOM olarak biniyor (bkz. BridgeInstrumentMounts), tuvale
 * bağlansaydı tam da yakınlaşmak istenen yerde — cihazın üstünde — tekerlek ve
 * parmak olayları kaybolurdu.
 */

/**
 * Odağın kalabileceği kutu (metre) — kameranın odadan çıkmasını bu engelliyor.
 *
 * Kamera her zaman hedefin kıç tarafında, |mesafe| ≤ 4.2 m ve azimut ±0.5 rad
 * ile duruyor. Hedef = yuva + w·(odak − yuva), w = (1 − t)^0.7 ve
 * t = (mesafe − 0.85) / (4.2 − 0.85). Yani odak ne kadar yandaysa mesafe o
 * kadar kısadır. En kötü hâlde kamera:
 *
 *   |x| ≤ 1.9·w + 4.2·sin(0.5) ≈ 2.46 m  <  yan perde 2.78 m
 *    y  ≤ 2.15·w + 4.2·cos(1.32) ≈ 2.48 m <  tavan 2.62 m
 *    z  ≥ −2.9 + 0.85·cos(0.5) ≈ −2.15 m  >  ön perde −3.0 m
 *
 * kalıyor: sınırların hepsi kutunun kendisinden çıkıyor, ayrıca bir çarpışma
 * denetimi gerekmiyor. Kutu daraltılırsa bu üç satır yeniden hesaplanmalı.
 */
const FOCUS_MIN: [number, number, number] = [-1.9, 0.55, -2.9];
const FOCUS_MAX: [number, number, number] = [1.9, 2.15, 0.6];

/** Odak ışını: bu kadar yakındaki isabetler (kameranın burnu) sayılmaz... */
const FOCUS_NEAR_M = 0.5;
/** ...bu kadar uzaktakiler de. Camdan denize bakınca odak cam hizasında kalır. */
const FOCUS_FAR_M = 4;

/** Hedefin odağa kayma eğrisi; 1 doğrusal, küçüldükçe yakınlaşma erken toplanır. */
const FOCUS_CURVE = 0.7;

/** İmleç bu kadar kayarsa yeni bir yere bakılıyor demektir, odak yenilenir. */
const FOCUS_RENEW_PX = 24;

/** Yumuşatmanın hızı (1/s) — kare süresinden bağımsız üstel yaklaşma. */
const RESPONSE = 9;

/** Tekerlek: bir çentik (~100 px) ≈ %17 mesafe değişimi. */
const WHEEL_SENSITIVITY = 0.0016;

/** OrbitControls'ten kullandığımız yüzey — three-stdlib'e tip bağımlılığı yok. */
export interface BridgeOrbitControls {
  target: THREE.Vector3;
  enableRotate: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Mesafeden hedefin odağa kayma oranı: tam açıkken 0, tam yakınken 1. */
function focusWeight(distance: number) {
  const { minDistance, maxDistance } = BRIDGE_VIEW;
  const t = clamp((distance / SCENE_SCALE - minDistance) / (maxDistance - minDistance), 0, 1);
  return Math.pow(1 - t, FOCUS_CURVE);
}

interface BridgeZoomProps {
  controls: RefObject<BridgeOrbitControls>;
}

export function BridgeZoomToPointer({ controls }: BridgeZoomProps) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  /**
   * Olayların dinleneceği eleman.
   *
   * Tuval değil: `<Html>` widget'ları tuvalin kardeşi olan bir katmana
   * portallanıyor (drei, R3F'in olay elemanını kullanıyor — `events.connected`,
   * yani Canvas'ın dış sarmalayıcısı). Tuvale bağlansaydı cihazın üstündeki
   * tekerlek ve çimdik hiç görülmezdi; ikisini birden gören yer burası.
   */
  const eventTarget = useThree((state) => state.events.connected);

  /**
   * Kalıcı durum ve çalışma değişkenleri. Her karede/olayda yeni Vector3
   * ayırmamak için tek sefer kuruluyor — bu döngü mobilde 60 Hz çalışıyor.
   */
  const rig = useMemo(() => {
    const home = new THREE.Vector3(...BRIDGE_VIEW.home).multiplyScalar(SCENE_SCALE);
    return {
      ready: false,
      /** İstenen mesafe (sahne birimi); kare döngüsü buna yaklaşır. */
      distance: 0,
      /** Son bakılan nokta — hedef buna doğru kayar. */
      focus: home.clone(),
      home,
      min: BRIDGE_VIEW.minDistance * SCENE_SCALE,
      max: BRIDGE_VIEW.maxDistance * SCENE_SCALE,
      focusMin: new THREE.Vector3(...FOCUS_MIN).multiplyScalar(SCENE_SCALE),
      focusMax: new THREE.Vector3(...FOCUS_MAX).multiplyScalar(SCENE_SCALE),
      raycaster: new THREE.Raycaster(),
      ndc: new THREE.Vector2(),
      point: new THREE.Vector3(),
      desired: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    };
  }, []);

  /**
   * Ekrandaki noktanın altındaki dünya noktası.
   *
   * Işın sahneye atılıyor: konsola dokunulmuşsa odak konsolda, cama
   * dokunulmuşsa camda. Hiçbir şeye değmezse (ya da isabet çok uzaktaysa —
   * camdan görünen gemi 100 m ötede) ışının FOCUS_FAR_M'deki noktası alınıyor;
   * böylece odak yine parmağın yönünde kalır, sadece odanın içinde durur.
   */
  const focusAt = useCallback(
    (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;

      rig.ndc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -(((clientY - rect.top) / rect.height) * 2 - 1),
      );
      rig.raycaster.setFromCamera(rig.ndc, camera);
      rig.raycaster.near = FOCUS_NEAR_M * SCENE_SCALE;
      rig.raycaster.far = FOCUS_FAR_M * SCENE_SCALE;

      let distance = FOCUS_FAR_M * SCENE_SCALE;
      for (const hit of rig.raycaster.intersectObjects(scene.children, true)) {
        if (!hit.object.visible) continue;
        distance = hit.distance;
        break;
      }

      return rig.point
        .copy(rig.raycaster.ray.origin)
        .addScaledVector(rig.raycaster.ray.direction, distance)
        .clamp(rig.focusMin, rig.focusMax);
    },
    [camera, gl, rig, scene],
  );

  /**
   * Bir yakınlaştırma adımı: mesafeyi çarpanla değiştir, odağı oraya taşı.
   *
   * Odak her çentikte yeniden seçilmiyor (`renew`, hareketin başında true).
   * Hedef odağa doğru kaydıkça bakılan şey kadrajın ortasına yürür; imlecin
   * altında artık başka bir yüzey vardır. Her çentikte ışın yeniden atılsaydı
   * odak bu yeni yüzeye atlar, arka arkaya çevrilen tekerlek bakılan cihazı
   * bırakıp konsolun içine dalardı.
   */
  const zoomAt = useCallback(
    (factor: number, clientX: number, clientY: number, renew: boolean) => {
      if (!rig.ready) return;
      if (renew) {
        const focus = focusAt(clientX, clientY);
        if (focus) rig.focus.copy(focus);
      }
      rig.distance = clamp(rig.distance * factor, rig.min, rig.max);
    },
    [focusAt, rig],
  );

  useEffect(() => {
    const element =
      eventTarget instanceof HTMLElement ? eventTarget : (gl.domElement.parentElement ?? gl.domElement);

    /**
     * Odağın seçildiği ekran noktası ve "yenilenmeli" bayrağı.
     *
     * Yenileme yalnız iki şeye bağlı: imlecin kayması ve ekrana dokunulması
     * (sürükleme sahneyi çevirdiği için imlecin altındaki şey değişir).
     * Süreye bağlanmıyordu — tekerleği yavaş çeviren birinde her çentik yeni
     * bir odak seçer, hedef her seferinde kadrajı ortalar ve görüntü imlecin
     * gösterdiği yöne doğru durmadan kayardı.
     */
    let pickX = 0;
    let pickY = 0;
    let stale = true;

    const onWheel = (event: WheelEvent) => {
      // Sayfa kaymasın: widget ekranın yarısını kaplıyor, tekerlek burada
      // yakınlaştırmanın kendisi.
      event.preventDefault();
      const renew = stale || Math.hypot(event.clientX - pickX, event.clientY - pickY) > FOCUS_RENEW_PX;
      if (renew) {
        pickX = event.clientX;
        pickY = event.clientY;
        stale = false;
      }
      // deltaMode: 0 piksel, 1 satır, 2 sayfa.
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1);
      zoomAt(Math.exp(clamp(pixels, -240, 240) * WHEEL_SENSITIVITY), event.clientX, event.clientY, renew);
    };

    /** İki parmak arasındaki mesafe ve orta nokta — çimdik buradan çıkıyor. */
    const touches = new Map<number, { x: number; y: number }>();
    let pinchSpan = 0;
    /** Çimdiğin ilk hareketi odağı seçer; sonrakiler aynı noktaya yaklaşır. */
    let pinchStarted = false;

    const spanOf = () => {
      const [a, b] = [...touches.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const centerOf = () => {
      const [a, b] = [...touches.values()];
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };

    const onPointerDown = (event: PointerEvent) => {
      // Sürükleme sahneyi çevirir: imleç yerinde dursa bile altındaki şey
      // değişeceği için odak bayatlar.
      stale = true;
      if (event.pointerType === "mouse") return;
      touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (touches.size === 2) {
        pinchSpan = spanOf();
        pinchStarted = true;
        // İki parmak çimdikken sahne dönmesin: ilk parmak widget'ın DOM'unda
        // başladıysa OrbitControls olayı görmemiş, hâlâ "döndürüyorum"
        // sanıyor olabilir.
        const orbit = controls.current;
        if (orbit) orbit.enableRotate = false;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!touches.has(event.pointerId)) return;
      touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (touches.size !== 2) return;
      const span = spanOf();
      if (span < 1 || pinchSpan < 1) return;
      const center = centerOf();
      // Parmaklar açılıyorsa (span büyüyor) mesafe kısalır. Odak yalnız
      // çimdiğin ilk karesinde seçiliyor: parmakların arası açılırken orta
      // nokta kayar, her karede yeniden seçilse odak kayarak sürüklenirdi.
      zoomAt(clamp(pinchSpan / span, 0.5, 2), center.x, center.y, pinchStarted);
      if (pinchStarted) {
        pickX = center.x;
        pickY = center.y;
        stale = false;
      }
      pinchStarted = false;
      pinchSpan = span;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!touches.delete(event.pointerId)) return;
      // Dönüş, ekranda hiç parmak kalmayınca geri açılıyor: tek parmak
      // dururken açılsaydı OrbitControls'ün bayat başlangıç noktası yüzünden
      // sahne sıçrardı.
      if (touches.size === 0) {
        const orbit = controls.current;
        if (orbit) orbit.enableRotate = true;
      }
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerUp);

    return () => {
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointercancel", onPointerUp);
      // Kapatılan dönüşü burada geri açmıyoruz: bu bileşen sahneden yalnızca
      // OrbitControls'le birlikte kalkar, denetim de kendisiyle gider.
    };
  }, [controls, eventTarget, gl, zoomAt]);

  /**
   * Kamerayı istenen mesafeye ve hedefe yaklaştıran kare döngüsü.
   *
   * drei'nin OrbitControls'ü -1 önceliğiyle çalışıyor, yani burası her karede
   * `controls.update()`ten **sonra** geliyor. Denetim bir sonraki karede
   * konumu yeniden okuduğu (küresel koordinatı konum − hedeften çıkardığı)
   * için buradaki düzeltme kalıcı: dönüş, sönümleme ve açı sınırları
   * bozulmadan çalışmaya devam ediyor.
   */
  useFrame((_, delta) => {
    const orbit = controls.current;
    if (!orbit) return;

    if (!rig.ready) {
      rig.distance = clamp(camera.position.distanceTo(orbit.target), rig.min, rig.max);
      rig.focus.copy(orbit.target);
      rig.ready = true;
      return;
    }

    // Hedefe olan yön dönüşün sonucudur, ona dokunmuyoruz; değişen yalnız
    // yönün üstündeki uzunluk ve hedefin kendisi.
    rig.direction.copy(camera.position).sub(orbit.target);
    const current = rig.direction.length();
    if (current < 1e-4) return;
    rig.direction.divideScalar(current);

    const smooth = 1 - Math.exp(-Math.min(delta, 0.1) * RESPONSE);
    const distance = THREE.MathUtils.lerp(current, rig.distance, smooth);
    rig.desired.copy(rig.home).lerp(rig.focus, focusWeight(distance));

    orbit.target.lerp(rig.desired, smooth);
    camera.position.copy(orbit.target).addScaledVector(rig.direction, distance);
    camera.lookAt(orbit.target);
  });

  return null;
}

export default BridgeZoomToPointer;
