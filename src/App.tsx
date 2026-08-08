import { lazy, Suspense, useEffect } from "react";
import { GlobalMaritimeBackground } from "@/components/GlobalMaritimeBackground";
import { Toaster } from "@/components/ui/sonner";
import { AskAIPopup } from "@/components/AskAIPopup";
import { DocumentExpiryNotifier } from "@/components/documents/DocumentExpiryNotifier";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { EntitlementProvider } from "@/contexts/EntitlementContext";
import { LanguageChangeOverlay } from "@/components/LanguageChangeOverlay";

import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { RouteTranslationGate } from "@/components/RouteTranslationGate";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useNavigationHierarchy } from "@/hooks/useNavigationHierarchy";
import { useFrameRate } from "@/hooks/useFrameRate";
import { useScreenProtection } from "@/hooks/useScreenProtection";
import { FloatingNavButtons } from "@/components/FloatingNavButtons";
import { GlobalSearch } from "@/components/GlobalSearch";
import { ProRoute } from "@/components/pro/ProRoute";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AdsController } from "@/components/ads/AdsController";

// Pages are code-split via React.lazy so the initial bundle stays small enough
// for the mobile preview / first paint. Each route only downloads its own chunk.
const Index = lazy(() => import("./pages/Index"));
const CalculationsMenu = lazy(() => import("./pages/CalculationsMenu"));
const LessonsPage = lazy(() => import("./pages/LessonsPage"));
const CrewHierarchyPage = lazy(() => import("./pages/CrewHierarchyPage"));
const BridgeDevicesPage = lazy(() => import("./pages/BridgeDevicesPage"));
const MachineryHubPage = lazy(() => import("./pages/MachineryHubPage"));
const ShipTasksPage = lazy(() => import("./pages/ShipTasksPage"));
const ShipTaskDetailPage = lazy(() => import("./pages/ShipTaskDetailPage"));
const ShipOperationsPage = lazy(() => import("./pages/ShipOperationsPage"));
const ShipOperationsDetail = lazy(() => import("./pages/ShipOperationsDetail"));
const ShipOperationDeepDive = lazy(() => import("./pages/ShipOperationDeepDive"));
const CalculationSectionPage = lazy(() => import("./pages/CalculationSectionPage"));
const Navigation = lazy(() => import("./pages/Navigation"));
const NavigationCalculationPage = lazy(() => import("./pages/NavigationCalculation"));
const TideCalculationTutorial = lazy(() => import("./pages/TideCalculationTutorial"));
const Economics = lazy(() => import("./pages/Economics"));
const EconomicsAssistantPage = lazy(() => import("./pages/EconomicsAssistant"));
const EconomicsQuizPage = lazy(() => import("./pages/EconomicsQuiz"));
const StabilityAssistantPage = lazy(() => import("./pages/StabilityAssistant"));
const StabilityGZIMO = lazy(() => import("./pages/StabilityGZIMO"));
const StabilityGrainPage = lazy(() => import("./pages/StabilityGrain"));
const StabilityGMPage = lazy(() => import("./pages/StabilityGM"));
const StabilityWeightShiftPage = lazy(() => import("./pages/StabilityWeightShift"));
const StabilityFreeSurfacePage = lazy(() => import("./pages/StabilityFreeSurface"));
const StabilityGZPage = lazy(() => import("./pages/StabilityGZ"));
const SailorKnotsPage = lazy(() => import("./pages/SailorKnots"));
const StabilityAnalysisPage = lazy(() => import("./pages/StabilityAnalysis"));
const StableTalesPage = lazy(() => import("./pages/StableTales"));
const EmptyPage = lazy(() => import("./pages/EmptyPage"));
const ConverterPage = lazy(() => import("./pages/Converter"));
const PassagePlanPage = lazy(() => import("./pages/PassagePlanPage"));
const MoonPhases = lazy(() => import("./pages/MoonPhases"));
const Settings = lazy(() => import("./pages/Settings"));
const NotesRouteOverlay = lazy(() => import("./components/NotesRouteOverlay"));
const ProPage = lazy(() => import("./pages/ProPage"));
const Formulas = lazy(() => import("./pages/Formulas"));
const Regulations = lazy(() => import("./pages/Regulations"));
const StabilityFormulasPage = lazy(() => import("./pages/StabilityFormulas"));
const Glossary = lazy(() => import("./pages/Glossary"));

