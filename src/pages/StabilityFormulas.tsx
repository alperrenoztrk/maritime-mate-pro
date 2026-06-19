import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, Sigma } from "lucide-react";

export default function StabilityFormulasPage() {

  return (
    <MobileLayout>
      <div className="space-y-4" data-no-translate>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Formüller Rehberi
        </div>

        {/* İçindekiler – başlık başına ayrı sayfa butonları */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sigma className="h-5 w-5" /> Stabilite Formülleri – İçindekiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 1. Giriş */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">1. Giriş</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/giris"><Button variant="outline" size="sm">Giriş</Button></Link>
                </div>
              </div>

              {/* 2. Enine Denge Hesapları */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">2. Enine Denge Hesapları</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/moment-kg"><Button variant="outline" size="sm">2.1 Moment ve KG</Button></Link>
                  <Link to="/stability/formulas/gm-shifting"><Button variant="outline" size="sm">2.2 Shifting ile GM</Button></Link>
                  <Link to="/stability/formulas/meyil-acisi"><Button variant="outline" size="sm">2.3 Meyil Açısı</Button></Link>
                  <Link to="/stability/formulas/kreyn-gm"><Button variant="outline" size="sm">2.4 Bumba/Kreyn ile GM</Button></Link>
                  <Link to="/stability/formulas/havuzlama-gm"><Button variant="outline" size="sm">2.5 Havuzlamada Kritik GM</Button></Link>
                </div>
              </div>

              {/* 3. Boyuna Denge Hesapları */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">3. Boyuna Denge Hesapları</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/trim-degisimi"><Button variant="outline" size="sm">3.1 Trim Değişimi</Button></Link>
                  <Link to="/stability/formulas/paralel-batma"><Button variant="outline" size="sm">3.2 Paralel Batma/Çıkma</Button></Link>
                  <Link to="/stability/formulas/draft-duzeltme"><Button variant="outline" size="sm">3.3 Draft Düzeltmeleri</Button></Link>
                </div>
              </div>

              {/* 4. Draft Survey */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">4. Draft Survey</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/mmm-draft"><Button variant="outline" size="sm">4.1 MMM Draft</Button></Link>
                  <Link to="/stability/formulas/trim-duzeltmeleri"><Button variant="outline" size="sm">4.2 Trim Düzeltmeleri</Button></Link>
                  <Link to="/stability/formulas/yogunluk-duzeltmesi"><Button variant="outline" size="sm">4.3 Yoğunluk Düzeltmesi</Button></Link>
                </div>
              </div>

              {/* 5. Diğer Hesaplar */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">5. Diğer Hesaplar</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/duba-tank-hacim"><Button variant="outline" size="sm">5.1 Duba/Tank Hacmi</Button></Link>
                  <Link to="/stability/formulas/blok-katsayisi"><Button variant="outline" size="sm">5.2 Blok Katsayısı</Button></Link>
                  <Link to="/stability/formulas/fwa-yogunluk"><Button variant="outline" size="sm">5.3 Yoğunluk Farkı ve FWA</Button></Link>
                </div>
              </div>

              {/* 6. SOLAS Stabilite Kriterleri */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">6. SOLAS Stabilite Kriterleri</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/kumelenme-acisi"><Button variant="outline" size="sm">6.1 Kümelenme Açısı</Button></Link>
                  <Link to="/stability/formulas/gz-kn"><Button variant="outline" size="sm">6.2 GZ Kolu (KN)</Button></Link>
                  <Link to="/stability/formulas/simpson-alan"><Button variant="outline" size="sm">6.3 Simpson Alan</Button></Link>
                  <Link to="/stability/formulas/fsm"><Button variant="outline" size="sm">6.4 FSM</Button></Link>
                  <Link to="/stability/formulas/yalpa-periyodu"><Button variant="outline" size="sm">6.5 Yalpa Periyodu</Button></Link>
                  <Link to="/stability/formulas/yarali-stabilite"><Button variant="outline" size="sm">6.6 Yaralı Stabilite</Button></Link>
                </div>
              </div>

              {/* 7. Yük Hesapları */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary px-1">7. Yük Hesapları</div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/stability/formulas/musade-yuk"><Button variant="outline" size="sm">7.1 Müsaade Edilen Yük</Button></Link>
                  <Link to="/stability/formulas/sicaklik-yogunluk"><Button variant="outline" size="sm">7.2 Sıcaklıkla Yoğunluk</Button></Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="temel" className="scroll-mt-24">⚖️ Temel Tanımlar ve Kavramlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-muted rounded">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2">Terim</th>
                    <th className="p-2">Sembol</th>
                    <th className="p-2">Tanım / Formül</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">Deplasman</td>
                    <td className="p-2">Δ</td>
                    <td className="p-2 font-mono">Δ = ρ · ∇</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Yoğunluk</td>
                    <td className="p-2">ρ</td>
                    <td className="p-2">Deniz suyu: 1.025 t/m³, Tatlı su: 1.000 t/m³</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Draft (Ortalama)</td>
                    <td className="p-2">T</td>
                    <td className="p-2 font-mono">T = (Tf + Ta)/2</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Trim</td>
                    <td className="p-2">—</td>
                    <td className="p-2 font-mono">Trim = Ta − Tf</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">MCT 1 cm</td>
                    <td className="p-2">—</td>
                    <td className="p-2 font-mono">MCT<sub>1cm</sub> ≈ (Δ · GM<sub>L</sub> / L) · 0.01 ≈ (ρ · I<sub>TL</sub> / L) · 0.01 (veya Stabilite Kitapçığı)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Tons per cm Immersion</td>
                    <td className="p-2">TPC</td>
                    <td className="p-2 font-mono">TPC = ρ · A<sub>w</sub> / 100 (A<sub>w</sub>: su hattı alanı)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="yuzerlik" className="scroll-mt-24">⚓ Yüzerlik ve Metasentrik Yükseklik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`KB ≈ T · (0.53 + 0.085·CB)   (yaklaşım, aksi halde tablodan)
BMT = IT / ∇
KMT = KB + BMT
GMT = KMT − KG
Küçük açılar:   GZ(φ) ≈ GMT · sin φ
Genel:          GZ(φ) = KN(φ) − KG · sin φ`}</pre>
            </div>
            <p>I<sub>T</sub>: su hattı alanının enine atalet momenti; KN(φ): hidrostatik tablodan.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="agirlik" className="scroll-mt-24">⚙️ Ağırlık Transferleri ve KG Hesapları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Yeni KG (ağırlık eklendi):   KG' = (Δ·KG + w·KGw)/(Δ + w)
Yeni KG (ağırlık kaldırıldı): KG' = (Δ·KG − w·KGw)/(Δ − w)
Dikey taşınma:                ΔKG = (w · h)/Δ   (yukarı +)
Yatay taşınma (heel):         tan φ ≈ (w · y)/(Δ · GMT)
Boyuna taşınma (trim):        Trim(cm) = (w · l)/MCT 1 cm`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="trim" className="scroll-mt-24">🧮 Trim Hesapları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Trim değişimi (cm):       Trim = Mt / MCT 1 cm
Trim momenti:             Mt = Δ·(LCG − LCB)  (veya w·l)
Baş draft değişimi:       ΔTf = −Trim · (LCF→FP)/L
Kıç draft değişimi:       ΔTa =  Trim · (LCF→AP)/L
Ortalama draft değişimi:  ΔTmean(cm) = w / TPC`}</pre>
            </div>
            <p>İşaretler LCF referansına göredir; mesafeler boyuna eksen üzerindeki izdüşümlerdir.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="free-surface" className="scroll-mt-24">🧭 Free Surface Effect (Serbest Yüzey Etkisi)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`FSM = ρtank · If
FSC = FSM / Δ = (ρtank/ρdeniz) · (If/∇)
GM düz = GM − ΣFSC
If (dikdörtgen) = l · b³ / 12`}</pre>
            </div>
            <p>Birden fazla yarı dolu tank varsa düzeltmeler toplanır.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="heel-gz" className="scroll-mt-24">⚓ Yanal Eğilme (Heel) ve GZ Eğrisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Doğrultucu Moment: RM(φ) = Δ · GZ(φ)
Heeling moment (ör.): Mh = w·y  veya  Mh = F·z
Eşitlik (statik):    RM(φeq) = Mh(φeq)  ⇔  GZ(φeq) = ah(φeq)
GZ (büyük açılar):   GZ(φ) = KN(φ) − KG · sin φ  (KN: tablodan)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="curves" className="scroll-mt-24">⚙️ Kararlılık Eğrileri (Statical Stability Curves)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`GZ eğrisi altı alan: A(θ) = ∫[0, θ] GZ(φ) dφ   [m·rad]
Dinamik stabilite:    Δ · A(θ)                   [ton·m·rad]
Maksimum GZ açısı:    θmax (genelde 30°–40°)
AVS:                  φAVS s.t. GZ(φAVS) = 0`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="loading" className="scroll-mt-24">⚖️ Yükleme, Ballast ve Denge Hesapları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Trim düzeltmesi (LCG≠LCB): Trim(cm) = Δ·(LCG − LCB)/MCT 1 cm
LCF ile draft dağılımı:     ΔTf = −Trim · (LCF→FP)/L;  ΔTa = Trim · (LCF→AP)/L
KG düzeltmesi (transfer):   KG' = KG ± (w·h)/Δ   →   GM' = KM − KG'`}</pre>
            </div>
            <p>LCF, LCB ve MCT değerleri onaylı hidrostatik/stabilite kitapçığından alınmalıdır.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="grain" className="scroll-mt-24">🧱 Tahıl ve Serbest Yük Stabilitesi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Grain Heeling Moment: Mg = GSM  (Grain Code'dan)
Minimum GM (özet):    SOLAS/Grain Code şartlarına göre GM düz ≥ GMmin
Heeling düzeltmesi:   GZ(φ) = ah,grain(φ) eşitliğinden denge açısı bulunur`}</pre>
            </div>
            <p>Tahıl için kayma momentleri (GSM) ve kriterler <em>International Grain Code</em> kapsamında verilir.</p>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="freeboard" className="scroll-mt-24">🌊 Freeboard, Draft ve Trim Uyumları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Ortalama draft:     Tmean = (Tf + Ta)/2
Deplasman değişimi:  Δfinal = Δinitial ± Σw
Son deplasman:       Δfinal (yoğunluğa göre ∇ = Δ/ρ)
Ton-mile moment:     TM = w · mesafe (deniz mili)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="denge" className="scroll-mt-24">⚙️ Statik ve Dinamik Denge Koşulları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Statik denge:   RM(φ) = Mh(φ)  ve  GM > 0 (küçük açılar)
Nötr denge:     GM = 0  ve  GZ ≈ 0 (küçük açılar)
Kararsız denge: GM < 0  ve  GZ < 0 (küçük açılar)`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle id="ek" className="scroll-mt-24">🔧 Kullanışlı Ek Formüller</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-muted/30 rounded p-3 overflow-x-auto">
              <pre className="font-mono text-sm leading-6 whitespace-pre-wrap break-words">{`Dikdörtgen yüzey atalet mom.: I = l · b³ / 12
Su hattı alanı (yaklaşım):    Aw = LWL · BWL · CW
Blok katsayısı:               CB = ∇/(L · B · T)
Deplasman hacmi:              ∇ = Δ/ρ`}</pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild variant="default" className="gap-2">
            <a href="#temel">
              <Calculator className="h-4 w-4" /> Başa Dön
            </a>
          </Button>
        </div>

        {/** Alt çizgi kaldırıldı */}
      </div>
    </MobileLayout>
  );
}

