import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { assessmentStorageKey } from "@/data/learningAssessment";
import { useHideAppChrome } from "@/hooks/useAppChromeVisibility";
import { MOTION_EASE_OUT, MOTION_SECONDS } from "@/hooks/useAppMotion";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { useAuth } from "@/hooks/useAuthContext";
import { supabase } from "@/integrations/supabase/safeClient";
import { isPublicPath } from "@/lib/authFlow";
import { lazyWithReload } from "@/lib/lazyWithReload";
import { isPlacementDone, placementDoneAt, placementDoneUpdate, readPlacement, shouldRequirePlacement } from "@/lib/learningPlacementGate";

// The questions pull in the curriculum data; keep them out of the entry chunk.
const LearningAssessment = lazyWithReload(() =>
  import("@/components/curriculum/LearningAssessment").then((module) => ({ default: module.LearningAssessment })),
);

const recordPlacementDone = async () => {
  try { await supabase.auth.updateUser({ data: placementDoneUpdate() }); }
  catch { /* Offline: the device copy stands and the next start copies it. */ }
};

/**
 * The learning placement, required once per account right after sign-in.
 *
 * It covers the whole app until every question is answered: no close or skip
 * control, the tab bar and back pill are hidden, the hardware/browser back
 * press is swallowed (useArticleBackGuard) and the page behind is inert.
 * Answers are saved as they are given, so closing the app resumes at the same
 * question. The result screen is the only way out.
 */
export function FirstSignInPlacement() {
  const { user, loading, mfaChallengeRequired } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userId = user?.id ?? null;
  const storageKey = assessmentStorageKey(userId);
  // The storage key whose freshly finished result is still on screen.
  const [resultFor, setResultFor] = useState<string | null>(null);
  const accountDone = placementDoneAt(user?.user_metadata) !== null;
  const required = shouldRequirePlacement({
    signedIn: Boolean(user),
    loading,
    mfaChallengeRequired,
    publicRoute: isPublicPath(pathname),
    done: isPlacementDone(readPlacement(storageKey), user?.user_metadata),
  });
  const open = required || resultFor === storageKey;

  useHideAppChrome(open);
  useArticleBackGuard(open);
  useEffect(() => {
    if (!open) return;
    const root = document.getElementById("root");
    const html = document.documentElement;
    const overflow = html.style.overflow;
    // The launch splash keeps #root inert and releases it when it hides
    // (main.tsx); lock it again after that release.
    const lock = () => root?.setAttribute("inert", "");
    lock();
    window.addEventListener("splash:hidden", lock);
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("splash:hidden", lock);
      if (!document.getElementById("splash-root")) root?.removeAttribute("inert");
      html.style.overflow = overflow;
    };
  }, [open]);
  // Finished on this device while offline: copy the record to the account.
  useEffect(() => {
    if (!userId || loading || mfaChallengeRequired || accountDone) return;
    if (readPlacement(assessmentStorageKey(userId)).completed) void recordPlacementDone();
  }, [userId, loading, mfaChallengeRequired, accountDone]);

  const leave = () => setResultFor(null);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="first-sign-in-placement"
          role="dialog"
          aria-modal="true"
          aria-label="Personal learning pathway"
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-background text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_SECONDS.sheet, ease: MOTION_EASE_OUT }}
        >
          <div className="px-[max(1rem,var(--safe-left))] pb-[calc(var(--safe-bottom)+1.5rem)] pt-[calc(var(--safe-top)+1.25rem)] sm:flex sm:min-h-full sm:flex-col sm:justify-center sm:pr-[max(1.5rem,var(--safe-right))]">
            <Suspense fallback={null}>
              <LearningAssessment
                key={storageKey}
                storageKey={storageKey}
                required
                onComplete={() => {
                  setResultFor(storageKey);
                  void recordPlacementDone();
                }}
                onFinish={leave}
                onExplore={() => {
                  leave();
                  navigate("/lessons/map");
                }}
              />
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
