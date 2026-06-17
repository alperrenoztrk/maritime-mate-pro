import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Limanda güverte nöbeti (gangway watch)",
  roleSlug: "dorduncu-zabit",
  taskIndex: 3,
  estimatedPages: 24,
  intro: `Dördüncü Zabit, gemi limanda yatarken güverte nöbeti (gangway watch / deck watch) tutarak geminin güvenliğinden, gemiye giriş-çıkışın denetiminden ve yük operasyonu sırasında güverte gözetiminden sorumlu vardiya zabitidir. Bu nöbet; ISPS güvenlik seviyesi gerekliliklerinin uygulanması, ziyaretçi ve mürettebat kaydı, mooring ve draft izlemesi, yangın/kirlilik gözetimi ve acil duruma hazırlığı kapsar. Liman vardiyası, denizdeki seyir vardiyasından farklı olarak statik bir ortamda yürütülür; ancak güvenlik, emniyet ve çevre riskleri açısından en az onun kadar dikkat gerektirir. Bu bölüm, gangway watch'un görev kapsamını ve prosedürlerini kıdemsiz zabit perspektifinden açıklar.`,
  sources: [
    "ISPS Code (International Ship and Port Facility Security Code) Part A & B",
    "SOLAS Chapter XI-2 — Special Measures to Enhance Maritime Security",
    "SOLAS Chapter II-2 — Fire Protection (port watch fire safety)",
    "MARPOL Annex I — Oil Pollution Prevention (SOPEP)",
    "ILO MLC 2006 — Hours of Rest / Watch arrangements",
    "ICS Bridge Procedures Guide (5th Edition)",
    "ISGOTT 6 (tankers — port operations)",
    "IMO Resolution A.1118(30) — Port watch guidelines (genel)",
  ],
  chapters: [
    {
      heading: "1. Liman Vardiyasının Kapsamı ve Sorumluluk",
      lead: `Limandaki gemi hareketsiz görünse de güvenlik, yük, ballast, çevre ve insan trafiği aynı anda akan dinamik bir sistemdir; gangway watch bu sistemin tek gözüdür.`,
      sections: [
        {
          subheading: "1.1 Gangway watch'un temel görevleri",
          paragraphs: [
            `Liman vardiyası zabiti, geminin güvenliğinden (security), emniyetinden (safety) ve çevre korumasından eş zamanlı sorumludur. Dördüncü Zabit; gemiye giriş-çıkışı denetler, ziyaretçileri kaydeder, yük operasyonunu güverteden gözetler, mooring durumunu ve draft/freeboard değişimini izler, yangın ve kirlilik risklerine karşı tetikte durur. Tüm bunlar tek bir nöbet boyunca sürdürülür.`,
            `Bu görev, Kaptan ve Birinci Zabit'in standing orders'ı çerçevesinde yürütülür. Liman özel talimatları (security level, kısıtlı bölgeler, yük operasyon planı, dikkat edilecek hususlar) nöbete başlamadan okunur. Dördüncü Zabit, kıdemi gereği belirsizlik veya olağandışı durumda derhal üst zabiti veya SSO'yu (Ship Security Officer) bilgilendirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Statik ortam, dinamik risk",
              text: `Liman vardiyası "rahat nöbet" olarak görülmemelidir. Yangınların, hırsızlıkların, kaçak yolcu girişlerinin ve kirlilik olaylarının çoğu limanda gerçekleşir. Hareketsizlik, dikkatin gevşemesi için değil yoğunlaşması için fırsattır.`,
            },
          ],
        },
        {
          subheading: "1.2 Vardiya devir-teslimi ve kayıtlar",
          paragraphs: [
            `Liman vardiyası devrinde devralan zabit; mevcut security level'ı, devam eden yük operasyonunu, mooring durumunu, gemideki ziyaretçi sayısını, izinli/karada olan mürettebatı, bekleyen servisleri (bunker, su, atık alımı) ve özel talimatları eksiksiz devralır. Tüm bu bilgiler deck logbook ve gangway log'a kaydedilir.`,
            `Devralan zabit, ziyaretçi listesini ve gangway access kayıtlarını gözden geçirerek gemide kim olduğunu net bilir. Devir sırasında belirsizlik kalmaması, acil bir tahliye gerektiğinde tüm canların sayımı için kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "2. ISPS ve Gemi Güvenliği",
      sections: [
        {
          subheading: "2.1 Güvenlik seviyeleri ve gereklilikleri",
          paragraphs: [
            `ISPS Code üç güvenlik seviyesi tanımlar. Seviye 1 (normal): rutin erişim kontrolü ve devriye. Seviye 2 (yükseltilmiş): ek tedbirler, sıkı kimlik kontrolü, artırılmış devriye. Seviye 3 (istisnai): belirli bir tehdit için liman/idare tarafından dayatılan en sıkı tedbirler. Dördüncü Zabit, geçerli seviyeye göre erişim kontrolünü uygular ve seviye değişikliğini SSP (Ship Security Plan) uyarınca yönetir.`,
            `Gemi-liman arayüzünde güvenlik, Declaration of Security (DoS) ile düzenlenebilir; gemi ve liman tesisinin sorumlulukları yazılı olarak paylaşılır. Dördüncü Zabit, SSP'de tanımlı restricted area'ların (köprüüstü, makine dairesi, telsiz odası, yük kontrol odası) yetkisiz girişe karşı korunmasını gözetir.`,
          ],
          table: {
            caption: `ISPS Güvenlik Seviyeleri ve Tipik Tedbirler`,
            headers: ["Seviye", "Anlamı", "Tipik gangway tedbiri"],
            rows: [
              ["1", "Normal", "Rutin kimlik kontrolü, ziyaretçi kaydı"],
              ["2", "Yükseltilmiş", "Sıkı kontrol, eşya araması, sık devriye"],
              ["3", "İstisnai", "Erişim kısıtlama, idare talimatı, refakat"],
            ],
          },
        },
        {
          subheading: "2.2 Erişim kontrolü ve kimlik doğrulama",
          paragraphs: [
            `Gemiye giren herkes (mürettebat, ziyaretçi, stevedore, sörveyör, acente, yetkili) kimlik gösterir ve gangway log'a kaydedilir. Ziyaretçilere visitor pass verilir, mürettebat kart/liste ile teyit edilir. Yetkisiz veya kimliği şüpheli kişiler içeri alınmaz; SSO bilgilendirilir.`,
            `Restricted area'lara erişim yalnızca yetkili ve refakatli kişilere açıktır. Dördüncü Zabit, gemiden çıkan ziyaretçinin de kaydını kapatır; böylece her an gemide kimin bulunduğu kesin bilinir. Bu sayım, acil tahliye ve kaçak yolcu (stowaway) önleme için temeldir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISPS — Access control & restricted areas",
              text: `ISPS Code, gemiye erişimin kontrol edilmesini, ziyaretçilerin kayıt altına alınmasını ve restricted area'ların korunmasını zorunlu kılar. Gangway watch bu zorunluluğun sahadaki uygulayıcısıdır; her giriş-çıkış kayda geçer.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Gangway ve Erişim Düzeneği Güvenliği",
      sections: [
        {
          subheading: "3.1 Gangway/accommodation ladder kurulumu",
          paragraphs: [
            `Gangway veya accommodation ladder, güvenli açıyla, kaymaz basamaklarla, yeterli aydınlatmayla ve sağlam korkuluklarla kurulur. Altına emniyet ağı (safety net) gerilir; bu, düşen kişiyi tutmak için zorunludur. Su seviyesi ile gel-git nedeniyle gangway açısı değiştikçe ayarlanır.`,
            `Gangway başında can simidi (heaving line bağlı lifebuoy), aydınlatma ve "no smoking / no unauthorized entry" levhaları bulunur. Dördüncü Zabit, gangway'in gel-git ve draft değişimiyle güvenli açıda kalmasını periyodik kontrol eder; kötü hava veya yük değişiminde yeniden ayarlanır.`,
          ],
          bullets: [
            `Güvenli açı ve kaymaz basamaklar`,
            `Altında emniyet ağı (safety net)`,
            `Gangway başında can simidi + heaving line`,
            `Yeterli aydınlatma (gece)`,
            `Gel-git/draft ile periyodik açı ayarı`,
          ],
        },
        {
          subheading: "3.2 Mooring (bağlama) izleme",
          paragraphs: [
            `Liman vardiyası boyunca halat/tel gerginliği izlenir. Yük operasyonu ilerledikçe gemi draft'ı değişir, halatlar gevşer veya gerilir; gerektiğinde tightening (sıkılaştırma) veya slacking (gevşetme) yapılır. Gel-git, rüzgar ve geçen gemilerin oluşturduğu surge, mooring gerilimini ani değiştirebilir.`,
            `Dördüncü Zabit, kopan veya aşırı gerilen halatı, snap-back zone'da duran personeli ve sürtünen/aşınan halatı tespit ederek müdahale eder. Mooring problemi büyükse Birinci Zabit ve güverte ekibi çağrılır. Halat kopması (mooring line failure) ciddi yaralanma kaynağıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone ölümcüldür",
              text: `Gerilmiş bir halat koptuğunda kamçı gibi geri savrulur (snap-back). Bu bölgede duran personel ağır yaralanabilir veya ölebilir. Mooring izlemesi yapan zabit, snap-back zone'ların boş tutulmasını ve personelin güvenli pozisyonda durmasını sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Yük Operasyonu Sırasında Güverte Gözetimi",
      sections: [
        {
          subheading: "4.1 Operasyonun güvenli izlenmesi",
          paragraphs: [
            `Yük operasyonu devam ederken Dördüncü Zabit, Birinci Zabit'in koordinasyonunda güverteyi gözetler: crane/derrick hareketleri, hatch açıklıkları, açık ambar ağzı çevresi güvenliği, vinç altında personel bulunmaması ve düşen yük riski. Açık hatch'lerin etrafında bariyer/uyarı bulunmasını ve gece aydınlatmasını kontrol eder.`,
            `Operasyon sırasında draft ve list periyodik izlenir; ani list veya beklenmeyen trim değişimi (yanlış yükleme sırası, ballast hatası) derhal raporlanır. Tankerlerde Ship-Shore Safety Checklist gerekliliklerine uyulduğu, manifold bölgesinin gözetildiği ve drip tray'lerin boş olduğu izlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Draft ve list = gemiyi konuşturan veri",
              text: `Beklenmeyen list veya hızlı draft değişimi, yükleme planında veya ballast operasyonunda bir hata olduğunun ilk işaretidir. Gangway watch bu işareti erken yakalarsa büyük bir stabilite sorununu başlangıçta durdurabilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Tank sounding ve kirlilik gözetimi",
          paragraphs: [
            `Vardiya boyunca, gerektiğinde tank/bilge sounding'leri alınarak su girişi veya yük seviyesi değişimi izlenir. Su yüzeyinde yağ izi, sintine taşması veya overflow riski sürekli gözlenir. Kirlilik fark edilirse SOPEP devreye girer; operasyon durdurulur ve yetkililer bilgilendirilir.`,
            `Tankerlerde overfill alarm, manifold sızıntısı ve hose connection güvenliği özellikle izlenir. MARPOL Annex I gereği, denize bir damla bile yağ dökülmesi raporlanması ve müdahale edilmesi gereken bir olaydır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Yangın ve Acil Duruma Hazırlık",
      sections: [
        {
          subheading: "5.1 Liman yangın güvenliği",
          paragraphs: [
            `Limanda yangın riski yüksektir: kaynak/kesim işleri (hot work), sigara, elektrik bağlantıları, yük operasyonu kaynaklı statik elektrik. Dördüncü Zabit, gemideki hot work'lerin yetkili permit ile yapıldığını, yangın nöbetçisinin (fire watch) bulunduğunu ve yangın söndürme ekipmanının hazır olduğunu kontrol eder.`,
            `Liman yangın devriyesi düzenli yapılır; özellikle yük bölgeleri, makine dairesi yakını ve yaşam mahalli kontrol edilir. Şore bağlantısı (shore connection) ve international shore connection flange'in hazır olması, kara yangın suyu desteği için önemlidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Port fire safety",
              text: `Limandaki gemi, denizdekiyle aynı yangın güvenliği standardını sürdürmek zorundadır. Hot work permit, fire watch ve hazır yangın ekipmanı zorunludur. International shore connection, kara yangın suyu için her zaman erişilebilir tutulur.`,
            },
          ],
        },
        {
          subheading: "5.2 Acil durum müdahale refleksleri",
          paragraphs: [
            `Yangın, su girişi, kirlilik, tıbbi acil durum veya güvenlik ihlali anında Dördüncü Zabit ilk müdahaleyi yapar: alarm verir, Kaptan/Birinci Zabit'i çağırır, gerekirse yük operasyonunu durdurur, liman yetkililerini ve acenteyi bilgilendirir. Acil durumda mürettebat sayımı için gangway access kaydı kullanılır.`,
            `Limanda emergency stop (yük operasyonunu durdurma) yetkisi vardiya zabitindedir; emniyet için tereddüt edilmez. Acil çıkış yolları, emergency escape routes ve müsteri bağlantı noktaları her vardiya başında zihinsel olarak gözden geçirilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Ziyaretçi, Servis ve Tedarik Yönetimi",
      sections: [
        {
          subheading: "6.1 Ziyaretçi ve resmi makam yönetimi",
          paragraphs: [
            `Gemiye gelen sörveyörler, sınıf denetçileri, PSC inspectorları, acente temsilcileri ve teknik servis personeli kaydedilir, kimlikleri doğrulanır ve ilgili zabite/Kaptan'a yönlendirilir. PSC inspector'ın gelişi derhal Kaptan'a bildirilir; resmi makamlara her zaman profesyonel ve işbirlikçi davranılır.`,
            `Ziyaretçilerin gemideki hareketleri SSP çerçevesinde gözetilir; restricted area'lara yetkisiz girişleri engellenir. Çıkışta kayıtları kapatılır. Gemi personeli olmayanların gemide unutulmaması veya kaybolmaması nöbetçinin sorumluluğundadır.`,
          ],
        },
        {
          subheading: "6.2 Bunker, su, atık ve tedarik operasyonları",
          paragraphs: [
            `Bunker (yakıt) alımı sırasında SOPEP hazır tutulur, scupper plug'lar takılı olur, manifold gözetilir. Tatlı su alımı, kumanya (provisions) teslimi ve atık (garbage, sludge, slop) alımı kayıt altına alınır. Garbage Record Book ve Oil Record Book ilgili girdilere işaret eder; bu kayıtlar MARPOL uyumu için kritiktir.`,
            `Dördüncü Zabit, bu operasyonların güvenli ve kayıtlı yapıldığını gözetir. Atık alım makbuzları (waste reception receipt) saklanır; MARPOL denetiminde istenir. Tedarik teslimatlarının güvenlik kontrolünden geçmesi ISPS gereğidir.`,
          ],
          table: {
            caption: `Liman Servisleri ve İlgili Kayıt`,
            headers: ["Servis", "İlgili kayıt/belge", "Dikkat"],
            rows: [
              ["Bunker alımı", "Oil Record Book, BDN", "SOPEP hazır, scupper plug"],
              ["Tatlı su", "Deck log", "Hose hijyeni"],
              ["Garbage alımı", "Garbage Record Book + receipt", "MARPOL Annex V"],
              ["Sludge/slop", "Oil Record Book + receipt", "MARPOL Annex I"],
              ["Kumanya", "Stores list", "ISPS güvenlik kontrolü"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Hava, Gel-git ve Çevresel İzleme",
      sections: [
        {
          subheading: "7.1 Hava ve gel-git etkisi",
          paragraphs: [
            `Liman vardiyası boyunca rüzgar, gel-git ve hava değişimi izlenir. Gel-git, gemi draft'ını ve gangway açısını sürekli değiştirir; spring/neap gel-git farkları büyük olabilir. Rüzgarın artması mooring gerilimini, fender temasını ve yük operasyon güvenliğini etkiler.`,
            `Fırtına uyarısı, beklenen hava değişimi veya gel-git ekstremi durumunda Dördüncü Zabit Birinci Zabit'i bilgilendirir; ek halat verilmesi veya operasyonun ertelenmesi gibi tedbirler değerlendirilir. Çevresel veriler logbook'a kaydedilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — gevşeyen halat ve sürüklenme",
              text: `Gel-git ve rüzgar etkisiyle izlenmeyen mooring'in gevşeyip geminin rıhtımdan sürüklendiği, gangway'in koptuğu ve manifold bağlantısının zorlandığı olaylar yaşanmıştır. Ders: liman vardiyasında mooring ve gel-git izlemesi kesintiye uğratılmaz.`,
            },
          ],
        },
        {
          subheading: "7.2 Çevre koruma ve deck temizliği",
          paragraphs: [
            `Güverte üzerinde yağ, çöp veya kimyasal birikimi izlenir; scupper plug'lar takılı tutularak güvertedeki herhangi bir döküntünün denize ulaşması önlenir. Kirlilik riski oluşturan her durum (sızıntı, taşma) anında müdahale gerektirir. Çevresel disiplin, liman otoritelerinin sıkı denetlediği bir konudur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Dördüncü Zabit gangway watch kontrol listesi",
          bullets: [
            `Geçerli ISPS security level ve özel talimatlar okundu mu?`,
            `Gangway güvenli açıda, safety net ve aydınlatma mevcut mu?`,
            `Gangway başında can simidi + heaving line hazır mı?`,
            `Tüm giriş-çıkış kayıt altında, gemide kim olduğu net mi?`,
            `Ziyaretçi/visitor pass ve restricted area kontrolü uygulanıyor mu?`,
            `Mooring gerginliği ve snap-back zone güvenliği izleniyor mu?`,
            `Draft, list ve yük operasyonu güvenliği gözetiliyor mu?`,
            `Yangın devriyesi, hot work permit ve fire watch kontrol edildi mi?`,
            `SOPEP hazır, scupper plug takılı ve kirlilik izleniyor mu?`,
            `Bunker/su/atık operasyonları ve kayıtları doğru mu?`,
            `Acil durum müdahale ve mürettebat sayımı planı hazır mı?`,
          ],
          paragraphs: [
            `Gangway watch, kıdemsiz zabitin güvenlik, emniyet, çevre ve insan yönetimini tek bir görevde birleştirerek pratiğe döktüğü kapsamlı bir eğitim sahasıdır. Limanın "sakin" görünümü altında akan riskleri görmek, kaydı eksiksiz tutmak ve acil durumda ilk müdahaleyi yapmak, Dördüncü Zabit'in profesyonel olgunluğunu belirler. İyi tutulan bir liman vardiyası, hiçbir olayın yaşanmadığı vardiyadır; bu sonuç, sürekli ve disiplinli dikkatin ürünüdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
