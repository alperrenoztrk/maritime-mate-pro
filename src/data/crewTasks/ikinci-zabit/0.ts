import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Passage plan hazırlığı (berth-to-berth)",
  roleSlug: "ikinci-zabit",
  taskIndex: 0,
  estimatedPages: 26,
  intro: `İkinci Zabit (Second Officer / Navigation Officer), gemideki seyir planlamasının (passage planning / voyage planning) baş sorumlusudur. Berth-to-berth mantığıyla; appraisal, planning, execution ve monitoring olmak üzere dört aşamadan oluşan planı hazırlar, kaptan onayına sunar ve köprüüstü ekibinin uygulamasını izler. Bu bölüm; rota seçimi, waypoint belirleme, UKC (Under Keel Clearance) hesabı, no-go area tespiti, contingency anchorage ve abort point belirleme, parallel indexing ve squat gibi unsurları IMO Resolution A.893(21) çerçevesinde adım adım açıklar.`,
  sources: [
    "SOLAS Chapter V, Regulation 34 — Safe Navigation and Avoidance of Dangerous Situations",
    "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    "STCW Code Section A-VIII/2 Part 2 — Voyage Planning",
    "IMO Resolution A.1106(29) — Revised Guidelines for AIS",
    "Bridge Procedures Guide (ICS, 5th Edition)",
    "Admiralty Guide to ECDIS Implementation (NP232)",
    "The Nautical Institute — Bridge Team Management",
    "COLREG 1972 (as amended)",
  ],
  chapters: [
    {
      heading: "1. Seyir Planlamasının Yasal Çerçevesi ve Dört Aşama",
      lead: `Passage planning bir rutin değil, SOLAS gereği zorunlu bir emniyet sürecidir. Plan eksikliği veya yüzeysel hazırlık, karaya oturma kazalarının en sık kök nedenidir.`,
      sections: [
        {
          subheading: "1.1 SOLAS V/34 ve berth-to-berth ilkesi",
          paragraphs: [
            `SOLAS Chapter V Regulation 34, her seferin başlamadan önce planlanmasını ve bu planın geminin yanaşacağı rıhtımdan (berth) ayrılacağı rıhtıma kadar tüm sefer boyunca pilot suları, manevra sahaları ve açık deniz dahil kesintisiz kapsamasını şart koşar. İkinci Zabit bu planı hazırlarken "berth-to-berth" ilkesini esas alır; demir sahası, pilot boarding ground ve dar kanal geçişleri planın ayrılmaz parçasıdır.`,
            `Plan, IMO Resolution A.893(21) "Guidelines for Voyage Planning" ile detaylandırılır. Bu kılavuz; appraisal (değerlendirme), planning (planlama), execution (icra) ve monitoring (izleme) olmak üzere dört aşamayı tanımlar. İkinci Zabit ilk iki aşamayı hazırlar, son iki aşama tüm köprüüstü ekibinin sorumluluğundadır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/34 — Bağlayıcılık",
              text: `Plan hazırlanmadan veya yetersiz hazırlanarak yola çıkılması, PSC denetiminde major non-conformity sayılır ve gemi tutmaya (detention) yol açabilir. Plan kaptan tarafından onaylanmadan icra edilemez.`,
            },
          ],
        },
        {
          subheading: "1.2 Dört aşamanın iş bölümü",
          paragraphs: [
            `Appraisal aşamasında tüm bilgi kaynakları toplanır ve sefer riskleri değerlendirilir; rota alternatifleri karşılaştırılır. Planning aşamasında seçilen rota harita/ECDIS üzerine çizilir, waypoint'ler, course'lar, mesafeler, UKC ve abort point'ler belirlenir. Bu iki aşama İkinci Zabit'in masa başı çalışmasıdır.`,
            `Execution, planın kaptan brifingi sonrası uygulanması; monitoring ise her vardiyada pozisyonun plana göre çapraz kontrol edilmesi ve sapma tespiti demektir. İkinci Zabit, planın "yaşayan bir belge" olarak kaldığını, hava/trafik/draught değişimlerine göre güncellendiğini güvence altına alır.`,
          ],
          table: {
            caption: `Voyage Planning Dört Aşaması ve Sorumluluk`,
            headers: ["Aşama", "İçerik", "Birincil Sorumlu", "Çıktı"],
            rows: [
              ["Appraisal", "Bilgi toplama, risk değerlendirme", "İkinci Zabit", "Kaynak listesi, risk notları"],
              ["Planning", "Rota çizimi, waypoint, UKC", "İkinci Zabit", "Onaylı passage plan"],
              ["Execution", "Planın uygulanması", "Tüm bridge team", "Brifing, başlangıç"],
              ["Monitoring", "Pozisyon doğrulama, sapma", "Vardiya zabiti", "Logbook, position fix"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Appraisal: Bilgi Kaynaklarının Toplanması",
      sections: [
        {
          subheading: "2.1 Kullanılan seyir yayınları ve veri kaynakları",
          paragraphs: [
            `Appraisal, eldeki tüm seyir bilgisinin sistematik taranmasıdır. İkinci Zabit; charts (kâğıt/ENC), Sailing Directions (Pilot Books), List of Lights, List of Radio Signals, Tide Tables, Tidal Stream Atlases, Ocean Passages of the World, Routeing Charts, Mariner's Handbook (NP100), Notices to Mariners ve şirketin route-specific risk assessment'ını birlikte değerlendirir.`,
            `Güncel meteorolojik veriler (pilot chart climatology, mevsimsel TRS riski), draught kısıtları, ECDIS safety settings ve şirket politikaları (örn. UKC policy, squat allowance, minimum CPA) de bu aşamada toplanır. Eksik veya tarihi geçmiş bir yayın, sonraki aşamaların tamamını geçersiz kılar.`,
          ],
          bullets: [
            `Çalışan tüm haritaların son NtM'e göre düzeltilmiş olması`,
            `Sailing Directions ve List of Lights güncelliği`,
            `Tide & tidal stream verileri (yükseklik + akıntı)`,
            `Şirket UKC ve squat policy değerleri`,
            `Routeing / TSS, reporting system (örn. VTS, AMVER) gereklilikleri`,
            `Piracy/security risk bölgeleri (BMP, HRA)`,
          ],
        },
        {
          subheading: "2.2 Draught, UKC policy ve hava koşulu girdileri",
          paragraphs: [
            `Appraisal'da geminin maksimum draught'ı, beklenen trim'i ve sefer boyunca değişen su yoğunluğu (fresh/brackish/salt) dikkate alınır. Şirket UKC policy'si genelde açık denizde draught'ın belirli yüzdesi, kısıtlı sularda sabit minimum (örn. 10% veya 1.0-1.5 m) gibi değerler şart koşar.`,
            `Hava penceresi (weather window) ve tide window birlikte değerlendirilir; örneğin bir bar harbour'a giriş, yeterli su seviyesi için belirli bir tide saatine bağlanır. İkinci Zabit bu pencereleri ETA hesabıyla eşleştirerek planın zaman boyutunu kurar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Squat'ı unutma",
              text: `Sığ ve kısıtlı sularda squat (gemi dinamik çökmesi) UKC'yi ciddi azaltır. Yüksek hızda squat 1 m'yi aşabilir; planlamada hız azaltımı ve squat allowance her zaman hesaba katılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Planning: Rota Çizimi ve Waypoint Mantığı",
      sections: [
        {
          subheading: "3.1 Rota tipi ve waypoint seçimi",
          paragraphs: [
            `Okyanus geçişlerinde great circle (büyük daire) en kısa mesafeyi verir; ancak yüksek enlem riskleri (buz, fırtına) için composite great circle veya rhumb line tercih edilebilir. İkinci Zabit; mesafe, yakıt, hava ve emniyet dengesini gözeterek leg leg rotayı belirler ve her waypoint'i tehlikelerden güvenli uzaklıkta konumlandırır.`,
            `Her waypoint'te course, distance, planned speed, ETA, ve wheel-over point (dönüş başlangıç noktası) belirlenir. Wheel-over, geminin advance ve transfer manevra karakteristiklerine göre hesaplanır; aksi halde gemi dönüşte güvenli su sınırını aşar.`,
          ],
          table: {
            caption: `Örnek Waypoint Tablosu (Leg Bazlı)`,
            headers: ["WP", "Course (T)", "Distance (NM)", "Planned Speed", "Min UKC"],
            rows: [
              ["WP01 → WP02", "095°", "142", "14.0 kn", "Açık deniz"],
              ["WP02 → WP03", "121°", "38", "12.0 kn", "5.0 m"],
              ["WP03 → WP04 (TSS)", "160°", "21", "10.0 kn", "3.0 m"],
              ["WP04 → Pilot Stn", "178°", "6", "8.0 kn", "1.5 m"],
            ],
          },
        },
        {
          subheading: "3.2 No-go area, safe water ve parallel indexing",
          paragraphs: [
            `No-go area; geminin draught ve UKC policy'sine göre asla giremeyeceği sığ/tehlikeli sahalardır. Bu alanlar ECDIS'te safety contour ve safety depth ayarlarıyla görselleştirilir, kâğıt haritada ise taranarak işaretlenir. Plan, gemiyi her zaman safe water içinde tutacak şekilde kurulur.`,
            `Parallel indexing (PI), radar üzerinde sabit bir referans cisme paralel bir hat çizerek gemiyi rotada tutma tekniğidir. İkinci Zabit, kısıtlı sular için PI hatlarını ve clearing bearings/distances değerlerini plana ekler; bu, GPS arızasında bağımsız bir pozisyon kontrolü sağlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "ECDIS safety settings yanlışsa plan tehlikeli olur",
              text: `Safety contour, safety depth, shallow ve deep contour değerleri gemiye göre ayarlanmazsa ECDIS anti-grounding alarmı yanıltıcı olur. Bu ayarlar her sefer doğrulanmalı ve kayda geçmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kritik Noktalar: Abort, Contingency ve Point of No Return",
      sections: [
        {
          subheading: "4.1 Abort point ve point of no return",
          paragraphs: [
            `Abort point; geminin kanaldan/yanaşmadan vazgeçip güvenli su veya açık denize dönebileceği son fiziksel noktadır. Bu noktadan sonra dönüş alanı veya derinlik yetersiz kalır. İkinci Zabit, abort point'i manevra karakteristikleri ve kanal genişliğine göre belirler ve plana açıkça işaretler.`,
            `Point of no return (PNR), yakıt/zaman açısından geri dönüşün mümkün olmadığı noktadır; özellikle uzun okyanus geçişlerinde ve ice navigation'da kritiktir. Abort point fiziksel, PNR ise lojistik/operasyonel bir karardır.`,
          ],
        },
        {
          subheading: "4.2 Contingency anchorage ve plan B",
          paragraphs: [
            `Her plan, beklenmedik durumlar (makine arızası, ani hava bozulması, trafik tıkanması) için contingency seçenekleri içermelidir. İkinci Zabit; uygun demir sahalarını (holding ground, derinlik, swinging room), emergency anchorage noktalarını ve alternatif rota seçeneklerini plana not eder.`,
            `Bu noktalar kâğıt ve ECDIS planında işaretlenir; kaptan brifinginde "eğer X olursa Y yaparız" senaryoları tartışılır. Hazırlıksız bir gemi, acil durumda dakikalar içinde karar vermek zorunda kaldığında hata yapma riski katlanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Costa Concordia (2012)",
              text: `Planlanmamış bir "sail-by salute" rotası, yetersiz hazırlık ve no-go area'nın ihlali ile gemi karaya oturdu, 32 kişi öldü. Ders: rota değişiklikleri masa başında planlanmadan, UKC ve no-go area kontrolü yapılmadan asla uygulanmamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. UKC ve Squat Hesabı",
      sections: [
        {
          subheading: "5.1 UKC bileşenleri",
          paragraphs: [
            `UKC; charted depth + height of tide − (static draught + squat + heel allowance + uncertainty/sounding error) formülüyle hesaplanır. İkinci Zabit her bileşeni ayrı değerlendirir: gelgit tahmin hatası, kabarma (swell/heave) etkisi, yoğunluk farkı ve survey güvenilirliği (CATZOC ENC'de) ihmal edilemez.`,
            `Şirket UKC policy minimum bir değer şart koşar; planlanan UKC bu değerin altına asla düşmemelidir. Yetersizse hız azaltılır (squat düşer), tide window kaydırılır veya rota değiştirilir.`,
          ],
          table: {
            caption: `Örnek UKC Hesabı (Kısıtlı Su Geçişi)`,
            headers: ["Bileşen", "Değer", "Açıklama"],
            rows: [
              ["Charted depth", "12.4 m", "Datum'a göre"],
              ["Height of tide", "+1.8 m", "Tide table"],
              ["Static draught", "11.0 m", "Even keel"],
              ["Squat (10 kn)", "0.6 m", "Sığ su"],
              ["Net UKC", "2.6 m", "Policy min 1.5 m → OK"],
            ],
          },
        },
        {
          subheading: "5.2 Squat'ın hız ile ilişkisi",
          paragraphs: [
            `Squat, hızın karesiyle yaklaşık orantılı artar; bu nedenle hızın yarıya inmesi squat'ı yaklaşık dörtte bire düşürür. Blockage factor yüksek dar kanallarda squat çok daha şiddetlidir. İkinci Zabit, kritik UKC bölgelerinde planlanan hızı buna göre belirler.`,
            `Trim by head durumunda squat baş tarafta, trim by stern durumunda kıç tarafta artar. Plan, gemi trim'i ve squat trim etkisini birlikte değerlendirerek hangi noktada en az clearance kalacağını öngörmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. ECDIS Üzerinde Plan ve Kâğıt Yedeği",
      sections: [
        {
          subheading: "6.1 ECDIS route planning ve safety check",
          paragraphs: [
            `ECDIS, rota planlandıktan sonra otomatik "route check" çalıştırarak rotanın safety contour'u kestiği, no-go area'dan geçtiği veya navigational warning'lere girdiği noktaları listeler. İkinci Zabit bu listeyi tek tek inceler; her uyarıyı ya rota değiştirerek giderir ya da gerekçesiyle (örn. kanal içi kabul edilebilir) belgeler.`,
            `XTD (Cross Track Distance) limitleri her leg için ayarlanır; gemi bu koridordan çıkarsa ECDIS alarm verir. Manuel update layer'ına T&P notice'ler ve geçici tehlikeler işlenir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ECDIS — IMO Performance Standards",
              text: `IMO MSC.232(82) Revised Performance Standards for ECDIS, route check ve safety contour fonksiyonlarını zorunlu kılar. ECDIS primary means of navigation ise yedek (backup) düzenlemesi de operasyonel olmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Kâğıt yedek ve back-up arrangement",
          paragraphs: [
            `ECDIS-only gemilerde yedek, genelde ikinci bağımsız bir ECDIS'tir (ayrı güç kaynağı, ayrı pozisyon girişi). Kâğıt-yedekli gemilerde kritik haritalar güncel tutulur. İkinci Zabit, yedek sistemin gerçekten çalışır ve güncel olduğunu doğrular; aksi halde primary arızasında gemi seyirsiz kalır.`,
            `Plan, hem dijital hem fiziksel ortamda tutarlı olmalı; waypoint listesi, abort point'ler ve contingency noktaları her iki ortamda aynı olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Kaptan Brifingi ve Bridge Team Management",
      sections: [
        {
          subheading: "7.1 Master's approval ve brifing",
          paragraphs: [
            `Tamamlanan plan kaptana sunulur; kaptan onaylamadan plan icra edilemez (SOLAS V/34). İkinci Zabit brifingde rotayı, kritik noktaları, UKC marjlarını, abort point'leri ve hava/trafik risklerini özetler. Kaptanın talimatları (örn. çağrılma kriterleri, minimum CPA) plana eklenir.`,
            `Brifing tek yönlü değildir; kaptan ve diğer zabitler soru sorar, varsayımları sınar (challenge and response). Bu, tek bir kişinin gözden kaçırdığı bir riski ekibin yakalamasını sağlar.`,
          ],
        },
        {
          subheading: "7.2 BRM ilkeleri ve hata zinciri",
          paragraphs: [
            `Bridge Resource Management (BRM); açık iletişim, görev paylaşımı, çapraz kontrol ve "speak up" kültürünü içerir. Karaya oturmaların çoğu, ekip içinde birinin riski fark edip dile getirmemesiyle ilerleyen bir hata zincirinden doğar.`,
            `İkinci Zabit, planı paylaşılan bir mental model haline getirerek tüm ekibin aynı resmi görmesini sağlar. Pilotlu seyirde dahi plan ekibin kontrol referansıdır; pilotun önerileri plana göre değerlendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Pilot ≠ planın yerine geçer",
              text: `Master-Pilot Exchange (MPX) yapılsa da plan ve izleme sorumluluğu ekipte kalır. Pilot tavsiyesi gemiyi no-go area'ya veya yetersiz UKC'ye sokuyorsa zabit derhal itiraz etmeli ve kaptanı bilgilendirmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Monitoring: Pozisyon Doğrulama ve Sapma Yönetimi",
      sections: [
        {
          subheading: "8.1 Çoklu pozisyon doğrulama",
          paragraphs: [
            `Pozisyon tek bir kaynağa (GPS) güvenilerek değil, bağımsız yöntemlerle çapraz kontrol edilir: radar range/bearing, visual bearing, parallel indexing, echo sounder ile derinlik teyidi. GPS spoofing/jamming vakaları arttığından, bağımsız doğrulama hayati önemdedir.`,
            `İkinci Zabit, plana işlenmiş fix interval'lerine (örn. açık denizde 30-60 dk, kısıtlı suda 3-6 dk veya sürekli PI) uyar. Her fix logbook'a ve ECDIS'e kaydedilir.`,
          ],
        },
        {
          subheading: "8.2 Sapma, plan güncelleme ve devir",
          paragraphs: [
            `Gemi XTD limitini aşarsa veya UKC marjı tehlikeye girerse zabit derhal düzeltici manevra yapar ve gerekirse kaptanı çağırır. Hava, trafik veya draught değişimi planı geçersiz kılarsa plan resmî olarak güncellenir ve yeniden onaylanır.`,
            `Vardiya devrinde plan, mevcut pozisyon, yaklaşan kritik noktalar ve özel talimatlar net biçimde aktarılır. Eksik devir, izleme zincirinin kopmasına ve kazaya yol açabilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Sık görülen planlama hataları",
          paragraphs: [
            `En yaygın hatalar; tarihi geçmiş harita/yayın kullanımı, ECDIS safety settings'in yanlış ayarlanması, UKC/squat'ın eksik hesaplanması, abort point'in belirlenmemesi ve planın kâğıt üzerinde kalıp ekip tarafından sahiplenilmemesidir.`,
            `Bir diğer hata, GPS pozisyonuna körü körüne güvenmek ve bağımsız doğrulamayı ihmal etmektir. ENC ölçek/CATZOC güvenilirliğinin göz ardı edilmesi de tehlikelidir.`,
          ],
        },
        {
          subheading: "9.2 Vaka dersleri",
          paragraphs: [
            `Royal Majesty (1995): GPS anten arızası fark edilmedi, gemi planlanan rotadan saatlerce saptı ve karaya oturdu. Ders: tek pozisyon kaynağına güvenme, derinlik ve bağımsız fix ile çapraz kontrol yap.`,
            `Muros (2016): ECDIS'te yanlış safety contour ve yetersiz route check ile gemi sığlığa oturdu. Ders: ECDIS ayarları gemiye göre doğrulanmalı ve route check çıktısı incelenmelidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — CSL Thames (2011)",
              text: `Yetersiz passage planning ve köprüüstü izleme eksikliği nedeniyle gemi rotadan saptı. MAIB raporu, planın "yaşayan belge" olarak güncellenmemesini ve çapraz kontrol eksikliğini vurguladı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in passage plan checklist'i",
          bullets: [
            `Tüm harita ve yayınlar son NtM'e göre düzeltildi mi?`,
            `Appraisal kaynakları (Sailing Directions, List of Lights, tide) tarandı mı?`,
            `Rota no-go area'lardan güvenli mesafede mi, ECDIS route check temiz mi?`,
            `Her leg için UKC ve squat hesaplandı, şirket policy sağlandı mı?`,
            `Abort point, PNR, contingency anchorage işaretlendi mi?`,
            `Wheel-over point'ler ve parallel index hatları belirlendi mi?`,
            `ECDIS safety settings (contour/depth/XTD) gemiye göre ayarlandı mı?`,
            `Kâğıt/yedek sistem güncel ve plana uyumlu mu?`,
            `Plan kaptan tarafından onaylandı, brifing yapıldı mı?`,
            `Fix interval'leri ve çağrılma kriterleri plana yazıldı mı?`,
          ],
          paragraphs: [
            `İyi bir passage plan, geminin karaya oturmasını önleyen ilk ve en güçlü savunma hattıdır. İkinci Zabit'in görevi planı sadece hazırlamak değil, ekip tarafından anlaşılan, hava ve koşullara göre güncellenen, her vardiyada çapraz kontrol edilen yaşayan bir belge haline getirmektir. Disiplinli planlama, kaza istatistiklerinde sürekli tekrar eden "human error" zincirini en başından kıran tek pratiktir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
