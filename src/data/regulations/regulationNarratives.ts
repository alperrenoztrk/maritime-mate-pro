import type {
  RegulationCategory,
  RegulationItem,
  RegulationNarrativeChapter,
  RegulationNarrativeScenario,
  RegulationNarrativeSection,
} from "./types";

const scenario = (
  title: string,
  situation: string,
  analysis: string,
  correctApproach: string,
): RegulationNarrativeScenario => ({ title, situation, analysis, correctApproach });

const section = (
  heading: string,
  paragraphs: string[],
  references: string[] = [],
  shipboardMeaning?: string,
  commonMistakes: string[] = [],
  narrativeScenario?: RegulationNarrativeScenario,
): RegulationNarrativeSection => ({
  heading,
  paragraphs,
  references,
  shipboardMeaning,
  commonMistakes,
  scenario: narrativeScenario,
});

const chapter = (
  id: string,
  title: string,
  introduction: string,
  sections: RegulationNarrativeSection[],
  chapterTakeaways: string[] = [],
): RegulationNarrativeChapter => ({ id, title, introduction, sections, chapterTakeaways });

const solasNarrative: RegulationNarrativeChapter[] = [
  chapter(
    "solas-hukuki-mimari",
    "SOLAS'ın hukukî mimarisi, kapsamı ve sertifikasyon sistemi",
    "SOLAS tek tek cihazların kontrol listesi değil; gemi tasarımından işletmeye, personel hazırlığından sörveye kadar uzanan birbirine bağlı bir emniyet rejimidir. Bir hükmü doğru okumak için önce gemiye neden ve hangi sürümle uygulandığını kurmak gerekir.",
    [
      section(
        "Sözleşme, ek bölümler ve zorunlu kodlar birlikte nasıl okunur?",
        [
          "1974 SOLAS Sözleşmesi'nin ana maddeleri devletlerin taraf olma, uygulama ve kontrol çerçevesini kurar; teknik yükümlülüklerin büyük kısmı Ek'teki bölümlerde yer alır. Bölüm I genel hükümleri ve sörveyleri, II-1 gemi bünyesi ile makine-elektrik emniyetini, II-2 yangını, III can kurtarmayı, IV radyo haberleşmesini, V seyir emniyetini düzenler. Sonraki bölümler kargo, tehlikeli yük, emniyet yönetimi, güvenlik, dökme yük gemileri, uygunluk doğrulaması, kutup seferleri ve endüstriyel personel gibi özel alanları tamamlar.",
          "Bir SOLAS kuralı çoğu zaman ayrıntıyı başka bir zorunlu metne bırakır. LSA Code can kurtarma donanımının teknik standardını, FSS Code yangın sistemlerini, ISM Code yönetim sistemini, IMDG Code paketli tehlikeli yükleri açıklar. Bu nedenle yalnız SOLAS kural başlığını okumak yeterli değildir; kuralın atıf yaptığı kod, IMO performans standardı, bayrak talimatı, klas onaylı çizim, üretici el kitabı ve şirket SMS prosedürü aynı uygunluk zincirinin katmanlarıdır.",
          "SOLAS değişikliklerinde zımnî kabul sistemi, kabul edilen teknik değişikliğin belirlenen tarihte yürürlüğe girmesini kolaylaştırır. Ancak yeni hükmün gemiye uygulanması; inşa tarihi, keel-laying veya benzer yapım aşaması, önemli dönüşüm, gemi tipi, tonaj ve sefer niteliği gibi geçiş hükümlerine bağlı olabilir. 'Yeni kural yürürlükte' demek, her gemide aynı donanımın aynı tarihte zorunlu olduğu anlamına gelmez.",
        ],
        ["SOLAS Articles", "SOLAS Annex, Chapters I-XV", "İlgili zorunlu IMO kodları"],
        "Gemide bir gereklilik matrisi; kuralı, uygulanabilirlik gerekçesini, onaylı donanımı/prosedürü, sorumluyu, kanıtı ve değişiklik tarihini aynı satırda izlemelidir.",
        [
          "SOLAS ile atıf yapılan zorunlu kodu birbirinden bağımsız belgeler gibi değerlendirmek",
          "Yürürlük tarihini otomatik olarak bütün mevcut gemilere uygulamak",
          "Klas kuralına uyumu, bayrak devleti yükümlülüğünün kendisi sanmak",
        ],
      ),
      section(
        "Uygulanabilirlik, eşdeğerlik, muafiyet ve bayrak sorumluluğu",
        [
          "SOLAS'ın ana uygulama alanı uluslararası sefer yapan belirli ticaret gemileridir; fakat her bölüm kendi kapsam ve istisna diline sahiptir. Örneğin Bölüm V'deki seyir emniyeti hükümlerinin kapsamı, birçok teknik bölümden daha geniştir. Yolcu/yük gemisi ayrımı, gros tonaj, yük türü ve geminin yapım tarihi tek bir genel eşikle değil, incelenen kuralın kendi metniyle değerlendirilmelidir.",
          "İdare, belirli koşullarda muafiyet veya en az kural kadar etkili bir eşdeğer düzen kabul edebilir. Bu yetki, şirketin operasyonel kolaylık için kuraldan sapabileceği anlamına gelmez. Eşdeğerlik veya muafiyet; yazılı bayrak onayı, koşullar, geçerlilik süresi ve ilgili sertifika/ek açıklamasıyla izlenebilir olmalıdır. Gemi başka bir bayrağa geçtiğinde eski onayın otomatik devam ettiği varsayılmamalıdır.",
          "Birincil uygulama sorumluluğu bayrak devletindedir; tanınmış kuruluşlar yetkilendirildikleri ölçüde sörvey ve sertifikasyon yapabilir. Liman devleti kontrolü ise sertifikaların geçerliliğini ve geminin kuralın özünü fiilen karşılayıp karşılamadığını sınar. Geçerli bir sertifika güçlü başlangıç kanıtıdır, fakat ciddi arıza, yetersiz personel bilgisi veya gerçeğe uymayan kayıt ayrıntılı denetim için açık gerekçe oluşturabilir.",
        ],
        ["SOLAS Chapter I, Regulations 4-5", "SOLAS Chapter I, Regulations 6-21", "HSSC Survey Guidelines"],
        "Kaptan ve şirket, her muafiyet/eşdeğerlik yazısını koşullarıyla birlikte kontrollü belge listesinde tutmalı; vardiya ve bakım ekipleri bu koşulların günlük operasyona etkisini bilmelidir.",
        ["Sertifika mevcutsa fiziksel arızanın denetim açısından önemsiz olduğunu düşünmek", "Muafiyet koşulunu PMS veya operasyon prosedürüne aktarmamak"],
        scenario(
          "Sertifika geçerli, ekipman farklı",
          "Cargo Ship Safety Equipment sertifikası geçerli görünür; fakat Record of Equipment'taki cihaz modeli gemideki yeni cihazla uyuşmaz ve değişiklik için onay gösterilemez.",
          "Sorun yalnız bir yazım hatası değildir. Tip onayı, entegrasyon, sörvey ve sertifika ekinin aynı konfigürasyonu göstermemesi uygunluk zincirini keser.",
          "Cihaz değişikliğinin teknik dosyası, bayrak/RO onayı ve devreye alma testleri doğrulanmalı; sertifika eki gerektiği şekilde düzeltilmeli ve bu tamamlanana kadar risk kontrollü geçici tedbir yetkili makamla kararlaştırılmalıdır.",
        ),
      ),
      section(
        "Sörveylerden sürekli uygunluğa: sertifika tek başına neden yetmez?",
        [
          "Bölüm I; ilk, yenileme, periyodik/ara ve yıllık doğrulamalar ile uygulanabilir ek sörveyleri bir sertifika döngüsüne bağlar. HSSC yaklaşımı farklı IMO belgelerinin tarih ve sörvey pencerelerini uyumlaştırır. Sertifikanın ana sayfası kadar supplement veya Record of Equipment, endorsementlar, koşullar ve sörvey durum raporu da okunmalıdır.",
          "Sörvey iki tarih arasındaki tek günlük performans değildir. Onaylı tasarımın korunması, planlı bakım, kalibrasyon, yetkili servis, yedek parça, arıza bildirimi, geçici eşdeğer emniyet tedbiri ve kapanış kanıtı sürekli uygunluğu oluşturur. Kritik sistem devre dışı kaldığında yalnız iş emri açmak yeterli olmayabilir; kaptan, şirket, bayrak/RO ve gerekiyorsa kıyı otoritesiyle bildirim ve sefer uygunluğu değerlendirilmelidir.",
        ],
        ["SOLAS Chapter I", "HSSC Survey Guidelines", "SOLAS Chapter I/11"],
        "Sertifika dosyası, survey status, PMS ve defect log ayda en az şirket prosedürünün öngördüğü döngüde çapraz kontrol edilmeli; birindeki değişiklik diğerlerine yansıtılmalıdır.",
        ["Sörvey raporundaki recommendation/condition ile defect log'u ayrı izlemek", "Geçici tamiri kalıcı çözüm gibi kapatmak"],
      ),
    ],
    ["Önce kuralın kapsamını kanıtla, sonra ekipmanı kontrol et.", "Sertifika, onaylı konfigürasyon ve gemideki gerçek durum aynı olmalıdır.", "Muafiyet veya eşdeğerlik yalnız yazılı yetki ve koşullarıyla geçerlidir."],
  ),
  chapter(
    "solas-ii-1",
    "Bölüm II-1: bölmeleme, stabilite, makine ve elektrik emniyeti",
    "II-1 bir hasarın gemiyi kaybetmeye dönüşmesini engelleyen yapısal ve teknik bariyerleri kurar. Su geçirmez bütünlük, sintine sistemi, sevk-dümen, ana ve acil elektrik kaynakları aynı kayıp senaryosunun farklı savunma katmanlarıdır.",
    [
      section(
        "Hasarlı stabilite, su geçirmez bütünlük ve açıklık yönetimi",
        [
          "Bölmeleme standardı, varsayılan bir hasar sonrasında geminin yeterli yüzebilirlik ve stabiliteyi korumasını hedefler. Yolcu gemileri ile yük gemilerinde kullanılan ayrıntılı kriterler farklılaşsa da temel düşünce aynıdır: bir bölmeye giren suyun yayılması sınırlandırılır, kritik açıklıklar korunur ve gemi kabul edilmiş hasar durumlarında hayatta kalabilir. Onaylı damage control information, geminin tasarım varsayımlarını vardiya kararına çevirir.",
          "Su geçirmez kapının sertifikalı olması, kapı açık veya contası bozukken bariyer sağlamaz. Kapı, shell door, rampa, sea inlet, boru penetrasyonu ve havalandırma kapaması; konum göstergesi, alarmı, uzaktan/yerel kumandası ve operasyon kısıtıyla birlikte değerlendirilir. Açık tutulmasına izin verilen düzenler ile seyirde kapalı kalması gereken açıklıklar onaylı plan ve SMS'e göre açıkça ayrılmalıdır.",
          "Yükleme bilgisayarı veya stabilite kitapçığı yalnız intact condition kontrolü için kullanılmamalıdır. Gerçek draft, trim, tank free-surface, sabit ağırlık değişimi ve kapı/hasar kontrol düzeninin tasarım varsayımlarıyla uyumu korunmalıdır. Büyük tadilat, yeni vinç veya sabit ekipman eklenmesi lightship verisini etkiliyorsa onay ve gerekirse inclining/lightweight doğrulaması tetiklenebilir.",
        ],
        ["SOLAS II-1, Parts B-B-4", "Damage Control Plan/Booklet", "Load Line watertight/weathertight requirements"],
        "Baş zabit, kapatma durumunu ve stabilite hesabını; başmühendis sintine, valf ve penetrasyonları; vardiya zabitleri alarm ve kapı disiplinini ortak bir flooding senaryosunda doğrulamalıdır.",
        ["Kapı testini yalnız hareket ediyor/etmiyor şeklinde kaydetmek", "Free-surface ve tank transferini hasarlı stabilite varsayımlarından ayrı görmek"],
        scenario(
          "Açık su geçirmez kapıyla kısa operasyon",
          "Makine ekibi kablo geçişi için seyirde kapıyı açık bırakır; köprüüstündeki göstergede açık alarmı alışılmış bir durum olarak kabul edilir.",
          "Hasar anında iki bölme tek hacim gibi su alabilir. Alarmın normalleştirilmesi hem tasarım bariyerini hem de köprüüstü farkındalığını ortadan kaldırır.",
          "İş, izin ve risk değerlendirmesine bağlanmalı; kural/onaylı prosedür izin vermiyorsa kapı açık tutulmamalı, alternatif çalışma yöntemi kullanılmalı ve yanlış alarm kültürü derhal düzeltilmelidir.",
        ),
      ),
      section(
        "Sevk, dümen, sintine ve kritik makine yardımcıları",
        [
          "SOLAS, ana sevkin tek bir ekipman arızasıyla kontrolsüz tehlikeye dönüşmesini önlemek için yardımcı sistem, alarm, uzaktan kumanda ve bazı işlevlerde yedeklilik ister. Dümen donanımında köprüüstü/yerel kontrol, güç ünitesi, iletişim ve acil kullanım tatbikatı teknik şartın operasyonel karşılığıdır. Otomatik sistemlerin varlığı, lokal istasyon ve manuel müdahale bilgisini gereksiz kılmaz.",
          "Sintine düzeni, suyu yalnız normal koşulda pompalamak için değil, bölmelerin erişilebilirliğini ve hasar kontrol kapasitesini korumak için tasarlanır. Valf konumu, non-return işlevi, strainer temizliği, alarm ve overboard bağlantılarının bütünlüğü kritiktir. Yetkisiz bypass veya geçici hortum, emniyet ve kirlilik önleme sistemlerinin ikisini birden bozabilir.",
          "Unattended machinery space veya otomasyon notasyonuna sahip gemilerde alarmın doğru sensörden gelmesi, görevli mühendise ulaşması ve arızada güvenli duruma geçiş birlikte sınanır. Alarm listesinde sürekli kabul edilmiş bir arıza, başka bir kritik alarmı maskeleyebilir. PMS kaydı kadar gerçek trend, alarm history ve vardiya turu bulgusu da değerlendirilmelidir.",
        ],
        ["SOLAS II-1, Parts C-E", "Steering gear requirements", "Approved machinery automation arrangements"],
        "Acil dümen tatbikatı; köprüüstü-lokal haberleşme, güç kaynağı değişimi, pusula/heading bilgisi ve komut tekrarını içeren zamanlı bir senaryo olmalıdır.",
        ["Lokal kontrolü yalnız kıdemli mühendisin bildiğini varsaymak", "Alarmı resetlemeyi arızanın giderilmesi sanmak"],
      ),
      section(
        "Ana elektrik, acil kaynak ve blackout sonrasında toparlanma",
        [
          "Elektrik emniyeti; normal üretim, dağıtım koruması, ana switchboard bütünlüğü ve yangın/su basmasından ayrılmış acil kaynak üzerine kurulur. Acil jeneratör veya geçici acil kaynak, belirlenen kritik tüketicileri gerekli süre boyunca besleyebilmelidir. Listede aydınlatma yanında haberleşme, alarm, seyir, yangın pompası veya dümen gibi gemiye göre kritik işlevler bulunur.",
          "Haftalık no-load çalıştırma, tam sistem performansını kanıtlamaz. Otomatik start, gerilim/frekans oluşması, bus transferi, yük kabulü, yakıt/başlangıç enerjisi, havalandırma ve koruma düzenleri kontrollü test programında ele alınmalıdır. Blackout recovery prosedürü; ana sevkin yeniden hazırlanmasını, yardımcıların sıralı startını ve köprüüstü-makine iletişimini kapsar.",
        ],
        ["SOLAS II-1, Part D", "Emergency source of electrical power", "Blackout recovery procedure"],
        "Tek hat şeması üzerindeki kritik tüketiciler, gerçek emergency switchboard etiketleri ve test sırasında gelen yüklerle karşılaştırılmalıdır.",
        ["Acil jeneratörü manuel başlatıp otomatik transferi test edilmiş saymak", "Blackout tatbikatını operasyonel risk ve üretici sınırları olmadan yapmak"],
      ),
      section(
        "1 Ocak 2026 sonrası kaldırma donanımı ve anchor handling winch yaklaşımı",
        [
          "1 Ocak 2026'da yürürlüğe giren SOLAS II-1/3-13, kapsamındaki lifting appliance ve anchor handling winch'ler için tasarım, yapım, kurulum ile operasyonel emniyetin ortak çerçevesini güçlendirir. Hangi ekipmanın kapsama girdiği; ekipmanın tipi, kurulum tarihi ve kuraldaki geçiş hükümleri üzerinden doğrulanmalıdır. Güverte vincinin varlığı tek başına aynı kontrol setinin her cihaza aynen uygulanacağı anlamına gelmez.",
          "Uygulama tarafında safe working load işaretleri, register ve sertifikalar; periyodik muayene/test, bakım, limit switch ve fren işlevleri, wire/loose gear durumu, yetkilendirilmiş operatör ve lift plan/risk değerlendirmesiyle tamamlanır. Anchor handling operasyonlarında hat gerilimi, snap-back bölgeleri, acil bırakma, bridge-deck iletişimi ve stabilite etkisi de sistemin parçasıdır.",
        ],
        ["SOLAS II-1/3-13", "IMO lifting appliance guidelines", "Approved operation and maintenance documentation"],
        "Şirket, tüm kaldırma donanımını envanterleyip hangi cihazın yeni SOLAS hükmüne, hangi cihazın klas/bayrak/ILO veya yerel iş ekipmanı kuralına tabi olduğunu yazılı bir matriste ayırmalıdır.",
        ["Yalnız yıllık load test belgesine bakmak", "Loose gear ile ana vincin izlenebilirliğini farklı sistemlerde koparmak"],
      ),
    ],
    ["II-1'in amacı tek arızayı kontrol edilebilir tutmaktır.", "Onaylı tasarım varsayımı, gemideki kapı/valf/tank disipliniyle korunur.", "Test, yalnız ekipmanı değil otomatik transferi ve insan müdahalesini de kapsar."],
  ),
  chapter(
    "solas-ii-2",
    "Bölüm II-2: yangının önlenmesi, algılanması, sınırlandırılması ve söndürülmesi",
    "Yangın emniyeti; yakıtı ve tutuşturucu kaynağı kontrol etmek, çıkan yangını erken bulmak, duman/ısıyı sınırlamak, söndürmek ve kaçışı sürdürmek üzere tasarlanmış çok katmanlı bir bariyer sistemidir.",
    [
      section(
        "Yangın emniyeti hedefleri ve savunma katmanları",
        [
          "II-2'nin hedefe dayalı yapısı yangının ve patlamanın önlenmesini, can riskinin azaltılmasını, yangının çıktığı bölmede sınırlandırılmasını, kaçış araçlarının korunmasını ve söndürme için erişim/hazırlığı amaçlar. A sınıfı bölme, yangın kapısı, insulation, dedektör, sprinkler, fixed gas system ve fire main birbirinin alternatifi değil, ardışık savunmalardır.",
          "Fire Control Plan üzerindeki sembol gerçek gemi düzeniyle aynı olmalıdır. Bir tadilatın kablo penetrasyonunu açık bırakması, self-closing kapıyı takozlaması veya damper erişimini kapatması sertifikalı sistemi zayıflatır. Yapısal yangın koruması PMS dışında günlük housekeeping ve iş bitimi kontrolü gerektirir.",
          "Kaçış yolları normal aydınlatmada boş görünse bile duman, enerji kaybı ve gemi hareketi varsayımıyla değerlendirilir. Low-location lighting, işaretleme, emergency lighting, kapı açılma yönü, EEBD ve muster erişimi birlikte sınanmalıdır. Mürettebatın yalnız en yakın çıkışı değil, alternatif kaçışı bilmesi gerekir.",
        ],
        ["SOLAS II-2/2", "SOLAS II-2 Parts B-G", "FSS Code"],
        "Aylık gemi turunda bir örnek yangın zonu seçilip algılama, izolasyon, söndürme, kaçış ve ekip erişimi uçtan uca izlenmelidir.",
        ["Cihazların ayrı ayrı sertifikalı olmasını bütün sistem performansı sanmak", "Fire Control Plan revizyonunu tadilat kapanışından sonraya bırakmak"],
      ),
      section(
        "Yakıt, sıcak yüzey ve makine dairesinde yangını önleme",
        [
          "Makine dairesi yangınlarının önemli bir kısmında basınçlı yakıtın sıcak yüzeye ulaşması, kaçakların geç fark edilmesi veya izolasyonun yetersizliği rol oynar. Jacketed high-pressure fuel lines, leak alarm/collection, sıcak yüzey insulation'ı, quick-closing valve, remote fan/pump stop ve temiz bilge düzeni tek bir önleme zinciridir.",
          "Yakıtın parlama noktası için genel SOLAS tabanı 60 °C'dir; kuraldaki özel istisnalar ayrıca doğrulanır. 1 Ocak 2026 değişiklikleri, teslim edilen yakıtın SOLAS parlama noktası hükmüne uygunluğuna ilişkin tedarikçi beyanını güçlendirmiştir. Belge kontrolü, şüpheli yakıt veya numune sonucu karşısında risk değerlendirmesi ve bayrak/şirket bildirim yükümlülüğünü ortadan kaldırmaz.",
          "Hot-work, purifier açılması, fuel transfer veya insulation onarımı gibi işler aynı anda yürüyorsa birleşik risk artar. Permit to work tek başına güvenlik sağlamaz; izolasyon, gaz ölçümü, drenaj, yangın gözcüsü, komşu mahallerin kontrolü ve iş sonrası fire watch sahada doğrulanmalıdır.",
        ],
        ["SOLAS II-2/4", "SOLAS II-2/15", "SOLAS 2024 amendments in force 1 January 2026"],
        "Bunker tesliminde yakıt belgeleri başmühendis tarafından parlama noktası beyanı dahil incelenmeli; numune ve tank tahsisiyle izlenebilirlik kurulmalıdır.",
        ["Flashpoint beyanını yalnız MARPOL BDN kontrolü içinde kaybetmek", "Yağ emmiş insulation'ı dış yüzeyi temiz göründüğü için kabul etmek"],
      ),
      section(
        "Algılama, alarm, sabit söndürme ve serbest bırakma kararı",
        [
          "Dedektörün panelde görünmesi doğru adres, uygun tip, temiz sensör ve işleyen alarm aktarımını garanti etmez. Test programı zon/loop kapsamasını, fault/isolation durumunu, repeater ve duty alarm aktarımını izlemelidir. Sürekli izole edilen tek dedektör dahi yangının ilk dakikalarını kaybettirebilir.",
          "CO₂ veya başka sabit gazlı sistemin serbest bırakılması; personel sayımı, alan tahliyesi, havalandırma ve yakıt izolasyonu, açıklıkların kapanması, alarm/gecikme düzeni ve kaptan/başmühendis kararını içerir. Tüp miktarı/servis belgesi önemli olmakla birlikte remote release cabinet erişimi, pilot lines ve talimatların okunabilirliği de operasyonel hazır oluşun parçasıdır.",
          "Water mist, sprinkler, foam veya dry chemical sistemlerinde doğru ajan ve aplikasyon oranı tasarıma bağlıdır. Mürettebat, farklı yangın tiplerinde hangi sabit/taşınabilir sistemin kullanılacağını ve yanlış uygulamanın stabilite, elektrik veya yeniden tutuşma riskini nasıl artıracağını anlamalıdır.",
        ],
        ["SOLAS II-2/7", "SOLAS II-2/10", "FSS Code Chapters 4-7"],
        "Tatbikat, ajanı gerçekten boşaltmadan release öncesi tüm karar ve izolasyon adımlarını panel/mahall üzerinde göstermeli; iletişim ve personel sayımı ölçülmelidir.",
        ["CO₂ odasının kilitli ve anahtarının erişilemez olması", "Tatbikatta gerçek sistemi yanlışlıkla aktive etme riskini kontrol etmemek"],
        scenario(
          "Purifier flat yangını ve erken CO₂ baskısı",
          "Yoğun duman görülür; ekip yangının kaynağını ve personel sayımını tamamlamadan fixed CO₂ serbest bırakmayı önerir.",
          "Gecikme tehlikelidir, fakat içeride insan varken veya mahall izole edilmeden gaz boşaltmak ölümcül ve etkisiz olabilir. Karar, önceden çalışılmış eşiklere ve hızlı doğrulamaya dayanmalıdır.",
          "Alarm, muster/personnel accounting, yakıt-fan izolasyonu ve açıklık kapama eş zamanlı yürütülmeli; kaptan/başmühendis yetkisiyle onaylı release prosedürü uygulanmalı, boundary cooling ve yeniden giriş kontrolü hazırlanmalıdır.",
        ),
      ),
      section(
        "2026 PFOS yasağı ve ro-ro/araç mahalli yangın koruması",
        [
          "1 Ocak 2026'da yürürlüğe giren değişiklikler, yangın söndürme ortamlarında PFOS kullanımını yasaklayan gereklilikleri ve ro-ro yolcu gemilerinin araç, özel kategori ve ro-ro mahallerindeki yangın korumasını güçlendiren hükümleri içerir. Uygulanabilirlik gemi tipi ve yapım tarihine göre kontrol edilmelidir; envanterde marka adı görmek kimyasal içeriği doğrulamaya yetmez.",
          "PFOS uygunluğu için ajan üretici beyanı, safety data sheet, servis kuruluşu kaydı ve gerektiğinde analiz/yenileme kanıtı izlenir. Araç mahallerinde kamera/algılama kapsamı, drenaj, sabit söndürme, açıklık yönetimi ve elektrikli araç dahil gelişen riskler geminin onaylı düzeniyle birlikte ele alınır. IMO kuralı asgari tabandır; şirket risk değerlendirmesi daha sıkı operasyonel önlem belirleyebilir.",
        ],
        ["SOLAS II-2 amendments in force 1 January 2026", "FSS Code amendments", "MSC.1/Circ. guidance as applicable"],
        "Yangın ajanı envanteri kimyasal uygunluk sütunu içermeli; ro-ro/araç güvertesi devriyesi ve alarm response planı güncel risklerle tatbik edilmelidir.",
        ["SDS üzerinde PFOS adı yoksa otomatik olarak uygun saymak", "Yeni araç risklerini onaylı sistemin yerine geçecek gayriresmî yöntemlerle yönetmek"],
      ),
    ],
    ["Yangın sistemi cihaz değil, birbirine bağımlı bariyerler bütünüdür.", "İzolasyon ve personel sayımı sabit söndürme kararının ayrılmaz parçasıdır.", "2026 değişikliklerinin kapsamı gemi tipi ve inşa tarihine göre belgelenmelidir."],
  ),
  chapter(
    "solas-iii",
    "Bölüm III: can kurtarma düzenleri, bakım ve insan hazırlığı",
    "Can kurtarma donanımı son savunma hattıdır. Teknik uygunluk, doğru yerleşim, güvenilir bakım, emniyetli launching ve her mürettebatın kendi rolünü uygulayabilmesi birlikte değerlendirilir.",
    [
      section(
        "LSA Code, gemi düzeni ve tahliye kapasitesi",
        [
          "SOLAS III gemide hangi can kurtarma düzenlerinin bulunacağını ve nasıl organize edileceğini, LSA Code ise birçok donanımın teknik standardını belirler. Lifeboat, liferaft, rescue boat, davit, immersion suit, lifejacket, EPIRB ve SART gibi öğelerin sayısı; gemi tipi, kişi sayısı, sefer ve onaylı arrangement'a göre okunur. Record of Equipment ile fiziksel envanter aynı olmalıdır.",
          "Kapasite hesabı yalnız toplam kişi sayısı değildir. Muster istasyonuna erişim, embarkation yolu, geminin list/trim durumu, engellenmiş bir taraf, engelli veya yaralı kişi desteği ve belirli donanımın servis dışı olması gerçek tahliye kapasitesini değiştirir. Alternatif düzen ve operasyonel kısıtlar önceden planlanmalıdır.",
          "Kişisel donanım doğru bedende, erişilebilir ve geminin iklimine uygun olmalıdır. Çocuk/bebek lifejacketleri veya immersion suit dağılımı yolcu profili ve muster planıyla uyumlu olmalıdır. 'Kutusu kapalı ve son kullanma tarihi geçerli' kontrolü, personelin donanımı karanlıkta doğru giyebilmesini kanıtlamaz.",
        ],
        ["SOLAS III", "LSA Code", "Record of Equipment"],
        "Her muster station için kişi, kapasite, ekipman, alternatif rota ve sorumlu amir eşleştirmesi yapılmalı; gemideki gerçek engellerle yürüyüş testi yapılmalıdır.",
        ["Toplam kapasite doğruysa dağılımı kontrol etmemek", "Servisteki liferaftın yerine geçici kapasite planlamamak"],
      ),
      section(
        "Launching appliance, release gear ve MSC.402(96) bakım rejimi",
        [
          "Filika ve rescue boat kazalarının önemli kısmı bakım veya serbest bırakma tertibatının yanlış kullanımı sırasında meydana gelir. SOLAS III ve zorunlu MSC.402(96) yaklaşımı; muayene, operasyonel test, bakım, overhaul ve repair işlerinin yetkin/otorize personel tarafından, üretici talimatı ve emniyet önlemleriyle yapılmasını ister.",
          "Weekly/monthly kontroller, yıllık kapsamlı muayene ve beş yıllık yük testleri aynı iş değildir. Her faaliyet için kapsam, yetki, kullanılan emniyet pimi/fall prevention device, ölçüm sonucu, parça değişimi ve release gear ayarı izlenebilir olmalıdır. Yetkili servis raporundaki açık tavsiye, sertifika eki gibi saklanıp kapanmalıdır.",
          "Tatbikat sıklığına uymak, unsafe launching yapmak anlamına gelmez. Deniz/hava, gemi hareketi, ekip deneyimi ve üretici sınırları risk değerlendirmesine girer. Drill objective, tam indirme yerine belirli bir beceriyi emniyetle sınayabilir; fakat ertelenen beceri uygun ilk fırsatta tamamlanmalı ve kayıt gerçeği yansıtmalıdır.",
        ],
        ["SOLAS III/20", "MSC.402(96)", "LSA Code release mechanism requirements"],
        "Servis raporu, PMS işi ve gemi personelinin haftalık kontrolü aynı ekipman kimliğiyle bağlanmalı; hook/fall/davit seri numaraları karışmamalıdır.",
        ["Yetkili servis geldiği için gemi ekibinin gözetim ve kayıt kontrolünü bırakması", "Fall prevention device'ı operasyonel release sisteminin kalıcı parçası gibi yanlış kullanmak"],
      ),
      section(
        "Muster list, familiarization ve ölçülebilir tatbikat",
        [
          "Muster list; alarm sinyali, toplanma yeri, görev, yedek kişi, iletişim ve kritik kapatma/ekipman sorumluluklarını gemiye özgü dağıtır. Personel değiştiğinde yalnız isim etiketi değil, yeterlik ve dil/iletişim düzeni de güncellenmelidir. Kaptanın genel sorumluluğu, olay komutasındaki alt rollerin belirsiz bırakılmasına gerekçe değildir.",
          "Yeni katılan personelin familiarization'ı imza formundan ibaret değildir. Kişi alarmı tanımalı, kabininden alternatif kaçışı yürümeli, lifejacket/immersion suit kullanmalı, görev mahallini ve rapor hattını göstermelidir. Tatbikatlar farklı senaryo, saat ve arıza varsayımlarıyla yapılmalı; zaman, iletişim hatası ve equipment handling performansı debrief'te ölçülmelidir.",
        ],
        ["SOLAS III/8", "SOLAS III/19", "SOLAS III/30"],
        "Rastgele seçilen bir mürettebat üyesi, alarmdan görev tamamlanmasına kadar kendi akışını gemi üzerinde gösterebilmelidir.",
        ["Her ay aynı senaryo ve aynı metni kullanmak", "Tatbikatta bulunan eksikliği kayıt itibarını korumak için yazmamak"],
        scenario(
          "Yeni katılan yağcının filika görevi",
          "Personel gemiye iki gün önce katılmıştır; muster listte görevi vardır fakat release cabinet'i ve alternatif muster yolunu gösteremez.",
          "Geçerli sertifika veya önceki gemi tecrübesi, bu geminin özgün düzenine familiarization'ın yerine geçmez.",
          "Kişiye uygulamalı familiarization verilmeli, anlayışı gösterimle doğrulanmalı; yeterlik oluşana kadar görev yedeklenmeli ve kayıt gerçek tamamlanma zamanını göstermelidir.",
        ),
      ),
    ],
    ["Donanım kapasitesi, erişim ve insan becerisi birlikte tahliye kapasitesidir.", "Servis raporu açık bulgularıyla birlikte yönetilir.", "Tatbikat kaydı, yapılan ve öğrenilen şeyi dürüstçe göstermelidir."],
  ),
  chapter(
    "solas-iv-v",
    "Bölüm IV-V: GMDSS, seyir emniyeti ve köprüüstü karar sistemi",
    "Radyo ve seyir cihazları ancak eğitimli vardiya, doğru sensör ayarı, yedekleme ve sefer planıyla birleştiğinde emniyet bariyerine dönüşür.",
    [
      section(
        "GMDSS işlevleri, deniz alanları ve yedeklilik",
        [
          "GMDSS yaklaşımı belirli bir cihaz listesinden önce işlevleri tanımlar: kıyı-gemi ve gemi-gemi distress alert, arama-kurtarma koordinasyonu, on-scene communication, maritime safety information, routine/public correspondence ve bridge-to-bridge haberleşmesi. A1-A4 deniz alanı sınıfları, geminin çalışacağı kapsama göre ekipman ve bakım/yedeklik düzenini etkiler.",
          "DSC, EPIRB, SART/AIS-SART, NAVTEX, satellite terminal ve portable VHF'nin testleri aynı değildir. Test, gerçek distress alarmı üretmeden yapılmalı; kimlik/MMSI, GNSS girdisi, batarya/HRU tarihi, anten ve reserve source izlenmelidir. Yanlış MMSI veya eski EPIRB registration, çalışan cihazın kurtarma değerini ciddi biçimde azaltır.",
          "Radio log; nöbet, test, alınan MSI, arıza ve distress trafiğini zamanında yansıtır. Equipment duplication, shore-based maintenance veya at-sea maintenance seçenekleri sertifikadaki düzenle uyumlu olmalı; bir cihaz arızasında kalan kapasite, sefer alanı ve bildirim gereği değerlendirilmelidir.",
        ],
        ["SOLAS IV", "Radio Regulations", "GMDSS Master Plan and equipment standards"],
        "GMDSS operatörü bir ana cihaz kaybında hangi işlevin hangi yedekle sürdürüleceğini, hangi deniz alanında hangi kıyı hizmetine güvenildiğini açıklamalıdır.",
        ["Sadece daily test menüsüne bakmak", "MMSI ve EPIRB kayıt bilgisini gemi/bayrak değişiminde güncellememek"],
      ),
      section(
        "SOLAS V, sefer planı ve sensörlerin çapraz doğrulanması",
        [
          "Bölüm V'deki seyir emniyeti hükümleri appraisal, planning, execution ve monitoring aşamalarını kapsayan berth-to-berth passage planning yaklaşımını destekler. Güncel chart/ENC, notices ve yayınlar; draft/UKC, squat, tide/current, weather, traffic, pilotage, no-go area, abort point, contingency anchorage ve master call kriterleriyle birleşir.",
          "ECDIS rotayı çizer, fakat safety depth/contour, XTD, alarm ve display ayarı yanlışsa tehlikeyi gizleyebilir. GNSS, radar, echo sounder, gyro, speed log, AIS ve görsel/radar mevki birbirini doğrulamak için kullanılır. AIS bilgisi diğer geminin niyet veya kimliğini kesin kanıtlamaz; COLREG gözcülüğü ve radar değerlendirmesinin yerine geçmez.",
          "BNWAS, VDR/S-VDR, LRIT, AIS ve steering/heading sistemlerinin testleri ile arıza prosedürleri kayıtlı olmalıdır. Bridge Resource Management; kaptanın authority gradient'i yönetmesini, challenge-and-response kültürünü ve kritik kararların tek bir sensör ya da tek bir kişinin varsayımına bırakılmamasını gerektirir.",
        ],
        ["SOLAS V/19", "SOLAS V/27", "SOLAS V/34", "IMO Voyage Planning Guidelines"],
        "Her vardiya zabiti passage plan üzerindeki en kritik üç riski, kullanılan emniyet marjını ve kaptanı çağırma kriterini ECDIS/chart üzerinde gösterebilmelidir.",
        ["Rota check fonksiyonunu kaptan onayı sanmak", "Pilot gemideyken passage plan monitoring'i bırakmak"],
        scenario(
          "GNSS konumu ile radar mevkii ayrışıyor",
          "Kıyıya yaklaşmada ECDIS gemiyi emniyetli suda gösterir; iki radar mesafesi ise rotanın dışında bir mevkiye işaret eder.",
          "Tek sensöre bağlı kalmak grounding riskini büyütür. Sorun chart datum, sensor offset, GNSS interference veya yanlış radar objesi olabilir.",
          "Hız ve emniyet marjı artırılmalı, kaptan çağrılmalı, bağımsız görsel/radar/echo-sounder kontrolleri yapılmalı; doğrulanmamış konumla dar suya devam edilmemelidir.",
        ),
      ),
      section(
        "2026 elektronik inclinometer ve denize düşen konteyner bildirimi",
        [
          "1 Ocak 2026 değişiklikleri, belirli yeni konteyner ve dökme yük gemilerinde rolling motion kaydı için elektronik inclinometer gereklilikleri getirmiştir. Uygulanabilirlik gemi tipi, gros tonaj ve yapım tarihine göre doğrulanır. Cihazın kayıt üretmesi; sensör kalibrasyonu, VDR bağlantısı, zaman senkronu ve veriye erişim olmadan tek başına yeterli değildir.",
          "Aynı tarihte yürürlüğe giren SOLAS değişiklikleri, konteynerlerin denize kaybı veya böyle bir kaybın gözlenmesi halinde bildirim çerçevesini güçlendirmiştir. Kaptanın çevredeki gemileri ve ilgili kıyı/bayrak kanallarını doğru bilgilerle uyarması; seyir tehlikesini azaltır ve kurtarma/kirlilik müdahalesini destekler. Konum, zaman, sayı tahmini ve tehlikeli yük bilgisi kayıtlarla korunmalıdır.",
        ],
        ["SOLAS V amendments in force 1 January 2026", "SOLAS V/31-32 as amended", "Relevant MSC reporting guidance"],
        "Şirket SMS'i, kayıp konteyner senaryosu için kim-kime-hangi veriyle bildirim akışını ve belirsiz konteyner sayısının nasıl güncelleneceğini içermelidir.",
        ["İlk sayı kesin değil diye bildirimi geciktirmek", "Inclinometer verisini yalnız kaza sonrası kullanılacak pasif kayıt görmek"],
      ),
    ],
    ["GMDSS bir cihaz listesi değil, kesintisiz haberleşme işlevleridir.", "Passage plan sensör çapraz kontrolü ve insan kararıyla canlı tutulur.", "2026 raporlaması ilk bildirimin hızını ve sonraki güncellemenin doğruluğunu birlikte ister."],
  ),
  chapter(
    "solas-vi-vii",
    "Bölüm VI-VII: yük emniyeti, istif, sabitleme ve tehlikeli yükler",
    "Yük kaynaklı risk; yanlış beyan, hatalı dağılım, yetersiz sabitleme veya tehlikeli özelliğin kontrol edilmemesiyle geminin stabilitesini, yapısını, yangın bütünlüğünü ve çevreyi etkiler.",
    [
      section(
        "Cargo information, VGM, yükleme planı ve sabitleme",
        [
          "Gönderici, yükün emniyetli taşınması için gerekli bilgiyi yüklemeden yeterince önce sağlamalıdır. Kütle, ağırlık merkezi, kimyasal/fiziksel tehlike ve özel taşıma koşulu eksikse kaptan ile baş zabitin doğru stabilite, strength, stowage ve segregation kararı vermesi mümkün olmaz. Belgenin başlığı değil, yükün gerçek partisini temsil etmesi önemlidir.",
          "Packed container için verified gross mass, gemi yükleme planına kabulün temel girdisidir. VGM yöntemi ve yetkilendirme kıyı sürecinde oluşsa da gemi; VGM'siz veya operasyonel toleransı aşan tutarsız konteyneri planlama/sabitleme riskine göre yönetmelidir. VGM, konteynerin içindeki yükün doğru beyanı veya lashing uygunluğu anlamına gelmez.",
          "Cargo Securing Manual gemiye özgü lashing düzeni, ekipmanı, bakım ve operasyon sınırını gösterir. Gerçek stack weight, racking/vertical force, GM/rolling etkisi, hava rotası ve ekipman kondisyonu planla uyuşmalıdır. Ağır hava başladıktan sonra güvertede düzeltme yapmak her zaman güvenli olmayacağından önleyici kontrol kritik önemdedir.",
        ],
        ["SOLAS VI/2", "SOLAS VI/5", "SOLAS VI/2 VGM requirements", "Cargo Securing Manual"],
        "Baş zabit, gönderici verisini terminal planı ve gemi hesabıyla karşılaştırmalı; plan-gerçek sapmasını loading computer'a zamanında işlemelidir.",
        ["VGM'yi bütün kargo bilgilerinin doğrulanması saymak", "Lashing hesabını yalnız liman yüklenicisinin sorumluluğu görmek"],
      ),
      section(
        "Grain, solid bulk cargo ve yapısal/stabilite sınırları",
        [
          "Dökme tahılın kayması heeling moment yaratır; Grain Code ve onaylı grain loading information, dolu/kısmen dolu ambar, trimming ve securing varsayımlarını stabilite kriterine bağlar. Loading computer sonucu, ambarın gerçek doluluk ve trimming durumunu doğru temsil etmelidir.",
          "Diğer solid bulk cargoes için IMSBC Code; Group A sıvılaşma/dinamik ayrışma, Group B kimyasal tehlike ve Group C sınıflarını, individual schedule üzerinden kontrol eder. BCSN, TML/moisture belgesi, numune temsiliyeti, yağış, havalandırma, gaz/sıcaklık ve bilge tedbirleri birlikte okunur. 'Daha önce taşıdık' gerekçesi güncel yük belgesinin yerini tutmaz.",
          "Yükleme sırası ve rate, shear force/bending moment, tank top limit, local strength ve deballasting kapasitesine göre yürütülür. Terminal-gemi planında değişiklik olduğunda hesap yeniden yapılır; kırmızı limit alarmını kısa süreli kabul etmek yapısal hasar riskini meşrulaştırmaz.",
        ],
        ["SOLAS VI", "International Grain Code", "IMSBC Code", "BLU Code"],
        "Cargo watch, gerçek tonaj/rate/sequence ile onaylı planı her aşamada uzlaştırmalı; sapma için stop-work yetkisi açık olmalıdır.",
        ["Can test'i laboratuvar TML belgesinin yerine koymak", "Limana ait draft survey miktarını gemi stress hesabına geç işlemlemek"],
      ),
      section(
        "IMDG, IBC, IGC ve INF: tehlikenin taşıma biçimine göre kod seçimi",
        [
          "SOLAS VII tehlikeli yükü taşıma biçimine göre farklı rejimlere bağlar. Paketli dangerous goods ve marine pollutants için IMDG Code; solid form in bulk tehlikeli maddeler için ilgili IMSBC/IMDG bağlantıları; bulk dangerous liquid chemicals için IBC Code, liquefied gases için IGC Code ve packaged irradiated nuclear material için INF Code devreye girer. Aynı ticari ürün adı farklı taşıma biçiminde farklı belge ve gemi uygunluğu gerektirebilir.",
          "IMDG süreci classification, UN number/proper shipping name, packing group, package approval, mark/label/placard, dangerous goods declaration, container packing certificate, segregation, stowage category ve emergency response bilgisini kapsar. Manifestin bulunması, yanlış beyan edilmiş bir paketi güvenli hale getirmez; ambalaj kondisyonu ve plan-gerçek konum doğrulanmalıdır.",
          "Bulk chemical/gas gemilerinde Certificate of Fitness, cargo list ve chapter 17/19 gibi ürün tabloları geminin hangi ürünü hangi tank/koşulda taşıyabileceğini sınırlar. Tank hazırlığı, inhibited cargo, temperature/pressure, compatibility, emergency shutdown ve pollution category prosedürleri kargo planının ayrılmaz parçalarıdır.",
        ],
        ["SOLAS VII", "IMDG Code Amendment 42-24", "IBC Code", "IGC Code", "INF Code"],
        "Dangerous goods manifest, stow plan, fire plan ve emergency schedule tek bir paket/hold/tank üzerinden çapraz kontrol edilmelidir.",
        ["SDS'i dangerous goods declaration yerine kabul etmek", "Aynı UN numarasındaki subsidiary risk veya packing group farkını gözden kaçırmak"],
        scenario(
          "Son dakika tehlikeli yük konteyneri",
          "Terminal, kapanıştan hemen önce manifestte olmayan bir konteyneri yükleme planına ekler ve belgenin sonra gönderileceğini söyler.",
          "Doğru sınıflandırma ve segregation bilgisi olmadan gemi yangın, reaksiyon ve acil müdahale planını doğrulayamaz. Ticari zaman baskısı SOLAS/IMDG gerekliliğini değiştirmez.",
          "Konteyner bilgi ve belgeler tamamlanıp stowage/segregation uygunluğu doğrulanana kadar yüklenmemeli; değişiklik nihai manifest ve emergency information'a işlenmelidir.",
        ),
      ),
    ],
    ["Doğru yük bilgisi bütün sonraki emniyet hesaplarının girdisidir.", "Plan ile gerçek yükleme sürekli uzlaştırılır.", "Tehlikeli yük kodu, ürün kadar taşıma biçimine de bağlıdır."],
  ),
  chapter(
    "solas-ix-xi",
    "Bölüm IX ve XI: ISM, şirket yönetimi, gemi kimliği ve ISPS bağlantısı",
    "SOLAS teknik donanımı yönetim ve güvenlik sistemiyle bağlar. Gemide çalışan bir ekipman, onu sürdüren sorumluluk, prosedür, raporlama ve öğrenme mekanizması yoksa kalıcı bir bariyer değildir.",
    [
      section(
        "ISM Code: DOC, SMC ve kaptanın üstün yetkisi",
        [
          "SOLAS IX, ISM Code'u zorunlu kılar. Şirketin Document of Compliance'ı ilgili gemi tipleri için yönetim sisteminin kabulünü, geminin Safety Management Certificate'ı ise bu sistemin gemide uygulanmasını gösterir. Belge tarihleri önemli olsa da gerçek test; mürettebatın prosedürü bilmesi, kritik operasyonların planlanması, uygunsuzlukların raporlanması ve iç denetim/management review ile sistemin öğrenmesidir.",
          "Designated Person Ashore, gemi ile en üst yönetim arasında erişim ve emniyet/kirlilik önleme performansının izlenmesini sağlar; gemi operasyonunu uzaktan yönetmek için kaptanın yerini almaz. Kaptanın overriding authority'si, canı, gemiyi ve çevreyi korumak için gerekli kararı verme ve şirket yardımını isteme yetkisidir. Bu yetki plansız veya gerekçesiz sapma değil, emniyet önceliğinin kurumsal güvencesidir.",
          "Non-conformity, near miss ve defect kayıtları ayrı amaçlara sahip olabilir fakat aynı kök sorunu işaret ettiğinde birleştirilmelidir. Düzeltme yalnız arızalı parçayı değiştirmek; corrective action ise tekrarın sistem nedenini kaldırmaktır. Etkinlik kontrolü yapılmadan faaliyet kapatılmış sayılmamalıdır.",
        ],
        ["SOLAS IX", "ISM Code paragraphs 4-12", "DOC and SMC certification"],
        "Kaptan, bir ticari baskı senaryosunda stop-work/overriding authority kararını kime nasıl bildireceğini; şirket ise bu kararı nasıl destekleyeceğini gösterebilmelidir.",
        ["DPA'yı yalnız belge gönderen kişi olarak görmek", "Near miss rapor sayısını düşürmeyi iyi emniyet performansı sanmak"],
      ),
      section(
        "XI-1 emniyet tedbirleri ve izlenebilir gemi kimliği",
        [
          "SOLAS XI-1; authorization of recognized organizations, enhanced surveys, ship identification number, port State control on operational requirements ve Continuous Synopsis Record gibi araçlarla geminin kimliğini ve denetim izini güçlendirir. IMO number gemi ömrü boyunca kalıcı kimliktir; isim veya bayrak değişikliğiyle değişmez.",
          "Continuous Synopsis Record, bayrak, sahiplik, şirket ve ISM ilişkisi gibi değişikliklerin kronolojik izini sağlar. Eksik sayfa, tutarsız tarih veya yetkisiz düzeltme yalnız idari kusur değildir; sorumluluk zincirini belirsizleştirir. ESP kapsamındaki bulk carrier/oil tanker yapısal sörvey kayıtları da kondisyon değerlendirmesi, thickness measurement ve repair history ile birlikte okunur.",
        ],
        ["SOLAS XI-1", "IMO Ship Identification Number Scheme", "Continuous Synopsis Record", "ESP Code"],
        "CSR dosyası ve sertifika isim/şirket bilgileri, son bayrak veya management değişiminden sonra topluca çapraz kontrol edilmelidir.",
        ["Eski CSR sayfasını atmak", "IMO number ile company identification number'ı karıştırmak"],
      ),
      section(
        "XI-2 ve ISPS Code: emniyet ile güvenliğin kesişimi",
        [
          "SOLAS XI-2 ve ISPS Code; gemi, şirket ve liman tesisi arasında security risk değerlendirmesi, plan, görev, haberleşme ve security level düzenini kurar. International Ship Security Certificate, onaylı Ship Security Plan'ın gemide uygulandığını gösterir. Planın erişimi kontrollüdür; gizlilik, mürettebatın kendi görevini bilmemesi anlamına gelmez.",
          "Access control, restricted area, stores/baggage handling, deck patrol, Declaration of Security ve Ship Security Alert System farklı tehdit yollarını kontrol eder. Security level yükseldiğinde önceden belirlenmiş ilave tedbirler devreye girer. Stowaway, piracy/armed robbery ve cyber kaynaklı fiziksel güvenlik etkileri şirket prosedürlerinde ilgili diğer rejimlerle bağlanmalıdır.",
        ],
        ["SOLAS XI-2", "ISPS Code Parts A-B", "Ship Security Plan"],
        "SSAS testi gerçek alarm oluşturmadan bayrak/şirket onayı ve prosedürle yapılmalı; alıcının alarmı tanıdığı da doğrulanmalıdır.",
        ["ISPS familiarization'ı planın gizliliği gerekçesiyle yüzeysel bırakmak", "Security drill ile safety drill amaçlarını karıştırmak"],
      ),
    ],
    ["ISM teknik kuralları yaşayan bir yönetim sistemine bağlar.", "Kaptanın üstün yetkisi emniyet kararının ticari baskıdan korunmasıdır.", "Safety ve security planları farklı olsa da ortak operasyonları koordine etmelidir."],
  ),
  chapter(
    "solas-xii-xv",
    "Bölüm XII-XV: özel gemiler, doğrulama, kutup seferi ve endüstriyel personel",
    "SOLAS'ın son bölümleri belirli gemi tipleri ve operasyonların klasik yük/yolcu gemisi varsayımlarını aşan risklerine özel, daha ayrıntılı bariyerler getirir.",
    [
      section(
        "Bulk carrier ek yapısal emniyeti ve goal-based standard bağlantısı",
        [
          "Bölüm XII, belirli bulk carrier'larda ambar su alma, yapısal dayanım, water ingress alarmı ve pumping/drainage gibi ek risk kontrollerini düzenler. Uygulanabilirlik geminin boyu, yapım tarihi, double/single side skin düzeni ve taşıdığı yük yoğunluğu gibi hükme özgü ölçütlerle belirlenir.",
          "Hold bilge alarmı veya water ingress detector yalnız test düğmesiyle doğrulanmamalıdır; sensör konumu, alarm seviyesi, köprüüstü tekrarı, isolation durumu ve gerçek ambar kondisyonuyla bağ kurulmalıdır. Korozyon, çatlak ve steel renewal geçmişi ESP/klas kayıtlarından cargo operation limitlerine aktarılır.",
        ],
        ["SOLAS XII", "ESP Code", "SOLAS II-1 goal-based ship construction standards"],
        "Baş zabit ve başmühendis, ambar su girişi senaryosunda alarmdan pumping/ballasting ve kıyı bildirimine kadar karar akışını birlikte çalışmalıdır.",
        ["Bulk carrier genel sertifikasını tüm XII hükümlerinin kanıtı saymak", "Alarm testini yapısal kondisyon incelemesinden ayırmak"],
      ),
      section(
        "XIII uygunluk doğrulaması ve devlet denetim sistemi",
        [
          "Bölüm XIII, IMO Member State Audit Scheme'i SOLAS bağlamında zorunlu çerçeveye bağlar. Amaç yalnız gemiyi değil, bayrak, kıyı ve liman devleti yükümlülüklerinin nasıl uygulandığını sistem düzeyinde doğrulamaktır. Bu bölüm doğrudan günlük ekipman checklist'i üretmese de gemide görülen sertifika, sörvey ve enforcement kalitesinin arkasındaki devlet sistemini açıklar.",
          "Şirket açısından çıkarım, farklı otoritelerin rolünü doğru ayırmaktır. Bayrak onayı, RO sörveyi, klas notasyonu ve liman devleti kontrolü birbirinin yerine geçmez. Çelişkili talimatta kaynak, yetki ve uygulanabilirlik yazılı şekilde netleştirilmelidir.",
        ],
        ["SOLAS XIII", "IMO Instruments Implementation Code (III Code)"],
        "Gemide bir talimatın kimden geldiği kadar hangi hukukî yetkiye ve hangi gemi durumuna dayandığı da kaydedilmelidir.",
        ["PSC talebini kalıcı teknik onayla karıştırmak", "RO'nun her şirket prosedürünü otomatik onayladığını varsaymak"],
      ),
      section(
        "XIV Polar Code: sertifika, operasyonel sınırlama ve sefer planı",
        [
          "SOLAS XIV, Polar Code'un emniyet bölümünü zorunlu kılar. Polar Ship Certificate ve Polar Water Operational Manual; geminin kategori/buz kabiliyeti, tasarım sınırları, düşük sıcaklık, icing, iletişim, survival, yangın ve çevresel koşullardaki operasyon yöntemini ortaya koyar.",
          "Buz haritası veya ice navigator desteği, kaptanın sefer risk değerlendirmesinin yerine geçmez. Buz konsantrasyonu/yaşı, visibility, daylight, chart/hydrographic belirsizlik, SAR uzaklığı, equipment temperature rating ve place of refuge seçenekleri passage plan'a işlenir. Operasyonel assessment değişen gerçek koşulla sürekli güncellenir.",
        ],
        ["SOLAS XIV", "Polar Code Part I-A", "Polar Ship Certificate and PWOM"],
        "Köprüüstü ekibi, PWOM'daki limitleri gerçek hava/buz raporuyla karşılaştırıp bir turn-back veya safe haven eşiğini açıklayabilmelidir.",
        ["Ice class'ı her buz koşulunda geçiş izni sanmak", "Soğukta batarya, yangın hattı ve kişisel koruma performansını ayrı ayrı değerlendirmemek"],
      ),
      section(
        "XV ve IP Code: endüstriyel personelin güvenli taşınması",
        [
          "1 Temmuz 2024'te yürürlüğe giren SOLAS XV ve zorunlu IP Code, offshore enerji ve benzeri faaliyetlere taşınan industrial personnel için özel emniyet rejimi kurar. Bu kişiler klasik anlamda yolcu veya gemi mürettebatı olmayabilir; ancak sağlık, yaş, eğitim/familiarization, transfer ve konaklama koşullarıyla yönetilen ayrı bir statüye sahiptir.",
          "Personnel transfer arrangement, transfer alanı, weather/sea limitleri, PPE, communication, emergency recovery ve sayı/muster kaydı operasyon öncesi doğrulanır. Geminin Industrial Personnel Safety Certificate'ı ve varsa permit to operate sınırlamaları, charter talebinden önce okunmalıdır.",
        ],
        ["SOLAS XV", "International Code of Safety for Ships Carrying Industrial Personnel (IP Code)"],
        "Her transfer için gemi/tesis sorumluluğu, stop kriteri ve denize düşen personel recovery planı ortak toolbox meeting'de teyit edilmelidir.",
        ["Endüstriyel personeli otomatik olarak passenger veya crew prosedürüne dahil etmek", "Sertifikadaki kişi/operasyon limitini ticari kapasite hesabıyla karıştırmak"],
      ),
    ],
    ["Özel bölümün uygulanabilirliği gemi ve operasyona özgü kanıtlanır.", "Sertifika operasyon limitini görünür kılar; limitin kendisi değildir.", "Yeni operasyon türü SMS, eğitim, ekipman ve acil durum düzenini birlikte değiştirebilir."],
  ),
  chapter(
    "solas-denetim-vaka",
    "SOLAS'ı gemide yönetmek: bütünleşik denetim ve vaka çözüm yöntemi",
    "Derin SOLAS bilgisi, kural numarasını ezberlemekten çok bir emniyet bariyerinin tasarım, operasyon, bakım, insan ve kanıt katmanlarını aynı olay üzerinde kurabilmektir.",
    [
      section(
        "Beş sorulu kuraldan kanıta yöntemi",
        [
          "Her konu için önce 'Bu hüküm neden bu gemiye uygulanıyor?' sorusu cevaplanır. Ardından kuralın koruduğu tehlike ve beklenen emniyet işlevi açıklanır. Üçüncü adımda gemideki gerçek ekipman/prosedür ve sorumlu roller, dördüncüde oluşan objektif kanıt, beşincide arıza veya sapmada güvenli durum ve bildirim yolu gösterilir.",
          "Bu yöntem PSC'nin belge-fiziksel durum-personel bilgisi üçgenini taklit eder. Örneğin fire pump için sertifika ve plan, pompanın gerçek start/pressure performansı, valf line-up, mürettebatın kullanımı ve arıza kaydı aynı örnekte incelenir. Bir katman diğerini doğrulamıyorsa kök neden araştırılır.",
          "Denetim hazırlığı kayıtları güzelleştirmek değildir. Eski bir eksikliği saklamak yerine risk kontrollü açık defect, yetkili bildirim ve uygulanabilir kapanış planı göstermek; gerçeğe uymayan temiz bir dosyadan daha güvenilir ve emniyetlidir.",
        ],
        ["SOLAS Chapter I/19", "ISM Code", "IMO Procedures for Port State Control"],
        "Haftalık bölüm toplantısında bir SOLAS bariyeri seçilip beş soru gerçek ekipman başında cevaplanmalıdır.",
        ["Personeli standart cümle ezberletmek", "Denetimden hemen önce geriye dönük toplu kayıt oluşturmak"],
      ),
      section(
        "Bütünleşik vaka: makine dairesi yangını, blackout ve tahliye hazırlığı",
        [
          "Bir fuel spray yangını aynı anda II-2 yakıt izolasyonu ve söndürmeyi, II-1 ana/acil enerjiyi, III muster ve can kurtarma hazırlığını, IV dış haberleşmeyi, V seyir riskini ve IX ISM komutasını tetikler. Gerçek acil durum sözleşme bölümlerine ayrılmış yaşanmaz; prosedürler arasındaki arayüz kritik hale gelir.",
          "Köprüüstü geminin seyir tehlikesini azaltıp genel alarm ve dış haberleşmeyi yönetirken makine ekibi kaynağı izole eder, yangın ekibi sınırlandırma/söndürmeyi hazırlar ve muster ekibi personel sayımını doğrular. Acil jeneratör, fire pump, emergency lighting ve communication yükleri öncelik sırasıyla korunur. Sabit söndürme kararı personel sayımı ve mahallin kapatılmasıyla bağlanır.",
          "Olay sonrası yalnız yanan parçanın değişmesi yeterli değildir. Fuel leak'in teknik nedeni, insulation kondisyonu, alarm/tur performansı, iş yönetimi, spare quality ve tatbikat dersi araştırılır. Flag/RO/shore authority bildirimleri ve survey gereği belirlenir; lessons learned filo prosedürü ve PMS'ye aktarılır.",
        ],
        ["SOLAS II-1", "SOLAS II-2", "SOLAS III-IV-V", "ISM Code emergency preparedness"],
        "Tatbikat senaryoları en az iki sistemin aynı anda kaybını ve departmanlar arası handover'ı sınamalıdır.",
        ["Her departmanın kendi checklist'ini bitirmesini olayın başarı ölçüsü saymak", "Acil durum sonrası yalnız teknik onarıma odaklanmak"],
        scenario(
          "Acil jeneratör başladı fakat yangın pompası yük alamadı",
          "Blackout sonrası emergency generator otomatik başlar; emergency fire pump motoru start komutu alır ancak düşük gerilim nedeniyle debi oluşmaz.",
          "Tekil testlerin geçmesi, birleşik yük altında sistemin çalışacağını kanıtlamamıştır. Yakıt yangını sürerken su kaynağının kaybı bariyerler arası ortak nedenli arızadır.",
          "Alternatif pompa/su kaynağı devreye alınmalı, yangın taktiği ve dış yardım kararı güncellenmeli; olay sonrasında load acceptance, kablo/koruma ve test kapsamı teknik olarak incelenip birleşik fonksiyon testi programa eklenmelidir.",
        ),
      ),
    ],
    ["Bir SOLAS vakası çoğu zaman birden fazla bölümü aynı anda tetikler.", "Denetimde en güçlü cevap kural, fiziksel durum ve kayıt tutarlılığıdır.", "Bulgunun görünür ve kontrollü olması, gizlenmiş uygunsuzluktan daha emniyetlidir."],
  ),
];

