import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Rampa su geçirmezlik ve sızdırmazlık kontrolü",
  shipType: "ro-ro",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 16,
  intro: `Rampa ve bow/stern door sızdırmazlığı (weathertight/watertight), Ro-Ro güvenliğinin en kritik unsurudur; conta, kilit ve drainage düzenli kontrol edilir. Bu bölüm rampa sızdırmazlığını ele alır.`,
  sources: ["SOLAS II-1", "Rampa maker manuals", "Class survey requirements"],
  chapters: [
    {
      heading: "1. Sızdırmazlık",
      sections: [
        {
          subheading: "1.1 Conta ve kilit",
          paragraphs: [
            `Rubber seal/conta hasar açısından denetlenir; kilitler tam kapanmalı ve compression sağlanmalıdır. Drainage ve bilge alarm sistemleri test edilir.`,
          ],
          bullets: [`Conta kondisyonu`, `Kilit/compression`, `Drainage + bilge alarm`],
        },
      ],
    },
    {
      heading: "2. Güvenlik ve Kontrol",
      sections: [
        {
          subheading: "2.1 Su girişi",
          paragraphs: [
            `Sızdıran rampa/kapı, araç güvertesine su girişi ve hızlı stabilite kaybına yol açar; denize çıkmadan önce sızdırmazlık doğrulanır.`,
          ],
          callouts: [
            { type: "warning", title: "Su girişi", text: `Rampa/bow door sızıntısı Ro-Ro alabora felaketlerinin başlıca nedenidir; kontrol ihmal edilmez.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Conta sağlam mı?`, `Kilit/compression tam mı?`, `Drainage/bilge alarm çalışıyor mu?`, `Kalkış öncesi doğrulandı mı?`],
        },
      ],
    },
  ],
};

export default content;
