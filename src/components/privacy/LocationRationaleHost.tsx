import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { onLocationRationaleRequest } from "@/lib/geolocationPermission";

/**
 * Shown once, before the system location permission dialog, so the user knows
 * why the app asks. "Continue" lets the system dialog appear; "Not now" keeps
 * the app on an approximate location from the internet connection.
 */
const COPY = {
  // `bullets` is an extractor-allowed field, so these reach the locale files.
  bullets: [
    "Your location is used to show local weather, sunrise and sunset times and your position in the navigation tools.",
    "To fetch this information, your coordinates are sent to the weather service (Open-Meteo) and the place-name service (BigDataCloud).",
    "If you choose Not now, an approximate location based on your internet connection is used. You can turn it on later in Location Picker → Use device location.",
  ],
};

export function LocationRationaleHost() {
  const [resolver, setResolver] = useState<((allow: boolean) => void) | null>(null);

  useEffect(() => onLocationRationaleRequest((resolve) => setResolver(() => resolve)), []);

  const answer = (allow: boolean) => {
    if (!resolver) return;
    resolver(allow);
    setResolver(null);
  };

  return (
    <Dialog open={Boolean(resolver)} onOpenChange={(open) => !open && answer(false)}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <DialogTitle>Use your location?</DialogTitle>
          <DialogDescription className="sr-only">Location permission request</DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {COPY.bullets.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => answer(false)}>
            Not now
          </Button>
          <Button onClick={() => answer(true)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
