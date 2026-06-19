import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil durum komutası ve kriz yönetimi",
  roleSlug: "kaptan",
  taskIndex: 2,
  estimatedPages: 27,
  intro: `Yangın, çatışma, karaya oturma, adam denize düşme (MOB) veya gemiyi terk (abandon ship) durumlarında kaptan komutayı doğrudan alır. Emergency response planını devreye sokar, sınırlı kaynakların tahsisini yapar ve dışarıyla — kıyı devleti, MRCC, şirket ve gerekirse diğer gemilerle — iletişimi yönetir. Drill'lerin gerçekçi ve düzenli yapılmasını sağlar; sonuçları analiz eder ve eksiklikleri kapatır. Bu bölüm, kaptanın kriz anındaki komuta yapısını, karar verme metodolojisini, GMDSS distress haberleşmesini ve her bir acil durum senaryosunun ilk müdahale adımlarını somut prosedürlerle ele alır; çünkü kaptanın karar hızı ve netliği, kriz anında mürettebatın ve geminin hayatta kalmasını doğrudan belirler.`,
  sources: [
    "SOLAS Chapter III — Life-Saving Appliances and Arrangements",
    "SOLAS Chapter II-2 — Fire Protection, Detection and Extinction",
    "SOLAS Chapter IV — Radiocommunications (GMDSS)",
    "COLREG 1972 — International Regulations for Preventing Collisions at Sea",
    "IAMSAR Manual (IMO/ICAO) — Vol. III Mobile Facilities",
    "ISM Code Madde 8 — Emergency Preparedness",
    "LSA Code & FSS Code (Life-Saving Appliance & Fire Safety Systems Codes)",
    "Bridge Procedures Guide (ICS) ve MAIB/NTSB kaza raporları",
  ],
  chapters: [
    {
      heading: "1. Kriz Komutası: Yapı ve Karar Metodolojisi",
      lead: `Acil durumda kaptanın ilk görevi panik değil yapı kurmaktır. Önceden tanımlanmış komuta yapısı, krizde düşünme kapasitesini serbest bırakır.`,
      sections: [
        {
          subheading: "1.1 Emergency komuta yapısı — kim, nerede, ne yapar",
          paragraphs: [
            `Acil durum komuta yapısı tipik olarak üç merkez etrafında kurulur: köprüüstü (command center — kaptan komutada, genel koordinasyon, seyir ve haberleşme), olay yeri (on-scene command — genelde Birinci Zabit, müdahale ekiplerini yönetir) ve makine kontrol odası (Başmühendis — makine, yangın pompası, jeneratör, dümen ve emergency power yönetimi). Kaptan, olay yerine koşan kişi değil; tüm resmi gören, kaynakları yöneten ve dış iletişimi kuran kişidir. Bu ayrım, "kaptanın olay yerinde kaybolması" hatasını önler.`,
            `Müster listesi (muster list — SOLAS III/8), her mürettebat üyesinin acil durumdaki görevini, toplanma yerini, atanan ekipmanını ve alarm sinyallerinin anlamını gösterir. Genel acil durum alarmı yedi veya daha fazla kısa düdük + bir uzun düdük şeklindedir. Kaptan, müster listesinin güncel olduğunu ve her bireyin görevini (yangın ekibi, kurtarma ekibi, ilk yardım, can salı hazırlığı, köprü destek) bildiğini sürekli teyit eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/8 — Muster List",
              text: `Her gemide görünür yerlerde (köprüüstü, makine, mürettebat yaşam mahalleri) müster listesi bulunmalıdır. Liste; genel alarm ve gemiyi terk sinyallerini, her kişinin görevini ve atanan can kurtarma aracını açıkça gösterir.`,
            },
          ],
        },
        {
          subheading: "1.2 Kriz anında karar verme — durum farkındalığından eyleme",
          paragraphs: [
            `Kriz kararları çoğu zaman eksik bilgi ve zaman baskısı altında alınır. Etkili bir yaklaşım, askeri kökenli OODA döngüsüdür (Observe-Orient-Decide-Act) veya denizcilikte yaygın "GRADE" mantığıdır: Gather (bilgi topla), Risk assess (riski değerlendir), Analyse (seçenekleri analiz et), Decide (karar ver), Evaluate (sonucu değerlendir). Kaptan, mükemmel bilgi beklerken donup kalmak yerine, "yeterince iyi" bir kararı erken alıp koşullar değiştikçe günceller; çünkü krizde en pahalı karar, hiç karar verilmemesidir.`,
            `Kaptan, bilişsel tuzaklara (tunnel vision, plan continuation bias, hatalı duruma kilitlenme) karşı uyanık olmalıdır. El Faro vakasında olduğu gibi, ilk planın artık geçerli olmadığı durumda ona yapışmak ölümcüldür. Köprüüstünde "challenge & response" kültürünü krizde de korumak, kaptanın kör noktalarını kapatan en güçlü güvenliktir; bir zabitin "kaptan, bunu yeniden düşünmemiz gerekmez mi?" diyebilmesi krizde hayat kurtarır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İlk 60 saniye disiplini",
              text: `Alarm anında kaptanın ilk refleksi: (1) ne oldu netleştir, (2) genel alarmı çal ve mürettebatı topla, (3) tehlikeyi sınırla (makine durdur/manevra), (4) yardım kanallarını hazırla. Sıralama ezbere bilinmeli; krizde düşünmeye değil, uygulamaya zaman vardır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. GMDSS ve Distress Haberleşmesi",
      lead: `Dış dünyaya doğru, zamanında ve doğru çağrı, kurtarmanın ilk halkasıdır. Kaptan GMDSS prosedürlerini ezbere bilir.`,
      sections: [
        {
          subheading: "2.1 Distress, Urgency, Safety hiyerarşisi",
          paragraphs: [
            `GMDSS (Global Maritime Distress and Safety System), SOLAS Chapter IV ile düzenlenir ve üç öncelik seviyesi tanır: Distress (MAYDAY — gemi veya can ciddi ve yakın tehlike altında, derhal yardım gerek), Urgency (PAN-PAN — gemi veya kişinin güvenliğine dair acil ama hayati olmayan durum, örn. ciddi tıbbi vaka) ve Safety (SECURITE — seyir veya meteorolojik uyarı). Kaptan, durumun gerçek ağırlığına uygun seviyeyi seçer; gereksiz distress kadar, geç verilen distress de tehlikelidir.`,
            `Distress mesajı önce DSC (Digital Selective Calling) ile gönderilir (VHF Ch 70, MF/HF distress frekansları), ardından telsiz/telefonla (VHF Ch 16, MF 2182 kHz) MAYDAY sözlü çağrısı yapılır: MAYDAY x3, gemi adı ve çağrı işareti, pozisyon, tehlikenin doğası, gereken yardım, gemideki kişi sayısı ve diğer bilgiler. Uydu üzerinden (Inmarsat/Iridium) ve gerekirse EPIRB ile çoklu kanal kullanılır. Pozisyonun doğru ve güncel olması kurtarmanın hızını belirler.`,
          ],
          table: {
            caption: `GMDSS Acil Durum Öncelikleri`,
            headers: ["Seviye", "Söz", "Anlam", "Tipik Kanal"],
            rows: [
              ["Distress", "MAYDAY", "Ciddi ve yakın tehlike, derhal yardım", "DSC + VHF16 / MF2182 / EPIRB"],
              ["Urgency", "PAN-PAN", "Acil ama hayati olmayan (örn. tıbbi)", "DSC + VHF16 / MF2182"],
              ["Safety", "SECURITE", "Seyir/meteoroloji uyarısı", "VHF16 → çalışma kanalı"],
            ],
          },
        },
        {
          subheading: "2.2 EPIRB, SART, MRCC ve on-scene koordinasyon",
          paragraphs: [
            `EPIRB (Emergency Position Indicating Radio Beacon), gemi battığında otomatik (hidrostatik release) veya manuel olarak devreye girer; 406 MHz Cospas-Sarsat uydusuna gemi kimliği ve GPS pozisyonunu gönderir. SART (Search and Rescue Transponder) ise can salındaki bir radar transponderidir; arama yapan geminin radar ekranında belirgin nokta dizisi olarak görünür. Kaptan, terk anında EPIRB'in ve SART'ın yanına alınmasını müster prosedürüne yazar.`,
            `Distress aldıktan sonra koordinasyonu MRCC (Maritime Rescue Coordination Centre) üstlenir. MRCC bir OSC (On-Scene Coordinator) atayabilir; bu rolü ilk gelen veya en yetkin gemi üstlenir ve IAMSAR Manual'a göre arama paternini (expanding square, sector search, parallel track) yönetir. Kaptan, hem yardım çağıran hem de başka bir gemiye yardıma giden konumda IAMSAR prosedürlerini bilmek zorundadır; SOLAS V/33 tehlikedeki kişilere yardım yükümlülüğünü hukuki olarak emreder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/33 — Yardım Yükümlülüğü",
              text: `Denizde tehlikede olduğunu öğrenen kaptan, kendi gemisini, mürettebatını veya yolcularını ciddi tehlikeye atmadığı sürece, tam hızla yardıma gitmek zorundadır. Bu, denizciliğin en eski ve bağlayıcı yükümlülüklerinden biridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yangınla Mücadele Komutası",
      sections: [
        {
          subheading: "3.1 İlk müdahale ve sınırlandırma (boundary cooling)",
          paragraphs: [
            `Yangın alarmında kaptanın ilk kararları: yangının yeri ve sınıfı netleştirilir, genel alarm çalınır, müdahale ekibi (genelde Birinci Zabit liderliğinde) donanımla (SCBA, fireman's outfit, hortum) gönderilir, havalandırma ve yangın damperleri kontrol edilir, gemi manevrasıyla rüzgâr yangını körüklemeyecek konuma getirilir (yangın kıç tarafa düşecek şekilde). Boundary cooling (komşu bölmelerin dışından su ile soğutulması) yangının yayılmasını engellemenin temelidir.`,
            `Yangın sınıfına göre söndürücü seçilir: A sınıfı (katı) su; B sınıfı (yağ/yakıt) köpük veya CO2; C sınıfı (gaz) kaynağı kesmek; elektrik yangınları CO2/temiz gaz (enerji kesilerek). Makine dairesi yangınında fixed CO2 veya su sisi sistemi son çare olarak kullanılır; ancak CO2 salımı öncesi mahallin tamamen tahliye edildiği ve sayımın yapıldığı mutlak şekilde teyit edilir. Kaptan bu "tüm personel dışarıda mı?" teyidini bizzat alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sabit CO2 salımı — geri dönüşsüz karar",
              text: `Makine dairesine fixed CO2 salmadan önce TÜM personelin dışarıda olduğu sayımla doğrulanmalı, havalandırma kapatılmalı ve mahal sızdırmaz hale getirilmelidir. CO2 ortamında insan birkaç dakikada ölür. Bu karar kaptana aittir ve geri alınamaz.`,
            },
          ],
        },
        {
          subheading: "3.2 Yangın ekibi yönetimi ve risk dengesi",
          paragraphs: [
            `Kaptan, müdahale ekibinin güvenliğini yangının söndürülmesi kadar önemser. SCBA hava süresi takip edilir (hava kontrol sorumlusu — air control board), ekip çiftler halinde girer, geri çekilme sinyali ve yedek ekip hazır bulunur. Re-ignition (yeniden tutuşma) riskine karşı yangın söndükten sonra da bölge gözlenir ve sıcaklık izlenir. Tek bir kişinin kahramanlık yapması değil, disiplinli ve geri çekilebilir bir müdahale esastır.`,
            `Konteyner gemilerinde güverte üstü yangınlar (özellikle mis-declared DG kaynaklı) çok zorludur; yığınlara erişim sınırlıdır, su yetersiz kalabilir ve yapısal risk vardır. Maersk Honam (2018) gibi vakalar, kaptanın bazen yangını tamamen söndüremeyeceğini, ekibi geri çekip dış yardım (salvage, refakat) beklemenin daha doğru olabileceğini gösterir. Kaptanın görevi, ekibi kaybetme pahasına yangını yenmek değil; insanı korumaktır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Çatışma (Collision) ve Müdahale",
      sections: [
        {
          subheading: "4.1 Çatışma anı ve hemen sonrası",
          paragraphs: [
            `Çatışma kaçınılmaz hale geldiğinde son dakika manevrası (COLREG Rule 8 ve 17) ve makine ile darbenin açısını ve hızını minimize etmek hedeflenir; mümkünse darbe baş bölgeye (en güçlü yapı) alınacak şekilde manevra yapılır. Çatışmadan hemen sonra kaptan: yaralı kontrolü, su alma (flooding) değerlendirmesi, hasar tespiti (damage control), kirlilik riski ve diğer gemiyle iletişimi eş zamanlı yönetir. İki gemi birbirine girmişse, ayrılma kararı flooding'i artırabilir; bu değerlendirme dikkatle yapılır.`,
            `COLREG Rule 19 ve sınırlı görüş hükümleri, çatışmaların büyük kısmının kök nedeninde yer alır. Çatışma sonrası kaptanın hukuki yükümlülükleri vardır: diğer gemiye ve kişilere yardım, gemi adı/liman/varış-kalkış bilgisinin paylaşımı ve olayın kaydı. SOLAS V/33 ve uluslararası teamül, kendi gemisini tehlikeye atmadan diğer gemiye yardım etmeyi emreder.`,
          ],
        },
        {
          subheading: "4.2 Hasar kontrolü ve stabilite",
          paragraphs: [
            `Su alma durumunda kaptan ve Birinci Zabit, damage stability bilgisini (geminin hasarlı stabilite el kitabı, bölme planları) kullanarak hangi bölmelerin su aldığını, geminin batma/devrilme eğilimini ve karşı-su basma (counter-flooding) gerekip gerekmediğini değerlendirir. Su geçirmez kapıların kapatılması, bilge ve balast pompalarının yönetimi ve listing'in kontrolü hayati önemdedir. Progressive flooding (kademeli su yayılması), birçok geminin batmasındaki sessiz katildir.`,
            `Kaptan, geminin kurtarılabilir mi yoksa terk mi edilmeli kararını verirken zamanı doğru okumalıdır: erken terk gereksiz can kaybı yaratabilir, geç terk ölümcül olabilir. "Gemi insanı taşır, insan gemiyi değil" prensibi rehberdir; ancak gemide kalmak bir can salından daima daha güvenliyse (geminin batmadığı sürece kurtarma platformu olması), kaptan bunu da değerlendirir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — collision ve hasar kontrolü",
              text: `Birçok çatışma raporunda (örn. yoğun trafikte ARPA yanlış yorumu, AIS'e aşırı güven), kaza sonrası hızlı bölme kapatma ve doğru pompa yönetiminin gemiyi kurtardığı görülür. Ders: damage control planının ezberlenmesi ve drill'lerle pekiştirilmesi, çatışma sonrası ilk 30 dakikada belirleyicidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Karaya Oturma (Grounding)",
      sections: [
        {
          subheading: "5.1 İlk değerlendirme ve aceleci re-floating tuzağı",
          paragraphs: [
            `Karaya oturma anında ilk refleks makineyi geri vererek kurtulmaya çalışmak olabilir; bu çoğu zaman hatadır. Kaptan önce durumu değerlendirir: gemi nerede oturdu (baş, kıç, full length), zemin türü (kum, çamur, kaya), tekne bütünlüğü, su alma, gel-git durumu ve çevresel risk. Apar topar geri vermek, hasarlı bölgeyi yırtarak su almayı ve kirliliği katlayabilir; ayrıca derin suya kayan hasarlı gemi batabilir.`,
            `Kaptan; tank ve bölme soundinglerini aldırır (su alma tespiti), draft okumalarını karşılaştırır, gel-git tablolarına göre yüksek su penceresini hesaplar ve gerekirse re-floating planını salvage/sınıf danışmanlığı ile hazırlar. Kirlilik riski varsa SOPEP devreye sokulur ve otoriteler bilgilendirilir. Acele kararlar yerine kontrollü ve hesaplı bir kurtarma planı, hem gemiyi hem çevreyi korur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aceleci re-floating",
              text: `Karaya oturan gemiyi hasar değerlendirmesi yapmadan makineyle çekmeye çalışmak, hasarlı sac levhayı tamamen yırtabilir, su almayı ve petrol kirliliğini patlatabilir. Önce sounding, draft ve gel-git; sonra plan. Çoğu durumda beklemek, panikle hareket etmekten güvenlidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Kirlilik, çevre ve hukuki süreç",
          paragraphs: [
            `Karaya oturmalar büyük çevre felaketlerine dönüşebilir (Exxon Valdez 1989, Wakashio 2020). Kaptan, yakıt tanklarının durumunu önceliklendirir; gerekirse iç transfer (yükü/yakıtı sağlam tanklara alma) ile kirlilik riskini azaltır. SOPEP/SMPEP planı, ilk müdahale ekipmanını ve bildirim listesini içerir. Liman/kıyı devleti, sınıf ve P&I kulübü hızla bilgilendirilir; surveyor atanır.`,
            `Kaptan, olayın tüm zaman çizelgesini (log, ECDIS replay, gözcü ifadeleri) korur ve resmi deniz protestosu (sea protest) için hazırlık yapar. Wakashio vakasının dersi nettir: passage plan'dan kişisel motivasyonlarla (kıyıya yaklaşma) sapmak büyük kazaların tetikleyicisidir. Kriz yönetimi sadece olay anını değil, olay sonrası kayıt ve hukuki süreci de kapsar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Adam Denize Düştü (Man Overboard) ve Kurtarma",
      sections: [
        {
          subheading: "6.1 MOB manevraları ve ilk dakikalar",
          paragraphs: [
            `MOB anında ilk eylemler: "MAN OVERBOARD" bağırılır, can simidi (ışıklı/dumanlı) düşen tarafa atılır, MOB butonuna basılır (GPS pozisyon işaretleme), dümen düşen tarafa basılır (pervaneyi kişiden uzaklaştırmak için), bir gözcü sürekli kişiyi gözler ve hiç gözden kaçırmaz. Kaptan köprüüstüne çağrılır ve uygun dönüş manevrasını seçer: Williamson turn (kişi gözden kayboldu, aynı izi takip), Anderson turn (kişi görünür, en hızlı dönüş), veya Scharnow turn.`,
            `Kurtarma botu/rescue boat hazırlanır, MOB drill'inde provası yapılmış prosedürle indirilir. Su sıcaklığı kritik faktördür: soğuk suda hipotermi dakikalar içinde başlar, bu yüzden hız hayatidir. Kaptan, kurtarma ekibinin kendi güvenliğini de gözetir; ek kayıp yaratmamak için rescue boat ekibi can yeleği/gerekli donanımla görevlendirilir.`,
          ],
          table: {
            caption: `MOB Dönüş Manevraları`,
            headers: ["Manevra", "Ne zaman", "Özellik"],
            rows: [
              ["Williamson Turn", "Kişi gözden kayboldu", "Eski izi geri takip eder, güvenilir"],
              ["Anderson Turn", "Kişi görünür, tek pervane", "En hızlı, manevra kabiliyeti yüksek gemi"],
              ["Scharnow Turn", "Düşme anı geç fark edildi", "Yakıt/yol tasarrufu, başlangıç noktasına döner"],
            ],
          },
        },
        {
          subheading: "6.2 Tıbbi müdahale ve dış destek",
          paragraphs: [
            `Kurtarılan kişiye hipotermi ve boğulma protokolüne göre müdahale edilir; gemideki sağlık ekipmanı ve ilk yardım yetkin personel devreye girer. Ciddi vakalarda telemedicine (örn. TMAS — Telemedical Maritime Assistance Service) ile kıyı hekimine danışılır ve gerekirse MEDEVAC (helikopterle tahliye) MRCC üzerinden talep edilir. Kaptan, bu zinciri (PAN-PAN urgency çağrısı dahil) hızla işletir.`,
            `MOB olayları çoğu zaman güverte çalışması, deniz tutulması veya emniyet kemeri kullanılmaması gibi önlenebilir nedenlerden doğar. Kaptan, kriz sonrası kök nedeni inceleyerek (overboard work permit, harness kullanımı, korkuluk bakımı) tekrarı önler; kurtarma kadar önleme de kriz yönetiminin parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Gemiyi Terk (Abandon Ship)",
      sections: [
        {
          subheading: "7.1 Terk kararı — en zor karar",
          paragraphs: [
            `Gemiyi terk, kaptanın verebileceği en ağır karardır ve son çaredir. "Gemi seni daha fazla taşıyamaz hale geldiğinde gemiyi terk et" prensibi gereği, geminin yüzdüğü her an bir can salından daha güvenli bir platformdur. Kaptan, terk kararını ne çok erken (kurtarılabilir gemiyi terk etmek) ne de çok geç (batış anında düzensiz tahliye) vermelidir. Karar verildiğinde gemiyi terk sinyali çalınır ve mürettebat müster istasyonlarına can yeleği/immersion suit ile toplanır.`,
            `Tahliye, müster listesine göre düzenli yürür: can salları/botlar hazırlanır ve indirilir, EPIRB ve SART alınır, gerekli belgeler ve su/erzak yüklenir, sayım yapılır. Kaptan en son terk eder ve mürettebatın tam olarak hesaplandığını teyit eder. Soğuk su, gece ve kötü hava tahliyeyi katlanarak zorlaştırır; bu yüzden ekipman tanıdık ve drill'lerle prova edilmiş olmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III & LSA Code — Can Kurtarma Donanımı",
              text: `Can yelekleri, immersion suit'ler, can salları/botları, davitler ve serbest düşme botları LSA Code standardındadır. SOLAS III, bunların sayısını, yerleşimini, indirme sürelerini ve düzenli bakım/testlerini şart koşar. Drill'ler bu ekipmanın gerçek kullanımını test etmelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Sudaki hayatta kalma",
          paragraphs: [
            `Can salına/bota geçtikten sonra hayatta kalma yönetimi başlar: kişi sayımı, ısı korunması (sallar birbirine bağlanır, açıklıklar kapatılır), su ve erzak rasyonlaması, hidrasyon (deniz suyu içilmez), seasickness yönetimi ve moral. Kaptan veya kıdemli zabit, salda da liderliği sürdürür; rota ve görünürlük (fişek, SART, ayna) yönetilir. Soğuk en büyük tehdittir; hipotermi, boğulmadan daha çok can alır.`,
            `Kurtarma gelene kadar düzen ve umut korunmalıdır. Kaptan, drill'lerde bu psikolojik boyutu (panik yönetimi, görev dağılımı) da çalıştırır; çünkü kriz anında insanların nasıl davranacağı, ekipman kadar belirleyicidir. İyi prova edilmiş bir mürettebat, kötü koşullarda bile düzenli kalır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Drill, Tatbikat ve Sürekli Hazırlık",
      sections: [
        {
          subheading: "8.1 Drill frekansları ve gerçekçilik",
          paragraphs: [
            `SOLAS III/19, fire ve abandon ship drill'lerini her ay (yolcu gemilerinde haftalık), enclosed space entry/rescue drill'i en az 2 ayda bir zorunlu kılar. Bunlara ek olarak şirket SMS'i; MOB, kirlilik (SOPEP), grounding, blackout, steering failure, helikopter operasyonu ve güvenlik drill'lerini planlar. Kaptan, drill takvimini sefer programına uydurur ve hiçbir drill'in "kağıt üzerinde" geçiştirilmemesini sağlar.`,
            `Gerçekçi bir drill; beklenmedik bir senaryo (örn. "bu çıkış kapalı, alternatif bul"), sürelerin ölçümü, gerçek ekipman kullanımı ve sonrasında debrief içerir. Drill kayıtlarına "iyi giden / iyileştirilecek" notları yazılır ve eksiklikler düzeltici aksiyona dönüşür. Kötü drill, sahte bir güven yaratır ki bu, hiç drill yapmamaktan daha tehlikelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Senaryo zenginleştirme",
              text: `Aynı drill'i her ay tekrarlamak ezber yaratır. Kaptan değişken eklemelidir: gece, kötü hava simülasyonu, bir liderin "yaralı" sayılması, bir ekipmanın "arızalı" olması. Amaç, ekibin düşünerek adapte olmasını sağlamaktır.`,
            },
          ],
        },
        {
          subheading: "8.2 Şirket ve kıyıyla iletişim — kriz iletişim planı",
          paragraphs: [
            `Krizde kaptan, içeride komutayı sürdürürken dışarıda doğru ve zamanında iletişimi yönetmelidir. Şirketin Emergency Response Team (ERT) devreye girer; kaptan DPA/CSO ve şirket kriz hattı ile koordine olur. İletişim akışı önceden tanımlıdır: kim arar, ne bilgi verilir, medya ile kim konuşur (genelde kaptan değil, şirket). Erken, dürüst ve düzenli bilgi akışı, dış desteği hızlandırır ve yanlış bilgiyi engeller.`,
            `Kaptan, kriz boyunca bir olay günlüğü (incident log) tutar: zaman damgalı kararlar, mesajlar, durum değişimleri. Bu kayıt hem operasyonel koordinasyonu kolaylaştırır hem de sonrasındaki soruşturma, sigorta ve hukuki süreçler için kritik kanıttır. Hafıza krizde güvenilmezdir; yazılı kayıt güvenilirdir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Olay Sonrası Yönetim",
      sections: [
        {
          subheading: "9.1 Tıbbi, psikolojik ve insan boyutu",
          paragraphs: [
            `Kriz atlatıldıktan sonra mürettebatın fiziksel ve psikolojik bakımı önceliklendirilir. Yaralılar tedavi edilir, ihtiyaç halinde MEDEVAC düzenlenir. Travmatik olay sonrası stres (mürettebat kaybı, can tehlikesi yaşamak) ciddi etkiler bırakabilir; kaptan, debriefing ve gerekirse profesyonel destek (psikolojik ilk yardım, kıyıda danışmanlık) ayarlar. İnsan, krizin merkezindedir ve olay bittikten sonra da öyle kalır.`,
            `Kaptan, mürettebatın dinlenme ve toparlanma ihtiyacını (MLC rest hours dahil) gözetir. Kriz sonrası tükenmiş bir ekiple normal operasyona dönmek yeni hatalara davetiyedir; gerekirse takviye personel veya liman desteği talep edilir.`,
          ],
        },
        {
          subheading: "9.2 Soruşturma, kayıt ve öğrenilen dersler",
          paragraphs: [
            `Olay, ISM madde 9 kapsamında raporlanır ve kök neden analizi yapılır. VDR (Voyage Data Recorder) verisi korunur (üzerine yazılmaması için kayıt durdurulur/yedeklenir), log'lar, ECDIS replay ve ifadeler arşivlenir. Kaptan, bayrak devleti kaza soruşturmasına (Casualty Investigation Code), P&I/H&M sürecine ve gerekirse adli sürece dürüst ve eksiksiz bilgi sağlar.`,
            `Her ciddi olay, filo için bir öğrenme fırsatıdır. Düzeltici aksiyonlar yalnızca o gemide değil, şirket genelinde uygulanır. Modern emniyet kültürü, "kimi suçlayalım" değil "sistemi nasıl güçlendiririz" sorusuna odaklanır. Kaptanın olay sonrası dürüstlüğü, gelecekteki kazaların önlenmesinin temelidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — El Faro (2015)",
              text: `Kasırga rotasında ısrar, 33 ölüm. NTSB raporu kaptanın situational awareness kaybını, junior zabitlerin endişelerini açıkça dile getirememesini (zayıf challenge kültürü) ve eski hava verisine güveni başlıca neden gösterdi. Ders: kriz yönetimi, alarm anından önce köprüüstü kültüründe başlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın acil durum hazırlık ve müdahale checklist'i",
          bullets: [
            `Müster listesi güncel mi, her kişi görevini ve alarm sinyallerini biliyor mu?`,
            `Emergency/contingency manual erişilebilir ve kaptan tarafından biliniyor mu?`,
            `Komuta yapısı (köprü/olay yeri/makine) net tanımlı mı?`,
            `GMDSS ekipmanı test edildi mi; DSC, EPIRB, SART, VHF/MF/HF çalışıyor mu?`,
            `Distress/Urgency/Safety prosedürleri ve MAYDAY mesaj formatı ezbere biliniyor mu?`,
            `Fire ve abandon ship drill (aylık), enclosed space drill (2 aylık) güncel ve gerçekçi mi?`,
            `Fixed CO2 salım prosedürü (sayım/havalandırma kapatma teyidi) net mi?`,
            `Damage control / stabilite el kitabı ve bölme planları hazır mı?`,
            `MOB manevraları (Williamson/Anderson/Scharnow) ve rescue boat hazır mı?`,
            `Can kurtarma donanımı (LSA) sayıca tam, bakımlı ve indirilebilir mi?`,
            `SOPEP/SMPEP ve bildirim listesi (MRCC, kıyı devleti, şirket, P&I) güncel mi?`,
            `Kriz iletişim planı ve incident log disiplini hazır mı; VDR koruma prosedürü biliniyor mu?`,
            `Yeni personel 24 saat içinde brifing aldı, immersion suit/can yeleği bedenleri uygun mu?`,
          ],
          paragraphs: [
            `Acil durum komutası, kaptanlığın en saf sınavıdır: belirsizlik, zaman baskısı ve insan hayatının terazide olduğu anda doğru karar verebilmek. Bu yetenek doğuştan değil; iyi prova edilmiş drill'lerden, ezberlenmiş prosedürlerden, sağlam bir komuta yapısından ve "challenge"a açık bir köprüüstü kültüründen gelir. Kriz anında kaptan, gemideki en sakin, en hazırlıklı ve en net düşünen insan olmak zorundadır; çünkü herkes o anda kaptana bakar. En iyi kriz yönetimi ise çoğu zaman, krizi henüz başlamadan önleyen hazırlıktır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
