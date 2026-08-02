import { useState, type CSSProperties, type ReactNode } from "react";
import type { InstrumentPhoto } from "./instrumentPhotos";

interface InstrumentFrameProps {
  photo: InstrumentPhoto;
  /** Pirinç plakadaki başlık. */
  label: ReactNode;
  /** Fotoğrafın üstüne binen canlı katman (kadran, LCD, cıva…). */
  children: ReactNode;
  /** Alt perdedeki okumalar — fotoğraf ne olursa olsun burada okunur kalır. */
  readout?: ReactNode;
  /** Plakanın sağındaki eylem (ör. konumu elle gir). */
  action?: ReactNode;
  size: "small" | "medium";
  /** GMT kronometresi aynı fotoğrafı soğutulmuş bir tonla kullanır. */
  photoFilter?: string;
}

/**
 * Fotoğrafı widget kutusuna kırpar ve üstüne canlı katmanı yerleştirir.
 *
 * Kırpma neden CSS'te: depoda görüntü işleme aracı yok (ImageMagick/PIL/sharp
 * hiçbiri kurulu değil), bu yüzden fotoğraflar Commons'tan geldikleri gibi
 * duruyor. `<img>` kutudan büyütülüp negatif konumla kaydırılıyor; sonuç
 * `object-position` tahminine göre deterministik, dolayısıyla overlay
 * koordinatları da sabit kalıyor.
 */
export function InstrumentFrame({
  photo,
  label,
  children,
  readout,
  action,
  size,
  photoFilter,
}: InstrumentFrameProps) {
  const [failed, setFailed] = useState(false);
  const { crop } = photo;

  const imgStyle: CSSProperties = {
    width: `${100 / crop.w}%`,
    height: `${100 / crop.h}%`,
    left: `${(-100 * crop.x) / crop.w}%`,
    top: `${(-100 * crop.y) / crop.h}%`,
    filter: photoFilter,
    // Maske stüdyo fonunu keser (bkz. SEIKO_CLOCK). İki katman verildiğinde
    // birleşimleri alınır: kasa dairesi + kulakların geçtiği bant.
    maskImage: photo.mask,
    WebkitMaskImage: photo.mask,
    maskComposite: photo.mask ? "add" : undefined,
    WebkitMaskComposite: photo.mask ? "source-over" : undefined,
  };

  return (
    <div
      className={
        "iw-device" +
        (size === "medium" ? " iw-medium" : " iw-small") +
        (failed ? " iw-device--fallback" : "")
      }
      style={{ aspectRatio: String(photo.aspect) }}
    >
      {failed ? null : (
        <img
          className="iw-photo"
          src={photo.src}
          alt={photo.alt}
          style={imgStyle}
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}

      {/* Altı ayrı fotoğrafı tek bir ışığa oturtan ortak vinyet/parlama. */}
      <div className="iw-grade" />

      {/* Canlı katman — fotoğrafın okuma yüzeyinin üstüne oturur. */}
      {children}

      <div className="iw-top">
        <div className="iw-plate">{label}</div>
        {action}
      </div>

      {readout ? <div className="iw-readout">{readout}</div> : null}
    </div>
  );
}
