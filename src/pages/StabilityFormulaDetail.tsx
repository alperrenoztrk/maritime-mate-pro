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
   * Formülün geometrisini gösteren diyagram. Bir formül neyin hesaplandığını
   * söyler ama neye benzediğini söylemez — GZ eğrisinin şekli, serbest yüzeyin
   * etkisi veya FWA'nın load line markası üzerindeki yeri ancak çizimle anlaşılır.
   */
  image?: string;
  imageAlt?: string;
};

const details: Record<string, Detail> = {
  // 1. Giriş
  "giris": {
    title: "1. Giriş – Hogging & Sagging Tespiti",
    group: "Sign in",
    content: `Hogging & Sagging Tespiti:
Hogging: (dF + dA)/2 > dM
Sagging: (dF + dA)/2 < dM`,
  },

  // 2. Enine Denge Hesapları
  "moment-kg": {
    title: "2.1. Moment ve KG Hesapları",
    group: "Enine Denge Hesapları",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "K, G, B and M on the midship section, and GM = KM − KG",
    content: `Toplam Moment:
Moment = Ağırlık × KG Mesafesi

Yeni KG:
KGyeni = Toplam Moment / Toplam Ağırlık

GM Hesaplama:
GM = KM − KG`,
  },
  "gm-shifting": {
    title: "2.2. Shifting ile GM Değişimi",
    group: "Enine Denge Hesapları",
    image: "/diagrams/agirlik-merkezi.svg",
    imageAlt: "How the centre of gravity shifts when a weight is moved",
    content: `GM Değişimi:
ΔGM = (w × d) / Δ`,
  },
  "meyil-acisi": {
    title: "2.3. Meyil Açısı Hesaplama",
    group: "Enine Denge Hesapları",
    image: "/diagrams/dogrultma-kolu.svg",
    imageAlt: "Righting lever GZ at an angle of heel",
    content: `GZ Kolu:
GZ = (w × y) / Δ

Meyil Açısı:
	an(θ) = GZ / GM`,
  },
  "kreyn-gm": {
    title: "2.4. Bumba/Kreyn ile GM Değişimi",
    group: "Enine Denge Hesapları",
    image: "/diagrams/agirlik-merkezi.svg",
    imageAlt: "Weight lifted on a derrick acts at the head, raising G",
    content: `GM Azalması:
GG₁ = (w × (hcunda − hyük)) / Δ`,
  },
  "havuzlama-gm": {
    title: "2.5. Havuzlamada Kritik GM",
    group: "Enine Denge Hesapları",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "Metacentric height, which the upthrust P reduces during docking",
    content: `P Kuvveti:
P = (MCT × Trim (cm)) / l

GM Değişimi:
ΔGM = (P × KM) / Δ`,
  },

  // 3. Boyuna Denge Hesapları
  "trim-degisimi": {
    title: "3.1. Trim Değişimi",
    group: "Boyuna Denge Hesapları",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Trim as the difference between forward and after draft",
    content: `Trim Değişimi:
ΔTrim = Toplam Moment / MCT`,
  },
  "paralel-batma": {
    title: "3.2. Paralel Batma/Çıkma",
    group: "Boyuna Denge Hesapları",
    image: "/diagrams/kaldirma-merkezi.svg",
    imageAlt: "Added weight increases displacement and sinks the ship bodily",
    content: `Paralel Batma (cm):
Batma = w / TPC`,
  },
  "draft-duzeltme": {
    title: "3.3. Baş/Kıç Draft Düzeltmesi",
    group: "Boyuna Denge Hesapları",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Distributing the trim between the forward and after draft marks",
    content: `Baş/Kıç Draft Düzeltmesi:
Düzeltme = (Mesafe × Trim) / LBD`,
  },

  // 4. Draft Survey
  "mmm-draft": {
    title: "4.1. MMM Draft",
    group: "Draft Survey",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Draft marks read on the ship's side for the mean of means",
    content: `MMM = (dF + dA + 6 × dM) / 8`,
  },
  "trim-duzeltmeleri": {
    title: "4.2. Trim Düzeltmeleri",
    group: "Draft Survey",
    image: "/diagrams/stability/trim.svg",
    imageAlt: "Trim and the position of LCF, on which both trim corrections depend",
    content: `1. Trim Düzeltmesi:
Δ₁ = (Trim × LCF × TPC × 100) / LBP

2. Trim Düzeltmesi:
Δ₂ = (Trim² × ΔMCT × 50) / LBP`,
  },
  "yogunluk-duzeltmesi": {
    title: "4.3. Yoğunluk Düzeltmesi",
    group: "Draft Survey",
    image: "/diagrams/kaldirma-merkezi.svg",
    imageAlt: "Buoyancy and displacement, which change with water density",
    content: `Δρ = ((ρ / 1.025) − 1) × Δ`,
  },

  // 5. Diğer Hesaplar
  "duba-tank-hacim": {
    title: "5.1. Duba/Tank Hacim Hesapları",
    group: "Diğer Hesaplar",
    content: `Hacim:
V = Boy × En × Yükseklik

Kütle:
m = V × ρ`,
  },
  "blok-katsayisi": {
    title: "5.2. Blok Katsayısı",
    group: "Diğer Hesaplar",
    image: "/diagrams/seamanship/gemi-kisimlari.svg",
    imageAlt: "Hull form: the block coefficient compares the underwater volume with its enclosing box",
    content: `Cb = ∇ / (L × B × T)`,
  },
  "fwa-yogunluk": {
    title: "5.3. Yoğunluk Farkı ve FWA",
    group: "Diğer Hesaplar",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Fresh water allowance shown on the load line mark",
    content: `FWA:
FWA = Δ / (4 × TPC)

Draft Değişimi:
ΔT = (FWA × (1025 − ρ)) / 25`,
  },

  // 6. SOLAS Stabilite Kriterleri
  "kumelenme-acisi": {
    title: "6.1. Kümelenme Açısı",
    group: "SOLAS Stabilite Kriterleri",
    content: `θ = (57.3 × GHM) / (Δ × GM)`,
  },
  "gz-kn": {
    title: "6.2. GZ Kolu (KN Eğrileri)",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/gz-egrisi.svg",
    imageAlt: "Curve of statical stability: GZ against angle of heel",
    content: `GZ = KN − KG · sin(θ)`,
  },
  "simpson-alan": {
    title: "6.3. Simpson ile Alan Hesabı",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/gz-egrisi.svg",
    imageAlt: "Area under the GZ curve, which Simpson's rule integrates",
    content: `Simpson 1/3 Kuralı:
A = (h/3) · (y0 + 4y1 + 2y2 + ··· + yn)

Simpson 3/8 Kuralı:
A = (3h/8) · (y0 + 3y1 + 3y2 + y3)`,
  },
  "fsm": {
    title: "6.4. Serbest Yüzey Momenti (FSM)",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/serbest-yuzey.svg",
    imageAlt: "Free surface in a slack tank and the virtual rise of G",
    content: `GG₁ = (L × B³) / (12 × V) × (ρsıvı / ρdeniz) × (1 / n²)`,
  },
  "yalpa-periyodu": {
    title: "6.5. Yalpa Periyodu",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/metasantr-gm.svg",
    imageAlt: "Rolling period is governed by GM — a stiff ship rolls quickly",
    content: `T = (Cb × B) / √(GM)`,
  },
  "yarali-stabilite": {
    title: "6.6. Yaralı Stabilite",
    group: "SOLAS Stabilite Kriterleri",
    image: "/diagrams/stability/yara-stabilitesi.svg",
    imageAlt: "Bilging a compartment: lost buoyancy and the resulting sinkage",
    content: `ΔT = w / ((L × B) − (Lyaralı × B))`,
  },

  // 7. Yük Hesapları
  "musade-yuk": {
    title: "7.1. Müsaade Edilen Yük",
    group: "Yük Hesapları",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    imageAlt: "Load line marks setting the maximum permissible draft",
    content: `Maksimum Yük Yüksekliği:
hmax = SF × PL

Maksimum Yük Miktarı:
wmax = Vambar / SF`,
  },
  "sicaklik-yogunluk": {
    title: "7.2. Sıcaklıkla Yoğunluk Değişimi",
    group: "Yük Hesapları",
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
          Stabilite Formülleri
        </div>

        {!detail ? (
          <Card className="shadow">
            <CardHeader>
              <CardTitle>Sayfa bulunamadı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Geçersiz başlık kimliği.</div>
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