const colregNarrative: RegulationNarrativeChapter[] = [
  chapter(
    "colreg-yapi-sorumluluk",
    "COLREG'in yapısı, Kural 1-3 ve denizcinin sorumluluğu",
    "COLREG 41 kuralı altı bölümde, teknik ayrıntıları tamamlayan dört ekte düzenler. Kurallar mekanik bir geçiş üstünlüğü tablosu değil; erken algılama, öngörülebilir manevra ve iyi denizcilik uygulamasıyla çatışmayı önleyen ortak karar dilidir.",
    [
      section(
        "Kural 1: uygulama alanı ve yerel/özel kurallarla ilişki",
        [
          "Kural 1, COLREG'i açık denizlerde ve deniz seyir gemilerinin ulaşabildiği bunlarla bağlantılı sularda uygular. Liman, roadstead, nehir veya iç suyolu otoritesinin özel kuralları bulunabilir; bunlar mümkün olduğunca COLREG'e uygun olmalıdır. Trafik ayırım düzenleri de yetkili IMO düzeni ve yerel bilgiyle birlikte okunur.",
          "Savaş gemileri, konvoylar veya balıkçı filoları için ek ışık/şekil/işaret düzenleri kabul edilebilir; ancak bunların genel COLREG ışık ve şekilleriyle karıştırılmaması gerekir. Geminin bayrak veya liman talimatı, vardiya zabitinin güncel nautical publication, chart note ve VTS bilgisini kontrol etme sorumluluğunu ortadan kaldırmaz.",
        ],
        ["COLREG Rule 1", "Applicable local navigation rules", "IMO-adopted TSS information"],
        "Passage plan appraisal aşamasında COLREG yanında VTS, reporting, pilotage ve yerel hız/geçiş kuralları ayrı bir rota notuna işlenmelidir.",
        ["COLREG bildiği için yerel kuralı kontrol etmemek", "VTS talimatını çatışmayı önleme sorumluluğunun bütünüyle devri sanmak"],
      ),
      section(
        "Kural 2: sorumluluk, ordinary practice ve özel koşullar",
        [
          "Kural 2(a), gemiyi, sahibini, kaptanı veya mürettebatı kurallara uyulmamasının ya da denizcilerin olağan uygulamasının/özel koşulların gerektirdiği tedbiri ihmal etmenin sonuçlarından kurtarmaz. Bu, yazılı kurala teknik olarak uyarken açık bir tehlikeyi görmezden gelmenin savunma olmadığı anlamına gelir.",
          "Kural 2(b), bütün seyir ve çatışma tehlikeleri ile gemilerin sınırlamalarına gereken dikkat gösterilmesini, ani tehlikeyi önlemek için kurallardan ayrılmayı gerektirebilecek özel koşulları kabul eder. Ayrılma, kolaylık veya daha kısa rota için genel izin değildir; tehlikeyi önlemek için gerekli, orantılı, zamanında ve sonradan açıklanabilir olmalıdır.",
          "İyi denizcilik; etkili gözcülük, erken risk değerlendirmesi, geminin manevra karakterini bilme, emniyetli hız, açık köprüüstü iletişimi ve yapılan manevranın sonucunu izlemeyi içerir. Kaptanı çağırma, hız azaltma veya ek gözcü koyma kararı 'kurallarda yazmıyor' diye ertelenemez.",
        ],
        ["COLREG Rule 2"],
        "Rule 2 kullanılan bir olayda vardiya zabiti hangi ani tehlikeyi, hangi standart kuralın neden yetersiz kaldığını ve seçilen sapmanın neden en güvenli seçenek olduğunu log/VDR verisiyle açıklayabilmelidir.",
        ["Rule 2'yi istenen manevrayı meşrulaştıran serbest madde görmek", "Stand-on olmayı hiçbir koşulda hareket etmeme hakkı saymak"],
        scenario(
          "Kural manevrası yeni tehlike yaratıyor",
          "Crossing durumunda sancak tarafa dönmek beklenen hareketken sancakta sığlık ve hemen kıç omuzlukta başka gemi vardır.",
          "Tek gemili şema gerçek özel koşulları temsil etmez. Kural 2 bütün tehlikeleri ve gemi sınırlamalarını birlikte değerlendirmeyi gerektirir.",
          "Hız azaltma/stop, güvenli tarafta koordineli manevra, erken ses/ışık uyarısı ve kaptan çağrısı dahil seçenekler değerlendirilir; gerekli sapma açık ve izlenebilir yapılır, tehlike geçince normal seyir düzenine dönülür.",
        ),
      ),
      section(
        "Kural 3 tanımları: durumun adı manevra sorumluluğunu değiştirir",
        [
          "Power-driven vessel, sailing vessel, vessel engaged in fishing, not under command, restricted in ability to manoeuvre, constrained by draught, underway, making way ve restricted visibility ifadeleri günlük dildeki anlamlarıyla değil Kural 3 tanımıyla kullanılır. Örneğin underway; demirde, karaya bağlı veya karaya oturmuş olmamayı ifade eder; suya göre ilerliyor olmak ayrıca making way kavramıdır.",
          "NUC, olağanüstü bir nedenle kuralların istediği gibi manevra yapamayan gemidir. RAM, yaptığı işin niteliği nedeniyle manevrası kısıtlanan gemidir. CBD yalnız power-driven vessel için, mevcut su derinliği/genişliğiyle ciddi rota sapması kısıtını anlatır. Büyük veya draftı fazla olmak kendiliğinden bu statüyü vermez.",
          "Bir geminin statüsü yalnız AIS textinden çıkarılmaz. Görülen ışık/şekil, gündüz-gece, yaptığı iş, hareket, radar izi ve mevcut su alanı birlikte değerlendirilir. Statü işaretlerini göstermeyen bir geminin gerçek manevra sınırlaması yine Kural 2, 5, 7 ve 8 kapsamında hesaba katılır; fakat yanlış işaretleme kendi ihlalini doğurabilir.",
        ],
        ["COLREG Rule 3"],
        "Köprüüstü ekibi her hedef için 'statü – relative aspect – risk – uygulanacak bölüm/kural' zincirini sözlü olarak kurmalıdır.",
        ["AIS navigation status'a körü körüne güvenmek", "Draftı büyük her gemiyi CBD saymak", "Underway ile making way'i aynı sanmak"],
      ),
    ],
    ["Kural 2 kuralları zayıflatmaz; tehlike karşısındaki sorumluluğu tamamlar.", "Statü günlük söylemle değil Kural 3 tanımıyla belirlenir.", "Yerel kural ve VTS, COLREG gözcülüğünün yerine geçmez."],
  ),
  chapter(
    "colreg-4-8",
    "Kural 4-8: gözcülükten etkili kaçınma manevrasına",
    "Çatışmayı önleme, son anda hangi geminin döneceğine karar vermek değil; riskin erken ve güvenilir biçimde bulunup herkesçe anlaşılır bir manevrayla kaldırılması sürecidir.",
    [
      section(
        "Kural 5 gözcülük ve Kural 6 emniyetli hız",
        [
          "Proper lookout; görme ve işitmenin yanında mevcut şartlara uygun bütün araçların kullanılmasını ister. Radar/ARPA, AIS, ECDIS, binocular, VHF ve dış alarm bilgisi görsel gözcülüğü tamamlar; hiçbiri tek başına onun yerine geçmez. Gözcünün başka görevlerle dikkati bölünmemeli, vardiya zabiti bridge team kapasitesini trafik ve görüşe göre artırmalıdır.",
          "Safe speed, çatışmayı önlemek için uygun ve etkili hareket yapılmasına ve mevcut koşul/şartlara uygun mesafede durmaya izin veren hızdır. Görüş, trafik yoğunluğu, geminin manevra kabiliyeti, gece arka plan ışıkları, rüzgâr-deniz-akıntı, seyir tehlikeleri ve draft/su derinliği değerlendirilir. Radarlı gemiler ayrıca radar karakteri, range-scale kısıtı, sea/rain clutter, küçük hedef tespiti ve hedef sayısını dikkate alır.",
          "Emniyetli hız sabit bir liman limiti veya şirket sayısı değildir. Aynı sürat açık denizde uygunken yoğun sis, dar kanal, kıyı ışıkları ya da düşük under-keel clearance altında uygun olmayabilir. Hız kararı koşul değiştikçe yeniden değerlendirilir; motorun immediate manoeuvre için hazır olması gerektiğinde makine dairesiyle önceden koordine edilir.",
        ],
        ["COLREG Rules 4-6"],
        "Master's standing orders, hangi trafik/görüş koşulunda ek gözcü, hand steering, engine standby ve kaptan çağrısı gerektiğini gemiye özgü belirtmelidir.",
        ["Radar açık olduğu için proper lookout sağlandığını varsaymak", "Safe speed'i yalnız stopping distance ile ölçmek"],
      ),
      section(
        "Kural 7 çatışma riski: bearing, CPA/TCPA ve belirsizlik",
        [
          "Risk of collision bütün mevcut araçlarla belirlenir; şüphe varsa risk var kabul edilir. Sabit veya çok az değişen pusula kerterizi klasik güçlü işarettir, ancak büyük gemi, tow veya çok yakın mesafede belirgin bearing change varken de risk bulunabilir. Görsel bearing trendi radar plotting ile tamamlanır.",
          "ARPA'nın CPA/TCPA çıktısı sensör ve modele bağlı tahmindir. Own-ship speed/vector seçimi, gyro/log hatası, target swap, acquisition gecikmesi, manoeuvring target ve sea clutter sonucu değiştirebilir. Sistem üreticisi ve şirket alarm değerleri karar desteğidir; COLREG bütün gemiler için tek bir evrensel minimum CPA sayısı koymaz. Gemi boyu, hız, su alanı, trafik ve manevra belirsizliği birlikte değerlendirilir.",
          "Scanty information, özellikle yetersiz radar bilgisi üzerine varsayım yapılmamalıdır. Bir hedefin tek taramada kaybolması onun risk oluşturmadığını kanıtlamaz. Range scale değişimi, parallel indexing, manual plot veya ikinci radar, görsel gözlem ve uygun hızla belirsizlik azaltılır.",
        ],
        ["COLREG Rule 7"],
        "Her kritik hedefte CPA/TCPA değerinin yanında trendin güvenilirliği, sensor mode ve en son manevra zamanı bridge team içinde paylaşılmalıdır.",
        ["Şirket CPA ayarını COLREG'in sayısal kuralı gibi sunmak", "AIS CPA ile radar CPA ayrışınca uygun olanı seçmek"],
        scenario(
          "ARPA güvenli, görsel kerteriz sabit",
          "ARPA hedef için 1,2 NM CPA gösterir; ardışık görsel kerterizler ise sabit kalır ve hedef büyük bir tow'dur.",
          "Tow'un boyutu/iz geometrisi, yanlış hedef noktası veya sensör girdisi ARPA tahminini yanıltabilir. Şüphe halinde risk var kabul edilir.",
          "Radar plot ve görsel trend doğrulanır, tow'un tüm uzunluğu hesaba katılır, erken ve geniş emniyet paylı manevra hazırlanır; belirsizlik çözülene kadar hız düşürülür ve kaptan çağrılır.",
        ),
      ),
      section(
        "Kural 8: olumlu, zamanında ve sonucu izlenen manevra",
        [
          "Kaçınma hareketi kurallara uygun, olumlu, yeterince erken ve good seamanship gözetilerek yapılmalıdır. Rota veya hız değişikliği, başka geminin görsel ya da radar gözleminde kolayca anlaşılacak kadar belirgin olmalıdır. Bir dizi küçük rota değişikliği niyeti belirsizleştirir ve yeni close-quarters situation yaratabilir.",
          "Yeterli deniz sahası varsa yalnız course alteration etkili olabilir; ancak manevra başka bir close-quarters durumu üretmemeli ve diğer gemi finally past and clear olana kadar izlenmelidir. Hız azaltma, way'i kesme, stop veya reverse propulsion da Kural 8'in açık araçlarıdır. Erken hız kullanımı özellikle çoklu hedef ve kısıtlı suda manevra alanı satın alır.",
          "'Not to impede' yükümlülüğü ile risk oluştuktan sonraki encounter rules birlikte okunur. Başlangıçta geçişi engellememesi gereken gemi erken hareket etmelidir; fakat risk of collision oluşmuşsa diğer gemi de ilgili Bölüm II kurallarındaki sorumluluğundan kurtulmaz.",
        ],
        ["COLREG Rule 8"],
        "Manevra emri öncesi beklenen yeni CPA/geometry söylenmeli; uygulama sonrası radar ve görsel gözlemle gerçekten oluşup oluşmadığı doğrulanmalıdır.",
        ["Manevrayı yaptıktan sonra hedefi izlemeyi bırakmak", "VHF mutabakatını belirgin rota/hız hareketinin yerine koymak"],
      ),
    ],
    ["Şüphe varsa çatışma riski var kabul edilir.", "CPA tek başına hüküm değil, doğrulanması gereken tahmindir.", "İyi manevra erken, belirgin ve sonucu izlenen manevradır."],
  ),
  chapter(
    "colreg-9-10",
    "Kural 9-10: dar kanallar ve trafik ayırım düzenleri",
    "Kısıtlı su alanlarında yalnız iki geminin geçiş geometrisi değil, kanal sınırı, draft, trafik akışı ve 'engellememe' yükümlülüğü birlikte değerlendirilir.",
    [
      section(
        "Kural 9 dar kanal ve fairway disiplini",
        [
          "Dar kanal veya fairway boyunca ilerleyen gemi, emniyetli ve uygulanabilir olduğu ölçüde sancak dış sınırına yakın seyretmelidir. Kanalın ne kadar 'dar' olduğu yalnız harita genişliğine değil, gemi draftı/manevrası, trafik, bank effect ve kullanılabilir suya bağlıdır. Safe speed ve etkin gözcülük yükümlülüğü aynen devam eder.",
          "Boyu 20 metreden küçük gemi, sailing vessel ve fishing vessel, yalnız kanal içinde emniyetle seyredebildiği geminin geçişini engellememelidir. Bir gemi kanal içinde güvenle seyreden geminin geçişini engelliyorsa crossing yapmamalıdır. Bu yükümlülük diğer gemiye sınırsız geçiş hakkı vermez; risk oluştuğunda bütün taraflar ilgili kaçınma kurallarını uygular.",
          "Bend veya araya giren engel nedeniyle diğer geminin görülmediği kesimde prescribed sound signal verilir ve dikkatle yaklaşılır. Overtaking ancak geçilen gemi güvenli geçiş için hareket etmek zorundaysa Rule 9'daki niyet/mutabakat ses işaretleriyle ve gerekli dikkatle yürütülür. Demirleme mümkünse kanalda kaçınılması gereken bir harekettir.",
        ],
        ["COLREG Rule 9", "COLREG Rule 34(c)"],
        "Passage plan; channel meeting points, no-return/abort point, squat/UKC, bank effect ve engine/steering readiness notlarını içermelidir.",
        ["Sancak kenara yaklaşmayı UKC riskini göz ardı edecek mutlak emir saymak", "Küçük geminin engellememe yükümlülüğünü büyük geminin gözcülük sorumluluğundan muafiyet sanmak"],
      ),
      section(
        "Kural 10 TSS: giriş, çıkış, crossing ve inshore traffic zone",
        [
          "Trafik şeridini kullanan gemi genel trafik akışı yönünde ilerler, separation line/zone'dan mümkün olduğunca uzak durur ve şeride uçlarından ya da mümkün olduğunca küçük açıyla girip çıkar. Crossing gerekiyorsa genel trafik akışına mümkün olduğunca dik heading ile yapılır; amaç şeritte geçirilen zamanı ve niyet belirsizliğini azaltmaktır. Ground track, akıntı nedeniyle heading'den farklı olabilir.",
          "Inshore traffic zone normalde through traffic için kestirme yol değildir; Kural 10'da sayılan gemiler/koşullar ve liman/tesis erişimi gibi amaçlar ayrıca değerlendirilir. Fishing, anchoring, separation zone'a girme ve şerit yakınında seyir için özel hükümler bulunur. Charted TSS yanında adopted status ve yerel reporting/VTS şartları kontrol edilmelidir.",
          "Kural 10, başka hiçbir kural altındaki yükümlülüğü kaldırmaz. TSS içinde crossing situation, overtaking veya restricted visibility oluşabilir. Trafik akışına uygun seyretmek, stand-on statüsünü otomatik vermez; encounter geometry ve gemi statüleri ayrıca belirlenir.",
        ],
        ["COLREG Rule 10"],
        "ECDIS route check, crossing heading ve akıntı etkisini; vardiya brifingi ise şeritteki encounter sorumluluklarını ayrı ayrı göstermelidir.",
        ["TSS yönünde giden gemiyi her durumda stand-on saymak", "Crossing kuralındaki dik heading'i dik ground track olarak ezberlemek"],
        scenario(
          "TSS crossing sırasında akıntı",
          "Gemi şeridi geçerken başını trafik akışına 90° tutar; güçlü akıntı ground track'i eğerek şeritte kalış süresini uzatır.",
          "Rule 10 mümkün olduğunca dik heading ister, ancak safe navigation ve diğer kurallar devam eder. Sadece ekrandaki ground track'i düzeltmek niyeti karşı gemilere belirsiz gösterebilir.",
          "Akıntı passage plan'da hesaplanır; uygun heading, speed ve crossing zamanı seçilir, hedeflerle risk Rule 7-8'e göre yönetilir ve gerekiyorsa crossing ertelenir.",
        ),
      ),
    ],
    ["Kısıtlı su, encounter kuralına ek bir çevresel sınırlamadır.", "TSS kullanımı stand-on hakkı yaratmaz.", "Not-to-impede yükümlülüğü en iyi erken planlamayla yerine getirilir."],
  ),
  chapter(
    "colreg-11-18",
    "Kural 11-18: birbirini gören gemilerde encounter kuralları",
    "Önce görüş koşulu ve geometry belirlenir; sonra overtaking, head-on veya crossing kuralı uygulanır. Gemi türlerinin sorumluluk sırası, özel kuralları ortadan kaldıran basit bir 'üstünlük piramidi' değildir.",
    [
      section(
        "Kural 12-15: sailing, overtaking, head-on ve crossing",
        [
          "Sailing vessels için Rule 12 rüzgâr tarafı ve windward/leeward ilişkisine göre manevra sorumluluğu kurar. Ancak motorla sevk edilen yelkenli, gündüz konik şekil göstermeli ve power-driven vessel gibi değerlendirilmelidir. Yelkenin açık olması tek başına sailing vessel statüsü vermez.",
          "Rule 13 overtaking, başka gemiye kıç doğrultusunun 22,5 dereceden daha gerisinden yaklaşma tanımıyla başlar. Şüphe varsa overtaking kabul edilir. Overtaking gemisi, sonradan bearing değişip crossing görünümü oluşsa bile nihayet geçip açık olana kadar sorumluluğunu korur.",
          "Rule 14'te iki power-driven vessel reciprocal veya nearly reciprocal course ile head-on risk yaratıyorsa ikisi de sancağa döner. Şüphe varsa head-on kabul edilir. Rule 15 crossing'de diğer gemiyi sancak tarafında gören power-driven vessel give-way'dir ve koşullar elverdiğince diğerinin pruvasından geçmekten kaçınır.",
        ],
        ["COLREG Rules 11-15"],
        "Vardiya zabiti hedefi ilk görünümden manevra sonuna kadar sınıflandırmalı; bearing değişti diye overtaking sorumluluğunu erken bırakmamalıdır.",
        ["AIS course değerine bakıp geometry'yi görsel/radar doğrulamamak", "Overtaking tamamlanmadan eski rotaya dönmek"],
      ),
      section(
        "Kural 16-17: give-way ve stand-on geminin üç aşamalı sorumluluğu",
        [
          "Give-way vessel, erken ve önemli ölçüde hareket ederek stand-on gemiden tamamen uzak geçmelidir. Küçük, geç veya kararsız manevra stand-on gemiye güvenilir bir niyet göstermez. Manevra, Rule 8'e göre başka tehlike yaratmadan ve finally past and clear olana kadar izlenerek yapılır.",
          "Stand-on vessel başlangıçta course ve speed'ini korur; bu öngörülebilirlik give-way geminin plan yapmasını sağlar. Give-way geminin uygun hareket etmediği anlaşılınca stand-on gemi yalnız kendi manevrasıyla çatışmayı önlemek için hareket edebilir. Durum öyle yakınlaşır ki give-way hareketi tek başına çatışmayı önleyemezse stand-on gemi çatışmayı en iyi önleyecek hareketi yapmak zorundadır.",
          "Power-driven crossing durumda stand-on gemi kendi manevrasıyla hareket ederken, koşullar elverdiğince kendi iskele tarafındaki gemi için iskeleye dönmekten kaçınır. Bu cümle, başka tehlike veya özel koşul varken mutlak bir yasak gibi uygulanmaz; Rule 2 ve tüm trafik resmi geçerlidir.",
        ],
        ["COLREG Rules 16-17"],
        "Bridge team, stand-on durumunda 'maintain – may act – shall act' eşiklerini hedef trendi ve manevra alanıyla önceden tanımlamalıdır.",
        ["Stand-on'u rota/sürat koruma hakkı olarak görmek", "Give-way gemiye VHF çağrısı yapıldığı için kendi geç müdahale eşiğini ertelemek"],
        scenario(
          "Give-way gemi küçük rota değişiklikleri yapıyor",
          "Sancaktan yaklaşan give-way geminin heading'i birkaç derece değişir, fakat CPA küçülmeye devam eder.",
          "Küçük değişiklik Rule 8'in kolayca fark edilebilir, substantial action standardını karşılamayabilir. Stand-on gemi yalnız çağrıya güvenemez.",
          "Trend yakından izlenir, kaptan erken çağrılır, warning signal ve hız/rota seçenekleri hazırlanır; Rule 17'nin may-act ve shall-act eşikleri geçmeden güvenli hareket yapılır.",
        ),
      ),
      section(
        "Kural 18 sorumlulukları: basit hiyerarşi neden yanıltıcıdır?",
        [
          "Rule 18, Rules 9, 10 ve 13'te aksi gerekmedikçe power-driven, sailing, fishing, NUC, RAM ve CBD gemiler arasındaki sorumlulukları düzenler. Overtaking kuralı gemi türü ilişkisinden önce gelir; dar kanal ve TSS'deki not-to-impede hükümleri de genel şemayı değiştirir. Bu nedenle tek bir ezber piramidi bütün karşılaşmaları çözmez.",
          "NUC ve RAM ışık/şekli diğer gemilerin erken ve geniş açıklık bırakmasını sağlar, fakat bu gemiler de koşullar elverdiğince çatışmadan kaçınma tedbiri alır. Fishing vessel yalnız Rule 3'teki anlamda manevrasını kısıtlayan fishing gear ile meşgulse bu statüdedir; trolling yapan tekne otomatik olarak engaged in fishing sayılmaz.",
          "CBD vessel özel lights/shapes gösterebilir ve diğer gemiler onun emniyetli geçişini engellemekten kaçınır. Yine de CBD statüsü su derinliğiyle ciddi kısıtın gerçek ve mevcut olmasına bağlıdır. VHF'de 'deep draft' demek ışık/şekil ve kural analizinin yerine geçmez.",
        ],
        ["COLREG Rule 18", "COLREG Rules 9, 10 and 13"],
        "Her encounter brifinginde önce özel kurallar, sonra Rule 18 statü ilişkisi kontrol edilmelidir.",
        ["Rule 18'i mutlak geçiş hakkı listesi yapmak", "Fishing gear toplanmış gemiyi hâlâ fishing vessel saymak"],
      ),
    ],
    ["Geometry doğru sınıflandırılmadan sorumluluk doğru kurulamaz.", "Stand-on geminin sorumluluğu durum yakınlaştıkça değişir.", "Rule 18, Rules 9, 10 ve 13 ile birlikte okunur."],
  ),
  chapter(
    "colreg-19",
    "Kural 19: kısıtlı görüşte radar temelli karar verme",
    "Kural 19, birbirini görmeyen gemilerin restricted visibility içinde veya yakınındaki davranışını düzenler. Bu durumda Rules 11-18'in görsel encounter şeması doğrudan uygulanmaz; radar bilgisi, emniyetli hız ve erken kaçınma esastır.",
    [
      section(
        "Kapsam, emniyetli hız ve makinenin hazır tutulması",
        [
          "Restricted visibility yalnız sis değildir; mist, falling snow, heavy rainstorm, sandstorm veya benzer nedenlerle görüşün kısıtlandığı koşulları kapsar. Rule 19, gemiler birbirini görmediğinde restricted visibility alanında veya yakınında seyrederken uygulanır. Bir geminin sis bankasının hemen dışında olması yaklaşan hedefler açısından kapsamı ortadan kaldırmaz.",
          "Her gemi görüş koşullarına uyarlanmış emniyetli hızla seyretmelidir. Power-driven vessel engines immediate manoeuvre için hazır tutulur. Ek gözcü, hand steering, her iki radarın uygun range/sea-rain clutter ayarı, fog signals ve kaptanın köprüüstünde bulunması şirket prosedürü ve riskle belirlenir.",
          "Hız azaltma kararı, radar menzilinde hedef görülmesini beklememelidir. Detection range; hedefin büyüklüğü, yağış/deniz paraziti, anten yüksekliği ve shadow sector'a göre değişir. Küçük tekne veya buz hedefi büyük gemiden çok daha geç belirlenebilir.",
        ],
        ["COLREG Rules 19 and 35", "COLREG Rule 6"],
        "Restricted visibility checklist, ekipman durumunu değil bridge team görev paylaşımı ve engine readiness teyidini de içermelidir.",
        ["AIS'te hedef yoksa alanı temiz kabul etmek", "Fog signal duyulmadığı için görsel kural setine dönmek"],
      ),
      section(
        "Radar hedefi, close-quarters ve kaçınılacak rota değişiklikleri",
        [
          "Radar alone ile başka gemi tespit edildiğinde close-quarters situation gelişip gelişmediği ve risk of collision bulunup bulunmadığı belirlenir. Risk varsa ample time içinde avoiding action alınır. Target tracking istikrarı, relative/true vector seçimi ve own-ship manoeuvre etkisi kontrol edilir.",
          "Yalnız course alteration yapılacaksa, overtaken vessel dışında pruva hattının ilerisindeki gemi için iskeleye dönüşten; tam borda veya borda gerisindeki gemiye doğru dönüşten mümkün olduğunca kaçınılır. Bu yönlendirme bütün radar resmi ve özel koşullar düşünülmeden otomatik 'daima sancağa dön' kuralına çevrilmemelidir. Hız azaltma/stop çoğu zaman daha açık ve güvenli seçenektir.",
          "Pruva hattının ilerisinde olduğu anlaşılan fog signal duyulursa veya forward target ile close-quarters önlenemiyorsa gemi, course'unu korumak için gerekli minimum sürate düşürür; gerekiyorsa way keser ve çatışma tehlikesi geçene kadar azami dikkatle seyreder. 'Minimum speed' geminin steerage ve çevresel tehlikelerine göre değerlendirilir.",
        ],
        ["COLREG Rule 19(d)-(e)"],
        "Radar plotting exercise yalnız CPA hesabını değil, seçilen rota/hız manevrasının diğer hedefler üzerindeki etkisini ve Rule 19(d) yön kısıtlarını göstermelidir.",
        ["Rule 19'u her hedef için otomatik sancağa dönüş kuralı sanmak", "Fog signal duyulduğunda sadece VHF ile kimlik aramak"],
        scenario(
          "Siste pruva hattının ilerisinde hedef ve iskelede sığlık",
          "Radar hedefi baş omuzlukta yakınlaşır; sancağa dönüş başka hedefe, iskeleye dönüş ise Rule 19 yönlendirmesi ve sığlığa risk yaratır.",
          "Tek rota hareketi güvenli değildir. Kural hız azaltma/way kesme seçeneğini açık bırakır; özel koşullar bütün tehlikelerle değerlendirilir.",
          "Motor hazırken sürat erken azaltılır veya way kesilir, mevcut rotada güvenli su korunur, bütün hedefler izlenir ve kaptanla kontrollü geçiş/stop planı uygulanır.",
        ),
      ),
    ],
    ["Rule 19 görsel encounter kurallarının kopyası değildir.", "Radar belirsizliği hız ve zaman marjıyla yönetilir.", "Rota değişikliği kadar hız azaltma ve way kesme de temel araçtır."],
  ),
  chapter(
    "colreg-20-31",
    "Kural 20-31: fenerler ve şekillerle geminin durumunu okumak",
    "Işık ve şekiller ezberlenecek renk dizileri değil; geminin tipi, yönü, hareketi, yaptığı iş ve manevra kısıtını uzaktan anlatan standart bir görsel cümledir.",
    [
      section(
        "Kural 20-22: gösterme zamanı, sektör ve görünürlük",
        [
          "Rules 20-31 ışıkların sunset-sunrise arasında gösterilmesini, restricted visibility dahil gerekli diğer koşullarda da kullanılmasını ve yanıltıcı başka ışıkların gösterilmemesini düzenler. Gündüz şekilleri gündüz gösterilir. Deck work light, reklam/servis ışığı veya accommodation ışığı COLREG fenerinin görünürlüğünü/karakterini bozmamalıdır.",
          "Masthead, sidelights, sternlight, towing light, all-round ve flashing light Rule 21'de sektör ve özellikleriyle tanımlanır; Rule 22 asgari görünürlük menzillerini gemi boyuna ve ışık türüne bağlar. Ampul yanıyor kontrolü, doğru arc, renk, intensity, vertical/horizontal separation ve ekranlamayı doğrulamaz.",
          "Tadilat, güverte yükü veya konteyner stack'i bir feneri maskeleyebilir. Navigation light failure alarmı, yedek besleme ve değiştirme prosedürü operasyonel hazır oluşun parçasıdır. Gündüz şekilleri doğru ölçü, renk ve konumda, kolayca fark edilir olmalıdır.",
        ],
        ["COLREG Rules 20-22", "COLREG Annex I"],
        "Pre-departure check karanlıkta dış gözlem ve mümkünse farklı bearinglerden görünürlük kontrolü içermelidir; yalnız panel lambası yeterli değildir.",
        ["Fenerin çalışmasını doğru sektörün kanıtı saymak", "Deck cargo'nun fener görüş hattını hesaba katmamak"],
      ),
      section(
        "Kural 23-31: örüntüden gemi tipi, aspect ve faaliyet çıkarımı",
        [
          "Power-driven vessel underway; masthead, sidelights ve sternlight kombinasyonuyla hem statüsünü hem aspect'ini anlatır. Towing/pushing düzeninde ilave masthead/towing light, diamond shape ve tow length'e bağlı işaretler tow'un gerçek tehlike alanını görünür kılar. Tow ile tug arasındaki görünmeyen hat özellikle crossing kararında hesaba katılır.",
          "Sailing, fishing ve trawling; NUC, RAM, constrained by draught ve pilot vessel için farklı all-round light/shape örüntüleri vardır. RAM yapan dredger veya underwater operations vessel, obstruction bulunan tarafı ve güvenli geçiş tarafını ek işaretlerle gösterir. Bu bilgi, tek başına geçiş izni değil; Rule 7-8 ve uygun encounter kuralı için girdidir.",
          "Anchored vessel ve aground vessel işaretleri, underway örüntüsünden ayrılır. Boya, liman ışıkları veya arka plan nedeniyle gündüz şekli/fener görülmüyorsa radar hareketi ve konumla şüphe korunur. Seaplane ve WIG craft, kendi özel hükmüyle genel işaret sistemine mümkün olduğunca uyar.",
        ],
        ["COLREG Rules 23-31", "COLREG Annex I"],
        "Eğitimde ışık resmi için dört soru sorulmalıdır: hangi statü, hangi aspect, making way mi, hangi ek tehlike/iş alanı var?",
        ["Tek bir ışığı görüp bütün gemi statüsünü kesinleştirmek", "RAM işaretini mutlak geçiş hakkı olarak yorumlamak"],
        scenario(
          "Dredger'ın geçiş tarafını yanlış okumak",
          "Gece dredger üzerinde kırmızı-kırmızı ve bir yanında iki kırmızı, diğer yanında iki yeşil all-round ışık görülür.",
          "Kırmızı çift obstruction tarafını, yeşil çift geçişin yapılabileceği tarafı gösterir; fakat su derinliği, izin ve trafik hâlâ doğrulanmalıdır.",
          "Işıkların gemiye göre hangi tarafta olduğu radar/görsel aspect ile doğrulanır, chart/VTS bilgisi kontrol edilir ve yeterli açıklıkla, Rule 8'e uygun geçiş yapılır.",
        ),
      ),
    ],
    ["Işık resmi geminin statü ve aspect cümlesidir.", "Doğru renk kadar sektör, konum ve maskelenmeme önemlidir.", "Görülen statü, risk değerlendirmesinin girdisidir; otomatik geçiş hakkı değildir."],
  ),
  chapter(
    "colreg-32-37",
    "Kural 32-37: ses ve ışık işaretleri, distress ve VHF'nin sınırı",
    "İşaretler manevrayı görünür ve anlaşılır kılar; fakat işaret vermek, doğru manevra yapma ve sonucunu izleme yükümlülüğünün yerine geçmez.",
    [
      section(
        "Manevra, uyarı ve dar kanal ses işaretleri",
        [
          "Rules 32-33 whistle, short/long blast ve ses cihazlarını tanımlar. Rule 34, birbirini gören power-driven vessels için rota/makine manevra işaretlerini, şüphe/uyarı için en az beş kısa ve seri düdüğü ve dar kanalda overtaking niyet/uygunluk işaretlerini düzenler. Işık işareti kullanılacaksa aynı anlamı taşır.",
          "Beş kısa düdük 'ben stand-on'um' mesajı değil; diğer geminin niyet/eyleminden şüphe duyulduğunu veya çatışmayı önlemek için yeterli hareket yapmadığını bildirir. İşaretten sonra hız/rota/kaptan çağırma seçenekleri uygulanmazsa uyarı kendi başına riski azaltmaz.",
          "Bend işareti, görüşün engellendiği kanal kesiminde yaklaşan gemiye erken varlık bildirir. Liman içindeki yerel düdük işaretleri COLREG ile birlikte publication/pilot card ve VTS brifinginde teyit edilmelidir.",
        ],
        ["COLREG Rules 32-34", "COLREG Annex III"],
        "Köprüüstü familiarization'ı whistle control, automatic fog signal, emergency supply ve dışarıdan duyulabilirlik kontrolünü içermelidir.",
        ["Beş kısa düdüğü manevra yerine kullanmak", "Yerel işaret ile COLREG işaretini karıştırmak"],
      ),
      section(
        "Restricted visibility işaretleri ve dikkat çekme",
        [
          "Rule 35, restricted visibility içinde veya yakınında geminin statü ve hareketine göre periyodik ses işareti verir. Power-driven vessel making way ile underway fakat stopped/no way durumlarının işaretleri farklıdır; NUC, RAM, CBD, sailing, fishing ve towing gibi gemiler kendi örüntülerini kullanır. Anchored ve aground vessels için çan/gong ve ek işaretler bulunur.",
          "Rule 36, başka geminin dikkatini çekmek için kurallardaki bir işaretle karıştırılamayacak ışık veya ses kullanımına izin verir; high-intensity searchlight ile diğer geminin görüşünü bozmak uygun değildir. Laser veya deck light kullanımı da gözcülüğü tehlikeye düşürmemelidir.",
        ],
        ["COLREG Rules 35-36"],
        "Fog signal ayarı, geminin making-way durum değişikliğine göre güncellenmeli; otomatik cihazın doğru örüntüsü dış dinleme ile doğrulanmalıdır.",
        ["Underway fakat stopped işaretini anchored işareti sanmak", "Dikkat çekme ışığıyla köprüüstünü kör etmek"],
      ),
      section(
        "Distress işaretleri, VHF ve vaka sonrası öğrenme",
        [
          "Rule 37 ve Annex IV distress ve yardım ihtiyacını gösteren işaretleri listeler. DSC distress alert, EPIRB, MAYDAY, rockets/flares, orange smoke ve diğer tanınmış işaretler durum ve ekipmana göre kullanılır. Yanlış distress işareti hem hukuken hem operasyonel olarak ciddi sonuç doğurabilir; test prosedürleri gerçek alarmı önlemelidir.",
          "VHF, kimlik ve niyeti açıklığa kavuşturabilir fakat zayıf sinyal, yanlış gemi, dil ve son anda yapılan COLREG'e aykırı anlaşma riski taşır. 'Green-to-green' gibi ifadeler gerçek bearing/aspect ve uygulanacak kural teyit edilmeden güvenli plan değildir. VHF anlaşması kuralların öngörülebilir manevra dilini bozuyorsa yeni tehlike yaratır.",
          "Near miss incelemesinde VDR audio, radar/AIS replay, ECDIS track, engine/steering order ve standing orders zaman çizelgesinde birleştirilir. Amaç yalnız kimin give-way olduğunu bulmak değil; gözcülük, risk tespiti, çağrı eşiği ve bridge team challenge'ın neden çalışmadığını anlamaktır.",
        ],
        ["COLREG Rule 37", "COLREG Annex IV", "SOLAS V/VDR requirements"],
        "VHF kullanılırken karşı gemi radar bearing/range ile kesin tanımlanmalı; konuşma, Rule 8'e uygun erken ve belirgin manevrayı geciktirmemelidir.",
        ["AIS adını doğru duymayı hedef kimliğinin kesin kanıtı saymak", "VHF mutabakatını log/VDR dışında ayrı bir gerçeklik gibi görmek"],
        scenario(
          "VHF'de COLREG'e aykırı geçiş mutabakatı",
          "Give-way gemi son anda diğerine iskele-iskele geçiş önerir; bridge team hangi hedefle konuşulduğundan tam emin değildir.",
          "Belirsiz kimlik ve geç manevra, standart beklentiyi bozar. VHF konuşması Rule 7-8 değerlendirmesinin yerine geçemez.",
          "Hedef kesin tanımlanmadan mutabakata güvenilmez; sürat azaltılır, kaptan çağrılır ve mümkün olan en erken anda COLREG'e uygun, belirgin ve bütün trafik resmiyle güvenli manevra uygulanır.",
        ),
      ),
    ],
    ["İşaret, niyetin yerine değil görünürlüğüne hizmet eder.", "VHF yardımcı araçtır; COLREG sorumluluğunu devretmez.", "Vaka analizi karar zincirinin ne zaman bozulduğunu bulmalıdır."],
  ),
];

