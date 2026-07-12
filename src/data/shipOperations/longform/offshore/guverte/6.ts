import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Manuel kontrolden DP'ye geçiş ve ilk stabilizasyon",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 6,
  estimatedPages: 20,
  intro: `DP'ye geçiş, thrusterların gerçek tepki yönünün kanıtlanması ve kontrolün kademeli devredilmesiyle yapılır. Yanlış pitch/azimuth geri bildirimi kontrol devredildiği anda ani ve ters yönlü hareket yaratabilir; bu yüzden geçiş sırası ve matematik modelinin oluşması (build-up) için beklenen süre kritiktir. Bu bölüm proving'den ilk stabilizasyona kadar olan geçişi ele alır.`,
  sources: [
    "IMCA M103",
    "Vessel DP Operations Manual",
    "Maker operating manual",
  ],
  chapters: [
    {
      heading: "1. Thruster Proving",
      sections: [
        {
          subheading: "1.1 Gerçek tepki yönünün kanıtı",
          paragraphs: [
            `Her thruster ve ana pervane manuel kontrolde iki yönde prove edilir; komut, feedback ve fiziksel tepki karşılaştırılır. Gyro, MRU/VRS, rüzgâr sensörü ve seçilen PRS'lerin sağlıklı ve doğru ağırlıkta olduğu kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış feedback ani hareket yapar",
              text: `Yanlış pitch/azimuth geri bildirimi, kontrol DP'ye devredildiğinde ani ve ters yönlü hareket yaratabilir; proving atlanmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kademeli Devir ve Model Build-up",
      sections: [
        {
          subheading: "2.1 Eksen eksen devir",
          paragraphs: [
            `Önce Auto Yaw ile baş stabilize edilir, ardından surge ve sway eksenleri kontrollü biçimde Auto Position'a alınır. Pozisyon setpoint'i mevcut mevkiye yakın seçilir; ani büyük setpoint veya baş değişikliği verilmez.`,
          ],
        },
        {
          subheading: "2.2 Modelin oturması",
          paragraphs: [
            `Model çevresel kuvvetleri öğrenene kadar gemi yeterli süre sabit tutulur ve gerçek performans izlenir. Capability, consequence analysis ve footprint beklenen davranışı göstermeden işe başlanmaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Build-up sırasında sabit kal",
              text: `Model build-up sırasında gereksiz manevra ve görev değişikliği yapılmaz; model henüz oturmadan büyük komut vermek excursion üretir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Geçiş son kontrol",
          bullets: [
            `Tüm thrusterlar iki yönde prove edildi mi?`,
            `Sensör ve PRS sağlıklı ve doğru ağırlıkta mı?`,
            `Devir Yaw → surge/sway sırasıyla kademeli yapıldı mı?`,
            `Model oturdu ve capability/consequence/footprint beklenen mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
