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
          "Filikalar, gemi terkinde **toplu tahliye** için kullanılan, motorlu ve genellikle **tam kapalı (totally enclosed)** teknelerdir.\n\n**Kapasite kuralı:** SOLAS, gemideki **toplam kişiyi** karşılayacak filika kapasitesi ister. Yük gemilerinde tipik düzen: her iki bordada toplam kişiyi alacak filika, **veya** bir tarafta **serbest düşmeli (free-fall)** filika.\n\n**Donanım:** Her filika; motor, içme suyu, gıda rasyonu, ilk yardım, işaret fişekleri, kürek ve seyir ekipmanıyla donatılır.\n\n**Free-fall:** Baştan kıça eğimli bir rampadan suya bırakılır ve davit indirmesini beklemeden **hızlı tahliye** sağlar.\n\n**Gemide önemi:** Filika kapasitesi ve çalışırlığı gemi terkinin belkemiğidir; düzenli **indirme talimi** olmadan kriz anında filika indirmek ölümcül gecikme/kaza riskidir.",
      },
      {
        title: "Can Salları (Liferafts)",
        content:
          "Can salları, **şişirilebilir (inflatable)** veya rijit, kapasiteleri işaretli kurtarma araçlarıdır.\n\n**HRU — otomatik açılma:** Genellikle **Hydrostatic Release Unit** ile donatılır: gemi batarsa belirli derinlikte (~1,5-4 m) **su basıncı** salı otomatik serbest bırakır; sal yüzeye çıkıp şişer. Bu, mürettebatın salı elle atamadığı ani batışlarda hayat kurtarır.\n\n**Şişme ve donanım:** Sal, **painter (bağlama halatı)** ile gemiye bağlıdır; çekildiğinde CO₂/azot tüpüyle **saniyeler içinde** şişer. İçinde acil rasyon, su, deniz çapası, işaret donanımı ve koruyucu tente bulunur.\n\n**Bakım:** Servis istasyonunda **yıllık** bakım zorunludur (şişme testi, donanım kontrolü, HRU son kullanım tarihi).\n\n**Gemide önemi:** HRU'nun doğru bağlanması kritiktir; yanlış/ters bağlı HRU salın gemiyle birlikte batmasına yol açar — bağlantı düzenli kontrol edilir.",
      },
      {
        title: "İndirme Donanımı (Davit) ve Serbest Düşme",
        content:
          "Davitler, filika ve salları **kontrollü** biçimde suya indiren mekanizmalardır.\n\n**Gravity davit:** Filikayı kendi ağırlığıyla dışa çıkarır ve halatla (**fall**) yavaşça indirir; **frenli vinç** hız kontrolü sağlar. **Serbest düşmeli** düzenekte ise filika rampadan kayarak suya girer.\n\n**Test:** İndirme donanımı belirli aralıklarla **yük testine** ve düzenli **işletim testine** tabidir.\n\n**Release hook (kritik):** On-load/off-load açma kancaları, filikanın suya değdikten sonra güvenle ayrılmasını sağlar. Bu kancaların **yanlış kullanımı** geçmişte pek çok ölümcül talim kazasına yol açmıştır; bu yüzden bakım, kilitleme ve eğitim hayatidir (Fall Preventer Device kullanımı önerilir).\n\n**Gemide önemi:** Talim kazalarının çoğu davit/release hook kaynaklıdır; doğru prosedür, talimin kendisinin kaza olmasını engeller.",
      },
      {
        title: "Kurtarma Botu (Rescue Boat) ve MOB",
        content:
          "**Kurtarma botu (rescue boat)**, denize adam düşmesi (**MOB**) ve can salı toplama gibi görevler için **hızlı** indirilip alınabilen ayrı bir teknedir. Yük gemilerinde genellikle bir filika aynı zamanda kurtarma botu olarak onaylanabilir.\n\n**Gereklilik:** Bot, dümencisiyle hızla indirilebilmeli ve denizde **yüksek manevra** kabiliyetine sahip olmalıdır.\n\n**MOB müdahalesi:** Adam düşmesinde **hızlı dönüş manevrası** (Williamson/Anderson turn), can simidi + duman/ışık atma, **gözcü ataması** (kaybetmeden takip) ve kurtarma botunun hazır olması hayat kurtarır. Zaman kritiktir: soğuk suda dakikalar belirleyicidir.\n\n**Gemide önemi:** MOB tatbikatı düzenli yapılır; 'adam denizde' anında panik değil, ezberlenmiş bir sıralama (işaret at → dön → gözcü → bot) devreye girmelidir.",
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
          "Can yeleği, suya düşen kişiyi yüzdürür ve **baygın bir kişide bile yüzü suyun üstünde** tutacak biçimde tasarlanır (self-righting).\n\n**Sayı ve yer:** Gemide her kişi için bir adet; ayrıca vardiya yerleri ve toplanma istasyonları için **ek** yelekler bulunur (kişi kamarasından uzaktayken yakınında bir yelek olsun diye).\n\n**Donanım:** Düdük, **otomatik su ile aktive olan ışık**, retro-reflektif bantlar; yolcu gemilerinde **çocuk/bebek** boyları.\n\n**Gemide önemi:** Giyme süresi ve doğru bağlama talimle pekiştirilir; **yanlış giyilen yelek su içinde kişiyi yüzüstü çevirip** boğabilir — bu yüzden 'giy ve bağla' hareketi ezberletilir.",
      },
      {
        title: "Dalış Elbiseleri ve Termal Koruma",
        content:
          "Soğuk sularda asıl tehlike **hipotermidir** — boğulmadan önce ısı kaybı öldürür.\n\n**Immersion suit:** Su geçirmez ve ısı yalıtımlı **tam vücut** kıyafeti; soğuk suda hayatta kalma süresini **dakikalardan saatlere** çıkarır. SOLAS, soğuk bölgelerde sefer yapan gemilerde **her kişi için** dalış elbisesi ister.\n\n**Diğer koruma:** **Anti-exposure suit** (kurtarma botu ekibi için, hareket serbestliği fazla) ve **TPA (Thermal Protective Aid)** — can salında ısı kaybını azaltan örtü.\n\n**Gemide önemi:** Elbisenin **hızlı ve doğru** giyilmesi düzenli talimle çalışılır; kriz anında beceriksizce giyilen elbise tahliye penceresini kaçırtır. Sıcak sularda dahi TPA salda kritiktir (gece/rüzgârda ısı kaybı).",
      },
      {
        title: "Can Simitleri (Lifebuoys)",
        content:
          "Can simitleri, suya düşen kişiye **anında atılabilen** yüzdürücü halkalardır; köprüüstü kanatları ve güverte boyunca **erişilebilir** noktalara yerleştirilir.\n\n**Donanım çeşitleri:** Bazıları kendinden ışıklı (**self-igniting light**), bazıları otomatik duman işaretli (**self-activating smoke**), bazıları can halatlı (**buoyant lifeline**).\n\n**Köprü kanadı simidi (kritik):** Kanatlardaki simitlerden en az biri, MOB anında mevkiyi işaretlemek için **ışık + duman ve hızlı bırakma** düzeneğine sahiptir — düşen kişinin yerini gece bile belli eder.\n\n**Gemide önemi:** MOB'da ilk hareket bu simidi atmaktır; hem yüzdürür hem **düşme noktasını işaretler** (gemi ilerlediğinden kişi hızla geride kalır). Işık+duman, dönüş manevrası boyunca referans noktasıdır.",
      },
      {
        title: "EPIRB, SART ve İşaret Donanımı",
        content:
          "Konum bildiren cihazlar arama-kurtarmayı **hızlandırır**:\n\n- **EPIRB:** 406 MHz'de **Cospas-Sarsat** uydularına tehlike sinyali ve konum gönderir; **HRU ile gemi batınca otomatik yüzer ve aktive olur**. Kayıtlı kimlik (MMSI/ülke) kurtarmayı yönlendirir.\n- **SART / AIS-SART:** Kurtarma birimlerinin **radar/AIS ekranında** kurtarma aracının yerini gösterir (radar SART ekranda 12 noktalı bir çizgi üretir).\n- **Görsel işaretler:** kırmızı el flare, paraşütlü işaret fişeği ve duman — yakın mesafe görsel imdat.\n\n**Gemide önemi:** Tüm bu cihazların **batarya/son kullanma tarihleri** düzenli kontrol edilir; EPIRB'in HRU'su ve kaydı güncel olmalı — yanlış kayıtlı/süresi geçmiş EPIRB, kurtarmayı geciktirir veya yanlış yere yönlendirir.",
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
          "Yangın için **üç unsur** gerekir: **yakıt + ısı (tutuşma) + oksijen** (yangın üçgeni). Herhangi bir kenarı ortadan kaldırmak yangını **önler veya söndürür** — söndürme mantığının tamamı budur.\n\n**Önleme (kenarları ayrı tutmak):** yakıt sızıntılarının kontrolü, sıcak yüzeylerin yalıtımı (egzoz manifoldu), yağlı bez/atıkların **düzgün depolanması** (kendiliğinden tutuşma riski), düzenli elektrik bakımı ve **sıcak iş (kaynak/taşlama) izni**.\n\n**En riskli bölge:** **Makine dairesi** — sıcak yüzeyler + yakıt/yağ + elektrik bir arada; özel önlemlere tabidir.\n\n**Gemide önemi:** Gemi yangınlarının çoğu makine dairesinde, **yakıt sızıntısının sıcak yüzeye** temasıyla başlar; sızıntı kontrolü ve yalıtım en etkili tek önlemdir.",
      },
      {
        title: "Yapısal Yangın Koruması (A/B/C Sınıfı Bölmeler)",
        content:
          "Yangının yayılımı, geminin **yangın dirençli bölmelerle** (fire-resisting divisions) bölünmesiyle sınırlanır (containment):\n\n- **A sınıfı:** **çelik** yapı; standart testte **60 dakika** alev/duman geçişini önler. Yalıtıma göre **A-60, A-30, A-15, A-0** (sayı, arka yüzün belirli sıcaklık artışına dayandığı dakikadır; A-0 alev geçirmez ama yalıtımsız).\n- **B sınıfı:** daha hafif yanmaz paneller; **30 dakika** alev geçişini engeller.\n- **C sınıfı:** yanmaz malzeme, ama belirli bir yangın direnci süresi gerekmez.\n\n**Ayrım:** Yaşam mahalli, makine dairesi ve kontrol istasyonları bu bölmelerle birbirinden ayrılır.\n\n**Gemide önemi:** A-60, kritik ayrımların (ör. makine dairesi–yaşam mahalli) standardıdır; bir bölmenin sınıfını bilmek, yangında 'ne kadar sürem var' sorusunu yanıtlar.",
      },
      {
        title: "Kaçış Yolları ve Yangın Kontrol Planı",
        content:
          "Her mahalden **en az iki ayrı kaçış yolu** (means of escape) bulunur; biri bloke olsa bile diğeri kullanılabilir olmalıdır.\n\n**Kaçış yolu koşulları:** işaretli, **acil aydınlatmalı** (düşük konum işaretleri / LLL), engelsiz — koridora bırakılan bir sandık bile kaçışı öldürebilir.\n\n**Fire Control Plan:** Tüm yangın bölmelerini, algılama/söndürme sistemlerini, kaçış yollarını, yangın kapıları ve damperleri gösterir; **köprüüstünde** ve güverteye yakın, **dışarıdan erişilebilir kalıcı bir kutuda** bulundurulur.\n\n**Gemide önemi:** Bu plan, gemi yangınında karadan gelecek **itfaiye** için de kritik bilgidir — dış kutu tam bu yüzden vardır. Kaçış yollarını 'depo' gibi kullanmak, PSC eksikliği ve gerçek yangında ölüm nedenidir.",
      },
      {
        title: "Havalandırma, Damper ve Yangın Kapıları",
        content:
          "Havalandırma yangına **oksijen taşır** ve **dumanı yayar**; bu yüzden hızlı kapatılabilir olmalıdır.\n\n**Kontrol düzenekleri:**\n- **Yangın damperleri + fan stopları:** kanalları ve fanları kapatır.\n- **Uzaktan durdurma (remote stop):** makine dairesi ve **mutfak (galley)** egzoz/havalandırması için.\n- **Self-closing fire doors:** bölmeler arası açıklıkları yangında otomatik kapatır (kapı takozla açık tutulmamalı!).\n- **Quick-closing valves + acil yakıt pompası durdurma:** makine dairesi yangınında **yakıt beslemesini** dışarıdan keser.\n\n**Gemide önemi:** Yangını 'boğmak' için oksijen (havalandırma) ve yakıt (valfler) aynı anda kesilir; tek bir açık damper veya takozlanmış yangın kapısı, containment'ı bozup yangını yayar.",
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
          "Sabit yangın algılama; **duman, ısı ve alev** dedektörleriyle yangını **erken** tespit eder ve köprüüstündeki panelde **mahali (zone)** gösterir.\n\n**Dedektör-mahal uyumu:** Yaşam mahalli ve koridorlarda **duman**, makine dairesinde **ısı/alev** dedektörleri yaygındır (makine dairesinde normal is/buhar duman dedektörünü yanıltır).\n\n**Manuel butonlar (call points):** Personelin yangını **elle** bildirmesini sağlar — insan çoğu zaman dedektörden önce görür.\n\n**Arıza uyarısı:** Sistem, kablo kopması/dedektör arızasında da (**fault**) uyarır.\n\n**Gemide önemi:** Düzenli test ve dedektör temizliği hem **yanlış alarmları** (personelin alarmı ciddiye almamasına yol açar) hem **algılama kaybını** önler; erken algılama, küçük yangını büyük yangından ayırır.",
      },
      {
        title: "CO₂ ve Gazlı Söndürme Sistemleri",
        content:
          "Makine daireleri ve yük ambarları için yaygın sabit sistem **gazlı (total flooding)** söndürmedir.\n\n**CO₂ mantığı:** Mahale yüksek konsantrasyonda CO₂ boşaltarak **oksijeni söndürme eşiğinin altına** düşürür.\n\n**Ölümcül risk — boğma:** CO₂ insanı boğar; bu yüzden boşaltma öncesi **zorunlu prosedür** vardır: **alarm çalar → personel tahliye → mahal sayımı → havalandırma + yakıt kapat → kapıları kapat → iki ayrı işlemle (pilot valf + ana valf) gaz salınır**. Sayım yapılmadan CO₂ salmak insan öldürür.\n\n**Alternatifler:** **FM-200** (temiz ajan) veya inert gaz sistemleri bazı mahallerde CO₂ yerine kullanılır (personel için daha az riskli).\n\n**Gemide önemi:** CO₂ salımı, insan sayımına bağlı, geri dönüşü olmayan kritik bir karardır; prosedürün her adımı (özellikle 'herkes dışarıda mı') hayatidir.",
      },
      {
        title: "Su Bazlı Sistemler: Sprinkler ve Water Mist",
        content:
          "Yaşam mahalleri ve bazı makine daireleri **su bazlı** sistemlerle korunur:\n\n- **Sprinkler:** Belirli sıcaklıkta açılan **ampul/başlıklarla** yangın bölgesine su püskürtür ve **aynı anda alarm** verir (yalnız yanan bölgedeki başlık açılır, tüm mahali ıslatmaz).\n- **Water mist (yüksek basınçlı su sisi):** Çok ince damlacıklarla hem **soğutma** hem buharlaşmayla **oksijen seyreltme** yapar; CO₂'ye göre **personel için güvenlidir** ve makine dairelerinde yaygınlaşmıştır.\n- **Foam (köpük):** Yakıt/yağ (**B sınıfı**) yangınında yüzeyi örterek söndürür.\n\n**Gemide önemi:** Su bazlı sistemler personeli boğmadığından yaşam mahallinde tercih edilir; doğru sistem, korunan mahalin yangın türüne (A mı B mi) ve personel varlığına göre seçilir.",
      },
      {
        title: "Yangın Ana Devresi, Pompalar ve Acil Pompa",
        content:
          "Basınçlı yangın suyu, **yangın ana devresi (fire main)** ve hidrant/musluklarla her noktaya ulaşır; bir veya daha fazla **yangın pompası** bu devreyi besler.\n\n**Acil yangın pompası (kritik):** Ana pompa **makine dairesinde**dir ve o mahal yangında erişilemez olabilir; bu yüzden ana mahal **dışında**, bağımsız tahrikli bir **emergency fire pump** bulunur — makine dairesi yansa bile su gelir.\n\n**İzolasyon valfleri:** Hasarlı bir hat bölümünü ayırıp devrenin geri kalanını **basınçlı** tutar. **Uluslararası kıyı bağlantısı (international shore connection)** ise karadaki/başka gemideki yangın suyunu geminin devresine bağlamak için standart flanştır.\n\n**Gemide önemi:** Hortum, nozül, valfler ve acil pompa düzenli kontrol edilir; makine dairesi yangınında 'su yok' durumu çoğunlukla acil pompanın bakımsızlığındandır.",
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
          "Yangınlar **yakıt türüne** göre sınıflandırılır ve sınıf, kullanılacak söndürücüyü belirler:\n\n- **A:** katı yanıcılar (ahşap, kâğıt, tekstil).\n- **B:** yanıcı sıvılar (yakıt, yağ, boya).\n- **C:** yanıcı gazlar (bazı sistemlerde elektrik).\n- **D:** yanıcı metaller.\n- **F (veya K):** mutfak yağ/donyağı yangınları.\n- **Elektrik** (gerilim altında): **iletken olmayan** söndürücü gerekir (CO₂, kuru toz).\n\n**Yanlış söndürücü = tehlike:** Yağ yangınına **su** atmak alevi yayar (kızgın yağ suyu buharlaştırıp sıçratır); gerilim altındaki ekipmana su **iletkenlik/çarpılma** riski yaratır.\n\n**Gemide önemi:** İlk refleks 'ne yanıyor' sorusudur; yangın sınıfını yanlış okuyup yanlış söndürücü kullanmak, küçük yangını felakete çevirir.",
      },
      {
        title: "Taşınabilir Söndürücü Tipleri",
        content:
          "Başlıca tipler ve uygun sınıfları:\n- **Su:** A (soğutarak söndürür).\n- **Köpük/foam:** A ve B (yüzeyi örter).\n- **Kuru kimyevi toz:** çok amaçlı A/B/C ve elektrik (tepkimeyi keser).\n- **CO₂:** B ve elektrik (oksijeni keser, temiz bırakır).\n- **Islak kimyevi:** mutfak F/K sınıfı.\n\n**Kullanım — PASS:** **P**ull (pimi çek), **A**im (alevin **tabanına** yönelt), **S**queeze (tetiği sık), **S**weep (süpür). Alevin ucuna değil **tabanına** nişan almak kritiktir.\n\n**Bakım:** Aylık görsel kontrol (basınç göstergesi, mühür), yıllık bakım, periyodik **hidrostatik test**.\n\n**Gemide önemi:** Söndürücüyü tanımak ve PASS'ı refleks hâline getirmek ilk 30 saniyede yangını durdurabilir — taşınabilir söndürücü, büyümeden önceki 'ilk saldırı' silahıdır.",
      },
      {
        title: "İtfaiyeci Teçhizatı (Fireman's Outfit) ve EEBD",
        content:
          "**Fireman's outfit:** koruyucu giysi, bot, eldiven, baret, emniyet halatı, yangın baltası ve **bağımsız solunum cihazı (SCBA)**.\n\n**SCBA:** Dumanlı/oksijensiz ortamda solunabilir **hava** sağlar; tüp basıncı kullanım öncesi kontrol edilir ve **düşük basınç alarmı** vardır (geri dönüş vaktini bildirir).\n\n**EEBD (kritik ayrım):** Emergency Escape Breathing Device — yangından **kaçış** için kısa süreli (~10-15 dk) solunum verir; **söndürme için DEĞİL, yalnızca kaçış için**. EEBD ile yangına girmek ölümcül hatadır.\n\n**Gemide önemi:** SCBA 'gir ve söndür', EEBD 'çık ve kurtul' cihazıdır; ikisini karıştırmak can alır. Teçhizat sayısı ve konumu SOLAS'a göre belirlenir ve tüpler dolu tutulur.",
      },
      {
        title: "Yangın Ekibi ve Organizasyon",
        content:
          "Gerçek yangında bireysel değil, **organize ekip** müdahalesi esastır.\n\n**Örgütlenme (muster sonrası):** yangın ekibi (**fire party**) — **saldırı timi**, **destek/su timi** ve **sınır soğutma (boundary cooling)** görevleriyle bölünür.\n\n**Köprüüstü:** olayı koordine eder, mevki/durum bilgisini iletir; gerekirse karaya/yakındaki gemilere **yardım çağrısı** yapar.\n\n**Saldırı timi kuralları:** her zaman **çift** ve **emniyet halatıyla** girer; **geri çekilme yolu** açık tutulur. **Sınır soğutma**, yangının komşu mahallere yapısal bölmeler üzerinden (ısı iletimi) yayılmasını önler.\n\n**Gemide önemi:** Yangın söndürmenin yarısı 'yayılmayı durdurmaktır' (boundary cooling); tek kişinin kahramanlığı değil, koordineli tim ve açık geri çekilme yolu hayat kurtarır.",
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
          "**Muster list**, her mürettebat üyesinin acil durumdaki **toplanma istasyonunu** ve **özel görevini** (filika indirme, yangın ekibi, yolcu yönlendirme, telsiz, ilk yardım) gösteren resmî belgedir.\n\n**Nerede:** Gemide görünür yerlere (köprüüstü, makine kontrol, yaşam mahalli) asılır; ayrıca kabinlerde **kişiye özel görev kartları** bulunur.\n\n**İçerik:** Acil durum alarm işaretlerini, gemi terk komutunu ve (yolcu gemisinde) yolculara verilecek talimatları da içerir.\n\n**Gemide önemi:** Her kişi kendi görevini ve istasyonunu **ezbere** bilmelidir; kriz anında 'ne yapacağımı listeden okuyayım' vakti yoktur. Muster list, kaosu önceden atanmış rollerle düzene çevirir.",
      },
      {
        title: "Alarm İşaretleri",
        content:
          "**Genel acil durum alarmı**, gemi düdüğü ve elektrikli zillerle verilen **yedi kısa + bir uzun** düdük işaretidir; tüm gemiye acil duruma geçildiğini ve **toplanma istasyonlarına** gidilmesini bildirir.\n\n**Diğer işaretler:** yangın alarmı, gemi terk komutu (sözlü/telsizle) ve dahili işaretler; hepsi muster list'te ve kabinlerde açıkça belirtilir.\n\n**Kritik ayrım:** Gemi terk kararı **yalnızca kaptan** tarafından verilir; **alarm tek başına gemiyi terk anlamına gelmez** — herkes toplanma istasyonuna gider ve emir bekler. Erken/yetkisiz terk, kurtarılabilir bir gemiyi ve canları riske atar.\n\n**Gemide önemi:** '7 kısa 1 uzun' işaretini duyan herkes düşünmeden istasyonuna yönelmeli; bu refleks talimlerle kazanılır.",
      },
      {
        title: "Talimler (Drills) ve Eğitim",
        content:
          "SOLAS düzenli **talimleri zorunlu** kılar:\n- **Yangın ve gemi terk talimi:** genellikle **ayda en az bir** kez.\n- **Yeni mürettebat:** gemiye binişten sonra kısa sürede (tipik **24 saat** içinde) eğitilir.\n- **Yolcu gemisi:** yolcu toplanma talimi **sefer başında**.\n- **Filika:** belirli aralıklarla **suya indirilip çalıştırılır**; can salı ve kurtarma botu prosedürleri tatbik edilir.\n- **Senaryolar:** kapalı mahal giriş/kurtarma, karaya oturma, çatışma, kirlilik.\n\n**Kayıt:** Talimler gemi günlüğüne kaydedilir (PSC ve denetimde bakılır).\n\n**Gemide önemi:** Talim 'kâğıt doldurma' değildir; gerçekçi yapılmayan talim gerçek olayda işe yaramaz. Tekrar, kriz anında paniğin yerine ezberlenmiş eylemi koyar.",
      },
      {
        title: "Acil Durum Planları ve İletişim",
        content:
          "Gemide yazılı **acil durum prosedürleri** (yangın, gemi terk, MOB, karaya oturma, çatışma, kirlilik, ağır hava, kapalı mahal kurtarma) bulunur ve **SMS kapsamında** güncel tutulur.\n\n**İletişim:** Acil durumda **iç** haberleşme (telsiz, PA) ve **dış** haberleşme (GMDSS ile **MAYDAY/PAN-PAN**, şirket DPA, MRCC) net biçimde yürütülür.\n\n**Komuta:** **Köprüüstü** olayın komuta merkezidir; bilgi akışı, karar ve kaynak yönetimi buradan koordine edilir.\n\n**Gemide önemi:** Düzenli güncelleme + tatbikat, planların **gerçek olayda işlemesini** sağlar; iyi bir plan kötü uygulanırsa işe yaramaz — bu yüzden plan ve talim birlikte yaşar.",
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
          "Kapalı mahalde atmosfer **üç şekilde** ölümcül olabilir:\n\n1. **Oksijen azlığı:** paslanma, yük oksidasyonu (çelik, kömür, ahşap, tarımsal ürün) veya **inert gaz** oksijeni tüketir; %21 olması gereken oksijen kritik düzeye iner.\n2. **Zehirli gaz:** hidrojen sülfür (**H₂S**), karbon monoksit (**CO**), yük/kimyasal buharları.\n3. **Yanıcı gaz/buhar:** patlama riski.\n\n**Neden sinsi:** Bu gazlar genellikle **renksiz/kokusuz** olabilir ya da koku alma duyusunu felç edebilir (H₂S yüksek dozda kokuyu 'kapatır').\n\n**Gemide önemi:** Hiçbir mahale 'sadece bir dakika' güveniyle **test edilmeden** girilmez; atmosfer gözle görülmez, yalnız cihazla bilinir.",
      },
      {
        title: "Giriş İzni ve Atmosfer Testi",
        content:
          "Girişten önce **kapalı mahal giriş izni (entry permit)** düzenlenir; izin sorumlu zabit tarafından onaylanır ve **geçerlilik süresi sınırlıdır**.\n\n**Havalandır + test:** Mahal yeterince havalandırılır ve atmosfer kalibre cihazlarla **doğru sırayla** test edilir:\n1. **Oksijen** (%20,9 hedef).\n2. **Yanıcı gaz** (LEL — alt patlama sınırının altında).\n3. **Zehirli gazlar** (H₂S, CO... izin sınırlarının altında).\n\n**Nasıl:** Test, mahalin **üst/orta/alt** seviyelerinden (gazlar katmanlanır) ve **uzaktan** (içeri girmeden) yapılır. Ölçüm güvenli değilse **girilmez**; havalandırma sürdürülür.\n\n**Gemide önemi:** Sıra önemlidir — önce oksijen (cihazların çoğu O₂'ye bağlı çalışır), sonra patlayıcı, sonra zehirli; yanlış sıra veya tek noktadan ölçüm yanıltır.",
      },
      {
        title: "Güvenli Giriş Uygulaması",
        content:
          "Giriş sırasında **havalandırma sürdürülür** ve atmosfer **sürekli/aralıklı izlenir** (taşınabilir gaz dedektörüyle) — atmosfer giriş anında güvenliyken sonra bozulabilir.\n\n**Gözcü (kritik):** Girişte daima bir **gözcü (standby/attendant)** mahalin ağzında durur; içerideki kişiyle **sürekli haberleşir** ve **asla tek başına içeri kurtarmaya girmez**. Haberleşme yöntemi (telsiz, halat işareti) önceden kararlaştırılır.\n\n**Donanım:** Gerekiyorsa **SCBA** ve emniyet kemeri/kurtarma halatı kullanılır. Atmosfer bozulur veya iletişim kesilirse mahal **derhâl terk edilir**.\n\n**Gemide önemi:** Gözcünün 'tek başına kurtarmaya koşmaması' kuralı en çok ihlal edilen ve en çok öldüren kuraldır; gözcü içeri girerse iki kayıp olur.",
      },
      {
        title: "Kurtarma ve Eğitim",
        content:
          "Kapalı mahal kurtarması **hazır ekipman ve eğitimli ekip** gerektirir: **SCBA**, kurtarma halatı/**üçayak (tripod) + vinç**, ilk yardım donanımı önceden hazır bulundurulur.\n\n**Altın kural:** Kurtarıcı **asla korunmasız girmez**; aksi hâlde kurban sayısı artar (kapalı mahal ölümlerinin büyük kısmı 'kurtarmaya koşan' korunmasız ikinci/üçüncü kişilerdir).\n\n**Talim:** SOLAS, düzenli **kapalı mahal giriş ve kurtarma talimini** (genellikle **iki ayda bir**) zorunlu kılar; gerçekçi senaryolarla yapılıp günlüğe kaydedilir.\n\n**Gemide önemi:** En önemli ders, 'içgüdüsel kurtarma'nın değil **planlı, korunaklı müdahalenin** hayat kurtardığıdır; panikle içeri koşmak insani ama ölümcüldür.",
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
          "Riskli işler öncesi **risk değerlendirmesi** yapılır: tehlikeler belirlenir, **olasılık × şiddet** değerlendirilir, kontrol önlemleri tanımlanır.\n\n**Kontrol hiyerarşisi:** önce **ortadan kaldırma/azaltma** (mühendislik, prosedür), **sonra KKD** — KKD son çaredir.\n\n**İş izni (permit to work):** Yüksek riskli işler izin gerektirir — **sıcak iş** (kaynak/taşlama), **kapalı mahal**, elektrik kesme/kilitleme (**LOTO**), yüksekte ve bordada çalışma. İzin; işi, tehlikeleri, önlemleri ve sorumluları belgeler ve yetkili kişi onaylar.\n\n**Toolbox:** İş öncesi kısa toplantıyla ekip bilgilendirilir.\n\n**Gemide önemi:** İzin sistemi tehlikeli işi 'düşünmeden başlamaktan' korur; imza atmak değil, önlemlerin fiilen alındığının kontrolüdür.",
      },
      {
        title: "Kişisel Koruyucu Donanım (KKD)",
        content:
          "KKD, tehlikeyle birey arasındaki **son savunma hattıdır**: baret (kafa), gözlük/siperlik (göz), kulaklık/tıkaç (gürültü), eldiven (işe uygun tip), çelik burunlu bot (ayak), koruyucu tulum, yüksekte **emniyet kemeri/harness** ve solunum koruması (maske/respiratör).\n\n**Doğru kullanım:** İşe uygun seçilir, doğru takılır, kontrol edilir ve **hasarlıysa değiştirilir**.\n\n**Sınırı:** KKD tehlikeyi **ortadan kaldırmaz**; bu yüzden önce mühendislik ve prosedür önlemleri uygulanır, KKD bunları **tamamlar** (yerine geçmez).\n\n**Gemide önemi:** 'KKD var, o hâlde güvenli' yanılgısı tehlikelidir; yanlış eldiven, gevşek harness veya çıkarılan gözlük, son savunmayı işlevsiz kılar.",
      },
      {
        title: "Tipik Tehlikeler ve Önlemler",
        content:
          "Gemideki yaygın tehlikeler ve önlemleri:\n- **Yüksekten/bordadan düşme:** harness, korkuluk, can halatı.\n- **Makine/döner ekipmanda sıkışma:** koruyucu kapaklar, **LOTO** (kilitle-etiketle).\n- **Kayma/takılma:** düzenli güverte, anti-slip, temizlik.\n- **Manuel kaldırma yaralanması:** doğru teknik, yardımcı ekipman.\n- **Gürültü/titreşim:** kulak koruması, maruziyet süresi sınırı.\n- **Kimyasal maruziyet:** MSDS okuma, havalandırma, uygun KKD.\n- **Elektrik:** izolasyon, LOTO, yalıtkan ekipman.\n\n**Ağır hava:** Güvertede çalışma ayrı önlem ve **kaptan onayı** gerektirir.\n\n**Gemide önemi:** Günlük kazaların çoğu bu 'sıradan' tehlikelerdendir; büyük acil durumlar kadar rutin işler de yönetilmezse en sık yaralanma buralarda olur.",
      },
      {
        title: "MSDS, Ergonomi ve Sağlık",
        content:
          "**MSDS/SDS (Güvenlik Bilgi Formu):** Tehlikeli madde/kimyasalla çalışmadan önce okunur; maddenin tehlikeleri, ilk yardım, dökülme/yangın müdahalesi ve gerekli KKD buradan öğrenilir.\n\n**Ergonomi:** Doğru duruş, kaldırma tekniği ve mola, **kas-iskelet** yaralanmalarını azaltır.\n\n**Yorgunluk yönetimi (kritik):** Yeterli dinlenme/uyku, **insan hatasını** ve kazaları önlemede belirleyicidir; **STCW dinlenme süresi** gerekliliklerine uyulur (yorgunluk, alkol kadar performans düşürür).\n\n**Sağlık:** Hijyen ve uygun beslenme de uzun seferlerde emniyetin parçasıdır.\n\n**Gemide önemi:** Deniz kazalarının büyük bölümünde **insan hatası** vardır ve ardında sık sık **yorgunluk** yatar; dinlenme kaydı 'formalite' değil, doğrudan emniyet aracıdır.",
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
