import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Heading, hareket ve rüzgâr sensörü yönetimi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 8,
  estimatedPages: 20,
  intro: `DP modeli; gyro (heading), MRU/VRS (roll-pitch-heave) ve rüzgâr sensörlerinden gelen veriye güvenir. Bu sensörlerden birinin hatalı ama makul görünen veri üretmesi, modele yanlış girdi vererek gereksiz ve ters yönlü thrust yaratır. Bu bölüm sensör doğruluğu, yedekliliği ve arıza teşhisini ele alır.`,
  sources: [
    "IMCA M252",
    "IMCA M103",
    "Maker sensor manuals",
  ],
  chapters: [
    {
      heading: "1. Sensör Doğrulama",
      sections: [
        {
          subheading: "1.1 Çapraz karşılaştırma",
          bullets: [
            `Tüm gyroları manyetik pusula, GNSS heading veya bağımsız kaynaklarla karşılaştır`,
            `MRU/VRS roll-pitch verisini ve mount/lever-arm parametrelerini kontrol et`,
            `Rüzgâr sensörünün gölgelenme, egzoz ve yapı etkisini başa göre değerlendir`,
          ],
        },
        {
          subheading: "1.2 Rüzgâr feed-forward",
          callouts: [
            {
              type: "warning",
              title: "Ters yönlü thrust",
              text: `Rüzgâr feed-forward hatası, DP'nin gereksiz ve ters yönlü thrust üretmesine yol açabilir; gölgelenmiş sensör güvenilmez veri verir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Arıza Teşhisi ve Ortak Hata",
      sections: [
        {
          subheading: "2.1 Voting ve trend",
          paragraphs: [
            `Sensör fark alarmında hatalı kaynak trend, voting ve bağımsız gözlemle teşhis edilir. Sensör devre dışı bırakıldığında consequence analysis ve ASOG durumu yeniden kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ortak besleme tuzağı",
              text: `Ortak güç beslemesi veya ortak veri yolu, fiziksel olarak ayrı sensörleri tek hata noktasına çevirebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Sensör son kontrol",
          bullets: [
            `Tüm gyrolar bağımsız kaynakla karşılaştırıldı mı?`,
            `MRU/VRS ve rüzgâr sensörü tutarlı mı?`,
            `Ortak besleme/veri yolu riski değerlendirildi mi?`,
            `Sensor comparison log ve kalibrasyon durumu güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
