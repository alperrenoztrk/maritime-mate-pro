import { Suspense, useEffect } from "react";
import { lazyWithReload } from "@/lib/lazyWithReload";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalMaritimeBackground } from "@/components/GlobalMaritimeBackground";
import { Toaster } from "@/components/ui/sonner";
import { AskAIPopup } from "@/components/AskAIPopup";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageChangeOverlay } from "@/components/LanguageChangeOverlay";

import { DensityProvider } from "@/contexts/DensityContext";
import { FontSizeProvider } from "@/contexts/FontSizeContext";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { RouteTranslationGate } from "@/components/RouteTranslationGate";
import { useNavigationHierarchy } from "@/hooks/useNavigationHierarchy";
import { useFrameRate } from "@/hooks/useFrameRate";
import { FloatingNavButtons } from "@/components/FloatingNavButtons";

// Pages are code-split via React.lazy so the initial bundle stays small enough
// for the mobile preview / first paint. Each route only downloads its own chunk.
const Index = lazyWithReload(() => import("./pages/Index"));
const CalculationsMenu = lazyWithReload(() => import("./pages/CalculationsMenu"));
const LessonsPage = lazyWithReload(() => import("./pages/LessonsPage"));
const CrewHierarchyPage = lazyWithReload(() => import("./pages/CrewHierarchyPage"));
const BridgeDevicesPage = lazyWithReload(() => import("./pages/BridgeDevicesPage"));
const MachineryHubPage = lazyWithReload(() => import("./pages/MachineryHubPage"));
const ShipTasksPage = lazyWithReload(() => import("./pages/ShipTasksPage"));
const ShipTaskDetailPage = lazyWithReload(() => import("./pages/ShipTaskDetailPage"));
const ShipOperationsPage = lazyWithReload(() => import("./pages/ShipOperationsPage"));
const ShipOperationsDetail = lazyWithReload(() => import("./pages/ShipOperationsDetail"));
const ShipOperationDeepDive = lazyWithReload(() => import("./pages/ShipOperationDeepDive"));
const CalculationSectionPage = lazyWithReload(() => import("./pages/CalculationSectionPage"));
const Navigation = lazyWithReload(() => import("./pages/Navigation"));
const NavigationCalculationPage = lazyWithReload(() => import("./pages/NavigationCalculation"));
const TideCalculationTutorial = lazyWithReload(() => import("./pages/TideCalculationTutorial"));
const Economics = lazyWithReload(() => import("./pages/Economics"));
const StabilityAssistantPage = lazyWithReload(() => import("./pages/StabilityAssistant"));
const StabilityGZIMO = lazyWithReload(() => import("./pages/StabilityGZIMO"));
const StabilityRules = lazyWithReload(() => import("./pages/StabilityRules"));
const StabilityGrainPage = lazyWithReload(() => import("./pages/StabilityGrain"));
const StabilityGMPage = lazyWithReload(() => import("./pages/StabilityGM"));
const StabilityWeightShiftPage = lazyWithReload(() => import("./pages/StabilityWeightShift"));
const StabilityFreeSurfacePage = lazyWithReload(() => import("./pages/StabilityFreeSurface"));
const StabilityGZPage = lazyWithReload(() => import("./pages/StabilityGZ"));
const SailorKnotsPage = lazyWithReload(() => import("./pages/SailorKnots"));
const StabilityAnalysisPage = lazyWithReload(() => import("./pages/StabilityAnalysis"));
const StableTalesPage = lazyWithReload(() => import("./pages/StableTales"));
const EmptyPage = lazyWithReload(() => import("./pages/EmptyPage"));
const ConverterPage = lazyWithReload(() => import("./pages/Converter"));
const PassagePlanPage = lazyWithReload(() => import("./pages/PassagePlanPage"));
const MoonPhases = lazyWithReload(() => import("./pages/MoonPhases"));
const Settings = lazyWithReload(() => import("./pages/Settings"));
const Formulas = lazyWithReload(() => import("./pages/Formulas"));
const Regulations = lazyWithReload(() => import("./pages/Regulations"));
const StabilityFormulasPage = lazyWithReload(() => import("./pages/StabilityFormulas"));
const Glossary = lazyWithReload(() => import("./pages/Glossary"));

