import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageViewerModalProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewerModal({ src, alt, isOpen, onClose }: ImageViewerModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      handleReset();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleZoomOut}
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              aria-label="Küçült"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              aria-label="Büyüt"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={handleRotate}
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              aria-label="Döndür"
            >
              <RotateCw className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                onClose();
                handleReset();
              }}
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              aria-label="Kapat"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Image */}
          <motion.img
            src={src}
            alt={alt || "Görsel"}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease-out",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />

          {/* Alt text */}
          {alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 text-sm text-white/80">
              {alt}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
