import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yakıt ve yağ transfer operasyonları",
  roleSlug: "ikinci-muhendis",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `İkinci Mühendis, gemideki yakıt (FO/DO/VLSFO/MGO) ve yağ (LO) operasyonlarının emniyetli planlanması ve yürütülmesinden sorumludur. Bu görev; bunker (yakıt ikmali) operasyonunun SOPEP uyumlu hazırlığı, scupper kapatma ve drip tray yerleşimi, numune alımı ve density/temperature kayıtları, dahili FO/DO transferleri, purifier (separatör) işletimi, settling/service tank yönetimi ve yağlama yağı (LO) tüketim takibi ile top-up planlamasını kapsar. Yanlış yürütülen tek bir bunker operasyonu hem ciddi deniz kirliliği cezası hem de hatalı yakıttan kaynaklı ana makine hasarı doğurabilir. Bu bölüm, operasyonu adım adım açıklar.`,
  sources: [
    "MARPOL Annex I — Regulations for the Prevention of Pollution by Oil (ORB Part I, SOPEP)",
    "MARPOL Annex VI — Regulation 14 (sülfür sınırı) ve Reg. 18 (yakıt kalitesi, BDN)",
    "ISGOTT 6 (International Safety Guide for Oil Tankers and Terminals)",
    "ISO 8217 — Petroleum products — Fuels (class F) Specifications of marine fuels",
    "OCIMF / ICS — Bunkering Safety Guidelines",
    "IMO MEPC.1/Circ.795 — Unified interpretations to MARPOL Annex VI",
    "Alfa Laval / GEA separatör işletim ve overhaul el kitabı",
    "Ship's SOPEP / SMPEP ve bunker checklist prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Bunker Operasyonunun Planlanması",
      lead: `Emniyetli bir bunker, fiziksel akış başlamadan saatler önce kağıt üzerinde tamamlanmıştır. Planlama hatası en pahalı hatadır.`,
      sections: [
        {
          subheading: "1.1 Nomination, miktar ve tank planı",
          paragraphs: [
            `Bunker nomination şirket/charterer tarafından verilir: yakıt türü (örn. VLSFO ≤%0,50 S veya MGO), miktar, tedarikçi ve liman. İkinci Mühendis, mevcut ROB'u (tank ölçümleri ile) doğrular, alınacak miktarı tank kapasitelerine dağıtır ve %95–98 doldurma limiti ile genleşme payını (temperature expansion) hesaplar. Hangi tankın hangi sırayla doldurulacağı, valf dizilimi ve aşırı dolum (overflow) önleme yüksek alarm seviyeleri planda netleştirilir.`,
            `Sülfür uyumu kritiktir: ECA bölgesinde %0,10 S, küresel sınır %0,50 S. İkinci Mühendis, alınan yakıtın sefer profiline uygun olduğunu ve mevcut yakıtla karışım (commingling) uyumsuzluğu (incompatibility — çamurlaşma/stability sorunu) yaratmayacağını değerlendirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 14 — Sülfür sınırı",
              text: `Küresel limit %0,50 m/m sülfür (1 Ocak 2020'den beri), ECA içinde %0,10. Uyumsuz yakıt yakılırsa veya scrubber arızalı çalışırsa PSC bulgusu ve ceza doğar. ECA giriş/çıkışta yakıt değişim (changeover) zamanlaması log'a işlenir.`,
            },
          ],
        },
        {
          subheading: "1.2 Pre-transfer toplantı ve checklist",
          paragraphs: [
            `Bunker barç/terminal ile pre-transfer toplantısı yapılır: başlangıç/maksimum debi (pumping rate), topping-up debisi, haberleşme yöntemi (VHF kanal + el işaretleri), acil durdurma (emergency stop) sinyali, hortum bağlantı noktası ve maksimum izin verilen basınç. İkinci Mühendis ve barç temsilcisi Bunkering Safety Checklist'i (ISGOTT esaslı) birlikte imzalar.`,
          ],
          bullets: [
            `Yakıt türü, miktar, debi ve maksimum basınç mutabakatı`,
            `Acil durdurma sinyali ve haberleşme kanalı teyidi`,
            `Hortum/manifold bağlantısı, conta ve blank flange kontrolü`,
            `Yangın söndürme ekipmanı manifold yanında hazır`,
            `Hava şartları ve mooring durumu uygun`,
          ],
        },
      ],
    },
    {
      heading: "2. Çevresel Hazırlık: SOPEP, Scupper, Drip Tray",
      sections: [
        {
          subheading: "2.1 Sıfır kirlilik bariyeri",
          paragraphs: [
            `Bunker öncesi tüm güverte scupper'ları (su firar delikleri) tapalanır/körlenir ki olası sızıntı denize gitmesin. Manifold ve hortum bağlantısı altına drip tray (damlama tavası) yerleştirilir, içine emici (absorbent) konur. SOPEP ekipmanı (emici ped, paçavra, kürek, varil, püskürtme) hazır ve erişilebilir tutulur. Spill kit konumu tüm ekibe bildirilir.`,
            `İkinci Mühendis, scupper plug'larının su birikiminde göllenme/güverte yükü yaratmamasına dikkat eder; yağmur ihtimaline karşı kontrollü tahliye planlanır. Manifold drip tray'i operasyon boyunca düzenli kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bir damla bile denize gitmesin",
              text: `Bunker sırasında deniz yüzeyine yakıt dökülürse derhal akış durdurulur, SOPEP devreye sokulur, liman otoritesi ve şirket bilgilendirilir. ABD sularında ufak bir spill bile yüz binlerce dolar ceza ve seyahat gecikmesi doğurabilir. Kirlilik gizlemek (atlatma) cezayı katlar ve hapis riski getirir.`,
            },
          ],
        },
        {
          subheading: "2.2 Aşırı dolum (overfill) önleme",
          paragraphs: [
            `Tank seviyesi sürekli izlenir (sounding + remote gauge). Yüksek ve çok yüksek (high/high-high) alarmlar test edilmiş olmalıdır. Topping-up aşamasında debi düşürülür; sadece tek tank açık bırakılarak kontrol kolaylaştırılır. Hava firar (vent/sounding pipe) açıklıkları temiz olmalı; tıkalı vent overpressure ve patlak/overflow yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Numune Alımı ve BDN Yönetimi",
      sections: [
        {
          subheading: "3.1 MARPOL numunesi ve ek numuneler",
          paragraphs: [
            `Bunker boyunca sürekli akıştan (drip/continuous drip sampler) MARPOL numunesi alınır; bu numune mühürlenir, etiketlenir ve gemide en az 12 ay (veya kural gereği) saklanır. Ayrıca laboratuvar testi için fuel quality numunesi alınır ve hızlıca ISO 8217 parametreleri (yoğunluk, viskozite, su, sülfür, kül, CCAI, kataliz parçacığı Al+Si, parlama noktası) için gönderilir.`,
            `İkinci Mühendis, numune alma noktasının gemi manifoldu olmasını (barç tarafı değil) sağlar; mühürleme sırasında barç temsilcisi tanık olur ve mühür numaraları BDN'e işlenir. Anlaşmazlıkta bu numune ve mühür zinciri belirleyicidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 18 — BDN ve numune",
              text: `Her bunker için Bunker Delivery Note (BDN) düzenlenir; yakıtın sülfür içeriği ve özellikleri belirtilir. MARPOL temsili numune (representative sample) mühürlenip saklanır. BDN gemide 3 yıl bulundurulur. Eksik BDN/numune PSC bulgusudur.`,
            },
          ],
        },
        {
          subheading: "3.2 Density ve temperature düzeltmesi",
          paragraphs: [
            `Alınan miktar hacim olarak ölçülür; metrik ton dönüşümü için yoğunluk (15°C'de) ve sıcaklık düzeltmesi (ASTM 54B / VCF) gerekir. İkinci Mühendis, barç ölçümleri ile gemi ölçümlerini karşılaştırır; tutarsızlık (short delivery, ısıtma kaynaklı genleşme oyunları) varsa Letter of Protest düzenlenir. Hava cebi (gas pocket / froth) miktarı yapay şişirebilir; bu yüzden öncesinde stabilizasyon beklenir.`,
          ],
          table: {
            caption: `Bunker kabul sırasında izlenen tipik parametreler`,
            headers: ["Parametre", "Tipik referans", "Neden önemli", "Aksiyon eşiği"],
            rows: [
              ["Yoğunluk @15°C", "≤ 991 kg/m³ (RMG)", "Separatör kapasitesi/ton dönüşümü", "991'i aşarsa modern purifier şart"],
              ["Viskozite @50°C", "180–380 cSt (HFO)", "Isıtma/atomizasyon", "Spec dışı → LOP"],
              ["Sülfür", "≤%0,50 / ≤%0,10 ECA", "MARPOL uyumu", "Sınır aşımı → red/LOP"],
              ["Su içeriği", "≤%0,5 v/v", "Yanma/separasyon", ">0,5 → purifier yükü/LOP"],
              ["Parlama noktası", "≥ 60°C", "Yangın emniyeti", "<60 → reddet"],
              ["Al+Si (kedi tozu)", "≤ 60 mg/kg", "Pompa/enjektör aşınması", "Yüksek → separasyon kritik"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Dahili FO/DO Transfer Operasyonları",
      sections: [
        {
          subheading: "4.1 Transfer planı ve valf dizilimi",
          paragraphs: [
            `Storage tanktan settling tanka, oradan service tanka yakıt aktarımı planlı ve gözetimli yapılır. İkinci Mühendis, transfer pompası, ısıtma ve valf dizilimini doğrular; yanlış açık valf bir tankı taşırabilir veya iki farklı kaliteyi istenmeden karıştırabilir (commingling). Transfer sırasında seviye izlenir, tamamlanınca valfler kapatılır ve durum log'a yazılır.`,
            `FO ısıtma, viskozite ve pompalanabilirlik için gereklidir; ancak aşırı ısıtma (pour/flash point yakını) tehlikelidir. Service tank her zaman temiz, separe edilmiş yakıtla beslenir.`,
          ],
        },
        {
          subheading: "4.2 Settling ve service tank yönetimi",
          paragraphs: [
            `Settling tank, su ve katı kalıntının çökmesi için bekletme görevi görür; düzenli drenaj (drain) ile dipteki su/çamur alınır. Service tank, makineye doğrudan besleyen temiz yakıt tankıdır; sürekli purifier ile beslenir ve seviyesi yüksek tutulur. İkinci Mühendis, her iki tankın drenajını ve sıcaklığını rutin kontrol eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Changeover'ı yavaş yap",
              text: `HFO'dan MGO'ya (veya ECA için düşük sülfüre) geçişte sıcaklık ve viskozite kademeli değiştirilir. Ani sıcaklık düşüşü yakıt pompası/enjektör yapışmasına (sticking/seizure) ve viskozite çok düşerse kaçak/aşınmaya yol açar. Changeover prosedürü ve zamanı log'a işlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Purifier (Separatör) İşletimi",
      sections: [
        {
          subheading: "5.1 Çalışma prensibi ve throughput",
          paragraphs: [
            `Santrifüj separatör, yoğunluk farkıyla yakıttan su ve katı kalıntıyı ayırır. Verimli ayrım için besleme sıcaklığı doğru (HFO için tipik 98°C), debi (throughput) düşük (yoğunluk yüksekse daha düşük debi) ve gravity disc (modern clarifier'larda otomatik su deşarjı) doğru seçilmiş olmalıdır. İkinci Mühendis, ayrım kalitesini (ayrılan su/çamur ve çıkış berraklığı) izler.`,
            `Modern separatörler purifier/clarifier modunda otomatik su izleme ve self-cleaning (sludge discharge) yapar. Seri (iki ünite) çalıştırma ağır yakıtlarda (yüksek yoğunluk/su) ayrım güvenliğini artırır.`,
          ],
          table: {
            caption: `HFO separasyon işletim kılavuzu (maker manual esastır)`,
            headers: ["Parametre", "Tipik değer", "Sapmanın etkisi"],
            rows: [
              ["Besleme sıcaklığı", "~98°C (HFO)", "Düşükse su/çamur ayrımı zayıflar"],
              ["Throughput", "Nominal kapasitenin %50–70'i", "Yüksekse ayrım kalitesi düşer"],
              ["Self-clean aralığı", "1–4 saatte bir", "Geç olursa bowl tıkanır, ayrım bozulur"],
              ["Bowl overhaul", "4.000–8.000 saat", "Geç olursa balans/titreşim/sızıntı"],
            ],
          },
        },
        {
          subheading: "5.2 Bakım, arıza ve emniyet",
          paragraphs: [
            `Separatör overhaul'da bowl, conta ve O-ring setleri yenilenir; bowl montaj sırası ve balans kritiktir (yanlış montaj titreşim ve kaza yaratır). Su seal kaybı (broken water seal) yakıtın denize/sludge'a kaçmasına; kötü ayrım ise ana makineye su/katı gitmesine yol açar. İkinci Mühendis, separatör titreşim ve sızıntısını günlük izler.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — kötü ayrılmış yakıt",
              text: `Yüksek kediotu (cat fines, Al+Si) içeren bir yakıt yetersiz separe edildiğinde, partiküller yakıt pompası ve enjektörü zımpara gibi aşındırdı; birkaç ay içinde liner/ring scuffing başladı. Ders: yoğunluk/cat fines yüksekse debi düşürülür, seri çalıştırılır ve scrape-down/yağ analizi sıklaştırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Yağlama Yağı (LO) Yönetimi",
      sections: [
        {
          subheading: "6.1 LO tüketim takibi ve top-up",
          paragraphs: [
            `Ana makine sistem yağı (sump), cylinder yağı, jeneratör yağı ve dişli/türboşarj yağları ayrı izlenir. İkinci Mühendis, günlük tüketimi ve sump seviyesini takip eder; aşırı tüketim sızıntı, yanma (blow-by) veya kontaminasyon işaretidir. Top-up (takviye) planı ROB ve sefer süresine göre yapılır; LO bunkeri (drum veya bulk) zamanında talep edilir.`,
            `Sistem yağı periyodik analiz edilir (viskozite, BN/TBN, su, aşınma metalleri). Su veya yakıt kontaminasyonu, soğutucu kaçağı veya pis yanma işaretidir; ana makine LO separatörü (purifier) sürekli devrede tutularak su/kalıntı alınır.`,
          ],
          bullets: [
            `Günlük sump seviyesi ve tüketim trend takibi`,
            `LO purifier devamlı işletimi (su ve katı alımı)`,
            `Periyodik LO analizi: BN, su, aşınma metalleri`,
            `Doğru yağ tipinin (sistem/silindir BN'i) kullanımı`,
            `Top-up ROB ve sefer süresine göre planlanır`,
          ],
        },
        {
          subheading: "6.2 Cylinder yağı feed rate koordinasyonu",
          paragraphs: [
            `Cylinder lub feed rate (g/kWh), yakıt sülfür içeriği ve yüke göre ayarlanır; düşük sülfürlü yakıtta yüksek BN yağ aşırı kalıntı, yüksek sülfürlü yakıtta düşük BN korozyon yaratır. Bu ayar genelde scrape-down analizi ile birlikte yürütülür (ilgili görev bölümüne bakınız). İkinci Mühendis, feed rate ile yakıt kalitesi arasındaki dengeyi gözetir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Yakıt Kalitesi Uyuşmazlığı ve Off-Spec Yönetimi",
      sections: [
        {
          subheading: "7.1 Off-spec yakıt tespit edilirse",
          paragraphs: [
            `Laboratuvar sonucu spec dışı (yüksek su, cat fines, düşük flash point, stabilite sorunu) gelirse İkinci Mühendis derhal Baş Mühendise bilgi verir; mümkünse o yakıt karantinaya alınır (kullanılmaz), tedarikçiye Letter of Protest/claim açılır ve şirket teknik departmanı devreye girer. Zorunlu kullanım gerekirse separasyon yoğunlaştırılır ve ekipman yakından izlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Düşük flash point — yangın riski",
              text: `Parlama noktası 60°C altındaki yakıt depolanması/kullanımı patlama riski taşır ve MARPOL/SOLAS ihlalidir. Böyle bir yakıt tespit edilirse kullanılmaz; tedarikçiye iade/claim ve otoriteye bildirim süreci işletilir.`,
            },
          ],
        },
        {
          subheading: "7.2 Karışım (commingling) ve stabilite",
          paragraphs: [
            `Farklı kaynaklı yakıtların karışımı çökme/çamurlaşma (asfalten ayrışması) yaratabilir. İkinci Mühendis, mümkünse yeni yakıtı ayrı tankta tutar; karışım kaçınılmazsa uyum (compatibility) testi yaptırır. Stabilitesi bozulan yakıt filtre/purifier'ı tıkar ve besleme kaybına yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Oil Record Book ve Kayıt",
      sections: [
        {
          subheading: "8.1 ORB Part I kayıtları",
          paragraphs: [
            `Bunker, dahili transfer, separatör sludge, settling tank drenajı ve yakıt operasyonlarının ilgili olanları Oil Record Book Part I'e işlenir. Kayıtlar tarih, tank, miktar ve operasyon koduyla, eksiksiz ve zamanında tutulur. İkinci Mühendis kayıtların doğruluğunu Baş Mühendis ile birlikte gözetir; ORB tutarsızlığı en sık PSC/USCG bulgularından biridir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ORB — doğruluk ve imza zinciri",
              text: `Her giriş ilgili mühendis tarafından imzalanır, sayfa kaptan tarafından onaylanır. Sahte/eksik ORB ABD'de "magic pipe" davalarında milyonlarca dolar ceza ve hapisle sonuçlanmıştır. Kayıt gerçeği yansıtmalı; düzeltme tek çizgiyle, imzalı yapılır.`,
            },
          ],
        },
        {
          subheading: "8.2 BDN, numune ve sülfür kayıtları",
          paragraphs: [
            `BDN'ler ve MARPOL numuneleri kurala uygun süre saklanır; ECA giriş/çıkış changeover saat/konumu ayrı log'a işlenir. Bu kayıtlar hem MARPOL Annex VI uyumunun hem de yakıt anlaşmazlığının kanıtıdır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 İkinci Mühendisin yakıt/yağ operasyon checklist'i",
          bullets: [
            `Bunker planı, tank dağılımı ve overflow alarmları hazır mı?`,
            `Scupper'lar kapalı, drip tray ve SOPEP ekipmanı hazır mı?`,
            `Pre-transfer toplantı + Bunkering Safety Checklist imzalandı mı?`,
            `Acil durdurma sinyali ve haberleşme teyit edildi mi?`,
            `MARPOL numunesi mühürlendi, BDN sülfür/özellik doğru mu?`,
            `Density/temperature düzeltmesi yapıldı, miktar mutabakatı sağlandı mı?`,
            `Settling/service tank drenajı ve separatör ayrım kalitesi izlendi mi?`,
            `LO tüketimi, sump seviyesi ve top-up planı güncel mi?`,
            `Off-spec/uyumsuzluk için karantina+LOP süreci hazır mı?`,
            `ORB Part I ve BDN kayıtları eksiksiz ve imzalı mı?`,
          ],
          paragraphs: [
            `Yakıt ve yağ operasyonları, makine dairesinin hem çevresel hem teknik açıdan en hassas işidir. Disiplinli hazırlık, sürekli gözetim ve dürüst kayıt; bir yandan deniz kirliliğini ve ağır cezaları önler, diğer yandan ana makineyi düşük kaliteli yakıtın aşındırıcı etkisinden korur. İkinci Mühendisin bu alandaki titizliği, geminin hem çevresel sicilini hem de makine ömrünü doğrudan belirler.`,
          ],
        },
      ],
    },
  ],
};

export default content;
