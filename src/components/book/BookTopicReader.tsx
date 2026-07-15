import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface BookTopicLink {
  id: string;
  title: string;
  hasContent: boolean;
}

interface BookTopicGroup {
  id: string;
  number: number;
  title: string;
  icon: ElementType;
  subtopics: BookTopicLink[];
}

interface BookTopicPhoto {
  src: string;
  title: string;
  caption: string;
  alt?: string;
  credit?: string;
}

interface BookTopicImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BookTopicTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface BookTopicContent {
  title: string;
  introduction: string;
  content: string;
  image?: string;
  images?: BookTopicImage[];
  photos?: BookTopicPhoto[];
  knotAnimations?: string[];
  table?: BookTopicTable;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

interface BookTopicReaderProps {
  topics: BookTopicGroup[];
  contents: Record<string, BookTopicContent>;
  resources?: { title: string; href: string }[];
}

/**
 * Long-form, read-only topic renderer used by the book. Every chapter and
 * subtopic stays in the document flow; nothing is hidden behind an accordion,
 * tab, modal or action button. `content-visibility` in BookSheet keeps the
 * large curriculum inexpensive to paint while preserving the full text.
 */
export function BookTopicReader({ topics, contents, resources = [] }: BookTopicReaderProps) {
  return (
    <>
      <div className="bs-open-sections">
        {topics.map((topic) => {
          const TopicIcon = topic.icon;
          return (
            <section key={topic.id} className="bs-reading-section">
              <header className="bs-reading-heading">
                <span className="bs-reading-number">{topic.number}</span>
                <TopicIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <h2>{topic.title}</h2>
              </header>

              {topic.subtopics.map((subtopic, index) => {
                const content = contents[subtopic.id];
                if (!subtopic.hasContent || !content) {
                  return (
                    <div key={subtopic.id} className="bs-reading-empty">
                      <span>{topic.number}.{index + 1}</span>
                      <p>{subtopic.title}</p>
                      <em>İçerik hazırlanıyor</em>
                    </div>
                  );
                }

                return (
                  <article key={subtopic.id} id={subtopic.id} className="bs-topic-article">
                    <p className="bs-topic-kicker">{topic.number}.{index + 1}</p>
                    <h3>{content.title || subtopic.title}</h3>
                    <TopicContent content={content} />
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>

      {resources.length > 0 && (
        <section className="bs-reading-resources">
          <h2 className="bs-section">Kitap İçi Referanslar</h2>
          {resources.map((resource) => (
            <Link key={resource.href} to={resource.href} className="bs-entry">
              <span className="bs-entry-label">{resource.title}</span>
              <span className="bs-leader" aria-hidden="true" />
              <span className="bs-anchor" aria-hidden="true">{resource.href.startsWith("/") ? "↗" : ""}</span>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

function TopicContent({ content }: { content: BookTopicContent }) {
  const figures: BookTopicImage[] = [
    ...(content.image ? [{ src: content.image, alt: content.title }] : []),
    ...(content.images ?? []),
  ];

  return (
    <div className="bs-prose bs-topic-content">
      <p className="bs-topic-introduction">{content.introduction}</p>

      {figures.map((image, index) => (
        <figure key={`${image.src}-${index}`} className="bs-topic-figure">
          <img src={image.src} alt={image.alt} loading="lazy" />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}

      {content.photos && content.photos.length > 0 && (
        <div className="bs-photo-grid" aria-label={`${content.title} fotoğrafları`}>
          {content.photos.map((photo, index) => (
            <figure key={`${photo.src}-${index}`} className="bs-topic-figure">
              <img
                src={photo.src}
                alt={photo.alt ?? `${photo.title}. ${photo.caption}`}
                loading="lazy"
              />
              <figcaption>
                <strong>{photo.title}</strong>
                <span>{photo.caption}</span>
                {photo.credit && <small>{photo.credit}</small>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {content.knotAnimations && content.knotAnimations.length > 0 && (
        <p className="bs-callout">
          <span className="bs-callout-label">Uygulamalı Ek</span>
          Bu konuya ait bağ yapım adımları <Link to="/seamanship/knots">Gemici Bağları</Link> yaprağında yer alır.
        </p>
      )}

      <div className="whitespace-pre-line">{content.content}</div>

      {content.table && (
        <div className="bs-table-wrap">
          <p className="bs-table-caption">{content.table.title}</p>
          <table className="bs-table">
            <thead>
              <tr>{content.table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
            </thead>
            <tbody>
              {content.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {content.bulletPoints && content.bulletPoints.length > 0 && (
        <InfoList label="Önemli Noktalar" items={content.bulletPoints} />
      )}

      {content.formula && (
        <div className="bs-formula">
          <strong>{content.formula.name}</strong>
          <div className="bs-formula-expression">{content.formula.expression}</div>
          <p>{content.formula.description}</p>
        </div>
      )}

      {content.examples && content.examples.length > 0 && (
        <div className="bs-callout">
          <span className="bs-callout-label">Çözümlü Örnek</span>
          {content.examples.map((example, index) => (
            <div key={index} className="bs-example">
              <strong>Soru: {example.problem}</strong>
              <p>Çözüm: {example.solution}</p>
            </div>
          ))}
        </div>
      )}

      {content.keyPoints && content.keyPoints.length > 0 && (
        <div className="bs-callout">
          <span className="bs-callout-label inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Anahtar Bilgiler
          </span>
          <ol>{content.keyPoints.map((point, index) => <li key={index}>{point}</li>)}</ol>
        </div>
      )}

      {content.warnings && content.warnings.length > 0 && (
        <div className="bs-callout bs-callout--warning">
          <span className="bs-callout-label inline-flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> Uyarılar
          </span>
          <ul>{content.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

function InfoList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="bs-callout">
      <span className="bs-callout-label">{label}</span>
      <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </div>
  );
}
