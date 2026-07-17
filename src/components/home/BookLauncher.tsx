import { useEffect, useState } from "react";
import { BookCollectionLibrary } from "@/components/book/BookVolumeLibrary";
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

export function BookLauncher() {
  const [OpenBook, setOpenBook] = useState<OpenBookComponent | null>(null);
  const [activeCollectionId, setActiveCollectionId] = useState<BookCollectionId | null>(null);
  const [pendingCollectionId, setPendingCollectionId] = useState<BookCollectionId | null>(null);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      void loadBookPage().catch(() => { bookPagePromise = undefined; });
    }, 450);
    return () => window.clearTimeout(preloadTimer);
  }, []);

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

  const activeCollection = bookCollections.find(
    (collection) => collection.id === activeCollectionId,
  );

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {OpenBook && activeCollectionId ? (
        <OpenBook embedded
          collectionId={activeCollectionId}
          onClose={() => {
            setActiveCollectionId(null);
            setPendingCollectionId(null);
          }}
        />
      ) : (
        <BookCollectionLibrary
          compact
          onSelect={handleOpen}
          pendingCollectionId={pendingCollectionId}
        />
      )}
      <span className="text-[13px] font-medium tracking-wide text-white/85 drop-shadow-md">
        {activeCollection ? activeCollection.title : "Kitaplık"}
      </span>
    </div>
  );
}
