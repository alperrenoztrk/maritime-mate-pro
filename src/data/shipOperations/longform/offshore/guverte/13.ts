import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Sığ/derin su, kuvvetli akıntı ve soliton şartlarında DP",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 13,
  estimatedPages: 20,
  intro: `Su derinliği ve akıntı rejimi; referans geometrisini, thruster verimini ve çevresel kuvvetleri doğrudan etkiler. Sığ suda taut-wire açısı ve thruster/taban etkileşimi, derin suda acoustic geometri ve sinyal gecikmesi, soliton bölgesinde ani surge sorun yaratır. Bu bölüm, limitlerin su derinliği ve akıntıya göre uyarlanmasını ele alır.`,
  sources: [
    "IMCA M103",
    "IMCA M220",
    "Project metocean study",
  ],
  chapters: [
    {
      heading: "1. Su Derinliği Etkisi",
      sections: [
        {
          subheading: "1.1 Sığ su",
          bullets: [
            `Taut-wire açı sınırı, HPR çoklu yansıma`,
            `Thruster taban/akıntı etkileşimi ve verim kaybı`,
          ],
        },
        {
          subheading: "1.2 Derin su",
          bullets: [
            `Acoustic geometri, sinyal gecikmesi, beacon eğimi`,
            `Taut-wire uygulanabilirliğinin sınırı`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aynı PRS her derinlikte eşdeğer değil",
              text: `Aynı PRS kombinasyonu her su derinliğinde eşdeğer doğruluk ve bağımsızlık sağlamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Akıntı ve Soliton",
      sections: [
        {
          subheading: "2.1 Kuvvetli tide ve soliton",
          paragraphs: [
            `Kuvvetli tide ve eddy için hız-yön trendi, thrust marjı ve referans sapmaları izlenir. Soliton riski olan sahada radar/akıntı işaretleri ve ani surge ihtimali takip edilir; çevre limiti yaklaşınca görev ekipmanı güvenli biçimde geri alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Soliton geçişi",
              text: `Soliton geçişi çok kısa sürede büyük pozisyon ve baş excursion'ı yaratabilir; ASOG aksiyonu gecikmeden uygulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Çevre şartı son kontrol",
          bullets: [
            `PRS kombinasyonu mevcut derinlik için uygun mu?`,
            `Thrust marjı ve referans sapmaları izleniyor mu?`,
            `Soliton/akıntı işaretleri takip ediliyor mu?`,
            `Metocean log ve PRS performance record tutuluyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
