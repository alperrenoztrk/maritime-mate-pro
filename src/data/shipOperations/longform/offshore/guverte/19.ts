import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Trenching, rock dumping, dredging ve kablo operasyonları",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 19,
  estimatedPages: 20,
  intro: `Bu operasyonlarda gemi statik mevkide ya da düşük hızlı bir track üzerinde tutulurken seabed aracı, fall-pipe, draghead, plough veya cable catenary izlenir. Tow/umbilical kuvvetinin matematik modele yanlış girmesi station-keeping'i bozar; sualtı araçlarının rotası mevcut boru ve kablolarla çakışmamalıdır. Bu bölüm seabed intervention ve kablo işlerini ele alır.`,
  sources: [
    "IMCA M253",
    "IMCA M264",
    "IMCA M103",
    "Project installation procedure",
  ],
  chapters: [
    {
      heading: "1. Araç ve Kuvvet Tanımı",
      sections: [
        {
          subheading: "1.1 Konum ve cross-track",
          bullets: [
            `Görev aracının konumu, tow/umbilical kuvveti ve izin verilen cross-track hatası`,
            `Araç sensör/load-cell verisini DP'ye bağlamadan önce ölçek, yön ve failure mode'u doğrula`,
            `Auto-track hızını seabed aracı, ürün akışı ve recovery kapasitesine göre sınırla`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış kuvvet girdisi",
              text: `Tow force veya fall-pipe kuvveti matematik modele yanlış girilirse station-keeping bozulabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Göreve Özel İzleme",
      sections: [
        {
          subheading: "2.1 Rock dumping ve kablo",
          paragraphs: [
            `Rock dumping'de survey doğrulamasıyla çoklu geçiş planı; kablo işinde catenary ve minimum bend radius takip edilir. Araç takılması, tension artışı, telemetry kaybı veya DP bozulmasında durdurma ve geri alma planı uygulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mevcut altyapıyla çakışma",
              text: `Sualtı araçlarının rotası mevcut boru ve kablolarla çakışmamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Seabed intervention son kontrol",
          bullets: [
            `Araç kuvveti ve failure mode DP'ye doğru tanımlandı mı?`,
            `Auto-track hızı recovery kapasitesine göre sınırlı mı?`,
            `Rota mevcut altyapıyla çakışmıyor mu?`,
            `Track plot ve tension/force log tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
