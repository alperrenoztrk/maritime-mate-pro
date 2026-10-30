import { Compass } from "lucide-react";
import type { CourseTopic } from "./types";
import {
  calculateAmplitude,
  calculateRhumbLine,
  calculateTide,
  estimateSquatBarrass,
  latitudeByMeridianAltitude,
  solveCurrentTriangle,
} from "@/components/calculations/navigationMath";

/**
 * Navigation — single source course content.
 * Entries carrying `calculate` appear on the Formulas and the Calculations pages
 * (and /navigation/formulas) and apply the same mathematics as the formula text;
 * where the navigation tools have an engine function it is called directly.
 */
export const navigation: CourseTopic = {
  key: "navigation",
  title: "Navigation",
  icon: Compass,
  accent: "from-indigo-500 via-purple-500 to-blue-500",
  group: "deck",
  intro:
    "Distance-speed-time, sailings (plane/Mercator/great circle), current " +
    "triangle, compass conversions and celestial navigation fundamentals. Each formula is followed by " +
    "the tool that calculates it with the same relation.",
  advancedTool: { label: "Advanced Navigation Tools", href: "/navigation" },
  entries: [
    // ---- Basic navigation ----
    {
      id: "speed-time-distance",
      name: "Speed – Distance – Time",
      group: "Basic Navigation",
      formula: "Speed = Distance / Time",
      variables: [
        { symbol: "Distance", label: "Distance travelled", unit: "nm" },
        { symbol: "Time", label: "Elapsed time", unit: "h" },
        { symbol: "Speed", label: "Speed", unit: "knot" },
      ],
      source: { code: "Basic navigation — speed–distance–time relation" },
      inputs: [
        { key: "distance", label: "Distance", unit: "nm", placeholder: "120" },
        { key: "time", label: "Time", unit: "h", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.time <= 0) return [{ label: "Error", value: "The time must be positive" }];
        const speed = v.distance / v.time;
        return [{ label: "Speed", value: `${speed.toFixed(2)} knot` }];
      },
    },
    {
      id: "speed-conversion",
      name: "Speed Conversions",
      group: "Basic Navigation",
      formula: "1 knot = 1 nm/h = 1.852 km/h = 0.5144 m/s",
      variables: [{ symbol: "V", label: "Speed", unit: "knot" }],
      source: { code: "Standard unit conversions" },
      inputs: [{ key: "knots", label: "Speed", unit: "knot", placeholder: "15" }],
      calculate: (v) => [
        { label: "km/h", value: `${(v.knots * 1.852).toFixed(2)} km/h` },
        { label: "m/s", value: `${(v.knots * 0.5144).toFixed(3)} m/s` },
      ],
    },
    {
      id: "eta",
      name: "Estimated Time of Arrival (ETA)",
      group: "Basic Navigation",
      formula: "ETA = ETD + (Distance / Speed)",
      variables: [
        { symbol: "ETD", label: "Departure time (in hours)", unit: "h" },
        { symbol: "Distance", label: "Distance", unit: "nm" },
        { symbol: "Speed", label: "Speed", unit: "knot" },
      ],
      source: { code: "Basic navigation — ETA/ETD" },
      note: "ETD is entered as a decimal hour (e.g. 14:30 = 14.5). The result is given as a decimal hour and a passage time.",
      inputs: [
        { key: "etd", label: "Departure Time (ETD)", unit: "h", placeholder: "8" },
        { key: "distance", label: "Distance", unit: "nm", placeholder: "240" },
        { key: "speed", label: "Speed", unit: "knot", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Error", value: "The speed must be positive" }];
        const sailing = v.distance / v.speed;
        const eta = (v.etd + sailing) % 24;
        return [
          { label: "Passage Time", value: `${sailing.toFixed(2)} h` },
          { label: "ETA", value: `${eta.toFixed(2)} h (24 h format)` },
        ];
      },
    },
    // ---- Latitude, longitude and distance ----
    {
      id: "dlat-dlong",
      name: "d.lat and Departure",
      group: "Latitude, Longitude and Distance",
      formula: "d.lat = 60·Δφ ;  Dep = 60·Δλ·cosφ̄",
      variables: [
        { symbol: "Δφ", label: "Difference of latitude", unit: "°" },
        { symbol: "Δλ", label: "Difference of longitude", unit: "°" },
        { symbol: "φ̄", label: "Mean latitude", unit: "°" },
      ],
      source: { code: "Plane sailing — d.lat/departure", detail: "1° of latitude = 60 nm" },
      note: "D.long is the difference of longitude in minutes of arc; departure is the east–west distance in nm, d.long × cosφ̄ (mid-latitude).",
      inputs: [
        { key: "dphi", label: "Difference of Latitude (Δφ)", unit: "°", placeholder: "2.5" },
        { key: "dlambda", label: "Difference of Longitude (Δλ)", unit: "°", placeholder: "3.0" },
        { key: "meanlat", label: "Mean Latitude (φ̄)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const dlat = 60 * v.dphi;
        const dep = 60 * v.dlambda * Math.cos((v.meanlat * Math.PI) / 180);
        return [
          { label: "d.lat", value: `${dlat.toFixed(1)} nm` },
          { label: "Departure", value: `${dep.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "plane-sailing",
      name: "Plane Sailing (Course and Distance)",
      group: "Latitude, Longitude and Distance",
      formula: "Course = atan2(Dep, dLat) ;  Distance = √(dLat² + Dep²)",
      variables: [
        { symbol: "d.lat", label: "Difference of latitude (60·Δφ)", unit: "nm" },
        { symbol: "Dep", label: "Departure (60·Δλ·cosφ̄)", unit: "nm" },
      ],
      source: { code: "Plane sailing" },
      note: "The course is normalised to the 0–360° range.",
      inputs: [
        { key: "dlat", label: "d.lat", unit: "nm", placeholder: "150" },
        { key: "dep", label: "Departure", unit: "nm", placeholder: "138" },
      ],
      calculate: (v) => {
        const dist = Math.sqrt(v.dlat * v.dlat + v.dep * v.dep);
        let course = (Math.atan2(v.dep, v.dlat) * 180) / Math.PI;
        if (course < 0) course += 360;
        return [
          { label: "Course", value: `${course.toFixed(1)} °` },
          { label: "Distance", value: `${dist.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "great-circle-distance",
      name: "Great Circle Distance",
      group: "Latitude, Longitude and Distance",
      formula:
        "d = 2R·arcsin(√(sin²(Δφ/2) + cosφ₁·cosφ₂·sin²(Δλ/2)))",
      variables: [
        { symbol: "φ₁, φ₂", label: "Departure/arrival latitudes", unit: "°" },
        { symbol: "Δφ, Δλ", label: "Latitude/longitude differences", unit: "°" },
        { symbol: "R", label: "Earth radius", unit: "≈3440.065 nm" },
      ],
      source: { code: "Great circle sailing (haversine)" },
      note: "East longitudes are entered as (+), west longitudes as (−). R = 3440.065 nm.",
      inputs: [
        { key: "lat1", label: "Departure Latitude (φ₁)", unit: "°", placeholder: "25" },
        { key: "lon1", label: "Departure Longitude (λ₁)", unit: "°", placeholder: "-40" },
        { key: "lat2", label: "Arrival Latitude (φ₂)", unit: "°", placeholder: "45" },
        { key: "lon2", label: "Arrival Longitude (λ₂)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const R = 3440.065;
        const dphi = rad(v.lat2 - v.lat1);
        const dlam = rad(v.lon2 - v.lon1);
        const a =
          Math.sin(dphi / 2) ** 2 +
          Math.cos(rad(v.lat1)) * Math.cos(rad(v.lat2)) * Math.sin(dlam / 2) ** 2;
        const d = 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
        return [{ label: "Great Circle Distance", value: `${d.toFixed(1)} nm` }];
      },
    },
    {
      id: "great-circle-initial-course",
      name: "Great Circle Initial Course",
      group: "Latitude, Longitude and Distance",
      formula:
        "θ₀ = atan2(sinΔλ·cosφ₂, cosφ₁·sinφ₂ − sinφ₁·cosφ₂·cosΔλ)",
      variables: [
        { symbol: "φ₁, φ₂", label: "Departure/arrival latitudes", unit: "°" },
        { symbol: "Δλ", label: "Difference of longitude", unit: "°" },
      ],
      source: { code: "Great circle sailing — initial course" },
      note: "East (+), west (−). The result is normalised to 0–360°.",
      inputs: [
        { key: "lat1", label: "Departure Latitude (φ₁)", unit: "°", placeholder: "25" },
        { key: "lon1", label: "Departure Longitude (λ₁)", unit: "°", placeholder: "-40" },
        { key: "lat2", label: "Arrival Latitude (φ₂)", unit: "°", placeholder: "45" },
        { key: "lon2", label: "Arrival Longitude (λ₂)", unit: "°", placeholder: "10" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const dlam = rad(v.lon2 - v.lon1);
        const y = Math.sin(dlam) * Math.cos(rad(v.lat2));
        const x =
          Math.cos(rad(v.lat1)) * Math.sin(rad(v.lat2)) -
          Math.sin(rad(v.lat1)) * Math.cos(rad(v.lat2)) * Math.cos(dlam);
        let course = (Math.atan2(y, x) * 180) / Math.PI;
        if (course < 0) course += 360;
        return [{ label: "Initial Course (θ₀)", value: `${course.toFixed(1)} °` }];
      },
    },
    {
      id: "rhumb-line",
      name: "Rhumb Line (Mercator Sailing)",
      group: "Latitude, Longitude and Distance",
      formula: "tan C = d.long / DMP ;  D = d.lat / cos C",
      variables: [
        { symbol: "d.lat, d.long", label: "Difference of latitude / longitude", unit: "′" },
        { symbol: "DMP", label: "Difference of meridional parts (WGS 84)", unit: "′" },
        { symbol: "C", label: "Rhumb line course", unit: "°" },
      ],
      source: { code: "Mercator sailing (Bowditch)" },
      note: "Meridional parts on the WGS 84 ellipsoid. On an east–west course D = d.long × cos φ. East (+), west (−).",
      inputs: [
        { key: "lat1", label: "Departure Latitude (φ₁)", unit: "°", placeholder: "36" },
        { key: "lon1", label: "Departure Longitude (λ₁)", unit: "°", placeholder: "-5" },
        { key: "lat2", label: "Arrival Latitude (φ₂)", unit: "°", placeholder: "40" },
        { key: "lon2", label: "Arrival Longitude (λ₂)", unit: "°", placeholder: "14" },
      ],
      calculate: (v) => {
        const r = calculateRhumbLine(v.lat1, v.lon1, v.lat2, v.lon2);
        return [
          { label: "Rhumb Line Distance", value: `${r.distance.toFixed(1)} nm` },
          { label: "Course", value: `${r.course.toFixed(1)} °` },
          { label: "DMP", value: `${r.dmp.toFixed(1)}′` },
        ];
      },
    },
    {
      id: "horizon-range",
      name: "Distance of the Horizon",
      group: "Latitude, Longitude and Distance",
      formula: "d = 2.08·√h  (h metre, d nm)",
      variables: [{ symbol: "h", label: "Height of eye or of the light", unit: "m" }],
      source: { code: "Admiralty List of Lights — geographical range" },
      note: "Standard refraction. The geographical range of a light is 2.08(√H + √h): add the horizon distances of the light and of the eye.",
      inputs: [{ key: "h", label: "Height (h)", unit: "m", placeholder: "20" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Error", value: "The height cannot be negative" }];
        return [{ label: "Distance of the sea horizon", value: `${(2.08 * Math.sqrt(v.h)).toFixed(2)} nm` }];
      },
    },
    {
      id: "vhf-radar-horizon",
      name: "Radar Horizon Range",
      group: "Latitude, Longitude and Distance",
      formula: "d = 2.23·(√h₁ + √h₂)  (h metre, d nm)",
      variables: [
        { symbol: "h₁", label: "Antenna/radar height", unit: "m" },
        { symbol: "h₂", label: "Target height", unit: "m" },
      ],
      source: { code: "Radar horizon (effective Earth radius 4/3)" },
      inputs: [
        { key: "h1", label: "Antenna Height (h₁)", unit: "m", placeholder: "30" },
        { key: "h2", label: "Target Height (h₂)", unit: "m", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.h1 < 0 || v.h2 < 0) return [{ label: "Error", value: "The heights cannot be negative" }];
        const d = 2.23 * (Math.sqrt(v.h1) + Math.sqrt(v.h2));
        return [{ label: "Horizon Range", value: `${d.toFixed(2)} nm` }];
      },
    },
    // ---- Current and compass ----
    {
      id: "current-triangle",
      name: "Current Triangle (CTS / SOG)",
      group: "Current, Wind and Compass",
      formula: "sin(CTS−TR) = (c/V)·sin(TR−set) ;  SOG = V·cos(CTS−TR) + c·cos(set−TR)",
      variables: [
        { symbol: "TR", label: "Track to make good", unit: "°" },
        { symbol: "V", label: "Vessel speed (through the water)", unit: "knot" },
        { symbol: "set", label: "Current set (direction towards)", unit: "°" },
        { symbol: "c", label: "Current drift (rate)", unit: "knot" },
      ],
      source: { code: "Current triangle — CTS/SOG" },
      note: "The ship heads up into the current: with the current from the starboard side the CTS lies to starboard of the track.",
      inputs: [
        { key: "tr", label: "Track (TR)", unit: "°", placeholder: "90" },
        { key: "v", label: "Vessel Speed (V)", unit: "knot", placeholder: "12" },
        { key: "set", label: "Current Set", unit: "°", placeholder: "180" },
        { key: "c", label: "Current Drift (c)", unit: "knot", placeholder: "2" },
      ],
      calculate: (v) => {
        if (v.v <= 0) return [{ label: "Error", value: "The vessel speed must be positive" }];
        const r = solveCurrentTriangle({ courseDeg: v.tr, speedKn: v.v, setDeg: v.set, driftKn: v.c });
        if (!r.feasible) return [{ label: "Error", value: "The current is too strong, the track cannot be held" }];
        return [
          { label: "CTS (Course To Steer)", value: `${r.courseToSteerDeg.toFixed(1)} °` },
          { label: "SOG", value: `${r.groundSpeedKn.toFixed(2)} knot` },
        ];
      },
    },
    {
      id: "tvmdc",
      name: "Compass Conversion (TVMDC)",
      group: "Current, Wind and Compass",
      formula: "Ct = Cc + Dev + Var  (East +, West −)",
      variables: [
        { symbol: "Cc", label: "Compass course", unit: "°" },
        { symbol: "Dev", label: "Deviation", unit: "°" },
        { symbol: "Var.", label: "Magnetic variation", unit: "°" },
        { symbol: "Ct", label: "True course", unit: "°" },
      ],
      source: { code: "TVMDC chain (magnetic/compass correction)" },
      note: "East (E) values are entered as (+), west (W) values as (−). The result is normalised to 0–360°.",
      inputs: [
        { key: "cc", label: "Compass Course (Cc)", unit: "°", placeholder: "270" },
        { key: "dev", label: "Deviation (Dev)", unit: "°", placeholder: "-2" },
        { key: "var", label: "Variation (Var)", unit: "°", placeholder: "5" },
      ],
      calculate: (v) => {
        let ct = v.cc + v.dev + v.var;
        ct = ((ct % 360) + 360) % 360;
        return [
          { label: "True Course (Ct)", value: `${ct.toFixed(1)} °` },
          { label: "Compass Error (Dev+Var)", value: `${(v.dev + v.var).toFixed(1)} °` },
        ];
      },
    },
    // ---- Radar and manoeuvring ----
    {
      id: "cpa-tcpa",
      name: "TCPA / CPA",
      group: "Radar and Manoeuvring",
      formula: "TCPA = −(R·Vrel)/|Vrel|² ;  CPA = |R + Vrel·TCPA|",
      variables: [
        { symbol: "R", label: "Relative position vector (Rx, Ry)", unit: "nm" },
        { symbol: "Vrel", label: "Relative velocity vector (Vx, Vy)", unit: "knot" },
      ],
      source: { code: "Radar plotting — CPA/TCPA" },
      note: "The vector components are entered as (x: east, y: north). A negative TCPA means the CPA has already passed (range opening).",
      inputs: [
        { key: "rx", label: "Rx", unit: "nm", placeholder: "4" },
        { key: "ry", label: "Ry", unit: "nm", placeholder: "6" },
        { key: "vx", label: "Vrelx", unit: "knot", placeholder: "-3" },
        { key: "vy", label: "Vrely", unit: "knot", placeholder: "-5" },
      ],
      calculate: (v) => {
        const v2 = v.vx * v.vx + v.vy * v.vy;
        if (v2 <= 0) return [{ label: "Result", value: "Relative speed is zero — the CPA does not change" }];
        const tcpa = -(v.rx * v.vx + v.ry * v.vy) / v2;
        const cx = v.rx + v.vx * tcpa;
        const cy = v.ry + v.vy * tcpa;
        const dcpa = Math.sqrt(cx * cx + cy * cy);
        return [
          { label: "TCPA", value: `${tcpa.toFixed(2)} h (${(tcpa * 60).toFixed(1)} min)` },
          { label: "CPA", value: `${dcpa.toFixed(2)} nm` },
        ];
      },
    },
    {
      id: "rate-of-turn",
      name: "Rate of Turn (ROT)",
      group: "Radar and Manoeuvring",
      formula: "ROT (°/min) = V / R × (180/π) × 60 ≈ 1768 × V(kn) / R(m)",
      variables: [
        { symbol: "V", label: "Speed", unit: "knot" },
        { symbol: "R", label: "Turning radius", unit: "m" },
      ],
      source: { code: "Ship handling — rate of turn on a constant radius" },
      note: "1 kn = 0.514444 m/s; V/R in rad/s × 3437.75 gives °/min (3437.75 × 0.514444 ≈ 1768.5).",
      inputs: [
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "12" },
        { key: "r", label: "Turning Radius (R)", unit: "m", placeholder: "600" },
      ],
      calculate: (v) => {
        if (v.r <= 0) return [{ label: "Error", value: "The radius must be positive" }];
        const rot = ((180 / Math.PI) * 60 * v.v * 0.514444) / v.r;
        return [{ label: "Rate of Turn (ROT)", value: `${rot.toFixed(1)} °/min` }];
      },
    },
    // ---- Navigational safety ----
    {
      id: "ukc",
      name: "Under Keel Clearance (UKC)",
      group: "Navigational Safety",
      formula: "UKC = Charted depth + HoT − Draft − Squat",
      variables: [
        { symbol: "Charted depth", label: "Charted depth (below chart datum)", unit: "m" },
        { symbol: "HoT", label: "Height of tide", unit: "m" },
        { symbol: "Draft", label: "Vessel draft", unit: "m" },
        { symbol: "Squat", label: "Squat", unit: "m" },
      ],
      source: { code: "Navigational safety — UKC relation" },
      inputs: [
        { key: "cd", label: "Charted Depth", unit: "m", placeholder: "12" },
        { key: "hot", label: "Height of Tide (HoT)", unit: "m", placeholder: "1.5" },
        { key: "draft", label: "Draft", unit: "m", placeholder: "10.5" },
        { key: "squat", label: "Squat", unit: "m", placeholder: "0.4" },
      ],
      calculate: (v) => {
        const ukc = v.cd + v.hot - v.draft - v.squat;
        const status = ukc > 0 ? "Positive clearance" : "DANGER — insufficient water";
        return [
          { label: "UKC", value: `${ukc.toFixed(2)} m` },
          { label: "Status", value: status },
        ];
      },
    },
    {
      id: "squat",
      name: "Squat (Barrass)",
      group: "Navigational Safety",
      formula: "Squat max ≈ Cb × V² / 100 (open water) ;  × 2 in a confined channel",
      variables: [
        { symbol: "Cb", label: "Block coefficient" },
        { symbol: "V", label: "Speed through the water", unit: "knot" },
      ],
      source: { code: "Barrass, Ship Squat — maximum squat approximation" },
      note: "Maximum squat, at the bow for full ships (Cb > 0.7) and at the stern for fine ships.",
      inputs: [
        { key: "cb", label: "Block Coefficient (Cb)", placeholder: "0.80" },
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "10" },
      ],
      calculate: (v) => {
        if (v.cb <= 0 || v.cb > 1) return [{ label: "Error", value: "Cb must be between 0 and 1" }];
        if (v.v < 0) return [{ label: "Error", value: "The speed cannot be negative" }];
        return [
          { label: "Squat, open water", value: `${estimateSquatBarrass({ speedKn: v.v, blockCoefficient: v.cb, environment: "open" }).toFixed(2)} m` },
          { label: "Squat, confined channel", value: `${estimateSquatBarrass({ speedKn: v.v, blockCoefficient: v.cb, environment: "confined" }).toFixed(2)} m` },
        ];
      },
    },
    // ---- Tides ----
    {
      id: "height-of-tide",
      name: "Height of Tide (Rule of Twelfths)",
      group: "Tides",
      formula: "H = LW height + (cumulative twelfths / 12) × range",
      variables: [
        { symbol: "Low", label: "Low water height", unit: "m" },
        { symbol: "Range", label: "Tidal range (HW − LW)", unit: "m" },
        { symbol: "t", label: "Hours elapsed since LW (0–6)", unit: "h" },
      ],
      source: { code: "Rule of Twelfths" },
      note: "Twelfths: 1, 3, 6, 9, 11, 12 / 12 (cumulative at the end of each tidal hour), interpolated between whole hours. For a regular semidiurnal tide with about six hours' rise.",
      inputs: [
        { key: "low", label: "Low Water (LW)", unit: "m", placeholder: "1.2" },
        { key: "range", label: "Tidal Range", unit: "m", placeholder: "4.0" },
        { key: "t", label: "Elapsed Time (since LW)", unit: "h", placeholder: "3" },
      ],
      calculate: (v) => {
        if (v.t < 0 || v.t > 6) return [{ label: "Error", value: "Enter 0 to 6 hours after low water" }];
        const { fractionOfRange: fraction } = calculateTide({ hour: v.t, tidalRangeM: v.range });
        const h = v.low + fraction * v.range;
        return [
          { label: "Amount Risen", value: `${(fraction * v.range).toFixed(2)} m` },
          { label: "Height of Tide (H)", value: `${h.toFixed(2)} m` },
        ];
      },
    },
    // ---- Celestial Navigation ----
    {
      id: "celestial-altitude",
      name: "Calculated Altitude (Hc)",
      group: "Celestial Navigation",
      formula: "sin(Hc) = sinφ·sinδ + cosφ·cosδ·cos(LHA)",
      variables: [
        { symbol: "φ", label: "Observer latitude", unit: "°" },
        { symbol: "δ", label: "Declination", unit: "°" },
        { symbol: "LHA", label: "Local hour angle", unit: "°" },
      ],
      source: { code: "Sight reduction — calculated altitude" },
      note: "South latitude/declination is entered as (−). Used with Nautical Almanac data.",
      inputs: [
        { key: "lat", label: "Latitude (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Declination (δ)", unit: "°", placeholder: "20" },
        { key: "lha", label: "LHA", unit: "°", placeholder: "45" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(v.lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        return [{ label: "Calculated Altitude (Hc)", value: `${hc.toFixed(2)} °` }];
      },
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const term1 = Math.sin(rad(v.lat)) * Math.sin(rad(v.dec));
        const term2 = Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(v.lha));
        const sinHc = term1 + term2;
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        return [
          {
            title: "Substitute the data",
            expression: `φ = ${v.lat}°, δ = ${v.dec}°, LHA = ${v.lha}°`,
            hint: "South latitude and declination are entered with a (−) sign; LHA is always in the 0–360° range.",
          },
          {
            title: "First term: sinφ · sinδ",
            expression: `sin(${v.lat}°) · sin(${v.dec}°) = ${Math.sin(rad(v.lat)).toFixed(4)} · ${Math.sin(rad(v.dec)).toFixed(4)}`,
            result: `${term1.toFixed(4)}`,
          },
          {
            title: "Second term: cosφ · cosδ · cos(LHA)",
            expression: `cos(${v.lat}°) · cos(${v.dec}°) · cos(${v.lha}°)`,
            result: `${term2.toFixed(4)}`,
          },
          {
            title: "Sum = sin(Hc)",
            expression: `${term1.toFixed(4)} + ${term2.toFixed(4)}`,
            result: `sin(Hc) = ${sinHc.toFixed(4)}`,
          },
          {
            title: "Hc from the inverse sine (arcsin)",
            expression: `Hc = arcsin(${sinHc.toFixed(4)})`,
            result: `Hc = ${hc.toFixed(2)}°`,
            hint: "Hc is the theoretical altitude of the body from the assumed position (AP); comparing it with Ho gives the intercept.",
          },
        ];
      },
    },
    {
      id: "celestial-azimuth",
      name: "Azimuth Angle (Z)",
      group: "Celestial Navigation",
      formula: "cos(Z) = (sinδ − sinφ·sinHc) / (cosφ·cosHc)",
      variables: [
        { symbol: "δ", label: "Declination", unit: "°" },
        { symbol: "φ", label: "Observer latitude", unit: "°" },
        { symbol: "Hc", label: "Calculated altitude", unit: "°" },
      ],
      source: { code: "Sight reduction — azimuth" },
      note: "Declination, latitude and calculated altitude are entered in degrees; the azimuth angle Z (0–180°) is computed.",
      inputs: [
        { key: "dec", label: "Declination (δ)", unit: "°", placeholder: "20" },
        { key: "lat", label: "Observer Latitude (φ)", unit: "°", placeholder: "41" },
        { key: "hc", label: "Calculated Altitude (Hc)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9) return [{ label: "Error", value: "The denominator is near zero (φ or Hc = 90°)" }];
        let cosZ = (Math.sin(v.dec * r) - Math.sin(v.lat * r) * Math.sin(v.hc * r)) / denom;
        cosZ = Math.max(-1, Math.min(1, cosZ));
        const Z = Math.acos(cosZ) / r;
        return [{ label: "Azimuth Angle (Z)", value: `${Z.toFixed(1)}°` }];
      },
      steps: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9)
          return [{ title: "Error", result: "The denominator is near zero (φ or Hc = 90°)" }];
        const numer = Math.sin(v.dec * r) - Math.sin(v.lat * r) * Math.sin(v.hc * r);
        let cosZ = numer / denom;
        cosZ = Math.max(-1, Math.min(1, cosZ));
        const Z = Math.acos(cosZ) / r;
        return [
          {
            title: "Substitute the data",
            expression: `δ = ${v.dec}°, φ = ${v.lat}°, Hc = ${v.hc}°`,
          },
          {
            title: "Numerator: sinδ − sinφ · sinHc",
            expression: `sin(${v.dec}°) − sin(${v.lat}°)·sin(${v.hc}°)`,
            result: `${numer.toFixed(4)}`,
          },
          {
            title: "Denominator: cosφ · cosHc",
            expression: `cos(${v.lat}°) · cos(${v.hc}°)`,
            result: `${denom.toFixed(4)}`,
          },
          {
            title: "Quotient = cos(Z)",
            expression: `${numer.toFixed(4)} / ${denom.toFixed(4)}`,
            result: `cos(Z) = ${cosZ.toFixed(4)}`,
          },
          {
            title: "Z from the inverse cosine (arccos)",
            expression: `Z = arccos(${cosZ.toFixed(4)})`,
            result: `Z = ${Z.toFixed(1)}°`,
            hint: "The angle Z (0–180°) is converted to the true azimuth (Zn) using N/S and E/W according to the bearing of the body.",
          },
        ];
      },
    },
    {
      id: "amplitude",
      name: "Amplitude (Rising/Setting Azimuth)",
      group: "Celestial Navigation",
      formula: "A = arcsin(sinδ / cosφ)",
      variables: [
        { symbol: "δ", label: "Declination", unit: "°" },
        { symbol: "φ", label: "Observer latitude", unit: "°" },
      ],
      source: { code: "Celestial navigation — amplitude (compass error check)" },
      note: "Measured from E when rising and from W when setting. South latitude/declination is entered as (−).",
      inputs: [
        { key: "dec", label: "Declination (δ)", unit: "°", placeholder: "15" },
        { key: "lat", label: "Latitude (φ)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1) return [{ label: "Error", value: "At this latitude the body does not rise/set" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        const rising = calculateAmplitude({ latDeg: v.lat, decDeg: v.dec, riseOrSet: "rising" });
        const setting = calculateAmplitude({ latDeg: v.lat, decDeg: v.dec, riseOrSet: "setting" });
        return [
          { label: "Amplitude (A)", value: `${Math.abs(a).toFixed(2)} ° (from E/W, ${a >= 0 ? "N" : "S"})` },
          { label: "True bearing rising", value: `${rising.azimuthDeg.toFixed(1)} °` },
          { label: "True bearing setting", value: `${setting.azimuthDeg.toFixed(1)} °` },
        ];
      },
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1)
          return [{ title: "Error", result: "At this latitude the body does not rise/set (|sinδ/cosφ| > 1)" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        return [
          {
            title: "Substitute the data",
            expression: `δ = ${v.dec}°, φ = ${v.lat}°`,
            hint: "The amplitude is the angle between the body at rising or setting and true east or west; converted to a true bearing it checks the compass error.",
          },
          {
            title: "Ratio: sinδ / cosφ",
            expression: `sin(${v.dec}°) / cos(${v.lat}°) = ${Math.sin(rad(v.dec)).toFixed(4)} / ${Math.cos(rad(v.lat)).toFixed(4)}`,
            result: `${ratio.toFixed(4)}`,
          },
          {
            title: "A from the inverse sine (arcsin)",
            expression: `A = arcsin(${ratio.toFixed(4)})`,
            result: `A = ${a.toFixed(2)}° (from E/W)`,
            hint: "Measured from E when rising and from W when setting; toward the north for a N declination and toward the south for a S declination.",
          },
        ];
      },
    },
    // ---- Calculators added from the topic text ----
    {
      id: "arc-time",
      name: "Longitude ↔ Time Conversion",
      group: "Latitude, Longitude and Distance",
      formula: "Time (min) = longitude (°) × 4 ;  longitude (°) = time (h) × 15",
      variables: [
        { symbol: "λ", label: "Longitude (arc)", unit: "°" },
        { symbol: "t", label: "Longitude in time", unit: "h" },
      ],
      source: { code: "Celestial navigation — arc/time conversion", detail: "360° = 24 h, 1° = 4 min" },
      note: "Enter the longitude in degrees → the equivalent time difference (relative to Greenwich) is calculated.",
      inputs: [{ key: "lon", label: "Longitude (λ)", unit: "°", placeholder: "45" }],
      calculate: (v) => {
        const totalMin = Math.abs(v.lon) * 4;
        const h = Math.floor(totalMin / 60);
        const m = totalMin - h * 60;
        return [
          { label: "Time Difference (decimal)", value: `${(totalMin / 60).toFixed(3)} h` },
          { label: "Time Difference (h:min)", value: `${h} h ${m.toFixed(1)} min` },
        ];
      },
    },
    {
      id: "dip",
      name: "Dip of the Horizon",
      group: "Celestial Navigation",
      formula: "Dip = 1.76 × √h  (h in metres, dip in minutes)",
      variables: [{ symbol: "h", label: "Height of eye", unit: "m" }],
      source: { code: "Nautical Almanac — dip of the horizon" },
      note: "Dip corrects the sextant altitude for the observer's height of eye; it is always subtracted.",
      inputs: [{ key: "h", label: "Height of Eye (h)", unit: "m", placeholder: "12" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Error", value: "The height cannot be negative" }];
        const dip = 1.76 * Math.sqrt(v.h);
        return [{ label: "Dip of the horizon", value: `${dip.toFixed(1)} ′ (minutes)` }];
      },
      steps: (v) => {
        if (v.h < 0) return [{ title: "Error", result: "The height cannot be negative" }];
        const dip = 1.76 * Math.sqrt(v.h);
        return [
          {
            title: "Substitute the height of eye",
            expression: `h = ${v.h} m`,
            hint: "h is the observer's height of eye above sea level (bridge deck etc.).",
          },
          {
            title: "Take the square root",
            expression: `√${v.h} = ${Math.sqrt(v.h).toFixed(3)}`,
          },
          {
            title: "Multiply by the coefficient",
            expression: `Dip = 1.76 × ${Math.sqrt(v.h).toFixed(3)}`,
            result: `Dip = ${dip.toFixed(1)} ′`,
            hint: "In the sextant correction the dip is ALWAYS subtracted from Hs (the horizon appears below the eye).",
          },
        ];
      },
    },
    {
      id: "sextant-correction",
      name: "Sextant Altitude Correction (Ho)",
      group: "Celestial Navigation",
      formula: "Ho = Hs + IC − Dip + main correction",
      variables: [
        { symbol: "Hs", label: "Sextant altitude", unit: "°" },
        { symbol: "IC", label: "Index correction (off the arc +, on the arc −)", unit: "′" },
        { symbol: "dip", label: "Dip of the horizon", unit: "′" },
        { symbol: "MC", label: "Main correction from the Almanac (refraction, semi-diameter and parallax together)", unit: "′" },
      ],
      source: { code: "Nautical Almanac — altitude correction tables (apparent → observed altitude)" },
      note: "IC and the main correction are entered in minutes (′). The index correction is applied with its sign, the dip is always subtracted, and the main correction is added with its sign (negative for an upper limb).",
      inputs: [
        { key: "hs", label: "Sextant Altitude (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Index Correction (IC)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip of the horizon", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Main Correction (MC)", unit: "′", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const hoMin = v.hs * 60 + v.ie - v.dip + v.r;
        const ho = hoMin / 60;
        return [{ label: "Observed Altitude (Ho)", value: `${ho.toFixed(3)} °` }];
      },
      steps: (v) => {
        const hsMin = v.hs * 60;
        const afterIe = hsMin + v.ie;
        const afterDip = afterIe - v.dip;
        const hoMin = afterDip + v.r;
        const ho = hoMin / 60;
        return [
          {
            title: "Convert Hs to minutes",
            expression: `${v.hs}° × 60 = ${hsMin.toFixed(1)} ′`,
            hint: "All corrections are made in minutes (′); 1° = 60′.",
          },
          {
            title: "Apply the index correction (IC)",
            expression: `${hsMin.toFixed(1)} ′ + (${v.ie}) ′`,
            result: `${afterIe.toFixed(1)} ′`,
            hint: "IC is added with its sign (on the arc: −, off the arc: +).",
          },
          {
            title: "Subtract the dip",
            expression: `${afterIe.toFixed(1)} ′ − ${v.dip} ′`,
            result: `${afterDip.toFixed(1)} ′  (apparent altitude, Ha)`,
          },
          {
            title: "Apply the main correction (MC)",
            expression: `${afterDip.toFixed(1)} ′ + (${v.r}) ′`,
            result: `${hoMin.toFixed(1)} ′`,
            hint: "The Almanac's main correction already combines refraction, semi-diameter and parallax: do not apply them again.",
          },
          {
            title: "Convert back to degrees",
            expression: `${hoMin.toFixed(1)} ′ ÷ 60`,
            result: `Ho = ${ho.toFixed(3)}°`,
            hint: "Ho (observed altitude) is compared with Hc to obtain the intercept (a).",
          },
        ];
      },
    },
    {
      id: "intercept",
      name: "Altitude Difference (Intercept)",
      group: "Celestial Navigation",
      formula: "a = Ho − Hc",
      variables: [
        { symbol: "Ho", label: "Observed altitude", unit: "°" },
        { symbol: "Hc", label: "Calculated altitude", unit: "°" },
      ],
      source: { code: "Marcq St-Hilaire — intercept method" },
      note: "Positive (towards) → towards the body, negative (away) → away from the body. 1′ = 1 nm.",
      inputs: [
        { key: "ho", label: "Observed Altitude (Ho)", unit: "°", placeholder: "45.30" },
        { key: "hc", label: "Calculated Altitude (Hc)", unit: "°", placeholder: "45.10" },
      ],
      calculate: (v) => {
        const aMin = (v.ho - v.hc) * 60;
        const yon = aMin >= 0 ? "Towards (the body)" : "Away (from the body)";
        return [
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} nm` },
          { label: "Direction", value: yon },
        ];
      },
      steps: (v) => {
        const diff = v.ho - v.hc;
        const aMin = diff * 60;
        const yon = aMin >= 0 ? "Towards (the body)" : "Away (from the body)";
        return [
          {
            title: "Substitute the data",
            expression: `Ho = ${v.ho}°, Hc = ${v.hc}°`,
            hint: "Ho is the observed altitude and Hc the calculated altitude (relative to the AP).",
          },
          {
            title: "Take the difference (Ho − Hc)",
            expression: `${v.ho}° − ${v.hc}°`,
            result: `${diff.toFixed(3)}°`,
          },
          {
            title: "Convert to nautical miles (× 60)",
            expression: `${diff.toFixed(3)}° × 60 ′/° = ${aMin.toFixed(1)} ′`,
            result: `a = ${Math.abs(aMin).toFixed(1)} nm`,
            hint: "1 minute of arc = 1 nautical mile.",
          },
          {
            title: "Determine the direction",
            expression: aMin >= 0 ? "Ho > Hc → toward the body" : "Ho < Hc → away from the body",
            result: yon,
            hint: "Lay off a from the AP along Zn (towards) or its reciprocal (away) and draw the LOP through that point at right angles to the azimuth.",
          },
        ];
      },
    },
    {
      id: "meridian-passage-lat",
      name: "Latitude by Meridian Passage",
      group: "Celestial Navigation",
      formula: "ZD = 90° − Ho ;  φ = ZD ± δ",
      variables: [
        { symbol: "Ho", label: "Observed altitude at meridian passage", unit: "°" },
        { symbol: "δ", label: "Declination", unit: "°" },
      ],
      source: { code: "Celestial navigation — latitude by meridian passage" },
      note: "The zenith distance is named opposite to the body's bearing (body bears south → ZD north). Same names add, contrary names subtract; entering south values as (−) handles this automatically.",
      inputs: [
        { key: "ho", label: "Observed Altitude (Ho)", unit: "°", placeholder: "68.5" },
        { key: "dec", label: "Declination (δ, S: −)", unit: "°", placeholder: "20" },
        { key: "bearing", label: "Body bears (1 = south, −1 = north)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        if (v.ho <= 0 || v.ho > 90) return [{ label: "Error", value: "Ho must be between 0° and 90°" }];
        const z = 90 - v.ho;
        const lat = latitudeByMeridianAltitude(v.ho, v.dec, v.bearing >= 0 ? "S" : "N");
        const hemis = lat >= 0 ? "N" : "S";
        return [
          { label: "Zenith Distance (ZD)", value: `${z.toFixed(2)} °` },
          { label: "Latitude (φ)", value: `${Math.abs(lat).toFixed(2)} ° ${hemis}` },
        ];
      },
      steps: (v) => {
        const z = 90 - v.ho;
        const sign = v.bearing >= 0 ? 1 : -1;
        const lat = v.dec + sign * z;
        const hemis = lat >= 0 ? "N" : "S";
        return [
          {
            title: "Substitute the data",
            expression: `Ho = ${v.ho}°, δ = ${v.dec}°, body bears ${v.bearing >= 0 ? "south" : "north"}`,
            hint: "At meridian passage the body is on the observer's meridian (for the Sun: local apparent noon).",
          },
          {
            title: "Zenith distance: ZD = 90° − Ho",
            expression: `90° − ${v.ho}°`,
            result: `ZD = ${z.toFixed(2)}°`,
          },
          {
            title: "Latitude: φ = δ ± ZD",
            expression: `${v.dec}° ${sign >= 0 ? "+" : "−"} ${z.toFixed(2)}°`,
            result: `φ = ${Math.abs(lat).toFixed(2)}° ${hemis}`,
            hint: "ZD and δ are added when of the same name and subtracted when of contrary name (the signs are handled automatically).",
          },
        ];
      },
    },
    {
      id: "sight-reduction",
      name: "Sight Reduction — Intercept Method (AP to LOP)",
      group: "Celestial Navigation",
      formula: "GHA → LHA = GHA±λ → Hc, Z → Ho = Hs±corrections → a = Ho−Hc",
      variables: [
        { symbol: "GHA", label: "Greenwich hour angle", unit: "°" },
        { symbol: "λ", label: "Longitude (E: +, W: −)", unit: "°" },
        { symbol: "φ", label: "AP latitude", unit: "°" },
        { symbol: "δ", label: "Declination", unit: "°" },
        { symbol: "Hs", label: "Sextant altitude", unit: "°" },
        { symbol: "a", label: "Intercept (altitude difference)", unit: "nm" },
      ],
      source: { code: "Marcq St-Hilaire — full sight reduction chain (AP → LOP)" },
      note: "GHA and δ are taken from the Almanac. South latitude/declination is entered as (−) and west longitude as (−). All corrections are in minutes (′).",
      inputs: [
        { key: "gha", label: "GHA", unit: "°", placeholder: "130.5" },
        { key: "lon", label: "Longitude (λ, E: +, W: −)", unit: "°", placeholder: "28" },
        { key: "lat", label: "AP Latitude (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Declination (δ)", unit: "°", placeholder: "20" },
        { key: "hs", label: "Sextant Altitude (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Index Correction (IC)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip of the horizon", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Main Correction (MC)", unit: "′", placeholder: "14.5" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const norm = (x: number) => ((x % 360) + 360) % 360;
        const lha = norm(v.gha + v.lon);
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        const denom = Math.cos(rad(v.lat)) * Math.cos(rad(hc));
        let z = 0;
        if (Math.abs(denom) >= 1e-9) {
          let cosZ = (Math.sin(rad(v.dec)) - Math.sin(rad(v.lat)) * Math.sin(rad(hc))) / denom;
          cosZ = Math.max(-1, Math.min(1, cosZ));
          z = (Math.acos(cosZ) * 180) / Math.PI;
        }
        const ho = (v.hs * 60 + v.ie - v.dip + v.r) / 60;
        const aMin = (ho - hc) * 60;
        const yon = aMin >= 0 ? "Towards (the body)" : "Away (from the body)";
        return [
          { label: "LHA", value: `${lha.toFixed(2)} °` },
          { label: "Calculated Altitude (Hc)", value: `${hc.toFixed(2)} °` },
          { label: "Azimuth Angle (Z)", value: `${z.toFixed(1)} °` },
          { label: "Observed Altitude (Ho)", value: `${ho.toFixed(3)} °` },
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} nm ${yon}` },
        ];
      },
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const norm = (x: number) => ((x % 360) + 360) % 360;
        const lha = norm(v.gha + v.lon);
        const sinHc =
          Math.sin(rad(v.lat)) * Math.sin(rad(v.dec)) +
          Math.cos(rad(v.lat)) * Math.cos(rad(v.dec)) * Math.cos(rad(lha));
        const hc = (Math.asin(Math.max(-1, Math.min(1, sinHc))) * 180) / Math.PI;
        const denom = Math.cos(rad(v.lat)) * Math.cos(rad(hc));
        let cosZ = 0;
        let z = 0;
        if (Math.abs(denom) >= 1e-9) {
          cosZ = Math.max(-1, Math.min(1, (Math.sin(rad(v.dec)) - Math.sin(rad(v.lat)) * Math.sin(rad(hc))) / denom));
          z = (Math.acos(cosZ) * 180) / Math.PI;
        }
        const ho = (v.hs * 60 + v.ie - v.dip + v.r) / 60;
        const aMin = (ho - hc) * 60;
        const yon = aMin >= 0 ? "Towards (the body)" : "Away (from the body)";
        return [
          {
            title: "1) Local Hour Angle (LHA) = GHA ± λ",
            expression: `${v.gha}° + (${v.lon}°) = ${(v.gha + v.lon).toFixed(2)}° → reduced to 0–360°`,
            result: `LHA = ${lha.toFixed(2)}°`,
            hint: "East longitude (+) is added and west longitude (−) is subtracted. The result is reduced to the 0–360° range.",
          },
          {
            title: "2) Calculated Altitude (Hc)",
            expression: `sin(Hc) = sinφ·sinδ + cosφ·cosδ·cos(LHA) = ${sinHc.toFixed(4)}`,
            result: `Hc = arcsin(${sinHc.toFixed(4)}) = ${hc.toFixed(2)}°`,
            hint: "The theoretical altitude of the body for the latitude of the AP (assumed position).",
          },
          {
            title: "3) Azimuth Angle (Z)",
            expression: `cos(Z) = (sinδ − sinφ·sinHc)/(cosφ·cosHc) = ${cosZ.toFixed(4)}`,
            result: `Z = ${z.toFixed(1)}°`,
            hint: "Convert Z to the true azimuth before plotting: Zn = Z if LHA > 180°, Zn = 360° − Z if LHA < 180°.",
          },
          {
            title: "4) Observed Altitude (Ho) = Hs ± corrections",
            expression: `${v.hs}° + (${v.ie}′ IC) − ${v.dip}′ dip + ${v.r}′ MC`,
            result: `Ho = ${ho.toFixed(3)}°`,
            hint: "The sextant reading Hs is converted to the observed altitude with the index correction, dip and main correction.",
          },
          {
            title: "5) Intercept (a) = Ho − Hc",
            expression: `(${ho.toFixed(3)}° − ${hc.toFixed(2)}°) × 60 = ${aMin.toFixed(1)} ′`,
            result: `a = ${Math.abs(aMin).toFixed(1)} nm — ${yon}`,
            hint: "Lay off a from the AP along Zn (towards) or its reciprocal (away) and draw the LOP at right angles to Zn; two LOPs give the fix.",
          },
        ];
      },
    },
    {
      id: "gc-vertex-lat",
      name: "Great Circle Vertex Latitude",
      group: "Latitude, Longitude and Distance",
      formula: "cos φv = |sin C₁| × cos φ₁",
      variables: [
        { symbol: "C₁", label: "Initial course", unit: "°" },
        { symbol: "φ₁", label: "Departure latitude", unit: "°" },
      ],
      source: { code: "Great circle sailing — vertex" },
      note: "The vertex is the highest latitude reached by the great circle (the point where the course is 090°/270°).",
      inputs: [
        { key: "c1", label: "Initial Course (C₁)", unit: "°", placeholder: "60" },
        { key: "lat1", label: "Departure Latitude (φ₁)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const cosPv = Math.abs(Math.sin(rad(v.c1))) * Math.cos(rad(v.lat1));
        const pv = (Math.acos(Math.min(1, cosPv)) * 180) / Math.PI;
        return [{ label: "Vertex Latitude (φv)", value: `${pv.toFixed(2)} °` }];
      },
    },
    {
      id: "distance-vertical-angle",
      name: "Distance Off by Vertical Angle",
      group: "Radar and Manoeuvring",
      formula: "Distance (nm) ≈ 1.856 × Height(m) / Vertical Angle(′)",
      variables: [
        { symbol: "H", label: "Height of the object (lighthouse etc.)", unit: "m" },
        { symbol: "α", label: "Vertical angle measured with the sextant", unit: "′" },
      ],
      source: { code: "Admiralty — distance by vertical sextant angle" },
      note: "Distance from the vertical angle of an object of known height (lighthouse, hilltop); valid while the object is within the horizon.",
      inputs: [
        { key: "h", label: "Height (H)", unit: "m", placeholder: "80" },
        { key: "angle", label: "Vertical Angle (α)", unit: "′", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.angle <= 0) return [{ label: "Error", value: "The vertical angle must be positive" }];
        const dist = (1.856 * v.h) / v.angle;
        return [{ label: "Distance", value: `${dist.toFixed(2)} nm` }];
      },
    },
    {
      id: "chart-scale",
      name: "Chart Scale",
      group: "Latitude, Longitude and Distance",
      formula: "Distance (nm) = length on chart (cm) × scale / 185,200",
      variables: [
        { symbol: "scale", label: "Natural scale denominator (1 : scale)" },
        { symbol: "185,200", label: "Centimetres in one nautical mile", unit: "cm" },
      ],
      source: { code: "1 nautical mile = 1,852 m" },
      note: "On a Mercator chart the scale changes with latitude: measure distances on the latitude scale.",
      inputs: [
        { key: "scale", label: "Scale (1 : …)", placeholder: "50000" },
        { key: "cm", label: "Length on the chart", unit: "cm", placeholder: "7.4" },
      ],
      calculate: (v) => {
        if (v.scale <= 0) return [{ label: "Error", value: "The scale must be positive" }];
        return [{ label: "Distance", value: `${((v.cm * v.scale) / 185200).toFixed(2)} nm` }];
      },
    },
    {
      id: "light-range",
      name: "Geographical Range of a Light",
      group: "Latitude, Longitude and Distance",
      formula: "D = 2.08 × (√H + √h)  (H, h metres; D nm)",
      variables: [
        { symbol: "H", label: "Elevation of the light", unit: "m" },
        { symbol: "h", label: "Height of eye", unit: "m" },
      ],
      source: { code: "Admiralty List of Lights — geographical range" },
      note: "The geographical range is the light's dipping distance. The light is seen at the lesser of its geographical range and its luminous range for the visibility.",
      inputs: [
        { key: "H", label: "Elevation of the Light (H)", unit: "m", placeholder: "45" },
        { key: "h", label: "Height of Eye (h)", unit: "m", placeholder: "16" },
      ],
      calculate: (v) => {
        if (v.H < 0 || v.h < 0) return [{ label: "Error", value: "The heights cannot be negative" }];
        return [{ label: "Geographical Range", value: `${(2.08 * (Math.sqrt(v.H) + Math.sqrt(v.h))).toFixed(1)} nm` }];
      },
    },
    {
      id: "doubling-angle",
      name: "Two Bearings on the Bow (Doubling the Angle)",
      group: "Radar and Manoeuvring",
      formula: "d₂ = run × sin θ₁ / sin(θ₂ − θ₁) ;  abeam = d₂ × sin θ₂",
      variables: [
        { symbol: "θ₁, θ₂", label: "First and second angles on the bow", unit: "°" },
        { symbol: "run", label: "Distance run between the bearings", unit: "nm" },
      ],
      source: { code: "Sine rule — bearings of one object on the bow" },
      note: "When θ₂ = 2θ₁ (doubling the angle on the bow) the distance off at the second bearing equals the run.",
      inputs: [
        { key: "a1", label: "First Angle on the Bow (θ₁)", unit: "°", placeholder: "30" },
        { key: "a2", label: "Second Angle on the Bow (θ₂)", unit: "°", placeholder: "60" },
        { key: "run", label: "Run", unit: "nm", placeholder: "5" },
      ],
      calculate: (v) => {
        if (!(v.a1 > 0 && v.a2 > v.a1 && v.a2 < 180)) return [{ label: "Error", value: "0° < θ₁ < θ₂ < 180°" }];
        const rad = (x: number) => (x * Math.PI) / 180;
        const d2 = (v.run * Math.sin(rad(v.a1))) / Math.sin(rad(v.a2 - v.a1));
        return [
          { label: "Distance off at the second bearing", value: `${d2.toFixed(2)} nm` },
          { label: "Distance off when abeam", value: `${(d2 * Math.sin(rad(v.a2))).toFixed(2)} nm` },
        ];
      },
    },
    {
      id: "danger-angle",
      name: "Vertical Danger Angle",
      group: "Navigational Safety",
      formula: "tan α = H / d",
      variables: [
        { symbol: "H", label: "Height of the object above sea level", unit: "m" },
        { symbol: "d", label: "Clearing distance from the object", unit: "nm" },
        { symbol: "α", label: "Vertical sextant angle not to be exceeded", unit: "°" },
      ],
      source: { code: "Coastal navigation — vertical danger angle" },
      note: "Keep the vertical sextant angle of the object below α to stay outside the clearing distance. Valid while the base of the object is within the horizon.",
      inputs: [
        { key: "h", label: "Height of the Object (H)", unit: "m", placeholder: "60" },
        { key: "d", label: "Clearing Distance", unit: "nm", placeholder: "1" },
      ],
      calculate: (v) => {
        if (v.d <= 0) return [{ label: "Error", value: "The distance must be positive" }];
        const a = (Math.atan(v.h / (v.d * 1852)) * 180) / Math.PI;
        return [{ label: "Danger Angle (α)", value: `${a.toFixed(2)} ° (${(a * 60).toFixed(1)}′)` }];
      },
    },
    {
      id: "turning-geometry",
      name: "Turn on a Constant Radius",
      group: "Radar and Manoeuvring",
      formula: "advance = R sin Δ ;  transfer = R (1 − cos Δ) ;  wheel-over = R tan(Δ/2)",
      variables: [
        { symbol: "R", label: "Steady turning radius (slightly less than half the tactical diameter)", unit: "m" },
        { symbol: "Δ", label: "Alteration of course", unit: "°" },
      ],
      source: { code: "Circular-arc geometry of a turn" },
      note: "Measured from the start of the turn; the wheel-over distance is before the intersection of the two course lines. The ship's manoeuvring data take precedence.",
      inputs: [
        { key: "r", label: "Turning Radius (R)", unit: "m", placeholder: "300" },
        { key: "d", label: "Alteration of Course (Δ)", unit: "°", placeholder: "60" },
      ],
      calculate: (v) => {
        if (v.r <= 0 || v.d <= 0 || v.d >= 180) return [{ label: "Error", value: "R > 0 and 0° < Δ < 180°" }];
        const rad = (v.d * Math.PI) / 180;
        return [
          { label: "Advance", value: `${(v.r * Math.sin(rad)).toFixed(0)} m` },
          { label: "Transfer", value: `${(v.r * (1 - Math.cos(rad))).toFixed(0)} m` },
          { label: "Wheel-over before the intersection", value: `${(v.r * Math.tan(rad / 2)).toFixed(0)} m` },
        ];
      },
    },
    {
      id: "echo-sounder-depth",
      name: "Echo Sounder Depth",
      group: "Navigational Safety",
      formula: "Depth = (Speed of Sound × Elapsed Time) / 2",
      variables: [
        { symbol: "c", label: "Speed of sound in water (≈1500 m/s)", unit: "m/s" },
        { symbol: "t", label: "Two-way travel time of the signal", unit: "s" },
      ],
      source: { code: "Electronic navigation — echo sounder" },
      inputs: [
        { key: "c", label: "Speed of Sound (c)", unit: "m/s", placeholder: "1500" },
        { key: "t", label: "Two-Way Travel Time (t)", unit: "s", placeholder: "0.04" },
      ],
      calculate: (v) => {
        if (v.t < 0) return [{ label: "Error", value: "The time cannot be negative" }];
        const depth = (v.c * v.t) / 2;
        return [{ label: "Depth", value: `${depth.toFixed(1)} m` }];
      },
    },
  ],
};
