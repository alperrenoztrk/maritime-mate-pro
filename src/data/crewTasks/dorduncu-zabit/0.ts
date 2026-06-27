import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Köprüüstü vardiyası (00-04 / 12-16)",
  roleSlug: "dorduncu-zabit",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Dördüncü Zabit (Fourth Officer / Junior Officer), köprüüstünde Kaptan veya Birinci Zabit'in gözetimi altında bağımsız seyir vardiyası tutmayı öğrenen ve uygulayan en kıdemsiz vardiya zabitidir. Bu vardiya genellikle 00-04 (graveyard watch) ve 12-16 dilimlerinde yürütülür. Bu bölüm; OOW (Officer of the Watch) olarak radar/ECDIS/ARPA kullanımı, COLREG uygulaması, pozisyon doğrulaması, logbook tutma ve vardiya teslim-devir prosedürlerini, kıdemsiz zabit perspektifinden ve gözetim çerçevesinde adım adım açıklar. Amacı, bağımsız vardiyaya hazırlık ile gözetim altındaki sorumluluğun dengesini kurmaktır.`,
  sources: [
    "STCW Code Section A-VIII/2 — Watchkeeping Arrangements and Principles",
    "COLREG 1972 (International Regulations for Preventing Collisions at Sea)",
    "SOLAS Chapter V — Safety of Navigation",
    "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    "ICS Bridge Procedures Guide (5th Edition)",
    "IMO Performance Standards for ECDIS (MSC.232(82))",
    "IMO Performance Standards for Radar (MSC.192(79))",
    "ISM Code — Shipboard Operations (Element 7)",
  ],
  chapters: [
    {
      heading: "1. Vardiya Zabitliğinin Esasları ve Gözetim Çerçevesi",
      lead: `Dördüncü Zabit, OOW görevini ifa ederken Kaptan'ın temsilcisidir; ancak kıdemi gereği belirli durumlarda üst zabiti çağırmakla yükümlüdür.`,
      sections: [
        {
          subheading: "1.1 OOW'in temel sorumluluğu",
          paragraphs: [
            `STCW A-VIII/2 uyarınca vardiya zabiti, vardiyası süresince Kaptan'ın temsilcisi olarak geminin emniyetli seyrinden birincil sorumludur. Dördüncü Zabit için bu sorumluluk, tecrübe seviyesi gözetilerek "supervised watch" çerçevesinde verilir; yani standing orders ve night orders ile sınırları net çizilmiş, çağırma kriterleri açıkça tanımlanmış bir yetkidir.`,
            `Vardiya zabitinin birincil görevi proper look-out (gözcülük) sağlamaktır. COLREG Kural 5 gereği görme, işitme ve mevcut tüm araçlarla (radar, AIS) sürekli ve uygun gözcülük tutulur. Dördüncü Zabit, gündüz ve iyi görüş şartlarında tek başına gözcü olabilir; gece, sınırlı görüş veya yoğun trafikte mutlaka ek gözcü (lookout) talep eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/2 — Sole Look-out",
              text: `Vardiya zabiti gündüz, iyi hava ve düşük trafikte tek gözcü olabilir; ancak şüphe duyduğu an derhal takviye ister. Karanlık çökmeden önce sole look-out durumu yeniden değerlendirilmelidir. Bu karar ertelenemez.`,
            },
          ],
        },
        {
          subheading: "1.2 Master's Standing Orders ve Night Orders",
          paragraphs: [
            `Standing Orders, Kaptan'ın seyir boyunca geçerli kalıcı talimatlarıdır: minimum CPA/TCPA değerleri, çağırma mesafeleri, hava değişiminde yapılacaklar. Night Orders ise her gece Kaptan tarafından yazılı verilen vardiyaya özel talimatlardır. Dördüncü Zabit, vardiyaya başlamadan önce her ikisini de okuyup imzalar.`,
            `Bu talimatlar Dördüncü Zabit'in karar sınırlarını belirler. Örneğin "CPA 2 mil altına düşecekse beni arayın" talimatı varsa, kıdemsiz zabit bu eşiği aşan herhangi bir durumda tereddüt etmeden Kaptan'ı çağırır. Çağırmak zayıflık değil, profesyonelliktir; çağırmamak ise en sık görülen vardiya hatasıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Çağırma kültürü",
              text: `"When in doubt, call the Master." Tecrübeli kaptanlar erken çağrılmaktan asla rahatsız olmaz; geç çağrılmaktan ise her zaman. Dördüncü Zabit için en güvenli refleks, şüphe anında telefonu kaldırmaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Radar ve ARPA ile Trafik Değerlendirmesi",
      sections: [
        {
          subheading: "2.1 Radar ayarları ve hedef tespiti",
          paragraphs: [
            `Vardiya başında radar; gain, sea clutter (STC), rain clutter (FTC), brilliance ve range ayarları kontrol edilir. North-up / head-up / course-up presentation modu trafik durumuna göre seçilir. Dördüncü Zabit, hem long-range scanning (12-24 mil, erken tespit) hem de short-range izleme (3-6 mil, yakın trafik) için range'leri periyodik değiştirir.`,
            `ARPA (Automatic Radar Plotting Aid), hedefleri acquire ederek CPA, TCPA, hedef hızı/rotası ve aspect bilgisi üretir. Dördüncü Zabit, otomatik takibe körü körüne güvenmez; target swap, manevra sırasındaki vektör gecikmesi ve clutter içinde hedef kaybı gibi ARPA kısıtlarını bilir. True ve relative vektörleri duruma göre kullanır.`,
          ],
          bullets: [
            `CPA (Closest Point of Approach) — en yakın geçiş mesafesi`,
            `TCPA (Time to CPA) — en yakın geçişe kalan süre`,
            `BCR/BCT (Bow Crossing Range/Time) — baş kesişme verisi`,
            `Trial manoeuvre — manevranın etkisini önceden test etme`,
            `Guard zone / ring — belirlenen bölgeye giren hedefte alarm`,
          ],
        },
        {
          subheading: "2.2 AIS ile çapraz doğrulama",
          paragraphs: [
            `AIS, hedeflerin MMSI, isim, rota, hız, dönüş oranı ve niyet (destination) bilgisini verir. Dördüncü Zabit, ARPA çözümü ile AIS verisini çapraz kontrol eder; tutarsızlık varsa radar gözlemini esas alır. AIS gönderilen veri kalitesine bağlıdır ve manuel girişler (draught, destination) hatalı olabilir.`,
            `AIS, COLREG manevra kararının tek dayanağı yapılmaz. Çatışma önlemede radar/görsel gözlem önceliklidir; AIS yalnızca durumsal farkındalığı zenginleştiren yardımcı araçtır. Bu prensip, kıdemsiz zabitin sıkça düştüğü "AIS-bağımlılığı" hatasını önler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "AIS yanıltıcı olabilir",
              text: `Balıkçı tekneleri, küçük craft ve askeri gemiler AIS taşımayabilir veya kapatabilir. Yalnızca AIS ekranına bakan bir vardiya, transponder'sız hedefi tamamen kaçırabilir. Görsel ve radar gözcülüğü asla devre dışı bırakılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. COLREG Uygulaması",
      sections: [
        {
          subheading: "3.1 Çatışma riskinin değerlendirilmesi",
          paragraphs: [
            `COLREG Kural 7 gereği, "şüphe varsa çatışma riski vardır" prensibiyle hareket edilir. Sabit veya çok az değişen kerteriz (compass bearing) çatışma riskinin temel göstergesidir. Dördüncü Zabit, yaklaşan hedefin pusula kerterizini periyodik alır; kerteriz değişmiyorsa risk mevcuttur.`,
            `Kural 8 uyarınca çatışmayı önleyici manevra erken, belirgin ve geminin imkanları el verdiğince büyük yapılır. Küçük, kademeli rota değişiklikleri karşı gemi tarafından fark edilmez ve karışıklık yaratır. Manevra büyük ve net olmalı, radarda da görsel olarak da açık şekilde anlaşılmalıdır.`,
          ],
          table: {
            caption: `COLREG Karşılaşma Durumları ve Yükümlülük (Power-driven vessels)`,
            headers: ["Durum", "Kural", "Bizim rolümüz", "Eylem"],
            rows: [
              ["Head-on", "14", "Her iki gemi", "İskele tarafına dönerek sancaktan geç"],
              ["Crossing", "15", "Sağdaki gemi 'stand-on'", "Soldaki 'give-way' olur"],
              ["Overtaking", "13", "Geçen gemi 'give-way'", "Açık geç, sorumluluk geçende"],
              ["Give-way vessel", "16", "Yol veren", "Erken ve belirgin manevra"],
              ["Stand-on vessel", "17", "Yolu olan", "Rota/hız koru, son anda manevra"],
            ],
          },
        },
        {
          subheading: "3.2 Sınırlı görüş kuralları (Kural 19)",
          paragraphs: [
            `Sınırlı görüşte (sis, yağmur, kar) "stand-on/give-way" ayrımı geçerli değildir; her gemi güvenli hızda seyreder ve makineleri manevraya hazır tutar. Radarda tespit edilen bir hedef için, mümkünse iskele tarafına dönüş (sancaktaki gemiye doğru hariç) ve önündeki gemiye doğru rota değişikliği gibi yasaklanmış manevralardan kaçınılır.`,
            `Sınırlı görüşe girildiğinde Dördüncü Zabit derhal Kaptan'ı çağırır, ek gözcü ister, sis düdüğü çalmaya başlar (Kural 35), seyir fenerlerini yakar, manuel dümene geçer ve makineye standby bilgisi verir. Hız, görüş mesafesine ve stopping distance'a göre azaltılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Kural 19 — Restricted Visibility",
              text: `Sınırlı görüşte güvenli hız zorunludur. Radarda yalnız hedef varsa: erken eylem al, ancak (a) yanaldaki hedefe sancak dönüşü ve (b) kıçından geçen/yanal hedefe iskele dönüşünden kaçın. Yön belirsizse hız düşür, gerekirse durdur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Pozisyon Doğrulaması ve Seyir İzleme",
      sections: [
        {
          subheading: "4.1 Position fixing yöntemleri",
          paragraphs: [
            `Dördüncü Zabit, pozisyonu tek kaynağa (GPS) bağlamaz. GPS fix'i; radar mesafesi/kerterizi, görsel kerteriz (transit, three-point bearing), echo sounder derinliği ve parallel index ile çapraz doğrulanır. ECDIS üzerinde primary ve secondary positioning sistemleri ayrı tutulur.`,
            `Position fixing aralığı passage plan ve mevki hassasiyetine göre değişir: açık denizde 30-60 dakika, kıyı sularında 6-12 dakika, dar suyolu/kanalda sürekli izleme (parallel indexing). Her fix logbook'a ve ECDIS'e kaydedilir; fix arasında dead reckoning ve set/drift hesabı yapılır.`,
          ],
          bullets: [
            `GPS fix + radar range/bearing çapraz kontrol`,
            `Echo sounder derinliği ile chart datum kıyaslaması`,
            `Parallel index ile kıyı/tehlikeye olan mesafe izleme`,
            `Cross-track distance (XTD) ve off-track alarm takibi`,
            `Set ve drift hesabı (akıntı/rüzgar etkisi)`,
          ],
        },
        {
          subheading: "4.2 ECDIS izleme ve safety settings",
          paragraphs: [
            `ECDIS'te safety contour, safety depth, shallow/deep contour ve XTD limitleri voyage plan'a göre ayarlanır. Dördüncü Zabit, look-ahead fonksiyonu ile rota önündeki tehlikeleri (sığlık, batık, trafik ayrım şeması) önceden tespit eder ve anti-grounding alarmlarını aktif tutar.`,
            `ECDIS, kağıt harita yerine birincil seyir aracı olduğunda chart up-to-date olmalı, doğru SCAMIN ve display ayarları kullanılmalıdır. Over-scale ve under-scale gösterimden kaçınılır; uygun usage band (harbour, approach, coastal) seçilir. Alarm yorgunluğuna (alarm fatigue) karşı kritik alarmlar asla susturulmaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — ECDIS yanlış ayarı",
              text: `Birçok karaya oturma vakası, ECDIS safety contour'unun olduğundan derin ayarlanması veya look-ahead alarmının kapatılmasından kaynaklanmıştır (örn. CFL Performer, Ovit). Ders: alarm kapatma değil, doğru ayar yapılır; kıdemsiz zabit ayarları her vardiya başında teyit eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Vardiya Teslim-Devir Prosedürleri",
      sections: [
        {
          subheading: "5.1 Handover öncesi hazırlık",
          paragraphs: [
            `Devralan zabit, köprüüstüne en az 15 dakika önce çıkar; karanlık adaptasyonu (gece görüşü) için gözlerini ortama alıştırır. Bu süre, ekranların aydınlatması kısılmış halde gerçekleşir. STCW A-VIII/2, görsel adaptasyon tamamlanmadan vardiyanın devralınmamasını şart koşar.`,
            `Devreden zabit; geminin mevcut pozisyonu, rotası, hızı, trafiği, planlanan rota değişikliklerini, hava durumunu, makine/seyir cihazı durumunu ve Kaptan'ın özel talimatlarını devralan zabite eksiksiz aktarır. Devralan, her bilgiyi kendi gözlemiyle teyit eder.`,
          ],
        },
        {
          subheading: "5.2 Handover checklist ve devir kriterleri",
          paragraphs: [
            `Devir, kritik bir manevra sırasında yapılmaz; manevra tamamlanana kadar ertelenir (STCW A-VIII/2). Devralan zabit, geminin durumundan emin olmadan vardiyayı kabul etmez. Devir tamamlandığında her iki zabit logbook'a kayıt düşer.`,
          ],
          bullets: [
            `Pozisyon, rota (gyro/magnetic), hız teyit edildi mi?`,
            `Çevredeki tüm trafik ve CPA/TCPA durumu gözden geçirildi mi?`,
            `Standing/Night Orders okundu ve imzalandı mı?`,
            `Cihaz durumları (radar, ECDIS, GPS, autopilot, steering) normal mi?`,
            `Bir sonraki waypoint, course alteration ve no-go area bilgisi alındı mı?`,
            `Gece görüş adaptasyonu tamamlandı mı?`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Manevra sırasında devir yasak",
              text: `Çatışmayı önleme manevrası, dar suyolu geçişi veya kritik rota değişikliği sırasında vardiya devredilemez. Devralan zabit, gemi güvenli durumda olana kadar bekler. Bu kural göz ardı edilirse durumsal farkındalık kaybı oluşur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Logbook ve Seyir Kayıtları",
      sections: [
        {
          subheading: "6.1 Bridge logbook girdileri",
          paragraphs: [
            `Dördüncü Zabit, vardiyası boyunca düzenli olarak deck logbook'a kayıt düşer: saat başı pozisyon, rota, hız, rüzgar/deniz durumu, barometre, hava sıcaklığı, görüş mesafesi ve önemli olaylar. Rota değişiklikleri (course alteration), önemli trafik geçişleri ve Kaptan'ın çağrılması mutlaka kayıt altına alınır.`,
            `Kayıtlar okunaklı, mürekkeple, silinti/karalama yapılmadan tutulur. Yanlış kayıt tek çizgiyle çizilir, doğrusu yanına yazılır ve paraflanır. Logbook, kaza soruşturmalarında ve PSC denetimlerinde hukuki delil niteliği taşır; bu nedenle eksiksiz ve dürüst olmalıdır.`,
          ],
          table: {
            caption: `Tipik Vardiya Logbook Kayıt Sıklığı`,
            headers: ["Kayıt türü", "Açık deniz", "Kıyı/dar su"],
            rows: [
              ["Pozisyon fix", "Saat başı / 30 dk", "6-12 dk / sürekli"],
              ["Hava gözlemi", "Saat başı", "Saat başı"],
              ["Course alteration", "Her değişimde", "Her değişimde"],
              ["Compass error", "En az vardiyada 1", "Fırsat buldukça"],
              ["Trafik/özel olay", "Olduğunda", "Olduğunda"],
            ],
          },
        },
        {
          subheading: "6.2 Compass error gözlemi",
          paragraphs: [
            `Vardiya başına en az bir kez gyro ve magnetic compass error gözlenir. Azimuth (gök cisminin kerterizi) veya transit (iki sabit nokta hattı) yöntemiyle gyro error bulunur; magnetic compass için deviation kartı ve variation kullanılarak hata hesaplanır. Sonuçlar compass error book'a ve logbook'a yazılır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Kritik Durum Yönetimi ve Üst Zabiti Çağırma",
      sections: [
        {
          subheading: "7.1 Çağırma kriterleri",
          paragraphs: [
            `Dördüncü Zabit, aşağıdaki durumlarda tereddüt etmeden Kaptan veya Birinci Zabit'i çağırır: yakın mesafe geçiş riski, sınırlı görüşe giriş, yoğun trafik, rota üzerinde beklenmeyen tehlike, seyir cihazı arızası, hava bozulması, çatışmayı önleme tedbirinden emin olamama. Çağırırken aynı anda gerekli manevrayı başlatmaktan da çekinmez.`,
            `Çağırma, üst zabitin gelmesini beklemek için manevranın ertelenmesi anlamına gelmez. COLREG yükümlülükleri zabit gelene kadar askıya alınmaz; Dördüncü Zabit gerekli emniyet tedbirini hemen alır, ardından durumu rapor eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Çağır ama bekleme",
              text: `Çatışma riski varsa: hem Kaptan'ı çağır, hem de gerekli manevrayı derhal başlat. İkisi birbirinin alternatifi değildir. Üst zabitin gelişini beklerken gemiyi tehlikeye atmak en ağır vardiya hatasıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Acil durumlarda ilk müdahale",
          paragraphs: [
            `Man overboard, makine arızası, dümen arızası, yangın alarmı veya çatışma anında Dördüncü Zabit ilk müdahaleyi yapar: alarm verir, Kaptan'ı çağırır, gerekli emergency manoeuvre'ı (Williamson turn vb.) başlatır, pozisyonu işaretler ve emergency log tutar. STCW'nin gerektirdiği emergency response refleksleri bu vardiyalarda pekişir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Gece Vardiyasının Özel Zorlukları",
      sections: [
        {
          subheading: "8.1 Yorgunluk ve dikkat yönetimi",
          paragraphs: [
            `00-04 vardiyası (graveyard watch), insan sirkadiyen ritminin en düşük olduğu dilimdir; mikro-uyku (microsleep) ve dikkat kaybı riski en yüksektir. MLC 2006 ve STCW dinlenme saatleri (24 saatte min. 10, 7 günde min. 77 saat) bu riski azaltmak için zorunludur. Dördüncü Zabit, vardiyaya dinlenmiş gelmekle yükümlüdür.`,
            `Dikkat yönetimi için: ayakta dolaşma, periyodik ekran taraması, gözcü ile iletişim, sıcak içecek ve köprüüstü aydınlatmasının kısık tutulması uygulanır. BNWAS (Bridge Navigational Watch Alarm System) zorunludur ve uygun dwell time'a ayarlanır; zabit hareketsiz kalırsa alarm verir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/19 — BNWAS",
              text: `Bridge Navigational Watch Alarm System, vardiya zabitinin ehliyetsiz hale gelmesi (uyku, sağlık) durumunda kademeli olarak önce zabiti, sonra Kaptan'ı ve diğer zabitleri uyaran zorunlu sistemdir. Asla devre dışı bırakılmaz.`,
            },
          ],
        },
        {
          subheading: "8.2 Gece görüşü ve fener tanıma",
          paragraphs: [
            `Gece, gemilerin tipi ve manevra durumu sadece seyir fenerlerinden anlaşılır. Dördüncü Zabit; masthead, sidelight (kırmızı/yeşil), sternlight, towing, NUC (not under command), RAM (restricted in ability to manoeuvre), fishing ve pilot vessel fener kombinasyonlarını ezbere bilir. Yanlış fener okuma, yanlış COLREG kararına yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "9.1 Dördüncü Zabit vardiya kontrol listesi",
          bullets: [
            `Standing Orders ve Night Orders okundu ve imzalandı mı?`,
            `Gece görüş adaptasyonu tamamlandı ve handover checklist uygulandı mı?`,
            `Radar/ARPA ayarları ve guard zone aktif mi?`,
            `ECDIS safety contour, XTD ve look-ahead alarmları doğru ayarda mı?`,
            `Pozisyon en az iki bağımsız yöntemle doğrulandı mı?`,
            `Tüm hedeflerin CPA/TCPA değerleri izleniyor mu?`,
            `Compass error vardiyada en az bir kez alındı mı?`,
            `Logbook girdileri eksiksiz ve okunaklı mı?`,
            `Çağırma kriterleri akılda ve şüphede Kaptan çağrılıyor mu?`,
          ],
          paragraphs: [
            `Dördüncü Zabit için bu vardiyalar, ileride bağımsız OOW olacak zabitin temelini atan en kritik eğitim sahasıdır. Gözetim altında kazanılan disiplin, çağırma cesareti ve çapraz doğrulama alışkanlığı, kariyerin geri kalanında geminin ve mürettebatın emniyetini belirler. İyi bir vardiya, "hiçbir şeyin olmadığı" vardiyadır; bu sessizlik tesadüf değil, sürekli ve titiz bir dikkatin ürünüdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
