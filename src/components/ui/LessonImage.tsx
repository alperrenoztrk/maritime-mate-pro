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

  useEffect(() => {
    setStage(isExternal ? "proxy" : "direct");
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
      onClick={onClick}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={className}
      draggable={false}
    />
  );
}
