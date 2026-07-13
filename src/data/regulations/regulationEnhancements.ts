import type {
  RegulationCategory,
  RegulationComplianceStage,
  RegulationInspectionQuestion,
  RegulationItem,
  RegulationOperationalRequirement,
  RegulationSourceStatus,
  RegulationTerm,
} from "./types";
import { buildNarrativeChapters } from "./regulationNarratives";

type RegulationEnhancement = Pick<
  RegulationItem,
  "learningObjectives" | "operationalRequirements" | "inspectionQuestions" | "terms" | "sourceStatus"
>;

const reviewedThrough = "13 Temmuz 2026";

const standardCaution =
  "Bu anlatım eğitim ve gemi içi hazırlık içindir; konsolide sözleşme/kod metninin, bayrak devleti talimatlarının, klas kurallarının ve şirket SMS prosedürlerinin yerine geçmez. Uygulanabilir eşik ve yürürlük tarihini geminin inşa tarihi, tipi, tonajı, seferi ve bayrağına göre doğrulayın.";

const sourceStatus = (
  officialSources: RegulationSourceStatus["officialSources"],
  caution = standardCaution,
): RegulationSourceStatus => ({
  reviewedThrough,
  officialSources,
  caution,
});

const requirement = (
  title: string,
  regulatoryBasis: string,
  requirementText: string,
  rationale: string,
  onboardEvidence: string[],
  responsibleRoles: string[],
  verification: string[],
  commonFailure: string,
): RegulationOperationalRequirement => ({
  title,
  regulatoryBasis,
  requirement: requirementText,
  rationale,
  onboardEvidence,
  responsibleRoles,
  verification,
  commonFailure,
});

const question = (
  prompt: string,
  expectedAnswer: string,
  evidence: string[],
  redFlags: string[],
): RegulationInspectionQuestion => ({
  question: prompt,
  expectedAnswer,
  evidence,
  redFlags,
});

const term = (name: string, definition: string, practicalNote?: string): RegulationTerm => ({
  term: name,
  definition,
  practicalNote,
});

