import { stripDollarSigns } from "./cleanText";

/**
 * Prepares an AI answer for markdown rendering (AiAnswerText): drops LaTeX
 * dollar signs and repairs `** text**` (spaces inside the marks), which
 * markdown would otherwise show as literal asterisks instead of bold.
 */
export function normalizeAiMarkdown(text: string): string {
  return stripDollarSigns(text ?? "")
    .split("\n")
    .map((line) => {
      // Pair the marks left to right on each line, so the closing `**` of one
      // bold part is never mistaken for the opening of the next.
      const parts = line.split("**");
      if (parts.length < 3 || (parts.length - 1) % 2 !== 0) return line;
      return parts
        .map((part, index) => (index % 2 === 1 && part.trim() ? part.trim() : part))
        .join("**");
    })
    .join("\n");
}
