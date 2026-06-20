import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Vinç, gangway ve rampa sistemi bakımı",
  shipType: "yolcu",
  dept: "makine",
  opIndex: 23,
  estimatedPages: 14,
  intro: `Yolcu gemilerinde gangway ve (varsa) shell door/rampa, yolcu giriş-çıkış güvenliğinin parçasıdır; hidrolik, fren ve kilit sistemleri bakım gerektirir. Bu bölüm gangway/rampa bakımını ele alır.`,
  sources: ["Maker manuals", "Class Rules"],
  chapters: [
    {
      heading: "1. Bakım",
      sections: [
        {
          subheading: "1.1 Hidrolik/fren/kilit",
          paragraphs: [
            `Gangway ve shell door hidroliği, fren ve kilit sistemleri bakıma alınır; SWL ve güvenlik ağı/korkuluk kontrol edilir. Yolcu kullanımı için güvenli kondisyon doğrulanır.`,
          ],
          bullets: [`Hidrolik/fren bakımı`, `Kilit/SWL`, `Korkuluk/güvenlik ağı`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Hidrolik/fren uygun mu?`, `Kilit/SWL doğru mu?`, `Korkuluk sağlam mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Gangway, yolcu yaralanmalarının sık yaşandığı noktadır; bakım ve güvenlik önemlidir.`],
        },
      ],
    },
  ],
};

export default content;
