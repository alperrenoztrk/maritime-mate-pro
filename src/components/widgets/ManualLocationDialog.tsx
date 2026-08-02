import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/contexts/useSelectedLocation";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Accepts: 41.0082 / 41,0082 / 41 0 29.5 N / 41°0'29.5" / -28.9784 / 28 58 42 W etc.
function parseCoordinate(raw: string, isLat: boolean): number | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(",", ".");

  // Simple decimal
  const dec = Number(trimmed);
  if (Number.isFinite(dec)) return dec;

  // DMS regex: degrees, minutes (opt), seconds (opt), hemisphere (opt)
  const m = trimmed.match(
    /^\s*(-?)(\d+(?:\.\d+)?)[°\s]*(?:(\d+(?:\.\d+)?)[′'\s]*)?(?:(\d+(?:\.\d+)?)[″"\s]*)?\s*([NSEWKGDBnsewkgdb])?\s*$/,
  );
  if (!m) return null;
  const sign = m[1] === "-" ? -1 : 1;
  const d = Number(m[2] ?? 0);
  const min = Number(m[3] ?? 0);
  const sec = Number(m[4] ?? 0);
  let value = d + min / 60 + sec / 3600;
  value *= sign;

  const hemi = (m[5] || "").toUpperCase();
  if (hemi) {
    if (isLat) {
      if (hemi === "S" || hemi === "G") value = -Math.abs(value);
      else if (hemi === "N" || hemi === "K") value = Math.abs(value);
    } else {
      if (hemi === "W" || hemi === "B") value = -Math.abs(value);
      else if (hemi === "E" || hemi === "D") value = Math.abs(value);
    }
  }
  return value;
}

export function ManualLocationDialog({ open, onOpenChange }: Props) {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (open) {
      setLat(selectedLocation?.latitude?.toString() ?? "");
      setLon(selectedLocation?.longitude?.toString() ?? "");
      setLabel(selectedLocation?.locationLabel ?? "");
    }
  }, [open, selectedLocation]);

  const handleSave = () => {
    const latNum = parseCoordinate(lat, true);
    const lonNum = parseCoordinate(lon, false);

    if (latNum == null || !Number.isFinite(latNum) || latNum < -90 || latNum > 90) {
      toast.error("Geçersiz enlem değeri (-90 ile 90 arası olmalı)");
      return;
    }
    if (lonNum == null || !Number.isFinite(lonNum) || lonNum < -180 || lonNum > 180) {
      toast.error("Geçersiz boylam değeri (-180 ile 180 arası olmalı)");
      return;
    }

    setSelectedLocation({
      latitude: latNum,
      longitude: lonNum,
      locationLabel: label.trim() || `${latNum.toFixed(4)}, ${lonNum.toFixed(4)}`,
    });
    toast.success("Konum kaydedildi");
    onOpenChange(false);
  };

  const handleClear = () => {
    setSelectedLocation(null);
    toast.success("Manuel konum temizlendi — GPS / IP kullanılacak");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manuel Konum Gir</DialogTitle>
          <DialogDescription>
            Ondalık (41.0082) veya DMS (41° 0′ 29.5″ K) formatında girebilirsin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="manual-lat">Enlem (Latitude)</Label>
            <Input
              id="manual-lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="41.0082  veya  41 0 29.5 K"
              inputMode="text"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="manual-lon">Boylam (Longitude)</Label>
            <Input
              id="manual-lon"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="28.9784  veya  28 58 42 D"
              inputMode="text"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="manual-label">Etiket (opsiyonel)</Label>
            <Input
              id="manual-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="İstanbul Boğazı"
              maxLength={60}
            />
          </div>
        </div>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" onClick={handleClear}>
            Temizle (GPS'e dön)
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="button" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
