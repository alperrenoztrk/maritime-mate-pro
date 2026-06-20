import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "SART (Search and Rescue Transponder)",
  sectionId: "gmdss-lsa",
  topicIndex: 5,
  estimatedPages: 20,
  intro: `SART (Search and Rescue Transponder), can kurtarma aracında (filika/sal) bulunan ve bir arama radarının darbesini alınca yanıt vererek o radarın ekranında konum gösteren, GMDSS "locating" işlevini sağlayan cihazdır. İki tip vardır: radar-SART (9 GHz radara yanıt) ve AIS-SART (AIS konumu yayınlar). Bu bölüm; radar-SART çalışmasını ve radar ekranındaki gösterimi (blip dizisi), AIS-SART farkını, aktivasyon ve menzili, can kurtarma aracında kullanımı ve yerleşimi, SOLAS gereksinimini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. III & IV — SART carriage",
    "IMO Res. — radar SART & AIS-SART standards",
    "IMO GMDSS Manual",
    "Üretici el kitapları (SART)",
  ],
  chapters: [
    {
      heading: "1. Radar-SART",
      sections: [
        {
          subheading: "1.1 Çalışma ve gösterim",
          paragraphs: [
            `Radar-SART, 9 GHz (X-band) arama radarının darbesini alınca aynı frekansta bir dizi yanıt darbesi gönderir; bu, radar ekranında SART'tan dışa doğru sıralanan 12 noktalık (blip) bir çizgi olarak görünür. Yakınlaşınca noktalar yaylara dönüşür. Bu desen SART'ın yerini açıkça gösterir.`,
          ],
          bullets: [
            `9 GHz radar darbesine yanıt verir`,
            `Ekranda 12 nokta dizisi (SART'tan dışa)`,
            `Yaklaşınca noktalar yaya dönüşür`,
          ],
          callouts: [
            {
              type: "tip",
              title: "S-band'de görünmez",
              text: `Radar-SART yalnızca X-band (9 GHz) radara yanıt verir; S-band (3 GHz) radarda görünmez. SAR aramasında X-band kullanılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. AIS-SART ve Menzil",
      sections: [
        {
          subheading: "2.1 AIS-SART",
          paragraphs: [
            `AIS-SART, radar yerine AIS üzerinden çalışır: dahili GPS konumunu özel bir AIS mesajı olarak yayınlar; yakındaki gemilerin AIS ekranında SART konumu sembolle belirir. Radar-SART'a alternatif/tamamlayıcıdır ve konumu sayısal verir.`,
          ],
          table: {
            headers: ["Tip", "Çalışma", "Gösterim"],
            rows: [
              ["Radar-SART", "9 GHz radara yanıt", "Radar ekranı blip dizisi"],
              ["AIS-SART", "AIS konum yayını", "AIS ekranı SART sembolü"],
            ],
          },
        },
        {
          subheading: "2.2 Menzil",
          paragraphs: [
            `Menzil yüksekliğe bağlıdır; SART ne kadar yüksekte tutulursa (örn. salda direğe kaldırılırsa) menzil o kadar artar. Tipik olarak gemiden ~8 mil, uçaktan çok daha uzaktan algılanır. Su yüzeyine yakın SART menzili düşer.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kullanım ve Yerleşim",
      sections: [
        {
          subheading: "3.1 Can kurtarma aracında kullanım",
          paragraphs: [
            `Gemi terk edilirken SART filikaya/sala alınır ve aktive edilir; mümkün olduğunca yüksekte tutulur. Aktive SART, hem radar hem AIS yardımıyla SAR araçlarının can kurtarma aracını bulmasını sağlar. SART köprüde kolay erişilir, taşınabilir yerde bulundurulur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yerleşim",
              text: `SART, gemi terk durumunda hızla can kurtarma aracına götürülebilecek bir konumda saklanır; yeri ve taşınması tatbikatlarda denenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım ve test",
          paragraphs: [
            `Bakım; batarya son kullanma tarihi, self-test (radar yakınında test modu), gövde/su geçirmezlik ve braket kontrolünü kapsar. Test, gerçek SAR yayını yapmadan üreticinin test prosedürüyle yapılır.`,
          ],
          bullets: [
            `Batarya son kullanma takibi`,
            `Self-test (test modunda)`,
            `Su geçirmezlik ve braket kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Radarda görünmüyor", "S-band kullanımı/arıza", "X-band kullan, SART test"],
              ["Test başarısız", "Batarya/elektronik", "Batarya/servis"],
              ["Menzil kısa", "Düşük tutuluyor", "Mümkün olduğunca yükselt"],
              ["AIS-SART konum yok", "GPS/elektronik", "Cihaz testi/değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
