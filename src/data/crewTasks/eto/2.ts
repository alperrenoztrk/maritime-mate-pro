import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Köprüüstü seyir ve haberleşme cihazları bakımı",
  roleSlug: "eto",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `ETO, köprüüstündeki seyir ve haberleşme elektroniğinin teknik bakımından sorumludur. Bu kapsam; radar, ECDIS, GPS/GNSS, echo sounder, speed log, AIS, gyro compass ve VDR'ın elektriksel/elektronik bakımını, GMDSS teçhizatının (VHF DSC, MF/HF, Inmarsat, NAVTEX) bakımını ve anten sistemleri, kablolama ile konnektör kontrolünü içerir. Bu bölüm, SOLAS ve GMDSS gereksinimleri ışığında bu cihazların güvenilirliğini sağlamak için gereken metodolojiyi açıklar.`,
  sources: [
    "SOLAS Chapter IV — Radiocommunications (GMDSS)",
    "SOLAS Chapter V — Safety of Navigation (Reg. 18-19 ekipman)",
    "STCW Code A-III/6 — Electronics and communication maintenance",
    "IMO Performance Standards (radar A.477, ECDIS A.817/MSC.232, AIS MSC.74)",
    "ITU Radio Regulations — frekans ve GMDSS",
    "IEC 61162 (NMEA/digital interface), IEC 60945 (marine equipment)",
    "GMDSS Manual (IMO) ve Admiralty List of Radio Signals",
    "Vendor manuals (Furuno, JRC, Sperry, Cobham/Sailor, Kongsberg)",
  ],
  chapters: [
    {
      heading: "1. Köprüüstü Elektronik Mimarisi",
      lead: `Modern köprüüstü, entegre bir köprü sistemi (INS/IBS) olarak tasarlanır; tüm seyir sensörleri NMEA/IEC 61162 veri ağı üzerinden birbiriyle ve merkezi ekranlarla konuşur.`,
      sections: [
        {
          subheading: "1.1 Sensör ağı ve veri dağıtımı",
          paragraphs: [
            `GPS, gyro, log, echo sounder ve anemometre gibi sensörler, NMEA 0183 (seri) veya NMEA 2000 / IEC 61162-450 (Ethernet) üzerinden radar, ECDIS ve AIS gibi tüketicilere veri sağlar. ETO, bu veri ağının topolojisini, distribution unit'lerini ve her sensörün hangi cihazları beslediğini bilmelidir; tek bir sensör arızası birçok cihazı etkileyebilir.`,
            `Heading (gyro) verisi özellikle kritiktir: radar ARPA, ECDIS, AIS ve otopilot hepsi gyro'ya bağlıdır. ETO, heading distribution'ı yedekli (gyro + magnetic + GPS heading) tutar ve sensör arızasında doğru kaynağa geçişi doğrular.`,
          ],
          bullets: [
            `Konum: GPS/GNSS (yedekli, DGPS opsiyonlu)`,
            `Yön: gyro compass + manyetik pusula + transmitting magnetic`,
            `Hız: speed log (su/zemin), GPS SOG`,
            `Derinlik: echo sounder`,
            `Hedef: radar/ARPA + AIS füzyonu`,
          ],
        },
        {
          subheading: "1.2 SOLAS V seyir ekipman gereksinimleri",
          paragraphs: [
            `SOLAS V/19, gemi tonajına göre zorunlu seyir ekipmanını listeler: gyro, radar (çift radar belirli tonaj üzeri), ECDIS (yedekli), AIS, VDR/S-VDR, echo sounder, speed log, BNWAS, LRIT. ETO, bu ekipmanların çalışır ve type-approved durumda olduğunu güvence altına alır; bir cihazın arızası seyir kısıtı (PSC detention) sebebi olabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/18 — Onay ve bakım",
              text: `Seyir ekipmanı type-approved olmalı ve çalışır durumda tutulmalıdır. ECDIS gibi sistemlerin yazılım sürümü IMO performance standardı ile uyumlu güncel olmalıdır; eski/uyumsuz yazılım uygunsuzluk yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Radar ve ARPA Bakımı",
      sections: [
        {
          subheading: "2.1 Magnetron / SSPA ve performans izleme",
          paragraphs: [
            `Geleneksel radarlarda magnetron, mikrodalga gücünü üreten tüptür ve zamanla zayıflar; ETO, performance monitor (echo box) ile alıcı/verici performansını ve magnetron sağlığını izler. Magnetron ömrü tipik 3000-8000 saattir; zayıflama uzak hedef tespitini düşürür. Modern solid-state (SSPA) radarlarda magnetron yoktur, ancak güç modülü ve soğutma izlenir.`,
            `ETO, magnetron değişiminde yüksek gerilim (kV) ve mikrodalga maruziyetine karşı emniyet kurallarına uyar; antenne dönmeden ve verici kapalıyken çalışılır. Tuning, gain, sea/rain clutter ve performans monitör değerleri kayıt altına alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mikrodalga ve HV tehlikesi",
              text: `Çalışan radar anteni mikrodalga radyasyon yayar; anten üzerinde çalışmadan önce verici kapatılır ve "radar maintenance" kilidi konur. Modülatör/magnetron devresinde yüksek gerilim kapasitörleri, kapatıldıktan sonra da yüklü kalabilir; boşaltılmadan dokunulmaz.`,
            },
          ],
        },
        {
          subheading: "2.2 Anten, motor ve waveguide",
          paragraphs: [
            `Anten dönüş motoru, slip ring, encoder (azimuth/heading marker) ve waveguide (dalga kılavuzu) bakım gerektirir. ETO, anten mekanizmasını, motor fırçalarını (varsa), waveguide nemini (dehydrator/pressurization) ve heading marker hizasını kontrol eder. Waveguide içine nem girmesi güç kaybına ve arklanmaya yol açar.`,
          ],
          table: {
            caption: `Radar Bakım Öğeleri ve Periyot`,
            headers: ["Öğe", "Kontrol", "Periyot"],
            rows: [
              ["Magnetron/SSPA", "Performance monitor", "Haftalık"],
              ["Anten motor/encoder", "Mekanik + hiza", "Aylık"],
              ["Waveguide", "Nem/pressurization", "Aylık"],
              ["Heading marker", "Hiza kontrolü", "3 ay + dok"],
              ["HV devre/kablolar", "İzolasyon, terminal", "Yıllık"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. ECDIS, GPS ve Konum Sistemleri",
      sections: [
        {
          subheading: "3.1 ECDIS bakımı ve güncellemeler",
          paragraphs: [
            `ECDIS, kağıt haritanın yerini alan onaylı sistemdir; ETO'nun sorumluluğu donanım (workstation, ekran, yedek besleme), yazılım sürümü ve harita/güncelleme altyapısının teknik sağlığıdır. ENC (Electronic Navigational Chart) güncellemeleri ve IHO presentation library/software sürümü güncel tutulur; uyumsuz sürüm seyir emniyeti ve PSC sorunu yaratır.`,
            `Yedekli ECDIS gereksinimi için iki bağımsız iş istasyonu ayrı besleme ve sensörle çalışmalıdır. ETO, takeover (devralma) senaryosunu test eder: ana ECDIS arızalanınca yedeğin sorunsuz devreye girdiği doğrulanır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ECDIS yazılım uyumu",
              text: `IMO, eski ECDIS yazılımlarının yeni ENC formatlarını yanlış gösterebileceği konusunda uyarmıştır (anomaly riski). ETO, IHO test data set ile ECDIS'in doğru çalıştığını ve yazılımın güncel performance standardına uygun olduğunu doğrular.`,
            },
          ],
        },
        {
          subheading: "3.2 GPS/GNSS ve yedeklilik",
          paragraphs: [
            `GPS/GNSS alıcısı, konum ve zaman kaynağıdır; ETO anten konnektörünü, kablo kayıplarını ve alıcı sağlığını kontrol eder. GNSS jamming/spoofing riskine karşı yedek konum kaynağı (ikinci alıcı, eLoran nerede varsa) ve gyro+log ile dead reckoning yedeği önem kazanmıştır. Anten konumu, gölgeleme yaratmayacak ve diğer antenlerden etkilenmeyecek şekilde olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Echo Sounder, Speed Log ve Gyro",
      sections: [
        {
          subheading: "4.1 Echo sounder ve speed log transducer'ları",
          paragraphs: [
            `Echo sounder (derinlik) ve speed log (hız) transducer'ları gemi karinesindedir; ETO, transducer kablolarının izolasyonunu, sea-valve sızdırmazlığını ve elektronik ünitenin kalibrasyonunu kontrol eder. Doppler log su altı kirlenmesinden etkilenir; dok döneminde transducer yüzeyleri temizlenir.`,
          ],
        },
        {
          subheading: "4.2 Gyro compass bakımı",
          paragraphs: [
            `Gyro compass, gerçek kuzeyi sağlayan kritik sensördür; modern fiber-optik (FOG) veya ring-laser (RLG) tipler bakım açısından kolay, geleneksel mekanik tipler ise hassas bakım ister. ETO; gyro besleme, heading repeater hizası, follow-up sistemi ve alarm fonksiyonlarını kontrol eder. Heading hatası tüm seyir cihazlarını yanıltacağından gyro doğruluğu kritiktir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Heading kaynağı seçimi",
              text: `Gyro arızasında köprü ekibi manyetik pusula veya GPS heading'e geçer; ETO, heading distribution unit'in bu yedek kaynaklara sorunsuz geçtiğini ve tüm tüketicilerin (radar, AIS, otopilot) doğru heading aldığını test etmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. AIS ve VDR",
      sections: [
        {
          subheading: "5.1 AIS bakımı ve statik veri",
          paragraphs: [
            `AIS, gemi kimliği ve seyir verisini VHF üzerinden yayınlar/alır. ETO, AIS'in VHF ve GPS antenlerini, statik veri doğruluğunu (MMSI, IMO no, gemi tipi, boyutlar) ve dinamik veri (heading, ROT) beslemesini kontrol eder. Yanlış AIS verisi çatışma önleme açısından tehlikeli ve PSC bulgusu sebebidir.`,
          ],
        },
        {
          subheading: "5.2 VDR/S-VDR ve APT testi",
          paragraphs: [
            `VDR (Voyage Data Recorder), kazaların "kara kutusudur"; köprü sesi, radar görüntüsü, sensör verisi ve telsiz konuşmalarını kaydeder. ETO, VDR'ın tüm veri kanallarının kaydedildiğini, final recording medium (kapsül) ve float-free unit'in çalıştığını doğrular. Yıllık APT (Annual Performance Test) yetkili servis tarafından yapılır ve sertifikalandırılır.`,
          ],
          table: {
            caption: `VDR Kaydedilen Veri Kanalları`,
            headers: ["Kanal", "İçerik", "Saklama"],
            rows: [
              ["Köprü ses", "Mikrofon/intercom", "Min. 12 saat (yeni 720 saat HDD)"],
              ["Radar görüntü", "Ana radar ekranı", "—"],
              ["Sensör veri", "Konum, heading, hız, derinlik", "—"],
              ["Telsiz", "VHF konuşmaları", "—"],
              ["Alarm/kontrol", "Köprü alarmları, dümen, makine emirleri", "—"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/20 — VDR",
              text: `VDR/S-VDR taşıma, kayıt süresi ve yıllık performans testi zorunludur. Kaza sonrası kayıtların korunması ve yetkililere teslimi yasal yükümlülüktür; kayıtların üzerine yazılmaması için olay sonrası VDR derhal durdurulur/kaydedilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. GMDSS Teçhizat Bakımı",
      sections: [
        {
          subheading: "6.1 VHF DSC, MF/HF ve Inmarsat",
          paragraphs: [
            `GMDSS, deniz alanlarına (A1-A4) göre belirli haberleşme yedekliliği gerektirir. ETO; VHF DSC (kanal 70), MF/HF DSC (2187.5 kHz vb.), Inmarsat-C/FleetBroadband terminallerinin teknik bakımını yapar. DSC self-test, alıcı/verici güç çıkışı, anten SWR (standing wave ratio) ve besleme bataryası kontrol edilir.`,
            `GMDSS ekipmanının bakım stratejisi deniz alanına bağlıdır: A3/A4'te "duplication of equipment" (ekipman çiftleme), "shore-based maintenance" veya "at-sea electronic maintenance" yöntemlerinden en az ikisi seçilir. At-sea maintenance seçilmişse gemide GMDSS Radio Electronic/Maintainer sertifikalı kişi (genelde ETO) bulunmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS IV/15 — Maintenance",
              text: `GMDSS ekipmanının her zaman çalışır tutulması için: (a) ekipman çiftleme, (b) kara-tabanlı bakım, (c) deniz-üstü elektronik bakım yöntemlerinden A3/A4 deniz alanlarında en az ikisi sağlanmalıdır. At-sea bakım için gemide yetkili ve yedek parça/test cihazı bulunmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 NAVTEX, EPIRB ve SART",
          paragraphs: [
            `NAVTEX (518 kHz) seyir uyarılarını alır; ETO alıcı ve anten sağlığını kontrol eder. EPIRB (406 MHz COSPAS-SARSAT) ve SART (Search and Rescue Transponder), test fonksiyonu (battery/GPS self-test), batarya son kullanma tarihi ve hydrostatic release unit (HRU) kontrolü gerektirir. EPIRB yıllık kara testi ve 5 yılda batarya/HRU değişimi yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış EPIRB aktivasyonu",
              text: `EPIRB testleri sadece self-test fonksiyonuyla yapılır; gerçek 406 MHz sinyali yayınlatmak yanlış alarm (false alert) yaratır ve SAR kaynaklarını boşa harcar. Yanlış aktivasyon olursa derhal MRCC/RCC bilgilendirilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Anten, Kablo ve Konnektör Yönetimi",
      sections: [
        {
          subheading: "7.1 Anten ve SWR kontrolü",
          paragraphs: [
            `Anten sistemleri köprüüstü elektroniğinin en zorlanan dış bileşenleridir: tuz, nem, titreşim ve UV. ETO, anten tabanlarını, izolatörlerini, topraklamasını ve VHF/HF antenlerin SWR değerini kontrol eder. Yüksek SWR güç kaybına ve verici çıkış katı arızasına yol açar. Antenler arası girişim (mutual coupling) ve gölgeleme yerleşim sırasında dikkate alınır.`,
          ],
        },
        {
          subheading: "7.2 Konnektör ve kablo bakımı",
          paragraphs: [
            `Koaksiyel konnektörlerde (PL259, N-tipi, TNC) korozyon ve nem en yaygın arıza sebebidir. ETO; dış konnektörleri self-amalgamating tape ile su geçirmez yapar, içeri nem girmiş kabloları değiştirir, terminal panellerini temiz ve sıkı tutar. Sinyal kalitesi sorunlarının çoğu kötü konnektörden kaynaklanır, cihazdan değil.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Önce konnektör, sonra cihaz",
              text: `Bir VHF veya GPS performans sorununda ilk şüpheli pahalı cihaz değil, dış anten konnektörü ve kablodur. Su geçirmiş bir konnektör veya korozyon, cihaz değişimine gerek kalmadan sorunu çözer.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Köprü Alarm ve Güvenlik Sistemleri",
      sections: [
        {
          subheading: "8.1 BNWAS ve köprü alarmları",
          paragraphs: [
            `BNWAS (Bridge Navigational Watch Alarm System), vardiya zabitinin uyanık ve görev başında olduğunu garanti eder; belirli aralıkta reset edilmezse kademeli olarak kaptan ve diğer zabitleri uyarır. ETO, BNWAS zamanlamasını, reset sensörlerini ve alarm zincirini test eder. Köprü alarm panelinin (machinery, fire, general) doğru çalıştığı da doğrulanır.`,
          ],
        },
        {
          subheading: "8.2 Otopilot ve dümen göstergeleri",
          paragraphs: [
            `Otopilot (heading control), gyro ve dümen geri-besleme sistemine bağlıdır; ETO, otopilot-gyro-dümen zincirinin elektriksel sağlığını ve manuel/otomatik geçiş güvenilirliğini kontrol eder. Rudder angle indicator ve RPM göstergeleri doğru kalibre edilmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 GPS spoofing ve seyir hatası",
          paragraphs: [
            `Bazı bölgelerde GNSS spoofing nedeniyle gemilerin konumu yanlış raporlandı; ECDIS gerçek dışı konum gösterdi. Ders: ETO, GNSS bağımsız konum kontrolü (radar fix, gyro+log dead reckoning) yedeklerinin çalışır olmasını sağlamalı ve köprü ekibini tek konum kaynağına bağımlı kalmamaları için desteklemelidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Konnektör kaynaklı GMDSS arızası",
              text: `Bir gemide MF/HF DSC sinyali zayıftı; pahalı verici değişimi düşünülürken ETO anten besleme konnektöründe korozyon buldu. Konnektör yenilenince güç çıkışı normale döndü. Kök neden çoğu zaman cihazda değil bağlantıdadır.`,
            },
          ],
        },
        {
          subheading: "9.2 VDR kayıt eksikliği",
          paragraphs: [
            `Bir kazada VDR'ın köprü ses kanalının aylardır kaydetmediği, çünkü bir mikrofonun arızalı olduğu ortaya çıktı. Ders: VDR'ın tüm kanallarının düzenli doğrulanması ve yıllık APT'nin atlanmaması kritik öneme sahiptir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 ETO köprü elektroniği kontrol listesi",
          bullets: [
            `Radar performance monitor ve magnetron/SSPA durumu iyi mi?`,
            `ECDIS yazılım sürümü ve ENC güncellemeleri güncel mi?`,
            `Yedek ECDIS takeover testi yapıldı mı?`,
            `GPS/GNSS ve yedek konum kaynakları çalışıyor mu?`,
            `Gyro doğruluğu ve heading distribution test edildi mi?`,
            `AIS statik/dinamik verisi doğru mu?`,
            `VDR tüm kanalları kaydediyor mu, APT geçerli mi?`,
            `GMDSS (VHF/MF/HF/Inmarsat/NAVTEX) self-test ve güç çıkışı iyi mi?`,
            `EPIRB/SART batarya ve HRU son kullanma tarihleri geçerli mi?`,
            `Anten SWR ve dış konnektörler korozyonsuz/su geçirmez mi?`,
          ],
          paragraphs: [
            `Seyir ve haberleşme elektroniği, geminin "gözleri, kulakları ve sesidir"; ETO bu sistemlerin her an çalışır olmasını sağlayarak hem seyir emniyetini hem de bir acil durumda dünyaya ulaşma kabiliyetini güvence altına alır. Bu cihazlardaki tek bir sessiz arıza, kritik anda hayati olabilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
