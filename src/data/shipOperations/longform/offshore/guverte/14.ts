import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP destekli dalış operasyonu",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 14,
  estimatedPages: 22,
  intro: `DP destekli dalışta hedef, dalış çanı ve dalgıçların sualtı yapıları ile thrusterlardan emniyetli mesafede tutulması ve WCF sonrası güvenle geri alınmasıdır. Thruster suction/discharge akımı ve pervane teması ölümcüldür; bu yüzden thrust inhibition, green light sistemi ve dive control ile kesintisiz iletişim mutlaktır. Bu bölüm dalış DP'sini ele alır.`,
  sources: [
    "IMO 2023 Diving Code",
    "IMCA D010 (Diving Ops from DP Vessels)",
    "IMCA M103",
    "Vessel diving operations manual",
  ],
  chapters: [
    {
      heading: "1. Dalış Öncesi Hazırlık",
      sections: [
        {
          subheading: "1.1 Checklist ve gösterim",
          bullets: [
            `CAMO, pre-dive/periodic DP checklist ve permit to commence operations`,
            `Bell, diver, downline, habitat, mooring hattı ve engelleri DP ekranı/plot üzerinde göster`,
            `Tending point'e göre yasaklı thrusterları ve thrust limitlerini onaylı prosedürle uygula`,
          ],
        },
      ],
    },
    {
      heading: "2. Dalış Sırasında Kontrol",
      sections: [
        {
          subheading: "2.1 Green light ve iletişim",
          paragraphs: [
            `Dive control ile green light, dalgıç/çan durumu, çalışma derinliği ve geri alma süresi sürekli paylaşılır. Baş veya mevki değişikliği önceden dive control'e bildirilir; açık onay olmadan hareket edilmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Thruster ve downline tehlikesi",
              text: `Thruster suction/discharge akımı ve pervane teması ölümcüldür. Anchor chain, mooring line ve downline'lar dalgıç/umbilical için dolaşma tehlikesidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Acil geri alma",
          paragraphs: [
            `Yellow/Red durumda dalış çanı geri alma ve acil kurtarma planı ASOG'a göre başlatılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Dalış son kontrol",
          bullets: [
            `Pre-dive DP checklist ve permit to dive tamam mı?`,
            `Yasaklı thruster/thrust inhibition uygulandı mı?`,
            `Green light ve dive control iletişimi kesintisiz mi?`,
            `Acil bell recovery planı hazır ve ASOG'a bağlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
