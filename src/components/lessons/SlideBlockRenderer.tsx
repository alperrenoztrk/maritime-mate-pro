import { motion } from "framer-motion";
import type { SlideBlock } from "@/data/lessonSlides";
import { KnowledgeCheck } from "@/components/lessons/KnowledgeCheck";

/**
 * Tek bir slayt bloğunun görsel karşılığı.
 *
 * `LessonTeachCard`'ın kart dilini (amber formül, mavi örnek, tablo) slayt
 * ölçeğinde yeniden kullanır; oradaki bileşen bozulmadan kalır çünkü
 * `GuidedLessonSession` hâlâ onu kullanıyor.
 */

const blockVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function SlideBlockRenderer({
  block,
  onQuizAnswered,
}: {
  block: SlideBlock;
  onQuizAnswered?: (correct: boolean) => void;
}) {
  return (
    <motion.div variants={blockVariants} transition={{ duration: 0.45, ease: "easeOut" }}>
      {renderBlock(block, onQuizAnswered)}
    </motion.div>
  );
}

function renderBlock(block: SlideBlock, onQuizAnswered?: (correct: boolean) => void) {
  switch (block.kind) {
    case "paragraph":
      return (
        <div className="rounded-2xl bg-amber-100/70 p-4 dark:bg-amber-500/10 sm:p-6">
          <p className="text-base leading-relaxed text-foreground sm:text-lg">{block.text}</p>
        </div>
      );

    case "image":
      return (
        <div className="overflow-hidden rounded-2xl bg-primary/10">
          <img
            src={block.src}
            alt={block.alt || ""}
            className="mx-auto h-40 w-full object-contain sm:h-56"
            loading="lazy"
          />
          {block.alt && (
            <p className="bg-primary px-3 py-2 text-center text-xs font-bold text-primary-foreground sm:text-sm">
              {block.alt}
            </p>
          )}
        </div>
      );

    case "bullets":
      return (
        <ul className="space-y-3">
          {block.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-muted/60 p-3 text-sm text-foreground sm:p-4 sm:text-base"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "formula":
      return (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 sm:p-6">
          <p className="text-center font-mono text-lg font-semibold text-amber-700 dark:text-amber-300 sm:text-2xl">
            {block.text}
          </p>
          {block.description && (
            <p className="mt-3 text-center text-xs text-muted-foreground sm:text-sm">
              {block.description}
            </p>
          )}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-primary/10">
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i} className="px-3 py-2.5 font-semibold text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2.5 text-foreground/80">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "example":
      return (
        <div className="overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-500/5">
          <div className="bg-sky-500/15 px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Çözümlü Örnek
            </p>
          </div>
          <div className="space-y-3 p-4 sm:p-5">
            <p className="text-sm font-medium text-foreground sm:text-base">{block.problem}</p>
            {block.steps && block.steps.length > 0 && (
              <ol className="space-y-1.5">
                {block.steps.map((step, i) => (
                  <li key={i} className="text-xs leading-relaxed text-foreground/80 sm:text-sm">
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            )}
            {block.solution && (
              <p className="text-xs leading-relaxed text-foreground/80 sm:text-sm">{block.solution}</p>
            )}
            {block.result && (
              <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Sonuç: {block.result}
              </p>
            )}
          </div>
        </div>
      );

    case "quiz":
      return <KnowledgeCheck question={block.question} onAnswered={onQuizAnswered} compact />;

    default:
      return null;
  }
}
