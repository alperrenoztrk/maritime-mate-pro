import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Seyir cihazları bakım ve kalibrasyon takibi",
  roleSlug: "ikinci-zabit",
  taskIndex: 5,
  estimatedPages: 25,
  intro: `İkinci Zabit (Second Officer / Navigation Officer), köprüüstü seyir cihazlarının bakım, test ve kalibrasyon kayıtlarının düzenli tutulmasından sorumludur. Gyro compass error ve magnetic compass deviation takibi, speed log kalibrasyonu, echo sounder kontrolleri, radar performance monitor ile RACON/SART testleri ve ECDIS/AIS/VDR'ın düzgün çalıştığının doğrulanması bu görevin temelini oluşturur. Bu bölüm; SOLAS Chapter V'in seyir donanımı gerekliliklerini, IMO performans standartlarını ve günlük/haftalık/seferlik kontrol rutinlerini adım adım açıklar. Amaç, pozisyon ve manevra kararlarının güvenilir cihaz verilerine dayanmasını ve PSC denetiminde eksiksiz kayıt sunulmasını güvence altına almaktır.`,
  sources: [
    "SOLAS Chapter V, Regulation 19 — Carriage Requirements for Shipborne Navigational Systems and Equipment",
    "SOLAS Chapter V, Regulation 18 — Approval, Surveys and Performance Standards",
    "IMO Resolution A.424(XI) — Performance Standards for Gyro-Compasses",
    "IMO Resolution MSC.191(79) — Presentation of Navigation-Related Information",
    "IMO Resolution A.694(17) / IEC 60945 — General Requirements for Shipborne Equipment",
    "IMO Resolution MSC.333(90) — Performance Standards for VDR",
    "IMO Resolution A.1106(29) — Revised Guidelines for AIS",
    "Bridge Procedures Guide (ICS, 5th Edition)",
  ],
  chapters: [
    {
      heading: "1. Seyir Donanımı Sorumluluğunun Yasal Çerçevesi",
      lead: `Seyir cihazlarının çalışır ve doğru olduğunun güvence altına alınması bir konfor değil, SOLAS gereği zorunlu bir emniyet görevidir. Hatalı bir cihaz, doğru sanılan yanlış bir pozisyona yol açar.`,
      sections: [
        {
          subheading: "1.1 SOLAS V/19 ve taşıma gereklilikleri",
          paragraphs: [
            `SOLAS Chapter V Regulation 19, gemi tonajına ve sefer bölgesine göre bulundurulması zorunlu seyir cihazlarını (gyro compass, magnetic compass, radar/ARPA, ECDIS, AIS, echo sounder, speed/distance log, GNSS, BNWAS, VDR) listeler. İkinci Zabit, bu donanımın yalnızca mevcut değil, performans standartlarını karşılayacak şekilde çalışır durumda olduğunu izler.`,
            `Donanımın bakımı genelde elektro-teknik personel (ETO) veya servis firmasıyla yürütülse de operasyonel doğruluk takibi (error, deviation, kalibrasyon kayıtları) köprüüstünde İkinci Zabit'in sorumluluğundadır. Kayıtlar PSC ve flag state denetiminde ilk istenen belgeler arasındadır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/19 — Çalışır durumda olma şartı",
              text: `Zorunlu seyir cihazının arızalı veya kalibre edilmemiş olması PSC denetiminde non-conformity sayılır. Arıza tespitinde derhal kayıt açılmalı, alternatif yöntem devreye alınmalı ve kaptan bilgilendirilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Performans standartları ve onay",
          paragraphs: [
            `Her cihaz tipi için IMO bir performans standardı (Resolution) yayımlar; örneğin gyro compass için A.424(XI), VDR için MSC.333(90). Cihazlar bu standartlara uygun tip-onaylı (type approved) ve "wheelmark" işaretli olmalıdır. İkinci Zabit, cihaz onay sertifikalarının ve kalibrasyon belgelerinin gemide bulunduğunu doğrular.`,
            `IEC 60945 (A.694(17)), tüm köprüüstü cihazlarının çevresel ve EMC dayanıklılık şartlarını belirler. Servis sonrası cihazların yeniden test edilip kayda geçmesi, izlenebilir bir bakım zincirinin parçasıdır.`,
          ],
          table: {
            caption: `Temel Seyir Cihazları ve İlgili Performans Standardı`,
            headers: ["Cihaz", "IMO Standardı", "Kritik Kontrol"],
            rows: [
              ["Gyro Compass", "A.424(XI)", "Gyro error, settling time"],
              ["Magnetic Compass", "A.382(X)", "Deviation card, sıvı/kabarcık"],
              ["Radar / ARPA", "MSC.192(79)", "Performance monitor, hedef edinme"],
              ["ECDIS", "MSC.232(82)", "ENC güncelliği, safety settings"],
              ["AIS", "A.1106(29)", "Statik/dinamik veri doğruluğu"],
              ["VDR", "MSC.333(90)", "APT, kayıt kanalları, batarya"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Gyro Compass Error Takibi",
      sections: [
        {
          subheading: "2.1 Gyro error nedir, nasıl tespit edilir",
          paragraphs: [
            `Gyro compass, gerçek kuzeyi (true north) gösterecek şekilde tasarlanır; ancak küçük bir sapma (gyro error) her zaman olabilir. Error, "high" (gösterge gerçek değerden büyük) veya "low" olarak ifade edilir ve true bearing ile gyro bearing arasındaki farktan bulunur. İkinci Zabit bu kontrolü düzenli yapar ve gyro error book'a kaydeder.`,
            `En yaygın yöntemler; transit (iki sabit cismin doğal hattı), azimuth/amplitude (gök cisminin hesaplanmış true azimuth'u ile gyro azimuth'unun karşılaştırılması) ve known transit bearing'tir. Açık denizde günde en az bir kez, kısıtlı sulara girişten önce ise mutlaka error kontrol edilmelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Amplitude yöntemi pratiktir",
              text: `Güneşin doğuş/batışında (alt kenar ufukta) amplitude hesabı kolaydır ve gyro error'u hızlıca verir. Sonuç hesaplanan true amplitude ile gyro amplitude karşılaştırılarak bulunur ve gyro error book'a yazılır.`,
            },
          ],
        },
        {
          subheading: "2.2 Error'un düzeltmeye uygulanması",
          paragraphs: [
            `Tespit edilen gyro error tüm gyro bearing ve heading değerlerine uygulanır: "error east, compass least; error west, compass best" mantığıyla true değer elde edilir. ECDIS ve radar gyro'dan beslendiği için error, pozisyon ve hedef hesaplarını doğrudan etkiler.`,
            `Error sürekli artıyor veya sıçramalar gösteriyorsa bu bir arıza belirtisidir; İkinci Zabit durumu kaptana ve teknik departmana bildirir. Repeater'ların ana gyro ile senkron olduğu da düzenli kontrol edilir.`,
          ],
          table: {
            caption: `Örnek Gyro Error Kayıt Satırı`,
            headers: ["Tarih/UTC", "Yöntem", "True Brg", "Gyro Brg", "Error"],
            rows: [
              ["17/06 0600", "Sun amplitude", "071.5°", "072.0°", "0.5° W"],
              ["17/06 1200", "Transit", "315.0°", "315.0°", "Nil"],
              ["17/06 1800", "Sun amplitude", "289.0°", "288.5°", "0.5° E"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Magnetic Compass Deviation Takibi",
      sections: [
        {
          subheading: "3.1 Deviation card ve compass error",
          paragraphs: [
            `Manyetik pusula, geminin çelik gövdesi ve elektrikli ekipmanın oluşturduğu yerel manyetik alan nedeniyle gerçek manyetik kuzeyden sapar (deviation). Bu sapma her heading için farklıdır ve "deviation card" (deviation table) üzerinde gösterilir. Toplam compass error = variation + deviation'dır.`,
            `İkinci Zabit, deviation'ı düzenli olarak (genelde her vardiyada uygun fırsatta ve heading değişiminde) kontrol edip deviation book'a işler. Variation ENC/haritadan veya manyetik modelden alınır; deviation gözlemle bulunur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Deviation card zorunluluğu",
              text: `SOLAS V/19 ve flag state kuralları, gemide geçerli bir deviation card bulundurulmasını ve manyetik pusulanın çalışır durumda (sıvı dolu, kabarcıksız) olmasını şart koşar. Compass adjuster tarafından periyodik swing yapılması ve sertifikalanması gerekir.`,
            },
          ],
        },
        {
          subheading: "3.2 Compass swinging ve adjuster",
          paragraphs: [
            `Deviation, gemi büyük tamir/kuru havuz sonrası, yük dağılımı kalıcı değiştiğinde veya deviation card'ın güvenilirliği şüpheliyse yetkili compass adjuster tarafından "swinging" ile yeniden belirlenir. İkinci Zabit, swing tarihini ve yeni kartı kayıt altına alır.`,
            `Gyro arızasında manyetik pusula tek heading referansı kalabilir; bu yüzden deviation'ın güncel ve güvenilir olması bir yedeklilik (redundancy) emniyetidir. Pusula yakınına manyetik malzeme konmaması da kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Speed/Distance Log Kalibrasyonu",
      sections: [
        {
          subheading: "4.1 Log tipleri ve hata kaynakları",
          paragraphs: [
            `Speed log; doppler (su/zemin referanslı), elektromanyetik (EM) veya pitometer tipinde olabilir. Doppler log dual-axis ground/water speed verir; EM log su hızını ölçer. Her tip akıntı, sığ su, kirlenme (fouling) ve transducer hizasından etkilenir.`,
            `Log hatası, ECDIS dead reckoning, ETA hesabı ve squat tahminini etkiler. İkinci Zabit, log okumalarını GNSS SOG ile düzenli karşılaştırarak tutarlılığı izler ve sapmaları kaydeder.`,
          ],
        },
        {
          subheading: "4.2 Kalibrasyon ve doğrulama",
          paragraphs: [
            `Log kalibrasyonu genelde üretici/servis tarafından measured mile veya GNSS karşılaştırmasıyla yapılır. İkinci Zabit, açık ve durgun suda log speed ile GNSS SOG'u kıyaslayarak bir doğrulama yapar; büyük fark transducer kirliliği veya arıza işaretidir.`,
            `Distance log (cumulative) makine performansı ve fuel takibi için de kullanılır; bu nedenle sıçramalar veya donmalar derhal raporlanır. Kalibrasyon sertifikası ve doğrulama notları log book'ta tutulur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ground vs water speed karıştırılmamalı",
              text: `Doppler log derin suda water track'e, sığ suda ground track'e geçebilir. Manevrada ve yanaşmada hangi referansın gösterildiği bilinmezse hız algısı yanıltıcı olur ve temas riski doğar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Echo Sounder Kontrolleri",
      sections: [
        {
          subheading: "5.1 Echo sounder doğruluğu ve ayarı",
          paragraphs: [
            `Echo sounder, transducer altındaki su derinliğini ölçer ve UKC izleme ile karaya oturma önlemenin son bağımsız savunma hattıdır. İkinci Zabit; draught/transducer offset ayarının doğru olduğunu, gain ve range ayarlarının uygun olduğunu ve shallow water alarm'ının ayarlı olduğunu doğrular.`,
            `Gösterge "depth below keel" mi yoksa "depth below transducer/waterline" mi gösteriyor netleştirilmelidir; offset yanlışsa derinlik okuması tehlikeli derecede yanıltıcı olur. Çift frekanslı sounder'larda uygun frekans seçilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Charted depth ile çapraz kontrol",
              text: `Echo sounder derinliği, ECDIS/harita derinliği ile karşılaştırılarak hem sounder hem pozisyon doğrulanır. Beklenenden sığ okuma, pozisyon hatası veya haritada olmayan tehlike işareti olabilir; derhal değerlendirilmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Kayıt ve alarm yönetimi",
          paragraphs: [
            `Kısıtlı sularda echo sounder sürekli çalıştırılır ve depth recorder/log tutulur (bazı sularda zorunludur). Shallow water alarmı, planlanan minimum UKC'ye göre ayarlanır ve seslendirme test edilir.`,
            `İkinci Zabit, sounder'ın transducer kirliliği, hava kabarcığı (aeration) veya yanlış echo (ikinci yansıma) nedeniyle hatalı okumadığını izler. Şüpheli okuma derhal başka yöntemle teyit edilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Radar Performance Monitor ve RACON/SART Testleri",
      sections: [
        {
          subheading: "6.1 Performance monitor ve tuning",
          paragraphs: [
            `Radar performance monitor (PM), radarın iletim gücü ve alıcı duyarlılığının normal olduğunu gösteren dahili bir test düzeneğidir. İkinci Zabit, her vardiya başında ve kritik sulara girmeden önce PM'i çalıştırarak radar performansının düşmediğini doğrular ve kaydeder.`,
            `Tune, gain, sea/rain clutter ve gerekirse manuel ayarlar test edilir. ARPA fonksiyonları (hedef edinme, CPA/TCPA, vector mode) ile gyro/log girişlerinin doğru beslendiği kontrol edilir; aksi halde hedef hızları yanlış hesaplanır.`,
          ],
          table: {
            caption: `Radar/Performance Kontrol Rutini`,
            headers: ["Kontrol", "Sıklık", "Beklenen Sonuç"],
            rows: [
              ["Performance monitor", "Vardiya başı / kritik su öncesi", "Plume normal aralıkta"],
              ["Heading line alignment", "Periyodik", "Pruva ile hizalı"],
              ["ARPA gyro/log feed", "Vardiya başı", "Doğru SOG/heading"],
              ["RACON gözlemi", "Fırsatta", "Beklenen kod görünür"],
            ],
          },
        },
        {
          subheading: "6.2 SART ve RACON",
          paragraphs: [
            `SART (Search and Rescue Transponder), can salı/sandalda bulunan ve 9 GHz radarda tetiklenince ekranda 12 noktalık bir hat üreten bir cihazdır. İkinci Zabit, SART'ın batarya son kullanım tarihini ve gerekiyorsa periyodik test (radar karşısında) kaydını tutar.`,
            `RACON, seyir işaretlerine (fener, şamandıra) yerleştirilen ve radarda Morse kodu üreten bir transponderdir; gözlemi radar doğrulama için faydalıdır. AIS-SART ve EPIRB ile birlikte GMDSS emniyet zincirinin parçasıdırlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SART/EPIRB batarya ve test kaydı",
              text: `LSA/FSS Code ve flag state kuralları SART ve EPIRB'lerin son kullanma tarihli batarya ve periyodik test kayıtlarını şart koşar. Süresi geçmiş batarya PSC denetiminde non-conformity oluşturur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. ECDIS, AIS ve VDR Doğrulaması",
      sections: [
        {
          subheading: "7.1 ECDIS çalışırlık ve veri tutarlılığı",
          paragraphs: [
            `ECDIS'in birincil seyir aracı olduğu gemilerde sistemin sürekli ve doğru çalışması hayatidir. İkinci Zabit; ENC güncelliğini, safety contour/depth ayarlarını, sensor input'ları (GNSS, gyro, log) ve alarm yönetimini düzenli doğrular. Sistem yazılım sürümü onaylı (IHO S-52/S-57/S-63 uyumlu) olmalıdır.`,
            `İki bağımsız ECDIS'li gemilerde her ikisinin de aynı güncel ENC ve ayarlara sahip olduğu kontrol edilir; aksi halde primary arızasında yedek güvenilmez kalır.`,
          ],
        },
        {
          subheading: "7.2 AIS ve VDR doğrulama",
          paragraphs: [
            `AIS statik verileri (MMSI, çağrı işareti, gemi adı/tipi, boy/en) ve dinamik verileri (pozisyon, SOG, COG, heading, navigational status) düzenli doğrulanır; özellikle navigational status (under way, at anchor, NUC) elle güncel tutulmalıdır. Yanlış AIS verisi trafikte yanlış anlaşılmaya yol açar.`,
            `VDR/S-VDR, kaza sonrası delil için kritik bir "kara kutu"dur. İkinci Zabit; VDR'ın tüm kanalları (köprü sesi, VHF, radar resmi, sensor verileri) kaydettiğini, APT (Annual Performance Test) sertifikasının geçerli olduğunu ve kapsül bataryasının uygun olduğunu izler. Bir olay sonrası kayıt, üzerine yazılmadan korunmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Olay sonrası VDR verisini koru",
              text: `Ciddi bir kaza/olaydan sonra VDR kaydı genelde 12-48 saat içinde üzerine yazılır. Verinin save/protect fonksiyonu ile derhal saklanması, kaybolmasını önlemek için ilk yapılacak işlerdendir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Bakım Kayıt Sistemi ve Denetime Hazırlık",
      sections: [
        {
          subheading: "8.1 PMS, log book ve izlenebilirlik",
          paragraphs: [
            `Seyir cihazlarının bakımı genelde geminin Planned Maintenance System (PMS) içinde tanımlı job'lar olarak izlenir. İkinci Zabit, köprüüstü cihazlarına ait test ve kalibrasyon kayıtlarının (gyro error book, deviation book, radar PM log, magnetic compass swing, SART/EPIRB test) güncel ve eksiksiz tutulmasını sağlar.`,
            `Servis raporları, kalibrasyon sertifikaları ve type approval belgeleri dosyalanır. İzlenebilir bir kayıt zinciri hem emniyet hem denetim açısından zorunludur.`,
          ],
          table: {
            caption: `Köprüüstü Kayıt Defterleri ve Sıklık`,
            headers: ["Kayıt", "Sıklık", "İçerik"],
            rows: [
              ["Gyro error book", "Günlük / kritik su öncesi", "Yöntem, error değeri"],
              ["Deviation book", "Vardiyalık fırsatta", "Heading, deviation"],
              ["Radar PM log", "Vardiya başı", "Performance sonucu"],
              ["SART/EPIRB test", "Periyodik", "Test, batarya tarihi"],
              ["Compass swing", "Gerektiğinde", "Adjuster, yeni kart"],
            ],
          },
        },
        {
          subheading: "8.2 Arıza yönetimi ve raporlama",
          paragraphs: [
            `Bir cihaz arızalandığında İkinci Zabit; arızayı kayda alır, kaptanı ve teknik departmanı bilgilendirir, varsa alternatif yöntemi devreye sokar ve gerekiyorsa flag/class'a bildirim ihtiyacını değerlendirir. Örneğin ECDIS-only gemide tek ECDIS arızası seyir kısıtı doğurabilir.`,
            `Yedek/alternatif düzenlemeler (manuel plot, magnetic compass, ikinci pozisyon kaynağı) hazır tutulur. Arızalı cihazla seyir, riski azaltacak ek önlemler (hız azaltma, ekstra gözcü) ile yürütülür.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Sık görülen hatalar",
          paragraphs: [
            `En yaygın hatalar; gyro error'un düzenli kontrol edilmemesi, deviation card'ın eski olması, echo sounder offset'inin yanlış ayarlanması, radar performance monitor'ün atlanması ve log'un GNSS ile hiç karşılaştırılmamasıdır.`,
            `AIS navigational status'ün güncellenmemesi ve VDR APT süresinin geçmesi denetimlerde sık rastlanan eksiklerdir. Tek pozisyon kaynağına (GNSS) körü körüne güvenip cihaz çapraz kontrolünü ihmal etmek karaya oturmaya yol açabilir.`,
          ],
        },
        {
          subheading: "9.2 Vaka dersleri",
          paragraphs: [
            `Royal Majesty (1995): GPS anten bağlantısı koptu, gemi DR moduna düştü ve ekip fark etmeden saatlerce saptı; echo sounder ve bağımsız fix ile teyit yapılmadığından karaya oturdu. Ders: cihazları çapraz kontrol et, tek kaynağa güvenme.`,
            `Genel denetim bulgusu: kalibre edilmemiş ya da kaydı tutulmayan seyir cihazları PSC detention'larının düzenli nedenidir. Ders: kayıt zinciri, cihazın kendisi kadar önemlidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — çapraz kontrol hayat kurtarır",
              text: `Pek çok karaya oturma raporunda ortak nokta, echo sounder veya bağımsız bearing ile basit bir teyidin yapılmamasıdır. Cihazların düzenli test edilmesi ve okumalarının birbiriyle karşılaştırılması, sessiz arızaları ortaya çıkarır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in cihaz bakım checklist'i",
          bullets: [
            `Gyro error günlük ve kritik su öncesi ölçülüp kaydedildi mi?`,
            `Deviation card güncel, manyetik pusula sıvı/kabarcık yönünden sağlam mı?`,
            `Speed log GNSS SOG ile karşılaştırıldı, sapma kaydedildi mi?`,
            `Echo sounder offset doğru, shallow alarm ayarlı ve test edildi mi?`,
            `Radar performance monitor çalıştırıldı, ARPA gyro/log feed doğru mu?`,
            `SART/EPIRB batarya tarihleri ve test kayıtları geçerli mi?`,
            `ECDIS ENC güncel, safety settings ve sensor input'ları doğru mu?`,
            `AIS statik/dinamik veri ve navigational status güncel mi?`,
            `VDR tüm kanalları kaydediyor, APT sertifikası geçerli mi?`,
            `Tüm kayıt defterleri eksiksiz, arıza/servis raporları dosyalı mı?`,
          ],
          paragraphs: [
            `Seyir cihazlarının düzenli bakım ve kalibrasyon takibi, doğru pozisyon ve güvenli manevranın görünmeyen temelidir. İkinci Zabit'in görevi yalnızca cihazları çalıştırmak değil; okumalarını çapraz kontrol etmek, sapmaları kayda almak ve sessiz arızaları erken yakalamaktır. Disiplinli bir kayıt ve doğrulama rutini, hem kaza zincirini en başından kırar hem de her denetimde geminin hazır bulunmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
