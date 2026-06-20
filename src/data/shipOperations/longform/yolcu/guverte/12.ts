import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "SOLAS uyum kontrolü ve can kurtarma ekipmanı bakımı",
  shipType: "yolcu",
  dept: "guverte",
  opIndex: 12,
  estimatedPages: 16,
  intro: `Yolcu gemilerinde LSA (lifeboat, life raft, lifejacket, MES) ekipmanı yüksek sayıda yolcu için tam ve hazır olmalıdır; LSA Code uyumlu bakım ve testler kritiktir. Bu bölüm LSA bakımını ele alır.`,
  sources: ["SOLAS III", "LSA Code", "MSC.1/Circ.1206 (lifeboat maintenance)"],
  chapters: [
    {
      heading: "1. LSA Bakımı",
      sections: [
        {
          subheading: "1.1 Filika/sal/can yeleği",
          paragraphs: [
            `Lifeboat/davit, life raft (servis tarihi), lifejacket ve MES periyodik test/bakıma tabidir; release gear bakımı maker prosedürüyle yapılır. Yolcu sayısına yetecek kapasite doğrulanır.`,
          ],
          bullets: [`Lifeboat/davit/release gear`, `Life raft servis tarihi`, `Lifejacket sayı/kondisyon`, `MES test`],
        },
      ],
    },
    {
      heading: "2. Kontrol Listesi",
      sections: [
        {
          subheading: "2.1 Son kontrol",
          bullets: [`LSA kapasitesi yeterli mi?`, `Servis tarihleri geçerli mi?`, `Release gear bakımı yapıldı mı?`, `Kayıt tutuldu mu?`],
          paragraphs: [`Yolcu gemisinde LSA eksikliği toplu can kaybı riski demektir; bakım taviz kaldırmaz.`],
        },
      ],
    },
  ],
};

export default content;
