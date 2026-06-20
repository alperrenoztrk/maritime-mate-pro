import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ballast/deballast operasyonu (trim düzenleme)",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 8,
  estimatedPages: 14,
  intro: `Ro-Ro'da rampa açısını ve araç giriş-çıkışını kolaylaştırmak için trim ballast ile ayarlanır; yükleme/boşaltma sırasında trim ve liste yönetilir. Bu bölüm ballast/trim operasyonunu ele alır.`,
  sources: ["IS Code 2008", "BWM Convention (D-2)", "Loading manual"],
  chapters: [
    {
      heading: "1. Trim Yönetimi",
      sections: [
        {
          subheading: "1.1 Rampa açısı ve denge",
          paragraphs: [
            `Trim, rampa eğimini araç geçişi için uygun tutacak şekilde ayarlanır; aşırı liste araç dengesini bozar. Loadicator ile kontrol edilir, BWTS aktif (D-2).`,
          ],
          bullets: [`Rampa açısı için trim`, `Liste yönetimi`, `BWTS aktif`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`Trim rampa için uygun mu?`, `Liste kontrol altında mı?`, `BWTS aktif mi?`, `BWRB güncel mi?`],
        },
      ],
    },
  ],
};

export default content;
