import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Deniz hizmet belgesi (Sea Service Certificate) ve sertifika süreci",
  roleSlug: "makine-stajyer",
  taskIndex: 6,
  estimatedPages: 24,
  intro: `Makine stajyeri, gemide geçirdiği her seyir dönemini kaptan tarafından imzalanan resmi Sea Service Certificate (deniz hizmet belgesi) ile belgelemek zorundadır. Bu belge, STCW'nin OOW (Officer of the Watch — Machinery) yeterlilik belgesi için gereken deniz hizmeti süresinin ispatında temel kanıttır. Ayrıca Engine Department için Watchkeeping Certificate alabilmek, STCW Tablo A-III/1 kapsamındaki tüm yetkinlik alanlarının TRB'de tamamlanmış ve eğitmen mühendis tarafından onaylanmış olmasını gerektirir. Belgelerin kaybı veya usulsüzlüğü, staj süresinin tanınmaması ya da sınav hakkının ertelenmesi anlamına gelebilir. Bu bölüm, Sea Service belgesinin yapısını, deniz hizmeti hesabını, sertifika sürecini ve belge yönetimini adım adım açıklar.`,
  sources: [
    "STCW Convention & Code — Chapter III, Regulation III/1 (qualifying seagoing service)",
    "STCW Code Section A-I/2 — Certificates and endorsements",
    "STCW Regulation I/2 ve I/4 — Sertifika ve kontrol prosedürleri",
    "Bayrak idaresi (Flag State) deniz hizmeti hesaplama ve belge yönergeleri",
    "ILO/STCW seafarer's record book (cüzdan / discharge book) standartları",
    "MLC 2006 — Seafarers' employment agreement ve record of service",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "Sınıf/idare sınav başvuru rehberleri (CoC application guidelines)",
  ],
  chapters: [
    {
      heading: "1. Deniz Hizmeti Kavramı ve Yasal Çerçeve",
      lead: `Deniz hizmeti, bir mühendisin yeterliliğinin "zaman ve gemide bulunma" boyutudur. Doğru belgelenmezse, geçirilen aylar yok sayılabilir.`,
      sections: [
        {
          subheading: "1.1 Qualifying seagoing service nedir",
          paragraphs: [
            `STCW, yeterlilik belgesi için "qualifying seagoing service" (yeterli sayılan deniz hizmeti) tanımlar. Bu, geminin fiilen sefere çıktığı ve adayın görevle ilgili pozisyonda bulunduğu dönemleri kapsar. Liman bekleme, tersane (lay-up) ve görevsiz dönemler genellikle aynı oranda sayılmaz; bayrak idaresinin kuralları bu ayrımı belirler.`,
            `Makine stajyeri için deniz hizmeti, makine dairesinde yapılandırılmış eğitim ve gözetimli görev dönemini ifade eder. Bu süre sadece "gemide olmak" değil, eğitim programının (TRB) yürütüldüğü aktif dönemdir. Bu yüzden Sea Service ile TRB birbirini tamamlar: biri süreyi, diğeri içeriği kanıtlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW III/1 — Yeterli deniz hizmeti",
              text: `OOW (Engine) yeterliliği için, onaylı bir gemide eğitim ve belirli bir asgari deniz hizmeti süresinin tamamlanması ve yetkinliklerin değerlendirilmesi şarttır. Deniz hizmeti, idarece kabul edilen biçimde belgelenmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Belge ekosistemi: cüzdan, sözleşme, sertifika",
          paragraphs: [
            `Deniz hizmeti birden fazla belgeyle izlenir. Gemiadamı cüzdanı (seafarer's discharge book / service record book) her gemi katılım-ayrılışını resmi olarak kaydeder. Seafarer's Employment Agreement (SEA — MLC 2006 gereği iş sözleşmesi) istihdamı belgeler. Sea Service Certificate ise belirli bir dönemin özetini kaptan imzasıyla onaylar.`,
            `Stajyer, bu belgelerin tutarlı olmasına dikkat etmelidir: cüzdandaki katılım-ayrılış tarihleri, SEA dönemleri ve Sea Service belgesindeki süreler örtüşmelidir. Tutarsızlık, idare/denetim incelemesinde sorgulanır ve belge geçerliliğini zedeler.`,
          ],
          table: {
            caption: `Deniz Hizmeti Belge Ekosistemi`,
            headers: ["Belge", "Neyi kaydeder", "Onaylayan"],
            rows: [
              ["Discharge book (cüzdan)", "Katılım/ayrılış kaydı", "Kaptan/idare"],
              ["SEA (iş sözleşmesi)", "İstihdam dönemi", "Şirket/gemiadamı"],
              ["Sea Service Certificate", "Hizmet süresi özeti", "Kaptan"],
              ["TRB", "Yetkinlik kazanımı", "Eğitmen mühendis"],
              ["CoC başvuru dosyası", "Tüm kanıtların toplamı", "İdare/sınav kurulu"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Sea Service Certificate'in Yapısı",
      sections: [
        {
          subheading: "2.1 Belgede bulunması gereken bilgiler",
          paragraphs: [
            `Geçerli bir Sea Service Certificate; gemiadamının kimlik bilgilerini, geminin adını, IMO numarasını, bayrağını, tipini ve tonajını, ana makine gücünü (propulsion power — kW), görev unvanını (rank/capacity), katılım ve ayrılış tarihlerini ve toplam hizmet süresini içerir. Belge kaptan tarafından imzalanır ve gemi mührü taşır.`,
            `Bu bilgiler tesadüfi değildir: ana makine gücü (kW), bazı yeterliliklerin tonaj/güç sınırlamalarıyla ilişkilidir; gemi tipi, hangi tür deneyimin kazanıldığını gösterir; görev unvanı, hizmetin hangi pozisyonda sayılacağını belirler. Eksik bir alan, belgenin idarece reddine yol açabilir.`,
          ],
          bullets: [
            `Gemiadamı kimlik ve cüzdan/sicil bilgisi`,
            `Gemi adı, IMO no, bayrak, tip, GT/tonaj`,
            `Ana makine gücü (kW) — propulsion power`,
            `Görev unvanı (Engine Cadet / Trainee Engineer)`,
            `Katılım ve ayrılış tarihleri, toplam süre`,
            `Kaptan imzası ve gemi mührü`,
          ],
        },
        {
          subheading: "2.2 Doğru ve eksiksiz belge alma sorumluluğu",
          paragraphs: [
            `Stajyer, her gemiden ayrılırken eksiksiz bir Sea Service Certificate almayı kendi sorumluluğu olarak görmelidir. Ayrılış telaşında bu belge unutulur veya eksik alınırsa, sonradan temini çok zor olabilir; gemi başka limana gitmiş, kaptan değişmiş olabilir. "Sonra alırım" yaklaşımı ciddi risktir.`,
            `Belgeyi alırken stajyer tüm alanları kontrol eder: tarihler doğru mu, gemi bilgileri tam mı, makine gücü yazılı mı, imza ve mühür var mı? Hatalı bir belge, sınav başvurusunda fark edildiğinde düzeltilmesi neredeyse imkânsız hale gelebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ayrılmadan belgeni al",
              text: `Gemiden ayrılırken eksiksiz ve imzalı Sea Service Certificate'i mutlaka teslim al. Sonradan temini; gemi rotası, kaptan değişikliği ve şirket bürokrasisi nedeniyle aylarca sürebilir veya imkânsız olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Deniz Hizmeti Süresinin Hesaplanması",
      sections: [
        {
          subheading: "3.1 Süre hesabı ve idarenin kuralları",
          paragraphs: [
            `Deniz hizmeti, katılış ve ayrılış tarihleri arasındaki gün sayısıyla hesaplanır; ancak her idarenin kabul kuralları farklılık gösterir. Bazı idareler watchkeeping yapılan günleri özel olarak sayar, bazıları tersane/lay-up dönemlerini kısmen veya hiç saymaz. Stajyer, kendi bayrağının ve başvuracağı idarenin kurallarını sefer başında öğrenmelidir.`,
            `STCW, OOW (Engine) için belirli bir asgari onaylı deniz hizmeti öngörür (idare tarafından kabul edilen yapılandırılmış eğitim programı dahilinde). Stajyer, hedef süreyi bilerek seferlerini planlar ve eksik kalan süreyi takip eder; sınav başvurusu öncesinde sürenin tamamlandığından emin olur.`,
          ],
          table: {
            caption: `Deniz Hizmeti Hesabında Dikkat Edilen Dönemler`,
            headers: ["Dönem", "Tipik sayım", "Not"],
            rows: [
              ["Seyir (denizde)", "Tam sayılır", "Aktif görev"],
              ["Liman operasyonu", "Genelde sayılır", "Görevde olunmalı"],
              ["Tersane / lay-up", "Kısmen/sayılmaz", "İdareye bağlı"],
              ["İzin/hastalık", "Sayılmaz", "Gemide görevsiz"],
              ["Watchkeeping günleri", "Özel kabul", "Bazı idarelerde ayrı"],
            ],
          },
        },
        {
          subheading: "3.2 Tarih tutarlılığı ve çakışma kontrolü",
          paragraphs: [
            `Stajyer, farklı gemilerdeki Sea Service belgelerinin tarihlerinin çakışmamasına dikkat etmelidir; aynı tarihte iki ayrı gemide hizmet gösterilemez. Ayrıca Sea Service tarihleri, cüzdan kayıtları ve TRB görev tarihleriyle tutarlı olmalıdır. Bu üçlü tutarlılık, belge dosyasının güvenilirliğinin temelidir.`,
            `Çakışma veya tutarsızlık, idare incelemesinde "belge güvenilirliği" sorusunu doğurur ve tüm dosyanın ek incelemeye alınmasına yol açabilir. Bu yüzden stajyer, her belge alındığında tarihleri kendi kişisel kayıt çizelgesine işleyerek sürekli tutarlılık kontrolü yapmalıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kişisel hizmet çizelgesi tut",
              text: `Stajyer, her gemi için katılış-ayrılış tarihlerini, gemi bilgilerini ve biriken süreyi kendi tablosunda izlemelidir. Bu çizelge, hem toplam süreyi takip etmeyi hem de belge tutarsızlıklarını erken yakalamayı sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. TRB ve Watchkeeping Certificate İlişkisi",
      sections: [
        {
          subheading: "4.1 İki kanıtın birlikteliği",
          paragraphs: [
            `Watchkeeping Certificate (Engine) ve nihai OOW yeterliliği için Sea Service yeterli değildir; STCW Tablo A-III/1 kapsamındaki tüm yetkinlik alanlarının TRB'de tamamlanmış ve eğitmen mühendis tarafından onaylanmış olması gerekir. Sea Service "ne kadar süre", TRB "ne öğrenildi ve kanıtı" sorusunu yanıtlar; ikisi birlikte sınav dosyasını oluşturur.`,
            `Stajyer, TRB'sini Sea Service süresiyle paralel ilerletmelidir. Süre dolarken yetkinlik kanıtı eksik kalırsa, fazladan deniz hizmeti bile sınav hakkını sağlamaz. Bu yüzden TRB boşluk analizi (bkz. TRB yönetimi bölümü) deniz hizmeti planlamasıyla birlikte yapılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: TRB yönetimi",
              text: `Yetkinlik kanıtının yönetimi için "Training Record Book (TRB) yönetimi" bölümüne bakınız. Sea Service süre kanıtı, TRB yetkinlik kanıtı ile birleşerek sınav dosyasını tamamlar.`,
            },
          ],
        },
        {
          subheading: "4.2 Onayların eksiksizliği",
          paragraphs: [
            `Sea Service belgesi kaptan onayı, TRB ise eğitmen mühendis (genelde Başmühendis) onayı gerektirir. Stajyer, her dönem sonunda her iki onayı da tamamlamalıdır. Eksik bir onay — örneğin imzalanmamış TRB sayfaları veya mühürsüz Sea Service — başvuruyu geçersiz kılabilir.`,
            `Onay sürecinde stajyer proaktif olmalı, sefer sonunu beklemeden düzenli imza almalıdır. Sefer sonunda toplanan yüzlerce sayfayı son anda imzalatmaya çalışmak hem riskli hem de değerlendirme kalitesini düşürür.`,
          ],
        },
      ],
    },
    {
      heading: "5. Sertifika (CoC) Başvuru Süreci",
      sections: [
        {
          subheading: "5.1 Başvuru dosyasının bileşenleri",
          paragraphs: [
            `OOW (Engine) Certificate of Competency (CoC) başvurusu, birden çok belgenin bir araya getirilmesini gerektirir: onaylı Sea Service belgeleri, tamamlanmış TRB, zorunlu STCW kurs sertifikaları (Basic Safety, Advanced Firefighting, Survival Craft, Medical First Aid, Security Awareness vb.), geçerli sağlık raporu, ve eğitim kurumu diploması/onayı. Eksik bir belge başvuruyu durdurur.`,
            `Stajyer, başvuru öncesi idarenin güncel gereklilik listesini almalı ve her maddeyi kontrol etmelidir. Gereklilikler zamanla güncellenebilir (STCW Manila değişiklikleri gibi); eski bilgiye dayanmak eksik başvuruya yol açar. Erken planlama, son dakika eksiklerini önler.`,
          ],
          table: {
            caption: `CoC Başvuru Dosyası Bileşenleri`,
            headers: ["Belge", "Kanıtladığı", "Durum kontrolü"],
            rows: [
              ["Sea Service Cert.", "Deniz hizmeti süresi", "Tarih/imza/mühür"],
              ["TRB", "Yetkinlik kazanımı", "Tüm alanlar onaylı"],
              ["STCW kursları", "Zorunlu eğitimler", "Geçerlilik tarihi"],
              ["Sağlık raporu", "Göreve uygunluk", "Geçerlilik süresi"],
              ["Diploma/onay", "Eğitim kurumu", "İdare tanıması"],
            ],
          },
        },
        {
          subheading: "5.2 Sınav ve değerlendirme aşaması",
          paragraphs: [
            `Belge dosyası kabul edildikten sonra aday, idarenin öngördüğü sınav/değerlendirme aşamasına girer; bu yazılı, sözlü (oral) ve/veya simülatör değerlendirmesi içerebilir. Sözlü sınavda, adayın TRB'sindeki görevler sorgulanabilir; bu yüzden dürüst ve somut TRB kayıtları en iyi sınav hazırlığıdır.`,
            `Sınav başarısının ardından idare CoC'yi düzenler ve gerekli onayları (endorsement) ekler. Stajyer, sertifikanın geçerlilik süresini, yenileme (revalidation) gerekliliklerini ve tonaj/güç sınırlamalarını öğrenmelidir; bir CoC süresizdir sanmak hatalıdır, periyodik yenileme ve güncel deniz hizmeti gerektirir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Eksik kurs nedeniyle gecikme",
              text: `Bir aday, Sea Service ve TRB'si tam olmasına rağmen Advanced Firefighting sertifikasının süresi dolduğu için başvurusu beklemeye alınır. Kursu yenilemesi ve yeniden başvurması haftalar kaybettirir. Ders: tüm kurs geçerliliklerini başvuru öncesi kontrol et.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Belge Güvenliği ve Yönetimi",
      sections: [
        {
          subheading: "6.1 Belge kaybı riskinin yönetimi",
          paragraphs: [
            `Sea Service belgeleri, cüzdan ve TRB; yıllar boyunca biriken ve yeniden üretilmesi çok zor olan kanıtlardır. Bunların kaybı, çalınması veya hasarı (ıslanma, yangın) staj döneminin tanınmamasına yol açabilir. Stajyer, bu belgeleri su geçirmez, güvenli bir yerde saklamalı ve seyahatlerde özenle korumalıdır.`,
            `Pratik koruma yöntemi, tüm belgelerin yüksek çözünürlüklü dijital kopyalarını (tarama/fotoğraf) almak ve bunları güvenli bir bulut/yedek ortamda tutmaktır. Orijinal kaybolursa, dijital kopya yeniden düzenleme için referans sağlar; ancak resmi geçerlilik daima ıslak imzalı orijinaldedir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Belge kaybı = staj kaybı riski",
              text: `Kaybolan Sea Service belgesinin yeniden temini çoğu zaman imkânsızdır (gemi/kaptan değişmiş olur). Bu, geçirilen ayların kanıtsız kalması ve sınav hakkının ertelenmesi demektir. Belgeleri koru, dijital yedek al.`,
            },
          ],
        },
        {
          subheading: "6.2 Düzenli dosyalama disiplini",
          paragraphs: [
            `Stajyer, her gemiden döndüğünde belgelerini hemen kişisel dosyasına ekler ve hizmet çizelgesini günceller. Belgeler kronolojik düzende, dijital yedekleriyle birlikte tutulur. Bu disiplin, sınav başvurusunda dosyanın dakikalar içinde hazırlanmasını sağlar.`,
            `Belge yönetimi, sadece bir bürokratik görev değil; kariyer kanıtının korunmasıdır. Yıllar sonra bir üst yeterlilik (Second/Chief Engineer) başvurusunda bile bu erken kayıtlar referans olabilir. Disiplinli dosyalama, kariyer boyu süren bir alışkanlığın temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sık Karşılaşılan Sorunlar ve Çözümler",
      sections: [
        {
          subheading: "7.1 Tipik problemler",
          paragraphs: [
            `En sık problem, eksik veya geç alınan Sea Service belgesidir; gemiden ayrılırken belge alınmaz ve sonradan temin edilemez. İkinci problem, belgedeki eksik alanlardır (makine gücü yazılmamış, mühür yok, tarih hatası). Üçüncüsü, Sea Service ile cüzdan/TRB tarihlerinin tutarsızlığıdır.`,
            `Dördüncü problem, deniz hizmeti süresinin idare kurallarına göre yanlış hesaplanması; adayın yeterli sandığı sürenin kabul edilen biçimde yetersiz çıkmasıdır. Beşinci ise zorunlu kursların süresinin başvuru anında dolmuş olmasıdır. Bu problemlerin çoğu erken planlama ve kontrolle önlenir.`,
          ],
          bullets: [
            `Eksik/geç alınan Sea Service belgesi`,
            `Belgede eksik alan (kW, mühür, imza)`,
            `Sea Service / cüzdan / TRB tarih tutarsızlığı`,
            `Yanlış hesaplanan deniz hizmeti süresi`,
            `Süresi dolmuş zorunlu kurs sertifikaları`,
          ],
        },
        {
          subheading: "7.2 Önleyici yaklaşımlar",
          paragraphs: [
            `Bu sorunların çözümü reaktif değil önleyicidir: her gemiden ayrılırken belgeyi eksiksiz al, alanları kontrol et, tarihleri kişisel çizelgeye işle, idare kurallarını sefer başında öğren ve kurs geçerliliklerini takvimle takip et. Sınav başvurusundan aylar önce dosyayı gözden geçir.`,
            `Stajyer, belge sürecini "sınav zamanı halledilecek iş" olarak değil, "her sefer döneminin doğal bir parçası" olarak görmelidir. Her dönem düzgün kapatıldığında, sınav başvurusu sadece hazır belgeleri bir araya getirmekten ibaret kalır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Stajyerin belge ve sertifika kontrol listesi",
          bullets: [
            `Her gemiden ayrılırken eksiksiz, imzalı, mühürlü Sea Service aldım mı?`,
            `Belgede makine gücü (kW), tarihler ve unvan doğru yazılı mı?`,
            `Sea Service / cüzdan / TRB tarihleri tutarlı mı?`,
            `İdarenin deniz hizmeti hesap kurallarını biliyor muyum?`,
            `TRB tüm A-III/1 yetkinliklerinde onaylı ve tamam mı?`,
            `Zorunlu STCW kurslarının geçerliliği başvuru anında geçerli mi?`,
            `Tüm belgelerin dijital yedeğini güvenli ortamda tutuyor muyum?`,
            `Sınav başvuru dosyasını idarenin güncel listesiyle kontrol ettim mi?`,
          ],
          paragraphs: [
            `Sea Service belgesi ve sertifika süreci, makine stajyerinin denizde geçirdiği değerli ayların yasal kanıta dönüştüğü noktadır. Eksiksiz alınan belgeler, tutarlı tarihler, tamamlanmış bir TRB ve geçerli kurslar; OOW yeterliliğine giden dosyanın taşıyıcı sütunlarıdır. Belgeyi zamanında ve doğru almak, tarihleri tutarlı tutmak ve her şeyi güvenle saklamak; stajyerin kendi kariyerine karşı en temel sorumluluğudur. İyi yönetilmeyen bir belge süreci, en başarılı staj dönemini bile kanıtsız ve geçersiz kılabilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
