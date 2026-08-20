import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, Sigma } from "lucide-react";

export default function StabilityFormulasPage() {

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Formula Guide
        </div>

        {/* Contents – a separate page button for each section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sigma className="h-5 w-5" /> Stability Formulas – Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 1. Introduction */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">1. Introduction</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/giris"><Button variant="outline" size="sm">Sign in</Button></Link>
                </div>
              </div>

              {/* 2. Transverse Equilibrium Calculations */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">2. Transverse Balance Calculations</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/moment-kg"><Button variant="outline" size="sm">2.1 Torque and KG</Button></Link>
                  <Link to="/stability/formulas/gm-shifting"><Button variant="outline" size="sm">2.2 GM with Shifting</Button></Link>
                  <Link to="/stability/formulas/meyil-acisi"><Button variant="outline" size="sm">2.3 Heel Angle</Button></Link>
                  <Link to="/stability/formulas/kreyn-gm"><Button variant="outline" size="sm">2.4 GM with boom/crane</Button></Link>
                  <Link to="/stability/formulas/havuzlama-gm"><Button variant="outline" size="sm">2.5 Critical GM in Pooling</Button></Link>
                </div>
              </div>

              {/* 3. Longitudinal Equilibrium Calculations */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">3. Longitudinal Balance Calculations</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/trim-degisimi"><Button variant="outline" size="sm">3.1 Trim Change</Button></Link>
                  <Link to="/stability/formulas/paralel-batma"><Button variant="outline" size="sm">3.2 Parallel Sinkage/Rise</Button></Link>
                  <Link to="/stability/formulas/draft-duzeltme"><Button variant="outline" size="sm">3.3 Draft Corrections</Button></Link>
                </div>
              </div>

              {/* 4. Draft Survey */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">4. Draft Survey</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/mmm-draft"><Button variant="outline" size="sm">4.1 MMM Draft</Button></Link>
                  <Link to="/stability/formulas/trim-duzeltmeleri"><Button variant="outline" size="sm">4.2 Trim Corrections</Button></Link>
                  <Link to="/stability/formulas/yogunluk-duzeltmesi"><Button variant="outline" size="sm">4.3 Density Correction</Button></Link>
                </div>
              </div>

              {/* 5. Other Calculations */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">5. Other Calculations</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/duba-tank-hacim"><Button variant="outline" size="sm">5.1 Pontoon/Tank Volume</Button></Link>
                  <Link to="/stability/formulas/blok-katsayisi"><Button variant="outline" size="sm">5.2 Block Coefficient</Button></Link>
                  <Link to="/stability/formulas/fwa-yogunluk"><Button variant="outline" size="sm">5.3 Density Difference and FWA</Button></Link>
                </div>
              </div>

              {/* 6. SOLAS Stabilite Kriterleri */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">6. SOLAS Stability Criteria</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/kumelenme-acisi"><Button variant="outline" size="sm">6.1 Grain Heeling Angle</Button></Link>
                  <Link to="/stability/formulas/gz-kn"><Button variant="outline" size="sm">6.2 GZ Arm (KN)</Button></Link>
                  <Link to="/stability/formulas/simpson-alan"><Button variant="outline" size="sm">6.3 Simpson Field</Button></Link>
                  <Link to="/stability/formulas/fsm"><Button variant="outline" size="sm">6.4FSM</Button></Link>
                  <Link to="/stability/formulas/yalpa-periyodu"><Button variant="outline" size="sm">6.5 Roll Period</Button></Link>
                  <Link to="/stability/formulas/yarali-stabilite"><Button variant="outline" size="sm">6.6 Damage Stability</Button></Link>
                </div>
              </div>

              {/* 7. Cargo Calculations */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">7. Load Calculations</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/musade-yuk"><Button variant="outline" size="sm">7.1 Permissible Load</Button></Link>
                  <Link to="/stability/formulas/sicaklik-yogunluk"><Button variant="outline" size="sm">7.2 Density with Temperature</Button></Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="temel" className="scroll-mt-24">Basic Definitions and Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-muted rounded">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2">Term</th>
                    <th className="p-2">Symbol</th>
                    <th className="p-2">Definition / Formula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">Displacement</td>
                    <td className="p-2">Δ</td>
                    <td className="p-2 font-mono">Δ = ρ · ∇</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Density</td>
                    <td className="p-2">ρ</td>
                    <td className="p-2">Sea water: 1.025 t/m³, fresh water: 1.000 t/m³</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Draft (mean)</td>
                    <td className="p-2">T</td>
                    <td className="p-2 font-mono">T = (Tf + Ta)/2</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Trim</td>
                    <td className="p-2">—</td>
                    <td className="p-2 font-mono">Trim = Ta − Tf</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">MCT 1cm</td>
                    <td className="p-2">—</td>
                    <td className="p-2 font-mono">MCT<sub>1cm</sub> ≈ (Δ · GM<sub>L</sub> / L) · 0.01 ≈ (ρ · I<sub>TL</sub> / L) · 0.01 (or from the stability booklet)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Tons per cm Immersion</td>
                    <td className="p-2">TPC</td>
                    <td className="p-2 font-mono">TPC = ρ · A<sub>w</sub> / 100 (A<sub>w</sub>: the waterplane area)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="yuzerlik" className="scroll-mt-24">Buoyancy and Metacentric Height</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`KB ≈ T · (0.53 + 0.085·CB)   (an approximation; otherwise from the tables)
BMT = IT / ∇
KMT = KB + BMT
GMT = KMT − KG
Small angles:   GZ(φ) ≈ GMT · sin φ
General:        GZ(φ) = KN(φ) − KG · sin φ`}</pre>
            </div>
            <p>I<sub>T</sub>: the transverse moment of inertia of the waterplane area; KN(φ): from the hydrostatic tables.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="agirlik" className="scroll-mt-24">Weight Transfers and KG Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`New KG (weight loaded):     KG' = (Δ·KG + w·KGw)/(Δ + w)
New KG (weight discharged): KG' = (Δ·KG − w·KGw)/(Δ − w)
Vertical shift:             ΔKG = (w · h)/Δ   (upwards +)
Transverse shift (heel):    tan φ ≈ (w · y)/(Δ · GMT)
Longitudinal shift (trim):  Trim(cm) = (w · l)/MCT 1 cm`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="trim" className="scroll-mt-24">Trim Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Trim change (cm):        Trim = Mt / MCT 1 cm
Trimming moment:         Mt = Δ·(LCG − LCB)  (or w·l)
Forward draft change:    ΔTf = −Trim · (LCF→FP)/L
Aft draft change:        ΔTa =  Trim · (LCF→AP)/L
Mean draft change:       ΔTmean(cm) = w / TPC`}</pre>
            </div>
            <p>The signs are referred to the LCF; the distances are projections on the longitudinal axis.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="free-surface" className="scroll-mt-24">Free Surface Effect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`FSM = ρ_tank · If
FSC = FSM / Δ = (ρ_tank/ρ_sea) · (If/∇)
Fluid GM = GM − ΣFSC
If (rectangular) = l · b³ / 12`}</pre>
            </div>
            <p>When there is more than one slack tank, the corrections are summed.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="heel-gz" className="scroll-mt-24">Heel and the GZ Curve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Righting moment:      RM(φ) = Δ · GZ(φ)
Heeling moment (e.g.): Mh = w·y  or  Mh = F·z
Static equilibrium:   RM(φeq) = Mh(φeq)  ⇔  GZ(φeq) = ah(φeq)
GZ (large angles):    GZ(φ) = KN(φ) − KG · sin φ  (KN from the tables)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="curves" className="scroll-mt-24">Static Stability Curves</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Area under the GZ curve: A(θ) = ∫[0, θ] GZ(φ) dφ   [m·rad]
Dynamical stability:     Δ · A(θ)                   [tonne·m·rad]
Angle of maximum GZ:     θmax (usually 30°–40°)
AVS:                     φAVS such that GZ(φAVS) = 0`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="loading" className="scroll-mt-24">Loading, Ballast and Equilibrium Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Trim correction (LCG ≠ LCB): Trim(cm) = Δ·(LCG − LCB)/MCT 1 cm
Draft distribution about the LCF: ΔTf = −Trim · (LCF→FP)/L;  ΔTa = Trim · (LCF→AP)/L
KG correction (transfer):    KG' = KG ± (w·h)/Δ   →   GM' = KM − KG'`}</pre>
            </div>
            <p>The LCF, LCB and MCT values must be taken from the approved hydrostatic/stability booklet.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="grain" className="scroll-mt-24">Grain and Free-flowing Cargo Stability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Grain heeling moment: Mg = GSM  (from the Grain Code)
Minimum GM (summary): fluid GM ≥ GM_min under the SOLAS/Grain Code requirements
Heeling correction:   the angle of equilibrium is found from GZ(φ) = ah,grain(φ)`}</pre>
            </div>
            <p>The grain shifting moments (GSM) and the criteria are given in the <em>International Grain Code</em>.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="freeboard" className="scroll-mt-24">Freeboard, Draft and Trim Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Mean draft:            Tmean = (Tf + Ta)/2
Displacement change:   Δfinal = Δinitial ± Σw
Final displacement:    Δfinal (for the density, ∇ = Δ/ρ)
Tonne-mile moment:     TM = w · distance (nautical miles)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="denge" className="scroll-mt-24">Static and Dynamic Equilibrium Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Stable equilibrium:   RM(φ) = Mh(φ)  and  GM > 0 (small angles)
Neutral equilibrium:  GM = 0  and  GZ ≈ 0 (small angles)
Unstable equilibrium: GM < 0  and  GZ < 0 (small angles)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="ek" className="scroll-mt-24">Useful Additional Formulas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Moment of inertia of a rectangular surface: I = l · b³ / 12
Waterplane area (approximation):            Aw = LWL · BWL · CW
Block coefficient:                          CB = ∇/(L · B · T)
Volume of displacement:                     ∇ = Δ/ρ`}</pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild variant="default" className="gap-2">
            <a href="#temel">
              <Calculator className="h-4 w-4" /> Back to Top
            </a>
          </Button>
        </div>

        {/** Underline removed */}
      </div>
    </MobileLayout>
  );
}

