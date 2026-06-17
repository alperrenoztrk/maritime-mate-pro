import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title:
    "Kaldırma ve taşıma ekipmanlarının (rigging/lifting gear) güvenlik kontrolü",
  roleSlug: "yagci-fitter",
  taskIndex: 6,
  estimatedPages: 26,
  intro: `Makine dairesinde ağır parçaları (silindir kapağı, piston, pompa, yatak, krank parçaları) kaldırmak günlük işin parçasıdır ve bu işlerde kullanılan kaldırma/taşıma ekipmanı (lifting gear) sağlam değilse ölümcül kazalar yaşanır. Yağcı/Fitter; chain block (zincir palanga), wire ve tekstil sling'ler, shackle, eye bolt, overhead crane/monorail gibi ekipmanların periyodik güvenlik kontrolünü yapar, SWL (Güvenli Çalışma Yükü) işaretlerini doğrular, hasarlı ekipmanı hizmet dışına alır ve kaldırma operasyonlarını güvenli rig/sapan tekniğiyle yürütür. Bu bölüm; ekipman türlerini, kontrol kriterlerini, kayıt sistemini ve güvenli kaldırma pratiğini somut biçimde açıklar.`,
  sources: [
    "ILO Convention No. 152 — Occupational Safety and Health (Dock Work) / lifting gear",
    "LOLER prensipleri — Lifting Operations and Lifting Equipment (best practice)",
    "ILO/IMO Code of Safe Working Practices for Merchant Seafarers (COSWP) — Lifting plant",
    "SOLAS / Class Society Rules — Lifting appliances ve register",
    "ISM Code — Planned Maintenance ve risk assessment",
    "Manufacturer manuals — chain block, sling, shackle SWL ve muayene aralıkları",
    "ISO 4309 — Wire rope inspection (discard kriterleri)",
    "Company SMS — Lifting operations procedure ve register of lifting appliances",
  ],
  chapters: [
    {
      heading: "1. Kaldırma Ekipmanları ve Temel Kavramlar",
      lead: `Bir kaldırma kazasında yük saniyeler içinde düşer; düşen bir silindir kapağı ya da pompa, altındaki kişiyi öldürür. Bu yüzden her kaldırma ekipmanı, her kullanımdan önce ve periyodik olarak güvenle test edilmiş olmalıdır.`,
      sections: [
        {
          subheading: "1.1 Ekipman türleri",
          paragraphs: [
            `Makine dairesinde kullanılan başlıca kaldırma ekipmanları: chain block / lever hoist (zincir palanga / kasnak), overhead travelling crane ve monorail (tavan vinci, ME üstünde), wire rope sling (çelik tel sapan), chain sling (zincir sapan), tekstil/web sling (polyester kayış sapan), shackle (kilit), eye bolt (mapa) ve trolley'lerdir. Her birinin kendine özgü SWL'i, kullanım sınırı ve muayene kriteri vardır.`,
            `Bu ekipmanlar bir "kaldırma planı" çerçevesinde birlikte kullanılır: yük, doğru sling ve shackle ile bağlanır; chain block veya crane ile kaldırılır; trolley ile taşınır. Zincirin en zayıf halkası tüm sistemi belirler; bu yüzden her bileşen ayrı ayrı sağlam olmalıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Zincir en zayıf halkası kadar güçlüdür",
              text: `Bir kaldırma sistemi, en zayıf bileşeni kadar güvenlidir. SWL'i yüksek bir crane, çürük bir sling'le kullanılırsa sistem sling'in dayanımıyla sınırlıdır. Her bileşeni (block, sling, shackle, eye bolt) ayrı ayrı kontrol edin.`,
            },
          ],
        },
        {
          subheading: "1.2 SWL, WLL ve güvenlik faktörü",
          paragraphs: [
            `SWL (Safe Working Load) veya WLL (Working Load Limit), bir ekipmanın güvenle kaldırabileceği maksimum yüktür ve ekipman üzerine işaretlenir/etiketlenir. Bu değer, ekipmanın kopma yükünün (breaking load) bir güvenlik faktörüne (genelde 4:1, 5:1 veya tekstil sling'lerde 7:1) bölünmesiyle belirlenir. SWL asla aşılmaz.`,
            `Sling'lerde efektif SWL, kullanım açısına (sling angle) göre düşer; sling'ler dikten uzaklaştıkça (açı arttıkça) her bacaktaki yük artar. Yağcı, çok bacaklı sapanlamada açı faktörünü hesaba katar; geniş açı (>120°) çok tehlikelidir. SWL etiketi okunamıyorsa ekipman kullanılmaz.`,
          ],
          table: {
            caption: `Sling Açısı ve Efektif Kapasite (Yaklaşık)`,
            headers: ["Sling Açısı (bacaklar arası)", "Kapasite Faktörü", "Açıklama"],
            rows: [
              ["0° (dik / tek bacak)", "%100", "En güvenli, tam SWL"],
              ["30°", "~%97", "Çok güvenli"],
              ["60°", "~%87", "Kabul edilebilir"],
              ["90°", "~%71", "Dikkat — yük artıyor"],
              ["120°", "~%50", "Tehlikeli — kaçınılır"],
              [">120°", "<%50", "Yasak — bacaklarda aşırı yük"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Çelik Tel Sapan (Wire Rope Sling) Kontrolü",
      sections: [
        {
          subheading: "2.1 Broken wire, kink ve korozyon",
          paragraphs: [
            `Çelik tel sapanlar zamanla yorulur ve hasarlanır. Kontrolde aranan kusurlar: kopuk teller (broken wires), kink (kalıcı bükülme/halka), bird-caging (tellerin kafes gibi açılması), aşırı aşınma, korozyon (pas), ısı hasarı (renk değişimi) ve göz/eklem bölgesindeki (ferrule/splice) hasar. Belirli sayıda kopuk tel (ISO 4309 kriterleri) ekipmanı hizmet dışı bırakır.`,
            `Yağcı, sapanı boylu boyunca elle (eldivenli) ve gözle tarar; kopuk tel batar, kink elle hissedilir. Yağlı bir bez sapanı boydan boya geçirildiğinde kopuk teller beze takılır — pratik bir tarama yöntemidir. Göz (eye) ve presli kovan (ferrule) bölgesi en kritik kontrol noktasıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISO 4309 — Tel halat hizmetten çıkarma",
              text: `Çelik tel halat/sapan, belirli sayıda kopuk tel, lokal kopuk tel yoğunlaşması, kink, bird-caging, çap azalması, korozyon veya ısı hasarında hizmet dışı bırakılır. Şüphede kalındığında ekipman kullanılmaz — "belki dayanır" yaklaşımı kaza demektir.`,
            },
          ],
        },
        {
          subheading: "2.2 Doğru kullanım ve koruma",
          paragraphs: [
            `Çelik sapan keskin köşelerden geçerken yumuşatıcı (softener/packing) kullanılmazsa tel ezilir ve kopar. Sapan düğümlenmez, kink'lenmez ve yük altında bükülmez. Kullanılmadığında kuru, asılı ve korozyondan korunmuş şekilde saklanır; zeminde sürünmez.`,
          ],
        },
      ],
    },
    {
      heading: "3. Tekstil / Web Sapan ve Zincir Sapan Kontrolü",
      sections: [
        {
          subheading: "3.1 Tekstil (polyester) sling kontrolü",
          paragraphs: [
            `Tekstil/web sling'ler hafif ve yüzeyi koruyucudur ama kesik, aşınma, kimyasal hasar ve UV bozunmasına duyarlıdır. Kontrolde aranan: yırtık/kesik, aşınmış dokuma, kimyasal yanık (yağ/asit lekesi ve sertleşme), ısı hasarı (erime/parlama), dikiş açılması ve renk solması. Etiketin (SWL, malzeme, üretim/test tarihi) okunaklı olması zorunludur; etiketi olmayan sling kullanılmaz.`,
            `Tekstil sling'lerde renk kodu kapasiteyi gösterir (örn. mor=1t, yeşil=2t, sarı=3t — standart bir konvansiyon); ancak SWL her zaman etiketten doğrulanır. Keskin köşede koruyucu kullanılmazsa sling anında kesilir. Hasarlı sling onarılmaz, atılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Etiketi olmayan/okunmayan sling KULLANILMAZ",
              text: `SWL ve test bilgisi okunamayan, etiketi kopmuş bir sling'in kapasitesi bilinemez; kullanmak kumar oynamaktır. Etiketsiz veya kesik/kimyasal hasarlı tekstil sling derhal hizmet dışına alınır ve imha edilir — "az hasarlı, idare eder" yoktur.`,
            },
          ],
        },
        {
          subheading: "3.2 Zincir sapan (chain sling) kontrolü",
          paragraphs: [
            `Zincir sapanlar yüksek sıcaklık ve aşınmaya dayanıklıdır; makine dairesinde sık kullanılır. Kontrolde aranan: halka aşınması (çap azalması), gerilme/uzama (stretch — halkalar uzamış görünür), çatlak, çentik, deformasyon, kaynak/ek hasarı ve master link/hook durumu. Hook'taki safety latch (emniyet mandalı) çalışır olmalıdır.`,
            `Zincir halkalarındaki uzama, aşırı yükün işaretidir; ölçülerek (gauge ile) tespit edilir. Aşınma belirli yüzdeyi geçince zincir hurdaya ayrılır. Yağcı, zinciri boylu boyunca her halkasıyla kontrol eder; tek hasarlı halka tüm zinciri hizmet dışı bırakır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Shackle, Eye Bolt ve Bağlantı Elemanları",
      sections: [
        {
          subheading: "4.1 Shackle (kilit) kontrolü",
          paragraphs: [
            `Shackle (D veya bow tipi), sapan ile yükü/kaldırma noktasını birleştirir. Kontrolde: gövde ve pim üzerinde SWL işareti, deformasyon (açılma/eğilme), aşınma, çatlak ve pim diş durumu aranır. Pim tam oturmalı; doğru shackle pimi kullanılmalı (yanlış/uydurma pim ölümcüldür). Pim, yük altında dönecek/gevşeyecek konumda bağlanmaz.`,
            `Shackle'ın gövdesine yan (transverse) yük bindirilmez; sadece tasarlandığı eksende yüklenir. Pimi yerine vida/çivi gibi uygunsuz bir parça takılmış shackle kesinlikle kullanılmaz. SWL işareti olmayan veya deforme shackle hizmet dışıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Doğru pim, doğru eksen",
              text: `Bir shackle yalnızca kendi pimiyle ve doğru eksende kullanılır. Yanlış/uydurma pim, yan yükleme ve aşınmış pim dişi, shackle'ın aniden açılmasına yol açar. Pim her zaman tam sıkılır ve gerekiyorsa dönmeye karşı emniyete alınır.`,
            },
          ],
        },
        {
          subheading: "4.2 Eye bolt (mapa) ve kaldırma noktaları",
          paragraphs: [
            `Eye bolt (mapa), ekipmana vidalanan kaldırma noktasıdır (örn. pompa gövdesi, motor). Düz eye bolt yalnızca eksenel (dik) yüke uygundur; açılı yük bindirilirse kırılır — açılı yükler için collar/swivel eye bolt kullanılır. Eye bolt tam dibine oturmalı (shoulder temas), dişleri sağlam olmalıdır.`,
            `Ekipman üreticisinin belirlediği kaldırma noktaları (lifting points / pad-eye) kullanılır; rastgele bir borudan veya zayıf bir flanştan kaldırma yapılmaz. Yağcı, ekipman manuelindeki kaldırma şemasını kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "5. Chain Block, Crane ve Monorail",
      sections: [
        {
          subheading: "5.1 Chain block / lever hoist kontrolü",
          paragraphs: [
            `Chain block (zincir palanga), makine dairesinde en çok kullanılan kaldırma cihazıdır. Kontrolde: yük zinciri (load chain) aşınma/uzama/çatlak, hand chain düzgün çalışma, fren mekanizması (yük tutma — block yükü kavradığında kaymamalı), hook ve safety latch, gövde deformasyonu aranır. SWL plakası okunaklı olmalıdır.`,
            `Fren testi kritiktir: yük kaldırıldığında ve hand chain bırakıldığında yük olduğu yerde durmalı, kaymamalıdır. Kayan fren ölümcüldür. Chain block düz çekilir; yan açıyla (yana doğru) çekilmesi zinciri sıkıştırır ve cihazı bozar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fren kayması = düşen yük",
              text: `Chain block'un freni yükü tutmuyor ve kayıyorsa, kaldırılan ağır parça kontrolsüz düşer. Her kullanımdan önce yüksüz/hafif yükle fren testi yapın. Kayan veya tutuk frenli block derhal hizmet dışına alınır.`,
            },
          ],
        },
        {
          subheading: "5.2 Overhead crane ve monorail",
          paragraphs: [
            `ME üstündeki tavan vinci (overhead travelling crane) ve monorail, ağır makine parçalarının kaldırılması için tasarlanmış sabit ekipmandır; SWL'i raylarına/kirişine işaretlidir. Kontrolde: ray durumu, trolley hareketi, limit switch'ler, fren, kanca ve kaldırma halatı/zinciri ve kumanda (pendant) çalışması aranır. Periyodik yük testi ve sertifikasyon gerektirir.`,
            `Yağcı, crane'i kullanmadan önce hareket yolunu (kimsenin yük altında olmadığını), limit switch'leri ve frenleri kontrol eder. Crane SWL'inin üstündeki yük asla kaldırılmaz; ağır kaldırma öncesi kaldırma planı ve risk assessment yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Periyodik Muayene, Sertifikasyon ve Kayıt",
      sections: [
        {
          subheading: "6.1 Register of lifting appliances",
          paragraphs: [
            `Tüm kaldırma ekipmanları bir "register of lifting appliances and cargo gear" (kaldırma ekipmanı sicili) altında kayıtlıdır; her ekipmanın SWL'i, son test tarihi, sertifikası ve muayene geçmişi bu sicilde tutulur. Yetkili kişi/firma tarafından periyodik (genelde yıllık) ve yük testli muayene zorunludur; sertifika geçerlilik süresi takip edilir.`,
            `Yağcı, kullandığı ekipmanın sertifikasının güncel olduğunu (etikette/sicilde tarih) doğrular. Süresi geçmiş ekipman, görünüşte sağlam olsa bile kullanılmaz; bu hem güvenlik hem de klas/PSC denetimi açısından bulgudur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ILO C152 / register zorunluluğu",
              text: `Kaldırma ekipmanları yetkili kişi tarafından periyodik olarak muayene ve test edilmeli, sonuçlar resmi bir sicile (register) kaydedilmelidir. Sertifikasız veya muayene tarihi geçmiş ekipmanın kullanımı yasaktır ve denetimde doğrudan bulgu çıkarır.`,
            },
          ],
        },
        {
          subheading: "6.2 Renk kodlama ve hizmet dışı bırakma",
          paragraphs: [
            `Birçok gemi, muayene durumunu görsel takip için renk kodlama (color coding) sistemi kullanır; geçerli muayene dönemine ait renkli etiket/bant takılı ekipman kullanıma uygundur. Renk geçmiş veya etiket yoksa ekipman ayrılır. Hasarlı ekipman "out of service" etiketiyle açıkça işaretlenir ve kullanımdan fiziksel olarak ayrılır (toplanır/kilitlenir) ki yanlışlıkla kullanılmasın.`,
            `Yağcı, kullandığı ve kontrol ettiği ekipmanların durumunu ve yaptığı kaldırma işlemlerini kaydeder; bakım kayıtları PMS ve klas denetiminde sunulabilmelidir. Hizmet dışı bırakma kararı tereddütsüz verilir.`,
          ],
          table: {
            caption: `Lifting Gear Hizmet Dışı Bırakma Kriterleri (Özet)`,
            headers: ["Ekipman", "Hizmet Dışı Kriteri", "Aksiyon"],
            rows: [
              ["Wire sling", "Kopuk tel, kink, korozyon, ısı", "Ayır, imha, sicile işle"],
              ["Web sling", "Kesik, etiket yok, kimyasal/ısı hasarı", "Ayır, imha"],
              ["Chain sling", "Halka uzaması, çatlak, aşınma", "Ayır, sertifikalı kontrol"],
              ["Shackle", "Deformasyon, yanlış pim, SWL yok", "Ayır, imha"],
              ["Chain block", "Fren kayması, zincir hasarı, SWL yok", "Out-of-service etiketi"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Güvenli Kaldırma Operasyonu (Rigging)",
      sections: [
        {
          subheading: "7.1 Kaldırma planı ve sapanlama (slinging)",
          paragraphs: [
            `Her ağır kaldırma öncesi plan yapılır: yükün ağırlığı ve ağırlık merkezi, kullanılacak ekipman ve SWL'i, kaldırma noktaları, sling açısı, taşıma güzergahı ve görev dağılımı belirlenir. Yük dengeli sapanlanır; ağırlık merkezi yanlış değerlendirilirse yük döner veya kayar. Yumuşak köşe koruyucuları (softeners) kullanılır.`,
            `Sapanlamada açı kontrol edilir, bacak yükleri dengelenir ve hook'a doğru oturma sağlanır. Kaldırma yavaş ve kontrollü başlar; yük yerden kalkar kalkmaz (birkaç cm) durulup denge ve sling oturması kontrol edilir, sonra devam edilir.`,
          ],
          bullets: [
            `Yük ağırlığı ve ağırlık merkezini belirle`,
            `SWL'i yeterli, sertifikalı ekipman seç`,
            `Doğru açı ve dengeli sapanlama yap`,
            `Köşelerde softener kullan`,
            `Yavaş kaldır, birkaç cm'de durup kontrol et`,
            `Yük altına ve gergin halat hattına girilmez`,
          ],
        },
        {
          subheading: "7.2 İletişim ve yük altına girmeme",
          paragraphs: [
            `Kaldırma sırasında tek bir yönlendirici (banksman/signaller) net el/sözlü sinyallerle operasyonu yönetir; karışık komut tehlikelidir. Mutlak kural: kimse asılı yükün altında veya hareket yolunda durmaz. Gergin bir halatın/zincirin kopması durumunda savrulma (snap-back) ölümcüldür.`,
            `Yağcı, kaldırma sırasında geri çekilme alanını korur, eldiven giyer ve elini sıkışma noktalarından (pinch point) uzak tutar. Gemi yalpalıyorsa yük serbestçe savrulabilir; kötü havada/yalpada ağır kaldırma ertelenir veya ekstra emniyetle yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Asılı yükün altına asla girilmez",
              text: `Hiçbir koşulda asılı yükün altında veya hareket yolunda durulmaz; ekipman kusursuz görünse bile fren, sling veya shackle bir anda başarısız olabilir. Yükü yönlendirmek için kontrol halatı (tag line) kullanılır, elle değil.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "8.1 Sık yapılan hatalar",
          paragraphs: [
            `En yaygın hatalar: SWL aşımı (yükü hafife alma), yanlış sling açısı (geniş açıyla aşırı bacak yükü), etiketsiz/sertifikasız ekipman kullanımı, keskin köşede koruyucusuz sapan, yan yüklenmiş shackle/eye bolt ve frenini test etmeden chain block kullanımı. Bir de "kısa iş, idare eder" zihniyetiyle hasarlı ekipman kullanımı.`,
            `Gemi hareketinin (roll/pitch) yükü dinamik olarak artırdığı sık unutulur; durağan SWL hesabı, yalpada yetersiz kalabilir. Yağcı, deniz koşulunu hesaba katarak emniyet payı bırakır.`,
          ],
        },
        {
          subheading: "8.2 Vaka — Aşınmış chain block freni",
          paragraphs: [
            `Bir gemide silindir kapağı kaldırılırken, kullanılan chain block'un freni aşınmış olduğu için yük yavaşça kaymaya başlamış; Yağcı erken fark edip yükü hemen güvenli bir desteğe indirmiş ve personeli yük hattından çekmiştir. İnceleme block'un periyodik kontrol tarihinin geçtiğini ortaya koymuş; ekipman hizmet dışına alınmıştır. Birkaç saniyelik dikkat ciddi bir ezilme kazasını önlemiştir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Kontrol bir formalite değil, hayat sigortasıdır",
              text: `Kaldırma ekipmanı kontrolü "kâğıt doldurma" işi değildir; her etiketin, her halkanın, her frenin arkasında potansiyel bir ölüm-kalım durumu vardır. Bir kez ihmal edilen kontrol, bir ömür boyu pişmanlık doğurabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Bakım, Saklama ve Eğitim",
      sections: [
        {
          subheading: "9.1 Doğru saklama ve bakım",
          paragraphs: [
            `Kaldırma ekipmanı kuru, temiz ve korozyondan korunmuş şekilde saklanır; sling'ler asılı tutulur (zeminde sürünmez), chain block'lar yağlanır ve örtülü saklanır. Nemli/yağlı ortamda gelişigüzel bırakılan ekipman çürür ve bir sonraki kullanımda güvensizdir. Bakım PMS programına dahildir.`,
            `Hasarlı ekipman onarılmaya çalışılmaz (özellikle sling ve shackle); standart, hasarlıyı atıp sertifikalı yenisiyle değiştirmektir. "Tamir edip kullanma" girişimi, görünmez bir zayıflık bırakır.`,
          ],
        },
        {
          subheading: "9.2 Yetkinlik ve eğitim",
          paragraphs: [
            `Güvenli kaldırma, eğitim gerektiren bir beceridir: sling açısı, ağırlık merkezi, ekipman seçimi ve sinyalizasyon öğrenilir. Deneyimsiz personel, yetkili biri gözetiminde çalışır. Yağcı/Fitter, bu beceriyi zamanla ustalaştırır ve yeni gelenlere doğru pratiği aktarır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "COSWP — Lifting plant",
              text: `Code of Safe Working Practices, kaldırma ekipmanının yalnızca eğitimli ve yetkili kişilerce kullanılmasını, her kullanım öncesi gözle kontrol edilmesini ve periyodik muayene/test rejimine tabi olmasını öngörür. Yetkinlik, ekipman kadar önemlidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın lifting gear checklist'i",
          bullets: [
            `Tüm ekipmanda SWL/WLL işareti okunaklı ve sertifika güncel mi?`,
            `Wire sling: kopuk tel/kink/korozyon kontrolü yapıldı mı?`,
            `Web sling: kesik/etiket/kimyasal-ısı hasarı kontrol edildi mi?`,
            `Chain sling: halka uzaması/çatlak/aşınma kontrol edildi mi?`,
            `Shackle: deformasyon, doğru pim, eksenel yükleme doğrulandı mı?`,
            `Eye bolt: doğru tip, tam oturma, açı uygunluğu kontrol edildi mi?`,
            `Chain block: fren tutuyor mu, zincir/hook sağlam mı?`,
            `Sling açısı uygun, ağırlık merkezi ve köşe koruyucuları doğru mu?`,
            `Asılı yük altına girilmiyor, tag line kullanılıyor mu?`,
            `Hasarlı ekipman out-of-service edildi, kayıtlar/sicil güncel mi?`,
          ],
          paragraphs: [
            `Kaldırma ve taşıma ekipmanı güvenliği, makine dairesindeki en ölümcül kazaları önler. Her sling'in, her shackle'ın, her frenin titizce kontrol edilmesi; doğru sapanlama ve "asılı yük altına girilmez" disiplini, ağır parçalarla çalışmayı güvenli kılar. İyi bir Fitter, en ağır parçayı bile en güvenli şekilde kaldıran, şüphe duyduğu hiçbir ekipmanı kullanmayan ve kayıtlarını eksiksiz tutan kişidir. Burada kestirme yol yoktur; sadece doğru yol vardır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
