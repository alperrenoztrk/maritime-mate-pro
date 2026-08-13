import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kadro yönetimi ve eğitim planlaması",
  roleSlug: "kaptan",
  taskIndex: 6,
  estimatedPages: 26,
  intro: `Kaptan, gemideki insan kaynağının nihai yöneticisidir: mürettebat yetkinliklerinin değerlendirilmesi, eğitim ihtiyaçlarının belirlenmesi, familiarization süreçlerinin işletilmesi ve performans değerlendirmelerinin yapılması onun yönetim sorumluluğundadır. STCW gerekliliklerine uygun sertifika takibi, Minimum Safe Manning Document'a uygun kadrolama, gemideki disiplin, moral ve çalışma düzeni doğrudan kaptanın liderlik kapasitesine bağlıdır. Bu bölüm; competency assessment, sertifika izleme, familiarization (genel ve gemiye özgü), onboard training, appraisal döngüsü, BRM/ERM ekip çalışması, manning seviyeleri ve liderlik konularını somut prosedürler, mevzuat ve vaka dersleriyle ele alır. Amaç, "iyi kaptan iyi liderdir" klişesini, ölçülebilir ve denetlenebilir bir insan kaynağı yönetimi metodolojisine çevirmektir.`,
  sources: [
    "STCW 2010 (Manila Amendments) — Convention & Code (Part A/B)",
    "STCW Reg. I/14 — Responsibilities of Companies (manning & familiarization)",
    "ISM Code madde 6 — Resources and Personnel",
    "MLC 2006 — Title 1 (Minimum requirements), Title 2 (Conditions of employment)",
    "SOLAS V/14 — Ships' Manning & Minimum Safe Manning Document",
    "IMO Resolution A.1047(27) — Principles of Minimum Safe Manning",
    "ISM Code madde 8 — Emergency Preparedness (drill ve eğitim)",
    "Bridge/Engine-room Resource Management (STCW Tablo A-II/1, A-III/1)",
  ],
  chapters: [
    {
      heading: "1. İnsan Kaynağı Yönetiminin Mevzuat Çerçevesi",
      lead: `Kaptanın kadro yönetimi keyfi değildir; STCW, ISM, MLC ve SOLAS'ın iç içe geçtiği bağlayıcı bir çerçevede yürür. Bu bölüm bu çerçeveyi netleştirir.`,
      sections: [
        {
          subheading: "1.1 ISM madde 6: doğru kişi, doğru görev, doğru hazırlık",
          paragraphs: [
            `ISM Code madde 6, şirketin geminin "uygun nitelikte, sertifikalı ve sağlık açısından elverişli" personelle donatıldığından emin olmasını şart koşar. Bu maddenin gemideki uygulayıcısı kaptandır: her mürettebat üyesinin görevine uygun yetkinlikte olduğunu, gerekli sertifikalara sahip olduğunu ve göreve başlamadan önce uygun şekilde familiarize edildiğini doğrulamak onun sorumluluğudur.`,
            `Madde 6 ayrıca, geminin emniyeti ve çevre korunması için kritik görevlerin personel tarafından anlaşıldığından emin olunmasını ister; bu da dil ortaklığını (working language), talimatların anlaşılabilirliğini ve eğitimin etkinliğini kapsar. Çok uluslu bir ekipte ortak çalışma dilinin (genelde İngilizce) yeterliliği, ISM denetiminde ve kaza analizlerinde doğrudan sorgulanan bir konudur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code 6.3 & 6.5",
              text: `Şirket, yeni katılan ve yeni görev verilen personelin, emniyet ve çevre koruma görevleriyle ilgili olarak gerekli talimatları aldığından ve sefer öncesinde uygun şekilde tanıtım (familiarization) yapıldığından emin olacak prosedürler kurmalıdır. Bu prosedürlerin sahadaki uygulayıcısı kaptandır.`,
            },
          ],
        },
        {
          subheading: "1.2 STCW Reg. I/14 ve şirket–kaptan sorumluluk paylaşımı",
          paragraphs: [
            `STCW Reg. I/14, şirketleri gemiye atanan denizcilerin sertifikalarının geçerli ve göreve uygun olmasından, gemide STCW'ye uygun kayıtların tutulmasından ve familiarization ile acil durum koordinasyonunun sağlanmasından sorumlu tutar. Bu sorumluluğun gemideki uzantısı kaptandır; şirket politikayı kurar, kaptan sahada uygular ve sapmayı raporlar.`,
            `Pratikte bu, kaptanın her join eden mürettebatın STCW sertifikalarını (CoC — Certificate of Competency, CoP — Certificate of Proficiency, GMDSS, tanker endorsement, advanced fire fighting, medical first aid vb.) fiziksel/elektronik olarak kontrol etmesi anlamına gelir. Eksik veya süresi yaklaşan bir sertifika tespit edilirse derhal şirkete bildirilir; sertifikasız bir kişinin sertifika gerektiren bir görevde çalıştırılması hem STCW ihlali hem de sigorta açısından ağır bir risktir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Minimum Safe Manning ve Kadro Planlaması",
      lead: `Geminin kaç kişiyle ve hangi sertifika seviyeleriyle çalışacağı, keyfi değil, bayrak devletinin onayladığı Minimum Safe Manning Document (MSMD) ile belirlenir.`,
      sections: [
        {
          subheading: "2.1 Minimum Safe Manning Document'in anlamı",
          paragraphs: [
            `SOLAS V/14 ve IMO Res. A.1047(27) uyarınca her gemi, bayrak devletinin verdiği bir Minimum Safe Manning Document taşır. Bu belge, geminin emniyetli seyri, can güvenliği, deniz çevresinin korunması ve emniyetli işletimi için gereken asgari kadroyu — pozisyon ve sertifika seviyesiyle — tanımlar. Kaptan, gemideki fiili kadronun her zaman bu belgenin altına düşmediğinden emin olmalıdır.`,
            `MSMD bir "yeterlilik" değil "asgari" belgesidir; ağır yük operasyonu, sık liman, kanal seyri veya yorucu rotalarda asgari kadro pratikte yetersiz kalabilir. Kaptan, fiili iş yükünün asgari kadroyu rest hours ihlaline zorladığını tespit ederse, bunu şirkete gerekçeli olarak bildirip ek personel veya rotasyon talep etmelidir. Asgari kadroyla "kâğıt üzerinde uyumlu" ama "fiilen yorgun" bir ekip, kaza zincirinin klasik başlangıcıdır.`,
          ],
          table: {
            caption: `Örnek Minimum Safe Manning (Tipik Orta Boy Kuru Yük Gemisi)`,
            headers: ["Pozisyon", "Sertifika seviyesi", "Asgari sayı"],
            rows: [
              ["Master", "STCW II/2 (Master)", "1"],
              ["Chief Officer", "STCW II/2 (Chief Mate)", "1"],
              ["OOW (Deck)", "STCW II/1", "2"],
              ["Chief Engineer", "STCW III/2", "1"],
              ["2nd Engineer / OOW (Eng)", "STCW III/1 - III/2", "2"],
              ["Ratings (Deck/Engine)", "STCW II/4, II/5, III/4, III/5", "Belgeye göre"],
            ],
          },
        },
        {
          subheading: "2.2 Yorgunluk, rest hours ve kadro yeterliliği",
          paragraphs: [
            `Kaptan, kadronun yorgunluk seviyesini sürekli izler; STCW A-VIII/1 ve MLC sınırları (24 saatte en az 10, 7 günde en az 77 saat dinlenme) yalnızca alt sınırdır, hedef değildir. Yoğun port rotasyonu, sık vardiya bölünmesi ve kritik operasyonlar (cargo, demir, kanal) yorgunluğu kümülatif olarak artırır. Kaptan, kritik operasyonlar öncesi anahtar personelin dinlenmiş olmasını fiilen doğrular.`,
            `Manning planlaması ile rest hours yönetimi aynı madalyonun iki yüzüdür: yetersiz kadro, rest hours ihlalini matematiksel olarak kaçınılmaz kılar. Kaptan, "kayıtları temiz göstermek" ile "ekibi gerçekten dinlendirmek" arasında seçim yapmak zorunda kalırsa, ikincisini seçmeli ve birinciyi mümkün kılacak kadro/rotasyon talebini yazılı olarak şirkete iletmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kadro–yorgunluk–güvenlik üçgeni",
              text: `Bridge ve makine kaynaklı pek çok kazada (örn. dümen başında uyuyakalma kaynaklı karaya oturmalar) kök-neden, "yetersiz kadronun zorladığı kronik yorgunluk"tur. Rest hours kaydının "uyumlu" görünmesi, ekibin gerçekten dinlenmiş olduğu anlamına gelmez. Kaptan kayda değil, ekibin gerçek halini gözleme güvenmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Familiarization: Genel ve Gemiye Özgü",
      lead: `Bir mürettebatın gemideki ilk saatleri, onun ve geminin güvenliğini en çok belirleyen saatlerdir. Familiarization, kaza önlemenin ilk savunma hattıdır.`,
      sections: [
        {
          subheading: "3.1 General (basic) safety familiarization",
          paragraphs: [
            `STCW ve ISM gereği, gemiye yeni katılan herkes — denizci olsun, riding crew/yüklenici olsun — göreve başlamadan önce temel güvenlik tanıtımından geçer: muster station'ını, alarm sinyallerini, can yeleği ve immersion suit'in yerini ve giyilmesini, kaçış yollarını, watertight kapıları ve temel "ne yapmalı / ne yapmamalı" kurallarını öğrenir. Bu tanıtım, gemi limana yanaşmadan veya seferin ilk kritik anlarından önce tamamlanmalıdır.`,
            `Kaptanın sorumluluğu, bu tanıtımın "form imzalatmaktan" ibaret olmadığını güvence altına almaktır. Yeni katılan kişi, alarm çaldığında nereye gideceğini gerçekten bilmelidir; bu yüzden iyi familiarization, gemide fiziksel bir tur (walk-through) içerir: muster station'a fiilen yürünür, en yakın çıkış gösterilir, can yeleği eldeyken giydirilir.`,
          ],
          bullets: [
            `Genel ve abandon ship alarm sinyalleri ve anlamları`,
            `Bireysel muster station ve görev kartı`,
            `Can yeleği, immersion suit, TPA yeri ve kullanımı`,
            `Yangın ve diğer acil durum ekipmanının yeri`,
            `Kaçış yolları, watertight/fire kapı kullanımı`,
            `Alarm verme yöntemi ve raporlama zinciri`,
          ],
        },
        {
          subheading: "3.2 Ship-specific (göreve özgü) familiarization",
          paragraphs: [
            `Genel tanıtımın ötesinde, her mürettebat kendi görevine özgü ekipmanla familiarize edilir: vardiya zabiti gemideki ECDIS markası, radar, otopilot ve GMDSS konsoluyla; makine zabiti gemideki ana makine, yardımcı sistemler ve alarm paneliyle tanıştırılır. Type-specific eğitim almamış bir zabitin tek başına vardiya tutması, MAIB raporlarında tekrar eden bir kaza nedenidir.`,
            `Kaptan, göreve özgü familiarization'ı bir checklist ve sorumlu üst zabit (deck için chief officer, makine için chief engineer) üzerinden yürütür. Kritik nokta zamanlamadır: bir kişi, tek başına bir görevi (örn. solo navigational watch) ancak familiarization tamamlandıktan ve yetkinliği teyit edildikten sonra üstlenebilir. "İlk vardiyada öğrenir" yaklaşımı kabul edilemez.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Yetersiz familiarization",
              text: `Bir gemide ECDIS'e yeni geçilmiş, ancak bir vardiya zabiti gemideki ECDIS markasının "safety contour" ayarına ve uyarı bastırma (silence) fonksiyonuna familiarize edilmemişti. Zabit, sürekli çalan alarmları anlamadan kapatınca anti-grounding uyarısı da susturuldu ve gemi sığlığa girdi. Ders: familiarization yüzeysel yapılırsa, en gelişmiş ekipman bile en zayıf halka olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Yetkinlik Değerlendirmesi (Competency Assessment)",
      lead: `Sertifika, bir kişinin "yetkili olduğunu" söyler; competency assessment ise "gerçekten yetkin olup olmadığını" gemide ölçer. İkisi aynı şey değildir.`,
      sections: [
        {
          subheading: "4.1 Sertifika ile gerçek yetkinlik arasındaki fark",
          paragraphs: [
            `STCW sertifikası asgari standardı belgeler; ancak iki aynı sertifikalı zabit, sahada çok farklı yetkinlik gösterebilir. Kaptan, ilk vardiyalardan itibaren her zabitin gerçek seviyesini gözlemler: pozisyon belirleme disiplini, COLREG uygulaması, ekipman hâkimiyeti, karar verme hızı ve baskı altındaki davranış. Bu gözlem, gerçek yetkinlik haritasının çıkarılmasıdır.`,
            `Bu değerlendirme yargılamak için değil, eğitim ihtiyacını belirlemek içindir. Bir zabitin radar plotting'i zayıfsa, kaptan bunu bir "kusur" olarak değil, hedeflenmiş bir onboard training fırsatı olarak ele alır. Yetkinlik haritası, kimin hangi operasyonda denetimli, kimin denetimsiz çalışabileceğini belirler; bu da görev dağılımının ve risk yönetiminin temelidir.`,
          ],
        },
        {
          subheading: "4.2 Yapılandırılmış değerlendirme ve kayıt",
          paragraphs: [
            `Birçok şirket SMS'i, periyodik competency assessment formları öngörür: gözlem temelli, belirli yetkinlik kalemlerine puanlama yapılan ve gelişim alanlarını işaretleyen yapılandırılmış bir araç. Kaptan veya görevlendirdiği üst zabit, her dönem bu değerlendirmeyi yapar, sonuçları kişiyle paylaşır ve bir gelişim planına (development plan) bağlar.`,
            `Değerlendirmenin değeri, dürüstlüğüyle doğru orantılıdır. "Herkese yüksek puan" veren bir kaptan, hem o kişinin gelişimini engeller hem de şirketi gerçek risk hakkında yanıltır. Tersine, sadece eksik gösteren bir değerlendirme moral kırar. İyi assessment, güçlü yönü kayda geçiren ve gelişim alanını somut bir aksiyona bağlayan dengeli bir araçtır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Değerlendirmeyi geliştirme aracına çevir",
              text: `Bir zayıflık tespit edildiğinde, onu bir sonraki tatbikat veya operasyonda hedefli bir öğrenme fırsatına dönüştür. "Pozisyon belirlemen zayıf" demek yerine, "bir sonraki kıyısal geçişte parallel index tekniğini seninle adım adım çalışalım" demek, değerlendirmeyi suçlamadan gelişime taşır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Onboard Training ve Drill Yönetimi",
      lead: `Eğitim, gemide sürekli bir süreçtir. Drill'ler ise bu eğitimin en görünür ve en denetlenen biçimidir.`,
      sections: [
        {
          subheading: "5.1 SOLAS/ISM zorunlu tatbikatlar",
          paragraphs: [
            `SOLAS Chapter III ve ISM madde 8, düzenli tatbikatları zorunlu kılar: abandon ship ve fire drill her ay (mürettebatın %25'inden fazlası önceki ay tatbikatlara katılmamışsa limandan ayrılmayı izleyen 24 saat içinde), enclosed space entry & rescue drill en az iki ayda bir, ayrıca damage control, oil spill (SOPEP), man overboard, steering gear failure, security (ISPS) ve diğer senaryolar. Kaptan, bu tatbikatların takvimini tutar ve fiilen yapıldığını kayıt altına alır.`,
            `Tatbikatın amacı kayıt doldurmak değil, kriz anında kas hafızası oluşturmaktır. Bu yüzden iyi tatbikat gerçekçidir: senaryo değiştirilir (her ay aynı "filika indir" rutini ezbere dönüşür), zorluk eklenir (bir kişi "yaralı" sayılır, bir çıkış "kapalı" varsayılır), ve sonrasında dürüst bir debrief yapılır. El Faro ve benzeri kazalar, ezbere ve gerçekçi olmayan tatbikatların kriz anında işe yaramadığını gösterdi.`,
          ],
          table: {
            caption: `Zorunlu Tatbikat Sıklıkları (Tipik)`,
            headers: ["Tatbikat", "Sıklık", "Mevzuat dayanağı"],
            rows: [
              ["Abandon ship", "Aylık", "SOLAS III/19.3.2"],
              ["Fire drill", "Aylık", "SOLAS III/19.3.2"],
              ["Enclosed space entry & rescue", "En az 2 ayda bir", "SOLAS III/19.3.3"],
              ["Rescue boat suya indirme", "Mümkünse aylık, en az 3 ayda bir", "SOLAS III/19.3.4.4"],
              ["Man overboard", "Şirket SMS'ine göre", "ISM / SMS"],
              ["Acil dümen tatbikatı", "En az 3 ayda bir", "SOLAS V/26.4"],
              ["Security (ISPS)", "Periyodik", "ISPS / SOLAS XI-2"],
              ["SOPEP / pollution", "Periyodik", "MARPOL / SMS"],
            ],
          },
        },
        {
          subheading: "5.2 Debrief, ders çıkarma ve sürekli iyileştirme",
          paragraphs: [
            `Her tatbikatın asıl değeri debrief'tedir: ne iyi gitti, ne zaman kaybedildi, hangi ekipman beklendiği gibi çalışmadı, hangi rol belirsiz kaldı. Kaptan, debrief'i bir "değerlendirme sınavı" değil, açık ve suçlamasız bir öğrenme oturumu olarak yönetir; junior mürettebat hatayı saklamak yerine paylaşabilmelidir. Çıkan dersler bir sonraki tatbikatın senaryosunu şekillendirir.`,
            `Onboard training, drill'lerle sınırlı değildir: toolbox talk'lar, kısa eğitim videoları, CBT (computer-based training) modülleri, ekipman bazlı uygulamalı dersler ve "shadow watch" (denetimli vardiya) ile junior personel sürekli geliştirilir. Kaptan, eğitimi bir takvime bağlar ve kayıt altına alır; çünkü PSC ve vetting, eğitim kayıtlarını sistemin canlılığının kanıtı olarak inceler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Köprüüstü ve Makine Kaynak Yönetimi (BRM/ERM)",
      lead: `Yetkin bireyler kötü bir ekip oluşturabilir. BRM ve ERM, bireysel yetkinliği etkili ekip performansına çeviren disiplinlerdir.`,
      sections: [
        {
          subheading: "6.1 Ekip olarak çalışmak: rol netliği ve closed-loop iletişim",
          paragraphs: [
            `Bridge Resource Management ve Engine-room Resource Management, STCW Manila değişiklikleriyle zorunlu yetkinlikler haline geldi. Temel ilkeler; rollerin net dağılımı (kim kaptan/conn, kim navigasyon, kim lookout, kim haberleşme), kapalı-döngü iletişim (verilen komut tekrar edilerek teyit edilir), durum farkındalığının (situational awareness) ekip içinde paylaşılması ve hata yakalama (cross-check, monitoring) mekanizmalarıdır.`,
            `Kaptanın buradaki rolü çift yönlüdür: hem ekibin başı olarak liderlik etmek, hem de ekibin kendisini "challenge" edebileceği bir ortam yaratmak. Junior bir zabitin "kaptanım, CPA bana yakın görünüyor" diyebilmesi, ekibin gerçekten çalıştığının işaretidir. Bu kültür kurulmazsa, en yetkin ekip bile sessiz kalan bir junior'ın gördüğü tehlikeyi kaçırır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Authority gradient ve sessizlik",
              text: `Otorite eğimi çok dikse, junior zabit veya rating gördüğü hatayı söyleyemez; çok yatıksa komuta zinciri çöker. Royal Majesty, Costa Concordia ve El Faro kazalarının ortak motifi, junior'ın şüphesini dile getirememesidir. Kaptan, eğimi normal seyirde yatık, kriz anında dik tutan kişidir.`,
            },
          ],
        },
        {
          subheading: "6.2 Hata yönetimi ve just culture",
          paragraphs: [
            `Etkili ekip yönetimi, hatanın kaçınılmaz olduğunu kabul edip onu erken yakalamaya odaklanır. "Just culture" (adil kültür), kasıtlı ihlal ile insani hatayı ayırır: insani hata raporlandığında cezalandırılmaz, ondan öğrenilir; ancak pervasız risk alma veya kasıtlı kural ihlali hesap sorulur. Kaptan bu dengeyi kurarak, near-miss ve hataların saklanmadan raporlanmasını sağlar.`,
            `Near-miss raporlamasının canlı olması, bir geminin emniyet kültürünün en güvenilir göstergesidir. Hiç near-miss raporlanmayan bir gemi, "her şeyin mükemmel olduğu" gemi değil, "korku yüzünden hiçbir şeyin raporlanmadığı" gemidir. Kaptan, raporlamayı teşvik eder, raporlayanı korur ve her rapordan sistemik bir ders çıkarır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Performans Değerlendirme (Appraisal) Döngüsü",
      sections: [
        {
          subheading: "7.1 Appraisal'ın amacı ve adil yürütülmesi",
          paragraphs: [
            `Çoğu şirket, mürettebatın gemide kalış süresi sonunda veya periyodik olarak doldurulan bir appraisal formu öngörür. Bu form; teknik yetkinlik, güvenlik bilinci, ekip çalışması, liderlik, disiplin ve gelişim potansiyeli gibi boyutları puanlar ve terfi/yeniden istihdam kararlarına temel oluşturur. Kaptan veya üst zabit, gözleme dayalı, somut örneklerle desteklenen ve kişiyle paylaşılan bir değerlendirme yapar.`,
            `Adil appraisal, kişiye yüz yüze geri bildirimle verilir; sürpriz olmamalıdır. İyi yöneten kaptan, dönem boyunca geri bildirimi sürekli verir, böylece appraisal yalnızca yıl boyunca söylenenlerin yazılı özeti olur. Haksız veya keyfi appraisal, hem o kişinin kariyerini etkiler hem de gemideki adalet algısını ve dolayısıyla morali zedeler.`,
          ],
        },
        {
          subheading: "7.2 Gelişim planı ve terfi yönetimi",
          paragraphs: [
            `Appraisal yalnızca bir not değil, bir gelişim planının başlangıcıdır. Güçlü bir junior zabit için kaptan, terfiye hazırlık adımlarını (örn. daha fazla denetimli manevra, kıyısal seyir sorumluluğu, kâğıt işlerinde mentorluk) planlayabilir. Tersine, zorlanan bir kişi için somut iyileştirme hedefleri ve desteği tanımlanır.`,
            `Kaptanın halefiyet (succession) perspektifi taşıması beklenir: bugünün ikinci zabiti, yarının birinci zabitidir; bugünün birinci zabiti, yarının kaptanıdır. İyi kaptan, kendi yerini doldurabilecek insanları yetiştirmeyi bir tehdit değil, mesleki bir görev olarak görür. Bu, filo için sürdürülebilir yetkinliğin tek gerçek kaynağıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mentorluk en güçlü eğitim aracıdır",
              text: `Formal eğitimden daha kalıcı olan, kaptanın günlük örnekliğidir. Bir junior zabit, kaptanın baskı altında nasıl sakin kaldığını, bir hatayı nasıl dürüstçe ele aldığını ve ekibe nasıl davrandığını izleyerek öğrenir. Kaptan, farkında olsun olmasın, sürekli bir eğitim modelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Disiplin, Moral ve Liderlik",
      lead: `Bir gemi, kapalı ve uzun süreli bir yaşam alanıdır. Disiplin ve moral, kaptanın liderliğinin günlük sınavıdır.`,
      sections: [
        {
          subheading: "8.1 Disiplin: tutarlılık ve adalet",
          paragraphs: [
            `Disiplin, ceza değil, paylaşılan standartların korunmasıdır. MLC 2006 ve şirket SMS'i, disiplin işlemleri için adil bir prosedür (uyarı, soruşturma, savunma hakkı, kayıt) öngörür; kaptan bu prosedürü tutarlı ve keyfilikten uzak biçimde uygular. Aynı ihlale farklı kişilere farklı tepki vermek, otoriteyi en hızlı çökerten şeydir.`,
            `Disiplinin amacı, bir kişiyi cezalandırmaktan çok, ekibin tamamına standardın ciddiyetini hatırlatmaktır. Ağır vakalarda (şiddet, sarhoşluk, görevi terk, D&A pozitifi) kaptan derhal şirketle koordine olur; ancak çoğu gündelik mesele, erken, özel ve adil bir konuşmayla, formal işleme gerek kalmadan çözülür. İyi kaptan, formal disiplini son çare olarak kullanır.`,
          ],
        },
        {
          subheading: "8.2 Moral, refah ve çok kültürlü ekip yönetimi",
          paragraphs: [
            `Modern bir gemi mürettebatı genellikle çok uluslu ve çok kültürlüdür. Kaptan; dil, kültür, din ve gelenek farklılıklarına saygıyı, ayrımcılık yasağını (MLC) ve eşit muameleyi güvence altına alır. İzole bir ortamda moral; yemek kalitesi, dinlenme, internet/iletişim imkânı, adil iş dağılımı ve saygılı bir atmosferle korunur. Düşük moral, yorgunluk kadar tehlikeli bir kaza faktörüdür.`,
            `Kaptan, mürettebatın refahını (welfare) — uzun kontratlar, aile özlemi, izolasyon, ruh sağlığı — görünür bir öncelik olarak ele almalıdır. Açık kapı politikası, şikâyet prosedürünün gerçekten işlemesi ve bir kişinin zorlandığında sesini güvenle yükseltebilmesi, hem MLC gereği hem de operasyonel emniyetin temelidir. Mutlu ve saygı gören bir ekip, güvenli bir ekiptir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Adil muamele ve şikâyet hakkı",
              text: `MLC, gemide ayrımcılığı yasaklar, adil çalışma koşulları ve gemi içi şikâyet prosedürü güvence altına alır. Kaptan, her mürettebatın misilleme korkusu olmadan şikâyetini iletebileceği işleyen bir mekanizma kurmakla yükümlüdür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Devir-Teslim ve Süreklilik Yönetimi",
      sections: [
        {
          subheading: "9.1 Handover: bilgi kaybını önlemek",
          paragraphs: [
            `Mürettebat rotasyonu (crew change) sürekli bilgi kaybı riski taşır; özellikle kaptan, chief officer ve chief engineer devir-teslimi kritiktir. İyi bir handover; açık devam eden sorunlar, kapatılmamış bulgular, devam eden bakım kalemleri, charterer/şirket talimatları, kritik ekipman özellikleri ve ekip dinamiğine dair gerçekçi bir aktarımı kapsar. Yazılı handover notu standarttır ve mümkünse yüz yüze (overlap) yapılır.`,
            `Kaptan değişiminde, gelen kaptanın gemiyi, SMS'i, ekibi ve açık riskleri hızla kavraması için ilk günler hayati önemdedir. Eksik handover, yeni kaptanı bilmediği bir riskin içine sokar; bu yüzden çıkan kaptan, "iyi görünmek" için sorunları gizlemek yerine, dürüst ve eksiksiz bir devir yapmakla yükümlüdür.`,
          ],
        },
        {
          subheading: "9.2 Eğitim ve yetkinliğin filo düzeyinde sürdürülmesi",
          paragraphs: [
            `Kaptanın kadro ve eğitim yönetimi, tek bir geminin sınırlarını aşar; verdiği appraisal'lar, yetiştirdiği zabitler ve raporladığı yetkinlik açıkları, şirketin filo geneli insan kaynağı planlamasını besler. Kaptan, eğitim ihtiyaçlarını ve sertifika açıklarını şirkete düzenli raporlayarak, bir sonraki rotasyonun daha iyi hazırlanmasını sağlar.`,
            `Sonuçta gemideki insan kaynağı, en pahalı ekipmandan daha kritik bir kaynaktır: en gelişmiş gemi bile yetkin, dinlenmiş ve moralli olmayan bir ekiple güvensizdir. Kaptanın kadro ve eğitim yönetimindeki ustalığı, sessizce işleyen, kriz anında dağılmayan ve sürekli gelişen bir ekiple ölçülür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Handover boşluğunun bedeli",
              text: `Bir gemide chief officer değişiminde, devam eden bir ballast tank yapısal sorunu yazılı handover'a geçirilmedi. Yeni chief officer sorunu bilmeden ağır bir ballast operasyonu yaptı ve tank yapısı hasar gördü. Ders: handover bir nezaket değil, emniyetin sürekliliğini sağlayan bir görevdir; kayda geçmeyen bilgi kaybolur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kadro ve eğitim yönetimi kontrol listesi",
          bullets: [
            `Fiili kadro Minimum Safe Manning Document'a uygun ve fiili iş yüküne yeterli mi?`,
            `Tüm STCW/GMDSS/endorsement sertifikaları geçerli; süresi yaklaşanlar şirkete bildirildi mi?`,
            `Yeni katılan herkesin genel ve göreve özgü familiarization'ı tamamlandı, kayda geçti mi?`,
            `Rest hours gerçekçi mi; kayıt ile fiili dinlenme örtüşüyor mu?`,
            `Zorunlu tatbikatlar takvime uygun, gerçekçi ve debrief'li yapılıyor mu?`,
            `BRM/ERM ilkeleri uygulanıyor; junior personel "challenge" edebiliyor mu?`,
            `Competency assessment ve appraisal'lar dürüst, somut ve kişiyle paylaşılmış mı?`,
            `Near-miss ve hata raporlaması canlı; just culture işliyor mu?`,
            `Disiplin tutarlı ve adil; MLC şikâyet prosedürü gerçekten erişilebilir mi?`,
            `Moral, refah ve çok kültürlü ekip dengesi gözleniyor mu?`,
            `Kritik pozisyonların handover'ı yazılı, dürüst ve mümkünse yüz yüze mi?`,
          ],
          paragraphs: [
            `Kaptanın kadro ve eğitim yönetimindeki başarısı, parlak bir liste değil, kriz anında ortaya çıkan bir gerçektir: alarm çaldığında herkesin yerini bilmesi, junior bir zabitin gördüğü tehlikeyi söyleyebilmesi, yorgun bir ekibin önceden dinlendirilmiş olması ve bir hata olduğunda saklanmadan raporlanması. Bu sonuçların hiçbiri tesadüf değildir; hepsi, kaptanın her gün sürdürdüğü disiplinli yetkinlik takibinin, sahici familiarization'ın, gerçekçi tatbikatların ve adil bir liderliğin ürünüdür. İyi kaptan, en iyi ekipmanın bile insan olduğunu bilir ve o insanı yetiştirmeyi en önemli görevi sayar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
