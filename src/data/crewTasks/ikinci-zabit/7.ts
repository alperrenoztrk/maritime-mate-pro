import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Köprüüstü ekibinin seyir eğitimi",
  roleSlug: "ikinci-zabit",
  taskIndex: 7,
  estimatedPages: 26,
  intro: `İkinci Zabit (Second Officer / Navigation Officer), seyir planlamasının yanı sıra köprüüstü ekibinin seyir yetkinliğini geliştiren pratik eğitimin de doğal sahibidir. Bridge Resource Management (BRM) / Bridge Team Management (BTM) tatbikatları, gemiye özgü ECDIS familiarizasyonu, radar/ARPA eğitimi ve COLREG senaryoları ile yeni zabitlerin ve stajyerlerin (cadet) yetkinliğini artırır. Bu bölüm; STCW Manila değişiklikleri ve IMO type-specific ECDIS eğitim zorunluluğu çerçevesinde, hata zinciri (error chain), challenge & response, closed-loop iletişim, durumsal farkındalık (situational awareness) ve otomasyon rehavetini (automation complacency) somut tatbikat senaryolarıyla açıklar. Amaç, kâğıt üzerindeki yeterliliği gerçek köprüüstü performansına dönüştürmektir.`,
  sources: [
    "STCW Convention & Code 2010 (Manila Amendments) — Regulation I/14, II/1, A-II/1",
    "STCW Code Section A-VIII/2 — Watchkeeping Arrangements and Principles",
    "IMO Model Course 1.27 — The Operational Use of ECDIS",
    "IMO Resolution MSC.232(82) — Revised Performance Standards for ECDIS",
    "Bridge Procedures Guide (ICS, 5th Edition)",
    "The Nautical Institute — Bridge Team Management",
    "COLREG 1972 (as amended)",
    "IMO Resolution A.1106(29) — Revised Guidelines for AIS",
    "ISM Code — Familiarization and Training Requirements (Section 6)",
  ],
  chapters: [
    {
      heading: "1. Köprüüstü Eğitiminin Yasal Çerçevesi ve İkinci Zabit'in Rolü",
      lead: `Köprüüstü eğitimi gönüllü bir iyi niyet değil; STCW ve ISM Code gereği belgelenebilir bir zorunluluktur. Yetersiz familiarizasyon, denetimde major non-conformity ve kaza zincirinin ilk halkasıdır.`,
      sections: [
        {
          subheading: "1.1 STCW yeterlilik ile gemiye özgü familiarizasyon ayrımı",
          paragraphs: [
            `STCW sertifikası bir zabitin generic (genel) yeterliliğini belgeler; ancak her gemi farklı bir ECDIS markası, farklı radar/ARPA arayüzü ve farklı bridge layout taşır. Bu nedenle STCW Regulation I/14 ve ISM Code Section 6, denizcinin göreve başlamadan önce gemiye özgü (ship-specific) familiarizasyondan geçirilmesini şart koşar. İkinci Zabit, bu familiarizasyonun seyir ekipmanları ayağını yürütür ve kayıt altına alır.`,
            `Familiarizasyon ile eğitim (training) farklı kavramlardır: familiarizasyon "bu gemideki bu cihazı tanıma", eğitim ise "yetkinliği geliştirme ve sürdürme" sürecidir. İkinci Zabit her ikisini birlikte yönetir; yeni katılan zabit için ilk 24 saat içinde temel familiarizasyon, sefer boyunca ise düzenli tatbikatlarla beceri pekiştirme yapılır.`,
            `Eğitim faaliyeti onboard training record / familiarization checklist ile belgelenir. Belgesiz eğitim, Port State Control (PSC) ve şirket iç denetiminde "yapılmamış" sayılır; kaza sonrası soruşturmalarda da bu kayıtların eksikliği geminin ve şirketin sorumluluğunu ağırlaştırır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW I/14 & ISM Section 6 — Familiarizasyon zorunluluğu",
              text: `Şirket, her denizcinin emniyetle ilgili görevlerini yerine getirmeden önce gemiye, ekipmanlarına ve prosedürlerine alıştırılmasını (familiarization) sağlamakla yükümlüdür. ECDIS için ayrıca type-specific (markaya özgü) eğitim STCW A-II/1 kapsamında aranır.`,
            },
          ],
        },
        {
          subheading: "1.2 İkinci Zabit neden eğitimden sorumludur",
          paragraphs: [
            `İkinci Zabit, seyir cihazlarının (ECDIS, radar/ARPA, GPS, AIS, gyro, echo sounder) bakım, güncelleme ve düzeltme sorumlusu olduğundan bu cihazların en derin pratik bilgisine sahiptir. ENC güncellemeleri, ECDIS safety settings ve passage plan'ı hazırlayan kişi olarak, eğitim için en doğru konumdadır.`,
            `Ayrıca İkinci Zabit, kariyer basamağında stajyer ve junior zabite en yakın amirdir; mentorluk ilişkisi doğal olarak buradan kurulur. Kaptan ve Baş Zabit stratejik gözetim yaparken, günlük pratik eğitim ve Training Record Book (TRB) takibi İkinci Zabit'in sorumluluğuna düşer.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Eğitimi vardiya planına göm",
              text: `Ayrı bir "eğitim seansı" çoğu zaman ertelenir. Bunun yerine eğitim, gerçek vardiya içinde — sakin açık deniz koşullarında — yapılırsa hem gerçekçi olur hem de süreklilik kazanır. Stajyere ECDIS'te fix attırmak, radar plotting yaptırmak vardiya akışını bozmadan eğitim sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Gemiye Özgü ECDIS Familiarizasyonu",
      lead: `ECDIS, modern köprüüstünün merkezidir; ancak yanlış kullanılan bir ECDIS, kâğıt haritadan daha tehlikelidir. Type-specific eğitim, generic ECDIS eğitiminin yerini almaz, onu tamamlar.`,
      sections: [
        {
          subheading: "2.1 Type-specific eğitim zorunluluğu ve familiarizasyon kapsamı",
          paragraphs: [
            `STCW Manila değişiklikleri, ECDIS'i primary means of navigation olarak kullanan gemilerde zabitlerin generic ECDIS eğitimine (IMO Model Course 1.27) ek olarak, gemideki spesifik ECDIS modeline ait type-specific eğitimden geçmiş olmasını şart koşar. İkinci Zabit, gemiye yeni katılan zabitin bu iki eğitimi de tamamladığını doğrular ve type-specific familiarizasyonu bizzat yürütür.`,
            `Familiarizasyon; safety settings (safety contour, safety depth, shallow/deep contour), display modlarının (base/standard/all) ayarlanması, alarm yönetimi, route planning ve route check fonksiyonu, manuel update layer'ı, S-52 sembolojisi ve S-57/S-63 ENC yükleme-güncelleme süreçlerini kapsar. Her marka bu fonksiyonları farklı menü mantığıyla sunar; körü körüne menü ezberi değil, fonksiyonun mantığı öğretilmelidir.`,
            `ECDIS'in en kritik ayarı safety contour'dur. İkinci Zabit, zabite safety contour'un anti-grounding fonksiyonunu, ENC'de istenen değer mevcut değilse sistemin bir sonraki daha derin contour'a yuvarladığını ve bu yüzden gerçek değerin doğrulanması gerektiğini öğretmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Generic eğitim ≠ type-specific yeterlilik",
              text: `Bir zabitin generic ECDIS sertifikası olması, gemideki belirli markayı (örn. Furuno, JRC, Transas/Wärtsilä) emniyetle kullanabileceği anlamına gelmez. Muros (2016) kazası, ECDIS familiarizasyon ve doğru safety contour ayarı eksikliğinin tipik sonucudur.`,
            },
          ],
        },
        {
          subheading: "2.2 ECDIS familiarizasyon kontrol başlıkları",
          paragraphs: [
            `İkinci Zabit, yeni zabit için yapılandırılmış bir ECDIS familiarizasyon checklist'i kullanır. Bu checklist, salt "gösterildi" değil, zabitin fonksiyonu kendi başına icra edebildiğini (demonstrated competence) doğrular. Aşağıdaki tablo tipik bir familiarizasyon kapsamını özetler.`,
            `Familiarizasyon tamamlandığında, kayıt zabit ve İkinci Zabit tarafından imzalanır ve gemi eğitim dosyasına konur. Yetersiz görülen başlıklar için ek seans planlanır; eksik bir başlık geçilmiş kabul edilmez.`,
          ],
          table: {
            caption: `Gemiye Özgü ECDIS Familiarizasyon Başlıkları`,
            headers: ["Konu", "Beklenen yetkinlik", "Doğrulama yöntemi"],
            rows: [
              ["Safety settings", "Contour/depth/shallow/deep doğru girer", "Uygulamalı gösterim"],
              ["ENC yükleme/güncelleme", "S-63 hücre yükler, permit ekler", "Gözetimli işlem"],
              ["Route planning", "Waypoint, leg, XTD tanımlar", "Plan oluşturma"],
              ["Route check", "Uyarıları yorumlar ve giderir", "Senaryo testi"],
              ["Alarm yönetimi", "Alarmı tanır, kök nedeni bulur", "Senaryo testi"],
              ["Manuel update", "T&P/yerel tehlike işler", "Uygulamalı gösterim"],
              ["Backup düzeni", "Primary arızasında geçişi bilir", "Sözlü + pratik"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Radar / ARPA Eğitimi",
      sections: [
        {
          subheading: "3.1 Radar ayarları ve yorumlama",
          paragraphs: [
            `Radar eğitimi, cihazın doğru ayarlanmasıyla başlar: gain, sea clutter (STC), rain clutter (FTC), tuning, pulse length ve range seçimi. İkinci Zabit, stajyere yanlış clutter ayarının gerçek hedefleri (örn. küçük tekneler, growler) bastırabileceğini ve aşırı gain'in ekranı parazitle dolduracağını uygulamalı gösterir. Doğru ayar, statik bir prosedür değil, koşullara (deniz durumu, yağış) göre sürekli optimize edilen bir beceridir.`,
            `Head-up, course-up ve north-up gösterim modları ile true/relative motion arasındaki fark öğretilir. Relative motion'da kendi gemimiz sabit, hedefler hareketlidir; true motion'da her ikisi de gerçek hareketini gösterir. Çatışmadan kaçınma değerlendirmesinde relative motion ve relative track'in okunması esastır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sea clutter küçük hedefi gizler",
              text: `Aşırı sea clutter (STC) ayarı, baş bordadaki küçük tekneyi, balıkçı gemisini veya buz parçasını (growler) ekrandan silebilir. İkinci Zabit, clutter ayarını periyodik olarak azaltıp ekranı yeniden taramayı bir alışkanlık olarak öğretmelidir.`,
            },
          ],
        },
        {
          subheading: "3.2 ARPA tracking, CPA/TCPA ve sınırlamalar",
          paragraphs: [
            `ARPA (Automatic Radar Plotting Aid), hedefleri acquire eder, vektörlerini hesaplar ve CPA (Closest Point of Approach) ile TCPA (Time to CPA) değerlerini verir. İkinci Zabit, vector mode (true/relative) ayrımını, trial manoeuvre fonksiyonunu ve guard zone kullanımını öğretir. Trial manoeuvre, planlanan bir manevranın CPA'yı nasıl değiştireceğini önceden gösterir; ancak manevra parametreleri gerçekçi girilmelidir.`,
            `ARPA'nın sınırlamaları kritik öneme sahiptir: hedef bulaşması (target swap), düşük SNR'de iz kaybı, yeni acquire edilmiş hedefin vektörünün ilk dakikalarda kararsız olması ve sensör girişlerindeki (gyro, log) hataların CPA hesabını bozması. İkinci Zabit, ARPA'nın bir karar destek aracı olduğunu, gözcülüğün (lookout) ve plotting'in yerini almadığını vurgular.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — radar verisine aşırı güven",
              text: `Birçok çatışma soruşturmasında, ekibin ARPA vektörüne körü körüne güvenip COLREG değerlendirmesini ihmal ettiği görülür. ARPA, hedefin niyetini (örn. dönüş yapacağını) bilemez; yalnızca mevcut hareketin matematiğini verir. Eğitimde "ARPA der ki" yerine "gözlem + ARPA + COLREG" üçlüsü vurgulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. COLREG Senaryoları ile Yetkinlik Geliştirme",
      sections: [
        {
          subheading: "4.1 Senaryo tabanlı COLREG eğitimi",
          paragraphs: [
            `COLREG kurallarını ezbere bilmek yetmez; gerçek köprüüstünde hızlı ve doğru karar verme becerisi gerekir. İkinci Zabit, radar/ECDIS simülasyonu veya gerçek trafik durumları üzerinden senaryolar kurar: head-on (Kural 14), crossing (Kural 15), overtaking (Kural 13) ve restricted visibility (Kural 19) durumları ayrı ayrı çalışılır. Her senaryoda "stand-on mu give-way mı, hangi manevra, ne zaman, COLREG'in hangi kuralı" sorgulanır.`,
            `Restricted visibility (Kural 19) özel olarak vurgulanır; bu durumda stand-on/give-way ayrımı yoktur, her gemi radar plotting'e göre erken ve belirgin manevra yapar. İkinci Zabit, sislerde sancağa dönmenin yasak olduğu istisnayı (önden/önden-sancaktan gelen hedef hariç) ve hızın güvenli seviyeye düşürülmesini açıkça öğretir.`,
          ],
          table: {
            caption: `Temel COLREG Çatışma Senaryoları ve Beklenen Aksiyon`,
            headers: ["Senaryo", "Kural", "Bizim durumumuz", "Beklenen manevra"],
            rows: [
              ["Head-on", "Kural 14", "Her iki gemi de give-way", "İkisi de sancağa dön, iskeleden geç"],
              ["Crossing (sağdan gelen)", "Kural 15/16", "Give-way", "Erken, belirgin; genelde sancağa, kıçından geç"],
              ["Crossing (soldan gelen)", "Kural 17", "Stand-on", "Rota/hızı koru, gerekirse Kural 17(b)"],
              ["Overtaking", "Kural 13", "Geçen gemi give-way", "Net mesafede geç, ana hedefe yol ver"],
              ["Restricted visibility", "Kural 19", "Stand-on yok", "Erken aksiyon, sancaktan kaçın, hız azalt"],
            ],
          },
        },
        {
          subheading: "4.2 Erken ve belirgin manevra, küçük düzeltme tuzağı",
          paragraphs: [
            `COLREG Kural 8, çatışmadan kaçınma manevrasının erken (in ample time), belirgin (substantial / readily apparent) ve gerekirse hız değişimini içerecek şekilde yapılmasını ister. İkinci Zabit, junior zabite en sık yapılan hatayı öğretir: küçük, tedrici rota düzeltmeleri (örn. 2-3 derece) karşı geminin radarında fark edilmez ve niyeti belirsiz bırakır. Bunun yerine en az 20-30 derecelik belirgin bir dönüş yapılır.`,
            `Eğitimde "son dakika manevrası" tuzağı da işlenir: stand-on gemi, give-way gemi aksiyon almazsa Kural 17 gereği önce kendi başına manevra hakkı (17b), sonra zorunluluğu doğar. Bu geçişin zamanlamasını doğru okumak, sadece tecrübe ve senaryo tekrarı ile kazanılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Kural 8 — Manevranın niteliği",
              text: `Çatışmadan kaçınma için yapılan herhangi bir aksiyon, koşullar elveriyorsa erken, belirgin ve iyi denizcilik gereklerine uygun olmalıdır. Bir dizi küçük rota/hız değişikliğinden kaçınılmalıdır; manevra, gözlemleyen başka bir gemi tarafından açıkça anlaşılabilir olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. BRM / BTM İlkeleri ve Hata Zinciri",
      lead: `Kazaların büyük çoğunluğu tek bir teknik arızadan değil, birikerek ilerleyen bir insan hatası zincirinden doğar. BRM, bu zinciri kırmak için tasarlanmış bir ekip disiplinidir.`,
      sections: [
        {
          subheading: "5.1 Hata zinciri (error chain) ve kırılma noktaları",
          paragraphs: [
            `Bridge Resource Management; köprüüstündeki tüm kaynakların (insan, ekipman, bilgi) etkin kullanımıyla emniyetli seyri sağlama disiplinidir. Hata zinciri kavramı, bir kazaya giden yolda art arda dizilen küçük hata ve göz ardı edilen işaretleri tanımlar; zincirin herhangi bir halkasını kıran müdahale kazayı önler. İkinci Zabit, ekibe zincirin tipik belirtilerini (warning signs) tanımayı öğretir.`,
            `Bu belirtiler arasında; belirsizlik (ambiguity), ekip üyeleri arasında farklı mental model, prosedürlerin atlanması, iletişim kopukluğu, tek kişiye aşırı iş yükü, ufuk/gözcülük ihmali ve "bir şeyler yanlış ama emin değilim" hissinin dile getirilmemesi yer alır. Eğitimde bu belirtilerin her birine somut örnek verilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Royal Majesty (1995)",
              text: `GPS anteni arızalandı, sistem dead reckoning'e düştü ama ekip fark etmedi; gemi planlanan rotadan saatlerce saparak karaya oturdu. Hata zinciri: tek pozisyon kaynağına güven, alarm yorumlama eksikliği, bağımsız fix ihmali, durumsal farkındalık kaybı. Her halka, bir çapraz kontrol ile kırılabilirdi.`,
            },
          ],
        },
        {
          subheading: "5.2 Challenge & response ve closed-loop iletişim",
          paragraphs: [
            `Challenge and response; bir ekip üyesinin, amir dahil herkesin kararını emniyet adına sorgulayabilmesi kültürüdür. İkinci Zabit, junior zabite ve dümenciye "yanlış gördüğünü söyleme cesareti"nin bir görev olduğunu öğretir; otorite gradyanının (authority gradient) susturduğu bir köprüüstü tehlikelidir. Pilotlu seyirde dahi pilotun önerisi plana göre sorgulanmalıdır.`,
            `Closed-loop (kapalı çevrim) iletişim; bir komutun verilmesi, alıcının tekrar etmesi (read-back) ve komutun icra edildiğinin teyidi (örn. dümencinin "midships, dümen ortada" demesi) ile tamamlanır. Bu döngü, yanlış anlaşılan bir dümen komutunun kazaya dönüşmesini engeller. Eğitimde dümen ve makine komutları her zaman closed-loop ile çalışılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Authority gradient'i düzleştir",
              text: `Brifing başında "Bir şey yanlış görürseniz çekinmeden söyleyin, beni durdurmanızı bekliyorum" demek, junior ekibin konuşma eşiğini düşürür. Sessiz bir köprüüstü, iyi giden değil, çoğu zaman riskleri dile getirmeyen bir köprüüstüdür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Durumsal Farkındalık ve Otomasyon Rehaveti",
      sections: [
        {
          subheading: "6.1 Situational awareness'ın üç seviyesi",
          paragraphs: [
            `Durumsal farkındalık (situational awareness); çevreyi algılama (perception), anlamlandırma (comprehension) ve geleceği öngörme (projection) olmak üzere üç seviyeden oluşur. İkinci Zabit, junior zabite sadece "ne oluyor"u değil, "bu ne anlama geliyor" ve "5-10 dakika sonra ne olacak" sorularını sürekli sormayı öğretir. Pozisyonun, trafiğin, derinliğin ve hava trendinin birlikte zihinde bir resim oluşturması gerekir.`,
            `Durumsal farkındalık kaybının tipik nedenleri; aşırı iş yükü, dikkat dağınıklığı (örn. tek bir cihaza fiksasyon — task fixation), yorgunluk ve "her şey yolunda" varsayımıdır. Eğitimde, zabite vardiya boyunca düzenli olarak "büyük resme" geri çekilip ufku ve tüm sensörleri yeniden taraması alışkanlığı kazandırılır.`,
          ],
        },
        {
          subheading: "6.2 Otomasyon rehaveti (automation complacency)",
          paragraphs: [
            `Modern köprüüstü; ECDIS, track control (autopilot), ARPA ve integrated bridge system ile yüksek otomasyona sahiptir. Bu, otomasyon rehaveti riskini doğurur: ekip, sistemin doğru çalıştığını varsayarak izlemeyi gevşetir. GPS spoofing/jamming, ENC hatası veya sensör arızası bu rehavette fark edilmeden ilerler. İkinci Zabit, otomasyonun bir araç olduğunu, sorumluluğun her zaman insanda kaldığını vurgular.`,
            `Bu riske karşı pratik panzehir; bağımsız çapraz kontroldür. Track control modunda dahi pozisyon radar/visual bearing ile, derinlik echo sounder ile teyit edilir. Eğitimde zabite periyodik olarak otomasyonu "sorgulama" alışkanlığı kazandırılır: "ECDIS bana bunu gösteriyor — bağımsız olarak doğru mu?"`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Track control rehaveti",
              text: `Autopilot/track control devredeyken gemi rotada sanılırken, gyro hatası veya bir waypoint atlanması fark edilmeyebilir. Otomasyon, gözcülüğü ve izlemeyi azaltmaz; tam tersine, izlemenin kalitesini artırma fırsatı olarak kullanılmalıdır.`,
            },
            {
              type: "reference",
              title: "STCW A-VIII/2 — İzleme prensipleri",
              text: `STCW Code Part A-VIII/2, vardiya zabitinin uygun gözcülük (lookout) bulundurmasını ve seyir cihazlarını etkin biçimde kullanmasını şart koşar. Otomasyon, bu temel yükümlülükleri ortadan kaldırmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Stajyer (Cadet) Mentorluğu ve Training Record Book",
      sections: [
        {
          subheading: "7.1 Mentorluk ilişkisi ve görev devri",
          paragraphs: [
            `Stajyer eğitimi, görevleri yapma fırsatı vermeden gerçekleşmez. İkinci Zabit, gözetimli sorumluluk (supervised responsibility) ilkesiyle, stajyere giderek artan görevler verir: önce fix attırma ve logbook tutturma, sonra radar plotting, ECDIS route monitoring ve uygun koşullarda gözetimli vardiya pratiği. Her görev, başarı seviyesine göre değerlendirilir ve geri bildirim verilir.`,
            `İyi mentorluk; hata yapıldığında suçlamak değil, hatayı bir öğrenme anına çevirmektir. İkinci Zabit, "neden böyle yaptın, sonucu ne olurdu, doğrusu nasıl olurdu" sorgulamasıyla stajyerin muhakeme becerisini geliştirir. Salt prosedür ezberi değil, denizcilik muhakemesi (seamanship judgement) hedeflenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Açıklayarak yaptır, yaptırarak öğret",
              text: `\"Demonstrate, then supervise, then delegate\" (göster, gözetle, devret) modeli stajyer eğitiminde en etkili yöntemdir. Stajyere bir görevi önce yaparak gösterin, sonra gözetiminizde yaptırın, yetkinleştikçe bağımsız sorumluluk verin.`,
            },
          ],
        },
        {
          subheading: "7.2 Training Record Book (TRB) ve ilerleme takibi",
          paragraphs: [
            `Training Record Book (TRB), stajyerin STCW gerektirdiği yeterliliklere (competence) ulaştığını belgeleyen resmi kayıttır. İkinci Zabit, çoğu gemide stajyerin shipboard training officer'ı veya en yakın amiri olarak TRB görevlerinin tamamlanmasını gözetir, gözlem yapar ve yetkin gördüğü görevleri imzalar. TRB, denizcilik okulu ile gemi arasındaki köprüdür ve eksik doldurulması stajyerin sınıf atlamasını engeller.`,
            `İkinci Zabit, TRB'yi pasif bir imza defteri değil, aktif bir eğitim planı olarak kullanır: hangi görevler tamamlandı, hangileri eksik, sefer bu eksikleri kapatmak için nasıl planlanır. Örneğin stajyerin demir tatbikatı eksikse, bir sonraki demirleme öncesi stajyere bu süreç planlı şekilde öğretilir.`,
          ],
          table: {
            caption: `Stajyer Seyir Eğitimi İlerleme Örneği (Seviye Bazlı)`,
            headers: ["Yetkinlik alanı", "Seviye 1 (gözlem)", "Seviye 2 (gözetimli)", "Seviye 3 (bağımsız)"],
            rows: [
              ["Pozisyon fix (radar/visual)", "İzler", "Gözetimde atar", "Vardiyada düzenli atar"],
              ["ECDIS monitoring", "Tanır", "XTD/alarm yorumlar", "Plan izler, sapma bildirir"],
              ["Radar/ARPA", "Ayar görür", "Hedef acquire eder", "CPA/TCPA yorumlar"],
              ["COLREG değerlendirme", "Kuralı söyler", "Senaryoyu çözer", "Gerçek trafikte önerir"],
              ["Logbook & raporlama", "Okur", "Yazdırılır", "Doğru ve eksiksiz tutar"],
            ],
          },
        },
      ],
    },
    {
      heading: "8. Tatbikat Senaryoları ve Planlanması",
      sections: [
        {
          subheading: "8.1 Köprüüstü tatbikat türleri",
          paragraphs: [
            `İkinci Zabit, sefer boyunca düzenli köprüüstü tatbikatları planlar. Bunlar; GPS kaybı (loss of position) senaryosu, steering gear arızası ve emergency steering geçişi, blackout sonrası köprüüstü yönetimi, man overboard (MOB) manevrası (Williamson/Anderson turn), restricted visibility seyri ve ECDIS primary arızasında backup'a geçiş tatbikatlarını içerir. Her tatbikat, gerçekçi ve önceden planlı olmalıdır.`,
            `Tatbikatlar, gerçek seyri tehlikeye atmadan — açık deniz ve uygun koşullarda — yapılır. Bazı senaryolar simülasyon/masaüstü (table-top) olarak da çalışılabilir; örneğin bir grounding senaryosunda ekibe "ne yapardınız" tartışması yaptırılır. Tatbikat sonrası mutlaka debrief yapılır; iyi giden ve gelişmesi gereken yönler not edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Örnek tatbikat — ani GPS kaybı",
              text: `İkinci Zabit, açık denizde habersizce GPS girişini kapatır (veya simüle eder). Beklenti: vardiya zabitinin alarmı tanıması, dead reckoning'e geçmesi, radar/visual fix ile pozisyonu bağımsız doğrulaması, kaptanı bilgilendirmesi ve ECDIS'i DR moduyla emniyetle sürdürmesi. Debrief'te tepki süresi ve doğruluk değerlendirilir.`,
            },
          ],
        },
        {
          subheading: "8.2 Tatbikat kaydı ve sürekli iyileştirme",
          paragraphs: [
            `Her tatbikat tarih, katılımcılar, senaryo, gözlemler ve çıkarılan dersler ile kayıt altına alınır. Bu kayıt; ISM Code gereği şirket emniyet yönetim sistemine (SMS) işlenir ve iç/dış denetimlerde sunulur. Tekrarlayan eksiklikler (örn. ekip restricted visibility'de hızı düşürmekte tereddüt ediyor) bir sonraki tatbikatın odağı olur.`,
            `İkinci Zabit, tatbikatları "yapılmış görünmesi gereken bir formalite" değil, ekip yetkinliğini ölçen ve geliştiren gerçek bir araç olarak yönetir. Gerçekçilik kaçtığında tatbikat değerini yitirir; ekip senaryoyu ciddiye almazsa kriz anında otomatik refleks oluşmaz.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM Code — Tatbikat ve eğitim kaydı",
              text: `ISM Code, acil durumlara hazırlık için programlı tatbikatları (drills) ve eğitimlerin SMS içinde belgelenmesini gerektirir. Köprüüstü seyir tatbikatları bu kapsamda planlanır, yürütülür ve kayda geçirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Eğitim Etkinliğinin Değerlendirilmesi",
      sections: [
        {
          subheading: "9.1 Yetkinlik ölçümü ve geri bildirim",
          paragraphs: [
            `Eğitim, "anlatıldı" ile değil, "yetkinlik kazanıldı" ile tamamlanır. İkinci Zabit, gözlem (observation), uygulamalı görev (practical task) ve senaryo testi ile yetkinliği ölçer. Bir zabitin ECDIS'i emniyetle kullanabildiği, ancak bağımsız olarak doğru safety contour'u girip route check çıktısını yorumlayabildiğinde doğrulanmış sayılır.`,
            `Geri bildirim somut, zamanında ve yapıcı olmalıdır. "İyiydi" yerine "Crossing senaryosunda manevran doğruydu ama 3 dakika geç kaldın; erken aksiyon CPA'yı çok daha güvenli yapardı" tarzı spesifik geri bildirim öğrenmeyi hızlandırır. İkinci Zabit, güçlü ve gelişmesi gereken yönleri dengeli biçimde aktarır.`,
          ],
        },
        {
          subheading: "9.2 Sık görülen eğitim eksiklikleri",
          paragraphs: [
            `En yaygın eksiklikler; familiarizasyonun "checklist imzalandı" formalitesine indirgenmesi, type-specific ECDIS eğitiminin generic eğitimle karıştırılması, COLREG'in ezber kalıp gerçek senaryoya dökülmemesi ve tatbikatların gerçekçilikten uzak yapılmasıdır. Bir diğer eksiklik, junior ekibin challenge etme cesaretinin geliştirilmemesidir.`,
            `İkinci Zabit ayrıca kendi bilgisini güncel tutmalıdır; ECDIS yazılım güncellemeleri, COLREG yorumları ve şirket prosedür değişiklikleri eğitim içeriğine yansıtılmalıdır. Eğitenin geride kaldığı bir köprüüstünde, eğitilen de geride kalır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Eğitimi ölçülebilir hedeflere bağla",
              text: `\"ECDIS öğret\" yerine \"sefer sonunda junior zabit safety settings'i bağımsız girip route check'i tek başına yorumlayabilsin\" gibi ölçülebilir bir hedef koyun. Net hedef, hem eğitenin hem eğitilenin ilerlemeyi görmesini sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in köprüüstü eğitim checklist'i",
          bullets: [
            `Yeni katılan zabit/stajyer için gemiye özgü familiarizasyon ilk 24 saatte yapıldı mı?`,
            `Type-specific ECDIS eğitimi doğrulandı ve safety settings uygulamalı gösterildi mi?`,
            `ENC yükleme/güncelleme, route planning ve route check uygulamalı çalışıldı mı?`,
            `Radar ayarları (gain, clutter, tuning) ve ARPA CPA/TCPA yorumlama gösterildi mi?`,
            `COLREG senaryoları (head-on, crossing, overtaking, restricted visibility) çalışıldı mı?`,
            `Kural 8 erken/belirgin manevra ilkesi ve küçük düzeltme tuzağı vurgulandı mı?`,
            `BRM ilkeleri (hata zinciri, challenge & response, closed-loop) anlatıldı ve pratikte uygulandı mı?`,
            `Durumsal farkındalık ve otomasyon rehaveti riski örneklerle işlendi mi?`,
            `Stajyerin TRB görevleri gözden geçirildi, eksikler sefer planına alındı mı?`,
            `Köprüüstü tatbikatları (GPS kaybı, steering arızası, restricted visibility) planlandı, yürütüldü ve debrief edildi mi?`,
            `Tüm eğitim ve tatbikatlar belgelenip gemi eğitim dosyasına/SMS'e işlendi mi?`,
          ],
          paragraphs: [
            `Köprüüstü ekibinin seyir eğitimi, İkinci Zabit'in en kalıcı katkısıdır; bir passage plan tek bir seferi, iyi eğitilmiş bir ekip ise yüzlerce seferi emniyete alır. Familiarizasyonu formaliteye indirmeyen, COLREG'i gerçek senaryoya döken, BRM kültürünü ve challenge etme cesaretini ekibe işleyen bir İkinci Zabit, hata zincirinin daha ilk halkasında kırılmasını sağlar. Otomasyon arttıkça insanın izleme ve sorgulama sorumluluğu azalmaz; tam tersine eğitimin değeri her geçen yıl daha da kritik hale gelir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
