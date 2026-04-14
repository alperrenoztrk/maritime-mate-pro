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

function getSelectionPosition(): SelectionPosition | null {
  try {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    // rect coordinates are already viewport-relative, matching fixed positioning
    if (rect.width === 0 && rect.height === 0) return null;
    return {
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
  } catch {
    return null;
  }
}

export function useTextSelection(): TextSelectionResult {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<SelectionPosition | null>(null);

  const clearSelection = useCallback(() => {
    setSelectedText('');
    setPosition(null);
  }, []);

  useEffect(() => {
    // Desktop: mouseup
    const handleMouseUp = (e: MouseEvent) => {
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim() ?? '';

        if (text.length > 0) {
          const pos = getSelectionPosition();
          if (pos) {
            setSelectedText(text);
            setPosition(pos);
          }
        } else {
          const target = e.target as HTMLElement;
          if (!target.closest('[data-ask-ai-popup]')) {
            setSelectedText('');
            setPosition(null);
          }
        }
      }, 10);
    };

    // Mobile: touchend — longer delay for selection to finalize
    const handleTouchEnd = (e: TouchEvent) => {
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim() ?? '';

        if (text.length > 0) {
          const pos = getSelectionPosition();
          if (pos) {
            setSelectedText(text);
            setPosition(pos);
          }
        } else {
          const target = e.target as HTMLElement;
          if (!target.closest('[data-ask-ai-popup]')) {
            setSelectedText('');
            setPosition(null);
          }
        }
      }, 350);
    };

    // Universal fallback: selectionchange fires on both desktop and mobile
    // when the user finishes adjusting selection handles
    let selectionChangeTimer: ReturnType<typeof setTimeout>;
    const handleSelectionChange = () => {
      clearTimeout(selectionChangeTimer);
      selectionChangeTimer = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim() ?? '';
        if (text.length > 0) {
          const pos = getSelectionPosition();
          if (pos) {
            setSelectedText(text);
            setPosition(pos);
          }
        }
        // Do NOT clear here — clearing is handled by mouseup/touchend
        // to avoid fighting with click-on-popup interactions
      }, 400);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('selectionchange', handleSelectionChange);
      clearTimeout(selectionChangeTimer);
    };
  }, []);

  return { selectedText, position, clearSelection };
}
