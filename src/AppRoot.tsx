import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LocationProvider } from "./contexts/LocationContext";

export function AppRoot() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