const StabilityFormulaDetailPage = lazy(() => import("./pages/StabilityFormulaDetail"));
const NavigationFormulasPage = lazy(() => import("./pages/NavigationFormulas"));

const DetailedMeteorology = lazy(() => import("./pages/DetailedMeteorology"));

const StabilityCalculationsPage = lazy(() => import("./pages/StabilityCalculations"));
const StabilityQuizPage = lazy(() => import("./pages/StabilityQuiz"));
const StabilityShearingBendingPage = lazy(() => import("./pages/StabilityShearingBending"));
const NavigationQuizPage = lazy(() => import("./pages/NavigationQuiz"));
const NavigationAssistantPage = lazy(() => import("./pages/NavigationAssistant"));
const ClockPage = lazy(() => import("./pages/Clock"));
const AuthPage = lazy(() => import("./pages/Auth"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallback"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const StabilityPracticalPage = lazy(() => import("./pages/StabilityPractical"));
const StabilityPracticalTankPage = lazy(() => import("./pages/StabilityPracticalTank"));
const StabilityPracticalFWAPage = lazy(() => import("./pages/StabilityPracticalFWA"));
const StabilityPracticalGHMPage = lazy(() => import("./pages/StabilityPracticalGHM"));
const StabilityGrainCalculationPage = lazy(() => import("./pages/StabilityGrainCalculation"));
const StabilityGZCurvePage = lazy(() => import("./pages/StabilityGZCurve"));
const StabilityWindWeatherPage = lazy(() => import("./pages/StabilityWindWeather"));
const StabilityIMOCriteriaPage = lazy(() => import("./pages/StabilityIMOCriteria"));
const SafetyCalculationsPage = lazy(() => import("./pages/SafetyCalculations"));
const TankCalculationsPage = lazy(() => import("./pages/TankCalculations"));
const BallastPage = lazy(() => import("./pages/Ballast"));
const EnginePage = lazy(() => import("./pages/Engine"));
const HydrodynamicsPage = lazy(() => import("./pages/Hydrodynamics"));
const StructuralCalculationsPage = lazy(() => import("./pages/StructuralCalculations"));
const SpecialShipCalculationsPage = lazy(() => import("./pages/SpecialShipCalculations"));
const EmissionCalculationsPage = lazy(() => import("./pages/EmissionCalculationsPage"));
const MachineTopicCalculationsPage = lazy(() => import("./pages/MachineTopicCalculationsPage"));
const MachineTopicFormulasPage = lazy(() => import("./pages/MachineTopicFormulasPage"));
const CourseFormulasPage = lazy(() => import("./pages/CourseFormulasPage"));
const CourseCalculationsPage = lazy(() => import("./pages/CourseCalculationsPage"));
const CourseQuizPage = lazy(() => import("./pages/CourseQuizPage"));
const MachineTopicAssistantPage = lazy(() => import("./pages/MachineTopicAssistantPage"));
const MachineTopicQuizPage = lazy(() => import("./pages/MachineTopicQuizPage"));
const MachineTopicLessonsPage = lazy(() => import("./pages/MachineTopicLessonsPage"));
const MachineTopicDetailPage = lazy(() => import("./pages/MachineTopicDetailPage"));

const EmissionFormulas = lazy(() => import("./pages/EmissionFormulas"));
const EmissionAssistant = lazy(() => import("./pages/EmissionAssistant"));
const EmissionQuiz = lazy(() => import("./pages/EmissionQuiz"));
const SOLASRegulationsPage = lazy(() => import("./pages/SOLASRegulations"));
const SOLASCertificatesPage = lazy(() => import("./pages/SOLASCertificates"));
const SOLASShipRequirementsPage = lazy(() => import("./pages/SOLASShipRequirements"));
const SOLASSafetyEquipmentPage = lazy(() => import("./pages/SOLASSafetyEquipment"));
const BridgeDeviceDetailPage = lazy(() => import("./pages/BridgeDeviceDetail"));
const WeatherForecast = lazy(() => import("./pages/WeatherForecast"));
const SunsetTimes = lazy(() => import("./pages/SunsetTimes"));
const SunriseTimes = lazy(() => import("./pages/SunriseTimes"));
const LocationSelector = lazy(() => import("./pages/LocationSelector"));
const DraftSurveyCalculator = lazy(() => import("./pages/DraftSurveyCalculator"));
const DraftSurveyStandard = lazy(() => import("./pages/DraftSurveyStandard"));
const DraftSurveyPreloading = lazy(() => import("./pages/DraftSurveyPreloading"));
const DraftSurveyIntermediate = lazy(() => import("./pages/DraftSurveyIntermediate"));
const DraftSurveyPostdischarge = lazy(() => import("./pages/DraftSurveyPostdischarge"));
const DraftSurveyComparative = lazy(() => import("./pages/DraftSurveyComparative"));
const DraftSurveyBallast = lazy(() => import("./pages/DraftSurveyBallast"));
const DraftSurveyDensity = lazy(() => import("./pages/DraftSurveyDensity"));
const DraftSurveyBunker = lazy(() => import("./pages/DraftSurveyBunker"));
const CargoCalculationsPage = lazy(() => import("./pages/CargoCalculations"));

const CargoAssistantPage = lazy(() => import("./pages/CargoAssistant"));
const CargoQuizPage = lazy(() => import("./pages/CargoQuiz"));
const MeteorologyFormulasPage = lazy(() => import("./pages/MeteorologyFormulas"));
const MeteorologyAssistantPage = lazy(() => import("./pages/MeteorologyAssistant"));
const MeteorologyQuizPage = lazy(() => import("./pages/MeteorologyQuiz"));
const CommunicationAssistantPage = lazy(() => import("./pages/CommunicationAssistant"));
const SeamanshipCalculationsPage = lazy(() => import("./pages/SeamanshipCalculations"));
const SeamanshipCalculationDetailPage = lazy(() =>
  import("./pages/SeamanshipCalculations").then((m) => ({
    default: m.SeamanshipCalculationDetailPage,
  })),
);
const SeamanshipFormulasPage = lazy(() => import("./pages/SeamanshipFormulas"));
const SeamanshipAssistantPage = lazy(() => import("./pages/SeamanshipAssistant"));
const SeamanshipQuizPage = lazy(() => import("./pages/SeamanshipQuiz"));

const SafetyFormulasPage = lazy(() => import("./pages/SafetyFormulas"));
const SafetyAssistantPage = lazy(() => import("./pages/SafetyAssistant"));
const SafetyQuizPage = lazy(() => import("./pages/SafetyQuiz"));
const MachineAssistantPage = lazy(() => import("./pages/MachineAssistant"));
const MachineCalculationsPage = lazy(() => import("./pages/MachineCalculationsPage"));
const MachineFormulasPage = lazy(() => import("./pages/MachineFormulas"));
const MachineQuizPage = lazy(() => import("./pages/MachineQuiz"));
const RegulationDetailPage = lazy(() => import("./pages/RegulationDetailPage"));
const ExamPreparationPage = lazy(() => import("./pages/ExamPreparationPage"));

const MaritimeNews = lazy(() => import("./pages/MaritimeNews"));

const CrewRoleDetailPage = lazy(() => import("./pages/CrewRoleDetail"));
const CrewTaskDeepDive = lazy(() => import("./pages/CrewTaskDeepDive"));
const MusterListPage = lazy(() => import("./pages/MusterListPage"));
const LessonTopicsPage = lazy(() => import("./pages/LessonTopicsPage"));
const LessonTopicDetailPage = lazy(() => import("./pages/LessonTopicDetailPage"));
// Alıştırmalar (orijinal Dersler'e dokunmadan, ayrı sayfalar)
const ExercisesPage = lazy(() => import("./pages/ExercisesPage"));
const ExerciseTopicsPage = lazy(() => import("./pages/ExerciseTopicsPage"));
const ExerciseTopicDetailPage = lazy(() => import("./pages/ExerciseTopicDetailPage"));
const GuidedLessonSession = lazy(() => import("./components/lessons/GuidedLessonSession"));

const ShipSystemsPage = lazy(() => import("./pages/ShipSystemsPage"));
const ShipSystemDetailPage = lazy(() => import("./pages/ShipSystemDetailPage"));
const ShipSystemDeepDive = lazy(() => import("./pages/ShipSystemDeepDive"));
const StabilityTopicsPage = lazy(() => import("./pages/StabilityTopicsPage"));
const CargoTopicsPage = lazy(() => import("./pages/CargoTopicsPage"));
const SeamanshipTopicsPage = lazy(() => import("./pages/SeamanshipTopicsPage"));
const SafetyTopicsPage = lazy(() => import("./pages/SafetyTopicsPage"));
const EnvironmentTopicsPage = lazy(() => import("./pages/EnvironmentTopicsPage"));
const EconomicsTopicsPage = lazy(() => import("./pages/EconomicsTopicsPage"));
const BetaFeaturesPage = lazy(() => import("./pages/BetaFeaturesPage"));
const BetaPscChecklist = lazy(() => import("./pages/BetaPscChecklist"));
const BetaShipSimulator = lazy(() => import("./pages/BetaShipSimulator"));
const BetaDocumentTracker = lazy(() => import("./pages/BetaDocumentTracker"));
const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  // Wire up hierarchical back-button handling. The back button never
  // exits the app — see useNavigationHierarchy for the policy.
  useNavigationHierarchy();

  return (
    <>
    <FloatingNavButtons />
    {/* App-wide search dialog: ⌘K / Ctrl+K and the "open-global-search"
        event now work on every route, not just the home page. The trigger
        button is hidden; the dialog itself renders through a portal. */}
    <div className="hidden">
      <GlobalSearch />
    </div>
    <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/maritime-news" element={<PageTransition><MaritimeNews /></PageTransition>} />
        <Route path="/calculations" element={<PageTransition><CalculationsMenu /></PageTransition>} />
        <Route path="/lessons" element={<PageTransition><LessonsPage /></PageTransition>} />
        <Route path="/glossary" element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="/pro" element={<PageTransition><ProPage /></PageTransition>} />
        <Route path="/beta" element={<PageTransition><BetaFeaturesPage /></PageTransition>} />
        <Route path="/beta/psc-checklist" element={<ProRoute feature="Gelişmiş simülasyonlar"><PageTransition><BetaPscChecklist /></PageTransition></ProRoute>} />
        <Route path="/beta/ship-simulator" element={<ProRoute feature="Gelişmiş simülasyonlar"><PageTransition><BetaShipSimulator /></PageTransition></ProRoute>} />
        <Route path="/beta/documents" element={<ProRoute feature="Belge ve sertifika takibi"><PageTransition><BetaDocumentTracker /></PageTransition></ProRoute>} />


        <Route path="/lessons/stability/topics" element={<PageTransition><StabilityTopicsPage /></PageTransition>} />
        <Route path="/lessons/cargo/topics" element={<PageTransition><CargoTopicsPage /></PageTransition>} />
        <Route path="/lessons/seamanship/topics" element={<PageTransition><SeamanshipTopicsPage /></PageTransition>} />
        <Route path="/lessons/safety/topics" element={<PageTransition><SafetyTopicsPage /></PageTransition>} />
        <Route path="/lessons/environment/topics" element={<PageTransition><EnvironmentTopicsPage /></PageTransition>} />
        <Route path="/lessons/economics/topics" element={<PageTransition><EconomicsTopicsPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/formulas" element={<PageTransition><CourseFormulasPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/calculations" element={<PageTransition><CourseCalculationsPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/rules" element={<Navigate to="../topics" relative="path" replace />} />
        <Route path="/lessons/:topicKey/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><CourseQuizPage /></PageTransition></ProRoute>} />
        <Route path="/lessons/:categoryId/topics" element={<PageTransition><LessonTopicsPage /></PageTransition>} />
        <Route path="/lessons/:categoryId/topics/:topicTitle" element={<PageTransition><LessonTopicDetailPage /></PageTransition>} />
        {/* Alıştırmalar — orijinal /lessons route'larına dokunulmadan eklendi */}
        <Route path="/exercises" element={<PageTransition><ExercisesPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics" element={<PageTransition><ExerciseTopicsPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle" element={<PageTransition><ExerciseTopicDetailPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle/learn" element={<PageTransition><GuidedLessonSession /></PageTransition>} />
        <Route path="/crew" element={<PageTransition><CrewHierarchyPage /></PageTransition>} />
        <Route path="/crew/muster-list" element={<PageTransition><MusterListPage /></PageTransition>} />
        <Route path="/bridge" element={<PageTransition><BridgeDevicesPage /></PageTransition>} />
        <Route path="/machinery" element={<PageTransition><MachineryHubPage /></PageTransition>} />
        <Route path="/ship-tasks" element={<PageTransition><ShipTasksPage /></PageTransition>} />
        <Route path="/ship-tasks/:taskSlug" element={<PageTransition><ShipTaskDetailPage /></PageTransition>} />
        <Route path="/ship-operations" element={<PageTransition><ShipOperationsPage /></PageTransition>} />
        <Route path="/ship-operations/:shipType" element={<PageTransition><ShipOperationsDetail /></PageTransition>} />
        <Route path="/ship-operations/:shipType/:dept/:opIndex" element={<PageTransition><ShipOperationDeepDive /></PageTransition>} />
        <Route path="/crew/:roleSlug" element={<PageTransition><CrewRoleDetailPage /></PageTransition>} />
        <Route path="/crew/:roleSlug/task/:taskIndex" element={<PageTransition><CrewTaskDeepDive /></PageTransition>} />
        <Route path="/bridge/:deviceId" element={<PageTransition><BridgeDeviceDetailPage /></PageTransition>} />
        <Route path="/passage-plan" element={<PageTransition><PassagePlanPage /></PageTransition>} />
        <Route path="/ship-systems" element={<ProRoute feature="3D Gemi Sistemleri"><PageTransition><ShipSystemsPage /></PageTransition></ProRoute>} />
        <Route path="/ship-systems/:sectionId" element={<ProRoute feature="3D Gemi Sistemleri"><PageTransition><ShipSystemDetailPage /></PageTransition></ProRoute>} />
        <Route path="/ship-systems/:sectionId/:topicIndex" element={<ProRoute feature="3D Gemi Sistemleri"><PageTransition><ShipSystemDeepDive /></PageTransition></ProRoute>} />

        <Route path="/calculations/:categoryId/:sectionId" element={<PageTransition><CalculationSectionPage /></PageTransition>} />
        {/* Stability sub-routes */}
        <Route path="/stability/assistant" element={<PageTransition><StabilityAssistantPage /></PageTransition>} />
        <Route path="/stability/rules" element={<Navigate to="/lessons/stability/topics" replace />} />
        <Route path="/stability/gz-imo" element={<PageTransition><StabilityGZIMO /></PageTransition>} />
        <Route path="/stability/grain" element={<PageTransition><StabilityGrainPage /></PageTransition>} />
        <Route path="/stability/gm" element={<PageTransition><StabilityGMPage /></PageTransition>} />
        <Route path="/stability/weight-shift" element={<PageTransition><StabilityWeightShiftPage /></PageTransition>} />
        <Route path="/stability/free-surface" element={<PageTransition><StabilityFreeSurfacePage /></PageTransition>} />
        <Route path="/stability/gz" element={<PageTransition><StabilityGZPage /></PageTransition>} />
        <Route path="/stability/analysis" element={<PageTransition><StabilityAnalysisPage /></PageTransition>} />
        <Route path="/stability/stable-tales" element={<PageTransition><StableTalesPage /></PageTransition>} />
        <Route path="/stability/formulas" element={<PageTransition><StabilityFormulasPage /></PageTransition>} />
        <Route path="/stability/formulas/:id" element={<PageTransition><StabilityFormulaDetailPage /></PageTransition>} />
        <Route path="/stability/calculations" element={<PageTransition><StabilityCalculationsPage /></PageTransition>} />
        <Route path="/stability/practical" element={<PageTransition><StabilityPracticalPage /></PageTransition>} />
        <Route path="/stability/practical/tank" element={<PageTransition><StabilityPracticalTankPage /></PageTransition>} />
        <Route path="/stability/practical/fwa" element={<PageTransition><StabilityPracticalFWAPage /></PageTransition>} />
        <Route path="/stability/practical/ghm" element={<PageTransition><StabilityPracticalGHMPage /></PageTransition>} />

        <Route path="/stability/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><StabilityQuizPage /></PageTransition></ProRoute>} />
        <Route path="/stability/shearing-bending" element={<PageTransition><StabilityShearingBendingPage /></PageTransition>} />
        <Route path="/stability/grain-calculation" element={<PageTransition><StabilityGrainCalculationPage /></PageTransition>} />
        <Route path="/stability/gz-curve" element={<PageTransition><StabilityGZCurvePage /></PageTransition>} />
        <Route path="/stability/wind-weather" element={<PageTransition><StabilityWindWeatherPage /></PageTransition>} />
        <Route path="/stability/imo-criteria" element={<PageTransition><StabilityIMOCriteriaPage /></PageTransition>} />
        <Route path="/safety" element={<PageTransition><SafetyCalculationsPage /></PageTransition>} />
        <Route path="/meteorology/topics" element={<PageTransition><DetailedMeteorology /></PageTransition>} />
        <Route path="/tank" element={<PageTransition><TankCalculationsPage /></PageTransition>} />
        <Route path="/cargo/calculations" element={<PageTransition><CargoCalculationsPage /></PageTransition>} />
        <Route path="/cargo/calculations/draft-survey" element={<PageTransition><DraftSurveyCalculator /></PageTransition>} />
        <Route path="/cargo/calculations/preloading" element={<PageTransition><DraftSurveyPreloading /></PageTransition>} />
        <Route path="/cargo/calculations/intermediate" element={<PageTransition><DraftSurveyIntermediate /></PageTransition>} />
        <Route path="/cargo/calculations/postdischarge" element={<PageTransition><DraftSurveyPostdischarge /></PageTransition>} />
        <Route path="/cargo/calculations/comparative" element={<PageTransition><DraftSurveyComparative /></PageTransition>} />
        <Route path="/cargo/calculations/ballast" element={<PageTransition><DraftSurveyBallast /></PageTransition>} />
        <Route path="/cargo/calculations/density" element={<PageTransition><DraftSurveyDensity /></PageTransition>} />
        <Route path="/cargo/calculations/bunker" element={<PageTransition><DraftSurveyBunker /></PageTransition>} />
        <Route path="/cargo/formulas" element={<PageTransition><DraftSurveyStandard /></PageTransition>} />

        <Route path="/cargo/rules" element={<Navigate to="/lessons/cargo/topics" replace />} />
        <Route path="/cargo/assistant" element={<PageTransition><CargoAssistantPage /></PageTransition>} />
        <Route path="/cargo/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><CargoQuizPage /></PageTransition></ProRoute>} />
        <Route path="/meteorology/formulas" element={<PageTransition><MeteorologyFormulasPage /></PageTransition>} />
        <Route path="/meteorology/rules" element={<Navigate to="/lessons/meteorology/topics" replace />} />
        <Route path="/meteorology/assistant" element={<PageTransition><MeteorologyAssistantPage /></PageTransition>} />
        <Route path="/meteorology/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><MeteorologyQuizPage /></PageTransition></ProRoute>} />
        <Route path="/communication/assistant" element={<PageTransition><CommunicationAssistantPage /></PageTransition>} />
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
        <Route path="/environment/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><EmissionQuiz /></PageTransition></ProRoute>} />
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
        <Route path="/seamanship/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><SeamanshipQuizPage /></PageTransition></ProRoute>} />

        <Route path="/safety/formulas" element={<PageTransition><SafetyFormulasPage /></PageTransition>} />
        <Route path="/safety/rules" element={<Navigate to="/lessons/safety/topics" replace />} />
        <Route path="/safety/assistant" element={<PageTransition><SafetyAssistantPage /></PageTransition>} />
        <Route path="/safety/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><SafetyQuizPage /></PageTransition></ProRoute>} />

        <Route path="/machine/calculations" element={<PageTransition><MachineCalculationsPage /></PageTransition>} />
        <Route path="/machine/formulas" element={<PageTransition><MachineFormulasPage /></PageTransition>} />
        <Route path="/machine/rules" element={<Navigate to="/lessons?library=machine" replace />} />
        <Route path="/machine/assistant" element={<PageTransition><MachineAssistantPage /></PageTransition>} />
        <Route path="/machine/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><MachineQuizPage /></PageTransition></ProRoute>} />
        {/* Machine topic sub-routes */}
        <Route path="/machine/:topicSlug/topics" element={<PageTransition><MachineTopicLessonsPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/calculations" element={<PageTransition><MachineTopicCalculationsPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/formulas" element={<PageTransition><MachineTopicFormulasPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/rules" element={<Navigate to="../topics" relative="path" replace />} />
        <Route path="/machine/:topicSlug/assistant" element={<PageTransition><MachineTopicAssistantPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/topics/:subTopicTitle" element={<PageTransition><MachineTopicDetailPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><MachineTopicQuizPage /></PageTransition></ProRoute>} />
        <Route path="/navigation" element={<PageTransition><Navigation /></PageTransition>} />
        <Route path="/navigation/calc/:id" element={<PageTransition><NavigationCalculationPage /></PageTransition>} />
        <Route path="/navigation/tide-tutorial" element={<PageTransition><TideCalculationTutorial /></PageTransition>} />
        <Route path="/navigation/formulas" element={<PageTransition><NavigationFormulasPage /></PageTransition>} />
        <Route path="/navigation/rules" element={<Navigate to="/lessons/navigation/topics" replace />} />

        <Route path="/navigation/meteorology" element={<PageTransition><DetailedMeteorology /></PageTransition>} />
        
        <Route path="/navigation/assistant" element={<PageTransition><NavigationAssistantPage /></PageTransition>} />
        <Route path="/navigation/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><NavigationQuizPage /></PageTransition></ProRoute>} />
        <Route path="/economics" element={<PageTransition><Economics /></PageTransition>} />
        <Route path="/economics/assistant" element={<PageTransition><EconomicsAssistantPage /></PageTransition>} />
        <Route path="/economics/quiz" element={<ProRoute feature="Quiz ve sınav hazırlığı"><PageTransition><EconomicsQuizPage /></PageTransition></ProRoute>} />
        <Route path="/empty-page" element={<PageTransition><EmptyPage /></PageTransition>} />
        <Route path="/moon-phases" element={<PageTransition><MoonPhases /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/formulas" element={<PageTransition><Formulas /></PageTransition>} />
        <Route path="/regulations" element={<PageTransition><Regulations /></PageTransition>} />
        <Route path="/regulations/:slug" element={<PageTransition><RegulationDetailPage /></PageTransition>} />
        <Route path="/clock" element={<PageTransition><ClockPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
        <Route path="/weather-forecast" element={<PageTransition><WeatherForecast /></PageTransition>} />
        <Route path="/sunset-times" element={<PageTransition><SunsetTimes /></PageTransition>} />
        <Route path="/sunrise-times" element={<PageTransition><SunriseTimes /></PageTransition>} />
        <Route path="/location-selector" element={<PageTransition><LocationSelector /></PageTransition>} />
        <Route path="/exam-preparation" element={<PageTransition><ExamPreparationPage /></PageTransition>} />
        <Route path="/converter" element={<PageTransition><ConverterPage /></PageTransition>} />
        <Route path="/machine-calculations" element={<PageTransition><MachineCalculationsPage /></PageTransition>} />
        <Route path="/widgets" element={<Navigate to="/" replace />} />
        <Route path="*" element={<PageTransition><Index /></PageTransition>} />
        </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  // Prefer maximum smoothness on high refresh displays (e.g. 120Hz)
  useFrameRate();

  // App-wide screenshot / screen-recording blocking (native only).
  // Android: FLAG_SECURE (fully blocks). iOS: blanks captures + app-switcher
  // blur + screenshot detection. No-op on web.
  useScreenProtection();

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
              <ThemeProvider defaultTheme="dark" storageKey="maritime-ui-theme-v2">
                <FontSizeProvider>
                  <Toaster />
                  <DocumentExpiryNotifier />
                  <AskAIPopup />
                  <LanguageChangeOverlay />
                  <GlobalMaritimeBackground />
                  <div className="min-h-screen text-foreground overflow-x-hidden">
                    <BrowserRouter>
                      {/* Every route change starts the new page at the top —
                          the previous page's scroll offset is never carried
                          over. Must sit inside the router. */}
                      <ScrollToTop />
                      <RouteTranslationGate />
                      {/* AdMob orchestration: free tier only, never on the home
                          page / auth flow / paywall. Renders nothing — the
                          banner is a native view (see src/services/ads.ts). */}
                      <AdsController />
                      {/* Login wall: only the home page and the auth screens are
                          open to anonymous visitors. NotesRouteOverlay renders
                          itself for /notes outside <Routes>, so it has to sit
                          inside the gate too. */}
                      <RequireAuth>
                        <AnimatedRoutes />
                        <Suspense fallback={null}>
                          <NotesRouteOverlay />
                        </Suspense>
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
