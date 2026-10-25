import type { LessonFigureId } from "@/data/lessonFigures";
import { LeadingLightsFigure } from "./LeadingLightsFigure";
import { LightNotationFigure } from "./LightNotationFigure";
import { LightRangeCalculator } from "./LightRangeCalculator";
import { LightRhythmFigure } from "./LightRhythmFigure";
import { LightSectorFigure } from "./LightSectorFigure";

/** Renders the code-drawn figure a lesson section names. */
export function LessonFigure({ id }: { id: LessonFigureId }) {
  switch (id) {
    case "light-notation":
      return <LightNotationFigure />;
    case "light-rhythms-basic":
      return <LightRhythmFigure set="basic" />;
    case "light-rhythms-quick":
      return <LightRhythmFigure set="quick" />;
    case "light-rhythms-cardinal":
      return <LightRhythmFigure set="cardinal" />;
    case "light-rhythms-marks":
      return <LightRhythmFigure set="marks" />;
    case "light-sectors":
      return <LightSectorFigure />;
    case "leading-lights":
      return <LeadingLightsFigure />;
    case "light-range-calculator":
      return <LightRangeCalculator />;
  }
}
