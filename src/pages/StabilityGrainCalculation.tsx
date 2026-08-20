import { Anchor, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function StabilityGrainCalculationPage() {

  // 1. Stowage Factor Calculations
  const [volume, setVolume] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [stowageFactor, setStowageFactor] = useState<number>(1.35); // m³/ton - typical for grain
  
  // 2. Broken Stowage
  const [holdVolume, setHoldVolume] = useState<number>(0);
  const [brokenStowage, setBrokenStowage] = useState<number>(0); // % - usually 0 for grain
  
  // 3. Loadable Cargo
  const [displacement, setDisplacement] = useState<number>(0);
  const [lightship, setLightship] = useState<number>(0);
  const [constant, setConstant] = useState<number>(0);
  const [fuel, setFuel] = useState<number>(0);
  const [freshWater, setFreshWater] = useState<number>(0);
  const [stores, setStores] = useState<number>(0);
  
  // 4. Draft Calculations
  const [tpi, setTpi] = useState<number>(0); // Tonnes per inch immersion
  const [mt1, setMt1] = useState<number>(0); // Moment to change trim 1 cm
  const [draftChange, setDraftChange] = useState<number>(0);
  
  // 5. Grain Heeling Moment
  const [shiftVolume, setShiftVolume] = useState<number>(0);
  const [deltaKG, setDeltaKG] = useState<number>(0);
  const [grainDensity, setGrainDensity] = useState<number>(0.8); // ton/m³
  
  // 6. Stability Parameters
  const [gm, setGm] = useState<number>(0);
  const [kg, setKg] = useState<number>(0);
  const [km, setKm] = useState<number>(0);
  
  // 7. FSM for Grain
  const [fsmShiftArea, setFsmShiftArea] = useState<number>(0);
  const [fsmArm, setFsmArm] = useState<number>(0);

  // Calculate Stowage Factor
  const calculateSF = () => {
    if (volume && weight) {
      return (volume / weight).toFixed(3);
    }
    return null;
  };

  // Calculate Required Volume
  const calculateRequiredVolume = () => {
    if (weight && stowageFactor) {
      return (weight * stowageFactor).toFixed(2);
    }
    return null;
  };

  // Calculate Maximum Weight
  const calculateMaxWeight = () => {
    if (volume && stowageFactor) {
      return (volume / stowageFactor).toFixed(2);
    }
    return null;
  };

  // Calculate Usable Volume (with Broken Stowage)
  const calculateUsableVolume = () => {
    if (holdVolume) {
      const bs = brokenStowage / 100;
      return (holdVolume * (1 - bs)).toFixed(2);
    }
    return null;
  };

  // Calculate Loadable Cargo
  const calculateLoadableCargo = () => {
    if (displacement) {
      const deadweight = displacement - lightship;
      const loadable = deadweight - (constant + fuel + freshWater + stores);
      return {
        deadweight: deadweight.toFixed(2),
        loadable: loadable.toFixed(2)
      };
    }
    return null;
  };

  // Calculate Draft Change Weight
  const calculateDraftWeight = () => {
    if (tpi && draftChange) {
      // TPI is in tonnes per inch, convert draft change to inches if needed
      const deltaW = tpi * draftChange;
      return deltaW.toFixed(2);
    }
    return null;
  };

  // Calculate Moment Change for Trim
  const calculateTrimMoment = () => {
    if (mt1 && draftChange) {
      const deltaM = mt1 * (draftChange / 1);
      return deltaM.toFixed(2);
    }
    return null;
  };

  // Calculate Grain Heeling Moment (GHM)
  const calculateGHM = () => {
    if (shiftVolume && deltaKG && grainDensity) {
      const ghm = shiftVolume * deltaKG * grainDensity;
      return ghm.toFixed(2);
    }
    return null;
  };

  // Calculate Heeling Angle
  const calculateHeelingAngle = () => {
    const ghm = calculateGHM();
    if (ghm && displacement && gm) {
      const tanTheta = parseFloat(ghm) / (displacement * gm);
      const theta = Math.atan(tanTheta) * (180 / Math.PI);
      return theta.toFixed(2);
    }
    return null;
  };

  // Calculate FSM for Grain
  const calculateFSM = () => {
    if (fsmShiftArea && fsmArm && grainDensity) {
      const fsm = grainDensity * fsmShiftArea * fsmArm;
      return fsm.toFixed(2);
    }
    return null;
  };

  // Calculate Corrected GM
  const calculateCorrectedGM = () => {
    const fsm = calculateFSM();
    if (gm && fsm && displacement) {
      const gmCorrected = gm - (parseFloat(fsm) / displacement);
      return gmCorrected.toFixed(3);
    }
    return null;
  };

  // IMO Grain Stability Criteria Check
  const checkIMOCriteria = () => {
    const correctedGM = calculateCorrectedGM();
    const heelingAngle = calculateHeelingAngle();
    
    const criteria = {
      gmPass: correctedGM ? parseFloat(correctedGM) >= 0.30 : false,
      anglePass: heelingAngle ? parseFloat(heelingAngle) <= 12 : false,
      gmValue: correctedGM,
      angleValue: heelingAngle
    };
    
    return criteria;
  };

  const sfResult = calculateSF();
  const reqVolume = calculateRequiredVolume();
  const maxWeight = calculateMaxWeight();
  const usableVolume = calculateUsableVolume();
  const loadableResult = calculateLoadableCargo();
  const draftWeight = calculateDraftWeight();
  const trimMoment = calculateTrimMoment();
  const ghm = calculateGHM();
  const heelingAngle = calculateHeelingAngle();
  const fsm = calculateFSM();
  const correctedGM = calculateCorrectedGM();
  const imoCriteria = checkIMOCriteria();

  const quickStats = [
    {
      id: "sf",
      label: "Stowage Factor",
      value: sfResult ? `${sfResult} m³/ton` : "—",
      helper: "V / W",
      status: null
    },
    {
      id: "cargo",
      label: "Loadable Grain",
      value: loadableResult ? `${loadableResult.loadable} ton` : "—",
      helper: "Δ - (Lightship + consumables)",
      status: null
    },
    {
      id: "heel",
      label: "Angle of heel",
      value: heelingAngle ? `${heelingAngle}°` : "—",
      helper: "IMO limiti ≤ 12°",
      status: heelingAngle ? parseFloat(heelingAngle) <= 12 : null
    },
    {
      id: "gm",
      label: "Adjusted GM",
      value: correctedGM ? `${correctedGM} m` : "—",
      helper: "IMO limiti ≥ 0.30 m",
      status: correctedGM ? parseFloat(correctedGM) >= 0.30 : null
    }
  ];

  const imoIsCompliant = imoCriteria.gmPass && imoCriteria.anglePass;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Anchor className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Grain Stability Calculations (IMO Grain Code)</CardTitle>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="secondary" className="bg-blue-50 text-blue-800 hover:bg-blue-50">
                  IMO Grain Code
                </Badge>
                <Badge variant="outline" className="border-dashed">
                  5 main calculation modules
                </Badge>
                <Badge className={imoIsCompliant ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}>
                  {imoIsCompliant ? "Stability Suitable" : "Improvement Required"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                As you enter load information, the indicators and tabs below are instantly updated.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {quickStats.map((stat) => (
                  <div key={stat.id} className="rounded-lg border border-border/60 bg-background/70 p-3">
                    <p className="text-xs font-medium uppercase text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.helper}</p>
                    {stat.status !== undefined && stat.status !== null && (
                      <Badge
                        variant="secondary"
                        className={`mt-2 w-fit ${stat.status ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}`}
                      >
                        {stat.status ? "Compliant" : "Risky"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-muted/30 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-lg bg-background p-3 shadow-sm">
                <p className="font-semibold text-foreground">1. Shipping information</p>
                <p>Confirm the stowage factor, density and broken stowage values.</p>
              </div>
              <div className="rounded-lg bg-background p-3 shadow-sm">
                <p className="font-semibold text-foreground">2. Ship condition</p>
                <p>Keep lightship, displacement, ballast and consumption items up to date.</p>
              </div>
              <div className="rounded-lg bg-background p-3 shadow-sm">
                <p className="font-semibold text-foreground">3. IMO criteria</p>
                <p>Keep GHM and FSM tables with you and cross-check the results.</p>
              </div>
              <div className="rounded-lg border border-dashed border-border/70 bg-background/80 p-3 text-xs text-muted-foreground">
                Bu rehber, gerçek yükleme bilgisayarının yerini tutmaz; tüm hesapları resmi kayıtlarla doğrulayın.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-border/70 shadow-lg">
        <CardHeader>
          <CardTitle>Detailed Calculation Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
                {/* Tab 1: Stowage Factor */}
                <section id="grain-stowage" className="scroll-mt-28 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">1️⃣ Stowage Factor (SF)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Load Volume (m³)</Label>
                          <Input
                            type="number"
                            value={volume || ""}
                            onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
                            placeholder="Example: 1000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Load Weight (ton)</Label>
                          <Input
                            type="number"
                            value={weight || ""}
                            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                            placeholder="Example: 740"
                          />
                        </div>
                      </div>

                      {sfResult && (
                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-semibold">SF = V / W</p>
                              <p className="text-lg font-bold text-blue-700">
                                Stowage Factor = {sfResult} m³/ton
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">2️⃣ Required Volume Calculation</h4>
                        <div className="space-y-2">
                          <Label>Stowage Factor (m³/ton)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={stowageFactor || ""}
                            onChange={(e) => setStowageFactor(parseFloat(e.target.value) || 0)}
                            placeholder="Typical: 1.35"
                          />
                          <p className="text-xs text-muted-foreground">
                            Typical values: Wheat 1.25-1.35, Corn 1.40-1.50, Barley 1.45-1.55 m³/ton
                          </p>
                        </div>

                        {reqVolume && (
                          <Alert className="bg-green-50 border-green-200">
                            <AlertDescription>
                              <p className="font-semibold">V = W × SF</p>
                              <p className="text-lg font-bold text-green-700">
                                Gereken Hacim = {reqVolume} m³
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">3️⃣ Maximum Amount of Grain</h4>
                        {maxWeight && (
                          <Alert className="bg-purple-50 border-purple-200">
                            <AlertDescription>
                              <p className="font-semibold">W = V / SF</p>
                              <p className="text-lg font-bold text-purple-700">
                                Maximum Load = {maxWeight} ton
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">4️⃣ Broken Stowage – Lost Volume</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Cargo hold Volume (m³)</Label>
                            <Input
                              type="number"
                              value={holdVolume || ""}
                              onChange={(e) => setHoldVolume(parseFloat(e.target.value) || 0)}
                              placeholder="Example: 10000"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Broken Stowage (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={brokenStowage || ""}
                              onChange={(e) => setBrokenStowage(parseFloat(e.target.value) || 0)}
                              placeholder="Usually 0% for grain"
                            />
                          </div>
                        </div>

                        {usableVolume && (
                          <Alert className="bg-amber-50 border-amber-200">
                            <AlertDescription>
                              <p className="font-semibold">Kullanılabilir Hacim = Ambar Hacmi × (1 - BS)</p>
                              <p className="text-lg font-bold text-amber-700">
                                Usable Volume = {usableVolume} m³
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Tab 2: Cargo Capacity */}
                <section id="grain-cargo" className="scroll-mt-28 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">5️⃣ Load Capacity Calculations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Displacement (tonne)</Label>
                          <Input
                            type="number"
                            value={displacement || ""}
                            onChange={(e) => setDisplacement(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Lightship (ton)</Label>
                          <Input
                            type="number"
                            value={lightship || ""}
                            onChange={(e) => setLightship(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Constant (ton)</Label>
                          <Input
                            type="number"
                            value={constant || ""}
                            onChange={(e) => setConstant(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fuel (ton)</Label>
                          <Input
                            type="number"
                            value={fuel || ""}
                            onChange={(e) => setFuel(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fresh Water (ton)</Label>
                          <Input
                            type="number"
                            value={freshWater || ""}
                            onChange={(e) => setFreshWater(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stores (tons)</Label>
                          <Input
                            type="number"
                            value={stores || ""}
                            onChange={(e) => setStores(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      {loadableResult && (
                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertDescription>
                            <div className="space-y-2">
                              <p className="font-semibold">
                                Loadable Cargo = Displacement - (Lightship + Constant + Fuel + FW + Stores)
                              </p>
                              <p className="text-sm">Deadweight = {loadableResult.deadweight} ton</p>
                              <p className="text-lg font-bold text-blue-700">
                                Loadable Cargo = {loadableResult.loadable} ton
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">Draft/Trim Effect</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>TPI (ton/inch)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={tpi || ""}
                              onChange={(e) => setTpi(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>MT1 (ton·m/cm)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={mt1 || ""}
                              onChange={(e) => setMt1(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Draft Change (inch/cm)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={draftChange || ""}
                              onChange={(e) => setDraftChange(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {draftWeight && (
                            <Alert>
                              <AlertDescription>
                                <p className="font-semibold text-xs">ΔW = TPI × ΔT</p>
                                <p className="font-bold">Weight Change = {draftWeight} ton</p>
                              </AlertDescription>
                            </Alert>
                          )}
                          {trimMoment && (
                            <Alert>
                              <AlertDescription>
                                <p className="font-semibold text-xs">ΔM = MT1 × (ΔT / 1m)</p>
                                <p className="font-bold">Trim Momenti = {trimMoment} ton·m</p>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Tab 3: Heeling Moment */}
                <section id="grain-heeling" className="scroll-mt-28 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">6️⃣ Grain Heeling Moment (GHM)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Shift Volume (m³)</Label>
                          <Input
                            type="number"
                            value={shiftVolume || ""}
                            onChange={(e) => setShiftVolume(parseFloat(e.target.value) || 0)}
                            placeholder="From IMO table"
                          />
                          <p className="text-xs text-muted-foreground">IMO Grain Code is taken from the shift volumes table</p>
                        </div>
                        <div className="space-y-2">
                          <Label>ΔKG (m)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={deltaKG || ""}
                            onChange={(e) => setDeltaKG(parseFloat(e.target.value) || 0)}
                            placeholder="KG increase as a result of slipping"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Grain Density (ton/m³)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={grainDensity || ""}
                            onChange={(e) => setGrainDensity(parseFloat(e.target.value) || 0)}
                            placeholder="Typical: 0.8"
                          />
                        </div>
                      </div>

                      {ghm && (
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertDescription>
                            <p className="font-semibold">GHM = Vol × ΔKG × ρ</p>
                            <p className="text-lg font-bold text-orange-700">
                              Grain Heeling Moment = {ghm} ton·m
                            </p>
                          </AlertDescription>
                        </Alert>
                      )}

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">7️⃣ Heeling Angle</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>GM (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={gm || ""}
                              onChange={(e) => setGm(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Displacement (tonne)</Label>
                            <Input
                              type="number"
                              value={displacement || ""}
                              onChange={(e) => setDisplacement(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>

                        {heelingAngle && (
                          <Alert className={parseFloat(heelingAngle) <= 12 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                            <AlertDescription>
                              <p className="font-semibold">tan(θ) = GHM / (Δ × GM)</p>
                              <p className="text-lg font-bold" style={{ color: parseFloat(heelingAngle) <= 12 ? '#15803d' : '#991b1b' }}>
                                Heel Angle (θ) = {heelingAngle}°
                              </p>
                              <p className="text-sm mt-2">
                                {parseFloat(heelingAngle) <= 12 ? (
                                  <span className="text-green-700">✓ Within the IMO limit (≤ 12°)</span>
                                ) : (
                                  <span className="text-red-700">✗ IMO limitini aşıyor (&gt; 12°)</span>
                                )}
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Tab 4: Stability */}
                <section id="grain-stability" className="scroll-mt-28 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">8️⃣ FSM (Free Surface Moment) – For Grain</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Grain does not give a completely free surface like liquid. FSM is generally read from the IMO Grain Code table.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Shift Area (m²)</Label>
                          <Input
                            type="number"
                            value={fsmShiftArea || ""}
                            onChange={(e) => setFsmShiftArea(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Arm (m)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={fsmArm || ""}
                            onChange={(e) => setFsmArm(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Density (ton/m³)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={grainDensity || ""}
                            onChange={(e) => setGrainDensity(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      {fsm && (
                        <Alert className="bg-purple-50 border-purple-200">
                          <AlertDescription>
                            <p className="font-semibold">FSM = ρ × shift area × arm</p>
                            <p className="text-lg font-bold text-purple-700">
                              Free Surface Moment = {fsm} ton·m
                            </p>
                          </AlertDescription>
                        </Alert>
                      )}

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">Corrected GM</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>KG (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={kg || ""}
                              onChange={(e) => setKg(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>KM (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={km || ""}
                              onChange={(e) => setKm(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>GM (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={gm || ""}
                              onChange={(e) => setGm(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>

                        {correctedGM && (
                          <Alert className={parseFloat(correctedGM) >= 0.30 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                            <AlertDescription>
                              <p className="font-semibold">GMcorrected = GM - (FSM / Δ)</p>
                              <p className="text-lg font-bold" style={{ color: parseFloat(correctedGM) >= 0.30 ? '#15803d' : '#991b1b' }}>
                                Corrected GM = {correctedGM} m
                              </p>
                              <p className="text-sm mt-2">
                                {parseFloat(correctedGM) >= 0.30 ? (
                                  <span className="text-green-700">✓ Above IMO minimum value (≥ 0.30 m)</span>
                                ) : (
                                  <span className="text-red-700">✗ IMO minimum değerinin altında (&lt; 0.30 m)</span>
                                )}
                              </p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Tab 5: IMO Criteria */}
                <section id="grain-criteria" className="scroll-mt-28 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">9️⃣ IMO Grain Stability Criterion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <p className="font-semibold mb-2">IMO Grain Code Criteria:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Initial GM corrected ≥ 0.30 m</li>
                            <li>• Angle of heel ≤ 12°</li>
                            <li>• Area under GZ curve ≥ 0.075 m·rad (total area)</li>
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Stability Check Results</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className={imoCriteria.gmPass ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-3">
                                {imoCriteria.gmPass ? (
                                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                                ) : (
                                  <XCircle className="h-8 w-8 text-red-600" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">GM Corrected</p>
                                  <p className="text-2xl font-bold">
                                    {imoCriteria.gmValue || "—"} m
                                  </p>
                                  <p className="text-xs mt-1">
                                    {imoCriteria.gmPass ? "✓ ≥ 0.30m" : "✗ < 0.30 m"}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className={imoCriteria.anglePass ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-3">
                                {imoCriteria.anglePass ? (
                                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                                ) : (
                                  <XCircle className="h-8 w-8 text-red-600" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Heeling Angle</p>
                                  <p className="text-2xl font-bold">
                                    {imoCriteria.angleValue || "—"}°
                                  </p>
                                  <p className="text-xs mt-1">
                                    {imoCriteria.anglePass ? "✓ ≤ 12°" : "✗ > 12°"}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Alert className={imoIsCompliant ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}>
                          <AlertDescription>
                            <div className="flex items-center gap-3">
                              {imoIsCompliant ? (
                                <>
                                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                                  <div>
                                    <p className="font-bold text-green-700 text-lg">Stability Suitable</p>
                                    <p className="text-sm text-green-600">The ship meets IMO Grain Code criteria</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-6 w-6 text-red-600" />
                                  <div>
                                    <p className="font-bold text-red-700 text-lg">Stability Unsuitable</p>
                                    <p className="text-sm text-red-600">
                                      {!imoCriteria.gmPass && "GM is low."}
                                      {!imoCriteria.anglePass && "The lean angle is high."}
                                      Ballast adjustment may be required.
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </AlertDescription>
                        </Alert>

                        <div className="p-4 bg-muted rounded-lg">
                          <h5 className="font-semibold mb-2 text-sm">Suggestions</h5>
                          <ul className="space-y-1 text-xs">
                            <li>• Verify all parameters before grain loading</li>
                            <li>• Check shift volumes values from IMO Grain Code table</li>
                            <li>• Gerekirse ballast suyu ile GM'i artırın</li>
                            <li>• Use a separator between cargo hold compartments</li>
                            <li>• Cross-check with the loading computer</li>
                            <li>• Constantly monitor heel angle during loading</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
        </CardContent>
      </Card>
    </div>
  );
}
