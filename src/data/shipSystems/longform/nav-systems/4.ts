import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Gyro Pusula ve Manyetik Pusula",
  sectionId: "nav-systems",
  topicIndex: 4,
  estimatedPages: 24,
  intro: `Pusula, gemiye yön referansı sağlayan temel seyir cihazıdır. Gyro pusula (jiroskopik pusula) gerçek kuzeyi (true north) gösterir ve köprü, dümen, radar/ECDIS gibi sistemlere heading besler; manyetik pusula ise dünya manyetik alanına dayanır, elektrik gerektirmez ve gyro arızasında bağımsız yedek sağlar. Bu bölüm; gyro pusulanın çalışma prensibini (gyroscopic inertia, precession), hata kaynaklarını (latitude/speed/ballistic error), manyetik pusula sapma (deviation) ve değişimini (variation), pusula düzeltmesini ve repeater/bakım konularını mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19 — compass carriage",
    "IMO Res. A.382(X) — magnetic compasses",
    "IMO Res. A.424(XI) — gyro-compass performance",
    "Admiralty Manual of Navigation",
  ],
  chapters: [
    {
      heading: "1. Gyro Pusula",
      sections: [
        {
          subheading: "1.1 Çalışma prensibi",
          paragraphs: [
            `Gyro pusula, yüksek hızda dönen bir rotorun açısal momentum koruması (gyroscopic inertia) ve dünyanın dönüşü ile etkileşiminden (precession) yararlanır. Yer çekimi/sönümleme düzeneğiyle rotor ekseni gerçek kuzeye yönelir (north-seeking) ve orada kalır (north-settling). Böylece manyetik alandan bağımsız, gerçek kuzey referansı elde edilir.`,
          ],
          bullets: [
            `Gyroscopic inertia: dönen rotor eksenini korur`,
            `Precession: dünya dönüşüyle eksen kuzeye yönelir`,
            `Damping: salınımı söndürüp kuzeyde durdurur`,
          ],
        },
        {
          subheading: "1.2 Gyro hataları",
          paragraphs: [
            `Gyro pusula bazı sistematik hatalar gösterir: latitude (settling) error, speed/course/latitude error (gemi hızı ve enleminin yarattığı sapma) ve manevra sırasındaki ballistic deflection. Modern gyrolar bunları otomatik düzeltir ama prensip bilinmelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Speed/latitude error",
              text: `Yüksek hız ve yüksek enlemde gyro hatası büyür; otomatik düzeltme için gemi hızı ve enlemi doğru girilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Manyetik Pusula",
      sections: [
        {
          subheading: "2.1 Variation ve deviation",
          paragraphs: [
            `Manyetik pusula manyetik kuzeyi gösterir. Gerçek kuzeyle manyetik kuzey arasındaki açı variation (değişim) olup haritadan/yıllık değişimle alınır. Geminin kendi manyetik alanının yarattığı sapma ise deviation'dır ve gemi başına/yüke göre değişir; deviation card (sapma cetveli) ile pusula başına verilir.`,
          ],
          table: {
            headers: ["Terim", "Tanım", "Kaynak"],
            rows: [
              ["Variation", "True ↔ Magnetic kuzey açısı", "Harita / yıllık değişim"],
              ["Deviation", "Magnetic ↔ Compass açısı", "Gemi mıknatıslığı, deviation card"],
              ["Compass error", "Variation + Deviation", "Toplam düzeltme"],
            ],
          },
        },
        {
          subheading: "2.2 Düzeltme zinciri (CADET)",
          paragraphs: [
            `Compass → True dönüşümünde sapma ve değişim sırayla uygulanır. Doğu (E) hataları çıkarılır/eklenir kuralı ezberlenmeli; klasik "CADET — Compass ADd East (to get True)" mnemoniği kullanılır. Pusula hatası, semt cisimlerinin (güneş/yıldız) kerterizi veya iki cisim hizası (transit) ile düzenli ölçülür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Pusula hatası kontrolü",
              text: `Güneş azimutu veya bilinen iki nesne hizası (leading line) ile gözlenen kerteriz, hesaplanan gerçek kerterizle karşılaştırılarak pusula hatası bulunur ve kaydedilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Repeater, Yedeklilik ve Bakım",
      sections: [
        {
          subheading: "3.1 Repeater ve sistem dağıtımı",
          paragraphs: [
            `Gyro heading; köprü repeater'ları, dümen, radar/ECDIS, AIS ve otopilota dağıtılır. Repeater'lar ana gyroyu birebir izlemeli; sapma varsa senkronizasyon kontrol edilir. Manyetik pusula bir periskop/ayna (reflector) ile köprüden okunabilir.`,
          ],
        },
        {
          subheading: "3.2 Arıza ve bakım tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Gyro kuzeyi bulamıyor/sürekli kayıyor", "Besleme/rotor/servis sorunu", "Settling süresi bekle, servis"],
              ["Repeater gyrodan farklı", "Senkron kaybı", "Repeater'ı ana gyroya senkronla"],
              ["Manyetik pusula okunmuyor", "Sıvı kabarcığı/aydınlatma", "Sıvı doldurma, aydınlatma onarımı"],
              ["Aşırı deviation", "Yük/yeni manyetik kaynak", "Pusula ayarı (adjuster), kart güncelle"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Yedek zorunluluğu",
              text: `Gyro arızasında gemi seyri manyetik pusula ile sürdürülebilmelidir; bu nedenle manyetik pusula çalışır ve güncel deviation card'lı olmalıdır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
