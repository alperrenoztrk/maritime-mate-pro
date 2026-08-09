export const TRANSLATION_GUARD_EVENT = 'maritime:translation-guard-change';

let nextToken = 0;
let initialToken: number | null = null;
const activeTokens = new Set<number>();

const syncGuardElement = () => {
  if (typeof document === 'undefined') return;

  const isActive = activeTokens.size > 0;
  const root = document.documentElement;
  const guard = document.getElementById('translation-guard');

  if (isActive) root.setAttribute('data-translation-pending', 'true');
  else root.removeAttribute('data-translation-pending');

  guard?.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(TRANSLATION_GUARD_EVENT, { detail: { isActive } }),
    );
  }
};

export const beginTranslationGuard = (): number => {
  const token = ++nextToken;
  activeTokens.add(token);
  syncGuardElement();
  return token;
};

export const finishTranslationGuard = (token: number | null | undefined): void => {
  if (token == null || !activeTokens.delete(token)) return;
  syncGuardElement();
};

export const beginInitialTranslationGuard = (required: boolean): void => {
  if (!required || initialToken !== null) return;
  initialToken = beginTranslationGuard();
};

export const finishInitialTranslationGuard = (): void => {
  if (initialToken === null) return;
  const token = initialToken;
  initialToken = null;
  finishTranslationGuard(token);
};

export const isTranslationGuardActive = (): boolean => activeTokens.size > 0;
