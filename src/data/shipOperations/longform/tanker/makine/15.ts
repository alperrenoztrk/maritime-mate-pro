import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Atık yağ (sludge) yönetimi",
  shipType: "tanker",
  dept: "makine",
  opIndex: 15,
  estimatedPages: 14,
  intro: `Sludge; separatör ve filtre kaynaklı yağ atığıdır; sludge tank → incinerator veya reception facility yoluyla bertaraf edilir. Tüm hareketler ORB I'a kaydedilir. Bu bölüm sludge yönetimini ele alır.`,
  sources: ["MARPOL Annex I", "MARPOL Annex VI (incinerator)"],
  chapters: [
    {
      heading: "1. Bertaraf",
      sections: [
        {
          subheading: "1.1 Incinerator/reception",
          paragraphs: [
            `Sludge tank sounding düzenli alınır; bertaraf incinerator veya kıyı reception facility ile yapılır. Incinerator flame failure trip düzgün çalışmalıdır.`,
          ],
          bullets: [
            `Sludge sounding`,
            `Incinerator/reception bertaraf`,
            `ORB I — Code C, I`,
          ],
        },
      ],
    },
    {
      heading: "2. Güvenlik",
      sections: [
        {
          subheading: "2.1 Incinerator",
          paragraphs: [
            `Incinerator çalışırken flame failure trip ve emisyon limitleri (MARPOL VI) izlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Flame failure",
              text: `Incinerator flame failure trip arızalıysa yakılmamış yakıt birikip patlama yapabilir.`,
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
            `Sludge sounding alındı mı?`,
            `Bertaraf doğru yapıldı mı?`,
            `ORB I işlendi mi?`,
            `Reception makbuzu saklandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
