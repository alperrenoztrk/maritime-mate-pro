import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Reefer konteyner set-point, supply air sıcaklık ve alarm takibi",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 16,
  intro: `Reefer (soğutmalı) konteynerler, hassas yüklerin (gıda, ilaç) sıcaklık zincirini korur; set-point, supply/return air sıcaklığı ve alarmlar düzenli izlenir. İzleme ihmali ticari kayıp ve cargo claim yaratır. Bu bölüm reefer takibini ele alır.`,
  sources: ["Shipper reefer instructions", "Reefer maker manuals"],
  chapters: [
    {
      heading: "1. İzleme",
      sections: [
        {
          subheading: "1.1 Set-point ve sıcaklık",
          paragraphs: [
            `Her reefer'ın set-point'i shipper talimatıyla doğrulanır; supply air sıcaklığı kontrol değişkenidir. Günlük (genelde 2x) reefer log tutulur; alarmlar derhal incelenir.`,
          ],
          bullets: [`Set-point shipper talimatına uygun`, `Supply air sıcaklığı izleme`, `Günlük reefer log`, `Alarm müdahalesi`],
        },
      ],
    },
    {
      heading: "2. Arıza ve Kayıt",
      sections: [
        {
          subheading: "2.1 Müdahale",
          paragraphs: [
            `Alarm veren reefer hızlıca incelenir (plug, defrost, kompresör); çözülemezse makine ekibi ve şirket bilgilendirilir, olay belgelenir.`,
          ],
          callouts: [
            { type: "warning", title: "Soğuk zincir", text: `Sıcaklık sapması kargonun bozulmasına ve ağır cargo claim'e yol açar; alarm geciktirilmeden ele alınır.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Set-point'ler doğrulandı mı?`, `Log tutuluyor mu?`, `Alarmlar ele alındı mı?`, `Arızalar belgelendi mi?`],
        },
      ],
    },
  ],
};

export default content;
