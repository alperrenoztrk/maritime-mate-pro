import { Suspense, useEffect, useMemo } from "react";
import { getNavigationDirection, recordNavigation } from "@/lib/navigationDirection";
import { GlobalMaritimeBackground } from "@/components/GlobalMaritimeBackground";
import { Toaster } from "@/components/ui/sonner";
import { AskAIPopup } from "@/components/AskAIPopup";
import { ConsentDialogHost } from "@/components/privacy/ConsentDialogHost";
import { DocumentExpiryNotifier } from "@/components/documents/DocumentExpiryNotifier";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate, Link } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { EntitlementProvider } from "@/contexts/EntitlementContext";
import { LanguageChangeOverlay } from "@/components/LanguageChangeOverlay";

import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { AnimatePresence } from "framer-motion";
import { RouteMotionFrame } from "@/components/RouteMotionFrame";
import { PageTransition } from "@/components/PageTransition";
import { RouteTranslationGate } from "@/components/RouteTranslationGate";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useNavigationHierarchy } from "@/hooks/useNavigationHierarchy";
import { AppNavBar } from "@/components/AppNavBar";
import { AppTabBar } from "@/components/AppTabBar";
import { EdgeSwipeBack } from "@/components/EdgeSwipeBack";
import { RouteSkeleton } from "@/components/state/AppState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazyWithReload } from "@/lib/lazyWithReload";
import { topicLearnHref } from "@/data/learningGuide";
import { GlobalSearch } from "@/components/GlobalSearch";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProRoute, LibraryBookRoute } from "@/components/pro/ProRoute";
import { AdsController } from "@/components/ads/AdsController";
import { prefersReducedMotion } from "@/hooks/useAppMotion";
import { useAppChromeHidden } from "@/hooks/useAppChromeVisibility";
import { captureRoutePreview } from "@/lib/navigationPreview";
import { hasHierarchicalBack } from "@/lib/appNavigation";

// Pages are code-split via React.lazy so the initial bundle stays small enough
// for the mobile preview / first paint. Each route only downloads its own chunk.
const Index = lazyWithReload(() => import("./pages/Index"));
const CalculationsMenu = lazyWithReload(() => import("./pages/CalculationsMenu"));
const MaritimeLearningMapPage = lazyWithReload(() => import("./pages/curriculum/MaritimeLearningMapPage"));
const LessonsPage = lazyWithReload(() => import("./pages/LessonsPage"));
const LibraryHubPage = lazyWithReload(() => import("./pages/LibraryHubPage"));
const SearchPage = lazyWithReload(() => import("./pages/SearchPage"));
const CrewHierarchyPage = lazyWithReload(() => import("./pages/CrewHierarchyPage"));
const BridgeDevicesPage = lazyWithReload(() => import("./pages/BridgeDevicesPage"));
const ShipTasksPage = lazyWithReload(() => import("./pages/ShipTasksPage"));
const ShipTaskDetailPage = lazyWithReload(() => import("./pages/ShipTaskDetailPage"));
const ShipOperationsPage = lazyWithReload(() => import("./pages/ShipOperationsPage"));
const ShipOperationsDetail = lazyWithReload(() => import("./pages/ShipOperationsDetail"));
const ShipOperationDeepDive = lazyWithReload(() => import("./pages/ShipOperationDeepDive"));
const CalculationSectionPage = lazyWithReload(() => import("./pages/CalculationSectionPage"));
const Navigation = lazyWithReload(() => import("./pages/Navigation"));
const NavigationCalculationPage = lazyWithReload(() => import("./pages/NavigationCalculation"));
const ProfessionalCpaCalculatorPage = lazyWithReload(() => import("./pages/ProfessionalCpaCalculator"));
const TideCalculationTutorial = lazyWithReload(() => import("./pages/TideCalculationTutorial"));
const Economics = lazyWithReload(() => import("./pages/Economics"));
const EconomicsAssistantPage = lazyWithReload(() => import("./pages/EconomicsAssistant"));
const EconomicsQuizPage = lazyWithReload(() => import("./pages/EconomicsQuiz"));
const StabilityAssistantPage = lazyWithReload(() => import("./pages/StabilityAssistant"));
const StabilityGZIMO = lazyWithReload(() => import("./pages/StabilityGZIMO"));
const StabilityGrainPage = lazyWithReload(() => import("./pages/StabilityGrain"));
const StabilityGMPage = lazyWithReload(() => import("./pages/StabilityGM"));
const StabilityWeightShiftPage = lazyWithReload(() => import("./pages/StabilityWeightShift"));
const StabilityFreeSurfacePage = lazyWithReload(() => import("./pages/StabilityFreeSurface"));
const StabilityGZPage = lazyWithReload(() => import("./pages/StabilityGZ"));
const SailorKnotsPage = lazyWithReload(() => import("./pages/SailorKnots"));
// Görsel/işitsel işaret referansları (ICS bayrakları, mors, IALA, COLREG sesleri).
const SignalFlagsPage = lazyWithReload(() => import("./pages/SignalFlags"));
const MorseCodePage = lazyWithReload(() => import("./pages/MorseCode"));
const BuoyagePage = lazyWithReload(() => import("./pages/Buoyage"));
const SoundSignalsPage = lazyWithReload(() => import("./pages/SoundSignals"));
const StabilityAnalysisPage = lazyWithReload(() => import("./pages/StabilityAnalysis"));
const StableTalesPage = lazyWithReload(() => import("./pages/StableTales"));
const ConverterPage = lazyWithReload(() => import("./pages/Converter"));
const PassagePlanPage = lazyWithReload(() => import("./pages/PassagePlanPage"));
const MoonPhases = lazyWithReload(() => import("./pages/MoonPhases"));
const Settings = lazyWithReload(() => import("./pages/Settings"));
const NotesPage = lazyWithReload(() => import("./pages/Notes"));
const ProPage = lazyWithReload(() => import("./pages/ProPage"));
const Formulas = lazyWithReload(() => import("./pages/Formulas"));
const Regulations = lazyWithReload(() => import("./pages/Regulations"));
const StabilityFormulasPage = lazyWithReload(() => import("./pages/StabilityFormulas"));
const Glossary = lazyWithReload(() => import("./pages/Glossary"));
const SavedPage = lazyWithReload(() => import("./pages/SavedPage"));