const deepProfiles: Record<string, RegulationEnhancement> = {
  solas: {
    learningObjectives: [
      "SOLAS gerekliliğinin gemi tipi, tonaj, inşa tarihi ve sefer bölgesine göre neden değiştiğini açıklamak",
      "Bir kuralı gemideki ekipman, prosedür, test kaydı ve sertifika zincirine dönüştürmek",
      "Köprüüstü, güverte ve makine ekiplerinin aynı emniyet bariyerindeki sorumluluklarını ayırmak",
      "Sörvey veya PSC sırasında yalnızca belgeyi değil, ekipmanın fiilî çalışırlığını göstermek",
    ],
    operationalRequirements: [
      requirement(
        "Uygulanabilirlik, sörvey ve sertifika zinciri",
        "SOLAS Chapter I ve HSSC",
        "Geminin uygulanabilir SOLAS hükümleri; gemi tipi, gros tonaj, inşa/önemli tadilat tarihi ve sefer niteliğine göre bir uygunluk matrisiyle izlenmeli, buna bağlı emniyet sertifikaları geçerli sörvey onaylarıyla korunmalıdır.",
        "Bir ekipmanın gemide bulunması tek başına uygunluk kanıtı değildir. Tasarım onayı, ilk sörvey, periyodik doğrulama, bakım ve gemideki operasyonel kullanım aynı zincirin parçalarıdır.",
        [
          "Geçerli Cargo Ship Safety Construction, Equipment ve Radio sertifikaları veya uygulanabilir birleşik sertifikalar",
          "Record of Equipment ekleri, sörvey durum raporu ve kapanmış condition/class kayıtları",
          "Onaylı plan, manual ve bookletlerin güncel revizyon listesi",
        ],
        ["Kaptan", "Başmühendis", "Baş zabit", "Şirket teknik/uyum birimi"],
        [
          "Sertifika üzerindeki gemi bilgilerini ve eklerini gerçek ekipmanla çapraz kontrol et",
          "Yıllık/ara/yenileme sörvey pencerelerini planlı bakım sistemiyle karşılaştır",
          "Tadilat veya ekipman değişikliğinin bayrak/klas onayını doğrula",
        ],
        "Sertifika geçerli görünürken Record of Equipment, gemideki cihaz veya onaylı planın farklı revizyonda olması",
      ),
      requirement(
        "Yangın bariyerlerinin birlikte çalışması",
        "SOLAS Chapter II-2 ve FSS Code",
        "Algılama, alarm, yapısal bölmeleme, havalandırma/yakıt kesme, sabit söndürme ve kaçış düzenleri tek bir yangın senaryosunda birbirini tamamlayacak şekilde çalışır tutulmalıdır.",
        "Yangın emniyeti bağımsız cihazların toplamı değildir. Açık bırakılan bir yangın kapısı veya çalışmayan damper, doğru çalışan dedektör ve söndürme sisteminin etkisini ortadan kaldırabilir.",
        [
          "Güncel Fire Control Plan ve yangın zon/dedektör listesi",
          "Haftalık/aylık test kayıtları, sabit sistem servis raporları ve tüp/ajan kontrolleri",
          "Yangın tatbikatı senaryosu, zaman çizelgesi, debrief ve düzeltici faaliyet kaydı",
        ],
        ["Kaptan", "Baş zabit", "Başmühendis", "Emniyet zabiti", "Tüm acil durum ekipleri"],
        [
          "Alarmdan olay yerine, sınırlandırmadan söndürmeye kadar bir senaryoyu masa başında izlet",
          "Quick-closing valve, fan/damper ve yangın kapısı testini kayıtla eşleştir",
          "Kaçış yolunu karanlık/duman varsayımıyla fiziksel olarak dolaş",
        ],
        "Bakım kaydı tamamlanmış görünmesine rağmen izolasyonun, uzaktan durdurmanın veya kaçış yolunun fiilen kullanılamaması",
      ),
      requirement(
        "Can kurtarma düzeninin operasyonel hazır oluşu",
        "SOLAS Chapter III ve LSA Code",
        "Survival craft, rescue boat, launching appliance ve kişisel can kurtarma donanımı; geminin onaylı düzenine göre eksiksiz, erişilebilir ve mürettebat tarafından emniyetle kullanılabilir tutulmalıdır.",
        "Kapasite ve sertifika uygunluğu ancak tahliye organizasyonu, familiarization, indirme prosedürü ve gerçekçi tatbikat performansıyla anlam kazanır.",
        [
          "Muster list, emergency station bill ve kişisel görev kartları",
          "Can kurtarma donanımı bakım/servis kayıtları ve on-load release gear dokümanları",
          "Tatbikat kayıtları, yeni katılan personel familiarization kayıtları ve debriefler",
        ],
        ["Kaptan", "Baş zabit", "4. zabit/emniyet zabiti", "Filika amirleri"],
        [
          "Rastgele seçilen personele alarm, toplanma yeri ve görevini açıklat",
          "Donanım sayısını Record of Equipment ve yerleşim planıyla karşılaştır",
          "İndirme öncesi kontrol ve emniyet pimleri/serbest bırakma tertibatı prosedürünü göster",
        ],
        "Tatbikatın yalnızca deftere yazılması; mürettebatın görevini, haberleşme yöntemini veya indirme risklerini açıklayamaması",
      ),
      requirement(
        "Köprüüstü, GMDSS ve sefer emniyeti",
        "SOLAS Chapters IV-V",
        "GMDSS deniz alanı donanımı ile seyir cihazları çalışır, testleri kayıtlı ve sefer planının appraisal-planning-execution-monitoring döngüsüne entegre olmalıdır.",
        "Cihazların açık olması yeterli değildir. Alarm yönetimi, yedeklilik, sensör tutarlılığı ve insan gözetimi birlikte güvenli seyri oluşturur.",
        [
          "Radio log, günlük/haftalık cihaz testleri ve reserve source kontrolleri",
          "Berth-to-berth passage plan, chart/ENC düzeltme kanıtı ve master approval",
          "AIS/VDR/ECDIS/BNWAS bakım, test ve arıza yönetimi kayıtları",
        ],
        ["Kaptan", "Vardiya zabitleri", "GMDSS operatörleri", "Elektrik zabiti/ETO"],
        [
          "Planlanan rotadaki kritik noktaları ve emniyet konturlarını ECDIS üzerinde göster",
          "Bir GMDSS arızasında yedek haberleşme ve shore support sürecini açıklat",
          "Radar, görsel mevki, GNSS ve derinlik verisinin nasıl çapraz kontrol edildiğini göster",
        ],
        "ECDIS rotası onaylı görünürken safety contour, XTD, alarm veya güncelleme ayarlarının gemi draftı ve SMS ile uyuşmaması",
      ),
    ],
    inspectionQuestions: [
      question(
        "Acil jeneratörün otomatik devreye girmesini ve beslediği kritik tüketicileri nasıl doğruluyorsunuz?",
        "Personel; blackout senaryosunu, otomatik başlatma/transferi, yakıt ve akü kontrollerini, kritik devreleri ve başarısız testte uygulanacak arıza yönetimini gemiye özgü anlatabilmelidir.",
        ["Test kaydı", "Tek hat şeması", "PMS bakım işi", "Son arıza/düzeltici faaliyet kaydı"],
        ["Ezber cevap", "Kritik tüketicilerin bilinmemesi", "Kayıt tarihi ile sayaç/ekipman durumunun uyuşmaması"],
      ),
      question(
        "Son yangın tatbikatında hangi emniyet bariyeri gerçekten test edildi ve hangi eksiklik kapatıldı?",
        "Cevap; senaryoyu, alarm ve ekip oluşturma süresini, izolasyon/söndürme/haberleşme adımlarını, debrief bulgusunu ve sorumlu/tamamlanma tarihini içermelidir.",
        ["Drill report", "Muster list", "Fotoğraf yerine operasyonel test kanıtı", "Corrective action kaydı"],
        ["Her ay aynı metin", "Ölçülebilir zaman/sonuç bulunmaması", "Bulgunun takip edilmemesi"],
      ),
      question(
        "Sefer planındaki en kritik üç risk ve bunlara atanmış emniyet marjları nelerdir?",
        "Vardiya zabiti; UKC, squat, emniyet konturu, XTD, abort point, trafik/meteoroloji ve gerekli master call kriterlerini gerçek rota üzerinden açıklamalıdır.",
        ["Onaylı passage plan", "UKC hesabı", "ENC güncelleme raporu", "Master's standing/night orders"],
        ["Genel ifadeler", "Rota üzerinde gösterememe", "Draft veya safety contour tutarsızlığı"],
      ),
    ],
    terms: [
      term("HSSC", "Birden fazla IMO sözleşmesinin sörvey ve sertifikasyon takvimini uyumlaştıran sistem.", "Pencere tarihleri sertifikanın türüne göre kontrol edilmelidir."),
      term("Record of Equipment", "Emniyet sertifikasının, gemide bulunması gereken onaylı ekipman ayrıntılarını gösteren eki.", "Sahadaki marka/model/adet ile karşılaştırılmalıdır."),
      term("RO", "Bayrak devleti adına belirli sörvey ve sertifikasyon görevlerini yapan yetkilendirilmiş tanınmış kuruluş."),
      term("Clear grounds", "PSC'nin ilk kontrolden daha ayrıntılı denetime geçmesini haklı kılan açık emareler."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – SOLAS, 1974", href: "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-safety-of-life-at-sea-(solas),-1974.aspx" },
      { label: "IMO – 1 Ocak 2026'da yürürlüğe giren kurallar", href: "https://www.imo.org/en/mediacentre/pressbriefings/pages/raft-of-shipping-rules-in-force-from-1-january-2026.aspx" },
    ]),
  },

  marpol: {
    learningObjectives: [
      "Altı MARPOL ekinin hangi kirlilik türünü ve hangi gemi operasyonunu düzenlediğini ayırmak",
      "Bir deşarj kararını gemi tipi, konum, özel alan, ekipman durumu ve kayıt şartıyla birlikte değerlendirmek",
      "Operasyonun fiziksel akışı ile ORB/GRB/BDN/record book kayıtlarının tutarlı olduğunu kanıtlamak",
      "Kirlilik olayında ilk müdahale, bildirim ve kanıt koruma adımlarını sıralamak",
    ],
    operationalRequirements: [
      requirement(
        "Petrol operasyonu ve Oil Record Book bütünlüğü",
        "MARPOL Annex I",
        "Sintine, sludge, yakıt transferi, tank temizliği ve uygulanabilir kargo operasyonları; onaylı ekipman ve prosedürle yürütülmeli, Oil Record Book'a gecikmeden ve gerçeği yansıtacak biçimde kaydedilmelidir.",
        "PSC, yalnızca defter formatına değil; tank soundingleri, OWS sayaç/alarmları, incinerator/shore receipt ve tüketim kayıtlarının aynı hikâyeyi anlatıp anlatmadığına bakar.",
        ["ORB Part I/II", "IOPP Certificate ve Supplement", "OWS/15 ppm alarm testleri", "Sludge landing receipt ve tank sounding kayıtları"],
        ["Kaptan", "Başmühendis", "Sorumlu mühendis", "Tankerlerde baş zabit"],
        [
          "ORB miktarlarını tank kapasitesi ve sounding değişimleriyle uzlaştır",
          "OWS testini, mühürleri ve overboard hattının fiziksel düzenini kontrol et",
          "Her düzeltmenin imza/tarih ve prosedüre uygunluğunu doğrula",
        ],
        "Kayıtlar matematiksel olarak mümkün görünse de tank, sayaç, shore receipt veya gerçek boru devresiyle uyuşmaması",
      ),
      requirement(
        "Çöp sınıflandırma ve deşarj kararı",
        "MARPOL Annex V",
        "Çöp; gemi planına göre ayrılmalı, depolanmalı ve yalnızca izin verilen istisna/koşullarda deşarj edilmeli; plastiklerin denize atılması yasak kabul edilmelidir.",
        "Yanlış kategori seçimi veya özel alanın gözden kaçırılması, küçük miktarda bir operasyonu dahi ciddi ihlale dönüştürebilir.",
        ["Garbage Management Plan", "Garbage Record Book", "Placardlar", "Reception facility receipt ve çöp hacim takibi"],
        ["Kaptan", "Baş zabit", "Çevre zabiti", "Aşçı ve departman sorumluları"],
        [
          "Güncel konum ve özel alan durumuna göre örnek bir deşarj kararını açıklat",
          "GRB miktarlarını depolama kapasitesi ve teslim fişleriyle karşılaştır",
          "Mutfak, güverte ve makine atık akışını fiziksel olarak izle",
        ],
        "Kâğıt üzerinde doğru ayrıştırma varken çöp istasyonlarında kategori karışması veya eksik/yanlış reception receipt kaydı",
      ),
      requirement(
        "Hava emisyonu, yakıt ve enerji verimliliği kanıtı",
        "MARPOL Annex VI",
        "Yakıt uygunluğu, bunker teslimi/numunesi, NOx/SOx/ODS gereklilikleri ve uygulanabilir enerji verimliliği yükümlülükleri geminin sertifika, plan ve operasyon kayıtlarıyla birlikte yönetilmelidir.",
        "Annex VI uyumu yalnızca yakıt sülfür yüzdesi değildir; yakıt değişimi, ekipman ayarı, numune zinciri, emisyon azaltma sistemi ve raporlanan tüketim verisi aynı sistemdir.",
        ["IAPP Certificate ve Supplement", "BDN ve MARPOL delivered sample", "Fuel change-over record", "SEEMP, DCS/CII veri ve doğrulama kayıtları"],
        ["Kaptan", "Başmühendis", "2. mühendis", "Şirket çevre/performans birimi"],
        [
          "Bunker tesliminden tüketime numune ve belge izlenebilirliğini kontrol et",
          "ECA giriş/çıkışındaki yakıt değişimini tank/valf/konum/zaman verileriyle doğrula",
          "DCS/CII verisini noon report, flowmeter ve bunker hesabıyla uzlaştır",
        ],
        "BDN uygun olsa bile gemideki numune, tank kullanımı, change-over kaydı veya raporlanmış tüketim verisinin izlenememesi",
      ),
    ],
    inspectionQuestions: [
      question(
        "Son sludge hareketini kaynaktan nihai bertarafa kadar nasıl kanıtlarsınız?",
        "Kaynak tank, miktar hesabı, transfer veya yakma işlemi, ORB kodu, sorumlu imza ve shore receipt/incinerator kaydı kesintisiz gösterilmelidir.",
        ["ORB", "Tank sounding log", "PMS/incinerator kaydı", "Reception facility receipt"],
        ["Negatif veya imkânsız tank bakiyesi", "Toplu ve gecikmiş kayıt", "Fiş ile ORB miktar farkı"],
      ),
      question(
        "Bu konumda hangi çöp türünün deşarjına hangi koşullarda izin veriliyor?",
        "Cevap geminin konumunu, nearest land mesafesini, özel alanı, çöp kategorisini, parçalama şartını ve şirketin daha sıkı politikasını birlikte ele almalıdır.",
        ["Garbage Management Plan", "Güncel mevki", "GRB", "Özel alan referansı"],
        ["Sadece mesafe söylemek", "Plastiği istisna sanmak", "Özel alanı dikkate almamak"],
      ),
      question(
        "ECA'ya girişte yakıt değişiminin tamamlandığını nasıl doğruluyorsunuz?",
        "Gerekli düşük sülfürlü yakıtın tüm servis sistemine ulaşma zamanı hesaplanmalı; tank miktarı, konum, tarih/saat ve change-over tamamlanma kaydı gösterilmelidir.",
        ["Change-over prosedürü ve hesabı", "Logbook kaydı", "Tank sounding", "BDN/numune"],
        ["Sadece valf çevirme saati", "Sistem hacmi hesabı yok", "Yetersiz düşük sülfürlü yakıt"],
      ),
    ],
    terms: [
      term("Special Area", "Oşinografik/ekolojik koşullar ve trafik nedeniyle daha sıkı zorunlu kirlilik önleme yöntemlerinin uygulandığı deniz alanı."),
      term("ORB", "Petrol ile ilgili makine veya kargo operasyonlarının kodlanmış biçimde kaydedildiği Oil Record Book."),
      term("BDN", "Teslim edilen deniz yakıtının özellik ve miktarını belgeleyen Bunker Delivery Note."),
      term("No more favourable treatment", "Sözleşmeye taraf olmayan bayrak gemilerine, taraf gemilerinden daha avantajlı muamele edilmemesi ilkesi."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – MARPOL", href: "https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-(marpol).aspx" },
      { label: "IMO – MARPOL Special Areas", href: "https://www.imo.org/en/ourwork/environment/pages/special-areas-marpol.aspx" },
    ]),
  },

  stcw: {
    learningObjectives: [
      "Certificate of competency, endorsement, tanker/özel eğitim ve medical uygunluğunu görev bazında kontrol etmek",
      "Asgari dinlenme kuralı ile gerçekten dinlenmiş ve göreve uygun olma şartını birbirinden ayırmak",
      "Vardiya teslimi, gözcülük, BRM/ERM ve kaptanı çağırma kararlarını operasyonel senaryoya uygulamak",
      "Familiarization, drill ve onboard assessment kayıtlarının gerçek yeterliliği nasıl kanıtladığını değerlendirmek",
    ],
    operationalRequirements: [
      requirement(
        "Göreve uygun sertifika ve endorsement",
        "STCW Articles VI, Regulations I/2 ve I/10",
        "Her gemiadamının yaptığı görev; geçerli yeterlik belgesi, bayrak tanıması/endorsement, sağlık raporu ve gerekiyorsa özel gemi/operasyon eğitimleriyle karşılanmalıdır.",
        "Belgenin varlığı yeterli değildir; belge üzerindeki kapasite, sınırlama, görev ve geminin bayrağı fiilî atamayla uyuşmalıdır.",
        ["COC/COP asılları", "Flag endorsement veya başvuru kanıtı", "Medical certificate", "Minimum Safe Manning Document ve crew matrix"],
        ["Kaptan", "Şirket crewing birimi", "Departman amirleri"],
        [
          "Crew matrixi safe manning ve muster görevleriyle çapraz kontrol et",
          "Belge numarası, sona erme, sınırlama ve issuing authority alanlarını doğrula",
          "Tanker/IGF/polar gibi gemiye özel yeterlikleri ayrıca kontrol et",
        ],
        "Geçerli bir COC bulunmasına rağmen bayrak endorsementı, kapasite veya gemiye özel yeterliğin eksik olması",
      ),
      requirement(
        "Dinlenme, yorgunluk ve fit-for-duty",
        "STCW Code Section A-VIII/1",
        "Vardiya ve iş planı asgari dinlenme sınırlarını karşılamalı; kayıtlar gerçek çalışma, manevra, drill, çağrı ve fazla mesaiyi yansıtmalı, yorgunluk riski ayrıca yönetilmelidir.",
        "Form üzerinde uyum, personelin fiilen dinlendiğini garanti etmez. Planlı program ile gerçek kayıt arasındaki fark ve istisnaların telafisi emniyetin parçasıdır.",
        ["Posted watch schedule", "Bireysel work/rest kayıtları", "İstisna ve telafi kayıtları", "Fatigue risk assessment"],
        ["Kaptan", "Baş zabit", "Başmühendis", "Her gemiadamı"],
        [
          "Manevra, drill ve gece çağrılarını günlük loglarla karşılaştır",
          "İmzalı kaydı personelle görüşerek doğrula",
          "Yaklaşan yoğun operasyon için yorgunluk azaltma planını kontrol et",
        ],
        "Her gün aynı saatlerin kopyalanması; manevra veya tatbikatın kayıtta görünmemesi; sonradan toplu imza",
      ),
      requirement(
        "Emniyetli vardiya ve teslim",
        "STCW Code Chapter VIII",
        "Vardiya; nitelikli personel, uygun gözcü, açık görev dağılımı ve durum farkındalığıyla tutulmalı; teslim sırasında seyir/makine durumu, alarmlar, arızalar ve beklenen riskler anlaşılır biçimde aktarılmalıdır.",
        "Vardiya değişimi, sorumluluğun imzayla devri değil, ortak bir operasyon resminin doğrulanmasıdır.",
        ["Bridge/engine standing orders", "Night order book", "Logbook", "Passage plan ve alarm/defect kayıtları"],
        ["Kaptan", "Başmühendis", "Vardiya zabitleri", "Gözcüler"],
        [
          "Teslim checklistini gerçek vardiya üzerinde uygula",
          "Kaptanı/başmühendisi çağırma kriterlerini personele senaryo ile sor",
          "Arıza ve geçici tedbirlerin bir sonraki vardiyaya ulaştığını doğrula",
        ],
        "Teslim sırasında kritik CPA/TCPA, makine kısıtı, hava değişimi veya devre dışı alarmın aktarılmaması",
      ),
    ],
    inspectionQuestions: [
      question(
        "Sizi bu gemide ve bu görevde çalışmaya yetkili kılan belge zinciri nedir?",
        "Personel COC/COP, bayrak endorsementı, medical, gemiye özel eğitim ve atandığı kapasiteyi gösterebilmelidir.",
        ["Belge asılları", "Crew list", "Safe manning", "Training matrix"],
        ["Belgeyi bulamama", "Kapasite/sınırlama bilinmemesi", "Süresi bitmiş medical"],
      ),
      question(
        "Son 24 saatlik gerçek çalışmanızı bu dinlenme kaydıyla nasıl uzlaştırırsınız?",
        "Kayıt; vardiya, bakım, manevra, drill ve çağrıları içermeli; istisna varsa gerekçe ve telafi gösterilmelidir.",
        ["Work/rest record", "Deck/engine log", "Drill record", "Port log"],
        ["Çelişkili saatler", "Önceden doldurma", "Personelin kaydı açıklayamaması"],
      ),
      question(
        "Hangi durumda vardiyayı devralmaz ve kaptanı/başmühendisi çağırırsınız?",
        "Kişi; fit-for-duty, trafik/hava, ekipman arızası, talimat belirsizliği ve emniyet şüphesi gibi gemiye özgü kriterleri söylemelidir.",
        ["Standing orders", "SMS watchkeeping procedure", "Risk assessment"],
        ["Sadece 'gerektiğinde' cevabı", "Standing order içeriğinin bilinmemesi"],
      ),
    ],
    terms: [
      term("COC", "Belirli bir kapasitede görev yapma yeterliğini gösteren Certificate of Competency."),
      term("COP", "Belirli eğitim veya yeterlik standardının karşılandığını gösteren Certificate of Proficiency."),
      term("Endorsement", "Bir idarenin belgeyi düzenlemesi veya başka tarafın belgesini tanımasıyla ilgili resmî onay."),
      term("Fit for duty", "Belge sahibi olmanın ötesinde, yorgunluk/sağlık/alkol-ilaç etkisi bakımından görevi emniyetle yapabilir durumda olma."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – STCW Convention", href: "https://www.imo.org/en/ourwork/humanelement/pages/stcw-conv-link.aspx" },
      { label: "IMO – STCW kapsamlı gözden geçirme", href: "https://www.imo.org/en/mediacentre/hottopics/pages/comprehensive-review-of-the-stcw-convention-and-code-faqs.aspx" },
    ]),
  },

  mlc: {
    learningObjectives: [
      "MLC'nin beş başlığını gemiadamının işe girişinden repatriation ve şikâyet hakkına kadar bir yaşam döngüsü olarak okumak",
      "SEA, DMLC, ücret, work/rest, sağlık ve yaşam koşulu kayıtlarını birlikte doğrulamak",
      "Onboard complaint prosedürünü misilleme korkusu olmadan erişilebilir kılmak",
      "Bayrak denetimi, MLC sertifikası ve PSC arasındaki ilişkiyi açıklamak",
    ],
    operationalRequirements: [
      requirement(
        "SEA, ücret ve repatriation hakları",
        "MLC Titles 1-2",
        "Her gemiadamının anlaşılır ve imzalı Seafarers' Employment Agreement'ı bulunmalı; ücret, izin, fesih ve repatriation hakları sözleşme ve bayrak uygulamasına uygun yürütülmelidir.",
        "Çalışma ilişkisi yalnızca bir personel dosyası değildir; gemiadamının hangi koşullarda çalıştığını, ücretini ve eve dönüş güvencesini bilmesi gerekir.",
        ["SEA ve varsa CBA", "Aylık wage account/allotment kayıtları", "Repatriation financial security belgesi", "Crew list"],
        ["Kaptan", "Şirket/crewing", "Gemiadamı", "Bayrakta tanımlanan yetkili kişi"],
        [
          "SEA kopyasının gemiadamında bulunduğunu doğrula",
          "Ücret hesabını SEA/CBA ve banka/allotment kaydıyla karşılaştır",
          "Financial security belgesinin erişilebilir ve geçerli olduğunu kontrol et",
        ],
        "İmzalı SEA bulunurken gemiadamının kopyasının olmaması, ücret kalemlerini açıklayamaması veya financial security bilgisinin erişilememesi",
      ),
      requirement(
        "Çalışma/dinlenme ve gerçek kayıt",
        "MLC Regulation 2.3 ve Standard A2.3",
        "Çalışma veya dinlenme sınırları bayrak uygulamasına göre izlenmeli; posted schedule ve bireysel kayıtlar gerçek operasyonu yansıtmalı ve gemiadamına onaylı kopya verilmelidir.",
        "Aşırı çalışma hem çalışma hakkı ihlali hem de seyir/makine emniyeti riskidir; STCW ile aynı olay iki ayrı uyum boyutunda incelenebilir.",
        ["Table of shipboard working arrangements", "Bireysel work/rest record", "İstisna/telafi kaydı", "Port/manevra/drill logları"],
        ["Kaptan", "Departman amirleri", "Her gemiadamı", "Şirket"],
        [
          "Rastgele günleri logbook ve work/rest kaydıyla eşleştir",
          "Gemiadamının kaydı görüp onayladığını doğrula",
          "Sistematik fazla mesai için manning ve iş planını yeniden değerlendir",
        ],
        "Kayıtların kalıp olarak tekrarlanması, personelin gerçek çalışma saatleriyle uyuşmaması veya şikâyet sonrası değiştirilmesi",
      ),
      requirement(
        "Yaşam, sağlık, iaşe ve şikâyet mekanizması",
        "MLC Titles 3-5",
        "Konaklama, gıda/su, gemide sağlık ve güvenlik, tıbbi bakım ve şikâyet prosedürü; fiziksel koşul, düzenli kontrol ve erişilebilir kayıtlarla sürdürülmelidir.",
        "MLC uygunluğu sadece sertifika dosyası değildir; mürettebatın günlük yaşadığı kamarada, galleyde, revirde ve güvenli çalışma düzeninde görünür.",
        ["Accommodation/galley inspection kayıtları", "Food ve potable water kayıtları", "Medical chest/hospital kayıtları", "Onboard complaint procedure"],
        ["Kaptan", "Baş zabit", "Aşçı/kamarot sorumlusu", "Emniyet temsilcisi", "Şirket"],
        [
          "Rastgele yaşam mahallerini kayıtlarla birlikte dolaş",
          "Gemiadamına şikâyeti gemi içinde ve dışarıda kime ileteceğini sor",
          "Düzeltici faaliyetlerin misilleme olmadan kapatıldığını doğrula",
        ],
        "Denetim günü temizlenen mahaller, tekrar eden hijyen/haşere sorunu veya personelin şikâyet kanalını bilmemesi",
      ),
    ],
    inspectionQuestions: [
      question(
        "SEA'nızın bir kopyası sizde mi ve ücret/izin/repatriation koşullarınızı açıklayabilir misiniz?",
        "Gemiadamı belgeyi erişilebilir biçimde gösterebilmeli ve temel koşulları kendi sözleriyle açıklayabilmelidir.",
        ["SEA", "CBA", "Wage account", "Financial security notice"],
        ["Belge yalnız kaptanda", "Boş/imzasız alan", "Fiilî ücretle sözleşme farkı"],
      ),
      question(
        "Şikâyetinizi kaptanı atlayarak kime ve nasıl iletebilirsiniz?",
        "Personel, misillemeye karşı koruma dâhil gemi içi basamakları ve bayrak/shore iletişim ayrıntılarını bilmelidir.",
        ["Onboard complaint procedure", "Posted contact details", "DMLC Part II"],
        ["Sadece sözlü zincir", "Dış iletişim bilgisi yok", "Şikâyet edenin cezalandırılacağı algısı"],
      ),
      question(
        "Son accommodation veya galley kontrolünde hangi bulgu çıktı ve nasıl kapatıldı?",
        "Kayıt, fiziksel bulgu, sorumlu, son tarih ve tekrar kontrolünü göstermelidir.",
        ["Inspection checklist", "Corrective action", "Photo/receipt gerektiğinde", "Pest-control veya water-test kaydı"],
        ["Her seferinde 'no deficiency'", "Fiilî durumla uyumsuz kayıt"],
      ),
    ],
    terms: [
      term("SEA", "Gemiadamı ile armatör/işveren arasındaki çalışma koşullarını belirleyen Seafarers' Employment Agreement."),
      term("DMLC", "Bayrak gerekleri ile şirketin bunları gemide nasıl sürekli uyguladığını gösteren Maritime Labour Compliance beyanı."),
      term("CBA", "Toplu iş sözleşmesi; SEA tarafından atıf yapıldığında çalışma koşullarının parçası olabilir."),
      term("Repatriation", "Belirli koşullarda gemiadamının masrafları karşılanarak ülkesine/kararlaştırılmış yere dönüş hakkı."),
    ],
    sourceStatus: sourceStatus([
      { label: "ILO – Maritime Labour Convention, 2006", href: "https://www.ilo.org/international-labour-standards/maritime-labour-convention-2006" },
      { label: "ILO – 2025'te kabul edilen MLC değişiklikleri", href: "https://www.ilo.org/resource/other/text-amendments-adopted-11-april-2025" },
    ]),
  },

  colreg: {
    learningObjectives: [
      "Kuralları gemi tipi ezberinden önce görüş şartı, risk değerlendirmesi ve sorumluluk sırasıyla uygulamak",
      "Radar/AIS/ARPA bilgisini görsel ve işitsel gözcülüğün yerine koymadan çapraz kontrol etmek",
      "Kaçınma hareketini erken, belirgin ve diğer gemi tarafından anlaşılır şekilde planlamak",
      "Stand-on geminin sorumluluğunun hiçbir zaman pasif beklemek anlamına gelmediğini açıklamak",
    ],
    operationalRequirements: [
      requirement(
        "Gözcülük, emniyetli hız ve çatışma riskinin tayini",
        "COLREG Rules 5-8",
        "Her görüş koşulunda uygun görsel/işitsel gözcülük ve mevcut tüm araçlarla durum değerlendirmesi yapılmalı; hız, riskin zamanında anlaşılması ve etkili kaçınma manevrası için emniyetli olmalıdır.",
        "CPA/TCPA tek başına karar değildir. Sensör hatası, hedef swapı, küçük temas, sığ su, manevra kabiliyeti ve görüş koşulu kararın güvenilirliğini değiştirir.",
        ["Bridge logbook", "Master's standing orders", "Radar plotting/ARPA trail", "Passage plan ve manning düzeni"],
        ["Kaptan", "Vardiya zabiti", "Gözcü", "Kılavuz kaptanla birlikte bridge team"],
        [
          "Teması radar, görsel kerteriz ve AIS bilgisiyle çapraz kontrol et",
          "Emniyetli hız faktörlerini mevcut durum üzerinden açıklat",
          "Şüphe varsa çatışma riski var kabul edildiğini doğrula",
        ],
        "AIS statüsüne güvenerek görsel/radar değerlendirmeyi bırakmak veya az radar bilgisiyle risk yok varsaymak",
      ),
      requirement(
        "Karşılaşma durumunu doğru sınıflandırma",
        "COLREG Rules 9-10 ve 11-18",
        "Dar kanal, TSS, pruva pruvaya, aykırı geçiş ve yetişme durumları; görüş şartı ve gemilerin gerçek statüleriyle birlikte sınıflandırılmalı, uygun sorumluluk uygulanmalıdır.",
        "Yanlış sınıflandırma, doğru görünen bir manevrayı kural ihlaline çevirebilir. Özellikle 'overtaking' şüphesinde yetişen gemi kabulü ve restricted visibility ayrımı kritiktir.",
        ["Passage plan/TSS notları", "Bridge team briefing", "Logbook", "VDR olay verisi gerektiğinde"],
        ["Kaptan", "Vardiya zabiti", "Gözcü"],
        [
          "Temasın nispi kerteriz ve görünüşünü zaman içinde değerlendir",
          "Gemi statüsünü ışık/şekil, gündüz/gece ve operasyonla doğrula",
          "Rule 19 koşullarında Rules 11-18 terminolojisini otomatik uygulamaktan kaçın",
        ],
        "AIS navigational status veya tek anlık kerterizle karşılaşma türünü belirlemek",
      ),
      requirement(
        "Kaçınma hareketi ve son savunma hattı",
        "COLREG Rules 8, 16-17 ve 19",
        "Kaçınma manevrası erken, geniş ve açık olmalı; güvenli geçiş oluşana kadar etkisi izlenmeli. Stand-on gemi, give-way geminin uygun hareket etmediği durumda kendi yükümlülüklerini zamanında uygulamalıdır.",
        "Kuralın amacı haklı çıkmak değil çatışmayı önlemektir. İletişim veya diğer geminin beklenen hareketi, kendi sürekli risk değerlendirmesinin yerini alamaz.",
        ["Radar/ARPA izleri", "Bridge logbook", "VDR", "Master call ve helm/engine order kayıtları"],
        ["Kaptan", "Vardiya zabiti", "Dümenci"],
        [
          "Manevra öncesi ve sonrası CPA/TCPA trendini izle",
          "Küçük ardışık rota değişimleri yerine belirgin hareket seçildiğini değerlendir",
          "Kaptanı çağırma ve gerekirse elle dümen/ana makine kullanımını geciktirme",
        ],
        "VHF'de anlaşmaya güvenmek, küçük ve belirsiz rota değişiklikleri yapmak veya stand-on statüsünü eylemsizlik gerekçesi saymak",
      ),
    ],
    inspectionQuestions: [
      question(
        "Bu temasta çatışma riskini hangi bağımsız yöntemlerle belirlediniz?",
        "Zabit; görsel kerteriz, radar plotting/ARPA, hedef hareket trendi ve çevresel koşulları birlikte anlatmalıdır.",
        ["Radar ekranı/trail", "Görsel kerteriz", "Bridge log", "AIS yalnız destekleyici"],
        ["Yalnız AIS CPA", "Tek gözlem", "Hedef verisini doğrulamama"],
      ),
      question(
        "Stand-on gemi olarak ne zaman ve neden harekete geçersiniz?",
        "Rule 17'nin may/must aşamaları, mevcut mesafe/zaman, diğer geminin eylemi ve çatışmadan kaçınmak için gereken son manevra açıklanmalıdır.",
        ["COLREG referansı", "Standing orders", "Senaryo plotu"],
        ["'Hiç rota değiştirmem' cevabı", "Kaptan çağrısını geciktirme"],
      ),
      question(
        "Kısıtlı görüşte bu hedef için hangi manevradan özellikle kaçınırsınız?",
        "Rule 19(d) dikkate alınarak hedefin pruva kemeresi/abaft beam konumu ve mevcut koşullar açıklanmalıdır.",
        ["Radar plot", "Restricted visibility checklist", "Sound signal readiness"],
        ["Görüş içi kuralları otomatik uygulama", "Radar plotting yapmama"],
      ),
    ],
    terms: [
      term("Risk of collision", "Kerterizin kayda değer biçimde değişmemesi başta olmak üzere tüm mevcut araçlarla değerlendirilen çatışma riski.", "Şüphe varsa risk var kabul edilir."),
      term("Stand-on vessel", "Genel olarak rota ve hızını koruyan gemi; ancak Rule 17 kapsamındaki müdahale yükümlülükleri devam eder."),
      term("Give-way vessel", "Diğer geminin yolundan erken ve belirgin biçimde çıkması gereken gemi."),
      term("Restricted visibility", "Sis, pus, kar, şiddetli yağış, kum fırtınası veya benzeri nedenle görüşün kısıtlandığı durum."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – COLREG Convention", href: "https://www.imo.org/en/about/conventions/pages/colreg.aspx" },
      { label: "IMO – Preventing collisions", href: "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx" },
    ]),
  },

  bwm: {
    learningObjectives: [
      "D-1 değişim standardı ile D-2 performans standardını ve gemiye uygulanabilir rejimi ayırmak",
      "Ballast Water Management Plan, Record Book, Certificate ve BWMS operasyonunu tek kanıt zinciri olarak yönetmek",
      "Bypass, contingency, uptake/discharge ve sediment işlemlerini eksiksiz kaydetmek",
      "Port State örneklemesinde ekipman, kayıt ve mürettebat yeterliliğinin birlikte değerlendirildiğini açıklamak",
    ],
    operationalRequirements: [
      requirement(
        "Gemiye özgü plan, kayıt ve sertifika",
        "BWM Convention Regulations B-1, B-2 ve E-2",
        "Onaylı Ballast Water Management Plan geminin gerçek boru devresi ve BWMS'iyle uyumlu olmalı; her ballast operasyonu Record Book'a kaydedilmeli ve uygulanabilir sertifika geçerli tutulmalıdır.",
        "Kopya/genel plan, gemideki valf sırası veya treatment limitlerini karşılamıyorsa acil durumda güvenilir değildir ve denetimde fiilî sistemle çelişir.",
        ["Approved BWMP", "BWRB", "International BWM Certificate", "P&ID ve BWMS type-approval dokümanı"],
        ["Kaptan", "Baş zabit", "Ballast operasyonundan sorumlu zabit", "Başmühendis/ETO"],
        [
          "Plan üzerindeki tank/valf/sampling pointleri sahada doğrula",
          "BWRB'yi ballast log ve tank soundingleriyle uzlaştır",
          "Certificate ve type-approval limitationlarını kontrol et",
        ],
        "Planın sister ship kopyası olması veya kayıtların tank hareketleri/BWMS trendleriyle uyuşmaması",
      ),
      requirement(
        "BWMS'in treatment limitleri içinde işletilmesi",
        "BWM Convention Regulation D-2 ve BWMS Code",
        "BWMS; type-approval ve üretici limitleri içinde, doğru flow/UV dose veya kimyasal parametrelerle çalıştırılmalı; alarm, bypass ve arıza durumları prosedüre göre yönetilmelidir.",
        "Sistem 'running' gösterse bile treatment performansı garanti değildir. Limit dışı su kalitesi, sensör arızası veya yüksek debi D-2 uyumunu etkileyebilir.",
        ["BWMS operation log/trend", "Alarm ve bypass kayıtları", "Calibration/maintenance kayıtları", "Consumable/neutralizer kayıtları"],
        ["Baş zabit", "Sorumlu güverte zabiti", "Başmühendis", "ETO"],
        [
          "Son operasyon trendini type-approval limitleriyle karşılaştır",
          "Bypass valfi ve alarm geçmişini incele",
          "Arıza halinde port/flag/company bildirim ve contingency adımlarını açıklat",
        ],
        "Alarmın resetlenip nedeninin araştırılmaması, kayıt dışı bypass veya debi artırmak için treatmentın etkisizleştirilmesi",
      ),
      requirement(
        "Örnekleme, contingency ve sediment yönetimi",
        "BWM Convention Sections C-D ve ilgili IMO Guidelines",
        "Numune alma noktaları erişilebilir tutulmalı; BWMS uyumsuzluğu veya arızasında onaylı contingency tedbirleri ve limanla iletişim uygulanmalı; sediment planlı şekilde yönetilmelidir.",
        "Arıza anında doğaçlama deşarj kararı, biyolojik ve hukuki riski büyütür. Önceden belirlenmiş seçenekler port State ile zamanında koordine edilmelidir.",
        ["Sampling point planı", "Contingency procedure", "Port notification", "Sediment removal/disposal kayıtları"],
        ["Kaptan", "Baş zabit", "Şirket operasyon/çevre birimi"],
        [
          "Sampling point erişimini ve etiketini kontrol et",
          "Arıza senaryosunu liman gereklilikleriyle masa başında çalış",
          "Sediment faaliyetini tank bakım ve teslim kayıtlarıyla eşleştir",
        ],
        "Arıza limana geç bildirilmesi, örnekleme noktasının erişilemez olması veya sediment bertarafının kayıtsız kalması",
      ),
    ],
    inspectionQuestions: [
      question(
        "Son ballast discharge sırasında BWMS'in D-2'yi sağlayacak limitlerde çalıştığını nasıl gösterirsiniz?",
        "Operasyon kaydı, trend/alarmlar, debi ve treatment parametreleri, kalibrasyon ve BWRB girdisi birlikte gösterilmelidir.",
        ["BWRB", "BWMS trend/alarm log", "Type-approval limitation", "Calibration record"],
        ["Eksik trend", "Açıklanamayan bypass", "Saat/miktar tutarsızlığı"],
      ),
      question(
        "BWMS limana varmadan arızalanırsa hangi sırayla hareket edersiniz?",
        "Operasyonu emniyete alma, kaptan/şirket bildirimi, BWMP contingency seçenekleri, port State ile önceden koordinasyon ve tam kayıt anlatılmalıdır.",
        ["BWMP contingency section", "Company contact", "Port reporting form"],
        ["Önce deşarj edip sonra bildirme", "Plan dışı kimyasal/işlem"],
      ),
      question(
        "Numune nereden ve emniyetli biçimde nasıl alınır?",
        "Personel sampling pointi sahada gösterebilmeli, erişim/pressure riskini ve temsilî numune koşullarını açıklamalıdır.",
        ["Sampling plan", "Risk assessment", "PPE/procedure"],
        ["Noktanın bulunamaması", "Körlenmiş/erişilemez bağlantı"],
      ),
    ],
    terms: [
      term("D-1", "Belirlenen koşullarda ballast suyu değişimiyle organizma transferini azaltan değişim standardı."),
      term("D-2", "Deşarj edilen ballast suyunda canlı organizma ve gösterge mikropları için performans standardı."),
      term("BWMS", "Ballast suyunu D-2 standardına ulaşmak amacıyla arıtan Ballast Water Management System."),
      term("Bypass", "Suyun treatment prosesinin tamamı veya bir kısmından geçmeden yönlendirilmesi; her kullanım gerekçeli ve kayıtlı olmalıdır."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – Ballast Water Management", href: "https://www.imo.org/en/ourwork/environment/pages/ballastwatermanagement.aspx" },
      { label: "IMO – BWM Convention and Guidelines", href: "https://www.imo.org/en/ourwork/environment/pages/bwmconventionandguidelines.aspx" },
    ]),
  },

  "ism-code": {
    learningObjectives: [
      "SMS'i doküman klasörü değil, riskleri kontrol eden yaşayan bir yönetim sistemi olarak değerlendirmek",
      "Şirket-kaptan-departman zincirinde yetki, raporlama ve shore support sorumluluklarını ayırmak",
      "Non-conformity, near miss, audit ve management review verisini sürekli iyileştirmeye dönüştürmek",
      "Kritik ekipman bakımında arıza, geçici tedbir, yedeklilik ve doğrulama zincirini kurmak",
    ],
    operationalRequirements: [
      requirement(
        "Kontrollü SMS ve gemiye özgü prosedür",
        "ISM Code Sections 1, 6 ve 11",
        "SMS prosedürleri geminin operasyonuna uygun, erişilebilir ve kontrollü revizyonda olmalı; personel kendi işiyle ilgili prosedürü anlayıp uygulayabilmelidir.",
        "Aşırı genel veya kopyalanmış prosedür, sahadaki riski kontrol etmez. Denetim belgenin varlığından çok uygulama ile tutarlılığa odaklanır.",
        ["Controlled SMS manual", "Revision/distribution list", "Familiarization kayıtları", "Gemiye özgü checklistler"],
        ["Şirket", "DPA", "Kaptan", "Departman amirleri", "Tüm personel"],
        [
          "Prosedür ile gerçek ekipman/iş akışını sahada karşılaştır",
          "Eski/kontrolsüz kopyaları kaldır",
          "Rastgele personele kendi kritik görevini senaryoyla açıklat",
        ],
        "Prosedürün sister ship veya eski ekipmana ait olması; personelin yalnız imza atmış, içeriği uygulayamıyor olması",
      ),
      requirement(
        "Risk değerlendirmesi ve operasyon kontrolü",
        "ISM Code Sections 1.2, 7 ve 8",
        "Rutin olmayan ve yüksek riskli işler; tehlike, bariyer, sorumlu, stop-work kriteri ve değişen koşullar dikkate alınarak işe özgü planlanmalıdır.",
        "Genel risk assessment formu, işi yapan ekibin ortak zihinsel modelini kurmadıkça kazayı önlemez.",
        ["Task-specific risk assessment", "Permit to work", "Toolbox talk", "LOTO/isolation planı"],
        ["İşi yöneten zabit/mühendis", "İş ekibi", "Kaptan/başmühendis"],
        [
          "Tehlike-bariyer-sorumlu ilişkisini ekipten dinle",
          "Koşul değiştiğinde dynamic risk assessment yapıldığını doğrula",
          "Permit kapanışında izolasyonların ve sistemin normalleştiğini kontrol et",
        ],
        "İş adı değiştirilmiş standart form, gerçek izolasyonun formdan farklı olması veya stop-work yetkisinin bilinmemesi",
      ),
      requirement(
        "Uygunsuzluk, kaza ve bakım geri beslemesi",
        "ISM Code Sections 9, 10 ve 12",
        "Kaza, near miss, non-conformity ve kritik ekipman arızaları raporlanmalı; kök neden, düzeltici/önleyici faaliyet ve etkinlik kontrolüyle kapatılmalıdır.",
        "Bulgunun yalnız kapatılması aynı olayın tekrarını önlemez. Yönetim sisteminin öğrenmesi için neden ve bariyer başarısızlığı filoya geri beslenmelidir.",
        ["NC/near-miss raporu", "Root-cause analysis", "PMS defect/deferment", "Internal audit ve effectiveness review"],
        ["Kaptan", "Başmühendis", "DPA", "Şirket teknik/HSQE", "İlgili ekip"],
        [
          "Faaliyetin yalnız tamamlanmasını değil tekrar riskini azalttığını doğrula",
          "Kritik arızada geçici tedbir ve shore support onayını kontrol et",
          "Benzer gemilere lesson learned yayıldığını doğrula",
        ],
        "Semptomu onarıp kök nedeni kapatmamak; gecikmiş işi gerekçesiz ertelemek; near miss raporlamasını cezalandırmak",
      ),
    ],
    inspectionQuestions: [
      question(
        "Son near miss hangi SMS değişikliğine veya bariyer güçlendirmesine yol açtı?",
        "Olay, kök neden, faaliyet, sorumlu, son tarih, etkinlik kontrolü ve fleet feedback gösterilmelidir.",
        ["Near-miss report", "CAPA", "Revised procedure/RA", "Effectiveness review"],
        ["Sadece 'personel uyarıldı'", "Kök neden yok", "Etkinlik kontrolü yok"],
      ),
      question(
        "Bu kritik ekipman arızası açıkken gemi neden emniyetli sayılıyor?",
        "Risk, yedeklilik, geçici kontrol, bayrak/klas/şirket bildirimi ve kalıcı onarım planı açıklanmalıdır.",
        ["Defect report", "Risk assessment", "Dispensation/condition gerektiğinde", "Repair plan"],
        ["Arıza kayıt dışı", "Tek bariyer", "Bitiş tarihi/sorumlu yok"],
      ),
      question(
        "DPA'ya hangi durumda doğrudan ulaşırsınız?",
        "Personel emniyet/çevre konusunda shore management desteğine ihtiyaç duyduğu durumları ve güncel iletişim yolunu bilmelidir.",
        ["SMS contact page", "Posted DPA details", "Drill/familiarization record"],
        ["DPA'nın kim olduğunun bilinmemesi", "İletişimin yalnız kaptan üzerinden mümkün sanılması"],
      ),
    ],
    terms: [
      term("SMS", "Şirket ve geminin emniyet/çevre politikasını uygulayan yapılandırılmış Safety Management System."),
      term("DPA", "Gemi ile en üst yönetim arasında doğrudan bağlantı kuran ve yeterli shore support sağlayan Designated Person Ashore."),
      term("Non-conformity", "Belirlenmiş bir gerekliliğin karşılanmadığını gösteren gözlemlenmiş durum."),
      term("Objective evidence", "Bir şartın uygulanıp uygulanmadığını gösteren doğrulanabilir kayıt, gözlem veya ifade."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – ISM Code", href: "https://www.imo.org/en/ourwork/humanelement/pages/ismcode.aspx" },
      { label: "IMO – Safety management and safety culture", href: "https://www.imo.org/en/ourwork/humanelement/pages/safetymanagement-default.aspx" },
    ]),
  },

  "isps-code": {
    learningObjectives: [
      "Safety ile security arasındaki farkı ve SOLAS XI-2/ISPS ilişkisinin zorunlu yapısını açıklamak",
      "Security level değişikliğini access control, restricted area ve watch düzenine dönüştürmek",
      "SSO-CSO-PFSO iletişim zinciri ile Declaration of Security ihtiyacını değerlendirmek",
      "SSP'nin gizliliğini korurken mürettebatın kendi görevini bilmesini sağlamak",
    ],
    operationalRequirements: [
      requirement(
        "Security level ve erişim kontrolü",
        "SOLAS Chapter XI-2 ve ISPS Code Part A",
        "Gemi, bildirilen security level için SSP'de tanımlı erişim, ziyaretçi, bagaj, stores ve restricted area kontrollerini gecikmeden uygulamalıdır.",
        "Security level bir tabela değildir; personel, vardiya, kontrol sıklığı ve fiziksel bariyerlerde ölçülebilir değişiklik üretmelidir.",
        ["Security logbook", "Visitor/contractor log", "Access-point roster", "Security level message ve implementation record"],
        ["Kaptan", "SSO", "Güvenlik vardiyası", "Tüm personel"],
        [
          "Mevcut level için açık erişim noktalarını SSP ile karşılaştır",
          "Rastgele ziyaretçi kaydını kimlik/refakat/çıkış zinciriyle izle",
          "Restricted area kilit ve devriyesini sahada doğrula",
        ],
        "Security level değiştiği halde manning, devriye veya access controlün değişmemesi",
      ),
      requirement(
        "SSP, görevler ve haberleşme",
        "ISPS Code Sections 9-13",
        "Onaylı SSP kontrollü ve korunmuş tutulmalı; SSO, CSO ve gemi personeli kendi yetki/görevlerini, olay bildirimini ve SSAS ile ilgili gizlilik sınırlarını bilmelidir.",
        "Planın gizli olması personelin görevini bilmemesi anlamına gelmez; yalnız hassas ayrıntılar need-to-know esasına göre korunur.",
        ["Approved SSP ve revision record", "SSO certificate", "Training/drill records", "CSO/PFSO contact details"],
        ["Şirket/CSO", "Kaptan", "SSO", "Departman sorumluları"],
        [
          "Plan revizyonu ve onay durumunu kontrol et",
          "Personelin kendi level-specific görevini açıklamasını iste",
          "Güvenlik olayında CSO/PFSO ve otorite bildirim sırasını doğrula",
        ],
        "SSP'nin kontrolsüz kopyalanması veya gizlilik gerekçesiyle personelin temel görevlerden habersiz bırakılması",
      ),
      requirement(
        "Tatbikat, DoS ve güvenlik olayına müdahale",
        "ISPS Code Sections 13 ve 5",
        "Drill/exercise programı farklı tehditleri ve arayüzleri test etmeli; gerektiğinde Declaration of Security ile gemi-liman veya gemi-gemi sorumlulukları açıkça paylaşılmalıdır.",
        "İki tarafın aynı işi yaptığını varsayması kadar, bir kontrolün hiç kimse tarafından yapılmadığı boşluklar da güvenlik riski yaratır.",
        ["Security drill/exercise report", "Declaration of Security", "Port pre-arrival security exchange", "Corrective action"],
        ["Kaptan", "SSO", "CSO", "PFSO ve ilgili gemi temsilcisi"],
        [
          "Tatbikatın alarmdan raporlamaya kadar zaman çizelgesini değerlendir",
          "DoS'ta her kontrolün sorumlusunu ve süresini doğrula",
          "Önceki güvenlik bulgusunun kapanış etkinliğini test et",
        ],
        "Tatbikatların aynı senaryoyla kâğıt üzerinde tekrarlanması veya DoS imzalanıp fiilî sorumlulukların uygulanmaması",
      ),
    ],
    inspectionQuestions: [
      question(
        "Security Level 2 ilan edilirse ilk 30 dakikada ne değişir?",
        "Gemiye özgü SSP önlemleri; access point, devriye, arama, stores ve iletişim sorumluları üzerinden anlatılmalıdır.",
        ["SSP ilgili bölümü", "Manning/roster", "Security log"],
        ["Level tanımını söyleyip somut değişiklik gösterememe"],
      ),
      question(
        "Bu limanda Declaration of Security neden gerekli veya neden gerekli değil?",
        "Risk, level farkı, tesis durumu, önceki olay ve idare/SSP kriterleri dikkate alınmalıdır.",
        ["Pre-arrival exchange", "DoS", "Port facility bilgisi", "SSP kriteri"],
        ["Her limanda otomatik aynı cevap", "Sorumluların belirsizliği"],
      ),
      question(
        "Şüpheli paket bulduğunuzda ilk eylemleriniz nelerdir?",
        "Dokunmama/alanı izole etme, güvenli bildirim, SSP zinciri ve uzman talimatını bekleme gemiye özgü anlatılmalıdır.",
        ["Security procedure", "Contact list", "Drill record"],
        ["Paketi taşıma/açma", "SSO'yu atlayarak kontrolsüz alarm"],
      ),
    ],
    terms: [
      term("SSP", "Gemi güvenlik değerlendirmesine dayanan, onaylı Ship Security Plan."),
      term("SSO", "SSP'nin gemide uygulanmasından sorumlu Ship Security Officer."),
      term("DoS", "Belirli bir arayüzde güvenlik sorumluluklarının taraflar arasında paylaşıldığı Declaration of Security."),
      term("Restricted area", "Yetkisiz erişime karşı özel kontrol uygulanan gemi bölgesi."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – SOLAS XI-2 and ISPS Code", href: "https://www.imo.org/en/ourwork/security/pages/solas-xi-2%20isps%20code.aspx" },
    ]),
  },

  psc: {
    learningObjectives: [
      "PSC'nin bayrak devleti sorumluluğunun yerine geçmediğini, ikinci bir doğrulama katmanı olduğunu açıklamak",
      "Initial inspection, clear grounds, more detailed inspection ve detention aşamalarını ayırmak",
      "Belge, fiziksel durum, kayıt ve mürettebat yeterliliğini aynı uygunluk hikâyesinde birleştirmek",
      "Bulguya hızlı kozmetik cevap yerine kök neden ve sürdürülebilir kapanış kanıtı hazırlamak",
    ],
    operationalRequirements: [
      requirement(
        "Denetim öncesi kanıt bütünlüğü",
        "IMO Procedures for Port State Control ve uygulanabilir MoU rejimi",
        "Sertifika/record of equipment, logbook, planlı bakım, fiziksel ekipman ve mürettebat beyanı birbiriyle tutarlı olmalıdır.",
        "PSC'de en güçlü hazırlık kalın bir dosya değil, geminin fiilî durumuyla kayıtların aynı gerçeği göstermesidir.",
        ["Statutory certificates", "Survey status", "PMS overdue/defect list", "Drill ve work/rest kayıtları"],
        ["Kaptan", "Başmühendis", "Baş zabit", "Tüm departmanlar", "Şirket"],
        [
          "Son PSC/flag/class bulgularını ve tekrar riskini gözden geçir",
          "Kritik ekipmanı kayıt sahibinden bağımsız olarak test et",
          "Rastgele kayıtları logbook, sayaç ve personel beyanıyla çapraz kontrol et",
        ],
        "Denetim için oluşturulmuş ayrı dosyanın gerçek PMS, log veya fiziksel durumla çelişmesi",
      ),
      requirement(
        "Clear grounds oluşmasını önleme ve doğru karşılama",
        "IMO PSC inspection framework",
        "Eksik belge, kötü genel durum, alarm/ekipman arızası veya mürettebatın temel operasyonu gösterememesi gibi emareler ayrıntılı denetimi tetikleyebileceğinden ilk temas profesyonel ve şeffaf yönetilmelidir.",
        "Bir eksikliği gizlemeye çalışmak güveni ve denetim kapsamını kötüleştirir. Bilinen arızanın risk yönetimi ve resmî bildirimi hazır olmalıdır.",
        ["Pre-arrival checklist", "Open defect list", "Risk assessment/dispensation", "Crew briefing record"],
        ["Kaptan", "PSC liaison olarak atanan zabit", "Departman amirleri"],
        [
          "Belge ve escort sorumlularını önceden belirle",
          "Bilinen arızanın statü, tedbir ve onarım planını tek kaynaktan sun",
          "Personelin ezber değil kendi görevini gösterebildiğini doğrula",
        ],
        "Denetçiye farklı kişilerden çelişkili bilgi verilmesi veya bilinen arızanın saklanması",
      ),
      requirement(
        "Bulgu, detention ve sürdürülebilir kapanış",
        "IMO deficiency and detention principles",
        "Her bulgu; immediate correction, root cause, kapsam analizi ve preventive action ile ele alınmalı; gerektiğinde bayrak/klas onayı ve follow-up inspection tamamlanmalıdır.",
        "Tek ekipmanı onarmak, sistemik neden diğer benzer ekipman veya prosedürde duruyorsa tekrar bulguyu önlemez.",
        ["Deficiency notice", "Corrective/preventive action", "Class/flag correspondence", "Repair/service evidence ve effectiveness check"],
        ["Kaptan", "Şirket/DPA/teknik birim", "Başmühendis/baş zabit", "Bayrak/klas gerektiğinde"],
        [
          "Aynı kök nedenden etkilenebilecek diğer ekipmanı tarat",
          "Kapanışın otorite beklentisini karşıladığını doğrula",
          "Fleet-wide lesson learned ve prosedür/PMS değişikliğini değerlendir",
        ],
        "Yalnız fotoğraf veya servis fişi sunup kök neden, kapsam ve tekrar önleme kanıtı göstermemek",
      ),
    ],
    inspectionQuestions: [
      question(
        "Son PSC veya iç denetim bulgusunun tekrar etmediğini nasıl kanıtlarsınız?",
        "Kök neden, filo/gemi kapsamı, CAPA, sorumlu/tarih ve etkinlik doğrulaması gösterilmelidir.",
        ["Önceki report", "CAPA", "PMS/procedure revision", "Effectiveness check"],
        ["Aynı eksikliğin yeniden çıkması", "Sadece ekipman değişimi"],
      ),
      question(
        "Açık durumdaki bu arızayı neden denize elverişliliğe engel görmüyorsunuz?",
        "Uygulanabilir kural, risk, yedeklilik, geçici tedbir, resmî onay ve kalıcı onarım planı sunulmalıdır.",
        ["Defect list", "Risk assessment", "Flag/class acceptance", "Repair ETA"],
        ["Kayıt dışı arıza", "Onaysız geçici çözüm", "Tek kişiye bağlı kontrol"],
      ),
      question(
        "Rastgele seçilen personel acil durum görevini ve ekipmanını gösterebilir mi?",
        "Muster görevi, alarm, toplanma yeri, PPE, iletişim ve ilk eylemler gemiye özgü gösterilmelidir.",
        ["Muster list", "Familiarization", "Drill record", "Sahadaki ekipman"],
        ["Ezberlenmiş ama sahada gösterilemeyen cevap", "Dil/iletişim engeli"],
      ),
    ],
    terms: [
      term("Initial inspection", "Sertifika, genel durum ve temel uyum göstergelerinin ilk değerlendirmesi."),
      term("More detailed inspection", "Clear grounds bulunduğunda belirli alanlarda kapsamı genişletilen denetim."),
      term("Detention", "Eksiklikler gemiyi, kişileri veya çevreyi açıkça tehlikeye attığında seferin engellenmesi."),
      term("Deficiency code", "PSC bulgusunun konu ve gerekli eylemle standart biçimde kaydedilmesini sağlayan kodlama."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – Port State Control", href: "https://www.imo.org/en/ourwork/iiis/pages/port-state-control.aspx" },
      { label: "IMO – List of Conventions", href: "https://www.imo.org/en/about/conventions/pages/listofconventions.aspx" },
    ]),
  },

  "imdg-code": {
    learningObjectives: [
      "Tehlikeli yükü UN number, proper shipping name, class/division, packing group ve subsidiary risk ile tanımlamak",
      "Doküman, ambalaj/IBC/tank, markalama/etiketleme, placard ve stowage/segregation zincirini doğrulamak",
      "Container/vehicle packing certificate ile gemi yükleme planı arasındaki sorumluluk sınırını açıklamak",
      "EmS ve MFAG bilgisini gerçek bir sızıntı/yangın senaryosunda kullanmak",
    ],
    operationalRequirements: [
      requirement(
        "Doğru sınıflandırma ve taşıma belgesi",
        "IMDG Code Parts 2, 3 ve 5",
        "Yük, Dangerous Goods List'e göre doğru tanımlanmalı; beyan, ambalaj onayı, miktar, marine pollutant ve özel hüküm bilgileri yükleme kararından önce doğrulanmalıdır.",
        "Yanlış proper shipping name veya gözden kaçan subsidiary risk, tüm stowage ve emergency response kararlarını hatalı hale getirir.",
        ["Dangerous goods declaration", "Container/vehicle packing certificate", "SDS destekleyici olarak", "DG manifest/special list"],
        ["Shipper", "Terminal", "Baş zabit/cargo officer", "Kaptan"],
        ["UN number ve PSN'i DGL ile doğrula", "Packing instruction/special provision kontrol et", "Manifest ile gerçek stow planı eşleştir"],
        "SDS'yi taşıma belgesi yerine kabul etmek veya ticari ürün adını proper shipping name sanmak",
      ),
      requirement(
        "Stowage, segregation ve yangın planı",
        "IMDG Code Part 7 ve SOLAS Chapter VII",
        "Tehlikeli yükler; gemi tipi, deck/underdeck şartı, foodstuffs, accommodation/machinery ve birbirleriyle uyumsuzlukları dikkate alınarak emniyetle istiflenip ayrılmalıdır.",
        "Tek tek her konteyner uygun olsa bile yanlış komşuluk veya havalandırma/ısı kaynağı toplam riski kabul edilemez düzeye çıkarabilir.",
        ["Approved DG stow plan", "Segregation check", "Cargo securing plan", "Fire plan ve reefer monitoring kayıtları"],
        ["Kaptan", "Baş zabit", "Cargo watch", "Terminal planner"],
        ["Segregation table ve DGL stowage codes birlikte kontrol et", "Gerçek bay/row/tier ile manifesti karşılaştır", "Acil erişim ve jettison/firefighting etkisini değerlendir"],
        "Yalnız yazılım sonucuna güvenmek, yanlış yük verisi veya son dakika restowunu bağımsız kontrol etmemek",
      ),
      requirement(
        "Acil müdahale bilgisinin erişilebilirliği",
        "IMDG Code Supplement – EmS Guide ve MFAG",
        "DG manifesti ve EmS/MFAG bilgisi; limanda ve denizde sorumlu kişilerin gecikmeden erişebileceği biçimde tutulmalı, olayda yükün konumu ve tehlikesi doğru iletilmelidir.",
        "Yangın/sızıntıda ilk dakikalar önemlidir; yanlış söndürme ajanı veya korumasız yaklaşma ikincil reaksiyonu büyütebilir.",
        ["DG manifest/special list", "EmS schedules", "MFAG", "Emergency contacts ve drill record"],
        ["Kaptan", "Baş zabit", "Yangın ekipleri", "GMDSS/bridge team"],
        ["Bir UN numarası üzerinden EmS ve PPE bilgisini buldur", "Yük yerini plan üzerinde göster", "Shore emergency communication mesajını prova et"],
        "Manifestin güncel stowdan farklı olması veya ekiplerin EmS bilgisini bulamaması",
      ),
    ],
    inspectionQuestions: [
      question("Bu konteynerin gemide tam olarak nerede ve neden orada olduğunu açıklayın.", "UN/PSN/class, stowage category, segregation ve operasyonel erişim birlikte açıklanmalıdır.", ["DG manifest", "Stow plan", "DGL"], ["Manifest-stow farkı", "Segregation gerekçesi yok"]),
      question("Bu yük yanarsa hangi EmS schedule uygulanır?", "Yangın ve spill schedule, PPE, uygun ajan ve özel risk gösterilmelidir.", ["EmS Guide", "Manifest", "Fire plan"], ["Yalnız SDS", "Yanlış ajan"]),
      question("Son dakika DG restowu kim tarafından nasıl doğrulandı?", "Değişiklik bağımsız segregation/stability/securing kontrolü ve güncel manifest üretmelidir.", ["Revision log", "Updated plan", "Terminal exchange"], ["Sözlü değişiklik", "Eski manifest"]),
    ],
    terms: [
      term("UN number", "Taşınan tehlikeli madde veya nesneyi uluslararası olarak tanımlayan dört haneli numara."),
      term("Proper Shipping Name", "Taşıma belgelerinde kullanılması gereken standart sevkiyat adı."),
      term("Subsidiary risk", "Ana sınıfa ek olarak dikkate alınması gereken ikincil tehlike."),
      term("EmS", "Gemide tehlikeli madde yangını ve sızıntısı için acil durum programları."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – Dangerous goods in packaged form", href: "https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx" },
    ]),
  },

  "imsbc-code": {
    learningObjectives: [
      "Group A, B ve C sınıflandırmasını yükün gerçek tehlikesiyle ilişkilendirmek",
      "TML, moisture content ve numune alma sertifikalarının yükleme kararındaki rolünü açıklamak",
      "Cargo declaration, schedule, trimming, bilge/ventilation ve monitoring gerekliliklerini yük bazında uygulamak",
      "Yağış veya yük özelliği değiştiğinde stop-work kararını gecikmeden vermek",
    ],
    operationalRequirements: [
      requirement(
        "Yük bilgisi ve doğru schedule",
        "SOLAS VI/2 ve IMSBC Code Sections 4 ve 1.3",
        "Shipper'ın yük bilgisi, Bulk Cargo Shipping Name ve uygulanabilir schedule yükleme öncesi doğrulanmalı; code'da listelenmeyen yük için yetkili otorite prosedürü tamamlanmalıdır.",
        "Ticari isim tehlikeyi güvenilir biçimde göstermez. Yanlış schedule; havalandırma, bilge, PPE ve stabilite tedbirlerini hatalı yapar.",
        ["Cargo declaration", "BCSN/schedule", "Test certificates", "Competent authority approval gerektiğinde"],
        ["Shipper", "Kaptan", "Baş zabit", "Terminal/charterer"],
        ["Ticari adı BCSN ile eşleştir", "Hazard/group ve special provisionları briefing'e aktar", "Belge tarih/temsil edilebilirliğini kontrol et"],
        "Önceki seferin sertifikasını kullanmak veya yükü görünüşüne göre Group C varsaymak",
      ),
      requirement(
        "Sıvılaşabilir yükte TML ve moisture kontrolü",
        "IMSBC Code Section 7 ve ilgili individual schedules",
        "Group A yük, temsilî numune ve geçerli testlerle moisture content TML altında doğrulanmadan yüklenmemeli; yağış ve kaynak değişimi yeniden değerlendirilmelidir.",
        "Sıvılaşma, görünür yüzey suyu olmadan gelişebilir ve çok kısa sürede ciddi stabilite kaybına yol açabilir.",
        ["TML/FMP certificate", "Moisture content certificate", "Sampling/testing statement", "Rain/stockpile monitoring"],
        ["Kaptan", "Baş zabit", "Shipper/competent laboratory", "Cargo watch"],
        ["Sertifika tarih ve numune kaynağını kontrol et", "Can test yalnız destekleyici saha kontrolü olarak kullan", "Yağışta stop-work ve hatch closure kriterlerini uygula"],
        "Can test sonucunu laboratuvar sertifikasının yerine koymak veya yağış sonrası aynı moisture belgesine güvenmek",
      ),
      requirement(
        "Yükleme, trimming ve sefer boyunca izleme",
        "IMSBC Code Sections 2, 3 ve individual schedules",
        "Yük dağılımı; loading manual/stability/strength limitleri, trimming, bilge koruması, havalandırma ve tehlikeli gaz/sıcaklık izlemeyle birlikte yürütülmelidir.",
        "Kargo tehlikesi yükleme bitince sona ermez; oksijen tüketimi, kendiliğinden ısınma, gaz veya korozyon sefer boyunca gelişebilir.",
        ["Loading plan ve sequence", "Stability/strength printout", "Hold inspection checklist", "Temperature/gas/bilge logs"],
        ["Kaptan", "Baş zabit", "Cargo watch", "Başmühendis ilgili sistemlerde"],
        ["Loading rate/sequence ile stress ekranını çapraz izle", "Schedule'ın ventilation ve bilge talimatını uygula", "Trend değişiminde escalation kriterini kullan"],
        "Planlanan ve gerçek tonaj/sequence farkının stress hesabına işlenmemesi veya havalandırmanın alışkanlıkla uygulanması",
      ),
    ],
    inspectionQuestions: [
      question("Bu yükün Group sınıfı nedir ve gemi için ana tehlike hangisidir?", "BCSN schedule, group ve gemiye özgü kontrol tedbirleri açıklanmalıdır.", ["Cargo declaration", "IMSBC schedule", "Briefing"], ["Ticari isim", "Group bilinmiyor"]),
      question("Moisture certificate bu partiyi gerçekten temsil ediyor mu?", "Numune yeri, tarihi, stok/yük kaynağı, yağış ve TML karşılaştırması gösterilmelidir.", ["TML/FMP", "Moisture certificate", "Sampling statement"], ["Eski/başka stok numunesi", "Yağış sonrası kontrol yok"]),
      question("Seferde hangi parametreyi ne sıklıkla ve hangi alarm eşiğiyle izliyorsunuz?", "Individual schedule ve risk assessmenta göre sıcaklık/gaz/bilge/ventilation planı anlatılmalıdır.", ["Monitoring log", "RA", "Instrument calibration"], ["Sıklık/eşik bilinmiyor", "Kalibrasyon yok"]),
    ],
    terms: [
      term("BCSN", "IMSBC Code'da dökme yük için kullanılan Bulk Cargo Shipping Name."),
      term("TML", "Sıvılaşabilir yükün emniyetli taşınması için aşılmaması gereken Transportable Moisture Limit."),
      term("FMP", "Akış özelliklerinin başladığı Flow Moisture Point; TML hesabının temelidir."),
      term("Group A/B/C", "Sırasıyla sıvılaşma/dinamik ayrışma riski, kimyasal tehlike veya bu iki ana tehlikeyi taşımayan yük grupları."),
    ],
    sourceStatus: sourceStatus([
      { label: "IMO – Solid bulk cargoes", href: "https://www.imo.org/en/ourwork/safety/pages/cargoesinbulk-default.aspx" },
    ]),
  },
};

