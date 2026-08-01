import type { CSSProperties } from "react";
import type { ColumnAnchor, DialAnchor, EllipseAnchor, ScreenAnchor } from "./instrumentPhotos";

/**
 * Çapaları CSS'e çeviren yardımcılar.
 *
 * Yarıçap her zaman kutunun GENİŞLİĞİNE oranlıdır; dikeyde yüzde hesaplarken
 * `aspect` ile çarpmak gerekir, yoksa daire yamulur.
 */

function planeTransform(a: { tiltDeg?: number; yawDeg?: number; rollDeg?: number }): string | undefined {
  const parts: string[] = [];
  if (a.tiltDeg) parts.push(`rotateX(${a.tiltDeg}deg)`);
  if (a.yawDeg) parts.push(`rotateY(${a.yawDeg}deg)`);
  if (a.rollDeg) parts.push(`rotateZ(${a.rollDeg}deg)`);
  return parts.length ? `perspective(340px) ${parts.join(" ")}` : undefined;
}

/** Kadran diski — fotoğraftaki donmuş ibreleri örter, canlı ibrelere zemin olur. */
export function dialStyle(a: DialAnchor, aspect: number): CSSProperties {
  const radiusY = a.r * aspect;
  return {
    left: `${(a.cx - a.r) * 100}%`,
    top: `${(a.cy - radiusY) * 100}%`,
    width: `${a.r * 200}%`,
    aspectRatio: "1",
    transform: planeTransform(a),
  };
}

/** Eliptik bölgeye (lombar camı) hizalanan katman. */
export function ellipseStyle(a: EllipseAnchor): CSSProperties {
  return {
    left: `${(a.cx - a.rx) * 100}%`,
    top: `${(a.cy - a.ry) * 100}%`,
    width: `${a.rx * 200}%`,
    height: `${a.ry * 200}%`,
  };
}

/** LCD dikdörtgeni. */
export function screenStyle(s: ScreenAnchor): CSSProperties {
  return {
    left: `${s.x * 100}%`,
    top: `${s.y * 100}%`,
    width: `${s.w * 100}%`,
    height: `${s.h * 100}%`,
    transform: planeTransform(s),
  };
}

/**
 * Sıcaklığı fotoğrafta BASILI skalanın y konumuna çevirir. Eşleme, skaladan
 * doğrudan okunmuş iki referans noktasından lineer kurulur; böylece cıvanın ucu
 * gerçekten rakamı gösterir. Skala dışı değerler tüpün içinde tutulur.
 */
export function temperatureToY(c: ColumnAnchor, temperatureC: number): number {
  const ratio = (c.tempA - temperatureC) / (c.tempA - c.tempB);
  const y = c.yA + ratio * (c.yB - c.yA);
  return Math.min(c.yBase, Math.max(c.yTubeTop, y));
}

/** Cam tüp maskesi — fotoğrafın kılcalını örter. */
export function tubeStyle(c: ColumnAnchor): CSSProperties {
  return {
    left: `${(c.cx - c.w / 2) * 100}%`,
    width: `${c.w * 100}%`,
    top: `${c.yTubeTop * 100}%`,
    height: `${(c.yBase - c.yTubeTop) * 100}%`,
  };
}

/** Canlı cıva sütunu — tüpün tabanından başlar, okunan sıcaklıkta biter. */
export function mercuryStyle(c: ColumnAnchor, temperatureC: number): CSSProperties {
  const y = temperatureToY(c, temperatureC);
  const span = c.yBase - c.yTubeTop;
  return {
    top: `${((y - c.yTubeTop) / span) * 100}%`,
    height: `${((c.yBase - y) / span) * 100}%`,
  };
}
