import type { TopicDetailContent } from "@/data/navigationTopicContents";

/** Operasyonel Maritime English, kapalı döngü haberleşme ve profesyonel kayıt yazımı. */
export const operationalCommunicationTopicContents: Record<string, TopicDetailContent> = {
  "Operasyonel Maritime English ve Köprüüstü İletişimi": {
    title: "Operasyonel Maritime English ve Köprüüstü İletişimi",
    introduction:
      "SMCP temel ifadeleri standartlaştırır; ancak gerçek gemide zabit ayrıca pilot, römorkör, VTS, terminal, surveyor ve şirketle açık, kısa ve doğrulanabilir İngilizce iletişim kurmalıdır. Emniyet mesajı gramer gösterisi değil; doğru anlam ve teyit disiplinidir.",
    sections: [
      {
        title: "Kapalı Döngü Haberleşme",
        content:
          "Emir veren kişi açık komut verir, alan kişi aynen tekrar eder, emir veren doğru tekrar edildiğini teyit eder ve uygulama sonucu raporlanır. Dümen, makine, römorkör, mooring ve cargo rate değişikliklerinde bu döngü kullanılmalıdır. 'Okay' gibi belirsiz cevaplar yerine komutun içeriği tekrar edilir.",
        image: "/diagrams/communication/smcp-mesaj-isaretleri.svg",
        imageAlt: "SMCP message markers used to keep bridge communication unambiguous",
        bulletPoints: [
          "Order: 'Starboard ten.'",
          "Read-back: 'Starboard ten.'",
          "Confirmation: 'Starboard ten, correct.'",
          "Execution report: 'Wheel is starboard ten' / 'Steady on zero-eight-five.'",
        ],
      },
      {
        title: "Pilot ve Römorkör Haberleşmesi",
        content:
          "Pilotajda heading, course, speed, rate of turn, tug position ve bollard pull talimatları rakamları tek tek söyleyerek verilir. 'Push full' gibi yerel ifade kullanılıyorsa anlamı pilot-römorkör-köprüüstü arasında önceden netleştirilir. Anlaşılmayan talimat 'Say again' veya 'Confirm...' ile doğrulanır; tahmin edilerek uygulanmaz.",
      },
      {
        title: "VTS Raporlama Formatı",
        content:
          "VTS raporu çağrılan istasyon, gemi adı/call sign, rapor tipi, mevki, course, speed, draft, destination, ETA ve özel durumu içerir. Raporlama noktası öncesi kanal dinlenir ve gerekli bilgi hazırlanır. VTS advice veya instruction ayrımı anlaşılır; emniyetsiz talimat kaptana bildirilir.",
      },
      {
        title: "Terminal ve Cargo Control Haberleşmesi",
        content:
          "Loading/discharge rate, manifold pressure, tank change, topping-off, stop ve emergency shutdown mesajları sayısal değer ve birimle söylenir. 'Slow down' yerine hedef rate belirtilir. Kritik rate değişikliği iki tarafça read-back edilir ve değişimin gerçekleştiği tank/hat değerlerinden doğrulanır.",
      },
      {
        title: "Kaptana Durum Raporu",
        content:
          "Kaptana rapor kısa fakat karar vermeye yeterli olmalıdır: mevcut durum, risk, yapılan işlem, trend ve öneri. Örnek yapı: 'Visibility reduced to one mile; three targets inside six miles; closest CPA zero decimal five miles in twelve minutes; speed reduced to eight knots; I recommend calling an additional lookout.' Yalnız 'traffic is heavy' gibi yorumsuz ifade yetersizdir.",
      },
    ],
    keyPoints: [
      "Kritik emirler read-back ve sonuç raporuyla kapanır.",
      "Rakam, yön, birim ve hedef değer açık söylenir.",
      "Anlaşılmayan talimat tahmin edilmez; tekrar ve teyit istenir.",
      "Kaptana rapor durum + risk + eylem + öneri içerir.",
    ],
  },

  "Logbook, Statement ve Profesyonel Rapor Yazımı": {
    title: "Logbook, Statement ve Profesyonel Rapor Yazımı",
    introduction:
      "Gemi kayıtları denetim, kaza incelemesi ve hukuki uyuşmazlıkta resmi delildir. İyi kayıt kısa, kronolojik, tarafsız, ölçülebilir ve zaman damgalıdır. Sonradan yorum eklemek yerine olay anındaki gerçek yazılır.",
    sections: [
      {
        title: "Deck Logbook Kayıt İlkeleri",
        image: "/diagrams/communication/gemi-jurnali.svg",
        imageAlt: "What belongs in the deck log, what does not, and how to structure a statement",
        content:
          "Mevki, course, speed, weather, sea state, barometer, pilot, tug, all fast, anchor, restricted visibility, alarms, drills, equipment failure ve olağandışı olaylar gemi prosedüründeki aralık ve formatta yazılır. 'Normal' yerine ölçülebilir bilgi tercih edilir. Yanlış kayıt silinmez; tek çizgiyle okunabilir bırakılır, doğru bilgi ve paraf eklenir.",
      },
      {
        title: "Incident Statement",
        content:
          "Kişisel ifade yalnız kişinin gördüğü, duyduğu ve yaptığı işlemleri kronolojik anlatır. Başkasının niyetini veya kusurunu tahmin etmez. Tarih, saat sistemi, görev, konum, hava/aydınlatma, olay sırası, verilen/alınan emirler ve sonrası yazılır. 'Approximately' kullanılan değerler açıkça yaklaşık olarak belirtilir.",
      },
      {
        title: "Defect ve Equipment Failure Report",
        content:
          "Rapor ekipman kimliği, alarm/arıza zamanı, semptom, operasyonel etki, yapılan test, geçici tedbir, yedek düzen ve gereken destek bilgisini içerir. 'Radar not working' yerine hangi radar, hangi mod, hangi alarm ve hangi fonksiyonun kayıp olduğu belirtilir. Arızanın kesin kök nedeni bilinmiyorsa varsayım gerçek gibi yazılmaz.",
      },
      {
        title: "Near-Miss ve Safety Observation",
        content:
          "Near-miss raporu olayın potansiyel sonucunu, tehlikeyi, mevcut kontrolleri, neden kontrolün başarısız kaldığını ve önerilen düzeltmeyi içerir. Kişi adı yalnız gerekliyse kullanılır; amaç suçlama değil tekrarı önlemektir. Fotoğraf ve konum bilgisi eklenebilir.",
      },
      {
        title: "Letter of Protest ve Resmî E-posta Dili",
        content:
          "Resmî yazışma konu, olay zamanı, gözlenen gerçekler, geminin bildirimleri, karşı tarafın eylemi/eylemsizliği ve hakların saklı tutulduğu ifadeyle düzenlenir. Hakaret, tehdit, kesin kusur kabulü veya kanıtlanamayan sayı kullanılmaz. Ek listesi ve teslim kanıtı saklanır.",
      },
    ],
    keyPoints: [
      "Kayıtlar kısa, tarafsız, ölçülebilir ve kronolojiktir.",
      "Yanlış kayıt silinmez; usulüne uygun düzeltilir.",
      "İfade yalnız şahsen bilinen gerçekleri içermelidir.",
      "Arıza raporu operasyonel etki ve yedek tedbiri açıklar.",
    ],
  },

  "Acil Durum İngilizcesi ve Standart Durum Raporları": {
    title: "Acil Durum İngilizcesi ve Standart Durum Raporları",
    introduction:
      "Acil durumda uzun cümleler değil, doğru öncelik ve yapı hayat kurtarır. Gemi içi ve dışı mesajlar; kimlik, yer, olay, ihtiyaç, kişi durumu ve niyet sırasıyla hazırlanmalıdır.",
    sections: [
      {
        title: "MAYDAY ve PAN-PAN Sonrası Güncelleme",
        content:
          "İlk distress/urgency mesajından sonra durum değiştikçe kısa SITREP verilir: current position, nature of distress, damage/flooding/fire status, persons on board/injured/missing, assistance required ve master's intentions. Aynı bilgiler çelişkili rakamlarla tekrarlanmaz; her güncelleme zamanı belirtilir.",
        image: "/diagrams/communication/smcp-mesaj-isaretleri.svg",
        imageAlt: "Standard message markers used in distress and urgency traffic",
      },
      {
        title: "Fire Party Raporları",
        content:
          "Olay yeri ekibi raporu şu yapıda verir: location, smoke/fire condition, casualties, boundary temperature, action taken, equipment/backup required. Örnek: 'Fire party one to bridge: heavy smoke in purifier room, no flame visible, boundary cooling established, two BA teams ready, request ventilation shutdown confirmation.'",
      },
      {
        title: "Flooding ve Damage Control Raporları",
        content:
          "Flooding raporu mahal, su seviyesi/trendi, tahmini giriş noktası, pompa durumu, bulkhead durumu, list/trim etkisi ve ihtiyaç bilgisini içerir. 'Water is increasing' yerine mümkünse sounding farkı ve süre verilir. Ölçüm yapılamıyorsa bu açıkça belirtilir.",
      },
      {
        title: "Medical Advice Mesajı",
        content:
          "Mesaj hasta yaşı/cinsiyeti, olay zamanı, chief complaint, consciousness, airway/breathing/circulation, vital signs, injuries, allergies, medication, treatment given ve evacuation possibility bilgisini içerir. Doktor talimatı kelimesi kelimesine read-back edilir.",
      },
      {
        title: "MOB ve SAR Haberleşmesi",
        content:
          "MOB mesajında time, position, side, description, flotation aid, weather/current, search action ve assistance required belirtilir. Olay yeri koordinasyonunda search pattern, assigned sector, course/speed ve contact frequency tekrar edilir. 'Person seen/not seen' durumu düzenli güncellenir.",
      },
    ],
    keyPoints: [
      "Acil mesaj kimlik + yer + olay + ihtiyaç + kişi durumu + niyet yapısını izler.",
      "SITREP değişen durumu zaman damgasıyla günceller.",
      "Olay yeri raporu ölçülebilir trend ve ihtiyaç içermelidir.",
      "Tıbbi talimatlar kelimesi kelimesine read-back edilir.",
    ],
  },

  "Denetim, Surveyor ve PSC ile Mesleki İletişim": {
    title: "Denetim, Surveyor ve PSC ile Mesleki İletişim",
    introduction:
      "Denetimde amaç ezberlenmiş cevap vermek değil; ekipmanı gerçekten bilmek, kaydı göstermek ve sınırı dürüstçe ifade etmektir. Yanlış bilgi veya uydurma cevap, küçük eksikliği ciddi güven sorununa dönüştürür.",
    sections: [
      {
        title: "Ekipmanı Göstererek Açıklama",
        image: "/diagrams/communication/psc-denetimi.svg",
        imageAlt: "How a port state control inspection escalates, the action codes and how to conduct yourself",
        content:
          "Zabit ekipmanın konumunu, amacını, normal durumunu, test yöntemini, son test kaydını ve arızada yedek tedbiri açıklayabilmelidir. 'It is checked regularly' yerine kayıt ve tarih gösterilir. Test yalnız güvenli ve yetkili şartlarda yapılır; inspector talebi olsa dahi tehlikeli yanlış aktivasyon yapılmaz.",
      },
      {
        title: "Bilmediğinde Doğru Cevap",
        content:
          "Kesin bilinmeyen sayı veya kural uydurulmaz. Uygun cevap: 'I do not want to give you an incorrect figure. I will verify it in the approved manual/certificate.' Ardından gerçekten belge bulunur ve cevap tamamlanır. Gemiye özel manual, certificate ve SMS prosedürü genel hafızadan üstündür.",
      },
      {
        title: "Deficiency Görüşmesi",
        content:
          "Eksiklik iddiası dikkatle dinlenir, hangi kural veya gözleme dayandığı sorulur, mevcut kayıt ve ekipman gösterilir. Tartışma saldırganlaştırılmaz. Anlaşılan eksiklik için immediate corrective action, responsible person ve target time belirtilir. Kapatılamayan eksiklik şirket/klas/bayrakla koordine edilir.",
      },
      {
        title: "Survey ve Cargo Claim İletişimi",
        content:
          "Surveyora erişim ve emniyet sağlanır; fakat gemi adına hukuki sorumluluk kabul edilmez. Ortak ölçüm, numune ve fotoğraflar birlikte kaydedilir. İmzalanan belgeler okunur; yanlış veya eksik ifadeye reservation eklenir. Orijinal kayıtların kontrolsüz alınmasına izin verilmez, kopya ve teslim kaydı tutulur.",
      },
    ],
    keyPoints: [
      "Denetimde bilgi ekipman ve kayıtla gösterilir.",
      "Bilinmeyen değer uydurulmaz; onaylı belgeden doğrulanır.",
      "Deficiency görüşmesi kanıt, düzeltici eylem ve süre üzerinden yürür.",
      "Survey sırasında emniyet sağlanır ancak yetkisiz sorumluluk kabul edilmez.",
    ],
  },
};