const categoryRoles: Record<RegulationCategory, string[]> = {
  "IMO Sözleşmeleri": ["Kaptan", "İlgili departman amiri", "Şirket uyum/operasyon birimi"],
  "Emniyet Kodları": ["Kaptan", "Baş zabit", "Başmühendis", "İşi yapan ekip"],
  "Çevresel Düzenlemeler": ["Kaptan", "Başmühendis", "Baş zabit", "Şirket çevre birimi"],
  "Denetim & Sörvey": ["Kaptan", "Başmühendis", "Baş zabit", "Şirket teknik/uyum birimi"],
  "Gemi Sertifikaları": ["Kaptan", "Sertifikadan sorumlu departman", "Şirket/klas koordinatörü"],
  "Bölgesel Düzenlemeler": ["Kaptan", "Köprüüstü ekibi", "Şirket operasyon birimi", "Yerel acente"],
};

const categoryEvidence: Record<RegulationCategory, string[]> = {
  "IMO Sözleşmeleri": ["Geçerli sertifika ve ekleri", "Onaylı plan/prosedür", "Tarihli operasyon ve test kayıtları"],
  "Emniyet Kodları": ["Gemiye özgü prosedür", "Risk değerlendirmesi/checklist", "Bakım, test ve familiarization kaydı"],
  "Çevresel Düzenlemeler": ["Uygulanabilir sertifika/plan", "Record book ve teslim fişleri", "Ekipman trend, alarm ve bakım kaydı"],
  "Denetim & Sörvey": ["Survey/inspection report", "Açık-kapalı bulgu listesi", "Düzeltici faaliyet ve etkinlik kanıtı"],
  "Gemi Sertifikaları": ["Sertifika aslı ve supplement", "Survey status", "Sertifikayı destekleyen ekipman/kayıt"],
  "Bölgesel Düzenlemeler": ["Pre-arrival bildirimleri", "Yerel circular/port requirement", "Voyage ve compliance kayıtları"],
};

