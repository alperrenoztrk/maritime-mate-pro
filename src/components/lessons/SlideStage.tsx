import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LessonSlide } from "@/data/lessonSlides";
import { SlideBlockRenderer } from "@/components/lessons/SlideBlockRenderer";

/**
 * Tek bir slaytın sahnesi.
 *
 * Bloklar sırayla (stagger) belirir — "video" hissini veren şey budur.
 * Seslendirme metni bu düğümün `innerText`'inden okunur; DOM zaten
 * `LanguageContext` tarafından uygulama diline çevrildiği için ses ve ekran
 * her zaman aynı dilde olur.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

export const SlideStage = forwardRef<
  HTMLDivElement,
  {
    slide: LessonSlide;
    onQuizAnswered?: (correct: boolean) => void;
  }
>(function SlideStage({ slide, onQuizAnswered }, ref) {
  const isCover = slide.layout === "cover";
  const isImageText = slide.layout === "imageText";
  const imageBlock = isImageText ? slide.blocks.find((b) => b.kind === "image") : undefined;
  const restBlocks = imageBlock ? slide.blocks.filter((b) => b !== imageBlock) : slide.blocks;

  // Seslendirme metni bu sabit kapsayıcıdan okunur; ref animasyonlu düğüme
  // değil buraya bağlanır (AnimatePresence çocuğu klonlarken ref'i tüketiyor).
  return (
    <div ref={ref} className="h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="flex h-full w-full flex-col justify-center gap-5 overflow-y-auto p-5 sm:gap-6 sm:p-8"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: -12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2
              className={
                isCover
                  ? "text-2xl font-bold text-foreground sm:text-4xl"
                  : "text-xl font-bold text-foreground sm:text-3xl"
              }
            >
              {slide.title}
            </h2>
            {slide.partLabel && (
              <p className="mt-1 text-xs font-medium text-muted-foreground">{slide.partLabel}</p>
            )}
          </motion.div>

          {imageBlock ? (
            <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-6">
              <SlideBlockRenderer block={imageBlock} />
              <div className="space-y-4">
                {restBlocks.map((block, index) => (
                  <SlideBlockRenderer
                    key={`${slide.id}-b${index}`}
                    block={block}
                    onQuizAnswered={onQuizAnswered}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-4">
              {slide.blocks.map((block, index) => (
                <SlideBlockRenderer
                  key={`${slide.id}-b${index}`}
                  block={block}
                  onQuizAnswered={onQuizAnswered}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