const marpolNarrative: RegulationNarrativeChapter[] = [
  chapter(
    "marpol-hukuki-mimari",
    "MARPOL'un hukukî mimarisi, altı teknik ek ve kontrol mantığı",
    "MARPOL kirlilik olayını yalnız denize atılan madde olarak görmez; tasarım, ekipman, operasyon, kayıt, reception facility, acil bildirim ve enerji performansını tek bir önleme rejiminde birleştirir.",
    [
      section(
        "Sözleşme, 1978/1997 protokolleri ve Ek I-VI",
        [
          "MARPOL 73/78; 1973 Sözleşmesi ile 1978 Protokolünün birleşik yapısıdır, 1997 Protokolü Annex VI'yı eklemiştir. Annex I oil, Annex II noxious liquid substances in bulk, Annex III harmful substances in packaged form, Annex IV sewage, Annex V garbage ve Annex VI air pollution/energy efficiency konularını düzenler. Her ekin kendi kapsamı, sertifikası, kayıt kitabı, deşarj koşulu ve istisnası vardır.",
          "Bir operasyon birden fazla eki tetikleyebilir. Tanker tank yıkaması Annex I/II, kullanılan cleaning agent Annex V, incineration Annex VI ve ortaya çıkan paketli atık Annex III/IMDG bağlantısı doğurabilir. Doğru karar için madde türü kadar taşıma biçimi, gemi tipi, tank/hat, konum ve operasyon amacı belirlenir.",
          "Taraf devletlerin kabul durumu annex bazında farklı olabilir; fakat no more favourable treatment ilkesi uluslararası ticarette taraf olmayan geminin daha avantajlı muamele görmesini engeller. Bayrak uygulaması, liman devleti ve yerel çevre kuralları MARPOL tabanından daha sıkı şart getirebilir.",
        ],
        ["MARPOL Articles", "MARPOL Protocols of 1978 and 1997", "MARPOL Annexes I-VI"],
        "Gemi çevre matrisi atık/emisyon akışını, ilgili annex'i, ekipmanı, tankı, record book kodunu, izin verilen nihai yolu ve sorumluyu göstermelidir.",
        ["Bütün atıkları Annex V altında değerlendirmek", "MARPOL asgarisini yerel liman kuralının üstünde görmek"],
      ),
      section(
        "Special Area, Emission Control Area ve deşarj karar ağacı",
        [
          "Special Area, belirli annex kapsamında oşinografik/ekolojik özellik ve trafik nedeniyle daha sıkı zorunlu yöntemlerin uygulandığı deniz alanıdır. Bir alan Annex I için special area iken başka annex için aynı statü veya yürürlük tarihinde olmayabilir. Annex VI'daki ECA ise SOx/particulate matter ve/veya NOx için ayrı emisyon sınırları getirir.",
          "Bir deşarj kararı en az altı soruyu yanıtlar: madde hangi annex/kategoride, gemi ve ekipman hangi statüde, gemi en route mu, konum/nearest land ve special area durumu ne, arıtma/parçalama/izleme şartı sağlandı mı ve daha sıkı bayrak/liman/şirket yasağı var mı? Tek bir mesafe sayısı bu ağacın yerini tutmaz.",
          "Chart plotter veya GPS konumu kararın girdisidir; special area sınırı, baseline/nearest land tanımı ve yerel no-discharge zone ayrıca doğrulanır. Karar öncesi ve sonrası konum, zaman, miktar, kategori ve ekipman durumu ilgili record book/log'da tutarlı olmalıdır.",
        ],
        ["MARPOL Annex I, II, IV, V special-area provisions", "MARPOL Annex VI ECAs", "IMO special areas status information"],
        "Köprüüstü ve ilgili departman deşarj öncesi ortak permit/checklist kullanmalı; yalnız departman içi ezbere bırakmamalıdır.",
        ["Special area haritasını tüm annexler için aynı kabul etmek", "Nearest land mesafesini tek koşul sanmak"],
        scenario(
          "Sınır yakınında çöp deşarjı",
          "Gemi special area sınırına yakın seyrederken ECDIS'teki ölçüme dayanarak food waste deşarjına hazırlanır; parçalama sistemi arızalıdır.",
          "Alan statüsü, nearest land, food waste'in comminuted olup olmadığı, en-route koşulu ve şirket politikası birlikte değerlendirilmeden yalnız mesafe kararı verilemez.",
          "Deşarj durdurulur; güncel resmi sınır ve bütün Annex V koşulları doğrulanır. Şartların tamamı kanıtlanamıyorsa atık gemide tutulur ve reception facility'ye teslim edilir.",
        ),
      ),
      section(
        "Sörvey, sertifika, kayıt kitabı ve PSC çapraz kontrolü",
        [
          "IOPP, NLS, ISPP, IAPP, IEE ve ilgili certificate/supplementler gemi ile annex'e göre tasarım ve sörvey uygunluğunu gösterir. Sertifika eki; onaylı tank, equipment veya yöntemi ayrıntılandırabilir. Sertifika geçerli olsa da equipment bypass, yanlış valve line-up veya gerçek dışı record book kaydı detainable risk yaratabilir.",
          "Record book kayıtları olaydan sonra yazılmış bir hikâye değil, operasyonun eş zamanlı hukukî izidir. Miktar, tarih-saat, konum, tank, kategori/kod, yöntem ve sorumlu imza; sounding log, flowmeter, alarm printout, noon report, bunker hesabı ve shore receipt ile matematiksel/fiziksel olarak uzlaşmalıdır.",
          "Düzeltme yöntemi defter talimatına göre şeffaf olmalıdır; silme, kapatma sıvısı veya geçmiş sayfayı yeniden yazma şüphe yaratır. Hata fark edildiğinde açıklayıcı düzeltme, sorumlu imza ve gerekiyorsa kaptan/şirket incelemesi kayıt bütünlüğünü korur.",
        ],
        ["MARPOL survey and certification provisions", "IMO Procedures for Port State Control", "Applicable record book guidance"],
        "Aylık çevre doğrulaması bir rastgele operasyonu tanktan nihai bertarafa kadar bütün bağımsız kayıtlarla uzlaştırmalıdır.",
        ["Record book'u operasyon bitiminden günler sonra toplu doldurmak", "Shore receipt miktarını kontrol etmeden deftere aynen geçirmek"],
      ),
    ],
    ["Önce doğru annex ve madde kategorisi belirlenir.", "Special area ve ECA annex bazında okunur.", "Kayıt, fiziksel akışla matematiksel olarak uzlaşmalıdır."],
  ),
  chapter(
    "marpol-annex-i",
    "Annex I: petrol kirliliğinin önlenmesi",
    "Annex I makine dairesi kaynaklı oily waste akışını ve tanker cargo area operasyonlarını farklı ama birbirine bağlı kontrol sistemleriyle düzenler.",
    [
      section(
        "Makine dairesi: bilge, sludge, 15 ppm sistemi ve ORB Part I",
        [
          "Oily bilge water; sızıntı, drenaj ve temizlikten doğar, sludge ise purifier, fuel/oil treatment ve waste oil süreçlerinde yoğunlaşır. Tank isimleri, kapasiteleri ve boru devresi IOPP Supplement ve onaylı planla eşleşmelidir. Bilgeyi sludge tankına veya tersine aktarmak kayıt kodu ve bertaraf seçeneğini değiştirir.",
          "Oil filtering equipment, uygulanabilir gemilerde deşarjı 15 ppm standardı, alarm ve automatic stopping arrangement ile kontrol eder. Emniyetli işletim; doğru suction/overboard valve line-up, temiz sample line, kalibre alarm, mühür/bypass bütünlüğü ve gerçek throughput takibidir. Fresh water ile yalnız alarmı test etmek, oily water ayırma performansını tek başına kanıtlamaz.",
          "ORB Part I; ballasting/cleaning of fuel tanks, oily residue collection/disposal, non-automatic ve automatic bilge discharge/transfer gibi operasyonları kodlarıyla kaydeder. Tank bakiyesi negatif olamaz; oluşan sludge miktarı yakıt tüketimi ve purifier performansıyla makul ilişki göstermelidir. Incineration, boiler burning veya shore delivery her biri kendi destekleyici kanıtını gerektirir.",
        ],
        ["MARPOL Annex I Regulations 12-17", "IOPP Certificate and Supplement", "Oil Record Book Part I"],
        "Başmühendis aylık tank balance yapmalı; ORB, sounding, incinerator hours ve reception receipts arasındaki farkı açıklamalıdır.",
        ["15 ppm alarmını yalnız test düğmesiyle doğrulamak", "Sludge tank kapasitesini aşan kâğıt bakiye oluşturmak", "Yetkisiz flexible hose/bypass bulundurmak"],
        scenario(
          "Sludge tank kâğıt üzerinde dolu, gerçekte boş",
          "ORB toplamına göre sludge tankta 18 m³ olmalıdır; sounding 4 m³ gösterir ve teslim fişi bulunmaz.",
          "Bu fark ölçüm hatası, eksik kayıt veya yasa dışı bertaraf olasılığıdır. Sonradan yaklaşık bir kayıt eklemek bütünlüğü daha da bozar.",
          "Operasyon durumu korunur, kaptan/şirket bilgilendirilir; sounding calibration, transfer/incineration/receipt ve loglar incelenir, gerçek neden belgelenir ve gerekli otorite bildirimi hukukî danışmanlıkla yapılır.",
        ),
      ),
      section(
        "Tanker cargo area: slop, ODME, COW, segregated ballast ve ORB Part II",
        [
          "Oil tanker'larda cargo tank ballast, tank cleaning, slop management, dirty ballast ve cargo residue deşarjı özel tasarım/operasyon hükümlerine tabidir. ODME, deşarj oranı ve toplam miktarı konum/sürat bilgisiyle izleyip limit aşımında kontrol sağlar. Cihazın sertifikalı olması doğru oil content meter, flow input ve overboard valve action olmadan yeterli değildir.",
          "Crude Oil Washing, uygulanabilir tankerlerde onaylı COW Operations and Equipment Manual, inert gas koşulları, washing program ve sorumlu personel yeterliğiyle yürütülür. Yanlış tank sırası veya yetersiz inert atmosphere, kirlilik riskini yangın/patlama riskiyle birleştirir.",
          "ORB Part II cargo loading/unloading, internal transfer, tank cleaning, ballast, slop ve deşarj işlemlerini kaydeder. Cargo figures, ullage report, terminal statement, ODME printout ve slop sounding aynı zaman çizelgesinde uzlaştırılmalıdır. Charter/terminal miktar farkı, MARPOL kaydını gerçeğe aykırı biçimde değiştirme gerekçesi değildir.",
        ],
        ["MARPOL Annex I tanker provisions", "ODME requirements", "COW requirements", "Oil Record Book Part II"],
        "Baş zabit cargo planında her residue/ballast akışının kaynak-hedef tankını ve ilgili ORB Part II kodunu operasyon öncesi işaretlemelidir.",
        ["ODME printout'u gözden geçirmeden dosyalamak", "Slop miktarını cargo outturn'a uydurmak"],
      ),
      section(
        "SOPEP/SMPEP ve oil pollution emergency response",
        [
          "SOPEP; petrol kirliliği olayı veya tehdidinde bildirim, gemi içi kontrol, kıyı temasları ve ulusal/yerel koordinasyonu gemiye özgü düzenler. Annex II kapsamıyla birleşik plan uygun olduğunda SMPEP biçimi kullanılabilir. Plan, kıyı temas ekleri güncel değilse acil durumda hız kazandırmaz.",
          "İlk öncelik insan ve gemi emniyetidir; kaynağı durdurma, tank transferi, scupper/containment, overboard valve kontrolü ve güvenli deck response eş zamanlı planlanır. Dispersant veya kimyasal kullanımına gemi kendi başına karar veremez; yetkili kıyı onayı ve çevresel koşullar gerekir.",
          "Bildirimde tahminî miktar belirsiz olabilir; bu ilk bildirimi geciktirme nedeni değildir. Konum, zaman, madde, olay, hava/deniz, alınan tedbir ve yardım ihtiyacı verilir, doğrulandıkça güncellenir. Fotoğraf, sample, log ve VDR/CCTV gibi kanıtlar güvenli biçimde korunur.",
        ],
        ["MARPOL Annex I/37", "MARPOL Protocol I reporting", "SOPEP/SMPEP guidelines"],
        "Tatbikat yalnız boom sermek değil; gerçek kıyı iletişim listesini test etmeden simüle eden bildirim ve karar yetkisini de sınamalıdır.",
        ["Kesin miktarı bekleyip ilk bildirimi geciktirmek", "SOPEP içindeki eski telefon listesini geçerli saymak"],
      ),
    ],
    ["Machinery-space ve tanker kayıt rejimleri ayrıdır.", "15 ppm/ODME cihazı boru hattı ve kayıtla birlikte doğrulanır.", "İlk kirlilik bildirimi erken yapılır, veri sonradan güncellenir."],
  ),
  chapter(
    "marpol-annex-ii",
    "Annex II: dökme zararlı sıvı maddeler",
    "Annex II, ürünün deniz çevresine tehlikesini geminin tank/stripping kabiliyeti ve liman reception düzeniyle bağlar; ürün adı doğru belirlenmeden deşarj kararı verilemez.",
    [
      section(
        "X, Y, Z ve Other Substances kategorileri",
        [
          "Noxious Liquid Substances; Category X, Y, Z veya Other Substances olarak sınıflandırılır. X en ciddi deniz kaynağı/insan sağlığı tehlikesi nedeniyle en sıkı kontrolü, Y ve Z azalan fakat gerçek tehlike düzeylerini temsil eder. OS, Annex II açısından bu kategorilerin dışında olsa da başka MARPOL, SOLAS veya yerel yükümlülüklerden muaf değildir.",
          "Doğru product name ve pollution category; IBC Code product list, MEPC circular/list ve Certificate of Fitness üzerinden doğrulanır. Trade name veya SDS tek başına authoritative carriage name değildir. Karışımın kompozisyonu değişirse kategori ve taşıma şartı yeniden değerlendirilir.",
          "Prewash, stripping, ventilation veya reception facility zorunluluğu; kategori yanında high-viscosity/solidifying özellik, unloading port, special area ve onaylı procedure'a bağlıdır. Genel bir '12 mil dışında bas' yaklaşımı Annex II karar ağacını yanlış basitleştirir.",
        ],
        ["MARPOL Annex II Regulations 6 and 13", "IBC Code Chapter 17", "MEPC product lists"],
        "Cargo plan her ürün için pollution category, tank, stripping limit, prewash/reception ve discharge yöntemi sütunlarını içermelidir.",
        ["Trade name ile kategori seçmek", "OS ürününü hiçbir çevre kuralına tabi değil sanmak"],
      ),
      section(
        "Procedures and Arrangements Manual, stripping ve Cargo Record Book",
        [
          "Onaylı Procedures and Arrangements Manual, geminin tank/boru geometrisine göre unloading, stripping, tank washing, residue transfer ve discharge yöntemini tanımlar. Genel Annex II özeti yerine bu gemiye özgü manual sahadaki valve line-up ve sequence için esas belgedir.",
          "Efficient stripping, tankta kalan residue'yu onaylı performans sınırına indirmeyi amaçlar. Stripping sonucu; pump/line kondisyonu, trim/list, sıcaklık/viskozite ve doğru terminal back-pressure ile etkilenebilir. Kâğıt üzerinde sequence tamamlanmış olsa da high-level residue veya line content varsa prewash/reception kararı değişir.",
          "Cargo Record Book; loading, internal transfer, unloading, prewash, tank cleaning, residue discharge ve accidental discharge gibi işlemleri tank ve ürün bazında kaydeder. Terminal prewash receipt, cargo figures, tank washing log ve slop/reception amount ile uzlaşma sağlanmalıdır.",
        ],
        ["MARPOL Annex II", "Approved P&A Manual", "Cargo Record Book"],
        "Baş zabit operasyon öncesi P&A Manual'daki gerçek tank/line sequence'i ekip ve terminalle toolbox briefing'de yürütmelidir.",
        ["Önceki ürünün checklist'ini yeni ürüne kopyalamak", "Stripping performansını yalnız pompa çalıştı kaydıyla kanıtlamak"],
        scenario(
          "Yüksek viskoziteli Category Y residue",
          "Tahliye sonrası tankta beklenenden fazla ürün kalır; terminal prewash kabul etmek istemez ve geminin denizde yıkamasını önerir.",
          "Kategori, ürün özelliği, liman/reception ve P&A Manual şartları tamamlanmadan deniz deşarjı kararı verilemez. Ticari ret hukukî zorunluluğu kaldırmaz.",
          "Operasyon durdurulur; bayrak/liman/şirket ve terminalle uygun reception/prewash çözümü kurulup belgelenir. Tank/line miktarı ve tüm iletişim Cargo Record Book destek kayıtlarında korunur.",
        ),
      ),
    ],
    ["Ürün adı ve pollution category kararın başlangıcıdır.", "P&A Manual gemiye özgü operasyon sırasını belirler.", "Terminal kısıtı Annex II zorunluluğunu ortadan kaldırmaz."],
  ),
  chapter(
    "marpol-annex-iii",
    "Annex III: paketli zararlı maddeler ve IMDG bağlantısı",
    "Annex III deniz kirletici maddeleri package, freight container, portable tank veya road/rail tank wagon gibi paketli taşıma biçimlerinde, IMDG Code'un ayrıntılı sistemiyle kontrol eder.",
    [
      section(
        "Marine pollutant sınıflandırması, paketleme ve dokümantasyon",
        [
          "Bir maddenin harmful substance sayılması IMDG Code'daki marine pollutant kriter ve listeleriyle belirlenir. UN number, proper shipping name, class/subsidiary risk, packing group ve marine pollutant status birlikte beyan edilir. SDS yararlı destek belgesidir; imzalı dangerous goods transport document'ın yerine geçmez.",
          "Package tipi, test/UN approval mark, quantity limit, closure ve kondisyon ürüne uygun olmalıdır. Marine pollutant mark, class label, UN number ve cargo transport unit placardları dışarıdan doğru tehlike iletişimi sağlar. Solmuş veya yanlış yüzeye konmuş işaret, acil ekip için bilgiyi görünmez kılar.",
          "Dokümanda paket sayısı/tipi, toplam miktar ve doğru shipping description bulunur; shipper declaration ve container/vehicle packing certificate süreçteki sorumluluğu belgeler. Manifest/stowage plan, tehlikeli maddelerin gemideki yerini acil durumda erişilebilir biçimde gösterir.",
        ],
        ["MARPOL Annex III", "IMDG Code Parts 2, 4, 5"],
        "Yük kabulünde belge, dış paket işareti ve planlanan stow position aynı örnek üzerinde kontrol edilmelidir.",
        ["Marine pollutant mark'ı primary hazard label sanmak", "SDS ile eksik shipper declaration'ı kapatmak"],
      ),
      section(
        "Stowage, segregation, kayıp/hasar ve acil müdahale",
        [
          "IMDG stowage category, segregation group ve away-from/separated-from gibi hükümler; reaksiyon, yangın ve toksik maruziyetin büyümesini sınırlar. Foodstuffs, accommodation, heat source ve ignition source ilişkileri ayrıca kontrol edilir. Container plan yazılımı uyarı vermese bile güncel IMDG edition ve gemi Document of Compliance kapsamı doğrulanır.",
          "Hasarlı/leaking package'da ilk hedef personel ve gemi emniyetidir. EmS, MFAG, SDS ve şirket emergency plan'a göre alan izole edilir, uygun PPE/monitoring kullanılır ve overboard yayılım önlenir. Repacking veya jettison yalnız yetki ve zorunluluk şartlarıyla değerlendirilir; olay ve lost package uygun kanallara raporlanır.",
        ],
        ["MARPOL Annex III", "IMDG Code Parts 7 and Supplement", "EmS Guide", "MFAG"],
        "Dangerous goods manifest, köprüüstü ve acil ekiplerin gemi terk edilmeden erişebileceği kontrollü düzenle hazır olmalıdır.",
        ["Yazılımın kabulünü hukukî uygunluk onayı saymak", "Dökülen ürünü yıkayarak scupper'a yönlendirmek"],
        scenario(
          "Marine pollutant konteynerinde sızıntı",
          "Güverte turunda konteyner kapısından sıvı geldiği görülür; manifestte ürün class 8 ve marine pollutant olarak kayıtlıdır.",
          "Yaklaşma, bilinmeyen buhar/reaksiyon ve denize yayılma riski taşır. Su ile yıkama çevresel olayı büyütebilir.",
          "Alarm/alan izolasyonu, EmS/MFAG ve uzman desteğiyle PPE-monitoring seçimi yapılır; scupper korunur, sızıntı güvenli biçimde contain edilir ve kaptan/şirket/kıyı bildirimleri başlatılır.",
        ),
      ),
    ],
    ["Annex III ayrıntılarını IMDG Code operasyonelleştirir.", "Belge, paket ve stow position aynı yükü göstermelidir.", "Sızıntıda personel güvenliği ile denize yayılım birlikte kontrol edilir."],
  ),
  chapter(
    "marpol-annex-iv",
    "Annex IV: pis su sistemleri ve kontrollü deşarj",
    "Annex IV, sewage'ı onaylı arıtma tesisi, comminuting/disinfecting system veya holding tank seçenekleriyle yönetir; sistem seçimi deşarj koşulunu ve gemideki kayıt/operasyonu değiştirir.",
    [
      section(
        "Sewage tanımı, sertifika ve sistem bütünlüğü",
        [
          "Sewage; toilet/urinal drenajı, medical premises drenajı, canlı hayvan mahalli drenajı ve bunlarla karışmış diğer atık suları kapsar. Galley grey water tek başına Annex IV sewage olmayabilir; ancak sewage ile karıştığında aynı rejime girer ve yerel kurallar grey water için ayrıca daha sıkı sınırlama getirebilir.",
          "ISPP Certificate, onaylı sewage treatment plant, comminuter/disinfector veya holding tank düzenini gösterir. Treatment plant performansı doğru aeration, biomass/chemical condition, blower/pump, alarm ve üretici operating envelope'a bağlıdır. Bypass valve, overflow hattı veya yanlış chemical dozajı sertifikalı sistemi etkisizleştirir.",
          "Holding tank kapasitesi kişi sayısı, sefer süresi ve gerçek üretimle planlanır. Tank dolmadan önce reception facility veya yasal deşarj fırsatı bulunmalıdır. High-level alarmı susturmak operasyon planının yerini tutmaz.",
        ],
        ["MARPOL Annex IV Regulations 1, 4, 9", "ISPP Certificate", "Approved treatment plant standards"],
        "Başmühendis sewage flow'u, tank seviyesini ve plant kondisyonunu sefer planıyla; kaptan deşarj konum/izin koşuluyla birlikte izlemelidir.",
        ["Grey water ve sewage hatlarını çizimden doğrulamamak", "Treatment plant blower çalışıyorsa effluent'in uygun olduğunu varsaymak"],
      ),
      section(
        "Deşarj seçenekleri: arıtılmış, parçalanmış/dezenfekte ve işlenmemiş sewage",
        [
          "Onaylı sewage treatment plant uygun şekilde çalışırken deşarj, plant'ın performans standardı ve Annex IV koşullarıyla yapılır; çevrede görünür yüzen katı veya renk değişimi yaratmamalıdır. Arıtma sistemi by-pass'taysa bu seçenek kullanılamaz.",
          "Comminuted ve disinfected sewage, onaylı sistem kullanılarak nearest land'den 3 deniz milinden daha uzakta; comminuted/disinfected olmayan sewage ise genel olarak 12 deniz milinden daha uzakta, gemi en route iken ve İdarenin onayladığı uygun deşarj oranıyla boşaltılabilir. Tank içeriğini bir anda basmak veya gemi dururken deşarj etmek koşulu karşılamaz.",
          "Passenger ships için belirli special area hükümleri ve yerel no-discharge/reception kuralları ayrıca uygulanabilir. Deşarj kararı sırasında gemi tipi, treatment status, konum, hız/en-route durumu, tank kaynağı ve liman talimatı birlikte kaydedilmelidir.",
        ],
        ["MARPOL Annex IV Regulation 11", "Applicable special-area provisions", "Local discharge restrictions"],
        "Sewage discharge checklist, plant valve line-up ve alarm durumunu köprüüstü konum/sürat teyidiyle iki departmanlı izin haline getirmelidir.",
        ["3/12 mil sayılarını tek koşul olarak ezberlemek", "Treatment plant arızasını loglamadan bypass yapmak"],
        scenario(
          "Holding tank taşma riski",
          "Liman çıkışından kısa süre sonra holding tank high-high alarma gelir; gemi henüz 12 deniz mili dışında değildir.",
          "Taşma riski ciddi olsa da bu durum planlanmamış yasa dışı deşarjı otomatik meşrulaştırmaz. Arızanın nedeni ve güvenli seçenekler hızla değerlendirilir.",
          "Üretim azaltılır, treatment/reception/transfer seçenekleri ve rotada güvenli çözüm araştırılır; kaptan/şirket ve gerekiyorsa kıyı otoritesi bilgilendirilir. Acil deşarj gerçekten can/gemi emniyeti için zorunlu hale gelirse istisna koşulları ve tüm karar kanıtları ayrıntılı kaydedilir.",
        ),
      ),
    ],
    ["Sewage'ın kaynağı ve karışımı doğru tanımlanır.", "Sistem sertifikası gerçek işletme kondisyonuyla desteklenir.", "Mesafe, en-route ve arıtma şartları birlikte uygulanır."],
  ),
  chapter(
    "marpol-annex-v",
    "Annex V: çöp kategorileri, yasaklar ve kayıt bütünlüğü",
    "Annex V'nin varsayılan yaklaşımı çöpün denizde değil gemide ayrıştırılıp azaltılması ve kıyı kabul tesisine verilmesidir; sınırlı deşarj istisnaları kategori ve koşula bağlıdır.",
    [
      section(
        "Garbage tanımı, kategoriler ve plastik yasağı",
        [
          "Garbage; domestic waste, operational waste, food waste, plastics, cargo residues, incinerator ashes, cooking oil, fishing gear ve animal carcasses gibi kategorileri kapsar. Her kategori aynı deşarj seçeneğine sahip değildir. E-waste veya maintenance waste içindeki tehlikeli madde başka ulusal/uluslararası atık kurallarını da tetikleyebilir.",
          "Plastiklerin, synthetic ropes/nets, plastic garbage bags ve plastic içeren incinerator ash dahil denize deşarjı yasaktır. 'Biodegradable' etiketi, ürünün Annex V altında plastik olmadığı veya denize atılabileceği sonucunu otomatik vermez; kompozisyon ve yetkili rehber doğrulanır.",
          "Food waste, cargo residue, cleaning agent/additive ve animal carcass için mesafe, parçalama, special area, HME status ve en-route koşulları farklıdır. Mixed garbage, bileşenlerden hangisi daha sıkıysa onun şartına tabi olur. Çöpü öğütmek kategorisini veya plastik yasağını değiştirmez.",
        ],
        ["MARPOL Annex V Regulations 1, 3-6", "2017 Guidelines for implementation of MARPOL Annex V, as amended"],
        "Çöp istasyonunda kategori renkleri GMP/GRB kodlarıyla aynı olmalı; mixed-waste oluştuğunda daha sıkı kategori açıkça uygulanmalıdır.",
        ["Biodegradable plastiği denize atılabilir sanmak", "Comminuter kullanınca bütün food packaging'i food waste saymak"],
      ),
      section(
        "GMP, placard, Garbage Record Book ve reception facility",
        [
          "Garbage Management Plan toplama, separation, processing, storage, discharge ve reception sürecini; sorumlu kişileri ve gemideki ekipmanı açıklar. Placardlar mürettebat ve yolcuya uygulanabilir yasakları anlaşılır dilde gösterir. Plan geminin gerçek compactor, grinder, incinerator ve storage düzeniyle uyumlu olmalıdır.",
          "Garbage Record Book; denize deşarj, reception facility teslimi, incineration, accidental loss/discharge ve fishing gear kaybı gibi olayları kategori, miktar, zaman ve konumla kaydeder. Hacim tahmini yöntemi tutarlı olmalı; receipt, storage inventory ve incinerator log ile makul denge kurulmalıdır.",
          "Port reception facility yetersizse bu durum, rastgele deniz deşarj izni vermez. Eksiklik kaptan/şirket üzerinden uygun IMO/liman bildirim mekanizmasına taşınır; gemi depolama kapasitesi ve sonraki uygun liman planı güncellenir. Atık yüklenicisinin lisans ve teslim zinciri yerel kurala göre doğrulanır.",
        ],
        ["MARPOL Annex V Regulations 8 and 10", "Garbage Record Book", "Port reception facility reporting guidance"],
        "Baş zabit/çevre zabiti weekly garbage balance ile oluşum, depolama, incineration ve receipt miktarını kategori bazında izlemelidir.",
        ["Teslim fişindeki toplam miktarı kategori ayrımı olmadan GRB'ye geçirmek", "Reception facility reddini kaydetmeden atığı güvertede güvensiz depolamak"],
        scenario(
          "Cargo residue HME belirsiz",
          "Tahliye sonrası hold wash water planlanır; shipper cargo residue'nin harmful to the marine environment olmadığını belgeleyemez.",
          "HME status bilinmeden Annex V deşarj istisnası varsayılamaz. Cleaning agent ve special area durumu da ayrıca belirlenmelidir.",
          "Denize deşarj yapılmaz; shipper declaration ve ürün kriteri doğrulanır. Uygunluk kanıtlanamazsa residue/wash water gemide tutulur veya reception facility'ye verilir ve GRB'ye doğru kategoriyle kaydedilir.",
        ),
      ),
    ],
    ["Karışık çöp daha sıkı bileşenin rejimine girer.", "Plastik yasağı öğütme veya biodegradable iddiasıyla kalkmaz.", "GRB miktarı fiziksel depolama ve receipt ile uzlaşır."],
  ),
  chapter(
    "marpol-annex-vi",
    "Annex VI: hava kirliliği, yakıt uygunluğu ve enerji verimliliği",
    "Annex VI, baca emisyonlarından ozon tabakasını incelten maddelere, yakıt kalite zincirinden geminin karbon yoğunluğuna kadar teknik ve operasyonel kontrolleri bir araya getirir.",
    [
      section(
        "SOx/PM, fuel oil quality, BDN ve numune zinciri",
        [
          "SOx ve particulate matter kontrolü yakıtın sulphur content'i veya onaylı equivalent arrangement üzerinden sağlanır. Global limit ile ECA limiti farklıdır; gemi konum, kullanılan tank ve sistem hacmine göre change-over'ı ECA sınırından önce tamamlamalıdır. Exhaust gas cleaning system kullanılıyorsa approval, monitoring, washwater/residue ve malfunction prosedürleri uygulanır.",
          "Bunker Delivery Note teslim edilen yakıtın zorunlu bilgilerini ve tedarikçi beyanını taşır; representative MARPOL delivered sample mühür, etiket, imza ve saklama zinciriyle korunur. Onboard sample ve in-use sample farklı doğrulama amaçlarına hizmet eder. Sample seal numarası BDN ve gemi kayıtlarıyla eşleşmelidir.",
          "Off-spec şüphesi yalnız laboratuvar yüzdesi değildir. Tank segregation, supplier notification, flag/port report, Fuel Oil Non-Availability Report şartları ve güvenli fuel management değerlendirilir. FONAR otomatik muafiyet sağlamaz; geminin uygun yakıt elde etmek için yaptığı makul girişimleri belgeler.",
        ],
        ["MARPOL Annex VI Regulations 14 and 18", "Appendix V BDN information", "Fuel oil sampling guidelines"],
        "Bunker checklist, BDN/sample seal/tank tahsisi ve ECA change-over hesabını tek izlenebilir dosyada bağlamalıdır.",
        ["BDN uygun olduğu için kullanılan tankı doğrulamamak", "FONAR'ı düşük sülfür sınırından genel muafiyet sanmak"],
        scenario(
          "ECA sınırında change-over gecikmesi",
          "Beklenenden güçlü akıntı gemiyi ECA sınırına erken getirir; sistemde hâlâ yüksek sülfürlü yakıt vardır.",
          "Valfi sınırda çevirmek, service system içeriğinin zamanında uygun olduğu anlamına gelmez. Planlama hesabı gerçek speed/flow ile güncellenmeliydi.",
          "Emniyetli navigasyon korunarak change-over en kısa güvenli sürede tamamlanır, kaptan/şirket ve gerekli otoriteler bilgilendirilir; zaman/konum/tank/miktar ve neden şeffaf kaydedilir, planlama prosedürü düzeltilir.",
        ),
      ),
      section(
        "NOx, ODS, VOC ve shipboard incineration",
        [
          "Marine diesel engine NOx uygunluğu; engine'in yapım/major conversion durumu, rated power/speed, applicable Tier, EIAPP Certificate ve approved Technical File'a bağlıdır. Parametre kontrol yöntemi kullanılıyorsa component/setting/seal kayıtları korunur; yetkisiz turbocharger, injector veya timing değişikliği sertifika uygunluğunu bozabilir.",
          "Ozone-depleting substances içeren sistemler için deliberate emission yasağı, equipment/ODS Record Book, recharge/servicing ve shore disposal zinciri yönetilir. Yeni kurulum yasakları ve istisnalar madde/ekipman tarihine göre doğrulanır. Refrigerant kaçağı yalnız maintenance konusu değil, MARPOL kaydı ve emisyon olayıdır.",
          "VOC tanker gereklilikleri port designation ve onaylı VOC Management Plan'la; shipboard incineration ise onaylı incinerator, yasaklı maddeler, operating temperature ve kayıtlarla yönetilir. PVC veya belirli kimyasal/contaminated packaging gibi atıkların uygunsuz yakılması toksik emisyon ve kül yönetimi sorunu yaratabilir.",
        ],
        ["MARPOL Annex VI Regulations 12, 13, 15 and 16", "NOx Technical Code 2008"],
        "Başmühendis, critical engine components ile Technical File allowable components/settings listesini yedek parça kabulünde karşılaştırmalıdır.",
        ["EIAPP varsa her motor modifikasyonunu uygun saymak", "Refrigerant eklemeyi leak repair olmadan normal tüketim görmek"],
      ),
      section(
        "EEDI/EEXI, CII, SEEMP ve IMO DCS veri bütünlüğü",
        [
          "EEDI yeni gemi tasarım verimliliğini, EEXI mevcut geminin teknik verimlilik seviyesini; CII ise yıllık operasyonel karbon yoğunluğunu ölçen farklı araçlardır. Attained/required değerler ve gemi kapsamı ayrı doğrulanır. EEXI uyumu engine power limitation gibi onaylı teknik düzen içerebilir; override kullanımı yalnız tanımlı emniyet koşulu ve kayıtla yapılır.",
          "SEEMP Part I operasyonel iyileştirme planını, Part II fuel oil consumption data collection yöntemini, Part III ise CII implementation planı ve gerekli corrective action yaklaşımını içerir. CII rating A-E yıllık performansı gösterir; zayıf rating, tek seferlik hız düşürme yerine rota, bekleme, hull/propeller, weather routing, trim ve ticari planlama kök nedenleriyle yönetilir.",
          "IMO DCS/CII verisi noon report, bunker delivery, tank sounding, flowmeter, distance/time ve cargo capacity girdilerinden oluşur. Manual correction, sensor gap, off-hire veya voyage boundary kuralları documented methodology ile işlenmelidir. Doğrulanmış rapor, ham verideki açıklanamayan değişikliğin otomatik olarak doğru olduğu anlamına gelmez.",
        ],
        ["MARPOL Annex VI Chapter 4", "SEEMP Guidelines", "IMO DCS and CII Guidelines"],
        "Gemi ve kıyı ekibi aylık fuel-distance-hour reconciliation yapmalı; yıl sonunda ortaya çıkan farkı geriye dönük tahminle kapatmamalıdır.",
        ["EEXI ile CII'yi aynı performans göstergesi sanmak", "CII için emniyetli sefer planı veya makine sınırını ihlal edecek baskı kurmak"],
      ),
    ],
    ["Yakıt uygunluğu belgeden tanka ve bacaya kadar izlenir.", "NOx uygunluğu engine konfigürasyonunun Technical File'a sadakatidir.", "Enerji verisi ham kaynaktan doğrulanmış rapora kadar denetlenebilir olmalıdır."],
  ),
  chapter(
    "marpol-olay-yonetimi",
    "Kirlilik olayı, istisnalar, bildirim ve çapraz-ek kanıt yönetimi",
    "MARPOL'un amacı kural dışı deşarjı kayıttan silmek değil; önlemek, olduğunda zararı sınırlandırmak, erken bildirmek ve olaydan sistem düzeyinde öğrenmektir.",
    [
      section(
        "İstisnalar dar yorumlanır: gemi/can emniyeti ve hasar halleri",
        [
          "Annexlerde can veya gemi emniyeti için zorunlu deşarj ve gemi/ekipman hasarı sonrası kirlilik için belirli istisnalar bulunabilir. Bunlar normal kapasite planlama hatasını veya bakım eksikliğini örtmez. Hasar sonrası istisnada zararı önlemek/azaltmak için tüm makul tedbirlerin alınması ve owner/master'ın kasıtlı ya da pervasız davranışının bulunmaması gibi koşullar önemlidir.",
          "Acil durumda önce hayat ve gemi emniyeti korunur, fakat çevre etkisi kararın parçası kalır. Neden başka seçenek olmadığı, hangi miktarın ne zaman ve nerede çıktığı, hangi azaltma tedbirinin uygulandığı ve kimlerin bilgilendirildiği contemporaneous log ile gösterilir.",
          "Bir sistemin tank kapasitesi düzenli olarak yetmiyorsa bu beklenmeyen acil durum değil, sefer/kapasite yönetimi kusurudur. Şirket; reception facility planı, waste generation rate ve equipment reliability üzerinden kök nedeni düzeltmelidir.",
        ],
        ["MARPOL Annex exception provisions", "MARPOL Protocol I"],
        "Acil deşarj karar formu, karar yetkisi ve raporlamayı hızlandırmalı; sonradan hukukî gerekçe üretmek için kullanılmamalıdır.",
        ["Her arızayı otomatik force majeure saymak", "Olay küçük diye kıyı bildirimini tamamen atlamak"],
      ),
      section(
        "Protocol I raporu ve ilk saatlerde kanıt koruma",
        [
          "MARPOL Protocol I, harmful substances içeren olayların gecikmeden en yakın kıyı devletine uygun kanallarla raporlanmasını destekler. İlk rapor kesin olmayan veriyi açıkça 'tahmin' olarak işaretleyebilir; esas olan erken uyarı ve doğrulandıkça follow-up raporudur.",
          "Olay yeri emniyetli hale getirildikten sonra logbook, record book, alarm/event log, valve position, tank sounding, sample, CCTV/VDR ve haberleşme kayıtları korunur. Personelin ayrı factual statement vermesi sağlanır; ortak hikâye oluşturma veya geçmiş kaydı değiştirme güvenilirliği bozar.",
          "Şirket emergency response, P&I/charter ve hukuk iletişimi operasyonel müdahaleyi destekler; kaptanın zorunlu kıyı bildirimini ticari onay bekleyerek geciktirmemelidir. Bayrak, coastal/port state ve diğer ilgili merciler olay türüne göre paralel bilgilendirilebilir.",
        ],
        ["MARPOL Protocol I", "IMO General Principles for Ship Reporting Systems and Reporting Requirements"],
        "SOPEP/SMPEP contact appendix her sefer bölgesi öncesi kontrol edilmeli; tatbikatta gerçek numaralar aranmayacaksa doğruluk başka bir güvenli yöntemle teyit edilmelidir.",
        ["İlk raporu yüzde yüz kesin veri gelene kadar bekletmek", "Olay sonrası record book sayfasını temiz kopya ile değiştirmek"],
      ),
      section(
        "2026 kayıp konteyner bildirimi ve MARPOL bağlantısı",
        [
          "1 Ocak 2026 SOLAS değişiklikleri denize düşen konteynerlerin raporlanmasını güçlendirmiştir. Ana hukukî dayanak SOLAS seyir emniyetidir; ancak kayıp konteynerde marine pollutant/dangerous goods, plastik ve ambalaj, yakıt/kimyasal sızıntısı gibi MARPOL etkileri bulunabilir. Bu nedenle SOLAS bildirimi çevresel olay değerlendirmesinin yerine geçmez.",
          "Manifest ve stow plan'dan UN number, marine pollutant status, paket sayısı ve yaklaşık konum hızla çıkarılır. İlk konteyner sayısı tahminî olabilir; survey/tally ve VDR/radar verisiyle güncellenir. Cargo securing failure, heavy weather routing ve lashing kondisyonu ISM corrective action sürecine girer.",
          "Kayıp önlenmesi; doğru VGM, stow/lashing calculation, Cargo Securing Manual, weather avoidance, deck inspection ve accelerometer/inclinometer trendlerinin birlikte yönetilmesini gerektirir. Olay raporu yalnız denize düşen kutu sayısını değil, bariyerlerin neden başarısız olduğunu açıklamalıdır.",
        ],
        ["SOLAS V amendments in force 1 January 2026", "MARPOL Annex III and V as applicable", "Cargo Securing Manual"],
        "Şirket acil durum planı, lost container verisini SOLAS navigation warning ve MARPOL pollution report akışlarına tek olay kimliğiyle dağıtmalıdır.",
        ["SOLAS raporu gönderildiği için MARPOL değerlendirmesini kapatmak", "Konteyner içeriği belirsizken çevresel tehlike yok varsaymak"],
        scenario(
          "Tehlikeli yük konteyneri kaybı",
          "Ağır havada üç konteyner kaybolur; birinin manifestte marine pollutant olduğu görülür, kesin son konum bilinmez.",
          "Olay hem floating navigation hazard hem muhtemel pollution incident'tır. Konum belirsizliği raporu geciktirmek yerine belirsizlik aralığıyla bildirilmelidir.",
          "Gemi/insan emniyeti sağlanır, çevredeki gemiler ve ilgili kıyı/bayrak kanalları uyarılır; dangerous goods ayrıntısı follow-up'a eklenir, bütün zaman/konum/kargo kanıtı korunur ve lashing/route kök nedeni incelenir.",
        ),
      ),
    ],
    ["İstisna, önlenebilir planlama kusurunun mazereti değildir.", "İlk rapor hızlı, sonraki raporlar giderek daha doğru olmalıdır.", "Bir olay SOLAS ve birden fazla MARPOL ekini aynı anda tetikleyebilir."],
  ),
  chapter(
    "marpol-uyum-denetim",
    "Gemide bütünleşik MARPOL yönetimi ve denetim vakaları",
    "Güçlü MARPOL uyumu, her record book'u ayrı dosyalamak yerine gemideki madde akışını kaynaktan nihai yola kadar kontrol eder.",
    [
      section(
        "Kaynak–tank–işlem–nihai yol–kayıt zinciri",
        [
          "Her atık/emisyon akışı beş düğümle incelenebilir: nerede oluştu, hangi tank/kapta tutuldu, hangi ekipmanla işlendi, nereye gitti ve hangi kayıt bunu kanıtlıyor? Oily bilge için bilge well–holding tank–OWS–overboard/reception–ORB; garbage için source station–storage–compactor/incinerator–shore/discharge–GRB zinciri kurulabilir.",
          "Mass-balance, yasa dışı bir yolu kanıtlamadan önce tutarsızlığı görünür kılar. Başlangıç/son tank miktarı, oluşum, transfer ve bertaraf aynı birim ve güvenilir ölçümle dengelenir. Density, tank table, unpumpable quantity ve ölçüm hatası açıklanabilir; açıklanamayan fark investigate edilir.",
          "Cross-annex kontrol, aynı olayın farklı kaydını karşılaştırır. Bunker miktarı BDN/ORB/fuel report ve Annex VI DCS'de; incinerated garbage GRB/incinerator log/fuel ve ash storage'da tutarlı olmalıdır. Bir sistemi 'çevre zabiti', diğerini 'makine' dosyası diye ayırmak ortak hatayı gizleyebilir.",
        ],
        ["MARPOL Annexes I-VI", "ISM Code records and non-conformity controls"],
        "Aylık environmental meeting her seferinde başka bir akış için mass-balance ve fiziksel walk-through yapmalıdır.",
        ["Bütün miktarları yuvarlayarak matematiksel denge görünümü vermek", "Departmanlar arası aynı verinin farklı birimini fark etmemek"],
      ),
      section(
        "PSC vaka yöntemi: kayıt doğru, sistem yanlış olduğunda",
        [
          "PSC önce sertifika/plan ve genel kondisyonu, sonra seçili operasyonun kayıt ve fiziksel izini inceler. Örneğin ORB'de düzenli OWS deşarjı varsa OWS totalizer/alarm history, sample line, valve line-up ve tank balance beklenir. GRB'de shore delivery varsa receipt ve depolama kapasitesiyle uyum aranır.",
          "Personel cevabı kayıtla aynı kelimeleri tekrar etmek değil, gemiye özgü işlemi göstermek olmalıdır. 'Company procedure'a göre' ifadesi; prosedürün yeri, karar ölçütü, valf/ekipman ve record entry gösterilemiyorsa yetersizdir. Kaptan ve zabitler açık defect/temporary measure'ı saklamak yerine yetkili ve risk kontrollü şekilde açıklamalıdır.",
          "Bulgu sonrası immediate correction, extent check, root cause, corrective action ve effectiveness review ayrılır. Bir yanlış ORB satırı yalnız düzeltilmez; aynı vardiya/defter/filoda benzer hata olup olmadığı ve eğitim/prosedür arayüzü incelenir.",
        ],
        ["IMO Procedures for Port State Control", "ISM Code corrective action"],
        "Denetim hazırlığı son hafta belge temizliği değil, her ay yapılan bağımsız akış doğrulamasının doğal sonucu olmalıdır.",
        ["Personeli denetçi sorularına tek tip cümle ezberletmek", "Düzeltici faaliyet olarak yalnız tekrar eğitim yazmak"],
        scenario(
          "OWS kaydı var, overboard valfi sıkışmış",
          "ORB iki gün önce yasal OWS deşarjı gösterir; denetimde overboard valfinin uzun süredir kapalı konumda sıkıştığı anlaşılır.",
          "Kayıt ile fiziksel olasılık çelişir. Arıza tarihi, alternatif hat, valf göstergesi ve tank balance incelenmeden kayıt güvenilir kabul edilemez.",
          "Deşarj iddiası bağımsız kanıtlarla araştırılır, potansiyel yanlış kayıt şirket/bayrak hukukî sürecine taşınır; valf emniyetli biçimde onarılır ve arıza/record verification sistemindeki kök neden giderilir.",
        ),
      ),
    ],
    ["Her akışın fiziksel ve kayıtlı yolu aynı olmalıdır.", "Mass-balance şüpheyi görünür kılan doğrulama aracıdır.", "Düzeltici faaliyet yalnız satırı değil sistemi düzeltir."],
  ),
];

