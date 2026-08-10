import { Pencil } from "lucide-react";
import { InstrumentFrame } from "./InstrumentFrame";
import { GPS, GPS_SCREEN } from "./instrumentPhotos";
import { screenStyle } from "./overlayGeometry";

interface GpsReceiverWidgetProps {
  label: string | null;
  latDMS: string;
  lonDMS: string;
  latDec: string;
  lonDec: string;
  sourceKind: "gps" | "ip" | "manual" | "unknown";
  sourceLabel: string;
  accuracyLabel: string;
  fixedAt: string;
  onEdit: () => void;
}

/**
 * Gerçek bir SGN-500 alıcısının fotoğrafı; cihazın renkli LCD'si canlı
 * pozisyonla yeniden yazılır. Fotoğraftaki ekran 2011 tarihli sabit bir fix
 * gösterdiği için ekran alanı tamamen örtülür.
 *
 * Sayfa düzeni cihazın kendi düzenini izler: üstte sarı başlık şeridi, altında
 * üç küçük alan (mod / doğruluk / fix saati), ortada iki satır büyük mevki,
 * altta yine üç alan. Cihazda COG/SOG olan yerde bizde ondalık derece var —
 * uygulamanın elinde hız/rota verisi yok.
 */
export function GpsReceiverWidget({
  label,
  latDMS,
  lonDMS,
  latDec,
  lonDec,
  sourceKind,
  sourceLabel,
  accuracyLabel,
  fixedAt,
  onEdit,
}: GpsReceiverWidgetProps) {
  return (
    <InstrumentFrame
      photo={GPS}
      size="medium"
      action={
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
          className="iw-btn"
          aria-label="Konumu manuel gir"
        >
          <Pencil className="h-3 w-3" />
        </button>
      }
    >
      <div className="iw-screen notranslate" style={screenStyle(GPS_SCREEN)} translate="no">
        <div className="iw-lcd-bar">
          <span>GNSS</span>
          <span className="iw-lcd-place">{label ?? "—"}</span>
        </div>

        <div className="iw-lcd-cells">
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">MOD</span>
            <span className={"iw-lcd-val" + (sourceKind === "ip" ? " iw-lcd-warn" : "")}>{sourceLabel}</span>
          </div>
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">SAPMA</span>
            <span className="iw-lcd-val">{accuracyLabel}</span>
          </div>
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">FIX</span>
            <span className="iw-lcd-val">{fixedAt}</span>
          </div>
        </div>

        <div className="iw-lcd-fix">
          <span className="iw-lcd-coord">{latDMS}</span>
          <span className="iw-lcd-coord">{lonDMS}</span>
        </div>

        <div className="iw-lcd-cells">
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">ENLEM</span>
            <span className="iw-lcd-val iw-lcd-small">{latDec || "—"}</span>
          </div>
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">BOYLAM</span>
            <span className="iw-lcd-val iw-lcd-small">{lonDec || "—"}</span>
          </div>
          <div className="iw-lcd-cell">
            <span className="iw-lcd-key">DATUM</span>
            <span className="iw-lcd-val iw-lcd-small">WGS84</span>
          </div>
        </div>
      </div>
    </InstrumentFrame>
  );
}
