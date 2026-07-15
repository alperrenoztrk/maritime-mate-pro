export type BookTurnDirection = "forward" | "backward";

interface BookEntryLike {
  label: string;
  to: string;
}

interface BookSectionLike {
  heading?: string;
  entries: BookEntryLike[];
}

export interface BookPageLike {
  id: string;
  continuation?: boolean;
  sections: BookSectionLike[];
}

export interface BookPageLayout {
  /** Approximate number of printed rows that fit between running head and folio. */
  rowBudget: number;
  /** Approximate number of characters that fit on one entry line. */
  charactersPerLine: number;
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

/** Converts a physical horizontal drag into a normalized 0..1 leaf turn. */
export function getBookTurnProgress(
  deltaX: number,
  leafWidth: number,
  direction: BookTurnDirection,
): number {
  const directedDistance = direction === "forward" ? -deltaX : deltaX;
  return clamp(directedDistance / Math.max(leafWidth, 1), 0, 1);
}

/** A deliberate partial pull or a quick flick is enough to finish the turn. */
export function shouldCompleteBookTurn(
  progress: number,
  velocityX: number,
  direction: BookTurnDirection,
): boolean {
  const directedVelocity = direction === "forward" ? -velocityX : velocityX;
  return progress >= 0.34 || (progress >= 0.08 && directedVelocity >= 0.42);
}

export function getBookTurnSettleDuration(progress: number, complete: boolean): number {
  const distanceRemaining = complete ? 1 - progress : progress;
  return Math.round(150 + clamp(distanceRemaining, 0, 1) * 310);
}

/**
 * Derives a conservative print capacity from the real rendered volume. The
 * values mirror BookPage's mobile/desktop line heights and reserve space for
 * the running head, folio and paper padding.
 */
export function getBookPageLayout(width: number, height: number, fontScale = 1): BookPageLayout {
  const mobile = width <= 720;
  const scale = clamp(Number.isFinite(fontScale) ? fontScale : 1, 0.8, 1.5);
  const leafWidth = width / 2;
  const totalHorizontalPadding = mobile ? 14 : clamp(width * 0.1, 22, 76);
  // Calibrated against the rendered serif at the leaf's clamped font sizes.
  const averageGlyphWidth = (mobile ? 4.9 : 6.6) * scale;
  const charactersPerLine = clamp(
    Math.floor((leafWidth - totalHorizontalPadding) / averageGlyphWidth),
    14,
    52,
  );
  const reservedChrome = (mobile ? 56 : 90) * scale;
  const printedRowHeight = (mobile ? 25 : 31) * scale;
  const rowBudget = clamp(Math.floor((height - reservedChrome) / printedRowHeight), 6, 15);

  return { rowBudget, charactersPerLine };
}

function entryRowCost(label: string, charactersPerLine: number): number {
  // The anchor and leader consume a little of the line even though the label
  // itself may appear to fit exactly.
  return Math.max(1, Math.ceil((label.trim().length + 6) / charactersPerLine));
}

/**
 * Splits dense generated contents into genuine physical leaves. No entry is
 * clipped or hidden behind an inner scroller; a continued chapter simply gets
 * another numbered leaf.
 */
export function paginateBookPages<TPage extends BookPageLike>(
  sourcePages: readonly TPage[],
  layout: BookPageLayout,
): TPage[] {
  const result: TPage[] = [];

  sourcePages.forEach((sourcePage) => {
    let fragmentIndex = 0;
    let fragmentSections: BookSectionLike[] = [];
    let usedRows = 0;

    const resetRows = () => {
      // Repeated chapter heading + rule. The very first leaf also prints the
      // large "İçindekiler" heading and fleuron.
      usedRows = 2 + (result.length === 0 ? 2 : 0);
    };

    const flush = () => {
      if (fragmentSections.length === 0) return;
      result.push({
        ...sourcePage,
        id: `${sourcePage.id}--leaf-${fragmentIndex + 1}`,
        continuation: Boolean(sourcePage.continuation || fragmentIndex > 0),
        sections: fragmentSections.map((section) => ({
          ...section,
          entries: [...section.entries],
        })),
      });
      fragmentIndex += 1;
      fragmentSections = [];
      resetRows();
    };

    resetRows();

    sourcePage.sections.forEach((sourceSection) => {
      sourceSection.entries.forEach((entry) => {
        let section = fragmentSections.at(-1);
        const continuesCurrentSection = section?.heading === sourceSection.heading;
        let headingCost = continuesCurrentSection || !sourceSection.heading ? 0 : 1;
        const rows = entryRowCost(entry.label, layout.charactersPerLine);

        if (fragmentSections.length > 0 && usedRows + headingCost + rows > layout.rowBudget) {
          flush();
          section = undefined;
          headingCost = sourceSection.heading ? 1 : 0;
        }

        if (!section || section.heading !== sourceSection.heading) {
          section = { heading: sourceSection.heading, entries: [] };
          fragmentSections.push(section);
          usedRows += headingCost;
        }

        section.entries.push(entry);
        usedRows += rows;
      });
    });

    // Preserve even an intentionally empty chapter page.
    if (fragmentSections.length === 0) {
      fragmentSections = sourcePage.sections.map((section) => ({
        ...section,
        entries: [...section.entries],
      }));
    }
    flush();
  });

  return result;
}
