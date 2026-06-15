import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getMaritimeTranslationOverride,
  getMaritimeCorrectionMatcher,
  applyMaritimeCorrections,
} from '@/utils/maritimeGlossary';

interface SupportedLanguage {
  language: string;
  name: string;
  displayName: string;
}

interface LanguageContextType {
  currentLanguage: string;
  supportedLanguages: SupportedLanguage[];
  isLoading: boolean;
  changeLanguage: (languageCode: string) => void;
  getLanguageName: (code: string) => string;
  isRTL: boolean;
  resetLanguagePreferences: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const DEFAULT_LANGUAGE = 'en';
const SOURCE_LANGUAGE = 'tr';

// Supported languages - 25 languages (sorted by international alphabetical order / English name)
const BASE_SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { language: 'tr', name: 'Turkish', displayName: 'Türkçe' },
  { language: 'en', name: 'English', displayName: 'English' },
  { language: 'es', name: 'Spanish', displayName: 'Español' },
  { language: 'de', name: 'German', displayName: 'Deutsch' },
  { language: 'fr', name: 'French', displayName: 'Français' },
  { language: 'it', name: 'Italian', displayName: 'Italiano' },
  { language: 'pt', name: 'Portuguese', displayName: 'Português' },
  { language: 'ru', name: 'Russian', displayName: 'Русский' },
  { language: 'ja', name: 'Japanese', displayName: '日本語' },
  { language: 'ko', name: 'Korean', displayName: '한국어' },
  { language: 'zh-CN', name: 'Chinese (Simplified)', displayName: '中文 (简体)' },
  { language: 'ar', name: 'Arabic', displayName: 'العربية' },
  { language: 'hi', name: 'Hindi', displayName: 'हिन्दी' },
  { language: 'nl', name: 'Dutch', displayName: 'Nederlands' },
  { language: 'sv', name: 'Swedish', displayName: 'Svenska' },
  { language: 'no', name: 'Norwegian', displayName: 'Norsk' },
  { language: 'da', name: 'Danish', displayName: 'Dansk' },
  { language: 'fi', name: 'Finnish', displayName: 'Suomi' },
  { language: 'pl', name: 'Polish', displayName: 'Polski' },
  { language: 'cs', name: 'Czech', displayName: 'Čeština' },
  { language: 'hu', name: 'Hungarian', displayName: 'Magyar' },
  { language: 'ro', name: 'Romanian', displayName: 'Română' },
  { language: 'el', name: 'Greek', displayName: 'Ελληνικά' },
  { language: 'bg', name: 'Bulgarian', displayName: 'Български' },
  { language: 'uk', name: 'Ukrainian', displayName: 'Українська' }
];
const SUPPORTED_LANGUAGES: SupportedLanguage[] = [...BASE_SUPPORTED_LANGUAGES].sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
);

