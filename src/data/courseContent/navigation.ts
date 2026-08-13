import { Compass } from "lucide-react";
import type { CourseTopic } from "./types";

/**
 * Seyir — tek kaynak ders içeriği.
 * Formüller, mevcut "Seyir Formülleri" sayfasında (NavigationFormulas.tsx)
 * gösterilen GERÇEK bağıntılardan birebir alınmıştır. `calculate` taşıyan
 * girdiler hem Formüller hem Hesaplamalar sayfasında görünür ve formül metni
 * ile daima aynı matematiği uygular.
 */
export const navigation: CourseTopic = {
  key: "navigation",
  title: "Seyir",
  icon: Compass,
  accent: "from-indigo-500 via-purple-500 to-blue-500",
  group: "deck",
  intro:
    "Distance-speed-time, sailings (plane/Mercator/great circle), current " +
    "triangle, compass conversions and celestial navigation fundamentals. Each formula is followed by " +
    "the tool that calculates it with the same relation.",
  advancedTool: { label: "Advanced Navigation Tools", href: "/navigation" },
  entries: [
    // ---- Temel Seyir ----
    {
      id: "speed-time-distance",
      name: "Speed – Distance – Time",
      group: "Temel Seyir",
      formula: "Speed = Distance / Time",
      variables: [
        { symbol: "Mesafe", label: "Kat edilen mesafe", unit: "nm" },
        { symbol: "Zaman", label: "Elapsed time", unit: "sa" },
        { symbol: "Speed", label: "Speed", unit: "knot" },
      ],
      source: { code: "Basic navigation — speed–distance–time relation" },
      inputs: [
        { key: "distance", label: "Mesafe", unit: "nm", placeholder: "120" },
        { key: "time", label: "Zaman", unit: "sa", placeholder: "8" },
      ],
      calculate: (v) => {
        if (v.time <= 0) return [{ label: "Hata", value: "The time must be positive" }];
        const speed = v.distance / v.time;
        return [{ label: "Speed", value: `${speed.toFixed(2)} knot` }];
      },
    },
    {
      id: "speed-conversion",
      name: "Speed Conversions",
      group: "Temel Seyir",
      formula: "1 knot = 1 nm/sa = 1.852 km/sa = 0.5144 m/s",
      variables: [{ symbol: "V", label: "Speed", unit: "knot" }],
      source: { code: "Standard unit conversions" },
      inputs: [{ key: "knots", label: "Speed", unit: "knot", placeholder: "15" }],
      calculate: (v) => [
        { label: "km/sa", value: `${(v.knots * 1.852).toFixed(2)} km/sa` },
        { label: "m/s", value: `${(v.knots * 0.5144).toFixed(3)} m/s` },
      ],
    },
    {
      id: "eta",
      name: "Estimated Time of Arrival (ETA)",
      group: "Temel Seyir",
      formula: "ETA = ETD + (Distance / Speed)",
      variables: [
        { symbol: "ETD", label: "Departure time (in hours)", unit: "sa" },
        { symbol: "Mesafe", label: "Mesafe", unit: "nm" },
        { symbol: "Speed", label: "Speed", unit: "knot" },
      ],
      source: { code: "Temel seyir — ETA/ETD" },
      note: "ETD is entered as a decimal hour (e.g. 14:30 = 14.5). The result is given as a decimal hour and a passage time.",
      inputs: [
        { key: "etd", label: "Departure Time (ETD)", unit: "sa", placeholder: "8" },
        { key: "distance", label: "Mesafe", unit: "nm", placeholder: "240" },
        { key: "speed", label: "Speed", unit: "knot", placeholder: "12" },
      ],
      calculate: (v) => {
        if (v.speed <= 0) return [{ label: "Hata", value: "The speed must be positive" }];
        const sailing = v.distance / v.speed;
        const eta = (v.etd + sailing) % 24;
        return [
          { label: "Passage Time", value: `${sailing.toFixed(2)} sa` },
          { label: "ETA", value: `${eta.toFixed(2)} h (24 h format)` },
        ];
      },
    },
    // ---- Enlem-Boylam ve Mesafe ----
    {
      id: "dlat-dlong",
      name: "D.Lat ve D.Long (Dakika)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "D.Lat = 60·Δφ ;  D.Long = 60·Δλ·cosφ̄",
      variables: [
        { symbol: "Δφ", label: "Difference of latitude", unit: "°" },
        { symbol: "Δλ", label: "Difference of longitude", unit: "°" },
        { symbol: "φ̄", label: "Orta enlem", unit: "°" },
      ],
      source: { code: "Plane sailing — D.Lat/Departure", detail: "1° = 60 NM" },
      note: "For departure (D.Long) the 1° = 60 NM relation is corrected by cosφ̄.",
      inputs: [
        { key: "dphi", label: "Difference of Latitude (Δφ)", unit: "°", placeholder: "2.5" },
        { key: "dlambda", label: "Difference of Longitude (Δλ)", unit: "°", placeholder: "3.0" },
        { key: "meanlat", label: "Orta Enlem (φ̄)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const dlat = 60 * v.dphi;
        const dep = 60 * v.dlambda * Math.cos((v.meanlat * Math.PI) / 180);
        return [
          { label: "D.Lat", value: `${dlat.toFixed(1)} nm` },
          { label: "Departure (D.Long)", value: `${dep.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "plane-sailing",
      name: "Plane Sailing (Rota ve Mesafe)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "Kurs = atan2(Dep, dLat) ;  Mesafe = √(dLat² + Dep²)",
      variables: [
        { symbol: "dLat", label: "Distance of the latitude difference (60·Δφ)", unit: "nm" },
        { symbol: "Dep", label: "Departure (60·Δλ·cosφ̄)", unit: "nm" },
      ],
      source: { code: "Plane sailing" },
      note: "The course is normalised to the 0–360° range.",
      inputs: [
        { key: "dlat", label: "D.Lat", unit: "nm", placeholder: "150" },
        { key: "dep", label: "Departure", unit: "nm", placeholder: "138" },
      ],
      calculate: (v) => {
        const dist = Math.sqrt(v.dlat * v.dlat + v.dep * v.dep);
        let course = (Math.atan2(v.dep, v.dlat) * 180) / Math.PI;
        if (course < 0) course += 360;
        return [
          { label: "Kurs", value: `${course.toFixed(1)} °` },
          { label: "Mesafe", value: `${dist.toFixed(1)} nm` },
        ];
      },
    },
    {
      id: "great-circle-distance",
      name: "Great Circle Distance",
      group: "Enlem-Boylam ve Mesafe",
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
      group: "Enlem-Boylam ve Mesafe",
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
      name: "Rhumb Line (Mercator) Mesafe",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 60·√((Δφ)² + (q·Δλ)²)",
      variables: [
        { symbol: "Δφ, Δλ", label: "Latitude/longitude difference", unit: "°" },
        {
          symbol: "q",
          label: "Meridional parts ratio = Δφ / ln(tan(π/4+φ₂/2)/tan(π/4+φ₁/2))",
        },
      ],
      source: { code: "Mercator seyri (rhumb line)" },
      note: "When Δφ → 0 the approximation q = cosφ̄ is used. East (+), west (−).",
      inputs: [
        { key: "lat1", label: "Departure Latitude (φ₁)", unit: "°", placeholder: "36" },
        { key: "lon1", label: "Departure Longitude (λ₁)", unit: "°", placeholder: "-5" },
        { key: "lat2", label: "Arrival Latitude (φ₂)", unit: "°", placeholder: "40" },
        { key: "lon2", label: "Arrival Longitude (λ₂)", unit: "°", placeholder: "14" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const dphiDeg = v.lat2 - v.lat1;
        const dlamDeg = v.lon2 - v.lon1;
        const phi1 = rad(v.lat1);
        const phi2 = rad(v.lat2);
        const dphi = rad(dphiDeg);
        const dpsi = Math.log(
          Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2)
        );
        const q = Math.abs(dphi) > 1e-9 ? dphi / dpsi : Math.cos((phi1 + phi2) / 2);
        const d = 60 * Math.sqrt(dphiDeg * dphiDeg + (q * dlamDeg) ** 2);
        let brg = (Math.atan2(rad(dlamDeg), dpsi || 1e-9) * 180) / Math.PI;
        if (brg < 0) brg += 360;
        return [
          { label: "Rhumb Line Mesafe", value: `${d.toFixed(1)} nm` },
          { label: "Kurs (Brg)", value: `${brg.toFixed(1)} °` },
        ];
      },
    },
    {
      id: "horizon-range",
      name: "Geographical Range (Horizon)",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 2.08·√h  (h metre, d nm)",
      variables: [{ symbol: "h", label: "Height of eye/light", unit: "m" }],
      source: { code: "Geographical range — height relation" },
      inputs: [{ key: "h", label: "Height (h)", unit: "m", placeholder: "20" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Hata", value: "The height cannot be negative" }];
        return [{ label: "Visible Range", value: `${(2.08 * Math.sqrt(v.h)).toFixed(2)} nm` }];
      },
    },
    {
      id: "vhf-radar-horizon",
      name: "Radar / VHF Ufuk Mesafesi",
      group: "Enlem-Boylam ve Mesafe",
      formula: "d = 2.23·(√h₁ + √h₂)  (h metre, d nm)",
      variables: [
        { symbol: "h₁", label: "Antenna/radar height", unit: "m" },
        { symbol: "h₂", label: "Target height", unit: "m" },
      ],
      source: { code: "Radar/VHF ufku (refraksiyon dahil)" },
      inputs: [
        { key: "h1", label: "Antenna Height (h₁)", unit: "m", placeholder: "30" },
        { key: "h2", label: "Target Height (h₂)", unit: "m", placeholder: "15" },
      ],
      calculate: (v) => {
        if (v.h1 < 0 || v.h2 < 0) return [{ label: "Hata", value: "The heights cannot be negative" }];
        const d = 2.23 * (Math.sqrt(v.h1) + Math.sqrt(v.h2));
        return [{ label: "Ufuk Mesafesi", value: `${d.toFixed(2)} nm` }];
      },
    },
    // ---- Akıntı, Rüzgar ve Pusula ----
    {
      id: "current-triangle",
      name: "Current Triangle (CTS / SOG)",
      group: "Current, Wind and Compass",
      formula:
        "sin(CTS−TR) = (c/V)·sin(set−TR) ;  SOG = V·cos(CTS−TR) + c·cos(set−TR)",
      variables: [
        { symbol: "TR", label: "Desired track", unit: "°" },
        { symbol: "V", label: "Vessel speed (through the water)", unit: "knot" },
        { symbol: "set", label: "Current set", unit: "°" },
        { symbol: "c", label: "Current drift", unit: "knot" },
      ],
      source: { code: "Current triangle — CTS/SOG" },
      note: "Angles are 0–360°. CTS = course to steer, SOG = speed over ground.",
      inputs: [
        { key: "tr", label: "Desired Track (TR)", unit: "°", placeholder: "90" },
        { key: "v", label: "Vessel Speed (V)", unit: "knot", placeholder: "12" },
        { key: "set", label: "Current Set", unit: "°", placeholder: "180" },
        { key: "c", label: "Current Drift (c)", unit: "knot", placeholder: "2" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        if (v.v <= 0) return [{ label: "Hata", value: "The vessel speed must be positive" }];
        const ratio = (v.c / v.v) * Math.sin(rad(v.set - v.tr));
        if (Math.abs(ratio) > 1) return [{ label: "Hata", value: "The current is too strong, the track cannot be held" }];
        const corr = (Math.asin(ratio) * 180) / Math.PI;
        let cts = v.tr + corr;
        cts = ((cts % 360) + 360) % 360;
        const sog =
          v.v * Math.cos(rad(cts - v.tr)) + v.c * Math.cos(rad(v.set - v.tr));
        return [
          { label: "CTS (Course To Steer)", value: `${cts.toFixed(1)} °` },
          { label: "SOG", value: `${sog.toFixed(2)} knot` },
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
        { symbol: "Dev", label: "Deviasyon", unit: "°" },
        { symbol: "Var", label: "Manyetik sapma (variation)", unit: "°" },
        { symbol: "Ct", label: "Hakiki rota", unit: "°" },
      ],
      source: { code: "TVMDC chain (magnetic/compass correction)" },
      note: "East (E) values are entered as (+), west (W) values as (−). The result is normalised to 0–360°.",
      inputs: [
        { key: "cc", label: "Compass Course (Cc)", unit: "°", placeholder: "270" },
        { key: "dev", label: "Deviasyon (Dev)", unit: "°", placeholder: "-2" },
        { key: "var", label: "Variation (Var)", unit: "°", placeholder: "5" },
      ],
      calculate: (v) => {
        let ct = v.cc + v.dev + v.var;
        ct = ((ct % 360) + 360) % 360;
        return [
          { label: "Hakiki Rota (Ct)", value: `${ct.toFixed(1)} °` },
          { label: "Compass Error (Dev+Var)", value: `${(v.dev + v.var).toFixed(1)} °` },
        ];
      },
    },
    // ---- Radar ve Manevra ----
    {
      id: "cpa-tcpa",
      name: "TCPA / CPA",
      group: "Radar ve Manevra",
      formula: "tCPA = −(R·Vrel)/|Vrel|² ;  dCPA = |R + Vrel·tCPA|",
      variables: [
        { symbol: "R", label: "Relative position vector (Rx, Ry)", unit: "nm" },
        { symbol: "Vrel", label: "Relative velocity vector (Vx, Vy)", unit: "knot" },
      ],
      source: { code: "Radar plotting — CPA/TCPA" },
      note: "The vector components are entered as (x: east, y: north). A negative tCPA means the target is opening.",
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
          { label: "TCPA", value: `${tcpa.toFixed(2)} sa (${(tcpa * 60).toFixed(1)} dk)` },
          { label: "CPA", value: `${dcpa.toFixed(2)} nm` },
        ];
      },
    },
    {
      id: "rate-of-turn",
      name: "Rate of Turn (ROT)",
      group: "Radar ve Manevra",
      formula: "ROT (°/dk) = (30·V) / R",
      variables: [
        { symbol: "V", label: "Speed", unit: "knot" },
        { symbol: "R", label: "Turning radius", unit: "m" },
      ],
      source: { code: "Manevra — rate of turn" },
      note: "30 = (1852 m/h) / (60 min × π/180·… ) simplified coefficient; the relation given on the page.",
      inputs: [
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "12" },
        { key: "r", label: "Turning Radius (R)", unit: "m", placeholder: "600" },
      ],
      calculate: (v) => {
        if (v.r <= 0) return [{ label: "Hata", value: "The radius must be positive" }];
        const rot = (30 * v.v) / v.r;
        return [{ label: "Rate of Turn (ROT)", value: `${rot.toFixed(2)} °/dk` }];
      },
    },
    // ---- Seyir Emniyeti ----
    {
      id: "ukc",
      name: "Under Keel Clearance (UKC)",
      group: "Seyir Emniyeti",
      formula: "UKC = CD + HoT − Draft − Squat",
      variables: [
        { symbol: "CD", label: "Charted depth (chart datum)", unit: "m" },
        { symbol: "HoT", label: "Height of tide", unit: "m" },
        { symbol: "Draft", label: "Vessel draft", unit: "m" },
        { symbol: "Squat", label: "Squat (basma)", unit: "m" },
      ],
      source: { code: "Navigational safety — UKC relation" },
      inputs: [
        { key: "cd", label: "Charted Depth (CD)", unit: "m", placeholder: "12" },
        { key: "hot", label: "Height of Tide (HoT)", unit: "m", placeholder: "1.5" },
        { key: "draft", label: "Draft", unit: "m", placeholder: "10.5" },
        { key: "squat", label: "Squat", unit: "m", placeholder: "0.4" },
      ],
      calculate: (v) => {
        const ukc = v.cd + v.hot - v.draft - v.squat;
        const durum = ukc > 0 ? "Positive clearance" : "DANGER — insufficient water";
        return [
          { label: "UKC", value: `${ukc.toFixed(2)} m` },
          { label: "Durum", value: durum },
        ];
      },
    },
    {
      id: "squat",
      name: "Squat (Open Water Approximation)",
      group: "Seyir Emniyeti",
      formula: "Squat ≈ V² / (100·B)",
      variables: [
        { symbol: "V", label: "Speed", unit: "knot" },
        { symbol: "B", label: "Vessel beam", unit: "m" },
      ],
      source: { code: "Navigational safety — open water squat approximation" },
      inputs: [
        { key: "v", label: "Speed (V)", unit: "knot", placeholder: "14" },
        { key: "b", label: "Beam (B)", unit: "m", placeholder: "22" },
      ],
      calculate: (v) => {
        if (v.b <= 0) return [{ label: "Hata", value: "The beam must be positive" }];
        const squat = (v.v * v.v) / (100 * v.b);
        return [{ label: "Squat", value: `${squat.toFixed(2)} m` }];
      },
    },
    // ---- Gelgit ----
    {
      id: "height-of-tide",
      name: "Height of Tide (Rule of Twelfths)",
      group: "Gelgit",
      formula: "H = Low + (Σ twelfths ratio × Tidal Range)",
      variables: [
        { symbol: "Low", label: "Low water height", unit: "m" },
        { symbol: "Range", label: "Tidal range (HW − LW)", unit: "m" },
        { symbol: "t", label: "Hours elapsed since LW (1–6)", unit: "sa" },
      ],
      source: { code: "Rule of Twelfths" },
      note: "Twelfths: 1,3,6,9,11,12 / 12 (cumulative at the end of each hour). Enter t = 0..6 hours.",
      inputs: [
        { key: "low", label: "Low Water (LW)", unit: "m", placeholder: "1.2" },
        { key: "range", label: "Tidal Range", unit: "m", placeholder: "4.0" },
        { key: "t", label: "Elapsed Time (since LW)", unit: "sa", placeholder: "3" },
      ],
      calculate: (v) => {
        const cum = [0, 1, 3, 6, 9, 11, 12];
        const hr = Math.max(0, Math.min(6, Math.round(v.t)));
        const fraction = cum[hr] / 12;
        const h = v.low + fraction * v.range;
        return [
          { label: "Amount Risen", value: `${(fraction * v.range).toFixed(2)} m` },
          { label: "Height of Tide (H)", value: `${h.toFixed(2)} m` },
        ];
      },
    },
    // ---- Göksel Seyir ----
    {
      id: "celestial-altitude",
      name: "Calculated Altitude (Hc)",
      group: "Celestial Navigation",
      formula: "sin(Hc) = sinφ·sinδ + cosφ·cosδ·cos(LHA)",
      variables: [
        { symbol: "φ", label: "Observer latitude", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "LHA", label: "Local hour angle", unit: "°" },
      ],
      source: { code: "Sight reduction — calculated altitude" },
      note: "South latitude/declination is entered as (−). Used with Nautical Almanac data.",
      inputs: [
        { key: "lat", label: "Enlem (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
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
            title: "1. terim: sinφ · sinδ",
            expression: `sin(${v.lat}°) · sin(${v.dec}°) = ${Math.sin(rad(v.lat)).toFixed(4)} · ${Math.sin(rad(v.dec)).toFixed(4)}`,
            result: `${term1.toFixed(4)}`,
          },
          {
            title: "2. terim: cosφ · cosδ · cos(LHA)",
            expression: `cos(${v.lat}°) · cos(${v.dec}°) · cos(${v.lha}°)`,
            result: `${term2.toFixed(4)}`,
          },
          {
            title: "Toplam = sin(Hc)",
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
      name: "Azimut (Z)",
      group: "Celestial Navigation",
      formula: "cos(Z) = (sinδ − sinφ·sinHc) / (cosφ·cosHc)",
      variables: [
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "φ", label: "Observer latitude", unit: "°" },
        { symbol: "Hc", label: "Calculated altitude", unit: "°" },
      ],
      source: { code: "Sight reduction — azimut" },
      note: "Declination, latitude and calculated altitude are entered in degrees; the azimuth angle Z (0–180°) is computed.",
      inputs: [
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
        { key: "lat", label: "Observer Latitude (φ)", unit: "°", placeholder: "41" },
        { key: "hc", label: "Calculated Altitude (Hc)", unit: "°", placeholder: "35" },
      ],
      calculate: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9) return [{ label: "Hata", value: "The denominator is near zero (φ or Hc = 90°)" }];
        let cosZ = (Math.sin(v.dec * r) - Math.sin(v.lat * r) * Math.sin(v.hc * r)) / denom;
        cosZ = Math.max(-1, Math.min(1, cosZ));
        const Z = Math.acos(cosZ) / r;
        return [{ label: "Azimuth Angle (Z)", value: `${Z.toFixed(1)}°` }];
      },
      steps: (v) => {
        const r = Math.PI / 180;
        const denom = Math.cos(v.lat * r) * Math.cos(v.hc * r);
        if (Math.abs(denom) < 1e-9)
          return [{ title: "Hata", result: "The denominator is near zero (φ or Hc = 90°)" }];
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
            title: "Pay: sinδ − sinφ · sinHc",
            expression: `sin(${v.dec}°) − sin(${v.lat}°)·sin(${v.hc}°)`,
            result: `${numer.toFixed(4)}`,
          },
          {
            title: "Payda: cosφ · cosHc",
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
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "φ", label: "Observer latitude", unit: "°" },
      ],
      source: { code: "Celestial navigation — amplitude (compass error check)" },
      note: "Measured from E when rising and from W when setting. South latitude/declination is entered as (−).",
      inputs: [
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "15" },
        { key: "lat", label: "Enlem (φ)", unit: "°", placeholder: "40" },
      ],
      calculate: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1) return [{ label: "Hata", value: "At this latitude the body does not rise/set" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        return [{ label: "Amplitude (A)", value: `${a.toFixed(2)} ° (E/W'den)` }];
      },
      steps: (v) => {
        const rad = (x: number) => (x * Math.PI) / 180;
        const ratio = Math.sin(rad(v.dec)) / Math.cos(rad(v.lat));
        if (Math.abs(ratio) > 1)
          return [{ title: "Hata", result: "At this latitude the body does not rise/set (|sinδ/cosφ| > 1)" }];
        const a = (Math.asin(ratio) * 180) / Math.PI;
        return [
          {
            title: "Substitute the data",
            expression: `δ = ${v.dec}°, φ = ${v.lat}°`,
            hint: "The amplitude is the true azimuth of the body at rising/setting; it is used to check the compass error.",
          },
          {
            title: "Oran: sinδ / cosφ",
            expression: `sin(${v.dec}°) / cos(${v.lat}°) = ${Math.sin(rad(v.dec)).toFixed(4)} / ${Math.cos(rad(v.lat)).toFixed(4)}`,
            result: `${ratio.toFixed(4)}`,
          },
          {
            title: "A from the inverse sine (arcsin)",
            expression: `A = arcsin(${ratio.toFixed(4)})`,
            result: `A = ${a.toFixed(2)}° (E/W'den)`,
            hint: "Measured from E when rising and from W when setting; toward the north for a N declination and toward the south for a S declination.",
          },
        ];
      },
    },
    // ---- Konu anlatımından eklenen hesaplayıcılar ----
    {
      id: "arc-time",
      name: "Longitude ↔ Time Conversion",
      group: "Enlem-Boylam ve Mesafe",
      formula: "λ(°) = ZF × 15 ;  Boylam(°) × 4 = ZF(dk)",
      variables: [
        { symbol: "λ", label: "Boylam (yay)", unit: "°" },
        { symbol: "ZF", label: "Time difference", unit: "sa" },
      ],
      source: { code: "Celestial navigation — arc/time conversion", detail: "360° = 24 sa, 1° = 4 dk" },
      note: "Enter the longitude in degrees → the equivalent time difference (relative to Greenwich) is calculated.",
      inputs: [{ key: "lon", label: "Boylam (λ)", unit: "°", placeholder: "45" }],
      calculate: (v) => {
        const totalMin = Math.abs(v.lon) * 4;
        const h = Math.floor(totalMin / 60);
        const m = totalMin - h * 60;
        return [
          { label: "Time Difference (decimal)", value: `${(totalMin / 60).toFixed(3)} sa` },
          { label: "Time Difference (h:min)", value: `${h} sa ${m.toFixed(1)} dk` },
        ];
      },
    },
    {
      id: "dip",
      name: "Dip of the Horizon",
      group: "Celestial Navigation",
      formula: "Dip = 1.76 × √h  (h metre, Dip dakika)",
      variables: [{ symbol: "h", label: "Height of eye", unit: "m" }],
      source: { code: "Nautical Almanac — dip of the horizon" },
      note: "The dip caused by the observer's height of eye in the sextant altitude correction.",
      inputs: [{ key: "h", label: "Height of Eye (h)", unit: "m", placeholder: "12" }],
      calculate: (v) => {
        if (v.h < 0) return [{ label: "Hata", value: "The height cannot be negative" }];
        const dip = 1.76 * Math.sqrt(v.h);
        return [{ label: "Dip", value: `${dip.toFixed(1)} ′ (dakika)` }];
      },
      steps: (v) => {
        if (v.h < 0) return [{ title: "Hata", result: "The height cannot be negative" }];
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
      formula: "Ho = Hs ± IE − Dip ± R ± SD ± P",
      variables: [
        { symbol: "Hs", label: "Sextant altitude", unit: "°" },
        { symbol: "IE", label: "Index error (E: −, W: +)", unit: "′" },
        { symbol: "Dip", label: "Dip of the horizon", unit: "′" },
        { symbol: "R", label: "Total correction (refraction + SD + P)", unit: "′" },
      ],
      source: { code: "Nautical Almanac — sight reduction (apparent → observed altitude)" },
      note: "IE and the total correction are entered in minutes (′). The index error is applied with its sign, the dip is always subtracted, and the main correction R is added with its sign.",
      inputs: [
        { key: "hs", label: "Sextant Altitude (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Index Error (IE)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Main Correction (R)", unit: "′", placeholder: "14.5" },
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
            title: "Apply the index error (IE)",
            expression: `${hsMin.toFixed(1)} ′ + (${v.ie}) ′`,
            result: `${afterIe.toFixed(1)} ′`,
            hint: "IE is added with its sign (on the arc: −, off the arc: +).",
          },
          {
            title: "Subtract the dip",
            expression: `${afterIe.toFixed(1)} ′ − ${v.dip} ′`,
            result: `${afterDip.toFixed(1)} ′  (apparent altitude, Ha)`,
          },
          {
            title: "Apply the main correction (R)",
            expression: `${afterDip.toFixed(1)} ′ + (${v.r}) ′`,
            result: `${hoMin.toFixed(1)} ′`,
            hint: "R = refraction + semi-diameter (SD) + parallax (P), taken from the Almanac.",
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
      note: "Positive (Toward) → toward the body, negative (Away) → away from the body. 1′ = 1 NM.",
      inputs: [
        { key: "ho", label: "Observed Altitude (Ho)", unit: "°", placeholder: "45.30" },
        { key: "hc", label: "Calculated Altitude (Hc)", unit: "°", placeholder: "45.10" },
      ],
      calculate: (v) => {
        const aMin = (v.ho - v.hc) * 60;
        const yon = aMin >= 0 ? "Toward (towards the body)" : "Away (from the body)";
        return [
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} NM` },
          { label: "Direction", value: yon },
        ];
      },
      steps: (v) => {
        const diff = v.ho - v.hc;
        const aMin = diff * 60;
        const yon = aMin >= 0 ? "Toward (towards the body)" : "Away (from the body)";
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
            result: `a = ${Math.abs(aMin).toFixed(1)} NM`,
            hint: "1 minute of arc = 1 nautical mile.",
          },
          {
            title: "Determine the direction",
            expression: aMin >= 0 ? "Ho > Hc → toward the body" : "Ho < Hc → away from the body",
            result: yon,
            hint: "The line of position (LOP) is drawn by shifting a from the AP along the azimuth in this direction.",
          },
        ];
      },
    },
    {
      id: "meridian-passage-lat",
      name: "Latitude by Meridian Passage",
      group: "Celestial Navigation",
      formula: "Z = 90° − Ho ;  φ = Z ± δ",
      variables: [
        { symbol: "Ho", label: "Observed altitude at meridian passage", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
      ],
      source: { code: "Celestial navigation — latitude by meridian passage" },
      note: "The zenith distance (Z) and the declination are added when of the same name and subtracted when of contrary name. Entering south values as (−) handles this automatically.",
      inputs: [
        { key: "ho", label: "Observed Altitude (Ho)", unit: "°", placeholder: "68.5" },
        { key: "dec", label: "Deklinasyon (δ, S: −)", unit: "°", placeholder: "20" },
        { key: "bearing", label: "Body Direction (1 = zenith to the south, −1 = north)", unit: "", placeholder: "1" },
      ],
      calculate: (v) => {
        const z = 90 - v.ho;
        // Zenit güneyde ise (cisim meridyeni güneyde) enlem = δ + Z, kuzeyde ise δ − Z
        const sign = v.bearing >= 0 ? 1 : -1;
        const lat = v.dec + sign * z;
        const hemis = lat >= 0 ? "N" : "S";
        return [
          { label: "Zenit Mesafesi (Z)", value: `${z.toFixed(2)} °` },
          { label: "Enlem (φ)", value: `${Math.abs(lat).toFixed(2)} ° ${hemis}` },
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
            expression: `Ho = ${v.ho}°, δ = ${v.dec}°, direction = ${v.bearing >= 0 ? "zenith to the south" : "zenith to the north"}`,
            hint: "At meridian passage (local apparent noon) the body is on the observer's meridian.",
          },
          {
            title: "Zenit mesafesi: Z = 90° − Ho",
            expression: `90° − ${v.ho}°`,
            result: `Z = ${z.toFixed(2)}°`,
          },
          {
            title: "Enlem: φ = δ ± Z",
            expression: `${v.dec}° ${sign >= 0 ? "+" : "−"} ${z.toFixed(2)}°`,
            result: `φ = ${Math.abs(lat).toFixed(2)}° ${hemis}`,
            hint: "Z and δ are added when of the same name and subtracted when of contrary name (the signs are handled automatically).",
          },
        ];
      },
    },
    {
      id: "sight-reduction",
      name: "Line of Position Chain (Sight Reduction)",
      group: "Celestial Navigation",
      formula: "GHA → LHA = GHA±λ → Hc, Z → Ho = Hs±corrections → a = Ho−Hc",
      variables: [
        { symbol: "GHA", label: "Greenwich hour angle", unit: "°" },
        { symbol: "λ", label: "Boylam (E: +, W: −)", unit: "°" },
        { symbol: "φ", label: "AP enlemi", unit: "°" },
        { symbol: "δ", label: "Deklinasyon", unit: "°" },
        { symbol: "Hs", label: "Sextant altitude", unit: "°" },
        { symbol: "a", label: "Intercept (altitude difference)", unit: "NM" },
      ],
      source: { code: "Marcq St-Hilaire — tam sight reduction zinciri (AP → LOP)" },
      note: "GHA and δ are taken from the Almanac. South latitude/declination is entered as (−) and west longitude as (−). All corrections are in minutes (′).",
      inputs: [
        { key: "gha", label: "GHA", unit: "°", placeholder: "130.5" },
        { key: "lon", label: "Boylam (λ, E:+ W:−)", unit: "°", placeholder: "28" },
        { key: "lat", label: "AP Enlemi (φ)", unit: "°", placeholder: "40" },
        { key: "dec", label: "Deklinasyon (δ)", unit: "°", placeholder: "20" },
        { key: "hs", label: "Sextant Altitude (Hs)", unit: "°", placeholder: "45.5" },
        { key: "ie", label: "Index Error (IE)", unit: "′", placeholder: "-1.5" },
        { key: "dip", label: "Dip", unit: "′", placeholder: "6.1" },
        { key: "r", label: "Main Correction (R)", unit: "′", placeholder: "14.5" },
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
        const yon = aMin >= 0 ? "Toward (towards the body)" : "Away (from the body)";
        return [
          { label: "LHA", value: `${lha.toFixed(2)} °` },
          { label: "Calculated Altitude (Hc)", value: `${hc.toFixed(2)} °` },
          { label: "Azimuth Angle (Z)", value: `${z.toFixed(1)} °` },
          { label: "Observed Altitude (Ho)", value: `${ho.toFixed(3)} °` },
          { label: "Intercept (a)", value: `${Math.abs(aMin).toFixed(1)} NM ${yon}` },
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
        const yon = aMin >= 0 ? "Toward (towards the body)" : "Away (from the body)";
        return [
          {
            title: "1) Local Hour Angle (LHA) = GHA ± λ",
            expression: `${v.gha}° + (${v.lon}°) = ${(v.gha + v.lon).toFixed(2)}° → 0–360° normalize`,
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
            hint: "Z is the azimuth direction used when plotting the line of position (LOP).",
          },
          {
            title: "4) Observed Altitude (Ho) = Hs ± corrections",
            expression: `${v.hs}° + (${v.ie}′ IE) − ${v.dip}′ Dip + ${v.r}′ R`,
            result: `Ho = ${ho.toFixed(3)}°`,
            hint: "The sextant reading Hs is converted to the true altitude with the index error, dip and main correction.",
          },
          {
            title: "5) Intercept (a) = Ho − Hc",
            expression: `(${ho.toFixed(3)}° − ${hc.toFixed(2)}°) × 60 = ${aMin.toFixed(1)} ′`,
            result: `a = ${Math.abs(aMin).toFixed(1)} NM — ${yon}`,
            hint: "The line of position (LOP) is drawn by running a from the AP along the azimuth (Zn) in this direction; the intersection of two LOPs is the fix.",
          },
        ];
      },
    },
    {
      id: "gc-vertex-lat",
      name: "Great Circle Vertex Latitude",
      group: "Enlem-Boylam ve Mesafe",
      formula: "sin φv = |sin C₁| × cos φ₁",
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
        const sinPv = Math.abs(Math.sin(rad(v.c1))) * Math.cos(rad(v.lat1));
        const pv = (Math.asin(Math.min(1, sinPv)) * 180) / Math.PI;
        return [{ label: "Tepe Enlemi (φv)", value: `${pv.toFixed(2)} °` }];
      },
    },
    {
      id: "distance-vertical-angle",
      name: "Distance Off by Vertical Angle",
      group: "Radar ve Manevra",
      formula: "Distance (NM) ≈ 1.856 × Height(m) / Vertical Angle(′)",
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
        if (v.angle <= 0) return [{ label: "Hata", value: "The vertical angle must be positive" }];
        const dist = (1.856 * v.h) / v.angle;
        return [{ label: "Mesafe", value: `${dist.toFixed(2)} NM` }];
      },
    },
    {
      id: "echo-sounder-depth",
      name: "Echo Sounder Depth",
      group: "Seyir Emniyeti",
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
        if (v.t < 0) return [{ label: "Hata", value: "The time cannot be negative" }];
        const depth = (v.c * v.t) / 2;
        return [{ label: "Derinlik", value: `${depth.toFixed(1)} m` }];
      },
    },
  ],
};
