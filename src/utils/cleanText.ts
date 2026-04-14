/**
 * Strips markdown and LaTeX special characters from plain text for display.
 * Handles: **bold**, __bold__, *italic*, _italic_, ## headings, $formula$, `code`, * bullets
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')    // **bold** → bold
    .replace(/__([^_\n]+)__/g, '$1')          // __bold__ → bold
    .replace(/\*([^*\n]+)\*/g, '$1')          // *italic* → italic
    .replace(/_([^_\n]+)_/g, '$1')            // _italic_ → italic
    .replace(/^#{1,6}\s+/gm, '')              // ## Heading → Heading
    .replace(/\$\$([^$]+)\$\$/g, '$1')       // $$formula$$ → formula
    .replace(/\$([^$\n]+)\$/g, '$1')          // $formula$ → formula
    .replace(/`([^`\n]+)`/g, '$1')            // `code` → code
    .replace(/^\* /gm, '- ');                 // * bullet → - bullet
}

/**
 * Strips only LaTeX dollar signs from text (for ReactMarkdown content
 * where * and _ are already rendered as HTML).
 */
export function stripDollarSigns(text: string): string {
  return text
    .replace(/\$\$([^$]+)\$\$/g, '$1')
    .replace(/\$([^$\n]+)\$/g, '$1');
}
