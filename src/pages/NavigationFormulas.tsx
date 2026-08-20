import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Sigma, BookOpen, Calculator, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavigationFormulasPage() {
  // Table of contents grouped under the category headings
  const tocGroups = [
    {
      header: "1. Navigation Calculations",
      items: [
        { id: "gc", title: "Great Circle" },
        { id: "rhumb", title: "Rhumb Line (Mercator)" },
        { id: "plane", title: "Plane Sailing" },
        { id: "time-eta", title: "Time and ETA" },
        { id: "current", title: "Current Triangle (CTS)" },
        { id: "compass", title: "Compass Conversions" },
        { id: "cpa", title: "CPA / TCPA" },
        { id: "colreg", title: "COLREG Maneuver" },
        { id: "position", title: "Location Detection" },
        { id: "bearings", title: "Bearing Calculations" },
        { id: "distance", title: "Distance Calculations" },
        { id: "turning", title: "Turning Calculations" },
        { id: "safety", title: "Navigational Safety" },
        { id: "passage", title: "Passage Plan" }
      ]
    },
    {
      header: "2. Real-time Information",
      items: [
        { id: "radar", title: "Radar Calculations" }
      ]
    },
    {
      header: "3. Meteorology and Environmental Factors",
      items: [
        { id: "weather", title: "Weather" },
        { id: "tides", title: "Tide Calculations" }
      ]
    },
    {
      header: "4. Port and Aids to Navigation",
      items: [
        { id: "pilotage", title: "Coastal Navigation" },
        { id: "celestial", title: "Celestial Navigation" },
        { id: "sight", title: "Sight Reduction" },
        { id: "ecdis", title: "ECDIS Controls" }
      ]
    },
    {
      header: "5. Emergency",
      items: [
        { id: "emergency", title: "Emergency Formulas" }
      ]
    }
  ];

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const isOpen = (id: string) => !!openSections[id];
  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const openSection = (id: string) => {
    setOpenSections(prev => (prev[id] ? prev : { ...prev, [id]: true }));
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      if (id) openSection(id);
    }
  }, []);

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground hidden sm:flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Formula Guide
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sigma className="h-5 w-5" /> Navigation Formulas – Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tocGroups.map((group) => (
                <div key={group.header} className="space-y-2">
                  <div className="text-sm font-semibold text-primary px-1">{group.header}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <a key={s.id} href={`#${s.id}`} onClick={() => openSection(s.id)}>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          {s.title}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Scope of the Navigation Calculations (15 sections)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong>Basic navigation:</strong> speed–distance–time, knots ↔ km/h ↔ m/s conversions, ETA/ETD, remaining time and distance, average speed and SMG/DMG calculations.</li>
              <li><strong>Course and bearings:</strong> plane sailing, departure, D.Lat/D.Long, middle latitude sailing, true/magnetic/compass course, chart scale and verifying the track by bearings.</li>
              <li><strong>Latitude and longitude:</strong> determining the direction of dLat/dLong, the 1° = 60 NM relation, converting longitude to NM with cos φ, and the distance between two points.</li>
              <li><strong>On the chart:</strong> using parallel rules and dividers, true course and distance → time conversion, and checking after chart corrections.</li>
              <li><strong>Magnetism and compass:</strong> variation, deviation, the TVMDC (True–Variation–Magnetic–Deviation–Compass) chain, the sign conventions and compass error.</li>
              <li><strong>Current and wind:</strong> set/drift, CTS, SOG, leeway, the vector triangle and correcting the ETA for the current.</li>
              <li><strong>Bearings:</strong> single, two and three bearing fixes, relative → true bearing, transit lines, running fix, DR and EP.</li>
              <li><strong>Radar:</strong> radar range and bearing, CPA/TCPA, relative and true motion, the manual radar plot and solving for target course and speed.</li>
              <li><strong>COLREG context:</strong> identifying the encounter, risk of collision, the new CPA/TCPA after a manoeuvre and relative movement analysis.</li>
              <li><strong>Great circle and rhumb line:</strong> initial and final course, vertex latitude, the GC vs RL distance difference and the composite great circle.</li>
              <li><strong>Tides:</strong> HW/LW times and heights, the rule of twelfths, secondary port corrections and the effect of the tide on UKC and squat.</li>
              <li><strong>Navigational safety:</strong> UKC, squat, safe speed and distance, the wheel-over point, the turning circle, advance and transfer.</li>
              <li><strong>Passage plan:</strong> total route distance, ETA per leg, wheel-over positions, no-go areas, TSS and abort point calculations.</li>
              <li><strong>Celestial navigation:</strong> GHA/LHA, declination, sextant/dip/refraction corrections, the LOP, the noon sight and sun/star fixes.</li>
              <li><strong>Electronic navigation (ECDIS):</strong> XTD, safety contour and depth, look-ahead time and route check contours.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Required Tables and Publications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Tide Tables and Tidal Stream Atlas:</strong> HW/LW times and heights, secondary port differences and set/drift references for the tidal stream.</li>
              <li><strong>Nautical Almanac:</strong> GHA/LHA, declination, refraction and parallax corrections; sunrise/sunset and meridian passage data.</li>
              <li><strong>Sight Reduction Tables (HO-249/HO-229):</strong> using the tables to solve for the intercept and azimuth.</li>
              <li><strong>Deviation card and compass error log:</strong> magnetic and compass corrections and verification of the TVMDC chain.</li>
              <li><strong>Chart catalog and corrections:</strong> the current chart/ENC list, the NM/UWN/SNW bulletins and the ECDIS route check output.</li>
              <li><strong>Current and wind reference sheets:</strong> leeway angle coefficients, maneuvering diagrams and advance/transfer and wheel-over tables.</li>
            </ul>
          </CardContent>
        </Card>

        {/* 1. Navigation Calculations */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-primary px-1">1. Navigation Calculations</div>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('gc')} className="cursor-pointer" aria-expanded={isOpen('gc')}>
              <CardTitle id="gc" className="scroll-mt-24 flex items-center justify-between">
                Great Circle
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('gc') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('gc') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3 space-y-3">
                <p>
                  Great circle geometry forms the core of the navigational mathematics that treats the earth as a sphere.
                  The arc where the single plane through two positions and the centre of the earth cuts the sphere is the great circle arc.
                  A great circle is therefore not an arbitrary curve but a fully determined geometric necessity.
                </p>
                <p>
                  The underlying structure is the spherical triangle. In the triangle formed by the point of departure, the
                  point of arrival and the pole, the sides are great circle arcs. Unlike plane trigonometry, the sides are
                  represented by angles, and those angles by differences of latitude and longitude.
                </p>
                <p>
                  The great circle distance is defined by the central angle subtended at the centre of the earth. As the
                  central angle grows, the distance over the surface increases linearly, so the first step of the
                  calculation is to find the central angle correctly.
                </p>
              </div>
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Distance (nm):
d = 2R × arcsin(√(sin²((φ₂−φ₁)/2) + cosφ₁ · cosφ₂ · sin²((λ₂−λ₁)/2)))

Initial course (θ₀):
θ₀ = atan2(sinΔλ · cosφ₂, cosφ₁ · sinφ₂ − sinφ₁ · cosφ₂ · cosΔλ)

Final course (θf):
θf = atan2(sinΔλ · cosφ₁, −cosφ₂ · sinφ₁ + sinφ₂ · cosφ₁ · cosΔλ)

Vertex latitude:
φvertex = arccos(|sinθ₀ · cosφ₁|)

Composite GC:
To avoid approaching the poles, combine a GC leg at high latitude with an RL leg.

R ≈ 3440.065 nm`}</pre>
              </div>
              <div className="bg-muted/30 rounded p-3 space-y-2">
                <div className="font-semibold text-primary">Spherical Triangle – Central Angle Relation</div>
                <div className="font-mono text-sm leading-6">{`cos θ = sin φ₁ · sin φ₂ + cos φ₁ · cos φ₂ · cos Δλ`}</div>
                <ul className="list-disc pl-4 space-y-1">
                  <li>θ: the central angle between the two positions</li>
                  <li>φ₁, φ₂: the latitudes of departure and arrival</li>
                  <li>Δλ: the difference of length</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded p-3 space-y-2">
                <div className="font-semibold text-primary">Worked Example</div>
                <div className="grid gap-1">
                  <div>Departure: 25° N, 040° W</div>
                  <div>Arrival: 45° N, 010° E</div>
                  <div>Δλ = 50°</div>
                </div>
                <div className="font-mono text-sm leading-6">{`sin 25° ≈ 0.423   cos 25° ≈ 0.906
sin 45° ≈ 0.707   cos 45° ≈ 0.707
cos 50° ≈ 0.643

cos θ = (0.423 × 0.707) + (0.906 × 0.707 × 0.643)
cos θ ≈ 0.299 + 0.412 = 0.711
θ ≈ 45°`}</div>
                <p>
                  The central angle found is the direct equivalent of the great circle distance and is converted into the
                  distance in the next step.
                </p>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('rhumb')} className="cursor-pointer" aria-expanded={isOpen('rhumb')}>
              <CardTitle id="rhumb" className="scroll-mt-24 flex items-center justify-between">
                Rhumb Line (Mercator)
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('rhumb') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('rhumb') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Δψ = ln(tan(π/4 + φ₂/2) / tan(π/4 + φ₁/2))   (difference of meridional parts)
q = Δφ / Δψ        (as Δφ → 0, q → cosφ̄)
Distance (nm): d = 60 · √((Δφ)² + (q · Δλ)²)
Course: Brg = atan2(Δλ, Δψ)
Approximation: Departure = 60 · Δλ · cosφ̄, dLat = 60 · Δφ`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('plane')} className="cursor-pointer" aria-expanded={isOpen('plane')}>
              <CardTitle id="plane" className="scroll-mt-24 flex items-center justify-between">
                Plane Sailing
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('plane') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('plane') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`dLat = 60 · Δφ (N/S direction)
Dep = 60 · Δλ · cosφ̄ (E/W direction)
Course = atan2(Dep, dLat)
Distance = √(dLat² + Dep²)

Middle Lat Sailing:
φ̄ = (φ₁ + φ₂) / 2
Departure = Distance × sin(Course)
D.Long (minutes) = Departure / cosφ̄
Course (RL): atan2(D.Long, DMP)
DMP = MP₂ − MP₁  (difference of meridional parts)
MP = 7915.7045 · log₁₀tan(45° + φ/2) − 23.0133 · sinφ`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('time-eta')} className="cursor-pointer" aria-expanded={isOpen('time-eta')}>
              <CardTitle id="time-eta" className="scroll-mt-24 flex items-center justify-between">
                Time and ETA
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('time-eta') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('time-eta') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Speed = Distance / Time
Time = Distance / Speed
Distance = Speed × Time

Speed conversions:
1 knot = 1 nm/h = 1.852 km/h = 0.5144 m/s

ETA = ETD + (Distance / Speed)
ETD = ETA − (Distance / Speed)
Remaining Time = Remaining Distance / current SOG
Average Speed = Total Distance / Total Time
SMG = DMG / Time Elapsed
DMG = Σ leg distances
Remaining Distance = Planned Total Distance − DMG`}</pre>
                <div className="text-xs text-muted-foreground">The SMG/DMG and SOG/course made good values must be verified against the log, radar and GPS data.</div>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('current')} className="cursor-pointer" aria-expanded={isOpen('current')}>
              <CardTitle id="current" className="scroll-mt-24 flex items-center justify-between">
                Current Triangle (CTS)
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('current') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('current') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`sin(CTS − TR) = (c / V) · sin(set − TR)
SOG = V · cos(CTS − TR) + c · cos(set − TR)`}</pre>
                <div className="text-xs text-muted-foreground">TR: the desired track, V: the vessel speed, c/set: the current. Corrected ETA = planned distance / SOG.</div>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('compass')} className="cursor-pointer" aria-expanded={isOpen('compass')}>
              <CardTitle id="compass" className="scroll-mt-24 flex items-center justify-between">
                Compass Conversions
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('compass') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('compass') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`TVMDC zinciri:
True = Magnetic + Variation
Magnetic = Compass + Deviation
Compass Error = Variation + Deviation

Cm = Ct − Var
Cc = Cm − Dev
Ct = Cc + Var + Dev

Kural: East (+), West (−)`}</pre>
                <div className="text-xs text-muted-foreground">Keep the deviation card and the annual change of variation up to date.</div>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('cpa')} className="cursor-pointer" aria-expanded={isOpen('cpa')}>
              <CardTitle id="cpa" className="scroll-mt-24 flex items-center justify-between">
                CPA / TCPA
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('cpa') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('cpa') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`tCPA = − (R · Vrel) / |Vrel|²
dCPA = |R + Vrel · tCPA|`}</pre>
                <div className="text-xs text-muted-foreground">tCPA (hours) → multiply by 60 for minutes</div>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('colreg')} className="cursor-pointer" aria-expanded={isOpen('colreg')}>
              <CardTitle id="colreg" className="scroll-mt-24 flex items-center justify-between">
                COLREG Maneuver
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('colreg') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('colreg') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Risk of collision:
The relative bearing stays constant and the range decreases → a risk exists

New CPA/TCPA (after the manoeuvre):
R' = R + V₁·t + V₂·t  (with the manoeuvre course/speed vectors)
tCPA' = −(R' · Vrel') / |Vrel'|²
dCPA' = |R' + Vrel' · tCPA'|

Guidance: after an avoiding manoeuvre the CPA should increase, the TCPA should lengthen and the relative bearing should change.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('distance')} className="cursor-pointer" aria-expanded={isOpen('distance')}>
              <CardTitle id="distance" className="scroll-mt-24 flex items-center justify-between">
                Distance Calculations
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('distance') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('distance') && (
          <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`1° of latitude = 60 NM (1' = 1 NM)
D.Lat (minutes) = 60 · Δφ
D.Long (minutes) = 60 · Δλ
Departure (nm) = D.Long · cosφ̄ = 60 · Δλ · cosφ̄
Distance (nm) ≈ √(D.Lat² + Departure²)

Geographical (horizon) range:
d = 2.08 · √h_m  (nm, h in metres)
or d = 1.17 · √h_ft (nm, h in feet)

Radar/VHF horizon (including refraction):
d = 2.23 · (√h₁ + √h₂)  (h in metres)

Light geographic range (USCG Light List):
d = 2.08 · (√h_observer + √h_light)  (h in metres)
Note: the luminous range depends on the nominal intensity of the light and the meteorological visibility.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('position')} className="cursor-pointer" aria-expanded={isOpen('position')}>
              <CardTitle id="position" className="scroll-mt-24 flex items-center justify-between">
                Location Detection
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('position') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('position') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`DR (dead reckoning):
Δφ = (d · cosC) / 60
Δλ = (d · sinC) / (60 · cosφ̄)
Lat₂ = Lat₁ + Δφ, Lon₂ = Lon₁ + Δλ

EP (estimated position):
Set/drift → vector addition: R_EP = R_DR + (c · t)

Running fix:
1) The first bearing is advanced by the DR run
2) Its intersection with the second bearing line = the fix

DMG/SMG:
DMG = Σ √(Δφ² + Δλ²) (nm)
SMG = DMG / Time Elapsed`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('bearings')} className="cursor-pointer" aria-expanded={isOpen('bearings')}>
              <CardTitle id="bearings" className="scroll-mt-24 flex items-center justify-between">
                Bearing Calculations
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('bearings') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('bearings') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Relative → true bearing:
BrgT = HeadingT + BrgR (normalised to 360°)
Compass → magnetic → true: Cc + Dev + Var = Ct

