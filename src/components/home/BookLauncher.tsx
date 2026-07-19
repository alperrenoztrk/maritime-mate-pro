import { useEffect, useState } from "react";
import { BookCollectionLibrary } from "@/components/book/BookVolumeLibrary";
import { MarinersBookCover } from "@/components/home/MarinersBookCover";
import {
  cancelBookLandscapeRequest,
  requestBookLandscape,
} from "@/components/book/BookLandscapeGate";
import {
  bookCollections,
  type BookCollectionId,
} from "@/data/bookVolumes";

const importBookPage = () => import("@/pages/BookPage");
let bookPagePromise: ReturnType<typeof importBookPage> | undefined;
const loadBookPage = () => (bookPagePromise ??= importBookPage());
type OpenBookComponent = (Awaited<ReturnType<typeof importBookPage>>)["default"];

interface BookLauncherProps {
  /** Notifies the home page whether the Mariner's Book has been opened. */
  onOpenChange?: (open: boolean) => void;
}

export function BookLauncher({ onOpenChange }: BookLauncherProps) {
  const [marinersOpen, setMarinersOpen] = useState(false);
  const [OpenBook, setOpenBook] = useState<OpenBookComponent | null>(null);
  const [activeCollectionId, setActiveCollectionId] = useState<BookCollectionId | null>(null);
  const [pendingCollectionId, setPendingCollectionId] = useState<BookCollectionId | null>(null);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      void loadBookPage().catch(() => { bookPagePromise = undefined; });
    }, 450);
    return () => window.clearTimeout(preloadTimer);
  }, []);

  useEffect(() => {
    onOpenChange?.(marinersOpen);
  }, [marinersOpen, onOpenChange]);

  const handleOpen = (collectionId: BookCollectionId) => {
    if (pendingCollectionId) return;
    const requestsDirectVolume = Boolean(
      bookCollections.find((collection) => collection.id === collectionId)?.directVolumeId,
    );
    if (requestsDirectVolume) {
      requestBookLandscape();
    }
    setPendingCollectionId(collectionId);
    void loadBookPage().then(
      (bookModule) => {
        setActiveCollectionId(collectionId);
        setOpenBook(() => bookModule.default);
      },
      () => {
        if (requestsDirectVolume) cancelBookLandscapeRequest();
        bookPagePromise = undefined;
        setPendingCollectionId(null);
      },
    );
  };

  const closeCollection = () => {
    setActiveCollectionId(null);
    setPendingCollectionId(null);
  };

  if (!marinersOpen) {
    return (
      <div className="flex w-full flex-col items-center">
        <MarinersBookCover onOpen={() => setMarinersOpen(true)} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {OpenBook && activeCollectionId ? (
        <OpenBook embedded
          collectionId={activeCollectionId}
          onClose={closeCollection}
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setMarinersOpen(false)}
            className="mb-1 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95"
            aria-label="Mariner's Book kapağına dön"
          >
            <span aria-hidden="true">‹</span>
            <span className="notranslate" translate="no" lang="en">Mariner's Book</span>
          </button>
          <BookCollectionLibrary
            compact
            onSelect={handleOpen}
            pendingCollectionId={pendingCollectionId}
          />
        </>
      )}
    </div>
  );
}
