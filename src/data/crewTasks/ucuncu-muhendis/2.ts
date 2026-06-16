import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Safra ve ballast sistemleri operasyonu",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 2,
  estimatedPages: 25,
  intro: `Üçüncü/Dördüncü Mühendis, ballast tank operasyonları, bilge seviye kontrolü, OWS (Oily Water Separator) işletimi ve tank sounding'lerinin makine dairesi tarafındaki yürütülmesinde aktif rol alır. Ballast Water Management Plan (BWMP) kapsamında exchange veya treatment (BWMS) prosedürlerinin uygulanmasına destek verir; valf sistemini ve pompaları emniyetli ve mevzuata uygun işletir. Bu bölüm, ballast/bilge sistemlerinin operasyonel mantığını, BWM Convention D-1/D-2 standartlarını ve MARPOL kirlilik önleme kurallarını uygulamalı olarak açıklar.`,
  sources: [
    "BWM Convention (Ballast Water Management) — D-1 & D-2 Standards",
    "MARPOL Annex I — Oil Pollution Prevention (15 ppm, OWS/OCM)",
    "USCG Ballast Water Management Regulations (33 CFR 151)",
    "IMO Resolution MEPC.300(72) — BWMS Code",
    "SOLAS Chapter II-1 — Subdivision & Stability / Bilge Systems",
    "Ballast Water Record Book (BWRB) & Oil Record Book Part I",
    "Manufacturer Manuals (BWMS: UV / Electrochlorination)",
    "Ship's Stability & Loading Manual",
  ],
  chapters: [
    {
      heading: "1. Ballast Sisteminin Yapısı ve Operasyon Mantığı",
      lead: `Ballast sistemi, geminin draft, trim, list ve mukavemetini yönetmek için suyu kontrollü şekilde alıp basabilen pompa-valf-tank ağıdır. Köprüüstü/Birinci Zabit planlar; makine dairesi pompa ve valfi güvenle işletir.`,
      sections: [
        {
          subheading: "1.1 Pompa, valf ve tank düzeni",
          paragraphs: [
            `Tipik bir gemide ballast, ayrı bir ballast pompası (santrifüj) veya eductor (jet pompa) ile yapılır. Sistem; sea chest (high/low suction), main ballast line, branch valfler ve her tank için ayrı kelebek/uzaktan kumandalı valflerden oluşur. Valfler hidrolik/pnömatik uzaktan kumandalı olabilir; mimic panel (kumanda mozaiği) üzerinden açık/kapalı durumu izlenir.`,
            `Üçüncü/Dördüncü Mühendis, ballast operasyonu öncesi hat dizilimini (line-up) doğrular: doğru suction/discharge seçimi, sea chest açıklığı, overboard valf durumu ve istenmeyen tanklara su kaçışını önleyecek valf kapanışı. Hatalı line-up, yanlış tankın su basması veya geri kaçak ile list/trim sorununa yol açar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Sorumluluk paylaşımı",
              text: `Ballast planı (hangi tank, ne miktar, hangi sırayla) Birinci Zabit/köprüüstü stabilite yazılımıyla belirlenir. Makine dairesi mühendisi pompa/valf işletiminden ve sistem emniyetinden sorumludur. Operasyon ikisinin koordineli haberleşmesiyle yürür.`,
            },
          ],
        },
        {
          subheading: "1.2 Sounding, ullage ve seviye doğrulama",
          paragraphs: [
            `Tank seviyeleri hem otomatik (remote tank gauging) hem manuel sounding tape ile doğrulanır. Otomatik sistem ve manuel ölçüm arasında uyumsuzluk varsa sensör hatası veya hat kaçağı şüphesi vardır. Sounding pipe'ların açık ve self-closing kapaklarının çalışır olması SOLAS gereğidir.`,
            `Ballast alırken/basarken kademeli sounding ile trim ve list değişimi izlenir; ani değişim valf arızası veya yanlış line-up işaretidir. Operasyon kayıtları (başlangıç-bitiş seviyesi, pompa süresi, miktar) tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Ballast Water Management Convention (D-1 ve D-2)",
      sections: [
        {
          subheading: "2.1 D-1 Exchange ve D-2 Treatment standardı",
          paragraphs: [
            `BWM Convention, ballast suyuyla taşınan istilacı türlerin (invasive species) deniz ekosistemine yayılmasını önler. İki uyum yolu vardır: D-1 (ballast water exchange — açık denizde su değişimi, en az 200 deniz mili açık ve 200 m derinlikte, %95 hacim değişimi) ve D-2 (ballast water treatment — onaylı BWMS ile biyolojik standardın sağlanması). Geçiş takvimi tamamlanmıştır; modern gemiler D-2 için BWMS taşır.`,
            `D-1 exchange üç yöntemle yapılır: sequential (boşalt-doldur), flow-through (üç kat hacim pompalama) ve dilution. Sequential yöntemde tank boşaltma sırasında stabilite, mukavemet ve slamming/sloshing riski köprüüstü ile koordine edilir; bazı tanklar boşken gemi mukavemet sınırına yaklaşabilir.`,
          ],
          table: {
            caption: `BWM Convention standartları özeti`,
            headers: ["Standart", "Yöntem", "Temel kural"],
            rows: [
              ["D-1", "Exchange", "≥200 nm açık, ≥200 m derinlik, %95 hacim"],
              ["D-1 (yetersizse)", "Exchange", "≥50 nm açık, ≥200 m derinlik"],
              ["D-2", "Treatment (BWMS)", "Onaylı sistemle canlı organizma limiti"],
              ["Sampling", "PSC kontrol", "Indicative/detailed numune analizi"],
            ],
          },
        },
        {
          subheading: "2.2 BWMS işletimi (UV ve electrochlorination)",
          paragraphs: [
            `İki yaygın BWMS tipi vardır: UV (ultraviyole) sistemleri filtre + UV reaktör ile, electrochlorination (EC) sistemleri tuzlu sudan in-situ klor üreterek dezenfekte eder. Üçüncü/Dördüncü Mühendis; filtre backflush, UV lamba/sensör durumu, TRO (Total Residual Oxidant) ölçümü ve neutralization (basma anında klor nötralizasyonu) parametrelerini izler. EC sistemlerde hidrojen gazı havalandırması patlama önleme açısından kritiktir.`,
            `BWMS arızası veya bypass durumunda contingency (acil durum) prosedürü uygulanır; bypass yapıldıysa BWRB'ye ve liman otoritesine bildirilir. Yetkisiz bypass, USCG/PSC denetiminde ağır yaptırımla sonuçlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "BWRB (Ballast Water Record Book)",
              text: `Tüm ballast alma, basma, exchange, treatment ve bypass işlemleri Ballast Water Record Book'a zamanında kaydedilir. ABD sularında USCG ek olarak type-approved BWMS ve ayrıntılı kayıt arar; eksik kayıt detention sebebidir.`,
            },
            {
              type: "warning",
              title: "EC ve hidrojen gazı",
              text: `Electrochlorination sistemlerinde üretilen hidrojen patlayıcıdır; havalandırma (degassing) ve gaz dedektörleri sürekli çalışır olmalıdır. Havalandırma arızasında sistem güvenle durdurulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bilge Sistemi ve Seviye Kontrolü",
      sections: [
        {
          subheading: "3.1 Bilge well, alarm ve emniyet",
          paragraphs: [
            `Bilge sistemi, makine dairesi ve hold bilge well'lerinde biriken yağlı/kirli suyu toplayan emniyet sistemidir. Her bilge well'de high-level alarm bulunur; bu alarmlar düzenli test edilir. Makine dairesi bilge seviyesinin sürekli yükselmesi, bir sızıntının (deniz suyu, soğutma suyu, yağ) erken işaretidir ve derhal araştırılır.`,
            `Bilge suyu, bilge primary tank/holding tank'ta toplanır ve denize ancak OWS üzerinden, 15 ppm sınırının altında verilir. Acil durumda (flooding) emergency bilge suction doğrudan ana SW pompasını bilge'e bağlayabilir; bu yalnızca gemi emniyeti için kullanılır ve kayıt altına alınır.`,
          ],
        },
        {
          subheading: "3.2 Sounding ve günlük takip",
          paragraphs: [
            `Bilge well ve sludge/bilge holding tank seviyeleri günlük sounding ile izlenir; trend takibi sızıntı kaynağını işaret eder. Anormal bilge artışı vardiya raporuna işlenir ve baş mühendise bildirilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sızıntı kaynağı teşhisi",
              text: `Bilge'de tuzlu su → deniz suyu hattı/cooler kaçağı; tatlı su → FW sistemi; yağ → yağ devresi sızıntısı; yakıt → FO hattı. Bilge suyunun kokusu ve rengi, kaynağı hızlıca daraltır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. OWS (Oily Water Separator) ve 15 ppm Kuralı",
      sections: [
        {
          subheading: "4.1 OWS çalışma prensibi ve OCM",
          paragraphs: [
            `OWS, yer çekimi/coalescer prensibiyle bilge suyundan yağı ayırır; çıkıştaki yağ içeriği Oil Content Meter (OCM/15 ppm monitor) ile sürekli ölçülür. Yağ içeriği 15 ppm'i aşarsa three-way valve otomatik olarak suyu bilge tankına geri yönlendirir (recirculation) ve denize basamaz. Bu otomatik kapama (automatic stopping device) MARPOL gereğidir ve devre dışı bırakılamaz.`,
            `OWS işletimi öncesi OCM kalibrasyonu, zero/span kontrolü ve coalescer eleman durumu doğrulanır. Bulanık emülsiyon (deterjan/kimyasal karışmış bilge) OWS'i bozar ve sürekli alarm verir; bu yüzden makine dairesinde gereksiz deterjan kullanımından kaçınılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — 15 ppm",
              text: `Makine dairesi bilge suyu yalnızca onaylı OWS üzerinden, 15 ppm sınırının altında ve OCM gözetiminde denize verilebilir. Özel alanlarda (Special Areas) ek kısıtlar geçerlidir. Her overboard discharge ORB Part I'e kaydedilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Oil Record Book Part I disiplini",
          paragraphs: [
            `OWS ile denize basma, bilge transferi, sludge yakımı (incinerator) ve shore reception teslimleri ORB Part I'e operasyon kodlarıyla doğru ve zamanında işlenir. Kayıtlar mürettebatın imzası ve kaptan onayı taşır. ORB tutarsızlığı (örn. üretilen sludge ile bertaraf miktarı uyumsuz) PSC denetiminin temel kırmızı bayrağıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: OCM bypass cezası",
              text: `Birçok şirket, OCM/OWS'i bypass eden uygulamalar nedeniyle ABD'de milyonlarca dolar ceza ödedi ve mühendisler hapis cezası aldı. Ders: 15 ppm sistemi asla bypass edilmez; OWS düzgün çalışmıyorsa bilge shore'a verilir, ORB doğru tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Tank Sounding ve Seviye Yönetimi",
      sections: [
        {
          subheading: "5.1 Manuel ve otomatik sounding doğrulama",
          paragraphs: [
            `Ballast, bilge, FO/DO/LO ve FW tanklarının seviyeleri günlük sounding ile takip edilir. Manuel ölçüm sounding tape + dip paste (su/yağ ayrımı için) ile yapılır; otomatik gauging (pneumercator, radar, kapasitif) ile çapraz kontrol edilir. Sapma, sensör arızası veya hat/valf kaçağına işaret eder.`,
            `Sounding sonuçları, kalibrasyon tablosu (tank calibration/ullage table) üzerinden hacme dönüştürülür; trim/list düzeltmesi uygulanır. Sonuçlar tank sounding log'una işlenir ve bunker/FW/ballast yönetimini besler.`,
          ],
          table: {
            caption: `Tank sounding kayıt örneği (kılavuz)`,
            headers: ["Tank", "Sounding (cm)", "Hacim (m³)", "Not"],
            rows: [
              ["No.1 WBT (P)", "320", "210", "Ballast dolu"],
              ["No.1 WBT (S)", "318", "208", "Trim/list teyit"],
              ["Bilge holding", "45", "3.2", "OWS planlanacak"],
              ["FO service", "180", "—", "Ayrı log (ORB)"],
            ],
          },
        },
        {
          subheading: "5.2 Free surface ve stabilite etkisi",
          paragraphs: [
            `Kısmen dolu (slack) tanklar serbest yüzey etkisi (free surface effect) yaratır ve geminin etkin GM'sini düşürür. Ballast operasyonunda mümkün olduğunca tanklar tam dolu (pressed up) veya boş tutulur; aynı anda çok sayıda slack tank açmak stabiliteyi zayıflatır. Makine dairesi, köprüüstü ile koordineli olarak bu riski yönetir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pompa ve Valf Sistemi İşletimi",
      sections: [
        {
          subheading: "6.1 Priming, kavitasyon ve eductor",
          paragraphs: [
            `Ballast/bilge santrifüj pompaları suction tarafında hava olduğunda priming yapamaz; bu yüzden self-priming düzeni veya priming pompası kullanılır. NPSH (Net Positive Suction Head) yetersizliği kavitasyona yol açar; kavitasyon gürültü, titreşim ve impeller erozyonu yaratır. Düşük tank seviyesinde stripping (son su sıyırma) için eductor (jet pompa) kullanılır; eductor çalışma suyu (driving water) basıncı yeterli olmalıdır.`,
          ],
        },
        {
          subheading: "6.2 Uzaktan kumandalı valf arızaları",
          paragraphs: [
            `Hidrolik/pnömatik uzaktan kumandalı valflerde mimic panel göstergesi ile gerçek valf konumu uyumsuz olabilir (limit switch arızası, hidrolik kaçak). Şüphe halinde valf yerinde manuel/lokal kontrol edilir. Yanlış valf konumu, yanlış tankın basılması veya geri kaçakla ciddi list/trim olayına yol açar; bu yüzden kritik operasyonda valf konumu fiilen doğrulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış line-up riski",
              text: `Overboard valf açık unutulup deniz suyu valfi de açık kalırsa, gemi içine kontrolsüz su girişi (down-flooding) olabilir. Operasyon sonunda hat normalize edilir, sea/overboard valfleri doğru konuma alınır ve kayıt tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Limana Özgü ve Bölgesel Kurallar",
      sections: [
        {
          subheading: "7.1 USCG ve bölgesel ballast kuralları",
          paragraphs: [
            `ABD sularında USCG, type-approved BWMS ve ayrıntılı raporlama (BWMR — Ballast Water Management Report) zorunlu kılar; California gibi eyaletlerin ek kuralları olabilir. Avustralya, Yeni Zelanda ve bazı limanlar da kendi biyogüvenlik koşullarını uygular. Operasyon öncesi liman bilgileri (port agent + şirket talimatı) kontrol edilir.`,
            `Bazı limanlarda exchange/treatment belirli koordinatlarda veya belirli derinlikte yapılmalıdır; kayıtlar GPS pozisyonu ve zaman damgasıyla tutulur. PSC, kayıt ile fiili durumu çapraz kontrol eder.`,
          ],
        },
        {
          subheading: "7.2 Sediment yönetimi",
          paragraphs: [
            `Ballast tanklarında biriken sediment (çamur), istilacı tür barındırabilir; BWMP kapsamında periyodik sediment removal ve bertaraf planlanır. Tank içine giriş enclosed space entry permit ile yapılır; atmosfer testi (O2/LEL/H2S) ve standby personel zorunludur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Acil Durumlar ve Arıza Yönetimi",
      sections: [
        {
          subheading: "8.1 Flooding ve emergency bilge",
          paragraphs: [
            `Makine dairesine kontrolsüz su girişinde (cooler patlaması, deniz valfi arızası, gövde hasarı) önce kaynak izole edilir, ardından bilge pompaları + gerekirse emergency bilge suction devreye alınır. Köprüüstü bilgilendirilir, gerekirse stabilite/draft etkisi değerlendirilir. Bu olay drill ile düzenli tatbik edilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS — bilge sistemi hazır olma",
              text: `Bilge ve drenaj düzeni her zaman çalışır durumda tutulmalı; emergency bilge suction kolayca erişilebilir ve test edilmiş olmalıdır. Bu, gemi su altı bütünlüğünün son savunmasıdır.`,
            },
          ],
        },
        {
          subheading: "8.2 BWMS ve OWS arıza senaryoları",
          paragraphs: [
            `BWMS arızasında contingency planı uygulanır (alternatif yöntem, sefer planı düzenlemesi, liman bildirimi). OWS arızasında bilge denize basılmaz; holding tank kapasitesi yönetilir ve shore reception planlanır. Her iki durumda kayıt (BWRB/ORB) eksiksiz tutulur ve baş mühendis/şirket bilgilendirilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Ballast/bilge operasyonu kontrol listesi",
          bullets: [
            `Ballast planı köprüüstü ile teyit edildi mi, line-up doğru mu?`,
            `Sea/overboard valf konumları fiilen doğrulandı mı?`,
            `BWMS (UV/EC) parametreleri ve filtre/lamba durumu normal mi?`,
            `D-1/D-2 yöntemi limana uygun mu, koordinat/derinlik şartı sağlandı mı?`,
            `BWRB ve ORB Part I zamanında ve doğru işlendi mi?`,
            `OWS öncesi OCM kalibrasyonu yapıldı, 15 ppm otomatik durdurma çalışıyor mu?`,
            `Bilge well high-level alarmları test edildi mi?`,
            `Sounding (manuel + otomatik) çapraz doğrulandı mı?`,
            `Slack tank sayısı/free surface stabilite açısından yönetildi mi?`,
            `Emergency bilge suction erişilebilir ve test edilmiş mi?`,
          ],
          paragraphs: [
            `Ballast ve bilge sistemleri, hem geminin emniyeti (stabilite, su altı bütünlüğü) hem de çevre uyumu (BWM ve 15 ppm) açısından sıfır toleranslı alanlardır. Üçüncü/Dördüncü Mühendis'in işi; doğru line-up, doğrulanmış valf konumu, çalışan otomatik emniyetler ve eksiksiz kayıt üzerine kuruludur. Burada atılan her kısa yol, ya bir kirlilik cezası ya da bir su alma olayı olarak geri döner.`,
          ],
        },
      ],
    },
  ],
};

export default content;
