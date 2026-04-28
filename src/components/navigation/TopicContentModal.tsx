import { X, ChevronLeft, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { TopicDetailContent } from "@/data/navigationTopicContents";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";
import { LessonImage } from "@/components/ui/LessonImage";

interface TopicContentModalProps {
  content: TopicDetailContent;
  onClose: () => void;
}

export function TopicContentModal({ content, onClose }: TopicContentModalProps) {
  const [viewerImage, setViewerImage] = useState<{ src: string; alt?: string } | null>(null);

  const handleImageClick = (src: string, alt?: string) => {
    setViewerImage({ src, alt });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-card/80 px-4 py-3 sm:px-6 sm:py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Geri
          </button>
          <h2 className="text-base sm:text-lg font-bold text-foreground text-center flex-1 mx-4 line-clamp-1">{content.title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Full screen scrollable area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-8 p-4 sm:p-6 max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                {content.introduction}
              </p>
            </div>

            {/* Sections */}
            {content.sections.map((section, index) => (
              <section key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {section.title}
                </h3>

                {section.image && (
                  <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40 group relative">
                    <LessonImage
                      src={section.image}
                      alt={section.imageAlt || section.title}
                      className="h-48 w-full object-contain bg-muted/30 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(section.image!, section.imageAlt || section.title)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="rounded-full bg-black/50 p-2">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
                    ),
                    img: ({ src, alt }) => (
                      <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40 group relative">
                        <LessonImage
                          src={src || ''}
                          alt={alt || section.title}
                          className="h-48 w-full object-contain bg-muted/30 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleImageClick(src || '', alt || section.title)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="rounded-full bg-black/50 p-2">
                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                >
                  {section.content}
                </ReactMarkdown>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-1">
                    {section.bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.formula && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                    <p className="font-mono text-sm font-medium text-amber-700 dark:text-amber-400">
                      {section.formula.text}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {section.formula.description}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Key Points */}
            {content.keyPoints && content.keyPoints.length > 0 && (
              <section className="rounded-xl border border-border/40 bg-card/60 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Önemli Noktalar</h3>
                </div>
                <ul className="space-y-2">
                  {content.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      <ImageViewerModal
        src={viewerImage?.src || ''}
        alt={viewerImage?.alt}
        isOpen={!!viewerImage}
        onClose={() => setViewerImage(null)}
      />
    </>
  );
}
