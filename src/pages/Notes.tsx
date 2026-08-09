import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { StickyNote, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EmptyState } from "@/components/state/AppState";
import {
  getNotes,
  deleteNote,
  NOTES_UPDATED_EVENT,
  type SavedNote,
} from "@/lib/notesStorage";

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

const Notes = () => {
  const [notes, setNotes] = useState<SavedNote[]>(() => getNotes());

  useEffect(() => {
    const refresh = () => setNotes(getNotes());
    window.addEventListener(NOTES_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(NOTES_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // Group notes by category, keeping categories ordered by their newest note.
  const groups = useMemo(() => {
    const map = new Map<string, SavedNote[]>();
    for (const note of notes) {
      const list = map.get(note.category);
      if (list) list.push(note);
      else map.set(note.category, [note]);
    }
    return Array.from(map.entries());
  }, [notes]);

  const handleDelete = (id: string) => {
    deleteNote(id);
    toast.success("Not silindi");
  };

  return (
    <MobileLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <StickyNote className="h-9 w-9 text-amber-300" strokeWidth={1.8} />
              <h1 className="text-3xl font-bold text-amber-300">
                <span data-translatable>Notlarım</span>
              </h1>
            </div>
          </div>

          {notes.length === 0 ? (
            <EmptyState
              icon={StickyNote}
              title={<span data-translatable>Henüz kaydedilmiş notunuz yok.</span>}
              description={
                <span data-translatable>
                  Herhangi bir sayfada metin seçin ve beliren "Kaydet" düğmesine
                  dokunun; not burada kategorisine göre görünür.
                </span>
              }
            />
          ) : (
            <Accordion
              type="multiple"
              className="space-y-3"
            >
              {groups.map(([category, categoryNotes]) => (
                <AccordionItem
                  key={category}
                  value={category}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-base font-semibold text-white"
                        data-translatable
                      >
                        {category}
                      </span>
                      <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">
                        {categoryNotes.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {categoryNotes.map((note) => (
                      <Card
                        key={note.id}
                        className="border-white/10 bg-white/5 backdrop-blur-sm"
                      >
                        <CardContent className="space-y-3 p-4">
                          <p className="text-sm italic leading-relaxed text-white/90 line-clamp-4">
                            "{note.text}"
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
                            <span className="truncate">
                              {note.pageTitle}
                              {" · "}
                              {formatDate(note.createdAt)}
                            </span>
                            <div className="flex items-center gap-1">
                              <Link
                                to={note.pathname}
                                className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 font-medium text-white/80 transition-colors hover:bg-white/10"
                              >
                                <span data-translatable>Sayfaya git</span>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(note.id)}
                                aria-label="Notu sil"
                                className="h-7 w-7 text-white/50 hover:bg-red-500/15 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notes;
