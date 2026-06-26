import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShipWheel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SOURCE_LANGUAGE = "tr";

// Timing knobs (ms). Give the Google Translate widget time to start, then reveal
// once the page DOM goes quiet — capped so navigation never hangs.
const MIN_HOLD = 80;
const QUIET_WINDOW = 60;
const MAX_HOLD = 350;

export const RouteTranslationGate = () => {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const [translating, setTranslating] = useState(false);

  // Latest language without re-running the navigation effect when it changes.
  const languageRef = useRef(currentLanguage);
  languageRef.current = currentLanguage;

  // Skip the initial load (covered by the splash screen, and the saved language
  // isn't read from localStorage until after the first render). Only gate on
  // actual page-to-page navigation.
  const firstRunRef = useRef(true);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    // No translation happens in the source language: never gate.
    if (languageRef.current === SOURCE_LANGUAGE) {
      setTranslating(false);
      return;
    }

    const root = document.getElementById("root");
    if (!root) return;

    setTranslating(true);
    const start = Date.now();
    let quietTimer: number | undefined;

    const reveal = () => {
      window.clearTimeout(quietTimer);
      window.clearTimeout(capTimer);
      observer.disconnect();
      setTranslating(false);
    };

    const observer = new MutationObserver(() => {
      // Wait at least MIN_HOLD so we don't reveal before the widget starts.
      if (Date.now() - start < MIN_HOLD) return;
      window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(reveal, QUIET_WINDOW);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    // Hard cap: always reveal even if the widget does nothing / network is slow.
    const capTimer = window.setTimeout(reveal, MAX_HOLD);
    // Fallback quiet timer in case no mutations ever fire after MIN_HOLD.
    quietTimer = window.setTimeout(reveal, MIN_HOLD + QUIET_WINDOW);

    return () => {
      window.clearTimeout(quietTimer);
      window.clearTimeout(capTimer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {translating && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 2.5 }}
          >
            <ShipWheel className="h-12 w-12 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