Two bearings:
The intersection of the lines = the fix; an angle of cut between 30° and 150° is preferred

Three bearings:
The most reliable line in the middle; check that the cocked hat is within ±5°

Transit / leading line:
Two marks in line → a safety line

Running fix (transferred bearing):
The first bearing is advanced by the time elapsed × the speed.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('turning')} className="cursor-pointer" aria-expanded={isOpen('turning')}>
              <CardTitle id="turning" className="scroll-mt-24 flex items-center justify-between">
                Turning Calculations
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('turning') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('turning') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Rate of turn (ROT):
ROT (°/min) = (30 × V(kn)) / R (turning radius, m)

Advance and transfer:
Advance ≈ V · t_align (the distance run until the course change is complete)
Transfer ≈ R × tan(ΔC / 2)

Wheel-over point:
WOP distance = transfer + a safety margin
WOP time = WOP / SOG

Turning circle:
Diameter ≈ 4-5 × the ship's length; in practice the values from the manoeuvring booklet are used.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('safety')} className="cursor-pointer" aria-expanded={isOpen('safety')}>
              <CardTitle id="safety" className="scroll-mt-24 flex items-center justify-between">
                Navigational Safety
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('safety') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('safety') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`UKC = CD + HoT − Draft − Squat
Squat (open water) ≈ (V(kn)²) / (100 · beam_m)
Safe speed: depends on the TSS/COG/SOG, the visibility and the manoeuvring distance
Safe passing distance: dCPA > 1-2 NM (according to the traffic situation)
Wheel-over distances: the values from the pilot card and the manoeuvring booklet
No-go area: CD + HoT − UKC_lim < 0 → prohibited area`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('passage')} className="cursor-pointer" aria-expanded={isOpen('passage')}>
              <CardTitle id="passage" className="scroll-mt-24 flex items-center justify-between">
                Passage Plan
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('passage') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('passage') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Total distance = Σ leg distances
Leg ETA = leg distance / SOG + leg ETD
Wheel-over point: WOP_time = (transfer + safety margin) / SOG
Abort point: t_abort = distance to a safe port / SOG
TSS transit: XTD ≤ limit, speed ≤ limit, VTS reporting
UKC check: HoT + CD − (Draft + Squat) ≥ the safety margin`}</pre>
              </div>
            </CardContent>
            )}
          </Card>
        </div>

        {/* 2. Real-time Information */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-primary px-1">2. Real-time Information</div>
          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('radar')} className="cursor-pointer" aria-expanded={isOpen('radar')}>
              <CardTitle id="radar" className="scroll-mt-24 flex items-center justify-between">
                Radar Calculations
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('radar') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('radar') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Radar range:
Rmax = 2.35 · (√h_radar + √h_target)

ARPA vectors:
True vector = relative + own ship
Ground track = √(Vₓ² + Vᵧ²)

Echo ranging:
R = (c · t) / 2
c = 3×10⁸ m/s (radar)
c = 1500 m/s (sonar)

Relative / true motion:
Vrel = Vtarget − Vown (vectorial)
Target course/speed = atan2(V_rel_y, V_rel_x), |Vrel|

Manual plot Δt:
Relative displacement / Δt → Vrel; verify the CPA/TCPA graphically.

Parallel index:
A constant range → a safe passage`}</pre>
              </div>
            </CardContent>
            )}
          </Card>
        </div>

        {/* 3. Meteorology and Environmental Factors */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-primary px-1">3. Meteorology and Environmental Factors</div>
          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('weather')} className="cursor-pointer" aria-expanded={isOpen('weather')}>
              <CardTitle id="weather" className="scroll-mt-24 flex items-center justify-between">
                Weather
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('weather') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('weather') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Beaufort scale:
V (knots) = 2 · √(B³)
B: Beaufort number

