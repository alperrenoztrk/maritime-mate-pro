import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";

const NotesPage = lazy(() => import("@/pages/Notes"));

/**
 * Renders the Notes page as a full-screen overlay whenever the current
 * route is `/notes`, without registering a route in the central `<Routes>`
 * table. Mounted once inside <BrowserRouter> (as a sibling of the router's
 * <Routes>), so it can use router hooks (useLocation/Link/useNavigate).
 *
 * The catch-all `*` route renders the home screen underneath; this opaque
 * overlay covers it completely. Navigating away (e.g. the page's BackButton
 * -> "/") changes the pathname and the overlay unmounts.
 */
export function NotesRouteOverlay() {
  const { pathname } = useLocation();

  if (pathname !== "/notes") return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <Suspense fallback={null}>
        <NotesPage />
      </Suspense>
    </div>
  );
}

export default NotesRouteOverlay;
