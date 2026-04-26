import React, { useState, useEffect, useRef } from 'react';
import { useTextSelection } from '@/hooks/useTextSelection';
import { supabase } from '@/integrations/supabase/safeClient';
import { useLanguage } from '@/contexts/LanguageContext';
import { AIMessage } from '@/services/aiClient';
import { Sparkles, X, Loader2 } from 'lucide-react';

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
      setError('Açıklama alınamadı. Lütfen tekrar deneyin.');
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

  if (!selectedText || !position) return null;

  // Button position: above selection, or below if near top of viewport
  const MARGIN = 8;
  const btnLeft = position.x;
  const btnTop = position.y > 48 ? position.y - 40 : position.y + 24;

  // Panel position: adjust to stay fully within viewport
  const panelTop = Math.max(position.y - 320, MARGIN);
  const panelLeft = Math.min(
    Math.max(position.x - 160, MARGIN),
    window.innerWidth - 328 - MARGIN
  );

  return (
    <>
      {/* Ask AI trigger button */}
      {!showPanel && (
        <button
          data-ask-ai-popup="true"
          onClick={handleAskAI}
          className="fixed z-[9999] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-blue-400/40 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-150 select-none"
          style={{
            left: btnLeft,
            top: btnTop,
            transform: 'translateX(-50%)',
          }}
        >
          <Sparkles className="w-3 h-3" />
          Açıkla
        </button>
      )}

      {/* Response panel */}
      {showPanel && (
        <div
          data-ask-ai-popup="true"
          ref={panelRef}
          className="fixed z-[9999] w-80 rounded-xl shadow-2xl border border-blue-500/30 bg-gray-900/95 backdrop-blur-md overflow-hidden"
          style={{
            left: panelLeft,
            top: Math.max(panelTop, 8),
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-700/80 to-cyan-700/80 border-b border-blue-500/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-semibold text-white">Referans Notu</span>
            </div>
            <button
              data-ask-ai-popup="true"
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Selected text preview */}
          <div className="px-3 py-2 border-b border-white/10">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Seçilen metin</p>
            <p className="text-xs text-gray-300 italic line-clamp-2">"{selectedText}"</p>
          </div>

          {/* AI response */}
          <div className="px-3 py-3 min-h-[80px] max-h-56 overflow-y-auto">
            {loading && (
              <div className="flex items-center gap-2 text-cyan-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Hazırlanıyor...</span>
              </div>
            )}
            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            {answer && !loading && (
              <p className="text-xs text-gray-100 leading-relaxed whitespace-pre-wrap">{answer}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
