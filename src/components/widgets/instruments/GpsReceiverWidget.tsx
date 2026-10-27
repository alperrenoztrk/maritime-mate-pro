import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function GpsReceiverWidget({
  label, latDMS, lonDMS, latDec, lonDec,
  sourceKind, sourceLabel, accuracyLabel, fixedAt, onEdit,
}: GpsReceiverWidgetProps) {
  return (
    <div className="iw-device iw-medium">
      <div className="iw-top">
        <span className="iw-plate">Position</span>
        <Button
          variant="ghost"
          size="icon"
          className="iw-position-action"
          aria-label="Enter location manually"
          title="Enter location manually"
          onClick={onEdit}
        >
          <Pencil aria-hidden="true" />
        </Button>
      </div>
      <div className="iw-position-body">
        <div className="iw-position-place">{label ?? "—"}</div>
        <div className="iw-position-coords notranslate" translate="no">
          <span>{latDMS}</span>
          <span>{lonDMS}</span>
        </div>
        <div className="iw-position-decimal notranslate" translate="no">
          {latDec || "—"} / {lonDec || "—"} · WGS84
        </div>
      </div>
      <dl className="iw-position-details">
        <div>
          <dt>Source</dt>
          <dd className={sourceKind === "ip" ? "iw-position-source--approximate" : "iw-position-source"}>
            {sourceLabel}
          </dd>
        </div>
        <div><dt>Accuracy</dt><dd className="notranslate" translate="no">{accuracyLabel}</dd></div>
        <div><dt>Fix time</dt><dd className="notranslate" translate="no">{fixedAt}</dd></div>
      </dl>
    </div>
  );
}