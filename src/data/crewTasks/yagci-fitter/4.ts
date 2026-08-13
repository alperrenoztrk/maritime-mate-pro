import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "İş güvenliği ve PPE uyumu",
  roleSlug: "yagci-fitter",
  taskIndex: 4,
  estimatedPages: 26,
  intro: `Makine dairesi, gemideki en yüksek riskli çalışma ortamıdır: yüksek gürültü, sıcak yüzeyler, basınçlı sistemler, dönen ekipman, kıvılcım, kimyasallar ve kapalı alanlar bir aradadır. Yağcı/Fitter'ın iş güvenliği görevi; çalışma izni (PTW) sistemine uyumu, risk değerlendirmesini, kilitle-etiketle (LOTO) prosedürlerini, doğru kişisel koruyucu donanım (PPE) seçim ve kullanımını, kapalı alan girişi güvenliğini ve sıcak çalışmalarda yangın gözcüsü (fire watch) rolünü kapsar. Bu bölüm; makine dairesi tehlikelerini, kontrol hiyerarşisini, izin sistemlerini ve PPE matrisini somut prosedürlerle açıklar.`,
  sources: [
    "ISM Code — Safety Management System ve risk assessment",
    "SOLAS Chapter II-2 — Fire protection, detection and extinction",
    "IMO Resolution A.1050(27) — Enclosed Space Entry",
    "STCW Code A-VI/1 — Personal safety and social responsibilities",
    "ILO/IMO Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "MLC 2006 — Occupational health and safety (Regulation 4.3)",
    "ICS Tanker Safety Guide / Engine-Room Procedures Guide",
    "Company SMS — Permit to Work, LOTO ve Risk Assessment prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Makine Dairesi Tehlike Haritası",
      lead: `Güvenli çalışmanın ilk koşulu tehlikeyi tanımaktır. Yağcı/Fitter, çalıştığı ortamdaki her tehlike türünü ve onu kontrol etme yöntemini bilmek zorundadır.`,
      sections: [
        {
          subheading: "1.1 Fiziksel, kimyasal ve mekanik tehlikeler",
          paragraphs: [
            `Makine dairesinde tehlikeler katmanlıdır: fiziksel (gürültü, titreşim, sıcaklık, basınç), mekanik (dönen şaft, kayış, kavrama, döner takım tezgahı), kimyasal (yakıt buharı, yağ, soğutucu, temizlik kimyasalları, akü asidi), elektriksel (yüksek gerilim panoları) ve atmosferik (kapalı alanda O₂ eksikliği, zehirli/yanıcı gaz). Her tür ayrı bir kontrol yöntemi gerektirir.`,
            `Sıcak yüzeyler (egzoz manifoldu, türbin gövdesi, buhar hattı) 200°C üzerine çıkar; yanıcı sıvı temasında makine dairesi yangınının (en sık yangın türü) kaynağı olur. Gürültü çoğu makine dairesinde 85-110 dB(A) aralığındadır ve kalıcı işitme kaybı riski taşır. Yağcı, bu haritayı zihninde tutar ve her işe başlamadan ilgili tehlikeleri değerlendirir.`,
          ],
          table: {
            caption: `Makine Dairesi Tehlikeleri ve Temel Kontroller`,
            headers: ["Tehlike", "Kaynak", "Risk", "Temel Kontrol"],
            rows: [
              ["Gürültü", "ME/AE, kompresör, fan", "Kalıcı işitme kaybı", "Kulak koruyucu, maruziyet süresi sınırı"],
              ["Sıcak yüzey", "Egzoz, türbin, buhar", "Yanık, yangın", "İzolasyon, eldiven, kaçınma"],
              ["Dönen ekipman", "Şaft, tezgah, kayış", "Uzuv kapılması", "Muhafaza, LOTO, bol giysi yok"],
              ["Atmosfer", "Tank, void, sintine", "Boğulma, zehirlenme", "Gaz testi, ventilasyon, permit"],
              ["Kimyasal", "Yakıt, soğutucu, asit", "Yanık, solunum", "Eldiven, gözlük, MSDS, havalandırma"],
            ],
          },
        },
        {
          subheading: "1.2 Kontrol hiyerarşisi (hierarchy of control)",
          paragraphs: [
            `Riskler bir öncelik sırasıyla kontrol edilir: önce tehlikeyi ortadan kaldırma (elimination), sonra ikame (substitution), mühendislik kontrolü (muhafaza, havalandırma, izolasyon), idari kontrol (prosedür, eğitim, izin) ve en son PPE. PPE en zayıf savunmadır çünkü kişiye bağlıdır ve başarısız olabilir; bu yüzden "son savunma hattı" olarak görülür.`,
            `Pratikte Yağcı, bir işe başlamadan "bu tehlikeyi nasıl en üst basamakta kontrol ederim?" diye sorar. Örneğin sıcak bir hattı izole edip soğutmak (mühendislik), PPE'ye güvenmekten her zaman üstündür. PPE, daha üst kontroller uygulandıktan sonra kalan riski karşılar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "PPE son savunmadır, ilk değil",
              text: `PPE'ye güvenmeden önce sorun: Tehlikeyi kaldırabilir miyim? İzole edebilir miyim? Havalandırabilir miyim? PPE, daha güçlü kontroller uygulandıktan sonra kalan riski karşılar. "Eldiven var nasılsa" düşüncesi kazaların gizli sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Çalışma İzni Sistemi (Permit to Work)",
      sections: [
        {
          subheading: "2.1 PTW'nin amacı ve kapsamı",
          paragraphs: [
            `Permit to Work (PTW), yüksek riskli işlerin kontrollü ve yetkili biçimde yapılmasını sağlayan resmi bir sistemdir. Sıcak çalışma (hot work), kapalı alan girişi (enclosed space entry), elektrik kesme, yüksekte çalışma ve overside çalışma için ayrı izinler düzenlenir. İzin; tehlikeleri, alınan önlemleri, sorumluları ve geçerlilik süresini belgeler.`,
            `Yağcı/Fitter, PTW kapsamındaki bir işe izin imzalanmadan başlamaz. İzni genelde sorumlu mühendis düzenler; çalışan kişi izindeki önlemleri okur, anlar ve uygular. İş bitiminde izin kapatılır (sign-off); alan güvenli hale getirilmeden izin asılı bırakılmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code — Risk değerlendirmesi",
              text: `ISM Code, gemideki tüm operasyonlar için risk değerlendirmesi ve emniyetli çalışma prosedürlerini zorunlu kılar. PTW, bu sistemin sahadaki uygulama aracıdır; izin olmadan yüksek riskli işe başlamak SMS ihlalidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Toolbox meeting ve risk assessment",
          paragraphs: [
            `Her yüksek riskli iş öncesi toolbox meeting (saha brifingi) yapılır; işin adımları, tehlikeler, önlemler, görev dağılımı ve acil durum planı katılımcılarla konuşulur. Risk assessment formu, tehlikeleri ve kontrolleri yazılı olarak belgeler; "ne ters gidebilir, nasıl önlerim?" sorusu sistematik cevaplanır.`,
            `Yağcı, toolbox meeting'te aktif rol alır; tecrübesiyle gözden kaçan bir tehlikeyi (örn. komşu hatta sıcak yüzey, dar alanda kaçış zorluğu) dile getirir. İyi bir brifing, kağıt üzerindeki risk assessment'i gerçek güvenliğe çevirir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kilitle-Etiketle (LOTO) ve Enerji İzolasyonu",
      sections: [
        {
          subheading: "3.1 LOTO prensibi",
          paragraphs: [
            `Lock-Out/Tag-Out (LOTO), bir ekipman üzerinde çalışırken onun beklenmedik şekilde çalışmasını veya enerjilenmesini önleyen prosedürdür. Elektrik kesilir, valf kapatılır, basınç boşaltılır; ardından bu izolasyon noktaları kilitle (lock) güvenceye alınır ve etiketle (tag) "çalışılıyor, açma!" uyarısı asılır. Kilidin anahtarı çalışan kişide kalır.`,
            `Enerji sadece elektrik değildir: hidrolik/pnömatik basınç, buhar, yay gerilimi, sıcaklık ve yer çekimi (asılı yük) de "saklı enerji"dir. Yağcı, bir pompayı sökmeden önce hem elektriğini keser/kilitler hem de emiş/basma valflerini kapatır ve hattı drain eder; aksi halde geri basınç veya yanlış başlatma ciddi yaralanma yapar.`,
          ],
          bullets: [
            `Tüm enerji kaynaklarını belirle (elektrik, basınç, buhar, yay, yük)`,
            `Ekipmanı kapat ve izole et (breaker, valf)`,
            `Kilit + etiket uygula, anahtar çalışanda kalsın`,
            `Saklı enerjiyi boşalt (drain, bleed, yükü indir)`,
            `Sıfır enerji doğrula (try-out: çalıştırmayı dene)`,
            `İş bitince ters sırayla güvenli devreye al`,
          ],
        },
        {
          subheading: "3.2 Sıfır enerji doğrulama",
          paragraphs: [
            `İzolasyon yapıldıktan sonra "sıfır enerji" doğrulanır: start butonuna basılarak ekipmanın gerçekten çalışmadığı test edilir (try-out), basınç göstergesi sıfır gösterir, dönen parça durmuştur. Bu adım atlanırsa görünüşte izole ama aslında enerjili bir ekipmana el atılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış başlatma (unexpected start-up)",
              text: `Bir ekipmanı söküp izole etmeden, ya da başkası farkında olmadan devreye alabileceği bir durumda çalışmak ölümcüldür. LOTO kilidini başkası kaldıramaz; anahtar yalnız işi yapan kişidedir. "Sadece bir dakika sürer" düşüncesi en sık ölüm sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kişisel Koruyucu Donanım (PPE) Matrisi",
      sections: [
        {
          subheading: "4.1 Temel PPE ve işe özel seçim",
          paragraphs: [
            `Makine dairesinde temel PPE her zaman giyilir: çelik burunlu güvenlik ayakkabısı (kaymaz taban), tulum (yanıcı olmayan/pamuklu, bol olmayan), baret (düşen cisim/çarpma) ve makine dairesinde işitme koruyucu. Bunun üzerine işe özel PPE eklenir: kaynak/taşlamada yüz siperi ve deri önlük, kimyasalda kimyasal eldiven, sıcak işte ısı eldiveni.`,
            `PPE doğru seçilmeli, doğru takılmalı ve sağlam olmalıdır. Yıpranmış, yanlış beden veya yanlış sınıf PPE koruma sağlamaz. Yağcı, kullanmadan önce PPE'yi kontrol eder (çatlak gözlük, delik eldiven, bozuk maske kullanılmaz) ve doğru tipi seçer.`,
          ],
          table: {
            caption: `İşe Göre PPE Seçim Matrisi`,
            headers: ["İş Türü", "Göz/Yüz", "El", "Solunum/Kulak", "Diğer"],
            rows: [
              ["Taşlama/zımpara", "Yüz siperi + gözlük", "Kesilmez eldiven", "Kulak + toz maskesi", "Deri önlük"],
              ["Kaynak", "Kaynak maskesi", "Kaynakçı eldiveni", "Kaynak dumanı maskesi", "Deri önlük/kolluk"],
              ["Yakıt/yağ işi", "Gözlük", "Yağ-dirençli eldiven", "Kulak", "Yağ-dirençli önlük"],
              ["Kimyasal", "Yüz siperi/gözlük", "Kimyasal eldiven", "Gaz maskesi (MSDS'e göre)", "Kimyasal önlük"],
              ["Kapalı alan", "Gözlük", "Eldiven", "SCBA/SAA (gerekirse)", "Emniyet kemeri, lifeline"],
            ],
          },
        },
        {
          subheading: "4.2 İşitme, göz ve solunum koruması",
          paragraphs: [
            `İşitme koruması (kulak tıkacı veya manşonlu kulaklık), makine dairesinde gürültü 85 dB(A) üzerindeyken zorunludur ve ana makine bölgesinde sürekli takılır. Maruziyet süresi arttıkça veya seviye yükseldikçe daha yüksek azaltma sınıfı (SNR) gerekir. İşitme kaybı sinsidir; fark edildiğinde kalıcıdır.`,
            `Göz koruması kıvılcım, sıçrayan sıvı ve toza karşı; solunum koruması ise toz, duman ve kimyasal buhara karşı kullanılır. Solunum koruyucu seçimi MSDS/risk değerlendirmesine göre yapılır; toz maskesi gaz tutmaz, gaz için uygun filtreli maske veya hava beslemeli sistem gerekir. Kapalı alanda yalnızca SCBA/SAA güvenlidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — İş sağlığı ve güvenliği",
              text: `MLC 2006 Kural 4.3, gemiadamlarına güvenli ve sağlıklı bir çalışma ortamı sağlanmasını ve uygun koruyucu donanımın temin edilmesini zorunlu kılar. PPE'nin sağlanması işverenin, doğru kullanılması ise çalışanın sorumluluğudur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Sıcak Çalışma ve Yangın Gözcüsü (Fire Watch)",
      sections: [
        {
          subheading: "5.1 Hot work izni ve önlemler",
          paragraphs: [
            `Kaynak, kesme (oksi-asetilen, plazma), taşlama ve açık alev gibi sıcak çalışmalar yangın ve patlama riskinin en yüksek olduğu işlerdir. Hot work permit, alanın yanıcı maddelerden arındırıldığını, gaz testinin yapıldığını (özellikle tank/yakıt çevresinde), yangın söndürme ekipmanının hazır olduğunu ve fire watch atandığını belgeler.`,
            `Yağcı/Fitter, sıcak çalışma yapacağı alanı hazırlar: yanıcı maddeleri uzaklaştırır, yağ/yakıt sızıntısını temizler, komşu bölmeleri kontrol eder (kıvılcım açıklıktan geçebilir), yangın battaniyesi/perde kurar ve söndürücü ile hortumu el altında bulundurur. Kapalı/dar alanda kaynak gazları birikebileceğinden havalandırma şarttır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Sıcak çalışma kontrolü",
              text: `Yakıt tankları, pompa odaları ve yanıcı atmosfer olabilecek bölgelerde sıcak çalışma, ancak gaz-free sertifikası ve yetkili iznle yapılır. Yanlış yapılan sıcak çalışma, tarihteki en yıkıcı gemi yangınlarının ve patlamalarının sebebidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Fire watch görevi ve sonrası gözetim",
          paragraphs: [
            `Yangın gözcüsü (fire watch), sıcak çalışma boyunca ve sonrasında alanı gözleyen kişidir. Görevi; kıvılcım/ısı kaynaklı gizli yangını erken yakalamak, söndürücüyü kullanmaya hazır olmak ve gerekirse alarm vermektir. Fire watch başka işle meşgul olmaz; tek görevi gözlemdir.`,
            `Sıcak çalışma bittikten sonra gözetim hemen kesilmez; yarım saatten birkaç saate kadar (riske göre) bölge izlenmeye devam eder çünkü ısı gizli kalıp gecikmeli tutuşma yapabilir. Kaynak yapılan metalin arka yüzü, komşu bölme ve izolasyon altı özellikle kontrol edilir.`,
          ],
          bullets: [
            `Söndürücü + yangın hortumu erişilir mesafede hazır`,
            `Fire watch yalnız gözlem yapar, başka işe karışmaz`,
            `Kıvılcımın geçebileceği açıklık/komşu bölme kontrol edilir`,
            `Çalışma sonrası gözetim süresi (afterwatch) eksiksiz tutulur`,
            `Şüpheli ısı/duman → alarm + müdahale`,
          ],
        },
      ],
    },
    {
      heading: "6. Kapalı Alan Girişi (Enclosed Space Entry)",
      sections: [
        {
          subheading: "6.1 Atmosfer testi ve giriş izni",
          paragraphs: [
            `Sintine kuyusu, çift dip tank, kofferdam, sludge tank, boiler ve benzeri kapalı alanlar; oksijen eksikliği, zehirli gaz (H₂S, CO) ve yanıcı gaz biriktirebilir. Bu alanlara giriş, yalnızca kalibre cihazla atmosfer testi yapılıp giriş izni (entry permit) düzenlendikten sonra yapılır: O₂ %20.9 normal/min %19.5, LEL %0, toksik gazlar sınır altı.`,
            `Yağcı, "sadece bir bakayım" diyerek izinsiz kapalı alana asla girmez. Tarihteki çok sayıda ölüm, izinsiz giren bir kişiyi kurtarmaya koşan ikinci/üçüncü kişinin de aynı atmosferde boğulmasıyla yaşanmıştır. Havalandırma sürekli çalıştırılır ve ölçüm giriş boyunca tekrarlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kurtarmaya koşma refleksi öldürür",
              text: `Kapalı alanda baygın düşen bir arkadaşı görünce içeri koşmak en doğal ama en ölümcül tepkidir. Önce alarm verilir, SCBA takılır, ek personel çağrılır. Kapalı alan ölümlerinin önemli kısmı, hazırlıksız kurtarıcılardır (ikinci kurban).`,
            },
          ],
        },
        {
          subheading: "6.2 Standby kişi, rescue plan ve iletişim",
          paragraphs: [
            `Her kapalı alan girişinde dışarıda bir standby kişi bulunur; içeridekiyle sürekli iletişim kurar, lifeline tutar ve acil durumda alarm verip kurtarmayı başlatır. Rescue plan önceden hazırlanır: kurtarma ekipmanı (tripod, vinç, harness, SCBA) hazır, kurtarma yolu açık tutulur.`,
            `Yağcı, kapalı alanda çalışırken zaman sınırını, kaçış yolunu ve iletişim sinyallerini bilir. Gaz alarmı çaldığında veya kendini kötü hissettiğinde derhal çıkar; tereddüt etmez. SOLAS III/19.3.3 kapsamında en az iki ayda bir yapılan kapalı alan giriş ve kurtarma tatbikatı bu becerileri canlı tutar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IMO Res. A.1050(27) — Enclosed space entry",
              text: `Kapalı alan girişi; izin, atmosfer testi, sürekli ventilasyon, standby kişi, iletişim ve kurtarma planı olmadan yapılamaz. Test cihazları kalibre, kurtarma ekipmanı hazır olmalıdır. Gemilerde düzenli enclosed space rescue drill zorunludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Mekanik ve Elektriksel Çalışma Güvenliği",
      sections: [
        {
          subheading: "7.1 Dönen ekipman ve takım tezgahı",
          paragraphs: [
            `Torna, matkap, taşlama tezgahı ve dönen şaft/kavrama yakınında bol giysi, eldiven (dönen takımda eldiven kapılma riski yaratabilir), takı ve uzun saç tehlikelidir; sıkışıp uzuv koparabilir. Koruyucu muhafazalar (guard) asla çıkarılmaz; iş parçası sağlam bağlanır.`,
            `Yağcı, döner tezgahta çalışırken talaş için yüz siperi/gözlük kullanır, makineyi durdurmadan ölçü almaz/temizlik yapmaz ve acil stop butonunun yerini bilir. Taşlama taşının çatlak/aşınma kontrolü ve doğru devirde kullanımı patlama riskini önler.`,
          ],
        },
        {
          subheading: "7.2 Elektrik ve yüksek gerilim",
          paragraphs: [
            `Makine dairesinde yüksek gerilim panoları ve devreleri bulunur. Yağcı/Fitter, yetkisi olmayan elektrik işine girişmez; elektrik işleri yetkili kişi tarafından, kesme-kilitleme-test (LOTO + voltage test) sonrası yapılır. Islak zeminde elektrikli el aleti kullanımı, hasarlı kablo ve topraksız ekipman elektrik çarpması riski taşır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Aydınlatma ve düzen güvenliktir",
              text: `İyi aydınlatma, açık geçiş yolları ve temiz zemin en ucuz güvenlik önlemidir. Yağ lekesi, gevşek hortum, açık menhol ve dağınık takım; düşme, kayma ve sıkışma kazalarının başlıca sebebidir. Çalışma alanını her zaman temiz ve düzenli bırakın.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Yorgunluk, İnsan Faktörü ve Davranış",
      sections: [
        {
          subheading: "8.1 Yorgunluk ve dinlenme",
          paragraphs: [
            `Yorgunluk, dikkat ve refleksi düşürerek kaza riskini artırır. STCW A-VIII/1 ve MLC 2006, asgari dinlenme saatlerini (24 saatte en az 10 saat, 7 günde en az 77 saat) zorunlu kılar. Yağcı, yorgun olduğunda kritik/yüksek riskli işe başlamaz ve durumu mühendise bildirir.`,
            `Uzun bakım vardiyaları, gece çalışmaları ve liman yoğunluğu yorgunluğu artırır. İnsan faktörü kazalarının büyük kısmı "acele, dikkatsizlik, alışkanlık körlüğü ve yorgunluk" üçgeninden çıkar. Güvenlik kültürü, "hızlı bitirme" baskısına karşı "doğru ve güvenli yapma" disiplinidir.`,
          ],
        },
        {
          subheading: "8.2 Durdurma yetkisi (stop work authority)",
          paragraphs: [
            `Her gemiadamının, güvensiz bir durum gördüğünde işi durdurma hakkı (ve görevi) vardır. Yağcı, bir iş güvensiz hale geldiğinde (eksik izin, bozuk PPE, beklenmedik tehlike) işi durdurur ve mühendise bildirir; bu "korkaklık" değil profesyonelliktir. Hiçbir ticari/zaman baskısı bu hakkı geçersiz kılmaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Durdurulan iş hayat kurtardı",
              text: `Bir Fitter, pompa sökümü öncesi emiş valfinin tam kapanmadığını fark eder ve işi durdurur. Valf kontrol edilince geçirdiği (passing) tespit edilir; söküm yapılsaydı basınçlı sıcak yakıt fışkıracaktı. "Durdur ve sor" disiplini ciddi bir yaralanmayı önlemiştir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. İlk Yardım, Acil Durum ve Raporlama",
      sections: [
        {
          subheading: "9.1 Yaralanma türleri ve ilk müdahale",
          paragraphs: [
            `Makine dairesinde tipik yaralanmalar: yanık (sıcak yüzey/buhar/akışkan), kesik/ezilme (takım, dönen ekipman), göz yaralanması (talaş/kimyasal sıçrama), kimyasal temas ve elektrik çarpmasıdır. Yağcı, en yakın ilk yardım dolabının, göz duşunun (eye wash) ve emergency shower'ın yerini bilir.`,
            `Kimyasal göz/cilt temasında derhal bol suyla yıkanır (eye wash/shower), MSDS'teki ilk yardım talimatı uygulanır ve revir sorumlusuna haber verilir. Ağır yaralanmada önce ortam güvenliği sağlanır (enerji izolasyonu), sonra müdahale edilir; ikinci kurban yaratılmaz.`,
          ],
        },
        {
          subheading: "9.2 Kaza ve ramak kala (near-miss) raporlama",
          paragraphs: [
            `Her kaza, yaralanma ve ramak kala (near-miss) olayı raporlanır. Near-miss, "az daha oluyordu" durumudur ve gelecekteki bir kazanın ücretsiz uyarısıdır. Yağcı, gördüğü tehlikeli durumu veya yaşadığı ramak kalayı korkmadan bildirir; ceza kültürü değil öğrenme kültürü hedeflenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code — Olay raporlama",
              text: `ISM Code, kaza, uygunsuzluk ve tehlikeli durumların raporlanması ve analiz edilerek düzeltici aksiyon alınmasını zorunlu kılar. Near-miss raporlama, kazaları önlemenin en güçlü aracıdır; bastırılan rapor, tekrarlayan kazanın tohumudur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın iş güvenliği checklist'i",
          bullets: [
            `İşe başlamadan risk değerlendirmesi ve toolbox meeting yapıldı mı?`,
            `Gereken PTW (hot work / kapalı alan / elektrik) imzalı mı?`,
            `Tüm enerji kaynakları LOTO ile izole ve sıfır enerji doğrulandı mı?`,
            `İşe uygun PPE seçildi, kontrol edildi ve doğru takıldı mı?`,
            `Sıcak çalışmada gaz testi, söndürücü ve fire watch hazır mı?`,
            `Kapalı alanda atmosfer testi, standby kişi ve rescue plan var mı?`,
            `Dönen ekipmanda muhafaza yerinde, bol giysi/takı yok mu?`,
            `İlk yardım, eye wash ve emergency stop konumları biliniyor mu?`,
            `Çalışma alanı temiz, aydınlık ve düzenli bırakıldı mı?`,
            `Kaza/near-miss/tehlike raporlandı, izinler kapatıldı mı?`,
          ],
          paragraphs: [
            `İş güvenliği, bir prosedür dosyası değil bir çalışma kültürüdür. Yağcı/Fitter'ın güvenliği; tehlikeyi tanıma, izin sistemine uyma, enerjiyi izole etme, doğru PPE'yi kullanma ve "durdur ve sor" disiplininden geçer. Makine dairesinde en güvenli iş, hiçbir zaman acele edilmeyen, izinli, izole edilmiş ve gözcülü iştir. Eve sağ salim dönmek, her görevin önündeki tek önceliktir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
