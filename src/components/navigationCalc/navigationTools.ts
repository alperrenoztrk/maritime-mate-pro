import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Clock,
  Compass,
  Crosshair,
  Eye,
  Globe2,
  LifeBuoy,
  Map,
  MapPinned,
  Monitor,
  Navigation,
  Radar,
  RotateCw,
  Route,
  Ruler,
  Shield,
  Sun,
  Sunrise,
  Waves,
  Wind,
} from "lucide-react";
import { ChartTool, CurrentTool, GreatCircleTool, MidLatTool, PlaneTool, PositionTool, RhumbTool } from "./SailingTools";
import { EtaTool, PassageTool } from "./PassageTools";
import { CompassTool } from "./CompassTools";
import { ColregTool, CpaTool, RadarTool } from "./CollisionTools";
import { BearingsTool, DistanceTool, EcdisTool, FixTool } from "./FixingTools";
import { AstroTool, CelestialTool, SightTool } from "./CelestialTools";
import { SafetyTool, TidesTool } from "./TideTools";
import { TurningTool } from "./ManoeuvringTools";
import { EmergencyTool, WeatherTool } from "./WeatherSarTools";

export interface NavigationTool {
  id: string;
  title: string;
  icon: LucideIcon;
  component: ComponentType;
}

export interface NavigationToolGroup {
  title: string;
  tools: NavigationTool[];
}

export const NAVIGATION_TOOL_GROUPS: NavigationToolGroup[] = [
  {
    title: "Sailings",
    tools: [
      { id: "gc", title: "Great Circle", icon: Globe2, component: GreatCircleTool },
      { id: "rhumb", title: "Rhumb Line (Mercator Sailing)", icon: Map, component: RhumbTool },
      { id: "midlat", title: "Mid-Latitude Sailing", icon: Route, component: MidLatTool },
      { id: "plane", title: "Plane Sailing", icon: Route, component: PlaneTool },
      { id: "position", title: "Dead Reckoning Position", icon: MapPinned, component: PositionTool },
      { id: "current", title: "Current Triangle", icon: Waves, component: CurrentTool },
      { id: "chart", title: "Chart Scale", icon: Ruler, component: ChartTool },
    ],
  },
  {
    title: "Passage planning",
    tools: [
      { id: "eta", title: "Speed, Distance, Time and ETA", icon: Clock, component: EtaTool },
      { id: "passage", title: "Passage Plan ETAs", icon: Route, component: PassageTool },
      { id: "ecdis", title: "Cross-Track Distance and Look-Ahead", icon: Monitor, component: EcdisTool },
    ],
  },
  {
    title: "Position fixing and compass",
    tools: [
      { id: "fix", title: "Position Fixing", icon: MapPinned, component: FixTool },
      { id: "bearings", title: "Two Bearings of One Object", icon: Navigation, component: BearingsTool },
      { id: "distance", title: "Horizon, Light and Radar Ranges", icon: Eye, component: DistanceTool },
      { id: "compass", title: "Compass and Gyro Error", icon: Compass, component: CompassTool },
    ],
  },
  {
    title: "Collision avoidance",
    tools: [
      { id: "cpa", title: "CPA / TCPA", icon: Radar, component: CpaTool },
      { id: "radar", title: "Radar Plot", icon: Crosshair, component: RadarTool },
      { id: "colreg", title: "COLREG Situation", icon: Shield, component: ColregTool },
    ],
  },
  {
    title: "Celestial navigation",
    tools: [
      { id: "astro", title: "Sun Sight", icon: Sun, component: AstroTool },
      { id: "sight", title: "Sight Reduction", icon: Globe2, component: SightTool },
      { id: "celestial", title: "Meridian Altitude and Amplitude", icon: Sunrise, component: CelestialTool },
    ],
  },
  {
    title: "Tides and shallow water",
    tools: [
      { id: "tides", title: "Tides and Tidal Streams", icon: Waves, component: TidesTool },
      { id: "safety", title: "Squat and UKC", icon: Anchor, component: SafetyTool },
    ],
  },
  {
    title: "Ship handling, weather and SAR",
    tools: [
      { id: "turning", title: "Turning and Wheel-Over", icon: RotateCw, component: TurningTool },
      { id: "weather", title: "Beaufort Scale", icon: Wind, component: WeatherTool },
      { id: "emergency", title: "Search Patterns (IAMSAR)", icon: LifeBuoy, component: EmergencyTool },
    ],
  },
];

export const findNavigationTool = (id: string | undefined) =>
  NAVIGATION_TOOL_GROUPS.flatMap((g) => g.tools).find((t) => t.id === id);
