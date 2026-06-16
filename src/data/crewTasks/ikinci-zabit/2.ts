import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "GMDSS teçhizat sorumluluğu",
  roleSlug: "ikinci-zabit",
  taskIndex: 2,
  estimatedPages: 25,
  intro: `İkinci Zabit, pek çok gemide GMDSS (Global Maritime Distress and Safety System) teçhizatının günlük sorumlusu (designated GMDSS operator) olarak görev yapar. Bu sorumluluk; VHF DSC, MF/HF DSC, Inmarsat (FleetBroadband/Fleet One), NAVTEX, EPIRB, SART ve portable VHF cihazlarının düzenli testlerini yapmayı, GMDSS Radio Log'u eksiksiz tutmayı, batarya ve anten kontrollerini yürütmeyi ve yedek parça/güç kaynağı durumunu izlemeyi kapsar. Bu bölüm; GMDSS deniz bölgelerinden (A1-A4) başlayarak günlük/haftalık/aylık test prosedürlerini, DSC test call mantığını, distress alert hiyerarşisini ve PSC denetiminde sık karşılaşılan eksiklikleri SOLAS Chapter IV çerçevesinde açıklar.`,
  sources: [
    "SOLAS Chapter IV — Radiocommunications",
    "ITU Radio Regulations (Appendix 15, 17)",
    "IMO Resolution A.702(17) — Radio Maintenance Guidelines for GMDSS Sea Areas A3 and A4",
    "IMO Resolution A.1001(25) — Criteria for the Provision of Mobile Satellite Communication Systems",
    "GMDSS Manual (IMO, latest edition)",
    "ITU List of Coast Stations and Special Service Stations (List IV)",
    "Admiralty List of Radio Signals (ALRS) NP281, NP283, NP285, NP286",
    "STCW Code Section A-IV/2 — GMDSS Operator Competence",
  ],
  chapters: [
    {
      heading: "1. GMDSS Mimarisi ve Deniz Bölgeleri",
      lead: `GMDSS, geleneksel "watch on 2182 kHz" mantığını terk edip distress alerting'i otomatik, fonksiyon-temelli ve coğrafyaya göre katmanlı bir yapıya taşır. Geminin taşıdığı teçhizat, içinde seyrettiği deniz bölgesine bağlıdır.`,
      sections: [
        {
          subheading: "1.1 Dokuz haberleşme fonksiyonu",
          paragraphs: [
            `GMDSS, gemiyi tek bir cihaza değil dokuz temel haberleşme fonksiyonuna göre donatır: gemiden-sahile distress alerting, sahilden-gemiye distress alerting, gemiden-gemiye distress alerting, SAR koordinasyon haberleşmesi, on-scene haberleşme, locating sinyalleri (SART/RADAR transponder), Maritime Safety Information (MSI) yayını, genel haberleşme ve köprüüstü-köprüüstü haberleşme. İkinci Zabit, gemideki teçhizatın bu fonksiyonların tamamını sağladığını doğrular.`,
            `Her fonksiyon için en az iki bağımsız yöntem (independent means) gerekir; tek bir cihazın arızası distress alerting kabiliyetini tümüyle ortadan kaldırmamalıdır. Bu redundancy ilkesi, GMDSS'in temel emniyet felsefesidir ve teçhizat envanterinin neden "fazlalıklı" göründüğünü açıklar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS IV/4 — Functional Requirements",
              text: `Her gemi, içinde seyrettiği deniz bölgesinin gerektirdiği dokuz fonksiyonu sağlayacak teçhizatı taşımak ve operasyonel tutmak zorundadır. Eksik veya çalışmayan teçhizat, geminin sefere çıkmasını engelleyen major non-conformity'dir.`,
            },
          ],
        },
        {
          subheading: "1.2 A1-A4 deniz bölgeleri ve gerekli teçhizat",
          paragraphs: [
            `Deniz bölgeleri, kıyı istasyonlarının kapsama menzili ve uydu erişimine göre tanımlanır. A1, en az bir VHF DSC kıyı istasyonunun sürekli alert kapsamı içindeki bölge (yaklaşık 20-30 NM); A2, MF DSC kapsamı (yaklaşık 100-150 NM); A3, Inmarsat geostationary uydu kapsamı (yaklaşık 70°N-70°S arası); A4, kutup bölgeleri dahil bunların dışındaki tüm alandır (HF DSC zorunlu).`,
            `İkinci Zabit, sefer rotasının hangi bölgeleri kestiğini bilmeli ve buna göre teçhizat ile yedek güç gereksinimini doğrulamalıdır. Örneğin A4'e (kutup seferi) çıkacak bir gemi yalnız Inmarsat'a güvenemez; HF DSC ve MSI alımı operasyonel olmalıdır.`,
          ],
          table: {
            caption: `Deniz Bölgeleri ve Asgari GMDSS Teçhizatı`,
            headers: ["Bölge", "Kapsam", "Asgari Teçhizat", "MSI Kaynağı"],
            rows: [
              ["A1", "VHF DSC ~20-30 NM", "VHF DSC + EPIRB", "NAVTEX"],
              ["A2", "MF DSC ~100-150 NM", "A1 + MF DSC", "NAVTEX"],
              ["A3", "Inmarsat 70N-70S", "A2 + HF veya Inmarsat", "NAVTEX + EGC"],
              ["A4", "Kutup / dünya geneli", "A2 + HF DSC (zorunlu)", "NAVTEX + EGC + HF"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. DSC (Digital Selective Calling) Mantığı",
      sections: [
        {
          subheading: "2.1 MMSI, çağrı tipleri ve distress alert",
          paragraphs: [
            `DSC, her geminin benzersiz 9 haneli MMSI (Maritime Mobile Service Identity) numarasıyla kimliklendiği dijital çağrı sistemidir. Distress, urgency, safety ve routine çağrı tipleri vardır. Distress alert tek tuşla (korumalı kapaklı kırmızı distress butonu) gönderilir; gemi pozisyonu, MMSI ve mümkünse distress doğası (yangın, batma, çatışma vb.) otomatik iletilir.`,
            `İkinci Zabit, MMSI'nin tüm DSC cihazlarına (VHF, MF/HF) ve EPIRB ile AIS-SART'a doğru programlandığını doğrular. Yanlış veya eksik MMSI, distress alert'in SAR otoritelerince doğru eşleştirilememesine yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlışlıkla distress alert",
              text: `Kazara basılan distress butonu derhal iptal edilmeli ve ilgili MRCC sözlü olarak (RT mesajı + log kaydı) bilgilendirilmelidir. İptal edilmeyen false alert SAR kaynaklarını boşa harcar ve idari yaptırımla sonuçlanabilir. Mürettebata DSC paneli eğitimi şarttır.`,
            },
          ],
        },
        {
          subheading: "2.2 Pozisyon güncelleme ve GNSS bağlantısı",
          paragraphs: [
            `DSC distress alert'in en kritik verisi pozisyondur. Cihaz GNSS (GPS) alıcısına bağlı değilse veya bağlantı koparsa, pozisyon manuel girilmeli ve düzenli güncellenmelidir; aksi halde distress alert eski/yanlış pozisyon iletir. İkinci Zabit, GNSS interface'in çalıştığını ve pozisyon zaman damgasının güncel olduğunu kontrol eder.`,
            `Manuel pozisyon girilen cihazlarda en geç 4 saatte bir güncelleme yapılmalıdır. Bu, A2/A4 bölgelerinde MF/HF DSC cihazları için pratikte sık atlanan ama denetimde sorgulanan bir noktadır.`,
          ],
        },
      ],
    },
    {
      heading: "3. VHF DSC — Test ve Operasyon",
      sections: [
        {
          subheading: "3.1 Günlük internal test",
          paragraphs: [
            `VHF DSC controller, her gün dahili self-test (internal test) ile kontrol edilir. Bu test cihazın transmit/receive modüllerini fiziksel yayın yapmadan denetler ve sonucu ekranda/log'da gösterir. İkinci Zabit testi yapar, sonucu GMDSS Radio Log'a tarih/saat (UTC) ile kaydeder.`,
            `Channel 70 (DSC kanalı) sürekli dinleme (watch) modunda olmalıdır; bu kanal sesli haberleşme için değil yalnız DSC alerting içindir. CH16 ise sesli distress ve çağrı kanalı olarak izlenir.`,
          ],
        },
        {
          subheading: "3.2 Portable VHF (survival craft transceiver)",
          paragraphs: [
            `SOLAS gemilerinde en az iki (1600 GT üzeri üç) adet su geçirmez taşınabilir VHF telsiz (survival craft two-way VHF) bulunur. Bunlar can filikasından on-scene haberleşme içindir. Birincil (primary) batarya mühürlü ve yalnız acil durum içindir; ayrı bir şarj edilebilir batarya rutin/test kullanımı içindir.`,
            `İkinci Zabit, portable VHF'lerin aylık operasyonel testini yapar, primary batarya son kullanma tarihini izler ve cihazları boat station yakınında erişilebilir tutar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Primary batarya ≠ test bataryası",
              text: `Survival craft VHF'in mühürlü lityum primary bataryası testte ASLA kullanılmaz; testler ayrı şarjlı batarya ile yapılır. Primary batarya son kullanma tarihi geçince yenisiyle değiştirilir ve eskisi imha kaydına geçer.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. MF/HF DSC ve Anten Sistemleri",
      sections: [
        {
          subheading: "4.1 Günlük internal test ve frekans planı",
          paragraphs: [
            `MF/HF DSC cihazları da günlük dahili test ister. Distress ve safety frekansları (2187.5 kHz MF DSC, 8414.5 kHz ve diğer HF DSC bantları) sürekli scan/watch modunda izlenir. İkinci Zabit, scanning receiver'ın doğru frekans setini taradığını doğrular.`,
            `HF, A4 bölgesinde tek güvenilir uzun menzil alerting yöntemidir; uydu kapsama dışında kalan kutup seferlerinde HF DSC operasyonel tutulmazsa distress alerting fonksiyonu kaybedilir.`,
          ],
        },
        {
          subheading: "4.2 Anten, topraklama ve insülatör kontrolü",
          paragraphs: [
            `MF/HF performansı büyük ölçüde anten ve topraklama (earth/ground) bütünlüğüne bağlıdır. İkinci Zabit; anten tellerinin gerginliğini, insülatörlerin tuz/kir birikimini, anten tuner bağlantılarını ve toprak bağlantısını görsel kontrol eder. Korozyon veya gevşek bağlantı, transmit gücünü dramatik düşürür.`,
            `Whip ve wire antenlerde fiziksel hasar (kopma, çatlak insülatör) tespit edilirse derhal raporlanır ve onarılır. Anten arızası genelde "alert gidiyor sanılır ama ulaşmaz" tipi sessiz bir tehlikedir.`,
          ],
          table: {
            caption: `GMDSS Test Periyotları Özeti`,
            headers: ["Teçhizat", "Test", "Periyot", "Kayıt"],
            rows: [
              ["VHF/MF/HF DSC", "Internal self-test", "Günlük", "Radio Log"],
              ["DSC test call", "Coast station / başka gemi", "Haftalık", "Radio Log"],
              ["Reserve battery", "Voltage / capacity test", "Haftalık + aylık", "Radio Log"],
              ["EPIRB", "Self-test (yayınsız)", "Aylık", "Radio Log"],
              ["SART / AIS-SART", "Self-test", "Aylık", "Radio Log"],
              ["Battery (annual)", "Capacity discharge", "Yıllık", "Servis raporu"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. DSC Test Call Prosedürü",
      sections: [
        {
          subheading: "5.1 Haftalık test call mantığı",
          paragraphs: [
            `Internal test cihazın iç devrelerini kontrol eder; gerçek yayın ve alış zincirini doğrulamak için haftalık DSC test call yapılır. MF/HF DSC, bir kıyı istasyonuna (coast station) routine test call gönderir ve otomatik acknowledgement (ACK) bekler. ACK alınması, anten dahil tüm zincirin çalıştığını kanıtlar.`,
            `VHF DSC test call ise başka bir gemiye veya kıyı istasyonuna yapılabilir. İkinci Zabit, test call tarih/saat/karşı istasyon ve sonucu (ACK alındı/alınmadı) GMDSS Radio Log'a işler. ACK alınamazsa arıza araştırılır ve teknik servise rapor edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Test call atlanması",
              text: `Bir PSC denetiminde, internal testler düzenli yapılmış ama haftalık DSC test call kayıtları eksik bulundu. Anten tuner arızası nedeniyle HF DSC aslında yayın yapamıyordu; internal test bunu yakalayamamıştı. Ders: internal test, gerçek yayını kanıtlayan test call'ın yerine geçmez.`,
            },
          ],
        },
        {
          subheading: "5.2 Distress frekanslarında test yasağı",
          paragraphs: [
            `Test call yalnız test/routine amaçlı ve uygun şekilde yapılır; distress önceliği taşıyan trafiği bloke edecek veya yanlışlıkla distress olarak algılanacak işlemlerden kaçınılır. İkinci Zabit, cihazın "test" modunu doğru seçtiğini ve gerçek distress butonunu kazara aktive etmediğini teyit eder.`,
            `Test call'lar ITU prosedürlerine ve kıyı istasyonunun (ALRS'te listelenen) kabul ettiği test protokolüne uygun yapılır. Bazı kıyı istasyonları otomatik ACK verirken bazıları manuel yanıtlar; doğru istasyon ve frekans seçimi ALRS NP286 ile yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. EPIRB, SART ve Locating Cihazları",
      sections: [
        {
          subheading: "6.1 EPIRB (406 MHz Cospas-Sarsat)",
          paragraphs: [
            `EPIRB (Emergency Position Indicating Radio Beacon), gemi battığında otomatik (hydrostatic release ile) yüzeye çıkıp 406 MHz'de Cospas-Sarsat uydularına distress sinyali ve kodlanmış kimlik (Hex ID) yayan can kurtarıcı cihazdır. İkinci Zabit; aylık self-test, hydrostatic release son kullanma tarihi, EPIRB batarya expiry ve bracket montajını kontrol eder.`,
            `EPIRB Hex ID, ülke SAR otoritesinin veri tabanına (örn. ulusal beacon registry) kayıtlı olmalı ve gemi bilgileri (isim, MMSI, irtibat) güncel tutulmalıdır. Kayıt güncel değilse SAR yanıtı gecikir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hydrostatic release ve batarya tarihleri",
              text: `EPIRB'in hydrostatic release unit (HRU) ve internal bataryası ayrı son kullanma tarihlerine sahiptir. İkisinden biri geçmişse EPIRB SOLAS uyumsuz sayılır. Aylık self-test gerçek yayın yapmaz; gerçek aktivasyon yalnız acil durumdadır.`,
            },
          ],
        },
        {
          subheading: "6.2 SART / AIS-SART ve radar transponder",
          paragraphs: [
            `SART (Search and Rescue Transponder), radar SART veya AIS-SART biçiminde olur. Radar SART, arama yapan geminin 9 GHz radarına yanıt vererek PPI ekranında 12 noktalı bir çizgi (blip line) oluşturur. AIS-SART ise AIS hedefi olarak konum yayar. İkinci Zabit aylık self-test yapar, batarya expiry'sini izler.`,
            `Survival craft'ta erişilebilir, can filikasında yüksek monte edilebilir biçimde tutulur; menzili yüksekliğe bağlıdır. Test sırasında çevredeki gerçek SAR birimlerini yanıltmamak için kısa ve kontrollü self-test yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "7. NAVTEX, Inmarsat EGC ve MSI Alımı",
      sections: [
        {
          subheading: "7.1 NAVTEX ve mesaj kategorileri",
          paragraphs: [
            `NAVTEX, 518 kHz (uluslararası İngilizce), 490 kHz (ulusal dil) ve 4209.5 kHz (tropik) üzerinden NAVAREA/METAREA bazlı seyir uyarıları, hava raporları ve SAR bilgisi yayar. İkinci Zabit, doğru NAVAREA istasyonlarının ve mesaj kategorilerinin (A=navigational, B=met warning, D=SAR vb.) seçili olduğunu doğrular.`,
            `Kritik kategoriler (A, B, D, L) reddedilemez (non-rejectable); bunlar kapatılamaz. İkinci Zabit, NAVTEX printer/ekran çıktısını köprüüstü ekibinin gördüğünden ve önemli uyarıların passage plan'a yansıdığından emin olur.`,
          ],
        },
        {
          subheading: "7.2 Inmarsat ve EGC (SafetyNET)",
          paragraphs: [
            `A3/A4 bölgelerinde NAVTEX kapsamı dışında MSI, Inmarsat EGC (Enhanced Group Call) / SafetyNET ile alınır. İkinci Zabit, EGC receiver'ın doğru NAVAREA ve coastal area'lara abone (programlı) olduğunu, ocean region seçiminin gemi pozisyonuyla uyumlu olduğunu kontrol eder.`,
            `Inmarsat terminalinin (FleetBroadband vb.) commissioning'i, abonelik durumu ve distress priority test'i de İkinci Zabit'in izlemesi gereken kalemlerdir. Inmarsat üzerinden distress alert gönderme prosedürü, terminal menüsünden net biçimde erişilebilir olmalıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ALRS NP283 — Maritime Safety Information",
              text: `NAVTEX istasyon listesi, frekans planı ve EGC ocean region/area kodları Admiralty List of Radio Signals Volume 3'te bulunur. Doğru istasyon ve area seçimi bu yayından yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Güç Kaynakları ve Reserve Battery",
      sections: [
        {
          subheading: "8.1 Üç bağımsız güç kaynağı",
          paragraphs: [
            `GMDSS teçhizatı; ana güç (ship's main), emergency power (emergency generator) ve reserve source of energy (battery) olmak üzere üç bağımsız kaynaktan beslenir. Reserve battery, jeneratör de durduğunda GMDSS'i belirli süre (gemi tipine göre 1 veya 6 saat) çalıştıracak kapasitede olmalıdır.`,
            `İkinci Zabit, reserve battery'nin haftalık voltaj kontrolünü (hidrometre/voltmetre), aylık ölçümlerini ve yıllık kapasite (discharge) testini takip eder. Akü hücreleri korozyon, sıvı seviyesi (kurşun-asit ise) ve havalandırma açısından kontrol edilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS IV/13 — Sources of Energy",
              text: `Geminin ana ve acil güç kaynaklarının kesilmesi halinde GMDSS teçhizatını besleyecek bir reserve source of energy bulunmalıdır. Bu kaynak, distress haberleşmesini A1/A2 için en az 1 saat, jeneratörsüz gemilerde 6 saat sürdürebilmelidir.`,
            },
          ],
        },
        {
          subheading: "8.2 Şarj cihazı ve otomatik geçiş",
          paragraphs: [
            `Battery charger'ın çalıştığı ve aküyü tam dolu tuttuğu doğrulanır. Ana güç kesildiğinde reserve battery'ye otomatik (kesintisiz) geçiş test edilir; geçişte cihazların reset olmaması ve dinleme nöbetinin kopmaması gerekir.`,
            `İkinci Zabit, akü değişim/servis tarihlerini ve bir sonraki yıllık kapasite testinin tarihini planlama tablosunda izler. Eskiyen akü, en kötü anda (gerçek black-out) GMDSS'i devre dışı bırakabilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. GMDSS Radio Log ve Operatör Yetkinliği",
      sections: [
        {
          subheading: "9.1 GMDSS Radio Log içeriği",
          paragraphs: [
            `GMDSS Radio Log (Radio Record), zorunlu bir gemi belgesidir. Distress, urgency ve safety haberleşmelerinin özeti; günlük/haftalık/aylık test sonuçları; reserve battery durumu; teçhizat arıza ve onarımları; operatör imzaları (designated operator ve master onayı) buraya işlenir.`,
            `İkinci Zabit, log'u zamanında ve eksiksiz tutar. PSC denetiminde en sık bulgu, testlerin yapılmış olmasına rağmen log'a işlenmemesidir; "yapıldı ama kayıt yok" denetimde "yapılmamış" sayılır.`,
          ],
          table: {
            caption: `GMDSS Radio Log — Tipik Kayıt Kalemleri`,
            headers: ["Kalem", "Sıklık", "İçerik"],
            rows: [
              ["Internal test", "Günlük", "VHF/MF/HF DSC self-test sonucu"],
              ["DSC test call", "Haftalık", "Karşı istasyon, ACK durumu"],
              ["Battery", "Haftalık/aylık", "Voltaj, kapasite, durum"],
              ["EPIRB/SART", "Aylık", "Self-test, expiry kontrolü"],
              ["Distress/Urgency", "Olay bazlı", "Zaman, içerik, eylem"],
              ["Arıza/onarım", "Olay bazlı", "Cihaz, arıza, çözüm"],
            ],
          },
        },
        {
          subheading: "9.2 Operatör sertifikası ve sorumluluk",
          paragraphs: [
            `GMDSS teçhizatını işletmek için geçerli GMDSS operatör sertifikası (GOC — General Operator's Certificate veya bölgeye göre ROC) gerekir. İkinci Zabit bu sertifikaya sahip olmalı ve distress trafiği prosedürlerine (alert, acknowledge, relay) hakim olmalıdır.`,
            `Distress alert alındığında doğru eylem zinciri kritiktir: alert teyit edilir, MRCC ile koordine olunur, gerekirse distress relay yapılır. Yanlış prosedür hayat kaybına yol açabilir; bu yüzden köprüüstü ekibine periyodik GMDSS tatbikatı yaptırılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kart üstüne hızlı referans",
              text: `Distress butonunun yanına, distress/urgency/safety prosedür adımlarını özetleyen laminasyonlu bir hızlı referans kartı asılması, panik anında doğru sırayı uygulamayı kolaylaştırır ve birçok şirketin SMS'inde tavsiye edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in GMDSS checklist'i",
          bullets: [
            `Günlük internal test (VHF/MF/HF DSC) yapıldı ve log'a işlendi mi?`,
            `Haftalık DSC test call yapıldı, ACK alındı mı?`,
            `MMSI tüm cihazlarda (DSC, EPIRB, AIS-SART) doğru mu?`,
            `DSC pozisyon girişi GNSS'e bağlı ve güncel mi?`,
            `EPIRB aylık self-test, HRU ve batarya expiry kontrol edildi mi?`,
            `SART/AIS-SART self-test ve batarya expiry tamam mı?`,
            `NAVTEX doğru NAVAREA ve kategorilerde, çıktı izleniyor mu?`,
            `EGC/Inmarsat ocean region ve abonelik doğru mu?`,
            `Reserve battery voltaj/kapasite testleri güncel mi?`,
            `GMDSS Radio Log eksiksiz, operatör sertifikası geçerli mi?`,
          ],
          paragraphs: [
            `GMDSS, gemi battığı an "çalışmazsa hiç anlamı kalmayan" bir sistemdir; bu yüzden değeri, hiç kullanılmadığı sürece görünmez kalır. İkinci Zabit'in görevi, teçhizatı yalnız test etmek değil, her testin gerçek yayın zincirini kanıtladığından, güç kaynaklarının black-out'ta dayanacağından ve kayıtların denetimde eksiksiz çıkacağından emin olmaktır. Disiplinli GMDSS rutinleri, en kötü anda distress sinyalinin gerçekten karşıya ulaşmasını sağlayan tek güvencedir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
