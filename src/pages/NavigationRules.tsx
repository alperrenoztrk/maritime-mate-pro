import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Anchor, Navigation, Shield, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface RuleSection {
  title: string;
  icon: React.ElementType;
  rules: string[];
  source: string;
}

const sections: RuleSection[] = [
  {
    title: "COLREG — Denizde Çatışmayı Önleme Kuralları",
    icon: Navigation,
    source: "IMO COLREGs 1972 (Consolidated Edition)",
    rules: [
      "Kural 5 — Gözcü: Her gemi, her zaman görsel ve işitsel araçlarla uygun bir gözcü bulundurmalıdır.",
      "Kural 6 — Emniyetli Hız: Her gemi, çarpışmayı önlemek için uygun ve etkili tedbirleri almasına izin verecek emniyetli bir hızla seyretmelidir.",
      "Kural 7 — Çarpışma Riski: Çarpışma riskinin varlığını belirlemek için mevcut tüm araçlar kullanılmalıdır; kerteriz değişmiyorsa çarpışma riski var kabul edilir.",
      "Kural 8 — Çarpışmayı Önleme Manevrası: Rota ve/veya hız değişikliği yeterince erken, denizcilik teamülüne uygun ve açıkça fark edilebilir olmalıdır.",
      "Kural 9 — Dar Kanallar: Gemiler dar kanal veya geçidin sancak tarafından mümkün olduğunca yakın seyretmelidir.",
      "Kural 10 — Trafik Ayırma Düzenleri (TSS): Gemiler belirlenen trafik şeridinde genel trafik akışı yönünde seyretmelidir.",
      "Kural 12 — Yelkenli Gemiler: İskele amura rüzgâr alan gemi, sancak amura rüzgâr alan gemiye yol vermelidir.",
      "Kural 13 — Geçme (追い越し): Bir gemiyi geçen gemi, geçilen gemiye yol vermekle yükümlüdür. Kıç taraftan 22.5° dışındaki açıdan yaklaşan gemi geçiyor sayılır.",
      "Kural 14 — Karşılıklı Rota (Head-on): İki motorlu gemi karşılıklı rotada veya hemen hemen karşılıklı rotada ise her iki gemi de sancağa dönmelidir.",
      "Kural 15 — Çapraz Rota (Crossing): İki motorlu gemi çapraz rotalarda ise sancak tarafından gelen gemiye yol vermelidir.",
      "Kural 16 — Yol Veren Gemi: Yol veren gemi, diğer gemiden uzak durmalıdır; erken ve geniş manevra yapmalıdır.",
      "Kural 17 — Yolunu Koruyan Gemi: Yolunu koruyan gemi, rotasını ve hızını korumalıdır; ancak yol veren gemi yeterli manevra yapmıyorsa kendi de kaçma manevrası yapmalıdır.",
      "Kural 18 — Sorumluluklar: Motorlu gemi; yelkenli, balıkçı, manevra kabiliyeti kısıtlı ve draftıyla kısıtlı gemilere yol vermelidir.",
      "Kural 19 — Kısıtlı Görüşte Seyir: Emniyetli hıza düşülmeli; radar ile tespit edilen gemilerden sancağa dönülerek kaçılmalı, 090°'nin kıçtan gelen gemiyi iskeleye dönülerek kaçılmamalıdır.",
    ],
  },
  {
    title: "Seyir Fenerleri ve İşaretler",
    icon: Eye,
    source: "COLREG Part C — Işıklar ve Şekiller",
    rules: [
      "Motorlu gemi: Pruva seyir feneri (masthead light), yan fenerler (sidelights) ve kıç feneri (sternlight).",
      "50 m ve üstü gemi: İki seyir feneri (fore + main masthead), alt fener pruvada, üst fener kıçta ve daha yüksekte.",
      "Yelkenli gemi: Yalnızca yan fenerler ve kıç feneri. Opsiyonel: direk tepesinde kırmızı+yeşil ışıklar.",
      "Demir gemisi: Pruvada tam ufuk beyaz ışık; 50 m üstü ise kıçta da ek beyaz ışık.",
      "Çekme operasyonu: Ek dikey beyaz seyir fenerleri; çekme boyu 200 m üzerinde ise 3 dikey seyir feneri.",
      "Manevra kabiliyeti kısıtlı (RAM): Dikey kırmızı-beyaz-kırmızı ışıklar (veya gündüz top-elmas-top).",
      "Kontrol dışı (NUC): Dikey iki kırmızı ışık (veya gündüz iki siyah top).",
      "Balıkçı gemisi: Trol çeken — dikey yeşil-beyaz; diğer balıkçı — dikey kırmızı-beyaz.",
      "Pilotaj gemisi: Dikey beyaz-kırmızı ışıklar.",
    ],
  },
  {
    title: "IALA Deniz İşaretleri Sistemi",
    icon: Anchor,
    source: "IALA Maritime Buoyage System",
    rules: [
      "Lateral İşaretler (Bölge A): İskele — kırmızı silindir/teneke, sancak — yeşil koni.",
      "Lateral İşaretler (Bölge B): Renkler ters; iskele — yeşil, sancak — kırmızı.",
      "Kardinal İşaretler: Tehlikenin bulunduğu yöne göre (N-E-S-W) siyah-sarı renk ve tepesi işaretler.",
      "Kuzey Kardinal: Üstte siyah, altta sarı; iki koni yukarı bakan. Geçiş: tehlikenin kuzeyinden.",
      "Güney Kardinal: Üstte sarı, altta siyah; iki koni aşağı bakan. Geçiş: tehlikenin güneyinden.",
      "Doğu Kardinal: Siyah-sarı-siyah; iki koni tabanları karşı karşıya. Geçiş: doğudan.",
      "Batı Kardinal: Sarı-siyah-sarı; iki koni tepeleri karşı karşıya. Geçiş: batıdan.",
      "İzole Tehlike İşareti: Siyah-kırmızı-siyah yatay çizgili; tepede iki siyah küre.",
      "Emniyetli Su İşareti: Kırmızı-beyaz dikey çizgili; tepede kırmızı küre. Kanalın ortası / yaklaşma noktası.",
      "Özel İşaretler: Sarı renkli, tepede sarı 'X'. Askeri tatbikat, boru hatları, kablolar vb.",
    ],
  },
  {
    title: "Tehlike ve Emniyet Sinyalleri",
    icon: AlertTriangle,
    source: "SOLAS Bölüm IV, GMDSS, COLREG Annex IV",
    rules: [
      "MAYDAY: Can ve gemi tehlikede — VHF Ch 16, 2182 kHz, DSC distress butonu ile iletilir.",
      "PAN PAN: Acil durum ancak acil tehlike yok — VHF Ch 16 üzerinden yayınlanır.",
      "SECURITÉ: Seyir emniyeti veya meteorolojik uyarı — tüm istasyonlara duyurulur.",
      "Tehlike sinyalleri: Kırmızı fişek, turuncu duman, SOS (· · · — — — · · ·), sürekli düdük, bayrak N+C.",
      "EPIRB: 406 MHz acil konum bildirici, 48 saat minimum pil ömrü, serbest yüzmeli (float-free).",
      "SART: 9 GHz radar transponder; radarда 12 nokta halinde görünür, menzil ~5 NM.",
    ],
  },
  {
    title: "Seyir Planlama Kuralları",
    icon: BookOpen,
    source: "SOLAS V/34, IMO Resolution A.893(21)",
    rules: [
      "Seyir planı (passage plan) kalkıştan varışa kadar tüm rotayı kapsamalıdır.",
      "Değerlendirme (Appraisal): Haritalar, seyir uyarıları, gelgit, hava, draft kısıtları incelenir.",
      "Planlama (Planning): Way-point'ler, no-go alanlar, abort noktaları, dönüş çemberleri işaretlenir.",
      "İcra (Execution): Plan kaptan onayıyla uygulanır; beklenmedik durumlarda plan güncellenir.",
      "İzleme (Monitoring): Konum sürekli kontrol edilir; ETA, yakıt, hava güncellemeleri yapılır.",
      "UKC (Under Keel Clearance): En az %10 draft veya 0.6 m (hangisi büyükse) minimum boşluk bırakılmalıdır. Port gereksinimleri farklılık gösterebilir.",
      "Squat etkisi: Sığ sularda geminin batması dikkate alınmalı; hız gerekirse düşürülmelidir.",
    ],
  },
  {
    title: "Pusula ve Mevki Kuralları",
    icon: Shield,
    source: "SOLAS V/19, IMO Resolution A.382(X)",
    rules: [
      "Manyetik pusula sapması (deviation) düzenli olarak kontrol edilmeli ve sapma tablosu güncel tutulmalıdır.",
      "Gyro pusula hatası her vardiyada ve liman giriş/çıkışlarında celestial veya karasal kerterizlerle doğrulanmalıdır.",
      "GPS fix'leri bağımsız yöntemlerle (radar, görsel kerteriz) doğrulanmalıdır.",
      "Haritalar (ECDIS veya kâğıt) güncel tutulmalı; Notice to Mariners (NtM) düzeltmeleri uygulanmalıdır.",
      "AIS bilgileri seyir kararları için tek başına yeterli kabul edilmemelidir.",
    ],
  },
];

export default function NavigationRulesPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setExpanded(expanded === idx ? null : idx);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background px-4 pb-24 pt-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="flex items-center gap-3">
            <Link to="/navigation-menu">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">Seyir Kuralları</h1>
              <p className="text-xs text-muted-foreground">COLREG, IALA ve seyir güvenliği kuralları</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {sections.map((section, idx) => (
              <Card key={idx} className="border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-accent/10"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight text-foreground">{section.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{section.source}</p>
                  </div>
                  {expanded === idx ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>

                {expanded === idx && (
                  <CardContent className="border-t border-border/20 pt-3 pb-4">
                    <ul className="space-y-2">
                      {section.rules.map((rule, ri) => (
                        <li key={ri} className="flex gap-2 text-[13px] leading-relaxed text-foreground/90">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </MobileLayout>
  );
}
