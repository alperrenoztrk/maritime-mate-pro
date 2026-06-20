import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Emergency shutdown (ESD) sistemi testi",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 14,
  intro: `Emergency Shutdown (ESD) sistemi, kargo transferinde acil durumda akışı güvenli ve hızlı şekilde durduran ship/shore bağlantısıdır. Transfer öncesi ESD link ve dry-break coupling testi, dökülme/yangın riskini sınırlayan kritik bir doğrulamadır. Bu bölüm ESD test ve operasyonunu ele alır.`,
  sources: ["ISGOTT 6th edition", "Terminal ESD interface procedures"],
  chapters: [
    {
      heading: "1. ESD Prensibi",
      sections: [
        {
          subheading: "1.1 Ship/shore link",
          paragraphs: [
            `ESD link, gemi ve terminalin acil durdurma sinyallerini paylaşmasını sağlar; aktivasyonda pompalar durur ve valfler güvenli sırayla kapanır. Hızlı kapanma basınç şoku (surge) yaratabileceğinden kapanma süresi maker spesinde olmalıdır.`,
          ],
          bullets: [
            `Pre-transfer ESD link testi`,
            `Kapanma süresi (surge'ü önleyecek) doğru mu?`,
            `Dry-break/ERC (emergency release) hazır mı?`,
          ],
        },
      ],
    },
    {
      heading: "2. Test ve Kayıt",
      sections: [
        {
          subheading: "2.1 Aktivasyon testi",
          paragraphs: [
            `Transfer öncesi ESD aktivasyonu test edilir; sistemin pompayı/valfi doğru sırayla durdurduğu doğrulanır. Sonuç ESD test log'a işlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Surge riski",
              text: `Çok hızlı valf kapanması basınç şoku (surge) ile hat/hortum hasarı yapabilir; kapanma süresi spesifikasyona uygun olmalı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Son kontrol",
          bullets: [
            `ESD link test edildi mi?`,
            `Kapanma süresi spes içinde mi?`,
            `Dry-break coupling hazır mı?`,
            `ESD test log dolduruldu mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
