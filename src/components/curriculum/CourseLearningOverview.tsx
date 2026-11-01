import { Link } from "react-router-dom";
import { getCurriculumCourse } from "@/data/curriculumHierarchy";
import { courseHref, courseLearningGuides } from "@/data/learningGuide";

export function CourseLearningOverview({ courseKey }: { courseKey: string }) {
  const course = getCurriculumCourse(courseKey);
  const guide = courseLearningGuides[courseKey];
  if (!course || !guide) return null;
  return (
    <section className="space-y-4 rounded-2xl border border-primary/20 bg-card p-4 sm:p-5">
      <div className="flex flex-wrap gap-x-4">
        <Link to="/lessons/map" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">Explore the maritime learning map</Link>
        {["stability", "cargo", "seamanship", "safety", "environment", "economics"].includes(courseKey) && <Link to={`/lessons/${courseKey}/reference`} className="inline-flex min-h-11 items-center text-sm text-primary underline">Extended course reference</Link>}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{guide.purpose}</p>
      <div>
        <h2 className="font-semibold">What you will learn</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {guide.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
        </ul>
      </div>
      {guide.before.length > 0 && <div>
        <h3 className="text-sm font-semibold">Useful background</h3>
        <div className="mt-1 flex flex-wrap gap-x-4">
          {guide.before.map((key) => <Link key={key} to={courseHref(key)} className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">{getCurriculumCourse(key)?.title}</Link>)}
        </div>
      </div>}
    </section>
  );
}
