import { ChevronLeft, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { navigationTopicContents } from "@/data/navigationTopicContents";

export default function LessonTopicDetailPage() {
  const { categoryId, topicTitle } = useParams<{ categoryId: string; topicTitle: string }>();
  const decodedTitle = topicTitle ? decodeURIComponent(topicTitle) : "";
  const fallbackContent = {
    title: decodedTitle || "Konu Detayı",
    introduction:
      "Bu konu başlığı için içerik hazırlanmaktadır. Şimdilik sayfa iskeleti yayınlandı; görseller ve ayrıntılı anlatım en kısa sürede eklenecektir.",
    sections: [
      {
        title: "İçerik hazırlanıyor",
        content:
          "Bu başlık için örnekler, tablolar ve görseller hazırlanıyor. Güncel sürümde bu sayfa, yeni içerikler eklendikçe otomatik olarak zenginleşecektir."
      }
    ]
  };
  const content = navigationTopicContents[decodedTitle] ?? fallbackContent;

  if (!categoryId || !decodedTitle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">İçerik bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-card/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <Link
          to={`/lessons/${categoryId}/topics`}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Geri
        </Link>
        <h1 className="text-base font-bold text-foreground sm:text-lg">{content.title}</h1>
        <div className="w-12" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 sm:p-6">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-relaxed text-foreground/90">{content.introduction}</p>
        </div>

        {content.sections.map((section, index) => (
          <section key={`${section.title}-${index}`} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>

            {section.image && (
              <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                <img
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  className="h-48 w-full object-contain bg-muted/30"
                  loading="lazy"
                />
              </div>
            )}

            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed text-foreground/80">{children}</p>
                ),
                img: ({ src, alt }) => (
                  <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40">
                    <img
                      src={src}
                      alt={alt || section.title}
                      className="h-48 w-full object-contain bg-muted/30"
                      loading="lazy"
                    />
                  </div>
                )
              }}
            >
              {section.content}
            </ReactMarkdown>

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2 pl-1">
                {section.bulletPoints.map((point, pointIndex) => (
                  <li key={`${section.title}-point-${pointIndex}`} className="flex items-start gap-3 text-sm text-foreground/80">
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

        {content.keyPoints && content.keyPoints.length > 0 && (
          <section className="rounded-xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="font-semibold text-foreground">Önemli Noktalar</h2>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={`key-point-${index}`} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
