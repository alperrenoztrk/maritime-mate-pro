import { useEffect, useState } from "react";
import { BookVolumeLibrary } from "@/components/book/BookVolumeLibrary";
import { bookVolumeDescriptors, type BookVolumeId } from "@/data/bookVolumes";

const importBookPage = () => import("@/pages/BookPage");
let bookPagePromise: ReturnType<typeof importBookPage> | undefined;
const loadBookPage = () => (bookPagePromise ??= importBookPage());
type OpenBookComponent = (Awaited<ReturnType<typeof importBookPage>>)["default"];

export function BookLauncher() {
  const [OpenBook, setOpenBook] = useState<OpenBookComponent | null>(null);
  const [activeVolumeId, setActiveVolumeId] = useState<BookVolumeId | null>(null);
  const [pendingVolumeId, setPendingVolumeId] = useState<BookVolumeId | null>(null);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      void loadBookPage().catch(() => { bookPagePromise = undefined; });
    }, 450);
    return () => window.clearTimeout(preloadTimer);
  }, []);

  const handleOpen = (volumeId: BookVolumeId) => {
    if (pendingVolumeId) return;
    setPendingVolumeId(volumeId);
    void loadBookPage().then(
      (bookModule) => {
        setActiveVolumeId(volumeId);
        setOpenBook(() => bookModule.default);
      },
      () => {
        bookPagePromise = undefined;
        setPendingVolumeId(null);
      },
    );
  };

  const activeVolume = bookVolumeDescriptors.find((volume) => volume.id === activeVolumeId);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {OpenBook && activeVolumeId ? (
        <OpenBook embedded volumeId={activeVolumeId} />
      ) : (
        <BookVolumeLibrary compact onSelect={handleOpen} pendingVolumeId={pendingVolumeId} />
      )}
      <span className="text-[13px] font-medium tracking-wide text-white/85 drop-shadow-md">
        {activeVolume ? activeVolume.title : "Kitaplık"}
      </span>
    </div>
  );
}
