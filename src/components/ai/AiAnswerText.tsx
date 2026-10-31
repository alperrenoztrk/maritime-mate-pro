import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeAiMarkdown } from "@/utils/aiMarkdown";

interface AiAnswerTextProps {
  text: string;
  className?: string;
}

/**
 * Renders an AI answer with its markdown formatting (bold, headings, lists,
 * code, tables) instead of showing the raw `**` marks.
 *
 * - Raw HTML in the answer is never rendered (react-markdown default plus
 *   skipHtml), so a crafted answer cannot inject markup or script.
 * - The answer is already written in the user's language by the model, so
 *   the page translator must not touch it: splitting a sentence into bold
 *   and plain text nodes would otherwise be translated piece by piece.
 * - Models sometimes write `** text**` (a space inside the marks), which
 *   markdown does not treat as bold; normalizeAiMarkdown fixes that.
 */
export function AiAnswerText({ text, className = "" }: AiAnswerTextProps) {
  return (
    <div className={`notranslate space-y-2 break-words ${className}`} translate="no" data-no-translate="">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          h1: ({ children }) => <h4 className="mt-2 text-base font-semibold">{children}</h4>,
          h2: ({ children }) => <h4 className="mt-2 text-base font-semibold">{children}</h4>,
          h3: ({ children }) => <h5 className="mt-2 font-semibold">{children}</h5>,
          h4: ({ children }) => <h5 className="mt-2 font-semibold">{children}</h5>,
          ul: ({ children }) => <ul className="ml-5 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="ml-5 list-decimal space-y-1">{children}</ol>,
          code: ({ children }) => (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">{children}</code>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-border/60 px-2 py-1 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-border/60 px-2 py-1">{children}</td>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {normalizeAiMarkdown(text)}
      </ReactMarkdown>
    </div>
  );
}
