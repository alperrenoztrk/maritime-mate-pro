import { Navigate } from "react-router-dom";

/**
 * Legacy route. Grain stability now lives in the central stability
 * calculations page; redirect inside the router instead of reloading the
 * whole app (a full `window.location` reload restarts the native WebView).
 */
export default function StabilityGrainPage() {
  return <Navigate to="/stability/calculations#grainAccount" replace />;
}
