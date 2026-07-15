import { Pencil } from "lucide-react";

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

/** Bakalit gövdeli, yeşil fosfor LCD'li vintage SAT-NAV alıcısı. */
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
    <div className="vw-device vw-medium">
      <div className="vw-gps-top">
        <span className="vw-engraved notranslate" translate="no" style={{ fontSize: 10, fontWeight: 700 }}>
          SAT-NAV MK·I
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
          className="vw-btn"
          aria-label="Konumu manuel gir"
        >
          <Pencil className="h-3 w-3" />
        </button>
      </div>
      <div className="vw-lcd">
        <div className="vw-lcd-row">
          <span className="vw-lcd-label">{label ?? "—"}</span>
          <span className={sourceKind === "ip" ? "vw-lcd-amber" : undefined}>{sourceLabel}</span>
        </div>
        <div className="vw-lcd-row notranslate" translate="no">
          <span>{latDMS}</span>
          <span className="vw-lcd-dim">{latDec}</span>
        </div>
        <div className="vw-lcd-row notranslate" translate="no">
          <span>{lonDMS}</span>
          <span className="vw-lcd-dim">{lonDec}</span>
        </div>
        <div className="vw-lcd-row vw-lcd-dim notranslate" translate="no">
          <span>{accuracyLabel}</span>
          <span>FIX {fixedAt}</span>
        </div>
      </div>
    </div>
  );
}
