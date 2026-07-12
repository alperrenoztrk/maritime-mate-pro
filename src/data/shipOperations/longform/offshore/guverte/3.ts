import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "ASOG ve dört renkli DP durum yönetimi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 3,
  estimatedPages: 20,
  intro: `ASOG (Activity Specific Operating Guidelines), operasyonel, çevresel ve ekipman sınırlarını Green, Advisory/Blue, Yellow ve Red durumlarıyla önceden tanımlayan tablodur. Amaç, bir limit aşıldığında karar anında tartışmak yerine önceden yazılmış aksiyonu gecikmeden uygulamaktır. Bu bölüm ASOG'un hazırlanması ve renk geçişlerinin yönetimini ele alır.`,
  sources: [
    "IMCA M220 Rev. 3",
    "Vessel/Project ASOG",
    "Project bridging document",
  ],
  chapters: [
    {
      heading: "1. Dört Renkli Durum Sistemi",
      sections: [
        {
          subheading: "1.1 Renklerin anlamı",
          paragraphs: [
            `Green normal operasyon; Advisory/Blue dikkat ve izleme; Yellow faaliyeti güvenli safhaya alma; Red faaliyeti durdurma/terk etmedir. Renkler gemiye özel ASOG ile tanımlanır ve farklı projeler arasında anlam kaymasına izin verilmez.`,
          ],
          table: {
            headers: ["Durum", "Anlam", "Tipik aksiyon"],
            rows: [
              ["Green", "Normal", "Operasyona devam"],
              ["Advisory/Blue", "İzle, hazırlan", "Bildir, marjı izle"],
              ["Yellow", "Sınıra yaklaşıldı", "Faaliyeti güvenli safhaya al"],
              ["Red", "Sınır aşıldı", "Durdur / disconnect / kaç"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. ASOG'un Hazırlanması ve Uygulanması",
      sections: [
        {
          subheading: "2.1 Limit satırlarının girilmesi",
          bullets: [
            `Hava, watch circle, jeneratör yükü, thruster, PRS, sensör, iletişim ve görev ekipmanı limitleri`,
            `Her satır için tetikleyici, bildirim, düzeltici hareket ve durdurma/terk kararı`,
            `Başlamadan önce Master, DPO, Chief Engineer ve görev sorumlusuyla gözden geçirme`,
          ],
        },
        {
          subheading: "2.2 Renk geçişi ve geri dönüş",
          paragraphs: [
            `Bir limit aşıldığında ilgili renge geçilir, taraflar bilgilendirilir ve yazılı aksiyon uygulanır. Şartlar düzelse bile yetkili onay ve yeniden kontrol olmadan daha düşük alarma dönülmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "'Sistem hâlâ tutuyor' tuzağı",
              text: `Yellow veya Red durumda 'sistem hâlâ pozisyonu tutuyor' gerekçesiyle operasyona devam edilmez; renk geçişi ekipmanın değil, sınırın aşıldığının ifadesidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 ASOG son kontrol",
          bullets: [
            `Tüm görev/çevre/ekipman limitleri satırlarda tanımlı mı?`,
            `Her satırda tetikleyici + aksiyon yazılı mı?`,
            `ASOG başlamadan imzalandı mı?`,
            `DP status change log ve bildirim kaydı hazır mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
