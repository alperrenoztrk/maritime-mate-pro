import { useEffect, useState } from "react";
import { AppSearchExperience } from "@/components/search/AppSearchExperience";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * Keyboard/legacy search entry point. The bottom tab now owns a real /search
 * route; this sheet remains for Command-K and older in-app search triggers.
 */
export function GlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    const handleOpen = () => setOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleOpen);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden border-border/60 bg-background p-0 sm:p-0">
        <DialogTitle className="sr-only">Search in app</DialogTitle>
        {open && (
          <AppSearchExperience
            variant="sheet"
            autoFocus
            onNavigate={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