const categoryContext: Record<
  RegulationCategory,
  { purpose: string; implementation: string; evidence: string; failure: string }
> = {
  "IMO Sözleşmeleri": {
    purpose: "uluslararası asgari standardı bayrak devleti uygulaması, gemi sertifikasyonu ve liman devleti kontrolü üzerinden ortaklaştırır",
    implementation: "kuralı gemi tipi, tonaj, inşa tarihi ve sefer durumuna göre onaylı plan, ekipman, prosedür ve yetkin personele dönüştürmektir",
    evidence: "sertifika ve supplement, onaylı plan/manual, operasyon logu, test-bakım kaydı ve mürettebatın uygulamalı açıklaması",
    failure: "geçerli belgenin gemideki gerçek konfigürasyon veya personel uygulamasıyla uyuşmaması",
  },
  "Emniyet Kodları": {
    purpose: "yüksek riskli gemi, yük veya operasyon için ana sözleşmedeki hedefi ayrıntılı teknik ve operasyonel bariyerlere dönüştürür",
    implementation: "code hükmünü gemiye özgü risk değerlendirmesi, limit, checklist, bakım standardı ve acil durum adımıyla işletmektir",
    evidence: "uygunluk belgesi, onaylı operasyon manualı, risk değerlendirmesi, izin/checklist, cihaz trendi ve tatbikat kaydı",
    failure: "genel checklist tamamlanmış görünürken code'a özgü limit veya tehlikenin sahada yönetilmemesi",
  },
  "Çevresel Düzenlemeler": {
    purpose: "kirletici veya istilacı etkinin kaynağını, gemideki işlem yolunu, deşarj/emisyon şartını ve kayıt zincirini kontrol eder",
    implementation: "madde/atık akışını kaynaktan tanka, arıtma ekipmanına, nihai bertarafa ve record book kaydına kadar izlemektir",
    evidence: "sertifika, plan, record book, tank/ölçüm verisi, alarm-ekipman kaydı, numune ve reception facility belgesi",
    failure: "kayıtlı miktar ve yöntemin tank bakiyesi, cihaz trendi veya teslim fişiyle fiziksel olarak uzlaşmaması",
  },
  "Denetim & Sörvey": {
    purpose: "gemi, şirket, bayrak, klas ve liman devleti arasındaki bağımsız doğrulama ve bulgu kapatma sistemini tanımlar",
    implementation: "sörvey kapsamını doğru planlamak, gerçek kondisyonu göstermek, bulguyu riskine göre yönetmek ve kalıcı kapanışı kanıtlamaktır",
    evidence: "survey/inspection report, status, condition/recommendation listesi, defect kaydı, düzeltici faaliyet ve etkinlik kontrolü",
    failure: "bulgunun kâğıt üzerinde kapanmış görünmesine rağmen aynı fiziksel veya sistemik eksikliğin sürmesi",
  },
  "Gemi Sertifikaları": {
    purpose: "belirli bir tasarım, ekipman, yönetim veya operasyon standardının yetkili sörveyle doğrulandığını görünür kılar",
    implementation: "sertifikanın kapsam, ek, endorsement ve koşullarını gemideki gerçek ekipman/operasyonla sürekli aynı tutmaktır",
    evidence: "sertifika aslı, supplement/record of equipment, survey status, onay yazısı ve sertifikayı destekleyen saha kaydı",
    failure: "ana sertifika tarihi geçerliyken eki, onayı, sörvey penceresi veya gerçek gemi durumunun farklı olması",
  },
  "Bölgesel Düzenlemeler": {
    purpose: "belirli kıyı devleti, liman veya deniz alanının trafik, çevre, emniyet ve bildirim risklerine ek kontrol getirir",
    implementation: "güncel yerel kuralı passage/pre-arrival planına, gemi operasyonuna, acente iletişimine ve zamanında bildirime çevirmektir",
    evidence: "güncel circular/port information, pre-arrival form, voyage logu, izin/onay, acente-otorite yazışması ve operasyon kaydı",
    failure: "eski liman bilgisinin kullanılması veya acenteye gönderilen bildirimin gemideki gerçek operasyonla uyuşmaması",
  },
};

