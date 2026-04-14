import { useState, useEffect, useCallback } from 'react';

export interface SelectionPosition {
  x: number;
  y: number;
}

export interface TextSelectionResult {
  selectedText: string;
  position: SelectionPosition | null;
  clearSelection: () => void;
}

export function useTextSelection(): TextSelectionResult {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<SelectionPosition | null>(null);

  const clearSelection = useCallback(() => {
    setSelectedText('');
    setPosition(null);
  }, []);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Small delay so selection is finalized
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim() ?? '';

        if (text.length > 0) {
          const range = selection?.getRangeAt(0);
          if (range) {
            const rect = range.getBoundingClientRect();
            setSelectedText(text);
            setPosition({
              x: rect.left + rect.width / 2 + window.scrollX,
              y: rect.top + window.scrollY,
            });
          }
        } else {
          // Only clear if not clicking the popup itself
          const target = e.target as HTMLElement;
          if (!target.closest('[data-ask-ai-popup]')) {
            setSelectedText('');
            setPosition(null);
          }
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return { selectedText, position, clearSelection };
}
