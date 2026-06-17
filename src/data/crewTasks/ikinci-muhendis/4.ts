import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine dairesi housekeeping ve düzen",
  roleSlug: "ikinci-muhendis",
  taskIndex: 4,
  estimatedPages: 24,
  intro: `İkinci Mühendis, makine dairesinin operasyonel başı olarak temizlik, düzen ve emniyet standartlarının günlük olarak sürdürülmesinden birinci derecede sorumludur. Housekeeping; yalnızca estetik bir mesele değil, yangın, kayma/düşme ve kirlilik risklerini doğrudan azaltan bir emniyet bariyeridir. Yağ sızıntılarının kontrolü, bilge seviyesinin izlenmesi, aydınlatmanın çalışır tutulması ve kaçış yollarının açık kalması; PSC, vetting (SIRE/CDI) ve ISM denetimlerinde doğrudan değerlendirilen kalemlerdir. Bu bölüm, İkinci Mühendisin makine dairesi düzenini bir yönetim sistemi olarak nasıl kurguladığını adım adım açıklar.`,
  sources: [
    "ISM Code — Safety Management System / 1.2.2 risk değerlendirmesi",
    "SOLAS Chapter II-2 — Fire Protection, Detection & Extinction",
    "SOLAS II-2 Reg. 4 — Probability of ignition (yağ sızıntısı kontrolü)",
    "MARPOL Annex I — Bilge ve sintine yağ deşarjı kuralları",
    "ILO/MLC 2006 — Çalışma ortamı ve emniyet (Reg. 4.3)",
    "OCIMF SIRE 2.0 — Engine Room inspection elements",
    "IMO Resolution A.1116(30) — Escape routes / kaçış yolları",
    "IACS Rec. No. 78 — Safe working in machinery spaces",
  ],
  chapters: [
    {
      heading: "1. Housekeeping'in Emniyet ve Denetim Boyutu",
      lead: `Düzenli bir makine dairesi, iyi yönetilen bir geminin en görünür kanıtıdır. Denetçi henüz bir kayda bakmadan, dairenin düzeninden yönetim kalitesini okur.`,
      sections: [
        {
          subheading: "1.1 Housekeeping neden bir emniyet bariyeridir",
          paragraphs: [
            `Makine dairesi; sıcak yüzeyler (egzoz manifoldu, türbin, kazan), yüksek basınçlı yakıt/yağ hatları ve elektrikli ekipmanın bir arada bulunduğu yüksek riskli bir alandır. Sıcak yüzeye damlayan bir yakıt/yağ sızıntısı, SOLAS II-2'nin ana yangın senaryosudur ve makine dairesi yangınlarının önde gelen nedenidir. Housekeeping, bu senaryonun "ignition probability"sini düşüren ilk savunma hattıdır.`,
            `İyi housekeeping aynı zamanda kayma, takılma ve düşme (slip-trip-fall) kazalarını önler. Zeminde biriken yağ filmi, dağınık alet veya gevşek hortumlar; özellikle gemi hareketliyken ciddi yaralanmalara yol açar. İkinci Mühendis, bu riskleri günlük tur sırasında proaktif olarak tespit ve elimine eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — yağ sızıntısı ve sıcak yüzey",
              text: `SOLAS II-2 Reg. 4, basınçlı yakıt/yağ hatlarının sıcak yüzeylere (220°C üstü) sızıntı yapmasını önlemeyi (örn. spray shield, jacketed pipe) zorunlu kılar. Housekeeping turunda eksik/kaymış spray shield ve ısıl izolasyonun yağ emmiş hâli (oil-soaked lagging) öncelikli bulgudur.`,
            },
          ],
        },
        {
          subheading: "1.2 Denetimlerde housekeeping'in ağırlığı",
          paragraphs: [
            `PSC ve özellikle vetting denetimlerinde (SIRE 2.0, CDI) makine dairesi düzeni, doğrudan puanlanan ve genel kanaati belirleyen bir kalemdir. Yağ emmiş izolasyon, kirli sintine, etiketsiz kimyasal bidonları ve kapalı kaçış yolları sık görülen non-conformity başlıklarıdır.`,
            `İkinci Mühendis, denetim öncesi bir "deep clean" yerine, sürekli ve standart bir düzeni hedefler. Denetçi, düzenin "doğal" mı yoksa "son dakika kozmetiği" mi olduğunu hortum sarımından, alet panosundan ve sintine altından kolayca anlar.`,
          ],
          bullets: [
            `Yağ emmiş ısıl izolasyon (oil-soaked lagging) var mı?`,
            `Sintine temiz mi, yüzeyde yağ filmi/iz var mı?`,
            `Kaçış yolları, geçişler ve kapılar engelsiz mi?`,
            `Acil ekipman (yangın, kaçış solunum cihazı) erişilebilir mi?`,
            `Kimyasal/yağ bidonları etiketli ve emniyetli istiflenmiş mi?`,
          ],
        },
      ],
    },
    {
      heading: "2. Yağ Sızıntısı Kontrolü ve Sıcak Yüzey Yönetimi",
      sections: [
        {
          subheading: "2.1 Sızıntı kaynaklarının tespiti ve sınıflandırılması",
          paragraphs: [
            `İkinci Mühendis, sızıntıları "drip", "weep" ve "spray" olarak sınıflandırır. Drip tray içine damlayan küçük bir sızıntı izlenebilirken, basınçlı bir hattan püsküren spray sızıntı acil müdahale gerektirir; çünkü atomize yakıt sıcak yüzeyde anında tutuşabilir. Sızıntının kaynağı (flanş, fitting, pompa salmastrası, enjektör) etiketlenir ve PMS'e iş emri açılır.`,
            `Geçici çözüm (clamp, drip tray) ile kalıcı çözüm (conta, salmastra, hat yenileme) ayrımı net tutulur. Geçici düzenleme her zaman kayıt altına alınır ve devir teslimde aktarılır; çünkü unutulan bir "geçici" çözüm en sık yangın nedenidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Oil-soaked lagging = yangın bombası",
              text: `Yağ emmiş ısıl izolasyon, düşük tutuşma noktasına sahip bir fitildir; yüzey 200°C'ye varmasa bile yavaş oksidasyonla kendiliğinden tutuşabilir. Tespit edilen yağlı izolasyon derhal sökülür, yüzey temizlenir, sızıntı kaynağı giderilir ve izolasyon yenilenir.`,
            },
          ],
        },
        {
          subheading: "2.2 Drip tray, save-all ve emici malzeme yönetimi",
          paragraphs: [
            `Tüm pompa, filtre ve flanş bölgelerinde save-all (drip tray) bulundurulur ve düzenli boşaltılır; dolu bir drip tray taşarak sintineyi kirletir. İkinci Mühendis, drip tray'lerin sintineye değil, uygun sludge/yağ toplama hattına yönlendirilmesini sağlar.`,
            `Emici pad ve granül stoğu erişilebilir tutulur; ancak kirlenmiş emici malzeme yağlı atık (oily rag) olarak kendiliğinden tutuşma riski taşır ve kapaklı metal kutuda biriktirilip uygun şekilde bertaraf edilir. Açıkta biriken yağlı bezler tek başına bir yangın nedenidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Bilge (Sintine) Seviye Takibi ve Temizliği",
      sections: [
        {
          subheading: "3.1 Sintine seviye izleme ve alarm",
          paragraphs: [
            `İkinci Mühendis, bilge well seviyelerini ve high-level bilge alarmlarının çalışırlığını günlük izler. Yükselen bir sintine seviyesi; bir sızıntının (deniz suyu, soğutma suyu, yağ) habercisidir ve kaynağı bulunana kadar takip edilir. Sintine pompalama kayıtları MARPOL Annex I kapsamında ORB ile uyumlu tutulur.`,
            `Sintine içeriğinin yağ oranı önemlidir; aşırı yağlı sintine OWS'i tıkar ve 15 ppm'i sağlamayı zorlaştırır. Bu nedenle housekeeping (kaynakta yağ sızıntısını önlemek), çevresel uyumun da ön koşuludur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temiz sintine = az yağlı sintine",
              text: `Sintineye giren yağı azaltmanın en etkili yolu, sızıntıyı kaynakta durdurmaktır. Drip tray disiplini ve sızıntı takibi, OWS yükünü ve sludge üretimini doğrudan düşürür; böylece hem çevre uyumu hem maliyet iyileşir.`,
            },
          ],
        },
        {
          subheading: "3.2 Sintine temizliği ve emniyetli çalışma",
          paragraphs: [
            `Periyodik sintine temizliği planlanır; sıyrılan yağ uygun sludge/bilge holding tankına aktarılır. Sintine altı çalışmaları çoğu zaman kapalı/dar alan riski (düşük O2, hidrokarbon buharı) taşır; gaz ölçümü, havalandırma ve gerektiğinde permit uygulanır.`,
            `Temizlik sonrası sintine kuru ve yüzey çıplak metal olarak tutulur; böylece yeni bir sızıntı anında görünür hâle gelir. Boyalı/temiz bir sintine, denetçiye olduğu kadar mürettebata da erken uyarı verir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Aydınlatma, Havalandırma ve Ortam Koşulları",
      sections: [
        {
          subheading: "4.1 Normal ve acil aydınlatma",
          paragraphs: [
            `Yetersiz aydınlatma; hatalı okuma, kaza ve eksik bakım anlamına gelir. İkinci Mühendis, çalışmayan armatürlerin, özellikle manevra konsolu, kazan dairesi ve geçiş yollarındaki lambaların derhal değişimini sağlar.`,
            `Acil aydınlatma ve kaçış yolu işaretlemesi (photoluminescent / battery-backed) düzenli test edilir. Blackout senaryosunda emergency aydınlatmanın devreye girmesi, mürettebatın güvenli tahliyesi için kritiktir.`,
          ],
        },
        {
          subheading: "4.2 Havalandırma, gürültü ve ortam temizliği",
          paragraphs: [
            `Makine dairesi ventilasyonu hem yanma havası hem de personel için kritiktir; tıkanmış emiş ızgaraları ve kirli filtreler hem motor performansını hem ortam ısısını olumsuz etkiler. İkinci Mühendis, ventilasyon ve davlumbazların temizliğini housekeeping programına dâhil eder.`,
            `Yüksek gürültülü bölgelerde işaretleme ve kulak koruyucu erişimi sağlanır (MLC çalışma ortamı gereği). Toz, kurum ve kaçak buhar birikimi düzenli temizlenerek hem solunum hem yangın riski azaltılır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kaçış Yolları, Geçişler ve Acil Erişim",
      sections: [
        {
          subheading: "5.1 Escape route'ların sürekli açık tutulması",
          paragraphs: [
            `Makine dairesinde en az iki bağımsız kaçış yolu bulunur ve bunlar her an engelsiz olmalıdır. İkinci Mühendis, geçişlere bırakılan alet, malzeme, hortum veya geçici depolamanın derhal kaldırılmasını sağlar; kaçış yolu asla depo alanı değildir.`,
            `Escape trunk kapıları, korkuluklar ve merdiven basamaklarının sağlamlığı kontrol edilir. Acil bir yangın veya su baskınında saniyeler önemlidir; tıkalı bir kaçış yolu ölümcül sonuç doğurabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Kaçış yolları zorunluluğu",
              text: `SOLAS II-2 ve IMO A.1116(30) makine dairelerinde iki ayrı kaçış imkânı ve sürekli açık geçiş zorunluluğu getirir. Engellenen kaçış yolu, PSC denetiminde önemli bir kusur (deficiency) ve potansiyel tutma (detention) sebebidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Acil ekipmana erişim",
          paragraphs: [
            `Taşınabilir yangın söndürücüler, EEBD (Emergency Escape Breathing Device), yangın istasyonları ve quick-closing valf kumandaları açık, işaretli ve erişilebilir tutulur. Önüne malzeme istiflenmiş bir yangın istasyonu, var olmamasıyla eşdeğerdir.`,
            `İkinci Mühendis, acil kapatma (emergency stop, remote shut-off, quick-closing valve) noktalarının housekeeping turunda her zaman ulaşılabilir olduğunu doğrular. Bu noktalar muster list ve fire plan ile tutarlı işaretlenir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Alet, Yedek Parça ve Kimyasal Düzeni",
      sections: [
        {
          subheading: "6.1 Workshop, alet panosu ve yedek parça istifi",
          paragraphs: [
            `Alet panosunda "her aletin bir yeri" ilkesi uygulanır (shadow board); eksik alet anında görünür ve bir işin yarım kaldığını ya da bir aletin makine içinde unutulduğunu (FOD riski) gösterir. Workshop tezgâhı, taşlama/torna alanı temiz ve talaşsız tutulur.`,
            `Yedek parçalar, deniz hareketine karşı emniyetli (lashing/raf) ve nem korumalı istiflenir; ağır parçalar alt rafta tutulur. Kritik yedeklerin yeri etiketli ve stok kaydıyla tutarlı olmalı ki acil bir arızada zaman kaybedilmesin.`,
          ],
        },
        {
          subheading: "6.2 Kimyasal yönetimi ve atık ayrıştırma",
          paragraphs: [
            `Boiler/cooling water kimyasalları, solventler, boyalar ve yağlar etiketli, MSDS/SDS erişilebilir ve uygun bölmelerde saklanır. Birbiriyle uyumsuz kimyasallar ayrı tutulur; dökülme durumunda spill kit hazır bulundurulur.`,
            `Yağlı atık, sludge, kullanılmış filtre ve garbage MARPOL Annex I/V kapsamında ayrıştırılır. İkinci Mühendis, makine dairesi atığının uygun toplama noktalarına yönlendirilmesini ve teslim kayıtlarının tutulmasını gözetir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Unutulan el feneri rölantide arıza yaptı",
              text: `Bir bakım sonrası türbin emiş kanalına düşen bir el feneri (FOD), kalkışta türbin kanatlarını hasara uğrattı. Shadow board disiplini ve "tool count before close-up" kontrolü olsaydı önlenebilirdi; housekeeping doğrudan mekanik güvenilirliği etkiler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Housekeeping Programının Yönetimi ve Devir Teslim",
      sections: [
        {
          subheading: "7.1 Sorumluluk dağılımı ve rutinler",
          paragraphs: [
            `İkinci Mühendis, makine dairesini bölgelere ayırır ve her bölgenin temizlik/düzen sorumluluğunu vardiya mühendisleri ve oilman/wiper'lara atar. Günlük, haftalık ve aylık housekeeping görevleri PMS veya kontrol listesi ile takip edilir; "herkesin işi, kimsenin işi" tuzağı bu net sahiplikle önlenir.`,
            `Düzenli "engine room walk-round" sırasında bulgular kayda alınır, fotoğraflanır ve kapanışı izlenir. Housekeeping, tek seferlik bir temizlik değil, sürekli iyileştirilen bir rutin olarak yönetilir.`,
          ],
          bullets: [
            `Günlük: drip tray boşaltma, sintine kontrol, geçiş yolu temizliği`,
            `Haftalık: bölge temizliği, alet panosu kontrolü, ventilasyon ızgara`,
            `Aylık: derin sintine temizliği, izolasyon kontrolü, depo düzeni`,
            `Sürekli: yağ sızıntısı takibi, kaçış yolu açıklığı, etiketleme`,
          ],
        },
        {
          subheading: "7.2 Kayıt, denetime hazırlık ve devir teslim",
          paragraphs: [
            `Housekeeping bulguları ve kapanışları kayıt altında tutulur; bu kayıtlar denetimde geminin "due diligence" kanıtıdır. İkinci Mühendis, vardiya devir tesliminde açık housekeeping işlerini, izlenen sızıntıları ve geçici düzenlemeleri yazılı aktarır.`,
            `Denetim öncesi panik temizliği yerine sürekli standart hedeflenir; ancak yine de bir ön kontrol turu ile yağlı izolasyon, kapalı kaçış yolu ve etiketsiz kimyasal gibi kritik bulgular giderilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 İkinci Mühendisin housekeeping checklist'i",
          bullets: [
            `Sıcak yüzeylerde yağ sızıntısı veya yağlı izolasyon var mı, spray shield yerinde mi?`,
            `Tüm drip tray'ler boş ve doğru hatta yönlendirilmiş mi?`,
            `Sintine temiz, kuru ve seviye/alarmları çalışır durumda mı?`,
            `Kaçış yolları, geçişler ve acil kapatma noktaları engelsiz mi?`,
            `Acil ekipman (söndürücü, EEBD, yangın istasyonu) erişilebilir mi?`,
            `Aydınlatma (normal + acil) ve havalandırma tam çalışıyor mu?`,
            `Alet panosu tam, workshop temiz, FOD riski yok mu?`,
            `Kimyasallar etiketli, MSDS erişilebilir, atık ayrıştırılmış mı?`,
            `Yağlı bez/emici malzeme kapalı metal kutuda mı?`,
            `Bulgular kaydedildi, kapanışı izlendi ve devir teslimde aktarıldı mı?`,
          ],
          paragraphs: [
            `Makine dairesi housekeeping'i, İkinci Mühendisin liderlik kalitesinin en görünür ve en sürekli sınavıdır. Disiplinli bir düzen; yangın ve kaza riskini düşürür, çevresel uyumu kolaylaştırır, ekipman güvenilirliğini artırır ve her denetimde geminin olumlu intibasını şekillendirir. İyi yönetilen bir makine dairesi, henüz bir kayıt incelenmeden gemiyi "iyi işletiliyor" olarak konumlandırır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