const StabilityFormulaDetailPage = lazyWithReload(() => import("./pages/StabilityFormulaDetail"));
const NavigationFormulasPage = lazyWithReload(() => import("./pages/NavigationFormulas"));

const DetailedMeteorology = lazyWithReload(() => import("./pages/DetailedMeteorology"));

const StabilityCalculationsPage = lazyWithReload(() => import("./pages/StabilityCalculations"));
const StabilityQuizPage = lazyWithReload(() => import("./pages/StabilityQuiz"));
const StabilityShearingBendingPage = lazyWithReload(() => import("./pages/StabilityShearingBending"));
const NavigationQuizPage = lazyWithReload(() => import("./pages/NavigationQuiz"));
const NavigationAssistantPage = lazyWithReload(() => import("./pages/NavigationAssistant"));
const ClockPage = lazyWithReload(() => import("./pages/Clock"));
const AuthPage = lazyWithReload(() => import("./pages/Auth"));
const AuthCallbackPage = lazyWithReload(() => import("./pages/AuthCallback"));
const ResetPasswordPage = lazyWithReload(() => import("./pages/ResetPassword"));
const OAuthConsent = lazyWithReload(() => import("./pages/OAuthConsent"));
const StabilityPracticalPage = lazyWithReload(() => import("./pages/StabilityPractical"));
const StabilityPracticalTankPage = lazyWithReload(() => import("./pages/StabilityPracticalTank"));
const StabilityPracticalFWAPage = lazyWithReload(() => import("./pages/StabilityPracticalFWA"));
const StabilityPracticalGHMPage = lazyWithReload(() => import("./pages/StabilityPracticalGHM"));
const StabilityGrainCalculationPage = lazyWithReload(() => import("./pages/StabilityGrainCalculation"));
const StabilityGZCurvePage = lazyWithReload(() => import("./pages/StabilityGZCurve"));
const StabilityWindWeatherPage = lazyWithReload(() => import("./pages/StabilityWindWeather"));
const StabilityIMOCriteriaPage = lazyWithReload(() => import("./pages/StabilityIMOCriteria"));
const SafetyCalculationsPage = lazyWithReload(() => import("./pages/SafetyCalculations"));
const TankCalculationsPage = lazyWithReload(() => import("./pages/TankCalculations"));
const BallastPage = lazyWithReload(() => import("./pages/Ballast"));
const EnginePage = lazyWithReload(() => import("./pages/Engine"));
const HydrodynamicsPage = lazyWithReload(() => import("./pages/Hydrodynamics"));
const StructuralCalculationsPage = lazyWithReload(() => import("./pages/StructuralCalculations"));
const SpecialShipCalculationsPage = lazyWithReload(() => import("./pages/SpecialShipCalculations"));
const EmissionCalculationsPage = lazyWithReload(() => import("./pages/EmissionCalculationsPage"));
const MachineTopicCalculationsPage = lazyWithReload(() => import("./pages/MachineTopicCalculationsPage"));
const MachineTopicFormulasPage = lazyWithReload(() => import("./pages/MachineTopicFormulasPage"));
const CourseFormulasPage = lazyWithReload(() => import("./pages/CourseFormulasPage"));
const CourseCalculationsPage = lazyWithReload(() => import("./pages/CourseCalculationsPage"));
const CourseQuizPage = lazyWithReload(() => import("./pages/CourseQuizPage"));
const MachineTopicAssistantPage = lazyWithReload(() => import("./pages/MachineTopicAssistantPage"));
const MachineTopicQuizPage = lazyWithReload(() => import("./pages/MachineTopicQuizPage"));
const MachineTopicLessonsPage = lazyWithReload(() => import("./pages/MachineTopicLessonsPage"));
const MachineTopicDetailPage = lazyWithReload(() => import("./pages/MachineTopicDetailPage"));

