export type BookTurnDirection = "forward" | "backward";

export interface BookTurnFrame {
  /** Signed rotation around the book spine. */
  angleDeg: number;
  /** Small z lift that keeps the paper from looking like a rigid card. */
  liftPx: number;
  /** Vertical torsion caused by grabbing above or below the page centre. */
  twistDeg: number;
  /** A subtler in-plane shear that makes the free edge lag behind the hand. */
  skewDeg: number;
  translateYPx: number;
  scaleX: number;
  curl: number;
  shade: number;
  specular: number;
  shadowOpacity: number;
  shadowLeftPercent: number;
  shadowScaleX: number;
  grabYPercent: number;
  topInsetPercent: number;
  bottomInsetPercent: number;
  edgeRadiusPx: number;
}

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

/**
 * Maps a grabbed point to the circular path around the spine. At the halfway
 * point the finger and the free edge are both over the binding; at the end
 * they arrive on the opposite page together. This avoids the common page-flip
 * defect where the paper visually outruns the user's hand.
 */
export function getBookTurnProgressFromContact(
  deltaX: number,
  contactRadius: number,
  direction: BookTurnDirection,
): number {
  const directedDistance = direction === "forward" ? -deltaX : deltaX;
  const radius = Math.max(1, Math.abs(contactRadius));
  const horizontalPosition = clamp(1 - directedDistance / radius, -1, 1);
  return Math.acos(horizontalPosition) / Math.PI;
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

export function getBookTurnSettleDuration(
  progress: number,
  complete: boolean,
  releaseVelocity = 0,
): number {
  const distanceRemaining = complete ? 1 - progress : progress;
  const momentum = clamp(Math.abs(releaseVelocity) / 1.8, 0, 0.44);
  return Math.round((155 + clamp(distanceRemaining, 0, 1) * 315) * (1 - momentum));
}

/**
 * Produces the non-linear paper shape shared by both book renderers.
 *
 * A page is still rendered by the browser as one composited layer, but the
 * combination of a raised arc, off-centre torsion, a deforming free edge and
 * travelling light removes the rigid "rotating card" look. Every value is
 * derived from normalized inputs so route books and library books move alike.
 */
export function getBookTurnFrame(
  progress: number,
  direction: BookTurnDirection,
  grabY = 0.5,
  leafWidth = 320,
  leafHeight = 480,
): BookTurnFrame {
  const p = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  const contactY = clamp(Number.isFinite(grabY) ? grabY : 0.5, 0.04, 0.96);
  const signedDirection = direction === "forward" ? -1 : 1;
  const curl = Math.sin(Math.PI * p);
  const contactOffset = contactY - 0.5;
  const width = Math.max(1, Number.isFinite(leafWidth) ? leafWidth : 320);
  const height = Math.max(1, Number.isFinite(leafHeight) ? leafHeight : 480);

  // The tiny counter-rotation around the midpoint mimics paper springing away
  // from the perfectly circular path of a stiff board.
  const paperSpring = Math.sin(Math.PI * 2 * p) * curl * 2.1;
  const angleDeg = p === 0
    ? 0
    : p === 1
      ? signedDirection * 180
      : signedDirection * (180 * p - paperSpring);
  const liftPx = curl * clamp(width * 0.09, 10, 34);
  const twistDeg = signedDirection * contactOffset * curl * 8.5;
  const skewDeg = signedDirection * contactOffset * curl * 4.2;
  const translateYPx = contactOffset * curl * clamp(height * 0.042, 6, 19);
  const scaleX = 1 - curl * (0.026 + Math.abs(contactOffset) * 0.018);

  // The corner furthest from the hand lags most. These values feed a
  // five-point clip-path, creating a softly pinched free edge during the curl.
  const topInsetPercent = curl * (2.2 + contactY * 7.4);
  const bottomInsetPercent = curl * (2.2 + (1 - contactY) * 7.4);
  const shade = Math.pow(curl, 0.72);
  const specular = Math.pow(curl, 1.18);

  return {
    angleDeg,
    liftPx,
    twistDeg,
    skewDeg,
    translateYPx,
    scaleX,
    curl,
    shade,
    specular,
    shadowOpacity: shade * (0.42 + (0.5 - Math.abs(contactOffset)) * 0.18),
    shadowLeftPercent: 50
      + (direction === "forward" ? 50 : -50) * Math.cos(Math.PI * p),
    shadowScaleX: 0.44 + curl * 0.76,
    grabYPercent: contactY * 100,
    topInsetPercent,
    bottomInsetPercent,
    edgeRadiusPx: 1 + curl * clamp(width * 0.055, 8, 22),
  };
}

/**
 * Momentum-aware settle curve. A slow release has the measured flex of paper;
 * a flick preserves its initial speed, while a faint damped flutter prevents
 * the last frames from feeling mechanically uniform.
 */
export function getBookTurnSettleProgress(
  elapsed: number,
  fromProgress: number,
  complete: boolean,
  releaseVelocity = 0,
): number {
  const t = clamp(Number.isFinite(elapsed) ? elapsed : 0, 0, 1);
  const from = clamp(Number.isFinite(fromProgress) ? fromProgress : 0, 0, 1);
  const target = complete ? 1 : 0;
  const momentum = clamp(Math.abs(releaseVelocity) / 1.4, 0, 1);
  const smooth = t * t * (3 - 2 * t);
  const ballistic = 1 - Math.pow(1 - t, 3);
  const base = smooth * (1 - momentum) + ballistic * momentum;
  const flutter = Math.sin(Math.PI * t) * Math.sin(Math.PI * 3 * t)
    * (1 - t) * 0.009 * (1 - momentum * 0.7);
  const eased = clamp(base + flutter, 0, 1);
  return from + (target - from) * eased;
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
