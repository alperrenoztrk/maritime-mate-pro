import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Stabilite ve trim hesabı (her yükleme adımı için)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 18,
  intro: `Stabilite ve trim, yalnız final kondisyonda değil her ara yükleme adımında IS Code ve damage stability kriterlerini sağlamalıdır. Sıvı yüklerde serbest yüzey etkisi (free surface effect) GM'yi ciddi düşürür. Bu bölüm adım adım stabilite doğrulamasını ele alır.`,
  sources: ["IS Code 2008", "MARPOL Annex I Reg. 28 (damage stability)", "Loading manual"],
  chapters: [
    {
      heading: "1. Ara Aşama Doğrulaması",
      sections: [
        {
          subheading: "1.1 Free surface effect",
          paragraphs: [
            `Yarı dolu (slack) tanklar serbest yüzey etkisiyle sanal GM düşüşü yaratır. Aynı anda birden fazla slack tank kritik GM kaybına yol açabilir; bu yüzden plan slack tank sayısını sınırlar.`,
          ],
          bullets: [
            `GM (FSC dahil) > min IS Code`,
            `GZ eğrisi ve alan kriterleri`,
            `Slack tank sayısı minimumda`,
          ],
        },
      ],
    },
    {
      heading: "2. Damage Stability",
      sections: [
        {
          subheading: "2.1 Yaralanma senaryosu",
          paragraphs: [
            `MARPOL Reg. 28 kapsamında yan/dip yaralanma senaryoları loadicator damage modülü ile kontrol edilir; final kondisyon hem intact hem damage kriterlerini sağlamalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IS Code + MARPOL",
              text: `Hiçbir ara aşamada intact kriterler ihlal edilemez; final kondisyon damage stability'yi de sağlamalıdır.`,
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
            `Her ara adım GM/GZ kriterlerini sağlıyor mu?`,
            `Slack tank sayısı sınırlı mı?`,
            `Damage case kontrol edildi mi?`,
            `Stability statement saklandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
