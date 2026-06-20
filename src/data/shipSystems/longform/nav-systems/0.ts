import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Radar Sistemi",
  sectionId: "nav-systems",
  topicIndex: 0,
  estimatedPages: 27,
  intro: `Radar (Radio Detection and Ranging), elektromanyetik darbeleri yayıp hedeflerden yansıyanları ölçerek çevredeki gemi, kara ve şamandıraların mesafe ve kerterizini belirleyen birincil çatışmayı önleme ve seyir cihazıdır. ARPA (Automatic Radar Plotting Aid) ile hedef takibi, CPA/TCPA hesabı ve manevra değerlendirmesi yapılır. Bu bölüm; radar fiziğini (darbe, frekans bandı, anten), X-band ve S-band farkını, ARPA izleme ve çatışmayı önleme kullanımını, deniz/yağmur clutter ve yorumlama hatalarını, SOLAS donatım gereksinimlerini ve bakım/arızayı mühendislik derinliğinde işler.`,
  sources: [
    "SOLAS Ch. V Reg. 19 — radar/ARPA carriage",
    "COLREG Rule 6, 7, 8, 19 — radar kullanımı",
    "IMO Res. MSC.192(79) — radar performance standards",
    "IMO Res. A.823(19) — ARPA standards",
    "Bridge Procedures Guide (ICS)",
  ],
  chapters: [
    {
      heading: "1. Radar Fiziği ve Bileşenler",
      sections: [
        {
          subheading: "1.1 Çalışma prensibi",
          paragraphs: [
            `Radar, anten üzerinden çok kısa süreli yüksek güçlü mikrodalga darbeleri yayar. Darbe bir hedefe çarpıp geri döner; gidiş-dönüş süresinden mesafe (R = c·t/2), anten yönünden ise kerteriz hesaplanır. Ekranda gemi merkezde, hedefler mesafe halkaları üzerinde gösterilir.`,
          ],
          bullets: [
            `Magnetron/katı-hal verici darbe üretir`,
            `Döner anten kerteriz tarar (~24-45 dev/dk)`,
            `Alıcı zayıf yankıyı yükseltir`,
            `İşlemci ekranda PPI (Plan Position Indicator) görüntüsü oluşturur`,
          ],
        },
        {
          subheading: "1.2 X-band ve S-band",
          paragraphs: [
            `X-band (~9 GHz, 3 cm) yüksek çözünürlük ve küçük hedef tespiti sağlar ama yağmurdan etkilenir; SART ve racon tespiti X-band'dedir. S-band (~3 GHz, 10 cm) yağmur/sis içinde daha iyi nüfuz eder ve uzun menzilde kararlıdır. SOLAS, 3000 GT üstü gemilerde biri S-band olmak üzere iki radar ister.`,
          ],
          table: {
            headers: ["Özellik", "X-band (3 cm)", "S-band (10 cm)"],
            rows: [
              ["Çözünürlük", "Yüksek", "Daha düşük"],
              ["Yağmur/sis etkisi", "Fazla etkilenir", "Az etkilenir"],
              ["Küçük hedef", "İyi tespit", "Zayıf"],
              ["SART/Racon", "Tespit eder", "Genelde etmez"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. ARPA ve Çatışmayı Önleme",
      sections: [
        {
          subheading: "2.1 Hedef takibi ve CPA/TCPA",
          paragraphs: [
            `ARPA, seçilen veya otomatik kazanılan hedefleri izleyerek hız/rota vektörünü ve CPA (Closest Point of Approach) ile TCPA (Time to CPA) değerlerini hesaplar. Vektörler "true" (gerçek) veya "relative" (bağıl) modda gösterilebilir; relative vektör çatışma riskini, true vektör hedefin gerçek hareketini anlamak için kullanılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Rule 7",
              text: `Çatışma riski belirlenirken ARPA dahil tüm mevcut araçlar kullanılmalıdır. Yetersiz/varsayıma dayalı bilgiyle hareket edilmez; küçük CPA değişimlerine güvenilmez.`,
            },
          ],
        },
        {
          subheading: "2.2 Trial manoeuvre",
          paragraphs: [
            `ARPA trial (deneme) manevrası, planlanan rota/hız değişiminin tüm izlenen hedeflerle yeni CPA/TCPA'sını simüle eder. Manevranın yeterli ve erken olduğunu doğrulamak için kullanılır ancak gecikme süresi (delay) gerçekçi ayarlanmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yorumlama, Clutter ve Hatalar",
      sections: [
        {
          subheading: "3.1 Deniz ve yağmur clutter",
          paragraphs: [
            `Deniz yüzeyinden (sea clutter) ve yağmurdan (rain clutter) gelen yankılar gerçek hedefleri maskeleyebilir. Sea clutter (STC/anti-clutter sea) ve rain clutter (FTC/anti-clutter rain) ayarları bu gürültüyü bastırır; ancak aşırı bastırma küçük gerçek hedefleri de yok edebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aşırı clutter bastırma",
              text: `Anti-clutter aşırı açılırsa küçük tekneler, buz ve yüzen nesneler ekrandan kaybolur. Ayarlar dikkatle ve hedef kaybı pahasına yapılmamalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Yanıltıcı yankılar",
          paragraphs: [
            `Yan loblar (side echoes), çok yollu yansımalar (multiple/indirect echoes), gölgeleme (shadow sectors) ve interference (başka radarların paraziti) yanlış yorumlamaya yol açar. Bu artefaktları tanımak, ekranı doğru okumak için şarttır.`,
          ],
          bullets: [
            `Indirect echo: bacaya/derikten yansıma`,
            `Multiple echo: yakın büyük hedeften tekrarlı yankı`,
            `Shadow sector: yapı arkasında kör bölge`,
            `Second-trace echo: anormal yayılımda uzak kara`,
          ],
        },
      ],
    },
    {
      heading: "4. Donatım, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 SOLAS donatımı ve performans testi",
          paragraphs: [
            `SOLAS V/19, tonaja göre bir veya iki radar (ikincisi S-band) ister. Performans monitor (PM) çubuğu, vericinin gücünü ve alıcının duyarlılığını ekranda kontrol etmeye yarar; tuning ve PM düzenli kontrol edilir.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın arızalar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Görüntü yok / zayıf", "Magnetron ömrü, PM düşük", "PM testi, magnetron değişimi"],
              ["Anten dönmüyor", "Motor/tahrik arızası", "Tahrik ve besleme kontrolü"],
              ["Aşırı parazit", "Tuning bozuk, interference", "Tuning + interference reject"],
              ["Mesafe/kerteriz hatası", "Kalibrasyon, heading marker", "Heading marker ve VRM/EBL kalibrasyonu"],
            ],
          },
          callouts: [
            {
              type: "tip",
              title: "Heading marker",
              text: `Heading marker pruvayla tam hizalı olmalıdır; hatalı hizalama tüm kerteriz okumalarını kaydırır ve çatışma değerlendirmesini bozar.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
