import { createContext } from "react";

export type LanguageChangePhase = "idle" | "harvest" | "translate";

export interface SupportedLanguage {
  language: string;
  name: string;
  displayName: string;
}

export interface LanguageContextValue {
  currentLanguage: string;
  supportedLanguages: SupportedLanguage[];
  isLoading: boolean;
  changeLanguage: (languageCode: string) => Promise<void>;
  getLanguageName: (code: string) => string;
  isRTL: boolean;
  resetLanguagePreferences: () => void;
  isChangingLanguage: boolean;
  changeProgress: number;
  changePhase: LanguageChangePhase;
  readyRouteTranslation: string | null;
  translateRouteRoot: (root: HTMLElement, routeToken: string) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
