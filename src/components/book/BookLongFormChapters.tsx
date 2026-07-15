import { AlertTriangle, BookMarked, FileText, Lightbulb, Scale } from "lucide-react";

type LongFormCalloutType = "warning" | "reference" | "tip" | "example" | "regulation";

interface LongFormCallout {
  type: LongFormCalloutType;
  title?: string;
  text: string;
}

interface LongFormTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

interface LongFormSection {
  subheading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LongFormTable;
  callouts?: LongFormCallout[];
}

interface LongFormChapter {
  heading: string;
  lead?: string;
  sections: LongFormSection[];
}

interface BookLongFormChaptersProps {
  content: {
    chapters: LongFormChapter[];
    sources?: string[];
  };
}

const calloutMeta: Record<LongFormCalloutType, { Icon: typeof AlertTriangle; label: string }> = {
  warning: { Icon: AlertTriangle, label: "Uyarı" },
  reference: { Icon: BookMarked, label: "Referans" },
  tip: { Icon: Lightbulb, label: "İpucu" },
  example: { Icon: FileText, label: "Örnek" },
  regulation: { Icon: Scale, label: "Mevzuat" },
};

/** Renders every long-form chapter in order, with no tab or next/previous controls. */
export function BookLongFormChapters({ content }: BookLongFormChaptersProps) {
  return (
    <>
      <div className="bs-open-sections">
        {content.chapters.map((chapter, chapterIndex) => (
          <article key={chapterIndex} className="bs-reading-section">
            <p className="bs-topic-kicker">Bölüm {chapterIndex + 1}</p>
            <h2 className="bs-h2">{chapter.heading}</h2>
            {chapter.lead && <p className="bs-callout text-sm italic">{chapter.lead}</p>}

            {chapter.sections.map((section, sectionIndex) => (
              <section key={sectionIndex} className="bs-prose bs-topic-article">
                <h3>{section.subheading}</h3>
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>
                )}
                {section.table && (
                  <div className="bs-table-wrap">
                    {section.table.caption && <p className="bs-table-caption">{section.table.caption}</p>}
                    <table className="bs-table">
                      <thead>
                        <tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.callouts?.map((callout, calloutIndex) => {
                  const meta = calloutMeta[callout.type];
                  const Icon = meta.Icon;
                  return (
                    <aside key={calloutIndex} className={`bs-callout ${callout.type === "warning" ? "bs-callout--warning" : ""}`}>
                      <span className="bs-callout-label inline-flex items-center gap-1">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {callout.title ?? meta.label}
                      </span>
                      <p>{callout.text}</p>
                    </aside>
                  );
                })}
              </section>
            ))}
          </article>
        ))}
      </div>

      {content.sources && content.sources.length > 0 && (
        <aside className="bs-reading-resources bs-muted text-xs">
          <h2 className="bs-section">Kaynaklar</h2>
          <ol>{content.sources.map((source, index) => <li key={index}>{source}</li>)}</ol>
        </aside>
      )}
    </>
  );
}
