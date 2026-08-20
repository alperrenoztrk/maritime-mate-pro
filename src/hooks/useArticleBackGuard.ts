import { useEffect, useId } from 'react';

/**
 * Registry of the "writing" (article / long-form reading) surfaces that are
 * currently open on top of a page: the full-screen topic articles, the news
 * reader, and anything else that puts a text in front of the user.
 *
 * HARD RULE: the back button MUST NEVER close a piece of writing. While at
 * least one article is registered here, `useNavigationHierarchy` swallows the
 * back press completely — the text stays exactly where it was, and the reader
 * leaves it through the article's own close control ("✕" / "return to newspaper").
 *
 * A module-level Set (instead of a context) keeps this free of re-renders: the
 * back handler only ever *reads* it, from inside listeners that are registered
 * once for the app's lifetime and never re-created.
 */
const openArticles = new Set<string>();

/** True while any article is on screen. Read by the global back handler. */
export const isArticleOpen = (): boolean => openArticles.size > 0;

/**
 * Marks an article as open for as long as `open` is true.
 *
 * Registration is released both when the article closes and when the component
 * unmounts, so a route change (or an unmount mid-animation) can never strand
 * the guard in the "open" state and leave the back button dead.
 */
export const useArticleBackGuard = (open: boolean): void => {
  const id = useId();

  useEffect(() => {
    if (!open) return;
    openArticles.add(id);
    return () => {
      openArticles.delete(id);
    };
  }, [open, id]);
};