const uniqueStrings = (items: (string | undefined)[]) =>
  [...new Set(items.filter((item): item is string => Boolean(item?.trim())).map((item) => item.trim()))];

const buildComplianceStages = (item: RegulationItem): RegulationComplianceStage[] => [
  {
    stage: "1 · Uygulanabilirliği belirle",
    objective: "Kuralın bu gemiye, sefere ve operasyona hangi kapsamda uygulandığını kanıtlamak.",
    activities: uniqueStrings([
      ...(item.applicability || []).slice(0, 3),
      "Gemi tipi, tonaj, inşa tarihi, bayrak ve sefer bölgesini kontrol et.",
    ]),
    outputs: ["Uygulanabilirlik matrisi", "Gerekli sertifika/plan/kayıt listesi"],
  },
  {
    stage: "2 · Gemiye özgü sistemi kur",
    objective: "Metindeki yükümlülüğü ekipman, prosedür, sorumlu ve emniyet bariyerine dönüştürmek.",
    activities: uniqueStrings([
      ...(item.essentials || []).slice(0, 3),
      "Şirket SMS'i ile onaylı plan ve üretici talimatı arasındaki önceliği doğrula.",
    ]),
    outputs: ["Kontrollü prosedür", "Görev ve sorumluluk dağılımı", "Risk kontrol listesi"],
  },
  {
    stage: "3 · Uygula ve kayıt oluştur",
    objective: "Operasyonu doğru yapmak ve sonradan doğrulanabilir objektif kanıt üretmek.",
    activities: uniqueStrings([...(item.actions || []).slice(0, 4)]),
    outputs: categoryEvidence[item.category],
  },
  {
    stage: "4 · Bağımsız doğrula",
    objective: "Belge, fiziksel durum, kayıt ve personel bilgisinin aynı gerçeği gösterdiğini kontrol etmek.",
    activities: [
      "Rastgele örnek seçerek kayıtları sayaç, logbook, ekipman ve personel beyanıyla çapraz kontrol et.",
      "Açık arıza ve geçici tedbirlerin riskini, onayını ve kapanış tarihini doğrula.",
    ],
    outputs: ["İç denetim/gemi içi doğrulama kaydı", "Bulgu ve düzeltici faaliyet listesi"],
  },
  {
    stage: "5 · Değişikliği yönet",
    objective: "Yeni değişiklik, sirküler, kaza dersi veya denetim bulgusunu sisteme kalıcı olarak işlemek.",
    activities: uniqueStrings([
      ...(item.amendments || []).slice(-2).map((amendment) => `${amendment.year}: ${amendment.description}`),
      "Bayrak, klas, IMO/ILO ve şirket circularlarını periyodik gözden geçir.",
    ]),
    outputs: ["Revizyon ve familiarization kaydı", "Güncellenmiş prosedür/PMS/checklist", "Etkinlik kontrolü"],
  },
];

