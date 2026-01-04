import { X, ChevronLeft, Lightbulb } from "lucide-react";
import { TopicDetailContent } from "@/data/navigationTopicContents";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopicContentModalProps {
  content: TopicDetailContent;
  onClose: () => void;
}

export function TopicContentModal({ content, onClose }: TopicContentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/40 bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-card/80 px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Geri
          </button>
          <h2 className="text-lg font-bold text-foreground">{content.title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 h-[calc(90vh-80px)]">
          <div className="space-y-8 p-6">
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
                  <div className="overflow-hidden rounded-xl border border-border/40">
                    <img
                      src={section.image}
                      alt={section.imageAlt || section.title}
                      className="w-full object-contain bg-muted/30"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <p className="text-sm leading-relaxed text-foreground/80">
                  {section.content}
                </p>
                
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
        </ScrollArea>
      </div>
    </div>
  );
}
