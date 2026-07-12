import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "CAMO ve TAM konfigürasyonunun kurulması",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 20,
  intro: `CAMO (Critical Activity Mode of Operation) ve TAM (Task Appropriate Mode), geminin güç, itki ve kontrol sistemlerinin hangi konfigürasyonda çalışacağını tanımlayan onaylı tablolardır. CAMO en hata toleranslı moddur ve kritik faaliyetlerde kullanılır; TAM daha düşük riskli görevler için kabul edilmiş alternatiftir. Bu bölüm konfigürasyonun kurulması ve çapraz kontrolünü ele alır.`,
  sources: [
    "IMCA M220 (Operational Activity Planning)",
    "IMCA M103",
    "Vessel CAMO/TAM tables",
  ],
  chapters: [
    {
      heading: "1. CAMO/TAM Prensibi",
      sections: [
        {
          subheading: "1.1 İki mod arasındaki fark",
          paragraphs: [
            `CAMO, kritik faaliyette (dalış, ağır kaldırma, drilling) tam yedekliliği korumak için en muhafazakâr konfigürasyonu dayatır. TAM, WCF sonucu görev için kabul edilebilir olduğunda daha az ekipmanla çalışmaya izin verir; ancak bu daima onaylı bir tablo ve risk temelli karara dayanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "TAM bir muafiyet değildir",
              text: `TAM, arızalı veya eksik yedekliliği otomatik olarak kabul edilebilir hale getirmez; yalnızca görevin risk düzeyine uygun, önceden onaylanmış bir moddur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Konfigürasyonun Kurulması",
      sections: [
        {
          subheading: "2.1 Tablodan line-up",
          paragraphs: [
            `Onaylı CAMO/TAM tablosundan güç üretimi, bus-tie, thruster, PRS, sensör, UPS, soğutma ve yardımcı sistem durumları çıkarılır. Her ekipman tabloya göre line-up edilir ve bağımsız bir kişiyle çapraz kontrol yapılır.`,
          ],
          bullets: [
            `Köprüüstü, ECR ve görev kontrol merkezleriyle seçilen modu ortak teyit et`,
            `Her line-up'ı ikinci kişiyle doğrula (independent check)`,
            `Planlı bakım/arıza kaynaklı sapmayı değerlendirip onay ve kısıtlamayı kayda al`,
          ],
        },
        {
          subheading: "2.2 Değişikliğin yeniden değerlendirilmesi",
          paragraphs: [
            `Konfigürasyon değiştiğinde ASOG statüsü ve WCF sonucu yeniden değerlendirilir. Görev sürerken CAMO/TAM kontrolsüz değiştirilmez; değişiklik ancak MOC ve yetkili onayıyla yapılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Görev sürerken değişiklik",
              text: `CAMO/TAM değişikliği faaliyet devam ederken kontrolsüz yapılmamalıdır; mümkünse kritik faaliyet güvenli safhaya alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 CAMO/TAM son kontrol",
          bullets: [
            `Seçilen mod göreve uygun ve onaylı tabloda mı?`,
            `Tüm ekipman tabloya göre line-up edildi mi?`,
            `Bağımsız çapraz kontrol yapıldı mı?`,
            `Sapmalar configuration change log ve toolbox talk'ta kayıtlı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
