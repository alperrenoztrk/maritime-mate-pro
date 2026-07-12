import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP sistemi modifikasyon ve software değişiklik yönetimi",
  shipType: "offshore",
  dept: "makine",
  opIndex: 12,
  estimatedPages: 20,
  intro: `Donanım, yazılım, parametre ve network değişiklikleri, geminin yedekliliğini ve failure mode'larını fark edilmeden bozabilir. Aynı yazılımın tüm redundant controllerlara eşzamanlı yüklenmesi common-mode risk yaratır; kayıtsız bir parametre değişikliği sonraki FMEA/trials sonucunu geçersiz kılar. Bu bölüm modifikasyon ve software değişiklik yönetimini (MOC) ele alır.`,
  sources: [
    "ISM Code",
    "IMCA M166",
    "IMCA M163",
    "Class change-control requirements",
  ],
  chapters: [
    {
      heading: "1. Kapsam ve Onay",
      sections: [
        {
          subheading: "1.1 Etkilenen sistemler",
          bullets: [
            `Etkilenen controller, I/O, network, protection, HMI, PRS ve sensörleri tanımla`,
            `FMEA, drawings, spare image/backup ve cybersecurity etkisini MOC içinde değerlendir`,
            `Class, maker ve şirket onaylarını; FAT/SAT ve rollback planını hazırla`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Eşzamanlı yükleme",
              text: `Aynı yazılımın tüm redundant controllerlara eşzamanlı yüklenmesi common-mode risk yaratabilir; kademeli yaklaşım tercih edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Uygulama ve Doğrulama",
      sections: [
        {
          subheading: "2.1 Post-change test",
          paragraphs: [
            `Uygulama sonrası alarm, controller switchover, PRS/sensor input, thruster command ve consequence analysis test edilir. Version, parameter, test sonucu ve değişen operasyon limitleri dokümante edilip ekibe familiarisation verilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıtsız parametre",
              text: `Kayıtsız parametre değişikliği sonraki FMEA/trials sonucunu geçersiz kılabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 MOC son kontrol",
          bullets: [
            `Etkilenen sistemler ve cybersecurity etkisi MOC'ta mı?`,
            `Class/maker/şirket onayı ve rollback planı var mı?`,
            `Controller switchover ve consequence analysis test edildi mi?`,
            `Software/version register ve backup güncel mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
