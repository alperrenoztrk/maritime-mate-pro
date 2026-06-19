import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kapalı mekan girişlerinde standby ve kurtarma desteği",
  roleSlug: "ustagemici",
  taskIndex: 7,
  estimatedPages: 26,
  intro: `Usta Gemici (AB), kapalı mekan girişi (enclosed space entry) operasyonlarında genellikle dışarıda standby görevini üstlenir; bu görev, içeri girenden bile kritik olabilir çünkü kurtarmanın ve alarmın anahtarıdır. AB; lifeline (can halatı) tutar, sürekli iletişimi sürdürür, atmosfer ölçüm cihazını kullanmayı bilir ve içerideki kişinin rahatsızlık/çıkış belirtisinde derhal alarm verir. Kurtarma gerekirse, içeri girmeden önce SCBA takarak ve ek personel çağırarak hareket eder — çünkü plansız "kahraman kurtarma" girişimleri, kapalı mekan ölümlerinin büyük kısmında ilk kurbanı kurtarmak yerine ikinci (ve üçüncü) kurbanı yaratmıştır. Bu bölüm; kapalı mekan tehlikelerini, enter permit ve atmosfer testini, standby görevini, iletişim ve lifeline disiplinini, doğru kurtarma protokolünü ve "rescuer becomes victim" vakalarını adım adım açıklar.`,
  sources: [
    "IMO Resolution A.1050(27) — Revised Recommendations for Entering Enclosed Spaces aboard Ships",
    "SOLAS Chapter III Reg. 19 — Enclosed Space Entry and Rescue Drills",
    "SOLAS Chapter XI-1 Reg. 7 — Atmosphere testing instrument for enclosed spaces",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — enclosed spaces",
    "ISGOTT — tanker kapalı mekan/tank giriş güvenliği (uygun gemilerde)",
    "ISM Code — Permit to Work ve risk değerlendirme sistemi",
    "MAIB/TAIB/MARS — enclosed space ölüm vakaları (rescuer fatalities)",
    "OCIMF / P&I Loss Prevention — enclosed space entry rehberleri",
  ],
  chapters: [
    {
      heading: "1. Kapalı Mekan Tehlikesi ve AB'nin Standby Rolü",
      lead: `Kapalı mekanlar denizciliğin en ölümcül rutin tehlikesidir; çoğu ölüm, atmosfer kontrolünün atlanması ve plansız kurtarma girişimi nedeniyledir. AB'nin standby görevi bu zinciri kırar.`,
      sections: [
        {
          subheading: "1.1 Kapalı mekan nedir ve neden ölümcüldür?",
          paragraphs: [
            `Kapalı mekan (enclosed space); sınırlı giriş/çıkışı olan, sürekli havalandırılmayan ve sürekli insan bulunması için tasarlanmamış hacimdir: balast/yakıt/yük tankları, kofferdam, çift dip, zincirlik (chain locker), pump room, boş ambar, atık su tankı, bazı koferdam ve void space'ler. Bu mekanlar oksijen eksikliği, zehirli gaz veya yanıcı gaz içerebilir.`,
            `En tehlikeli yanı, tehlikenin görünmez ve kokusuz olabilmesidir: oksijen seviyesi düşmüş bir tankta kişi birkaç nefeste bilincini kaybedip düşer ve uyarı bile veremez. Pas (oksitlenme), çürüyen organik yük, inert gaz, kaynak gazı ve sintine gazları oksijeni tüketir veya zehirli ortam yaratır. Bu yüzden "havası temiz görünen" bir mekan bile ölümcül olabilir.`,
          ],
          table: {
            caption: `Kapalı Mekan Atmosfer Tehlikeleri`,
            headers: ["Tehlike", "Kaynak (örnek)", "Etki"],
            rows: [
              ["Oksijen eksikliği", "Pas, inert gaz, çürüme", "Bilinç kaybı, ölüm"],
              ["Hidrojen sülfür (H₂S)", "Sintine, atık, bazı yükler", "Zehirlenme, koku duyusu körelir"],
              ["Karbonmonoksit (CO)", "Yanma, egzoz, kaynak", "Zehirlenme"],
              ["Yanıcı gaz (HC)", "Yakıt/yük buharı", "Patlama/yangın"],
              ["Oksijen fazlası", "O₂ kaçağı", "Artmış yangın riski"],
            ],
          },
        },
        {
          subheading: "1.2 AB'nin standby (gözcü) görevinin önemi",
          paragraphs: [
            `Standby (attendant / gözcü), girişin dışında kalan, içerideki kişiyle sürekli iletişimi koruyan, atmosfer ve süreyi izleyen ve acil durumda alarmı veren kişidir. Bu görevin "pasif bekleme" sanılması büyük hatadır; standby, operasyonun en aktif emniyet rolüdür. AB standby görevini bırakamaz, başka işe gidemez ve dikkatini dağıtamaz.`,
            `AB standby olarak; giriş izninin (permit) geçerli olduğunu, atmosfer testinin yapıldığını, havalandırmanın çalıştığını ve içeridekinin durumunu sürekli teyit eder. Herhangi bir belirsizlikte (iletişim kesilmesi, içeridekinin yanıt vermemesi) önce alarmı verir, sonra içeri DALMADAN protokole göre hareket eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO A.1050(27) — kapalı mekan girişi",
              text: `Kapalı mekana giriş; risk değerlendirmesi, atmosfer testi, havalandırma, giriş izni (entry permit) ve dışarıda standby olmadan yapılamaz. Bu önlemler tavsiye değil, ölümleri önleyen bağlayıcı pratiktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Giriş İzni (Entry Permit) ve Atmosfer Testi",
      sections: [
        {
          subheading: "2.1 Permit to Work ve giriş izni",
          paragraphs: [
            `Kapalı mekana giriş, sorumlu zabit (genelde Chief Officer) tarafından onaylanan bir giriş izni (enclosed space entry permit) ile yapılır. İzin; atmosfer testi sonuçlarını, havalandırma durumunu, giriş süresini, görev tanımını, standby ve kurtarma düzenini ve iletişim yöntemini belirtir. İzin süreli ve şart bağlıdır; koşullar değişirse iptal olur.`,
            `AB, izinde kendi rolünü (standby/giren) ve şartları net bilir; izinsiz veya süresi geçmiş izinle girilmez. İzin, "kâğıt formalitesi" değil, tüm önlemlerin alındığının teyididir. Brifing (tool-box talk) yapılır; herkes acil durumda ne yapacağını ezberler.`,
          ],
          bullets: [
            `Giriş yalnızca onaylı, süreli entry permit ile yapılır`,
            `İzin atmosfer, havalandırma, süre, standby ve kurtarma düzenini belirtir`,
            `Koşul değişirse izin iptal olur, yeniden test yapılır`,
            `Tool-box talk ile herkes acil rolünü öğrenir`,
          ],
        },
        {
          subheading: "2.2 Atmosfer testi ve sürekli izleme",
          paragraphs: [
            `Giriş öncesi ve giriş süresince atmosfer; oksijen (%20.9 normal, %19.5 altı tehlikeli, %5'ten düşük O₂ ölümcül), yanıcı gaz (LEL — Lower Explosive Limit, genelde %1 LEL'in altı hedef), zehirli gaz (H₂S, CO ppm) açısından kalibreli çok-gazlı dedektörle ölçülür. Test farklı seviyelerden (üst-orta-alt) yapılır çünkü bazı gazlar tabanda, bazıları tavanda birikir.`,
            `AB, atmosfer ölçüm cihazını (multi-gas detector / personal monitor) kullanmayı, kalibrasyon ve bump-test mantığını ve alarm anlamlarını bilmelidir. Giren personel kişisel monitör taşır; alarm çalarsa derhal çıkar. Standby AB, atmosfer değerlerini izler ve bozulma belirtisinde girişi durdurur. Atmosfer "bir kez ölçülüp unutulan" değil, sürekli izlenen bir parametredir.`,
          ],
          table: {
            caption: `Temel Atmosfer Eşik Değerleri (rehber)`,
            headers: ["Parametre", "Güvenli/Hedef", "Tehlike Eşiği"],
            rows: [
              ["Oksijen (O₂)", "%20.9 (normal)", "%19.5 altı tehlikeli, %5 altı ölümcül"],
              ["Yanıcı gaz (LEL)", "<%1 LEL", "Artan değer → patlama riski"],
              ["Hidrojen sülfür (H₂S)", "0 ppm hedef", "Düşük ppm dahi zehirli"],
              ["Karbonmonoksit (CO)", "0 ppm hedef", "Artan ppm zehirlenme"],
              ["Test noktası", "Üst-orta-alt seviye", "Tek nokta yetersiz"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Standby Görevinin Yürütülmesi",
      sections: [
        {
          subheading: "3.1 İletişim disiplini",
          paragraphs: [
            `Standby AB ile giren kişi arasında sürekli, önceden anlaşılmış iletişim kurulur: telsiz (intrinsically safe / kıvılcımsız tipte), ip işaretleri (lifeline sinyalleri) veya sesli teyit. İletişim belli aralıklarla (örn. her 1-2 dakikada) teyit edilir; içeridekinin yanıt vermemesi acil durum işaretidir. Telsiz patlayıcı ortamda uygun (Ex) sertifikalı olmalıdır.`,
            `AB, iletişimi bir an bile bırakmaz; içeridekiyle kontağı koparmaz, başka işle ilgilenmez ve girişten ayrılmaz. İletişim kesintisi yaşanırsa derhal alarm verilir ve protokol başlatılır. Sessizlik "her şey yolunda" değil, "kontrol edilmeli" anlamına gelir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Lifeline sinyal kodu",
              text: `Telsiz yoksa lifeline (can halatı) ile anlaşılmış çekme kodu kullanılır (örn. 1 çekme: iyiyim; 2: dur; 3: çık; sürekli/çoklu: acil çıkar). Bu kod giriş öncesi brifingte teyit edilir ve her iki taraf ezbere bilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Lifeline ve kurtarma ekipmanının hazır tutulması",
          paragraphs: [
            `Giren kişi, mümkünse harness ile bağlı bir lifeline (can halatı/kurtarma halatı) taşır; standby AB halatı tutar ve gevşemesini/durumunu izler. Girişin dışında kurtarma ekipmanı hazır bekler: yedek SCBA, kurtarma harness'i, tripod/vinçli çıkarma düzeni (gerekiyorsa), resüsitasyon ekipmanı ve ilk yardım. AB bu ekipmanın yerini ve kullanımını bilir.`,
            `Standby AB, içeri girmeye uygun ek personel ve SCBA olmadan tek başına kurtarmaya kalkışmaz; görevi alarmı vermek ve kurtarma ekibini yönlendirmektir. Kurtarma ekipmanı eksikse veya hazır değilse giriş başlatılmaz; bu, izin şartının bir parçasıdır.`,
          ],
          bullets: [
            `Giren kişi harness + lifeline taşır (mümkünse)`,
            `Girişte yedek SCBA, kurtarma harness, çıkarma düzeni hazır`,
            `Resüsitasyon ve ilk yardım ekipmanı erişilebilir`,
            `Standby tek başına dalmaz; alarm verir, ekibi yönlendirir`,
          ],
        },
      ],
    },
    {
      heading: "4. Acil Durum ve Doğru Kurtarma Protokolü",
      lead: `Kapalı mekan kurtarmasının altın kuralı: ÖNCE alarm, SONRA hava (SCBA) ve ek personel. Plansız dalış, kurtarıcıyı ikinci kurban yapar.`,
      sections: [
        {
          subheading: "4.1 'Önce alarm' ilkesi",
          paragraphs: [
            `İçerideki kişi yanıt vermez, düşer veya rahatsızlanırsa standby AB'nin ilk yapacağı içeri atlamak DEĞİL, alarmı vermektir: genel alarm/PA ile kurtarma ekibini çağırır, köprüye/zabite bildirir. Saniyeler önemlidir ama yalnız ve hazırlıksız giriş, bir kişiyi kurtarmak yerine iki kişiyi kaybettirir. Alarm, kurtarma zincirini harekete geçirir.`,
            `Alarm sonrası AB; havalandırmayı artırma, kurtarma ekipmanını hazırlama ve ekibi yönlendirme işlerini yapar. İçeri yalnızca SCBA takmış, lifeline'lı ve dışarıda kendi standby'ı olan eğitimli kurtarıcı girer. Bu sıralama kuralı, gemideki en katı emniyet kurallarından biridir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kahraman kurtarma öldürür",
              text: `Kapalı mekan ölümlerinin büyük kısmında, ilk kurbanı kurtarmaya hazırlıksız atlayan kişi de aynı atmosferde bilincini kaybedip öldü. SCBA ve ek personel olmadan ASLA içeri girilmez; içgüdüsel dalış, ikinci ve üçüncü kurbanı yaratır.`,
            },
          ],
        },
        {
          subheading: "4.2 Kurtarma adımları ve resüsitasyon",
          paragraphs: [
            `Kurtarma ekibi geldiğinde: havalandırma maksimuma alınır, kurtarıcı SCBA takar, dışarıda kendi standby'ı bulunur, lifeline/harness ile bağlanır ve kurbana ulaşır. Kurban, kurtarma harness'i veya tripod/vinçli düzenle dikey/dar açıklıktan dışarı çıkarılır. Çıkarma planı giriş öncesi düşünülmüş olmalıdır; dar manhole'dan baygın bir insanı çıkarmak çok zordur.`,
            `Kurban temiz havaya alındığında derhal ilk yardım/CPR uygulanır, oksijen verilir ve tıbbi yardım (telsiz tıbbi danışma/MEDEVAC) istenir. AB, temel ilk yardım ve CPR'ı bilmelidir. H₂S/CO zehirlenmesinde kurban "iyileşmiş" görünse de gözlem altında tutulur; gecikmeli etkiler olabilir.`,
          ],
          table: {
            caption: `Kurtarma Sıralaması (özet)`,
            headers: ["Adım", "Aksiyon", "Neden"],
            rows: [
              ["1", "ALARM ver, ekibi çağır", "Zinciri başlat, yalnız kalma"],
              ["2", "Havalandırmayı maksimuma al", "Atmosferi iyileştir"],
              ["3", "Kurtarıcı SCBA + lifeline", "Kurtarıcıyı koru"],
              ["4", "Dışarıda standby bulundur", "İkinci kurban olmasın"],
              ["5", "Kurbanı düzenekle çıkar", "Dar açıklıktan güvenli tahliye"],
              ["6", "İlk yardım/CPR + tıbbi yardım", "Hayatta tutma"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Tatbikat, Eğitim ve Hazırlık",
      sections: [
        {
          subheading: "5.1 Enclosed space rescue drill",
          paragraphs: [
            `SOLAS III/19, kapalı mekan giriş ve kurtarma tatbikatlarının düzenli (örneğin iki ayda bir) yapılmasını zorunlu kılar. Bu tatbikatlarda atmosfer testi, izin kullanımı, SCBA giyme, lifeline ile kurban çıkarma ve resüsitasyon canlandırılır. AB, gerçek anda düşünmeden uygulayacak refleksi bu tatbikatlarda kazanır.`,
            `Tatbikatta kurtarma ekipmanının çalıştığı, SCBA tüplerinin dolu olduğu ve çıkarma düzeninin (tripod/vinç) işlediği teyit edilir. Tatbikat sonrası eksikler raporlanır ve giderilir. "Kâğıt üzerinde drill", gerçek acilde işe yaramaz; AB her tatbikatı ciddiye alır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19 — kurtarma tatbikatı",
              text: `Kapalı mekan giriş ve kurtarma tatbikatları yasal olarak düzenli yapılmalıdır; amaç ekipmanı tanımak ve kurtarmayı plansız dalışa dönüşmeden, güvenli ve hızlı yapabilmektir.`,
            },
          ],
        },
        {
          subheading: "5.2 Atmosfer cihazı bakımı ve kalibrasyon",
          paragraphs: [
            `Gaz dedektörleri düzenli kalibrasyon ve günlük bump-test (bilinen gazla hızlı yanıt kontrolü) gerektirir; aksi halde yanlış "güvenli" okuma ölümcül olur. AB cihazı kullanmadan önce şarjını, kalibrasyon tarihini ve fonksiyonunu kontrol eder. SOLAS XI-1/7, gemilerde uygun atmosfer test cihazı bulundurulmasını zorunlu kılar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: kalibresiz cihaz, yanlış güven",
              text: `Kalibrasyonu geçmiş veya arızalı bir gaz dedektörü 'güvenli' okuma verdi; personel girdi ve oksijensiz ortamda bilincini kaybetti. Ders: cihaz kalibrasyonu ve bump-test atlanmaz; ölçüm güvenilir değilse giriş yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "6.1 Atlanmış önlemler ve ölümcül girişler",
          paragraphs: [
            `Kapalı mekan ölümlerinin ortak nedenleri: atmosfer testinin atlanması veya yetersiz yapılması, izinsiz "hızlı" giriş, havalandırmanın yetersizliği, standby görevinin ihmali ve iletişimin kesilmesi. Çoğu vaka, "sadece bir saniye girip çıkacaktım" düşüncesiyle başladı ve ölümle bitti.`,
            `AB, hiçbir gerekçenin (acele, kısa süre, 'havası temiz görünüyor') önlemleri atlamayı haklı kılmadığını bilmelidir. Kapalı mekan kuralları kanla yazılmıştır; her atlanmış adım potansiyel bir ölümdür.`,
          ],
        },
        {
          subheading: "6.2 Rescuer-becomes-victim zinciri",
          paragraphs: [
            `Kapalı mekan kazalarının en trajik örüntüsü, ilk kurbanı kurtarmaya hazırlıksız atlayan kişilerin de ölmesidir; bir vakada bir tankta art arda birkaç kişi, her biri öncekini kurtarmaya çalışırken hayatını kaybetmiştir. Standby AB'nin "önce alarm, SCBA olmadan girme" disiplini bu zinciri kırar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Zinciri kır: önce alarm",
              text: `Bir kişi içeride düştüyse atmosfer ölümcüldür; aynı havaya korumasız giren herkes düşer. İçgüdüyle değil protokolle hareket et: ALARM ver, havalandır, SCBA + lifeline + standby ile gir. Hayat kurtarmak istiyorsan kendini de kurtar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Standby ve kurtarma checklist'i",
          bullets: [
            `Geçerli, süreli giriş izni (entry permit) var mı, rolüm net mi?`,
            `Atmosfer testi (O₂/LEL/zehirli gaz) yapıldı, sürekli izleniyor mu?`,
            `Havalandırma çalışıyor, atmosfer izleme cihazı kalibre mi?`,
            `İletişim yöntemi (Ex telsiz / lifeline kodu) anlaşıldı mı?`,
            `Giren kişi harness + lifeline + kişisel monitör taşıyor mu?`,
            `Girişte yedek SCBA, kurtarma harness ve çıkarma düzeni hazır mı?`,
            `Standby görevini bırakmıyor, iletişimi sürekli teyit ediyor muyum?`,
            `Acil durumda 'önce alarm, sonra SCBA + ekip' protokolünü biliyor muyum?`,
            `CPR/ilk yardım ve tıbbi yardım çağırmayı biliyor muyum?`,
          ],
          paragraphs: [
            `Kapalı mekan standby ve kurtarma desteği, AB'nin üstlenebileceği en hayati görevdir. Dışarıda dikkatle bekleyen, iletişimi koparmayan ve acil anda içgüdüsel dalış yerine protokolü uygulayan bir standby; hem içerideki arkadaşının hem de kendisinin hayatını kurtarır. Bu görevde tek bir ders her şeyi özetler: kapalı mekan affetmez, kahraman kurtarma öldürür; önce alarm, sonra hazırlıkla giriş. Disiplin burada doğrudan hayat demektir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
