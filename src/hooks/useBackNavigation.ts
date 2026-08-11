import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { hapticImpact } from "@/lib/haptics";
import { hasHierarchicalBack } from "@/lib/appNavigation";

/**
 * The single "go back" action, shared by every back affordance: the floating
 * control, the edge-swipe gesture, and any page-level back button.
 *
 * It deliberately walks the logical hierarchy (findParentPath) rather than
 * calling navigate(-1). useNavigationHierarchy pushes a sentinel history
 * entry on every route change so the hardware back button can never exit the
 * app; that makes raw history entries an unreliable target — stepping back
 * one entry often lands on the sentinel for the same URL. Climbing the
 * hierarchy keeps every back affordance in agreement with the hardware
 * button, which uses exactly this rule.
 */
export const useBackNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = useCallback((options?: { haptic?: boolean }) => {
    // Every tab owns an independent navigation stack. Its root is not the
    // child of Home, so iOS-style back is a no-op on all five tab roots.
    if (!hasHierarchicalBack(pathname)) return;
    if (options?.haptic !== false) hapticImpact("light");
    const parent = findParentPath(pathname);
    navigate(!parent || parent === pathname ? "/" : parent, { replace: true });
  }, [pathname, navigate]);

  return { goBack, canGoBack: hasHierarchicalBack(pathname) };
};
