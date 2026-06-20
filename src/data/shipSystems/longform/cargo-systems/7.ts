import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Cargo Gear (Vinç ve Derikler)",
  sectionId: "cargo-systems",
  topicIndex: 7,
  estimatedPages: 23,
  intro: `Cargo gear (yük donanımı), gemi kendi imkanıyla yük elleçleyen vinç, derik ve kaldırma donanımının bütünüdür; rıhtım kreni olmayan limanlarda ve genel kargo/dökme yük operasyonlarında vazgeçilmezdir. Bu bölüm; cargo gear tiplerini (jib/knuckle crane, derik/union purchase), kaldırma donanımı zincirini (halat-blok-kanca-sapan), SWL ve load-radius ilişkisini, sertifikasyon ve register (ILO 152) gereksinimini, kaldırma operasyonu emniyetini (signalman, taglines) ve bakım/arızayı kargo perspektifinden ele alır.`,
  sources: [
    "ILO Convention 152 — dock work safety",
    "SOLAS Ch. VI — cargo handling",
    "Register of Lifting Appliances & Cargo Handling Gear",
    "Lloyd's/DNV lifting appliance kuralları",
  ],
  chapters: [
    {
      heading: "1. Cargo Gear Tipleri",
      sections: [
        {
          subheading: "1.1 Vinç ve derik",
          paragraphs: [
            `Modern gemilerde döner hidrolik jib/knuckle boom kreni tek operatörle hızlı elleçleme sağlar. Klasik derik (derrick) sistemi ise union purchase (yumako) düzeninde iki derikle sabit noktalar arasında yük taşır; ucuz ama yavaş ve sınırlı manevralıdır.`,
          ],
          bullets: [
            `Jib/knuckle crane: hızlı, hassas, döner`,
            `Derik (union purchase): sabit, yavaş`,
            `Heavy lift derrick: ağır parça için özel`,
          ],
        },
      ],
    },
    {
      heading: "2. Kaldırma Donanımı ve SWL",
      sections: [
        {
          subheading: "2.1 Donanım zinciri",
          paragraphs: [
            `Kaldırma donanımı; tel halat, blok/makara, kanca, kilit (shackle), sapan (sling) ve döner (swivel) elemanlarından oluşur. Her elemanın SWL'i vardır; zincirdeki en zayıf eleman tüm sistemin limitini belirler. Sapan açısı arttıkça bacak yükü artar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sapan açısı etkisi",
              text: `Sapan bacakları arasındaki açı büyüdükçe her bacaktaki gerilim hızla artar; geniş açı SWL'i tehlikeli şekilde aşabilir. Açı kontrol edilmelidir.`,
            },
          ],
        },
        {
          subheading: "2.2 SWL ve load-radius",
          paragraphs: [
            `Vinçte SWL sabit değildir; yarıçap arttıkça yük momenti (yük × yarıçap) sabit kalacak şekilde izin verilen yük azalır. Operatör load chart'a uymak zorundadır; aşırı yük overload cut-off ile durdurulur.`,
          ],
          table: {
            headers: ["Yarıçap (m)", "İzin verilen yük (t)"],
            rows: [
              ["6", "40"],
              ["12", "20"],
              ["20", "12"],
              ["24", "10"],
            ],
            caption: "Örnek load chart (sabit moment)",
          },
        },
      ],
    },
    {
      heading: "3. Sertifikasyon ve Operasyon",
      sections: [
        {
          subheading: "3.1 Register ve test",
          paragraphs: [
            `Kaldırma donanımı proof load testinden geçer ve "Register of Lifting Appliances and Cargo Handling Gear" içinde belgelenir; yetkili kişi (competent person) muayenesi ILO 152 gereğidir. Sertifikalar PSC/denetimde kontrol edilir.`,
          ],
          table: {
            headers: ["İşlem", "Periyot"],
            rows: [
              ["Yetkili muayene", "12 ay"],
              ["Proof load testi", "5 yıl / tamir sonrası"],
              ["Kullanım öncesi görsel", "Her operasyon"],
            ],
          },
        },
        {
          subheading: "3.2 Operasyon emniyeti",
          paragraphs: [
            `Kaldırma sırasında işaretçi (signalman/banksman), tagline (yön ipi), yük altında durmama ve net iletişim esastır. Ani kaldırma (snatch lift), aşırı yük ve kontrolsüz savrulma yasaktır. Stabilite ve liste kontrolü ağır kaldırmada yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; tel halat tel kopması/aşınma kontrolü, blok/makara yatağı, kanca emniyet mandalı, hidrolik sistem ve overload cut-off testini kapsar. Halat ret kriterleri (tel kopması/çap incelmesi) sıkı uygulanır.`,
          ],
          bullets: [
            `Halat tel kopması/aşınma ret kriteri`,
            `Kanca safety latch ve deformasyon`,
            `Overload cut-off fonksiyon testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Kaldırma zayıf/yavaş", "Hidrolik basınç", "Pompa/relief kontrolü"],
              ["Yük kayması (drift)", "İç sızıntı/valf", "Yön valfi/silindir keçesi"],
              ["Halat hasarı", "Aşınma/yorulma", "Halat değişimi"],
              ["Overload sürekli durduruyor", "Yük/ayar/sensör", "Yük doğrula, sensör kalibrasyon"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
