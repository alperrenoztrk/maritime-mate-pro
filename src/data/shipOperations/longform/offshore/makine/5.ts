import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Thruster, azimuth ve propulsion readiness",
  shipType: "offshore",
  dept: "makine",
  opIndex: 5,
  estimatedPages: 20,
  intro: `Her propulsion unit'in komut, pitch/rpm/azimuth feedback, yağlama, soğutma ve local control zinciri, DP görevi öncesi kanıtlanmalıdır. Yanlış azimuth veya pitch feedback'i DP'nin ters yönde kuvvet üretmesine yol açar; online görünen ama local moda alınmış bir thruster hidden failure'dır. Bu bölüm propulsion readiness'i ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M190",
    "IMCA M247",
    "Thruster maker manual",
  ],
  chapters: [
    {
      heading: "1. Mekanik ve Feedback Kontrolü",
      sections: [
        {
          subheading: "1.1 Prove ve feedback karşılaştırma",
          bullets: [
            `Hydraulic/lube oil, seal, cooling, steering ve motor/drive parametrelerini maker limitleriyle kontrol et`,
            `Bridge ile düşük thrustta ahead/astern veya port/starboard komutlarını prove et`,
            `Command ile actual pitch, rpm ve azimuth feedback'ini karşılaştır; gecikme/deadband kaydet`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ters kuvvet riski",
              text: `Yanlış azimuth veya pitch feedback'i, DP'nin ters yönde kuvvet üretmesine neden olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Mod ve Model Tanımı",
      sections: [
        {
          subheading: "2.1 Local/remote ve derating",
          paragraphs: [
            `Local/remote, emergency stop, pitch-to-zero ve drive protection fonksiyonları test durumundan operasyon konumuna getirilir. Derating veya unavailable thruster DP modelinde doğru tanımlanıp capability/consequence analysis güncellenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Local moddaki thruster",
              text: `Online görünen ancak local moda alınmış thruster hidden failure'dır; DP onu kullanılabilir sanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Propulsion son kontrol",
          bullets: [
            `Yağ/soğutma/steering parametreleri limitte mi?`,
            `Command–feedback (pitch/rpm/azimuth) karşılaştırıldı mı?`,
            `Tüm unit'ler operasyon (remote) konumunda mı?`,
            `Derating/unavailable thruster modelde doğru mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