Wave height:
H₁/₃ = 0.025 · V² (unlimited fetch)

Leeway angle:
β = k · V_wind² / V_ship²
k ≈ 0.1-0.2 (a ship type factor)

Wind force:
F = 0.00338 · V² · A
A: windage area (m²)

Wind/current correction:
SOG = V · cos(CTS − TR) + c · cos(set − TR)
CTS = TR + arcsin((c/V) · sin(set − TR))`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('tides')} className="cursor-pointer" aria-expanded={isOpen('tides')}>
              <CardTitle id="tides" className="scroll-mt-24 flex items-center justify-between">
                Tide Calculations
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('tides') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('tides') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Rule of Twelfths:
1. saat: 1/12 · TR
2. saat: 2/12 · TR
3. saat: 3/12 · TR
4. saat: 3/12 · TR
5. saat: 2/12 · TR
6. saat: 1/12 · TR

Height of Tide:
H = Low + (Rule_of_Twelfths × TidalRange)
UKC = ChartedDepth + H − Draft − Squat

Harmonik Analiz:
h(t) = M + Σ[Aᵢ · cos(ωᵢt + φᵢ)]

Secondary Port:
H₂ = H₁ + Diff
T₂ = T₁ + TimeDiff

Kaynaklar: Admiralty Tide Tables, Tide/Stream Atlas, Tidal Curve.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>
        </div>

        {/* 4. Port and Aids to Navigation */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-primary px-1">4. Port and Aids to Navigation</div>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('pilotage')} className="cursor-pointer" aria-expanded={isOpen('pilotage')}>
              <CardTitle id="pilotage" className="scroll-mt-24 flex items-center justify-between">
                Coastal Navigation
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('pilotage') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('pilotage') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Clearing bearing:
Safe bearing > danger bearing

Danger angle:
α = arcsin(d / D)
d: the radius of the danger area
D: the distance from the vessel

Transit/range:
A line through two marks → a safe track

Sounding pattern:
3-4-3 metres → confirmation of the position

Distance on the chart:
Distance (nm) = scale length (cm) × the scale factor / 1.852e5
Lay the course with parallel rules and measure the distance with dividers
Track check: re-check after chart corrections and the T/P + NM bulletin`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('celestial')} className="cursor-pointer" aria-expanded={isOpen('celestial')}>
              <CardTitle id="celestial" className="scroll-mt-24 flex items-center justify-between">
                Celestial Navigation
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('celestial') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('celestial') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Meridian passage:
Lat = 90° − zenith distance ± Dec

