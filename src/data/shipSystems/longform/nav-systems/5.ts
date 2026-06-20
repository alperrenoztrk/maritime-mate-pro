import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Echo Sounder (İskandil)",
  sectionId: "nav-systems",
  topicIndex: 5,
  estimatedPages: 21,
  intro: `Echo sounder (iskandil/eko ses cihazı), gemi karinasından gönderilen ses darbesinin deniz tabanından yansıyıp dönme süresini ölçerek su derinliğini belirleyen seyir emniyeti cihazıdır. UKC (Under Keel Clearance) yönetimi, sığ su seyri ve karaya oturmanın önlenmesinde temel araçtır. Bu bölüm; cihazın çalışma prensibini ve transducer'ı, derinlik ölçüm referansı (transducer/karina/su yüzeyi) ayarını, ölçüm hatalarını ve yanlış yankıları, sığ su alarmını ve SOLAS donatımı ile bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19.2.3.1 — echo sounding device",
    "IMO Res. MSC.74(69) Annex 4 — echo sounder standards",
    "Bridge Procedures Guide (ICS) — UKC management",
  ],
  chapters: [
    {
      heading: "1. Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Ses darbesi ve derinlik",
          paragraphs: [
            `Transducer (dönüştürücü), elektrik enerjisini ses darbesine çevirir; darbe deniz tabanına gider, yansır ve döner. Derinlik, gidiş-dönüş süresi ve sudaki ses hızından (≈1500 m/s) hesaplanır: D = (c·t)/2. Sonuç ekranda ve kayıt (echo trace) olarak gösterilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ses hızı varsayımı",
              text: `Cihaz sabit ~1500 m/s ses hızı varsayar; tuzluluk ve sıcaklık bunu değiştirir. Hassas çalışmada sapma kabul edilebilir sınırlarda kalır ama bilinmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Derinlik referansı",
          paragraphs: [
            `Echo sounder derinliği transducer'dan ölçer. Ekranda gösterilen değer; transducer'dan, karinanın en altından (keel) veya su yüzeyinden referanslanacak şekilde ofset ile ayarlanabilir. UKC değerlendirmesi için referansın net bilinmesi şarttır.`,
          ],
          table: {
            headers: ["Referans", "Anlamı", "Kullanım"],
            rows: [
              ["Transducer'dan", "Ham ölçüm", "Cihaz iç"],
              ["Karinadan (keel)", "Karina altı boşluk", "UKC değerlendirmesi"],
              ["Su yüzeyinden", "Toplam derinlik", "Harita karşılaştırma"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Hatalar ve Yorumlama",
      sections: [
        {
          subheading: "2.1 Yanlış yankılar",
          paragraphs: [
            `Yumuşak çamur tabanda zayıf yankı, yoğun balık sürüsü veya termoklin katmanı yanlış derinlik gösterebilir. Çift yankı (multiple echo) gerçek derinliğin katı olarak görünebilir. Sığ ve kritik sularda echo sounder okuması diğer kaynaklarla (harita, draft) çapraz kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çamur/balık yankısı",
              text: `Yumuşak tabanda cihaz çamurun üstünü mü altını mı okuduğu belirsiz olabilir; kritik UKC kararlarında muhafazakâr (en sığ) değer esas alınır.`,
            },
          ],
        },
        {
          subheading: "2.2 UKC yönetimi",
          paragraphs: [
            `UKC (karina altı boşluk), squat, gel-git, dalga ve tuzluluk etkileriyle değişir. Echo sounder gerçek zamanlı taban boşluğunu gösterir ve planlanan UKC ile karşılaştırılır. Sığ su seyrinde sürekli izlenir ve alarm seti uygun ayarlanır.`,
          ],
          bullets: [
            `Squat: hızla artan dalış, UKC'yi azaltır`,
            `Gel-git ve hava etkisi su seviyesini değiştirir`,
            `Sığ su alarmı UKC politikasına göre ayarlanır`,
          ],
        },
      ],
    },
    {
      heading: "3. Donatım, Bakım ve Arıza",
      sections: [
        {
          subheading: "3.1 SOLAS ve alarm",
          paragraphs: [
            `SOLAS V/19, derinlik ölçüm cihazı taşımayı zorunlu kılar. Sığ su (shallow) alarmı, seçilen güvenli derinliğin altına inildiğinde sesli/görsel uyarı verir; köprüde aktif tutulur.`,
          ],
        },
        {
          subheading: "3.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Derinlik okumuyor / '0'", "Transducer kirli/havalı, hat", "Transducer ve bağlantı kontrolü"],
              ["Düzensiz/zıplayan değer", "Hava kabarcığı, balık, gain", "Gain ayarı, hız azalt, teyit et"],
              ["Sürekli çift derinlik", "Multiple echo", "Range/gain ayarı, yorumla"],
              ["Alarm çalmıyor", "Set/ayar hatası", "Alarm seviyesini ve testini doğrula"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
