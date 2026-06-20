import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Lashing planı doğrulama — twistlock, lashing rod ve bridge fitting kontrolü",
  shipType: "konteyner",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 20,
  intro: `Konteyner lashing'i, deniz koşullarındaki transverse/longitudinal/vertical kuvvetleri karşılayarak yığın güvenliğini sağlar. Twistlock, lashing rod, turnbuckle ve bridge fitting'in doğru ve sıkı uygulanması; konteyner kayıplarının (ONE Apus, Maersk Essen) önlenmesinde belirleyicidir. Bu bölüm lashing doğrulamasını ele alır.`,
  sources: ["CSS Code Annex 13", "Cargo Securing Manual (Class onaylı)", "IMO MSC.1/Circ.1353"],
  chapters: [
    {
      heading: "1. Lashing Sistemi",
      sections: [
        {
          subheading: "1.1 Ekipman ve pattern",
          paragraphs: [
            `Twist lock + lashing rod + turnbuckle kombinasyonu CSM'deki pattern'e göre uygulanır; tier sınırları, hatch cover üstü stowage ve heavy/reefer pozisyonları kontrol edilir. Lashing tightness fiziksel doğrulanır.`,
          ],
          bullets: [`CSM pattern uyumu`, `Tier sınırları`, `Twistlock kilitli mi`, `Turnbuckle gerginliği`],
        },
      ],
    },
    {
      heading: "2. Risk ve Vaka",
      sections: [
        {
          subheading: "2.1 Parametric rolling",
          paragraphs: [
            `Ağır yalpa (parametric rolling) lashing kuvvetlerini aşarsa yığınlar çöker. Weather routing ve lashing tightness birlikte yönetilir.`,
          ],
          callouts: [
            { type: "example", title: "ONE Apus (2020)", text: `Pasifik'te ağır parametric rolling sonucu binlerce konteyner kayboldu; lashing tightness ve hava yönetimi kritik bulundu.` },
          ],
        },
        {
          subheading: "2.2 Kontrol listesi",
          bullets: [`Lashing pattern CSM'e uygun mu?`, `Twistlock/turnbuckle sıkı mı?`, `Hava durumu lashing'e uygun mu?`, `Lashing kayıtları tutuldu mu?`],
        },
      ],
    },
  ],
};

export default content;
