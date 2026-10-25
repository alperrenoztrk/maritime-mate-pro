import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { STCW_STUDY_PATHS, stcwStudyHref } from "@/data/stcwStudyPaths";

export default function StcwStudyPathsPage() {
  return (
    <LibraryPageShell title="STCW study pathways" icon={GraduationCap} maxWidth="max-w-4xl">
      <SEO title="STCW study pathways — Mariner's Book" description="Find a structured deck or engine learning sequence tied to broad STCW competence areas." path="/stcw-study-paths" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        Choose your department and follow a suggested reading order. These paths organise existing lessons around
        selected competence areas; they are not an approved STCW course, a complete syllabus, or a certificate.
        Check the current national administration requirements for your qualification.
      </p>
      <div className="space-y-6">
        {STCW_STUDY_PATHS.map((path) => (
          <section key={path.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/85">
            <div className="border-b border-border/60 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{path.title}</h2>
              </div>
              <p className="mt-1 text-sm font-medium text-primary">{path.standard}</p>
              <p className="mt-1 text-sm text-muted-foreground">{path.audience}</p>
            </div>
            <ol className="divide-y divide-border/50">
              {path.steps.map((step, index) => (
                <li key={step.id}>
                  <Link
                    to={stcwStudyHref(step.courseKey)}
                    className="flex min-h-16 items-start gap-3 p-4 transition-colors hover:bg-muted/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{step.focus}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{step.reason}</span>
                    </span>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link to="/lessons/map" className="font-medium text-primary underline-offset-4 hover:underline">Full maritime learning map</Link>
        <Link to="/exercises" className="font-medium text-primary underline-offset-4 hover:underline">Practice questions</Link>
        <Link to="/exam-preparation" className="font-medium text-primary underline-offset-4 hover:underline">Unofficial exam practice</Link>
      </div>
    </LibraryPageShell>
  );
}
