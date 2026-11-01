import { Link } from "react-router-dom";
import { Bookmark, ChevronRight, History } from "lucide-react";
import { useStudyActivity } from "@/hooks/useStudyActivity";
import type { StudyItem } from "@/lib/studyActivity";

function Row({ item, icon: Icon }: { item: StudyItem; icon: typeof History }) {
  return (
    <Link
      to={item.path}
      className="flex min-h-[3.25rem] items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-colors duration-control hover:bg-primary/5 active:bg-primary/10"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">{item.title}</span>
        <span className="block text-xs text-muted-foreground">{(item.kind as string) === "Personnel" ? "Crew" : item.kind}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

/** "Continue" and "Saved" shortcuts on the home page; hidden until used. */
export function StudyShortcuts() {
  const { recent, saved } = useStudyActivity();
  if (!recent.length && !saved.length) return null;

  return (
    <section aria-labelledby="continue-title" className="space-y-3">
      {recent.length > 0 && (
        <>
          <h2 id="continue-title" className="px-1 text-xl font-semibold tracking-[-0.02em] text-foreground">
            Continue
          </h2>
          <div className="surface-2 rounded-3xl border p-1">
            {recent.slice(0, 3).map((item) => (
              <Row key={item.path} item={item} icon={History} />
            ))}
          </div>
        </>
      )}
      {saved.length > 0 && (
        <Link
          to="/saved"
          className="surface-2 flex items-center gap-3 rounded-3xl border px-4 py-3 transition-colors duration-control hover:bg-primary/5"
        >
          <Bookmark className="h-5 w-5 text-primary" />
          <span className="flex-1 text-sm font-semibold text-foreground">Saved</span>
          <span className="text-sm text-muted-foreground">{saved.length}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      )}
    </section>
  );
}
