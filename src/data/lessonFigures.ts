/**
 * Code-drawn lesson figures.
 *
 * A lesson section may name one of these instead of (or next to) an image. The
 * figure is drawn in code by `src/components/lessons/figures/LessonFigure.tsx`,
 * so its geometry and timing follow the stated standard exactly; there is no
 * raster or AI-generated artwork behind it.
 */
export type LessonFigureId =
  | "light-notation"
  | "light-rhythms-basic"
  | "light-rhythms-quick"
  | "light-rhythms-cardinal"
  | "light-rhythms-marks"
  | "light-sectors"
  | "leading-lights"
  | "light-range-calculator";
