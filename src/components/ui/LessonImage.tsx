import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import { withImageProxy } from "./imageProxy";

interface LessonImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  /** When true, do not wrap with proxy/fallback chrome; render bare img with onError fallback (used inside ImageViewerModal). */
  bare?: boolean;
}

type Stage = "proxy" | "direct" | "failed";

export function LessonImage({ src, alt, className, onClick, bare = false }: LessonImageProps) {
  const isExternal =
    !!src &&
    !src.startsWith("/") &&
    !src.startsWith("./") &&
    !src.startsWith("../") &&
    !src.startsWith("data:") &&
    !src.startsWith("blob:");

  const [stage, setStage] = useState<Stage>(isExternal ? "proxy" : "direct");
  const [displayLimit, setDisplayLimit] = useState<number | null>(null);

  useEffect(() => {
    setStage(isExternal ? "proxy" : "direct");
    setDisplayLimit(null);
  }, [src, isExternal]);

  const currentSrc =
    stage === "proxy" ? withImageProxy(src) : stage === "direct" ? src : "";

  const handleError = () => {
    if (stage === "proxy") setStage("direct");
    else if (stage === "direct") setStage("failed");
  };

  if (stage === "failed") {
    const content = (
      <div
        className={
          "flex flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground " +
          (className ?? "h-48 w-full")
        }
      >
        <ImageOff className="h-8 w-8 opacity-60" />
        <span className="px-3 text-center text-xs">
          {alt ? `Görsel yüklenemedi: ${alt}` : "Görsel yüklenemedi"}
        </span>
      </div>
    );
    return bare ? content : content;
  }

  return (
    <img
      src={currentSrc}
      alt={alt || "Görsel"}
      onError={handleError}
      onLoad={(event) => {
        if (bare) return;
        const image = event.currentTarget;
        // Small source images are kept near their 2x CSS size instead of being
        // stretched across a Retina screen and advertising every source pixel.
        if (image.naturalWidth < 800 || image.naturalHeight < 600) {
          setDisplayLimit(Math.max(160, Math.round(image.naturalWidth / 2)));
        }
      }}
      onClick={onClick}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={className}
      data-low-resolution={displayLimit ? "true" : undefined}
      style={displayLimit ? { maxWidth: `${displayLimit}px` } : undefined}
      draggable={false}
    />
  );
}
