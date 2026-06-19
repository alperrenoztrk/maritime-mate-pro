import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Meteoroloji takibi ve weather routing",
  roleSlug: "ikinci-zabit",
  taskIndex: 3,
  estimatedPages: 26,
  intro: `İkinci Zabit, sefer süresince meteorolojik durumun sürekli izlenmesi ve değerlendirilmesinden büyük ölçüde sorumludur. NAVTEX, weather fax (radyofaks), Inmarsat EGC/SafetyNET hava mesajları ve sinoptik haritaların analizi; ağır hava koşullarına karşı erken uyarı, rota alternatifi önerisi ve heavy weather preparation planının uygulanmasına destek bu görevin merkezindedir. Bu bölüm; basınç sistemlerinin okunmasından weather routing prensiplerine, tropikal fırtına kaçınmasından gemi-özgü hız/rota kararlarına kadar pratik bir çerçeve sunar. Nihai rota kararı her zaman kaptana aittir; İkinci Zabit veri toplar, analiz eder ve gerekçeli öneri hazırlar.`,
  sources: [
    "SOLAS Chapter V, Regulation 5 — Meteorological Services and Warnings",
    "SOLAS Chapter V, Regulation 31/32 — Danger Messages",
    "WMO No. 471 — Marine Meteorology and Related Oceanographic Activities",
    "IMO MSC.1/Circ.1228 — Guidance on Heavy Weather Damage Avoidance",
    "Admiralty List of Radio Signals NP283(2) — Meteorological Observation Stations",
    "Meteorology for Mariners (Met Office) / Marine Observer's Handbook",
    "The Mariner's Handbook (NP100)",
    "WMO Manual on Marine Meteorological Services (No. 558)",
  ],
  chapters: [
    {
      heading: "1. Deniz Meteorolojisinin Yasal ve Operasyonel Çerçevesi",
      lead: `Hava takibi bir konfor değil, can ve mal emniyetinin temelidir. Parametric rolling, synchronous rolling, deck cargo kaybı ve yapısal hasarların çoğu, hava penceresinin yanlış değerlendirilmesinden doğar.`,
      sections: [
        {
          subheading: "1.1 SOLAS V/5 ve hava uyarısı yükümlülüğü",
          paragraphs: [
            `SOLAS Chapter V Regulation 5, akit devletleri hava uyarısı, sinoptik analiz ve tahmin sağlamakla; gemileri ise bu bilgiyi almak ve değerlendirmekle yükümlü kılar. İkinci Zabit, geminin içinde bulunduğu METAREA için yayınlanan gale/storm warning'leri almayı ve köprüüstüne aktarmayı güvence altına alır.`,
            `Regulation 31/32 ise gemi kaptanına, tropikal fırtına, tehlikeli buz, sub-freezing hava ve Beaufort 10+ rüzgar gibi tehlikeleri çevredeki gemilere ve otoritelere bildirme (danger message) yükümlülüğü getirir. İkinci Zabit, gerekli gözlem ve raporlamayı hazırlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/31 — Danger Messages",
              text: `Tehlikeli buz, terk edilmiş enkaz, tropikal fırtına veya Beaufort 10 üzeri beklenmedik rüzgar gözlemleyen kaptan, bunu çevredeki gemilere ve ilk uygun otoriteye bildirmek zorundadır. Bu yükümlülük ihmal edilemez.`,
            },
          ],
        },
        {
          subheading: "1.2 Gemi-özgü hassasiyet ve eşik değerler",
          paragraphs: [
            `Her gemi hava koşullarına farklı tepki verir; container gemisi parametric rolling'e, bulk carrier deck flooding'e, tanker green water'a, ro-ro list ve cargo shift'e daha duyarlıdır. İkinci Zabit, şirketin/gemi tipinin belirlediği rüzgar, dalga yüksekliği (Hs), dalga periyodu ve swell yönü eşiklerini bilir ve tahminleri bu eşiklere göre yorumlar.`,
            `Wave encounter period ile geminin natural roll period'unun çakışması (resonance) tehlikelidir. İkinci Zabit, swell yönü ve periyoduna göre hangi heading/hız kombinasyonunun rezonanstan kaçındığını değerlendirerek öneri hazırlar.`,
          ],
        },
      ],
    },
    {
      heading: "2. Veri Kaynakları: NAVTEX, Weather Fax, EGC",
      sections: [
        {
          subheading: "2.1 NAVTEX ve EGC hava mesajları",
          paragraphs: [
            `NAVTEX (518/490/4209.5 kHz), kıyıya yakın bölgelerde gale warning, storm warning ve forecast yayınlar (kategori B = met warning, E = met forecast). Açık denizde, NAVTEX kapsamı dışında, Inmarsat EGC/SafetyNET aynı METAREA bilgisini sağlar. İkinci Zabit, her iki kaynağın doğru bölgeye programlı olduğunu doğrular.`,
            `Mesajlar genelde standart bir yapı izler: warning tipi, etkilenen alan, sistem konumu/hareketi, beklenen rüzgar ve deniz durumu. İkinci Zabit bu mesajları passage plan üzerine yansıtır ve kritik olanları kaptan ile vardiya zabitlerine iletir.`,
          ],
        },
        {
          subheading: "2.2 Weather fax ve sayısal grib/GMDSS olmayan kaynaklar",
          paragraphs: [
            `Weather fax (HF radyofaks), sinoptik yüzey analizi, 24/48/72/96 saatlik tahmin haritaları, dalga (wave height/period) ve buz haritaları sağlar. Modern gemiler ek olarak ticari weather routing servisleri (shore-based) ve GRIB tabanlı sayısal tahminleri de kullanır.`,
            `İkinci Zabit, farklı kaynakların tutarlılığını çapraz kontrol eder; iki bağımsız tahmin aynı sistemi farklı konumda gösteriyorsa, daha temkinli (kötü) senaryoya göre planlama yapılır. Tek kaynağa körü körüne güvenmek tehlikelidir.`,
          ],
          table: {
            caption: `Başlıca Hava Veri Kaynakları ve Kullanımı`,
            headers: ["Kaynak", "Kapsam", "İçerik", "Periyot"],
            rows: [
              ["NAVTEX", "Kıyı ~ 300 NM", "Gale/storm warning, forecast", "Otomatik / planlı"],
              ["EGC SafetyNET", "Açık deniz (METAREA)", "Warning + forecast", "Planlı yayın"],
              ["Weather fax", "Bölgesel/global", "Sinoptik + dalga haritası", "Günde birkaç kez"],
              ["Routing servisi", "Sefer bazlı", "Önerilen rota + tahmin", "Günlük güncelleme"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Sinoptik Harita Analizi",
      sections: [
        {
          subheading: "3.1 Basınç sistemleri ve izobar okuma",
          paragraphs: [
            `Sinoptik yüzey haritasında izobarlar (eş basınç çizgileri), basınç sistemlerini ve rüzgar dağılımını gösterir. İzobarların sıklaşması (pressure gradient artışı) kuvvetli rüzgar demektir. İkinci Zabit; alçak basınç (depression/low) merkezlerini, yüksek basınç (anticyclone/high) sırtlarını, sıcak/soğuk cepheleri ve oklüzyonları ayırt eder.`,
            `Kuzey yarımkürede rüzgar, alçak basınç etrafında saat tersine ve içe doğru, yüksek basınç etrafında saat yönünde ve dışa doğru eser (güney yarımkürede tersi). Buys Ballot kuralı: kuzey yarımkürede rüzgarı arkana al, alçak basınç soluna düşer. Bu, fırtına merkezinin yönünü saptamada temel araçtır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Buys Ballot kuralı",
              text: `Kuzey yarımkürede gerçek rüzgar arkanıza geldiğinde alçak basınç sol elinizin biraz önünde, güney yarımkürede sağ elinizin önündedir. Basınç eğilimiyle birleştirilince fırtına merkezinin gemiye göre konumu ve hareketi tahmin edilebilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Tahmin haritaları ve sistemin hareketi",
          paragraphs: [
            `24/48/72 saatlik prognostik haritalar, sistemin tahmini hareketini gösterir. İkinci Zabit, geminin planlanan pozisyonu ile sistemin tahmini pozisyonunu zaman ekseninde üst üste koyarak (time-space diagram) gemiyi en kötü kadran ile karşılaştırır.`,
            `Hızlı derinleşen alçak basınç (bomb cyclogenesis — 24 saatte ≥24 hPa düşüş) çok tehlikelidir; ani ve şiddetli rüzgar/deniz üretir. İkinci Zabit, basınç eğilimini barometre/barograf ile sürekli izleyerek tahminlerin gerçekleşip gerçekleşmediğini doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "4. Dalga, Swell ve Deniz Durumu",
      sections: [
        {
          subheading: "4.1 Sea ve swell ayrımı, significant wave height",
          paragraphs: [
            `Toplam deniz durumu; lokal rüzgarın ürettiği "sea" ile uzaktaki bir sistemden gelen "swell"in bileşimidir. Significant wave height (Hs), en yüksek üçte birin ortalamasıdır; tekil maksimum dalga Hs'in yaklaşık 1.8-2 katına ulaşabilir. İkinci Zabit bu istatistiği yorumlarken "rogue wave" olasılığını ihmal etmez.`,
            `Swell yönü ve periyodu, geminin rezonansa girip girmeyeceğini belirler. Uzun periyotlu swell (örn. 12-16 sn) ile geminin roll period'unun çakışması, görece düşük dalga yüksekliğinde bile tehlikeli yalpa üretebilir.`,
          ],
          table: {
            caption: `Beaufort / Deniz Durumu Hızlı Referans (Yaklaşık)`,
            headers: ["Beaufort", "Rüzgar (kn)", "Tanım", "Tipik Hs"],
            rows: [
              ["6", "22-27", "Strong breeze", "2-3 m"],
              ["8", "34-40", "Gale", "5-7.5 m"],
              ["10", "48-55", "Storm", "9-12.5 m"],
              ["12", "≥64", "Hurricane force", "≥14 m"],
            ],
          },
        },
        {
          subheading: "4.2 Tehlikeli yalpa modları",
          paragraphs: [
            `Parametric rolling (özellikle container gemilerinde, head/following sea'de), synchronous rolling (beam sea'de roll period dalga periyoduyla çakışınca), ve broaching (following sea'de dümen kontrolü kaybı) ana tehlikelerdir. IMO MSC.1/Circ.1228, bu durumlardan kaçınmak için hız ve heading değişimi tavsiye eder.`,
            `İkinci Zabit, swell verisi ile gemi roll period'unu kıyaslayarak hangi heading/hız kombinasyonunun tehlikeli olduğunu kaptan brifinginde sunar. Genel ilke: rezonans bölgesinden çıkmak için ya hız değiştir ya heading değiştir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Parametric rolling — sessiz ama yıkıcı",
              text: `Container gemilerinde head/following sea'de parametric rolling dakikalar içinde 30°+ yalpaya ulaşabilir; lashing kuvvetleri aşılır ve container yığınları çöker. Tek savunma, swell periyodunu izleyip rezonanstan çıkacak şekilde hız/heading değiştirmektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Weather Routing Prensipleri",
      sections: [
        {
          subheading: "5.1 Least-time / least-damage route",
          paragraphs: [
            `Weather routing; en kısa mesafe yerine, hava ve deniz koşullarını dikkate alarak en hızlı (least-time) veya en az hasar/risk (least-damage) rotayı seçer. İkinci Zabit, ship's speed loss curve'ünü (dalga/rüzgara karşı hız kaybı) ve gemi-özgü kısıtları kullanarak alternatif rotaları karşılaştırır.`,
            `Shore-based routing servisi öneri sağlasa da, son karar gemi ekibine aittir; servis gemi-özgü hassasiyetleri ve gerçek zamanlı yük durumunu bilmez. İkinci Zabit, servis önerisini bağımsız analizle teyit eder veya gerekçeli olarak reddeder.`,
          ],
        },
        {
          subheading: "5.2 Hız ayarı, voluntary speed reduction",
          paragraphs: [
            `Bazen en güvenli karar, fırtınanın geçmesini beklemek için hızı azaltıp (heave to / riding out) veya rotayı kaydırıp sistemin önünden/arkasından geçmektir. İkinci Zabit, ETA baskısı ile emniyet arasındaki dengeyi kaptana net biçimde sunar; ticari baskı asla emniyetin önüne geçmemelidir.`,
            `Voluntary speed reduction, sadece hava değil yapısal yorulma (slamming, green water) ve yakıt verimliliği açısından da değerlendirilir. CII/EEXI çağında düşük hız hem emniyet hem çevre için avantaj sağlayabilir, ancak hava emniyeti her zaman önceliklidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — El Faro (2015)",
              text: `Konteyner/ro-ro gemisi El Faro, Joaquin Kasırgası'nın gelişimini yetersiz değerlendirip rotada kaldı, makine arızası + list ile battı, 33 kişi öldü. NTSB; eski hava verisine güvenmeyi ve fırtına gelişimini takip etmemeyi başlıca neden gösterdi. Ders: hava verisi sürekli güncellenmeli, en kötü senaryoya göre erken karar verilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Tropikal Fırtına (TRS) Kaçınması — Temeller",
      sections: [
        {
          subheading: "6.1 Dangerous / navigable semicircle",
          paragraphs: [
            `Tropical revolving storm (TRS), fırtına merkezinin etrafında dönen yıkıcı bir sistemdir. Kuzey yarımkürede merkezin sağ tarafı "dangerous semicircle" (rüzgar gemiyi merkeze doğru iter), sol tarafı "navigable semicircle"dır. İkinci Zabit, geminin hangi yarım dairede olduğunu rüzgar yönü ve değişimine göre belirler.`,
            `Bu konunun tam ayrıntısı (1-2-3 kuralı, JMA/NHC/JTWC raporları, manevra yönleri) "Tropical Revolving Storm ve typhoon avoidance" görevinde ele alınır; burada İkinci Zabit'in günlük takip içinde erken teşhis kabiliyeti vurgulanır.`,
          ],
          table: {
            caption: `TRS Erken Uyarı İşaretleri`,
            headers: ["İşaret", "Anlamı"],
            rows: [
              ["Barometre 3 hPa+ düşüş (düzeltilmiş)", "Yaklaşan TRS olasılığı"],
              ["Uzun, yüksek swell (alışılmadık yön)", "Uzaktaki fırtına"],
              ["Cirrus/altostratus artışı, halo", "Sistemin ön bulutluluğu"],
              ["Rüzgar yönünde belirgin değişim", "Yarım daire konumu"],
            ],
          },
        },
        {
          subheading: "6.2 Erken teşhis ve raporlama",
          paragraphs: [
            `İkinci Zabit, barometre eğilimini (mevsim/coğrafyaya göre düzeltilmiş), swell yönündeki anormallikleri ve bulut paternlerini birlikte değerlendirerek TRS'i resmî uyarı gelmeden önce sezebilir. Bu erken teşhis, kaçınma için ek saatler kazandırır.`,
            `TRS sezildiğinde gözlemler (basınç, rüzgar, swell, pozisyon) danger message olarak raporlanır ve kaptan bilgilendirilir. Mevsimsel TRS riski olan bölgelerde (Hint Okyanusu, Pasifik, Atlantik) takip yoğunlaştırılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Mariner's 1-2-3 Rule",
              text: `Tahmin belirsizliğini kapsamak için 24/48/72 saatte sırasıyla 100/200/300 NM emniyet payı eklenir. Detaylı uygulama TRS avoidance bölümünde; günlük takipte bu pay, fırtınadan ne kadar uzakta kalınacağını planlamanın temelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Ağır Hava Hazırlığı (Heavy Weather Preparation)",
      sections: [
        {
          subheading: "7.1 Güverte ve yük hazırlığı",
          paragraphs: [
            `Ağır hava beklendiğinde, fırtına gelmeden önce hazırlık tamamlanmalıdır: lashing kontrolü ve sıkma, güverte ekipmanının sabitlenmesi, hatch cover ve weathertight kapakların dogged (kilitli) olması, freeing port (su tahliye delikleri) açıklığı, anchor securing ve sounding pipe kapakları. İkinci Zabit bu kontrol listesini Birinci Zabit ile koordine eder.`,
            `İç mekanlarda gevşek eşyaların sabitlenmesi, mürettebata güvenli hareket talimatı ve güverteye çıkış kısıtı (green water riski) gibi önlemler kaptan talimatıyla uygulanır. Hazırlık fırtına başladıktan sonra yapılamaz; zamanlama kritiktir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO MSC.1/Circ.1228 — Heavy Weather Avoidance",
              text: `Bu sirküler, master ve watchkeeping officer'lara dangerous wave conditions'tan (parametric/synchronous rolling, broaching) kaçınmak için hız ve heading ayarı rehberi sunar. Hazırlık ve manevra kararları bu çerçevede alınır.`,
            },
          ],
        },
        {
          subheading: "7.2 Manevra ve seyir önlemleri",
          paragraphs: [
            `Fırtınada heave to (rüzgara karşı minimum hızla durma), running before the sea (denizi kıçtan alma) veya rota kaydırma kararları gemi tipine ve denizin yönüne göre verilir. İkinci Zabit, dümen/sevk kabiliyetini koruyacak minimum steerage way'i ve slamming/racing risklerini değerlendirir.`,
            `Vardiya zabiti, ağır havada pozisyon doğrulamayı sürekli sürdürür; set & drift (akıntı ve rüzgar kaynaklı sapma) artar, leeway büyür. Karaya/sığlığa yakın bölgelerde bu sapma tehlikeli olabilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Gözlem, Raporlama ve Veri Bütünlüğü",
      sections: [
        {
          subheading: "8.1 Gemi hava gözlemleri (VOS)",
          paragraphs: [
            `Pek çok gemi Voluntary Observing Ship (VOS) programına katkı sunar; basınç, rüzgar, sıcaklık, deniz durumu ve görüş gözlemleri standart formatta raporlanır. İkinci Zabit, gözlem aletlerinin (barometre, anemometre, termometre) kalibrasyonunu ve okuma doğruluğunu izler.`,
            `Doğru gözlem, hem küresel tahmin modellerini besler hem de geminin kendi kısa vadeli tahminini iyileştirir. Hatalı kalibre edilmiş bir barometre, basınç eğilimi analizini yanıltarak TRS teşhisini geciktirebilir.`,
          ],
        },
        {
          subheading: "8.2 Köprüüstü ekibine aktarım",
          paragraphs: [
            `İkinci Zabit'in hava analizi, ancak köprüüstü ekibine ve kaptana net biçimde aktarıldığında değer kazanır. Günlük weather brief; mevcut durum, 24/48 saat tahmini, kritik eşikler ve önerilen önlemleri içermelidir. Belirsizlik varsa açıkça belirtilir.`,
            `Vardiya devrinde hava durumu, beklenen değişimler ve çağrılma kriterleri aktarılır. Hava bilgisi tek bir kişinin kafasında kalırsa, o kişi nöbette değilken risk gözden kaçar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Sık görülen hatalar",
          paragraphs: [
            `En yaygın hatalar; eski/tek hava verisine güvenmek, swell-roll rezonansını hesaba katmamak, ETA baskısıyla fırtınaya doğru ilerlemek, hazırlığı geç başlatmak ve significant wave height'i maksimum dalga sanmaktır.`,
            `Bir diğer hata, routing servisi önerisini gemi-özgü hassasiyetleri sorgulamadan uygulamaktır. Servis öneri verir; gemiyi tanıyan ekiptir. Kör itaat de, körü körüne reddetmek kadar tehlikelidir.`,
          ],
        },
        {
          subheading: "9.2 Vaka dersleri",
          paragraphs: [
            `El Faro (2015): kasırga gelişimini yetersiz takip, eski veri, geç karar → gemi kaybı. Ders: hava verisini sürekli güncelle, en kötü senaryoya göre erken davran.`,
            `Birçok container kaybı vakası (parametric/synchronous rolling): swell periyodu izlenmeden head/following sea'de yüksek hızda seyir → yığın çökmesi. Ders: swell-roll rezonansını sürekli değerlendir, gerektiğinde hız/heading değiştir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Ağır hava güverte hasarı",
              text: `Geç başlatılan heavy weather preparation nedeniyle güvertede sabitlenmemiş ekipman fırtınada hasar gördü ve bir mürettebat yaralandı. MAIB benzeri raporlar, hazırlığın fırtına başlamadan tamamlanmasının kritikliğini vurgular.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in hava takibi checklist'i",
          bullets: [
            `NAVTEX/EGC doğru METAREA'ya programlı, warning'ler izleniyor mu?`,
            `Weather fax / routing verisi güncel ve çapraz kontrol edildi mi?`,
            `Sinoptik harita ile sistem hareketi gemi pozisyonuna göre değerlendirildi mi?`,
            `Swell yönü/periyodu ile roll period rezonansı kontrol edildi mi?`,
            `Significant wave height doğru yorumlandı (max dalga ≈ 1.8-2x Hs)?`,
            `TRS sezgisi için barometre eğilimi, swell, bulut izleniyor mu?`,
            `Ağır hava hazırlığı fırtınadan önce başlatıldı mı?`,
            `Hız/heading önerisi MSC.1/Circ.1228'e göre hazırlandı mı?`,
            `Gözlem aletleri kalibre, VOS raporları doğru mu?`,
            `Hava brifingi ve çağrılma kriterleri ekibe aktarıldı mı?`,
          ],
          paragraphs: [
            `Hava takibi, geminin ne zaman gideceğini değil, ne zaman beklemesi gerektiğini söyleyen disiplindir. İkinci Zabit'in görevi sadece tahmin okumak değil; veriyi gemi-özgü hassasiyetlere çevirmek, en kötü senaryoyu erken görmek ve kaptana net, gerekçeli öneri sunmaktır. İyi hava takibi, fırtınayı atlatmaktan çok ona hiç girmemeyi sağlar; bu da en güçlü emniyet stratejisidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