const buildFallbackProfile = (item: RegulationItem): RegulationEnhancement => {
  const articles = item.keyArticles || [];
  const essentials = (item.essentials || []).slice(0, 6);
  const actions = item.actions || [];
  const evidence = categoryEvidence[item.category];
  const roles = categoryRoles[item.category];

  const operationalRequirements = essentials.map((essential, index) => {
    const article = articles[index % Math.max(articles.length, 1)];
    const action = actions[index % Math.max(actions.length, 1)];
    return requirement(
      article?.title || `Operasyonel gereklilik ${index + 1}`,
      article?.id || item.label,
      essential,
      article?.summary || `${item.label} kapsamındaki bu yükümlülük, kuralın gemide ölçülebilir ve sürdürülebilir biçimde uygulanmasını sağlar.`,
      evidence,
      roles,
      uniqueStrings([
        action,
        "Kayıt, fiziksel durum ve personel açıklamasını aynı örnek üzerinde çapraz kontrol et.",
        "Uygulanabilir bayrak/klas/şirket şartının daha sıkı olup olmadığını doğrula.",
      ]),
      item.penalties?.[index % Math.max(item.penalties?.length || 0, 1)] ||
        "Prosedürün kayıt üzerinde tamamlanmış görünmesi ancak fiilî gemi uygulamasıyla uyuşmaması",
    );
  });

  const inspectionQuestions = (articles.length > 0 ? articles.slice(0, 4) : essentials.slice(0, 4).map((title, index) => ({
    id: item.label,
    title: `Gereklilik ${index + 1}`,
    summary: title,
  }))).map((article, index) =>
    question(
      `${article.id} – ${article.title} gerekliliğini bu gemide nasıl uyguluyor ve doğruluyorsunuz?`,
      `${article.summary} Cevap; gemiye uygulanabilir hükmü, sorumlu kişiyi, yapılan işlemi, tutulan kaydı ve arıza/uygunsuzluk halinde izlenecek yolu birlikte açıklamalıdır.`,
      evidence,
      uniqueStrings([
        actions[index],
        "Belge ile fiziksel durumun uyuşmaması",
        "Personelin yalnız ezberlenmiş genel cevap vermesi",
      ]),
    ),
  );

  return {
    learningObjectives: [
      `${item.label} düzenlemesinin kapsamını ve bu gemiye uygulanabilirliğini belirlemek`,
      "Temel yükümlülükleri gemideki prosedür, ekipman, sorumlu ve kayda dönüştürmek",
      "Sörvey/PSC sırasında objektif kanıt zincirini göstermek",
      "Uygunsuzluk halinde emniyetli geçici tedbir, bildirim ve kalıcı düzeltme sürecini yönetmek",
    ],
    operationalRequirements,
    inspectionQuestions,
    terms: articles.slice(0, 5).map((article) =>
      term(article.id, article.title, article.summary),
    ),
    sourceStatus: sourceStatus(item.resources || []),
  };
};

