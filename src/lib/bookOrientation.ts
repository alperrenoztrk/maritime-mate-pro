/**
 * Coordinate helpers for the rotated book surface. When the landscape lock is
 * unavailable, BookLandscapeGate draws the book rotated 90° inside a portrait
 * viewport (`rotate(90deg) translateY(-100%)`, origin top left). Under that
 * transform the book's layout x axis runs down the physical screen and its
 * layout y axis runs toward the physical left, so raw pointer/wheel deltas
 * must be remapped before any page-turn math sees them.
 */

export type BookSurfaceOrientation = "natural" | "rotated";

/** Reads the live gate mode from the nearest gate wrapper. */
export function getBookSurfaceOrientation(element: Element | null): BookSurfaceOrientation {
  const mode = element
    ?.closest("[data-book-landscape-mode]")
    ?.getAttribute("data-book-landscape-mode");
  return mode === "rotated" ? "rotated" : "natural";
}

/** Screen-space delta → book-space delta. rotate(90deg): book +x = screen +y, book +y = screen −x. */
export function mapBookDelta(
  deltaX: number,
  deltaY: number,
  orientation: BookSurfaceOrientation,
): { deltaX: number; deltaY: number } {
  return orientation === "rotated" ? { deltaX: deltaY, deltaY: -deltaX } : { deltaX, deltaY };
}

/**
 * Client point → element-local point in the element's LAYOUT axes (px).
 * `rect` is the element's screen-projected bounding box; when rotated, the
 * element's layout left edge lies along the box's top edge.
 */
export function mapBookPointToLocal(
  clientX: number,
  clientY: number,
  rect: Pick<DOMRect, "top" | "left" | "right">,
  orientation: BookSurfaceOrientation,
): { x: number; y: number } {
  return orientation === "rotated"
    ? { x: clientY - rect.top, y: rect.right - clientX }
    : { x: clientX - rect.left, y: clientY - rect.top };
}