const StabilityFormulaDetailPage = lazyWithReload(() => import("./pages/StabilityFormulaDetail"));
const NavigationFormulasPage = lazyWithReload(() => import("./pages/NavigationFormulas"));

const DetailedMeteorology = lazyWithReload(() => import("./pages/DetailedMeteorology"));
const COLREGPresentation = lazyWithReload(() => import("./pages/COLREGPresentation"));
const NavigationRulesPage = lazyWithReload(() => import("./pages/NavigationRules"));
const StabilityCalculationsPage = lazyWithReload(() => import("./pages/StabilityCalculations"));
const StabilityQuizPage = lazyWithReload(() => import("./pages/StabilityQuiz"));
const StabilityShearingBendingPage = lazyWithReload(() => import("./pages/StabilityShearingBending"));
const NavigationQuizPage = lazyWithReload(() => import("./pages/NavigationQuiz"));
const NavigationAssistantPage = lazyWithReload(() => import("./pages/NavigationAssistant"));
const ClockPage = lazyWithReload(() => import("./pages/Clock"));
const AuthCallback = lazyWithReload(() => import("./pages/AuthCallback"));
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
const CourseRulesPage = lazyWithReload(() => import("./pages/CourseRulesPage"));
const CourseQuizPage = lazyWithReload(() => import("./pages/CourseQuizPage"));
const MachineTopicRulesPage = lazyWithReload(() => import("./pages/MachineTopicRulesPage"));
const MachineTopicAssistantPage = lazyWithReload(() => import("./pages/MachineTopicAssistantPage"));
const MachineTopicQuizPage = lazyWithReload(() => import("./pages/MachineTopicQuizPage"));
const MachineTopicLessonsPage = lazyWithReload(() => import("./pages/MachineTopicLessonsPage"));
const MachineTopicDetailPage = lazyWithReload(() => import("./pages/MachineTopicDetailPage"));

const EmissionFormulas = lazyWithReload(() => import("./pages/EmissionFormulas"));
const EmissionRules = lazyWithReload(() => import("./pages/EmissionRules"));
const EmissionAssistant = lazyWithReload(() => import("./pages/EmissionAssistant"));
const EmissionQuiz = lazyWithReload(() => import("./pages/EmissionQuiz"));
const SOLASRegulationsPage = lazyWithReload(() => import("./pages/SOLASRegulations"));
const SOLASCertificatesPage = lazyWithReload(() => import("./pages/SOLASCertificates"));
const SOLASShipRequirementsPage = lazyWithReload(() => import("./pages/SOLASShipRequirements"));
const SOLASSafetyEquipmentPage = lazyWithReload(() => import("./pages/SOLASSafetyEquipment"));
const BridgeDeviceDetailPage = lazyWithReload(() => import("./pages/BridgeDeviceDetail"));
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

const CargoRulesPage = lazyWithReload(() => import("./pages/CargoRules"));
const CargoAssistantPage = lazyWithReload(() => import("./pages/CargoAssistant"));
const CargoQuizPage = lazyWithReload(() => import("./pages/CargoQuiz"));
const MeteorologyFormulasPage = lazyWithReload(() => import("./pages/MeteorologyFormulas"));
const MeteorologyRulesPage = lazyWithReload(() => import("./pages/MeteorologyRules"));
const MeteorologyAssistantPage = lazyWithReload(() => import("./pages/MeteorologyAssistant"));
const MeteorologyQuizPage = lazyWithReload(() => import("./pages/MeteorologyQuiz"));
const SeamanshipCalculationsPage = lazyWithReload(() => import("./pages/SeamanshipCalculations"));
const SeamanshipCalculationDetailPage = lazyWithReload(() =>
  import("./pages/SeamanshipCalculations").then((m) => ({
    default: m.SeamanshipCalculationDetailPage,
  })),
);
const SeamanshipFormulasPage = lazyWithReload(() => import("./pages/SeamanshipFormulas"));
const SeamanshipRulesPage = lazyWithReload(() => import("./pages/SeamanshipRules"));
const SeamanshipAssistantPage = lazyWithReload(() => import("./pages/SeamanshipAssistant"));
const SeamanshipQuizPage = lazyWithReload(() => import("./pages/SeamanshipQuiz"));