export const enrichRegulation = (item: RegulationItem): RegulationItem => {
  const fallback = buildFallbackProfile(item);
  const profile = deepProfiles[item.slug];

  return {
    ...item,
    learningObjectives: profile?.learningObjectives || fallback.learningObjectives,
    operationalRequirements: profile?.operationalRequirements || fallback.operationalRequirements,
    inspectionQuestions: profile?.inspectionQuestions || fallback.inspectionQuestions,
    terms: profile?.terms?.length ? profile.terms : fallback.terms,
    sourceStatus: profile?.sourceStatus || fallback.sourceStatus,
    complianceStages: buildComplianceStages(item),
    narrativeChapters: buildNarrativeChapters(item),
  };
};

const mergeArray = <T>(first: T[] | undefined, second: T[] | undefined, key: (item: T) => string): T[] | undefined => {
  const merged = [...(first || []), ...(second || [])];
  if (merged.length === 0) return undefined;
  return [...new Map(merged.map((item) => [key(item), item])).values()];
};

export const mergeDuplicateRegulations = (items: RegulationItem[]): RegulationItem[] => {
  const merged = new Map<string, RegulationItem>();

  items.forEach((item) => {
    const existing = merged.get(item.slug);
    if (!existing) {
      merged.set(item.slug, item);
      return;
    }

    merged.set(item.slug, {
      ...existing,
      overview: existing.overview.length >= item.overview.length ? existing.overview : item.overview,
      history:
        (existing.history?.length || 0) >= (item.history?.length || 0)
          ? existing.history
          : item.history,
      essentials: uniqueStrings([...(existing.essentials || []), ...(item.essentials || [])]),
      actions: uniqueStrings([...(existing.actions || []), ...(item.actions || [])]),
      applicability: uniqueStrings([...(existing.applicability || []), ...(item.applicability || [])]),
      penalties: uniqueStrings([...(existing.penalties || []), ...(item.penalties || [])]),
      relatedSlugs: uniqueStrings([...(existing.relatedSlugs || []), ...(item.relatedSlugs || [])]),
      amendments: mergeArray(existing.amendments, item.amendments, (entry) => `${entry.year}:${entry.description}`),
      keyArticles: mergeArray(existing.keyArticles, item.keyArticles, (entry) => `${entry.id}:${entry.title}`),
      detailedSections: mergeArray(existing.detailedSections, item.detailedSections, (entry) => entry.heading),
      resources: mergeArray(existing.resources, item.resources, (entry) => entry.href),
    });
  });

  return [...merged.values()];
};
