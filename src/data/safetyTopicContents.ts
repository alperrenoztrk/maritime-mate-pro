import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Deniz Emniyeti — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik gerçek standartlara dayanır (SOLAS, LSA Code, FSS Code, ISM Code,
 * IAMSAR, STCW). `TopicSection.title` değerleri lessonFlow/safety.ts içindeki
 * `sectionRef`/`sectionTitles` ile birebir eşleşir.
 */
export const safetyTopicContents: Record<string, TopicDetailContent> = {
  "SOLAS ve Emniyet Yönetimi (ISM)": {
    title: "SOLAS ve Emniyet Yönetimi (ISM)",
    introduction:
      "SOLAS (Safety of Life at Sea), denizde can güvenliği için gemi inşası, donanımı ve işletmesine dair temel uluslararası sözleşmedir. ISM Code (International Safety Management) ise emniyetli işletme ve kirliliğin önlenmesi için şirket ve gemi düzeyinde bir yönetim sistemi kurar. İkisi birlikte, emniyetin hem teknik (donanım) hem yönetsel (prosedür/kültür) boyutunu kapsar.",
    sections: [
      {
        title: "SOLAS'ın Kapsamı ve Bölümleri",
        content:
          "SOLAS, gemiyi **baştan sona** emniyet açısından düzenleyen bölümlerden oluşur. Öne çıkanlar:\n\n- **II-1:** yapı, bölmeleme, makine ve elektrik.\n- **II-2:** yangın koruma, algılama ve söndürme.\n- **III:** can kurtarma araçları ve düzenlemeleri.\n- **IV:** telsiz haberleşmesi (GMDSS).\n- **V:** seyir emniyeti.\n- **VI / VII:** yüklerin ve tehlikeli yüklerin taşınması.\n- **IX:** ISM ile emniyetli işletme.\n- **XI-1 / XI-2:** emniyet ve güvenlik (ISPS) tedbirleri.\n\n**Belgeleme:** Her bölüm, gemi tipi ve tonajına göre asgari gereklilikleri ve bunların **sertifikalarla** kanıtlanmasını belirler.\n\n**Gemide önemi:** Bir eksikliğin 'hangi SOLAS bölümüne' girdiğini bilmek, hem PSC denetiminde hem de doğru düzeltici işlemde yol gösterir; SOLAS, emniyetin ortak dilidir.",
      },
      {
        title: "ISM Code ve Emniyet Yönetim Sistemi (SMS)",
        content:
          "**ISM Code**, her şirketin yazılı bir **Emniyet Yönetim Sistemi (SMS)** kurmasını ister — emniyeti 'kişiye' değil 'sisteme' bağlar.\n\n**SMS içeriği:** emniyet ve çevre politikası, sorumluluklar, kritik işlemler için **prosedürler**, acil durum hazırlığı, kaza/uygunsuzluk raporlama, bakım ve **iç denetim**.\n\n**DPA:** Şirkette bir **Designated Person Ashore** bulunur; gemi ile en üst yönetim arasında **doğrudan** bağ kurar ve emniyet konularının yönetime (kaynak, karar) taşınmasını sağlar — bu doğrudan hat ISM'in kalbidir.\n\n**Belgeleme:** Uyum, şirkete **Document of Compliance (DOC)** ve gemiye **Safety Management Certificate (SMC)** ile kanıtlanır.\n\n**Gemide önemi:** ISM 'kâğıt üzerinde' kalırsa işe yaramaz; gerçek değeri, prosedürlerin fiilen uygulanması ve DPA hattının kullanılabilir olmasıdır.",
      },
      {
        title: "Sörveyler, Sertifikalar ve PSC",
        content:
          "SOLAS uyumu **periyodik sörveylerle** (ilk, yıllık, ara, yenileme) doğrulanır ve geçerli **sertifikalarla** belgelenir (Cargo Ship Safety Construction/Equipment/Radio Certificate, Passenger Ship Safety Certificate vb.). Sörveyleri **bayrak devleti** veya yetkili kuruluş (klas) yapar.\n\n**PSC:** **Liman Devleti Kontrolü**, yabancı bayraklı gemileri limanda denetler; ciddi eksiklikler (**deficiencies**) **tutma (detention)** ile sonuçlanabilir. Sertifika geçerliliği ve donanımın **çalışırlığı**, PSC'nin ilk baktığı hususlardır.\n\n**Hedefli denetim:** PSC, kötü sicilli bayrak/şirket/gemi tiplerini daha sık ve ayrıntılı denetler (risk profili); bir tutma kaydı, geminin gelecekteki denetim sıklığını artırır.\n\n**Gemide önemi:** 'Sertifika var' yetmez; donanım fiilen çalışmalı ve ekip kullanmayı bilmelidir — PSC eksikliği hem ticari gecikme hem itibar kaybıdır.",
      },
      {
        title: "Emniyet Kültürü ve Raporlama",
        content:
          "Etkili emniyet yalnızca kurallara uymakla değil, sağlam bir **emniyet kültürüyle** sağlanır — kuralların 'neden'ini içselleştirmekle.\n\n**Near-miss raporlama:** Ramak kala olaylar ve tehlikeli durumlar **suçlama olmadan (no-blame)** raporlanır; **kök neden analizi** yapılır ve düzeltici/önleyici eylemler uygulanır. Suçlama kültürü raporlamayı susturur ve tehlikeyi görünmez kılar.\n\n**Günlük araçlar:** Toolbox toplantıları, **risk değerlendirmesi** ve **iş izinleri (permit to work)** günlük operasyona yerleştirilir.\n\n**Gemide önemi:** Büyük kazalar genelde önceden 'ramak kala' olarak sinyal verir; açık raporlama küçük sapmaları büyük kazaya dönüşmeden yakalar. Emniyet kültürü, en pahalı ekipmandan daha koruyucudur.",
      },
    ],
    keyPoints: [
      "SOLAS gemiyi yapıdan donanıma ve işletmeye kadar emniyet açısından düzenler (II-1, II-2, III, IV, V...).",
      "ISM Code yazılı bir SMS ve karada bir DPA gerektirir; uyum DOC ve SMC ile belgelenir.",
      "Uyum sörvey/sertifika ile doğrulanır; PSC ciddi eksiklikte gemiyi tutabilir.",
      "Near-miss raporlama ve kök neden analizi sağlam emniyet kültürünün temelidir.",
    ],
  },

  "Can Kurtarma Araçları (LSA)": {
    title: "Can Kurtarma Araçları (LSA)",
    introduction:
      "Can kurtarma araçları (Life-Saving Appliances, LSA), gemiyi terk gerektiğinde mürettebat ve yolcuların güvenle suya inip hayatta kalmasını sağlar. SOLAS Bölüm III ve LSA Code, filika, can salı, indirme donanımı (davit) ve ilgili ekipmanın tasarım, kapasite ve bakım gerekliliklerini belirler. Amaç, her durumda yeterli ve çalışır kurtarma kapasitesidir.",
    sections: [
      {
        title: "Filikalar (Lifeboats) ve Kapasite",
        content:
          "Filikalar, gemi terkinde toplu tahliye için kullanılan, motorlu ve genellikle tam kapalı (totally enclosed) teknelerdir. SOLAS, gemideki toplam kişi sayısını karşılayacak filika kapasitesi ister; yük gemilerinde tipik düzen, her iki bordada toplam kişiyi alacak filika ya da bir tarafta serbest düşmeli (free-fall) filikadır. Her filika; motor, içme suyu, gıda rasyonu, ilk yardım, işaret fişekleri, kürek ve seyir ekipmanı ile donatılır. Free-fall filikalar baştan kıça eğimli bir rampadan suya bırakılır ve hızlı tahliye sağlar.",
      },
      {
        title: "Can Salları (Liferafts)",
        content:
          "Can salları, şişirilebilir (inflatable) veya rijit yapıda, kapasiteleri işaretli kurtarma araçlarıdır. Genellikle hidrostatik bırakma düzeneği (Hydrostatic Release Unit, HRU) ile donatılır: gemi batarsa belirli derinlikte (yaklaşık 1.5–4 m) basınç salın otomatik açılıp yüzeye çıkmasını ve şişmesini sağlar. Sal, painter (bağlama halatı) ile gemiye bağlıdır; çekildiğinde CO₂/azot tüpüyle saniyeler içinde şişer. İçinde acil rasyon, su, deniz çapası, işaret donanımı ve yağmur/güneşten koruyan tente bulunur. Servis istasyonunda yıllık bakım zorunludur.",
      },
      {
        title: "İndirme Donanımı (Davit) ve Serbest Düşme",
        content:
          "Davitler, filika ve salları kontrollü biçimde suya indiren mekanizmalardır. Gravity davit, filikayı kendi ağırlığıyla dışa çıkarıp halatla (fall) yavaşça indirir; frenli vinç hız kontrolü sağlar. Serbest düşmeli düzenekte ise filika rampadan kayarak suya girer. İndirme donanımı belirli aralıklarla yük testine ve düzenli işletim testine tabidir. On-load/off-load açma kancaları (release hooks), filikanın suya değdikten sonra güvenle ayrılmasını sağlar; bu kancaların yanlış kullanımı geçmişte ölümcül kazalara yol açtığından bakım ve eğitim kritiktir.",
      },
      {
        title: "Kurtarma Botu (Rescue Boat) ve MOB",
        content:
          "Kurtarma botu (rescue boat), denize adam düşmesi (Man Overboard, MOB) ve can salı toplama gibi görevler için hızlı indirilip alınabilen ayrı bir teknedir. Yük gemilerinde genellikle bir filika aynı zamanda kurtarma botu olarak onaylanabilir. Bot, dümencisiyle birlikte hızla indirilebilmeli ve denizde manevra kabiliyeti yüksek olmalıdır. MOB durumunda hızlı dönüş manevrası (Williamson turn vb.), gözcü ataması ve kurtarma botunun hazır olması hayat kurtarır.",
      },
    ],
    keyPoints: [
      "Filika kapasitesi gemideki toplam kişiyi karşılamalı; free-fall filikalar hızlı tahliye sağlar.",
      "Can salları HRU ile gemi batınca otomatik açılır; painter ile şişer, servis bakımı yıllıktır.",
      "Davitler kontrollü indirme sağlar; release hook bakımı ve eğitimi can güvenliği için kritiktir.",
      "Rescue boat MOB ve sal toplama için hızlı indirilip alınabilmelidir.",
    ],
  },

  "Kişisel Can Kurtarma Donanımı": {
    title: "Kişisel Can Kurtarma Donanımı",
    introduction:
      "Kişisel can kurtarma donanımı, suya düşme veya gemi terkinde bireyin hayatta kalmasını sağlayan ekipmandır: can yelekleri, dalış (immersion) elbiseleri, can simitleri ve konumlandırma cihazları. Doğru tipte, yeterli sayıda, erişilebilir ve çalışır durumda bulunmaları SOLAS ile zorunludur.",
    sections: [
      {
        title: "Can Yelekleri (Lifejackets)",
        content:
          "Can yeleği, suya düşen kişiyi yüzdürür ve baygın bir kişide dahi yüzü suyun üstünde tutacak biçimde tasarlanır. Gemide her kişi için bir adet, ayrıca vardiya yerleri ve toplanma istasyonları için ek yelekler bulunur. Yelekler; düdük, ışık (otomatik su ile aktive olan), retro-reflektif bantlar ve yolcu gemilerinde çocuk/bebek boyları ile donatılır. Giyilme süresi ve doğru bağlama tekniği talimlerle pekiştirilir; yanlış giyilen yelek su içinde kişiyi yüzüstü çevirebilir.",
      },
      {
        title: "Dalış Elbiseleri ve Termal Koruma",
        content:
          "Soğuk sularda asıl tehlike hipotermidir. Dalış elbisesi (immersion suit), su geçirmez ve ısı yalıtımlı tam vücut kıyafetidir; soğuk suda hayatta kalma süresini önemli ölçüde uzatır. SOLAS, soğuk bölgelerde sefer yapan gemilerde her kişi için dalış elbisesi ister. Ayrıca anti-exposure suit (kurtarma botu ekibi için) ve Thermal Protective Aid (TPA, can salında ısı kaybını azaltan örtü) bulunur. Elbisenin hızlı ve doğru giyilmesi düzenli talimle çalışılır.",
      },
      {
        title: "Can Simitleri (Lifebuoys)",
        content:
          "Can simitleri, suya düşen kişiye anında atılabilen yüzdürücü halkalardır. Köprüüstü kanatları ve güverte boyunca erişilebilir noktalara yerleştirilir. Bazıları kendinden ışıklı (self-igniting light), bazıları otomatik duman işaretli (self-activating smoke signal) ve bazıları can halatı (buoyant lifeline) ile donatılır. Köprüüstü kanatlarındaki simitlerin en az biri, MOB anında mevkiyi işaretlemek için ışık+duman ve hızlı bırakma düzeneğine sahiptir.",
      },
      {
        title: "EPIRB, SART ve İşaret Donanımı",
        content:
          "Konum bildiren cihazlar arama-kurtarmayı hızlandırır. EPIRB (Emergency Position-Indicating Radio Beacon), 406 MHz'de Cospas-Sarsat uydularına tehlike sinyali ve konum gönderir; HRU ile gemi batınca otomatik yüzer ve aktive olur. SART (Search and Rescue Transponder) ya da AIS-SART, kurtarma birimlerinin radar/AIS ekranında kurtarma aracının yerini gösterir. Ayrıca el işaret fişekleri (kırmızı el flare), paraşütlü işaret fişeği ve duman işaretleri görsel imdat için kullanılır. Tüm bu cihazların batarya/son kullanma tarihleri düzenli kontrol edilir.",
      },
    ],
    keyPoints: [
      "Her kişi için can yeleği (ışık+düdük) bulunur; doğru giyme talimle pekiştirilir.",
      "Soğuk suda dalış elbisesi hipotermiye karşı hayatta kalma süresini uzatır; TPA salda kullanılır.",
      "Köprüüstü kanat simitleri ışık+duman ve hızlı bırakma ile MOB mevkisini işaretler.",
      "EPIRB konum gönderir, SART/AIS-SART kurtarma aracını ekranda gösterir.",
    ],
  },

  "Yangın Önleme ve Yapısal Koruma": {
    title: "Yangın Önleme ve Yapısal Koruma",
    introduction:
      "Gemide yangın, kapalı ve sınırlı bir ortamda hızla yayılabilen en ciddi tehlikelerden biridir. SOLAS Bölüm II-2; yangının çıkışını önlemeyi, çıktığında yayılmasını yapısal bölmelerle sınırlamayı ve güvenli tahliye ile söndürmeyi hedefler. Temel ilke: önle, sınırla (containment), algıla ve söndür.",
    sections: [
      {
        title: "Yangın Üçgeni ve Önleme",
        content:
          "Yangın için üç unsur gerekir: yakıt, ısı (tutuşma kaynağı) ve oksijen. Bu üçgenin herhangi bir kenarının ortadan kaldırılması yangını önler veya söndürür. Önleme; yakıt sızıntılarının kontrolü, sıcak yüzeylerin yalıtımı (örn. egzoz manifoldları), yağlı bez/atıkların düzgün depolanması, elektrik bakımının düzenli yapılması ve sıcak iş (kaynak/taşlama) için izin sistemiyle sağlanır. Makine dairesi, en yüksek yangın riski taşıyan bölge olarak özel önlemlere tabidir.",
      },
      {
        title: "Yapısal Yangın Koruması (A/B/C Sınıfı Bölmeler)",
        content:
          "Yangının yayılımı, geminin yangın dirençli bölmelerle (fire-resisting divisions) bölünmesiyle sınırlanır. A sınıfı bölmeler çelik yapıdadır ve standart yangın testinde 60 dakika boyunca alev/duman geçişini önler; yalıtım derecesine göre A-60, A-30, A-15, A-0 olarak sınıflanır (sayı, arka yüzün belirli sıcaklık artışına dayandığı dakikadır). B sınıfı bölmeler daha hafif, yanmaz panellerle 30 dakika alev geçişini engeller. C sınıfı bölmeler yanmaz malzemedir ancak belirli bir yangın direnci süresi gerektirmez. Yaşam mahalli, makine dairesi ve kontrol istasyonları bu bölmelerle birbirinden ayrılır.",
      },
      {
        title: "Kaçış Yolları ve Yangın Kontrol Planı",
        content:
          "Her mahalden en az iki ayrı kaçış yolu (means of escape) bulunur; biri bloke olsa bile diğeri kullanılabilir olmalıdır. Kaçış yolları işaretli, aydınlatmalı (acil aydınlatma/düşük konum işaretleri) ve engelsiz tutulur. Geminin yangın kontrol planı (Fire Control Plan), tüm yangın bölmelerini, algılama ve söndürme sistemlerini, kaçış yollarını, yangın kapılarını ve damperleri gösterir; köprüüstünde ve güverteye yakın kalıcı bir kutuda (dışarıdan erişilebilir) bulundurulur. Bu plan, gemi yangınında karadan gelecek itfaiye için de kritik bilgidir.",
      },
      {
        title: "Havalandırma, Damper ve Yangın Kapıları",
        content:
          "Havalandırma sistemleri yangına oksijen taşıyabilir ve dumanı yayabilir; bu yüzden yangın damperleri ve fan stopları ile hızlı kapatılabilir olmalıdır. Makine dairesi ve mutfak (galley) egzoz/havalandırması için uzaktan durdurma (remote stop) ve kapatma düzenekleri bulunur. Yangın kapıları (self-closing fire doors) bölmeler arası açıklıkları yangında otomatik kapatır. Yakıt ve yağ hatlarının uzaktan kapatma valfleri (quick-closing valves) ve acil yakıt pompası durdurma düğmeleri, makine dairesi yangınında yakıt beslemesini keser.",
      },
    ],
    keyPoints: [
      "Yangın üçgeni: yakıt+ısı+oksijen; bir kenarı kaldırmak yangını önler/söndürür.",
      "A/B/C sınıfı bölmeler yayılımı sınırlar; A-60 çelik 60 dk alev+ısı yalıtımı sağlar.",
      "Her mahalde en az iki kaçış yolu; Fire Control Plan köprüüstü ve dış kutuda bulunur.",
      "Yangın damperleri, fan stopları ve quick-closing valfler oksijen/yakıt beslemesini keser.",
    ],
  },

  "Yangın Algılama ve Sabit Söndürme Sistemleri": {
    title: "Yangın Algılama ve Sabit Söndürme Sistemleri",
    introduction:
      "Erken algılama ve hızlı söndürme, gemi yangınında hayatta kalmanın anahtarıdır. SOLAS Bölüm II-2 ve FSS Code (Fire Safety Systems Code), sabit algılama ve söndürme sistemlerinin türünü, kapsamını ve bakımını belirler. Sistem seçimi, korunan mahalin tipine (makine dairesi, yaşam mahalli, yük ambarı) göre yapılır.",
    sections: [
      {
        title: "Yangın Algılama Sistemleri",
        content:
          "Sabit yangın algılama; duman (smoke), ısı (heat) ve alev (flame) dedektörleriyle yangını erken aşamada tespit eder ve köprüüstündeki yangın alarm panelinde mahali (zone) gösterir. Yaşam mahalleri ve koridorlarda duman dedektörleri, makine dairesinde ısı/alev dedektörleri yaygındır. Manuel alarm butonları (call points) personelin yangını elle bildirmesini sağlar. Sistem, arıza durumunda (fault) da uyarı verir; düzenli test ve dedektör temizliği yanlış alarmları ve algılama kaybını önler.",
      },
      {
        title: "CO₂ ve Gazlı Söndürme Sistemleri",
        content:
          "Makine daireleri ve yük ambarları için yaygın sabit sistem, gazlı (total flooding) söndürmedir. CO₂ sistemi, mahale yüksek konsantrasyonda CO₂ boşaltarak oksijeni söndürme eşiğinin altına düşürür. CO₂ insanı boğacağı için boşaltma öncesi zorunlu prosedür uygulanır: alarm çalar, personel tahliye edilir, mahal sayımı yapılır, havalandırma ve yakıt kapatılır, kapılar kapatılır, ardından iki ayrı işlemle (pilot valf + ana valf) gaz salınır. FM-200 gibi temiz ajan veya inert gaz sistemleri bazı mahallerde CO₂ yerine kullanılır.",
      },
      {
        title: "Su Bazlı Sistemler: Sprinkler ve Water Mist",
        content:
          "Yaşam mahalleri ve bazı makine daireleri otomatik sprinkler veya yüksek basınçlı su sisi (water mist) sistemleriyle korunur. Sprinkler, belirli sıcaklıkta açılan ampul/başlıklarla yangın bölgesine su püskürtür ve aynı anda alarm verir. Water mist, çok ince su damlacıklarıyla hem soğutma hem buharlaşmayla oksijen seyreltme etkisi yaratır; CO₂'ye göre personel için daha güvenlidir ve makine dairelerinde yaygınlaşmıştır. Köpük (foam) sistemleri ise yakıt/yağ (B sınıfı) yangınlarında yüzeyi örterek kullanılır.",
      },
      {
        title: "Yangın Ana Devresi, Pompalar ve Acil Pompa",
        content:
          "Gemide basınçlı yangın suyu, yangın ana devresi (fire main) ve hidrant/musluklarla her noktaya ulaşır. Bir veya daha fazla yangın pompası bu devreyi besler. Ana yangın pompasının bulunduğu makine dairesi yangında erişilemez hâle gelebileceğinden, ana mahal dışında bağımsız tahrikli bir acil yangın pompası (emergency fire pump) bulunur. İzolasyon valfleri, hasarlı bir hat bölümünü ayırıp devrenin geri kalanını basınçlı tutmaya imkân verir. Hortum, nozül ve uluslararası kıyı bağlantısı (international shore connection) düzenli kontrol edilir.",
      },
    ],
    keyPoints: [
      "Sabit algılama duman/ısı/alev dedektörleri ve manuel butonlarla mahali panelde gösterir.",
      "CO₂ total-flooding söndürür ancak boğucudur; boşaltmadan önce tahliye+sayım+kapatma şarttır.",
      "Sprinkler ve water mist su bazlı korumadır; water mist personel için daha güvenlidir.",
      "Makine dairesi dışındaki bağımsız acil yangın pompası, ana pompa erişilemezken devreyi besler.",
    ],
  },

  "Yangınla Mücadele ve Söndürücüler": {
    title: "Yangınla Mücadele ve Söndürücüler",
    introduction:
      "Sabit sistemlerin yanında, mürettebatın taşınabilir söndürücüler ve yangın ekipmanıyla ilk müdahalesi yangının büyümesini önler. Doğru söndürücüyü doğru yangın sınıfına uygulamak ve organize bir yangın ekibiyle çalışmak esastır. Eğitim ve düzenli talim, gerçek yangında doğru tepkiyi belirler.",
    sections: [
      {
        title: "Yangın Sınıfları",
        content:
          "Yangınlar yakıt türüne göre sınıflandırılır: A sınıfı katı yanıcılar (ahşap, kâğıt, tekstil), B sınıfı yanıcı sıvılar (yakıt, yağ, boya), C sınıfı yanıcı gazlar (bazı sistemlerde elektrik), D sınıfı yanıcı metaller, F (veya K) sınıfı mutfak yağ/donyağı yangınları. Elektrik yangınları (gerilim altındaki ekipman), iletken olmayan söndürücü gerektirir (CO₂, kuru kimyevi toz). Yanlış söndürücü kullanımı tehlikelidir: örneğin yağ yangınına su atmak yangını yayar; gerilim altındaki ekipmana su iletkenlik riski yaratır.",
      },
      {
        title: "Taşınabilir Söndürücü Tipleri",
        content:
          "Başlıca tipler: su (A sınıfı; soğutarak söndürür), köpük/foam (A ve B; yüzeyi örter), kuru kimyevi toz (çok amaçlı A/B/C ve elektrik; tepkimeyi keser), CO₂ (B ve elektrik; oksijeni keser, temiz bırakır) ve mutfak için özel ıslak kimyevi (F/K sınıfı). Kullanım tekniği PASS ile özetlenir: Pull (pimi çek), Aim (alevin tabanına yönelt), Squeeze (tetiği sık), Sweep (süpür). Söndürücüler aylık görsel kontrol, yıllık bakım ve periyodik hidrostatik teste tabidir; basınç göstergesi ve mühür kontrol edilir.",
      },
      {
        title: "İtfaiyeci Teçhizatı (Fireman's Outfit) ve EEBD",
        content:
          "İtfaiyeci teçhizatı; koruyucu giysi, bot, eldiven, baret, emniyet halatı, yangın baltası ve bağımsız solunum cihazından (Self-Contained Breathing Apparatus, SCBA) oluşur. SCBA, dumanlı/oksijensiz ortamda solunabilir hava sağlar; tüp basıncı kullanım öncesi kontrol edilir ve düşük basınç alarmı vardır. EEBD (Emergency Escape Breathing Device), yangından kaçış için kısa süreli (genellikle ~10-15 dk) solunum sağlayan tek kullanımlık cihazdır; söndürme için değil yalnızca kaçış için kullanılır. Teçhizatın sayısı ve konumu SOLAS'a göre belirlenir.",
      },
      {
        title: "Yangın Ekibi ve Organizasyon",
        content:
          "Gerçek yangında bireysel değil, organize ekip müdahalesi esastır. Toplanma (muster) sonrası yangın ekibi (fire party) saldırı timi, destek/su timi ve sınır soğutma (boundary cooling) görevleriyle örgütlenir. Köprüüstü olayı koordine eder, mevki ve durum bilgisini iletir; gerekirse karaya/yakındaki gemilere yardım çağrısı yapar. Saldırı timi her zaman çift olarak ve emniyet halatıyla girer, geri çekilme yolu açık tutulur. Sınır soğutma, yangının komşu mahallere yapısal bölmeler üzerinden yayılmasını önler.",
      },
    ],
    keyPoints: [
      "Yangın sınıfı (A/B/C/D/F-K ve elektrik) doğru söndürücüyü belirler; yanlış seçim tehlikelidir.",
      "Söndürücü kullanımı: PASS (Pull-Aim-Squeeze-Sweep); aylık/yıllık bakım yapılır.",
      "Fireman's outfit + SCBA söndürme içindir; EEBD yalnızca kaçış için kısa süre hava verir.",
      "Yangına organize ekip müdahale eder: saldırı, destek ve sınır soğutma; köprüüstü koordine eder.",
    ],
  },

  "Acil Durum Hazırlığı ve Talimler": {
    title: "Acil Durum Hazırlığı ve Talimler",
    introduction:
      "Acil durumlarda hayatta kalma, önceden planlanmış ve talimlerle pekiştirilmiş tepkilere bağlıdır. SOLAS; toplanma listesi (muster list), düzenli talimler ve gemiye özel acil durum prosedürlerini zorunlu kılar. 'Plana göre hazırlık + tekrarlı talim', panik ve hatayı azaltır.",
    sections: [
      {
        title: "Toplanma Listesi (Muster List) ve Görevler",
        content:
          "Muster list, her mürettebat üyesinin acil durumdaki toplanma istasyonunu ve özel görevini (filika indirme, yangın ekibi, yolcu yönlendirme, telsiz, ilk yardım vb.) gösteren resmî belgedir. Gemide görünür yerlere (köprüüstü, makine kontrol, yaşam mahalli) asılır. Acil durum alarm işaretlerini, gemi terk komutunu ve yolculara verilecek talimatları da içerir. Her kişi kendi görevini ve istasyonunu bilmek zorundadır; kabinlerde kişiye özel görev kartları bulunur.",
      },
      {
        title: "Alarm İşaretleri",
        content:
          "Genel acil durum alarmı (general emergency alarm), gemi düdüğü ve elektrikli zillerle verilen yedi kısa + bir uzun düdük işaretidir; tüm gemiye acil duruma geçildiğini ve toplanma istasyonlarına gidilmesini bildirir. Bunun yanında yangın alarmı, gemi terk komutu (sözlü/telsizle) ve diğer dahili işaretler tanımlıdır. Alarm işaretleri muster list'te ve kabinlerde açıkça belirtilir. Gemi terk kararı yalnızca kaptan tarafından verilir; alarm tek başına gemiyi terk anlamına gelmez.",
      },
      {
        title: "Talimler (Drills) ve Eğitim",
        content:
          "SOLAS düzenli talimleri zorunlu kılar: yangın ve gemi terk talimi genellikle ayda en az bir kez yapılır; yeni katılan mürettebat gemiye binişten kısa süre sonra (tipik 24 saat içinde) eğitilir. Yolcu gemilerinde yolcu toplanma talimi sefer başında uygulanır. Filika belirli aralıklarla suya indirilip çalıştırılır; can salı ve kurtarma botu prosedürleri tatbik edilir. Kapalı mahal giriş/kurtarma ve karaya oturma/çatışma/kirlilik gibi senaryolar da düzenli talim edilir. Talimler gemi günlüğüne kaydedilir.",
      },
      {
        title: "Acil Durum Planları ve İletişim",
        content:
          "Gemide yazılı acil durum prosedürleri (yangın, gemi terk, MOB, karaya oturma, çatışma, kirlilik, ağır hava, kapalı mahal kurtarma) bulunur ve SMS kapsamında güncel tutulur. Acil durumda iç haberleşme (telsiz, PA sistemi) ve dış haberleşme (GMDSS ile MAYDAY/PAN-PAN, şirket DPA, MRCC) net biçimde yürütülür. Köprüüstü olayın komuta merkezidir; bilgi akışı, karar ve kaynak yönetimi buradan koordine edilir. Düzenli güncelleme ve tatbikat, planların gerçek olayda işlemesini sağlar.",
      },
    ],
    keyPoints: [
      "Muster list herkesin toplanma istasyonunu ve acil görevini gösterir; görünür yerlere asılır.",
      "Genel acil durum alarmı: yedi kısa + bir uzun düdük; gemi terk kararını yalnızca kaptan verir.",
      "Yangın ve gemi terk talimi ayda en az bir kez; yeni mürettebat ~24 saat içinde eğitilir.",
      "Yazılı acil durum planları SMS'te güncel tutulur; köprüüstü olayı koordine eder.",
    ],
  },

  "Kapalı Mahal Girişi": {
    title: "Kapalı Mahal Girişi",
    introduction:
      "Kapalı/sınırlı mahaller (enclosed spaces) — yük ambarları, balast/yakıt tankları, koferdamlar, zincirlikler, boş hacimler — oksijen azlığı, zehirli veya yanıcı gaz nedeniyle ölümcül olabilir. Kapalı mahal kazaları, denizcilikteki en sık ölümle sonuçlanan olaylar arasındadır ve çoğu, hazırlıksız 'kurtarmaya koşan' ikinci kişinin de ölümüyle ağırlaşır. Bu nedenle giriş, katı bir prosedüre bağlanır.",
    sections: [
      {
        title: "Tehlikenin Doğası",
        content:
          "Kapalı mahalde atmosfer üç şekilde ölümcül olabilir: (1) oksijen azlığı — paslanma, yük oksidasyonu (örn. çelik, kömür, ahşap, tarımsal ürün) veya inert gaz oksijeni tüketir; %21 olması gereken oksijen kritik düzeye iner; (2) zehirli gaz — hidrojen sülfür (H₂S), karbon monoksit (CO), yük/kimyasal buharları; (3) yanıcı gaz/buhar — patlama riski. Bu gazlar genellikle renksiz/kokusuz olabilir veya koku alma duyusunu felç edebilir (H₂S). Hiçbir mahale 'sadece bir dakika' güveniyle test edilmeden girilmez.",
      },
      {
        title: "Giriş İzni ve Atmosfer Testi",
        content:
          "Girişten önce kapalı mahal giriş izni (enclosed space entry permit) düzenlenir; izin, sorumlu zabit tarafından onaylanır ve geçerlilik süresi sınırlıdır. Mahal yeterince havalandırılır ve atmosfer kalibre cihazlarla, doğru sırayla test edilir: önce oksijen (%20.9 hedef), sonra yanıcı gaz (LEL — alt patlama sınırının altında), sonra zehirli gazlar (H₂S, CO vb. izin verilen sınırların altında). Test, mahalin üst/orta/alt seviyelerinden ve uzaktan (giriş öncesi içeri girmeden) yapılır. Ölçüm güvenli değilse girilmez; havalandırma sürdürülür.",
      },
      {
        title: "Güvenli Giriş Uygulaması",
        content:
          "Giriş sırasında havalandırma sürdürülür ve atmosfer sürekli/aralıklı izlenir (taşınabilir gaz dedektörü ile). Girişte daima bir gözcü (standby/attendant) mahalin ağzında durur; içerideki kişiyle sürekli haberleşir ve asla tek başına içeri kurtarmaya girmez. Haberleşme yöntemi (telsiz, halat işareti) önceden kararlaştırılır. Gerekiyorsa solunum cihazı (SCBA) ve emniyet kemeri/kurtarma halatı kullanılır. Atmosfer bozulursa veya iletişim kesilirse mahal derhâl terk edilir.",
      },
      {
        title: "Kurtarma ve Eğitim",
        content:
          "Kapalı mahal kurtarması, hazır ekipman ve eğitimli ekip gerektirir: SCBA, kurtarma halatı/üçayak (tripod) ve vinç, ilk yardım donanımı önceden hazır bulundurulur. Kurtarıcı asla korunmasız girmez; aksi hâlde kurban sayısı artar. SOLAS, gemilerde düzenli kapalı mahal giriş ve kurtarma talimini (genellikle iki ayda bir) zorunlu kılar. Tatbikatlar gerçekçi senaryolarla yapılır ve günlüğe kaydedilir; en önemli ders 'içgüdüsel kurtarma'nın değil planlı, korunaklı müdahalenin hayat kurtardığıdır.",
      },
    ],
    keyPoints: [
      "Tehlike: oksijen azlığı, zehirli gaz (H₂S/CO) ve yanıcı gaz; gazlar kokusuz/farkedilmez olabilir.",
      "Giriş öncesi izin + havalandırma + sıralı test: önce O₂, sonra yanıcı (LEL), sonra zehirli gaz.",
      "Daima gözcü bulunur; gözcü asla tek başına kurtarmaya girmez, iletişim sürekli tutulur.",
      "Kurtarma SCBA ve ekipmanla yapılır; SOLAS düzenli giriş/kurtarma talimi ister.",
    ],
  },

  "İş Sağlığı, Güvenliği ve KKD": {
    title: "İş Sağlığı, Güvenliği ve KKD",
    introduction:
      "Günlük gemi operasyonlarındaki kazaların çoğu, düşme, sıkışma, yanlış kaldırma, kimyasal maruziyet ve yetersiz koruma gibi önlenebilir nedenlerden kaynaklanır. Risk değerlendirmesi, iş izinleri ve kişisel koruyucu donanım (KKD), bireyin günlük işte güvende kalmasını sağlar. Emniyet, acil durumlar kadar rutin işlerde de yönetilir.",
    sections: [
      {
        title: "Risk Değerlendirme ve İş İzni",
        content:
          "Riskli işler öncesi risk değerlendirmesi (risk assessment) yapılır: tehlikeler belirlenir, olasılık ve şiddet değerlendirilir, kontrol önlemleri tanımlanır (önce ortadan kaldırma/azaltma, sonra KKD). Yüksek riskli işler iş izni (permit to work) gerektirir: sıcak iş (kaynak/taşlama), kapalı mahal girişi, elektrik kesme/kilitleme (LOTO), yüksekte ve bordada çalışma. İzin; işi, tehlikeleri, önlemleri ve sorumluları belgeler ve yetkili kişi onaylar. İş öncesi kısa toolbox toplantısıyla ekip bilgilendirilir.",
      },
      {
        title: "Kişisel Koruyucu Donanım (KKD)",
        content:
          "KKD, tehlikeyle birey arasındaki son savunma hattıdır: baret (kafa), koruyucu gözlük/siperlik (göz), kulaklık/kulak tıkacı (gürültü), eldiven (el — işe uygun tip), çelik burunlu bot (ayak), koruyucu tulum, yüksekte çalışmada emniyet kemeri/harness ve solunum koruması (maske/respiratör). KKD işe uygun seçilir, doğru kullanılır, kontrol edilir ve hasarlıysa değiştirilir. KKD tehlikeyi ortadan kaldırmaz; bu yüzden önce mühendislik ve prosedür önlemleri uygulanır, KKD bunları tamamlar.",
      },
      {
        title: "Tipik Tehlikeler ve Önlemler",
        content:
          "Gemideki yaygın tehlikeler ve önlemleri: yüksekten/bordadan düşme (harness, korkuluk, can halatı); makine ve döner ekipmanda sıkışma (koruyucu kapaklar, LOTO); kayma/takılma (düzenli güverte, anti-slip, temizlik); manuel kaldırma yaralanmaları (doğru teknik, yardımcı ekipman); gürültü ve titreşim (kulak koruması, maruziyet süresi); kimyasal maruziyet (MSDS okuma, havalandırma, uygun KKD); elektrik (izolasyon, LOTO, yalıtkan ekipman). Ağır havada güvertede çalışma ayrı önlem ve kaptan onayı gerektirir.",
      },
      {
        title: "MSDS, Ergonomi ve Sağlık",
        content:
          "Tehlikeli madde ve kimyasallarla çalışmadan önce Güvenlik Bilgi Formu (Material Safety Data Sheet, MSDS/SDS) okunur; maddenin tehlikeleri, ilk yardım, dökülme/yangın müdahalesi ve gerekli KKD buradan öğrenilir. Ergonomi (doğru duruş, kaldırma tekniği, mola) kas-iskelet yaralanmalarını azaltır. Yorgunluk yönetimi (yeterli dinlenme/uyku), insan hatasını ve kazaları önlemede kritiktir; STCW dinlenme süresi gerekliliklerine uyulur. Sağlık, hijyen ve uygun beslenme de uzun seferlerde emniyetin parçasıdır.",
      },
    ],
    keyPoints: [
      "Riskli işler önce risk değerlendirmesi, yüksek riskliler iş izni (permit to work) gerektirir.",
      "KKD son savunma hattıdır; önce mühendislik/prosedür önlemi, sonra uygun KKD uygulanır.",
      "Düşme, sıkışma, kayma, kaldırma, gürültü, kimyasal ve elektrik başlıca tehlikelerdir.",
      "Kimyasal öncesi MSDS okunur; ergonomi ve yorgunluk yönetimi insan hatasını azaltır.",
    ],
  },
};