const SafetyFormulasPage = lazyWithReload(() => import("./pages/SafetyFormulas"));
const SafetyRulesPage = lazyWithReload(() => import("./pages/SafetyRules"));
const SafetyAssistantPage = lazyWithReload(() => import("./pages/SafetyAssistant"));
const SafetyQuizPage = lazyWithReload(() => import("./pages/SafetyQuiz"));
const MachineAssistantPage = lazyWithReload(() => import("./pages/MachineAssistant"));
const MachineCalculationsPage = lazyWithReload(() => import("./pages/MachineCalculationsPage"));
const MachineFormulasPage = lazyWithReload(() => import("./pages/MachineFormulas"));
const MachineQuizPage = lazyWithReload(() => import("./pages/MachineQuiz"));
const MachineRulesPage = lazyWithReload(() => import("./pages/MachineRules"));
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
const CourseBetaScenariosPage = lazyWithReload(() => import("./pages/CourseBetaScenariosPage"));
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
const BetaWorkHoursTool = lazyWithReload(() => import("./pages/BetaWorkHoursTool"));
const BetaPscChecklist = lazyWithReload(() => import("./pages/BetaPscChecklist"));
const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />
  </div>
);

// Shown when a single page fails to render. It is scoped to the route (the
// surrounding ErrorBoundary resets on navigation), so the rest of the app keeps
// working and the user can recover without killing the session.
const RouteErrorFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center text-foreground">
    <p className="text-lg font-semibold">Bu sayfa yüklenemedi</p>
    <p className="max-w-sm text-sm text-muted-foreground">
      Sayfa açılırken bir sorun oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Tekrar Dene
      </button>
      <button
        type="button"
        onClick={() => {
          window.location.assign("/");
        }}
        className="rounded-full border border-border bg-card/60 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
      >
        Ana Sayfa
      </button>
    </div>
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
    <AnimatePresence mode="wait">
      <ErrorBoundary resetKey={location.pathname} fallback={<RouteErrorFallback />}>
      <Suspense fallback={<RouteFallback />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/maritime-news" element={<PageTransition><MaritimeNews /></PageTransition>} />
        <Route path="/calculations" element={<PageTransition><CalculationsMenu /></PageTransition>} />
        <Route path="/lessons" element={<PageTransition><LessonsPage /></PageTransition>} />
        <Route path="/glossary" element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="/beta" element={<PageTransition><BetaFeaturesPage /></PageTransition>} />
        <Route path="/beta/work-hours" element={<PageTransition><BetaWorkHoursTool /></PageTransition>} />
        <Route path="/beta/psc-checklist" element={<PageTransition><BetaPscChecklist /></PageTransition>} />

        <Route path="/lessons/stability/topics" element={<PageTransition><StabilityTopicsPage /></PageTransition>} />
        <Route path="/lessons/cargo/topics" element={<PageTransition><CargoTopicsPage /></PageTransition>} />
        <Route path="/lessons/seamanship/topics" element={<PageTransition><SeamanshipTopicsPage /></PageTransition>} />
        <Route path="/lessons/safety/topics" element={<PageTransition><SafetyTopicsPage /></PageTransition>} />
        <Route path="/lessons/environment/topics" element={<PageTransition><EnvironmentTopicsPage /></PageTransition>} />
        <Route path="/lessons/economics/topics" element={<PageTransition><EconomicsTopicsPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/formulas" element={<PageTransition><CourseFormulasPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/calculations" element={<PageTransition><CourseCalculationsPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/rules" element={<PageTransition><CourseRulesPage /></PageTransition>} />
        <Route path="/lessons/:topicKey/quiz" element={<PageTransition><CourseQuizPage /></PageTransition>} />
        <Route path="/lessons/:categoryId/topics" element={<PageTransition><LessonTopicsPage /></PageTransition>} />
        <Route path="/lessons/:categoryId/topics/:topicTitle" element={<PageTransition><LessonTopicDetailPage /></PageTransition>} />
        {/* Alıştırmalar — orijinal /lessons route'larına dokunulmadan eklendi */}
        <Route path="/exercises" element={<PageTransition><ExercisesPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics" element={<PageTransition><ExerciseTopicsPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle" element={<PageTransition><ExerciseTopicDetailPage /></PageTransition>} />
        <Route path="/exercises/:categoryId/topics/:topicTitle/learn" element={<PageTransition><GuidedLessonSession /></PageTransition>} />
        <Route path="/exercises/:topicKey/scenarios" element={<PageTransition><CourseBetaScenariosPage /></PageTransition>} />
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
        <Route path="/ship-systems" element={<PageTransition><ShipSystemsPage /></PageTransition>} />
        <Route path="/ship-systems/:sectionId" element={<PageTransition><ShipSystemDetailPage /></PageTransition>} />
        <Route path="/ship-systems/:sectionId/:topicIndex" element={<PageTransition><ShipSystemDeepDive /></PageTransition>} />
        <Route path="/calculations/:categoryId/:sectionId" element={<PageTransition><CalculationSectionPage /></PageTransition>} />
        {/* Stability sub-routes */}
        <Route path="/stability/assistant" element={<PageTransition><StabilityAssistantPage /></PageTransition>} />
        <Route path="/stability/rules" element={<PageTransition><StabilityRules /></PageTransition>} />
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

        <Route path="/stability/quiz" element={<PageTransition><StabilityQuizPage /></PageTransition>} />
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

        <Route path="/cargo/rules" element={<PageTransition><CargoRulesPage /></PageTransition>} />
        <Route path="/cargo/assistant" element={<PageTransition><CargoAssistantPage /></PageTransition>} />
        <Route path="/cargo/quiz" element={<PageTransition><CargoQuizPage /></PageTransition>} />
        <Route path="/meteorology/formulas" element={<PageTransition><MeteorologyFormulasPage /></PageTransition>} />
        <Route path="/meteorology/rules" element={<PageTransition><MeteorologyRulesPage /></PageTransition>} />
        <Route path="/meteorology/assistant" element={<PageTransition><MeteorologyAssistantPage /></PageTransition>} />
        <Route path="/meteorology/quiz" element={<PageTransition><MeteorologyQuizPage /></PageTransition>} />
        <Route path="/ballast" element={<PageTransition><BallastPage /></PageTransition>} />
        <Route path="/engine" element={<PageTransition><EnginePage /></PageTransition>} />
        <Route path="/hydrodynamics" element={<PageTransition><HydrodynamicsPage /></PageTransition>} />
        <Route path="/structural" element={<PageTransition><StructuralCalculationsPage /></PageTransition>} />
        <Route path="/special-ships" element={<PageTransition><SpecialShipCalculationsPage /></PageTransition>} />
        <Route path="/emissions" element={<PageTransition><EmissionCalculationsPage /></PageTransition>} />

        <Route path="/environment/calculations" element={<PageTransition><EmissionCalculationsPage /></PageTransition>} />
        <Route path="/environment/formulas" element={<PageTransition><EmissionFormulas /></PageTransition>} />
        <Route path="/environment/rules" element={<PageTransition><EmissionRules /></PageTransition>} />
        <Route path="/environment/assistant" element={<PageTransition><EmissionAssistant /></PageTransition>} />
        <Route path="/environment/quiz" element={<PageTransition><EmissionQuiz /></PageTransition>} />
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
        <Route path="/seamanship/rules" element={<PageTransition><SeamanshipRulesPage /></PageTransition>} />
        <Route path="/seamanship/assistant" element={<PageTransition><SeamanshipAssistantPage /></PageTransition>} />
        <Route path="/seamanship/quiz" element={<PageTransition><SeamanshipQuizPage /></PageTransition>} />

        <Route path="/safety/formulas" element={<PageTransition><SafetyFormulasPage /></PageTransition>} />
        <Route path="/safety/rules" element={<PageTransition><SafetyRulesPage /></PageTransition>} />
        <Route path="/safety/assistant" element={<PageTransition><SafetyAssistantPage /></PageTransition>} />
        <Route path="/safety/quiz" element={<PageTransition><SafetyQuizPage /></PageTransition>} />

        <Route path="/machine/calculations" element={<PageTransition><MachineCalculationsPage /></PageTransition>} />
        <Route path="/machine/formulas" element={<PageTransition><MachineFormulasPage /></PageTransition>} />
        <Route path="/machine/rules" element={<PageTransition><MachineRulesPage /></PageTransition>} />
        <Route path="/machine/assistant" element={<PageTransition><MachineAssistantPage /></PageTransition>} />
        <Route path="/machine/quiz" element={<PageTransition><MachineQuizPage /></PageTransition>} />
        {/* Machine topic sub-routes */}
        <Route path="/machine/:topicSlug/topics" element={<PageTransition><MachineTopicLessonsPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/calculations" element={<PageTransition><MachineTopicCalculationsPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/formulas" element={<PageTransition><MachineTopicFormulasPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/rules" element={<PageTransition><MachineTopicRulesPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/assistant" element={<PageTransition><MachineTopicAssistantPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/topics/:subTopicTitle" element={<PageTransition><MachineTopicDetailPage /></PageTransition>} />
        <Route path="/machine/:topicSlug/quiz" element={<PageTransition><MachineTopicQuizPage /></PageTransition>} />
        <Route path="/navigation" element={<PageTransition><Navigation /></PageTransition>} />
        <Route path="/navigation/calc/:id" element={<PageTransition><NavigationCalculationPage /></PageTransition>} />
        <Route path="/navigation/tide-tutorial" element={<PageTransition><TideCalculationTutorial /></PageTransition>} />
        <Route path="/navigation/formulas" element={<PageTransition><NavigationFormulasPage /></PageTransition>} />
        <Route path="/navigation/rules" element={<PageTransition><NavigationRulesPage /></PageTransition>} />

        <Route path="/navigation/meteorology" element={<PageTransition><DetailedMeteorology /></PageTransition>} />
        <Route path="/navigation/colreg-presentation" element={<PageTransition><COLREGPresentation /></PageTransition>} />
        <Route path="/navigation/assistant" element={<PageTransition><NavigationAssistantPage /></PageTransition>} />
        <Route path="/navigation/quiz" element={<PageTransition><NavigationQuizPage /></PageTransition>} />
        <Route path="/economics" element={<PageTransition><Economics /></PageTransition>} />
        <Route path="/empty-page" element={<PageTransition><EmptyPage /></PageTransition>} />
        <Route path="/moon-phases" element={<PageTransition><MoonPhases /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/formulas" element={<PageTransition><Formulas /></PageTransition>} />
        <Route path="/regulations" element={<PageTransition><Regulations /></PageTransition>} />
        <Route path="/regulations/:slug" element={<PageTransition><RegulationDetailPage /></PageTransition>} />
        <Route path="/clock" element={<PageTransition><ClockPage /></PageTransition>} />
        <Route path="/auth/callback" element={<PageTransition><AuthCallback /></PageTransition>} />
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
      </ErrorBoundary>
    </AnimatePresence>
    </>
  );
};

const App = () => {
  // Prefer maximum smoothness on high refresh displays (e.g. 120Hz)
  useFrameRate();

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
        <LanguageProvider>
          <TooltipProvider>
            <ThemeProvider defaultTheme="dark" storageKey="maritime-ui-theme-v2">
              <DensityProvider>
                <FontSizeProvider>
                  <Toaster />
                  <AskAIPopup />
                  <LanguageChangeOverlay />
                  <GlobalMaritimeBackground />
                  <div className="min-h-screen text-foreground overflow-x-hidden">
                    <BrowserRouter>
                      <RouteTranslationGate />
                      <AnimatedRoutes />
                    </BrowserRouter>
                  </div>
                </FontSizeProvider>
              </DensityProvider>

            </ThemeProvider>
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
