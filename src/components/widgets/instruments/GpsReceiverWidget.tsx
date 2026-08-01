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
 * Gerçek bir Furuno GP-80 alıcısının fotoğrafı; cihazın LCD'si canlı pozisyonla
 * yeniden yazılır. Fotoğraftaki ekran 2011 tarihli sabit bir fix gösterdiği
 * için ekran alanı tamamen örtülür.
 *
 * Satır düzeni gerçek alıcıların sayfa düzenini izler: solda alan adı, sağda
 * değer, altta ayırıcı ve durum satırı. Ondalık dereceler kendi satırında —
 * DMS ile yan yana yazılınca ekrandan taşıyordu.
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
      label={<span className="notranslate" translate="no">SAT-NAV GP·80</span>}
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
      <div className="iw-screen" style={screenStyle(GPS_SCREEN)}>
        <div className="iw-lcd-row notranslate" translate="no">
          <span className="iw-lcd-key">LAT</span>
          <span>{latDMS}</span>
        </div>
        <div className="iw-lcd-row notranslate" translate="no">
          <span className="iw-lcd-key">LON</span>
          <span>{lonDMS}</span>
        </div>
        <div className="iw-lcd-row iw-lcd-dim notranslate" translate="no">
          <span>{latDec}</span>
          <span>{lonDec}</span>
        </div>
        <div className="iw-lcd-rule" />
        <div className="iw-lcd-row iw-lcd-dim notranslate" translate="no">
          <span>{accuracyLabel}</span>
          <span>FIX {fixedAt}</span>
        </div>
        <div className="iw-lcd-row notranslate" translate="no">
          <span className="iw-lcd-label">{label ?? "—"}</span>
          <span className={sourceKind === "ip" ? "iw-lcd-amber" : undefined}>{sourceLabel}</span>
        </div>
      </div>
    </InstrumentFrame>
  );
}
