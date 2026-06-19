import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Fumigasyon planı ve uygulama prosedürü",
  shipType: "dokme",
  dept: "guverte",
  opIndex: 7,
  estimatedPages: 18,
  intro: `Tahıl yükleri zararlılara karşı fosfin (phosphine) ile fumige edilir; bu gaz son derece toksik ve patlayıcıdır. Fumigasyon planı, gaz ölçümü, kapalı alan kontrolü ve mürettebat güvenliği titizlikle yönetilmelidir. Bu bölüm fumigasyonu ele alır.`,
  sources: ["IMO MSC.1/Circ.1264 (fumigation)", "IMSBC Code"],
  chapters: [
    {
      heading: "1. Plan ve Uygulama",
      sections: [
        {
          subheading: "1.1 Fosfin güvenliği",
          paragraphs: [
            `Fumigasyon lisanslı fumigator tarafından planlanır; gaz seviyeleri yaşam mahalli ve komşu mahaller için izlenir. Sızıntı kontrolü ve uyarı işaretleri konur.`,
          ],
          bullets: [`Lisanslı fumigator`, `Gaz ölçümü (yaşam mahalli)`, `Sızıntı/uyarı işaretleri`, `Kapalı alan girişi yasak`],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Toksik + patlayıcı",
          paragraphs: [
            `Fosfin hem öldürücü hem patlayıcıdır; ateş kaynağından uzak tutulur ve gaz ölçümü olmadan ambara girilmez. Havalandırma ve gas-free öncesi giriş yasaktır.`,
          ],
          callouts: [
            { type: "warning", title: "Fosfin", text: `Fosfin ölümcül zehirdir ve patlayıcıdır; gaz ölçümü/gas-free olmadan kapalı alana girilmez.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Fumigator planı var mı?`, `Gaz ölçümü yapılıyor mu?`, `Uyarı işaretleri konuldu mu?`, `Giriş yasağı uygulanıyor mu?`],
        },
      ],
    },
  ],
};

export default content;
