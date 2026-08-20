import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { LessonImage } from "@/components/ui/LessonImage";

type Detail = {
  title: string;
  group: string;
  content: string;
  /**
   * A diagram showing the geometry of the formula. A formula says what is being
   * calculated but not what it looks like — the shape of the GZ curve, the effect
   * of a free surface or where the FWA sits on the load line mark are only
   * understood from a drawing.
   */
  image?: string;
  imageAlt?: string;
};

const details: Record<string, Detail> = {
  // 1. Introduction
  "giris": {
    title: "1. Introduction – Identifying Hogging and Sagging",
    group: "Sign in",
    content: `Hogging & Sagging Tespiti:
Hogging: (dF + dA)/2 > dM
Sagging: (dF + dA)/2 < dM`,
  },

  // 2. Transverse Equilibrium Calculations
  "moment-kg": {
    title: "2.1. Moment and KG Calculations",
    group: "Transverse Equilibrium Calculations",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "K, G, B and M on the midship section, and GM = KM − KG",
    content: `Total moment:
Moment = Weight × KG distance

New KG:
KG_new = Total moment / Total weight

GM calculation:
GM = KM − KG`,
  },
  "gm-shifting": {
    title: "2.2. GM Change from Shifting",
    group: "Transverse Equilibrium Calculations",
    image: "/diagrams/agirlik-merkezi.svg",
    imageAlt: "How the centre of gravity shifts when a weight is moved",
    content: `GM change:
ΔGM = (w × d) / Δ`,
  },
  "meyil-acisi": {
    title: "2.3. Heel Angle Calculation",
    group: "Transverse Equilibrium Calculations",
    image: "/diagrams/dogrultma-kolu.svg",
    imageAlt: "Righting lever GZ at an angle of heel",
    content: `Righting lever:
GZ = (w × y) / Δ

Heel angle:
	an(θ) = GZ / GM`,
  },
  "kreyn-gm": {
    title: "2.4. GM Change with a Derrick/Crane",
    group: "Transverse Equilibrium Calculations",
    image: "/diagrams/agirlik-merkezi.svg",
    imageAlt: "Weight lifted on a derrick acts at the head, raising G",
    content: `GM reduction:
GG₁ = (w × (h_head − h_load)) / Δ`,
  },
  "havuzlama-gm": {
    title: "2.5. Critical GM in Docking",
    group: "Transverse Equilibrium Calculations",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "Metacentric height, which the upthrust P reduces during docking",
    content: `P force:
P = (MCT × Trim (cm)) / l

GM change:
ΔGM = (P × KM) / Δ`,
  },

  // 3. Longitudinal Equilibrium Calculations
  "trim-degisimi": {
    title: "3.1. Trim Change",
    group: "Longitudinal Equilibrium Calculations",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Trim as the difference between forward and after draft",
    content: `Trim change:
ΔTrim = Total moment / MCT`,
  },
  "paralel-batma": {
    title: "3.2. Parallel Sinkage/Rise",
    group: "Longitudinal Equilibrium Calculations",
    image: "/diagrams/kaldirma-merkezi.svg",
    imageAlt: "Added weight increases displacement and sinks the ship bodily",
    content: `Paralel Batma (cm):
Batma = w / TPC`,
  },
  "draft-duzeltme": {
    title: "3.3. Forward/After Draft Correction",
    group: "Longitudinal Equilibrium Calculations",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Distributing the trim between the forward and after draft marks",
    content: `Forward/aft draft correction:
Correction = (Distance × Trim) / LBD`,
  },

  // 4. Draft Survey
  "mmm-draft": {
    title: "4.1. MMM Draft",
    group: "Draft survey",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Draft marks read on the ship's side for the mean of means",
    content: `MMM = (dF + dA + 6 × dM) / 8`,
  },
  "trim-duzeltmeleri": {
    title: "4.2. Trim Corrections",
    group: "Draft survey",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Trim and the position of LCF, on which both trim corrections depend",
    content: `First trim correction:
Δ₁ = (Trim × LCF × TPC × 100) / LBP

Second trim correction:
Δ₂ = (Trim² × ΔMCT × 50) / LBP`,
  },
  "yogunluk-duzeltmesi": {
    title: "4.3. Density Correction",
    group: "Draft survey",
    image: "/diagrams/kaldirma-merkezi.svg",
    imageAlt: "Buoyancy and displacement, which change with water density",
    content: `Δρ = ((ρ / 1.025) − 1) × Δ`,
  },

  // 5. Other Calculations
  "duba-tank-hacim": {
    title: "5.1. Barge/Tank Volume Calculations",
    group: "Other Calculations",
    content: `Volume:
V = Length × Breadth × Height

Mass:
m = V × ρ`,
  },
  "blok-katsayisi": {
    title: "5.2. Block Coefficient",
    group: "Other Calculations",
    image: "/diagrams/seamanship/gemi-kisimlari.svg",
    imageAlt: "Hull form: the block coefficient compares the underwater volume with its enclosing box",
    content: `Cb = ∇ / (L × B × T)`,
  },
  "fwa-yogunluk": {
    title: "5.3. Density Difference and FWA",
    group: "Other Calculations",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Fresh water allowance shown on the load line mark",
    content: `FWA:
FWA = Δ / (4 × TPC)

Draft change:
ΔT = (FWA × (1025 − ρ)) / 25`,
  },

  // 6. SOLAS Stabilite Kriterleri
  "kumelenme-acisi": {
    title: "6.1. Grain Heeling Angle",
    group: "SOLAS Stabilite Kriterleri",
    content: `θ = (57.3 × GHM) / (Δ × GM)`,
  },
  "gz-kn": {
    title: "6.2. Righting Lever (KN Curves)",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/gz-egrisi.svg",
    imageAlt: "Curve of statical stability: GZ against angle of heel",
    content: `GZ = KN − KG · sin(θ)`,
  },
  "simpson-alan": {
    title: "6.3. Area Calculation by Simpson's Rule",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/gz-egrisi.svg",
    imageAlt: "Area under the GZ curve, which Simpson's rule integrates",
    content: `Simpson's 1/3 rule:
A = (h/3) · (y0 + 4y1 + 2y2 + ··· + yn)

Simpson's 3/8 rule:
A = (3h/8) · (y0 + 3y1 + 3y2 + y3)`,
  },
  "fsm": {
    title: "6.4. Free Surface Moment (FSM)",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/serbest-yuzey.svg",
    imageAlt: "Free surface in a slack tank and the virtual rise of G",
    content: `GG₁ = (L × B³) / (12 × V) × (ρ_liquid / ρ_sea) × (1 / n²)`,
  },
  "yalpa-periyodu": {
    title: "6.5. Roll Period",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "Rolling period is governed by GM — a stiff ship rolls quickly",
    content: `T = (Cb × B) / √(GM)`,
  },
  "yarali-stabilite": {
    title: "6.6. Damage Stability",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/yara-stabilitesi.svg",
    imageAlt: "Bilging a compartment: lost buoyancy and the resulting sinkage",
    content: `ΔT = w / ((L × B) − (L_damaged × B))`,
  },

  // 7. Cargo Calculations
  "musade-yuk": {
    title: "7.1. Permissible Load",
    group: "Cargo Calculations",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Load line marks setting the maximum permissible draft",
    content: `Maximum load height:
h_max = SF × PL

Maximum load quantity:
w_max = V_hold / SF`,
  },
  "sicaklik-yogunluk": {
    title: "7.2. Density Change with Temperature",
    group: "Cargo Calculations",
    image: "/diagrams/kaldirma-merkezi.svg",
    imageAlt: "Density change alters the buoyancy the ship gets from the water",
    content: `ρ₂ = ρ₁ − ((T₂ − T₁) × k)`,
  },
};

export default function StabilityFormulaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const detail = (id && details[id]) || null;

  return (
    <MobileLayout>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Stability Formulas
        </div>

        {!detail ? (
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Page not found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Invalid section identifier.</div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow">
            <CardHeader>
              <div className="text-xs text-primary">{detail.group}</div>
              <CardTitle className="scroll-mt-24">{detail.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded p-3 overflow-x-auto">
                <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{detail.content}</pre>
              </div>

              {detail.image && (
                <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40 bg-white">
                  <LessonImage
                    src={detail.image}
                    alt={detail.imageAlt ?? detail.title}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
}
