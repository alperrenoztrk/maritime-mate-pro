import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Seyir kuralları.
 *
 * İçerik src/pages/NavigationRules.tsx sayfasındaki gerçek, kaynak gösterilmiş
 * düzenlemelerden birebir alınmıştır:
 *  - COLREG 1972 (Denizde Çatışmayı Önleme Kuralları)
 *  - IALA Deniz İşaretleri Sistemi (Maritime Buoyage System)
 *  - SOLAS Bölüm IV / V, GMDSS
 *
 * Uydurma kural yoktur; atıflar (kural numaraları) korunmuştur.
 */
export const navigationRules: RuleGroup[] = [
  {
    title: "COLREG — Denizde Çatışmayı Önleme Kuralları",
    source: {
      code: "IMO COLREGs 1972",
      detail: "Consolidated Edition",
    },
    rules: [
      {
        subtitle: "Seyir ve Manevra Kuralları (Kısım B)",
        content: [
          "Kural 5 — Gözcü: Her gemi, her zaman görsel ve işitsel araçlarla uygun bir gözcü bulundurmalıdır.",
          "Kural 6 — Emniyetli Hız: Her gemi, çarpışmayı önlemek için uygun ve etkili tedbirleri almasına izin verecek emniyetli bir hızla seyretmelidir.",
          "Kural 7 — Çarpışma Riski: Çarpışma riskinin varlığını belirlemek için mevcut tüm araçlar kullanılmalıdır; kerteriz değişmiyorsa çarpışma riski var kabul edilir.",
          "Kural 8 — Çarpışmayı Önleme Manevrası: Rota ve/veya hız değişikliği yeterince erken, denizcilik teamülüne uygun ve açıkça fark edilebilir olmalıdır.",
          "Kural 9 — Dar Kanallar: Gemiler dar kanal veya geçidin sancak tarafından mümkün olduğunca yakın seyretmelidir.",
          "Kural 10 — Trafik Ayırma Düzenleri (TSS): Gemiler belirlenen trafik şeridinde genel trafik akışı yönünde seyretmelidir.",
        ],
      },
      {
        subtitle: "Yol Hakkı ve Sorumluluklar",
        content: [
          "Kural 12 — Yelkenli Gemiler: İskele amura rüzgâr alan gemi, sancak amura rüzgâr alan gemiye yol vermelidir.",
          "Kural 13 — Geçme: Bir gemiyi geçen gemi, geçilen gemiye yol vermekle yükümlüdür. Diğer gemiye, kemeresinin 22.5°'den daha gerisinden (geceleyin yalnızca pupa fenerini görecek konumdan) yaklaşan gemi geçen gemi sayılır.",
          "Kural 14 — Karşılıklı Rota (Head-on): İki motorlu gemi karşılıklı rotada veya hemen hemen karşılıklı rotada ise her iki gemi de sancağa dönmelidir.",
          "Kural 15 — Çapraz Rota (Crossing): İki motorlu gemi çapraz rotalarda ise sancak tarafından gelen gemiye yol vermelidir.",
          "Kural 16 — Yol Veren Gemi: Yol veren gemi, diğer gemiden uzak durmalıdır; erken ve geniş manevra yapmalıdır.",
          "Kural 17 — Yolunu Koruyan Gemi: Yolunu koruyan gemi, rotasını ve hızını korumalıdır; ancak yol veren gemi yeterli manevra yapmıyorsa kendi de kaçma manevrası yapmalıdır.",
          "Kural 18 — Sorumluluklar: Motorlu gemi; yelkenli, balıkçı, manevra kabiliyeti kısıtlı ve draftıyla kısıtlı gemilere yol vermelidir.",
          "Kural 19 — Kısıtlı Görüşte Seyir: Emniyetli hıza düşülmeli; yalnızca radarla tespit edilen ve kemerenin önünde bulunan gemi için iskeleye dönüşten (geçilen gemi hariç), kemere hizasındaki veya gerisindeki gemiye doğru dönüşten kaçınılmalıdır.",
        ],
      },
    ],
  },
  {
    title: "Seyir Fenerleri ve İşaretler",
    source: {
      code: "COLREG Part C",
      detail: "Işıklar ve Şekiller",
    },
    rules: [
      {
        subtitle: "Gemi Tiplerine Göre Fenerler",
        content: [
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
    ],
  },
  {
    title: "IALA Deniz İşaretleri Sistemi",
    source: {
      code: "IALA Maritime Buoyage System",
    },
    rules: [
      {
        subtitle: "Lateral İşaretler",
        content: [
          "Lateral İşaretler (Bölge A): İskele — kırmızı silindir/teneke, sancak — yeşil koni.",
          "Lateral İşaretler (Bölge B): Renkler ters; iskele — yeşil, sancak — kırmızı.",
        ],
      },
      {
        subtitle: "Kardinal İşaretler",
        content: [
          "Kardinal İşaretler: Tehlikenin bulunduğu yöne göre (N-E-S-W) siyah-sarı renk ve tepesi işaretler.",
          "Kuzey Kardinal: Üstte siyah, altta sarı; iki koni yukarı bakan. Geçiş: tehlikenin kuzeyinden.",
          "Güney Kardinal: Üstte sarı, altta siyah; iki koni aşağı bakan. Geçiş: tehlikenin güneyinden.",
          "Doğu Kardinal: Siyah-sarı-siyah; iki koni tabanları karşı karşıya. Geçiş: doğudan.",
          "Batı Kardinal: Sarı-siyah-sarı; iki koni tepeleri karşı karşıya. Geçiş: batıdan.",
        ],
      },
      {
        subtitle: "Özel İşaretler",
        content: [
          "İzole Tehlike İşareti: Siyah-kırmızı-siyah yatay çizgili; tepede iki siyah küre.",
          "Emniyetli Su İşareti: Kırmızı-beyaz dikey çizgili; tepede kırmızı küre. Kanalın ortası / yaklaşma noktası.",
          "Özel İşaretler: Sarı renkli, tepede sarı 'X'. Askeri tatbikat, boru hatları, kablolar vb.",
        ],
      },
    ],
  },
  {
    title: "Tehlike ve Emniyet Sinyalleri",
    source: {
      code: "SOLAS Bölüm IV, GMDSS, COLREG Annex IV",
    },
    rules: [
      {
        subtitle: "Sesli ve Telsiz Sinyalleri",
        content: [
          "MAYDAY: Can ve gemi tehlikede — VHF Ch 16, 2182 kHz, DSC distress butonu ile iletilir.",
          "PAN PAN: Acil durum ancak acil tehlike yok — VHF Ch 16 üzerinden yayınlanır.",
          "SECURITÉ: Seyir emniyeti veya meteorolojik uyarı — tüm istasyonlara duyurulur.",
          "Tehlike sinyalleri: Kırmızı fişek, turuncu duman, SOS (· · · — — — · · ·), sürekli düdük, bayrak N+C.",
        ],
      },
      {
        subtitle: "Acil Durum Cihazları",
        content: [
          "EPIRB: 406 MHz acil konum bildirici, 48 saat minimum pil ömrü, serbest yüzmeli (float-free).",
          "SART: 9 GHz radar transponder; radarda 12 nokta halinde görünür, menzil ~5 NM.",
        ],
      },
    ],
  },
  {
    title: "Seyir Planlama Kuralları",
    source: {
      code: "SOLAS V/34",
      detail: "IMO Resolution A.893(21)",
    },
    rules: [
      {
        subtitle: "Seyir Planının Aşamaları",
        content: [
          "Seyir planı (passage plan) kalkıştan varışa kadar tüm rotayı kapsamalıdır.",
          "Değerlendirme (Appraisal): Haritalar, seyir uyarıları, gelgit, hava, draft kısıtları incelenir.",
          "Planlama (Planning): Way-point'ler, no-go alanlar, abort noktaları, dönüş çemberleri işaretlenir.",
          "İcra (Execution): Plan kaptan onayıyla uygulanır; beklenmedik durumlarda plan güncellenir.",
          "İzleme (Monitoring): Konum sürekli kontrol edilir; ETA, yakıt, hava güncellemeleri yapılır.",
        ],
      },
      {
        subtitle: "Su Altı Boşluğu ve Squat",
        content: [
          "UKC (Under Keel Clearance): En az %10 draft veya 0.6 m (hangisi büyükse) minimum boşluk bırakılmalıdır. Port gereksinimleri farklılık gösterebilir.",
          "Squat etkisi: Sığ sularda geminin batması dikkate alınmalı; hız gerekirse düşürülmelidir.",
        ],
      },
    ],
  },
  {
    title: "Pusula ve Mevki Kuralları",
    source: {
      code: "SOLAS V/19",
      detail: "IMO Resolution A.382(X)",
    },
    rules: [
      {
        subtitle: "Pusula ve Mevki Doğrulama",
        content: [
          "Manyetik pusula sapması (deviation) düzenli olarak kontrol edilmeli ve sapma tablosu güncel tutulmalıdır.",
          "Gyro pusula hatası her vardiyada ve liman giriş/çıkışlarında celestial veya karasal kerterizlerle doğrulanmalıdır.",
          "GPS fix'leri bağımsız yöntemlerle (radar, görsel kerteriz) doğrulanmalıdır.",
          "Haritalar (ECDIS veya kâğıt) güncel tutulmalı; Notice to Mariners (NtM) düzeltmeleri uygulanmalıdır.",
          "AIS bilgileri seyir kararları için tek başına yeterli kabul edilmemelidir.",
        ],
      },
    ],
  },
];
