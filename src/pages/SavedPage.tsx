import { Link } from "react-router-dom";
import { Bookmark, ChevronRight, Trash2 } from "lucide-react";
import { useStudyActivity } from "@/hooks/useStudyActivity";
import { removeSaved } from "@/lib/studyActivity";

export default function SavedPage() {
  const { saved } = useStudyActivity();

  return (
    <main data-page-path="/saved" className="mx-auto w-full max-w-2xl space-y-5 px-4 pb-28 pt-[calc(var(--safe-top)+4rem)]">
      <h1 data-page-title className="text-3xl font-bold tracking-[-0.03em] text-foreground">Saved</h1>

      {saved.length === 0 ? (
        <div className="surface-2 flex flex-col items-center gap-3 rounded-3xl border px-6 py-10 text-center">
          <Bookmark className="h-8 w-8 text-primary" />
          <p className="text-sm text-muted-foreground">
            Tap the bookmark at the top of any lesson or exercise to keep it here.
          </p>
        </div>
      ) : (
        <ul className="surface-2 divide-y divide-border rounded-3xl border">
          {saved.map((item) => (
            <li key={item.path} className="flex items-center gap-2 pr-2">
              <Link to={item.path} className="flex min-h-[3.5rem] min-w-0 flex-1 items-center gap-3 px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">{item.kind}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
              <button
                type="button"
                onClick={() => removeSaved(item.path)}
                aria-label={`Remove ${item.title}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