const EmissionFormulas = lazyWithReload(() => import("./pages/EmissionFormulas"));
const EmissionAssistant = lazyWithReload(() => import("./pages/EmissionAssistant"));
const EmissionQuiz = lazyWithReload(() => import("./pages/EmissionQuiz"));
const SOLASRegulationsPage = lazyWithReload(() => import("./pages/SOLASRegulations"));
const SOLASCertificatesPage = lazyWithReload(() => import("./pages/SOLASCertificates"));
const SOLASShipRequirementsPage = lazyWithReload(() => import("./pages/SOLASShipRequirements"));
const SOLASSafetyEquipmentPage = lazyWithReload(() => import("./pages/SOLASSafetyEquipment"));
const BridgeDeviceDetailPage = lazyWithReload(() => import("./pages/BridgeDeviceDetail"));
const ImageCreditsPage = lazyWithReload(() => import("./pages/ImageCredits"));
const WeatherForecast = lazyWithReload(() => import("./pages/WeatherForecast"));
const SunsetTimes = lazyWithReload(() => import("./pages/SunsetTimes"));
const SunriseTimes = lazyWithReload(() => import("./pages/SunriseTimes"));
const LocationSelector = lazyWithReload(() => import("./pages/LocationSelector"));
const DraftSurveyCalculator = lazyWithReload(() => import("./pages/DraftSurveyCalculator"));
const DraftSurveyStandard = lazyWithReload(() => import("./pages/DraftSurveyStandard"));
const DraftSurveyPreloading = lazyWithReload(() => import("./pages/DraftSurveyPreloading"));
const DraftSurveyIntermediate = lazyWithReload(() => import("./pages/DraftSurveyIntermediate"));
const DraftSurveyPostdischarge = lazyWithReload(() => import("./pages/DraftSurveyPostdischarge"));
const DraftSurveyComparative = lazyWithReload(() => import("./pages/DraftSurveyComparative"));
const DraftSurveyBallast = lazyWithReload(() => import("./pages/DraftSurveyBallast"));
const DraftSurveyDensity = lazyWithReload(() => import("./pages/DraftSurveyDensity"));
const DraftSurveyBunker = lazyWithReload(() => import("./pages/DraftSurveyBunker"));
const CargoCalculationsPage = lazyWithReload(() => import("./pages/CargoCalculations"));

const CargoAssistantPage = lazyWithReload(() => import("./pages/CargoAssistant"));
const CargoQuizPage = lazyWithReload(() => import("./pages/CargoQuiz"));
const MeteorologyFormulasPage = lazyWithReload(() => import("./pages/MeteorologyFormulas"));
const MeteorologyAssistantPage = lazyWithReload(() => import("./pages/MeteorologyAssistant"));
const MeteorologyQuizPage = lazyWithReload(() => import("./pages/MeteorologyQuiz"));
const CommunicationAssistantPage = lazyWithReload(() => import("./pages/CommunicationAssistant"));
const SeamanshipCalculationsPage = lazyWithReload(() => import("./pages/SeamanshipCalculations"));
const SeamanshipCalculationDetailPage = lazyWithReload(() =>
  import("./pages/SeamanshipCalculations").then((m) => ({
    default: m.SeamanshipCalculationDetailPage,
  })),
);
const SeamanshipFormulasPage = lazyWithReload(() => import("./pages/SeamanshipFormulas"));
const SeamanshipAssistantPage = lazyWithReload(() => import("./pages/SeamanshipAssistant"));
const SeamanshipQuizPage = lazyWithReload(() => import("./pages/SeamanshipQuiz"));

const SafetyFormulasPage = lazyWithReload(() => import("./pages/SafetyFormulas"));
const SafetyAssistantPage = lazyWithReload(() => import("./pages/SafetyAssistant"));
const SafetyQuizPage = lazyWithReload(() => import("./pages/SafetyQuiz"));
const MachineAssistantPage = lazyWithReload(() => import("./pages/MachineAssistant"));
const MachineCalculationsPage = lazyWithReload(() => import("./pages/MachineCalculationsPage"));
const MachineFormulasPage = lazyWithReload(() => import("./pages/MachineFormulas"));
const MachineQuizPage = lazyWithReload(() => import("./pages/MachineQuiz"));
const RegulationDetailPage = lazyWithReload(() => import("./pages/RegulationDetailPage"));
const ExamPreparationPage = lazyWithReload(() => import("./pages/ExamPreparationPage"));

const MaritimeNews = lazyWithReload(() => import("./pages/MaritimeNews"));

const CrewRoleDetailPage = lazyWithReload(() => import("./pages/CrewRoleDetail"));
const CrewTaskDeepDive = lazyWithReload(() => import("./pages/CrewTaskDeepDive"));
const MusterListPage = lazyWithReload(() => import("./pages/MusterListPage"));
const LessonTopicsPage = lazyWithReload(() => import("./pages/LessonTopicsPage"));
const LessonTopicDetailPage = lazyWithReload(() => import("./pages/LessonTopicDetailPage"));
// Alıştırmalar (orijinal Dersler'e dokunmadan, ayrı sayfalar)
const ExercisesPage = lazyWithReload(() => import("./pages/ExercisesPage"));
const ExerciseTopicsPage = lazyWithReload(() => import("./pages/ExerciseTopicsPage"));
const ExerciseTopicDetailPage = lazyWithReload(() => import("./pages/ExerciseTopicDetailPage"));
const GuidedLessonSession = lazyWithReload(() => import("./components/lessons/GuidedLessonSession"));

