import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Köprüüstü vardiyası (04-08 / 16-20)",
  roleSlug: "ikinci-zabit",
  taskIndex: 4,
  estimatedPages: 27,
  intro: `İkinci Zabit'in (Second Officer) klasik vardiya dilimleri 04-08 ve 16-20'dir; bu saatler şafak (dawn) ve alacakaranlık (dusk) geçişlerini kapsadığı için seyir açısından en kritik vardiyalardan biridir. Vardiya zabiti (Officer of the Watch / OOW), kaptanın temsilcisi olarak çatışmayı önleme tüzüğü (COLREG 1972) ve STCW Kod A-VIII/2 çerçevesinde geminin emniyetli seyrinden bağımsız biçimde sorumludur. Bu bölüm; gözcülük (lookout), emniyetli hız (safe speed), çatışma riski değerlendirme, radar/ARPA plotting, AIS izleme, pozisyon çapraz kontrolü, kaptanı zamanında çağırma kriterleri ve Bridge Resource Management (BRM) ilkelerini COLREG Kural 5-19 ve STCW gereklilikleriyle adım adım açıklar. Şafak/alacakaranlık vardiyasının özel risklerini, fener/şekil tanımayı ve ses işaretlerini de profesyonel pratiğe dayalı olarak ele alır.`,
  sources: [
    "COLREG 1972 (as amended) — International Regulations for Preventing Collisions at Sea",
    "STCW Code Section A-VIII/2 — Watchkeeping Arrangements and Principles",
    "SOLAS Chapter V, Regulation 24 — Use of Heading and/or Track Control Systems",
    "IMO Resolution A.1106(29) — Revised Guidelines for the Onboard Operational Use of AIS",
    "Bridge Procedures Guide (ICS, 5th Edition)",
    "The Nautical Institute — Bridge Team Management & Watchkeeping",
    "Admiralty NP735 — IALA Maritime Buoyage System",
    "Cockcroft & Lameijer — A Guide to the Collision Avoidance Rules (COLREGs)",
  ],
  chapters: [
    {
      heading: "1. Vardiya Zabitinin Yasal Konumu ve Sorumluluğu",
      lead: `Vardiya zabiti köprüüstünde kaptanın temsilcisidir ve geminin emniyetli seyrinden o vardiya boyunca bağımsız olarak sorumludur. Bu sorumluluk STCW ve COLREG ile yasal zemine oturur.`,
      sections: [
        {
          subheading: "1.1 OOW olarak STCW A-VIII/2 sorumluluğu",
          paragraphs: [
            `STCW Kod A-VIII/2, vardiya zabitinin (OOW) kaptanın temsilcisi olarak geminin emniyetli seyrinden birincil derecede sorumlu olduğunu açıkça belirtir. Zabit, kaptan köprüüstüne çıkıp komutayı resmen devralana kadar vardiyanın tek sorumlusudur; kaptanın varlığı tek başına zabitin sorumluluğunu kaldırmaz, bu devir net biçimde sözlü olarak yapılmalı ve seyir jurnaline işlenmelidir.`,
            `Zabit, COLREG'e tam uyumu sağlamak, emniyetli hızı korumak, sürekli gözcülük tutmak ve şüphe halinde derhal kaptanı çağırmakla yükümlüdür. STCW, "if in any doubt" (herhangi bir şüphe halinde) zabitin tereddütsüz kaptanı çağırması gerektiğini vurgular; geç çağrı, kaza zincirinin en sık görülen halkasıdır.`,
            `Vardiya zabiti aynı anda hem seyir sorumluluğunu hem de gemideki diğer görevleri (GMDSS dinleme, alarm cevaplama) yürütür; ancak hiçbir ek görev, gözcülük ve emniyetli seyir görevinin önüne geçemez. Yorgunluk yönetimi (STCW dinlenme süreleri) bu nedenle vardiya emniyetinin ayrılmaz parçasıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/2 — OOW sorumluluğu",
              text: `Vardiya zabiti, geminin emniyetli seyrinden kaptan adına sorumludur ve gözcülüğün bir an bile kesilmemesini sağlamak zorundadır. Tereddüt halinde kaptanı çağırmamak, denetim ve kaza soruşturmalarında ağır bir kusur sayılır.`,
            },
          ],
        },
        {
          subheading: "1.2 Sole lookout ve tek kişilik vardiya kısıtları",
          paragraphs: [
            `STCW A-VIII/2, gündüz ve uygun koşullarda zabitin tek başına gözcü (sole lookout) olarak vardiya tutmasına izin verebilir; ancak bu, ancak durum tam değerlendirildikten sonra ve geri çekilemez biçimde uygulanır. Görüş azaldığında, gece yaklaşırken, yoğun trafikte veya herhangi bir şüphe doğduğunda zabit derhal ek gözcü (lookout) talep etmelidir.`,
            `04-08 vardiyası şafağı, 16-20 vardiyası alacakaranlığı kapsadığından, bu vardiyalarda sole lookout düzeni ışık koşulu değiştikçe yeniden değerlendirilmelidir. Karanlığa geçişte zabitin tek başına hem dümeni izleyip hem gözcülük yapması yetersiz kalabilir; bu nedenle gece başlamadan gözcü çağrılması iyi denizcilik uygulamasıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sole lookout geri çekilebilir bir düzendir",
              text: `Görüş bozulduğu, trafik arttığı veya gece başladığı anda sole lookout düzeni derhal sonlandırılıp ek gözcü çağrılmalıdır. Bu kararı geciktirmek, çatışma riski değerlendirmesini imkânsız hale getirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. COLREG Kural 5: Gözcülük (Look-out)",
      sections: [
        {
          subheading: "2.1 Görme, işitme ve tüm mevcut araçlarla gözcülük",
          paragraphs: [
            `COLREG Kural 5, her geminin her zaman görme, işitme ve mevcut tüm uygun araçlarla (radar, ARPA, AIS dahil) tam ve sürekli gözcülük tutmasını şart koşar. Gözcülük yalnızca ileriye bakmak değildir; baş, kıç, her iki omuzluk ve gemi etrafının 360 derece taranması, sesli işaretlerin dinlenmesi ve cihaz verilerinin sürekli değerlendirilmesini kapsar.`,
            `Vardiya zabiti, gözcülüğü ekran başında dikkatin dağılmasına izin vermeden yürütmelidir. Çok sayıda kazada, zabitin radar veya ECDIS ekranına gömülüp pencereden dışarı bakmayı ihmal etmesi (single-point fixation) kök neden olarak tespit edilmiştir. İyi gözcülük, dış görsel tarama ile cihaz verisini sürekli karşılaştırmaktır.`,
            `Gece gözcülüğünde köprüüstü aydınlatması kısılır (red night lighting) ve göz karanlığa adapte edilir; bu adaptasyon yaklaşık 20-30 dakika sürer. Beyaz ışığa maruz kalmak adaptasyonu bozar, bu nedenle gece vardiyasında parlak ekran ve aydınlatma kontrolü gözcülüğün doğrudan parçasıdır.`,
          ],
        },
        {
          subheading: "2.2 Ek gözcü, dümenci ve görev paylaşımı",
          paragraphs: [
            `Yoğun trafik, kısıtlı görüş, dar sular ve gece koşullarında zabit ek gözcü (lookout) bulundurur. Gözcü yalnızca gözlem yapar; dümen tutma veya başka görevle meşgul edilmemelidir, aksi halde gözcülük görevi sekteye uğrar. Gözcünün gördüğü her hedefi zabite rapor etmesi (örn. "iki kerteriz sancak baştankara, ışık görülüyor") beklenir.`,
            `Otomatik dümen (autopilot) kullanılırken bile zabit, çatışma riski veya manevra gerektiren durumlarda derhal elle dümene (manual steering) geçilebilmesini sağlamalıdır. SOLAS V/24 ve V/26, manuel kontrole hızlı geçişi ve dümen sistemlerinin düzenli denenmesini şart koşar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — gözcülük eksikliği kaynaklı çarpışmalar",
              text: `Birçok MAIB/TSB raporunda, gece vardiyasında tek başına olan ve ECDIS/telefon ile dikkati dağılan zabitlerin yaklaşan gemiyi hiç fark etmeden çarpıştığı belgelenmiştir. Ortak ders: cihaz, dış görsel gözcülüğün yerine geçmez, onu tamamlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. COLREG Kural 6: Emniyetli Hız (Safe Speed)",
      sections: [
        {
          subheading: "3.1 Emniyetli hızı belirleyen faktörler",
          paragraphs: [
            `COLREG Kural 6, her geminin çatışmayı önlemek ve içinde bulunduğu koşullara uygun mesafede durabilmek için her zaman emniyetli hızda seyretmesini zorunlu kılar. Emniyetli hız sabit bir değer değildir; görüş durumu, trafik yoğunluğu, geminin manevra kabiliyeti, durma mesafesi, gece arka plan ışıkları, rüzgâr/deniz/akıntı ve su derinliği gibi faktörlere göre belirlenir.`,
            `Radar kullanan gemiler için Kural 6 ek faktörler sayar: radarın menzil ve sınırlamaları, seçilen ölçek, deniz/yağmur paraziti (clutter) etkisi, küçük teknelerin/buzun radarda saptanamaması ve radarla tespit edilen hedef sayısı/konumu. Zabit, radara güvenip görüşü düşük koşullarda hızı korumaya devam ederse Kural 6'yı ihlal etmiş olur.`,
          ],
          table: {
            caption: `Emniyetli Hızı Etkileyen Faktörler (COLREG Kural 6)`,
            headers: ["Faktör", "Etki", "Zabitin Aksiyonu"],
            rows: [
              ["Görüş durumu", "Az görüşte risk artar", "Hızı azalt, Kural 19 uygula"],
              ["Trafik yoğunluğu", "Manevra alanı daralır", "Hızı düşür, erken plot et"],
              ["Manevra kabiliyeti", "Durma/dönme mesafesi", "Stopping distance'a göre ayarla"],
              ["Su derinliği", "Squat, kısıtlı manevra", "Sığ suda hızı azalt"],
              ["Arka plan ışıkları", "Fener tanıma zorlaşır", "Hızı düşür, dikkati artır"],
            ],
          },
        },
        {
          subheading: "3.2 Durma mesafesi ve hız azaltımı",
          paragraphs: [
            `Büyük bir geminin durma mesafesi (stopping distance) ve dönüş çapı (turning circle) kilometrelerle ifade edilebilir; bir VLCC tam yoldan durmak için bir milin üzerinde yol alabilir. Emniyetli hız, zabitin bu manevra karakteristiklerini bilerek tehlikeyi gördüğünde zamanında durabileceği veya saptırabileceği bir hız olmalıdır.`,
            `Görüş bozulduğunda Kural 19 gereği hız "as far as is practicable" oranında azaltılır; gerekirse gemi tüm yolunu keser (take all way off). Zabit, hız azaltımı kararını makine dairesiyle koordine eder (stand-by engine talebi) ve seyir jurnaline kaydeder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Manevra karakteristiklerini ezbere bil",
              text: `Wheelhouse poster ve pilot card üzerindeki dönüş çapı, advance, transfer ve durma mesafesi değerleri her vardiya başında gözden geçirilmelidir. Emniyetli hız kararı bu değerlere dayanır; tahmine değil.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kural 7-8: Çatışma Riski ve Önleme Manevrası",
      sections: [
        {
          subheading: "4.1 Kural 7 — çatışma riskinin belirlenmesi",
          paragraphs: [
            `COLREG Kural 7, çatışma riskinin var olup olmadığını belirlemek için mevcut tüm araçların kullanılmasını şart koşar. Temel ilke: bir geminin pusula kerterizi (compass bearing) belirgin biçimde değişmiyorsa çatışma riski vardır kabul edilir. Bu "constant bearing, decreasing range" (CBDR) durumu, çatışmanın klasik göstergesidir.`,
            `Radar varsa, riski erken belirlemek için uzun menzilli tarama (long-range scanning) yapılır ve tespit edilen hedefler sistematik olarak plot edilir veya ARPA ile takip edilir. Kural 7, yetersiz bilgiye, özellikle yetersiz radar bilgisine dayanarak varsayım yapmayı açıkça yasaklar; CPA/TCPA değerleri tek başına değil, eğilim teyit edilerek değerlendirilmelidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Kural 7(d) — CBDR ilkesi",
              text: `Yaklaşan geminin pusula kerterizi belirgin değişmiyorsa çatışma riski mevcuttur. Büyük veya yakın hedeflerde, kerteriz değişse bile risk gözden çıkarılmamalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Kural 8 — çatışmayı önleyici aksiyon",
          paragraphs: [
            `COLREG Kural 8, çatışmayı önleyici manevranın zamanında (in ample time), belirgin (positive) ve iyi denizcilik gözetilerek yapılmasını şart koşar. Manevra, diğer gemiden radar ile bile açıkça görülebilecek kadar büyük olmalıdır; bir dizi küçük rota/hız değişiminden kaçınılır çünkü bunlar karşı geminin durumu yanlış yorumlamasına yol açar.`,
            `Mümkünse rota değişimi (alter course) tercih edilir, çünkü hız değişimine kıyasla radar ve görsel olarak daha belirgindir; ancak yeterli alan varsa hız değişimi de kullanılabilir. Manevra sonrası, geminin tehlikeyi tam geçene kadar güvenli mesafede (passing at a safe distance) olduğu izlenir ve gerekirse ek aksiyon alınır.`,
          ],
          table: {
            caption: `Kural 8 — Etkili Önleme Manevrasının Özellikleri`,
            headers: ["Özellik", "Açıklama", "Kaçınılması Gereken"],
            rows: [
              ["Zamanında", "Ample time, erken", "Son ana bırakmak"],
              ["Belirgin", "Büyük rota/hız değişimi", "Küçük ardışık değişimler"],
              ["İyi denizcilik", "Good seamanship", "Tehlikeli yakınlaşma"],
              ["İzlenebilir", "Etki teyit edilir", "Manevrayı 'fit and forget'"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Radar / ARPA Plotting ve AIS İzleme",
      sections: [
        {
          subheading: "5.1 Sistematik radar plotting ve ARPA",
          paragraphs: [
            `Radar plotting, hedefin gerçek rotasını ve hızını, CPA (Closest Point of Approach) ve TCPA (Time to CPA) değerlerini belirlemek için yapılır. Manuel plotting'de OPRA üçgeni (Own ship, relative motion, Aspect) ile hedefin gerçek hareketi çözülür; ARPA bunu otomatik yapar ancak zabit ARPA verisinin doğruluğunu (tracking stability, target swap riski) sorgulamalıdır.`,
            `ARPA hedefleri en az üç dakika izlendikten sonra güvenilir vektör verir; bu süreden önce vektörlere tam güvenilmez. Zabit, true vector ve relative vector modlarının her birinin ne anlattığını bilmelidir: relative vector CPA'yı gösterir, true vector hedefin gerçek rotasını gösterir. Önleme manevrası sonrası vektörlerin nasıl değiştiği teyit edilir.`,
            `Şirket veya kaptan talimatıyla belirlenmiş minimum CPA değeri (örn. açık denizde 2 mil, kısıtlı suda daha az) ihlal edilecek görünüyorsa zabit erken aksiyon alır. CPA marjı yalnızca sayısal değil, geminin manevra kabiliyeti ve trafik yoğunluğuyla birlikte değerlendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "ARPA target swap ve geç vektör tuzağı",
              text: `İki hedef birbirine çok yaklaştığında ARPA hedefleri karıştırabilir (target swap) ve yanlış CPA/TCPA üretebilir. Vektörlere körü körüne güvenmek yerine ham radar ekranı ve görsel gözlem ile sürekli çapraz kontrol yapılmalıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 AIS izleme ve radar ile çapraz kontrol",
          paragraphs: [
            `AIS (Automatic Identification System), hedefin kimliği, rotası, hızı, draught'ı ve niyetini (destination, navigational status) verir; ancak AIS bir çatışma önleme cihazı değildir. IMO Resolution A.1106(29), AIS verisinin radar/ARPA ile teyit edilmesi gerektiğini ve AIS'in tek başına manevra kararı için kullanılmaması gerektiğini vurgular. Yanlış girilmiş AIS verisi (örn. hatalı ROT, yanlış konum) yanıltıcıdır.`,
            `Zabit, AIS hedefini radar hedefiyle eşleştirir (correlation); AIS ile radar pozisyonu örtüşmüyorsa öncelik radarın gerçek-zamanlı verisindedir. AIS olmayan küçük tekneler, balıkçılar ve radar yansıması zayıf hedefler yalnızca görsel ve radar gözcülüğüyle yakalanabilir; AIS'e güvenip bunları gözden kaçırmak tehlikelidir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IMO A.1106(29) — AIS operasyonel kullanımı",
              text: `AIS, gözcülüğü veya radar/ARPA plotting'i tamamlar, asla onların yerine geçmez. Manevra kararları COLREG ve radar değerlendirmesine dayanmalı, yalnızca AIS verisine değil.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Kural 9-10: Dar Kanallar ve Trafik Ayırım Düzenleri (TSS)",
      sections: [
        {
          subheading: "6.1 Kural 9 — dar kanallar (narrow channels)",
          paragraphs: [
            `COLREG Kural 9, dar bir kanal veya su yolunda seyreden geminin, güvenli ve uygulanabilir olduğu sürece kanalın sancak (starboard) tarafının dış sınırına yakın seyretmesini şart koşar. Boyu 20 metreden küçük gemiler, yelkenliler ve balıkçı tekneleri, ancak kanal içinde seyredebilen bir geminin yolunu engellememelidir.`,
            `Kanal dönüşlerinde, görüşün engelli olduğu (obscured) bölgelerde dikkatle ve Kural 34(e) gereği uzun bir ses işareti (prolonged blast) vererek seyredilir. Dar kanalda demirlemekten kaçınılır. Zabit, kanal içinde geçiş (overtaking) için Kural 9(e) sinyal düzenini ve karşı gemiyle anlaşmayı uygular.`,
          ],
        },
        {
          subheading: "6.2 Kural 10 — Trafik Ayırım Düzenleri (TSS)",
          paragraphs: [
            `COLREG Kural 10, IMO tarafından kabul edilmiş trafik ayırım düzenlerinde (Traffic Separation Scheme) geminin uygun trafik şeridinde, genel trafik akış yönünde seyretmesini ve ayırım hattı/bölgesinden mümkün olduğunca uzak durmasını şart koşar. Şeride giriş/çıkış mümkünse uçlardan, zorunlu yan giriş ise akış yönüne mümkün olan en küçük açıyla yapılır.`,
            `Trafik şeridini kesmek (crossing) zorunluysa, gemi rotasını trafik akış yönüne mümkün olduğunca dik açıyla (as nearly as practicable at right angles) tutarak geçer; bu, kesişme süresini kısaltır ve diğer gemilerin niyeti anlamasını kolaylaştırır. İkinci Zabit, TSS geçişini passage plan'da önceden işaretler ve VTS raporlama gerekliliklerini uygular.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — TSS'de ters yön (rogue) seyir",
              text: `Dover Boğazı gibi yoğun TSS'lerde ters yönde (against traffic flow) seyreden gemiler kovuşturulmuş ve cezalandırılmıştır. Zabit, şerit yönünü ve geçiş açısını passage plan ile teyit etmeli, akışa karşı seyirden kesinlikle kaçınmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Kural 11-18: Manevra Sorumlulukları ve Gemiler Arası Önceliz",
      sections: [
        {
          subheading: "7.1 Karşıdan karşıya, kesişme ve geçme durumları",
          paragraphs: [
            `Kural 13 (overtaking / geçme), bir geminin diğerinin kıç tarafından 22.5 dereceden fazla bir açıyla yaklaşmasını tanımlar; geçen gemi (overtaking vessel) her zaman geçilen gemiden uzak durmakla yükümlüdür ve durum kesişmeye dönüşse bile bu yükümlülük değişmez. Kural 14 (head-on / karşıdan karşıya), iki gücünü makineden alan geminin birbirine yaklaşık karşı rotalarda karşılaşmasında her ikisinin de sancağa dönmesini (alter to starboard) şart koşar.`,
            `Kural 15 (crossing / kesişme), iki makine gücüyle hareket eden gemi kesişirken diğerini sancak tarafında bulunduran geminin yol veren (give-way) gemi olduğunu ve mümkünse karşı geminin baş tarafından geçmekten kaçınmasını belirtir. Yol veren gemi erken ve belirgin manevra yapar; yol hakkı olan gemi (stand-on vessel) Kural 17 gereği rota ve hızını korur.`,
          ],
          table: {
            caption: `COLREG Manevra Durumları Özeti (Kural 13-15)`,
            headers: ["Durum", "Kural", "Yükümlülük", "Manevra"],
            rows: [
              ["Geçme (Overtaking)", "13", "Geçen gemi yol verir", "Uzak dur"],
              ["Karşıdan karşıya (Head-on)", "14", "Her iki gemi", "İkisi de sancağa döner"],
              ["Kesişme (Crossing)", "15", "Sağdaki yol hakkı", "Soldaki yol verir"],
              ["Yol hakkı (Stand-on)", "17", "Rota/hız korunur", "Gerekirse son anda aksiyon"],
            ],
          },
        },
        {
          subheading: "7.2 Kural 17 — yol hakkı gemisinin sorumluluğu ve Kural 18 hiyerarşisi",
          paragraphs: [
            `Kural 17, yol hakkı olan (stand-on) geminin rota ve hızını koruması gerektiğini, ancak yol veren gemi gerekli aksiyonu almıyorsa stand-on geminin de manevra yapabileceğini (Kural 17(a)(ii)) ve çatışma kaçınılmaz hale geldiğinde manevra yapmak zorunda olduğunu (17(b)) belirtir. Stand-on gemi, kesişme durumunda mümkünse kendi sancağına dönmemelidir (yani diğer gemiyi sol tarafında tutan gemiye karşı sancağa dönmez).`,
            `Kural 18, gemiler arası öncelik hiyerarşisini tanımlar: gücünü makineden alan gemi (power-driven), yelkenli, balıkçı, manevra kabiliyeti kısıtlı (RAM), kumanda altında olmayan (NUC) ve draught'ı nedeniyle kısıtlı (CBD) gemiler arasında kimin kime yol vereceğini belirler. Zabit, karşı geminin fenerlerinden/şekillerinden tipini doğru tanıyarak Kural 18 önceliğini uygular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Stand-on gemi 'kör' beklememeli",
              text: `Yol hakkı olmak çarpışmaktan muaf olmak değildir. Yol veren gemi aksiyon almıyorsa, stand-on gemi Kural 17(a)(ii)/17(b) gereği derhal kendi manevrasını yapmalıdır; pasif kalıp çarpışmak ağır kusurdur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Kural 19: Kısıtlı Görüşte Seyir",
      sections: [
        {
          subheading: "8.1 Kısıtlı görüş prosedürü",
          paragraphs: [
            `COLREG Kural 19, kısıtlı görüş (restricted visibility) içinde veya yakınında seyreden gemilere uygulanır; bu durumda geminin emniyetli hızda seyretmesi, makinesini manevraya hazır tutması (engines ready for immediate manoeuvre) ve radar varsa sistematik gözlem yapması gerekir. Kural 19 koşullarında "stand-on / give-way" ayrımı yoktur; her gemi kendi manevra sorumluluğunu taşır.`,
            `Bir gemi yalnızca radarla başka bir geminin varlığını tespit ederse, çatışma riskinin gelişip gelişmediğini belirler. Risk varsa Kural 19(d), bazı manevralardan kaçınmayı şart koşar: önündeki gemiye sancağa dönerek karşılık vermek (geçme hariç) ve travasındaki/kıçındaki bir gemiye doğru dönmekten kaçınılır. Aksiyon erken ve belirgin yapılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Kural 19(b) — emniyetli hız ve hazır makine",
              text: `Kısıtlı görüşte gemi emniyetli hızda seyretmeli ve makinesini derhal manevra yapmaya hazır tutmalıdır. Önündeki travasından gelen sis düdüğü duyulduğunda gemi en aza indirilmiş hıza geçer, gerekirse tüm yolunu keser.`,
            },
          ],
        },
        {
          subheading: "8.2 Kısıtlı görüş ses işaretleri (Kural 35)",
          paragraphs: [
            `Kural 35, kısıtlı görüşte verilecek ses işaretlerini düzenler. Yol alan (making way) makineli bir gemi her iki dakikada bir uzun bir düdük (one prolonged blast) verir; durmuş ama yol almayan (stopped, no way) gemi her iki dakikada bir iki uzun düdük (two prolonged blasts) verir. Manevra kabiliyeti kısıtlı, NUC, RAM, CBD, yelkenli, balıkçı ve çekme yapan gemiler bir uzun + iki kısa düdük (one prolonged + two short) verir.`,
            `Zabit, kısıtlı görüşe girer girmez sis işaretlerini başlatır, navigation light'ları yakar, gözcü çağırır, makineyi stand-by'a alır ve kaptanı bilgilendirir/çağırır. Sis düdüğü otomatik veya manuel verilebilir; otomatik düdük sisteminin doğru aralıkta çalıştığı teyit edilmelidir.`,
          ],
          table: {
            caption: `Kural 35 — Kısıtlı Görüş Ses İşaretleri`,
            headers: ["Durum", "İşaret", "Aralık"],
            rows: [
              ["Makineli, yol alan", "1 uzun düdük", "≤ 2 dk"],
              ["Makineli, durmuş (no way)", "2 uzun düdük", "≤ 2 dk"],
              ["NUC/RAM/CBD/yelkenli/balıkçı/çeken", "1 uzun + 2 kısa", "≤ 2 dk"],
              ["Demirli (>100 m)", "Çan ön taraf + gong arka", "≤ 1 dk"],
            ],
          },
        },
      ],
    },
    {
      heading: "9. Fenerler, Şekiller, Ses İşaretleri ve Şafak/Alacakaranlık Vardiyası",
      sections: [
        {
          subheading: "9.1 Fener ve şekil tanıma (Kural 20-31)",
          paragraphs: [
            `COLREG Kural 20-31, gemilerin gece gösterdiği seyir fenerlerini (navigation lights) ve gündüz gösterdiği şekilleri (shapes) tanımlar. Vardiya zabiti, karşı geminin fenerlerinden tipini, boyutunu, aspect'ini (baş/kıç/travadan görünüm) ve niyetini okuyabilmelidir: yeşil-kırmızı borda fenerleri + direk fenerleri kombinasyonu geminin yönelimini, kırmızı-kırmızı-kırmızı dikey üç fener NUC'u, kırmızı-beyaz-kırmızı RAM'i gösterir.`,
            `Gündüz, bir top/küre (ball) demirli veya NUC, iki koni RAM, silindir CBD ve bir baklava (diamond) çekme yapan gemiyi işaret eder. Zabit, bu şekilleri ve fenerleri tereddütsüz okuyarak Kural 18 önceliğini ve geminin durumunu doğru değerlendirir. Fener menzilleri (range of visibility) Kural 22'de gemi boyuna göre tanımlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Fener kombinasyonlarını refleks haline getir",
              text: `"Red over white, fishing at night; red over red, captain is dead (NUC); white over red, pilot ahead" gibi denizci mnemoniklerle fener tanıma hızlandırılır. Ancak ezber, gerçek COLREG metnindeki açı ve menzil değerleriyle her zaman doğrulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "9.2 Şafak/alacakaranlık (dawn/dusk) vardiyasının özellikleri",
          paragraphs: [
            `04-08 ve 16-20 vardiyaları, ışık koşulunun hızla değiştiği geçiş dönemlerini kapsar. Şafakta zabit fenerleri söndürme zamanını (lights off) ve alacakaranlıkta yakma zamanını (lights on) doğru belirlemelidir; fenerler "from sunset to sunrise" ve görüş kısıtlı her zaman yakılır. Erken söndürmek veya geç yakmak, karşı gemilerin geminin durumunu yanlış değerlendirmesine yol açar.`,
            `Alacakaranlıkta gözlerin karanlığa adaptasyonu henüz tamamlanmadığından küçük hedeflerin tespiti zorlaşır; arka plan ışıkları (shore lights) ile gemi fenerleri karışabilir. Şafakta ise güneşe doğru bakışta hedefler görsel olarak kaybolabilir (sun glare). Bu nedenle dawn/dusk vardiyasında radar ve görsel gözcülük birlikte yoğunlaştırılır ve gece başlamadan/biterken ek gözcü bulundurulur.`,
            `Bu vardiyalarda İkinci Zabit ayrıca seyir yıldızlarının görünür olduğu kısa pencerede (civil/nautical twilight) yıldız gözlemi (celestial fix) yapma fırsatına sahiptir; ufuk ve yıldızların aynı anda görüldüğü bu pencere, astronomik mevki koymanın klasik zamanıdır. Görev önceliği daima emniyetli seyir ve gözcülükte kalır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fener zamanlamasını ihmal etme",
              text: `Gün batımından gün doğumuna kadar ve görüş kısıtlandığında seyir fenerleri yakılmak zorundadır (Kural 20). Alacakaranlıkta fenerleri geç yakmak, çatışma riski değerlendirmesini hem kendiniz hem karşı gemi için bozar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Vardiya Devri, Kaptanı Çağırma ve BRM",
      sections: [
        {
          subheading: "10.1 Vardiya devri (handover) ve kaptanı çağırma kriterleri",
          paragraphs: [
            `Vardiya devri, devralan zabit durumu tam değerlendirip görevi kabul edene kadar tamamlanmaz. Devreden zabit; geminin pozisyonu, rotası, hızı, çevredeki trafik ve plot durumu, passage plan'daki yaklaşan kritik noktalar, kaptanın özel talimatları, hava durumu ve devam eden manevralar hakkında net bilgi verir. Bir manevra sürerken veya gözleri karanlığa adapte olmamış bir zabit devir almaz.`,
            `Kaptanı çağırma kriterleri (calling the master) açık ve tereddütsüz uygulanır: kısıtlı görüşe girmek/yaklaşmak, planlanan CPA'nın sağlanamaması, trafik yoğunluğunun yönetilemez hale gelmesi, beklenmedik tehlike (drifting object, distress signal), cihaz arızası, pozisyondan emin olunamaması, hava bozulması ve "any doubt" durumu. Zabit kaptanı çağırmaktan asla çekinmemeli, çağrı kararını ertelememelidir.`,
          ],
          table: {
            caption: `Kaptanı Çağırma Kriterleri (Standing Orders / STCW)`,
            headers: ["Durum", "Aksiyon", "Gerekçe"],
            rows: [
              ["Kısıtlı görüşe giriş", "Derhal çağır", "Kural 19, hız azaltımı"],
              ["CPA limiti ihlali riski", "Çağır + erken manevra", "Çatışma riski"],
              ["Cihaz arızası (radar/GPS)", "Çağır", "Pozisyon belirsizliği"],
              ["Distress / SAR sinyali", "Derhal çağır", "Yardım yükümlülüğü"],
              ["Herhangi bir şüphe", "Çağır", "STCW 'if in doubt'"],
            ],
          },
        },
        {
          subheading: "10.2 BRM ilkeleri ve hata zincirinin kırılması",
          paragraphs: [
            `Bridge Resource Management (BRM); açık iletişim, görev paylaşımı, çapraz kontrol, durum farkındalığı (situational awareness) ve "speak up / challenge and response" kültürünü içerir. Köprüüstündeki herkes — dümenci, gözcü, junior zabit dahil — bir riski fark ettiğinde dile getirmeli, hiyerarşi bunu engellememelidir. Çatışmaların çoğu, ekipte birinin gördüğü riski paylaşmamasıyla ilerleyen bir hata zincirinden doğar.`,
            `İkinci Zabit, vardiyayı paylaşılan bir mental model üzerinde yürütür: tüm ekip aynı trafik resmini, aynı planı ve aynı manevra niyetini bilir. Yorgunluk, otomasyona aşırı güven (automation complacency) ve dikkat dağınıklığı BRM'in en büyük düşmanlarıdır; zabit bunları aktif olarak yönetir.`,
          ],
        },
      ],
    },
    {
      heading: "11. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "11.1 Vardiya zabiti köprüüstü kontrol listesi",
          bullets: [
            `Vardiya devri tam yapıldı mı, pozisyon/rota/trafik/plan aktarıldı mı?`,
            `Sürekli 360° gözcülük (görsel + radar + işitsel) sağlanıyor mu? (Kural 5)`,
            `Emniyetli hız koşullara göre değerlendirildi mi? (Kural 6)`,
            `Radarda uzun menzilli tarama ve hedefler plot/ARPA ile takip ediliyor mu? (Kural 7)`,
            `CBDR durumundaki hedefler için CPA/TCPA izleniyor, erken aksiyon planlandı mı?`,
            `Önleme manevrası zamanında, belirgin ve iyi denizcilikle mi yapılıyor? (Kural 8)`,
            `TSS/dar kanal kuralları ve passage plan uygulanıyor mu? (Kural 9-10)`,
            `Karşı gemilerin fener/şekilleri doğru tanımlanıp Kural 18 önceliği uygulanıyor mu?`,
            `Kısıtlı görüşte Kural 19 prosedürü ve Kural 35 ses işaretleri devrede mi?`,
            `Şafak/alacakaranlıkta fenerler doğru zamanda yakıldı/söndürüldü mü?`,
            `Pozisyon bağımsız kaynaklarla (radar/visual/PI/echo sounder) çapraz kontrol edildi mi?`,
            `Kaptanı çağırma kriterlerinden biri oluştuğunda tereddütsüz çağrı yapılıyor mu?`,
          ],
          paragraphs: [
            `Köprüüstü vardiyası, gemideki en yüksek sorumluluk taşıyan görevlerden biridir; İkinci Zabit bu vardiyada kaptanın temsilcisi olarak yüzlerce can ve milyonlarca dolarlık yükün emniyetini taşır. COLREG'in lafzına ve ruhuna uymak, emniyetli hızı korumak, sürekli gözcülük tutmak ve "if in doubt" anında kaptanı çağırmak; istatistiklerde tekrar eden çatışma ve karaya oturma kazalarını en başından önleyen disiplinlerdir. Şafak ve alacakaranlık geçişlerinin özel risklerini bilen, cihaza değil değerlendirmeye dayanan ve BRM kültürünü içselleştirmiş bir vardiya zabiti, geminin en güçlü emniyet savunmasıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
