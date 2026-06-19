import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "PMS iş emirlerinin dağıtımı ve sahada yürütülmesi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 1,
  estimatedPages: 24,
  intro: `İkinci Mühendis (Second Engineer), makine dairesinin operasyonel başı olarak Baş Mühendisin onayladığı planlı bakım programını (PMS — Planned Maintenance System) sahada hayata geçiren kişidir. Bu sorumluluk; iş emirlerinin (work order) vardiya mühendislerine ve makine tayfalarına dağıtılması, işlerin doğru/zamanında/emniyetli yapılması, yedek parça (spare) ve sarf malzeme yönetimi, risk değerlendirmesi ve permit-to-work sisteminin işletilmesi, tamamlanan işlerin PMS yazılımına geri kaydı ve klas/PSC denetimine hazır bir kayıt zinciri tutulmasını kapsar. Bu bölüm, İkinci Mühendisin bakım yönetiminde izlemesi gereken metodolojiyi adım adım açıklar.`,
  sources: [
    "ISM Code (International Safety Management Code) — Madde 10: Maintenance of the Ship and Equipment",
    "SOLAS Chapter II-1 — Construction: Machinery Installations",
    "Class Rules (IACS UR Z — Survey & Certification; PMS-CM onaylı bakım)",
    "TMSA 3 (Tanker Management and Self Assessment) — Element 4: Reliability & Maintenance",
    "MARPOL Annex VI — Madde 5/6: Survey ve sertifikasyon",
    "IMO MSC.1/Circ.1331 — Guidelines for maintenance of fire protection systems",
    "OCIMF — Guidelines on the Application of Risk Assessment",
    "Maker manuals (MAN B&W / Wärtsilä / Alfa Laval) ve gemi PMS prosedür el kitabı",
  ],
  chapters: [
    {
      heading: "1. PMS Mantığı ve İkinci Mühendisin Rolü",
      lead: `PMS, ekipmanın çalışma saatine veya takvime bağlı olarak bakım üreten, kanıtı (evidence) saklayan dijital bir sistemdir. İkinci Mühendis bu sistemin "saha yöneticisi"dir.`,
      sections: [
        {
          subheading: "1.1 Calendar-based, running-hour ve condition-based bakım",
          paragraphs: [
            `PMS iş emirleri üç tetikleyiciyle üretilir: takvim bazlı (örn. her 3 ayda jeneratör güvenlik tertibatı testi), çalışma saati bazlı (örn. 6000 saatte separatör overhaul) ve durum bazlı (condition-based — vibration, oil analysis veya thermography sonucuna göre). İkinci Mühendis, yaklaşan iş emirlerini PMS ekranından haftalık olarak çeker (look-ahead list) ve önceliklendirir.`,
            `Klas onaylı PMS-CM (Planned Maintenance and Condition Monitoring) sistemlerinde, sörvey kalemleri (continuous machinery survey) doğrudan PMS'e bağlıdır. Bir kalemin bakımı tescilli mühendis (chief) gözetiminde yapılır, kayıt klas sörveyörüne kabul ettirilir. İkinci Mühendis, bu kalemlerin kanıtının (fotoğraf, ölçüm, clearance değeri) eksiksiz toplanmasını sağlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code Madde 10",
              text: `Şirket, geminin ve ekipmanın ilgili kurallara uygun tutulmasını sağlayacak prosedürler kurmalıdır. Kritik ekipman (critical equipment) için ani arıza halinde dahi emniyetin korunmasını sağlayacak özel düzenlemeler tanımlanmalıdır. PMS, bu maddenin pratikteki uygulamasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Kritik ekipman ve yedekleme mantığı",
          paragraphs: [
            `ISM kapsamında "critical equipment" listesi tanımlanır: ana makine, dümen donanımı, jeneratörler, acil jeneratör, yangın/bilge pompaları, IGS, manevra ekipmanları. Bu ekipmanların bakımı geciktirilemez; arıza halinde alternatif/yedek düzenleme (standby pompa, ikinci besleme hattı) test edilmiş olmalıdır. İkinci Mühendis, kritik kalemlerin iş emirlerini "yüksek öncelik" olarak işaretler.`,
          ],
          table: {
            caption: `Tipik makine dairesi PMS aralıkları (kılavuz değerler — maker manual esastır)`,
            headers: ["Ekipman", "Tipik aralık", "İş türü", "Tetikleyici"],
            rows: [
              ["Ana makine yakıt enjektörü", "8.000 saat", "Pop-test / overhaul", "Running hour"],
              ["FO/LO purifier", "4.000–8.000 saat", "Bowl overhaul", "Running hour"],
              ["Jeneratör (medium-speed)", "12.000–16.000 saat", "Major overhaul", "Running hour"],
              ["Hava kompresörü valfleri", "1.000–2.000 saat", "Valf temizlik/kontrol", "Running hour"],
              ["Yangın algılama sistemi", "3 ay / 1 yıl", "Fonksiyon testi", "Calendar"],
              ["Sintine/yağ separatörü (OWS)", "6 ay", "PM + 15 ppm alarm testi", "Calendar"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Haftalık ve Günlük İş Planlama Döngüsü",
      sections: [
        {
          subheading: "2.1 Look-ahead planlama ve önceliklendirme",
          paragraphs: [
            `İkinci Mühendis, hafta başında (genelde Pazartesi) PMS'ten 1–4 haftalık due/overdue listesini alır. İşler; emniyet kritikliği, klas/PSC takvimi, liman/seyir durumu (denizde mi limanda mı), yedek parça mevcudiyeti ve personel uygunluğuna göre sıralanır. Liman duruşunda yapılması gereken (immobilization gerektiren) işler ayrı bir kovaya konur ve Baş Mühendis + Kaptan ile koordine edilir.`,
            `Günlük "toolbox talk" (vardiya başı brifingi) sırasında o günün işleri tayfaya ve duty engineer'a açıklanır; her iş için risk değerlendirmesi, gereken izolasyon, PPE ve standby ihtiyacı konuşulur. İş bölümünde tecrübe-iş eşleştirmesi yapılır; ilk kez yapılan bir overhaul'a deneyimli bir personel mutlaka eşlik eder.`,
          ],
          bullets: [
            `Overdue iş sayısı sıfıra yakın tutulur; gecikme gerekçesi PMS'e not edilir`,
            `Immobilization gerektiren işler seyir programıyla çakışmamalı`,
            `Yedek parça stoğu doğrulanmadan iş açılmaz (söküp bekletme yasak)`,
            `Çift kişi gerektiren işlerde tek personel görevlendirilmez`,
            `Hot work, enclosed space, aloft çalışma ayrı permit ister`,
          ],
        },
        {
          subheading: "2.2 İş emri yaşam döngüsü: aç–yürüt–kapat",
          paragraphs: [
            `Bir iş emri açıldığında; ekipman, görev tanımı, gereken spare/sarf, tahmini süre ve atanan personel kaydedilir. İş yürütülürken kullanılan parçalar PMS stok modülünden düşülür (consumption logging). İş tamamlandığında; yapılan işlem, ölçülen değerler (clearance, bearing temp, basınç), değişen parçaların seri numarası ve bir sonraki bakım için not (örn. "wear sınırına yaklaşıldı") girilerek kapatılır.`,
            `İkinci Mühendis, kapanan iş emirlerini günlük gözden geçirir ve eksik/üstünkörü kapatmaları reddeder. Geri kayıt (feedback) zayıfsa, sonraki sörveyde kanıt yetersizliği nedeniyle bulgu (deficiency) doğar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ölçüm değeri olmadan iş kapatılmaz",
              text: `"Yapıldı/OK" yazmak yeterli değildir. Bearing clearance 0,42 mm, jenoz egzoz sıcaklığı dengelendi, enjektör açılma basıncı 280 bar gibi sayısal kanıt girilmelidir. Trend ancak böyle oluşur ve condition-based karar verilebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Permit-to-Work ve Risk Değerlendirmesi",
      sections: [
        {
          subheading: "3.1 PTW sistemi ve izolasyon (LOTO)",
          paragraphs: [
            `Yüksek riskli işler Permit-to-Work (PTW) ile başlar: hot work (kaynak/taşlama), enclosed/confined space giriş, yüksekte çalışma, elektrik izolasyonu, basınçlı sistem açma. İkinci Mühendis genellikle PTW'yi onaylayan/koordine eden makamdır; Baş Mühendis ile birlikte imzalanır. Enerji izolasyonu için Lock-Out/Tag-Out (LOTO) uygulanır; her enerji kaynağı (elektrik, basınçlı hava, hidrolik, buhar, yay enerjisi) güvenli hale getirilir ve etiketlenir.`,
            `Stored energy (akümülatör basıncı, sıkışmış yay, sıcak akışkan) çoğu kazanın görünmez sebebidir. İzolasyon doğrulanmadan (try-out: aç-dene) işe başlanmaz. İkinci Mühendis, anahtarların tek elde toplanmasını ve aynı pano üzerinde birden çok ekip çalışıyorsa multi-lock hasp kullanılmasını sağlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Enclosed space — ölümcül risk",
              text: `Sintine, double-bottom, kojferdam, COW tankı gibi kapalı hacimlere giriş enclosed space entry permit ister. O2 (%20,9 hedef), LEL, H2S, CO ölçülür; standby personel ve resüsitasyon ekipmanı hazır olur. SOLAS III/19 kapsamında yıllık enclosed space rescue drill zorunludur.`,
            },
          ],
        },
        {
          subheading: "3.2 Risk değerlendirmesi ve toolbox talk",
          paragraphs: [
            `Standart olmayan veya yüksek enerjili her iş için yazılı risk değerlendirmesi (JSA/JHA) yapılır: tehlike–maruziyet–mevcut bariyer–ek önlem. İkinci Mühendis, generic risk assessment'ı işin özelliğine göre uyarlar; "kopyala-yapıştır" risk değerlendirmesi gerçek tehlikeleri maskeler. Toolbox talk'ta tüm ekip risk değerlendirmesini imzalar; soru sorma ve "dur" deme yetkisi (stop-work authority) herkese hatırlatılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yedek Parça ve Sarf Malzeme Yönetimi",
      sections: [
        {
          subheading: "4.1 Spare stok seviyesi ve kritik yedek (ROB)",
          paragraphs: [
            `İkinci Mühendis, makine dairesi yedeklerinin ROB'unu (Remaining On Board) PMS stok modülünden takip eder. Kritik yedekler (enjektör, yakıt pompası elemanı, separatör conta seti, kompresör valf seti, ana makine bearing) için minimum/maksimum seviye tanımlanır; minimuma inildiğinde otomatik talep (requisition) oluşturulur. SOLAS ve klas, belirli kritik yedeklerin gemide bulundurulmasını şart koşar.`,
            `Talepler Baş Mühendis onayıyla şirket satınalmaya iletilir; lead time uzun parçalar (örn. krank mili yatağı) erken sipariş edilir. Yedek teslim alındığında doğru part number, hasarsızlık ve sertifika (gerekiyorsa class-approved) kontrol edilir ve doğru lokere (lokasyon kodlu) kaldırılır.`,
          ],
          table: {
            caption: `Yedek parça önceliklendirme matrisi`,
            headers: ["Kategori", "Örnek", "Min stok mantığı", "Lead time hassasiyeti"],
            rows: [
              ["A — kritik/uzun lead", "Krank yatağı, türboşarj rotoru", "≥1 set zorunlu", "Yüksek — erken sipariş"],
              ["B — kritik/orta", "Enjektör, FO pompa elemanı", "Maker önerisi", "Orta"],
              ["C — sarf yüksek", "Conta, O-ring, filtre", "Tüketim trendine göre", "Düşük — toplu sipariş"],
              ["D — genel", "Cıvata, kayış, ampul", "Buffer stok", "Düşük"],
            ],
          },
        },
        {
          subheading: "4.2 Söküm öncesi parça doğrulama",
          paragraphs: [
            `Bir overhaul'a başlamadan önce gereken tüm conta, O-ring ve aşınma parçalarının mevcut olduğu fiziken doğrulanır. Aksi halde ekipman sökülmüş ve parçası gelmeden devre dışı kalmış olur; bu, kritik ekipmanda emniyet açığı yaratır. İkinci Mühendis bu doğrulamayı iş emri açma şartı yapar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — söküp bekletme",
              text: `Bir tankerde yedek conta seti olmadan ana makine yakıt pompası söküldü; doğru conta 11 gün sonra geldi. Bu süre boyunca o ünite devre dışı kaldı, geri kalan ünitelere yüklenildi ve PSC denetiminde "maintenance planning" bulgusu yazıldı. Ders: parça doğrulanmadan iş açılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. İş Gücü Dağıtımı ve Vardiya Mühendisleriyle Koordinasyon",
      sections: [
        {
          subheading: "5.1 İş–beceri eşleştirmesi ve gözetim",
          paragraphs: [
            `İkinci Mühendis, işleri personelin ehliyet ve tecrübesine göre dağıtır. Üçüncü/Dördüncü Mühendis kendi sorumluluk alanındaki ekipmanın (jeneratör, kazan, purifier, yardımcı sistemler) bakımını yürütür; fitter ve yağcılar mekanik söküm/montaj, temizlik ve taşıma işlerini yapar. İlk defa yapılan veya yüksek riskli işlerde İkinci Mühendis bizzat saha gözetimi yapar.`,
            `Çalışma–dinlenme saatleri (STCW/MLC) gözetilir; yorgun personele kritik iş verilmez. Liman duruşunda yoğun bakım planlanıyorsa overtime ve dinlenme dengesi önceden hesaplanır, gerekirse iş takvime yayılır.`,
          ],
        },
        {
          subheading: "5.2 Denizde vs limanda bakım kararı",
          paragraphs: [
            `Denizde bakım, ekipmanın seyir emniyetini etkilememesi şartıyla yapılır (örn. standby jeneratör bakımı, ikinci hava kompresörü). Ana makineyi immobilize edecek işler (enjektör genel overhaul, scavenge giriş) yalnızca güvenli demir/liman koşulunda ve köprüüstü onayıyla yapılır. İkinci Mühendis, immobilization öncesi köprüüstüne bildirim, telgraf/UMS modu ve geri devreye alma süresini koordine eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "UMS ve vardiyasız makine dairesi",
              text: `Vardiyasız (UMS — Unattended Machinery Space) çalışan gemilerde alarm ve duty engineer çağrı sistemi devamlı çalışır halde tutulmalıdır. Bakım sırasında bir alarm/koruma devre dışı bırakılacaksa, bu by-pass kayıt altına alınır, etiketlenir ve iş biter bitmez geri alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Kayıt, İzlenebilirlik ve Geri Bildirim",
      sections: [
        {
          subheading: "6.1 PMS feedback ve trend",
          paragraphs: [
            `Her kapatılan iş emri bir veri noktasıdır. Bearing clearance, egzoz sıcaklık dağılımı, titreşim, yağ analiz sonuçları zaman içinde trend oluşturur. İkinci Mühendis bu trendi izleyerek aralık optimizasyonu önerir; örneğin bir purifier'ın conta ömrü beklenenden kısaysa aralık kısaltılır veya kök neden (besleme sıcaklığı, kalite) araştırılır.`,
            `Defect/breakdown durumunda ayrı bir arıza kaydı (defect report) açılır; kök neden analizi (5-Why) ve düzeltici aksiyon kaydedilir. Tekrarlayan arızalar şirket teknik departmanına eskale edilir.`,
          ],
        },
        {
          subheading: "6.2 Denetime hazır kayıt zinciri",
          paragraphs: [
            `Klas continuous survey, PSC ve vetting (SIRE/CDI) denetimlerinde PMS kayıtları incelenir. Tutarsız tarih, kanıtsız "tamamlandı", overdue yığılması ve by-pass kayıtsızlığı tipik bulgulardır. İkinci Mühendis, denetim öncesi PMS'i Baş Mühendis ile birlikte gözden geçirir ve eksikleri kapatır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Fotoğraf kanıtı standardı",
              text: `Sökülen parçanın aşınma yüzeyi, mikrometre okuması, etiketli yeni parça ve montaj sonrası genel görünüm fotoğraflanır. Fotoğraf tarihli ve ekipman tag'i ile ilişkilendirilir. Bu, hem teknik hafıza hem de denetim kanıtıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Bakım İşleri ve Saha Pratiği",
      sections: [
        {
          subheading: "7.1 Filtre, conta ve rutin işler",
          paragraphs: [
            `Yakıt/yağ filtre değişimi, separatör bowl temizliği, soğutucu (cooler) temizliği, valf taşlama ve conta yenileme makine dairesinin omurga işleridir. Bu işlerde temizlik (foreign object / FOD kontrolü), doğru tork değerleri ve montaj sonrası kaçak testi kritiktir. İkinci Mühendis, montaj sonrası ilk çalıştırmada (first start after maintenance) bizzat hazır bulunur.`,
          ],
        },
        {
          subheading: "7.2 Overhaul işleri ve clearance ölçümü",
          paragraphs: [
            `Büyük overhaul'larda (enjektör, pompa elemanı, bearing yenileme) maker'in clearance ve tork tablosu esastır. Ölçümler kalibreli aletle yapılır; lastik conta tek kullanımlık olarak değiştirilir. İkinci Mühendis, "as found / as left" (sökerken bulunan / takarken bırakılan) değerleri kayda geçirir; bu, aşınma hızını gösterir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Acil Durum ve Plan Dışı Bakım",
      sections: [
        {
          subheading: "8.1 Breakdown maintenance yönetimi",
          paragraphs: [
            `Plansız arıza (breakdown) durumunda İkinci Mühendis; emniyeti sağlar (izolasyon, yangın/sızıntı kontrolü), Baş Mühendise bilgi verir, geçici/kalıcı tamir kararını birlikte alır ve gerekirse şirket/maker teknik desteğini devreye sokar. Geçici onarımlar (temporary repair) kayıt altına alınır ve kalıcı çözüm planlanır.`,
          ],
        },
        {
          subheading: "8.2 Kritik ekipman yedekleme ve riske maruz kalma",
          paragraphs: [
            `Bir kritik ekipman arızalandığında yedek/alternatif düzenleme devreye alınır ve "single point of failure" durumu varsa seyir riski yeniden değerlendirilir (örn. tek jeneratör kaldıysa hız/yük sınırlaması, liman kararı). İkinci Mühendis bu durumu derhal Baş Mühendise ve köprüüstüne raporlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "By-pass edilen koruma unutulmaz",
              text: `Bakım için devre dışı bırakılan koruma (örn. düşük yağ basıncı shutdown) iş bitiminde mutlaka geri alınır. Geri alınmamış by-pass, ekipmanı korumasız bırakır ve büyük hasara yol açar. By-pass register tutulması iyi uygulamadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 İkinci Mühendisin PMS yürütme checklist'i",
          bullets: [
            `Haftalık look-ahead listesi çekildi ve önceliklendirildi mi?`,
            `Overdue iş sayısı kontrol altında ve gerekçeli mi?`,
            `Yüksek riskli işler için PTW + risk değerlendirmesi + toolbox talk yapıldı mı?`,
            `İzolasyon (LOTO) ve enclosed space ölçümleri doğrulandı mı?`,
            `İş öncesi spare/sarf fiziken doğrulandı mı?`,
            `İş–beceri eşleştirmesi ve çalışma/dinlenme saatleri uygun mu?`,
            `Immobilization işleri köprüüstü onayıyla mı planlandı?`,
            `Tamamlanan işler ölçüm değeri + fotoğrafla PMS'e kapatıldı mı?`,
            `By-pass edilen alarm/koruma geri alındı mı?`,
            `Klas/PSC/vetting için kayıt zinciri tutarlı mı?`,
          ],
          paragraphs: [
            `İkinci Mühendisin bakım yönetimindeki başarısı; planlı düşünme, sahada disiplin ve eksiksiz kayıt üçgeninden gelir. İyi yürütülen bir PMS, arızayı azaltır, sörveyi sorunsuz geçirir ve en önemlisi mürettebatı ve gemiyi korur. Geciken ve kanıtsız kapatılan bakım ise her zaman daha pahalı bir arıza ve denetim bulgusu olarak geri döner.`,
          ],
        },
      ],
    },
  ],
};

export default content;
