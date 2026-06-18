import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet ekipmanları ve drill'lere katılım",
  roleSlug: "ustagemici",
  taskIndex: 4,
  estimatedPages: 25,
  intro: `Usta Gemici (AB), can güvenliği zincirinin saha uygulayıcısıdır; muster station'da hazır bulunur, tatbikatlarda (drill) verilen görevleri (filika ekibi, yangın partisi, boundary cooling, ilk yardım taşıma vb.) yerine getirir, can yeleği/dalış elbisesi ve EEBD gibi LSA ekipmanını doğru kullanır, kaçış yollarını bilir ve kendi emniyet ekipmanlarının bakımına destek verir. SOLAS Chapter III ve LSA/FSS Code gereği bu görevler düzenli tatbikatla pekiştirilir; gerçek acil durumda hayat, tatbikatta kazanılan refleks ve disipline bağlıdır. Bu bölüm; muster ve görev kartı sistemini, başlıca drill türlerini, LSA ekipmanı kullanımını, yangın müdahale rollerini, kaçış ve haberleşmeyi ve ekipman bakım sorumluluğunu AB perspektifinden adım adım açıklar.`,
  sources: [
    "SOLAS Chapter III — Life-Saving Appliances and Arrangements",
    "LSA Code — International Life-Saving Appliance Code",
    "SOLAS Chapter II-2 — Fire Protection, Detection and Extinction",
    "FSS Code — International Code for Fire Safety Systems",
    "STCW Code A-VI/1, A-VI/2, A-VI/3 — emniyet, survival craft, fire fighting eğitimi",
    "ISM Code — emniyet yönetim sistemi, drill ve acil hazırlık",
    "Muster List (Station Bill) ve geminin Emergency Procedures el kitabı",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
  ],
  chapters: [
    {
      heading: "1. Muster List ve Görev Kartı Sistemi",
      lead: `Muster List (station bill), her mürettebatın acil durumdaki görevini, muster station'ını ve sinyallerini gösterir. AB, kendi görev kartını ezbere bilmek zorundadır.`,
      sections: [
        {
          subheading: "1.1 Muster List'in okunması ve kişisel görev",
          paragraphs: [
            `Muster List, SOLAS III/8 gereği gemide görünür yerlere (köprüüstü, makine, koridor, kamaralar) asılır ve her acil durum tipi için (genel acil, yangın, gemiyi terk, denize adam düşme, kirlilik) kimin ne yapacağını gösterir. AB, kendi kamara kapısındaki ve muster station'daki kartından görevini, ekibini ve toplanma yerini öğrenir.`,
            `Görev kartı; toplanma yeri (muster station), filika/sal numarası, ekip rolü (örn. yangın partisi, boundary cooling, ilk yardım, haberleşme) ve taşıyacağı ekipmanı belirtir. Mürettebat değişiminde her yeni gelen AB'ye gemiye katıldığı ilk 24 saat içinde familiarisation (tanıtım) ve görev kartı verilir; bu yasal bir gerekliliktir.`,
          ],
          bullets: [
            `Muster List görünür yerlere asılır (SOLAS III/8)`,
            `Her acil durum tipi için görev tanımlıdır`,
            `AB kendi muster station ve ekip rolünü ezbere bilir`,
            `Yeni katılan personele 24 saat içinde tanıtım yapılır`,
          ],
        },
        {
          subheading: "1.2 Acil durum sinyalleri",
          paragraphs: [
            `Genel acil durum sinyali yedi veya daha fazla kısa düdük + bir uzun düdük (ve aynı düzende elektrik zili) ile verilir; gemiyi terk emri ise sözlü/PA üzerinden kaptan tarafından verilir, sinyalin kendisi terk emri değildir. AB bu sinyalleri ezbere ayırt etmeli ve sinyali duyduğunda derhal can yeleğini alıp muster station'a koşmalıdır.`,
            `Sinyali duyan AB önce kendi can güvenliğini sağlar (can yeleği, uygun kıyafet, başlık), sonra atanmış toplanma yerine gider. Yolda gördüğü yangın/yaralı gibi durumu muster'da bildirir. Panik değil, prosedüre uygun hızlı ve düzenli hareket esastır.`,
          ],
          table: {
            caption: `Temel Acil Durum Sinyalleri`,
            headers: ["Durum", "Sinyal", "İlk Aksiyon"],
            rows: [
              ["Genel acil durum", "7+ kısa, 1 uzun düdük/zil", "Can yeleği al, muster'a git"],
              ["Yangın", "Sürekli zil / PA anonsu", "Yangın partisi göreve, diğerleri muster"],
              ["Gemiyi terk", "Kaptanın sözlü/PA emri", "Filika/sal istasyonuna git"],
              ["Denize adam düştü", "3 uzun düdük + 'Man overboard'", "Can simidi at, gözle takip"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Tatbikatlar (Drill) ve Periyodik Eğitim",
      sections: [
        {
          subheading: "2.1 Zorunlu drill türleri ve periyotları",
          paragraphs: [
            `SOLAS, gemiyi terk (abandon ship) ve yangın (fire) tatbikatlarının her ay, kısa sürede mürettebat değişiyorsa daha sık yapılmasını ister. Yeni katılan personel gemiye katıldıktan sonra 24 saat içinde tatbikata katılmalıdır. Ayrıca enclosed space rescue, man overboard, kirlilik (pollution) ve güvenlik (ISPS) tatbikatları belirli periyotlarla yapılır.`,
            `Tatbikat gerçek gibi yürütülür: alarm verilir, mürettebat muster'a toplanır, isim sayımı (head count) yapılır, ekipler görevini fiilen uygular (filika indirme hazırlığı, yangın hortumu açma, boundary cooling). AB, tatbikatı "zaman kaybı" görmez; gerçek acilde hayat kurtaracak refleksi burada kazanır.`,
          ],
          table: {
            caption: `Başlıca Tatbikatlar ve Tipik Periyot`,
            headers: ["Tatbikat", "Tipik Periyot", "AB Tipik Rolü"],
            rows: [
              ["Abandon ship (gemiyi terk)", "Aylık", "Filika ekibi, sal hazırlama"],
              ["Fire drill (yangın)", "Aylık", "Yangın partisi / boundary cooling"],
              ["Enclosed space rescue", "Periyodik (örn. 2 ayda bir)", "Standby / lifeline / kurtarma"],
              ["Man overboard", "Periyodik", "Gözcü, can simidi, kurtarma teknesi"],
              ["Kirlilik (SOPEP)", "Periyodik", "Emici/bariyer, scupper kapama"],
            ],
          },
        },
        {
          subheading: "2.2 Tatbikat sonrası değerlendirme",
          paragraphs: [
            `Her tatbikat sonrası debrief (değerlendirme) yapılır; eksik kalan noktalar, geç toplanma, ekipman arızası ve iyileştirme önerileri konuşulur ve kaydedilir. AB, tatbikatta fark ettiği aksaklığı (örn. tıkalı kaçış yolu, çalışmayan fener) raporlar. Bu kayıtlar ISM kapsamında denetlenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III — düzenli tatbikat",
              text: `Gemiyi terk ve yangın tatbikatları yasal olarak düzenli yapılır ve kaydedilir; amaç ekipmanı tanımak ve acil durumda otomatik, doğru tepki vermektir. Tatbikat kâğıt üzerinde değil, fiilen uygulanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Can Kurtarma Ekipmanı (LSA) Kullanımı",
      lead: `LSA Code; can yeleği, dalış elbisesi (immersion suit), can salı, filika, can simidi ve pyrotechnic gibi ekipmanın standardını belirler. AB bunları doğru ve hızlı kullanmalıdır.`,
      sections: [
        {
          subheading: "3.1 Can yeleği ve immersion suit",
          paragraphs: [
            `Can yeleği (lifejacket) doğru giyilmeli, kayışları sıkı bağlanmalı, ışığı ve düdüğü çalışır olmalıdır. AB, can yeleğini gözü kapalı bile doğru giyebilecek kadar tanımalı; yanlış giyilen yelek suda baş aşağı çevirebilir. Şişirilebilir yeleklerde otomatik/manuel şişirme mekanizması ve CO₂ kartuşu kontrol edilir.`,
            `Soğuk sularda dalış elbisesi (immersion suit), hipotermiyi geciktirerek hayatta kalma süresini uzatır; SOLAS belirli koşullarda her mürettebata immersion suit ister. AB, suit'i hızlı (genelde 1-2 dakika hedefiyle) giyebilmeli, fermuar ve yüz contasının sızdırmazlığını kontrol etmelidir. Tatbikatta giyme süresi ölçülür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Immersion suit'i hızlı giyme alıştırması",
              text: `Soğuk su şokunda dakikalar hayat kurtarır. Immersion suit'i ayakkabıyla birlikte, baştan içeri girerek hızlı giyme tekniği tatbikatta tekrarlanır; gerçek anda düşünmeden uygulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Can salı, filika ve indirme sistemleri",
          paragraphs: [
            `Can salı (liferaft) genelde hidrostatik açıcı (hydrostatic release unit — HRU) ile gemi batarken otomatik serbest kalır ve şişer; AB manuel atma (painter çekme) ve HRU mantığını bilmelidir. Filika (lifeboat) davit'lerle indirilir; AB, davit freni, indirme halatı (fall), embarkation ladder ve motor çalıştırmayı tatbikatta öğrenir.`,
            `Davit-launched ve free-fall filikalarda emniyet pimleri, gripe (bağlama) ve frenlerin doğru sırada açılması kritiktir; yanlış sıra erken bırakma kazası yapar. AB, filika ekibindeyse kendi görevini (painter, fren, dümen, motor) net bilmeli ve komut zincirine uymalıdır.`,
          ],
          table: {
            caption: `Temel LSA Ekipmanı ve AB Sorumluluğu`,
            headers: ["Ekipman", "Amaç", "AB'nin Bilmesi Gereken"],
            rows: [
              ["Lifejacket", "Suda yüzdürme", "Doğru giyme, ışık/düdük kontrolü"],
              ["Immersion suit", "Hipotermi koruması", "Hızlı giyme, sızdırmazlık"],
              ["Liferaft + HRU", "Otomatik can salı", "Painter çekme, HRU mantığı"],
              ["Lifeboat + davit", "Tahliye teknesi", "Fren, fall, ekip rolü"],
              ["Lifebuoy + light/smoke", "Denize adam düşme", "Hızlı atma, işaretleme"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Yangın Müdahale Rolleri",
      sections: [
        {
          subheading: "4.1 Yangın partisi ve boundary cooling",
          paragraphs: [
            `Yangın drill'inde AB genelde yangın partisinde (fire party) veya destek ekibinde görev alır: hortum (fire hose) açma, nozzle tutma, branç yönetimi veya boundary cooling (yangının yayıldığı bölmenin komşu yüzeylerini soğutma) görevleri verilir. Boundary cooling, yangının bitişik mahallere yayılmasını önler ve sıcaklığı düşürür.`,
            `AB, yangın ekipmanının (hortum, nozzle, köpük, taşınabilir söndürücü) yerini ve kullanımını bilmeli; yangın tipine uygun söndürücü seçmelidir (yağ/elektrik yangınına su sıkmak tehlikelidir). Komut zincirine (yangın amiri) uyar, kendi başına kahramanlık yapmaz; ekip olarak koordineli müdahale esastır.`,
          ],
          table: {
            caption: `Yangın Sınıfları ve Uygun Söndürücü`,
            headers: ["Sınıf", "Yanan Madde", "Uygun Söndürücü"],
            rows: [
              ["A", "Katı (ahşap, kâğıt, kumaş)", "Su, köpük"],
              ["B", "Sıvı (yakıt, yağ, boya)", "Köpük, kuru kimyevi, CO₂"],
              ["C", "Gaz", "Kuru kimyevi (kaynağı kes)"],
              ["Elektrik", "Enerjili ekipman", "CO₂, kuru kimyevi (su YOK)"],
              ["Mutfak yağı (F/K)", "Bitkisel yağ", "Özel wet chemical"],
            ],
          },
        },
        {
          subheading: "4.2 SCBA ve EEBD kullanımı",
          paragraphs: [
            `Yangın/duman ortamına giriş yapacak ekip, SCBA (Self-Contained Breathing Apparatus — temiz hava tüplü solunum cihazı) takar; AB, eğitimliyse SCBA giyişini, tüp basıncı kontrolünü ve süre yönetimini bilir. SCBA, yangın partisinin korumalı giriş yapmasını sağlar; düşük basınç alarmı duyulduğunda derhal geri çekilir.`,
            `EEBD (Emergency Escape Breathing Device), yangın/duman değil kaçış amaçlıdır; tek kullanımlık, kısa süreli (genelde ~10-15 dk) hava sağlar ve dumanlı bölgeden kaçmak için kullanılır. AB, EEBD'nin yerini, hızlı takmayı (başlık tipi) ve sadece kaçış için (müdahale için DEĞİL) olduğunu bilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "EEBD müdahale cihazı değildir",
              text: `EEBD sadece dumanlı/zehirli ortamdan KAÇMAK içindir; yangına müdahale veya kapalı mekana giriş için kullanılmaz. Müdahale için SCBA gerekir. Bu ayrımı karıştırmak ölümcül olabilir.`,
            },
            {
              type: "example",
              title: "Vaka: izole edilmeyen yangın",
              text: `Birçok gemi yangını, boundary cooling ihmal edildiği veya komşu mahal izole edilmediği için yayılarak kontrolden çıktı. Ders: yangını yalıtmak (kapı kapatma, ventilasyon durdurma, soğutma) söndürmek kadar önemlidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kaçış Yolları ve Haberleşme",
      sections: [
        {
          subheading: "5.1 Kaçış yolları (escape routes) bilgisi",
          paragraphs: [
            `AB, çalıştığı ve yaşadığı tüm bölgelerden en az iki kaçış yolunu, acil çıkış kapılarını, kaçış aydınlatmasını (low-location lighting) ve EEBD/yangın ekipmanı konumlarını bilmelidir. Kaçış yolları her zaman açık, engelsiz ve işaretli tutulur; bir kaçış yolunu malzeme/yük ile kapatmak yasaktır ve AB bunu görürse açar/raporlar.`,
            `Duman içinde görüş sıfıra iner; AB karanlık ve dumanlı koridoru elle duvar takip ederek, alçalarak ve kaçış aydınlatmasını izleyerek geçmeyi bilmelidir. Tatbikatlarda kaçış yolları fiziksel olarak yürünerek tanınır; gerçek anda hafıza ve refleks yol gösterir.`,
          ],
          bullets: [
            `Her bölgeden en az iki kaçış yolu bilinir`,
            `Kaçış yolları sürekli açık ve engelsiz tutulur`,
            `EEBD, yangın ekipmanı ve aydınlatma konumları bilinir`,
            `Dumanda alçalarak, duvar takip ederek hareket edilir`,
          ],
        },
        {
          subheading: "5.2 Acil haberleşme ve isim sayımı",
          paragraphs: [
            `Muster station'da isim sayımı (head count / roll call) kritik aşamadır; eksik kişi tespit edilirse arama ekibi yönlendirilir. AB, kendi varlığını bildirir ve haberleşme görevindeyse telsiz/PA ile köprü-muster arası bilgi akışını sürdürür. Yanlış sayım, içeride kalan birinin gözden kaçmasına yol açar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM — acil hazırlık",
              text: `ISM Code, gemilerin acil durum senaryolarına hazır olmasını, drill yapmasını ve eksiklikleri düzeltmesini gerektirir. AB'nin tatbikatlara ciddiyetle katılması bu sistemin saha ayağıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Emniyet Ekipmanı Bakımı ve Kontrol",
      sections: [
        {
          subheading: "6.1 Periyodik kontrol ve bakım desteği",
          paragraphs: [
            `LSA ve yangın ekipmanı haftalık/aylık/yıllık periyotlarla kontrol edilir; AB bu kontrollere destek verir. Haftalık olarak filika motoru çalıştırma, alarm testi; aylık olarak LSA ve yangın söndürücü görsel kontrolü yapılır. Yıllık ve beş yıllık servisler yetkili firmaca yapılır (filika fall yenileme, sal servisi, SCBA hidrostatik test).`,
            `AB; can simidi, can yeleği ışıkları, pyrotechnic (işaret fişeği) son kullanma tarihleri, hortum/nozzle durumu ve emergency lighting'i kontrol eder, eksikleri raporlar. Süresi geçmiş pyrotechnic ve şarjı bitmiş ışık gerçek anda işe yaramaz; bakım hayat kurtarır.`,
          ],
          table: {
            caption: `Örnek LSA/Yangın Kontrol Periyotları`,
            headers: ["Kontrol", "Periyot", "İçerik (örnek)"],
            rows: [
              ["Filika motoru çalıştırma", "Haftalık", "Motor 3 dk çalıştırma, davit kontrol"],
              ["Genel alarm testi", "Haftalık", "Sinyallerin çalışması"],
              ["LSA görsel kontrol", "Aylık", "Yelek, sal, simit, ışık, son kullanım"],
              ["Yangın söndürücü kontrol", "Aylık/yıllık", "Basınç, mühür, dolum tarihi"],
              ["Liferaft/SCBA servis", "Yıllık", "Yetkili firma servisi"],
            ],
          },
        },
        {
          subheading: "6.2 Eksik ve arızanın raporlanması",
          paragraphs: [
            `AB, kontrol sırasında bulduğu her eksik/arızayı (boş söndürücü, çalışmayan ışık, sızdıran SCBA, eksik can yeleği) reise/emniyet zabitine derhal raporlar. "Sonra hallederiz" tavrı, gerçek acilde çalışmayan ekipman demektir. Kayıt ve takip ISM/PSC denetiminde de aranır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çalışmayan ekipman = yokluk",
              text: `Şarjı bitmiş can yeleği ışığı, süresi geçmiş işaret fişeği veya boş söndürücü, gerçek acilde hiç olmaması kadar tehlikelidir. Kontroller dürüst yapılmalı, eksikler hemen raporlanıp giderilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Tatbikat ve ekipman ihmalleri",
          paragraphs: [
            `En tehlikeli hata, tatbikatı "göstermelik" yapmaktır: alarm verilmeden kâğıt üzerinde "yapıldı" yazmak, ekipmanı gerçekten kullanmamak. Gerçek acilde ilk kez ekipmanla karşılaşan mürettebat panikler ve geç kalır. AB, tatbikatı ciddiye alıp her görevi fiilen uygulamalıdır.`,
            `Filika indirme kazaları (free-fall erken bırakma, davit freni hatası, fall kopması) denizcilikte ölümlü kazaların önemli kısmıdır; çoğu yanlış sıralama veya bakımsız ekipmandan kaynaklanır. AB, filika prosedürünü adım adım, emniyet pimleri ve frenlere dikkat ederek uygulamalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: tatbikatta indirme kazası",
              text: `Filika tatbikatlarında, emniyet pimi çıkarılmadan veya yanlış sırada işlem yapılması yüzünden filika düşmüş, personel yaralanmıştır. Ders: tatbikat dahi gerçek risk taşır; prosedür ve komut zinciri istisnasız uygulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Kaçış yolu ve haberleşme hataları",
          paragraphs: [
            `Kaçış yolunun malzeme ile kapatılması, kaçış aydınlatmasının arızalı bırakılması ve muster'da hatalı isim sayımı, içeride kalan personelin gözden kaçmasına yol açar. AB, kaçış yollarını açık tutmalı, sayımda dürüst olmalı ve eksik gördüğü her durumu raporlamalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Emniyet ve drill checklist'i",
          bullets: [
            `Muster station, ekip rolüm ve görev kartımı ezbere biliyor muyum?`,
            `Acil durum sinyallerini ayırt edebiliyor muyum?`,
            `Can yeleğini ve immersion suit'i hızlı/doğru giyebiliyor muyum?`,
            `LSA (sal, filika, simit) ve indirme sistemini biliyor muyum?`,
            `Yangın sınıfına uygun söndürücüyü seçebiliyor muyum?`,
            `SCBA ve EEBD farkını ve kullanımını biliyor muyum?`,
            `Çalıştığım her bölgeden iki kaçış yolunu biliyor muyum?`,
            `Tatbikatlara fiilen ve ciddiyetle katılıyor muyum?`,
            `Ekipman eksik/arızasını derhal raporluyor muyum?`,
          ],
          paragraphs: [
            `Emniyet ekipmanları ve tatbikatlar, "hiç gerekmemesini umduğumuz ama gerektiğinde hayat kurtaran" görevlerdir. AB'nin değeri, kriz anında düşünmeden doğru tepki verecek kadar ekipmanı tanıması ve prosedürü içselleştirmesidir. Tatbikatta dökülen ter, gerçek acilde kurtarılan candır; bu yüzden hiçbir drill geçiştirilmez, hiçbir kontrol atlanmaz ve hiçbir eksik gizlenmez.`,
          ],
        },
      ],
    },
  ],
};

export default content;
