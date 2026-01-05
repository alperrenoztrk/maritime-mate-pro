const AI_PHRASE_PATTERNS: RegExp[] = [
  /^\s*(elbette|tabii ki|memnuniyetle|tabii|peki)[:,.!]?\s*/i,
  /^\s*(işte|şöyle|aşağıda)[:,.!]?\s*/i,
  /\b(bir yapay zeka olarak|yapay zeka olarak|ai olarak)\b[^\n.!?]*[\n.!?]?/gi,
  /\b(umarım yardımcı olur|yardımcı olduysa|yardımcı olabildiysem)\b[^\n.!?]*[\n.!?]?/gi,
  /\b(bunu yapabilirim|yapabilirim)\b[^\n.!?]*[\n.!?]?/gi,
];

const REDUNDANT_LINES = new Set([
  'sormak istediğin başka bir şey var mı',
  'başka bir konuda yardımcı olabilir miyim',
  'başka bir konuda yardımcı olabilirim',
]);

export function normalizeAgentOutput(text: string): string {
  if (!text) return '';

  let normalized = text;

  for (const pattern of AI_PHRASE_PATTERNS) {
    normalized = normalized.replace(pattern, '');
  }

  normalized = normalized
    .split('\n')
    .filter((line) => !REDUNDANT_LINES.has(line.trim().toLowerCase()))
    .join('\n');

  normalized = normalized
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/^\s+|\s+$/g, '');

  return normalized;
}
