import { useMemo } from "react";

/**
 * Ders anlatım metinlerini yapısal olarak render eden bileşen.
 *
 * Ders sayfalarındaki uzun anlatımlar tek bir düz metin bloğu olarak tutuluyor;
 * başlıklar metnin içinde büyük harfle yazılmış satırlardan ("MARKET STRUCTURE:"),
 * listeler ise "- " veya "1. " ile başlayan satırlardan ibaret. Bu bileşen o
 * kalıpları ayrıştırıp gerçek başlık/liste/paragraf tipografisine çevirir.
 *
 * Metnin kendisi değiştirilmez, yalnız yapısı çıkarılır.
 */

type OrderedItem = { label: string; body?: string };

type Block =
  | { kind: "heading"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "ordered"; items: OrderedItem[] }
  | { kind: "flow"; lines: string[] };

const BULLET_RE = /^[-–—•*]\s+(.*)$/;
const ORDERED_RE = /^(\d{1,2})[.)]\s+(.*)$/;
const LOWER_RE = /[a-zçğıöşü]/g;
const UPPER_RE = /[A-ZÇĞİÖŞÜ]/g;

/** "MARKET STRUCTURE:" gibi tek başına duran büyük harfli başlık satırı mı? */
function isHeadingLine(line: string): boolean {
  if (!line.endsWith(":")) return false;
  const body = line.slice(0, -1).trim();
  if (body.length < 2 || body.length > 80) return false;
  const upper = body.match(UPPER_RE)?.length ?? 0;
  const lower = body.match(LOWER_RE)?.length ?? 0;
  if (upper < 2) return false;
  // Tek harflik dizgi hatalarına ("SANCAk") tolerans tanı.
  return upper / (upper + lower) >= 0.8;
}

/** "Factors affecting demand:" gibi listeyi tanıtan kısa satır mı? */
function isLeadLine(line: string): boolean {
  return line.endsWith(":") && line.length <= 90 && !/[.?!]/.test(line);
}

function parseLessonText(text: string): Block[] {
  const blocks: Block[] = [];
  let current: Block | null = null;

  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flush();
      continue;
    }

    if (isHeadingLine(line)) {
      flush();
      blocks.push({ kind: "heading", text: line.slice(0, -1).trim() });
      continue;
    }

    const bullet = line.match(BULLET_RE);
    if (bullet) {
      if (current?.kind !== "bullets") {
        flush();
        current = { kind: "bullets", items: [] };
      }
      current.items.push(bullet[1].trim());
      continue;
    }

    const ordered = line.match(ORDERED_RE);
    if (ordered) {
      if (current?.kind !== "ordered") {
        flush();
        current = { kind: "ordered", items: [] };
      }
      current.items.push({ label: ordered[2].trim() });
      continue;
    }

    if (line.includes("→")) {
      if (current?.kind !== "flow") {
        flush();
        current = { kind: "flow", lines: [] };
      }
      current.lines.push(line);
      continue;
    }

    // Numaralı başlığın ("1. FREIGHT MARKET (Freight Market):") hemen ardından
    // gelen açıklama satırı o maddenin gövdesidir.
    if (current?.kind === "ordered") {
      const last = current.items[current.items.length - 1];
      if (last.label.endsWith(":")) {
        last.body = last.body ? `${last.body} ${line}` : line;
        continue;
      }
    }

    if (current?.kind === "paragraph") {
      current.text = `${current.text} ${line}`;
      continue;
    }

    flush();
    current = isLeadLine(line) ? { kind: "lead", text: line } : { kind: "paragraph", text: line };
  }

  flush();
  return blocks;
}

/**
 * "Term (English): description" kalıbını kalın terim + açıklamaya böler.
 * Cümle içindeki iki nokta işaretlerini yanlışlıkla bölmemek için terim
 * kısmının kısa ve noktalama içermiyor olmasını şart koşar.
 */
function splitTerm(item: string): { term?: string; rest: string } {
  const index = item.indexOf(": ");
  if (index <= 0 || index > 60) return { rest: item };
  const term = item.slice(0, index);
  if (/[.?!]/.test(term)) return { rest: item };
  return { term, rest: item.slice(index + 2).trim() };
}

function TermText({ item }: { item: string }) {
  const { term, rest } = splitTerm(item);
  if (!term || !rest) return <>{item}</>;
  return (
    <>
      <span className="font-semibold text-foreground">{term}</span>
      {" — "}
      {rest}
    </>
  );
}

export function StructuredLessonText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const blocks = useMemo(() => parseLessonText(text ?? ""), [text]);

  if (blocks.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.kind) {
          case "heading":
            return (
              <h3
                key={key}
                className="flex items-center gap-2 pt-2 text-sm font-bold tracking-wide text-foreground first:pt-0"
              >
                <span className="h-4 w-1 shrink-0 rounded-full bg-primary/70" />
                {block.text}
              </h3>
            );

          case "lead":
            return (
              <p key={key} className="text-sm font-medium leading-relaxed text-foreground">
                {block.text}
              </p>
            );

          case "paragraph":
            return (
              <p key={key} className="text-sm leading-relaxed text-foreground/80">
                {block.text}
              </p>
            );

          case "bullets":
            return (
              <ul key={key} className="space-y-2 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`${key}-${itemIndex}`}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <TermText item={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ordered":
            return (
              <ol key={key} className="space-y-2.5">
                {block.items.map((item, itemIndex) => {
                  const label = item.body ? item.label.replace(/:$/, "") : item.label;
                  return (
                    <li key={`${key}-${itemIndex}`} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-micro font-bold text-primary">
                        {itemIndex + 1}
                      </span>
                      <div className="space-y-1 text-sm leading-relaxed text-foreground/80">
                        {item.body ? (
                          <span className="font-semibold text-foreground">{label}</span>
                        ) : (
                          <TermText item={label} />
                        )}
                        {item.body && <p>{item.body}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            );

          case "flow":
            return (
              <div
                key={key}
                className="space-y-1.5 rounded-lg border border-border/40 bg-muted/40 px-3 py-2.5"
              >
                {block.lines.map((line, lineIndex) => (
                  <p
                    key={`${key}-${lineIndex}`}
                    className="text-sm font-medium leading-relaxed text-foreground"
                  >
                    {line}
                  </p>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default StructuredLessonText;
