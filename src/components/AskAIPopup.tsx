import React, { useState, useEffect, useRef } from 'react';
import { useTextSelection } from '@/hooks/useTextSelection';
import { supabase } from '@/integrations/supabase/safeClient';
import { useLanguage } from '@/contexts/useLanguage';
import { AIMessage } from '@/services/aiClient';
import { Sparkles, X, Loader2, Highlighter } from 'lucide-react';
import { toast } from 'sonner';
import { addNote } from '@/lib/notesStorage';
import { ReportAiContentButton } from '@/components/ai/ReportAiContentButton';

async function askGeminiAboutText(text: string, language: string): Promise<string> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: `You are a helpful maritime expert assistant. The user has selected some text and wants a brief explanation or insight about it. Respond concisely (2-4 sentences max). Always respond in the same language as the selected text or in ${language} language if unclear.`,
    },
    {
      role: 'user',
      content: `Please explain or provide insight about this selected text: "${text}"`,
    },
  ];

  const { data, error } = await supabase.functions.invoke('gemini-chat', {
    body: { messages },
  });

  if (error) throw error;
  return (data?.text || data?.answer || '').toString().trim();
}

export function AskAIPopup() {
  const { selectedText, position, clearSelection } = useTextSelection();
  const { currentLanguage } = useLanguage();

  const [showPanel, setShowPanel] = useState(false);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const lastTextRef = useRef('');

  // Reset panel when selection changes
  useEffect(() => {
    if (selectedText !== lastTextRef.current) {
      setShowPanel(false);
      setAnswer('');
      setError('');
      lastTextRef.current = selectedText;
    }
  }, [selectedText]);

  const handleAskAI = async () => {
    if (!selectedText) return;
    setShowPanel(true);
    setLoading(true);
    setAnswer('');
    setError('');
    try {
      const result = await askGeminiAboutText(selectedText, currentLanguage);
      setAnswer(result);
    } catch {
      setError('No explanation received. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowPanel(false);
    setAnswer('');
    setError('');
    clearSelection();
  };

  const handleSaveNote = () => {
    if (!selectedText) return;
    addNote(selectedText);
    toast.success('note saved');
    clearSelection();
  };

  if (!selectedText || !position) return null;

  // Hide the "save" action on the Notes page itself (avoid recursive saving)
  const onNotesPage =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/notes');

  // Keep the floating action group inside the viewport even when selection is
  // close to a curved screen edge.
  const btnLeft = Math.min(window.innerWidth - 96, Math.max(96, position.x));
  const btnTop = position.y > 48 ? position.y - 40 : position.y + 24;

  return (
    <>
      {/* Selection action buttons */}
      {!showPanel && (
        <div
          data-ask-ai-popup="true"
          className="surface-glass fixed z-[9999] flex select-none items-center gap-1 rounded-xl border p-1 shadow-elev-3"
          style={{
            left: btnLeft,
            top: btnTop,
            transform: 'translateX(-50%)',
          }}
        >
          <button
            data-ask-ai-popup="true"
            onClick={handleAskAI}
            className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-primary transition-colors duration-control hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" />
            explain
          </button>
          {!onNotesPage && (
            <button
              data-ask-ai-popup="true"
              onClick={handleSaveNote}
              className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-foreground transition-colors duration-control hover:bg-muted"
            >
              <Highlighter className="h-4 w-4 text-amber-500" />
              Save
            </button>
          )}
        </div>
      )}

      {/* Response panel */}
      {showPanel && (
        <div
          data-ask-ai-popup="true"
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-slate-950/55 sm:items-center sm:p-6"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) handleClose();
          }}
        >
          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Selected text description"
            className="surface-3 w-full max-w-lg overflow-hidden rounded-t-3xl border border-b-0 shadow-elev-3 sm:rounded-2xl sm:border"
          >
            <div className="flex min-h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold text-foreground">Referans Notu</span>
              </div>
              <button
                type="button"
                data-ask-ai-popup="true"
                onClick={handleClose}
                aria-label="Close"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-control hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b px-4 py-3">
              <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-muted-foreground">Selected text</p>
              <p className="line-clamp-3 text-sm italic leading-relaxed text-foreground/75">“{selectedText}”</p>
            </div>

            <div className="max-h-[55svh] min-h-28 overflow-y-auto px-4 py-4 pb-[max(1rem,var(--safe-bottom))]">
              {loading && (
                <div className="flex min-h-20 items-center gap-3 text-primary" aria-live="polite">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-base">Getting ready...</span>
                </div>
              )}
              {error && <p className="text-base text-destructive">{error}</p>}
              {answer && !loading && (
                <>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">{answer}</p>
                  <ReportAiContentButton
                    surface="ask_ai"
                    content={answer}
                    prompt={selectedText}
                    className="mt-3 min-h-11 px-2"
                  />
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
