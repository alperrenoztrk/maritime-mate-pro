import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP FMEA, proving trials ve yıllık test takibi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 24,
  estimatedPages: 20,
  intro: `DP sisteminin varsayılan yedekliliği yalnızca analiz (FMEA) ve kontrollü testlerle (proving/annual trials) kanıtlanır; bulgular operasyonel konfigürasyona yansımadıkça kâğıt üzerinde kalır. Eski bir FMEA veya kapatılmamış bir trial bulgusu sahte yedeklilik algısı yaratır. Bu bölüm FMEA'nın yaşayan doküman olarak yönetimini güverte perspektifinden ele alır.`,
  sources: [
    "IMCA M166 Rev. 3",
    "IMCA M190",
    "IMO MSC.1/Circ.1580",
    "Class rules",
  ],
  chapters: [
    {
      heading: "1. FMEA ve Trials İlişkisi",
      sections: [
        {
          subheading: "1.1 Mimariyle karşılaştırma",
          bullets: [
            `FMEA'daki failure mode, detection, isolation, alarm ve son etkiyi güncel mimariyle karşılaştır`,
            `Proving/annual trials açık bulgu, limitation ve recommendation'larını takip et`,
            `Kritik testleri üretici, class ve şirket prosedürüyle planla`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Canlı operasyonda plansız trip yok",
              text: `Görev sırasında kontrolsüz failure injection yapılmaz; canlı operasyonda plansız trip testi loss of position'a yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Bulgu Yönetimi",
      sections: [
        {
          subheading: "2.1 Sonucun operasyona yansıması",
          paragraphs: [
            `Test sonucunun CAMO, ASOG, consequence analysis ve acil durum drill'lerine etkisi değerlendirilir. Modifikasyon veya tekrarlayan arıza sonrası FMEA yaşayan doküman olarak güncellenir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 FMEA/trials son kontrol",
          bullets: [
            `FMEA güncel mimariyle uyumlu mu?`,
            `Trials bulguları takip register'ında ve kapanışta mı?`,
            `Sonuçlar CAMO/ASOG'a yansıtıldı mı?`,
            `Finding close-out register güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
