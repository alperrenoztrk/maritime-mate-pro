import { MobileLayout } from "@/components/MobileLayout";
import { CalculationGrid, CalculationGridScreen, type CalculationGridItem } from "@/components/ui/calculation-grid";
import { Button } from "@/components/ui/button";
import { Compass, Globe2, Map, Navigation as NavigationIcon, Radar, Route, Sigma, Waves, Wind, MapPinned, Shield, Sun, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const navigationItems: CalculationGridItem[] = [
  { id: "gc", title: "Great Circle", icon: Globe2, to: "/navigation/calc/gc" },
  { id: "rhumb", title: "Rhumb Line (Mercator)", icon: Map, to: "/navigation/calc/rhumb" },
  { id: "plane", title: "Plane Sailing", icon: Route, to: "/navigation/calc/plane" },
  { id: "eta", title: "Basic Navigation (Time–Distance–Speed)", icon: Compass, to: "/navigation/calc/eta" },
  { id: "current", title: "Current Triangle (CTS)", icon: Waves, to: "/navigation/calc/current" },
  { id: "compass", title: "Compass Conversions", icon: NavigationIcon, to: "/navigation/calc/compass" },
  { id: "cpa", title: "CPA / TCPA", icon: Radar, to: "/navigation/calc/cpa" },
  { id: "radar", title: "Radar Plot (Target Route/Speed)", icon: Radar, to: "/navigation/calc/radar" },
  { id: "colreg", title: "COLREG Situation & Maneuver", icon: Shield, to: "/navigation/calc/colreg" },
  { id: "sight", title: "Sight Reduction", icon: Globe2, to: "/navigation/calc/sight" },
  { id: "astro", title: "Astronomical Navigation (Almanac + LOP)", icon: Sun, to: "/navigation/calc/astro" },
  { id: "bearings", title: "Bearing Calculations", icon: NavigationIcon, to: "/navigation/calc/bearings" },
  { id: "fix", title: "Fixing Position (2/3 Bearing, Running, Distance)", icon: MapPinned, to: "/navigation/calc/fix" },
  { id: "position", title: "DR / Latitude-Longitude", icon: MapPinned, to: "/navigation/calc/position" },
  { id: "midlat", title: "Middle Latitude Sailing", icon: Route, to: "/navigation/calc/midlat" },
  { id: "chart", title: "Chart Scale (cm ↔ NM)", icon: Map, to: "/navigation/calc/chart" },
  { id: "distance", title: "Distance Calculations", icon: Route, to: "/navigation/calc/distance" },
  { id: "tides", title: "Tide + UKC", icon: Waves, to: "/navigation/calc/tides" },
  { id: "safety", title: "Navigation Safety (Squat/UKC)", icon: Shield, to: "/navigation/calc/safety" },
  { id: "passage", title: "Passage Plan (Leg ETA)", icon: Route, to: "/navigation/calc/passage" },
  { id: "ecdis", title: "ECDIS (XTD / Look-ahead)", icon: Monitor, to: "/navigation/calc/ecdis" },
  { id: "turning", title: "Turning Calculations", icon: Route, to: "/navigation/calc/turning" },
  { id: "weather", title: "Weather", icon: Wind, to: "/navigation/calc/weather" },
  { id: "celestial", title: "Celestial Navigation", icon: Globe2, to: "/navigation/calc/celestial" },
  { id: "emergency", title: "Emergency", icon: Compass, to: "/navigation/calc/emergency" },
];

const Navigation = () => {
  return (
    <MobileLayout>
      <CalculationGridScreen
        eyebrow="Navigation"
        title="Navigation Calculations"
      >
        <div className="space-y-6">
          <div className="flex justify-end">
            <Link to="/navigation/formulas">
              <Button variant="secondary" size="sm" className="gap-2">
                <Sigma className="h-4 w-4" />
                Formulas
              </Button>
            </Link>
          </div>

          <CalculationGrid items={navigationItems} className="sm:grid-cols-2" />

          <p className="text-center text-sm text-slate-300">
            Each calculation opens on a separate page of the book
          </p>
        </div>
      </CalculationGridScreen>
    </MobileLayout>
  );
};

export default Navigation;
