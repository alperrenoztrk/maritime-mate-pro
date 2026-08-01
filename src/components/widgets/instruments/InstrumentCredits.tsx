import { useState } from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { INSTRUMENT_CREDITS } from "./instrumentPhotos";

/**
 * Widget gövdelerindeki fotoğrafların atıfları.
 *
 * CC BY / CC BY-SA lisanslı görseller için atıf zorunlu; ana sayfada başka bir
 * atıf yüzeyi yok. Liste `instrumentPhotos.ts`'deki `credit` alanlarından gelir
 * ki depo tarafındaki CREDITS.md ile tek kaynaktan beslensin.
 */
export function InstrumentCredits() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="px-4 pt-1 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-[10px] text-amber-200/45 underline-offset-2 transition-colors hover:text-amber-200/80 hover:underline"
        >
          <Camera className="h-3 w-3" aria-hidden="true" />
          <span data-translatable>Enstrüman fotoğrafları: Wikimedia Commons</span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span data-translatable>Fotoğraf kaynakları</span>
            </DialogTitle>
            <DialogDescription>
              <span data-translatable>
                Widget gövdeleri gerçek enstrüman fotoğraflarıdır. Tümü Wikimedia Commons
                üzerinden özgür lisanslarla alınmıştır.
              </span>
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-3">
            {INSTRUMENT_CREDITS.map((credit) => (
              <li key={credit.url} className="text-xs leading-relaxed">
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block break-words font-medium text-amber-300 underline underline-offset-2"
                >
                  <span className="notranslate" translate="no">{credit.title}</span>
                </a>
                <span className="text-muted-foreground notranslate" translate="no">
                  {credit.author} · {credit.license}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