const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((value): value is string => Boolean(value?.trim())).map((value) => value.trim()))];

const joinForNarrative = (values: string[], emptyText: string) => {
  const cleaned = unique(values);
  if (cleaned.length === 0) return emptyText;
  return cleaned.map((value, index) => `${index + 1}) ${value}`).join(" ");
};

const buildFallbackNarrative = (item: RegulationItem): RegulationNarrativeChapter[] => {
  const context = categoryContext[item.category];
  const applicability = item.applicability || [];
  const articles = item.keyArticles || [];
  const detailedSections = item.detailedSections || [];
  const amendments = item.amendments || [];
  const sources = (item.resources || []).map((resource) => resource.label);

  const ruleSections: RegulationNarrativeSection[] = articles.map((article, index) => {
    const supportingSection = detailedSections[index % Math.max(detailedSections.length, 1)];
    const operationalFocus = item.essentials[index % Math.max(item.essentials.length, 1)];
    const action = item.actions[index % Math.max(item.actions.length, 1)];

    return section(
      `${article.id} · ${article.title}`,
      [
        `${article.summary} Bu hüküm, ${item.label} düzenlemesinin ${context.purpose} şeklindeki genel amacı içinde okunur. Madde başlığı tek başına sonuç değildir; tanımlar, kapsam, istisnalar ve atıf yapılan zorunlu metinler aynı anda kontrol edilmelidir.`,
        supportingSection
          ? `${supportingSection.heading}: ${supportingSection.body} Bu açıklamanın gemideki karşılığı, genel metni geminin onaylı düzeni ve gerçek operasyon sınırlarıyla eşleştirmektir.`
          : `Gemideki karşılık ${operationalFocus || "uygulanabilir teknik ve operasyonel bariyerin kurulması"} odağıyla değerlendirilir. Sorumlu kişi yalnız kuralı söylemek yerine kimin, hangi ekipman/prosedürle, hangi anda ve hangi limit içinde hareket ettiğini gösterebilmelidir.`,
        `${action || "Uygulanabilir işlem gemiye özgü prosedüre göre yürütülür."} Yapılan işlem; ${context.evidence} ile doğrulanır. Arıza veya sapmada güvenli durum, bildirim yetkisi, geçici tedbir ve kalıcı kapanış birbirinden ayrılır.`,
      ],
      unique([`${article.id} – ${article.title}`, ...sources]),
      `${operationalFocus || context.implementation} Gereklilik; vardiya, bakım, familiarization ve değişiklik yönetimine ayrı ayrı aktarılmalıdır.`,
      unique([
        context.failure,
        item.penalties?.[index % Math.max(item.penalties?.length || 0, 1)],
        "Madde özetini gemiye özgü uygulanabilirlik kontrolünün yerine koymak",
      ]),
    );
  });

  const additionalTheory = detailedSections
    .slice(articles.length)
    .map((entry, index) =>
      section(
        entry.heading,
        [
          entry.body,
          `Bu konu ${item.label} kapsamında yalnız teorik bilgi olarak kalmamalıdır. ${context.implementation} Gemide ilgili ekipman, alan veya kayıt üzerinde yapılan walk-through; prosedür metniyle gerçek iş akışının ayrıştığı noktaları ortaya çıkarır.`,
          `${item.actions[index % Math.max(item.actions.length, 1)] || "İşlem planlanır, uygulanır ve bağımsız olarak doğrulanır."} Sonuç ${context.evidence} kullanılarak çapraz kontrol edilir.`,
        ],
        sources,
        item.essentials[index % Math.max(item.essentials.length, 1)] || context.implementation,
        [context.failure, "Genel bilgiye güvenip onaylı gemi belgesini veya güncel yerel şartı kontrol etmemek"],
      ),
    );

  const requirementsChapterSections = [...ruleSections, ...additionalTheory];
  if (requirementsChapterSections.length === 0) {
    requirementsChapterSections.push(
      section(
        "Temel yükümlülüklerin birlikte okunması",
        [
          joinForNarrative(item.essentials, `${item.label} için gemiye uygulanabilir yükümlülükler resmî metinden belirlenir.`),
          `Bu gereklilikler bağımsız maddeler değil, ortak bir risk kontrol zinciridir. ${context.implementation} Bir bariyerin devre dışı kalması halinde kalan bariyerlerin yeterliliği ve sefer/operasyonun sürdürülüp sürdürülemeyeceği yetkili kişilerce yeniden değerlendirilir.`,
          `Gemi ekibi, yükümlülüğün hukukî dayanağını, emniyet/çevre gerekçesini, sorumlu rolünü ve ${context.evidence} üzerinden nasıl ispatlandığını açıklayabilmelidir.`,
        ],
        sources,
        context.implementation,
        [context.failure],
      ),
    );
  }

  return [
    chapter(
      `${item.slug}-amac-kapsam`,
      `1. Amaç, hukukî yapı ve ${item.label} kapsamı`,
      `${item.label}, ${context.purpose}. Bu bölüm düzenlemenin ortaya çıkardığı yükümlülüğü değil, önce çözdüğü riski ve gemiye neden uygulandığını kurar.`,
      [
        section(
          "Düzenlemenin çözdüğü problem ve sistem içindeki yeri",
          [
            item.overview,
            item.history || `${item.label}, ilgili uluslararası ve ulusal uygulama zinciri içinde teknik gereklilikleri gemi işletmesine bağlar. Tarihçe okunurken ilk kabul tarihi kadar bugün yürürlükte olan konsolide metin ve geçiş hükümleri esas alınır.`,
            `Düzenlemenin temel mantığı ${context.purpose}. Bu nedenle uygunluk yalnız bir belge edinmek değil; tasarım, ekipman, prosedür, insan yeterliği, kayıt ve bağımsız doğrulamanın aynı sonucu vermesidir.`,
          ],
          sources,
          `Kaptan ve departman amirleri, düzenlemenin koruduğu ana tehlikeyi ve bu gemideki birincil bariyerleri ortak bir risk resmi içinde anlatabilmelidir.`,
          ["Düzenlemenin adını bilip koruduğu tehlikeyi açıklayamamak", "İlk kabul tarihini güncel yükümlülüklerin tamamı sanmak"],
        ),
        section(
          "Uygulanabilirlik bir evet/hayır kutusu değil, kanıtlanan karardır",
          [
            joinForNarrative(applicability, `Uygulanabilirlik; gemi tipi, tonaj, inşa/dönüşüm tarihi, bayrak, sefer alanı ve yapılan operasyona göre resmî metinden belirlenir.`),
            `Her kapsam cümlesi geminin certificate particulars, planı, equipment arrangement'ı ve operasyonuyla doğrulanır. Muafiyet, eşdeğerlik veya grandfathering varsa yazılı yetki, koşul ve süre gösterilir; şirket alışkanlığı kapsam istisnası oluşturmaz.`,
            `Gemi veya operasyon değiştiğinde uygulanabilirlik yeniden açılır. Yeni yük, rota, ekipman, bayrak, yönetici şirket veya major conversion; sertifika, eğitim, prosedür ve survey gereğini birlikte değiştirebilir.`,
          ],
          unique(["Uygulanabilir sözleşme/kod metni", ...sources]),
          "Uygulanabilirlik matrisi, 'uygulanır/uygulanmaz' sonucunun yanında gerekçe, referans, gemi kanıtı ve son kontrol tarihini taşımalıdır.",
          ["Benzer gemideki uygulamayı bu gemiye kopyalamak", "Tonaj veya inşa tarihi gibi tek ölçütle bütün hükümleri elemek"],
        ),
      ],
      ["Önce risk ve amaç, sonra madde okunur.", "Uygulanabilirlik gemiye özgü ve izlenebilir olmalıdır.", "Kapsamı etkileyen değişiklikler formal change management tetikler."],
    ),
    chapter(
      `${item.slug}-kural-haritasi`,
      "2. Madde ve gereklilik haritası",
      `Bu bölüm ${item.label} içindeki maddeleri yüzeysel başlıklar olarak değil; gerekçe, gemi uygulaması, kanıt ve arıza sonucu üzerinden okur.`,
      requirementsChapterSections,
      ["Madde, tanım ve atıf yaptığı teknik metinle birlikte okunur.", "Her gerekliliğin gemide görünür bir sahibi ve kanıtı olmalıdır.", "Arıza halinde kalan bariyerler yeniden değerlendirilir."],
    ),
    chapter(
      `${item.slug}-gemi-uygulamasi`,
      "3. Gemide uygulama, görev paylaşımı ve objektif kanıt",
      "Kuralın değeri sahadaki davranışla ölçülür. Bu bölüm gereklilikleri hazırlık, uygulama, vardiya devri, kayıt ve bağımsız doğrulama döngüsüne çevirir.",
      [
        section(
          "Operasyon öncesi hazırlık ve kontrol noktaları",
          [
            joinForNarrative(item.essentials, `${item.label} için kritik emniyet/uyum odakları gemiye özgü risk değerlendirmesinde belirlenir.`),
            `Bu odaklar operasyon öncesinde scope, sorumlu, equipment readiness, limit, communication ve stop-work kriterine dönüştürülür. ${context.implementation} Toolbox talk/checklist, ekip düşünmeden işaretlesin diye değil; riskteki değişikliği görünür kılsın diye kullanılır.`,
            `İş başlamadan sertifika/manual revizyonu, açık defect, maintenance isolation, hava/deniz/liman koşulu ve yetkin personel kontrol edilir. Bir şart sağlanmıyorsa erteleme, alternatif yöntem veya yetkili onaylı geçici tedbir seçilir.`,
          ],
          sources,
          context.implementation,
          ["Checklist'i saha kontrolünden önce topluca işaretlemek", "Açık defect'in operasyon limitine etkisini değerlendirmemek"],
        ),
        section(
          "Uygulama, vardiya devri ve sapma yönetimi",
          [
            joinForNarrative(item.actions, "Operasyon adımları onaylı gemi prosedürü ve sorumlu zabitin gözetimiyle yürütülür."),
            "Vardiya devri yalnız 'iş devam ediyor' cümlesi değildir; mevcut aşama, son ölçüm, aktif alarm/isolation, yaklaşan limit, kıyı iletişimi ve sapmada yapılacak hareket aktarılır. Kritik kararlar tarih-saat ve sorumlu kişiyle kaydedilir.",
            `Sapma görülünce önce güvenli durum kurulur, sonra bildirim ve teknik inceleme yapılır. ${context.failure} temel kırmızı bayraktır. Temporary measure'ın yetkisi, süresi, risk kontrolü ve kalıcı kapanış tarihi açık olmalıdır.`,
          ],
          sources,
          `Sorumlu amir, yapılan adımı gerçek ekipman veya kayıt üzerinde gösterebilmeli; devralan vardiya kalan riski kendi cümlesiyle tekrar edebilmelidir.`,
          [context.failure, "Arızayı loglamadan resetleyip normal operasyona devam etmek"],
          scenario(
            "Kayıt tamam, fiziksel durum farklı",
            `${item.label} checklist'i eksiksiz imzalanmıştır; vardiya turunda kritik bir ekipman/işaret/valf prosedürdeki konumdan farklı bulunur.`,
            "İmza, kontrolün gerçekten ve doğru kapsamda yapıldığını tek başına kanıtlamaz. Fark, operasyonel riskin yanında safety culture ve kayıt güvenilirliği sorunudur.",
            "İş güvenli duruma alınır, farkın etkisi ve süresi belirlenir, ilgili kayıtlar korunur. Checklist tasarımı, görev yükü, eğitim ve gözetim kök nedenleri incelenip etkinliği sahada doğrulanan düzeltici faaliyet uygulanır.",
          ),
        ),
        section(
          "Objektif kanıtı çapraz doğrulama",
          [
            `Bir denetçi için güçlü kanıt zinciri ${context.evidence} öğelerinin aynı olayı göstermesidir. Tarih, saat, konum, miktar, ekipman kimliği, sorumlu imza ve ölçüm sonucu arasında tutarlılık aranır.`,
            "Rastgele örnekleme, hazırlıklı dosya yerine gerçek sistem performansını gösterir. Bir kayıt seçilir; sahadaki ekipman, alarm/event history, PMS, certificate supplement ve ilgili personel açıklamasıyla geriye ve ileriye izlenir.",
            "Tutarsızlık bulunduğunda kaydı sessizce düzeltmek yerine factual review yapılır. Immediate correction, extent-of-condition, root cause, corrective action ve effectiveness check ayrı adımlar olarak belgelenir.",
          ],
          sources,
          "Gemi iç denetimi her ay farklı bir gereklilik için belge–saha–personel üçgenini sınamalıdır.",
          ["Aynı kişi tarafından oluşturulan iki kaydı bağımsız doğrulama sanmak", "Bulgunun kök nedenini otomatik olarak eğitim eksikliği yazmak"],
        ),
      ],
      ["Hazırlık, işi başlatma iznidir; formalite değildir.", "Vardiya devri aktif riski taşır.", "Kanıt zinciri belge, saha ve insan bilgisini birleştirir."],
    ),
    chapter(
      `${item.slug}-degisiklik-vaka`,
      "4. Değişiklik yönetimi, denetim senaryosu ve sürekli uygunluk",
      "Regülasyon uyumu bir sertifika tarihinde bitmez. Değişiklik, kaza dersi, bulgu ve yeni operasyon; uygulanabilirlikten eğitime kadar sistemin ilgili bütün parçalarını yeniden açar.",
      [
        section(
          "Değişikliklerin yürürlüğe alınması",
          [
            joinForNarrative(
              amendments.map((entry) => `${entry.year}: ${entry.description}`),
              `${item.label} değişiklikleri resmî yayımlar, bayrak/klas circularları ve şirket mevzuat takip süreci üzerinden izlenir.`,
            ),
            "Adoption, entry into force ve ship-specific application date aynı kavram değildir. Değişiklikte gemi tipi, construction date, existing/new ship ayrımı ve geçiş hükmü okunur; yalnız takvim tarihiyle karar verilmez.",
            "Gap analysis; sertifika/plan, fiziksel modifikasyon, yazılım, spare, PMS, procedure/checklist, crew training ve shore support etkilerini ayrı sorumlulara atar. Uygulama sonunda belge güncellemesi ile saha testi aynı kapanış paketinde doğrulanır.",
          ],
          unique(["Güncel konsolide metin", ...sources]),
          "Şirket circular'ı gemiye geldiğinde yalnız dosyalanmamalı; gemiye uygulanabilirliği, aksiyon sahibi ve tamamlanma kanıtı kayda bağlanmalıdır.",
          ["Adoption tarihini yürürlük tarihi sanmak", "Prosedürü güncelleyip ekipman/yazılım etkisini atlamak"],
        ),
        section(
          "Denetçi sorusunu vaka çözümüne dönüştürme",
          [
            `Denetçi '${item.label} bu gemide nasıl uygulanıyor?' diye sorduğunda iyi cevap beş parçalıdır: uygulanabilir hüküm ve gerekçesi; gemiye özgü ekipman/prosedür; sorumlu rol; son gerçek işlem ve ${context.evidence}; arıza/uygunsuzluk halinde güvenli yol.`,
            "Cevap ekipman başında gösterilebilir olmalı, ezberlenmiş genel tanımdan ibaret kalmamalıdır. Personelin seviyesine uygun kendi görevi sorulur; herkesin bütün sözleşmeyi bilmesi değil, kendi eylemi ve escalation yolunu doğru uygulaması beklenir.",
            `Kırmızı bayrak ${context.failure}. Bu durumda denetim kapsamı genellikle genişler; benzer ekipman/kayıt, SMS uygulaması, bakım ve yönetim gözetimi incelenebilir. Açık, yetkili ve risk kontrollü defect yönetimi saklanmış bir tutarsızlıktan daha güçlüdür.`,
          ],
          sources,
          "Tatbikat/sözlü hazırlıkta her cevap bir belge ve bir fiziksel gösterimle doğrulanmalıdır.",
          ["Kural numarasını söylemeyi yeterli cevap sanmak", "Açık arızayı denetimden önce kayıttan çıkarmak"],
          scenario(
            "Sörvey öncesi kritik uygunsuzluk",
            `${item.label} kapsamında kritik bir eksiklik sörveyden bir gün önce bulunur; ekip, denetimde görünmemesi için kaydı sonraya bırakmayı önerir.`,
            "Kayıt dışı bırakmak fiziksel riski azaltmaz ve ISM/kayıt güvenilirliğini ayrıca ihlal eder. Yetkisiz gizleme, eksikliğin kendisinden daha geniş kontrol tetikleyebilir.",
            "Eksiklik derhal güvenli duruma alınır, defect/non-conformity açılır, şirket ve gerekli bayrak/RO/liman kanalı bilgilendirilir; yetkili temporary measure ve kalıcı onarım planı denetçiye şeffaf sunulur.",
          ),
        ),
        section(
          "Bu konunun sürekli uygunluk kontrol listesi",
          [
            "Aylık kontrol beş soruyu kapatır: uygulanabilir metin değişti mi, gerçek gemi konfigürasyonu onaylı belgeyle aynı mı, açık defect/temporary measure var mı, son kayıt fiziksel verilerle tutarlı mı ve rastgele personel kendi görevini gösterebiliyor mu?",
            "Üç aylık veya şirketin belirlediği periyotta trend incelenir: tekrar eden alarm, ertelenen iş, spare/servis gecikmesi, near miss, record correction ve PSC/klas bulguları ortak kök nedene işaret ediyor mu? Tek tek kapalı iş emirleri sistemin iyi çalıştığını kanıtlamaz.",
            "Yıllık yönetim gözden geçirmesi; kural değişiklikleri, audit/survey sonuçları, operasyonel performans ve kaynak ihtiyacını birleştirir. Sonuç yeni hedef, bütçe, eğitim, modifikasyon veya prosedür değişikliği olarak gemiye geri dönmelidir.",
          ],
          sources,
          "Sürekli uygunluk, yaklaşan denetim olduğunda başlayan kampanya değil; vardiya ve PMS içine yerleşmiş düzenli doğrulamadır.",
          ["Yalnız son denetim bulgularını izlemek", "Tekrarlanan küçük sapmaları ayrı ve önemsiz kabul etmek"],
        ),
      ],
      ["Değişiklik bütün belge ve saha etkileri kapanınca uygulanmıştır.", "Denetim cevabı hüküm, uygulama, kanıt ve arıza yolunu birleştirir.", "Sürekli uygunluk trend ve etkinlik kontrolü gerektirir."],
    ),
  ];
};

const deepNarratives: Record<string, RegulationNarrativeChapter[]> = {
  solas: solasNarrative,
  colreg: colregNarrative,
  marpol: marpolNarrative,
};

export const buildNarrativeChapters = (item: RegulationItem): RegulationNarrativeChapter[] =>
  deepNarratives[item.slug] || buildFallbackNarrative(item);

