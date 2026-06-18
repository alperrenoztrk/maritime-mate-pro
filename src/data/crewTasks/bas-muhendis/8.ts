import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Teknik raporlama ve şirket iletişimi",
  roleSlug: "bas-muhendis",
  taskIndex: 8,
  estimatedPages: 24,
  intro: `Baş Mühendis (Chief Engineer), geminin teknik durumunu karadaki yönetime şeffaf, zamanında ve veri temelli olarak aktaran kritik iletişim halkasıdır. Günlük noon report'tan aylık teknik rapora, arıza bildiriminden tamir/bakım koordinasyonuna kadar tüm teknik raporlama Baş Mühendis'in sorumluluğundadır. Bu bölüm; raporlama hiyerarşisini, yakıt/yağ tüketim raporlamasını, noon report verilerini, arıza (defect) raporlamasını ve Superintendent ile etkili iletişimi detaylı ele alır.`,
  sources: [
    "OCIMF TMSA — Element 4 (Reliability) ve Element 1 (Management)",
    "MARPOL Annex VI — DCS (Data Collection System) ve EU MRV raporlaması",
    "IMO MEPC.346(78) — SEEMP ve yakıt tüketim veri toplama",
    "Company SMS — Reporting ve defect management prosedürleri",
    "INTERTANKO — Voyage reporting best practices",
    "BIMCO — Standart noon report formatları",
    "Class Rules — Damage/defect reporting gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. Teknik Raporlamanın Amacı ve Hiyerarşisi",
      lead: `Raporlama, karadaki teknik yönetimin gemiyi "görmesini" sağlar. Doğru, zamanında ve dürüst veri olmadan ne bütçe ne de bakım planlaması mümkündür.`,
      sections: [
        {
          subheading: "1.1 Raporlama döngüsü",
          paragraphs: [
            `Teknik raporlama; günlük (noon report), haftalık (özet/sorun), aylık (detaylı teknik) ve olay-bazlı (defect/incident) katmanlardan oluşur. Her katman farklı bir karar düzeyini besler: günlük operasyonel, haftalık taktik, aylık stratejik kararları.`,
            `Baş Mühendis bu döngüyü bir disiplin olarak yürütür; gecikmeli veya eksik rapor, karada yanlış karar alınmasına ve kaynak israfına yol açar. Raporlar standart format ve doğru veriyle hazırlanır.`,
          ],
          table: {
            caption: `Teknik raporlama katmanları`,
            headers: ["Rapor", "Sıklık", "Alıcı", "İçerik özeti"],
            rows: [
              ["Noon report", "Günlük", "Operasyon/charterer", "Pozisyon, hız, yakıt, ROB"],
              ["Weekly report", "Haftalık", "Superintendent", "Açık sorunlar, bakım"],
              ["Monthly technical", "Aylık", "Teknik ofis", "PMS, tüketim, trend"],
              ["Defect report", "Olay bazlı", "Superintendent", "Arıza, etki, plan"],
              ["Voyage abstract", "Sefer sonu", "Performans/charter", "Performans özeti"],
            ],
          },
        },
        {
          subheading: "1.2 Veri kalitesi ve dürüstlük",
          paragraphs: [
            `Raporların değeri, verinin doğruluğuyla orantılıdır. Manipüle edilmiş veya "düzeltilmiş" tüketim verisi; performance dispute, vetting sorunu ve güven kaybı doğurur. Baş Mühendis, ham veriye sadık kalır ve anormallikleri açıklamayla raporlar.`,
            `Özellikle yakıt tüketim ve performans verisi, charter party hesaplaşmalarında ve EU MRV/IMO DCS raporlamasında yasal sonuç doğurur; bu nedenle doğruluk hayatî önemdedir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Veri manipülasyonu riski",
              text: `Yakıt tüketim verilerinin gerçeği yansıtmaması; charter party "performance claim"lerinde, EU ETS/MRV doğrulamasında ve TMSA denetiminde ciddi sonuçlar doğurur. Veri her zaman gerçek ve izlenebilir olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Noon Report ve Sefer Verileri",
      sections: [
        {
          subheading: "2.1 Noon report içeriği",
          paragraphs: [
            `Noon report, her gün öğlen (12:00 local/UTC) gemi pozisyonunu, son 24 saatlik mesafeyi, ortalama hızı, ana makine devrini, slip'i, hava/deniz koşullarını ve yakıt tüketimini (HFO/VLSFO, MGO, cylinder oil, system oil) ve ROB'u içerir.`,
            `Baş Mühendis, raporun makine tarafını (consumption, RPM, ME load, generator running hours, ROB) sounding ve flowmeter verilerine dayanarak doğrular. Köprü ve makine verisi tutarlı olmalıdır.`,
          ],
          bullets: [
            "ME RPM, slip ve ortalama hız",
            "24 saatlik yakıt tüketimi (HFO/VLSFO, MGO, LO)",
            "ROB (Remaining On Board) — her yakıt/yağ türü",
            "Generator running hours ve yük",
            "Hava/deniz koşulları (Beaufort, swell)",
          ],
        },
        {
          subheading: "2.2 Performance ve weather routing etkisi",
          paragraphs: [
            `Noon report verileri, charterer'ın gemi performansını (good weather speed/consumption warranty) değerlendirmesinde kullanılır. Kötü hava, akıntı ve fouling tüketimi artırır; Baş Mühendis bu faktörleri raporda açıklar.`,
            `Performance dispute durumunda, doğru kaydedilmiş hava verisi ve makine parametreleri gemiyi haksız claim'lerden korur. Bu nedenle veri eksiksiz ve gerçekçi tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yakıt ve Yağ Tüketim Raporlaması",
      sections: [
        {
          subheading: "3.1 Bunker ve ROB mutabakatı",
          paragraphs: [
            `Baş Mühendis, her bunker sonrası BDN miktarını gemi tank ölçümleriyle (sounding/ullage + temperature correction) karşılaştırır ve farkı raporlar. Düzenli ROB mutabakatı, tüketim hesabının doğruluğunu güvence altına alır ve olası "short delivery" durumlarını tespit eder.`,
            `Yakıt tüketimi flowmeter (varsa) ve tank ölçümleriyle çapraz doğrulanır. İki yöntem arasındaki kalıcı fark, flowmeter kalibrasyonu veya ölçüm hatası araştırması gerektirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mass flowmeter avantajı",
              text: `Coriolis tipi mass flowmeter, bunker miktarını sıcaklık ve density'den bağımsız doğrudan kütle olarak ölçer; volumetrik ölçüm hatalarını ve "cappuccino effect" (hava karışımı) hilesini büyük ölçüde ortadan kaldırır.`,
            },
          ],
        },
        {
          subheading: "3.2 Cylinder ve system oil tüketim takibi",
          paragraphs: [
            `Cylinder oil feed rate (g/kWh) ve system oil tüketimi raporlanır. Cylinder oil tüketiminin anormal artışı; over-lubrication ayarı, ring blow-by veya liner aşınmasına işaret eder. System oil top-up miktarının artışı su/yakıt girişi veya kaçak göstergesidir.`,
            `Baş Mühendis bu trendleri aylık raporda grafikler ve sapmaları açıklar. Yağ tüketimi sadece maliyet değil, makine sağlığının önemli bir göstergesidir.`,
          ],
          table: {
            caption: `Aylık tüketim raporu örnek kalemleri`,
            headers: ["Kalem", "Birim", "İzleme amacı"],
            rows: [
              ["VLSFO/HFO tüketimi", "MT/gün", "SFOC trend, maliyet"],
              ["MGO tüketimi", "MT/gün", "ECA, generator, boiler"],
              ["Cylinder oil feed", "g/kWh", "Aşınma, over-lub kontrolü"],
              ["System oil top-up", "L/ay", "Kaçak/kontaminasyon"],
              ["Fresh water üretimi", "MT/gün", "Evaporator performansı"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Aylık Teknik Rapor ve Trend Analizi",
      sections: [
        {
          subheading: "4.1 PMS ve bakım durumu raporlaması",
          paragraphs: [
            `Aylık teknik rapor; tamamlanan ve gecikmiş PMS iş emirlerini, kritik ekipman durumunu, açık defect'leri ve önümüzdeki dönem planını içerir. Bu rapor, karadaki teknik ofisin bakım performansını (overdue ratio, planned vs. corrective) izlemesini sağlar.`,
            `Baş Mühendis, gecikmiş kritik bakımları gerekçeleriyle (yedek parça, hava, liman) açıklar ve telafi planı sunar. Şeffaflık, karadan doğru desteği almanın anahtarıdır.`,
          ],
        },
        {
          subheading: "4.2 Performans trend analizi",
          paragraphs: [
            `SFOC, exhaust gas spread, T/C devri, scavenge air pressure ve yağ analiz sonuçları aylık trend olarak sunulur. Tek bir günün verisi değil, rolling average ve trend yönü değerlendirilir.`,
            `Trend bozulması (örn. SFOC'un sürekli artışı), karadaki uzmanlarla ortak teşhis ve müdahale planlamasını tetikler. Bu predictive yaklaşım, ani arızaları ve sefer aksamasını önler.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Trend, arızayı erken yakaladı",
              text: `Bir gemide aylık raporlarda bir silindirin exhaust sıcaklığının üç ay üst üste yükseldiği görüldü. Karadaki teşhisle injector arızası teyit edildi ve planlı limanda değiştirildi; böylece seyirde ani güç kaybı ve olası liner hasarı önlendi.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Arıza (Defect) Raporlaması",
      sections: [
        {
          subheading: "5.1 Defect report yapısı",
          paragraphs: [
            `Bir arıza tespit edildiğinde Baş Mühendis hızlıca bir defect report hazırlar: ekipman, arıza tanımı, olası kök neden, operasyonel etki (sefer/emniyet/çevre), alınan geçici önlem ve önerilen kalıcı çözüm ile yedek parça/servis ihtiyacı.`,
            `Raporun netliği, karadaki kararın hızını belirler. Belirsiz "makine arızalı" tarzı raporlar yerine, ölçüm ve fotoğrafla desteklenen somut raporlar etkili destek getirir.`,
          ],
          bullets: [
            "Etkilenen ekipman ve sistem",
            "Arıza belirtileri ve ölçümler (fotoğraf/veri ekli)",
            "Olası kök neden (root cause) değerlendirmesi",
            "Operasyonel/emniyet/çevre etkisi ve aciliyet",
            "Önerilen aksiyon, yedek parça ve servis ihtiyacı",
          ],
        },
        {
          subheading: "5.2 Major defect ve sınıf/sigorta bildirimi",
          paragraphs: [
            `Ana makine, şaft, kazan veya emniyet sistemini etkileyen majör arızalar, sınıf kuruluşuna ve gerekiyorsa sigortacıya (H&M) bildirilmelidir. Baş Mühendis, Kaptan ve Superintendent ile bu bildirimi koordine eder.`,
            `Sınıf bildirimi yapılmayan majör hasar, sertifika geçerliliğini ve sigorta tazminatını riske atar. Bu nedenle bildirim eşikleri SMS'te tanımlıdır ve titizlikle uygulanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Sınıfa bildirim yükümlülüğü",
              text: `Sınıf kuralları, makine veya yapıyı etkileyen hasarların gecikmeden sınıfa bildirilmesini zorunlu kılar. Bildirilmemiş hasar, sınıf askısına ve sigorta reddine yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Superintendent ile İletişim ve Koordinasyon",
      sections: [
        {
          subheading: "6.1 Etkili teknik iletişim",
          paragraphs: [
            `Baş Mühendis-Superintendent ilişkisi, gemi teknik yönetiminin omurgasıdır. Etkili iletişim; zamanında, net, çözüm-odaklı ve belgelenmiş olmalıdır. Sorunu raporlarken Baş Mühendis genellikle bir öneri/plan da sunar.`,
            `Acil konularda telefon/e-posta hızlı kullanılır, ancak karar ve onaylar yazılı teyit edilir. Bu yazılı iz, ileride sorumluluk ve süreklilik açısından kritiktir.`,
          ],
        },
        {
          subheading: "6.2 Tamir ve bakım planlaması koordinasyonu",
          paragraphs: [
            `Liman tamiratı, servis ekibi attendance'ı, yedek parça lojistiği ve drydock planlaması Baş Mühendis ve Superintendent ortak işidir. Baş Mühendis sahanın gerçeğini, Superintendent bütçe ve lojistik kaynağı yönetir.`,
            `İyi koordinasyon; tamiratın doğru limanda, doğru ekiple ve gemiyi geciktirmeden yapılmasını sağlar. Kötü koordinasyon, off-hire ve maliyet patlamasına yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "7. Yasal ve Düzenleyici Raporlama",
      sections: [
        {
          subheading: "7.1 IMO DCS ve EU MRV",
          paragraphs: [
            `IMO Data Collection System (DCS) ve EU MRV (Monitoring, Reporting, Verification), yıllık yakıt tüketimi ve CO2 emisyon verisinin doğrulanmış olarak raporlanmasını zorunlu kılar. Baş Mühendis, tüketim verisinin onaylı monitoring plan'a uygun toplanmasını sağlar.`,
            `2024'ten itibaren EU ETS, denizcilik emisyonlarını kapsamına aldı; doğru tüketim/emisyon verisi, allowance hesabı ve maliyet için doğrudan finansal sonuç doğurur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SEEMP ve veri tutarlılığı",
              text: `SEEMP Part II (DCS) ve Part III (CII), gemi tüketim verisinin tutarlı toplanmasını gerektirir. Noon report, bunker kayıtları ve DCS verisi birbirini doğrulamalıdır; tutarsızlık doğrulamada (verification) sorun yaratır.`,
            },
          ],
        },
        {
          subheading: "7.2 ORB ve diğer yasal kayıtlar",
          paragraphs: [
            `Oil Record Book (ORB Part I — machinery space), sludge ve bilge yönetiminin yasal kaydıdır. Baş Mühendis, ORB girişlerinin doğru, zamanında ve operasyonla tutarlı olmasını güvence altına alır.`,
            `ORB hataları PSC'de en sık ve en ciddi bulgular arasındadır; "magic pipe" şüphesi cezai sonuç doğurabilir. Yasal kayıtlar, teknik raporlamanın en hassas parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Belgeleme Disiplini ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Kayıt sürekliliği ve arşiv",
          paragraphs: [
            `Tüm raporlar, e-postalar ve onaylar düzenli arşivlenir. Bu arşiv; survey, vetting, performans dispute ve sigorta süreçlerinde gemiyi koruyan kanıt bütünüdür. Baş Mühendis değişiminde bu arşiv handover'ın parçasıdır.`,
            `Dijital raporlama platformları (vessel performance, fleet management yazılımları) kullanılıyorsa, veri girişi disiplinli ve zamanında yapılır.`,
          ],
        },
        {
          subheading: "8.2 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, teknik raporlama ve şirket iletişimi disiplinini özetler.`,
          ],
          bullets: [
            "Noon report makine verileri sounding/flowmeter ile doğrulandı mı?",
            "Bunker sonrası ROB mutabakatı yapıldı ve fark raporlandı mı?",
            "Cylinder/system oil tüketim trendi izleniyor mu?",
            "Aylık teknik rapor PMS ve performans trendini içeriyor mu?",
            "Defect report'lar somut, ölçüm/fotoğraf destekli mi?",
            "Majör arızalar sınıf/sigortaya bildirildi mi?",
            "IMO DCS / EU MRV verisi onaylı plana uygun toplanıyor mu?",
            "ORB girişleri doğru, zamanında ve tutarlı mı?",
            "Superintendent ile kararlar yazılı teyit ediliyor mu?",
            "Raporlar ve onaylar düzenli arşivleniyor mu?",
          ],
        },
        {
          subheading: "8.3 Sonuç",
          paragraphs: [
            `Teknik raporlama, Baş Mühendis'in karadaki yönetimle kurduğu güven köprüsüdür. Doğru, zamanında ve dürüst veri; doğru bakım kararları, adil charter hesaplaşması ve yasal uyum sağlar. Modern Baş Mühendis, bir mühendis kadar iyi bir veri yöneticisi ve iletişimci olmalıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