Polaris:
Lat ≈ Ho + corrections

Amplitude:
A = arcsin(sinδ / cosφ)

Time sight:
Lon = GHA + LHA

 Lunar distance:
 Angular distance → longitude
 
Sun's bearing at sunrise/sunset:
Brg = arccos(−tanφ · tanδ)

Sources: the Nautical Almanac (GHA/Dec), the sextant corrections (IC, dip, refraction, parallax) and the sunrise/sunset tables.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('sight')} className="cursor-pointer" aria-expanded={isOpen('sight')}>
              <CardTitle id="sight" className="scroll-mt-24 flex items-center justify-between">
                Sight Reduction
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('sight') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('sight') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Calculated altitude (Hc):
sin(Hc) = sinφ · sinδ + cosφ · cosδ · cos(LHA)

Azimuth (Z):
cos(Z) = (sinδ − sinφ · sinHc) / (cosφ · cosHc)

 Intercept:
 a = Ho − Hc (toward/away)
 
LHA = GHA + Lon (W(−), E(+))

Tables: the HO-249/HO-229 sight reduction tables and Nautical Almanac data.`}</pre>
              </div>
            </CardContent>
            )}
          </Card>

          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('ecdis')} className="cursor-pointer" aria-expanded={isOpen('ecdis')}>
              <CardTitle id="ecdis" className="scroll-mt-24 flex items-center justify-between">
                ECDIS Controls
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('ecdis') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('ecdis') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`XTD ≤ limit (usually 0.5-1.0 NM)
Safety contour = max(chart datum + the UKC margin, the recommended value)
Safety depth = draft + squat + the UKC margin
Look-ahead time = t_look = the alarm distance / SOG
Route check: shallow contour, isolated dangers, currency of the ENC
BRM: anti-grounding alarm, cross-track alarm, ETA per leg`}</pre>
              </div>
            </CardContent>
            )}
          </Card>
        </div>

        {/* 5. Acil Durum */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-primary px-1">5. Emergency</div>
          <Card className="shadow">
            <CardHeader onClick={() => toggleSection('emergency')} className="cursor-pointer" aria-expanded={isOpen('emergency')}>
              <CardTitle id="emergency" className="scroll-mt-24 flex items-center justify-between">
                Emergency
                <ChevronDown className={"h-4 w-4 transition-transform " + (isOpen('emergency') ? "rotate-180" : "")} />
              </CardTitle>
            </CardHeader>
            {isOpen('emergency') && (
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Search Pattern:
Square Search: Leg = 2 × track_spacing
Sector Search: R₂ = R₁ × √2

Drift Calculation:
Total Drift = Leeway + Current
Track Made Good = Course ± Drift

Time to Rescue:
t = d / (Vrescue + Vdrift)

Emergency Position:
lat/lon → Degrees, Minutes, Seconds
Example: 41°05.25'N = 41° + 5.25/60

VHF Range:
d = 2.35 · (√h₁ + √h₂) nm`}</pre>
              </div>
            </CardContent>
            )}
          </Card>
        </div>

        <div className="flex justify-end">
          <Button asChild variant="default" className="gap-2">
            <a href="#gc">
              <Calculator className="h-4 w-4" /> Back to Top
            </a>
          </Button>
        </div>

        <Separator />
      </div>
    </MobileLayout>
  );
}