const ShipSystemsPage = lazyWithReload(() => import("./pages/ShipSystemsPage"));
const ShipSystemDetailPage = lazyWithReload(() => import("./pages/ShipSystemDetailPage"));
const ShipSystemDeepDive = lazyWithReload(() => import("./pages/ShipSystemDeepDive"));
const StabilityTopicsPage = lazyWithReload(() => import("./pages/StabilityTopicsPage"));
const CargoTopicsPage = lazyWithReload(() => import("./pages/CargoTopicsPage"));
const SeamanshipTopicsPage = lazyWithReload(() => import("./pages/SeamanshipTopicsPage"));
const SafetyTopicsPage = lazyWithReload(() => import("./pages/SafetyTopicsPage"));
const EnvironmentTopicsPage = lazyWithReload(() => import("./pages/EnvironmentTopicsPage"));
const EconomicsTopicsPage = lazyWithReload(() => import("./pages/EconomicsTopicsPage"));
const BetaFeaturesPage = lazyWithReload(() => import("./pages/BetaFeaturesPage"));
const BetaPscChecklist = lazyWithReload(() => import("./pages/BetaPscChecklist"));
const BetaShipSimulator = lazyWithReload(() => import("./pages/BetaShipSimulator"));
const BetaDocumentTracker = lazyWithReload(() => import("./pages/BetaDocumentTracker"));
const queryClient = new QueryClient();

// A content-shaped skeleton rather than a centred spinner: it keeps the page
// rhythm while the lazy chunk downloads instead of flashing an empty screen
// with a ring in the middle.
const RouteFallback = () => <RouteSkeleton />;

