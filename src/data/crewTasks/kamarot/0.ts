import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yaşam mahalli temizliği ve düzeni",
  roleSlug: "kamarot",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Kamarot (Steward / Messman), gemideki yaşam mahallinin (accommodation) günlük temizliğinden, hijyeninden ve düzeninden sorumlu personeldir. Kamaralar, koridorlar, messhall, dayroom, ofisler, merdiven kovaları ve ortak sıhhi tesisatın temizliği; yatak yapımı, çarşaf-havlu değişimi, çöp toplama ve yüzey dezenfeksiyonu bu görevin çekirdeğini oluşturur. Bu bölüm; MLC 2006 yaşam koşulları standartlarına, gemi hijyen prensiplerine ve denetim (PSC/MLC inspection) beklentilerine uygun olarak kamarotun sistematik temizlik metodolojisini adım adım açıklar. Temizlik, sadece estetik değil; enfeksiyon kontrolü, yangın emniyeti ve mürettebat refahının doğrudan parçasıdır.`,
  sources: [
    "MLC 2006 (Maritime Labour Convention) Regulation 3.1 — Accommodation and Recreational Facilities",
    "MLC 2006 Standard A3.1 (3) — Cleanliness and Maintenance of Accommodation",
    "ILO/WHO Guide to Ship Sanitation (WHO, 3rd Edition)",
    "SOLAS Chapter II-2 — Fire Protection (escape routes, fire doors)",
    "ISM Code — Safety Management System housekeeping procedures",
    "Ship's Cook and Catering Standards — Code of Practice (UK MCA / MGN serisi)",
    "WHO International Health Regulations (IHR 2005) — vessel sanitation",
  ],
  chapters: [
    {
      heading: "1. Yaşam Mahalli ve Kamarotun Sorumluluk Alanı",
      lead: `Kamarotun temizlik sorumluluğu geminin "yaşanan" kısmını kapsar: barınma, dinlenme, beslenme ve sıhhi alanlar. Bu alanların standardı, MLC denetiminde geminin insan onuruna uygun işletildiğinin somut göstergesidir.`,
      sections: [
        {
          subheading: "1.1 Sorumluluk haritası ve günlük rota",
          paragraphs: [
            `Kamarot, vardiyaya başlamadan önce sorumluluk alanını net bir "temizlik rotası" haline getirir. Tipik bir rota; subay/zabit kamaralarından (officer cabins) başlar, koridor ve merdivenlerle devam eder, messhall ve pantry'yi kapsar, ardından ortak tuvalet/duş (common sanitary) ve dayroom/recreation room ile sonlanır. Çapraz kontaminasyonu önlemek için temiz alanlardan kirli alanlara (kamara → tuvalet) doğru ilerlemek temel ilkedir; asla ters yön çalışılmaz.`,
            `Görev dağılımında genellikle subay yaşam mahalli ile tayfa yaşam mahalli farklı standart ve sıklıkta tutulur, ancak hijyen düzeyi her ikisinde de eşit olmalıdır. Kaptan, Birinci Zabit ve makine başmühendisinin kamaraları ile ortak alanlar günlük; bazı tayfa kamaraları haftalık derin temizlik (deep clean) programına alınabilir. Kamarot bu programı bir checklist üzerinden takip eder ve imzalayarak kayıt altına alır.`,
          ],
          bullets: [
            `Officer cabins ve ortak alanlar: günlük temizlik`,
            `Messhall, pantry, dayroom: günlük (öğün sonrası dahil)`,
            `Ortak tuvalet/duş: günde en az iki kez dezenfeksiyon`,
            `Koridor, merdiven, çıkış kapıları: günlük`,
            `Derin temizlik (perde, panjur, havalandırma ızgarası): haftalık/aylık`,
          ],
        },
        {
          subheading: "1.2 MLC 2006 kapsamında yaşam mahalli standardı",
          paragraphs: [
            `MLC 2006 Regulation 3.1, gemideki yaşam ve dinlenme alanlarının "decent" (insana yakışır) standartta olmasını ve sürekli temiz, sağlıklı tutulmasını şart koşar. Standard A3.1, akredite bir görevlinin (genellikle kaptan veya yetkilendirdiği zabit) düzenli aralıklarla yaşam mahallini denetlemesini ve sonuçların kayıt altına alınmasını ister. Kamarot, bu denetimin sahadaki uygulayıcısıdır; temizlik kalitesi doğrudan MLC uygunluğunu belirler.`,
            `Flag state ve PSC denetiminde kirli kamara, küflenmiş duş, tıkalı drenaj, kötü havalandırma veya haşere izi doğrudan deficiency (bulgu) olarak yazılır ve ciddi vakalarda geminin tutulmasına (detention) kadar gidebilir. Bu nedenle kamarotun işi "kozmetik" değil, mevzuat uyumunun ön cephesidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Standard A3.1(3)",
              text: `Yaşam mahalli temiz, yaşanabilir durumda ve iyi onarılmış tutulmalıdır. Yetkili kişi tarafından düzenli aralıklarla yapılan denetimler kayıt altına alınır ve kayıtlar denetimde sunulabilir olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Temizlik Ekipmanı, Kimyasallar ve Renk Kodlaması",
      sections: [
        {
          subheading: "2.1 Temel ekipman ve bakımı",
          paragraphs: [
            `Kamarotun temel ekipmanı; mikrofiber bez seti, paspas ve kova sistemi (tercihen iki kovalı: temiz/kirli su ayrımı), süpürge, elektrikli süpürge (vacuum), cam çekçeği (squeegee), fırça seti, çöp arabası ve kişisel koruyucu donanımdır (eldiven, önlük, gerektiğinde maske). Ekipmanın kendisi de hijyen kaynağıdır: kirli bez ve paspas, bakteri taşıyıcısına dönüşür. Bez ve paspas başlıkları her kullanım sonrası yıkanır, kurutulur ve nemli kapalı dolaplarda küflenmeye bırakılmaz.`,
            `Elektrikli süpürge filtresi düzenli temizlenir; tıkalı filtre hem performansı düşürür hem de toz ve alerjeni geri yayar. Kova ve fırçalar haftalık dezenfekte edilir. Ekipman, temizlik dolabında (cleaning locker) düzenli ve etiketli tutulur; bu dolap denetimde kontrol edilen alanlardandır.`,
          ],
        },
        {
          subheading: "2.2 Renk kodlu temizlik sistemi (cross-contamination önleme)",
          paragraphs: [
            `Profesyonel gemi temizliğinde renk kodlu sistem (colour-coded cleaning) çapraz bulaşmayı önlemenin standart yöntemidir. Tuvalet için kullanılan bez, asla mutfak tezgahında veya yemek masasında kullanılmaz. Bu ayrım, norovirus ve diğer fekal-oral patojenlerin yayılmasını engelleyen birincil bariyerdir.`,
            `Sistem basittir ve hatırlaması kolaydır: her bölge bir renge atanır, bezler-kovalar-eldivenler o renkle tutulur. Personel değişiminde bile sistem süreklilik kazanır. Kamarot bu disiplini istisnasız uygular.`,
          ],
          table: {
            caption: `Renk Kodlu Temizlik Sistemi (yaygın endüstri standardı)`,
            headers: ["Renk", "Kullanım Alanı", "Risk Düzeyi"],
            rows: [
              ["Kırmızı", "Tuvalet ve klozet iç yüzeyleri", "Yüksek (fekal)"],
              ["Sarı", "Lavabo, duş, banyo yüzeyleri", "Orta-yüksek"],
              ["Mavi", "Genel yüzey: kamara, koridor, ofis", "Düşük"],
              ["Yeşil", "Pantry, messhall, gıda temas alanları", "Gıda hijyeni"],
            ],
          },
        },
        {
          subheading: "2.3 Kimyasal kullanımı ve SDS bilinci",
          paragraphs: [
            `Her temizlik kimyasalının bir Safety Data Sheet (SDS) bilgisi vardır ve kamarot kullandığı ürünün seyreltme oranını, temas süresini ve uyumsuzluklarını bilmek zorundadır. En kritik kural: çamaşır suyu (sodyum hipoklorit) ile asit bazlı kireç çözücüyü asla karıştırma; bu karışım zehirli klor gazı açığa çıkarır ve kapalı banyo gibi alanlarda hayati tehlike yaratır.`,
            `Dezenfektanlar etiketteki temas süresi (contact time, genellikle yüzeyde nemli kalmalıdır) boyunca uygulanmazsa etkili olmaz; "sürdüm-sildim" yaklaşımı dezenfeksiyon değildir. Kimyasallar orijinal etiketli kaplarında, havalandırılmış ve gıdadan uzak dolapta saklanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kimyasal karıştırma yasağı",
              text: `Çamaşır suyu + asit (kireç sökücü/tuz ruhu) = zehirli klor gazı. Çamaşır suyu + amonyak = kloramin buharı. Kapalı tuvalet/banyoda bu karışımlar baygınlık ve solunum hasarı yapar. Kimyasalları asla karıştırma; her ürünü ayrı ve seyreltme talimatına göre kullan.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kamara Temizliği ve Yatak Düzeni",
      sections: [
        {
          subheading: "3.1 Günlük kamara servisi sırası",
          paragraphs: [
            `Kamara temizliği "yukarıdan aşağıya, kuru işten ıslak işe" prensibiyle yapılır. Önce havalandırma için kapı/iletişim açılır (mürettebatın gizliliğine saygı esastır; kişisel eşyaya dokunulmaz). Sonra tozalma yüksek yüzeylerden (dolap üstü, raf, aydınlatma) başlar, masalar ve sık dokunulan yüzeyler (kapı kolu, anahtar, telefon) dezenfekte edilir, en son zemin süpürülüp paspaslanır.`,
            `Sık dokunulan yüzeyler (high-touch surfaces) hijyenin kritik noktasıdır: kapı kolları, lavabo bataryası, klozet kapağı, ışık anahtarları. Bu yüzeyler sadece silinmez, dezenfekte edilir. Salgın dönemlerinde bu noktaların sıklığı artırılır.`,
          ],
          bullets: [
            `Yüksek yüzeyler → tozalma`,
            `High-touch yüzeyler → dezenfeksiyon`,
            `Lavabo/ayna → temizlik`,
            `Çöp → toplama ve poşet değişimi`,
            `Zemin → süpürme + paspaslama`,
          ],
        },
        {
          subheading: "3.2 Yatak yapımı ve tekstil değişimi",
          paragraphs: [
            `Çarşaf, nevresim, yastık kılıfı ve havlular düzenli programa göre değiştirilir; tipik standart haftada bir, kirlenme veya hastalık durumunda derhal. Kullanılmış tekstil doğrudan çamaşır arabasına/torbasına alınır; asla yere konmaz veya silkelenmez (silkelemek toz ve mikroorganizmayı havaya yayar). Yatak yapımında köşeler düzgün katlanır, yastık düzenli yerleştirilir; bu hem konfor hem de denetimde düzen göstergesidir.`,
            `Hasta mürettebatın veya bulaşıcı şüphesi olan kişinin yatak takımı ayrı toplanır, doğrudan eldivenle taşınır ve diğer çamaşırla karıştırılmadan yüksek sıcaklıkta yıkanır. Şilte ve yastıklar periyodik havalandırılır; nem ve küf en sık şikayet konusudur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mahremiyete saygı",
              text: `Kamara, mürettebatın özel alanıdır. Kişisel eşyaya dokunma, çekmece açma, fotoğraf/belge inceleme yasaktır. Güven, kamarotun en değerli sermayesidir; tek bir mahremiyet ihlali tüm işbirliğini bozar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Ortak Alanlar: Messhall, Dayroom ve Ofisler",
      sections: [
        {
          subheading: "4.1 Messhall ve dayroom",
          paragraphs: [
            `Messhall (yemek salonu) ve dayroom (dinlenme odası) en yoğun kullanılan ortak alanlardır ve gün içinde birden çok kez temizlik gerektirir. Yemek öncesi masalar dezenfekte edilir, yemek sonrası artıklar toplanır, masalar tekrar silinir ve zemin paspaslanır. Bu alanlardaki TV, oyun masası, koltuk gibi ortak temas noktaları enfeksiyon kontrolünün parçasıdır.`,
            `Dayroom genellikle mürettebatın dinlendiği yer olduğundan, temizlik dinlenme saatlerine saygı gösterilerek planlanır. MLC kapsamında dinlenme alanı sağlamak işverenin yükümlülüğüdür; kamarot bu alanı kullanılabilir ve hijyenik tutarak bu yükümlülüğün sahadaki uygulayıcısı olur.`,
          ],
        },
        {
          subheading: "4.2 Ofis, koridor ve merdivenler",
          paragraphs: [
            `Gemi ofisi (ship's office) ve kaptan/zabit çalışma alanları temizlenirken evrak ve cihazlara dokunulmaz; sadece yüzeyler ve zemin temizlenir. Koridorlar ve merdivenler, hem hijyen hem de emniyet açısından kritiktir: ıslak paspaslanan zemin kayma riski yaratır, bu yüzden "ıslak zemin" uyarısı konur ve mümkünse yarısı kuru bırakılarak geçiş sağlanır.`,
            `Merdiven korkulukları (handrail) sık dokunulan yüzeylerdir ve dezenfekte edilir. Acil çıkış işaretleri, yangın ekipmanı dolapları ve aydınlatma temizlenirken önlerinin asla malzeme/ekipmanla kapatılmaması gözetilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Islak zemin = kayma/düşme riski",
              text: `Gemide en sık iş kazası türlerinden biri kayma-düşmedir (slips, trips and falls). Paspaslama sonrası "Caution Wet Floor" tabelası konur, geçiş güvenliği sağlanır ve özellikle merdivenlerde aynı anda iki basamak ıslatılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Çöp Toplama ve Atık Ayrıştırma (MARPOL Annex V)",
      sections: [
        {
          subheading: "5.1 Yaşam mahallinden çıkan atığın yönetimi",
          paragraphs: [
            `Yaşam mahallinden çıkan çöp; gıda atığı (food waste), plastik, kâğıt-karton, cam, metal ve domestic waste kategorilerine ayrılır. Kamarot, bu atığı geminin onaylı Garbage Management Plan'ına ve renk/etiket kodlu bin sistemine uygun olarak ayırır. MARPOL Annex V, özellikle plastiğin denize atılmasını kesinlikle yasaklar; tüm plastik gemide tutulur ve liman atık kabul tesisine teslim edilir.`,
            `Çöp poşetleri ağzı bağlı, sızdırmaz şekilde taşınır; koridorlarda veya çıkış yollarında bekletilmez. Gıda atığı koku ve haşere çekeceğinden öncelikli olarak boşaltılır. Kamarot, ayrıştırmayı doğru yaparak Garbage Record Book'a doğru veri girişini de mümkün kılar (kayıt sorumluluğu genellikle güverte zabitindedir ama saha verisi kamarottan gelir).`,
          ],
          table: {
            caption: `Yaşam Mahalli Atık Ayrıştırma (MARPOL Annex V uyumlu)`,
            headers: ["Atık Türü", "Toplama / Bin Rengi", "Bertaraf"],
            rows: [
              ["Plastik (tüm türler)", "Ayrı / etiketli", "Yalnızca limana (denize yasak)"],
              ["Gıda atığı", "Ayrı kapalı kap", "İşleme/limana göre kurallı"],
              ["Kâğıt-karton", "Ayrı", "Limana / incinerator"],
              ["Cam-metal", "Ayrı", "Limana"],
              ["E-atık / piller", "Özel toplama", "Limana (tehlikeli atık)"],
            ],
          },
        },
        {
          subheading: "5.2 Koku ve haşere kontrolü için atık disiplini",
          paragraphs: [
            `Atık disiplini doğrudan haşere kontrolüne bağlıdır. Gıda artığı bırakılan veya geç boşaltılan bir bin; hamamböceği, fare ve sineği davet eder. Çöp arabaları ve binler her boşaltma sonrası yıkanır ve dezenfekte edilir. Atık depolama alanı (garbage station) düzenli ve kokusuz tutulur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex V — Garbage",
              text: `Plastik atığın denize deşarjı her koşulda yasaktır. Tüm çöp kategorilere ayrılarak yönetilir, Garbage Record Book'a işlenir ve uygunsuz deşarj ağır para cezası ve gemi tutulmasıyla sonuçlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Sıhhi Tesisat: Tuvalet, Duş ve Lavabo",
      sections: [
        {
          subheading: "6.1 Ortak tuvalet ve duş dezenfeksiyonu",
          paragraphs: [
            `Ortak sıhhi alanlar (common heads / showers) en yüksek enfeksiyon riskli bölgelerdir ve günde en az iki kez dezenfekte edilir. Kırmızı kodlu ekipmanla klozet iç yüzeyi, sarı kodlu ekipmanla lavabo ve duş yüzeyleri temizlenir. Klozet, duş tabanı, musluk başları ve kapı kollarına özel önem verilir. Dezenfektan, etiketteki temas süresi boyunca yüzeyde bekletilir.`,
            `Duş alanlarında küf (mould) ve kireç birikimi sık görülür; nemli ortam küf üretir. Duş sonrası havalandırma sağlanır, küflenen derzler özel ürünle temizlenir. Tıkalı drenaj hem hijyen hem koku sorunudur; saç/sabun tıkanması düzenli açılır ve ciddi tıkanmalar makine/güverte ekibine raporlanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Norovirus salgını",
              text: `Bir gemide ortak tuvaletlerin yetersiz dezenfeksiyonu sonucu norovirus tüm mürettebata yayıldı; çoğu personel günlerce iş göremedi ve sefer aksadı. Ders: tuvalet/duş high-touch yüzeyleri günde birden çok kez, doğru temas süresiyle dezenfekte edilmeli; renk kodlu sistem asla atlanmamalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Sarf malzeme ve su tasarrufu",
          paragraphs: [
            `Sıhhi alanlarda tuvalet kâğıdı, kâğıt havlu, el sabunu ve dezenfektan sürekli dolu tutulur; boş sabunluk hijyenin en zayıf halkasıdır çünkü el yıkamayı engeller. Kamarot bu sarf malzemeleri stok takibiyle eksiltmeden sağlar.`,
            `Gemide tatlı su sınırlı bir kaynaktır. Temizlik sırasında gereksiz su tüketiminden kaçınılır; özellikle deniz suyu sistemiyle beslenen tuvaletlerde sifon ve hat kontrolü sağlanır. Su israfı hem maliyet hem de bunker/jeneratör yükü demektir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Emniyet: Kaçış Yolları, Yangın Kapıları ve Ekipman Erişimi",
      sections: [
        {
          subheading: "7.1 Temizlik sırasında emniyet bütünlüğünün korunması",
          paragraphs: [
            `Temizlik, hiçbir koşulda emniyet bariyerlerini bozmamalıdır. Yangın kapıları (fire doors) yaşam mahallinde yangının ve dumanın yayılmasını geciktiren bölmelerdir; kamarot bu kapıları temizlik kolaylığı için takoz/sandalyeyle açık tutmaz. Açık bırakılan bir fire door, gerçek yangında ölümcül sonuç doğurur.`,
            `Kaçış yolları (escape routes) ve acil çıkışlar her zaman açık tutulur; temizlik arabası, paspas kovası veya çöp poşeti bu yollara bırakılmaz. Yangın söndürücü dolapları, hidrant, EEBD ve can yeleği konumlarının önü kapatılmaz. Bu noktalar SOLAS ve ISM kapsamında denetlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fire door takozlama yasağı",
              text: `Yangın kapısını takozla/eşyayla açık tutmak SOLAS ihlalidir ve PSC bulgusudur. Bu kapılar kendiliğinden kapanacak şekilde tasarlanmıştır; yaşam mahallinde duman/alev yayılımını sınırlar. Açık bırakmak, yangında kaçış süresini ortadan kaldırır.`,
            },
          ],
        },
        {
          subheading: "7.2 Erken uyarı ve tek başına çalışma",
          paragraphs: [
            `Kamarot çoğu zaman yaşam mahallinde tek başına ve sessiz saatlerde çalışır; bu nedenle duman, yanık kokusu, anormal sıcaklık veya su sızıntısını ilk fark eden kişi sıklıkla kamarottur. Herhangi bir anormallik derhal vardiya zabitine/köprüüstüne bildirilir; "küçük" görünen koku bile incelenmeden geçilmez.`,
            `Yangın detektörlerinin (smoke detector) önü temizlik sırasında kapatılmaz, boya/toz ile örtülmez. Kamara ve ortak alanlarda izinsiz elektrikli alet veya kontrolsüz çoklu priz tespit edilirse raporlanır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Havalandırma, Nem ve Küf Kontrolü",
      sections: [
        {
          subheading: "8.1 Havalandırma ızgaraları ve hava kalitesi",
          paragraphs: [
            `Yaşam mahallinin hava kalitesi konfor ve sağlığın temelidir. Havalandırma menfezleri (HVAC grilles) toz biriktirir; tıkalı ızgara hem hava akışını kısar hem de tozu ve alerjeni geri yayar. Kamarot bu ızgaraları periyodik temizler ve aşırı toz/küf gördüğünde makine ekibine bildirir (filtre değişimi genellikle makine sorumluluğundadır).`,
            `Kapalı, nemli kamaralar küf ve kötü koku üretir. Mümkün oldukça havalandırma sağlanır, nemli tekstil kurutulmadan dolaba konmaz ve küf belirtileri erken müdahaleyle giderilir.`,
          ],
        },
        {
          subheading: "8.2 Nem ve küfle mücadele",
          paragraphs: [
            `Tropik ve yüksek nemli bölgelerde küf en yaygın sorundur; banyo derzleri, perde arkası, dolap köşeleri ve şilte altları risk noktalarıdır. Küf, hem estetik hem de solunum sağlığı sorunu olduğundan düzenli kontrol edilir ve antifungal ürünle temizlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Küf önleme",
              text: `Küf önlemek temizlemekten kolaydır: ıslak yüzeyleri kurut, banyoları havalandır, perdeleri düzenli yıka ve nemli tekstili dolaba koymadan tamamen kurut. Erken fark edilen küf bir bezle gider; ihmal edilen küf yüzeyi kalıcı boyar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Denetime Hazırlık ve Standardın Sürekliliği",
      sections: [
        {
          subheading: "9.1 MLC ve PSC denetiminde yaşam mahalli",
          paragraphs: [
            `Denetimde (MLC inspection, PSC, vetting) yaşam mahalli, geminin işletme kalitesinin en görünür aynasıdır. Denetçi; kamara temizliği, tuvalet/duş hijyeni, messhall düzeni, çöp yönetimi, havalandırma ve genel düzeni kontrol eder. Kötü bir izlenim, denetçinin tüm gemiye şüpheyle bakmasına yol açar; iyi tutulan bir yaşam mahalli ise güven inşa eder.`,
            `Kamarot, denetim öncesi son kontrolde özellikle high-touch yüzeyleri, sarf malzeme dolularını, çöp binlerinin temizliğini ve kaçış yolu/fire door bütünlüğünü gözden geçirir. Düzen sürekli olmalıdır; "denetim geliyor" diye tek seferlik temizlik yerine her gün standardı korumak esastır.`,
          ],
        },
        {
          subheading: "9.2 Kayıt ve süreklilik",
          paragraphs: [
            `Temizlik programı bir checklist üzerinden imzalanarak kayıt altına alınır. Bu kayıt, MLC denetiminde "düzenli temizlik yapılıyor" iddiasının kanıtıdır. Eksik veya boş bir form, yapılmış işi bile "yapılmamış" gösterir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kayıt = kanıt",
              text: `MLC denetiminin temel mantığı: "yapıldı ama kayıt yok" = "yapılmadı". Temizlik checklist'i, derin temizlik programı ve düzeltici aksiyon kayıtları düzenli tutulmalı ve denetimde sunulabilir olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "10.1 Kamarotun günlük temizlik kontrol listesi",
          bullets: [
            `Temizlik rotası temizden kirliye doğru mu izlendi (kamara → tuvalet)?`,
            `Renk kodlu ekipman doğru bölgede mi kullanıldı?`,
            `High-touch yüzeyler (kapı kolu, anahtar, korkuluk) dezenfekte edildi mi?`,
            `Çarşaf/havlu değişimi ve yatak düzeni tamam mı?`,
            `Çöp ayrıştırılıp boşaltıldı, binler temizlendi mi?`,
            `Tuvalet/duş günde en az iki kez dezenfekte edildi mi?`,
            `Sarf malzeme (sabun, kâğıt, dezenfektan) dolu mu?`,
            `Fire door'lar kapalı, kaçış yolları ve ekipman erişimi açık mı?`,
            `Islak zemin uyarısı konuldu, kayma riski yönetildi mi?`,
            `Anormallik (koku, küf, sızıntı) raporlandı, checklist imzalandı mı?`,
          ],
          paragraphs: [
            `Kamarotun yaşam mahalli temizliğindeki başarısı, mürettebatın her gün dinlendiği, yemek yediği ve çalıştığı ortamın sağlığını ve onurunu doğrudan belirler. Görünmez bir titizlik gerektiren bu iş; enfeksiyon kontrolünden yangın emniyetine, MLC uyumundan ekip moraline kadar geminin yaşam kalitesinin temel taşıdır. Standardın "denetim günü" değil, her gün korunması kamarotluğun en temel mesleki ilkesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
