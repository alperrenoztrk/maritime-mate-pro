import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet prosedürlerini öğrenme",
  roleSlug: "makine-stajyer",
  taskIndex: 4,
  estimatedPages: 26,
  intro: `Makine stajyeri, makine dairesinin yüksek riskli ortamında güvenle çalışabilmek için temel emniyet prosedürlerini sistematik olarak öğrenmek zorundadır. Bu prosedürler; enerji izolasyonu (LOTO — Lockout/Tagout), iş izni sistemi (PTW — Permit to Work), kapalı alana giriş (enclosed space entry), sıcak iş (hot work) ve kişisel koruyucu donanım (PPE) kullanımını kapsar. Bunun yanında stajyer; blackout recovery, makine dairesi yangını ve su basması (flooding) gibi acil durum prosedürlerini, kaçış yollarını ve muster station bilgisini öğrenir ve tatbikatlara aktif katılır. Bu bölüm, her bir emniyet prosedürünün mantığını, mevzuat dayanağını ve stajyerin pratikteki rolünü adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire protection, detection and extinction",
    "SOLAS Chapter III — Life-saving appliances and arrangements",
    "ISM Code — Element 7 (Shipboard Operations) ve Element 8 (Emergency Preparedness)",
    "IMO Resolution A.1050(27) — Revised recommendations for entering enclosed spaces",
    "SOLAS Regulation III/19 — Emergency training and drills (enclosed space drill dahil)",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "FSS Code — Fire Safety Systems Code",
    "STCW Code Table A-VI/1 — Basic safety training",
  ],
  chapters: [
    {
      heading: "1. Emniyet Kültürü ve Stajyerin Yeri",
      lead: `Emniyet prosedürleri ezberlenecek kurallar değil, hayat kurtaran düşünme biçimleridir. Stajyer bu kültürü ilk günden içselleştirmelidir.`,
      sections: [
        {
          subheading: "1.1 Neden prosedür: kazaların zinciri",
          paragraphs: [
            `Deniz kazalarının büyük çoğunluğu tek bir hatadan değil, üst üste binen küçük ihmallerin (hata zinciri / error chain) sonucudur. Emniyet prosedürleri bu zinciri belirli noktalarda kırmak için tasarlanmıştır: LOTO enerjiyi izole eder, PTW riski önceden değerlendirir, atmosfer ölçümü görünmez tehlikeyi ortaya çıkarır. Her prosedür, geçmişte yaşanmış ölümcül kazaların dersidir.`,
            `Stajyer, prosedürleri "bürokrasi" değil "hayatta kalma araçları" olarak görmelidir. "Bu sefer kısa keseyim" düşüncesi, kaza zincirinin ilk halkasıdır. Deneyimli mühendisler, en rutin işte bile prosedüre uymanın profesyonelliğin işareti olduğunu bilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code — Element 7 & 8",
              text: `Şirket, gemideki kilit operasyonlar için prosedürler belirlemek ve olası acil durumları tanımlayıp bunlara müdahale tatbikatları yapmakla yükümlüdür. Stajyer bu prosedür ve tatbikatların düzenli bir parçası olmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Stajyerin emniyetteki rolü ve sınırı",
          paragraphs: [
            `Stajyer, emniyet prosedürlerine gözetimli olarak katılır; LOTO uygular, PTW formunu okur, atmosfer ölçümünü gözlemler. Ancak hiçbir koşulda bağımsız olarak izolasyon kaldırmaz, kapalı alana izinsiz girmez veya hot work başlatmaz. Her emniyet kritik işlem, yetkili kişinin onayı ve gözetimiyle yapılır.`,
            `Stajyerin en güçlü emniyet aracı "speak up" (sesini çıkarma) hakkıdır. Güvensiz bir durum gördüğünde — kıdem farkı ne olursa olsun — durmayı ve raporlamayı bilmelidir. Birçok kazada, alt rütbeli bir mürettebatın fark ettiği tehlikeyi dile getirememesi felaketle sonuçlanmıştır.`,
          ],
        },
      ],
    },
    {
      heading: "2. LOTO — Lockout/Tagout (Enerji İzolasyonu)",
      sections: [
        {
          subheading: "2.1 LOTO'nun amacı ve adımları",
          paragraphs: [
            `LOTO, bir ekipman üzerinde çalışılırken o ekipmanın beklenmedik şekilde çalışmasını veya depolanmış enerjinin (elektrik, basınç, buhar, hidrolik, mekanik) açığa çıkmasını önler. Pompa, fan, kompresör veya elektrik motoru üzerinde bakım yapılmadan önce enerji kaynağı izole edilir, kilitlenir (lock) ve etiketlenir (tag).`,
            `Standart LOTO adımları: hazırlık ve bildirim, ekipmanı durdurma, tüm enerji kaynaklarını izole etme, kilit ve etiket takma, depolanmış enerjiyi boşaltma (basınç tahliye, kondansatör deşarjı), ve sıfır enerji doğrulaması (try-out: çalıştırmayı dene, çalışmadığını gör). Her çalışan kendi kilidini takar; başkasının kilidi kaldırılamaz.`,
          ],
          table: {
            caption: `Enerji Türleri ve İzolasyon Yöntemleri`,
            headers: ["Enerji türü", "İzolasyon", "Doğrulama"],
            rows: [
              ["Elektrik", "Breaker kilitleme", "Voltaj ölçümü = 0"],
              ["Basınçlı hava/gaz", "Valf kapama + tahliye", "Manometre = 0"],
              ["Buhar/sıcak akışkan", "Valf + drain + soğuma", "Sıcaklık düşüşü"],
              ["Hidrolik", "Valf izole + basınç boşalt", "Basınç = 0"],
              ["Mekanik (dönen)", "Şaft kilitleme/blocking", "Hareketsizlik"],
            ],
          },
        },
        {
          subheading: "2.2 Stajyerin LOTO'daki rolü",
          paragraphs: [
            `Stajyer, gözetimli bir bakım işinde kendi kilidini takmayı ve sıfır enerji doğrulamasının önemini öğrenir. "Kilidi taktık ama denemedik" yaklaşımı tehlikelidir; gerçek izolasyonun kanıtı, çalıştırmayı deneyip ekipmanın çalışmadığını görmektir (try-to-start).`,
            `Stajyer ayrıca grup LOTO mantığını öğrenir: birden fazla kişi aynı ekipmanda çalışıyorsa, herkes kendi kilidini takar ve iş bitince kendi kilidini kaldırır. Son kilit kalkmadan ekipman enerjilendirilemez. Bu, hiç kimsenin "unutulup" tehlikede kalmamasını sağlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Başkasının kilidini asla kaldırma",
              text: `LOTO'nun altın kuralı: her kilidi takan kişi kendi kilidini kaldırır. Başka birinin kilidini kaldırmak, o kişiyi ölümcül tehlikeye atabilir. Kilit sahibi bulunamıyorsa, ancak resmi bir yönetim prosedürüyle ve doğrulama ile kaldırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. PTW — Permit to Work (İş İzni Sistemi)",
      sections: [
        {
          subheading: "3.1 PTW'nin işlevi",
          paragraphs: [
            `PTW, yüksek riskli işlerin başlamadan önce sistematik olarak değerlendirildiğini ve gerekli önlemlerin alındığını belgeleyen resmi bir izin sistemidir. Hot work, enclosed space entry, aloft work (yüksekte çalışma), electrical isolation ve diving gibi işler genellikle ayrı permit gerektirir. Permit; işi, riskleri, alınan önlemleri, sorumlu kişiyi ve geçerlilik süresini tanımlar.`,
            `PTW süreci risk değerlendirmesini (risk assessment) zorunlu kılar: hangi tehlikeler var, kim etkilenebilir, hangi kontroller uygulanacak. İş bittiğinde permit kapatılır ve alan normale döner. Süresi dolan bir permit yenilenmeden iş devam edemez.`,
          ],
          bullets: [
            `İşin tanımı ve yeri net olmalı`,
            `Risk değerlendirmesi tamamlanmalı`,
            `Gerekli izolasyonlar (LOTO) yapılmalı`,
            `Atmosfer/yangın önlemleri belirtilmeli`,
            `Sorumlu ve onaylayan kişiler imzalamalı`,
            `Geçerlilik süresi ve iptal koşulu yazılmalı`,
          ],
        },
        {
          subheading: "3.2 Stajyerin PTW deneyimi",
          paragraphs: [
            `Stajyer, bir permit formunun nasıl doldurulduğunu, hangi soruların sorulduğunu ve hangi onayların gerektiğini öğrenir. Permit'in sadece bir kağıt olmadığını; her satırının somut bir önlemi temsil ettiğini kavrar. "Atmosfer ölçüldü mü?" satırı bir hayatın garantisidir.`,
            `Stajyer, kendi katıldığı işlerin permit'ini okumalı ve "bu işte ne risk var, nasıl korunuyoruz?" sorusunu kendine sormalıdır. Bu alışkanlık, ileride permit imzalayacak sorumlu mühendisin risk bilincinin temelini oluşturur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Permit'i oku, imzayı anlamadan atma",
              text: `Stajyer, bir permit'e imza/paraf gerektiğinde önce her maddesini okumalıdır. İmza, "bu önlemleri anladım ve uyguladım" anlamına gelir; körü körüne imza, emniyetin temelini çürütür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kapalı Alana Giriş (Enclosed Space Entry)",
      lead: `Kapalı alan kazaları denizdeki en ölümcül kaza türlerindendir ve kurtarmaya giren ikinci kişiler de sıklıkla ölür.`,
      sections: [
        {
          subheading: "4.1 Kapalı alan tehlikesi ve atmosfer ölçümü",
          paragraphs: [
            `Kapalı alanlar (tanklar, cofferdam, ballast tank, sintine, chain locker, boiler) görünmez ölümcül atmosferler barındırabilir: oksijen yetersizliği, zehirli gazlar (H2S), patlayıcı buharlar (LEL) ve karbon monoksit. İnsan duyuları bu tehlikelerin çoğunu algılayamaz; bu yüzden giriş öncesi ve giriş boyunca atmosfer ölçümü hayatidir.`,
            `Giriş prosedürü: alanı izole et ve havalandır, atmosferi ölç (O2, LEL, toksik gazlar), permit düzenle, standby personel görevlendir, sürekli haberleşme ve ölçüm sağla, kurtarma planı hazır tut. Ölçümler güvenli aralıkta olmadan kimse giremez. Oksijen %20.9 civarında, LEL %0, toksik gazlar eşik altında olmalıdır.`,
          ],
          table: {
            caption: `Kapalı Alan Giriş Öncesi Atmosfer Kriterleri`,
            headers: ["Parametre", "Güvenli değer", "Risk"],
            rows: [
              ["Oksijen (O2)", "%20.9 (19.5-23.5 aralığı)", "Boğulma / yangın"],
              ["LEL (yanıcı gaz)", "%0", "Patlama"],
              ["H2S", "< 10 ppm (TWA)", "Zehirlenme/ölüm"],
              ["CO", "< 30 ppm (TWA)", "Zehirlenme"],
            ],
          },
        },
        {
          subheading: "4.2 Stajyerin mutlak kuralı: izinsiz girme",
          paragraphs: [
            `Stajyer için en katı kural budur: hiçbir koşulda izinsiz, ölçümsüz ve gözetimsiz kapalı alana girilmez. "Hızlıca bir bakayım", "sadece bir aletimi alacağım" gibi düşünceler ölümcüldür. Kapalı alan ölümlerinin çoğu, "kısa bir an" niyetiyle giren kişilerdir.`,
            `Daha da önemlisi: içeride biri baygın görülürse, stajyer önce alarm verir ve yardım çağırır; gözetimsiz ve donanımsız kurtarmaya atlamaz. Kapalı alan kazalarının istatistiği acıdır: ölenlerin önemli kısmı, ilk kurbanı kurtarmaya koşan ve aynı atmosferde boğulan kurtarıcılardır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kurtarmaya koşma — alarm ver",
              text: `Kapalı alanda baygın birini görürsen içeri atlama. Çoklu ölümlerin başlıca nedeni budur. Alarmı çal, yetkiliyi çağır, solunum cihazı ve kurtarma ekibi gelene kadar müdahaleyi bekle. Senin de ölmen kurbanı kurtarmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Hot Work (Sıcak İş) Prosedürü",
      sections: [
        {
          subheading: "5.1 Sıcak iş riskleri ve önlemleri",
          paragraphs: [
            `Hot work (kaynak, taşlama, kesme, açık alev) gemideki yangın ve patlama riskini ciddi biçimde artırır. Yakıt buharı, yağlı yüzeyler ve yanıcı malzemeler kıvılcımla tutuşabilir. Bu nedenle hot work ayrı bir permit gerektirir ve atmosfer "gas-free" olarak doğrulanır.`,
            `Önlemler: çalışma alanını yanıcılardan arındır, yakındaki açıklıkları kapat, yangın söndürücü ve fire watch (yangın gözcüsü) bulundur, atmosferi ölç, ve iş bitiminde alanı belirli süre gözle (kıvılcımın gecikmeli yangın başlatma riski). Tankerlerde ve yanıcı yük yakınında hot work özellikle kısıtlıdır.`,
          ],
          bullets: [
            `Hot work permit ve gas-free doğrulaması`,
            `Yanıcı malzemelerin uzaklaştırılması`,
            `Fire watch (yangın gözcüsü) görevlendirilmesi`,
            `Yangın söndürücü ve hortum hazır bulundurma`,
            `İş sonrası gözlem süresi (kıvılcım takibi)`,
          ],
        },
        {
          subheading: "5.2 Stajyerin hot work gözlemi",
          paragraphs: [
            `Stajyer, hot work sırasında genellikle fire watch desteği veya gözlemci olarak bulunur. Yangın gözcüsünün ne kadar kritik olduğunu öğrenir: küçük bir kıvılcım dakikalar sonra bile yangın başlatabilir. Stajyer söndürücünün yerini, türünü ve kullanımını bilmelidir.`,
            `Stajyer ayrıca "neden bu işten önce tank gas-free yapıldı?" sorusunun cevabını öğrenir. Geçmişte birçok tanker ve gemi, yetersiz hazırlıkla yapılan hot work sonucu patlamış ve can kaybı yaşamıştır. Prosedürün her adımı bir ölümün dersidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Acil Durum Prosedürleri (Emergency Procedures)",
      sections: [
        {
          subheading: "6.1 Blackout recovery (kararma ve toparlanma)",
          paragraphs: [
            `Blackout, tüm ana güç kaynağının kaybedilmesi durumudur; gemi karanlığa ve hareketsizliğe gömülür. Bu durumda emergency generator otomatik devreye girerek kritik yükleri (acil aydınlatma, dümen, haberleşme, yangın pompası) besler. Recovery prosedürü; nedeni teşhis, jeneratör manuel/otomatik start, kademeli yük alma ve ana makine yeniden başlatmayı içerir.`,
            `Stajyer, blackout recovery'yi gözlemleyerek güç sisteminin önceliklendirmesini öğrenir: önce emergency switchboard, sonra ana jeneratör, sonra ağır yükler. Manevra sırasında veya dar suda blackout, çatma/karaya oturma riskini doğurduğu için recovery hızı kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Manevrada blackout",
              text: `Liman manevrası sırasında bir gemide ana jeneratör trip eder ve blackout olur. Emergency generator devreye girer, dümen ve seyir feneri beslenir; makine ekibi 60 saniyede ana jeneratörü paralele alır. Hızlı ve provalı recovery, gemiyi olası bir çatmadan korur.`,
            },
          ],
        },
        {
          subheading: "6.2 Makine dairesi yangını ve su basması",
          paragraphs: [
            `Makine dairesi yangını en tehlikeli gemi yangınlarındandır; yakıt, yağ ve sıcak yüzeyler bir aradadır. Müdahale; yakıt beslemesini kesme (quick closing valve), havalandırmayı kapatma (ventilation flap), personeli tahliye, alanı kapatma (boundary cooling) ve fixed smothering system (CO2/köpük/water mist) devreye alma adımlarını içerir. Fixed system release öncesi mutlaka personel sayımı yapılır.`,
            `Su basması (flooding) ise hull/boru hasarı veya deniz suyu sistemi arızasından kaynaklanabilir. Bilge pompaları, emergency bilge suction ve hasar kontrolü devreye girer. Stajyer, sintine alarm sistemini, bilge pompa kapasitelerini ve su basmasının erken belirtilerini (yükselen bilge seviyesi) öğrenir.`,
          ],
          table: {
            caption: `Makine Dairesi Acil Durumları — İlk Müdahale`,
            headers: ["Acil durum", "İlk aksiyon", "Kritik nokta"],
            rows: [
              ["Yangın", "Yakıt kes, alarm, tahliye", "Fixed system öncesi personel sayımı"],
              ["Blackout", "Emergency gen. doğrula, neden bul", "Recovery hızı (manevrada)"],
              ["Flooding", "Bilge pompa, kaynağı bul/izole", "Su seviyesi takibi"],
              ["Scavenge fire", "Yük düşür, smothering hazır", "Krank kasası açma!"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Kaçış Yolları, Muster Station ve Tatbikatlar",
      sections: [
        {
          subheading: "7.1 Kaçış yolları ve muster bilgisi",
          paragraphs: [
            `Makine dairesinin en az iki bağımsız kaçış yolu vardır; bunlardan biri korunaklı (fire-protected) kaçış trunk'ı olabilir. Stajyer, kaçış yollarını gözü kapalı bulabilecek kadar iyi bilmeli; çünkü gerçek yangında duman görüşü sıfıra indirebilir. Acil aydınlatma ve fosforlu işaretler bu durumda yol gösterir.`,
            `Muster station (toplanma yeri), acil durumda mürettebatın toplandığı belirlenmiş yerdir. Muster list, her kişinin acil durumdaki görevini gösterir (yangın ekibi, can salı, ilk yardım vb.). Stajyer kendi muster görevini ve istasyonunu ezbere bilmelidir; bu bilgi familiarization'da öğrenilir ve tatbikatlarla pekişir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19 — Tatbikatlar",
              text: `Yangın ve can kurtarma tatbikatları düzenli (genelde aylık) yapılır; enclosed space rescue tatbikatı da düzenli olarak gerçekleştirilir. Stajyer bu tatbikatlara aktif katılır ve katılımını TRB'ye işler.`,
            },
          ],
        },
        {
          subheading: "7.2 Tatbikatlara aktif katılım",
          paragraphs: [
            `Tatbikatlar (drills), acil durum prosedürlerinin kas hafızasına yerleşmesini sağlar. Stajyer; abandon ship, fire drill, enclosed space rescue ve man overboard tatbikatlarına aktif katılır. Tatbikatı "formalite" olarak görmek tehlikelidir; gerçek olay anında insan, ancak prova ettiği şeyi yapabilir.`,
            `Stajyer her tatbikattan sonra kendine sormalıdır: "Görevimi biliyor muydum? Ekipmanı doğru kullandım mı? Daha hızlı/güvenli ne yapabilirdim?" Bu öz-değerlendirme ve tatbikat sonrası debrief, gerçek acil durumdaki performansı belirler.`,
          ],
          bullets: [
            `Muster station ve kişisel acil görev biliniyor mu?`,
            `Yangın ekipmanı (söndürücü, hortum, SCBA) kullanımı`,
            `Can kurtarma ekipmanı (can salı, can yeleği) yerleri`,
            `Enclosed space rescue ekipmanı ve prosedürü`,
            `Tatbikat sonrası debrief'e katılım ve TRB kaydı`,
          ],
        },
      ],
    },
    {
      heading: "8. PPE — Kişisel Koruyucu Donanım",
      sections: [
        {
          subheading: "8.1 Makine dairesinde PPE seçimi",
          paragraphs: [
            `PPE, riskin kaynakta giderilemediği durumlarda son savunma hattıdır. Makine dairesinde temel PPE; emniyet ayakkabısı (çelik burun), iş tulumu, kulak koruması (90 dB üstü zonlarda zorunlu), baret, koruyucu gözlük ve duruma göre eldiven (ısı/kimyasal), solunum maskesi ve yüz siperidir. Yapılan işe uygun PPE seçimi kritiktir.`,
            `Gevşek giysi, takı ve açık saç dönen ekipman için ölümcül risktir; yakalanma (entanglement) kazaları ciddi yaralanma veya ölümle sonuçlanır. Stajyer, makine dairesine girerken giysi ve aksesuarlarını kontrol etme alışkanlığı kazanmalıdır.`,
          ],
          table: {
            caption: `İşe Göre PPE Seçimi`,
            headers: ["İş", "Zorunlu PPE", "Ek koruma"],
            rows: [
              ["Genel makine turu", "Ayakkabı, tulum, kulaklık", "Baret"],
              ["Taşlama/kesme", "Yüz siperi, gözlük", "Eldiven, kulaklık"],
              ["Kimyasal/yağ işi", "Kimyasal eldiven, gözlük", "Önlük, gerekirse maske"],
              ["Sıcak yüzey işi", "Isı dirençli eldiven", "Yüz koruması"],
              ["Boya/solvent", "Solunum maskesi", "Havalandırma"],
            ],
          },
        },
        {
          subheading: "8.2 PPE'nin doğru kullanımı ve bakımı",
          paragraphs: [
            `PPE ancak doğru kullanıldığında korur. Yanlış takılan kulaklık, sızdıran maske veya çatlak gözlük yanlış güvenlik hissi verir. Stajyer, PPE'sini her kullanım öncesi kontrol etmeli, hasarlıysa değiştirmeli ve doğru takıp çıkarmayı öğrenmelidir.`,
            `PPE bireysel sorumluluktur ama aynı zamanda emniyet kültürünün görünür işaretidir. PPE'sini eksiksiz kullanan stajyer, hem kendini korur hem de ekibe doğru örnek olur. "Sadece bir dakikalık iş" mazereti, en sık yaralanma sebebidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "PPE alışkanlığı kaza önler",
              text: `İstatistikler, yaralanmaların büyük kısmının "kısa iş için PPE takmama" anlarında olduğunu gösterir. PPE'yi her girişte refleks haline getir; düşünmeden takılan donanım, en güvenilir korumadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Stajyerin emniyet kontrol listesi",
          bullets: [
            `Bakım öncesi LOTO uygulandı ve sıfır enerji doğrulandı mı?`,
            `Riskli iş için PTW dolduruldu ve okundu mu?`,
            `Kapalı alana asla izinsiz/ölçümsüz girmedim mi?`,
            `Hot work'te gas-free ve fire watch sağlandı mı?`,
            `Blackout/yangın/flooding ilk müdahale adımlarını biliyor muyum?`,
            `Kaçış yolları ve muster station ezbere biliniyor mu?`,
            `Tatbikatlara aktif katılıp TRB'ye işledim mi?`,
            `İşe uygun PPE eksiksiz ve sağlam kullanıldı mı?`,
          ],
          paragraphs: [
            `Emniyet prosedürlerini öğrenmek, makine stajyerinin denizdeki en hayati görevidir. LOTO, PTW, kapalı alan, hot work ve PPE; her biri geçmişteki ölümlerden çıkarılmış derslerdir ve hiçbiri "kısaltılabilir formalite" değildir. Stajyer, prosedürlere uymanın profesyonelliğin işareti olduğunu, güvensiz durumda durmanın ve sesini çıkarmanın bir hak olduğunu içselleştirmelidir. Bugün gözetim altında öğrenilen emniyet disiplini, yarın bir ekibi yönetecek mühendisin en değerli mirasıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