const RouteErrorFallback = ({ pathname }: { pathname: string }) => (
  <div role="alert" className="flex min-h-[70svh] flex-col items-center justify-center gap-4 p-6 text-center text-foreground">
    <h1 className="text-xl font-semibold">This page could not be loaded</h1>
    <p className="max-w-sm text-sm text-muted-foreground">
      The page encountered an error. Other parts of the app remain available.
    </p>
    <p className="max-w-full break-all text-xs text-muted-foreground" aria-label="Failed page">
      {pathname}
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
      <Link
        to="/"
        className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

// Rehberli öğrenme konu (Topics) tarafına taşındı; eski Exercises linkleri oraya gider.
const LegacyExerciseLearnRedirect = () => {
  const { categoryId = "", topicTitle = "" } = useParams();
  return <Navigate to={topicLearnHref(categoryId, decodeURIComponent(topicTitle))} replace />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const chromeHidden = useAppChromeHidden();

  // Wire up hierarchical back-button handling. The back button never
  // exits the app — see useNavigationHierarchy for the policy.
  useNavigationHierarchy();

  // Record push/pop for the route transition. Done during render, so the
  // direction is already correct when AnimatePresence starts the exit
  // animation in this same commit. useMemo keeps it to one call per route.
  useMemo(() => recordNavigation(location.pathname), [location.pathname]);

  // Let document-level services discard work owned by the route that just
  // unmounted. The language provider intentionally lives above BrowserRouter,
  // so this small event is its route lifecycle boundary.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("app-route-committed", {
      detail: { pathname: location.pathname },
    }));
  }, [location.pathname]);

  // Keep an inert snapshot of the settled route. EdgeSwipeBack reveals this
  // exact previous screen while the current route follows the user's finger.
  // The delay avoids cloning loading skeletons and route-enter transforms.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const frame = Array.from(
        document.querySelectorAll<HTMLElement>("[data-route-path]"),
      ).find((element) => element.dataset.routePath === location.pathname);
      captureRoutePreview(
        location.pathname,
        frame?.querySelector<HTMLElement>(".interactive-page-surface") ?? null,
      );
    }, 480);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
    <AppNavBar />
    <AppTabBar />
    {/* iOS edge-swipe back. Shares useBackNavigation with the floating
        control and the hardware button, so all three land in the same place. */}
    <EdgeSwipeBack />
    {/* App-wide search dialog: ⌘K / Ctrl+K and the "open-global-search"
        event now work on every route, not just the home page. The trigger
        button is hidden; the dialog itself renders through a portal. */}
    <div className="hidden">
      <GlobalSearch />
    </div>
    {/* A keyed motion frame is AnimatePresence's direct child. `sync` keeps
        the outgoing and incoming screens in one continuous iOS push/pop;
        the exiting frame becomes absolute while the new frame owns layout.
        The viewport wrapper clips the off-screen frame so the slide never
        produces horizontal overflow mid-animation. */}
    <div className="route-presence-viewport">
    <AnimatePresence mode="sync" initial={false} custom={{ direction: getNavigationDirection(), reduced: prefersReducedMotion() }}>
      <RouteMotionFrame
        key={location.pathname}
        pathname={location.pathname}
        direction={getNavigationDirection()}
        navbar={hasHierarchicalBack(location.pathname) && !chromeHidden}
      >

        <div className="interactive-page-surface min-h-[100svh] w-full">
        <ErrorBoundary key={`${location.pathname}${location.search}`} fallback={<RouteErrorFallback pathname={location.pathname} />}>
        <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/maritime-news" element={<PageTransition><MaritimeNews /></PageTransition>} />
        <Route path="/calculations" element={<PageTransition><CalculationsMenu /></PageTransition>} />
        <Route path="/lessons/map" element={<PageTransition><MaritimeLearningMapPage /></PageTransition>} />
        <Route path="/lessons" element={<PageTransition><LessonsPage /></PageTransition>} />
        <Route path="/library" element={<PageTransition><LibraryHubPage /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
        <Route path="/glossary" element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="/saved" element={<PageTransition><SavedPage /></PageTransition>} />
        <Route path="/notes" element={<PageTransition><NotesPage /></PageTransition>} />
        <Route path="/pro" element={<PageTransition><ProPage /></PageTransition>} />
        <Route path="/beta" element={<PageTransition><BetaFeaturesPage /></PageTransition>} />
        <Route path="/beta/psc-checklist" element={<PageTransition><BetaPscChecklist /></PageTransition>} />
        <Route path="/beta/ship-simulator" element={<PageTransition><ProRoute feature="The 3D ship simulator"><BetaShipSimulator /></ProRoute></PageTransition>} />
        <Route path="/beta/documents" element={<PageTransition><BetaDocumentTracker /></PageTransition>} />


        <Route path="/lessons/stability/reference" element={<PageTransition><LibraryBookRoute bookKey="stability"><StabilityTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/cargo/reference" element={<PageTransition><LibraryBookRoute bookKey="cargo"><CargoTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/seamanship/reference" element={<PageTransition><LibraryBookRoute bookKey="seamanship"><SeamanshipTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/safety/reference" element={<PageTransition><LibraryBookRoute bookKey="safety"><SafetyTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/environment/reference" element={<PageTransition><LibraryBookRoute bookKey="environment"><EnvironmentTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/economics/reference" element={<PageTransition><LibraryBookRoute bookKey="economics"><EconomicsTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/:topicKey/formulas" element={<PageTransition><CourseFormulasPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/calculations" element={<PageTransition><CourseCalculationsPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/rules" element={<Navigate to="../topics" relative="path" replace />} />
        <Route path="/lessons/:topicKey/quiz" element={<PageTransition><ProRoute feature="The quiz section"><CourseQuizPage /></ProRoute></PageTransition>} />
        <Route path="/lessons/:categoryId/topics" element={<PageTransition><LibraryBookRoute><LessonTopicsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/:categoryId/topics/:topicTitle" element={<PageTransition><LibraryBookRoute><LessonTopicDetailPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/lessons/:categoryId/topics/:topicTitle/learn" element={<PageTransition><LibraryBookRoute><GuidedLessonSession /></LibraryBookRoute></PageTransition>} />
        {/* Alıştırmalar — orijinal /lessons route'larına dokunulmadan eklendi */}
        <Route path="/exercises" element={<PageTransition><ExercisesPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics" element={<PageTransition><ExerciseTopicsPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle" element={<PageTransition><ExerciseTopicDetailPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle/learn" element={<LegacyExerciseLearnRedirect />} />
        <Route path="/crew" element={<PageTransition><CrewHierarchyPage /></PageTransition>} />
        <Route path="/crew/muster-list" element={<PageTransition><MusterListPage /></PageTransition>} />
        <Route path="/bridge" element={<PageTransition><BridgeDevicesPage /></PageTransition>} />
        <Route path="/ship-tasks" element={<PageTransition><ShipTasksPage /></PageTransition>} />
        <Route path="/ship-tasks/:taskSlug" element={<PageTransition><ShipTaskDetailPage /></PageTransition>} />
        <Route path="/ship-operations" element={<PageTransition><ShipOperationsPage /></PageTransition>} />
        <Route path="/ship-operations/:shipType" element={<PageTransition><ShipOperationsDetail /></PageTransition>} />
        <Route path="/ship-operations/:shipType/:dept/:opIndex" element={<PageTransition><ShipOperationDeepDive /></PageTransition>} />
        <Route path="/crew/:roleSlug" element={<PageTransition><CrewRoleDetailPage /></PageTransition>} />
        <Route path="/crew/:roleSlug/task/:taskIndex" element={<PageTransition><CrewTaskDeepDive /></PageTransition>} />
        <Route path="/bridge/:deviceId" element={<PageTransition><BridgeDeviceDetailPage /></PageTransition>} />
        <Route path="/passage-plan" element={<PageTransition><PassagePlanPage /></PageTransition>} />
        <Route path="/ship-systems" element={<PageTransition><ShipSystemsPage /></PageTransition>} />
        <Route path="/ship-systems/:sectionId" element={<PageTransition><ShipSystemDetailPage /></PageTransition>} />
        <Route path="/ship-systems/:sectionId/:topicIndex" element={<PageTransition><ShipSystemDeepDive /></PageTransition>} />

        <Route path="/calculations/:categoryId/:sectionId" element={<PageTransition><CalculationSectionPage /></PageTransition>} />
        {/* Stability sub-routes */}
        <Route path="/stability/assistant" element={<PageTransition><StabilityAssistantPage /></PageTransition>} />
        <Route path="/stability/rules" element={<Navigate to="/lessons/stability/topics" replace />} />
        <Route path="/stability/gz-imo" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityGZIMO /></ProRoute></PageTransition>} />
        <Route path="/stability/grain" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityGrainPage /></ProRoute></PageTransition>} />
        <Route path="/stability/gm" element={<PageTransition><StabilityGMPage /></PageTransition>} />
        <Route path="/stability/weight-shift" element={<PageTransition><StabilityWeightShiftPage /></PageTransition>} />
        <Route path="/stability/free-surface" element={<PageTransition><StabilityFreeSurfacePage /></PageTransition>} />
        <Route path="/stability/gz" element={<PageTransition><StabilityGZPage /></PageTransition>} />
        <Route path="/stability/analysis" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityAnalysisPage /></ProRoute></PageTransition>} />
        <Route path="/stability/stable-tales" element={<PageTransition><StableTalesPage /></PageTransition>} />
        <Route path="/stability/formulas" element={<PageTransition><StabilityFormulasPage /></PageTransition>} />
        <Route path="/stability/formulas/:id" element={<PageTransition><StabilityFormulaDetailPage /></PageTransition>} />
        <Route path="/stability/calculations" element={<PageTransition><StabilityCalculationsPage /></PageTransition>} />
        <Route path="/stability/practical" element={<PageTransition><StabilityPracticalPage /></PageTransition>} />
        <Route path="/stability/practical/tank" element={<PageTransition><StabilityPracticalTankPage /></PageTransition>} />
        <Route path="/stability/practical/fwa" element={<PageTransition><StabilityPracticalFWAPage /></PageTransition>} />
        <Route path="/stability/practical/ghm" element={<PageTransition><StabilityPracticalGHMPage /></PageTransition>} />

        <Route path="/stability/quiz" element={<PageTransition><ProRoute feature="The quiz section"><StabilityQuizPage /></ProRoute></PageTransition>} />
        <Route path="/stability/shearing-bending" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityShearingBendingPage /></ProRoute></PageTransition>} />
        <Route path="/stability/grain-calculation" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityGrainCalculationPage /></ProRoute></PageTransition>} />
        <Route path="/stability/gz-curve" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityGZCurvePage /></ProRoute></PageTransition>} />
        <Route path="/stability/wind-weather" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityWindWeatherPage /></ProRoute></PageTransition>} />
        <Route path="/stability/imo-criteria" element={<PageTransition><ProRoute feature="This advanced stability calculation"><StabilityIMOCriteriaPage /></ProRoute></PageTransition>} />
        <Route path="/safety" element={<PageTransition><SafetyCalculationsPage /></PageTransition>} />
        <Route path="/meteorology/topics" element={<PageTransition><LibraryBookRoute bookKey="meteorology"><DetailedMeteorology /></LibraryBookRoute></PageTransition>} />
        <Route path="/tank" element={<PageTransition><TankCalculationsPage /></PageTransition>} />
        <Route path="/cargo/calculations" element={<PageTransition><CargoCalculationsPage /></PageTransition>} />
        <Route path="/cargo/calculations/draft-survey" element={<PageTransition><ProRoute feature="The draft survey suite"><DraftSurveyCalculator /></ProRoute></PageTransition>} />
        <Route path="/cargo/calculations/preloading" element={<PageTransition><ProRoute feature="The draft survey suite"><DraftSurveyPreloading /></ProRoute></PageTransition>} />
        <Route path="/cargo/calculations/intermediate" element={<PageTransition><ProRoute feature="The draft survey suite"><DraftSurveyIntermediate /></ProRoute></PageTransition>} />
        <Route path="/cargo/calculations/postdischarge" element={<PageTransition><ProRoute feature="The draft survey suite"><DraftSurveyPostdischarge /></ProRoute></PageTransition>} />
        <Route path="/cargo/calculations/comparative" element={<PageTransition><ProRoute feature="The draft survey suite"><DraftSurveyComparative /></ProRoute></PageTransition>} />
        <Route path="/cargo/calculations/ballast" element={<PageTransition><DraftSurveyBallast /></PageTransition>} />
        <Route path="/cargo/calculations/density" element={<PageTransition><DraftSurveyDensity /></PageTransition>} />
        <Route path="/cargo/calculations/bunker" element={<PageTransition><DraftSurveyBunker /></PageTransition>} />
        <Route path="/cargo/formulas" element={<PageTransition><DraftSurveyStandard /></PageTransition>} />

        <Route path="/cargo/rules" element={<Navigate to="/lessons/cargo/topics" replace />} />
        <Route path="/cargo/assistant" element={<PageTransition><CargoAssistantPage /></PageTransition>} />
        <Route path="/cargo/quiz" element={<PageTransition><ProRoute feature="The quiz section"><CargoQuizPage /></ProRoute></PageTransition>} />
        <Route path="/meteorology/formulas" element={<PageTransition><MeteorologyFormulasPage /></PageTransition>} />
        <Route path="/meteorology/rules" element={<Navigate to="/lessons/meteorology/topics" replace />} />
        <Route path="/meteorology/assistant" element={<PageTransition><MeteorologyAssistantPage /></PageTransition>} />
        <Route path="/meteorology/quiz" element={<PageTransition><ProRoute feature="The quiz section"><MeteorologyQuizPage /></ProRoute></PageTransition>} />
        <Route path="/communication/assistant" element={<PageTransition><CommunicationAssistantPage /></PageTransition>} />
        <Route path="/communication/flags" element={<PageTransition><SignalFlagsPage /></PageTransition>} />
        <Route path="/communication/morse" element={<PageTransition><MorseCodePage /></PageTransition>} />
        <Route path="/ballast" element={<PageTransition><BallastPage /></PageTransition>} />
        <Route path="/engine" element={<PageTransition><EnginePage /></PageTransition>} />
        <Route path="/hydrodynamics" element={<PageTransition><HydrodynamicsPage /></PageTransition>} />
        <Route path="/structural" element={<PageTransition><StructuralCalculationsPage /></PageTransition>} />
        <Route path="/special-ships" element={<PageTransition><SpecialShipCalculationsPage /></PageTransition>} />
        <Route path="/emissions" element={<PageTransition><EmissionCalculationsPage /></PageTransition>} />

        <Route path="/environment/calculations" element={<PageTransition><EmissionCalculationsPage /></PageTransition>} />
        <Route path="/environment/formulas" element={<PageTransition><EmissionFormulas /></PageTransition>} />
        <Route path="/environment/rules" element={<Navigate to="/lessons/environment/topics" replace />} />
        <Route path="/environment/assistant" element={<PageTransition><EmissionAssistant /></PageTransition>} />
        <Route path="/environment/quiz" element={<PageTransition><ProRoute feature="The quiz section"><EmissionQuiz /></ProRoute></PageTransition>} />
        <Route path="/solas/regulations" element={<PageTransition><SOLASRegulationsPage /></PageTransition>} />
        <Route path="/solas/certificates" element={<PageTransition><SOLASCertificatesPage /></PageTransition>} />
        <Route path="/solas/ship-requirements" element={<PageTransition><SOLASShipRequirementsPage /></PageTransition>} />
        <Route path="/solas/safety-equipment" element={<PageTransition><SOLASSafetyEquipmentPage /></PageTransition>} />
        <Route path="/seamanship/knots" element={<PageTransition><SailorKnotsPage /></PageTransition>} />
        <Route path="/seamanship/calculations" element={<PageTransition><SeamanshipCalculationsPage /></PageTransition>} />
        <Route
          path="/seamanship/calculations/:tool"
          element={<PageTransition><SeamanshipCalculationDetailPage /></PageTransition>}
        />
        <Route path="/seamanship/formulas" element={<PageTransition><SeamanshipFormulasPage /></PageTransition>} />
        <Route path="/seamanship/rules" element={<Navigate to="/lessons/seamanship/topics" replace />} />
        <Route path="/seamanship/assistant" element={<PageTransition><SeamanshipAssistantPage /></PageTransition>} />
        <Route path="/seamanship/quiz" element={<PageTransition><ProRoute feature="The quiz section"><SeamanshipQuizPage /></ProRoute></PageTransition>} />

        <Route path="/safety/formulas" element={<PageTransition><SafetyFormulasPage /></PageTransition>} />
        <Route path="/safety/rules" element={<Navigate to="/lessons/safety/topics" replace />} />
        <Route path="/safety/assistant" element={<PageTransition><SafetyAssistantPage /></PageTransition>} />
        <Route path="/safety/quiz" element={<PageTransition><ProRoute feature="The quiz section"><SafetyQuizPage /></ProRoute></PageTransition>} />

        <Route path="/machine/calculations" element={<PageTransition><MachineCalculationsPage /></PageTransition>} />
        <Route path="/machine/formulas" element={<PageTransition><MachineFormulasPage /></PageTransition>} />
        <Route path="/machine/rules" element={<Navigate to="/lessons?library=machine" replace />} />
        <Route path="/machine/assistant" element={<PageTransition><MachineAssistantPage /></PageTransition>} />
        <Route path="/machine/quiz" element={<PageTransition><ProRoute feature="The quiz section"><MachineQuizPage /></ProRoute></PageTransition>} />
        {/* Machine topic sub-routes */}
        <Route path="/machine/:topicSlug/topics" element={<PageTransition><LibraryBookRoute><MachineTopicLessonsPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/machine/:topicSlug/calculations" element={<PageTransition><MachineTopicCalculationsPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/formulas" element={<PageTransition><MachineTopicFormulasPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/rules" element={<Navigate to="../topics" relative="path" replace />} />
        <Route path="/machine/:topicSlug/assistant" element={<PageTransition><MachineTopicAssistantPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/topics/:subTopicTitle" element={<PageTransition><LibraryBookRoute><MachineTopicDetailPage /></LibraryBookRoute></PageTransition>} />
        <Route path="/machine/:topicSlug/topics/:subTopicTitle/learn" element={<PageTransition><LibraryBookRoute><GuidedLessonSession /></LibraryBookRoute></PageTransition>} />
        <Route path="/machine/:topicSlug/quiz" element={<PageTransition><ProRoute feature="The quiz section"><MachineTopicQuizPage /></ProRoute></PageTransition>} />
        <Route path="/navigation" element={<PageTransition><Navigation /></PageTransition>} />
        <Route path="/navigation/calc/cpa" element={<PageTransition><ProfessionalCpaCalculatorPage /></PageTransition>} />
        <Route path="/navigation/calc/:id" element={<PageTransition><NavigationCalculationPage /></PageTransition>} />
        <Route path="/navigation/tide-tutorial" element={<PageTransition><TideCalculationTutorial /></PageTransition>} />
        <Route path="/navigation/buoyage" element={<PageTransition><BuoyagePage /></PageTransition>} />
        <Route path="/navigation/sound-signals" element={<PageTransition><SoundSignalsPage /></PageTransition>} />
        <Route path="/navigation/formulas" element={<PageTransition><NavigationFormulasPage /></PageTransition>} />
        <Route path="/navigation/rules" element={<Navigate to="/lessons/navigation/topics" replace />} />

        <Route path="/navigation/meteorology" element={<PageTransition><DetailedMeteorology /></PageTransition>} />
        
        <Route path="/navigation/assistant" element={<PageTransition><NavigationAssistantPage /></PageTransition>} />
        <Route path="/navigation/quiz" element={<PageTransition><ProRoute feature="The quiz section"><NavigationQuizPage /></ProRoute></PageTransition>} />
        <Route path="/economics" element={<PageTransition><Economics /></PageTransition>} />
        <Route path="/economics/assistant" element={<PageTransition><EconomicsAssistantPage /></PageTransition>} />
        <Route path="/economics/quiz" element={<PageTransition><ProRoute feature="The quiz section"><EconomicsQuizPage /></ProRoute></PageTransition>} />
        <Route path="/empty-page" element={<Navigate to="/" replace />} />
        <Route path="/moon-phases" element={<PageTransition><MoonPhases /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/image-credits" element={<PageTransition><ImageCreditsPage /></PageTransition>} />
        <Route path="/formulas" element={<PageTransition><Formulas /></PageTransition>} />
        <Route path="/regulations" element={<PageTransition><Regulations /></PageTransition>} />
        <Route path="/regulations/:slug" element={<PageTransition><RegulationDetailPage /></PageTransition>} />
        <Route path="/clock" element={<PageTransition><ClockPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/auth/callback" element={<PageTransition><AuthCallbackPage /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />

        <Route path="/.lovable/oauth/consent" element={<PageTransition><OAuthConsent /></PageTransition>} />
        <Route path="/weather-forecast" element={<PageTransition><WeatherForecast /></PageTransition>} />
        <Route path="/sunset-times" element={<PageTransition><SunsetTimes /></PageTransition>} />
        <Route path="/sunrise-times" element={<PageTransition><SunriseTimes /></PageTransition>} />
        <Route path="/location-selector" element={<PageTransition><LocationSelector /></PageTransition>} />
        <Route path="/exam-preparation" element={<PageTransition><ProRoute feature="Exam preparation"><ExamPreparationPage /></ProRoute></PageTransition>} />
        <Route path="/converter" element={<PageTransition><ConverterPage /></PageTransition>} />
        <Route path="/machine-calculations" element={<PageTransition><MachineCalculationsPage /></PageTransition>} />
        <Route path="/widgets" element={<Navigate to="/" replace />} />
        <Route path="*" element={<PageTransition><Index /></PageTransition>} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
        </div>
      </RouteMotionFrame>
      </AnimatePresence>
    </div>
    </>

  );
};

const App = () => {
  // Apply the global maritime design language to every page.
  // Adds a body-scoped class that neutralizes per-page light backgrounds
  // (see index.css .marine-global rules) so the fixed shell shows through.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.add("marine-global");
    return () => document.body.classList.remove("marine-global");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <EntitlementProvider>
          <LanguageProvider>
            <TooltipProvider>
              <ThemeProvider defaultTheme="system" storageKey="maritime-ui-theme-v2">
                <FontSizeProvider>
                  <Toaster />
                  <DocumentExpiryNotifier />
                  <AskAIPopup />
                  <ConsentDialogHost />
                  <LanguageChangeOverlay />
                  <div className="min-h-screen text-foreground overflow-x-hidden">
                    <BrowserRouter>
                      {/* Inside the router on purpose: the backdrop reads the
                          current path so the drifting waves render on the home
                          page only. The gradient itself stays on every route. */}
                      <GlobalMaritimeBackground />
                      {/* Every route change starts the new page at the top —
                          the previous page's scroll offset is never carried
                          over. Must sit inside the router. */}
                      <ScrollToTop />
                      {/* AdMob orchestration: free tier only, never on the home
                          page / auth flow / paywall. Renders nothing — the
                          banner is a native view (see src/services/ads.ts). */}
                      <AdsController />
                      {/* Login wall: only the home page and the auth screens are
                          open to anonymous visitors. */}
                      <RequireAuth>
                        {/* Keep the translation blocker inside the auth gate.
                            Auth loading/MFA screens do not mount PageTransition,
                            so a gate outside RequireAuth could never be released. */}
                        <RouteTranslationGate />
                        <AnimatedRoutes />
                      </RequireAuth>
                    </BrowserRouter>
                  </div>
                </FontSizeProvider>
              </ThemeProvider>
            </TooltipProvider>
          </LanguageProvider>
          </EntitlementProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
