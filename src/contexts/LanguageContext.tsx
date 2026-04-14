import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { backendUrl, backendPublishableKey } from '@/integrations/supabase/safeClient';

interface SupportedLanguage {
  language: string;
  name: string;
  displayName: string;
}

interface LanguageContextType {
  currentLanguage: string;
  supportedLanguages: SupportedLanguage[];
  isLoading: boolean;
  isTranslating: boolean;
  changeLanguage: (languageCode: string) => void;
  getLanguageName: (code: string) => string;
  isRTL: boolean;
  resetLanguagePreferences: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const DEFAULT_LANGUAGE = 'en';
const SOURCE_LANGUAGE = 'tr';

// Supported languages
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

// App-wide translation cache: lang -> Map<originalText, translatedText>
const globalTranslationCache = new Map<string, Map<string, string>>();

// Batch translate via edge function
const TRANSLATE_URL = `${backendUrl}/functions/v1/translate`;

async function batchTranslate(
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = SOURCE_LANGUAGE
): Promise<string[]> {
  if (targetLanguage === sourceLanguage) return texts;
  if (texts.length === 0) return [];

  // Check cache first
  const langCache = globalTranslationCache.get(targetLanguage) || new Map<string, string>();
  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];
  const results: string[] = [...texts];

  for (let i = 0; i < texts.length; i++) {
    const cached = langCache.get(texts[i]);
    if (cached) {
      results[i] = cached;
    } else {
      uncachedIndices.push(i);
      uncachedTexts.push(texts[i]);
    }
  }

  if (uncachedTexts.length === 0) return results;

  // Batch in chunks of 50 to avoid oversized requests
  const BATCH_SIZE = 50;
  for (let start = 0; start < uncachedTexts.length; start += BATCH_SIZE) {
    const batchTexts = uncachedTexts.slice(start, start + BATCH_SIZE);
    const batchIndicesInUncached = uncachedIndices.slice(start, start + BATCH_SIZE);

    try {
      const response = await fetch(TRANSLATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': backendPublishableKey,
        },
        body: JSON.stringify({
          texts: batchTexts,
          targetLanguage,
          sourceLanguage,
        }),
      });

      if (!response.ok) {
        console.error(`Translation API error: ${response.status}`);
        continue;
      }

      const data = await response.json();
      const translations: string[] = data.translations || batchTexts;

      for (let j = 0; j < translations.length; j++) {
        const originalIdx = batchIndicesInUncached[j];
        results[originalIdx] = translations[j];
        langCache.set(texts[originalIdx], translations[j]);
      }
    } catch (error) {
      console.error('Translation batch failed:', error);
    }
  }

  globalTranslationCache.set(targetLanguage, langCache);
  return results;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();
  const translationRunIdRef = useRef(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || DEFAULT_LANGUAGE;
    const validLanguage = SUPPORTED_LANGUAGES.find(lang => lang.language === savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
    setCurrentLanguage(validLanguage);
    setIsLoading(false);
  }, []);

  // Collect all translatable text from the entire DOM
  const collectTranslatableElements = useCallback(() => {
    if (typeof document === 'undefined') return { elements: [], texts: [] };

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-translatable]')
    ).filter(el => !el.closest('[data-no-translate]'));

    // Store original text on first encounter
    for (const el of elements) {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent?.trim() || '';
      }
    }

    const texts = elements.map(el => el.dataset.originalText || '');
    return { elements, texts };
  }, []);

  // Collect translatable placeholders
  const collectPlaceholderElements = useCallback(() => {
    if (typeof document === 'undefined') return { elements: [], texts: [] };

    const elements = Array.from(
      document.querySelectorAll<HTMLInputElement>('[data-translatable-placeholder]')
    );

    for (const el of elements) {
      if (!el.dataset.originalPlaceholder) {
        el.dataset.originalPlaceholder = el.placeholder;
      }
    }

    const texts = elements.map(el => el.dataset.originalPlaceholder || '');
    return { elements, texts };
  }, []);

  // Translate the entire app at once
  const translateApp = useCallback(async (languageCode: string) => {
    if (typeof document === 'undefined') return;

    const runId = ++translationRunIdRef.current;

    // Source language = no translation needed, restore originals
    if (languageCode === SOURCE_LANGUAGE) {
      const { elements } = collectTranslatableElements();
      for (const el of elements) {
        el.textContent = el.dataset.originalText || '';
      }
      const { elements: phElements } = collectPlaceholderElements();
      for (const el of phElements) {
        el.placeholder = el.dataset.originalPlaceholder || '';
      }
      return;
    }

    setIsTranslating(true);

    try {
      // Collect ALL translatable content across the app
      const { elements, texts } = collectTranslatableElements();
      const { elements: phElements, texts: phTexts } = collectPlaceholderElements();

      const allTexts = [...texts, ...phTexts].filter(t => t.length > 0);

      if (allTexts.length === 0) {
        setIsTranslating(false);
        return;
      }

      // Translate everything in one batch call
      const allTranslations = await batchTranslate(allTexts, languageCode);

      // Abort if a newer translation request started
      if (translationRunIdRef.current !== runId) return;

      // Apply all translations at once (atomic update)
      const textCount = texts.length;
      for (let i = 0; i < elements.length; i++) {
        if (texts[i].length > 0) {
          elements[i].textContent = allTranslations[i] || texts[i];
        }
      }

      for (let i = 0; i < phElements.length; i++) {
        if (phTexts[i].length > 0) {
          phElements[i].placeholder = allTranslations[textCount + i] || phTexts[i];
        }
      }
    } catch (error) {
      console.error('App-wide translation failed:', error);
    } finally {
      if (translationRunIdRef.current === runId) {
        setIsTranslating(false);
      }
    }
  }, [collectTranslatableElements, collectPlaceholderElements]);

  // Watch for DOM changes and re-translate new elements
  useEffect(() => {
    if (isLoading || currentLanguage === SOURCE_LANGUAGE) return;

    // Initial translation
    translateApp(currentLanguage);

    // Observe DOM mutations to catch route changes / lazy-loaded content
    observerRef.current?.disconnect();

    const observer = new MutationObserver(() => {
      // Debounce: wait for DOM to settle
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
      translationTimeoutRef.current = setTimeout(() => {
        // Only translate newly added elements (those without translations applied)
        translateApp(currentLanguage);
      }, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
    };
  }, [currentLanguage, isLoading, translateApp]);

  // Update document language/dir
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  const changeLanguage = useCallback((languageCode: string) => {
    if (languageCode === currentLanguage) return;
    const isValidLanguage = SUPPORTED_LANGUAGES.find(lang => lang.language === languageCode);
    if (!isValidLanguage) return;

    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);

    toast({
      title: "Dil Değiştirildi",
      description: `Uygulama dili ${getLanguageName(languageCode)} olarak değiştirildi`,
    });
  }, [currentLanguage, toast]);

  const getLanguageName = (code: string): string => {
    return SUPPORTED_LANGUAGES.find(lang => lang.language === code)?.displayName || code;
  };

  const resetLanguagePreferences = useCallback(() => {
    localStorage.removeItem('preferredLanguage');
    setCurrentLanguage(DEFAULT_LANGUAGE);
    toast({
      title: "Ayarlar Sıfırlandı",
      description: "Dil ayarları varsayılan değerlere döndürüldü",
    });
  }, [toast]);

  const contextValue: LanguageContextType = {
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading,
    isTranslating,
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

export const getTranslation = (key: string, defaultText: string = '', language: string = DEFAULT_LANGUAGE) => {
  return defaultText;
};