interface LanguageProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const scriptLoadedRef = useRef(false);
  const translationCacheRef = useRef<Map<string, string>>(new Map());
  const translationRunIdRef = useRef(0);
  const maritimeObserverRef = useRef<MutationObserver | null>(null);
  const maritimeFlushHandleRef = useRef<number | null>(null);
  const maritimePendingNodesRef = useRef<Set<Text>>(new Set());
  // Keeps the long-lived MutationObserver/flush callbacks reading the active
  // language instead of a value captured when the observer was created.
  const currentLanguageRef = useRef<string>(DEFAULT_LANGUAGE);

  // RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  // Always expose the latest language to the long-lived observer callbacks.
  currentLanguageRef.current = currentLanguage;

  useEffect(() => {
    // Simple initialization without DOM manipulation
    const savedLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
    const validLanguage = SUPPORTED_LANGUAGES.find(lang => lang.language === savedLanguage) 
      ? savedLanguage 
      : DEFAULT_LANGUAGE;
    
    setCurrentLanguage(validLanguage);
    setIsLoading(false);
  }, []);

  const setGoogleTranslateCookie = (languageCode: string) => {
    const target = languageCode === SOURCE_LANGUAGE ? `/${SOURCE_LANGUAGE}/${SOURCE_LANGUAGE}` : `/${SOURCE_LANGUAGE}/${languageCode}`;
    document.cookie = `googtrans=${target};path=/;max-age=31536000`;
    document.cookie = `googtrans=${target};domain=.${window.location.hostname};path=/;max-age=31536000`;
  };

  const applyGoogleTranslateLanguage = (languageCode: string, reloadIfComboMissing: boolean = true) => {
    if (typeof document === 'undefined') return;
    setGoogleTranslateCookie(languageCode);
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = languageCode;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    // Fallback for first language switch before widget mounts
    if (reloadIfComboMissing) {
      window.location.reload();
    }
  };

  const initGoogleTranslate = () => {
    if (typeof document === 'undefined') return;
    if (scriptLoadedRef.current) return;

    if (!document.getElementById('google_translate_element')) {
      const container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    window.googleTranslateElementInit = () => {
      const includedLanguages = SUPPORTED_LANGUAGES.map(lang => lang.language).join(',');
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: SOURCE_LANGUAGE,
            includedLanguages,
            autoDisplay: false,
          },
          'google_translate_element'
        );

        const preferredLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
        if (preferredLanguage !== SOURCE_LANGUAGE) {
          setTimeout(() => {
            applyGoogleTranslateLanguage(preferredLanguage, false);
          }, 300);
        }
      }
    };

    if (document.getElementById('google-translate-script')) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    scriptLoadedRef.current = true;
    document.body.appendChild(script);
  };

  const translateText = async (text: string, languageCode: string): Promise<string> => {
    const normalizedText = text.trim();
    if (!normalizedText) return text;
    if (languageCode === SOURCE_LANGUAGE) return normalizedText;

    const cacheKey = `${languageCode}:${normalizedText}`;
    const cached = translationCacheRef.current.get(cacheKey);
    if (cached) return cached;

    // Maritime terminology takes precedence over generic machine translation,
    // so the core nautical vocabulary is always rendered with the correct
    // professional term (e.g. "Sancak Tarafı" -> "Starboard side", not "Banner").
    const maritimeOverride = getMaritimeTranslationOverride(normalizedText, languageCode);
    if (maritimeOverride) {
      translationCacheRef.current.set(cacheKey, maritimeOverride);
      return maritimeOverride;
    }

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANGUAGE}&tl=${encodeURIComponent(languageCode)}&dt=t&q=${encodeURIComponent(normalizedText)}`
      );
      const data = await response.json();
      const translated = Array.isArray(data?.[0])
        ? data[0].map((item: [string]) => item[0]).join('')
        : normalizedText;
      translationCacheRef.current.set(cacheKey, translated);
      return translated;
    } catch (error) {
      console.error('Metin çevirisi alınamadı:', error);
      return normalizedText;
    }
  };

  const translateMarkedContent = async (languageCode: string) => {
    if (typeof document === 'undefined') return;

    const runId = ++translationRunIdRef.current;
    const translatableElements = Array.from(document.querySelectorAll<HTMLElement>('[data-translatable]'))
      .filter((el) => !el.closest('[data-no-translate]'));

    for (const el of translatableElements) {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent?.trim() || '';
      }

      if (languageCode === SOURCE_LANGUAGE) {
        el.textContent = el.dataset.originalText;
        continue;
      }

      const translated = await translateText(el.dataset.originalText, languageCode);
      if (translationRunIdRef.current !== runId) return;
      el.textContent = translated;
    }

    const placeholderElements = Array.from(document.querySelectorAll<HTMLElement>('[data-translatable-placeholder]'));
    for (const el of placeholderElements) {
      if (translationRunIdRef.current !== runId) return;

      const input = el as HTMLInputElement;
      if (!input.dataset.originalPlaceholder) {
        input.dataset.originalPlaceholder = input.placeholder;
      }

      if (languageCode === SOURCE_LANGUAGE) {
        input.placeholder = input.dataset.originalPlaceholder || '';
        continue;
      }

      input.placeholder = await translateText(input.dataset.originalPlaceholder || '', languageCode);
    }
  };

  // ── Maritime terminology correction layer (on top of page-wide translation) ──
  // The Google Translate widget translates the whole DOM but cannot be given a
  // maritime glossary. This layer scans the translated text nodes and fixes
  // maritime terms (e.g. leftover Turkish "Pruva" -> "Bow") in every language.
  const MARITIME_SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT',
    'OPTION', 'CODE', 'PRE', 'KBD', 'SAMP',
  ]);

  const shouldSkipTextNode = (node: Text): boolean => {
    let el: HTMLElement | null = node.parentElement;
    if (!el) return true;
    while (el) {
      if (MARITIME_SKIP_TAGS.has(el.tagName)) return true;
      if (el.isContentEditable) return true;
      const id = el.id;
      const className = typeof el.className === 'string' ? el.className : '';
      if (id === 'google_translate_element') return true;
      // Skip the Google Translate UI/banner chrome.
      if (className.includes('skiptranslate') || className.includes('goog-te')) return true;
      if (el.hasAttribute('data-no-translate')) return true;
      el = el.parentElement;
    }
    return false;
  };

  const correctTextNodes = (nodes: Iterable<Text>, languageCode: string) => {
    const observer = maritimeObserverRef.current;
    // Detach while we mutate so our own edits don't re-trigger the observer.
    observer?.disconnect();
    try {
      for (const node of nodes) {
        if (!node.isConnected) continue;
        const value = node.nodeValue;
        if (!value || !value.trim()) continue;
        if (shouldSkipTextNode(node)) continue;
        const corrected = applyMaritimeCorrections(value, languageCode);
        if (corrected !== value) node.nodeValue = corrected;
      }
    } finally {
      if (observer && typeof document !== 'undefined') {
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      }
    }
  };

  const flushMaritimeCorrections = () => {
    maritimeFlushHandleRef.current = null;
    const pending = maritimePendingNodesRef.current;
    if (pending.size === 0) return;
    const nodes = Array.from(pending);
    pending.clear();
    correctTextNodes(nodes, currentLanguageRef.current);
  };

  const scheduleMaritimeFlush = () => {
    if (maritimeFlushHandleRef.current !== null) return;
    const schedule = (cb: FrameRequestCallback): number =>
      typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
        ? window.requestAnimationFrame(cb)
        : window.setTimeout(() => cb(performance.now()), 50);
    maritimeFlushHandleRef.current = schedule(() => flushMaritimeCorrections());
  };

  const collectTextNodes = (root: Node, into: Set<Text>) => {
    if (root.nodeType === Node.TEXT_NODE) {
      into.add(root as Text);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current = walker.nextNode();
    while (current) {
      into.add(current as Text);
      current = walker.nextNode();
    }
  };

  // Full-document correction pass (used on language change / first run).
  const runFullMaritimeCorrection = (languageCode: string) => {
    if (typeof document === 'undefined' || !document.body) return;
    if (!getMaritimeCorrectionMatcher(languageCode)) return;
    const nodes = new Set<Text>();
    collectTextNodes(document.body, nodes);
    correctTextNodes(nodes, languageCode);
  };

  const ensureMaritimeObserver = () => {
    if (typeof document === 'undefined' || maritimeObserverRef.current) return;
    const observer = new MutationObserver((mutations) => {
      if (!getMaritimeCorrectionMatcher(currentLanguageRef.current)) return;
      const pending = maritimePendingNodesRef.current;
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
          pending.add(mutation.target as Text);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((added) => collectTextNodes(added, pending));
        }
      }
      if (pending.size > 0) scheduleMaritimeFlush();
    });
    maritimeObserverRef.current = observer;
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  const changeLanguage = (languageCode: string) => {
    if (languageCode === currentLanguage) return;

    const isValidLanguage = SUPPORTED_LANGUAGES.find(lang => lang.language === languageCode);
    if (!isValidLanguage) return;

    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
    applyGoogleTranslateLanguage(languageCode);

    toast({
      title: "Dil Değiştirildi",
      description: `Uygulama dili ${getLanguageName(languageCode)} olarak değiştirildi`,
    });
  };

  // Initialize Google Translate widget once
  useEffect(() => {
    if (typeof document === 'undefined') return;
    initGoogleTranslate();
  }, []);

  // Update document language/dir when language changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  useEffect(() => {
    if (isLoading) return;
    translateMarkedContent(currentLanguage);
  }, [currentLanguage, isLoading]);

  // Maritime terminology correction: observe DOM and fix terms app-wide.
  useEffect(() => {
    if (typeof document === 'undefined' || isLoading) return;
    ensureMaritimeObserver();
    // Re-run a full pass shortly after a language switch so it lands after the
    // Google widget has retranslated the page.
    runFullMaritimeCorrection(currentLanguage);
    const timers = [150, 600, 1500].map((delay) =>
      window.setTimeout(() => runFullMaritimeCorrection(currentLanguage), delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, isLoading]);

  // Tear down the observer when the provider unmounts.
  useEffect(() => {
    return () => {
      maritimeObserverRef.current?.disconnect();
      maritimeObserverRef.current = null;
      if (maritimeFlushHandleRef.current !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame?.(maritimeFlushHandleRef.current);
        window.clearTimeout(maritimeFlushHandleRef.current);
      }
    };
  }, []);

  const getLanguageName = (code: string): string => {
    return SUPPORTED_LANGUAGES.find(lang => lang.language === code)?.displayName || code;
  };

  const resetLanguagePreferences = () => {
    localStorage.removeItem('preferredLanguage');
    setCurrentLanguage(DEFAULT_LANGUAGE);
    
    toast({
      title: "Ayarlar Sıfırlandı",
      description: "Dil ayarları varsayılan değerlere döndürüldü",
    });
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading,
    changeLanguage,
    getLanguageName,
    isRTL,
    resetLanguagePreferences,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translation utility (no hooks, no re-renders)
// This is kept for backwards compatibility but doesn't use the API
export const getTranslation = (key: string, defaultText: string = '', language: string = DEFAULT_LANGUAGE) => {
  return defaultText;
};
